import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isMuted] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [starStyle, setStarStyle] = useState<{
    x: number;
    y: number;
    size: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    size: 0,
    visible: false,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      videoRef.current.play().catch(() => { });
    }
    // Trigger smooth staggered entrance on mount
    const timer = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      const W = window.innerWidth || containerRef.current.clientWidth;
      const H = window.innerHeight || containerRef.current.clientHeight;
      if (!W || !H) return;

      // Lock container to exact innerHeight so mobile address bars don't cause overflow
      containerRef.current.style.height = `${H}px`;
      containerRef.current.style.minHeight = `${H}px`;

      const videoAspect = 16 / 9;
      const containerAspect = W / H;

      let renderedW: number;
      let renderedH: number;
      let videoLeft = 0;
      let videoTop = 0;

      if (containerAspect >= videoAspect) {
        // Viewport is wider than 16:9 - video fits width, centers vertically
        renderedW = W;
        renderedH = W / videoAspect;
        videoTop = (H - renderedH) / 2;
      } else {
        // Viewport is taller than 16:9 - video fits height, centers horizontally
        renderedH = H;
        renderedW = H * videoAspect;
        videoLeft = (W - renderedW) / 2;
      }

      // Measured from 4K video source (3840 x 2160):
      // Right watermark star center:
      // X = 3479.5 / 3840 = 0.90612 of video width
      // Y = 1799.5 / 2160 = 0.83310 of video height
      //
      // Mirrored left star center (equal height & equal distance from edges):
      // X = (1 - 0.90612) = 0.09388 of video width
      // Y = 0.83310 of video height (exact same vertical line as right star)
      const rawX = videoLeft + renderedW * 0.09388;
      const rawY = videoTop + renderedH * 0.83310;
      const scale = renderedH / 1080;

      const isMobile = W < 640;
      const finalX = Math.max(32, rawX);
      const finalY = rawY;
      // In 1080p, the container is 90px holding the exact 74px star:
      const finalSize = Math.round(90 * scale);

      setStarStyle({
        x: Math.round(finalX),
        y: Math.round(finalY),
        size: finalSize,
        visible: !isMobile,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('orientationchange', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('orientationchange', updatePosition);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[100svh] h-[100dvh] min-h-[100svh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black select-none"
      style={{ minHeight: '100dvh', height: '100dvh' }}
    >
      {/* ========================================================
          TRUE FULLSCREEN CINEMATIC 4K VIDEO HERO
          Pure edge-to-edge cinematic video of Manish Yadav.
          Contains:
          - Real authentic studio footage of Manish
          - Smooth seamless continuous loop
          ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
        <video
          ref={videoRef}
          key="hero-exact-user-walk-clean-v5"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 0.75;
          }}
          onPlay={(e) => {
            e.currentTarget.playbackRate = 0.75;
          }}
          onRateChange={(e) => {
            if (e.currentTarget.playbackRate !== 0.75) {
              e.currentTarget.playbackRate = 0.75;
            }
          }}
          className="w-full h-full object-cover object-center"
        >
          <source src="/hero-cinematic-intro-4k.mp4?v=clean-v5" type="video/mp4" media="(min-width: 1024px)" />
          <source src="/hero-cinematic-intro.mp4?v=clean-v5" type="video/mp4" />
        </video>

        {/* Ultra-subtle bottom edge blend for page transition and movie-poster contrast */}
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================
          CINEMATIC MOVIE POSTER TITLE (Anchored at the Bottom)
          3-Row Theatrical Poster Typography:
          - Row 1: WELCOME TO MY WORLD
          - Row 2: SOFTWARE ENGINEER
          - Row 3: MANISH YADAV (Grand Crimson Red Blockbuster Title)
          Centered cleanly between the symmetrical stars.
          Lifted safely above mobile navigation / home bars.
          ======================================================== */}
      <div className="absolute bottom-4 xs:bottom-5 sm:bottom-5 md:bottom-6 lg:bottom-7 inset-x-0 z-20 flex flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom,0px)] text-center pointer-events-none select-none">
        {/* Row 1: WELCOME TO MY WORLD */}
        <div
          className="transition-all"
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '2800ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            willChange: 'opacity, transform',
          }}
        >
          <span
            className="block whitespace-nowrap text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-bold tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.22em] leading-none text-white/95 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] select-none"
            style={{ wordSpacing: '-0.05em' }}
          >
            WELCOME TO MY WORLD
          </span>
        </div>

        {/* Row 2: SOFTWARE ENGINEER */}
        <div
          className="transition-all mt-1 sm:mt-1.5"
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '3050ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            willChange: 'opacity, transform',
          }}
        >
          <span
            className="block whitespace-nowrap text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-[13px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em] leading-none text-white/80 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] select-none"
            style={{ wordSpacing: '-0.05em' }}
          >
            SOFTWARE ENGINEER
          </span>
        </div>

        {/* Row 3: MANISH YADAV */}
        <div
          className="transition-all -mt-0.5 sm:-mt-1 md:-mt-1.5"
          style={{
            transitionDuration: '2800ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '1800ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            willChange: 'opacity, transform',
          }}
        >
          <h1
            className="block font-black uppercase leading-[0.85] select-none text-[#e50914] drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] drop-shadow-[0_0_50px_rgba(229,9,20,0.52)] animate-[crimsonGlow_4s_ease-in-out_infinite]"
            style={{
              fontFamily: "'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(2.1rem, 7.8vw, 6.6rem)',
              letterSpacing: '0.035em',
              wordSpacing: '0.06em',
              animationDelay: '5200ms',
            }}
          >
            MANISH YADAV
          </h1>
        </div>
      </div>

      {/* Symmetrical Left Star Logo: Hidden on mobile screens, visible on tablets and desktops */}
      {starStyle.visible && (
        <div
          className="hidden sm:block absolute z-20 pointer-events-none select-none"
          style={{
            left: `${starStyle.x}px`,
            top: `${starStyle.y}px`,
            transform: 'translate(-50%, -50%)',
            width: `${starStyle.size}px`,
            height: `${starStyle.size}px`,
          }}
        >
          <img
            src="/hero-left-star.png"
            alt="Hero Left Star"
            className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.06)]"
            draggable={false}
          />
        </div>
      )}

      <style>{`
        @keyframes crimsonGlow {
          0%, 100% {
            filter: drop-shadow(0 8px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 35px rgba(229,9,20,0.4));
          }
          50% {
            filter: drop-shadow(0 8px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 55px rgba(229,9,20,0.65));
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
