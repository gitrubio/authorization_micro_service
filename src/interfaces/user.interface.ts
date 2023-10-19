import { Model, Types } from "mongoose";

export interface IUser {
    username: string,
    email: string,
    password: string,
    roles: Types.ObjectId[],
}

export interface UserModel extends Model<IUser> {
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}