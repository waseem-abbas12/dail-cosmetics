import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Award } from 'lucide-react';

interface Dali3DCanvasProps {
  initialModel?: 'oil' | 'beauty-cream' | 'hand-foot';
  className?: string;
  showControls?: boolean;
}

interface Hotspot {
  id: string;
  title: string;
  desc: string;
  position: [number, number, number];
}

export const Dali3DCanvas: React.FC<Dali3DCanvasProps> = ({
  initialModel = 'oil',
  className = '',
  showControls = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<'oil' | 'beauty-cream' | 'hand-foot'>(initialModel);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(4.2);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const leavesGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Mouse & Touch interaction
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.05, y: 0.2 });

  // Hotspots definitions per model
  const hotspotsMap: Record<'oil' | 'beauty-cream' | 'hand-foot', Hotspot[]> = {
    oil: [
      { id: 'h-oil-1', title: 'Export Quality 120ml Bottle', desc: '100% pure cold-pressed botanical hair oil. UV-protected amber glass prevents oxidation.', position: [0, 0.7, 0.55] },
      { id: 'h-oil-2', title: 'Iconic Dail Monogram', desc: 'Official factory security seal. Guaranteed authentic herbal active batch.', position: [0, 0.2, 0.55] },
      { id: 'h-oil-3', title: '100% Organic & Steroid-Free', desc: 'Zero mineral oil, zero parabens. Safe for daily use by men & women.', position: [0, -0.6, 0.55] },
    ],
    'beauty-cream': [
      { id: 'h-cream-1', title: 'Signature Round Tin Lid', desc: 'Embossed Dail metallic lid ensures airtight hygiene and prevents counterfeit.', position: [0, 0.55, 0.85] },
      { id: 'h-cream-2', title: 'Strictly Without Steroid', desc: 'Tested to be 100% free from clobetasol, betamethasone, and mercury.', position: [0, 0.0, 0.85] },
      { id: 'h-cream-3', title: '5-Day Beauty Plan', desc: 'Dual-action Anti-Acne and Anti-Aging natural saffron and arbutin illumination.', position: [0, -0.4, 0.85] },
    ],
    'hand-foot': [
      { id: 'h-hf-1', title: 'Sunburst Gold Lid', desc: 'Distinctive Dail Hand & Foot signature yellow screw cap with embossed logo.', position: [0, 0.55, 0.85] },
      { id: 'h-hf-2', title: '3-Action Repair Matrix', desc: 'Moisturizing, Multi-Effect, and Barrier Repair for dark knuckles and rough heels.', position: [0, 0.0, 0.85] },
      { id: 'h-hf-3', title: 'Zero Steroids / Safe', desc: 'Non-greasy rapid absorption formula formulated for South Asian skin.', position: [0, -0.4, 0.85] },
    ]
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with cinematic focal length
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.35, zoomLevel);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-End Color Management
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Studio Lighting Rig (Warm Gold & Clean Speculars)
    const ambientLight = new THREE.AmbientLight(0xfff6e6, 1.2);
    scene.add(ambientLight);

    // Main Studio Key Light (Champagne Gold highlight)
    const keyLight = new THREE.DirectionalLight(0xfff3db, 3.2);
    keyLight.position.set(3.5, 4.5, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xe8d5a7, 1.8);
    fillLight.position.set(-3.5, 2, 2.5);
    scene.add(fillLight);

    // Gold Rim Light from Behind
    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    rimLight.position.set(0, 3, -3.5);
    scene.add(rimLight);

    // Bottom Specular Bounce
    const bounceLight = new THREE.DirectionalLight(0xc41e3a, 0.8);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Soft Shadow Ground Plane
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.15;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 5. Product Mesh Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);
    productGroupRef.current = productGroup;

    // 6. Floating Botanical Leaves Group
    const leavesGroup = new THREE.Group();
    scene.add(leavesGroup);
    leavesGroupRef.current = leavesGroup;
    createBotanicalFoliage(leavesGroup);

    // 7. Floating 24K Gold Particles
    const particles = createGoldParticles();
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Build initial 3D model
    buildProductModel(productGroup, modelType);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (productGroupRef.current) {
        if (isAutoRotate && !isDraggingRef.current) {
          targetRotation.current.y += 0.007;
          targetRotation.current.x = Math.sin(elapsedTime * 0.6) * 0.05;
        }

        // Smooth inertia lerping
        productGroupRef.current.rotation.y += (targetRotation.current.y - productGroupRef.current.rotation.y) * 0.07;
        productGroupRef.current.rotation.x += (targetRotation.current.x - productGroupRef.current.rotation.x) * 0.07;

        // Subtle organic breathing float
        productGroupRef.current.position.y = Math.sin(elapsedTime * 1.8) * 0.045;
      }

      // Gentle leaf sway
      if (leavesGroupRef.current) {
        leavesGroupRef.current.children.forEach((leaf, idx) => {
          const offset = idx * 1.5;
          leaf.rotation.z += Math.sin(elapsedTime * 0.9 + offset) * 0.0006;
          leaf.position.y += Math.sin(elapsedTime * 1.3 + offset) * 0.0005;
        });
      }

      // Golden particle float
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.025;
      }

      renderer.render(scene, camera);
      reqIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse Parallax & Drag Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x += deltaY * 0.008;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x += deltaY * 0.008;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('touchstart', handleTouchStart);
    dom.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update model when type changes
  useEffect(() => {
    if (productGroupRef.current) {
      buildProductModel(productGroupRef.current, modelType);
      setActiveHotspot(null);
    }
  }, [modelType]);

  // Handle zoom changes
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const newZoom = direction === 'in' ? Math.max(2.8, zoomLevel - 0.4) : Math.min(5.5, zoomLevel + 0.4);
    setZoomLevel(newZoom);
    cameraRef.current.position.z = newZoom;
  };

  const currentHotspots = hotspotsMap[modelType];

  return (
    <div className={`relative w-full h-full min-h-[480px] sm:min-h-[540px] flex items-center justify-center select-none ${className}`}>
      
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Top Floating Badge with Gold Accent */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0b0e]/85 backdrop-blur-md border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-semibold shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span>3D Studio • 360° Drag & Inspect</span>
        </div>
      </div>

      {/* Zoom & Spin Tools on Top Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => handleZoom('in')}
          className="p-2 rounded-full gold-glass-panel text-white hover:text-[#d4af37] transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-2 rounded-full gold-glass-panel text-white hover:text-[#d4af37] transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`p-2 rounded-full gold-glass-panel transition-all ${
            isAutoRotate ? 'text-[#d4af37] bg-black/60 border-[#d4af37]' : 'text-stone-400 hover:text-white'
          }`}
          title={isAutoRotate ? 'Pause 360° Spin' : 'Resume 360° Spin'}
        >
          <RotateCcw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>
      </div>

      {/* Active Hotspot Info Card Modal */}
      {activeHotspot && (
        <div className="absolute top-16 left-4 right-4 sm:left-auto sm:right-6 sm:w-72 z-30 p-4 rounded-2xl gold-glass-card border border-[#d4af37]/50 shadow-2xl animate-fade-in pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{activeHotspot.title}</span>
            </div>
            <button 
              onClick={() => setActiveHotspot(null)}
              className="text-stone-400 hover:text-white text-xs font-bold p-0.5"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-stone-200 mt-2 leading-relaxed">
            {activeHotspot.desc}
          </p>
        </div>
      )}

      {/* Interactive Hotspot Trigger Buttons (Positioned Over Canvas) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-end pr-6 gap-3 z-20">
        <div className="pointer-events-auto flex flex-col gap-2">
          {currentHotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-lg backdrop-blur-md ${
                activeHotspot?.id === h.id
                  ? 'bg-[#d4af37] text-black font-bold shadow-amber-500/40 scale-105'
                  : 'bg-black/75 border border-[#d4af37]/30 text-stone-200 hover:border-[#d4af37] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>{h.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Model Switcher HUD matching actual packaging! */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1 p-1 rounded-full gold-glass-panel pointer-events-auto border border-[#d4af37]/30 shadow-2xl">
            <button
              onClick={() => setModelType('oil')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'oil'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-lg font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>🧴</span>
              <span>Herbal Hair Oil (120ml)</span>
            </button>

            <button
              onClick={() => setModelType('beauty-cream')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'beauty-cream'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-lg font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>✨</span>
              <span>Beauty Cream (5-Day Plan)</span>
            </button>

            <button
              onClick={() => setModelType('hand-foot')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'hand-foot'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-lg font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>💛</span>
              <span>Hand & Foot Whitening</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// 3D PBR Geometry & Material Builders
// ==========================================

function buildProductModel(group: THREE.Group, type: 'oil' | 'beauty-cream' | 'hand-foot') {
  while (group.children.length > 0) {
    const obj = group.children[0];
    group.remove(obj);
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
  }

  if (type === 'oil') {
    buildHairOilPackage(group);
  } else if (type === 'beauty-cream') {
    buildBeautyCreamPackage(group);
  } else {
    buildHandFootPackage(group);
  }
}

/**
 * 1. Dail Premium Herbal Hair Oil (120ml) — Jet Black, Red Base & Gold Accents
 */
function buildHairOilPackage(group: THREE.Group) {
  // Bottle Glass Cylinder (120ml Luxury Amber Glass)
  const radius = 0.54;
  const height = 1.65;
  const bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 48);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x110904, // Deep medicinal amber
    emissive: 0x050201,
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.68,
    thickness: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    ior: 1.54,
  });

  const bodyMesh = new THREE.Mesh(bodyGeo, glassMat);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Pure Cold-Pressed Herbal Oil Liquid inside
  const liquidGeo = new THREE.CylinderGeometry(radius * 0.94, radius * 0.94, height * 0.92, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x221306,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85,
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.y = -0.05;
  group.add(liquidMesh);

  // Rounded Glass Shoulder
  const shoulderGeo = new THREE.SphereGeometry(radius, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.4);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, glassMat);
  shoulderMesh.position.y = height / 2;
  group.add(shoulderMesh);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.35, 32);
  const neckMesh = new THREE.Mesh(neckGeo, glassMat);
  neckMesh.position.y = height / 2 + 0.3;
  group.add(neckMesh);

  // 24K Gold Metallic Pump Collar
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xe8c760, // Imperial Gold
    metalness: 0.94,
    roughness: 0.14,
  });

  const collarGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.28, 36);
  const collarMesh = new THREE.Mesh(collarGeo, goldMat);
  collarMesh.position.y = height / 2 + 0.44;
  group.add(collarMesh);

  // Gold Pump Head & Dropper
  const pumpShaftGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.36, 24);
  const pumpShaft = new THREE.Mesh(pumpShaftGeo, goldMat);
  pumpShaft.position.y = height / 2 + 0.72;
  group.add(pumpShaft);

  const nozzleGeo = new THREE.BoxGeometry(0.44, 0.13, 0.16);
  const nozzleMesh = new THREE.Mesh(nozzleGeo, goldMat);
  nozzleMesh.position.set(0.14, height / 2 + 0.85, 0);
  group.add(nozzleMesh);

  // Real Dail Packaging Wrapped Label (Jet Black & Crimson Red block with Dail Logo!)
  const labelTexture = createHairOilTexture();
  const labelGeo = new THREE.CylinderGeometry(radius + 0.007, radius + 0.007, height * 0.78, 48, 1, true, -Math.PI * 0.65, Math.PI * 1.3);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.3,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = -0.05;
  group.add(labelMesh);
}

