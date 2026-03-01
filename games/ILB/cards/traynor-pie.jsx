// /cards/players/pie-traynor.jsx
import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: PIE TRAYNOR
  // Year Snapshot: 1927 (Pennant Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Pie Traynor",
  nickname: "Pie",
  year: 1927,
  team: "Pittsburgh Pirates",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "3B",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "170 lbs",
  born: "November 11, 1898 — Framingham, MA",
  died: "March 16, 1972 — Pittsburgh, PA (age 73)",
  hof: "Class of 1948 (BBWAA, 76.9%). First 3B elected by writers. Named to MLB All-Century Team ballot.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1927 SEASON
  // Source: Baseball-Reference, SABR BioProject, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1927,
    games: 149,
    at_bats: 573,
    hits: 196,
    doubles: 32,
    triples: 9,
    home_runs: 5,
    rbi: 106,
    stolen_bases: 7,
    batting_avg: ".342",
    obp: ".377",
    slg: ".454",
    ops: ".831",
    ops_plus: 119,
    war: 4.2,
    gold_gloves: "N/A (pre-award)",
    all_star: "2× (1933-34, inaugural games)",
    career_avg: ".320",
    career_hits: 2416,
    career_hr: 58,
    career_sb: 158,
    career_war: 37.0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON): .342 BA → tier 5 (.330+). OPS+ 119 — below 130 threshold, no bonus. CON 5.
  // POWER (POW): 5 HR → tier 0 (0-9 HR). SLG .454 — below .500, no bonus. POW 0.
  // SPEED (SPD): 7 SB → tier 1 (6-15 SB). No Gold Glove bonus (3B). SPD 1.
  // DEFENSE (DEF): Pre-GG era. Led NL 3B in putouts 7×, DPs 4×, assists 3×. NL record 41 DPs 1925. Branch Rickey called him "mechanically perfect." Equivalent of 6+ GG. DEF 3.
  // CLUTCH (CLU): .346 in 1925 WS (HR off Walter Johnson). .200 in 1927 WS (swept). Combined WS BA ~.262. CLU 1.
  // OVERALL: CON(5)×2 + POW(0)×1.5 + SPD(1)×1 + DEF(3)×0.5 = 10+0+1+1.5 = 12.5 → normalized ~7 (All-Star)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — elite contact/defense, zero power
    con: 5,      // .342 BA in 1927, .320 career. .300+ ten times. Only 278 career K. Maximum contact.
    pow: 0,      // 5 HR in 1927, 58 career. Forbes Field killed power. Triples/doubles man, not a slugger.
    spd: 1,      // 7 SB in 1927. 158 career SB, but by '27 not a basepath threat. 9 3B shows some wheels.
    def: 3,      // Greatest 3B of his era. Led NL 3B in putouts 7×, DPs 4×, assists 3×. "Mechanically perfect." Max defense.
    clu: 1,      // .346 in 1925 WS (great) but .200 in 1927 WS (swept). Mixed postseason record. CLU 1.
  },

  stat_justification: {
    con: "Career .320 BA — 10 seasons over .300. In 1927: .342 BA. Career high .366 in 1930. Only 278 strikeouts in 7,559 career AB — one of the hardest men in baseball history to strike out. In 1929, fanned just 7 times in 597 PA. In 1928, struck out once in 150 August PA. Maximum contact rating of 5.",
    pow: "5 HR in 1927. Career high was 12 HR (1923). Career total: 58 HR in 17 seasons. Forbes Field was the most difficult HR park in the NL — but even adjusting for park, Traynor had virtually no power. He compensated with 164 career triples and 371 doubles. Rating of 0 — contact hitter, not a power hitter.",
    spd: "7 SB in 1927. 158 career SB with a peak of 28 in 1923 — but by his peak years, speed had declined. 9 triples in 1927 suggest above-average speed for a third baseman. No Gold Glove bonus (3B position). Rating of 1.",
    def: "The greatest third baseman of the first half of the 20th century. Led NL 3B in putouts 7 times, double plays 4 times, assists 3 times. Set NL record with 41 DPs in 1925 (stood 25 years). His 226 putouts in 1925 remain the highest NL total since 1905. Branch Rickey: 'A mechanically perfect third baseman. A man of intellectual worth on the field of play.' McGraw, Cobb, Hornsby, and Paul Waner all called him the best 3B ever. Pre-Gold Glove era equivalent of 6+ GG. Maximum defense rating of 3.",
    clu: "Mixed postseason. In 1925 WS: .346 BA, HR off Walter Johnson, 24 chances/0 errors — a hero. In 1927 WS: .200 (3-for-15), swept by Yankees. Combined WS BA approximately .262 — tier 1 (.250-.299). No iconic clutch moment that pushes him higher. The 1925 WS was great but the 1927 collapse balances it. Rating of 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet authority. Traynor was player-manager from 1934-37 and full manager through 1939. He led by example — relentless work at third base, consistent at-bats, never showing up teammates. Earned respect through competence rather than volume. Branch Rickey's phrase 'intellectual worth on the field' captures it: Traynor was a thinker, not a shouter.",
    temperament: "Even-keeled, modest, gracious. Traynor never complained about Forbes Field killing his power numbers. When his reputation diminished in later decades as Schmidt, Brett, and Brooks Robinson emerged, he didn't campaign for re-evaluation. A man without ego. He once walked 127 blocks from his NYC hotel to the stadium rather than take a cab — not to save money, but because he liked walking.",
    work_ethic: "Exceptional. Self-made player who was literally chased off Braves Field by George Stallings when a scout forgot to tell the manager about his tryout. Converted from SS to 3B and became the best in baseball at the position. Took Rogers Hornsby's advice to use a heavier bat and transformed into a top hitter. Worked tirelessly on his defense until he was 'mechanically perfect.'",
    lifestyle: "Pittsburgh lifer. Never learned to drive. Walked everywhere — 10 miles round trip from home to his radio station every day for 21 years. Chain smoker who died of emphysema but 'continued to live his life normally' after diagnosis. One of seven siblings from a Canadian immigrant family in Massachusetts. Simple, grounded, unpretentious.",
    era_adaptability: "MODERATE. Traynor's elite contact and defense would play in any era, but his complete absence of power would be a severe liability in modern baseball. He'd be a Wade Boggs-type without the walks, or a latter-day contact specialist. His defensive prowess at 3B would be elite in any era. His bat would need to be supplemented by power elsewhere in the lineup.",
    clubhouse_impact: "STEADY PROFESSIONAL. Not a firebrand, not a comedian — Traynor was the consummate professional. Teammates respected his consistency and his willingness to do the dirty work (led league in sacrifice hits twice). His calm demeanor as player-manager helped hold teams together. Charlie Grimm: 'I've seen him field a hot grounder over at third base barehanded and get the runner at first.'",
    dark_side: "The Homer in the Gloamin'. In 1938, Traynor's Pirates led the NL for most of the season before Gabby Hartnett's famous walkoff homer in the fading light at Wrigley Field crushed their pennant hopes. The loss devastated Traynor. He seemed to lose confidence in his team and resigned after a sixth-place finish in 1939. He never managed again. In ILB terms: Traynor carries a 'Broken by a Moment' trait — a single devastating loss can end his managerial career.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Mechanically Perfect", desc: "Branch Rickey's verdict. Traynor makes no errors on routine plays. -1 to opponent's bunt game when Traynor is at 3B." },
    { tag: "Pie Face", desc: "Named for his love of pie as a kid. Universally liked — +1 chemistry with all teammates. No personality conflicts." },
    { tag: "Forbes Field Product", desc: "Played his entire career in baseball's worst HR park. Power stat permanently suppressed, but doubles/triples enhanced." },
    { tag: "The Walker", desc: "Never learned to drive. Walked everywhere, including 127 blocks in NYC. +1 conditioning, never fatigued. Immune to travel penalties." },
    { tag: "Contact Machine", desc: "278 career K in 7,559 AB. Virtually impossible to strike out. Opposing pitchers need +2 STF to fan Traynor." },
    { tag: "First at the Hot Corner", desc: "First 3B elected to HOF by writers. Traynor defined the position. +1 legacy for any team that plays him at 3B." },
    { tag: "Bat Scavenger", desc: "Shared a salvaged bat with Paul Waner for an entire season. +1 resourcefulness. Equipment costs reduced." },
    { tag: "Broken by a Moment", desc: "The Homer in the Gloamin' destroyed Traynor's confidence as a manager. If his team loses a heartbreaking game, -2 morale for the rest of the series." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Practice Field / Third Base", affinity: "HIGH", note: "Obsessive about fielding practice. Converted from SS to 3B and mastered it through sheer repetition." },
    { location: "Walking Routes", affinity: "HIGH", note: "Never drove. Walked 10 miles/day to work for 21 years. The sidewalk was his sanctuary." },
    { location: "Radio Station / Media", affinity: "HIGH", note: "Sports director at KQV Pittsburgh for 21 years. Beloved broadcaster. Also called pro wrestling." },
    { location: "Restaurant / Bakery", affinity: "MEDIUM", note: "The man literally got his nickname from begging for pie at a grocery store as a child." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Quiet, respected presence. Professional demeanor. Not the loudest voice but always listened to." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Chain smoker but not a drinker. Simple habits." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Modest, straightforward lifestyle." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Multi-hit games at Forbes Field — .939 OPS at home in 1928",
      "August hot streaks — hit .400+ in August 1928, struck out once in 150 PA",
      "World Series Game 7s — RBI triple in the 1925 WS Game 7 to tie the game",
      "Playing alongside the Waner brothers — the trio elevated each other",
    ],
    cold_triggers: [
      "Facing dominant pitching in short series — .200 in 1927 WS vs. Yankees",
      "Heartbreaking losses — the 1938 Homer in the Gloamin' broke him as a manager",
      "Road games — significantly worse away from Forbes Field",
      "Late-career decline — arm injuries and aging legs reduced his range at 3B after 1932",
    ],
    pressure_response: "VARIABLE. Traynor was brilliant in the 1925 World Series — .346 BA, homer off Walter Johnson, game-tying triple in Game 7, flawless defense. But he was a non-factor in the 1927 WS (.200, swept by the Yankees). And the 1938 'Homer in the Gloamin'' loss to the Cubs effectively ended his managerial career. Traynor rises to big moments when he believes in his team — but devastating losses can shatter him. In ILB: high ceiling, but fragile when momentum turns against him.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Chased Off the Field",
      type: "Drama",
      text: "A scout invites your prospect to a tryout but forgets to tell the manager. The manager chases the kid off the field. If you sign him anyway from another route, he becomes a Hall of Famer. If you don't, your rival gets him.",
      origin: "A Boston Braves scout invited Traynor to Braves Field but forgot to tell manager George Stallings. Stallings chased Traynor off the field. Pittsburgh signed him instead — the Braves' greatest loss.",
    },
    {
      title: "The Heavier Bat",
      type: "Action",
      text: "A veteran hitter advises your young player to switch to a heavier bat. If the player's CON is 3+, he gains +1 CON permanently. If CON is 2 or less, he loses -1 SPD with no benefit.",
      origin: "Rogers Hornsby told young Traynor to use a heavier bat in 1923. Traynor immediately blossomed — .338 BA, 208 hits, 19 triples, league-leading numbers.",
    },
    {
      title: "The Salvaged Bat",
      type: "Action",
      text: "Two of your hitters find a discarded bat from a minor-league washout. They share it all season. Both players gain +1 CON for the year. If one is traded, the other loses the bonus.",
      origin: "Traynor and Paul Waner salvaged a bat from Tim Hendryx, a minor leaguer playing out the string. They shared it all of 1927 and combined for over 600 hits with it.",
    },
    {
      title: "Homer in the Gloamin'",
      type: "Drama",
      text: "Your team leads the pennant race, but in a crucial late-season game, the opposing catcher hits a walkoff homer in fading light. Your team collapses. -3 momentum. Your manager must roll to avoid resigning.",
      origin: "Gabby Hartnett's famous HR in the near-darkness at Wrigley Field in September 1938 crushed the Pirates' pennant hopes. Traynor never recovered as a manager.",
    },
    {
      title: "The Barehand Play",
      type: "Game Action",
      text: "Your third baseman fields a scorching grounder barehanded and guns out the runner at first. Steal a base hit from the opponent. Your defense gains +1 momentum for the inning.",
      origin: "Charlie Grimm: 'I've seen him field a hot grounder over at third base barehanded and get the runner at first.' Traynor's barehanded plays on bunts and choppers were legendary.",
    },
    {
      title: "The 127-Block Walk",
      type: "Action",
      text: "Your player walks to the stadium instead of taking the team bus. He arrives relaxed, focused, and energized. +1 to all stats for today's game. But there's a 10% chance he arrives late and misses the first inning.",
      origin: "While in New York to cover the World Series for radio, Traynor walked 127 blocks from his hotel to the stadium rather than take a cab. He never learned to drive.",
    },
    {
      title: "41 Double Plays",
      type: "Game Action",
      text: "Your third baseman starts a record number of double plays in a season. For the rest of the year, any ground ball to third with a runner on first has a 40% chance of turning two (normally 25%).",
      origin: "Traynor started 41 double plays at 3B in 1925 — an NL record that stood for 25 years. Four came in a single game, tying a major-league record.",
    },
    {
      title: "The Pie Kid",
      type: "Drama",
      text: "Your player's childhood nickname becomes his permanent identity. It's endearing and makes him a fan favorite (+2 popularity), but opponents mock it relentlessly. If your player has high temperament, he shrugs it off. If low, -1 focus.",
      origin: "Young Harold Traynor always asked for pie instead of ice cream after sandlot games. The grocery store owner called him 'Pie Face,' shortened to 'Pie.' The name stuck for life.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, angular face. 6'0\" 170 lbs — tall and wiry, not bulky. Clean-cut New England features. Bright, intelligent eyes — Rickey's 'intellectual worth' is visible in the face. By 1927 (age 28), he's in his prime — confident, alert, coiled like a spring ready to pounce on a bunt.",
    attire: "Pittsburgh Pirates 1927 home whites with the classic 'P' on the cap. Baggy wool flannel, knee-high stirrups. No number (pre-numbering era). Glove in hand — the old-style pancake glove of the 1920s. Maybe mid-crouch at third base, weight on the balls of his feet, ready for a hot grounder.",
    mood: "Calm intensity. Not fierce like a pitcher — alert, balanced, watchful. The look of a man who sees the bunt coming before the batter squares around. Intelligent eyes scanning the field. A slight, knowing smile — this is a man who loves his work.",
    style: "Warm sepia tones with golden afternoon light. Forbes Field's massive outfield stretching behind him. The card should feel athletic and graceful — Traynor was not a bruiser, he was a ballet dancer at the hot corner. Clean, sharp, professional.",
    reference: "Think 1920s tobacco card elegance. The portrait should evoke a bygone era when third base was a defensive art form, not a power position. Traynor is the original — the template that Schmidt, Brett, and Arenado would later evolve from.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — HITTER
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

export default function PieTraynorCard() {
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
          Player Card — Bashers Era
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
                [AI Portrait: Sepia-toned, fielding crouch at 3B, Pirates whites, Forbes Field]
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
              {["🏆 HOF 1948 (BBWAA)", "🏆 1925 WS Champ", "⭐ 2× All-Star", "🥇 Best 3B Pre-1950", "📜 #20 Retired", "🎙️ 21yr Broadcaster", "💎 164 Career 3B", "🏅 NL DP Record (41)"].map((a, i) => (
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
                      These events, derived from Traynor's real life, become universal cards playable in any game.
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
                  <Section title="Traynor's Derivation">
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
