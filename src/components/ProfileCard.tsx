import { useEffect, useState } from "react";
import { User, Eye } from "lucide-react";
import { SiDiscord, SiInstagram, SiX, SiLetterboxd } from "@icons-pack/react-simple-icons";
import { profile } from "@/config/profile";

const socialMeta = [
  { key: "twitter", Icon: SiX, label: "Twitter" },
  { key: "instagram", Icon: SiInstagram, label: "Instagram" },
  { key: "discord", Icon: SiDiscord, label: "Discord" },
  { key: "letterboxd", Icon: SiLetterboxd, label: "Letterboxd" },
] as const;

export function ProfileCard() {
  const [views, setViews] = useState(profile.views);
  useEffect(() => {
    setViews((v) => v + 1);
  }, []);

  const activeSocials = socialMeta.filter(
    (s) => profile.socials[s.key as keyof typeof profile.socials]
  );

  return (
    <div className="w-[min(640px,92vw)] rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl p-7 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.username} className="h-full w-full object-cover" />
          ) : (
            <User className="h-10 w-10 text-white/70" />
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            {profile.username}
          </h1>
          <p className="text-sm text-white/80 mt-1 font-medium">{profile.bio}</p>
          <p className="text-xs text-white/40 mt-1">{profile.tagline}</p>
        </div>
      </div>

      {/* Socials */}
      {activeSocials.length > 0 && (
        <div className="mt-7 flex items-center justify-center gap-5 flex-wrap">
          {activeSocials.map(({ key, Icon, label }) => (
            <a
              key={key}
              href={profile.socials[key as keyof typeof profile.socials]}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-white/70 hover:text-white transition-colors hover:scale-110 duration-200"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      )}

      {/* Views */}
      <div className="mt-6 flex items-center gap-1.5 text-white/40 text-xs">
        <Eye className="h-3.5 w-3.5" />
        <span>{views.toLocaleString()}</span>
      </div>
    </div>
  );
}
