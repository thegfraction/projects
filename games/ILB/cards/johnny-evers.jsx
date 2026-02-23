import { useState } from "react";

const EVERS_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JOHNNY EVERS
  // Year Snapshot: 1908 (Merkle's Boner — Pennant-Winning Play)
  // ═══════════════════════════════════════════════════════════════

  name: "Johnny Evers",
  nickname: "The Crab",
  year: 1908,
  team: "Chicago Cubs",
  era: "1900s",
  ilb_team: "Banners",
  position: "2B",
  bats: "L",
  throws: "R",
  height: "5'9\"",
  weight: "125 lbs",
  born: "July 21, 1881 — Troy, NY",
  died: "March 28, 1947 — Albany, NY",
  hof: "Class of 1946 (Old Timers Committee) — Inducted alongside Tinker and Chance.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1908 SEASON
  // Source: Baseball-Reference, SABR BioProject, Wikipedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1908,
    games: 126,
    at_bats: 416,
    hits: 125,
    doubles: 19,
    triples: 6,
    home_runs: 0,
    rbi: 37,
    runs: 83,
    stolen_bases: 36,
    batting_avg: ".300",
    obp: ".402",
    slg: ".360",
    ops: ".762",
    ops_plus: 126,
    war: 4.7,
    career_avg: ".270",
    career_hits: 1659,
    career_hr: 12,
    career_sb: 324,
    career_war: 47.7,
    career_obp: ".356",
    career_ops_plus: 106,
    peak_1912_avg: ".341",
    peak_1912_obp: ".431",
    ws_1914_avg: ".438",
    ws_career_avg: ".316",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // ═══════════════════════════════════════════════════════════════
  ilb_stats: {
    ovr: 7,      // All-Star tier — HOFer, 3× WS champ, MVP, but modest raw stats
    con: 4,      // .300 BA in 1908 (.300-.329 = 4), OPS+ 126 (≥130 would trigger bonus, just under)
    pow: 0,      // 0 HR in 1908. 12 career HR. Zero power. The ultimate slap hitter.
    spd: 2,      // 36 SB in 1908 (31-50 = 3), but no GG CF/SS bonus. Rated 2 — fast but 2B, not a burner
    def: 2,      // Pre-Gold Glove era: Tinker-to-Evers-to-Chance was the most famous DP combo ever. Led NL 2B in fielding %. Bill Klem called him the toughest man he ever umpired. Reputation = 2
    clu: 3,      // .316 career WS BA (.300+ = 2), 1914 WS .438 in a sweep + Merkle play = hero moment (+1) → 3
  },

  stat_justification: {
    con: ".300 BA in 1908 (.300-.329 = 4). Career .270 with 106 OPS+. Led NL in OBP in 1912 (.431) and batted .341 that year. Drew 108 walks in 1910. Elite plate discipline for his era — said he could have hit 30 points higher if he'd 'made a specialty of hitting' instead of working counts.",
    pow: "0 HR in 1908. 12 HR in entire 18-year career. Didn't hit his first HR until age 24 after 350+ games. At 125 lbs, he was the smallest position player in the NL. Zero power rating is automatic.",
    spd: "36 SB in 1908 (31-50 = 3). 49 SB in 1906, 46 in 1907. 324 career SB. Fast and crafty on the bases. Rated 2 rather than 3 because the GG CF/SS bonus doesn't apply to a 2B, and his speed was more about instinct than raw burner ability.",
    def: "Pre-Gold Glove era: the middle man of the most famous double-play combination in history (Tinker-to-Evers-to-Chance, immortalized in Franklin P. Adams' 1910 poem). Led NL 2B in fielding %. Acrobatic pivot man. Umpire Bill Klem: 'Johnny Evers was the toughest and meanest man I ever saw on a ball field.' Rating: 2.",
    clu: ".316 career WS batting average (.300+ = 2). In 1914 WS: .438 BA as Miracle Braves swept the heavily favored A's. The Merkle play (Sept 23, 1908) is one of baseball's most famous clutch moments — he noticed Merkle didn't touch second, called for the ball, and won the pennant. That's a WS hero moment (+1). Total: 3.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by obsessive intensity and rules mastery. The smartest player on the field at all times. As Braves captain in 1914, he ran teammates ragged in practice and took subpar effort as a personal insult. Rabbit Maranville: 'He'd make you want to punch him, but you knew Johnny was thinking only of the team.'",
    temperament: "A 'keen little umpire-fighting bundle of nerves.' His quote: 'My favorite umpire is a dead one.' Constantly ejected, fined, suspended. Bill Klem called him the toughest and meanest man he saw in 36 years of umpiring. High-strung to the point of self-destruction — suffered a full nervous breakdown in 1911.",
    work_ethic: "Maniacal. At 125 lbs, he spent off-days wolfing down candy bars to retain weight. Studied the rulebook obsessively — knew rules opponents didn't even know existed (the Merkle play). Co-authored 'Touching Second,' a book on inside baseball strategy.",
    lifestyle: "Spartan and tortured. Lost his entire savings in the Emerson Shoe Company collapse (1910). Witnessed his friend George Macdonald's death in a car accident (skull crushed by a trolley). His young daughter Helen died of scarlet fever in 1914, during the Miracle Braves run. His marriage to Helen Fitzgibbons essentially collapsed. Suffered a debilitating stroke in 1942.",
    era_adaptability: "HIGH. His value wasn't physical — it was intellectual. The brainiest player in baseball could adapt to any era. He'd be the analytics-obsessed utility man in modern baseball, the guy who knows every obscure rule and every tendency.",
    clubhouse_impact: "Extreme positive AND negative. His intensity won pennants (5 NL pennants, 3 WS titles). But teammates both revered and resented him. He fought with Tinker so bitterly they didn't speak for years despite playing beside each other. Traded by Cubs owner Murphy after being named manager — Murphy called his own decision a mistake.",
    dark_side: "The nervous breakdown of 1911 — out for most of the season after losing all his money. The death of his daughter during the 1914 season haunted him. His marriage disintegrated. He feuded with Tinker, with Murphy, with umpires, with everyone. He suffered a stroke in 1942 and was debilitated for his final 5 years. Died one year after his HOF induction, never fully recovered.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Rules Lawyer", desc: "Knows every rule. Once per game, can challenge a play using an obscure rule — 70% chance the call goes his way" },
    { tag: "The Crab", desc: "Perpetual scowl and aggression. +1 intimidation to opponents, but teammates lose 1 morale if his team is losing" },
    { tag: "Bundle of Nerves", desc: "Under sustained pressure, risk of breakdown. If team loses 5+ consecutive games, Evers misses 3 games" },
    { tag: "Inside Baseball", desc: "Co-authored the book on strategy. Team gains +1 to all situational plays (bunts, steals, hit-and-run)" },
    { tag: "Feud Engine", desc: "Automatically feuds with one random teammate per season. Both players lose 1 chemistry but gain 1 intensity" },
    { tag: "Miracle Worker", desc: "On a team in last place after midseason, Evers activates: all players gain +1 morale and +1 hustle" },
    { tag: "125-Pound Fury", desc: "Smallest player on the field. Opponents underestimate him — first hit each game has +20% chance of being a double" },
    { tag: "Troy Roots", desc: "New York State comfort. Extra chemistry in early-era squares near his hometown" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Practice Field", affinity: "HIGH", note: "Ran teammates ragged. Practice was war. Every drill was personal." },
    { location: "Library / Quiet Spot", affinity: "HIGH", note: "Studied the rulebook obsessively. Co-wrote 'Touching Second.' The thinker's retreat." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The pre-game argument was his domain. Strategy sessions that felt like interrogations." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Needed rest — at 125 lbs, fatigue was constant. But his mind never stopped racing." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Ate candy bars to gain weight. Not a gourmand — eating was fuel, not pleasure." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Too high-strung. Alcohol and nerves don't mix. Not a carouser." },
    { location: "Community Events", affinity: "LOW", note: "An 'insolent, snarling, aggressive grouch' per the NY press. Not a crowd-pleaser." },
    { location: "Media / Spotlight", affinity: "MEDIUM", note: "Could work the press when he wanted to. Wrote a book. But inherently combative." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Evers was at his absolute best in September (Merkle play, 1914 miracle run)",
      "Proving doubters wrong — undersized his whole life, every slight fueled him",
      "Rules exploitation — finding the edge nobody else sees",
      "New teams or new challenges (the Braves trade turned him into an MVP)",
    ],
    cold_triggers: [
      "Financial ruin (lost everything in the shoe company, triggered 1911 breakdown)",
      "Personal tragedy (daughter's death during the 1914 season nearly broke him)",
      "Feuding with management (Murphy firing, Britton-style owner conflicts)",
      "Physical exhaustion — at 125 lbs, his body failed him repeatedly (broken leg 1910, nervous breakdown 1911)",
    ],
    pressure_response: "TRANSCENDENT IN OCTOBER, FRAGILE IN LIFE. The paradox of Johnny Evers: .438 in the 1914 World Series sweep, .316 career WS BA, the Merkle play — he was one of the greatest postseason performers of the dead-ball era. But he suffered a nervous breakdown, lost a child, watched a friend die, lost his savings, and saw his marriage collapse. Evers thrived under baseball pressure because it was the one arena where his manic intensity was a virtue rather than a curse. The diamond was the only place the Crab made sense.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Merkle's Boner",
      type: "Game Action",
      text: "Your most cerebral player notices that a baserunner failed to touch a base. Call for the ball and tag the bag: the opponent's winning run is nullified. The game becomes a tie and must be replayed.",
      origin: "Sept 23, 1908: Evers noticed Fred Merkle of the Giants didn't touch second base on an apparent walk-off single. He got the ball, stepped on second, and the umpire called the runner out. The game was replayed, and the Cubs won the pennant.",
    },
    {
      title: "The Nervous Breakdown",
      type: "Drama",
      text: "Your highest-intensity player collapses from mental exhaustion. He's out for the rest of the season (or 10 games, whichever is less). When he returns, he gains +2 CON for 5 games — the comeback fire.",
      origin: "Evers suffered a nervous breakdown in 1911 after losing his life savings in the Emerson Shoe Company collapse and witnessing his friend's death in a trolley accident. He played only 46 games that year, then rebounded to bat .341 in 1912.",
    },
    {
      title: "The Miracle Run",
      type: "Action",
      text: "If your team is in last place past the midpoint of the season, activate this card. All players gain +1 to all stats for the remainder of the season. But if you fail to make the playoffs, team morale crashes to zero.",
      origin: "The 1914 'Miracle Braves' were in last place in July. With Evers as captain, they surged to the pennant and swept the heavily-favored A's in the World Series. Evers hit .438 in the Series and won NL MVP.",
    },
    {
      title: "Tinker to Evers to Chance",
      type: "Game Action",
      text: "Your SS, 2B, and 1B execute a flawless double play. The opposing team's momentum resets to zero. Your infield gains +1 DEF for the rest of the game.",
      origin: "The most famous double-play combination in baseball history, immortalized in Franklin P. Adams' 1910 poem 'Baseball's Sad Lexicon.' Tinker, Evers, and Chance were inducted into the HOF together in 1946.",
    },
    {
      title: "My Favorite Umpire Is a Dead One",
      type: "Drama",
      text: "Your player screams at the umpire after a bad call. 50% chance he's ejected. If he stays in: +2 intensity for the rest of the game. If ejected: team morale drops by 1, but opponent's confidence also drops by 1 (they know you're fearless).",
      origin: "Evers' actual quote about umpires. Bill Klem called him the toughest and meanest man he saw in 36 years of umpiring.",
    },
    {
      title: "Touching Second",
      type: "Action",
      text: "Your team captain writes the book on inside baseball. For the rest of the series, your team gains +1 to all situational plays: bunts, sacrifices, steals, hit-and-run, and defensive shifts.",
      origin: "Evers co-authored 'Touching Second' (1910) with sportswriter Hugh Fullerton — a strategic treatise that became a bestseller and defined 'inside baseball' as a concept.",
    },
    {
      title: "The Smallest Man on the Field",
      type: "Action",
      text: "Your undersized player is doubted by opponents and fans. He gains +1 SPD and +1 CON this game from sheer spite. If he gets 2+ hits, opponents lose 1 morale.",
      origin: "At 5'9\" and 125 lbs, Evers was the smallest position player in the NL. When he debuted in the minors at reportedly under 100 lbs, fans thought he was a comedy act.",
    },
    {
      title: "A Father's Grief",
      type: "Drama",
      text: "Your star player's child falls gravely ill during the season. He plays through it. -1 to all stats for 5 games. But if the team wins a playoff game during this stretch, he gains permanent +1 CLU.",
      origin: "During the 1914 Miracle Braves run, Evers' daughter Helen contracted scarlet fever from his quarantined son and died. He played through the grief and won the World Series and MVP.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Impossibly thin, wiry frame at 5'9\" 125 lbs — all sinew and nerve. Jutting jaw, permanently clenched. Sharp, darting Irish eyes under a small cap. Hollow cheeks. The face of a man who runs on fury and candy bars. One reporter called him an 'insolent, snarling, aggressive grouch.'",
    attire: "Chicago Cubs uniform circa 1908 — white wool jersey with 'CHICAGO' across the chest in dark block letters, baggy flannel pants, small flat cap, dark stockings. Glove in hand or mid-pivot on a double play. No number.",
    mood: "Wired intensity. The Statue of Liberty pose — arm raised, holding the ball aloft on second base as the crowd erupts. Or: the Crab crouch, jaw set, eyes scanning the field for any advantage, any missed rule, any edge.",
    style: "Sepia-toned with warm golden highlights. West Side Park grandstand in soft focus, pennant flags barely visible. Dead-ball era photographic grain. Unified ILB portrait style.",
    reference: "Think the Merkle play moment — Evers on second base, ball held high, the look of a man who just found the loophole that won a pennant. Cabinet card composition, wiry frame centered, intensity radiating off a small body.",
  },
};

// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ], note: "Pre-1957 players: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JohnnyEversCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = EVERS_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — {d.ilb_team} • {d.era}</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, wiry fury, Cubs jersey, arm raised on second base, Merkle play moment]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ textAlign: "center", marginTop: 8, padding: "4px 12px", background: `${C.coldBlue}15`, border: `1px solid ${C.coldBlue}40`, borderRadius: 4, fontSize: 10, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700, letterSpacing: 1 }}>
              🧠 "MERKLE'S BONER" — TINKER TO EVERS TO CHANCE — 1914 NL MVP
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1946", "🏆 3× WS Champ", "🏅 5× NL Pennant", "⭐ 1914 NL MVP", "📖 Wrote 'Touching Second'", "🧠 The Merkle Play"].map((a, i) => (
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
              {tab === "personality" && (<>{["leadership_style", "temperament", "work_ethic", "lifestyle", "era_adaptability", "clubhouse_impact"].map(k => (<Section key={k} title={k === "leadership_style" ? "Leadership" : k === "work_ethic" ? "Work Ethic" : k === "era_adaptability" ? "Era Adaptability" : k === "clubhouse_impact" ? "Clubhouse Impact" : k.charAt(0).toUpperCase() + k.slice(1)}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Evers' real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Evers' Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB • {d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
