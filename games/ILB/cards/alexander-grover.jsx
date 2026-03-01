import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/alexander-grover.png";

const d = {
  name: "Grover Alexander", nickname: "Old Pete", year: 1915, team: "Philadelphia Phillies",
  era: "1910s", ilb_team: "Muggers 1910", position: "SP", throws: "R", bats: "R",
  height: '6\'1"', weight: "185 lbs",
  born: "February 26, 1887 — Elba, NE",
  died: "November 4, 1950 — St. Paul, NE (age 63)",
};

const s = { ovr: 12, stf: 5, ctl: 4, sta: 5, def: 1, clu: 2 };

const realStats = [
  { label: "W-L", val: "31-10" }, { label: "ERA", val: "1.22" },
  { label: "K", val: "241" }, { label: "SHO", val: "12" },
  { label: "IP", val: "376.1" }, { label: "CG", val: "36" },
  { label: "WHIP", val: "0.84" }, { label: "WAR", val: "10.8" },
];

const careerStats = [
  { label: "CAR W", val: "373" }, { label: "CAR L", val: "208" },
  { label: "CAR ERA", val: "2.56" }, { label: "CAR K", val: "2,198" },
  { label: "CAR SHO", val: "90" }, { label: "CAR IP", val: "5,190" },
  { label: "TRIPLE C", val: "3\u00D7" }, { label: "HOF", val: "1938" },
];

const badges = [
  "\u{1F451} 3\u00D7 NL Pitching Triple Crown", "\u{1F3C6} 373 Wins (T-3rd All-Time)",
  "\u{1F6D1} 16 Shutouts 1916 (MLB Record)", "\u{1F525} 31-33-30 Wins (1915-17)",
  "\u{1F1FA}\u{1F1F8} WWI Veteran (Shell Shock)", "\u26A1 Epilepsy / Hearing Loss",
  "\u{1F3C6} 1926 WS: Struck Out Lazzeri", "\u{1F947} 90 Career SHO (NL Record)",
];

const justification = {
  stf: "1.22 ERA in 1915 \u2014 the best in the NL, not topped until Gibson 1968 by WAR. 16 shutouts in 1916 (ALL-TIME MLB RECORD \u2014 still stands). 2,198 career K. 'A live fastball that moved in on right-handers and a sharp-breaking curve.' Wide variety of breaking pitches with deceptive speed. Johnny Evers: 'He made me want to throw my bat away.' Won 190 games for the Phillies despite Baker Bowl's 272-foot RF. Rating of 5.",
  ctl: "Extraordinary control. In 4 complete-game doubleheaders (1916-17), faced 139 batters and walked TWO. Career ability to limit walks was elite. 'Using pinpoint control' was his signature. Led NL in WHIP multiple years. 953 career BB in 5,190 IP \u2014 roughly 1.65 BB/9. Rating of 4.",
  sta: "376.1 IP (1915). 389 IP (1916). 388 IP (1917). THREE CONSECUTIVE SEASONS over 370 IP. 31 CG as a rookie. Won both games of a doubleheader TWICE. 5,190 career IP. 'His arm never seemed to tire.' The most durable pitcher on the Muggers. Rating of 5.",
  def: ".985 career fielding %. 25 errors in 1,633 chances. Good fielding pitcher for his era. Standard, not exceptional. Rating of 1.",
  clu: "1915 WS: Won G1 (only Phillies win), but team lost in 5. 1926 WS: The LEGEND \u2014 age 39, won G2 and G6 (CG), then entered G7 in relief with bases loaded, 2 outs, 7th inning. Struck out Tony Lazzeri. Pitched 2 more scoreless innings. Cardinals won. The most famous relief appearance in WS history. 'Less than a foot made the difference between a hero and a bum.' Rating of 2.",
};

