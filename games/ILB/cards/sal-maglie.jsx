import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: SAL MAGLIE
  // Year Snapshot: 1951 (Ace of Pennant-Winning Giants)
  // ═══════════════════════════════════════════════════════════════

  name: "Sal Maglie",
  nickname: "The Barber",
  year: 1951,
  team: "New York Giants",
  era: "1950s",
  ilb_team: "Dreamers NL1950",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "180 lbs",
  born: "April 26, 1917 — Niagara Falls, NY",
  died: "December 28, 1992 — Niagara Falls, NY",
  hof: "Not inducted. 119-62, 3.15 ERA, .657 W%, 34.2 WAR in 10 seasons. Lost 4+ years to Mexican League ban.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1951 PEAK SEASON
  // Source: Baseball-Reference, SABR, Cooperstown Expert
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: {
      year: 1951,
      games: 42,
      w: 23, l: 6,
      era: "2.93",
      k: 146,
      bb: 86,
      ip: "298.0",
      cg: 22,
      whip: "1.14",
      war: 5.9,
    },
    career: {
      seasons: 10,
      w: 119, l: 62,
      era: "3.15",
      k: 862,
      cg: 93,
      sho: 25,
      no_hit: 1,
      war: 34.2,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — PITCHER
  //
  // STF (Stuff) = ERA-based: 2.93 ERA → tier 3 (2.50-2.99). K/9 = 4.41 → no bonus (needs ≥6.0). STF = 3.
  // CTL (Control) = BB/9-based: ~2.60 BB/9 → tier 2 (2.50-2.99). WHIP 1.14 → no bonus (needs ≤1.00). CTL = 2.
  // STA (Stamina): 298 IP → tier 3 (250-299). 22 CG. STA = 3.
  // DEF: Led NL pitchers in fielding %, DP turned. Good fielding pitcher. DEF = 1.
  // CLU: WS ERA 3.41 in 29 IP across 4 starts. Started Shot Heard 'Round the World game, '54 WS Game 1 (Mays catch), '56 WS Game 5 (Larsen perfect game). +1 for being THE big-game pitcher. CLU = 2.
  // OVR: Ace of 3 pennant winners. Bill James ranked him best pitcher in baseball for 1951. But 10-season career, Mexican League ban, no HOF. OVR = 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — ace of 3 pennant winners, .657 career W%, but limited career length
    stf: 3,      // 2.93 ERA in 1951, led NL in ERA+ (134). Master of pitching inside. Not a strikeout pitcher.
    ctl: 2,      // BB/9 ~2.60 in 1951. Painted corners — "The Barber" shaved the plate, not the zone.
    sta: 3,      // 298 IP, 22 CG in 1951. Durable workhorse when healthy. 93 career CG.
    def: 1,      // Good fielding pitcher. Led NL pitchers in DP turned and fielding %.
    clu: 2,      // Started baseball's 3 most famous games of the '50s. WS ERA 3.41. Big-game pitcher.
  },

  stat_justification: {
    stf: "2.93 ERA in 1951 — second-best in the NL. Led the league in ERA+ (134) and H/9 (7.7, lowest in NL). Bill James called him the best pitcher in baseball for 1951 and said he would have won the Cy Young had it existed. But Maglie was a craft pitcher, not an overpowering one — K/9 of 4.41 means no strikeout bonus. His 'stuff' was location, the curveball learned from Dolf Luque in Mexico, and the intimidation of pitching inside. Rating of 3.",
    ctl: "BB/9 approximately 2.60 in 1951 (86 BB in 298 IP). WHIP of 1.14 — excellent but doesn't reach the elite 1.00 threshold. Maglie's genius was in the perception of control: batters were so terrified of being hit that they couldn't sit on any pitch. His 'close shaves' — brushback pitches just under the chin — expanded the effective strike zone through intimidation. Rating of 2.",
    sta: "298 IP in 1951 — just shy of 300. 22 complete games in 37 starts. Career 93 CG in 10 seasons. In 1950, he threw 45 consecutive scoreless innings including 4 straight shutouts. Maglie was a workhorse when healthy, though back problems plagued him in 1953-55. Rating of 3.",
    def: "Good fielding pitcher. Led NL pitchers in double plays turned and fielding percentage in 1951. Competent but not exceptional with the glove. Rating of 1.",
    clu: "Sal Maglie started the three most famous games of the 1950s: (1) The Shot Heard 'Round the World game (Oct 3, 1951) — held the Dodgers to 4 runs through 8 IP, enabling Bobby Thomson's walk-off HR. (2) 1954 WS Game 1 — held the 111-win Indians to 2 runs in 7 IP, the game featuring Willie Mays' famous catch. (3) 1956 WS Game 5 — threw a 5-hitter against the Yankees but lost to Don Larsen's perfect game. WS career ERA 3.41 in 29 IP. He was THE pitcher managers wanted in the biggest game of the year. Alvin Dark: 'He is the only man I've ever seen pitch a shutout on a day when he had absolutely nothing. He got by on meanness.' Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead through intimidation on the mound and quiet competence off it. Maglie's persona was split: menacing, dark, unshaven on the mound; gentle, warm, soft-spoken in the clubhouse. His teammates knew that when Maglie pitched, they were going to win — and the other team knew they were going to get brushed back. His leadership was simple: 'I will terrify them, and you will beat them.'",
    temperament: "Jekyll and Hyde. Off the field, Maglie was described as one of the gentlest men in baseball — polite, humble, and likable. On the mound, he was a menace. His five o'clock shadow, dark features, and willingness to throw at batters' heads created a terrifying figure. Carl Furillo once threw a bat at him. But when Maglie was traded to the Dodgers, Furillo and Maglie became roommates. The monster was a mask.",
    work_ethic: "Late bloomer who refined his craft under extreme circumstances. Maglie didn't become a major league regular until age 33 — his prime years stolen by a slow minor league rise, WWII-era physical rejection (chronic sinus condition), and the Mexican League ban. He learned the curveball from legendary Cuban pitcher Dolf Luque in Mexico. That education transformed him from a marginal prospect into an ace. Every inning he threw was borrowed time, and he pitched like it.",
    lifestyle: "Son of Italian immigrants in Niagara Falls, NY. Married to Kay. Played ball secretly as a kid because his parents discouraged it. Attended Niagara University. After baseball, he returned to Niagara Falls and owned several businesses. Suffered a debilitating stroke in the mid-1970s. The city renamed Hyde Park Stadium 'Sal Maglie Stadium' in 1983. A beloved local figure until his death in 1992.",
    era_adaptability: "MODERATE. Maglie's approach — pitching inside, intimidation, painting corners — would translate to any era conceptually. But his velocity was modest even by 1950s standards. In the modern game, his K/9 of 4.4 wouldn't survive. However, his influence on pitching philosophy — teaching Drysdale, Koufax, Gibson, and Lonborg to pitch inside — shaped the game for decades. In ILB: Maglie is a finesse ace who maximizes his arsenal through fear.",
    clubhouse_impact: "RESPECTED ELDER. Maglie joined teams as a veteran presence and immediately elevated the pitching staff. With the Giants, he was the anchor who made the '51 Miracle possible. With the Dodgers in '56, he revitalized a flagging rotation and threw a no-hitter in a pennant race. As a pitching coach, he mentored Cy Young winners Drysdale, Lonborg, and Gibson. His impact exceeded his stat line.",
    dark_side: "The Mexican League betrayal. In 1946, Maglie and several other players jumped to the Mexican League, lured by higher salaries. Commissioner Happy Chandler blacklisted them for five years. Maglie lost four prime seasons (ages 29-32) to the ban. He was one of the 'Mexican League outlaws' — players who were punished for seeking fair pay. The ban was eventually lifted, but Maglie never recovered those years. In ILB terms: Maglie carries a 'Blacklisted' trait — he cannot play for 4 seasons if a 'Mexican League Jump' event is triggered, but returns with +1 STF from Luque's curveball education.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Barber", desc: "Maglie's brushback pitches terrorize batters. Opposing hitters face -1 CON for their first at-bat against him each game. 10% chance of hitting a batter (potential ejection)." },
    { tag: "Close Shave", desc: "When Maglie pitches inside, the umpire has a 5% chance of issuing a warning. If warned, Maglie's effectiveness drops -1 STF. If he ignores the warning and throws inside again, 15% ejection risk." },
    { tag: "Five O'Clock Shadow", desc: "Maglie's dark, unshaven appearance intimidates opponents. +1 intimidation factor at home games. Opposing team's lead-off hitter starts with -1 morale." },
    { tag: "Dolf Luque's Student", desc: "Maglie learned his devastating curveball from Cuban legend Dolf Luque in Mexico. +1 STF bonus when facing hitters who struggle against breaking balls." },
    { tag: "Ace of the Moment", desc: "Maglie was the starter for 3 of baseball's most famous games. In playoff or World Series games, +1 CLU. The bigger the game, the better he pitches." },
    { tag: "Giant Killer / Dodger Savior", desc: "Maglie went 23-11 lifetime against the Dodgers as a Giant. If traded to a former rival, he gains +2 chemistry with his new team and -2 with his old one." },
    { tag: "Blacklisted", desc: "If a 'Mexican League' event is triggered, Maglie is banned for 4 seasons. Upon return, he gains +1 STF (Luque's curveball) and the 'Comeback' trait." },
    { tag: "Pitching Coach Legacy", desc: "After retirement, Maglie can mentor young pitchers. Pupils gain +1 to 'pitch inside' effectiveness. His coaching tree includes Drysdale, Koufax, Gibson, and Lonborg." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "The Barber's office. Where the gentle man becomes a menace." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Quiet, warm, generous with advice. The real Sal Maglie — nothing like his mound persona." },
    { location: "Restaurant / Italian Dinner", affinity: "HIGH", note: "Son of Italian immigrants. Niagara Falls neighborhood restaurants where everyone knows his name." },
    { location: "Coaching / Mentoring", affinity: "MEDIUM", note: "Pitching coach for Red Sox ('67 Impossible Dream), Pilots, Cubs. Shaping the next generation." },
    { location: "Community Events", affinity: "MEDIUM", note: "Beloved in Niagara Falls. Over 1,000 attended his tribute dinner. Stadium named after him." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Private man. Let his pitching speak. The five o'clock shadow was intimidation, not vanity." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Family man. Quiet evenings at home with Kay." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "September pennant races — Maglie went 6-1 in September 1951, 5-1 in September 1950, 4-0 in September 1952",
      "Facing the Dodgers — 23-11 lifetime, 11 of 12 at Ebbets Field. The rivalry fueled him.",
      "Must-win games — the bigger the stakes, the sharper the curveball",
      "Returning from adversity — came back from 4-year ban at age 33 and became an ace",
    ],
    cold_triggers: [
      "Back problems — chronic issues in 1953-55 reduced him from ace to journeyman",
      "Being waived or sold — Maglie's pride suffered when the Giants let him go in 1955",
      "Postseason losses to the Yankees — his WS record was 1-2 despite pitching well",
    ],
    pressure_response: "ELITE. Maglie was, by every account, the pitcher you wanted on the mound when everything was on the line. Bill Madden of the NY Daily News wrote he'd never make the Hall of Fame 'unless there's a Hall of Fame just for pitchers whom you wanted to have the ball in a game you had to win.' He started Game 3 of the 1951 NL playoff (Shot Heard 'Round the World), Game 1 of the 1954 WS (Willie Mays catch), and Game 5 of the 1956 WS (Don Larsen's perfect game). In September pennant races, his combined record was approximately 15-2 across three seasons. He got by on 'meanness,' as Alvin Dark said.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Shot Heard 'Round the World",
      type: "Game Action",
      text: "Your ace has held the rival team to 4 runs through 8 innings of the deciding playoff game. Your team trails 4-1 in the bottom of the 9th. Then: a three-run walk-off homer wins the pennant. Your pitcher doesn't get the win or the loss — but he kept you close enough for the miracle.",
      origin: "Oct 3, 1951: Maglie started Game 3 of the NL playoff tiebreaker. He held the Dodgers to 4 runs through 8 IP. In the bottom of the 9th, Bobby Thomson hit the most famous home run in baseball history. Maglie was the reason the Giants were still alive.",
    },
    {
      title: "The Catch Game",
      type: "Game Action",
      text: "Your pitcher holds the best team in baseball to 2 runs through 7 innings of World Series Game 1. Your center fielder makes an over-the-shoulder catch that defies physics. The game goes to extras. You win.",
      origin: "1954 WS Game 1: Maglie held the 111-win Indians to 2 runs in 7 IP. Willie Mays made THE Catch on Vic Wertz's 460-foot drive. The Giants won in extra innings and swept the Series.",
    },
    {
      title: "Opposite Side of Perfection",
      type: "Drama",
      text: "Your ace throws a masterful 5-hitter in the World Series — and loses. The opposing pitcher throws a perfect game. Your pitcher is remembered as the footnote to history's greatest pitching performance.",
      origin: "1956 WS Game 5: Maglie threw a 5-hitter with 10 strikeouts against the Yankees, allowing just 2 runs. Don Larsen threw the only perfect game in World Series history. Maglie's brilliant outing is remembered only as the losing side of Larsen's legend.",
    },
    {
      title: "The Close Shave",
      type: "Game Action",
      text: "Your pitcher throws a brushback pitch that barely misses the batter's chin. The batter is furious — he throws his bat at the pitcher. Both benches clear. Your pitcher gains +2 intimidation but risks ejection.",
      origin: "Carl Furillo was so enraged by Maglie's close shaves that he threw his bat at the pitcher. Years later, after Maglie was traded to the Dodgers, Furillo and Maglie became roommates and friends.",
    },
    {
      title: "The Mexican League Exile",
      type: "Drama",
      text: "Several of your players jump to a rival league offering higher salaries. The commissioner bans them for 5 years. When the ban is lifted, the returning players have learned new skills but have lost prime years. Each returning player gains +1 to one stat but loses 4 seasons of career accumulation.",
      origin: "In 1946, Maglie and other players jumped to the Mexican League. Commissioner Chandler blacklisted them for 5 years (reduced to 4). In Mexico, Maglie learned his devastating curveball from Dolf Luque. He returned at 33 and became one of baseball's best pitchers.",
    },
    {
      title: "The September Ace",
      type: "Game Action",
      text: "Your ace pitcher goes 6-1 in September during a pennant race. Each win is worth double momentum. The team erases a 13½-game deficit and forces a tiebreaker playoff.",
      origin: "In September 1951, Maglie went 6-1 including a shutout of the Dodgers that tied the teams for first place. The Giants had trailed by 13½ games in August and won 37 of their last 44 to force the legendary playoff.",
    },
    {
      title: "No-Hitter in the Pennant Race",
      type: "Game Action",
      text: "Your 39-year-old pitcher, thought to be washed up, throws a no-hitter in September during a one-game pennant race. +5 team momentum. The pitcher gains 'Ageless' trait.",
      origin: "On Sept 25, 1956, Maglie (age 39) threw a no-hitter for the Dodgers against the Phillies, keeping Brooklyn in the pennant race. He was the oldest pitcher in 48 years to throw a no-no.",
    },
    {
      title: "Enemy Becomes Ally",
      type: "Drama",
      text: "Your team acquires a hated rival pitcher. His former enemies on your roster are furious — but after seeing him pitch, they become his biggest fans. The player who once threw a bat at him becomes his roommate. -2 chemistry initially, +3 chemistry after 5 starts with sub-3.00 ERA.",
      origin: "Carl Furillo threw a bat at Maglie when he was a Giant. When Maglie was traded to the Dodgers in 1956, Furillo became his friend and roommate. Don Drysdale credited Maglie with teaching him to pitch inside.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Dark, angular Italian features. Prominent five o'clock shadow — the 'Barber' look that made him so intimidating. 6'2\" 180 lbs — lean, gaunt, all angles and menace. Deep-set eyes under a Giants cap. The face of a man who would throw at your head and then buy you dinner. Age 34 in 1951 — the late-bloomer's peak.",
    attire: "New York Giants home whites, 1951 flannel. Mid-delivery — the high leg kick, the overhand curveball release point. Or: the follow-through, glaring at the batter who just fouled off a pitch too close to the plate. The Polo Grounds' distinctive horseshoe shape in the background.",
    mood: "Cold menace on the mound. The eyes say 'I will hurt you if I need to.' But there's craft behind the cruelty — this is a chess player, not a brawler. The portrait should feel like a predator coiled to strike. Not angry — calculating.",
    style: "Darker sepia than other cards, with deep shadows on Maglie's face emphasizing the stubble and the angular jaw. The Polo Grounds' upper deck looming behind. 1951 Bowman card aesthetic in unified ILB portrait style. This card should feel dangerous to hold.",
    reference: "The most intimidating card in the Dreamers set. Pair with Warren Spahn for the ultimate 1-2 rotation. Maglie is the enforcer; Spahn is the craftsman. Together they define the psychological warfare of 1950s pitching.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY (PITCHER)
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  stuff: { metric: "ERA (primary) + K/9 bonus", tiers: [{ range: "4.00+", value: 1 },{ range: "3.50-3.99", value: 2 },{ range: "2.50-2.99", value: 3 },{ range: "2.00-2.49", value: 4 },{ range: "< 2.00", value: 5 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (primary) + WHIP bonus", tiers: [{ range: "4.0+", value: 0 },{ range: "3.50-3.99", value: 1 },{ range: "2.50-2.99", value: 2 },{ range: "2.00-2.49", value: 3 },{ range: "< 2.00", value: 4 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (season)", tiers: [{ range: "< 150 IP", value: 1 },{ range: "150-199", value: 2 },{ range: "200-249", value: 3 },{ range: "250-299", value: 3 },{ range: "300+", value: 4 }], bonus: "30+ CG or 350+ IP → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + GG equivalent", tiers: [{ range: "Below average", value: 0 },{ range: "Average / solid", value: 1 },{ range: "Above average", value: 2 },{ range: "Elite", value: 3 }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS hero / defining moment → +1 (cap 3)" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Cy Young" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);

const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function SalMaglieCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Dreamers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.darkBrown}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Dark sepia, mid-delivery, five o'clock shadow, Giants whites, Polo Grounds]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            {/* Name Block — 32px for pitchers */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            {/* ILB Stats — Pitcher */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Grid — 8 slots */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.real_stats.season.w}-${d.real_stats.season.l}` },
                { label: "ERA", val: d.real_stats.season.era },
                { label: "K", val: d.real_stats.season.k },
                { label: "BB", val: d.real_stats.season.bb },
                { label: "IP", val: d.real_stats.season.ip },
                { label: "CG", val: d.real_stats.season.cg },
                { label: "WHIP", val: d.real_stats.season.whip },
                { label: "WAR", val: d.real_stats.season.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.season.games} GAMES</div>

            {/* Career Stats Grid — 8 slots */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}cc`, borderRadius: 4, padding: 10, marginTop: 8 }}>
              {[
                { label: "CAR W", val: d.real_stats.career.w },
                { label: "CAR L", val: d.real_stats.career.l },
                { label: "CAR ERA", val: d.real_stats.career.era },
                { label: "CAR K", val: d.real_stats.career.k },
                { label: "CAR CG", val: d.real_stats.career.cg },
                { label: "CAR SHO", val: d.real_stats.career.sho },
                { label: "NO-HIT", val: d.real_stats.career.no_hit },
                { label: "CAR WAR", val: d.real_stats.career.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — {d.real_stats.career.seasons} SEASONS</div>

            {/* Awards */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1954 WS Champ", "⭐ 2× All-Star", "🏅 Led NL Wins '51", "📜 23-11 vs Dodgers", "🔥 No-Hitter '56", "🎯 .657 Career W%"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK OF CARD — DOSSIER ═══════════ */
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
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.traitGreen }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Maglie's real life, become universal cards playable in any game.</p>
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
                <Section title="Stat Conversion Engine — Pitcher">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB pitcher card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Maglie's Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
