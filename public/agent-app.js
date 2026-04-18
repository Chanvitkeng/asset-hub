// Asset Hub Agent — Vanilla JS App
// Loaded by /dashboard, reads window.__INIT and saves via window.__SB

// ── Inject CSS ──
(function(){
  if(document.getElementById('ah-styles'))return;
  const s=document.createElement('style');
  s.id='ah-styles';
  s.textContent=`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
:root{--indigo:#6366f1;--indigo-dk:#4f46e5;--indigo-lt:#eef2ff;--green:#10b981;--green-lt:#ecfdf5;--amber:#f59e0b;--amber-lt:#fffbeb;--red:#ef4444;--red-lt:#fef2f2;--purple:#8b5cf6;--purple-lt:#f5f3ff;--blue:#3b82f6;--blue-lt:#eff6ff;--pink:#ec4899;--pink-lt:#fdf2f8;--g50:#f9fafb;--g100:#f3f4f6;--g200:#e5e7eb;--g300:#d1d5db;--g400:#9ca3af;--g500:#6b7280;--g600:#4b5563;--g700:#374151;--g900:#111827}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Noto Sans Thai',-apple-system,sans-serif;background:var(--g50);color:var(--g900);font-size:14px}
button{cursor:pointer;border:none;font-family:inherit;font-size:13px}
input,select,textarea{font-family:inherit;font-size:13px}
a{text-decoration:none}
.app{display:flex;min-height:100vh}
.sidebar{width:220px;background:#fff;border-right:1px solid var(--g100);position:fixed;height:100vh;display:flex;flex-direction:column;padding:16px;z-index:30;overflow-y:auto}
.logo{display:flex;align-items:center;gap:10px;margin-bottom:8px;padding:8px 4px}
.logo-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--indigo),var(--purple));border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0}
.logo h1{font-size:13px;font-weight:700;line-height:1.2}
.logo small{font-size:10px;color:var(--g400);display:block}
.sb-section{font-size:10px;font-weight:600;color:var(--g400);text-transform:uppercase;letter-spacing:.05em;padding:12px 12px 4px}
nav .ni{width:100%;display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:10px;color:var(--g600);background:none;transition:all .15s;margin-bottom:1px;text-align:left;font-size:13px}
nav .ni:hover{background:var(--g50)}
nav .ni.on{background:var(--indigo-lt);color:var(--indigo);font-weight:500}
nav .ni .cnt{margin-left:auto;font-size:10px;background:var(--g100);color:var(--g500);padding:2px 7px;border-radius:10px}
nav .ni .cnt.red{background:var(--red-lt);color:var(--red)}
.sb-foot{margin-top:auto;padding-top:12px;border-top:1px solid var(--g100);font-size:11px;color:var(--g400)}
.main{flex:1;margin-left:220px;min-height:100vh}
.mc{max-width:960px;margin:0 auto;padding:24px}
.mh{display:none;position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--g100);padding:10px 16px;z-index:40;align-items:center;gap:12px}
.mn{display:none;position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.97);border-top:1px solid var(--g100);z-index:40;padding:4px 0}
.mn-in{display:flex;justify-content:space-around}
.mn-b{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border-radius:10px;background:none;color:var(--g400);font-size:10px}
.mn-b.on{color:var(--indigo)}
.mn-b span:first-child{font-size:18px}
.hb{font-size:20px;background:none;color:var(--g600);width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px}
@media(max-width:768px){.sidebar{display:none}.main{margin-left:0}.mc{padding:58px 14px 72px}.mh,.mn{display:flex}.g4{grid-template-columns:repeat(2,1fr)!important}.g2{grid-template-columns:1fr!important}.hm{display:none!important}}
.card{background:#fff;border-radius:16px;border:1px solid var(--g100);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.ck{cursor:pointer;transition:all .2s}.ck:hover{box-shadow:0 4px 16px rgba(0,0,0,.09);transform:translateY(-2px)}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.sy>*+*{margin-top:16px}
.sc{padding:14px;display:flex;align-items:flex-start;gap:10px}
.sc-i{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.sc-l{font-size:11px;color:var(--g500);margin-bottom:2px}
.sc-v{font-size:15px;font-weight:700}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500;gap:3px}
.b-i{background:var(--indigo-lt);color:var(--indigo)}.b-g{background:var(--green-lt);color:var(--green)}.b-r{background:var(--red-lt);color:var(--red)}.b-y{background:var(--amber-lt);color:var(--amber)}.b-bl{background:var(--blue-lt);color:var(--blue)}.b-p{background:var(--purple-lt);color:var(--purple)}.b-pk{background:var(--pink-lt);color:var(--pink)}
.ph{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}
.ph h2{font-size:20px;font-weight:700}.ph p{font-size:12px;color:var(--g500)}
.sb{padding:10px 12px;border-radius:12px;text-align:center}
.sb .sl{font-size:10px;color:var(--g400)}.sb .sv{font-size:13px;font-weight:600;margin-top:2px}
.bg-g{background:var(--g50)}.bg-gn{background:var(--green-lt)}.bg-rd{background:var(--red-lt)}.bg-am{background:var(--amber-lt)}.bg-in{background:var(--indigo-lt)}.bg-pu{background:var(--purple-lt)}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:var(--g50)}
th{padding:9px 14px;font-weight:500;color:var(--g500);text-align:left}
th.r,td.r{text-align:right}th.c,td.c{text-align:center}
td{padding:9px 14px;border-top:1px solid var(--g50)}
tr:hover td{background:var(--g50)}
.es{padding:40px;text-align:center}.es .ei{font-size:36px;margin-bottom:10px}.es p{color:var(--g500);font-size:13px}
.toast{position:fixed;top:16px;right:16px;z-index:70;padding:10px 18px;border-radius:12px;color:#fff;font-size:13px;font-weight:500;background:var(--green);box-shadow:0 4px 12px rgba(0,0,0,.15);animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fu .25s ease}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px}
.mdl{background:#fff;border-radius:16px;width:100%;max-width:460px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:fu .2s ease}
.mdl.w{max-width:540px}.mdl.xw{max-width:720px}
.mdl-h{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--g100)}
.mdl-h h3{font-size:15px;font-weight:700}
.mdl-x{width:30px;height:30px;border-radius:8px;background:none;color:var(--g400);font-size:18px;display:flex;align-items:center;justify-content:center}
.mdl-x:hover{background:var(--g100)}
.mdl-b{padding:20px}
.ff{margin-bottom:12px}.ff label{display:block;font-size:12px;font-weight:500;color:var(--g700);margin-bottom:4px}
.fi{width:100%;padding:8px 12px;border:1px solid var(--g200);border-radius:10px;font-size:13px;outline:none;transition:border .15s}
.fi:focus{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.btn{padding:9px 16px;border-radius:10px;font-size:13px;font-weight:500;transition:all .15s}
.bp{background:var(--indigo);color:#fff}.bp:hover{background:var(--indigo-dk)}
.bs{background:var(--g100);color:var(--g600)}.bs:hover{background:var(--g200)}
.br{display:flex;gap:8px;margin-top:16px}.br .btn{flex:1;text-align:center}
.eb{width:26px;height:26px;border-radius:7px;background:none;font-size:12px;display:inline-flex;align-items:center;justify-content:center;color:var(--indigo)}
.eb:hover{background:var(--indigo-lt)}
.db{width:26px;height:26px;border-radius:7px;background:none;font-size:12px;display:inline-flex;align-items:center;justify-content:center;color:var(--red)}
.db:hover{background:var(--red-lt)}
.client-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.client-card{background:#fff;border-radius:16px;border:1px solid var(--g100);padding:16px;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.client-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.1);transform:translateY(-2px);border-color:var(--indigo-lt)}
.client-card.urgent{border-left:4px solid var(--red)}
.client-card.soon{border-left:4px solid var(--amber)}
.client-avatar{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0}
.client-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px}
.cs-item{background:var(--g50);border-radius:8px;padding:6px 8px;text-align:center}
.cs-l{font-size:9px;color:var(--g400)}.cs-v{font-size:12px;font-weight:600;margin-top:1px}
.client-header{background:linear-gradient(135deg,var(--indigo),var(--purple));border-radius:16px;padding:20px;color:#fff;margin-bottom:16px}
.client-header .back{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.75);cursor:pointer;margin-bottom:12px;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:8px;transition:background .15s}
.client-header .back:hover{background:rgba(255,255,255,.25)}
.client-tabs{display:flex;gap:4px;margin-top:16px;background:rgba(255,255,255,.12);border-radius:10px;padding:3px}
.ct{padding:6px 14px;border-radius:8px;font-size:12px;font-weight:500;color:rgba(255,255,255,.75);background:none;cursor:pointer;transition:all .15s}
.ct.on{background:#fff;color:var(--indigo)}
.day-badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600}
.day-urgent{background:var(--red-lt);color:var(--red)}.day-soon{background:var(--amber-lt);color:var(--amber)}.day-ok{background:var(--green-lt);color:var(--green)}
.report-section{margin-bottom:16px}
.report-section h4{font-size:13px;font-weight:600;color:var(--g700);margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--g100)}
@media print{.sidebar,.mh,.mn,#modal-root,.no-print{display:none!important}.main{margin-left:0}.mc{padding:16px}.card{box-shadow:none;border:1px solid #ddd}body{font-size:12px}}
.upload-zone{border:2px dashed var(--g300);border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:all .2s;background:var(--g50)}
.upload-zone:hover{border-color:var(--indigo);background:var(--indigo-lt)}
.img-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}
.img-thumb{position:relative;aspect-ratio:3/4;border-radius:8px;overflow:hidden;border:1px solid var(--g200)}
.img-thumb img{width:100%;height:100%;object-fit:cover}
.img-thumb .del-img{position:absolute;top:3px;right:3px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none}
.policy-img-strip{display:flex;gap:5px;overflow-x:auto;padding:3px 0;margin-top:8px}
.policy-img-strip img{height:56px;width:42px;object-fit:cover;border-radius:6px;border:1px solid var(--g200);flex-shrink:0;cursor:pointer}
.sv-table{width:100%;font-size:11px;border-collapse:collapse}
.sv-table td{padding:4px 8px;border-top:1px solid var(--g100)}
.sv-table tr.hi-row td{background:var(--indigo-lt);font-weight:600;color:var(--indigo)}
.analysis-section{margin-top:12px;padding:12px;border-radius:12px;background:linear-gradient(135deg,var(--indigo-lt),var(--purple-lt));border:1px solid rgba(99,102,241,.15)}
.spin{display:inline-block;animation:spin 1s linear infinite}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.chart-strip{display:flex;align-items:center;gap:16px;padding:14px 18px;background:#fff;border-radius:12px;margin-bottom:12px;border:1px solid var(--g100);flex-wrap:wrap}
.chart-legend{display:flex;flex-wrap:wrap;gap:6px 10px;flex:1;min-width:180px}
.cl-item{display:flex;align-items:center;gap:6px;font-size:12px;width:calc(50% - 5px)}
.cl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.rpt-hdr{background:linear-gradient(135deg,var(--indigo),var(--purple));border-radius:12px;padding:18px 22px;color:#fff;margin-bottom:16px}
.rpt-tbl{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px}
.rpt-tbl th{background:var(--g50);padding:7px 10px;font-weight:600;color:var(--g700);text-align:left;border-bottom:2px solid var(--g200)}
.rpt-tbl td{padding:7px 10px;border-bottom:1px solid var(--g100);vertical-align:top}
.rpt-tbl tr:last-child td{border-bottom:none}
.rpt-tbl .r{text-align:right}
@media print{.rpt-hdr{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:linear-gradient(135deg,#6366f1,#8b5cf6)!important}.mdl-x,.no-print,.br{display:none!important}.ov{position:static!important;background:none!important;padding:0!important}.mdl{max-width:100%!important;box-shadow:none!important;border-radius:0!important;max-height:none!important;overflow:visible!important;border:none!important}}
  `;
  document.head.appendChild(s);
})();

