"use client";

import { useEffect, useState } from "react";
import MusicPlayerCard from "./MusicPlayerCard/page";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSongs() {
      try {
        const res = await fetch("http://localhost:8080/songs");

        if (!res.ok) throw new Error("Backend not responding");

        const data = await res.json();
        setSongs(data.songs);
      } catch (err) {
        setError("Could not load songs: " + err.message);
      }
    }

    loadSongs();
  }, []);

  if (songs.length === 0) return <div>Loading...</div>;

  const goToNext = () => {
    setCurrentSongIndex((prev) =>
      prev + 1 < songs.length ? prev + 1 : 0
    );
  };

  const goToPrev = () => {
    setCurrentSongIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : songs.length - 1
    );
  };

  const song = songs[currentSongIndex];

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-white font-spotify flex flex-col items-center">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <header className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">LyricStream</h1>
        <p className="mt-2 text-lg text-neutral-400">
          Play songs and watch lyrics flow in perfect sync
        </p>
      </header>

      <MusicPlayerCard
        key={currentSongIndex}
        imageUrl={song.imageUrl}
        lyricsLines={song.lyrics}
        songName={song.title}
        singer={song.singer}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </div>
  );
}
