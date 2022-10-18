import React, { useEffect } from "react";
import { AppRouter } from "./app-router";
import TopAppBar from "./components/top-app-bar";
import { useProvider } from "./context/provider";

export default function Main() {
  const { setUserData, setIsLoggedIn } = useProvider();
  useEffect(() => {
    let user = localStorage.getItem("user-session-data");
    let userData = JSON.parse(user);

    if (userData !== null) {
      if (userData.loginStatus === 200) {
        setUserData(userData);
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <>
      <TopAppBar />
      <AppRouter />
    </>
  );
}
