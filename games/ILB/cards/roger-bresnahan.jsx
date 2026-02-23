import { useState } from "react";

const BRESNAHAN_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: ROGER BRESNAHAN
  // Year Snapshot: 1903 (Peak Season — .350 BA as CF/Leadoff)
  // ═══════════════════════════════════════════════════════════════

  name: "Roger Bresnahan",
  nickname: "The Duke of Tralee",
  year: 1903,
  team: "New York Giants",
  era: "1900s",
  ilb_team: "Banners",
  position: "C",
  bats: "R",
  throws: "R",
  height: "5'9\"",
  weight: "200 lbs",
  born: "June 11, 1879 — Toledo, OH",
  died: "December 4, 1944 — Toledo, OH",
  hof: "Class of 1945 (Old Timers Committee) — First catcher inducted. Elected posthumously, one month after his death.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1903 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, FanGraphs
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1903,
    games: 113,
    at_bats: 406,
    hits: 142,
    doubles: 30,
    triples: 8,
    home_runs: 4,
    rbi: 55,
    runs: 87,
    stolen_bases: 34,
    batting_avg: ".350",
    obp: ".443",
    slg: ".493",
    ops: ".936",
    ops_plus: 160,
    war: 6.7,
    career_avg: ".279",
    career_hits: 1252,
    career_hr: 26,
    career_sb: 212,
    career_war: 42.9,
    career_rbi: 530,
    career_obp: ".386",
    career_ops_plus: 126,
    ws_batting_avg: ".313",
    positions_played: 9,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // ═══════════════════════════════════════════════════════════════
  ilb_stats: {
    ovr: 8,      // All-Star tier — HOFer, dominant catcher of his era, but modest counting stats
    con: 5,      // .350 BA in 1903 (.330+ = 5), OPS+ 160 (≥130 confirms cap at 5)
    pow: 1,      // 4 HR in 1903 (0-9 HR = 0), but SLG .493 (just under .500, no bonus) → 0. Bumped to 1 for dead-ball era context: 2 inside-the-park HR games, gap power
    spd: 2,      // 34 SB in 1903 (31-50 = 3), but catcher position — no CF/SS GG bonus. Rated 2 (catcher speed is exceptional at 34 SB but cap reflects position)
    def: 2,      // Pre-Gold Glove era: Christy Mathewson's preferred catcher, revolutionized the position with shin guards, considered greatest catcher of the dead-ball era. Reputation = 2
    clu: 3,      // .313 in 1905 WS (.300+ = 2), caught all 3 Mathewson shutouts = WS hero moment (+1) → 3
  },

  stat_justification: {
    con: ".350 BA in 1903 — five points behind Honus Wagner for the NL batting title. Career .279 with 126 OPS+ and .386 OBP across 17 seasons. Used as a leadoff hitter despite being a catcher — elite contact and plate discipline. Maximum rating.",
    pow: "Only 4 HR in 1903 (0-9 = 0), 26 career HR. SLG .493 (just under .500 bonus threshold). However, only player in history to hit two inside-the-park HRs in a game in BOTH leagues. Dead-ball era context and gap power warrant a bump to 1.",
    spd: "34 SB in 1903 (31-50 = 3 on the scale). 212 career SB — highest ever for a primary catcher. Fast enough to play CF and bat leadoff for McGraw's Giants. Rated 2 rather than 3 because the GG CF/SS bonus doesn't apply to a catcher, and peak SB rate declined once he moved behind the plate full-time.",
    def: "Pre-Gold Glove era (before 1957). Christy Mathewson called him the most important factor in the Giants' success. Caught all 5 games of the 1905 WS including 3 Mathewson shutouts. Invented catcher's shin guards (1907), batting helmet prototype, and padded mask. John McGraw and Branch Rickey both called him the finest catcher they ever saw. Rating: 2.",
    clu: ".313 BA in the 1905 World Series (.300+ = 2). Led all batters with .500 OBP in that Series. Caught every inning of the only all-shutout World Series in history — including Mathewson's legendary 3 shutouts. That is a World Series hero moment (+1). Total: 3.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Field general. Called games with surgical precision and managed pitching staffs by instinct and memory. McGraw trusted him absolutely to carry out game plans. Transitioned naturally to managing — ran the Cardinals and Cubs. Fined players liberally but took less money than any of his peers.",
    temperament: "Highly strung and almost abnormally emotional — in the words of one reporter. Pugnacious like his mentor McGraw. Tough on teammates who gave less than their best, tougher on opponents, toughest on umpires. Frequently ejected, fined, and suspended. Gave headaches to league officials and feuded publicly with at least three club owners.",
    work_ethic: "Relentless innovator. Didn't just play the position — he redesigned it. Invented shin guards, experimented with batting helmets, added padding to catcher's masks. Played through injuries that would have sidelined others. Caught 139 games in 1908 at age 29.",
    lifestyle: "Irish-American identity was central — faked his birthplace as Tralee, Ireland to enhance his 'Irishness' in an era when a quarter of players were of Irish descent. Shrewd businessman: purchased the Toledo Mud Hens, negotiated lucrative contracts, sued the Cardinals for back pay and won $20,000.",
    era_adaptability: "MAXIMUM. Started as a pitcher, played all 9 positions, became the greatest catcher of his era, then managed, then owned a team, then coached. Could adapt to literally any role in any era. The quintessential utility man before the term existed.",
    clubhouse_impact: "HIGH but polarizing. Players either respected his intensity or resented his fines and sharp tongue. McGraw adored him. Mathewson trusted him implicitly. Mrs. Britton fired him because she preferred Miller Huggins' 'gentlemanly manner' over Bresnahan's rougher personality.",
    dark_side: "Fabricated his Irish birthplace — a small but telling vanity. His managing career (328-432) was unsuccessful despite his baseball genius. Feuded with Cardinals owner Helene Britton so viciously that he was fired and had to sue to collect his salary. After baseball, his Mud Hens investment proved a poor one. He died at 65, just weeks before being elected to the Hall — never knowing he made it.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Innovator", desc: "Once per game, can introduce a new tactical wrinkle. +1 DEF for the whole team for one inning" },
    { tag: "McGraw's Twin", desc: "Extra chemistry with combative, strategist-type managers. Both feed off intensity" },
    { tag: "Battery Bond", desc: "Elite pitchers paired with Bresnahan gain +1 CTL. He remembers every hitter's weakness" },
    { tag: "Swiss Army Player", desc: "Can slot into any position in an emergency without OVR penalty — the ultimate utility man" },
    { tag: "Pugnacious Irishman", desc: "Umpire intimidation creates favorable calls — but ejection risk rises each game" },
    { tag: "The Duke's Bluff", desc: "Fabricated his own origin story. +1 charisma in social situations, but trust penalty if discovered" },
    { tag: "Owner's Nemesis", desc: "Feuds with management. If ownership makes a decision Bresnahan disagrees with, morale drops by 2" },
    { tag: "Iron Catcher", desc: "Plays through injuries. Reduced fatigue penalty behind the plate" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The pre-game meeting was his domain. Called every pitch from memory." },
    { location: "Practice Field", affinity: "HIGH", note: "Constantly tinkering with equipment, positioning, strategy. The inventor's workshop." },
    { location: "Bar / Nightlife", affinity: "MEDIUM", note: "Irish social culture. Enjoyed camaraderie but wasn't a wreck — too shrewd for that." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Stocky 200-lb frame needed fuel. Social eater, enjoyed team dinners." },
    { location: "Media / Spotlight", affinity: "MEDIUM", note: "Comfortable with press but could be 'inherently tactless.' Mixed results." },
    { location: "Business / Front Office", affinity: "HIGH", note: "Owned the Mud Hens, negotiated contracts aggressively, sued owners. A businessman-player." },
    { location: "Hotel / Rest", affinity: "LOW", note: "Too restless and competitive. Always scheming, tinkering, or arguing." },
    { location: "Church", affinity: "MEDIUM", note: "Catholic upbringing in Toledo. A priest read him last rites after his 1907 beaning." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Working with elite pitchers (the Mathewson effect — calling great games feeds his confidence)",
      "Playing multiple positions (versatility activates energy)",
      "Big-game situations (led the 1905 WS in batting — rises to the moment)",
      "Introducing innovations (new equipment, new tactics — the tinkerer's high)",
    ],
    cold_triggers: [
      "Ownership conflicts (the Britton feud destroyed his Cardinals tenure)",
      "Being underestimated or disrespected (triggers emotional spirals)",
      "Injury — specifically beanings (unconscious after the 1907 Coakley beaning, received last rites)",
      "Losing seasons as manager (328-432 record weighed on him)",
    ],
    pressure_response: "ELITE IN OCTOBER. Bresnahan's 1905 World Series is the defining case study: .313 BA, .500 OBP, caught every inning of the only all-shutout Series in history. He called Mathewson's three masterpieces and McGinnity's blanking. In the regular season, his pressure response was strong but complicated by his temper — his emotional volatility could fuel brilliance or cause ejection. The man who invented shin guards knew that protecting yourself was the first step to thriving under fire.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Innovator's Edge",
      type: "Action",
      text: "Your catcher introduces a new piece of equipment or technique. All catchers on your roster gain +1 DEF for the rest of the series. But opponents may protest — 20% chance the league reverses it.",
      origin: "Bresnahan introduced shin guards on Opening Day 1907. Fans threw snowballs, the game was forfeited, and Pirates manager Fred Clarke protested to the league. The protest was denied.",
    },
    {
      title: "Last Rites at Home Plate",
      type: "Drama",
      text: "Your catcher is hit in the head by a pitch. He's unconscious. Roll: 70% he recovers in 3 games. 20% he's out for the season. 10% career-ending. If he returns, he gains +1 DEF permanently (he invents a helmet).",
      origin: "Bresnahan was beaned by Andy Coakley on June 18, 1907. A priest administered last rites. He recovered and subsequently developed the first batting helmet.",
    },
    {
      title: "The Duke's Bluff",
      type: "Action",
      text: "Your player fabricates an impressive backstory. +2 charisma and fan engagement for 5 games. But if an opponent plays an 'Investigation' card, your player loses 3 morale.",
      origin: "Bresnahan claimed he was born in Tralee, Ireland — he was actually from Toledo, Ohio. The nickname 'Duke of Tralee' stuck for his entire career.",
    },
    {
      title: "Nine Positions, One Player",
      type: "Game Action",
      text: "Your most versatile player can fill any open position this game without penalty. If he plays a position he's never played before, roll: 60% success (+1 team morale), 40% he struggles (-1 OVR for the game).",
      origin: "Bresnahan played all 9 defensive positions at the major-league level — pitcher, catcher, all four infield spots, and all three outfield spots.",
    },
    {
      title: "Calling the Masterpiece",
      type: "Game Action",
      text: "Your catcher and ace pitcher have a Battery Bond. In a postseason game, the pitcher gains +2 CTL and +1 STF. If he throws a shutout, both players gain permanent +1 CLU.",
      origin: "Bresnahan caught all three of Christy Mathewson's shutouts in the 1905 World Series — widely considered the greatest pitching performance in Series history.",
    },
    {
      title: "Sue the Owner",
      type: "Drama",
      text: "Your player-manager is fired mid-contract by ownership. He sues. Roll: 50% he wins and collects full salary (team loses the money). 50% he loses and is blacklisted for 1 season.",
      origin: "After being fired by Cardinals owner Helene Britton in 1912, Bresnahan sued for the remainder of his 5-year, $10,000/year contract and settled for $20,000.",
    },
    {
      title: "Leadoff Catcher",
      type: "Action",
      text: "Move your catcher to the leadoff spot in the batting order. He gains +1 CON and +1 SPD for this game. Other catchers across the league are confused and demoralized.",
      origin: "Bresnahan was one of the first catchers ever used as a leadoff hitter, thanks to his .386 career OBP and 212 stolen bases.",
    },
    {
      title: "Snowballs on Opening Day",
      type: "Drama",
      text: "Your team introduces a controversial change. Fans riot and throw objects on the field. The game is forfeited. Your team loses this game but gains +1 innovation point for the season.",
      origin: "When Bresnahan debuted shin guards on Opening Day 1907, fans threw snowballs and umpire Bill Klem forfeited the game to the Phillies.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Stocky, compact build at 5'9\" 200 lbs. Round Irish face, broad jaw, clean-shaven or light stubble. Eyes sharp and calculating — the look of a man calling pitches. Barrel chest, thick forearms.",
    attire: "New York Giants uniform circa 1903 — dark wool jersey with 'NY' interlocking letters, high-waisted flannel pants, small pillbox cap. Shin guards visible below the knee if in catching gear. No number.",
    mood: "Calculating intensity. The half-crouch of a catcher who's about to call a breaking ball. Not rage like Dahlen — this is chess-player focus. The smirk of a man who knows something you don't.",
    style: "Sepia-toned with warm golden highlights. Polo Grounds grandstand in soft focus. Classic dead-ball era photography grain. Unified ILB portrait style.",
    reference: "Think 1905 World Series energy — the man behind Mathewson's three shutouts. A portrait that radiates intelligence and toughness in equal measure. Cabinet card composition, shoulders squared to camera.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE
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

const ChemTag = ({ tag }) => (
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

export default function RogerBresnahanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = BRESNAHAN_DATA;
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
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>
          Infinity League Baseball
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>
          Player Card Generator — {d.ilb_team} • {d.era}
        </div>
      </div>

      <div style={{
        width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8,
        border: `3px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`,
        overflow: "hidden",
      }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{
          width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer",
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
        }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
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
                [AI Portrait: Sepia-toned, calculating crouch, Giants jersey, shin guards visible, Polo Grounds]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

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

            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            <div style={{
              textAlign: "center", marginTop: 8, padding: "4px 12px",
              background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 4,
              fontSize: 10, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700, letterSpacing: 1,
            }}>
              🛡️ INVENTED CATCHER'S SHIN GUARDS • PLAYED ALL 9 POSITIONS
            </div>

            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {[
                "🏆 HOF 1945",
                "🏆 1× WS Champ",
                "🏅 2× NL Pennant",
                "🛡️ Shin Guard Pioneer",
                "📊 126 Career OPS+",
                "⚡ 212 Career SB",
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
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

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
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}
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
                      These events, derived from Bresnahan's real life, become universal cards playable in any game.
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
                      Reusable formula for converting real Baseball Reference stats into ILB card values.
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
                  <Section title="Bresnahan's Derivation">
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

        <div style={{
          background: C.darkBrown, padding: "6px 16px",
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
        }}>
          <span>ILB • {d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

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
  name: d.name, nickname: d.nickname, year: d.year, position: d.position,
  era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats,
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
