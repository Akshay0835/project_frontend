"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 240;

  const { scrollYProgress } = useScroll();

  // Draw a specific frame to the canvas
  const drawFrame = (index: number, imgs: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgs[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgs[index];
    
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
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    const loadImages = async () => {
      // Prioritize the first frame
      const firstImg = new Image();
      firstImg.src = `/images_background/ezgif-frame-001.jpg`;
      
      await new Promise((resolve) => {
        firstImg.onload = () => {
          if (!isMounted) return;
          loadedImages[0] = firstImg;
          drawFrame(0, loadedImages);
          loadedCount++;
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
          loadedImages[i - 1] = img;
          loadedCount++;
          
          if (loadedCount === frameCount) {
            setImages([...loadedImages]);
          }
        };
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update canvas when scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length !== frameCount || !canvasRef.current) return;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    drawFrame(frameIndex, images);
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set actual canvas resolution to match screen
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        if (images.length === frameCount) {
           const frameIndex = Math.min(
              frameCount - 1,
              Math.floor(scrollYProgress.get() * frameCount)
           );
           drawFrame(frameIndex, images);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 bg-black overflow-hidden">
      {/* Scale up slightly and anchor to top-left to push the bottom-right watermark out of view */}
      <canvas ref={canvasRef} className="w-full h-full object-cover scale-[1.08] origin-top-left" />
      {/* Very subtle overlay to ensure text is minimally readable without dulling the image */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}
