import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const PETAL_PINK = new THREE.Color("#f6cede");
const PETAL_PINK_DEEP = new THREE.Color("#e992b4");
const STAMEN_GOLD = new THREE.Color("#f2c25a");
const BUD_ROSE = new THREE.Color("#d1668a");

/**
 * Authentic sakura petal outline: an obovate lobe with the characteristic
 * emarginate (notched) tip, drawn point-first so (0,0) is the base that
 * attaches to the flower's center.
 */
function petalShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.46, 0.18, 0.52, 0.64, 0.25, 0.94);
  s.bezierCurveTo(0.17, 1.03, 0.09, 1.01, 0.045, 0.92);
  s.quadraticCurveTo(0, 0.87, -0.045, 0.92);
  s.bezierCurveTo(-0.09, 1.01, -0.17, 1.03, -0.25, 0.94);
  s.bezierCurveTo(-0.52, 0.64, -0.46, 0.18, 0, 0);
  return s;
}

function coloredPetalGeometry(color: THREE.Color, deepColor?: THREE.Color): THREE.BufferGeometry {
  const geo = new THREE.ShapeGeometry(petalShape(), 10);
  geo.computeVertexNormals();

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp(pos.getY(i), 0, 1);
    const c = deepColor ? deepColor.clone().lerp(color, t) : color;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

/** A single detached petal, pivoted at its own centroid for natural tumbling. */
export function createLoosePetalGeometry(): THREE.BufferGeometry {
  const geo = coloredPetalGeometry(PETAL_PINK, PETAL_PINK_DEEP);
  geo.translate(0, -0.52, 0);
  return geo;
}

/** A full 5-petal cherry blossom flower with a small golden stamen cluster. */
export function createFlowerGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  for (let i = 0; i < 5; i++) {
    const petal = coloredPetalGeometry(PETAL_PINK, PETAL_PINK_DEEP);
    petal.rotateZ((i / 5) * Math.PI * 2);
    parts.push(petal);
  }

  const stamen = new THREE.CircleGeometry(0.09, 12);
  stamen.computeVertexNormals();
  stamen.translate(0, 0, 0.01);
  const stamenColors = new Float32Array(stamen.attributes.position.count * 3);
  for (let i = 0; i < stamen.attributes.position.count; i++) {
    stamenColors[i * 3] = STAMEN_GOLD.r;
    stamenColors[i * 3 + 1] = STAMEN_GOLD.g;
    stamenColors[i * 3 + 2] = STAMEN_GOLD.b;
  }
  stamen.setAttribute("color", new THREE.BufferAttribute(stamenColors, 3));
  parts.push(stamen);

  return mergeGeometries(parts, false);
}

/** A closed, unopened bud — a single narrow, elongated petal form. */
export function createBudGeometry(): THREE.BufferGeometry {
  const geo = coloredPetalGeometry(BUD_ROSE);
  geo.scale(0.55, 0.72, 1);
  return geo;
}
