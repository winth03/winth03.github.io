const i=4,s={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},o=({move:e,size:l,bar:t})=>({[t.size]:l,transform:`translate${t.axis}(${e}%)`});export{s as B,i as G,o as r};
