import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: FRANK SELEE
// Era: 1900 · Archetype: Tactical Purist
// "The Architect" — Never Played, Built Two Dynasties
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Frank Selee",
  nickname: "The Architect",
  year: 1898,
  team: "Boston Beaneaters",
  era: "1900s",
  ilb_team: "Banners",
  archetype: "Tactical Purist",
  born: "October 26, 1859 — Amherst, NH",
  died: "July 5, 1909 — Denver, CO (age 49)",
  hof: "Inducted 1999 (Veterans Committee). Waited 90 years. 12 of his players are in the Hall of Fame.",
  height: '5\'7"',
  weight: "150 lbs",

  record: {
    career_wins: 1284,
    career_losses: 862,
    win_pct: ".598",
    pennants: 5,
    world_series: 0,
    seasons_managed: 16,
    ejections: "Virtually none — gentlemanly deportment",
    peak_team: "1892 & 1898 Boston Beaneaters",
    peak_record: "102-48 (1892), 102-47 (1898)",
    consecutive_pennants: "3 (1891-1893), then 2 (1897-1898)",
    notable: "First teams to win 100 games (1892 & 1898). Never played an inning of MLB. Built Tinker-to-Evers-to-Chance. 12 HOF players managed. .598 career win% — 4th highest in history.",
    hof_players_managed: ["Kid Nichols", "Hugh Duffy", "Tommy McCarthy", "Jimmy Collins", "Billy Hamilton", "Joe Kelley", "Frank Chance", "Joe Tinker", "Johnny Evers", "Mordecai Brown", "Fred Clarke", "King Kelly"],
    positional_conversions: ["Jimmy Collins: OF → 3B (HOF)", "Fred Tenney: C → 1B (elite)", "Frank Chance: C → 1B (HOF)", "Joe Tinker: 3B → SS (HOF)"],
  },

  ilb_ratings: {
    tac: 5,  // Master tactician. Hit behind runners, bunts, double steals. Positional innovation. Built the blueprint.
    pit: 4,  // Signed Kid Nichols (361 career wins). Traded for Three Finger Brown. Understood pitching talent deeply.
    lin: 5,  // Invented positional conversion as strategy. Built Tinker-to-Evers-to-Chance. First 100-win teams.
    adp: 4,  // Built two dynasties from scratch in different cities/decades. But tuberculosis cut him short before he could adapt to the live-ball era.

    dis: 7,  // Gentlemanly but firm. "Will not countenance anything that savors of rowdyism." His teams were civilized in an era of brawlers.
    ego: 7,  // Managed 12 future HOFers without ego explosions. Handled King Kelly, Hugh Duffy, and the volatile Evers-Tinker feud.
    har: 8,  // "His teams earned reputations for sportsmanship during an era known for dirty play." Built harmony through respect, not fear.
    int: 4,  // Quiet, mild-mannered. "A balding little man with a modest demeanor." His intensity was intellectual, not emotional.
    str: 10, // Maximum. The greatest roster architect of his era. Could "tell a ballplayer in his street clothes." 12 HOFers. Built TWO dynasties.
    flx: 7,  // Successfully rebuilt from Boston's 1890s dynasty to Chicago's 1900s dynasty. Different players, different city, same results.

    ovr: 11, // Legend tier. .598 career win% (4th all-time). 5 pennants. Architect of 9 pennants total (5 Boston + 4 Cubs he built).
  },

  rating_justification: {
    tac: "Master of 'scientific baseball.' His Beaneaters 'surpassed brawnier opponents by hitting behind runners, employing the bunt and utilizing the double steal.' Pioneered positional conversion as a tactical weapon — moved catchers to first base, outfielders to third, third basemen to short. Every move was calculated. Rating of 5.",
    pit: "Signed Kid Nichols to his first MLB contract — Nichols won 361 career games. Traded two players for Mordecai 'Three Finger' Brown, who became one of the greatest pitchers ever. His 1892 staff had four pitchers with 20+ wins. He understood pitching talent before anyone else saw it. Rating of 4.",
    lin: "His positional conversions were revolutionary: Jimmy Collins from outfield to third base (HOF), Fred Tenney from catcher to first base (perfected the 3-6-3 double play), Frank Chance from catcher to first base (HOF), Joe Tinker from third to short (HOF). He didn't just build lineups — he redesigned players. First teams to win 100 games. Rating of 5.",
    adp: "Built two dynasties in two different cities across two different decades. Left Boston's aging roster and constructed the Cubs from scratch — only 8 of 25 players survived his first roster purge. Adapted his system to new talent pools. But tuberculosis cut him short at 49 — we'll never know if he could've adapted to the live-ball era. Rating of 4.",
    dis: "Quiet firmness. 'The Bostons have always been noted for their gentlemanly deportment, due in great measure to the example set by Selee, who will not countenance anything that savors of rowdyism or dirty ball.' His teams were disciplined by choice, not fear. Rating of 7.",
    ego: "Managed TWELVE future Hall of Famers across two franchises without a single legendary ego blowup. Handled the volatile King Kelly's return, managed the Evers-Tinker feud (those two famously hated each other but played brilliantly together under Selee). His mild demeanor disarmed egos. Rating of 7.",
    har: "Elite harmony builder. His teams were the anti-Orioles and anti-Spiders — winning through teamwork and sportsmanship, not brawling. 'One of baseball's notable nice guys, who honed his craft to succeed in a ruthlessly competitive business.' The sportsmanship was genuine, not weakness. Rating of 8.",
    int: "Low emotional intensity. 'A small, mild-mannered, prematurely bald man with a prominent mustache who looked more like an insurance underwriter than a baseball manager.' His intensity was cerebral — studying matchups, identifying talent, redesigning positions. The opposite of Tebeau. Rating of 4.",
    str: "Maximum. The greatest roster architect of the 19th century. 'He could tell a ballplayer in his street clothes.' 'A flair for bending players acquired from here, there and everywhere.' Built the 1890s Beaneaters AND the 1900s Cubs dynasty. 12 HOF players. 4 revolutionary position conversions. No manager has ever built more with less raw material. Rating of 10.",
    flx: "Rebuilt twice. Took over a Boston team gutted by the Players' League and won a pennant in his second year. Took over a 53-86 Cubs team and had them at 82-56 in one year. In both cases, he kept almost nothing from the previous roster. But he never saw the live-ball era — tuberculosis killed him at 49. Rating of 7.",
  },

  personality: {
    leadership_style: "Architect-general. Selee never played an inning of professional baseball — he was a watch factory worker who organized an amateur team and discovered he could see baseball better than he could play it. His leadership was entirely intellectual: identifying talent, redesigning positions, building systems. He didn't lead by example on the field — he led by vision from the bench. The ultimate front-office mind managing on the field.",
    temperament: "Calm, modest, analytical. SABR described him as 'a small, mild-mannered, prematurely bald man with a prominent mustache.' He looked like an insurance underwriter next to his strapping athletes. But his quiet confidence masked an iron will — he released 17 of 25 Cubs players in his first year. The gentleness was real; the ruthlessness was hidden.",
    work_ethic: "Methodical and tireless. Quit his job at the Waltham Watch Company to raise $1,000 and build a baseball team from nothing. Managed in the minors for six years before getting his MLB chance. 'I was without any practical experience as a manager or player,' he later wrote — but he outworked everyone who had both.",
    lifestyle: "Son of a Methodist-Episcopal clergyman. Raised in Melrose, Massachusetts. Married, lived year-round in Melrose even while managing in Boston. After tuberculosis forced his retirement, moved to Denver hoping mountain air would heal him. It didn't. He died there at 49, watching from a hospital bed as the Cubs dynasty he built won without him.",
    communication_style: "Quiet persuasion. 'Able to impress his advice upon the men under his control' — but through logic and respect, not shouting. He convinced Jimmy Collins to play third base, Fred Tenney to move from catcher to first, and Frank Chance to do the same. These were massive career changes accomplished through trust.",
    loyalty_expectations: "Professional respect. Selee didn't demand personal loyalty — he expected professional excellence. Players who performed stayed; those who didn't were released without drama. He was 'an adept handler of players' who earned loyalty through competence, not charisma.",
    dark_side: "The tragedy. Tuberculosis consumed him during his prime. He had to give the Cubs — the team he built from scratch — to Frank Chance and watch from a hospital bed as they won 4 pennants and 2 World Series with HIS players. He died at 49 in Denver, far from home, and waited 90 years for the Hall of Fame. In ILB: Selee carries 'The Unfinished Dynasty' — his teams peak after he's gone. +2 to all ratings for his SUCCESSOR manager.",
  },

  playbook: {
    roster_philosophy: "See what others can't see, then build what others can't imagine. Selee's genius was positional vision — he could tell a catcher should be a first baseman, an outfielder should be a third baseman. He didn't just find talent; he reimagined it. His roster moves were surgical: release 17 of 25, keep the hidden gems, add new pieces that fit the redesigned machine. He built teams like a watchmaker builds watches — precision over power.",
    conflict_response: "PREVENT. Selee's civilized atmosphere made conflicts rare. When they arose (Evers and Tinker famously hated each other), he managed around them — letting them despise each other off the field while playing brilliantly together on it. He didn't resolve conflict; he made it irrelevant to performance.",
    clique_strategy: "TOLERATE FACTIONS. Selee didn't need everyone to be friends — he needed everyone to execute. His teams had internal tensions (Evers-Tinker) but functioned perfectly because the system was bigger than any personality. Cliques existed but couldn't damage the machine.",
    player_types_that_thrive: [
      "Versatile players open to positional conversion — Selee sees potential others miss",
      "Young, unproven talent willing to be molded — 'a flair for bending players'",
      "High-IQ players who understand tactical systems and execute precisely",
      "Professional, sportsmanlike players who don't need chaos to perform",
      "Undervalued players from minor leagues or other teams' scrap heaps",
    ],
    player_types_that_struggle: [
      "Rowdy, undisciplined players — Selee 'will not countenance rowdyism'",
      "Set-in-their-ways veterans who resist positional or role changes",
      "Players who need emotional fire from their manager — Selee is cerebral, not volcanic",
      "Raw power players with no versatility — they don't fit the 'scientific baseball' system",
      "Players who need the spotlight — Selee's system is about the machine, not individuals",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 4,
      max_volatility: "LOW — Selee's teams are built on calm execution. High-volatility players disrupt the machine.",
      discipline_floor: "HIGH — professional conduct is non-negotiable. Selee releases the undisciplined.",
      star_exception: "No exceptions. Even King Kelly had to conform. The system is sacred.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "HIGH", desc: "Selee builds cohesive machines. Players fit together because they were selected and positioned to fit. +2 Team Fit when roster has 3+ players who have been repositioned or converted." },
    volatility: { effect: "STRONGLY REDUCED", desc: "Selee's calm, professional atmosphere suppresses volatility. -2 Volatility for all players. But this also reduces positive variance — no dramatic heroics, just consistent execution." },
    discipline: { effect: "STRONGLY INCREASED", desc: "+2 Discipline for all players. Selee's sportsmanship is contagious. His teams were 'noted for their gentlemanly deportment' in an era of brawlers." },
    ego: { effect: "MODERATE TOLERANCE", desc: "Selee managed 12 HOFers without ego crises. He handled egos by making the system more important than any individual. High-ego players perform well but don't get special treatment." },
    work_habits: { effect: "INCREASED", desc: "Selee's watch-factory precision transfers to his teams. +1 Work Habits for all players. The team operates like a well-oiled machine." },
    adaptability: { effect: "HIGH", desc: "Selee reimagines players. Any player under Selee can be converted to a new position with reduced penalty. The Architect sees potential others miss." },
  },

  chemistry_traits: [
    { tag: "The Architect", desc: "Selee built TWO dynasties. His Strategy rating applies double when constructing rosters — trades and signings under Selee yield +1 value." },
    { tag: "Positional Visionary", desc: "Selee can convert any player to a new position with only -1 penalty (instead of the normal -2). 'He could tell a ballplayer in his street clothes.'" },
    { tag: "The Watch Factory", desc: "Selee's teams run like precision machinery. When all starting positions are filled with players who've played 5+ games together, +1 DEF for the entire team." },
    { tag: "Gentleman's Game", desc: "Selee's sportsmanship reduces opponent hostility. Opposing teams' 'Intimidation' and 'Crowd Fury' effects are nullified against Selee's teams." },
    { tag: "The Unfinished Dynasty", desc: "Selee died before seeing his Cubs win. His successor inherits +2 to all clubhouse ratings for 5 games. The teacher's blueprint outlasts the teacher." },
    { tag: "12 Hall of Famers", desc: "Selee developed more HOFers than any manager of his era. Players who spend 10+ games under Selee have a 15% chance of gaining the 'Star Potential' trait." },
    { tag: "Never Played a Game", desc: "Selee had no playing career. He earns no 'credibility bonus' from former players — but his analytical mind compensates. +1 Tactics, -1 Intensity." },
    { tag: "Mountain Air", desc: "Tuberculosis forced Selee to Denver. After 20 games, there's a 10% chance per series of a 'Health Decline' event that reduces all ratings by 1 for that series." },
  ],

  preferred_locations: [
    { location: "Front Office / War Room", affinity: "HIGH", note: "Selee's natural habitat. Roster construction, scouting reports, positional analysis. The mind at work." },
    { location: "Practice Field", affinity: "HIGH", note: "Where Selee taught positional conversions and drilled fundamentals. The watch factory floor." },
    { location: "Home / Melrose, MA", affinity: "HIGH", note: "Lived year-round in Melrose even while managing. Family man, community member, son of a clergyman." },
    { location: "Minor League Ballpark", affinity: "HIGH", note: "Selee scouted minor leagues obsessively. Found Kid Nichols, spotted talent in street clothes." },
    { location: "Church / Community", affinity: "MEDIUM", note: "Son of a Methodist-Episcopal clergyman. Modest, upstanding. The anti-McGraw lifestyle." },
    { location: "Denver / Mountain Sanatorium", affinity: "LOW", note: "Where he went to die. Watched his Cubs win from a hospital bed. The saddest location in ILB." },
    { location: "Bar / Saloon", affinity: "LOW", note: "Not Selee's world. He was the watch factory, not the barroom." },
  ],

  momentum: {
    hot_triggers: [
      "New roster taking shape — Selee thrived when building from scratch",
      "Young talent breaking through — his positional conversions paying off",
      "Multi-year roster continuity — the machine running at full speed",
      "Pennant race efficiency — his 1892 and 1898 teams ran away with the league",
    ],
    cold_triggers: [
      "Health decline — tuberculosis progressively weakened him from 1903 onward",
      "Roster gutted by circumstances — he struggled when he couldn't rebuild on his terms",
      "Rowdy opponents exploiting his gentlemanly teams — the Orioles and Spiders bullied Boston",
      "Late-career — his final seasons showed diminishing returns as the disease took hold",
    ],
    pressure_response: "CONSISTENT BUT NOT CLUTCH. Selee won 5 pennants — a dominant regular-season manager. But his postseason record was mixed: lost the 1892 World's Championship Series to Cleveland, and never won a World Series (the Cubs won theirs after he left). In ILB: Selee provides +1 consistency bonus in all series, but no clutch bonus in elimination games. His teams don't choke — they just don't have that extra gear. The machine runs perfectly; it doesn't have overdrive.",
  },

  action_card_seeds: [
    {
      title: "The Positional Conversion",
      type: "Action",
      text: "Your manager sees something no one else sees. Move any player to a new position with only -1 penalty (instead of -2). If the player stays at the new position for 5+ games, the penalty is removed entirely. 'He could tell a ballplayer in his street clothes.'",
      origin: "Selee converted Jimmy Collins from outfielder to Hall of Fame third baseman, Fred Tenney from catcher to elite first baseman, Frank Chance from catcher to Hall of Fame first baseman, and Joe Tinker from third baseman to Hall of Fame shortstop.",
    },
    {
      title: "Tinker to Evers to Chance",
      type: "Game Action",
      text: "Your infield executes a perfect double play combination. +2 DEF for the entire infield this game. If your team turns 2+ double plays, gain +1 Team Fit permanently. The machine is running.",
      origin: "Selee assembled the most famous infield in baseball history: Joe Tinker at short, Johnny Evers at second, Frank Chance at first. He acquired them all and positioned them all. The combination won 4 pennants and 2 World Series — after Selee was gone.",
    },
    {
      title: "The $1,000 Team",
      type: "Trade",
      text: "Your manager builds a team from nothing. Release up to 4 players and draw 3 Free Agent Cards. One of those Free Agents gains +1 to their lowest stat as the manager immediately identifies their hidden potential.",
      origin: "Selee quit his job at the Waltham Watch Company and raised $1,000 to build a baseball team from scratch. 'I was without any practical experience as a manager or player.' He went on to build two dynasties.",
    },
    {
      title: "The Gentleman's Advantage",
      type: "Game Action",
      text: "While opposing teams brawl and get ejected, your team plays clean, focused baseball. If any opponent is ejected this game, your team gains +1 to all stats for the remainder of the game. Discipline is its own reward.",
      origin: "'Selee encouraged his players to play a more civilized style. His teams surpassed brawnier opponents by hitting behind runners, employing the bunt and utilizing the double steal.' — HOF biography.",
    },
    {
      title: "The Hospital Bed",
      type: "Drama",
      text: "Your manager's health fails. He must step down and watch from afar. His successor inherits his roster AND gains +2 to all clubhouse ratings for 5 games as the players rally around the blueprint. The architect's work outlives the architect.",
      origin: "Tuberculosis forced Selee to retire in 1905. He turned the Cubs over to Frank Chance and watched from Denver as they won 4 pennants and 2 World Series with the team he built. He died in 1909 at age 49.",
    },
    {
      title: "90 Years of Forgetting",
      type: "Drama",
      text: "Your manager is overlooked for recognition despite extraordinary achievements. No immediate effect — but after the game, a hidden legacy bonus activates: any player who spent 10+ games under this manager gains a permanent +1 to their lowest stat. The quiet ones leave the deepest marks.",
      origin: "Selee waited 90 years for the Hall of Fame — inducted in 1999, 90 years after his death. 'One of baseball's notable nice guys, who honed his craft to succeed in a ruthlessly competitive business.'",
    },
  ],

  art_direction: {
    face: "Small, mild, prematurely bald with a prominent handlebar mustache. 5'7\" 150 lbs — undersized even for his era. Intelligent, watchful eyes behind wire-rimmed spectacles (if he wore them). The face of a professor, not a warrior. You'd walk past him on the street without knowing he was the most successful manager in baseball.",
    attire: "Dark civilian suit with vest and watch chain — the watch factory man. Seated on the bench, arms folded, observing. A notepad or pencil suggested nearby. Not animated — calculating. He looks like he's designing something in his head while everyone else is watching the game.",
    mood: "Quiet mastery. Not fierce, not warm — precise. The look of a man who has already figured out where every player on the field should be standing and is waiting for them to figure it out too. There's patience in the eyes and steel in the jaw. A clockmaker watching his creation tick.",
    style: "Cool sepia with blue undertones — the most cerebral card in the Banners set. Clean, precise, almost clinical. Boston's South End Grounds suggested in the background. Border should feel geometric and orderly — straight lines, right angles, precision. Watchmaker motifs in the corner details. The card should feel like a blueprint.",
    reference: "If McGraw is Napoleon, Hanlon is Socrates, and Tebeau is a barroom brawler, Selee is the engineer who built the cathedral nobody knows he designed. The card should feel understated but indispensable — the kind of card that doesn't look like much until you read the back and realize this quiet man built everything. A hidden gem.",
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

export default function FrankSeleeCard() {
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${C.darkBrown} 0%, #2a3a5a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>⚙️</div>
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
                { label: "100 WINS", val: "2×" },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "HOF PLYR", val: d.record.hof_players_managed.length },
                { label: "POS CONV", val: d.record.positional_conversions.length },
                { label: "PLAYED", val: "0 IP" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 5 NL Pennants", "⭐ HOF 1999", "📜 .598 Career Win%", "🎓 12 HOF Players", "⚙️ Tinker-Evers-Chance", "💎 First 100-Win Teams", "🔬 Never Played a Game"].map((a, i) => (
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
                <Section title="Positional Conversions"><div style={{ marginBottom: 8 }}>{d.record.positional_conversions.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: archColor, fontSize: 11, fontWeight: 700 }}>⚙ {p}</div>))}</div></Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("HIGH") || effect.includes("STRONG") ? `${C.traitGreen}20` : effect.includes("LOW") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("HIGH") || effect.includes("STRONG") ? C.traitGreen : effect.includes("LOW") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Selee's real life, become universal cards playable in any game.</p>
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
                <Section title="Selee's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
  positional_conversions: d.record.positional_conversions,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
