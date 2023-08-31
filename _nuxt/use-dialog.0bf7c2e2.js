import{b as B,d as k}from"./runtime.7bbd0ea7.js";import{aq as q,f as D,aT as K,I as F,e as w,aU as j,N as h,i as G,v as J,r as M,a1 as Q,U as O,b as v,aK as R,h as T,Z as X,S as ee,R as oe,ao as I}from"./entry.7f953a48.js";import{P as x}from"./vnode.0d11700a.js";import{i as te}from"./icon.577a7726.js";import{U as N}from"./event.e54e7e4a.js";import{d as ne}from"./types.6589216f.js";import{u as le}from"./index.e0cee20e.js";import{u as se}from"./use-global-config.ccd5efbe.js";import{h as P,g as ae,b as ue,r as ce,a as ie}from"./style.63c3403a.js";import{t as re}from"./error.6c36bb34.js";import{a as de}from"./scroll.2b6fcfe4.js";const fe=(e,o={})=>{q(e)||re("[useLockscreen]","You need to pass a ref param to this function");const u=o.ns||D("popup"),t=K(()=>u.bm("parent","hidden"));if(!F||P(document.body,t.value))return;let c=0,a=!1,n="0";const r=()=>{setTimeout(()=>{ce(document==null?void 0:document.body,t.value),a&&document&&(document.body.style.width=n)},200)};w(e,s=>{if(!s){r();return}a=!P(document.body,t.value),a&&(n=document.body.style.width),c=de(u.namespace.value);const f=document.documentElement.clientHeight<document.body.scrollHeight,d=ae(document.body,"overflowY");c>0&&(f||d==="scroll")&&a&&(document.body.style.width=`calc(100% - ${c}px)`),ue(document.body,t.value)}),j(()=>r())},me=e=>{if(!e)return{onClick:h,onMousedown:h,onMouseup:h};let o=!1,u=!1;return{onClick:n=>{o&&u&&e(n),o=u=!1},onMousedown:n=>{o=n.target===n.currentTarget},onMouseup:n=>{u=n.target===n.currentTarget}}},ye=B({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:k([String,Array,Object])},zIndex:{type:k([String,Number])}}),ve={click:e=>e instanceof MouseEvent},pe="overlay";var Ce=G({name:"ElOverlay",props:ye,emits:ve,setup(e,{slots:o,emit:u}){const t=D(pe),c=s=>{u("click",s)},{onClick:a,onMousedown:n,onMouseup:r}=me(e.customMaskEvent?void 0:c);return()=>e.mask?J("div",{class:[t.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:a,onMousedown:n,onMouseup:r},[M(o,"default")],x.STYLE|x.CLASS|x.PROPS,["onClick","onMouseup","onMousedown"]):Q("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[M(o,"default")])}});const Ie=Ce,be=B({center:Boolean,alignCenter:Boolean,closeIcon:{type:te},customClass:{type:String,default:""},draggable:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),Pe={close:()=>!0},De=B({...be,appendToBody:Boolean,beforeClose:{type:k(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),Fe={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[N]:e=>ne(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Ne=(e,o)=>{const t=oe().emit,{nextZIndex:c}=le();let a="";const n=O(),r=O(),s=v(!1),f=v(!1),d=v(!1),p=v(e.zIndex||c());let m,y;const z=se("namespace",R),A=T(()=>{const l={},i=`--${z.value}-dialog`;return e.fullscreen||(e.top&&(l[`${i}-margin-top`]=e.top),e.width&&(l[`${i}-width`]=ie(e.width))),l}),L=T(()=>e.alignCenter?{display:"flex"}:{});function U(){t("opened")}function V(){t("closed"),t(N,!1),e.destroyOnClose&&(d.value=!1)}function $(){t("close")}function S(){y==null||y(),m==null||m(),e.openDelay&&e.openDelay>0?{stop:m}=I(()=>E(),e.openDelay):E()}function C(){m==null||m(),y==null||y(),e.closeDelay&&e.closeDelay>0?{stop:y}=I(()=>g(),e.closeDelay):g()}function b(){function l(i){i||(f.value=!0,s.value=!1)}e.beforeClose?e.beforeClose(l):C()}function H(){e.closeOnClickModal&&b()}function E(){!F||(s.value=!0)}function g(){s.value=!1}function Y(){t("openAutoFocus")}function W(){t("closeAutoFocus")}function Z(l){var i;((i=l.detail)==null?void 0:i.focusReason)==="pointer"&&l.preventDefault()}e.lockScroll&&fe(s);function _(){e.closeOnPressEscape&&b()}return w(()=>e.modelValue,l=>{l?(f.value=!1,S(),d.value=!0,p.value=e.zIndex?p.value++:c(),X(()=>{t("open"),o.value&&(o.value.scrollTop=0)})):s.value&&C()}),w(()=>e.fullscreen,l=>{!o.value||(l?(a=o.value.style.transform,o.value.style.transform=""):o.value.style.transform=a)}),ee(()=>{e.modelValue&&(s.value=!0,d.value=!0,S())}),{afterEnter:U,afterLeave:V,beforeLeave:$,handleClose:b,onModalClick:H,close:C,doClose:g,onOpenAutoFocus:Y,onCloseAutoFocus:W,onCloseRequested:_,onFocusoutPrevented:Z,titleId:n,bodyId:r,closed:f,style:A,overlayDialogStyle:L,rendered:d,visible:s,zIndex:p}};export{Ie as E,Fe as a,be as b,Pe as c,De as d,me as e,Ne as u};