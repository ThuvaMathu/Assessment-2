import * as React from "react";
import { AppRouter } from "./app-router";
import BrowseImage from "./components/browse-img";
import CreatePage from "./components/create-page";
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
