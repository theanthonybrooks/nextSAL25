"use client"

import { useAuthForgotPassword } from "@/hooks/authentication"
import GetCodeForm from "./get-code"
import ResetPasswordForm from "./reset-password"

const ForgotPasswordForm = () => {
  // Call our auth hook just once.
  const auth = useAuthForgotPassword()

  // Render the appropriate form based on the successfulCreation flag.
  return auth.successfulCreation ? (
    <ResetPasswordForm auth={auth} />
  ) : (
    <GetCodeForm auth={auth} />
  )
}

export default ForgotPasswordForm
