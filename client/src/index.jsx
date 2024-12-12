import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// Import your components
import Home from "./Home";
import Walkers from "./Walkers";
import Cities from "./Cities";
import AddDog from "./AddDog";
import DogDetails from "./DogDetails";
import EditWalker from "./EditWalker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Parent Route */}
      <Route path="/" element={<App />}>
        {/* Child Routes */}
        <Route index element={<Home />} />
        <Route path="walkers" element={<Walkers />} />
        <Route path="cities" element={<Cities />} />
        <Route path="adddog" element={<AddDog />} />
        <Route path="dogdetails/:dogId" element={<DogDetails />} />
        <Route path="walkers/edit/:walkerId" element={<EditWalker />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
