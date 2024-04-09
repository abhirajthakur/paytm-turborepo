"use client";

import { getBalance } from "@/actions/balance";
import {
  createOnRampTransaction,
  getOnrampTransactions,
} from "@/actions/onRampTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransferSchema } from "@repo/common/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useEffect, useState, useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { BalanceCard, BalanceProps } from "../_components/BalanceCard";
import { BalanceSkeleton } from "../_components/BalanceSkeleton";
import {
  OnRampTransactions,
  TransactionProps,
} from "../_components/OnRampTransactions";
import { TransactionSkeleton } from "../_components/TransactionSkeleton";

export default function TransferPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [transactions, setTransacions] = useState<
    TransactionProps[] | undefined
  >();
  const [balance, setBalance] = useState<BalanceProps>();

  const form = useForm<z.infer<typeof TransferSchema>>({
    resolver: zodResolver(TransferSchema),
    defaultValues: {
      amount: "",
      bank: "",
    },
  });

  const onSubmit = ({ amount, bank }: z.infer<typeof TransferSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createOnRampTransaction(Number(amount), bank).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });

      getOnrampTransactions().then((data) => {
        setError(data?.error);
        setTransacions(data?.transactions);
      });
    });
  };

  useEffect(() => {
    getOnrampTransactions().then((data) => {
      setError(data?.error);
      setTransacions(data?.transactions);
    });

    getBalance().then((data) => {
      setError(data?.error);
      setBalance({ amount: data.amount ?? 0, locked: data.locked ?? 0 });
    });
  }, []);

  return (
    <div className="g-gray-100 m-8">
      <h1 className="text-4xl font-bold text-[#51a9f3]">Transfer</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="w-full h-max">
          <CardHeader>
            <CardTitle>Add Money</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
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
                            onChange={(event) => {
                              const isNumber = /^\d+$/.test(
                                (+event.target.value).toString(),
                              );
                              if (isNumber) {
                                field.onChange(event.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }: { field: FieldValues }) => (
                      <FormItem>
                        <FormLabel>Bank</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger disabled={isPending}>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectItem value="sbi">SBI Bank</SelectItem>
                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                            <SelectItem value="axis">Axis Bank</SelectItem>
                            <SelectItem value="icici">ICICI Bank</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />

                <div className="flex items-center justify-center">
                  <Button disabled={isPending} type="submit" size="lg">
                    Add Money
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {!balance ? (
                <BalanceSkeleton />
              ) : (
                <BalanceCard
                  amount={balance?.amount ?? 0}
                  locked={balance?.locked ?? 0}
                />
              )}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <FormError message={error} />
              {!transactions ? (
                <TransactionSkeleton />
              ) : (
                <OnRampTransactions transactions={transactions ?? []} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
