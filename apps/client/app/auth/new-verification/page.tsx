"use client";

import { newVerification } from "@/actions/verification";
import { CardWrapper } from "@repo/ui/auth/card-wrapper";
import { FormError } from "@repo/ui/auth/form-error";
import { FormSuccess } from "@repo/ui/auth/form-success";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function NewVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerText="Confirming your email"
      footerText="Back to login"
      footerHref="/auth/signin"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <HashLoader size={45} color="gray" />}
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
