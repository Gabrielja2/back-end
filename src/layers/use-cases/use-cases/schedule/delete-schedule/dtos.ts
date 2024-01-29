import { InvalidParamError, NotFoundError } from "@/layers/use-cases";


export type DeleteScheduleDTO = {
    id: string;
}


export type DeleteScheduleResponseDTO = string | InvalidParamError | NotFoundError;
