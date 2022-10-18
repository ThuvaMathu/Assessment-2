import React, { createContext, useContext, useState } from "react";
import img from "../assets/Birthday-cake.png";
import { imageURLArray } from "../components/images";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectImage, setSelectImage] = useState(imageURLArray[2]);
  const [rawImage, setRawImage] = useState(null);
  const [userData, setUserData] = useState({});

  return (
    <AppContext.Provider
      value={{
        selectImage,
        setSelectImage,
        open,
        setOpen,
        rawImage,
        setRawImage,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useProvider = () => useContext(AppContext);

export default AppProvider;
