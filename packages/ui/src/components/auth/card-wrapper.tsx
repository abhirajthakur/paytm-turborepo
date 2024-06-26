"use client";

import { ReactNode } from "react";
import { CardFooter } from "../ui/card";

interface CardWrapperProps {
  children: ReactNode;
  headerText: string;
  headerWarning?: string;
  footerText: string;
  footerHref: string;
  socialButtons?: ReactNode;
}

export const CardWrapper = ({
  children,
  headerText,
  headerWarning,
  footerText,
  footerHref,
  socialButtons,
}: CardWrapperProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center overflow-hidden dark: ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl text-black font-semibold">
                {headerText}
              </h1>
              <p className="mt-2 text-sm text-gray-500">{headerWarning}</p>
            </div>
            <div>
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {children}
              </div>

              <div>{socialButtons}</div>
            </div>
          </div>
          <CardFooter className="pt-2 flex items-center justify-center">
            <a
              className="hover:underline text-gray-600 dark:text-gray-900 font-normal"
              href={footerHref}
            >
              {footerText}
            </a>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};
