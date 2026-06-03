import axios from "../lib/axios";

export async function fetchEvents() {
  const { data } = await axios.get("/api/events");
  return data.data ?? [];
}
