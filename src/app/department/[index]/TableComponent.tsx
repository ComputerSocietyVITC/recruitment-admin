import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function TableComponent({ users }: { users: User[] }) {
  return (
    <div className="rounded-md border bg-[#04101D] p-4">
      <Table className="text-white/[.90]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/[.90]">Name</TableHead>
            <TableHead className="text-white/[.90]">Email</TableHead>
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
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
