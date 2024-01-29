export class InvalidScheduleDescriptionError extends Error {
    constructor(description: string) {
        super();
        this.name = "InvalidScheduleDescriptionError";
        this.message = `Essa descrição (${description}) é inválida`;
    }
}