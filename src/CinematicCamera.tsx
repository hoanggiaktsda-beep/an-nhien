import {useMemo,useRef} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {Vector3} from 'three';
export type CameraPlace='room'|'terrace';
// V2.1: seated-eye composition, furniture foreground and lake through glazing.
// Architectural G1 geometry remains unchanged.
export const CAMERA_VIEWS:Record<CameraPlace,{eye:[number,number,number];target:[number,number,number];fov:number}>={
 room:{eye:[1.65,1.18,-3.35],target:[-.35,1.3,6.4],fov:62},
 terrace:{eye:[1.2,1.45,4.3],target:[0,1.2,13],fov:58}
};
export function CinematicCamera({place}:{place:CameraPlace}){
 const {camera}=useThree();
 const desired=useMemo(()=>new Vector3(),[]);
 const focus=useRef(new Vector3(...CAMERA_VIEWS.room.target));
 useFrame((_,dt)=>{
  const view=CAMERA_VIEWS[place];
  desired.set(...view.eye);
  const alpha=1-Math.exp(-Math.min(dt,.05)*1.5);
  camera.position.lerp(desired,alpha);
  focus.current.lerp(desired.set(...view.target),alpha);
  camera.lookAt(focus.current);
  if('fov' in camera && typeof camera.fov==='number'){
   camera.fov+=(view.fov-camera.fov)*alpha;
   camera.updateProjectionMatrix();
  }
 });
 return null;
}
