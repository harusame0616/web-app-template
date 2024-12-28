import SendMessagePage from "@/app/(message-layout)/send-message-page";

export default function NextPage() {
  return (
    <SendMessagePage
      title="パスワードリセットメールを送信しました"
      message="メールに記載されたURLをクリックして新しいパスワードに更新してください。"
    />
  );
}
