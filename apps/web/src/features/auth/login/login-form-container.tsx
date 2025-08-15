import { getPublicAuthConfig } from "../common/auth-config";
import { LoginFormPresenter } from "./login-form";

export function LoginFormContainer() {
  const { isForgetPasswordEnabled } = getPublicAuthConfig();

  return (
    <LoginFormPresenter showForgetPasswordLink={isForgetPasswordEnabled} />
  );
}
