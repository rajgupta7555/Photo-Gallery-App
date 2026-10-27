import { useEffect, useState } from "react";

const API_URL = "https://picsum.photos/v2/list?page=1&limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Photos load nahi ho paayi.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid photo data received.");
        }

        
        setPhotos(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message || "Photos load nahi ho paayi.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}