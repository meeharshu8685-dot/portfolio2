"use client";

import { useEffect, useRef } from "react";

type SplashCursorProps = {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
};

/**
 * Lightweight "splash" cursor background.
 * NOTE: This is a simplified implementation inspired by the provided snippet,
 * not a 1:1 WebGL port. It draws glowing circles that follow the cursor.
 */
export function SplashCursor({
  SPLAT_RADIUS = 0.12,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.02, g: 0, b: 0.08 },
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    let hue = 0;
    let cursorX = 0;
    let cursorY = 0;
    let hasCursor = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const handleMove = (x: number, y: number) => {
      cursorX = x;
      cursorY = y;
      hasCursor = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handleMove(t.clientX, t.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize);

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Background fade
      ctx.fillStyle = `rgba(${BACK_COLOR.r * 255}, ${BACK_COLOR.g * 255}, ${
        BACK_COLOR.b * 255
      }, 0.3)`;
      ctx.fillRect(0, 0, width, height);

      if (hasCursor) {
        hue = (hue + COLOR_UPDATE_SPEED * dt * 10) % 360;
        const radius = Math.max(width, height) * SPLAT_RADIUS;
        const gradient = ctx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          radius
        );

        gradient.addColorStop(
          0,
          `hsla(${hue}, 100%, 65%, ${Math.min(1, SPLAT_FORCE / 8000)})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
    };
  }, [SPLAT_RADIUS, SPLAT_FORCE, COLOR_UPDATE_SPEED, BACK_COLOR.r, BACK_COLOR.g, BACK_COLOR.b]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}