// ── Utils ──
const fmt=n=>new Intl.NumberFormat('th-TH').format(Math.round(n));
const fmtD=n=>new Intl.NumberFormat('th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const pct=n=>(n>=0?'+':'')+n.toFixed(2)+'%';
const FX=35;
const $=s=>document.querySelector(s);

// ── Data (Supabase-backed) ──
const COLORS=['#6366f1','#10b981','#f59e0b','#3b82f6','#8b5cf6','#ec4899','#ef4444','#14b8a6'];
function clientColor(id){return COLORS[(id-1)%COLORS.length];}

const defData={
  agentName:'ตัวแทนประกัน',
  clients:[]
};

let D = window.__INIT ? JSON.parse(JSON.stringify(window.__INIT)) : JSON.parse(JSON.stringify(defData));

function save(){
  // Save to Supabase in background
  if(window.__SB && window.__UID){
    window.__SB.from('app_state').upsert({
      user_id: window.__UID,
      data: D,
      updated_at: new Date().toISOString()
    }).then(({error})=>{ if(error) console.warn('Save error:',error.message); });
  }
}

async function doLogout(){
  if(window.__SB) await window.__SB.auth.signOut();
  window.location.href='/login';
}

let curPage='clients';
let curClientId=null;
let curClientTab='insurance';
let toastTimer=null;
function showToast(msg){const t=$('#toast');if(!t)return;t.textContent='✓ '+msg;t.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.style.display='none',2500);}

// ── Calc ──
function calcClient(c){
  if(!c)return{sv:0,sc:0,fv:0,fc:0,pv:0,pc:0,iv:0,ic:0,iprem:0,total:0,rent:0};
  const sv=(c.stocks||[]).reduce((s,t)=>s+t.qty*t.price*(t.mkt==='US'?FX:1),0);
  const sc=(c.stocks||[]).reduce((s,t)=>s+t.qty*t.cost*(t.mkt==='US'?FX:1),0);
  const fv=(c.funds||[]).reduce((s,f)=>s+f.nav*f.units,0);
  const fc=(c.funds||[]).reduce((s,f)=>s+f.cost*f.units,0);
  const pv=(c.props||[]).reduce((s,p)=>s+p.val,0);
  const pc=(c.props||[]).reduce((s,p)=>s+p.buy,0);
  const rent=(c.props||[]).reduce((s,p)=>s+(p.rent||0),0);
  const iv=(c.insurance||[]).reduce((s,i)=>s+(i.curVal||0),0);
  const ic=(c.insurance||[]).reduce((s,i)=>s+(i.totalPaid||0),0);
  const iprem=(c.insurance||[]).filter(i=>i.status==='active').reduce((s,i)=>s+i.premium,0);
  return{sv,sc,fv,fc,pv,pc,iv,ic,iprem,rent,total:sv+fv+pv+iv};
}

function getAllRenewals(){
  const list=[];
  (D.clients||[]).forEach(c=>{
    (c.insurance||[]).forEach(ins=>{
      if(!ins.dueDate||ins.status!=='active')return;
      const days=Math.ceil((new Date(ins.dueDate)-new Date())/(1000*60*60*24));
      list.push({clientId:c.id,clientName:c.name,ins,days});
    });
  });
  return list.sort((a,b)=>a.days-b.days);
}
function urgentCount(){return getAllRenewals().filter(r=>r.days<=30&&r.days>0).length;}

// ── Charts ──
function pieSVG(items,size=130){
  const total=items.reduce((a,b)=>a+b.value,0);if(!total)return'';
  const r=size*.44,ir=size*.27,cx=size/2,cy=size/2;let cum=0,paths='';
  items.forEach(d=>{const frac=d.value/total;if(frac<=0)return;
    const s=cum*Math.PI*2-Math.PI/2;cum+=frac;const e=cum*Math.PI*2-Math.PI/2;
    const lg=frac>.5?1:0;
    const x1=cx+r*Math.cos(s),y1=cy+r*Math.sin(s),x2=cx+r*Math.cos(e),y2=cy+r*Math.sin(e);
    const ix1=cx+ir*Math.cos(e),iy1=cy+ir*Math.sin(e),ix2=cx+ir*Math.cos(s),iy2=cy+ir*Math.sin(s);
    paths+=`<path d="M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${lg} 0 ${ix2} ${iy2} Z" fill="${d.color}"/>`;
  });
  return`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${paths}</svg>`;
}
function clientChartStrip(c){
  const cal=calcClient(c);
  const items=[{name:'หุ้น',value:cal.sv,color:'#6366f1'},{name:'กองทุน',value:cal.fv,color:'#f59e0b'},{name:'ประกัน',value:cal.iv,color:'#ec4899'},{name:'อสังหาฯ',value:cal.pv,color:'#10b981'}].filter(d=>d.value>0);
  if(!items.length)return'';
  const total=items.reduce((s,d)=>s+d.value,0);
  return`<div class="chart-strip">${pieSVG(items,90)}<div class="chart-legend">${items.map(d=>`<div class="cl-item"><div class="cl-dot" style="background:${d.color}"></div><span style="color:var(--g500)">${d.name}</span><span style="font-weight:600;margin-left:auto">฿${fmt(d.value)}</span><span style="color:var(--g400);font-size:10px;margin-left:4px">${(d.value/total*100).toFixed(0)}%</span></div>`).join('')}<div style="width:100%;border-top:1px solid var(--g100);padding-top:7px;margin-top:3px;display:flex;justify-content:space-between;font-size:13px"><span style="font-weight:700;color:var(--g700)">รวมทั้งหมด</span><span style="font-weight:700;color:var(--indigo)">฿${fmt(total)}</span></div></div></div>`;
}
function statCard(icon,label,val,color){
  const bg={indigo:'#eef2ff',green:'#ecfdf5',red:'#fef2f2',yellow:'#fffbeb',blue:'#eff6ff',purple:'#f5f3ff',pink:'#fdf2f8'};
  return`<div class="card sc"><div class="sc-i" style="background:${bg[color]||bg.indigo}">${icon}</div><div><div class="sc-l">${label}</div><div class="sc-v">${val}</div></div></div>`;
}

