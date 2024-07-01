import { z } from "zod";


const registerSchema = z.object({
    name: z.string().min(3, { message: "Must be 3 or more characters long" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters longs" })
        .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
            message: "Password should contain at least 1 special character",
        }),
    confirmPassword: z
        .string()
        .min(1, { message: "confirm Password is required" })
       
}).refine((input) => input.password === input.confirmPassword, {
    message: "password and confirm password does not match",
    path: ["confirmPassword"],
})

type RegisterInputs = z.infer<typeof registerSchema>;


export {registerSchema , type RegisterInputs}
