"use client";

import { directTransfer, getDirectTransfers } from "@/actions/transfer";
import { zodResolver } from "@hookform/resolvers/zod";
import { DirectTransferSchema } from "@repo/common/schema";
import { FormError } from "@repo/ui/auth/form-error";
import { FormSuccess } from "@repo/ui/auth/form-success";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { useEffect, useState, useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import {
  DirectTransferProps,
  DirectTransfers,
} from "../_components/DirectTransfers";
import { TransactionSkeleton } from "../_components/TransactionSkeleton";

export default function DirectPaymentPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [directTransfers, setDirectTransfers] =
    useState<DirectTransferProps[]>();

  const form = useForm<z.infer<typeof DirectTransferSchema>>({
    resolver: zodResolver(DirectTransferSchema),
    defaultValues: {
      email: "",
      amount: "",
    },
  });

  const onSubmit = ({ email, amount }: { email: string; amount: string }) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      directTransfer(email, Number(amount)).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  useEffect(() => {
    getDirectTransfers().then((data) => {
      setError(data?.error);
      setDirectTransfers(data?.transfers);
    });
  }, []);

  return (
    <div className="m-auto mt-10 max-w-xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Money</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: FieldValues }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter email of the user to send"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }: { field: FieldValues }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter amount"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="flex items-center justify-center">
                <Button disabled={isPending} type="submit" size="lg">
                  Send Money
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {!directTransfers ? (
              <TransactionSkeleton />
            ) : (
              <DirectTransfers transfers={directTransfers ?? []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
