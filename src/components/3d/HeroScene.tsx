"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, ShieldCheck, Sparkles, Leaf } from "lucide-react";

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 min-h-[500px]">
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        
        {/* 1. Ambient Background Glow matching the natural green palette */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] scale-90 animate-pulse" />

        {/* 2. Interactive Outer Rotating Dial (Premium SVG scale/dial) */}
        <div className="absolute inset-0 animate-[spin_50s_linear_infinite] opacity-60 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary/20">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5 2 5" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* 3. Ceramic Plate Circle Container (Masked Video) */}
        <div className="relative w-[82%] h-[82%] rounded-full p-2 bg-gradient-to-tr from-accent/80 via-white to-primary/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border-4 border-white/60 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.03] group overflow-hidden">
          
          {/* Internal shadow inner rim */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_8px_24px_rgba(0,0,0,0.12)] border border-black/5 z-10 pointer-events-none" />

          {/* Masked Video Wrapper */}
          <div className="w-full h-full rounded-full overflow-hidden relative bg-accent/20">
            <video
              ref={videoRef}
              src="/food-video.mp4"
              loop
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.08] group-hover:scale-[1.12] transition-transform duration-700 ease-out"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-0 pointer-events-none" />
          </div>

          {/* 4. Glassmorphic Video Controls overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 bg-white/70 backdrop-blur-md border border-white/80 py-2.5 px-5 rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-accent/40 text-text-primary transition-colors duration-200"
              title={isPlaying ? "Durdur" : "Oynat"}
            >
              {isPlaying ? <span className="w-3 h-3 block bg-text-primary rounded-sm" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <span className="w-px h-4 bg-text-secondary/20" />
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-accent/40 text-text-primary transition-colors duration-200"
              title={isMuted ? "Səsi Aç" : "Səsi Kəs"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 5. Dynamic Floating Badge Tags around the circle */}
        {/* Top-Left: Green Organic Tag */}
        <div className="absolute top-[8%] left-[2%] z-20 bg-white/90 backdrop-blur-md border border-primary/20 py-2.5 px-4 rounded-2xl flex items-center space-x-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] animate-[bounce_5s_infinite_ease-in-out]">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Leaf className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Təbii Tərkib</div>
            <div className="text-xs font-semibold text-text-primary">100% Təzə Qidalar</div>
          </div>
        </div>

        {/* Top-Right: Diyetoloq Certified Tag */}
        <div className="absolute top-[18%] right-[-5%] z-20 bg-white/90 backdrop-blur-md border border-accent/40 py-2.5 px-4 rounded-2xl flex items-center space-x-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] animate-[bounce_6s_infinite_ease-in-out_1s]">
          <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-dark">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Zəmanət</div>
            <div className="text-xs font-semibold text-text-primary">Diyetoloq Təsdiqli</div>
          </div>
        </div>

        {/* Bottom-Left: Calorie Balanced Tag */}
        <div className="absolute bottom-[10%] left-[-2%] z-20 bg-white/90 backdrop-blur-md border border-accent/40 py-2.5 px-4 rounded-2xl flex items-center space-x-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] animate-[bounce_5.5s_infinite_ease-in-out_0.5s]">
          <div className="w-7 h-7 rounded-full bg-warm-accent/30 flex items-center justify-center text-amber-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Kalori Nəzarəti</div>
            <div className="text-xs font-semibold text-text-primary">Balanslaşdırılmış Makro</div>
          </div>
        </div>
      </div>
    </div>
  );
}
