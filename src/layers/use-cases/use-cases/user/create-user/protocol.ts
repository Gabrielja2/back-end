import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";

export interface CreateUserUseCaseProtocol {
    execute({ username, email, password, confirmPassword }: CreateUserDTO): Promise<CreateUserResponseDTO | void>
}