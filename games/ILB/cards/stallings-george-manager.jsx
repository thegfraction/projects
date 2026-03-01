import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: GEORGE STALLINGS
// Era: 1910 · Archetype: Opportunist
// "The Miracle Man" — Platoons, Superstitions, One Perfect Season
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "George Stallings",
  nickname: "The Miracle Man",
  year: 1914,
  team: "Boston Braves",
  era: "1910s",
  ilb_team: "Gloves",
  archetype: "Opportunist",
  born: "November 17, 1867 — Augusta, GA",
  died: "May 13, 1929 — Haddock, GA (age 61)",
  hof: "Not inducted. Despite the Miracle, his 879-898 career record and one pennant weren't enough. The greatest one-hit wonder in managerial history.",
  height: '6\'0"',
  weight: "175 lbs",

  record: {
    career_wins: 879,
    career_losses: 898,
    win_pct: ".495",
    pennants: 1,
    world_series: 1,
    seasons_managed: 13,
    ejections: "Frequent — 'will crab and rave on the bench with any of them' (Johnny Evers)",
    peak_team: "1914 Boston Braves ('The Miracle Braves')",
    peak_record: "94-59 (.614), swept Philadelphia Athletics in World Series",
    teams_managed: ["Philadelphia Phillies (1897-98): poor", "Detroit Tigers (1901): 74-61", "New York Highlanders (1909-10): 153-138", "Boston Braves (1913-20): 579-597"],
    notable: "Invented modern platooning — rotating left/right-handed batters against opposite-handed pitchers. Managed the greatest single-season turnaround in baseball history: last place July 15, WS champions October 13. Managed in street clothes like Mack. VMI graduate, entered medical school before baseball. Owned a Georgia plantation. Died of heart disease caused, he claimed, by 'bases on balls.' Famous for extreme superstitions.",
    the_miracle: "July 15, 1914: Braves in last place, 11.5 games back. Won 52 of final 66 games. Finished 10.5 games ahead of second-place Giants. Swept Connie Mack's favored A's in World Series. No regular hit above .300. Team batted .251. Stallings platooned the outfield to maximize a mediocre roster.",
  },

  ilb_ratings: {
    tac: 4,  // High. Invented platooning — a genuinely revolutionary tactical innovation that changed the game. Studied batting statistics before anyone else. But only a 4 because the rest of his tactical record is unimpressive.
    pit: 4,  // High. Relied almost exclusively on a three-man rotation during the 1914 miracle run (Rudolph, James, Tyler). Knew how to ride hot pitchers. Managed workload instinctively.
    lin: 3,  // Moderate. The platoon system was about lineup flexibility, but Stallings's rosters outside 1914 were mediocre. He maximized bad lineups rather than building great ones.
    adp: 5,  // Maximum. The Miracle itself is the ultimate act of adaptation. Last place to World Series champions. His entire genius was exploiting whatever circumstances gave him.

    dis: 5,  // Moderate. "Pitiless and abusive in his criticism of players during games, though he often mingled affably with them afterward." Discipline through fear in the moment, relaxed between games.
    ego: 5,  // Moderate. Handled Evers (the most combustible player in baseball) during the Miracle run. But his managing tenure was too short and inconsistent to demonstrate sustained ego management.
    har: 5,  // Moderate. His ability to persuade players they were winners was his greatest skill — but the vicious in-game criticism undermined long-term harmony. Functional, not deep.
    int: 8,  // High. Nervous, superstitious, volcanic. Wore out his trousers sliding up and down the bench. Destroyed peanut shells with fury. Demanded yellow signs be painted over. The nervous energy was constant and contagious.
    str: 5,  // Moderate. Made brilliant acquisitions (Evers in 1914), but his long-term roster building was poor. The Braves declined steadily after 1914. One magical season of roster alchemy, not sustained genius.
    flx: 7,  // High. Platooning IS flexibility — changing your lineup every day based on the opposing pitcher. Stallings was the most flexible in-game manager of his era.

    ovr: 9,  // Elite tier. The Miracle earns it. But the 879-898 career record and lack of sustained success keep him from Legend. One perfect lightning strike.
  },

  rating_justification: {
    tac: "High. Stallings invented the modern platoon system — rotating left- and right-handed batters against opposite-handed pitchers. Bill James called it 'revolutionary.' This wasn't just a lineup trick; it was a fundamentally new way of thinking about roster construction. He also studied batting statistics before anyone else in the game. But his tactical record outside the Miracle is ordinary. Rating of 4.",
    pit: "High. During the 1914 miracle run, Stallings rode a three-man rotation of Dick Rudolph (26 wins), Bill James (26 wins), and Lefty Tyler. Rudolph and James combined to go 33-3 in the second half. Stallings knew which pitchers were hot and rode them relentlessly. But his pitching management in other seasons was unremarkable. Rating of 4.",
    lin: "Moderate. The platoon system was a lineup innovation, but it was born from necessity — Stallings's outfielders were below average. He maximized a bad hand rather than assembling a great one. Outside 1914, his lineups were mediocre. No outfielder even accumulated 400 at-bats. Rating of 3.",
    adp: "Maximum. The Miracle Braves are the single greatest act of adaptation in baseball history. Last place July 15. World Series champions October 13. Stallings adapted to everything: bad hitters (platoon them), no superstars (trust the system), overwhelming odds (believe harder). 'Give me a ball club of only mediocre ability, and if I can get the players in the right frame of mind, they'll beat the World Champions.' Rating of 5.",
    dis: "Moderate. Stallings was 'pitiless and abusive in his criticism of players during games' but 'often mingled affably with them afterward.' The discipline was situational — volcanic during games, relaxed between them. This worked for short bursts (the Miracle run) but couldn't sustain itself. After 1916, the Braves collapsed. Rating of 5.",
    ego: "Moderate. Stallings managed Johnny Evers — The Crab — during the Miracle season. That alone shows ego management skill. Evers was ejected 9 times that season, and Stallings channeled his fury rather than suppressing it. But Stallings's overall record with strong personalities is limited. Rating of 5.",
    har: "Moderate. 'His ability to persuade his players that they were winners was probably more important than his strategic decisions.' Stallings was a motivator — he made mediocre players believe they were champions. But the abusive in-game criticism created a volatile atmosphere. Harmony was conditional on winning. Rating of 5.",
    int: "High. Stallings was 'nervous on the bench,' famously sliding up and down until he wore out his trousers. His superstitions were all-consuming — yellow objects banished, peanut shells destroyed, rituals observed obsessively. The nervous energy was infectious. His players fed off his intensity. His heart couldn't survive it. Rating of 8.",
    str: "Moderate. The Evers acquisition in 1914 was a masterstroke — the leadership piece that ignited the Miracle. But Stallings never built another winning team. After 1916, the Braves finished sixth or seventh every year. One perfect roster construction, not a sustained talent pipeline. Rating of 5.",
    flx: "High. Platooning IS flexibility. Stallings changed his lineup every single day based on the opposing pitcher. No other manager in the 1910s operated with this much daily tactical flexibility. He also adapted his motivational approach — abusive during games, friendly after. The flexibility was his survival mechanism. Rating of 7.",
  },

  personality: {
    leadership_style: "Motivational pyrotechnics. Stallings led through sheer force of belief — he convinced mediocre players they were champions, and for one perfect season, he was right. His in-game style was abusive, volcanic, and relentless. His post-game style was gentlemanly and affable. The whiplash was deliberate: players feared his criticism during games and craved his approval afterward. It's manipulation — and it worked brilliantly, once.",
    temperament: "Nervous, volcanic, and deeply superstitious. 'Distinguished and salty-tongued.' 'Gentleman George' in the hotel lobby; a screaming fury in the dugout. He wore out his trousers sliding nervously on the bench. He demanded yellow signs be painted over. He destroyed peanut shells. He was VMI-trained and plantation-raised — the manners of a Southern gentleman wrapped around the nerves of a man being consumed by the game.",
    work_ethic: "Obsessive in-season, gentleman-farmer in the offseason. Stallings ran The Meadows plantation in Haddock, Georgia — peaches and cattle — during the winters. Baseball was his wartime campaign; the plantation was his peacetime estate. The contrast defines him: sophisticated between seasons, primal during them.",
    lifestyle: "Southern planter aristocracy. VMI graduate. Entered medical school before choosing baseball. Owned The Meadows plantation for 30+ years, raised peaches and cattle. First marriage ended in divorce; remarried the widow of a ballplayer. Three sons across two marriages. Managed in street clothes — suits and ties — like a plantation owner visiting the dugout. The most aristocratic manager in baseball.",
    communication_style: "Dual-mode. During games: 'pitiless and abusive.' Johnny Evers said he would 'crab and rave on the bench with any of them.' Between games: charming, affable, distinguished. The players experienced two George Stallingses. The one in the dugout was terrifying. The one at dinner was delightful. Both were real.",
    loyalty_expectations: "Performance-based, not personal. Stallings chucked veteran players he felt had 'stuck around too long' before 1914 and injected youth. He was loyal to results, not to individuals. If you produced, you played. If you didn't, you were platooned or released. The meritocracy was ruthless and effective.",
    dark_side: "The one-season wonder problem. The Miracle was lightning in a bottle — and lightning doesn't strike twice. After 1914, the Braves declined every year. Stallings couldn't sustain the motivational intensity or the tactical innovation. His career record is sub-.500 (879-898). He was fired/quit repeatedly. His heart literally failed from the stress. His dying words about baseball — 'Bases on balls, you son of a bitch, bases on balls' — reveal a man whose body was destroyed by the game's imperfections. In ILB: Stallings carries 'Lightning in a Bottle' — his peak is the highest of any Opportunist, but it's unsustainable.",
  },

  playbook: {
    roster_philosophy: "Maximize mediocrity through systems. Stallings's genius wasn't assembling great players — it was extracting maximum value from ordinary ones. The platoon system turned below-average outfielders into above-average production. The motivational approach turned last-place losers into World Series champions. He built with spare parts and duct tape — and for one season, it was stronger than Connie Mack's dynasty.",
    conflict_response: "WEAPONIZE. Stallings used conflict as fuel. His in-game abuse was designed to provoke — to make players angry enough to prove him wrong. Evers's ejections were features, not bugs. The anger became energy. The energy became wins. It only works when the wins are coming.",
    clique_strategy: "DISSOLVE THROUGH ROTATION. The platoon system meant players couldn't form stable cliques — the lineup changed every day. Nobody had a guaranteed spot. Everyone was replaceable. This prevented entrenchment but also prevented the deep bonds that sustain teams through losing streaks.",
    player_types_that_thrive: [
      "Scrappy, mediocre players who respond to being told they're better than they think — the Miracle Braves archetype",
      "Players who are motivated by in-game criticism and abuse — thick-skinned competitors",
      "Platoon-compatible players who accept part-time roles — the system is bigger than any individual",
      "Castoffs and rejects from other teams — Stallings specialized in reclamation projects",
      "Players with high mental toughness and something to prove — 'they'll beat the World Champions'",
    ],
    player_types_that_struggle: [
      "Stars who expect everyday roles — the platoon system benches everyone",
      "Sensitive players who can't handle public criticism — Stallings is 'pitiless and abusive' during games",
      "Players who need stability and routine — the lineup changes daily",
      "Veterans who feel entitled — Stallings 'chucked away veteran players he felt had stuck around too long'",
      "Players who need sustained motivation — Stallings's intensity is a sprint, not a marathon",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 3,
      max_volatility: "HIGH — Stallings creates and thrives in volatility. The dugout is a war zone during games.",
      discipline_floor: "MODERATE — situational discipline. Volcanic during games, relaxed between them.",
      star_exception: "No stars needed. Stallings prefers a roster of useful parts over individual brilliance. The system is the star.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "VOLATILE", desc: "+3 Team Fit when winning (belief is contagious). -2 Team Fit when losing (the abuse stops working). The Miracle only happens when the wins are coming." },
    volatility: { effect: "INCREASED", desc: "+2 Volatility for all players. Stallings's nervous energy, in-game abuse, and daily lineup changes keep everyone on edge. Comfort is the enemy." },
    discipline: { effect: "SITUATIONAL", desc: "+2 Discipline during games (fear of Stallings's wrath). -1 Discipline between games (the affable Gentleman George). Two managers in one." },
    ego: { effect: "SUPPRESSED", desc: "-1 Ego for all players. The platoon system makes everyone replaceable. No one is bigger than the system. The roster is a machine, not a collection of stars." },
    work_habits: { effect: "INCREASED", desc: "+1 Work Habits. Stallings's obsessive preparation — studying batting statistics, planning daily platoons — infects the team." },
    adaptability: { effect: "STRONGLY INCREASED", desc: "+2 Adaptability. The platoon system forces every player to adapt to changing roles. Nobody has a guaranteed spot. Everyone adjusts or sits." },
  },

  chemistry_traits: [
    { tag: "The Miracle", desc: "If your team is in last place after 10 games, all players gain +3 to their lowest stat for 10 games. If you climb out of last place during this window, the bonus becomes permanent. The impossible is Stallings's specialty." },
    { tag: "The Platoon System", desc: "Revolutionary. Stallings can start different players at 3 positions each game based on the opposing pitcher's handedness. Left-handed batters vs right-handed pitchers gain +2 Contact. The first modern platoon." },
    { tag: "Gentleman George", desc: "Between games, Stallings is charming and affable. After any victory, all players gain +1 morale. After any loss, all players lose -1 morale (the dugout abuse lingers). The whiplash is the system." },
    { tag: "Bases on Balls", desc: "'Bases on balls, you son of a bitch, bases on balls.' When opposing batters walk, Stallings loses -1 composure per walk. After 4 walks in one game, Stallings becomes 'Unhinged' (+2 Intensity, -2 Tactics for remainder)." },
    { tag: "Yellow Banished", desc: "Stallings demanded yellow signs and clothing be painted over or removed. If any 'bad omen' event occurs (error on first play, walk to leadoff batter), -1 to all stats for that inning. Superstition is real to Stallings." },
    { tag: "Trouser Destroyer", desc: "Stallings slid up and down the bench so nervously he wore out his trousers. +1 Intensity for all players while Stallings is in the dugout. The nervous energy is contagious. When ejected: -2 Intensity (the engine stops)." },
    { tag: "Castoff Collector", desc: "Players acquired via trade or waiver gain +1 to their lowest stat under Stallings. He built the Miracle Braves from castoffs, rejects, and players other teams didn't want." },
    { tag: "Lightning in a Bottle", desc: "Stallings's magic is unsustainable. After a championship, all Stallings bonuses are reduced by 1 each subsequent series. The Miracle only happens once. After 1914, the Braves declined every year." },
  ],

  preferred_locations: [
    { location: "Dugout / Bench", affinity: "HIGH", note: "Where Stallings slid nervously, wore out trousers, screamed at players, and orchestrated the Miracle. His war room." },
    { location: "The Meadows Plantation / Haddock, GA", affinity: "HIGH", note: "His offseason estate. Peaches and cattle. 30+ years. The gentleman farmer between campaigns." },
    { location: "Spring Training", affinity: "HIGH", note: "Where Stallings evaluated his castoffs and planned his platoons. The Braves sometimes trained at The Meadows." },
    { location: "VMI / Medical School", affinity: "MEDIUM", note: "Virginia Military Institute graduate. Entered medical school before choosing baseball. The disciplined aristocrat's origins." },
    { location: "Montreal / Minor Leagues", affinity: "MEDIUM", note: "Brought professional baseball back to Montreal. Built Delorimier Stadium. 34 years of managing including 21 in the minors." },
    { location: "Hospital / Macon", affinity: "LOW", note: "Died of heart disease at 61. Spent much of 1928 hospitalized. 'Bases on balls, you son of a bitch, bases on balls.'" },
  ],

  momentum: {
    hot_triggers: [
      "Underdog status — the Miracle Braves were dead last when Stallings's magic began",
      "Second-half surges — Stallings's teams played their best baseball in August and September",
      "Platoon matchups working — when the system clicks, mediocre players become dangerous",
      "World Series stage — swept Mack's A's in 4 games, the ultimate opportunist triumph",
    ],
    cold_triggers: [
      "Extended losing — the motivational approach only works when wins provide positive reinforcement",
      "Superstitious bad omens — yellow objects, peanut shells, leadoff walks spiral his composure",
      "Post-championship decline — lightning doesn't strike twice. After 1914, every season was worse",
      "Bases on balls — walks literally killed him. His heart couldn't take the imperfection",
    ],
    pressure_response: "SUPREME IN ONE MOMENT, UNSUSTAINABLE OVER TIME. The 1914 World Series sweep — of Connie Mack's dynasty Athletics — is the ultimate pressure performance. Stallings convinced mediocre players they could beat the best team in baseball, and they did. In four straight. But the pressure response is a spike, not a plateau. Career record: 879-898. In ILB: Stallings provides +3 Clutch in his first championship appearance. -1 Clutch in every subsequent one. The Miracle only happens once.",
  },

  action_card_seeds: [
    {
      title: "The Miracle",
      type: "Game Action",
      text: "Your team is in last place. Your manager refuses to surrender. All players gain +3 to their lowest stat for the next 10 games. If you climb out of last place: bonuses become permanent. 'Give me a ball club of only mediocre ability, and they'll beat the World Champions.'",
      origin: "July 15, 1914: Braves in last place, 11.5 games back. Won 52 of their final 66 games. Swept the A's in the World Series. The most improbable championship in baseball history.",
    },
    {
      title: "The Platoon System",
      type: "Action",
      text: "Your manager invents a new way to use rosters. Choose 3 positions — you may start different players at those positions each game based on matchup. Left-handed batters vs right-handed pitchers gain +2 Contact. A revolution in roster management.",
      origin: "Stallings was the first manager to systematically platoon — rotating left- and right-handed batters against opposite-handed pitchers. Bill James called it 'revolutionary.' It changed baseball forever.",
    },
    {
      title: "The Castoff Collection",
      type: "Trade",
      text: "Your manager specializes in other teams' rejects. Draw 3 Free Agents — they each gain +1 to their lowest stat. 'He chucked away veterans he felt had stuck around too long and injected youth.'",
      origin: "The 1914 Braves were built from castoffs. Evers was dumped by the Cubs. Rudolph and James were nobodies before 1914. Stallings saw value where other teams saw waste.",
    },
    {
      title: "Bases on Balls, You Son of a Bitch",
      type: "Drama",
      text: "Your manager's health fails from the accumulated stress of imperfection. Remove the manager for the remainder of the game. All players gain +1 Intensity (they saw his heart breaking). 'Bases on balls, you son of a bitch, bases on balls.'",
      origin: "When a doctor asked Stallings why his heart was failing, he reportedly answered: 'Bases on balls, you son of a bitch, bases on balls.' He died of heart disease at 61. The walks killed him.",
    },
    {
      title: "Paint Over the Yellow",
      type: "Game Action",
      text: "Your manager's superstitions take over. Remove one 'bad omen' from the game (opponent's lucky streak, adverse weather, umpire bias). But if a NEW bad omen appears, your manager becomes 'Unhinged' (-2 Tactics, +2 Intensity) for 3 innings.",
      origin: "Stallings demanded yellow signs and clothing be painted over or removed before his team would play. He destroyed peanut shells obsessively. His superstitions were all-consuming and sometimes effective — his players believed in the rituals.",
    },
    {
      title: "The Sweep",
      type: "Game Action",
      text: "Your team faces a heavily favored opponent. Your manager's belief is absolute. All players gain +2 to every stat for this game. If you win: +3 morale permanently. 'The first club to sweep the World Series.'",
      origin: "The 1914 Braves swept Connie Mack's Philadelphia Athletics — a dynasty that had won 4 pennants in 5 years. Nobody gave the Braves a chance. Stallings gave them belief.",
    },
  ],

  art_direction: {
    face: "Distinguished, intense, Southern. 6'0\" 175 lbs — a proper Virginia Military Institute gentleman. Sharp features, neatly groomed, the face of a man who owns a plantation and knows which fork to use at dinner. But the eyes are wild with nervous energy. The jaw is clenched. The veins in the neck are visible. Gentleman George is about to explode.",
    attire: "Street clothes — suit, tie, collar — like Mack, but more rumpled. The trousers show wear marks from sliding on the bench. The suit says aristocrat; the wear says maniac. He should be half-standing from the bench, leaning forward, one hand gripping the dugout rail. The posture of a man who can't sit still.",
    mood: "Nervous brilliance. Not calm authority (Mack) or cold control (McGraw) — Stallings is vibrating with barely contained energy. The look of a man who is simultaneously a Southern gentleman and a dugout berserker. There's superstition in his eyes — he's checking for yellow. There's genius in his hands — he's planning the platoon. The card should make you nervous just looking at it.",
    style: "Warm sepia with purple undertones — the Opportunist palette. Braves Field suggested in the background (or South End Grounds). The card should feel unstable — like the Miracle itself, it could collapse at any moment. Border should be slightly irregular, as if the card is sliding off the bench. Peach blossoms (from The Meadows) in one corner. A crossed-out yellow sign in the other.",
    reference: "Where Griffith's Opportunist card is a survivor and connector (70 years, maximum adaptability), Stallings is a single lightning bolt. Griffith adapted endlessly; Stallings adapted perfectly, once. The card should feel like a lightning strike captured in amber — brilliant, electric, and impossible to repeat. The Miracle Man's card is the most dramatic in the 1910 Era because his story is the most dramatic: last place to World Series champions in three months.",
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

export default function GeorgeStallingsCard() {
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
                <div style={{ fontSize: 80, opacity: 0.15 }}>⚡</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>OPPORTUNIST</div>
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
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={archColor} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "MIRACLE", val: "52-14" },
                { label: "SWEEP", val: "4-0" },
                { label: "NO HOF", val: "✗" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚡ Miracle Braves", "🏆 1914 WS Sweep", "🔄 Invented Platooning", "👔 Street Clothes", "🍑 Plantation Owner", "🟡 Yellow Banished", "🥜 Peanut Shells", "💔 Bases on Balls"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("VOLATILE") || effect.includes("INCREASED") ? `${C.gold}20` : effect.includes("SUPPRESSED") ? `${C.coldBlue}20` : `${C.sepia}20`, color: effect.includes("STRONGLY") ? C.traitGreen : effect.includes("VOLATILE") || effect.includes("INCREASED") ? C.medBrown : effect.includes("SUPPRESSED") ? C.coldBlue : C.sepia, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Stallings's real life, become universal cards playable in any game.</p>
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
                <Section title="Stallings's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  miracle_record: "52-14 second half",
  not_in_hof: true,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
