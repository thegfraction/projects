import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/doyle-larry.png";

const d = {
  name: "Larry Doyle", nickname: "Laughing Larry", year: 1912, team: "New York Giants",
  era: "1910s", ilb_team: "Muggers 1910", position: "2B", bats: "L", throws: "R",
  height: '5\'10"', weight: "170 lbs",
  born: "July 31, 1886 — Caseyville, IL",
  died: "March 1, 1974 — Saranac Lake, NY (age 87)",
};

const s = { ovr: 8, con: 3, pow: 2, spd: 2, def: 1, clu: 1 };

const realStats = [
  { label: "BA", val: ".330" }, { label: "OBP", val: "~.390" },
  { label: "SLG", val: "~.471" }, { label: "H", val: "173" },
  { label: "2B", val: "33" }, { label: "3B", val: "8" },
  { label: "HR", val: "10" }, { label: "RBI", val: "90" },
];

const careerStats = [
  { label: "CAR BA", val: ".290" }, { label: "CAR H", val: "1,887" },
  { label: "CAR 2B", val: "299" }, { label: "CAR 3B", val: "123" },
  { label: "CAR HR", val: "74" }, { label: "CAR SB", val: "298" },
  { label: "OPS+", val: "125" }, { label: "WAR", val: "45.1" },
];

const badges = [
  "\u{1F3C5} 1912 NL MVP (Chalmers)", "\u{1F3C6} 1915 NL Batting Champ", "\u2B50 3\u00D7 NL Pennant (Capt.)",
  "\u{1F4AC} 'Great to Be Young & a Giant'", "\u{1F3E0} First HR Out of Polo Grounds",
  "\u{1F4D6} Roomed with Mathewson", "\u{1F3E5} Last Man at Trudeau San.", "\u{1F4DA} Walker Percy's Friend",
];

const justification = {
  con: ".330 BA in 1912 (MVP year) \u2192 tier 3 (.300-.339, upper range). Won 1915 NL batting title (.320). Career .290 \u2014 consistently .290-.310. Led NL in hits twice (1909, 1915). First NL 2B batting champ since Ross Barnes in 1876. For a second baseman, the bat was extraordinary. Rating of 3.",
  pow: "13 HR peak (1911). .527 SLG (1911). 74 career HR \u2014 3rd among all 2B at retirement. 123 career 3B, 299 2B. For a dead-ball era second baseman, outstanding gap power. First to hit a HR out of the Polo Grounds (1913). But not a true slugger by modern standards. Rating of 2.",
  spd: "298 career SB. 30 SB in three consecutive years (1909-11). 25 3B (led NL 1911 \u2014 most by NL player since 1899). 17 steals of home. Good speed and daring baserunning. 'Hustling, aggressive, McGraw style of player.' Rating of 2.",
  def: "Solid 2B defensively. Led NL 2B in putouts (1909), double plays (1909, 1915). 'Capers at second base' \u2014 energetic, athletic. But not Collins-level precision or range. Adequate, not exceptional. Rating of 1.",
  clu: ".237 WS BA across 19 games. 3\u00D7 WS participant (1911, 1912, 1913) \u2014 lost ALL THREE. .304 in 1911 WS (decent, scored disputed winning run in G5). But overall: 0 championships, below-average October hitting. The WS failures are the career's wound. Rating of 1.",
};

