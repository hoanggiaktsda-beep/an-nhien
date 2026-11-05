import React from 'react';
import {RoundedBox} from '@react-three/drei';
// Reversible furnishing layer. G1 architecture stays immutable.
// All dimensions in metres; placeholders pending approved furniture assets.
function Fabric({color}:{color:string}){return <meshStandardMaterial color={color} roughness={.94} metalness={0}/>}
export function CinematicInterior(){
 return <group name="V2_REVERSIBLE_FURNITURE_STAGING">
   {/* Linen sofa: upholstered seat, independent cushions and timber plinth */}
   <group position={[-1.65,0,-1.65]}>
     <RoundedBox args={[2.9,.17,1.12]} radius={.06} smoothness={4} position={[0,.17,0]} castShadow receiveShadow><meshStandardMaterial color="#65503d" roughness={.8}/></RoundedBox>
     <RoundedBox args={[2.75,.25,1.05]} radius={.10} smoothness={4} position={[0,.42,0]} castShadow receiveShadow><Fabric color="#c6b9a4"/></RoundedBox>
     {[-.86,0,.86].map(x=><RoundedBox key={x} args={[.85,.13,.84]} radius={.055} smoothness={4} position={[x,.61,.03]} rotation={[.02,0,0]} castShadow><Fabric color="#ded3be"/></RoundedBox>)}
     <RoundedBox args={[2.8,.68,.20]} radius={.08} smoothness={4} position={[0,.78,-.51]} castShadow><Fabric color="#b4a58e"/></RoundedBox>
     {[-1.39,1.39].map(x=><RoundedBox key={x} args={[.22,.48,1.03]} radius={.07} smoothness={4} position={[x,.65,0]} castShadow><Fabric color="#b7a992"/></RoundedBox>)}
   </group>
   {/* Travertine coffee table and low woven rug */}
   <mesh position={[-1.2,.018,.25]} receiveShadow><boxGeometry args={[3.45,.028,2.25]}/><meshStandardMaterial color="#9b9886" roughness={1}/></mesh>
   <mesh position={[-1.2,.36,.30]} castShadow receiveShadow><cylinderGeometry args={[.72,.74,.09,64]}/><meshStandardMaterial color="#bdb09a" roughness={.78}/></mesh>
   <mesh position={[-1.2,.17,.30]} castShadow><cylinderGeometry args={[.23,.30,.32,48]}/><meshStandardMaterial color="#74604b" roughness={.85}/></mesh>
   {/* Ceramic tea set */}
   <mesh position={[-1.25,.46,.28]} castShadow><cylinderGeometry args={[.095,.075,.11,24]}/><meshStandardMaterial color="#e4d6b8" roughness={.45}/></mesh>
   <mesh position={[-.94,.43,.26]} castShadow><cylinderGeometry args={[.07,.055,.055,24]}/><meshStandardMaterial color="#d2c5ab" roughness={.52}/></mesh>
   {/* Warm task lamp */}
   <group position={[-3.3,0,1.5]}>
     <mesh position={[0,.72,0]} castShadow><cylinderGeometry args={[.035,.07,1.44,16]}/><meshStandardMaterial color="#796a50" metalness={.5} roughness={.4}/></mesh>
     <mesh position={[0,1.46,0]} castShadow><coneGeometry args={[.39,.43,48,1,true]}/><meshStandardMaterial color="#d5b98b" side={2} roughness={.85} emissive="#a16b36" emissiveIntensity={.12}/></mesh>
     <pointLight position={[0,1.36,0]} color="#ffcb8e" intensity={3.2} distance={3.8} decay={2}/>
   </group>
 </group>
}
