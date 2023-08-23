import{S as W,ao as J,ae as Q,i as I,l as j,h as $,o as k,j as N,m as A,r as h,k as u,u as e,t as G,v as T,w as b,c as O,O as Z,P as U,Q as q,$ as x,f as ee,b as z,p as oe,x as te,A as se,aR as ae,y as ne,T as le,aE as re}from"./entry.b33cb278.js";import{b as ie,c as de,d as ce,a as me,u as ue,e as pe,E as fe}from"./use-dialog.7cb63307.js";import{a as po,d as fo,u as go}from"./use-dialog.7cb63307.js";import{ElIcon as ge}from"./index.960dedfd.js";import{_ as H}from"./plugin-vue_export-helper.b0b5f2d9.js";import{u as ve}from"./index.fd65d236.js";import{C as be}from"./icon.13fbe947.js";import{F as he,E as ye}from"./focus-trap.90d54f15.js";import{c as Ce}from"./refs.e489f776.js";import{a as K}from"./style.6fe07f58.js";import{u as _}from"./index.7867a6df.js";import{w as Ee}from"./install.187cf5b6.js";import"./runtime.ca6a5e5a.js";import"./vnode.acbb2db8.js";import"./event.e54e7e4a.js";import"./types.bb628c62.js";import"./index.8e2f8365.js";import"./use-global-config.6d104472.js";import"./index.3ddc1a68.js";import"./size.007424cf.js";import"./objects.1e9cc2c5.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./_baseSet.39436bc7.js";import"./_defineProperty.f71786e5.js";import"./_isIndex.f5af1eca.js";import"./error.6c36bb34.js";import"./scroll.edc775c4.js";import"./index.dc3cf8fc.js";import"./aria.362daa0e.js";const ke=(i,a,d)=>{let y={offsetX:0,offsetY:0};const n=t=>{const f=t.clientX,E=t.clientY,{offsetX:c,offsetY:g}=y,m=i.value.getBoundingClientRect(),s=m.left,v=m.top,D=m.width,S=m.height,F=document.documentElement.clientWidth,L=document.documentElement.clientHeight,B=-s+c,P=-v+g,Y=F-s-D+c,X=L-v-S+g,M=R=>{const o=Math.min(Math.max(c+R.clientX-f,B),Y),r=Math.min(Math.max(g+R.clientY-E,P),X);y={offsetX:o,offsetY:r},i.value.style.transform=`translate(${K(o)}, ${K(r)})`},l=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",M),document.addEventListener("mouseup",l)},p=()=>{a.value&&i.value&&a.value.addEventListener("mousedown",n)},C=()=>{a.value&&i.value&&a.value.removeEventListener("mousedown",n)};W(()=>{J(()=>{d.value?p():C()})}),Q(()=>{C()})},V=Symbol("dialogInjectionKey"),we=["aria-label"],$e=["id"],De=I({name:"ElDialogContent"}),Le=I({...De,props:ie,emits:de,setup(i){const a=i,{t:d}=ve(),{Close:y}=be,{dialogRef:n,headerRef:p,bodyId:C,ns:t,style:f}=j(V),{focusTrapRef:E}=j(he),c=$(()=>[t.b(),t.is("fullscreen",a.fullscreen),t.is("draggable",a.draggable),t.is("align-center",a.alignCenter),{[t.m("center")]:a.center},a.customClass]),g=Ce(E,n),m=$(()=>a.draggable);return ke(n,p,m),(s,v)=>(k(),N("div",{ref:e(g),class:u(e(c)),style:q(e(f)),tabindex:"-1"},[A("header",{ref_key:"headerRef",ref:p,class:u(e(t).e("header"))},[h(s.$slots,"header",{},()=>[A("span",{role:"heading",class:u(e(t).e("title"))},G(s.title),3)]),s.showClose?(k(),N("button",{key:0,"aria-label":e(d)("el.dialog.close"),class:u(e(t).e("headerbtn")),type:"button",onClick:v[0]||(v[0]=D=>s.$emit("close"))},[T(e(ge),{class:u(e(t).e("close"))},{default:b(()=>[(k(),O(Z(s.closeIcon||e(y))))]),_:1},8,["class"])],10,we)):U("v-if",!0)],2),A("div",{id:e(C),class:u(e(t).e("body"))},[h(s.$slots,"default")],10,$e),s.$slots.footer?(k(),N("footer",{key:0,class:u(e(t).e("footer"))},[h(s.$slots,"footer")],2)):U("v-if",!0)],6))}});var Me=H(Le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const Re=["aria-label","aria-labelledby","aria-describedby"],Ae=I({name:"ElDialog",inheritAttrs:!1}),Te=I({...Ae,props:ce,emits:me,setup(i,{expose:a}){const d=i,y=x();_({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},$(()=>!!y.title)),_({scope:"el-dialog",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/dialog.html#attributes",type:"Attribute"},$(()=>!!d.customClass));const n=ee("dialog"),p=z(),C=z(),t=z(),{visible:f,titleId:E,bodyId:c,style:g,overlayDialogStyle:m,rendered:s,zIndex:v,afterEnter:D,afterLeave:S,beforeLeave:F,handleClose:L,onModalClick:B,onOpenAutoFocus:P,onCloseAutoFocus:Y,onCloseRequested:X,onFocusoutPrevented:M}=ue(d,p);oe(V,{dialogRef:p,headerRef:C,bodyId:c,ns:n,rendered:s,style:g});const l=pe(B),R=$(()=>d.draggable&&!d.fullscreen);return a({visible:f,dialogContentRef:t}),(o,r)=>(k(),O(re,{to:"body",disabled:!o.appendToBody},[T(le,{name:"dialog-fade",onAfterEnter:e(D),onAfterLeave:e(S),onBeforeLeave:e(F),persisted:""},{default:b(()=>[te(T(e(fe),{"custom-mask-event":"",mask:o.modal,"overlay-class":o.modalClass,"z-index":e(v)},{default:b(()=>[A("div",{role:"dialog","aria-modal":"true","aria-label":o.title||void 0,"aria-labelledby":o.title?void 0:e(E),"aria-describedby":e(c),class:u(`${e(n).namespace.value}-overlay-dialog`),style:q(e(m)),onClick:r[0]||(r[0]=(...w)=>e(l).onClick&&e(l).onClick(...w)),onMousedown:r[1]||(r[1]=(...w)=>e(l).onMousedown&&e(l).onMousedown(...w)),onMouseup:r[2]||(r[2]=(...w)=>e(l).onMouseup&&e(l).onMouseup(...w))},[T(e(ye),{loop:"",trapped:e(f),"focus-start-el":"container",onFocusAfterTrapped:e(P),onFocusAfterReleased:e(Y),onFocusoutPrevented:e(M),onReleaseRequested:e(X)},{default:b(()=>[e(s)?(k(),O(Me,se({key:0,ref_key:"dialogContentRef",ref:t},o.$attrs,{"custom-class":o.customClass,center:o.center,"align-center":o.alignCenter,"close-icon":o.closeIcon,draggable:e(R),fullscreen:o.fullscreen,"show-close":o.showClose,title:o.title,onClose:e(L)}),ae({header:b(()=>[o.$slots.title?h(o.$slots,"title",{key:1}):h(o.$slots,"header",{key:0,close:e(L),titleId:e(E),titleClass:e(n).e("title")})]),default:b(()=>[h(o.$slots,"default")]),_:2},[o.$slots.footer?{name:"footer",fn:b(()=>[h(o.$slots,"footer")])}:void 0]),1040,["custom-class","center","align-center","close-icon","draggable","fullscreen","show-close","title","onClose"])):U("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Re)]),_:3},8,["mask","overlay-class","z-index"]),[[ne,e(f)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var Ie=H(Te,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const co=Ee(Ie);export{co as ElDialog,co as default,po as dialogEmits,V as dialogInjectionKey,fo as dialogProps,go as useDialog};
