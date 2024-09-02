import { Schema, model, models } from "mongoose";
import { IUser, userRoles } from "../types/userType";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: userRoles, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

export const UserModel = models.User || model<IUser>("User", userSchema);
