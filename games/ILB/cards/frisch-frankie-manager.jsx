import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: FRANKIE FRISCH
// Era: 1930 · Archetype: Firebrand
// "The Fordham Flash" — Gashouse Gang, Educated Brawler
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Frankie Frisch",
  nickname: "The Fordham Flash",
  year: 1934,
  team: "St. Louis Cardinals",
  era: "1930s",
  ilb_team: "Iron",
  archetype: "Firebrand",
  born: "September 9, 1897 — The Bronx, NY",
  died: "March 12, 1973 — Wilmington, DE (age 75, from injuries in a car accident)",
  hof: "Inducted 1947 (BBWAA). .316 career BA (highest for a switch-hitter at the time). 2,880 hits. 8 World Series as player. 1931 NL MVP. Later chaired the HOF Veterans Committee — controversially elected old friends, drawing Bill James's criticism.",
  height: '5\'11"',
  weight: "165 lbs",

  record: {
    career_wins: 1138,
    career_losses: 1078,
    win_pct: ".514",
    pennants: 1,
    world_series: 1,
    seasons_managed: 16,
    ejections: "Frequent and volcanic. Frisch's fiery temper, learned under McGraw and honed with the Gashouse Gang, made him a regular combatant with umpires. The Flash argued with everyone.",
    peak_team: "1934 St. Louis Cardinals (Gashouse Gang)",
    peak_record: "95-58, won WS over Detroit Tigers in 7 games. Surged from 7 games back in final month.",
    teams_managed: ["St. Louis Cardinals (1933-38): 1 pennant (1934), 1 WS title, 458-354", "Pittsburgh Pirates (1940-46): 539-528, no pennants, wartime rosters", "Chicago Cubs (1949-51): 141-196, declining franchise"],
    notable: "Player-manager of the 1934 Gashouse Gang — the most colorful team in baseball history (Dizzy Dean 30-7, Pepper Martin, Joe Medwick, Leo Durocher). Surged from 7 games back in September to win the pennant. Won WS in 7 games over Tigers despite the 'Medwick incident' (pulled from Game 7 for his own safety after fans threw garbage). Traded from Giants for Rogers Hornsby in 1926 — the superstar swap that rocked baseball. Feuded with John McGraw (who had been his mentor). Chemistry major at Fordham. Four-sport college star. Never played a minor league game. Retired to Charlestown, RI with two hounds named Flash and Patches, devoted to gardening and classical music. Died from injuries sustained in a car accident. The educated man who led the dirtiest team in baseball.",
    playing_career: ".316 BA, 2,880 hits, 419 SB, 1,244 RBI across 19 seasons. 8 World Series (50 games — record for non-Yankees). 4 WS championships as player (1921, 1922 with Giants; 1931, 1934 with Cardinals). 1931 NL MVP. Set record for assists by 2B (641 in 1927). Switch-hitter. All-American halfback at Fordham.",
  },

  ilb_ratings: {
    tac: 3,  // Moderate. Frisch was a competent tactician but not innovative. The Gashouse Gang won through personality and talent, not strategy. His post-1934 record (.514) suggests ordinary tactical management without extraordinary talent.
    pit: 3,  // Moderate. Managed Dizzy Dean (30-7 in 1934) but that was Dean's genius, not Frisch's pitching management. No sustained pitching development across franchises.
    lin: 4,  // High. Frisch was himself a great hitter (.316 BA) and understood lineup construction from inside the batting order. The Gashouse Gang lineup was well-constructed around diverse threats.
    adp: 3,  // Moderate. Succeeded with the Cardinals' talent but couldn't replicate success in Pittsburgh or Chicago. The same fiery approach that worked with the Gashouse Gang failed with lesser teams. Frisch didn't adapt — he brought the same fire everywhere.

    dis: 7,  // High. Frisch demanded all-out effort — the Gashouse Gang's no-holds-barred approach was his philosophy. But discipline was through personal example and competitive fire, not systems. The flash played through pain and expected everyone else to do the same.
    ego: 5,  // Moderate. Frisch held together enormous egos — Dizzy Dean (who once declared himself the greatest pitcher alive), Durocher, Medwick, Pepper Martin. But "held together" is generous — the Gashouse Gang was barely contained chaos. Frisch's ego management was survival, not mastery.
    har: 5,  // Moderate. The Gashouse Gang was harmonious in its chaos — they bonded through shared aggression and eccentricity. But it wasn't sustainable harmony. After 1934, the team declined and the personalities fractured. The harmony was a one-year phenomenon tied to winning.
    int: 9,  // Very high. "No-holds-barred approach." Frisch played football, basketball, baseball, and track at Fordham. He dove for grounders, absorbed hard-hit balls with his body, and stole 419 bases through sheer aggression. The intensity was physical and relentless — the Flash didn't walk, he sprinted. Everything at maximum speed.
    str: 4,  // Low-moderate. Frisch's one great team (1934) was built by Branch Rickey's farm system, not by Frisch. The Pirates and Cubs were mediocre under his management. He couldn't build — he could only ignite what was already there.
    flx: 4,  // Low-moderate. The same fiery approach everywhere. Worked with the Gashouse Gang's talent; failed with the Pirates' mediocrity. Frisch's fire needed fuel, and when the fuel was absent, the fire just burned the furniture.

    ovr: 8, // Contender tier. One brilliant year (1934 Gashouse Gang WS), one pennant as manager, .514 career record, but diminishing returns with weaker teams. The playing career was legendary (.316 BA, HOF); the managing career was one flash of brilliance followed by a long fade.
  },

  rating_justification: {
    tac: "Moderate. Frisch was a competent manager but not a tactical innovator. The 1934 Cardinals won through pitching (Dean brothers: 49 wins combined), speed (Martin, Frisch), and sheer aggression — not through strategic brilliance. His post-1934 managing record was unremarkable. Rating of 3.",
    pit: "Moderate. Frisch managed Dizzy Dean during Dean's peak (30-7 in 1934), but Dean's talent was self-evident. Frisch didn't develop Dean — Branch Rickey's farm system did. In Pittsburgh and Chicago, Frisch showed no special pitching management ability. Rating of 3.",
    lin: "High. Frisch was himself a superb switch-hitter who understood batting from the inside. The Gashouse Gang lineup was diverse and well-balanced: Dean pitching, Martin's speed, Medwick's power, Collins's consistency, Frisch's own switch-hitting. He understood how to construct a lineup because he'd been in great lineups his entire career. Rating of 4.",
    adp: "Moderate. The same fiery approach at every stop. The Gashouse Gang's talent made the fire look like genius; the Pirates' mediocrity made it look like noise. Frisch managed 7 years with Pittsburgh and 3 with Chicago without a pennant — the identical approach producing diminishing results. The Flash had one speed. Rating of 3.",
    dis: "High. Frisch demanded maximum effort through personal example. The Gashouse Gang's gritty, dirty-uniform aesthetic was Frisch's philosophy incarnate: play so hard you don't have time to wash your clothes. He dove for grounders, stole bases, and played through injuries. The discipline was contagious — when the captain gives everything, the team follows. Rating of 7.",
    ego: "Moderate. Managing Dizzy Dean alone required heroic ego management — Dean once told reporters he was the greatest pitcher alive while Frisch was standing next to him. Add Durocher (future Lip), Medwick (violent temper), and Pepper Martin (eccentric wildman), and Frisch was managing a circus. He 'held together a club filled with powerful personalities' — but barely. The 1934 Gang was barely contained chaos. Rating of 5.",
    har: "Moderate. The Gashouse Gang was harmonious in its aggression — a band of brawlers who liked each other because they fought the same enemies. But the harmony was fragile and tied to winning. After 1934, the team declined and the personalities fractured. Frisch's Pittsburgh and Chicago teams showed no special harmony. The Gang's camaraderie was real but unrepeatable. Rating of 5.",
    int: "Very high. Four-sport Fordham star. All-American halfback. Switch-hitter who dove for grounders and took balls off his body. 419 stolen bases through pure speed and aggression. 'No-holds-barred approach.' Frisch's intensity was physical — he played every game like a football game. The Flash didn't have an off switch. Rating of 9.",
    str: "Low-moderate. The 1934 Cardinals were built by Branch Rickey's farm system — the first modern farm system in baseball. Frisch inherited talent; he didn't build it. In Pittsburgh (1940-46), Frisch managed wartime-depleted rosters without distinction. In Chicago (1949-51), the Cubs declined. Frisch could ignite talent but couldn't develop it. Rating of 4.",
    flx: "Low-moderate. The defining limitation. Frisch brought the same Gashouse Gang fire to Pittsburgh and Chicago and it didn't work. He couldn't adapt his approach to lesser talent. The Flash had one gear: maximum. When the talent deserved maximum, he was brilliant. When it didn't, he was just loud. Rating of 4.",
  },

  personality: {
    leadership_style: "Lead from the front through competitive fire and physical example. Frisch was a player-manager who led by doing: diving for grounders, stealing bases, getting dirty. The Gashouse Gang wasn't a system — it was a reflection of Frisch's personality. The team played like him because he demanded they play like him, and in 1934, they had enough talent to pull it off. The leadership was charismatic and physical — follow the Flash.",
    temperament: "Volcanic and educated. The great paradox of Frisch: chemistry major at Fordham, All-American halfback, lover of classical music and gardening — who managed the dirtiest, loudest, most aggressive team in baseball history. The eruptions were real (frequent ejections, screaming matches with umpires, feuds with McGraw) but they came from an intelligent man who chose fire over ice. The educated brawler: he knew exactly what he was doing when he lost his temper.",
    work_ethic: "All-out, all the time. Frisch's work ethic was physical: play every game at maximum intensity, dive for every ball, run every base. The Gashouse Gang's dirty uniforms weren't carelessness — they were proof of effort. The work ethic was visible and contagious. But it was also unsustainable: Frisch burned out, and his teams burned out after him.",
    lifestyle: "From Bronx intellectualism to Gashouse grit to Rhode Island tranquility. Born in the Bronx to German immigrant parents. Chemistry major at Fordham. Four-sport star. Then: the dirty uniforms, the brawls, the Depression-era aggression of the Gashouse Gang. Finally: retirement in Charlestown, Rhode Island, with two hounds (Flash and Patches), gardening, and classical music. The arc from education through combat to peace.",
    communication_style: "Loud, passionate, and surprisingly articulate. Frisch was educated and intelligent — he could articulate his philosophy clearly. But on the field, communication was volume. He argued with umpires, motivated through competitive fire, and communicated expectations through his own play. The duality: the man who quoted chemistry professors also screamed at umpires until his face turned red.",
    loyalty_expectations: "Play like a Gashouse Ganger. Frisch expected every player to give maximum physical effort, play through pain, get dirty, and fight for every inch. The expectation was modeled on Frisch himself — and since Frisch was a Hall of Famer, the expectation was impossibly high for ordinary players.",
    dark_side: "The flash that faded. After 1934, Frisch never won another pennant. 16 years managing, 1 pennant. The fire that ignited the Gashouse Gang couldn't ignite the wartime Pirates or the declining Cubs. Frisch's approach required extraordinary talent to match his extraordinary intensity — and when the talent wasn't there, the intensity became noise. The Veterans Committee controversy adds a final shadow: as chairman, Frisch elected old friends and teammates to the HOF, drawing criticism that he valued loyalty over merit. In ILB: Frisch carries 'The Fading Flash' — his intensity bonus decreases by -1 for every season after his first championship. The fire burns brightest once.",
  },

  playbook: {
    roster_philosophy: "Aggressive, gritty, no-holds-barred. Frisch's ideal team was the Gashouse Gang: talented players who played like they had nothing to lose. Speed, aggression, dirty uniforms, and enough talent to back up the attitude. The roster was built around competitive fire — if you didn't have fire, you didn't belong.",
    conflict_response: "MATCH AND EXCEED. Frisch met conflict with greater conflict. He learned under McGraw (the most combative manager of the 1900s) and led Durocher (who would become the most combative manager of the 1950s). Conflict was fuel. The Gashouse Gang ran on it.",
    clique_strategy: "UNITE THROUGH SHARED IDENTITY. The Gashouse Gang was a clique — the entire team was one clique united by shared aggression and grit. 'They were a psychological unit, characters and aggressive, but with great innate baseball skill.' The identity was the strategy.",
    player_types_that_thrive: [
      "Aggressive, physical players who mirror Frisch's intensity — the Pepper Martin type",
      "Talented eccentrics who need a framework for their chaos — the Dizzy Dean type",
      "Players with speed and defensive skills who embody the no-holds-barred approach",
      "Switch-hitters and versatile athletes who can contribute in multiple ways",
      "Players who bond through shared combat — the 'us against the world' mentality",
    ],
    player_types_that_struggle: [
      "Quiet, cerebral players who need space to think — the Flash is too loud",
      "Pitchers who need careful management — Frisch demands maximum effort, not careful pacing",
      "Players without elite talent — Frisch's intensity only works with talent to match it",
      "Sensitive personalities who need encouragement over fire — Frisch leads by burning example",
      "Players from structured environments — the Gashouse Gang was organized chaos, emphasis on chaos",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "HIGH — Frisch thrives in volatility. The Gashouse Gang was volatile by design. But there's a limit: Dean once went AWOL and Frisch barely held it together.",
      discipline_floor: "HIGH through competitive fire. Not systems (McCarthy) or morals (McKechnie) — pure aggressive energy.",
      star_exception: "Stars who produce get Frisch's full support. Stars who don't produce get Frisch's full fury. Dean's 30-7 earned his eccentricities. An 0-5 Dean would have gotten traded.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "VOLATILE", desc: "+3 Team Fit when winning (shared aggression bonds the team), -2 Team Fit when losing (the fire turns inward without victories to justify it)." },
    volatility: { effect: "INCREASED", desc: "+2 Volatility for all players. Frisch's intensity creates a high-energy, high-risk environment. The Gashouse Gang was barely contained chaos." },
    discipline: { effect: "INCREASED", desc: "+2 Discipline through competitive fire. Players play hard because the captain plays hardest. But the discipline is emotional, not structural." },
    ego: { effect: "BARELY CONTAINED", desc: "+1 Ego for star players (Frisch's fire enables diva behavior in talented players), -1 Ego for role players (the team identity suppresses individual ego)." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. 'No-holds-barred approach.' Frisch's visible effort — the diving, the dirty uniforms — raises everyone's effort baseline." },
    adaptability: { effect: "DECREASED", desc: "-1 Adaptability. Frisch's one-speed approach leaves no room for adjustment. The Flash is maximum, always." },
  },

  chemistry_traits: [
    { tag: "The Fordham Flash", desc: "Frisch's speed and aggression set the tone. All players gain +1 Speed and +1 Aggression. The Flash doesn't walk — he sprints. Every player catches the urgency." },
    { tag: "The Gashouse Gang", desc: "When 3+ players on the roster have 'Aggressive' trait, all gain +2 to all stats. The Gang was greater than its parts because the aggression was collective. Dirty uniforms required." },
    { tag: "McGraw's Protégé", desc: "Frisch learned under John McGraw — the greatest manager of his era. Frisch gains +1 TAC and +1 DIS when facing opponents whose manager has lower intensity. McGraw's lessons live in the Flash." },
    { tag: "Traded for Hornsby", desc: "Frisch replaced the most hated man in St. Louis — and won the fans over. If Frisch replaces a low-HAR manager, all players gain +2 Team Fit (the relief of personality over brutality)." },
    { tag: "Seven Games Back", desc: "When trailing by 5+ games in the final month, all players gain +2 to all stats. The 1934 Cardinals came from 7 back in September to win the pennant. Frisch's fire burns hottest when it matters most." },
    { tag: "The Fading Flash", desc: "For each season after Frisch's first championship, his intensity bonus decreases by -1. The fire that ignited the Gashouse Gang can't sustain itself without fresh fuel. One pennant in 16 years of managing." },
    { tag: "The Chemistry Major", desc: "Frisch was educated — Fordham chemistry major, classical music lover. When facing a tactical decision, 10% chance of a 'calculated risk' that gives +2 TAC for one inning. The brain behind the fire." },
    { tag: "Flash and Patches", desc: "In retirement, Frisch's companions were two hounds. After 5 consecutive losses, Frisch 'retreats to the garden' — -1 to all ratings for 2 games, then returns at +1 to all ratings for 3 games. Even the Flash needs rest." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "MAXIMUM", note: "Where the Gashouse Gang played. Where the dirty uniforms got dirtier. Where Frisch won his only WS as manager." },
    { location: "Fordham University / The Bronx", affinity: "HIGH", note: "Where the Flash was born — four sports, chemistry major, All-American halfback. The education that preceded the brawling." },
    { location: "Polo Grounds / New York", affinity: "MEDIUM", note: "Where Frisch played under McGraw. Where he rebelled, was fined, and eventually traded. The mentor-protégé battlefield." },
    { location: "Forbes Field / Pittsburgh", affinity: "LOW", note: "7 seasons, no pennants. Wartime rosters. The fire without fuel." },
    { location: "Charlestown, RI", affinity: "HIGH", note: "Retirement. Flash and Patches. Gardening. Classical music. The educated man returned to education. The peace after the storm." },
    { location: "The Dugout / Any Field", affinity: "HIGH", note: "Where Frisch belonged: screaming at umpires, motivating through fury, diving for balls as a player-manager. The dugout was his stage." },
  ],

  momentum: {
    hot_triggers: [
      "September pennant races — the 1934 Cardinals came from 7 back. Frisch's fire is hottest in the clutch",
      "After replacing an unpopular predecessor — the Hornsby-to-Frisch relief effect",
      "When the roster is loaded with aggressive talent — the Gashouse Gang effect requires fuel",
      "World Series — Frisch was 4-for-4 in WS championships as a player. He knew how to win the big one",
    ],
    cold_triggers: [
      "Mediocre rosters — Frisch's fire needs talent. Without it, he's just loud (Pittsburgh, Chicago)",
      "Extended losing — the Gashouse Gang ethos requires winning to sustain itself",
      "Post-championship seasons — the Fading Flash mechanic. One pennant in 16 years",
      "Veterans Committee controversy — Frisch's legacy was complicated by accusations of cronyism",
    ],
    pressure_response: "BRILLIANT ONCE, DIMINISHING THEREAFTER. The 1934 Gashouse Gang's September surge — 7 games back to WS champions — is one of the greatest pressure performances in baseball history. But Frisch never replicated it. In ILB: +3 Clutch in first championship attempt. -1 Clutch for each subsequent attempt. The Flash is fastest the first time.",
  },

  action_card_seeds: [
    {
      title: "The Gashouse Gang",
      type: "Action",
      text: "Your team adopts the no-holds-barred approach. All players gain +2 to all stats and +2 Aggression for 10 games. But DIS -1 (the chaos is barely contained) and HAR -1 (the aggression is internal too). 'They were a psychological unit, characters and aggressive.'",
      origin: "The 1934 Cardinals: Dizzy Dean (30-7), Pepper Martin (the Wild Horse of the Osage), Joe Medwick (who was pulled from Game 7 for his own safety), Leo Durocher (future Lip), and Frisch himself. Dirty uniforms, brawls, and a World Series championship.",
    },
    {
      title: "Seven Games Back",
      type: "Game Action",
      text: "Your team trails by 7+ games in the final month. Your manager refuses to surrender. All players gain +3 to all stats for the remainder of the season. The surge is on. 'In the final month of the season, the Cardinals surged from seven games back to win the pennant.'",
      origin: "September 1934: The Cardinals trailed the Giants by 7 games. They went on a tear, winning the pennant on the final days. The Gashouse Gang played like men possessed — because their manager was possessed.",
    },
    {
      title: "Traded for Hornsby",
      type: "Action",
      text: "Your manager arrives as a replacement for a despised predecessor. All players gain +2 Team Fit and +2 morale. The relief is immediate. Where once there was fear, now there is fire. Same intensity, different spirit.",
      origin: "1927: Frisch was traded from the Giants to the Cardinals for Rogers Hornsby — the most unpopular man in St. Louis. Frisch won over the fans through effort, speed, and charm. He proved that intensity could come from joy, not cruelty.",
    },
    {
      title: "The Educated Brawler",
      type: "Action",
      text: "Your manager combines intellect with aggression. All tactical decisions gain +1 effectiveness. All aggressive plays gain +1 effectiveness. The chemistry major who led the dirtiest team in baseball. The brain and the fire are one.",
      origin: "Frisch majored in chemistry at Fordham, starred in four sports, and was an All-American halfback. He then managed the Gashouse Gang — the grittiest, most aggressive, least respectable team in baseball. Education and brawling aren't opposites; they're complements.",
    },
    {
      title: "The Medwick Incident",
      type: "Drama",
      text: "Your star player is pulled from a game for his own safety after fans riot. The team loses the player but gains +2 Aggression (the injustice fuels rage). If you win anyway: +3 morale permanently. Sometimes the best players can't be on the field.",
      origin: "1934 WS Game 7: Joe Medwick slid hard into third base, sparking a brawl. Detroit fans pelted him with garbage. Commissioner Landis ordered Medwick removed from the game — the only player ever pulled from a WS game for his own safety. The Cardinals won 11-0 anyway.",
    },
    {
      title: "The Fading Flash",
      type: "Drama",
      text: "Your manager's fire is dimming. For each season after his championship, all bonuses decrease by -1. The intensity that won once can't sustain itself. One pennant in 16 years. The Flash was fastest the first time.",
      origin: "After 1934, Frisch never won another pennant. 12 more years of managing: Cardinals decline, Pittsburgh mediocrity, Cubs futility. The Gashouse Gang fire couldn't be recreated. The Flash eventually retired to gardening and classical music.",
    },
  ],

  art_direction: {
    face: "Sharp, athletic, intense. 5'11\" 165 lbs — lean and fast, the build of a sprinter who plays football. Angular features, determined jaw, eyes that burn with competitive fire. The face of a man who was simultaneously an All-American halfback and a chemistry major — intelligent and dangerous. Not cruel (Hornsby) or theatrical (Durocher) — earnest. The Flash meant every word he screamed.",
    attire: "1934 Cardinals uniform — deliberately dirty. The Gashouse Gang aesthetic: torn, stained, lived-in. Frisch should look like he just slid headfirst into third base. Dirt on the knees, grass stains on the elbows. The dirty uniform isn't slovenliness — it's proof of effort. A Fordham class ring barely visible under the grime.",
    mood: "Controlled explosion. The card should feel like the moment before a sprint — coiled energy about to release. Not chaos (Robinson's Daffiness Boys) or sustained joy (Grimm's banjo) — directed aggression. The mood is the Gashouse Gang at its peak: talented, dangerous, barely contained, and loving every second of it.",
    style: "Orange Firebrand palette but dirtier and grittier than previous Firebrands — this is Depression-era fire, not gilded-age rage. Sportsman's Park in the background, dusty and sun-baked. The card should feel like it's been played hard — slightly worn, slightly stained. The border should have a Gashouse aesthetic: industrial, tough, functional. Not pretty. Effective.",
    reference: "The Firebrand Spectrum: Tebeau (1900) is physical violence — spiking. Evers (1910) is intellectual violence — rulebook exploitation. Hornsby (1920) is existential violence — .424 BA staring down your mediocrity. Frisch (1930) is collective violence — the Gashouse Gang as a weaponized team identity. Four different kinds of Firebrand destruction. But Frisch is unique: he's the first Firebrand who led a COLLECTIVE fire rather than burning alone. Tebeau, Evers, and Hornsby were individual incendiaries. Frisch built a bonfire from a dozen flames.",
  },
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

export default function FrankieFrischCard() {
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #2a1a0a 0%, #3a2a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>⚡</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>FIREBRAND</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              <ClubhouseBar label="STRATGY" value={r.str} color={"#5588cc"} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "BAT AVG", val: ".316" },
                { label: "WS PLAYED", val: "8" },
                { label: "INT", val: "9 ⚡" },
                { label: "GANG", val: "GAS⛽" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>GASHOUSE GANG — DIRTY UNIFORMS, CLEAN CHAMPIONSHIP</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1947", "🏆 1934 WS Champion", "⚡ INT 9 (Flash)", "🎓 Chemistry Major", "🏈 All-American Halfback", "🔥 Gashouse Gang Captain", "📉 Fading Flash", "🌿 Classical Music & Gardening"].map((a, i) => (
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
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("VOLATILE") || effect.includes("INCREASED") || effect.includes("BARELY") ? `${C.gold}20` : `${C.warmRed}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("VOLATILE") || effect.includes("INCREASED") || effect.includes("BARELY") ? C.medBrown : C.warmRed, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Frisch's real life, become universal cards playable in any game.</p>
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
                <Section title="🎩 Manager Rating Engine">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
    </div>
  );
}
