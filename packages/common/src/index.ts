import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const TransferSchema = z.object({
  amount: z.string().min(1, { message: "Amount cannot be zero" }),
  bank: z.string().min(1, { message: "Please select a bank provider" }),
});

export const DirectTransferSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  amount: z.string().min(1, { message: "Amount cannot be zero" }),
});
