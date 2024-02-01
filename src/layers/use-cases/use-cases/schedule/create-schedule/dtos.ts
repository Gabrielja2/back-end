import { InvalidParamError, NotFoundError } from "@/layers/use-cases";


export type CreateScheduleDTO = {
    title: string;
    start: string;
    end: string;

}


export type CreateScheduleResponseDTO = string | InvalidParamError | NotFoundError;
