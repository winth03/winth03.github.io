import{buttonTypes as v,ElButton as h}from"./index.f0aadd2f.js";import{ElIcon as x}from"./index.45f48a28.js";import{a as g,E as _}from"./index.e4366f66.js";import{QuestionFilled as z}from"./index.b2143f7d.js";import{b as I}from"./runtime.781c1752.js";import{i as V}from"./icon.663f0749.js";import{_ as $}from"./plugin-vue_export-helper.b0b5f2d9.js";import{u as A}from"./index.ee071e53.js";import{i as b,f as D,b as M,h as a,o as l,c as m,w as n,m as c,k as i,u as e,Q,O as R,P as C,s as f,t as u,v as k,r as q,A as F}from"./entry.832a1cf2.js";import{a as L}from"./style.799baba7.js";import{w as O}from"./install.13f627c7.js";import"./index.cbc3748d.js";import"./use-global-config.2ea59d22.js";import"./index.bb99bec3.js";import"./types.8eace398.js";import"./index.86aa0141.js";import"./size.007424cf.js";import"./objects.1e9cc2c5.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./_baseSet.39436bc7.js";import"./_defineProperty.f71786e5.js";import"./_isIndex.f5af1eca.js";import"./use-form-item.e7df070b.js";import"./constants.e2ce9b61.js";import"./use-form-common-props.ec5a7000.js";import"./index.3e0aacb0.js";import"./index.b774ee77.js";import"./index.066dc621.js";import"./focus-trap.dce34dba.js";import"./aria.362daa0e.js";import"./event.079378dc.js";const U=I({title:String,confirmButtonText:String,cancelButtonText:String,confirmButtonType:{type:String,values:v,default:"primary"},cancelButtonType:{type:String,values:v,default:"text"},icon:{type:V,default:()=>z},iconColor:{type:String,default:"#f90"},hideIcon:{type:Boolean,default:!1},hideAfter:{type:Number,default:200},teleported:g.teleported,persistent:g.persistent,width:{type:[String,Number],default:150}}),j={confirm:o=>o instanceof MouseEvent,cancel:o=>o instanceof MouseEvent},G=b({name:"ElPopconfirm"}),H=b({...G,props:U,emits:j,setup(o,{emit:d}){const p=o,{t:y}=A(),r=D("popconfirm"),B=M(),T=()=>{var t,s;(s=(t=B.value)==null?void 0:t.onClose)==null||s.call(t)},P=a(()=>({width:L(p.width)})),S=t=>{d("confirm",t),T()},E=t=>{d("cancel",t),T()},w=a(()=>p.confirmButtonText||y("el.popconfirm.confirmButtonText")),N=a(()=>p.cancelButtonText||y("el.popconfirm.cancelButtonText"));return(t,s)=>(l(),m(e(_),F({ref_key:"tooltipRef",ref:B,trigger:"click",effect:"light"},t.$attrs,{"popper-class":`${e(r).namespace.value}-popover`,"popper-style":e(P),teleported:t.teleported,"fallback-placements":["bottom","top","right","left"],"hide-after":t.hideAfter,persistent:t.persistent}),{content:n(()=>[c("div",{class:i(e(r).b())},[c("div",{class:i(e(r).e("main"))},[!t.hideIcon&&t.icon?(l(),m(e(x),{key:0,class:i(e(r).e("icon")),style:Q({color:t.iconColor})},{default:n(()=>[(l(),m(R(t.icon)))]),_:1},8,["class","style"])):C("v-if",!0),f(" "+u(t.title),1)],2),c("div",{class:i(e(r).e("action"))},[k(e(h),{size:"small",type:t.cancelButtonType==="text"?"":t.cancelButtonType,text:t.cancelButtonType==="text",onClick:E},{default:n(()=>[f(u(e(N)),1)]),_:1},8,["type","text"]),k(e(h),{size:"small",type:t.confirmButtonType==="text"?"":t.confirmButtonType,text:t.confirmButtonType==="text",onClick:S},{default:n(()=>[f(u(e(w)),1)]),_:1},8,["type","text"])],2)],2)]),default:n(()=>[t.$slots.reference?q(t.$slots,"reference",{key:0}):C("v-if",!0)]),_:3},16,["popper-class","popper-style","teleported","hide-after","persistent"]))}});var J=$(H,[["__file","/home/runner/work/element-plus/element-plus/packages/components/popconfirm/src/popconfirm.vue"]]);const xt=O(J);export{xt as ElPopconfirm,xt as default,j as popconfirmEmits,U as popconfirmProps};