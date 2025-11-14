"use client";

import { useState } from "react";
import { User, Settings, CreditCard, Keyboard, Sparkles, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AiScenarioSettings } from "./AiScenarioSettings";

interface UserSettingsProps {
  onSettingClick: (setting: "profile" | "workspace" | "billing" | "shortcuts" | "ai-scenario" | "signout") => void;
}

export function UserSettings({ onSettingClick }: UserSettingsProps) {
  const [scenarioSettingsOpen, setScenarioSettingsOpen] = useState(false);

  const handleMenuClick = (setting: "profile" | "workspace" | "billing" | "shortcuts" | "ai-scenario" | "signout") => {
    if (setting === "ai-scenario") {
      setScenarioSettingsOpen(true);
    } else {
      onSettingClick(setting);
    }
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-30">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/[0.06] rounded-[20px] px-3 hover:bg-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <Avatar className="w-7 h-7">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white/10">U</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 backdrop-blur-xl bg-[#0A0A0A]/98 border border-white/[0.06] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            sideOffset={8}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("profile")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08]"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("workspace")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08]"
            >
              <Settings className="w-4 h-4" strokeWidth={1.5} />
              Workspace
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("billing")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08]"
            >
              <CreditCard className="w-4 h-4" strokeWidth={1.5} />
              Billing
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("shortcuts")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08]"
            >
              <Keyboard className="w-4 h-4" strokeWidth={1.5} />
              Keyboard Shortcuts
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("ai-scenario")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08]"
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              AI Scenario
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            
            <DropdownMenuItem
              onClick={() => handleMenuClick("signout")}
              className="gap-2 cursor-pointer rounded-lg focus:bg-white/[0.08] text-error"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* AI Scenario Settings Dialog */}
      <AiScenarioSettings
        open={scenarioSettingsOpen}
        onOpenChange={setScenarioSettingsOpen}
      />
    </>
  );
}