"use client";

import { FormGenerator } from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { GROUPLE_CONSTANTS } from "@/constants";
import { useAuthSignIn } from "@/hooks/authentication";
import Link from "next/link";
type Props = {};

const SignInForm = (props: Props) => {
  const { onAuthenticateuser, register, errors, formState } = useAuthSignIn();
  return (
    <form className="mt-5 flex flex-col gap-3" onSubmit={onAuthenticateuser}>
      {GROUPLE_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button
        type="submit"
        className="mt-3 rounded-2xl"
        disabled={!formState.isValid}
      >
        <Loader loading={formState.isSubmitting}>Sign In with Email</Loader>
      </Button>
      <p className="text-themeTextGrey text-center text-sm">
        <Link href="/forgot-password">Forgot your password?</Link>
      </p>
      <div id="clerk-captcha"></div>
    </form>
  );
};

export default SignInForm;
