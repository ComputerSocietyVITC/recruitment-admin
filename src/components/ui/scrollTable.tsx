import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { ScrollArea } from "@/components/ui/scroll-area";
  
  // Sample data for the table
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Tester" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Developer" },
    { id: 6, name: "Eva Wilson", email: "eva@example.com", role: "Designer" },
    { id: 7, name: "Frank Miller", email: "frank@example.com", role: "Manager" },
    { id: 8, name: "Grace Lee", email: "grace@example.com", role: "Tester" },
    { id: 9, name: "Henry Taylor", email: "henry@example.com", role: "Developer" },
    { id: 10, name: "Ivy Anderson", email: "ivy@example.com", role: "Designer" },
  ];
  
  export default function ScrollableTable() {
    return (
      <div className="rounded-md border bg-[#04101D] p-4">
        <Table className="text-white/[.90]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white/[.90]">ID</TableHead>
              <TableHead className="text-white/[.90]">Name</TableHead>
              <TableHead className="text-white/[.90]">Email</TableHead>
              <TableHead className="text-right text-white/[.90]">Role</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <ScrollArea className="h-[250px]">
          <Table className="text-white/[.90]">
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-white/[.90]">{item.id}</TableCell>
                  <TableCell className="text-white/[.90]">{item.name}</TableCell>
                  <TableCell className="text-white/[.90]">{item.email}</TableCell>
                  <TableCell className="text-right text-white/[.90]">{item.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    );
  }
  