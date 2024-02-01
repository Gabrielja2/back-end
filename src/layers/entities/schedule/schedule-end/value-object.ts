import { InvalidScheduleEndError } from "./error";

export class ScheduleEnd {

    private readonly end: Date;

    private constructor(end: Date) {
        this.end = end;
        Object.freeze(this);
    }

    public get value(): Date {
        return this.end;
    }

    static create(end: string): ScheduleEnd | InvalidScheduleEndError {
        if (!this.validate(end)) return new InvalidScheduleEndError(end);

        return new ScheduleEnd(new Date(end));
    }

    private static validate(end: string): boolean {
        if (!end) return false;

        if (typeof end !== "string") return false;

        if (new Date(end) < new Date()) return false

        return true;
    }
}