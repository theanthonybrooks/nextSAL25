"use client"

import Loader from "@/src/components/global/loader"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ForgotPasswordCreateSchema } from "../schema"

interface GetCodeFormProps {
  auth: ReturnType<
    typeof import("@/src/hooks/authentication").useAuthForgotPassword
  >
}

const GetCodeForm = ({ auth }: GetCodeFormProps) => {
  const { create, error, setError } = auth
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof ForgotPasswordCreateSchema>>({
    resolver: zodResolver(ForgotPasswordCreateSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  })

  return (
    <form
      onSubmit={handleSubmit(create)}
      style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <label htmlFor='email'>Provide your email address</label>
      <input
        type='email'
        placeholder='e.g. user@email.com'
        {...register("email", {
          onChange: () => {
            if (error) setError("")
          },
        })}
        className={`p-2 border rounded-md ${
          error ? "border-red-500 text-red-500 italic" : "border-gray-300"
        }`}
      />
      {errors.email && (
        <p className='text-center text-red-500 text-sm'>
          {errors.email.message}
        </p>
      )}
      <Button type='submit' disabled={isSubmitting}>
        <Loader loading={isSubmitting}>Send password reset code</Loader>
      </Button>
      {error && <p className='text-center text-red-500 text-sm'>{error}</p>}
    </form>
  )
}

export default GetCodeForm
