import React from "react";
import {Routes, Route} from "react-router";
import Products from "../Products"

const Main = () => {
  return <div>
    <Routes>
      <Route path="/" element={<Products/>} />
    </Routes>
  </div>;
};

export default Main;
