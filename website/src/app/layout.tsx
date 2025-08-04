import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME } from "@/features/common/constants";
import Link from "next/link";
import { PAGE_ROUTES } from "@/features/common/constants/page-routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <div className="max-w-[2000px] mx-auto">
            <Link
              href={PAGE_ROUTES.HOME}
              className="block sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-[1]"
            >
              <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
            </Link>
            {children}
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
