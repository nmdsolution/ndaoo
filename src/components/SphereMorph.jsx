import { useEffect, useRef } from 'react';
import sphereImg from '../assets/sphere4_1.webp';

// Animation du hero reprise de N-iX : 512 sprites CSS3D qui se transforment
// successivement en sphère, vague, cube puis nuage aléatoire. Desktop uniquement.
const PARTICLES = 512;
const TABLET = 992;
const LAPTOP = 1200;
const DESKTOP = 1440;

function rendererSize() {
  const w = window.innerWidth;
  if (w > DESKTOP) return [700, 600];
  if (w > LAPTOP) return [600, 500];
  return [500, 400];
}

function generateShapes() {
  const positions = [];

  // Sphère
  const radius = 550;
  for (let i = 0; i < PARTICLES; i++) {
    const phi = Math.acos(-1 + (2 * i) / PARTICLES);
    const theta = Math.sqrt(PARTICLES * Math.PI) * phi;
    positions.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi));
  }

  // Plan ondulé
  const amountX = 16;
  const amountZ = 32;
  const sepPlane = 150;
  const offsetX = ((amountX - 1) * sepPlane) / 2;
  const offsetZ = ((amountZ - 1) * sepPlane) / 2;
  for (let i = 0; i < PARTICLES; i++) {
    const x = (i % amountX) * sepPlane;
    const z = Math.floor(i / amountX) * sepPlane;
    const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;
    positions.push(x - offsetX, y, z - offsetZ);
  }

  // Cube
  const amount = 8;
  const sepCube = 150;
  const offset = ((amount - 1) * sepCube) / 2;
  for (let i = 0; i < PARTICLES; i++) {
    const x = (i % amount) * sepCube;
    const y = Math.floor((i / amount) % amount) * sepCube;
    const z = Math.floor(i / (amount * amount)) * sepCube;
    positions.push(x - offset, y - offset, z - offset);
  }

  // Aléatoire
  for (let i = 0; i < PARTICLES; i++) {
    positions.push(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
  }

  return positions;
}

export default function SphereMorph() {
  const ref = useRef(null);

  useEffect(() => {
    if (/jsdom/i.test(navigator.userAgent)) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let cleanup = () => {};
    let cancelled = false;

    const start = async () => {
      const [THREE, TWEEN, { TrackballControls }, { CSS3DRenderer, CSS3DSprite }] = await Promise.all([
        import('three'),
        import('three/addons/libs/tween.module.js'),
        import('three/addons/controls/TrackballControls.js'),
        import('three/addons/renderers/CSS3DRenderer.js'),
      ]);
      if (cancelled) return;

      const container = ref.current;
      const group = new TWEEN.Group();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(-2000, 5000, 3000);
      camera.lookAt(0, 0, 0);
      const scene = new THREE.Scene();

      const image = new Image();
      image.alt = '';
      image.src = sphereImg;
      await image.decode().catch(() => {});
      if (cancelled) return;

      const objects = [];
      for (let i = 0; i < PARTICLES; i++) {
        const object = new CSS3DSprite(image.cloneNode());
        object.position.set(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
        scene.add(object);
        objects.push(object);
      }

      const positions = generateShapes();
      let current = 0;
      const transition = () => {
        const offset = current * PARTICLES * 3;
        const duration = 2000;
        for (let i = 0, j = offset; i < PARTICLES; i++, j += 3) {
          new TWEEN.Tween(objects[i].position, group)
            .to({ x: positions[j], y: positions[j + 1], z: positions[j + 2] }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        }
        new TWEEN.Tween({}, group).to({}, duration * 3).onComplete(transition).start();
        current = (current + 1) % 4;
      };
      transition();

      const renderer = new CSS3DRenderer();
      renderer.setSize(...rendererSize());
      container.appendChild(renderer.domElement);

      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.mouseButtons.RIGHT = null;

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(...rendererSize());
        controls.handleResize();
      };
      window.addEventListener('resize', onResize);

      let raf;
      let last = 0;
      const animate = (now) => {
        raf = requestAnimationFrame(animate);
        if (now - last < 16) return;
        last = now;
        group.update(now);
        controls.update();
        for (const object of objects) {
          const scale = Math.sin((Math.floor(object.position.x) + now) * 0.002) * 0.3 + 3;
          object.scale.set(scale, scale, scale);
        }
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        group.removeAll();
        controls.dispose();
        renderer.domElement.remove();
      };
    };

    // Comme sur N-iX : chargé uniquement au-dessus de 992px, y compris après un redimensionnement.
    let started = false;
    const maybeStart = () => {
      if (started || window.innerWidth <= TABLET) return;
      started = true;
      start();
    };
    maybeStart();
    window.addEventListener('resize', maybeStart);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', maybeStart);
      cleanup();
    };
  }, []);

  return <div ref={ref} className="hero__animation" aria-hidden="true" />;
}
