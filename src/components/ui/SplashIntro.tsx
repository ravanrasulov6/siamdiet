"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Leaf } from "lucide-react";

export default function SplashIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the splash during this session
    const hasSeenSplash = sessionStorage.getItem("siam_diet_splash_seen");
    if (hasSeenSplash === "true") {
      setIsVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("siam_diet_splash_seen", "true");
        setIsVisible(false);
      },
    });

    // Reset components to initial hidden state
    gsap.set(iconRef.current, { opacity: 0, scale: 0.5, rotate: -45 });
    gsap.set(logoRef.current, { opacity: 0, y: 20 });
    gsap.set(subtextRef.current, { opacity: 0, y: 10 });

    // Choreographed intro animation
    tl.to(iconRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.0,
      ease: "back.out(1.7)",
    })
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        subtextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Gentle floating/pulse effect in place
      .to([iconRef.current, logoRef.current], {
        y: -6,
        duration: 1.2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      })
      // Elegant exit slide up and fade
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      });
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#F8FBF6] z-[99999] flex flex-col justify-center items-center text-center px-6 select-none"
    >
      {/* Decorative organic background blur */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[120px] -bottom-20 -right-20 animate-pulse" />

      <div className="relative flex flex-col items-center space-y-6 z-10">
        {/* Animated Brand Icon */}
        <div
          ref={iconRef}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xl shadow-primary/20"
        >
          <Leaf className="w-7 h-7 fill-current" />
        </div>

        {/* Brand Text */}
        <div className="space-y-3">
          <h1
            ref={logoRef}
            className="font-display font-extrabold text-5xl md:text-7xl tracking-[0.2em] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase"
          >
            SIAM DIET
          </h1>
          <p
            ref={subtextRef}
            className="font-sans text-text-secondary text-xs md:text-sm font-semibold tracking-[0.3em] uppercase"
          >
            Təbiətin gücü. Elmin dəqiqliyi.
          </p>
        </div>
      </div>
    </div>
  );
}
