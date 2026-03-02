import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: BILL McKECHNIE
// Era: 1920 · Archetype: Players' Manager
// "Deacon" — The Quiet Saint of the Dugout
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Bill McKechnie",
  nickname: "Deacon",
  year: 1940,
  team: "Cincinnati Reds",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Players' Manager",
  born: "August 7, 1886 — Wilkinsburg, PA",
  died: "October 29, 1965 — Bradenton, FL (age 79)",
  hof: "Inducted 1962 (Veterans Committee). 'He is the sort of man that other decent men would want their sons to play for.' — Lee Allen",
  height: '5\'10"',
  weight: "160 lbs",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD (Peak Era Snapshot: 1925, 1938-1940)
  // Source: Baseball-Reference, SABR BioProject, Hall of Fame
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 1896,
    career_losses: 1723,
    win_pct: ".524",
    pennants: 4,
    world_series: 2,
    seasons_managed: 25,
    ejections: "Rare — McKechnie's weapon was quiet self-discipline, not confrontation",
    peak_team: "1940 Cincinnati Reds",
    peak_record: "100-53",
    teams_managed: ["Newark Peppers (1915)", "Pittsburgh Pirates (1922-1926)", "St. Louis Cardinals (1928-1929)", "Boston Braves (1930-1937)", "Cincinnati Reds (1938-1946)"],
    pennants_with_teams: "3 different NL teams — only manager ever to do so",
    notable: "First manager to win World Series with two different teams (1925 Pirates, 1940 Reds). Only manager to win pennants with three different NL clubs. 1,896 career wins — 2nd-most in NL history at retirement behind only McGraw. Also coached Cleveland to 1948 WS title.",
    playing_career: "11 MLB seasons as utility infielder. .251 career average. Yankee manager Frank Chance said McKechnie 'knew more baseball than all the rest of my team put together.'",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management
    tac: 4,  // Elite percentage player. "Show me a manager who doesn't play the percentages and I'll show you one who loses games he ought to win."
    pit: 5,  // Singular genius. "If a pitcher can't win for Bill McKechnie, he can't win for anybody." — Paul Derringer. Walters MVP. Vander Meer's no-hitters.
    lin: 3,  // Defense-first lineup builder. Not a creative offensive mind — won with pitching, not bats.
    adp: 4,  // Won pennants with 4 different teams. Rebuilt last-place Reds into champions in 2 years. Survived mutinies, firings, and 115-loss seasons.

    // Clubhouse Management
    dis: 7,  // Quiet, firm discipline through moral example. Didn't smoke, drink, or curse. Roomed with carousing players to keep them in line.
    ego: 9,  // Masterful. Managed Babe Ruth, Paul Waner, Pie Traynor, Ernie Lombardi. Won respect without raising his voice. "He had the rare ability of earning players' great respect rather than fear."
    har: 9,  // Extraordinary. Built close-knit teams at every stop. Kept the 1940 Reds together through Hershberger's suicide. Players called him a father figure.
    int: 5,  // Quiet intensity. Not a fire-breather. "Knew how to hold on to a one- or two-run lead better than any other manager." Intensity through precision, not passion.
    str: 8,  // Built teams greater than the sum of their parts. "Finished fourth or fifth with teams that should have been eighth." Pitching-and-defense philosophy was systematic.
    flx: 7,  // Managed across 4 decades (1915-1946), adapted to each franchise's culture. But conservative by nature — "managed by the book" proudly.

    ovr: 11, // Legend tier. 4 pennants with 3 teams, 2 WS titles, HOF. The greatest Players' Manager of the dead-ball-to-live-ball transition. More wins than any NL manager except McGraw.
  },

  rating_justification: {
    tac: "McKechnie was a consummate percentage player who 'played the percentages faithfully because he believed the percentages would always win in the long run.' He pleaded guilty to managing by the book. His tactical approach was defensive excellence — his 1940 Reds posted the fewest errors in history to that point and the best defensive efficiency rate ever recorded. Not a tactical revolutionary, but an elite executor of fundamental strategy.",
    pit: "McKechnie's defining skill. As a manager, he was essentially still a pitching coach. He developed Bucky Walters into an MVP (1939), mentored Paul Derringer, guided Johnny Vander Meer through his consecutive no-hitters, and turned mediocre staffs into league leaders. His Reds led the NL in team ERA and complete games in both 1939 and 1940. Derringer: 'If a pitcher can't win for Bill McKechnie, he can't win for anybody.' Vander Meer: 'He knew how to hold on to a one- or two-run lead better than any other manager.'",
    lin: "McKechnie's philosophy was defense and pitching over offense. He won with run prevention, not run production. He was not known for creative lineup construction or platoon strategy. His lineups were functional and stable, built around defensive positioning. The 1935 Braves with Babe Ruth showed the limits — McKechnie couldn't incorporate a disruptive offensive force into his system.",
    adp: "Remarkable adaptability across franchises and eras. McKechnie managed in the Federal League (1915), then across four different NL clubs spanning 25 years. He took over struggling teams repeatedly — the Pirates in mid-season 1922, the last-place Reds in 1938 — and improved them immediately. He survived being fired twice (Pittsburgh, St. Louis) and rebuilt his career each time. His fatal flaw: an inability to resist authority even when his players were right (the Pittsburgh mutiny).",
    dis: "McKechnie's discipline was moral rather than authoritarian. He didn't smoke, drink, or curse. When a player was out carousing, McKechnie's solution was to room with him on road trips. His quiet self-discipline and fairness won respect. But this gentle approach had limits — Babe Ruth's presence on the 1935 Braves 'made it nearly impossible to enforce discipline,' and the team lost 115 games.",
    ego: "Masterful ego management through respect and decency. Paul Waner: 'He could be a father to you when he felt he had to be and a taskmaster when that was needed.' McKechnie managed multiple Hall of Famers — Carey, Traynor, Waner, Frisch, Maranville, Lombardi — earning their loyalty through genuine care. His only ego failure was the Pittsburgh mutiny, where he sided with players against ownership and then was forced to betray them.",
    har: "McKechnie's greatest gift. He built close-knit, family-like teams at every stop. When Willard Hershberger died by suicide in August 1940, McKechnie held the Reds together through the crisis — dedicating the season to Hershberger, winning 19 of 21 games after the tragedy, and taking the World Series. Junior Thompson: 'He and his wife were like parents to me.' His teams were described as unified and harmonious even when they lacked talent.",
    int: "Quiet intensity, not volcanic fire. McKechnie won by precision and preparation, not emotional pressure. His teams excelled in close games and held late leads because of discipline, not adrenaline. Vander Meer said McKechnie 'knew how to hold on to a one- or two-run lead better than any other manager.' This was cerebral intensity — the opposite of McGraw's volcanic style.",
    str: "Elite team-builder who consistently made teams better than their parts. He took over sub-.500 Pittsburgh in 1922 and won a World Series by 1925. He inherited a last-place Cincinnati in 1938 and won back-to-back pennants by 1939-1940. Lee Allen: 'He finished fourth or fifth with teams that should have been eighth.' His pitching-and-defense philosophy was a complete system for maximizing limited resources.",
    flx: "McKechnie managed across four decades and adapted to each franchise's needs and culture. He moved from the Federal League to Pittsburgh to St. Louis to Boston to Cincinnati without losing effectiveness. But he was fundamentally conservative — 'managed by the book' was his self-description. His philosophy (pitching and defense) didn't change with the times; it just happened to work in most eras.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Moral authority through personal example. McKechnie didn't command obedience — he inspired it through decency, consistency, and genuine care. 'He was strict with players, but his quiet self-discipline and fairness won their respect.' He led by being the man he wanted his players to become. His teams weren't just baseball clubs — they were communities built on mutual respect. In an era of hard-drinking, profanity-spewing managers, McKechnie sang in the church choir.",
    temperament: "Serene, patient, steady. The opposite of volcanic. McKechnie's emotional baseline was calm competence. He rarely raised his voice. He didn't panic in crises — after Hershberger's suicide, he rallied the Reds with quiet conviction, not fiery speeches. But he could be a 'taskmaster when that was needed' (Waner) — the iron was inside the velvet glove.",
    work_ethic: "Methodical and scholarly. Frank Chance recognized McKechnie's baseball mind when he was still a marginal utility infielder: 'He knew more baseball than all the rest of my team put together.' McKechnie studied the game deeply, particularly pitching and defense. His preparation was thorough but never ostentatious. He built systems that maximized consistency over brilliance.",
    lifestyle: "Devout, humble, family-oriented. Born to Scottish Presbyterian immigrants, McKechnie became a pillar of the Mifflin Avenue Methodist Church, singing baritone in the choir for much of his adult life. He didn't smoke, drink, or use profanity. He retired to a farm in Bradenton, Florida, where McKechnie Field is named after him. A man of profound personal integrity in a game that tested it constantly.",
    communication_style: "Quiet, direct, fatherly. McKechnie communicated through example more than words. When he spoke, players listened because he had earned the right. Junior Thompson: 'He and his wife were like parents to me.' He gave counsel privately, never publicly humiliating players. His loudest statement was rooming with a problem player — not confronting him, but simply being present.",
    loyalty_expectations: "Give your best effort, take care of yourself, and respect the team. McKechnie didn't demand submission — he asked for professionalism. Players who met this standard received unwavering support. Players who didn't were managed out quietly. He never betrayed a confidence — not even after Hershberger's death. 'He told it to me in confidence, and I will not utter it to anyone. I will take it with me to my grave.' He did.",
    dark_side: "The Pittsburgh betrayal. In 1926, three veteran Pirates demanded the removal of meddling vice president Fred Clarke from the dugout. McKechnie, a natural players' manager, initially supported his men. But fearing he'd be seen as opposing ownership, he reversed course and denounced his own players. The veterans were released. The Pirates collapsed. McKechnie was fired. A Pittsburgh writer gave the verdict: 'McKechnie showed, more than ever, the weakness that had been typical of him.' The man who earned respect through loyalty had betrayed the men who trusted him most. It nearly ended his career. His redemption — 20 more years, 3 more pennants, 2 World Series — would be earned the hard way.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Pitching, defense, and character. McKechnie built teams from the mound outward. He wanted pitchers he could develop, defenders who could execute, and men who would respect the system. Offense was secondary — a byproduct of sound fundamentals, not the foundation. 'To McKechnie, pitching and defense was not just a cliché but a religion.' He took last-place teams and made them competitive through run prevention, not slugging.",
    conflict_response: "ABSORB AND REDIRECT. McKechnie didn't suppress conflicts through authority or escalate them through passion. He absorbed them quietly, redirecting energy through private counsel and personal example. When a player was troubled, McKechnie invited him to his hotel room to talk. When discipline was needed, he roomed with the offender. His conflict resolution was pastoral, not militaristic. The one time he failed — Pittsburgh — haunted him for life.",
    clique_strategy: "UNIFY THROUGH PURPOSE. McKechnie created family-like teams where cliques dissolved naturally into shared mission. His teams at Pittsburgh, Cincinnati, and even hapless Boston were described as close-knit. He and his wife opened their home to young players. The team wasn't a collection of individuals — it was a community with McKechnie as its moral center.",
    player_types_that_thrive: [
      "Pitchers of all kinds — McKechnie's development ability was unmatched in his era",
      "Defensive specialists who value run prevention over glory",
      "Young players who respond to fatherly mentorship and patient development",
      "Reclamation projects — players who need a second chance and a steady hand",
      "Quiet professionals who appreciate respect and consistency over drama",
    ],
    player_types_that_struggle: [
      "Undisciplined stars who resist quiet authority — Babe Ruth's Braves were a disaster",
      "High-ego offensive players who need a free-swinging environment",
      "Volatile personalities who interpret gentleness as passivity",
      "Players who need intense emotional motivation to perform at their best",
      "Power hitters who chafe at a pitching-and-defense-first philosophy",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "MEDIUM — McKechnie tolerated some volatility but couldn't manage a Ruth-level disruption",
      discipline_floor: "MEDIUM — McKechnie's gentle approach required a baseline of self-discipline in players",
      star_exception: "No exceptions. McKechnie treated all players with the same quiet respect. Stars who demanded special treatment broke the system (Ruth, 1935).",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "McKechnie creates genuine family atmosphere. +2 Team Fit for all players after 5 games. His teams were consistently described as close-knit at every stop. But the system requires McKechnie's full attention — divided duties reduce the bonus." },
    volatility: { effect: "REDUCED", desc: "McKechnie's calm presence lowers team volatility naturally. High-volatility players are managed through private counsel and rooming arrangements, not confrontation. But extreme cases (Ruth-level) overwhelm the system." },
    discipline: { effect: "INCREASED", desc: "Discipline through moral example rather than punishment. Players self-regulate because they respect McKechnie. +1 Discipline for all players. But the effect is fragile — one undisciplinable star can collapse the entire structure." },
    ego: { effect: "MEDIUM-HIGH TOLERANCE", desc: "McKechnie handles egos through genuine respect. Stars feel valued because he treats them as adults. Max 3 high-ego players before the quiet authority is overwhelmed." },
    work_habits: { effect: "PITCHER BOOST", desc: "McKechnie's pitching expertise provides measurable improvement. All pitchers gain +1 to control/consistency. Defensive players gain +1 fielding. Offensive players receive average development." },
    adaptability: { effect: "HIGH", desc: "McKechnie adapted to 4 different franchises across 4 decades. His system is portable — pitching and defense work everywhere. Players from any era can benefit from his fundamentals-first approach." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Deacon", desc: "McKechnie's moral authority creates a clubhouse built on mutual respect. All players gain +1 Discipline passively. If any player's off-field behavior drops below threshold, McKechnie rooms with them — preventing 'Carousing' events entirely." },
    { tag: "Pitcher's Best Friend", desc: "McKechnie's pitching development ability is elite. All pitchers gain +1 to their primary stat after 10 games. Pitchers acquired via trade gain +2 as McKechnie's patient coaching unlocks their potential. 'If a pitcher can't win for McKechnie, he can't win for anybody.'" },
    { tag: "Defensive Religion", desc: "McKechnie's teams lead the league in run prevention. All fielders gain +1 defensive rating. Team error rate reduced by 15%. The 1940 Reds posted the fewest errors in history — defense was not a cliché but a faith." },
    { tag: "The Pittsburgh Scar", desc: "McKechnie carries the wound of betraying his players in the 1926 Pittsburgh mutiny. If ownership pressures McKechnie to act against player interests, there is a 40% chance he capitulates — resulting in -2 Harmony and -1 Team Fit for all affected players." },
    { tag: "For Hershie", desc: "McKechnie's handling of Willard Hershberger's death showed his greatest strength: pastoral care under impossible pressure. After any team tragedy or crisis event, McKechnie provides +3 Harmony and +2 Team Fit as the team rallies together. His secret-keeping is absolute." },
    { tag: "The Rebuilder", desc: "McKechnie specializes in taking over failing teams and making them competitive. When inheriting a team with a losing record, all players gain +1 morale and the team gains +1 to all defensive ratings immediately. He never had more than two losing seasons in a row." },
    { tag: "Church Choir Baritone", desc: "McKechnie's personal integrity creates a wholesome clubhouse culture. 'Scandal' and 'Nightlife' drama events are reduced by 50%. But Babe Ruth-type personalities resist the quiet — players with Ego > 8 and Discipline < 4 have -2 morale under McKechnie." },
    { tag: "Three-Team Pennant", desc: "The only manager to win pennants with three NL teams. McKechnie gains +1 to all ratings when managing a new franchise. His system is universal — pitching and defense work everywhere, with every roster." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Church / Choir Loft", affinity: "HIGH", note: "McKechnie sang baritone in the Mifflin Avenue Methodist Church choir for most of his adult life. His faith was the foundation of his character." },
    { location: "McKechnie Field / Home Ballpark", affinity: "HIGH", note: "Bradenton's spring training field was renamed for him in 1962. His home territory for decades — the quiet center of his baseball life." },
    { location: "Hotel Room (Rooming with Player)", affinity: "HIGH", note: "McKechnie's signature discipline method: room with the problem player. The hotel room was his counseling office, his confessional." },
    { location: "Pitcher's Mound / Bullpen", affinity: "HIGH", note: "McKechnie's spiritual home on the diamond. He spent more time with his pitchers than anywhere else — coaching, counseling, developing." },
    { location: "Farm / Home", affinity: "MEDIUM", note: "Retired to a farm in Bradenton, FL. A family man who valued domestic peace. His wife was described as co-parent to young players." },
    { location: "Dugout / Bench", affinity: "MEDIUM", note: "Frank Chance had McKechnie sit next to him on the bench in 1913 because of his baseball mind. The dugout was his classroom." },
    { location: "Front Office / Owner's Box", affinity: "LOW", note: "McKechnie was uncomfortable with ownership politics. The Pittsburgh mutiny proved he couldn't navigate the space between players and management." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pitching dominance — when McKechnie's staff is clicking, the team is nearly unbeatable",
      "Defensive excellence — clean games with no errors ignite team confidence",
      "Comeback from adversity — McKechnie's teams rally after crises (Hershberger, Ruth)",
      "New franchise energy — McKechnie's immediate improvement of struggling teams creates early momentum",
    ],
    cold_triggers: [
      "Ownership interference — the Pittsburgh mutiny pattern: management meddling destroys McKechnie's authority",
      "Undisciplinable stars — one Ruth-level disruption can collapse the quiet system",
      "World Series sweeps — the 1928 Cardinals were swept by the Yankees in 4; the 1939 Reds swept by the Yankees in 4",
      "Player tragedy or crisis — while McKechnie manages these well, they drain his emotional reserves",
    ],
    pressure_response: "STEADY IN CRISIS, VULNERABLE TO YANKEE POWER. McKechnie was baseball's great crisis manager — he held the 1940 Reds together through Hershberger's suicide and won the World Series. He survived firings, mutinies, and 115-loss seasons without breaking. His calm, methodical approach worked brilliantly in tight pennant races and close games. But against overwhelming force — the 1928 and 1939 Yankees — his precision system couldn't compete with raw talent. His pitching-and-defense philosophy was designed for margins, not blowouts. In ILB: McKechnie gains +2 in close games (3 runs or fewer) but suffers -1 against teams with dominant power offenses.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Room with the Deacon",
      type: "Action",
      text: "Your manager rooms with a problem player on the road trip. That player's Discipline increases by +2 permanently and any active 'Carousing' or 'Nightlife' penalties are removed. But the player's morale drops by -1 temporarily from the loss of freedom.",
      origin: "McKechnie's signature discipline method. When a player was likely to go out carousing, McKechnie's solution was to room with him. No lectures, no fines — just the quiet presence of a man who didn't drink, smoke, or curse.",
    },
    {
      title: "For Hershie",
      type: "Drama",
      text: "A team tragedy strikes. Your manager holds the clubhouse together through quiet conviction. All players gain +2 Harmony and +1 Team Fit. The team dedicates the rest of the season to the fallen. If they win the championship, the fallen player's family receives a full share.",
      origin: "After Willard Hershberger's suicide on August 3, 1940, McKechnie told the Reds: 'The thing for us to do now is win the pennant and vote Hershie's mother a full share.' The Reds went 19-2 after the tragedy and won the World Series. They gave Hershberger's mother $5,803.",
    },
    {
      title: "The Pittsburgh Betrayal",
      type: "Drama",
      text: "Ownership forces your manager to choose between his players and the front office. If he sides with players: +3 Harmony but fired at season's end. If he sides with ownership: -2 Harmony, the 3 highest-morale players are released, but the manager keeps his job. Either way, -1 Team Fit.",
      origin: "In 1926, three veteran Pirates demanded the removal of meddling vice president Fred Clarke. McKechnie initially supported them, then reversed under ownership pressure. The players were released. McKechnie was fired anyway. 'McKechnie showed the weakness that had been typical of him.'",
    },
    {
      title: "The Deacon's Percentages",
      type: "Game Action",
      text: "Your manager plays the percentages with absolute discipline. For this game, all close plays (stolen bases, sacrifice bunts, defensive positioning) have +15% success rate. But any aggressive, non-percentage play (hit-and-run, squeeze) has -10% success rate. 'Show me a manager who doesn't play percentages and I'll show you one who loses games.'",
      origin: "McKechnie was a proud 'by the book' manager who 'played the percentages faithfully because he believed the percentages would always win in the long run.' His Reds excelled in one- and two-run games.",
    },
    {
      title: "The Babe Ruth Problem",
      type: "Drama",
      text: "A fading superstar joins your roster with huge salary demands and zero discipline. His presence makes it 'nearly impossible to enforce discipline.' Team Discipline -3 for the duration. Three pitchers threaten to strike if he plays. If you bench him, media backlash (-1 publicity). If you play him, team suffers.",
      origin: "In 1935, the aging Babe Ruth joined McKechnie's Braves as vice president and assistant manager. Ruth couldn't run, committed constant errors, and three pitchers threatened to strike. The Braves went 38-115 — the worst record in modern NL history. Ruth retired after hitting .181.",
    },
    {
      title: "The Secret Keeper",
      type: "Action",
      text: "A player confides a deeply personal problem to your manager. The manager absorbs the burden without sharing it. That player's morale stabilizes at current level (cannot drop further). The manager's own effectiveness drops by -1 for 3 games from the emotional weight. The secret is never revealed.",
      origin: "Hershberger confided in McKechnie the night before his death. McKechnie told reporters: 'He told it to me in confidence, and I will not utter it to anyone. I will take it with me to my grave.' True to his word, on October 29, 1965, Bill McKechnie took the secret with him.",
    },
    {
      title: "Last Place to First",
      type: "Action",
      text: "Your manager inherits a last-place team and transforms it. All players gain +1 to their lowest stat. Team defensive rating +2. Pitching staff gains +1 ERA improvement. The transformation takes one full season — the bonus kicks in Year 2.",
      origin: "McKechnie took over a last-place Cincinnati team in 1938 (82-68 first year) and won back-to-back pennants by 1939-1940, including 100 wins and a World Series. He had done the same at Pittsburgh (mid-season takeover in 1922, World Series by 1925).",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, angular Scottish-American face. 5'10\", 160 pounds — thin and upright where Robinson was round and expansive. Calm, steady eyes with a hint of deep sadness behind them — the eyes of a man who kept Hershberger's secret for 25 years. Clean-shaven, hair neatly parted. The face of a deacon, a choirmaster, a man you would trust with your life.",
    attire: "Cincinnati Reds uniform, 1940 era — McKechnie managed in uniform, neat and proper. Cap square on his head, not pushed back casually like Robinson. Perhaps one hand resting on a pitcher's shoulder in the dugout — the gesture of a man who builds through touch and presence, not words.",
    mood: "Quiet strength. Serenity with steel underneath. The feeling of a Sunday morning in a country church — peace earned through discipline, not given freely. A warmth that is real but restrained, offered to those who earn it. The opposite of Robinson's Falstaffian excess — this is authority stripped to its moral essence.",
    style: "Cool, muted palette — sage greens, slate blues, and warm cream. Less gold and sepia than the Authoritarian cards. The palette should evoke a Methodist church, a well-kept garden, a clean dugout. Crosley Field or Forbes Field in the background, intimate and orderly. The Lumber era's moral center.",
    reference: "The third Players' Manager in the ILB spectrum. Hanlon taught through structure (11 OVR). Mack ruled through patriarchal longevity (12 OVR). McKechnie leads through moral character (11 OVR) — the quiet saint whose teams win because they respect the man in charge. This card should feel like a hymnal compared to Mack's leather-bound ledger and Hanlon's professor's notebook. The Players' Manager as Pastor, not Patriarch or Teacher.",
  },
};

// ═══════════════════════════════════════════════════════════════
// MANAGER RATING ENGINE
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
  // Players' Manager archetype accent
  pmGreen: "#55b877",
  pmDark: "#2d6b42",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.pmGreen}15`, border: `1px solid ${C.pmGreen}30`, color: C.pmGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function BillMcKechnieCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.pmGreen;

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
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, ${C.sepia} 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>⛪</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.archetype.toUpperCase()}</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ MANAGER ◆</div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={archColor} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "TEAMS", val: "5" },
                { label: "3-TEAM", val: "PENNANT" },
                { label: "PEAK", val: d.record.peak_record },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: stat.val && stat.val.length > 8 ? 9 : 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "👑 4 NL Pennants",
                "🏆 2× WS Champion",
                "⭐ HOF 1962",
                "📜 1,896 Career Wins",
                "⛪ Church Choir Baritone",
                "🔄 3-Team Pennant Winner",
                "🏟️ McKechnie Field",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>

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

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy"><p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p></Section>
                <Section title="Conflict Response"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p></Section>
                <Section title="Clique Strategy"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p></Section>
                <Section title="✅ Players Who Thrive">{d.playbook.player_types_that_thrive.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="⚠ Players Who Struggle">{d.playbook.player_types_that_struggle.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}

              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}

              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONG") ? `${C.traitGreen}20` : effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("STRONG") ? C.traitGreen : effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>
                  {d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}
                </Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}

              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}

              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McKechnie's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}

              {tab === "engine" && (<>
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>{RATING_ENGINE.overall.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>))}</div>
                </Section>
                <Section title="McKechnie's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}

              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}

        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, era: d.era, ilb_team: d.ilb_team, archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
