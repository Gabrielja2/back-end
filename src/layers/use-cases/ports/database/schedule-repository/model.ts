export class ScheduleModel {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly start: string | Date,
        public readonly end: string | Date,
        public readonly userId?: string,
    ) { }
}