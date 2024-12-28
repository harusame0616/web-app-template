import SendMessagePage from "@/app/(message-layout)/send-message-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワードリセットメール送信完了",
};

export default function NextPage() {
  return (
    <SendMessagePage
      title="パスワードリセットメールを送信しました"
      message="メールに記載されたURLをクリックして新しいパスワードに更新してください。"
    />
  );
}
