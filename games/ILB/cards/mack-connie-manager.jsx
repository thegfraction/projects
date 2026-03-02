import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: CONNIE MACK
// Era: 1910 · Archetype: Players' Manager
// "The Grand Old Man" — 53 Seasons, Business Suit, Scorecard
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Connie Mack",
  nickname: "The Grand Old Man of Baseball",
  year: 1911,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Gloves",
  archetype: "Players' Manager",
  born: "December 22, 1862 — East Brookfield, MA",
  died: "February 8, 1956 — Philadelphia, PA (age 93)",
  hof: "Inducted 1937 (Centennial Committee). 2nd class ever. Called 'Mr. Baseball.' His plaque is next to McGraw's — rivals for eternity.",
  height: '6\'1"',
  weight: "150 lbs",

  record: {
    career_wins: 3731,
    career_losses: 3948,
    win_pct: ".486",
    pennants: 9,
    world_series: 5,
    seasons_managed: 53,
    ejections: "Extremely rare — the most gentlemanly manager in history",
    peak_team: "1910-1914 & 1929-1931 Philadelphia Athletics",
    peak_record: "Five 100-win seasons (1910, 1911, 1929, 1930, 1931)",
    dynasties: "Two: 1910-14 ($100,000 Infield) & 1929-31 (Grove/Foxx/Cochrane/Simmons). Sold both.",
    notable: "3,731 wins (847 more than #2 all-time). 3,948 losses (1,449 more than #2). 7,755 games (unreachable). 53 seasons with ONE franchise. Managed in a business suit. Never wore a uniform. Waved a scorecard to position fielders. Called every player by their given name. Managed until age 87. Outlasted 8 US Presidents.",
    hof_players_managed: ["Eddie Collins", "Frank 'Home Run' Baker", "Chief Bender", "Eddie Plank", "Herb Pennock", "Lefty Grove", "Jimmie Foxx", "Mickey Cochrane", "Al Simmons", "Ty Cobb (late career)", "Zack Wheat (late career)"],
  },

  ilb_ratings: {
    tac: 4,  // "The Tall Tactician." First to systematically track where batters hit off particular pitches. Positioned fielders with scorecard waves. Pioneer of data-driven baseball.
    pit: 4,  // Managed Eddie Plank, Chief Bender, Lefty Grove — three HOF pitchers at their peak. Understood pitching rotation management deeply.
    lin: 4,  // Built the $100,000 Infield and the Grove/Foxx/Cochrane/Simmons dynasty. Superb talent assembly. Knew exactly which pieces fit together.
    adp: 5,  // Maximum. Managed across 53 seasons — from the deadball era through the live-ball era through WWII through the modern game. Built TWO dynasties decades apart. Nobody adapted more or longer.

    dis: 6,  // Gentle but firm. Called players by given names. Never cursed. But could be ruthless — sold off entire dynasties twice when finances demanded it.
    ego: 9,  // Near-maximum. Managed 11+ HOFers without ego disasters. Ty Cobb, Lefty Grove (notoriously temperamental), Jimmie Foxx — all played happily for "Mr. Mack." Universal respect through dignity.
    har: 9,  // Elite. "Humanity is the keystone that holds nations and men together. This is as true of baseball teams as any other pursuit." Players loved him, win or lose. Even in last place, they called him "Mr. Mack."
    int: 3,  // Low emotional intensity. Quiet, even-tempered, gentlemanly. Sat in the dugout in a suit, waving a scorecard. The opposite of Jennings's kinetic energy.
    str: 9,  // Elite roster builder — twice. The $100,000 Infield and the 1929-31 dynasty are both among the greatest teams ever assembled. "No other manager handled more young players and brought more to stardom."
    flx: 8,  // Managed through 5 different baseball eras. Built and dismantled two dynasties. Adapted from deadball to live-ball to modern baseball. Lost only because he managed too long.

    ovr: 12, // Legend tier. 9 pennants, 5 World Series, 3,731 wins. The most successful Players' Manager ever. Only the late-career decline prevents Mythic.
  },

  rating_justification: {
    tac: "'The Tall Tactician' — the nickname was earned. Mack was far ahead of his time in tracking where batters hit the ball off particular pitches. He positioned fielders with waves of his scorecard from the dugout. He was the first to systematically study spray charts and defensive positioning. The 1910-14 Athletics played a brand of scientific baseball that anticipated modern analytics by 80 years. Rating of 4.",
    pit: "Managed three Hall of Fame pitchers at their peak: Eddie Plank, Chief Bender, and Lefty Grove. Grove won 31 games in 1931 under Mack. The 1910-14 pitching staff was dominant. Mack understood pitcher workload and rotation before these were common concepts. His instinct for pitching talent was second only to his eye for position players. Rating of 4.",
    lin: "Built TWO of the greatest lineups in baseball history. The $100,000 Infield (Collins, Baker, Barry, McInnis) from 1910-14 was the most famous infield of its era. The 1929-31 lineup (Foxx, Cochrane, Simmons, Grove, Bishop) may be the greatest concentration of talent ever assembled. Mack found these players, developed them, and arranged them perfectly. Rating of 4.",
    adp: "Maximum. No manager in history adapted across more eras, more challenges, or more decades. 53 seasons. Deadball era to live-ball era to Depression to WWII to the modern game. Built dynasty → sold it → rebuilt → sold it → tried to rebuild again. The adaptation only failed because human biology eventually catches up at age 87. Rating of 5.",
    dis: "Gentle but firm. Never cursed. Called every player by their given name — Chief Bender was always 'Albert.' But Mack could be ruthless: he sold off the 1914 dynasty and the 1931 dynasty without sentiment when finances demanded it. The discipline was paternal, not military. Players obeyed because they respected him, not because they feared him. Rating of 6.",
    ego: "Near-maximum. Managed Ty Cobb in his twilight (1927-28), Lefty Grove at his most volatile, Jimmie Foxx in his prime, and a parade of Hall of Famers — all without major ego crises. Players universally addressed him as 'Mr. Mack.' Goose Goslin (who played for Griffith, not Mack) said Griffith was 'more than a father' — Mack was even more paternal. Bobby Shantz compared Mack to Casey Stengel: 'One never said anything and the other never shut up.' The silence commanded respect. Rating of 9.",
    har: "Elite. 'Humanity is the keystone that holds nations and men together. When that collapses, the whole structure crumbles. This is as true of baseball teams as any other pursuit in life.' Players loved Mack through 100-win seasons AND 100-loss seasons. The 1916 Athletics — one of the worst teams in history — still respected their manager. The harmony was unconditional. Rating of 9.",
    int: "Low. Mack sat in the dugout in a business suit and tie, waving a rolled-up scorecard. He never raised his voice. He never cursed. He was 'quiet, even-tempered, and gentlemanly.' The intensity was intellectual, not emotional — a chess grandmaster, not a general. Rating of 3.",
    str: "Elite. Built two of the greatest dynasties in baseball history, decades apart. 'No other manager in the history of the game ever handled more young players and brought more of them to stardom and to fortune' — NYT obituary. His eye for talent was legendary. He could spot a future star in a minor league game and know exactly where to put him. Rating of 9.",
    flx: "Extraordinary. Managed from 1894 (Pittsburgh) to 1950 (Philadelphia). That's 56 years of professional managing across every era of baseball. He adapted his approach from the rough-and-tumble 1890s to the scientific 1910s to the slugging 1920s to the wartime 1940s. The only thing he couldn't adapt to was his own aging. Rating of 8.",
  },

  personality: {
    leadership_style: "Paternal dignity. Mack led through respect, kindness, and quiet authority. He never wore a uniform — the business suit was a deliberate choice that placed him above the fray, more executive than combatant. He waved a scorecard to position fielders, never shouted instructions. Players called him 'Mr. Mack' the way children address a beloved grandfather. His authority was earned through decades of consistent decency, not imposed through fear.",
    temperament: "Serene and patient. 'Quiet, even-tempered, and gentlemanly.' Mack was the anti-McGraw — where McGraw raged, Mack counseled. Where McGraw controlled, Mack guided. Where McGraw burned out players, Mack nurtured them. He could endure 17 last-place finishes because his identity wasn't tied to winning — it was tied to being in the dugout. The patience was superhuman.",
    work_ethic: "Monastic devotion to baseball for 65 years. Started in a cotton mill at age 9. Played, managed, owned, built, demolished, rebuilt. 'My 66 Years in the Big Leagues' was his autobiography. He didn't have years outside baseball — baseball WAS his life. The work ethic wasn't frantic; it was oceanic — vast, steady, and endless.",
    lifestyle: "Irish Catholic immigrant family in Massachusetts. Cotton mill at 9. First wife died after their third child. Remarried. Raised 8 children across two marriages. The Athletics became a family business — sons Earle, Roy, and Connie Jr. all worked for the club. Grandson became a US Senator. The Mack family IS Philadelphia baseball. He lived modestly, supported extended family, found jobs for retired players. When the A's left Philadelphia, the 91-year-old Mack collapsed.",
    communication_style: "Quiet, dignified, personal. Called every player by their given name. Never raised his voice. Gave instructions through the wave of a scorecard. When he spoke, players listened — because he rarely spoke. Bobby Shantz: 'One never said anything and the other never shut up' (comparing Mack's silence to Stengel's chatter). The silence was the message: I trust you.",
    loyalty_expectations: "Deep and long-term — but not permanent. Mack kept players for years, nurtured their careers, found them jobs after retirement. Chief Bender stayed on the payroll as scout/coach for 24 years after retiring. Al Simmons coached for years. But when finances demanded, Mack sold dynasties without hesitation — twice. The loyalty was genuine until the ledger said otherwise.",
    dark_side: "The demolitions and the decline. Mack sold TWO dynasty-caliber rosters — the 1914-15 dismantling and the 1932-33 fire sale. Both times, championship teams were scattered for pennies. And he managed far too long: his teams were awful for the last 17 years, finishing in the first division just once. By the late 1940s, coaches ran the team while Mack sat in the dugout, increasingly confused. The man who built the greatest teams also presided over the worst, and he couldn't stop. In ILB: Mack carries 'The Long Goodbye' — his late-career decline is a slow erosion that players can't prevent.",
  },

  playbook: {
    roster_philosophy: "Build, win, sell, rebuild. Mack's unique position as manager AND owner meant he operated on financial logic that pure managers never face. He built the $100,000 Infield dynasty, sold it when the Federal League threatened finances, endured 7 years of losing, then built an even better dynasty in 1929-31 — and sold that one too when the Depression hit. The cycle of creation and destruction is Mack's signature. No other manager ever operated on this timeline.",
    conflict_response: "DISSOLVE THROUGH DIGNITY. Mack didn't suppress conflict — he made it feel inappropriate. Yelling at Mr. Mack would be like yelling at your grandfather. The suit, the scorecard, the given names — all created an atmosphere where conflict felt like bad manners. When conflict was unavoidable, Mack addressed it privately, quietly, and finally.",
    clique_strategy: "PREVENT THROUGH FAMILY. Mack's teams felt like families, not factions. The paternal atmosphere — 'Mr. Mack' as father figure — made cliques feel like rebellion against the family. When veterans and young players mixed (Cobb alongside Foxx in 1927), Mack's dignity held the generations together.",
    player_types_that_thrive: [
      "Young talent open to mentorship — 'No other manager brought more young players to stardom'",
      "Temperamental stars who need a calming presence — even Lefty Grove and Ty Cobb flourished",
      "Players who respond to respect and dignity rather than fear",
      "Veteran leaders who appreciate the family atmosphere",
      "Working-class players who need a father figure — Mack was that for generations",
    ],
    player_types_that_struggle: [
      "Players who need intense emotional motivation — Mack is quiet, not volcanic",
      "Players who expect long-term job security — Mack will sell you if finances demand",
      "Those who need cutting-edge facilities — Mack's thrift extended to the ballpark",
      "Players who mistake gentleness for weakness — Mack's quiet authority has steel underneath",
      "Impatient players during rebuild years — Mack's cycles require patience measured in decades",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 5,
      max_volatility: "MODERATE — Mack's calm absorbs volatility, but extreme cases (Grove's tantrums) test even his patience",
      discipline_floor: "MODERATE — Mack expects professionalism through example, not enforcement",
      star_exception: "Stars get patience and respect, but no special rules. Everyone is addressed by their given name. Everyone answers to Mr. Mack.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "STRONGLY INCREASED", desc: "+2 Team Fit for all players. Mack's paternal atmosphere creates genuine belonging. Even bad teams felt like family. Players stayed loyal through 100-loss seasons." },
    volatility: { effect: "STRONGLY REDUCED", desc: "-2 Volatility for all players. Mack's serene dignity calms everyone. Even Lefty Grove — who once tore up a clubhouse — was manageable under Mack." },
    discipline: { effect: "MODERATE", desc: "+1 Discipline. Mack leads by example, not enforcement. The suit, the scorecard, the formality — it all creates an atmosphere where poor behavior feels out of place." },
    ego: { effect: "STRONGLY MANAGED", desc: "Ego penalties reduced by 2 across the board. The 'Mr. Mack' effect — his dignity makes ego displays feel small. Even Ty Cobb called him 'Mr. Mack.'" },
    work_habits: { effect: "INCREASED", desc: "+1 Work Habits. Mack's 53-season dedication is the ultimate example. The cotton mill boy who became 'Mr. Baseball' through sheer devotion." },
    adaptability: { effect: "STRONGLY INCREASED", desc: "+2 Adaptability. Mack managed across more eras than anyone. His players learn to adapt because the system expects evolution." },
  },

  chemistry_traits: [
    { tag: "Mr. Mack", desc: "Universal respect. All players gain +1 morale upon joining. No player can refuse a role assignment from Mack. The suit commands obedience through dignity." },
    { tag: "The Scorecard", desc: "Mack positions fielders with his rolled-up scorecard from the dugout. +1 DEF for all fielders. Mack was tracking spray charts 80 years before analytics." },
    { tag: "The $100,000 Infield", desc: "If your infield has 4 players with OVR 7+, gain +2 DEF and +1 Team Fit. The Collins-Baker-Barry-McInnis combination was the greatest infield ever." },
    { tag: "Build and Sell", desc: "Mack's unique curse. After winning a championship, there's a 30% chance per series of a 'Fire Sale' event: lose your best player but gain +3 trade value elsewhere." },
    { tag: "The Long Goodbye", desc: "After 25 games, all of Mack's ratings decline by 1. After 35 games, by 2. The Grand Old Man stayed too long. The record shows it." },
    { tag: "White Elephant", desc: "McGraw mocked Mack's A's as 'a white elephant nobody wanted.' Mack adopted it as the team logo. When mocked or underestimated, +2 Intensity for 3 games." },
    { tag: "Albert, Not Chief", desc: "Mack called Chief Bender 'Albert.' He called everyone by their given name. Players with the 'Respected' or 'Veteran' trait gain +1 Team Fit under Mack." },
    { tag: "Humanity Is the Keystone", desc: "Mack's philosophy. If Team Fit is above 8 for all players, +1 to all stats. When the family holds together, everything works." },
  ],

  preferred_locations: [
    { location: "Dugout / Shibe Park", affinity: "HIGH", note: "50 years in the same dugout. In a suit and tie. With a scorecard. The most iconic image in baseball management." },
    { location: "Front Office / Owner's Box", affinity: "HIGH", note: "Manager, GM, and owner simultaneously. Total control — and total responsibility when it failed." },
    { location: "Spring Training", affinity: "HIGH", note: "Where Mack evaluated young talent. 'No other manager handled more young players.' The classroom for future stars." },
    { location: "Home / Philadelphia", affinity: "HIGH", note: "Mack WAS Philadelphia baseball for 50 years. The stadium bore his name. The city gave him the Bok Award." },
    { location: "Church / Community", affinity: "MEDIUM", note: "Irish Catholic. Supported large extended family. Found jobs for retired players. Generous with those in need." },
    { location: "Cotton Mill / Factory", affinity: "MEDIUM", note: "Working in the mill at age 9. The origins that built the work ethic and the empathy." },
    { location: "Hospital / Late Years", affinity: "LOW", note: "Too frail to handle correspondence by 1953. Collapsed when told the A's were leaving Philadelphia. The long goodbye." },
  ],

  momentum: {
    hot_triggers: [
      "Dynasty years — when all the pieces click, Mack's teams are unstoppable (1910-14, 1929-31)",
      "Young talent emerging — Mack loved watching his prospects become stars",
      "World Series stage — 5-3 in the Fall Classic, including the legendary 1929 comeback",
      "Respect from peers — when acknowledged, Mack elevated his game",
    ],
    cold_triggers: [
      "Financial pressure forcing sales — the forced demolition of great teams broke something each time",
      "Extended losing (17 years of cellar-dwelling) — the patience became a prison",
      "Late-career decline — coaches ran the team while Mack sat, increasingly confused",
      "Family conflict over the business — sons fighting over control of the Athletics",
    ],
    pressure_response: "MAGNIFICENT IN CHAMPIONSHIP MOMENTS, VULNERABLE IN DECLINE. 5 World Series titles, including the legendary 1929 Game 4 comeback (10-run inning to overcome 8-0 deficit). In his prime, Mack was ice-cold under pressure — the suit never wrinkled. But the long decline (1935-1950) showed a different kind of pressure failure: the inability to walk away. In ILB: Mack provides +2 Clutch in championship games during his peak phase. After 'The Long Goodbye' triggers, Clutch drops to -1. Two managers in one career.",
  },

  action_card_seeds: [
    {
      title: "The $100,000 Infield",
      type: "Game Action",
      text: "Your manager assembles the greatest infield in history. If all 4 infield positions are filled with players OVR 7+, they gain +2 DEF and +1 Contact for this game. The machine is running.",
      origin: "Collins, Baker, Barry, McInnis — the Athletics infield from 1910-14 was valued at $100,000 (equivalent to millions today). They anchored 4 pennants and 3 World Series titles.",
    },
    {
      title: "The Fire Sale",
      type: "Trade",
      text: "Financial reality forces your manager to dismantle a dynasty. Sell your 3 highest-OVR players and gain +5 trade value for each. Your remaining players lose -2 morale. But you gain 6 Free Agent draws for the rebuild. The cycle begins again.",
      origin: "Mack sold off his 1914 dynasty (Collins, Baker, Plank, Bender) and his 1931 dynasty (Grove, Cochrane, Simmons, Foxx) — the two greatest fire sales in baseball history. Both times, he rebuilt from scratch.",
    },
    {
      title: "The Scorecard Wave",
      type: "Game Action",
      text: "Your manager positions every fielder with a wave of his rolled-up scorecard. +2 DEF for all fielders this game. Mack was tracking batted ball data before computers existed.",
      origin: "Mack was far ahead of his time in tracking where batters hit the ball off particular pitches. From the dugout, he directed fielders into optimal positions with waves of his scorecard — the original analytics.",
    },
    {
      title: "The 10-Run Inning",
      type: "Game Action",
      text: "Your team is losing badly (down by 5+ runs). Play this card: your team scores in every remaining at-bat this game. All players gain +3 Clutch for the remainder. 'The greatest comeback in World Series history.'",
      origin: "Game 4 of the 1929 World Series: the Athletics trailed the Cubs 8-0. In the 7th inning, they scored 10 runs — the greatest inning in Series history — and won 10-8. Mack had told his players to 'just go up there and hit.'",
    },
    {
      title: "Humanity Is the Keystone",
      type: "Action",
      text: "Your manager addresses the team with quiet dignity. All players gain +1 morale and +1 Team Fit permanently. 'When humanity collapses, the whole structure crumbles. This is as true of baseball teams as any other pursuit in life.'",
      origin: "Mack's personal philosophy, applied to baseball. His teams were built on mutual respect, not fear. Players called him 'Mr. Mack' and meant it with reverence.",
    },
    {
      title: "The White Elephant",
      type: "Action",
      text: "A rival mocks your team as worthless. Your manager adopts the insult as your identity. +2 Intensity for the next 5 games. When they underestimate you, make them pay.",
      origin: "John McGraw called Mack's Athletics 'a white elephant nobody wanted.' Mack made the white elephant the team's official mascot and then beat McGraw in the 1911 and 1913 World Series.",
    },
    {
      title: "The Long Goodbye",
      type: "Drama",
      text: "Your manager has stayed too long. All ratings decline by 2 for the remainder of the game. But all players who have served under this manager for 10+ games gain +1 Loyalty permanently. They remember the good years.",
      origin: "Mack managed until age 87. His final 17 years produced one first-division finish. Coaches ran the team while Mack sat in the dugout, increasingly confused. 'Toward the end he was old and sick and saddened, a figure of forlorn dignity bewildered by the bickering around him.'",
    },
  ],

  art_direction: {
    face: "Tall, gaunt, patrician. 6'1\" but only 150 lbs — 'Slats' was his childhood nickname. Long, angular face with prominent ears and a thin, dignified expression. Clean-shaven. The face of a New England banker or a minister, not a baseball manager. In old age: deeply lined, gentle, fading — but still sitting upright in the dugout.",
    attire: "Business suit, white shirt, tie, and either a derby hat or a stiff collar. NEVER a uniform. He managed for 53 years and never once wore team colors. In one hand: a rolled-up scorecard, the instrument of his authority. The suit is the card's defining visual element — it separates Mack from every other manager in history.",
    mood: "Serene authority. Not fierce, not jovial — composed. The look of a man who has seen 53 seasons of baseball and can still be surprised by a perfect double play. There's warmth underneath the formality, sadness underneath the patience, and steel underneath the kindness. A patriarch at the end of a long, long tenure.",
    style: "Cool sepia with green undertones — the Players' Manager palette. Shibe Park's distinctive French Renaissance facade suggested in the background. The card should feel institutional — like a portrait hanging in a bank or a university. Border should be clean, classical, almost architectural. White elephant motif in the corner. The card should feel like it belongs in a museum — because Mack himself was a living museum.",
    reference: "Where Hanlon's Players' Manager card is warm and communal, Mack's is patriarchal and eternal. Mack is the grandfather of the game — the man who was there before everyone and stayed after everyone left. His card should feel ancient, dignified, and slightly heartbreaking. The suit in the dugout. The scorecard in the hand. The 53 seasons of joy and sorrow compressed into one portrait of the longest goodbye in sports history.",
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
  archGreen: "#55b877", archDark: "#2a6a3a",
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
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archGreen}15`, border: `1px solid ${C.archGreen}30`, color: C.archGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function ConnieMackCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archGreen;

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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #1a2a1a 0%, #2a3a2a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>🐘</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>PLAYERS' MANAGER</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 1 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.team} — {d.year}</div>
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
                { label: "WINS", val: d.record.career_wins.toLocaleString() },
                { label: "LOSSES", val: d.record.career_losses.toLocaleString() },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "GAMES", val: "7,755" },
                { label: "HOF PLYR", val: "11+" },
                { label: "DYNASTYS", val: "2" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS — ONE FRANCHISE</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 9 Pennants", "🏆 5 World Series", "⭐ HOF 1937", "🐘 White Elephant", "👔 Business Suit", "📜 3,731 Wins", "🎓 11+ HOFers", "⏳ 53 Seasons"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("MODERATE") ? `${C.gold}20` : `${C.traitGreen}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("MODERATE") ? C.medBrown : C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Mack's real life, become universal cards playable in any game.</p>
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
                <Section title="Mack's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  hof_players: d.record.hof_players_managed,
  career_wins: d.record.career_wins,
  career_losses: d.record.career_losses,
  seasons: d.record.seasons_managed,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
