"use client";

import { useState } from "react";
import { Image, Video, Music, Code, FileText, Filter, Search, Copy, ExternalLink } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { ConstellationMotif } from "./ConstellationMotif";

const mockArtifacts = [
  {
    id: "1",
    type: "image",
    title: "Cyberpunk Cityscape",
    author: "AI Artist",
    version: "1.0",
    tags: ["cyberpunk", "digital art", "city"],
    thumbnail: "",
  },
  {
    id: "2",
    type: "code",
    title: "React Component Library",
    author: "Dev Studio",
    version: "2.1",
    tags: ["react", "components", "ui"],
    thumbnail: "",
  },
  {
    id: "3",
    type: "audio",
    title: "Ambient Soundscape",
    author: "Sound Designer",
    version: "1.5",
    tags: ["ambient", "music", "meditation"],
    thumbnail: "",
  },
  {
    id: "4",
    type: "video",
    title: "Motion Graphics Pack",
    author: "Motion Pro",
    version: "3.0",
    tags: ["motion", "graphics", "animation"],
    thumbnail: "",
  },
];

const typeIcons = {
  image: Image,
  video: Video,
  audio: Music,
  code: Code,
  text: FileText,
};

export function ArtifactGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredArtifacts = mockArtifacts.filter((artifact) => {
    const matchesSearch = artifact.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || artifact.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Artifact Gallery
            </h2>
            <p className="text-sm text-muted-foreground">Browse and manage your creations</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/[0.04] border-white/[0.06] rounded-xl"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 bg-white/[0.04] border-white/[0.06] rounded-xl">
              <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A]/98 border-white/[0.06] rounded-xl backdrop-blur-xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-6">
        {filteredArtifacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-6 text-muted-foreground">
              <ConstellationMotif />
            </div>
            <h3 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              No artifacts found
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your filters"
                : "Start creating your first artifact"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => {
              const Icon = typeIcons[artifact.type as keyof typeof typeIcons];
              return (
                <Card
                  key={artifact.id}
                  className="group overflow-hidden bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.06] transition-all rounded-[20px]"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-white/[0.02] flex items-center justify-center border-b border-white/[0.06] relative overflow-hidden">
                    <div className="w-16 h-16 text-muted-foreground">
                      <ConstellationMotif />
                    </div>
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" strokeWidth={1.5} />
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Copy className="w-4 h-4 mr-2" strokeWidth={1.5} />
                        Remix
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-sm line-clamp-1">{artifact.title}</h3>
                          <p className="text-xs text-muted-foreground">{artifact.author}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs rounded-lg">
                        v{artifact.version}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {artifact.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-md">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
