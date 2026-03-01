import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JOE DiMAGGIO
  // Year Snapshot: 1941 (Peak Season — 56-Game Hitting Streak, AL MVP)
  // ═══════════════════════════════════════════════════════════════

  name: "Joe DiMaggio",
  nickname: "The Yankee Clipper",
  year: 1941,
  team: "New York Yankees",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "CF",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "193 lbs",
  born: "November 25, 1914 — Martinez, CA",
  died: "March 8, 1999 — Hollywood, FL",
  hof: "Inducted 1955. 3× MVP, 13× All-Star, 9× WS champion, 2× batting title, .325 career BA, 361 HR, 79.1 WAR.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1941 PEAK SEASON
  // Source: Baseball-Reference, StatMuse, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1941,
    games: 139,
    at_bats: 541,
    hits: 193,
    doubles: 43,
    triples: 11,
    home_runs: 30,
    rbi: 125,
    stolen_bases: 4,
    batting_avg: ".357",
    obp: ".440",
    slg: ".643",
    ops: "1.083",
    ops_plus: 184,
    war: 8.6,
    all_star: 13,
    career_avg: ".325",
    career_hits: 2214,
    career_hr: 361,
    career_sb: 30,
    career_war: 79.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .357 BA → tier 5 (.330+). OPS+ 184 ≥ 130 → +1, capped at 5.
  // POWER (POW) — 30 HR → tier 3 (30-39). SLG .643 ≥ .500 → +1 bonus = 4.
  // SPEED (SPD) — 4 SB → tier 0 (0-5). Gold Glove CF equivalent? Pre-GG era but
  //   DiMaggio was the premier defensive CF of his era — elite range, legendary
  //   instincts. Equivalent to multiple GG at CF → +1 bonus = 1.
  // DEFENSE (DEF) — No formal Gold Gloves (pre-1957). However, DiMaggio is
  //   universally regarded as one of the greatest defensive CF ever. Made the game
  //   look effortless. 1 error in 141 games in 1947 (AL record). Equivalent to
  //   6+ GG → DEF 3.
  // CLUTCH (CLU) — Career postseason: .271 BA in 51 WS games (tier 1: .250-.299).
  //   9 World Series championships. Multiple WS hero moments. +1 bonus = 2.
  // OVERALL (OVR) — CON 5×2=10 + POW 4×1.5=6 + SPD 1×1=1 + DEF 3×0.5=1.5 = 18.5 raw.
  //   3× MVP, 13× All-Star, 9× WS champion, .325 career BA, 361 HR, 79.1 WAR.
  //   Inner-circle HOF, consensus top-10 all-time player → Legend/Mythic tier.
  //   Normalized to OVR 12 (Legend).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 12,     // Legend tier — inner-circle HOF, top-10 all-time, 9 WS rings
    con: 5,      // .357 in 1941, .325 career. Hit .408 during the 56-game streak. Only 13 K in 622 PA.
    pow: 4,      // 30 HR (tier 3) + SLG .643 bonus = 4. 361 career HR, would have hit 500+ without WWII.
    spd: 1,      // 4 SB (tier 0) + CF defensive range bonus = 1. Not a basestealer but elite range in CF.
    def: 3,      // Premier CF of his era. 1 error in 141 games (1947). Made everything look effortless. 6+ GG equivalent.
    clu: 2,      // .271 PS BA (tier 1) + 9 WS championships hero moments bonus = 2. Won when it mattered most.
  },

  stat_justification: {
    con: "Hit .357 in 1941 — third in the AL behind Williams (.406) and Travis (.359). During the 56-game hitting streak, he batted .408 with only 5 strikeouts in 223 at-bats. For the full 1941 season: only 13 strikeouts in 622 plate appearances. Career .325 BA with 155 OPS+. More HR than career K (361 HR vs 369 K) — the best ratio in baseball history. Maximum contact.",
    pow: "30 HR in 1941 (tier 3: 30-39 HR). SLG .643 — well above the .500 bonus threshold. 43 doubles, 11 triples, 348 total bases. Career: 361 HR despite losing three prime seasons to WWII and playing in a ballpark that robbed right-handed hitters. Bill James calculated DiMaggio lost more HR to Yankee Stadium than any player in history. POW 3 (HR tier) + 1 (SLG bonus) = 4.",
    spd: "Only 4 SB in 1941 and 30 career. DiMaggio was not a basestealer. However, he was the premier defensive center fielder of his era — extraordinary range, made difficult catches look routine. Pre-Gold Glove era, but his CF defense was the equivalent of multiple Gold Gloves. SPD 0 (SB tier) + 1 (CF/SS GG equivalent bonus) = 1.",
    def: "DiMaggio is universally regarded as one of the greatest defensive center fielders in baseball history. He made the game look so effortless that some fans mistakenly thought he was lazy — he was simply always in position. Set an AL record in 1947 with only 1 error in 141 games. Named to virtually every all-time defensive team. Equivalent to 6+ Gold Gloves. DEF 3.",
    clu: "Played in 10 World Series, winning 9 — the highest championship rate of any superstar in baseball history. Career postseason: .271 BA, 8 HR, 30 RBI in 51 games. His 56-game hitting streak directly lifted the Yankees from 4th place to a 17-game AL lead. Won the 1941 MVP over Ted Williams (.406) largely because voters felt DiMaggio's streak and leadership were more valuable. CLU 1 (PS BA tier) + 1 (WS hero bonus) = 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Aristocratic silence. DiMaggio led by pure standard — he never raised his voice, never argued with umpires, never showed emotion on the field. His presence alone elevated everyone around him. Teammates described feeling the obligation to play harder simply because DiMaggio was watching. He demanded to be introduced as 'the Greatest Living Ballplayer' at every event and once punched Billy Crystal in the stomach for failing to do so. His leadership was gravitational — you orbited him or you were nothing.",
    temperament: "Ice. DiMaggio's nickname 'Deadpan' was earned. He showed no emotion after home runs, no frustration after strikeouts (there were almost none), no joy after championships. The mask never slipped in public. Privately, he could be warm with close friends like Lefty Gomez, but the public DiMaggio was a monument — cool, perfect, untouchable. This was both his greatest asset and his deepest flaw.",
    work_ethic: "Obsessive perfectionism. DiMaggio famously explained why he played hard every game: 'There is always some kid who may be seeing me for the first time. I owe him my best.' He arrived early, prepared meticulously, and never appeared to try hard — because the preparation happened where no one could see. His physical gifts were extraordinary, but his relentless pursuit of looking effortless was the real work.",
    lifestyle: "Hollywood and heartbreak. DiMaggio married actress Dorothy Arnold in 1939 (divorced 1944), then famously married Marilyn Monroe in 1954 (divorced nine months later). After Monroe's death in 1962, he sent roses to her grave three times a week for twenty years. He never remarried. In later years, he was reclusive, guarded, and obsessed with his image. He demanded appearance fees, controlled how his name was used, and litigated aggressively against unauthorized merchandise.",
    era_adaptability: "ELITE. DiMaggio's combination of contact, power, speed (in his prime), and defense would make him a superstar in any era. His plate discipline — more HR than K across his entire career — is virtually impossible by modern standards. The only knock: his 30 career SB suggest he wouldn't be a stolen-base threat. But a .325/.398/.579 center fielder with Gold Glove defense plays in any decade.",
    clubhouse_impact: "DOMINANT-SILENT. DiMaggio didn't create chemistry — he demanded it by existing. His standard was perfection, and teammates either rose to meet it or withered. He was not warm, not encouraging, not nurturing. But he was the ultimate winner. Nine rings in thirteen seasons. You didn't need DiMaggio to like you. You needed him to respect you.",
    dark_side: "The control. DiMaggio was consumed by his own legend. He demanded to be called the Greatest Living Ballplayer — not because he was insecure, but because he believed it was factually correct and that anything less was disrespectful. He was jealous, possessive, and at times cruel — his marriage to Marilyn Monroe ended partly because he couldn't tolerate her fame exceeding his own. He hired private detectives to follow her. After her death, he blamed the Kennedys and Hollywood and refused to speak to anyone he suspected of involvement. He controlled his memorabilia market ruthlessly, suing unauthorized dealers and demanding cash payments for autographs. In ILB terms: DiMaggio carries a 'Greatest Living Ballplayer' trait. He requires maximum fame allocation on any team. If another player's fame modifier exceeds his, DiMaggio's morale drops and his CLU drops by 1. He is the sun — everything else is a satellite.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Greatest Living Ballplayer", desc: "Demands maximum fame allocation. If another teammate's fame exceeds his, DiMaggio's CLU drops by 1 and morale drops. He is the franchise." },
    { tag: "The Streak", desc: "56-game hitting streak — the most unbreakable record in baseball. DiMaggio cannot go Cold for more than 2 consecutive games. If he reaches game 3 of a cold streak, he automatically goes Hot." },
    { tag: "Deadpan", desc: "Shows no emotion. Immune to intimidation, taunting, and psychological warfare. Cannot be rattled — but also cannot inspire through emotion. Leadership is gravitational, not vocal." },
    { tag: "Yankee Gravity", desc: "DiMaggio's presence draws championships. +2 to team's postseason probability when he's on the roster. Teammates gain +1 CLU in October." },
    { tag: "Fisherman's Son", desc: "Born to Sicilian immigrant fisherman. +1 chemistry with Italian-American players and immigrant backgrounds. Comfortable in San Francisco and coastal environments." },
    { tag: "War Veteran", desc: "Served in Army Air Force 1943-1945. Lost three prime seasons. +2 chemistry with other WWII veterans. Resentful of lost time — carries a permanent 'What If' modifier." },
    { tag: "Monroe's Ghost", desc: "DiMaggio's romantic life creates permanent media attention. +3 fame modifier, but -1 focus during periods of personal turmoil. Twenty years of roses." },
    { tag: "The Clipper's Range", desc: "Elite defensive CF. Makes difficult catches look routine. -1 to opponent's extra-base hit probability when DiMaggio is in center field." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Yankee Stadium", affinity: "HIGH", note: "His cathedral. 9 WS rings here. Demands to be introduced as Greatest Living Ballplayer at Old-Timers Day." },
    { location: "Fine Restaurant / Nightclub", affinity: "HIGH", note: "DiMaggio loved Toots Shor's in Manhattan. Regular at the best restaurants. Demanded the best table." },
    { location: "San Francisco / Fisherman's Wharf", affinity: "HIGH", note: "Born in Martinez, raised in SF. The fisherman's son. Buried at Holy Cross Cemetery in Colma." },
    { location: "Hotel Suite / Private", affinity: "MEDIUM", note: "Valued privacy intensely. Reclusive in later years. Comfortable in solitude." },
    { location: "Spotlight / Media", affinity: "MEDIUM", note: "Tolerated media as necessary for fame but deeply guarded about personal life. Controlled his image ruthlessly." },
    { location: "Batting Cages / Practice", affinity: "MEDIUM", note: "Meticulous preparation, but never wanted to be seen working hard. The effort was invisible." },
    { location: "Hollywood / Celebrity Scene", affinity: "LOW", note: "Monroe's world, not his. Deeply uncomfortable with the chaos of celebrity culture beyond baseball." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Hitting streaks — 56-game streak in 1941 is the definitive hot trigger; earlier 61-game PCL streak in 1933 and 23-game streak in 1940",
      "World Series stage — 9 championships in 10 appearances; elevated in October",
      "Rivalry with Ted Williams — the competition drove both men to historic seasons",
      "National attention — DiMaggio played better when the spotlight was brightest",
    ],
    cold_triggers: [
      "Personal life turmoil — divorce from Dorothy Arnold (1944), Monroe marriage collapse (1954)",
      "Physical decline — chronic heel, knee, and shoulder injuries in later years (1948-1951)",
      "Loss of control — when events moved beyond his ability to manage, DiMaggio retreated",
      "Disrespect — any perceived slight to his status triggered withdrawal and bitterness",
    ],
    pressure_response: "TRANSCENDENT. DiMaggio is the most pressure-immune player in the set. During the 56-game hitting streak, with the entire nation watching, he batted .408 and struck out only 5 times. He won the AL MVP over Ted Williams' .406 season because voters believed DiMaggio's performance under pressure was more valuable. His career postseason slash isn't spectacular (.271), but his 9 championships in 10 WS appearances speak for themselves — he won when it mattered. In ILB: DiMaggio gains +1 to all stats in elimination games. He is the player you want when everything is on the line. The ice in his veins is not metaphorical.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The 56-Game Streak",
      type: "Game Action",
      text: "Your center fielder begins a hitting streak. For the next 56 games, he cannot go hitless. During the streak: +1 CON, +2 team morale, +1 attendance per game. If the streak ends, the player immediately starts a new 16-game streak. The most unbreakable record in the game.",
      origin: "From May 15 to July 16, 1941, DiMaggio hit safely in 56 consecutive games — .408 BA, 15 HR, 55 RBI, only 5 K during the streak. After it was broken by Ken Keltner's two great plays, DiMaggio immediately hit safely in the next 16 games, meaning he had hits in 72 of 73 games.",
    },
    {
      title: "Keltner's Stop",
      type: "Game Action",
      text: "An opponent's third baseman makes two incredible backhanded plays to rob your star hitter. The streak ends. Your player loses no stats but gains +1 fame. The nation mourns. The third baseman becomes a footnote — famous only for this moment.",
      origin: "On July 17, 1941, Cleveland third baseman Ken Keltner made two spectacular backhanded stops on hard-hit DiMaggio grounders, throwing him out both times. Al Smith and Jim Bagby Jr. combined to end the streak. DiMaggio went 0-for-3.",
    },
    {
      title: "More Homers Than Strikeouts",
      type: "Game Action",
      text: "Your hitter's plate discipline reaches a level that defies probability. For one full season, he hits more home runs than he strikes out. All pitchers face -1 to their K rating when pitching to this batter. The rarest feat in modern baseball.",
      origin: "DiMaggio accomplished this feat seven times in his career — more than any player in history. In 1941: 30 HR, 13 K. Career: 361 HR, 369 K (ratio of 1.02). No modern player has come close to replicating this.",
    },
    {
      title: "The Greatest Living Ballplayer",
      type: "Drama",
      text: "Your veteran demands to be introduced with a specific title at all public events. If the title is used: +1 team fame, +1 player morale. If it is NOT used: -2 player morale, -1 CLU for 3 games. The ego is not optional.",
      origin: "DiMaggio insisted on being introduced as 'the Greatest Living Ballplayer' at every event, including Old-Timers Day. He once punched Billy Crystal in the stomach for not using the title. The demand continued until his death in 1999.",
    },
    {
      title: "Roses for Marilyn",
      type: "Drama",
      text: "Your player's great love dies tragically. He sends flowers to her grave three times a week for twenty years. The devotion generates +3 fame permanently and +1 CLU (playing through grief). But: permanent -1 focus during anniversary weeks, and he refuses to speak to anyone he holds responsible.",
      origin: "After Marilyn Monroe's death on August 4, 1962, DiMaggio arranged for red roses to be delivered to her crypt at Westwood Village Memorial Park three times a week for twenty years. He never remarried and reportedly said on his own deathbed: 'I'll finally get to see Marilyn.'",
    },
    {
      title: "The Fisherman's Son at Yankee Stadium",
      type: "Action",
      text: "A rookie from an immigrant family arrives at the biggest stage in baseball. In his first month, he sets a record for most hits by a rookie. He goes Hot immediately and gains +2 fame. The American Dream in pinstripes.",
      origin: "DiMaggio was the son of Sicilian immigrant fisherman Giuseppe DiMaggio. In his first month with the Yankees (May 1936), he recorded 48 hits — the most by any rookie in their first month in MLB history. He hit .323 that year and the Yankees won the World Series.",
    },
    {
      title: "Three Lost Seasons",
      type: "Drama",
      text: "Your superstar is drafted into military service at age 28, at the absolute peak of his powers. He loses three full seasons. Roll a d6: on 1-2, he returns diminished (-1 CON, -1 POW permanently). On 3-5, he returns shaken but recovers within one season. On 6, he returns angry and motivated (+1 CLU for two seasons).",
      origin: "DiMaggio served in the Army Air Force from 1943-1945, losing his age-28, 29, and 30 seasons. Without the war, he projected to exceed 500 HR and 2,000 RBI. He returned in 1946 hitting only .290 — his first sub-.300 season — but recovered to win the 1947 MVP.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Chiseled Italian-American features. 6'2\" 193 lbs — tall, lean, elegant. Square jaw, deep-set dark eyes, perfectly composed expression. The face of a man who has never been caught off-guard in public. Not handsome in a flashy way — handsome in a way that makes you feel underdressed.",
    attire: "New York Yankees home pinstripes, 1941 vintage. Number 5. Classic batting stance — wide, balanced, the bat held high and still, poised like a coiled spring. Or: mid-stride in center field, the famous gliding run, cap perfectly placed, the most graceful athlete in American sports.",
    mood: "Serene dominance. DiMaggio's card should radiate quiet, absolute supremacy. No strain, no effort, no emotion — just the certainty that he is the best player on the field and he knows it and you know it and that is the end of the conversation. The Yankee Clipper cutting through the air.",
    style: "Rich sepia with deep golden highlights — warmer and more prestigious than the Vernon or Travis cards. Yankee Stadium's facade faintly visible in the background, bathed in afternoon light. This is not a forgotten card found in an attic — this is the card you always knew was there, the crown jewel of the collection.",
    reference: "Think the most iconic 1940s baseball photography — the wide stance, the fluid swing, the pinstripes catching the light. The card should feel like the center of gravity for the entire Allies set. Every other card orbits this one.",
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

export default function JoeDiMaggioCard() {
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
                [AI Portrait: Rich sepia, Yankee pinstripes, serene dominance, the crown jewel]
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
              {["🏆 AL MVP 1941", "🔥 56-Game Hit Streak", "🏅 9× WS Champion", "⭐ 13× All-Star", "👑 3× MVP", "📜 HOF 1955", "⚔️ WWII Service"].map((a, i) => (
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
                      These events, derived from DiMaggio's real life, become universal cards playable in any game.
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
                  <Section title="DiMaggio's Derivation">
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
