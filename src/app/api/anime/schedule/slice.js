import { create } from "zustand";
import { fetchSchedule } from "./action";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const getTodayKey = () => DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

export const useScheduleStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  activeDay: getTodayKey(),

  setActiveDay: (day) => set({ activeDay: day }),
  getSchedule: (day) => fetchSchedule(set, day),
}));