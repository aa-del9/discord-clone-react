import * as z from "zod";

export const LoginVaidation = z.object({
  email: z.string().min(7, { message: "Email or Phone number Required." }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." }),
});

export const SignupValidation = z.object({
  email: z.string().min(7, { message: "Email or Phone number Required." }),
  displayName: z.string().min(1, { message: "Display name Required." }),
  username: z.string().min(1, { message: "UserName Required." }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." }),
  day: z.number().min(1, { message: "Required" }),
  month: z.number().min(0, { message: "Required" }),
  year: z.number().min(1, { message: "Required" }),
});
