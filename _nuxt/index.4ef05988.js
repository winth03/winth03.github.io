import{d as h}from"./dayjs.min.6a4959ec.js";import{c as O}from"./customParseFormat.0b943e05.js";import{ElSelect as T}from"./index.37a58d78.js";import{ElIcon as _}from"./index.fbf6b4c2.js";import{Clock as j,CircleClose as w}from"./index.597e0eaa.js";import{b as F,d as y}from"./runtime.7bbd0ea7.js";import{u as H}from"./index.f298a15c.js";import{_ as M}from"./plugin-vue_export-helper.b0b5f2d9.js";import{i as C,f as N,b as x,h as m,o as f,c as d,w as v,u,k as U,O as D,P as L,j as A,L as q,M as G}from"./entry.7f953a48.js";import{a as J}from"./use-form-common-props.5d54d907.js";import"./_commonjsHelpers.eecb6206.js";import"./index.30f9c5c6.js";import"./index.2837b29c.js";import"./types.6589216f.js";import"./index.e0cee20e.js";import"./constants.e2ce9b61.js";import"./focus-trap.daca3e80.js";import"./aria.362daa0e.js";import"./install.eb991fcc.js";import"./index.ffd54757.js";import"./browser.d1f1569e.js";import"./icon.577a7726.js";import"./typescript.c44ade1c.js";import"./event.e54e7e4a.js";import"./index.a9f5a16d.js";import"./use-form-item.dcfc827e.js";import"./error.6c36bb34.js";import"./i18n.de31208d.js";import"./style.63c3403a.js";import"./size.007424cf.js";import"./index.5c4ee287.js";import"./event.079378dc.js";import"./index.80bafb5b.js";import"./util.c8753e63.js";import"./index.ccfe103f.js";import"./strings.bdfeda91.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./index.80475980.js";import"./index.59e17544.js";import"./scroll.2b6fcfe4.js";import"./isEqual.f785ded9.js";import"./_Uint8Array.4a2b558d.js";import"./_arrayPush.6d7e61e4.js";import"./_isIndex.f5af1eca.js";import"./debounce.a43f57fe.js";import"./index.55cf4f11.js";import"./validator.f60c176b.js";const K=F({format:{type:String,default:"HH:mm"},modelValue:String,disabled:Boolean,editable:{type:Boolean,default:!0},effect:{type:String,default:"light"},clearable:{type:Boolean,default:!0},size:H,placeholder:String,start:{type:String,default:"09:00"},end:{type:String,default:"18:00"},step:{type:String,default:"00:30"},minTime:String,maxTime:String,name:String,prefixIcon:{type:y([String,Object]),default:()=>j},clearIcon:{type:y([String,Object]),default:()=>w}}),a=o=>{const s=(o||"").split(":");if(s.length>=2){let t=Number.parseInt(s[0],10);const n=Number.parseInt(s[1],10),l=o.toUpperCase();return l.includes("AM")&&t===12?t=0:l.includes("PM")&&t!==12&&(t+=12),{hours:t,minutes:n}}return null},S=(o,s)=>{const t=a(o);if(!t)return-1;const n=a(s);if(!n)return-1;const l=t.minutes+t.hours*60,p=n.minutes+n.hours*60;return l===p?0:l>p?1:-1},k=o=>`${o}`.padStart(2,"0"),c=o=>`${k(o.hours)}:${k(o.minutes)}`,Q=(o,s)=>{const t=a(o);if(!t)return"";const n=a(s);if(!n)return"";const l={hours:t.hours,minutes:t.minutes};return l.minutes+=n.minutes,l.hours+=n.hours,l.hours+=Math.floor(l.minutes/60),l.minutes=l.minutes%60,c(l)},R=C({name:"ElTimeSelect"}),W=C({...R,props:K,emits:["change","blur","focus","update:modelValue"],setup(o,{expose:s}){const t=o;h.extend(O);const{Option:n}=T,l=N("input"),p=x(),I=J(),V=m(()=>t.modelValue),B=m(()=>{const e=a(t.start);return e?c(e):null}),g=m(()=>{const e=a(t.end);return e?c(e):null}),P=m(()=>{const e=a(t.step);return e?c(e):null}),$=m(()=>{const e=a(t.minTime||"");return e?c(e):null}),z=m(()=>{const e=a(t.maxTime||"");return e?c(e):null}),E=m(()=>{const e=[];if(t.start&&t.end&&t.step){let r=B.value,i;for(;r&&g.value&&S(r,g.value)<=0;)i=h(r,"HH:mm").format(t.format),e.push({value:i,disabled:S(r,$.value||"-1:-1")<=0||S(r,z.value||"100:100")>=0}),r=Q(r,P.value)}return e});return s({blur:()=>{var e,r;(r=(e=p.value)==null?void 0:e.blur)==null||r.call(e)},focus:()=>{var e,r;(r=(e=p.value)==null?void 0:e.focus)==null||r.call(e)}}),(e,r)=>(f(),d(u(T),{ref_key:"select",ref:p,"model-value":u(V),disabled:u(I),clearable:e.clearable,"clear-icon":e.clearIcon,size:e.size,effect:e.effect,placeholder:e.placeholder,"default-first-option":"",filterable:e.editable,"onUpdate:modelValue":r[0]||(r[0]=i=>e.$emit("update:modelValue",i)),onChange:r[1]||(r[1]=i=>e.$emit("change",i)),onBlur:r[2]||(r[2]=i=>e.$emit("blur",i)),onFocus:r[3]||(r[3]=i=>e.$emit("focus",i))},{prefix:v(()=>[e.prefixIcon?(f(),d(u(_),{key:0,class:U(u(l).e("prefix-icon"))},{default:v(()=>[(f(),d(D(e.prefixIcon)))]),_:1},8,["class"])):L("v-if",!0)]),default:v(()=>[(f(!0),A(q,null,G(u(E),i=>(f(),d(u(n),{key:i.value,label:i.value,value:i.value,disabled:i.disabled},null,8,["label","value","disabled"]))),128))]),_:1},8,["model-value","disabled","clearable","clear-icon","size","effect","placeholder","filterable"]))}});var b=M(W,[["__file","/home/runner/work/element-plus/element-plus/packages/components/time-select/src/time-select.vue"]]);b.install=o=>{o.component(b.name,b)};const X=b,We=X;export{We as ElTimeSelect,X as default};