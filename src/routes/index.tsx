import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { profile } from "@/config/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: profile.username },
      { name: "description", content: profile.bio },
      { property: "og:title", content: profile.username },
      { property: "og:description", content: profile.bio },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const background = useMemo(() => {
    if (!profile.backgrounds.length) return null;
    return profile.backgrounds[Math.floor(Math.random() * profile.backgrounds.length)];
  }, []);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (entered) return;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background */}
      {background && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${background})`,
            opacity: entered ? 0.55 : 0.15,
            filter: entered ? "blur(0px)" : "blur(8px)",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />

      <audio ref={audioRef} src={profile.song} loop preload="auto" />

      {/* Enter overlay */}
      {!entered && (
        <button
          onClick={handleEnter}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 cursor-pointer group"
          aria-label="Enter site"
        >
          <span className="text-white/80 text-2xl tracking-[0.4em] uppercase font-light group-hover:tracking-[0.55em] group-hover:text-white transition-all duration-500 animate-pulse">
            [ click to enter ]
          </span>
        </button>
      )}

      {/* Content */}
      <div
        className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-all duration-700 ${
          entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <ProfileCard />
      </div>
    </main>
  );
}
