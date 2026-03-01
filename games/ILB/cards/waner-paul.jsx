import { useState } from "react";

const D = {
  name: "Paul Waner", nickname: "Big Poison", year: 1927, team: "Pittsburgh Pirates",
  position: "RF", bats: "L", throws: "L",
  ilb_stats: { ovr: 9, con: 5, pow: 3, spd: 3, def: 3, clu: 1 },
  real: { ba: ".380", h: "237", rbi: "131", r: "113", db: "42", tb: "18", hr: "9", obp: ".437", slg: ".549", war: "6.9" },
  career: { h: "3,152", ba: ".333", db: "605", tb: "191", ops: "134", titles: "3x", mvp: "1927" },
  stat_just: {
    con: "CON 5 (MAX): .380 BA LED NL. 237 H LED NL. 3x batting champ. .333 lifetime. 3,152 career hits (7th to 3,000). 8x 200+ hit seasons. NEVER K > BB in 20 years. Learned hitting from corncobs.",
    pow: "POW 3: 9 HR but 42 2B, 18 3B, 131 RBI (LED NL), 342 TB. 605 career 2B. 191 career 3B. GAP power, not HR power.",
    spd: "SPD 3: 18 3B LED NL 1927. 191 career 3B (10th all-time). Fast on basepaths.",
    def: "DEF 3 (MAX): Stengel: best RF in NL history. 241 outfield assists. Strongest arm in PIT until Clemente.",
    clu: "CLU 1: 1 WS (1927 swept). .333 WS BA. Never returned to October in 20 years."
  },
  personality: {
    leadership: "QUIET EXCELLENCE. Led by production. .380 and 237 hits. The bat spoke for him. Fourteen seasons at .300 or better.",
    temperament: "RELAXED AND FEARLESS. Hit better drunk. 1938: quit drinking, hit .280. Manager said give him whiskey, hit .331. Buddy Hassett: 15 minutes of backflips and cold sober, ready for 3 hits. Casey Stengel: he could slide without breaking the bottle on his hip.",
    work_ethic: "NATURAL AND INSTINCTIVE. Learned from corncobs on Oklahoma farm. In PCL with injured arm: They just let me hit and hit and hit, and I really belted the ball.",
    lifestyle: "WHISKEY AND SAXOPHONE. After 1927 WS, toured 16-week vaudeville with Ruth, Gehrig, Lloyd. Paul played sax, Lloyd violin.",
    tragic: "THE HIT HE REFUSED. June 17, 1942. Hit 3,000 was questionable grounder. Waner shouted No no no. Demanded scorekeeper change to error. Got real 3,000th two days later clean. Only Paul Waner would refuse a milestone because it wasn't earned. Died at 62 - the drinking likely caught up."
  },
  chemistry: [
    { tag: "Corncob School", desc: "+1 CON permanent. Any bat works - 6 hits with 6 different bats from 6 players." },
    { tag: "Big and Little Poison", desc: "With Lloyd: +1 all stats each. 5,611 combined hits - most ever by brothers." },
    { tag: "Whiskey Advantage", desc: "+1 CON relaxed/drinking. -2 CON forced abstinence." },
    { tag: "Backflips to Sober", desc: "Reset intoxication via backflips. Takes 2 innings." },
    { tag: "Refused 3,000th", desc: "Integrity MAXIMUM. Cannot receive unearned awards." },
    { tag: "Unintimidatable", desc: "IMMUNE to brushback. +1 CON after thrown at. One of 2 batters Grimes couldn't scare." },
    { tag: "14 Straight XBH", desc: "ML record. +1 POW per consecutive XBH game." },
    { tag: "Vaudeville Tour", desc: "+1 entertainment value. Saxophone with Ruth and Gehrig." }
  ],
  actions: [
    { title: "The Corncob School", type: "Origin", text: "Learned to hit on 400-acre Oklahoma farm. Corncobs and whittled branches. When he saw a real baseball it looked enormous. Swished, and away it went. 3,152 times." },
    { title: "No No No", type: "Integrity", text: "June 17 1942. Hit 3,000 was a questionable grounder. Stood on first screaming No no no. Demanded error call. Got clean 3,000th two days later." },
    { title: "Whiskey and Backflips", type: "Paradox", text: "1938 quit drinking: .280. Manager told bartender give him whiskey: .331. 15 minutes of backflips cold sober ready for 3 hits. The whiskey was a batting tool." },
    { title: "Saxophone on Vaudeville", type: "Performance", text: "After 1927 WS sweep, Waners joined Ruth and Gehrig for 16 weeks. Paul on sax, Lloyd on violin. The game is larger than the score." }
  ],
  art: {
    face: "5-8 153 lbs. Small compact Oklahoma build. Face RELAXED permanently. Slight smile. Eyes see ball first. NATURAL like water flowing downhill.",
    attire: "Pirates 1927 whites. LEFT-HANDED sweet swing. Bat on shoulder easy. No tension. Just readiness. 237 times.",
    mood: "EASY GRACE. Natural talent without effort. Warm Pittsburgh evening. No drama. Just hitting.",
    style: "PIRATES BLACK + OKLAHOMA GOLD + WHISKEY AMBER. Oklahoma gold border. Most NATURAL card in Bashers.",
    ref: "Hornsby is blade. Heilmann is slugger. Waner is THE NATURAL. .380 looks EASY. Ease IS the weapon."
  }
};

