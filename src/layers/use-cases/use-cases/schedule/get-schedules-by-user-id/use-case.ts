import { GetSchedulesByUserIdDTO, GetSchedulesByUserIdResponseDTO, GetSchedulesByUserIdUseCaseProtocol, NotFoundError, UnitOfWorkProtocol } from "@/layers/use-cases";


export class GetSchedulesByUserIdUseCase implements GetSchedulesByUserIdUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,

    ) { }

    async execute({ userId }: GetSchedulesByUserIdDTO): Promise<GetSchedulesByUserIdResponseDTO> {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        const schedules = await scheduleRepository.getSchedulesByUserId(userId);

        if (!schedules) return new NotFoundError("Nenhum evento agendado para esse usuario");

        return schedules;
    }
}