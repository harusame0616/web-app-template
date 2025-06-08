import * as v from "valibot";

export const emailSchema = v.pipe(
  v.string(),
  v.minLength(1, "メールアドレスを入力してください"),
  v.maxLength(255, "メールアドレスは255文字以内で入力してください"),
  v.email("メールアドレスの形式で入力してください"),
);

export const passwordSchema = v.pipe(
  v.string(),
  v.minLength(1, "パスワードを入力してください"),
  v.minLength(6, "パスワードは6文字以上で入力してください"),
  v.maxLength(255, "パスワードは255文字以内で入力してください"),
);

export const nameSchema = v.pipe(v.string(), v.minLength(1), v.maxLength(64));
