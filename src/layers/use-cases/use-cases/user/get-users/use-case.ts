import { UnitOfWorkProtocol, UserRepositoryProtocol } from "@/layers/use-cases/ports";
import { GetUsersResponseDTO } from "./dtos";
import { GetUsersUseCaseProtocol } from "./protocol";
import { NotFoundError } from "@/layers/use-cases/errors";



export class GetUsersUseCase implements GetUsersUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,
    ) { }

    async execute(): Promise<GetUsersResponseDTO> {
        const userRepository = this.unitOfWork.getUserRepository();

        const users = await userRepository.getUsers();

        if (!users) return new NotFoundError("Nenhum usuario encontrado");

        return users;
    }
}