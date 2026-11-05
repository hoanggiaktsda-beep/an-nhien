import {useMemo} from 'react';
import {Box3,Vector3} from 'three';
export type WalkZone={id:'sofa'|'tea'|'terrace';label:string;center:[number,number,number];radius:number};
export const WALK_ZONES:WalkZone[]=[
 {id:'sofa',label:'Ngồi xuống sofa',center:[-1.5,0,-1.65],radius:1.3},
 {id:'tea',label:'Pha một tách trà',center:[-1.2,0,.3],radius:1.1},
 {id:'terrace',label:'Ra sân hiên',center:[0,0,2.05],radius:1.0}
];
export function nearestInteraction(x:number,z:number):WalkZone|null{
 let best:WalkZone|null=null;let distance=Infinity;
 for(const zone of WALK_ZONES){
  const d=Math.hypot(x-zone.center[0],z-zone.center[2]);
  if(d<zone.radius&&d<distance){best=zone;distance=d}
 }
 return best;
}
export function createRoomCollisionBounds(){
 // Temporary walkable bounds; G1 geometry-based collision is required before release.
 return useMemo(()=>new Box3(new Vector3(-2.6,0,-2.7),new Vector3(2.6,2.8,2.1)),[]);
}
