import { useState } from "react";

const LAZZERI_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: TONY LAZZERI
  // Year Snapshot: 1929 (Peak Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Tony Lazzeri",
  nickname: "Poosh 'Em Up",
  year: 1929,
  team: "New York Yankees",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "2B",
  bats: "R",
  throws: "R",
  height: "5'11\"",
  weight: "170 lbs",
  born: "December 6, 1903 — San Francisco, CA (Cow Hollow district, son of Italian immigrants)",
  died: "August 6, 1946 — Millbrae, CA (age 42, fall caused by epileptic seizure)",
  hof: "Class of 1991 (Veterans Committee). First Italian-American baseball superstar. 5× World Series champion.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1929 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, HOF
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1929,
    games: 147,
    at_bats: 545,
    hits: 193,
    doubles: 37,
    triples: 11,
    home_runs: 18,
    rbi: 106,
    stolen_bases: 9,
    batting_avg: ".354",
    obp: ".429",
    slg: ".561",
    ops: ".990",
    ops_plus: 145,
    war: 7.1,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 1,
    career_avg: ".292",
    career_hits: 1840,
    career_hr: 178,
    career_sb: 148,
    career_war: 47.6,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // 
  // METHODOLOGY: Stats are derived from real performance data
  // using the following conversion logic:
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ 130+ adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG .500+ adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + triples + range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove CF adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — NEW STAT for ILB v2
  //   No Gold Glove = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //
  // OVERALL (OVR) — Weighted composite
  //   CON×2 + POW×1.5 + SPD×1 + DEF×0.5, normalized to 3-13
  //   3-4 = replacement | 5-6 = solid | 7-8 = all-star
  //   9-10 = elite | 11-12 = legend | 13 = mythic
  //
  // CLUTCH (CLU) — Postseason performance modifier
  //   Postseason BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   World Series hero moments add +1 (cap at 3)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 8,      // All-Star tier — 47.6 career WAR, HOF, 5× WS champion, Murderers' Row
    con: 5,      // .354 BA in 1929 — career-high. OPS+ 145 triggers bonus, already capped. Max contact.
    pow: 2,      // 18 HR → tier 1 (10-19). SLG .561 → ≥.500 bonus → +1. POW 2.
    spd: 1,      // 9 SB in 1929, 148 career. Good speed early, declined with injuries. SPD 1.
    def: 0,      // No Gold Gloves (pre-award). Converted from SS to 2B by Huggins. Solid but not exceptional. Led AL 2B in DP 1929. DEF 0.
    clu: 2,      // .291 WS BA across 5 championships. WS grand slam in 1936. Scored deciding run in 1937 WS. But: K'd with bases loaded in 1926 Game 7 vs. Alexander. CLU 2.
  },
  
  stat_justification: {
    con: "Career .292 BA, peak .354 in 1929 with 193 hits, 37 doubles, 11 triples. Hit .300+ in five seasons. OPS+ 145 in peak year. Career .380 OBP. One of the smartest hitters of his era — Miller Huggins acknowledged him as 'the brains of the Yankee infield.' Seven 100-RBI seasons as a second baseman. Maximum contact.",
    pow: "18 HR in 1929 (his career high, reached 4 times). SLG .561 triggers the bonus → POW 2. Career 178 HR — extraordinary for a 2B in the 1920s-30s. First player to hit two grand slams in one game (May 24, 1936). AL record 11 RBI in a game. 60 HR in PCL in 1925 (minor league record at the time). One of the first power-hitting middle infielders in history.",
    spd: "9 SB in 1929, 148 career. 39 SB in his 1925 PCL season. Good early speed that declined with knee injuries. 11 triples in 1929. Not a burner in his prime years but a smart baserunner. Rating of 1.",
    def: "No Gold Gloves (pre-award). Converted from SS to 2B by Miller Huggins as a rookie. Led AL second basemen in double plays in 1929 (86). Huggins considered him smart and reliable. Filled in at SS and 3B when needed. But not considered an elite defender — he was valued for his bat. Rating of 0.",
    clu: ".291 BA across 5 World Series championships (1927, 1928, 1932, 1936, 1937). Hit WS grand slam in 1936 (only 2nd in WS history). Scored deciding run in 1937 WS. Key double off Alexander in 1928 WS Game 4 clincher. BUT: struck out with bases loaded in Game 7 of 1926 WS vs. Grover Cleveland Alexander — immortalized on Alexander's HOF plaque. The K haunted him. Rating of 2 — the redemption over 5 titles outweighs the one failure.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Quiet Leader. Lazzeri was universally regarded as the smartest player on the Yankees — and this was a team with Ruth, Gehrig, and DiMaggio. Frankie Crosetti: 'He not only was a great ballplayer, he was a great man. He was a leader. He was like a manager on the field.' Huggins called him 'the brains of the Yankee infield.' He led through intelligence, composure, and example — never through volume. The anti-Ruth: he let his play speak.",
    temperament: "Cool, calm, impenetrable. Sportswriters found him impossible to interview. One complained that 'interviewing that guy is like mining coal with a nail file.' He was quiet and modest — he would rarely talk about himself. But beneath the silence was iron. He played his entire career with epilepsy, a condition that terrified every team that scouted him. He never had a seizure on the field. He carried the secret with dignity and played through it without complaint.",
    work_ethic: "Boilermaker's son. Dropped out of school to work with his father making boilers. That blue-collar foundation never left him. He was shuffled between minor league teams for years — Salt Lake City to Peoria to Lincoln and back. He quit baseball entirely at 19 out of frustration, then came back and hit 60 home runs. He converted from shortstop to second base as a rookie because Huggins asked him to. He did everything asked of him, quietly, perfectly.",
    lifestyle: "San Francisco Italian. Born in Cow Hollow to Augustine and Julia Lazzeri, Italian immigrants. Grew up in a rough neighborhood. Married Maye Janes in 1923; they had a son, David Anthony (born 1931). He was the first major Italian-American baseball star — a decade before DiMaggio. Italian-speaking fans at Yankee Stadium screamed 'Poosh 'em up!' (a mangled translation of 'hit it out'). He carried the hopes of an entire immigrant community on his back and never spoke about it.",
    era_adaptability: "HIGH. Lazzeri was one of the first power-hitting middle infielders in baseball history. In a modern game that values 2B who can hit for power (Altuve, Cano, Pedroia), Lazzeri would be a prototype. His OPS+ of 145 in 1929 would play in any era. His intelligence and leadership would translate anywhere. The only question: his epilepsy management would be far easier with modern medicine.",
    clubhouse_impact: "MAXIMUM. Despite being the quiet man, Lazzeri was the glue. Mark Koenig considered him the team's most valuable player — not Ruth, not Gehrig. He was popular with teammates and respected by opponents. He was the player-coach type who managed the infield, positioned fielders, and thought three plays ahead. When the Yankees released him after 1937, they lost more than a second baseman — they lost their on-field brain.",
    dark_side: "The Epilepsy Secret. Every team that scouted Lazzeri knew about his condition — and most passed. The Cubs passed. The Reds passed. The Yankees sent three separate scouts to investigate his medical history and his family before they'd sign him. He managed the condition privately for his entire career, but the fear was always there: what if it happened during a game? It never did. But the stress of carrying that secret — of knowing that one public seizure could end everything — is unimaginable. He died at 42, alone, from a fall in his home almost certainly caused by a seizure. He was found the next day.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Murderers' Row", desc: "+1 to all teammates' POW when lineup includes 3+ players with OVR 8+. The 1927 Yankees effect: greatness amplifies greatness." },
    { tag: "The Quiet Man", desc: "Never causes clubhouse drama. Immune to media controversy events. But: cannot give pre-game speeches or rally teammates vocally." },
    { tag: "Infield Brain", desc: "+1 DEF to all infielders on the team. Lazzeri positions fielders, calls plays, and thinks three moves ahead. A manager on the field." },
    { tag: "Italian Pioneer", desc: "First Italian-American baseball superstar. Draws extra fans from Italian immigrant communities. +1 revenue in cities with large Italian populations." },
    { tag: "The Epilepsy Secret", desc: "5% chance per season of a health scare event. If triggered: miss 3 games, -1 team morale from worry. If managed privately: no further effect. If made public: massive media storm." },
    { tag: "Poosh 'Em Up", desc: "+2 POW in clutch RBI situations (runner on 3rd, 2 outs). Italian fans in the stands fuel him. The grand-slam specialist." },
    { tag: "Alexander's Shadow", desc: "In World Series Game 7 situations, 20% chance of a bases-loaded strikeout that haunts Lazzeri's legacy. But 80% chance of redemption hit." },
    { tag: "Boilermaker's Son", desc: "Blue-collar work ethic. Immune to fatigue events. Plays through minor injuries without complaint." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // Where Lazzeri goes when the team arrives in town
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Yankee Stadium", affinity: "HIGH", note: "His cathedral. 12 seasons as the Yankees' 2B. 5 WS titles. 'Poosh 'em up!' echoed from the Italian fans in the bleachers." },
    { location: "Infield / Practice Field", affinity: "HIGH", note: "The smartest infielder in the game. Always working on positioning, double plays, relay throws." },
    { location: "Italian Neighborhood / Restaurant", affinity: "HIGH", note: "He carried an entire immigrant community's dreams. Italian restaurants in the Bronx and Manhattan were his territory." },
    { location: "Hotel / Quiet Space", affinity: "HIGH", note: "The quiet man. He managed his epilepsy privately and needed rest and routine to stay healthy." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a carouser. His medical condition required discipline. He couldn't afford the lifestyle of Ruth." },
    { location: "Press Room / Interviews", affinity: "NONE", note: "'Interviewing that guy is like mining coal with a nail file.' He avoided the press like a plague." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Playing alongside elite teammates (Ruth, Gehrig, DiMaggio) — greatness elevates him",
      "RBI situations — man on third, clutch at-bats",
      "World Series games (after 1926) — five consecutive WS wins",
      "Italian Heritage Day promotions — the crowd energizes him",
    ],
    cold_triggers: [
      "Bases-loaded, late-inning pressure in elimination games — Alexander's shadow",
      "Health scares or seizure-adjacent episodes — needs recovery time",
      "Being asked to do interviews or public speaking — drains his energy",
      "Playing without elite teammates — his production declined when traded from Yankees",
    ],
    pressure_response: "STRONG WITH ONE SCAR. Lazzeri was clutch across 5 World Series championships — .291 BA, WS grand slam, deciding runs scored. Connie Mack and opposing managers feared him in RBI situations. But the 1926 Game 7 strikeout against Alexander is branded on his legacy. One pitch earlier, he'd hit a screaming drive that landed foul by ten feet. One pitch later, he struck out. That single at-bat is on Alexander's HOF plaque. Lazzeri spent the rest of his career in redemption mode — and succeeded.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // Events derived from Lazzeri's real life that become
  // universal action cards playable by/against any team
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Sixty Home Runs in the Thin Air",
      type: "Action",
      text: "In the minor leagues, your prospect hits 60 home runs in a single season at a high-altitude ballpark. Scouts dismiss it as inflated stats. One team takes the risk. The prospect becomes a Hall of Famer.",
      origin: "1925: Lazzeri hit .355 with 60 HR, 222 RBI, 202 runs at Salt Lake City (PCL). Every team knew about the altitude — and his epilepsy. The Cubs and Reds passed. The Yankees signed him for $50,000.",
    },
    {
      title: "Alexander Strikes Out Lazzeri",
      type: "Drama",
      text: "World Series Game 7. Bases loaded. Two outs. Your batter faces a legendary pitcher. He launches a drive down the line — foul by ten feet. The next pitch: strikeout. The moment is immortalized on the pitcher's HOF plaque. Your batter carries the shame forever. -3 CLU permanently unless he wins a future WS.",
      origin: "1926 WS Game 7: Grover Cleveland Alexander struck out Lazzeri with bases loaded in the 7th. One pitch earlier, Lazzeri hit a screaming drive that landed foul. The K is on Alexander's plaque in Cooperstown.",
    },
    {
      title: "Two Grand Slams in One Game",
      type: "Game Action",
      text: "Your second baseman hits two grand slams in a single game — the first player in major league history to do so. He drives in 11 runs (an AL record that still stands). +5 POW for the week. Opposing teams fear him.",
      origin: "May 24, 1936: Lazzeri went 4-for-5 with 3 HR (two grand slams) and 11 RBI at Shibe Park vs. the A's. The 11-RBI AL record still stands as of 2026.",
    },
    {
      title: "The Natural Cycle with a Grand Slam",
      type: "Game Action",
      text: "Your batter hits for the natural cycle — single, double, triple, home run in sequence — and the home run is a grand slam. The only player in history to accomplish this feat. +3 to all offensive stats for the game.",
      origin: "June 3, 1932: Lazzeri hit for the natural cycle against the Athletics. The home run was a grand slam — making him the only player in MLB history to complete a natural cycle with a grand slam.",
    },
    {
      title: "The Epilepsy Secret",
      type: "Drama",
      text: "Your star player has a medical condition that terrifies front offices. Every team that scouts him passes — except one. He plays his entire career managing the condition in private. He never misses a game because of it. But the stress of the secret exacts a toll. He dies young.",
      origin: "Lazzeri had epilepsy. The Cubs and Reds both passed on signing him. The Yankees sent three scouts to investigate before committing. He never had a seizure on the field in 14 major league seasons. He died at 42, alone, from a fall in his home.",
    },
    {
      title: "Mining Coal with a Nail File",
      type: "Action",
      text: "Your star player refuses all interviews. The press complains bitterly. But his teammates revere him — he leads by example, not words. +2 team chemistry from respect, -1 from media frustration.",
      origin: "A sportswriter complained: 'Interviewing that guy is like mining coal with a nail file.' Lazzeri was the quietest Yankee — and the smartest. He let Ruth and Gehrig get the headlines.",
    },
    {
      title: "Poosh 'Em Up!",
      type: "Game Action",
      text: "Italian-speaking fans in the stands begin chanting your player's name. He responds with a two-run double that breaks the game open. The immigrant community adopts him as their hero. +2 fan loyalty in cities with large Italian populations.",
      origin: "Italian fans at Yankee Stadium chanted 'Poosh 'em up!' — a mangled Italian phrase meaning 'hit it out.' Lazzeri was the first Italian-American baseball superstar, a decade before DiMaggio.",
    },
    {
      title: "Found the Next Morning",
      type: "Drama",
      text: "Your retired Hall of Famer is found dead in his home at age 42. The cause is listed as a heart attack, but those who knew him suspect his lifelong medical condition. The community mourns. He waited 45 years for Cooperstown.",
      origin: "August 6, 1946: Lazzeri was found dead in his Millbrae, CA home. The coroner ruled a heart attack caused the fall, but many believe it was an epileptic seizure. He was inducted into the HOF in 1991 — 45 years after his death.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // For ChatGPT image generation of the card face
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, Italian features. Dark hair, dark eyes, serious expression. 5'11\" 170 lbs — wiry, not bulky. The face of a man who carries secrets. Not grinning like Ruth — composed, watchful. The look of someone who's always thinking two plays ahead.",
    attire: "New York Yankees 1929 home pinstripes. The classic NY interlocking logo on the cap. The uniform of the greatest dynasty in baseball. He should look like the quiet man in the middle of the loudest team in history.",
    mood: "Silent intensity. Not the home run swing — the follow-through of a line-drive double into the gap. Or the pivot on a double play, the ball already released before the runner arrives. This card should feel like intelligence in motion. The smartest man on the smartest team.",
    style: "Classic sepia with Yankee Stadium's old frieze visible in the background haze. The Italian tricolor subtly suggested in a ribbon or shadow. More restrained than the Ruth or Gehrig cards — this is the card you have to look at twice to appreciate. Like Lazzeri himself.",
    reference: "The forgotten Yankee. The card that asks: what does it cost to carry a secret your whole life? The card of the man who struck out against Alexander and then won five World Series in redemption.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// This is the formula that will be used for ALL future cards
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

export default function TonyLazzeriCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = LAZZERI_DATA;
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
                [AI Portrait: Sepia-toned, serious expression, Yankees pinstripes, Yankee Stadium frieze, double-play pivot]
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
              {["🏆 HOF 1991", "🏆 5× WS Champ", "⭐ 1933 All-Star", "🎯 .354 BA (1929)", "📊 11 RBI Game", "💎 1,840 Hits"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>

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
                      These events, derived from Lazzeri's real life, become universal cards playable in any game.
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
                  <Section title="Lazzeri's Derivation">
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
