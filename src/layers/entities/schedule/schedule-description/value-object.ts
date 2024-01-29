import { InvalidScheduleDescriptionError } from "./error";

export class ScheduleDescription {

    private readonly description: string;

    private constructor(description: string) {
        this.description = description;
        Object.freeze(this);
    }

    public get value(): string {
        return this.description;
    }

    static create(description: string): ScheduleDescription | InvalidScheduleDescriptionError {
        if (!this.validate(description)) return new InvalidScheduleDescriptionError(description);

        return new ScheduleDescription(description);
    }

    private static validate(description: string): boolean {
        if (!description) return false;

        if (description.length > 256) return false;

        if (typeof description !== "string") return false;

        return true;
    }
}