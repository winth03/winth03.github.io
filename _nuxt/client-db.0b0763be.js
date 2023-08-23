import{a as P,l as T,B as z}from"./entry.40f94ce2.js";import{g as U,a as K,b as E,s as B,c as R,w as W,d as J,f as F}from"./query.19258d9c.js";import{p as H}from"./index.68c44503.js";import{c as b}from"./_commonjsHelpers.eecb6206.js";import{u as D}from"./preview.c8d6eccf.js";import"./index.a1ccab73.js";import"./utils.fcce1b34.js";const q="memory",G=()=>{const e=new Map;return{name:q,options:{},hasItem(t){return e.has(t)},getItem(t){return e.get(t)||null},getItemRaw(t){return e.get(t)||null},setItem(t,n){e.set(t,n)},setItemRaw(t,n){e.set(t,n)},removeItem(t){e.delete(t)},getKeys(){return Array.from(e.keys())},clear(){e.clear()},dispose(){e.clear()}}},k=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,Z=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,V=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function Q(e,t){if(e==="__proto__"||e==="constructor"&&t&&typeof t=="object"&&"prototype"in t){X(e);return}return t}function X(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function $(e,t={}){if(typeof e!="string")return e;const n=e.trim();if(e[0]==='"'&&e[e.length-1]==='"')return n.slice(1,-1);if(n.length<=9){const i=n.toLowerCase();if(i==="true")return!0;if(i==="false")return!1;if(i==="undefined")return;if(i==="null")return null;if(i==="nan")return Number.NaN;if(i==="infinity")return Number.POSITIVE_INFINITY;if(i==="-infinity")return Number.NEGATIVE_INFINITY}if(!V.test(e)){if(t.strict)throw new SyntaxError("[destr] Invalid JSON");return e}try{if(k.test(e)||Z.test(e)){if(t.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(e,Q)}return JSON.parse(e)}catch(i){if(t.strict)throw i;return e}}function ee(e){return!e||typeof e.then!="function"?Promise.resolve(e):e}function g(e,...t){try{return ee(e(...t))}catch(n){return Promise.reject(n)}}function te(e){const t=typeof e;return e===null||t!=="object"&&t!=="function"}function re(e){const t=Object.getPrototypeOf(e);return!t||t.isPrototypeOf(Object)}function _(e){if(te(e))return String(e);if(re(e)||Array.isArray(e))return JSON.stringify(e);if(typeof e.toJSON=="function")return _(e.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function L(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const N="base64:";function ne(e){if(typeof e=="string")return e;L();const t=Buffer.from(e).toString("base64");return N+t}function ie(e){return typeof e!="string"||!e.startsWith(N)?e:(L(),Buffer.from(e.slice(N.length),"base64"))}const se=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function ae(e,t){if(t=A(t),!t)return e;const n={...e};for(const i of se)n[i]=(o="",...u)=>e[i](t+o,...u);return n.getKeys=(i="",...o)=>e.getKeys(t+i,...o).then(u=>u.map(f=>f.slice(t.length))),n}function y(e){return e?e.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function oe(...e){return y(e.join(":"))}function A(e){return e=y(e),e?e+":":""}const ue="memory",ce=()=>{const e=new Map;return{name:ue,options:{},hasItem(t){return e.has(t)},getItem(t){return e.get(t)||null},getItemRaw(t){return e.get(t)||null},setItem(t,n){e.set(t,n)},setItemRaw(t,n){e.set(t,n)},removeItem(t){e.delete(t)},getKeys(){return Array.from(e.keys())},clear(){e.clear()},dispose(){e.clear()}}};function fe(e={}){const t={mounts:{"":e.driver||ce()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=r=>{for(const s of t.mountpoints)if(r.startsWith(s))return{base:s,relativeKey:r.slice(s.length),driver:t.mounts[s]};return{base:"",relativeKey:r,driver:t.mounts[""]}},i=(r,s)=>t.mountpoints.filter(a=>a.startsWith(r)||s&&r.startsWith(a)).map(a=>({relativeBase:r.length>a.length?r.slice(a.length):void 0,mountpoint:a,driver:t.mounts[a]})),o=(r,s)=>{if(!!t.watching){s=y(s);for(const a of t.watchListeners)a(r,s)}},u=async()=>{if(!t.watching){t.watching=!0;for(const r in t.mounts)t.unwatch[r]=await x(t.mounts[r],o,r)}},f=async()=>{if(!!t.watching){for(const r in t.unwatch)await t.unwatch[r]();t.unwatch={},t.watching=!1}},h=(r,s,a)=>{const c=new Map,l=m=>{let d=c.get(m.base);return d||(d={driver:m.driver,base:m.base,items:[]},c.set(m.base,d)),d};for(const m of r){const d=typeof m=="string",v=y(d?m:m.key),w=d?void 0:m.value,I=d||!m.options?s:{...s,...m.options},O=n(v);l(O).items.push({key:v,value:w,relativeKey:O.relativeKey,options:I})}return Promise.all([...c.values()].map(m=>a(m))).then(m=>m.flat())},p={hasItem(r,s={}){r=y(r);const{relativeKey:a,driver:c}=n(r);return g(c.hasItem,a,s)},getItem(r,s={}){r=y(r);const{relativeKey:a,driver:c}=n(r);return g(c.getItem,a,s).then(l=>$(l))},getItems(r,s){return h(r,s,a=>a.driver.getItems?g(a.driver.getItems,a.items.map(c=>({key:c.relativeKey,options:c.options})),s).then(c=>c.map(l=>({key:oe(a.base,l.key),value:$(l.value)}))):Promise.all(a.items.map(c=>g(a.driver.getItem,c.relativeKey,c.options).then(l=>({key:c.key,value:$(l)})))))},getItemRaw(r,s={}){r=y(r);const{relativeKey:a,driver:c}=n(r);return c.getItemRaw?g(c.getItemRaw,a,s):g(c.getItem,a,s).then(l=>ie(l))},async setItem(r,s,a={}){if(s===void 0)return p.removeItem(r);r=y(r);const{relativeKey:c,driver:l}=n(r);!l.setItem||(await g(l.setItem,c,_(s),a),l.watch||o("update",r))},async setItems(r,s){await h(r,s,async a=>{a.driver.setItems&&await g(a.driver.setItems,a.items.map(c=>({key:c.relativeKey,value:_(c.value),options:c.options})),s),a.driver.setItem&&await Promise.all(a.items.map(c=>g(a.driver.setItem,c.relativeKey,_(c.value),c.options)))})},async setItemRaw(r,s,a={}){if(s===void 0)return p.removeItem(r,a);r=y(r);const{relativeKey:c,driver:l}=n(r);if(l.setItemRaw)await g(l.setItemRaw,c,s,a);else if(l.setItem)await g(l.setItem,c,ne(s),a);else return;l.watch||o("update",r)},async removeItem(r,s={}){typeof s=="boolean"&&(s={removeMeta:s}),r=y(r);const{relativeKey:a,driver:c}=n(r);!c.removeItem||(await g(c.removeItem,a,s),(s.removeMeta||s.removeMata)&&await g(c.removeItem,a+"$",s),c.watch||o("remove",r))},async getMeta(r,s={}){typeof s=="boolean"&&(s={nativeOnly:s}),r=y(r);const{relativeKey:a,driver:c}=n(r),l=Object.create(null);if(c.getMeta&&Object.assign(l,await g(c.getMeta,a,s)),!s.nativeOnly){const m=await g(c.getItem,a+"$",s).then(d=>$(d));m&&typeof m=="object"&&(typeof m.atime=="string"&&(m.atime=new Date(m.atime)),typeof m.mtime=="string"&&(m.mtime=new Date(m.mtime)),Object.assign(l,m))}return l},setMeta(r,s,a={}){return this.setItem(r+"$",s,a)},removeMeta(r,s={}){return this.removeItem(r+"$",s)},async getKeys(r,s={}){r=A(r);const a=i(r,!0);let c=[];const l=[];for(const m of a){const v=(await g(m.driver.getKeys,m.relativeBase,s)).map(w=>m.mountpoint+y(w)).filter(w=>!c.some(I=>w.startsWith(I)));l.push(...v),c=[m.mountpoint,...c.filter(w=>!w.startsWith(m.mountpoint))]}return r?l.filter(m=>m.startsWith(r)&&!m.endsWith("$")):l.filter(m=>!m.endsWith("$"))},async clear(r,s={}){r=A(r),await Promise.all(i(r,!1).map(async a=>{if(a.driver.clear)return g(a.driver.clear,a.relativeBase,s);if(a.driver.removeItem){const c=await a.driver.getKeys(a.relativeBase||"",s);return Promise.all(c.map(l=>a.driver.removeItem(l,s)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(r=>C(r)))},async watch(r){return await u(),t.watchListeners.push(r),async()=>{t.watchListeners=t.watchListeners.filter(s=>s!==r),t.watchListeners.length===0&&await f()}},async unwatch(){t.watchListeners=[],await f()},mount(r,s){if(r=A(r),r&&t.mounts[r])throw new Error(`already mounted at ${r}`);return r&&(t.mountpoints.push(r),t.mountpoints.sort((a,c)=>c.length-a.length)),t.mounts[r]=s,t.watching&&Promise.resolve(x(s,o,r)).then(a=>{t.unwatch[r]=a}).catch(console.error),p},async unmount(r,s=!0){r=A(r),!(!r||!t.mounts[r])&&(t.watching&&r in t.unwatch&&(t.unwatch[r](),delete t.unwatch[r]),s&&await C(t.mounts[r]),t.mountpoints=t.mountpoints.filter(a=>a!==r),delete t.mounts[r])},getMount(r=""){r=y(r)+":";const s=n(r);return{driver:s.driver,base:s.base}},getMounts(r="",s={}){return r=y(r),i(r,s.parents).map(c=>({driver:c.driver,base:c.mountpoint}))}};return p}function x(e,t,n){return e.watch?e.watch((i,o)=>t(i,n+o)):()=>{}}async function C(e){typeof e.dispose=="function"&&await g(e.dispose)}function le(e={}){const t=me(n,e.operators);function n(i,o){return typeof o!="object"||o instanceof RegExp?t.$eq(i,o):Object.keys(o||{}).every(u=>{const f=o[u];if(u.startsWith("$")&&t[u]){const h=t[u];return typeof h=="function"?h(i,f):!1}return n(U(i,u),f)})}return n}function me(e,t={}){return{$match:(n,i)=>e(n,i),$eq:(n,i)=>i instanceof RegExp?i.test(n):n===i,$ne:(n,i)=>i instanceof RegExp?!i.test(n):n!==i,$not:(n,i)=>!e(n,i),$and:(n,i)=>(K(i,"$and requires an array as condition"),i.every(o=>e(n,o))),$or:(n,i)=>(K(i,"$or requires an array as condition"),i.some(o=>e(n,o))),$in:(n,i)=>E(i).some(o=>Array.isArray(n)?e(n,{$contains:o}):e(n,o)),$contains:(n,i)=>(n=Array.isArray(n)?n:String(n),E(i).every(o=>n.includes(o))),$icontains:(n,i)=>{if(typeof i!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),E(i).every(o=>n.includes(o.toLocaleLowerCase()))},$containsAny:(n,i)=>(K(i,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),i.some(o=>n.includes(o))),$exists:(n,i)=>i?typeof n<"u":typeof n>"u",$type:(n,i)=>typeof n===String(i),$regex:(n,i)=>{if(!(i instanceof RegExp)){const o=String(i).match(/\/(.*)\/([dgimsuy]*)$/);i=o?new RegExp(o[1],o[2]||""):new RegExp(i)}return i.test(String(n||""))},$lt:(n,i)=>n<i,$lte:(n,i)=>n<=i,$gt:(n,i)=>n>i,$gte:(n,i)=>n>=i,...t||{}}}function M(e){const t=le(),n=(o,{query:u,before:f,after:h})=>{const p=typeof u=="string"?{_path:u}:u,r=o.findIndex(a=>t(a,p));f=f!=null?f:1,h=h!=null?h:1;const s=new Array(f+h).fill(null,0);return r===-1?s:s.map((a,c)=>o[r-f+c+Number(c>=f)]||null)},i=[(o,u)=>o.filter(f=>E(u.where).every(h=>t(f,h))),(o,u)=>E(u.sort).forEach(f=>B(o,f)),(o,u)=>u.surround?n(o,u.surround):o,(o,u)=>u.skip?o.slice(u.skip):o,(o,u)=>u.limit?o.slice(0,u.limit):o,(o,u)=>R(W(u.without))(o),(o,u)=>R(J(u.only))(o)];return async o=>{const u=await e(),f=o.params(),h=i.reduce((p,r)=>r(p,f)||p,u);return f.first?h[0]:h}}var pe={exports:{}};(function(e,t){(function(n,i,o){e.exports=o(),e.exports.default=o()})("slugify",b,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E'","\u0538":"Y'","\u0539":"T'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C'","\u053F":"K","\u0540":"H","\u0541":"D'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P'","\u0554":"Q'","\u0555":"O''","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"'","\u2019":"'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}`),i=JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');function o(u,f){if(typeof u!="string")throw new Error("slugify: string argument expected");f=typeof f=="string"?{replacement:f}:f||{};var h=i[f.locale]||{},p=f.replacement===void 0?"-":f.replacement,r=f.trim===void 0?!0:f.trim,s=u.normalize().split("").reduce(function(a,c){var l=h[c];return l===void 0&&(l=n[c]),l===void 0&&(l=c),l===p&&(l=" "),a+l.replace(f.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return f.strict&&(s=s.replace(/[^A-Za-z0-9\s]/g,"")),r&&(s=s.trim()),s=s.replace(/\s+/g,p),f.lower&&(s=s.toLowerCase()),s}return o.extend=function(u){Object.assign(n,u)},o})})(pe);const he=e=>e.split(/[\s-]/g).map(H).join(" ");function ge(e,t){const{navigation:n}=P().public.content,i=u=>({...de(["title",...n.fields])(u),...we(u==null?void 0:u.navigation)?u.navigation:{}}),o=e.sort((u,f)=>u._path.localeCompare(f._path)).reduce((u,f)=>{const h=f._path.substring(1).split("/"),p=f._id.split(":").slice(1),r=!!p[p.length-1].match(/([1-9][0-9]*\.)?index.md/g),s=l=>({title:l.title,_path:l._path,_file:l._file,children:[],...i(l),...l._draft?{_draft:!0}:{}}),a=s(f);if(r){const l=t[a._path];if(typeof(l==null?void 0:l.navigation)<"u"&&!(l!=null&&l.navigation))return u;if(f._path!=="/"){const m=s(f);a.children.push(m)}Object.assign(a,i(l))}return h.length===1?(u.push(a),u):(h.slice(0,-1).reduce((l,m,d)=>{const v="/"+h.slice(0,d+1).join("/"),w=t[v];if(typeof(w==null?void 0:w.navigation)<"u"&&!w.navigation)return[];let I=l.find(O=>O._path===v);return I||(I={title:he(m),_path:v,_file:f._file,children:[],...i(w)},l.push(I)),I.children},u).push(a),u)},[]);return Y(o)}const ye=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function Y(e){var n;const t=e.sort((i,o)=>ye.compare(i._file,o._file));for(const i of t)(n=i.children)!=null&&n.length?Y(i.children):delete i.children,delete i._file;return e}function de(e){return t=>(t=t||{},e&&e.length?e.filter(n=>typeof t[n]<"u").reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{}):t)}function we(e){return Object.prototype.toString.call(e)==="[object Object]"}const ve=e=>z(e,P().public.content.api.baseURL),Ie=ae(fe({driver:G()}),"@content");function Ae(e){async function t(){const n=new Set(await e.getKeys("cache:")),i=D().getPreviewToken();if(i){const u=await e.getItem(`${i}$`).then(p=>p||{});if(Array.isArray(u.ignoreSources)){const p=u.ignoreSources.map(r=>`cache:${r.trim()}:`);for(const r of n)p.some(s=>r.startsWith(s))&&n.delete(r)}const f=await e.getKeys(`${i}:`),h=await Promise.all(f.map(p=>e.getItem(p)));for(const p of h)n.delete(`cache:${p._id}`),p.__deleted||n.add(`${i}:${p._id}`)}return await Promise.all(Array.from(n).map(u=>e.getItem(u)))}return{storage:e,fetch:M(t),query:n=>F(M(t),n)}}let j=null,S=null;async function Ee(){return S?await S:j||(S=Oe(),j=await S),j}async function Oe(){const e=T(),{content:t}=P().public,n=Ae(Ie),i=await n.storage.getItem("integrity");if(t.integrity!==+(i||0)){const{contents:o,navigation:u}=await $fetch(ve(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(o.map(f=>n.storage.setItem(`cache:${f._id}`,f))),await n.storage.setItem("navigation",u),await n.storage.setItem("integrity",t.integrity)}return await e.callHook("content:storage",n.storage),n}async function Re(e){const t=await Ee();if(!D().getPreviewToken()&&Object.keys(e||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(e).where({_partial:!1,navigation:{$ne:!1}}).find(),o=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((u,f)=>{var p;((p=f.title)==null?void 0:p.toLowerCase())==="dir"&&(f.title=void 0);const h=f._path.split("/").slice(0,-1).join("/")||"/";return u[h]={...f,...f.body},u},{});return ge(n,o)}export{Ie as contentStorage,Ae as createDB,Re as generateNavigation,Ee as useContentDatabase};
