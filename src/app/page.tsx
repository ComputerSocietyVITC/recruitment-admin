import React from "react";
import { Montserrat } from "next/font/google";
import CardGrid from "@/components/ui/CardGrid"; // Adjust the import path as necessary
import ScrollableTable from "@/components/ui/scrollTable";
const montserrat = Montserrat({ subsets: ["latin"] });

const Page: React.FC = () => {
  return (
    <div
      className={`bg-gradient-to-r from-black via-[#04101d] to-black ${montserrat.className} text-fuchsia-85 min-h-screen flex flex-col`}
    >
      <main className="text-center text-white/[.90] p-8 mb-20 w-full max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">Admin IEEECS</h1>
        <p className="text-2xl">Welcome to the Admin Page for IEEECs</p>
      </main>

      {/* Use CardGrid component */}
      <CardGrid />

      <div className="p-5">
        <ScrollableTable />
      </div>
    </div>
  );
};

export default Page;
