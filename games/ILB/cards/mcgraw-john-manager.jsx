import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: JOHN McGRAW
// Era: 1900 · Archetype: Authoritarian
// "Little Napoleon" — The original iron-fisted manager
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "John McGraw",
  nickname: "Little Napoleon",
  year: 1905,
  team: "New York Giants",
  era: "1900s",
  ilb_team: "Banners",
  archetype: "Authoritarian",
  born: "April 7, 1873 — Truxton, NY",
  died: "February 25, 1934 — New Rochelle, NY (age 60)",
  hof: "Inducted 1937 (Centennial Committee). Plaque reads: 'greatest assessor of baseball talent.'",
  height: '5\'7"',
  weight: "155 lbs",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD (Peak Era Snapshot: 1904-1905)
  // Source: Baseball-Reference, SABR BioProject, SI Vault
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 2763,
    career_losses: 1948,
    win_pct: ".586",
    pennants: 10,
    world_series: 3,
    seasons_managed: 33,
    ejections: 131,
    peak_team: "1905 New York Giants",
    peak_record: "105-48",
    consecutive_pennants: "4 (1921-1924)",
    games_over_500: 815,
    first_or_second: "21 of 29 full seasons",
    notable: "Most NL wins all-time. 815 games over .500 — more than any manager in history.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  //
  // GAME MANAGEMENT (how they influence on-field outcomes)
  //   TACTICS (TAC) 1-5: Strategic depth, in-game moves
  //   PITCHING MGMT (PIT) 1-5: Bullpen usage, starter management
  //   LINEUP CRAFT (LIN) 1-5: Batting order, platoons, matchups
  //   ADAPTABILITY (ADP) 1-5: Adjusting mid-game/mid-series
  //
  // CLUBHOUSE MANAGEMENT (how they shape the 6 chemistry axes)
  //   DISCIPLINE (DIS) 1-10: Structure enforcement
  //   EGO MGMT (EGO) 1-10: Handling stars and hierarchy
  //   HARMONY (HAR) 1-10: Conflict resolution, cohesion building
  //   INTENSITY (INT) 1-10: Motivational pressure
  //   STRATEGY (STR) 1-10: Role optimization, roster efficiency
  //   FLEXIBILITY (FLX) 1-10: Personality/era tolerance
  //
  // OVERALL (OVR) 3-13: Same scale as players
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management
    tac: 5,  // Invented inside baseball. Called every pitch. Pioneered platoon, hit-and-run, pinch hitting.
    pit: 4,  // Managed Mathewson to 3 WS shutouts. Innovated relief usage with Doc Crandall.
    lin: 5,  // First manager to use platoons systematically. Created the pinch-hitter role.
    adp: 3,  // Adapted from small ball to power era reluctantly. Hated the home run but adjusted.

    // Clubhouse Management
    dis: 10, // Absolute control. Called every pitch. Imposed curfews. Reviewed players' meals on road trips.
    ego: 3,  // Low tolerance. Publicly humiliated Larry Doyle ("miserable yellow thing"). Stars submitted or left.
    har: 4,  // Paradoxical — raised salaries after blunders (Merkle, Snodgrass) but verbally abusive daily.
    int: 9,  // Relentless intensity. 131 ejections. "Full of snap and vigor." The most belligerent team in America.
    str: 9,  // "McGraw had a plan, found the guys who fit into it, and pushed them relentlessly." — Chris Jaffe
    flx: 3,  // "I permit no deviation from instructions." Fined Sammy Strang $25 for hitting a HR when told to bunt.

    ovr: 12, // Legend tier. Connie Mack: "There has been only one manager — and his name is McGraw."
  },

  rating_justification: {
    tac: "Pioneered inside baseball: hit-and-run, squeeze play, Baltimore chop. Called every pitch from the bench. Signals to fielders, batters, runners unprecedented in complexity. 'On this team, with first base occupied, it is almost mandatory that my batter hit to right field.'",
    pit: "Managed Christy Mathewson to three shutouts in the 1905 World Series. Innovated relief pitching with Doc Crandall. George Ferguson became first reliever with 20+ appearances under McGraw (1906). But McGraw's ego sometimes overrode pitcher management.",
    lin: "First systematic platooner in baseball history. Created the pinch-hitter as a tactical role (Sammy Strang, 1904). Casey Stengel learned platooning by watching McGraw from the bench. Rebuilt rosters ruthlessly — released 9 players on Day 1 with the Giants.",
    adp: "Adapted from dead-ball to live-ball era, shifting from stolen bases to power. 'Despite his personal dislike of the home run, McGraw adapted.' But adaptation was grudging — he signaled every pitch into his final season. Players in 1932 resented that he still called every pitch.",
    dis: "Maximum. Imposed curfews, reviewed meals, controlled lifestyle on and off field. 'I permit no deviation from instructions.' Fined Irish Meusel $100 for hitting a two-run HR when told to bunt. 131 career ejections — held the record until Bobby Cox broke it in 2007.",
    ego: "Low tolerance for ego. Called Larry Doyle — his own team captain — 'the miserable yellow thing' in front of the team. Stars either submitted completely or were traded. But paradoxically generous after blunders — raised salaries for Merkle and Snodgrass after their infamous errors.",
    har: "Complex. 'He could be gracious and generous when he wanted to be.' Gave money to players, took on reclamation projects. Best friend was the saintly Christy Mathewson. But also 'foul-mouthed and mean-spirited.' Jekyll and Hyde personality. His players 'suffered his tyranny as the price of victory, proud to be Giants.'",
    int: "Maximum. Team described as 'most belligerent in America.' McGraw 'swaggered through every city in the league, battling opposing teams, managers, owners, umpires, and league officials.' Dodged rocks and bottles leaving enemy ballparks. Put 'Champions of the World' on jerseys in 1906.",
    str: "Elite talent evaluator. 'Greatest assessor of baseball talent' (HOF plaque). Sharp eye for talent others missed. Got useful work from 'drinkers and neurotics other clubs had given up on.' Built 10 pennant-winning teams from 1904-1924 through constant roster turnover and reclamation projects.",
    flx: "Low. Controlled everything. Called every pitch into his 30th season as manager. By 1932, players were 'hostile to McGraw, resentful that he insisted on calling every pitch and, off the field, controlling their lifestyle.' His inflexibility ultimately drove his retirement.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Absolute autocrat. Called every pitch, moved every fielder, sent every runner, guided every hitter. 'On this team, with first base occupied it is almost mandatory that my batter hit to right field. I permit no deviation from instructions.' Compared by historians to Bobby Knight — found players who fit his system, not superstars who demanded their own. Casey Stengel learned his entire managerial philosophy sitting on McGraw's bench.",
    temperament: "Volcanic. 'A male version of the whore with a heart of gold — a tough, flinty so-and-so who was field-smart, a man's man.' — Frank Deford. Arrogant, abrasive, pugnacious. But also generous, loyal to old friends, and capable of great tenderness. Gave jobs to former players. Raised salaries after humiliating errors. A true paradox.",
    work_ethic: "Obsessive. Lived and breathed baseball 24/7. Studied opponents relentlessly. Personally scouted talent through a network of contacts across the bush leagues. 'He lived to teach young men how to play baseball.' — Bill James. But also loved the horses, the stage, cigars, and whiskey.",
    lifestyle: "Broadway celebrity. Owned a poolroom with gambler Arnold Rothstein. Ventured into vaudeville for 15 weeks in 1912 (appearing with 'Odiva the Goldfish Lady'). Owned a share of a Cuban racetrack and casino with Giants owner Stoneham. Part-owner of the Giants from 1919. The most famous manager in New York City — which in 1905 meant the most famous manager in America.",
    communication_style: "Brutal directness. 'Look at him, the miserable yellow thing, the captain of my ball club.' Public tongue-lashings were standard. But also gave private counsel. Burleigh Grimes: 'I learned more in one season under McGraw than in all the years before or since.' He taught constantly between the abuse.",
    loyalty_expectations: "Total submission. You followed orders or you were gone. But if you submitted, McGraw was fiercely loyal. He gave jobs to old Oriole and Giant players like Dan Brouthers, Amos Rusie, and Mickey Welch. Larry Doyle, despite being humiliated publicly, was 'distraught' when finally traded.",
    dark_side: "The gambling connections. The association with Arnold Rothstein (later the financial backer of the 1919 Black Sox fix). The decline — by the late 1920s, McGraw became 'increasingly erratic and harder to deal with,' haunted by the deaths of Mathewson, McGinnity, and Ross Youngs. The man who controlled everything couldn't control time.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE (Manager-specific — replaces player dossier)
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Find players who fit the system, not superstars who demand exceptions. McGraw won 10 pennants with players like Fred Merkle, Fred Snodgrass, and Ross Youngs — not with transcendent stars (Mathewson excepted). He traded daringly and took reclamation projects other clubs abandoned. His teams were constructed, not collected.",
    conflict_response: "SUPPRESS. McGraw did not mediate conflicts — he ended them through authority. Players who challenged him were traded or released. He released 9 players on his first day with the Giants. The clubhouse was quiet because McGraw's word was law, not because everyone got along.",
    clique_strategy: "PREVENT. McGraw wanted one clique: his. Any factional behavior was crushed. Players organized around McGraw's authority, not around each other. This prevented internal politics but also prevented organic team bonding.",
    player_types_that_thrive: [
      "Disciplined professionals who follow orders without question",
      "Reclamation projects and 'drinkers and neurotics' — McGraw could salvage broken talent",
      "Young players with no ego — McGraw was a master teacher of raw talent",
      "Grinders and role players who accepted their place in the hierarchy",
      "Players motivated by winning above all else",
    ],
    player_types_that_struggle: [
      "High-ego stars who demand autonomy (Edd Roush: 'I couldn't have been happier when he traded me')",
      "Free spirits who resist lifestyle control (curfews, meal reviews, pitch-calling)",
      "Players who need emotional support — McGraw's encouragement came through abuse",
      "Veterans set in their ways who won't adapt to McGraw's system",
      "Sensitive personalities — the public humiliation was real and constant",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 2,
      max_volatility: "LOW — McGraw himself provided all the volatility the team needed",
      discipline_floor: "HIGH — any player below the discipline floor is released immediately",
      star_exception: "Mathewson was the only player McGraw treated as an equal. All others submitted.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT (How McGraw shapes the 6 axes)
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "MEDIUM", desc: "McGraw forces fit through authority, not consensus. Players conform or leave. High baseline but brittle — if authority cracks, fit collapses." },
    volatility: { effect: "STRONGLY REDUCED", desc: "McGraw is the only source of volatility allowed. Player volatility is suppressed through fear and discipline. But the manager himself creates organizational volatility." },
    discipline: { effect: "STRONGLY INCREASED", desc: "Maximum discipline enforcement. Curfews, meal reviews, pitch-calling, lifestyle control. The most disciplined teams in baseball history." },
    ego: { effect: "LOW TOLERANCE", desc: "Stars submit or are traded. Only Mathewson was exempt. High-ego clusters will fracture under McGraw — max 2 high-ego players before penalties." },
    work_habits: { effect: "INCREASED", desc: "McGraw demanded preparation and effort. 'He lived to teach young men how to play baseball.' Players improved under him — Grimes learned more in one season than all prior years." },
    adaptability: { effect: "LOW", desc: "McGraw does not adapt to players — players adapt to McGraw. Era-foreign players struggle. The system is rigid by design. Strength becomes weakness in his final years." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Little Napoleon", desc: "Absolute authority. All team decisions flow through McGraw. Suppresses player autonomy but creates tactical clarity. +2 Discipline, -1 Adaptability for all players." },
    { tag: "The Teacher", desc: "Master developer of raw talent. Young players (age < 25) gain +1 to any stat after 5 games under McGraw. 'He lived to teach young men how to play baseball.'" },
    { tag: "Reclamation Artist", desc: "Can extract value from 'broken' players other managers discarded. Players with negative chemistry traits have those penalties reduced by 1 under McGraw." },
    { tag: "Broadway King", desc: "McGraw's celebrity attracts media attention. +1 Publicity in New York. But also attracts gamblers and scandal — 10% chance of 'Gambling Connection' drama event per series." },
    { tag: "Iron Fist", desc: "Players cannot refuse lineup decisions or role assignments. Eliminates 'Role Rejection' events. But players with Ego > 7 have -2 morale permanently." },
    { tag: "Umpire Baiter", desc: "131 career ejections. McGraw gets ejected from 15% of games. When ejected, team loses tactical bonuses for the remainder of the game." },
    { tag: "Ghost of Mathewson", desc: "McGraw's best friend Christy Mathewson died in 1925. After 1925, McGraw's effectiveness declines. -1 to all clubhouse ratings in late-career scenarios." },
    { tag: "Champion's Swagger", desc: "McGraw put 'World's Champions' on his team's jerseys. After any series win, +1 Intensity for next series. After a loss, -1 Harmony as McGraw's rage spills over." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Polo Grounds / Home Ballpark", affinity: "HIGH", note: "McGraw's kingdom. Managed here for 30 years. The most feared venue in the NL." },
    { location: "Bar / Saloon", affinity: "HIGH", note: "Owned a poolroom with Arnold Rothstein. Loved whiskey and cigars. Broadway nightlife regular." },
    { location: "Gambling Hall / Racetrack", affinity: "HIGH", note: "Owned share of Cuban racetrack and casino. Deep gambling connections. His fatal flaw." },
    { location: "Theater / Vaudeville", affinity: "MEDIUM", note: "Ventured into vaudeville for 15 weeks in 1912. Celebrity in New York's entertainment world." },
    { location: "Hotel / Private Suite", affinity: "MEDIUM", note: "Conducted team meetings, reviewed meals, enforced curfews. The hotel was an extension of his authority." },
    { location: "Practice Field", affinity: "HIGH", note: "'He lived to teach young men how to play baseball.' Spring training in Marlin, TX was his classroom." },
    { location: "Church / Community", affinity: "LOW", note: "Irish Catholic background but not publicly devout. Too busy winning." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant race pressure — McGraw's teams finished first or second 21 of 29 seasons",
      "Rivalry games — McGraw 'swaggered through every city, battling everyone'",
      "After a loss — rage fueled relentless tactical adjustments",
      "Young talent emerging — 'He lived to teach young men how to play baseball'",
    ],
    cold_triggers: [
      "Death of close associates — Mathewson, McGinnity, Ross Youngs devastated him",
      "World Series losses — lost 6 of 9 Fall Classics despite 10 pennants",
      "Health decline — plagued by illness in final years, managed from clubhouse",
      "Player rebellion — by 1932, players 'hostile' to his pitch-calling and lifestyle control",
    ],
    pressure_response: "PARADOXICAL. McGraw won 10 pennants but lost 6 of 9 World Series. His regular-season dominance was unmatched, but in the ultimate pressure of the Fall Classic, his rigidity sometimes became a liability. The 1905 WS (3 Mathewson shutouts) was his masterpiece. The 1921-22 WS wins over the Yankees were personal triumphs. But losses to the Athletics, Red Sox, and Senators haunt his legacy. In ILB: McGraw is elite in regular-season management but carries a 'WS Curse' — 40% chance of tactical bonus reduction in championship series.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS (Manager-specific events)
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "I Permit No Deviation",
      type: "Game Action",
      text: "Your manager calls every pitch, every play, every move. Your team gains +2 Tactics this game but any player with Ego > 6 has -1 Contact from frustration. If a player hits a home run against orders, they are fined and benched next game.",
      origin: "McGraw fined Sammy Strang $25 for hitting a home run when told to bunt: 'I permit no deviation from instructions.' He also fined Irish Meusel $100 for the same offense.",
    },
    {
      title: "Release the Bums",
      type: "Trade",
      text: "Your manager releases up to 3 players rated (+5) or below in a single move. 'When I got to New York, the first thing I did was release nine players.' Draw 2 Free Agent Cards. Team Discipline +2 next series.",
      origin: "McGraw's first act as Giants manager in 1902 was releasing 9 of 17 players, despite the owner's protests. He rebuilt the team from scratch and went from last place to pennant contender in one year.",
    },
    {
      title: "The Rothstein Connection",
      type: "Drama",
      text: "Your manager's gambling connections surface in the press. If team overall is 85+, it's a minor scandal (no effect). If below 85, a player with the lowest Discipline is implicated — suspended 3 games and -2 Team Fit.",
      origin: "McGraw co-owned a poolroom with Arnold Rothstein, who later bankrolled the 1919 Black Sox fix. McGraw also owned a share of a Cuban racetrack and casino with Giants owner Stoneham.",
    },
    {
      title: "The Reclamation Project",
      type: "Action",
      text: "Your manager signs a discarded player that everyone else gave up on. Choose any released/free agent player rated (+5) or below. That player gains +1 to their highest stat permanently. 'He got useful work from drinkers and neurotics other clubs had given up on.'",
      origin: "McGraw took on reclamation projects like Turkey Mike Donlin, Bugs Raymond, and Hal Chase — salvaging careers other managers couldn't handle.",
    },
    {
      title: "Champions of the World",
      type: "Action",
      text: "After winning a series, your manager puts 'WORLD'S CHAMPIONS' on the team's jerseys. +2 Intensity for next series. But opposing teams are now enraged — they gain +1 Clutch against you for the rest of the game.",
      origin: "In 1906, McGraw arrogantly had 'Champions of the World' emblazoned across the Giants' jerseys. The team became the most hated — and feared — in baseball.",
    },
    {
      title: "Little Napoleon Gets Tossed",
      type: "Game Action",
      text: "Your manager is ejected after a violent argument with the umpire. For the rest of this game, all tactical bonuses are removed. But your team's Intensity goes up +1 as players rally around the outrage.",
      origin: "McGraw was ejected 131 times — the all-time record until Bobby Cox surpassed him in 2007. He 'abused umpires' and 'was the most notorious baiter of umpires from the moment he became a player.'",
    },
    {
      title: "Proud to Be a Giant",
      type: "Action",
      text: "Your manager's intensity creates a team identity so strong that players would rather suffer his tyranny than play elsewhere. All players with 3+ games under this manager gain +1 Team Fit permanently. 'His players suffered his tyranny as the price of victory, proud to be Giants.'",
      origin: "Larry Doyle famously said 'It's great to be young and a Giant' despite McGraw's public humiliation of him. When traded, Doyle was distraught. Burleigh Grimes said he 'learned more in one season under McGraw than in all the years before — or since.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Small, pugnacious Irish face. 5'7\" 155 lbs — small even for his era. Sharp, aggressive eyes. Square jaw set in permanent combative scowl. Dark hair, clean-shaven in his prime. The look of a man who fights for everything and expects you to do the same.",
    attire: "New York Giants manager's suit, 1905 era. Dark wool suit with vest and watch chain — McGraw managed in street clothes, not a uniform, as was common for the era. Bowler hat or bareheaded. Standing with arms crossed in the dugout, jaw thrust forward, surveying his kingdom.",
    mood: "Commanding fury. Not calm, not serene — coiled intensity. The look of a man who has just called your pitch from 90 feet away and dares you to deviate. Napoleon surveying Austerlitz. The smartest, angriest man in the ballpark.",
    style: "Rich, dark sepia with aggressive warm tones. Heavier shadows than player cards — this is a card about power, not beauty. The Polo Grounds in the background, packed crowd visible. Ornate border with interlocking 'NY' motif. Gold leaf accents. The card should feel like authority incarnate.",
    reference: "This is the first manager card in ILB. It should feel weighty — like holding a piece of baseball's DNA. McGraw IS the archetype of the American sports manager. The card should evoke a T206 tobacco card but with the presence of a portrait of a general. Dark. Powerful. Unforgettable.",
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
// THEME COLORS (matching player cards)
// ═══════════════════════════════════════════════════════════════
const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  // Manager-specific accents
  authRed: "#c44040",    // Authoritarian archetype color
  authDark: "#7a2020",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  // Archetype colors (matching board)
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
export default function JohnMcGrawCard() {
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
              {/* Placeholder portrait */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>👔</div>
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
                { label: "1ST/2ND", val: d.record.first_or_second },
                { label: "OVR .500", val: `+${d.record.games_over_500}` },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "👑 10 NL Pennants",
                "🏆 3× WS Champion",
                "⭐ HOF 1937",
                "📜 2,763 Career Wins",
                "🔥 131 Ejections",
                "💎 4 Consecutive Pennants",
                "🏟️ +815 Games Over .500",
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McGraw's real life, become universal cards playable in any game.</p>
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
                <Section title="McGraw's Derivation">
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