const personality = {
  "Leadership Style": "THE BELOVED CAPTAIN. Team captain of the Giants for 5+ years. Filled in for John McGraw when the manager was ejected or suspended. Hugh Fullerton: 'Doyle is easily the best ball player on the Giants, a hustling, aggressive, McGraw style of player, full of nerve, grit and true courage. I think he is gamer than his manager, and in some respects a better baseball general.' Teammates elected him captain \u2014 not appointed, ELECTED.",
  "Temperament": "'LAUGHING LARRY.' The winning smile. The capers at second base. The sunny disposition that made him a favorite of fans, teammates, and sportswriters alike. Damon Runyon, Ring Lardner, Heywood Broun all adored him. He was cheerful in victory and cheerful in defeat \u2014 even after losing three consecutive World Series. The laughter was genuine, not a mask.",
  "Work Ethic": "TRANSFORMED BY DISCIPLINE. Showed up for 1911 spring training for the first time in three years ON TIME, ten pounds lighter, in the best shape of his life. The result: .310/25 3B/13 HR/.527 SLG, 3rd in MVP. The talent was always there. The commitment arrived at 24 and elevated him from good to great.",
  "Lifestyle": "MATHEWSON'S ROOMMATE. Roomed with Christy Mathewson on the road. They studied Florida real estate and the stock market together. Doyle earned $8,000/year (only $3,000 less than Matty). The friendship was intellectual and deep \u2014 two men who loved baseball and numbers equally. Mathewson was diagnosed with TB in 1920. Doyle contracted TB in 1942 \u2014 entered Trudeau Sanatorium in Saranac Lake, NY. When the san closed in 1954, DOYLE WAS THE LAST RESIDENT TO LEAVE. Life Magazine covered his final meal and his departure on foot. He stayed in Saranac Lake for 20 more years. Died there at 87.",
  "Clubhouse Impact": "THE MORALE CENTER. +3 morale (laughter is contagious). +2 team chemistry (elected captain). +1 sportswriter relations (beloved by Runyon, Lardner, Broun). 'It's great to be young and a Giant' became the slogan of an era. Doyle didn't just play for the Giants \u2014 he EMBODIED what being a Giant meant in the 1910s.",
  "\u26A0 Hidden Complexity": "Three World Series. Three losses. .237 WS BA. The Giants of 1911-13 were the best NL team of the era, and they couldn't win October. Doyle's missed tag at home in 1911 WS G5 \u2014 scoring the winning run without actually touching the plate, as umpire Klem later admitted \u2014 is a metaphor for the whole career: close to glory, never quite touching it. And then tuberculosis. The roommate of Mathewson \u2014 who died of TB in 1925 \u2014 contracted the same disease 17 years later. The san. Walker Percy. The last man to leave. Life Magazine. Saranac Lake for 20 years. It's great to be young and a Giant. It's less great to be old and sick and the last man in a closing sanatorium. But Doyle laughed through that too.",
};

const chemistry = [
  { tag: "It's Great to Be Young and a Giant", desc: "'It's great to be young and a New York Giant.' Said to Damon Runyon, 1911. The most famous quote in Muggers-era baseball. +3 morale when young. -2 poignancy when old." },
  { tag: "Laughing Larry", desc: "The winning smile. The capers. The laughter. +2 morale. +1 sportswriter relations. Doyle makes every clubhouse better simply by being in it." },
  { tag: "Mathewson's Roommate", desc: "Roomed with Christy Mathewson. Studied stocks and real estate together. +2 intellectual bond. When Mathewson appears in opposing lineup: +1 respect, -1 emotional stability." },
  { tag: "McGraw's Captain", desc: "Team captain 5+ years. Filled in when McGraw was ejected. 'Gamer than his manager.' +2 leadership. +1 tactical awareness." },
  { tag: "The Missed Tag", desc: "1911 WS G5: scored winning run in 10th \u2014 but never touched home plate. Klem admitted it later. +1 luck. -1 legitimacy. The most famous phantom run in WS history." },
  { tag: "Three October Losses", desc: "3\u00D7 WS (1911-13), lost all three. .237 WS BA. The team that couldn't win October. -1 CLU. -1 legacy. The shadow that hangs over Laughing Larry." },
  { tag: "The Last Man at Trudeau", desc: "TB in 1942. Trudeau Sanatorium. Friends with Walker Percy. When the san closed in 1954: last resident to leave. Life Magazine covered it. +2 resilience. +2 story. The most extraordinary post-career narrative in ILB." },
  { tag: "Walker Percy's Friend", desc: "At Trudeau, Doyle befriended novelist Walker Percy (also TB patient). They talked baseball for hours. +1 literary connection. +1 cultural legacy. The second baseman and the novelist, both fighting to breathe." },
];

const locations = [
  { location: "Polo Grounds / New York", affinity: "HIGH", note: "1907-16, 1918-20. First HR hit out of the park (1913). Home." },
  { location: "Second Base", affinity: "HIGH", note: "NL's best 2B of the 1910s. .408 career SLG \u2014 highest by NL 2B at retirement." },
  { location: "The World Series", affinity: "LOW", note: ".237 across 19 games. 3\u00D7 participant, 0 titles. The wound." },
  { location: "Trudeau Sanatorium", affinity: "COMPLEX", note: "1942-54. TB patient. Walker Percy. Last man out. Life Magazine." },
  { location: "Saranac Lake, NY", affinity: "HIGH", note: "1954-74. 20 years after the san closed. Died there. Buried at St. Bernard's." },
];

