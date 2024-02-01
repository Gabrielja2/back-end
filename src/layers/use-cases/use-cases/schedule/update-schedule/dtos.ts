import { InvalidScheduleTitleError, InvalidScheduleEndError, InvalidScheduleStartError } from "@/layers/entities";
import { InvalidParamError, NotFoundError, ScheduleModel } from "@/layers/use-cases";



export type UpdateScheduleResponseDTO = ScheduleModel | string | InvalidParamError | NotFoundError | InvalidScheduleTitleError | InvalidScheduleEndError | InvalidScheduleStartError;