/**
 * 2. Dail Beauty Cream (5-Day Plan) — Pearl White Body & Signature Round Tin Lid
 */
function buildBeautyCreamPackage(group: THREE.Group) {
  const jarRadius = 0.82;
  const jarHeight = 0.78;

  // Frosted White Pearl Container
  const jarGeo = new THREE.CylinderGeometry(jarRadius, jarRadius * 0.95, jarHeight, 48);
  const pearlMat = new THREE.MeshPhysicalMaterial({
    color: 0xfcfbf7, // Pearl white
    roughness: 0.22,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });
  const jarMesh = new THREE.Mesh(jarGeo, pearlMat);
  jarMesh.position.y = -0.12;
  jarMesh.castShadow = true;
  group.add(jarMesh);

  // Gold Waist Ring
  const ringGeo = new THREE.CylinderGeometry(jarRadius * 1.01, jarRadius * 1.01, 0.08, 48);
  const goldRingMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.92,
    roughness: 0.18,
  });
  const ringMesh = new THREE.Mesh(ringGeo, goldRingMat);
  ringMesh.position.y = jarHeight / 2 - 0.16;
  group.add(ringMesh);

  // Signature White Round Tin Lid with Dail Logo Printed on Top (Matching actual packaging!)
  const lidHeight = 0.34;
  const lidGeo = new THREE.CylinderGeometry(jarRadius * 1.025, jarRadius * 1.025, lidHeight, 48);
  const lidMesh = new THREE.Mesh(lidGeo, pearlMat);
  lidMesh.position.y = jarHeight / 2 + lidHeight / 2 - 0.12;
  group.add(lidMesh);

  // Top Embossed Disc on Lid featuring Dail logo
  const topDiscTexture = createBeautyCreamTopDiscTexture();
  const discGeo = new THREE.CircleGeometry(jarRadius * 0.98, 48);
  const discMat = new THREE.MeshStandardMaterial({
    map: topDiscTexture,
    roughness: 0.25,
    metalness: 0.15,
  });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.rotation.x = -Math.PI / 2;
  discMesh.position.y = jarHeight / 2 + lidHeight - 0.115;
  group.add(discMesh);

  // Front Jar Label (5-Day Plan & Without Steroids)
  const labelTexture = createBeautyCreamFrontTexture();
  const labelGeo = new THREE.CylinderGeometry(jarRadius + 0.006, jarRadius + 0.006, jarHeight * 0.65, 48, 1, true, -Math.PI * 0.6, Math.PI * 1.2);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.35,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = -0.12;
  group.add(labelMesh);
}

