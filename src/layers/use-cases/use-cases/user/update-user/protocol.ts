import { UserModel } from "@/layers/use-cases/ports";
import { UpdateUserResponseDTO } from "./dtos";

export interface UpdateUserByIdUseCaseProtocol {
    execute(data: Partial<UserModel>, loggedUserId?: string): Promise<UpdateUserResponseDTO>
}