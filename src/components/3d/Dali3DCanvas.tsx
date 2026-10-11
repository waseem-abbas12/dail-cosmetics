import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Award, Sparkles, Sun, Eye, Droplet } from 'lucide-react';

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
  const [zoomLevel, setZoomLevel] = useState<number>(4.0);
  const [lightingMode, setLightingMode] = useState<'studio' | 'warm' | 'soft'>('studio');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const envTextureRef = useRef<THREE.Texture | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.08, y: 0.35 });

  // Hotspots definitions per model
  const hotspotsMap: Record<'oil' | 'beauty-cream' | 'hand-foot', Hotspot[]> = {
    oil: [
      { id: 'h-oil-1', title: 'Pharmaceutical Amber Glass', desc: '120ml UV-filtering flint amber glass preserves active cold-pressed rosemary and kalonji bio-flavonoids from oxidation.', position: [0, 0.6, 0.6] },
      { id: 'h-oil-2', title: 'Authentic Dail Security Seal', desc: 'Embossed gold foil seal and registered trademark monogram guarantee zero adulteration or mineral filler oil.', position: [0, 0.1, 0.6] },
      { id: 'h-oil-3', title: 'Precision Dispenser Cap', desc: '24K gold-plated ribbed metallic dropper collar with anti-leak silicone seal for mess-free scalp partings.', position: [0, 1.1, 0.4] },
    ],
    'beauty-cream': [
      { id: 'h-cream-1', title: 'Embossed Gold Safety Lid', desc: 'Concentric precision-threaded lid prevents moisture evaporation and guarantees factory-sealed sterility.', position: [0, 0.6, 0.8] },
      { id: 'h-cream-2', title: '100% Steroid-Free Certification', desc: 'Certified free from clobetasol, betamethasone, mercury, and chemical bleaches. Safe for lifelong barrier repair.', position: [0, 0.0, 0.8] },
      { id: 'h-cream-3', title: '5-Day Radiance Plan', desc: 'Active Kashmiri saffron, niacinamide, and cold-pressed botanical lipids for cellular illumination without peeling.', position: [0, -0.4, 0.8] },
    ],
    'hand-foot': [
      { id: 'h-hf-1', title: 'Sunburst Gold Cap', desc: 'Signature Dail Hand & Foot vibrant gold threaded lid with tamper-proof security ring.', position: [0, 0.6, 0.8] },
      { id: 'h-hf-2', title: '3-Action Cellular Repair', desc: 'Dissolves stubborn melanin on dark knuckles, rough ankles, and calloused heels with raw shea butter and urea.', position: [0, 0.0, 0.8] },
      { id: 'h-hf-3', title: 'Non-Greasy Absorption', desc: 'Rapid skin penetration matrix formulated specifically for Pakistani climates and daily routine.', position: [0, -0.4, 0.8] },
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

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, 0.4, zoomLevel);
    cameraRef.current = camera;

    // 3. High-Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Generate Procedural High-End Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const studioEnvTexture = createPhotorealisticStudioEnvironment(pmremGenerator);
    scene.environment = studioEnvTexture;
    envTextureRef.current = studioEnvTexture;

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfffdfa, 1.4);
    scene.add(ambientLight);

    // Key Light (Main softbox overhead right)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.5);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill Light (Cool daylight softbox from left)
    const fillLight = new THREE.DirectionalLight(0xedf4ff, 1.8);
    fillLight.position.set(-4, 2.5, 3);
    scene.add(fillLight);

    // Rim/Back Light (Warm amber highlight outlining bottle curves)
    const rimLight = new THREE.DirectionalLight(0xf5d996, 2.8);
    rimLight.position.set(0, 3.5, -4);
    scene.add(rimLight);

    // Soft Marble / Travertine Pedestal Ground
    const pedestalGroup = createLuxuryPedestal();
    scene.add(pedestalGroup);

    // 6. Product Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);
    productGroupRef.current = productGroup;

    // Build the realistic model
    buildRealisticProduct(productGroup, modelType);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (productGroupRef.current) {
        if (isAutoRotate && !isDraggingRef.current) {
          targetRotation.current.y += 0.0055;
          targetRotation.current.x = Math.sin(elapsedTime * 0.7) * 0.03 + 0.05;
        }

        // Smooth physics-based damping lerp
        productGroupRef.current.rotation.y += (targetRotation.current.y - productGroupRef.current.rotation.y) * 0.075;
        productGroupRef.current.rotation.x += (targetRotation.current.x - productGroupRef.current.rotation.x) * 0.075;

        // Subtle organic levitation float above pedestal
        productGroupRef.current.position.y = Math.sin(elapsedTime * 1.6) * 0.025 + 0.02;
      }

      renderer.render(scene, camera);
      reqIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse Drag Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.007;
      targetRotation.current.x += deltaY * 0.007;
      targetRotation.current.x = Math.max(-0.35, Math.min(0.35, targetRotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch Support
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

      targetRotation.current.y += deltaX * 0.007;
      targetRotation.current.x += deltaY * 0.007;
      targetRotation.current.x = Math.max(-0.35, Math.min(0.35, targetRotation.current.x));

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
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  // Switch 3D Model on selection change
  useEffect(() => {
    if (productGroupRef.current) {
      buildRealisticProduct(productGroupRef.current, modelType);
      setActiveHotspot(null);
    }
  }, [modelType]);

  const handleZoom = (dir: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const nextZoom = dir === 'in' ? Math.max(2.6, zoomLevel - 0.4) : Math.min(5.2, zoomLevel + 0.4);
    setZoomLevel(nextZoom);
    cameraRef.current.position.z = nextZoom;
  };

  const currentHotspots = hotspotsMap[modelType];

  return (
    <div className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] flex items-center justify-center select-none overflow-hidden ${className}`}>
      
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Top Left Studio Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-800 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#7b3e1d] animate-pulse" />
          <span>Real 3D Studio • Drag 360° to Inspect</span>
        </div>
      </div>

      {/* Top Right Tool Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 pointer-events-auto">
        <button
          onClick={() => handleZoom('in')}
          className="p-2 rounded-xl bg-white/90 hover:bg-white border border-stone-200 text-stone-700 shadow-xs transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-2 rounded-xl bg-white/90 hover:bg-white border border-stone-200 text-stone-700 shadow-xs transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`p-2 rounded-xl border transition-all ${
            isAutoRotate
              ? 'bg-[#7b3e1d] text-white border-[#7b3e1d] shadow-xs'
              : 'bg-white/90 text-stone-700 border-stone-200 hover:bg-white'
          }`}
          title={isAutoRotate ? 'Pause 360° Spin' : 'Resume 360° Spin'}
        >
          <RotateCcw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '9s' }} />
        </button>
      </div>

      {/* Active Hotspot Modal Card */}
      {activeHotspot && (
        <div className="absolute top-16 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-30 p-4 rounded-2xl bg-white border border-[#c59b27]/60 shadow-xl animate-in fade-in duration-200 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7b3e1d] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{activeHotspot.title}</span>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-stone-400 hover:text-stone-800 text-xs font-bold p-0.5"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            {activeHotspot.desc}
          </p>
        </div>
      )}

      {/* Floating Interactive Hotspot Buttons */}
      <div className="absolute inset-y-0 right-4 sm:right-6 pointer-events-none flex flex-col justify-center items-end gap-2.5 z-20">
        <div className="pointer-events-auto flex flex-col gap-2">
          {currentHotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs backdrop-blur-md ${
                activeHotspot?.id === h.id
                  ? 'bg-[#7b3e1d] text-white font-bold scale-105 shadow-md'
                  : 'bg-white/95 border border-stone-200 text-stone-700 hover:border-[#7b3e1d] hover:text-[#7b3e1d]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
              <span>{h.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Model Switcher HUD */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md pointer-events-auto border border-stone-200 shadow-lg">
            <button
              onClick={() => setModelType('oil')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'oil'
                  ? 'bg-[#7b3e1d] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🧴</span>
              <span>Herbal Hair Oil (120ml)</span>
            </button>

            <button
              onClick={() => setModelType('beauty-cream')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'beauty-cream'
                  ? 'bg-[#7b3e1d] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>✨</span>
              <span>Beauty Cream (0% Steroid)</span>
            </button>

            <button
              onClick={() => setModelType('hand-foot')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                modelType === 'hand-foot'
                  ? 'bg-[#7b3e1d] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
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

// ==============================================================
// 1. Photorealistic Studio Environment Map Generator
// ==============================================================
function createPhotorealisticStudioEnvironment(pmremGenerator: THREE.PMREMGenerator): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Soft neutral gradient backdrop
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f2eee9');
  grad.addColorStop(0.5, '#eae5dc');
  grad.addColorStop(1, '#dfd8cc');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Overhead Key Softbox (Bright diffused highlight)
  ctx.fillStyle = 'rgba(255, 253, 245, 0.95)';
  ctx.beginPath();
  ctx.ellipse(320, 140, 180, 80, 0, 0, Math.PI * 2);
  ctx.fill();

  // Left Softbox (Cool clean daylight fill)
  ctx.fillStyle = 'rgba(235, 243, 255, 0.75)';
  ctx.beginPath();
  ctx.ellipse(820, 180, 140, 70, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle warm amber studio light
  ctx.fillStyle = 'rgba(255, 218, 145, 0.55)';
  ctx.beginPath();
  ctx.ellipse(512, 280, 220, 60, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  const renderTarget = pmremGenerator.fromEquirectangular(texture);
  return renderTarget.texture;
}

// ==============================================================
// 2. Luxury Travertine / Marble Pedestal
// ==============================================================
function createLuxuryPedestal(): THREE.Group {
  const pedestalGroup = new THREE.Group();

  // Cylindrical Stone Podium
  const podiumGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.22, 64);
  const podiumMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8,
    roughness: 0.65,
    metalness: 0.05,
  });
  const podiumMesh = new THREE.Mesh(podiumGeo, podiumMat);
  podiumMesh.position.y = -1.02;
  podiumMesh.receiveShadow = true;
  pedestalGroup.add(podiumMesh);

  // Polished Gold Trim Bevel Ring around podium
  const trimGeo = new THREE.TorusGeometry(1.61, 0.02, 16, 64);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.2,
    metalness: 0.85,
  });
  const trimMesh = new THREE.Mesh(trimGeo, goldMat);
  trimMesh.rotation.x = Math.PI / 2;
  trimMesh.position.y = -0.91;
  pedestalGroup.add(trimMesh);

  // Soft Contact Shadow Receiver Plane
  const groundGeo = new THREE.PlaneGeometry(10, 10);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -1.13;
  groundMesh.receiveShadow = true;
  pedestalGroup.add(groundMesh);

  return pedestalGroup;
}

// ==============================================================
// 3. Realistic 3D Product Factory
// ==============================================================
function buildRealisticProduct(group: THREE.Group, type: 'oil' | 'beauty-cream' | 'hand-foot') {
  while (group.children.length > 0) {
    const obj = group.children[0];
    group.remove(obj);
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
  }

  if (type === 'oil') {
    createRealisticHairOil(group);
  } else if (type === 'beauty-cream') {
    createRealisticBeautyCream(group);
  } else {
    createRealisticHandFoot(group);
  }
}

// ==============================================================
// 4. Photorealistic Dail Herbal Hair Oil (120ml Flint Amber Glass)
// ==============================================================
function createRealisticHairOil(group: THREE.Group) {
  const bottleGroup = new THREE.Group();
  bottleGroup.position.y = 0.05;

  const radius = 0.52;
  const height = 1.55;

  // A. Outer Amber Glass Body
  const glassGeo = new THREE.CylinderGeometry(radius, radius, height, 64, 1, false);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2b1704, // Deep therapeutic amber
    roughness: 0.06,
    metalness: 0.05,
    transmission: 0.88,
    thickness: 0.95,
    ior: 1.52, // Optical index for flint cosmetic glass
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.95,
  });
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.castShadow = true;
  glassMesh.receiveShadow = true;
  bottleGroup.add(glassMesh);

  // B. Inner Herbal Oil Liquid (Golden cold-pressed herbal infusion)
  const liquidGeo = new THREE.CylinderGeometry(radius * 0.93, radius * 0.93, height * 0.86, 48);
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xd48806, // Rich golden herbal oil
    emissive: 0x3d2002,
    emissiveIntensity: 0.25,
    roughness: 0.12,
    transmission: 0.65,
    ior: 1.47,
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.y = -height * 0.05;
  bottleGroup.add(liquidMesh);

  // C. Meniscus (Liquid curved surface at top)
  const meniscusGeo = new THREE.CylinderGeometry(radius * 0.93, radius * 0.93, 0.02, 48);
  const meniscusMesh = new THREE.Mesh(meniscusGeo, liquidMat);
  meniscusMesh.position.y = height * 0.38;
  bottleGroup.add(meniscusMesh);

  // D. Realistic Full-Wrap Packaging Label with Dail Authentic Graphics
  const labelGeo = new THREE.CylinderGeometry(radius + 0.003, radius + 0.003, height * 0.72, 64, 1, true);
  const labelTexture = createHairOilLabelTexture();
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.35,
    metalness: 0.25,
    transparent: true,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = -0.05;
  bottleGroup.add(labelMesh);

  // E. Curved Bottle Shoulder
  const shoulderGeo = new THREE.CylinderGeometry(radius * 0.45, radius, 0.32, 64);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, glassMat);
  shoulderMesh.position.y = height / 2 + 0.16;
  bottleGroup.add(shoulderMesh);

  // F. Bottle Neck
  const neckGeo = new THREE.CylinderGeometry(radius * 0.35, radius * 0.35, 0.25, 48);
  const neckMesh = new THREE.Mesh(neckGeo, glassMat);
  neckMesh.position.y = height / 2 + 0.42;
  bottleGroup.add(neckMesh);

  // G. Metallic Gold Collar / Thread Cap (24K Gold Luxury Plating)
  const collarGeo = new THREE.CylinderGeometry(radius * 0.42, radius * 0.42, 0.28, 48);
  const goldCollarMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.18,
    metalness: 0.92,
  });
  const collarMesh = new THREE.Mesh(collarGeo, goldCollarMat);
  collarMesh.position.y = height / 2 + 0.58;
  collarMesh.castShadow = true;
  bottleGroup.add(collarMesh);

  // H. Black Ribbed Rubber Dropper Bulb
  const bulbGeo = new THREE.SphereGeometry(radius * 0.32, 32, 24);
  bulbGeo.scale(1, 1.45, 1);
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.85,
    metalness: 0.05,
  });
  const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
  bulbMesh.position.y = height / 2 + 0.88;
  bulbMesh.castShadow = true;
  bottleGroup.add(bulbMesh);

  // I. Inner Glass Pipette inside the bottle
  const pipetteGeo = new THREE.CylinderGeometry(0.04, 0.04, height * 1.1, 16);
  const pipetteMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    roughness: 0.05,
    ior: 1.5,
  });
  const pipetteMesh = new THREE.Mesh(pipetteGeo, pipetteMat);
  pipetteMesh.position.y = 0.2;
  bottleGroup.add(pipetteMesh);

  group.add(bottleGroup);
}

// ==============================================================
// 5. Photorealistic Dail Beauty Cream (50g Export Jar with Embossed Lid)
// ==============================================================
function createRealisticBeautyCream(group: THREE.Group) {
  const jarGroup = new THREE.Group();
  jarGroup.position.y = -0.15;

  const jarRadius = 0.82;
  const jarHeight = 0.65;

  // A. Heavy Base Clear / Frosted Acrylic Cosmetic Jar
  const jarGeo = new THREE.CylinderGeometry(jarRadius, jarRadius * 0.94, jarHeight, 64);
  const jarGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xfffcf7,
    roughness: 0.15,
    metalness: 0.05,
    transmission: 0.72,
    thickness: 1.2,
    ior: 1.49,
    clearcoat: 0.9,
  });
  const jarMesh = new THREE.Mesh(jarGeo, jarGlassMat);
  jarMesh.castShadow = true;
  jarMesh.receiveShadow = true;
  jarGroup.add(jarMesh);

  // B. Inner White Radiance Cream
  const creamGeo = new THREE.CylinderGeometry(jarRadius * 0.84, jarRadius * 0.78, jarHeight * 0.82, 48);
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfaf8f2, // Pearl cream
    roughness: 0.45,
    metalness: 0.02,
  });
  const creamMesh = new THREE.Mesh(creamGeo, creamMat);
  creamMesh.position.y = -0.02;
  jarGroup.add(creamMesh);

  // C. Full Wrap Jar Label (Authentic Red & Gold Dail Packaging)
  const labelGeo = new THREE.CylinderGeometry(jarRadius + 0.002, jarRadius * 0.94 + 0.002, jarHeight * 0.65, 64, 1, true);
  const labelTexture = createBeautyCreamLabelTexture();
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.25,
    metalness: 0.3,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = 0.02;
  jarGroup.add(labelMesh);

  // D. Metallic Embossed Gold Lid with Threaded Bevel
  const lidRadius = jarRadius * 1.02;
  const lidHeight = 0.32;
  const lidGeo = new THREE.CylinderGeometry(lidRadius, lidRadius, lidHeight, 64);
  const goldLidMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.18,
    metalness: 0.92,
  });
  const lidMesh = new THREE.Mesh(lidGeo, goldLidMat);
  lidMesh.position.y = jarHeight / 2 + lidHeight / 2 + 0.02;
  lidMesh.castShadow = true;
  jarGroup.add(lidMesh);

  // E. Lid Top Embossed Disc with DC Crest Texture
  const crestDiscGeo = new THREE.CircleGeometry(lidRadius * 0.92, 64);
  const lidCrestTexture = createLidCrestTexture('Dail Beauty Cream');
  const crestMat = new THREE.MeshStandardMaterial({
    map: lidCrestTexture,
    roughness: 0.2,
    metalness: 0.88,
  });
  const crestMesh = new THREE.Mesh(crestDiscGeo, crestMat);
  crestMesh.rotation.x = -Math.PI / 2;
  crestMesh.position.y = jarHeight / 2 + lidHeight + 0.022;
  jarGroup.add(crestMesh);

  group.add(jarGroup);
}

// ==============================================================
// 6. Photorealistic Dail Hand & Foot Cream (Sunburst Gold Jar)
// ==============================================================
function createRealisticHandFoot(group: THREE.Group) {
  const jarGroup = new THREE.Group();
  jarGroup.position.y = -0.15;

  const jarRadius = 0.82;
  const jarHeight = 0.65;

  // Jar body
  const jarGeo = new THREE.CylinderGeometry(jarRadius, jarRadius * 0.94, jarHeight, 64);
  const jarMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.75,
    thickness: 1.1,
    ior: 1.49,
  });
  const jarMesh = new THREE.Mesh(jarGeo, jarMat);
  jarMesh.castShadow = true;
  jarMesh.receiveShadow = true;
  jarGroup.add(jarMesh);

  // Wrap Label with Signature Dail Hand & Foot Design
  const labelGeo = new THREE.CylinderGeometry(jarRadius + 0.002, jarRadius * 0.94 + 0.002, jarHeight * 0.65, 64, 1, true);
  const labelTexture = createHandFootLabelTexture();
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.28,
    metalness: 0.35,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = 0.02;
  jarGroup.add(labelMesh);

  // Vibrant Sunburst Gold Lid
  const lidRadius = jarRadius * 1.02;
  const lidHeight = 0.32;
  const lidGeo = new THREE.CylinderGeometry(lidRadius, lidRadius, lidHeight, 64);
  const yellowGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf5b722, // Signature packaging gold/yellow
    roughness: 0.22,
    metalness: 0.85,
  });
  const lidMesh = new THREE.Mesh(lidGeo, yellowGoldMat);
  lidMesh.position.y = jarHeight / 2 + lidHeight / 2 + 0.02;
  lidMesh.castShadow = true;
  jarGroup.add(lidMesh);

  // Lid Top Disc
  const crestDiscGeo = new THREE.CircleGeometry(lidRadius * 0.92, 64);
  const lidCrestTexture = createLidCrestTexture('Hand & Foot Whitening');
  const crestMat = new THREE.MeshStandardMaterial({
    map: lidCrestTexture,
    roughness: 0.22,
    metalness: 0.82,
  });
  const crestMesh = new THREE.Mesh(crestDiscGeo, crestMat);
  crestMesh.rotation.x = -Math.PI / 2;
  crestMesh.position.y = jarHeight / 2 + lidHeight + 0.022;
  jarGroup.add(crestMesh);

  group.add(jarGroup);
}

// ==============================================================
// 7. Dynamic Canvas Texture Generators for Authentic Packaging Labels
// ==============================================================

/**
 * Dail 100% Organic Herbal Hair Oil Label (2048x1024 Wrap Texture)
 */
function createHairOilLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep Obsidian Velvet Black Background
  ctx.fillStyle = '#08090c';
  ctx.fillRect(0, 0, 2048, 1024);

  // Front Facing Region is centered around X = 1024 (center 800px)
  const cx = 1024;

  // Gold Decorative Top & Bottom Border Stripes
  const goldGrad = ctx.createLinearGradient(0, 0, 2048, 0);
  goldGrad.addColorStop(0, '#c59b27');
  goldGrad.addColorStop(0.5, '#f5d996');
  goldGrad.addColorStop(1, '#c59b27');

  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 30, 2048, 8);
  ctx.fillRect(0, 986, 2048, 8);

  // Crimson Red Banner Stripe (From real packaging photo)
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - 380, 720, 760, 48);

  // Official Gold Crest / Dual Ring Logo with Organic Leaves
  ctx.save();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, 230, 85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, 230, 72, 0, Math.PI * 2);
  ctx.stroke();

  // DC Monogram inside seal
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 54px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DC', cx, 230);
  ctx.restore();

  // "DAIL COSMETICS" Primary Wordmark
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('DAIL COSMETICS', cx, 370);

  // Subtitle
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('EXPORT QUALITY • 100% ORGANIC', cx, 420);

  // Product Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
  ctx.fillText('PREMIUM HERBAL', cx, 520);
  ctx.fillStyle = '#f5d996';
  ctx.fillText('HAIR OIL', cx, 595);

  // Botanical Active Ingredients Line
  ctx.fillStyle = '#d1d5db';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Kalonji • Rosemary • Amla • Almond • Castor', cx, 660);

  // Crimson Banner Text: WITHOUT STEROID
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('100% WITHOUT STEROID & MERCURY', cx, 752);

  // Volume & Origin
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('120 ML / 4.0 FL. OZ.', cx, 840);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Manufactured & Packed in Pakistan • PCSIR Certified', cx, 910);

  // Back Label Specs (Left and Right sides of wrap)
  // Directions (Left)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('DIRECTIONS FOR USE', 100, 260);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '16px sans-serif';
  ctx.fillText('1. Warm 5-10ml in palms.', 100, 310);
  ctx.fillText('2. Gently massage scalp for 7-10 mins.', 100, 350);
  ctx.fillText('3. Leave overnight or for at least 2 hrs.', 100, 390);
  ctx.fillText('4. Wash with mild botanical cleanser.', 100, 430);
  ctx.fillText('Apply 3 times a week for rapid regrowth.', 100, 470);

  // Certifications (Right)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('GUARANTEED STANDARDS', 1948, 260);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '16px sans-serif';
  ctx.fillText('✓ 0% Mineral Oil & Silicones', 1948, 310);
  ctx.fillText('✓ Cold-Pressed Active Extraction', 1948, 350);
  ctx.fillText('✓ Dermatologically Verified', 1948, 390);
  ctx.fillText('✓ Halal Certified Ingredients', 1948, 430);
  ctx.fillText('Batch: DC-PK-2026/89B', 1948, 470);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Dail Beauty Cream Wrap Label (2048x512)
 */
function createBeautyCreamLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep Obsidian Background
  ctx.fillStyle = '#0a0b0e';
  ctx.fillRect(0, 0, 2048, 512);

  const cx = 1024;

  // Gold Borders
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(0, 15, 2048, 6);
  ctx.fillRect(0, 491, 2048, 6);

  // Red Accent Stripe
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - 350, 340, 700, 44);

  // Crest
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, 100, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DC', cx, 100);

  // Brand Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
  ctx.fillText('DAIL BEAUTY CREAM', cx, 200);

  // Subtitle
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('5-DAY BEAUTY PLAN • EXPORT QUALITY', cx, 260);

  // Red Stripe Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('STRICTLY WITHOUT STEROID', cx, 362);

  // Weight
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('NET WT. 50g e', cx, 430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/**
 * Dail Hand & Foot Wrap Label
 */
function createHandFootLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0d0f14';
  ctx.fillRect(0, 0, 2048, 512);

  const cx = 1024;

  ctx.fillStyle = '#f5b722';
  ctx.fillRect(0, 15, 2048, 6);
  ctx.fillRect(0, 491, 2048, 6);

  // Yellow Gold Banner
  ctx.fillStyle = '#f5b722';
  ctx.fillRect(cx - 360, 340, 720, 44);

  ctx.strokeStyle = '#f5b722';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, 100, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#f5b722';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DC', cx, 100);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px "Playfair Display", Georgia, serif';
  ctx.fillText('HAND & FOOT WHITENING CREAM', cx, 200);

  ctx.fillStyle = '#f5b722';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('3-ACTION REPAIR MATRIX • ZERO STEROIDS', cx, 260);

  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('INTENSE BARRIER REPAIR & NOURISHMENT', cx, 362);

  ctx.fillStyle = '#f5b722';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('NET WT. 60g e', cx, 430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/**
 * Circular Lid Crest Texture for Jar Tops (1024x1024)
 */
function createLidCrestTexture(title: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const cx = 512;
  const cy = 512;

  // Gold metallic radial gradient
  const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 512);
  grad.addColorStop(0, '#fce8a6');
  grad.addColorStop(0.5, '#d4af37');
  grad.addColorStop(1, '#9a7212');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Concentric Embossed Grooves
  ctx.strokeStyle = '#fef1c5';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 470, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#7c590b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 460, 0, Math.PI * 2);
  ctx.stroke();

  // Center Seal
  ctx.strokeStyle = '#7c590b';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 260, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#fef1c5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 245, 0, Math.PI * 2);
  ctx.stroke();

  // Logo Monogram
  ctx.fillStyle = '#422e03';
  ctx.font = 'bold 120px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DC', cx, cy - 20);

  // Brand Name Arc
  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.fillText('DAIL COSMETICS', cx, cy + 90);

  // Top and Bottom Curves
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('100% ORGANIC • EXPORT QUALITY', cx, 160);
  ctx.fillText(title.toUpperCase(), cx, 880);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
