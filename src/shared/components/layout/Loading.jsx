import React from "react";

const Loader = ({ text = "Loading...", fullHeight = false }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${
        fullHeight ? "vh-100" : "py-5"
      }`}
    >
      <div className="spinner-border text-dark" role="status" />
      <span className="mt-3">{text}</span>
    </div>
  );
};

export default Loader;