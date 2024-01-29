import { ScheduleRepositoryProtocol, UserRepositoryProtocol, UserVerificationCodeRepositoryProtocol } from "@/layers/use-cases";

export interface UnitOfWorkProtocol {
    transaction(querys: () => Promise<void>): Promise<void>;
    getUserRepository(): UserRepositoryProtocol;
    getScheduleRepository(): ScheduleRepositoryProtocol;
}  