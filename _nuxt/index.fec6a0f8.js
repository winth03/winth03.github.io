import{CircleCheckFilled as g,WarningFilled as C,CircleCloseFilled as b,InfoFilled as y}from"./index.e0b44930.js";import{b as w}from"./runtime.a8d5aa72.js";import{_ as $}from"./plugin-vue_export-helper.b0b5f2d9.js";import{f as d,a2 as I,k as h,o as n,D as i,I as f,K as r,u as s,c as S,a4 as o,P as B,Y as a,Q as p}from"./entry.40f94ce2.js";import{w as F}from"./install.db378abc.js";const l={success:"icon-success",warning:"icon-warning",error:"icon-error",info:"icon-info"},m={[l.success]:g,[l.warning]:C,[l.error]:b,[l.info]:y},D=w({title:{type:String,default:""},subTitle:{type:String,default:""},icon:{type:String,values:["success","warning","info","error"],default:"info"}}),E=d({name:"ElResult"}),N=d({...E,props:D,setup(v){const k=v,t=I("result"),c=h(()=>{const e=k.icon,u=e&&l[e]?l[e]:"icon-info",_=m[u]||m["icon-info"];return{class:u,component:_}});return(e,u)=>(n(),i("div",{class:o(s(t).b())},[f("div",{class:o(s(t).e("icon"))},[r(e.$slots,"icon",{},()=>[s(c).component?(n(),S(B(s(c).component),{key:0,class:o(s(c).class)},null,8,["class"])):a("v-if",!0)])],2),e.title||e.$slots.title?(n(),i("div",{key:0,class:o(s(t).e("title"))},[r(e.$slots,"title",{},()=>[f("p",null,p(e.title),1)])],2)):a("v-if",!0),e.subTitle||e.$slots["sub-title"]?(n(),i("div",{key:1,class:o(s(t).e("subtitle"))},[r(e.$slots,"sub-title",{},()=>[f("p",null,p(e.subTitle),1)])],2)):a("v-if",!0),e.$slots.extra?(n(),i("div",{key:2,class:o(s(t).e("extra"))},[r(e.$slots,"extra")],2)):a("v-if",!0)],2))}});var P=$(N,[["__file","/home/runner/work/element-plus/element-plus/packages/components/result/src/result.vue"]]);const K=F(P);export{K as ElResult,m as IconComponentMap,l as IconMap,K as default,D as resultProps};
