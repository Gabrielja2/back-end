import { CreateScheduleDTO, CreateScheduleResponseDTO } from "./dtos";

export interface CreateScheduleUseCaseProtocol {
    execute({ title, start, end }: CreateScheduleDTO, loggedUserId?: string): Promise<CreateScheduleResponseDTO | void>
}