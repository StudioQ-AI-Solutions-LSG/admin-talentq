"use client";

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientProps {
  className?: string;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Updated colors to match the reference image (orange-pink-purple gradient)
    const colors = [
      [255, 87, 34],   // #ff5722 - Bright orange
      [233, 30, 99],   // #e91e63 - Pink
      [156, 39, 176],  // #9c27b0 - Purple
      [103, 58, 183],  // #673ab7 - Deep purple
    ];

    let step = 0;
    const colorSteps = 1000; // Extremely slow transitions between colors

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    // Initial resize
    resizeCanvas();

    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx) return;

      // Calculate gradient positions based on time - more visible animation
      const time = Date.now() * 0.0001; // Slightly faster for more visible movement
      const x1 = Math.sin(time * 0.05) * 0.5 + 0.5; // More movement
      const y1 = Math.sin(time * 0.03) * 0.5 + 0.5; // More movement
      const x2 = Math.cos(time * 0.02) * 0.5 + 0.5; // More movement
      const y2 = Math.cos(time * 0.04) * 0.5 + 0.5; // More movement

      // Create gradient
      const gradient = ctx.createLinearGradient(
        canvas.width * x1,
        canvas.height * y1,
        canvas.width * x2,
        canvas.height * y2
      );

      // Add color stops
      const currentIndex = Math.floor(step / colorSteps) % colors.length;
      const nextIndex = (currentIndex + 1) % colors.length;
      
      const ratio = (step % colorSteps) / colorSteps;
      
      const currentColor = colors[currentIndex];
      const nextColor = colors[nextIndex];
      
      const r = Math.floor(currentColor[0] * (1 - ratio) + nextColor[0] * ratio);
      const g = Math.floor(currentColor[1] * (1 - ratio) + nextColor[1] * ratio);
      const b = Math.floor(currentColor[2] * (1 - ratio) + nextColor[2] * ratio);
      
      gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
      gradient.addColorStop(1, `rgb(${colors[(currentIndex + 2) % colors.length].join(', ')})`);

      // Fill canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update step for next frame - more visible progression
      step = (step + 0.3) % (colors.length * colorSteps); // Faster for more visible color changes

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: -1
      }}
    />
  );
};

export default AnimatedGradient;
