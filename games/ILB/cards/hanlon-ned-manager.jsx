import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: NED HANLON
// Era: 1900 · Archetype: Players' Manager
// "Foxy Ned" — The Father of Modern Baseball
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Ned Hanlon",
  nickname: "Foxy Ned",
  year: 1896,
  team: "Baltimore Orioles",
  era: "1900s",
  ilb_team: "Banners",
  archetype: "Players' Manager",
  born: "August 22, 1857 — Montville, CT",
  died: "April 14, 1937 — Baltimore, MD (age 79)",
  hof: "Inducted 1996 (Veterans Committee). Called 'The Father of Modern Baseball' by The Sporting News.",
  height: '5\'9"',
  weight: "170 lbs",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD (Peak Era Snapshot: 1894-1900)
  // Source: Baseball-Reference, SABR BioProject, ESPN, HOF
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 1313,
    career_losses: 1164,
    win_pct: ".530",
    pennants: 5,
    world_series: 0,
    temple_cups: 2,
    seasons_managed: 19,
    ejections: "Few — Hanlon managed in civilian clothes from the bench",
    peak_team: "1894-1896 Baltimore Orioles",
    peak_record: "87-40 (1894), 87-43 (1895), 90-39 (1896)",
    peak_pct: ".668 over 7 seasons (1894-1900)",
    first_or_second: "5 pennants in 7 seasons (1894-1900)",
    notable: "Mentored 5 future HOF managers: McGraw, Mack, Huggins, Robinson, Jennings. First to win 100 games in a season (Brooklyn, 101 wins, 1899).",
    hof_managers_mentored: ["John McGraw", "Connie Mack", "Miller Huggins", "Wilbert Robinson", "Hughie Jennings"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management (1-5)
    tac: 5,  // Invented inside baseball: hit-and-run, squeeze, Baltimore chop, delayed steal, sign systems, platoons, pitching rotation, spring training.
    pit: 3,  // Solid pitching management but not his specialty. Focused on offense and baserunning innovation.
    lin: 5,  // Pioneer of platooning. First systematic use of lineup construction as a tactical weapon.
    adp: 4,  // Successfully rebuilt rosters multiple times. Took last-place Orioles to pennant in 2 years. But declined in Deadball Era (.449 after 1900).

    // Clubhouse Management (1-10)
    dis: 5,  // Moderate. Hanlon wasn't a disciplinarian — he purged unmotivated players but trusted his stars. Sam Crawford said the veterans "didn't pay any attention to him."
    ego: 8,  // Excellent. Managed a clubhouse of future HOF managers — McGraw, Jennings, Robinson, Kelley. Let strong personalities flourish within his system.
    har: 9,  // Elite. His greatest gift. Created cohesion among feisty, aggressive players who respected him. "Gained and held the confidence of all with whom he came into contact."
    int: 6,  // Moderate. Not a fire-breather — his intensity came through relentless teaching, not screaming. "He talked baseball from morning until night."
    str: 9,  // Elite talent evaluator. "Almost uncanny ability to judge players." Rebuilt the Orioles from last place with shrewd trades and California League finds.
    flx: 7,  // Good. Adapted to multiple eras and cities. But his .449 Deadball Era record suggests the game eventually passed him by.

    ovr: 11, // Legend tier. "The Father of Modern Baseball." Connie Mack: "The greatest leader baseball ever had."
  },

  rating_justification: {
    tac: "Invented or perfected: hit-and-run, squeeze play, Baltimore chop, delayed steal, sign systems between coaches and players, platoon system, pitching rotation, spring training. Head of the NL rules committee — championed the infield fly rule. 'The game's greatest strategist.' — The Sporting News, 1937.",
    pit: "Managed solid pitching staffs but was primarily an offensive innovator. Used Sadie McMahon, Kid Gleason, and Jerry Nops effectively. Not known for bullpen innovation like later managers. Rating of 3 — competent but not his forte.",
    lin: "First manager to systematically platoon players. Pioneered lineup construction as a tactical weapon. His Brooklyn Superbas won 101 games in 1899 — first team to reach 100 wins. Constantly shuffled lineups to exploit matchups. Maximum rating.",
    adp: "Took a last-place team (1892 Orioles, 46-101) and built it into a dynasty within 2 years. Successfully transitioned from Baltimore to Brooklyn with most of his roster. But post-1900, his win percentage dropped to .449 — he finished no higher than 2nd in the Deadball Era. The game evolved past him. Rating of 4.",
    dis: "Moderate disciplinarian. Purged unmotivated players ruthlessly — only 3 of his 1892 Orioles survived to 1894. But Sam Crawford famously claimed the Oriole veterans 'didn't pay any attention to Ned Hanlon, their manager.' He trusted his stars to self-govern within his system. Rating of 5.",
    ego: "Managed a clubhouse containing FIVE future Hall of Fame managers simultaneously (McGraw, Jennings, Robinson, Kelley, Keeler). That requires extraordinary ego management. 'A personality that enabled him to gain and hold the confidence of all with whom he came into contact.' — The Sporting News. Rating of 8.",
    har: "His greatest strength. Created cohesive, aggressive teams from feisty, combative personalities. The Orioles were rough and rowdy but played as a unit. Players fought opponents, not each other. McGraw, Robinson, Kelley, Jennings, Keeler — all strong personalities, all loyal to Hanlon. He is buried in New Cathedral Cemetery in Baltimore; McGraw, Robinson, and Kelley are buried nearby. That's harmony that lasted beyond the grave. Rating of 9.",
    int: "Not a screamer. Hanlon's intensity came through obsessive teaching. Connie Mack: 'He talked baseball from morning until night, on the bench, on the field, in hotel lobbies, at meals, aboard trains. Players on his clubs heard nothing, ate nothing, and dreamed nothing but baseball.' Persistent, not volcanic. Rating of 6.",
    str: "Elite talent evaluator. 'An almost uncanny ability to judge players, a faculty of imparting to them his remarkable store of knowledge.' Rebuilt the Orioles from scratch — acquired Keeler, Kelley, Jennings, Brouthers, and Reitz through shrewd trades and minor league finds. Found Heinie Reitz in the California League for $300. Rating of 9.",
    flx: "Adapted from 19th-century baseball to the early Deadball Era. Successfully moved his operation from Baltimore to Brooklyn. But post-1900 his record declined sharply (.449). Some say the game passed him by; others say he was focused on bringing baseball back to Baltimore. 'Foxy Ned' was flexible enough to reinvent himself as an owner and civic leader. Rating of 7.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Teacher-first. Hanlon's greatest legacy was developing people. He managed five future Hall of Fame managers and taught them everything they knew. Connie Mack: 'He knew more about baseball than any other man of his day. And he knew how to teach the game to young players.' Not a dictator like McGraw — he empowered players to think within his system. His players became managers because he taught them to manage themselves.",
    temperament: "Calm, shrewd, and calculated — hence 'Foxy Ned.' Not volatile or emotional. Managed from the bench in civilian clothes, not in uniform. When things got tough, Crawford said, Hanlon 'would sit there on the bench and wring his hands' rather than explode. His steadiness was both a strength (consistency) and a weakness (players sometimes ignored him).",
    work_ethic: "Obsessive about the game. 'He talked baseball from morning until night, on the bench, on the field, in hotel lobbies, at meals, aboard trains.' — Connie Mack. Rose from a Connecticut cotton mill at age 13 to become the most innovative manager in baseball. His father was an Irish immigrant house builder — Hanlon inherited the work ethic and the ability to build things from the ground up.",
    lifestyle: "Family man and civic leader. Lived in a fine corner mansion at 1401 Mount Royal Avenue in Baltimore's Bolton Hill neighborhood. Weekly presence at Corpus Christi Catholic Church. After managing, became a driving force behind Memorial Stadium, the Mount Pleasant Golf Course, and served on Baltimore's Parks Board until his death. Quiet respectability — the opposite of McGraw's Broadway lifestyle.",
    communication_style: "Persistent and thorough rather than dramatic. Taught constantly but didn't scream. 'A personality that enabled him to gain and hold the confidence of all with whom he came into contact.' Players respected him for his knowledge, even if the old veterans sometimes tuned him out. His communication worked best with young, hungry players who were willing to learn.",
    loyalty_expectations: "Deep loyalty, earned through fairness. Hanlon was the hero of the Players' League — the only player who honored his contract without receiving a penny. 'He stands to-day as the hero of the Players' League. He is the only ball player in that League who has held to the contract he signed.' He expected loyalty because he gave it first.",
    dark_side: "The Sam Crawford problem. Crawford claimed the veterans 'didn't pay any more attention to Ned Hanlon than they did to the batboy.' Whether true or exaggerated, it reveals Hanlon's vulnerability: his gentle authority could be ignored by strong personalities. His .304-.441 record without Willie Keeler on his teams suggests his success may have depended heavily on having the right players. In ILB: Hanlon thrives with talented teams but struggles when he lacks star-caliber talent to carry his system.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Find talented, aggressive young players and teach them to play as a unit. Hanlon took a last-place team and kept only 3 players from the original roster. He rebuilt through shrewd trades and minor league scouting — finding Keeler, Kelley, Jennings, and Reitz. His teams were built on speed, execution, and teamwork. He didn't need superstars who demanded the spotlight — he created superstars through development.",
    conflict_response: "MEDIATE. Hanlon didn't suppress conflict — he redirected it outward. His Orioles were the most aggressive, combative team in baseball, but they fought opponents and umpires, not each other. He channeled the natural feistiness of players like McGraw and Jennings into collective intensity. When internal friction arose, he used his personal relationships to smooth things over.",
    clique_strategy: "UNIFY. Hanlon wanted one team, not factions. His Baltimore teams were a band of brothers — aggressive, rowdy, and deeply loyal to each other. Four of his Orioles (McGraw, Robinson, Kelley) are buried near him in the same Baltimore cemetery. He built teams that bonded through shared combat against the rest of the league.",
    player_types_that_thrive: [
      "Young, hungry players eager to learn — Hanlon was a master developer",
      "Aggressive, feisty personalities who channel intensity into competition",
      "Speed-and-contact players who fit the 'inside baseball' system",
      "Players with high baseball IQ who can think within the system",
      "Strong personalities who need a framework, not a cage — future leaders",
    ],
    player_types_that_struggle: [
      "Low-effort players — Hanlon purged them immediately ('only 3 of 17 survived')",
      "Players who need constant discipline — Hanlon won't police your behavior",
      "Power-only sluggers with no speed or versatility — they don't fit the system",
      "Isolated loners who won't bond with the team — Hanlon needs collective identity",
      "Players who exploit gentle authority — some veterans ignored Hanlon entirely",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 5,
      max_volatility: "HIGH — Hanlon channels volatility outward, turning it into competitive fire",
      discipline_floor: "MODERATE — Hanlon purges the lazy but trusts the talented to self-govern",
      star_exception: "All stars are treated as potential leaders. No one is above the team, but everyone is trusted within it.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "HIGH", desc: "Hanlon builds cohesive units. His teams bond through shared aggression and collective identity. +2 Team Fit when roster has 3+ players with 'Aggressive' or 'Competitive' traits." },
    volatility: { effect: "REDUCED", desc: "Volatility is redirected outward — against opponents, not teammates. Internal volatility drops, but the team as a whole remains fierce. -1 internal Volatility, +1 Intensity vs opponents." },
    discipline: { effect: "MODERATE", desc: "Hanlon trusts talented players to self-govern. Discipline is maintained through roster purges, not daily enforcement. Players with low Discipline risk being released, not punished." },
    ego: { effect: "MODERATE TOLERANCE", desc: "Hanlon managed five future HOF managers simultaneously. He can handle strong egos — but only if they respect the team concept. High-ego players who are also team-oriented thrive." },
    work_habits: { effect: "STABLE", desc: "Hanlon talks baseball obsessively. Players absorb his knowledge through constant exposure. Work Habits improve naturally through immersion rather than enforcement." },
    adaptability: { effect: "MODERATE", desc: "Hanlon adapted successfully from 19th century to early Deadball Era. But his effectiveness declined after 1900 — the game eventually moved past him. Era-native players thrive; later-era players may struggle." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Father of Modern Baseball", desc: "Hanlon invented inside baseball. All players under Hanlon gain +1 Tactics. His teams execute fundamentals at a level other teams can't match." },
    { tag: "The Great Teacher", desc: "Hanlon's greatest gift. Young players (age < 28) gain +1 to their lowest stat after 10 games under Hanlon. 'He talked baseball from morning until night.'" },
    { tag: "Foxy Ned", desc: "Shrewd and calculated. Hanlon sees trades and roster moves others miss. Once per series, Hanlon can reject an unfavorable trade and force a re-deal at +1 value." },
    { tag: "Band of Brothers", desc: "Hanlon's teams fight as a unit. When 3+ players have been on the roster for 5+ games together, +1 Team Fit and +1 Clutch in elimination games." },
    { tag: "Players' League Hero", desc: "Hanlon was the only player who honored his Players' League contract without pay. Players with the 'Loyal' trait gain +1 Team Fit under Hanlon." },
    { tag: "The Gentle Authority", desc: "Hanlon doesn't scream — he teaches. But strong-willed veterans may ignore him. If 3+ players have Ego > 7, Hanlon's Tactics bonus is reduced by 1." },
    { tag: "Cotton Mill Kid", desc: "Rose from a Connecticut cotton mill at age 13. Hanlon respects grinders. Players from working-class backgrounds gain +1 Work Habits under Hanlon." },
    { tag: "Cemetery Brotherhood", desc: "McGraw, Robinson, and Kelley are buried near Hanlon in Baltimore. If 2+ former Hanlon players are on the same team, +2 Team Fit permanently." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Practice Field / Spring Training", affinity: "HIGH", note: "Invented spring training as a concept. His practice field was his classroom. Relentlessly drilled fundamentals." },
    { location: "Hotel Lobby / Train Car", affinity: "HIGH", note: "'He talked baseball in hotel lobbies, at meals, aboard trains.' Every moment was a teaching opportunity." },
    { location: "Home / Family Residence", affinity: "HIGH", note: "Lived in a fine mansion at 1401 Mt. Royal Ave in Bolton Hill, Baltimore. Family man with five children." },
    { location: "Church", affinity: "HIGH", note: "Weekly presence at Corpus Christi Catholic Church. His funeral was held there in 1937." },
    { location: "Civic Building / Parks Board", affinity: "MEDIUM", note: "Served on Baltimore's Parks Board. Helped plan Memorial Stadium. Civic leader after baseball." },
    { location: "Bar / Saloon", affinity: "MEDIUM", note: "Co-owned a saloon with Wilbert Robinson in Baltimore. Social but not a heavy drinker." },
    { location: "Gambling Hall", affinity: "LOW", note: "Unlike McGraw, Hanlon had no gambling connections. His off-field life was respectable and civic-minded." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Young talent emerging — Hanlon lived to develop raw players into stars",
      "Multi-year roster continuity — his teams got better the longer they played together",
      "Aggressive opponents — Hanlon's teams fed off conflict with other teams",
      "New city / fresh start — successfully rebuilt in both Baltimore and Brooklyn",
    ],
    cold_triggers: [
      "Roster breakup — when syndicate baseball forced him to move stars to Brooklyn, the magic faded",
      "Aging roster — Hanlon's system required speed and aggression that older players couldn't sustain",
      "Rule changes / era shifts — the Deadball Era's changes may have passed him by",
      "Strong-willed veterans ignoring authority — Crawford's 'batboy' comment reveals the vulnerability",
    ],
    pressure_response: "STEADY BUT IMPERFECT. Hanlon won 5 NL pennants in 7 years — an extraordinary run. But he lost the first two Temple Cup Series before sweeping Cleveland in 1896. His Brooklyn teams won pennants in 1899-1900 but never dominated like the Orioles. In ILB: Hanlon's pressure response is solid (he wins consistently) but lacks the killer instinct for championship moments. His teams are built for the long haul, not the single decisive game. +1 consistency bonus in series play, but no clutch bonus in elimination games.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Rebuild",
      type: "Trade",
      text: "Your manager tears the roster apart. Release up to 5 players rated (+4) or below and draw 3 Free Agent Cards. 'Only 3 of 17 survived.' +2 Team Fit next series as the dead weight is gone.",
      origin: "Hanlon took a last-place 1892 Orioles team (46-101) and kept only 3 players — McGraw, Robinson, and McMahon. Within 2 years he had built a pennant winner through ruthless roster turnover.",
    },
    {
      title: "The $300 Find",
      type: "Action",
      text: "Your manager discovers an unknown talent in a minor league nobody watches. Sign any Free Agent rated (+4) or below — that player gains +2 to their highest stat permanently. A diamond in the rough.",
      origin: "Hanlon purchased Heinie Reitz from the San Francisco Metropolitans of the California League for $300. Reitz became a league-leading fielder and .303 hitter under Hanlon's development.",
    },
    {
      title: "Inside Baseball",
      type: "Game Action",
      text: "Your manager's tactical system kicks into gear. This game, your team gains +1 Speed and +1 Contact for all players with SPD > 0. Hit-and-run, squeeze, Baltimore chop — the opponents can't keep up.",
      origin: "Hanlon invented or perfected inside baseball: the hit-and-run, squeeze play, Baltimore chop, delayed steal, and sign systems. 'He evolved an offensive technique that made baseball into something of an art.' — The Baltimore Sun.",
    },
    {
      title: "The Manager Tree",
      type: "Drama",
      text: "One of your players reveals unexpected leadership qualities. Choose any player on your roster — they gain the 'Future Manager' trait, giving +1 Team Fit to adjacent players in the lineup. The student becomes the teacher.",
      origin: "Hanlon mentored FIVE future Hall of Fame managers: McGraw, Mack, Huggins, Robinson, and Jennings. Every current MLB manager can trace their managerial lineage back to Hanlon through one of these five men.",
    },
    {
      title: "Hero of the Players' League",
      type: "Action",
      text: "Your manager stands on principle when others fold. All players with the 'Loyal' trait gain +1 Team Fit and +1 morale permanently. Your manager's reputation grows — opposing players with 'Loyal' trait are now available as Free Agents.",
      origin: "Hanlon was the only player who honored his Players' League contract without receiving payment. 'He stands to-day as the hero of the Players' League. He is the only ball player in that League who has held to the contract he signed.'",
    },
    {
      title: "The Syndicate Heist",
      type: "Trade",
      text: "Your manager exploits a corporate loophole. Take up to 3 players from any era's Free Agent pool and add them to your roster. But the era you took from gains +1 Intensity against you in future matchups.",
      origin: "When Hanlon moved from Baltimore to Brooklyn in 1899, he took Keeler, Kelley, Jennings, and several other Oriole stars with him — effectively gutting Baltimore to strengthen Brooklyn through syndicate ownership.",
    },
    {
      title: "Foxy Ned's Last Lesson",
      type: "Drama",
      text: "Your aging manager watches the game change around him. His tactical bonus is reduced by 1 for the remainder of the game. But every player who has played 10+ games under him permanently retains +1 to their lowest stat. The teacher's gift outlasts the teacher.",
      origin: "After 1900, Hanlon's record declined to .449 — the game evolved past him. But his students — McGraw, Mack, Huggins, Robinson, Jennings — carried his teachings into the 20th century and dominated it.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Handsome, composed Irish-American face. 5'9\" 170 lbs — average build for the era. Intelligent, calm eyes with a hint of shrewdness — hence 'Foxy Ned.' Well-groomed mustache, as was the style. The look of a man who sees three moves ahead and won't tell you what they are.",
    attire: "Civilian clothes — dark wool suit with vest and watch chain. Hanlon managed in street clothes from the bench, not in a player's uniform. Standing or seated in the dugout with arms folded, observing. Not animated — calculating. A professor watching his students take the exam.",
    mood: "Quiet confidence. Not fierce, not volcanic — serene intelligence. The look of a man who built a dynasty from nothing and knows exactly how he did it. There's warmth in the eyes but sharpness in the jaw. A father figure who happens to be the smartest person in the room.",
    style: "Warm sepia with green undertones — earthy, grounded, approachable. Lighter and warmer than the McGraw card. Baltimore's Union Park suggested in the background, with the rowhouses of Bolton Hill visible beyond. Ornate border with Celtic knotwork motifs honoring his Irish heritage. The card should feel like wisdom, not power.",
    reference: "If McGraw's card is Napoleon, Hanlon's card is Socrates. The man who taught the teachers. The card should feel foundational — like the first page of a textbook. Rich but not ostentatious. The kind of card that gets more valuable the more you understand the game. Tobacco-card warmth with a teacher's quiet authority.",
  },
};

// ═══════════════════════════════════════════════════════════════
// MANAGER RATING ENGINE
// ═══════════════════════════════════════════════════════════════
const RATING_ENGINE = {
  overall: {
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
  archGreen: "#55b877", archDark: "#2a6b3a",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555", "Players' Manager": "#55b877",
    Firebrand: "#e8a030", "Tactical Purist": "#5588cc", Opportunist: "#b070cc",
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archGreen}15`, border: `1px solid ${C.archGreen}30`, color: C.archGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function NedHanlonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archGreen;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, #3a5a3a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🎓</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>PLAYERS' MGR</div>
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
              <ClubhouseBar label="DISCPLN" value={r.dis} color={"#e05555"} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={archColor} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "TEMPLE", val: d.record.temple_cups },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "PEAK PCT", val: d.record.peak_pct.split(" ")[0] },
                { label: "HOF MGRS", val: d.record.hof_managers_mentored.length },
                { label: "100 WINS", val: "1899" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 5 NL Pennants", "🏆 2 Temple Cups", "⭐ HOF 1996", "📜 Father of Modern Baseball", "🎓 5 HOF Managers Mentored", "💎 .668 Peak Win%", "🏟️ First 100-Win Season"].map((a, i) => (
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
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy"><p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p></Section>
                <Section title="Conflict Response"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p></Section>
                <Section title="Clique Strategy"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p></Section>
                <Section title="✅ Players Who Thrive">{d.playbook.player_types_that_thrive.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="⚠ Players Who Struggle">{d.playbook.player_types_that_struggle.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("HIGH") ? `${C.traitGreen}20` : effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("HIGH") ? C.traitGreen : effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Hanlon's real life, become universal cards playable in any game.</p>
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
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>))}
                  </div>
                </Section>
                <Section title="Hanlon's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
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
  name: d.name, nickname: d.nickname, year: d.year, era: d.era,
  ilb_team: d.ilb_team, archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
  hof_managers_mentored: d.record.hof_managers_mentored,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
