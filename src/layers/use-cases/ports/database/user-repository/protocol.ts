import { UserModel } from "./model";

export interface UserRepositoryProtocol {
    setContext(context: unknown): void;
    createUser(username: string, email: string, hasPassword: string): Promise<UserModel>;
    getUsers(): Promise<UserModel[] | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserById(id: string): Promise<UserModel | null>;
    updateUser(id: string, data: Partial<UserModel>): Promise<UserModel>;
    deleteUser(id: string): Promise<string | null>;
    updateUserByEmail(email: string, data: Partial<UserModel>): Promise<UserModel>;
}