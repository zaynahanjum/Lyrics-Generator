"use client";

import { useEffect, useState } from "react";
import MusicPlayerCard from "./MusicPlayerCard/page";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  // Fetch songs on page load
  useEffect(() => {
    async function loadSongs() {
      try {
        const res = await fetch("http://localhost:8080/songs", {
          method: "GET",
          mode: "cors",
        });

        if (!res.ok) throw new Error("Backend not responding");

        const data = await res.json();
        console.log(data.songs)
        setSongs(data.songs); // store songs
      } catch (err) {
        setError("Could not load songs: " + err.message);
      }
    }

    loadSongs();
  }, []);


  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-white font-spotify flex flex-col items-center">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <header className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          LyricStream
        </h1>
        <p className="mt-2 text-lg text-neutral-400 ">
          Play songs and watch lyrics flow in perfect sync
        </p>
      </header>

    {
      songs.map((song, index) => {
        return <MusicPlayerCard key={index} imageUrl={song.imageUrl} lyricsLines={song.lyrics} songName={song.title} singer={song.singer}/>
      })
    }
    </div>

  );
}
