import * as z from 'zod'

const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty("Username is required")
        .max(255),

    password: z
        .string()
        .trim()
        .nonempty("Password is required")
        .max(255)
})

export default loginSchema