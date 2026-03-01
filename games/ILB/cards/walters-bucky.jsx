import { useState } from "react";

const WALTERS_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: BUCKY WALTERS
  // Year Snapshot: 1939 (NL MVP — Pitching Triple Crown)
  // ═══════════════════════════════════════════════════════════════

  name: "Bucky Walters",
  nickname: "The Converted Man",
  year: 1939,
  team: "Cincinnati Reds",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'1\"",
  weight: "180 lbs",
  born: "April 19, 1909 — Philadelphia, PA",
  died: "April 20, 1991 — Abington, PA (one day after his 82nd birthday)",
  hof: "Not inducted. Reds HOF 1958. 198-160, 3.30 ERA, 242 CG, 42 SHO, 1,107 K. 1939 NL MVP. 6× All-Star.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1939 MVP / TRIPLE CROWN SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1939,
    games: 39,
    wins: 27,
    losses: 11,
    era: "2.29",
    innings: "319.0",
    strikeouts: 137,
    walks: 80,
    complete_games: 31,
    shutouts: 2,
    whip: "1.14",
    war: 11.6,
    career_wins: 198,
    career_losses: 160,
    career_era: "3.30",
    career_strikeouts: 1107,
    career_cg: 242,
    career_shutouts: 42,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF) — ERA tiers
  //   <1.50=5 | 1.50-1.99=4 | 2.00-2.49=3 | 2.50-2.99=2 | 3.00-3.49=1 | 3.50+=0
  //   K/9 ≥ 6.0 → +1 (cap 5)
  //
  // CONTROL (CTL) — BB/9 tiers
  //   <1.0=5 | 1.0-1.49=4 | 1.5-1.99=3 | 2.0-2.49=2 | 2.5-2.99=1 | 3.0+=0
  //   WHIP ≤ 1.00 → +1 (cap 5)
  //
  // STAMINA (STA) — IP tiers
  //   <150=0 | 150-199=1 | 200-249=2 | 250-299=3 | 300-349=4 | 350+=5
  //
  // DEFENSE (DEF) — Same as position players
  //
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  //
  // CLUTCH (CLU) — Postseason ERA + signature moments
  //   PS ERA > 4.00 = 0 | 2.00-4.00 = 1 | < 2.00 = 2
  //   WS clincher / perfecto → +1 (cap 3)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite/MVP — 1939 NL MVP. Pitching Triple Crown. 27-11, 2.29 ERA, 137 K. 1940 WS champion (2-0, 1.50 ERA, CG SHO + HR in Game 6). 198 career wins. Led NL in W 3×, ERA 2×, CG 3×, IP 3×. 6× All-Star. Retrospective Cy Young 3×. Near-HOF.
    stf: 3,      // 2.29 ERA → tier 3 (2.00-2.49). K/9 = 137/319 = 3.86 → no K bonus (<6.0). Walters was a sinker/slider pitcher, not a K artist. 6th-best sinker of all time per Neyer/James. STF 3.
    ctl: 2,      // BB/9 = 80/319×9 = 2.26 → tier 2 (2.0-2.49). WHIP 1.14 → no bonus (>1.00). CTL 2.
    sta: 4,      // 319 IP → tier 4 (300-349). 31 CG. Led NL in IP 3 consecutive years (1939-41). Career 3,104 IP, 242 CG. STA 4.
    def: 2,      // Former 3B. STATS All-Decade Gold Glove Team for 1930s pitchers. Led NL pitchers in assists, DPs multiple times. 1.000 fielding in 1944. 70 chances without error. Equivalent to 3-5 GG. DEF 2.
    clu: 3,      // 1940 WS: 2-0, 1.50 ERA → tier 2 (PS ERA < 2.00). Game 6: CG 5-hit shutout in elimination game + homered + 2 RBI → +1 WS clincher bonus. CLU 3.
  },

  stat_justification: {
    stf: "2.29 ERA in 1939 → tier 3 (2.00-2.49). K/9 only 3.86 — no bonus (<6.0). Walters was not a strikeout pitcher. He relied on a sinker (Neyer/James: 6th-best of all time), the pitch later known as a slider taught by Chief Bender in 1935, a fastball, a curve, and occasionally a knuckleball. Elite results through movement and deception, not velocity. Rating of 3.",
    ctl: "BB/9 of 2.26 in 1939 (80 BB in 319 IP) → tier 2 (2.0-2.49). WHIP 1.14 → no bonus (>1.00). Led NL in WHIP in 1939 and 1940. Good control but not elite — he walked more than Young or Hubbell. Rating of 2.",
    sta: "319 IP in 1939 → tier 4 (300-349). 31 CG. Led NL in IP 3 consecutive years (1939: 319, 1940: 305, 1941: 302). Career 3,104 IP, 242 CG. The workhorse of the late-1930s NL. Rating of 4.",
    def: "Former third baseman. STATS Inc. All-Decade Gold Glove Team for 1930s pitchers. Led NL pitchers in assists (1936), double plays (1937, 1939, 1941, 1943). 1.000 fielding in 1944 (70 chances, zero errors). The best-fielding pitcher of his era. Rating of 2.",
    clu: "1940 WS: 2-0, 1.50 ERA. Game 6 (elimination game, Reds down 3-2): CG 5-hit shutout, homered, drove in 2 runs. One of the greatest individual WS game performances by a pitcher. PS ERA < 2.00 → tier 2. WS clincher bonus → +1. Rating of 3. But also: 1939 WS swept by Yankees (started Game 2, lost; lost Game 4 in relief during Lombardi's 'swoon'). The 1940 redemption makes it maximum clutch.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Quiet Ace. Walters led through dominance, professionalism, and example. Warren Giles, Reds president: 'As great as your record is and as outstanding as have been your accomplishments, they reveal only a part of the Bucky Walters I know.' He was the pitching anchor of the 1939-40 pennant winners alongside Paul Derringer. Not flashy — but utterly reliable. The man you gave the ball to when you had to win.",
    temperament: "Determined, proud, competitive. He was a third baseman who refused to believe he should pitch until a chicken-shack ambush convinced him. He was a pitcher who refused to believe he couldn't reach 200 wins — he tried 8 times in 1949-50 and fell 2 short. He fought for his position, his salary, and his place in the game. Scottish-Irish-Dutch stubbornness in a Philly frame.",
    work_ethic: "Self-reinvented. Walters played 184 major league games as a third baseman before converting to pitcher at age 25. Then he became the NL MVP within 5 years. He learned the slider from Chief Bender (Hall of Famer). He mastered the sinker until it became the 6th-best of all time. He batted .325 in his MVP season because he never forgot he was a hitter. The transformation from average 3B to elite pitcher is one of baseball's greatest second-act stories.",
    lifestyle: "Philadelphia boy, start to finish. Born in Germantown. Family traced back to William Penn's colony. Father worked for Bell Telephone and played on the company team — young Bucky was the team mascot at age 6. Brother Jack played in the Reds organization. After baseball: insurance business, family life in the Philly suburbs. Died in Abington, PA — one day after his 82nd birthday. A Philadelphia life.",
    era_adaptability: "MODERATE. The sinker/slider combination translates beautifully — modern pitchers would kill for Walters' movement. The 319 IP wouldn't happen today, but the 2.29 ERA and 1.14 WHIP would. He'd be a 200-inning, sub-3.00 ERA sinker-baller who fields his position like an infielder. Think a right-handed Dallas Keuchel with better stuff and a bat. The former-3B athleticism gives him an edge no modern pitcher has.",
    clubhouse_impact: "ANCHOR. Walters and Derringer (25-7 in 1939) formed one of the great 1-2 pitching duos. Walters was the steadier personality — Derringer was more volatile. Together they carried the Reds to back-to-back pennants. Bill James credits Bill Werber as the cultural catalyst, but Walters was the on-field engine. The Reds won because Walters won.",
    dark_side: "The 198. Walters finished his career with 198 wins — 2 short of the 200 milestone that might have pushed him into the Hall of Fame. He tried 8 times in 1949-50 to get those last 2 wins and couldn't. He peaked at 23.7% in HOF voting but fell off. Tommy Lasorda: 'Bucky was a great player, a great pitcher, and certainly deserving of being inducted into the Hall of Fame.' The Veterans Committee has never closed the case. And the 1939 WS haunts — swept by the Yankees, Lombardi's 'swoon' in Game 4 while Walters was pitching in relief. The greatest season of his life ended with the most humiliating loss.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Converted Man", desc: "Former third baseman. Walters can pinch-hit in emergencies (.243 career BA, 23 HR as a pitcher). +1 batting for a pitcher. Occasionally used as pinch-hitter in the 1940s." },
    { tag: "Chief Bender's Slider", desc: "Learned the slider from Hall of Famer Chief Bender in 1935. The pitch later became standard equipment for every pitcher. +1 STF when facing hitters who have never seen a slider before (first game against any team each season)." },
    { tag: "The Sixth-Best Sinker", desc: "Neyer/James: 6th-best sinker of all time. Walters induces ground balls constantly. -1 HR allowed per game. Opposing hitters get -1 POW when facing Walters." },
    { tag: "The Chicken Shack Conversion", desc: "Jimmie Wilson ambushed Walters at a chicken restaurant to convince him to switch from 3B to SP. Wilson promised $100 per win. Once per career: a player can be converted to a new position through a Chemistry Event. 40% chance it transforms their career. 60% chance they demand their old position back." },
    { tag: "Walters-Derringer", desc: "When paired with Paul Derringer (SP): +1 to both pitchers' stats. The 1-2 punch that carried Cincinnati to back-to-back pennants (1939-40). Combined 52-18 in 1939." },
    { tag: "The 198", desc: "Walters finished 2 wins short of 200. In his final seasons: -1 STA as age catches up. If he reaches 198 career wins: 30% chance he retires frustrated, 70% chance he keeps trying (and probably fails)." },
    { tag: "Pitcher-Umpire", desc: "On May 1, 1942, Walters umpired a major league game alongside Chuck Klein when umpire Lou Jorda had the flu. Once per career: Walters can serve as emergency umpire. +2 entertainment, +1 fairness rating." },
    { tag: "Stole Home", desc: "April 20, 1946: Walters stole home. A pitcher stole home. Once per career: if Walters is on third base, 10% chance he attempts to steal home. 60% success rate if attempted." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Crosley Field / Cincinnati", affinity: "HIGH", note: "160-107 as a Red. 1939-40 pennants. 1940 WS champion. MVP. Triple Crown. The best years of his life." },
    { location: "The Mound — Any Park", affinity: "HIGH", note: "3,104 career IP. 242 CG. 42 SHO. The mound was his second home after the conversion." },
    { location: "Third Base (Former Home)", affinity: "MEDIUM", note: "184 games as a 3B. .243 career BA as a pitcher. He never forgot where he came from." },
    { location: "Philadelphia / Home", affinity: "MEDIUM", note: "Born in Germantown, died in Abington. Philly boy through and through. Family traced to Penn's colony." },
    { location: "Chicken Restaurants", affinity: "MEDIUM", note: "The chicken shack where Jimmie Wilson ambushed him into becoming a pitcher. Sacred ground for career changes." },
    { location: "World Series Stage", affinity: "MEDIUM", note: "Mixed: swept in 1939 (Lombardi's swoon). Dominant in 1940 (2-0, 1.50 ERA, CG SHO + HR in Game 6)." },
    { location: "Hall of Fame", affinity: "NONE", note: "198 wins. 23.7% peak HOF vote. Never inducted. Deserving but forgotten." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — led the Reds to back-to-back pennants in 1939-40. Walters elevates with stakes.",
      "Elimination games — Game 6 of 1940 WS: CG shutout + HR. When his team's season is on the line, Walters delivers.",
      "Post-conversion momentum — after switching to pitching, Walters improved every year for 5 straight seasons.",
      "Paired with Derringer — the 1-2 punch feeds both pitchers. Combined 52-18 in 1939.",
    ],
    cold_triggers: [
      "Yankee dominance — the 1939 WS sweep was humiliating. Walters was 0-2 with a 4.91 ERA vs. the Yankees.",
      "Age decline — after 1944, Walters slipped. The quest for 200 wins became a slow, painful grind.",
      "Position change resistance — early in the conversion, Walters was reluctant. If forced to change roles again, -1 morale.",
    ],
    pressure_response: "REDEMPTION ACE. The 1939 WS was a disaster — swept by the Yankees, Lombardi's 'swoon' in Game 4 while Walters watched from the mound. But 1940 was the redemption. Game 6, Reds down 3 games to 2 against the Tigers: Walters pitched a complete-game 5-hit shutout AND hit a home run AND drove in 2 runs. It is one of the greatest individual World Series game performances in history — a pitcher dominating with his arm AND his bat in an elimination game. The next day, the Reds won Game 7 for their first championship since 1919. Walters was the reason.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Chicken Shack Conversion",
      type: "Drama",
      text: "Your manager wants to convert your struggling third baseman into a pitcher. Direct confrontation hasn't worked. So the manager sends two coaches to have lunch with the player at a chicken restaurant. They casually mention that pitchers make more money and play every fourth day. The manager 'unexpectedly' arrives and seals the deal. The player agrees — but only if he gets $100 for every win. Five years later, he's the NL MVP.",
      origin: "Jimmie Wilson ambushed Walters at a chicken shack in 1934. Coaches Lobert and Spalding softened him up. Wilson promised $100/win. Walters won 198 games.",
    },
    {
      title: "The Elimination Game Masterpiece",
      type: "Game Action",
      text: "Your team is down 3 games to 2 in the World Series. Your ace takes the mound for Game 6. He throws a complete-game 5-hit shutout. He also hits a home run. He also drives in 2 runs. He is the entire team. Your franchise wins its first championship since 1919 the next day.",
      origin: "1940 WS Game 6: Walters CG SHO, 5 hits, HR, 2 RBI vs. Tigers. Reds won Game 7 for the title.",
    },
    {
      title: "The Pitcher's Triple Crown",
      type: "Game Action",
      text: "Your ace leads the league in wins (27), ERA (2.29), and strikeouts (137). He also bats .325. He wins the MVP. A panel of sportswriters names him the 'All Around Player of the Year' — ahead of Joe DiMaggio. He is a converted third baseman who couldn't hit enough to stay in the lineup.",
      origin: "1939: Walters won the NL Pitching Triple Crown and NL MVP. Named 'All Around Player' over DiMaggio.",
    },
    {
      title: "Lombardi's Swoon",
      type: "Drama",
      text: "Game 4 of the World Series. Your ace enters in relief. The Yankees score the go-ahead run when their baserunner crashes into your catcher at home plate. Your catcher lies dazed on the ground while another Yankee runner circles the bases and scores. The photograph of your catcher lying prone while the ball sits nearby becomes the defining image of the Series. Your team is swept.",
      origin: "1939 WS Game 4: Ernie Lombardi's 'swoon' at home plate while Walters pitched in relief. Yankees swept the Reds.",
    },
    {
      title: "The Pitcher Umpires",
      type: "Action",
      text: "The umpire has the flu. No replacement is available. Your ace pitcher and an opposing outfielder volunteer to umpire the game. They work one inning before a real umpire arrives by plane. Nobody argues a call.",
      origin: "May 1, 1942: Walters and Chuck Klein umpired one inning when Lou Jorda had the flu, until Jocko Conlan arrived.",
    },
    {
      title: "The Pitcher Steals Home",
      type: "Game Action",
      text: "Your pitcher is on third base. Nobody expects a pitcher to steal home. Your pitcher steals home. The catcher is so shocked he doesn't even throw.",
      origin: "April 20, 1946: Walters stole home. One of the rarest feats in baseball — a pitcher stealing home.",
    },
    {
      title: "First Televised Win",
      type: "Action",
      text: "August 26, 1939. A television camera broadcasts a baseball game for the first time. Your ace is pitching. He wins. The game is seen by approximately 1,000 people on their television sets in the New York area. History is made, and hardly anyone notices at the time.",
      origin: "Walters earned the first televised win in MLB history: Reds vs. Dodgers at Ebbets Field, August 26, 1939.",
    },
    {
      title: "One Hundred Ninety-Eight",
      type: "Drama",
      text: "Your ace has 198 career wins. He needs 2 more to reach the benchmark that might put him in the Hall of Fame. He tries 8 times over two seasons. He cannot get the wins. He retires at 198. He peaks at 23.7% in HOF voting. He is never inducted. Two wins. Just two wins.",
      origin: "Walters retired with 198 wins. He tried 8 times in 1949-50 to reach 200 but couldn't. Never inducted to HOF.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall, lean, serious. 6'1\" 180 lbs. Hazel eyes, brown hair. Scottish-Irish-Dutch features. The face of a man who reinvented himself — there's intelligence and determination in the eyes. Not flashy, not intimidating. The quiet confidence of someone who knows he belongs.",
    attire: "Cincinnati Reds 1939 home whites, #31. Crosley Field behind him. The windup — the sinker about to be released, the ball sinking toward the batter's hands. Or: the follow-through of a home run swing, because this pitcher could hit.",
    mood: "Quiet dominance with an undercurrent of reinvention. The card should feel like a second chance — the third baseman who found his true calling on the mound. There's pride here, and a hint of what-might-have-been (the HOF snub, the 198 wins).",
    style: "Cincinnati Reds red and white. Warm, inviting, workmanlike. Not as flashy as the Gashouse Gang cards or as dark as the forgotten-star cards. This is a card about craft, reinvention, and doing your job better than anyone. Professional pride.",
    reference: "The card of the Converted Man. The third baseman who became the NL MVP. The pitcher who hit a home run in a World Series shutout. The man who umpired a game, stole home, and won the first game ever televised. The man who fell 2 wins short of immortality. Bucky Walters — the greatest career change in baseball history.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
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

const ChemTag = ({ tag, desc }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function BuckyWaltersCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = WALTERS_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Tall, lean, determined, Reds #31, Crosley Field, sinker release point, quiet confidence]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
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
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "MVP", val: "1939" },{ label: "WS", val: "1940" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 16 PITCHING SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1940 WS Champion", "👑 1939 NL MVP", "🔥 Pitching Triple Crown", "⭐ 6× All-Star", "🏛️ Reds HOF 1958", "📺 First Televised Win", "🔄 Converted 3B → SP", "⚖️ Umpired a Game"].map((a, i) => (
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
              {tab === "personality" && (<>
                <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
              </>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
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
              {tab === "actions" && (
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Walters' real life, become universal cards playable in any game.</p>
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
              )}
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
                <Section title="Walters' Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}
                </Section>
              )}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span>
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
