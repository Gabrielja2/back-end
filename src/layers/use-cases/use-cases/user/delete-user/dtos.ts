import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

export type DeleteUserDTO = {
    id: string;
}

export type DeleteUserResponseDTO = string | InvalidParamError | NotFoundError;