// ── Pages ──
function renderDashboard(){
  const allCV=D.clients.map(c=>({c,cal:calcClient(c)}));
  const totalAUM=allCV.reduce((s,x)=>s+x.cal.total,0);
  const totalPrem=allCV.reduce((s,x)=>s+x.cal.iprem,0);
  const renewals=getAllRenewals().filter(r=>r.days<=30&&r.days>0);
  const pie=[{name:'หุ้น',value:allCV.reduce((s,x)=>s+x.cal.sv,0),color:'#6366f1'},{name:'กองทุน',value:allCV.reduce((s,x)=>s+x.cal.fv,0),color:'#f59e0b'},{name:'ประกัน',value:allCV.reduce((s,x)=>s+x.cal.iv,0),color:'#ec4899'},{name:'อสังหาฯ',value:allCV.reduce((s,x)=>s+x.cal.pv,0),color:'#10b981'}].filter(d=>d.value>0);
  return`<div class="sy fade">
    <div class="ph"><div><h2>ภาพรวมพอร์ต</h2><p>สรุปสินทรัพย์ลูกค้าทั้งหมด</p></div></div>
    <div class="g4">
      ${statCard('👥','ลูกค้าทั้งหมด',D.clients.length+' คน','indigo')}
      ${statCard('💰','AUM รวม','฿'+fmt(totalAUM),'green')}
      ${statCard('🛡️','เบี้ยรวม/ปี','฿'+fmt(totalPrem),'pink')}
      ${statCard('🔔','ครบกำหนด 30 วัน',renewals.length+' ฉบับ',renewals.length>0?'red':'green')}
    </div>
    <div class="g2">
      <div class="card" style="padding:18px">
        <h3 style="font-weight:600;margin-bottom:12px">สัดส่วนสินทรัพย์</h3>
        ${pie.length?`<div style="display:flex;align-items:center;gap:16px">${pieSVG(pie)}<div style="display:flex;flex-direction:column;gap:6px">${pie.map(d=>`<div style="display:flex;align-items:center;gap:7px;font-size:12px"><div style="width:10px;height:10px;border-radius:50%;background:${d.color};flex-shrink:0"></div><span style="color:var(--g600)">${d.name}</span><span style="margin-left:auto;font-weight:500">฿${fmt(d.value)}</span></div>`).join('')}</div></div>`:'<p style="color:var(--g400);padding:20px 0;text-align:center">ยังไม่มีข้อมูล</p>'}
      </div>
      <div class="card" style="padding:18px">
        <h3 style="font-weight:600;margin-bottom:12px">Top ลูกค้า (by AUM)</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${[...allCV].sort((a,b)=>b.cal.total-a.cal.total).slice(0,4).map(x=>{
            const p=totalAUM>0?(x.cal.total/totalAUM*100).toFixed(0):0;
            return`<div style="display:flex;align-items:center;gap:10px"><div style="width:36px;height:36px;border-radius:10px;background:${clientColor(x.c.id)};display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0">${x.c.name.charAt(0)}</div><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.c.name}</div><div style="height:5px;background:var(--g100);border-radius:3px;margin-top:4px"><div style="height:100%;width:${p}%;background:${clientColor(x.c.id)};border-radius:3px"></div></div></div><div style="font-size:12px;font-weight:600;flex-shrink:0">฿${fmt(x.cal.total)}</div></div>`;
          }).join('')}
        </div>
      </div>
    </div>
    ${renewals.length?`<div class="card" style="padding:18px"><h3 style="font-weight:600;margin-bottom:12px">🔔 ครบกำหนดเบี้ยใน 30 วัน</h3><div class="tw"><table><thead><tr><th>ลูกค้า</th><th>กรมธรรม์</th><th class="r">เบี้ย/ปี</th><th class="c">ครบกำหนด</th><th class="c">เหลือ</th></tr></thead><tbody>${renewals.map(r=>`<tr><td><span style="cursor:pointer;color:var(--indigo);font-weight:500" onclick="openClient(${r.clientId})">${r.clientName}</span></td><td>${r.ins.plan}</td><td class="r">฿${fmt(r.ins.premium)}</td><td class="c" style="font-size:12px">${r.ins.dueDate}</td><td class="c"><span class="day-badge ${r.days<=7?'day-urgent':'day-soon'}">${r.days} วัน</span></td></tr>`).join('')}</tbody></table></div></div>`:''}
  </div>`;
}

function renderClients(){
  const renewals=getAllRenewals();
  const urgMap={};
  renewals.forEach(r=>{if(!urgMap[r.clientId]||urgMap[r.clientId]>r.days)urgMap[r.clientId]=r.days;});
  return`<div class="sy fade">
    <div class="ph">
      <div><h2>ลูกค้าทั้งหมด</h2><p>${D.clients.length} คน ในระบบ</p></div>
      <button class="btn bp" onclick="openClientForm()">+ เพิ่มลูกค้า</button>
    </div>
    ${D.clients.length===0
      ?`<div class="card es"><div class="ei">👥</div><p>ยังไม่มีลูกค้า</p><button class="btn bp" style="margin-top:14px" onclick="openClientForm()">เพิ่มลูกค้าคนแรก</button></div>`
      :`<div class="client-grid">${D.clients.map(c=>{
        const cal=calcClient(c);const minDays=urgMap[c.id];const cls=minDays!==undefined?(minDays<=7?'urgent':'soon'):'';
        return`<div class="client-card ${cls}" onclick="openClient(${c.id})">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:10px">
              <div class="client-avatar" style="background:${clientColor(c.id)}">${c.name.charAt(0)}</div>
              <div><div style="font-weight:700;font-size:14px">${c.name}</div><div style="font-size:11px;color:var(--g500)">${c.age} ปี • ${c.occupation}</div><div style="font-size:11px;color:var(--g400)">${c.phone}</div></div>
            </div>
            <div style="display:flex;gap:3px" onclick="event.stopPropagation()"><button class="eb" onclick="openClientForm(${c.id})">✎</button><button class="db" onclick="confirmDelClient(${c.id},'${c.name}')">✕</button></div>
          </div>
          <div class="client-stats">
            <div class="cs-item"><div class="cs-l">AUM รวม</div><div class="cs-v" style="color:var(--indigo)">฿${fmt(cal.total)}</div></div>
            <div class="cs-item"><div class="cs-l">ประกัน</div><div class="cs-v">${(c.insurance||[]).length} ฉบับ</div></div>
            <div class="cs-item"><div class="cs-l">เบี้ย/ปี</div><div class="cs-v">฿${fmt(cal.iprem)}</div></div>
          </div>
          ${minDays!==undefined&&minDays<=30?`<div style="margin-top:8px;font-size:11px;padding:5px 8px;border-radius:8px;background:${minDays<=7?'var(--red-lt)':'var(--amber-lt)'};color:${minDays<=7?'var(--red)':'var(--amber)'}">🔔 ครบกำหนดเบี้ยใน ${minDays} วัน</div>`:''}
          ${c.notes?`<div style="margin-top:6px;font-size:11px;color:var(--g400);border-top:1px solid var(--g100);padding-top:6px">📝 ${c.notes}</div>`:''}
        </div>`;
      }).join('')}</div>`}
  </div>`;
}

function renderRenewals(){
  const all=getAllRenewals();
  const groups={urgent:all.filter(r=>r.days>0&&r.days<=7),soon:all.filter(r=>r.days>7&&r.days<=30),future:all.filter(r=>r.days>30&&r.days<=90),overdue:all.filter(r=>r.days<=0)};
  const rg=(title,items,cls)=>{
    if(!items.length)return'';
    return`<div class="card" style="padding:18px;margin-bottom:14px"><h3 style="font-weight:600;margin-bottom:12px">${title} <span class="badge ${cls}">${items.length}</span></h3><div class="tw"><table><thead><tr><th>ลูกค้า</th><th>กรมธรรม์</th><th class="r hm">เบี้ย/ปี</th><th class="c">ครบกำหนด</th><th class="c">เหลือ</th></tr></thead><tbody>${items.map(r=>`<tr><td><span style="cursor:pointer;color:var(--indigo);font-weight:500" onclick="openClient(${r.clientId},'insurance')">${r.clientName}</span></td><td><div style="font-weight:500">${r.ins.plan}</div><div style="font-size:10px;color:var(--g400)">${r.ins.co}</div></td><td class="r hm" style="font-weight:500">฿${fmt(r.ins.premium)}</td><td class="c" style="font-size:12px">${r.ins.dueDate}</td><td class="c"><span class="day-badge ${r.days<=0?'day-urgent':r.days<=7?'day-urgent':r.days<=30?'day-soon':'day-ok'}">${r.days<=0?'เกินกำหนด':r.days+' วัน'}</span></td></tr>`).join('')}</tbody></table></div></div>`;
  };
  return`<div class="sy fade"><div class="ph"><div><h2>ครบกำหนดเบี้ย</h2><p>ติดตามวันชำระเบี้ยของลูกค้าทุกคน</p></div><button class="btn bs no-print" onclick="window.print()">🖨️ พิมพ์</button></div>${!all.length?`<div class="card es"><div class="ei">✅</div><p>ไม่มีกรมธรรม์ครบกำหนด</p></div>`:''}${rg('🚨 เกินกำหนด',groups.overdue,'b-r')}${rg('🔴 ครบกำหนดใน 7 วัน',groups.urgent,'b-r')}${rg('🟡 ครบกำหนดใน 30 วัน',groups.soon,'b-y')}${rg('🟢 ครบกำหนดใน 90 วัน',groups.future,'b-g')}</div>`;
}

// ── Client Detail ──
function openClient(id,tab){curClientId=id;if(tab)curClientTab=tab;else curClientTab='insurance';render();}
function backToClients(){curClientId=null;render();}

