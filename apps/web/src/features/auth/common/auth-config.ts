import * as v from "valibot";

export function getPublicAuthConfig() {
  return v.parse(
    v.object({
      isForgetPasswordEnabled: v.boolean(),
    }),
    {
      isForgetPasswordEnabled:
        process.env.NEXT_PUBLIC_AUTH_IS_FORGET_PASSWORD_ENABLED === "true",
    },
  );
}
