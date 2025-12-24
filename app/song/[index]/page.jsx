"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MusicPlayerCard from "../../components/MusicPlayerCard";

export default function SongPage() {
  const { index } = useParams();
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const idx = Number(index);

  useEffect(() => {
    fetch("http://localhost:8080/songs")
      .then((r) => r.json())
      .then((d) => setSongs(d.songs || []))
      .catch(() => setSongs([]));
  }, []);

  if (!songs.length) return <div className="p-6">Loading...</div>;
  if (isNaN(idx) || idx < 0 || idx >= songs.length) return <div className="p-6">Song not found</div>;

  const song = songs[idx];

  const goNext = () => {
    const nextIndex = idx + 1 < songs.length ? idx + 1 : 0;
    router.push(`/song/${nextIndex}`);
  };

  const goPrev = () => {
    const prevIndex = idx - 1 >= 0 ? idx - 1 : songs.length - 1;
    router.push(`/song/${prevIndex}`);
  };

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="text-sm hover:text-slate-900 cursor-pointer text-slate-600 mb-4">
        ← Back
      </button>

      <MusicPlayerCard
        songName={song.title}
        singer={song.singer}
        imageUrl={song.imageUrl}
        lyricsLines={song.lyrics}
        onNext={goNext}
        onPrev={goPrev}
      />
    </div>
  );
}
