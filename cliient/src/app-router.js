import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./components/create-page";
import EventPage from "./components/event-page";
import LandingPage from "./components/landing-page";
import SignUpPage from "./components/sign-up";

export const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route path="/create" element={<CreatePage />} />
    <Route path="/event" element={<EventPage />} />
    <Route path="/signUP" element={<SignUpPage />} />
  </Routes>
);
