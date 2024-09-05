import React from "react";
import CardGrid from "@/components/ui/CardGrid";
import ScrollableTable from "@/components/ui/scrollTable";

const Page: React.FC = () => {
  return (
    <div>
      <main className="text-center text-white/[.90] p-8 mb-20 w-full max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">Admin IEEECS</h1>
        <p className="text-2xl">Welcome to the Admin Page for IEEECS</p>
      </main>

      <CardGrid />

      <div className="p-5">
        <ScrollableTable />
      </div>
    </div>
  );
};

export default Page;
