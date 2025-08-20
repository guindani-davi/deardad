"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Frontend to Backend Connection</h1>

        <div className={styles.dataContainer}>
          <h2>Data from Backend:</h2>
          {loading && <p>Loading...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {data && <p className={styles.data}>{data}</p>}
        </div>
      </main>
    </div>
  );
}
