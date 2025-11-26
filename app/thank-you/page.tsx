import Link from "next/link";
import ThankYouAnimations from "./ThankYouAnimations";

type ThankYouPageProps = {
  searchParams: Promise<{
    name?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const sanitizedName = params.name?.trim();
  const displayName = sanitizedName && sanitizedName.length < 60 ? sanitizedName : "there";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 text-center text-zinc-900">
      <div className="w-full max-w-lg rounded-sm border border-zinc-200 bg-white p-10 shadow-xl">
        <ThankYouAnimations displayName={displayName} />
      </div>
    </div>
  );
}

