import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "@/lib/actions/user-action";

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
        const { email, password } = credentials as Record<
          "password" | "email",
          string
        >;

        const { error, data } = await loginAction({ email, password });

        if (error) {
          throw new Error(error);
        }

        return data as User;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user, account }) {
    //   console.log("user", user);
    //   if (user) token.role = user.role;
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session?.user) session.user.role = token.role;
    //   return session;
    // },
  },
};
