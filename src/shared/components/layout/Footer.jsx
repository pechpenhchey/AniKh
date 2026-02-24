import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-4">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">AniKH</h5>
            <p className="small">
              Your modern Anime, Manga & Novel platform.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-light">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Contact</h6>
            <p className="small mb-1">Email: support@anikh.com</p>
            <p className="small">Phnom Penh, Cambodia</p>
          </div>

        </div>
      </div>

      <div className="bg-secondary text-center py-2 small">
        © {new Date().getFullYear()} AniKH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;