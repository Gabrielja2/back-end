import { DeleteUserDTO, DeleteUserResponseDTO } from "./dtos";

export interface DeleteUserUseCaseProtocol {
    execute({ id }: DeleteUserDTO, loggedUserId?: string): Promise<DeleteUserResponseDTO>;
}