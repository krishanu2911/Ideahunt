import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Explore, Profile } from "../Pages/index";
import "../App.css"
function RouterPath() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/explore" element={<Explore />} />
      {/* <Route path="/Profile" element={<Profile />} /> */}
      <Route path="/Profile/:userId" element={<Profile />} />
    </Routes>
  );
}
export default RouterPath;
