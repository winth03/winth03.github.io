import{ElIcon as D}from"./index.52232a07.js";import{ArrowLeft as _e,ArrowRight as Ne,Close as Te,Plus as we}from"./index.e0b44930.js";import{u as oe,c as Ce,d as Pe}from"./index.5dbd068b.js";import{b as I,d as Z}from"./runtime.a8d5aa72.js";import{m as ne}from"./typescript.c44ade1c.js";import{_ as le}from"./plugin-vue_export-helper.b0b5f2d9.js";import{t as G}from"./error.6c36bb34.js";import{f as M,a5 as J,a2 as K,p as T,w as O,e as Q,o as re,D as ie,a4 as ce,u as E,R as Se,x as U,k as L,H as ue,aL as $e,S as d,a3 as Ee,K as de,a8 as xe,h as ke,aM as te,M as Be,v as Oe,Z as Re,$ as ze,Y as Ae}from"./entry.40f94ce2.js";import{c as B}from"./strings.c93dd47f.js";import{E as V}from"./aria.362daa0e.js";import{c as Me,a as ae}from"./types.0ffe2429.js";import{U as be}from"./event.e54e7e4a.js";import{u as Le}from"./index.1d99e464.js";import{u as Fe}from"./index.d26d92fd.js";import{w as De,a as Ve}from"./install.db378abc.js";import"./style.a7bf22e4.js";import"./vnode.30b5e0bd.js";const H=Symbol("tabsRootContextKey"),Ie=I({tabs:{type:Z(Array),default:()=>ne([])}}),fe="ElTabBar",Ke=M({name:fe}),Ue=M({...Ke,props:Ie,setup(e,{expose:l}){const w=e,R=U(),i=J(H);i||G(fe,"<el-tabs><el-tab-bar /></el-tabs>");const o=K("tabs"),b=T(),x=T(),c=()=>{let f=0,v=0;const u=["top","bottom"].includes(i.props.tabPosition)?"width":"height",s=u==="width"?"x":"y",k=s==="x"?"left":"top";return w.tabs.every(S=>{var P,t;const p=(t=(P=R.parent)==null?void 0:P.refs)==null?void 0:t[`tab-${S.uid}`];if(!p)return!1;if(!S.active)return!0;f=p[`offset${B(k)}`],v=p[`client${B(u)}`];const g=window.getComputedStyle(p);return u==="width"&&(w.tabs.length>1&&(v-=Number.parseFloat(g.paddingLeft)+Number.parseFloat(g.paddingRight)),f+=Number.parseFloat(g.paddingLeft)),!1}),{[u]:`${v}px`,transform:`translate${B(s)}(${f}px)`}},h=()=>x.value=c();return O(()=>w.tabs,async()=>{await Q(),h()},{immediate:!0}),oe(b,()=>h()),l({ref:b,update:h}),(f,v)=>(re(),ie("div",{ref_key:"barRef",ref:b,class:ce([E(o).e("active-bar"),E(o).is(E(i).props.tabPosition)]),style:Se(x.value)},null,6))}});var He=le(Ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const qe=I({panes:{type:Z(Array),default:()=>ne([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),We={tabClick:(e,l,w)=>w instanceof Event,tabRemove:(e,l)=>l instanceof Event},se="ElTabNav",Ye=M({name:se,props:qe,emits:We,setup(e,{expose:l,emit:w}){const R=U(),i=J(H);i||G(se,"<el-tabs><tab-nav /></el-tabs>");const o=K("tabs"),b=Ce(),x=Pe(),c=T(),h=T(),f=T(),v=T(),u=T(!1),s=T(0),k=T(!1),S=T(!0),P=L(()=>["top","bottom"].includes(i.props.tabPosition)?"width":"height"),t=L(()=>({transform:`translate${P.value==="width"?"X":"Y"}(-${s.value}px)`})),p=()=>{if(!c.value)return;const n=c.value[`offset${B(P.value)}`],r=s.value;if(!r)return;const a=r>n?r-n:0;s.value=a},g=()=>{if(!c.value||!h.value)return;const n=h.value[`offset${B(P.value)}`],r=c.value[`offset${B(P.value)}`],a=s.value;if(n-a<=r)return;const _=n-a>r*2?a+r:n-r;s.value=_},z=async()=>{const n=h.value;if(!u.value||!f.value||!c.value||!n)return;await Q();const r=f.value.querySelector(".is-active");if(!r)return;const a=c.value,_=["top","bottom"].includes(i.props.tabPosition),N=r.getBoundingClientRect(),y=a.getBoundingClientRect(),$=_?n.offsetWidth-y.width:n.offsetHeight-y.height,C=s.value;let m=C;_?(N.left<y.left&&(m=C-(y.left-N.left)),N.right>y.right&&(m=C+N.right-y.right)):(N.top<y.top&&(m=C-(y.top-N.top)),N.bottom>y.bottom&&(m=C+(N.bottom-y.bottom))),m=Math.max(m,0),s.value=Math.min(m,$)},F=()=>{var n;if(!h.value||!c.value)return;e.stretch&&((n=v.value)==null||n.update());const r=h.value[`offset${B(P.value)}`],a=c.value[`offset${B(P.value)}`],_=s.value;a<r?(u.value=u.value||{},u.value.prev=_,u.value.next=_+a<r,r-_<a&&(s.value=r-a)):(u.value=!1,_>0&&(s.value=0))},pe=n=>{const r=n.code,{up:a,down:_,left:N,right:y}=V;if(![a,_,N,y].includes(r))return;const $=Array.from(n.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),C=$.indexOf(n.target);let m;r===N||r===a?C===0?m=$.length-1:m=C-1:C<$.length-1?m=C+1:m=0,$[m].focus({preventScroll:!0}),$[m].click(),ee()},ee=()=>{S.value&&(k.value=!0)},q=()=>k.value=!1;return O(b,n=>{n==="hidden"?S.value=!1:n==="visible"&&setTimeout(()=>S.value=!0,50)}),O(x,n=>{n?setTimeout(()=>S.value=!0,50):S.value=!1}),oe(f,F),ue(()=>setTimeout(()=>z(),0)),$e(()=>F()),l({scrollToActiveTab:z,removeFocus:q}),O(()=>e.panes,()=>R.update(),{flush:"post",deep:!0}),()=>{const n=u.value?[d("span",{class:[o.e("nav-prev"),o.is("disabled",!u.value.prev)],onClick:p},[d(D,null,{default:()=>[d(_e,null,null)]})]),d("span",{class:[o.e("nav-next"),o.is("disabled",!u.value.next)],onClick:g},[d(D,null,{default:()=>[d(Ne,null,null)]})])]:null,r=e.panes.map((a,_)=>{var N,y,$,C;const m=a.uid,W=a.props.disabled,Y=(y=(N=a.props.name)!=null?N:a.index)!=null?y:`${_}`,j=!W&&(a.isClosable||e.editable);a.index=`${_}`;const he=j?d(D,{class:"is-icon-close",onClick:A=>w("tabRemove",a,A)},{default:()=>[d(Te,null,null)]}):null,ye=((C=($=a.slots).label)==null?void 0:C.call($))||a.props.label,ge=!W&&a.active?0:-1;return d("div",{ref:`tab-${m}`,class:[o.e("item"),o.is(i.props.tabPosition),o.is("active",a.active),o.is("disabled",W),o.is("closable",j),o.is("focus",k.value)],id:`tab-${Y}`,key:`tab-${m}`,"aria-controls":`pane-${Y}`,role:"tab","aria-selected":a.active,tabindex:ge,onFocus:()=>ee(),onBlur:()=>q(),onClick:A=>{q(),w("tabClick",a,Y,A)},onKeydown:A=>{j&&(A.code===V.delete||A.code===V.backspace)&&w("tabRemove",a,A)}},[ye,he])});return d("div",{ref:f,class:[o.e("nav-wrap"),o.is("scrollable",!!u.value),o.is(i.props.tabPosition)]},[n,d("div",{class:o.e("nav-scroll"),ref:c},[d("div",{class:[o.e("nav"),o.is(i.props.tabPosition),o.is("stretch",e.stretch&&["top","bottom"].includes(i.props.tabPosition))],ref:h,style:t.value,role:"tablist",onKeydown:pe},[e.type?null:d(He,{ref:v,tabs:[...e.panes]},null),r])])])}}}),je=I({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:Z(Function),default:()=>!0},stretch:Boolean}),X=e=>xe(e)||Me(e),Xe={[be]:e=>X(e),tabClick:(e,l)=>l instanceof Event,tabChange:e=>X(e),edit:(e,l)=>["remove","add"].includes(l),tabRemove:e=>X(e),tabAdd:()=>!0};var Ze=M({name:"ElTabs",props:je,emits:Xe,setup(e,{emit:l,slots:w,expose:R}){var i,o;const b=K("tabs"),{children:x,addChild:c,removeChild:h}=Le(U(),"ElTabPane"),f=T(),v=T((o=(i=e.modelValue)!=null?i:e.activeName)!=null?o:"0"),u=t=>{v.value=t,l(be,t),l("tabChange",t)},s=async t=>{var p,g,z;if(!(v.value===t||ae(t)))try{await((p=e.beforeLeave)==null?void 0:p.call(e,t,v.value))!==!1&&(u(t),(z=(g=f.value)==null?void 0:g.removeFocus)==null||z.call(g))}catch{}},k=(t,p,g)=>{t.props.disabled||(s(p),l("tabClick",t,g))},S=(t,p)=>{t.props.disabled||ae(t.props.name)||(p.stopPropagation(),l("edit",t.props.name,"remove"),l("tabRemove",t.props.name))},P=()=>{l("edit",void 0,"add"),l("tabAdd")};return Fe({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},L(()=>!!e.activeName)),O(()=>e.activeName,t=>s(t)),O(()=>e.modelValue,t=>s(t)),O(v,async()=>{var t;await Q(),(t=f.value)==null||t.scrollToActiveTab()}),Ee(H,{props:e,currentName:v,registerPane:c,unregisterPane:h}),R({currentName:v}),()=>{const t=e.editable||e.addable?d("span",{class:b.e("new-tab"),tabindex:"0",onClick:P,onKeydown:z=>{z.code===V.enter&&P()}},[d(D,{class:b.is("icon-plus")},{default:()=>[d(we,null,null)]})]):null,p=d("div",{class:[b.e("header"),b.is(e.tabPosition)]},[t,d(Ye,{ref:f,currentName:v.value,editable:e.editable,type:e.type,panes:x.value,stretch:e.stretch,onTabClick:k,onTabRemove:S},null)]),g=d("div",{class:b.e("content")},[de(w,"default")]);return d("div",{class:[b.b(),b.m(e.tabPosition),{[b.m("card")]:e.type==="card",[b.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[p,g]:[g,p]])}}});const Ge=I({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),Je=["id","aria-hidden","aria-labelledby"],ve="ElTabPane",Qe=M({name:ve}),et=M({...Qe,props:Ge,setup(e){const l=e,w=U(),R=ke(),i=J(H);i||G(ve,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const o=K("tab-pane"),b=T(),x=L(()=>l.closable||i.props.closable),c=te(()=>{var s;return i.currentName.value===((s=l.name)!=null?s:b.value)}),h=T(c.value),f=L(()=>{var s;return(s=l.name)!=null?s:b.value}),v=te(()=>!l.lazy||h.value||c.value);O(c,s=>{s&&(h.value=!0)});const u=Be({uid:w.uid,slots:R,props:l,paneName:f,active:c,index:b,isClosable:x});return ue(()=>{i.registerPane(u)}),Oe(()=>{i.unregisterPane(u.uid)}),(s,k)=>E(v)?Re((re(),ie("div",{key:0,id:`pane-${E(f)}`,class:ce(E(o).b()),role:"tabpanel","aria-hidden":!E(c),"aria-labelledby":`tab-${E(f)}`},[de(s.$slots,"default")],10,Je)),[[ze,E(c)]]):Ae("v-if",!0)}});var me=le(et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const yt=De(Ze,{TabPane:me}),gt=Ve(me);export{gt as ElTabPane,yt as ElTabs,yt as default,Ie as tabBarProps,We as tabNavEmits,qe as tabNavProps,Ge as tabPaneProps,Xe as tabsEmits,je as tabsProps,H as tabsRootContextKey};
