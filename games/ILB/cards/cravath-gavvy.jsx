import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/cravath-gavvy.png";

const d = {
  name: "Gavvy Cravath", nickname: "Cactus", year: 1915, team: "Philadelphia Phillies",
  era: "1910s", ilb_team: "Muggers 1910", position: "RF", bats: "R", throws: "R",
  height: '5\'10"', weight: "185 lbs",
  born: "March 23, 1881 — Escondido, CA",
  died: "May 23, 1963 — Laguna Beach, CA (age 82)",
};

const s = { ovr: 8, con: 4, pow: 4, spd: 0, def: 1, clu: 0 };

const realStats = [
  { label: "BA", val: ".285" }, { label: "OBP", val: ".393" },
  { label: "SLG", val: ".510" }, { label: "HR", val: "24" },
  { label: "RBI", val: "115" }, { label: "R", val: "89" },
  { label: "BB", val: "86" }, { label: "WAR", val: "7.0" },
];

const careerStats = [
  { label: "CAR BA", val: ".287" }, { label: "CAR H", val: "1,134" },
  { label: "CAR HR", val: "119" }, { label: "CAR RBI", val: "719" },
  { label: "CAR OBP", val: ".380" }, { label: "CAR SLG", val: ".478" },
  { label: "HR TITLES", val: "6" }, { label: "DEBUT AGE", val: "31" },
];

const badges = [
  "💪 6× NL HR Champion", "🏟️ Baker Bowl Slugger", "📊 24 HR (1915 — 20th C. record)",
  "🏅 2× NL RBI Leader", "🌵 Cactus Gavvy", "🐦 Killed a Seagull",
  "❌ .125 in 1915 WS", "⚖️ Laguna Beach Judge (36 years)",
];

const justification = {
  con: ".341 BA in 1913 (best season for average) → tier 4 (≥.340). Led NL in hits (179) that year. Near-Triple Crown. Career .287 — solid but not elite. In 1915 (peak overall season), hit only .285 but led league in 6 offensive categories. The batting eye was excellent (.380 career OBP, led NL in walks and OBP multiple times). Rating of 4.",
  pow: "24 HR in 1915 → 20th-century record until Ruth (1919). 6× NL HR champion (1913-15, 1917-19). .568 SLG in 1913, .510 in 1915. 119 career HR — 4th most in history at retirement. In dead-ball context, 24 HR was as many as 12 of 16 MLB teams COMBINED. Baker Bowl's 272-foot RF porch helped (92 of 119 career HR at home), but he still hit them. 'Some players steal bases with speed. I steal them with my bat.' Rating of 4.",
  spd: "'Wooden shoes and piano legs.' Explicitly, famously slow. Couldn't crack Boston's outfield because of it. Zero base-stealing threat. 'I do not claim to be the fastest man in the world.' He was not. Rating of 0.",
  def: "Led NL outfielders in assists 3 times — the arm was strong and accurate. 'Sure death on fly balls.' But range was severely limited by his lack of speed. Positioned well, threw well, but couldn't cover ground. Defensive value came entirely from the arm. Rating of 1.",
  clu: "1915 WS: .125 (2-for-16), zero HR, zero extra-base hits. Phillies lost in 5 to Boston. 'Looked more like an amateur than any other member of the Phillies.' The most dominant offensive player in the NL disappeared completely on the biggest stage. His groundout drove in the winning run in G1 (Phillies' only win), but otherwise: nothing. Only one pennant in his career. Rating of 0.",
};

