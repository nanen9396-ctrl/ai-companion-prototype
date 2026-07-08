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

function makeTexture(draw) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  draw(context, canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function curvePlane(width, height, widthSegments, heightSegments, depth = 0.16) {
  const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index) / (width * 0.5);
    const y = positions.getY(index) / (height * 0.5);
    const edgeFalloff = Math.pow(Math.abs(x), 1.8) * depth;
    const chestLift = Math.max(0, 1 - Math.abs(y + 0.28) * 1.7) * 0.045;
    positions.setZ(index, -edgeFalloff + chestLift);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function fitPortrait(mesh, texture, viewportAspect) {
  const imageAspect = texture.image.width / texture.image.height;
  const isMobile = viewportAspect < 0.72;
  const height = isMobile ? 5.35 : 4.95;
  mesh.scale.set(height * imageAspect, height, 1);
  mesh.position.set(isMobile ? 0.02 : 0.2, isMobile ? -0.25 : -0.18, -0.06);
}

if (!mount || !canUseWebGL()) {
  document.body.classList.add("no-webgl");
} else {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x10101a, 8, 18);

  const camera = new THREE.PerspectiveCamera(31, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.25, 7.25);
  camera.lookAt(0.04, -0.05, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const stage = new THREE.Group();
  scene.add(stage);

  const backdropTexture = makeTexture((ctx, canvas) => {
    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#19162a");
    bg.addColorStop(0.48, "#0f1019");
    bg.addColorStop(1, "#15121c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const violet = ctx.createRadialGradient(680, 190, 40, 680, 190, 420);
    violet.addColorStop(0, "rgba(196,181,255,.46)");
    violet.addColorStop(1, "rgba(196,181,255,0)");
    ctx.fillStyle = violet;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gold = ctx.createRadialGradient(220, 770, 40, 220, 770, 360);
    gold.addColorStop(0, "rgba(216,171,93,.22)");
    gold.addColorStop(1, "rgba(216,171,93,0)");
    ctx.fillStyle = gold;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(10.5, 6.8, 1, 1),
    new THREE.MeshBasicMaterial({ map: backdropTexture }),
  );
  backdrop.position.set(0, 0, -1.45);
  stage.add(backdrop);

  const portraitGroup = new THREE.Group();
  portraitGroup.rotation.y = -0.08;
  stage.add(portraitGroup);

  const portraitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
  });
  const portrait = new THREE.Mesh(curvePlane(1, 1, 52, 92, 0.12), portraitMaterial);
  portraitGroup.add(portrait);

  const softShadow = new THREE.Mesh(
    curvePlane(1, 1, 32, 50, 0.18),
    new THREE.MeshBasicMaterial({
      color: 0x14111d,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
    }),
  );
  softShadow.position.set(0.12, -0.1, -0.22);
  softShadow.scale.set(1.08, 1.04, 1);
  portraitGroup.add(softShadow);

  const loader = new THREE.TextureLoader();
  loader.load("/assets/model-noble-hero.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    portraitMaterial.map = texture;
    portraitMaterial.needsUpdate = true;
    fitPortrait(portrait, texture, camera.aspect);
    fitPortrait(softShadow, texture, camera.aspect);
    softShadow.scale.multiplyScalar(1.06);
  });

  const halo = new THREE.Group();
  halo.position.set(0.22, 0.28, -0.48);
  stage.add(halo);
  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xbca8ff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.01, 8, 180), haloMaterial);
  haloRing.scale.set(1.16, 0.82, 1);
  halo.add(haloRing);
  const haloGlow = new THREE.Mesh(
    new THREE.CircleGeometry(1.45, 120),
    new THREE.MeshBasicMaterial({
      color: 0x7d70c8,
      transparent: true,
      opacity: 0.075,
      depthWrite: false,
    }),
  );
  haloGlow.scale.set(1.18, 0.82, 1);
  halo.add(haloGlow);

  const goldMaterial = new THREE.MeshBasicMaterial({
    color: 0xe6c47c,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
  });
  const whiteGlint = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });

  function strand(points, radius, material, parent = portraitGroup) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, radius, 8, false), material);
    parent.add(mesh);
    return mesh;
  }

  const hairGlints = new THREE.Group();
  portraitGroup.add(hairGlints);
  [
    [[-0.48, 1.4, 0.1], [-0.24, 1.05, 0.22], [-0.12, 0.74, 0.18]],
    [[-0.16, 1.46, 0.12], [0.04, 1.08, 0.25], [0.02, 0.82, 0.2]],
    [[0.22, 1.42, 0.08], [0.36, 1.02, 0.2], [0.28, 0.68, 0.16]],
    [[0.54, 1.1, 0.04], [0.58, 0.7, 0.12], [0.44, 0.34, 0.08]],
  ].forEach((points, index) => {
    const glint = strand(points, index === 1 ? 0.008 : 0.006, whiteGlint, hairGlints);
    glint.userData.phase = index * 0.8;
  });

  const ornaments = new THREE.Group();
  ornaments.position.set(0.28, -1.08, 0.18);
  portraitGroup.add(ornaments);
  const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 1), new THREE.MeshBasicMaterial({ color: 0x8c7dff }));
  ornaments.add(jewel);
  const jewelRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.009, 8, 64), goldMaterial);
  jewelRing.rotation.z = 0.18;
  ornaments.add(jewelRing);
  strand([[-0.24, 0.18, 0], [0, 0.04, 0.04], [0.26, 0.18, 0]], 0.008, goldMaterial, ornaments);
  strand([[0, -0.16, 0], [0.08, -0.42, 0.03], [0.02, -0.7, 0]], 0.006, goldMaterial, ornaments);

  const cape = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 4.3, 24, 24),
    new THREE.MeshBasicMaterial({
      color: 0x171421,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  cape.position.set(-0.08, -1.18, -0.32);
  cape.rotation.z = -0.04;
  portraitGroup.add(cape);

  const particles = new THREE.Group();
  stage.add(particles);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffefd1,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  });
  for (let index = 0; index < 42; index += 1) {
    const angle = (index / 42) * Math.PI * 2;
    const radius = 1.5 + (index % 7) * 0.16;
    const star = new THREE.Mesh(new THREE.SphereGeometry(0.012 + (index % 4) * 0.003, 8, 8), particleMaterial);
    star.position.set(Math.cos(angle) * radius, -1.45 + ((index * 37) % 100) / 28, -0.62 + Math.sin(angle) * 0.42);
    star.userData.phase = index * 0.37;
    particles.add(star);
  }

  let targetY = -0.03;
  let dragStart = null;
  window.addEventListener("pointerdown", (event) => {
    dragStart = event.clientX;
  });
  window.addEventListener("pointermove", (event) => {
    if (dragStart === null) return;
    targetY += (event.clientX - dragStart) * 0.0028;
    targetY = Math.max(-0.32, Math.min(0.32, targetY));
    dragStart = event.clientX;
  });
  window.addEventListener("pointerup", () => {
    dragStart = null;
  });

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (portraitMaterial.map) {
      fitPortrait(portrait, portraitMaterial.map, camera.aspect);
      fitPortrait(softShadow, portraitMaterial.map, camera.aspect);
      softShadow.scale.multiplyScalar(1.06);
    }
  }
  window.addEventListener("resize", resize);

  function animate(time = 0) {
    const seconds = time * 0.001;
    portraitGroup.rotation.y += (targetY - portraitGroup.rotation.y) * 0.06;
    portraitGroup.position.y = Math.sin(seconds * 1.1) * 0.018;
    halo.rotation.z = seconds * 0.035;
    jewel.rotation.z = seconds * 0.8;
    hairGlints.children.forEach((glint) => {
      glint.material.opacity = 0.45 + Math.sin(seconds * 1.4 + glint.userData.phase) * 0.18;
    });
    particles.children.forEach((star) => {
      star.position.y += Math.sin(seconds + star.userData.phase) * 0.0008;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
