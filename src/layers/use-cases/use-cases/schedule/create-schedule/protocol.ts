import { CreateScheduleDTO, CreateScheduleResponseDTO } from "./dtos";

export interface CreateScheduleUseCaseProtocol {
    execute({ description, startDate, endDate }: CreateScheduleDTO, loggedUserId?: string): Promise<CreateScheduleResponseDTO | void>
}