import{e as H,f as S,b as I}from"./index.785ddeeb.js";import{b as P,d as M}from"./runtime.ca6a5e5a.js";import{i as R,d as y}from"./types.bb628c62.js";import{C as W}from"./event.e54e7e4a.js";import{_ as O}from"./plugin-vue_export-helper.b0b5f2d9.js";import{i as $,f as V,aH as v,b as d,h as N,e as j,S as q,ao as G,o as L,j as Q,m as U,r as Y,k as T,u as i,Q as C}from"./entry.b33cb278.js";import{a as D}from"./style.6fe07f58.js";import{t as F}from"./error.6c36bb34.js";import{g as J}from"./scroll.edc775c4.js";import{w as K}from"./install.187cf5b6.js";const X=P({zIndex:{type:M([Number,String]),default:100},target:{type:String,default:""},offset:{type:Number,default:0},position:{type:String,values:["top","bottom"],default:"top"}}),Z={scroll:({scrollTop:a,fixed:c})=>R(a)&&y(c),[W]:a=>y(a)},k="ElAffix",ee=$({name:k}),te=$({...ee,props:X,emits:Z,setup(a,{expose:c,emit:h}){const e=a,g=V("affix"),l=v(),p=v(),s=v(),{height:r}=H(),{height:n,width:x,top:w,bottom:_,update:m}=S(p,{windowScroll:!1}),f=S(l),o=d(!1),E=d(0),u=d(0),z=N(()=>({height:o.value?`${n.value}px`:"",width:o.value?`${x.value}px`:""})),B=N(()=>{if(!o.value)return{};const t=e.offset?D(e.offset):0;return{height:`${n.value}px`,width:`${x.value}px`,top:e.position==="top"?t:"",bottom:e.position==="bottom"?t:"",transform:u.value?`translateY(${u.value}px)`:"",zIndex:e.zIndex}}),b=()=>{if(!!s.value)if(E.value=s.value instanceof Window?document.documentElement.scrollTop:s.value.scrollTop||0,e.position==="top")if(e.target){const t=f.bottom.value-e.offset-n.value;o.value=e.offset>w.value&&f.bottom.value>0,u.value=t<0?t:0}else o.value=e.offset>w.value;else if(e.target){const t=r.value-f.top.value-e.offset-n.value;o.value=r.value-e.offset<_.value&&r.value>f.top.value,u.value=t<0?-t:0}else o.value=r.value-e.offset<_.value},A=()=>{m(),h("scroll",{scrollTop:E.value,fixed:o.value})};return j(o,t=>h("change",t)),q(()=>{var t;e.target?(l.value=(t=document.querySelector(e.target))!=null?t:void 0,l.value||F(k,`Target is not existed: ${e.target}`)):l.value=document.documentElement,s.value=J(p.value,!0),m()}),I(s,"scroll",A),G(b),c({update:b,updateRoot:m}),(t,ae)=>(L(),Q("div",{ref_key:"root",ref:p,class:T(i(g).b()),style:C(i(z))},[U("div",{class:T({[i(g).m("fixed")]:o.value}),style:C(i(B))},[Y(t.$slots,"default")],6)],6))}});var oe=O(te,[["__file","/home/runner/work/element-plus/element-plus/packages/components/affix/src/affix.vue"]]);const ve=K(oe);export{ve as ElAffix,Z as affixEmits,X as affixProps,ve as default};
