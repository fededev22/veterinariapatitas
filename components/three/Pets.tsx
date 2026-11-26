"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import type { Group } from "three";
import type { PetKind } from "@/lib/config";

function Mat({ color, roughness = 0.5 }: { color: string; roughness?: number }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={0.03} />;
}

function usePetMotion(boop: number, wagSpeed: number) {
  const group = useRef<Group>(null);
  const tail = useRef<Group>(null);
  const ears = useRef<Group>(null);
  const head = useRef<Group>(null);
  const look = useRef<Group>(null);
  const blink = useRef<Group>(null);
  const wingL = useRef<Group>(null);
  const wingR = useRef<Group>(null);
  const velocity = useRef(0);
  const height = useRef(0);
  const seen = useRef(boop);
  const { pointer } = useThree();

  useEffect(() => {
    if (boop !== seen.current) {
      seen.current = boop;
      velocity.current = 6;
    }
  }, [boop]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const step = Math.min(delta, 0.05);
    velocity.current -= 18 * step;
    height.current += velocity.current * step;
    if (height.current < 0) {
      height.current = 0;
      velocity.current = 0;
    }
    if (group.current) {
      group.current.position.y = height.current + Math.sin(t * 2) * 0.04;
    }
    if (tail.current) tail.current.rotation.y = Math.sin(t * wagSpeed) * 0.6;
    if (ears.current) ears.current.rotation.z = Math.sin(t * 2.4) * 0.05;
    if (head.current) {
      head.current.rotation.y += (pointer.x * 0.55 - head.current.rotation.y) * 0.12;
      head.current.rotation.x += (-pointer.y * 0.3 - head.current.rotation.x) * 0.12;
    }
    if (look.current) {
      look.current.position.x = pointer.x * 0.04;
      look.current.position.y = pointer.y * 0.03;
    }
    if (blink.current) {
      blink.current.scale.y = Math.sin(t * 1.6) > 0.985 ? 0.12 : 1;
    }
    if (wingL.current) wingL.current.rotation.z = Math.sin(t * 7) * 0.45 + 0.3;
    if (wingR.current) wingR.current.rotation.z = -Math.sin(t * 7) * 0.45 - 0.3;
  });

  return { group, tail, ears, head, look, blink, wingL, wingR };
}

function Eyes({
  look,
  blink,
  x = 0.18,
  y = 0.06,
  z = 0.34,
  scale = 1,
}: {
  look: RefObject<Group | null>;
  blink: RefObject<Group | null>;
  x?: number;
  y?: number;
  z?: number;
  scale?: number;
}) {
  return (
    <>
      <mesh position={[-x, y, z]} scale={scale}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <Mat color="#fffaf4" roughness={0.25} />
      </mesh>
      <mesh position={[x, y, z]} scale={scale}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <Mat color="#fffaf4" roughness={0.25} />
      </mesh>
      <group ref={look}>
        <group ref={blink}>
          <mesh position={[-x, y, z + 0.06]} scale={scale}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <Mat color="#1b2422" roughness={0.3} />
          </mesh>
          <mesh position={[x, y, z + 0.06]} scale={scale}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <Mat color="#1b2422" roughness={0.3} />
          </mesh>
          <mesh position={[-x + 0.02, y + 0.02, z + 0.1]} scale={scale}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <Mat color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[x + 0.02, y + 0.02, z + 0.1]} scale={scale}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <Mat color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
      </group>
    </>
  );
}

export function PetModel({
  pet,
  boop,
  onGreet,
}: {
  pet: PetKind;
  boop: number;
  onGreet: () => void;
}) {
  if (pet === "gato") return <Cat boop={boop} onGreet={onGreet} />;
  if (pet === "ave") return <Bird boop={boop} onGreet={onGreet} />;
  if (pet === "exotico") return <Chameleon boop={boop} onGreet={onGreet} />;
  return <Dog boop={boop} onGreet={onGreet} />;
}

