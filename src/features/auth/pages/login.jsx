import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire Firebase later
  };

  return (
    <div className="auth-page">

      {/* Left — decorative */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h1 className="auth-brand">AniKH</h1>
          <p className="auth-brand-sub">Your anime & manga universe</p>
          <div className="auth-deco-cards">
            <div className="deco-card deco-card-1" />
            <div className="deco-card deco-card-2" />
            <div className="deco-card deco-card-3" />
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="auth-right">
        <div className="auth-card">

          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to save your favourites</p>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn" type="submit">
              Sign In
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;