const personality = {
  "Leadership Style": "THE SWASHBUCKLER. Stan Baumgartner: 'A swashbuckling, tobacco-chewin', high cussin', bull-necked, blacksmith-armed wielder of the wagon tongue.' Cravath led by personality — boisterous, confident, self-aware about his limitations and proud of his strengths. He didn't pretend to be fast. He just hit the ball over fences in an era when nobody else could.",
  "Temperament": "SELF-DEPRECATING AND FEARLESS. 'They call me wooden shoes and piano legs and a few other pet names. I do not claim to be the fastest man in the world, but I can get around the bases with a fair wind and all sails set. And so long as I am busting the old apple on the seam, I am not worrying a great deal about my legs.' Practical joker. Good-humored. 'A good-humored, helpful chap.'",
  "Work Ethic": "THE ADAPTATION. In Minneapolis, Cravath learned opposite-field hitting to exploit Nicollet Park's 279-foot RF line. He brought that skill to Baker Bowl (272 feet). He wasn't gifted a park — he LEARNED to use it. The 1910-11 Millers stats (.326/14 HR, then .363/29 HR) were the proof of concept. The Phillies were the payoff.",
  "Lifestyle": "CALIFORNIA TO LAGUNA BEACH. Born in Escondido, CA — first San Diego-area player in MLB. Named 'Gavvy' after killing a seagull with a batted ball (gaviota in Spanish). After baseball: real estate in California, then magistrate judge in Laguna Beach for 36 YEARS (1927-1963). Longer judicial career than baseball career. Died at 82.",
  "Clubhouse Impact": "THE CHARACTER. +2 morale (practical jokes, good humor). +1 confidence (if Cravath is hitting, the lineup has a threat). -1 baserunning (piano legs are contagious to watch). The most ENTERTAINING player on the Muggers roster. Not the best. Not the fastest. The most fun.",
  "⚠ Hidden Complexity": "Baker Bowl. 92 of 119 career HR at home. Never more than 5 on the road in any season. The greatest home-park advantage in baseball history. Was Cravath great or was he a product? The answer is both — he was great AT exploiting his environment, which is its own kind of genius. But it kept him out of the HOF. And the .125 in the WS, when Baker Bowl wasn't available for 3 of 5 games, suggests the road Cravath was a different, lesser player. The fence had two sides and Cravath was honest about both.",
};

const chemistry = [
  { tag: "The Dead-Ball Home Run King", desc: "6× NL HR champion. 24 HR in 1915 (20th-century record). Before Ruth, Cravath WAS the power game. +2 POW reputation. Opposing pitchers fear the swing even in the dead-ball era." },
  { tag: "Baker Bowl", desc: "272-foot RF porch. 92 of 119 career HR at home. +2 POW at Baker Bowl. -2 POW on the road. 'There are always two sides to every fence.' The most park-dependent player in ILB." },
  { tag: "Piano Legs", desc: "SPD 0. 'Wooden shoes and piano legs.' Cravath cannot run. He knows it. Everyone knows it. 'So long as I am busting the old apple on the seam, I am not worrying about my legs.'" },
  { tag: "The Seagull", desc: "Named 'Gavvy' after killing a seagull with a batted ball. Gaviota → Gavvy. +1 legend. +1 nickname quality. The most colorful origin story in the Muggers collection." },
  { tag: "The Clerical Error", desc: "Got back to the majors because Minneapolis left out 'not' in a telegram. A typo changed baseball history. +1 fate. Without the error, Cravath stays in the minors and the Phillies never win their first pennant." },
  { tag: "Speaker's Outfield Blocked Him", desc: "Couldn't crack Boston's OF of Speaker, Lewis, Hooper (Golden Outfield — 2 on this roster!). When facing his former team's outfielders, -1 morale (the rejection stings)." },
  { tag: "Cactus", desc: "Western roots, California tough, swashbuckling. +1 toughness. +1 personality. The desert plant that thrives where others can't — in Baker Bowl, in the dead-ball era, everywhere conventional wisdom said power couldn't exist." },
  { tag: "The Judge", desc: "After baseball: magistrate judge in Laguna Beach for 36 years. +1 post-career legacy. Cravath served justice longer than he served the Phillies." },
];

const locations = [
  { location: "Baker Bowl / Philadelphia", affinity: "HIGH", note: "272-foot RF porch. 92 of 119 career HR here. The park that made him — or that he exploited." },
  { location: "Right Field", affinity: "HIGH", note: "Led NL in assists 3×. Strong arm, limited range. The arm was the weapon." },
  { location: "Laguna Beach, CA", affinity: "HIGH", note: "Magistrate judge for 36 years. The longest career of his life." },
  { location: "The Road", affinity: "LOW", note: "Never more than 5 HR on the road in any season. Different player away from Baker Bowl." },
  { location: "The World Series", affinity: "LOW", note: ".125 (2-16) in 1915 WS. 'Looked more like an amateur.' October was not his month." },
];

