export class ScheduleModel {
    constructor(
        public readonly id: string,
        public readonly description: string,
        public readonly startDate: string | Date,
        public readonly endDate: string | Date,
        public readonly userId?: string,
    ) { }
}