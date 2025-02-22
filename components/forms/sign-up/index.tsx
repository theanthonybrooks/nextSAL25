"use client";

import { FormGenerator } from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { GROUPLE_CONSTANTS } from "@/constants";
import { useAuthSignUp } from "@/hooks/authentication";
import dynamic from "next/dynamic";

type Props = {};

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default,
    ),
  { ssr: false },
);

const SignUpForm = (props: Props) => {
  const {
    register,
    errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues,
    formState,
  } = useAuthSignUp();

  return (
    <form
      className="mt-10 flex flex-col gap-3"
      onSubmit={onInitiateUserRegistration}
    >
      {verifying ? (
        <div className="mb-5 flex justify-center">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        GROUPLE_CONSTANTS.signUpForm.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}

      {verifying ? (
        <Button type="submit" className="mt-2 rounded-2xl" disabled={creating}>
          <Loader loading={creating}>Submit Code</Loader>
        </Button>
      ) : (
        <Button
          type="button"
          className="mt-2 rounded-2xl"
          onClick={() =>
            onGenerateCode(getValues("email"), getValues("password"))
          }
          disabled={!formState.isValid}
        >
          <Loader loading={formState.isSubmitting}>
            Request Verification Code
          </Loader>
        </Button>
      )}

      <div id="clerk-captcha"></div>
    </form>
  );
};

export default SignUpForm;
