import{a as d,u as a,E as R}from"./index.0becfcd2.js";import{b as U}from"./runtime.a8d5aa72.js";import{d as f}from"./dropdown.75171d4f.js";import{b as D}from"./types.0ffe2429.js";import{_ as T}from"./plugin-vue_export-helper.b0b5f2d9.js";import{f as w,k as n,a2 as $,p as V,u as s,o as u,c as L,L as c,D as O,a4 as H,Q as m,Y as v,K as b,U as I,a6 as K}from"./entry.40f94ce2.js";import{b as z}from"./style.a7bf22e4.js";import{b as F,w as Q}from"./install.db378abc.js";import"./index.cd7da693.js";import"./index.5dbd068b.js";import"./index.1eb5ee59.js";import"./constants.e2ce9b61.js";import"./focus-trap.efed23b5.js";import"./aria.362daa0e.js";import"./event.079378dc.js";import"./icon.aaa9d058.js";import"./index.e0b44930.js";const Y=U({trigger:d.trigger,placement:f.placement,disabled:d.disabled,visible:a.visible,transition:a.transition,popperOptions:f.popperOptions,tabindex:f.tabindex,content:a.content,popperStyle:a.popperStyle,popperClass:a.popperClass,enterable:{...a.enterable,default:!0},effect:{...a.effect,default:"light"},teleported:a.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),j={"update:visible":t=>D(t),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},q="onUpdate:visible",G=w({name:"ElPopover"}),J=w({...G,props:Y,emits:j,setup(t,{expose:r,emit:p}){const o=t,g=n(()=>o[q]),i=$("popover"),l=V(),y=n(()=>{var e;return(e=s(l))==null?void 0:e.popperRef}),P=n(()=>[{width:z(o.width)},o.popperStyle]),C=n(()=>[i.b(),o.popperClass,{[i.m("plain")]:!!o.content}]),E=n(()=>o.transition===`${i.namespace.value}-fade-in-linear`),k=()=>{var e;(e=l.value)==null||e.hide()},S=()=>{p("before-enter")},B=()=>{p("before-leave")},N=()=>{p("after-enter")},A=()=>{p("update:visible",!1),p("after-leave")};return r({popperRef:y,hide:k}),(e,_)=>(u(),L(s(R),K({ref_key:"tooltipRef",ref:l},e.$attrs,{trigger:e.trigger,placement:e.placement,disabled:e.disabled,visible:e.visible,transition:e.transition,"popper-options":e.popperOptions,tabindex:e.tabindex,content:e.content,offset:e.offset,"show-after":e.showAfter,"hide-after":e.hideAfter,"auto-close":e.autoClose,"show-arrow":e.showArrow,"aria-label":e.title,effect:e.effect,enterable:e.enterable,"popper-class":s(C),"popper-style":s(P),teleported:e.teleported,persistent:e.persistent,"gpu-acceleration":s(E),"onUpdate:visible":s(g),onBeforeShow:S,onBeforeHide:B,onShow:N,onHide:A}),{content:c(()=>[e.title?(u(),O("div",{key:0,class:H(s(i).e("title")),role:"title"},m(e.title),3)):v("v-if",!0),b(e.$slots,"default",{},()=>[I(m(e.content),1)])]),default:c(()=>[e.$slots.reference?b(e.$slots,"reference",{key:0}):v("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var M=T(J,[["__file","/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);const h=(t,r)=>{const p=r.arg||r.value,o=p==null?void 0:p.popperRef;o&&(o.triggerRef=t)};var W={mounted(t,r){h(t,r)},updated(t,r){h(t,r)}};const X="popover",Z=F(W,X),be=Q(M,{directive:Z});export{be as ElPopover,Z as ElPopoverDirective,be as default,j as popoverEmits,Y as popoverProps};
