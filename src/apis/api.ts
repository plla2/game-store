import axios from "axios";

const api = {
  url: "https://api.rawg.io/api/",
  key: "1d2b5d761b684c5da2d5e4ee96fd0092",
};

interface ResponseSchema<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

async function get<T>(
  endPoint: string,
  params?: Record<string, string>
): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const res = await axios.get(
    `${api.url}${endPoint}?${searchParams}&key=${api.key}`
  );
  if (!res.data) throw new Error(res.statusText);
  return res.data;
}

export type { ResponseSchema };
export { get };
