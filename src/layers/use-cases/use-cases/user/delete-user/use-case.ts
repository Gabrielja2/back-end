import { DeleteUserUseCaseProtocol } from "./protocol";
import { DeleteUserDTO, DeleteUserResponseDTO } from "./dtos";
import { UnitOfWorkProtocol } from "@/layers/use-cases/ports";
import { NotFoundError, UnauthorizedError } from "@/layers/use-cases/errors";

export class DeleteUserUseCase implements DeleteUserUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol,
	) { }

	async execute({ id }: DeleteUserDTO, loggedUserId?: string): Promise<DeleteUserResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository()

		const user = await userRepository.getUserById(id)
		if (!user) return new NotFoundError(`Usuário nao encontrado`);

		const isUserOwner = user.id === loggedUserId;
		if (!isUserOwner) return new UnauthorizedError(`Usuario não possui permissão para excluir este usuario`);

		await userRepository.deleteUser(id);

		return `Usuário ${id} excluído`;

	}
}