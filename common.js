(function(){
const LS="emordes-cal-events",CK="emordes-cal-checks";
const pad=n=>String(n).padStart(2,"0");
const iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parse=s=>{const[a,b,c]=s.split("-").map(Number);return new Date(a,b-1,c)};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=s=>parse(s).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).toUpperCase();
const local=()=>{try{return JSON.parse(localStorage.getItem(LS))||[]}catch(e){return[]}};
const all=()=>[...(window.EMORDES_EVENTS||[]),...local().map(e=>({...e,local:true}))].sort((a,b)=>a.start.localeCompare(b.start));
const checks=()=>{try{return JSON.parse(localStorage.getItem(CK))||{}}catch(e){return{}}};
const addDays=(s,n)=>{const d=parse(s);d.setDate(d.getDate()+n);return iso(d)};
function dt(e){const s=e.start.replace(/-/g,"");if(e.time){const t=e.time.replace(":","")+"00";const end=e.endTime?e.endTime.replace(":","")+"00":pad(Math.min(23,+e.time.slice(0,2)+1))+e.time.slice(3,5)+"00";return[s+"T"+t,(e.end||e.start).replace(/-/g,"")+"T"+end]}return[s,addDays(e.end||e.start,1).replace(/-/g,"")]}
function gcal(e){const[a,b]=dt(e);const p=new URLSearchParams({action:"TEMPLATE",text:e.title,dates:a+"/"+b,details:e.notes||"",location:e.location||""});return"https://calendar.google.com/calendar/render?"+p}
const icsEsc=s=>String(s||"").replace(/[\\;,]/g,m=>"\\"+m).replace(/\n/g,"\\n");
function ics(list){const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Emordes//Calendar//EN"];list.forEach(e=>{const[a,b]=dt(e);const allday=!e.time;L.push("BEGIN:VEVENT","UID:"+e.id+"@emordes.studio","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",(allday?"DTSTART;VALUE=DATE:":"DTSTART:")+a,(allday?"DTEND;VALUE=DATE:":"DTEND:")+b,"SUMMARY:"+icsEsc(e.title),"DESCRIPTION:"+icsEsc(e.notes),"LOCATION:"+icsEsc(e.location),"END:VEVENT")});L.push("END:VCALENDAR");return L.join("\r\n")}
function download(name,text){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/calendar"}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
// panel
let panel,scrim,lastFocus;
function ensure(){if(panel)return;scrim=document.createElement("div");scrim.className="scrim";panel=document.createElement("aside");panel.className="panel";panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");panel.setAttribute("aria-label","Event details");panel.tabIndex=-1;document.body.append(scrim,panel);scrim.onclick=close;document.addEventListener("keydown",k=>{if(k.key==="Escape")close()})}
function open(html){ensure();lastFocus=document.activeElement;panel.innerHTML='<button class="x" style="float:right" aria-label="Close panel">Close ✕</button>'+html;panel.querySelector(".x").onclick=close;panel.classList.add("open");scrim.classList.add("open");panel.focus()}
function close(){if(!panel||!panel.classList.contains("open"))return;panel.classList.remove("open");scrim.classList.remove("open");lastFocus&&lastFocus.focus()}
function showEvent(e,onChange){const c=checks();const when=fmt(e.start)+(e.end&&e.end!==e.start?" → "+fmt(e.end):"");
open(`<p class="meta">${esc(e.category)} ${e.draft?'<span class="draftb">DRAFT / SUGGESTED</span>':""} ${e.local?'<span class="draftb">LOCAL</span>':""}</p><h2>${esc(e.title)}</h2>
<dl class="kv"><dt>Date</dt><dd>${when}</dd><dt>Time</dt><dd>${esc(e.time||"All day")}</dd>${e.location?`<dt>Location</dt><dd>${esc(e.location)}</dd>`:""}${e.notes?`<dt>Notes</dt><dd>${esc(e.notes)}</dd>`:""}
${e.links&&e.links.length?`<dt>Links</dt><dd>${e.links.map(l=>`<a href="${esc(l.url)}" ${/^https?:/.test(l.url)?'target="_blank" rel="noopener"':""}>${esc(l.label)} ↗</a>`).join("<br>")}</dd>`:""}</dl>
${e.checklist&&e.checklist.length?`<p class="meta">Checklist</p><div class="check">${e.checklist.map((t,i)=>`<label><input type="checkbox" data-k="${esc(e.id)}:${i}" ${c[e.id+":"+i]?"checked":""}> ${esc(t)}</label>`).join("")}</div><br>`:""}
<div class="ctrl"><a class="btn" target="_blank" rel="noopener" href="${esc(gcal(e))}">+ Google Calendar</a><button class="ics">Download .ics</button>${e.trip?`<a class="btn" href="${esc(e.trip)}">Trip page →</a>`:""}${e.local?'<button class="del">Delete</button>':""}</div>`);
panel.querySelector(".ics").onclick=()=>download(e.id+".ics",ics([e]));
panel.querySelectorAll(".check input").forEach(i=>i.onchange=()=>{const c=checks();c[i.dataset.k]=i.checked;localStorage.setItem(CK,JSON.stringify(c))});
const d=panel.querySelector(".del");if(d)d.onclick=()=>{localStorage.setItem(LS,JSON.stringify(local().filter(x=>x.id!==e.id)));close();onChange&&onChange()}}
window.EM={pad,iso,parse,esc,fmt,all,local,LS,addDays,gcal,ics,download,open,close,showEvent};
})();
