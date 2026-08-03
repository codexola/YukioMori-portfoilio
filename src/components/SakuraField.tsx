"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  createBudGeometry,
  createFlowerGeometry,
  createLoosePetalGeometry,
} from "@/lib/sakuraGeometry";

const BLOOM_COUNT = 30;
const AMBIENT_PETAL_COUNT = 40;
const BURST_POOL_SIZE = 220;

const OPEN_RADIUS = 2.6;
const SCATTER_RADIUS = 3.4;
const CLICK_OPEN_RADIUS = 4.2;
const CLICK_SCATTER_RADIUS = 5.5;

const HOVER_EMIT_INTERVAL = 0.12;
const HOVER_EMIT_COUNT = 2;
const CLICK_EMIT_COUNT = 32;

const GRAVITY = 1.35;
const DRAG = 0.9;

type Bloom = {
  x: number;
  y: number;
  z: number;
  baseX: number;
  fallSpeed: number;
  driftSpeed: number;
  driftAmp: number;
  phase: number;
  rotSpeed: number;
  scale: number;
  openness: number;
  opened: boolean;
};

type AmbientPetal = {
  x: number;
  y: number;
  z: number;
  baseX: number;
  fallSpeed: number;
  driftSpeed: number;
  driftAmp: number;
  phase: number;
  rotSpeed: number;
  scale: number;
  scatterVX: number;
  scatterVY: number;
};

type BurstPetal = {
  active: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  rvx: number;
  rvy: number;
  rvz: number;
  life: number;
  maxLife: number;
  scale: number;
};

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function spawnBloom(): Bloom {
  const baseX = randRange(-15, 15);
  return {
    x: baseX,
    y: randRange(-6, 18),
    z: randRange(-8, 6),
    baseX,
    fallSpeed: randRange(0.3, 0.6),
    driftSpeed: randRange(0.25, 0.55),
    driftAmp: randRange(0.5, 1.1),
    phase: Math.random() * Math.PI * 2,
    rotSpeed: randRange(-0.3, 0.3),
    scale: randRange(0.32, 0.5),
    openness: 0,
    opened: false,
  };
}

function spawnAmbientPetal(): AmbientPetal {
  const baseX = randRange(-15, 15);
  return {
    x: baseX,
    y: randRange(-6, 18),
    z: randRange(-8, 6),
    baseX,
    fallSpeed: randRange(0.35, 0.85),
    driftSpeed: randRange(0.3, 0.7),
    driftAmp: randRange(0.6, 1.3),
    phase: Math.random() * Math.PI * 2,
    rotSpeed: randRange(-0.7, 0.7),
    scale: randRange(0.12, 0.2),
    scatterVX: 0,
    scatterVY: 0,
  };
}

function makeBurstPool(): BurstPetal[] {
  return new Array(BURST_POOL_SIZE).fill(0).map(() => ({
    active: false,
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    rvx: 0,
    rvy: 0,
    rvz: 0,
    life: 0,
    maxLife: 1,
    scale: 0.16,
  }));
}

