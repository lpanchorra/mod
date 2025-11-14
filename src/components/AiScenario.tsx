"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

type Place = "studio" | "forest" | "ocean" | "city" | "library" | "space" | "surprise";
type Mood = "focus" | "calm" | "energetic" | "creative" | "minimal";

interface AiScenarioProps {
  place?: Place;
  mood?: Mood;
  motion?: "none" | "subtle" | "medium";
  audioEnabled?: boolean;
}

const sceneColors = {
  studio: { from: "#1a1a1a", to: "#2d2d2d", accent: "#4a4a4a" },
  forest: { from: "#0d1f0d", to: "#1a2e1a", accent: "#2d4a2d" },
  ocean: { from: "#0a1628", to: "#162d4a", accent: "#1e3a5f" },
  city: { from: "#1a1028", to: "#2d1a3d", accent: "#4a2d5f" },
  library: { from: "#1a1410", to: "#2d2418", accent: "#4a3d28" },
  space: { from: "#0a0a14", to: "#14141e", accent: "#1e1e32" },
  surprise: { from: "#140a1a", to: "#281432", accent: "#3d1e4a" },
};

export function AiScenario({
  place = "studio",
  mood = "focus",
  motion: motionLevel = "subtle",
  audioEnabled = false,
}: AiScenarioProps) {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);
  const colors = sceneColors[place];

  useEffect(() => {
    // Generate random particles for ambient motion
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [place]);

  const getAnimationDuration = () => {
    switch (motionLevel) {
      case "none": return 0;
      case "subtle": return 40;
      case "medium": return 25;
      default: return 40;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.from} 0%, ${colors.to} 50%, #0A0A0A 100%)`,
        }}
      />

      {/* Ambient particles */}
      {motionLevel !== "none" && (
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/10"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: getAnimationDuration(),
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Accent glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${colors.accent}20 0%, transparent 50%)`,
        }}
        animate={{
          opacity: motionLevel !== "none" ? [0.3, 0.5, 0.3] : 0.4,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%)",
        }}
      />
    </div>
  );
}
