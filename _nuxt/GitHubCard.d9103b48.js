import{ElAvatar as S}from"./index.878fb667.js";import{ElCol as z}from"./index.1b530fa6.js";import{ElText as D}from"./index.a2767b82.js";import{ElRow as F}from"./index.d5d00e77.js";import{ElButton as I}from"./index.cd370c59.js";import{ElCard as A}from"./index.0f4f8728.js";/* empty css             */import"./client-only.901f87fd.js";/* empty css                *//* empty css                  */import{u as s,k as B,M as G,J as V,o as H,c as N,L as r,S as o,I as y,Q as f,U as d,a0 as O,a1 as R}from"./entry.40f94ce2.js";import{h as T}from"./index.a1ccab73.js";import{u as $}from"./asyncData.897387d5.js";import"./index.52232a07.js";import"./runtime.a8d5aa72.js";import"./plugin-vue_export-helper.b0b5f2d9.js";import"./types.0ffe2429.js";import"./style.a7bf22e4.js";import"./install.db378abc.js";import"./size.007424cf.js";import"./icon.aaa9d058.js";import"./index.e0b44930.js";import"./typescript.c44ade1c.js";import"./constants.7d541f3d.js";import"./use-form-common-props.c0d2009e.js";import"./constants.e2ce9b61.js";import"./index.f72caa6f.js";import"./index.d26d92fd.js";import"./use-global-config.be3c3615.js";import"./index.b1f4efad.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./index.1eb5ee59.js";import"./objects.1e9cc2c5.js";import"./_baseSet.39436bc7.js";import"./_defineProperty.f71786e5.js";import"./_isIndex.f5af1eca.js";import"./use-form-item.eeb4683c.js";import"./index.3e0aacb0.js";function j(t,a,e){const[n={},u]=typeof a=="string"?[{},a]:[a,e],i=n.key||T([u,s(n.baseURL),typeof t=="string"?t:"",s(n.params)]);if(!i||typeof i!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+i);if(!t)throw new Error("[nuxt] [useFetch] request is missing.");const m=i===u?"$f"+i:i,p=B(()=>{let l=t;return typeof l=="function"&&(l=l()),s(l)}),{server:_,lazy:h,default:g,transform:w,pick:k,watch:x,immediate:E,...L}=n,b=G({...L,cache:typeof n.cache=="boolean"?void 0:n.cache}),C={server:_,lazy:h,default:g,transform:w,pick:k,immediate:E,watch:[b,p,...x||[]]};let c;return $(m,()=>{var l;return(l=c==null?void 0:c.abort)==null||l.call(c),c=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:c.signal,...b})},C)}function K(t,a,e){const[n,u]=typeof a=="string"?[{},a]:[a,e];return j(t,{...n,lazy:!0},u)}const v=t=>(O("data-v-4c204a55"),t=t(),R(),t),M=v(()=>y("br",null,null,-1)),U=v(()=>y("br",null,null,-1)),q={__name:"GitHubCard",props:{username:{type:String,required:!0}},setup(t){const{username:a}=t,{data:e}=K("/api/user",{query:{username:a},default:()=>({login:"Loading...",name:"Loading...",bio:"Loading...",public_repos:"Loading...",avatar_url:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",html_url:""})},"$e13lZmtf1G");return(n,u)=>{const i=S,m=z,p=D,_=F,h=I,g=A;return H(),N(g,null,{default:r(()=>[o(_,{align:"middle",gutter:20},{default:r(()=>[o(m,{span:6},{default:r(()=>[o(i,{shape:"circle",size:"large",src:s(e).avatar_url},null,8,["src"])]),_:1}),o(m,{span:18},{default:r(()=>[y("h2",null,f(s(e).name),1),o(p,{type:"info",tag:"b"},{default:r(()=>[d(f(s(e).login),1)]),_:1}),M,o(p,null,{default:r(()=>[d("Public Repositories: "+f(s(e).public_repos),1)]),_:1}),U,o(p,null,{default:r(()=>[d(f(s(e).bio),1)]),_:1})]),_:1})]),_:1}),o(_,{justify:"center"},{default:r(()=>[o(h,{type:"info",tag:"a",target:"_blank",href:s(e).html_url},{default:r(()=>[o(i,{size:"small",src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"}),o(p,null,{default:r(()=>[d("View on GitHub")]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})}}},Vt=V(q,[["__scopeId","data-v-4c204a55"]]);export{Vt as default};
