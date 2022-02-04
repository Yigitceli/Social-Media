import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { AiFillCloseCircle } from "react-icons/ai";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex h-screen md:flex-row w-100 flex-col bg-mainColor">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {isOpen && (
        <div className="w-4/5 bg-white absolute md:hidden block animate-slide-in transition-all duration-200 ease-in-out">
          <AiFillCloseCircle
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-3xl cursor-pointer"
          />
          <Sidebar />
        </div>
      )}
      <Navbar setIsOpen={setIsOpen} />

      {children}
    </div>
  );
}
