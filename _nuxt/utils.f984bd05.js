import{d as o}from"./dayjs.min.6a4959ec.js";import{aV as i,D as c}from"./entry.832a1cf2.js";import{f as u}from"./types.8eace398.js";const p=(r,t)=>[r>0?r-1:void 0,r,r<t?r+1:void 0],y=r=>Array.from(Array.from({length:r}).keys()),W=r=>r.replace(/\W?m{1,2}|\W?ZZ/g,"").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi,"").trim(),g=r=>r.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g,"").trim(),l=function(r,t){const s=i(r),e=i(t);return s&&e?r.getTime()===t.getTime():!s&&!e?r===t:!1},D=function(r,t){const s=c(r),e=c(t);return s&&e?r.length!==t.length?!1:r.every((a,n)=>l(a,t[n])):!s&&!e?l(r,t):!1},A=function(r,t,s){const e=u(t)||t==="x"?o(r).locale(s):o(r,t).locale(s);return e.isValid()?e:void 0},v=function(r,t,s){return u(t)?r:t==="x"?+r:o(r).locale(s).format(t)},x=(r,t)=>{var s;const e=[],a=t==null?void 0:t();for(let n=0;n<r;n++)e.push((s=a==null?void 0:a.includes(n))!=null?s:!1);return e};export{W as a,p as b,l as d,g as e,v as f,x as m,A as p,y as r,D as v};