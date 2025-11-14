"use client";

import { useState } from "react";
import { Image, Video, Music, Code, FileText, Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ConstellationMotif } from "../ConstellationMotif";

type ArtifactType = "image" | "video" | "audio" | "code" | "text";
type Step = "type" | "source" | "details" | "review";

const artifactTypes = [
  { id: "image" as const, icon: Image, label: "Image", description: "Generate or upload images" },
  { id: "video" as const, icon: Video, label: "Video", description: "Create video content" },
  { id: "audio" as const, icon: Music, label: "Audio", description: "Generate audio or music" },
  { id: "code" as const, icon: Code, label: "Code", description: "Code snippets & projects" },
  { id: "text" as const, icon: FileText, label: "Text", description: "Documents & content" },
];

export function NewArtifactWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<ArtifactType | null>(null);
  const [formData, setFormData] = useState({
    prompt: "",
    title: "",
    description: "",
    tags: "",
  });

  const steps: Step[] = ["type", "source", "details", "review"];
  const currentStepIndex = steps.indexOf(step);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };

  const handleSave = () => {
    // In production, this would save to backend
    onComplete();
  };

  const handleEnhanceIdea = () => {
    // In production, this would call AI to enhance the prompt
    setFormData({
      ...formData,
      prompt: formData.prompt + "\n\n[AI-enhanced suggestions would appear here]",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 p-6 border-b border-white/[0.06]">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                i <= currentStepIndex
                  ? "bg-white text-[#0A0A0A]"
                  : "bg-white/[0.04] border border-white/[0.06]"
              }`}
            >
              {i < currentStepIndex ? (
                <Check className="w-4 h-4" strokeWidth={2} />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 ${
                  i < currentStepIndex ? "bg-white" : "bg-white/[0.06]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {step === "type" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Choose Artifact Type
              </h2>
              <p className="text-muted-foreground">Select the type of content you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artifactTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-6 rounded-[20px] border transition-all text-left ${
                    selectedType === type.id
                      ? "bg-white/[0.08] border-white/[0.2]"
                      : "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                >
                  <type.icon className="w-8 h-8 mb-4" strokeWidth={1.5} />
                  <h3 className="mb-1">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "source" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Idea Input
              </h2>
              <p className="text-muted-foreground">Describe the details of your artifact</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to create..."
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  className="mt-2 min-h-32 bg-white/[0.04] border-white/[0.06] rounded-xl resize-none"
                />
              </div>
              <div>
                <Button
                  variant="ghost"
                  onClick={handleEnhanceIdea}
                  className="rounded-xl gap-2 hover:bg-white/[0.08]"
                >
                  <div className="w-4 h-4">
                    <ConstellationMotif />
                  </div>
                  Enhance Idea
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Artifact Details
              </h2>
              <p className="text-muted-foreground">Add metadata and description</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your artifact a name"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2 bg-white/[0.04] border-white/[0.06] rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your artifact..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-24 bg-white/[0.04] border-white/[0.06] rounded-xl resize-none"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="art, digital, abstract (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="mt-2 bg-white/[0.04] border-white/[0.06] rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
                <ConstellationMotif />
              </div>
              <h2 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Review & Save
              </h2>
              <p className="text-muted-foreground">Confirm your artifact details</p>
            </div>

            <div className="p-6 rounded-[20px] bg-white/[0.04] border border-white/[0.06] space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Type</span>
                <p className="mt-1 capitalize">{selectedType}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Title</span>
                <p className="mt-1">{formData.title || "Untitled"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="mt-1">{formData.description || "No description"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Tags</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags ? (
                    formData.tags.split(",").map((tag, i) => (
                      <Badge key={i} variant="secondary" className="rounded-lg">
                        {tag.trim()}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-6 border-t border-white/[0.06]">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStepIndex === 0}
          className="rounded-xl"
        >
          Back
        </Button>

        <div className="flex gap-2">
          {step === "review" ? (
            <>
              <Button
                variant="ghost"
                onClick={handleSave}
                className="rounded-xl"
              >
                Save as Draft
              </Button>
              <Button
                onClick={handleSave}
                className="rounded-xl bg-white text-[#0A0A0A] hover:bg-white/90"
              >
                Create
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              disabled={step === "type" && !selectedType}
              className="rounded-xl bg-white text-[#0A0A0A] hover:bg-white/90"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}