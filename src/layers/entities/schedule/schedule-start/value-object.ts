import { InvalidScheduleStartDateError } from "./error";

export class ScheduleStartDate {

    private readonly startDate: Date;

    private constructor(startDate: Date) {
        this.startDate = startDate;
        Object.freeze(this);
    }

    public get value(): Date {
        return this.startDate;
    }

    static create(startDate: string): ScheduleStartDate | InvalidScheduleStartDateError {
        if (!this.validate(startDate)) return new InvalidScheduleStartDateError(startDate);

        return new ScheduleStartDate(new Date(startDate));
    }

    private static validate(startDate: string): boolean {
        if (!startDate) return false;

        if (typeof startDate !== "string") return false;

        if (new Date(startDate) < new Date()) return false

        return true;
    }
}