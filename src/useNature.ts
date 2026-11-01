import {useEffect,useRef,useState} from 'react';
type Mood='sun'|'rain'|'night';
export function useNature(mood:Mood){
 const ref=useRef<HTMLAudioElement|null>(null);const [on,setOn]=useState(false);const [volume,setVolume]=useState(.65);const [error,setError]=useState('');const [pending,setPending]=useState(false);
 const src=`${import.meta.env.BASE_URL}audio/${mood}.mp3`;
 useEffect(()=>{const a=ref.current;if(a)a.volume=volume},[volume]);
 useEffect(()=>{const a=ref.current;if(!a)return;const wasPlaying=on;a.src=src;a.load();if(wasPlaying){setPending(true);void a.play().catch(()=>{setError('Chạm Bật âm thanh để tiếp tục.');setOn(false)}).finally(()=>setPending(false))}},[src]);
 useEffect(()=>()=>{ref.current?.pause()},[]);
 async function toggle(){const a=ref.current;if(!a)return;setError('');if(!a.paused){a.pause();return}setPending(true);a.volume=volume;try{await a.play()}catch{setError('Chưa phát được. Chạm nút phát trong trình nghe bên dưới.');setOn(false)}finally{setPending(false)}}
 return {ref,on,volume,setVolume,error,pending,toggle,src,setOn,setError};
}
