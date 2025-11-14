"use client";

import { useState } from "react";
import { AiScenario } from "./components/AiScenario";
import { ToolBox } from "./components/ToolBox";
import { InteractiveModule } from "./components/InteractiveModule";
import { UserSettings } from "./components/UserSettings";
import { AiChat } from "./components/AiChat";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type View = "welcome" | "new-artifact" | "gallery" | "professionals";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("welcome");

  const handleToolBoxAction = (action: "new-artifact" | "gallery" | "professionals") => {
    setCurrentView(action);
  };

  const handleWizardComplete = () => {
    toast.success("Artifact created successfully!", {
      description: "Your artifact has been saved to the gallery.",
    });
    setCurrentView("gallery");
  };

  const handleSettingClick = (
    setting: "profile" | "workspace" | "billing" | "shortcuts" | "ai-scenario" | "signout"
  ) => {
    if (setting === "signout") {
      toast.info("Signed out", { description: "You have been signed out successfully." });
    } else {
      toast.info(`${setting.charAt(0).toUpperCase() + setting.slice(1)} settings`, {
        description: "This feature is coming soon.",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden dark" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* AI Scenario Background */}
      <AiScenario place="studio" mood="focus" motion="subtle" />

      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Tool Box */}
        <ToolBox onAction={handleToolBoxAction} moduleHeight={600} />

        {/* Interactive Module (Center) */}
        <div className="flex items-center justify-center min-h-screen p-6">
          <div
            className="w-full max-w-6xl mx-auto"
            style={{
              height: "600px",
              marginLeft: "160px", // Offset for expanded toolbox
            }}
          >
            <InteractiveModule currentView={currentView} onComplete={handleWizardComplete} />
          </div>
        </div>

        {/* User Settings (Top-right) */}
        <UserSettings onSettingClick={handleSettingClick} />

        {/* AI Chat Assistant (Bottom-right) */}
        <AiChat />
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "backdrop-blur-xl bg-[#0A0A0A]/98 border-white/[0.06] rounded-[16px]",
            title: "text-foreground",
            description: "text-muted-foreground",
          },
        }}
      />
    </div>
  );
}
