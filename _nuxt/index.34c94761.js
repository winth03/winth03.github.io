import{i as ae,l as L,f as ve,b as g,h as i,D as I,E as $,K as E,F as R,e as pe,o as c,j as h,L as W,M as he,k as y,u as o,v as ye,w as U,x as q,c as V,O as T,y as G,P as D,Q,t as be}from"./entry.b33cb278.js";import{ElIcon as X}from"./index.960dedfd.js";import{StarFilled as w,Star as Ve}from"./index.dc3cf8fc.js";import{b as we,d as N}from"./runtime.ca6a5e5a.js";import{m as J}from"./typescript.c44ade1c.js";import{i as Y}from"./icon.13fbe947.js";import{u as xe}from"./index.3ddc1a68.js";import{C as Ce,U as C}from"./event.e54e7e4a.js";import{i as Z}from"./types.bb628c62.js";import{_ as Se}from"./plugin-vue_export-helper.b0b5f2d9.js";import{f as _e,a as ge}from"./constants.e2ce9b61.js";import{u as Ie}from"./use-form-common-props.a25456a0.js";import{u as Ee}from"./use-form-item.ec62bf83.js";import{E as x}from"./aria.362daa0e.js";import{h as ee}from"./style.6fe07f58.js";import{w as Te}from"./install.187cf5b6.js";import"./size.007424cf.js";const De=we({modelValue:{type:Number,default:0},id:{type:String,default:void 0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:N([Array,Object]),default:()=>J(["","",""])},voidColor:{type:String,default:""},disabledVoidColor:{type:String,default:""},icons:{type:N([Array,Object]),default:()=>[w,w,w]},voidIcon:{type:Y,default:()=>Ve},disabledVoidIcon:{type:Y,default:()=>w},disabled:Boolean,allowHalf:Boolean,showText:Boolean,showScore:Boolean,textColor:{type:String,default:""},texts:{type:N(Array),default:()=>J(["Extremely bad","Disappointed","Fair","Satisfied","Surprise"])},scoreTemplate:{type:String,default:"{value}"},size:xe,label:{type:String,default:void 0},clearable:{type:Boolean,default:!1}}),Ne={[Ce]:m=>Z(m),[C]:m=>Z(m)},ke=["id","aria-label","aria-labelledby","aria-valuenow","aria-valuetext","aria-valuemax"],Me=["onMousemove","onClick"],He=ae({name:"ElRate"}),Be=ae({...He,props:De,emits:Ne,setup(m,{expose:le,emit:v}){const e=m;function S(a,l){const t=n=>$(n),u=Object.keys(l).map(n=>+n).filter(n=>{const b=l[n];return(t(b)?b.excluded:!1)?a<n:a<=n}).sort((n,b)=>n-b),p=l[u[0]];return t(p)&&p.value||p}const k=L(_e,void 0),M=L(ge,void 0),oe=Ie(),s=ve("rate"),{inputId:te,isLabeledByFormItem:H}=Ee(e,{formItemContext:M}),r=g(e.modelValue),_=g(-1),f=g(!0),re=i(()=>[s.b(),s.m(oe.value)]),d=i(()=>e.disabled||(k==null?void 0:k.disabled)),se=i(()=>s.cssVarBlock({"void-color":e.voidColor,"disabled-void-color":e.disabledVoidColor,"fill-color":A.value})),B=i(()=>{let a="";return e.showScore?a=e.scoreTemplate.replace(/\{\s*value\s*\}/,d.value?`${e.modelValue}`:`${r.value}`):e.showText&&(a=e.texts[Math.ceil(r.value)-1]),a}),P=i(()=>e.modelValue*100-Math.floor(e.modelValue)*100),ne=i(()=>I(e.colors)?{[e.lowThreshold]:e.colors[0],[e.highThreshold]:{value:e.colors[1],excluded:!0},[e.max]:e.colors[2]}:e.colors),A=i(()=>{const a=S(r.value,ne.value);return $(a)?"":a}),ie=i(()=>{let a="";return d.value?a=`${P.value}%`:e.allowHalf&&(a="50%"),{color:A.value,width:a}}),F=i(()=>{let a=I(e.icons)?[...e.icons]:{...e.icons};return a=E(a),I(a)?{[e.lowThreshold]:a[0],[e.highThreshold]:{value:a[1],excluded:!0},[e.max]:a[2]}:a}),ue=i(()=>S(e.modelValue,F.value)),de=i(()=>d.value?R(e.disabledVoidIcon)?e.disabledVoidIcon:E(e.disabledVoidIcon):R(e.voidIcon)?e.voidIcon:E(e.voidIcon)),ce=i(()=>S(r.value,F.value));function O(a){const l=d.value&&P.value>0&&a-1<e.modelValue&&a>e.modelValue,t=e.allowHalf&&f.value&&a-.5<=r.value&&a>r.value;return l||t}function j(a){e.clearable&&a===e.modelValue&&(a=0),v(C,a),e.modelValue!==a&&v("change",a)}function fe(a){d.value||(e.allowHalf&&f.value?j(r.value):j(a))}function me(a){if(d.value)return;let l=r.value;const t=a.code;return t===x.up||t===x.right?(e.allowHalf?l+=.5:l+=1,a.stopPropagation(),a.preventDefault()):(t===x.left||t===x.down)&&(e.allowHalf?l-=.5:l-=1,a.stopPropagation(),a.preventDefault()),l=l<0?0:l,l=l>e.max?e.max:l,v(C,l),v("change",l),l}function z(a,l){if(!d.value){if(e.allowHalf&&l){let t=l.target;ee(t,s.e("item"))&&(t=t.querySelector(`.${s.e("icon")}`)),(t.clientWidth===0||ee(t,s.e("decimal")))&&(t=t.parentNode),f.value=l.offsetX*2<=t.clientWidth,r.value=f.value?a-.5:a}else r.value=a;_.value=a}}function K(){d.value||(e.allowHalf&&(f.value=e.modelValue!==Math.floor(e.modelValue)),r.value=e.modelValue,_.value=-1)}return pe(()=>e.modelValue,a=>{r.value=a,f.value=e.modelValue!==Math.floor(e.modelValue)}),e.modelValue||v(C,0),le({setCurrentValue:z,resetCurrentValue:K}),(a,l)=>{var t;return c(),h("div",{id:o(te),class:y([o(re),o(s).is("disabled",o(d))]),role:"slider","aria-label":o(H)?void 0:a.label||"rating","aria-labelledby":o(H)?(t=o(M))==null?void 0:t.labelId:void 0,"aria-valuenow":r.value,"aria-valuetext":o(B)||void 0,"aria-valuemin":"0","aria-valuemax":a.max,tabindex:"0",style:Q(o(se)),onKeydown:me},[(c(!0),h(W,null,he(a.max,(u,p)=>(c(),h("span",{key:p,class:y(o(s).e("item")),onMousemove:n=>z(u,n),onMouseleave:K,onClick:n=>fe(u)},[ye(o(X),{class:y([o(s).e("icon"),{hover:_.value===u},o(s).is("active",u<=r.value)])},{default:U(()=>[O(u)?D("v-if",!0):(c(),h(W,{key:0},[q((c(),V(T(o(ce)),null,null,512)),[[G,u<=r.value]]),q((c(),V(T(o(de)),null,null,512)),[[G,!(u<=r.value)]])],64)),O(u)?(c(),V(o(X),{key:1,style:Q(o(ie)),class:y([o(s).e("icon"),o(s).e("decimal")])},{default:U(()=>[(c(),V(T(o(ue))))]),_:1},8,["style","class"])):D("v-if",!0)]),_:2},1032,["class"])],42,Me))),128)),a.showText||a.showScore?(c(),h("span",{key:0,class:y(o(s).e("text"))},be(o(B)),3)):D("v-if",!0)],46,ke)}}});var Pe=Se(Be,[["__file","/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);const ea=Te(Pe);export{ea as ElRate,ea as default,Ne as rateEmits,De as rateProps};
