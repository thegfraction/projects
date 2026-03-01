import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: TED WILLIAMS
  // Year Snapshot: 1941 (Peak Season — .406 BA, Last Player to Hit .400)
  // ═══════════════════════════════════════════════════════════════

  name: "Ted Williams",
  nickname: "The Splendid Splinter",
  year: 1941,
  team: "Boston Red Sox",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "LF",
  bats: "L",
  throws: "R",
  height: '6\'3"',
  weight: "205 lbs",
  born: "August 30, 1918 — San Diego, CA",
  died: "July 5, 2002 — Inverness, FL",
  hof: "Inducted 1966. 2× MVP, 2× Triple Crown, 6× batting title, 19× All-Star, .344 career BA, 521 HR, .482 career OBP (all-time record).",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1941 PEAK SEASON
  // Source: Baseball-Reference, SABR, MLB.com
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1941,
    games: 143,
    at_bats: 456,
    hits: 185,
    doubles: 33,
    triples: 3,
    home_runs: 37,
    rbi: 120,
    stolen_bases: 2,
    batting_avg: ".406",
    obp: ".553",
    slg: ".735",
    ops: "1.287",
    ops_plus: 235,
    war: 10.4,
    all_star: 19,
    career_avg: ".344",
    career_hits: 2654,
    career_hr: 521,
    career_sb: 24,
    career_war: 121.8,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .406 BA → tier 5 (.330+). OPS+ 235 ≥ 130 → +1, capped at 5.
  // POWER (POW) — 37 HR → tier 3 (30-39). SLG .735 ≥ .500 → +1 bonus = 4.
  // SPEED (SPD) — 2 SB → tier 0 (0-5). No CF/SS GG bonus (LF, below avg defense). SPD 0.
  // DEFENSE (DEF) — Williams was a below-average to poor fielder. Known for
  //   taking practice swings in the outfield. No Gold Gloves. DEF 0.
  // CLUTCH (CLU) — 1946 WS: .200 BA in only WS appearance (tier 0: <.250).
  //   1941 All-Star walk-off 3-run HR is a hero moment → +1 bonus = 1.
  // OVERALL (OVR) — CON 5×2=10 + POW 4×1.5=6 + SPD 0×1=0 + DEF 0×0.5=0 = 16 raw.
  //   2× MVP, 2× Triple Crown, .344 career BA, 521 HR, .482 OBP (all-time record).
  //   121.8 career WAR. Greatest hitter who ever lived by near-universal consensus.
  //   Inner-circle HOF — but zero defense and weak postseason. Legend tier but
  //   not Mythic due to DEF/CLU drag. Normalized to OVR 11 (Legend).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 11,     // Legend tier — greatest pure hitter ever, but DEF/CLU ceiling limits
    con: 5,      // .406 BA in 1941. .344 career. 235 OPS+. .553 OBP. Only 27 K. The science of hitting incarnate.
    pow: 4,      // 37 HR (tier 3) + SLG .735 bonus = 4. 521 career HR despite losing ~5 seasons to two wars.
    spd: 0,      // 2 SB in 1941, 24 career. Not a basestealer. LF — no CF/SS bonus.
    def: 0,      // Below-average defender. Took imaginary swings in LF. Led league in errors as rookie. No Gold Gloves.
    clu: 1,      // .200 in only WS (1946). 1941 ASG walk-off 3-run HR = hero moment bonus. Complicated October legacy.
  },

  stat_justification: {
    con: "The greatest contact season in modern baseball history: .406 BA, .553 OBP, 235 OPS+. Only 27 strikeouts in 606 plate appearances. Led all of baseball in BA, OBP, SLG, OPS, HR, runs, and walks. Career: .344 BA (highest in the live-ball era), .482 OBP (all-time MLB record). 20/10 eyesight — he could see the spin on a pitch that other hitters couldn't detect. Williams didn't just hit .406; under post-1954 sacrifice fly rules, he would have hit .413. Maximum contact, and it's not particularly close.",
    pow: "37 HR in 1941 — led both leagues. SLG .735, well above the .500 bonus threshold. Career: 521 HR despite losing nearly five full seasons to WWII and Korea. Bill James estimated Williams lost approximately 150 HR to military service, projecting him to roughly 670 career HR. POW 3 (HR tier) + 1 (SLG bonus) = 4. The combination of Williams' contact AND power is unmatched — he is the only player in this set with CON 5 and POW 4.",
    spd: "2 SB in 1941, 24 career. Williams was emphatically not a speed player. At 6'3\" 205 lbs, he was a large man for the era. Played left field — no CF/SS Gold Glove bonus available. SPD 0.",
    def: "Williams was a below-average to poor defensive outfielder throughout his career. As a rookie, he led the league in errors. He was known for taking imaginary swings while standing in the outfield during games. His defensive metrics are significantly negative (-8.8 DEF in 1941 per FanGraphs). He would never have been in Gold Glove contention. DEF 0.",
    clu: "The one blemish. Williams appeared in only one World Series — 1946, where he hit .200 with 5 hits and 1 RBI in 7 games as the Red Sox lost to the Cardinals. His postseason BA falls in tier 0 (<.250). However, his 1941 All-Star Game walk-off three-run home run — with two outs in the 9th inning, on a 2-1 count off Claude Passeau — is one of the most legendary clutch moments in All-Star history. That earns the hero moment bonus. CLU 0 (PS BA tier) + 1 (ASG hero moment) = 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Volcanic, confrontational, relentlessly demanding. Williams led by force of personality and obsession. He talked constantly about hitting — to teammates, to opponents, to anyone who would listen. He was the world's foremost authority on the science of hitting and he knew it. His leadership wasn't quiet or gravitational like DiMaggio's — it was loud, opinionated, and utterly impossible to ignore. He made teammates better by arguing with them about their swing until they capitulated.",
    temperament: "Explosive and thin-skinned with the press; generous and warm with teammates and fans who approached him with genuine baseball curiosity. Williams spat at Fenway fans, gave obscene gestures to reporters, and feuded publicly with the Boston media throughout his career. He vowed never to tip his cap to Red Sox fans after being booed in 1940 — and kept that vow for twenty years, even after his legendary final home run. But privately, he spent enormous time visiting sick children in hospitals and was the driving force behind the Jimmy Fund charity for decades.",
    work_ethic: "Singular. Williams' approach to hitting was scientific, obsessive, and decades ahead of its time. He wrote The Science of Hitting, the most influential batting treatise ever published. He studied pitcher tendencies, kept mental logs of every at-bat, and calculated the mathematical probability of getting a hit based on pitch location — dividing the strike zone into 77 cells. He practiced his swing constantly, including while standing in left field during games. 20/10 eyesight gave him a biological advantage, but the intellectual preparation is what made him the greatest.",
    lifestyle: "Fishing, flying, and feuding. Williams was an avid outdoorsman — one of the finest fly fishermen in the world. He served as a Marine fighter pilot in both WWII (1943-1945) and Korea (1952-1953), flying 39 combat missions in the latter, once crash-landing a burning F-9 Panther jet. His teammate John Glenn (the astronaut) described Williams as one of the best natural pilots he'd ever seen. Off the field, Williams was twice divorced and had complicated relationships with his children. His final years were mired in a bizarre cryonics controversy.",
    era_adaptability: "TRANSCENDENT. Williams' approach — disciplined pitch selection, mathematical zone theory, launch-angle awareness — is essentially the blueprint for modern analytics-driven hitting. His .482 career OBP would lead the majors in almost any season in any era. His power was genuine (521 HR). The only limitation is his defense, which was poor even by 1940s standards. In modern baseball, he'd be a pure DH — and the greatest DH imaginable.",
    clubhouse_impact: "POLARIZING-BRILLIANT. Williams divided every room he entered. Reporters hated him. Some teammates adored him (Bobby Doerr, Dom DiMaggio). Others found him exhausting. He talked about hitting incessantly — at meals, on buses, in the dugout, in the clubhouse. But the men who listened learned from the greatest hitting mind in baseball history. Williams elevated the hitters around him through sheer force of instruction and argument.",
    dark_side: "The rage. Williams' relationship with the Boston press and fans was genuinely toxic. He spat toward the stands multiple times. He made obscene gestures. He called reporters names in print. He refused to tip his cap for twenty consecutive years as an act of defiance against fans who had booed him. When he hit .200 in the 1946 World Series — the only postseason of his career — the city turned on him and he never forgave them. In ILB terms: Williams carries a 'Never Tip Your Cap' trait. In home games, if the crowd hostility exceeds a threshold, Williams' focus drops by 1 but his power increases by 1 — he hits angry. He also carries a 'Press War' trait: his fame modifier fluctuates wildly, and in any city with aggressive media coverage, there is a chance of a distraction event that costs the team 1 morale.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Science of Hitting", desc: "Williams' hitting IQ is unmatched. All teammates gain +1 CON when Williams is on the roster, as he obsessively coaches their swings." },
    { tag: "Never Tip Your Cap", desc: "Williams is defiant under pressure. When booed at home, his POW increases by 1 but team morale drops by 1. The anger fuels him." },
    { tag: ".406", desc: "The last .400 hitter. Williams cannot be held below .300 for any 30-game stretch. If his average drops below .300, he automatically enters a Hot streak." },
    { tag: "Teddy Ballgame", desc: "Williams connects with kids and underdogs. +2 chemistry with rookie players. Visits to children's hospitals generate +1 team morale per season." },
    { tag: "Fighter Pilot", desc: "Combat veteran of WWII and Korea. 39 combat missions in Korea. +3 chemistry with military veterans. Immune to fear-based events." },
    { tag: "Press War", desc: "Williams' feud with Boston media creates unpredictable fame swings. In cities with aggressive press, 30% chance of distraction event costing -1 team morale." },
    { tag: "The Splendid Eye", desc: "20/10 vision. Williams sees pitch spin that others cannot. +1 to plate discipline checks. Draws walks at an extraordinary rate." },
    { tag: "DiMaggio's Rival", desc: "Eternal competition with Joe DiMaggio. When both are on opposing rosters, each gains +1 to all offensive stats. The rivalry elevates both men." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Williams' temple. He practiced his swing everywhere — including in left field during games. The 77-cell strike zone lives here." },
    { location: "Fishing Stream / Outdoors", affinity: "HIGH", note: "One of the world's finest fly fishermen. The Florida Keys were his sanctuary. Member of the IGFA Fishing Hall of Fame." },
    { location: "Cockpit / Military", affinity: "HIGH", note: "Marine fighter pilot. Crash-landed a burning jet in Korea. John Glenn called him a natural pilot." },
    { location: "Fenway Park", affinity: "MEDIUM", note: "His stage, his prison. Loved the ballpark, hated the fans who booed him, loathed the press who covered him. Complicated." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Would talk hitting for hours with anyone who asked. Generous with instruction. Exhausting with opinions." },
    { location: "Media / Press Room", affinity: "NONE", note: "Lifetime war with Boston press. Dave Egan of the Boston Record was his nemesis. Williams refused interviews for years." },
    { location: "Formal Events / Ceremonies", affinity: "LOW", note: "Uncomfortable with ceremony. His HOF induction speech (1966) was gracious but his career was defined by refusing public gestures." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Hitting streaks — 22-game streak in May-June 1941; average climbed from .337 to .430",
      "Rivalry games — elevated play against DiMaggio's Yankees and the AL's best pitchers",
      "Righteous anger — when booed or disrespected, Williams channeled fury into production",
      "Season finales — played both games of the final-day doubleheader to protect .400, went 6-for-8",
    ],
    cold_triggers: [
      "Press attacks — sustained negative media coverage eroded focus, especially early in career",
      "Postseason pressure — only WS appearance (.200) suggests a different dynamic than regular season",
      "Defensive embarrassment — errors or misplays in the field carried over to the plate",
      "Injuries — broken ankle in spring 1941, fractured elbow in 1950 ASG, chronic ailments",
    ],
    pressure_response: "CONTRADICTORY. Williams is the most dominant regular-season hitter in baseball history, but his postseason record is a single series hitting .200. This creates the most fascinating pressure profile in the set. In ILB: Williams gains +2 to CON and POW in regular-season high-leverage situations. But in postseason/elimination games, there is a 30% chance his CLU drops by 1 as the October ghost emerges. The 1941 All-Star walk-off HR proves he CAN deliver in showcase moments — but the 1946 WS proves it's not guaranteed. He is the highest-ceiling, widest-variance clutch performer in the Allies set. When he's on, nobody in baseball history is better. When October's pressure finds his blind spot, even the greatest hitter alive looks human.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Point Four-Oh-Six",
      type: "Game Action",
      text: "Your hitter enters the final day of the season batting .400. He could sit out and protect the number. Instead, he plays both games of the doubleheader and goes 6-for-8. His batting average finishes at .406. No one will ever do this again. +5 fame permanently. The card becomes legendary.",
      origin: "On September 28, 1941, Williams entered the season finale at .39955 (rounds to .400). Manager Joe Cronin offered to bench him. Williams refused: 'If I'm going to be a .400 hitter, I want more than my toenails on the line.' He went 6-for-8 in the doubleheader against the Philadelphia A's, finishing at .406.",
    },
    {
      title: "The Walk-Off in Detroit",
      type: "Game Action",
      text: "All-Star Game, bottom of the ninth, two outs, two on, your team trailing by two. Your slugger steps in against the NL's best pitcher. On a 2-1 count, he launches a towering three-run home run off the right-field roof. He leaps around the bases. +3 CLU for the season. The most joyful moment of his career.",
      origin: "In the 1941 All-Star Game at Briggs Stadium, Williams hit a walk-off three-run homer off Claude Passeau with two outs in the 9th to win it 7-5. He famously ran the bases clapping his hands, the happiest anyone ever saw him on a baseball field. Cecil Travis's take-out slide at second had kept the rally alive.",
    },
    {
      title: "The Science of Hitting",
      type: "Action",
      text: "Your veteran hitter publishes a treatise on batting technique. For the rest of the season, all teammates gain +1 CON. Your hitter's fame increases by +2. Opposing pitchers must roll against your hitter's intellect before every at-bat — if they fail, they throw to his preferred zone.",
      origin: "Williams wrote The Science of Hitting (1970), dividing the strike zone into 77 cells and calculating his expected batting average for pitches in each location. It remains the most influential hitting manual ever published and anticipated modern analytics by decades.",
    },
    {
      title: "Never Tip Your Cap",
      type: "Drama",
      text: "After being booed by home fans, your star player makes a public vow: he will never acknowledge the crowd again. For the rest of his career, his home attendance modifier drops by -1 but his personal resolve increases. He gains +1 POW in all home games permanently. The vow cannot be broken.",
      origin: "After being booed at Fenway Park in 1940, Williams vowed never to tip his cap to Red Sox fans again. He kept this vow for twenty years — even after hitting a home run in his final at-bat on September 28, 1960. John Updike wrote: 'Gods do not answer letters.'",
    },
    {
      title: "Crash Landing in Korea",
      type: "Drama",
      text: "Your player is recalled to military service at age 33. He flies 39 combat missions as a fighter pilot. On one mission, his plane is hit by enemy fire and catches fire. He crash-lands the burning jet, walks away alive. Roll a d6: on 1-2, he returns with -1 POW permanently. On 3-6, he returns undiminished and gains +2 CLU (nothing on a baseball field can scare him now).",
      origin: "Williams was recalled by the Marines for the Korean War in 1952. On February 16, 1953, his F-9F Panther was hit by ground fire. With his plane on fire, landing gear damaged, and no radio, he crash-landed at K-13 airbase, skidding down the runway in flames. He walked away. His wingman was future astronaut John Glenn.",
    },
    {
      title: "The Kid Meets the Splinter",
      type: "Action",
      text: "A brash 20-year-old rookie arrives declaring he will be the greatest hitter who ever lived. Teammates are annoyed. The press mocks him. But within three seasons, he is hitting .406. Rookie arrogance card: +1 CON, +1 POW, -1 team chemistry for first season, then +2 team chemistry once he proves himself.",
      origin: "When Williams arrived in Red Sox camp in 1938, he told teammates: 'Wait till you see me hit.' He was so cocky that veterans Bobby Doerr and Jimmie Foxx initially found him insufferable. By 1941, at age 22, he was hitting .406. He had earned the right.",
    },
    {
      title: "The Jimmy Fund",
      type: "Drama",
      text: "Your star player secretly devotes enormous time and energy to a children's cancer charity. He visits hospitals, raises money, and makes it his life's mission beyond baseball. +2 team morale permanently. +3 legacy modifier. The visits are done quietly — no press allowed.",
      origin: "Williams was the driving force behind the Jimmy Fund, the charity of Boston's Dana-Farber Cancer Institute. He visited sick children for decades, almost always without publicity. He insisted: 'Don't tell the press about this.' His charitable work was arguably more impactful than his baseball career.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall, angular, intensely handsome at 22. 6'3\" 205 lbs — lean and coiled, all fast-twitch muscle. Sharp jawline, narrow eyes focused with predatory intensity on something only he can see (the pitch). Full lips, often set in a confident half-smile or a defiant grimace. The face shifts between boyish joy and adult fury depending on the moment.",
    attire: "Boston Red Sox home whites, 1941 vintage. Number 9. The iconic left-handed swing — the most beautiful swing in baseball history. Full extension, bat whipping through the zone, the follow-through so complete that the bat wraps around his back. Or: at the plate, waiting, eyes locked on the pitcher with absolute predatory focus.",
    mood: "Ferocious concentration. Where DiMaggio's card radiates serene control, Williams' card should crackle with intellectual intensity. He is thinking about hitting. He is always thinking about hitting. The energy is barely contained — like watching a physicist who also happens to be an athlete. This is the card that feels most alive.",
    style: "Sepia with warm red undertones — hotter and more aggressive than DiMaggio's golden tones. Fenway Park's left field wall (the Green Monster, rendered in sepia) faintly visible behind him. The afternoon sun should feel sharp and bright, not soft and diffuse. Williams' card should feel like noon in July, not golden hour.",
    reference: "The swing. Everything about this card should center on the swing. It is the most analyzed, photographed, and discussed swing in baseball history. The card should make the viewer want to pick up a bat. Williams would have wanted nothing more.",
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

export default function TedWilliamsCard() {
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
                [AI Portrait: Hot sepia, Red Sox whites, ferocious concentration, the swing]
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
              {["🔥 .406 BA — Last .400 Hitter", "👑 Led AL: BA/HR/R/BB/OBP/SLG", "⭐ 19× All-Star", "🏆 2× MVP, 2× Triple Crown", "✈️ WWII + Korea Combat Pilot", "📜 HOF 1966", "🎯 235 OPS+"].map((a, i) => (
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
                      These events, derived from Williams' real life, become universal cards playable in any game.
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
                  <Section title="Williams's Derivation">
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
