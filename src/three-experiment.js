import * as THREE from "three";

const mount = document.getElementById("stage");

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

if (!mount || !canUseWebGL()) {
  document.body.classList.add("no-webgl");
} else {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x11101a, 8, 18);

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 7.4);
  camera.lookAt(0, -0.15, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const skin = new THREE.MeshStandardMaterial({ color: 0xf1d8cf, roughness: 0.62 });
  const hair = new THREE.MeshStandardMaterial({ color: 0xf2f4ff, roughness: 0.52, metalness: 0.06 });
  const suit = new THREE.MeshStandardMaterial({ color: 0x252033, roughness: 0.5, metalness: 0.16 });
  const cape = new THREE.MeshStandardMaterial({ color: 0x151521, roughness: 0.5, metalness: 0.12, side: THREE.DoubleSide });
  const violet = new THREE.MeshStandardMaterial({ color: 0x725a9f, roughness: 0.45, metalness: 0.22 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd7a24f, roughness: 0.36, metalness: 0.64 });
  const ink = new THREE.MeshStandardMaterial({ color: 0x1b1826, roughness: 0.38, metalness: 0.18 });

  const figure = new THREE.Group();
  figure.position.y = -0.25;
  scene.add(figure);

  function add(geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], parent = figure) {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(...position);
    item.scale.set(...scale);
    item.rotation.set(...rotation);
    parent.add(item);
    return item;
  }

  add(new THREE.CapsuleGeometry(0.62, 1.7, 12, 28), suit, [0, -0.78, 0], [0.9, 1, 0.58]);
  add(new THREE.ConeGeometry(1.7, 2.8, 5), cape, [0, -1.18, 0.28], [1, 1, 0.26], [0.12, 0, Math.PI]);
  add(new THREE.SphereGeometry(0.54, 36, 24), skin, [0, 0.72, 0.05], [0.95, 1.05, 0.9]);
  add(new THREE.SphereGeometry(0.64, 32, 18), hair, [0, 1.0, 0], [1.08, 0.62, 1.0]);
  add(new THREE.ConeGeometry(0.14, 0.84, 10), hair, [-0.5, 0.67, 0.1], [1, 1, 0.72], [0.38, 0, 0.42]);
  add(new THREE.ConeGeometry(0.14, 0.78, 10), hair, [0.44, 0.68, 0.1], [1, 1, 0.72], [0.38, 0, -0.36]);
  add(new THREE.BoxGeometry(0.13, 0.036, 0.034), ink, [-0.18, 0.72, 0.52]);
  add(new THREE.BoxGeometry(0.13, 0.036, 0.034), ink, [0.18, 0.72, 0.52]);
  add(new THREE.TorusGeometry(0.15, 0.012, 8, 24), gold, [0, 0.5, 0.54], [1, 0.28, 1]);
  add(new THREE.CapsuleGeometry(0.13, 1.16, 8, 18), suit, [-0.68, -0.52, 0.02], [0.88, 1, 0.88], [0.18, 0, 0.34]);
  add(new THREE.CapsuleGeometry(0.13, 1.16, 8, 18), suit, [0.68, -0.52, 0.02], [0.88, 1, 0.88], [0.18, 0, -0.34]);
  add(new THREE.BoxGeometry(1.12, 0.075, 0.07), gold, [0, 0.08, 0.52]);
  add(new THREE.SphereGeometry(0.12, 18, 12), violet, [0, -0.04, 0.58]);

  const crown = new THREE.Group();
  crown.position.set(0, 1.46, 0.04);
  figure.add(crown);
  add(new THREE.TorusGeometry(0.36, 0.018, 8, 42), gold, [0, 0, 0], [1, 0.18, 1], [0, 0, 0], crown);
  [-0.2, 0, 0.2].forEach((x, index) => {
    add(new THREE.ConeGeometry(0.045, index === 1 ? 0.26 : 0.2, 8), gold, [x, 0.1, 0], [1, 1, 1], [0, 0, 0], crown);
  });

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(3.8, 80),
    new THREE.MeshStandardMaterial({ color: 0x1b1728, roughness: 0.82, metalness: 0.08 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.18;
  scene.add(floor);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.012, 8, 160), gold);
  ring.position.y = -2.08;
  ring.rotation.x = Math.PI / 2;
  ring.material.opacity = 0.56;
  ring.material.transparent = true;
  scene.add(ring);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x251d35, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(0x9d82ff, 22, 8);
  rim.position.set(-2.6, 1.8, 3.2);
  scene.add(rim);

  let targetY = 0;
  let dragStart = null;
  window.addEventListener("pointerdown", (event) => {
    dragStart = event.clientX;
  });
  window.addEventListener("pointermove", (event) => {
    if (dragStart === null) return;
    targetY += (event.clientX - dragStart) * 0.006;
    dragStart = event.clientX;
  });
  window.addEventListener("pointerup", () => {
    dragStart = null;
  });

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize);

  function animate(time = 0) {
    figure.rotation.y += (targetY - figure.rotation.y) * 0.08;
    figure.position.y = -0.25 + Math.sin(time * 0.0012) * 0.04;
    crown.rotation.y = Math.sin(time * 0.001) * 0.12;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
