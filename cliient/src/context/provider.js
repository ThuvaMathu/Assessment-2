import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useProvider = () => useContext(AppContext);

export default AppProvider;
