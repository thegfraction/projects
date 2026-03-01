import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: JOE McCARTHY
// Era: 1920 · Archetype: Authoritarian
// "Marse Joe" — .615 W-L%, Ten Commandments, Cold Perfection
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Joe McCarthy",
  nickname: "Marse Joe",
  year: 1937,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Authoritarian",
  born: "April 21, 1887 — Philadelphia, PA",
  died: "January 13, 1978 — Buffalo, NY (age 90)",
  hof: "Inducted 1957. Voted 2nd greatest manager in baseball history (behind Stengel) in 1997 BBWAA poll. Plaque in Monument Park calls him 'one of baseball's most beloved and respected leaders.'",
  height: '5\'8"',
  weight: "165 lbs",

  record: {
    career_wins: 2125,
    career_losses: 1333,
    win_pct: ".615",
    pennants: 9,
    world_series: 7,
    seasons_managed: 24,
    ejections: "Extremely rare — never went to the mound, never argued with umpires except on rules points. Control was silent, not theatrical.",
    peak_team: "1936-1943 New York Yankees (7 pennants in 8 years, 6 WS titles)",
    peak_record: "Four consecutive World Series titles (1936-39) — first team ever to accomplish this",
    teams_managed: ["Chicago Cubs (1926-30): 442-321", "New York Yankees (1931-46): 1460-867", "Boston Red Sox (1948-50): 223-145"],
    notable: ".615 career W-L% — highest in MLB history. .698 postseason W-L% — also highest ever. 7 World Series titles (tied with Stengel for most ever). Never finished below first division in 32 years of managing. Never played a single major league game. First manager to win pennants in both leagues. 'Ten Commandments for Success.' Waived Grover Cleveland Alexander for insubordination. Managed Ruth, Gehrig, DiMaggio. Six 100-win seasons. Battled alcoholism. Resigned by telegram.",
    ten_commandments: [
      "1. Nobody ever became a ballplayer by walking after a ball.",
      "2. You will never become a .300 hitter unless you take the bat off your shoulder.",
      "3. An outfielder who throws after a runner is locking the barn door after the house is stolen.",
      "4. Keep your head up, and you may not have to keep it down.",
      "5. When you start to slide, slide. He who changes his mind may have to change a good leg for a bad one.",
      "6. Do not alibi on bad hops. Anybody can field the good ones.",
      "7. Always run them out. You can never tell.",
      "8. Do not quit.",
      "9. Do not fight too much with the umpires. You cannot expect them to be as perfect as you are.",
      "10. A pitcher who hasn't control hasn't anything.",
    ],
  },

  ilb_ratings: {
    tac: 3,  // Surprisingly moderate. Jimmy Dykes called him a "push-button" manager. His detractors said he was "simply fortunate enough to be provided with great talent and was not a strong game tactician." His genius was organizational, not in-game.
    pit: 5,  // Maximum. "Proved himself to be an excellent handler of pitchers." First to separate pitching staffs into starters and relievers. "Manipulated the staff adroitly." Exploited relief pitching before anyone else.
    lin: 4,  // High. Assembled and ordered Murderers' Row 2.0. Managed the transition from Ruth to Gehrig to DiMaggio seamlessly. Changed the way teams were developed using utility players.
    adp: 4,  // High. Managed across three decades and three franchises. Adapted from the Cubs' situation (rebuilding) to the Yankees' (maintaining dynasty) to the Red Sox's (contending). Adjusted his dress code for Ted Williams.

    dis: 10, // Maximum. The Ten Commandments. Waived Grover Cleveland Alexander (HOF pitcher) for obeying "Alex's rules" instead of McCarthy's. No player was bigger than the system. Required shaving before arriving at the ballpark. Had uniforms cut larger to make Yankees look more imposing.
    ego: 8,  // Elite. Managed Babe Ruth (who wanted his job), Lou Gehrig, Joe DiMaggio, Ted Williams, and Hack Wilson. Ruth resented him; McCarthy worked with him anyway. DiMaggio exemplified compliance. Handled stars through professionalism, not personality.
    har: 6,  // Good but not great. His teams functioned like machines, not families. The professionalism created harmony through structure, not warmth. "Never easy to know." "Suspicious with the press." The harmony was institutional, not emotional.
    int: 6,  // Moderate-high. Not theatrical — the intensity was quiet and relentless. "Low-key approach." Sat in the center of the dugout. But the alcoholism reveals internal intensity that couldn't be contained.
    str: 9,  // Elite. "An outstanding teacher and developer of talent." Turned utility players into regulars. Developed talent pipelines. Pioneered the starter/reliever split. Changed how teams were constructed.
    flx: 6,  // Good. Adapted his dress code for Ted Williams ("If I can't get along with a .400 hitter, they ought to fire me right now"). But his system was rigid — the Ten Commandments didn't change. Flexibility within a fixed structure.

    ovr: 12, // Legend tier. .615 W-L%, 7 World Series, 9 pennants, never below first division in 32 years. The most consistently excellent manager in baseball history. Only the "push-button" criticism and alcoholism prevent Mythic.
  },

  rating_justification: {
    tac: "Moderate. McCarthy's genius was organizational, not in-game. Jimmy Dykes called him a 'push-button' manager — implying he just pressed buttons with great talent. His detractors said he was 'simply fortunate enough to be provided with great talent.' This is unfair but has a kernel of truth: McCarthy's in-game tactical innovation was limited. His revolution was structural: the starter/reliever split, the utility player system, the dress code. Rating of 3.",
    pit: "Maximum. McCarthy was the first to systematically separate pitching staffs into starters and relievers. 'Proved himself to be an excellent handler of pitchers. He manipulated the staff adroitly.' He exploited relief pitching as a strategic weapon before anyone else. He stayed with his starter as long as the team had a chance to come back — but knew exactly when the chance was gone. Rating of 5.",
    lin: "High. Assembled and maintained the greatest sustained lineup in baseball history. The mantle passed from Ruth to Gehrig to DiMaggio without the Yankees missing a beat. McCarthy changed the way teams were developed, using utility players to supplement regulars. He brought Hack Wilson to the Cubs and turned him into an MVP. Rating of 4.",
    adp: "High. Managed three franchises across three decades (Cubs 1926-30, Yankees 1931-46, Red Sox 1948-50). Adapted from rebuilding (Cubs from 8th to pennant) to maintaining a dynasty (Yankees) to contending with a different culture (Red Sox). Adjusted his dress code for Ted Williams. But his core system — the Ten Commandments — never changed. Rating of 4.",
    dis: "Maximum. The defining trait. McCarthy waived Grover Cleveland Alexander — a Hall of Fame pitcher — for breaking team rules. 'Alex obeyed Alex's rules and not McCarthy's.' He required players to shave before arriving at the ballpark. He had uniforms cut larger so Yankees appeared imposing. He had the Ten Commandments printed and distributed. 'It was always easy to pick out a Yankee in a crowded lobby.' The discipline was absolute and non-negotiable. Rating of 10.",
    ego: "Elite. Managed four of the biggest egos in baseball history: Babe Ruth (who wanted his job), Lou Gehrig (sensitive and proud), Joe DiMaggio (silent perfectionist), and Ted Williams (.400 hitter with attitude). Ruth resented McCarthy; McCarthy worked with him pragmatically until Ruth was traded. DiMaggio exemplified McCarthy's system. Williams tested it — and McCarthy bent for the first time. Rating of 8.",
    har: "Good but institutional. McCarthy's teams were professional, not warm. 'Never easy to know.' 'Suspicious with the press.' The harmony came from shared standards, not shared emotions. Players respected McCarthy's fairness and competence, not his personality. The machine hummed — but it didn't love. Rating of 6.",
    int: "Moderate-high. McCarthy's low-key approach masked intense internal pressure. He never went to the mound. He rarely argued. He sat in the center of the dugout, watching. But the alcoholism reveals what the calm exterior concealed: 'benders that lasted a week or more.' The intensity was self-directed and self-destructive. Rating of 6.",
    str: "Elite. 'An outstanding teacher and developer of talent, particularly adept at handling temperamental players.' He developed Hack Wilson, nurtured utility players into regulars, pioneered the starter/reliever split, and maintained a dynasty through three generational transitions (Ruth→Gehrig→DiMaggio). 'Every manager of the Yankees since him has benefited from the foundation of the dynasty he built.' Rating of 9.",
    flx: "Good but bounded. McCarthy adapted his standards for exceptional circumstances — loosening his dress code for Ted Williams. But the Ten Commandments were non-negotiable. The system was the system. You adapted to it; it didn't adapt to you. The flexibility was strategic, not philosophical. Rating of 6.",
  },

  personality: {
    leadership_style: "Corporate perfectionism. McCarthy ran the Yankees like a Fortune 500 company before Fortune 500 companies existed. Standards were non-negotiable. Appearance was mandatory. Performance was expected. Individual expression was subordinated to organizational identity. 'It was always easy to pick out a Yankee in a crowded lobby, even in Boston.' The pinstripes weren't just a uniform — they were a brand, and McCarthy was the brand manager.",
    temperament: "Calm, controlled, and privately tortured. McCarthy never raised his voice in the dugout. He never went to the mound. He never argued with umpires theatrically. He sat in the center of the dugout and watched. But at home, he drank — 'benders that lasted a week or more.' The control was a performance. Underneath it, the pressure was crushing. The man who controlled everything couldn't control himself.",
    work_ethic: "Relentless and systematic. McCarthy grew up idolizing Connie Mack. He spent 15 years in the minor leagues as a player who couldn't reach the majors — and turned that failure into the deepest understanding of player development in baseball. Every detail mattered: the cut of the uniform, the shave before the game, the Ten Commandments on the clubhouse wall. Nothing was accidental.",
    lifestyle: "Irish Catholic from Philadelphia's Germantown neighborhood. Never played a major league game. Married late, no children. Owned a 61-acre farm in Amherst, New York, that he called 'Yankee Farm.' Retired there between stints. Private, reserved, suspicious of reporters. 'Marse Joe was never easy to know.' Died at 90 of pneumonia in Buffalo. The loneliness of command.",
    communication_style: "Sparse, precise, and authoritative. McCarthy spoke when necessary and stayed silent otherwise. His Ten Commandments were his communication style distilled: direct, practical, unarguable. He rarely gave interviews, rarely revealed himself, rarely showed emotion — except at Lou Gehrig's farewell, where he broke down in tears. The one moment the mask slipped revealed a man who felt deeply but showed nothing.",
    loyalty_expectations: "Absolute compliance with the system. McCarthy demanded that players follow his rules without exception. Those who did — DiMaggio, Gehrig, Dickey — thrived and loved him. Those who didn't — Alexander, Ruth (initially) — were traded or released. The loyalty wasn't personal; it was institutional. You were loyal to the Yankee way, and the Yankee way was McCarthy's way.",
    dark_side: "The alcoholism and the isolation. McCarthy drank heavily and went on 'benders that lasted a week or more.' He resigned from the Yankees by telegram after failing to show up during a series with Detroit. DiMaggio: 'He was drinking too much. He wasn't eating right, and he was worried about the team because it was playing so lousy.' The perfectionist who demanded control of everything lost control of himself. In ILB: McCarthy carries 'The Perfectionist's Burden' — his standards are the highest in the game, and the cost is paid in private.",
  },

  playbook: {
    roster_philosophy: "Build a machine, not a team. McCarthy's rosters were designed as interlocking systems: starters and relievers separated, utility players ready for every contingency, lineups ordered for maximum production. Individual talent was essential but subordinate to organizational structure. The Yankees didn't win because they had the best players — other teams had great players too. They won because every player knew exactly what was expected and delivered it.",
    conflict_response: "ELIMINATE THE SOURCE. When Pete Alexander broke the rules, McCarthy waived him — a Hall of Famer. When Ruth challenged his authority, McCarthy outlasted him until Ruth was traded. McCarthy didn't resolve conflict — he removed it. The system was non-negotiable. If you couldn't comply, you left.",
    clique_strategy: "PREVENT THROUGH STANDARDS. McCarthy's uniform standards, dress codes, and Ten Commandments created a single culture that superseded individual identity. There were no cliques because there was no room for sub-groups. You were a Yankee or you weren't. The brand was the only identity that mattered.",
    player_types_that_thrive: [
      "Professionals who take pride in doing things correctly — DiMaggio was the prototype",
      "Players who respond to clear, consistent expectations — the Ten Commandments provided a road map",
      "Quiet, disciplined talent — Gehrig, Dickey, Combs — players who let their performance speak",
      "Young players willing to be developed within the system — McCarthy was 'an outstanding teacher'",
      "Pitchers — McCarthy's staff management was the best in baseball",
    ],
    player_types_that_struggle: [
      "Prima donnas who expect special treatment — Alexander was waived, Ruth was traded",
      "Players who resent authority — 'Marse Joe' is not a democratic leader",
      "Chaotic or undisciplined personalities — the Yankee way has no room for improvisation",
      "Players who need emotional connection with their manager — McCarthy was 'never easy to know'",
      "Free spirits — the dress code, the shaving rule, the Ten Commandments are non-negotiable",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "LOW — McCarthy maintains a controlled, professional atmosphere. Volatility is eliminated, not managed.",
      discipline_floor: "MAXIMUM — the Ten Commandments. The shaving rule. The dress code. The uniform cut. Every detail is mandated.",
      star_exception: "No exceptions for behavior. Stars get patience for performance but answer to the same rules. Alexander was a HOFer. He was still waived.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "+2 Team Fit for all players. The Yankee Way creates belonging through shared standards. 'Easy to pick out a Yankee in a crowded lobby.' The brand IS the team." },
    volatility: { effect: "STRONGLY REDUCED", desc: "-3 Volatility for all players. McCarthy's calm, systematic approach eliminates chaos. No mound visits, no umpire arguments, no theatrics. The dugout is a library, not a locker room." },
    discipline: { effect: "MAXIMUM INCREASE", desc: "+3 Discipline for all players. The Ten Commandments, the dress code, the shaving rule. The most disciplined teams in baseball history. 'His ballplayers play the part of champions at all times.'" },
    ego: { effect: "SUPPRESSED", desc: "-2 Ego for all players. The system is bigger than any individual. McCarthy opted not to wear a uniform number — even the manager is subordinate to the organization." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. 'Nobody ever became a ballplayer by walking after a ball.' The first commandment establishes the standard. Effort is mandatory." },
    adaptability: { effect: "MODERATE", desc: "+1 Adaptability. Players learn to adapt to the system. But the system itself doesn't adapt much. Flexibility within rigid structure." },
  },

  chemistry_traits: [
    { tag: "The Ten Commandments", desc: "McCarthy's rules are law. All players gain +2 Discipline and +1 Work Habits upon joining. Violation of any Commandment results in immediate benching. 'A pitcher who hasn't control hasn't anything.'" },
    { tag: "The Yankee Way", desc: "Players under McCarthy are identifiable by their professionalism. +1 Team Fit, +1 to all stats when playing at home. 'It was always easy to pick out a Yankee.' The brand elevates everyone." },
    { tag: "Push-Button Manager", desc: "Critics say McCarthy just pushed buttons with great talent. When all starters have OVR 8+, McCarthy gains +1 to all Game Management ratings. When they don't, he loses -1. The system needs the talent." },
    { tag: "Marse Joe", desc: "'Master Joe.' McCarthy's authority is absolute. No player can refuse an assignment, question a decision, or challenge a rule. Insubordination results in immediate release — even for Hall of Famers." },
    { tag: "Never Played a Game", desc: "McCarthy never played in the majors. -1 credibility with players who have 'Veteran' trait. +1 Tactics (no playing-career bias clouds his judgment). The outsider who became the master." },
    { tag: "The Perfectionist's Burden", desc: "McCarthy's private alcoholism. After 15 games, 5% chance per game of a 'Bender' event — manager unavailable for 2 games. Returns with -1 to all ratings that series. The price of perfection." },
    { tag: "Larger Uniforms", desc: "McCarthy had Yankee uniforms cut larger to make players appear more imposing. +1 Intimidation factor against all opponents. Psychological warfare through tailoring." },
    { tag: "The Gehrig Moment", desc: "When a beloved player is removed due to injury or decline, McCarthy provides +3 morale to all players for 5 games. 'It was a sad day in the life of everybody who knew you.' Tragedy elevates the team." },
  ],

  preferred_locations: [
    { location: "Dugout Center / Yankee Stadium", affinity: "HIGH", note: "McCarthy sat in the center of the dugout, watching, never moving to the mound. The commander's seat." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Where the Ten Commandments hung on the wall. Where players shaved before games. Where the Yankee Way was enforced." },
    { location: "Front Office / Trades", affinity: "HIGH", note: "Opposing teams were hesitant to trade with the Yankees. McCarthy's talent evaluation was legendary." },
    { location: "Yankee Farm / Buffalo", affinity: "MEDIUM", note: "His 61-acre farm in Amherst, NY. Where he retreated between managing stints. Where he resigned by telegram." },
    { location: "Minor Leagues", affinity: "MEDIUM", note: "15 years as a player, then championships as a minor league manager. McCarthy's school — where the system was built." },
    { location: "Hotel Lobby", affinity: "MEDIUM", note: "'It was always easy to pick out a Yankee in a crowded lobby.' The brand extended beyond the field." },
    { location: "Home / Alone", affinity: "LOW", note: "Where the benders happened. Where the perfectionist's burden was paid. 'He was drinking too much.'" },
  ],

  momentum: {
    hot_triggers: [
      "Dynasty mode — when all pieces are in place, McCarthy's teams are historically unstoppable (1936-39: four straight WS)",
      "Player development paying off — watching his system produce stars",
      "World Series stage — 7-2 in the Fall Classic, the highest postseason W-L% in history",
      "Being doubted — 'Second-Place Joe' burned. He came back with four straight titles",
    ],
    cold_triggers: [
      "Losing control — alcoholism emerged when the team struggled",
      "Conflict with ownership (Wrigley fired him, MacPhail drove him out) — authority undermined from above",
      "Being called a 'push-button manager' — the criticism that his talent was the real manager",
      "Personal isolation — 'never easy to know,' no close friends in baseball, private suffering",
    ],
    pressure_response: "THE MOST CONSISTENTLY EXCELLENT PRESSURE PERFORMER IN HISTORY. 7-2 in World Series. .698 postseason W-L%. Four consecutive championships. McCarthy didn't spike in pressure — he maintained his elite level through it. In ILB: McCarthy provides +1 Clutch at all times. No spikes, no crashes — just relentless, grinding excellence. The machine doesn't care about pressure. It just performs.",
  },

  action_card_seeds: [
    {
      title: "The Ten Commandments",
      type: "Action",
      text: "Your manager posts his rules on the clubhouse wall. All players gain +2 Discipline and +1 Work Habits permanently. Any player who violates a rule is immediately benched for 1 game. 'Nobody ever became a ballplayer by walking after a ball.'",
      origin: "McCarthy's Ten Commandments were his managerial philosophy distilled into ten rules. He distributed them to every team he managed. They covered effort, hustle, sliding technique, fielding attitude, and pitcher control.",
    },
    {
      title: "The Alexander Decision",
      type: "Trade",
      text: "Your manager releases a Hall of Fame-caliber player for breaking team rules. All remaining players gain +3 Discipline permanently. 'He obeyed his own rules and not McCarthy's.' Nobody is bigger than the system.",
      origin: "McCarthy waived Grover Cleveland Alexander — a Hall of Fame pitcher with 373 career wins — because Alexander followed 'Alex's rules' instead of McCarthy's. It was the most dramatic assertion of managerial authority in Cubs history.",
    },
    {
      title: "Four Straight",
      type: "Game Action",
      text: "Your team has won 3 consecutive championships. For the 4th championship attempt: all players gain +2 to all stats. The machine is operating at peak efficiency. No team had ever won four consecutive World Series before McCarthy's 1936-39 Yankees.",
      origin: "The 1936-39 Yankees won four consecutive World Series — the only team ever to do so. McCarthy's system was so dominant that the question wasn't whether the Yankees would win, but by how much.",
    },
    {
      title: "The Gehrig Farewell",
      type: "Drama",
      text: "A beloved player is forced to retire due to illness or injury. Your manager breaks down in tears — the only time the mask slips. All players gain +3 morale for 5 games. 'Lou, what else can I say except that it was a sad day in the life of everybody who knew you.'",
      origin: "July 4, 1939: Lou Gehrig Appreciation Day at Yankee Stadium. McCarthy, who never showed emotion publicly, wept. Gehrig died less than two years later. The Yankees won the World Series that year — for Gehrig.",
    },
    {
      title: "The Telegram",
      type: "Drama",
      text: "Your manager's private demons overwhelm him. He disappears for 3 games, then resigns by telegram. All players lose -2 morale. But if they rally and win the next 5 games without him: +2 to all stats permanently. The machine outlives its creator.",
      origin: "May 1946: McCarthy went on a bender, failed to show up during a series with Detroit, and resigned by telegram from his Buffalo farm. DiMaggio: 'He was drinking too much. He wasn't eating right.'",
    },
    {
      title: "Larger Uniforms",
      type: "Action",
      text: "Your manager has the team's uniforms cut larger to appear more imposing. +1 Intimidation against all opponents for 5 games. Psychological warfare before the first pitch. The Yankees LOOKED like champions because McCarthy made them look that way.",
      origin: "McCarthy had Yankee caps and uniforms cut larger so his players would appear bigger and stronger. The dress code extended beyond the field: suits, ties, proper deportment in hotels. The brand was the weapon.",
    },
  ],

  art_direction: {
    face: "Compact, controlled, watchful. 5'8\" 165 lbs — Irish features, square jaw, piercing eyes that seem to be evaluating everything they see. Clean-shaven (naturally — he required it). The face of a man who is always calculating, always judging, always finding the gap between acceptable and excellent. Not cruel — but not warm. The face of a CEO who happens to run a baseball team.",
    attire: "Yankees uniform without a number — McCarthy was the only Yankee without one, deliberately subordinating himself to the organization. Or: a suit in the dugout (he occasionally managed in street clothes). The lack of number is the card's signature visual detail — the blank back, the anonymous authority. He is The System, not a personality.",
    mood: "Controlled authority with visible strain. The calm exterior is the performance; the private suffering is the reality. The card should feel like a corporate portrait — precise, composed, powerful — with one detail that hints at the darkness beneath: slightly bloodshot eyes, a glass on the desk, a telegram in the hand. The perfection has cracks, but you have to look closely.",
    style: "Cool blue-gray with silver undertones — the Authoritarian palette at its most corporate. Yankee Stadium's facade from the 1930s in the background, grand and imposing. The card should feel institutional — like a portrait in a boardroom. Border should be rigid, geometric, symmetrical. Pinstripe motifs throughout. The card IS the Yankee Way.",
    reference: "Where McGraw's Authoritarian card (1900 Era) is volcanic and personal — Iron Fist, Napoleon — McCarthy's is corporate and impersonal. McGraw controlled through fear and charisma. McCarthy controlled through systems and standards. Both are DIS 10. Both are OVR 12. But they represent opposite ends of the Authoritarian spectrum: McGraw is the dictator who leads from the front. McCarthy is the executive who leads from the center of the dugout.",
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
  archRed: "#e05555", archDark: "#8a2a2a",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archRed}15`, border: `1px solid ${C.archRed}30`, color: C.archRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function JoeMcCarthyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archRed;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #1a0a0a 0%, #2a1a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>📋</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>AUTHORITARIAN</div>
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
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "100-W SZN", val: "6" },
                { label: "4 STRGHT", val: "✓" },
                { label: "NO MLB", val: "0 G" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS — NEVER BELOW 1ST DIVISION</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 9 Pennants", "🏆 7 World Series", "⭐ HOF 1957", "📜 Ten Commandments", "📊 .615 W-L% (#1 Ever)", "🏟️ Monument Park", "🚫 Never Played MLB", "🥃 Private Burden"].map((a, i) => (
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
                <Section title="The Ten Commandments">{d.record.ten_commandments.map((c, i) => (<div key={i} style={{ padding: "2px 0", fontSize: 11, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{c}</div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("MAXIMUM") || effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("SUPPRESSED") ? `${C.coldBlue}20` : `${C.gold}20`, color: effect.includes("MAXIMUM") || effect.includes("STRONGLY") ? C.traitGreen : effect.includes("SUPPRESSED") ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McCarthy's real life, become universal cards playable in any game.</p>
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
                <Section title="McCarthy's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
  hof_players: d.record.notable,
  career_pct: d.record.win_pct,
  never_played_mlb: true,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
