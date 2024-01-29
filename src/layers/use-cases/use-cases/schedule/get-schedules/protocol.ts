import { GetSchedulesResponseDTO } from "./dtos";

export interface GetSchedulesUseCaseProtocol {
    execute(): Promise<GetSchedulesResponseDTO>
}