function renderClientDetail(){
  const c=D.clients.find(x=>x.id===curClientId);if(!c)return'<p>ไม่พบลูกค้า</p>';
  const cal=calcClient(c);
  const ins=c.insurance||[];
  const nextDue=ins.filter(i=>i.dueDate&&i.status==='active').sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate))[0];
  const daysLeft=nextDue?Math.ceil((new Date(nextDue.dueDate)-new Date())/(1000*60*60*24)):null;
  let content='';
  if(curClientTab==='insurance')content=renderClientInsurance(c);
  else if(curClientTab==='stocks')content=renderClientStocks(c);
  else if(curClientTab==='funds')content=renderClientFunds(c);
  else if(curClientTab==='property')content=renderClientProperty(c);
  return`<div class="fade">
    <div class="client-header">
      <div class="back" onclick="backToClients()">← กลับหน้าลูกค้า</div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700">${c.name.charAt(0)}</div>
          <div><div style="font-size:18px;font-weight:700">${c.name}</div><div style="font-size:12px;color:rgba(255,255,255,.75)">${c.age} ปี • ${c.occupation} • ${c.phone}</div></div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(255,255,255,.15);padding:8px 14px;border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,.7)">AUM รวม</div><div style="font-size:14px;font-weight:700">฿${fmt(cal.total)}</div></div>
          <div style="text-align:center;background:rgba(255,255,255,.15);padding:8px 14px;border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,.7)">เบี้ย/ปี</div><div style="font-size:14px;font-weight:700">฿${fmt(cal.iprem)}</div></div>
          ${daysLeft!==null?`<div style="text-align:center;background:${daysLeft<=7?'rgba(239,68,68,.4)':'rgba(245,158,11,.3)'};padding:8px 14px;border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,.85)">ครบกำหนดถัดไป</div><div style="font-size:14px;font-weight:700">${daysLeft} วัน</div></div>`:''}
          <button class="btn no-print" style="background:rgba(255,255,255,.2);color:#fff;font-size:12px" onclick="openReport(${c.id})">📄 ดูรายงาน</button>
          <button class="btn no-print" style="background:rgba(255,255,255,.9);color:#6366f1;font-size:12px;font-weight:600" onclick="downloadPDF(${c.id})">📥 PDF</button>
        </div>
      </div>
      <div class="client-tabs">${[['insurance','🛡️ ประกัน'],['stocks','📈 หุ้น'],['funds','📊 กองทุน'],['property','🏠 อสังหาฯ']].map(([k,l])=>`<button class="ct${curClientTab===k?' on':''}" onclick="curClientTab='${k}';render()">${l}</button>`).join('')}</div>
    </div>
    ${clientChartStrip(c)}
    ${content}
  </div>`;
}

// ── Insurance ──
const SV_30_15={1:0,2:0,3:18.4,4:36.6,5:55.4,6:74.8,7:95,8:115.8,9:137.4,10:159.6,11:182.6,12:206.4,13:231,14:256.4,15:282.6,16:310,17:338.6,18:368.2,19:399,20:431,21:464.2,22:498.8,23:534.8,24:572.2,25:611.2,26:651.8,27:694,28:738,29:783.8,30:831.4};
function calcPolicyYear(sd){if(!sd)return null;return Math.max(0,Math.floor((new Date()-new Date(sd))/(365.25*24*3600*1000)));}
function calcSV(si,sd){const yr=calcPolicyYear(sd);if(!yr||yr<1||yr>30)return null;return Math.round((SV_30_15[yr]||0)*si/1000);}

function renderClientInsurance(c){
  const ins=c.insurance||[];
  const tl={'unit-link':'Unit Link',pension:'บำนาญ',savings:'ออมทรัพย์',whole:'ตลอดชีพ',term:'ชั่วระยะเวลา'};
  const tcl={'unit-link':'b-i',pension:'b-g',savings:'b-y',whole:'b-p',term:'b-bl'};
  return`<div class="sy">
    <div class="ph"><div><h3 style="font-size:16px;font-weight:600">กรมธรรม์ประกัน</h3><p>${ins.length} ฉบับ</p></div>
      <div style="display:flex;gap:6px"><button class="btn bs" style="font-size:12px" onclick="openInsUpload(${c.id})">📷 อัปโหลด กธ.</button><button class="btn bp" onclick="openInsForm(${c.id})">+ เพิ่ม กธ.</button></div>
    </div>
    <div class="g4">${statCard('🛡️','จำนวน กธ.',ins.length+' ฉบับ','indigo')}${statCard('💵','เบี้ยรวม/ปี','฿'+fmt(ins.filter(i=>i.status==='active').reduce((s,i)=>s+i.premium,0)),'yellow')}${statCard('💰','มูลค่ารวม','฿'+fmt(ins.reduce((s,i)=>s+(i.curVal||0),0)),'green')}${statCard('👤','ทุนประกัน','฿'+fmt(ins.reduce((s,i)=>s+(i.sumInsured||0),0)),'blue')}</div>
    ${!ins.length?`<div class="card es"><div class="ei">🛡️</div><p>ยังไม่มีกรมธรรม์</p></div>`
    :ins.map(i=>{
      const liveCSV=i.startDate&&i.sumInsured?calcSV(Number(i.sumInsured),i.startDate):null;
      const liveYr=i.startDate?calcPolicyYear(i.startDate):null;
      const dispVal=liveCSV!==null?liveCSV:i.curVal;
      const paid=i.totalPaid||(i.premium*(liveYr||i.years));
      const pnl=dispVal-paid;
      const due=i.dueDate?new Date(i.dueDate):null;
      const daysLeft=due?Math.ceil((due-new Date())/(1000*60*60*24)):null;
      const hasImg=i.images&&i.images.length>0;
      return`<div class="card" style="padding:18px;${daysLeft!==null&&daysLeft<=30&&daysLeft>0?'border-left:4px solid var(--amber)':''}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
          <div><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap"><span style="font-weight:700">${i.plan}</span><span class="badge ${tcl[i.type]||'b-i'}">${tl[i.type]||i.type}</span>${i.status==='active'?'<span class="badge b-g">Active</span>':'<span class="badge b-r">หมดอายุ</span>'}${hasImg?`<span class="badge b-p" style="cursor:pointer" onclick="viewInsImages(${c.id},${i.id})">📄 ${i.images.length} หน้า</span>`:''}</div><div style="font-size:11px;color:var(--g400);margin-top:2px">${i.co}${liveYr!==null?' • ปีที่ '+liveYr:''}${i.termYears?' / '+i.termYears+' ปี':''}</div></div>
          <div style="display:flex;gap:2px"><button class="eb" title="อัปโหลดรูป" onclick="openInsUpload(${c.id},${i.id})">📷</button><button class="eb" onclick="openInsForm(${c.id},${i.id})">✎</button><button class="db" onclick="confirmDelIns(${c.id},${i.id},'${i.plan}')">✕</button></div>
        </div>
        ${hasImg?`<div class="policy-img-strip" onclick="viewInsImages(${c.id},${i.id})">${i.images.slice(0,5).map((u,ix)=>`<img src="${u}" alt="หน้า ${ix+1}">`).join('')}</div>`:''}
        <div class="g4" style="margin-top:10px">
          <div class="sb bg-g"><div class="sl">เบี้ย/ปี</div><div class="sv">฿${fmt(i.premium)}</div></div>
          <div class="sb bg-g"><div class="sl">จ่ายแล้ว</div><div class="sv">฿${fmt(paid)}</div></div>
          <div class="sb ${pnl>=0?'bg-gn':'bg-rd'}"><div class="sl">มูลค่า${liveCSV!==null?' ปีที่'+liveYr:''}</div><div class="sv" style="color:${pnl>=0?'var(--green)':'var(--red)'}">฿${fmt(dispVal)}</div></div>
          <div class="sb bg-am"><div class="sl">${daysLeft!==null&&daysLeft>0?'ครบกำหนด ('+daysLeft+'วัน)':'ครบกำหนด'}</div><div class="sv" style="color:var(--amber);font-size:11px">${i.dueDate||'—'}</div></div>
        </div>
        ${liveCSV!==null?`<div style="margin-top:8px;padding:8px 12px;border-radius:8px;background:var(--indigo-lt);font-size:11px;color:var(--indigo)">📊 ทุนประกัน ฿${fmt(i.sumInsured)} | เวนคืนตอนนี้ ฿${fmt(liveCSV)}</div>`:''}
        ${i.type==='pension'?`<div style="margin-top:8px;padding:8px 12px;border-radius:8px;background:var(--green-lt);font-size:11px;color:var(--green)">🏖️ รับบำนาญ ฿${fmt(i.monthlyPension||0)}/เดือน ตั้งแต่อายุ ${i.retireAge||60} ปี</div>`:''}
      </div>`;
    }).join('')}
  </div>`;
}

function renderClientStocks(c){
  const stocks=c.stocks||[];const sv=stocks.reduce((s,t)=>s+t.qty*t.price*(t.mkt==='US'?FX:1),0);const sc=stocks.reduce((s,t)=>s+t.qty*t.cost*(t.mkt==='US'?FX:1),0);
  return`<div class="sy"><div class="ph"><div><h3 style="font-size:16px;font-weight:600">พอร์ตหุ้น</h3></div><button class="btn bp" onclick="openStockForm(${c.id})">+ เพิ่มหุ้น</button></div>
    <div class="g4">${statCard('💰','มูลค่ารวม','฿'+fmt(sv),'indigo')}${statCard('📊','กำไร/ขาดทุน',(sv>=sc?'+':'')+'฿'+fmt(sv-sc),sv>=sc?'green':'red')}${statCard('🇹🇭','หุ้นไทย',stocks.filter(s=>s.mkt==='TH').length+' ตัว','blue')}${statCard('🌍','หุ้น US',stocks.filter(s=>s.mkt==='US').length+' ตัว','purple')}</div>
    ${!stocks.length?`<div class="card es"><div class="ei">📈</div><p>ยังไม่มีหุ้น</p><button class="btn bp" style="margin-top:12px" onclick="openStockForm(${c.id})">เพิ่มหุ้น</button></div>`
    :`<div class="card"><div class="tw"><table><thead><tr><th>หุ้น</th><th class="r hm">จำนวน</th><th class="r">ราคา</th><th class="r">%</th><th class="r hm">มูลค่า</th><th class="r hm">กำไร</th><th class="c">แก้ไข</th></tr></thead><tbody>${stocks.map(s=>{const fx=s.mkt==='US'?FX:1,v=s.qty*s.price*fx,co=s.qty*s.cost*fx,pnl=v-co;return`<tr><td><div style="display:flex;align-items:center;gap:6px">${s.mkt==='US'?'<span style="font-size:9px;background:#dbeafe;color:#2563eb;padding:1px 4px;border-radius:4px">US</span>':''}<div><div style="font-weight:600">${s.sym}</div><div style="font-size:10px;color:var(--g400)">${s.name}</div></div></div></td><td class="r hm">${fmt(s.qty)}</td><td class="r" style="font-weight:500">${s.mkt==='US'?'$':'฿'}${fmtD(s.price)}</td><td class="r" style="color:${s.chg>=0?'var(--green)':'var(--red)'}">${pct(s.chg)}</td><td class="r hm">฿${fmt(v)}</td><td class="r hm" style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}฿${fmt(pnl)}</td><td class="c"><button class="eb" onclick="openStockForm(${c.id},${s.id})">✎</button><button class="db" onclick="confirmDelAsset(${c.id},'stocks',${s.id},'${s.sym}')">✕</button></td></tr>`;}).join('')}</tbody></table></div></div>`}
  </div>`;
}

