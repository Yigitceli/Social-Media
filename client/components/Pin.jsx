import React from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { save, savePin } from "../redux/userSlice";
import { deletePin } from "../redux/pinsSlice";

export default function Pin({ item, user }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.saved.some((item2) => item._id == item2._id)) setSaved(true);
  }, [item, user]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleSaveClick = async () => {
    dispatch(savePin(item));
  };

  const handleDeleteClick = async () => {
    dispatch(deletePin(item));
  };

  return (
    <div className="">
      <div
        className="relative z-0 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={!hovered ? "hidden" : `absolute w-full h-full`}>
          <div className="top-2 left-2 rounded-full bg-white absolute p-2 opacity-75 hover:opacity-100 flex items-center justify-center ">
            <MdDownloadForOffline fontSize={20} />
          </div>

          {!saved ? (
            <button
              onClick={handleSaveClick}
              className="absolute top-2 right-2 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleSaveClick}
              className="absolute top-2 right-2 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl"
            >
              Saved
            </button>
          )}
          <a
            href={item.destination}
            target={"_blank"}
            className="absolute bottom-2 opacity-75 hover:opacity-100 left-2 bg-white flex items-center gap-1 p-2 rounded-full justfiy-evenly"
          >
            <BsFillArrowUpRightCircleFill />
            <p className="font-bold">{item.destination}</p>
          </a>
          {item.postedBy.googleId == user.googleId && (
            <div
              onClick={handleDeleteClick}
              className="absolute bottom-2 right-2 bg-white opacity-75 hover:opacity-100 rounded-full p-2"
            >
              <AiTwotoneDelete />
            </div>
          )}
        </div>

        <img src={item.pinUrl} className="rounded-lg " />
      </div>

      <div className="w-full flex gap-3 items-center relative">
        <img src={item.postedBy.picture} className="w-8 rounded-full" />
        <p className="font-bold">{item.postedBy.name}</p>
      </div>
    </div>
  );
}
