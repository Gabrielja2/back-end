import { schedule as SchedulePrismaModel } from "@prisma/client";
import { ScheduleModel, ScheduleRepositoryProtocol } from "@/layers/use-cases";
import { DatabaseSQLHelper } from "../helpers";
import { Context } from "../types";
import { camelToSnakeCaseMapper } from "../mappers";

export class ScheduleRepositoryAdapter implements ScheduleRepositoryProtocol {

    private context: Context = DatabaseSQLHelper.client;

    setContext(context: unknown): void {
        this.context = context as Context;
    }

    private toMapperScheduleModel(schedule: SchedulePrismaModel): ScheduleModel {
        return new ScheduleModel(
            schedule.id,
            schedule.title,
            schedule.start,
            schedule.end,
            schedule.user_id
        );
    }


    async createSchedule(title: string, start: Date, end: Date, userId: string): Promise<ScheduleModel> {

        const schedule = await this.context.schedule.create({
            data: {
                title,
                start,
                end,
                user_id: userId
            }
        })

        return this.toMapperScheduleModel(schedule);
    }

    async getSchedulesByDate(start: string, end: string): Promise<ScheduleModel[] | null> {
        const schedulesList: ScheduleModel[] = [];

        const schedules = await this.context.schedule.findMany({
            where: {
                OR: [
                    {
                        start: {
                            lte: new Date(end),
                            gte: new Date(start),
                        },
                    },
                    {
                        end: {
                            lte: new Date(end),
                            gte: new Date(start),
                        },
                    },
                    {
                        AND: [
                            { start: { lte: new Date(start) } },
                            { end: { gte: new Date(end) } },
                        ],
                    },
                ],
            },
        });

        for (const schedule of schedules) {
            schedulesList.push(this.toMapperScheduleModel(schedule));
        }

        if (schedules.length === 0) return null;

        return schedulesList;
    }


    async getSchedulesByUserId(userId: string): Promise<ScheduleModel[] | null> {
        const schedulesList: ScheduleModel[] = [];

        const schedules = await this.context.schedule.findMany({
            where: {
                user_id: userId
            }
        })

        for (const schedule of schedules) {
            schedulesList.push(this.toMapperScheduleModel(schedule));
        }
        if (schedules.length === 0) return null

        return schedulesList
    }

    async getSchedules(): Promise<ScheduleModel[] | null> {
        const schedulesList: ScheduleModel[] = [];

        const schedules = await this.context.schedule.findMany()

        for (const schedule of schedules) {
            schedulesList.push(this.toMapperScheduleModel(schedule));
        }
        if (schedules.length === 0) return null

        return schedulesList
    }

    async getScheduleById(id: string): Promise<ScheduleModel | null> {

        const response = await this.context.schedule.findUnique({
            where: {
                id
            }
        })

        if (!response) return null

        return this.toMapperScheduleModel(response)
    }

    async updateScheduleById(id: string, data: Partial<ScheduleModel>): Promise<ScheduleModel> {

        const schedule = await this.context.schedule.update({
            where: {
                id
            },
            data: {
                ...camelToSnakeCaseMapper(data)
            }
        })

        return this.toMapperScheduleModel(schedule)
    }


    async deleteScheduleById(id: string): Promise<string | null> {

        const response = await this.context.schedule.delete({
            where: {
                id
            }
        })

        if (!response) return null

        return response.id
    }

}