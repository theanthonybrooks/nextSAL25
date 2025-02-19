import { api } from "@/convex/_generated/api"
import {
  ForgotPasswordCreateSchema,
  ForgotPasswordResetSchema,
} from "@/src/components/forms/forgot-password/schema"
import { SignUpSchema } from "@/src/components/forms/sign-up/schema"
import { signInSuccessUrl, signUpSuccessUrl } from "@/src/constants"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { z } from "zod"
import { SignInSchema } from "../../components/forms/sign-in/schema"

export const useAuthSignIn = () => {
  const { isLoaded, setActive, signIn } = useSignIn()
  const { register, formState, reset, handleSubmit, getValues } = useForm<
    z.infer<typeof SignInSchema>
  >({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  })

  const router = useRouter()
  const onClerkAuth = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! Something went wrong.",
      })
    try {
      const authenticated = await signIn.create({
        identifier: email,
        password: password,
      })

      if (authenticated.status === "complete") {
        reset()
        await setActive({ session: authenticated.createdSessionId })
        toast("Success", { description: "Welcome back!" })
        router.push(signInSuccessUrl)
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_password_invalid") {
        toast("Error", {
          description: "Incorrect email or password. Please try again.",
        })
      } else {
        toast("Error", {
          description: error.errors[0].message,
        })
      }
    }
  }

  const onAuthenticateUser = handleSubmit(async (values) => {
    await onClerkAuth(values.email, values.password)
  })

  return {
    onAuthenticateUser,
    register,
    errors: formState.errors, // Access errors from formState
    formState, // Return the entire formState object
  }
}

export const useAuthForgotPassword = (): {
  create: (data: z.infer<typeof ForgotPasswordCreateSchema>) => Promise<void>
  resetPassword: (
    data: z.infer<typeof ForgotPasswordResetSchema>
  ) => Promise<void>
  successfulCreation: boolean
  secondFactor: boolean
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
} => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [secondFactor, setSecondFactor] = useState(false)
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [error, setError] = useState("")

  // We no longer need a single form instance here as each component will use its own useForm.
  // We only provide the shared functions.
  const create = async (data: z.infer<typeof ForgotPasswordCreateSchema>) => {
    if (!isLoaded) return
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      })
      setSuccessfulCreation(true)
      setError("")
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage)
      if (
        err.errors[0].longMessage === "Identifier is invalid." ||
        err.errors[0].longMessage === "Couldn't find your account."
      ) {
        setError("We couldn't find an account with that email")
      } else {
        setError(err.errors[0].longMessage)
      }
    }
  }

  const resetPassword = async (
    data: z.infer<typeof ForgotPasswordResetSchema>
  ) => {
    if (!isLoaded) return
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      })
      if (result?.status === "needs_second_factor") {
        setSecondFactor(true)
        setError("")
      } else if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId })
        setError("")
        router.push("/")
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage)
      setError(err.errors[0].longMessage)
    }
  }

  return {
    create,
    resetPassword,
    successfulCreation,
    secondFactor,
    error,
    setError,
  }
}

export const useAuthSignUp = (
  signUpUser: ReturnType<typeof useMutation<typeof api.auth.onSignUpUser>>
) => {
  const { setActive, isLoaded, signUp } = useSignUp()
  const [creating, setCreating] = useState<boolean>(false)
  const [verifying, setVerifying] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")

  const { register, formState, reset, handleSubmit, getValues } = useForm<
    z.infer<typeof SignUpSchema>
  >({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  })

  const router = useRouter()

  const onGenerateCode = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! Something went wrong.",
      })
    try {
      if (email && password) {
        await signUp.create({
          emailAddress: email,
          password: getValues("password"),
          firstName: getValues("firstName"),
          lastName: getValues("lastName"),
        })

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        })

        setVerifying(true)
      } else {
        return toast("Error", {
          description: "All fields are required",
        })
      }
    } catch (error: any) {
      if (error?.errors?.[0]?.code === "form_password_pwned") {
        toast.error("Weak Password", {
          description:
            "Password has been found in an online data breach. For account safety, please use a different password.",
        })
      } else {
        console.error(JSON.stringify(error, null, 2))
        toast.error("Error", {
          description: error.errors[0].message,
        })
      }
    }
  }

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! Something went wrong.",
      })
    try {
      setCreating(true)
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignup.status !== "complete") {
        return toast("Error", {
          description: "Oops! Something went wrong, status incomplete",
        })
      }
      //TODO: Image
      if (completeSignup.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId })

        if (!signUp.createdUserId) return
        const user = await signUpUser({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          userId: signUp.createdUserId,
          image: "",
          role: ["guest"], // Example role
          tokenIdentifier: values.email, // Example tokenIdentifier
        })

        reset()

        if (user.status === 200) {
          toast("Success", { description: user.message })

          await setActive({
            session: completeSignup.createdSessionId,
          })
          router.push(signUpSuccessUrl)
          //NOTE: This line will need changed later to direct to the correct page
        }
        if (user.status !== 200) {
          toast("Error", {
            description: user.message + "action failed",
          })
          router.refresh()
        }
        setCreating(false)
        setVerifying(false)
      } else {
        console.error(JSON.stringify(completeSignup, null, 2))
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
    }
  })

  return {
    register,
    errors: formState.errors, // Access errors from formState
    onGenerateCode,
    onInitiateUserRegistration,
    verifying,
    creating,
    code,
    setCode,
    getValues,
    formState, // Return the entire formState object
  }
}

export const useGoogleAuth = () => {
  const { signIn, isLoaded: loadedSignIn } = useSignIn()
  const { signUp, isLoaded: loadedSignUp } = useSignUp()
  const router = useRouter()

  // Remove useAuth -- instead, the OAuth callback page will use useUser.
  const signInWith = (strategy: OAuthStrategy) => {
    if (!loadedSignIn) return
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      console.error(error)
    }
  }

  // For sign-up via OAuth, simply initiate the redirect.
  // After redirection, your callback page (/callback/sign-up) can run the DB creation logic
  const signUpWith = (strategy: OAuthStrategy) => {
    if (!loadedSignUp) return
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/pricing",
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { signUpWith, signInWith }
}
