import React from "react";

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

const UserCard = ({ user }: { user: User }) => {
  const { name, email, firstPreference, secondPreference } = user;

  return (
    <div className="text-xl px-4 py-2 rounded-md bg-slate-800">
      <h2 className="py-1">
        <div className="font-bold inline-block">Name</div>: {name}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Email</div>: {email}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">First Preference</div>:{" "}
        {firstPreference}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Second Preference</div>:{" "}
        {secondPreference}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Submitted</div>:{" "}
        {user.submitted ? "Yes" : "No"}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Evaluated Preference 1</div>:{" "}
        {user.evaluatedPrefOne ? "Yes" : "No"}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Evaluated Preference 2</div>:{" "}
        {user.evaluatedPrefTwo ? "Yes" : "No"}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Points Preference 1</div>:{" "}
        {user.pointsPrefOne}
      </h2>
      <h2 className="py-1">
        <div className="font-bold inline-block">Points Preference 2</div>:{" "}
        {user.pointsPrefTwo}
      </h2>
    </div>
  );
};

export default UserCard;
