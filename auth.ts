import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./src/models/findUserByEmail";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        // console.log(credentials);

        const user = await findUserByCredentials(credentials.email as string, credentials.password as string);
        return user
      },
    })
  ],
  // session:{
  //   strategy: "jwt",
  //   maxAge: 60 * 60 * 24 * 2,
  // }
})