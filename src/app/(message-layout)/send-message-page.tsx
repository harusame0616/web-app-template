import { SendIcon } from "lucide-react";

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
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p>{message}</p>
    </>
  );
}
