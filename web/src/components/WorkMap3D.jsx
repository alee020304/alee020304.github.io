import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Line, Grid } from "@react-three/drei";
import { WORK, EDGES } from "../data/work.js";

const TYPE_COLOR = {
  experience: "#d7a24a",
  project: "#5b8db8",
  community: "#9c9284"
};

function Node({ item, dim, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const scale = dim ? 0.65 : hovered ? 1.3 : 1;

  return (
    <group position={item.pos}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={scale}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={TYPE_COLOR[item.type]}
          emissive={TYPE_COLOR[item.type]}
          emissiveIntensity={dim ? 0.08 : 0.4}
          transparent
          opacity={dim ? 0.28 : 1}
        />
      </mesh>
      <Html distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div className={"node-label" + (dim ? " dim" : "")}>{item.name}</div>
      </Html>
    </group>
  );
}

function Edges() {
  return (
    <>
      {EDGES.map(([a, b], i) => {
        const A = WORK.find((n) => n.id === a);
        const B = WORK.find((n) => n.id === b);
        if (!A || !B) return null;
        return <Line key={i} points={[A.pos, B.pos]} color="#3a332c" lineWidth={1} />;
      })}
    </>
  );
}

export default function WorkMap3D({ activeTags, onSelect }) {
  return (
    <Canvas camera={{ position: [0, 6.5, 8.5], fov: 42 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#221d18"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 3]} intensity={1} color="#f3e7cf" />
      <Grid
        args={[20, 20]}
        cellColor="#332c25"
        sectionColor="#332c25"
        cellSize={1}
        sectionSize={4}
        fadeDistance={16}
        position={[0, -0.6, 0]}
        infiniteGrid
      />
      <Edges />
      {WORK.map((item) => {
        const dim = activeTags.size > 0 && !item.tags.some((t) => activeTags.has(t));
        return <Node key={item.id} item={item} dim={dim} onSelect={onSelect} />;
      })}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5.5}
        maxDistance={13}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
