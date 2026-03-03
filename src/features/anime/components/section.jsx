import React from "react";
import Loading from "../../../shared/components/layout/Loading";

const Section = ({ title, loading, empty, emptyMessage, children }) => (
  <div className="my-5">
    <div className="section-heading mb-3">
      <h2 className="card-text-bg mb-0">{title}</h2>
    </div>
    {loading ? (
      <Loading />
    ) : empty ? (
      <p className="text-muted">{emptyMessage ?? "No data available."}</p>
    ) : (
      children
    )}
  </div>
);

export default Section;