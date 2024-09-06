import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AnswerQuestionProps {
  id: string;
  questionId: string;
  userId: string;
  response: string;
  points: number;
  questionText?: string;
}

const QACard: React.FC<AnswerQuestionProps> = (answerQuestion) => {
  const [points, setPoints] = useState<string>(
    answerQuestion.points.toString()
  );
  const supabase = createClient();

  const handlePointsBlur = async () => {
    if (points === "") {
      return; // Don't update the database if the input is empty
    }

    try {
      const newPoints = Number(points);
      const { error } = await supabase
        .from("AnswerMapping")
        .update({ points: newPoints })
        .eq("id", answerQuestion.id);

      if (error) {
        console.error("Error updating points:", error.message);
      } else {
        console.log("Points updated successfully");
      }
    } catch (err) {
      console.error("Unexpected error updating points:", err);
    }
  };

  return (
    <div className="border px-4 py-2 border-white/[.90]">
      <h3 className="text-lg font-semibold my-2 whitespace-pre-line">
        Q. {answerQuestion.questionText}
      </h3>
      <p className="text-md my-2 whitespace-pre-line">
        {answerQuestion.response}
      </p>
      <input
        type="number"
        className="text-md my-2 bg-slate-700 rounded px-2 py-1"
        value={points}
        onChange={(e) => setPoints(e.target.value)} // Update points in state
        onBlur={handlePointsBlur} // Update when input loses focus
        min="0" // Ensure input is not negative
        max="10" // TODO: Fix maxmimum limit not working
      />
    </div>
  );
};

export default QACard;
