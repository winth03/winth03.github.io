import{c as O,a as y}from"./_baseSet.39436bc7.js";import{f as p,h as m,j as x,o as w,U as u}from"./_Uint8Array.4a2b558d.js";import{a as v,r as P}from"./isObject.5a18b265.js";var i=Object.create,b=function(){function e(){}return function(n){if(!v(n))return{};if(i)return i(n);e.prototype=n;var r=new e;return e.prototype=void 0,r}}();const A=b;function q(e,n){var r=-1,t=e.length;for(n||(n=Array(t));++r<t;)n[r]=e[r];return n}function D(e,n,r,t){var g=!r;r||(r={});for(var a=-1,h=n.length;++a<h;){var o=n[a],s=t?t(r[o],e[o],o,r,e):void 0;s===void 0&&(s=e[o]),g?O(r,o,s):y(r,o,s)}return r}function C(e){var n=[];if(e!=null)for(var r in Object(e))n.push(r);return n}var U=Object.prototype,I=U.hasOwnProperty;function K(e){if(!v(e))return C(e);var n=p(e),r=[];for(var t in e)t=="constructor"&&(n||!I.call(e,t))||r.push(t);return r}function F(e){return m(e)?x(e,!0):K(e)}var L=w(Object.getPrototypeOf,Object);const T=L;var d=typeof exports=="object"&&exports&&!exports.nodeType&&exports,f=d&&typeof module=="object"&&module&&!module.nodeType&&module,B=f&&f.exports===d,l=B?P.Buffer:void 0,c=l?l.allocUnsafe:void 0;function G(e,n){if(n)return e.slice();var r=e.length,t=c?c(r):new e.constructor(r);return e.copy(t),t}function E(e){var n=new e.constructor(e.byteLength);return new u(n).set(new u(e)),n}function H(e,n){var r=n?E(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}function J(e){return typeof e.constructor=="function"&&!p(e)?A(T(e)):{}}export{E as a,H as b,D as c,q as d,G as e,T as g,J as i,F as k};
