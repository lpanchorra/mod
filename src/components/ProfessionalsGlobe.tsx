"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MessageCircle, Star } from "lucide-react";
import * as THREE from "three";

interface Professional {
  id: string;
  name: string;
  expertise: string[];
  bio: string;
  rating: number;
  projects: number;
  rate: string;
  avatar: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  online: boolean;
}

interface ProfessionalsGlobeProps {
  professionals: Professional[];
  onStartCollaboration?: (id: string) => void;
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new Vector3(x, y, z);
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#0A0A0A"
        wireframe={true}
        wireframeLinewidth={0.5}
        opacity={0.3}
        transparent={true}
      />
    </Sphere>
  );
}

function ProfessionalMarker({
  professional,
  onClick,
}: {
  professional: Professional;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const position = latLngToVector3(professional.location.lat, professional.location.lng, 2.1);

  return (
    <group position={position}>
      {/* Marker dot */}
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.08 : 0.06, 16, 16]} />
        <meshStandardMaterial
          color={professional.online ? "#A5F3AD" : "#FAFAFA"}
          emissive={professional.online ? "#A5F3AD" : "#FAFAFA"}
          emissiveIntensity={professional.online ? 1.5 : 0.5}
        />
      </mesh>

      {/* Pulse effect for online professionals */}
      {professional.online && (
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color="#A5F3AD"
            transparent={true}
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Location label on hover */}
      {hovered && (
        <Html distanceFactor={6} position={[0, 0.15, 0]}>
          <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/[0.06] rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-xs text-white/90">{professional.location.city}</p>
            <p className="text-xs text-white/60">{professional.location.country}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function ProfessionalCard({
  professional,
  onClose,
  onStartCollaboration,
}: {
  professional: Professional;
  onClose: () => void;
  onStartCollaboration?: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      onClick={onClose}
    >
      <div
        className="bg-[#0A0A0A]/98 backdrop-blur-xl border border-white/[0.06] rounded-[20px] p-6 max-w-md w-full mx-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={professional.avatar} />
            <AvatarFallback className="bg-white/10">
              {professional.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {professional.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" strokeWidth={1.5} />
                    <span>{professional.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{professional.projects} projects</span>
                </div>
              </div>
              <Badge variant="secondary" className="rounded-lg">
                {professional.rate}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <div
                className={`w-2 h-2 rounded-full ${professional.online ? "bg-success animate-pulse" : "bg-muted"}`}
              />
              <span>
                {professional.location.city}, {professional.location.country}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{professional.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {professional.expertise.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs rounded-md">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 rounded-xl bg-white text-[#0A0A0A] hover:bg-white/90"
            onClick={() => onStartCollaboration?.(professional.id)}
          >
            <MessageCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Start Collaboration
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-xl hover:bg-white/[0.08]"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProfessionalsGlobe({ professionals, onStartCollaboration }: ProfessionalsGlobeProps) {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Globe />

          {professionals
            .filter((p) => p.online)
            .map((professional) => (
              <ProfessionalMarker
                key={professional.id}
                professional={professional}
                onClick={() => setSelectedProfessional(professional)}
              />
            ))}

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Info overlay */}
      <div className="absolute top-4 left-4 right-4 bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              <span className="text-success">●</span> {professionals.filter((p) => p.online).length}{" "}
              online professionals
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click and drag to rotate • Scroll to zoom
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <span>Offline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected professional card */}
      {selectedProfessional && (
        <ProfessionalCard
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
          onStartCollaboration={onStartCollaboration}
        />
      )}
    </div>
  );
}
