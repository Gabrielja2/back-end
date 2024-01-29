import { ScheduleModel, UpdateScheduleResponseDTO } from "@/layers/use-cases";


export interface UpdateScheduleUseCaseProtocol {
    execute(id: string, data: Partial<ScheduleModel>, loggedUserId?: string): Promise<UpdateScheduleResponseDTO>
}