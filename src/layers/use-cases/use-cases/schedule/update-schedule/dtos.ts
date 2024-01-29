import { InvalidScheduleDescriptionError, InvalidScheduleEndDateError, InvalidScheduleStartDateError } from "@/layers/entities";
import { InvalidParamError, NotFoundError, ScheduleModel } from "@/layers/use-cases";



export type UpdateScheduleResponseDTO = ScheduleModel | string | InvalidParamError | NotFoundError | InvalidScheduleDescriptionError | InvalidScheduleEndDateError | InvalidScheduleStartDateError;
