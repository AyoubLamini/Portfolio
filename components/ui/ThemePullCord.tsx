"use client";

import { motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemePullCord() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleDragEnd = (event: any, info: any) => {
    // Shorter drag threshold
    if (info.offset.y > 10) {
      setTheme(isDark ? "light" : "dark");
      controls.start({
        y: [info.offset.y, -3, 1, 0],
        transition: { duration: 0.4, type: "spring", bounce: 0.7 }
      });
    } else {
      controls.start({ y: 0, transition: { type: "spring", bounce: 0.5 } });
    }
  };

  return (
    <div 
      className={"hidden md:flex fixed right-6 md:right-12 z-50 flex-col items-center w-16 pointer-events-none transition-all duration-300 " + (scrolled ? "top-[60px]" : "top-0")}
    >
      
      {/* Ceiling mounting plate */}
      <div className="w-5 h-1 bg-neutral-surface border-x border-b border-neutral-border rounded-b-sm shadow-sm" />
      
      {/* Hanging wire */}
      <div className="w-[1.5px] h-10 bg-neutral-border shadow-sm" />
      
      {/* Lamp Shade & Bulb */}
      <div className="relative z-10 pointer-events-auto">
        <svg width="56" height="36" viewBox="0 0 80 52" className="drop-shadow-md overflow-visible">
           {/* Glow effect when light is on */}
           {!isDark && (
             <circle cx="40" cy="46" r="16" className="fill-primary/20 blur-md" />
           )}
           
           {/* Bulb */}
           <circle cx="40" cy="46" r="6" className={isDark ? "fill-neutral-border" : "fill-primary"} />

           {/* Hardware attachment */}
           <rect x="36" y="0" width="8" height="6" rx="1" className="fill-neutral-surface stroke-neutral-border" strokeWidth="2" />
           
           {/* Shade Body */}
           <path 
             d="M 22 6 L 58 6 L 74 46 L 6 46 Z" 
             className="fill-neutral-surface stroke-neutral-border transition-colors duration-300" 
             strokeWidth="4" 
             strokeLinejoin="round" 
           />
        </svg>
      </div>
      
      {/* Pull Chain (Draggable) */}
      <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.15 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileDrag={{ cursor: "grabbing" }}
          className="cursor-grab relative -mt-0.5 z-0 flex flex-col items-center p-2 pointer-events-auto"
          style={{ originY: 0 }}
      >
        {/* Metallic ball chain */}
        <div className="flex flex-col items-center gap-[1px] opacity-60">
           {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-neutral-ink shadow-sm" />
           ))}
        </div>
        {/* Chain Bell / Knob */}
        <div className="w-2 h-3 rounded-b-sm rounded-t-full bg-neutral-surface border border-neutral-border shadow-sm mt-[1px]" />
      </motion.div>

    </div>
  );
}
