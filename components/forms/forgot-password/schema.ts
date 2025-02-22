import { z } from "zod"

// Schema for the get-code (create) phase: only email is required.
export const ForgotPasswordCreateSchema = z.object({
    email: z.string().email("You must enter a valid email"),
})

// Schema for the reset phase: password and code are required.
export const ForgotPasswordResetSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(64, { message: "Password cannot be longer than 64 characters" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[\W_]/, {
            message: "Password must contain at least one symbol",
        }),
    code: z
        .string()
        .min(6, { message: "Code must be at least 6 characters" })
        .max(6, { message: "Code cannot be longer than 6 characters" }),
})
