import { NotFoundError, ScheduleModel } from "@/layers/use-cases";


export type GetSchedulesByUserIdDTO = {
    userId: string
}

export type GetSchedulesByUserIdResponseDTO = ScheduleModel[] | NotFoundError;



