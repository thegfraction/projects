// /cards/players/burleigh-grimes.jsx
import { useState } from "react";

const GRIMES_DATA = {
  name: "Burleigh Grimes",
  nickname: "Ol' Stubblebeard",
  year: 1923,
  team: "Brooklyn Robins",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "175 lbs",
  born: "August 18, 1893 — Emerald, Wisconsin. Son of Cecil 'Nick' Grimes, a farmer and former day laborer. Mother Ruth Tuttle, daughter of a Wisconsin legislator. Father managed the Clear Lake Yellow Jackets. Taught Burleigh to play. Participated in boxing as a child. Lumberjack country.",
  died: "December 6, 1985 — Clear Lake, Wisconsin (age 92). Returned to the place he started. Cancer. Wife Lillian survived him. Last of the 17 legal spitballers. When he retired, the spitball retired with him.",
  hof: "HALL OF FAME — Class of 1964 (Veterans Committee). 270-212, 3.53 ERA, 314 CG, 4,180 IP, 19 seasons. 190 wins in the 1920s — MOST OF ANY PITCHER IN THE DECADE. Five 20-win seasons. Led NL in CG 4×, IP 3×, W 2×, K 1×. Won Game 7 of the 1931 World Series with a dislocated vertebra. As a scout: discovered Jim Palmer and Dave McNally. Mickey Mantle started his career under Grimes's watch at Independence, Kansas (1949). The last spitballer found the next generation's stars.",

  real_stats: {
    season: 1923,
    wins: 21,
    losses: 18,
    era: "~3.50",
    innings_pitched: "~327",
    complete_games: "LED NL",
    shutouts: "~4",
    strikeouts: "3rd NL",
    walks: "~100",
    games: "~39",
    war: "~4.5",
    note: "LED NL IN COMPLETE GAMES AND INNINGS PITCHED. 3rd in strikeouts. Tied for 4th in wins. 21-18 record reflects mediocre Robins team (6th place), NOT mediocre pitching. Went 6-0 vs Phillies AFTER the batboy solved the cap mystery. The cap was too tight — when Grimes flexed his facial muscles to load the spitter, the bill wiggled. Half-size larger cap: problem solved.",
    peak_season: "1928 — 25-14, LED NL in W, CG (28), SHO (4), IP (330.2) with Pittsburgh. But 1923 is the card year: the Bashers anchor season, the cap mystery, the Brooklyn workhorse.",
    career_wins: 270,
    career_losses: 212,
    career_era: "3.53",
    career_ip: "4,180.1",
    career_cg: 314,
    career_sho: 35,
    career_k: 1512,
    career_seasons: "19 (1916-1934)",
    decade_wins_1920s: "190 — MOST OF ANY PITCHER",
    ws_appearances: "4 (1920 BKN, 1930 STL, 1931 STL, 1932 CHC)",
    ws_highlight: "1931 WS Game 7: pitched 8.1 IP with DISLOCATED VERTEBRA. Cardinals win championship.",
    batting: ".248 BA, 380 H, 62 2B, 168 RBI, 2 HR as a PITCHER. Hit .316 in World Series play.",
    teams: "Pittsburgh (1916-17), Brooklyn (1918-26), NY Giants (1927), Pittsburgh (1928-29), Boston (1930), St. Louis (1930-31), Chicago Cubs (1932-33), St. Louis (1933-34), NY Yankees (1934), Pittsburgh (1934). SEVEN TEAMS. The spitball was in demand.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1923 SEASON (CAREER CONTEXT)
  //
  // STF: 3.53 career ERA. The spitball was his weapon —
  //      "The ball would break like hell, away from right-
  //      handers and in on lefties." Also threw fastball,
  //      curve. "Baseball's most aggressive spitballer."
  //      In 1923: ranked 3rd in K, led NL in CG/IP.
  //      Career 117 ERA+ (via 1920s context).
  //      STF = 3 (GOOD — the spitball was effective and
  //      the repertoire was solid, but Grimes was not a
  //      dominant stuff pitcher like Vance or Luque. His
  //      ERA was consistently ABOVE average for his best
  //      years. The 3.53 career ERA reflects workmanlike
  //      effectiveness, not dominance. The spitball was
  //      his edge, not overwhelming stuff.)
  //
  // CTL: The spitball is inherently difficult to control.
  //      Grimes walked batters. He also intentionally
  //      threw at batters. "His idea of an intentional
  //      walk was four pitches at the batter's head."
  //      But: the cap mystery reveals surgical deception —
  //      he could FAKE the spitter convincingly enough
  //      that only a cap wiggle betrayed him.
  //      CTL = 2 (BELOW AVERAGE for a HOFer — the spitball
  //      limited control. Walk rates were high. But the
  //      DECEPTION was elite — batters couldn't tell
  //      spitter from fastball/curve without reading his cap.)
  //
  // STM: 327 IP in 1923. LED NL in IP (1923, 1924).
  //      Career: 4,180.1 IP, 314 CG, 35 SHO.
  //      Five 300+ IP seasons (1920, 1921, 1923, 1924, 1928).
  //      190 wins in the 1920s — most of ANY pitcher.
  //      Pitched Game 7 of 1931 WS with DISLOCATED VERTEBRA.
  //      Pitched until age 41. Chewed slippery elm. Didn't
  //      shave on game days. IRON.
  //      STM = 5 (MAXIMUM — Grimes is the WORKHORSE of the
  //      1920s. 4,180 IP. 314 CG. Led NL in IP 3×. The
  //      definition of stamina. Pitched with a dislocated
  //      vertebra in Game 7 of a World Series. The man
  //      was INDESTRUCTIBLE.)
  //
  // DEF: .248 career BA as a pitcher. 380 hits, 168 RBI.
  //      Hit .316 in World Series play. 62 doubles.
  //      Originally played shortstop in the minors.
  //      Excellent athlete. Good fielder.
  //      Also: grounded into 2 DPs and a TP in one game
  //      (1925) — 7 outs in 3 ABs. Mixed results.
  //      DEF = 2 (ABOVE AVERAGE — legitimately good hitter
  //      for a pitcher, originally an infielder, .248 career
  //      BA with real power. Good fielder.)
  //
  // CLU: 4 WS appearances. Won Game 7 of 1931 WS (8.1 IP,
  //      dislocated vertebra). Won 1920 WS Game 2 (shutout
  //      vs. Cleveland). Career .316 WS batting. But: 1-2
  //      in 1920 WS, lost key games. Overall WS record
  //      mixed (3-2 across 4 Series).
  //      CLU = 2 (SOLID — the 1931 WS Game 7 is legendary.
  //      But the overall WS record is merely adequate.
  //      He showed up in October repeatedly but didn't
  //      dominate consistently.)
  //
  // OVR: STF×2(6) + CTL×1(2) + STM×1.5(7.5) + DEF×0.5(1) + CLU×1.5(3) = 19.5 → normalized ~8
  // OVR = 8 (ALL-STAR) — Burleigh Grimes. Ol' Stubblebeard.
  // The last legal spitballer. The workhorse of the 1920s.
  // 190 wins in the decade — more than anyone. 270 career
  // wins. 314 complete games. 4,180 innings. The man chewed
  // slippery elm bark, didn't shave, threw at batters in
  // the on-deck circle, fought his own manager on a train,
  // and pitched Game 7 of the World Series with a dislocated
  // vertebra. He was not elegant. He was not dominant.
  // He was RELENTLESS.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    stf: 3,    // Spitball + fastball + curve. "Break like hell." But 3.53 career ERA — effective, not dominant.
    ctl: 2,    // Spitball limits control. High walk rates. But DECEPTION was elite (cap mystery).
    stm: 5,    // MAXIMUM. 4,180 IP. 314 CG. 5× 300+ IP. Led NL in IP 3×. Dislocated vertebra Game 7. IRON.
    def: 2,    // .248 career BA (pitcher). 380 H. 168 RBI. Originally shortstop. Good fielder. .316 WS batting.
    clu: 2,    // 4 WS. Won Game 7 1931 (vertebra). Won Game 2 1920 (shutout). Mixed overall (3-2 WS record).
  },

  stat_justification: {
    stf: "Grimes's primary weapon was the spitball — 'The ball would break like hell, away from right-handers and in on lefties.' He supplemented with a fastball and curve. Baseball historian Frank Russo called him 'baseball's most aggressive spitballer.' However, his career 3.53 ERA reflects solid effectiveness rather than dominance. He ranked 3rd in NL strikeouts in 1923 but was never a dominant strikeout pitcher. The spitball was his EDGE, not overwhelming stuff. He was effective through DECEPTION and AGGRESSION rather than raw arsenal. Rating of 3.",
    ctl: "The spitball is inherently difficult to control, and Grimes's walk rates reflected this. His WHIP was consistently above 1.30. However, his DECEPTION was elite: the cap mystery reveals he could fake the spitter so convincingly that only a tiny wiggle of his cap bill betrayed when he was loading it vs. throwing dry. Batters couldn't tell spitter from fastball without reading his facial muscles. The control was below average; the deception was elite. Rating of 2.",
    stm: "This is the defining stat. Grimes threw 4,180.1 career innings — 314 complete games — 35 shutouts. He had FIVE seasons of 300+ innings (1920, 1921, 1923, 1924, 1928). He led the NL in innings pitched THREE times (1923, 1924, 1928). 190 wins in the 1920s — most of any pitcher in the decade. In the 1931 World Series, he pitched 8.1 innings in Game 7 with a DISLOCATED VERTEBRA. He pitched until age 41. He was the WORKHORSE of the 1920s and the definition of stamina in the Bashers era. Rating of 5 (MAXIMUM).",
    def: "Grimes was an excellent athlete who originally played shortstop in the minors. As a pitcher, he hit .248 with 380 hits, 62 doubles, and 168 RBI over his career — outstanding for a pitcher. He hit .316 in World Series play. He was a good fielder who led NL pitchers in assists multiple times. The one blemish: in 1925, he grounded into two double plays AND a triple play in one game (7 outs in 3 at-bats). Rating of 2.",
    clu: "Grimes appeared in four World Series (1920, 1930, 1931, 1932). His crowning moment was the 1931 WS Game 7: pitching 8.1 innings with a dislocated vertebra to clinch the championship for the Cardinals. He also shut out Cleveland in Game 2 of the 1920 WS. His career WS record was 3-2 with a .316 batting average. Solid but not consistently dominant in October. Rating of 2.",
  },

  personality: {
    leadership_style: "MENACING AND COMBATIVE. Grimes led by INTIMIDATION. Before a 1924 game against the Giants, he organized a team meeting: 'Anyone who doesn't want to play today's game to win, let me know right now.' Then on his first pitch, he knocked down a Giant. His idea of an intentional walk was four pitches aimed at the batter's head. He threw a ball at a batter in the ON-DECK CIRCLE. He memorized the rulebook so he could argue with umpires. He fought his own manager (Hugo Bezdek) on a train when Bezdek questioned his competitiveness.",
    temperament: "FIERCE. RELENTLESS. UNSHAVEN. Grimes didn't shave on game days because the slippery elm juice irritated his skin — the stubble protected his face. But the stubble ALSO created a menacing appearance that became part of his weapon. The unshaven face, the chewing, the spitball, the brushback — everything about Grimes was designed to INTIMIDATE. Yet off the field, his friends noted he was 'consistently a kind man.' The fury was professional, not personal.",
    work_ethic: "WORKHORSE. 4,180 innings. 314 complete games. Led the NL in innings pitched three times. Five 300+ IP seasons. This is a man who wanted the ball EVERY DAY and wouldn't give it back until the game was over. 190 wins in the 1920s — no one else threw more pitches in the decade.",
    lifestyle: "WISCONSIN FARM BOY. Born in Emerald, died in Clear Lake. Grimes was lumberjack country — hard, physical, no-nonsense. He would speak mainly only to his best friend Ivy Olson in the dugout. He would pitch only to a man named Mathias Schroeder before games — 'just a nice guy from the neighborhood.' Manager Wilbert Robinson used a clubhouse attendant to tell Grimes when he pitched so Robinson didn't have to talk to him directly. Grimes was not ANTI-SOCIAL — he was SELECTIVE. He chose his people carefully and was loyal to them absolutely.",
    era_adaptability: "MODERATE. The spitball is banned — without it, Grimes loses his primary weapon. His fastball and curve were solid but not dominant. However, his MENTALITY — the aggression, the intimidation, the workhorse innings, the refusal to back down — would translate to any era. Modern Grimes would be a bulldog: 200+ IP, inside pitching, taking the ball every fifth day and daring you to dig in.",
    clubhouse_impact: "COMPLICATED. Grimes was fiercely competitive and demanded the same from teammates. He fought anyone who didn't give full effort. But he was selective about who he trusted — Ivy Olson, Mathias Schroeder, eventually Frankie Frisch (they became 'bosom pals' after years of feuding). In ILB: Grimes demands +2 effort from all teammates but has a 20% chance of fighting his own manager per season.",
    tragic_element: "THE LAST ONE. When Burleigh Grimes retired in 1934, the spitball retired with him. He was the last of 17 pitchers grandfathered in when the pitch was banned in 1920. Every time he took the mound after 1920, he was the LAST LIVING ARTIFACT of a bygone era. When he struck out Jersey Joe Stripp on September 20, 1934, at Ebbets Field — his last appearance — it was the last legal spitball ever thrown. The pitch died with his career. He carried a dead art form for 14 years past its funeral.",
  },

  chemistry_traits: [
    { tag: "The Last Legal Spitball", desc: "Grimes was one of 17 pitchers grandfathered when the spitball was banned in 1920. He was the LAST one to retire (1934). In ILB, Grimes has access to the spitball — a pitch NO OTHER pitcher in the set can throw. The spitball adds unpredictable movement: +2 STF on spitball pitches, but -1 CTL (it's hard to control). Once Grimes retires, the spitball is PERMANENTLY REMOVED from the game." },
    { tag: "Ol' Stubblebeard", desc: "Didn't shave on game days because slippery elm irritated his skin. The stubble added to his menacing presence. In ILB, Grimes receives +1 INTIMIDATION on game days (reduces opposing batters' CON by 1). On non-game days, Grimes is clean-shaven and 'consistently a kind man.'" },
    { tag: "The Slippery Elm", desc: "'I used to chew slippery elm — the bark, right off the tree. Come spring the bark would get nice and loose.' In ILB, Grimes must chew slippery elm to throw the spitball. If slippery elm is unavailable (trade to a city without elm trees), STF drops by 2." },
    { tag: "The Cap Mystery", desc: "The Phillies hit Grimes because his tight cap wiggled when he loaded the spitter. A BATBOY solved the mystery. Grimes got a cap half-size larger and went 6-0 vs PHI. In ILB, observant opponents can detect the spitball tell: d20 per game. On 1-3, opposing team reads the tell and Grimes loses spitball advantage for that game. Grimes can invest in a larger cap to reduce this to 1-2." },
    { tag: "The Brushback", desc: "'His idea of an intentional walk was four pitches at the batter's head.' Threw a ball at a batter in the ON-DECK CIRCLE. In ILB, Grimes can intentionally throw at batters with +3 accuracy. 15% chance of ejection per brushback. Only Frisch and Waner are IMMUNE — they hit line drives after close pitches." },
    { tag: "Dark Alley", desc: "'He faced hitters as if they were trying to rob me in a dark alley.' In ILB, Grimes receives +1 to all stats when facing batters he personally dislikes. The grudge fuels the performance." },
    { tag: "The Iron Spine", desc: "1931 WS Game 7: pitched 8.1 innings with a DISLOCATED VERTEBRA. In ILB, Grimes CANNOT be removed from a game due to injury. He pitches through everything. Injury effects are delayed until AFTER the game ends." },
    { tag: "190 in the Decade", desc: "More wins than any pitcher in the 1920s. In ILB, Grimes accumulates wins faster than any other pitcher over a 10-year span. The workhorse doesn't peak — he PERSISTS." },
  ],

  preferred_locations: [
    { location: "Ebbets Field, Brooklyn", affinity: "HOME / PRIMARY", note: "1918-1926. Nine seasons. 158-121. The place where the spitball artist became the NL workhorse. Barely spoke to manager Robinson, but threw 300+ innings for him." },
    { location: "Clear Lake, Wisconsin", affinity: "SOUL / ORIGIN", note: "Born in Emerald, raised in Clear Lake. Father's team. Lumberjack country. Died here at 92. The spitball came from the trees." },
    { location: "The Pitcher's Mound", affinity: "SOVEREIGNTY", note: "Grimes OWNED the mound. Wouldn't give it up. 314 complete games. Pitched through dislocated vertebrae. The mound was his territory and he defended it with brushbacks." },
    { location: "Forbes Field, Pittsburgh", affinity: "PEAK / SECOND HOME", note: "25-14 in 1928, his best statistical season. Led NL in everything. Pittsburgh gave him the run support Brooklyn couldn't." },
  ],

  momentum: {
    hot_triggers: [
      "Solved tells — once Grimes identified and eliminated a mechanical giveaway (like the cap), he became nearly unhittable. The 6-0 run against Philadelphia after the batboy's discovery.",
      "Grudge matches — Grimes pitched his best against teams and batters he disliked. Personal animosity was fuel. The darker the grudge, the sharper the spitball.",
      "Pennant races — 'Anyone who doesn't want to play today's game to win, let me know right now.' Grimes demanded maximum effort and delivered it himself in meaningful games.",
      "Complete games — Grimes got BETTER as games went on. His spitball became more effective as his saliva flow increased with the slippery elm. Late innings were his best innings.",
    ],
    cold_triggers: [
      "Bad defense behind him — Grimes could not tolerate errors. When fielders let groundballs through, he 'boiled over' and once threw a pitch down the middle deliberately, allowing a two-run inside-the-park homer, out of pure spite.",
      "Manager conflicts — Grimes fought with Robinson, Bezdek, and McGraw. When the manager-pitcher relationship broke down, performance suffered. He and Robinson communicated through a clubhouse attendant.",
      "Exposed tells — when opponents read his mechanical giveaway (cap, facial muscles), Grimes was vulnerable. The 0-3 with 8.06 ERA against Philly in 1922.",
      "Losing streaks — 13 straight losses in 1917. 18 losses in 1923 despite 21 wins. Grimes hated losing and the frustration compounded.",
    ],
    pressure_response: "THE DARK ALLEY. Grimes's pressure response was AGGRESSION. He didn't get nervous under pressure — he got MEANER. The spitball broke harder. The brushbacks came closer. The stubble looked darker. In the 1931 World Series, with his vertebra dislocated and the championship on the line, he pitched 8.1 innings and dared the A's to beat him. They couldn't. Grimes under pressure was a cornered animal from lumberjack country with a mouthful of slippery elm and a spitball that broke like hell.",
  },

  action_card_seeds: [
    {
      title: "The Last Legal Spitball",
      type: "Legacy / Extinction",
      text: "September 20, 1934. Ebbets Field. Bottom of the 8th. Your pitcher enters in relief. He is forty-one years old. He retires Tony Cuccinello on a fly out. Johnny Frederick grounds to short. Then Jersey Joe Stripp steps in. Your pitcher loads the ball one last time — slippery elm, saliva, the fiber from inside the bark. The spitball breaks. Stripp swings and misses. Strike three. Your pitcher walks off the mound. He does not know it yet, but it is the last legal spitball ever thrown. When he retires that winter, the pitch retires with him. Seventeen men were grandfathered in 1920. Your pitcher was the last one standing. The spitball is dead. It has been dead for fourteen years. But Burleigh Grimes kept throwing its ghost until the ghost had no arm left.",
      origin: "Grimes's final MLB appearance — the last legal spitball ever thrown, September 20, 1934.",
    },
    {
      title: "The Batboy's Discovery",
      type: "Mystery / Deception",
      text: "The Philadelphia Phillies are hitting your pitcher. This should not be happening — the Phillies are terrible. But somehow they know when the spitter is coming. Your team suspects the catcher is tipping pitches. They substitute catchers. The Phillies keep hitting. Your team suspects a spy with binoculars in the Baker Bowl scoreboard. They check. No spy. The Phillies hit your pitcher at Ebbets Field too. Then the batboy notices something. Your pitcher's cap is too tight. When he fakes the spitter, the bill doesn't move. When he loads the real spitter — flexing his jaw muscles against the slippery elm — the bill wiggles. Just slightly. Just enough. Your pitcher gets a cap half a size larger. He goes 6-0 against Philadelphia. The mystery is solved. It took a batboy to see what the entire Brooklyn Robins organization could not.",
      origin: "The cap mystery — how the Phillies read Grimes's spitball tell, solved by the Brooklyn batboy in early 1923.",
    },
    {
      title: "The Iron Spine",
      type: "Endurance / Will",
      text: "1931 World Series. Game 7. Your pitcher has a dislocated vertebra. The Cardinals need one more win against the defending champion Philadelphia Athletics. Your pitcher takes the mound. He throws. It hurts. He throws again. It hurts more. He throws for eight and a third innings. He takes a shutout into the ninth. The Cardinals win. Your pitcher is the reason. His spine is displaced but his arm is not. His body is broken but his will is not. Burleigh Grimes pitched the most important game of the 1931 season with a vertebra out of place. He did not tell anyone. He just pitched.",
      origin: "Grimes pitching Game 7 of the 1931 World Series with a dislocated vertebra to clinch the championship.",
    },
    {
      title: "The Dark Alley",
      type: "Intimidation / Philosophy",
      text: "Your pitcher faces every batter as if they are trying to rob him in a dark alley. This is not metaphor. This is method. The brushback is the first warning. The spitball is the second. His idea of an intentional walk is four pitches at the batter's head. He once threw a ball at a man in the ON-DECK CIRCLE — not even the batter, the NEXT batter. The only two men in the National League he could not intimidate were Frankie Frisch and Paul Waner. They answered his brushbacks with line drives. Everyone else flinched. The stubble. The slippery elm. The spitball that broke like hell. The dead-eyed stare of a Wisconsin farm boy who learned to fight before he learned to pitch. Before a game against the Giants in 1924, your pitcher told his teammates: 'Anyone who doesn't want to play today's game to win, let me know right now.' No one spoke. On his first pitch, he knocked down a Giant.",
      origin: "Composite of Grimes's intimidation tactics — brushbacks, throwing at on-deck batters, pre-game speeches, and the Dark Alley quote.",
    },
  ],

  art_direction: {
    face: "5'10\" 175 lbs — SOLID but not huge. Wisconsin farm boy build — broad shoulders, thick forearms, working man's frame. The face: UNSHAVEN. Two days of stubble minimum. Dark stubble against weathered skin. The eyes are HARD — not cruel, not cold, but UNYIELDING. The jaw works constantly — chewing slippery elm. There is something in his mouth. There is always something in his mouth. The expression says: I am going to throw this ball at your head and then I am going to throw the spitball where your bat isn't, and there is nothing you can do about either of these things.",
    attire: "Brooklyn Robins 1923 whites. RIGHT-HANDED pitching delivery — the spitball release. The hand comes to the face (loading the spitter) or FAKES coming to the face (the dry pitch). The motion should suggest DECEPTION — you can't tell if the ball is loaded or dry. The cap should be visible — slightly LARGER than expected, the half-size-up that solved the mystery. Or: mid-brushback, the follow-through of a pitch aimed at a batter's chin, the body language of pure aggression channeled through a baseball.",
    mood: "MENACING WORKMANSHIP. This card GRINDS. Not the volcanic intensity of Luque or the surgical darkness of Mays — this is BLUE-COLLAR MENACE. The grinding, chewing, spitting, throwing, intimidating persistence of a man who threw 4,180 innings and 314 complete games. The card should feel like a WORKDAY — a long, hard, mean workday where the boss is unshaven and chewing bark.",
    style: "Full color — Bashers era — ROBINS BLUE AND ELM BARK BROWN AND STUBBLE GRAY. A palette of working-class menace: Brooklyn blue (team color), elm bark brown (the source of his power), stubble gray (the unshaven face). The border should be ELM BARK BROWN — rough, textured, organic. The color of the slippery elm fiber that made the spitball possible. THE LAST SPITBALLER — the card that carries a dead art form. The most PERSISTENT card in the Bashers. Not the most talented, not the most dominant, but the one that will NOT stop. 314 complete games. The man who kept throwing the ghost of a banned pitch for fourteen years after its funeral.",
    reference: "Vance is the Dazzler — lightning and joy. Luque is the Pride of Havana — volcanic fire. Grimes is OL' STUBBLEBEARD — the card that GRINDS. Grimes and Vance were Brooklyn teammates — the Dazzler and the Grinder, sharing a rotation, sharing a city, sharing nothing else. Vance was flash and K's. Grimes was elm bark and complete games. Together they won 50 games for the 1924 Robins. Apart, they were two completely different answers to the same question: how do you get batters out? Vance said: overwhelm them. Grimes said: outlast them. And outlast them. And outlast them.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", robinsBlue: "#3a5c7c", elmBrown: "#6b4c2a", stubbleGray: "#7a7568" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.elmBrown}12`, border: `1px solid ${C.elmBrown}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.elmBrown, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.robinsBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.robinsBlue}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function BurleighGrimesCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GRIMES_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.elmBrown}12 0%, ${C.robinsBlue}08 50%, ${C.stubbleGray}10 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.elmBrown, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Last Legal Spitballer</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.elmBrown}`, boxShadow: `0 0 0 2px ${C.stubbleGray}15, 0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.elmBrown}, ${C.robinsBlue}, ${C.stubbleGray})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.elmBrown}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.elmBrown}08, ${C.stubbleGray}06)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>🌲</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.elmBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>OL' STUBBLEBEARD</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.elmBrown, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.robinsBlue}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.elmBrown}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR • LAST LEGAL SPITBALLER • 190 WINS IN THE 1920s</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.elmBrown, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Emerald, WI • Slippery Elm • 314 CG • Dislocated Vertebra</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.robinsBlue} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.warmRed} />
              <StatBar label="STM" value={s.stm} max={5} color={C.elmBrown} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.elmBrown}, ${C.robinsBlue}, ${C.stubbleGray})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: "21-18" },{ label: "ERA", val: "~3.50" },{ label: "IP", val: "~327" },{ label: "CG", val: "LED NL" },{ label: "CAR W", val: "270" },{ label: "CAR CG", val: "314" },{ label: "CAR IP", val: "4,180" },{ label: "1920s W", val: "190" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.elmBrown}08`, border: `1px solid ${C.elmBrown}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>STAMINA: 5 — MAXIMUM</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>THE WORKHORSE OF THE 1920s</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>190 wins in the decade — more than any other pitcher. Pitched WS Game 7 with a dislocated vertebra.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.elmBrown}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.elmBrown}12` }}>
              {[{ label: "WS APPS", val: "4" },{ label: "WS RING", val: "1931" },{ label: "20W SZN", val: "5" },{ label: "SEASONS", val: "19" },{ label: "HOF", val: "1964" },{ label: "TEAMS", val: "7" },{ label: "BA (P)", val: ".248" },{ label: "SHO", val: "35" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.elmBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🌲 Slippery Elm", "🧔 Stubblebeard", "💧 Last Spitballer", "🏋️ 4,180 IP", "🏆 Game 7 Vertebra", "🧢 Cap Mystery", "👊 Dark Alley"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.elmBrown}08`, border: `1px solid ${C.elmBrown}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.robinsBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — OL' STUBBLEBEARD</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.elmBrown}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.elmBrown : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.elmBrown : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "🌲 THE LAST ONE" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.elmBrown } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.elmBrown }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.elmBrown}15`, color: C.elmBrown, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.elmBrown }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.elmBrown}05`, border: `1px solid ${C.elmBrown}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Extinction") ? `${C.stubbleGray}20` : `${C.elmBrown}10`, color: a.type.includes("Extinction") ? C.stubbleGray : C.elmBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.elmBrown}, ${C.robinsBlue}, ${C.stubbleGray})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
