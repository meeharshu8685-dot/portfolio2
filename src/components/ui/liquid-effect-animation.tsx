// "use client" - not required for Vite, but kept to match the provided snippet
"use client";

import { useEffect, useRef } from "react";

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let app: any | undefined;

    const init = async () => {
      if (!canvasRef.current) return;

      try {
        // Dynamically import the liquid background module at runtime
        const mod: any = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js"
        );

        const LiquidBackground = mod.default ?? mod.LiquidBackground ?? mod;
        const canvas = document.getElementById("liquid-canvas") as HTMLCanvasElement | null;
        if (!canvas || !LiquidBackground) return;

        app = LiquidBackground(canvas);

        app.loadImage(
          "https://i.pinimg.com/1200x/38/71/c9/3871c9c7a6066df6763c97dc3285c907.jpg"
        );

        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;

        app.setRain(false);

        window.__liquidApp = app;
      } catch (error) {
        console.error("Failed to initialize LiquidEffectAnimation:", error);
      }
    };

    void init();

    return () => {
      if (app && typeof app.dispose === "function") {
        app.dispose();
      }
      if (window.__liquidApp && typeof window.__liquidApp.dispose === "function") {
        window.__liquidApp.dispose();
      }
      window.__liquidApp = undefined;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 m-0 w-full h-full touch-none overflow-hidden"
      style={{ fontFamily: '"Montserrat", serif' }}
    >
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="fixed inset-0 w-full h-full"
      />
    </div>
  );
}

declare global {
  interface Window {
    __liquidApp?: any;
  }
}


