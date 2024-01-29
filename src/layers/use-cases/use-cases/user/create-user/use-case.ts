import { CreateUserUseCaseProtocol } from "./protocol";
import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";
import { CryptographyProtocol, UnitOfWorkProtocol, InvalidParamError } from "@/layers/use-cases";
import { User } from "@/layers/entities";



export class CreateUserUseCase implements CreateUserUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol,
		private readonly cryptographyAdapter: CryptographyProtocol
	) { }

	async execute({ username, email, password, confirmPassword }: CreateUserDTO): Promise<CreateUserResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository();

		if (password !== confirmPassword) return new InvalidParamError("As senhas devem ser iguais");

		if (await userRepository.getUserByEmail(email)) return new InvalidParamError("Email já cadastrado");

		const userOrError = User.create(username, email, password);
		if (userOrError instanceof Error) return userOrError;

		const hashPassword = await this.cryptographyAdapter.hash(userOrError.password.value);

		await userRepository.createUser(userOrError.username.value, userOrError.email.value, hashPassword);

		return userOrError.email.value;
	}
}