import { useRouter } from "next/router";
import React, { useState } from "react";
import withAuth from "../services/useAuth";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import Pin from "./Pin";
import { useEffect } from "react";
const breakpointColumnsObj = {
  default: 5,
  1500: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Feed = () => {
  const pins = useSelector((state) => state.pins.data);
  const Router = useRouter();
  const user = useSelector((state) => state.user.data);




  return (
    <Masonry
      className="my-masonry-grid w-full h-full flex px-5 gap-1"
      columnClassName="my-masonry-grid_column flex flex-col gap-2"
      breakpointCols={breakpointColumnsObj}
    >
      {pins?.map((item) => {
        return (
          <Pin
            user={user}
            item={item}

          />
        );
      })}
    </Masonry>
  );
};

export default withAuth(Feed);