const momentum = {
  hot: [
    "Baker Bowl home games — when hitting in Philadelphia, Cravath is a different player; the short porch activates his power",
    "Patience at the plate — when drawing walks and working counts, the HR follow; led NL in BB and OBP",
    "Opposite-field mastery — learned at Nicollet Park, perfected at Baker Bowl; when pulling to RF, unstoppable",
    "Good humor — when the clubhouse is loose, Cravath's at-bats improve; the practical joker hits best when laughing",
  ],
  cold: [
    "Road games — 92 of 119 career HR at home; on the road, Cravath's power drops dramatically; POW effectively -2",
    "World Series pressure — .125 in 1915; the biggest stage turned the biggest slugger into an amateur",
    "Speed situations — any context requiring legs (infield hits, extra bases, defense) exposes the SPD 0",
    "Late-career decline — by 1919 was mostly a pinch-hitter; the body that was never fast became barely mobile",
  ],
  pressure: "CATASTROPHIC. The 1915 WS was Cravath's only chance on the biggest stage, and he went 2-for-16 (.125) with zero extra-base hits. The NL's most dominant offensive player — 24 HR, 115 RBI, .510 SLG — vanished against Boston's pitching. 3 of 5 games were on the road, away from Baker Bowl. The road Cravath was always lesser, but the WS Cravath was almost non-existent. CLU 0 is earned, and it's the tragedy of his career.",
};

const actions = [
  { title: "Twenty-Four", type: "Game Action", text: "Your right fielder hits his 24th home run of the season. No one in the 20th century has ever hit more. In a league where teams hit fewer than 20 combined, your slugger has hit 24 alone. The record will stand until a pitcher named Ruth breaks it four years later. +4 POW. +3 all-time record. The dead-ball era's impossible number.", origin: "1915: Cravath hit 24 HR — 20th-century record. As many as 12 of 16 MLB teams combined." },
  { title: "The Baker Bowl Advantage", type: "Game Action", text: "Right field: 272 feet. Your right-handed batter lifts a fly ball that would be an out in any other park. It clears the wall. Home run. 92 of 119 will come here. +2 POW at home. -2 POW on road. 'There are always two sides to every fence.' Your slugger is honest about his advantage.", origin: "92 of 119 career HR at Baker Bowl. Never more than 5 on the road. The most park-dependent slugger ever." },
  { title: "The Gaviota", type: "Drama", text: "Your batter crushes a ball into the California sky. It strikes a seagull in flight. The bird falls dead. The Mexican fans chant: 'Gaviota! Gaviota!' The American fans join in. Your player has a new name. +1 nickname. +1 legend. +0 ornithology. Gavvy Cravath is born.", origin: "Cravath earned his nickname hitting a ball that killed a seagull (gaviota in Spanish) in semi-pro ball." },
  { title: "The Clerical Error", type: "Drama", text: "The Minneapolis Millers send a telegram to Pittsburgh about your player's availability. They mean to write 'NOT available.' They write 'available.' The National Commission rules the error binding. Your player becomes a free agent at 31. He signs with Philadelphia. He hits 119 home runs. A missing word changes baseball history. +3 fate. +1 second chance.", origin: "Minneapolis left out 'not' in a telegram, accidentally making Cravath a free agent. He signed with the Phillies." },
  { title: "One-Twenty-Five in October", type: "Drama", text: "Your slugger — 24 HR, 115 RBI, the most dominant offensive player in the NL — goes 2-for-16 in the World Series. .125. Zero extra-base hits. 'Looked more like an amateur.' The Phillies lose in 5. The fence is 272 feet in Philadelphia. It is 350 in Boston. Your slugger's power has no home here. -3 CLU. -2 reputation. The two sides of every fence.", origin: "1915 WS: Cravath hit .125 (2-16), zero HR, as Phillies lost in 5 to Red Sox." },
  { title: "Piano Legs and Wooden Shoes", type: "Drama", text: "'They call me wooden shoes and piano legs and a few other pet names. I do not claim to be the fastest man in the world, but I can get around the bases with a fair wind and all sails set. And so long as I am busting the old apple on the seam, I am not worrying about my legs.' +2 self-awareness. +1 humor. -2 SPD. The slowest man in the Muggers, and the funniest about it.", origin: "Cravath's self-deprecating quote about his lack of speed — one of the best in dead-ball era baseball." },
  { title: "Six Home Run Titles", type: "Game Action", text: "Your right fielder wins the NL home run crown for the sixth time in seven years. No one has ever done this. Mel Ott will tie it. Ralph Kiner will break it. Mike Schmidt will extend it. But your slugger did it first, in an era when home runs barely existed. +3 POW legacy. +2 historical significance.", origin: "6× NL HR champion (1913-15, 1917-19). Record stood until Kiner's 7th in 1952." },
  { title: "Thirty-Six Years on the Bench", type: "Drama", text: "Your retired slugger becomes a magistrate judge in Laguna Beach, California. He serves for 36 years. He serves the law longer than he served the Phillies. He dies at 82, having hit 119 home runs and rendered thousands of verdicts. +2 judicial legacy. The gavel outlasts the bat.", origin: "Cravath was elected magistrate judge in Laguna Beach in 1927, serving 36 years until his death in 1963." },
];

