import { z } from "zod"

export const SignInSchema = z.object({
    email: z.string().email("You must enter a valid email"),
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
})
