export class InvalidScheduleEndError extends Error {
    constructor(end: string) {
        super();
        this.name = "InvalidScheduleEndError";
        this.message = `Essa data final (${end}) é inválida`;
    }
} 