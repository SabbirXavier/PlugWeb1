import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Share2, Calendar, Heart, MessageSquare } from 'lucide-react';

export const SocialMedia3DCanvas: React.FC = () => {
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

    // Layered Social Post Cards
    const post1Geo = new THREE.BoxGeometry(2.4, 3.2, 0.08);
    const post1Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const post1 = new THREE.Mesh(post1Geo, post1Mat);
    post1.position.set(-1.2, 0.2, 0);
    post1.rotation.y = 0.2;
    group.add(post1);

    const post2Geo = new THREE.BoxGeometry(2.4, 3.2, 0.08);
    const post2Mat = new THREE.MeshStandardMaterial({ color: 0xc7ff3d, roughness: 0.2 });
    const post2 = new THREE.Mesh(post2Geo, post2Mat);
    post2.position.set(0.8, -0.2, 0.4);
    post2.rotation.y = -0.2;
    group.add(post2);

    const post3Geo = new THREE.BoxGeometry(2.0, 2.6, 0.08);
    const post3Mat = new THREE.MeshStandardMaterial({ color: 0x090a0b, roughness: 0.3 });
    const post3 = new THREE.Mesh(post3Geo, post3Mat);
    post3.position.set(-0.2, -0.6, 0.8);
    group.add(post3);

    // Animation Tick
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = Math.sin(elapsed * 0.4) * 0.18;
      group.rotation.x = Math.cos(elapsed * 0.3) * 0.08;

      post1.position.z = Math.sin(elapsed * 1.2) * 0.06;
      post2.position.z = 0.4 + Math.cos(elapsed * 1.4) * 0.08;
      post3.position.z = 0.8 + Math.sin(elapsed * 1.6) * 0.06;

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
      post1Geo.dispose();
      post2Geo.dispose();
      post3Geo.dispose();
      post1Mat.dispose();
      post2Mat.dispose();
      post3Mat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating Status Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-[#b8ee00] text-[#090a0b] px-3.5 py-1.5 rounded-xl shadow-md font-display font-bold text-xs">
          <Calendar className="w-4 h-4 text-black" />
          <span>Automated Publishing Calendar</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs font-mono text-xs font-bold text-[#090a0b] flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-[#505256]" />
          <span>Multi-Channel Sync</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Community & Engagement</div>
            <div className="font-mono text-[10px] text-[#505256]">Consistent Narrative</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-black/10 pl-2">
          <MessageSquare className="w-4 h-4 text-[#a5d600]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Content Planning</div>
            <div className="font-mono text-[10px] text-[#505256]">High-Velocity Posts</div>
          </div>
        </div>
      </div>
    </div>
  );
};
