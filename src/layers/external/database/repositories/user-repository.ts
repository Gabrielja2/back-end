import { user as UserPrismaModel } from "@prisma/client";
import { UserModel, UserRepositoryProtocol } from "@/layers/use-cases";
import { DatabaseSQLHelper } from "../helpers";
import { Context } from "../types";
import { camelToSnakeCaseMapper } from "../mappers";

export class UserRepositoryAdapter implements UserRepositoryProtocol {

    private context: Context = DatabaseSQLHelper.client;

    setContext(context: unknown): void {
        this.context = context as Context;
    }

    private toMapperUserModel(user: UserPrismaModel): UserModel {
        return new UserModel(
            user.id,
            user.email,
            user.username,
            user.password,
            null
        );
    }

    async createUser(username: string, email: string, hasPassword: string): Promise<UserModel> {
        const user = await this.context.user.create({
            data: {
                email,
                username,
                password: hasPassword,
            }
        })
        return this.toMapperUserModel(user);
    }

    async getUsers(): Promise<UserModel[] | null> {
        let userList = []

        const users = await this.context.user.findMany({

        })

        for (let user of users) {
            userList.push(this.toMapperUserModel(user))
        }

        if (users.length === 0) return null

        return userList;

    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const user = await this.context.user.findUnique({
            where: {
                email
            }

        })

        if (!user) return null

        return this.toMapperUserModel(user)
    }

    async getUserById(id: string): Promise<UserModel | null> {
        const user = await this.context.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return null

        return this.toMapperUserModel(user)
    }

    async updateUser(id: string, data: Partial<UserModel>): Promise<UserModel> {
        const user = await this.context.user.update({
            where: {
                id
            },
            data: {
                ...camelToSnakeCaseMapper(data),
                updated_at: new Date()
            }
        })
        return this.toMapperUserModel(user)
    }

    async updateUserByEmail(email: string, data: Partial<UserModel>): Promise<UserModel> {
        const user = await this.context.user.update({
            where: {
                email
            },
            data: {
                ...camelToSnakeCaseMapper(data),
                updated_at: new Date()
            }
        });

        return this.toMapperUserModel(user);
    }


    async deleteUser(id: string): Promise<string | null> {
        const response = await this.context.user.delete({
            where: {
                id
            }
        })

        if (!response) return null

        return response.id
    }
}