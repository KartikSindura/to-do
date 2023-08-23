import React from "react";
import { Route, Routes } from "react-router-dom";
import "./global.css"
import Home from "./components/Home";


const App = () => {
  return (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
  );
};

export default App;