const momentum = {
  hot: [
    "Youth and joy \u2014 when Doyle is young, confident, laughing, the bat comes alive; the 1911-12 peak",
    "Pennant races \u2014 'thinking and dreaming pennants'; team captain energy elevates in September",
    "Sportswriter attention \u2014 when Runyon, Lardner, Broun are watching, Doyle performs; he loved the stage",
    "McGraw's trust \u2014 when serving as captain, making managerial decisions; the responsibility focused him",
  ],
  cold: [
    "World Series pressure \u2014 .237 WS BA; the October collapse is real and recurring; 3 chances, 3 failures",
    "Aging \u2014 after 1915 batting title, sharp decline; traded to Cubs 1916; the youth that was great runs out",
    "Separation from Giants \u2014 traded to Cubs in 1916; 'fiercely loyal' player devastated; -2 morale away from NY",
    "Health \u2014 TB in 1942; the disease that killed his roommate Mathewson; the body that once did capers at second base",
  ],
  pressure: "POOR in October. .237 WS BA across 19 games, 0-for-3 in World Series. The 1911-13 Giants were the NL's best team and lost three consecutive Fall Classics. Doyle was .304 in 1911 (decent), but the overall record is below average. The phantom run in 1911 G5 \u2014 scoring without touching home \u2014 is the career in miniature: close to glory, technically not there. CLU 1.",
};

const actions = [
  { title: "It's Great to Be Young and a Giant", type: "Drama", text: "Your second baseman is 24 years old, the captain of the National League's best team, hitting .310 with 25 triples. A sportswriter named Damon Runyon asks how it feels. 'It's great to be young and a New York Giant.' The quote outlives the career, the team, the era. It becomes the motto of an age. +3 morale. +2 quotability. +1 immortality.", origin: "Doyle to Damon Runyon, 1911. The most famous quote of the dead-ball era." },
  { title: "The Phantom Run", type: "Drama", text: "World Series Game 5. Bottom of the 10th. Your 2B tags up on a fly ball, races home, slides across the plate. Safe! Giants win 4-3! Except: umpire Bill Klem later says your runner never touched the plate. He would have been out if the Athletics had tagged him. The run counts. The truth doesn't. +1 win. -1 legitimacy. The most famous phantom run in WS history.", origin: "1911 WS G5: Doyle scored the winning run but Klem later said he never touched home." },
  { title: "The MVP Laughs", type: "Game Action", text: "Your second baseman wins the NL Most Valuable Player award. He hit .330. He laughed through every game. They call him Laughing Larry. The award is a Chalmers automobile. The laughter is free. +3 MVP. +2 personality. +1 automobile.", origin: "1912: Doyle won the NL Chalmers Award (MVP), hitting .330." },
  { title: "First Ball Over the Polo Grounds", type: "Game Action", text: "Your second baseman hits a home run that clears the Polo Grounds \u2014 the first player ever to do so. The ball disappears over the grandstand and into Coogan's Bluff. +2 POW. +2 historical significance. The first ball to leave the park.", origin: "1913: Doyle was the first player to hit a HR out of the Polo Grounds." },
  { title: "Three Octobers, Three Losses", type: "Drama", text: "Your team captain leads the Giants to three consecutive pennants. Three consecutive World Series. Three consecutive losses. 1911: to Philadelphia. 1912: to Boston. 1913: to Philadelphia again. Your captain hits .237 combined. The laughter continues but quieter. -2 CLU. -1 legacy. It was great to be young. October was something else.", origin: "Giants lost 3 consecutive WS (1911-13). Doyle batted .237 across 19 games." },
  { title: "The Last Man at Trudeau", type: "Drama", text: "The sanatorium is closing. Every other patient has been discharged. Your retired second baseman \u2014 now 68, tuberculosis for 12 years \u2014 is the last resident. Life Magazine photographers watch him eat his final meal. He walks out the door on foot. He stays in Saranac Lake for 20 more years. He dies there at 87. +3 resilience. +2 story. The last laugh of Laughing Larry.", origin: "1954: Trudeau closed. Doyle was the last resident to leave. Life Magazine covered it." },
  { title: "Walker Percy's Friend", type: "Drama", text: "In the tuberculosis sanatorium, your retired second baseman meets a young writer named Walker Percy. They are both patients. They talk baseball for hours. Percy will become one of America's greatest novelists. Doyle is the man who told him about curves and steals and the 1911 World Series. +2 literary connection. The novelist and the ballplayer, both learning to breathe.", origin: "Doyle and Walker Percy were both TB patients at Trudeau in the 1940s." },
  { title: "Mathewson's Roommate", type: "Drama", text: "Your second baseman rooms with Christy Mathewson on road trips. They study stocks. They discuss real estate. They talk baseball until midnight. Mathewson will die of tuberculosis in 1925. Your second baseman will contract the same disease in 1942. The roommate bond extends beyond baseball, beyond health, beyond life. +2 friendship. -1 fate.", origin: "Doyle roomed with Mathewson. Both contracted TB. Mathewson died 1925, Doyle survived." },
];

