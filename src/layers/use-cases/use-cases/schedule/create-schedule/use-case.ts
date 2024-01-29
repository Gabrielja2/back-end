import { CreateScheduleDTO, CreateScheduleResponseDTO, InvalidParamError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { CreateScheduleUseCaseProtocol } from "./protocol";
import { Schedule } from "@/layers/entities";


export class CreateScheduleUseCase implements CreateScheduleUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,

    ) { }

    async execute({ description, startDate, endDate }: CreateScheduleDTO, loggedUserId?: string): Promise<CreateScheduleResponseDTO> {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        if (await this.getEventsByDate(startDate, endDate)) return new InvalidParamError('Ja existe um evento neste periodo');

        const scheduleOrError = Schedule.create(description, startDate, endDate);
        if (scheduleOrError instanceof Error) return scheduleOrError;

        await scheduleRepository.createSchedule(scheduleOrError.description.value, scheduleOrError.startDate.value, scheduleOrError.endDate.value, loggedUserId);

        return scheduleOrError.description.value;
    }

    private readonly getEventsByDate = async (startDate: string, endDate: string) => {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();
        return await scheduleRepository.getSchedulesByDate(startDate, endDate);
    };
}