import { Metadata } from "next";

import SendMessagePage from "../../send-message-page";

export const metadata: Metadata = {
  title: "仮登録メール送信完了",
};

export default function NextPage() {
  return (
    <SendMessagePage
      title="仮登録メールを送信しました"
      message="仮登録メールを送信しました。メール内のURLをクリックして登録を完了してください。"
    />
  );
}
