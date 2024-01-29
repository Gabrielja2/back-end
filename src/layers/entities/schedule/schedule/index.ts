import { InvalidScheduleDescriptionError, InvalidScheduleEndDateError, InvalidScheduleStartDateError, ScheduleDescription, ScheduleEndDate, ScheduleStartDate } from "@/layers/entities";


export class Schedule {

    private constructor(
        public description?: ScheduleDescription,
        public startDate?: ScheduleStartDate,
        public endDate?: ScheduleEndDate,
    ) {
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        Object.freeze(this);
    }

    static create(
        description?: string,
        startDate?: string,
        endDate?: string,
    ): Schedule | InvalidScheduleDescriptionError | InvalidScheduleStartDateError | InvalidScheduleEndDateError {
        const descriptionOrError = ScheduleDescription.create(description);
        if (descriptionOrError instanceof Error) return descriptionOrError;

        const startDateOrError = ScheduleStartDate.create(startDate);
        if (startDateOrError instanceof Error) return startDateOrError;

        const endDateOrError = ScheduleEndDate.create(endDate);
        if (endDateOrError instanceof Error) return endDateOrError;

        return new Schedule(descriptionOrError, startDateOrError, endDateOrError);
    }
}