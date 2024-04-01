"use client";

import { logout } from "@/actions/logout";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-14 px-4 bg-[#00a6fb] md:h-16 md:px-6">
      <div className="flex items-center space-x-4">
        <Link
          className="flex items-center space-x-2 text-white"
          href="/dashboard"
        >
          <ActivityIcon className="h-5 w-5" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link className="flex items-center space-x-2 text-white" href="#">
          <CompassIcon className="h-5 w-5" />
          <span className="font-semibold">Explore</span>
        </Link>
        <Link className="flex items-center space-x-2 text-white" href="#">
          <ArrowUpCircleIcon className="h-5 w-5" />
          <span className="font-semibold">Transfer</span>
        </Link>
        <Link className="flex items-center space-x-2 text-white" href="#">
          <CreditCardIcon className="h-5 w-5" />
          <span className="font-semibold">Transactions</span>
        </Link>
      </div>
      <div>
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

function CompassIcon(props: { className: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function ArrowUpCircleIcon(props: { className: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
}

function CreditCardIcon(props: { className: string }) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
