import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: CHARLIE GRIMM
// Era: 1930 · Archetype: Players' Manager
// "Jolly Cholly" — Banjo, Laughter, Three Pennants, Zero Rings
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Charlie Grimm",
  nickname: "Jolly Cholly",
  year: 1935,
  team: "Chicago Cubs",
  era: "1930s",
  ilb_team: "Iron",
  archetype: "Players' Manager",
  born: "August 28, 1898 — St. Louis, MO",
  died: "November 15, 1983 — Scottsdale, AZ (age 85)",
  hof: "Not inducted (significant omission). 3 NL pennants. 1,287-1,067 career (.547). Ashes scattered on Wrigley Field — the only manager to literally become part of his ballpark.",
  height: '6\'0"',
  weight: "175 lbs",

  record: {
    career_wins: 1287,
    career_losses: 1067,
    win_pct: ".547",
    pennants: 3,
    world_series: 0,
    seasons_managed: 19,
    ejections: "Minimal — though he once mimicked an umpire's walk behind his back and got tossed for it. Even his ejections were comedy.",
    peak_team: "1935 Chicago Cubs",
    peak_record: "100-54, 21-game winning streak in September. Lost WS to Tigers in 6 games.",
    teams_managed: ["Chicago Cubs I (1932-38): 3 NL pennants (1932, 1935, 1945*), 396-281", "Milwaukee Brewers/AA (1941-43): Pennant and Little World Series 1943", "Chicago Cubs II (1944-49): NL pennant 1945, 307-258", "Boston/Milwaukee Braves (1952-56): Inaugural Milwaukee manager, 341-285", "Chicago Cubs III (1960): Brief third stint, swapped with Boudreau"],
    notable: "Replaced Rogers Hornsby as Cubs manager in 1932 — went from the most hated to the most beloved. Led 21-game winning streak in September 1935 (one of the longest in MLB history). 3 pennants, 0 World Series wins. Voluntarily stepped down in 1938 when the team struggled — 'imagine that happening today.' Swapped positions with Lou Boudreau in 1960 (manager → broadcaster, broadcaster → manager). Left-handed banjo player who serenaded fans before games. Formed string bands with teammates on every team. Bill Veeck's partner with Milwaukee Brewers. Ashes scattered on Wrigley Field after death. 'A pat on the back, an encouraging word, or a wisecrack paid off a lot more than a brilliantly executed work of strategy.' Philip Wrigley called him 'my favorite baseball character.'",
    playing_career: ".290 BA, 2,299 hits, 79 HR, 1,078 RBI across 20 seasons (1916-36). Led NL first basemen in fielding percentage 7 times. Hit .389 in 1929 World Series. One of the few to play AND manage in 2,000+ games each. 'Der Kaptink' — Cubs team captain 1925-32.",
  },

  ilb_ratings: {
    tac: 3,  // Moderate. "A pat on the back paid off more than a brilliantly executed work of strategy." Grimm explicitly deprioritized tactics in favor of morale. He managed by feel, not by book. Sound but unspectacular.
    pit: 3,  // Moderate. No particular reputation for pitching expertise. His 1935 pennant was driven by hitting and a legendary streak. His teams were balanced, not pitching-dominant.
    lin: 4,  // High. Grimm understood lineups — he was a skilled first baseman who played alongside Hornsby, Hack Wilson, Kiki Cuyler. He built lineups around available talent with a good eye for balance.
    adp: 4,  // High. Three stints with the Cubs, one with the Braves, minor leagues, broadcasting, front office. Grimm adapted to every role the game threw at him — player, manager, broadcaster, ambassador. But always returned to the Cubs.

    dis: 4,  // Low-moderate. Grimm's discipline was through love, not fear. "Encouragement and positivity over strict discipline." His teams played hard because they loved playing for Jolly Cholly — not because they feared him.
    ego: 7,  // Good. Grimm replaced Hornsby (EGO 2 — the worst ego manager in baseball) and immediately restored the clubhouse. His lack of ego created space for others. Players didn't have to manage the manager's personality.
    har: 10, // Maximum. The most harmonious manager in this project so far alongside Robinson. "Jolly Cholly" isn't a nickname — it's a worldview. Banjo-playing, sing-alongs, morale-boosting antics. The string band on every team. The joy was structural.
    int: 4,  // Low-moderate. Grimm's intensity was warm, not hot. He cared deeply about winning but expressed it through joy rather than pressure. "Playing baseball was more fun than working for a living." The intensity of a man who loves his job.
    str: 6,  // Moderate-high. Grimm identified and nurtured talent — Phil Cavarretta was signed as an 18-year-old under Grimm. He built three pennant-winning teams. But his teams never won the World Series, suggesting a ceiling on his development.
    flx: 8,  // Elite. Manager, broadcaster, manager again, minor league partner with Veeck, broadcaster again, manager AGAIN, front office, ambassador. Swapped roles with Lou Boudreau. Grimm did everything the game asked of him with grace and humor.

    ovr: 10, // Elite tier. Three pennants, .547 W-L%, 19 seasons, universal beloved status, the joy metric. Not Legend because 0 World Series wins and no sustained dynasty. But the harmony and flexibility earn Elite.
  },

  rating_justification: {
    tac: "Moderate. Grimm explicitly said 'a pat on the back, an encouraging word, or a wisecrack paid off a lot more than a brilliantly executed work of strategy.' He was sound but unspectacular tactically — managing by instinct and morale rather than by the percentages (McKechnie) or by innovation (Huggins). Rating of 3.",
    pit: "Moderate. Grimm had no particular reputation for pitching management. His pennant-winning teams were balanced, not pitching-dominant. The 1935 Cubs won with a 21-game winning streak fueled by offense and momentum, not a dominant pitching staff. Rating of 3.",
    lin: "High. Grimm was a skilled hitter himself (.290 career, .389 in the 1929 WS) and understood lineup construction. He played alongside some of the greatest hitters in Cubs history and built balanced lineups around available talent. His player-manager years showed he understood how to construct a batting order from the inside. Rating of 4.",
    adp: "High. Three separate stints managing the Cubs. One stint with the Braves (including their move to Milwaukee). Minor leagues with Veeck. Broadcasting. Front office. Manager-broadcaster swap with Boudreau. Grimm adapted to every role baseball threw at him — but his adaptability was more vocational than tactical. He always came back to the same approach: joy, morale, encouragement. Rating of 4.",
    dis: "Low-moderate. Grimm's discipline style was encouragement, not enforcement. His teams played hard because they loved the environment, not because they feared consequences. This worked beautifully for pennant races but may have contributed to 0 World Series victories — the World Series demands an intensity Grimm's gentle approach couldn't always provide. Rating of 4.",
    ego: "Good. Grimm replaced Rogers Hornsby — the most toxic ego in baseball — and immediately restored clubhouse harmony. His own lack of ego was his greatest ego-management tool. Players didn't have to manage the manager's personality because there was nothing to manage. Grimm's ego was subordinate to the team's joy. Rating of 7.",
    har: "Maximum. 'Jolly Cholly' is the most descriptive nickname in this entire project. Left-handed banjo before games. String bands on every team. Sing-alongs during spring training. Comedy routines with infielders. Mimicking umpires for laughs. Every teammate remembered Grimm with warmth. Philip Wrigley called him 'my favorite baseball character.' His ashes were scattered on Wrigley Field — the ultimate expression of belonging. Rating of 10.",
    int: "Low-moderate. Grimm's intensity was expressed through joy rather than pressure. 'Playing baseball was more fun than working for a living.' He cared deeply about winning but refused to let the caring become suffering. The intensity was warm, not hot — a campfire, not a blowtorch. The campfire lasts longer but can't forge steel. Rating of 4.",
    str: "Moderate-high. Grimm built three pennant-winning teams and developed players like Phil Cavarretta (signed at 18, became a star under Grimm). He also managed the inaugural Milwaukee Braves to competitive seasons. But none of his teams won the World Series, and his post-1945 Cubs declined steadily. The building was good; the finishing was incomplete. Rating of 6.",
    flx: "Elite. No manager in this project has played more roles: player, player-manager, manager, broadcaster, manager again, minor league owner-manager, broadcaster again, manager a third time, front office executive, goodwill ambassador. The manager-broadcaster swap with Lou Boudreau in 1960 is the most flexible moment in managerial history. Grimm did everything with grace. Rating of 8.",
  },

  personality: {
    leadership_style: "Joy as strategy. Grimm led by making baseball fun. His teams wanted to play because playing was a pleasure. The banjo before games, the comedy routines, the encouraging words, the pats on the back — these weren't distractions from managing; they WERE the managing. Grimm believed that happy players play better than scared players, and three pennants suggest he was right. The leadership was atmospheric: Grimm created a climate of joy, and within that climate, talented players bloomed.",
    temperament: "Irrepressibly cheerful. 'Jolly Cholly' wasn't a mask — it was the man. Even in adversity (0 World Series wins, being moved to the broadcast booth, managing bad teams), Grimm maintained his warmth and humor. The temperament of a man who genuinely believed baseball was 'more fun than working for a living' — and who made everyone around him believe it too.",
    work_ethic: "Devoted but light-handed. Grimm worked hard at creating the right environment rather than grinding tactical preparation. His pre-game banjo playing wasn't laziness — it was environmental design. The work ethic was relational: Grimm worked hardest at knowing his players, understanding their moods, and keeping the atmosphere positive. The string band was his office.",
    lifestyle: "German-American, musical, convivial. Born in St. Louis to parents of German extraction. Played left-handed banjo his entire life. Formed string bands on every team he joined. Partners with Bill Veeck (the greatest promoter in baseball) in Milwaukee. Beloved in Wisconsin for his German heritage. Lived by Lake Koshkonong in retirement. His ashes scattered on Wrigley Field — he literally became the ballpark.",
    communication_style: "Humor, encouragement, and performance. Grimm communicated through wisecracks, banjo-playing, comedy routines, and encouraging words. He mimicked umpires behind their backs. He played 'burnout' with catchers in front of fans. He turned routine ground balls into vaudeville acts with Billy Herman. Every interaction was a performance designed to lift spirits. The communication was entertainment, and the entertainment was communication.",
    loyalty_expectations: "Play hard and have fun doing it. Grimm's expectations were simple: give your best effort and enjoy the game. He didn't demand personality compliance (McCarthy), moral perfection (McKechnie), or combative intensity (Durocher). He demanded joy — and joy, when genuine, produces effort naturally.",
    dark_side: "Zero World Series wins and the question of whether joy is enough. Three pennants, zero rings. The 1932 Cubs were swept by the Yankees. The 1935 Cubs lost to the Tigers after the greatest winning streak in decades. The 1945 Cubs lost the last wartime World Series. Is joy sufficient for the ultimate test? Grimm's career suggests that harmony can build teams but can't always finish the job. The campfire warms but doesn't forge. In ILB: Grimm carries 'The Pennant Ceiling' — his teams reliably contend but have a reduced championship conversion rate. The joy gets you to October but not through it.",
  },

  playbook: {
    roster_philosophy: "Talented players in a joyful environment. Grimm didn't build rosters through systems (McCarthy) or adaptation (McKechnie) — he built them through atmosphere. Get good players, make them happy, let them play. The roster construction was less important than the roster culture. Grimm's teams weren't the most talented — they were the happiest, and happy players overperform.",
    conflict_response: "DISSOLVE THROUGH HUMOR. Grimm turned tension into comedy. When things got bad, the banjo came out. When players argued, Grimm cracked a joke. When umpires made bad calls, Grimm mimicked their walks for laughs. Conflict couldn't survive in Grimm's atmosphere of relentless good humor.",
    clique_strategy: "UNITE THROUGH MUSIC AND FUN. The string band wasn't a hobby — it was a team-building strategy. When you're playing banjo and mandolin together before games, you're a band. Bands don't have cliques. Grimm's musical performances created a shared identity that transcended baseball roles.",
    player_types_that_thrive: [
      "Players escaping toxic environments — Grimm replaced Hornsby, and the relief was palpable",
      "Young players who need confidence — Grimm's encouragement nurtured talents like Cavarretta",
      "Team-first players who value camaraderie — the string band mentality rewards belonging",
      "Fun-loving personalities who play better when relaxed — Grimm's atmosphere freed them",
      "Consistent, professional players who need a positive environment to sustain performance",
    ],
    player_types_that_struggle: [
      "Win-at-all-costs competitors who need pressure to perform — Grimm's atmosphere can feel soft",
      "Players who need structure and discipline — the joy-first approach lacks rigor for some",
      "Pitchers who need intensive development — Grimm's coaching strength was morale, not mechanics",
      "Intense personalities who view fun as unprofessional — Durocher types clash with Grimm",
      "Players who exploit permissiveness — the gentle hand sometimes can't grip tight enough",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 5,
      max_volatility: "LOW — Grimm's joyful environment dissipates moderate volatility but can't contain extreme chaos.",
      discipline_floor: "LOW-MODERATE — through love, not rules. Sufficient for regular season; sometimes insufficient for October.",
      star_exception: "Stars are treated the same as everyone else — but with the same joy. Grimm didn't need star exceptions because his system naturally accommodated different personalities through warmth.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "MAXIMUM INCREASE", desc: "+3 Team Fit for all players. Grimm's joy is structural and universal. The string band, the comedy, the encouragement — everyone belongs in Jolly Cholly's clubhouse." },
    volatility: { effect: "STRONGLY REDUCED", desc: "-2 Volatility. Grimm's humor dissolves tension before it can build. The banjo is a pressure valve — when things get tight, the music starts." },
    discipline: { effect: "SLIGHTLY DECREASED", desc: "-1 Discipline. The joy-first approach can soften edges. Players who need fear-based motivation find Grimm's atmosphere too relaxed. The campfire doesn't forge." },
    ego: { effect: "SUPPRESSED", desc: "-2 Ego for all players. Grimm's selflessness is contagious. When the manager plays banjo for fun rather than demanding obedience, ego feels silly." },
    work_habits: { effect: "INCREASED", desc: "+1 Work Habits. Happy players work harder — not because they're told to, but because they want to. The joy makes effort feel natural." },
    adaptability: { effect: "INCREASED", desc: "+1 Adaptability. Grimm's flexible approach teaches players to adjust. When the manager can switch between managing and broadcasting, players learn to be flexible too." },
  },

  chemistry_traits: [
    { tag: "Jolly Cholly", desc: "All players gain +2 morale upon joining. No player can develop 'Disgruntled' status under Grimm. The joy is permanent, unconditional, and contagious. 'Playing baseball was more fun than working for a living.'" },
    { tag: "The Banjo", desc: "Before every game, Grimm plays the banjo. All players gain +1 to their highest stat that game. The pre-game ritual sets the tone: relaxed, focused, joyful. The left-handed banjo is Grimm's most important instrument." },
    { tag: "After Hornsby", desc: "If Grimm replaces a high-DIS/low-HAR manager, all players gain +3 Team Fit permanently. The relief of escaping brutality is transformative. The 1932 Cubs went 37-18 after Hornsby was fired and Grimm took over." },
    { tag: "21-Game Streak", desc: "When on a winning streak of 5+ games, all players gain an additional +1 to all stats per game on the streak (cumulative, max +3). Momentum is Grimm's greatest weapon. The 1935 Cubs won 21 straight in September." },
    { tag: "The Pennant Ceiling", desc: "Grimm's teams win pennants but not World Series. In championship games, all players lose -1 to all stats. The joy that builds a season can't quite sustain October's pressure. Three pennants, zero rings." },
    { tag: "The Swap", desc: "Grimm can swap roles with any non-manager staff member at any time. If the team is struggling, Grimm moves to broadcasting and the new manager gets +2 to all ratings for 10 games (fresh energy). The 1960 Boudreau swap as mechanic." },
    { tag: "Der Kaptink", desc: "Grimm was 'Der Kaptink' — the captain who became the manager. If a player-captain is on the roster, that player gains +2 to all stats (Grimm understands the captain-to-manager pipeline)." },
    { tag: "Ashes on Wrigley", desc: "Grimm's ashes were scattered on Wrigley Field. At home, all players gain +1 to all stats. The manager is literally part of the ballpark. The belonging is eternal." },
  ],

  preferred_locations: [
    { location: "Wrigley Field / Chicago", affinity: "MAXIMUM", note: "Three stints as Cubs manager. His ashes are scattered here. Grimm didn't just manage at Wrigley — he became Wrigley. The belonging is physical." },
    { location: "On-Deck Circle / Pre-Game", affinity: "HIGH", note: "Where Grimm played banjo, performed comedy, mimicked umpires. The pre-game was his stage. The entertainment was the preparation." },
    { location: "Broadcast Booth", affinity: "HIGH", note: "Multiple stints as broadcaster. Swapped with Boudreau in 1960. Grimm was as natural in the booth as in the dugout." },
    { location: "Milwaukee", affinity: "HIGH", note: "Co-owned the Brewers with Bill Veeck. First manager of the Milwaukee Braves. Beloved for his German heritage in a German-American city." },
    { location: "Catalina Island / Spring Training", affinity: "HIGH", note: "Where the Cubs held spring training. Where Grimm led sing-alongs. Where the string band performed. The island of joy." },
    { location: "Lake Koshkonong / Wisconsin", affinity: "HIGH", note: "Where Grimm retired. The peaceful lake. The banjo on the porch. The afterlife of Jolly Cholly before the ashes went to Wrigley." },
  ],

  momentum: {
    hot_triggers: [
      "Winning streaks — the 21-game streak shows Grimm's momentum is the most powerful in baseball when flowing",
      "After replacing a disliked manager — the relief effect is immediate and transformative",
      "Home games at Wrigley — the fans, the banjo, the atmosphere create a perpetual home advantage",
      "Spring training / early season — Grimm's joy is freshest when the season is young",
    ],
    cold_triggers: [
      "World Series — three pennants, zero rings. October's pressure exceeds joy's capacity",
      "Extended losing — even Jolly Cholly can't play banjo through a 10-game losing streak",
      "Late-career decline — the act becomes stale. 'Cubs management looked the other way at the clowning'",
      "Players who need more than encouragement — the gentle approach has a ceiling",
    ],
    pressure_response: "EXCELLENT IN REGULAR SEASON, DIMINISHED IN OCTOBER. Grimm's joy builds incredible regular-season momentum — the 21-game streak, the three pennants, the .547 winning percentage. But October requires a different gear that Grimm's gentle approach can't always reach. In ILB: +2 Clutch during regular season, -1 Clutch in postseason. The Pennant Ceiling is real. Joy carries you to the dance but can't always close the deal.",
  },

  action_card_seeds: [
    {
      title: "The Banjo",
      type: "Action",
      text: "Your manager pulls out his left-handed banjo and serenades the team before the game. All players gain +1 to their highest stat. If the team is on a losing streak: +2 instead (the music heals). 'I quickly brought my left-handed banjo out of hiding. We had a group.'",
      origin: "Grimm played banjo on every team he joined. Cubs, Pirates, Brewers, Braves — the banjo traveled with him. He formed string bands with teammates: guitar, mandolin, ukulele, and his banjo. The music was the morale.",
    },
    {
      title: "After Hornsby",
      type: "Action",
      text: "Your manager replaces a brutal predecessor. All players gain +3 Team Fit and +2 morale permanently. The relief is palpable. The joy is immediate. Laughter replaces fear.",
      origin: "August 2, 1932: Hornsby was fired. Grimm took over. The Cubs went 37-18 and won the pennant. The transformation from the most hated manager in baseball to the most beloved was instantaneous. The clubhouse breathed again.",
    },
    {
      title: "21 in a Row",
      type: "Game Action",
      text: "Your team catches fire. On a winning streak of 10+ games, all players gain +3 to all stats. The streak becomes self-reinforcing — each win fuels the next. 'One of the most sensational finishes in major league history.'",
      origin: "September 1935: the Cubs won 21 consecutive games to take the pennant. It remains one of the longest winning streaks in MLB history. Under Grimm, momentum wasn't just a bonus — it was the entire strategy.",
    },
    {
      title: "The Pennant Ceiling",
      type: "Drama",
      text: "Your team wins the pennant but enters the World Series at -1 to all stats. The joy that built the season can't sustain October's pressure. Three pennants. Zero rings. Is happiness enough?",
      origin: "1932: swept by Yankees. 1935: lost to Tigers in 6. 1945: lost to Tigers in 7. Grimm's Cubs always reached the World Series and always fell short. The most joyful manager in history, staring at the one thing joy couldn't win.",
    },
    {
      title: "The Swap",
      type: "Action",
      text: "Your manager moves to the broadcast booth. A new manager takes over. That new manager gains +2 to all ratings for 10 games (fresh energy). If the team wins the pennant: Grimm's ghost gets credit. 'Imagine that happening today — you can't.'",
      origin: "1938: Grimm voluntarily stepped down for Gabby Hartnett. Hartnett won the pennant. 1960: Grimm and Lou Boudreau literally swapped roles — manager became broadcaster, broadcaster became manager. The most flexible moment in baseball history.",
    },
    {
      title: "Ashes on Wrigley",
      type: "Drama",
      text: "Your manager's connection to the ballpark transcends life. At home, all players gain +2 to all stats permanently. The manager isn't just part of the team — he's part of the field. The joy lives in the dirt.",
      origin: "After Grimm's death in 1983, his widow was granted permission to scatter his ashes on Wrigley Field. The only manager in baseball history to literally become part of his ballpark. Jolly Cholly plays forever.",
    },
  ],

  art_direction: {
    face: "Round, warm, laughing. 6'0\" 175 lbs but carrying himself like a smaller, lighter man — always in motion, always performing. The face is meant for smiling: wide mouth, crinkled eyes, generous cheeks. Not movie-star handsome (Durocher) or intimidating (McGraw) or cold (McCarthy) — welcoming. The face of the man you'd want next to you on a long road trip. The face you'd trust with your team's morale. The banjo player's face: animated, expressive, alive.",
    attire: "Chicago Cubs uniform from the 1930s — the classic blue and white. But also: the banjo. Grimm should always be depicted with or near his left-handed banjo. It's not a prop — it's his identity. The uniform says 'manager.' The banjo says 'Jolly Cholly.' Both are equally true. A baseball glove on one hand, banjo strings in the other. The dual identity of the man who made baseball fun.",
    mood: "Pure warmth. The card should feel like walking into a room where everyone is laughing. Not chaotic (Robinson's Daffiness Boys) but genuinely, sustainably joyful. The mood is the first day of spring training on Catalina Island: sunshine, sea air, the sound of a banjo, and the knowledge that baseball season is beginning. The warmth of a man who loved his job and made everyone around him love theirs.",
    style: "Green Players' Manager palette but brighter and warmer than previous Players' Managers — this is the sunniest card in the project. Wrigley Field ivy in the background, afternoon sunshine, the friendly confines. The card should feel handmade and personal — like something Grimm would have designed himself, with a little musical note somewhere. Border should have a subtle banjo-string pattern. The most inviting card in the game.",
    reference: "The Players' Manager Spectrum: Hanlon (1900) teaches. Mack (1910) presides with dignity. Robinson (1920) loves chaotically. Grimm (1930) entertains. Four different kinds of player-managing: education → patriarchy → family comedy → musical joy. Grimm and Robinson share HAR 10 but differ fundamentally: Robinson's chaos was accidental comedy; Grimm's joy was intentional performance. Robinson's Daffiness Boys stumbled into fun; Grimm's string band created it. Both are beloved. Only one played the banjo.",
  },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archGreen: "#55b877", archDark: "#2a7a4a",
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

export default function CharlieGrimmCard() {
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0a2a0a 0%, #1a3a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.12 }}>🪕</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>PLAYERS' MANAGER</div>
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
              <ClubhouseBar label="STRATGY" value={r.str} color={"#5588cc"} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: d.record.world_series },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "STREAK", val: "21 W" },
                { label: "HARMONY", val: "10 🎵" },
                { label: "FLX", val: "8 🔄" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ASHES SCATTERED ON WRIGLEY FIELD — JOY MADE PERMANENT</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🪕 Left-Handed Banjo", "🏆 3 NL Pennants", "💔 0 World Series", "🎵 HAR 10 (Maximum)", "🔄 FLX 8 (Elite)", "😊 'Jolly Cholly'", "📻 Manager↔Broadcaster Swap", "⚱️ Ashes on Wrigley"].map((a, i) => (
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
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("MAXIMUM") || effect.includes("STRONGLY") ? `${C.traitGreen}20` : effect.includes("DECREASED") ? `${C.warmRed}20` : `${C.gold}20`, color: effect.includes("MAXIMUM") || effect.includes("STRONGLY") ? C.traitGreen : effect.includes("DECREASED") ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Grimm's real life, become universal cards playable in any game.</p>
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
