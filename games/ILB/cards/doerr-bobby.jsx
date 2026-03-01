import { useState } from "react";

const PLAYER_DATA = {
  name: "Bobby Doerr",
  nickname: "The Silent Captain",
  year: 1950,
  team: "Boston Red Sox",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "2B",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "175 lbs",
  born: "April 7, 1918 — Los Angeles, CA",
  died: "November 13, 2017 — Junction City, OR (age 99)",
  hof: "Inducted 1986 (Veterans Committee). 9× All-Star, #1 retired by Red Sox. .288 career BA, 223 HR, 1,247 RBI, 2,042 hits. Led AL 2B in fielding % 4×, DP 5×.",

  real_stats: {
    season: 1950,
    games: 149,
    at_bats: 585,
    hits: 172,
    doubles: 29,
    triples: 11,
    home_runs: 27,
    rbi: 120,
    stolen_bases: 1,
    batting_avg: ".294",
    obp: ".366",
    slg: ".515",
    ops: ".881",
    ops_plus: 134,
    war: 6.3,
    all_star: 9,
    career_avg: ".288",
    career_hits: 2042,
    career_hr: 223,
    career_sb: 36,
    career_war: 51.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CON — .294 BA → tier 3 (.270-.299). OPS+ 134 ≥ 130 → +1 = 4.
  // POW — 27 HR → tier 2 (20-29). SLG .515 ≥ .500 → +1 = 3.
  // SPD — 1 SB → tier 0. No CF/SS GG bonus (2B). SPD 0.
  // DEF — Led AL 2B in fielding % 4×, DP 5×, putouts 4×, assists 3×.
  //   414 consecutive chances without error (ML record). Career .980 FLD%
  //   (ML record until 1953). Premier defensive 2B of the era. 6+ GG eq. DEF 3.
  // CLU — 1946 WS: .409 BA (9-for-22), .458 OBP, 3 RBI in 6 games.
  //   .409 PS BA → tier 2 (.300+). 2-run HR in G4. Hero moment = +1 → CLU 3 (cap).
  // OVR — CON 4×2=8 + POW 3×1.5=4.5 + SPD 0×1=0 + DEF 3×0.5=1.5 = 14 raw.
  //   HOF, 9× All-Star, .288 career BA, 223 HR, elite defense. "Silent Captain."
  //   51.2 career WAR. All-Star/Elite tier → OVR 9.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    con: 4,
    pow: 3,
    spd: 0,
    def: 3,
    clu: 3,
  },

  stat_justification: {
    con: "Hit .294 in 1950, career .288. Three seasons over .300 (.325 in 1944, .309 in 1949). OPS+ 134 in 1950 meets the bonus threshold. Doerr was a consistent, reliable contact hitter — not in the .330+ elite tier but always productive. CON tier 3 + OPS+ bonus = 4.",
    pow: "27 HR in 1950 — career high. 223 career HR, which was the third-most by any second baseman when he retired. Led AL in slugging (.528) in 1944. Six seasons with 100+ RBI — unmatched by any AL second baseman for 25 years (until Joe Morgan). SLG .515 in 1950 exceeds .500 bonus threshold. POW tier 2 + SLG bonus = 3.",
    spd: "1 SB in 1950, 36 career. Not a speed player. Led AL in triples (11) in 1950 — gap power, not leg speed. Plays 2B — no CF/SS Gold Glove bonus. SPD 0.",
    def: "Bobby Doerr was one of the greatest defensive second basemen in baseball history. Led AL 2B in fielding percentage 4 times, double plays 5 times (tying an AL record), putouts 4 times, assists 3 times. Held the ML record for career double plays at 2B (1,507) until 1963. His career .980 fielding percentage was a ML record until 1953. Once handled 414 consecutive chances without an error — a ML record. Johnny Pesky: 'I never saw him misplay a ball.' Ted Williams: 'He had the best backhand of any second baseman I ever saw.' Equivalent to 6+ Gold Gloves. DEF 3.",
    clu: "In the 1946 World Series — his only postseason — Doerr hit .409 (9-for-22) with a .458 OBP, .591 SLG, and 3 RBI across 6 games. He hit a 2-run HR in Game 4. His .409 PS BA is tier 2 (.300+), and the HR in a close WS game qualifies as a hero moment. The Red Sox lost the series in 7 games, but not because of Doerr. Babe Ruth publicly said Doerr — not Williams — was the Red Sox MVP. CLU tier 2 + hero moment = 3 (cap). Doerr is the highest-CLU card in the Allies set.",
  },

  personality: {
    leadership_style: "The Silent Captain. Ted Williams gave Doerr this title because he led entirely through example — consistency, reliability, grace under pressure, and zero drama. 'We never had a captain, but he was the silent captain of the team.' Doerr never sought attention, never raised his voice, and never asked for credit. He simply showed up, played elite baseball at second base, and made everyone around him better.",
    temperament: "Preternaturally calm. David Halberstam wrote that Doerr had 'an uncommon emotional equilibrium that would stay with him throughout his life. He never seemed to get angry or to get down.' Tommy Henrich of the Yankees — a rival — said: 'Bobby Doerr is one of the very few who played the game hard and retired with no enemies.' This is perhaps the most remarkable personality descriptor in the entire set. Zero enemies across a 14-year career.",
    work_ethic: "Methodical, tireless, self-taught. Doerr credited his fielding skill to 'bouncing a rubber ball off the front steps a jillion times.' His approach was repetition-based — not intellectual like Williams, but physically ingrained. He practiced the double-play pivot until it was reflexive. He was also a surprisingly effective batting instructor: he coached Carl Yastrzemski before his Triple Crown season, converting him from a doubles hitter to a home run hitter.",
    lifestyle: "Oregon rancher, steelhead fisherman, devoted husband. Doerr fell in love with Oregon's Rogue River on a winter fishing trip in 1935 and vowed to live there. He met Monica Terpin, a schoolteacher in a one-room schoolhouse near Agness, OR, at a dance. They married in 1938 and remained together for 65 years until her death in 2003. She lived with multiple sclerosis for most of their marriage — Doerr cared for her throughout. He ranched cattle and fished steelhead into his 90s. Died at 99.",
    era_adaptability: "STRONG. Doerr's combination of power-for-position (223 HR as a 2B), elite defense, and consistent production would translate well to any era. He'd profile as a strong everyday second baseman in modern baseball — not a superstar, but a 4-5 WAR player who anchors the middle infield and bats 5th or 6th. His defense would still be elite. His power would be average-to-above for today's 2B.",
    clubhouse_impact: "THE FOUNDATION. Every great team needs a Bobby Doerr — the steady, reliable, drama-free player who binds the roster together. He was the emotional center of the Red Sox while Williams was the talent center. He was the only person who could correct Williams' swing without getting an argument (though Williams still argued). The 'Teammates' quartet — Williams, Doerr, Pesky, Dom DiMaggio — remained lifelong friends. The statue at Fenway Park shows all four.",
    dark_side: "The caretaker's burden. Doerr's wife Monica was diagnosed with MS early in their marriage. He cared for her for over sixty years while maintaining a Hall of Fame career. He retired early (age 33) due to chronic back problems — and some have speculated the physical toll of caregiving contributed. He once said: 'If I had played on a world champion, that would have made my life even more complete.' The 1946 WS loss haunted him — Enos Slaughter's mad dash home in Game 7. In ILB: Doerr carries a 'Caretaker' trait — his off-field emotional burden is real, and if a family health event occurs, his focus drops by 1 for a stretch. But his resilience always brings him back.",
  },

  chemistry_traits: [
    { tag: "The Silent Captain", desc: "Doerr leads without speaking. +2 team morale permanently when on roster. Cannot be involved in drama events. His presence calms the clubhouse." },
    { tag: "The Teammates", desc: "+3 chemistry with Ted Williams, Johnny Pesky, and Dom DiMaggio specifically. When 2+ of The Teammates are on the same roster, all gain +1 to CLU." },
    { tag: "Iron Glove", desc: "414 consecutive chances without error. Doerr reduces team defensive errors by 1 per 10 games. His double-play pivot is automatic." },
    { tag: "Williams' Counterweight", desc: "Where Williams is volcanic, Doerr is serene. When paired with Williams, Williams' 'Press War' trait is suppressed — Doerr absorbs the drama." },
    { tag: "Oregon Fisherman", desc: "+2 chemistry with Ted Williams (fishing buddies for life). +1 morale recovery during off-days. The Rogue River heals everything." },
    { tag: "Yastrzemski's Teacher", desc: "Post-career coaching trait. Doerr can convert any teammate's batting approach: +1 POW to one designated teammate per season." },
    { tag: "The Caretaker", desc: "Doerr's wife has MS. His emotional resilience is extraordinary but the burden is real. 15% chance per season of a 3-game focus drop. Always recovers." },
    { tag: "Zero Enemies", desc: "Tommy Henrich: 'One of the few who played the game hard and retired with no enemies.' Doerr cannot be targeted by opponent's intimidation or rivalry traits." },
  ],

  preferred_locations: [
    { location: "Second Base / Infield", affinity: "HIGH", note: "Never played any other position. The double-play pivot was his art form. 1,507 career DP." },
    { location: "Oregon / Rogue River", affinity: "HIGH", note: "Fell in love with Oregon in 1935. Ranched cattle, fished steelhead, lived to 99." },
    { location: "Fenway Park", affinity: "HIGH", note: "Hit .315 with 145 HR at home vs .261/78 HR on road. Fenway was built for Doerr." },
    { location: "Clubhouse / Dugout", affinity: "HIGH", note: "The silent captain's throne. Steady presence that held the room together." },
    { location: "Coaching Box", affinity: "MEDIUM", note: "Coached Yastrzemski to the Triple Crown. Effective instructor but preferred playing." },
    { location: "Spotlight / Press", affinity: "LOW", note: "Never sought attention. 'I never thought of myself as a Hall of Famer.'" },
  ],

  momentum: {
    hot_triggers: [
      "Fenway Park — hit .315 at home vs .261 away. Doerr was a different hitter at Fenway.",
      "Postseason / big games — .409 in the 1946 WS. 3-run HR in the 1943 ASG. Rose to the occasion.",
      "Team success — when the Red Sox were contending, Doerr's production increased across the board.",
      "Late-career surge — career highs in HR (27), RBI (120), and runs (103) at age 32 in 1950.",
    ],
    cold_triggers: [
      "Road games — significant home/away split (.315/.261) suggests Fenway dependency",
      "Early-season slumps — hit .232 through June 2 in 1950 before surging",
      "Back problems — chronic sacroiliac pain limited him in 1951 and ended his career at 33",
    ],
    pressure_response: "ELITE AND STEADY. Doerr is the most clutch-reliable card in the set. His 1946 WS performance (.409 BA) proved he elevated in October. His 1943 ASG 3-run HR proved he delivered on showcase stages. Unlike Williams (volatile in October) or DiMaggio (strong but not dominant), Doerr simply maintained or exceeded his standard in every pressure situation. In ILB: Doerr never has CLU variance — he always performs at exactly CLU 3. No boom, no bust. The metronome's metronome. The card you trust with the game on the line.",
  },

  action_card_seeds: [
    {
      title: "The Silent Captain",
      type: "Action",
      text: "Your second baseman never raises his voice, never seeks credit, and never creates drama. But every teammate knows he is the leader. +2 team morale permanently. When other players argue, your captain's presence ends the conflict immediately.",
      origin: "Ted Williams named Doerr 'the silent captain of the Red Sox.' Williams said: 'Bobby Doerr was an absolutely outstanding player... We never had a captain, but he was the silent captain of the team.' The Red Sox formally retired Doerr's #1 in 1988.",
    },
    {
      title: "Four-Oh-Nine in October",
      type: "Game Action",
      text: "World Series. Your second baseman hits .409 across the series — leading all regulars on the team. He hits a 2-run home run in a crucial game. The series is lost in 7 games, but your player's performance is beyond reproach. +3 CLU, +2 fame. The loss is not his fault.",
      origin: "In the 1946 World Series against the Cardinals, Doerr hit .409 (9-for-22) with a .591 SLG and 3 RBI. He hit a 2-run HR in Game 4. The Red Sox lost Game 7 on Enos Slaughter's 'mad dash.' Babe Ruth told reporters Doerr — not Williams — was the Red Sox MVP.",
    },
    {
      title: "414 Without Error",
      type: "Game Action",
      text: "Your second baseman handles 414 consecutive fielding chances without committing a single error. The streak sets a Major League record. For the duration of the streak, your team's defensive rating increases by +1 and opposing hitters receive -1 to ground ball hits.",
      origin: "Doerr once handled 414 consecutive chances at second base without an error — a Major League record at the time. His career .980 fielding percentage was also a ML record until Red Schoendienst surpassed it in 1953.",
    },
    {
      title: "The Teammates",
      type: "Drama",
      text: "Four men — a fiery slugger, a steady second baseman, a scrappy shortstop, and a graceful center fielder — forge a friendship that lasts seventy years. They fish together, argue about hitting, and grow old together. When the last one dies at 99, the friendship becomes a book, a statue, and a legend. +3 legacy modifier for all four. The friendship outlasts the game.",
      origin: "David Halberstam's 'The Teammates' (2003) told the story of Williams, Doerr, Pesky, and Dom DiMaggio's lifelong friendship. A statue of all four stands at Fenway Park. Doerr, the last surviving member, died in 2017 at 99.",
    },
    {
      title: "The Schoolteacher's Dance",
      type: "Drama",
      text: "A young ballplayer goes fly fishing in Oregon and meets a schoolteacher at a dance. They marry and stay together for 65 years. She develops a chronic illness. He cares for her through it all — through a Hall of Fame career, retirement, and old age. +2 personal resilience. The love story is the real legacy.",
      origin: "Doerr met Monica Terpin, a teacher at a one-room schoolhouse near Agness, OR, at a dance during a winter fishing trip. They married in 1938. She lived with MS for most of their marriage. He cared for her until her death in 2003. They were married 65 years.",
    },
    {
      title: "Yaz's Conversion",
      type: "Action",
      text: "As a coach, your former second baseman converts a seven-year veteran from a doubles hitter into a home-run slugger. The converted player wins the Triple Crown that season. +3 fame for the coach. +1 POW permanently for the converted player. The teacher's gift outlasts the teacher's career.",
      origin: "As Red Sox coach in 1967, Doerr worked with Carl Yastrzemski to convert his swing from opposite-field doubles to pulled home runs. Yaz hit 44 HR and won the Triple Crown and MVP that season — his only one. Doerr's coaching was widely credited.",
    },
    {
      title: "No Enemies",
      type: "Action",
      text: "After 14 years in the major leagues, your player retires. An opposing player — a rival from a hated team — publicly states: 'He is one of the very few who played the game hard and retired with no enemies.' +2 legacy. +1 team chemistry retroactively applied to every season of his career.",
      origin: "Tommy Henrich of the New York Yankees — Boston's fiercest rival — said of Doerr: 'Bobby Doerr is one of the very few who played the game hard and retired with no enemies.' It is perhaps the most remarkable compliment in the set.",
    },
  ],

  art_direction: {
    face: "Calm, steady, handsome in a wholesome way. 5'11\" 175 lbs — wiry and athletic, not bulky. Clean-cut, warm brown eyes with a gentle, steady gaze. The face of a man who has never panicked. Slight smile — not forced, just genuinely content. He looks like someone who caught steelhead at dawn and played a World Series game that afternoon.",
    attire: "Boston Red Sox home whites, early 1950s vintage. Number 1. The double-play pivot — mid-turn, ball releasing from the hand, body airborne over the sliding runner, perfectly balanced. Or: at the plate, compact right-handed swing sending a line drive toward the Green Monster.",
    mood: "Serenity and competence. The emotional center of the set. Where Williams crackles and DiMaggio radiates cool, Doerr simply IS. The calm at the center of the storm. This card should feel like the one safe place in a turbulent clubhouse.",
    style: "Warm, clear sepia with green undertones — echoing both Fenway Park and the Oregon forests where Doerr lived for 80 years. The light should feel like early morning on a river — soft, clean, full of promise. Not dramatic. Just quietly beautiful.",
    reference: "The heart card. If the Allies set were a body, DiMaggio would be the brain, Williams the lungs, and Doerr the heart. This card holds everything else together. It should feel like home.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };
const StatBar = ({ label, value, max, color }) => ( <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}> <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span> <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}> <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /> </div> <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span> </div> );
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}> <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div> {children} </div> );

export default function BobbyDoerrCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Warm sepia with green undertones, Red Sox whites, serene double-play pivot]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="CON" value={s.con} max={5} color={C.gold} /><StatBar label="POW" value={s.pow} max={5} color={C.warmRed} /><StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} /><StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => ( <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div> ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 9× All-Star", "📜 HOF 1986", "1️⃣ #1 Retired by Red Sox", "🧤 414 Chances No Error (ML Record)", "🏆 .409 in 1946 WS", "💪 6× 100+ RBI", "🎣 Lived to 99"].map((a, i) => ( <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span> ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => ( <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button> ))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && ( <> <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section> <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section> <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section> <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section> <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section> <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section> <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section> </> )}
              {tab === "chemistry" && ( <> <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div></Section> <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}</Section> </> )}
              {tab === "momentum" && ( <> <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section> <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section> <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section> </> )}
              {tab === "actions" && ( <Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Doerr's real life, playable as universal cards.</p>{d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}</Section> )}
              {tab === "engine" && ( <> <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}</Section> <Section title="Doerr's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}</Section> </> )}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}><div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div><pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}</pre></div>
    </div>
  );
}
