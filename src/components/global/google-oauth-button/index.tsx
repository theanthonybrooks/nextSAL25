"use client"

import Loader from "@/src/components/global/loader"
import { Button } from "@/src/components/ui/button"
import { useGoogleAuth } from "@/src/hooks/authentication"
import { cn } from "@/src/lib/utils"
import { FaGoogle } from "react-icons/fa"

type GoogleAuthButtonProps = {
  method: "signup" | "signin"
  className?: string
}

export const GoogleAuthButton = ({
  method,
  className,
}: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth()
  return (
    <Button
      {...(method === "signin"
        ? { onClick: () => signInWith("oauth_google") }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className={cn(
        "w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray",
        className
      )}
      variant='outline'>
      <Loader loading={false}>
        <FaGoogle />
        {method === "signin" ? "Sign In" : "Sign Up"} with Google
      </Loader>
    </Button>
  )
}
