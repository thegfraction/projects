import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: LOU BOUDREAU
  // Year Snapshot: 1948 (Peak Season — MVP, World Series Champion)
  // ═══════════════════════════════════════════════════════════════

  name: "Lou Boudreau",
  nickname: "Old Shufflefoot",
  year: 1948,
  team: "Cleveland Indians",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SS",
  bats: "R",
  throws: "R",
  height: "5'11\"",
  weight: "185 lbs",
  born: "July 17, 1917 — Harvey, IL",
  died: "August 10, 2001 — Olympia Fields, IL",
  hof: "Class of 1970 (BBWAA, 77.3%). AL MVP 1948, WS Champ 1948.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1948 PEAK SEASON
  // Source: Baseball-Reference, BR Bullpen, Baseball Hall of Fame
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1948,
    games: 152,
    at_bats: 560,
    hits: 199,
    doubles: 34,
    triples: 6,
    home_runs: 18,
    rbi: 106,
    stolen_bases: 3,
    batting_avg: ".355",
    obp: ".453",
    slg: ".534",
    ops: ".987",
    ops_plus: 165,
    war: 10.4,
    walks: 98,
    strikeouts: 9,
    all_star: 7,
    career_avg: ".295",
    career_hits: 1779,
    career_hr: 68,
    career_sb: 51,
    career_war: 63.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .200-.249 = 1 | .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ 130+ adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG .500+ adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + positional range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove at CF/SS adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — Based on Gold Gloves + reputation
  //   No GG = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //   Pre-1957: use equivalent Gold Gloves
  //
  // CLUTCH (CLU) — Postseason BA + signature moments
  //   PS BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   WS hero moment → +1 (cap 3)
  //
  // OVERALL (OVR) — CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite / MVP — 1948 MVP, HOF, dominant decade
    con: 5,      // .355 BA → tier 5. OPS+ 165 → +1 = 6, capped at 5. Maximum contact.
    pow: 2,      // 18 HR → tier 1. SLG .534 → +1 bonus. POW = 2.
    spd: 0,      // 3 SB → tier 0. No GG (pre-1957). "Slowest player since Lombardi." SPD = 0.
    def: 3,      // Led AL SS in fielding % 8 consecutive years. Equivalent to 6+ GG. DEF = 3.
    clu: 2,      // WS .273 → tier 1. Playoff game 4-for-4 with 2 HR = hero moment → +1. CLU = 2.
  },

  stat_justification: {
    con: ".355 BA in 1948 — 2nd in AL behind only Ted Williams. Led all 1940s players with 1,578 hits in the decade. OPS+ 165. Only 9 strikeouts in 560 AB — nearly 11:1 BB:K ratio. Career .295. Won 1944 batting title (.327). Maximum contact.",
    pow: "18 HR in 1948 — career-high. Only 68 career HR. Boudreau was a doubles hitter (385 career 2B, led AL 3 times) not a slugger. SLG .534 in '48 adds +1 bonus. Rating of 2 — gap power, not over-the-fence power.",
    spd: "3 SB in 1948. 51 career SB. Boudreau had arthritic ankles from basketball injuries. Stanley Frank called him 'the slowest ballplayer since Ernie Lombardi.' No speed bonus. SPD = 0.",
    def: "Led AL shortstops in fielding percentage 8 consecutive seasons (1940-1948). Led in DP turned multiple times. Compensated for lack of range with extraordinary positioning and quick hands. Pre-Gold Glove era equivalent: 6+ GG. Maximum defense rating.",
    clu: "Hit .273/.333/.455 in 1948 World Series with 3 RBI. But the defining moment: the one-game playoff at Fenway — 4-for-4 with 2 home runs to clinch the pennant. Also led off 1942 All-Star Game with a home run. Rating of 2 — consistently big in the biggest moments.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Player-manager from age 24. Boudreau led by intellectual authority and tactical brilliance, not volume. He was the youngest manager in ML history at his appointment and the only man to win both the MVP and the World Series as a player-manager in the same season. He led by preparation, positioning charts, and cool decision-making under fire.",
    temperament: "Calm, cerebral, fiercely competitive beneath a polished exterior. Never rattled. Bill McKechnie called him 'the greatest shortstop and leader I have ever seen.' Boudreau's composure in the playoff game — pinch-hitting himself while icing injuries during a doubleheader, going 4-for-4 when everything was on the line — defined his temperament: ice water in the veins.",
    work_ethic: "Exceptional. Two-sport college star (basketball All-American, baseball captain at Illinois). Earned his B.S. in Education while playing professional baseball. Studied hitters obsessively — invented the 'Boudreau Shift' against Ted Williams by analyzing spray charts. Coached Illinois freshman basketball while playing in the majors.",
    lifestyle: "College-educated, articulate, photogenic. Nicknamed 'Handsome Lou.' Married Della DeRuiter in 1938. Father of four. Later became a beloved Cubs radio broadcaster for 30 years. Lived a stable, middle-class Midwestern life — Harvey, IL to Olympia Fields. His father-in-law was later revealed to be Denny McLain's father-in-law too (Boudreau's daughter married McLain).",
    era_adaptability: "VERY HIGH. Boudreau was the prototype of the modern thinking shortstop — Jeter before Jeter, but with better defense. His lack of speed would hurt in any era, but his bat control (9 K in 560 AB), defensive positioning, and managerial mind would translate anywhere. In the analytics era, Boudreau would be a front-office darling.",
    clubhouse_impact: "COMMANDING. As player-manager, Boudreau set the tone. He supported Larry Doby's integration of the AL — a quiet but significant act. He managed personalities like Bob Feller, Satchel Paige, and Bill Veeck's circus atmosphere with steady grace. Players respected him because he led from the field, not the bench.",
    dark_side: "The tension with Bill Veeck. After the 1947 season, Veeck nearly traded Boudreau for Vern Stephens — the fans revolted and saved Lou's job. Even after winning the 1948 World Series, Veeck brought in Hank Greenberg as a shadow authority. Boudreau was fired after 1950 despite his 1948 heroics. The lesson: even the greatest seasons don't guarantee loyalty. In ILB terms, Boudreau carries a 'Front Office Friction' trait — his relationship with ownership is always fragile.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Player-Manager", desc: "Can serve as both starter and manager. Reduces need for a separate manager card. +1 tactical bonus to entire lineup." },
    { tag: "Tactician", desc: "Invented the Boudreau Shift. Once per game, can reposition fielders to counter a specific batter's tendencies." },
    { tag: "Two-Sport Star", desc: "Basketball All-American. Versatile athlete — can play multiple positions in emergencies despite lack of speed." },
    { tag: "Integration Ally", desc: "Supported Larry Doby's integration of the AL. +1 chemistry with Black players. Reduces racial tension events." },
    { tag: "Contact Master", desc: "9 strikeouts in 560 AB. Nearly impossible to strike out. -1 to opposing pitcher's K rating when Boudreau bats." },
    { tag: "Front Office Friction", desc: "Ownership may undermine Boudreau despite results. 10% chance per season of forced trade or firing after winning." },
    { tag: "Broadcaster", desc: "After playing career, becomes a team broadcaster. +1 to franchise legacy and fan engagement in later eras." },
    { tag: "Gimpy Ankles", desc: "Arthritic ankles from basketball. Speed permanently 0. But no further injury risk — he's already adapted." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Manager's Office / Film Room", affinity: "HIGH", note: "Studying spray charts, planning lineups, inventing shifts. Boudreau's mind never stopped." },
    { location: "Practice Field", affinity: "HIGH", note: "Positioning drills, DP practice, batting practice. Preparation was his religion." },
    { location: "University / Library", affinity: "MEDIUM", note: "B.S. in Education from Illinois. Coached college basketball. Intellectual by ballplayer standards." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social, polished, comfortable in public. 'Handsome Lou' was always presentable." },
    { location: "Radio Booth", affinity: "MEDIUM", note: "30-year Cubs broadcaster. Loved explaining the game to fans." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a drinker or carouser. Too busy managing and playing to have much nightlife." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Clean-living family man." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Boudreau elevated in September, especially 1948",
      "One-game playoffs or elimination scenarios — the Fenway game defined his career",
      "Playing through injuries — pain made him more dangerous, not less",
      "Tactical challenges — facing elite hitters like Williams activated his strategic mind",
    ],
    cold_triggers: [
      "Front office interference — Veeck/Greenberg meddling sapped his confidence in 1949-50",
      "Ankle flare-ups — when the arthritis got severe, his range and bat speed suffered",
      "Losing streaks as manager — shouldered blame for both the team's play and his own",
    ],
    pressure_response: "ELITE. Boudreau is one of the rarest cards in the game: a player-manager who gets better when everything is on the line. The 1948 playoff game at Fenway — 4-for-4, 2 HR, while managing every pitch — is the archetype. He also pinch-hit himself while injured during a crucial doubleheader and delivered a game-tying hit through the legs of Joe Page. Boudreau doesn't crack under pressure; he calculates through it.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Boudreau Shift",
      type: "Game Action",
      text: "Your manager repositions all infielders to one side of the diamond against a pull hitter. The batter must choose: swing away into the shift (-2 to hit), or bunt to the open side (guaranteed single, but ego check required).",
      origin: "Boudreau invented the radical defensive shift against Ted Williams in 1946, moving all infielders to the right side. It became a permanent part of baseball strategy.",
    },
    {
      title: "Four-for-Four in the Playoff",
      type: "Game Action",
      text: "In a win-or-go-home game, your player-manager goes 4-for-4 with 2 home runs. The game is never in doubt. Your team clinches the pennant.",
      origin: "Boudreau went 4-for-4 with 2 HR in the 1948 AL playoff game at Fenway Park, clinching the pennant in an 8-3 win over the Red Sox.",
    },
    {
      title: "The Boy Manager",
      type: "Drama",
      text: "Your owner appoints a 24-year-old player as manager. Veterans grumble. If the team finishes above .500 in his first year, all chemistry penalties vanish. If below .500, the player-manager is fired and his OVR drops by 1.",
      origin: "Boudreau was named Indians player-manager at age 24 in 1942 — the youngest in ML history to start a season as manager. He won the World Series six years later.",
    },
    {
      title: "Stopping the Streak",
      type: "Game Action",
      text: "An opposing player is on a historic hitting streak. Your shortstop snags a bad-hop grounder barehanded and starts a double play. The streak is over.",
      origin: "Boudreau's barehanded grab and DP on July 17, 1941, was the final play in ending Joe DiMaggio's 56-game hitting streak (with Keltner's two stops at third).",
    },
    {
      title: "Playing Through the Pain",
      type: "Action",
      text: "Your star has a shoulder contusion, bruised knee, sore thumb, and sprained ankle. He can sit — or he can pinch-hit himself. If he plays: roll d6. On 3+, he delivers a clutch hit and your team sweeps. On 1-2, injury worsens and he misses 10 games.",
      origin: "During a 1948 doubleheader, Boudreau was icing down multiple injuries in the dugout. Down 6-1, he announced himself as a pinch-hitter and ripped a game-tying single through Joe Page's legs. The Indians swept.",
    },
    {
      title: "The Fans Save Your Job",
      type: "Drama",
      text: "The owner wants to trade your player-manager. But the fans revolt — petitions, newspaper campaigns, radio call-ins. The owner backs down. Your manager stays, but now has a 'Prove It' condition: win the pennant next year or be fired.",
      origin: "After 1947, Bill Veeck planned to trade Boudreau for Vern Stephens. Cleveland fans erupted in protest. Veeck kept Boudreau — who then won the 1948 MVP and World Series.",
    },
    {
      title: "Snakes on a Train",
      type: "Drama",
      text: "A prankster coach releases two live snakes on the team train. Your manager must decide: laugh it off (+1 clubhouse fun, -1 discipline) or throw the coach off the train (+1 authority, coach is fired).",
      origin: "In 1947, Indians coach Jackie Price let two snakes loose on the team train. Boudreau forced Price off at the next stop. Price was fired shortly after.",
    },
    {
      title: "The Two-Sport Captain",
      type: "Action",
      text: "Your player was a college basketball star. In the offseason, he coaches the freshman basketball team at his alma mater. +1 to his mental stats. But the basketball gives him arthritic ankles — SPD permanently drops by 1.",
      origin: "Boudreau captained both the basketball and baseball teams at Illinois, was an NCAA Basketball All-American, and coached freshman basketball while playing for Cleveland. The basketball ruined his ankles.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Handsome, clean-cut face with strong jawline and warm brown eyes. 5'11\" 185 lbs — lean, athletic but not bulky. Nicknamed 'Handsome Lou.' Looked more like a college professor than a ballplayer. French-Canadian features — refined, photogenic.",
    attire: "Cleveland Indians home whites, 1948 style. Number 5. Classic late-1940s wool flannel, baggy pants. Indians script across chest. Cap slightly tilted. Glove tucked under arm or in ready position at shortstop.",
    mood: "Calm command. The look of a man who is simultaneously playing shortstop, managing the pitching staff, calculating defensive alignments, and batting .355. Not fierce — serene. The quiet confidence of someone who knows exactly what he's going to do next.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Cleveland Municipal Stadium in soft focus behind him. Late afternoon light. The card should feel intellectual and assured — this is the thinking man's ballplayer.",
    reference: "Think 1948 Leaf card quality but with cinematic depth. Boudreau at shortstop, mid-throw to first on a pivot — the double play that defined his career. Or in the dugout with a lineup card, the player-manager in his natural habitat.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY (HITTER)
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: {
    metric: "Batting Average + OPS+",
    tiers: [
      { range: ".200-.249", value: 1 },
      { range: ".250-.269", value: 2 },
      { range: ".270-.299", value: 3 },
      { range: ".300-.329", value: 4 },
      { range: ".330+", value: 5 },
    ],
    bonus: "OPS+ ≥ 130 → +1 (cap 5)",
  },
  power: {
    metric: "Home Runs (peak season) + SLG",
    tiers: [
      { range: "0-9 HR", value: 0 },
      { range: "10-19 HR", value: 1 },
      { range: "20-29 HR", value: 2 },
      { range: "30-39 HR", value: 3 },
      { range: "40-49 HR", value: 4 },
      { range: "50+ HR", value: 5 },
    ],
    bonus: "SLG ≥ .500 → +1 (cap 5)",
  },
  speed: {
    metric: "Stolen Bases (peak) + positional range",
    tiers: [
      { range: "0-5 SB", value: 0 },
      { range: "6-15 SB", value: 1 },
      { range: "16-30 SB", value: 2 },
      { range: "31-50 SB", value: 3 },
    ],
    bonus: "Gold Glove at CF/SS → +1 (cap 3)",
  },
  defense: {
    metric: "Gold Gloves + positional reputation",
    tiers: [
      { range: "No Gold Glove", value: 0 },
      { range: "1-2 GG", value: 1 },
      { range: "3-5 GG", value: 2 },
      { range: "6+ GG", value: 3 },
    ],
  },
  overall: {
    formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13",
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
    metric: "Postseason BA + signature moments",
    tiers: [
      { range: "PS BA < .250", value: 0 },
      { range: "PS BA .250-.299", value: 1 },
      { range: "PS BA .300+", value: 2 },
    ],
    bonus: "World Series hero moment → +1 (cap 3)",
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

export default function LouBoudreauCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
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
          Player Card — Allies Era
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
          /* ═══════════ FRONT OF CARD ═══════════ */
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
                [AI Portrait: Sepia-toned, calm command pose, Indians #5, Cleveland Municipal Stadium]
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

            {/* ILB Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats Strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war },
                { label: "HITS", val: d.real_stats.hits },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
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
              {["🏆 HOF 1970", "🏅 1948 AL MVP", "🏆 1948 WS Champ", "⭐ 7× All-Star", "👑 1944 Batting Title", "🧠 Player-Manager"].map((a, i) => (
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
            {/* Dossier Header */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

            {/* Tab Navigation */}
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

            {/* Tab Content */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership">
                    <p style={{ margin: 0 }}>{d.personality.leadership_style}</p>
                  </Section>
                  <Section title="Temperament">
                    <p style={{ margin: 0 }}>{d.personality.temperament}</p>
                  </Section>
                  <Section title="Work Ethic">
                    <p style={{ margin: 0 }}>{d.personality.work_ethic}</p>
                  </Section>
                  <Section title="Lifestyle">
                    <p style={{ margin: 0 }}>{d.personality.lifestyle}</p>
                  </Section>
                  <Section title="Era Adaptability">
                    <p style={{ margin: 0 }}>{d.personality.era_adaptability}</p>
                  </Section>
                  <Section title="Clubhouse Impact">
                    <p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p>
                  </Section>
                  <Section title="⚠ Hidden Complexity">
                    <p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p>
                  </Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
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
                      These events, derived from Boudreau's real life, become universal cards playable in any game.
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
                  <Section title="Stat Conversion Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      This is the reusable formula for converting real Baseball Reference stats into ILB card values.
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
                  <Section title="Boudreau's Derivation">
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
