import { z } from "zod"

export const SignUpSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "First Name must be at least 3 characters" }),
    lastName: z
        .string()
        .min(3, { message: "Last Name must be at least 3 characters" }),
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
