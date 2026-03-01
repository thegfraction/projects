import { useState } from "react";

const GOSLIN_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: GOOSE GOSLIN
  // Year Snapshot: 1936 (Best Tigers Season / Only All-Star)
  // ═══════════════════════════════════════════════════════════════

  name: "Goose Goslin",
  nickname: "The Goose",
  year: 1936,
  team: "Detroit Tigers",
  league: "American League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "LF",
  bats: "L",
  throws: "R",
  height: "5'11\"",
  weight: "185 lbs",
  born: "October 16, 1900 — Salem, NJ",
  died: "May 15, 1971 — Bridgeton, NJ",
  hof: "Class of 1968 (Veterans Committee)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1936 PEAK TIGERS SEASON
  // Source: Baseball-Reference, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1936,
    games: 147,
    at_bats: 572,
    hits: 180,
    doubles: 34,
    triples: 7,
    home_runs: 24,
    rbi: 125,
    stolen_bases: 5,
    batting_avg: ".315",
    obp: ".403",
    slg: ".502",
    ops: ".905",
    ops_plus: 121,
    war: 4.5,
    career_avg: ".316",
    career_hits: 2735,
    career_hr: 248,
    career_rbi: 1609,
    career_war: 45.4,
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
    ovr: 9,      // Elite/MVP — .316 career BA, 2,735 hits, 248 HR, 1,609 RBI, HOF, 5× WS, walk-off to win 1935 WS, batting title '28, 45.4 WAR
    con: 4,      // .315 BA → tier 4 (.300-.329). OPS+ 121 → no bonus (<130). CON 4.
    pow: 3,      // 24 HR → tier 2 (20-29). SLG .502 → +1 bonus (≥.500). POW 3.
    spd: 0,      // 5 SB → tier 0 (0-5). No CF/SS GG. SPD 0.
    def: 0,      // No Gold Gloves. Named "Goose" for flapping arms chasing flies. Destroyed arm with shot put. DEF 0.
    clu: 2,      // .287 career WS BA → tier 1 (.250-.299). Walk-off single to win 1935 WS → +1 hero bonus. CLU 2.
  },

  stat_justification: {
    con: ".315 BA in 1936 → tier 4 (.300-.329). OPS+ 121 falls short of the 130 threshold for bonus. Career .316 BA across 18 seasons, 2,735 hits, 11 seasons at .300+, 1928 AL batting title (.379). Rating of 4.",
    pow: "24 HR in 1936 → tier 2 (20-29). SLG .502 → +1 bonus (≥.500). Total: 3. Career-high 37 HR in 1930. 248 career HR. 500 career 2B, 173 career 3B. Good gap power complementing the contact. Rating of 3.",
    spd: "5 SB in 1936 → tier 0 (0-5). No positional range bonus (LF, no Gold Glove). 173 career triples (22nd all-time) and 2× AL triples leader (1923, 1925) were from his youth — by age 35, the legs were gone. Rating of 0.",
    def: "No Gold Gloves. Named 'Goose' for the way he flapped his arms chasing fly balls. Destroyed his throwing arm throwing the shot put during spring training. Led AL in outfield assists 1924-25 before the shot put incident; after, opponents ran on him freely. Rating of 0.",
    clu: ".287 career WS BA → tier 1 (.250-.299). Walk-off single to win 1935 WS Game 6 (scored Cochrane, Detroit's first championship) → +1 hero bonus. Also: walk-off hit in 1934 WS Game 2, one of only 3 players to be last hitter of 2 separate World Series. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Joyful Clubhouse Clown. Goslin kept teams loose with constant pranking and clowning. Teammate Elden Auker: 'He was some character, a really great guy.' He tried to use a zebra-striped bat to distract pitchers. He tried to get himself ejected in a 1928 at-bat to preserve his batting title, and the umpire refused to throw him out. He recommended the Tigers trade for General Crowder, helping build their pennant-winning pitching staff. Not a captain or a strategist — a glue guy who made everyone enjoy being at the ballpark.",
    temperament: "Pure joy. 'It was just a game, that's all it was. They didn't have to pay me. I'd have paid them to let me play. Listen, the truth is it was more than fun. It was heaven.' Goslin played baseball for the love of it. He clowned in the outfield, flapping his arms. He destroyed his arm throwing the shot put because he was curious. He tried a zebra bat because it was funny. He was bitter exactly twice in his career: when Joe Cronin didn't appreciate his humor, and when the Tigers released him the day after he buried his father.",
    work_ethic: "Farm-boy strength. Goslin developed his power doing farm chores in Salem, New Jersey. Started as a pitcher in the Sally League (6-5, 2.44 ERA in 1920) before switching to outfield. Hit .390 in the minors in 1921. Then hit .324 in his first full MLB season. The work was already done before he got to the majors — 18 years of consistency followed.",
    lifestyle: "New Jersey farm boy, New Jersey boat rental businessman. Started playing for a DuPont factory team. Ended running a boat rental operation in Salem. Between: 18 years of major league baseball, 5 World Series, a batting title, a Hall of Fame plaque, and one catastrophic encounter with a shot put. Married. Retired to New Jersey. Died 1971 — three days after Heinie Manush, the man he beat for the 1928 batting crown.",
    era_adaptability: "MODERATE-LOW. The .316 career BA and gap power would still play, but the terrible defense (flapping arms, destroyed arm) would make him a DH in modern baseball. The 248 career HR in 18 seasons is underwhelming by modern standards. He'd be a productive DH type. The personality would be timeless.",
    clubhouse_impact: "ELITE MORALE. Goslin was traded three times — and every time, he made the new team better not just with his bat but with his energy. Washington won the WS in 1924 with Goslin. Detroit won in 1935 with Goslin. He recommended the Crowder trade. He kept players loose. Joe Cronin couldn't stand his clowning (which led to a trade); Mickey Cochrane loved it (which led to a championship). The lesson: some managers need a Goose. Some can't handle one.",
    dark_side: "The bitterness was real when it came. Goslin feuded with Cronin in Washington — clashed over management style, got shipped out. When the Tigers released him the day after his father's funeral: 'That seemed kind of harsh to me.' He was passed over for the HOF for decades, watching lesser players get inducted. When Manush was elected in 1965, Goslin was bitter. He waited 3 more years. And the body broke down at the end — burns from a couch fire, larynx removed, death at 70. The man who said baseball was heaven spent his last years in something closer to the opposite.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "It Was Heaven", desc: "+2 team morale permanently. Goslin plays for the love of the game. His joy is contagious and lifts every clubhouse he enters." },
    { tag: "The G-Men", desc: "When paired with Gehringer (2B) and Greenberg (1B): +1 to all offensive stats for all three. The Tigers' murderer's row that broke the Yankee dynasty." },
    { tag: "Walk-Off to Win the World Series", desc: "In WS elimination games (either team): +2 CLU. 1935 WS Game 6: bottom of the 9th, score tied, Goslin singles off Larry French, Cochrane scores, Detroit wins its first championship." },
    { tag: "The Goose", desc: "Goslin flaps his arms when chasing fly balls, like a goose trying to take flight. -1 DEF permanently. +2 entertainment. Terrible defense the crowd loves." },
    { tag: "Shot Put Arm", desc: "During spring training, Goslin wandered to a track team and tried the shot put. His throwing arm was never the same. Once per career: if player encounters non-baseball athletic activity, 15% chance of permanent arm injury." },
    { tag: "The Zebra Bat", desc: "Once per season: Goslin attempts unconventional equipment. 80% chance umpires reject it (+1 entertainment). 20% chance it works (+1 POW for 1 game, +3 entertainment)." },
    { tag: "The Batting Crown Ejection", desc: "1928: tried to get ejected to preserve his title. The umpire refused. When Goslin needs to NOT bat: umpires refuse to eject him. He must face the pitcher. 60% chance of a hit." },
    { tag: "Washington and Detroit's First", desc: "Part of both franchises' first WS wins (1924, 1935). When traded to a team that has never won a championship: +1 CLU, +1 team destiny." },
    { tag: "The Cronin Clash", desc: "If paired with a strict, humorless manager: -1 morale, trade likely within 1 season. If paired with a fun-loving manager (Cochrane, Harris): +1 all stats." },
    { tag: "Three Days Apart", desc: "Goslin and Manush died 3 days apart. Their careers were intertwined: traded for each other, competed for batting titles, elected to HOF by same committee. When both on roster: linked fate." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Griffith Stadium / Washington", affinity: "HIGH", note: "10 seasons. 1924 WS champion. 'Washington's answer to Babe Ruth.' Traded away twice, came back three times." },
    { location: "Navin Field / Detroit", affinity: "HIGH", note: "4 seasons. 1935 WS champion. The G-Men lineup. Walk-off to win it all." },
    { location: "Yankee Stadium (visiting)", affinity: "HIGH", note: "Record for most HR by visiting player at Yankee Stadium (32). He owned the House that Ruth Built." },
    { location: "World Series Stage", affinity: "HIGH", note: "5× WS. 2× champion. Walk-off to win 1935. Last hitter of 2 separate WS." },
    { location: "Sportsman's Park / St. Louis", affinity: "MEDIUM", note: "2.5 seasons with Browns. Career-high 37 HR in 1930 (split). Good numbers, forgettable team." },
    { location: "Clubhouse / Hotel", affinity: "MEDIUM", note: "The clowning happens here. Zebra bats. Pranks. Keeping teams loose." },
    { location: "Track & Field Facilities", affinity: "LOW", note: "Destroyed his arm throwing the shot put. Keep Goslin away from non-baseball sports equipment." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "World Series — 5 appearances, 2 championships, walk-off to win it all. Goslin elevates in October.",
      "Fun clubhouse environment — with Cochrane managing, Goslin thrived. Joy feeds production.",
      "Lineup protection — surrounded by Gehringer and Greenberg, Goslin saw better pitches and delivered.",
      "Batting title races — won the 1928 crown in the most dramatic fashion possible.",
    ],
    cold_triggers: [
      "Managerial conflict — Cronin's strict style killed Goslin's production (.297, 64 RBI in 1933).",
      "Arm injuries — the shot put destroyed his throwing arm permanently.",
      "Age decline — after 1936 (.315, 24 HR), Goslin fell to .238 in 1937 and .158 in 1938. The end was sudden.",
    ],
    pressure_response: "THE WALK-OFF KING. 1935 WS Game 6: bottom of the 9th, score tied 3-3, 2 outs. Mickey Cochrane on 2nd base. Larry French on the mound for the Cubs. Goslin lines a single into right field. Cochrane scores. Detroit wins its first World Series championship. Tiger fans nearly riot trying to reach their hero. One of only 3 players ever to be the last hitter of 2 separate World Series. .287 career WS BA, 7 WS HR across 5 Series. The man who said baseball was heaven created heaven for two franchises that had never tasted a championship before.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Walk-Off to Win the World Series",
      type: "Game Action",
      text: "Bottom of the ninth. Score tied. Two outs. Your catcher-manager is on second base. The Cubs pitcher deals. Your left fielder lines a single into right field. The catcher scores. Your franchise wins its first World Series championship. The crowd nearly riots.",
      origin: "1935 WS Game 6: Goslin singled off Larry French to score Cochrane. Detroit's first WS title.",
    },
    {
      title: "The Shot Put Incident",
      type: "Drama",
      text: "During spring training, your outfielder wanders to an adjacent field where a track team is practicing. He picks up a shot put. He throws it like a baseball. His arm feels sore the next morning. The soreness never goes away. His throwing arm is permanently diminished.",
      origin: "Goslin destroyed his throwing arm trying the shot put during spring training. He never regained arm strength.",
    },
    {
      title: "The Zebra-Striped Bat",
      type: "Action",
      text: "Your left fielder walks to the plate carrying a bat painted with zebra stripes. The idea: the stripes will distract the pitcher. The umpires examine the bat. They disallow it. Your player shrugs, grabs a normal bat, and gets a hit anyway.",
      origin: "1932: Goslin tried to use a zebra-striped bat. Umpires rejected it.",
    },
    {
      title: "The Batting Crown at Bat",
      type: "Game Action",
      text: "Final game of the season. Your left fielder leads the batting race by a fraction. If he makes an out, he loses the title. He tries to sit. Teammates call him yellow. He steps in. Takes two strikes. Tries to get ejected. The umpire refuses. He gets a hit. He wins the batting crown.",
      origin: "1928: Goslin won the AL batting title (.379) in his final AB. Tried to get ejected. Umpire Bill Guthrie refused.",
    },
    {
      title: "It Was Heaven",
      type: "Action",
      text: "A reporter asks your retired legend what baseball meant to him. His answer: 'It was just a game, that's all it was. They didn't have to pay me. I'd have paid them to let me play. Listen, the truth is it was more than fun. It was heaven.'",
      origin: "Goslin's famous quote from The Glory of Their Times (Lawrence Ritter, 1966).",
    },
    {
      title: "Traded for His Rival",
      type: "Drama",
      text: "Your franchise trades your left fielder to the Browns in exchange for the man he beat for the batting title two years ago. Their careers are now permanently intertwined. They will be traded for each other. They will compete for Hall of Fame votes. They will die three days apart.",
      origin: "1930: Senators traded Goslin for Manush (and Crowder). Manush died May 12, 1971; Goslin died May 15, 1971.",
    },
    {
      title: "DiMaggio and Hoag Collide",
      type: "Game Action",
      text: "Your left fielder drives a ball into the gap. The opposing center fielder and right fielder both sprint for it. They collide at full speed. Both are knocked unconscious for several minutes. Your player rounds the bases for one of the most unusual home runs in baseball history.",
      origin: "July 28, 1936: Goslin's HR caused Joe DiMaggio and Myril Hoag to collide. Both knocked unconscious.",
    },
    {
      title: "Released the Day After the Funeral",
      type: "Drama",
      text: "Your veteran outfielder has just buried his father. The next day, the team releases him. No warning. No conversation. 'That seemed kind of harsh to me.' The joy dims — for one of the few times in a joyful career.",
      origin: "Tigers released Goslin the day after he buried his father.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Big, broad-faced, left-handed hitter. 5'11\" 185 lbs — sturdy farm-boy build. The face should show good-natured mischief — a grin with something up his sleeve. Not handsome, not ugly. A friendly, slightly goofy face.",
    attire: "Detroit Tigers 1936 home whites — the Old English D. Navin Field behind him. Left-handed follow-through or in the outfield with arms slightly flailing as he tracks a fly ball.",
    mood: "Joy. Pure, uncut joy. This is the man who said baseball was heaven. The card should feel warm, golden, late-afternoon-at-the-ballpark. Not dramatic, not intense.",
    style: "Golden-hour warmth. Tigers navy and white. The card should feel like the last good day of a long summer — because that's what Goslin's 1936 was, the last great season before the decline.",
    reference: "The card of the Goose. The man who flapped his arms chasing fly balls. The man who destroyed his arm with a shot put. The man who tried a zebra bat. The man who hit the walk-off to give Detroit its first World Series. The man who said it was heaven.",
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

export default function GooseGoslinCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GOSLIN_DATA;
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
                [AI Portrait: Sturdy farm-boy build, left-handed follow-through, Tigers Old English D, Navin Field, golden-hour warmth, mischievous grin]
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
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {["🏆 2× WS Champion", "⭐ 1936 All-Star", "👑 1928 AL Batting Title", "🏛️ HOF 1968", "🏆 .316 Career BA", "📊 2,735 Career Hits", "🎯 1,609 Career RBI", "💎 Walk-Off 1935 WS"].map((a, i) => (
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
                      These events, derived from Goslin's real life, become universal cards playable in any game.
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
                  <Section title="Goslin's Derivation">
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
