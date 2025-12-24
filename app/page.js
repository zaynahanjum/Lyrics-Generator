"use client";

import { useEffect, useMemo, useState } from "react";
import SongCard from "./components/SongCard";
import Link from "next/link";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/songs")
      .then((r) => r.json())
      .then((data) => setSongs(data.songs || []))
      .catch(() => setSongs([]));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.singer.toLowerCase().includes(q)
    );
  }, [songs, search]);

  return (
    <main className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">LyricStream</h1>
          <p className="text-sm text-slate-600 mt-1">
            Play songs and watch lyrics flow in perfect sync
          </p>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/liked" className="text-slate-700 hover:text-slate-900">
            <i className="fa-solid fa-heart mr-2 text-red-500"></i>Liked
          </Link>
        </nav>
      </header>

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by song or singer..."
          className="w-full rounded-lg border border-slate-200 p-3 focus:ring-2 focus:ring-green-400"
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((song, i) => (
          <SongCard key={i} song={song} index={i} />
        ))}
      </section>
    </main>
  );
}
