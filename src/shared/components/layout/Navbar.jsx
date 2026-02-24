import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3">
      <div className="container-fluid">
        <Link className="navbar-brand me-5 ms-2" to="/">AniKH</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 flex-column flex-lg-row text-center">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center justify-content-center gap-1" to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center justify-content-center gap-1" to="/anime">
                <MdOutlineOndemandVideo />
                Anime
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center justify-content-center gap-1" to="/about">
                <FaInfoCircle />
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">
            <button className="btn-navbar">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;