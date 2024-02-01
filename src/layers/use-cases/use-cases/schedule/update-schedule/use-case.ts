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
    InvalidScheduleTitleError,
    InvalidScheduleEndError,
    InvalidScheduleStartError,
    ScheduleTitle,
    ScheduleEnd,
    ScheduleStart,
} from "@/layers/entities";

export class UpdateSchedulebyIdUseCase implements UpdateScheduleUseCaseProtocol {
    constructor(private readonly unitOfWork: UnitOfWorkProtocol) { }

    async execute(
        id: string,
        data: Partial<ScheduleModel>,
        loggedUserId?: string
    ): Promise<UpdateScheduleResponseDTO> {
        const { title, start, end } = data;

        let titleOrError: ScheduleTitle | InvalidScheduleTitleError;
        let startOrError: ScheduleStart | InvalidScheduleStartError;
        let endOrError: ScheduleEnd | InvalidScheduleEndError;

        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        const schedule = await scheduleRepository.getScheduleById(id);
        if (!schedule) return new NotFoundError("Evento não encontrado");

        if (title) {
            titleOrError = ScheduleTitle.create(title);
            if (titleOrError instanceof Error) return titleOrError;
        }

        if (start) {
            startOrError = ScheduleStart.create(start.toString());
            if (startOrError instanceof Error) return startOrError;
        }

        if (end) {
            endOrError = ScheduleEnd.create(end.toString());
            if (endOrError instanceof Error) return endOrError;
        }

        if (!(schedule.userId === loggedUserId)) return new UnauthorizedError("Usuário não possui permissão para editar este evento");

        if (await this.getEventsByDate(start, end)) return new InvalidParamError("Já existe um evento neste período");

        await scheduleRepository.updateScheduleById(id, {
            title: (titleOrError as ScheduleTitle)?.value,
            start: (startOrError as ScheduleStart)?.value,
            end: (endOrError as ScheduleEnd)?.value,
        });

        return `Evento ${id} atualizado`;
    }

    private readonly getEventsByDate = async (start: string | Date, end: string | Date) => {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();
        return await scheduleRepository.getSchedulesByDate(start.toString(), end.toString());
    };
}
