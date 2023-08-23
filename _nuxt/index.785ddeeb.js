import{aq as E,I as S,ar as B,as as V,b as v,e as _,at as L,au as x,av as T,aw as $,h as z,R as j,ax as H,ay as M}from"./entry.b33cb278.js";function y(e){var t;const n=E(e);return(t=n==null?void 0:n.$el)!=null?t:n}const I=S?window:void 0,D=S?window.document:void 0;S&&window.navigator;S&&window.location;function h(...e){let t,n,i,c;if(L(e[0])||Array.isArray(e[0])?([n,i,c]=e,t=I):[t,n,i,c]=e,!t)return V;Array.isArray(n)||(n=[n]),Array.isArray(i)||(i=[i]);const f=[],o=()=>{f.forEach(d=>d()),f.length=0},r=(d,m,s,a)=>(d.addEventListener(m,s,a),()=>d.removeEventListener(m,s,a)),u=_(()=>[y(t),E(c)],([d,m])=>{o(),d&&f.push(...n.flatMap(s=>i.map(a=>r(d,s,a,m))))},{immediate:!0,flush:"post"}),p=()=>{u(),o()};return $(p),p}let R=!1;function ie(e,t,n={}){const{window:i=I,ignore:c=[],capture:f=!0,detectIframe:o=!1}=n;if(!i)return;B&&!R&&(R=!0,Array.from(i.document.body.children).forEach(s=>s.addEventListener("click",V)));let r=!0;const u=s=>c.some(a=>{if(typeof a=="string")return Array.from(i.document.querySelectorAll(a)).some(l=>l===s.target||s.composedPath().includes(l));{const l=y(a);return l&&(s.target===l||s.composedPath().includes(l))}}),d=[h(i,"click",s=>{const a=y(e);if(!(!a||a===s.target||s.composedPath().includes(a))){if(s.detail===0&&(r=!u(s)),!r){r=!0;return}t(s)}},{passive:!0,capture:f}),h(i,"pointerdown",s=>{const a=y(e);a&&(r=!s.composedPath().includes(a)&&!u(s))},{passive:!0}),o&&h(i,"blur",s=>{var a;const l=y(e);((a=i.document.activeElement)==null?void 0:a.tagName)==="IFRAME"&&!(l!=null&&l.contains(i.document.activeElement))&&t(s)})].filter(Boolean);return()=>d.forEach(s=>s())}function J(e,t=!1){const n=v(),i=()=>n.value=Boolean(e());return i(),x(i,t),n}function U(e){return JSON.parse(JSON.stringify(e))}const C=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},N="__vueuse_ssr_handlers__";C[N]=C[N]||{};C[N];function se(e,t,{window:n=I,initialValue:i=""}={}){const c=v(i),f=z(()=>{var o;return y(t)||((o=n==null?void 0:n.document)==null?void 0:o.documentElement)});return _([f,()=>E(e)],([o,r])=>{var u;if(o&&n){const p=(u=n.getComputedStyle(o).getPropertyValue(r))==null?void 0:u.trim();c.value=p||i}},{immediate:!0}),_(c,o=>{var r;(r=f.value)!=null&&r.style&&f.value.style.setProperty(E(e),o)}),c}function oe({document:e=D}={}){if(!e)return v("visible");const t=v(e.visibilityState);return h(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var W=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,K=(e,t)=>{var n={};for(var i in e)q.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&W)for(var i of W(e))t.indexOf(i)<0&&G.call(e,i)&&(n[i]=e[i]);return n};function X(e,t,n={}){const i=n,{window:c=I}=i,f=K(i,["window"]);let o;const r=J(()=>c&&"ResizeObserver"in c),u=()=>{o&&(o.disconnect(),o=void 0)},p=_(()=>y(e),m=>{u(),r.value&&c&&m&&(o=new ResizeObserver(t),o.observe(m,f))},{immediate:!0,flush:"post"}),d=()=>{u(),p()};return $(d),{isSupported:r,stop:d}}function re(e,t={}){const{reset:n=!0,windowResize:i=!0,windowScroll:c=!0,immediate:f=!0}=t,o=v(0),r=v(0),u=v(0),p=v(0),d=v(0),m=v(0),s=v(0),a=v(0);function l(){const b=y(e);if(!b){n&&(o.value=0,r.value=0,u.value=0,p.value=0,d.value=0,m.value=0,s.value=0,a.value=0);return}const O=b.getBoundingClientRect();o.value=O.height,r.value=O.bottom,u.value=O.left,p.value=O.right,d.value=O.top,m.value=O.width,s.value=O.x,a.value=O.y}return X(e,l),_(()=>y(e),b=>!b&&l()),c&&h("scroll",l,{capture:!0,passive:!0}),i&&h("resize",l,{passive:!0}),x(()=>{f&&l()}),{height:o,bottom:r,left:u,right:p,top:d,width:m,x:s,y:a,update:l}}var A;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(A||(A={}));var Y=Object.defineProperty,Q=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,F=(e,t,n)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ee=(e,t)=>{for(var n in t||(t={}))Z.call(t,n)&&F(e,n,t[n]);if(Q)for(var n of Q(t))k.call(t,n)&&F(e,n,t[n]);return e};const te={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};ee({linear:T},te);function ae(e,t,n,i={}){var c,f,o;const{clone:r=!1,passive:u=!1,eventName:p,deep:d=!1,defaultValue:m}=i,s=j(),a=n||(s==null?void 0:s.emit)||((c=s==null?void 0:s.$emit)==null?void 0:c.bind(s))||((o=(f=s==null?void 0:s.proxy)==null?void 0:f.$emit)==null?void 0:o.bind(s==null?void 0:s.proxy));let l=p;t||(t="modelValue"),l=p||l||`update:${t.toString()}`;const b=g=>r?H(r)?r(g):U(g):g,O=()=>M(e[t])?b(e[t]):m;if(u){const g=O(),P=v(g);return _(()=>e[t],w=>P.value=b(w)),_(P,w=>{(w!==e[t]||d)&&a(l,w)},{deep:d}),P}else return z({get(){return O()},set(g){a(l,g)}})}function ue({window:e=I}={}){if(!e)return v(!1);const t=v(e.document.hasFocus());return h(e,"blur",()=>{t.value=!1}),h(e,"focus",()=>{t.value=!0}),t}function le(e={}){const{window:t=I,initialWidth:n=1/0,initialHeight:i=1/0,listenOrientation:c=!0,includeScrollbar:f=!0}=e,o=v(n),r=v(i),u=()=>{t&&(f?(o.value=t.innerWidth,r.value=t.innerHeight):(o.value=t.document.documentElement.clientWidth,r.value=t.document.documentElement.clientHeight))};return u(),x(u),h("resize",u,{passive:!0}),c&&h("orientationchange",u,{passive:!0}),{width:o,height:r}}export{y as a,h as b,oe as c,ue as d,le as e,re as f,se as g,ae as h,ie as o,X as u};
