"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
  userid: string;
  response: string;
  points: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  department: string;
  type: string;
}

export default function UserPage() {
  const params = useParams();
  const userid = params?.userid;
  const [user, setUser] = useState<User | null>(null);
  const [answerQuestions, setAnswerQuestions] = useState<
    AnswerQuestion[] | null
  >(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from<User>("User")
        .select("*")
        .eq("id", userid)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setUser(data);
      }
    };

    if (userid) {
      fetchUser();
    }
  }, [userid]);

  useEffect(() => {
    const fetchAnswerQuestions = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from<AnswerQuestion>("AnswerMapping")
        .select("*")
        .eq("userId", userid);

      if (error) {
        setError(error.message);
      } else {
        setAnswerQuestions(data);
      }
    };

    if (userid) {
      fetchAnswerQuestions();
    }
  }, [userid]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from<Question>("Question")
        .select("*");

      if (error) {
        setError(error.message);
      } else {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, [userid]);

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="rounded-md border bg-[#04101D] p-4">
      <Table className="text-white/[.90]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/[.90]">Name</TableHead>
            <TableHead className="text-white/[.90]">Email</TableHead>
            <TableHead className="text-white/[.90]">First Preference</TableHead>
            <TableHead className="text-white/[.90]">
              Second Preference
            </TableHead>
            <TableHead className="text-white/[.90]">Created At</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[250px]">
        <Table className="text-white/[.90]">
          <TableBody>
            {user?.submitted && (
              <TableRow key={user.id}>
                <TableCell className="text-white/[.90]">{user.name}</TableCell>
                <TableCell className="text-white/[.90]">{user.email}</TableCell>
                <TableCell className="text-white/[.90]">
                  {user.firstPreference}
                </TableCell>
                <TableCell className="text-white/[.90]">
                  {user.secondPreference}
                </TableCell>
                <TableCell className="text-white/[.90]">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <h2 className="text-white mt-4">Answer Questions</h2>
      <Table className="text-white/[.90]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/[.90]">Question</TableHead>
            <TableHead className="text-white/[.90]">Response</TableHead>
            <TableHead className="text-white/[.90]">Points</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[250px]">
        <Table className="text-white/[.90]">
          <TableBody>
            {answerQuestions?.map((answerQuestion) => {
              const mQuestion = questions?.find(
                (question) => question.id === answerQuestion.questionId
              );

              return (
                <TableRow key={answerQuestion.id}>
                  <TableCell className="text-white/[.90]">
                    {mQuestion?.question}
                  </TableCell>
                  <TableCell className="text-white/[.90]">
                    {answerQuestion.response}
                  </TableCell>
                  <TableCell className="text-white/[.90]">
                    {answerQuestion.points}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
