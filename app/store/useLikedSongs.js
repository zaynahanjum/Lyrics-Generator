"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLikedSongs = create(
    persist(
        (set, get) => ({
            likedSongs: [],

            likeSong: (song) =>
                set((state) => {
                    if (state.likedSongs.some((s) => s.title === song.title)) {
                        return state;
                    }
                    return { likedSongs: [...state.likedSongs, song] };
                }),


            unlikeSong: (title) =>
                set((state) => ({
                    likedSongs: state.likedSongs.filter(
                        (s) => s.title !== title
                    ),
                })),

            isLiked: (title) =>
                get().likedSongs.some((s) => s.title === title),
        }),
        {
            name: "liked-songs",
        }
    )
);
