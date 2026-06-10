"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, Leaf } from "lucide-react";

export default function GlobalElements() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted/active
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. SPLASH SCREEN DURATION CONTROL
  // Initial load: 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitial(false);
    }, 1500); // 1.5s for first load
    return () => clearTimeout(timer);
  }, []);

  // Subsequent route transitions: 0.28 seconds
  useEffect(() => {
    if (isInitial) return; // Skip initial load trigger

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280); // 0.28s for page transitions
    return () => clearTimeout(timer);
  }, [pathname, isInitial]);

  // 2. BACKGROUND MUSIC SYSTEM
  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.30; // Ambient volume set to 30%
    audio.currentTime = 0.0; // Start playing from the very beginning
    audioRef.current = audio;

    let unmutedPlayed = false;

    const playAudio = () => {
      // Try playing unmuted first
      audio.muted = false;
      audio.play()
        .then(() => {
          setIsMuted(false);
          unmutedPlayed = true;
          cleanupListeners();
        })
        .catch(() => {
          // If blocked, try playing muted (which is usually allowed by browsers)
          audio.muted = true;
          audio.play()
            .then(() => {
              setIsMuted(true);
            })
            .catch((err) => {
              console.log("Both unmuted and muted autoplay blocked:", err);
            });
        });
    };

    const handleUserInteraction = () => {
      if (audioRef.current && !unmutedPlayed) {
        audioRef.current.muted = false;
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            unmutedPlayed = true;
            cleanupListeners();
          })
          .catch((err) => console.log("Play failed on user interaction:", err));
      }
    };

    const cleanupListeners = () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    // Attempt playback immediately on load
    playAudio();

    // Event listeners to handle autoplay block bypass on first interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      audio.pause();
      cleanupListeners();
    };
  }, []); // Run exactly once on mount

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !audioRef.current.muted;
      audioRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      
      if (!newMuteState) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <>
      {/* Self-contained CSS animations */}
      <style>{`
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-wave-1 { animation: soundWave 0.8s infinite ease-in-out; }
        .animate-wave-2 { animation: soundWave 0.5s infinite ease-in-out 0.15s; }
        .animate-wave-3 { animation: soundWave 0.7s infinite ease-in-out 0.3s; }
        .animate-wave-4 { animation: soundWave 0.6s infinite ease-in-out 0.1s; }
        
        @keyframes reverseSpin {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverseSpin 4s linear infinite;
        }

        @keyframes bounceDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        .animate-bounce-dot-1 { animation: bounceDot 0.8s infinite ease-in-out 0s; }
        .animate-bounce-dot-2 { animation: bounceDot 0.8s infinite ease-in-out 0.15s; }
        .animate-bounce-dot-3 { animation: bounceDot 0.8s infinite ease-in-out 0.3s; }
      `}</style>

      {/* A. DYNAMIC SPLASH SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 z-[99999] bg-gradient-to-tr from-[#fbfdfa] via-[#f5fbf2] to-[#edf7e8] flex flex-col items-center justify-center transition-all duration-300 ease-out select-none">
          {/* Glowing background ambient blur */}
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-3xl animate-pulse" />
          
          <div className="relative flex flex-col items-center z-10">
            {/* Spinning Brand Leaf Container */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-md animate-ping" style={{ animationDuration: '3s' }} />
              
              {/* Rotating outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/25 animate-spin" style={{ animationDuration: '8s' }} />
              
              {/* Reverse rotating inner ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-secondary/20 animate-reverse-spin" style={{ animationDuration: '6s' }} />

              {/* Center Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Leaf className="w-5 h-5 fill-current animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
            </div>
            
            {/* Brand Title */}
            <div className="text-center mt-6 space-y-2">
              <h1 className="text-2xl font-bold tracking-[0.2em] text-text-primary uppercase font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Siam Diet
              </h1>
              {/* Bouncing Dots Loader */}
              <div className="flex items-center justify-center space-x-1.5 pt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce-dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce-dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce-dot-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. COMPACT FLOATING MUSIC PLAYER */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center space-x-3 bg-white/80 backdrop-blur-md border border-accent/40 py-2 px-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] group hover:scale-[1.04] transition-all duration-300">
        
        {/* Sound Wave Visualizer */}
        <div className="flex items-end space-x-0.5 h-4 w-5 justify-center">
          <div className={`w-0.5 bg-primary rounded-full transition-all duration-300 ${!isMuted ? "animate-wave-1" : "h-1"}`} />
          <div className={`w-0.5 bg-primary rounded-full transition-all duration-300 ${!isMuted ? "animate-wave-2" : "h-1"}`} />
          <div className={`w-0.5 bg-primary rounded-full transition-all duration-300 ${!isMuted ? "animate-wave-3" : "h-1"}`} />
          <div className={`w-0.5 bg-primary rounded-full transition-all duration-300 ${!isMuted ? "animate-wave-4" : "h-1"}`} />
        </div>

        {/* Mute Toggle Button */}
        <button
          onClick={toggleMute}
          className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-200"
          title={isMuted ? "Musiqini Qoş" : "Musiqini Səssiz Et"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Tooltip Label */}
        <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out pointer-events-none">
          <span className="text-[10px] text-text-secondary whitespace-nowrap font-medium pr-1 select-none">
            {isMuted ? "Səssiz" : "Musiqi Açıq"}
          </span>
        </div>
      </div>
    </>
  );
}
