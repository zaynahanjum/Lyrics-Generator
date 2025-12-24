"use client";

import { useEffect, useState } from "react";

export default function MusicPlayerCard({
  lyricsLines = [],
  songName,
  singer,
  imageUrl,
  onNext = () => {},
  onPrev = () => {},
}) {
  const [displayedLyrics, setDisplayedLyrics] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const total = 245; 

  const lyrics = Array.isArray(lyricsLines) ? lyricsLines.join(" ") : "";
  useEffect(() => {
    setDisplayedLyrics("");
    setWordIndex(0);
    setCurrent(0);
    setIsPlaying(false);
  }, [lyricsLines, songName]);

  useEffect(() => {
    if (!isPlaying) return;
    if (!lyrics) return;

    const words = lyrics.split(/\s+/).filter(Boolean);
    if (wordIndex >= words.length) return;

    const interval = setInterval(() => {
      setDisplayedLyrics((prev) => prev + (words[wordIndex] || "") + " ");
      setWordIndex((i) => i + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying, wordIndex, lyrics]);

  useEffect(() => {
    if (!isPlaying) return;

    const iv = setInterval(() => {
      setCurrent((c) => {
        if (c >= total) {
          onNext();
          return 0;
        }
        return c + 1;
      });
    }, 1000);

    return () => clearInterval(iv);
  }, [isPlaying, onNext]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full flex justify-center p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-[360px] bg-white border border-slate-100 rounded-xl p-4 shadow">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
            <img src={imageUrl} alt="Album Art" className="h-full w-full object-cover" />
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-semibold">{songName}</h1>
            <p className="mt-1 text-sm text-slate-500">{singer}</p>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={total}
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>{formatTime(current)}</span>
              <span>{formatTime(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-around">
            <button
              onClick={() => onPrev()}
              className="rounded-full p-3 hover:bg-slate-50 border border-slate-100"
              title="Previous"
            >
              <i className="fa-solid fa-backward-step fa-lg"></i>
            </button>

            <button
              onClick={() => {
                setIsPlaying((p) => {
                  const starting = !p;
                  if (starting) {
                    setDisplayedLyrics("");
                    setWordIndex(0);
                    setCurrent(0);
                  }
                  return starting;
                });
              }}
              className="rounded-full bg-green-500 p-4 text-white shadow-lg"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
            </button>

            <button
              onClick={() => onNext()}
              className="rounded-full p-3 hover:bg-slate-50 border border-slate-100"
              title="Next"
            >
              <i className="fa-solid fa-forward-step fa-lg"></i>
            </button>
          </div>
        </div>

        <div className="w-[520px] bg-white border border-slate-100 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold tracking-wide text-slate-800">Lyrics</h2>

          <div className="mt-4 h-[340px] overflow-y-auto whitespace-pre-line text-[1.05rem] leading-relaxed text-slate-700">
            {displayedLyrics || (isPlaying ? "Loading..." : "Press play to show live lyrics...")}
          </div>
        </div>
      </div>
    </div>
  );
}
