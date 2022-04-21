// ==UserScript==
// @name         网易云正在播放同步器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://music.163.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=163.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const host='http://localhost:8899';
const tempStorage={};

const setRB=(key,value)=>{
    if(value!==undefined && tempStorage[key]!==value){
        GM_xmlhttpRequest({
            method: 'GET',
            url: host+'/set/'+key+'?'+value,
            onload: ()=>{
                tempStorage[key]=value;
            },
            timeout:200,
        })
        return true;
    }else return false;
}

(function() {
    window.isActive=true;
    if(window.self !== window.top)return;
    /*
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'visible') {
            window.isActive=true;
        } else {
            window.isActive=false;
        }
    });
    */
    const run=()=>{
        if(!window.isActive)return;
        const ePlayer=document.querySelector('#g_player');
        const eList=document.querySelector('#g_playlist');
        if(!eList)ePlayer?.querySelector('.icn.icn-list.s-fc3')?.click();
        let shouldWait=false;
        shouldWait=setRB('songname',ePlayer?.querySelector('.f-thide.name')?.innerText)||shouldWait;
        shouldWait=setRB('songby',ePlayer?.querySelector('.f-thide.by')?.innerText)||shouldWait;
        // setRB('currenttime',ePlayer?.querySelector('.j-flag.time em')?.innerText);
        // setRB('tottime',ePlayer?.querySelector('.j-flag.time')?.innerText?.match(/ \/ (.+)/)[1]);
        // setRB('currenttimepercent',ePlayer?.querySelector('.m-pbar .cur')?.style?.width.replace('%',''));
        shouldWait=setRB('img',ePlayer?.querySelector('.head.j-flag img')?.src)||shouldWait;

        const lyric=eList?.querySelector('.listlyric .j-flag.z-sel')?.innerHTML?.split?.('<br>')
        shouldWait=setRB('lyricorig',lyric?.[0]||'')||shouldWait;
        shouldWait=setRB('lyrictrans',lyric?.[1]||'')||shouldWait;

        setTimeout(run,shouldWait?200:0);
    }
    run();

})();