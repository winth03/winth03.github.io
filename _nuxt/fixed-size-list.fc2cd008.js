import{H as ht,V as mt,j as St,I as nt,S as ct,u as vt,l as st,R as tt,a as rt,b as gt,c as it,d as Ot,B as Tt,F as wt,g as et,A as lt,e as Rt,C as ft,E as Et,f as Mt,h as yt}from"./scrollbar.49e1ff00.js";import{c as It,r as xt}from"./raf.4b9fc1d2.js";import{i as Lt}from"./browser.5585a965.js";import{i as bt,f as _t,b as W,h as w,u as o,S as At,I as zt,aO as Ft,O as ut,a1 as U,F as dt,R as Nt,Z as K,G as Ct}from"./entry.832a1cf2.js";import{i as Z}from"./types.8eace398.js";const Dt={[ht]:"deltaX",[mt]:"deltaY"},Wt=({atEndEdge:r,atStartEdge:d,layout:S},L)=>{let R,h=0;const v=c=>c<0&&d.value||c>0&&r.value;return{hasReachedEdge:v,onWheel:c=>{It(R);const O=c[Dt[S.value]];v(h)&&v(h+O)||(h+=O,Lt()||c.preventDefault(),R=xt(()=>{L(h),h=0}))}}},kt=({name:r,getOffset:d,getItemSize:S,getItemOffset:L,getEstimatedTotalSize:R,getStartIndexForOffset:h,getStopIndexForStartIndex:v,initCache:g,clearCache:c,validateProps:O})=>bt({name:r!=null?r:"ElVirtualList",props:St,emits:[nt,ct],setup(e,{emit:m,expose:E}){O(e);const j=Nt(),N=_t("vl"),M=W(g(e,j)),C=vt(),b=W(),k=W(),$=W(),n=W({isScrolling:!1,scrollDir:"forward",scrollOffset:Z(e.initScrollOffset)?e.initScrollOffset:0,updateRequested:!1,isScrollbarDragging:!1,scrollbarAlwaysOn:e.scrollbarAlwaysOn}),H=w(()=>{const{total:t,cache:s}=e,{isScrolling:l,scrollDir:u,scrollOffset:a}=o(n);if(t===0)return[0,0,0,0];const i=h(e,a,o(M)),f=v(e,i,a,o(M)),z=!l||u===Tt?Math.max(1,s):1,F=!l||u===wt?Math.max(1,s):1;return[Math.max(0,i-z),Math.max(0,Math.min(t-1,f+F)),i,f]}),T=w(()=>R(e,o(M))),y=w(()=>st(e.layout)),X=w(()=>[{position:"relative",[`overflow-${y.value?"x":"y"}`]:"scroll",WebkitOverflowScrolling:"touch",willChange:"transform"},{direction:e.direction,height:Z(e.height)?`${e.height}px`:e.height,width:Z(e.width)?`${e.width}px`:e.width},e.style]),Y=w(()=>{const t=o(T),s=o(y);return{height:s?"100%":`${t}px`,pointerEvents:o(n).isScrolling?"none":void 0,width:s?`${t}px`:"100%"}}),I=w(()=>y.value?e.width:e.height),{onWheel:J}=Wt({atStartEdge:w(()=>n.value.scrollOffset<=0),atEndEdge:w(()=>n.value.scrollOffset>=T.value),layout:w(()=>e.layout)},t=>{var s,l;(l=(s=$.value).onMouseUp)==null||l.call(s),x(Math.min(n.value.scrollOffset+t,T.value-I.value))}),G=()=>{const{total:t}=e;if(t>0){const[a,i,f,z]=o(H);m(nt,a,i,f,z)}const{scrollDir:s,scrollOffset:l,updateRequested:u}=o(n);m(ct,s,l,u)},V=t=>{const{clientHeight:s,scrollHeight:l,scrollTop:u}=t.currentTarget,a=o(n);if(a.scrollOffset===u)return;const i=Math.max(0,Math.min(u,l-s));n.value={...a,isScrolling:!0,scrollDir:et(a.scrollOffset,i),scrollOffset:i,updateRequested:!1},K(D)},Q=t=>{const{clientWidth:s,scrollLeft:l,scrollWidth:u}=t.currentTarget,a=o(n);if(a.scrollOffset===l)return;const{direction:i}=e;let f=l;if(i===tt)switch(rt()){case it:{f=-l;break}case Rt:{f=u-s-l;break}}f=Math.max(0,Math.min(f,u-s)),n.value={...a,isScrolling:!0,scrollDir:et(a.scrollOffset,f),scrollOffset:f,updateRequested:!1},K(D)},p=t=>{o(y)?Q(t):V(t),G()},q=(t,s)=>{const l=(T.value-I.value)/s*t;x(Math.min(T.value-I.value,l))},x=t=>{t=Math.max(t,0),t!==o(n).scrollOffset&&(n.value={...o(n),scrollOffset:t,scrollDir:et(o(n).scrollOffset,t),updateRequested:!0},K(D))},A=(t,s=lt)=>{const{scrollOffset:l}=o(n);t=Math.max(0,Math.min(t,e.total-1)),x(d(e,t,s,l,o(M)))},B=t=>{const{direction:s,itemSize:l,layout:u}=e,a=C.value(c&&l,c&&u,c&&s);let i;if(Ct(a,String(t)))i=a[t];else{const f=L(e,t,o(M)),z=S(e,t,o(M)),F=o(y),at=s===tt,ot=F?f:0;a[t]=i={position:"absolute",left:at?void 0:`${ot}px`,right:at?`${ot}px`:void 0,top:F?0:`${f}px`,height:F?"100%":`${z}px`,width:F?`${z}px`:"100%"}}return i},D=()=>{n.value.isScrolling=!1,K(()=>{C.value(-1,null,null)})},P=()=>{const t=b.value;t&&(t.scrollTop=0)};At(()=>{if(!zt)return;const{initScrollOffset:t}=e,s=o(b);Z(t)&&s&&(o(y)?s.scrollLeft=t:s.scrollTop=t),G()}),Ft(()=>{const{direction:t,layout:s}=e,{scrollOffset:l,updateRequested:u}=o(n),a=o(b);if(u&&a)if(s===ht)if(t===tt)switch(rt()){case it:{a.scrollLeft=-l;break}case gt:{a.scrollLeft=l;break}default:{const{clientWidth:i,scrollWidth:f}=a;a.scrollLeft=f-i-l;break}}else a.scrollLeft=l;else a.scrollTop=l});const _={ns:N,clientSize:I,estimatedTotalSize:T,windowStyle:X,windowRef:b,innerRef:k,innerStyle:Y,itemsToRender:H,scrollbarRef:$,states:n,getItemStyle:B,onScroll:p,onScrollbarScroll:q,onWheel:J,scrollTo:x,scrollToItem:A,resetScrollTop:P};return E({windowRef:b,innerRef:k,getItemStyleCache:C,scrollTo:x,scrollToItem:A,resetScrollTop:P,states:n}),_},render(e){var m;const{$slots:E,className:j,clientSize:N,containerElement:M,data:C,getItemStyle:b,innerElement:k,itemsToRender:$,innerStyle:n,layout:H,total:T,onScroll:y,onScrollbarScroll:X,onWheel:Y,states:I,useIsScrolling:J,windowStyle:G,ns:V}=e,[Q,p]=$,q=ut(M),x=ut(k),A=[];if(T>0)for(let _=Q;_<=p;_++)A.push((m=E.default)==null?void 0:m.call(E,{data:C,key:_,index:_,isScrolling:J?I.isScrolling:void 0,style:b(_)}));const B=[U(x,{style:n,ref:"innerRef"},dt(x)?A:{default:()=>A})],D=U(Ot,{ref:"scrollbarRef",clientSize:N,layout:H,onScroll:X,ratio:N*100/this.estimatedTotalSize,scrollFrom:I.scrollOffset/(this.estimatedTotalSize-N),total:T}),P=U(q,{class:[V.e("window"),j],style:G,onScroll:y,onWheel:Y,ref:"windowRef",key:0},dt(q)?[B]:{default:()=>[B]});return U("div",{key:0,class:[V.e("wrapper"),I.scrollbarAlwaysOn?"always-on":""]},[P,D])}}),Bt=kt({name:"ElFixedSizeList",getItemOffset:({itemSize:r},d)=>d*r,getItemSize:({itemSize:r})=>r,getEstimatedTotalSize:({total:r,itemSize:d})=>d*r,getOffset:({height:r,total:d,itemSize:S,layout:L,width:R},h,v,g)=>{const c=st(L)?R:r,O=Math.max(0,d*S-c),e=Math.min(O,h*S),m=Math.max(0,(h+1)*S-c);switch(v===yt&&(g>=m-c&&g<=e+c?v=lt:v=ft),v){case Mt:return e;case Et:return m;case ft:{const E=Math.round(m+(e-m)/2);return E<Math.ceil(c/2)?0:E>O+Math.floor(c/2)?O:E}case lt:default:return g>=m&&g<=e?g:g<m?m:e}},getStartIndexForOffset:({total:r,itemSize:d},S)=>Math.max(0,Math.min(r-1,Math.floor(S/d))),getStopIndexForStartIndex:({height:r,total:d,itemSize:S,layout:L,width:R},h,v)=>{const g=h*S,c=st(L)?R:r,O=Math.ceil((c+v-g)/S);return Math.max(0,Math.min(d-1,h+O-1))},initCache(){},clearCache:!0,validateProps(){}});export{Bt as F,kt as c};