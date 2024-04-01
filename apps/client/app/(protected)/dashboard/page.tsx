"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const session = useSession();

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
