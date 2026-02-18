import * as z from 'zod'

export const SignupFormSchema  = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
})



export type FormState = z.infer<typeof SignupFormSchema>;
