import { useState } from "react";

const SIMMONS_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: AL SIMMONS
  // Year Snapshot: 1930 (Peak Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Al Simmons",
  nickname: "Bucketfoot Al",
  year: 1930,
  team: "Philadelphia Athletics",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "LF",
  bats: "R",
  throws: "R",
  height: "5'11\"",
  weight: "210 lbs",
  born: "May 22, 1902 — Milwaukee, WI (as Aloysius Harry Szymanski)",
  died: "May 26, 1956 — Milwaukee, WI (age 54, heart attack)",
  hof: "Class of 1953 (BBWAA, 75.4%)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1930 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1930,
    games: 138,
    at_bats: 554,
    hits: 211,
    doubles: 41,
    triples: 16,
    home_runs: 36,
    rbi: 165,
    stolen_bases: 9,
    batting_avg: ".381",
    obp: ".423",
    slg: ".708",
    ops: "1.131",
    ops_plus: 176,
    war: 8.8,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 3,
    career_avg: ".334",
    career_hits: 2927,
    career_hr: 307,
    career_sb: 88,
    career_war: 68.5,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // 
  // METHODOLOGY: Stats are derived from real performance data
  // using the following conversion logic:
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ 130+ adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG .500+ adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + triples + range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove CF adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — Based on Gold Gloves + reputation
  //   No Gold Glove = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //
  // OVERALL (OVR) — Weighted composite
  //   CON×2 + POW×1.5 + SPD×1 + DEF×0.5, normalized to 3-13
  //   3-4 = replacement | 5-6 = solid | 7-8 = all-star
  //   9-10 = elite | 11-12 = legend | 13 = mythic
  //
  // CLUTCH (CLU) — Postseason performance modifier
  //   Postseason BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   World Series hero moments add +1 (cap at 3)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 11,     // Legend tier — elite peak, massive career numbers, 68.5 WAR
    con: 5,      // .381 BA in 1930, .390 in 1931. Career .334. OPS+ 176. Max contact.
    pow: 4,      // 36 HR → tier 3. SLG .708 → ≥.500 bonus → +1. POW 4.
    spd: 1,      // 9 SB → tier 1 (6-15). No GG. Athletic but not a burner.
    def: 1,      // No Gold Gloves (pre-award). Cronin praised defense. Bill James "A" grade. Pre-GG equiv of 1-2 GG.
    clu: 3,      // .329 WS BA / .658 WS SLG / 6 HR in 19 games. Started 10-run 7th. Max clutch.
  },
  
  stat_justification: {
    con: ".381 BA in 1930 — won first of back-to-back AL batting titles. .390 in 1931. Career .334 over 20 seasons. RH single-season hits record of 253 (1925, still stands). 85 multi-hit games in 1925 (MLB record). OPS+ 176. Cy Perkins: 'Next to Ty Cobb as the best hitter I saw.'",
    pow: "36 HR in 1930 with .708 SLG. 307 career HR. Top-6 AL in HR for 7 straight years. Ted Williams: 'As much raw power as anyone who ever played.' 41 2B + 16 3B in 1930. SLG bonus earned.",
    spd: "9 SB in 1930, 88 career. 16 triples shows some wheels. Known for violent takeout slides. Athletic but declining speed. Rating of 1.",
    def: "No Gold Gloves (pre-award). Cronin: 'Never was a greater LF holding a double to a single.' .982 career FLD%. 5,000 putouts. Bill James 'A' grade fielder. Good but no formal awards.",
    clu: ".329/.658 in 4 World Series (19 G, 6 HR, 17 RBI). Started greatest WS comeback — led off 10-run 7th with HR in 1929 Game 4, singled in 2nd AB same inning. Walkoff double Game 5. Memorial Day 1930: 9th-inning HR + pinch-hit grand slam. Maximum clutch.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Alpha Warrior. Fiercely competitive, volcanic, devoted to winning. He squeezed the bat handle like he was strangling it. Looked 'bloomin' mad even in batting practice, years after he had retired' (Tommy Henrich). Outspoken even with Connie Mack. His aggression aimed entirely at opponents — loyal to teammates, generous to young players.",
    temperament: "Hot-headed and intense. 'Don't forget I was just as hot-headed as McGraw.' Self-aware about it. Hated the Yankees with a passion. When they knocked him down, he got 11 hits in 4 games, 10 for extra bases. Anger made him better.",
    work_ethic: "Supreme. 'Never relax on any time at bat. Never miss a game you can play' — his advice to Stan Musial. Played through injuries. Held record of 394 consecutive games. But later regretted games he missed — hangovers, early departures — all adding up to 73 hits short of 3,000.",
    lifestyle: "Social, generous to a fault. 'A sucker for anybody with a good story.' Bad investments left him nearly broke. Married once (Doris Reader, one son John), divorced. Never remarried due to religious convictions. Lived alone at the Milwaukee Athletic Club. Died with a few thousand dollars and a $17,000 life insurance policy.",
    era_adaptability: "HIGH. Son of Polish immigrants, self-invented — changed his name from Szymanski after seeing a hardware billboard. Grew up playing on a sandlot team ironically called the 'Connie Macks.' Would dominate in any era where line-drive power and competitive fury matter.",
    clubhouse_impact: "HIGH. A warrior energy — teammates fed off his intensity. Connie Mack: 'I wish I had nine players named Al Simmons.' Not a joker — an enforcer who made everyone play harder. As a coach, beloved by Tommy Henrich and young players.",
    dark_side: "The 73-hit ghost. His later career was a sad decline — seven teams in nine years, chasing 3,000 hits. Admitted he 'accepted the second-division attitude and slacked off' with the White Sox. Alcohol, divorce, loneliness. Died alone on a sidewalk, four days after his 54th birthday, three months after Connie Mack.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Bucketfoot Al", desc: "+1 CON. Unorthodox stance was 'wrong' by every manual — and unstoppable. If opponent attempts knockdown, gains +1 POW for 3 at-bats." },
    { tag: "The Mack Attack", desc: "+2 CLU when team trails by 4+ runs in 7th inning or later. Started the greatest WS comeback ever." },
    { tag: "Late-Inning Destroyer", desc: "+1 POW in 8th and 9th innings. 14 of 34 HR came in the final two frames in 1930." },
    { tag: "Connie Mack's Son", desc: "+1 all stats under a mentor-manager. 'After I left, I was just another ballplayer.'" },
    { tag: "The Warrior", desc: "+1 intimidation aura. Violent slides, murderous stance. Fear makes him stronger." },
    { tag: "73 Hits Short", desc: "-1 morale after age 32. Fell 73 short of 3,000 — haunted him for life." },
    { tag: "A's Dynasty", desc: "Synergy with Foxx, Cochrane, Grove. 3+ A's dynasty players = +1 POW for all." },
    { tag: "Sold for Cash", desc: "When traded, -1 all stats for one season. The grief of separation from Mack." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Elite practice habits in prime. 'Never relax on any time at bat.'" },
    { location: "Steakhouse / Restaurant", affinity: "HIGH", note: "Social eater and drinker. Enjoyed the high life." },
    { location: "Bar / Nightlife", affinity: "MEDIUM", note: "The hangovers that cost him games — and 73 hits." },
    { location: "Manager's Office", affinity: "HIGH", note: "Mack was 'the greatest man I ever met.' Hours of baseball talk." },
    { location: "Community Events", affinity: "MEDIUM", note: "Generous but not a natural PR man." },
    { location: "Hotel / Rest", affinity: "LOW", note: "Too intense to sit still in his prime." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Being knocked down or brushed back — anger fuels performance",
      "Elimination games and late-inning pressure situations",
      "Playing for Connie Mack or a father-figure manager",
      "Pennant races — 14 of 34 HR in 8th/9th innings in 1930",
      "Team trailing — born comeback specialist",
    ],
    cold_triggers: [
      "Being traded or sold — emotional collapse after separation from Mack",
      "Playing for losing teams — admitted he 'slacked off' with White Sox",
      "Personal issues — divorce and loneliness affected later performance",
      "Hangovers — cost him games and the 3,000-hit milestone",
    ],
    pressure_response: "ELITE. One of the rare hitters who becomes MORE dangerous under pressure. .329 WS BA, .658 WS SLG. Started the 10-run 7th. Memorial Day 1930 doubleheader heroics. Griffith: every late-game homer 'figured importantly in the final score.' Maximum pressure performer.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Ten-Run Seventh",
      type: "Game Action",
      text: "Your team trails by 5+ in the 7th or later. Highest-CON player leads off with HR. Team bats around — score 8+ runs this inning (50% chance). If successful, opponent's morale collapses.",
      origin: "1929 WS Game 4: Cubs led 8-0. Simmons HR started a 10-run 7th — greatest WS comeback ever. He singled in his 2nd AB of the same inning.",
    },
    {
      title: "Rough Him Up",
      type: "Game Action",
      text: "Opposing team throws at your (+8 or higher) hitter. Backfire: targeted hitter gains +2 all offensive stats for the series.",
      origin: "1928: Yankees knocked Simmons down. He went 11-for-series, 10 for extra bases. Dickey: 'So we roughed him up all right.'",
    },
    {
      title: "Memorial Day Doubleheader",
      type: "Game Action",
      text: "Star player hits game-tying 9th-inning HR in Game 1 (injuring himself). Pinch-hits grand slam in Game 2. Unavailable 2 games after.",
      origin: "May 30, 1930: Simmons tied Game 1 with 9th-inning HR, then pinch-hit a grand slam in Game 2 on an injured knee.",
    },
    {
      title: "Simmons Hardware",
      type: "Drama",
      text: "Player with a difficult surname changes his name. +2 fan appeal, +1 morale. Hidden 'roots' trigger: -1 focus for 1 game when returning to hometown.",
      origin: "Szymanski saw a Simmons Hardware billboard and became Al Simmons on the spot. Milwaukee remained his home — and his resting place.",
    },
    {
      title: "73 Hits Short",
      type: "Drama",
      text: "Aging veteran (+6 or lower) chases a career milestone. Comeback attempt: 30% success (+3 legacy), 70% failure (number haunts him forever).",
      origin: "Simmons finished with 2,927 hits — 73 short of 3,000. He played for 7 teams in his last 9 years chasing the milestone.",
    },
    {
      title: "The Father and the Son",
      type: "Drama",
      text: "Star's mentor-manager sells/trades him for financial reasons. Player loses -2 all stats for one season. If reunited later, +1 permanent but can never recapture peak.",
      origin: "Mack sold Simmons for $100,000 after 1932. He returned twice but was never the same. They died 3 months apart.",
    },
    {
      title: "The Spanking",
      type: "Drama",
      text: "Young player's immigrant parent opposes baseball career. If player persists, gains 'Chip on Shoulder': +1 all stats for first 5 seasons.",
      origin: "4th grade: Simmons's Polish father spanked him for wanting baseball. Then: 'You'd better be a good player.'",
    },
    {
      title: "The Walkoff Double",
      type: "Game Action",
      text: "Bottom 9th in clinching game. Your (+8+) hitter doubles to put winning run in scoring position. Next batter drives him in. Season ends in celebration.",
      origin: "1929 WS Game 5: Simmons doubled in the 9th, Miller drove him in to clinch — A's first title in 16 years.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Fierce, intense, menacing. 5'11\" 210 lbs — thick, powerful build with unusually long arms. Big hands gripping a long bat. Dark hair under cap, strong jaw, Polish-American features. The look of a man who wants to punish the baseball.",
    attire: "Philadelphia Athletics 1930 home whites. Baggy wool flannel. Cap pulled low. No real logos — suggest the blue elephant insignia area.",
    mood: "Controlled fury. The 'bucketfoot' stance — RH hitter, left foot toward third. Bat cocked high, arms loaded, coiled to destroy. This card should feel dangerous.",
    style: "Rich golden-amber with deep shadows. Oil painting texture. More aggressive than other cards — Ted Williams said Simmons 'scared you to death.' Shibe Park grandstand behind him, October light.",
    reference: "Think 1933 Goudey card energy rendered in the unified ILB sepia portrait style. The face of the A's dynasty.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: {
    metric: "Batting Average + OPS+",
    tiers: [
      { range: ".200-.249", value: 1 },
      { range: ".250-.269", value: 2 },
      { range: ".270-.299", value: 3 },
      { range: ".300-.329", value: 4 },
      { range: ".330+", value: 5 },
    ],
    bonus: "OPS+ ≥ 130 → +1 (cap 5)",
  },
  power: {
    metric: "Home Runs (peak season) + SLG",
    tiers: [
      { range: "0-9 HR", value: 0 },
      { range: "10-19 HR", value: 1 },
      { range: "20-29 HR", value: 2 },
      { range: "30-39 HR", value: 3 },
      { range: "40-49 HR", value: 4 },
      { range: "50+ HR", value: 5 },
    ],
    bonus: "SLG ≥ .500 → +1 (cap 5)",
  },
  speed: {
    metric: "Stolen Bases (peak) + positional range",
    tiers: [
      { range: "0-5 SB", value: 0 },
      { range: "6-15 SB", value: 1 },
      { range: "16-30 SB", value: 2 },
      { range: "31-50 SB", value: 3 },
    ],
    bonus: "Gold Glove at CF/SS → +1 (cap 3)",
  },
  defense: {
    metric: "Gold Gloves + positional reputation",
    tiers: [
      { range: "No Gold Glove", value: 0 },
      { range: "1-2 GG", value: 1 },
      { range: "3-5 GG", value: 2 },
      { range: "6+ GG", value: 3 },
    ],
  },
  overall: {
    formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13",
    tiers: [
      { range: "3-4", label: "Replacement" },
      { range: "5-6", label: "Solid Starter" },
      { range: "7-8", label: "All-Star" },
      { range: "9-10", label: "Elite / MVP" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
  clutch: {
    metric: "Postseason BA + signature moments",
    tiers: [
      { range: "PS BA < .250", value: 0 },
      { range: "PS BA .250-.299", value: 1 },
      { range: "PS BA .300+", value: 2 },
    ],
    bonus: "World Series hero moment → +1 (cap 3)",
  },
};

// Color palette
const C = {
  parchment: "#f5edd6",
  darkBrown: "#3a2a1a",
  medBrown: "#6b5339",
  gold: "#c9a84c",
  warmRed: "#8b3a2a",
  sepia: "#a0845c",
  cream: "#faf3e3",
  ink: "#2a1f14",
  hotRed: "#c44536",
  coldBlue: "#3a6b8c",
  traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 2,
        transition: "width 0.8s ease",
      }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag, desc }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`,
    borderRadius: 3, padding: "3px 8px", margin: "2px 3px",
    fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace",
  }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase",
      color: C.gold, fontFamily: "'Courier Prime', monospace",
      borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10,
    }}>{title}</div>
    {children}
  </div>
);

export default function AlSimmonsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = SIMMONS_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`,
      padding: "24px 12px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>
          Infinity League Baseball
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>
          Player Card Generator — Test Output
        </div>
      </div>

      {/* Card Container */}
      <div style={{
        width: "100%", maxWidth: 420,
        background: C.parchment,
        borderRadius: 8,
        border: `3px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`,
        overflow: "hidden",
      }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{
          width: "100%", padding: "8px 0",
          background: C.darkBrown, border: "none", cursor: "pointer",
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
        }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          /* ═══════════ FRONT OF CARD ═══════════ */
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{
              width: "100%", aspectRatio: "1/1",
              background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`,
              border: `2px solid ${C.gold}60`,
              borderRadius: 4,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Bucketfoot stance, A's whites, Shibe Park, controlled fury]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
            </div>

            {/* Name Block */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            {/* ILB Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats Strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war },
                { label: "HITS", val: d.real_stats.hits },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {["🏆 HOF 1953", "⭐ 3× All-Star", "🏅 2× Batting Champ", "🏆 2× WS Champ", "📰 1929 MVP", "💥 253 H Record"].map((a, i) => (
                <span key={i} style={{
                  fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`,
                  padding: "2px 8px", borderRadius: 10, color: C.medBrown,
                  fontFamily: "'Courier Prime', monospace",
                }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK OF CARD — DOSSIER ═══════════ */
          <div style={{ padding: 16 }}>
            {/* Dossier Header */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16,
              borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8,
            }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership">
                    <p style={{ margin: 0 }}>{d.personality.leadership_style}</p>
                  </Section>
                  <Section title="Temperament">
                    <p style={{ margin: 0 }}>{d.personality.temperament}</p>
                  </Section>
                  <Section title="Work Ethic">
                    <p style={{ margin: 0 }}>{d.personality.work_ethic}</p>
                  </Section>
                  <Section title="Lifestyle">
                    <p style={{ margin: 0 }}>{d.personality.lifestyle}</p>
                  </Section>
                  <Section title="Era Adaptability">
                    <p style={{ margin: 0 }}>{d.personality.era_adaptability}</p>
                  </Section>
                  <Section title="Clubhouse Impact">
                    <p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p>
                  </Section>
                  <Section title="⚠ Hidden Complexity">
                    <p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p>
                  </Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section title="Preferred Locations">
                    {d.preferred_locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">
                    {d.momentum.hot_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="❄ Cold Triggers">
                    {d.momentum.cold_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p>
                  </Section>
                </>
              )}

              {tab === "actions" && (
                <>
                  <Section title="Action Card Seeds">
                    <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      These events, derived from Simmons's real life, become universal cards playable in any game.
                    </p>
                    {d.action_card_seeds.map((a, i) => (
                      <div key={i} style={{
                        background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`,
                        borderRadius: 4, padding: 10, marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                          <span style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 2,
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                            fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          }}>{a.type}</span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                        <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "engine" && (
                <>
                  <Section title="Stat Conversion Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      This is the reusable formula for converting real Baseball Reference stats into ILB card values.
                    </p>
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>
                          {key} — {data.metric || data.formula}
                        </div>
                        {data.tiers && (
                          <div style={{ marginTop: 4 }}>
                            {data.tiers.map((t, i) => (
                              <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>
                                {t.range} → {t.value !== undefined ? t.value : t.label}
                              </div>
                            ))}
                          </div>
                        )}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Simmons's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          background: C.darkBrown, padding: "6px 16px",
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
        }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{
        width: "100%", maxWidth: 420, marginTop: 20,
        background: "#1a150e", borderRadius: 6, padding: 16,
        border: `1px solid ${C.gold}30`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>
          JSON EXPORT PREVIEW
        </div>
        <pre style={{
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace",
          whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4,
          maxHeight: 200, overflow: "auto",
        }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  position: d.position,
  era: d.era,
  ilb_team: d.ilb_team,
  stats: d.ilb_stats,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
