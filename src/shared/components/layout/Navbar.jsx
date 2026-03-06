import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaSearch } from "react-icons/fa";
import { MdOutlineOndemandVideo, MdCalendarMonth, MdAutoAwesome } from "react-icons/md";
import { GiBookCover } from "react-icons/gi";
import "../../../styles/navbar.css";

const dropdownMenus = {
  anime: [
    { label: "All Anime", path: "/anime", icon: <MdOutlineOndemandVideo /> },
    { label: "Seasonal Anime", path: "/seasonal", icon: <MdAutoAwesome /> },
    { label: "Airing Schedule", path: "/schedule", icon: <MdCalendarMonth /> },
  ],
  manga: [
    { label: "All Manga/Light Novel", path: "/manga-novel", icon: <GiBookCover /> },
  ],
};

const DropdownItem = ({ item }) => (
  <NavLink to={item.path} className="dropdown-nav-item">
    <span className="dropdown-nav-icon">{item.icon}</span>
    {item.label}
  </NavLink>
);

const NavDropdown = ({ label, icon, menuKey, path }) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const isMobile = window.innerWidth < 992;

  const handleMouseEnter = () => {
    if (isMobile) return;
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timerRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleClick = () => {
    if (isMobile) setOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <li
      className="nav-item nav-dropdown-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        className="nav-link d-flex align-items-center justify-content-center gap-1"
        to={path}
        onClick={handleClick}
      >
        {icon}
        {label}
        <span className="dropdown-caret">▾</span>
      </NavLink>

      {open && (
        <div className="nav-dropdown-menu">
          {dropdownMenus[menuKey].map((item) => (
            <DropdownItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </li>
  );
};

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3 px-3">
      <div className="container-fluid navbar-inner">

        {/* Left — Brand */}
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">AniKH</Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Center — Nav Links */}
          <ul className="navbar-nav navbar-center mb-2 mb-lg-0 gap-lg-2 flex-column flex-lg-row text-center align-items-lg-center">
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center justify-content-center gap-1"
                to="/"
                end
              >
                <FaHome /> Home
              </NavLink>
            </li>

            <NavDropdown
              label="Anime"
              icon={<MdOutlineOndemandVideo />}
              menuKey="anime"
              path="/anime"
            />

            <NavDropdown
              label="Manga/Light Novel"
              icon={<GiBookCover />}
              menuKey="manga"
              path="/manga-novel"
            />

            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center justify-content-center gap-1"
                to="/about"
              >
                <FaInfoCircle /> About
              </NavLink>
            </li>
          </ul>

          {/* Right — Search + Login */}
          <div className="navbar-right">
            <form className="navbar-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search anime, manga and novel..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch size={13} />
              </button>
            </form>
            <button className="btn-navbar" onClick={() => navigate("/login")}>Login</button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;