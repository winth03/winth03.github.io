import{ElAvatar as z}from"./index.7ab104fb.js";import{ElCol as D}from"./index.86ef8a45.js";import{ElText as F}from"./index.1add964a.js";import{ElRow as S}from"./index.7077bfb6.js";import{ElButton as A}from"./index.f0aadd2f.js";import{ElCard as B}from"./index.659e957b.js";/* empty css             *//* empty css                       *//* empty css                *//* empty css                  */import{u as s,h as G,ai as I,a as V,o as H,c as N,w as r,v as o,m as y,t as f,s as d,am as O,an as R}from"./entry.832a1cf2.js";import{h as T}from"./index.a1ccab73.js";import{u as $}from"./asyncData.dce5d7ee.js";import"./index.45f48a28.js";import"./runtime.781c1752.js";import"./plugin-vue_export-helper.b0b5f2d9.js";import"./types.8eace398.js";import"./style.799baba7.js";import"./install.13f627c7.js";import"./size.007424cf.js";import"./icon.663f0749.js";import"./index.b2143f7d.js";import"./typescript.c44ade1c.js";import"./constants.7d541f3d.js";import"./use-form-common-props.ec5a7000.js";import"./constants.e2ce9b61.js";import"./index.86aa0141.js";import"./index.cbc3748d.js";import"./use-global-config.2ea59d22.js";import"./index.ee071e53.js";import"./get.070bcf83.js";import"./_baseGet.57648035.js";import"./isArray.3fa80ba1.js";import"./isObject.5a18b265.js";import"./index.bb99bec3.js";import"./objects.1e9cc2c5.js";import"./_baseSet.39436bc7.js";import"./_defineProperty.f71786e5.js";import"./_isIndex.f5af1eca.js";import"./use-form-item.e7df070b.js";import"./index.3e0aacb0.js";function j(t,a,e){const[n={},l]=typeof a=="string"?[{},a]:[a,e],i=n.key||T([l,s(n.baseURL),typeof t=="string"?t:"",s(n.params)]);if(!i||typeof i!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+i);if(!t)throw new Error("[nuxt] [useFetch] request is missing.");const u=i===l?"$f"+i:i,p=G(()=>{let m=t;return typeof m=="function"&&(m=m()),s(m)}),{server:_,lazy:h,default:g,transform:w,pick:x,watch:k,immediate:E,...C}=n,b=I({...C,cache:typeof n.cache=="boolean"?void 0:n.cache}),L={server:_,lazy:h,default:g,transform:w,pick:x,immediate:E,watch:[b,p,...k||[]]};let c;return $(u,()=>{var m;return(m=c==null?void 0:c.abort)==null||m.call(c),c=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:c.signal,...b})},L)}function K(t,a,e){const[n,l]=typeof a=="string"?[{},a]:[a,e];return j(t,{...n,lazy:!0},l)}const v=t=>(O("data-v-e0f77d02"),t=t(),R(),t),q=v(()=>y("br",null,null,-1)),M=v(()=>y("br",null,null,-1)),P={__name:"GitHubCard",props:{username:{type:String,required:!0}},setup(t){const{username:a}=t,{data:e}=K("/api/user",{query:{username:a},default:()=>({login:"Loading...",name:"Loading...",bio:"Loading...",public_repos:"Loading...",avatar_url:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",html_url:""})},"$e13lZmtf1G");return(n,l)=>{const i=z,u=D,p=F,_=S,h=A,g=B;return H(),N(g,null,{default:r(()=>[o(_,{align:"middle",gutter:20},{default:r(()=>[o(u,{span:6},{default:r(()=>[o(i,{shape:"circle",size:"large",src:s(e).avatar_url},null,8,["src"])]),_:1}),o(u,{span:18},{default:r(()=>[y("h2",null,f(s(e).name),1),o(p,{type:"info",tag:"b"},{default:r(()=>[d(f(s(e).login),1)]),_:1}),q,o(p,null,{default:r(()=>[d("Public Repositories: "+f(s(e).public_repos),1)]),_:1}),M,o(p,null,{default:r(()=>[d(f(s(e).bio),1)]),_:1})]),_:1})]),_:1}),o(_,{justify:"center"},{default:r(()=>[o(h,{type:"primary",tag:"a",target:"_blank",href:s(e).html_url},{default:r(()=>[o(i,{size:"small",src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"}),o(p,null,{default:r(()=>[d("View on GitHub")]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})}}},Vt=V(P,[["__scopeId","data-v-e0f77d02"]]);export{Vt as default};