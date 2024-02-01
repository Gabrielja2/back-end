import { ScheduleModel } from "./model";


export interface ScheduleRepositoryProtocol {
    setContext(context: unknown): void;
    createSchedule(title: string, start: Date, end: Date, userId: string): Promise<ScheduleModel>;
    getSchedulesByDate(start: string, end: string): Promise<ScheduleModel[] | null>;
    getSchedulesByUserId(userId: string): Promise<ScheduleModel[] | null>;
    getSchedules(): Promise<ScheduleModel[] | null>;
    getScheduleById(id: string): Promise<ScheduleModel | null>;
    updateScheduleById(id: string, data: Partial<ScheduleModel>): Promise<ScheduleModel>;
    deleteScheduleById(id: string): Promise<string | null>;
}