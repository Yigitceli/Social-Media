import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-row w-100 ">
      <Sidebar/>   
      {children}
    </div>
  );
}
