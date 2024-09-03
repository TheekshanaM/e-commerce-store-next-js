import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("cccccccccccccccc");

    console.log("req", req.nextauth);
    // console.log(req.nextauth.token.role);

    // if (
    //   req.nextUrl.pathname.startsWith("/CreateUser") &&
    //   req.nextauth.token.role != "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
  },

  {
    secret: process.env.AUTH_SECRET,
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
// export const config = {
//   matcher: [
//     // Match all routes except the ones that start with /login and api and the static folder
//     "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
//   ],
// };
export const config = { matcher: ["/product-catalog"] };
