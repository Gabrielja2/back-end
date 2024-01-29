import {
    UserEmail,
    UserPassword,
    InvalidUserEmailError,
    InvalidUserPasswordError,
    UserName,
    InvalidUserNameError,
} from "@/layers/entities";

export class User {

    private constructor(
        public username?: UserName,
        public email?: UserEmail,
        public password?: UserPassword,
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        Object.freeze(this);
    }

    static create(
        username?: string,
        email?: string,
        password?: string,
    ): User | InvalidUserNameError | InvalidUserEmailError | InvalidUserPasswordError {
        const emailOrError = UserEmail.create(email);
        if (emailOrError instanceof Error) return emailOrError;

        const passwordOrError = UserPassword.create(password);
        if (passwordOrError instanceof Error) return passwordOrError;

        const nameOrError = UserName.create(username)
        if (nameOrError instanceof Error) return nameOrError;

        return new User(nameOrError, emailOrError, passwordOrError);
    }
}