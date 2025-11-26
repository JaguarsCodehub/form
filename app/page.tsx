"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  customerName: "",
  phoneNumber: "",
  product: "",
};

const PRODUCT_OPTIONS = [
  "New Car Loan",
  "Pre owned Car Loan",
  "Car Refinance",
];

type SubmissionState = "idle" | "loading" | "success" | "error";

// Format Indian phone number: +91 98765 43210
function formatIndianPhone(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  
  // If starts with +91, remove it for processing
  let cleanDigits = digits;
  if (value.startsWith("+91") || value.startsWith("91")) {
    cleanDigits = digits.replace(/^91/, "");
  }
  
  // Limit to 10 digits (Indian mobile numbers)
  const limited = cleanDigits.slice(0, 10);
  
  if (limited.length === 0) return "";
  if (limited.length <= 5) return `+91 ${limited}`;
  return `+91 ${limited.slice(0, 5)} ${limited.slice(5)}`;
}

// Extract clean phone number for storage (digits only with +91)
function cleanPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.startsWith("91") && digits.length === 12) {
    return `+${digits}`;
  }
  if (digits.length > 0) {
    return `+91${digits.slice(-10)}`;
  }
  return value;
}

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  const isDisabled = useMemo(() => {
    const phoneDigits = form.phoneNumber.replace(/\D/g, "");
    const hasValidPhone = phoneDigits.length >= 10;
    return status === "loading" || !form.customerName.trim() || !hasValidPhone;
  }, [status, form]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIndianPhone(event.target.value);
    setForm((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const nextName = form.customerName.trim();
    const cleanPhone = cleanPhoneNumber(form.phoneNumber);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: nextName,
          phoneNumber: cleanPhone,
          product: form.product || undefined,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error ?? "Unable to save submission.");
      }

      setForm(initialForm);
      setStatus("success");
      router.push(`/thank-you?name=${encodeURIComponent(nextName)}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unexpected error. Try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/20" />
      
      <main className="relative z-10 w-full max-w-md rounded-sm border border-orange-100 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-blue-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-sans font-bold tracking-tight text-gray-900">Get in Touch</h1>
          <p className="mt-2 text-sm font-sans text-gray-600">
            Share your details and we'll reach out to you soon!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-sans font-semibold text-gray-700">Full Name</span>
            <input
              type="text"
              name="customerName"
              autoComplete="name"
              required
              value={form.customerName}
              onChange={(event) => setForm((prev) => ({ ...prev, customerName: event.target.value }))}
              placeholder="Enter your full name"
              className="rounded-lg border-2 border-gray-200 px-4 py-3.5 text-base font-sans font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-sans font-semibold text-gray-700">Mobile Number</span>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🇮🇳</div>
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="tel"
                required
                value={form.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3.5 pl-12 text-base font-sans font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>
            <p className="text-xs font-sans text-gray-500">Enter your 10-digit mobile number</p>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-sans font-semibold text-gray-700">
              Product <span className="text-gray-400 font-normal">(Optional)</span>
            </span>
            <select
              name="product"
              value={form.product}
              onChange={(event) => setForm((prev) => ({ ...prev, product: event.target.value }))}
              className="rounded-lg border-2 border-gray-200 px-4 py-3.5 text-base font-sans font-medium text-gray-900 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            >
              <option value="">Select a product</option>
              {PRODUCT_OPTIONS.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={isDisabled}
            className="group mt-2 rounded-lg bg-blue-600 px-6 py-4 text-center text-base font-sans font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <span className="flex items-center justify-center gap-2">
              {status === "loading" ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-sans">Submitting...</span>
                </>
              ) : (
                <>
                  <span className="font-sans">Submit Details</span>
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        {status === "error" && message && (
          <div className="mt-4 rounded-lg bg-red-50 border-2 border-red-200 p-3">
            <p className="text-sm font-sans font-medium text-red-800">{message}</p>
          </div>
        )}
      </main>
    </div>
  );
}
