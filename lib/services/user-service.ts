import "server-only";
import { UserModel } from "../models/user";
import { IUser } from "../types/userType";
import dbConnect from "./db-connect";

export async function signUp(user: IUser): Promise<IUser> {
  await dbConnect();

  const createdUser = await UserModel.create(user);

  return JSON.parse(JSON.stringify(createdUser));
}

export async function getUserByEmail(email: string) {
  await dbConnect();
  const user = await UserModel.findOne({ email: email });

  return user;
}
