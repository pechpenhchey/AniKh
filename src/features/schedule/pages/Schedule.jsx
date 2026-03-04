import React from "react";
import useScheduleData from "../components/useScheduleData";
import ScheduleSection from "../components/ScheduleSection";

const Schedule = () => {
  const { schedule, loading, activeDay, handleDayChange } = useScheduleData();

  return (
    <div>
      <ScheduleSection
        schedule={schedule}
        loading={loading}
        activeDay={activeDay}
        onDayChange={handleDayChange}
      />
    </div>
  );
};

export default Schedule;