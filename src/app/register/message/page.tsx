import { SendIcon } from "lucide-react";

export default function Message() {
  return (
    <div className="flex flex-col items-center h-full p-4">
      <div className="flex-grow max-h-[80px]"></div>
      <div className="font-bold text-lg">
        {process.env.NEXT_PUBLIC_SERVICE_NAME}
      </div>
      <h1 className="font-bold text-2xl mt-8">招待メールを送信しました</h1>
      <div className="flex justify-center p-8">
        <SendIcon size={64} />
      </div>
      <p>
        招待メールを送信しました。メール内のURLをクリックして登録を完了してください。
      </p>
    </div>
  );
}
