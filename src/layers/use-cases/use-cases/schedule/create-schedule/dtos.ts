import { Schedule } from "@/layers/entities";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";


export type CreateScheduleDTO = {
    description: string;
    startDate: string;
    endDate: string;

}


export type CreateScheduleResponseDTO = string | InvalidParamError | NotFoundError;
