import axios from "../lib/axios";

// Placeholder netral bila artikel tidak punya cover image.
export const FALLBACK_NEWS_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%25' height='100%25' fill='%23e5e7eb'/></svg>";

export async function fetchArticles() {
  const { data } = await axios.get("/api/articles");
  return data.data ?? [];
}

export async function fetchArticle(slug) {
  const { data } = await axios.get(`/api/articles/${slug}`);
  return data.data ?? null;
}
