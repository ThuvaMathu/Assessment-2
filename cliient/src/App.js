import * as React from "react";
import AppProvider from "./context/provider";
import Main from "./Main";

export default function App() {
  return (
    <>
      <AppProvider>
        <Main />
      </AppProvider>
    </>
  );
}

//   <TopAppBar />
//       <AppRouter />
//  <LogiPage />
