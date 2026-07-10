import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
// import { FloatingParticles } from "./FloatingParticles";
import {FloatingParticles} from "@/components/three/FloatingParticles"
import { CassetteModel } from "./CassetteModel";

interface HeroSceneProps {
  scrollProgress?: number;
}

function AmbientOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.4) * 2;
      orb1Ref.current.position.y = Math.cos(t * 0.3) * 1.5;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.35) * 2.5;
      orb2Ref.current.position.y = Math.sin(t * 0.45) * 1.2;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref} position={[2, 1, -2]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color={0xf0c060} transparent opacity={0.08} />
      </mesh>
      <mesh ref={orb2Ref} position={[-2, -1, -3]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color={0xc8874a} transparent opacity={0.06} />
      </mesh>
    </>
  );
}

function SceneContent({ scrollProgress = 0 }: { scrollProgress: number }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color={0xfff5e6} />
      <pointLight position={[3, 4, 3]}  color={0xf0c060} intensity={2}   distance={20} />
      <pointLight position={[-4, 2, -2]} color={0xb8c4cc} intensity={0.8} distance={15} />
      <pointLight position={[0, -2, -5]} color={0xc8874a} intensity={1.2} distance={12} />

      {/* Main cassette */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <CassetteModel
          scrollProgress={scrollProgress}
          position={[1.2, 0, 0]}
          scale={1.1}
        />
      </Float>

      {/* Particles */}
      <FloatingParticles count={100} spread={12} size={0.035} speed={0.25} />

      {/* Ambient orbs */}
      <AmbientOrbs />

      {/* Small decorative rings */}
      <mesh position={[-2.5, 0.5, -1]} rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 60]} />
        <meshStandardMaterial color={0xf0c060} roughness={0.2} metalness={0.8} transparent opacity={0.5} />
      </mesh>
      <mesh position={[3, -0.8, -2]} rotation={[-0.2, 0.8, 0.1]}>
        <torusGeometry args={[0.35, 0.015, 16, 60]} />
        <meshStandardMaterial color={0xc8874a} roughness={0.2} metalness={0.8} transparent opacity={0.4} />
      </mesh>
    </>
  );
}

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}