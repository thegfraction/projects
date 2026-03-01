import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: BUCKY HARRIS
// Era: 1920 · Archetype: Tactical Purist
// "The Boy Wonder" — 27-Year-Old Champion, 29-Year Endurance
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Bucky Harris",
  nickname: "The Boy Wonder",
  year: 1924,
  team: "Washington Senators",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Tactical Purist",
  born: "November 8, 1896 — Port Jervis, NY",
  died: "November 8, 1977 — Bethesda, MD (age 81, on his birthday)",
  hof: "Inducted 1975 (Veterans Committee). 4th most seasons managed in MLB history (29). 7th most wins all-time (2,158). Plaque in HOF. Died of Parkinson's disease on his 81st birthday.",
  height: '5\'9½"',
  weight: "156 lbs",

  record: {
    career_wins: 2158,
    career_losses: 2219,
    win_pct: ".493",
    pennants: 3,
    world_series: 2,
    seasons_managed: 29,
    ejections: "Minimal — Harris was 'easy-going' and 'personable.' Defended his players, didn't fight umpires.",
    peak_team: "1924 Washington Senators",
    peak_record: "92-62, won first and only WS title in Washington history (defeated Giants)",
    teams_managed: ["Washington Senators I (1924-28): 2 pennants, 1 WS", "Detroit Tigers I (1929-33): rebuilding years", "Boston Red Sox (1934): one season, 76-76", "Washington Senators II (1935-42): 8 years, 1 winning season", "Philadelphia Phillies (1943): fired after 92 games by gambling owner", "New York Yankees (1947-48): WS title in '47", "Washington Senators III (1950-54): 5 second-division finishes", "Detroit Tigers II (1955-56): final managerial stint"],
    notable: "Youngest manager to win World Series (27 years old, 1924). First rookie manager to win WS. 22-year gap between World Series wins (1924 and 1947) — longest in history. 29 seasons managing (4th most ever). Among first to employ relief pitchers regularly. Coal miner's son from Pennsylvania who married a senator's daughter. Wrote 'Playing the Game: From Mine Boy to Manager' (1925). 'There are only two things a manager needs to know: when to change pitchers and how to get along with your players.' DiMaggio: 'If you can't play for Bucky, you don't belong in the major leagues.'",
  },

  ilb_ratings: {
    tac: 4,  // High. Pioneered regular use of relief pitchers — a genuine tactical innovation. Employed "sound, often daring baseball strategy." His 1924 WS move of bringing Johnson in to relieve in the 9th of Game 7 was brilliant.
    pit: 5,  // Maximum. "Only two things a manager needs: when to change pitchers..." Among the first to employ relief pitchers regularly. Managed Walter Johnson to his only World Series. Pitching management was his signature tactical skill.
    lin: 3,  // Moderate. Not known for lineup innovation. His teams were often mediocre offensively. "A gift for securing the best possible performance from even mediocre players" — but that's maximizing, not constructing.
    adp: 5,  // Maximum. 29 seasons across 5 teams and 3 decades. Managed from the dead-ball aftermath through WWII to the integration era. Won WS 23 years apart (1924 and 1947). The ultimate adapter: same principles, different eras.

    dis: 5,  // Moderate. Not a disciplinarian — Harris was easy-going and player-friendly. 'All he asked of you was give your best always on the playing field.' Discipline through expectation, not enforcement.
    ego: 7,  // Good. Managed Walter Johnson, Joe DiMaggio, Ted Williams-era Red Sox. Earned respect from stars without ego conflict. "If you can't play for Bucky, you don't belong in the major leagues."
    har: 7,  // Good. "Easy-going nature and intelligence." "Ask any ballplayer who he'd like to play for and he'd say Bucky Harris." Well-liked by players — not at Robinson's HAR 10 love level, but respected and appreciated.
    int: 5,  // Moderate. Not volcanic or nervous — steady, consistent, professional. The "Boy Wonder" nickname suggests flash, but Harris was actually measured and patient. Coal miner's son toughness, not theatrical fire.
    str: 5,  // Moderate. Developed some players well but no sustained dynasty-building. His teams were often mediocre — 2,158-2,219 career record. He maximized what he had rather than building something greater.
    flx: 7,  // High. Adapted his managing style to every team: won WS with Washington's pitching-and-defense Senators, then won WS with the Yankees' powerhouse lineup. Different approaches for different rosters.

    ovr: 10, // Elite tier. Two World Series (23 years apart), three pennants, 29 seasons, HOF. The endurance and the tactical pitching innovation earn Elite. The sub-.500 career record prevents Legend.
  },

  rating_justification: {
    tac: "High. Harris pioneered the regular use of relief pitchers — a genuine tactical innovation that changed how the game was managed. His Game 7 decision in 1924 to bring Walter Johnson in as a reliever in the 9th inning was considered daring and brilliant. He employed 'sound, often daring baseball strategy' throughout his career. But his overall tactical record is more steady than revolutionary. Rating of 4.",
    pit: "Maximum. 'There are only two things a manager needs to know: when to change pitchers and how to get along with your players.' Harris was among the first to use relievers systematically. He managed Walter Johnson to his only World Series title at age 36. He managed Allie Reynolds and the 1947 Yankees' pitching staff. Pitching management was his defining tactical skill across three decades. Rating of 5.",
    lin: "Moderate. Harris's teams were often offensively limited. He had 'a gift for securing the best possible performance from even mediocre players' — but that's extraction, not construction. His lineup decisions were functional, not innovative. Rating of 3.",
    adp: "Maximum. 29 seasons across 5 teams, 3 stints with Washington, 2 with Detroit. Managed from 1924 to 1956 — spanning the live-ball era, the Depression, WWII, and integration. Won World Series 23 years apart (1924 and 1947) — the longest gap in history. Harris adapted to every era, every roster, every owner. The endurance IS the adaptability. Rating of 5.",
    dis: "Moderate. Harris was not a disciplinarian. 'Easy-going nature.' 'All he asked of you was give your best always on the playing field.' His discipline was implicit — set by expectation and personal example, not by rules or punishment. Effective for good players, insufficient for bad ones. Rating of 5.",
    ego: "Good. Harris managed some of baseball's biggest personalities: Walter Johnson (revered legend), Joe DiMaggio (silent perfectionist), and worked in the Ted Williams Red Sox orbit. DiMaggio's endorsement — 'If you can't play for Bucky, you don't belong in the major leagues' — is the highest compliment a manager can receive from a difficult star. Rating of 7.",
    har: "Good. 'Ask any ballplayer who he'd like to play for and he'd say Bucky Harris.' Players genuinely enjoyed playing for Harris. He was 'personable, smart, analytical, honest, outspoken, patient, and practical.' Not at Robinson's maximum love level — Harris was more respected than adored — but solidly well-liked across 29 years. Rating of 7.",
    int: "Moderate. Harris was steady, not volatile. The 'Boy Wonder' nickname suggests youthful energy, but Harris's actual managing style was measured, patient, and consistent. Coal miner's son toughness: enduring, not explosive. The intensity was sustainable, which is why it lasted 29 years. Rating of 5.",
    str: "Moderate. Harris maximized what he was given but rarely built something from nothing. His Washington teams were often mediocre despite his efforts. The 1947 Yankees were already a powerhouse before he arrived. His talent development was player-by-player, not systematic. Rating of 5.",
    flx: "High. Harris adapted his style to every franchise: pitching-focused with Washington's limited rosters, power-oriented with the Yankees' lineup. He managed through the dead-ball aftermath, the live-ball explosion, the Depression, WWII roster depletion, and the integration era. Different approach for every context. Rating of 7.",
  },

  personality: {
    leadership_style: "Practical intelligence with genuine warmth. Harris led through competence and likability — the rarest combination in managing. He wasn't a dictator (McCarthy), a beloved uncle (Robinson), or a verbal terrorist (Hornsby). He was a smart, practical man who treated players like adults. 'All he asked of you was give your best always on the playing field.' The simplicity of the expectation was its genius: it assumed professionalism, rewarded effort, and created space for players to perform without fear.",
    temperament: "Steady, personable, and tough. Coal miner's son who married a senator's daughter — Harris moved between worlds with ease. 'Personable, smart, analytical, honest, outspoken, patient, and practical.' Not volcanic, not cold — calibrated. The temperament of a man who knew his limitations and played to his strengths for 29 years.",
    work_ethic: "Relentless endurance. 29 seasons of managing — including returning to Washington three separate times, accepting bad teams, weathering bad owners. Harris never quit. He was fired from the Phillies for protesting the owner's interference. He was replaced by Stengel after winning 94 games with the Yankees. Each time, he came back. The work ethic wasn't flashy — it was structural. Show up, manage, endure, repeat.",
    lifestyle: "From coal country to high society. Born in Port Jervis, NY; raised in the Pennsylvania coal mining region. Brief career in professional basketball. Married Elizabeth Sutherland, daughter of a US senator from West Virginia. Called his autobiography 'From Mine Boy to Manager.' The class mobility is the biography: a kid from the mines who became the youngest champion in baseball history and dined with presidents.",
    communication_style: "Direct, practical, and warm. Harris's managing philosophy in one sentence: 'There are only two things a manager needs to know: when to change pitchers and how to get along with your players.' That directness defined his communication — no pretension, no philosophy, no manipulation. Say what you mean. Know what you know. Let players play.",
    loyalty_expectations: "Give your best effort. Harris didn't demand perfection, obedience, or personality compliance. He demanded effort and professionalism. 'All he asked of you was give your best always on the playing field.' The loyalty was mutual: Harris staunchly defended his players, and players repaid him with effort.",
    dark_side: "The cost of endurance: 2,158-2,219. Harris managed 29 seasons and finished below .500 overall. He returned to Washington three times despite knowing the franchise was mediocre. He was fired from the Yankees after winning 94 games. He managed bad teams in bad situations because managing was all he knew. The Boy Wonder became the Old Soldier — still fighting, but for diminishing returns. Parkinson's disease took him at 81, on his birthday. The endurance that defined him also consumed him. In ILB: Harris carries 'The Long Campaign' — his bonuses are modest but permanent, and he never gets removed for poor performance. He just... endures.",
  },

  playbook: {
    roster_philosophy: "Get the best pitching, get along with your players, and let the game come to you. Harris's philosophy was reductive in the best sense: strip away everything unnecessary and focus on the two things that matter. His rosters were built around pitching (Walter Johnson, Allie Reynolds) and team chemistry (DiMaggio's respect, the Senators' camaraderie). Nothing fancy. Just fundamentals executed by professionals.",
    conflict_response: "RESOLVE THROUGH RELATIONSHIP. Harris didn't impose authority — he earned it. When conflicts arose, he addressed them personally, practically, and without theatrics. He 'staunchly defended his players' to ownership and the press. The players reciprocated by playing hard for a manager they liked.",
    clique_strategy: "PREVENT THROUGH PROFESSIONALISM. Harris's easy-going professionalism created an environment where cliques were unnecessary. Everyone was treated fairly. Everyone knew the expectations. The simplicity of the system left no room for political factions.",
    player_types_that_thrive: [
      "Professionals who respond to being treated like adults — the 'give your best' standard",
      "Pitchers — Harris understood pitching management better than almost any contemporary",
      "Stars who need space to perform — DiMaggio thrived under Harris's hands-off approach",
      "Mediocre players who need confidence — Harris had 'a gift for securing the best from even mediocre players'",
      "Veterans who value mutual respect — Harris defended his players and earned their loyalty",
    ],
    player_types_that_struggle: [
      "Players who need intense motivation — Harris's steady approach can feel passive",
      "Undisciplined players who exploit permissiveness — Harris's easy-going nature has limits",
      "Players who need tactical complexity — Harris kept things simple, sometimes too simple",
      "Impatient stars who want immediate results — Harris's approach rewards endurance",
      "Players who need emotional connection — Harris was warm but not deeply personal",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "LOW-MODERATE — Harris absorbs moderate volatility through patience. But he can't contain true chaos (Hornsby-level).",
      discipline_floor: "MODERATE — implied, not enforced. Harris expected professionalism but didn't mandate it.",
      star_exception: "Stars get respect and space. DiMaggio's endorsement proves Harris understood how to manage without micromanaging. The exception IS the rule: treat everyone like a professional.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "INCREASED", desc: "+2 Team Fit for all players. Harris's easy-going intelligence creates a comfortable, professional environment. 'Ask any ballplayer who he'd like to play for and he'd say Bucky Harris.'" },
    volatility: { effect: "REDUCED", desc: "-2 Volatility. Harris's steady temperament absorbs turbulence. No theatrics, no crises, no chaos. The dugout is calm because the manager is calm." },
    discipline: { effect: "MODERATE", desc: "+1 Discipline. Harris expected effort but didn't enforce rules strictly. The discipline is cultural — players internalize professionalism rather than having it imposed." },
    ego: { effect: "MANAGED", desc: "-1 Ego for all players. Harris's practical approach deflates ego naturally. It's hard to be a diva when the manager treats you like a colleague rather than a subordinate." },
    work_habits: { effect: "INCREASED", desc: "+1 Work Habits. 'All he asked of you was give your best always on the playing field.' The simplicity of the expectation raises everyone's baseline effort." },
    adaptability: { effect: "STRONGLY INCREASED", desc: "+2 Adaptability. Harris's flexible approach and 29-year managing career demonstrate maximum adaptability. Players learn to adjust because the manager adjusts." },
  },

  chemistry_traits: [
    { tag: "The Boy Wonder", desc: "Harris won the World Series at 27 — the youngest manager ever. In his first season as manager, all ratings are +1. Youth is its own advantage. 'You're only a kid, but I'm gambling on you having the right stuff.'" },
    { tag: "When to Change Pitchers", desc: "Harris's signature skill. All pitching changes are +1 effectiveness. Relief pitchers gain +1 to all stats under Harris. 'There are only two things a manager needs to know: when to change pitchers...' He knew." },
    { tag: "How to Get Along", desc: "'...and how to get along with your players.' All players gain +1 morale permanently. Harris's warmth and intelligence create a sustainable positive environment that never spikes but never crashes." },
    { tag: "The Pebble Game", desc: "The 1924 Game 7 was won on a bad-hop grounder over Freddie Lindstrom's head in the 12th inning. Once per game, a routine play can become a lucky break — 5% chance of a 'pebble' event that turns a groundout into a hit. Fortune favors the enduring." },
    { tag: "Mine Boy to Manager", desc: "Coal miner's son who married a senator's daughter. Players from working-class backgrounds gain +1 Team Fit under Harris (he understands where they came from). Players from privileged backgrounds gain +1 too (he moved in their world effortlessly)." },
    { tag: "The Long Campaign", desc: "Harris managed 29 seasons. He can never be fired for poor performance — only for ownership conflicts. His bonuses are modest but permanent. The endurance IS the advantage." },
    { tag: "22-Year Gap", desc: "Harris won World Series 23 years apart (1924, 1947). If Harris wins a championship, then loses the next one, he retains +1 to all ratings. The Boy Wonder always has another championship in him — you just have to wait." },
    { tag: "Walter Johnson's Manager", desc: "Harris managed the greatest pitcher in history to his only World Series title. If Harris manages a legendary pitcher (OVR 9+), that pitcher gains +2 to all pitching stats. Harris understood how to handle greatness without diminishing it." },
  ],

  preferred_locations: [
    { location: "Dugout / Bullpen", affinity: "HIGH", note: "Where Harris made his pitching changes — his signature tactical skill. The bullpen phone is his instrument." },
    { location: "Griffith Stadium / Washington", affinity: "HIGH", note: "Three stints managing in Washington. The only city that ever won a World Series under Harris (1924)." },
    { location: "Yankee Stadium", affinity: "MEDIUM", note: "1947-48. Won WS in his first year. Then replaced by Stengel. Even the Boy Wonder couldn't outlast Yankee impatience." },
    { location: "Pennsylvania Coal Country", affinity: "MEDIUM", note: "Where Harris grew up. Coal miner's son. 'From Mine Boy to Manager.' The toughness was forged here." },
    { location: "The White House", affinity: "MEDIUM", note: "Harris visited President Coolidge after the 1924 World Series. A coal miner's son in the White House. The American Dream in baseball form." },
    { location: "Any Dugout, Any Era", affinity: "HIGH", note: "29 seasons, 5 teams, 3 decades. Harris belongs wherever baseball is being played. The universal manager." },
  ],

  momentum: {
    hot_triggers: [
      "First season with a new team — Harris won WS in his first year with BOTH Washington (1924) and New York (1947)",
      "Pitching staff performing — when Harris's pitchers are sharp, his teams compete with anyone",
      "Underdog status — the 1924 Senators were 'first in war, first in peace, last in the American League' before Harris",
      "Big game moments — Harris hit .333 with 2 HR in the 1924 WS. The Boy Wonder rises to the occasion",
    ],
    cold_triggers: [
      "Extended mediocrity — Harris managed many bad teams for many years. The endurance becomes grind",
      "Ownership interference — Harris was fired by the Phillies' gambling owner for protesting interference",
      "Being replaced by a flashier manager — Stengel replaced Harris after Harris won 94 games",
      "Aging — the 'Boy Wonder' nickname became ironic as Harris aged into a career journeyman manager",
    ],
    pressure_response: "EXCELLENT IN BIG MOMENTS, STEADY ACROSS SEASONS. Harris won the World Series at 27 — the ultimate pressure performance. He also won again at 50 (1947). His pressure response is not a spike — it's a reliable +1 Clutch at all times. Not as explosive as Stallings or Hornsby in their peak moments, but infinitely more sustainable. The Boy Wonder doesn't burn brightest in one moment — he glows steadily for 29 years.",
  },

  action_card_seeds: [
    {
      title: "The Boy Wonder",
      type: "Game Action",
      text: "Your manager is the youngest in baseball. In his first season, all players gain +2 to all stats. The energy of youth and the confidence of inexperience combine. If you win the championship: the bonus becomes permanent legend. 'You're only a kid, but I'm gambling on you having the right stuff.'",
      origin: "1924: Bucky Harris, age 27, became the youngest player-manager in baseball history. He won the World Series in his first season — something no rookie manager had ever done. Clark Griffith's gamble paid off immediately.",
    },
    {
      title: "The Pebble Game",
      type: "Game Action",
      text: "Game 7. Extra innings. A routine grounder hits a pebble and bounces over the third baseman's head. The winning run scores. +3 Clutch for the remainder of the game. Fortune favors those who endure long enough for luck to find them.",
      origin: "Game 7, 1924 World Series, 12th inning: Earl McNeely's grounder hit a pebble and bounced over Giants third baseman Freddie Lindstrom's head, scoring the winning run. Washington's only championship was won on a lucky bounce — after Harris kept his team alive long enough for luck to arrive.",
    },
    {
      title: "When to Change Pitchers",
      type: "Action",
      text: "Your manager makes the perfect pitching change at the perfect moment. The new pitcher gains +3 to all pitching stats for the remainder of the game. 'There are only two things a manager needs to know: when to change pitchers...'",
      origin: "Harris was among the first managers to use relief pitchers regularly. His signature move in 1924: bringing Walter Johnson in as a reliever in the 9th inning of Game 7. Johnson pitched 4 shutout innings. The pebble game was won because Harris knew WHEN.",
    },
    {
      title: "From Mine Boy to Manager",
      type: "Action",
      text: "Your manager's working-class origins inspire the team. All players with humble backgrounds gain +1 to all stats. All players gain +1 Team Fit. The coal miner's son leads by example: you don't need privilege to achieve greatness.",
      origin: "Harris grew up in Pennsylvania coal country, the son of a miner. He wrote his autobiography 'Playing the Game: From Mine Boy to Manager.' He married a senator's daughter. He visited the White House. He never forgot where he came from.",
    },
    {
      title: "The 22-Year Comeback",
      type: "Game Action",
      text: "Your manager hasn't won a championship in decades. Everyone has forgotten he could. This season: all ratings +1. If you win the championship: +3 morale permanently. The Boy Wonder always has one more miracle in him.",
      origin: "Harris won the 1924 World Series with Washington and the 1947 World Series with the Yankees — 23 years apart. The longest gap between championship wins for any manager in history. The Boy Wonder proved he could still win at 50.",
    },
    {
      title: "If You Can't Play for Bucky",
      type: "Action",
      text: "Your manager is so universally respected that players want to play for him. All new acquisitions gain +1 to all stats and +2 Team Fit. 'If you can't play for Bucky, you don't belong in the major leagues.' — Joe DiMaggio",
      origin: "DiMaggio's endorsement of Harris is the highest compliment a manager can receive from a notoriously difficult star. Harris's gift was making great players feel respected and mediocre players feel capable.",
    },
  ],

  art_direction: {
    face: "Young, sharp, intelligent. 5'9½\" 156 lbs — slight but wiry, the build of a coal miner's son who played professional basketball. Quick eyes, an alert expression, the face of a man who sees the game three moves ahead. Not imposing — approachable. The face you'd trust with your team. Clean-cut, professional, with just enough boyishness to justify the 'Boy Wonder' nickname even decades later.",
    attire: "Washington Senators uniform from the 1920s — the distinctive 'W' on the cap. Or: the dual image — Senators uniform from 1924 on one side, Yankees pinstripes from 1947 on the other. The 23-year gap between championships visualized. Harris should look like he belongs in any era: the universal manager who could manage in 1924 or 1947 or 1956.",
    mood: "Steady competence. Not dramatic (Hornsby), not warm (Robinson), not cold (McCarthy) — steady. The card should feel like a reliable hand on the tiller. There's quiet confidence, not arrogance. The Boy Wonder grew into the Enduring Professional. The mood is sunrise — not flashy, but it arrives every day.",
    style: "Blue-silver Tactical Purist palette with warm undertones — the steady middle of the archetype. Griffith Stadium in the background, intimate and dignified. The card should feel solid and trustworthy — no cracks, no instability, no fireworks. Border should be clean and traditional. A pebble subtly embedded somewhere — the lucky bounce that defined his greatest moment.",
    reference: "The Tactical Purist Spectrum: Selee (1900) builds rosters from scratch through positional genius. Huggins (1910) abandons his own philosophy to adapt to Ruth's power. Harris (1920) boils managing down to two principles and applies them for 29 years. Three different kinds of tactical purity: Selee is architectural, Huggins is intellectual, Harris is reductive. Harris's card should feel the simplest — because his genius was simplicity itself.",
  },
};