/**
 * 3. Dail Hand & Foot Cream — Sunburst Yellow Lid & White Box
 */
function buildHandFootPackage(group: THREE.Group) {
  const jarRadius = 0.82;
  const jarHeight = 0.78;

  // White base body
  const jarGeo = new THREE.CylinderGeometry(jarRadius, jarRadius * 0.95, jarHeight, 48);
  const whiteMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.05,
    clearcoat: 0.7,
  });
  const jarMesh = new THREE.Mesh(jarGeo, whiteMat);
  jarMesh.position.y = -0.12;
  jarMesh.castShadow = true;
  group.add(jarMesh);

  // Distinctive Sunburst Yellow Lid (Matching real packaging!)
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf5b722, // Sunburst Marigold Yellow
    metalness: 0.3,
    roughness: 0.25,
  });

  const lidHeight = 0.34;
  const lidGeo = new THREE.CylinderGeometry(jarRadius * 1.025, jarRadius * 1.025, lidHeight, 48);
  const lidMesh = new THREE.Mesh(lidGeo, yellowMat);
  lidMesh.position.y = jarHeight / 2 + lidHeight / 2 - 0.12;
  group.add(lidMesh);

  // Top Yellow Disc with "Dail Hand & Foot" printed
  const topYellowTexture = createHandFootTopDiscTexture();
  const discGeo = new THREE.CircleGeometry(jarRadius * 0.98, 48);
  const discMat = new THREE.MeshStandardMaterial({
    map: topYellowTexture,
    roughness: 0.3,
    metalness: 0.1,
  });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.rotation.x = -Math.PI / 2;
  discMesh.position.y = jarHeight / 2 + lidHeight - 0.115;
  group.add(discMesh);

  // Front Label: 3-Action Repair & Without Steroid
  const labelTexture = createHandFootFrontTexture();
  const labelGeo = new THREE.CylinderGeometry(jarRadius + 0.006, jarRadius + 0.006, jarHeight * 0.65, 48, 1, true, -Math.PI * 0.6, Math.PI * 1.2);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.35,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = -0.12;
  group.add(labelMesh);
}

