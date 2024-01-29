import { ScheduleModel } from "./model";


export interface ScheduleRepositoryProtocol {
    setContext(context: unknown): void;
    createSchedule(description: string, startDate: Date, endDate: Date, userId: string): Promise<ScheduleModel>;
    getSchedulesByDate(startDate: string, endDate: string): Promise<ScheduleModel[] | null>;
    getSchedulesByUserId(userId: string): Promise<ScheduleModel[] | null>;
    getSchedules(): Promise<ScheduleModel[] | null>;
    getScheduleById(id: string): Promise<ScheduleModel | null>;
    updateScheduleById(id: string, data: Partial<ScheduleModel>): Promise<ScheduleModel>;
    deleteScheduleById(id: string): Promise<string | null>;
}