function renderClientFunds(c){
  const funds=c.funds||[];const fv=funds.reduce((s,f)=>s+f.nav*f.units,0);const fc=funds.reduce((s,f)=>s+f.cost*f.units,0);
  const tl={equity:'หุ้นไทย',bond:'ตราสารหนี้',foreign:'หุ้นต่างประเทศ',rmf:'RMF',ssf:'SSF',mixed:'ผสม'};
  const tcl={equity:'b-i',bond:'b-g',foreign:'b-bl',rmf:'b-p',ssf:'b-y',mixed:''};
  return`<div class="sy"><div class="ph"><div><h3 style="font-size:16px;font-weight:600">กองทุนรวม</h3></div><button class="btn bp" onclick="openFundForm(${c.id})">+ เพิ่มกองทุน</button></div>
    <div class="g4">${statCard('📊','มูลค่ารวม','฿'+fmt(fv),'indigo')}${statCard('💹','กำไร/ขาดทุน',(fv>=fc?'+':'')+'฿'+fmt(fv-fc),fv>=fc?'green':'red')}${statCard('📁','จำนวนกอง',funds.length+' กอง','blue')}${statCard('🏛️','RMF/SSF',funds.filter(f=>f.type==='rmf'||f.type==='ssf').length+' กอง','purple')}</div>
    ${!funds.length?`<div class="card es"><div class="ei">📊</div><p>ยังไม่มีกองทุน</p><button class="btn bp" style="margin-top:12px" onclick="openFundForm(${c.id})">เพิ่มกองทุน</button></div>`
    :`<div class="g2">${funds.map(f=>{const v=f.nav*f.units,co=f.cost*f.units,pnl=v-co,pp=co>0?(pnl/co)*100:0;return`<div class="card" style="padding:14px"><div style="display:flex;justify-content:space-between;margin-bottom:10px"><div><div style="display:flex;align-items:center;gap:7px"><span style="font-weight:700">${f.sym}</span><span class="badge ${tcl[f.type]}">${tl[f.type]||f.type}</span></div><p style="font-size:11px;color:var(--g400);margin-top:2px">${f.name}</p></div><div style="display:flex;gap:2px"><button class="eb" onclick="openFundForm(${c.id},${f.id})">✎</button><button class="db" onclick="confirmDelAsset(${c.id},'funds',${f.id},'${f.sym}')">✕</button></div></div><div class="g3"><div class="sb bg-g"><div class="sl">NAV</div><div class="sv">฿${fmtD(f.nav)}</div></div><div class="sb bg-g"><div class="sl">มูลค่า</div><div class="sv">฿${fmt(v)}</div></div><div class="sb ${pnl>=0?'bg-gn':'bg-rd'}"><div class="sl">กำไร</div><div class="sv" style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}${pp.toFixed(1)}%</div></div></div></div>`;}).join('')}</div>`}
  </div>`;
}

function renderClientProperty(c){
  const props=c.props||[];const pv=props.reduce((s,p)=>s+p.val,0);const pc=props.reduce((s,p)=>s+p.buy,0);
  const icons={condo:'🏢',house:'🏠',townhouse:'🏘️',land:'🌿',commercial:'🏪'};
  return`<div class="sy"><div class="ph"><div><h3 style="font-size:16px;font-weight:600">อสังหาริมทรัพย์</h3></div><button class="btn bp" onclick="openPropForm(${c.id})">+ เพิ่มอสังหาฯ</button></div>
    <div class="g4">${statCard('🏠','มูลค่ารวม','฿'+fmt(pv),'indigo')}${statCard('📈','กำไร','+฿'+fmt(pv-pc),'green')}${statCard('🏢','จำนวน',props.length+' แห่ง','blue')}${statCard('💵','ค่าเช่า/เดือน','฿'+fmt(props.reduce((s,p)=>s+(p.rent||0),0)),'yellow')}</div>
    ${!props.length?`<div class="card es"><div class="ei">🏠</div><p>ยังไม่มีอสังหาฯ</p><button class="btn bp" style="margin-top:12px" onclick="openPropForm(${c.id})">เพิ่มอสังหาฯ</button></div>`
    :props.map(p=>{const gain=p.val-p.buy,gp=p.buy>0?(gain/p.buy)*100:0,yld=p.rent&&p.val?(p.rent*12/p.val)*100:0;return`<div class="card" style="padding:16px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:24px">${icons[p.type]||'🏠'}</span><div><div style="font-weight:700">${p.name}</div><div style="font-size:11px;color:var(--g400)">${p.loc} • ${p.size}</div></div></div><div style="display:flex;gap:2px"><button class="eb" onclick="openPropForm(${c.id},${p.id})">✎</button><button class="db" onclick="confirmDelAsset(${c.id},'props',${p.id},'${p.name}')">✕</button></div></div><div class="g4"><div class="sb bg-g"><div class="sl">ราคาซื้อ</div><div class="sv">฿${fmt(p.buy)}</div></div><div class="sb bg-g"><div class="sl">มูลค่าปัจจุบัน</div><div class="sv">฿${fmt(p.val)}</div></div><div class="sb ${gain>=0?'bg-gn':'bg-rd'}"><div class="sl">กำไร</div><div class="sv" style="color:${gain>=0?'var(--green)':'var(--red)'}">${gain>=0?'+':''}${gp.toFixed(1)}%</div></div><div class="sb bg-am"><div class="sl">${yld>0?'Yield '+yld.toFixed(1)+'%':'ค่าเช่า'}</div><div class="sv">${p.rent?'฿'+fmt(p.rent)+'/ด.':'—'}</div></div></div></div>`;}).join('')}
  </div>`;
}

