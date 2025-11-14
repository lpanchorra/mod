"use client";

import { useState } from "react";
import { PlusSquare, Grid3x3, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { motion, AnimatePresence } from "motion/react";

interface ToolBoxProps {
  onAction: (action: "new-artifact" | "gallery" | "professionals") => void;
  moduleHeight?: number;
}

export function ToolBox({ onAction, moduleHeight = 600 }: ToolBoxProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("toolbox-expanded");
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("toolbox-expanded", JSON.stringify(newState));
    }
  };

  const tools = [
    {
      id: "new-artifact" as const,
      icon: PlusSquare,
      label: "New Artifact",
      shortcut: "1",
    },
    {
      id: "gallery" as const,
      icon: Grid3x3,
      label: "Artifact Gallery",
      shortcut: "2",
    },
    {
      id: "professionals" as const,
      icon: Users,
      label: "Connect with AI Professionals",
      shortcut: "3",
    },
  ];

  // Keyboard shortcuts
  useState(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      
      const key = e.key;
      if (key === "1") onAction("new-artifact");
      if (key === "2") onAction("gallery");
      if (key === "3") onAction("professionals");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  });

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 280 : 64 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30"
      style={{ height: moduleHeight }}
    >
      <div className="h-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.06] rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col">
        {/* Header */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="px-6 py-4 border-b border-white/[0.06]"
            >
              <h3 className="tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Tool Box
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tools */}
        <div className="flex-1 p-3 space-y-2">
          <TooltipProvider delayDuration={300}>
            {tools.map((tool) => (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-12 rounded-xl hover:bg-white/[0.08] transition-all duration-150 ${
                      isExpanded ? "px-4" : "px-0 justify-center"
                    }`}
                    onClick={() => onAction(tool.id)}
                  >
                    <tool.icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="flex-1 text-left"
                        >
                          {tool.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {tool.label}
                    <kbd className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20">
                      {tool.shortcut}
                    </kbd>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Toggle button */}
        <div className="p-3 border-t border-white/[0.06]">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full h-10 rounded-xl hover:bg-white/[0.08] ${
              isExpanded ? "" : "px-0 justify-center"
            }`}
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
