var app=function(){"use strict";function e(){}function n(e){return e()}function o(){return Object.create(null)}function l(e){e.forEach(n)}function t(e){return"function"==typeof e}function a(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e}function i(e,n,o,l){if(e){const t=r(e,n,o,l);return e[0](t)}}function r(e,n,o,l){return e[1]&&l?function(e,n){for(const o in n)e[o]=n[o];return e}(o.ctx.slice(),e[1](l(n))):o.ctx}function p(e,n,o,l,t,a,i){const p=function(e,n,o,l){if(e[2]&&l){const t=e[2](l(o));if(void 0===n.dirty)return t;if("object"==typeof t){const e=[],o=Math.max(n.dirty.length,t.length);for(let l=0;l<o;l+=1)e[l]=n.dirty[l]|t[l];return e}return n.dirty|t}return n.dirty}(n,l,t,a);if(p){const t=r(n,o,l,i);e.p(t,p)}}function s(e){return null==e?"":e}function c(e,n){e.appendChild(n)}function d(e,n,o){e.insertBefore(n,o||null)}function u(e){e.parentNode.removeChild(e)}function y(e){return document.createElement(e)}function w(e){return document.createTextNode(e)}function m(){return w(" ")}function h(){return w("")}function z(e,n,o,l){return e.addEventListener(n,o,l),()=>e.removeEventListener(n,o,l)}function k(e,n,o){null==o?e.removeAttribute(n):e.getAttribute(n)!==o&&e.setAttribute(n,o)}function f(e,n){n=""+n,e.wholeText!==n&&(e.data=n)}function g(e,n){e.value=null==n?"":n}function b(e,n,o,l){e.style.setProperty(n,o,l?"important":"")}let $;function v(e){$=e}function j(e){(function(){if(!$)throw new Error("Function called outside component initialization");return $})().$$.on_mount.push(e)}const x=[],_=[],L=[],A=[],E=Promise.resolve();let C=!1;function M(e){L.push(e)}let N=!1;const W=new Set;function q(){if(!N){N=!0;do{for(let e=0;e<x.length;e+=1){const n=x[e];v(n),O(n.$$)}for(v(null),x.length=0;_.length;)_.pop()();for(let e=0;e<L.length;e+=1){const n=L[e];W.has(n)||(W.add(n),n())}L.length=0}while(x.length);for(;A.length;)A.pop()();C=!1,N=!1,W.clear()}}function O(e){if(null!==e.fragment){e.update(),l(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(M)}}const D=new Set;let P;function S(){P={r:0,c:[],p:P}}function B(){P.r||l(P.c),P=P.p}function T(e,n){e&&e.i&&(D.delete(e),e.i(n))}function F(e,n,o,l){if(e&&e.o){if(D.has(e))return;D.add(e),P.c.push((()=>{D.delete(e),l&&(o&&e.d(1),l())})),e.o(n)}}function I(e){e&&e.c()}function U(e,o,a){const{fragment:i,on_mount:r,on_destroy:p,after_update:s}=e.$$;i&&i.m(o,a),M((()=>{const o=r.map(n).filter(t);p?p.push(...o):l(o),e.$$.on_mount=[]})),s.forEach(M)}function G(e,n){const o=e.$$;null!==o.fragment&&(l(o.on_destroy),o.fragment&&o.fragment.d(n),o.on_destroy=o.fragment=null,o.ctx=[])}function H(e,n){-1===e.$$.dirty[0]&&(x.push(e),C||(C=!0,E.then(q)),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function J(n,t,a,i,r,p,s=[-1]){const c=$;v(n);const d=n.$$={fragment:null,ctx:null,props:p,update:e,not_equal:r,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:o(),dirty:s,skip_bound:!1};let y=!1;if(d.ctx=a?a(n,t.props||{},((e,o,...l)=>{const t=l.length?l[0]:o;return d.ctx&&r(d.ctx[e],d.ctx[e]=t)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](t),y&&H(n,e)),o})):[],d.update(),y=!0,l(d.before_update),d.fragment=!!i&&i(d.ctx),t.target){if(t.hydrate){const e=function(e){return Array.from(e.childNodes)}(t.target);d.fragment&&d.fragment.l(e),e.forEach(u)}else d.fragment&&d.fragment.c();t.intro&&T(n.$$.fragment),U(n,t.target,t.anchor),q()}v(c)}class K{$destroy(){G(this,1),this.$destroy=e}$on(e,n){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const e=o.indexOf(n);-1!==e&&o.splice(e,1)}}$set(e){var n;this.$$set&&(n=e,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Q(e){let n,o,l,a;const r=e[2].default,s=i(r,e,e[1],null);return{c(){n=y("button"),s&&s.c(),k(n,"class","svelte-14p8jzr")},m(i,r){d(i,n,r),s&&s.m(n,null),o=!0,l||(a=z(n,"click",(function(){t(e[0])&&e[0].apply(this,arguments)})),l=!0)},p(n,[o]){e=n,s&&s.p&&2&o&&p(s,r,e,e[1],o,null,null)},i(e){o||(T(s,e),o=!0)},o(e){F(s,e),o=!1},d(e){e&&u(n),s&&s.d(e),l=!1,a()}}}function R(e,n,o){let{$$slots:l={},$$scope:t}=n,{click:a=(()=>{})}=n;return e.$$set=e=>{"click"in e&&o(0,a=e.click),"$$scope"in e&&o(1,t=e.$$scope)},[a,t,l]}class V extends K{constructor(e){super(),J(this,e,R,Q,a,{click:0})}}function X(e){let n,o;const l=e[1].default,t=i(l,e,e[0],null);return{c(){n=y("div"),t&&t.c(),k(n,"class","svelte-1uterlv")},m(e,l){d(e,n,l),t&&t.m(n,null),o=!0},p(e,[n]){t&&t.p&&1&n&&p(t,l,e,e[0],n,null,null)},i(e){o||(T(t,e),o=!0)},o(e){F(t,e),o=!1},d(e){e&&u(n),t&&t.d(e)}}}function Y(e,n,o){let{$$slots:l={},$$scope:t}=n;return e.$$set=e=>{"$$scope"in e&&o(0,t=e.$$scope)},[t,l]}class Z extends K{constructor(e){super(),J(this,e,Y,X,a,{})}}function ee(e){let n,o,l,t;return{c(){n=y("div"),o=w(e[0]),l=w("/"),t=w(e[1]),k(n,"class","fill svelte-aothut"),b(n,"width",e[0]/e[1]*100+"%")},m(e,a){d(e,n,a),c(n,o),c(n,l),c(n,t)},p(e,l){1&l&&f(o,e[0]),2&l&&f(t,e[1]),3&l&&b(n,"width",e[0]/e[1]*100+"%")},d(e){e&&u(n)}}}function ne(n){let o;return{c(){o=y("div"),o.textContent="PODSUMOWANIE",k(o,"class","fill svelte-aothut"),b(o,"width","100%")},m(e,n){d(e,o,n)},p:e,d(e){e&&u(o)}}}function oe(n){let o;function l(e,n){return e[0]>e[1]?ne:ee}let t=l(n),a=t(n);return{c(){o=y("div"),a.c(),k(o,"class","parent svelte-aothut")},m(e,n){d(e,o,n),a.m(o,null)},p(e,[n]){t===(t=l(e))&&a?a.p(e,n):(a.d(1),a=t(e),a&&(a.c(),a.m(o,null)))},i:e,o:e,d(e){e&&u(o),a.d()}}}function le(e,n,o){let{current:l=1}=n,{max:t=3}=n;return e.$$set=e=>{"current"in e&&o(0,l=e.current),"max"in e&&o(1,t=e.max)},[l,t]}class te extends K{constructor(e){super(),J(this,e,le,oe,a,{current:0,max:1})}}const ae=e=>{for(let n=e.length-1;n>0;n--){const o=Math.floor(Math.random()*(n+1));[e[n],e[o]]=[e[o],e[n]]}},ie=e=>Array.isArray(e)?e[0]:e;function re(e,n,o){const l=e.slice();return l[4]=n[o],l}function pe(e){let n,o,l,t,a,i,r,p=ie(e[4].pl)+"",s=e[4].en+"",m=e[4].answer+"";return{c(){n=y("li"),o=w(p),l=w(" : "),t=w(s),a=w(" ("),i=w(m),r=w(")"),k(n,"class","wrong-answer svelte-1s2p1u1")},m(e,p){d(e,n,p),c(n,o),c(n,l),c(n,t),c(n,a),c(n,i),c(n,r)},p(e,n){1&n&&p!==(p=ie(e[4].pl)+"")&&f(o,p),1&n&&s!==(s=e[4].en+"")&&f(t,s),1&n&&m!==(m=e[4].answer+"")&&f(i,m)},d(e){e&&u(n)}}}function se(e){let n,o,l,t,a,i,r,p=ie(e[4].pl)+"",s=e[4].en+"",m=e[4].answer+"";return{c(){n=y("li"),o=w(p),l=w(" : "),t=w(s),a=w(" ("),i=w(m),r=w(")"),k(n,"class","correct-answer svelte-1s2p1u1")},m(e,p){d(e,n,p),c(n,o),c(n,l),c(n,t),c(n,a),c(n,i),c(n,r)},p(e,n){1&n&&p!==(p=ie(e[4].pl)+"")&&f(o,p),1&n&&s!==(s=e[4].en+"")&&f(t,s),1&n&&m!==(m=e[4].answer+"")&&f(i,m)},d(e){e&&u(n)}}}function ce(e){let n;function o(e,n){return e[4].points>0?se:pe}let l=o(e),t=l(e);return{c(){t.c(),n=h()},m(e,o){t.m(e,o),d(e,n,o)},p(e,a){l===(l=o(e))&&t?t.p(e,a):(t.d(1),t=l(e),t&&(t.c(),t.m(n.parentNode,n)))},d(e){t.d(e),e&&u(n)}}}function de(e){let n;return{c(){n=w("Powtórz")},m(e,o){d(e,n,o)},d(e){e&&u(n)}}}function ue(e){let n,o,l,t,a,i,r,p,s,h,z,g,b,$=Math.round(e[1]/e[2]*1e4)/100+"",v=e[0],j=[];for(let n=0;n<v.length;n+=1)j[n]=ce(re(e,v,n));return g=new V({props:{click:e[3],$$slots:{default:[de]},$$scope:{ctx:e}}}),{c(){n=y("div"),o=y("div"),l=w($),t=w(" % ("),a=w(e[1]),i=w("/"),r=w(e[2]),p=w(")"),s=m(),h=y("ol");for(let e=0;e<j.length;e+=1)j[e].c();z=m(),I(g.$$.fragment),k(o,"class","score svelte-1s2p1u1"),k(n,"class","summary svelte-1s2p1u1")},m(e,u){d(e,n,u),c(n,o),c(o,l),c(o,t),c(o,a),c(o,i),c(o,r),c(o,p),c(n,s),c(n,h);for(let e=0;e<j.length;e+=1)j[e].m(h,null);c(n,z),U(g,n,null),b=!0},p(e,[n]){if((!b||6&n)&&$!==($=Math.round(e[1]/e[2]*1e4)/100+"")&&f(l,$),(!b||2&n)&&f(a,e[1]),(!b||4&n)&&f(r,e[2]),1&n){let o;for(v=e[0],o=0;o<v.length;o+=1){const l=re(e,v,o);j[o]?j[o].p(l,n):(j[o]=ce(l),j[o].c(),j[o].m(h,null))}for(;o<j.length;o+=1)j[o].d(1);j.length=v.length}const o={};8&n&&(o.click=e[3]),128&n&&(o.$$scope={dirty:n,ctx:e}),g.$set(o)},i(e){b||(T(g.$$.fragment,e),b=!0)},o(e){F(g.$$.fragment,e),b=!1},d(e){e&&u(n),function(e,n){for(let o=0;o<e.length;o+=1)e[o]&&e[o].d(n)}(j,e),G(g)}}}function ye(e,n,o){let{selectedWords:l=[]}=n,{score:t=1}=n,{wordsLength:a=1}=n,{retry:i=(()=>{})}=n;return e.$$set=e=>{"selectedWords"in e&&o(0,l=e.selectedWords),"score"in e&&o(1,t=e.score),"wordsLength"in e&&o(2,a=e.wordsLength),"retry"in e&&o(3,i=e.retry)},[l,t,a,i]}class we extends K{constructor(e){super(),J(this,e,ye,ue,a,{selectedWords:0,score:1,wordsLength:2,retry:3})}}function me(e){let n,o;return n=new we({props:{selectedWords:e[2],wordsLength:e[0],score:e[5],retry:e[8]}}),{c(){I(n.$$.fragment)},m(e,l){U(n,e,l),o=!0},p(e,o){const l={};4&o&&(l.selectedWords=e[2]),1&o&&(l.wordsLength=e[0]),32&o&&(l.score=e[5]),n.$set(l)},i(e){o||(T(n.$$.fragment,e),o=!0)},o(e){F(n.$$.fragment,e),o=!1},d(e){G(n,e)}}}function he(n){let o,t,a,i,r,p,h,b,$,v,j,x=ie(n[2][n[3]].pl)+"",_=n[6]&&ze(n);return{c(){o=y("div"),t=w(x),a=m(),_&&_.c(),i=m(),r=y("form"),p=y("input"),b=m(),$=y("input"),k(o,"class","word svelte-w6d5dt"),k(p,"type","text"),k(p,"class",h=s(n[7])+" svelte-w6d5dt"),p.readOnly=n[7],k($,"type","submit"),$.value="Dalej",k($,"class","svelte-w6d5dt"),k(r,"spellcheck","false")},m(e,l){var s;d(e,o,l),c(o,t),c(o,a),_&&_.m(o,null),d(e,i,l),d(e,r,l),c(r,p),g(p,n[4]),n[12](p),c(r,b),c(r,$),v||(j=[z(p,"input",n[11]),z(r,"submit",(s=n[9],function(e){return e.preventDefault(),s.call(this,e)}))],v=!0)},p(e,n){12&n&&x!==(x=ie(e[2][e[3]].pl)+"")&&f(t,x),e[6]?_?_.p(e,n):(_=ze(e),_.c(),_.m(o,null)):_&&(_.d(1),_=null),128&n&&h!==(h=s(e[7])+" svelte-w6d5dt")&&k(p,"class",h),128&n&&(p.readOnly=e[7]),16&n&&p.value!==e[4]&&g(p,e[4])},i:e,o:e,d(e){e&&u(o),_&&_.d(),e&&u(i),e&&u(r),n[12](null),v=!1,l(j)}}}function ze(e){let n,o,l,t=e[2][e[3]].en+"";return{c(){n=w("- "),o=y("span"),l=w(t),k(o,"class","hint svelte-w6d5dt")},m(e,t){d(e,n,t),d(e,o,t),c(o,l)},p(e,n){12&n&&t!==(t=e[2][e[3]].en+"")&&f(l,t)},d(e){e&&u(n),e&&u(o)}}}function ke(e){let n,o,l,t;const a=[he,me],i=[];function r(e,n){return e[3]<e[0]?0:1}return n=r(e),o=i[n]=a[n](e),{c(){o.c(),l=h()},m(e,o){i[n].m(e,o),d(e,l,o),t=!0},p(e,t){let p=n;n=r(e),n===p?i[n].p(e,t):(S(),F(i[p],1,1,(()=>{i[p]=null})),B(),o=i[n],o?o.p(e,t):(o=i[n]=a[n](e),o.c()),T(o,1),o.m(l.parentNode,l))},i(e){t||(T(o),t=!0)},o(e){F(o),t=!1},d(e){i[n].d(e),e&&u(l)}}}function fe(e){let n,o,l,t,a,i,r;return l=new te({props:{current:e[3]+1,max:e[0]}}),i=new Z({props:{$$slots:{default:[ke]},$$scope:{ctx:e}}}),{c(){n=y("link"),o=m(),I(l.$$.fragment),t=m(),a=y("main"),I(i.$$.fragment),k(n,"href","https://fonts.googleapis.com/css?family=Asap"),k(n,"rel","stylesheet"),k(a,"class","svelte-w6d5dt")},m(e,p){c(document.head,n),d(e,o,p),U(l,e,p),d(e,t,p),d(e,a,p),U(i,a,null),r=!0},p(e,[n]){const o={};8&n&&(o.current=e[3]+1),1&n&&(o.max=e[0]),l.$set(o);const t={};8447&n&&(t.$$scope={dirty:n,ctx:e}),i.$set(t)},i(e){r||(T(l.$$.fragment,e),T(i.$$.fragment,e),r=!0)},o(e){F(l.$$.fragment,e),F(i.$$.fragment,e),r=!1},d(e){u(n),e&&u(o),G(l,e),e&&u(t),e&&u(a),G(i)}}}function ge(e,n,o){let l,{words:t}=n,{wordsLength:a=10}=n;ae(t);let i=t.slice(0,a),r=0,p="",s=0,c=!1,d="";return j((()=>{l.focus()})),e.$$set=e=>{"words"in e&&o(10,t=e.words),"wordsLength"in e&&o(0,a=e.wordsLength)},[a,l,i,r,p,s,c,d,()=>{ae(t),o(2,i=t.slice(0,a)),o(3,r=0),o(4,p=""),o(5,s=0),setTimeout((()=>{l.focus()}),1)},()=>{if(1==c)return o(6,c=!1),o(4,p=""),o(3,r++,r),l.focus(),void o(7,d="");o(2,i[r].answer=p,i);const e=i[r].en;let n=!1;if(Array.isArray(e)?e.includes(p)&&(n=!0):p.toLowerCase()===e.toLowerCase()&&(n=!0),!n)return o(6,c=!0),void o(7,d="readonly");o(5,s++,s),o(2,i[r].points=1,i),o(4,p=""),o(3,r++,r),l.focus()},t,function(){p=this.value,o(4,p)},function(e){_[e?"unshift":"push"]((()=>{l=e,o(1,l)}))}]}class be extends K{constructor(e){super(),J(this,e,ge,fe,a,{words:10,wordsLength:0})}}var $e=[{pl:"wiek",en:"age"},{pl:"miejsce urodzenia",en:"place of birth"},{pl:"rozwiedziony",en:"divorced"},{pl:"imię",en:"first name"},{pl:"płci męskiej",en:"male"},{pl:"płci żeńskiej",en:"female"},{pl:"stan cywilny",en:"marital status"},{pl:"żonaty",en:"married"},{pl:"drugie imię",en:"middle name"},{pl:"narodowość",en:"nationality"},{pl:"zawód",en:"occupation"},{pl:"dane osobowe",en:"personal data"},{pl:"stanu wolnego",en:"single"},{pl:"nazwisko",en:"surname"},{pl:"wdowa",en:"widow"},{pl:"być podobnym do",en:"be similar to"},{pl:"opis",en:"description"},{pl:"atrakcyjny",en:"good-looking"},{pl:"przystojny",en:"handsome"},{pl:"wyglądać jak",en:"look like"},{pl:"brzydki",en:"ugly"},{pl:"nieatrakcyjny",en:"unattractive"},{pl:"być średniego wzrostu",en:"be of medium height"},{pl:"niski",en:"short"},{pl:"wysoki",en:"tall"},{pl:"mieć nadwagę",en:"be overweight"},{pl:"gruby",en:"fat"},{pl:"pulchny",en:"plump"},{pl:"szczupły",en:"slim"},{pl:"przysadzisty",en:"stocky"},{pl:"chudy",en:"thin"},{pl:"dobrze zbudowany",en:"well-built"},{pl:"dorosły",en:"adult"},{pl:"w podeszłym wieku",en:"elderly"},{pl:"po dwudziestce",en:["in his twenties","in her twenties"]},{pl:"nastoletnia",en:"in her teens"},{pl:"w średnim wieku",en:"middle-aged"},{pl:"stary",en:"old"},{pl:"młody",en:"young"},{pl:"broda",en:"beard"},{pl:"piegi",en:"freckles"},{pl:"pełne usta",en:"full lips"},{pl:"wąskie usta",en:"thin lips"},{pl:"wysokie czoło",en:"high forehead"},{pl:"wąsy",en:"moustache"},{pl:"blady",en:"pale"},{pl:"pryszcz",en:"pimple"},{pl:"blizna",en:"scar"},{pl:"zadarty nos",en:"snub nose"},{pl:"mocny podbródek",en:"strong chin"},{pl:"małe oczy",en:["tiny eyes","small eyes"]},{pl:"zmarszczki",en:"wrinkles"},{pl:"łysy",en:"bald"},{pl:"blond włosy",en:"blond hair"},{pl:"jasne włosy",en:"fair hair"},{pl:"ciemne włosy",en:"dark hair"},{pl:"rude włosy",en:"red hair"},{pl:"siwe włosy",en:"grey hair"},{pl:"kręcone włosy",en:"curly hair"},{pl:"farbowane włosy",en:"dyed hair"},{pl:"grzywka",en:"fringe"},{pl:"kucyk",en:"pony tail"},{pl:"sterczące włosy",en:"spiky hair"},{pl:"proste włosy",en:"straight hair"},{pl:"falujące włosy",en:"wavy hair"},{pl:"nieformalny",en:"casual"},{pl:"wygodny",en:"comfortable"},{pl:"elegancki",en:["elegant","smart"]},{pl:"modny",en:"fashionable"},{pl:["oficjalny, odświętny (strój)","oficjalny","odświętny"],en:"formal"},{pl:"luźny",en:"loose"},{pl:"niechlujny",en:"scruffy"},{pl:"obcisły",en:"tight"},{pl:"bluzka",en:"blouse"},{pl:"bokserki",en:"boxer shorts"},{pl:"płaszcz",en:"coat"},{pl:"sukienka",en:"dress"},{pl:"bluza z kapturem",en:"hoody"},{pl:"polar",en:"fleece"},{pl:"kurtka",en:"jacket"},{pl:"sweter",en:["jumper","sweater"]},{pl:"para jeansów",en:"pair of jeans"},{pl:"płaszcz przeciwdeszczowy",en:"raincoat"},{pl:"koszula",en:"shirt"},{pl:"krótkie spodenki",en:"shorts"},{pl:"spódnica",en:"skirt"},{pl:"skarpetki",en:"socks"},{pl:"garnitur",en:"suit"},{pl:"bluza",en:"sweatshirt"},{pl:"krawat",en:"tie"},{pl:"rajstopy",en:"tights"},{pl:"dres",en:"tracksuit"},{pl:"spodnie",en:["trousers","pants"]},{pl:"bielizna",en:"underwear"},{pl:"buty z cholewką",en:"boots"},{pl:"buty na wysokim obcasie",en:"high heels"},{pl:"buty",en:"shoes"},{pl:"kapcie",en:"slippers"},{pl:"obuwie sportowe",en:["trainers","sport shoes"]},{pl:"kalosze",en:"wellingtons"},{pl:"pasek",en:"belt"},{pl:"bransoletka",en:"bracelet"},{pl:"czapka z daszkiem",en:"cap"},{pl:"kolczyki",en:"earrings"},{pl:"rękawiczki",en:"gloves"},{pl:"kapelusz",en:"hat"},{pl:"biżuteria",en:"jewellery"},{pl:"naszyjnik",en:"necklace"},{pl:"szalik",en:"scarf"},{pl:"parasolka",en:"umbrella"},{pl:"guzik",en:"button"},{pl:"kieszeń",en:"pocket"},{pl:"rękaw",en:"sleeve"},{pl:"zamek błyskawiczny",en:"zip"},{pl:"bawełniany",en:"cotton"},{pl:"skórzany",en:"leather"},{pl:"gładki",en:"plain"},{pl:"jedwabny",en:"silk"},{pl:"wełniany",en:"woolen"},{pl:["ubierać się, nosić (ubrania)","ubiera się","nosić"],en:"dress"},{pl:["pasować (rozmiarem)","pasować"],en:"fit"},{pl:"ubrać się",en:"get dressed"},{pl:"pasować do czegoś",en:["go with something","go with sth"]},{pl:"wyglądać dobrze",en:"look good"},{pl:"pasować do czegoś",en:"match"},{pl:"założyć",en:"put on"},{pl:["pasować (kolorem lub fasonem)","pasować"],en:"suit"},{pl:"zdjąć",en:"take off"},{pl:"przymierzyć",en:"try on"},{pl:["nosić (ubrania)","nosić"],en:"wear"},{pl:"ambitny",en:"ambitious"},{pl:"nudny",en:"boring"},{pl:"odważny",en:"brave"},{pl:"spokojny",en:"calm"},{pl:"bystry",en:"clever"},{pl:"pewny siebie",en:"confident"},{pl:"kreatywny",en:"creative"},{pl:"zdecydowany",en:"decisive"},{pl:"nieuczciwy",en:"dishonest"},{pl:"nielojalny",en:"disloyal"},{pl:"szczodry",en:"generous"},{pl:"pracowity",en:"hard-working"},{pl:"uczciwy",en:"honest"},{pl:"nieuprzejmy",en:"impolite"},{pl:"niecierpliwy",en:"impatient"},{pl:"inspirujący",en:"inspiring"},{pl:"nieodpowiedzialny",en:"irresponsible"},{pl:"leniwy",en:"lazy"},{pl:["złośliwy, skąpy","złośliwy","skąpy"],en:"mean"},{pl:"skromny",en:"modest"},{pl:"praktyczny",en:"practical"},{pl:"cichy",en:"quiet"},{pl:"samolubny",en:"selfish"},{pl:"towarzyski",en:"sociable"},{pl:"uparty",en:"stubborn"},{pl:"rozmowny",en:"talkative"},{pl:"nieschludny",en:"untidy"},{pl:"niesprawiedliwy",en:"unfair"},{pl:"niemiły",en:"unfriendly"},{pl:"nieżyczliwy",en:"unkind"},{pl:"zdumiony",en:"amazed"},{pl:"rozbawiony",en:"amused"},{pl:"rozgniewany",en:"angry"},{pl:"rozdrażniony",en:"annoyed"},{pl:"znudzony",en:"bored"},{pl:["zdezorientowany, zagubiony","zdezorientowany","zagubiony"],en:"confused"},{pl:"przygnębiony",en:"depressed"},{pl:"rozczarowany",en:"disappointed"},{pl:"zawstydzony",en:"embarrassed"},{pl:"podekscytowany",en:"excited"},{pl:"wyczerpany",en:"exhausted"},{pl:"przestraszony",en:"frightened"},{pl:["pełen nadziei, ufny","pełen nadziei","ufny"],en:"hopeful"},{pl:"zazdrosny",en:"jealous"},{pl:"samotny",en:"lonely"},{pl:"zadowolony",en:"pleased"},{pl:"dumny",en:"proud"},{pl:"zestresowany",en:"stressed"},{pl:"zdziwiony",en:"surprised"},{pl:"zmęczony",en:"tired"},{pl:"bać się czegoś",en:["be afraid of something","be afraid of sth"]},{pl:"być złym na kogoś",en:["be angry with somebody","be angry with sb"]},{pl:"śmiertelnie się nudzić",en:"be bored to death"},{pl:"lubić coś",en:["be fond of something","be fond of sth"]},{pl:"być dobrym w czymś",en:["be good at something","be good at sth"]},{pl:"interesować się czymś",en:["be keen on something","be keen on sth"]},{pl:"być do niczego w czymś",en:["be useless at something","be useless at sth"]},{pl:"martwić się czymś",en:["be worried about something","be worried about sth"]},{pl:"należeć do",en:"belong to"},{pl:"obgryzać paznokcie",en:["bite nails","bite your nails"]},{pl:"mrugać oczami",en:["blink eyes","blink your eyes"]},{pl:"zmieniać zdanie",en:["change your mind","change mind"]},{pl:"skrzyżować ramiona",en:["cross arms","cross your arms"]},{pl:"przebrać się za coś",en:"dress up as something"},{pl:"ulubiona rozrywka",en:"favourite pastime"},{pl:"wypełnić formularz",en:"fill in a form"},{pl:"piłka nożna",en:["footie","football"]},{pl:"koncert",en:"gig"},{pl:"ukrywać uczucia",en:["hide feelings","hide your feelings"]},{pl:"nie okazywać uczuć",en:["keep feelings inside","keep your feelings inside"]},{pl:"zdrowie psychiczne",en:"mental health"},{pl:"kazać komuś coś zrobić",en:["order somebody to do something","order sb to do sth"]},{pl:"to bułka z masłem",en:["it's a piece of cake","it is a piece of cake","piece of cake"]},{pl:"wprawiać kogoś w dobry nastrój",en:["put somebody in a good mood","put sb in a good mood"]},{pl:"poczucie humoru",en:"sense of humour"},{pl:"bezdomne zwierzę",en:"stray animal"},{pl:"pukać palcami",en:["tap fingers","tap your fingers"]}],ve=[{pl:"strych",en:"attic"},{pl:"piwnica",en:"basement"},{pl:"łazienka",en:"bathroom"},{pl:"sypialnia",en:"bedroom"},{pl:"sufit",en:"ceiling"},{pl:"komin",en:"chimney"},{pl:"jadalnia",en:"dining room"},{pl:"na dole domu",en:"downstairs"},{pl:"podjazd",en:"driveway"},{pl:["ogrodzenie","płot"],en:"fence"},{pl:"podłoga",en:"floor"},{pl:"garaż",en:"garage"},{pl:"parter",en:"ground floor"},{pl:"przedpokój",en:"hall"},{pl:"domofon",en:"intercom"},{pl:"kuchnia",en:"kitchen"},{pl:"trawnik",en:"lawn"},{pl:"winda",en:"lift"},{pl:"salon",en:"living room"},{pl:"dach",en:"roof"},{pl:"schody",en:"stairs"},{pl:"gabinet",en:"study"},{pl:"taras",en:"terrace"},{pl:"toaleta",en:"toilet"},{pl:"na górze domu",en:"upstairs"},{pl:"ściana",en:"wall"},{pl:"klimatyzacja",en:"air conditioning"},{pl:"żaluzje",en:"blinds"},{pl:"półka na ksiązki",en:"bookshelf"},{pl:"dywan",en:"carpet"},{pl:"centralne ogrzewanie",en:"central heating"},{pl:"zasłony",en:"curtains"},{pl:"szuflada",en:"drawer"},{pl:"wykładzina dywanowa",en:"fitted carpet"},{pl:"meble",en:"furniture"},{pl:"obraz",en:"painting"},{pl:"plakat",en:"poster"},{pl:"kaloryfer",en:"radiator"},{pl:"tapeta",en:"wallpaper"},{pl:"parapet",en:"windowsill"},{pl:"fotel",en:"armchair"},{pl:"biblioteczka",en:"bookcase"},{pl:"stolik kawowy",en:"coffee table"},{pl:"poduszka ozdobna",en:"cushion"},{pl:"kominek",en:"fireplace"},{pl:"roślina",en:"plant"},{pl:"kanapa",en:"sofa"},{pl:"kuchenka",en:"cooker"},{pl:["szafka","kredens"],en:"cupboard"},{pl:"zmywarka",en:"dishwasher"},{pl:"lodówka",en:"fridge"},{pl:"patelnia",en:"frying pan"},{pl:"czajnik",en:"kettle"},{pl:"kubek",en:["mug","cup"]},{pl:"piekarnik",en:"oven"},{pl:["rondel","patelnia"],en:"pan"},{pl:"talerz",en:"plate"},{pl:"garnek",en:"pot"},{pl:"zlew",en:"sink"},{pl:"kosz na śmieci",en:["wastebin","rubbish bin"]},{pl:"budzik",en:"alarm clock"},{pl:"stolik nocny",en:"bedside table"},{pl:"koc",en:"blanket"},{pl:"komoda",en:"chest of drawers"},{pl:"wieszak",en:"coat hanger"},{pl:"biurko",en:"desk"},{pl:"kołdra",en:"duvet"},{pl:"poduszka",en:"pillow"},{pl:["chodnik","dywanik"],en:"rug"},{pl:"szafa",en:"wardrobe"},{pl:"wanna",en:"bath"},{pl:"suszarka",en:"hairdryer"},{pl:"lustro",en:"mirror"},{pl:"prysznic",en:"shower"},{pl:["kran","kurek"],en:"tap"},{pl:"sedes",en:"toilet"},{pl:"ręcznik",en:"towel"},{pl:"umywalka",en:"washbasin"},{pl:"pralka",en:"washing machine"},{pl:"czysty",en:"clean"},{pl:"wygodny",en:"comfortable"},{pl:"przytulny",en:"cosy"},{pl:["ozdobiony","pomalowany"],en:"decorated"},{pl:"pusty",en:"empty"},{pl:["zabawnie","śmiesznie wyglądający"],en:["funny-looking","funny looking"]},{pl:"umeblowany",en:"furnished"},{pl:["olbrzymi","wielki"],en:"huge"},{pl:"jasny",en:"light"},{pl:"luksusowy",en:"luxurious"},{pl:["nieuporządkowany","zabałaganiony"],en:["messy","untidy"]},{pl:"staromodny",en:["old-fashioned","old fashioned"]},{pl:"nowoczesny",en:"modern"},{pl:"przyjemny",en:"pleasant"},{pl:["niechlujny","brudny"],en:"scruffy"},{pl:"elegancki",en:"smart"},{pl:"przestronny",en:"spacious"},{pl:"kamienny",en:"stone"},{pl:"słoneczny",en:"sunny"},{pl:["schludny","posprzątany"],en:"tidy"},{pl:"maleńki",en:"tiny"},{pl:"niezwykły",en:"unusual"},{pl:"dobrze wyposażony",en:["well-equipped","well equipped"]},{pl:"drewniany",en:"wooden"},{pl:["dogodny","wygodny"],en:"convenient"},{pl:"zatłoczony",en:"crowded"},{pl:"niebezpieczny",en:"dangerous"},{pl:"tętniący życiem",en:"lively"},{pl:"hałaśliwy",en:"noisy"},{pl:"spokojny",en:"peaceful"},{pl:"malowniczy",en:"picturesque"},{pl:"zanieczyszczony",en:"polluted"},{pl:"cichy",en:"quiet"},{pl:"bezpieczny",en:"safe"},{pl:"nad",en:"above"},{pl:"z tyłu",en:"at the back"},{pl:"z przodu",en:"at the front"},{pl:"pomiędzy",en:"between"},{pl:"przed",en:"in front of"},{pl:"w rogu",en:"in the corner"},{pl:"pośrodku",en:"in the middle"},{pl:"wewnątrz",en:"inside"},{pl:"blisko",en:"near"},{pl:"obok",en:"next to"},{pl:"po prawej stronie",en:"on the right"},{pl:"po lewej stronie",en:"on the left"},{pl:"na prawo od",en:"to the right of"},{pl:"na lewo od",en:"to the left of"},{pl:"naprzeciwko",en:"opposite"},{pl:"na zewnątrz",en:"outside"},{pl:"pod",en:"under"},{pl:"mieszkanie",en:"flat"},{pl:"blok mieszkalny",en:"block of flats"},{pl:"domek na wsi",en:"cottage"},{pl:"dom jednorodzinny",en:"detached house"},{pl:["akademik","internat","bursa"],en:"hall of residence"},{pl:"domek letniskowy",en:"holiday home"},{pl:"drapacz chmur",en:"skyscraper"},{pl:["zabytkowa rezydencja","dwór"],en:"stately home"},{pl:"dom szeregowy",en:"terraced house"},{pl:"rezydencja miejska",en:"town house"},{pl:["teren","okolica"],en:"area"},{pl:"nad jeziorem",en:"by the lake"},{pl:"blisko czegoś",en:"close to something"},{pl:"daleko od czegoś",en:"far from something"},{pl:"w hałaśliwej dzielnicy",en:"in a noisy district"},{pl:"w cichej okolicy",en:"in a quiet neighbourhood"},{pl:"w stolicy",en:"in the capital city"},{pl:"na wsi",en:"in the country"},{pl:"w centrum",en:"in the heart of"},{pl:"na głównej ulicy",en:"in the main street"},{pl:"w górach",en:"in the mountains"},{pl:"na przedmieściu",en:"in the suburbs"},{pl:"w centrum małego miasta",en:"in the town center"},{pl:"umieszczony",en:"located"},{pl:"nieopodal",en:"nearby"},{pl:"na plaży",en:"on the beach"},{pl:"na granicy",en:"on the border"},{pl:"z widokiem na rzekę",en:"overlooking the river"},{pl:["wieś","wioska"],en:"village"},{pl:"być blisko natury",en:"be close to nature"},{pl:"ruchliwe ulice",en:"busy streets"},{pl:"kawiarnia",en:"cafe"},{pl:"parking",en:"car park"},{pl:"kościół",en:"church"},{pl:"czyste powietrze",en:"clean air"},{pl:"chodnik",en:["pavement","sidewalk"]},{pl:"komunikacja publiczna",en:"public transport"},{pl:"centrum handlowe",en:"shopping centre"},{pl:"centrum sportu",en:"sports centre"},{pl:"korek uliczny",en:"traffic jam"},{pl:"w zasięgu dojazdu do pracy",en:"within commuting distance"},{pl:"oprócz",en:"apart from"},{pl:"należeć do",en:"belong to"},{pl:"składać się z",en:"consist of"},{pl:"urządzić pokój",en:"decorate a room"},{pl:"odnowić",en:["do renovate","renovate","do up"]},{pl:"agencja nieruchomości",en:"estate agency"},{pl:"drogi w utrzymaniu",en:"expensive to maintain"},{pl:"mieszkać samemu",en:"live on your own"},{pl:"zrobić miejsce",en:["make some space","make space"]},{pl:"rozgościć się",en:"make yourself at home"},{pl:"przeprowadzić się",en:"move house"},{pl:"płacić czynsz",en:"pay the rent"},{pl:"cisza i spokój",en:"peace and quiet"},{pl:"wynajmować mieszkanie",en:"rent a flat"},{pl:"dzielić z kimś pokój",en:"share a room with somebody"},{pl:"włamać się do",en:"break into"},{pl:"uciec od czegoś",en:"get away from"},{pl:"poddać się",en:"give up"},{pl:"wprowadzić się",en:"move in"},{pl:"wyprowadzić się",en:"move out"},{pl:"podłączyć do prądu",en:"plug in"},{pl:"wyłączyć z prądu",en:"plug off"},{pl:"włączyć",en:["switch on","turn on"]},{pl:"wyłączyć",en:["switch off","turn off"]},{pl:"posprzątać",en:"tidy up"},{pl:"wyrzucić coś",en:"throw something away"},{pl:"ściszyć",en:"turn down"},{pl:"podgłośnić",en:"turn up"},{pl:"ulubione miejsce do spędzania wolnego czasu",en:"hangout"},{pl:"zamieszkany",en:"inhabited"},{pl:"zastanawiać się",en:"wonder"}],je=[{pl:"adoptowany",en:"adopted"},{pl:"ciocia",en:"aunt"},{pl:"szwagier",en:["brother-in-law","brother in law"]},{pl:"kuzyn",en:"cousin"},{pl:"teść",en:["father-in-law","father in law"]},{pl:"wnuki",en:"grandchildren"},{pl:"wnuczka",en:"granddaughter"},{pl:"dziadek",en:"grandfather"},{pl:"babcia",en:"grandmother"},{pl:"dziadkowie",en:"grandparents"},{pl:"wnuk",en:"grandson"},{pl:"prawnuki",en:["great-grandchildren","great grandchildren"]},{pl:"pradziadkowie",en:["great-grandparents","great grandparents"]},{pl:"brat przyrodni",en:["half-brother","half brother"]},{pl:"siostra przyrodnia",en:["half-sister","half sister"]},{pl:"mąż",en:"husband"},{pl:"teściowa",en:["mother-in-law","mother in law"]},{pl:"siostrzeniec, bratanek",en:"nephew"},{pl:"siostrzenica, bratanica",en:"niece"},{pl:"jedynak/jedynaczka",en:"only child"},{pl:"rodzice",en:"parents"},{pl:"krewny",en:"relative"},{pl:"rodzeństwo",en:"sibling"},{pl:"szwagierka, bratowa",en:["sister-in-law","sister in law"]},{pl:"ojczym",en:"stepfather"},{pl:"macocha",en:"stepmother"},{pl:"bliźnięta",en:"twins"},{pl:"wujek",en:"uncle"},{pl:"żona",en:"wife"},{pl:"dorosły",en:"adult"},{pl:"w wieku",en:"at the age of"},{pl:"urodzić się",en:"be born"},{pl:"narodziny",en:"birth"},{pl:"dzieciństwo",en:"childhood"},{pl:"śmierć",en:"death"},{pl:"umrzeć",en:"die"},{pl:"w podeszłym wieku",en:"elderly"},{pl:"dorastać",en:"grow up"},{pl:"nastolatek/nastolatka",en:"teenager"},{pl:"sprzątać pokój",en:"clean your room"},{pl:"odrabiać lekcje",en:"do homework"},{pl:"sprzątać",en:"do the cleaning"},{pl:"wykonywać prace domowe",en:"do the housework"},{pl:"robić zakupy",en:["do the shopping","go shopping"]},{pl:"odkurzać",en:"do the vacuuming"},{pl:"robić pranie",en:["do the washing","wash your clothes"]},{pl:"zmywać naczynia",en:["do the washing-up","wash the dishes"]},{pl:"ubierać się ",en:"get dressed"},{pl:"szykować się do szkoły",en:"get ready for school"},{pl:"jechać do szkoły samochodem",en:"go to school by car"},{pl:"jeść śniadanie",en:"have breakfast"},{pl:"brać prysznic",en:"take a shower"},{pl:"nakrywać do stołu",en:"lay the table"},{pl:"ładować zmywarkę",en:"load the dishwasher"},{pl:"opiekować się kimś",en:"look after somebody"},{pl:"ścielić łóżko",en:"make your bed"},{pl:"opiekować sięz zwierzętami domowymi",en:"take care of pets"},{pl:"wyrzucać śmieci",en:"take out the rubbish "},{pl:"porządkować biurko",en:"tidy your desk"},{pl:"budzić się",en:"wake up"},{pl:"wyprowadzać psa",en:"walk the dog"},{pl:"myć samochód",en:"wash the car"},{pl:"planować życie towarzyskie",en:"arrange social life"},{pl:"interesować się czymś",en:"be interested in something"},{pl:"lubić coś",en:"be keen on something"},{pl:"robić coś",en:"be up to something"},{pl:"czatować na facebooku",en:"chat on facebook"},{pl:"uprawiać sport",en:"do sport"},{pl:"pracować społecznie jako wolontariusz",en:"do voluntary work"},{pl:"dobrze się bawić",en:"have fun"},{pl:"rozrywka",en:"entertainment"},{pl:"iść na spacer",en:"go for a walk"},{pl:"wychodzić",en:"go out"},{pl:"pójść potańczyć",en:"go dancing"},{pl:"spędzać czas w internecie",en:"spend time online"},{pl:"iść do kina",en:"go to the cinema"},{pl:"spędzać z kimś czas",en:"hang out with somebody"},{pl:"być w kontakcie",en:"keep in touch"},{pl:"grać w szachy",en:"play chess"},{pl:"udostępniać zdjęcie",en:"share a photo"},{pl:"grać w gry planszowe",en:"play board games"},{pl:"rozmawiać na skypie",en:"skype"},{pl:"serwis społecznościowy",en:"social networking site"},{pl:"spędzać czas z",en:"socialise with"},{pl:"spędzać czas na powietrzu",en:"spend time outdoors"},{pl:"zaprosić kogoś na randkę",en:"ask somebody out"},{pl:"wychowywać",en:"bring up"},{pl:"panna młoda",en:"bride"},{pl:"pocieszyć kogoś",en:"cheer somebody up"},{pl:"randka",en:"date"},{pl:"pierścionek zaręczynowy",en:"engagement ring"},{pl:"zakochać się",en:"fall in love"},{pl:"narzeczony",en:"fiance"},{pl:"konflikt pokoleń",en:"generation gap"},{pl:"zaręczyć się",en:"get engaged"},{pl:"poślubić kogoś",en:["get married","marry somebody"]},{pl:"być w dobrych relacjach z kimś",en:"get on well with somebody"},{pl:"poznawać kogoś",en:"get to know somebody"},{pl:"chodzić z kimś",en:"get out with somebody"},{pl:"pan młody",en:"groom"},{pl:"miesiąc miodowy",en:"honeymoon"},{pl:"przedstawić się",en:"introduce yourself"},{pl:"być z kimś w kontakcie",en:"keep in touch with somebody"},{pl:"małżeństwo",en:"marriage"},{pl:"para małżeńska",en:"married couple"},{pl:"poznać kogoś",en:"meet somebody"},{pl:"w ciąży",en:"pregnant"},{pl:"oświadczyć się komuś",en:"propose to somebody"},{pl:"związek",en:"relationship"},{pl:"samotny rodzic",en:"single parent"},{pl:"obrączka",en:"wedding ring"},{pl:"zgadzać się z",en:"agree with"},{pl:"przepraszać kogoś",en:"apologize to somebody"},{pl:"kłócić się z",en:"argue with"},{pl:"prosić o pieniądze",en:"ask for money"},{pl:"pożyczać od",en:"borrow from"},{pl:"zerwać z",en:"break up with"},{pl:"skarżyć się na",en:"complain about"},{pl:"krytykować czyjeś zachowanie",en:"criticize somebody's behaviour"},{pl:"pokłócić się",en:["fall out with","have a fight"]},{pl:"wpaść w depresję",en:"get depressed"},{pl:"rozwieść się",en:"get divorced"},{pl:"działać komuś na nerwy",en:"get on somebody's nerves"},{pl:"pożyczać komuś pieniądze",en:"lend money to somebody"},{pl:"pogodzić się z",en:"make up with"},{pl:"uciec",en:"run away"},{pl:"rozstać się",en:["separate","split up with"]},{pl:"Wszystkich Świętych",en:"All Saints' Day"},{pl:"świętować",en:"celebrate"},{pl:"świętowanie",en:"celebration"},{pl:"cmentarz",en:["graveyard","cemetery"]},{pl:"dzień dziecka",en:"children's day"},{pl:"Święta Bożego Narodzenia",en:"Christmas"},{pl:"kartka wielkanocna",en:"Easter card"},{pl:"pierwszy dzień Świąt Bożego Narodzenia",en:"Christmas day"},{pl:"wigilia",en:"Christmas Eve"},{pl:"ubierać choinkę",en:"decorate the christmas tree"},{pl:"Wielkanoc",en:"Easter"},{pl:"króliczek wielkanocny",en:"easter bunny"},{pl:"składać sobie życzenia",en:"exchange wishes"},{pl:"święto",en:["holiday","festival"]},{pl:"pokaz fajerwerków",en:"fireworks display"},{pl:"pogrzeb",en:"funeral"},{pl:"gość",en:"guest"},{pl:"zaproszenie",en:"invitation"},{pl:"zaprosić",en:"invite"},{pl:"Dzień Matki",en:"Mother's Day"},{pl:"imieniny",en:"name day"},{pl:"nowy rok",en:"new year"},{pl:"sylwester",en:"new years eve"},{pl:"dzielić się opłatkiem",en:"share christmas wafers"},{pl:"odwiedzić groby",en:"visit graves"},{pl:"ślub",en:"wedding"},{pl:"rocznica ślubu",en:"wedding anniversary"},{pl:"przyjęcie weselne",en:"wedding reception"},{pl:"wymienić",en:"exchange"},{pl:"dowiedzieć się",en:"find out"},{pl:"śledzić",en:"follow"},{pl:"odżywianie",en:"nutrition"},{pl:"ssać kciuk",en:"suck a thumb"},{pl:"chować",en:"tuck"}];function xe(e){let n,o;return n=new Z({props:{$$slots:{default:[Ce]},$$scope:{ctx:e}}}),{c(){I(n.$$.fragment)},m(e,l){U(n,e,l),o=!0},p(e,o){const l={};64&o&&(l.$$scope={dirty:o,ctx:e}),n.$set(l)},i(e){o||(T(n.$$.fragment,e),o=!0)},o(e){F(n.$$.fragment,e),o=!1},d(e){G(n,e)}}}function _e(e){let n,o;return n=new be({props:{words:e[0],wordsLength:Ne}}),{c(){I(n.$$.fragment)},m(e,l){U(n,e,l),o=!0},p(e,o){const l={};1&o&&(l.words=e[0]),n.$set(l)},i(e){o||(T(n.$$.fragment,e),o=!0)},o(e){F(n.$$.fragment,e),o=!1},d(e){G(n,e)}}}function Le(e){let n;return{c(){n=w("Chapter 1")},m(e,o){d(e,n,o)},d(e){e&&u(n)}}}function Ae(e){let n;return{c(){n=w("Chapter 2")},m(e,o){d(e,n,o)},d(e){e&&u(n)}}}function Ee(e){let n;return{c(){n=w("Chapter 3")},m(e,o){d(e,n,o)},d(e){e&&u(n)}}}function Ce(e){let n,o,l,t,a,i;return n=new V({props:{click:e[2],$$slots:{default:[Le]},$$scope:{ctx:e}}}),l=new V({props:{click:e[3],$$slots:{default:[Ae]},$$scope:{ctx:e}}}),a=new V({props:{click:e[4],$$slots:{default:[Ee]},$$scope:{ctx:e}}}),{c(){I(n.$$.fragment),o=m(),I(l.$$.fragment),t=m(),I(a.$$.fragment)},m(e,r){U(n,e,r),d(e,o,r),U(l,e,r),d(e,t,r),U(a,e,r),i=!0},p(e,o){const t={};64&o&&(t.$$scope={dirty:o,ctx:e}),n.$set(t);const i={};64&o&&(i.$$scope={dirty:o,ctx:e}),l.$set(i);const r={};64&o&&(r.$$scope={dirty:o,ctx:e}),a.$set(r)},i(e){i||(T(n.$$.fragment,e),T(l.$$.fragment,e),T(a.$$.fragment,e),i=!0)},o(e){F(n.$$.fragment,e),F(l.$$.fragment,e),F(a.$$.fragment,e),i=!1},d(e){G(n,e),e&&u(o),G(l,e),e&&u(t),G(a,e)}}}function Me(e){let n,o,l,t,a,i;const r=[_e,xe],p=[];function s(e,n){return e[0]?0:1}return l=s(e),t=p[l]=r[l](e),{c(){n=y("link"),o=m(),t.c(),a=h(),k(n,"href","https://fonts.googleapis.com/css?family=Asap"),k(n,"rel","stylesheet")},m(e,t){c(document.head,n),d(e,o,t),p[l].m(e,t),d(e,a,t),i=!0},p(e,[n]){let o=l;l=s(e),l===o?p[l].p(e,n):(S(),F(p[o],1,1,(()=>{p[o]=null})),B(),t=p[l],t?t.p(e,n):(t=p[l]=r[l](e),t.c()),T(t,1),t.m(a.parentNode,a))},i(e){i||(T(t),i=!0)},o(e){F(t),i=!1},d(e){u(n),e&&u(o),p[l].d(e),e&&u(a)}}}let Ne=2;function We(e,n,o){let l=null,t={chapter1:$e,chapter2:ve,chapter3:je};const a=e=>{o(0,l=t[e])};return[l,a,()=>{a("chapter1")},()=>{a("chapter2")},()=>{a("chapter3")}]}return new class extends K{constructor(e){super(),J(this,e,We,Me,a,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
