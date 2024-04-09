"use client";

import { logout } from "@/actions/logout";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between h-14 px-4 bg-[#00a6fb] md:h-16 md:px-6">
      <div className="flex items-center space-x-4">
        <Link
          className="flex items-center space-x-2 text-white"
          href="/dashboard"
        >
          <ActivityIcon className="h-5 w-5" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link
          className="flex items-center space-x-2 text-white"
          href="/transfer"
        >
          <ArrowsRightLeftIcons className="h-5 w-5" />
          <span className="font-semibold">Transfer</span>
        </Link>
        <Link
          className="flex items-center space-x-2 text-white"
          href="/directPayment"
        >
          <SendIcon className="h-5 w-5" />
          <span className="font-semibold">Direct Payment</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ToggleTheme />

        <Button
          type="submit"
          variant="ghost"
          className="text-white text-md font-semibold"
          onClick={() => logout()}
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
};

function ActivityIcon(props: { className: string }) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ArrowsRightLeftIcons(props: { className: string }) {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function SendIcon(props: { className: string }) {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
}
