import{X as m,_ as p}from"./entry.832a1cf2.js";import{h as o}from"./index.a1ccab73.js";import{q as f,e as g,j as c}from"./query.54a76827.js";import{w as s,s as h}from"./utils.b9f6a55f.js";import{u as v}from"./preview.3d2d2b98.js";const j=async t=>{const{content:n}=m().public;typeof(t==null?void 0:t.params)!="function"&&(t=f(t));const a=t.params(),i=n.experimental.stripQueryParameters?s(`/navigation/${`${o(a)}.${n.integrity}`}/${g(a)}.json`):s(`/navigation/${o(a)}.${n.integrity}.json`);if(h())return(await p(()=>import("./client-db.f4adbd9b.js"),["./client-db.f4adbd9b.js","./entry.832a1cf2.js","./entry.a20ff24b.css","./query.54a76827.js","./index.a1ccab73.js","./utils.b9f6a55f.js","./preview.3d2d2b98.js","./index.68c44503.js","./_commonjsHelpers.eecb6206.js"],import.meta.url).then(r=>r.generateNavigation))(a);const e=await $fetch(i,{method:"GET",responseType:"json",params:n.experimental.stripQueryParameters?void 0:{_params:c(a),previewToken:v().getPreviewToken()}});if(typeof e=="string"&&e.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return e};export{j as f};