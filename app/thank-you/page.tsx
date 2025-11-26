import Link from "next/link";

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
        <p className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-emerald-600">Thank you</p>
        <h1 className="mt-4 text-3xl font-sans font-semibold tracking-tight">
          We got your details, {displayName}!
        </h1>
        <p className="mt-4 text-base font-sans text-zinc-500">
          Sit tight—we&apos;ll reach out soon. Visit our website to learn more about our services and offerings.
        </p>

        <Link
          href={process.env.NEXT_PUBLIC_WEBSITE_URL || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-sans font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
        >
          <span className="font-sans">Visit our website for more details</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

