import React from "react";
import { Route, Routes } from "react-router-dom";
import BrowseImage from "./components/browse-img";
import CreatePage from "./components/create-page";
import EditImg from "./components/edit-img";
import EventPage from "./components/event-page";
import LandingPage from "./components/landing-page";
import SignUpPage from "./components/sign-up";
import UploadImg from "./components/upload-img";

export const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route path="/create" element={<CreatePage />} />
    <Route path="/event" element={<EventPage />} />
    <Route path="/signUP" element={<SignUpPage />} />
    <Route path="/browse" element={<BrowseImage />} />
    <Route path="/upload" element={<UploadImg />} />
    <Route path="/edit" element={<EditImg />} />
  </Routes>
);
