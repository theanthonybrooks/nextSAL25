"use client";

import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/authentication";
import { cn } from "@/lib/utils";
import { FaGoogle } from "react-icons/fa";

type GoogleAuthButtonProps = {
  method: "signup" | "signin";
  className?: string;
};

export const GoogleAuthButton = ({
  method,
  className,
}: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth();
  return (
    <Button
      {...(method === "signin"
        ? { onClick: () => signInWith("oauth_google") }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className={cn(
        "bg-themeBlack border-themeGray flex w-full gap-3 rounded-2xl",
        className,
      )}
      variant="outline"
    >
      <Loader loading={false}>
        <FaGoogle />
        {method === "signin" ? "Sign In" : "Sign Up"} with Google
      </Loader>
    </Button>
  );
};
