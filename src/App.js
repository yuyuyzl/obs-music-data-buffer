import './App.css';
import {useEffect, useState} from "react";

const host='http://localhost:8899';
// const getRB=(key)=>fetch(host+'/get/'+key).then(res=>res.text());


function App() {
  // const [songName,setSongName]=useState();
  // const [songBy,setSongBy]=useState();
  // const [curTime,setCurTime]=useState();
  // const [curTimePercent,setCurTimePercent]=useState();
  // const [totTime,setTotTime]=useState();
  // const [img,setImg]=useState();
  // const [lyricOriginal,setLyricOriginal]=useState();
  // const [lyricTrans,setLyricTrans]=useState();
  // useEffect(()=>{
  //   setInterval(()=>{
  //     getRB('songname').then(setSongName);
  //     getRB('songby').then(setSongBy);
  //     getRB('currenttime').then(setCurTime);
  //     getRB('currenttimepercent').then(setCurTimePercent);
  //     getRB('tottime').then(setTotTime);
  //     getRB('img').then(setImg);
  //     getRB('lyricorig').then(setLyricOriginal);
  //     getRB('lyrictrans').then(setLyricTrans);
  //   },1000);
  // },[]);
  const [data,setData]=useState();
  useEffect(()=>{
    const ii=setInterval(()=>fetch(host+'/get/json').then(res=>res.json()).then(setData),200);
    return ()=>clearInterval(ii);
    },[]);

  return (
    <div className="App">
      <img src={data?.img.replace("?param=34y34",'')}/>
      <div className={'name'}>
        <div style={{fontWeight:'bold'}}>{data?.songname}</div>&nbsp;-&nbsp;<div>{data?.songby}</div>
      </div>
      <div className={'lyric'}>
        <div style={{fontWeight:'bold'}}>{data?.lyricorig.replace('&amp;','&')}</div>
        <div>{data?.lyrictrans.replace('&amp;','&')}</div>
      </div>
    </div>
  );
}

export default App;