const personality = {
  "Leadership Style": "THE STOIC WORKHORSE. Alexander led by ENDURANCE, not charisma. He pitched 370+ innings three consecutive years. He won both games of doubleheaders. He shut out opponents 90 times. The team followed because the man on the mound NEVER STOPPED. No speeches, no motivation \u2014 just the ball, the mound, and the next pitch. Ruth: 'Just to see old Pete out there on the mound, with that cocky little undersized cap pulled down over one ear, chewing away at his tobacco and pitching baseballs as easy as pitching hay.'",
  "Temperament": "QUIET, STOIC, DAMAGED. Before the war: quiet Nebraskan, hardworking, reserved. After the war: epileptic, deaf in one ear, alcoholic, haunted. The war broke something essential. The seizures could come at any time. The drinking was self-medication. The silence deepened. He pitched through all of it \u2014 27 wins in 1920, the Lazzeri strikeout in 1926, the Cardinals championship. The talent survived the damage. The man did not.",
  "Work Ethic": "SUPERHUMAN DURABILITY. 376 IP. 389 IP. 388 IP. Three consecutive seasons. 31 complete games as a rookie. Won both games of a doubleheader twice. Dug postholes for the phone company before baseball \u2014 the body was built for labor. The arm was a machine. When the machine broke (WWI), he rebuilt it through sheer will, posting a Triple Crown season at age 33 (1920).",
  "Lifestyle": "TRAGIC. Named after a president. Dug postholes. Played baseball. Went to war. Lost his hearing. Gained epilepsy. Drank. Won 373 games. Won the 1926 World Series at 39. Lost his wife (divorced, remarried, divorced again). Toured with the House of David team. Lived in a boardinghouse in St. Paul, Nebraska. Was elected to the Hall of Fame: 'The Hall of Fame is fine, but it doesn't mean bread and butter.' Found dead at 63. Buried in Elmwood Cemetery. Ronald Reagan played him in a movie. The movie was better than the ending.",
  "Clubhouse Impact": "THE ANCHOR. +3 pitching rotation stability (you can't shake a rotation that has Alexander pitching 370+ IP). +2 opponent intimidation ('He made me want to throw my bat away'). -1 reliability (epileptic seizures, alcohol). -1 emotional availability (the silence of a damaged man). The team depended on his arm. They could not reach his mind.",
  "\u26A0 Hidden Complexity": "The war. Everything changed in France. Before 1918: the greatest pitcher in the NL, healthy, dominant, winning 30+ games per season. After 1918: epileptic, deaf in one ear, alcoholic, struggling with what we now call PTSD. He still won. He won the 1920 Triple Crown. He struck out Lazzeri in the 1926 World Series. He won 373 games. But the price was his life. He died alone in a boardinghouse at 63. The Hall of Fame plaque and the boardinghouse room: both are the real Alexander.",
};

const chemistry = [
  { tag: "Alexander the Great", desc: "373 wins. 90 shutouts. 3\u00D7 Triple Crown. The NL's Walter Johnson. +5 historical significance. The greatest right-handed pitcher in NL history alongside Mathewson." },
  { tag: "Sixteen Shutouts", desc: "16 shutouts in 1916 \u2014 the ALL-TIME MLB RECORD. Still stands. Will likely never be broken. +4 dominance. Almost half his 33 wins were shutouts." },
  { tag: "Three Thirties", desc: "31-33-30 wins from 1915-17. Three consecutive 30-win seasons. Only modern NL pitcher to do it. +4 durability. +3 dominance." },
  { tag: "The Shell", desc: "WWI: 342nd Field Artillery, France. Shell exploded nearby. Lost hearing in one ear. Developed epilepsy. Shell shock. -2 health. -1 hearing. The war that broke the greatest pitcher alive." },
  { tag: "The Bottle", desc: "Alcoholism began before the war, worsened catastrophically after. Self-medication for epilepsy and PTSD. -2 reliability. -1 per season cumulative. The disease that followed the disease." },
  { tag: "The Lazzeri Strikeout", desc: "1926 WS G7: age 39, entered in relief, bases loaded, 2 outs, 7th inning. Struck out Lazzeri. Pitched 2 more scoreless innings. Cardinals won. +4 CLU. +3 legend. 'Less than a foot between a hero and a bum.'" },
  { tag: "Baker Bowl Defiance", desc: "190 wins with a 2.18 ERA at Baker Bowl (272-ft RF). The most park-defiant pitcher in history. Where Cravath exploited Baker Bowl, Alexander conquered it." },
  { tag: "The Boardinghouse", desc: "After baseball: boardinghouse in St. Paul, Nebraska. Found dead at 63. 'The Hall of Fame is fine, but it doesn't mean bread and butter.' +2 tragedy. The ending the arm couldn't prevent." },
];

const locations = [
  { location: "Baker Bowl / Philadelphia", affinity: "HIGH", note: "1911-17. 190-91, 2.18 ERA. 61 SHO. Defied the 272-ft RF wall." },
  { location: "The Mound", affinity: "SUPREME", note: "5,190 career IP. 370+ IP three consecutive years. His office." },
  { location: "France (WWI)", affinity: "DEVASTATING", note: "342nd Field Artillery. Shell shock. Epilepsy. Hearing loss. Everything changed." },
  { location: "Yankee Stadium (1926 WS)", affinity: "LEGENDARY", note: "G7 relief: Lazzeri strikeout. 2 scoreless innings. World champions." },
  { location: "St. Paul, NE", affinity: "HOME/END", note: "Born nearby. Died there. Boardinghouse. Elmwood Cemetery." },
];

