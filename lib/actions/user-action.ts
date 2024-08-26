"use server";

import { signUp } from "../services/user-service";
import { IUser, TSignUpForm } from "../types/userType";
import bcrypt from "bcrypt";

interface actionResponse {
  success: boolean;
  data?: object;
  error?: string;
}
export async function signUpAction(
  formData: TSignUpForm
): Promise<actionResponse> {
  const saltRounds = 10;
  let user: IUser = { ...formData, createdDate: new Date() };

  try {
    user.password = await bcrypt.hash(user.password, saltRounds);

    const response = await signUp(user);
    return response;
  } catch (error) {
    // console.log(error);
    return { success: false, error: "Server error." };
  }
}
