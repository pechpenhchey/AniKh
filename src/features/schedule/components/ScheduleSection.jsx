import React, { useState } from "react";
import { Container, Badge } from "react-bootstrap";
import MediaCard from "../../../shared/components/layout/Card";
import { scheduleCardProps } from "../components/scheduleConfig";
import "../styles/Schedule.css";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const PER_PAGE = 10;

const getTodayKey = () => {
  const day = new Date().getDay();
  return DAYS[day === 0 ? 6 : day - 1];
};

const ScheduleSection = ({ schedule, loading, activeDay, onDayChange }) => {
  const today = getTodayKey();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(schedule.length / PER_PAGE);
  const paginated = schedule.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const skeletons = Array.from({ length: 5 });

  const handleDayChange = (day) => {
    setPage(1);
    onDayChange(day);
  };

  return (
    <div className="schedule-wrapper" style={{ background: "var(--color-bg-main)", padding: "40px 0", minHeight: "100vh" }}>
      <Container>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1" style={{ color: "var(--color-text-main)", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
              📅 Airing Schedule
            </h2>
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", fontFamily: "var(--font-main)" }}>
              Anime airing this week
            </span>
          </div>
          <Badge
            style={{
              fontSize: "0.8rem",
              padding: "6px 12px",
              background: "var(--color-primary)",
              fontFamily: "var(--font-main)",
            }}
          >
            {today.charAt(0).toUpperCase() + today.slice(1)} Today
          </Badge>
        </div>

        {/* Day Tabs */}
        <div
          className="d-flex gap-2 flex-wrap mb-4"
          style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}
        >
          {DAYS.map((day) => {
            const isActive = activeDay === day;
            const isToday = day === today;
            return (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`schedule-day-tab ${isActive ? "active" : isToday ? "today" : ""}`}
              >
                {day}
                {isToday && !isActive && <span className="schedule-today-dot" />}
              </button>
            );
          })}
        </div>

        {/* Count */}
        {!loading && schedule.length > 0 && (
          <p className="schedule-count">
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, schedule.length)} of {schedule.length} titles airing on{" "}
            <span>{activeDay}</span>
          </p>
        )}

        {/* Cards Grid */}
        <div className="schedule-grid">
          {loading
            ? skeletons.map((_, i) => <MediaCard key={i} loading />)
            : paginated.map((item, index) => (
                <MediaCard
                  key={`${item?.mal_id}-${index}`}
                  item={item}
                  {...scheduleCardProps}
                />
              ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4">

            <button
              className="schedule-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} style={{ color: "var(--color-border)", padding: "0 4px" }}>…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`schedule-page-btn ${page === p ? "active" : ""}`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              className="schedule-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>

          </div>
        )}

      </Container>
    </div>
  );
};

export default ScheduleSection;