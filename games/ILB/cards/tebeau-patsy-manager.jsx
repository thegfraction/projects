import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: PATSY TEBEAU
// Era: 1900 · Archetype: Firebrand
// "Rowdy Patsy" — The Prototype of All Hooligans
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Patsy Tebeau",
  nickname: "Rowdy Patsy",
  year: 1895,
  team: "Cleveland Spiders",
  era: "1900s",
  ilb_team: "Banners",
  archetype: "Firebrand",
  born: "December 5, 1864 — St. Louis, MO",
  died: "May 16, 1918 — St. Louis, MO (age 53)",
  hof: "Not inducted. Largely forgotten — obscured by McGraw and Hanlon despite comparable 1890s success.",
  height: '5\'8"',
  weight: "163 lbs",

  // ═══════════════════════════════════════════════════════════════
  // MANAGERIAL RECORD (Peak Era: 1892-1898)
  // Source: SABR BioProject, Baseball-Reference, RIP Baseball
  // ═══════════════════════════════════════════════════════════════
  record: {
    career_wins: 726,
    career_losses: 583,
    win_pct: ".555",
    pennants: 0,
    temple_cups: 1,
    second_place: 3,
    seasons_managed: 10,
    ejections: "Frequent — arrested in Louisville, nearly suspended for life",
    peak_team: "1895 Cleveland Spiders",
    peak_record: "84-46 (.646)",
    consecutive_winning: "7 straight winning seasons (1892-1898)",
    notable: "Won 1895 Temple Cup over McGraw's Orioles 4-1. Managed Cy Young, Jesse Burkett, and the first Native American MLB player (Louis Sockalexis). 'The prototype of all hooligans.' — Lee Allen.",
    key_players_managed: ["Cy Young", "Jesse Burkett", "Ed McKean", "Cupid Childs", "Bobby Wallace", "Louis Sockalexis"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB MANAGER RATINGS
  // ═══════════════════════════════════════════════════════════════
  ilb_ratings: {
    // Game Management (1-5)
    tac: 3,  // Shrewd but not revolutionary. Exploited last-bats advantage, rattled pitchers with bunts, used psychological warfare. But no major tactical innovations.
    pit: 3,  // Had Cy Young — managed him competently but didn't innovate pitching usage. Staff management was adequate.
    lin: 3,  // Solid lineup construction with Burkett, McKean, Childs. Nothing pioneering like Hanlon's platoons.
    adp: 2,  // Struggled to adapt after roster was gutted. Quit mid-season in St. Louis. System depended on having aggressive, talented players.

    // Clubhouse Management (1-10)
    dis: 3,  // Low — Tebeau's teams reflected his lawlessness. "His players cheerfully followed his horrid example." He didn't impose order; he imposed chaos.
    ego: 4,  // Managed strong personalities (Burkett, Childs) but through force of personality, not diplomacy. Beat a reporter who criticized him.
    har: 5,  // His teams bonded through shared aggression — they were a gang, not a family. Internal harmony was tribal: us vs. everyone else.
    int: 10, // Maximum. "The prototype of all hooligans." Arrested in Louisville. Umpires walked off the field. Spiked opponents. The most intense manager of his era.
    str: 5,  // Adequate. Seven winning seasons, but never won a full-season pennant. Good enough to compete, not quite good enough to dominate.
    flx: 3,  // Low. Tebeau's system was rage-powered. When the NL curbed rowdiness in 1897, his effectiveness declined. Could not adapt to a tamer game.

    ovr: 7,  // All-Star tier. Successful but not a legend. A brilliant brawler who never quite won the big prize and burned out young.
  },

  rating_justification: {
    tac: "Shrewd but not innovative. Chose last bats on the road — realizing the late-inning advantage before anyone codified it. Had his entire team bunt to rattle pitcher Otis Stocksdale, which worked. Surreptitiously pinched Chief Zimmer's arm to fake a hit-by-pitch bruise for the umpire. Cunning, not strategic. Rating of 3.",
    pit: "Managed Cy Young during Young's prime years (1890-1898). Young went 36-12 in 1892 under Tebeau. But there's no evidence Tebeau innovated pitching usage — he had a great pitcher and used him. Staff included Nig Cuppy and John Clarkson. Competent, not pioneering. Rating of 3.",
    lin: "Solid lineups built around Burkett (.405 in 1896), McKean, Childs, and Bobby Wallace. But no evidence of platoon innovation or systematic lineup optimization. Tebeau's lineups won through talent and aggression, not tactical construction. Rating of 3.",
    adp: "Collapsed when circumstances changed. When the NL instituted anti-rowdiness rules in 1897, his edge eroded. When the Robisons gutted his roster for St. Louis in 1899, he couldn't rebuild. Quit mid-season in 1900. His system required specific conditions — take those away, and he had nothing. Rating of 2.",
    dis: "Tebeau didn't enforce discipline — he was the source of indiscipline. Lee Allen: 'Patsy Tebeau was the prototype of all hooligans and his players cheerfully followed his horrid example.' Arrested in Louisville. Beat a reporter. Spiked opponents. The Spiders' 'aggression and profanity-laced coaching' was the team identity. Rating of 3.",
    ego: "Managed through dominance, not diplomacy. When he had a problem with a reporter, he beat the reporter. When McGraw tagged him in the face during the 1895 Temple Cup, he 'uncharacteristically, calmly walked off the field' — meaning his characteristic response was violence. Strong personalities either submitted to the gang mentality or left. Rating of 4.",
    har: "Tribal harmony. The Spiders were a gang — bonded through shared aggression against everyone else. Fans threw food at the Orioles, screamed at McGraw, used noisemakers. This was organized violence as team identity. Internal cohesion was real but fragile — it depended on having a common enemy. Rating of 5.",
    int: "Maximum. Absolute maximum. 'One of the most vicious men to ever play the game of baseball.' Arrested in Louisville. Threatened umpire Tom Lynch so aggressively that Lynch challenged him to fight ON THE FIELD during a game. Beat reporter Elmer Pasco after negative coverage. Spiked opponents routinely. The NL literally created new rules to stop him. Rating of 10.",
    str: "Adequate strategist. Seven straight winning seasons with a strong roster. Won the 1895 Temple Cup 4-1 over the Orioles — the only time the Spiders beat Baltimore in postseason play. But never won a full-season pennant. Good enough to contend, not enough to dominate. Rating of 5.",
    flx: "Inflexible. When the NL cracked down on rowdiness before 1897, 'it seemed to dampen the fire from Tebeau and Cleveland.' His effectiveness was directly tied to the era's permissiveness. When the rules changed, he couldn't adapt. When his roster was gutted, he quit. Rating of 3.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by combustion. Tebeau didn't direct — he ignited. His teams took on his personality: aggressive, profane, physical, relentless. 'His players cheerfully followed his horrid example.' He was a player-manager who played alongside his men, bled alongside them, and fought alongside them. Not a bench general but a field warrior.",
    temperament: "Volcanic and uncontrollable. Jack Kavanagh described him as 'impetuous and flamboyant, high-spirited and friendly' — but that was the good days. On bad days he was arrested, fined, suspended, and physically violent toward umpires, reporters, and opponents. His temper was both his weapon and his downfall.",
    work_ethic: "Fierce competitor who played through injuries. Carried a grudge against Jake Beckley for years after a spiking that 'bothered him the rest of his career.' Played hurt in the 1895 Temple Cup. But his work ethic was powered by rage, not discipline — when the fire went out, the work stopped.",
    lifestyle: "St. Louis Irish street kid. Of French and German ancestry but 'strongly identified with the Irish he grew up with.' Brought the Goose Hill Gang street-brawling ethos into professional baseball. After retiring, ran a saloon in St. Louis — a natural fit for a man whose personality was forged in barrooms and ballfields.",
    communication_style: "Profanity-laced screaming. 'Verbally abusing umpires and opposing players' was his standard operating procedure. Cleveland's 'aggressive, profanity-laced coaching' was noted in game reports across the league. But he was also described as 'friendly' off the field — the rage was concentrated on the diamond.",
    loyalty_expectations: "Gang loyalty. You fight with us or you're not one of us. The Spiders were a crew — they went to war together against the rest of the league. Tebeau's brother George joined the team. His catcher Jack O'Connor was a Goose Hill Gang member. Loyalty was earned in combat, not through contracts.",
    dark_side: "The ending. After baseball, Tebeau ran a saloon in St. Louis. His wife left him. His health deteriorated — rheumatism, stomach trouble. On May 16, 1918, in the early morning hours, he ended his own life in the back room of his saloon with a revolver. His suicide note asked that his wife and brother George be notified. He was 53 years old. In ILB: Tebeau carries the 'Burnout' trait — his intensity is unsustainable. Maximum fire, but the flame consumes the fuel.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PLAYBOOK PROFILE
  // ═══════════════════════════════════════════════════════════════
  playbook: {
    roster_philosophy: "Build a gang, not a team. Tebeau wanted fighters — players who would spike opponents, scream at umpires, and play through injuries. He filled his roster with Irish-American brawlers from working-class backgrounds who shared his street-fighting ethos. Talent mattered, but attitude came first. His best teams had both: Cy Young's arm plus Jesse Burkett's fury.",
    conflict_response: "ESCALATE. Tebeau didn't suppress or mediate conflict — he amplified it. Conflict with opponents? Fight harder. Conflict with umpires? Scream louder. Conflict with reporters? Beat them. The only conflict resolution was victory. Internal conflict was rare because the whole team was oriented outward — toward violence against everyone else.",
    clique_strategy: "WEAPONIZE. The entire team was a clique — a gang. 'The Spiders took on his personality.' Fans were part of it too — they threw food at the Orioles, used noisemakers. Tebeau turned the whole organization into a weapon aimed at the rest of the league. When the gang fragmented (1899 roster gutting), everything collapsed.",
    player_types_that_thrive: [
      "Aggressive, physical players who enjoy confrontation",
      "Working-class grinders who play through pain and don't complain",
      "Players with high Volatility who need a system that channels rage",
      "Loyal, gang-mentality players who bond through shared combat",
      "Players who perform better angry — fury as fuel",
    ],
    player_types_that_struggle: [
      "Quiet professionals who find the chaos exhausting",
      "Disciplined players who follow rules — there are no rules under Tebeau",
      "Sensitive personalities — the profanity and violence are constant",
      "Players who need tactical structure — Tebeau leads by emotion, not system",
      "Stars who want individual recognition — Tebeau's identity is the gang, not individuals",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "UNLIMITED — Tebeau IS volatility. The higher the team volatility, the better he performs.",
      discipline_floor: "NONE — discipline is irrelevant. What matters is fury and loyalty.",
      star_exception: "Cy Young was the quiet anchor. One calm star can stabilize the chaos — but only one.",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY IMPACT
  // ═══════════════════════════════════════════════════════════════
  chemistry_impact: {
    team_fit: { effect: "VOLATILE", desc: "Tebeau creates intense tribal bonding — but it's fragile. +2 Team Fit when team is winning or in a rivalry. -3 Team Fit if on a losing streak of 3+ games. The gang only works when it's winning." },
    volatility: { effect: "MASSIVELY INCREASED", desc: "Tebeau is a volatility amplifier. ALL players gain +2 Volatility. This increases both positive variance (heroic performances) and negative variance (brawls, ejections, collapses)." },
    discipline: { effect: "REDUCED", desc: "Discipline doesn't exist under Tebeau. -2 Discipline for all players. But Discipline penalties don't matter as much because the system doesn't require order — it requires fury." },
    ego: { effect: "SUPPRESSED BY GANG", desc: "Individual ego is absorbed into team identity. Players with high Ego who accept the gang mentality have egos neutralized. Those who resist are isolated and traded." },
    work_habits: { effect: "VARIABLE", desc: "Players either adopt Tebeau's rage-fueled work ethic (+1 Work Habits) or are overwhelmed by the chaos (-1 Work Habits). Depends on personality: fighters improve, thinkers decline." },
    adaptability: { effect: "LOW", desc: "Tebeau's system is era-specific. It only works in an environment that permits physical aggression and umpire abuse. Rule changes and era shifts cripple his effectiveness." },
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Prototype Hooligan", desc: "Lee Allen called him 'the prototype of all hooligans.' +2 Intensity for the entire team. Opposing teams gain +1 Clutch against you (they want to shut you up)." },
    { tag: "Goose Hill Gang", desc: "Tebeau brought St. Louis street-fighting into baseball. Players from working-class or 'rough' backgrounds gain +1 Contact and +1 Team Fit under Tebeau." },
    { tag: "The Spiking", desc: "Tebeau's teams spiked opponents routinely. Opposing fielders have a 10% chance of 'Intimidated' status (-1 DEF) when your runners are on base." },
    { tag: "Temple Cup Warrior", desc: "Beat McGraw's Orioles 4-1 in the 1895 Temple Cup. When facing a higher-ranked opponent, +1 Clutch for all players. The gang fights harder when outnumbered." },
    { tag: "Rage Fuel", desc: "Tebeau performs better when angry. After a loss, +1 Intensity next game. After 2 consecutive losses, +2 Intensity. But after 3+ losses, the rage turns inward: -2 Harmony." },
    { tag: "Arrested in Louisville", desc: "Tebeau and his team were literally arrested during a road trip. 15% chance per away series of an 'ejection/fine' event that removes Tebeau's bonuses for that game." },
    { tag: "The Quiet Ace", desc: "Cy Young was Tebeau's calm anchor. If you have one player with Volatility < 3 and OVR > 8, that player stabilizes the chaos: team Volatility penalties are halved." },
    { tag: "Burnout", desc: "Tebeau's intensity is unsustainable. After 15 games, all Intensity bonuses are reduced by 1. After 25 games, reduced by 2. The flame consumes the fuel." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Home Ballpark / League Park", affinity: "HIGH", note: "Cleveland fans joined the war — throwing food, using noisemakers. Home field was a weapon." },
    { location: "Bar / Saloon", affinity: "HIGH", note: "Ran a saloon in St. Louis after baseball. The barroom was his natural habitat — and his final resting place." },
    { location: "Street / Neighborhood", affinity: "HIGH", note: "Goose Hill Gang in St. Louis. Irish street-fighting culture shaped everything about his approach." },
    { location: "Visiting Ballpark", affinity: "MEDIUM", note: "Tebeau thrived on hostile crowds. 'Attacked as they stepped from their carriages' in Baltimore — and won anyway." },
    { location: "Hotel / Road Trip", affinity: "MEDIUM", note: "Road trips were extensions of the brawl. Arrested in Louisville. Every city was enemy territory." },
    { location: "Practice Field", affinity: "LOW", note: "Tebeau's preparation was rage, not repetition. Practice was for fighting, not fundamentals." },
    { location: "Church / Community", affinity: "LOW", note: "No evidence of civic engagement or spiritual life. Tebeau's world was the ballfield and the barroom." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Rivalry games — the Spiders were at their best against the Orioles",
      "Hostile crowds — Tebeau fed on opposition and chaos",
      "After being disrespected — insults, bad calls, and provocations lit the fuse",
      "Tight pennant races — 'fighting to get back to the Temple Cup'",
    ],
    cold_triggers: [
      "Rule changes limiting aggression — the 1897 anti-rowdiness rules deflated him",
      "Roster gutting / losing key players — without the gang, the system collapses",
      "Extended losing streaks — rage turns inward and the team devours itself",
      "Personal health decline — injuries and illness sapped his fire in later years",
    ],
    pressure_response: "EXPLOSIVE AND UNPREDICTABLE. Won the 1895 Temple Cup 4-1 over the mighty Orioles — his crowning achievement. But was swept in the 1896 rematch. In the clutch, Tebeau's teams were either magnificent or catastrophic. No middle ground. In ILB: roll a d6 before championship games. On 4+, all players gain +2 to their highest stat. On 1-3, all players lose -1 to their lowest stat. Tebeau's teams don't play average games under pressure — they play great or terrible.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Horrid Example",
      type: "Game Action",
      text: "Your manager goes berserk. He spikes an opposing fielder, screams at the umpire, and fires up the entire team. All players gain +1 Contact this game. But there's a 25% chance the umpire ejects your manager — losing all tactical bonuses for the rest of the game.",
      origin: "Lee Allen wrote: 'Patsy Tebeau was the prototype of all hooligans and his players cheerfully followed his horrid example.' The Spiders regularly spiked opponents and abused umpires as a strategic weapon.",
    },
    {
      title: "Arrested on the Road",
      type: "Drama",
      text: "Your manager and several players are arrested by local authorities after a brawl with umpires. Your manager is suspended for this game. But the incident bonds the team: +2 Team Fit for the next 3 games. The gang sticks together.",
      origin: "Tebeau and the Spiders were arrested in Louisville after a fracas with umpires. Tebeau was fined by a justice of the peace. He challenged the fine and sued the National League.",
    },
    {
      title: "The Pinch",
      type: "Game Action",
      text: "Your manager secretly pinches a player during an argument to create a fake bruise, then shows it to the umpire. Your batter is awarded first base. If the umpire catches the deception (20% chance), your manager is ejected and fined.",
      origin: "In 1895, after Chief Zimmer was hit by a pitch that the umpire missed, Tebeau 'surreptitiously pinched Zimmer's arm during the argument, showing the new bruise to the umpire who awarded Zimmer first base.'",
    },
    {
      title: "Bunt to Rattle",
      type: "Game Action",
      text: "Your manager orders the entire lineup to bunt in the first inning — not for hits, but to psychologically destroy the opposing pitcher. The pitcher must roll a d6: on 1-3, he loses -1 Control for the rest of the game from frustration.",
      origin: "Tebeau had his entire team bunt to lead off against Washington pitcher Otis Stocksdale. Stocksdale survived the first inning but lost his control and gave up 6 runs in the second. Cleveland won 8-5.",
    },
    {
      title: "The Reporter Gets It",
      type: "Drama",
      text: "Your manager assaults a journalist who wrote negatively about the team. -2 Publicity permanently. But +1 Team Fit as players see the manager will go to war for them. The NL threatens to suspend your manager for life.",
      origin: "After the 1896 season, Tebeau and catcher Jack O'Connor beat reporter Elmer Pasco for writing about an internal altercation. The Cleveland press turned against Tebeau permanently.",
    },
    {
      title: "Temple Cup Upset",
      type: "Game Action",
      text: "Your underdog team faces a superior opponent in a championship series. Your manager refuses to split the prize money evenly — winner takes all. The team rallies: +2 Clutch for all players this series. You win the series 4-1.",
      origin: "In the 1895 Temple Cup, Tebeau refused the Orioles' offer to split prize money evenly because he wanted to win the championship. Cleveland fans threw food and used noisemakers. The Spiders won 4-1.",
    },
    {
      title: "Back Room of the Saloon",
      type: "Drama",
      text: "After a devastating loss or roster collapse, your manager disappears. He is found in the back of a saloon, despondent. He cannot manage for the next 2 games. When he returns, all Intensity bonuses are permanently reduced by 1. The fire is dying.",
      origin: "After baseball, Tebeau's health and marriage collapsed. On May 16, 1918, alone in the back room of his St. Louis saloon, he took his own life. He was 53. The rage that fueled his greatness consumed him in the end.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, pugnacious Irish-American face. 5'8\" 163 lbs — small and wiry, built for brawling. Hard jaw, fierce eyes, thick mustache. A street-fighter's face — scarred, intense, permanently coiled for a swing. The look of a man who would spike you at second base and spit on you for complaining.",
    attire: "Cleveland Spiders player-manager uniform, 1895 era. Dirty wool flannel, grass-stained, possibly torn. Not pristine — Tebeau's uniform should look like it's been in a fight. Standing with fists clenched or pointing aggressively at an unseen umpire. A bat should be nearby but not in hand — Tebeau's weapon was himself.",
    mood: "Controlled fury. Not out of control — focused rage. The look of a man who knows exactly what he's doing when he spikes your third baseman. There's intelligence behind the violence. The Spiders were 'brilliantly tactician' AND 'the most vicious' — both things simultaneously. The card should feel dangerous.",
    style: "Dark sepia with aggressive warm reds bleeding through — like a tobacco card left in a barroom. Heavier, grittier texture than McGraw or Hanlon. League Park in Cleveland suggested in the background, with a hostile crowd visible. Border should feel rough — unfinished edges, asymmetrical. Spider web motifs in the corners. The card should feel like it was found in the back of a saloon.",
    reference: "This is the dark horse of the Banners Era. Not as famous as McGraw, not as revered as Hanlon — but just as intense and far more dangerous. The card should feel like picking up something you're not sure you should touch. A T206 card that's been through a bar fight. Gritty, raw, haunted by the knowledge of how this story ends.",
  },
};

const RATING_ENGINE = {
  overall: { tiers: [
    { range: "3-4", label: "Filler" }, { range: "5-6", label: "Solid Skipper" },
    { range: "7-8", label: "Contender" }, { range: "9-10", label: "Elite" },
    { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" },
  ]},
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archOrange: "#e8a030", archDark: "#8a5a10",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555", "Players' Manager": "#55b877",
    Firebrand: "#e8a030", "Tactical Purist": "#5588cc", Opportunist: "#b070cc",
  },
};

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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archOrange}15`, border: `1px solid ${C.archOrange}30`, color: C.archOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function PatsyTebeauCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archOrange;

  const tabs = [
    { id: "playbook", label: "Playbook" }, { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Rating Engine" },
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, #5a3a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🔥</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>FIREBRAND</div>
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
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={archColor} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "TEMPLE", val: d.record.temple_cups },
                { label: "2ND PLC", val: d.record.second_place },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "WIN SZN", val: "7 Straight" },
                { label: "PEAK", val: ".646" },
                { label: "ARRESTS", val: "Yes" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1895 Temple Cup", "🔥 7 Winning Seasons", "🕷️ Cleveland Spiders", "⚾ Managed Cy Young", "💀 Prototype Hooligan", "👊 Arrested in Louisville", "🏟️ .646 Peak Season"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("MASSIVELY") || effect.includes("EXPLOSIVE") ? `${C.hotRed}20` : effect.includes("REDUCED") || effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("MASSIVELY") || effect.includes("EXPLOSIVE") ? C.hotRed : effect.includes("REDUCED") || effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Tebeau's real life, become universal cards playable in any game.</p>
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
                <Section title="Tebeau's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  key_players: d.record.key_players_managed,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
