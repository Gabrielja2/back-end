import { InvalidScheduleTitleError } from "./error";

export class ScheduleTitle {

    private readonly title: string;

    private constructor(title: string) {
        this.title = title;
        Object.freeze(this);
    }

    public get value(): string {
        return this.title;
    }

    static create(title: string): ScheduleTitle | InvalidScheduleTitleError {
        if (!this.validate(title)) return new InvalidScheduleTitleError(title);

        return new ScheduleTitle(title);
    }

    private static validate(title: string): boolean {
        if (!title) return false;

        if (title.length > 256) return false;

        if (typeof title !== "string") return false;

        return true;
    }
}