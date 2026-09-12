import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number): string => {
  const pad = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${pad}.jpg?v=smooth-seq`;
};

const SmoothScrollAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnValueRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const getLoadedImg = (idx: number): HTMLImageElement | null => {
    const list = imagesRef.current;
    if (list[idx] && list[idx].complete && list[idx].naturalWidth > 0) {
      return list[idx];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = idx - offset;
      if (prev >= 0 && list[prev]?.complete && list[prev]?.naturalWidth > 0) {
        return list[prev];
      }
      const next = idx + offset;
      if (next < TOTAL_FRAMES && list[next]?.complete && list[next]?.naturalWidth > 0) {
        return list[next];
      }
    }
    return null;
  };

  const drawFrame = (currentProgress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentProgress));
    const indexA = Math.floor(clamped);
    const indexB = Math.min(TOTAL_FRAMES - 1, indexA + 1);
    const weightB = clamped - indexA;

    const imgA = getLoadedImg(indexA);
    const imgB = getLoadedImg(indexB);

    if (!imgA) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = imgA.naturalWidth;
    const imgHeight = imgA.naturalHeight;

    const isLandscape = canvasWidth >= canvasHeight;
    const zoom = isLandscape ? 0.78 : 0.88;
    const baseScale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const scale = baseScale * zoom;
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    let offsetX: number;
    let offsetY: number;

    if (isLandscape) {
      offsetX = Math.round(canvasWidth * 0.29);
      offsetY = Math.max(0, canvasHeight - drawHeight);
    } else {
      // Mobile / Portrait: shift slightly to the right (~15% of screen width)
      offsetX = Math.round((canvasWidth - drawWidth) / 2 + canvasWidth * 0.15);
      offsetY = Math.max(0, canvasHeight - drawHeight);
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw base Frame A with ambient smoke extension
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);

    if (offsetX > 0) {
      ctx.save();
      ctx.translate(offsetX, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(
        imgA,
        0,
        0,
        Math.round(imgWidth * 0.20),
        imgHeight,
        0,
        offsetY,
        offsetX,
        drawHeight
      );
      ctx.restore();
    }

    const rightEdge = offsetX + drawWidth;
    const rightGap = canvasWidth - rightEdge;
    if (rightGap > 0) {
      ctx.save();
      ctx.translate(rightEdge, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(
        imgA,
        Math.round(imgWidth * 0.80),
        0,
        Math.round(imgWidth * 0.20),
        imgHeight,
        -rightGap,
        offsetY,
        rightGap,
        drawHeight
      );
      ctx.restore();
    }

    // 2. Ultra-smooth sub-frame cross-blend: blend Frame B over Frame A
    if (weightB > 0.005 && imgB && imgB !== imgA) {
      ctx.globalAlpha = weightB;
      ctx.drawImage(imgB, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);

      if (offsetX > 0) {
        ctx.save();
        ctx.translate(offsetX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(
          imgB,
          0,
          0,
          Math.round(imgWidth * 0.20),
          imgHeight,
          0,
          offsetY,
          offsetX,
          drawHeight
        );
        ctx.restore();
      }

      if (rightGap > 0) {
        ctx.save();
        ctx.translate(rightEdge, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(
          imgB,
          Math.round(imgWidth * 0.80),
          0,
          Math.round(imgWidth * 0.20),
          imgHeight,
          -rightGap,
          offsetY,
          rightGap,
          drawHeight
        );
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
    }

    // 3. Softly dim the left-side color behind name & content for readability
    if (isLandscape && offsetX > 0) {
      const dimEnd = offsetX + Math.round(drawWidth * 0.25);
      const dimGrad = ctx.createLinearGradient(0, 0, dimEnd, 0);
      dimGrad.addColorStop(0, 'rgba(0, 0, 0, 0.70)');
      dimGrad.addColorStop(offsetX / dimEnd, 'rgba(0, 0, 0, 0.55)');
      dimGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = dimGrad;
      ctx.fillRect(0, 0, dimEnd, canvasHeight);
    }

    // 4. Soft top feathering into black above the image (offsetY)
    if (offsetY > 0) {
      const grad = ctx.createLinearGradient(0, 0, 0, offsetY + 35);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(offsetY / (offsetY + 35), '#000000');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasWidth, offsetY + 35);
    }
  };

  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    drawFrame(currentFrameRef.current);
  };

  useEffect(() => {
    updateCanvasSize();

    // 1. Preload all 240 frames
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (i === 0 && lastDrawnValueRef.current === -1) {
          drawFrame(0);
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;

    // 2. Track scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCanvasSize);
    handleScroll();

    // 3. Ultra-smooth continuous animation loop with momentum lerp
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.0001) {
        const factor = Math.abs(delta) > 15 ? 0.20 : 0.12;
        currentFrameRef.current += delta * factor;
      } else {
        currentFrameRef.current = target;
      }

      const currentVal = currentFrameRef.current;
      if (Math.abs(currentVal - lastDrawnValueRef.current) > 0.005) {
        drawFrame(currentVal);
        lastDrawnValueRef.current = currentVal;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCanvasSize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
};

export default SmoothScrollAnimation;
