/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ParticleBracketsProps {
  children?: React.ReactNode;
}

export default function ParticleBrackets({ children }: ParticleBracketsProps) {
  // Left brace path definition in 400x400 viewBox
  const leftPath = "M 100,20 Q 30,20 30,60 L 30,170 Q 30,195 10,200 Q 30,205 30,230 L 30,340 Q 30,380 100,380";
  // Right brace path definition in 400x400 viewBox
  const rightPath = "M 300,20 Q 370,20 370,60 L 370,170 Q 370,195 390,200 Q 370,205 370,230 L 370,340 Q 370,380 300,380";

  return (
    <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center p-12 select-none mx-auto">
      {/* Background SVG drawing the particle curly braces */}
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Brace - Glowing Particles */}
        {/* Layer 1: Blurred base glow */}
        <path 
          d={leftPath} 
          stroke="rgba(59, 130, 246, 0.4)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeDasharray="2 16"
          filter="url(#glow)"
          className="animate-pulse"
        />
        {/* Layer 2: Main blue particles */}
        <path 
          d={leftPath} 
          stroke="#3b82f6" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeDasharray="2 12"
        />
        {/* Layer 3: Accent bright particles */}
        <path 
          d={leftPath} 
          stroke="#93c5fd" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeDasharray="1 18"
          strokeDashoffset="6"
        />
        {/* Layer 4: Scatter dots for organic look */}
        <path 
          d={leftPath} 
          stroke="#2563eb" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray="1 30"
          strokeDashoffset="12"
          opacity="0.6"
        />

        {/* Right Brace - Glowing Particles */}
        {/* Layer 1: Blurred base glow */}
        <path 
          d={rightPath} 
          stroke="rgba(59, 130, 246, 0.4)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeDasharray="2 16"
          filter="url(#glow)"
          className="animate-pulse"
        />
        {/* Layer 2: Main blue particles */}
        <path 
          d={rightPath} 
          stroke="#3b82f6" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeDasharray="2 12"
        />
        {/* Layer 3: Accent bright particles */}
        <path 
          d={rightPath} 
          stroke="#93c5fd" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeDasharray="1 18"
          strokeDashoffset="6"
        />
        {/* Layer 4: Scatter dots for organic look */}
        <path 
          d={rightPath} 
          stroke="#2563eb" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray="1 30"
          strokeDashoffset="12"
          opacity="0.6"
        />
      </svg>

      {/* Content wrapper inside the brackets */}
      <div className="relative z-10 text-center w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
