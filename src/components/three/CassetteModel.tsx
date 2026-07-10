import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { getFloatValues } from "@/lib/three.utils";

interface CassetteModelProps {
    scrollProgress?: number;
    position?: [number, number, number];
    scale?: number;
}

// Fallback procedural cassette shape if GLB not loaded
function ProceduralCassette({ scrollProgress = 0 }: { scrollProgress: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        const f = getFloatValues(t, 0.25, 0.4);

        groupRef.current.position.y = f.y;
        groupRef.current.rotation.x = f.rotX + scrollProgress * 0.8;
        groupRef.current.rotation.y = t * 0.3 + scrollProgress * 1.2;
        groupRef.current.rotation.z = f.rotZ;
    });

    return (
        <group ref={groupRef}>
            {/* Cassette body */}
            <mesh castShadow>
                <boxGeometry args={[2.4, 1.4, 0.4]} />
                <meshStandardMaterial
                    color={0x3d2314}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Window cutout (dark inset) */}
            <mesh position={[0, 0.1, 0.21]}>
                <boxGeometry args={[1.6, 0.7, 0.02]} />
                <meshStandardMaterial color={0x1a1208} roughness={0.9} />
            </mesh>

            {/* Left reel */}
            <mesh position={[-0.5, 0.1, 0.22]}>
                <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
                <meshStandardMaterial color={0xc8874a} roughness={0.3} metalness={0.4} />
            </mesh>

            {/* Right reel */}
            <mesh position={[0.5, 0.1, 0.22]}>
                <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
                <meshStandardMaterial color={0xc8874a} roughness={0.3} metalness={0.4} />
            </mesh>

            {/* Label */}
            <mesh position={[0, -0.25, 0.21]}>
                <boxGeometry args={[2.1, 0.5, 0.01]} />
                <meshStandardMaterial color={0xf0c060} roughness={0.8} />
            </mesh>

            {/* Ambient glow */}
            <pointLight
                color={0xf0c060}
                intensity={0.8}
                distance={4}
                position={[0, 0, 1]}
            />
        </group>
    );
}

export function CassetteModel({
    scrollProgress = 0,
    position = [0, 0, 0],
    scale = 1,
}: CassetteModelProps) {
    const gltf = useGLTF("/models/cassette.glb");

    const groupRef = useRef<THREE.Group>(null);

    if (!gltf.scene) {
        return (
            <group position={position} scale={scale}>
                <ProceduralCassette scrollProgress={scrollProgress} />
            </group>
        );
    }

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <primitive object={gltf.scene} />
        </group>
    );
}