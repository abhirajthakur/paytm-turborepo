"use client";

import { Button } from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div
        className="bg-gray-50 py-12 lg:py-16 dark:bg-gray-800"
        data-theme="light"
      >
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="grid gap-2">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-50">
                  Pay with Ease
                </h1>

                <p className="max-w-[700px] mt-8 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  The secure and convenient way to manage your money. Make
                  payments, transfer funds, and more, all from your mobile
                  device.
                </p>
              </div>

              <div className="flex flex-col items-center px-4 md:px-6">
                <Button
                  size="lg"
                  variant="custom"
                  onClick={() => router.push("/auth/signin")}
                  className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50"
                >
                  Login
                </Button>

                <Image
                  alt="Logo"
                  className="overflow-hidden rounded-lg"
                  height={200}
                  src="/pay-with-ease.png"
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16 dark:bg-gray-900" data-theme="light">
        <div className="container grid items-center gap-12 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Secure Payments. Easy Transfers. Anywhere.
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto dark:text-gray-400">
              Experience the features that make managing your money a breeze.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Image
                alt="Fast Transactions"
                className="aspect-[1/1] overflow-hidden rounded-xl object-[200%]"
                height={150}
                src="/fast-transactions.png"
                width={150}
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                Fast Transactions
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your payments are processed quickly, so you can get back to what
                matters.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Image
                alt="Low Fees"
                className="aspect-[1/1] overflow-hidden rounded-xl object-[200%]"
                height={150}
                src="/low-fees.png"
                width={150}
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                Low Fees
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We believe in keeping your costs down, so you can keep more of
                your money.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Image
                alt="24/7 Customer Support"
                className="aspect-[1/1] overflow-hidden rounded-xl object-[200%]"
                height={150}
                src="/customer-support.png"
                width={150}
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                24/7 Customer Support
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need help? Our team is always here to assist you, day or night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="bg-gray-50 py-12 lg:py-16 dark:bg-gray-800"
        data-theme="light"
      >
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="text-gray-900 dark:text-gray-400">
              Create an account and start using the app today.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 hover:text-gray-950 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              onClick={() => router.push("/auth/signup")}
            >
              Create an Account
            </Button>
          </div>
        </div>
      </div>
      <footer
        className="bg-white py-12 lg:py-16 dark:bg-gray-900"
        data-theme="light"
      >
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <Link
                className="text-sm font-medium text-gray-800 transition-colors hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-medium text-gray-800 transition-colors hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
                href="/about"
              >
                About Us
              </Link>
              <Link
                className="text-sm font-medium text-gray-800 transition-colors hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
                href="/contact"
              >
                Contact
              </Link>
            </nav>
            <div className="ml-auto grid gap-1">
              <Link
                className="inline-flex items-center text-sm font-medium text-gray-800 transition-colors hover:text-gray-400 rounded-md dark:text-gray-400 dark:hover:text-gray-50"
                href={"/"}
              >
                Terms of Service
              </Link>
              <Link
                className="inline-flex items-center text-sm font-medium text-gray-800 transition-colors hover:text-gray-400 rounded-md dark:text-gray-400 dark:hover:text-gray-50"
                href="/"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