const art = {
  face: "YOUNG, BRIGHT, LAUGHING, ALIVE. 5'10\" 170 lbs \u2014 lean, athletic, cheerful. The face should be RADIANT \u2014 the face of a man they called 'Laughing Larry,' whose winning smile made him a favorite of every sportswriter in New York. The expression: a GENUINE, WARM LAUGH. Not the reckless grin of Ruth or the cocky smirk of Cravath. A REAL LAUGH \u2014 the laugh of a 24-year-old who is the captain of the best team in baseball and knows it. The eyes should be bright, intelligent, amused. He rooms with Mathewson. He makes McGraw laugh.",
  attire: "New York Giants 1912 whites \u2014 'NY' interlocking insignia, flat cap. THE POSE: at second base, mid-'caper' \u2014 Doyle in the field, athletic and energetic, turning a double play or fielding a grounder with flair. Or: the left-handed swing, compact and quick, driving a triple into the gap. The energy should be YOUTHFUL and ENTHUSIASTIC.",
  mood: "YOUTH AND JOY. 'It's great to be young and a Giant.' The card should feel like being 24 in New York City in 1911 \u2014 the world is golden, the team is winning, the sportswriters are writing poems about you. BEFORE the three WS losses. BEFORE the tuberculosis. BEFORE the sanatorium. The GOLDEN MOMENT of being young and great and alive in New York.",
  style: "Sepia-toned with POLO GROUNDS GOLD and NEW YORK TWILIGHT BLUE \u2014 the warm gold of the Polo Grounds in afternoon light, the deepening blue of a New York evening. Where Schulte is wildfire orange (eccentric bonfire) and Wheat is harvest gold (contentment), Doyle is GOLDEN HOUR \u2014 the brief perfect light before sunset. The most LUMINOUS palette in the Muggers collection. The light of youth.",
  reference: "The laughing face. The Giants uniform. The Polo Grounds in golden light. The card should feel like the most JOYFUL moment in baseball \u2014 and underneath it, the viewer should sense that the joy is temporary, that the sanatorium waits, that the last meal will be eaten alone. But on the SURFACE: pure gold.",
};

const Cl = {
  parchment: "#f4ecd4", darkBrown: "#2a1a10", medBrown: "#7a5a30",
  gold: "#d4a840", warmRed: "#9b4a2a", sepia: "#8a7050",
  cream: "#faf4e4", ink: "#2a1a08", hotRed: "#c44030",
  coldBlue: "#3a6888", traitGreen: "#4a7c59", glow: "#d4a030",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: Cl.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${Cl.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: Cl.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", background: `${Cl.traitGreen}15`, border: `1px solid ${Cl.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: Cl.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>);
const Sec = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: Cl.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${Cl.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function LarryDoyleCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.glow}20 0%, #1a1510 50%, ${Cl.glow}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>INFINITY LEAGUE BASEBALL</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card &mdash; Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: Cl.parchment, borderRadius: 8, border: `3px solid ${Cl.gold}`, boxShadow: `0 0 0 1px ${Cl.darkBrown}, 0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: Cl.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: Cl.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "\u25BC Flip Card \u2014 View Dossier \u25BC" : "\u25B2 Flip Card \u2014 View Front \u25B2"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${Cl.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: Cl.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${Cl.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${Cl.darkBrown}dd`, color: Cl.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${Cl.glow}dd`, color: Cl.darkBrown, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>&ldquo;{d.nickname}&rdquo; &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.glow, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>&ldquo;It&rsquo;s great to be young and a Giant.&rdquo;</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={Cl.glow} />
              <StatBar label="POW" value={s.pow} max={5} color={Cl.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={Cl.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={Cl.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={Cl.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: Cl.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: Cl.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1912 &mdash; NL MVP (CHALMERS AWARD) &bull; .330 BA</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER &mdash; 3x NL PENNANT (CAPT.) &bull; 0 WS TITLES &bull; NOT IN HOF</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (<span key={i} style={{ fontSize: 9, background: `${Cl.gold}20`, border: `1px solid ${Cl.gold}40`, padding: "2px 8px", borderRadius: 10, color: Cl.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: Cl.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER &mdash; {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${Cl.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? Cl.darkBrown : "transparent", color: tab === t ? Cl.gold : Cl.medBrown, border: `1px solid ${tab === t ? Cl.gold : Cl.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: Cl.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (<Sec key={k} title={k}><p style={{ margin: 0, ...(k.includes("\u26A0") ? { color: Cl.warmRed, fontStyle: "italic" } : {}) }}>{v}</p></Sec>))}
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 60, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${Cl.traitGreen}20` : l.affinity === "LOW" ? `${Cl.warmRed}20` : `${Cl.sepia}20`, color: l.affinity === "HIGH" ? Cl.traitGreen : l.affinity === "LOW" ? Cl.warmRed : Cl.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Doyle's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: Cl.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1510", borderRadius: 6, padding: 16, border: `1px solid ${Cl.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
