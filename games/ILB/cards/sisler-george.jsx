// /cards/players/george-sisler.jsx
import { useState } from "react";

const SISLER_DATA = {
  name: "George Sisler",
  nickname: "Gorgeous George",
  year: 1922,
  team: "St. Louis Browns",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '5\'11"',
  weight: "170 lbs",
  born: "March 24, 1893 — Manchester, OH",
  died: "March 26, 1973 — Richmond Heights, MO (age 80)",
  hof: "Inducted 1939 (BBWAA, 85.8% — higher than Walter Johnson). #33 on Sporting News 100 Greatest. Ty Cobb: 'The nearest thing to a perfect ballplayer.' Christy Mathewson: 'Every bit as valuable as Ruth.' His HOF plaque names him one of the two best fielding first basemen in history — the other being Hal Chase.",

  real_stats: {
    season: 1922,
    games: 142,
    at_bats: 586,
    hits: 246,
    doubles: 42,
    triples: 18,
    home_runs: 8,
    rbi: 105,
    stolen_bases: 51,
    batting_avg: ".420",
    obp: ".467",
    slg: ".594",
    ops: "1.061",
    runs_scored: 134,
    walks: 49,
    strikeouts: 14,
    war: 10.0,
    hit_streak: 41,
    career_avg: ".340",
    career_hits: 2812,
    career_hr: 102,
    career_sb: 375,
    career_rbi: 1175,
    career_war: "~50",
    pitching_record: "5-6, 2.35 ERA (beat Walter Johnson twice in CG duels)",
    hits_record: "257 hits in 1920 (MLB record, stood 84 years until Ichiro)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1922 SEASON (PEAK MVP)
  //
  // CON: .420 BA → tier 5+ (.330+). 246 H. 49 BB/14 K. 41-game streak. CON = 5 (MAXIMUM).
  // POW: 8 HR (1922). But .594 SLG, 42 2B, 18 3B, 399 TB in 1920. Gap power, not HR power. SLG ≥ .500 → +1. POW = 1.
  // SPD: 51 SB (1922) → tier 3+ (31-50). Led AL 4×. 18 triples. SPD = 3 (MAXIMUM).
  // DEF: Led AL assists 7×. 1,528 career assists (1B record). HOF plaque: "one of best two fielding 1B in history." DEF = 2.
  // CLU: Never played in a World Series. Browns missed by 1 game in 1922. CLU = 0.
  // OVR: CON×2(10) + POW×1.5(1.5) + SPD×1(3) + DEF×0.5(1) = 15.5 → normalized ~10
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Legend — The 1922 Sisler (.420, 246 H, 51 SB, 134 R, MVP, 41-game streak) is one of the greatest single-season performances in baseball history. Ty Cobb's "nearest thing to a perfect ballplayer."
    con: 5,      // MAXIMUM. .420 BA — 3rd highest post-1900. 246 hits. 41-game hitting streak. 49 BB/14 K. Career .340. Hit .407 in 1920 with 257 hits (84-year record). Six 200-hit seasons. Arguably the purest hitter who ever lived.
    pow: 1,      // 8 HR in 1922. But .594 SLG, 42 2B, 18 3B, 399 TB in 1920. This is Deadball/early live-ball gap power — tremendous extra-base production without HR volume. SLG bonus applies. POW = 1.
    spd: 3,      // MAXIMUM. 51 SB in 1922 — led AL. Led AL in SB 4 times. 375 career SB. 18 triples in 1922 (led AL). 145 career triples. One of the fastest first basemen in history. A base-stealing threat from first base, which is nearly unheard of.
    def: 2,      // Led AL in assists at 1B 7 times. Career 1,528 assists (1B record, still). HOF plaque: "one of best two fielding first basemen in history of game." The other named? Hal Chase. "Fast, adroit and graceful — a combination that gave elegance to his execution of plays."
    clu: 0,      // Never played in a World Series. The Browns missed the 1922 pennant by ONE GAME. Sisler's greatest individual season produced zero postseason. The cruelest CLU rating in ILB: the man who had everything except October.
  },

  stat_justification: {
    con: ".420 in 1922 — the 3rd-highest post-1900 BA. 246 hits. 41-game hitting streak (AL record until DiMaggio). 49 BB/14 K — a 3.5:1 BB/K ratio. In 1920: .407 with 257 hits (MLB record for 84 years). Career .340 — tied with Lou Gehrig for 15th all-time. Six seasons of 200+ hits. 60 career 4-hit games. He hit .442 in August and .448 in September of 1920. Branch Rickey: 'The smartest hitter who ever lived.' Swung a 42-ounce bat and choked up on the handle. Rating of 5 — MAXIMUM. Arguably the greatest pure contact hitter in baseball history.",
    pow: "8 HR in 1922. Career high 19 HR in 1920. 102 career HR. But .594 SLG in 1922, .632 SLG in 1920. 42 2B + 18 3B in 1922. 49 2B + 18 3B + 19 HR = 399 TB in 1920. Sisler's power was expressed through doubles, triples, and extra bases — not home runs. He wasn't trying to hit the ball over the fence; he was trying to hit it where they weren't. SLG bonus (+1) applies. Rating of 1.",
    spd: "51 SB in 1922 — led AL. Led AL in SB 4 times (1918, 1921, 1922, 1927). 375 career SB. 25+ SB every year from 1916-1922. 18 triples in 1922, 18 in 1921, 18 in 1920 — led AL all three years. 145 career triples. This is a first baseman stealing 51 bases and leading the league in triples. Unprecedented speed for the position. Rating of 3 — MAXIMUM.",
    def: "Led AL in assists at 1B 7 times. 1,528 career assists at 1B (all-time record). Led AL in DP 3 times. His HOF plaque states he was 'one of best two fielding first basemen in history of game' — alongside Hal Chase. Anticipated a squeeze bunt by Peckinpaugh, fielded it before the batter started running, brush-tagged the batter, and threw home for the double play on a squeeze. 'Fast, adroit and graceful.' Rating of 2.",
    clu: "George Sisler NEVER played in a World Series. The 1922 Browns missed the pennant by ONE GAME — the greatest individual season in baseball history produced zero postseason. Sisler hit .420, led the AL in hits/runs/SB/triples, won MVP, carried a 41-game streak... and went home in October. In 15 major league seasons, Sisler never once played a postseason game. Rating of 0 — the most painful zero in ILB.",
  },

  personality: {
    leadership_style: "Quiet perfectionist. Sisler was called 'Gorgeous George' and 'The Picture Player' because everything he did looked effortless and beautiful. He was the opposite of Cobb's ferocity or Ruth's bombast. He led by example — by being the best player on the field every single day without demanding attention. Branch Rickey: 'The smartest hitter who ever lived. He never stopped thinking.'",
    temperament: "Gentleman intellectual. Sisler had a mechanical engineering degree from Michigan — a rarity for ballplayers then or now. He was polite, reserved, and cerebral. He thought about hitting the way an engineer thinks about tolerances. He said: 'A crack shot can hit a bird on the wing because the eye and his finger on the trigger act together. The good batter is like the good marksman.' W.C. Fields' favorite baseball player. Christy Mathewson noted he was 'much humbler than his New York counterpart [Ruth].'",
    work_ethic: "Total devotion. Sisler played every inning of every game in 1920. He swung a 42-ounce bat — massive for a 170-lb man — and choked up on the handle for control. He claimed his pitching background made him a better hitter: 'I used to stand on the mound, study the batter and wonder how I could fool him. Now at the plate, I can place myself in the pitcher's position.' He didn't just hit; he reverse-engineered hitting.",
    lifestyle: "Modest Midwesterner. Born in Manchester, Ohio — coal country, where his father supervised a mine. Chose Michigan over Penn and Western Reserve for the engineering program. Married Kathleen Holznagel in 1916 — they had four children. Sons Dick and Dave both played in the majors. Dick's 10th-inning HR won the 1950 pennant for the Phillies. George settled permanently in St. Louis and never left. Worked as a scout for the Dodgers under Branch Rickey. Statue outside Busch Stadium.",
    era_adaptability: "EXTRAORDINARY. Sisler's .340 career average, elite speed (375 SB), and Gold Glove-caliber defense translate to any era. In modern baseball, he'd be Mike Trout playing first base — the complete player who does everything at an elite level. His only weakness (low HR total) is a product of era and approach, not ability. His .594 SLG in 1922 suggests enormous power potential with a modern approach. He'd be a perennial MVP candidate in any decade.",
    clubhouse_impact: "ELEVATING. Sisler was not a rah-rah leader — he was the player who made everyone around him better by raising the standard. Teammates didn't want to embarrass themselves in front of Gorgeous George. In ILB: +1 team OVR when Sisler is in the lineup. His presence makes the entire roster play up to his level.",
    dark_side: "The eyes. In the fall of 1922, after hitting .420, Sisler developed a sinus infection that spread to his optic nerves. He began seeing double. He missed the entire 1923 season — the year he should have been at his absolute peak. Doctors said he'd never play again. He came back in 1924 and hit .305 — nearly 100 points below his pre-injury average. He told an interviewer: 'The doctors all said I'd never play again, but when you're fighting for something that actually keeps you alive — well, the human will is all you need.' He later insisted his 'real career' ended in 1923. In ILB: Sisler carries 'The Double Vision' — after his peak seasons, there is a 15% chance per season of a permanent stat reduction. The greatest 'what if' in baseball history.",
  },

  chemistry_traits: [
    { tag: "The Perfect Ballplayer", desc: "Ty Cobb: 'The nearest thing to a perfect ballplayer.' Sisler provides +1 to every stat category for the team when he plays. His perfection is contagious." },
    { tag: "Forty-Two Ounces", desc: "Sisler swung a 42-ounce bat — massive for a 170-lb man. His bat control was superhuman. +2 CON in any situation requiring precise contact. Bunting, hit-and-run, advancing runners: automatic." },
    { tag: "The Double Vision", desc: "After 1922, sinusitis destroys Sisler's vision. 15% chance per season of permanent -1 CON. If triggered twice: permanent -2 CON. The greatest career derailed by the cruelest injury. The sword of Damocles." },
    { tag: "Pitcher's Mind", desc: "Sisler was a pitcher first (5-6, 2.35 ERA, beat Walter Johnson twice). He thinks like a pitcher while hitting. +1 strategic advantage against all pitchers — he knows what they're thinking." },
    { tag: "257", desc: "257 hits in 1920 — MLB record for 84 years. In any season where Sisler exceeds 200 hits, he enters a 'record zone' where CON becomes effectively infinite. The ball goes where he wants it." },
    { tag: "One Game Short", desc: "The 1922 Browns missed the pennant by ONE GAME. Sisler carried the team to within sight of October and fell short. In ILB, if the team is within 1 game of the postseason in September, Sisler gains +2 to all stats. He will NOT miss it again." },
    { tag: "The Engineer", desc: "Mechanical engineering degree from Michigan. Sisler reverse-engineered hitting. +1 analytical advantage: he identifies pitcher patterns faster than any other batter. By the 3rd at-bat, he knows every pitch." },
    { tag: "Ruth's Shadow", desc: "Sisler hit .407 in 1920. Ruth hit 54 HR. Guess which one the newspapers covered. Sisler's records were 'pushed to the side and left unappreciated.' In ILB, Sisler's value is invisible to casual observers. His OVR of 10 appears as 8 to opponents." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "MAXIMUM", note: "His entire prime. The greatest Brown of all time. Statue outside Busch Stadium." },
    { location: "First Base", affinity: "MAXIMUM", note: "1,528 career assists (record). 'One of best two fielding 1B in history.' The position he was born for." },
    { location: "Batter's Box", affinity: "MAXIMUM", note: ".420 in 1922. .407 in 1920. 257 hits. 41-game streak. Six 200-hit seasons. The batter's box was his cathedral." },
    { location: "University of Michigan", affinity: "HIGH", note: "Engineering degree. Branch Rickey was his college coach. The foundation of everything." },
    { location: "Basepaths", affinity: "HIGH", note: "51 SB in 1922. Led AL 4 times. 375 career. 145 triples. The fastest first baseman ever." },
    { location: "World Series", affinity: "NONE", note: "Never played one. 15 seasons. Zero postseason games. The absence that defines him." },
  ],

  momentum: {
    hot_triggers: [
      "August and September — Sisler hit .442 in August and .448 in September of 1920. He was a closer: he finished seasons stronger than he started them.",
      "Hitting streaks — 41 games in 1922, 34 in 1925, 26 in 1917. Once Sisler started hitting, he couldn't stop.",
      "Facing elite pitchers — beat Walter Johnson twice in CG duels as a pitcher. His engineering mind rose to challenges.",
      "Pennant races — the 1922 race brought out his absolute best: .420, 51 SB, MVP. Pressure focused him.",
    ],
    cold_triggers: [
      "Double vision — after 1923, Sisler's declining eyesight reduced him from mythic to merely great. The loss was permanent.",
      "Managing — his 3 years managing the Browns (249-363 equivalent) were a burden that distracted from playing.",
      "Loneliness of excellence — Sisler was often the only great player on a mediocre team. The Browns couldn't support him.",
      "Ruth's shadow — no matter what Sisler did, Ruth's home runs drew the headlines. Being overshadowed drained recognition.",
    ],
    pressure_response: "PERFECT MACHINE — UNTIL IT BREAKS. Before the eye injury, Sisler was arguably the most complete offensive machine in baseball history. He hit .399 over 1920-1922 combined, with 719 hits in three seasons. He stole 134 bases. He scored 362 runs. He played every inning. But he never reached the World Series — the Browns were too mediocre around him. And then the sinusitis took his eyes. In ILB, Sisler is the highest-ceiling, highest-risk card in the game. At his peak, he's arguably the best position player card in ILB. But the Double Vision trait can destroy him mid-career. The question isn't whether to play him — it's whether you can bear watching him decline.",
  },

  action_card_seeds: [
    {
      title: "Two-Fifty-Seven",
      type: "Game Action",
      text: "Your first baseman plays every inning of every game. By August he's hitting .442. In September, .448. When the season ends, he has 257 hits — the most in a single season in baseball history. This record will stand for eighty-four years. In the same season, another man hits 54 home runs. Guess which record the newspapers celebrate.",
      origin: "Sisler's 1920 season: .407 BA, 257 H (MLB record until Ichiro's 262 in 2004), 399 TB. Overshadowed by Babe Ruth's 54 HR that same year.",
    },
    {
      title: "Four-Twenty",
      type: "Game Action",
      text: "Your first baseman hits .420 — the third-highest batting average of the century. He leads the league in hits, runs, stolen bases, and triples. He carries a 41-game hitting streak. He wins the MVP — the first one ever awarded. His team misses the pennant by one game. He goes home in October.",
      origin: "Sisler's 1922 season: .420, 246 H, 134 R, 51 SB, 18 3B, MVP, 41-game streak. Browns finished 1 game behind the Yankees.",
    },
    {
      title: "The Double Vision",
      type: "Drama",
      text: "After the greatest three-year stretch in baseball history — .407, .371, .420 — your first baseman develops a sinus infection. It spreads to his optic nerves. He begins seeing two baseballs. Doctors say he'll never play again. He insists: 'When you're fighting for something that actually keeps you alive — well, the human will is all you need.' He comes back. He's never the same.",
      origin: "Sinusitis in late 1922 caused double vision and destroyed Sisler's peak. He missed all of 1923. Returned in 1924 hitting .305 — nearly 100 points below his pre-injury average.",
    },
    {
      title: "The Day He Beat His Idol",
      type: "Game Action",
      text: "Your 23-year-old first baseman — who used to be a pitcher — faces his childhood idol on the mound. Walter Johnson, the hardest thrower alive. Your man goes the distance. He wins 1-0. A shutout against the Big Train. He will beat Johnson twice in complete-game duels. Then he'll put down his glove and pick up his bat and never pitch again.",
      origin: "September 17, 1916: Sisler shut out Walter Johnson 1-0 in a CG. He beat Johnson twice in CG matchups. Career pitching: 5-6, 2.35 ERA.",
    },
    {
      title: "One Game Short",
      type: "Drama",
      text: "Your team enters September trailing by a game and a half. Your first baseman is hitting .420. He has 51 stolen bases. He's been hitting safely for 41 consecutive games. He injures his arm stretching for a wide throw. He comes back five days later. The streak ends at 41. The season ends one game short. He never reaches the World Series.",
      origin: "The 1922 Browns missed the pennant by 1 game. Sisler injured his arm on September 11, disrupting his 41-game streak and the pennant race.",
    },
    {
      title: "The Squeeze Play",
      type: "Game Action",
      text: "The runner breaks from third on the pitch. The batter squares to bunt. Your first baseman — who used to be a pitcher, who thinks like an engineer — has already started running. He fields the bunt fifteen feet from the plate before the batter finishes his stride. Brush-tag. Throw home. Double play on a squeeze bunt. Nobody has ever seen this before.",
      origin: "Sisler anticipated a Peckinpaugh squeeze bunt, fielded it before the batter started running, tagged him, and threw home to complete the double play.",
    },
    {
      title: "The Pitcher's Secret",
      type: "Action",
      text: "Your first baseman was once a pitcher. A good one — he beat Walter Johnson twice. Now at the plate, he uses that knowledge in reverse: 'I used to wonder how I could fool the batter. Now I place myself in the pitcher's position and figure what is passing through his mind.' It is the most elegant description of hitting ever spoken.",
      origin: "Sisler's quote from his HOF plaque: 'I used to stand on the mound myself, study the batter and wonder how I could fool him. Now when I am at the plate, I can the more easily place myself in the pitcher's position.'",
    },
    {
      title: "The Sons",
      type: "Drama",
      text: "Your first baseman raises two sons who both reach the major leagues. One of them — a first baseman like his father — hits a home run in the 10th inning on the last day of the 1950 season to win the pennant for the Phillies. The father never played a single postseason game. The son delivers the pennant-clinching hit. The inheritance is completed.",
      origin: "Dick Sisler's walk-off HR on the final day of 1950 clinched the pennant for the Phillies. George Sisler never played in a postseason game in 15 MLB seasons.",
    },
  ],

  art_direction: {
    face: "5'11\" 170 lbs — lean, athletic, graceful. Handsome clean-shaven face with calm intelligent eyes. The look of a mechanical engineer who happens to swing a 42-ounce bat. Not rugged — refined. 'Gorgeous George' earned his nickname. There should be something almost too beautiful about him, a perfection that feels temporary.",
    attire: "St. Louis Browns 1922 home whites — the MVP year. Mid-swing with the massive 42-ounce bat, choking up slightly, the left-handed swing that produced .420. Or: streaking down the first-base line, 51 stolen bases worth of speed frozen in motion. The uniform should look pristine — Sisler was the Picture Player, and everything about him was aesthetically perfect.",
    mood: "Luminous perfection with an undercurrent of fragility. This card should glow — it should be the brightest, most beautiful card in any set it enters. Sisler was the perfect ballplayer, and the card should convey that perfection. But there should also be something ephemeral about it — a sense that this brilliance cannot last, that the light is about to flicker. The viewer should feel both awe and preemptive grief.",
    style: "Full color — the Bashers are the 1920s, the Live Ball Era, and Sisler is the first card of the new age. Where the Muggers were sepia, the Bashers are golden and vivid. Warm amber light, St. Louis summer, the glow of Sportsman's Park. But Sisler's card should have a subtle softness at the edges — a very slight blur, as if the image is about to double. The Double Vision, foreshadowed in the art itself.",
    reference: "The Muggers had metaphors of fire and earth. The Bashers begin with light itself. If the Muggers set ends with a lantern (Smith) and a bell (Bancroft), the Bashers set begins with Sisler as the sun — brilliant, life-giving, and impossible to look at directly. He is the player every other Basher will be measured against. The card should feel like the opening chord of a symphony: perfect, resonant, and containing within it the seeds of everything that follows.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No postseason", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", sunGold: "#d4a017" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.sunGold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.sunGold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function GeorgeSislerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = SISLER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.sunGold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.sunGold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${C.sunGold}30, inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: `linear-gradient(90deg, ${C.darkBrown}, #4a3520, ${C.darkBrown})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.sunGold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.sunGold}80`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.sunGold}20, #d4a01710, ${C.sunGold}15)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>☀️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.sunGold}ee`, color: C.darkBrown, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.sunGold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.darkBrown}, #4a3520)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "H", val: d.real_stats.hits },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "R", val: d.real_stats.runs_scored },{ label: "STRK", val: d.real_stats.hit_streak }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.sunGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} ST. LOUIS BROWNS — AL MVP — .420 BA — 41-GAME STREAK</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sunGold}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "WAR '22", val: d.real_stats.war },{ label: "200-H SZN", val: "6" },{ label: "WS", val: "NONE" },{ label: "HOF", val: "1939" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.sunGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 15 SEASONS • 2,812 HITS • .340 AVG • ZERO WORLD SERIES GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1939 (85.8%)", "🏆 1922 AL MVP", "📊 257 H Record (84 yrs)", "🔥 41-Game Streak", "👟 51 SB (led AL)", "⚾ Also a Pitcher (2.35 ERA)", "🎓 Michigan Engineering", "👁️ Double Vision (1923)"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.sunGold}20`, border: `1px solid ${C.sunGold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.sunGold : C.medBrown, border: `1px solid ${tab === t.id ? C.sunGold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.sunGold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "MAXIMUM" ? C.sunGold : l.affinity === "HIGH" ? C.traitGreen : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Sisler's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sunGold}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.sunGold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Sisler's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.darkBrown}, #4a3520, ${C.darkBrown})`, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sunGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.sunGold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sunGold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
