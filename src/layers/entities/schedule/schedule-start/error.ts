export class InvalidScheduleStartDateError extends Error {
    constructor(startDate: string) {
        super();
        this.name = "InvalidScheduleStartDate";
        this.message = `Essa data inicial (${startDate}) é inválida`;
    }
}