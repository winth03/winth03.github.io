import{D as u,az as o,L as t,aA as A,G as S,J as s}from"./entry.b33cb278.js";var N=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(N||{});function f(e){return o(e)&&e.type===t}function i(e){return o(e)&&e.type===A}function _(e){return o(e)&&!f(e)&&!i(e)}const m=e=>{if(!o(e))return{};const T=e.props||{},E=(o(e.type)?e.type.props:void 0)||{},r={};return Object.keys(E).forEach(n=>{S(E[n],"default")&&(r[n]=E[n].default)}),Object.keys(T).forEach(n=>{r[s(n)]=T[n]}),r},D=e=>{if(!u(e)||e.length>1)throw new Error("expect to receive a single Vue element child");return e[0]},p=e=>{const T=u(e)?e:[e],E=[];return T.forEach(r=>{var n;u(r)?E.push(...p(r)):o(r)&&u(r.children)?E.push(...p(r.children)):(E.push(r),o(r)&&((n=r.component)==null?void 0:n.subTree)&&E.push(...p(r.component.subTree)))}),E};export{N as P,_ as a,D as e,p as f,m as g,f as i};
