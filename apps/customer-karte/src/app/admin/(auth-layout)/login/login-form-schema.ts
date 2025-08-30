import * as v from "valibot";

import { emailSchema, passwordSchema } from "@/domains/user/schema";

export const loginFormSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = v.InferOutput<typeof loginFormSchema>;
