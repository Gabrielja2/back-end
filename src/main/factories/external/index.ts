import {
    CryptographyAdapter,
    AuthenticationAdapter,
    UserRepositoryAdapter,
    UnitOfWorkAdapter,
    ScheduleRepositoryAdapter,
} from "@/layers/external";

export const cryptographyAdapter = new CryptographyAdapter();

export const authenticationAdapter = new AuthenticationAdapter();

export const userRepositoryAdapter = new UserRepositoryAdapter();

export const scheduleRepositoryAdapter = new ScheduleRepositoryAdapter();

export const unitOfWorkAdapter = new UnitOfWorkAdapter(userRepositoryAdapter, scheduleRepositoryAdapter);

