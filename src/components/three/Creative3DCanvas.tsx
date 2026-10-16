import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Palette, Share2, Film, Sparkles } from 'lucide-react';

export const Creative3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

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
    dirLight.position.set(4, 6, 8);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    // Layer 1: Main Campaign Poster (Electric Lime & Slate)
    const poster1Geo = new THREE.BoxGeometry(3.2, 4.2, 0.08);
    const poster1Mat = new THREE.MeshStandardMaterial({
      color: 0xc7ff3d,
      roughness: 0.2,
      metalness: 0.1,
    });
    const poster1 = new THREE.Mesh(poster1Geo, poster1Mat);
    poster1.position.set(-0.8, 0, 0);
    poster1.rotation.y = 0.2;
    poster1.rotation.z = -0.05;
    group.add(poster1);

    // Layer 2: Social Media Creative (Dark Slate)
    const poster2Geo = new THREE.BoxGeometry(2.8, 3.4, 0.08);
    const poster2Mat = new THREE.MeshStandardMaterial({
      color: 0x090a0b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const poster2 = new THREE.Mesh(poster2Geo, poster2Mat);
    poster2.position.set(1.2, 0.4, 0.5);
    poster2.rotation.y = -0.25;
    poster2.rotation.z = 0.08;
    group.add(poster2);

    // Layer 3: Video Reel Frame (Ceramic White)
    const poster3Geo = new THREE.BoxGeometry(2.2, 2.8, 0.08);
    const poster3Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });
    const poster3 = new THREE.Mesh(poster3Geo, poster3Mat);
    poster3.position.set(0.2, -0.6, 1.0);
    poster3.rotation.y = 0.1;
    group.add(poster3);

    // Animation Tick
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = Math.sin(elapsed * 0.4) * 0.18;
      group.rotation.x = Math.cos(elapsed * 0.3) * 0.08;

      poster1.position.z = Math.sin(elapsed * 1.2) * 0.08;
      poster2.position.z = 0.5 + Math.cos(elapsed * 1.4) * 0.1;
      poster3.position.z = 1.0 + Math.sin(elapsed * 1.6) * 0.08;

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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeHandler);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      poster1Geo.dispose();
      poster2Geo.dispose();
      poster3Geo.dispose();
      poster1Mat.dispose();
      poster2Mat.dispose();
      poster3Mat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating Status Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-[#b8ee00] text-[#090a0b] px-3.5 py-1.5 rounded-xl shadow-md font-display font-bold text-xs">
          <Sparkles className="w-4 h-4 text-black" />
          <span>3D Motion & Brand Identity</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs font-mono text-xs font-bold text-[#090a0b] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#505256]" />
          <span>Editorial Aesthetic</span>
        </div>
      </div>

      {/* Bottom Telemetry Pill */}
      <div className="relative z-10 grid grid-cols-2 gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#090a0b]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Multi-Channel Media</div>
            <div className="font-mono text-[10px] text-[#505256]">Social & Paid Ads</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-black/10 pl-2">
          <Film className="w-4 h-4 text-[#a5d600]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Video & Motion 3D</div>
            <div className="font-mono text-[10px] text-[#505256]">Launch Films</div>
          </div>
        </div>
      </div>
    </div>
  );
};
