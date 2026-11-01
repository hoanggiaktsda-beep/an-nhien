import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './style.css';

type SceneMode = 'sun' | 'rain' | 'night';
const modes: Record<SceneMode,{label:string;color:string;intensity:number}> = {
  sun:{label:'Nắng',color:'#fff4dc',intensity:2},
  rain:{label:'Mưa',color:'#bdc9d6',intensity:.8},
  night:{label:'Đêm',color:'#68748e',intensity:.25},
};
function House(){const gltf=useGLTF(`${import.meta.env.BASE_URL}models/an-nhien-g1-rev-c.glb`);return <primitive object={gltf.scene} />}
const views=[{label:'Tổng thể',position:[12,10,14] as [number,number,number]},{label:'Phía hồ',position:[0,5,16] as [number,number,number]},{label:'Góc cao',position:[11,17,9] as [number,number,number]}];
class ViewerBoundary extends React.Component<{children: React.ReactNode},{failed:boolean}>{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed?<div role="status" className="viewer-fallback"><h2>Thiết bị chưa mở được mô hình 3D</h2><p>Hãy dùng trình duyệt hỗ trợ WebGL 2 để xoay và khám phá ngôi nhà.</p><a href={`${import.meta.env.BASE_URL}models/an-nhien-g1-rev-c.glb`} download>Tải mô hình GLB</a></div>:this.props.children}
}
function App(){const [mode,setMode]=useState<SceneMode>('sun');const [view,setView]=useState(0);const v=modes[mode];return <div className="app">
<header><div className="wordmark">AN NHIÊN <span>THE HOUSE OF STILLNESS</span></div><div className="status">G1 REV C · CONCEPT BLOCKOUT</div></header>
<main><section className="intro"><p className="eyebrow">MỘT KHOẢNG LẶNG RIÊNG TƯ</p><h1>Chạm vào<br/><em>sự bình yên.</em></h1><p>Ngôi nhà bên hồ — hành trình thử nghiệm không gian 3D. Bản dựng hiện tại là mô hình kiến trúc G1, chưa phải thiết kế thi công.</p></section>
<section className="viewer" aria-label="Mô hình 3D AN NHIÊN"><ViewerBoundary key={view}><Canvas key={view} shadows camera={{position:views[view].position,fov:42,near:0.1,far:150}}><color attach="background" args={[v.color]}/><ambientLight intensity={v.intensity}/><directionalLight position={[7,12,8]} intensity={v.intensity*1.3}/><React.Suspense fallback={null}><House/></React.Suspense><OrbitControls target={[0,1.5,0]} minDistance={3} maxDistance={40} enablePan /></Canvas></ViewerBoundary><div className="viewer-label">Kéo để xoay · Cuộn để thu phóng</div></section>
<section className="controls"><div><h2>Ánh sáng</h2><div className="buttons">{(Object.keys(modes) as SceneMode[]).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>setMode(m)}>{modes[m].label}</button>)}</div></div><div><h2>Góc nhìn</h2><div className="buttons">{views.map((x,i)=><button key={x.label} aria-pressed={view===i} onClick={()=>setView(i)}>{x.label}</button>)}</div></div></section>
</main><footer>AN NHIÊN · DIGITAL SANCTUARY <span>G1 chỉ là blockout · Chưa có kiểm chứng kết cấu, chống thấm và an toàn.</span></footer></div>}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
