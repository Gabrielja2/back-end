import { InvalidScheduleTitleError, InvalidScheduleEndError, InvalidScheduleStartError, ScheduleTitle, ScheduleEnd, ScheduleStart } from "@/layers/entities";


export class Schedule {

    private constructor(
        public title?: ScheduleTitle,
        public start?: ScheduleStart,
        public end?: ScheduleEnd,
    ) {
        this.title = title;
        this.start = start;
        this.end = end;
        Object.freeze(this);
    }

    static create(
        title?: string,
        start?: string,
        end?: string,
    ): Schedule | InvalidScheduleTitleError | InvalidScheduleEndError | InvalidScheduleStartError {
        const titleOrError = ScheduleTitle.create(title);
        if (titleOrError instanceof Error) return titleOrError;

        const startOrError = ScheduleStart.create(start);
        if (startOrError instanceof Error) return startOrError;

        const endOrError = ScheduleEnd.create(end);
        if (endOrError instanceof Error) return endOrError;

        return new Schedule(titleOrError, startOrError, endOrError);
    }
}