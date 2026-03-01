import { useState } from "react";

const DAHLEN_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: "BAD" BILL DAHLEN
  // Year Snapshot: 1894 (Peak Season — 42-Game Hitting Streak)
  // ═══════════════════════════════════════════════════════════════

  name: "Bill Dahlen",
  nickname: "Bad Bill",
  year: 1894,
  team: "Chicago Colts",
  era: "1890s",
  ilb_team: "Banners",
  position: "SS",
  bats: "R",
  throws: "R",
  height: "5'9\"",
  weight: "180 lbs",
  born: "January 5, 1870 — Nelliston, NY",
  died: "December 5, 1950 — Brooklyn, NY",
  hof: "Not inducted — highest WAR (75.2) of any eligible non-HOF position player. Fell 2 votes short in 2013.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1894 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, FanGraphs
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1894,
    games: 121,
    at_bats: 502,
    hits: 182,
    doubles: 32,
    triples: 14,
    home_runs: 15,
    rbi: 108,
    runs: 150,
    stolen_bases: 43,
    batting_avg: ".359",
    obp: ".455",
    slg: ".566",
    ops: "1.021",
    ops_plus: 138,
    war: 7.1,
    career_avg: ".272",
    career_hits: 2461,
    career_hr: 84,
    career_sb: 548,
    career_war: 75.2,
    career_rbi: 1234,
    career_runs: 1590,
    career_doubles: 413,
    career_triples: 163,
    ejections: 70,
    hitting_streak: 42,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // ═══════════════════════════════════════════════════════════════
  ilb_stats: {
    ovr: 9,      // Elite / MVP tier — 75.2 career WAR, best non-HOF position player ever
    con: 5,      // .359 BA in 1894 (.330+ = 5), OPS+ 138 (≥130 = +1, already capped)
    pow: 2,      // 15 HR in 1894 (10-19 = 1), SLG .566 (≥.500 = +1) → 2
    spd: 3,      // 43 SB in 1894 (31-50 = 3), elite baserunner — Johnny Evers called him the best
    def: 2,      // Pre-Gold Glove era: elite SS range, led NL in assists 4×, set career records. Reputation = 2
    clu: 1,      // 0-for-15 in 1905 WS (.000 BA < .250 = 0), but 42-game streak = high-leverage performer → 1
  },

  stat_justification: {
    con: ".359 BA in 1894 — highest ever by a SS at the time. .330+ = max 5. Career .272 across 21 seasons with a 110 OPS+. Led NL in hits during peak years. The 42-game hitting streak proves sustained contact mastery.",
    pow: "15 HR in 1894 (10-19 HR = 1). SLG .566 (≥.500 = +1) → 2. Had considerable power for the dead-ball era — 84 career HR ranked among the top 15 all-time at retirement. Not a slugger, but dangerous.",
    spd: "43 SB in 1894 (31-50 = 3). Career 548 SB. Johnny Evers called him the most astute baserunner he'd ever seen. Famous ambidextrous hook slide. Elite speed and instincts on the bases.",
    def: "Pre-Gold Glove era (before 1957), so reputation-based: led NL in assists 4×, double plays 3×, set career records for games, putouts, assists, and total chances at SS. John McGraw called him the best SS in the country. 28.5 defensive WAR (11th all-time). Rating: 2 (conservative for pre-GG era).",
    clu: "Went 0-for-15 in only World Series (1905), which is .000 BA → 0. However, stole 3 bases and played flawless defense in that Series. The 42-game hitting streak shows ability to perform under sustained pressure. Splitting the difference: 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by intimidation and intensity. Dahlen didn't inspire through speeches — he inspired through fury. He played every game like a personal insult needed avenging. As a manager, he was ejected 36 times in four seasons.",
    temperament: "Volcanic. Ejected 70 times total across his career as player and manager. The nickname 'Bad Bill' came from his relentless umpire-baiting, which included physical confrontations. A 1898 Tribune summary noted he 'holds the record for being put out of games.' Tied an MLB record with 11 ejections in 1910 alone.",
    work_ethic: "Elite. Played 21 seasons and held the all-time games played record (2,443) at retirement. Despite his temper, Dahlen was durable, dependable, and always in the lineup. Cap Anson started him immediately as a rookie and he never stopped playing.",
    lifestyle: "Member of Chicago's notorious 'Dawn Patrol' — a group of Colts players who caroused all night. Dahlen, Bill Lange, and Jimmy Ryan were ungovernable partiers whose antics exhausted club management. He was known to get himself ejected from games to attend horse races.",
    era_adaptability: "HIGH. Grew up in tiny Nelliston, NY, played semi-pro at 19, adapted from small-town New York to big-city Chicago, Brooklyn, and Manhattan. Thrived under both Cap Anson's old-school discipline and John McGraw's combative style. Would fit any era that rewards toughness.",
    clubhouse_impact: "Divisive. Teammates either loved his fire or resented his indiscipline. Brooklyn ownership traded him twice because his behavior 'injured the team in a disciplinary way.' But McGraw — a kindred spirit — called the Dahlen trade the 'most successful deal I ever made.'",
    dark_side: "Divorced his first wife Hattie amid allegations of domestic violence in 1901. His ejection habit was compulsive — he'd get thrown out to attend horse races. After retirement, he faded into obscurity: night clerk at a Brooklyn post office, attendant at Yankee Stadium. Died at 80, buried in an unmarked grave.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Volatile Competitor", desc: "Ejection risk every game — but +1 to team intensity when present" },
    { tag: "Dawn Patrol", desc: "Nightlife affinity. If paired with other carousing players, chemistry boost — but fatigue risk increases" },
    { tag: "Iron Man", desc: "Held the all-time games played record. Extremely low injury risk" },
    { tag: "Umpire's Nightmare", desc: "High ejection probability. When ejected, team loses his stats for remainder of game" },
    { tag: "Scientific Runner", desc: "Ambidextrous hook slide. +1 SB success rate, harder to tag on bases" },
    { tag: "McGraw's Kindred Spirit", desc: "Extra chemistry with combative managers and aggressive team personalities" },
    { tag: "Forgotten Legend", desc: "If benched or underutilized, no morale penalty — Dahlen accepts obscurity quietly" },
    { tag: "Upstate Roots", desc: "Born 23 miles from Cooperstown. Comfort bonus in New York-based era squares" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Bar / Nightlife", affinity: "HIGH", note: "Core member of Chicago's Dawn Patrol. Caroused hard and often with Lange and Ryan." },
    { location: "Gambling Hall / Horse Track", affinity: "HIGH", note: "Got himself ejected from games to attend horse races. Known gambler." },
    { location: "Batting Cages / Practice Field", affinity: "MEDIUM", note: "Not known for extra practice, but 21-year durability suggests consistent preparation." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Combative presence. Argued with management, but respected by tough teammates." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social figure in Chicago and Brooklyn nightlife circles." },
    { location: "Hotel / Rest", affinity: "LOW", note: "Too restless. The Dawn Patrol didn't do early bedtimes." },
    { location: "Community Events", affinity: "LOW", note: "Taciturn and private off the field. Reluctant interviewee. Avoided the spotlight." },
    { location: "Church", affinity: "NONE", note: "No association in historical record." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Multi-hit games (the 42-game streak began with him batting just .257 — then he caught fire)",
      "Umpire confrontations that go his way (rage fuels performance)",
      "Playing for managers who match his intensity (McGraw effect)",
      "Pennant races and high-stakes series (4 NL pennants, 1 WS ring)",
    ],
    cold_triggers: [
      "Ejections (loses game time — the self-inflicted wound)",
      "Management criticism of his lifestyle (Chicago ownership's public complaints triggered decline)",
      "Postseason pressure (0-for-15 in the World Series suggests a different kind of cold)",
      "Being traded or feeling unwanted (Brooklyn traded him twice for disciplinary reasons)",
    ],
    pressure_response: "COMPLEX. Dahlen's 42-game hitting streak — getting hits in 70 of 71 games — is one of the greatest sustained pressure performances in baseball history. But he went 0-for-15 in his only World Series. He thrived under daily grind pressure but may have tightened in the ultimate spotlight. His temper was both fuel and flaw: it drove him to 21 seasons of elite play, but it also got him thrown out of games he could have won.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Streak",
      type: "Game Action",
      text: "Your SS has been hitting in every game. If he's had hits in 3+ consecutive games, he goes on a tear: +2 CON for the next 5 games. If the streak breaks, momentum drops to Cold.",
      origin: "Dahlen's record 42-game hitting streak in 1894 — hits in 70 of 71 games. Fourth-longest in MLB history.",
    },
    {
      title: "Ejected!",
      type: "Drama",
      text: "Your hothead player argues a call too aggressively. He's tossed from the game. Lose his stats for the remainder. If he was your best player, team morale drops by 1.",
      origin: "Dahlen was ejected 70 times as player and manager. He once tied the MLB record with 11 ejections in a single season (1910).",
    },
    {
      title: "The Dawn Patrol",
      type: "Drama",
      text: "Three of your players stayed out all night before a game. Each has -1 to all stats today. But if any of them get a hit, the others get a +1 morale boost. Camaraderie through chaos.",
      origin: "Dahlen, Bill Lange, and Jimmy Ryan were Chicago's notorious Dawn Patrol — ungovernable carousers who exhausted management's patience.",
    },
    {
      title: "Thrown Out to the Races",
      type: "Action",
      text: "Your player deliberately provokes an ejection so he can leave the game early. Remove him from the lineup. Roll: 60% chance he returns tomorrow refreshed (+1 all stats for 1 game). 40% chance he's suspended for 2 games.",
      origin: "Dahlen's habit of getting ejected to attend horse races at the track.",
    },
    {
      title: "The Best Deal I Ever Made",
      type: "Trade",
      text: "Trade a 'problem' player with high stats to a rival. The traded player gets +2 OVR with his new team. Your team gets two replacement-level players. Was it worth it?",
      origin: "John McGraw called acquiring Dahlen from Brooklyn 'the most successful deal I ever made.' Brooklyn got two busts in return.",
    },
    {
      title: "Sparrow in an Open Lot",
      type: "Drama",
      text: "Your manager can't keep your volatile player under control. For the next 3 games, roll before each game: 25% chance of ejection before the 5th inning.",
      origin: "A New York Times writer compared managing Dahlen to 'trying to keep a sparrow in an open lot.'",
    },
    {
      title: "The Hook Slide",
      type: "Game Action",
      text: "Your baserunner attempts a steal with his signature ambidextrous slide. +20% success rate on this steal attempt. If successful, rattles the opposing catcher for the rest of the inning.",
      origin: "Johnny Evers called Dahlen the most astute baserunner he'd ever seen, particularly his ambidextrous hook slide that anticipated where the catcher's throw would arrive.",
    },
    {
      title: "Unmarked Grave",
      type: "Drama",
      text: "A retired legend from your franchise is discovered living in obscurity. Pay 3 coins to honor him publicly: +2 team morale and unlock a Mentor card. Ignore it: no effect, but a lost opportunity.",
      origin: "After baseball, Dahlen worked as a Yankee Stadium attendant and Brooklyn post office clerk. He died at 80 and was buried in an unmarked grave. As of 2006, it remained unmarked.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, stocky build at 5'9\" 180 lbs. Hard, weathered face with a permanent scowl. German descent. Sharp eyes under a heavy brow. Thick mustache typical of 1890s players. Built like a firecracker — small but explosive.",
    attire: "Chicago Colts uniform circa 1894 — high-collared wool jersey, baggy flannel pants, pillbox or flat-top cap. No number (pre-numbered era). Dark stockings. Leather belt.",
    mood: "Defiant intensity. Mid-argument energy — jaw clenched, eyes locked on the umpire or pitcher. The 'Bad Bill' glare. Not smiling. Never smiling.",
    style: "Sepia-toned with warm golden highlights. Dusty 1890s ballfield in soft focus behind him. Vintage photographic grain. Unified ILB portrait style.",
    reference: "Think 1890s cabinet card photography rendered in the ILB sepia portrait style. The energy of a man who was ejected 70 times — barely contained fury behind the eyes.",
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
    note: "Pre-1957 players: use historical defensive reputation",
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

export default function BillDahlenCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = DAHLEN_DATA;
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
          Player Card Generator — {d.ilb_team} • {d.era}
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
                [AI Portrait: Sepia-toned, defiant scowl, Colts wool jersey, 1890s mustache, dusty ballfield]
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

            {/* Special: Streak Badge */}
            <div style={{
              textAlign: "center", marginTop: 8,
              padding: "4px 12px",
              background: `${C.warmRed}15`,
              border: `1px solid ${C.warmRed}40`,
              borderRadius: 4,
              fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700, letterSpacing: 1,
            }}>
              🔥 42-GAME HITTING STREAK — 4TH LONGEST IN MLB HISTORY
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {[
                "🏆 1× WS Champ",
                "🏅 4× NL Pennant",
                "👑 1904 NL RBI Leader",
                "📊 75.2 Career WAR",
                "🔥 42-Game Streak",
                "⚡ 548 Career SB",
              ].map((a, i) => (
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
                      These events, derived from Dahlen's real life, become universal cards playable in any game.
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
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Trade" ? `${C.traitGreen}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Trade" ? C.traitGreen : C.medBrown,
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
                        {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Dahlen's Derivation">
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
          <span>ILB • {d.ilb_team}</span>
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
