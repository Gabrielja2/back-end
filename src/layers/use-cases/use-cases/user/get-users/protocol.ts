import { GetUsersResponseDTO } from "./dtos";

export interface GetUsersUseCaseProtocol {
    execute(): Promise<GetUsersResponseDTO>;
}