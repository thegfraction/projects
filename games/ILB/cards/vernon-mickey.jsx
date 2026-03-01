import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: MICKEY VERNON
  // Year Snapshot: 1946 (Peak Season — AL Batting Champion)
  // ═══════════════════════════════════════════════════════════════

  name: "Mickey Vernon",
  nickname: "The Quiet Senator",
  year: 1946,
  team: "Washington Senators",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '6\'2"',
  weight: "170 lbs",
  born: "April 22, 1918 — Marcus Hook, PA",
  died: "September 24, 2008 — Media, PA",
  hof: "Not inducted. 2× AL batting champ, 7× All-Star, 2,495 hits, .286 BA, 35.3 WAR.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1946 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Wikipedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1946,
    games: 148,
    at_bats: 587,
    hits: 207,
    doubles: 51,
    triples: 8,
    home_runs: 8,
    rbi: 85,
    stolen_bases: 7,
    batting_avg: ".353",
    obp: ".403",
    slg: ".508",
    ops: ".910",
    ops_plus: 160,
    war: 6.7,
    all_star: 7,
    batting_titles: 2,
    career_avg: ".286",
    career_hits: 2495,
    career_hr: 172,
    career_sb: 137,
    career_war: 35.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .330+ = 5. OPS+ 160 = +1, but already capped at 5.
  //
  // POWER (POW) — Based on HR rate + SLG
  //   8 HR = 0. SLG .508 ≥ .500 → +1 = 1.
  //
  // SPEED (SPD) — Based on SB + positional range
  //   7 SB = 1. No Gold Glove CF/SS bonus. SPD 1.
  //
  // DEFENSE (DEF) — Based on Gold Gloves / reputation
  //   Pre-Gold Glove era. All-time ML record for DP at 1B (2,044).
  //   AL record for games, putouts, assists, total chances at 1B.
  //   Universally regarded as premier defensive 1B of his era.
  //   Equivalent to 6+ GG → DEF 3.
  //
  // CLUTCH (CLU) — Postseason performance + moments
  //   Never played in a World Series (2,409 games — 11th most
  //   without a WS appearance). No postseason data. Reputation
  //   for big regular-season moments (batting title races, walk-off
  //   HR vs Yankees on Opening Day 1954). CLU 1.
  //
  // OVERALL (OVR) — Weighted composite
  //   CON 5×2=10 + POW 1×1.5=1.5 + SPD 1×1=1 + DEF 3×0.5=1.5
  //   Raw = 14 → normalized. 7× All-Star, 2× batting champ,
  //   elite defender but low power for 1B, played for bad teams.
  //   All-Star tier → OVR 8.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star tier — elite contact/defense 1B, limited power
    con: 5,      // .353 BA in 1946 — led AL. .337 in 1953. 2× batting champ. 160 OPS+.
    pow: 1,      // 8 HR in 1946 (tier 0). SLG .508 → +1 bonus. POW 1.
    spd: 1,      // 7 SB in 1946 (tier 1). 137 career SB — respectable for a 1B.
    def: 3,      // All-time ML record DP at 1B (2,044). AL records at 1B for games/putouts/assists/TC. Premier defensive 1B of era.
    clu: 1,      // No postseason appearances. Walk-off HR vs Yankees on Opening Day 1954 before President Eisenhower. Clutch in batting races but no October stage.
  },

  stat_justification: {
    con: "AL batting champion in 1946 (.353) and 1953 (.337). Beat Ted Williams by 11 points in '46, edged Al Rosen by .001 in '53. Career .286 BA, 2,495 hits, 490 doubles. OPS+ 160 in peak year. Hit to all fields — studied Charlie Gehringer, Cecil Travis, and Ted Williams to master spray hitting. Maximum contact rating.",
    pow: "Only 8 HR in 1946 — Griffith Stadium's cavernous dimensions suppressed his power. Career-high 20 HR in 1954. 172 career HR, 101 fewer than the average HOF 1B. However, SLG .508 in 1946 meets the .500 bonus threshold. HR tier 0 + SLG bonus = POW 1. Vernon was a doubles machine (490 career), not a slugger.",
    spd: "7 SB in 1946 (tier 1). 137 career SB — excellent for a first baseman across 20 seasons. Described as able to steal bases, but speed was never his primary weapon. No CF/SS Gold Glove bonus applies. SPD 1.",
    def: "All-time ML record for double plays at 1B (2,044). AL records for career games (2,227), putouts (19,754), assists (1,444), and total chances (21,408) at first base. Bob Feller said he was 'the best first baseman in major-league baseball.' Jack Dunn said he was 'the only man in baseball who could play first base in a tuxedo.' Pre-Gold Glove era, but equivalent to 6+ GG. Maximum defense.",
    clu: "Never played in the World Series — 2,409 career games, 11th most all-time without a WS appearance. No postseason data to evaluate. However, he won two batting title races on the final day of the season and hit a walk-off HR vs the Yankees before President Eisenhower. Regular-season clutch reputation, but no October stage. CLU 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet, steady, lead-by-example. Vernon never raised his voice, never caused controversy, never demanded attention. He was 'as silent as a night watchman, as conservative as a banker, and as well-behaved as a vicar.' His leadership came from consistency — showing up, performing, being decent. Teammates trusted him because he was incapable of selfishness.",
    temperament: "Gentle, humble, unfailingly kind. Roommate Walt Masterson challenged a writer: 'If anybody says anything bad about Mickey, you send him to me.' Nobody ever did. Vernon was universally beloved — by teammates, opponents, writers, umpires, and presidents. He was the opposite of a diva: shy, mild-mannered, and deeply uncomfortable with self-promotion.",
    work_ethic: "Student of hitting. Before 1946, Vernon was a .275 pull hitter. He studied Charlie Gehringer, Cecil Travis, Ted Williams, Joe DiMaggio, and Hank Greenberg — not to copy them, but to extract specific principles. He transformed himself into an all-fields hitter under coach Clyde Milan. His approach was analytical and patient in an era of gut instinct.",
    lifestyle: "Small-town Pennsylvania boy for life. Born in Marcus Hook, married Lib, lived 52 years in Wallingford. Attended Villanova. Friends with Danny Murtaugh from high school until death. Hitchhiked to the 1933 World Series as a teenager. Community fixture — Little League named after him, life-size statue in Marcus Hook. Spent 52 seasons in professional baseball.",
    era_adaptability: "HIGH. Vernon's all-fields approach and analytical hitting study are essentially modern batting philosophy. His spray-hitting, OBP skills, and elite defense would translate perfectly to any era. His low power would hurt him at 1B in slugger-heavy eras, but his bat control and defensive value are timeless.",
    clubhouse_impact: "STEADY-BELOVED. Not a rah-rah leader, but the man everyone liked and respected. His decency was his superpower. He befriended Larry Doby during wartime service, encouraged him to pursue the majors, and gave him Senators-bought bats while Doby was still in the Negro Leagues. Vernon was a bridge-builder — quietly progressive, personally generous, universally trusted.",
    dark_side: "The invisibility. Vernon played 20 years, won two batting titles, made seven All-Star teams, and set defensive records — and was still forgotten. He played for the perennial cellar-dwelling Senators while Williams, DiMaggio, and Mantle got the headlines. He reached 25% in HOF voting but never got in. In ILB terms: Vernon carries a 'Forgotten Star' trait — his stats are excellent, but his fame modifier is low. Teams that play him will get elite production with zero drama, but also zero buzz.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Tuxedo Fielder", desc: "Elite defensive first baseman. All-time DP record. Reduces opponent baserunner advancement by 1 base on ground balls to the right side." },
    { tag: "Spray Hitter", desc: "Hits to all fields based on pitch location. No platoon disadvantage against LHP. +1 CON when facing soft-tossing pitchers." },
    { tag: "Quiet Leader", desc: "No dramatic speeches, no ego. Prevents clubhouse drama events. -1 to team volatility." },
    { tag: "Bridge Builder", desc: "Befriended Larry Doby during WWII. +2 chemistry with players from any background or era. Reduces racial tension events." },
    { tag: "Presidential Favorite", desc: "Eisenhower's favorite player. +1 reputation in Washington/political squares. Walk-off moments gain extra publicity." },
    { tag: "Forgotten Star", desc: "Despite elite stats, Vernon generates no media buzz. -1 fame modifier, but opponents consistently underestimate him." },
    { tag: "Four-Decade Man", desc: "Played in 4 decades (1939-1960). +1 era adaptability. Compatible with players from any era square." },
    { tag: "War Veteran", desc: "Served in Navy 1944-1945. +1 chemistry with other WWII veterans. No morale penalty during hardship events." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Student of hitting. Studied opponents' approaches. Worked with coach Clyde Milan on all-fields technique." },
    { location: "Community Events", affinity: "HIGH", note: "Attended countless local events for decades. Little League named after him. Statue in Marcus Hook." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Quiet, conservative personality. Content with a book and early bedtime." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social but not flashy. Enjoyed team dinners. Simple tastes." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Well-liked but not the loudest voice. Comfortable, not dominant." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "As well-behaved as a vicar. Not a nightlife person." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association whatsoever." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Batting title races — Vernon's two titles both came down to the final day",
      "Return from adversity — .275 hitter before the war, .353 after",
      "Multi-hit games / hitting streaks — 22-game streak in 1946, hitting .411 in late May",
      "Playing before dignitaries or large crowds — walk-off HR before President Eisenhower",
    ],
    cold_triggers: [
      "Extended losing streaks on bad teams — Senators' futility wore on him over 14 seasons",
      "Isolation from competition — Vernon elevated when racing for titles, stagnated in non-contending years",
      "Aging / late-career decline — effective into his 40s but periodic slumps in off-years (.251 in 1952)",
    ],
    pressure_response: "PARADOXICAL. Vernon never played in a World Series, so his pressure rating is theoretical. But in regular-season pressure — final-day batting title races, Opening Day walk-offs, All-Star appearances — he was consistently excellent. His 1946 and 1953 batting crowns were won in the final week of the season against Ted Williams and Al Rosen respectively. He thrived in pressure he could see coming. In ILB: Vernon performs above his OVR in regular-season high-stakes (batting title races, rivalry games) but has no postseason modifier.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Beating the Splendid Splinter",
      type: "Game Action",
      text: "Your contact hitter outduels the league's best slugger in the batting race. Your highest-CON player gains +1 CON for the remainder of the season. The slugger's owner discards 1 morale.",
      origin: "Vernon's .353 beat Ted Williams' .342 for the 1946 AL batting title — both men returning from WWII military service.",
    },
    {
      title: "One-Thousandth of a Point",
      type: "Game Action",
      text: "The batting title comes down to the final at-bat of the season. Your player goes 2-for-4. Roll a d6: on 3+, he wins the crown and gains +2 reputation. On 1-2, the rival claims it.",
      origin: "Vernon's .337 edged Al Rosen's .336 on the final day of 1953, denying Rosen the Triple Crown by one one-thousandth of a point.",
    },
    {
      title: "The President Wants to See You",
      type: "Action",
      text: "After a walk-off home run, a Secret Service agent escorts your player to the presidential box. The player gains +3 fame and +1 reputation permanently.",
      origin: "After Vernon's walk-off HR vs the Yankees on Opening Day 1954, a Secret Service agent took him to President Eisenhower's box. Ike said: 'Nice going.'",
    },
    {
      title: "Bats for a Friend",
      type: "Drama",
      text: "Your player gives equipment and encouragement to a talented player from a marginalized league. That player signs with a rival team next season — but your team gains +3 karma and the new player has permanent +1 chemistry with yours.",
      origin: "Vernon gave Larry Doby a dozen Senators-purchased bats while Doby was still in the Negro Leagues, and encouraged him to pursue the majors. Doby broke the AL color line in 1947.",
    },
    {
      title: "The Tuxedo at First Base",
      type: "Game Action",
      text: "Your first baseman turns a spectacular double play. All ground balls to the right side for the rest of the game have a +20% chance of becoming double plays.",
      origin: "Vernon turned 2,044 double plays at first base — the all-time MLB record. Jack Dunn said he was 'the only man in baseball who could play first base in a tuxedo.'",
    },
    {
      title: "Hitchhiking to the World Series",
      type: "Drama",
      text: "A teenage fan hitchhikes across the state to see the big game. He stands in line all night for bleacher seats. Years later, he becomes a star — but never plays in the Series himself. Your player gains the 'Dreamer' trait: +1 in all regular-season games, but -1 morale if eliminated from postseason contention.",
      origin: "As a teenager, Vernon hitchhiked from Marcus Hook to Brooklyn and stood all night to get bleacher tickets for the 1933 World Series. He played 2,409 career games without ever appearing in a World Series.",
    },
    {
      title: "Fifty-Two Seasons",
      type: "Action",
      text: "Your veteran player transitions seamlessly from player to coach to manager to scout. He never leaves baseball. +1 to franchise stability. If this player retires, he becomes available as a coaching bonus for 3 more seasons.",
      origin: "Vernon spent 52 seasons in professional baseball — as player, manager, coach, and scout — from 1937 to 1988. He was baseball's youngest player in 1939 and its oldest in 1960.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall, lanky, lean build at 6'2\" 170 lbs — the opposite of the stocky slugger archetype. Long face, gentle eyes, easy smile. Clean-cut, modest appearance. The look of a small-town Pennsylvania gentleman who happens to be an elite athlete.",
    attire: "Washington Senators home whites, 1946 vintage. Baggy wool flannel, high socks, classic cap with the curly W. Number visible. Left-handed batting stance or smooth fielding stretch at first base. Era-appropriate loose-fitting uniform on a tall, thin frame.",
    mood: "Quiet confidence. Not fierce, not celebratory — serene competence. The look of a man who just went 3-for-4 and won't mention it unless asked. Gentle warmth, understated pride. The smile of someone who loves what he does and doesn't need you to notice.",
    style: "Warm sepia tones with soft golden light. Griffith Stadium's right-field wall faintly visible in the background. Classic 1940s baseball card composition — chest up, slight turn, bat resting on shoulder. Less dramatic than the Crashers cards; Vernon's card should feel quiet, elegant, and dignified. Like finding a forgotten treasure in a dusty attic.",
    reference: "Think 1946 Play Ball card aesthetic, rendered in the unified ILB sepia style. Vernon's card should feel like the most underrated card in the set — the one collectors overlook until they realize it's one of the best values.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — POSITION PLAYER
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

export default function MickeyVernonCard() {
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
                [AI Portrait: Sepia-toned, tall lean frame, Senators whites, Griffith Stadium light]
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
              {["👑 2× AL Batting Champ", "⭐ 7× All-Star", "🧤 All-Time DP Record (1B)", "🎖️ WWII Navy Veteran", "🏅 5th MVP 1946", "📜 2,495 Career Hits"].map((a, i) => (
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
                      These events, derived from Vernon's real life, become universal cards playable in any game.
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
                  <Section title="Vernon's Derivation">
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
