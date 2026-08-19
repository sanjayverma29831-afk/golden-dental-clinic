"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type VideoSection1Props = {
  totalFrames?: number;
  title?: string;
  description?: string;
};

export function VideoSection1({
  totalFrames = 150,
  title = "SMILE BRIGHT, LIVE CONFIDENT",
  description = "Advanced Dental Care with a Personal Touch"
}: VideoSection1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Array to hold the preloaded images
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const isComponentMounted = useRef(true);
  const isIntersecting = useRef(false);

  // Constants
  const frameExtension = "webp";
  const framePrefix = "/frames/video_1/frame_";

  // Helper to get formatted frame path
  const getFramePath = (index: number) => {
    // Frames are 1-indexed: frame_0001 to frame_0150
    const frameNum = (index + 1).toString().padStart(4, "0");
    return `${framePrefix}${frameNum}.${frameExtension}`;
  };

  // Preload frames incrementally
  useEffect(() => {
    isComponentMounted.current = true;
    imagesRef.current = new Array(totalFrames).fill(null);
    setLoadedCount(0);

    const preloadImages = async () => {
      // Load first frame immediately
      const firstImg = new window.Image();
      firstImg.src = getFramePath(0);
      await new Promise((resolve) => {
        firstImg.onload = () => {
          if (isComponentMounted.current) {
            imagesRef.current[0] = firstImg;
            setLoadedCount(1);
          }
          resolve(null);
        };
        firstImg.onerror = () => resolve(null);
      });

      // Initially draw the first frame if canvas is ready
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const parent = canvasRef.current.parentElement;
          if (parent) {
            const dpr = window.devicePixelRatio || 1;
            canvasRef.current.width = parent.clientWidth * dpr;
            canvasRef.current.height = parent.clientHeight * dpr;
          }
          drawCover(ctx, canvasRef.current, firstImg, 0.5, 0.5);
        }
      }

      // Check if mobile to implement frame sampling to save memory/bandwidth
      const isMobile = window.innerWidth < 768;
      const frameSkip = isMobile ? 3 : 1; // On mobile, load every 3rd frame (50 frames instead of 150)
      
      // Load remaining frames in chunks to prevent blocking
      const chunkSize = isMobile ? 5 : 15;
      for (let i = frameSkip; i < totalFrames; i += (chunkSize * frameSkip)) {
        if (!isComponentMounted.current) break;
        
        const chunk = [];
        for (let j = 0; j < chunkSize; j++) {
          const frameIndex = i + (j * frameSkip);
          if (frameIndex >= totalFrames) break;
          
          chunk.push(
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.src = getFramePath(frameIndex);
              img.onload = () => {
                if (isComponentMounted.current) {
                  imagesRef.current[frameIndex] = img;
                }
                resolve();
              };
              img.onerror = () => resolve();
            })
          );
        }
        await Promise.all(chunk);
        if (isComponentMounted.current) {
          setLoadedCount((prev) => Math.min(prev + chunkSize, totalFrames));
        }
      }
    };

    preloadImages();

    return () => {
      isComponentMounted.current = false;
    };
  }, [totalFrames]);

  // Helper to draw image using object-fit: cover logic
  const drawCover = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement, focusX = 0.5, focusY = 0.5) => {
    if (!img.width || !img.height) return;
    
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) * focusY;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) * focusX;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Canvas drawing function
  const renderFrame = useCallback((frameIndex: number) => {
    if (!isIntersecting.current) return;
    
    // Fallback to nearest loaded frame if skipping
    let validImg = imagesRef.current[frameIndex];
    if (!validImg) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]) {
          validImg = imagesRef.current[i];
          break;
        }
      }
    }
    
    if (validImg && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      
      if (parent && ctx) {
        const dpr = window.devicePixelRatio || 1;
        const targetWidth = parent.clientWidth * dpr;
        const targetHeight = parent.clientHeight * dpr;

        // Ensure canvas dimensions match container physical pixels
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }
        
        drawCover(ctx, canvas, validImg, 0.5, 0.5);
      }
    }
  }, []);

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Render current frame immediately when coming into view
          renderFrame(currentFrameRef.current);
        }
      });
    }, { rootMargin: "100% 0px" });
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [renderFrame]);

  // Handle Scroll with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!isIntersecting.current) return;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          updateFrame(window.scrollY);
          animationFrameId = 0;
        });
      }
    };

    const updateFrame = (scrollY: number) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      const containerTop = rect.top + scrollY; 
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Scrollable distance
      const scrollableDistance = containerHeight - windowHeight;
      
      // Calculate progress (0 to 1)
      let progress = (scrollY - containerTop) / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      // Determine frame index
      const maxFrameIndex = totalFrames - 1;
      let frameIndex = Math.floor(progress * maxFrameIndex);
      frameIndex = Math.max(0, Math.min(frameIndex, maxFrameIndex));

      // Draw if changed
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        renderFrame(frameIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          renderFrame(currentFrameRef.current);
          animationFrameId = 0;
        });
      }
    };
    window.addEventListener("resize", handleResize);
    
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [totalFrames, renderFrame]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[400vh] bg-[#1a1a1a]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#1a1a1a]">
        
        {/* Loading State */}
        {loadedCount === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a]">
            <div className="flex flex-col items-center gap-4">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#CBA135]/20 border-t-[#CBA135]"></div>
               <p className="text-[#CBA135]/80 font-medium text-sm tracking-widest uppercase">Preparing Experience...</p>
            </div>
          </div>
        )}
        
        {/* Canvas for rendering frames */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent z-10 pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-20 sm:px-6 sm:pb-24 md:px-12 md:pb-32 lg:px-24 pointer-events-none">
          <div className="max-w-[100%] sm:max-w-4xl mx-auto w-full text-center flex flex-col items-center">
            
            <p className="text-[#CBA135] font-semibold tracking-[0.25em] text-[10px] sm:text-[12px] md:text-base mb-3 sm:mb-4 uppercase drop-shadow-md">
              Golden Dental Clinic
            </p>
            
            <h2 className="text-white font-light text-[28px] sm:text-[34px] md:text-5xl lg:text-7xl tracking-tight mb-4 sm:mb-6 leading-[1.1] sm:leading-tight drop-shadow-lg px-2">
              {title}
            </h2>
            
            <p className="text-neutral-300 text-[14px] sm:text-[16px] md:text-xl font-light max-w-2xl drop-shadow-md px-4">
              {description}
            </p>
            
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center opacity-80 animate-pulse">
          <span className="text-[#CBA135] text-[10px] sm:text-[12px] tracking-widest mb-3 font-medium">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-[#CBA135] to-transparent" />
        </div>
        
      </div>
    </section>
  );
}

export default VideoSection1;
