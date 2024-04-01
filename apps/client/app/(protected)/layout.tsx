import { auth } from "@/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard of the user",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div>
      <Navbar />
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
}