function Dog({ boop, onGreet }: { boop: number; onGreet: () => void }) {
  const { group, tail, ears, head, look, blink } = usePetMotion(boop, 10);
  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onGreet();
      }}
    >
        <>
          <mesh position={[0, -0.2, 0]} scale={[1.15, 0.86, 1]}>
            <sphereGeometry args={[0.62, 28, 28]} />
            <Mat color="#f6d7a8" />
          </mesh>
          <mesh position={[0, -0.28, 0.2]} scale={[0.7, 0.55, 0.55]}>
            <sphereGeometry args={[0.48, 24, 24]} />
            <Mat color="#fff6ea" />
          </mesh>
          {[-0.32, 0.32].map((x) =>
            [-0.15, 0.28].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.78, z]}>
                <cylinderGeometry args={[0.09, 0.11, 0.42, 16]} />
                <Mat color="#f0c892" />
              </mesh>
            )),
          )}
          <group ref={tail} position={[0, 0.05, -0.62]}>
            <mesh position={[0, 0.22, -0.18]} rotation={[0.7, 0, 0]} scale={[0.28, 0.28, 0.72]}>
              <sphereGeometry args={[0.45, 20, 20]} />
              <Mat color="#e7b07a" />
            </mesh>
          </group>
          <group ref={head} position={[0, 0.48, 0.38]}>
            <mesh>
              <sphereGeometry args={[0.46, 28, 28]} />
              <Mat color="#f6d7a8" />
            </mesh>
            <group ref={ears}>
              <mesh position={[-0.36, 0.02, -0.02]} rotation={[0, 0, 0.7]} scale={[0.55, 1.15, 0.28]}>
                <sphereGeometry args={[0.28, 18, 18]} />
                <Mat color="#e7b07a" />
              </mesh>
              <mesh position={[0.36, 0.02, -0.02]} rotation={[0, 0, -0.7]} scale={[0.55, 1.15, 0.28]}>
                <sphereGeometry args={[0.28, 18, 18]} />
                <Mat color="#e7b07a" />
              </mesh>
            </group>
            <mesh position={[0, -0.08, 0.34]} scale={[0.7, 0.55, 0.75]}>
              <sphereGeometry args={[0.28, 20, 20]} />
              <Mat color="#fff1df" />
            </mesh>
            <mesh position={[0, -0.02, 0.52]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <Mat color="#3d2c29" roughness={0.35} />
            </mesh>
            <Eyes look={look} blink={blink} />
            <mesh position={[0, -0.22, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.045, 12, 24]} />
              <Mat color="#c4452d" roughness={0.4} />
            </mesh>
          </group>
        </>
    </group>
  );
}

function Cat({ boop, onGreet }: { boop: number; onGreet: () => void }) {
  const { group, tail, head, look, blink } = usePetMotion(boop, 4.5);
  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onGreet();
      }}
    >
        <>
          <mesh position={[0, -0.22, 0]} scale={[1, 0.82, 0.95]}>
            <sphereGeometry args={[0.58, 28, 28]} />
            <Mat color="#f7f1ea" />
          </mesh>
          <mesh position={[0, -0.32, 0.16]} scale={[0.62, 0.45, 0.45]}>
            <sphereGeometry args={[0.42, 20, 20]} />
            <Mat color="#ffffff" />
          </mesh>
          {[-0.26, 0.26].map((x) =>
            [-0.1, 0.24].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.74, z]}>
                <cylinderGeometry args={[0.07, 0.09, 0.36, 12]} />
                <Mat color="#f4ece4" />
              </mesh>
            )),
          )}
          <group ref={tail} position={[0, 0.05, -0.5]}>
            <mesh position={[0.15, 0.45, -0.15]} rotation={[0.4, 0, 0.8]}>
              <capsuleGeometry args={[0.07, 0.7, 6, 12]} />
              <Mat color="#f7f1ea" />
            </mesh>
          </group>
          <group ref={head} position={[0, 0.42, 0.36]}>
            <mesh>
              <sphereGeometry args={[0.42, 28, 28]} />
              <Mat color="#f7f1ea" />
            </mesh>
            <mesh position={[-0.22, 0.38, 0]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.16, 0.38, 4]} />
              <Mat color="#f7f1ea" />
            </mesh>
            <mesh position={[0.22, 0.38, 0]} rotation={[0, 0, -0.2]}>
              <coneGeometry args={[0.16, 0.38, 4]} />
              <Mat color="#f7f1ea" />
            </mesh>
            <mesh position={[-0.22, 0.34, 0.04]} rotation={[0.2, 0, 0.2]} scale={[0.55, 0.7, 0.2]}>
              <coneGeometry args={[0.14, 0.28, 4]} />
              <Mat color="#f3b7c8" />
            </mesh>
            <mesh position={[0.22, 0.34, 0.04]} rotation={[0.2, 0, -0.2]} scale={[0.55, 0.7, 0.2]}>
              <coneGeometry args={[0.14, 0.28, 4]} />
              <Mat color="#f3b7c8" />
            </mesh>
            <mesh position={[0, -0.08, 0.36]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <Mat color="#e89aaa" />
            </mesh>
            <Eyes look={look} blink={blink} x={0.16} y={0.05} z={0.3} scale={1.05} />
            {[-0.18, 0, 0.18].map((y) => (
              <mesh key={`w-${y}`} position={[0.34, y * 0.15 - 0.02, 0.2]} rotation={[0, 0, y]}>
                <boxGeometry args={[0.28, 0.012, 0.012]} />
                <Mat color="#d9cfc6" />
              </mesh>
            ))}
          </group>
        </>
    </group>
  );
}

