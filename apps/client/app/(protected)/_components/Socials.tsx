import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@repo/ui/button";
import { FaGithub, FaGoogle } from "@repo/ui/icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Socials = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex itmes-center w-full gap-2">
      <Button
        size="icon"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle />
      </Button>

      <Button
        size="icon"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
