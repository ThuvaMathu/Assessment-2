import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./components/create-page";
import EventPage from "./components/event-page";
import LandingPage from "./components/landing-page";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/event" element={<EventPage />} />
    </Routes>
  </BrowserRouter>
);
