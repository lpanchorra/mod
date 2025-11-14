export function ConstellationMotif({ className = "" }: { className?: string }) {
  return (
    <div className={`constellation-motif ${className}`}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Top row */}
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="15" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.6" />
        
        {/* Middle row */}
        <circle cx="15" cy="40" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="40" cy="40" r="3" fill="currentColor" opacity="1" />
        <circle cx="65" cy="40" r="2" fill="currentColor" opacity="0.5" />
        
        {/* Bottom row */}
        <circle cx="20" cy="60" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="65" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.6" />
        
        {/* Connecting lines */}
        <line x1="40" y1="15" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="40" x2="40" y2="65" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="20" y1="20" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="60" y1="20" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="20" y1="60" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="60" y1="60" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
}
