import React from "react";

export default function ErrorComponent({ error }: { error: string | null }) {
  return (
    <div
      className={`${
        error ? "scale-100" : "scale-0"
      } transition-all duration-100 ease-in-out transform text-red-500`}
    >
      {error}
    </div>
  );
}
