import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import "./App.css";
import Footer from "./pages/Footer";
import { useState } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Footer searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        <Route
          path="/"
          element={
            <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}
