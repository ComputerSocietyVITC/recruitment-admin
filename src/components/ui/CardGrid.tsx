import React from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Adjust the import path as necessary

const CardGrid: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <main className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white/[.85]">Technical</CardTitle>
              <CardDescription className="text-lg text-white/[.90]">Description for Card 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/[.90]">This is some content for the first card.</p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white/[.85]">Management</CardTitle>
              <CardDescription className="text-lg text-white/[.90]">Description for Card 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/[.90]">This is some content for the second card.</p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white/[.85]">Design and UI/UX</CardTitle>
              <CardDescription className="text-lg text-white/[.90]">Description for Card 3</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/[.90]">This is some content for the third card.</p>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white/[.85]">Social Media and Marketing</CardTitle>
              <CardDescription className="text-lg text-white/[.90]">Description for Card 4</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/[.90]">This is some content for the fourth card.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CardGrid;
