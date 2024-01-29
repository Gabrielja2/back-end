import { InvalidUserEmailError } from "./error";

export class UserEmail {

    private readonly userEmail: string;

    private constructor(userEmail: string) {
        this.userEmail = userEmail;
        Object.freeze(this);
    }

    public get value(): string {
        return this.userEmail;
    }

    static create(userEmail: string): UserEmail | InvalidUserEmailError {
        if (!this.validate(userEmail)) return new InvalidUserEmailError(userEmail);

        return new UserEmail(userEmail);
    }

    private static validate(userEmail: string): boolean {
        if (!userEmail) return false;

        if (userEmail.length > 256) return false;

        const userEmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!userEmailRegEx.test(userEmail)) return false;

        const [account, domain] = userEmail.split("@");

        if (account.length > 64 || domain.length > 64) return false;

        return true;
    }
}