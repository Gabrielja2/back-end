import {
    createUserController,
    deleteUserController,
    getUsersController,
    loginUserController,
    updateUserController,
    authenticateUserMiddleware
} from "@/main/factories";
import { RestAdapter } from "@/main/rest/adapter";
import { Router } from "express";

export default (router: Router): void => {
    router.post("/users", RestAdapter.route(createUserController));
    router.get("/users", RestAdapter.route(getUsersController));
    router.delete(`/users/id/:id`, RestAdapter.middleware(authenticateUserMiddleware), RestAdapter.route(deleteUserController));
    router.patch("/users/id/:id", RestAdapter.route(updateUserController));
    router.post("/users/login", RestAdapter.route(loginUserController));
};