const momentum = {
  hot: [
    "Fresh arm \u2014 early in the season, Alexander is unhittable; the arm is a machine; 1.22 ERA territory",
    "Shutout mode \u2014 when Alexander's control is locked in, opponents cannot score; 16 in a single season",
    "Big game focus \u2014 the 1926 WS proved that Alexander rises in October; the Lazzeri strikeout at 39",
    "Pennant races \u2014 led Phillies to FIRST EVER pennant (1915); the workhorse carries the team",
  ],
  cold: [
    "Epileptic episode \u2014 seizures can strike at any time; 15% chance per month; -2 availability, -1 performance",
    "Alcohol \u2014 drinking worsens after WWI; impacts preparation, recovery, reliability; cumulative damage",
    "Post-war decline \u2014 after 1918, Alexander is great but no longer superhuman; the 30-win seasons are gone",
    "Late career exhaustion \u2014 5,190 career IP; the arm eventually gives out; the body follows",
  ],
  pressure: "HEROIC when it matters most. The 1926 World Series performance is one of the greatest in baseball history: age 39, won G2 (CG), won G6 (CG), then entered G7 in relief with bases loaded, struck out Lazzeri, pitched 2 more scoreless innings to clinch the championship. The 1915 WS was less successful (won G1, team lost in 5). But the 1926 moment \u2014 the broken man, the loaded bases, the strikeout \u2014 is transcendent. CLU 2.",
};

const actions = [
  { title: "Sixteen Shutouts", type: "Game Action", text: "Your pitcher finishes the season with 16 shutouts. Thirty-three wins. Almost half of them are shutouts. The all-time Major League record, never to be broken. +5 dominance. +3 history. The number that will stand forever: sixteen.", origin: "1916: Alexander threw 16 shutouts \u2014 the MLB single-season record. Still stands." },
  { title: "The Lazzeri Strikeout", type: "Game Action", text: "World Series Game 7. Bottom of the 7th. Bases loaded. Two outs. Your pitcher is 39 years old. He won yesterday's game \u2014 a complete game. He enters from the bullpen. Tony Lazzeri has 117 RBI this season. The first pitch nearly goes for a grand slam \u2014 foul by inches. Then: strikeout. Two more scoreless innings. World champions. +4 CLU. +3 legend. Less than a foot between a hero and a bum.", origin: "1926 WS G7: Alexander struck out Lazzeri with bases loaded, then closed the game." },
  { title: "Three Consecutive Thirties", type: "Game Action", text: "31 wins. 33 wins. 30 wins. Three consecutive seasons. No NL pitcher in the modern era has done this before. None will again. Your arm pitched 1,153 innings in three years. It never seemed to tire. +5 durability. +4 dominance. The three-year stretch that defines a generation.", origin: "1915-17: Alexander won 31, 33, and 30 games for the Phillies." },
  { title: "The Shell", type: "Drama", text: "France. 1918. Your pitcher is a sergeant in the 342nd Field Artillery. A shell explodes nearby. His hearing in one ear is gone. Epilepsy begins. The war is over for him, but the war inside has just started. He returns to baseball. He still wins. He wins 27 games in 1920. He wins the Triple Crown. But the seizures come without warning. The drinking starts and doesn't stop. -2 health. -1 hearing. The greatest pitcher alive, broken by something larger than baseball.", origin: "WWI: shell explosion caused partial deafness and epilepsy. Alexander served in France." },
  { title: "Baker Bowl Defiance", type: "Game Action", text: "Your pitcher posts a 2.18 ERA in a park with a 272-foot right field wall. The same park where Gavvy Cravath hits 92 of his 119 career home runs. 190 wins. 61 shutouts. The wall doesn't matter when the pitching is this precise. +3 park defiance. Where Cravath exploited Baker Bowl, Alexander conquered it.", origin: "Alexander's Phillies ERA was 2.18 at Baker Bowl despite 272-ft RF." },
  { title: "The Rookie Record", type: "Game Action", text: "Your rookie pitcher wins 28 games, completes 31. Leads the National League. One of his shutouts is a 1-0 victory over Cy Young in Young's final season. The past meets the future. The record still stands. +3 rookie dominance. +1 historical symmetry.", origin: "1911: Alexander's 28 rookie wins is still the record. Beat Cy Young 1-0." },
  { title: "The Boardinghouse", type: "Drama", text: "Your Hall of Fame pitcher is living in a boardinghouse in St. Paul, Nebraska. The town where he went to high school. He was elected to the Hall of Fame in 1938: 'The Hall of Fame is fine, but it doesn't mean bread and butter.' He is found dead on November 4, 1950. He is 63. Ronald Reagan will play him in a movie. The movie has a happy ending. The life did not. +2 tragedy. -3 justice.", origin: "Alexander died alone in a boardinghouse at 63. Reagan played him in 'The Winning Team' (1952)." },
  { title: "Both Games of a Doubleheader", type: "Game Action", text: "Your pitcher wins the first game of the doubleheader. Then he wins the second game. Two complete games in one day. He did this TWICE \u2014 1916 and 1917. In those four complete games, he faced 139 batters and walked two. +4 STA. +2 control. The arm that never tired.", origin: "Alexander won both games of doubleheaders twice (Sept 1916, Sept 1917)." },
];

