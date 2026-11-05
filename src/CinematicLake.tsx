import React,{useEffect,useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Color,DoubleSide,ShaderMaterial} from 'three';
import type {Mood} from './weather';
// Independent lake material, no mutation of architectural GLB.
export function CinematicLake({mood}:{mood:Mood}){
 const shader=useMemo(()=>new ShaderMaterial({
  uniforms:{uTime:{value:0},uDeep:{value:new Color('#345e61')},uLight:{value:new Color('#c8d0bd')},uRain:{value:0}},
  vertexShader:`uniform float uTime;varying vec2 vUv;varying vec3 vWorld;void main(){vUv=uv;vec3 p=position;p.z+=.013*sin(p.x*1.8+uTime*.6)*cos(p.y*1.4-uTime*.4);vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,
  fragmentShader:`uniform float uTime;uniform vec3 uDeep;uniform vec3 uLight;uniform float uRain;varying vec2 vUv;varying vec3 vWorld;void main(){float a=sin(vUv.y*250.+uTime*1.3+sin(vUv.x*38.)*2.);float b=sin(vUv.x*320.-uTime*.8+sin(vUv.y*27.)*1.5);float glint=pow(max(0.,a*b),15.);float broad=.5+.5*sin(vUv.x*12.+uTime*.2);float ripples=sin(length(fract(vUv*12.)-.5)*65.-uTime*2.5);float rain=pow(max(ripples,0.),12.)*uRain;vec3 col=mix(uDeep,uLight,clamp(glint*.35+broad*.12+rain*.12,0.,.65));gl_FragColor=vec4(col,.95);}`,
  transparent:true,side:DoubleSide
 }),[]);
 useEffect(()=>()=>shader.dispose(),[shader]);
 useEffect(()=>{
  shader.uniforms.uDeep.value.set(mood==='night'?'#152c3c':mood==='sun'?'#4d7872':'#3a6268');
  shader.uniforms.uLight.value.set(mood==='night'?'#7292a6':mood==='sun'?'#e2d3a6':'#b7c8bf');
  shader.uniforms.uRain.value=(mood==='rain'||mood==='drizzle')?1:0;
 },[mood,shader]);
 useFrame((_,dt)=>{shader.uniforms.uTime.value+=Math.min(dt,.05)});
 return <mesh name="V2_WATER_SURFACE" rotation={[-Math.PI/2,0,0]} position={[0,-.447,0]} receiveShadow>
  <planeGeometry args={[24,25,64,64]}/><primitive object={shader} attach="material"/>
 </mesh>;
}
