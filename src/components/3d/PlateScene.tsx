"use client";

import { useRef, useEffect } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Sparkles, UtensilsCrossed, Leaf,Flame } from "lucide-react";

export default function PlateScene() {
  const { protein, carb, vegetable } = useConfiguratorStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Total macros calculation for display on the interactive plate dashboard
  const totalCalories = (protein.calories || 0) + (carb.calories || 0) + (vegetable.calories || 0);
  const totalProtein = (protein.protein || 0) + (carb.protein || 0) + (vegetable.protein || 0);
  const totalCarbs = (carb.carbs || 0) + (protein.carbs || 0) + (vegetable.carbs || 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 min-h-[500px]">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        
        {/* 1. Ambient Pulsing Background Glow */}
        <div className="absolute inset-0 bg-primary/15 rounded-full blur-[50px] scale-90 animate-pulse" />

        {/* 2. Rotating Dash Scale (SVG circular HUD dial) */}
        <div className="absolute inset-0 animate-[spin_60s_linear_infinite] opacity-50 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary/30">
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="87" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="15 8" />
          </svg>
        </div>

        {/* 3. Ceramic Plate Video Container */}
        <div className="relative w-[78%] h-[78%] rounded-full p-2 bg-gradient-to-tr from-accent/60 via-white to-primary/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] border-4 border-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] overflow-hidden">
          
          {/* Inner shadow overlay for dish depth */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_20px_rgba(0,0,0,0.1)] border border-black/5 z-10 pointer-events-none" />

          {/* Masked Video Wrapper */}
          <div className="w-full h-full rounded-full overflow-hidden relative bg-accent/10">
            <video
              ref={videoRef}
              src="/food-video.mp4"
              loop
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.1] hover:scale-[1.15] transition-transform duration-700 ease-out"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 z-0 pointer-events-none" />
          </div>

          {/* Center Plate HUD info overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center bg-black/40 text-white backdrop-blur-sm border border-white/10 w-24 h-24 rounded-full shadow-inner pointer-events-none">
            <Flame className="w-5 h-5 text-secondary animate-bounce" />
            <span className="text-[14px] font-bold mt-1">{totalCalories}</span>
            <span className="text-[9px] uppercase tracking-wider opacity-85">Kkal</span>
          </div>
        </div>

        {/* 4. Connected Ingredient Badges (Dynamic HUD) */}
        
        {/* Left Side: Selected Protein */}
        <div className="absolute left-[-15px] top-[40%] z-20 bg-white/95 backdrop-blur-md border border-primary/20 p-3 rounded-2xl flex items-center space-x-3 shadow-md w-44 transition-all duration-300 transform translate-x-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-[9px] text-text-secondary uppercase tracking-wider font-bold">Protein</div>
            <div className="text-xs font-bold text-text-primary truncate">{protein.name}</div>
            <div className="text-[10px] text-primary font-medium">{protein.protein}g zülal</div>
          </div>
        </div>

        {/* Right Side: Selected Carb */}
        <div className="absolute right-[-15px] top-[30%] z-20 bg-white/95 backdrop-blur-md border border-accent/40 p-3 rounded-2xl flex items-center space-x-3 shadow-md w-44 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-warm-accent/30 flex items-center justify-center text-amber-700 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-[9px] text-text-secondary uppercase tracking-wider font-bold">Karbohidrat</div>
            <div className="text-xs font-bold text-text-primary truncate">{carb.name}</div>
            <div className="text-[10px] text-amber-700 font-medium">{carb.carbs}g karb</div>
          </div>
        </div>

        {/* Bottom/Right: Selected Vegetable */}
        <div className="absolute right-[-10px] bottom-[15%] z-20 bg-white/95 backdrop-blur-md border border-accent/40 p-3 rounded-2xl flex items-center space-x-3 shadow-md w-44 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-dark shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-[9px] text-text-secondary uppercase tracking-wider font-bold">Tərəvəz</div>
            <div className="text-xs font-bold text-text-primary truncate">{vegetable.name}</div>
            <div className="text-[10px] text-secondary-dark font-medium">{vegetable.calories} kkal</div>
          </div>
        </div>
      </div>

      {/* Mini details summary block below the video */}
      <div className="mt-6 bg-white/80 border border-accent/30 rounded-2xl py-3 px-6 shadow-sm flex items-center space-x-6 text-xs text-text-secondary">
        <div>
          Protein: <span className="font-semibold text-text-primary">{totalProtein}g</span>
        </div>
        <div className="w-px h-4 bg-text-secondary/25" />
        <div>
          Karbohidrat: <span className="font-semibold text-text-primary">{totalCarbs}g</span>
        </div>
        <div className="w-px h-4 bg-text-secondary/25" />
        <div>
          Mənbə: <span className="font-semibold text-primary">Təbii Balans</span>
        </div>
      </div>
    </div>
  );
}
