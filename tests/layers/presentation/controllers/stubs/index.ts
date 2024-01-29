import {
    CreateUserDTO,
    CreateUserResponseDTO,
    CreateUserUseCaseProtocol,
    DeleteUserDTO,
    DeleteUserResponseDTO,
    DeleteUserUseCaseProtocol,
    UserModel,
    GetUsersUseCaseProtocol,
    GetUsersResponseDTO,
} from "@/layers/use-cases";

export class CreateUserStub implements CreateUserUseCaseProtocol {
    async execute({ username, email, password }: CreateUserDTO): Promise<CreateUserResponseDTO> {

        const userModel = new UserModel("any_id", email, username, password, false, undefined);

        return userModel
    }
}

export class DeleteUserStub implements DeleteUserUseCaseProtocol {
    async execute({ id }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {

        return id;
    }
}

export class GetUsersStub implements GetUsersUseCaseProtocol {
    async execute(): Promise<GetUsersResponseDTO> {

        return [];
    }
}

