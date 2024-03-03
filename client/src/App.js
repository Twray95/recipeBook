import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RecipePage from "./pages/Recipe";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
