import axios from "axios";

const api = {
  url: "https://api.rawg.io/api/",
  key: import.meta.env.VITE_RAWG_API_KEY,
};

const cachedRequests = JSON.parse(
  localStorage.getItem("cachedRequests") || "{}"
);

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
  const endPointAndParams = `${endPoint}?${searchParams}`;

  if (cachedRequests[endPointAndParams])
    return cachedRequests[endPointAndParams] as Promise<T>;
  const res = await axios.get(`${api.url}${endPointAndParams}&key=${api.key}`);
  if (!res.data) throw new Error(res.statusText);
  cachedRequests[endPointAndParams] = res.data;
  localStorage.setItem("cachedRequests", JSON.stringify(cachedRequests));
  return res.data;
}

export type { ResponseSchema };
export { get };
