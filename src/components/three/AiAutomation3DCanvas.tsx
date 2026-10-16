import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, Bot, Workflow, Zap } from 'lucide-react';

export const AiAutomation3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc7ff3d, 3.0, 25);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Central AI Core Node
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x090a0b,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    nodeGroup.add(coreMesh);

    const coreInnerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const coreInnerMat = new THREE.MeshPhongMaterial({
      color: 0xc7ff3d,
      emissive: 0x536d00,
      shininess: 100,
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    nodeGroup.add(coreInner);

    // Orbiting Satellite Neural Nodes & Bezier Connections
    const nodes: { mesh: THREE.Mesh; angle: number; speed: number; dist: number }[] = [];
    const lineGroup = new THREE.Group();
    nodeGroup.add(lineGroup);

    const nodeMatLime = new THREE.MeshPhongMaterial({ color: 0xc7ff3d, shininess: 80 });
    const nodeMatSlate = new THREE.MeshStandardMaterial({ color: 0x505256, roughness: 0.3 });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 3.6 + (i % 2) * 1.2;
      const geo = i % 2 === 0 ? new THREE.SphereGeometry(0.35, 16, 16) : new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const mesh = new THREE.Mesh(geo, i % 2 === 0 ? nodeMatLime : nodeMatSlate);

      mesh.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, (Math.random() - 0.5) * 2);
      nodeGroup.add(mesh);

      nodes.push({ mesh, angle, speed: 0.008 + Math.random() * 0.006, dist });
    }

    // Animation Tick
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      nodeGroup.rotation.y = elapsed * 0.2;
      coreInner.rotation.x = elapsed * 0.5;
      coreInner.rotation.y = elapsed * 0.8;

      // Update orbital nodes & redraw lines
      while (lineGroup.children.length > 0) {
        lineGroup.remove(lineGroup.children[0]);
      }

      const lineMat = new THREE.LineBasicMaterial({ color: 0xa5d600, transparent: true, opacity: 0.6 });

      nodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.dist;
        node.mesh.position.y = Math.sin(node.angle) * node.dist;
        node.mesh.rotation.x += 0.02;

        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          node.mesh.position,
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        lineGroup.add(line);
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
      coreGeo.dispose();
      coreMat.dispose();
      coreInnerGeo.dispose();
      coreInnerMat.dispose();
      nodeMatLime.dispose();
      nodeMatSlate.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#f4f4f2] border border-black/[0.08] p-4 flex flex-col justify-between overflow-hidden shadow-xl">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating Status Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-[#090a0b] text-white px-3.5 py-1.5 rounded-xl shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#b8ee00] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#b8ee00]">Autonomous AI Agent Mesh</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/10 shadow-2xs font-mono text-xs font-bold text-[#090a0b] flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#536d00]" />
          <span>RAG Vector DB</span>
        </div>
      </div>

      {/* Overlay Nodes Legend */}
      <div className="relative z-10 grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-600" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Chatbots</div>
            <div className="font-mono text-[10px] text-[#505256]">Multi-Agent</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-x border-black/10 px-2">
          <Workflow className="w-4 h-4 text-[#a5d600]" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Workflow</div>
            <div className="font-mono text-[10px] text-[#505256]">CRM Automation</div>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-1">
          <Zap className="w-4 h-4 text-amber-500" />
          <div>
            <div className="font-mono text-xs font-bold text-[#090a0b]">Interactions</div>
            <div className="font-mono text-[10px] text-[#505256]">Instant Triage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
