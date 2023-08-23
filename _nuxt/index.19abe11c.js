import{b as w,h as O,u as e,e as W,aH as Se,S as ie,ae as Ne,p as Ee,R as ue,F as Me,i as G,f as ce,o as A,j as R,m as K,c as oe,w as Q,x as Y,k as $,z as j,v as X,y as q,T as se,P as F,r as fe,Q as ve,L as Te,M as Ae,t as $e,l as He,ah as Le,W as Be}from"./entry.b33cb278.js";import{ElIcon as re}from"./index.960dedfd.js";import{ArrowLeft as Pe,ArrowRight as Oe}from"./index.dc3cf8fc.js";import{b as me}from"./runtime.ca6a5e5a.js";import{i as Re,a as Ve}from"./types.bb628c62.js";import{u as ze}from"./index.785ddeeb.js";import{u as De}from"./index.d6ab7623.js";import{t as ne}from"./throttle.d970eabc.js";import{_ as de}from"./plugin-vue_export-helper.b0b5f2d9.js";import{w as We,a as je}from"./install.187cf5b6.js";import"./style.6fe07f58.js";import"./vnode.acbb2db8.js";import"./debounce.a43f57fe.js";import"./isObject.5a18b265.js";const Fe=me({initialIndex:{type:Number,default:0},height:{type:String,default:""},trigger:{type:String,values:["hover","click"],default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:{type:String,values:["","none","outside"],default:""},arrow:{type:String,values:["always","hover","never"],default:"hover"},type:{type:String,values:["","card"],default:""},loop:{type:Boolean,default:!0},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},pauseOnHover:{type:Boolean,default:!0}}),Ue={change:(s,H)=>[s,H].every(Re)},he=Symbol("carouselContextKey"),le=300,Ke=(s,H,i)=>{const{children:r,addChild:k,removeChild:p}=De(ue(),"ElCarouselItem"),n=w(-1),d=w(null),g=w(!1),y=w(),I=w(0),S=O(()=>s.arrow!=="never"&&!e(m)),E=O(()=>r.value.some(t=>t.props.label.toString().length>0)),b=O(()=>s.type==="card"),m=O(()=>s.direction==="vertical"),L=O(()=>s.height!=="auto"?{height:s.height}:{height:`${I.value}px`,overflow:"hidden"}),_=ne(t=>{o(t)},le,{trailing:!0}),N=ne(t=>{V(t)},le);function M(){d.value&&(clearInterval(d.value),d.value=null)}function B(){s.interval<=0||!s.autoplay||d.value||(d.value=setInterval(()=>l(),s.interval))}const l=()=>{n.value<r.value.length-1?n.value=n.value+1:s.loop&&(n.value=0)};function o(t){if(Me(t)){const z=r.value.filter(U=>U.props.name===t);z.length>0&&(t=r.value.indexOf(z[0]))}if(t=Number(t),Number.isNaN(t)||t!==Math.floor(t))return;const v=r.value.length,T=n.value;t<0?n.value=s.loop?v-1:0:t>=v?n.value=s.loop?0:v-1:n.value=t,T===n.value&&f(T),x()}function f(t){r.value.forEach((v,T)=>{v.translateItem(T,n.value,t)})}function a(t,v){var T,z,U,ee;const D=e(r),te=D.length;if(te===0||!t.states.inStage)return!1;const Ie=v+1,Ce=v-1,ae=te-1,we=D[ae].states.active,be=D[0].states.active,ke=(z=(T=D[Ie])==null?void 0:T.states)==null?void 0:z.active,_e=(ee=(U=D[Ce])==null?void 0:U.states)==null?void 0:ee.active;return v===ae&&be||ke?"left":v===0&&we||_e?"right":!1}function C(){g.value=!0,s.pauseOnHover&&M()}function P(){g.value=!1,B()}function u(t){e(m)||r.value.forEach((v,T)=>{t===a(v,T)&&(v.states.hover=!0)})}function c(){e(m)||r.value.forEach(t=>{t.states.hover=!1})}function h(t){n.value=t}function V(t){s.trigger==="hover"&&t!==n.value&&(n.value=t)}function J(){o(n.value-1)}function ge(){o(n.value+1)}function x(){M(),B()}function ye(t){s.height==="auto"&&(I.value=t)}W(()=>n.value,(t,v)=>{f(v),v>-1&&H("change",t,v)}),W(()=>s.autoplay,t=>{t?B():M()}),W(()=>s.loop,()=>{o(n.value)}),W(()=>s.interval,()=>{x()}),W(()=>r.value,()=>{r.value.length>0&&o(s.initialIndex)});const Z=Se();return ie(()=>{Z.value=ze(y.value,()=>{f()}),B()}),Ne(()=>{M(),y.value&&Z.value&&Z.value.stop()}),Ee(he,{root:y,isCardType:b,isVertical:m,items:r,loop:s.loop,addItem:k,removeItem:p,setActiveItem:o,setContainerHeight:ye}),{root:y,activeIndex:n,arrowDisplay:S,hasLabel:E,hover:g,isCardType:b,items:r,isVertical:m,containerStyle:L,handleButtonEnter:u,handleButtonLeave:c,handleIndicatorClick:h,handleMouseEnter:C,handleMouseLeave:P,setActiveItem:o,prev:J,next:ge,throttledArrowClick:_,throttledIndicatorHover:N}},Qe=["onMouseenter","onClick"],Xe={key:0},Ye="ElCarousel",qe=G({name:Ye}),Ge=G({...qe,props:Fe,emits:Ue,setup(s,{expose:H,emit:i}){const r=s,{root:k,activeIndex:p,arrowDisplay:n,hasLabel:d,hover:g,isCardType:y,items:I,isVertical:S,containerStyle:E,handleButtonEnter:b,handleButtonLeave:m,handleIndicatorClick:L,handleMouseEnter:_,handleMouseLeave:N,setActiveItem:M,prev:B,next:l,throttledArrowClick:o,throttledIndicatorHover:f}=Ke(r,i),a=ce("carousel"),C=O(()=>{const u=[a.b(),a.m(r.direction)];return e(y)&&u.push(a.m("card")),u}),P=O(()=>{const u=[a.e("indicators"),a.em("indicators",r.direction)];return e(d)&&u.push(a.em("indicators","labels")),r.indicatorPosition==="outside"&&u.push(a.em("indicators","outside")),e(S)&&u.push(a.em("indicators","right")),u});return H({setActiveItem:M,prev:B,next:l}),(u,c)=>(A(),R("div",{ref_key:"root",ref:k,class:$(e(C)),onMouseenter:c[6]||(c[6]=j((...h)=>e(_)&&e(_)(...h),["stop"])),onMouseleave:c[7]||(c[7]=j((...h)=>e(N)&&e(N)(...h),["stop"]))},[K("div",{class:$(e(a).e("container")),style:ve(e(E))},[e(n)?(A(),oe(se,{key:0,name:"carousel-arrow-left",persisted:""},{default:Q(()=>[Y(K("button",{type:"button",class:$([e(a).e("arrow"),e(a).em("arrow","left")]),onMouseenter:c[0]||(c[0]=h=>e(b)("left")),onMouseleave:c[1]||(c[1]=(...h)=>e(m)&&e(m)(...h)),onClick:c[2]||(c[2]=j(h=>e(o)(e(p)-1),["stop"]))},[X(e(re),null,{default:Q(()=>[X(e(Pe))]),_:1})],34),[[q,(u.arrow==="always"||e(g))&&(r.loop||e(p)>0)]])]),_:1})):F("v-if",!0),e(n)?(A(),oe(se,{key:1,name:"carousel-arrow-right",persisted:""},{default:Q(()=>[Y(K("button",{type:"button",class:$([e(a).e("arrow"),e(a).em("arrow","right")]),onMouseenter:c[3]||(c[3]=h=>e(b)("right")),onMouseleave:c[4]||(c[4]=(...h)=>e(m)&&e(m)(...h)),onClick:c[5]||(c[5]=j(h=>e(o)(e(p)+1),["stop"]))},[X(e(re),null,{default:Q(()=>[X(e(Oe))]),_:1})],34),[[q,(u.arrow==="always"||e(g))&&(r.loop||e(p)<e(I).length-1)]])]),_:1})):F("v-if",!0),fe(u.$slots,"default")],6),u.indicatorPosition!=="none"?(A(),R("ul",{key:0,class:$(e(P))},[(A(!0),R(Te,null,Ae(e(I),(h,V)=>(A(),R("li",{key:V,class:$([e(a).e("indicator"),e(a).em("indicator",u.direction),e(a).is("active",V===e(p))]),onMouseenter:J=>e(f)(V),onClick:j(J=>e(L)(V),["stop"])},[K("button",{class:$(e(a).e("button"))},[e(d)?(A(),R("span",Xe,$e(h.props.label),1)):F("v-if",!0)],2)],42,Qe))),128))],2)):F("v-if",!0)],34))}});var Je=de(Ge,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);const Ze=me({name:{type:String,default:""},label:{type:[String,Number],default:""}}),xe=(s,H)=>{const i=He(he),r=ue(),k=.83,p=w(),n=w(!1),d=w(0),g=w(1),y=w(!1),I=w(!1),S=w(!1),E=w(!1),{isCardType:b,isVertical:m}=i;function L(l,o,f){const a=f-1,C=o-1,P=o+1,u=f/2;return o===0&&l===a?-1:o===a&&l===0?f:l<C&&o-l>=u?f+1:l>P&&l-o>=u?-2:l}function _(l,o){var f,a;const C=e(m)?((f=i.root.value)==null?void 0:f.offsetHeight)||0:((a=i.root.value)==null?void 0:a.offsetWidth)||0;return S.value?C*((2-k)*(l-o)+1)/4:l<o?-(1+k)*C/4:(3+k)*C/4}function N(l,o,f){const a=i.root.value;return a?((f?a.offsetHeight:a.offsetWidth)||0)*(l-o):0}const M=(l,o,f)=>{var a;const C=e(b),P=(a=i.items.value.length)!=null?a:Number.NaN,u=l===o;!C&&!Ve(f)&&(E.value=u||l===f),!u&&P>2&&i.loop&&(l=L(l,o,P));const c=e(m);y.value=u,C?(S.value=Math.round(Math.abs(l-o))<=1,d.value=_(l,o),g.value=e(y)?1:k):d.value=N(l,o,c),I.value=!0,u&&p.value&&i.setContainerHeight(p.value.offsetHeight)};function B(){if(i&&e(b)){const l=i.items.value.findIndex(({uid:o})=>o===r.uid);i.setActiveItem(l)}}return ie(()=>{i.addItem({props:s,states:Le({hover:n,translate:d,scale:g,active:y,ready:I,inStage:S,animating:E}),uid:r.uid,translateItem:M})}),Be(()=>{i.removeItem(r.uid)}),{carouselItemRef:p,active:y,animating:E,hover:n,inStage:S,isVertical:m,translate:d,isCardType:b,scale:g,ready:I,handleItemClick:B}},et=G({name:"ElCarouselItem"}),tt=G({...et,props:Ze,setup(s){const H=s,i=ce("carousel"),{carouselItemRef:r,active:k,animating:p,hover:n,inStage:d,isVertical:g,translate:y,isCardType:I,scale:S,ready:E,handleItemClick:b}=xe(H),m=O(()=>{const _=`${`translate${e(g)?"Y":"X"}`}(${e(y)}px)`,N=`scale(${e(S)})`;return{transform:[_,N].join(" ")}});return(L,_)=>Y((A(),R("div",{ref_key:"carouselItemRef",ref:r,class:$([e(i).e("item"),e(i).is("active",e(k)),e(i).is("in-stage",e(d)),e(i).is("hover",e(n)),e(i).is("animating",e(p)),{[e(i).em("item","card")]:e(I),[e(i).em("item","card-vertical")]:e(I)&&e(g)}]),style:ve(e(m)),onClick:_[0]||(_[0]=(...N)=>e(b)&&e(b)(...N))},[e(I)?Y((A(),R("div",{key:0,class:$(e(i).e("mask"))},null,2)),[[q,!e(k)]]):F("v-if",!0),fe(L.$slots,"default")],6)),[[q,e(E)]])}});var pe=de(tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);const pt=We(Je,{CarouselItem:pe}),gt=je(pe);export{pt as ElCarousel,gt as ElCarouselItem,he as carouselContextKey,Ue as carouselEmits,Ze as carouselItemProps,Fe as carouselProps,pt as default};
