import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Feed from "../../components/Feed";

import ProfilLayout from "../../components/ProfilLayout";

const active = "font-bold bg-redColor text-white p-2 px-4 rounded-full";
const disActive = "font-bold bg-white text-black p-2 px-4 rounded-full";

const UserId = () => {
  const userData = useSelector((state) => state.user.data);
  const [isActive, setIsActive] = useState(true);
  const Router = useRouter();
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = Router.query;

  useEffect(async () => {
    if (userId) {
      setIsLoading(true);
      const userData = await axios.get(`http://localhost:5000/user/${userId}`);
      const pinData = await axios.get(
        `http://localhost:5000/pin?userId=${userId}`
      );
      setUser(userData.data.payload);
      setPins(pinData.data.payload);
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <ProfilLayout>
      <div className="">
        {isLoading ? (
          <PageLoading message="Getting User Data..." />
        ) : (
          <div className="flex flex-col">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <div className="w-full flex items-center flex-col gap-5 -my-10">
              <img src={user?.photoUrl} className="w-20 rounded-full" />
              <h3 className="font-bold text-3xl">{user?.displayName}</h3>
              <div className="flex gap-3">
                <button
                  className={isActive ? active : disActive}
                  onClick={() => setIsActive(true)}
                >
                  Created
                </button>
                <button
                  className={!isActive ? active : disActive}
                  onClick={() => setIsActive(false)}
                >
                  Saved
                </button>
              </div>

              <div>
                {isActive ? (
                  <Feed user={userData} data={pins} />
                ) : (
                  <Feed user={userData} data={user.saved} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfilLayout>
  );
};

export default UserId;
