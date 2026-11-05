import {useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Stars,ContactShadows} from '@react-three/drei';
import type {Group} from 'three';
import type {Mood} from './weather';

export function CinematicAtmosphere({mood}:{mood:Mood}){
 const night=mood==='night', raining=mood==='rain'||mood==='drizzle';
 const lantern=useRef<Group>(null);
 const rain=useMemo(()=>Array.from({length:180},(_,i)=>({
   x:Math.sin(i*17.23)*10,z:Math.cos(i*9.17)*11,
   y:1+(i*7.71)%8,speed:1.5+(i%7)*.4
 })),[]);
 const drops=useRef<Group>(null);
 useFrame(({clock},delta)=>{
   if(lantern.current) lantern.current.rotation.y=Math.sin(clock.elapsedTime*.35)*.025;
   if(drops.current) drops.current.children.forEach((obj,i)=>{
     const d=rain[i];obj.position.y-=delta*d.speed*2.4;
     if(obj.position.y<-.3)obj.position.y=7+(i%3);
   });
 });
 return <>
   <hemisphereLight args={[night?'#6d819f':'#d7e8e0',night?'#1b2529':'#7a6852',night?.4:1.15]}/>
   <directionalLight position={[-6,9,-8]} intensity={night?.18:raining?.55:2.2} color={night?'#b2c7f2':'#ffe2b5'} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-bias={-.0003}/>
   <ContactShadows position={[0,.012,0]} opacity={night?.22:.32} scale={9} blur={2.5} far={3} resolution={256} color="#182b2c"/>
   {night&&<Stars radius={70} depth={30} count={500} factor={2} saturation={0} fade speed={.1}/>}
   <group ref={lantern} position={[2.7,0,1.8]}>
     <mesh position={[0,.9,0]} castShadow><cylinderGeometry args={[.12,.16,1.8,12]}/><meshStandardMaterial color="#4c4033" roughness={.85}/></mesh>
     <mesh position={[0,1.88,0]}><sphereGeometry args={[.23,24,16]}/><meshStandardMaterial color="#ffdd9a" emissive="#ffc16b" emissiveIntensity={night?2.2:.35} roughness={.4}/></mesh>
     <pointLight position={[0,1.9,0]} color="#ffbd78" intensity={night?13:2} distance={5} decay={2}/>
   </group>
   {raining&&<group ref={drops}>{rain.map((d,i)=><mesh key={i} position={[d.x,d.y,d.z]} rotation={[0,0,-.15]}><cylinderGeometry args={[.006,.006,mood==='drizzle'?.12:.22,3]}/><meshBasicMaterial color="#cbdcdb" transparent opacity={mood==='drizzle'?.17:.32} depthWrite={false}/></mesh>)}</group>}
 </>;
}
