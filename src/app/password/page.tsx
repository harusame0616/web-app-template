import { PasswordRegistrationCard } from "./password-registration-card";

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center p-4">
      <div className="flex-grow max-h-[80px]" />
      <div className="max-w-sm w-full">
        <div className="text-center text-2xl font-bold mb-4">
          <a href="/">{process.env.NEXT_PUBLIC_SERVICE_NAME}</a>
        </div>
        <PasswordRegistrationCard />
      </div>
    </div>
  );
}
