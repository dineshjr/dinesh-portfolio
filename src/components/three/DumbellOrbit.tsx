import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DumbbellOrbit() {
    const groupRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (orbitRef.current) {
            orbitRef.current.rotation.y = t * 0.5;
            orbitRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
        }
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
        }
    });

    const PlateGroup = ({ x }: { x: number }) => (
        <group position={[x, 0, 0]}>
            {/* Outer plate */}
            <mesh castShadow>
                <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
                <meshStandardMaterial color={0x2a2018} roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Inner plate */}
            <mesh castShadow position={[x > 0 ? -0.06 : 0.06, 0, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
                <meshStandardMaterial color={0x3d2314} roughness={0.4} metalness={0.6} />
            </mesh>
        </group>
    );

    return (
        <group ref={groupRef}>
            <group ref={orbitRef}>
                {/* Bar */}
                <mesh castShadow>
                    <cylinderGeometry args={[0.06, 0.06, 2.4, 16]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color={0xc8874a} roughness={0.2} metalness={0.9} />
                </mesh>

                {/* Plates */}
                <PlateGroup x={-0.9} />
                <PlateGroup x={0.9} />

                {/* Collars */}
                {[-0.6, 0.6].map((x, i) => (
                    <mesh key={i} position={[x, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
                        <meshStandardMaterial color={0xf0c060} roughness={0.1} metalness={1} />
                    </mesh>
                ))}
            </group>

            {/* Glow */}
            <pointLight color={0xf0c060} intensity={0.6} distance={4} position={[0, 1, 0]} />
        </group>
    );
}