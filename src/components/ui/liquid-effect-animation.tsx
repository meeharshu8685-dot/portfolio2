"use client"
import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Load the script dynamically
    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        // Use a dark gradient image that matches the portfolio theme
        app.loadImage('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200');
        app.liquidPlane.material.metalness = 0.9;
        app.liquidPlane.material.roughness = 0.2;
        app.liquidPlane.uniforms.displacementScale.value = 2.5;
        app.setRain(false);
        window.__liquidApp = app;
      }
    `
    document.body.appendChild(script)

    return () => {
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
      }
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 z-0 w-full h-full overflow-hidden opacity-70 transition-all duration-500 pointer-events-none"
      style={{ fontFamily: '"Montserrat", serif' }}
    >
      <canvas ref={canvasRef} id="liquid-canvas" className="absolute inset-0 w-full h-full pointer-events-none" />
      {/* Gradient overlay to match theme colors */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.4) 100%)',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApp?: any
  }
}
