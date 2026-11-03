import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function valueNoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const tl = hash(xi, yi);
  const tr = hash(xi + 1, yi);
  const bl = hash(xi, yi + 1);
  const br = hash(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(tl, tr, u), THREE.MathUtils.lerp(bl, br, u), v);
}

function heightAt(x, z) {
  return valueNoise(x * 0.5 + 10, z * 0.5 + 10) * 1.0 + valueNoise(x * 1.3, z * 1.3) * 0.28;
}

function buildTerrainGeometry(size = 8, segments = 44) {
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  }
  geo.computeVertexNormals();
  return geo;
}

const PINS = [
  [-1.6, 0.9],
  [0.4, -1.2],
  [1.8, 0.6],
  [-0.6, 1.8],
  [2.3, -0.7]
];

function Terrain({ reduceMotion }) {
  const geo = useMemo(() => buildTerrainGeometry(), []);
  const mesh = useRef();
  const start = useRef(null);

  useFrame((state) => {
    if (!mesh.current) return;
    if (reduceMotion) {
      mesh.current.scale.y = 1;
      return;
    }
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = Math.min(1, (state.clock.elapsedTime - start.current) / 1.3);
    mesh.current.scale.y = 1 - Math.pow(1 - t, 3);
  });

  return (
    <mesh ref={mesh} geometry={geo} position={[0, -0.45, 0]}>
      <meshStandardMaterial color="#2a2319" flatShading />
    </mesh>
  );
}

function Pin({ x, z, delay, reduceMotion }) {
  const ref = useRef();
  const targetY = heightAt(x, z) - 0.45 + 0.16;
  const start = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (reduceMotion) {
      ref.current.position.set(x, targetY, z);
      ref.current.scale.setScalar(1);
      return;
    }
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = Math.min(1, Math.max(0, (state.clock.elapsedTime - start.current - delay) / 0.5));
    const eased = 1 - Math.pow(1 - t, 2);
    ref.current.position.set(x, targetY + (1 - eased) * 2, z);
    ref.current.scale.setScalar(Math.max(0.001, eased));
  });

  return (
    <mesh ref={ref} position={[x, targetY + 2, z]}>
      <coneGeometry args={[0.07, 0.22, 10]} />
      <meshStandardMaterial color="#d7a24a" emissive="#d7a24a" emissiveIntensity={0.35} />
    </mesh>
  );
}

export default function Hero3D() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  return (
    <Canvas camera={{ position: [3.6, 3.1, 4.8], fov: 36 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#221d18"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 2]} intensity={1.1} color="#f3e7cf" />
      <directionalLight position={[-3, 2, -4]} intensity={0.25} color="#5b8db8" />
      <Terrain reduceMotion={reduceMotion} />
      {PINS.map(([x, z], i) => (
        <Pin key={i} x={x} z={z} delay={i * 0.12} reduceMotion={reduceMotion} />
      ))}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.3}
      />
    </Canvas>
  );
}
