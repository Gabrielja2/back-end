export class InvalidScheduleStartError extends Error {
    constructor(start: string) {
        super();
        this.name = "InvalidScheduleStartError";
        this.message = `Essa data inicial (${start}) é inválida`;
    }
}