import { DeleteScheduleDTO, DeleteScheduleResponseDTO } from "./dtos";

export interface DeleteScheduleUseCaseProtocol {
    execute({ id }: DeleteScheduleDTO, loggedUserId?: string): Promise<DeleteScheduleResponseDTO>
}