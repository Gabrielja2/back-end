import { InvalidScheduleStartError } from "./error";

export class ScheduleStart {

    private readonly start: Date;

    private constructor(start: Date) {
        this.start = start;
        Object.freeze(this);
    }

    public get value(): Date {
        return this.start;
    }

    static create(start: string): ScheduleStart | InvalidScheduleStartError {
        if (!this.validate(start)) return new InvalidScheduleStartError(start);

        return new ScheduleStart(new Date(start));
    }

    private static validate(start: string): boolean {
        if (!start) return false;

        if (typeof start !== "string") return false;

        if (new Date(start) < new Date()) return false

        return true;
    }
}