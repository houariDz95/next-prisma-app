
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from '../../../prisma/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: "heidjskfjdkfhjf",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)