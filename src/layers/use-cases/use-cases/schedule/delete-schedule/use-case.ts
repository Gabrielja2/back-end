import { DeleteScheduleDTO, DeleteScheduleResponseDTO, NotFoundError, UnauthorizedError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { DeleteScheduleUseCaseProtocol } from "./protocol";


export class DeleteSchedulebyIdUseCase implements DeleteScheduleUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,

    ) { }

    async execute({ id }: DeleteScheduleDTO, loggedUserId?: string): Promise<DeleteScheduleResponseDTO> {
        const scheduleRepository = this.unitOfWork.getScheduleRepository();

        const schedule = await scheduleRepository.getScheduleById(id);
        if (!schedule) return new NotFoundError("Evento encontrado");

        const userSchedulesPermission = schedule.userId === loggedUserId
        if (!userSchedulesPermission) return new UnauthorizedError("Usuario não possui permissão para excluir este evento");

        await scheduleRepository.deleteScheduleById(id);

        return `Evento ${id} excluído`;
    }
}