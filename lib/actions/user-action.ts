"use server";

import { signUp } from "../services/user-service";
import { IUser, TSignUpForm } from "../types/userType";

interface actionResponse {
  success: boolean;
  data?: object;
  error?: string;
}
export async function signUpAction(
  formData: TSignUpForm
): Promise<actionResponse> {
  let user: IUser = { ...formData, createdDate: new Date() };

  try {
    const response = await signUp(user);
    return response;
  } catch (error) {
    // console.log(error);
    return { success: false, error: "Server error." };
  }
}