const art = {
  face: "BULL-NECKED, POWERFUL, AMUSED, WESTERN. 5'10\" 185 lbs — 'bull-necked, blacksmith-armed.' NOT a pretty face. A WORKING face — thick neck, broad shoulders, strong jaw, the face of a man who chews tobacco, cusses fluently, and hits balls over fences that are 272 feet away. California-tanned. The expression: a COCKY GRIN with SELF-AWARENESS. He knows he's slow. He knows the park helps. He doesn't care. He'll hit another one tomorrow.",
  attire: "Philadelphia Phillies 1915 whites — wool flannel with the 'P' insignia, flat cap. THE POSE: the power swing follow-through — Cravath's right-handed swing fully extended, the ball already gone, the body uncoiled. The swing should look VIOLENT and COMPACT — not the graceful line-drive of Wheat but a MUSCLE swing designed to put the ball over the short porch. Bat speed, wrist strength, opposite-field pull. Or: standing at the plate, bat on shoulder, staring at the Baker Bowl wall 272 feet away, knowing exactly what he's going to do.",
  mood: "COCKY CONFIDENCE. Cravath's card should feel like a saloon in the Old West — loud, confident, slightly dangerous, and full of character. Not elegant. Not refined. ENTERTAINING.",
  style: "Sepia-toned with BAKER BOWL RED and CALIFORNIA CACTUS GREEN — the faded red of the Baker Bowl's brick outfield wall, the dusty green of desert cacti. Where Wheat is harvest gold (warm contentment), Cravath is SUNBAKED RED — the color of old brick, hot California sun, and a man who's been playing in small parks his whole career.",
  reference: "The thick neck. The power swing. The Baker Bowl wall looming close behind him. A seagull falling from the sky. The card should feel PHYSICAL — the most muscular, least graceful card in the Muggers outfield collection.",
};

// COMPONENT
const C = {
  parchment: "#f0e4cc", darkBrown: "#3a2014", medBrown: "#7a5030",
  gold: "#c49030", warmRed: "#9b3a20", sepia: "#8a6840",
  cream: "#faf2e0", ink: "#2a1a0a", hotRed: "#c44030",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59", sunbaked: "#a04020",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>
);

const Sec = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function GavvyCravathCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.sunbaked}20 0%, #1a1208 50%, ${C.sunbaked}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>INFINITY LEAGUE BASEBALL</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.sunbaked}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.sunbaked} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1915 — LED NL: HR, RBI, R, BB, OBP, SLG, TB • FIRST PHILLIES PENNANT</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 119 HR (20TH C. RECORD) • NOT IN HOF</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? C.darkBrown : "transparent", color: tab === t ? C.gold : C.medBrown, border: `1px solid ${tab === t ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (<Sec key={k} title={k}><p style={{ margin: 0, ...(k.includes("⚠") ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{v}</p></Sec>))}
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{c.tag}:</span> <span style={{ color: C.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 50, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.warmRed }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="🔥 Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Sec><Sec title="❄ Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`, color: a.type === "Drama" ? C.warmRed : C.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Cravath's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{k}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{k}:</span> <span style={{ color: C.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB • {d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1208", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
