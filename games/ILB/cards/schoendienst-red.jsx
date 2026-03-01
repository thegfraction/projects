import { useState } from "react";

const PLAYER_DATA = {
  name: "Red Schoendienst",
  nickname: "Red",
  year: 1953,
  team: "St. Louis Cardinals",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "2B",
  bats: "S",
  throws: "R",
  height: '6\'0"',
  weight: "170 lbs",
  born: "February 2, 1923 — Germantown, IL",
  died: "June 6, 2018 — Town and Country, MO (age 95)",
  hof: "HOF 1989 (Veterans Committee). 10× All-Star. 2× WS Champion (1946, 1957). #2 retired by Cardinals.",

  real_stats: {
    season: 1953, games: 145, at_bats: 567, hits: 193, doubles: 35, triples: 3,
    home_runs: 15, rbi: 79, runs: 107, stolen_bases: 1, walks: 53, strikeouts: 27,
    batting_avg: ".342", obp: ".393", slg: ".474", ops: ".867", ops_plus: 130, war: 5.5,
    career_avg: ".289", career_hits: 2449, career_hr: 84, career_rbi: 773,
    career_runs: 1223, career_2b: 427, career_sb: 89, career_war: 42.6,
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .342 BA → tier 5 (.330+). OPS+ 130 → +1 bonus, cap 5. CON = 5.
  // POW: 15 HR → tier 1 (10-19). SLG .474 → no bonus (<.500). POW = 1.
  // SPD: 1 SB in 1953 (led NL with 26 SB in 1945 rookie year). By peak, speed had declined. SPD = 0.
  //   (Give 1 for early-career speed memory + 8 triples in career peak years.)
  //   Actually: 1 SB, 3 triples in 1953. SPD = 0.
  // DEF: Led NL 2B in fielding % 7×, range factor 5×. 320 consecutive errorless chances.
  //   NL record .9934 FLD% (1956). "The finest second baseman in the game" — Alvin Dark.
  //   Pre-GG equivalent: 6-7 GG. DEF = 3 (MAXIMUM).
  // CLU: WS: 1946 (.233 in 7 games) + 1957 (.267 in 7 games, 3rd in MVP). Mixed.
  //   1950 All-Star Game: 14th-inning walk-off HR. Hero moment.
  //   PS BA ~.250 → tier 1. All-Star hero moment → +1 = 2. CLU = 2.
  // OVR: HOF, 10× All-Star, 2,449 H, 7× fielding leader, survived TB.
  //   Defined an era at 2B. But 84 career HR, .289 career. OVR = 8 (All-Star).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — HOF, 10× All-Star, best defensive 2B of the 1940s/50s. Defined the position.
    con: 5,      // .342 BA → tier 5. OPS+ 130 → bonus, cap 5. MAXIMUM CONTACT. Switch-hitter who rarely struck out (27 K in 567 AB).
    pow: 1,      // 15 HR → tier 1. SLG .474 → no bonus. Schoendienst was a line-drive, doubles hitter, not a power threat.
    spd: 0,      // 1 SB in 1953. Led NL in SB as rookie (26 in 1945) but speed was long gone by peak.
    def: 3,      // MAXIMUM DEFENSE. 7× NL leader in fielding %, 5× in range factor. 320 errorless chances. NL record FLD%. "Finest 2B in the game."
    clu: 2,      // WS: mixed (.233 in '46, .267 in '57). But 1950 All-Star walk-off HR. CLU = 2.
  },

  stat_justification: {
    con: "Schoendienst batted .342 in 1953 — second in the NL by .002 to Furillo. He struck out only 27 times in 567 AB. He was a switch-hitter who became ambidextrous by necessity: an Army eye injury made it impossible to read breaking balls from one side, so he taught himself to hit from both sides. Career .289 with 2,449 hits. Seven times over .300. Rating of 5.",
    pow: "15 HR in 1953 (career high). 84 career HR in 19 seasons. This was a contact hitter, not a power threat. SLG .474 doesn't clear the .500 bonus. His 427 career doubles show he hit the gaps, but homers were rare. The 1950 All-Star walk-off HR was his first career homer batting right-handed. Rating of 1.",
    spd: "1 SB in 1953. He led the NL with 26 SB as a rookie in 1945, but by his peak years the speed was gone. 89 career SB shows he had legs early, but in 1953 he was a 30-year-old contact man, not a basestealer. Rating of 0.",
    def: "THE defining defensive second baseman of his era. Led NL 2B in fielding percentage 7 times. Led in range factor 5 times. Handled 320 consecutive chances without an error in 1950. Set NL record with .9934 fielding average in 1956 (stood for 30 years until Sandberg). Alvin Dark: 'The finest second baseman in the game.' Pre-GG equivalent: 6-7 Gold Gloves. Rating of 3 — maximum defense.",
    clu: "World Series: .233 in 7 games (1946), .267 in 7 games (1957). Won both. Mixed October bat. But the 1950 All-Star Game: Schoendienst hit a walk-off HR in the 14th inning — his first career homer batting right-handed. It won the game for the NL. That's a genuine hero moment. His 1957 performance (3rd in MVP, drove Braves to pennant) adds context. Rating of 2.",
  },

  personality: {
    leadership_style: "The quiet constant. Schoendienst wasn't loud or flashy — he was always there. 74 consecutive years in a major-league uniform (player, coach, manager, special assistant). He led by showing up, by being prepared, by fielding every ground ball cleanly. His managing style reflected his playing style: steady, trusting, no drama. Cepeda said: 'He treats us like men.'",
    temperament: "Gentle, patient, resilient. Schoendienst survived an eye injury from Army bazookas, tuberculosis that took part of his lung, and being told he'd never play again — and he came back every time. He was compared to Huckleberry Finn by Bob Broeg: a small-town Illinois kid who just wanted to play baseball and go fishing. No ego, no controversy, no enemies.",
    work_ethic: "Self-made through necessity. Mother made baseballs from sawdust. Used corncobs and hickory nuts as balls, dried wood as bats. Signed for $75/month after an open tryout with 400 others. Became a switch-hitter because an Army eye injury forced him to learn a new skill. Hit .337 in the minors, won IL MVP, made the Cardinals — and never left. When TB took his lung, he came back and hit .300.",
    lifestyle: "Germantown, Illinois to St. Louis immortality. Married Mary Eileen O'Reilly for 53 years. Never left the Cardinals organization — 67 of 76 years in baseball with St. Louis. Wore #2 (retired). The most St. Louis Cardinal who ever lived. Bob Broeg compared him to Huck Finn — the barefoot Illinois kid who became a Hall of Famer.",
    era_adaptability: "HIGH FOR DEFENSE AND CONTACT. Schoendienst's defensive metrics translate to any era — he'd be a Gold Glove winner today. His switch-hitting contact approach (.289 career, 2,449 H) has value everywhere. But .474 SLG and 84 career HR would be a concern in modern power-driven baseball. He'd be a Ben Zobrist type: elite defense, solid bat, switch-hitter, leader.",
    clubhouse_impact: "THE SOUL OF ST. LOUIS. Schoendienst and Musial were inseparable — they were the Cardinals for 20 years. When Schoendienst was traded to the Giants in 1956, Musial said it was like losing a brother. When Red returned in 1961, the band was back together. As manager, he won the 1967 WS with a diverse roster (Gibson, Brock, Cepeda, Flood) — earning universal respect. In ILB terms: Schoendienst is +2 chemistry with ANY Cardinals player, +1 with any teammate.",
    dark_side: "The tuberculosis. In 1958-59, Schoendienst was diagnosed with TB and had part of his lung removed. He was told he'd never play again. He missed almost two full seasons. The disease nearly killed him — and when he came back, he was never the same player. His peak was stolen. Without TB, his career numbers would be substantially higher: more hits, more All-Star selections, possibly a BBWAA HOF election instead of waiting until 1989 (Veterans Committee). TB is Schoendienst's tragedy — the thing that kept him from being recognized as the truly elite player he was.",
  },

  chemistry_traits: [
    { tag: "The Finest 2B in the Game", desc: "7× fielding leader, 5× range factor leader, 320 errorless chances. Maximum defense at second base. +1 to any pitcher's effectiveness when Schoendienst is behind him." },
    { tag: "Musial's Partner", desc: "Schoendienst and Musial were inseparable for 20 years. If both on roster: +2 mutual chemistry. Musial called trading Red 'like losing a brother.'" },
    { tag: "Sawdust Baseball", desc: "Mother made baseballs from sawdust. Used corncobs as balls, dried wood as bats. Poverty forged resourcefulness. +1 to adaptation in adverse conditions." },
    { tag: "Switch-Hitter by Necessity", desc: "Army eye injury forced him to learn to bat from the opposite side. Became elite from both sides. +1 versatility. Cannot be platooned against." },
    { tag: "Tuberculosis Survivor", desc: "Lost part of a lung. Told he'd never play again. Came back and hit .300. +2 resilience. -1 stamina (lung capacity reduced)." },
    { tag: "74 Years in Uniform", desc: "Player, coach, manager, special assistant — 74 consecutive years in a MLB uniform. +1 institutional knowledge. +1 longevity." },
    { tag: "All-Star Walk-Off", desc: "14th-inning walk-off HR in the 1950 All-Star Game — his first HR batting right-handed. +1 CLU in exhibition/All-Star events." },
    { tag: "320 Consecutive Chances", desc: "Handled 320 straight fielding chances without an error in 1950. In ILB: when Schoendienst has no errors in current game, DEF bonus increases with each inning." },
  ],

  preferred_locations: [
    { location: "Second Base", affinity: "MAXIMUM", note: "7× NL fielding leader. 5× range factor leader. .983 career. NL record .9934 in 1956. THE position." },
    { location: "Batter's Box (Both Sides)", affinity: "HIGH", note: "Switch-hitter. .342 in 1953. 27 K in 567 AB. Contact artisan from either side." },
    { location: "Sportsman's Park / Busch Stadium", affinity: "HIGH", note: "67 years with the Cardinals. Home. The most Cardinal who ever lived." },
    { location: "Dugout / Coaching Box", affinity: "HIGH", note: "Manager 12 years. Coach for decades. 74 years in uniform. The dugout was his second home." },
    { location: "Germantown, Illinois", affinity: "HIGH", note: "Sawdust baseballs. Corncob balls. $75/month. Where Red was made." },
    { location: "Hospital / Recovery", affinity: "MEDIUM", note: "TB took his lung. Eye injury from bazookas. Broken body, unbroken will." },
    { location: "Power Alleys", affinity: "LOW", note: "84 career HR. This was not a power hitter. The gaps, not the fences." },
  ],

  momentum: {
    hot_triggers: [
      "Defensive flow — when Schoendienst makes consecutive clean plays, his DEF compounds. The 320-chance streak mentality",
      "Paired with Musial — both Cardinals on the same roster: +2 mutual chemistry activates",
      "Contact streaks — Schoendienst hit .342 in 1953 with only 27 K. When he's locked in, pitchers can't miss bats",
      "Adversity — Red thrived when told he couldn't. Eye injury? Became switch-hitter. TB? Came back and hit .300",
    ],
    cold_triggers: [
      "Tuberculosis relapse — stamina reduced. Long games, hot weather, sustained effort can trigger fatigue",
      "Power situations — with runners in scoring position needing a HR, Schoendienst is limited (15 HR peak)",
      "Trade/displacement — being traded from the Cardinals devastated him. Away from St. Louis, motivation dips",
    ],
    pressure_response: "STEADY UNDER PRESSURE, NOT EXPLOSIVE. Schoendienst was not a dramatic clutch performer — he was a consistent one. His WS batting (.233, .267) was adequate, not electric. But his defensive reliability under pressure was elite: he never made the error that lost the game. The 1950 All-Star walk-off was his one explosive moment. In ILB terms: Schoendienst's CLU manifests through defense, not offense — he won't hit the game-winning homer, but he'll make the game-saving play.",
  },

  action_card_seeds: [
    {
      title: "Sawdust Baseballs",
      type: "Drama",
      text: "A boy's mother makes baseballs from sawdust. They last a few pitches before disintegrating. The boys use corncobs, hickory nuts, and rocks when the sawdust runs out. Dried wood serves as bats. Thirty years later, the boy is in the Hall of Fame.",
      origin: "Red's mother Mary made baseballs from sawdust for her sons and their friends in Germantown, IL. The family also used corncobs and rocks as balls and dried wood as bats.",
    },
    {
      title: "The Bazooka Eye",
      type: "Drama",
      text: "Your second baseman returns from war with damaged eyes — he can no longer read breaking balls from his natural batting side. So he teaches himself to hit from the other side too. He becomes one of the best switch-hitters in baseball. Adversity didn't diminish him — it doubled him.",
      origin: "Schoendienst sustained eye damage while firing bazookas in the Army. He couldn't track breaking balls batting right-handed, so he became a switch-hitter. His 1950 All-Star walk-off HR came batting right-handed — the side he learned by necessity.",
    },
    {
      title: "320 Without an Error",
      type: "Game Action",
      text: "Your second baseman handles his 100th consecutive chance without an error. Then his 200th. Then his 300th. The streak reaches 320. Every ground ball, every relay, every double-play pivot — clean. The record stands as testament to hands that never fail.",
      origin: "In 1950, Schoendienst handled 320 consecutive fielding chances without an error, a remarkable streak for a second baseman.",
    },
    {
      title: "Walk-Off in the 14th",
      type: "Game Action",
      text: "The All-Star Game goes to extra innings. 14 innings played. Both leagues exhausted. Your switch-hitter — batting from his weaker side — launches a home run to end it. It's his first career homer from that side. The National League wins on the strength of a man who learned to hit that way because war broke his eyes.",
      origin: "1950 All-Star Game. Schoendienst hit a walk-off HR in the 14th inning — his first career homer batting right-handed — to win the game for the National League.",
    },
    {
      title: "Part of a Lung",
      type: "Drama",
      text: "Your second baseman is diagnosed with tuberculosis. Doctors remove part of his lung. They tell him he will never play baseball again. He returns next season. He hits .300. He plays three more years. He manages for twelve more. He wears the uniform for 74 consecutive years.",
      origin: "Diagnosed with TB in 1958-59, Schoendienst underwent partial pneumonectomy. He returned in 1960, hit .300 in 1961 and 1962, then managed the Cardinals to the 1967 WS title.",
    },
    {
      title: "Like Losing a Brother",
      type: "Drama",
      text: "Your team trades its second baseman — the franchise icon's best friend and partner of eleven years. The icon says it feels 'like losing a brother.' Five years later, the second baseman comes home. They play their final seasons together. They retire together. They remain inseparable until death.",
      origin: "When the Cardinals traded Schoendienst to the Giants in 1956, Musial was devastated. Red returned in 1961; both retired after 1963. Their friendship lasted a lifetime.",
    },
    {
      title: "The $75-a-Month Tryout",
      type: "Drama",
      text: "Four hundred hopefuls show up for an open tryout. The scout doesn't sign the red-haired kid. Then changes his mind, drives to the kid's small town, and offers $75 a month. The kid accepts. He plays for 19 years, manages for 14 more, coaches for decades, and wears the uniform for 74 consecutive years.",
      origin: "Schoendienst attended a 1942 Cardinals open tryout with 400 others. He wasn't signed initially — scout Joe Mathes later drove to Germantown and signed him for $75/month.",
    },
    {
      title: "Seven Decades in the Same Uniform",
      type: "Drama",
      text: "Your second baseman plays for 19 years. Manages for 14 years. Coaches for decades more. When he finally stops wearing the uniform, he has done so for 74 consecutive years — longer than most human lifespans. The number on his back is retired. The organization is his family. He IS the franchise.",
      origin: "Schoendienst wore a Cardinals uniform for 74 consecutive years (1945-2018), spanning parts of 8 decades. He served 67 of his 76 years in baseball with St. Louis. #2 was retired in 1996.",
    },
  ],

  art_direction: {
    face: "6'0\" 170 lbs, lean and wiry. Red hair (the source of his nickname). Freckled, sun-weathered, Illinois farm kid face. The look of a man who was compared to Huckleberry Finn — resourceful, cheerful, humble. Eyes that survived bazooka damage and still tracked breaking balls from both sides.",
    attire: "St. Louis Cardinals home whites, early 1950s style. Switch-hitter in a balanced, compact stance. Or: at second base, mid-double-play pivot, the relay throw flowing from glove to hand to first base with mechanical precision. The cleanest hands in baseball.",
    mood: "Quiet reliability. Schoendienst was not dramatic or explosive — he was the man who never made the error, never struck out, never caused a problem. The card should radiate dependability and craftmanship. Like a perfectly made tool — nothing wasted, everything functional, built to last 74 years.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Sportsman's Park — the old Cardinals home. Midwestern light, Illinois farmland somewhere in the background of his soul. The card should feel lived-in, warm, and permanent — like a man who wore the same uniform for seven decades.",
    reference: "Think of the ultimate franchise man. Schoendienst IS the Cardinals the way no other player is any other franchise. 74 years. His card should feel like an institution — not a single moment, but an entire lifetime devoted to one place, one position, one organization. The anti-Thomson: not one legendary swing, but ten thousand perfectly fielded ground balls.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "No PS", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS/ASG hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function RedSchoendienst() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, double-play pivot, Cardinals #2, Sportsman's Park]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>1953 — .342 BA / 27 K — SWITCH-HIT CONTACT MASTER</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "ALL-STAR", val: "10×" },{ label: "WS RINGS", val: "2" },{ label: "FLD LEAD", val: "7×" },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 19 SEASONS — 74 YEARS IN UNIFORM</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1989", "⭐ 10× All-Star", "🏆 2× WS Champion", "🧤 7× Fielding Leader", "🔀 Switch-Hitter", "🫁 TB Survivor", "🎖️ Army Veteran", "❤️ 74 Years"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : l.affinity === "MAXIMUM" ? `${C.hotRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : l.affinity === "MAXIMUM" ? C.hotRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Schoendienst's real life, universalized for any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Hitter Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Schoendienst's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "All-Star", stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
