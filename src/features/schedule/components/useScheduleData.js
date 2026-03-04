import { useEffect } from "react";
import { useScheduleStore } from "../../../app/api/anime/schedule/slice";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const getTodayKey = () => {
  const day = new Date().getDay();
  return DAYS[day === 0 ? 6 : day - 1];
};

const useScheduleData = () => {
  const { data: schedule, loading, activeDay, setActiveDay, getSchedule } = useScheduleStore();

  useEffect(() => {
    getSchedule(getTodayKey());
  }, []);

  const handleDayChange = (day) => {
    setActiveDay(day);
    getSchedule(day);
  };

  return { schedule, loading, activeDay, handleDayChange };
};

export default useScheduleData;