import {
    ScheduleRepositoryProtocol,
    UnitOfWorkProtocol,
    UserRepositoryProtocol,
    UserVerificationCodeRepositoryProtocol,
} from "@/layers/use-cases";
import { DatabaseSQLHelper } from "../helpers";
import { Context } from "../types";

export class UnitOfWorkAdapter implements UnitOfWorkProtocol {
    constructor(
        private readonly userRepository: UserRepositoryProtocol,
        private readonly scheduleRepository: ScheduleRepositoryProtocol
    ) { }

    private setContext(context: Context) {
        this.userRepository.setContext(context);
        this.scheduleRepository.setContext(context);
    }

    async transaction(querys: () => Promise<void>) {
        await DatabaseSQLHelper.client.$transaction(async context => {
            this.setContext(context);
            await querys();
        });

        this.setContext(DatabaseSQLHelper.client);
    }

    getUserRepository(): UserRepositoryProtocol {
        return this.userRepository;
    }

    getScheduleRepository(): ScheduleRepositoryProtocol {
        return this.scheduleRepository;
    }
}