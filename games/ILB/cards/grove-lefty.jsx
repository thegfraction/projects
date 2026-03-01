import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: LEFTY GROVE
  // Year Snapshot: 1931 (31-4, 2.06 ERA, MVP, Triple Crown)
  // ═══════════════════════════════════════════════════════════════

  name: "Lefty Grove",
  nickname: "Mose",
  year: 1931,
  team: "Philadelphia Athletics",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "L",
  throws: "L",
  height: '6\'3"',
  weight: "190 lbs",
  born: "March 6, 1900 — Lonaconing, MD (coal-mining town in the Appalachian hills)",
  died: "May 22, 1975 — Norwalk, OH (age 75, heart attack while watching a baseball game on TV)",
  hof: "Class of 1947 (BBWAA, 76.4%). MLB All-Century Team (1999). Voted greatest LHP of AL history.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1931 PEAK SEASON
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1931,
    games: 41,
    wins: 31,
    losses: 4,
    era: "2.06",
    innings: "288.2",
    strikeouts: 175,
    walks: 62,
    complete_games: 27,
    shutouts: 4,
    whip: "1.08",
    war: 12.1,
    career_wins: 300,
    career_losses: 141,
    career_era: "3.06",
    career_strikeouts: 2266,
    career_cg: 298,
    career_shutouts: 35,
    career_war: 109.8,
    no_hitters: 0,
    perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF): ERA 2.06 → tier 4 (1.50-1.99). K/9 = 5.46 — below 6.0, no K bonus. STF 4.
  //   NOTE: Grove led AL in K all 7 of his first seasons. In 1930: K/9 was 6.47.
  //   But in 1931 specifically, 175K/288.2IP = 5.46. No bonus. STF 4.
  // CONTROL (CTL): BB/9 = 1.93 → tier 3 (1.5-1.99). WHIP 1.08 — no WHIP bonus. CTL 3.
  //   NOTE: Early career was wild (131 BB in 1925). Improved dramatically.
  // STAMINA (STA): 288.2 IP → tier 3 (250-299). 27 CG in 30 starts. STA 3.
  // DEFENSE (DEF): .954 career fielding %. No special reputation. DEF 0.
  // CLUTCH (CLU): WS ERA 1.75 in 3 WS (1929-31). 4-2, 36K in 51.1 IP, 2 saves.
  //   ERA < 2.00 → tier 2 + WS clincher moments → +1. CLU 3.
  // OVERALL: STF(4)×2 + CTL(3)×1.5 + STA(3)×1 + DEF(0)×0.5 = 8+4.5+3+0 = 15.5 → 12 (Legend)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 12,     // Legend — arguably the greatest LHP in baseball history. .680 W%, 9× ERA champion, 300 wins.
    stf: 4,      // 2.06 ERA → tier 4. K/9 5.46 in 1931 (no K bonus). But ERA was 2.32 runs BELOW league average. The most dominant pitching season of the era. His fastball was unhittable — Doc Cramer: 'Everybody knew what they were going to hit at, but they still couldn't hit him.'
    ctl: 3,      // BB/9 1.93 in 1931 → tier 3. WHIP 1.08 — no bonus. Grove improved his control dramatically over his career. Wild early (131 BB in 1925), refined later. Rating of 3.
    sta: 3,      // 288.2 IP → tier 3. 27 CG in 30 starts. Also served as reliever (9 saves in 1930). Career 298 CG. Not quite the 300+ IP iron-arm tier. Rating of 3.
    def: 0,      // .954 career fielding %. No special defensive reputation. Adequate fielder. Rating of 0.
    clu: 3,      // 4-2, 1.75 ERA in 3 World Series. 36K in 51.1 IP. Won Game 5 of 1930 WS in relief (2-0). Won Games 1 & 6 of 1931 WS (CG each). ERA < 2.00 → tier 2 + WS clincher → +1. Maximum clutch.
  },

  stat_justification: {
    stf: "2.06 ERA in 1931 — the AL average was 4.38. His ERA was 2.32 runs below the league average, the most dominant gap in history. Pitching Triple Crown: led AL in wins (31), strikeouts (175), and ERA. K/9 of 5.46 in 1931 falls below the 6.0 bonus threshold (he led in K but the rate wasn't extreme). In 1930 his K/9 was 6.47, which would earn the bonus. Doc Cramer: 'He didn't have a curve. All he had was a fastball. Everybody knew what they were going to hit at, but they still couldn't hit him.' Joe Cronin: 'Just to see that big guy glaring down at you from the mound was enough to frighten the daylights out of you.' STF 4 — possibly the most underrated 4 in the system, as his dominance came from pure velocity and intimidation rather than pitch variety.",
    ctl: "BB/9 of 1.93 in 1931 (62 walks in 288.2 IP) → tier 3. WHIP 1.08 — close to the bonus but not under 1.00. Grove was notoriously wild early: 131 BB in 1925 (led AL). But he learned and improved every year. By 1931 he had mastered control while retaining his explosive fastball. In Boston he reinvented himself as a finesse pitcher after his arm went bad, learning curves and forkballs. Rating of 3 — excellent but not historic control.",
    sta: "288.2 IP in 1931 with 27 CG in 30 starts. Also used extensively in relief (9 saves in 1930, 5 in 1931). Career 298 CG over 17 seasons. Pitched 275+ IP in 6 seasons. Not quite the 300+ IP tier that would earn a 4, but the CG rate and relief work show extraordinary durability. His arm did eventually give out — traded to Boston with a dead arm in 1934, then reinvented himself. Rating of 3.",
    def: ".954 career fielding percentage. No special defensive reputation as a pitcher. He was a terrible hitter (.148 career, led all pitchers in strikeouts with 593). Adequate fielder, nothing more. Rating of 0.",
    clu: "4-2, 1.75 ERA in 3 World Series (1929-31). 36 K in 51.1 IP, 2 saves. Won Game 5 of 1930 WS in relief (entered 8th, won 2-0 on Foxx HR). Won Games 1 and 6 of 1931 WS with complete-game efforts. In 1929 WS relieved in 2 games, struck out side in 9th of Game 1. Bill Dickey: 'Nobody could throw a fastball past me if I knew it was coming — and then Grove threw three past me in one at-bat.' ERA < 2.00 → tier 2, plus WS clinching performances → +1. Maximum clutch rating of 3.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Through terror. Grove led by being the most intense, most competitive, most explosive man on the field. Teammates didn't follow him because they loved him — they followed him because they feared disappointing him. Connie Mack: 'Grove is the best lefthander that ever walked on a pitcher's slab. He surpasses everybody I have ever seen.' But Mack also had to manage Grove's volcanic personality like a bomb disposal expert.",
    temperament: "The most volcanic temper in baseball history. After losses, Grove shredded uniforms, kicked buckets, ripped lockers off walls, broke chairs, threw bats, balls, shoes, and water buckets. SABR: 'Few if any pitchers threw tantrums on a par with the 6'3\", 190-pound Lefty, who did everything big.' The 1931 streak-ending loss to the Browns — where he tore apart the entire clubhouse and blamed Al Simmons for taking the day off — is the defining moment. He raged at Simmons for YEARS afterward.",
    work_ethic: "Complex. Grove was a natural — his fastball came from God, not from practice. He barely warmed up. He relied on pure velocity for most of his career. But when his arm died in 1934, he did something remarkable: he completely reinvented himself. Learned the curve, the forkball, the changeup. Won 4 more ERA titles with Boston using craft instead of power. That transformation shows the intelligence beneath the fury.",
    lifestyle: "Coal miner's son who never fully left the mountains. Born in Lonaconing, MD — Appalachian coal country. Quit the mines after two weeks: 'Dad, I didn't put that coal in here, and I hope I don't have to take no more of her out.' Built 'Lefty's Place' in Lonaconing — bowling alleys, pool table, candy counter — and employed his unemployed brother and disabled brother-in-law. More comfortable with homefolk than city dwellers. Died watching a baseball game on TV.",
    era_adaptability: "ELITE. Grove's fastball was clocked informally at 100+ mph — he would dominate in any era. His late-career reinvention as a finesse pitcher shows adaptability. Bill James: 'What argument, if any, could be presented against the proposition that Lefty Grove was the greatest pitcher who ever lived?' In a modern context, Grove would be a Randy Johnson-type: terrifying velocity from the left side with improving control.",
    clubhouse_impact: "EXPLOSIVE. Grove could inspire or destroy a clubhouse depending on the day. After wins: jovial, gregarious, the life of the party. After losses: a hurricane that sent teammates running for cover. His multi-year grudge against Simmons over the 1931 loss poisoned the A's clubhouse. Connie Mack endured Grove's tantrums because the results were undeniable. A toxic competitor whose toxicity was tolerated because he was the best.",
    dark_side: "The destruction of the A's dynasty. Grove was the greatest pitcher on the greatest team of 1929-31 — but Connie Mack couldn't afford his players during the Depression. Grove was sold to Boston for $125,000 in December 1933, arriving with a dead arm. The A's dynasty crumbled. Grove reinvented himself in Boston and won 4 more ERA titles, but he never returned to the World Series. His MVP award — the first ever given in the AL — is not in Cooperstown. It's in the George's Creek Library in Lonaconing, Maryland. He never gave it to the Hall of Fame.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Fastest Alive", desc: "+2 STF in any game where Grove is facing a rival ace. His fastball was the most feared pitch in the AL for a decade. Doc Cramer: 'He was fabulous.'" },
    { tag: "The Tantrum", desc: "After any loss, 50% chance Grove destroys the clubhouse. -2 team morale. But +1 STF in his next start from pure rage. The fury fuels him." },
    { tag: "A's Dynasty", desc: "When paired with Foxx, Simmons, or Cochrane: +1 to all stats. The 1929-31 A's were one of the greatest teams ever assembled. 79-15 in 3 years." },
    { tag: "The Grudge", desc: "If a teammate makes an error behind Grove, 25% chance Grove holds a grudge for the rest of the season. -2 chemistry with that player permanently." },
    { tag: "Coal Country", desc: "+1 STA innate. Born in the coal mines of Appalachia. His arm was forged in mountains. Grove was tougher than the anthracite." },
    { tag: "The Reinvention", desc: "If Grove's arm goes dead (injury event), he can reinvent himself: loses -2 STF but gains +2 CTL. A different pitcher, equally effective." },
    { tag: "Connie Mack's Fire Sale", desc: "If your franchise enters financial crisis, Grove is the first player sold. He brings $125,000 but leaves a hole no one can fill." },
    { tag: "Dickey's Bonus", desc: "Receives +2 from Bill Dickey's 'Pitch Caller Supreme' trait. Dickey once said nobody could throw a fastball past him — and then Grove threw three." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His throne. 300 wins, 298 CG, 2,266 K. The most dominant pitcher of his generation." },
    { location: "Lefty's Place (Home)", affinity: "HIGH", note: "Built a bowling alley/pool hall in Lonaconing. Employed his brother. More comfortable with homefolk." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "But only after wins. After losses, the clubhouse becomes a war zone. Teammates flee." },
    { location: "Rural / Small Town", affinity: "HIGH", note: "Lonaconing boy at heart. Appalachian roots. Never fully adapted to city life." },
    { location: "Batting Cages", affinity: "LOW", note: ".148 career BA. Led all pitchers in K with 593. He was the worst-hitting great pitcher in history." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Terse at tributes. Not a media personality. Let the fastball speak." },
    { location: "Financial Adviser", affinity: "LOW", note: "Never made peace with the business of baseball. The Depression destroyed his team." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Winning streaks — 16 consecutive wins in 1931, 8 straight wins after the loss that ended the streak",
      "Rivalry games — especially vs. Yankees. Responding to bench-jockeying ('kicked over any water pails lately?'), he struck out 8 of the first 10 batters",
      "World Series — 1.75 ERA, 4-2, 36 K in 3 Fall Classics. October warrior.",
      "After reinvention — won 4 ERA titles in Boston using craft after his arm died",
    ],
    cold_triggers: [
      "Teammate errors — the Simmons/Moore incident triggered a multi-year rage spiral",
      "Post-loss tantrums — destructive behavior after defeats could spiral into clubhouse poison",
      "Arm injuries — his dead arm in 1933-34 nearly ended his career before reinvention",
      "Financial stress — the A's fire sale broke the dynasty and scattered Grove's support system",
    ],
    pressure_response: "PARADOXICAL. In the biggest games (World Series), Grove was magnificent — 1.75 ERA across 3 Fall Classics. But in the biggest single game of his career (going for his 17th straight win in 1931), he lost 1-0 on a substitute's error and had perhaps the most famous meltdown in baseball history. Grove was a pressure performer whose pressure valve was set to 'nuclear.' He thrived in pressure — but when it went wrong, the explosion was legendary. From July 1930 to September 1931: 46-4. The best 50-decision stretch by any pitcher in baseball history.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Clubhouse Destruction",
      type: "Drama",
      text: "Your ace loses a 1-0 game on a teammate's error. He tears the clubhouse apart — ripping lockers off walls, smashing chairs, shredding his own uniform. -3 team morale. But in his next start, +2 STF from pure fury. He wins.",
      origin: "August 23, 1931: Grove lost 1-0 to the Browns when sub LF Jimmy Moore misjudged a fly ball. Simmons was in Milwaukee for treatment. Grove blamed Simmons for years. He tore apart the St. Louis clubhouse — lockers, chairs, bats, balls, shoes, everything.",
    },
    {
      title: "Sixteen Straight",
      type: "Game Action",
      text: "Your pitcher ties the AL consecutive win record at 16. His next start determines history. Roll for fate: on success, the record falls. On failure, a 1-0 loss — and the greatest tantrum baseball has ever seen.",
      origin: "1931: Grove tied Walter Johnson and Smokey Joe Wood's AL record of 16 straight wins. Game 17 was the 1-0 loss to the Browns. He followed it with 8 more consecutive wins.",
    },
    {
      title: "The $100,600 Man",
      type: "Action",
      text: "Your team purchases the greatest minor league pitcher in history for a record sum — $600 more than Babe Ruth cost. He's wild and raw, but the fastball is unhittable. He leads the league in walks AND strikeouts his first season.",
      origin: "Connie Mack paid $100,600 for Grove — $600 more than the Yankees paid for Ruth. In 1925, Grove went 10-12 but led the AL in both walks (131) and strikeouts (116). The investment paid off: 300 career wins.",
    },
    {
      title: "Dad, I Didn't Put That Coal in There",
      type: "Drama",
      text: "A young man from a mining family quits the mines after two weeks. He picks up a baseball. The fastball splinters wood. A local manager offers $125/month — $50 more than his father makes. The boy never goes underground again.",
      origin: "Grove worked two weeks in the Lonaconing coal mines before quitting. He told his father: 'Dad, I didn't put that coal in here, and I hope I don't have to take no more of her out.' Bill Louden signed him for $125/month.",
    },
    {
      title: "The Reinvention",
      type: "Action",
      text: "Your ace's fastball dies. His arm is dead. Everyone says he's finished. But he learns three new pitches and wins 4 more ERA titles using craft instead of power. -2 STF permanently, +2 CTL permanently.",
      origin: "Traded to Boston with a dead arm in 1934, Grove reinvented himself. He learned the curve and forkball. Won 4 ERA titles with the Red Sox (1935, 1936, 1938, 1939) using finesse. He won his 300th game at age 41.",
    },
    {
      title: "The Fire Sale",
      type: "Drama",
      text: "The Depression hits. Your owner can't afford the payroll. He sells your ace, your cleanup hitter, and your catcher to different teams. The dynasty is over. Each sold player gets -2 morale. The franchise gets cash but loses its soul.",
      origin: "Connie Mack sold Grove ($125K), Foxx, Cochrane, and Simmons during the Depression. The 1929-31 A's dynasty — 79-15 in 3 years — was scattered to the winds for cash.",
    },
    {
      title: "Three Past Dickey",
      type: "Game Action",
      text: "Your pitcher faces the opposing team's best hitter. The hitter knows the fastball is coming. Three pitches. Three swings. Three misses. +2 intimidation for the rest of the game. Every batter in the lineup now fears the fastball.",
      origin: "Bill Dickey: 'Nobody could throw a fastball past me if I knew it was coming — and then Grove threw three past me in one at-bat.' The fastball was that good.",
    },
    {
      title: "Win Number 300",
      type: "Game Action",
      text: "Your aging pitcher — now 41, pitching on craft alone — grinds out a complete-game victory for his 300th win. The milestone seemed impossible when his arm died at 34. He did it anyway.",
      origin: "July 25, 1941: Grove won his 300th game — a complete-game 10-6 win for the Red Sox vs. Cleveland at Fenway Park. He was 41 years old. He retired at exactly 300 wins, .680 winning percentage — the best among all 300-game winners.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall, lean, angular — 6'3\" 190 lbs of coiled fury. Long arms, high leg kick. The face of a man who could throw 100 mph and hated losing more than he loved winning. Intense, narrow eyes. Set jaw. The expression of someone who might throw through you if he can't throw past you. Appalachian mountain features — hard, weathered, uncompromising.",
    attire: "Philadelphia Athletics 1931 home whites, classic elephant logo on sleeve. Number 10. LH delivery at full extension — the high leg kick, the whip-arm release. The ball invisible. Or the aftermath: jaw set, glaring at the batter, having just struck him out on three fastballs.",
    mood: "Controlled violence. The fastball is a weapon and he knows it. Not serene, not joyful — combustible. The card should radiate menace and dominance. This is the most dangerous pitcher in the set. The card you play when you need to win and don't care about the collateral damage.",
    style: "Dark, intense sepia — the darkest card in the Crashers set. Shibe Park looming behind him, packed with fans who came to see someone throw 100 mph in an era before radar guns. Heavy shadow on the face. The card should feel heavy in your hand — like it might bite you.",
    reference: "This is the ace card. The Crashers' trump card. If the Foxx card is the most powerful hitter, the Grove card is the most terrifying pitcher. Together they're the engine of the 1929-31 A's dynasty. The card should feel like danger — beautiful, lethal, explosive.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT CONVERSION ENGINE
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
};

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

export default function LeftyGroveCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)` }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
                <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: LH delivery, full extension, A's whites, intense glare, Shibe Park, dark sepia]</div>
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "W%", val: ".680" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 17 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× WS Champ", "👑 1931 AL MVP", "⭐ 300 Wins", "🔥 9× ERA Leader", "💎 7× K Leader", "📜 2× Triple Crown", "🏅 HOF 1947", "🎖️ All-Century Team"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Grove's real life, become universal cards playable in any game.</p>
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
              </>)}
              {tab === "engine" && (<>
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Grove's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
