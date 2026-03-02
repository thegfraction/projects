import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: WILBERT ROBINSON
// Era: 1920 · Archetype: Authoritarian
// "Uncle Robbie" — The Benevolent Patriarch of Flatbush
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Wilbert Robinson",
  nickname: "Uncle Robbie",
  year: 1920,
  team: "Brooklyn Robins",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Authoritarian",
  born: "June 29, 1863 — Bolton, MA",
  died: "August 8, 1934 — Atlanta, GA (age 71)",
  hof: "Inducted 1945 (Old-Timers Committee). First 20th-century Dodger in the Hall. 'A rule-of-thumb manager who could get more out of less material than any manager before or since.'",
  height: '5\'8½"',
  weight: "250 lbs (playing weight: 170 lbs)",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD (Peak Era Snapshot: 1916-1920)
  // Source: Baseball-Reference, SABR BioProject, Hall of Fame
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 1399,
    career_losses: 1398,
    win_pct: ".500",
    pennants: 2,
    world_series: 0,
    seasons_managed: 19,
    ejections: "Moderate — fiery on the field but not a chronic baiter",
    peak_team: "1920 Brooklyn Robins",
    peak_record: "93-61",
    teams_managed: ["Baltimore Orioles (1902)", "Brooklyn Robins/Dodgers (1914-1931)"],
    second_division: "12 of 19 seasons",
    notable: "Team literally renamed after him — the 'Robins.' Only pennants Brooklyn won between 1901-1940. One of the first full-time pitching coaches in MLB history (Giants, 1903-1913). Career record exactly 1,399-1,398.",
    playing_career: "17 years as catcher. 7-for-7 with 11 RBI on June 10, 1892 — a record matched only once. Star catcher of the 1894-96 Orioles dynasty. First catcher to position directly behind the batter at all times.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management
    tac: 3,  // Competent tactician, not an innovator. Relied on instinct, not systems. "Rule-of-thumb manager."
    pit: 5,  // Elite. Was MLB's first pitching coach. Guided McGinnity, Marquard, Vance, Grimes to greatness.
    lin: 3,  // Adequate. Not a platooner or matchup specialist. Let his regulars play.
    adp: 3,  // Managed through dead-ball into live-ball but didn't reinvent himself. Overwhelmed by dual president-manager role.

    // Clubhouse Management
    dis: 7,  // High but invisible. Authority through paternal presence, not fear. Bonehead Club fines. But discipline crumbled when distracted by presidential duties.
    ego: 8,  // Excellent star handler. Managed big personalities — Vance, Grimes, Babe Herman — through warmth and wit, not confrontation.
    har: 8,  // Natural peacemaker since his Orioles days. "His conversation was a continuous flow of homely philosophy, baseball lore, and good humor."
    int: 6,  // "Never-say-die competitor" on the field but not a fear-monger. Intensity came from joy, not rage.
    str: 7,  // "Got more out of less material than any manager before or since." Reclamation specialist — built pennant winners from castoffs.
    flx: 5,  // Adapted from catching to coaching to managing, but became rigid when overwhelmed. The Daffiness Boys era showed his limits.

    ovr: 9,  // Elite tier. HOF manager with 2 pennants from a resource-poor franchise. The pitching genius and the father of the Brooklyn Dodger identity.
  },

  rating_justification: {
    tac: "Robinson was a 'rule-of-thumb manager' who operated on instinct and experience rather than systematic innovation. He learned the game under Ned Hanlon in the 1890s Orioles but never developed his own tactical school the way McGraw or Huggins did. His approach was practical and effective but not revolutionary. John Kieran wrote that Robinson 'knew baseball as the spotted setter knows the secrets of quail hunting, by instinct and experience' — suggesting natural feel rather than studied strategy.",
    pit: "Robinson's singular genius. Credited as one of MLB's first full-time pitching coaches (Giants, 1903-1913), during which time the Giants won five NL pennants. Guided Hall of Famers Joe McGinnity and Rube Marquard under McGraw, then as Brooklyn's manager developed Dazzy Vance (who didn't stick in the majors until age 31 under Robinson), Burleigh Grimes, and oversaw legal spitballers in the transition era. Steven Goldman: 'As a manager, Robinson was still a pitching coach.' His catcher's background gave him unmatched pitch-calling intuition.",
    lin: "Robinson let his regulars play. He was not a platooner or matchup specialist in the McGraw mold. Zack Wheat was his left fielder for 14 consecutive seasons. He found positions for players and let them settle in. Competent but not creative in lineup construction.",
    adp: "Robinson managed across baseball's greatest transition — from dead-ball through the live-ball explosion of the 1920s — and initially adapted well, winning the 1920 pennant as the game changed around him. But when Ebbets died in 1925 and Robinson took on the presidency, he became 'overwhelmed by the responsibilities of his dual roles,' and the Daffiness Boys era (1925-1929) reflected his inability to adapt to managing the business and the ballclub simultaneously.",
    dis: "Robinson's discipline was real but invisible. He instituted a Bonehead Club with heavy fines for mental errors. His authority was paternal — players obeyed because they loved him, not because they feared him. But this model had a fatal flaw: when Robinson was distracted by presidential duties, discipline evaporated. The Daffiness Boys — three runners on third base, laundry lists instead of lineup cards — were symptoms of a patriarch who could no longer watch the children.",
    ego: "Superb ego handler. Robinson managed some of the most colorful personalities of his era — Dazzy Vance, Burleigh Grimes, Babe Herman, Casey Stengel — through warmth, wit, and patience. Zack Wheat played for him for 14 years. His players loved him so much the team was literally renamed after him. 'His off-the-field, lax discipline manner contrasted differently with the fiery manner he displayed across the playing lines.'",
    har: "Natural peacemaker from his earliest days. On the 1890s Orioles, Robinson was the calming counterweight to McGraw's fury. 'He bore a striking resemblance to Santa Claus with his rotund shape and jolly demeanor. He got along with everyone, serving as peacemaker when tensions flared.' His Falstaffian personality did more to shape the identity of the Brooklyn Dodgers than any other influence.",
    int: "Robinson was described as a 'never-say-die competitor who specialized in getting the most out of his pitchers,' and his on-field manner was fiery and profane — different from the genial Uncle Robbie persona. But he motivated through encouragement and humor, not fear. His intensity was warm, not volcanic. It fueled peak performance but couldn't prevent complacency.",
    str: "Elite talent evaluator for pitchers. Robinson took Rube Marquard — 'the $13,000 Lemon' who had failed under McGraw — and got productive seasons from him. He developed Dazzy Vance after every other team had given up on him. He built pennant winners from 'unproven youngsters and over-the-hill castoffs,' challenging for pennants when nobody expected him to.",
    flx: "Robinson adapted across eras — from 1890s player to 1900s coach to 1910s-1920s manager — showing real flexibility. But his tolerance for chaos became a weakness. He couldn't impose structure when the Daffiness Boys needed it. And the McGraw feud showed that once wounded, Robinson's flexibility turned to rigidity — he refused to reconcile for 17 years.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Paternal authoritarian. Robinson didn't rule through fear like McGraw or energy like Jennings — he ruled through warmth, gravitas, and the sheer force of personality. His team was literally renamed in his honor. Players called him 'Uncle Robbie' and sought his fatherly advice, 'which was diplomatically administered in a patient, warm sagacity.' But beneath the jolly exterior was a fierce competitor. His authority was so natural that it was invisible — until it cracked.",
    temperament: "Falstaffian. John Kieran of the New York Times: 'Like Falstaff, he was not only witty himself but the cause of wit in others. His conversation was a continuous flow of homely philosophy, baseball lore, and good humor.' Jovial, warm, rotund, beloved — but also profane and combative on the field. A paradox of comfort and competition.",
    work_ethic: "Instinctive rather than obsessive. Robinson knew baseball through decades of experience, not study. He trusted his gut. He was not a micromanager — he empowered players and let them play. His preparation was rooted in a catcher's knowledge of opposing hitters and an encyclopedic memory for situations, not in modern-style analysis.",
    lifestyle: "Country gentleman. Co-owned the Diamond Café billiards parlor with McGraw in Baltimore. Owned a butcher shop. Retired to Dover Hall, a hunting and fishing lodge near Brunswick, Georgia, where he hosted Babe Ruth, sportswriters, and baseball men for hunting, drinking, and storytelling around the fire. At 250 pounds on a 5'8½\" frame, Robinson was the jovial center of every gathering.",
    communication_style: "Homespun philosophy delivered with warmth and humor. To Al López as a young catcher: 'Tell that punk he got two hands to catch with! Never mind the Fancy Dan stuff.' On pitching: 'Get the biggest guy you can find who can throw a ball through a two-inch plank and you got yourself a pitcher.' His advice was direct, folksy, and remembered decades later.",
    loyalty_expectations: "Play hard, respect the team, and don't embarrass the family. Robinson was not demanding in the McGraw sense — he expected professional behavior and competitive effort but tolerated eccentricity and even foolishness as long as it didn't cross into deliberate insubordination. His players loved him because his standards felt reasonable.",
    dark_side: "The dual-role collapse. When Charles Ebbets died in 1925, Robinson took on the presidency while still managing — and the results were catastrophic. Five straight years in the second division (1925-1929). The Daffiness Boys. Three runners on third base. The man whose gentle authority had held everything together now couldn't watch the field and run the business. His greatest strength — invisible, paternal control — required his full attention to work. Without it, the children ran wild. He was fired while hunting at Dover Hall, learning of his replacement from a newspaper. The patriarch's reward: exile.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Build from pitching and personality. Robinson's catcher background made him a pitching-first manager who could develop arms other teams had discarded. His roster construction was never about superstars — Brooklyn couldn't afford them. He took 'unproven youngsters and over-the-hill castoffs' and created competitive teams through pitching excellence and clubhouse warmth. The roster was a family, not a machine.",
    conflict_response: "ABSORB AND DEFLECT. Robinson did not suppress conflicts through authority like McGraw or escalate them like a Firebrand. He absorbed them — his enormous physical and emotional presence soaked up tension like a sponge. He deflected disputes with humor, stories, and fatherly counsel. When the humor failed, he could be profane and direct. But his first instinct was always to de-escalate through warmth.",
    clique_strategy: "TOLERATE AND MANAGE. Robinson allowed cliques to form naturally — his teams had distinct personalities like Vance, Grimes, and Herman who ran in different circles. Rather than prevent factions, Robinson managed them through his personal relationships with each player. The family had its squabbles, but Uncle Robbie kept the peace. This worked beautifully until his attention was divided.",
    player_types_that_thrive: [
      "Pitchers — Robinson's catcher instincts and legendary coaching made every arm better",
      "Reclamation projects and discarded talent — Robinson could see what others missed",
      "Colorful personalities who need room to breathe and a forgiving authority figure",
      "Young players who respond to fatherly mentorship and patient development",
      "Veterans who need one more good year and a manager who believes in them",
    ],
    player_types_that_struggle: [
      "Ultra-disciplined players who need rigid structure — Robinson's authority is too loose for them",
      "Players who interpret kindness as weakness and test boundaries repeatedly",
      "Position players needing tactical guidance — Robinson's genius is pitching, not lineups",
      "Self-motivated grinders who don't need warmth and resent informality",
      "Players who need an authoritarian fear-figure to perform — Robinson doesn't punish enough",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "HIGH — Robinson tolerated enormous volatility. The Daffiness Boys were the proof.",
      discipline_floor: "LOW — Robinson's floor was remarkably low before he intervened. The Bonehead Club was reactive, not proactive.",
      star_exception: "Zack Wheat was Robinson's anchor for 14 years — the one professional constant in a circus. All stars were treated with warmth, but Wheat was the silent partner.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "Robinson's warmth creates genuine belonging. Players want to play for Uncle Robbie. The team was literally renamed after him. +2 Team Fit for all players after 3 games. But if Robinson's attention wavers, fit can collapse into chaos." },
    volatility: { effect: "TOLERATED", desc: "Robinson absorbs volatility rather than suppressing it. High-volatility players are managed, not tamed. This works when Robinson is focused but becomes 'Daffiness' when he isn't." },
    discipline: { effect: "MODERATE", desc: "Invisible discipline through paternal authority. Effective when Robinson is present and attentive. Bonehead Club fines for mental errors. But discipline crumbles when distracted — the system needs the patriarch watching." },
    ego: { effect: "HIGH TOLERANCE", desc: "Robinson handles egos with warmth and humor rather than confrontation. Stars feel respected and valued. Max 4 high-ego players before penalties — much higher tolerance than McGraw." },
    work_habits: { effect: "PITCHER BOOST", desc: "Robinson's catcher background gives a specific, measurable boost to pitchers. All pitchers gain +1 to their primary stat. Position player development is average." },
    adaptability: { effect: "MEDIUM", desc: "Robinson adapted across eras but his methods were instinctive, not systematic. Era-foreign players can adjust but don't receive active tactical coaching." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Uncle Robbie", desc: "Paternal authority creates deep loyalty. All players gain +1 Team Fit after 3 games under Robinson. But if Robinson is distracted (dual-role, injury), Team Fit bonus is lost and all players suffer -1 Discipline." },
    { tag: "The Pitcher Whisperer", desc: "Robinson's catcher instincts and coaching pedigree make him the greatest pitcher developer of his era. All pitchers gain +1 to their highest stat. Reclaimed pitchers (traded/released) gain +2. Guided Vance, Grimes, Marquard, McGinnity." },
    { tag: "The Grapefruit Drop", desc: "Robinson agreed to catch a baseball from a plane and got a grapefruit instead. His willingness to look foolish endears him to players. 15% chance per series of a 'Comic Moment' event that gives +1 Harmony but -1 Discipline." },
    { tag: "Falstaff of Flatbush", desc: "Robinson's wit and humor keep the clubhouse loose. Team never suffers 'Clubhouse Tension' events while Robinson is engaged. But his humor can mask problems — issues that should be addressed directly fester instead." },
    { tag: "The Bonehead Club", desc: "Robinson's reactive discipline system fines players for mental errors. After any baserunning or defensive blunder, the offending player loses 1 morale but team gains +1 awareness. Robinson himself was the club's first member." },
    { tag: "Old Oriole", desc: "Robinson's pedigree from the legendary 1890s Baltimore Orioles gives him credibility with tough, old-school players. Veterans gain +1 morale under Robinson. His deathbed words: 'I'm an old Oriole. I'm too tough to die.'" },
    { tag: "The McGraw Feud", desc: "Robinson's 17-year feud with his former best friend adds +2 Intensity in rivalry games against the opposing team's strongest manager. But Robinson carries a permanent -1 to Harmony from the unresolved bitterness." },
    { tag: "Daffiness Spiral", desc: "If Robinson holds a dual role (manager + president/GM) or is distracted, all Discipline ratings drop by -2 and a 'Three on Third' comedy event has 20% chance per series. Authority that requires presence collapses without it." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Ebbets Field / Home Ballpark", affinity: "HIGH", note: "Robinson's kingdom for 18 years. The folksy, neighborly image of the Brooklyn Dodgers was largely shaped here." },
    { location: "Dover Hall / Hunting Lodge", affinity: "HIGH", note: "Robinson's Georgia retreat where he hosted Ruth, sportswriters, and baseball men for hunting, drinking, and storytelling around the fire." },
    { location: "Daytona Beach / Spring Training", affinity: "HIGH", note: "The grapefruit drop, the development of young pitchers, the annual renewal of the family. Robinson's spring classroom." },
    { location: "Butcher Shop / Diamond Café", affinity: "MEDIUM", note: "Co-owned a billiards parlor with McGraw in Baltimore. Inherited his father's butcher shop. The businessman behind the showman." },
    { location: "Dugout / Bench", affinity: "HIGH", note: "Robinson managed in uniform, not street clothes. At 250 pounds, his presence on the bench was impossible to miss — the gravitational center of the team." },
    { location: "Hotel / Campfire", affinity: "MEDIUM", note: "The evening gatherings at Dover Hall — drinking, storytelling, card-playing — were Robinson's natural habitat. The Falstaff of baseball." },
    { location: "Church / Cemetery", affinity: "LOW", note: "Buried at New Cathedral Cemetery in Baltimore, not far from McGraw. In death, the two old Orioles were reunited." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pitching dominance — Robinson's teams peak when his arms are humming",
      "McGraw rivalry games — spoiling the Giants was Robinson's private joy",
      "Underdog runs — 'challenging for pennants when nobody expected him to'",
      "Young pitchers emerging — Robinson's development instincts create momentum from nowhere",
    ],
    cold_triggers: [
      "Administrative burden — the dual president-manager role destroyed focus",
      "Baserunning blunders and defensive comedy — the Daffiness Boys cycle feeds on itself",
      "World Series pressure — lost both Fall Classics (1916, 1920) without winning a single game in 1920",
      "Death of friends — Ebbets' death in 1925 began the spiral; McGraw's death in 1934 preceded Robinson's own",
    ],
    pressure_response: "GENIAL UNDER FIRE, BRITTLE IN SUSTAINED CRISIS. Robinson was excellent in the short-term crunch of a pennant race — he won two in 1916 and 1920 with teams nobody expected to contend. His warmth and humor kept teams loose when other managers' clubs would tighten. But in sustained pressure — the World Series, the dual-role years — Robinson's gentle authority proved insufficient. He lost both World Series without providing the tactical edge or the iron discipline needed to win at the highest level. In ILB: Robinson's teams get +1 morale in regular-season pressure situations but carry a 'Fall Classic Fragility' trait — 30% chance of -2 tactical rating in championship series.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Grapefruit Incident",
      type: "Drama",
      text: "Your manager agrees to a publicity stunt and it goes hilariously wrong. Team morale +2 as players bond over the laughter. But opposing teams mock your manager for the rest of the series — rival Intensity +1 against you.",
      origin: "In 1915 spring training, Robinson agreed to catch a baseball dropped from an airplane. The pilot substituted a grapefruit, which exploded on impact, leaving Robinson temporarily believing he was covered in his own blood. The players laughed uproariously and the legend grew.",
    },
    {
      title: "Three on Third",
      type: "Game Action",
      text: "A catastrophic baserunning blunder puts multiple runners at the same base. Lose one baserunner (automatic out). Team Discipline -1 for the rest of the game. But if the team wins anyway, gain +2 Team Fit as the comedy becomes legend.",
      origin: "The signature Daffiness Boys play: Dazzy Vance, Chick Fewster, and Babe Herman all ended up at third base simultaneously. Herman was credited with 'doubling into a double play.' The play became the defining image of Robinson's late-career chaos.",
    },
    {
      title: "The Pitcher Reclamation",
      type: "Action",
      text: "Your manager's legendary pitching instincts rescue a discarded arm. Take any pitcher rated (+4) or below from the free agent pool. That pitcher gains +2 to their primary stat permanently. 'Robinson was still a pitching coach.'",
      origin: "Dazzy Vance didn't stick in the majors until he was 31, after every other team had given up on him. Under Robinson, he won the 1924 MVP and led the NL in strikeouts seven consecutive years. Rube Marquard, 'the $13,000 Lemon,' also revived under Robinson.",
    },
    {
      title: "The McGraw Feud",
      type: "Drama",
      text: "Your manager's bitter rivalry with a former friend surfaces before a crucial series. +2 Intensity for this series against that opponent. But -1 Harmony as the bitterness seeps into the clubhouse. If you win, the story becomes legend; if you lose, -1 morale next series.",
      origin: "Robinson and McGraw feuded for 17 years after a drunken argument at a 1913 saloon reunion. Robinson deliberately took the Brooklyn job to oppose McGraw. The Dodgers-Giants rivalry became personal — and one of the greatest in baseball history. They reconciled only in December 1930.",
    },
    {
      title: "The Bonehead Fine",
      type: "Game Action",
      text: "Your manager institutes fines for mental errors. After any blunder this game, the offending player's morale drops by 1 but all other players gain +1 awareness. Warning: your manager might commit the first bonehead play himself (10% chance).",
      origin: "Robinson instituted a Bonehead Club with heavy fines for mental errors. According to legend, he became the first member himself when he handed the umpire a laundry list instead of a lineup card before a game.",
    },
    {
      title: "Uncle Robbie's Family",
      type: "Action",
      text: "Your manager's paternal warmth transforms a struggling player. Choose any player with morale below 3. That player's morale resets to 5 and they gain +1 Team Fit permanently. 'Baseball was its pleasantest with Robbie around.'",
      origin: "Zack Wheat said of Robinson: 'He was the finest man I ever knew in baseball. He not only taught me how to play the outfield but he taught me how to live. Baseball was its pleasantest with Robbie around.' Wheat played 14 years under Robinson.",
    },
    {
      title: "The Old Oriole",
      type: "Action",
      text: "Your manager invokes the legacy of the legendary 1890s Baltimore Orioles. All veterans (age 30+) gain +1 to all stats for this series. 'Don't worry about it, fellas. I'm an old Oriole. I'm too tough to die.'",
      origin: "Robinson's deathbed words after falling in his hotel room in 1934, suffering a broken arm and head injury. He had played for the greatest team of the 1890s and carried that identity his entire life. The brain hemorrhage killed him, but the line became immortal.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Enormous, round, jovial face. 5'8½\" and 250 pounds — 'a striking resemblance to Santa Claus.' Warm, twinkling eyes that have seen everything. A face built for laughter and storytelling, creased with decades of sun and wind. Clean-shaven with a slight jowliness. The look of a man who has caught 1,316 games, managed 19 seasons, and buried his best friend.",
    attire: "Brooklyn Robins uniform, 1920 era — Robinson managed in uniform, unlike McGraw. The uniform strains slightly over his massive frame. Cap pushed back on his head. Perhaps one hand resting on a catcher's mitt — a nod to his origin. Standing in the Ebbets Field dugout, surrounded by his boys.",
    mood: "Warm authority. Not commanding fury like McGraw, not manic energy like Jennings — settled, confident, paternal warmth. The look of a man whose presence IS the team. A hint of sadness in the eyes — the awareness that this family he built will eventually scatter. Falstaff at the feast, knowing winter is coming.",
    style: "Warm sepia with golden amber tones — lighter and warmer than McGraw's card. Ebbets Field in the background, the intimate neighborhood ballpark. The palette should evoke Sunday afternoon, a Brooklyn stoop, a campfire at Dover Hall. More gold and less shadow than previous Authoritarian cards. The Lumber era's warmth.",
    reference: "The third Authoritarian in the ILB spectrum, and a radical departure. McGraw ruled through volcanic fear (12 OVR). Jennings ruled through joyful energy (9 OVR). Robinson rules through paternal warmth (9 OVR) — invisible authority that holds everything together until it can't. This card should feel like a warm embrace compared to McGraw's iron fist. The Authoritarian as Father, not General or Showman. The card should evoke a tavern painting, a Currier & Ives print, a family portrait where the patriarch sits at center and everyone orbits him naturally.",
  },
};

// ═══════════════════════════════════════════════════════════════
// MANAGER RATING ENGINE (Visible on card back)
// ═══════════════════════════════════════════════════════════════
const RATING_ENGINE = {
  game_management: {
    tactics: { metric: "Strategic innovation & in-game control", scale: "1-5", tiers: [
      { range: "1", label: "Passive — lets players decide" },
      { range: "2", label: "Conventional — standard moves" },
      { range: "3", label: "Strong — consistent tactical edge" },
      { range: "4", label: "Elite — pioneering strategy" },
      { range: "5", label: "Revolutionary — rewrote the playbook" },
    ]},
    pitching: { metric: "Bullpen/starter management", scale: "1-5" },
    lineup: { metric: "Batting order, platoons, matchup exploitation", scale: "1-5" },
    adaptability: { metric: "Mid-game/mid-series adjustment ability", scale: "1-5" },
  },
  clubhouse_management: {
    discipline: { metric: "Structure enforcement & rule adherence", scale: "1-10" },
    ego_mgmt: { metric: "Star handling & hierarchy management", scale: "1-10" },
    harmony: { metric: "Conflict resolution & cohesion building", scale: "1-10" },
    intensity: { metric: "Motivational pressure & competitive fire", scale: "1-10" },
    strategy: { metric: "Role optimization & roster efficiency", scale: "1-10" },
    flexibility: { metric: "Personality/era tolerance & adaptability", scale: "1-10" },
  },
  overall: {
    formula: "(TAC+PIT+LIN+ADP)/4 × 1.5 + (DIS+EGO+HAR+INT+STR+FLX)/60 × 8.5, normalized 3-13",
    tiers: [
      { range: "3-4", label: "Filler" },
      { range: "5-6", label: "Solid Skipper" },
      { range: "7-8", label: "Contender" },
      { range: "9-10", label: "Elite" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// THEME COLORS
// ═══════════════════════════════════════════════════════════════
const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  // Authoritarian archetype accent
  authRed: "#c44040",
  authDark: "#7a2020",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555",
    "Players' Manager": "#55b877",
    Firebrand: "#e8a030",
    "Tactical Purist": "#5588cc",
    Opportunist: "#b070cc",
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden", position: "relative" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.3s" }} />
    </div>
    <span style={{ width: 18, fontSize: 11, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "center" }}>{value}</span>
  </div>
);

const ClubhouseBar = ({ label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
    <span style={{ width: 60, fontSize: 9, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 8, background: `${C.sepia}20`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / 10) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 14, fontSize: 9, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{value}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

const ChemTag = ({ tag }) => (
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.authRed}15`, border: `1px solid ${C.authRed}30`, color: C.authRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function WilbertRobinsonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.authRed;

  const tabs = [
    { id: "playbook", label: "Playbook" },
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Rating Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Manager Card — {d.ilb_team} Era</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${archColor}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        {/* Flip Button */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, ${C.sepia} 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🧢</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              {/* OVR Badge */}
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              {/* Archetype Badge */}
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.archetype.toUpperCase()}</div>
              {/* Era Badge */}
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>

            {/* Name & Identity */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ MANAGER ◆</div>
            </div>

            {/* Game Management Stats */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>

            {/* Clubhouse Management Stats */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={archColor} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>

            {/* Managerial Record Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "EJECT", val: d.record.ejections },
                { label: "2ND DIV", val: d.record.second_division },
                { label: "PEAK", val: d.record.peak_record },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: stat.val && stat.val.length > 8 ? 9 : 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "👑 2 NL Pennants",
                "⭐ HOF 1945",
                "🎯 First Pitching Coach",
                "📜 1,399-1,398 Career",
                "🧢 Team Named After Him",
                "⚾ 7-for-7 Game (1892)",
                "🏟️ 18 Years in Brooklyn",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ══════════ BACK OF CARD ══════════ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
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

              {/* PLAYBOOK TAB */}
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy">
                  <p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p>
                </Section>
                <Section title="Conflict Response">
                  <p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p>
                </Section>
                <Section title="Clique Strategy">
                  <p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p>
                </Section>
                <Section title="✅ Players Who Thrive">
                  {d.playbook.player_types_that_thrive.map((p, i) => (
                    <div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>
                  ))}
                </Section>
                <Section title="⚠ Players Who Struggle">
                  {d.playbook.player_types_that_struggle.map((p, i) => (
                    <div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>
                  ))}
                </Section>
                <Section title="Tolerance Thresholds">
                  {Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                    </div>
                  ))}
                </Section>
              </>)}

              {/* PERSONALITY TAB */}
              {tab === "personality" && (<>
                {Object.entries(d.personality).map(([key, val]) => (
                  <Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}>
                    <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                  </Section>
                ))}
              </>)}

              {/* CHEMISTRY TAB */}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">
                  {Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (
                    <div key={key} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span>
                        <span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONG") ? `${C.traitGreen}20` : effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("STRONG") ? C.traitGreen : effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span>
                      </div>
                      <p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p>
                    </div>
                  ))}
                </Section>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                    {d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}
                  </div>
                  {d.chemistry_traits.map((t, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span>
                    </div>
                  ))}
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

              {/* MOMENTUM TAB */}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}

              {/* ACTION SEEDS TAB */}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Robinson's real life, become universal cards playable in any game.</p>
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

              {/* RATING ENGINE TAB */}
              {tab === "engine" && (<>
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (
                      <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>
                    ))}
                  </div>
                </Section>
                <Section title="Robinson's Derivation">
                  {Object.entries(d.rating_justification).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                    </div>
                  ))}
                </Section>
              </>)}

              {/* ART NOTES TAB */}
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
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  era: d.era,
  ilb_team: d.ilb_team,
  archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
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
