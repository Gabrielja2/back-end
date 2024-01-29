import { GetSchedulesByUserIdDTO, GetSchedulesByUserIdResponseDTO } from "./dtos";

export interface GetSchedulesByUserIdUseCaseProtocol {
    execute({ userId }: GetSchedulesByUserIdDTO): Promise<GetSchedulesByUserIdResponseDTO>
}