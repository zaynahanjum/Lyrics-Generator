"use client";

import { useRouter } from "next/navigation";
import { useLikedSongs } from "../store/useLikedSongs";

export default function SongCard({ song, index }) {
    const router = useRouter();
    const { likeSong, unlikeSong, isLiked } = useLikedSongs();
    const liked = isLiked(song.title);

    const toggleLike = (e) => {
        e.stopPropagation(); 
        liked ? unlikeSong(song.title) : likeSong(song);
    };

    return (
        <div
            onClick={() => router.push(`/song/${index}`)}
            className="cursor-pointer rounded-xl border border-slate-100 bg-white shadow-sm p-4 hover:shadow-md transition"
        >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
                <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold leading-snug">{song.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{song.singer}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={toggleLike}
                        aria-label={liked ? "Unlike" : "Like"}
                        className="rounded-full p-2 hover:bg-slate-100"
                        title={liked ? "Unlike" : "Like"}
                    >
                        <i
                            className={
                                liked ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart text-slate-500"
                            }
                        />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/song/${index}`); }}
                        className="text-xs text-slate-600 hover:text-slate-900"
                    >
                        Play →
                    </button>
                </div>
            </div>
        </div>
    );
}