/**
 * Floating 24K Gold Particles
 */
function createGoldParticles() {
  const count = 75;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 6;
    pos[i + 1] = (Math.random() - 0.5) * 5;
    pos[i + 2] = (Math.random() - 0.5) * 4;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xd4af37,
    size: 0.045,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

/**
 * Botanical Leaf Geometries
 */
function createBotanicalFoliage(group: THREE.Group) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.3, 0.4, 0.45, 1.0, 0, 1.6);
  shape.bezierCurveTo(-0.45, 1.0, -0.3, 0.4, 0, 0);

  const leafGeo = new THREE.ExtrudeGeometry(shape, {
    steps: 2,
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x1a452a, // Deep emerald botanical green
    roughness: 0.3,
    metalness: 0.08,
  });

  const leafPositions = [
    { pos: [-1.45, -0.2, -0.6], rot: [0.2, 0.4, -0.5], scale: 1.1 },
    { pos: [1.5, 0.5, -0.8], rot: [-0.3, -0.5, 0.6], scale: 1.2 },
    { pos: [-1.2, 1.2, -1.0], rot: [0.1, 0.6, -0.2], scale: 0.9 },
    { pos: [1.3, -0.9, -0.4], rot: [0.4, -0.3, 0.8], scale: 1.05 },
  ];

  leafPositions.forEach((config) => {
    const mesh = new THREE.Mesh(leafGeo, leafMat);
    mesh.position.set(config.pos[0], config.pos[1], config.pos[2]);
    mesh.rotation.set(config.rot[0], config.rot[1], config.rot[2]);
    mesh.scale.set(config.scale, config.scale, config.scale);
    mesh.receiveShadow = true;
    group.add(mesh);
  });
}

