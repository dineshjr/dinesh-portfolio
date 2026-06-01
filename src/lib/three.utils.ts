import * as THREE from "three";

// Create a warm lofi point light setup
export function createLofiLighting(scene: THREE.Scene) {
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.4);
    scene.add(ambientLight);

    // Key light — warm amber
    const keyLight = new THREE.PointLight(0xf0c060, 2, 20);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Fill light — cool mist
    const fillLight = new THREE.PointLight(0xb8c4cc, 0.8, 15);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    // Rim light — warm brown
    const rimLight = new THREE.PointLight(0xc8874a, 1.2, 12);
    rimLight.position.set(0, -2, -5);
    scene.add(rimLight);

    return { ambientLight, keyLight, fillLight, rimLight };
}

// Generate firefly particle geometry
export function createParticleGeometry(
    count: number,
    spread: number
): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const warmColors = [
        new THREE.Color(0xf0c060), // gold
        new THREE.Color(0xc8874a), // amber
        new THREE.Color(0xd4a574), // warm
        new THREE.Color(0xfff5e6), // cream
    ];

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Spread particles in a sphere
        positions[i3] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * spread;

        const color = warmColors[Math.floor(Math.random() * warmColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return geometry;
}

// Lerp helper for smooth camera movement
export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

// Map a value from one range to another
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

// Create a lofi-style material with warm tones
export function createLofiMaterial(
    color: THREE.ColorRepresentation = 0xd4a574,
    roughness = 0.7,
    metalness = 0.1
): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        envMapIntensity: 0.5,
    });
}

// Create a glowing sphere (ambient orb)
export function createGlowSphere(
    radius: number,
    color: THREE.ColorRepresentation,
    intensity = 1
) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15 * intensity,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Outer glow
    const glowGeometry = new THREE.SphereGeometry(radius * 1.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.05 * intensity,
        side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    mesh.add(glow);

    return mesh;
}

// Dispose of Three.js objects properly
export function disposeObject(obj: THREE.Object3D) {
    obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
            } else {
                child.material.dispose();
            }
        }
    });
}

// Smooth float animation values
export function getFloatValues(
    time: number,
    amplitude = 0.3,
    frequency = 0.5
) {
    return {
        y: Math.sin(time * frequency) * amplitude,
        rotX: Math.sin(time * frequency * 0.7) * 0.05,
        rotY: Math.cos(time * frequency * 0.5) * 0.08,
        rotZ: Math.sin(time * frequency * 0.3) * 0.03,
    };
}