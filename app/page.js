"use client";
import MusicPlayerCard from "./MusicPlayerCard/page";


import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function sayHello() {
    const queryName = name || "World";

    try {
      const res = await fetch(
        `http://localhost:8080/hello?name=${encodeURIComponent(queryName)}`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>


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

 
  <MusicPlayerCard />
</div>

  );
}
