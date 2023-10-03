import { User } from "@/model/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await User.findByCredentials(
          credentials.email,
          credentials.password
        );

        return {
          email: user.email,
          name: null,
          image: null,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
