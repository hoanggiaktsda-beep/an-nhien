import {useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {DoubleSide,Group} from 'three';
type Tree={x:number;z:number;height:number;seed:number};
const green=['#284d3c','#3b6247','#496f4e','#607b51','#365744'];
function CanopyTree({x,z,height,seed}:Tree){
 const crown=useRef<Group>(null);
 const branches=useMemo(()=>Array.from({length:7},(_,i)=>({angle:i*2.399+seed,radius:.36+(i%3)*.16,y:1.6+(i%4)*.22,scale:.52+(i%4)*.12})),[seed]);
 useFrame(({clock})=>{if(crown.current)crown.current.rotation.z=Math.sin(clock.elapsedTime*.35+seed)*.009});
 return <group position={[x,-.43,z]} scale={height}>
  <mesh position={[0,1.1,0]} castShadow><cylinderGeometry args={[.065,.14,2.2,9]}/><meshStandardMaterial color="#4c3c2c" roughness={1}/></mesh>
  <group ref={crown}>
   {branches.map((b,i)=><group key={i} position={[Math.cos(b.angle)*b.radius,b.y,Math.sin(b.angle)*b.radius]}>
    <mesh castShadow receiveShadow scale={[b.scale*1.3,b.scale*.85,b.scale]}><icosahedronGeometry args={[1,1]}/><meshStandardMaterial color={green[(i+seed)%green.length]} roughness={.96} flatShading/></mesh>
    <mesh position={[0,-.25,0]} scale={[b.scale*1.4,.2,b.scale*1.1]}><sphereGeometry args={[1,10,6]}/><meshStandardMaterial color="#294b38" roughness={1} side={DoubleSide}/></mesh>
   </group>)}
  </group>
 </group>;
}
function Fern({x,z,scale}:{x:number;z:number;scale:number}){
 return <group position={[x,-.42,z]} scale={scale}>
  {Array.from({length:7},(_,i)=>{const a=i*Math.PI*2/7;return <mesh key={i} position={[Math.cos(a)*.25,.15,Math.sin(a)*.25]} rotation={[0,-a,.5]} castShadow>
   <sphereGeometry args={[.37,7,5]}/><meshStandardMaterial color={green[i%green.length]} roughness={1} flatShading/>
  </mesh>})}
 </group>;
}
function Rock({x,z,s}:{x:number;z:number;s:number}){
 return <mesh position={[x,-.32,z]} rotation={[.1,x*.2,.13]} scale={[s,s*.6,s*.85]} castShadow receiveShadow>
  <dodecahedronGeometry args={[.65,1]}/><meshStandardMaterial color="#777b70" roughness={1}/>
 </mesh>;
}
export function CinematicGarden(){
 // Perimeter planting only; the architectural G1 model and its openings remain untouched.
 const trees=useMemo(()=>Array.from({length:26},(_,i)=>{
  const left=i<13,n=i%13;
  return {x:(left?-1:1)*(7.3+(n%3)*1.4),z:4+Math.floor(n/3)*3.8+(n%2)*.7,height:.8+(i%5)*.17,seed:i};
 }),[]);
 const undergrowth=useMemo(()=>Array.from({length:48},(_,i)=>({
  x:(i%2?-1:1)*(6.7+(i%4)*.8),z:4+Math.floor(i/4)*2.1,scale:.35+(i%5)*.1
 })),[]);
 return <group name="V22_BOTANICAL_STAGING">
  {trees.map((t,i)=><CanopyTree key={i} {...t}/>)}
  {undergrowth.map((f,i)=><Fern key={i} {...f}/>)}
  {[-10,-8,8,10].map((x,i)=><Rock key={i} x={x} z={7+i*1.6} s={1+(i%3)*.4}/>)}
 </group>;
}
