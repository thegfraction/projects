import { useState } from "react";

const PUCKETT_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: KIRBY PUCKETT
  // Year Snapshot: 1988 (Peak Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Kirby Puckett",
  nickname: "Puck",
  year: 1988,
  team: "Minnesota Twins",
  era: "1980s",
  ilb_team: "Domers AL1980",
  position: "CF",
  bats: "R",
  throws: "R",
  height: "5'8\"",
  weight: "210 lbs",
  born: "March 14, 1960 — Chicago, IL",
  died: "March 6, 2006 — Phoenix, AZ",
  hof: "Class of 2001 (1st ballot, 82.1%)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1988 PEAK SEASON
  // Source: Baseball-Reference, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1988,
    games: 158,
    at_bats: 657,
    hits: 234,
    doubles: 42,
    triples: 5,
    home_runs: 24,
    rbi: 121,
    stolen_bases: 6,
    batting_avg: ".356",
    obp: ".375",
    slg: ".545",
    ops: ".920",
    ops_plus: 150,
    war: 7.5,
    gold_gloves: 6,
    silver_sluggers: 6,
    all_star: 10,
    career_avg: ".318",
    career_hits: 2304,
    career_hr: 207,
    career_sb: 134,
    career_war: 51.1,
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
    ovr: 7,      // All-Star tier — elite for era but not top-5 all time
    con: 5,      // .356 BA in 1988, .318 career — maximum contact
    pow: 2,      // 24 HR in peak — solid, not elite power
    spd: 1,      // 6 SB in 1988, but Gold Glove range adds value
    def: 3,      // 6 Gold Gloves — maximum defense
    clu: 3,      // .309 postseason BA + iconic Game 6 1991 = max clutch
  },
  
  stat_justification: {
    con: "Career .318 BA, highest RH batter since DiMaggio. Peak .356 in '88. Led AL in hits 3 times. 2,304 career hits in just 12 seasons. 192 hits/season average — highest ever.",
    pow: "24 HR peak, 207 career. First player to hit 30 HR after a 0-HR/500-AB season. Moderate power — he was a line-drive machine, not a slugger.",
    spd: "134 career SB, 48 SB in minors. Speed declined as weight increased. By 1988, only 6 SB. But Gold Glove range in CF compensates.",
    def: "6 Gold Gloves. Led AL CF in putouts routinely. Made one of the greatest World Series catches ever (Game 6, 1991 — leaping grab off plexiglas wall).",
    clu: "ALCS MVP 1991 (.429). Game 6 1991: triple, leaping catch, walk-off HR in 11th. .357 in 1987 WS. .309 career postseason. Maximum clutch rating.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Vocal, infectious, lead-by-example. First to arrive, loudest in the room. Famous catchphrase before every game: 'Jump on my back tonight, boys — I'm driving the bus.'",
    temperament: "Relentlessly upbeat. Described by Frank Thomas as someone who 'never had a bad day.' Known for needling teammates, coaches, and reporters in a way that made everyone smile. A uniter.",
    work_ethic: "Elite. Took hours of batting practice daily. Arrived before everyone. Maintained peak performance for 10+ consecutive All-Star seasons despite a body type that scouts doubted.",
    lifestyle: "Social, outgoing, community-oriented. Won the Branch Rickey Award for lifetime community service. Loved being around people. Knew every clubhouse attendant by name across the league.",
    era_adaptability: "HIGH. Grew up in Chicago's Robert Taylor Homes projects, worked a Ford assembly line before baseball. Adaptable to any environment. Would thrive in any era.",
    clubhouse_impact: "MAXIMUM. Teammates wore 'I Wanna Be Like Puck' t-shirts. Personally mentored Shane Mack and younger players. Made every clubhouse happier just by being in it.",
    dark_side: "Post-career revelations of marital infidelity and assault allegations tarnished his image. In ILB terms: this creates a hidden 'Volatility' trigger that can emerge under specific pressure conditions — adding realistic complexity to the card.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Clubhouse Spark", desc: "Boosts morale of entire team by +1 when in starting lineup" },
    { tag: "Mentor", desc: "Young players (age < 25) gain bonus chemistry when paired" },
    { tag: "Vocal Leader", desc: "Speaks up in crises — prevents morale collapse events" },
    { tag: "Everyman", desc: "Compatible with players from all eras and backgrounds" },
    { tag: "Clutch Gene", desc: "Performance rises in elimination games and late innings" },
    { tag: "Workhorse", desc: "Rarely injured, plays through pain. Low fatigue risk" },
    { tag: "Chicago Roots", desc: "Extra comfort in Chicago-era squares (1910s)" },
    { tag: "Hidden Edge", desc: "Under extreme pressure, personality can crack — rare negative event trigger" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // Where Puckett goes when the team arrives in town
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Always the first to practice. Hours of BP." },
    { location: "Community Events", affinity: "HIGH", note: "Charity work, fan meetups, autograph sessions. Branch Rickey Award winner." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The 30 minutes before game time were his domain." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social eater, enjoys team dinners." },
    { location: "Bar / Nightlife", affinity: "MEDIUM", note: "Social drinker, not a problem — but the Hidden Edge trait can trigger here." },
    { location: "Hotel / Rest", affinity: "LOW", note: "Too much energy to sit still. Always moving." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Multi-hit games",
      "Postseason / elimination scenarios",
      "Team rallies from behind",
      "New teammates joining (mentoring activates)",
    ],
    cold_triggers: [
      "Extended losing streaks (rare — resilient personality resists cold)",
      "Benchings or role changes (moved to RF late career — discomfort)",
      "Isolation from team activities",
    ],
    pressure_response: "ELITE. Puckett is one of the rare cards that gets BETTER under pressure. His clutch rating means he performs above his OVR in high-stakes situations. The 1991 World Series Game 6 is the archetype.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // Events derived from Puckett's real life that become
  // universal action cards playable by/against any team
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Jump On My Back Tonight",
      type: "Action",
      text: "Your CF gives a stirring pre-game speech. All players get +1 momentum for tonight's game.",
      origin: "Puckett's famous pre-game ritual before every game, immortalized in 1991 WS Game 6.",
    },
    {
      title: "The Catch",
      type: "Game Action",
      text: "Your outfielder makes a spectacular leaping catch at the wall. Steal a base hit from the opponent. Momentum shifts to your team.",
      origin: "Puckett's iconic catch off Ron Gant, Game 6, 1991 World Series.",
    },
    {
      title: "Four Hits on Debut Day",
      type: "Action",
      text: "A newly acquired player has an extraordinary first game. Sign any (+5) free agent — they immediately go Hot.",
      origin: "Puckett went 4-for-5 in his MLB debut, May 8, 1984.",
    },
    {
      title: "From the Projects to the Penthouse",
      type: "Drama",
      text: "Your (+6 or higher) player reveals he grew up in poverty. Team chemistry increases if you give him the starting spot. Decrease if you bench him.",
      origin: "Puckett grew up in Chicago's Robert Taylor Homes, one of the nation's most notorious housing projects.",
    },
    {
      title: "The Eyes Have It",
      type: "Drama",
      text: "Your star player wakes up with blurred vision. He can play through it for 2 games at -2 OVR, or sit out for 5 games. If he plays through: 50% chance career ends. If he sits: full recovery.",
      origin: "Puckett's sudden glaucoma diagnosis ended his career in 1996.",
    },
    {
      title: "Everybody's Friend",
      type: "Action",
      text: "Your (+5 or higher) player knows every clubhouse attendant by name. Draw 1 free tip card revealing the opposing team's weakness.",
      origin: "Puckett was famous for knowing every clubhouse staffer's name across the league.",
    },
    {
      title: "The Bus Driver",
      type: "Game Action",
      text: "In an elimination game, your highest-CON player takes over. He gets +2 to all stats for this game only.",
      origin: "Puckett's 'I'm driving the bus tonight' before Game 6, 1991.",
    },
    {
      title: "Scandal in the Offseason",
      type: "Drama",
      text: "Reports surface about your (+7 or highest) player's personal life. Team chemistry drops by 2. Player sits for 1 game unless you discard a (+3) to manage the press.",
      origin: "Puckett's post-retirement personal controversies.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // For ChatGPT image generation of the card face
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Round, warm face with an irrepressible grin. Short, stocky, barrel-chested build at 5'8\" 210 lbs. His body was famously described as 'fire hydrant-shaped.'",
    attire: "Minnesota Twins home whites, pinstripes, number 34. Classic late-1980s cap style.",
    mood: "Pure joy. Fist pump energy. The moment after a big hit — the Kirby smile.",
    style: "Sepia-toned with warm golden highlights. Metrodome crowd blurred behind him. Classic baseball card composition — shoulders up, slight turn, bat over shoulder or mid-swing follow-through.",
    reference: "Think 1988 Topps card energy but rendered in the unified ILB sepia portrait style.",
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

export default function KirbyPuckettCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PUCKETT_DATA;
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
                [AI Portrait: Sepia-toned, fist-pump pose, Twins #34, Metrodome lights]
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
              {["🏆 HOF 2001", "⭐ 10× All-Star", "🥇 6× Gold Glove", "🏅 6× Silver Slugger", "🏆 2× WS Champ", "📰 ALCS MVP"].map((a, i) => (
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
                      These events, derived from Puckett's real life, become universal cards playable in any game.
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
                  <Section title="Puckett's Derivation">
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
