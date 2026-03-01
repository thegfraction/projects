// /cards/players/george-uhle.jsx
import { useState } from "react";

const UHLE_DATA = {
  name: "George Uhle",
  nickname: "The Bull",
  year: 1926,
  team: "Cleveland Indians",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "190 lbs",
  born: "September 18, 1898 — Cleveland, Ohio",
  died: "February 26, 1985 — Cleveland, Ohio (age 86)",
  hof: "NOT INDUCTED. 200-166, 3.99 ERA, 232 CG, 55.5 WAR. Exactly 200 wins — the border of significance. Three 20-win seasons. The Sporting News All-Star (1926). Led the AL in wins twice. Babe Ruth said he was the toughest pitcher he ever faced. Invented (or helped invent) the slider. Still not in Cooperstown. Not quite good enough overall — but the 1926 season was.",

  real_stats: {
    season: 1926,
    wins: 27,
    losses: 9,
    era: "2.83",
    era_plus: 144,
    games: 39,
    games_started: 36,
    complete_games: 32,
    shutouts: 3,
    innings_pitched: "318.1",
    strikeouts: 118,
    walks: 77,
    war: 8.4,
    win_pct: ".711",
    batting_avg_1926: ".227",
    career_wins: 200,
    career_losses: 166,
    career_era: "3.99",
    career_cg: 232,
    career_shutouts: 21,
    career_ip: "3,119.2",
    career_batting_avg: ".289 (as pitcher — all-time record for pitcher-only position)",
    career_hits: 393,
    career_rbi: 190,
    ws_pitching: "0.00 ERA, 3 IP, 1 H, 3 K (1920 WS)",
    twenty_win_seasons: 3,
    vs_ruth: ".336 BA, 4 HR in 110 AB (Ruth: 'toughest pitcher I ever faced')",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1926 SEASON
  //
  // STF: Fastball, sidearm curve, and — critically — the SLIDER.
  //      Uhle is credited (contested) with inventing the slider.
  //      "A new pitch called the slider was created, and George Uhle
  //      took full credit for it." A pitch that "rolled off his middle
  //      finger like a bowling ball." Rob Neyer: probably more of a
  //      cut fastball/sailing fastball. But it broke differently from
  //      anything else in the league. 118 K in 318 IP (3.34 K/9) —
  //      respectable for the era but not dominant. Ruth: "toughest
  //      pitcher I ever faced" — despite hitting .336 off him.
  //      The stuff was TRICKY, not overpowering.
  //      STF = 3 (STRONG — effective movement pitcher, slider inventor,
  //      but not a power arm. The K rate says good, not great.)
  //
  // CTL: 77 BB in 318.1 IP (2.18 BB/9) — very good control.
  //      Led AL in HBP twice (1924, 1926 — 13 each). He pitched
  //      inside and wasn't afraid to hit batters. But the walk rate
  //      was solid. The 1926 season was his most controlled.
  //      CTL = 3 (STRONG — precise, pitched inside, low walk rate.)
  //
  // STA: 318.1 IP, 32 CG in 36 GS (!), 39 G. Led AL in IP, CG, GS.
  //      Career: 3,119.2 IP, 232 CG. Pitched 20 innings in a single
  //      game (1929). Pitched fewer than 210 IP in a season only
  //      twice in 8 years. "The Bull" for his heavy workload.
  //      Twice threw two CG in a doubleheader.
  //      STA = 4 (NEAR-MAXIMUM — "The Bull." 32 CG in 36 starts.
  //      That's completing 89% of his starts. Absurd.)
  //
  // DEF: Good fielder — led AL in pitcher putouts twice, led AL in
  //      pitcher fielding percentage twice. But also made 7 errors
  //      in 1926 (led pitchers). Net: adequate.
  //      And then the HITTING: .289 career BA — all-time pitcher
  //      record. Pinch-hit for Tris Speaker. Used as pinch-hitter
  //      regularly. Hit .407 as pinch-hitter in 1924.
  //      DEF = 2 (GOOD — the fielding is average, but the batting
  //      is so extraordinary for a pitcher that it earns a full
  //      extra point. He was a WEAPON at the plate.)
  //
  // CLU: 1920 WS — 3 scoreless IP. But team never returned to
  //      postseason while he was ace. His best seasons (1923, 1926)
  //      produced no pennants. Cleveland always fell short.
  //      CLU = 1 (one ring, but as a young bullpen arm. Never the
  //      ace of a pennant winner. Cleveland's near-misses.)
  //
  // OVR: STF×2(6) + CTL×1.5(4.5) + STA×1(4) + DEF×0.5(1) + CLU×1.5(1.5) = 17 → normalized ~7
  // OVR = 7 (ALL-STAR) — the hometown workhorse. One ELITE season
  // (1926: 8.4 WAR) surrounded by solid ones. The career says very
  // good. The peak says briefly great. The slider says maybe immortal.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    stf: 3,    // Fastball, sidearm curve, and the slider — the pitch he may have invented. Tricky, not overpowering. Ruth called him the toughest he faced but still hit .336. The stuff was DECEPTIVE. Movement, angle, variety. 118 K in 318 IP — solid, not dominant.
    ctl: 3,    // 2.18 BB/9 in 1926. Good command. Pitched inside — led AL in HBP twice. Not wild but not afraid. Precise aggression.
    sta: 4,    // "The Bull." 318 IP, 32 CG in 36 starts. 3,119 career IP. 232 career CG. Pitched 20 innings in a single game. The workhorse.
    def: 2,    // Average fielder (some errors) BUT .289 career BA as a pitcher. All-time record. Pinch-hit for Tris Speaker. Used as PH regularly. .407 PH BA in 1924. The bat elevates the whole category.
    clu: 1,    // 1920 WS ring (3 scoreless IP as 21-year-old reliever). But never the ace of a pennant winner. Cleveland fell short in his best years.
  },

  stat_justification: {
    stf: "George Uhle threw a fastball, a sidearm curve, and — most importantly — what he and many historians credit as the first slider in baseball history. During batting practice, he discovered a pitch that rolled off his middle finger 'like a bowling ball' and slid across the plate unpredictably. Whether this was a true slider or a cut fastball is debated, but it was unlike anything hitters had seen. Babe Ruth, who faced Uhle more than any other pitcher (110 AB), called him 'the toughest pitcher I ever faced' — even though Ruth hit .336 against him. Uhle held Ruth to just 4 HR and struck him out 25 times (2nd most by any pitcher, behind only Lefty Grove). His K/9 rate (3.34 in 1926) was respectable but not dominant. The stuff was tricky, not overpowering — movement over velocity. Rating of 3.",
    ctl: "Uhle walked 77 batters in 318.1 IP in 1926 (2.18 BB/9) — very good control. He pitched inside aggressively, leading the AL in hit batsmen twice (1924 and 1926, 13 each). He was not afraid to pitch inside, but the walk rate was consistently low. The control was what enabled the movement pitches to work — he could put the slider where he wanted. Rating of 3.",
    sta: "The nickname says it all: 'The Bull.' In 1926, Uhle threw 318.1 IP with 32 complete games in 36 starts — completing 89% of his starts. He led the AL in innings pitched, complete games, and games started. Career: 3,119.2 IP, 232 CG. In 1929, he pitched 20 innings in a single game against the White Sox (Ted Lyons went 21 on the other side). He started the 1929 season 9-0. Over his 8-year prime in Cleveland, he threw fewer than 210 IP only twice. This was a man built to pitch every fifth day and go the distance every time. Rating of 4.",
    def: "Uhle's fielding was adequate — he led the AL in pitcher putouts twice and fielding percentage twice, but also committed 7 errors in 1926. The real story is the HITTING. His .289 career batting average is the all-time record for a player who appeared exclusively as a pitcher. He hit .344 in 1920, .361 in 1923, .343 in 1929, and .381 in 1936. He was used as a pinch-hitter regularly — in 1924, he hit .407 as a pinch-hitter (12-for-27). He once PINCH-HIT FOR TRIS SPEAKER (June 6, 1926). He drove in 190 career runs with 393 hits. He was, functionally, a position player who happened to pitch 27 wins a year. Rating of 2.",
    clu: "Uhle won a World Series ring with the 1920 Indians — at age 21, he pitched 3 scoreless innings in relief, allowing 1 hit and striking out 3 of 10 batters faced. But he was never the ace of a pennant-winning team. His best seasons (1923: 26-16, 1926: 27-9) produced no postseason appearances. Cleveland always fell short while Uhle was their best pitcher. The ring is real but distant — a young man's ring, not the ace's ring. Rating of 1.",
  },

  personality: {
    leadership_style: "CONFIDENT SELF-RELIANCE. Uhle was not a rah-rah leader, but he was not a clubhouse cancer either. He was a man who believed in his own ability — sometimes to a fault. He negotiated a no-send-down clause as a rookie. He walked batters to pitch to Babe Ruth. He pinch-hit for Hall of Famers. He claimed to have invented the slider. This was a man with supreme, sometimes irrational confidence in his own talent. The confidence was earned — 200 wins, .289 BA — but it could rub people the wrong way.",
    temperament: "STEADILY AGGRESSIVE. Not hostile like Mays, not surly or withdrawn. Uhle was competitive, direct, and occasionally abrasive. Billy Evans (Indians GM): 'George wasn't a particularly good influence on one or two other players.' He feuded with manager Peckinpaugh, who didn't believe his arm injury was real. The pattern: Uhle believed in himself, sometimes beyond what others could tolerate. He wasn't mean — he was certain. In an era of deference to management, certainty was its own kind of rebellion.",
    work_ethic: "BULL-LIKE. The nickname tells the truth. 318 IP, 32 CG in a single season. Twenty innings in a single game. He took the ball every time and gave it back only when the game was over. The work ethic was not flashy or driven by anger — it was CONSTITUTIONAL. Uhle was simply built to pitch. His body was the instrument, and he played it to exhaustion. The ligament damage that cost him 1924 was the price of the work — and he came back from it.",
    lifestyle: "HOMETOWN BOY. Born in Cleveland. Played semipro ball in Cleveland for Standard Parts (where he also worked as a day laborer). Signed with the Cleveland Indians. Became the ace of the Cleveland Indians. Was traded away and eventually came back to Cleveland to finish his career. Died in Cleveland at 86. George Uhle was Cleveland baseball — the city raised him, the city employed him, the city cheered him, the city let him go, and the city took him back. His father was a railroad switchman. George was a factory worker who threw a slider.",
    era_adaptability: "MODERATE-HIGH. The slider — if he truly invented it — is the most relevant pitch in modern baseball. The durability would obviously not translate (no modern pitcher throws 318 IP), but the pitch mix — fastball, slider, curve, with deception over velocity — is exactly the modern template. He'd be a mid-rotation starter who went deep into games and helped himself at the plate. In today's game, with the DH universal, his batting would be lost — which is a tragedy, because it was the most remarkable thing about him.",
    clubhouse_impact: "MILDLY NEGATIVE TO NEUTRAL. Uhle was not disliked the way Mays was, but he wasn't beloved either. The confidence could be grating. The feuds with management were real. But he won 27 games and took the ball every fifth day, which buys a lot of tolerance. In ILB, Uhle provides +0 to team morale but +2 to team reliability. He's not going to inspire anyone, but he's never going to miss a start.",
  },

  chemistry_traits: [
    { tag: "The Slider", desc: "Uhle is credited (contested) with inventing the slider — the most important breaking ball in modern baseball. A pitch that 'rolled off his middle finger like a bowling ball.' In ILB, Uhle's breaking pitches have +1 effectiveness against batters who have never faced him before. The novelty factor. Once they've seen it, the advantage diminishes — but the first time is devastating." },
    { tag: "Ruth's Nemesis", desc: "Babe Ruth faced Uhle more than any other pitcher (110 AB). Ruth called him 'the toughest pitcher I ever faced.' Only 4 HR in 110 AB. 25 K (2nd most by any pitcher vs Ruth). In ILB, Uhle has +2 to all pitching stats when facing the highest-OVR batter on the opposing team. He pitched UP. The bigger the name, the better he threw." },
    { tag: "The Koenig Gambit", desc: "Uhle walked Mark Koenig to pitch to Ruth with the tying run on base in the 9th. Speaker ran in from CF furious. Uhle: 'I'd rather pitch to Ruth than to Koenig anytime.' They TOLD Ruth to his face. Ruth struck out. In ILB, once per game Uhle may intentionally walk a batter to face the next one with +2 STF. High risk, high reward. Speaker's condition: never do it again." },
    { tag: "The Bull", desc: "318 IP, 32 CG in 36 starts. 20 innings in a single game. 3,119 career IP. In ILB, Uhle's fatigue decays at 75% the normal rate. He just keeps going. The Bull doesn't tire — the Bull wears YOU out. But: if pushed past his limit, ligament damage risk increases (see 1924, 1927)." },
    { tag: "The Pitcher Who Hit", desc: ".289 career BA — all-time record for pitcher-only position players. Pinch-hit for Tris Speaker. .407 PH BA in 1924. In ILB, Uhle can bat for himself or pinch-hit without penalty. He adds +1 to any lineup position he occupies. The bat is a weapon disguised as a pitcher's at-bat." },
    { tag: "Cleveland Born", desc: "Born in Cleveland. Worked at Standard Parts in Cleveland. Pitched for the Cleveland Indians. Returned to Cleveland. Died in Cleveland. In ILB, Uhle has +1 to all stats when playing in his home stadium. The hometown advantage is real — the city IS the player." },
    { tag: "Coveleski's Staff-Mate", desc: "Uhle and Coveleski were the 1-2 punch of the Cleveland rotation from 1919-1924. In ILB, when both are on the same staff, +1 STA to both — they push each other through the season. The spitballer and the slider-man, Cleveland's two aces." },
    { tag: "Two Hundred Exactly", desc: "Career: 200-166. Exactly 200 wins — the border of HOF consideration. Not 199, not 201. Exactly the number that makes you argue about whether it's enough. In ILB, Uhle's OVR cannot exceed 7. He is the exact border between very good and great. The number is the argument." },
  ],

  preferred_locations: [
    { location: "League Park, Cleveland", affinity: "MAXIMUM / HOME", note: "Born in Cleveland. Pitched in Cleveland. The hometown boy's home field. The factory league kid who never left." },
    { location: "vs. New York Yankees", affinity: "MAXIMUM / RIVAL", note: "58 games against New York. 342 IP, 3.63 ERA. Ruth's self-declared nemesis. The Koenig Gambit. Uhle was Cleveland's weapon against the dynasty." },
    { location: "Comiskey Park, Chicago", affinity: "HIGH / EPIC", note: "The 20-inning game vs Lyons (1929). Five earned runs, four hits at the plate, 20 innings pitched. The Bull at his most bullish." },
    { location: "Standard Parts Factory, Cleveland", affinity: "ORIGIN", note: "Where Uhle worked and played semipro ball before being signed. The factory team that had five retired major leaguers on it. The beginning." },
  ],

  momentum: {
    hot_triggers: [
      "Facing elite opponents — Uhle pitched UP. The bigger the name across the diamond, the better he threw. Ruth, Cobb, Foxx — he wanted them all.",
      "Deep in games — Uhle got BETTER as games went on. He held the White Sox hitless from innings 6-10 in the 20-inning game. The Bull warmed up slowly and peaked late.",
      "At home in Cleveland — the hometown boy played best in front of his people. League Park was his factory floor.",
      "Proving doubters wrong — after 1924 injury, after the trade, after being called washed up. Started 1929 at 9-0.",
    ],
    cold_triggers: [
      "Tipping pitches — in 1920, the league figured out he was telegraphing his pitches. 5.92 ERA before he fixed it. Uhle could be READ if you knew what to look for.",
      "Management conflict — the Peckinpaugh feud, the Evans criticism. Uhle's confidence curdled into stubbornness when challenged by authority.",
      "Arm fatigue — the Bull's body had limits even if his will didn't. The ligament damage cost him 1924 and parts of 1927. Overwork was the price.",
      "Away from Cleveland — his road splits were worse. The hometown advantage was also a hometown dependence.",
    ],
    pressure_response: "SELECTIVELY EXCELLENT. Uhle was at his best in the biggest moments WITHIN games — he walked Koenig to face Ruth, he pitched 20 innings, he threw shutouts against the Yankees. But he never won a pennant as an ace. The pressure of individual games was fuel; the pressure of a season-long race was a weight he couldn't quite carry alone. Cleveland always fell short. CLU = 1 reflects the gap between in-game dominance and seasonal destiny.",
  },

  action_card_seeds: [
    {
      title: "I'd Rather Pitch to Ruth",
      type: "Signature Moment",
      text: "Ninth inning. Your team leads by one run. The tying run is on second base. Mark Koenig is at the plate. Babe Ruth is on deck. Your pitcher throws two balls — one a curve in the dirt, one two feet outside. Your center fielder runs in from center field. 'Are you nuts? Don't you know who's up next if you walk Koenig?' Your pitcher says: 'Tris, I'd rather pitch to Ruth than to Koenig anytime. I can take care of the big fellow.' Your center fielder says: 'Okay, but let's tell Ruth.' They walk to the plate together. They tell the most feared hitter in baseball history, to his face, that they are going to pitch to him. Ruth steps in. Your pitcher delivers. Ruth strikes out.",
      origin: "The Koenig Gambit — Uhle deliberately walked Koenig to face Ruth. Speaker confronted him on the mound. They told Ruth. Ruth struck out. Speaker told Uhle to never do it again.",
    },
    {
      title: "The Slider",
      type: "Innovation",
      text: "Your pitcher is playing with a new grip during batting practice. He rolls the ball off his middle finger like a bowling ball. The pitch slides across the plate — not a curve, not a fastball, something in between. Something that has no name. His catcher asks what it is. 'That ball was sliding,' your pitcher says. They call it a slider. Nobody has ever thrown one before. A hundred years later, it will be the most common breaking ball in baseball, thrown 21% of the time by starting pitchers, used by Clayton Kershaw and Randy Johnson and Mariano Rivera. It started rolling off your pitcher's middle finger in a Cleveland batting cage.",
      origin: "Uhle's claim to have invented the slider. Contested — George Blaeholder and Chief Bender also receive credit. But Uhle called it a slider first.",
    },
    {
      title: "Twenty Innings",
      type: "Endurance",
      text: "May 24, 1929. Comiskey Park, Chicago. Your pitcher vs. Ted Lyons. By the fifth inning, both pitchers have been hit hard — your man has given up 10 hits, Lyons 11. And then: silence. Your pitcher holds the White Sox hitless from the 6th through the 10th. From the 11th through the 20th, he scatters seven singles, never more than one per inning. No runner passes second base. He pitches twenty innings. He gets four hits himself. In the top of the 21st, he starts the winning rally with a base hit. He is lifted for a pinch-runner. His team wins 6-5. Lyons pitches all 21 innings and loses. It takes three hours and thirty-one minutes. Your pitcher earned his nickname today: The Bull.",
      origin: "The 20-inning game — Uhle vs Lyons, May 24, 1929. Detroit 6, Chicago 5 in 21 innings. Uhle pitched 20 IP, allowed 5 ER, went 4-for-8 at the plate.",
    },
    {
      title: "The Factory League Kid",
      type: "Origin",
      text: "Your pitcher works at Standard Parts in Cleveland. He works during the week and pitches for the company team on weekends. The team has five retired major leaguers on it. Your pitcher is better than all of them. He has a strong fastball and a sidearm curve. He gets a tryout with the Cleveland Indians — his hometown team, the team he has watched since childhood. He negotiates a contract that says they can never send him to the minors. He is twenty years old. He will never leave Cleveland, not really. Not even when they trade him. Not even when he dies.",
      origin: "Uhle's origin — worked at Standard Parts in Cleveland, played semipro ball, signed with the Indians with a no-demotion clause at age 20.",
    },
    {
      title: "Pinch-Hit for Speaker",
      type: "Character",
      text: "June 6, 1926. Your manager — Tris Speaker, the Grey Eagle, inner-circle Hall of Famer, lifetime .345 hitter — walks over to your pitcher in the dugout. 'Pinch-hit for me,' Speaker says. 'You must be joking,' your pitcher says. Speaker insists. Your pitcher grabs a bat and flies out. He hits .289 for his career. He hits .361 in 1923. He hits .407 as a pinch-hitter in 1924. He is a pitcher. He is also a hitter. There is no one on the roster he cannot replace at the plate — not even the greatest center fielder who ever lived.",
      origin: "June 6, 1926 — Speaker ordered Uhle to pinch-hit for him because Speaker didn't like facing pitcher Garland Braxton. Uhle flew out.",
    },
    {
      title: "Two Hundred",
      type: "Legacy / Threshold",
      text: "Your pitcher retires with exactly 200 wins. Not 199 — that would make the case impossible. Not 201 — that would make it easy. Exactly 200. The number sits on the border between good and great, between remembered and forgotten, between Cooperstown and Cleveland. He is not in the Hall of Fame. He hit .289 for his career. He may have invented the slider. Babe Ruth called him the toughest pitcher he ever faced. Two hundred wins. Exactly enough to argue about forever.",
      origin: "Uhle's career record: 200-166. The exact threshold that generates permanent debate about his legacy.",
    },
    {
      title: "Everybody Knows",
      type: "Adaptation",
      text: "1920. Your pitcher is getting hammered. 5.92 ERA. He can't figure out why every hitter seems to know what's coming. Urban Shocker of the St. Louis Browns tells him: 'You're tipping your pitches. And everybody in the league knows it.' Your pitcher changes his delivery. In the second half, his ERA drops to 3.44. He helps his team win the pennant. He pitches scoreless innings in the World Series. The lesson: talent isn't enough. You have to hide what you are. For the rest of his career, your pitcher hides the slider behind the fastball, the fastball behind the curve, everything behind the confidence.",
      origin: "1920 — Uhle was tipping pitches. Urban Shocker told him. He fixed it and helped Cleveland win the 1920 WS.",
    },
    {
      title: "The Bull's Body",
      type: "Endurance / Cost",
      text: "1926: 318 innings, 32 complete games in 36 starts, 27 wins. The best season of your pitcher's career. 1927: ligament damage. 153 innings, 10 complete games, 8-9 record. The best season of his career broke the machine that produced it. The Bull had limits. The Bull refused to acknowledge them. In ILB, this is the fundamental tension of the George Uhle card: the workload that makes him elite is the workload that destroys him. Use him fully and risk the breakdown. Manage him carefully and lose what makes him The Bull.",
      origin: "The workload from 1926 caused ligament damage that limited Uhle in 1927 and contributed to his trade from Cleveland.",
    },
  ],

  art_direction: {
    face: "6'0\" 190 lbs — solid, sturdy, WORKMANLIKE. A Cleveland face — broad, Midwestern, capable. Not handsome, not ugly, RELIABLE. The face of a man who shows up at the factory at 6 AM and pitches 318 innings by October. Dark hair, clear eyes, the hint of a challenge in the expression. Not hostile — CERTAIN. This is a man who thinks he can strike out Babe Ruth, and he's usually right.",
    attire: "Cleveland Indians 1926 home whites. In mid-delivery — not the submarine of Mays, not the high kick of others — a three-quarter arm slot, the ball rolling off his middle finger. The delivery should look EFFICIENT — no wasted motion, no excess. This is a man who completed 89% of his starts because he didn't waste a single pitch or a single movement. Or: at the plate, mid-swing, because this pitcher HITS.",
    mood: "STEADY WARMTH. This is not a dark card like Mays or a haunted card like Rice or a worried card like Coveleski. This is a WARM card — warm like a factory floor, warm like an engine that's been running all day, warm like a city that loves its hometown boy. The mood is competence — the satisfaction of a job done well, day after day, for a decade. The mood is also a little WISTFUL — because 200 wins wasn't quite enough, and the slider never got his name on it, and Babe Ruth hit .336 off him anyway.",
    style: "Full color — Bashers era — WARM AND GROUNDED. Earth tones, brick red, industrial browns, the warm gray of Lake Erie on a clear autumn day. Not golden like Heilmann, not dark like Mays — SOLID. The color of the factory, the railroad switchyard, the ballpark concrete. The border should be DEEP RED-BROWN — the color of a well-worn glove, a broken-in bat, a working man's hands. This is a card that belongs in a lunchbox.",
    reference: "Ruth is the solar system. Gehrig is the axis. Sisler is the sun. Uhle is THE LATHE — the machine that shapes the product, that runs all day, that nobody notices until it stops. The card should feel like holding something useful — not precious, not flashy, but RELIABLE. Something you'd bring to every game because it never lets you down. The Bull. The factory kid. The hometown arm. Two hundred wins and a slider.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", brick: "#8b4513", factoryBrown: "#6d4c2e", lakeGray: "#7a8b8c", indRed: "#a0342e" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.factoryBrown}10`, border: `1px solid ${C.factoryBrown}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.indRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.factoryBrown, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.factoryBrown}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function GeorgeUhleCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = UHLE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.factoryBrown} 0%, ${C.darkBrown} 50%, ${C.brick} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: `${C.cream}88`, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — Cleveland</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.factoryBrown}`, boxShadow: `0 0 0 2px ${C.brick}, 0 0 30px ${C.factoryBrown}40, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.factoryBrown}, ${C.brick}, ${C.factoryBrown})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.factoryBrown}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.brick}15, ${C.factoryBrown}10, ${C.lakeGray}08)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🐂</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE LATHE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.factoryBrown, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.indRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.factoryBrown}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • CLEVELAND</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.indRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.factoryBrown} />
              <StatBar label="STA" value={s.sta} max={5} color={C.brick} />
              <StatBar label="DEF" value={s.def} max={3} color={C.lakeGray} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.factoryBrown}, ${C.brick})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W", val: d.real_stats.wins },{ label: "L", val: d.real_stats.losses },{ label: "ERA", val: d.real_stats.era },{ label: "W%", val: d.real_stats.win_pct },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "IP", val: "318" },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.indRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1926 — LED AL IN W/IP/GS/CG/W% — SPORTING NEWS ALL-STAR</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.factoryBrown}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.factoryBrown}20` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR BA", val: ".289" },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "20-W SZN", val: d.real_stats.twenty_win_seasons },{ label: "HOF", val: "❌" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.factoryBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.indRed}10`, border: `1px solid ${C.indRed}30`, borderRadius: 4, padding: 8, marginTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: C.indRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 4 }}>VS. BABE RUTH (110 AB)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {[{ label: "BA", val: ".336" },{ label: "HR", val: "4/714" },{ label: "K", val: "25" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.sepia }}>{s.label}</div><div style={{ fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div></div>
                ))}
              </div>
              <div style={{ fontSize: 9, color: C.indRed, fontFamily: "'Courier Prime', monospace", textAlign: "center", marginTop: 4, fontStyle: "italic" }}>"The toughest pitcher I ever faced" — Babe Ruth</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚾ Invented the Slider", "🐂 32 CG in 36 GS", "🏠 Cleveland Born & Bred", "🏆 1920 WS Champion", "🏏 .289 Career BA (pitcher)", "👊 Ruth's Toughest Pitcher", "📊 200 Wins Exactly", "🔧 Factory League Origin"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.factoryBrown}08`, border: `1px solid ${C.factoryBrown}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.factoryBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — CLEVELAND</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.factoryBrown}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.factoryBrown : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.factoryBrown : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key.replace(/_/g, " ")}><p style={{ margin: 0 }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.indRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : l.affinity.includes("RIVAL") ? `${C.indRed}20` : l.affinity.includes("EPIC") ? `${C.gold}20` : `${C.factoryBrown}20`, color: l.affinity.includes("HOME") ? C.traitGreen : l.affinity.includes("RIVAL") ? C.indRed : l.affinity.includes("EPIC") ? C.gold : C.factoryBrown, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.indRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.factoryBrown}05`, border: `1px solid ${C.factoryBrown}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Signature") ? `${C.gold}20` : a.type.includes("Innovation") ? `${C.traitGreen}20` : `${C.factoryBrown}15`, color: a.type.includes("Signature") ? C.gold : a.type.includes("Innovation") ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.factoryBrown}, ${C.brick}, ${C.factoryBrown})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
