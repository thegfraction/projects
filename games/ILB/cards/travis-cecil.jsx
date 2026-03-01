import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: CECIL TRAVIS
  // Year Snapshot: 1941 (Peak Season — Led AL in Hits)
  // ═══════════════════════════════════════════════════════════════

  name: "Cecil Travis",
  nickname: "The Georgia Peach II",
  year: 1941,
  team: "Washington Senators",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SS",
  bats: "L",
  throws: "R",
  height: '6\'1"',
  weight: "185 lbs",
  born: "August 8, 1913 — Riverdale, GA",
  died: "December 16, 2006 — Riverdale, GA",
  hof: "Not inducted. .314 career BA (AL record for SS), 3× All-Star, 1,544 hits. Bill James' #1 war-casualty HOF case.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1941 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Cooperstown Expert
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1941,
    games: 152,
    at_bats: 607,
    hits: 218,
    doubles: 39,
    triples: 19,
    home_runs: 7,
    rbi: 101,
    stolen_bases: 3,
    batting_avg: ".359",
    obp: ".408",
    slg: ".520",
    ops: ".932",
    ops_plus: 150,
    war: 5.6,
    all_star: 3,
    career_avg: ".314",
    career_hits: 1544,
    career_hr: 27,
    career_sb: 23,
    career_war: 22.8,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .359 BA → tier 5 (.330+). OPS+ 150 ≥ 130 → +1, capped at 5.
  // POWER (POW) — 7 HR → tier 0 (0-9). SLG .520 ≥ .500 → +1 bonus = 1.
  // SPEED (SPD) — 3 SB → tier 0 (0-5). No CF/SS GG bonus (pre-GG era, decent but not elite range). SPD 0.
  // DEFENSE (DEF) — Named best all-around SS by Sporting News. Steady fielder, led AL in DP at 3B in 1935. Good not great defensively. DEF 1 (equivalent 1-2 GG).
  // CLUTCH (CLU) — No postseason appearances. Take-out slide in 1941 ASG saved rally for Williams' HR. Regular-season clutch. CLU 1.
  // OVERALL (OVR) — CON 5×2=10 + POW 1×1.5=1.5 + SPD 0×1=0 + DEF 1×0.5=0.5 = 12 raw.
  //   3× All-Star, .327 pre-war BA, would-be HOFer per Bill James.
  //   But career cut short — only 1,544 hits. All-Star tier → OVR 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — elite contact SS, career destroyed by war
    con: 5,      // .359 BA in 1941 — 2nd in AL behind Williams' .406. Led AL in hits (218). .327 pre-war career avg.
    pow: 1,      // 7 HR (tier 0) + SLG .520 bonus = 1. Line-drive doubles/triples hitter, not a power bat.
    spd: 0,      // 3 SB in 1941, 23 career. Not a basestealer. Frostbite destroyed what speed he had.
    def: 1,      // Sporting News best all-around SS pre-WWII. Steady, not spectacular. Equivalent 1-2 GG.
    clu: 1,      // No postseason. Take-out slide in 1941 ASG enabled Williams' legendary walk-off HR. Regular-season big moments.
  },

  stat_justification: {
    con: "Hit .359 in 1941, second only to Ted Williams' .406. Led both leagues with 218 hits. Pre-war career average of .327 — hit .300+ in 8 of 9 full seasons. OPS+ 150 in peak year. Third-highest career BA among all AL shortstops in history (.314), behind only Wagner and Vaughan. Ted Williams said: 'In 1941, Cecil Travis was just as good as either of us.' Maximum contact.",
    pow: "7 HR in 1941 — his career high. Only 27 career HR in 12 seasons. However, SLG .520 in 1941 meets the .500 bonus threshold, driven by 39 doubles and 19 triples (316 total bases). POW 0 (HR tier) + 1 (SLG bonus) = 1. Travis was a gap hitter with extra-base pop, not a home run hitter.",
    spd: "Only 3 SB in 1941 and 23 career. Travis was never a speed player — his 19 triples in 1941 came from gap power and hustle, not raw speed. After the war, frostbitten feet eliminated whatever speed he had. No CF/SS Gold Glove bonus (pre-GG era, and his defense was good but not premium range). SPD 0.",
    def: "Named best all-around shortstop by The Sporting News before WWII. Led AL in double plays at 3B in 1935. Described as a 'steady fielder' — reliable, not flashy. Bill James rated him as roughly average defensively at SS. Equivalent to 1-2 Gold Gloves. DEF 1.",
    clu: "Never played in the World Series — Senators were perennial losers. However, his take-out slide at second base in the 1941 All-Star Game prevented a double play and kept the rally alive, enabling Ted Williams' legendary walk-off home run. A team-first play on the biggest stage. Regular-season batting race competitor (.359 in the Williams/.406 year). CLU 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Silent, dutiful, lead-by-performance. Travis never spoke up, never campaigned for himself, never complained. When asked if the war cost him the Hall of Fame, he said: 'I was a good player, but I wasn't a great one.' His leadership was pure example — show up, hit .300, go home to the farm.",
    temperament: "Humble, stoic, profoundly modest. Umpires named him their favorite player. Teammates loved him. He refused to cooperate with his own biographer out of a distaste for publicity. When honored with 'Cecil Travis Night' at Griffith Stadium, General Eisenhower attended. Travis accepted a 1,500-pound Hereford bull and a DeSoto automobile with the same quiet grace.",
    work_ethic: "Self-made hitter. Early career: opposite-field slapper. By 1941: complete hitter with pull power. He experimented in spring training with heavier bats, different grips, and a deeper stance. Transformed himself from a singles hitter to a .359/19-triple machine. The swing transformation was his own project.",
    lifestyle: "Georgia farm boy, born and died in Riverdale. Youngest of ten children on a 200-acre farm. Declined a Georgia Tech scholarship for a baseball training school. After retirement, scouted for the Senators until 1956, then returned to his family farm to raise livestock. Lived quietly in Riverdale until age 93.",
    era_adaptability: "MODERATE. Travis's batting skill would translate to any era — .327 pre-war is .327 anywhere. But his lack of power and speed limit his value in modern baseball economics. He'd be a high-AVG, high-OBP contact shortstop — think John Olerud at short (per Ted Williams' own comparison). His defense was solid but not premium.",
    clubhouse_impact: "QUIET-RESPECTED. Travis was universally liked but not a vocal presence. He was teammates with Mickey Vernon and Buddy Myer on the Senators. His modest, workmanlike approach made him the anti-celebrity — a man who simply played baseball extremely well and never asked for recognition.",
    dark_side: "The frozen feet. Travis served in the 76th Infantry Division and fought in the Battle of the Bulge. Crouched in a frozen foxhole, he suffered severe frostbite that nearly required amputation. Doctors saved his feet, but the damage was permanent — destroyed his balance at the plate and his mobility afield. He returned to baseball at 31 but hit only .241/.252/.216 in his final three seasons. The war didn't just interrupt his career — it destroyed it. In ILB terms: Travis carries a 'Frostbite' trait. If he is drafted into a war event, there is a high probability he returns permanently diminished.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Pure Hitter", desc: ".327 pre-war average. Hits to all fields. +1 CON in any matchup where opponent pitcher has CTL ≤ 2." },
    { tag: "Battle of the Bulge", desc: "Bronze Star recipient. WWII combat veteran. +2 chemistry with other war veterans. Immune to intimidation events." },
    { tag: "Frostbite", desc: "If drafted into a war/hardship event, 60% chance of permanent -2 to SPD and -1 to CON upon return. This is Travis's defining tragedy." },
    { tag: "Georgia Farm Boy", desc: "Born and died in Riverdale, GA. +1 comfort in rural/Southern era squares. Uncomfortable in big-city nightlife." },
    { tag: "Umpire's Favorite", desc: "Named favorite player by AL umpires. Close calls at the plate go his way. -1 to opponent's challenge attempts." },
    { tag: "Forgotten All-Star", desc: "Despite elite stats, Travis generates zero media attention. -2 fame modifier, but teammates gain +1 morale from his quiet consistency." },
    { tag: "Five Hits on Debut", desc: "Went 5-for-5 in his first MLB game. When Travis joins a new team, he goes Hot for his first 3 games." },
    { tag: "Vernon's Mentor", desc: "Mickey Vernon studied Travis's all-fields hitting technique. +2 chemistry when paired with Vernon on same roster." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Farm / Rural Area", affinity: "HIGH", note: "Born on 200-acre farm in Riverdale, GA. Returned to raise livestock after retirement. Died there at 93." },
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Self-taught swing transformation. Experimented constantly with bat weight, grip, and stance." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Quiet presence. Respected by all. Never the loudest voice." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Conservative, modest lifestyle. Happy with solitude." },
    { location: "Church / Community", affinity: "MEDIUM", note: "Humble Georgia values. Modest, faith-oriented." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a nightlife person. Farm boy sensibilities." },
    { location: "Media / Spotlight", affinity: "NONE", note: "Refused to cooperate with his own biographer. Actively avoided publicity." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Batting streaks — 24-game hitting streak in 1941, coinciding with DiMaggio's 56-game run",
      "Spring training breakthroughs — reinvented his swing before 1941 with new grip and stance",
      "All-Star selections — elevated play in showcase moments (1941 ASG slide)",
      "Return to Griffith Stadium — always hit well at home in DC",
    ],
    cold_triggers: [
      "Physical injury — the frostbite destroyed his career; any leg/foot injury triggers cold streak",
      "Losing teams — Senators were chronic losers; extended losing erodes quiet players first",
      "Post-war adjustment — the gap between peak performance and diminished return is enormous",
    ],
    pressure_response: "QUIETLY EXCELLENT. Travis was not a dramatic clutch performer — he was a relentless, consistent hitter who elevated in big moments without fanfare. His take-out slide in the 1941 All-Star Game — sacrificing his body to prevent a double play, keeping the rally alive for Williams' walk-off homer — is the perfect Travis moment: selfless, effective, completely uncredited. He was the teammate who made everyone else's highlights possible. In ILB: Travis performs at his OVR in all situations, with a slight bonus in team-play scenarios where another player can capitalize.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Five Hits on Debut Day",
      type: "Game Action",
      text: "Your newly called-up player goes 5-for-5 in his first MLB game. He immediately goes Hot and gains +1 reputation. Only the second player in history to accomplish this feat.",
      origin: "Travis went 5-for-5 in his first major league game on May 16, 1933 — only the second player to do so, after Fred Clarke in 1894.",
    },
    {
      title: "The Frozen Foxhole",
      type: "Drama",
      text: "Your player is drafted into military service and sent to a winter combat zone. Roll a d6: on 1-3, he suffers permanent frostbite (-2 SPD, -1 CON permanently). On 4-5, he returns shaken but intact (-1 CON for one season). On 6, he returns stronger (+1 CLU permanently, immune to cold triggers).",
      origin: "Travis served in the 76th Infantry Division during the Battle of the Bulge. Severe frostbite nearly cost him his feet. Doctors operated to prevent amputation, but the permanent damage destroyed his batting balance and fielding mobility.",
    },
    {
      title: "The Invisible 24-Game Streak",
      type: "Game Action",
      text: "Your player goes on a 24-game hitting streak — but nobody notices because a teammate or rival is doing something even more spectacular. Your player gains +1 CON for the streak's duration but +0 fame.",
      origin: "Travis's 24-game hitting streak in 1941 went largely unreported because it coincided with Joe DiMaggio's 56-game streak.",
    },
    {
      title: "The Take-Out Slide",
      type: "Game Action",
      text: "In a crucial late-inning situation, your infielder makes a hard take-out slide at second base to break up a double play. The rally continues. Your next batter gets +2 to his at-bat. Your slider takes 1 fatigue.",
      origin: "In the 1941 All-Star Game, Travis's take-out slide at second base in the 9th inning prevented a double play and kept the rally alive, enabling Ted Williams' legendary game-winning home run.",
    },
    {
      title: "The Hereford Bull",
      type: "Drama",
      text: "Your retiring veteran is honored with a special night at the ballpark. A general attends the ceremony. Your player receives a 1,500-pound bull and a new car. Team morale +2 for the remainder of the season.",
      origin: "On August 15, 1947, the Senators held 'Cecil Travis Night' at Griffith Stadium. General Eisenhower attended. Travis received a DeSoto automobile and a 1,500-pound Hereford bull, among other gifts.",
    },
    {
      title: "'I Was a Good Player, Not a Great One'",
      type: "Drama",
      text: "Your veteran player, passed over for the Hall of Fame, refuses to campaign for himself. He accepts his fate with quiet dignity. Team chemistry +1 (teammates inspired by humility). Your player's fame stays at 0, but his legacy modifier increases by +3.",
      origin: "Travis said of his Hall of Fame chances: 'I was a good player, but I wasn't a great one.' He never bemoaned the lost years, saying: 'We had a job to do, an obligation, and we did it. I was hardly the only one.'",
    },
    {
      title: "The Third Man of 1941",
      type: "Action",
      text: "In a historic season where two superstars dominate the headlines (a hitting streak and a batting average chase), your player quietly leads the league in hits. He finishes third in the conversation despite being second in the standings. Draw 1 bonus card — it's always useful, never flashy.",
      origin: "In 1941 — the year of Williams' .406 and DiMaggio's 56-game streak — it was Cecil Travis who led the American League in hits with 218. Williams himself said: 'In 1941, Cecil Travis was just as good as either of us.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, angular Southern face. 6'1\" 185 lbs — tall and rangy for a shortstop. Strong jaw, quiet eyes, the look of a Georgia farmer who happens to play baseball. Left-handed batter's stance. Clean-shaven, modest expression. No flash.",
    attire: "Washington Senators home whites, early 1940s vintage. Classic baggy wool flannel, high stirrups. Left-handed batting stance — the sweet, balanced swing Ted Williams compared to John Olerud's. Or fielding position at shortstop, glove ready, knees bent.",
    mood: "Stoic resolve. Not sad, not joyful — steady. The expression of a man who hit .359 in the same season as Williams' .406 and got no headlines for it. Quiet dignity. The faintest suggestion of something lost — the shadow of what the war would take from him.",
    style: "Sepia-toned with slightly cooler undertones than the Vernon card — a hint of winter in the warmth, foreshadowing the Bulge. Griffith Stadium in soft focus behind him. The portrait should feel like a photograph found in an old Army footlocker — precious, faded, almost forgotten.",
    reference: "Think 1941 Play Ball card aesthetic. The card should evoke the tragedy of potential unfulfilled — the most heartbreaking card in the Allies set. A man frozen in his prime, literally and figuratively.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — POSITION PLAYER
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

export default function CecilTravisCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
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
          Player Card — Allies Era
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
                [AI Portrait: Sepia-toned, lean rangy SS, Senators whites, stoic resolve]
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
              {["⭐ 3× All-Star", "👑 Led AL Hits (218)", "🎖️ Bronze Star", "⚔️ Battle of the Bulge", "📜 .314 Career BA (AL SS Record)", "🏅 6th MVP 1941"].map((a, i) => (
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
                      These events, derived from Travis's real life, become universal cards playable in any game.
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
                  <Section title="Travis's Derivation">
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
