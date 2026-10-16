import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CtaAssembly3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc7ff3d, 2.5);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    // Assembly Blocks
    const block1Geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const block1Mat = new THREE.MeshStandardMaterial({ color: 0x090a0b, roughness: 0.2, metalness: 0.8 });
    const block1 = new THREE.Mesh(block1Geo, block1Mat);
    group.add(block1);

    const block2Geo = new THREE.TorusGeometry(1.8, 0.2, 16, 60);
    const block2Mat = new THREE.MeshPhongMaterial({ color: 0xc7ff3d, shininess: 90 });
    const block2 = new THREE.Mesh(block2Geo, block2Mat);
    group.add(block2);

    const block3Geo = new THREE.IcosahedronGeometry(1.2, 0);
    const block3Mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, roughness: 0.1 });
    const block3 = new THREE.Mesh(block3Geo, block3Mat);
    group.add(block3);

    // Animation Tick
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.4;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.2;

      block2.rotation.x = elapsed * 0.6;
      block3.rotation.y = -elapsed * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    const resizeHandler = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeHandler);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      block1Geo.dispose();
      block2Geo.dispose();
      block3Geo.dispose();
      block1Mat.dispose();
      block2Mat.dispose();
      block3Mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
};
