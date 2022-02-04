import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebaseconfig";
import { signIn } from "../redux/userSlice";
import withAuth from "../services/useAuth";
import { wrapper } from "../store";

function login() {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      dispatch(signIn(data));
    } catch (error) {}
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="relative w-100 h-screen bg-black">
      <video
        className=" absolute z-1 w-full h-screen object-cover"
        autoPlay
        loop
        muted
        controls={false}
      >
        <source src="/share.mp4" type="video/mp4" />
      </video>

      <div className="absolute z-3 bg-blackOverlay w-full h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center my-3">
          <img src="/logowhite.png" width="130" />
        </div>
        <button
          onClick={signWithGoogle}
          className="bg-white text-dark w-70 h-8 p-3 py-6 rounded-lg text-sm flex justify-between items-center"
        >
          <FaGooglePlusG className="mr-3 text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default withAuth(login);