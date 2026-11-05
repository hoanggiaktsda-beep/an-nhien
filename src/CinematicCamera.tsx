import {useMemo,useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {Vector3,MathUtils} from 'three';
export type CameraPlace='room'|'terrace';
const views:Record<CameraPlace,{eye:[number,number,number];target:[number,number,number]}> = {
 room:{eye:[0,1.35,-1.7],target:[0,1.35,7]},
 terrace:{eye:[1.2,1.45,4.3],target:[0,1.2,13]}
};
export function CinematicCamera({place}:{place:CameraPlace}){
 const {camera}=useThree();
 const desired=useMemo(()=>new Vector3(),[]);
 const focus=useRef(new Vector3(0,1.3,7));
 useFrame((_,dt)=>{
  const view=views[place];desired.set(...view.eye);
  // Damp frame-rate-independently; avoid abrupt jumps on mode changes.
  const alpha=1-Math.exp(-Math.min(dt,.05)*1.35);
  camera.position.lerp(desired,alpha);
  focus.current.lerp(new Vector3(...view.target),alpha);
  camera.lookAt(focus.current);
 });
 return null;
}
