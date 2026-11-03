import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line, Grid } from "@react-three/drei";
import { WORK, CATEGORIES } from "../data/work.js";

const PLANET_RADIUS = 4.6;

function reducedMotionPreferred() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Planet({ cat, position, dim }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={dim ? 0.15 : 0.55}
          transparent
          opacity={dim ? 0.35 : 1}
        />
      </mesh>
      <Html distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div className={"planet-label" + (dim ? " dim" : "")} style={{ borderColor: cat.color }}>
          {cat.label}
        </div>
      </Html>
    </group>
  );
}

function OrbitRing({ center, radius, color, dim }) {
  const points = useMemo(() => {
    const segments = 64;
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push([center[0] + radius * Math.cos(a), center[1], center[2] + radius * Math.sin(a)]);
    }
    return pts;
  }, [center, radius]);

  return <Line points={points} color={color} transparent opacity={dim ? 0.07 : 0.22} lineWidth={1} />;
}

function Satellite({ item, cat, planetPos, orbitRadius, orbitSpeed, phase, dim, onSelect }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useMemo(reducedMotionPreferred, []);

  const initialPos = useMemo(
    () => [
      planetPos[0] + orbitRadius * Math.cos(phase),
      planetPos[1],
      planetPos[2] + orbitRadius * Math.sin(phase)
    ],
    [planetPos, orbitRadius, phase]
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = reduceMotion ? 0 : state.clock.elapsedTime;
    const angle = phase + t * orbitSpeed;
    group.current.position.set(
      planetPos[0] + orbitRadius * Math.cos(angle),
      planetPos[1] + Math.sin(angle * 2 + phase) * 0.12,
      planetPos[2] + orbitRadius * Math.sin(angle)
    );
  });

  return (
    <group ref={group} position={initialPos}>
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
        scale={dim ? 0.6 : hovered ? 1.35 : 1}
      >
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={dim ? 0.08 : 0.42}
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

export default function WorkMap3D({ activeCategories, onSelect }) {
  const planetPositions = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((cat, i) => {
      const angle = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
      map[cat.id] = [PLANET_RADIUS * Math.cos(angle), 0, PLANET_RADIUS * Math.sin(angle)];
    });
    return map;
  }, []);

  const byCategory = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((cat) => {
      map[cat.id] = WORK.filter((w) => w.category === cat.id);
    });
    return map;
  }, []);

  return (
    <Canvas camera={{ position: [0, 9.5, 14], fov: 42 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#221d18"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 4]} intensity={1} color="#f3e7cf" />
      <Grid
        args={[34, 34]}
        cellColor="#332c25"
        sectionColor="#332c25"
        cellSize={1}
        sectionSize={5}
        fadeDistance={24}
        position={[0, -0.9, 0]}
        infiniteGrid
      />
      {CATEGORIES.map((cat) => {
        const dim = activeCategories.size > 0 && !activeCategories.has(cat.id);
        const items = byCategory[cat.id];
        return (
          <group key={cat.id}>
            <Planet cat={cat} position={planetPositions[cat.id]} dim={dim} />
            {items.map((item, i) => {
              const orbitRadius = 1.15 + i * 0.5;
              const orbitSpeed = (0.1 + (i % 3) * 0.03) * (i % 2 === 0 ? 1 : -1);
              const phase = i * (Math.PI / 2.3) + cat.id.length;
              return (
                <group key={item.id}>
                  <OrbitRing center={planetPositions[cat.id]} radius={orbitRadius} color={cat.color} dim={dim} />
                  <Satellite
                    item={item}
                    cat={cat}
                    planetPos={planetPositions[cat.id]}
                    orbitRadius={orbitRadius}
                    orbitSpeed={orbitSpeed}
                    phase={phase}
                    dim={dim}
                    onSelect={onSelect}
                  />
                </group>
              );
            })}
          </group>
        );
      })}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={7}
        maxDistance={21}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
