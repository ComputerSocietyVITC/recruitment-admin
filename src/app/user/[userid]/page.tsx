"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import UserCard from "@/components/UserCard";
import QACard from "@/components/QACard";

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

interface AnswerQuestion {
  id: string;
  questionId: string;
  userId: string;
  response: string;
  points: number;
  questionText?: string;
}

export default function UserPage() {
  const { userid } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [answerQuestions, setAnswerQuestions] = useState<
    AnswerQuestion[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from("User")
        .select("*")
        .eq("id", userid)
        .single();

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (userData) {
        setUser(userData);
      }

      // Fetch answer questions
      const { data: answerQuestionData, error: answerQuestionError } =
        await supabase.from("AnswerMapping").select("*").eq("userId", userid);

      if (answerQuestionError) {
        setError(answerQuestionError.message);
        setLoading(false);
        return;
      }

      // Fetch question text for each answer
      const enrichedAnswerQuestions = await Promise.all(
        answerQuestionData.map(async (answerQuestion: AnswerQuestion) => {
          const { data: questionData, error: questionError } = await supabase
            .from("Question")
            .select("question")
            .eq("id", answerQuestion.questionId)
            .single();

          if (questionError) {
            setError(questionError.message);
            return answerQuestion;
          }

          return {
            ...answerQuestion,
            questionText: questionData?.question || "Unknown Question",
          };
        })
      );

      setAnswerQuestions(enrichedAnswerQuestions);
      setLoading(false);
    };

    fetchData();
  }, [userid, supabase]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="text-white/[.90]">
      <>
        <h1 className="text-3xl font-bold mb-2">User</h1>
        <UserCard user={user} />
        <h2 className="text-3xl font-bold mt-4 mb-2">Answers</h2>
        {answerQuestions && (
          <ul>
            {answerQuestions.map((answerQuestion) => (
              <li key={answerQuestion.id}>
                <QACard {...answerQuestion} />
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
}
