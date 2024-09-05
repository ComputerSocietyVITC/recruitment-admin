import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

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
        className={`bg-gradient-to-r from-black via-[#04101d] to-black ${montserrat.className} text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
