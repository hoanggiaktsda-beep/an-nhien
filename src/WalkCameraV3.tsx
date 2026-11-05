import {useFrame,useThree} from '@react-three/fiber';
import {useRef} from 'react';
import {Euler,MathUtils,Vector3} from 'three';
export type WalkInput={forward:number;side:number;lookX:number;lookY:number};
export function WalkCamera({input}:{input:WalkInput}){
 const {camera}=useThree();
 const pos=useRef(new Vector3(0,1.6,-1.8));
 const yaw=useRef(0),pitch=useRef(0);
 useFrame((_,dt)=>{
  const d=Math.min(dt,.05);
  yaw.current-=input.lookX*d;
  pitch.current=MathUtils.clamp(pitch.current-input.lookY*d,-1.2,1.2);
  camera.quaternion.setFromEuler(new Euler(pitch.current,yaw.current,0,'YXZ'));
  const f=input.forward,s=input.side,speed=d*1.6/Math.max(1,Math.hypot(f,s));
  pos.current.x=MathUtils.clamp(pos.current.x+(-Math.sin(yaw.current)*f+Math.cos(yaw.current)*s)*speed,-2.6,2.6);
  pos.current.z=MathUtils.clamp(pos.current.z+(-Math.cos(yaw.current)*f-Math.sin(yaw.current)*s)*speed,-2.7,2.1);
  camera.position.copy(pos.current);
 });
 return null;
}
