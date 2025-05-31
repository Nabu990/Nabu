"use client"

import { Canvas } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Python', 'Three.js', 'TailwindCSS', 'Postgres'

]

function TechCube() {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!hovered) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color={hovered ? "#4f46e5" : "#2563eb"}
          metalness={0.5}
          roughness={0.2}
          envMapIntensity={2}
        />
        {technologies.map((tech, i) => (
          <Text
            key={tech}
            position={[
              Math.cos((i / technologies.length) * Math.PI * 2) * 2,
              Math.sin((i / technologies.length) * Math.PI * 2) * 2,
              0
            ]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        ))}
      </mesh>
    </Float>
  )
}

export function TechStack3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TechCube />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
