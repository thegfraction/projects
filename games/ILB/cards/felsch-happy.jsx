import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}felsch-happy.png`;

const PLAYER_DATA = {
  name: "Happy Felsch",
  nickname: "Hap",
  year: 1920,
  team: "Chicago White Sox",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "CF",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "170 lbs",
  born: "August 22, 1891 — Milwaukee, WI",
  died: "August 17, 1964 — Milwaukee, WI (age 72)",
  hof: "BANNED FOR LIFE (reinstated posthumously May 13, 2025). .293 career BA. 825 H. 38 HR. 443 RBI. 88 SB. 14 OF double plays in 1919 (still tied all-time record). 1917 WS champion. 1919 WS: .192 BA — misplayed flyballs, took $5,000. GUILTY. 'The joke seems to be on us.'",

  real_stats: {
    season: 1920, games: 142, wins: "N/A", losses: "N/A", era: "N/A",
    innings: "N/A", strikeouts: "N/A", walks: "N/A", complete_games: "N/A",
    shutouts: "N/A", whip: "N/A", ops_plus_against: "N/A", war: "~5.5",
    // Position player stats
    at_bats: 556, hits: 188, doubles: 40, triples: 15,
    home_runs: 14, rbi: 115, runs: 88, stolen_bases: 8,
    batting_avg: ".338", obp: "~.378", slg: "~.540", ops_plus: "~137",
    career_avg: ".293", career_hits: 825, career_hr: 38,
    career_rbi: 443, career_sb: 88, career_3b: 64,
    career_games: 749, career_seasons: 6,
    season_1917: ".308 BA, 102 RBI (1st Sox player to 100), 6 HR, 26 SB, WS champ",
    season_1919: ".275 BA, 7 HR, 34 2B, led AL OF assists (32), 14 OF DP (all-time record)",
    ws_1917: ".273 BA, HR in G1 (winning run), 3 RBI, 4 R — champion",
    ws_1919: ".192 BA, 1 XBH, misplayed flyballs — THREW GAMES",
    of_dp_record: "14 OF double plays in 1919 (still tied for all-time single-season record)",
    of_assists_game: "4 assists in one game (tied ML record)",
    bribe: "$5,000 received from gamblers",
    reinstated: "May 13, 2025 — posthumously by Commissioner Rob Manfred",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB POSITION PLAYER STAT CONVERSION
  //
  // CON: BA tiers (.330+=5, .300-.329=4, .270-.299=3, .240-.269=2, .210-.239=1, <.210=0) + OPS+ ≥ 130 bonus (cap 5)
  // POW: HR tiers (40+=5, 30-39=4, 20-29=3, 10-19=1, 0-9=0) + SLG ≥ .500 bonus
  // SPD: SB tiers (46+=5, 31-45=4, 16-30=2, 6-15=1, 0-5=0)
  // DEF: Fielding evaluation (0-3)
  // CLU: Postseason performance (0-3)
  // OVERALL: CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — Felsch was on pace for an excellent career when the ban ended everything. .338 with 14 HR and 115 RBI in 1920, his best season, at age 28. Led AL CF in putouts and assists. First Sox player to drive in 100. But: only 6 ML seasons. And: GUILTY in the 1919 fix.
    con: 5,      // .338 BA in 1920 → tier 5 (.330+). OPS+ ~137 → ≥130 bonus, already at 5, capped. Career .293. The .338 is the peak-season number the system uses. Strong contact, improving every year. Banned at his peak.
    pow: 2,      // 14 HR in 1920 → tier 1 (10-19). SLG ~.540 → ≥.500 bonus → +1 = 2. 38 career HR in 6 seasons. 40 2B and 15 3B in 1920. Legitimate power for the dead-ball/early-lively-ball transition era. More HR in the 1910s than any other White Sox player (24).
    spd: 2,      // 26 SB in 1917 → tier 2 (16-30). 88 career SB in 6 seasons. 64 career 3B (excellent triples rate). Good speed — the range to play CF effectively and the legs to stretch hits. Not a burner.
    def: 2,      // Very good CF. Led AL in OF putouts and assists (1919). 32 OF assists in 1919. 14 OF double plays in 1919 (still tied all-time record). 4 assists in one game (tied ML record). "Superb centerfielder with exceptional range and a rifle arm." .975 fielding %. But: not Speaker (3). Felsch was excellent; Speaker was transcendent.
    clu: 0,      // ZERO. The most damning CLU rating in the Muggers. 1917 WS champion (HR in G1 was the winning run — legitimate). BUT: 1919 WS — .192 BA, 1 XBH in 8 games, misplayed flyballs in key situations. GUILTY. Received $5,000. Unlike Jackson (.375) or Weaver (.324/1.000 fielding), Felsch ACTUALLY THREW ON THE FIELD. The guilt is both moral and statistical. CLU 0.
  },

  stat_justification: {
    con: ".338 BA in 1920 → tier 5 (.330+). OPS+ estimated ~137 → ≥130 bonus threshold met, but already at cap. Career .293 BA in 6 seasons. Hit .300+ three times (.300 in 1916, .308 in 1917, .338 in 1920). 825 career hits in only 749 games. The trajectory was ascending: .248 → .300 → .308 → military → .275 → .338. He was becoming an elite hitter when the ban ended everything. Rating: 5.",
    pow: "14 HR in 1920 → tier 1 (10-19). SLG ~.540 in 1920 → ≥.500 bonus → +1 = 2. 38 career HR in 6 seasons — more than any other White Sox player hit in the 1910s (24 in the decade). 40 2B and 15 3B in 1920 show plus extra-base power. In the dead-ball/transition era, this was genuine pop. Rating: 2.",
    spd: "26 SB in 1917 (peak) → tier 2 (16-30). 88 career SB in 6 seasons (~15 per year average). 64 career triples — substantial speed. Range to play CF effectively in the dead-ball era's cavernous outfields. Good speed, not elite. Rating: 2.",
    def: "Very good CF, not quite elite. Led AL in OF putouts and assists in 1919. 32 outfield assists in 1919 — a rifle arm. 14 outfield double plays in 1919 — still tied for the all-time single-season record more than a century later. 4 assists in one game — tied ML record. 'Superb centerfielder with exceptional range and a rifle arm.' .975 career fielding %. But Tris Speaker (DEF 3) was the standard for CF defense in this era, and Felsch, while very good, was a clear tier below Speaker. Rating: 2.",
    clu: "ZERO. This is the most damning rating on the card. 1917 WS: .273 BA, HR in Game 1 (winning run), 3 RBI — legitimate championship contribution. BUT: 1919 WS — .192 BA, 1 extra-base hit (a double) in 8 games, misplayed flyballs in key situations. SABR: 'There was little doubt of Felsch's guilt on the field, as he not only hit poorly, but also misplayed flyballs in key situations.' He received $5,000 from gamblers. He admitted his role. Unlike Jackson (.375 WS BA) or Weaver (.324/1.000 fielding), Felsch's ON-FIELD PERFORMANCE was compromised. The guilt is not merely associative — it is statistical and visible. Rating: 0.",
  },

  personality: {
    leadership_style: "THE FOLLOWER. Felsch was not a leader — he was a follower who fell in with the wrong crowd. He fraternized with the Risberg/Gandil clique rather than the Schalk/Collins faction. He was reluctant to join the fix at first but went along because of the money and the peer pressure. In ILB terms: Felsch is the roster's vulnerability — a talented player who can be corrupted by proximity to bad influences.",
    temperament: "'Born with a smile,' according to his father. Happy Felsch earned his nickname in childhood — a smiling, easy-going, jovial man who loved silly riddles, whiskey, ribald jokes, and playing baseball. The warmth was genuine. The happiness was not an act. But the smile obscured a lack of education (6th grade), a susceptibility to peer pressure, and a fatal inability to say no when the money was offered.",
    work_ethic: "NATURAL AND DEVELOPING. Felsch improved steadily: .248 → .300 → .308 → .275 → .338. He was a gifted athlete who worked at his craft. The 1920 season (.338/14 HR/115 RBI at age 28) suggests he was entering his prime when the ban destroyed everything. The work was there; the character wasn't strong enough to protect it.",
    lifestyle: "MILWAUKEE SALOON CULTURE. Born in Milwaukee to German immigrant parents. Sixth-grade education. After the ban: semi-pro baseball in Montana, Saskatchewan, Manitoba — the outlaw circuit, far from anyone who might recognize or report him. Then: grocery stores and taverns in Milwaukee. A crane operator. 'The bar in Milwaukee was known as a hang-out for amateur ballplayers and other fans of the game.' He became one of Eliot Asinof's best sources for *Eight Men Out*. Died of a liver ailment at 72.",
    era_adaptability: "STRONG. Felsch was a five-tool center fielder in 1920 — .338 BA, 14 HR, 15 3B, elite defense. His power was emerging as the lively ball era began. Had he played through the 1920s, his numbers would have been excellent — a .300+ hitter with 15-20 HR and Gold Glove defense at a premium position. He might have been a Hall of Famer. Instead: 6 seasons, a ban, and taverns.",
    clubhouse_impact: "THE WEAK LINK. Felsch was the roster's Achilles heel — a good man who couldn't resist bad influences. He brought warmth and humor to the clubhouse (+1 morale from the smile and the riddles) but also brought vulnerability (-2 corruption resistance). His friendship with Risberg and Gandil created the pathway for the fix. In ILB terms: Felsch increases team morale but decreases team integrity.",
    dark_side: "The guilt is real. Unlike Jackson (who hit .375) or Weaver (who hit .324 with 1.000 fielding), Felsch actually played poorly in the fixed Series. .192 BA. Misplayed flyballs. He took $5,000 — more than his entire regular-season salary. He admitted his role: 'Well, the beans are spilled and I think I'm through with baseball.' He was reluctant at first but went along. The $5,000 bought him a lifetime exile. He said later that 'he saw nothing left in life for him.' The happy man's happiness was the first casualty.",
  },

  chemistry_traits: [
    { tag: "Born with a Smile", desc: "Felsch's natural warmth and humor boost team morale. +1 team morale. The smile is genuine. But: it masks a susceptibility to bad influences." },
    { tag: "The Scandal (Felsch)", desc: "GUILTY. After any WS appearance, 40% chance Felsch is banned for life — HIGHER than Jackson (30%) or Weaver (30%) because Felsch actually threw games on the field. The risk is real and the guilt is proven." },
    { tag: "The Rifle Arm", desc: "32 OF assists in 1919. 4 in one game. 14 OF double plays (all-time record). Runners hold on fly balls. +1 DEF inherent from the arm. Base runners who tag up face -1 SPD penalty." },
    { tag: "The Wrong Crowd", desc: "Felsch aligns with the Risberg/Gandil clique, not the Schalk/Collins faction. When both factions are on the roster, -1 team chemistry. Felsch amplifies the division." },
    { tag: "Five Thousand Dollars", desc: "The bribe amount. More than his regular-season salary. When Felsch is offered money or incentives, 30% chance he takes the wrong path. The susceptibility is permanent." },
    { tag: "The Ascending Line (Felsch)", desc: ".248 → .300 → .308 → .275 → .338. Felsch was improving every healthy year. +0.01 CON per season played (cumulative). He was becoming a star. The ban killed the trajectory." },
    { tag: "Riddles and Whiskey", desc: "Felsch loved silly riddles, whiskey, and ribald jokes. +1 clubhouse entertainment. But: -1 discipline. The lifestyle fed the vulnerability." },
    { tag: "Reinstated (2025)", desc: "Posthumously reinstated by Commissioner Manfred on May 13, 2025. The ban lasted 105 years. +1 historical justice. The smile returns, a century too late." },
  ],

  preferred_locations: [
    { location: "Center Field", affinity: "HIGH", note: "Superb CF with exceptional range and a rifle arm. Led AL in OF putouts, assists, and DP." },
    { location: "Batter's Box (RH)", affinity: "HIGH", note: ".338 in 1920. .308 in 1917. First Sox player to drive in 100. Rising power." },
    { location: "Comiskey Park / Chicago", affinity: "HIGH", note: "1915-20. Six seasons. WS champ 1917. The only ballpark he ever knew in the majors." },
    { location: "Milwaukee Tavern", affinity: "MEDIUM", note: "Born and died in Milwaukee. Ran taverns after the ban. The bar was a hangout for ballplayers." },
    { location: "The World Series", affinity: "DAMNED", note: "1917: .273, HR (winning run). 1919: .192, misplayed flyballs. GUILTY. The stage of his glory and his damnation." },
  ],

  momentum: {
    hot_triggers: [
      "Regular season — Felsch was excellent in regular-season play; his trajectory was ascending every year",
      "Center field defense — the rifle arm and range activated; runners hold, balls are caught, double plays turned",
      "Good company — when surrounded by positive influences (Schalk, Collins), Felsch performs at his peak",
      "Power surge — the 1920 season showed emerging power (14 HR, 40 2B); in the lively ball era, Felsch was becoming dangerous",
    ],
    cold_triggers: [
      "The fix — when exposed to corruption or gambling, Felsch's performance degrades catastrophically",
      "World Series pressure (scandal) — the 1919 WS line (.192) is the worst of any Black Sox star",
      "Bad company — when surrounded by the Risberg/Gandil clique, -1 to integrity and +1 to corruption risk",
      "Post-ban despair — 'he saw nothing left in life for him'; after exile, all stats degrade permanently",
    ],
    pressure_response: "BIFURCATED. The 1917 WS: .273 with a Game 1 HR that won the game. Legitimate championship performance. The 1919 WS: .192 with misplayed flyballs. The difference is the $5,000. When Felsch is playing clean, his pressure response is solid — he hit the winning HR in the 1917 WS opener. When he's compromised, the performance collapses. In ILB: Felsch's CLU is 0 because you can never be sure which version shows up in October.",
  },

  action_card_seeds: [
    { title: "The Winning Homer", type: "Game Action", text: "Game 1 of the World Series. Your center fielder steps to the plate and drives the ball out of the park. It is the winning run. The White Sox are champions. The smile on his face is real. This is the moment before the fall. +2 CLU. +2 POW. +1 joy. The last clean October.", origin: "1917 WS Game 1: Felsch's HR off Slim Sallee was the winning run in a 2-1 victory. The White Sox won the Series 4-2." },
    { title: "Fourteen Double Plays", type: "Game Action", text: "Your center fielder turns his 14th outfield double play of the season. It is a record that will still be tied — never broken — more than a century later. The arm is a rifle. The instincts are supernatural. +3 DEF. +2 all-time record. The arm that threw out runners by the dozen.", origin: "1919: Felsch turned 14 outfield double plays, still tied for the all-time single-season record." },
    { title: "Five Thousand Dollars", type: "Drama", text: "A gambler offers your center fielder $5,000 to lose the World Series. It is more than his entire regular-season salary. He is reluctant. He doesn't want to do it. But the money — and his friends are all in. He takes it. He bats .192. He misplays flyballs. He loses his career, his livelihood, his name. 'The joke seems to be on us.' -5 career. -3 CLU. -∞ innocence. The price of $5,000.", origin: "Felsch received $5,000 from gamblers to throw the 1919 WS. He was reluctant but went along. He hit .192 and misplayed flyballs." },
    { title: "The Beans Are Spilled", type: "Drama", text: "'Well, the beans are spilled and I think I'm through with baseball. I got $5,000. I could have got just about that much by being on the level if the Sox had won the Series. And now I'm out of baseball — the only profession I know anything about, and a lot of gamblers have gotten rich. The joke seems to be on us.' +3 honesty. -5 career. The confession that changed nothing.", origin: "Felsch's statement to the Chicago American after the scandal broke. One of the most honest and devastating quotes in baseball history." },
    { title: "Three-Thirty-Eight at Twenty-Eight", type: "Game Action", text: "Your center fielder is 28 years old. He is having the best season of his career. .338 BA. 14 home runs. 115 RBI. 40 doubles. 15 triples. He is becoming a star. Then: the ban. He will never play another major league game. +3 CON. +2 POW. -∞ future. The peak that was also the end.", origin: "1920: Felsch hit .338/14 HR/115 RBI — by far his best season — then was banned for life." },
    { title: "The Scobey, Montana Outlaws", type: "Drama", text: "Your banned center fielder surfaces in Scobey, Montana — population 1,200 — playing semi-pro baseball under the commissioner's radar. He plays in Saskatchewan. Manitoba. Plentywood. Small towns where nobody will report him. The smile is still there. The riddles are still funny. But the stages keep getting smaller. -3 recognition. +1 stubborn joy. The game survives in exile.", origin: "After the ban, Felsch played semi-pro in Scobey, Montana (1925-26), Regina, Saskatchewan (1927), and other remote locations." },
    { title: "Born with a Smile", type: "Drama", text: "'Born with a smile,' his father said. Your center fielder smiles through everything — through the sandlots, through the World Series, through the ban, through the taverns. The smile is not a mask. It is the man. Even the guilt cannot erase it. Even the exile. Even the liver ailment at 72. +2 morale. +1 humanity. The smile outlasts the career.", origin: "Felsch's father said he was 'born with a smile.' He earned the nickname 'Happy' as a child." },
    { title: "One Hundred Five Years", type: "Drama", text: "Your center fielder is banned for life. He dies in 1964. Sixty-one years later — May 13, 2025 — Commissioner Manfred reinstates him and the other deceased ineligible players. The ban lasted 105 years. The smile lasted 72. The justice came 61 years too late. +1 posthumous redemption.", origin: "Felsch was posthumously reinstated by Commissioner Rob Manfred on May 13, 2025, along with other deceased players on the ineligible list." },
  ],

  art_direction: {
    face: "SMILING, ROUND, WARM, DOOMED. 5'11\" 170 lbs — athletic but not imposing. The face should be ROUND and FRIENDLY — the 'ever-smiling' face of a happy kid from Milwaukee. German-American features, working-class, the son of immigrants. Big smile, bright eyes, the look of a man who loved riddles and whiskey and baseball in roughly equal measure. Not sharp or intellectual — WARM and SIMPLE. The happiness should be GENUINE, not forced. But: somewhere in the eyes, a flicker of the man who said 'he saw nothing left in life for him.' The smile covers a vulnerability that will be exploited.",
    attire: "Chicago White Sox uniform circa 1920 — white wool jersey with 'SOX' or 'CHICAGO' across the chest, flat cap. THE POSE: the throw from center field — Felsch's rifle arm cocked and releasing, the ball rocketing toward the infield, a runner caught between bases. The 32-assist, 14-double-play season made visual. Or: the swing — right-handed, compact, the .338 swing that produced 40 doubles and 14 home runs. Or: standing in center field, the vast outfield stretching behind him, the smile on his face, the last season before the fall.",
    mood: "WARM AND TARNISHED. Felsch's card should feel like a BEER GLASS IN A MILWAUKEE TAVERN — warm amber, slightly cloudy, friendly, but with a sediment of sadness at the bottom. Where Jackson's card is sunset gold (beauty fading) and Weaver's is ivory-to-ash (light interrupted), Felsch is AMBER GONE CLOUDY — the warmth of a good man who made a bad choice, seen through the haze of a century of consequences.",
    style: "Sepia-toned with WARM AMBER and BEER-FOAM undertones — the gold of Milwaukee lager, the warmth of a tavern, the friendly glow of a man who was born smiling. But the amber is SLIGHTLY CLOUDED — not pure like Collins's intellectual amber, but hazier, more human, more flawed. The Felsch palette is CLOUDED AMBER — warm, inviting, and not quite clear.",
    reference: "Think the smile — Felsch in center field, grinning, the rifle arm ready, the .338 season in full bloom. Then: the same man in a Montana semi-pro uniform, playing for Scobey's 1,200 residents. Then: the tavern in Milwaukee, the old ballplayer telling stories to amateurs. The card should capture the WARMTH and the WASTE — the talent that was real and the character flaw that was fatal. Charlie Sheen played him in Eight Men Out (1988).",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#f0e8d4", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a08050",
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

export default function HappyFelschCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.hotRed}ee`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>⛔ GUILTY</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES — HIS BEST YEAR — THEN BANNED</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR 3B", val: d.real_stats.career_3b },{ label: "SEASONS", val: d.real_stats.career_seasons },{ label: "'19 WS", val: ".192" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 6 SEASONS • 14 OF DP IN 1919 (ALL-TIME RECORD)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1917 WS Champ", "⛔ Banned For Life", "😊 Born with a Smile", "💪 Rifle Arm CF", "🎯 14 OF DP (Record)", "💰 $5,000 Bribe", "🍺 Milwaukee", "✅ Reinstated 2025"].map((a, i) => (
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
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "DAMNED" ? `${C.hotRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "DAMNED" ? C.hotRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Felsch's real life, become universal cards playable in any game.</p>
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
                <Section title="Felsch's Stat Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, con: s.con, pow: s.pow, spd: s.spd, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
