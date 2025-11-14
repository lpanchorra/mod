"use client";

import { NewArtifactWizard } from "./wizards/NewArtifactWizard";
import { ArtifactGallery } from "./ArtifactGallery";
import { ProfessionalsDirectory } from "./ProfessionalsDirectory";
import { ConstellationMotif } from "./ConstellationMotif";

interface InteractiveModuleProps {
  currentView: "welcome" | "new-artifact" | "gallery" | "professionals";
  onComplete?: () => void;
}

export function InteractiveModule({ currentView, onComplete }: InteractiveModuleProps) {
  return (
    <div className="h-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.06] rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden">
      {currentView === "welcome" && (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="w-32 h-32 mb-8 text-muted-foreground">
            <ConstellationMotif />
          </div>
          <h1 className="mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em" }}>
            Welcome to MOD
          </h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Your creative AI platform for generating and managing artifacts. 
            Use the Tool Box on the left to get started.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">1</kbd>
              <span>New Artifact</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">2</kbd>
              <span>Gallery</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">3</kbd>
              <span>Professionals</span>
            </div>
          </div>
        </div>
      )}

      {currentView === "new-artifact" && (
        <NewArtifactWizard onComplete={onComplete || (() => {})} />
      )}

      {currentView === "gallery" && <ArtifactGallery />}

      {currentView === "professionals" && <ProfessionalsDirectory />}
    </div>
  );
}
