import { GetSchedulesResponseDTO, NotFoundError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { GetSchedulesUseCaseProtocol } from "./protocol";


export class GetSchedulesUseCase implements GetSchedulesUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,

    ) { }

    async execute(): Promise<GetSchedulesResponseDTO> {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        const schedules = await scheduleRepository.getSchedules();

        if (!schedules) return new NotFoundError("Nenhum evento agendado");

        return schedules;
    }
}