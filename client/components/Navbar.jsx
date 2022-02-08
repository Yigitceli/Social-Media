import React from "react";
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import Link from "next/link";

export default function Navbar({ setIsOpen }) {
  const user = useSelector((state) => state.user?.data);
  return (
    <div className="flex flex-col w-full">
      <div className="flex  justify-between shadow-md h-14 px-2 items-center md:hidden flex w-full">
        <HiMenu
          fontSize={40}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
        <img src="/logo.png" width={112} />
        {user && (
          <img
            src={user.photoURL}
            className="rounded-full w-9 h-9 cursor-pointer"
          />
        )}
      </div>
      <div className="my-5 px-4 flex w-full gap-2">
        <div className="flex bg-white items-center gap-2 px-3 py-3 rounded-lg w-full">
          <IoMdSearch fontSize={21} />
          <input
            type={"text"}
            placeholder="Search"
            className="outline-none w-full"
          />
        </div>
        {user && (
          <Link href={`user/${user.uid}`}>
            <img
              src={user.photoURL}
              className="cursor-pointer w-14 h-12 rounded-lg hidden md:block"
            />
          </Link>
        )}
        <Link href={"/create-pin"}>
          <div className="bg-black md:h-12 h-12 cursor-pointer flex w-12 md:w-14 items-center justify-center rounded-lg">
            <IoMdAdd className="text-white" fontSize={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}
