import{r as u}from"./constants.7d541f3d.js";import{r as J}from"./constants.7d541f3d.js";import{b as c}from"./runtime.7bbd0ea7.js";import{_ as m}from"./plugin-vue_export-helper.b0b5f2d9.js";import{i as a,f,h as o,p as g,o as w,c as y,w as d,r as _,k as v,u as r,Q as b,O as h}from"./entry.7f953a48.js";import{w as x}from"./install.eb991fcc.js";const C=["start","center","end","space-around","space-between","space-evenly"],R=["top","middle","bottom"],k=c({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:C,default:"start"},align:{type:String,values:R}}),S=a({name:"ElRow"}),j=a({...S,props:k,setup(n){const t=n,s=f("row"),l=o(()=>t.gutter);g(u,{gutter:l});const i=o(()=>{const e={};return t.gutter&&(e.marginRight=e.marginLeft=`-${t.gutter/2}px`),e}),p=o(()=>[s.b(),s.is(`justify-${t.justify}`,t.justify!=="start"),s.is(`align-${t.align}`,!!t.align)]);return(e,K)=>(w(),y(h(e.tag),{class:v(r(p)),style:b(r(i))},{default:d(()=>[_(e.$slots,"default")]),_:3},8,["class","style"]))}});var $=m(j,[["__file","/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);const A=x($);export{A as ElRow,R as RowAlign,C as RowJustify,A as default,J as rowContextKey,k as rowProps};