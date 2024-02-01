import { ScheduleModel } from "../schedule-repository/model";

export class UserModel {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly username: string,
        public readonly password: string,
        public readonly schedules: ScheduleModel
    ) { }
}