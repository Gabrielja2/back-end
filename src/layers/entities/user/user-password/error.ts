export class InvalidUserPasswordError extends Error {
    constructor() {
        super();
        this.name = "InvalidUserPasswordError";
        this.message = "A senha do usuário precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número";
    }
}