export default function SakuraField() {
  const budsRef = useRef<THREE.InstancedMesh>(null);
  const flowersRef = useRef<THREE.InstancedMesh>(null);
  const ambientRef = useRef<THREE.InstancedMesh>(null);
  const burstRef = useRef<THREE.InstancedMesh>(null);

  const budGeometry = useMemo(() => createBudGeometry(), []);
  const flowerGeometry = useMemo(() => createFlowerGeometry(), []);
  const petalGeometry = useMemo(() => createLoosePetalGeometry(), []);

  const blooms = useMemo(() => new Array(BLOOM_COUNT).fill(0).map(spawnBloom), []);
  const ambientPetals = useMemo(
    () => new Array(AMBIENT_PETAL_COUNT).fill(0).map(spawnAmbientPetal),
    []
  );
  const burstPool = useMemo(() => makeBurstPool(), []);
  const burstCursor = useRef(0);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pointerNDC = useRef({ x: 0, y: 0 });
  const pointerActive = useRef(false);
  const clickQueue = useRef<{ x: number; y: number }[]>([]);
  const hoverEmitTimer = useRef(0);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const cursorWorld = useMemo(() => new THREE.Vector3(), []);
  const tmpWorld = useMemo(() => new THREE.Vector3(), []);

  const { camera } = useThree();

  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointerNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerActive.current = true;
    }
    function onLeave() {
      pointerActive.current = false;
    }
    function onDown(e: PointerEvent) {
      clickQueue.current.push({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  function ndcToWorld(ndcX: number, ndcY: number, out: THREE.Vector3): THREE.Vector3 | null {
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const hit = raycaster.ray.intersectPlane(groundPlane, out);
    return hit;
  }

  function spawnBurst(cx: number, cy: number, cz: number, count: number, strength: [number, number]) {
    for (let n = 0; n < count; n++) {
      const p = burstPool[burstCursor.current % BURST_POOL_SIZE];
      burstCursor.current++;
      const angle = Math.random() * Math.PI * 2;
      const speed = randRange(strength[0], strength[1]);
      p.active = true;
      p.x = cx;
      p.y = cy;
      p.z = cz;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.abs(Math.sin(angle)) * speed * 0.8 + randRange(0.2, 0.8);
      p.vz = randRange(-0.6, 0.6);
      p.rx = Math.random() * Math.PI * 2;
      p.ry = Math.random() * Math.PI * 2;
      p.rz = Math.random() * Math.PI * 2;
      p.rvx = randRange(-4, 4);
      p.rvy = randRange(-4, 4);
      p.rvz = randRange(-4, 4);
      p.maxLife = randRange(1.6, 2.8);
      p.life = p.maxLife;
      p.scale = randRange(0.14, 0.26);
    }
  }

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);

    let hasCursor = false;
    if (pointerActive.current) {
      hasCursor = !!ndcToWorld(pointerNDC.current.x, pointerNDC.current.y, cursorWorld);
    }

    // --- drain click queue: force blooms open + scatter petals + shower burst ---
    if (clickQueue.current.length > 0) {
      for (const click of clickQueue.current) {
        const hit = ndcToWorld(click.x, click.y, tmpWorld);
        if (!hit) continue;

        for (const b of blooms) {
          const dx = b.baseX - tmpWorld.x;
          const dy = b.y - tmpWorld.y;
          if (dx * dx + dy * dy < CLICK_OPEN_RADIUS * CLICK_OPEN_RADIUS) b.opened = true;
        }
        for (const ap of ambientPetals) {
          const dx = ap.x - tmpWorld.x;
          const dy = ap.y - tmpWorld.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CLICK_SCATTER_RADIUS * CLICK_SCATTER_RADIUS) {
            const dist = Math.max(0.4, Math.sqrt(distSq));
            const force = (1 - dist / CLICK_SCATTER_RADIUS) * 6;
            ap.scatterVX += (dx / dist) * force;
            ap.scatterVY += (dy / dist) * force + force * 0.4;
          }
        }
        spawnBurst(tmpWorld.x, tmpWorld.y, tmpWorld.z, CLICK_EMIT_COUNT, [1.8, 3.6]);
      }
      clickQueue.current.length = 0;
    }

    // --- hover: open nearby blooms, scatter nearby petals, light trickle emission ---
    if (hasCursor) {
      for (const b of blooms) {
        const dx = b.baseX - cursorWorld.x;
        const dy = b.y - cursorWorld.y;
        if (dx * dx + dy * dy < OPEN_RADIUS * OPEN_RADIUS) b.opened = true;
      }
      for (const ap of ambientPetals) {
        const dx = ap.x - cursorWorld.x;
        const dy = ap.y - cursorWorld.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < SCATTER_RADIUS * SCATTER_RADIUS) {
          const dist = Math.max(0.3, Math.sqrt(distSq));
          const force = (1 - dist / SCATTER_RADIUS) * 3.2;
          ap.scatterVX += (dx / dist) * force * delta * 6;
          ap.scatterVY += (dy / dist) * force * delta * 6 + force * delta * 2;
        }
      }

      hoverEmitTimer.current -= delta;
      if (hoverEmitTimer.current <= 0) {
        hoverEmitTimer.current = HOVER_EMIT_INTERVAL;
        spawnBurst(cursorWorld.x, cursorWorld.y, cursorWorld.z, HOVER_EMIT_COUNT, [0.5, 1.3]);
      }
    }

    // --- blooms: fall, drift, ease openness, cross-fade bud <-> flower ---
    for (let i = 0; i < blooms.length; i++) {
      const b = blooms[i];
      b.y -= b.fallSpeed * delta;
      b.phase += delta * b.driftSpeed;
      b.x = b.baseX + Math.sin(b.phase) * b.driftAmp;
      if (b.y < -8) {
        b.baseX = randRange(-15, 15);
        b.y = randRange(14, 20);
        b.opened = false;
        b.openness = 0;
      }
      b.openness = THREE.MathUtils.lerp(b.openness, b.opened ? 1 : 0, Math.min(1, delta * 3.2));

      const rot = b.phase * b.rotSpeed + b.phase;

      if (budsRef.current) {
        dummy.position.set(b.x, b.y, b.z);
        dummy.rotation.set(rot * 0.4, rot, rot * 0.3);
        dummy.scale.setScalar(b.scale * (1 - b.openness));
        dummy.updateMatrix();
        budsRef.current.setMatrixAt(i, dummy.matrix);
      }
      if (flowersRef.current) {
        dummy.position.set(b.x, b.y, b.z);
        dummy.rotation.set(rot * 0.25, rot * 0.6, rot * 0.15);
        dummy.scale.setScalar(b.scale * b.openness);
        dummy.updateMatrix();
        flowersRef.current.setMatrixAt(i, dummy.matrix);
      }
    }
    if (budsRef.current) budsRef.current.instanceMatrix.needsUpdate = true;
    if (flowersRef.current) flowersRef.current.instanceMatrix.needsUpdate = true;

    // --- ambient loose petals: fall, drift, decaying scatter impulse ---
    for (let i = 0; i < ambientPetals.length; i++) {
      const ap = ambientPetals[i];
      ap.y -= ap.fallSpeed * delta;
      ap.phase += delta * ap.driftSpeed;

      ap.scatterVX *= Math.max(0, 1 - delta * 1.6);
      ap.scatterVY *= Math.max(0, 1 - delta * 1.6);
      ap.baseX += ap.scatterVX * delta;
      ap.y += ap.scatterVY * delta;

      ap.x = ap.baseX + Math.sin(ap.phase) * ap.driftAmp;

      if (ap.y < -8) {
        ap.baseX = randRange(-15, 15);
        ap.y = randRange(14, 20);
        ap.scatterVX = 0;
        ap.scatterVY = 0;
      }

      if (ambientRef.current) {
        const rot = ap.phase;
        dummy.position.set(ap.x, ap.y, ap.z);
        dummy.rotation.set(rot * 0.5, rot * ap.rotSpeed, rot * 0.3);
        dummy.scale.setScalar(ap.scale);
        dummy.updateMatrix();
        ambientRef.current.setMatrixAt(i, dummy.matrix);
      }
    }
    if (ambientRef.current) ambientRef.current.instanceMatrix.needsUpdate = true;

    // --- burst pool: integrate physics, fade out, deactivate ---
    for (let i = 0; i < burstPool.length; i++) {
      const p = burstPool[i];
      if (!p.active) {
        if (burstRef.current) {
          dummy.position.set(0, -9999, 0);
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          burstRef.current.setMatrixAt(i, dummy.matrix);
        }
        continue;
      }

      p.life -= delta;
      if (p.life <= 0) {
        p.active = false;
        continue;
      }

      p.vy -= GRAVITY * delta;
      const dragFactor = Math.max(0, 1 - DRAG * delta);
      p.vx *= dragFactor;
      p.vz *= dragFactor;

      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.z += p.vz * delta;

      p.rx += p.rvx * delta;
      p.ry += p.rvy * delta;
      p.rz += p.rvz * delta;

      const lifeFrac = p.life / p.maxLife;
      const fade = lifeFrac < 0.3 ? lifeFrac / 0.3 : 1;

      if (burstRef.current) {
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rx, p.ry, p.rz);
        dummy.scale.setScalar(p.scale * fade);
        dummy.updateMatrix();
        burstRef.current.setMatrixAt(i, dummy.matrix);
      }
    }
    if (burstRef.current) burstRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={budsRef} args={[budGeometry, undefined, BLOOM_COUNT]}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.75} />
      </instancedMesh>
      <instancedMesh ref={flowersRef} args={[flowerGeometry, undefined, BLOOM_COUNT]}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.7} />
      </instancedMesh>
      <instancedMesh ref={ambientRef} args={[petalGeometry, undefined, AMBIENT_PETAL_COUNT]}>
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          roughness={0.8}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
      <instancedMesh ref={burstRef} args={[petalGeometry, undefined, BURST_POOL_SIZE]}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.7} />
      </instancedMesh>
    </group>
  );
}
