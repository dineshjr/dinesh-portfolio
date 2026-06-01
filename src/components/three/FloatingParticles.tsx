import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count?: number;
  spread?: number;
  size?: number;
  speed?: number;
}

export function FloatingParticles({
  count = 120,
  spread = 14,
  size = 0.04,
  speed = 0.3,
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const phases    = new Float32Array(count);

    const warmColors = [
      new THREE.Color(0xf0c060),
      new THREE.Color(0xc8874a),
      new THREE.Color(0xd4a574),
      new THREE.Color(0xfff5e6),
      new THREE.Color(0xf5e6c8),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;

      const c = warmColors[Math.floor(Math.random() * warmColors.length)];
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, phases };
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const pos = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      // Gentle float up and drift
      pos.array[i3 + 1] += Math.sin(t + phase) * 0.001;
      pos.array[i3]     += Math.cos(t * 0.7 + phase) * 0.0005;

      // Wrap vertically
      if (pos.array[i3 + 1] > spread / 2)  pos.array[i3 + 1] = -spread / 2;
      if (pos.array[i3 + 1] < -spread / 2) pos.array[i3 + 1] = spread / 2;
    }
    pos.needsUpdate = true;

    meshRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}