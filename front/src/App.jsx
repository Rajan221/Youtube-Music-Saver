import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
