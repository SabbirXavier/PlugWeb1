import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Users, Award, Handshake, Globe } from 'lucide-react';

export const Partnerships3DCanvas: React.FC = () => {
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

    const pointLight = new THREE.PointLight(0xc7ff3d, 2.5, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Central Brand Node
    const centerGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0x090a0b, roughness: 0.2, metalness: 0.8 });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    group.add(centerMesh);

    // Connected Creator / Sponsor Nodes
    const nodes: THREE.Mesh[] = [];
    const lineGroup = new THREE.Group();
    group.add(lineGroup);

    const matLime = new THREE.MeshPhongMaterial({ color: 0xc7ff3d, shininess: 80 });
    const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });

    const positions = [
      new THREE.Vector3(-2.8, 1.8, 0.5),
      new THREE.Vector3(2.6, 1.6, -0.4),
      new THREE.Vector3(-2.4, -1.8, -0.2),
      new THREE.Vector3(2.5, -1.5, 0.6),
      new THREE.Vector3(0, 2.8, -0.5),
    ];

    positions.forEach((pos, i) => {
      const geo = i % 2 === 0 ? new THREE.SphereGeometry(0.4, 16, 16) : new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const mesh = new THREE.Mesh(geo, i % 2 === 0 ? matLime : matWhite);
      mesh.position.copy(pos);
      group.add(mesh);
      nodes.push(mesh);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xa5d600, transparent: true, opacity: 0.6 });
      const line = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(line);
    });

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.25;
      centerMesh.rotation.x = elapsed * 0.4;

      nodes.forEach((node, idx) => {
        node.rotation.y += 0.02;
        node.position.z = positions[idx].z + Math.sin(elapsed * 1.5 + idx) * 0.2;
      });

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
      centerGeo.dispose();
      centerMat.dispose();
      matLime.dispose();
      matWhite.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating Status Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-[#090a0b] text-white px-3.5 py-1.5 rounded-xl shadow-lg">
          <Handshake className="w-4 h-4 text-[#b8ee00]" />
          <span className="font-mono text-xs font-semibold text-[#b8ee00]">Global Creator Network</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs font-mono text-xs font-bold text-[#090a0b] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>PR & Press Outreach</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#090a0b]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Brand Sponsorships</div>
            <div className="font-mono text-[10px] text-[#505256]">Curated Deals</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-black/10 pl-2">
          <Users className="w-4 h-4 text-[#a5d600]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Creator Campaigns</div>
            <div className="font-mono text-[10px] text-[#505256]">End-to-End Mgmt</div>
          </div>
        </div>
      </div>
    </div>
  );
};
