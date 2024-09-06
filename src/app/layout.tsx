import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Page IEEECS",
  description: "Admin page for IEEECs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-900 ${inter.className} text-white min-h-screen flex flex-col p-4`}
      >
        {children}
      </body>
    </html>
  );
}
