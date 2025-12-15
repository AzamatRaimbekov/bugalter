import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ParticleGlobe = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create particles with more density and structure
  const particleCount = 700;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      const r = 3.5 + Math.random() * 0.2; // Consistent sphere surface
      
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    // Smoother rotation based on scroll and time
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08 + scrollY * 0.0001;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 + scrollY * 0.0001;
    }
  });

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#0ea5e9"
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Inner Core Glowing Sphere */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#0c4a6e" transparent opacity={0.1} wireframe />
      </mesh>
      
      {/* Outer Connecting Lines (Abstract) */}
       <mesh rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const BackgroundElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.5;
      groupRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
       {/* Floating Geometric Shapes */}
       <mesh position={[6, 3, -5]}>
         <octahedronGeometry args={[1, 0]} />
         <meshStandardMaterial color="#d4af37" transparent opacity={0.4} metalness={0.8} roughness={0.2} />
       </mesh>
       <mesh position={[-6, -4, -3]}>
         <dodecahedronGeometry args={[1.2, 0]} />
         <meshStandardMaterial color="#0ea5e9" transparent opacity={0.3} metalness={0.8} roughness={0.2} />
       </mesh>
    </group>
  )
}

export const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />
        <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#d4af37" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <ParticleGlobe />
        </Float>
        
        <BackgroundElements />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#0f172a', 8, 25]} />
      </Canvas>
    </div>
  );
};