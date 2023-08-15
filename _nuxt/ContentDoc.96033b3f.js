import{u as h,a as g,w,b as y,e as C,f as v,h as D,i as S,j as r}from"./entry.2b8377c6.js";import{u as _}from"./composables.2f0bef69.js";import b from"./ContentRenderer.9cdde653.js";import q from"./ContentQuery.d1e83d82.js";import"./ContentRendererMarkdown.9e950119.js";import"./index.68c44503.js";import"./preview.cba1ccb5.js";import"./asyncData.ecc04f9f.js";import"./index.a1ccab73.js";import"./query.4b884764.js";import"./utils.f7efdc55.js";const a=(p,e=y())=>{const s=h(p),u=g();w(()=>h(p),(t=s)=>{if(!e.path||!t)return;const n=Object.assign({},(t==null?void 0:t.head)||{});n.meta=[...n.meta||[]],n.link=[...n.link||[]];const m=n.title||(t==null?void 0:t.title);m&&(n.title=m),u.public.content.host;const f=(n==null?void 0:n.description)||(t==null?void 0:t.description);f&&n.meta.filter(i=>i.name==="description").length===0&&n.meta.push({name:"description",content:f}),n!=null&&n.image||(t==null||t.image),C(()=>_(n))},{immediate:!0})},P=v({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(p){const e=D(),{tag:s,excerpt:u,path:c,query:t,head:n}=p,m={...t||{},path:c||(t==null?void 0:t.path)||S(y().path),find:"one"},f=(i,o)=>r("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:i,data:o},null,2));return r(q,m,{default:e!=null&&e.default?({data:i,refresh:o,isPartial:d})=>{var l;return n&&a(i),(l=e.default)==null?void 0:l.call(e,{doc:i,refresh:o,isPartial:d,excerpt:u,...this.$attrs})}:({data:i})=>(n&&a(i),r(b,{value:i,excerpt:u,tag:s,...this.$attrs},{empty:o=>e!=null&&e.empty?e.empty(o):f("default",i)})),empty:i=>{var o;return((o=e==null?void 0:e.empty)==null?void 0:o.call(e,i))||r("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":i=>{var o;return((o=e==null?void 0:e["not-found"])==null?void 0:o.call(e,i))||r("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}});export{P as default};
