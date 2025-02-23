"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPrimaryAction,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const codeLength = 6;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Store OTP as a string
  const [otp, setOtp] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  // Step 1: Send reset code to user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err: any) => {
        const errMsg = err.errors[0].longMessage;
        setError(errMsg);
        toast.error(errMsg);
      });
  }

  // Step 2: Reset the user's password using the OTP code
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: otp,
        password,
      })
      .then((result: any) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
          toast.success("Successfully reset. Logging you in…", {
            autoClose: 2000,
          });
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          console.log(result);
        }
      })
      .catch((err: any) => {
        const errMsg = err.errors[0].longMessage;
        setError(errMsg);
        if (errMsg === "Incorrect code") {
          toast.error("Ahem... That's not the right code.");
        } else if (errMsg.includes("Too many failed attempts")) {
          toast.error("Too many failed attempts. Please try again later.");
        } else {
          toast.error(errMsg);
        }
      });
  }

  // Custom OTP change handler that only accepts numeric characters
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const isEmailValid = email.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  const isOtpValid = otp.trim().length === codeLength;
  const isPasswordValid = password.trim() !== "" && password.length >= 8;

  const isFormValid = !successfulCreation
    ? isEmailValid
    : isOtpValid && isPasswordValid;

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-salYellow px-4">
        {/* First Card: Forgot Password (email input) */}
        <div className="scrollbar-hide max-h-[100vh] overflow-y-auto">
          <Card className="relative w-full border-2 border-black bg-white px-6 shadow-none sm:w-96">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="absolute right-5 top-4 z-10 rounded text-lg font-bold text-black hover:rounded-full hover:text-salPink focus:bg-salPink"
                  aria-label="Close modal"
                  tabIndex={successfulCreation ? 6 : 4}
                >
                  <X size={25} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[80dvw] bg-salYellow text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    Where would you like to go?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-black">
                    If you've remembered your password, you can login.
                    Otherwise, you can stay here to reset your password, or go
                    to the homepage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => router.push("/sign-in")}>
                    Login
                  </AlertDialogAction>
                  <AlertDialogPrimaryAction onClick={() => router.push("/")}>
                    Return to homepage
                  </AlertDialogPrimaryAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <CardHeader className="items-center">
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
              {!successfulCreation && (
                <CardDescription className="mt-2 text-base text-black">
                  Forgot your password? No worries!
                </CardDescription>
              )}
            </CardHeader>
            <form onSubmit={!successfulCreation ? create : reset}>
              {!successfulCreation && (
                <CardContent className="grid gap-y-4">
                  <Label className="text-black">Email address</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border-[1.5px] border-black bg-white text-black focus:bg-white"
                    tabIndex={1}
                  />
                </CardContent>
              )}
              {successfulCreation && (
                <>
                  <CardContent className="flex flex-col gap-y-4">
                    <Label
                      htmlFor="code"
                      className="-mt-5 text-center text-base text-black"
                    >
                      Please enter the code sent to your email
                    </Label>
                    {/* <InputOTP
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength={codeLength}
                      // disable parent's ring styles
                    >
                      <InputOTPGroup >
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP> */}
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={otp}
                      onChange={handleOtpChange}
                      tabIndex={successfulCreation && 1}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <Label className="text-black">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="min 8 characters..."
                        className="w-full border-[1.5px] border-black bg-white text-black focus:bg-white"
                        tabIndex={successfulCreation && 2}
                      />
                      <button
                        tabIndex={successfulCreation && 3}
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <Eye className="size-5 text-black" />
                        ) : (
                          <EyeOff className="size-5 text-black" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </>
              )}
              <CardFooter>
                <div className="grid w-full gap-y-4">
                  <Button
                    type="submit"
                    variant="salWithShadowYlw"
                    tabIndex={successfulCreation ? 4 : 2}
                    disabled={!isFormValid}
                  >
                    {successfulCreation ? "Confirm" : "Send Reset Code"}
                  </Button>
                  {!successfulCreation ? (
                    <p className="mt-3 text-center text-sm text-black">
                      Don't have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        tabIndex={!successfulCreation && 3}
                      >
                        Sign up
                      </Link>
                    </p>
                  ) : (
                    <p className="mt-3 text-center text-sm text-black">
                      Remember your password?{" "}
                      <Link
                        href="/sign-in"
                        className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        tabIndex={successfulCreation && 5}
                      >
                        Sign in
                      </Link>
                    </p>
                  )}
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
