import { useState } from "react";

const BERGER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: WALLY BERGER
  // Year Snapshot: 1935 (Led NL in HR and RBI)
  // ═══════════════════════════════════════════════════════════════

  name: "Wally Berger",
  nickname: "The Forgotten Star",
  year: 1935,
  team: "Boston Braves",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "CF",
  bats: "R",
  throws: "R",
  height: "6'2\"",
  weight: "198 lbs",
  born: "October 10, 1905 — Chicago, IL",
  died: "November 30, 1988 — Redondo Beach, CA",
  hof: "Not inducted. .300 BA, 242 HR, 898 RBI, 138 OPS+ in 11 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1935 PEAK SEASON
  // Source: Baseball-Reference, Baseball Almanac, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1935,
    games: 150,
    at_bats: 589,
    hits: 174,
    doubles: 39,
    triples: 4,
    home_runs: 34,
    rbi: 130,
    stolen_bases: 3,
    batting_avg: ".295",
    obp: ".355",
    slg: ".548",
    ops: ".903",
    ops_plus: 138,
    war: 6.1,
    career_avg: ".300",
    career_hits: 1550,
    career_hr: 242,
    career_rbi: 898,
    career_war: 30.0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .200-.249 = 1 | .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ ≥ 130 adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG ≥ .500 adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + triples + range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove at CF/SS adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — Fielding reputation
  //   No Gold Glove = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //
  // OVERALL (OVR) — Weighted composite
  //   CON×2 + POW×1.5 + SPD×1 + DEF×0.5, normalized to 3-13
  //
  // CLUTCH (CLU) — Postseason performance modifier
  //   PS BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   World Series hero moment adds +1 (cap at 3)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — .300 career BA, 242 HR, 898 RBI, 138 OPS+, 4× All-Star, led NL in HR/RBI 1935. But: only 11 seasons, career cut short by injuries, 30.0 WAR, never won a pennant as a primary contributor. OVR 8.
    con: 4,      // .295 BA → tier 3 (.270-.299). OPS+ 138 → +1 bonus (≥130). CON 4.
    pow: 4,      // 34 HR → tier 3 (30-39). SLG .548 → +1 bonus (≥.500). POW 4.
    spd: 1,      // 3 SB → tier 0 (0-5). Led NL CF in putouts (458) — elite range at CF, equivalent to Gold Glove → +1 bonus. SPD 1.
    def: 1,      // Pre-Gold Glove era. Led NL OF in putouts 1935 (458). Bill James: best CF ever for Bill McKechnie. Steady, reliable center fielder. Equivalent to 1-2 GG. DEF 1.
    clu: 0,      // 0-for-18 combined in 1937 and 1939 World Series (.000 BA). Pinch-hit role only. No hero moments. CLU 0.
  },

  stat_justification: {
    con: ".295 BA in 1935 → tier 3 (.270-.299). OPS+ 138 → +1 bonus (≥130). Career .300 BA, .359 OBP, 138 career OPS+. Averaged .307 over first 7 seasons. Rating of 4.",
    pow: "34 HR in 1935 → tier 3 (30-39). SLG .548 → +1 bonus (≥.500). Led NL in HR (34) and RBI (130). 38 HR as rookie (MLB record for 57 years). 242 career HR. His HR total was 4 shy of his entire team's win total (38) in 1935. Rating of 4.",
    spd: "3 SB in 1935 → tier 0 (0-5). Led NL CF in putouts with 458 — elite range at the position, equivalent to Gold Glove-caliber range → +1 positional bonus. Rating of 1.",
    def: "Pre-Gold Glove era (GG started 1957). Led NL OF in putouts 1935 (458). Bill James named him best CF for manager Bill McKechnie. Steady, reliable center fielder for 7+ years. .975 career fielding pct. Equivalent to 1-2 Gold Gloves. Rating of 1.",
    clu: "0-for-18 combined in 1937 WS (Giants, 0-for-3 as pinch-hitter) and 1939 WS (Reds, 0-for-15). .000 career WS batting average. No postseason hero moments. The anti-clutch. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Quiet Professional. 'Berger was modest, quiet, hard-working, conscientious, and disciplined. He didn't kick dirt on umpires, become engaged in scandal, or engage in wacky behavior. He didn't make good copy for the boys in the press box.' He was the best player on the worst team in baseball, and he played every day without complaint. He carried the Braves' offense single-handedly for seven years. His 27 HR in 1933 were half the team's total. His 34 HR in 1935 were four shy of the team's 38 wins.",
    temperament: "Steady, determined, professional. 'I never thought of records, I just liked to hit.' Berger wasn't flashy or emotional. He showed up, played center field, hit home runs, and went home. He negotiated hard for his salary — he held out as a rookie, argued against pay cuts during the Depression, and always felt underpaid. But on the field, he was all business.",
    work_ethic: "Self-made. Took a pay cut in 1927 just to get his first organized baseball opportunity at Pocatello, Idaho. Hit 40 HR in the PCL in 1929. Then hit 38 HR as a rookie in 1930. Reported to spring training in perfect shape because he knew he'd have to win his job. Seven years of elite production followed.",
    lifestyle: "Born in Chicago, raised in San Francisco. Mission High School teammate of Joe Cronin. German immigrant parents (Anton and Hedwig). After baseball: scouted for the Yankees, managed their minor league team in Manchester, NH in 1949. Died of a stroke in Redondo Beach, California in 1988 at age 83. Buried at Inglewood Park Cemetery. A quiet life bookending a quietly spectacular career.",
    era_adaptability: "HIGH. The power translates to any era — 34 HR in a pitcher's park (Braves Field) on a terrible team in 1935 suggests 40+ in a modern lineup. The .300 BA and elite CF defense add further value. Berger would be a franchise center fielder today. The only thing that doesn't translate is his health — the shoulder injury that ended his prime would still end it.",
    clubhouse_impact: "STEADY-QUIET. Berger wasn't a rah-rah leader or a clubhouse clown. He was the guy who showed up every day, played hard, and produced. On a terrible team, that consistency was the only thing fans could count on. Al Hirshberg: 'No matter how badly the Braves were doing, Berger, single-handed, could keep some customers coming in.'",
    dark_side: "The invisibility. Berger played his entire prime on the worst team in baseball. The Braves never finished higher than 4th during his tenure. He made 4 All-Star teams but is the only starter from the 1934 ASG not in the Hall of Fame. He went 0-for-18 in his two World Series — both as a diminished role player after his prime. His 138 career OPS+ ties Reggie Jackson, but Jackson is in Cooperstown and Berger is forgotten. The HOF Veterans Committee has never seriously considered him. He is baseball's greatest ghost.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Forgotten Star", desc: "Berger produces elite numbers that nobody notices. +0 publicity regardless of performance. His stats never generate headlines. On a good team, this changes — if Berger is traded to a contender, +2 publicity for the first season." },
    { tag: "One-Man Offense", desc: "When Berger is the best hitter on a bad team: +1 POW (carrying the load). His 27 HR in 1933 were half the Braves' team total. His HR total nearly matched the team's win total in 1935." },
    { tag: "Rookie Record", desc: "38 HR as a rookie in 1930 — MLB record for 57 years. In his first season: +2 POW. The league has never seen him before. After year 1, the bonus fades as pitchers adjust." },
    { tag: "Braves Field Prisoner", desc: "Braves Field was a pitcher's park. -1 POW at home. +1 POW on the road. Berger's 105 HR at Braves Field are the franchise record — imagine what he'd have hit in a hitter's park." },
    { tag: "Mission High Connection", desc: "Berger and Joe Cronin were high school teammates at Mission High in San Francisco. When paired with Cronin: +1 team chemistry. Old friends from the sandlots." },
    { tag: "The $10,000 Homer", desc: "Once per season, in the final game: if Berger's team needs a win to reach the first division (top half), +2 CLU for that AB only. In 1933, his pinch-hit grand slam on the final day lifted the Braves into 4th place, earning every player a share of World Series money." },
    { tag: "Salary Negotiator", desc: "Berger always felt underpaid. He held out as a rookie, argued against Depression pay cuts, and negotiated aggressively. +1 team budget tension. Will not accept below-market contracts without holdout risk." },
    { tag: "The Shoulder", desc: "After year 6-7, 20% chance per season of shoulder/hand injury. If triggered: -2 POW permanently, career trajectory breaks. Based on Berger's 1936 shoulder injury that ended his prime at age 30." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Braves Field / Boston", affinity: "HIGH", note: "7+ seasons. 190 HR as a Brave (franchise record). 105 HR at Braves Field (park record). The only star on the worst team." },
    { location: "Center Field", affinity: "HIGH", note: "Led NL CF in putouts. Bill James: best CF for McKechnie. Steady, reliable, rangy." },
    { location: "Batting Cage / Practice", affinity: "HIGH", note: "'I never thought of records, I just liked to hit.' Hard-working, conscientious, disciplined." },
    { location: "San Francisco / Home", affinity: "MEDIUM", note: "Raised in SF. Mission High School. PCL star (40 HR in 1929). California through and through." },
    { location: "World Series", affinity: "LOW", note: "0-for-18 combined in 1937 and 1939 WS. The stage where the Forgotten Star disappeared completely." },
    { location: "Hall of Fame", affinity: "NONE", note: "Never inducted. Never seriously considered. 138 OPS+ ties Reggie Jackson. Baseball's greatest ghost." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Rookie seasons — 38 HR in his first year. Berger explodes when the league hasn't seen him before.",
      "Carrying bad teams — when he's the only good player, the pressure focuses him. Half the Braves' HR in 1933.",
      "Contract disputes resolved — after holding out and getting paid, Berger produces at his highest level.",
      "Road games — Braves Field was a pitcher's park. Berger was better away from home.",
    ],
    cold_triggers: [
      "Shoulder/hand injuries — the 1936 injury broke his career in half. Before: .307/28 HR/103 RBI per year. After: diminished role player.",
      "World Series — 0-for-18 lifetime. The biggest stage was his worst stage.",
      "Reduced playing time — Berger was a starter for 7 years. As a platoon/pinch-hitter, he lost his rhythm.",
    ],
    pressure_response: "SPLIT PERSONALITY. In the regular season: elite. Berger carried the worst team in baseball for seven years. His pinch-hit grand slam on the final day of 1933 lifted the Braves into the first division and earned every player a share of World Series money — 'The $10,000 Homer.' But in the actual World Series: 0-for-18. Two separate Series (1937, 1939), both as a diminished player past his prime, both hitless. The man who was unstoppable for the Braves was invisible on the October stage. In ILB: Berger is a regular-season monster with a postseason collapse trait — the opposite of Pepper Martin.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Thirty-Eight Home Runs as a Rookie",
      type: "Game Action",
      text: "Your new center fielder — a 24-year-old nobody from the Pacific Coast League — hits 38 home runs in his first major league season. It's a record. It will stand for 57 years. He reached 20 home runs in just 51 games, which is also a record. Nobody saw it coming.",
      origin: "1930: Berger hit 38 HR as a rookie, setting an MLB record that stood until Mark McGwire's 49 in 1987. NL record until Cody Bellinger in 2017.",
    },
    {
      title: "The $10,000 Homer",
      type: "Game Action",
      text: "Final day of the season. Your team needs a win to finish in the upper half of the standings. This matters because every player gets a share of World Series gate receipts if they finish in the first division. Your center fielder — pinch-hitting — launches a grand slam. The team finishes 4th. Every player gets paid.",
      origin: "October 1, 1933: Berger's pinch-hit grand slam on the final day lifted the Braves into 4th place. Headline: 'Berger Slams $10,000 Homer.'",
    },
    {
      title: "Half the Team's Home Runs",
      type: "Action",
      text: "Your center fielder hits 27 home runs. Your entire team hits 54. One man accounts for half your offense. He finishes 3rd in MVP voting. The team finishes 4th. He is the only reason anyone comes to the ballpark.",
      origin: "1933: Berger's 27 HR were exactly half the Braves' team total of 54.",
    },
    {
      title: "Four Shy of the Win Total",
      type: "Action",
      text: "Your center fielder hits 34 home runs. Your team wins 38 games. His home run total is four shy of the entire team's win total. He leads the league in HR and RBI. The team finishes last. He is a star imprisoned on a terrible roster.",
      origin: "1935: Berger's 34 HR vs. the Braves' 38 wins. He led the NL in HR and RBI.",
    },
    {
      title: "The Only Non-Hall-of-Famer",
      type: "Drama",
      text: "Your center fielder starts the All-Star Game. Decades later, every other starter from that game has been elected to the Hall of Fame. Your center fielder has not. His 138 career OPS+ ties a Hall of Famer. His numbers compare to two enshrined players. But he played on bad teams, in a pitcher's park, and nobody remembers.",
      origin: "Of the 18 starters in the 1934 ASG, Berger is the only one not in the HOF. His 138 OPS+ ties Reggie Jackson.",
    },
    {
      title: "The Shoulder Breaks",
      type: "Drama",
      text: "Your star center fielder injures his shoulder and hand midseason. He plays through it — still hits 25 HR — but he's never the same. Before the injury: .307 BA, 28 HR, 103 RBI per year for seven years. After: role player, traded twice, 0-for-18 in the World Series. The prime is over. He's 30 years old.",
      origin: "1936: Berger's shoulder and hand injury ended his prime. Before: 7 elite seasons. After: 4 diminished years.",
    },
    {
      title: "Zero for Eighteen",
      type: "Drama",
      text: "Your center fielder finally reaches the World Series — twice. He goes 0-for-3 in 1937 as a pinch-hitter. He goes 0-for-15 in 1939 as a starter. Combined: 0-for-18, .000 BA. The man who carried the worst team in baseball for seven years cannot get a hit when it matters most.",
      origin: "Berger was 0-for-18 combined in the 1937 WS (Giants) and 1939 WS (Reds).",
    },
    {
      title: "The Holdout Rookie",
      type: "Action",
      text: "Your new prospect has never played a major league game. The team sends him a $4,500 contract. He holds out immediately. He has no leverage — he's a rookie under the reserve clause. But he knows what he's worth. He signs reluctantly, then hits 38 home runs.",
      origin: "Berger held out before his 1930 rookie season. 'They said I'd have to prove myself, so with that thought in mind, I went to spring training.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lanky, raw-boned, blond. 6'2\" 198 lbs — tall and lean for the era. German heritage. Quiet, serious expression — not stern, just focused. The face of a man who doesn't need attention but deserves it.",
    attire: "Boston Braves 1935 home whites — the old 'B' cap. Braves Field behind him. The pose: mid-swing follow-through, the ball heading out. Or: standing in center field, alone, the vast outfield of Braves Field stretching behind him — the only star in an empty park.",
    mood: "Quiet excellence. The card should feel slightly melancholy — not sad, but overlooked. Like finding a masterpiece in an attic. Berger was a great player on a terrible team, and the card should convey both the greatness and the obscurity.",
    style: "Muted Boston earth tones — brick red, autumn brown, faded green of Braves Field. Less saturated than the Gashouse Gang cards. This is a card about a star who never got the spotlight. The colors should reflect that — beautiful but understated.",
    reference: "The card of the Forgotten Star. The man who hit 38 HR as a rookie. The man who hit half his team's home runs. The man whose HR total nearly matched his team's wins. The man who started the first All-Star Game. The man who went 0-for-18 in the World Series. The man who isn't in the Hall of Fame. Wally Berger — baseball's greatest ghost.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// This is the formula that will be used for ALL future cards
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

export default function WallyBergerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = BERGER_DATA;
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
        background: C.parchment, borderRadius: 8,
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
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{
              width: "100%", aspectRatio: "1/1",
              background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`,
              border: `2px solid ${C.gold}60`, borderRadius: 4,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Lanky, blond, raw-boned, Braves 'B' cap, mid-swing, Braves Field, muted autumn tones, quiet intensity]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>

            {/* Name Block */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war },
                { label: "HITS", val: d.real_stats.hits },
              ].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            {/* Awards */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 4× All-Star", "👑 1935 NL HR Leader", "🎯 1935 NL RBI Leader", "🏠 38 HR Rookie Record", "📊 .300 Career BA", "💎 242 Career HR", "🏟️ NL ASG CF 1933-34", "👻 Baseball's Greatest Ghost"].map((a, i) => (
                <span key={i} style={{
                  fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`,
                  padding: "2px 8px", borderRadius: 10, color: C.medBrown,
                  fontFamily: "'Courier Prime', monospace",
                }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
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

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                  <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                  <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                  <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                  <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                  <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                  <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                    <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
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
                        <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                  <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                  <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
                </>
              )}

              {tab === "actions" && (
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Berger's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              )}

              {tab === "engine" && (
                <>
                  <Section title="Stat Conversion Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>This is the reusable formula for converting real Baseball Reference stats into ILB card values.</p>
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                        {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Berger's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}
                </Section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
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
