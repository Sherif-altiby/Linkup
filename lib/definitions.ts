import * as z from 'zod'

export const SignupFormSchema  = z.object({
    name: z.string().min(8, 'Name must be at least 8 characters'),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
})


export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})



export type FormState = z.infer<typeof SignupFormSchema>;
