import {
    UpdateScheduleResponseDTO,
    NotFoundError,
    ScheduleModel,
    UnauthorizedError,
    UnitOfWorkProtocol,
    InvalidParamError,
} from "@/layers/use-cases";

import { UpdateScheduleUseCaseProtocol } from "./protocol";

import {
    InvalidScheduleDescriptionError,
    InvalidScheduleEndDateError,
    InvalidScheduleStartDateError,
    ScheduleDescription,
    ScheduleEndDate,
    ScheduleStartDate,
} from "@/layers/entities";

export class UpdateSchedulebyIdUseCase implements UpdateScheduleUseCaseProtocol {
    constructor(private readonly unitOfWork: UnitOfWorkProtocol) { }

    async execute(
        id: string,
        data: Partial<ScheduleModel>,
        loggedUserId?: string
    ): Promise<UpdateScheduleResponseDTO> {
        const { description, startDate, endDate } = data;

        let descriptionOrError: ScheduleDescription | InvalidScheduleDescriptionError;
        let startDateOrError: ScheduleStartDate | InvalidScheduleStartDateError;
        let endDateOrError: ScheduleEndDate | InvalidScheduleEndDateError;

        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        const schedule = await scheduleRepository.getScheduleById(id);
        if (!schedule) return new NotFoundError("Evento não encontrado");

        if (description) {
            descriptionOrError = ScheduleDescription.create(description);
            if (descriptionOrError instanceof Error) return descriptionOrError;
        }

        if (startDate) {
            startDateOrError = ScheduleStartDate.create(startDate.toString());
            if (startDateOrError instanceof Error) return startDateOrError;
        }

        if (endDate) {
            endDateOrError = ScheduleEndDate.create(endDate.toString());
            if (endDateOrError instanceof Error) return endDateOrError;
        }

        if (!(schedule.userId === loggedUserId)) return new UnauthorizedError("Usuário não possui permissão para editar este evento");

        if (await this.getEventsByDate(startDate, endDate)) return new InvalidParamError("Já existe um evento neste período");

        await scheduleRepository.updateScheduleById(id, {
            description: (descriptionOrError as ScheduleDescription)?.value,
            startDate: (startDateOrError as ScheduleStartDate)?.value,
            endDate: (endDateOrError as ScheduleEndDate)?.value,
        });

        return `Evento ${id} atualizado`;
    }

    private readonly getEventsByDate = async (startDate: string | Date, endDate: string | Date) => {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();
        return await scheduleRepository.getSchedulesByDate(startDate.toString(), endDate.toString());
    };
}
