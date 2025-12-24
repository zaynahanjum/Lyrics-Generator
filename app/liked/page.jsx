"use client";

import { useLikedSongs } from "../store/useLikedSongs";
import SongCard from "../components/SongCard";
import { useRouter} from "next/navigation"

export default function LikedPage() {
    const router = useRouter()
    const { likedSongs } = useLikedSongs();

    return (
        <div className="min-h-screen bg-white p-6 text-black">
        <button onClick={() => router.back()} className="text-sm hover:text-slate-900 cursor-pointer text-slate-600 mb-4">
        ← Back
      </button>
            <h1 className="text-3xl font-bold mb-6">Liked Songs</h1>

            {likedSongs.length === 0 && (
                <p className="text-neutral-400">No liked songs yet</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {likedSongs.map((song, i) => (
                    <div key={i}>
                        <SongCard key={i} song={song} index={i} />

                    </div>
                ))}
            </div>
        </div>
    );
}
