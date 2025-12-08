import { motion } from 'framer-motion';
import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SplashScreenProps {
    onComplete: () => void;
}

// 3D Laptop Component
function Laptop3D({ animationProgress }: { animationProgress: number }) {
    const laptopRef = useRef<THREE.Group>(null);
    const lidRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    useFrame(() => {
        if (!laptopRef.current || !lidRef.current || !screenRef.current) return;

        const progress = animationProgress;

        // Stage 1: Laptop Reveal (0.0-0.2s) - bounce/settle
        if (progress <= 0.2) {
            const bounceProgress = progress / 0.2;
            const bounce = Math.sin(bounceProgress * Math.PI) * 0.1;
            laptopRef.current.position.y = -0.5 + bounceProgress * 0.5 + bounce;
            laptopRef.current.scale.setScalar(0.8 + bounceProgress * 0.2);
        }

        // Stage 2: Hinge Wiggle (0.2-0.3s)
        if (progress > 0.2 && progress <= 0.3) {
            const wiggleProgress = (progress - 0.2) / 0.1;
            const wiggle = Math.sin(wiggleProgress * Math.PI * 4) * 0.02;
            if (lidRef.current) {
                lidRef.current.rotation.x = wiggle;
            }
        }

        // Stage 3: Opening (0.3-1.2s) - physics-based
        if (progress > 0.3 && progress <= 1.2) {
            const openProgress = (progress - 0.3) / 0.9;
            // Custom easing: slow start, fast middle, soft end
            let angle = 0;
            if (openProgress < 0.3) {
                // Slow from 0° → 30°
                angle = (openProgress / 0.3) * 30;
            } else if (openProgress < 0.8) {
                // Fast until ~70°
                angle = 30 + ((openProgress - 0.3) / 0.5) * 40;
            } else {
                // Soft ease to 110°
                const finalProgress = (openProgress - 0.8) / 0.2;
                angle = 70 + finalProgress * finalProgress * 40;
            }
            if (lidRef.current) {
                lidRef.current.rotation.x = -(angle * Math.PI) / 180;
            }
        }

        // Stage 4: Screen Light-up (1.0-1.4s)
        if (progress > 1.0 && progress <= 1.4) {
            const lightProgress = (progress - 1.0) / 0.4;
            if (screenRef.current && screenRef.current.material) {
                const mat = screenRef.current.material as THREE.MeshStandardMaterial;
                mat.emissiveIntensity = lightProgress * 1.5;
            }
        }

        // Stage 5: Camera Transition (1.4-2.0s)
        if (progress > 1.4 && progress <= 2.0) {
            const zoomProgress = (progress - 1.4) / 0.6;
            const eased = 1 - Math.pow(1 - zoomProgress, 3); // ease out cubic

            // Camera flies into the screen
            camera.position.z = 5 - eased * 4.5;
            camera.position.y = 0 - eased * 0.5;

            // Zoom effect
            if (camera instanceof THREE.PerspectiveCamera) {
                camera.fov = 50 + eased * 30;
                camera.updateProjectionMatrix();
            }
        }
    });

    return (
        <group ref={laptopRef} position={[0, -0.5, 0]}>
            {/* Base (keyboard area) */}
            <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 0.1, 2]} />
                <meshStandardMaterial
                    color="#8a8a8a"
                    metalness={0.8}
                    roughness={0.2}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Keyboard detail */}
            <mesh position={[0, 0.01, 0.1]}>
                <boxGeometry args={[2.6, 0.02, 1.6]} />
                <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Lid (screen) - rotates */}
            <group ref={lidRef} position={[0, 0, -1]}>
                {/* Lid back */}
                <mesh position={[0, 1, 0]} castShadow>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshStandardMaterial
                        color="#9a9a9a"
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={1.2}
                    />
                </mesh>

                {/* Screen bezel */}
                <mesh position={[0, 1, 0.06]}>
                    <boxGeometry args={[2.9, 1.9, 0.02]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
                </mesh>

                {/* Screen display */}
                <mesh ref={screenRef} position={[0, 1, 0.08]}>
                    <planeGeometry args={[2.6, 1.6]} />
                    <meshStandardMaterial
                        color="#000000"
                        emissive="#4a9eff"
                        emissiveIntensity={0}
                        metalness={0.1}
                        roughness={0.9}
                    />
                </mesh>

                {/* Logo on screen */}
                <group position={[0, 1, 0.09]}>
                    {/* H letter */}
                    <mesh position={[-0.3, 0, 0]}>
                        <boxGeometry args={[0.1, 0.6, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#6366f1" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[-0.1, 0, 0]}>
                        <boxGeometry args={[0.3, 0.1, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#6366f1" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[0.1, 0, 0]}>
                        <boxGeometry args={[0.1, 0.6, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#6366f1" emissiveIntensity={2} />
                    </mesh>

                    {/* V letter */}
                    <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, 0.3]}>
                        <boxGeometry args={[0.1, 0.5, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#a855f7" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -0.3]}>
                        <boxGeometry args={[0.1, 0.5, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#a855f7" emissiveIntensity={2} />
                    </mesh>
                </group>
            </group>

            {/* Hinge detail */}
            <mesh position={[0, 0, -1]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
                <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Lighting */}
            <pointLight position={[0, 3, 2]} intensity={0.5} color="#4a9eff" />
            <pointLight position={[2, 1, 2]} intensity={0.3} color="#ffffff" />
        </group>
    );
}

// 3D Scene
function Scene({ animationProgress }: { animationProgress: number }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
            <directionalLight position={[-5, 3, -5]} intensity={0.3} />

            <Laptop3D animationProgress={animationProgress} />

            {/* Ground plane for reflections */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.8}
                    roughness={0.2}
                    opacity={0.5}
                    transparent
                />
            </mesh>
        </>
    );
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [animationProgress, setAnimationProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000; // 2 seconds

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1) * 2; // 0 to 2 scale

            setAnimationProgress(progress);

            if (progress >= 2) {
                // Start fade out
                setFadeOut(true);
                setTimeout(() => {
                    onComplete();
                }, 500);
            } else {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            }}
        >
            {/* Ambient glow effects */}
            <motion.div
                animate={{
                    opacity: animationProgress > 1.0 ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(74, 158, 255, 0.3) 0%, transparent 70%)',
                }}
            />

            {/* Motion blur effect during camera zoom */}
            {animationProgress > 1.4 && animationProgress <= 2.0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="absolute inset-0 bg-gradient-radial from-transparent to-blue-500/20"
                    style={{
                        filter: 'blur(20px)',
                    }}
                />
            )}

            {/* 3D Canvas */}
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Scene animationProgress={animationProgress} />
                </Suspense>
            </Canvas>

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
            />
        </motion.div>
    );
};
