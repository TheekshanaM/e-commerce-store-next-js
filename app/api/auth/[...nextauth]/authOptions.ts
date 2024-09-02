import { getUserByEmail } from "@/lib/services/user-service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import * as Yup from "yup";

const userSchema = Yup.object({
  password: Yup.string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/sign-in" },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          try {
            userSchema.validateSync({
              password: credentials?.password,
              email: credentials?.email,
            });
          } catch (error) {
            if (error instanceof Yup.ValidationError) {
              throw new Error(error.errors.join(", "), {
                cause: "handled_error",
              });
            } else {
              throw new Error("An unexpected error occurred");
            }
          }

          if (credentials?.email && credentials?.password) {
            const foundUser = await getUserByEmail(credentials?.email);

            if (foundUser) {
              const match = await bcrypt.compare(
                credentials.password,
                foundUser.password
              );

              const jUser = JSON.parse(JSON.stringify(foundUser));
              if (match) {
                delete jUser.password;

                // jUser.access_token = "ccccc";
                return jUser;
              }
            }
          }

          throw new Error("Invalid credentials", { cause: "handled_error" });
        } catch (error) {
          const err = error as Error;
          if (err.cause === "handled_error") {
            throw new Error(err.message);
          }
          console.log("error", err.message);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user, account }) {
    //   if (user) token.role = user.role;
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session?.user) session.user.role = token.role;
    //   return session;
    // },
  },
};
