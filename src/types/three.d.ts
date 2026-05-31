/* ============================================
   THREE.JS TYPE AUGMENTATIONS
   ============================================ */

import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

// Extend R3F JSX elements with any custom Three.js objects
declare module "@react-three/fiber" {
    interface ThreeElements {
        mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
        group: Object3DNode<THREE.Group, typeof THREE.Group>;
    }
}

// GLSL shader module declarations
declare module "*.vert" {
    const src: string;
    export default src;
}

declare module "*.frag" {
    const src: string;
    export default src;
}

declare module "*.glsl" {
    const src: string;
    export default src;
}