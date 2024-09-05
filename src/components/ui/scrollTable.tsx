import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

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

export default async function ScrollableTable() {
  const { data: users, error } = await supabase.from<User>("User").select();

  if (error) {
    console.error("Error fetching users:", error.message);
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
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[250px]">
        <Table className="text-white/[.90]">
          <TableBody>
            {users?.map(
              (user) =>
                user.submitted && (
                  <TableRow key={user.id}>
                    <TableCell destination={`/user/${user.id}`}>
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstPreference}</TableCell>
                    <TableCell>{user.secondPreference}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
