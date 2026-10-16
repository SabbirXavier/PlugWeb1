import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export const ScrollVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const frameCacheRef = useRef<ImageBitmap[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId: number;
    let targetProgress = 0;
    let smoothedProgress = 0;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        targetProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Draw frame on canvas with object-cover fit
    const drawCanvasFrame = (source: HTMLVideoElement | ImageBitmap) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const srcWidth = 'videoWidth' in source ? source.videoWidth || 1920 : source.width;
      const srcHeight = 'videoHeight' in source ? source.videoHeight || 1080 : source.height;

      const scale = Math.max(width / srcWidth, height / srcHeight);
      const drawWidth = srcWidth * scale;
      const drawHeight = srcHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    // Frame Extraction Logic for Smooth Scroll Scrubbing
    const extractFrames = async () => {
      if (!video.duration || isNaN(video.duration)) return;

      try {
        const offscreenVideo = document.createElement('video');
        offscreenVideo.crossOrigin = 'anonymous';
        offscreenVideo.muted = true;
        offscreenVideo.playsInline = true;
        offscreenVideo.src = VIDEO_URL;
        offscreenVideo.preload = 'auto';

        await new Promise((resolve) => {
          offscreenVideo.onloadeddata = resolve;
        });

        const totalFrames = 60;
        const duration = offscreenVideo.duration;
        const cache: ImageBitmap[] = [];

        for (let i = 0; i < totalFrames; i++) {
          const time = (i / (totalFrames - 1)) * (duration - 0.05);
          offscreenVideo.currentTime = time;

          await new Promise((res) => {
            const onSeek = () => {
              offscreenVideo.removeEventListener('seeked', onSeek);
              res(true);
            };
            offscreenVideo.addEventListener('seeked', onSeek);
          });

          if (createImageBitmap) {
            const bitmap = await createImageBitmap(offscreenVideo, {
              resizeWidth: Math.min(window.innerWidth, 960),
            });
            cache.push(bitmap);
          }
        }

        if (cache.length > 0) {
          frameCacheRef.current = cache;
          setFramesReady(true);
        }
      } catch (e) {
        // Fallback to direct video seeking
        console.warn('Frame cache extraction fallback to direct seek:', e);
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setTimeout(() => {
        extractFrames();
      }, 300);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    // Animation Loop with Lerp Smoothing
    let lastSeekTime = 0;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      smoothedProgress += (targetProgress - smoothedProgress) * 0.12;

      if (framesReady && frameCacheRef.current.length > 0) {
        const cache = frameCacheRef.current;
        const frameIndex = Math.min(
          Math.floor(smoothedProgress * cache.length),
          cache.length - 1
        );
        const frame = cache[frameIndex];
        if (frame) {
          drawCanvasFrame(frame);
        }
      } else if (video.duration) {
        const targetTime = smoothedProgress * (video.duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
        if (video.readyState >= 2) {
          drawCanvasFrame(video);
        }
      }
    };

    tick();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [framesReady]);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none select-none">
      {/* Hidden/Direct Video Source */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded && !framesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Render Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          framesReady ? 'opacity-100' : 'opacity-80'
        }`}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
};
