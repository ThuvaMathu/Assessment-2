import * as React from "react";
import { AppRouter } from "./app-router";
import TopAppBar from "./components/top-app-bar";

export default function App() {
  return (
    <>
      <TopAppBar />
      <AppRouter />
    </>
  );
}
