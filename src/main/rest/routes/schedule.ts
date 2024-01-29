import { createScheduleController, authenticateUserMiddleware, getSchdulesController, getSchdulesByUserIdController, deleteScheduleController, updateScheduleController } from "@/main/factories";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
    router.post("/schedules", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(createScheduleController));
    router.get("/schedules", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getSchdulesController));
    router.get("/schedules/user", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(getSchdulesByUserIdController));
    router.delete("/schedules/id/:id", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(deleteScheduleController));
    router.patch("/schedules/id/:id", RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(updateScheduleController));
};