function Bird({ boop, onGreet }: { boop: number; onGreet: () => void }) {
  const { group, head, look, blink, wingL, wingR, tail } = usePetMotion(boop, 6);
  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onGreet();
      }}
    >
        <>
          <mesh position={[0, -0.15, 0]} scale={[0.9, 1.05, 0.85]}>
            <sphereGeometry args={[0.62, 28, 28]} />
            <Mat color="#3ec6c6" />
          </mesh>
          <mesh position={[0, -0.22, 0.18]} scale={[0.55, 0.7, 0.4]}>
            <sphereGeometry args={[0.48, 22, 22]} />
            <Mat color="#ffe08a" />
          </mesh>
          <group ref={wingL} position={[-0.55, 0.05, 0]}>
            <mesh rotation={[0.2, 0, 0.4]} scale={[0.85, 0.35, 0.2]}>
              <sphereGeometry args={[0.42, 18, 18]} />
              <Mat color="#7ed0ea" />
            </mesh>
          </group>
          <group ref={wingR} position={[0.55, 0.05, 0]}>
            <mesh rotation={[0.2, 0, -0.4]} scale={[0.85, 0.35, 0.2]}>
              <sphereGeometry args={[0.42, 18, 18]} />
              <Mat color="#7ed0ea" />
            </mesh>
          </group>
          <group ref={tail} position={[0, -0.1, -0.55]}>
            {[ -0.18, 0, 0.18 ].map((x) => (
              <mesh key={x} position={[x, 0.05, -0.15]} rotation={[0.6, 0, x]} >
                <coneGeometry args={[0.1, 0.42, 8]} />
                <Mat color="#2aa3ad" />
              </mesh>
            ))}
          </group>
          <group ref={head} position={[0, 0.55, 0.18]}>
            <mesh>
              <sphereGeometry args={[0.4, 26, 26]} />
              <Mat color="#5fd0d4" />
            </mesh>
            <mesh position={[0, -0.08, 0.36]} rotation={[1.2, 0, 0]}>
              <coneGeometry args={[0.1, 0.28, 10]} />
              <Mat color="#ff8a6a" roughness={0.35} />
            </mesh>
            <Eyes look={look} blink={blink} x={0.15} y={0.06} z={0.28} scale={1.15} />
          </group>
          <mesh position={[0, -0.95, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.06, 1.3, 12]} />
            <Mat color="#d7b899" />
          </mesh>
        </>
    </group>
  );
}

function Chameleon({ boop, onGreet }: { boop: number; onGreet: () => void }) {
  const { group, tail, look, blink } = usePetMotion(boop, 3);
  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onGreet();
      }}
    >
        <>
          <mesh position={[0.1, -0.15, 0]} scale={[1.45, 0.62, 0.7]} rotation={[0, 0.3, 0]}>
            <sphereGeometry args={[0.55, 28, 28]} />
            <Mat color="#8ed47a" />
          </mesh>
          <mesh position={[0.15, -0.28, 0.12]} scale={[0.9, 0.32, 0.4]}>
            <sphereGeometry args={[0.4, 18, 18]} />
            <Mat color="#e7f58a" />
          </mesh>
          <mesh position={[-0.55, 0.05, 0.25]}>
            <sphereGeometry args={[0.34, 24, 24]} />
            <Mat color="#b6e38a" />
          </mesh>
          <mesh position={[-0.78, 0.18, 0.36]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <Mat color="#d8f5b0" />
          </mesh>
          <mesh position={[-0.55, 0.28, 0.22]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <Mat color="#d8f5b0" />
          </mesh>
          <group ref={look} position={[-0.78, 0.18, 0.48]}>
            <group ref={blink}>
              <mesh>
                <sphereGeometry args={[0.07, 14, 14]} />
                <Mat color="#16332f" />
              </mesh>
            </group>
          </group>
          <mesh position={[-0.5, 0.32, 0.32]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <Mat color="#16332f" />
          </mesh>
          <group ref={tail} position={[0.85, -0.05, -0.15]}>
            {Array.from({ length: 8 }, (_, index) => {
              const angle = index * 0.55;
              return (
                <mesh key={index} position={[Math.cos(angle) * 0.08, index * 0.08, -index * 0.08]}>
                  <sphereGeometry args={[0.1 - index * 0.008, 12, 12]} />
                  <Mat color={index % 2 ? "#e7f58a" : "#6fbf68"} />
                </mesh>
              );
            })}
          </group>
          {[-0.2, 0.35].map((x) => (
            <mesh key={x} position={[x, -0.62, 0.15]}>
              <cylinderGeometry args={[0.05, 0.07, 0.32, 8]} />
              <Mat color="#6fbf68" />
            </mesh>
          ))}
        </>
    </group>
  );
}