// ── Report HTML ──
function reportHTML(id){
  const c=D.clients.find(x=>x.id===id);if(!c)return'';
  const cal=calcClient(c);
  const now=new Date().toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'numeric'});
  const ins=c.insurance||[],stocks=c.stocks||[],funds=c.funds||[],props=c.props||[];
  const tl={'unit-link':'Unit Link',pension:'บำนาญ',savings:'ออมทรัพย์',whole:'ตลอดชีพ',term:'ชั่วระยะเวลา'};
  const ftl={equity:'หุ้นไทย',bond:'ตราสารหนี้',foreign:'หุ้นต่างประเทศ',rmf:'RMF',ssf:'SSF',mixed:'ผสม'};
  const pie=[{name:'หุ้น',value:cal.sv,color:'#6366f1'},{name:'กองทุน',value:cal.fv,color:'#f59e0b'},{name:'ประกัน',value:cal.iv,color:'#ec4899'},{name:'อสังหาฯ',value:cal.pv,color:'#10b981'}].filter(d=>d.value>0);
  return`
    <div class="rpt-hdr"><div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px"><div><div style="font-size:10px;opacity:.7;text-transform:uppercase;margin-bottom:4px">รายงานพอร์ตการลงทุน</div><div style="font-size:20px;font-weight:700">${c.name}</div><div style="font-size:12px;opacity:.8;margin-top:3px">${c.age} ปี • ${c.occupation}${c.phone?' • '+c.phone:''}</div></div><div style="text-align:right"><div style="font-size:11px;opacity:.7">จัดทำโดย ${D.agentName}</div><div style="font-size:11px;opacity:.65;margin-top:2px">${now}</div><div style="font-size:24px;font-weight:700;margin-top:8px">฿${fmt(cal.total)}</div><div style="font-size:10px;opacity:.7">มูลค่าสินทรัพย์รวม</div></div></div></div>
    <div class="report-section"><h4>💰 สรุปมูลค่าสินทรัพย์</h4><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">${pie.length?pieSVG(pie,96):''}<div style="flex:1;min-width:160px"><table style="width:100%;font-size:12px;border-collapse:collapse">${pie.map(d=>`<tr><td style="padding:5px 8px"><div style="display:flex;align-items:center;gap:7px"><div style="width:9px;height:9px;border-radius:50%;background:${d.color}"></div><span style="color:#4b5563">${d.name}</span></div></td><td style="padding:5px 8px;font-weight:600;text-align:right">฿${fmt(d.value)}</td><td style="padding:5px 8px;color:#9ca3af;font-size:11px;text-align:right">${cal.total>0?(d.value/cal.total*100).toFixed(0):0}%</td></tr>`).join('')}<tr style="border-top:1px solid #e5e7eb"><td colspan="2" style="padding:6px 8px;font-weight:700;font-size:14px;color:#6366f1">฿${fmt(cal.total)}</td><td></td></tr></table></div></div></div>
    ${ins.length?`<div class="report-section"><h4>🛡️ กรมธรรม์ (${ins.length} ฉบับ)</h4><div style="overflow-x:auto"><table class="rpt-tbl"><thead><tr><th>แบบประกัน</th><th>บริษัท</th><th>ประเภท</th><th class="r">เบี้ย/ปี</th><th class="r">มูลค่า</th><th class="r">ครบกำหนด</th></tr></thead><tbody>${ins.map(i=>{const lv=i.startDate&&i.sumInsured?calcSV(Number(i.sumInsured),i.startDate):null;const dv=lv!==null?lv:i.curVal;return`<tr><td><b>${i.plan}</b></td><td style="color:#6b7280">${i.co}</td><td>${tl[i.type]||i.type}</td><td class="r">฿${fmt(i.premium)}</td><td class="r" style="color:#10b981">฿${fmt(dv||0)}</td><td class="r" style="font-size:11px;color:#6b7280">${i.dueDate||'—'}</td></tr>`;}).join('')}<tr style="background:#fffbeb"><td colspan="3" style="font-weight:600">รวมเบี้ย/ปี</td><td class="r" style="font-weight:700;color:#f59e0b">฿${fmt(cal.iprem)}</td><td class="r" style="font-weight:700;color:#10b981">฿${fmt(cal.iv)}</td><td></td></tr></tbody></table></div></div>`:''}
    ${stocks.length?`<div class="report-section"><h4>📈 พอร์ตหุ้น</h4><div style="overflow-x:auto"><table class="rpt-tbl"><thead><tr><th>หุ้น</th><th>ชื่อบริษัท</th><th class="r">จำนวน</th><th class="r">ต้นทุน</th><th class="r">ราคา</th><th class="r">มูลค่า</th><th class="r">กำไร</th></tr></thead><tbody>${stocks.map(s=>{const fx=s.mkt==='US'?FX:1,v=s.qty*s.price*fx,co=s.qty*s.cost*fx,pnl=v-co;return`<tr><td><b>${s.sym}</b></td><td style="color:#6b7280">${s.name}</td><td class="r">${fmt(s.qty)}</td><td class="r">${s.mkt==='US'?'$':'฿'}${fmtD(s.cost)}</td><td class="r">${s.mkt==='US'?'$':'฿'}${fmtD(s.price)}</td><td class="r" style="font-weight:500">฿${fmt(v)}</td><td class="r" style="color:${pnl>=0?'#10b981':'#ef4444'}">${pnl>=0?'+':''}฿${fmt(pnl)}</td></tr>`;}).join('')}<tr style="background:#eef2ff"><td colspan="5" style="font-weight:600">รวม</td><td class="r" style="font-weight:700">฿${fmt(cal.sv)}</td><td class="r" style="font-weight:700;color:${cal.sv>=cal.sc?'#10b981':'#ef4444'}">${cal.sv>=cal.sc?'+':''}฿${fmt(cal.sv-cal.sc)}</td></tr></tbody></table></div></div>`:''}
    ${funds.length?`<div class="report-section"><h4>📊 กองทุนรวม</h4><div style="overflow-x:auto"><table class="rpt-tbl"><thead><tr><th>กองทุน</th><th>ประเภท</th><th class="r">NAV</th><th class="r">หน่วย</th><th class="r">มูลค่า</th><th class="r">กำไร</th></tr></thead><tbody>${funds.map(f=>{const v=f.nav*f.units,co=f.cost*f.units,pnl=v-co,pp=co>0?(pnl/co*100):0;return`<tr><td><b>${f.sym}</b><div style="font-size:10px;color:#9ca3af">${f.name}</div></td><td>${ftl[f.type]||f.type}</td><td class="r">฿${fmtD(f.nav)}</td><td class="r">${fmt(f.units)}</td><td class="r" style="font-weight:500">฿${fmt(v)}</td><td class="r" style="color:${pnl>=0?'#10b981':'#ef4444'}">${pnl>=0?'+':''}${pp.toFixed(1)}%</td></tr>`;}).join('')}<tr style="background:#fffbeb"><td colspan="4" style="font-weight:600">รวม</td><td class="r" style="font-weight:700">฿${fmt(cal.fv)}</td><td class="r" style="font-weight:700;color:${cal.fv>=cal.fc?'#10b981':'#ef4444'}">${cal.fv>=cal.fc?'+':''}฿${fmt(cal.fv-cal.fc)}</td></tr></tbody></table></div></div>`:''}
    ${c.notes?`<div class="report-section"><h4>📝 หมายเหตุ</h4><p style="font-size:12px;color:#4b5563;padding:8px 12px;background:#f9fafb;border-radius:8px">${c.notes}</p></div>`:''}
    <div style="font-size:10px;color:#9ca3af;text-align:center;margin-bottom:12px;padding-top:8px;border-top:1px solid #e5e7eb">จัดทำโดย ${D.agentName} • ${now} • Asset Hub</div>
  `;
}

function downloadPDF(id){
  const c=D.clients.find(x=>x.id===id);if(!c)return;
  showToast('กำลังสร้าง PDF...');
  function generate(){
    const wrap=document.createElement('div');
    wrap.style.cssText='position:fixed;top:-9999px;left:-9999px;width:794px;padding:24px;background:#fff;font-family:Noto Sans Thai,-apple-system,sans-serif;font-size:13px;color:#111827';
    wrap.innerHTML=reportHTML(id);
    document.body.appendChild(wrap);
    html2pdf().set({
      margin:[10,10,10,10],
      filename:'report-'+c.name+'.pdf',
      image:{type:'jpeg',quality:0.98},
      html2canvas:{scale:2,useCORS:true,logging:false},
      jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}
    }).from(wrap).save().then(()=>{
      document.body.removeChild(wrap);
      showToast('ดาวน์โหลด PDF สำเร็จ');
    });
  }
  if(!window.html2pdf){
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload=generate;
    document.head.appendChild(s);
  } else { generate(); }
}

// ── Report ──
function openReport(id){
  const c=D.clients.find(x=>x.id===id);if(!c)return;
  showModal(`📄 รายงานพอร์ต — ${c.name}`,`
    ${reportHTML(id)}
    <div class="br no-print"><button class="btn bs" onclick="closeModal()">ปิด</button><button class="btn bp" onclick="downloadPDF(${id})">📥 ดาวน์โหลด PDF</button></div>
  `,'xw');
}

// ── Modals ──
function showModal(title,html,wide){const root=$('#modal-root');if(!root)return;const cls=wide==='xw'?' xw':wide?' w':'';root.innerHTML=`<div class="ov" onclick="closeModal()"><div class="mdl${cls}" onclick="event.stopPropagation()"><div class="mdl-h"><h3>${title}</h3><button class="mdl-x" onclick="closeModal()">×</button></div><div class="mdl-b">${html}</div></div></div>`;}
function closeModal(){const r=$('#modal-root');if(r)r.innerHTML='';}

// ── Client CRUD ──
function openClientForm(id){
  const c=id?D.clients.find(x=>x.id===id):null;const v=c||{name:'',phone:'',email:'',age:'',occupation:'',notes:''};
  showModal(c?'แก้ไขข้อมูลลูกค้า':'เพิ่มลูกค้าใหม่',`
    <div class="ff"><label>ชื่อ-นามสกุล</label><input class="fi" id="cl-name" value="${v.name}" placeholder="นาย/นาง/นางสาว..."></div>
    <div class="fr2"><div class="ff"><label>อายุ</label><input class="fi" type="number" id="cl-age" value="${v.age}"></div><div class="ff"><label>เบอร์โทร</label><input class="fi" id="cl-phone" value="${v.phone}"></div></div>
    <div class="fr2"><div class="ff"><label>อีเมล</label><input class="fi" id="cl-email" value="${v.email}"></div><div class="ff"><label>อาชีพ</label><input class="fi" id="cl-occ" value="${v.occupation}"></div></div>
    <div class="ff"><label>หมายเหตุ</label><textarea class="fi" id="cl-notes" rows="2">${v.notes||''}</textarea></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveClient(${id||0})">บันทึก</button></div>
  `);
}
function saveClient(id){
  const name=$('#cl-name').value.trim();if(!name){showToast('กรุณากรอกชื่อ');return;}
  const item={name,phone:$('#cl-phone').value,email:$('#cl-email').value,age:Number($('#cl-age').value)||0,occupation:$('#cl-occ').value,notes:$('#cl-notes').value};
  if(id){D.clients=D.clients.map(c=>c.id===id?{...c,...item}:c);}
  else{const nid=Math.max(0,...D.clients.map(c=>c.id))+1;D.clients.push({id:nid,...item,stocks:[],funds:[],insurance:[],props:[]});}
  save();closeModal();render();showToast(id?'อัพเดตสำเร็จ':'เพิ่มลูกค้าสำเร็จ');
}
function confirmDelClient(id,name){showModal('ยืนยันการลบ',`<p style="color:var(--g500);margin-bottom:18px">ต้องการลบ "<b>${name}</b>" และข้อมูลทั้งหมด?</p><div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn" style="background:var(--red);color:#fff;flex:1" onclick="doDelClient(${id})">ลบ</button></div>`);}
function doDelClient(id){D.clients=D.clients.filter(c=>c.id!==id);save();closeModal();render();showToast('ลบสำเร็จ');}

