import {useEffect,useState} from 'react';
export type VisualQuality='auto'|'sharp'|'balanced'|'saving';
export function useVisualQuality(){
 const [quality,setQuality]=useState<VisualQuality>('auto');
 const [pixelRatio,setPixelRatio]=useState(()=>typeof window==='undefined'?1:window.devicePixelRatio||1);
 const [compact,setCompact]=useState(()=>typeof window!=='undefined'&&window.innerWidth<760);
 useEffect(()=>{
  const update=()=>{setPixelRatio(window.devicePixelRatio||1);setCompact(window.innerWidth<760)};
  window.addEventListener('resize',update);
  return ()=>window.removeEventListener('resize',update);
 },[]);
 const cap=quality==='saving'?1:quality==='balanced'?1.5:quality==='sharp'?2:compact?1.35:1.75;
 const dpr=Math.min(pixelRatio,cap);
 return {quality,setQuality,dpr,compact};
}
