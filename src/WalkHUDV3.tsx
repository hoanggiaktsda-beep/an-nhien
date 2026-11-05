import {useEffect,useState} from 'react';
import type {WalkInput} from './WalkCameraV3';
type Props={onChange:(value:WalkInput)=>void;onExit:()=>void;onInteract:()=>void};
const empty:WalkInput={forward:0,side:0,lookX:0,lookY:0};
export function WalkHUD({onChange,onExit,onInteract}:Props){
 const [keys,setKeys]=useState<string[]>([]);
 const [touch,setTouch]=useState<WalkInput>(empty);
 useEffect(()=>{
  const down=(e:KeyboardEvent)=>{
   if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyE','Escape'].includes(e.code))e.preventDefault();
   if(e.code==='KeyE'&&!e.repeat)onInteract();
   if(e.code==='Escape')onExit();
   setKeys(old=>old.includes(e.code)?old:[...old,e.code]);
  };
  const up=(e:KeyboardEvent)=>setKeys(old=>old.filter(k=>k!==e.code));
  const blur=()=>setKeys([]);
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur);
  return ()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur)};
 },[onExit,onInteract]);
 useEffect(()=>{
  const pressed=(...codes:string[])=>codes.some(c=>keys.includes(c))?1:0;
  onChange({forward:pressed('KeyW','ArrowUp')-pressed('KeyS','ArrowDown')+touch.forward,side:pressed('KeyD','ArrowRight')-pressed('KeyA','ArrowLeft')+touch.side,lookX:touch.lookX,lookY:touch.lookY});
 },[keys,touch,onChange]);
 const pad=(label:string,change:Partial<WalkInput>)=><button type="button" aria-label={label} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);setTouch(v=>({...v,...change}))}} onPointerUp={()=>setTouch(empty)} onPointerCancel={()=>setTouch(empty)}>{label}</button>;
 return <div className="walk-hud" aria-label="Điều khiển khám phá 3D">
  <div className="walk-help">W A S D: đi lại · Kéo chuột: nhìn · E: tương tác · Esc: thoát</div>
  <div className="walk-pad">{pad('Tiến lên',{forward:1})}{pad('Sang trái',{side:-1})}{pad('Lùi lại',{forward:-1})}{pad('Sang phải',{side:1})}</div>
  <div className="walk-look">{pad('Nhìn trái',{lookX:-1})}{pad('Nhìn lên',{lookY:-1})}{pad('Nhìn xuống',{lookY:1})}{pad('Nhìn phải',{lookX:1})}</div>
  <button type="button" onClick={onInteract}>Tương tác (E)</button>
  <button type="button" onClick={onExit}>Thoát đi bộ</button>
 </div>;
}