const art = {
  face: "WEATHERED, STOIC, HAUNTED, NEBRASKA-TOUGH. 6'1\" 185 lbs \u2014 lean, strong, the body of a man who dug postholes and pitched 370+ innings. The face should show TWO LAYERS: the SURFACE of quiet Nebraskan competence, and UNDERNEATH, the damage of France \u2014 the partial deafness, the epilepsy, the shell shock. This is NOT a happy face. Not angry either. RESIGNED. The face of a man who has seen artillery fire and still throws baseballs for a living. The famous 'cocky little undersized cap pulled down over one ear' (the deaf ear). Tobacco bulge in cheek. The eyes: DISTANT but PRECISE \u2014 the same eyes that spotted the strike zone from 60 feet and that saw shells explode in France.",
  attire: "Philadelphia Phillies 1915 whites \u2014 the block-letter 'P' that was later retired in his honor (2001). Flat cap PULLED DOWN over one ear. THE POSE: the right-handed delivery \u2014 Alexander's smooth, effortless motion that generated deceptive speed. 'Pitching baseballs as easy as pitching hay.' The motion should look ECONOMICAL and EFFORTLESS \u2014 not the power of Johnson's sidearm whip but the PRECISION of a man who walked 2 batters in 139 faced. Or: the walk from the bullpen in Game 7, 1926 \u2014 the 39-year-old man approaching the mound with the bases loaded.",
  mood: "STOIC AND HAUNTED. The card should feel like ENDURANCE \u2014 not the bright joy of Doyle or the electric chaos of Schulte. The WEIGHT of 5,190 innings, 90 shutouts, a war, and a bottle. The card should communicate that this arm carried everything: the Phillies' first pennant, the Cardinals' championship, and the wreckage of a war. And it was never enough.",
  style: "Sepia-toned with NEBRASKA WHEAT and BATTLEFIELD GRAY \u2014 the golden-tan of Nebraska wheat fields (his homeland, his grave) and the gray-green of French trenches (his war, his wound). Where Johnson is navy/lightning (power, authority) and Plank is battlefield gray (stoic endurance), Alexander is WHEAT AND ASH \u2014 the golden beginning and the gray ending. The palette of a man who was born in wheat country and died in a boardinghouse.",
  reference: "The weathered face. The cap over the deaf ear. The effortless delivery. The boardinghouse. The card should feel like the HEAVIEST card in the Muggers collection \u2014 not in body but in WEIGHT OF STORY. 373 wins and a lonely death. The arm that never tired and the man who was always tired.",
};

const Cl = {
  parchment: "#ede2c8", darkBrown: "#2a1a0e", medBrown: "#7a5530",
  gold: "#c09028", warmRed: "#8a3020", sepia: "#806840",
  cream: "#f4ecda", ink: "#2a1808", hotRed: "#a83828",
  coldBlue: "#3a6480", traitGreen: "#4a7c59", wheat: "#c8a050",
  ash: "#6a7a6a",
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

export default function GroverAlexanderCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.wheat}15 0%, #18120a 50%, ${Cl.ash}15 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ position: "absolute", top: 12, left: 12, background: `${Cl.wheat}dd`, color: Cl.darkBrown, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>&ldquo;{d.nickname}&rdquo; &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.wheat, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Alexander the Great &bull; 373 Wins &bull; 90 Shutouts</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={Cl.warmRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={Cl.wheat} />
              <StatBar label="STA" value={s.sta} max={5} color={Cl.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={Cl.coldBlue} />
              <StatBar label="CLU" value={s.clu} max={3} color={Cl.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: Cl.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: Cl.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1915 &mdash; NL TRIPLE CROWN &bull; LED PHILLIES TO FIRST PENNANT</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>T-3RD ALL-TIME WINS &bull; NL RECORD SHO &bull; HOF 1938</div>
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
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Key Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 70, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" || l.affinity === "SUPREME" || l.affinity === "LEGENDARY" ? `${Cl.traitGreen}20` : l.affinity === "DEVASTATING" ? `${Cl.warmRed}20` : `${Cl.sepia}20`, color: l.affinity === "HIGH" || l.affinity === "SUPREME" || l.affinity === "LEGENDARY" ? Cl.traitGreen : l.affinity === "DEVASTATING" ? Cl.warmRed : Cl.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Alexander's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: Cl.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#18120a", borderRadius: 6, padding: 16, border: `1px solid ${Cl.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, hof: 1938, career_wins: 373, career_shutouts: 90, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
