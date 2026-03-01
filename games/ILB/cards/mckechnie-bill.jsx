import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: BILL McKECHNIE
// Era: 1920 · Archetype: Opportunist
// "The Deacon" — Church Choir, Three Pennants, Quiet Sainthood
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Bill McKechnie",
  nickname: "The Deacon",
  year: 1940,
  team: "Cincinnati Reds",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Opportunist",
  born: "August 7, 1886 — Wilkinsburg, PA",
  died: "October 29, 1965 — Bradenton, FL (age 79)",
  hof: "Inducted 1962 (Veterans Committee). First manager to win pennants with 3 NL teams. First to win WS with 2 different teams. 'Twelve managers have won more games than Bill McKechnie. None has won more respect.'",
  height: '5\'10"',
  weight: "175 lbs",

  record: {
    career_wins: 1896,
    career_losses: 1723,
    win_pct: ".524",
    pennants: 4,
    world_series: 2,
    seasons_managed: 25,
    ejections: "Virtually none. McKechnie never raised his voice. 'Earned the trust of his players without ever needing to raise his voice.'",
    peak_team: "1940 Cincinnati Reds",
    peak_record: "100-53, won World Series over Detroit Tigers in 7 games",
    teams_managed: ["Newark Peppers/FL (1915): 54-45 as player-manager", "Pittsburgh Pirates (1922-26): WS title 1925", "St. Louis Cardinals (1928-29): NL pennant 1928", "Boston Braves (1930-37): 8 years of rebuilding", "Cincinnati Reds (1938-46): back-to-back pennants 1939-40, WS title 1940"],
    notable: "Only manager to win NL pennants with 3 different teams (Pirates 1925, Cardinals 1928, Reds 1939-40). First to win WS with 2 different teams. 1,896 wins (4th most when he retired). Never smoked, drank, or used profanity. Sang baritone in church choir. 'The Deacon.' Roomed with problem players to keep them sober. Emphasized pitching and defense as religion. Managed through Willard Hershberger's suicide during 1940 season. Developed Bucky Walters, Paul Derringer, Johnny Vander Meer. Coached for 1948 WS champion Indians. Poor sense of direction — once landed in wrong city. Scottish immigrant family, one of 10 children.",
    crisis_management: "August 3, 1940: Backup catcher Willard Hershberger, whom McKechnie had been counseling for depression, committed suicide in a hotel room. McKechnie was devastated — he'd been trying to help. The Reds were in a pennant race. McKechnie rallied the team, activated 40-year-old coach Jimmie Wilson to catch, and won the World Series. His greatest test of character and leadership.",
  },

  ilb_ratings: {
    tac: 4,  // High. "A baseball strategist" who "played the percentages faithfully." Managed by the book: "Show me a manager who isn't and I'll show you a manager who loses a lot of games he ought to win." Systematic, sound, reliable.
    pit: 5,  // Maximum. "If a pitcher can't win for Bill McKechnie, he can't win for anybody." Developed Walters (MVP), Derringer, Vander Meer (back-to-back no-hitters). His teams led the league in ERA and complete games. Pitching was his religion.
    lin: 3,  // Moderate. McKechnie's teams won through pitching and defense, not offense. His lineups were functional, not powerful. He maximized defense-first construction rather than offensive optimization.
    adp: 5,  // Maximum. Pennants with THREE different teams (only NL manager to do this). WS titles with TWO teams. Turned last-place Reds into champions. Went from Pirates to Cardinals to Braves to Reds — succeeding at each. The ultimate adapter.

    dis: 7,  // High. McKechnie maintained discipline through personal example and moral authority — no smoking, drinking, or profanity. He roomed with problem players to keep them sober. The discipline was moral, not military.
    ego: 8,  // Elite. "A master handler of men." Managed Paul Derringer (who was "prone to drinking and fighting, often in that order") and turned him into a 25-game winner. Handled Paul Waner, Pie Traynor, Ernie Lombardi. Ego management through quiet, consistent respect.
    har: 8,  // Elite. "The sort of man that other decent men would want their sons to play for." Not Robinson's HAR 10 (beloved chaos) — McKechnie's harmony was deeper, quieter, built on genuine moral authority and mutual respect.
    int: 4,  // Low-moderate. McKechnie was calm, measured, never theatrical. His intensity was internal and moral, not external and emotional. The church choir baritone, not the dugout screamer.
    str: 8,  // Elite. "A gifted team builder." "He built teams that were more than the sum of their parts." Turned last-place teams into contenders everywhere he went. Never had more than 2 losing seasons in a row. Developed pitchers across every franchise.
    flx: 7,  // High. Adapted to every franchise — the wealthy Pirates, the scrappy Cardinals, the hopeless Braves, the sleeping Reds. Different rosters, different cities, same philosophy applied differently. "Even when he took over sorry clubs, he never had more than two losing seasons in a row."

    ovr: 11, // Legend tier. Four pennants with three teams, two World Series with two teams, 25 seasons, universal respect. The quiet consistency and moral authority and team-building genius earn Legend. Not Mythic because his teams were good, not dominant — no four-peat, no dynasty.
  },

  rating_justification: {
    tac: "High. McKechnie was a systematic, percentage-playing manager. 'Show me a manager who doesn't manage by the book and I'll show you a manager who loses a lot of games he ought to win.' Not innovative — methodical. He didn't invent new tactics; he executed the established ones better than anyone. Rating of 4.",
    pit: "Maximum. The defining trait. 'If a pitcher can't win for Bill McKechnie, he can't win for anybody.' He developed Bucky Walters from a struggling outfielder-turned-pitcher into an MVP (27-11, 2.29 ERA). Paul Derringer went 25-7 under him. Johnny Vander Meer pitched back-to-back no-hitters. His 1939-40 Reds led the league in team ERA and complete games. Pitching and defense were his religion — and he was a devout practitioner. Rating of 5.",
    lin: "Moderate. McKechnie's teams won through pitching and defense, not offense. He didn't build powerful lineups — he built airtight defensive ones. The philosophy was deliberate: shut down the opposition, score just enough. His lineups were functional, not explosive. Rating of 3.",
    adp: "Maximum. The only NL manager to win pennants with three different teams. WS titles with two different teams. He took the last-place 1937 Reds and turned them into 1939-40 pennant winners. He took over mid-season with the Pirates and went 53-36. He won the Cardinals' pennant immediately in 1928. Every franchise, every roster, every challenge — McKechnie adapted and succeeded. Rating of 5.",
    dis: "High. McKechnie didn't enforce discipline through rules or punishment — he enforced it through personal example. He didn't smoke, drink, or use profanity. When a player was prone to carousing, McKechnie's solution was to room with him. The discipline was moral authority: players didn't want to disappoint the Deacon. Rating of 7.",
    ego: "Elite. 'A master handler of men.' McKechnie managed Derringer (drinker and fighter), Lombardi (moody catcher), Waner (HOF talent with personality), and a parade of difficult players across four franchises. He managed them through quiet, consistent respect — not confrontation. The ego management was invisible because it was preventive. Rating of 8.",
    har: "Elite. 'The sort of man that other decent men would want their sons to play for.' McKechnie's teams were harmonious because he was harmonious — Scottish Presbyterian turned Methodist, church choir baritone, moral authority without moralism. Players respected him because he respected them. The harmony was genuine, deep, and sustainable. Rating of 8.",
    int: "Low-moderate. McKechnie was not intense in the conventional sense. He was calm, measured, and never theatrical. His intensity was moral and internal — the quiet conviction that pitching and defense would prevail. The church choir baritone's intensity: steady, reliable, and impossible to rattle. Rating of 4.",
    str: "Elite. 'A gifted team builder. Even when he took over sorry clubs, he never had more than two losing seasons in a row. He built teams that were more than the sum of their parts.' McKechnie's roster construction across four franchises demonstrates sustained strategic genius. He developed pitchers everywhere he went: Walters, Derringer, Vander Meer with the Reds; the Waner brothers' Pirates; whatever he could salvage with the Braves. Rating of 8.",
    flx: "High. Each franchise was different: the wealthy, talented Pirates; Branch Rickey's Cardinals; the hopeless Braves; the sleeping Reds. McKechnie applied the same core philosophy (pitching and defense) differently in each context, adapting to different rosters, budgets, and expectations. The flexibility was within a consistent framework — the best kind. Rating of 7.",
  },

  personality: {
    leadership_style: "Moral authority through personal example. McKechnie led by being the person he wanted his players to become: disciplined, honest, humble, hardworking. He didn't demand compliance — he inspired it through character. When a player needed correction, McKechnie roomed with him. When a player needed development, McKechnie worked with him personally. The leadership was hands-on, intimate, and deeply caring. The Deacon didn't preach from a pulpit — he lived the sermon.",
    temperament: "Calm, principled, and unshakable. McKechnie never raised his voice. He didn't smoke, drink, or swear. He sang in the church choir. He managed through a player's suicide without losing his composure or his team's focus. The temperament wasn't coldness (McCarthy) or warmth (Robinson) — it was steadiness. The kind of calm that comes from deep conviction.",
    work_ethic: "Thorough and consistent. McKechnie was a detail manager: he studied opposing lineups, planned pitching matchups, and prepared his defense meticulously. But the preparation was invisible — no one noticed because everything ran smoothly. The work ethic of a good minister: the congregation only sees the sermon, not the hours of study that produced it.",
    lifestyle: "Scottish-American, Methodist, family man. One of 10 children of Scottish immigrants. Marched to church in kilts as a boy. Sang baritone in the Mifflin Avenue Methodist Church choir for decades. Married, raised a family in baseball. Lived in Bradenton, Florida, near the Pirates' spring training home (later named McKechnie Field after him). A quiet, decent, uncomplicated life — remarkable only for its goodness.",
    communication_style: "Quiet, direct, and respectful. McKechnie communicated through example, personal attention, and calm instruction. He didn't give speeches or issue commandments. He talked to players individually, listened to their problems, and offered practical solutions. The Hershberger crisis revealed his communication at its deepest: he tried to counsel a suicidal player personally, sat with him, listened. He couldn't save him — but he tried.",
    loyalty_expectations: "Play hard, respect the game, respect your teammates. McKechnie's loyalty expectations were simple and humane. He didn't demand personality compliance or system obedience — he expected decency. Players who were decent received McKechnie's full support. Players who weren't got McKechnie as a roommate until they improved.",
    dark_side: "The Hershberger tragedy and the limits of goodness. August 3, 1940: backup catcher Willard Hershberger committed suicide in his hotel room during a pennant race. McKechnie had been counseling him, trying to help. He couldn't save him. The tragedy haunted McKechnie — the one player he couldn't reach, the one crisis his moral authority couldn't prevent. The Reds won the World Series that year, but McKechnie carried the weight. In ILB: McKechnie's card includes 'The Shepherd's Burden' — the cost of caring for every player personally. When you take responsibility for souls, some of them break.",
  },

  playbook: {
    roster_philosophy: "Pitching and defense above all else — and build the rest around it. McKechnie's philosophy was a religion: get pitchers who throw strikes and finish what they start, get defenders who don't make errors, and let the offense take care of itself. 'He liked durable pitchers who threw strikes and finished what they started.' The roster was built from the mound outward, like a church built from the altar outward.",
    conflict_response: "ABSORB THROUGH CHARACTER. McKechnie didn't confront conflict — he absorbed it through patience, moral authority, and personal attention. When Derringer was drinking and fighting, McKechnie didn't fine him — he worked with him until Derringer went 25-7. When problems arose, the Deacon's calm was the solution.",
    clique_strategy: "UNIFY THROUGH SHARED VALUES. McKechnie's moral authority created a team culture where cliques couldn't thrive. The shared values — work ethic, respect, professionalism — transcended personality differences. Not through rules (McCarthy) or warmth (Robinson) but through genuine shared principles.",
    player_types_that_thrive: [
      "Pitchers — 'If you can't pitch for McKechnie, you can't pitch for anybody'",
      "Defensive specialists — McKechnie valued defense as highly as pitching",
      "Players with personal struggles who need quiet, consistent support — the roommate solution",
      "Team-first players who value collective success over individual glory",
      "Players who respect moral authority and respond to being treated with genuine decency",
    ],
    player_types_that_struggle: [
      "Power hitters who want the offense to be the star — McKechnie's teams won 2-1, not 10-8",
      "Players who need high energy or motivation — McKechnie's calm can feel passive",
      "Flashy personalities who crave attention — the Deacon's teams are workmanlike, not glamorous",
      "Players who resent moral authority — McKechnie's goodness can feel like judgment to some",
      "Impatient talents who want immediate offensive production — the defense-first build takes time",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "LOW — McKechnie's calm environment doesn't tolerate sustained chaos. He absorbs conflict, but volatility erodes his system.",
      discipline_floor: "HIGH through moral example. Not enforced — modeled. Players discipline themselves because the Deacon's standards are visible.",
      star_exception: "Stars are treated with the same quiet respect as everyone else. McKechnie never had a superstar problem because he never made anyone feel above or below the standard.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "+2 Team Fit for all players. McKechnie's moral authority and genuine care create a deep, sustainable cohesion. Not the loud family of Robinson — the quiet congregation of the Deacon." },
    volatility: { effect: "STRONGLY REDUCED", desc: "-2 Volatility for all players. McKechnie's calm is structural. Nothing rattles the Deacon. The team absorbs crises because the manager absorbs them first." },
    discipline: { effect: "INCREASED", desc: "+2 Discipline. Through moral example, not enforcement. Players discipline themselves because they don't want to disappoint McKechnie. The most sustainable form of discipline." },
    ego: { effect: "MANAGED", desc: "-1 Ego for all players. McKechnie's humility is contagious. It's hard to be arrogant in the presence of genuine goodness." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. McKechnie's thorough preparation and consistent standards raise everyone's baseline. The pitchers work hardest because McKechnie works hardest with them." },
    adaptability: { effect: "INCREASED", desc: "+2 Adaptability. McKechnie adapted to every franchise. His players learn to adapt because the philosophy (pitching/defense) provides a stable framework within which flexibility is possible." },
  },

  chemistry_traits: [
    { tag: "The Deacon", desc: "McKechnie's moral authority pervades the team. All players gain +1 Discipline and +1 Harmony upon joining. No player can develop 'Insubordinate' status. The church choir baritone commands respect without raising his voice." },
    { tag: "Pitching Is Religion", desc: "All pitchers gain +2 to their highest pitching stat under McKechnie. Teams led by McKechnie lead the league in ERA 30% of the time. 'If a pitcher can't win for McKechnie, he can't win for anybody.'" },
    { tag: "Defense Above All", desc: "All fielders gain +1 DEF. Errors are reduced by 15%. McKechnie's teams play the cleanest defensive baseball in the game. Offense wins headlines; defense wins McKechnie's championships." },
    { tag: "The Roommate Solution", desc: "When a player develops 'Troubled' or 'Disruptive' status, McKechnie rooms with them. After 3 games, the player loses the negative status and gains +1 Discipline permanently. The Deacon's personal touch saves careers." },
    { tag: "Three Teams, Four Pennants", desc: "McKechnie succeeds everywhere. When hired by a new team, all players gain +1 to all stats for 5 games (the new energy). If McKechnie has already won a pennant with a different team, the bonus is +2. Proven adaptability inspires confidence." },
    { tag: "The Shepherd's Burden", desc: "McKechnie cares for every player personally. If any player is removed due to injury, crisis, or tragedy, McKechnie loses -2 to all ratings for 3 games (the personal toll). But the team gains +1 morale (they see the manager's care). The cost of genuine empathy." },
    { tag: "By the Book", desc: "'Show me a manager who doesn't manage by the book and I'll show you a manager who loses games he ought to win.' McKechnie's tactical decisions are +1 effectiveness when playing the percentages. When forced to deviate from the book: -2 Tactics. Consistency is the system." },
    { tag: "More Than the Sum", desc: "'He built teams that were more than the sum of their parts.' If no player on the team is OVR 9+, all players gain +1 to all stats. McKechnie's genius is making good players play great, not managing superstars." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound / Bullpen", affinity: "MAXIMUM", note: "Where McKechnie's philosophy lived. Pitching was his religion. The mound was his altar." },
    { location: "Church Choir / Mifflin Ave Methodist", affinity: "HIGH", note: "Where McKechnie sang baritone. The spiritual anchor of the Deacon's life." },
    { location: "Hotel Room / On the Road", affinity: "HIGH", note: "Where McKechnie roomed with troubled players. The most intimate managerial intervention possible." },
    { location: "McKechnie Field / Bradenton, FL", affinity: "HIGH", note: "The spring training home named after him. His Florida base for decades." },
    { location: "Crosley Field / Cincinnati", affinity: "HIGH", note: "Where the 1939-40 Reds won their pennants. McKechnie's greatest triumph." },
    { location: "The Wrong City", affinity: "LOW", note: "McKechnie had a poor sense of direction. He once landed at an airport, took a cab, and didn't realize he was in the wrong city until the driver told him." },
  ],

  momentum: {
    hot_triggers: [
      "Pitching staff performing — when McKechnie's pitchers are dominant, his teams are nearly unbeatable",
      "Defensive excellence — clean defensive games energize the entire system",
      "New franchise arrival — McKechnie succeeded everywhere he went. The new energy boosts everyone",
      "Pennant races — McKechnie's Reds went 19-2 down the stretch in 1940 to clinch",
    ],
    cold_triggers: [
      "Offensive droughts — McKechnie's defense-first teams can't score their way out of slumps",
      "Personal tragedies — the Hershberger suicide devastated McKechnie personally",
      "Hopeless franchises — McKechnie spent 8 years with the terrible Braves. Even the Deacon has limits",
      "Being disrespected by ownership — 'His bosses didn't always treat him with respect'",
    ],
    pressure_response: "STEADY AND RELIABLE WITH EXCEPTIONAL CRISIS MANAGEMENT. The Hershberger suicide during a pennant race is the ultimate pressure test — and McKechnie passed it. He rallied the team, activated a 40-year-old coach to catch, and won the World Series. His pressure response isn't explosive — it's structural. In ILB: McKechnie provides +1 Clutch at all times, +2 during crises. The Deacon is at his best when things are at their worst.",
  },

  action_card_seeds: [
    {
      title: "Pitching Is Religion",
      type: "Action",
      text: "Your manager makes pitching and defense the foundation of everything. All pitchers gain +2 to all pitching stats permanently. All fielders gain +1 DEF. 'If a pitcher can't win for Bill McKechnie, he can't win for anybody.'",
      origin: "McKechnie's Reds led the league in ERA in 1939 and 1940. Walters won the MVP. Derringer went 25-7. Vander Meer pitched back-to-back no-hitters. The mound was McKechnie's altar, and his pitchers were the congregation.",
    },
    {
      title: "The Roommate Solution",
      type: "Action",
      text: "Your manager rooms with a troubled player. After 3 games, the player loses all negative status effects and gains +2 Discipline permanently. The Deacon doesn't punish — he heals. 'When he had a problem player who was likely to go out carousing, McKechnie's simple solution was to room with him.'",
      origin: "McKechnie's most personal intervention. He literally shared hotel rooms with players who were drinking or carousing. The moral authority of sleeping next to the Deacon was enough to change behavior.",
    },
    {
      title: "Three Pennants, Three Teams",
      type: "Game Action",
      text: "Your manager has won with different rosters before. He can do it again. All players gain +2 to their lowest stat for 10 games. 'He built teams that were more than the sum of their parts.'",
      origin: "McKechnie is the only NL manager to win pennants with three different teams: Pirates (1925), Cardinals (1928), Reds (1939-40). Each time, he adapted his philosophy to the roster. Each time, he won.",
    },
    {
      title: "The Shepherd's Burden",
      type: "Drama",
      text: "A player is lost to tragedy during a pennant race. Your manager is devastated but rallies the team. All players lose -2 morale for 3 games, then gain +3 morale for the rest of the season. The crisis becomes the cause. You play for the fallen.",
      origin: "August 3, 1940: Willard Hershberger committed suicide. McKechnie had been counseling him. The Reds activated 40-year-old coach Jimmie Wilson to catch. They went 19-2 down the stretch. They won the World Series. The greatest crisis management in baseball history.",
    },
    {
      title: "By the Book",
      type: "Action",
      text: "Your manager plays the percentages faithfully. All tactical decisions gain +1 effectiveness for 5 games. Deviation from the book costs -2. 'Show me a manager who doesn't manage by the book and I'll show you a manager who loses a lot of games he ought to win.'",
      origin: "McKechnie was proud of managing by the book. His response to critics who called him unimaginative was simple: the percentages win in the long run. The Deacon's faith wasn't just in God — it was in mathematics.",
    },
    {
      title: "The Wrong City",
      type: "Drama",
      text: "Your manager arrives in the wrong city. All plans are disrupted. -1 Tactics this game. But the story becomes team legend: +1 Team Fit permanently. Even the Deacon has his moments of human comedy.",
      origin: "McKechnie had a poor sense of direction. He once flew to an airport, took a cab, and asked for the Schenley Hotel. 'I never heard of it,' said the driver. McKechnie was in the wrong city entirely. The story delighted his players for years.",
    },
  ],

  art_direction: {
    face: "Kind, weathered, trustworthy. 5'10\" 175 lbs — average build, nothing imposing. The face of a church deacon: lined with care, softened by faith, lit by genuine warmth. Not Robinson's jolly rotundity or McCarthy's cold precision — McKechnie's face is the face of the man you'd trust with your son. Clear eyes. Gentle jaw. A slight smile that never becomes a grin. The kind of face that makes you want to be a better person.",
    attire: "Cincinnati Reds uniform from the late 1930s — or the versatile image: Pirates cap morphing into Cardinals cap morphing into Reds cap. The three teams represented. McKechnie should look like he belongs on any team — the universal manager who carried his philosophy from city to city. No flashiness. Clean, functional, professional.",
    mood: "Quiet conviction. The card should feel like walking into a church — not imposing, not casual, but deeply peaceful. There's strength in the quiet. McKechnie's card should radiate the feeling of safety: this is a man who will take care of you, develop your talent, protect you from yourself, and carry the weight when it gets too heavy. The Deacon's mood is shelter.",
    style: "Purple-silver Opportunist palette but warmer than Stallings or Griffith — the warmth of faith rather than the flash of ambition. Crosley Field in the background, bathed in evening light. A church steeple subtly visible. The card should feel well-worn and beloved, like a family Bible — used daily, respected always. Border should be simple and solid.",
    reference: "The Opportunist Spectrum: Griffith (1900) adapted through politics and business. Stallings (1910) adapted through one perfect moment. McKechnie (1920) adapted through moral consistency applied everywhere. Three different kinds of opportunism: Griffith was economic, Stallings was miraculous, McKechnie was spiritual. McKechnie's card should feel the most trustworthy — because he was.",
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
  archPurple: "#b070cc", archDark: "#6a3a8a",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archPurple}15`, border: `1px solid ${C.archPurple}30`, color: C.archPurple, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function BillMcKechnieCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archPurple;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #1a0a2a 0%, #2a1a3a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>⛪</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>OPPORTUNIST</div>
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
              <ClubhouseBar label="STRATGY" value={r.str} color={"#5588cc"} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={archColor} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "NL TEAMS", val: "3 🏆" },
                { label: "ERA LDR", val: "39-40" },
                { label: "VOICE", val: "Never ↑" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ONLY NL MANAGER TO WIN PENNANTS WITH 3 TEAMS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1962", "🏆 2 WS Titles (2 Teams)", "⛪ Church Choir Baritone", "⚾ PIT 5 (Maximum)", "🔄 ADP 5 (Maximum)", "🛏️ Roommate Solution", "📖 Manages By the Book", "🙏 'Play for Your Sons'"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("MANAGED") ? `${C.coldBlue}20` : `${C.gold}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("MANAGED") ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McKechnie's real life, become universal cards playable in any game.</p>
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
