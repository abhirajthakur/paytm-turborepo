import { getBalance } from "@/actions/balance";
import { auth } from "@/auth";
import { Card } from "@repo/ui/card";
import moment from "moment";
import Image from "next/image";

const greetingText = (): string => {
  const now = moment();
  const currentHour = now.local().hour();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 17) {
    return "Good Afternoon";
  } else if (currentHour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const balance = await getBalance();

  return (
    <div className="flex flex-col min-h-screen p-4 lg:p-6 xl:p-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <PackageIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            {greetingText()}, {name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here's your dashboard. It's looking good today. If you need help,
            we're here for you.
          </p>
        </div>
        <Card className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <Image
                alt="Avatar"
                className="rounded-full object-cover aspect-[96/96]"
                height="96"
                src={session?.user?.image ?? ""}
                width="96"
              />
            ) : (
              <UserIcon className="dark:text-white" />
            )}
            <div className="grid gap-1">
              <div className="text-2xl font-bold">{name}</div>
              <div className="text-gray-500 dark:text-gray-400">{email}</div>
            </div>
            {balance && (
              <div className="ml-auto text-2xl font-semibold">
                ₹ {balance.amount ?? 0}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function PackageIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function UserIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      width="96"
      height="96"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