const RATING_ENGINE = { overall: { tiers: [
  { range: "3-4", label: "Filler" }, { range: "5-6", label: "Solid Skipper" },
  { range: "7-8", label: "Contender" }, { range: "9-10", label: "Elite" },
  { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" },
]}};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archBlue: "#5588cc", archDark: "#2a4a7a",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archBlue}15`, border: `1px solid ${C.archBlue}30`, color: C.archBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function BuckyHarrisCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archBlue;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0a1a2a 0%, #1a2a3a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>⚾</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>TACTICAL PURIST</div>
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
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={archColor} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "WS GAP", val: "23 yr" },
                { label: "AGE 1st WS", val: "27" },
                { label: "TEAMS", val: "5" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>29 SEASONS — 4TH MOST IN MLB HISTORY — MINE BOY TO MANAGER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👶 Youngest WS Winner (27)", "🏆 2 World Series", "⭐ HOF 1975", "⚾ PIT 5 (Maximum)", "🔄 ADP 5 (Maximum)", "📞 Pioneered Relief Pitching", "⛏️ Coal Miner's Son", "🤝 'Play for Bucky'"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("REDUCED") ? `${C.coldBlue}20` : `${C.gold}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("REDUCED") ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Harris's real life, become universal cards playable in any game.</p>
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
