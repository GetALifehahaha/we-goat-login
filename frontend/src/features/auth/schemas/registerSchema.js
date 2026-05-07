import * as z from 'zod'

const registerSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(8, "First name must be at least 8 characters")
        .max(255),
    last_name: z
        .string()
        .trim()
        .min(8, "First name must be at least 8 characters")
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
        .refine(data => data.password === data.confirm_password)
})

export default registerSchema