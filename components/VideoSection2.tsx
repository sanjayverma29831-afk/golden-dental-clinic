"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type VideoSection2Props = {
  totalFrames?: number;
  title?: string;
  subtitle?: string;
  description?: string;
};

export function VideoSection2({
  totalFrames = 150,
  title = "DR. MK SUNHARE",
  subtitle = "Personalised Dental Care. Trusted Expertise.",
  description = "Dedicated to creating healthy, confident smiles with compassionate and modern dental care."
}: VideoSection2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Array to hold the preloaded images
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const isComponentMounted = useRef(true);
  const isIntersecting = useRef(false);

  // Constants for Video 2
  const frameExtension = "webp";
  const framePrefix = "/frames/video_2/frame_";

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

      // Check if mobile to implement frame sampling
      const isMobile = window.innerWidth < 768;
      const frameSkip = isMobile ? 3 : 1;
      
      // Load remaining frames in chunks
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
              img.onerror = () => {
                if (isComponentMounted.current) {
                  console.warn(`VideoSection2: Failed to load frame ${frameIndex}`);
                }
                resolve();
              };
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
    
    // Find nearest valid frame to handle load errors gracefully without white flashes
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
        
        // Ensure canvas dimensions match container dynamically
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
          renderFrame(currentFrameRef.current);
        }
      });
    }, { rootMargin: "100% 0px" });
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [renderFrame]);

  // Handle Scroll scrubbing with requestAnimationFrame
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

      // Calculate progress mapped to exact scroll space within the 400vh container
      const scrollableDistance = containerHeight - windowHeight;
      let progress = (scrollY - containerTop) / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      const maxFrameIndex = totalFrames - 1;
      let frameIndex = Math.floor(progress * maxFrameIndex);
      frameIndex = Math.max(0, Math.min(frameIndex, maxFrameIndex));

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
    
    // Initial check
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
        
        {/* Loading State - Graceful fallback until first frame loads */}
        {loadedCount === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a]">
            <div className="flex flex-col items-center gap-4">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#CBA135]/20 border-t-[#CBA135]"></div>
            </div>
          </div>
        )}
        
        {/* Cinematic Canvas Layer */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={`Introduction video of ${title}`}
        />

        {/* Gradient Overlay tailored for Doctor Intro legibility without obstructing face */}
        <div className="absolute left-0 bottom-0 w-full md:w-2/3 h-1/2 bg-gradient-to-tr from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent z-10 pointer-events-none" />

        {/* Overlay Content - Lower Left */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 pb-20 sm:p-6 sm:pb-[10%] md:p-[6%] md:pb-[12%] lg:p-[8%] lg:pb-[10%] pointer-events-none">
          <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[430px] w-full text-left flex flex-col items-start pointer-events-auto">
            
            <p className="text-[#CBA135] font-semibold tracking-[0.25em] text-[10px] sm:text-[12px] md:text-[14px] mb-2 sm:mb-3 uppercase drop-shadow-md">
              {title}
            </p>
            
            <h2 className="text-white font-light text-[22px] sm:text-[26px] md:text-[38px] lg:text-[48px] tracking-tight mb-3 sm:mb-4 leading-tight drop-shadow-lg">
              {subtitle}
            </h2>
            
            <p className="text-neutral-300 text-xs sm:text-sm md:text-[18px] font-light drop-shadow-md mb-4 sm:mb-6 leading-relaxed">
              {description}
            </p>

            <button className="bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-medium uppercase tracking-wider text-[10px] sm:text-xs md:text-sm px-4 py-2 sm:px-6 sm:py-3 rounded transition-colors duration-300 shadow-lg pointer-events-auto">
              BOOK AN APPOINTMENT
            </button>
            
          </div>
        </div>

        {/* Scroll Indicator - Bottom Center */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center opacity-70 animate-pulse pointer-events-none">
          <span className="text-[#CBA135] text-[10px] md:text-xs tracking-widest mb-2 font-medium">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#CBA135] to-transparent" />
        </div>
        
      </div>
    </section>
  );
}

export default VideoSection2;
