"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      router.push("/login");
    });
  });

  return <div className="text-7xl font-bold" >You have been logged out</div>;
}
