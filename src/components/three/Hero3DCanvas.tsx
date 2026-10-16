import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Layers, RotateCcw, Maximize2, Compass } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Hero3DCanvasProps {
  reducedMotion: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ reducedMotion }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<'default' | 'exploded' | 'wireframe' | 'macro'>('default');
  const [hudCollapsed, setHudCollapsed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    // Renderer
    const isHeadless = typeof navigator !== 'undefined' && (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rigs
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(12, 18, 14);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const limeAccentLight = new THREE.DirectionalLight(0xc7ff3d, 2.4);
    limeAccentLight.position.set(-10, -12, 8);
    scene.add(limeAccentLight);

    const softRim = new THREE.PointLight(0xa5d600, 1.8, 50);
    softRim.position.set(0, 10, -5);
    scene.add(softRim);

    // Master Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials
    const ceramicWhite = new THREE.MeshPhongMaterial({
      color: 0xf3f3ef,
      specular: 0xffffff,
      shininess: 90,
    });

    const slateCore = new THREE.MeshStandardMaterial({
      color: 0x090a0b,
      roughness: 0.25,
      metalness: 0.85,
    });

    const electricLime = new THREE.MeshPhongMaterial({
      color: 0xc7ff3d,
      emissive: 0x3d5900,
      specular: 0xffffff,
      shininess: 100,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.92,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x98d400,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const lineLime = new THREE.LineBasicMaterial({
      color: 0xa5d600,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5,
    });

    // Central Floating Sculpture
    const centralStructure = new THREE.Group();

    // Ring 1 (Ceramic White)
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.22, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ceramicWhite);
    centralStructure.add(ringMesh1);

    // Ring 2 (Electric Lime)
    const ringGeo2 = new THREE.TorusGeometry(4.0, 0.16, 16, 80);
    const ringMesh2 = new THREE.Mesh(ringGeo2, electricLime);
    ringMesh2.rotation.x = Math.PI / 3;
    centralStructure.add(ringMesh2);

    // Central Monolith
    const monolithGeo = new THREE.BoxGeometry(2.4, 3.6, 2.4);
    const monolith = new THREE.Mesh(monolithGeo, slateCore);
    centralStructure.add(monolith);

    // Polyhedral Outer Glass Shell
    const glassGeo = new THREE.IcosahedronGeometry(3.6, 0);
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    centralStructure.add(glassMesh);

    // Satellites
    const satellites: { mesh: THREE.Mesh; basePos: THREE.Vector3; rotSpeed: number }[] = [];
    const satelliteConfigs = [
      { pos: new THREE.Vector3(-6.8, 3.2, 1.5), geo: new THREE.BoxGeometry(1.4, 1.4, 1.4), mat: electricLime, rotSpeed: 0.02 },
      { pos: new THREE.Vector3(6.5, -2.8, 2.0), geo: new THREE.CylinderGeometry(0.8, 0.8, 1.8, 16), mat: ceramicWhite, rotSpeed: -0.015 },
      { pos: new THREE.Vector3(-1.2, -5.5, -2.0), geo: new THREE.OctahedronGeometry(1.2, 0), mat: slateCore, rotSpeed: 0.025 },
      { pos: new THREE.Vector3(5.2, 4.5, -2.5), geo: new THREE.DodecahedronGeometry(1.1, 0), mat: electricLime, rotSpeed: -0.018 },
    ];

    satelliteConfigs.forEach((cfg) => {
      const mesh = new THREE.Mesh(cfg.geo, cfg.mat);
      mesh.position.copy(cfg.pos);
      centralStructure.add(mesh);
      satellites.push({ mesh, basePos: cfg.pos.clone(), rotSpeed: cfg.rotSpeed });

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), cfg.pos]);
      const connectorLine = new THREE.Line(lineGeo, lineLime);
      centralStructure.add(connectorLine);
    });

    // Particle Ring
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 7.5 + Math.sin(i * 3) * 1.8;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = Math.sin(angle * 2) * 1.4 + (Math.random() - 0.5) * 0.8;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x9be000,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
    });
    const orbitalParticles = new THREE.Points(particleGeo, particleMat);
    centralStructure.add(orbitalParticles);

    rootGroup.add(centralStructure);

    // Mouse & Scroll State
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = ((e.clientX - width / 2) / width) * 2;
      mouseY = -((e.clientY - height / 2) / height) * 2;
    };

    const onScroll = () => {
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Exponential damping
      targetMouseX = THREE.MathUtils.damp(targetMouseX, mouseX, 4, delta);
      targetMouseY = THREE.MathUtils.damp(targetMouseY, mouseY, 4, delta);
      targetScrollY = THREE.MathUtils.damp(targetScrollY, scrollY, 6, delta);

      const scrollProgress = reducedMotion ? 0 : Math.min(Math.max(targetScrollY / 1800, 0), 1.8);

      if (!reducedMotion) {
        centralStructure.rotation.y = elapsed * 0.2 + targetMouseX * 0.6 + scrollProgress * 2.5;
        centralStructure.rotation.x = Math.sin(elapsed * 0.3) * 0.12 + targetMouseY * 0.4 + scrollProgress * 0.8;
        centralStructure.rotation.z = scrollProgress * 0.3;

        rootGroup.position.y = -scrollProgress * 4.2;
        rootGroup.position.z = -scrollProgress * 2.0;

        ringMesh1.rotation.x = elapsed * 0.4;
        ringMesh1.rotation.y = elapsed * 0.25;
        ringMesh2.rotation.y = -elapsed * 0.5;
        ringMesh2.rotation.z = elapsed * 0.3;

        monolith.rotation.y = -elapsed * 0.3;
        glassMesh.rotation.x = elapsed * 0.15;
        glassMesh.rotation.y = elapsed * 0.2;

        satellites.forEach((sat, i) => {
          sat.mesh.rotation.x += sat.rotSpeed;
          sat.mesh.rotation.y += sat.rotSpeed * 1.5;
          const orbitExpand = 1 + scrollProgress * 0.4 + Math.sin(elapsed * 2 + i) * 0.08;
          sat.mesh.scale.setScalar(orbitExpand);
        });

        orbitalParticles.rotation.y = -elapsed * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Expose preset switcher to React ref state
    const updatePreset = (preset: typeof activePreset) => {
      sfx.playClick();
      if (preset === 'exploded') {
        glassMesh.scale.setScalar(1.6);
        (glassMesh as THREE.Mesh).material = wireframeMat;
        satellites.forEach((s) => s.mesh.position.multiplyScalar(1.4));
      } else if (preset === 'wireframe') {
        glassMesh.scale.setScalar(1.0);
        (glassMesh as THREE.Mesh).material = wireframeMat;
        (ringMesh1 as THREE.Mesh).material = wireframeMat;
        (ringMesh2 as THREE.Mesh).material = wireframeMat;
      } else if (preset === 'macro') {
        camera.position.set(0, 0, 14);
        (glassMesh as THREE.Mesh).material = glassMaterial;
        (ringMesh1 as THREE.Mesh).material = ceramicWhite;
        (ringMesh2 as THREE.Mesh).material = electricLime;
      } else {
        camera.position.set(0, 0, 22);
        glassMesh.scale.setScalar(1.0);
        (glassMesh as THREE.Mesh).material = glassMaterial;
        (ringMesh1 as THREE.Mesh).material = ceramicWhite;
        (ringMesh2 as THREE.Mesh).material = electricLime;
        satellites.forEach((s, idx) => s.mesh.position.copy(satelliteConfigs[idx].pos));
      }
    };

    (mountRef.current as unknown as { __updatePreset?: typeof updatePreset }).__updatePreset = updatePreset;

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      monolithGeo.dispose();
      glassGeo.dispose();
      ceramicWhite.dispose();
      slateCore.dispose();
      electricLime.dispose();
      glassMaterial.dispose();
      wireframeMat.dispose();
      lineLime.dispose();
    };
  }, [reducedMotion]);

  const handlePresetSelect = (preset: 'default' | 'exploded' | 'wireframe' | 'macro') => {
    setActivePreset(preset);
    const updater = (mountRef.current as unknown as { __updatePreset?: (p: string) => void })?.__updatePreset;
    if (updater) updater(preset);
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div ref={mountRef} className="w-full h-full" />

      {/* Collapsible 3D View Dock (Zero viewport occlusion) */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => {
            setHudCollapsed(!hudCollapsed);
            sfx.playClick();
          }}
          className="mb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#505256] hover:text-[#090a0b] bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1 rounded-full border border-black/10 shadow-2xs transition-all flex items-center gap-1.5"
        >
          <Compass className="w-3 h-3 text-[#b8ee00]" />
          <span>{hudCollapsed ? '▾ Show 3D Camera Controls' : '▴ Hide 3D Camera Controls'}</span>
        </button>

        {!hudCollapsed && (
          <div className="bg-white/90 backdrop-blur-md border border-black/10 p-2 rounded-2xl shadow-xl flex items-center gap-2">
            <button
              onClick={() => handlePresetSelect('default')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activePreset === 'default'
                  ? 'bg-[#090a0b] text-[#b8ee00] shadow-xs'
                  : 'text-[#505256] hover:text-[#090a0b] hover:bg-black/5'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Default 3D</span>
            </button>

            <button
              onClick={() => handlePresetSelect('exploded')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activePreset === 'exploded'
                  ? 'bg-[#090a0b] text-[#b8ee00] shadow-xs'
                  : 'text-[#505256] hover:text-[#090a0b] hover:bg-black/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded View</span>
            </button>

            <button
              onClick={() => handlePresetSelect('wireframe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activePreset === 'wireframe'
                  ? 'bg-[#090a0b] text-[#b8ee00] shadow-xs'
                  : 'text-[#505256] hover:text-[#090a0b] hover:bg-black/5'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Wireframe</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
