"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface User {
  id: string;
  name: string;
  email: string;
  firstPreference: string;
  secondPreference: string;
  submitted: boolean;
  created_at: string;
  evaluatedPrefOne: boolean;
  evaluatedPrefTwo: boolean;
  pointsPrefOne: number;
  pointsPrefTwo: number;
}

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from<User>("User")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setUser(data);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="rounded-md border bg-[#04101D] p-4">
      <Table className="text-white/[.90]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/[.90]">Name</TableHead>
            <TableHead className="text-white/[.90]">Email</TableHead>
            <TableHead className="text-white/[.90]">First Preference</TableHead>
            <TableHead className="text-white/[.90]">
              Second Preference
            </TableHead>
            <TableHead className="text-white/[.90]">Created At</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[250px]">
        <Table className="text-white/[.90]">
          <TableBody>
            {user?.submitted && (
              <TableRow key={user.id}>
                <TableCell className="text-white/[.90]">{user.name}</TableCell>
                <TableCell className="text-white/[.90]">{user.email}</TableCell>
                <TableCell className="text-white/[.90]">
                  {user.firstPreference}
                </TableCell>
                <TableCell className="text-white/[.90]">
                  {user.secondPreference}
                </TableCell>
                <TableCell className="text-white/[.90]">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
