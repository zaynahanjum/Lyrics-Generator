import { useState } from "react";

export default function MusicPlayerCard() {
  const [current, setCurrent] = useState(225);
  const [isPlaying, setIsPlaying] = useState(false);

  const total = 245;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const lyrics = `
 Teri meri gallan ho gayi mash-hoor
Kar na kabhi tu mujhe nazron se door
Kithe chaliye tu kithe chaliye
Tu kithe chaliye kithe chaliye

Jaan'da ae dil yeh to jaandi ae tu
Tere bina main na rahun mere bina tu
Kithe chaliye tu kithe chaliye
Tu kithe chaliye chal chaliye

Kaatun kaise raataan oh sawre
Jiya nahi jaata sun bawre

Ke raataan lambiyan re
Kate tere sangeya sangeya re
Ke raataan lambiyan re
Kate tere sangeya sangeya re

Cham cham cham ambran de taare
Kehnde ne sajna
Tu hi chann mere is dil da
Mann lai ve sajna
  `;

  return (
    <div className="w-full flex justify-center ">
     
      <div className={`flex items-start ${isPlaying ? "gap-8" : ""}`}>
        
        
        <div className="w-[350px] flex-shrink-0 rounded-xl bg-neutral-900 p-4 text-white shadow-lg">
          
         
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-800">
            <img
              src="/image.png"
              alt="Album Art"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-semibold font-spotify">SONG TITLE</h1>
            <p className="mt-1 text-sm text-neutral-400 font-spotify">Singer</p>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={total}
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-400">
              <span>{formatTime(current)}</span>
              <span>{formatTime(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-full p-2 hover:bg-neutral-800"><i className="fa-solid fa-heart"></i>
</button>

            <button className="rounded-full p-2 hover:bg-neutral-800"><i class="fa-solid fa-backward-step"></i>
</button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full bg-green-500 p-5 h-6 w-6 text-black flex  items-center justify-center "
            >
                {isPlaying ? (
        <i className="fa-solid fa-pause"></i>  
      ) : (
        <i className="fa-solid fa-play"></i>    
      )}
            </button>

            <button className="rounded-full p-2 hover:bg-neutral-800"><i class="fa-solid fa-forward-step"></i>
</button>

            <button className="rounded-full p-2 hover:bg-neutral-800"><i class="fa-solid fa-star"></i>
</button>
          </div>
        </div>

      {isPlaying && (
  <div className="w-[350px] h-[100%] flex-shrink-0 rounded-2xl bg-[#1A1A1A] p-6 text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
    

    <h2 className="text-[30px] font-semibold tracking-wide opacity-90">
      Lyrics
    </h2>

   
    <div
      className="
        mt-4 
        h-[340px] 
        overflow-y-auto 
        whitespace-pre-line 
        text-[1.05rem] 
        leading-relaxed 
        text-white/90
        font-medium
      "
    >
      {lyrics}
    </div>

  </div>
)}


      </div>
    </div>
  );
}
