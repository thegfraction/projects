import { useState } from "react";

const GOMEZ_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: LEFTY GOMEZ
  // Year Snapshot: 1934 (Peak Season — Pitching Triple Crown)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Lefty Gomez",
  nickname: "El Goofo",
  year: 1934,
  team: "New York Yankees",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "L",
  throws: "L",
  height: "6'2\"",
  weight: "173 lbs",
  born: "November 26, 1908 — Rodeo, California (1,000-acre ranch, Spanish-Portuguese father, Welsh-Irish mother)",
  died: "February 17, 1989 — Greenbrae, California (age 80, congestive heart failure)",
  hof: "Class of 1972 (Veterans Committee). 5× World Series champion. 7× All-Star. 2× Pitching Triple Crown. Monument Park plaque at Yankee Stadium.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1934 PEAK SEASON (PITCHING TRIPLE CROWN)
  // Source: Baseball-Reference, SABR BioProject, HOF
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1934,
    games: 38,
    wins: 26,
    losses: 5,
    era: "2.33",
    innings: "281.2",
    strikeouts: 158,
    walks: 96,
    complete_games: 25,
    shutouts: 6,
    whip: "1.15",
    ops_plus_against: "N/A",
    war: 9.1,
    career_wins: 189,
    career_losses: 102,
    career_era: "3.34",
    career_strikeouts: 1468,
    career_cg: 173,
    career_shutouts: 28,
    career_war: 44.5,
    no_hitters: 0,
    perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // Pitchers use a modified stat engine:
  // STUFF (STF) replaces CON — raw pitching dominance
  // CONTROL (CTL) replaces POW — precision and walks
  // STAMINA (STA) replaces SPD — innings durability
  // DEFENSE (DEF) — same (fielding as pitcher)
  // CLUTCH (CLU) — same (postseason performance)
  //
  // STUFF: ERA tiers (<1.50=5, 1.50-1.99=4, 2.00-2.49=3, 2.50-2.99=2, 3.00-3.49=1, 3.50+=0) + K/9 ≥ 6.0 bonus (cap 5)
  // CONTROL: BB/9 tiers (<1.0=5, 1.0-1.49=4, 1.5-1.99=3, 2.0-2.49=2, 2.5-2.99=1, 3.0+=0) + WHIP ≤ 1.00 bonus (cap 5)
  // STAMINA: IP tiers (<150=0, 150-199=1, 200-249=2, 250-299=3, 300-349=4, 350+=5)
  // DEFENSE: Same as position players
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // CLUTCH: Same as position players
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 10,     // Elite/MVP — 2× Triple Crown, 6-0 WS, HOF, 7× All-Star, .649 career W%
    stf: 3,      // 2.33 ERA → tier 3 (2.00-2.49). K/9 ~5.05 → no bonus. STF 3.
    ctl: 0,      // BB/9 ~3.07 → tier 0 (3.0+). WHIP 1.15 → no bonus. CTL 0.
    sta: 3,      // 281.2 IP → tier 3 (250-299). 25 CG. Elite workload.
    def: 0,      // Average fielding pitcher. No standout defensive metrics.
    clu: 3,      // 6-0 in World Series — most WS wins without a loss in history. 3 All-Star Game wins. Drove in first ASG run ever. Maximum clutch.
  },
  
  stat_justification: {
    stf: "2.33 ERA in 1934 — led the AL. Pitching Triple Crown (26 W, 2.33 ERA, 158 K). But K/9 was only ~5.05 — not a dominant strikeout pitcher by the formula. Led AL in K's three times and led the decade with 1,337 total K's. In the 1930s high-offense era, his 2.33 ERA was extraordinary. Originally a flame-thrower; re-tooled as a finesse pitcher after arm injuries. 'I'm throwing as hard as I ever did — the ball's just not getting there as fast.' Rating of 3.",
    ctl: "BB/9 of ~3.07 in 1934 (96 BB in 281.2 IP) → tier 0. Gomez walked batters. He once walked 11 men in a shutout — still a record. Career BB/9 was in the 3.0+ range consistently. WHIP 1.15 → no bonus. Gomez won not through control but through stuff, competitiveness, and having the best offense in baseball behind him. Rating of 0.",
    sta: "281.2 IP in 1934 — 25 complete games and 6 shutouts in 38 starts. Led AL in IP. Battled arm injuries throughout career (1933, 1936, 1939) but in his healthy years was a workhorse. Career 2,503 IP. Rating of 3.",
    def: "Average fielding pitcher. No standout defensive metrics. Notoriously terrible hitter (.147 career, -7 career OPS+ — fifth worst in history). The lighter story. Rating of 0.",
    clu: "6-0 in the World Series — the most wins without a loss in WS history. Won in 1932, 1936 (2 wins), 1937 (2 wins), 1938. 3 All-Star Game wins (also a record). Started 5 ASGs (tied for most ever). Drove in the first RBI in All-Star Game history. Singled home the winning run in the 1937 WS clincher. 'I'd rather be lucky than good' — but he was both. Maximum clutch: 3.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Jester-Ace. Gomez led through humor, not authority. He disarmed opponents by hanging around their clubhouse cracking jokes before he pitched — Bill Werber claimed he 'talked them out of hits.' He needled Joe DiMaggio relentlessly because DiMaggio, like everyone else, couldn't resist laughing. He exasperated Joe McCarthy regularly — stopping a World Series game to watch a plane fly overhead — and got away with it because he won. Always. When the game was on the line, the clown became the killer.",
    temperament: "Irrepressibly optimistic, self-deprecating, and fearless. When asked if he'd throw at his own mother, Gomez said: 'You're damn right I would. She's a good hitter.' On relieving in a trouble spot: 'A lot of things run through your head. One of them was: Should I spike myself?' On Neil Armstrong finding an unidentified white object on the moon — Gomez claimed it was one of his home run balls. He made everyone around him lighter. In a clubhouse of legends and egos, he was the glue.",
    work_ethic: "Deceptive. Behind the comedy was ferocious competitiveness. Gomez won 20+ games four times. Led the AL in wins, ERA, and strikeouts simultaneously — twice. He re-invented himself as a finesse pitcher when his arm went bad. He collected $250 annually from Babe Ruth on a bet that he'd get at least 10 hits per season — and managed exactly enough to win each year. The comedy was the surface; underneath was a pitcher who hated losing.",
    lifestyle: "California ranch kid turned Manhattan socialite. Born on a 1,000-acre ranch in Rodeo, California where his father was known as 'Coyote.' Lefty played saxophone as a kid (bought with money from plucking chickens at a butcher shop). Married Broadway star June O'Dea in 1933 — she gave up her career for him. He embraced New York nightlife completely. Sharp dresser, Big Apple lover. The marriage eventually failed — he filed for divorce in Mexico; she, a devout Catholic, refused and cited cruel treatment. After retirement, became a beloved banquet speaker and Wilson Sporting Goods ambassador for 30+ years.",
    era_adaptability: "HIGH. Gomez's fastball-curve combination was elite in the 1930s and would translate to any era. His willingness to reinvent himself (power → finesse) shows adaptability. His personality would make him a modern media sensation. The walk rate would concern analytics departments, but his competitiveness and postseason dominance would win any front office over. In the modern game, Gomez would be a charismatic ace who fills seats and wins October games.",
    clubhouse_impact: "MAXIMUM POSITIVE. The wittiest man in baseball history. Reporters loved him (the anti-Lazzeri). Teammates adored him. He could needle DiMaggio, McCarthy, and Ruth without consequence because everybody wanted to be around him. His humor defused tension in the most pressure-filled clubhouse in sports. When Gomez left the Yankees, they didn't just lose a pitcher — they lost their personality.",
    dark_side: "The arm. Gomez suffered injuries in 1933, 1936, and 1939 that progressively robbed him of his fastball. By 1940, he was 3-3 with a dead arm. By 1942, he could only pitch 80 innings. The Yankees sold him for $10,000. He never pitched for the Braves, signed with Washington, threw one game, pulled his shoulder, and retired at 34. After retirement, he took a $40/week job at a defense plant. The marriage to June O'Dea collapsed publicly — he filed for Mexican divorce, she refused, the tabloids covered it. The comedy faded into a quieter life of banquet speeches and corporate ambassadorship. But the arm betrayal — that was the wound.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "El Goofo", desc: "+2 team morale permanently. Gomez's humor defuses all clubhouse tension events. Reporters never write negative stories about the team while he's on it." },
    { tag: "Clean Living & a Fast Outfield", desc: "Gomez benefits from elite defense. If team DEF average is 1+, Gomez gets +1 STF from defensive support. His famous line: he knew his outfielders made him better." },
    { tag: "World Series Perfect", desc: "6-0 in the WS — record. Gomez cannot lose a World Series start. 80% chance of a WS win when he starts; 20% chance of a no-decision. He never takes the L in October." },
    { tag: "The Lighter", desc: "When facing Bob Feller or any flame-throwing pitcher while batting, Gomez pulls out a lighter. Comic relief event: +1 team morale, but Gomez strikes out." },
    { tag: "Talk Them Out of Hits", desc: "Before starts, Gomez can visit the opposing clubhouse. 30% chance opponents' CON is -1 for the game (distracted by his jokes). 10% chance it backfires (+1 motivation for opponents)." },
    { tag: "Broadway Marriage", desc: "Married to a Broadway star. +1 publicity in New York. But 20% chance per season of tabloid drama event (-1 morale)." },
    { tag: "Arm Fragility", desc: "10% chance per season of arm injury. If triggered: -2 STF for 60 games. Can reinvent as finesse pitcher (STF restored to -1 instead of -2)." },
    { tag: "Gomez-Ruffing Duo", desc: "When paired with a right-handed ace (Ruffing, or equivalent OVR 8+ RHP), both pitchers get +1 to WS performance. The ultimate lefty-righty combination." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Yankee Stadium", affinity: "HIGH", note: "His palace. Monument Park plaque. 189 career wins, nearly all as a Yankee. The stage for El Goofo." },
    { location: "World Series / All-Star Game", affinity: "HIGH", note: "6-0 WS record. 7× All-Star. 5 ASG starts. 3 ASG wins. The biggest stages brought out his best." },
    { location: "Nightclub / Restaurant / Party", affinity: "HIGH", note: "New York nightlife was his second home. Sharp dresser, Broadway wife, Big Apple socialite." },
    { location: "Press Room / Interviews", affinity: "HIGH", note: "The anti-Lazzeri. Reporters adored him. He had a quote for every occasion. Became a professional speaker after retirement." },
    { location: "Opposing Clubhouse", affinity: "HIGH", note: "He'd wander in and joke with the other team before starts. Bill Werber: 'He talked them out of hits.'" },
    { location: "Ranch / Farm", affinity: "MEDIUM", note: "Born on a 1,000-acre California ranch. His father was 'Coyote.' But Lefty left the ranch for the city and never looked back." },
    { location: "Batter's Box", affinity: "NONE", note: ".147 career BA. -7 OPS+. Fifth-worst in history. 'I never broke a bat until last year when I was backing out of the garage.'" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "World Series starts — 6-0, unblemished, the ultimate big-game pitcher",
      "All-Star Games — 3 wins, first starting pitcher in ASG history, record 6 IP in one game",
      "Having elite defense behind him — 'clean living and a fast outfield'",
      "Healthy arm stretches — when right, 26-5 with a 2.33 ERA",
    ],
    cold_triggers: [
      "Arm injuries — three separate injury episodes robbed him of velocity",
      "Late-career decline — from 26-5 ace to one-game-and-done with Washington",
      "Batting — .147 career. The lighter. The garage quote. An absolute zero at the plate.",
      "Off-field tabloid drama — the failed marriage to June O'Dea played out publicly",
    ],
    pressure_response: "THE BEST IN BASEBALL HISTORY FOR HIS ERA. 6-0 in the World Series. Most wins without a loss ever. 3-1 in All-Star Games. Started 5 ASGs. When 50,000 people were watching and the season was on the line, Gomez became a different pitcher. The jokes stopped, the fastball hummed, and he won. Every. Single. Time. He once stopped a WS game to watch a plane — but only because he was already winning 9-0. Don't confuse the comedy with lack of intensity. Gomez was a killer disguised as a clown.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "I'd Rather Be Lucky Than Good",
      type: "Action",
      text: "Your pitcher allows three screaming line drives in one inning — all caught by outfielders making spectacular plays. Your pitcher turns to the dugout and shrugs. +1 luck modifier for the rest of the game.",
      origin: "Gomez's most famous line. After an inning where three hard-hit balls were caught: 'I'd rather be lucky than good.'",
    },
    {
      title: "The Airplane Game",
      type: "Drama",
      text: "World Series. Your pitcher has a 9-0 lead. He stops the game to watch an airplane pass overhead. The manager is furious. The crowd loves it. +2 publicity, -1 manager relationship. Your pitcher still wins.",
      origin: "1936 WS Game 2: Gomez, with a huge lead over the Giants, stopped play to watch a plane fly over Yankee Stadium. McCarthy was apoplectic. Gomez won the game.",
    },
    {
      title: "The Lighter and the Wild Man",
      type: "Drama",
      text: "Late innings. Shadows falling. Your pitcher steps into the batter's box against a flame-throwing wild man. He pulls a lighter out of his pocket and flicks it on. The umpire demands an explanation. 'I can see him just fine — I want to make sure that wild man can see ME.'",
      origin: "Gomez vs. Bob Feller. Late afternoon shadows at Yankee Stadium. Gomez pulled out a cigarette lighter. When the umpire protested: 'I just want to make sure he can see me.'",
    },
    {
      title: "Six and Oh",
      type: "Game Action",
      text: "Your pitcher wins his sixth consecutive World Series game without a loss. The record may never be broken. +5 CLU permanently. The pitcher gains the 'October Immortal' trait.",
      origin: "Gomez went 6-0 in World Series play across 1932, 1936, 1937, and 1938 — the most wins without a loss in WS history.",
    },
    {
      title: "The First All-Star Game",
      type: "Game Action",
      text: "Baseball invents the All-Star Game. Your pitcher is chosen to start the first one ever played. He wins and drives in the first run. Seven consecutive All-Star selections follow. The midsummer classic becomes his personal showcase.",
      origin: "July 6, 1933: Gomez started the first MLB All-Star Game, won it, and drove in the first run. He was selected 7 consecutive years (1933-39), started 5, and won 3.",
    },
    {
      title: "Clean Living and a Fast Outfield",
      type: "Action",
      text: "When asked the secret of his success, your pitcher gives full credit to his outfielders and his lifestyle. The outfield gains +1 DEF from the recognition. Your pitcher's charm increases fan loyalty by 10%.",
      origin: "Gomez attributed his success to 'clean living and a fast outfield' — a self-deprecating joke that became his catchphrase.",
    },
    {
      title: "The $250 Bet",
      type: "Action",
      text: "Your team's star hitter bets your worst-hitting pitcher $250 that he can't get 10 hits all season. The pitcher — a career .147 hitter — scratches out exactly enough hits to collect. Every year. For multiple years.",
      origin: "Babe Ruth annually bet Gomez $250 that he couldn't get 10 hits in a season. Gomez always collected — barely. Ruth paid up each year.",
    },
    {
      title: "Thrown at His Own Mother",
      type: "Drama",
      text: "A reporter asks your pitcher if he'd throw at his own mother. 'You're damn right I would. She's a good hitter.' The quote becomes legendary. Your pitcher's intimidation rating increases. But his mother calls to complain.",
      origin: "A reporter asked Gomez about his brushback pitches: 'Is it true you'd throw at your own mother?' Gomez: 'You're damn right I would. She's a good hitter.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, lanky, grinning. 6'2\" 173 lbs — impossibly thin for a pitcher. The grin is the key: Gomez is always smiling, always in on the joke. Sharp features, dark hair, California tan. He should look like a man who's having more fun than anyone else on the field.",
    attire: "New York Yankees 1934 home whites. Pristine pinstripes on that impossibly thin frame. The cap slightly askew — a touch of irreverence. He should look like a Yankee who doesn't quite fit the Yankee mold — too happy, too loose, too alive.",
    mood: "Joy. Pure, uncut joy on a baseball field. The follow-through of a fastball with the grin already forming because he knows the batter can't touch it. Or: the lighter scene, Gomez illuminated by the tiny flame with a look of exaggerated terror. This is the card that makes you smile. In a set full of tragedy and darkness, Gomez is sunshine.",
    style: "Bright, warm colors — contrast with the sepia/Depression palette of Trosky and the muted tones of Lazzeri. Yankee Stadium in golden afternoon light. The art style should be slightly more dynamic and playful than other cards. Motion lines on the fastball. A plane in the distant sky.",
    reference: "The card that asks: what if the funniest person you ever met was also the best at his job? 6-0 in the World Series. Two Triple Crowns. And a revolving bowl for tired goldfish.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  stuff: {
    metric: "ERA + K/9",
    tiers: [
      { range: "ERA < 1.50", value: 5 },
      { range: "ERA 1.50-1.99", value: 4 },
      { range: "ERA 2.00-2.49", value: 3 },
      { range: "ERA 2.50-2.99", value: 2 },
      { range: "ERA 3.00-3.49", value: 1 },
      { range: "ERA 3.50+", value: 0 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 + WHIP",
    tiers: [
      { range: "BB/9 < 1.0", value: 5 },
      { range: "BB/9 1.0-1.49", value: 4 },
      { range: "BB/9 1.5-1.99", value: 3 },
      { range: "BB/9 2.0-2.49", value: 2 },
      { range: "BB/9 2.5-2.99", value: 1 },
      { range: "BB/9 3.0+", value: 0 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched",
    tiers: [
      { range: "< 150 IP", value: 0 },
      { range: "150-199 IP", value: 1 },
      { range: "200-249 IP", value: 2 },
      { range: "250-299 IP", value: 3 },
      { range: "300-349 IP", value: 4 },
      { range: "350+ IP", value: 5 },
    ],
  },
  defense: {
    metric: "Fielding as pitcher",
    tiers: [
      { range: "Average", value: 0 },
      { range: "Good", value: 1 },
      { range: "Excellent", value: 2 },
      { range: "Elite", value: 3 },
    ],
  },
  overall: {
    formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13",
    tiers: [
      { range: "3-4", label: "Replacement" },
      { range: "5-6", label: "Solid Starter" },
      { range: "7-8", label: "All-Star" },
      { range: "9-10", label: "Elite / MVP" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
  clutch: {
    metric: "Postseason record + signature moments",
    tiers: [
      { range: "PS ERA > 4.00 or losing record", value: 0 },
      { range: "PS ERA 2.50-4.00", value: 1 },
      { range: "PS ERA < 2.50", value: 2 },
    ],
    bonus: "WS hero moment → +1 (cap 3)",
  },
};

// Color palette
const C = {
  parchment: "#f5edd6",
  darkBrown: "#3a2a1a",
  medBrown: "#6b5339",
  gold: "#c9a84c",
  warmRed: "#8b3a2a",
  sepia: "#a0845c",
  cream: "#faf3e3",
  ink: "#2a1f14",
  hotRed: "#c44536",
  coldBlue: "#3a6b8c",
  traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 2,
        transition: "width 0.8s ease",
      }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag, desc }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`,
    borderRadius: 3, padding: "3px 8px", margin: "2px 3px",
    fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace",
  }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase",
      color: C.gold, fontFamily: "'Courier Prime', monospace",
      borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10,
    }}>{title}</div>
    {children}
  </div>
);

export default function LeftyGomezCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GOMEZ_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`,
      padding: "24px 12px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>
          Infinity League Baseball
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>
          Player Card Generator — Test Output
        </div>
      </div>

      {/* Card Container */}
      <div style={{
        width: "100%", maxWidth: 420,
        background: C.parchment,
        borderRadius: 8,
        border: `3px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`,
        overflow: "hidden",
      }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{
          width: "100%", padding: "8px 0",
          background: C.darkBrown, border: "none", cursor: "pointer",
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
        }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{
              width: "100%", aspectRatio: "1/1",
              background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`,
              border: `2px solid ${C.gold}60`,
              borderRadius: 4,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Lanky lefty mid-delivery, grinning, Yankees pinstripes, golden Yankee Stadium light, plane in distant sky]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
            </div>

            {/* Name Block */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            {/* ILB Stats — Pitcher Version */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.gold} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.warmRed} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats Strip — Pitcher Version */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "IP", val: d.real_stats.innings },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "SHO", val: d.real_stats.shutouts },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "WAR", val: d.real_stats.war },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {["🏆 HOF 1972", "🏆 5× WS Champ", "👑 2× Triple Crown", "⭐ 7× All-Star", "🔥 6-0 World Series", "📊 189-102 (.649)"].map((a, i) => (
                <span key={i} style={{
                  fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`,
                  padding: "2px 8px", borderRadius: 10, color: C.medBrown,
                  fontFamily: "'Courier Prime', monospace",
                }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK OF CARD — DOSSIER ═══════════ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16,
              borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8,
            }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                  <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                  <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                  <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                  <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                  <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                  <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
                    {d.chemistry_traits.map((t, i) => (
                      <div key={i} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                        <span style={{ color: C.medBrown }}>{t.desc}</span>
                      </div>
                    ))}
                  </Section>
                  <Section title="Preferred Locations">
                    {d.preferred_locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">
                    {d.momentum.hot_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="❄ Cold Triggers">
                    {d.momentum.cold_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p>
                  </Section>
                </>
              )}

              {tab === "actions" && (
                <>
                  <Section title="Action Card Seeds">
                    <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      These events, derived from Gomez's real life, become universal cards playable in any game.
                    </p>
                    {d.action_card_seeds.map((a, i) => (
                      <div key={i} style={{
                        background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`,
                        borderRadius: 4, padding: 10, marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                          <span style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 2,
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                            fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          }}>{a.type}</span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                        <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "engine" && (
                <>
                  <Section title="Pitcher Stat Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      Pitchers use STF/CTL/STA instead of CON/POW/SPD.
                    </p>
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>
                          {key} — {data.metric || data.formula}
                        </div>
                        {data.tiers && (
                          <div style={{ marginTop: 4 }}>
                            {data.tiers.map((t, i) => (
                              <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>
                                {t.range} → {t.value !== undefined ? t.value : t.label}
                              </div>
                            ))}
                          </div>
                        )}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Gomez's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          background: C.darkBrown, padding: "6px 16px",
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
        }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{
        width: "100%", maxWidth: 420, marginTop: 20,
        background: "#1a150e", borderRadius: 6, padding: 16,
        border: `1px solid ${C.gold}30`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>
          JSON EXPORT PREVIEW
        </div>
        <pre style={{
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace",
          whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4,
          maxHeight: 200, overflow: "auto",
        }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  position: d.position,
  era: d.era,
  ilb_team: d.ilb_team,
  stats: d.ilb_stats,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
