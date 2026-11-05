import {useEffect,useMemo} from 'react';
import {useGLTF} from '@react-three/drei';
import {Mesh,MeshStandardMaterial,Color,FrontSide} from 'three';
// Non-destructive material override: clone the scene, never alter the source GLB.
export function CinematicHouse(){
 const source=useGLTF(`${import.meta.env.BASE_URL}models/an-nhien-g1-rev-c.glb`);
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
    else if(/timber|wood|beam|roof.frame|go\b/.test(name)){m.color=new Color('#80664b');m.roughness=.72;m.metalness=0;}
    else if(/stone|concrete|floor|slab|san\b/.test(name)){m.color=new Color('#b3ad9e');m.roughness=.84;m.metalness=.02;}
    else if(/metal|steel|gutter|mang/.test(name)){m.color=new Color('#494f4b');m.roughness=.48;m.metalness=.65;}
    return m;
   };
   node.material=Array.isArray(node.material)?node.material.map(apply):apply(node.material);
  });
  return clone;
 },[source.scene]);
 useEffect(()=>()=>{scene.traverse(n=>{if(n instanceof Mesh){const mats=Array.isArray(n.material)?n.material:[n.material];mats.forEach(m=>{if(m!==undefined && !source.scene.getObjectById(n.id))m.dispose()})}})},[scene,source.scene]);
 return <primitive object={scene}/>;
}
