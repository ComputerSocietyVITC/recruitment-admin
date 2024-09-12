"use client";

import { createClient } from "@/utils/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Department } from "@/app/data/Departments";
import TableComponent from "./TableComponent";
import Button from "@/components/Button";

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
  const [showOnlyNonEvaluated, setShowOnlyNonEvaluated] = useState(false);
  const [showOnlyEvaluated, setShowOnlyEvaluated] = useState(false);

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
  }, [firstPreference, index, supabase]);

  return (
    <div>
      <div className="flex w-full justify-between pb-4">
        <h1 className="text-3xl font-extrabold">
          {firstPreference || "Unknown Department"}
          {` (showing ${
            showOnlyNonEvaluated
              ? "non-evaluated"
              : showOnlyEvaluated
              ? "evaluated"
              : "all"
          } users)`}
        </h1>
        <div>
          <Button
            text={showOnlyNonEvaluated ? "Show All" : "Show Only Non-Evaluated"}
            onClick={() => {
              setShowOnlyNonEvaluated(!showOnlyNonEvaluated);
              setShowOnlyEvaluated(false);
            }}
          />
          <Button
            text={showOnlyEvaluated ? "Show All" : "Show Only Evaluated"}
            onClick={() => {
              setShowOnlyNonEvaluated(false);
              setShowOnlyEvaluated(!showOnlyEvaluated);
            }}
          />
          <Button
            text="Back to Home"
            onClick={() => (window.location.href = "/")}
          />
        </div>
      </div>
      <TableComponent
        users={users}
        showOnlyNonEvaluated={showOnlyNonEvaluated}
        showOnlyEvaluated={showOnlyEvaluated}
      />
    </div>
  );
}
