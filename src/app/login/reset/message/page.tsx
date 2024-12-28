import { SendIcon } from "lucide-react";

export default function Message() {
  return (
    <div className="flex flex-col items-center h-full p-4">
      <div className="flex-grow max-h-[80px]"></div>
      <div className="font-bold text-lg">
        {process.env.NEXT_PUBLIC_SERVICE_NAME}
      </div>
      <h1 className="font-bold text-2xl mt-8">
        パスワードリセットメールを送信しました
      </h1>
      <div className="flex justify-center p-8">
        <SendIcon size={64} />
      </div>
      <p>
        メールに記載されたURLをクリックして新しいパスワードに更新してください。
      </p>
    </div>
  );
}
