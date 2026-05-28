/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function StarBackground() {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, duration: string }[]>([]);

  useEffect(() => {
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="stars-container relative overflow-hidden">
      {/* Premium glowing auras in the background */}
      <div className="absolute top-[-20%] left-[-20%] w-[65vw] h-[65vw] rounded-full bg-blue-600/8 blur-[160px] pointer-events-none aura-glow-1" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[65vw] h-[65vw] rounded-full bg-purple-600/8 blur-[160px] pointer-events-none aura-glow-2" />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            // @ts-ignore
            '--duration': star.duration
          }}
        />
      ))}
    </div>
  );
}
