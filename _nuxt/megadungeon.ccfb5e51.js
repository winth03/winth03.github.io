import{H as k,l as y,p as b,o as v,D as w,S as s,L as c,G as C,U as T,u as A,W as N,X as S,K as E}from"./entry.2b8377c6.js";import I from"./client-only.1e0cf015.js";import{u as _}from"./fetch.df413954.js";import"./index.a1ccab73.js";import"./asyncData.ecc04f9f.js";const X=t=>(N("data-v-31a3aea4"),t=t(),S(),t),$={class:"h-[60vh] main"},B=X(()=>E("h1",{class:"text-center text-white bg-slate-500 rounded-t-lg"},"XxX-Mega Dungeon 2019-XxX",-1)),q={__name:"megadungeon",setup(t){const{$Terminal:n}=y(),m=b(),l=[{content:'Type "exit" to exit the game and "dungeon" to start a new one.',class:"info"}],p=[{key:"dungeon",description:"Enter the dungeon",title:"Dungeon"}],g=()=>{n.$api.execute("terminal","dungeon")},h=async(i,x,a,o,D)=>{if(i==="dungeon"){const e=new n.$Ask;m.value=e;const{data:{value:u}}=await _("/api/dungeon",{method:"GET",cache:!1},"$yTMpn1PEUN");if(!u)return o("An error occured");a(e),e.ask({question:u,autoReview:!0,callback:async function f(r){if(r==="exit")return e.finish();const{data:{value:d}}=await _("/api/dungeon",{method:"POST",cache:!1,body:{prompt:r}},"$WAHAqaRj26");d?e.ask({question:d,autoReview:!0,callback:f}):e.finish()}})}};return(i,x)=>{const a=C,o=I;return v(),w("div",$,[s(a,{class:"btn m-4 bg-slate-500",target:"_blank",to:"https://onlinegdb.com/GByibTCZ7"},{default:c(()=>[T("Source Code")]),_:1}),s(o,null,{default:c(()=>[s(A(n),{"command-store":p,"init-log":l,context:"You",onExecCmd:h,onInitComplete:g},{header:c(()=>[B]),_:1})]),_:1})])}}},H=k(q,[["__scopeId","data-v-31a3aea4"]]);export{H as default};
