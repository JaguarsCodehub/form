import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Butterfly Fintech - Apply for Car Loan Top-Up, Refinance, Pre-Owned Car Loan, New Car Loan, Balance Transfer",
  description: "Apply for Car Loan Top-Up, Refinance, Pre-Owned Car Loan, New Car Loan, Balance Transfer",
  openGraph: {
    title: "Butterfly Fintech - Apply for Car Loan Top-Up, Refinance, Pre-Owned Car Loan, New Car Loan, Balance Transfer",
    description: "Apply for Car Loan Top-Up, Refinance, Pre-Owned Car Loan, New Car Loan, Balance Transfer",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
