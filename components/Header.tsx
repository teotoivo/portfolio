import React from "react";

export default function Header() {
  return (
    <header className="w-full h-16 flex bg-background items-center px-6 fixed shadow-2xl shadow-background">
      <div>test</div>

      <div className="bg-btn-background ml-auto rounded-3xl border-2 p-3 px-5 hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 border-btn-border shadow-btn-main shadow-white">
        Login
      </div>
    </header>
  );
}
