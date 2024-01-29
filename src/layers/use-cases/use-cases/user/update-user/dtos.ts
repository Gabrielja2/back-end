import { InvalidUserEmailError, InvalidUserNameError, InvalidUserPasswordError } from "@/layers/entities";
import { InvalidParamError, NotFoundError, UserModel } from "@/layers/use-cases";


export type UpdateUserResponseDTO = UserModel | string | InvalidParamError | NotFoundError | InvalidUserEmailError | InvalidUserNameError | InvalidUserPasswordError;