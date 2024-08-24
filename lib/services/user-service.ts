import "server-only";
import { UserModel } from "../models/user";
import { IUser } from "../types/userType";
import dbConnect from "./db-connect";

interface serviceResponse {
  success: boolean;
  data?: object;
  error?: string;
}
export async function signUp(user: IUser): Promise<serviceResponse> {
  await dbConnect();

  const existingUser = await UserModel.findOne({ email: user.email });

  if (existingUser) {
    return { success: false, error: "Email already exist." };
  }
  const createdUser = await UserModel.create(user);

  return { success: true, data: JSON.parse(JSON.stringify(createdUser)) };
}
