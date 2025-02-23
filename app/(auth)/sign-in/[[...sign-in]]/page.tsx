"use client";
// import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/");
  };
  return (
    <div className="relative h-full w-full">
      <AnimatePresence>
        <div key="background" className="fixed inset-0 bg-salYellow" />
        {/* Background */}

        {/* Card container */}
        <motion.div
          key="card"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.3, ease: "easeOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          className="z-1 fixed inset-0 flex items-center justify-center"
        >
          <div className="relative flex w-full max-w-md flex-col items-center justify-center">
            <SignIn.Root>
              <Clerk.Loading>
                {(isGlobalLoading) => (
                  <>
                    <SignIn.Step name="start">
                      <div className="scrollbar-hide max-h-[100vh] overflow-y-auto">
                        <Card className="relative w-full border-2 border-black bg-white shadow-none sm:w-96">
                          <button
                            className="absolute right-5 top-4 z-10 text-lg font-bold text-black hover:rounded-full hover:text-salPink focus-visible:bg-salPink"
                            aria-label="Back to homepage"
                            tabIndex={9}
                            onClick={() => router.push("/")}
                          >
                            <X size={25} />
                          </button>

                          <CardHeader className="items-center">
                            {/* <CardTitle>Sign in to Acme Co</CardTitle> */}
                            <Link
                              href="/"
                              prefetch={true}
                              className="mb-5 flex flex-col items-center"
                            >
                              <Image
                                src="/sitelogo.svg"
                                alt="The Street Art List"
                                width={80}
                                height={80}
                                className="mb-4"
                                priority={true}
                              />
                              <Image
                                src="/saltext.png"
                                alt="The Street Art List"
                                width={300}
                                height={100}
                                priority={true}
                              />
                            </Link>
                            <CardDescription className="mt-2 text-base text-black">
                              Welcome back! Please sign in to continue
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <div className="grid grid-cols-2 gap-x-4">
                              <Clerk.Connection name="apple" asChild>
                                <Button
                                  size="sm"
                                  variant="salWithoutShadow"
                                  type="button"
                                  disabled={isGlobalLoading}
                                  tabIndex={1}
                                  className="focus:bg-salYellow/70"
                                >
                                  <Clerk.Loading scope="provider:apple">
                                    {(isLoading) =>
                                      isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        <>
                                          <Icons.apple className="mr-2 size-4" />
                                          Apple
                                        </>
                                      )
                                    }
                                  </Clerk.Loading>
                                </Button>
                              </Clerk.Connection>
                              <Clerk.Connection name="google" asChild>
                                <Button
                                  size="sm"
                                  variant="salWithoutShadow"
                                  type="button"
                                  disabled={isGlobalLoading}
                                  tabIndex={2}
                                  className="focus:bg-salYellow/70"
                                >
                                  <Clerk.Loading scope="provider:google">
                                    {(isLoading) =>
                                      isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        <>
                                          <FaGoogle className="mr-2 size-4" />{" "}
                                          Google
                                        </>
                                      )
                                    }
                                  </Clerk.Loading>
                                </Button>
                              </Clerk.Connection>
                            </div>
                            <p className="flex items-center gap-x-3 text-sm text-black before:h-[1px] before:flex-1 before:bg-black after:h-[1px] after:flex-1 after:bg-black">
                              or
                            </p>
                            <Clerk.Field
                              name="identifier"
                              className="space-y-2"
                            >
                              <Clerk.Label asChild>
                                <Label className="text-black">
                                  Email address
                                </Label>
                              </Clerk.Label>
                              <Clerk.Input
                                type="email"
                                placeholder=" "
                                required
                                asChild
                                className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                                tabIndex={3}
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field name="password" className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Clerk.Label asChild>
                                  <Label className="text-black">Password</Label>
                                </Clerk.Label>
                                <Link
                                  href="/forgot-password"
                                  className="text-sm text-black hover:underline"
                                  tabIndex={6}
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <div className="relative">
                                <Clerk.Input
                                  type={showPassword ? "text" : "password"}
                                  required
                                  placeholder=" "
                                  asChild
                                  className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                                  tabIndex={4}
                                >
                                  <Input />
                                </Clerk.Input>
                                <button
                                  tabIndex={5}
                                  type="button"
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                  {showPassword ? (
                                    <Eye className="size-5 text-black" />
                                  ) : (
                                    <EyeOff className="size-5 text-black" />
                                  )}
                                </button>
                              </div>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
                                <Button
                                  disabled={isGlobalLoading}
                                  variant="salWithShadowYlw"
                                  tabIndex={7}
                                >
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        "Sign in"
                                      );
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignIn.Action>

                              <p className="mt-3 text-center text-sm text-black">
                                Don't have an account?{" "}
                                <Clerk.Link
                                  navigate="sign-up"
                                  className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus:underline focus:decoration-black focus:decoration-2 focus:outline-none focus-visible:underline"
                                  tabIndex={8}
                                >
                                  Sign up
                                </Clerk.Link>
                              </p>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </SignIn.Step>

                    <SignIn.Step name="choose-strategy">
                      <Card className="w-full sm:w-96">
                        <CardHeader>
                          <CardTitle>Use another method</CardTitle>
                          <CardDescription>
                            Facing issues? You can use any of these methods to
                            sign in.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-y-4">
                          <SignIn.SupportedStrategy name="email_code" asChild>
                            <Button
                              type="button"
                              variant="link"
                              disabled={isGlobalLoading}
                            >
                              Email code
                            </Button>
                          </SignIn.SupportedStrategy>
                          <SignIn.SupportedStrategy name="password" asChild>
                            <Button
                              type="button"
                              variant="link"
                              disabled={isGlobalLoading}
                            >
                              Password
                            </Button>
                          </SignIn.SupportedStrategy>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignIn.Action navigate="previous" asChild>
                              <Button disabled={isGlobalLoading}>
                                <Clerk.Loading>
                                  {(isLoading) => {
                                    return isLoading ? (
                                      <Icons.spinner className="size-4 animate-spin" />
                                    ) : (
                                      "Go back"
                                    );
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignIn.Action>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignIn.Step>

                    <SignIn.Step name="verifications">
                      <SignIn.Strategy name="password">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Check your email</CardTitle>
                            <CardDescription>
                              Enter the verification code sent to your email
                            </CardDescription>
                            <p className="text-sm font-normal text-black">
                              Welcome back <SignIn.SafeIdentifier />
                            </p>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <Clerk.Field name="password" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label>Password</Label>
                              </Clerk.Label>
                              <Clerk.Input type="password" asChild>
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
                                <Button
                                  disabled={isGlobalLoading}
                                  variant="salWithShadow"
                                >
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        "Continue"
                                      );
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignIn.Action>
                              <SignIn.Action navigate="choose-strategy" asChild>
                                <Button type="button" size="sm" variant="link">
                                  Use another method
                                </Button>
                              </SignIn.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Strategy>

                      <SignIn.Strategy name="email_code">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Check your email</CardTitle>
                            <CardDescription>
                              Enter the verification code sent to your email
                            </CardDescription>
                            <p className="text-sm font-normal text-black">
                              Welcome back <SignIn.SafeIdentifier />
                            </p>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <Clerk.Field name="code">
                              <Clerk.Label className="sr-only">
                                Email verification code
                              </Clerk.Label>
                              <div className="grid items-center justify-center gap-y-2">
                                <div className="flex justify-center text-center">
                                  <Clerk.Input
                                    type="otp"
                                    autoSubmit
                                    className="flex justify-center has-[:disabled]:opacity-50"
                                    render={({ value, status }) => {
                                      return (
                                        <div
                                          data-status={status}
                                          className="relative flex h-9 w-9 items-center justify-center border-y border-r border-black text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-black"
                                        >
                                          {value}
                                        </div>
                                      );
                                    }}
                                  />
                                </div>
                                <Clerk.FieldError className="block text-center text-sm text-destructive" />
                                <SignIn.Action
                                  asChild
                                  resend
                                  className="text-muted-foreground"
                                  fallback={({ resendableAfter }) => (
                                    <Button variant="link" size="sm" disabled>
                                      Didn&apos;t receive a code? Resend (
                                      <span className="tabular-nums">
                                        {resendableAfter}
                                      </span>
                                      )
                                    </Button>
                                  )}
                                >
                                  <Button variant="link" size="sm">
                                    Didn&apos;t receive a code? Resend
                                  </Button>
                                </SignIn.Action>
                              </div>
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
                                <Button
                                  disabled={isGlobalLoading}
                                  variant="salWithShadow"
                                >
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        "Continue"
                                      );
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignIn.Action>
                              <SignIn.Action navigate="choose-strategy" asChild>
                                <Button size="sm" variant="link">
                                  Use another method
                                </Button>
                              </SignIn.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Strategy>
                    </SignIn.Step>
                  </>
                )}
              </Clerk.Loading>
            </SignIn.Root>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
