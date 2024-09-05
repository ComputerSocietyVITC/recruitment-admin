"use client";

import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Department } from "@/lib/Departments";
import TableComponent from "./TableComponent";

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

export default function DepartmentPage() {
  const supabase = createClient();
  const params = useParams();
  const index = params?.index;
  const firstPreference = Department[parseInt(index, 10)];
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("firstPreference", firstPreference);

      if (error) {
        console.error("Error fetching users:", error.message);
        return;
      }

      if (data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [index]);

  return (
    <div className="px-2">
      <h1 className="text-2xl text-black py-4">
        {firstPreference || "Unknown Department"}
      </h1>
      <TableComponent users={users} />
    </div>
  );
}
