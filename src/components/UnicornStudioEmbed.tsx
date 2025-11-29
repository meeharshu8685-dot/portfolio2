import { useEffect, useRef } from 'react';

// TypeScript declaration for Unicorn Studio
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}

interface UnicornStudioEmbedProps {
  projectId?: string;
  width?: string;
  height?: string;
  className?: string;
}

export const UnicornStudioEmbed: React.FC<UnicornStudioEmbedProps> = ({
  projectId = 'XzhzTPcYBnCqQFQn4Wa7',
  width = '1200px',
  height = '675px',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Unicorn Studio script if not already loaded
    const loadUnicornStudio = () => {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false };
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.36/dist/unicornStudio.umd.js';
        script.async = true;
        script.onload = () => {
          if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            if (window.UnicornStudio.init) {
              window.UnicornStudio.init();
              window.UnicornStudio.isInitialized = true;
            }
          }
        };
        script.onerror = () => {
          console.error('Failed to load Unicorn Studio script');
        };
        (document.head || document.body).appendChild(script);
        scriptLoadedRef.current = true;
      } else if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        if (window.UnicornStudio.init) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadUnicornStudio();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-us-project={projectId}
      style={{ width, height, display: 'inline-block' }}
      className={className}
    />
  );
};

export default UnicornStudioEmbed;
