import './App.css'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Box(props) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const mesh = useRef()
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.005
  })
  
  return (
    <mesh
      position={props.position}
      ref={mesh}
      castShadow
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry attach="geometry" args={props.geo}/>
      <meshStandardMaterial attach="material" color={hovered ? '#f25e41' : '#e83a2e'}/>
    </mesh>
  )
}

function Plane(props) {
  const mesh = useRef()
  
  return (
    <mesh
      position={props.position}
      ref={mesh}
      receiveShadow
      scale={1.5}
    >
      <boxGeometry attach="geometry" args={props.geo}/>
      <meshStandardMaterial attach="material" color='white'/>
    </mesh>
  )
}

function App() {
  return (
    <Canvas 
      gl={{
        antialias: true,
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap
        }
      }} 
      camera={{
        position: [0, 1, -5],
        castShadow: true,
      }}
      shadows
      style={{ 
        height: window.innerHeight,
        backgroundColor: "#212121"
      }}
    >
      <ambientLight 
        intensity={0.5}
      />
      <directionalLight
        castShadow
        intensity={0.5} 
        position={[10, 5, -1]}
      />
      <group>
        <Box position={[0, 0.1, 0]} geo={[1,1,1]}/>
        <Plane position={[0, -2, 0]} geo={[20,1,20]}/>
      </group>
    </Canvas>
  )
}

export default App
