import React, { useEffect, useState } from 'react';

export const SpookyAtmosphere: React.FC = () => {
  const [bats, setBats] = useState<Array<{ id: number; left: number; top: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    // Generate subtle ambient bats floating across screen occasionally
    const initialBats = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      delay: Math.random() * 8,
      scale: 0.6 + Math.random() * 0.6,
    }));
    setBats(initialBats);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {bats.map((bat) => (
        <div
          key={bat.id}
          className="absolute opacity-20 hover:opacity-80 transition-opacity animate-float select-none text-xl sm:text-2xl"
          style={{
            left: `${bat.left}%`,
            top: `${bat.top}%`,
            animationDelay: `${bat.delay}s`,
            transform: `scale(${bat.scale})`,
          }}
        >
          🦇
        </div>
      ))}
    </div>
  );
};
