import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [refreshTogler, setRefreshTogler] = useState(0);

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
        refreshTogler,
        setRefreshTogler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useProvider = () => useContext(AppContext);

export default AppProvider;
