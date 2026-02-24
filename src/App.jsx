import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/layout/Navbar";
import Footer from "./shared/components/layout/Footer";
import Home from "./features/home/pages/Home";
import Anime from "./features/anime/pages/Anime";
import About from "./features/home/pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid my-1 p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;