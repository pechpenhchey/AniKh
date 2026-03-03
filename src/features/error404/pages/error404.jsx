import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ message = "This page doesn't exist yet." }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ fontSize: "6rem", lineHeight: 1, marginBottom: 16 }}>404</div>
      <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Page Not Found</h2>
      <p style={{ color: "#888", marginBottom: 32, maxWidth: 400 }}>{message}</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "transparent",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "var(--color-primary, #0d6efd)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