// ── Insurance CRUD ──
function openInsForm(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;
  const ins=id?(c.insurance||[]).find(x=>x.id===id):null;
  const v=ins||{co:'',plan:'',type:'savings',premium:'',sumInsured:'',status:'active',dueDate:'',startDate:'',termYears:30,monthlyPension:'',retireAge:60,maturityVal:'',images:[]};
  const types=[{v:'savings',l:'ออมทรัพย์'},{v:'unit-link',l:'Unit Link'},{v:'pension',l:'บำนาญ'},{v:'whole',l:'ตลอดชีพ'},{v:'term',l:'ชั่วระยะเวลา'}];
  showModal(ins?'แก้ไข '+ins.plan:'เพิ่มกรมธรรม์',`
    <div class="fr2"><div class="ff"><label>บริษัทประกัน</label><input class="fi" id="fi-co" value="${v.co}"></div><div class="ff"><label>ประเภท</label><select class="fi" id="fi-type" onchange="toggleInsFields()">${types.map(t=>`<option value="${t.v}"${v.type===t.v?' selected':''}>${t.l}</option>`).join('')}</select></div></div>
    <div class="ff"><label>ชื่อแบบประกัน</label><input class="fi" id="fi-plan" value="${v.plan}"></div>
    <div class="fr3"><div class="ff"><label>เบี้ย/ปี (฿)</label><input class="fi" type="number" id="fi-prem" value="${v.premium}"></div><div class="ff"><label>ทุนประกัน (฿)</label><input class="fi" type="number" id="fi-si" value="${v.sumInsured}"></div><div class="ff"><label>วันเริ่มสัญญา</label><input class="fi" type="date" id="fi-start" value="${v.startDate||''}"></div></div>
    <div class="fr2"><div class="ff"><label>ระยะสัญญา (ปี)</label><input class="fi" type="number" id="fi-term" value="${v.termYears||30}"></div><div class="ff"><label>วันชำระถัดไป</label><input class="fi" type="date" id="fi-due" value="${v.dueDate||''}"></div></div>
    <div id="ins-pension-f" style="display:${v.type==='pension'?'block':'none'}"><div class="fr2"><div class="ff"><label>บำนาญ/เดือน</label><input class="fi" type="number" id="fi-mp" value="${v.monthlyPension||''}"></div><div class="ff"><label>เริ่มรับอายุ</label><input class="fi" type="number" id="fi-rage" value="${v.retireAge||60}"></div></div></div>
    <div id="ins-savings-f" style="display:${v.type==='savings'?'block':'none'}"><div class="ff"><label>เงินครบกำหนด (฿)</label><input class="fi" type="number" id="fi-mval" value="${v.maturityVal||''}"></div></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveIns(${cid},${id||0})">บันทึก</button></div>
  `,true);
}
function toggleInsFields(){const t=$('#fi-type').value;$('#ins-pension-f').style.display=t==='pension'?'block':'none';$('#ins-savings-f').style.display=t==='savings'?'block':'none';}
function saveIns(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;
  const plan=$('#fi-plan').value;if(!plan)return;
  const yr=calcPolicyYear($('#fi-start').value)||0;const prem=Number($('#fi-prem').value||0);
  const item={co:$('#fi-co').value,plan,type:$('#fi-type').value,premium:prem,years:yr,totalPaid:prem*yr,
    curVal:calcSV(Number($('#fi-si').value||0),$('#fi-start').value)||Number($('#fi-si').value||0)*0.5,
    sumInsured:Number($('#fi-si').value||0),status:'active',dueDate:$('#fi-due').value,
    startDate:$('#fi-start').value,termYears:Number($('#fi-term').value||30),payYears:15,
    monthlyPension:Number($('#fi-mp')?.value||0),retireAge:Number($('#fi-rage')?.value||60),
    maturityVal:Number($('#fi-mval')?.value||0),images:[]};
  if(!c.insurance)c.insurance=[];
  if(id){c.insurance=c.insurance.map(i=>i.id===id?{...i,...item}:i);}
  else{const nid=Math.max(0,...(c.insurance.map(i=>i.id)||[0]))+1;c.insurance.push({id:nid,...item});}
  save();closeModal();render();showToast('บันทึกกรมธรรม์สำเร็จ');
}
function confirmDelIns(cid,id,name){showModal('ลบกรมธรรม์',`<p style="color:var(--g500);margin-bottom:16px">ต้องการลบ "${name}"?</p><div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn" style="background:var(--red);color:#fff;flex:1" onclick="doDelIns(${cid},${id})">ลบ</button></div>`);}
function doDelIns(cid,id){const c=D.clients.find(x=>x.id===cid);if(c)c.insurance=c.insurance.filter(i=>i.id!==id);save();closeModal();render();showToast('ลบสำเร็จ');}

// ── Stock CRUD ──
function openStockForm(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;const s=id?(c.stocks||[]).find(x=>x.id===id):null;const v=s||{sym:'',name:'',qty:'',cost:'',price:'',mkt:'TH'};
  showModal(s?'แก้ไข '+s.sym:'เพิ่มหุ้น',`
    <div class="fr2"><div class="ff"><label>สัญลักษณ์</label><input class="fi" id="fs-sym" value="${v.sym}"></div><div class="ff"><label>ตลาด</label><select class="fi" id="fs-mkt"><option value="TH"${v.mkt==='TH'?' selected':''}>ไทย</option><option value="US"${v.mkt==='US'?' selected':''}>US</option></select></div></div>
    <div class="ff"><label>ชื่อบริษัท</label><input class="fi" id="fs-name" value="${v.name}"></div>
    <div class="fr3"><div class="ff"><label>จำนวนหุ้น</label><input class="fi" type="number" id="fs-qty" value="${v.qty}"></div><div class="ff"><label>ต้นทุน/หุ้น</label><input class="fi" type="number" step="0.01" id="fs-cost" value="${v.cost}"></div><div class="ff"><label>ราคาปัจจุบัน</label><input class="fi" type="number" step="0.01" id="fs-price" value="${v.price}"></div></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveStock(${cid},${id||0})">บันทึก</button></div>
  `);
}
function saveStock(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;
  const sym=$('#fs-sym').value.toUpperCase(),name=$('#fs-name').value,qty=Number($('#fs-qty').value),cost=Number($('#fs-cost').value),price=Number($('#fs-price').value),mkt=$('#fs-mkt').value;
  if(!sym||!qty||!cost)return;if(!c.stocks)c.stocks=[];
  if(id){c.stocks=c.stocks.map(s=>s.id===id?{...s,sym,name,qty,cost,price,mkt}:s);}
  else{const nid=Math.max(0,...c.stocks.map(s=>s.id))+1;c.stocks.push({id:nid,sym,name,qty,cost,price,chg:0,alert:null,mkt});}
  save();closeModal();render();showToast('บันทึกหุ้นสำเร็จ');
}

// ── Fund CRUD ──
function openFundForm(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;const f=id?(c.funds||[]).find(x=>x.id===id):null;const v=f||{sym:'',name:'',nav:'',units:'',cost:'',type:'equity'};
  const types=[{v:'equity',l:'หุ้นไทย'},{v:'bond',l:'ตราสารหนี้'},{v:'foreign',l:'หุ้นต่างประเทศ'},{v:'rmf',l:'RMF'},{v:'ssf',l:'SSF'},{v:'mixed',l:'ผสม'}];
  showModal(f?'แก้ไข '+f.sym:'เพิ่มกองทุน',`
    <div class="fr2"><div class="ff"><label>ชื่อย่อ</label><input class="fi" id="ff-sym" value="${v.sym}"></div><div class="ff"><label>ประเภท</label><select class="fi" id="ff-type">${types.map(t=>`<option value="${t.v}"${v.type===t.v?' selected':''}>${t.l}</option>`).join('')}</select></div></div>
    <div class="ff"><label>ชื่อกองทุน</label><input class="fi" id="ff-name" value="${v.name}"></div>
    <div class="fr3"><div class="ff"><label>NAV</label><input class="fi" type="number" step="0.01" id="ff-nav" value="${v.nav}"></div><div class="ff"><label>จำนวนหน่วย</label><input class="fi" type="number" id="ff-units" value="${v.units}"></div><div class="ff"><label>ต้นทุน/หน่วย</label><input class="fi" type="number" step="0.01" id="ff-cost" value="${v.cost}"></div></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveFund(${cid},${id||0})">บันทึก</button></div>
  `);
}
function saveFund(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;
  const sym=$('#ff-sym').value.toUpperCase(),name=$('#ff-name').value,nav=Number($('#ff-nav').value),units=Number($('#ff-units').value),cost=Number($('#ff-cost').value),type=$('#ff-type').value;
  if(!sym||!nav||!units)return;if(!c.funds)c.funds=[];
  if(id){c.funds=c.funds.map(f=>f.id===id?{...f,sym,name,nav,units,cost,type}:f);}
  else{const nid=Math.max(0,...c.funds.map(f=>f.id))+1;c.funds.push({id:nid,sym,name,nav,units,cost:cost||nav,chg:0,type,co:''});}
  save();closeModal();render();showToast('บันทึกกองทุนสำเร็จ');
}

