import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./shared/components/layout/Navbar";
import Footer from "./shared/components/layout/Footer";
import Home from "./features/home/pages/Home";
import Anime from "./features/anime/pages/Anime";
import Manga from "./features/manga/pages/Manga";
import About from "./features/home/pages/About";
import AnimeDetail from "./features/anime/detailAnime";
import Schedule from "./features/schedule/pages/Schedule";
import Search from "./features/search/pages/search";
import NotFound from "./features/error404/pages/error404";

// Scrolls to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container-fluid my-1 p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;