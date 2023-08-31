import{ElInputNumber as Ne}from"./index.6a9accf9.js";import{g as pe}from"./index.2837b29c.js";import{b as fe,d as te}from"./runtime.7bbd0ea7.js";import{u as ye}from"./index.f298a15c.js";import{i as me}from"./types.6589216f.js";import{D as Pe,b as J,S as Te,Z as se,h as v,aI as Me,l as ze,e as re,i as le,f as ve,ai as Ee,a2 as ce,o as L,j as K,v as Be,w as Ve,m as q,t as Ie,u as l,k as R,Q as Z,F as we,a1 as Fe,p as Xe,c as ie,P as ne,L as oe,M as ue}from"./entry.7f953a48.js";import{U as ae,I as ge,C as xe}from"./event.e54e7e4a.js";import{E as Ye}from"./index.5c4ee287.js";import{_ as Ce}from"./plugin-vue_export-helper.b0b5f2d9.js";import{E as Ke}from"./aria.362daa0e.js";import{d as he}from"./debounce.a43f57fe.js";import{u as Re}from"./index.80475980.js";import{a as Ae,u as $e}from"./use-form-item.dcfc827e.js";import{u as We}from"./use-form-common-props.5d54d907.js";import{t as Ue,d as Se}from"./error.6c36bb34.js";import{b as Oe}from"./index.30f9c5c6.js";import{w as je}from"./install.eb991fcc.js";import"./index.ffd54757.js";import"./index.fbf6b4c2.js";import"./style.63c3403a.js";import"./index.597e0eaa.js";import"./browser.d1f1569e.js";import"./icon.577a7726.js";import"./typescript.c44ade1c.js";import"./index.a9f5a16d.js";import"./i18n.de31208d.js";import"./size.007424cf.js";import"./constants.e2ce9b61.js";import"./index.2272b19b.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./index.e0cee20e.js";import"./focus-trap.daca3e80.js";import"./event.079378dc.js";const Le=Symbol("sliderContextKey"),He=fe({modelValue:{type:te([Number,Array]),default:0},id:{type:String,default:void 0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},showInput:Boolean,showInputControls:{type:Boolean,default:!0},size:ye,inputSize:ye,showStops:Boolean,showTooltip:{type:Boolean,default:!0},formatTooltip:{type:te(Function),default:void 0},disabled:Boolean,range:Boolean,vertical:Boolean,height:String,debounce:{type:Number,default:300},label:{type:String,default:void 0},rangeStartLabel:{type:String,default:void 0},rangeEndLabel:{type:String,default:void 0},formatValueText:{type:te(Function),default:void 0},tooltipClass:{type:String,default:void 0},placement:{type:String,values:pe,default:"top"},marks:{type:te(Object)},validateEvent:{type:Boolean,default:!0}}),de=e=>me(e)||Pe(e)&&e.every(me),_e={[ae]:de,[ge]:de,[xe]:de},Ge=(e,t,u)=>{const a=J();return Te(async()=>{e.range?(Array.isArray(e.modelValue)?(t.firstValue=Math.max(e.min,e.modelValue[0]),t.secondValue=Math.min(e.max,e.modelValue[1])):(t.firstValue=e.min,t.secondValue=e.max),t.oldValue=[t.firstValue,t.secondValue]):(typeof e.modelValue!="number"||Number.isNaN(e.modelValue)?t.firstValue=e.min:t.firstValue=Math.min(e.max,Math.max(e.min,e.modelValue)),t.oldValue=t.firstValue),Oe(window,"resize",u),await se(),u()}),{sliderWrapper:a}},Qe=e=>v(()=>e.marks?Object.keys(e.marks).map(Number.parseFloat).sort((u,a)=>u-a).filter(u=>u<=e.max&&u>=e.min).map(u=>({point:u,position:(u-e.min)*100/(e.max-e.min),mark:e.marks[u]})):[]),Ze=(e,t,u)=>{const{form:a,formItem:s}=Ae(),c=Me(),i=J(),V=J(),w={firstButton:i,secondButton:V},d=v(()=>e.disabled||(a==null?void 0:a.disabled)||!1),f=v(()=>Math.min(t.firstValue,t.secondValue)),o=v(()=>Math.max(t.firstValue,t.secondValue)),B=v(()=>e.range?`${100*(o.value-f.value)/(e.max-e.min)}%`:`${100*(t.firstValue-e.min)/(e.max-e.min)}%`),x=v(()=>e.range?`${100*(f.value-e.min)/(e.max-e.min)}%`:"0%"),N=v(()=>e.vertical?{height:e.height}:{}),P=v(()=>e.vertical?{height:B.value,bottom:x.value}:{width:B.value,left:x.value}),T=()=>{c.value&&(t.sliderSize=c.value[`client${e.vertical?"Height":"Width"}`])},z=m=>{const h=e.min+m*(e.max-e.min)/100;if(!e.range)return i;let p;return Math.abs(f.value-h)<Math.abs(o.value-h)?p=t.firstValue<t.secondValue?"firstButton":"secondButton":p=t.firstValue>t.secondValue?"firstButton":"secondButton",w[p]},S=m=>{const h=z(m);return h.value.setPosition(m),h},I=m=>{t.firstValue=m,g(e.range?[f.value,o.value]:m)},k=m=>{t.secondValue=m,e.range&&g([f.value,o.value])},g=m=>{u(ae,m),u(ge,m)},y=async()=>{await se(),u(xe,e.range?[f.value,o.value]:e.modelValue)},j=m=>{var h,p,_,G,Q,O;if(d.value||t.dragging)return;T();let Y=0;if(e.vertical){const C=(_=(p=(h=m.touches)==null?void 0:h.item(0))==null?void 0:p.clientY)!=null?_:m.clientY;Y=(c.value.getBoundingClientRect().bottom-C)/t.sliderSize*100}else{const C=(O=(Q=(G=m.touches)==null?void 0:G.item(0))==null?void 0:Q.clientX)!=null?O:m.clientX,M=c.value.getBoundingClientRect().left;Y=(C-M)/t.sliderSize*100}if(!(Y<0||Y>100))return S(Y)};return{elFormItem:s,slider:c,firstButton:i,secondButton:V,sliderDisabled:d,minValue:f,maxValue:o,runwayStyle:N,barStyle:P,resetSize:T,setPosition:S,emitChange:y,onSliderWrapperPrevent:m=>{var h,p;(((h=w.firstButton.value)==null?void 0:h.dragging)||((p=w.secondButton.value)==null?void 0:p.dragging))&&m.preventDefault()},onSliderClick:m=>{j(m)&&y()},onSliderDown:async m=>{const h=j(m);h&&(await se(),h.value.onButtonDown(m))},setFirstValue:I,setSecondValue:k}},{left:qe,down:Je,right:De,up:et,home:tt,end:lt,pageUp:at,pageDown:nt}=Ke,ot=(e,t,u)=>{const a=J(),s=J(!1),c=v(()=>t.value instanceof Function),i=v(()=>c.value&&t.value(e.modelValue)||e.modelValue),V=he(()=>{u.value&&(s.value=!0)},50),w=he(()=>{u.value&&(s.value=!1)},50);return{tooltip:a,tooltipVisible:s,formatValue:i,displayTooltip:V,hideTooltip:w}},rt=(e,t,u)=>{const{disabled:a,min:s,max:c,step:i,showTooltip:V,precision:w,sliderSize:d,formatTooltip:f,emitChange:o,resetSize:B,updateDragging:x}=ze(Le),{tooltip:N,tooltipVisible:P,formatValue:T,displayTooltip:z,hideTooltip:S}=ot(e,f,V),I=J(),k=v(()=>`${(e.modelValue-s.value)/(c.value-s.value)*100}%`),g=v(()=>e.vertical?{bottom:k.value}:{left:k.value}),y=()=>{t.hovering=!0,z()},j=()=>{t.hovering=!1,t.dragging||S()},H=n=>{a.value||(n.preventDefault(),Y(n),window.addEventListener("mousemove",C),window.addEventListener("touchmove",C),window.addEventListener("mouseup",M),window.addEventListener("touchend",M),window.addEventListener("contextmenu",M),I.value.focus())},A=n=>{a.value||(t.newPosition=Number.parseFloat(k.value)+n/(c.value-s.value)*100,$(t.newPosition),o())},U=()=>{A(-i.value)},m=()=>{A(i.value)},h=()=>{A(-i.value*4)},p=()=>{A(i.value*4)},_=()=>{a.value||($(0),o())},G=()=>{a.value||($(100),o())},Q=n=>{let b=!0;[qe,Je].includes(n.key)?U():[De,et].includes(n.key)?m():n.key===tt?_():n.key===lt?G():n.key===nt?h():n.key===at?p():b=!1,b&&n.preventDefault()},O=n=>{let b,F;return n.type.startsWith("touch")?(F=n.touches[0].clientY,b=n.touches[0].clientX):(F=n.clientY,b=n.clientX),{clientX:b,clientY:F}},Y=n=>{t.dragging=!0,t.isClick=!0;const{clientX:b,clientY:F}=O(n);e.vertical?t.startY=F:t.startX=b,t.startPosition=Number.parseFloat(k.value),t.newPosition=t.startPosition},C=n=>{if(t.dragging){t.isClick=!1,z(),B();let b;const{clientX:F,clientY:W}=O(n);e.vertical?(t.currentY=W,b=(t.startY-t.currentY)/d.value*100):(t.currentX=F,b=(t.currentX-t.startX)/d.value*100),t.newPosition=t.startPosition+b,$(t.newPosition)}},M=()=>{t.dragging&&(setTimeout(()=>{t.dragging=!1,t.hovering||S(),t.isClick||$(t.newPosition),o()},0),window.removeEventListener("mousemove",C),window.removeEventListener("touchmove",C),window.removeEventListener("mouseup",M),window.removeEventListener("touchend",M),window.removeEventListener("contextmenu",M))},$=async n=>{if(n===null||Number.isNaN(+n))return;n<0?n=0:n>100&&(n=100);const b=100/((c.value-s.value)/i.value);let W=Math.round(n/b)*b*(c.value-s.value)*.01+s.value;W=Number.parseFloat(W.toFixed(w.value)),W!==e.modelValue&&u(ae,W),!t.dragging&&e.modelValue!==t.oldValue&&(t.oldValue=e.modelValue),await se(),t.dragging&&z(),N.value.updatePopper()};return re(()=>t.dragging,n=>{x(n)}),{disabled:a,button:I,tooltip:N,tooltipVisible:P,showTooltip:V,wrapperStyle:g,formatValue:T,handleMouseEnter:y,handleMouseLeave:j,onButtonDown:H,onKeyDown:Q,setPosition:$}},st=(e,t,u,a)=>({stops:v(()=>{if(!e.showStops||e.min>e.max)return[];if(e.step===0)return[];const i=(e.max-e.min)/e.step,V=100*e.step/(e.max-e.min),w=Array.from({length:i-1}).map((d,f)=>(f+1)*V);return e.range?w.filter(d=>d<100*(u.value-e.min)/(e.max-e.min)||d>100*(a.value-e.min)/(e.max-e.min)):w.filter(d=>d>100*(t.firstValue-e.min)/(e.max-e.min))}),getStopStyle:i=>e.vertical?{bottom:`${i}%`}:{left:`${i}%`}}),it=(e,t,u,a,s,c)=>{const i=d=>{s(ae,d),s(ge,d)},V=()=>e.range?![u.value,a.value].every((d,f)=>d===t.oldValue[f]):e.modelValue!==t.oldValue,w=()=>{var d,f;e.min>e.max&&Ue("Slider","min should not be greater than max.");const o=e.modelValue;e.range&&Array.isArray(o)?o[1]<e.min?i([e.min,e.min]):o[0]>e.max?i([e.max,e.max]):o[0]<e.min?i([e.min,o[1]]):o[1]>e.max?i([o[0],e.max]):(t.firstValue=o[0],t.secondValue=o[1],V()&&(e.validateEvent&&((d=c==null?void 0:c.validate)==null||d.call(c,"change").catch(B=>Se())),t.oldValue=o.slice())):!e.range&&typeof o=="number"&&!Number.isNaN(o)&&(o<e.min?i(e.min):o>e.max?i(e.max):(t.firstValue=o,V()&&(e.validateEvent&&((f=c==null?void 0:c.validate)==null||f.call(c,"change").catch(B=>Se())),t.oldValue=o)))};w(),re(()=>t.dragging,d=>{d||w()}),re(()=>e.modelValue,(d,f)=>{t.dragging||Array.isArray(d)&&Array.isArray(f)&&d.every((o,B)=>o===f[B])&&t.firstValue===d[0]&&t.secondValue===d[1]||w()},{deep:!0}),re(()=>[e.min,e.max],()=>{w()})},ut=fe({modelValue:{type:Number,default:0},vertical:Boolean,tooltipClass:String,placement:{type:String,values:pe,default:"top"}}),dt={[ae]:e=>me(e)},mt=["tabindex"],ct=le({name:"ElSliderButton"}),ft=le({...ct,props:ut,emits:dt,setup(e,{expose:t,emit:u}){const a=e,s=ve("slider"),c=Ee({hovering:!1,dragging:!1,isClick:!1,startX:0,currentX:0,startY:0,currentY:0,startPosition:0,newPosition:0,oldValue:a.modelValue}),{disabled:i,button:V,tooltip:w,showTooltip:d,tooltipVisible:f,wrapperStyle:o,formatValue:B,handleMouseEnter:x,handleMouseLeave:N,onButtonDown:P,onKeyDown:T,setPosition:z}=rt(a,c,u),{hovering:S,dragging:I}=ce(c);return t({onButtonDown:P,onKeyDown:T,setPosition:z,hovering:S,dragging:I}),(k,g)=>(L(),K("div",{ref_key:"button",ref:V,class:R([l(s).e("button-wrapper"),{hover:l(S),dragging:l(I)}]),style:Z(l(o)),tabindex:l(i)?-1:0,onMouseenter:g[0]||(g[0]=(...y)=>l(x)&&l(x)(...y)),onMouseleave:g[1]||(g[1]=(...y)=>l(N)&&l(N)(...y)),onMousedown:g[2]||(g[2]=(...y)=>l(P)&&l(P)(...y)),onTouchstart:g[3]||(g[3]=(...y)=>l(P)&&l(P)(...y)),onFocus:g[4]||(g[4]=(...y)=>l(x)&&l(x)(...y)),onBlur:g[5]||(g[5]=(...y)=>l(N)&&l(N)(...y)),onKeydown:g[6]||(g[6]=(...y)=>l(T)&&l(T)(...y))},[Be(l(Ye),{ref_key:"tooltip",ref:w,visible:l(f),placement:k.placement,"fallback-placements":["top","bottom","right","left"],"stop-popper-mouse-event":!1,"popper-class":k.tooltipClass,disabled:!l(d),persistent:""},{content:Ve(()=>[q("span",null,Ie(l(B)),1)]),default:Ve(()=>[q("div",{class:R([l(s).e("button"),{hover:l(S),dragging:l(I)}])},null,2)]),_:1},8,["visible","placement","popper-class","disabled"])],46,mt))}});var ke=Ce(ft,[["__file","/home/runner/work/element-plus/element-plus/packages/components/slider/src/button.vue"]]);const vt=fe({mark:{type:te([String,Object]),default:void 0}});var gt=le({name:"ElSliderMarker",props:vt,setup(e){const t=ve("slider"),u=v(()=>we(e.mark)?e.mark:e.mark.label),a=v(()=>we(e.mark)?void 0:e.mark.style);return()=>Fe("div",{class:t.e("marks-text"),style:a.value},u.value)}});const bt=["id","role","aria-label","aria-labelledby"],yt={key:1},Vt=le({name:"ElSlider"}),wt=le({...Vt,props:He,emits:_e,setup(e,{expose:t,emit:u}){const a=e,s=ve("slider"),{t:c}=Re(),i=Ee({firstValue:0,secondValue:0,oldValue:0,dragging:!1,sliderSize:1}),{elFormItem:V,slider:w,firstButton:d,secondButton:f,sliderDisabled:o,minValue:B,maxValue:x,runwayStyle:N,barStyle:P,resetSize:T,emitChange:z,onSliderWrapperPrevent:S,onSliderClick:I,onSliderDown:k,setFirstValue:g,setSecondValue:y}=Ze(a,i,u),{stops:j,getStopStyle:H}=st(a,i,B,x),{inputId:A,isLabeledByFormItem:U}=$e(a,{formItemContext:V}),m=We(),h=v(()=>a.inputSize||m.value),p=v(()=>a.label||c("el.slider.defaultLabel",{min:a.min,max:a.max})),_=v(()=>a.range?a.rangeStartLabel||c("el.slider.defaultRangeStartLabel"):p.value),G=v(()=>a.formatValueText?a.formatValueText(n.value):`${n.value}`),Q=v(()=>a.rangeEndLabel||c("el.slider.defaultRangeEndLabel")),O=v(()=>a.formatValueText?a.formatValueText(b.value):`${b.value}`),Y=v(()=>[s.b(),s.m(m.value),s.is("vertical",a.vertical),{[s.m("with-input")]:a.showInput}]),C=Qe(a);it(a,i,B,x,u,V);const M=v(()=>{const r=[a.min,a.max,a.step].map(X=>{const D=`${X}`.split(".")[1];return D?D.length:0});return Math.max.apply(null,r)}),{sliderWrapper:$}=Ge(a,i,T),{firstValue:n,secondValue:b,sliderSize:F}=ce(i),W=r=>{i.dragging=r};return Xe(Le,{...ce(a),sliderSize:F,disabled:o,precision:M,emitChange:z,resetSize:T,updateDragging:W}),t({onSliderClick:I}),(r,X)=>{var D,be;return L(),K("div",{id:r.range?l(A):void 0,ref_key:"sliderWrapper",ref:$,class:R(l(Y)),role:r.range?"group":void 0,"aria-label":r.range&&!l(U)?l(p):void 0,"aria-labelledby":r.range&&l(U)?(D=l(V))==null?void 0:D.labelId:void 0,onTouchstart:X[2]||(X[2]=(...E)=>l(S)&&l(S)(...E)),onTouchmove:X[3]||(X[3]=(...E)=>l(S)&&l(S)(...E))},[q("div",{ref_key:"slider",ref:w,class:R([l(s).e("runway"),{"show-input":r.showInput&&!r.range},l(s).is("disabled",l(o))]),style:Z(l(N)),onMousedown:X[0]||(X[0]=(...E)=>l(k)&&l(k)(...E)),onTouchstart:X[1]||(X[1]=(...E)=>l(k)&&l(k)(...E))},[q("div",{class:R(l(s).e("bar")),style:Z(l(P))},null,6),Be(ke,{id:r.range?void 0:l(A),ref_key:"firstButton",ref:d,"model-value":l(n),vertical:r.vertical,"tooltip-class":r.tooltipClass,placement:r.placement,role:"slider","aria-label":r.range||!l(U)?l(_):void 0,"aria-labelledby":!r.range&&l(U)?(be=l(V))==null?void 0:be.labelId:void 0,"aria-valuemin":r.min,"aria-valuemax":r.range?l(b):r.max,"aria-valuenow":l(n),"aria-valuetext":l(G),"aria-orientation":r.vertical?"vertical":"horizontal","aria-disabled":l(o),"onUpdate:modelValue":l(g)},null,8,["id","model-value","vertical","tooltip-class","placement","aria-label","aria-labelledby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-orientation","aria-disabled","onUpdate:modelValue"]),r.range?(L(),ie(ke,{key:0,ref_key:"secondButton",ref:f,"model-value":l(b),vertical:r.vertical,"tooltip-class":r.tooltipClass,placement:r.placement,role:"slider","aria-label":l(Q),"aria-valuemin":l(n),"aria-valuemax":r.max,"aria-valuenow":l(b),"aria-valuetext":l(O),"aria-orientation":r.vertical?"vertical":"horizontal","aria-disabled":l(o),"onUpdate:modelValue":l(y)},null,8,["model-value","vertical","tooltip-class","placement","aria-label","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-orientation","aria-disabled","onUpdate:modelValue"])):ne("v-if",!0),r.showStops?(L(),K("div",yt,[(L(!0),K(oe,null,ue(l(j),(E,ee)=>(L(),K("div",{key:ee,class:R(l(s).e("stop")),style:Z(l(H)(E))},null,6))),128))])):ne("v-if",!0),l(C).length>0?(L(),K(oe,{key:2},[q("div",null,[(L(!0),K(oe,null,ue(l(C),(E,ee)=>(L(),K("div",{key:ee,style:Z(l(H)(E.position)),class:R([l(s).e("stop"),l(s).e("marks-stop")])},null,6))),128))]),q("div",{class:R(l(s).e("marks"))},[(L(!0),K(oe,null,ue(l(C),(E,ee)=>(L(),ie(l(gt),{key:ee,mark:E.mark,style:Z(l(H)(E.position))},null,8,["mark","style"]))),128))],2)],64)):ne("v-if",!0)],38),r.showInput&&!r.range?(L(),ie(l(Ne),{key:0,ref:"input","model-value":l(n),class:R(l(s).e("input")),step:r.step,disabled:l(o),controls:r.showInputControls,min:r.min,max:r.max,debounce:r.debounce,size:l(h),"onUpdate:modelValue":l(g),onChange:l(z)},null,8,["model-value","class","step","disabled","controls","min","max","debounce","size","onUpdate:modelValue","onChange"])):ne("v-if",!0)],42,bt)}}});var ht=Ce(wt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/slider/src/slider.vue"]]);const al=je(ht);export{al as ElSlider,al as default,Le as sliderContextKey,_e as sliderEmits,He as sliderProps};