import './App.css'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function Well() {
  const materials = useLoader(MTLLoader, "well.mtl")
  const obj = useLoader(OBJLoader, 'well.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const objRef = useRef()
  //console.log(materials)

  useFrame((state, delta) => {
    objRef.current.rotation.y += 0.005

    objRef.current.children.map(children => {
      if(children.name !== "Plane_Plane_Material.003" &&
        children.name !== "Plane_Plane_Material.004" &&
        children.name !== "Plane.001_Plane.001_Material.003" &&
        children.name !== "Plane.001_Plane.001_Material.004"
      ){
        children.castShadow = true
        children.receiveShadow = true
      }
      else{
        children.castShadow = true
      }
      return null
    })
  })

  return <primitive castShadow receiveShadow ref={objRef} object={obj} scale={0.4}/>
}

function App() {
  return (
    <Canvas
      gl={{
        antialias: false,
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap
        },
      }} 
      camera={{
        position: [0, 7, 17],
        castShadow: true,
      }}
      shadows
      style={{ 
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: "#35a551"
      }}
      dpr={5}
      
    >
      <ambientLight intensity={0.01}/>
      <spotLight
        castShadow
        intensity={0.3}
        position={[-5, 10, 10]}
        color="#FEFFA5"
      />
      <spotLight
        castShadow
        intensity={0.3} 
        position={[10, 10, 10]}
        color="#FFDED1"
      />
      <spotLight
        castShadow
        intensity={0.1} 
        position={[5, 10, 10]}
        color="#B9DDFF"
      />
      <Suspense fallback={null}>
        <Well/>
      </Suspense>
    </Canvas>
  )
}

export default App
