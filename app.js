(function(){
const{iso,parse,esc,fmt,all,local,LS,showEvent,open,close,ics,download}=EM;
const today=new Date();let cur=new Date(today.getFullYear(),today.getMonth(),1);let view="month";
const q=new URLSearchParams(location.search);if(q.get("m")){const[y,m]=q.get("m").split("-").map(Number);cur=new Date(y,m-1,1)}
const $=s=>document.querySelector(s);
const inDay=(e,d)=>e.start<=d&&(e.end||e.start)>=d;
function render(){
 $("#title").textContent=cur.toLocaleDateString("en-US",{month:"long"}).toUpperCase();
 $("#year").textContent=cur.getFullYear();
 $("#vMonth").classList.toggle("on",view==="month");$("#vList").classList.toggle("on",view==="list");
 $("#vMonth").setAttribute("aria-pressed",view==="month");$("#vList").setAttribute("aria-pressed",view==="list");
 const ev=all();const out=$("#out");
 if(view==="month"){
  const first=new Date(cur);const off=(first.getDay()+6)%7;const start=new Date(cur.getFullYear(),cur.getMonth(),1-off);
  let h='<div class="grid" role="grid" aria-label="Month">'+["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d=>`<div class="dow" role="columnheader">${d}</div>`).join("");
  const cells=Math.ceil((off+new Date(cur.getFullYear(),cur.getMonth()+1,0).getDate())/7)*7;
  for(let i=0;i<cells;i++){const d=new Date(start);d.setDate(start.getDate()+i);const s=iso(d);const es=ev.filter(e=>inDay(e,s));
   h+=`<div class="day${d.getMonth()!==cur.getMonth()?" out":""}${s===iso(today)?" today":""}" role="gridcell" data-d="${s}" aria-label="${fmt(s)}${es.length?", "+es.length+" events":""}"><span class="n">${d.getDate()}</span>${es.map(e=>`<button class="tag c-${esc(e.category)}${e.draft?" draft":""}" data-id="${esc(e.id)}" title="${esc(e.title)}">${esc(e.title)}</button>`).join("")}</div>`;}
  out.innerHTML=h+"</div>";
 }else{
  const fromM=iso(cur);const list=ev.filter(e=>(e.end||e.start)>=fromM);
  out.innerHTML='<div class="list">'+(list.length?list.map(e=>`<div class="row" role="button" tabindex="0" data-id="${esc(e.id)}"><span class="meta">${fmt(e.start)}${e.end&&e.end!==e.start?"<br>→ "+fmt(e.end):""}</span><div><h3>${esc(e.title)}</h3><span class="meta">${esc(e.location||"")}</span></div><span class="tag c-${esc(e.category)}">${esc(e.category)}${e.draft?" · draft":""}</span></div>`).join(""):'<p class="meta">No upcoming events.</p>')+"</div>";
 }
}
$("#out").addEventListener("click",ev=>{const t=ev.target.closest("[data-id]");const all_=all();
 if(t&&!(window.innerWidth<=720&&t.classList.contains("tag"))){showEvent(all_.find(e=>e.id===t.dataset.id),render);return}
 const day=ev.target.closest(".day");if(!day)return;const es=all_.filter(e=>inDay(e,day.dataset.d));if(!es.length)return;
 if(es.length===1&&window.innerWidth>720){showEvent(es[0],render);return}
 open(`<p class="meta">Day</p><h2>${fmt(day.dataset.d)}</h2><div class="list">${es.map(e=>`<div class="row" role="button" tabindex="0" data-pick="${esc(e.id)}"><div><h3>${esc(e.title)}</h3><span class="meta">${esc(e.category)}${e.draft?" · draft":""}</span></div></div>`).join("")}</div>`);
 document.querySelectorAll("[data-pick]").forEach(r=>r.onclick=()=>showEvent(es.find(e=>e.id===r.dataset.pick),render));
});
$("#out").addEventListener("keydown",k=>{if(k.key==="Enter"&&k.target.matches(".row"))k.target.click()});
$("#prev").onclick=()=>{cur.setMonth(cur.getMonth()-1);render()};$("#next").onclick=()=>{cur.setMonth(cur.getMonth()+1);render()};
$("#today").onclick=()=>{cur=new Date(today.getFullYear(),today.getMonth(),1);render()};
$("#vMonth").onclick=()=>{view="month";render()};$("#vList").onclick=()=>{view="list";render()};
$("#jump").onclick=()=>{cur=new Date(2027,4,1);render()};
$("#export").onclick=()=>download("emordes-calendar.ics",ics(all()));
$("#add").onclick=()=>{open(`<p class="meta">New event · saved in this browser</p><h2>Add event</h2><form class="add">
<label>Title<input name="title" required></label><label>Start<input type="date" name="start" required value="${iso(today)}"></label><label>End (optional)<input type="date" name="end"></label>
<label>Time (optional)<input type="time" name="time"></label><label>Category<select name="category"><option>travel</option><option>work</option><option>studio</option><option>personal</option></select></label>
<label>Location<input name="location"></label><label>Notes<textarea name="notes" rows="3"></textarea></label><button>Save event</button></form>`);
 document.querySelector("form.add").onsubmit=f=>{f.preventDefault();const d=Object.fromEntries(new FormData(f.target));if(!d.end)delete d.end;if(!d.time)delete d.time;d.id="local-"+Date.now();
  if(d.end&&d.end<d.start)d.end=d.start;localStorage.setItem(LS,JSON.stringify([...local(),d]));close();cur=new Date(parse(d.start).getFullYear(),parse(d.start).getMonth(),1);render()}};
render();
if(q.get("open")){const e=all().find(x=>x.id===q.get("open"));if(e)showEvent(e,render)}
})();
