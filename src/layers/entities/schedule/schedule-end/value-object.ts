import { InvalidScheduleEndDateError } from "./error";

export class ScheduleEndDate {

    private readonly endDate: Date;

    private constructor(endDate: Date) {
        this.endDate = endDate;
        Object.freeze(this);
    }

    public get value(): Date {
        return this.endDate;
    }

    static create(endDate: string): ScheduleEndDate | InvalidScheduleEndDateError {
        if (!this.validate(endDate)) return new InvalidScheduleEndDateError(endDate);

        return new ScheduleEndDate(new Date(endDate));
    }

    private static validate(endDate: string): boolean {
        if (!endDate) return false;

        if (typeof endDate !== "string") return false;

        if (new Date(endDate) < new Date()) return false

        return true;
    }
}