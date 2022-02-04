import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";

const active =
  " duration-200 ease-in-out capitalize transition-all flex items-center gap-3 cursor-pointer font-bold text-black border-r-2 border-black hover:text-black";
const disActive =
  " duration-200 ease-in-out capitalize flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black transition-all";

export default function Sidebar() {
  const Router = useRouter();
  useEffect(() => {}, [Router]);
  return (
    <div className="md:flex justify-between h-screen shadow-md py-7 pl-5 flex-col hidden min-w-210">
      <img className="gap-2" src="/logo.png" width={150} />
      <Link href="/">
        <div className={Router.pathname == "/" ? active : disActive}>
          <RiHomeFill />
          <p className="bold ">Home</p>
        </div>
      </Link>
      <p className="">Discover Categories</p>
      {categories.map((item) => {
        return (
          <Link href={`/category/${item.name}`}>
            <div
              className={
                Router.pathname == `/category/${item.name}` ? active : disActive
              }
            >
              <img
                src={item.image}
                className="w-8 h-8 object rounded-full overflow-hidden"
              />

              <p className="bold ">
                {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
              </p>
            </div>
          </Link>
        );
      })}

      <div></div>
    </div>
  );
}
