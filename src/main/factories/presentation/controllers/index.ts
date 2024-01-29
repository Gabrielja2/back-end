import {
    CreateUserController,
    DeleteUserController,
    GetUsersController,
    UpdateUserController,
    TreatmentDecorator,
    LoginUserController,
    CreateScheduleController,
    GetSchdulesController,
    GetSchdulesByUserIdController,
    DeleteScheduleController,
    UpdateScheduleController
} from "@/layers/presentation"

import {
    createScheduleUseCase,
    createUserUseCase,
    deleteScheduleByIdUseCase,
    deleteUserUseCase,
    getSchedulesByUserIdUseCase,
    getSchedulesUseCase,
    getUsersUseCase,
    loginUserUseCase,
    updateSchedulebyIdUseCase,
    updateUserUseCase,

} from "@/main/factories"


export const createUserController = new TreatmentDecorator(new CreateUserController(createUserUseCase));

export const deleteUserController = new TreatmentDecorator(new DeleteUserController(deleteUserUseCase));

export const getUsersController = new TreatmentDecorator(new GetUsersController(getUsersUseCase));

export const updateUserController = new TreatmentDecorator(new UpdateUserController(updateUserUseCase));

export const loginUserController = new TreatmentDecorator(new LoginUserController(loginUserUseCase));

export const createScheduleController = new TreatmentDecorator(new CreateScheduleController(createScheduleUseCase));

export const getSchdulesController = new TreatmentDecorator(new GetSchdulesController(getSchedulesUseCase));

export const getSchdulesByUserIdController = new TreatmentDecorator(new GetSchdulesByUserIdController(getSchedulesByUserIdUseCase));

export const deleteScheduleController = new TreatmentDecorator(new DeleteScheduleController(deleteScheduleByIdUseCase));

export const updateScheduleController = new TreatmentDecorator(new UpdateScheduleController(updateSchedulebyIdUseCase));


