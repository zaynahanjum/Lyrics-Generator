import "./globals.css";

export const metadata = {
  title: "LyricStream",
  description: "Play songs and watch lyrics flow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="antialiased bg-white text-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
