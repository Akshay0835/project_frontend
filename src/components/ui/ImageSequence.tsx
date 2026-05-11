"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(240).fill(null));
  const frameCount = 240;

  const { scrollYProgress } = useScroll();

  // Draw a specific frame to the canvas
  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    
    const img = imagesRef.current[index];
    if (!img) return; // Don't draw if not loaded yet
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Calculate aspect ratio for cover effect
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Load all images on mount
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      // Prioritize the first frame
      const firstImg = new Image();
      firstImg.src = `/images_background/ezgif-frame-001.jpg`;
      
      await new Promise((resolve) => {
        firstImg.onload = () => {
          if (!isMounted) return;
          imagesRef.current[0] = firstImg;
          drawFrame(0);
          resolve(null);
        };
        firstImg.onerror = () => resolve(null); // Fallback if image fails
      });

      if (!isMounted) return;

      // Then load the rest concurrently
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/images_background/ezgif-frame-${frameNumber}.jpg`;
        
        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current[i - 1] = img;
          
          // If this newly loaded image happens to be the one we currently need, draw it immediately!
          const currentIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollYProgress.get() * frameCount)
          );
          if (i - 1 === currentIndex) {
            drawFrame(currentIndex);
          }
        };
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [scrollYProgress]);

  // Update canvas when scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canvasRef.current) return;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    drawFrame(frameIndex);
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set actual canvas resolution to match screen
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollYProgress.get() * frameCount)
        );
        drawFrame(frameIndex);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 bg-black overflow-hidden">
      {/* Scale up slightly and anchor to top-left to push the bottom-right watermark out of view */}
      <canvas ref={canvasRef} className="w-full h-full object-cover scale-[1.08] origin-top-left" />
      {/* Very subtle overlay to ensure text is minimally readable without dulling the image */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}
