import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParallaxBackgroundProps {
  reducedMotion: boolean;
}

export const ParallaxBackgroundCanvas: React.FC<ParallaxBackgroundProps> = ({ reducedMotion }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const isHeadless = typeof navigator !== 'undefined' && (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Parallax Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const limeLight = new THREE.PointLight(0xc7ff3d, 1.8, 60);
    limeLight.position.set(10, 15, 10);
    scene.add(limeLight);

    const softBlueLight = new THREE.PointLight(0xa5d600, 1.5, 60);
    softBlueLight.position.set(-15, -10, -5);
    scene.add(softBlueLight);

    // Parallax Star/Grid Field
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160; // Spread vertically across scroll
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random() * 0.4 + 0.1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x9be000,
      size: 0.35,
      transparent: true,
      opacity: 0.55,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Floating 3D Geometric Accents scattered in 3D parallax depth
    const floatersGroup = new THREE.Group();
    scene.add(floatersGroup);

    const geo1 = new THREE.IcosahedronGeometry(0.8, 0);
    const geo2 = new THREE.TorusGeometry(1.0, 0.1, 12, 40);
    const geo3 = new THREE.OctahedronGeometry(0.9, 0);

    const matLime = new THREE.MeshPhongMaterial({ color: 0xc7ff3d, transparent: true, opacity: 0.25, wireframe: true });
    const matWhite = new THREE.MeshStandardMaterial({ color: 0xe2e3e1, transparent: true, opacity: 0.2, wireframe: true });

    const floaters: { mesh: THREE.Mesh; basePos: THREE.Vector3; rotSpeed: THREE.Vector3; depthFactor: number }[] = [];

    for (let i = 0; i < 15; i++) {
      const g = i % 3 === 0 ? geo1 : i % 3 === 1 ? geo2 : geo3;
      const m = i % 2 === 0 ? matLime : matWhite;
      const mesh = new THREE.Mesh(g, m);

      const basePos = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.position.copy(basePos);

      floatersGroup.add(mesh);
      floaters.push({
        mesh,
        basePos,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        depthFactor: 0.05 + Math.random() * 0.1,
      });
    }

    // Scroll & Cursor Parallax Handlers
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!reducedMotion) {
        targetMouseX += (mouseX - targetMouseX) * 0.05;
        targetMouseY += (mouseY - targetMouseY) * 0.05;
        targetScrollY += (scrollY - targetScrollY) * 0.08;

        // Camera Parallax Movement following page scroll
        camera.position.y = -targetScrollY * 0.012;
        camera.position.x = targetMouseX * 1.5;
        camera.rotation.y = targetMouseX * 0.03;

        // Particle field rotation
        particlePoints.rotation.y += 0.0005;

        // Floating geometries rotation & differential parallax
        floaters.forEach((f) => {
          f.mesh.rotation.x += f.rotSpeed.x;
          f.mesh.rotation.y += f.rotSpeed.y;
          f.mesh.position.y = f.basePos.y - targetScrollY * f.depthFactor;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      matLime.dispose();
      matWhite.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};
