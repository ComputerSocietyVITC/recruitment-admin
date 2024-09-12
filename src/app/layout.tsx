"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { createClient } from "@/utils/supabase";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();

    session.then((data) => {
      if (data.data.session === null) {
        router.push("/login");
      }
    });
  }, []);

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
