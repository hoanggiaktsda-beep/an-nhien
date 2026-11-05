import React,{useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import type {Group} from 'three';

// Procedural, low-poly botanical staging; deliberately kept outside G1 geometry.
function Cypress({x,z,height,phase}:{x:number;z:number;height:number;phase:number}){
 const crown=useRef<Group>(null);
 useFrame(({clock})=>{if(crown.current)crown.current.rotation.z=Math.sin(clock.elapsedTime*.33+phase)*.012});
 return <group position={[x,-.43,z]} scale={height}>
   <mesh castShadow position={[0,.93,0]}><cylinderGeometry args={[.055,.11,1.86,8]}/><meshStandardMaterial color="#574838" roughness={1}/></mesh>
   <group ref={crown}>
    {[0,1,2,3].map(i=><mesh castShadow key={i} position={[0,1.12+i*.43,0]}><coneGeometry args={[.68-i*.11,1.05,9]}/><meshStandardMaterial color={i%2?'#3d5c4e':'#52715d'} roughness={1}/></mesh>)}
   </group>
 </group>;
}
function Rock({x,z,s}:{x:number;z:number;s:number}){
 return <mesh position={[x,-.25,z]} rotation={[.1,x*.2,.13]} scale={[s,s*.6,s*.85]} castShadow receiveShadow>
  <dodecahedronGeometry args={[.65,1]}/><meshStandardMaterial color="#777b70" roughness={1}/>
 </mesh>;
}
export function CinematicGarden(){
 const trees=useMemo(()=>Array.from({length:38},(_,i)=>{
  const left=i<19;const n=left?i:i-19;
  return {x:(left?-1:1)*(7.8+(n%5)*1.25),z:5+Math.floor(n/5)*3.7+(n%3)*.6,height:.75+(i%6)*.12,phase:i*.71};
 }),[]);
 return <group name="V2_LANDSCAPE_STAGING">
  {trees.map((t,i)=><Cypress key={i} {...t}/>)}
  {[-10,-8,8,10].map((x,i)=><Rock key={i} x={x} z={7+i*1.6} s={1+(i%3)*.4}/>)}
 </group>;
}
