export enum userRoles {
  User = "user",
  Admin = "admin",
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: userRoles;
  password: string;
  createdDate: Date;
}

export type TSignUpForm = Omit<IUser, "createdDate" | "role">;

export type TSignUpUIForm = TSignUpForm & {
  confirmPassword: string;
  acceptedTerms: boolean;
};

export type TLogin = Pick<IUser, "email" | "password">;
