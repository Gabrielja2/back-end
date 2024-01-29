import { NotFoundError, ScheduleModel } from "@/layers/use-cases";




export type GetSchedulesResponseDTO = ScheduleModel[] | NotFoundError;
