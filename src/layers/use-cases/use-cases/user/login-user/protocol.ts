import { LoginUserDTO, LoginUserResponseDTO } from "./dtos";

export interface LoginUserUseCaseProtocol {
    execute({ email, password }: LoginUserDTO): Promise<LoginUserResponseDTO>;
}