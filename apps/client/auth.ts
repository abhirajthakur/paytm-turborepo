import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/database";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
