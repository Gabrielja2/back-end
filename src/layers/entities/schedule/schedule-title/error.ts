export class InvalidScheduleTitleError extends Error {
    constructor(title: string) {
        super();
        this.name = "InvalidScheduleTitleError";
        this.message = `Essa título (${title}) é inválido`;
    }
}