import { NotFoundError, UserModel } from "@/layers/use-cases";

export type GetUsersResponseDTO = UserModel[] | NotFoundError;