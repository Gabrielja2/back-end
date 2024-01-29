export class InvalidScheduleEndDateError extends Error {
    constructor(endDate: string) {
        super();
        this.name = "InvalidScheduleEndDate";
        this.message = `Essa data final (${endDate}) é inválida`;
    }
}