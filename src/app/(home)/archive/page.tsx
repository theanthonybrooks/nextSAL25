"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { useUser } from "@clerk/nextjs"

export default function Archive() {
  const user = useUser()
  console.log("user", user)
  const features = [
    "Authentication & Authorization",
    "Payment Processing",
    "SEO Optimization",
    "TypeScript Support",
    "Database Integration",
    "Dark Mode Support",
    "Responsive Design",
    "API Integration",
  ]

  return (
    <>
      <>
        <SignIn.Root>
          <SignIn.Step name='start'>
            <h1>Sign in to your account</h1>

            <Clerk.Connection name='google'>
              Sign in with Google
            </Clerk.Connection>

            <Clerk.Field name='identifier'>
              <Clerk.Label>Email</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit>Continue</SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name='verifications'>
            <SignIn.Strategy name='email_code'>
              <h1>Check your email</h1>
              <p>
                We sent a code to <SignIn.SafeIdentifier />.
              </p>

              <Clerk.Field name='code'>
                <Clerk.Label>Email code</Clerk.Label>
                <Clerk.Input />
                <Clerk.FieldError />
              </Clerk.Field>

              <SignIn.Action submit>Continue</SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
        </SignIn.Root>
      </>
    </>
  )
}