const C={p:"#f5edd6",dk:"#3a2a1a",md:"#6b5339",g:"#c9a84c",wr:"#8b3a2a",sp:"#a0845c",cr:"#faf3e3",ik:"#2a1f14",hr:"#c44536",cb:"#3a6b8c",tg:"#4a7c59",pb:"#2a2a2a",og:"#d4a230",wa:"#b8860b"};
const SB=({l,v,m,c})=>(<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{width:40,fontSize:11,fontWeight:700,color:C.md,fontFamily:"monospace",letterSpacing:1}}>{l}</span><div style={{flex:1,height:14,background:"#e8dcc4",borderRadius:2,overflow:"hidden",border:"1px solid #a0845c40"}}><div style={{width:`${v/m*100}%`,height:"100%",background:`linear-gradient(90deg,${c},${c}cc)`,borderRadius:2}}/></div><span style={{width:20,fontSize:13,fontWeight:900,color:C.ik,fontFamily:"monospace",textAlign:"right"}}>{v}</span></div>);
const CT=({t})=>(<span style={{display:"inline-flex",background:C.og+"15",border:"1px solid "+C.og+"30",borderRadius:3,padding:"3px 8px",margin:"2px 3px",fontSize:11,color:C.dk,fontFamily:"monospace",fontWeight:700}}>{t}</span>);
const Sec=({t,children})=>(<div style={{marginBottom:20}}><div style={{fontSize:10,fontWeight:900,letterSpacing:3,textTransform:"uppercase",color:C.pb,fontFamily:"monospace",borderBottom:"1px solid "+C.pb+"20",paddingBottom:4,marginBottom:10}}>{t}</div>{children}</div>);

