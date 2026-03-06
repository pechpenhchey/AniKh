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
import Season from "./features/animeSeasonal/pages/Seasonal";
import Search from "./features/search/pages/search";
import NotFound from "./features/error404/pages/error404";
import Login from "./features/auth/pages/login";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AppLayout = () => {
  const { pathname } = useLocation();
  const hideLayout = ["/login", "/register"].includes(pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <div className={hideLayout ? "" : "container-fluid my-1 p-3"}>
        <Routes>
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Login />} />
          <Route path="/"           element={<Home />} />
          <Route path="/anime"      element={<Anime />} />
          <Route path="/anime/:id"  element={<AnimeDetail />} />
          <Route path="/schedule"   element={<Schedule />} />
          <Route path="/seasonal"   element={<Season />} />
          <Route path="/manga-novel" element={<Manga />} />
          <Route path="/about"      element={<About />} />
          <Route path="/search"     element={<Search />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;