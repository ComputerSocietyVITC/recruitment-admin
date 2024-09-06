import React from "react";

interface User {
  name: string;
  email: string;
  firstPreference: string;
  secondPreference: string;
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
    </div>
  );
};

export default UserCard;
