import './App.css';
import {useEffect, useState} from "react";

const host='http://localhost:8899';

function App() {
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
