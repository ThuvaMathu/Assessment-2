import * as React from "react";
import { AppRouter } from "./app-router";
import TopAppBar from "./components/top-app-bar";
import AppProvider from "./context/provider";

export default function App() {
  return (
    <>
      <AppProvider>
        <TopAppBar />
        <AppRouter />
      </AppProvider>
      {/* <LogiPage /> */}
    </>
  );
}
