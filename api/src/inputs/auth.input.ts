import { z } from "zod";

export const SignupInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
});

export const SigninInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

SignupInputSchema.refine((data) => {
  return true;
});

export type SingupInput = z.infer<typeof SignupInputSchema>;
export type SinginInput = z.infer<typeof SigninInputSchema>;
