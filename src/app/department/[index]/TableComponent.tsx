import Link from "next/link";

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

interface TableComponentProps {
  users: User[];
  showOnlyNonEvaluated: boolean;
}

export default function TableComponent({
  users,
  showOnlyNonEvaluated,
}: TableComponentProps) {
  const filteredUsers = users.filter(
    (user) =>
      user.submitted &&
      (!showOnlyNonEvaluated ||
        !(user.evaluatedPrefOne && user.evaluatedPrefTwo))
  );

  return (
    <div className="rounded-md border border-gray-700 bg-[#04101D]">
      <table className="w-full table-auto text-white/[.90]">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Evaluated Preference 1</th>
            <th className="px-4 py-2 text-left">Evaluated Preference 2</th>
            <th className="px-4 py-2 text-left">Points Preference 1</th>
            <th className="px-4 py-2 text-left">Points Preference 2</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <tr
              key={user.id}
              className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer ${
                user.evaluatedPrefOne && user.evaluatedPrefTwo
                  ? "bg-teal-950"
                  : ""
              }`}
            >
              <Link href={`/user/${user.id}`} className="contents">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.evaluatedPrefOne ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">
                  {user.evaluatedPrefTwo ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">{user.pointsPrefOne}</td>
                <td className="px-4 py-2">{user.pointsPrefTwo}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