// ── Property CRUD ──
function openPropForm(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;const p=id?(c.props||[]).find(x=>x.id===id):null;const v=p||{type:'condo',name:'',loc:'',size:'',buy:'',val:'',rent:0};
  const types=[{v:'condo',l:'คอนโด'},{v:'house',l:'บ้านเดี่ยว'},{v:'townhouse',l:'ทาวน์เฮ้าส์'},{v:'land',l:'ที่ดิน'},{v:'commercial',l:'อาคารพาณิชย์'}];
  showModal(p?'แก้ไข '+p.name:'เพิ่มอสังหาฯ',`
    <div class="fr2"><div class="ff"><label>ประเภท</label><select class="fi" id="fp-type">${types.map(t=>`<option value="${t.v}"${v.type===t.v?' selected':''}>${t.l}</option>`).join('')}</select></div><div class="ff"><label>ขนาด</label><input class="fi" id="fp-size" value="${v.size}"></div></div>
    <div class="ff"><label>ชื่อ/โครงการ</label><input class="fi" id="fp-name" value="${v.name}"></div>
    <div class="ff"><label>ที่ตั้ง</label><input class="fi" id="fp-loc" value="${v.loc}"></div>
    <div class="fr2"><div class="ff"><label>ราคาซื้อ (฿)</label><input class="fi" type="number" id="fp-buy" value="${v.buy}"></div><div class="ff"><label>มูลค่าปัจจุบัน (฿)</label><input class="fi" type="number" id="fp-val" value="${v.val}"></div></div>
    <div class="ff"><label>ค่าเช่า/เดือน (฿)</label><input class="fi" type="number" id="fp-rent" value="${v.rent}"></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveProp(${cid},${id||0})">บันทึก</button></div>
  `,true);
}
function saveProp(cid,id){
  const c=D.clients.find(x=>x.id===cid);if(!c)return;
  const name=$('#fp-name').value;if(!name)return;
  const item={type:$('#fp-type').value,name,loc:$('#fp-loc').value,size:$('#fp-size').value,buy:Number($('#fp-buy').value),val:Number($('#fp-val').value),rent:Number($('#fp-rent').value||0)};
  if(!c.props)c.props=[];
  if(id){c.props=c.props.map(p=>p.id===id?{...p,...item}:p);}
  else{const nid=Math.max(0,...c.props.map(p=>p.id))+1;c.props.push({id:nid,...item});}
  save();closeModal();render();showToast('บันทึกสำเร็จ');
}
function confirmDelAsset(cid,cat,id,name){showModal('ยืนยันการลบ',`<p style="color:var(--g500);margin-bottom:16px">ต้องการลบ "${name}"?</p><div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn" style="background:var(--red);color:#fff;flex:1" onclick="doDelAsset(${cid},'${cat}',${id})">ลบ</button></div>`);}
function doDelAsset(cid,cat,id){const c=D.clients.find(x=>x.id===cid);if(c)c[cat]=c[cat].filter(i=>i.id!==id);save();closeModal();render();showToast('ลบสำเร็จ');}

// ── Insurance Image Upload ──
let insUploadImgs=[];let insUploadCid=null;let insUploadId=null;
function openInsUpload(cid,id){insUploadCid=cid;insUploadId=id||null;insUploadImgs=[];if(id){const c=D.clients.find(x=>x.id===cid);const ins=(c?.insurance||[]).find(x=>x.id===id);if(ins?.images)insUploadImgs=[...ins.images.map(u=>({dataUrl:u}))];}renderInsUploadModal();}
function renderInsUploadModal(){
  const thumbs=insUploadImgs.map((img,i)=>`<div class="img-thumb"><img src="${img.dataUrl}"><button class="del-img" onclick="removeInsImg(${i})">✕</button></div>`).join('');
  showModal('📷 อัปโหลดกรมธรรม์',`
    <input type="file" id="iu-input" accept="image/*" multiple style="display:none" onchange="handleInsImgs(this.files)">
    <div class="upload-zone" onclick="document.getElementById('iu-input').click()" ondragover="event.preventDefault()" ondrop="event.preventDefault();handleInsImgs(event.dataTransfer.files)">
      <div style="font-size:28px">📄</div><div style="font-weight:500;margin-top:6px">คลิกหรือลากรูปมาวาง</div><div style="font-size:11px;color:var(--g400);margin-top:3px">รองรับหลายรูป JPG/PNG</div>
    </div>
    ${insUploadImgs.length?`<div class="img-grid">${thumbs}</div>`:''}
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveInsImgs()">💾 บันทึกรูป</button></div>
  `);
}
function handleInsImgs(files){Array.from(files).forEach(f=>{const r=new FileReader();r.onload=e=>{insUploadImgs.push({dataUrl:e.target.result});renderInsUploadModal();};r.readAsDataURL(f);});}
function removeInsImg(i){insUploadImgs.splice(i,1);renderInsUploadModal();}
function saveInsImgs(){const c=D.clients.find(x=>x.id===insUploadCid);if(!c)return;const imgs=insUploadImgs.map(p=>p.dataUrl);if(insUploadId){c.insurance=c.insurance.map(i=>i.id===insUploadId?{...i,images:imgs}:i);}save();closeModal();render();showToast('บันทึกรูปสำเร็จ');}
function viewInsImages(cid,id){
  const c=D.clients.find(x=>x.id===cid);const ins=(c?.insurance||[]).find(x=>x.id===id);if(!ins?.images?.length)return;
  showModal(`📄 ${ins.plan}`,`<div id="img-viewer"></div>`,true);
  const show=(i)=>{const el=$('#img-viewer');if(!el)return;el.innerHTML=`<img src="${ins.images[i]}" style="max-width:100%;max-height:65vh;border-radius:10px;display:block;margin:0 auto"><div style="text-align:center;margin-top:10px;font-size:12px;color:var(--g500)">หน้า ${i+1}/${ins.images.length}</div><div style="display:flex;gap:8px;margin-top:10px">${i>0?`<button class="btn bs" style="flex:1" onclick="(${show.toString()})(${i-1})">◀</button>`:'<div style="flex:1"></div>'}${i<ins.images.length-1?`<button class="btn bp" style="flex:1" onclick="(${show.toString()})(${i+1})">▶</button>`:''}</div>`;};
  setTimeout(()=>show(0),10);
}

// ── Agent Name ──
function openAgentSettings(){
  showModal('ตั้งชื่อตัวแทน',`
    <div class="ff"><label>ชื่อตัวแทน</label><input class="fi" id="ag-name" value="${D.agentName}"></div>
    <div class="br"><button class="btn bs" onclick="closeModal()">ยกเลิก</button><button class="btn bp" onclick="saveAgentName()">บันทึก</button></div>
  `);
}
function saveAgentName(){const n=$('#ag-name').value.trim();if(n){D.agentName=n;save();closeModal();render();showToast('บันทึกสำเร็จ');}}

// ── Main Render ──
function render(){
  const urg=urgentCount();
  const pages=[{k:'dashboard',i:'📊',l:'ภาพรวม'},{k:'clients',i:'👥',l:'ลูกค้า',c:D.clients.length},{k:'renewals',i:'🔔',l:'ครบกำหนด',c:urg||undefined,alert:urg>0}];
  const mbPages=[{k:'clients',i:'👥',l:'ลูกค้า'},{k:'dashboard',i:'📊',l:'ภาพรวม'},{k:'renewals',i:'🔔',l:'ครบกำหนด'}];
  let pg='';
  if(curClientId)pg=renderClientDetail();
  else if(curPage==='dashboard')pg=renderDashboard();
  else if(curPage==='renewals')pg=renderRenewals();
  else pg=renderClients();

  $('#app').innerHTML=`<div class="app">
    <aside class="sidebar">
      <div class="logo"><div class="logo-icon">A</div><div><h1>Asset Hub</h1><small>สำหรับตัวแทนประกัน</small></div></div>
      <div class="sb-section">เมนูหลัก</div>
      <nav>${pages.map(p=>`<button class="ni${!curClientId&&curPage===p.k?' on':''}" onclick="curClientId=null;curPage='${p.k}';render()"><span>${p.i}</span><span>${p.l}</span>${p.c!==undefined?`<span class="cnt${p.alert?' red':''}">${p.c}</span>`:''}</button>`).join('')}</nav>
      <div class="sb-section" style="margin-top:8px">ตัวแทน</div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:var(--g50);cursor:pointer" onclick="openAgentSettings()">
        <div style="width:30px;height:30px;border-radius:8px;background:var(--indigo);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">${D.agentName.charAt(0)}</div>
        <div><div style="font-size:12px;font-weight:500">${D.agentName}</div><div style="font-size:10px;color:var(--g400)">แตะเพื่อแก้ไข</div></div>
      </div>
      <div class="sb-foot">
        <button onclick="doLogout()" style="width:100%;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:none;color:var(--red);font-size:12px;cursor:pointer;border:none;font-family:inherit">🚪 ออกจากระบบ</button>
        <p style="margin-top:6px;padding:0 12px">Asset Hub v2.0</p>
      </div>
    </aside>
    <div class="mh"><div class="logo-icon" style="width:30px;height:30px;font-size:12px">A</div><h1 style="font-size:15px;font-weight:700;flex:1">Asset Hub</h1>${urg>0?`<span class="badge b-r">🔔 ${urg}</span>`:''}</div>
    <main class="main"><div class="mc">${pg}</div></main>
    <div class="mn"><div class="mn-in">${mbPages.map(p=>`<button class="mn-b${!curClientId&&curPage===p.k?' on':''}" onclick="curClientId=null;curPage='${p.k}';render()"><span>${p.i}</span><span>${p.l}</span></button>`).join('')}</div></div>
    <div id="toast" class="toast" style="display:none"></div>
    <div id="modal-root"></div>
  </div>`;
}

render();
