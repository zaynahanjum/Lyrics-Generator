"use client";

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crow + Next.js</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #999",
          borderRadius: "6px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={sayHello}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Say Hello
      </button>

      <h2 style={{ marginTop: "20px" }}>{message}</h2>
    </div>
  );
}
