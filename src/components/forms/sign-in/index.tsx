"use client"

import { FormGenerator } from "@/src/components/global/form-generator"
import Loader from "@/src/components/global/loader"
import { Button } from "@/src/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/src/constants"
import { useAuthSignIn } from "@/src/hooks/authentication"
import Link from "next/link"
type Props = {}

const SignInForm = (props: Props) => {
  const { onAuthenticateUser, register, errors, formState } = useAuthSignIn()
  return (
    <form className='flex flex-col gap-3 mt-5' onSubmit={onAuthenticateUser}>
      {GROUPLE_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button
        type='submit'
        className='rounded-2xl mt-3'
        disabled={!formState.isValid}>
        <Loader loading={formState.isSubmitting}>Sign In with Email</Loader>
      </Button>
      <p className='text-sm text-center text-themeTextGrey'>
        <Link href='/forgot-password'>Forgot your password?</Link>
      </p>
      <div id='clerk-captcha'></div>
    </form>
  )
}

export default SignInForm
