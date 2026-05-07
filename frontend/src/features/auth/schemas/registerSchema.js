import * as z from 'zod'

const registerSchema = z.object({
    first_name: z
        .string()
        .trim()
        .nonempty("First name is required")
        .max(255),
    last_name: z
        .string()
        .trim()
        .nonempty("Last name is required")
        .max(255),
    email: z
        .email()
        .trim()
        .max(255),
    username: z
        .string()
        .trim()
        .min(8, "Username must be at least 8 characters")
        .max(255),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(255),
    confirm_password: z
        .string()
        .trim()
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ['confirm_password']
})

export default registerSchema