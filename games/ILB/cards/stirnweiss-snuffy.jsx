import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: SNUFFY STIRNWEISS
  // Year Snapshot: 1944 (Peak Season — Led AL in Hits, Runs, 3B, SB)
  // ═══════════════════════════════════════════════════════════════

  name: "Snuffy Stirnweiss",
  nickname: "The Bronx Express",
  year: 1944,
  team: "New York Yankees",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "2B",
  bats: "R",
  throws: "R",
  height: "5'8\"",
  weight: "175 lbs",
  born: "October 26, 1918 — New York, NY",
  died: "September 15, 1958 — Newark Bay, NJ (age 39, train wreck)",
  hof: "Not inducted. 1945 AL Batting Champ, 3× WS Champ, .268 career BA in 10 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1944 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Pinstripe Alley
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1944,
    games: 154,
    at_bats: 643,
    hits: 205,
    doubles: 35,
    triples: 16,
    home_runs: 8,
    rbi: 43,
    stolen_bases: 55,
    batting_avg: ".319",
    obp: ".389",
    slg: ".460",
    ops: ".849",
    ops_plus: 139,
    war: 8.6,
    all_star: 2,
    career_avg: ".268",
    career_hits: 989,
    career_hr: 29,
    career_sb: 134,
    career_war: 24.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .319 → tier 4 (.300-.329). OPS+ 139 → +1 = 5, cap 5.
  // POWER (POW) — 8 HR → tier 0 (0-9). SLG .460 → no bonus (<.500). POW = 0.
  // SPEED (SPD) — 55 SB → tier 3 (31-50+). No GG (pre-1957). SPD = 3.
  // DEFENSE (DEF) — Led AL 2B in fielding %, putouts, assists in '44.
  //   Pre-GG equivalent: 3-5 GG. DEF = 2.
  // CLUTCH (CLU) — 1947 WS: .259 BA, .429 OBP, played all 7 games.
  //   PS BA .250-.299 → tier 1. No singular hero moment. CLU = 1.
  // OVERALL — Raw: 5×2 + 0×1.5 + 3×1 + 2×0.5 = 14 → normalized.
  //   Wartime-era star, 3× WS champ, but career declined sharply.
  //   OVR = 7 (All-Star tier — wartime peak, not sustained greatness).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — wartime peak, 3× WS champ, but brief prime
    con: 5,      // .319 BA → tier 4. OPS+ 139 → +1 = 5. Maximum contact in peak.
    pow: 0,      // 8 HR → tier 0. SLG .460 → no bonus. Zero power.
    spd: 3,      // 55 SB → tier 3 (max). Fastest Yankee of his era.
    def: 2,      // Led AL 2B in fielding %, putouts, assists. Pre-GG equivalent ~3-5 GG. DEF = 2.
    clu: 1,      // 1947 WS .259/.429. Solid but not heroic. CLU = 1.
  },

  stat_justification: {
    con: ".319 BA in 1944, led AL with 205 hits. Won 1945 AL batting title (.309). Led AL in hits both years. 11:1 BB:K is an exaggeration for Stirnweiss, but he was a contact-first hitter who rarely struck out in '44. OPS+ 139 triggers +1 bonus. Maximum contact at peak.",
    pow: "8 HR in 1944, only 29 career HR in 10 seasons. Stirnweiss was a slap-and-dash hitter — triples (16) and doubles (35) were his extra-base game, not home runs. SLG .460 misses the .500 bonus threshold. Rating of 0 — no power whatsoever.",
    spd: "55 SB in 1944 — led the AL and set a Yankees franchise record. Led AL again in 1945 with 33. 134 career SB. 66 triples in career. 'The Bronx Express' earned his name. By the SB tiers, 55 SB → max tier 3. This is maximum speed.",
    def: "Led AL second basemen in fielding percentage, putouts, and assists in 1944. Set MLB record .993 fielding % at 2B in 1948 (only 5 errors). Pre-Gold Glove era equivalent: 3-5 GG. Rating of 2.",
    clu: "Three World Series rings (1943, 1947, 1949). In 1947 WS hit .259 but drew 8 walks (.429 OBP) in all 7 games. Minimal role in '43 and '49 WS. Solid contributor but no defining hero moment. Rating of 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet workhorse, not vocal. Stirnweiss led by filling in wherever needed — shortstop, second base, third base — without complaint. When Joe Gordon went to war, Stirnweiss simply became the best second baseman in the AL. When Gordon came back, Stirnweiss moved to third. No ego, just production. He later advised Phil Rizzuto to 'cool off' when the Scooter was furious about being released — great advice that led to Rizzuto's broadcasting career.",
    temperament: "Even-keeled, humble, team-first. Stirnweiss never seemed to let the wartime asterisks bother him publicly. He held out briefly before 1946 over salary but settled quickly. Dan Daniel called him a player who was 'keeping things stirred up, win or lose' — energetic on the field, calm off it.",
    work_ethic: "Three-sport star (football, basketball, baseball) at Fordham Prep and UNC. NFL second-round draft pick who chose baseball. Coached football, basketball, and baseball in offseasons at multiple schools. After retirement, managed minor league teams, ran youth baseball programs, worked in banking. Never stopped moving.",
    lifestyle: "Bronx boy who played for his hometown team. Married, father of six children. Lived in Red Bank, NJ. After baseball, worked in banking and freight. Commuted daily by train from New Jersey to Manhattan. Deeply involved in youth baseball — was running the NY Journal-American sandlot program when he died. The nickname 'Snuffy' came from his tobacco habit — chewing tobacco, cigars, a teammate asked 'What, no snuff?'",
    era_adaptability: "COMPLEX. Stirnweiss's wartime peak raises the eternal question: was he genuinely great, or just the best of what was left? His speed and defense would translate to any era. His contact skills were real. But his power was nonexistent, and his career .268 BA suggests the wartime numbers were inflated. In ILB terms: Stirnweiss is a high-floor, low-ceiling card — elite speed and defense, but fragile batting value.",
    clubhouse_impact: "POSITIVE-UNDERSTATED. Never the loudest voice, but universally liked. Filled whatever role was needed. Three-time champion. The kind of player managers love — no drama, maximum effort. His advice to Rizzuto showed emotional intelligence beyond the diamond.",
    dark_side: "The tragic ending. On September 15, 1958, Stirnweiss's commuter train ran through signals and plunged off the Newark Bay drawbridge into the water. Forty-eight people died, including Stirnweiss. He was 39, with six children — the youngest only 17 months old. He had suffered a heart attack the year before and was rebuilding his life. In ILB terms: Stirnweiss carries a 'Fragile Mortality' trait — a reminder that the game's heroes are human beings with finite, uncertain lives.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Wartime Star", desc: "Peak performance during WWII depleted rosters. +2 OVR when facing weakened teams. -1 OVR when roster is at full strength." },
    { tag: "Bronx Express", desc: "Maximum speed on the basepaths. Can attempt SB in any count. 83% success rate at peak." },
    { tag: "Utility Man", desc: "Can play SS, 2B, or 3B with no defensive penalty. Fill any infield hole." },
    { tag: "Three-Sport Star", desc: "NFL draftee, basketball captain, baseball pro. +1 to athletic checks in any non-baseball situation." },
    { tag: "Tobacco Man", desc: "Always chewing or smoking. No gameplay effect, but adds flavor to every scene. Trademark quirk." },
    { tag: "Quiet Advisor", desc: "Can defuse one teammate crisis per season with calm, measured advice. Prevents chemistry collapse." },
    { tag: "Forgotten Champion", desc: "Three WS rings but barely remembered. -1 legacy score. Opponents underestimate him (+1 surprise factor in playoffs)." },
    { tag: "Newark Bay", desc: "Tragic death at age 39. If Stirnweiss is on your roster when a random tragedy event fires, he is the first affected." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Practice Field", affinity: "HIGH", note: "Three-sport athlete. Always training, always moving. Speed work and infield drills." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Quiet but present. The guy who keeps the locker room steady during turbulence." },
    { location: "Community Events / Youth Baseball", affinity: "HIGH", note: "Ran sandlot programs, coached at prep schools and colleges in offseasons." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social enough, family man. Team dinners." },
    { location: "Train Station / Commute", affinity: "MEDIUM", note: "Daily commuter from Red Bank to Manhattan. The train was his routine — and his fate." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a nightlife player. Stomach ulcers limited his drinking." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Clean-living family man." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Second-half surges — in 1944, hit .352/.413/.536 after the All-Star break",
      "Filling in for absent stars — Stirnweiss gets better when the spotlight is suddenly his",
      "Stolen base streaks — when the running game is working, his confidence soars",
      "Batting title races — pushed himself to .309 on the final day of 1945 to win the crown",
    ],
    cold_triggers: [
      "Return of superior talent — when Gordon/DiMaggio/Rizzuto came back, Stirnweiss shrank",
      "Position changes — moving to 3B in 1946 disrupted his rhythm at the plate",
      "Health issues — stomach ulcers, later a heart attack, sapped his energy in later years",
    ],
    pressure_response: "SOLID BUT CONTEXTUAL. Stirnweiss thrived under the specific pressure of the wartime era — when he was THE guy, he delivered MVP-caliber seasons. But when the pressure shifted to proving he belonged alongside returning stars, he wilted. In the 1947 World Series, he was steady (.259, 8 BB, .429 OBP) but not spectacular. Stirnweiss is the card you play when you need a reliable contributor, not a singular hero.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Wartime Replacement",
      type: "Action",
      text: "Your All-Star at a key position ships out to military service. His backup steps into the lineup. Roll d6: on 4+, the backup has a breakout season (+3 OVR for the year). On 1-3, he's a replacement-level fill-in (-1 OVR).",
      origin: "When Joe Gordon left for WWII, Stirnweiss stepped in and led the AL in hits, runs, triples, and stolen bases in 1944. He went from .219 utility man to batting champion in two years.",
    },
    {
      title: "Batting Title on the Final Day",
      type: "Game Action",
      text: "It's the last game of the season. Your player trails the batting leader by .003 points. The opponent's game is rained out. Your player goes 3-for-5 and steals the batting crown by a single point.",
      origin: "On the final day of 1945, Stirnweiss went 3-for-5 to finish at .309, edging Tony Cuccinello (.308) whose game was rained out. One of the tightest batting races ever.",
    },
    {
      title: "What, No Snuff?",
      type: "Drama",
      text: "A new player arrives in the clubhouse with chewing tobacco in his cheek and a cigar in his hand. A veteran quips about his tobacco habit and gives him a nickname that sticks forever. +1 clubhouse chemistry — everybody loves a good nickname.",
      origin: "Teammate Hank Majeski saw Stirnweiss with chewing tobacco and a cigar and asked 'What, no snuff?' The nickname 'Snuffy' stuck for life.",
    },
    {
      title: "The NFL Draft Pick",
      type: "Drama",
      text: "Your multi-sport prospect has been drafted by a professional football team. He must choose: football (guaranteed contract, higher injury risk) or baseball (lower pay, longer career). If he chooses baseball, +1 SPD from his football training.",
      origin: "Stirnweiss was a 2nd-round NFL pick by the Chicago Cardinals in 1940. He chose baseball with the Yankees instead, believing it offered a longer career.",
    },
    {
      title: "Fifty-Five Stolen Bases",
      type: "Game Action",
      text: "Your speedster has the green light all season. He sets a franchise record for stolen bases. Opposing catchers are demoralized (-1 to their throw-out rate for the rest of the season). But the baserunning takes a physical toll — 10% chance of hamstring injury.",
      origin: "Stirnweiss stole 55 bases in 1944 — a Yankees franchise record that stood for decades. He was caught only 11 times (83% success rate).",
    },
    {
      title: "Cool Off and Take a Vacation",
      type: "Action",
      text: "A teammate has just been cut/released and is furious. Your quiet veteran pulls him aside and says: 'Cool off. Take a vacation. Come back with a clear head.' If the cut player listens, he unlocks a new career path (broadcasting, coaching, or front office).",
      origin: "When the Yankees released Rizzuto in 1956, Stirnweiss advised him to take a vacation instead of popping off. Rizzuto did — and was offered the broadcasting job that made him famous.",
    },
    {
      title: "The Newark Bay Disaster",
      type: "Drama",
      text: "A former player dies in a transportation accident. The entire league mourns. All teams lose -1 morale for 3 games. But the deceased player's legacy gains +3 permanent — he is remembered more fondly in death than he was in life.",
      origin: "On September 15, 1958, Stirnweiss died at age 39 when his commuter train plunged off the Newark Bay drawbridge. 48 people perished. He left behind six children.",
    },
    {
      title: "The Asterisk Season",
      type: "Drama",
      text: "Your player just had an incredible statistical season — but critics say the competition was weakened. His batting title is dismissed as a 'wartime fluke.' Player must choose: ignore the critics (no effect) or try harder next year to prove them wrong (50% chance of burnout, 50% chance of another great year).",
      origin: "Stirnweiss's 1945 batting title (.309) was the lowest to win since 1905. Critics forever attached an asterisk. When the stars returned in 1946, he never hit .300 again.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, stocky build at 5'8\" 175 lbs. Round, boyish face with a determined expression. Dark hair under cap. Not conventionally handsome — workmanlike, scrappy. The look of a guy who'd run through a wall for you and then chew tobacco on the other side.",
    attire: "New York Yankees road grays, 1944 style. Number 1. Wartime-era wool flannel, slightly baggier than usual. Pinstripes visible. Cap with interlocking NY (omit for copyright — use plain cap). Tobacco bulge in cheek optional.",
    mood: "Kinetic energy barely contained. Mid-steal pose — leaning toward second base, weight on the balls of his feet, eyes locked on the pitcher. Or rounding third at full speed, dust trail behind him. Speed incarnate.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Yankee Stadium in wartime — flags at half-staff or military insignia subtle in the background. The card should feel urgent and fleeting — this is a man who burned bright and fast.",
    reference: "Think wartime baseball photography — slightly grainier, more urgent than peacetime cards. Stirnweiss in motion, always in motion. The card should feel like it's about to run off the frame.",
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

export default function SnuffyStirnweissCard() {
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
                [AI Portrait: Sepia-toned, mid-steal pose, Yankees #1, wartime Yankee Stadium]
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
              {["👑 1945 AL Batting Champ", "🏆 3× WS Champ", "⭐ 2× All-Star", "🦶 55 SB (1944)", "📊 Led AL Hits 2×", "🔺 Led AL Triples 2×"].map((a, i) => (
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
                      These events, derived from Stirnweiss's real life, become universal cards playable in any game.
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
                  <Section title="Stirnweiss's Derivation">
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
