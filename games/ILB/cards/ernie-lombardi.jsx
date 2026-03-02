import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: ERNIE LOMBARDI
  // Year Snapshot: 1938 (MVP Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Ernie Lombardi",
  nickname: "Schnozz",
  year: 1938,
  team: "Cincinnati Reds",
  era: "1930s",
  ilb_team: "Crashers NL1930",
  position: "C",
  bats: "R",
  throws: "R",
  height: '6\'3"',
  weight: "230 lbs",
  born: "April 6, 1908 — Oakland, CA",
  died: "September 26, 1977 — Santa Cruz, CA",
  hof: "Class of 1986 (Veterans Committee). .306 BA, 190 HR, 990 RBI, 2× batting champion in 17 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1938 MVP SEASON
  // Source: Baseball-Reference, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1938,
    games: 129,
    at_bats: 489,
    hits: 167,
    doubles: 30,
    triples: 1,
    home_runs: 19,
    rbi: 95,
    stolen_bases: 0,
    batting_avg: ".342",
    obp: ".391",
    slg: ".524",
    ops: ".915",
    ops_plus: 167,
    war: 5.8,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 7,
    career_avg: ".306",
    career_hits: 1792,
    career_hr: 190,
    career_sb: 8,
    career_war: 37.8,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — HITTER
  //
  // CONTACT (CON) — .342 BA → tier 5 (.330+). OPS+ 167 → +1 bonus, capped at 5. CON = 5.
  // POWER (POW) — 19 HR → tier 1 (10-19). SLG .524 → +1 bonus. POW = 2.
  // SPEED (SPD) — 0 SB → tier 0. No CF/SS GG bonus. SPD = 0.
  // DEFENSE (DEF) — Pre-GG era. Strong arm (47% CS), but led NL in passed balls 7 years. Mixed reputation. GG equivalent ~1-2. DEF = 1.
  // CLUTCH (CLU) — Limited postseason. 1939 WS: "Snooze" unfairly blamed. 1940 WS champ but injured, only 2 games. CLU = 0.
  // OVERALL (OVR) — MVP, 2× batting champ, HOF, but Veterans Committee selection (not first ballot). OVR = 8 (All-Star tier).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star tier — MVP catcher, 2× batting champ, but limited by speed and postseason
    con: 5,      // .342 BA in 1938, .306 career — maximum contact. Only catcher to win 2 batting titles.
    pow: 2,      // 19 HR peak, 190 career. Moderate power — he was a line-drive hitter with a 42-oz bat.
    spd: 0,      // 8 career SB in 17 seasons. Legendarily the slowest player in MLB history.
    def: 1,      // Strong arm (47% CS), caught Vander Meer's back-to-back no-nos, but led NL in passed balls 7×.
    clu: 0,      // 1939 WS "Snooze" disaster. 1940 WS champ but injured. .200 WS batting average.
  },

  stat_justification: {
    con: "Led the NL with .342 in 1938 (MVP). Won a second batting title in 1942 (.330) — the first catcher to win two. Career .306 despite infielders literally playing on the outfield grass against him. Bill James wrote he could have hit .400 with normal speed. Ted Williams called him the best hitter he ever saw. His interlocking golf grip and 42-oz bat produced rifle-shot line drives. Maximum 5.",
    pow: "19 HR in 1938, career high 20 in 1939. Career 190 HR — strong for a catcher in his era, especially at Crosley Field (a pitcher's park until the 1950s). SLG .524 in 1938 earns the +1 bonus. But Lombardi was a line-drive hitter, not a slugger — his power was contact-generated. Rating of 2.",
    spd: "8 stolen bases in 17 seasons. 261 career GIDP — once every 25.3 plate appearances, the worst ratio in MLB history. An opposing manager said he ran 'like he was carrying a piano — and the man who was tuning it.' Pee Wee Reese played so deep against him that Lombardi joked it took three years to realize Reese wasn't an outfielder. Rating of 0.",
    def: "Lombardi had one of the strongest arms in baseball — 47% caught stealing rate, and scouts briefly considered making him a pitcher. He caught both of Johnny Vander Meer's consecutive no-hitters (June 11 & 15, 1938). Hands so large he could hold five baseballs in one palm. But he led the NL in passed balls for seven consecutive seasons (1935-41) and was slow to field bunts and pop-ups. Pre-Gold Glove equivalent of 1-2. Rating of 1.",
    clu: "The 'Lombardi Snooze' haunted his entire career. In Game 4 of the 1939 WS, Charlie Keller crashed into him at the plate, stunning him; DiMaggio scored while Lombardi lay dazed. Bill James called it 'absurd' to blame Lombardi — the Yankees were already ahead 3-0 in the series and the run merely made it 7-4. In the 1940 WS (Reds won), Lombardi was injured and appeared in only 2 games. Career WS BA of .200. No clutch moments to his name. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet, gentle giant. Lombardi was universally described as kind and soft-spoken off the field. He didn't bark orders or demand attention — he earned respect through his bat and his durability, catching 100+ games for ten consecutive seasons. His leadership was the kind born of silent reliability.",
    temperament: "Sensitive and proud beneath the calm exterior. Lombardi held out publicly over salary disputes, once calling Reds GM Warren Giles 'the old goat.' He carried deep wounds from perceived slights — the 'Snooze' label, the Hall of Fame snub, the way sportswriters mocked his speed and his nose. He laughed along, but it cut deeper than anyone knew.",
    work_ethic: "Pure natural talent refined through repetition. Lombardi's interlocking golf grip was unconventional but devastatingly effective. He swung a 42-ounce bat — the heaviest in the league — with wrists and forearms that looked like they belonged to a blacksmith. He caught 100+ games per season for a decade, a grueling workload for any catcher.",
    lifestyle: "Italian-American from Oakland's working-class neighborhoods. Attended McClymonds High (same school that later produced Frank Robinson and Bill Russell). Married Bernice; they lived quietly. After baseball, Lombardi worked as a press box attendant at Candlestick Park and later as a gas station attendant in Oakland. He never found financial security after the game.",
    era_adaptability: "MODERATE. Lombardi's bat would translate to any era — a .306 career average despite infielders playing on the outfield grass is staggering. But his immobility would be even more exposed in modern baseball, where catchers need to frame pitches, block balls, and occasionally run. He'd be a DH candidate in the AL. In ILB terms: his bat plays everywhere, but his legs limit him.",
    clubhouse_impact: "BELOVED. Lombardi was hugely popular with Cincinnati fans — his gentle demeanor and cartoonish appearance (the nose, the size, the slowness) made him lovable. Teammates respected his toughness behind the plate and his bat. He befriended everyone. The Reds dedicated a bronze statue of him outside Great American Ballpark in 2004.",
    dark_side: "The depression that nearly killed him. After years of bitterness over the 'Snooze' label and the Hall of Fame's refusal to honor him, Lombardi attempted suicide in 1953, slitting his throat with a razor. He survived, was hospitalized, and eventually recovered, but the incident revealed how deeply the game's cruelties had wounded him. He died in 1977 at 69, still without the Hall recognition he deserved (inducted posthumously in 1986). In ILB terms: Lombardi carries a 'Fragile Pride' trait — public humiliation or benchings can trigger a severe morale collapse.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Gentle Giant", desc: "Lombardi's warmth boosts team morale +1. But he can be wounded by harsh criticism — negative press events hit him twice as hard." },
    { tag: "Schnozz", desc: "Fan favorite. +1 crowd energy when Lombardi is in the starting lineup at home. His oversized personality fills the ballpark." },
    { tag: "Vander Meer's Catcher", desc: "+2 chemistry with Johnny Vander Meer or any 'wild' pitcher. Lombardi stabilizes erratic arms — sometimes catching pitches barehanded." },
    { tag: "Heaviest Bat", desc: "42-ounce lumber. Lombardi's line drives terrify pitchers and infielders. Carl Hubbell: 'I thought he might hurt me, even kill me, with one of those liners.'" },
    { tag: "Lead Feet", desc: "SPD permanently locked at 0. Lombardi cannot steal bases, advance on passed balls, or score from second on a single. GIDP probability +25%." },
    { tag: "Italian Heritage", desc: "+1 chemistry with Italian-American players (Lazzeri, DiMaggio, Crosetti). Cultural connection bonus in Oakland/Bay Area squares." },
    { tag: "Fragile Pride", desc: "Public benchings or press mockery trigger -2 morale. If morale drops below zero, Lombardi enters a 'Withdrawal' state — reduced performance for 3 games." },
    { tag: "The Snooze", desc: "In World Series games, Lombardi has a hidden 10% chance of a 'catastrophic collision' event at the plate that shifts momentum to the opponent." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Hours of batting practice with the 42-oz bat. Line drives off the cage walls." },
    { location: "Restaurant / Steakhouse", affinity: "HIGH", note: "Italian-American family meals. Lombardi grew up in Oakland's Italian community." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Quiet presence. The guy everyone likes, sitting in the corner telling stories." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Lombardi tired easily in later years. The catching workload demanded recovery." },
    { location: "Community Events", affinity: "MEDIUM", note: "Popular with fans, especially in Cincinnati. But didn't seek the spotlight." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Quiet, family-oriented. Not a partier." },
    { location: "Media / Spotlight", affinity: "NONE", note: "The press mocked his speed and his nose. Lombardi avoided reporters when possible." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Multi-hit games — once went 6-for-6 with five singles and a double",
      "Home games in Cincinnati — the fans' adoration fueled him",
      "Paired with a strong pitching staff — calling a great game activated his best",
      "Salary disputes resolved in his favor — validation drove performance",
    ],
    cold_triggers: [
      "Public humiliation — the 'Snooze' label, press mockery of his speed or appearance",
      "Being benched or relegated to backup — Lombardi's pride couldn't handle reduced roles",
      "Hot weather — he was 'feeling dizzy' from the heat during the 1939 WS collision",
    ],
    pressure_response: "VULNERABLE. Lombardi was not built for October. The 1939 World Series defined his legacy unfairly — knocked senseless by Keller's collision, unable to recover while DiMaggio scored. In the 1940 WS (which the Reds won), he was injured and barely played. The 1948 WS (when he was with Boston) he contributed as a part-time player. Lombardi's sensitivity means postseason pressure amplifies his cold triggers. In ILB: use Lombardi in the regular season, protect him from elimination games.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Back-to-Back No-Hitters",
      type: "Game Action",
      text: "Your catcher calls a perfect game plan. Your starting pitcher throws a no-hitter. If the same battery starts the next game, roll a d6: on 5+, the pitcher throws ANOTHER no-hitter. The odds are astronomical — but it happened.",
      origin: "Lombardi caught both of Johnny Vander Meer's consecutive no-hitters on June 11 and June 15, 1938 — a feat never repeated in baseball history.",
    },
    {
      title: "The Snooze",
      type: "Drama",
      text: "In a World Series game, your catcher is knocked unconscious at home plate during a collision. The opposing team scores an extra run while he lies stunned. The press blames your catcher. His morale drops -3 and the label follows him for the rest of his career.",
      origin: "Game 4 of the 1939 WS: Keller crashed into Lombardi, stunning him. DiMaggio scored while Lombardi lay dazed. The press dubbed it 'Lombardi's Snooze' — a label Bill James called 'absurd' since the Yankees were already up 3-0 in the Series.",
    },
    {
      title: "Six for Six",
      type: "Game Action",
      text: "Your highest-CON hitter goes 6-for-6 in a single game. Every hit is a line drive so hard it terrifies the infielders. +2 momentum, and the opposing pitcher's confidence drops -1 for his next start.",
      origin: "On May 9, 1937, Lombardi went 6-for-6. On another occasion, he hit doubles in four consecutive innings off four different pitchers.",
    },
    {
      title: "The Heaviest Bat",
      type: "Action",
      text: "Your slugger switches to the heaviest bat in the league. His line drives become dangerous weapons. +1 POW for the season, but GIDP chance increases by 15% and SPD drops by 1 (minimum 0).",
      origin: "Lombardi swung a 42-ounce bat — the heaviest in the NL — with an interlocking golf grip. Carl Hubbell feared for his life facing Lombardi's line drives.",
    },
    {
      title: "Infielders on the Grass",
      type: "Game Action",
      text: "The opposing defense shifts all four infielders to the outfield grass against your slowest hitter. His batting average drops -30 points for the game, but if he hits one past them, it's an automatic triple (which he'll still only make into a double).",
      origin: "Defenses routinely positioned infielders on the outfield grass against Lombardi. He joked it took three years to realize Pee Wee Reese wasn't an outfielder.",
    },
    {
      title: "The Gentle Giant's Rage",
      type: "Drama",
      text: "Your quiet, beloved star finally snaps after years of disrespect. He publicly calls the team's general manager a derogatory name. He gets a -2 reputation penalty but +1 contract leverage at his next negotiation.",
      origin: "Lombardi publicly called Reds GM Warren Giles 'the old goat' during a salary dispute. Giles sold him to Boston and allegedly worked to keep Lombardi out of the Hall of Fame for years.",
    },
    {
      title: "Carrying a Piano",
      type: "Action",
      text: "Your slowest player grounds into a double play for the third time this week. The opposing manager quips about his speed. -1 morale for your player, but +1 comic relief for the clubhouse (team morale +1 if chemistry is above 3).",
      origin: "An opposing manager said Lombardi ran 'like he was carrying a piano — and the man who was tuning it.' He grounded into 261 career double plays — once every 25.3 PA, the worst ratio in MLB history.",
    },
    {
      title: "Posthumous Glory",
      type: "Drama",
      text: "A legendary player who was overlooked for decades is finally inducted into the Hall of Fame — years after his death. His legacy is restored. All cards bearing his name gain +2 permanent legacy value.",
      origin: "Lombardi died in 1977, bitter about his Hall of Fame exclusion. He was inducted posthumously in 1986 by the Veterans Committee, thanks to a personal crusade by fellow catcher Birdie Tebbetts.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Massive, warm face dominated by an enormous hooked nose (the 'Schnozz'). 6'3\" 230 lbs — huge barrel chest, massive forearms and wrists, hands that could hold five baseballs. Dark Italian features, gentle eyes that don't match the intimidating frame. The face of a man who could crush a baseball but wouldn't hurt a fly.",
    attire: "Cincinnati Reds home whites, 1938 flannel. In a crouch behind home plate with no mitt visible (his hands were so large the mitt seemed superfluous). Or mid-swing with the massive 42-oz bat — the interlocking golf grip visible. Number not prominently displayed (pre-number era for some teams).",
    mood: "Quiet warmth tinged with melancholy. The gentle giant who knows the world finds him funny. There should be dignity in the portrait — this is a man who hit .342 despite the world laughing at his feet. The hint of sadness in the eyes that would become the defining tragedy of his later years.",
    style: "Warm sepia with Cincinnati red-gold tones. Crosley Field's cozy dimensions in the background. The card should feel intimate and human — this isn't a superhero card, it's a portrait of baseball's most lovable paradox: the greatest hitter who couldn't run.",
    reference: "Think 1938 Goudey or Play Ball card feel. The Lombardi card should make you smile and then make you think. Among the most emotionally complex cards in the entire Crashers set.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY (HITTER)
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

export default function ErnieLombardiCard() {
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
          Player Card — Crashers Era
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
                [AI Portrait: Sepia-toned, crouch behind plate or mid-swing, Reds flannel, Crosley Field]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
              {/* NL CROSSOVER badge */}
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.gold}dd`, color: C.darkBrown, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                NL CROSSOVER
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

            {/* ILB Stats — Hitter */}
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
              {["🏆 1938 NL MVP", "🏆 1940 WS Champ", "⭐ 7× All-Star", "🥇 2× Batting Title", "⭐ HOF 1986", "📜 Vander Meer's Catcher"].map((a, i) => (
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
                      These events, derived from Lombardi's real life, become universal cards playable in any game.
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
                  <Section title="Lombardi's Derivation">
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
