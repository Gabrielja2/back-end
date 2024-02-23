import { CreateScheduleDTO, CreateScheduleResponseDTO, InvalidParamError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { CreateScheduleUseCaseProtocol } from "./protocol";
import { Schedule } from "@/layers/entities";


export class CreateScheduleUseCase implements CreateScheduleUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,

    ) { }

    async execute({ title, start, end }: CreateScheduleDTO, loggedUserId?: string): Promise<CreateScheduleResponseDTO> {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();


        if (new Date(start).toLocaleDateString() === "Invalid Date") return new InvalidParamError('Essa data é inválida');

        if (new Date(end).toISOString() <= new Date(start).toISOString()) return new InvalidParamError('Data final deve ser posterior a data inicial');

        if (await this.getEventsByDate(start, end)) return new InvalidParamError('Ja existe um evento neste periodo');

        const scheduleOrError = Schedule.create(title, start, end);
        if (scheduleOrError instanceof Error) return scheduleOrError;

        await scheduleRepository.createSchedule(scheduleOrError.title.value, scheduleOrError.start.value, scheduleOrError.end.value, loggedUserId);

        return scheduleOrError.title.value;
    }

    private readonly getEventsByDate = async (startDate: string, endDate: string) => {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();
        return await scheduleRepository.getSchedulesByDate(startDate, endDate);
    };
}