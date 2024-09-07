import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AnswerQuestionProps {
  id: string;
  questionId: string;
  userId: string;
  response: string;
  points: number;
  questionText?: string;
  onPointsUpdate: (updatedPoints: number) => void;
}

const QACard: React.FC<AnswerQuestionProps> = (answerQuestion) => {
  const [points, setPoints] = useState<string>(
    answerQuestion.points.toString()
  );
  const supabase = createClient();
  const { onPointsUpdate } = answerQuestion;

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
        // Update parent component's state
        onPointsUpdate(newPoints);
      }
    } catch (err) {
      console.error("Unexpected error updating points:", err);
    }
  };

  return (
    <div className="border px-4 py-2 my-2 rounded-lg border-white/[.90]">
      <h3 className="text-lg font-semibold my-2 whitespace-pre-line">
        Q. {answerQuestion.questionText}
      </h3>
      <p className="text-md my-2 whitespace-pre-line">
        {answerQuestion.response}
      </p>
      <label className="block">
        <input
          type="number"
          id="points"
          className="text-md my-2 bg-slate-700 rounded px-2 py-1"
          value={points}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (
              inputValue === "" ||
              (Number(inputValue) >= 0 && Number(inputValue) <= 10)
            ) {
              setPoints(inputValue); // Keep it as string for user input flexibility
            }
          }}
          onBlur={() => {
            // Update only if the input is not empty
            if (points !== "") {
              const inputValue = Number(points);
              if (inputValue > 10) {
                setPoints("10"); // Clamp to 10
              } else if (inputValue < 0) {
                setPoints("0"); // Clamp to 0
              }
              handlePointsBlur();
            }
          }}
          min="0"
          max="10"
        />
        <span id="points-help" className="ml-4 text-xs text-muted-foreground">
          (Enter a value between 1 and 10)
        </span>
      </label>
    </div>
  );
};

export default QACard;
