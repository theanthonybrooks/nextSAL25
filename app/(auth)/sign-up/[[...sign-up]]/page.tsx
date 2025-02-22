"use client";
import { Icons } from "@/components/Icons";
import SpeechBubble from "@/components/svg/speech-bubble";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const fieldStateRef = useRef("idle");

  const [email, setEmail] = useState("");
  const [obsEmail, setObsEmail] = useState("");
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleConfirm = () => {
    document.cookie =
      "signUpInitiated=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    router.push("/");
  };

  const onEmailChange = () => {
    if (email.includes("@")) {
      // Split email into username and domain
      const [username, domain] = email.split("@");

      // Guard: if username is less than 2 letters, just return email
      if (!username || username.length < 2) return email;

      // Build the obfuscated string
      setObsEmail(`${username.slice(0, 2)}****@${domain}`);
      document.cookie = "signUpInitiated=true; path=/";
    }
  };
  useEffect(() => {
    if (code.length === 6 && fieldStateRef.current !== "error") {
      // Auto-trigger submission when OTP is complete and valid.
      document.cookie =
        "signUpInitiated=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      continueButtonRef.current?.click();
    }
  }, [code]);

  return (
    <>
      {/* //todo: menu icon and/or link */}

      <AnimatePresence>
        {/* Background */}
        {/* <motion.div
          key='background'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          className=' inset-0  bg-salYellow'
        /> */}
        <main className="flex h-[100dvh] flex-row justify-around bg-white md:bg-salYellow">
          {/* TODO Use the order dynamically to allow different artworks to be shown. Tag them when I select/find them for which direction to show them.  */}
          <div className="relative hidden h-full flex-1 flex-col items-start justify-center md:flex">
            <div className="relative h-[100%] w-[100%]">
              <Image
                src="/herotest2.jpg"
                alt="The Street Art List"
                fill
                className="object-cover"
              />
              <span className="absolute left-0 top-0 origin-left rounded-br-xl bg-white p-2 px-5 text-sm text-black">
                <span className="italic">Silent Rhythms</span>{" "}
                <span className="text-xs">by</span>{" "}
                <Link
                  href="https://instagram.com/anthonybrooksart"
                  target="_blank"
                  className="font-bold text-black"
                >
                  @anthonybrooksart
                </Link>
              </span>
            </div>
          </div>
          {/* Card container */}
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            className="flex items-center justify-center overflow-y-auto md:min-w-[clamp(600px,40vw,900px)]"
          >
            <SignUp.Root>
              <Clerk.Loading>
                {(isGlobalLoading) => (
                  <>
                    <SignUp.Step name="start">
                      <div className="scrollbar-hide max-h-[100dvh] overflow-y-auto">
                        <Card className="relative flex h-[100dvh] max-w-[500px] flex-col items-center justify-center text-balance border-none bg-white px-3 shadow-none sm:w-[120] md:mx-10 md:h-[unset] md:border-2 md:border-solid md:border-black md:px-10 md:shadow-sm">
                          <CardHeader>
                            <Link
                              href="/"
                              prefetch={true}
                              className="absolute left-4 top-4 hidden md:block"
                            >
                              <Image
                                src="/sitelogo.svg"
                                alt="The Street Art List"
                                width={40}
                                height={40}
                                className="mb-2"
                                priority={true}
                              />
                            </Link>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className="absolute right-5 top-4 z-10 text-lg font-bold text-black hover:text-gray-600"
                                  aria-label="Close modal"
                                >
                                  <X size={30} />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-salYellow text-black">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl">
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-black">
                                    Leaving will cancel your sign-up process and
                                    return you to the home screen.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleConfirm}>
                                    Yes, leave
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <CardTitle className="flex flex-col items-center justify-center pb-2 text-center text-black">
                              <Link
                                href="/"
                                prefetch={true}
                                className="sm:hidden"
                              >
                                <Image
                                  src="/sitelogo.svg"
                                  alt="The Street Art List"
                                  width={80}
                                  height={80}
                                  className="mb-2"
                                  priority={true}
                                />
                              </Link>
                              <Image
                                src="/saltext.png"
                                alt="The Street Art List"
                                width={250}
                                height={80}
                                priority={true}
                              />
                              {/* Get Started */}
                            </CardTitle>
                            <CardDescription className="text-center text-black">
                              Welcome! Please fill in the details to get
                              started.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="grid w-full gap-y-4">
                            <div className="grid grid-cols-2 gap-x-4">
                              <Clerk.Connection name="apple" asChild>
                                <Button
                                  size="sm"
                                  variant="salWithoutShadow"
                                  type="button"
                                  disabled={isGlobalLoading}
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
                                  className="focus:bg-salYellow/70"
                                >
                                  <Clerk.Loading scope="provider:google">
                                    {(isLoading) =>
                                      isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        <>
                                          <FaGoogle className="mr-2 size-4" />
                                          Google
                                        </>
                                      )
                                    }
                                  </Clerk.Loading>
                                </Button>
                              </Clerk.Connection>
                            </div>
                            <p className="flex items-center gap-x-3 text-sm text-black before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                              or
                            </p>
                            <Clerk.Field name="firstName" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label className="text-black">First Name</Label>
                              </Clerk.Label>
                              <Clerk.Input
                                type="firstName"
                                placeholder="Given Name(s)"
                                required
                                asChild
                                className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field name="lastName" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label className="text-black">Last Name</Label>
                              </Clerk.Label>
                              <Clerk.Input
                                type="lastName"
                                placeholder="Surname(s)"
                                required
                                asChild
                                className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field
                              name="emailAddress"
                              className="space-y-2"
                            >
                              <Clerk.Label asChild>
                                <Label className="text-black">
                                  Email address
                                </Label>
                              </Clerk.Label>
                              <Clerk.Input
                                type="email"
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                asChild
                                className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field name="password" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label className="text-black">Password</Label>
                              </Clerk.Label>
                              <div className="relative">
                                <Clerk.Input
                                  validatePassword
                                  type={showPassword ? "text" : "password"}
                                  placeholder="(min 8 characters)"
                                  required
                                  asChild
                                  className="border-[1.5px] border-black bg-white text-black focus:bg-white"
                                >
                                  <Input />
                                </Clerk.Input>
                                <button
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
                          <CardFooter className="w-full">
                            <div className="grid w-full gap-y-4">
                              <SignUp.Captcha className="empty:hidden" />
                              <SignUp.Action submit asChild>
                                <Button
                                  disabled={isGlobalLoading}
                                  variant="salWithShadowYlw"
                                  onClick={() => onEmailChange()}
                                >
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        "Sign me up!"
                                      );
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignUp.Action>
                              <p className="mt-2 text-center text-sm text-zinc-500">
                                Already have an account?{" "}
                                <Clerk.Link
                                  navigate="sign-in"
                                  className="font-medium text-black decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                                >
                                  Sign in
                                </Clerk.Link>
                              </p>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </SignUp.Step>

                    {/* <SignUp.Step name="continue">
                      <Card className="w-full sm:w-96">
                        <CardHeader>
                          <CardTitle>Continue registration</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Clerk.Field name="username" className="space-y-2">
                            <Clerk.Label>
                              <Label>Username</Label>
                            </Clerk.Label>
                            <Clerk.Input type="text" required asChild>
                              <Input />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-destructive" />
                          </Clerk.Field>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignUp.Action submit asChild>
                              <Button disabled={isGlobalLoading}>
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
                            </SignUp.Action>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignUp.Step> */}

                    <SignUp.Step
                      name="verifications"
                      className="h-[100dvh] w-[100dvw] bg-salYellow md:h-auto md:w-auto md:bg-transparent"
                    >
                      <SignUp.Strategy name="email_code">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="absolute right-5 top-4 z-10 text-lg font-bold text-black hover:text-gray-600"
                              aria-label="Close modal"
                            >
                              <X size={30} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-salYellow text-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl">
                                Are you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-black">
                                Leaving will cancel your sign-up process and
                                return you to the home screen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirm}>
                                Yes, leave
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* <Card className="border-none bg-salYellow text-black shadow-none sm:w-96"> */}
                        <div
                          // className="flex min-h-screen flex-col content-center items-center justify-center p-4"
                          style={{ paddingTop: "env(safe-area-inset-top)" }}
                        >
                          <Card className="w-full max-w-sm scale-[95%] border-none bg-salYellow pt-5 text-black shadow-none sm:max-w-md md:max-w-lg md:scale-[90%] md:pt-0 lg:max-w-full 2xl:scale-[90%]">
                            <CardHeader className="relative h-[220px]">
                              <div className="relative h-full w-full">
                                <SpeechBubble
                                  strokeWidth="4"
                                  className="absolute left-[50%] top-[50%] h-auto w-[20em] -translate-x-1/2 -translate-y-1/2 md:w-[21.5em]"
                                />

                                {/* Adjust top offset to match the speech bubble’s center */}
                                <div className="absolute left-[50%] top-[37%] z-10 w-full -translate-x-1/2 -translate-y-1/2 transform text-center">
                                  <CardTitle className="mb-2 text-4xl">
                                    Verify your email
                                  </CardTitle>
                                  <CardDescription className="text-lg text-black">
                                    We sent a code to{" "}
                                    {email ? obsEmail : "your email"}!
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>

                            <div className="relative mx-auto mb-5 aspect-square w-[90%] max-w-[25em] rounded-full border-[0.4em] border-black bg-salYellow md:min-w-[350px] md:max-w-[45em]">
                              {/* Left SVG container */}
                              <div
                                className="absolute left-[55%] top-[35%] aspect-square w-[30%]"
                                style={{
                                  transform:
                                    "translateX(-130%) translateY(-50%)",
                                }}
                              >
                                <svg
                                  viewBox="0 0 133 65"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-full w-full"
                                >
                                  <path
                                    d="M10.5672 48.7706C15.8403 -0.376456 112.585 -5.08271 121.888 54.1314"
                                    stroke="black"
                                    strokeWidth="15"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              {/* Right SVG container */}
                              <div
                                className="absolute left-[45%] top-[35%] aspect-square w-[30%]"
                                style={{
                                  transform: "translateX(30%) translateY(-50%)",
                                }}
                              >
                                <svg
                                  viewBox="0 0 133 66"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-full w-full"
                                >
                                  <path
                                    d="M11.0184 54.8838C11.0184 5.45464 106.709 -9.54537 122.276 48.3384"
                                    stroke="black"
                                    strokeWidth="15"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div
                                className="absolute left-[20%] top-[45%] aspect-square h-[40px] rounded-full bg-red-300"
                                style={{
                                  transform:
                                    "translateX(-130%) translateY(-50%)",
                                }}
                              ></div>
                              {/* Right SVG container */}
                              <div
                                className="absolute right-[20%] top-[45%] aspect-square h-[40px] rounded-full bg-red-300"
                                style={{
                                  transform:
                                    "translateX(130%) translateY(-50%)",
                                }}
                              ></div>
                              <CardContent className="absolute left-1/2 top-[65.5%] grid -translate-x-1/2 -translate-y-1/2 transform gap-y-4">
                                <div className="grid items-center justify-center gap-y-2">
                                  <Clerk.Field
                                    name="code"
                                    className="space-y-2"
                                  >
                                    <Clerk.Label className="sr-only">
                                      OTP Code
                                    </Clerk.Label>
                                    <div className="flex justify-center text-center">
                                      <Clerk.Input
                                        type="otp"
                                        autoFocus
                                        autoComplete="new-password"
                                        inputMode="numeric"
                                        name="otp_code"
                                        passwordManagerOffset={10}
                                        onChange={(e) =>
                                          setCode(e.target.value)
                                        }
                                        className="flex justify-center bg-white has-[:disabled]:opacity-50"
                                        autoSubmit
                                        render={({ value, status }) => {
                                          return (
                                            <div
                                              data-status={status}
                                              className={cn(
                                                "relative flex size-[2.5rem] items-center justify-center border-y-2 border-r-2 border-black text-sm transition-all first:rounded-l-md first:border-2 last:rounded-r-md md:size-[3rem]",
                                                {
                                                  "z-10 ring-2 ring-black ring-offset-black":
                                                    status === "cursor" ||
                                                    status === "selected",
                                                },
                                              )}
                                            >
                                              {value}
                                              {status === "cursor" && (
                                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                  <div className="h-4 w-px animate-caret-blink bg-black duration-1000" />
                                                </div>
                                              )}
                                            </div>
                                          );
                                        }}
                                      />
                                    </div>
                                    {/* Use FieldState to capture error state internally */}
                                    <Clerk.FieldState>
                                      {({ state }) => {
                                        fieldStateRef.current = state;
                                        return null;
                                      }}
                                    </Clerk.FieldState>
                                    <Clerk.FieldError className="block text-center text-base text-destructive" />
                                  </Clerk.Field>
                                </div>
                              </CardContent>
                            </div>
                            <CardFooter>
                              <div className="mt-5 grid w-full gap-y-4">
                                <p className="text-center text-sm text-black">
                                  Didn&apos;t receive a code?
                                </p>
                                <SignUp.Action
                                  asChild
                                  resend
                                  className="text-muted-foreground"
                                  fallback={({ resendableAfter }) => (
                                    <Button
                                      variant="salWithShadow"
                                      className="tabular-nums"
                                      disabled
                                    >
                                      {resendableAfter &&
                                        resendableAfter &&
                                        `Resend it in ${resendableAfter} seconds`}
                                    </Button>
                                    // <Button variant="link" size="sm" disabled>
                                    //    Resend
                                    //   it&nbsp;
                                    //   <span className="tabular-nums">
                                    //     {resendableAfter &&
                                    //       `in ${resendableAfter} seconds`}
                                    //   </span>
                                    // </Button>
                                  )}
                                >
                                  <Button
                                    type="button"
                                    variant="salWithShadow"
                                    className="py-[1.5em] text-lg text-black"
                                  >
                                    Resend it now
                                  </Button>
                                </SignUp.Action>
                                <SignUp.Action submit asChild>
                                  <Button
                                    ref={continueButtonRef}
                                    disabled={isGlobalLoading}
                                    className="absolute left-[-100%] opacity-0"
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
                                </SignUp.Action>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </SignUp.Strategy>
                    </SignUp.Step>
                  </>
                )}
              </Clerk.Loading>
            </SignUp.Root>
          </motion.div>
        </main>
      </AnimatePresence>
    </>
  );
}
