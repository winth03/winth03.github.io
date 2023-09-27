import{b as m,e as S,Y as l}from"./entry.832a1cf2.js";const g=decodeURIComponent,y=encodeURIComponent,h=/; */,c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function T(e,i){if(typeof e!="string")throw new TypeError("argument str must be a string");let r={},t=i||{},n=e.split(h),u=t.decode||g;for(let o=0;o<n.length;o++){let s=n[o],f=s.indexOf("=");if(f<0)continue;let d=s.substr(0,f).trim(),a=s.substr(++f,s.length).trim();a[0]=='"'&&(a=a.slice(1,-1)),r[d]==null&&(r[d]=x(a,u))}return r}function w(e,i,r){let t=r||{},n=t.encode||y;if(typeof n!="function")throw new TypeError("option encode is invalid");if(!c.test(e))throw new TypeError("argument name is invalid");let u=n(i);if(u&&!c.test(u))throw new TypeError("argument val is invalid");let o=e+"="+u;if(t.maxAge!=null){let s=t.maxAge-0;if(isNaN(s)||!isFinite(s))throw new TypeError("option maxAge is invalid");o+="; Max-Age="+Math.floor(s)}if(t.domain){if(!c.test(t.domain))throw new TypeError("option domain is invalid");o+="; Domain="+t.domain}if(t.path){if(!c.test(t.path))throw new TypeError("option path is invalid");o+="; Path="+t.path}if(t.expires){if(typeof t.expires.toUTCString!="function")throw new TypeError("option expires is invalid");o+="; Expires="+t.expires.toUTCString()}if(t.httpOnly&&(o+="; HttpOnly"),t.secure&&(o+="; Secure"),t.sameSite)switch(typeof t.sameSite=="string"?t.sameSite.toLowerCase():t.sameSite){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return o}function x(e,i){try{return i(e)}catch{return e}}const k=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,v=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,C=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function E(e,i){if(e!=="__proto__"&&!(e==="constructor"&&i&&typeof i=="object"&&"prototype"in i))return i}function b(e,i={}){if(typeof e!="string")return e;const r=e.toLowerCase().trim();if(r==="true")return!0;if(r==="false")return!1;if(r==="null")return null;if(r==="nan")return Number.NaN;if(r==="infinity")return Number.POSITIVE_INFINITY;if(r!=="undefined"){if(!C.test(e)){if(i.strict)throw new SyntaxError("Invalid JSON");return e}try{return k.test(e)||v.test(e)?JSON.parse(e,E):JSON.parse(e)}catch(t){if(i.strict)throw t;return e}}}const I={path:"/",decode:e=>b(decodeURIComponent(e)),encode:e=>encodeURIComponent(typeof e=="string"?e:JSON.stringify(e))};function p(e,i){var u,o;const r={...I,...i},t=N(r)||{},n=m((o=t[e])!=null?o:(u=r.default)==null?void 0:u.call(r));return S(n,()=>{O(e,n.value,r)}),n}function N(e={}){return T(document.cookie,e)}function R(e,i,r={}){return i==null?w(e,i,{...r,maxAge:-1}):w(e,i,r)}function O(e,i,r={}){document.cookie=R(e,i,r)}const _=()=>({isEnabled:()=>{const t=l().query;return Object.prototype.hasOwnProperty.call(t,"preview")&&!t.preview?!1:!!(t.preview||p("previewToken").value||sessionStorage.getItem("previewToken"))},getPreviewToken:()=>p("previewToken").value||sessionStorage.getItem("previewToken")||void 0,setPreviewToken:t=>{p("previewToken").value=t,l().query.preview=t||"",t?sessionStorage.setItem("previewToken",t):sessionStorage.removeItem("previewToken"),window.location.reload()}});export{_ as u};