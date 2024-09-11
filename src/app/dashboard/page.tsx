import React from "react";
import CardGrid from "@/components/ui/CardGrid";

const Page: React.FC = () => {
  return (
    <div>
      <main className="min-h-screen flex flex-col justify-center items-center text-center text-white/[.90]">
        <h1 className="text-6xl font-bold mb-4">Admin IEEECS</h1>
        <p className="text-2xl">Welcome to the Admin Page for IEEECS</p>
        <CardGrid />
      </main>
    </div>
  );
};

export default Page;