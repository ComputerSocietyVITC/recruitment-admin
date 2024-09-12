"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase";
import UserCard from "@/components/UserCard";
import QACard from "@/components/QACard";
import Button from "@/components/Button";
import { Department, getKeyFromValue } from "@/app/data/Departments";

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
  department: string;
}

const departmentMapping: { [key: string]: string } = {
  TECHNICAL: "Technical",
  DESIGN: "UI/UX and Design",
  MANAGEMENT: "HR and Management",
  SMC: "Social Media and Content",
};

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
            .select("question, department")
            .eq("id", answerQuestion.questionId)
            .single();

          if (questionError) {
            setError(questionError.message);
            return answerQuestion;
          }

          return {
            ...answerQuestion,
            questionText: questionData?.question || "Unknown Question",
            department: questionData?.department || "Unknown Department",
          };
        })
      );

      setAnswerQuestions(enrichedAnswerQuestions);
      setLoading(false);
    };

    fetchData();
  }, [userid, supabase]);

  // Function to handle points update from QACard
  const handlePointsUpdate = (answerId: string, updatedPoints: number) => {
    setAnswerQuestions(
      (prevAnswers) =>
        prevAnswers?.map((answer) =>
          answer.id === answerId ? { ...answer, points: updatedPoints } : answer
        ) || []
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  const firstPref = user?.firstPreference;
  const secondPref = user?.secondPreference;

  const questionsByFirstPref = answerQuestions?.filter(
    (answer) => departmentMapping[answer.department] === firstPref
  );
  const questionsBySecondPref = answerQuestions?.filter(
    (answer) => departmentMapping[answer.department] === secondPref
  );

  // Function to update first preference marks
  const handleUpdateFirstPref = async () => {
    if (!questionsByFirstPref || !user) return;

    const totalPoints = questionsByFirstPref.reduce(
      (sum, answer) => sum + answer.points,
      0
    );

    try {
      const { error } = await supabase
        .from("User")
        .update({
          pointsPrefOne: totalPoints,
          evaluatedPrefOne: true,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating first preference points:", error.message);
      } else {
        console.log("First preference points updated successfully");
        // Update user state
        setUser(
          (prevUser) =>
            prevUser && {
              ...prevUser,
              pointsPrefOne: totalPoints,
              evaluatedPrefOne: true,
            }
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Function to update second preference marks
  const handleUpdateSecondPref = async () => {
    if (!questionsBySecondPref || !user) return;

    const totalPoints = questionsBySecondPref.reduce(
      (sum, answer) => sum + answer.points,
      0
    );

    try {
      const { error } = await supabase
        .from("User")
        .update({
          pointsPrefTwo: totalPoints,
          evaluatedPrefTwo: true,
        })
        .eq("id", user.id);

      if (error) {
        console.error(
          "Error updating second preference points:",
          error.message
        );
      } else {
        console.log("Second preference points updated successfully");
        // Update user state
        setUser(
          (prevUser) =>
            prevUser && {
              ...prevUser,
              pointsPrefTwo: totalPoints,
              evaluatedPrefTwo: true,
            }
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Function to reset first preference points and evaluated status
  const handleResetFirstPref = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("User")
        .update({
          pointsPrefOne: 0,
          evaluatedPrefOne: false,
        })
        .eq("id", user.id);

      if (error) {
        console.error(
          "Error resetting first preference points:",
          error.message
        );
      } else {
        console.log("First preference points reset successfully");

        // Update user state to reflect the reset
        setUser((prevUser) =>
          prevUser
            ? { ...prevUser, pointsPrefOne: 0, evaluatedPrefOne: false }
            : null
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Function to reset second preference points and evaluated status
  const handleResetSecondPref = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("User")
        .update({
          pointsPrefTwo: 0,
          evaluatedPrefTwo: false,
        })
        .eq("id", user.id);

      if (error) {
        console.error(
          "Error resetting second preference points:",
          error.message
        );
      } else {
        console.log("Second preference points reset successfully");

        // Update user state to reflect the reset
        setUser((prevUser) =>
          prevUser
            ? { ...prevUser, pointsPrefTwo: 0, evaluatedPrefTwo: false }
            : null
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="text-white/[.90]">
      <>
        <div className="flex flex-row justify-between mb-4">
          <h1 className="text-3xl font-bold">User</h1>
          <Button
            text="Back to Department"
            onClick={() => {
              const departmentKey = getKeyFromValue(
                Department,
                user?.firstPreference || ""
              );
              if (departmentKey !== undefined) {
                window.location.href = `/department/${departmentKey}`;
              }
            }}
          />
        </div>
        {user && <UserCard user={user} />}
        {/* First Preference Questions */}
        <h2 className="text-3xl font-bold mt-6 mb-4">
          {user?.firstPreference} Questions
        </h2>
        {questionsByFirstPref && questionsByFirstPref.length > 0 ? (
          <ul>
            {questionsByFirstPref.map((answerQuestion) => (
              <li key={answerQuestion.id}>
                <QACard
                  {...answerQuestion}
                  onPointsUpdate={(updatedPoints) =>
                    handlePointsUpdate(answerQuestion.id, updatedPoints)
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions for {user?.firstPreference}</p>
        )}
        <Button
          text={`Update ${firstPref} Marks`}
          onClick={handleUpdateFirstPref}
        />
        <Button
          text={`Reset ${firstPref} Marks`}
          onClick={handleResetFirstPref}
        />

        {/* Second Preference Questions */}
        <h2 className="text-3xl font-bold mt-6 mb-4">
          {user?.secondPreference} Questions
        </h2>
        {questionsBySecondPref && questionsBySecondPref.length > 0 ? (
          <ul>
            {questionsBySecondPref.map((answerQuestion) => (
              <li key={answerQuestion.id}>
                <QACard
                  {...answerQuestion}
                  onPointsUpdate={(updatedPoints) =>
                    handlePointsUpdate(answerQuestion.id, updatedPoints)
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions for {user?.secondPreference}</p>
        )}
        <Button
          text={`Update ${secondPref} Marks`}
          onClick={handleUpdateSecondPref}
        />
        <Button
          text={`Reset ${secondPref} Marks`}
          onClick={handleResetSecondPref}
        />
      </>
    </div>
  );
}
