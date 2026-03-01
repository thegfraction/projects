import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: ROGERS HORNSBY
// Era: 1920 · Archetype: Firebrand
// "The Rajah" — .358 BA, .463 Managerial W-L%, A Liturgy of Hatred
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Rogers Hornsby",
  nickname: "The Rajah",
  year: 1926,
  team: "St. Louis Cardinals",
  era: "1920s",
  ilb_team: "Lumber",
  archetype: "Firebrand",
  born: "April 27, 1896 — Winters, TX",
  died: "January 5, 1963 — Chicago, IL (age 66)",
  hof: "Inducted 1942. .358 career BA (2nd all-time). 7x batting champion. 2x MVP. 2x Triple Crown. Named 9th on Sporting News list of Greatest Players (1999). All-Century Team. Elected to HOF while managing in the low minors — exiled from the majors for gambling and personality.",
  height: '5\'11"',
  weight: "175 lbs",

  record: {
    career_wins: 701,
    career_losses: 812,
    win_pct: ".463",
    pennants: 1,
    world_series: 1,
    seasons_managed: 14,
    ejections: "Surprisingly few — 'a true gentleman on the field, he never questioned a decision' (umpire Len Roberts). Hornsby's violence was verbal and interpersonal, not theatrical.",
    peak_team: "1926 St. Louis Cardinals",
    peak_record: "89-65, won first World Series in Cardinals history (defeated Yankees)",
    teams_managed: ["St. Louis Cardinals (1925-26): 153-116 — FIRED after winning WS", "Boston Braves (1928): 39-83 — traded mid-season", "Chicago Cubs (1930-32): 141-116 — FIRED while in first place", "St. Louis Browns (1933-37, 1952): 255-381 — FIRED", "Cincinnati Reds (1952-53): 64-82 — FIRED", "Plus minor league stints: more successful at lower levels"],
    notable: ".358 career BA (2nd all-time behind Cobb). Managed 6 major league teams, FIRED OR TRADED FROM ALL OF THEM. 701-812 managerial record (.463). Won 1926 WS as player-manager then was fired in offseason. Kicked owner Sam Breadon out of the Cardinals clubhouse. Fired as Cubs manager while in first place. Compulsive horse gambler — possibly blacklisted by Commissioner Landis. Never read anything but sports pages. Never watched movies. Slept 12 hours a night. Stared out the window waiting for spring. 'A liturgy of hatred.' 'Frank to the point of being cruel and as subtle as a belch.' 'Knew more about baseball and less about diplomacy than anyone.'",
    playing_career: ".358 BA (2nd all-time), 2,930 hits, 301 HR, 1,584 RBI, .434 OBP, .577 SLG. Hit .400+ three times (.401 in 1922, .424 in 1924, .403 in 1925). 7x NL batting champion (6 consecutive 1920-25). 2x NL MVP (1925, 1929). 2x NL Triple Crown (1922, 1925). OPS+ of 175. Arguably the greatest right-handed hitter in baseball history.",
  },

  ilb_ratings: {
    tac: 3,  // Moderate. Hornsby's genius was hitting, not managing. No tactical innovations. "Like many great ballplayers who try to manage, he couldn't teach what had come so naturally to him."
    pit: 3,  // Moderate. No special reputation for pitching management. His playing career was all offense.
    lin: 4,  // High. As a player-manager, he WAS the lineup. His .358 BA elevated any team he played for. But he struggled to build lineups around others once he stopped playing.
    adp: 2,  // Low. Hornsby never adapted. He managed the same way everywhere and was fired everywhere. His approach was unchanging: demand excellence, tolerate nothing less, get fired.

    dis: 7,  // High. Demanded maximum effort and professionalism. But discipline was applied through verbal brutality, not structured systems. "Sarcastic and uncompromising."
    ego: 2,  // Very low. Hornsby's OWN ego was the problem. He couldn't subordinate himself to owners, couldn't manage egos above his own, kicked owners out of clubhouses. The worst ego MANAGER in baseball because he was the biggest ego IN the room.
    har: 1,  // Minimum. "Nobody liked our manager Rogers Hornsby." "A liturgy of hatred." Fired after winning the World Series. Fired while in first place. The most disliked manager in baseball history.
    int: 10, // Maximum. Pure, relentless, burning intensity. "His only interest was in winning." Never read, never watched movies, slept 12 hours, stared out the window waiting for spring. Baseball consumed him completely. The intensity was pathological.
    str: 4,  // Moderate. "Best batting instructor of his time" (with Lefty O'Doul). Could develop hitters. But couldn't teach what came naturally, couldn't build complete rosters, couldn't keep organizations together long enough to build anything.
    flx: 1,  // Minimum. Zero flexibility. "Stubborn nature." Same approach everywhere, same results everywhere: fired. Would not stop gambling when owners demanded it. Would not soften his words. Would not compromise. Ever.

    ovr: 7,  // Contender tier. The 1926 World Series title earns Contender. But 701-812 career, fired from every job, and the total inability to sustain anything prevent higher. The greatest player and worst diplomat in baseball history.
  },

  rating_justification: {
    tac: "Moderate. Hornsby was a hitter, not a strategist. No tactical innovations are associated with his managing. 'Like many great ballplayers who try to manage, he couldn't teach what had come so naturally to him.' He was frustrated by mediocrity because he'd never experienced it. Rating of 3.",
    pit: "Moderate. Unlike Robinson (a catcher) or McCarthy (a pitching staff innovator), Hornsby had no special reputation for pitching management. His playing career was entirely offensive. He managed pitching by expecting it to be good, not by developing it. Rating of 3.",
    lin: "High. As a player-manager, Hornsby WAS the best player in baseball. His .358 BA in the lineup elevated any team. He also recognized hitting talent — he was 'widely considered the best batting instructor of his time.' But once he stopped playing, his lineup construction was ordinary. Rating of 4.",
    adp: "Low. The defining anti-adaptation. Hornsby managed 6 major league teams and was fired from all of them. The same approach, the same results, the same exit. When the Cardinals told him to stop gambling, he refused and was traded. When the Cubs owner criticized him, he was fired while in first place. Adaptation requires compromise. Hornsby didn't compromise. Rating of 2.",
    dis: "High. Hornsby demanded excellence relentlessly. 'Sarcastic and uncompromising with club owners as he was with careless players.' He released outfielder Roy Johnson for poor effort. But his discipline was verbal brutality, not structured systems — effective in the moment, corrosive over time. Rating of 7.",
    ego: "Very low. The central paradox: Hornsby's ego was so enormous that he couldn't manage anyone else's. He kicked owner Sam Breadon out of the Cardinals clubhouse. He feuded with every owner who employed him. His ego was the cause of every firing. In ILB terms, Hornsby's EGO MANAGEMENT is the lowest possible because he IS the ego problem. Rating of 2.",
    har: "Minimum. 'Nobody liked our manager Rogers Hornsby.' 'A liturgy of hatred.' 'Frank to the point of being cruel and as subtle as a belch.' 'Hiring Rogers Hornsby to manage the Cubs was the worst mistake I made in all my years in baseball.' He was fired after winning the World Series. He was fired while in first place. No manager in history was more universally disliked. Rating of 1.",
    int: "Maximum. Hornsby's intensity was pathological. He never read anything but sports pages — to save his batting eyes. Never watched movies. Slept 12 hours a night. 'People ask me what I do in winter when there's no baseball. I'll tell you what I do. I stare out the window and wait for spring.' Baseball consumed every atom of his being. The intensity was superhuman and inhuman. Rating of 10.",
    str: "Moderate. Hornsby was the best batting instructor of his era — he could develop hitters. But 'he couldn't teach what had come so naturally to him' to average players. His talent development was limited to hitting, and even that frustrated him with lesser players. He couldn't build organizations because he destroyed relationships. Rating of 4.",
    flx: "Minimum. Zero flexibility. Hornsby's 'extremely stubborn nature' was legendary. He refused to stop gambling when owners demanded it. He refused to soften his words. He refused to adapt his approach to different players, different teams, different decades. Same man, same methods, same firing — six times. Rating of 1.",
  },

  personality: {
    leadership_style: "Uncompromising excellence through verbal brutality. Hornsby led by demanding that everyone meet his standard — which was the highest standard in baseball. When they couldn't (and almost no one could), he told them so in the cruelest possible terms. 'Frank to the point of being cruel and as subtle as a belch.' This worked briefly — the 1926 Cardinals were inspired enough to win the franchise's first World Series. But it couldn't last. Hornsby's leadership was a blowtorch: brilliant for a moment, destructive over time.",
    temperament: "Cold, sarcastic, and monomaniacal. Not hot-tempered like McGraw or Tebeau — Hornsby's cruelty was delivered with icy precision. He didn't scream; he cut. 'He was too rough-cut in speech, manner, and background to be truly regal, but the image of majesty was there.' The Rajah. A king who ruled through contempt.",
    work_ethic: "Obsessive and singular. Hornsby's work ethic for BASEBALL was supreme: he never read, never watched movies, slept 12 hours, ate steak and ice cream, and dedicated every moment of his existence to the game. But his work ethic for MANAGING — the people skills, the organizational building, the compromise — was nonexistent. He worked harder at being a player than anyone in history, and barely worked at all at being a manager.",
    lifestyle: "Ascetic and addicted. No alcohol, no tobacco — but compulsive horse gambling that lost him fortunes and possibly got him blacklisted by Commissioner Landis. Three marriages. A companion who died by suicide. He ate steak, drank whole milk, consumed ice cream every evening, and sat in hotel lobbies for hours watching people go by. The lobby sitting is the most revealing detail: a man who had nothing to say to anyone, watching humanity pass without engaging it.",
    communication_style: "Brutal honesty without filter. 'Hornsby knew more about baseball and less about diplomacy than anyone I ever knew.' When a struggling player asked for advice, Hornsby's response was typically: 'Get a better bat' or 'try hitting the ball.' He couldn't understand why everyone else couldn't hit .400. His communication was information without empathy — technically correct, humanly devastating.",
    loyalty_expectations: "Absolute dedication to winning. Nothing else mattered. Not feelings, not relationships, not job security — winning. Hornsby expected every player to care about baseball as much as he did. Since no one in history cared about baseball as much as Hornsby, everyone disappointed him.",
    dark_side: "The total failure of human connection. Hornsby's .358 batting average and .463 managerial winning percentage tell the whole story: the greatest individual performer in baseball couldn't translate his genius to a team. He was fired after winning the World Series — the only manager in history to achieve this. He was fired while in first place. He was possibly blacklisted. Three marriages, a companion's suicide, exiled to the minor leagues while in the Hall of Fame. 'A liturgy of hatred' from a man who loved only one thing — baseball — and baseball eventually rejected him too. In ILB: Hornsby carries 'The Rajah's Exile' — his individual brilliance is unmatched, but every relationship has an expiration date.",
  },

  playbook: {
    roster_philosophy: "Demand greatness, accept nothing less. Hornsby's roster philosophy was simple: get the best players and demand they play their best. No systems, no development plans, no patience. If you could play, you played. If you couldn't, Hornsby told you to your face and moved on. The philosophy produced one championship and six firings.",
    conflict_response: "CREATE AND ESCALATE. Hornsby didn't respond to conflict — he generated it through brutal honesty, then escalated it through refusal to back down. He kicked the Cardinals owner out of the clubhouse. He feuded with every employer. Conflict wasn't a problem to be solved; it was the inevitable result of Hornsby being Hornsby.",
    clique_strategy: "IRRELEVANT — EVERYONE HATES THE MANAGER. Cliques couldn't form because the entire team united in their dislike of Hornsby. 'Nobody liked our manager.' The anti-clique strategy: when everyone hates one person, nobody has time to hate each other.",
    player_types_that_thrive: [
      "Elite hitters who respect Hornsby's unmatched batting knowledge — he was the best hitting instructor alive",
      "Thick-skinned competitors who respond to blunt criticism — if you can take it, you'll improve",
      "Players who care about nothing except winning — Hornsby's only language",
      "Young hitters willing to learn mechanics from the greatest right-handed batter ever",
      "Players with no ego — Hornsby's ego fills the room, there's no space for yours",
    ],
    player_types_that_struggle: [
      "Every pitcher — Hornsby had no special pitching knowledge and minimal patience for pitching struggles",
      "Sensitive players who need encouragement — Hornsby's idea of encouragement is 'you're less terrible today'",
      "Players who value work-life balance — 'I stare out the window and wait for spring'",
      "Anyone who wants to be liked — 'Nobody liked our manager'",
      "Mediocre players — Hornsby was 'easily frustrated by mediocrity' because he'd never experienced it",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 1,
      max_volatility: "EXTREME — Hornsby is volatility. His presence destabilizes every team he touches.",
      discipline_floor: "HIGH — but through verbal brutality, not systems. The discipline is fear of being cut down.",
      star_exception: "Hornsby IS the star. No other star can coexist with his ego. The room has space for one great player, and it's always Hornsby.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "STRONGLY DECREASED", desc: "-3 Team Fit for all players. 'Nobody liked our manager.' Hornsby's presence corrodes team cohesion. Players bond AGAINST him, not with him." },
    volatility: { effect: "MASSIVELY INCREASED", desc: "+3 Volatility for all players. Hornsby creates instability everywhere he goes. Six teams, six firings. The volatility is not a bug — it's the entire Hornsby experience." },
    discipline: { effect: "INCREASED", desc: "+2 Discipline. Hornsby demands effort and punishes laziness. 'Sarcastic and uncompromising.' The discipline comes from fear of his verbal brutality." },
    ego: { effect: "AGGRAVATED", desc: "+2 Ego for all players. Hornsby's ego is so dominant that it provokes defensive ego in others. Players puff up to survive his criticism." },
    work_habits: { effect: "STRONGLY INCREASED", desc: "+2 Work Habits. Say what you will — Hornsby's obsessive dedication to baseball was contagious. Players worked harder under him because the alternative was his contempt." },
    adaptability: { effect: "DECREASED", desc: "-1 Adaptability. Hornsby's rigid approach forces players into his framework. There is no adaptation — only compliance." },
  },

  chemistry_traits: [
    { tag: "The Rajah", desc: "Hornsby's presence elevates all hitters. Every batter gains +1 Contact. But every pitcher loses -1 (Hornsby doesn't understand or value pitching). The greatest right-handed hitter in history teaches what he knows." },
    { tag: "A Liturgy of Hatred", desc: "Hornsby is universally disliked. -2 Harmony for all players. But players who survive 10 games under Hornsby gain +1 to all stats permanently (surviving his criticism makes you tougher)." },
    { tag: "Fired After Winning", desc: "If Hornsby wins a championship, there is a 50% chance he is fired in the offseason. If fired: +2 to the NEXT manager's Discipline (the relief of Hornsby leaving), and the team gains 'Rajah's Shadow' (+1 Work Habits for 10 games)." },
    { tag: "The Gambling Problem", desc: "Hornsby has a 10% chance per game of a 'Horse Racing' distraction: -1 Tactics that game. After 20 games, 5% chance of 'Blacklisted' event — Hornsby is removed by the commissioner and cannot return." },
    { tag: "Staring Out the Window", desc: "'People ask me what I do in winter. I stare out the window and wait for spring.' Hornsby gains +2 to all ratings in the first 5 games of each season. The anticipation sharpens everything." },
    { tag: "As Subtle as a Belch", desc: "Once per game, Hornsby delivers devastating criticism to an underperforming player. That player either gains +2 to their lowest stat (15% chance — the criticism was useful) or gains 'Demoralized' (-2 to all stats for 3 games, 85% chance)." },
    { tag: "Couldn't Teach Natural Genius", desc: "Players with OVR 8+ gain +1 to all stats under Hornsby (genius recognizes genius). Players with OVR 5 or below gain -1 to all stats (Hornsby cannot fathom mediocrity)." },
    { tag: "The Player-Manager", desc: "If Hornsby is also a player: +3 to his own batting stats. The greatest individual performer in any lineup. But -1 to all Clubhouse ratings (managing while playing means doing neither optimally)." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "MAXIMUM", note: ".358 career BA. This is where Hornsby belongs. The batter's box is the one place where his genius was unquestioned." },
    { location: "Hotel Lobby", affinity: "HIGH", note: "'Champion lobby sitter in baseball history.' Hours watching people go by. Not reading, not talking — just watching. The loneliest place in baseball." },
    { location: "Horse Track", affinity: "HIGH", note: "Compulsive gambler. Lost fortunes. Possibly blacklisted. The track was his only interest besides baseball — and it destroyed what baseball couldn't." },
    { location: "Manager's Office", affinity: "LOW", note: "Fired from every one. The office was always temporary — Hornsby knew it, and his behavior ensured it." },
    { location: "Dugout", affinity: "MEDIUM", note: "Where the verbal brutality happened. Where players learned to hate him. Where the occasional championship was forged through sheer will." },
    { location: "Window / Offseason", affinity: "HIGH", note: "'I stare out the window and wait for spring.' The bleakest, most honest description of baseball obsession ever spoken." },
  ],

  momentum: {
    hot_triggers: [
      "Early season — the anticipation and intensity peak when baseball returns after winter",
      "Player-manager mode — when Hornsby is batting AND managing, his genius is at maximum",
      "Facing inferior opponents — Hornsby's contempt for mediocrity becomes a weapon",
      "Hitting instruction — one-on-one teaching, where his genius translates directly",
    ],
    cold_triggers: [
      "Mid-season grind — relationships deteriorate, verbal abuse accumulates, the clubhouse turns toxic",
      "Losing streaks — Hornsby's intensity becomes counterproductive when winning stops providing cover",
      "Ownership conflicts — Hornsby ALWAYS feuds with ownership, and ownership always wins",
      "Gambling distractions — the horses pull his attention at the worst moments",
      "Post-championship — the one time he won, he was fired. Success triggers self-destruction.",
    ],
    pressure_response: "BRILLIANT ONCE, UNSUSTAINABLE ALWAYS. The 1926 World Series is Hornsby's masterpiece: player-manager leading the Cardinals to their first championship, hitting .317 in the Series. But the aftermath defines him: fired in the offseason. In ILB: Hornsby provides +3 Clutch in his FIRST championship appearance. -2 Clutch in all subsequent ones (the self-destruction accelerates). The Rajah burns brightest just before he burns out.",
  },

  action_card_seeds: [
    {
      title: "The Rajah's Standard",
      type: "Action",
      text: "Your manager demands excellence from every player. All hitters gain +2 Contact for 5 games. All pitchers lose -1 for 5 games (Hornsby doesn't value what he doesn't understand). 'If you can't hit, you can't play.'",
      origin: "Hornsby was the best batting instructor of his era. His .358 career average gave him unmatched authority to teach hitting. But pitching was a foreign language — he lived in the batter's box.",
    },
    {
      title: "Fired After Winning",
      type: "Drama",
      text: "Your manager wins the championship — and is fired in the offseason. All players lose -2 morale (the unfairness stings). But the next manager inherits +2 Discipline and +2 Work Habits (Hornsby's standards outlive his tenure). 'He kicked the owner out of the clubhouse.'",
      origin: "Hornsby won the 1926 World Series — the Cardinals' first championship — and was traded to the Giants that offseason. Sam Breadon couldn't tolerate Hornsby's personality. He once kicked Breadon out of his own clubhouse.",
    },
    {
      title: "A Liturgy of Hatred",
      type: "Action",
      text: "Your manager's brutal honesty terrifies the team into peak performance. All players gain +2 Work Habits and +1 Discipline for 5 games. But -2 Harmony permanently. The team plays harder — and hates harder.",
      origin: "'A liturgy of hatred.' One writer's description of Hornsby's managing style. He was 'sarcastic and uncompromising with club owners as he was with careless players.' Nobody was safe from his tongue.",
    },
    {
      title: "Staring Out the Window",
      type: "Drama",
      text: "It's the offseason. Your manager does nothing but wait for baseball. When spring arrives: +3 to all Game Management ratings for the first 3 games. The anticipation has sharpened everything. 'I stare out the window and wait for spring.'",
      origin: "The most haunting quote in baseball: 'People ask me what I do in winter when there's no baseball. I'll tell you what I do. I stare out the window and wait for spring.' A man with no interests, no hobbies, no relationships — only baseball.",
    },
    {
      title: "The Blacklist",
      type: "Drama",
      text: "Your manager's gambling problem catches up with him. The commissioner removes him from baseball. All players gain -3 morale. But the team can hire a new manager immediately — and the Rajah's ghost (+1 Work Habits) lingers for 10 games.",
      origin: "Commissioner Landis possibly blacklisted Hornsby from the majors for compulsive horse gambling and 'generally disagreeable personality.' Hornsby was elected to the Hall of Fame while managing in the low minors — exiled from the game he loved.",
    },
    {
      title: "The .424 Season",
      type: "Game Action",
      text: "Your player-manager has the greatest offensive season in modern history. He gains +4 to all batting stats for the entire season. But -2 to all Clubhouse ratings (he's too busy being transcendent to manage). 'The most unbelievable five-year run in baseball history.'",
      origin: "1924: Hornsby hit .424 — the highest average in the modern era. From 1921-25, his averages were .397, .401, .384, .424, .403. He was so far beyond everyone else that managing ordinary players became psychologically impossible.",
    },
  ],

  art_direction: {
    face: "Lean, angular, cold. 5'11\" 175 lbs — the opposite of Uncle Robbie's rotundity. High cheekbones, narrow eyes, a jaw that looks like it was designed for contempt. Texas cattle country hardened into bone. The face shows zero warmth. The eyes are evaluating you, and you're coming up short. Not angry — worse. Disappointed.",
    attire: "Cardinals uniform from the 1920s, bat in hand — always in hand. Even when managing, Hornsby should be holding a bat or have one within reach. The bat is his identity; the manager's role is secondary. The uniform should fit perfectly — Hornsby was meticulous about his body, his sleep, his diet. The physical presentation is flawless. The human presentation is toxic.",
    mood: "Cold intensity. Not volcanic (McGraw), not warm (Robinson), not calm (McCarthy) — cold. The card should feel like staring into the eyes of someone who has judged you and found you wanting. There's brilliance in the cold — the .424 season, the World Series — but it's the brilliance of a star that gives no warmth. The Rajah is alone at the top of the mountain.",
    style: "Orange-amber Firebrand palette but colder than Tebeau or Evers — the fire has been compressed into ice. Sportsman's Park / Cardinals red in the background but muted, almost monochrome. The card should feel isolated — a single figure standing apart from everything. No teammates in the background. No fans. Just Hornsby and his bat and the window he stares through all winter.",
    reference: "The Firebrand Spectrum now has three points: Tebeau (1900) is physical violence — spiking, intimidation. Evers (1910) is intellectual violence — the Merkle play, the rulebook. Hornsby (1920) is existential violence — his mere presence makes you feel inadequate. Three kinds of Firebrand cruelty across three eras. All OVR 7. All INT 10. All unsustainable. But Hornsby is the coldest — Tebeau raged, Evers cracked, Hornsby just... stared. Out the window. Waiting for spring.",
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

export default function RogersHornsbyCard() {
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
                <div style={{ fontSize: 80, opacity: 0.12 }}>🪟</div>
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
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "FIRED", val: "6x" },
                { label: "BAT AVG", val: ".358" },
                { label: "HR/RBI", val: "301/1584" },
                { label: "HAR", val: "1 ☠" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER RECORD — FIRED FROM EVERY TEAM HE MANAGED</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1942", "🏆 1926 WS (then fired)", "🏇 Compulsive Gambler", "💀 HAR 1 / FLX 1", "🔥 INT 10 (Maximum)", "🪟 Stares Out Window", "⚾ .358 BA (#2 Ever)", "🚫 'Nobody liked him'"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY DECREASED") || effect.includes("MASSIVELY") || effect.includes("AGGRAVATED") ? `${C.warmRed}20` : effect.includes("STRONGLY INCREASED") || effect.includes("INCREASED") ? `${C.traitGreen}20` : `${C.gold}20`, color: effect.includes("STRONGLY DECREASED") || effect.includes("MASSIVELY") || effect.includes("AGGRAVATED") ? C.warmRed : effect.includes("STRONGLY INCREASED") || effect.includes("INCREASED") ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Hornsby's real life, become universal cards playable in any game.</p>
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
