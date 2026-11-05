# AN NHIÊN — CINEMATIC LIVING RETREAT V2.0
Status: implementation blueprint; NOT a released or visually validated build.
Source branch: feat/g1-viewer. Keep main and G1 REV C GLB unchanged.

## Audit (2026-11-05)
- main only contains README; actual React app is on feat/g1-viewer.
- Stack: React 18, TypeScript 5.8, Vite 6, @react-three/fiber 8, Drei 9, Three 0.175.
- Current default is PoeticView SVG (light=true). Switching to 3D mounts Canvas and G1 REV C.
- Current Garden() = cone/cylinder trees; Interior() = box/cylinder furniture; lake = procedural shader; no photoreal textures.
- Camera uses frame-wise lerp and lookAt, but has no collision limits, final presets or immersive transitions.
- Audio includes real forest/stream recordings and simulated night/rain; preserve licenses/credits.
- RelaxPlay already supports CSS rock-ripple, tea and grounding; preserve behavior while migrating water impact to 3D raycasts.
- Geometry G1 is concept-only, not verified engineering. Do not modify GLB or conflate it with approved construction geometry.

## Design locks and coordination
- Clear interior 8m x 6m; footprint 8.4m x 6.4m; gable pitch 12 deg; 900mm eaves.
- Five frame axes at X=-4,-2,0,2,4m; timber concept 160x300mm.
- Glass 6.4m x 3m. Roof eave ceiling datum +3.4m; ridge +4.08m.
- Water surface -0.45m. Terrace depth 1.8m.
- Reserved steel envelope, gutter, connections and drainage are provisional; see docs/D01_D04_TECHNICAL_REVIEW.md.

## Implementation streams
P0 Architecture: preserve G1 immutable, add identified material override mapping, calibrate photometric exposure, PBR textures, softened lighting and tone mapping. Build visual regression reference views for architecture geometry.
P1 Camera: scene preset manager with living, sofa, tea, terrace, lakeside, dusk and night fixed targets; ease transitions; pause camera on user input; clamp bounds; no clipping.
P1 Environment: 3 visual states sun/rain/night first; shader water with pointer raycast ripples; rain instances and fog scaled to quality; scene illumination transitions over 2-4 seconds. Seasonal snow/mist after core passes.
P1 Interaction: move stone splash from CSS overlay into scene-linked world-coordinate ripple after user click; preserve keyboard support and sound opt-in; interactive tea hotspot and breathing mode.
P1 UI: hide left hero when immersive; single bottom-right minimal dock; modal focus and Escape; clear mute + accessibility reduced-motion setting.
P2 Quality: device profiles mobile/tablet/desktop, cap DPR, dynamic quality degradation, GLB inspection, compressed textures, lazy-load; test 360/768/1440px breakpoints, pointer/touch, Safari iOS, Chrome/Edge and no-WebGL fallback.

## Acceptance gates
- Correct architectural envelope dimensions from existing G1; no edits to master geometry.
- All scene presets remain inside walkable view, no near-plane clipping on desktop/mobile.
- Tap/click on water raycasts correctly and ripple centered at point of impact; sound works only by opt-in.
- Weather transitions don't re-mount scene or change camera unexpectedly.
- No layout occlusion of primary view; UI responsive and keyboard accessible.
- npm run build and smoke tests successful. Benchmark target desktop 60fps/mobile 30fps, to be measured (not claimed).
- No release to main or production until reviewed.

## Current risks
- PBR scene quality requires licensed material/vegetation assets and deliberate authoring, not just shaders.
- No proven performance measurements across devices.
- Third-party live demo at chatgpt.site may not be deployed from this GitHub branch; do not assume synchronization.
