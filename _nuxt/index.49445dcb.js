import{ElIcon as k}from"./index.52232a07.js";import{b as y}from"./runtime.a8d5aa72.js";import{i as h}from"./icon.aaa9d058.js";import{_ as b}from"./plugin-vue_export-helper.b0b5f2d9.js";import{f,a2 as v,k as C,o,D as l,c as r,L as _,P as E,u as a,Y as i,a4 as p,K as c}from"./entry.40f94ce2.js";import{w as g}from"./install.db378abc.js";import"./types.0ffe2429.js";import"./style.a7bf22e4.js";import"./index.e0b44930.js";const w=y({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:h}}),B={click:t=>t instanceof MouseEvent},L=["href"],P=f({name:"ElLink"}),$=f({...P,props:w,emits:B,setup(t,{emit:d}){const s=t,n=v("link"),m=C(()=>[n.b(),n.m(s.type),n.is("disabled",s.disabled),n.is("underline",s.underline&&!s.disabled)]);function u(e){s.disabled||d("click",e)}return(e,D)=>(o(),l("a",{class:p(a(m)),href:e.disabled||!e.href?void 0:e.href,onClick:u},[e.icon?(o(),r(a(k),{key:0},{default:_(()=>[(o(),r(E(e.icon)))]),_:1})):i("v-if",!0),e.$slots.default?(o(),l("span",{key:1,class:p(a(n).e("inner"))},[c(e.$slots,"default")],2)):i("v-if",!0),e.$slots.icon?c(e.$slots,"icon",{key:2}):i("v-if",!0)],10,L))}});var S=b($,[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]);const q=g(S);export{q as ElLink,q as default,B as linkEmits,w as linkProps};
