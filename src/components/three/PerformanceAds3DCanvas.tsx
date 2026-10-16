import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TrendingUp, Target, BarChart2, DollarSign } from 'lucide-react';

export const PerformanceAds3DCanvas: React.FC = () => {
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
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const limeLight = new THREE.PointLight(0xc7ff3d, 2.2, 20);
    limeLight.position.set(-3, -2, 4);
    scene.add(limeLight);

    const group = new THREE.Group();
    scene.add(group);

    // Main Ads Dashboard Frame (Dark Slate)
    const dashboardGeo = new THREE.BoxGeometry(5.2, 3.4, 0.1);
    const dashboardMat = new THREE.MeshStandardMaterial({
      color: 0x090a0b,
      roughness: 0.2,
      metalness: 0.8,
    });
    const dashboard = new THREE.Mesh(dashboardGeo, dashboardMat);
    dashboard.position.set(0, 0, 0);
    group.add(dashboard);

    // Floating Metric Cards
    const card1Geo = new THREE.BoxGeometry(2.0, 1.2, 0.08);
    const card1Mat = new THREE.MeshStandardMaterial({ color: 0xc7ff3d, roughness: 0.2 });
    const card1 = new THREE.Mesh(card1Geo, card1Mat);
    card1.position.set(-1.4, 0.6, 0.25);
    group.add(card1);

    const card2Geo = new THREE.BoxGeometry(2.2, 1.4, 0.08);
    const card2Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const card2 = new THREE.Mesh(card2Geo, card2Mat);
    card2.position.set(1.2, -0.4, 0.35);
    group.add(card2);

    // Funnel Cylinder Mesh
    const funnelGeo = new THREE.CylinderGeometry(1.2, 0.4, 1.8, 16);
    const funnelMat = new THREE.MeshPhongMaterial({
      color: 0xf3f3ef,
      specular: 0xffffff,
      shininess: 90,
      wireframe: true,
    });
    const funnel = new THREE.Mesh(funnelGeo, funnelMat);
    funnel.position.set(-1.2, -0.6, 0.4);
    funnel.rotation.x = 0.2;
    group.add(funnel);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = Math.sin(elapsed * 0.4) * 0.15;
      group.rotation.x = Math.cos(elapsed * 0.3) * 0.08;

      card1.position.z = 0.25 + Math.sin(elapsed * 1.5) * 0.06;
      card2.position.z = 0.35 + Math.cos(elapsed * 1.2) * 0.08;
      funnel.rotation.y = elapsed * 0.5;

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
      dashboardGeo.dispose();
      card1Geo.dispose();
      card2Geo.dispose();
      funnelGeo.dispose();
      dashboardMat.dispose();
      card1Mat.dispose();
      card2Mat.dispose();
      funnelMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating Status Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-[#090a0b] text-white px-3.5 py-1.5 rounded-xl shadow-lg">
          <Target className="w-4 h-4 text-[#b8ee00]" />
          <span className="font-mono text-xs font-semibold text-[#b8ee00]">Meta & Google Ad Funnel</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs font-mono text-xs font-bold text-[#090a0b] flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-Time Conversion Tracking</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#090a0b]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Media Buying Engine</div>
            <div className="font-mono text-[10px] text-[#505256]">Optimized Acquisition</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-black/10 pl-2">
          <BarChart2 className="w-4 h-4 text-[#a5d600]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">YouTube & Search Ads</div>
            <div className="font-mono text-[10px] text-[#505256]">High Intent Traffic</div>
          </div>
        </div>
      </div>
    </div>
  );
};
