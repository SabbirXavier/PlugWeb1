import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Monitor, Tablet, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../utils/audio';

export const WebDev3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
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

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const limeLight = new THREE.PointLight(0xc7ff3d, 2.0, 20);
    limeLight.position.set(-4, -3, 3);
    scene.add(limeLight);

    const group = new THREE.Group();
    scene.add(group);

    // Outer Browser Frame
    const frameGeo = new THREE.BoxGeometry(6.4, 4.2, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x090a0b,
      roughness: 0.2,
      metalness: 0.9,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    group.add(frameMesh);

    // Inner Viewport Screen
    const screenGeo = new THREE.PlaneGeometry(6.0, 3.5);
    const screenMat = new THREE.MeshPhongMaterial({
      color: 0xf4f4f2,
      shininess: 40,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.11;
    group.add(screenMesh);

    // Floating UI Panels (Cards on Screen)
    const card1Geo = new THREE.BoxGeometry(2.2, 1.4, 0.08);
    const card1Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const card1 = new THREE.Mesh(card1Geo, card1Mat);
    card1.position.set(-1.5, 0.6, 0.2);
    group.add(card1);

    const card2Geo = new THREE.BoxGeometry(2.4, 2.2, 0.08);
    const card2Mat = new THREE.MeshStandardMaterial({ color: 0xc7ff3d, roughness: 0.2 });
    const card2 = new THREE.Mesh(card2Geo, card2Mat);
    card2.position.set(1.3, -0.2, 0.25);
    group.add(card2);

    const card3Geo = new THREE.BoxGeometry(2.2, 0.9, 0.08);
    const card3Mat = new THREE.MeshStandardMaterial({ color: 0x090a0b, roughness: 0.2 });
    const card3 = new THREE.Mesh(card3Geo, card3Mat);
    card3.position.set(-1.5, -0.8, 0.3);
    group.add(card3);

    // Animation Tick
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = Math.sin(elapsed * 0.5) * 0.15;
      group.rotation.x = Math.cos(elapsed * 0.4) * 0.08;

      card1.position.z = 0.2 + Math.sin(elapsed * 1.5) * 0.05;
      card2.position.z = 0.25 + Math.cos(elapsed * 1.2) * 0.06;
      card3.position.z = 0.3 + Math.sin(elapsed * 1.8) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const resizeHandler = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', resizeHandler);

    // Expose Device Resizer
    const setScale = (mode: string) => {
      sfx.playClick();
      if (mode === 'tablet') {
        frameMesh.scale.set(0.7, 0.9, 1);
        screenMesh.scale.set(0.7, 0.9, 1);
        card1.scale.set(0.7, 0.7, 1);
        card2.scale.set(0.7, 0.7, 1);
        card3.scale.set(0.7, 0.7, 1);
      } else if (mode === 'mobile') {
        frameMesh.scale.set(0.45, 1.1, 1);
        screenMesh.scale.set(0.45, 1.1, 1);
        card1.scale.set(0.5, 0.5, 1);
        card2.scale.set(0.5, 0.5, 1);
        card3.scale.set(0.5, 0.5, 1);
      } else {
        frameMesh.scale.set(1, 1, 1);
        screenMesh.scale.set(1, 1, 1);
        card1.scale.set(1, 1, 1);
        card2.scale.set(1, 1, 1);
        card3.scale.set(1, 1, 1);
      }
    };

    (mountRef.current as unknown as { __setScale?: typeof setScale }).__setScale = setScale;

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeHandler);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      frameGeo.dispose();
      screenGeo.dispose();
      card1Geo.dispose();
      card2Geo.dispose();
      card3Geo.dispose();
      frameMat.dispose();
      screenMat.dispose();
      card1Mat.dispose();
      card2Mat.dispose();
      card3Mat.dispose();
    };
  }, []);

  const handleDeviceChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceMode(mode);
    const setScale = (mountRef.current as unknown as { __setScale?: (m: string) => void })?.__setScale;
    if (setScale) setScale(mode);
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl group">
      {/* 3D WebGL Scene */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating HUD Badges over 3D viewport */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#b8ee00]" />
          <span className="font-mono text-xs font-bold text-[#090a0b]">Lighthouse Core Vitals: 99/100</span>
        </div>

        {/* Viewport Scale Selector */}
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl border border-black/10 shadow-2xs flex items-center gap-1">
          <button
            onClick={() => handleDeviceChange('desktop')}
            title="Desktop 3D Wireframe"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              deviceMode === 'desktop' ? 'bg-[#090a0b] text-[#b8ee00]' : 'text-[#505256] hover:text-[#090a0b]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeviceChange('tablet')}
            title="Tablet 3D Viewport"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              deviceMode === 'tablet' ? 'bg-[#090a0b] text-[#b8ee00]' : 'text-[#505256] hover:text-[#090a0b]'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeviceChange('mobile')}
            title="Mobile 3D Frame"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              deviceMode === 'mobile' ? 'bg-[#090a0b] text-[#b8ee00]' : 'text-[#505256] hover:text-[#090a0b]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Pill */}
      <div className="relative z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-mono text-xs font-semibold text-[#090a0b]">TypeScript · Next.js · SSR Micro-Architecture</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#505256]">
          <Sparkles className="w-3.5 h-3.5 text-[#a5d600]" />
          <span>Sub-100ms Hydration</span>
        </div>
      </div>
    </div>
  );
};
