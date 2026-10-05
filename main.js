(()=>{
const S=window.SITE,P=window.PROJECTS,$=s=>document.querySelector(s),esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const bySlug=s=>P.find(p=>p.slug===s);
// ---- content
$("#coords").textContent=S.coords?"LAT/LON  "+S.coords:"";
const card=p=>`<article class="card"><div class="thumb">${p.image?`<img loading="lazy" src="${esc(p.image)}" alt="${esc(p.title)} screenshot">`:`<span class="mono">NO IMAGE YET</span>`}</div>
<div class="b"><div class="meta mono"><span>${p.category}</span><span>${p.year||""}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
<p class="mono">${(p.technologies.length?p.technologies:["[TECH]"]).map(esc).join(" • ")}</p>
<div class="links2"><button data-open="${p.slug}">Open project</button>${p.github?`<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>`:""}${p.demo?`<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>`:""}</div></div></article>`;
$("#featured").innerHTML=P.filter(p=>p.featured).map(card).join("");
const cats=["ALL","GIS","WEB","SOFTWARE","DATA","AI","EXPERIMENTS"];
$("#filters").innerHTML=cats.map((c,i)=>`<button aria-pressed="${!i}" data-f="${c}">${c}</button>`).join("");
const showAll=f=>{$("#all").innerHTML=P.filter(p=>f==="ALL"||p.category===f).map(card).join("");document.querySelectorAll("#filters button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===f))};showAll("ALL");
$("#capgrid").innerHTML=Object.entries(S.capabilities).map(([k,v])=>`<div><h3>${k}</h3><ul>${v.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
$("#exp").innerHTML=S.experience.map(e=>`<div><p class="mono">${esc(e.dates)}</p><div><h3>${esc(e.role)}</h3><p>${esc(e.org)}</p><p>${esc(e.desc)}</p></div></div>`).join("");
$("#edu").innerHTML=S.education.map(e=>`<div><p class="mono">${esc(e.dates)}</p><div><h3>${esc(e.degree)}</h3><p>${esc(e.school)}</p><p>${esc(e.desc)}</p></div></div>`).join("");
$("#ach").innerHTML=S.achievements.map(a=>`<div><p class="mono">${esc(a.type)}</p>${esc(a.title)}</div>`).join("");
$("#dl").href=S.resume;
const mailto=S.email?"mailto:"+S.email:"#contact";$("#mail").href=mailto;if(!S.email)$("#mail").textContent="Get in touch [ADD EMAIL]";
[["gh",S.github],["li",S.linkedin]].forEach(([id,u])=>{if(u){const a=$("#"+id);a.href=u;a.hidden=false;a.target="_blank";a.rel="noopener"}});
$("#form").onsubmit=e=>{e.preventDefault();if(!S.email){alert("Add your email in data/site.js first.");return}const f=e.target;
location.href=`mailto:${S.email}?subject=${encodeURIComponent("Portfolio message from "+f.n.value)}&body=${encodeURIComponent(f.m.value)}`};
// ---- nav + interactions
const menu=$(".menu"),links=$("#links");menu.onclick=()=>{const o=links.classList.toggle("open");menu.setAttribute("aria-expanded",o)};
links.onclick=()=>links.classList.remove("open");
document.addEventListener("click",e=>{const o=e.target.closest("[data-open]"),f=e.target.closest("[data-f]");
if(o){location.hash="/p/"+o.dataset.open}if(f)showAll(f.dataset.f)});
// ---- project detail (hash routed: GitHub Pages safe)
const det=$("#detail");
function route(){const m=location.hash.match(/^#\/p\/(.+)$/),p=m&&bySlug(m[1]);
if(!p){det.hidden=true;document.body.style.overflow="";return}
const rel=P.filter(x=>x!==p&&x.category===p.category).slice(0,2);
det.innerHTML=`<div><button class="btn ghost" id="back">← Back</button><p class="mono" style="margin-top:2rem">${p.category} ${p.year||""}</p><h1 style="font-size:clamp(2rem,5vw,3.4rem);margin:.2em 0">${esc(p.title)}</h1><p>${esc(p.description)}</p>
<div class="thumb">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}">`:`<span class="mono">NO IMAGE YET</span>`}</div>
${p.problem?`<h4>Problem</h4><p>${esc(p.problem)}</p><h4>Approach</h4><p>${esc(p.approach)}</p><h4>Key features</h4><ul>${(p.features||[]).map(f=>`<li>${esc(f)}</li>`).join("")}</ul><h4>Outcome</h4><p>${esc(p.outcome)}</p>`:""}
<h4>Technologies</h4><p class="mono">${(p.technologies.length?p.technologies:["[TECH]"]).map(esc).join(" • ")}</p>
<div class="cta">${p.github?`<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">Access repository</a>`:""}${p.demo?`<a class="btn ghost" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>`:""}</div>
${rel.length?`<h4>Related</h4><div class="grid">${rel.map(card).join("")}</div>`:""}</div>`;
det.hidden=false;det.scrollTop=0;document.body.style.overflow="hidden";$("#back").focus();$("#back").onclick=()=>{location.hash="#work"}}
addEventListener("hashchange",route);route();addEventListener("keydown",e=>{if(e.key==="Escape"&&!det.hidden)location.hash="#work"});
// ---- globe (2D canvas orthographic: no WebGL needed, so no fallback failure mode)
function globe(){
const cv=$("#globe"),ctx=cv.getContext("2d");if(!ctx){cv.hidden=true;return}
const pop=$("#pop"),rad=Math.PI/180,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
let lam=-70*rad,phi=15*rad,zoom=1,W=0,drag=null,vis=true,sel=null,land=null,hits=[];
const size=()=>{const d=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;cv.width=cv.height=W*d;ctx.setTransform(d,0,0,d,0,0)};
const pr=(la,lo)=>{la*=rad;lo*=rad;const c=Math.cos(la),dl=lo-lam,R=W/2*.9*zoom;
return{x:W/2+R*c*Math.sin(dl),y:W/2-R*(Math.cos(phi)*Math.sin(la)-Math.sin(phi)*c*Math.cos(dl)),v:Math.sin(phi)*Math.sin(la)+Math.cos(phi)*c*Math.cos(dl)>0}};
const line=pts=>{ctx.beginPath();let on=false;for(const[la,lo]of pts){const p=pr(la,lo);if(p.v){on?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);on=true}else on=false}ctx.stroke()};
function draw(){const R=W/2*.9*zoom,c=W/2;ctx.clearRect(0,0,W,W);
const g=ctx.createRadialGradient(c*.8,c*.7,R*.1,c,c,R);g.addColorStop(0,"#10303b");g.addColorStop(1,"#08141b");
ctx.beginPath();ctx.arc(c,c,R,0,7);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle="rgba(50,214,200,.5)";ctx.lineWidth=1.5;ctx.stroke();
ctx.lineWidth=.6;ctx.strokeStyle="rgba(50,214,200,.18)";
for(let lo=-180;lo<180;lo+=30){const a=[];for(let la=-90;la<=90;la+=5)a.push([la,lo]);line(a)}
for(let la=-60;la<=60;la+=30){const a=[];for(let lo=-180;lo<=180;lo+=5)a.push([la,lo]);line(a)}
if(land){ctx.strokeStyle="rgba(50,214,200,.7)";ctx.lineWidth=.8;land.forEach(r=>line(r))}
hits=[];ctx.font="11px "+getComputedStyle(document.body).getPropertyValue("--mono");
P.filter(p=>p.loc).forEach(p=>{const q=pr(p.loc[0],p.loc[1]);if(!q.v)return;hits.push({p,x:q.x,y:q.y});
ctx.beginPath();ctx.arc(q.x,q.y,sel===p?7:5,0,7);ctx.fillStyle="#32d6c8";ctx.fill();ctx.strokeStyle="rgba(50,214,200,.4)";ctx.lineWidth=6;ctx.stroke()})}
function loop(){if(vis&&!document.hidden){if(!drag&&!rm&&!sel)lam+=.0012;draw()}requestAnimationFrame(loop)}
function pick(x,y){const h=hits.find(h=>Math.hypot(h.x-x,h.y-y)<14);if(!h)return;sel=h.p;
pop.innerHTML=`<button class="x" aria-label="Close">×</button><p class="mono">PROJECT · ${h.p.category}</p><h3>${esc(h.p.title)}</h3><p>${esc(h.p.description)}</p><button class="btn" data-open="${h.p.slug}">Explore →</button>`;
pop.hidden=false;pop.querySelector(".x").onclick=()=>{pop.hidden=true;sel=null}}
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,m:0}};
cv.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.m+=Math.abs(dx)+Math.abs(dy);drag.x=e.clientX;drag.y=e.clientY;
lam-=dx*.006/zoom;phi=Math.max(-1.2,Math.min(1.2,phi+dy*.006/zoom))};
cv.onpointerup=e=>{if(drag&&drag.m<6){const r=cv.getBoundingClientRect();pick(e.clientX-r.left,e.clientY-r.top)}drag=null};
cv.addEventListener("wheel",e=>{if(!e.ctrlKey&&!e.shiftKey&&Math.abs(e.deltaY)<1)return;e.preventDefault();zoom=Math.max(.7,Math.min(2.2,zoom*(e.deltaY<0?1.08:.93)))},{passive:false});
cv.onkeydown=e=>{const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(k){e.preventDefault();lam+=k[0]*.1;phi=Math.max(-1.2,Math.min(1.2,phi+k[1]*.1))}if(e.key==="+")zoom=Math.min(2.2,zoom*1.1);if(e.key==="-")zoom=Math.max(.7,zoom*.9)};
new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(cv);new ResizeObserver(size).observe(cv);size();loop();
// optional coastlines: drop a GeoJSON at data/land.json (Polygon/MultiPolygon). Silently skipped if absent.
fetch("data/land.json").then(r=>r.ok?r.json():null).then(j=>{if(!j)return;const rings=[];
(j.features||[j]).forEach(f=>{const g=f.geometry||f;(g.type==="Polygon"?[g.coordinates]:g.coordinates||[]).forEach(poly=>poly.forEach(r=>rings.push(r.map(([lo,la])=>[la,lo]))))});land=rings}).catch(()=>{})}
"requestIdleCallback"in window?requestIdleCallback(globe):setTimeout(globe,50);
})();
