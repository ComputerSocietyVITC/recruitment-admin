import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cardData } from "@/app/data/CardsData";

const CardGrid: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <main className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <a key={card.index} href={`department/${card.index}`}>
              <Card key={index}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white/[.85]">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/[.90]">{card.content}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CardGrid;
