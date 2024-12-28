import { Link, SendIcon } from "lucide-react";

type Props = {
  title: string;
  message: string;
};
export default function SendMessagePage({ title, message }: Props) {
  return (
    <>
      <div className="flex justify-center p-8">
        <SendIcon size={64} />
      </div>
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      <p>{message}</p>
    </>
  );
}
