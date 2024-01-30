import { InvalidUserNameError } from "./error";

export class UserName {

    private readonly name: string;

    private constructor(name: string) {
        this.name = name;
        Object.freeze(this);
    }

    public get value(): string {
        return this.name;
    }

    static create(name: string): UserName | InvalidUserNameError {
        if (!this.validate(name)) return new InvalidUserNameError(name);

        return new UserName(name);
    }

    private static validate(name: string): boolean {
        if (!name) return false;

        if (name.length > 64 || name.length < 3) return false;

        if (typeof name !== "string") return false;

        return true;
    }
}