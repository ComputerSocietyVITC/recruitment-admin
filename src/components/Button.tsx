import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-sky-900 px-4 py-2 mx-2 text-white bg-sky-900 hover:bg-sky-950 transition"
    >
      {text}
    </button>
  );
};

export default Button;
