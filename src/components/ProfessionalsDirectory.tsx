"use client";

import { useState, Suspense } from "react";
import { Search, Filter, Star, MessageCircle, Globe, List } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ConstellationMotif } from "./ConstellationMotif";
import { ProfessionalsGlobe } from "./ProfessionalsGlobe";

const mockProfessionals = [
  {
    id: "1",
    name: "Alex Rivera",
    expertise: ["Image Generation", "Digital Art", "3D Modeling"],
    bio: "Creative AI specialist with 5+ years in digital art creation",
    rating: 4.9,
    projects: 127,
    rate: "$50/hr",
    avatar: "",
    location: {
      lat: 40.7128,
      lng: -74.006,
      city: "New York",
      country: "USA",
    },
    online: true,
  },
  {
    id: "2",
    name: "Jordan Chen",
    expertise: ["Code Generation", "Full Stack", "React"],
    bio: "Expert developer focusing on AI-powered code generation",
    rating: 4.8,
    projects: 93,
    rate: "$75/hr",
    avatar: "",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      city: "San Francisco",
      country: "USA",
    },
    online: true,
  },
  {
    id: "3",
    name: "Sam Taylor",
    expertise: ["Audio Production", "Music", "Sound Design"],
    bio: "Audio engineer specializing in AI-generated soundscapes",
    rating: 5.0,
    projects: 64,
    rate: "$60/hr",
    avatar: "",
    location: {
      lat: 51.5074,
      lng: -0.1278,
      city: "London",
      country: "UK",
    },
    online: true,
  },
  {
    id: "4",
    name: "Morgan Lee",
    expertise: ["Video Editing", "Motion Graphics", "Animation"],
    bio: "Motion designer with expertise in AI-enhanced video",
    rating: 4.7,
    projects: 81,
    rate: "$65/hr",
    avatar: "",
    location: {
      lat: 35.6762,
      lng: 139.6503,
      city: "Tokyo",
      country: "Japan",
    },
    online: false,
  },
  {
    id: "5",
    name: "Riley Park",
    expertise: ["Machine Learning", "AI Training", "Data Science"],
    bio: "ML engineer specializing in custom AI model training",
    rating: 4.9,
    projects: 156,
    rate: "$85/hr",
    avatar: "",
    location: {
      lat: 37.5665,
      lng: 126.978,
      city: "Seoul",
      country: "South Korea",
    },
    online: true,
  },
  {
    id: "6",
    name: "Casey Brown",
    expertise: ["Content Writing", "Copywriting", "SEO"],
    bio: "Content strategist using AI to enhance creative writing",
    rating: 4.6,
    projects: 72,
    rate: "$45/hr",
    avatar: "",
    location: {
      lat: -33.8688,
      lng: 151.2093,
      city: "Sydney",
      country: "Australia",
    },
    online: true,
  },
  {
    id: "7",
    name: "Jamie Silva",
    expertise: ["UI/UX Design", "Product Design", "Prototyping"],
    bio: "Product designer leveraging AI for rapid prototyping",
    rating: 4.8,
    projects: 104,
    rate: "$70/hr",
    avatar: "",
    location: {
      lat: -23.5505,
      lng: -46.6333,
      city: "São Paulo",
      country: "Brazil",
    },
    online: true,
  },
  {
    id: "8",
    name: "Taylor Schmidt",
    expertise: ["3D Animation", "Visual Effects", "CGI"],
    bio: "VFX artist combining traditional techniques with AI",
    rating: 5.0,
    projects: 89,
    rate: "$80/hr",
    avatar: "",
    location: {
      lat: 52.52,
      lng: 13.405,
      city: "Berlin",
      country: "Germany",
    },
    online: false,
  },
];

export function ProfessionalsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "globe">("list");

  const filteredProfessionals = mockProfessionals.filter((pro) => {
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise =
      filterExpertise === "all" ||
      pro.expertise.some((exp) => exp.toLowerCase().includes(filterExpertise.toLowerCase()));
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI Professionals
            </h2>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-white/[0.04] rounded-xl p-1">
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className={`rounded-lg ${
                  viewMode === "list"
                    ? "bg-white text-[#0A0A0A] hover:bg-white/90"
                    : "hover:bg-white/[0.08]"
                }`}
              >
                <List className="w-4 h-4 mr-2" strokeWidth={1.5} />
                List View
              </Button>
              <Button
                size="sm"
                variant={viewMode === "globe" ? "default" : "ghost"}
                onClick={() => setViewMode("globe")}
                className={`rounded-lg ${
                  viewMode === "globe"
                    ? "bg-white text-[#0A0A0A] hover:bg-white/90"
                    : "hover:bg-white/[0.08]"
                }`}
              >
                <Globe className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Globe View
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect with verified AI specialists and collaborators
          </p>
        </div>

        {/* Filters - Only show in list view */}
        {viewMode === "list" && (
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search professionals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/[0.04] border-white/[0.06] rounded-xl"
              />
            </div>

            <Select value={filterExpertise} onValueChange={setFilterExpertise}>
              <SelectTrigger className="w-48 bg-white/[0.04] border-white/[0.06] rounded-xl">
                <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A]/98 border-white/[0.06] rounded-xl backdrop-blur-xl">
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="image">Image Generation</SelectItem>
                <SelectItem value="code">Code Generation</SelectItem>
                <SelectItem value="audio">Audio Production</SelectItem>
                <SelectItem value="video">Video Editing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Directory - List or Globe View */}
      <div className="flex-1 overflow-auto">
        {viewMode === "globe" ? (
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mb-4 mx-auto">
                    <ConstellationMotif />
                  </div>
                  <p className="text-sm text-muted-foreground">Loading globe...</p>
                </div>
              </div>
            }
          >
            <ProfessionalsGlobe
              professionals={mockProfessionals}
              onStartCollaboration={(id) => {
                console.log("Start collaboration with:", id);
              }}
            />
          </Suspense>
        ) : (
          <div className="p-6">
            {filteredProfessionals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 mb-6 text-muted-foreground">
                  <ConstellationMotif />
                </div>
                <h3 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  No professionals found
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
                {filteredProfessionals.map((pro) => (
                  <Card
                    key={pro.id}
                    className="p-6 bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.06] transition-all rounded-[20px]"
                  >
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={pro.avatar} />
                        <AvatarFallback className="bg-white/10">
                          {pro.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="mb-1">{pro.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-warning text-warning" strokeWidth={1.5} />
                                <span>{pro.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{pro.projects} projects</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="rounded-lg">
                            {pro.rate}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pro.bio}</p>

                        {/* Expertise tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pro.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs rounded-md">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 rounded-xl bg-white text-[#0A0A0A] hover:bg-white/90"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                            Start Collaboration
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-xl hover:bg-white/[0.08]"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
