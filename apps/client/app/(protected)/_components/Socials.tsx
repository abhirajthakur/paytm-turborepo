import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@repo/ui/button";
import { FaGithub, FaGoogle } from "@repo/ui/icons";
import { signIn } from "next-auth/react";

export const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
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
