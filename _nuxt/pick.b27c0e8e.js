import{c as f,t as l,b as m}from"./_baseGet.57648035.js";import{b as o}from"./_baseSet.39436bc7.js";import{i as g,b as h}from"./_arrayPush.6d7e61e4.js";import{i as v}from"./isArray.3fa80ba1.js";import{i as d}from"./_isIndex.f5af1eca.js";import{f as p}from"./flatten.a5c62c9e.js";import{s as x,o as P}from"./_overRest.e23153e9.js";function k(n){return x(P(n,void 0,p),n+"")}function I(n,r){return n!=null&&r in Object(n)}function c(n,r,e){r=f(r,n);for(var i=-1,s=r.length,a=!1;++i<s;){var t=l(r[i]);if(!(a=n!=null&&e(n,t)))break;n=n[t]}return a||++i!=s?a:(s=n==null?0:n.length,!!s&&g(s)&&d(t,s)&&(v(n)||h(n)))}function w(n,r){return n!=null&&c(n,r,I)}function A(n,r,e){for(var i=-1,s=r.length,a={};++i<s;){var t=r[i],u=m(n,t);e(u,t)&&o(a,f(t,n),u)}return a}function R(n,r){return A(n,r,function(e,i){return w(n,i)})}var S=k(function(n,r){return n==null?{}:R(n,r)});const T=S;export{w as h,T as p};