// ==========================================
// Canvas Textures matching Real Packaging
// ==========================================

function createHairOilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Black background
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, 1024, 760);

  // Vibrant Crimson Red block matching real box!
  ctx.fillStyle = '#c41e3a';
  ctx.fillRect(0, 760, 1024, 264);

  // Gold metallic border
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, 964, 964);

  // Oval Dail Logo Container
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(512, 220, 180, 120, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#c41e3a';
  ctx.lineWidth = 8;
  ctx.stroke();

  // DC Leaf Logo inside oval
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌿', 512, 180);

  ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
  ctx.fillText('Dail', 512, 250);

  // Export Quality Ribbon
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('★ EXPORT QUALITY ★', 512, 385);

  // Product Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 54px "Playfair Display", serif';
  ctx.fillText('Premium Herbal', 512, 465);

  ctx.font = 'bold 70px "Playfair Display", serif';
  ctx.fillText('Hair Oil', 512, 545);

  // Urdu Calligraphy
  ctx.fillStyle = '#f3e5ab';
  ctx.font = 'bold 38px sans-serif';
  ctx.fillText('ڈیل پریمیم ہربل ہیئر آئل', 512, 620);

  // Claims
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WITHOUT STEROID • PARABEN FREE', 512, 695);

  // Red block text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px "Playfair Display", serif';
  ctx.fillText('100% Organic', 512, 850);

  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('120 ML / 4.0 FL OZ', 512, 925);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBeautyCreamTopDiscTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);

  // Gold outer rings
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 220, 0, Math.PI * 2);
  ctx.stroke();

  // DC Leaf Logo
  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 44px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌿', 256, 170);

  ctx.font = 'bold 80px "Playfair Display", serif';
  ctx.fillText('Dail', 256, 260);

  ctx.fillStyle = '#888888';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('BEAUTY CREAM', 256, 310);

  ctx.fillStyle = '#c41e3a';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WITHOUT STEROID', 256, 350);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBeautyCreamFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 984, 472);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 68px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Dail', 512, 140);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('BEAUTY CREAM', 512, 190);

  ctx.fillStyle = '#c41e3a';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('● WITHOUT STEROID ●', 512, 240);

  ctx.fillStyle = '#222222';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('5 DAY BEAUTY PLAN • ANTI-AGING + ANTI-ACNE', 512, 290);

  ctx.fillStyle = '#555555';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('ڈیل بیوٹی کریم (خالص قدرتی نکھار)', 512, 350);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('EXPORT QUALITY • 100% ORGANIC', 512, 420);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createHandFootTopDiscTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f5b722'; // Sunburst Yellow
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#c98a0c';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#b32400';
  ctx.font = 'bold 64px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Dail', 256, 200);

  ctx.font = 'bold 44px "Playfair Display", serif';
  ctx.fillText('Hand & Foot', 256, 270);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WITHOUT STEROID', 256, 330);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createHandFootFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = '#f5b722';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 984, 472);

  ctx.fillStyle = '#c41e3a';
  ctx.font = 'bold 64px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Hand & Foot', 512, 140);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WHITENING CREAM', 512, 190);

  ctx.fillStyle = '#b81e1e';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WITHOUT STEROID', 512, 240);

  ctx.fillStyle = '#222222';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('3-ACTION REPAIR: MOISTURIZING • MULTI-EFFECT • REPAIR', 512, 295);

  ctx.fillStyle = '#666666';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('ڈیل ہینڈ اینڈ فٹ وائٹننگ کریم', 512, 360);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('EXPORT QUALITY • 7 PIECES ACTION', 512, 425);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
