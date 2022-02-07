import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { categories } from "../utils/data";
import { useState } from "react";
import { storage } from "../firebaseconfig";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPin } from "../redux/pinsSlice";
import { MdDelete } from "react-icons/md";

export default function CreatePin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  const handlePhotoUpload = async (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {}, [image]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (image && title && user && description && destination && category) {
      setIsLoading(true);
      const pinRef = ref(storage, `pins/${Date.now()}-${user.uid}`);
      const uploadTask = uploadBytesResumable(pinRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {            
            
            dispatch(
              createPin({
                imageUrl,
                title,                
                description,
                destination,
                category,
              })
            );
            setTitle("");
            setDescription("");
            setDestination("");
            setCategory("");
            setImage(null);
            setIsLoading(false);
          });
        }
      );
    }
  };

  return (
    <Layout>
      <div className="flex lg:h-3/4 h-screen w-full justify-center p-5  ">
        <form onSubmit={submitHandler}>
          <div className="gap-4 lg:h-3/4 h:full flex lg:w-5/6 w-full bg-white p-3 lg:flex-row flex-col">
            <label htmlFor="pin-photo">
              <div className="relative cursor-pointer lg:w-full lg:h-full h-420 flex flex-col items-center bg-secondaryColor justify-center p-3">
                <div className="border-dotted border-2 border-gray-300 w-full h-full flex flex-col justify-evenly items-center p-3">
                  {isLoading ? (
                    <p>Uploading</p>
                  ) : (
                    <>
                      {image ? (
                        <div className="w-full h-full">
                          <img
                            src={URL.createObjectURL(image)}
                            className="w-full h-full"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col items-center">
                            <AiOutlineCloudUpload fontSize={25} />
                            <p>Click to upload</p>
                          </div>
                          <p className="text-gray-400">
                            Recommendation: Use high-quality JPG, JPEG, SVG,
                            PNG, GIF or TIFF less than 20MB
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <input
                type="file"
                name="pin-photo"
                id="pin-photo"
                className="w-0 h-0"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>

            <div className="flex flex-col gap-4">
              <div className="w-full h-full flex gap-5 flex-col lg:justify-center">
                <div className="flex items-center gap-3">
                  <img src={user.photoURL} className="w-10 rounded-full" />
                  <p className="text-xl">{user.displayName}</p>
                </div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type={"text"}
                  placeholder="Add your title"
                  className="border-b-2 p-2 text-3xl border-gray-200 font-bold"
                />
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type={"text"}
                  placeholder="Tell everyone what your Pin is about"
                  className="border-b-2 p-2 text-lg border-gray-200"
                />
                <input
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  type={"text"}
                  placeholder="Add destination link"
                  className="border-b-2 p-2 text-lg border-gray-200 "
                />
                <h3 className="text-xl font-bold">Choose a pin category</h3>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="cursor-pointer border border-white shadow-lg p-2 focus:border"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {categories.map((item) => {
                    return (
                      <option value={item.name}>
                        {item.name[0].toUpperCase() + item.name.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  className="w-2/4 bg-secondaryColor p-2 shadow-md rounded-xl font-bold"
                >
                  Create a pin
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
