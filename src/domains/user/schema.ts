import * as v from "valibot";

export const emailSchema = v.pipe(
  v.string(),
  v.minLength(1),
  v.maxLength(255),
  v.email()
);

export const passwordSchema = v.pipe(
  v.string(),
  v.minLength(6),
  v.maxLength(255)
);

export const nameSchema = v.pipe(v.string(), v.minLength(1), v.maxLength(64));

