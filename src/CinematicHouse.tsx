import {useEffect,useMemo} from 'react';
import {useGLTF} from '@react-three/drei';
import {Mesh,MeshStandardMaterial,Color,FrontSide,DataTexture,RGBAFormat,RepeatWrapping,SRGBColorSpace,LinearFilter} from 'three';
// Non-destructive material override: clone the scene, never alter the source GLB.
export function CinematicHouse(){
 const source=useGLTF(`${import.meta.env.BASE_URL}models/an-nhien-g1-rev-c.glb`);
 const woodGrain=useMemo(()=>{
  const w=128,h=256,data=new Uint8Array(w*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const wave=Math.sin(x*.29+Math.sin(y*.042)*3)*.13+Math.sin(x*.075+y*.012)*.1;
   const fine=Math.sin(x*1.12+y*.04)*.035;
   const v=Math.max(.42,Math.min(1.15,.82+wave+fine));
   const p=(y*w+x)*4;data[p]=Math.round(130*v);data[p+1]=Math.round(94*v);data[p+2]=Math.round(62*v);data[p+3]=255;
  }
  const t=new DataTexture(data,w,h,RGBAFormat);t.wrapS=t.wrapT=RepeatWrapping;t.colorSpace=SRGBColorSpace;t.magFilter=LinearFilter;t.needsUpdate=true;return t;
 },[]);
 const scene=useMemo(()=>{
  const clone=source.scene.clone(true);
  clone.traverse(node=>{
   if(!(node instanceof Mesh))return;
   node.castShadow=true;node.receiveShadow=true;
   const name=(node.name+' '+(Array.isArray(node.material)?node.material.map(m=>m.name).join(' '):node.material?.name||'')).toLowerCase();
   const apply=(material:any)=>{
    const m=material.clone() as MeshStandardMaterial;
    if(!m.isMeshStandardMaterial)return material;
    m.side=FrontSide;
    if(/glass|glaz|window|kinh/.test(name)){m.color=new Color('#a9c6c3');m.metalness=.05;m.roughness=.12;m.transparent=true;m.opacity=.3;m.depthWrite=false;}
    else if(/timber|wood|beam|roof.frame/.test(name)){m.color=new Color('#ffffff');m.map=woodGrain;m.roughness=.7;m.metalness=0;}
    else if(/stone|concrete|floor|slab/.test(name)){m.color=new Color('#b3ad9e');m.roughness=.84;m.metalness=.02;}
    else if(/metal|steel|gutter/.test(name)){m.color=new Color('#494f4b');m.roughness=.48;m.metalness=.65;}
    return m;
   };
   node.material=Array.isArray(node.material)?node.material.map(apply):apply(node.material);
  });
  return clone;
 },[source.scene,woodGrain]);
 useEffect(()=>()=>{scene.traverse(n=>{if(n instanceof Mesh){const mats=Array.isArray(n.material)?n.material:[n.material];mats.forEach(m=>m.dispose())}})},[scene]);
 useEffect(()=>()=>woodGrain.dispose(),[woodGrain]);
 return <primitive object={scene}/>;
}
