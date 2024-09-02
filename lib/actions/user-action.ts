"use server";

import * as Yup from "yup";
import { getUserByEmail, signUp } from "../services/user-service";
import { IUser, TSignUpForm, userRoles } from "../types/userType";
import bcrypt from "bcrypt";
import { actionResponse } from "../types/actionTypes";

export async function signUpAction(
  formData: TSignUpForm
): Promise<actionResponse> {
  try {
    const userSchema = Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    });

    await userSchema.validate(formData, { abortEarly: false });

    const existingUser = await getUserByEmail(formData.email);

    if (existingUser) {
      return { success: false, error: "Email already exist." };
    }

    const saltRounds = 10;
    let user: IUser = {
      ...formData,
      createdDate: new Date(),
      role: userRoles.User,
    };

    user.password = await bcrypt.hash(user.password, saltRounds);

    const { password, ...response } = await signUp(user);

    return { success: true, data: response };
  } catch (error) {
    // console.log(error);
    if (error instanceof Yup.ValidationError) {
      return { success: false, error: error.errors.join(", ") };
    }
    return { success: false, error: "Server error." };
  }
}
