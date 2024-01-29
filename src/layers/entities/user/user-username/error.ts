export class InvalidUserNameError extends Error {
    constructor(name: string) {
        super();
        this.name = "InvalidUserNameError";
        this.message = `Esse nome (${name}) é inválido`;
    }
}