import{i as e,b as c}from"./types.bb628c62.js";import{F as f,I as u,J as d}from"./entry.b33cb278.js";const o=(t="")=>t.split(" ").filter(s=>!!s.trim()),p=(t,s)=>{if(!t||!s)return!1;if(s.includes(" "))throw new Error("className should not contain space.");return t.classList.contains(s)},y=(t,s)=>{!t||!s.trim()||t.classList.add(...o(s))},g=(t,s)=>{!t||!s.trim()||t.classList.remove(...o(s))},h=(t,s)=>{var a;if(!u||!t||!s)return"";let r=d(s);r==="float"&&(r="cssFloat");try{const i=t.style[r];if(i)return i;const n=(a=document.defaultView)==null?void 0:a.getComputedStyle(t,"");return n?n[r]:""}catch{return t.style[r]}};function C(t,s="px"){if(!t)return"";if(e(t)||c(t))return`${t}${s}`;if(f(t))return t}export{C as a,y as b,h as g,p as h,g as r};
