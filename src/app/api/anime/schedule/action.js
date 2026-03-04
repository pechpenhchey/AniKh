import { getSchedule } from "../core/request";

export const fetchSchedule = async (set, day) => {
  set({ loading: true, error: null });
  try {
    const res = await getSchedule(day);
    set({ data: res.data.data, loading: false });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
};