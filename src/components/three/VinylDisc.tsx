import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface VinylDiscProps {
    isPlaying?: boolean;
    coverUrl?: string;
}

export function VinylDisc({ isPlaying = false, coverUrl }: VinylDiscProps) {
    const discRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Mesh>(null);
    const speedRef = useRef(0);

    useFrame((_, delta) => {
        if (!discRef.current) return;

        const targetSpeed = isPlaying ? 1.2 : 0;
        speedRef.current += (targetSpeed - speedRef.current) * 0.05;

        discRef.current.rotation.z -= speedRef.current * delta;

        // Gentle float
        discRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;
        discRef.current.rotation.x = Math.sin(Date.now() * 0.0007) * 0.05;
    });

    return (
        <group ref={discRef}>
            {/* Vinyl body */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[1.8, 1.8, 0.06, 80]} />
                <meshStandardMaterial
                    color={0x1a1208}
                    roughness={0.1}
                    metalness={0.8}
                    envMapIntensity={0.6}
                />
            </mesh>

            {/* Grooves (rings) */}
            {[0.6, 0.8, 1.0, 1.2, 1.4, 1.6].map((r, i) => (
                <mesh key={i} position={[0, 0.032, 0]}>
                    <ringGeometry args={[r - 0.01, r, 80]} />
                    <meshStandardMaterial
                        color={0x2a2018}
                        roughness={0.05}
                        metalness={0.9}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            {/* Center label */}
            <mesh ref={labelRef} position={[0, 0.035, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.01, 64]} />
                <meshStandardMaterial
                    color={0xc8874a}
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Center hole */}
            <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
                <meshStandardMaterial color={0x000000} />
            </mesh>

            {/* Warm glow when playing */}
            {isPlaying && (
                <pointLight
                    color={0xf0c060}
                    intensity={1.5}
                    distance={5}
                    position={[0, 1, 0]}
                />
            )}
        </group>
    );
}