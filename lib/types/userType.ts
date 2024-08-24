export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdDate: Date;
}

export type TSignUpForm = Omit<IUser, "createdDate">;
