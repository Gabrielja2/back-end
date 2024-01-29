import { CryptographyProtocol, UserModel, InvalidParamError, NotFoundError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { UpdateUserByIdUseCaseProtocol } from "./protocol";
import { UpdateUserResponseDTO } from "./dtos";
import { UserEmail, UserName, UserPassword } from "@/layers/entities";

export class UpdateUserUseCase implements UpdateUserByIdUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol,
		private readonly cryptographyAdapter: CryptographyProtocol
	) { }

	async execute(data: Partial<UserModel>, loggedUserId?: string): Promise<UpdateUserResponseDTO> {
		const { id, username, email, password } = data;

		let nameOrError;
		let passwordOrError;
		let emailOrError;
		let hashPassword;

		const userRepository = this.unitOfWork.getUserRepository();

		const user = await userRepository.getUserById(id);
		if (!user) return new NotFoundError(`Usuário não encontrado`);

		if (username) {
			nameOrError = UserName.create(username);
			if (nameOrError instanceof Error) return nameOrError;
		}

		if (password) {
			passwordOrError = UserPassword.create(password);
			if (passwordOrError instanceof Error) return passwordOrError;
		}

		if (email) {
			emailOrError = UserEmail.create(email);
			if (emailOrError instanceof Error) return emailOrError;

			const hasEmail = await userRepository.getUserByEmail(email);
			if (hasEmail && user.email !== hasEmail.email) return new InvalidParamError(`Email em uso`);
		}

		if (password) hashPassword = await this.cryptographyAdapter.hash(passwordOrError?.value);


		await userRepository.updateUser(id, {
			username: nameOrError?.value,
			email: emailOrError?.value,
			password: hashPassword

		});


		return `Usuário ${id} atualizado`;
	}
}