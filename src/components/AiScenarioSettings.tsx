"use client";

import { useState } from "react";
import { Sparkles, Volume2, VolumeX, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";

interface AiScenarioSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiScenarioSettings({ open, onOpenChange }: AiScenarioSettingsProps) {
  const [place, setPlace] = useState("studio");
  const [mood, setMood] = useState("focus");
  const [motion, setMotion] = useState("subtle");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [minimalMotion, setMinimalMotion] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A]/98 border-white/[0.06] backdrop-blur-xl rounded-[20px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" strokeWidth={1.5} />
            <DialogTitle style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI Scenario Settings
            </DialogTitle>
          </div>
          <DialogDescription>
            Customize your AI-generated background environment to enhance focus and creativity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Place */}
          <div className="space-y-2">
            <Label htmlFor="place">Place</Label>
            <Select value={place} onValueChange={setPlace}>
              <SelectTrigger
                id="place"
                className="bg-white/[0.04] border-white/[0.06] rounded-xl"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A]/98 border-white/[0.06] rounded-xl backdrop-blur-xl">
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="ocean">Ocean</SelectItem>
                <SelectItem value="city">City Night</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="space">Space</SelectItem>
                <SelectItem value="surprise">Surprise Me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mood */}
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger
                id="mood"
                className="bg-white/[0.04] border-white/[0.06] rounded-xl"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A]/98 border-white/[0.06] rounded-xl backdrop-blur-xl">
                <SelectItem value="focus">Deep Focus</SelectItem>
                <SelectItem value="calm">Calm</SelectItem>
                <SelectItem value="energetic">Energetic</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motion */}
          <div className="space-y-2">
            <Label htmlFor="motion">Motion Level</Label>
            <Select value={motion} onValueChange={setMotion}>
              <SelectTrigger
                id="motion"
                className="bg-white/[0.04] border-white/[0.06] rounded-xl"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A]/98 border-white/[0.06] rounded-xl backdrop-blur-xl">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="subtle">Subtle</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="audio">Ambient Audio</Label>
                <p className="text-sm text-muted-foreground">
                  Enable background soundscape
                </p>
              </div>
              <Switch
                id="audio"
                checked={audioEnabled}
                onCheckedChange={setAudioEnabled}
              />
            </div>

            {audioEnabled && (
              <div className="flex items-center gap-3 pt-2">
                <VolumeX className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Volume2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
              </div>
            )}
          </div>

          {/* Accessibility */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" strokeWidth={1.5} />
                  <Label htmlFor="minimal-motion">Minimal Motion Mode</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reduces heavy animations for better performance
                </p>
              </div>
              <Switch
                id="minimal-motion"
                checked={minimalMotion}
                onCheckedChange={setMinimalMotion}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
