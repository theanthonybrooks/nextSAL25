"use client";

import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordResetSchema } from "../schema";

interface ResetPasswordFormProps {
  auth: ReturnType<
    typeof import("@/hooks/authentication").useAuthForgotPassword
  >;
}

const ResetPasswordForm = ({ auth }: ResetPasswordFormProps) => {
  const { resetPassword, error, setError } = auth;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<z.infer<typeof ForgotPasswordResetSchema>>({
    resolver: zodResolver(ForgotPasswordResetSchema),
    mode: "onChange",
    defaultValues: { password: "", code: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      style={{ display: "flex", flexDirection: "column", gap: "1em" }}
    >
      <label htmlFor="password">Enter your new password</label>
      <input
        type="password"
        placeholder="New password"
        {...register("password", {
          onChange: () => {
            if (error) setError("");
          },
        })}
        className={`rounded-md border p-2 ${
          error ? "border-red-500 italic text-red-500" : "border-gray-300"
        }`}
      />
      {errors.password && (
        <p className="text-center text-sm text-red-500">
          {errors.password.message}
        </p>
      )}
      <label htmlFor="code">Enter the reset code sent to your email</label>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Reset code"
        maxLength={6}
        pattern="\d*"
        {...register("code", {
          onChange: () => {
            if (error) setError("");
          },
        })}
        className={`rounded-md border p-2 ${
          error ? "border-red-500 italic text-red-500" : "border-gray-300"
        }`}
      />
      {errors.code && (
        <p className="text-center text-sm text-red-500">
          {errors.code.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting || !isValid}>
        <Loader loading={isSubmitting}>Reset password</Loader>
      </Button>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
    </form>
  );
};

export default ResetPasswordForm;
