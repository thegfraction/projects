// /cards/players/jesse-haines.jsx
import { useState } from "react";

const HAINES_DATA = {
  name: "Jesse Haines",
  nickname: "Pop",
  year: 1923,
  team: "St. Louis Cardinals",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "190 lbs",
  born: "July 22, 1893 — Clayton, Ohio. Farm country near Dayton. Excelled at baseball as a youth. Became professional at age 20. Spent six years in the minors before sticking in the majors at age 26. Late bloomer.",
  died: "August 5, 1978 — Dayton, Ohio (age 85). Served 28 years as Montgomery County Assessor after baseball. His grave in Clayton, Ohio incorporates the sundial the Cardinals gave him upon retirement — has become a local attraction.",
  hof: "HALL OF FAME — Class of 1970 (Veterans Committee). CONTESTED. Received maximum 8.3% on writers' ballot over 12 years — nowhere close to 75%. Elected by Veterans Committee chaired by FRANKIE FRISCH, his teammate for 11 seasons. Bill James lists Haines among 10 HOFers who don't deserve the honor. Frisch also shepherded elections of Bancroft, Hafey, Youngs, Kelly, Bottomley, Lindstrom — all former teammates. The 'Frisch era' of the VC is considered a dark chapter in HOF history. Yet: 210-158, 3.64 ERA, 3 WS championships, 5 pennants, the ONLY player on all 5 Cardinals pennant-winners 1926-1934. The man who set up Alexander's legendary moment.",

  real_stats: {
    season: 1923,
    wins: 20,
    losses: 13,
    era: "3.11",
    innings_pitched: "266",
    complete_games: 23,
    strikeouts: "~70",
    walks: "~60",
    games: "~37",
    war: "~4.0",
    note: "FIRST 20-WIN SEASON. Led Cardinals in W, IP, CG, ERA. The year he ADDED THE KNUCKLEBALL — learned from Eddie Rommel, gripped with knuckles (not fingertips), threw it HARD. Turned 30 on July 22 and celebrated by shutting out the Reds. Completed 11 of his next 16 starts. The knuckleball transformed his career.",
    career_wins: 210,
    career_losses: 158,
    career_era: "3.64",
    career_ip: "3,208.2",
    career_cg: 209,
    career_sho: "~24",
    career_k: 981,
    career_seasons: "18 (1918, 1920-1937)",
    twenty_win_seasons: "3 (1923: 20-13; 1927: 24-10; 1928: 20-8)",
    ws_appearances: "4 (1926, 1928, 1930, 1934)",
    ws_record: "3-1, 1.67 ERA in World Series play",
    ws_rings: "3 (1926, 1931, 1934) — though he did not pitch in the 1931 Series",
    ws_highlight_1926: "Game 3: shut out Yankees 4-0, hit 2-run HR. Game 7: pitched 6.2 IP, developed BLEEDING BLISTER from knuckleball. Bases loaded, 2 outs. Alexander came in, struck out Lazzeri. Most famous relief appearance in WS history. Haines got the win; Alexander got the legend.",
    ws_highlight_1930: "Game 4: CG win over Lefty Grove and the A's, allowing only 1 run.",
    no_hitter: "July 17, 1924: 5-0 vs Boston Braves. First Cardinals no-hitter since 1876. 50+ years before another Cardinals pitcher threw a no-hitter at home.",
    batting: "Decent hitting pitcher. Hit 2-run HR in 1926 WS Game 3.",
    branch_rickey: "The LAST PLAYER Branch Rickey ever bought. Rickey borrowed $10,000 from local banks to acquire Haines. After that, Rickey built baseball's first farm system — never bought another player.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1923 SEASON (CAREER CONTEXT)
  //
  // STF: 3.11 ERA in 1923 — solid but not elite. Career
  //      3.64 ERA. The knuckleball was his weapon but he
  //      threw it HARD, not with butterfly float. 981 K
  //      in 3,208 IP — very low K rate. The stuff was
  //      EFFECTIVE through deception and movement, not
  //      dominance. "A knuckleballer when it's sweeping in
  //      with a lot of zip and breaking right."
  //      STF = 2 (BELOW AVERAGE for a HOFer — the knuckleball
  //      gave him movement and deception, but the raw stuff
  //      was not dominant. Low K rates. Career 3.64 ERA.
  //      He survived on craft, not power.)
  //
  // CTL: Sidearm delivery (recommended by Rickey) for
  //      control. "Minimized wildness." In 1923: ~60 walks
  //      in 266 IP — reasonable. But the knuckleball is
  //      inherently unpredictable. The BLISTER problem
  //      suggests the pitch was hard to sustain consistently.
  //      CTL = 3 (GOOD — the sidearm delivery helped, and
  //      Haines had solid control for a knuckleballer. Not
  //      elite, but workmanlike and consistent.)
  //
  // STM: 266 IP in 1923. 23 CG. Career: 3,208.2 IP, 209 CG.
  //      Pitched until age 43 (retired 1937). 18 seasons.
  //      301.2 IP in rookie year (1920). Three 20-win
  //      seasons. 5 pennant-winning teams.
  //      But: the BLISTER problem. The knuckleball caused
  //      bleeding blisters that forced him out of games.
  //      He couldn't always finish what he started.
  //      STM = 3 (GOOD — solid longevity and workload, but
  //      the blister issue prevents maximum rating. The
  //      knuckleball extracted a physical price.)
  //
  // DEF: Decent hitting pitcher. Hit a 2-run HR in the
  //      1926 WS Game 3. Not a spectacular fielder but
  //      adequate. No major defensive contributions.
  //      DEF = 1 (AVERAGE — adequate for a pitcher, nothing
  //      special. The WS homer was memorable but isolated.)
  //
  // CLU: 3 WS championships (1926, 1931, 1934).
  //      4 WS appearances. 3-1, 1.67 ERA in WS play.
  //      Shut out the Yankees 4-0 in 1926 WS Game 3.
  //      Beat Lefty Grove in 1930 WS Game 4.
  //      Game 7 1926: held lead until blister forced him
  //      out — SET UP Alexander's legendary moment.
  //      The ONLY player on all 5 Cardinals pennant-winners
  //      1926-1934.
  //      CLU = 3 (MAXIMUM — 3-1 WS record, 1.67 ERA.
  //      3 championships. On ALL 5 pennant winners.
  //      The October performer. Even the blister game
  //      was a WIN — he held the lead for Alexander.)
  //
  // OVR: STF×2(4) + CTL×1(3) + STM×1.5(4.5) + DEF×0.5(0.5) + CLU×1.5(4.5) = 16.5 → normalized ~6
  // OVR = 6 (SOLID STARTER) — Jesse "Pop" Haines.
  // The knuckleball pioneer. The bleeding blister.
  // The man who set up Alexander's legend.
  // 210 wins. 3 championships. 5 pennants.
  // The last player Rickey ever bought.
  // The most CONTESTED HOF selection in the Bashers —
  // elected by his teammate Frisch's committee.
  // But: he was ON all five pennant-winning teams.
  // He won the game that set up the legend.
  // The mundane is sometimes the foundation of the myth.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,
    stf: 2,    // Knuckleball (hard, with knuckles). Low K rate. 3.64 career ERA. Effective, not dominant.
    ctl: 3,    // Sidearm delivery helped. Solid for a knuckleballer. ~60 BB in 266 IP (1923). Workmanlike.
    stm: 3,    // 266 IP, 23 CG (1923). Career 3,208 IP, 209 CG. Pitched to 43. But blisters limited durability.
    def: 1,    // Average for a pitcher. WS homer was nice but isolated. No major defensive contributions.
    clu: 3,    // MAXIMUM. 3-1 WS, 1.67 ERA. 3 championships. 5 pennants. Beat Grove. Shut out Yankees. Set up Alexander.
  },

  stat_justification: {
    stf: "Haines's knuckleball was his signature pitch — thrown HARD with the knuckles (not fingertips), creating a downward break that mimicked a spitball's movement. However, his strikeout numbers were modest (981 in 3,208 IP — about 2.75 K/9) and his career ERA of 3.64 was merely solid. In 1923 his ERA was 3.11, good but not elite. He survived on craft and deception rather than raw power. The knuckleball was effective but not overwhelming. Rating of 2.",
    ctl: "Haines adopted a sidearm delivery on Branch Rickey's recommendation, which minimized wildness. For a knuckleballer, his walk rates were reasonable — roughly 2 BB/9 in his best years. He was described as having 'clean' pitching habits — no intimidating headhunting. The knuckleball limited ceiling but the sidearm delivery and smart approach provided solid command. Rating of 3.",
    stm: "Haines threw 266 IP with 23 CG in 1923. His career totals are impressive: 3,208.2 IP, 209 CG, pitching until age 43 over 18 seasons. He threw 301.2 IP as a rookie in 1920. However, the BLISTER problem was a recurring limitation. The knuckleball caused bleeding blisters that forced him from games at critical moments (most famously Game 7 of the 1926 WS). He could not always finish what he started, which limits the stamina ceiling. Rating of 3.",
    def: "Haines was an adequate fielder and a decent hitting pitcher. He hit a memorable 2-run home run in the 1926 World Series Game 3. But he was not a standout defensive player and his hitting was serviceable, not exceptional. Rating of 1.",
    clu: "This is Haines's defining attribute. He appeared in 4 World Series (1926, 1928, 1930, 1934), going 3-1 with a 1.67 ERA. He won 3 championships (1926, 1931, 1934). He shut out the Yankees 4-0 in the 1926 WS Game 3 and hit a 2-run homer in the same game. He beat Lefty Grove in the 1930 WS Game 4. He was the ONLY player on all 5 Cardinals pennant-winning teams from 1926-1934. Even his blister game (1926 Game 7) was a win — he held the lead and set up the most famous relief appearance in WS history. Rating of 3 (MAXIMUM).",
  },

  personality: {
    leadership_style: "PATERNAL AND FIERY. 'Pop' Haines was the elder statesman — kind, gentlemanly, philosophical OFF the field. On the mound, he 'became a raging bull.' He chewed out teammates for mental lapses. When catcher Pickles Dillhoefer threw wild on a pickoff attempt and the only run scored, teammates had to physically restrain Haines in the clubhouse. Fifteen years later, rookie Terry Moore walked into the visitors' clubhouse at Cincinnati to find Haines had ripped the furniture apart after a loss to errors. The man who mentored Dizzy Dean destroyed furniture when defense failed him.",
    temperament: "DUAL NATURE — MILD AND VOLCANIC. Off the mound: 'a clean sportsman, who has never taken advantage of a rival batter with an intimidating cranial shot.' On the mound: a fiery competitor who 'had no patience for losing games.' The duality is the essence of Haines — Pop the mentor and Pop the raging bull occupied the same body. The knuckleball required calm precision; the competitor within demanded volcanic intensity. The blister was where these two forces met.",
    work_ethic: "SELF-TAUGHT AND ADAPTIVE. Haines wasn't born a knuckleballer — he MADE himself one. After his fastball lost effectiveness, he approached Eddie Rommel for a lesson, then spent the entire 1922 season finding a comfortable grip. He settled on pressing two knuckles between the seams, thumb underneath. This was not a gift — it was a construction project. He BUILT his second career from scratch at age 29.",
    lifestyle: "OHIO FARM COUNTRY. Born in Clayton, raised near Dayton. After baseball: 28 years as Montgomery County Assessor. The sundial on his grave. Haines was CIVIC — he went home and served his community. Not a wanderer, not a showman. A man who pitched 18 years, won 3 championships, then went home to Ohio and assessed property values until he died.",
    era_adaptability: "HIGH FOR THE KNUCKLEBALL. The knuckleball transcends eras — it works on physics, not strength. Haines's version (thrown hard, with knuckles, sidearm) would be effective today. The pitch doesn't age. That's why he pitched until 43. In modern baseball, Haines would be R.A. Dickey before R.A. Dickey.",
    clubhouse_impact: "MAXIMUM MENTORSHIP. 'Pop' earned his nickname by being a father figure to younger players. He mentored Dizzy Dean. He soothed the Gas House Gang. Terry Moore's quote: 'When I saw how hard a nice old man like Pop could take it after losing a game, I realized why he'd been such a consistent winner.' In ILB: Haines provides +1 CLU to all teammates under 25. The father teaches by example — and by destroying furniture.",
    tragic_element: "THE MAN WHO SET UP THE LEGEND. In the most famous moment in Cardinals history — Alexander striking out Lazzeri in Game 7 of the 1926 World Series — Jesse Haines is the FOOTNOTE. He shut out the Yankees in Game 3. He held the lead in Game 7 for 6.2 innings. He developed the bleeding blister FROM THROWING HIS BEST PITCH. He won the game. But Alexander is the legend. Haines went to the clubhouse and 'didn't see Alex strike out Lazzeri.' He was in the room where it happened, but he was in the wrong room. The hero was on the mound. The winner was in the clubhouse, bleeding. And then Frankie Frisch had to put him in the Hall of Fame because the writers wouldn't. The most CONTESTED and BITTERSWEET HOF selection in the Bashers.",
  },

  chemistry_traits: [
    { tag: "The Knuckleball", desc: "Thrown HARD with actual knuckles (not fingertips), sidearm delivery. In ILB, Haines has access to the knuckleball — +1 STF through unpredictable movement, but each knuckleball thrown has a 5% cumulative chance of causing a BLISTER. Once the blister develops, Haines loses 2 CTL and must be removed within 2 batters." },
    { tag: "The Bleeding Blister", desc: "Game 7, 1926 WS: the knuckleball caused a bleeding blister that forced Haines out with bases loaded. Alexander came in and struck out Lazzeri. In ILB, the blister is INEVITABLE over time. But the blister always leads to something — a relief appearance, a moment, a legend. The blister is not failure. The blister is the SETUP." },
    { tag: "Pop the Mentor", desc: "Father figure to younger players. Mentored Dizzy Dean. Soothed the Gas House Gang. In ILB, Haines provides +1 CLU to all teammates under 25 AND +1 team morale. The young players play harder because Pop expects it of them." },
    { tag: "The Raging Bull", desc: "Mild off the field, volcanic on it. Ripped furniture after losses. Had to be restrained from attacking his own catcher. In ILB, when Haines loses a game due to defensive errors: d6. On 1-2: Haines destroys clubhouse furniture (team morale -1 but defensive players +2 effort next game from fear)." },
    { tag: "Rickey's Last Purchase", desc: "The last player Branch Rickey ever bought before building the farm system. In ILB, Haines costs acquisition currency but NEVER requires development — he arrives ready. After Haines, all future players must come through the farm system." },
    { tag: "Five Pennants, One Man", desc: "The ONLY player on all 5 Cardinals pennant-winning teams (1926-1934). In ILB, Haines provides DYNASTY CONTINUITY — as long as Haines is on the roster, the team receives +1 to pennant race performance per consecutive year of contention." },
    { tag: "The Contested Plaque", desc: "8.3% maximum on writers' ballot. Elected by Frisch's Veterans Committee. Bill James: doesn't deserve it. In ILB, Haines's HOF status is PERMANENTLY CONTESTED. His legitimacy comes not from stats but from PRESENCE — he was there for every championship, every pennant, every moment." },
    { tag: "The Sundial Grave", desc: "His grave incorporates the sundial the Cardinals gave him upon retirement. In ILB, Haines measures TIME. He knows when his career is ending. He knows when the knuckleball is the only pitch left. The sundial doesn't lie." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / HOME", note: "1920-1937. Eighteen seasons. 210 wins. 5 pennants. 3 championships. The only home he knew in baseball." },
    { location: "Clayton, Ohio", affinity: "SOUL / ORIGIN / GRAVE", note: "Born and buried in Clayton. Ohio farm country. The sundial grave. 28 years as County Assessor. The man went home and stayed." },
    { location: "The Knuckleball Release Point", affinity: "IDENTITY", note: "Two knuckles pressed between the seams. Thumb underneath. Sidearm. Thrown hard. The pitch he built from scratch at age 29. The pitch that kept him in the majors for 15 more years. The pitch that caused the blister that created the legend." },
    { location: "Yankee Stadium, October", affinity: "CLUTCH / GLORY", note: "Shut out the Yankees in 1926 WS Game 3. Hit a 2-run homer. Then bled in Game 7 so Alexander could become immortal." },
  ],

  momentum: {
    hot_triggers: [
      "The knuckleball WORKING — when the knuckler was sweeping in with zip and breaking right, Haines was nearly unhittable. The pitch's effectiveness fluctuated day to day.",
      "Big games — 3-1, 1.67 ERA in World Series play. Haines rose for October. Shut out the Yankees. Beat Lefty Grove. The bigger the game, the better Pop pitched.",
      "Mentoring moments — when younger players needed guidance, Haines channeled his intensity into teaching. The anger became instruction. The raging bull became Pop.",
      "Post-birthday runs — in 1923, Haines celebrated turning 30 by shutting out the Reds, then won 10 of his next 16 starts. Milestone birthdays activated something.",
    ],
    cold_triggers: [
      "The blister — cumulative, inevitable, season-defining. The knuckleball's price. When the blister developed, Haines lost his best pitch and his composure.",
      "Bad defense — errors behind Haines triggered volcanic rage. The Dillhoefer incident. The Cincinnati furniture. When teammates failed, Haines couldn't process it.",
      "Post-peak decline — after 1928 (his third 20-win season), Haines never won more than 13. The slow decline from ace to mentor was emotionally brutal.",
      "1924 collapse — 8-19 the year after his first 20-win season. The knuckleball was new and wild. The worst season of his career followed the best.",
    ],
    pressure_response: "THE BLISTER AND THE LEGEND. Haines's pressure response is paradoxical. He EXCELLED in October (1.67 ERA, 3-1, 3 championships) but his excellence had a PHYSICAL CEILING. The knuckleball worked brilliantly under pressure — until the blister developed. Then the very weapon that made him great betrayed him. The blister is the price of pressure excellence. In the biggest moment of his career (1926 Game 7), the blister meant he couldn't finish. But the WIN was still his. The LEGEND was Alexander's. The VICTORY was Haines's.",
  },

  action_card_seeds: [
    {
      title: "The Blister",
      type: "Sacrifice / Setup",
      text: "Game Seven. 1926 World Series. Cardinals lead the Yankees 3-2. Your pitcher has thrown six and two-thirds innings of magnificent baseball. The knuckleball is sweeping in and breaking right. But the knuckleball extracts a price. The two knuckles pressed between the seams have been grinding against the leather for 100+ pitches. The blister has formed. The blister is bleeding. Your pitcher shows it to his manager, Rogers Hornsby. Hornsby calls for Grover Cleveland Alexander. Your pitcher goes to the clubhouse. He does not see what happens next. What happens next is the most famous relief appearance in World Series history. Alexander strikes out Tony Lazzeri with the bases loaded. The Cardinals win their first championship. Your pitcher gets the win. Alexander gets the legend. The blister chose who would be remembered. The blister chose wrong.",
      origin: "Haines's bleeding blister in Game 7 of the 1926 World Series, leading to Alexander's legendary relief appearance.",
    },
    {
      title: "The Knuckleball Lesson",
      type: "Craft / Reinvention",
      text: "Spring training, 1922. Your pitcher's fastball is dying. He is twenty-eight years old and his arm is not what it was. He approaches Eddie Rommel, the Philadelphia Athletics' knuckleballer, before an exhibition game. 'Teach me.' Rommel shows him: fingernails dig into the cover, front knuckles only. Your pitcher tries it. He can't control it. For the entire 1922 season, he works on a different grip. Two knuckles pressed between the seams. Thumb underneath. He throws it HARD — not a butterfly but a missile with a late break. By 1923, the knuckleball is ready. He wins 20 games. He will pitch for fifteen more years. He has built his second career from scratch, one knuckle at a time.",
      origin: "Haines learning the knuckleball from Eddie Rommel (1922) and debuting it in 1923 to win 20 games.",
    },
    {
      title: "The Furniture",
      type: "Rage / Standards",
      text: "The visitors' clubhouse in Cincinnati. The Cardinals have lost. Not because your pitcher pitched poorly — because his defense failed him. Errors. Mental lapses. The kind of carelessness that your pitcher cannot tolerate. A rookie named Terry Moore walks into the clubhouse. The furniture is destroyed. Your pitcher, a kind old man called Pop, has ripped it apart with his hands. Moore is twenty-two years old. He has never seen a nice man destroy a room. He will remember this moment for the rest of his life. 'When I saw how hard a nice old man like Pop could take it after losing a game, I realized why he'd been such a consistent winner and the Cardinals, too.' The furniture is the message. The standards are the point. Pop expects excellence and punishes its absence — in himself, in the room, in the wood that splinters under his hands.",
      origin: "Terry Moore's account of discovering Haines's destroyed clubhouse furniture after a loss to defensive errors.",
    },
    {
      title: "Rickey's Last Purchase",
      type: "Legacy / Foundation",
      text: "Branch Rickey borrows ten thousand dollars from local banks. He uses it to buy a pitcher from the minor leagues. The pitcher's name is Jesse Haines. He is the last player Branch Rickey will ever need to buy. After Haines, Rickey will build baseball's first farm system — growing players instead of purchasing them. The entire modern structure of baseball development begins with this transaction. Jesse Haines is the last purchase before the revolution. He pitches eighteen years for the Cardinals. He wins 210 games and 3 championships. He is the bridge between the old way and the new way. Every player who comes up through a farm system is, in some small sense, a consequence of Rickey deciding that the ten thousand dollars he spent on Jesse Haines would be the last ten thousand dollars he spent that way.",
      origin: "Branch Rickey borrowing $10,000 to buy Haines — the last player he ever purchased before creating the farm system.",
    },
  ],

  art_direction: {
    face: "6'0\" 190 lbs — solid, upright, FATHERLY. Ohio farm face: open, honest, weathered by seasons. THINNING HAIR (hence 'Pop'). The face of a man who is genuinely kind — you can see it. But the EYES have something else. The eyes say: I will rip this furniture apart if you make an error behind me. The dual nature should be visible — warmth and intensity occupying the same face. The jaw is set but the mouth is almost smiling. Pop is about to either give you advice or tear the room apart, and you can't tell which.",
    attire: "St. Louis Cardinals 1923 whites, birds-on-bat. RIGHT-HANDED sidearm delivery — the knuckleball release. Two knuckles visible pressing INTO the baseball between the seams. The grip is the story. The hand should be prominent — SHOW the knuckles, show the grip that Rommel taught him, show the grip that caused the blister. Or: standing, post-game, looking at a bloody fingertip where the blister was. The body language of a man who gave everything and it wasn't enough — but his team still won.",
    mood: "PATERNAL INTENSITY. This card is WARM but FIERCE — the warmth of a father who demands your best because he knows you can give it. Not the coldness of Hornsby or the volcanic fire of Luque — this is the HEAT OF EXPECTATIONS. The card should feel like a hand on your shoulder that might also be a hand that rips a chair apart. CARDINALS RED AND OHIO EARTH AND KNUCKLE WHITE.",
    style: "Full color — Bashers era — CARDINALS RED AND OHIO EARTH BROWN AND KNUCKLE WHITE. Ohio earth brown border — the farm country of Clayton, the soil that grew the man. KNUCKLE WHITE — the white of the baseball gripped between two knuckles, the white of the blister forming, the white of the sundial on his grave. POP — the most CONTESTED card in the Bashers (HOF legitimacy debated). The most SELFLESS card (set up Alexander's legend, won the game, got the footnote). The card that bridges the old Cardinals (Rickey's last purchase) and the new Cardinals (five consecutive pennants).",
    reference: "In the Bashers pitching staff, Haines occupies a unique space. Vance is the Dazzler (STF 5, joyful dominance). Luque is the Pride (volcanic fire). Grimes is the Grinder (STM 5, relentless persistence). Coveleski is the Silent One (quiet mastery). Haines is POP — the father figure whose CLU 3 (MAXIMUM) is his defining gift. He doesn't dominate. He doesn't grind. He SHOWS UP for the big moments and gives his team what they need — even when what they need is for him to bleed and leave so someone else can become a legend.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", cardsRed: "#c6011f", ohioEarth: "#7a6040", knuckleWhite: "#e8dcc4" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.cardsRed}08`, border: `1px solid ${C.cardsRed}18`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.cardsRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.ohioEarth}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JesseHainesCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HAINES_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.cardsRed}08 0%, ${C.ohioEarth}08 50%, ${C.knuckleWhite}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>SOLID STARTER — Bashers Era — Pop</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.ohioEarth}`, boxShadow: `0 0 0 2px ${C.cardsRed}10, 0 8px 30px rgba(0,0,0,0.25), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.cardsRed}, ${C.ohioEarth}, ${C.cardsRed})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.ohioEarth}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.ohioEarth}05, ${C.cardsRed}03)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>🧤</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>POP</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.ohioEarth, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.cardsRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.ohioEarth}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>SOLID STARTER • KNUCKLEBALL • 3 WS RINGS • CLU 3</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Clayton, OH • Knuckleball • Blister • Alexander's Setup</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.ohioEarth} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.cardsRed} />
              <StatBar label="STM" value={s.stm} max={5} color={C.gold} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.cardsRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.cardsRed}, ${C.ohioEarth})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: "20-13" },{ label: "ERA", val: "3.11" },{ label: "IP", val: "266" },{ label: "CG", val: "23" },{ label: "CAR W", val: "210" },{ label: "WS ERA", val: "1.67" },{ label: "WS REC", val: "3-1" },{ label: "RINGS", val: "3" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.cardsRed}08`, border: `1px solid ${C.cardsRed}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.cardsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLUTCH: 3 — MAXIMUM</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>ONLY PLAYER ON ALL 5 CARDINALS PENNANT-WINNERS (1926-1934)</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>1926 WS Game 3: shut out Yankees 4-0, hit 2-run HR. Game 7: bled so Alexander could become immortal.</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🤜 Knuckleball", "🩸 The Blister", "👴 Pop", "🏆 3 Rings", "🌾 Rickey's Last Buy", "⚠️ Contested HOF", "🪑 Furniture Wrecker"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.ohioEarth}08`, border: `1px solid ${C.ohioEarth}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>SOLID STARTER DOSSIER — {d.year} — POP</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.ohioEarth}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.ohioEarth : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.ohioEarth : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "🩸 THE MAN WHO SET UP THE LEGEND" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.cardsRed } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.cardsRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.cardsRed}12`, color: C.cardsRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.cardsRed}04`, border: `1px solid ${C.cardsRed}10`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: `${C.ohioEarth}12`, color: C.ohioEarth, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.cardsRed}, ${C.ohioEarth})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB SOLID STARTER #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
