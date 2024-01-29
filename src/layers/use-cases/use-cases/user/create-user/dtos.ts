import { InvalidUserEmailError, InvalidUserNameError, InvalidUserPasswordError } from "@/layers/entities";
import { InvalidParamError, UserModel } from "@/layers/use-cases";


export type CreateUserDTO = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export type CreateUserResponseDTO = UserModel | string | InvalidUserEmailError | InvalidUserPasswordError | InvalidParamError | InvalidUserNameError;