export default function PaulWanerCard(){
  const[side,setSide]=useState("front");
  const[tab,setTab]=useState("personality");
  const s=D.ilb_stats;
  const tabs=[{id:"personality",l:"Dossier"},{id:"chemistry",l:"Chemistry"},{id:"actions",l:"Action Seeds"},{id:"art",l:"Art Notes"}];
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.og}12 0%,${C.pb}06 50%,${C.wa}10 100%)`,padding:"24px 12px",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:10,letterSpacing:6,color:C.ik,fontFamily:"monospace",textTransform:"uppercase"}}>Infinity League Baseball</div><div style={{fontSize:10,letterSpacing:3,color:C.og,fontFamily:"monospace",marginTop:4}}>ELITE CARD - Bashers Era - Big Poison</div></div>
      <div style={{width:"100%",maxWidth:440,background:C.p,borderRadius:8,border:"3px solid "+C.og,boxShadow:"0 8px 30px rgba(0,0,0,0.3)",overflow:"hidden"}}>
        <button onClick={()=>setSide(side==="front"?"back":"front")} style={{width:"100%",padding:"10px 0",background:`linear-gradient(90deg,${C.pb},${C.og},${C.wa})`,border:"none",cursor:"pointer",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"#fff",fontFamily:"monospace",fontWeight:700}}>{side==="front"?"Flip - View Dossier":"Flip - View Front"}</button>
        {side==="front"?(
          <div style={{padding:20}}>
            <div style={{width:"100%",aspectRatio:"1/1",border:"3px solid "+C.og+"20",borderRadius:4,marginBottom:16,position:"relative",overflow:"hidden",background:`linear-gradient(135deg,${C.cr},${C.og}08)`}}>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}><div style={{fontSize:64}}>{"🌽"}</div><div style={{fontSize:14,fontWeight:900,color:C.og,fontFamily:"monospace",letterSpacing:3}}>BIG POISON</div><div style={{fontSize:10,color:C.sp,fontFamily:"monospace",marginTop:4}}>See Art Notes tab</div></div>
              <div style={{position:"absolute",top:12,right:12,background:C.pb,color:C.og,padding:"6px 14px",borderRadius:4,fontSize:14,fontWeight:900,fontFamily:"monospace"}}>OVR {s.ovr}</div>
              <div style={{position:"absolute",top:12,left:12,background:C.og+"ee",color:C.pb,padding:"4px 10px",borderRadius:3,fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{D.position}</div>
              <div style={{position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:C.pb+"dd",color:C.og,padding:"3px 12px",borderRadius:3,fontSize:9,fontWeight:700,fontFamily:"monospace",letterSpacing:2,whiteSpace:"nowrap"}}>ELITE - 1927 NL MVP - 3,152 HITS - .333 LIFETIME</div>
            </div>
            <div style={{textAlign:"center",marginBottom:16}}><div style={{fontSize:28,fontWeight:900,color:C.ik}}>{D.name}</div><div style={{fontSize:12,color:C.sp,fontFamily:"monospace",marginTop:4,letterSpacing:2}}>"{D.nickname}" - {D.team} - {D.year}</div><div style={{fontSize:9,color:C.og,fontFamily:"monospace",marginTop:2}}>Harrah OK - Corncobs - Saxophone - Whiskey - 3000 Club</div></div>
            <div style={{marginBottom:16}}><SB l="CON" v={s.con} m={5} c={C.og}/><SB l="POW" v={s.pow} m={5} c={C.pb}/><SB l="SPD" v={s.spd} m={5} c={C.tg}/><SB l="DEF" v={s.def} m={3} c={C.wr}/><SB l="CLU" v={s.clu} m={3} c={C.cb}/></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,background:`linear-gradient(135deg,${C.pb},${C.og})`,borderRadius:4,padding:10}}>
              {[{l:"BA",v:".380"},{l:"HITS",v:"237"},{l:"RBI",v:"131"},{l:"3B",v:"18"},{l:"2B",v:"42"},{l:"OBP",v:".437"},{l:"SLG",v:".549"},{l:"WAR",v:"6.9"}].map((x,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:9,color:"#fff",fontFamily:"monospace",opacity:0.7}}>{x.l}</div><div style={{fontSize:14,color:C.og,fontWeight:900,fontFamily:"monospace"}}>{x.v}</div></div>))}
            </div>
            <div style={{background:C.og+"10",border:"1px solid "+C.og+"25",borderRadius:4,padding:8,marginTop:10,textAlign:"center"}}><div style={{fontSize:11,fontWeight:900,color:C.wr,fontFamily:"monospace",letterSpacing:2}}>CONTACT: 5 - MAXIMUM</div><div style={{fontSize:10,color:C.ik,fontFamily:"monospace",marginTop:2}}>3,152 CAREER HITS - .333 LIFETIME - 3x BATTING CHAMPION</div><div style={{fontSize:9,color:C.sp,fontStyle:"italic",marginTop:4}}>Never in 20 years struck out more than he walked.</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,background:C.pb+"06",borderRadius:4,padding:8,marginTop:8,border:"1px solid "+C.pb+"12"}}>
              {[{l:"CAR H",v:"3,152"},{l:"CAR 2B",v:"605"},{l:"CAR 3B",v:"191"},{l:"CAR BA",v:".333"},{l:"200+ H",v:"8 SZN"},{l:"BAT TTL",v:"3x"},{l:"OPS+",v:"134"},{l:"NL MVP",v:"1927"}].map((x,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:8,color:C.pb,fontFamily:"monospace"}}>{x.l}</div><div style={{fontSize:11,color:C.ik,fontWeight:900,fontFamily:"monospace"}}>{x.v}</div></div>))}
            </div>
          </div>
        ):(
          <div style={{padding:16}}>
            <div style={{textAlign:"center",marginBottom:12}}><div style={{fontSize:20,fontWeight:900,color:C.ik}}>{D.name}</div><div style={{fontSize:10,color:C.pb,fontFamily:"monospace",letterSpacing:2}}>ELITE DOSSIER - {D.year} - BIG POISON</div></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:16,borderBottom:"1px solid "+C.pb+"20",paddingBottom:8}}>
              {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"4px 10px",fontSize:10,fontWeight:tab===t.id?900:500,background:tab===t.id?C.pb:"transparent",color:tab===t.id?C.og:C.md,border:`1px solid ${tab===t.id?C.pb:C.sp}30`,borderRadius:3,cursor:"pointer",fontFamily:"monospace"}}>{t.l}</button>))}
            </div>
            <div style={{fontSize:12,lineHeight:1.6,color:C.ik}}>
              {tab==="personality"&&(<>{Object.entries(D.personality).map(([k,v])=>(<Sec key={k} t={k==="tragic"?"THE HIT HE REFUSED":k.replace(/_/g," ")}><p style={{margin:0,...(k==="tragic"?{color:C.wr}:{})}}>{v}</p></Sec>))}<Sec t="Stat Justifications">{Object.entries(D.stat_just).map(([k,v])=>(<div key={k} style={{marginBottom:8}}><span style={{fontWeight:700,color:C.pb}}>{k.toUpperCase()}:</span> <span style={{color:C.md}}>{v}</span></div>))}</Sec></>)}
              {tab==="chemistry"&&(<Sec t="Chemistry Traits"><div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>{D.chemistry.map((t,i)=><CT key={i} t={t.tag}/>)}</div>{D.chemistry.map((t,i)=>(<div key={i} style={{marginBottom:8}}><span style={{fontWeight:700,color:C.pb}}>{t.tag}:</span> <span style={{color:C.md}}>{t.desc}</span></div>))}</Sec>)}
              {tab==="actions"&&(<Sec t="Action Card Seeds">{D.actions.map((a,i)=>(<div key={i} style={{background:C.og+"06",border:"1px solid "+C.og+"15",borderRadius:4,padding:10,marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:900}}>{a.title}</span><span style={{fontSize:9,padding:"1px 6px",borderRadius:2,background:C.og+"12",color:C.dk,fontFamily:"monospace",fontWeight:700}}>{a.type}</span></div><p style={{margin:0,fontSize:12}}>{a.text}</p></div>))}</Sec>)}
              {tab==="art"&&(<Sec t="Art Direction">{Object.entries(D.art).map(([k,v])=>(<div key={k} style={{marginBottom:10}}><span style={{fontWeight:700,textTransform:"capitalize"}}>{k}:</span> <span style={{color:C.md}}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{background:`linear-gradient(90deg,${C.pb},${C.og},${C.wa})`,padding:"8px 16px",display:"flex",justifyContent:"space-between",fontSize:9,color:"#fff",fontFamily:"monospace"}}><span>ILB ELITE Bashers AL1920</span><span>1920s - RF - OVR {s.ovr}</span></div>
      </div>
    </div>
  );
}
