import {
    CreateScheduleUseCase,
    CreateUserUseCase,
    DeleteSchedulebyIdUseCase,
    DeleteUserUseCase,
    GetSchedulesByUserIdUseCase,
    GetSchedulesUseCase,
    GetUsersUseCase,
    LoginUserUserCase,
    UpdateSchedulebyIdUseCase,
    UpdateUserUseCase
} from "@/layers/use-cases"
import {
    authenticationAdapter,
    cryptographyAdapter,
    unitOfWorkAdapter,
} from "../external";



export const createUserUseCase = new CreateUserUseCase(unitOfWorkAdapter, cryptographyAdapter);

export const deleteUserUseCase = new DeleteUserUseCase(unitOfWorkAdapter);

export const getUsersUseCase = new GetUsersUseCase(unitOfWorkAdapter);

export const updateUserUseCase = new UpdateUserUseCase(unitOfWorkAdapter, cryptographyAdapter);

export const loginUserUseCase = new LoginUserUserCase(unitOfWorkAdapter, cryptographyAdapter, authenticationAdapter);

export const createScheduleUseCase = new CreateScheduleUseCase(unitOfWorkAdapter)

export const getSchedulesUseCase = new GetSchedulesUseCase(unitOfWorkAdapter)

export const getSchedulesByUserIdUseCase = new GetSchedulesByUserIdUseCase(unitOfWorkAdapter)

export const deleteScheduleByIdUseCase = new DeleteSchedulebyIdUseCase(unitOfWorkAdapter)

export const updateSchedulebyIdUseCase = new UpdateSchedulebyIdUseCase(unitOfWorkAdapter)
