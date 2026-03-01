import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JOHNNY PESKY
  // Year Snapshot: 1946 (Peak Season — Led AL in Hits, .335 BA, Pennant Winner)
  // ═══════════════════════════════════════════════════════════════

  name: "Johnny Pesky",
  nickname: "The Needle",
  year: 1946,
  team: "Boston Red Sox",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SS",
  bats: "L",
  throws: "R",
  height: "5'9\"",
  weight: "168 lbs",
  born: "February 27, 1919 — Portland, OR",
  died: "August 13, 2012 — Danvers, MA (age 92)",
  hof: "Not inducted. #6 retired by Red Sox. .307 career BA, 200+ hits 3×, 61 years with Boston.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1946 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, MLB.com
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1946,
    games: 153,
    at_bats: 621,
    hits: 208,
    doubles: 43,
    triples: 4,
    home_runs: 2,
    rbi: 55,
    stolen_bases: 12,
    batting_avg: ".335",
    obp: ".401",
    slg: ".427",
    ops: ".828",
    ops_plus: 124,
    war: 6.1,
    runs: 115,
    all_star: 1,
    career_avg: ".307",
    career_hits: 1455,
    career_hr: 17,
    career_sb: 48,
    career_war: 32.4,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .335 → tier 5 (.330+). OPS+ 124 → no bonus (<130). CON = 5.
  // POWER (POW) — 2 HR → tier 0 (0-9). SLG .427 → no bonus (<.500). POW = 0.
  // SPEED (SPD) — 12 SB → tier 1 (6-15). No GG bonus. SPD = 1.
  // DEFENSE (DEF) — Decent SS, not elite. No GG equivalent. DEF = 0.
  // CLUTCH (CLU) — 1946 WS: .233. PS BA < .250 → tier 0. "Held the ball." CLU = 0.
  // OVERALL — Raw: 5×2 + 0×1.5 + 1×1 + 0×0.5 = 11 → normalized.
  //   .307 career, 200+ hits 3×, lost 3 prime years to WWII.
  //   OVR = 7 (All-Star tier — consistent elite hitter, borderline HOF).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — elite contact, no power, borderline HOF case lost to WWII
    con: 5,      // .335 BA → tier 5 (.330+). Maximum contact. Led AL in hits 3 straight years.
    pow: 0,      // 2 HR in 1946. Only 17 career HR in 4,745 AB. Absolute zero power.
    spd: 1,      // 12 SB in 1946. 48 career. Adequate speed, not a burner. SPD = 1.
    def: 0,      // Adequate SS, moved to 3B when Stephens arrived. Not a defensive standout. DEF = 0.
    clu: 0,      // 1946 WS: .233 (7-for-30). "Held the ball" on Slaughter's mad dash. CLU = 0.
  },

  stat_justification: {
    con: ".335 BA in 1946 — 3rd in AL behind Williams and Mantle. Led AL in hits all 3 seasons he played before and after WWII (205, 208, 207). First AL player with 200+ hits in each of his first 3 seasons. Career .307. OPS+ 124 misses the 130 bonus threshold but barely. Maximum contact rating regardless.",
    pow: "2 HR in 1946, only 17 career HR in 4,745 AB. Pesky's Pole at Fenway (302 ft) is named because it was the only place this slap hitter could conceivably homer. He was the ultimate contact-over-power player. Rating of 0 — genuinely powerless.",
    spd: "12 SB in 1946, 48 career. Pesky had decent speed but wasn't a base-stealing threat. He scored 115 runs in '46 by getting on base constantly, not by running. Rating of 1 — adequate mobility.",
    def: "Pesky was a serviceable shortstop who moved to third base when Vern Stephens arrived. He led 3B in DP in 1949. But he was never considered an elite defender at either position. No Gold Glove equivalent. Rating of 0.",
    clu: "1946 World Series: .233 (7-for-30). And the defining moment: 'Pesky held the ball' — on Enos Slaughter's mad dash home in Game 7, Pesky allegedly hesitated on the relay throw, allowing the winning run to score. Whether fair or not, it haunted him for decades. Postseason BA below .250. Rating of 0 — the anti-clutch narrative, however unfair, defines his October legacy.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Heart-on-his-sleeve, beloved by all, emotionally transparent. Pesky was never the best player in the room — Williams, Doerr, DiMaggio were his teammates — but he was the emotional center. He led through loyalty, effort, and an unbreakable bond with the franchise. As a manager, he brought fire but sometimes clashed with stars (Yastrzemski). His leadership was relational, not tactical.",
    temperament: "Warm, gregarious, deeply emotional. Pesky cried openly when discussing the 1946 World Series loss decades later. He was fiercely loyal to Tom Yawkey and the Red Sox. He could be fiery as a manager — clashing with Dick Stuart and Yastrzemski — but off the field he was universally beloved. The kind of man who remembers every clubhouse attendant's name.",
    work_ethic: "Tireless. Played semipro ball at 17, signed at 20, made the majors at 23, served 3 years in the Navy, came back and led the league immediately. After his playing career, he managed, coached, broadcast, instructed, and served as ambassador for 50+ more years. He was hitting fungoes in his 80s. Still in uniform at Fenway at 92.",
    lifestyle: "Son of Croatian immigrants (born Paveskovich). Grew up near the Portland Beavers ballpark, worked as a clubhouse boy. Married Ruth Hickey (a WAVE he met in the Navy) — they stayed married 60+ years. Adopted one son. Lived on Boston's North Shore his entire adult life. Became a TV commercial spokesman ('The Window Boys'). Embodied the working-class New England baseball life.",
    era_adaptability: "MODERATE. Pesky's contact skills and on-base ability would be valued in any era — a .394 career OBP plays everywhere. But his complete lack of power (17 HR in 10 seasons) would be a significant liability in modern baseball. He'd be a top-of-the-order table-setter, but analytics departments would question his overall value. In ILB terms: Pesky is a high-floor role player whose real value is off the stat sheet — in chemistry, loyalty, and franchise continuity.",
    clubhouse_impact: "LEGENDARY. 'Mr. Red Sox.' 61 years with the organization. When the Red Sox finally won the 2004 World Series, players embraced Pesky as the living symbol of every team that had fallen short. He raised the championship banner with Yastrzemski. His number was retired despite never making the Hall of Fame — a testament to what he meant beyond statistics.",
    dark_side: "'Pesky held the ball.' Five words that haunted him for 66 years. In Game 7 of the 1946 World Series, Enos Slaughter scored from first on Harry Walker's hit. Pesky, the relay man, allegedly hesitated before throwing home. Film evidence is ambiguous — the throw may not have gotten Slaughter regardless. But the narrative stuck. Pesky bore it with grace, but friends said it tormented him privately. In ILB terms: Pesky carries a 'Scapegoat' trait — when the team loses a big game, there's a chance Pesky absorbs disproportionate blame.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Mr. Red Sox", desc: "61 years with one franchise. Maximum loyalty bonus. Cannot be traded without severe chemistry penalty to entire team." },
    { tag: "The Teammates", desc: "Core member of the Williams-Doerr-DiMaggio-Pesky quartet. +2 chemistry when paired with any of them." },
    { tag: "Table Setter", desc: "Gets on base (.394 OBP) for the power hitters behind him. +1 to the next batter's RBI opportunities." },
    { tag: "Pesky's Pole", desc: "At Fenway Park, Pesky gains +1 POW (from 0 to 1). Everywhere else, he's powerless." },
    { tag: "Scapegoat", desc: "When the team loses a crucial game, 25% chance Pesky absorbs blame regardless of actual performance. -1 morale for him, but team is spared." },
    { tag: "Immigrant Son", desc: "Croatian heritage. +1 chemistry with players from immigrant backgrounds. Understands the hustle." },
    { tag: "Fungo King", desc: "As a coach, Pesky hit thousands of fungoes to Yaz, Rice, and others. +1 DEF development for all infielders when Pesky is on staff." },
    { tag: "Forever Young", desc: "Pesky stayed in baseball for 73 years. He never leaves the franchise. Post-career, he becomes a permanent coaching bonus." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Fenway Park / Ballpark", affinity: "HIGH", note: "His home for 61 years. Pesky's Pole. The fungoes. The bench. He never wanted to be anywhere else." },
    { location: "Community Events", affinity: "HIGH", note: "Commercial spokesman, autograph sessions, fan meetups. 'The Window Boys.' Always available." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The emotional heartbeat. Knew every player, every attendant, every tradition." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Social, convivial. Team dinners with Williams, Doerr, and Dom DiMaggio." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Family man. Went home to Ruth and David. Quiet domestic life on the North Shore." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a drinker or nightlife player. Too busy being at the ballpark." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association whatsoever." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Season openers and returns — led AL in hits immediately after 3-year WWII absence",
      "Playing alongside Williams — Pesky hit best when Ted was in the lineup behind him",
      "Hit streaks — recorded a 26-game hitting streak in 1947",
      "Fenway Park — batted .313 with .401 OBP at home over his Red Sox career",
    ],
    cold_triggers: [
      "Position changes — moving to 3B in 1948 dropped his average to .281",
      "Postseason pressure — .233 in the 1946 World Series",
      "Scapegoating — when 'held the ball' narrative activates, Pesky's confidence suffers",
    ],
    pressure_response: "VULNERABLE. Pesky was a superb regular-season performer but the 1946 World Series (.233) remains his defining October moment — and not in a good way. The 'held the ball' play wasn't entirely his fault, but it became his legacy for decades. In ILB terms: Pesky is a card you play all season long, but you might want to sub him out in Game 7. His value is in the 162, not the final inning.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Pesky Held the Ball",
      type: "Game Action",
      text: "In the decisive game of a series, the opponent's runner breaks from first on a single. Your relay man catches the throw from the outfield and hesitates — just a beat. The runner scores. Your team loses. The relay man carries the blame for decades, whether deserved or not.",
      origin: "Game 7, 1946 World Series. Enos Slaughter's 'mad dash' from first scored the winning run. Pesky, the relay man, allegedly hesitated. Film is ambiguous. The narrative destroyed his October legacy.",
    },
    {
      title: "Two Hundred Hits, Three Straight Years",
      type: "Action",
      text: "Your leadoff hitter reaches 200 hits for the third consecutive season. He becomes the franchise standard for consistency. +2 to his legacy score. The hits record stands for 30+ years.",
      origin: "Pesky led the AL in hits in 1942 (205), 1946 (208), and 1947 (207) — his first three seasons, separated by WWII. First AL player to accomplish this.",
    },
    {
      title: "From Paveskovich to Pesky",
      type: "Drama",
      text: "A player with an unpronounceable immigrant surname legally changes his name to something simpler. The press embraces the new name. +1 public appeal. But his immigrant family has mixed feelings about the change.",
      origin: "Born John Michael Paveskovich to Croatian immigrants. Sportswriters shortened it to 'Pesky' because it fit in box scores. He legally changed his name in 1947.",
    },
    {
      title: "The Three-Year Gap",
      type: "Drama",
      text: "Your star player returns from three years of military service. Will he still be the same hitter? Roll d6: on 4+, he leads the league in his first season back. On 1-3, he's lost a step and struggles to adjust.",
      origin: "Pesky served in the Navy 1943-45, missing three prime years. He returned in 1946 and immediately led the AL in hits (.335, 208 H). The gap barely slowed him.",
    },
    {
      title: "Pesky's Pole",
      type: "Game Action",
      text: "Your weakest power hitter wraps a fly ball around the right-field foul pole — just 302 feet from home plate. Home run! The pole is named after him forever. He'll take it.",
      origin: "The right-field foul pole at Fenway Park is named 'Pesky's Pole' after broadcaster Mel Parnell joked it was the only place the 17-career-HR Pesky could hit one out.",
    },
    {
      title: "Six Runs in Nine Innings",
      type: "Game Action",
      text: "Your leadoff hitter scores six times in a single game — an AL record. He doesn't hit a single home run. He just keeps getting on base and coming around to score. The ultimate table-setter performance.",
      origin: "On May 8, 1946, Pesky scored 6 runs in a 14-10 win over the White Sox — the first AL player to do so in a 9-inning game.",
    },
    {
      title: "Mr. Red Sox",
      type: "Drama",
      text: "A beloved player retires but never leaves the franchise. Over the next 50 years, he serves as manager, coach, broadcaster, instructor, commercial spokesman, and living symbol. When the team finally wins the championship, he raises the banner. His number is retired not for Hall of Fame stats but for Hall of Fame loyalty.",
      origin: "Pesky spent 61 of his 73 years in baseball with the Red Sox. He raised the 2004 World Series banner. His #6 was retired in 2008 — the first Red Sox number retired for a non-HOFer.",
    },
    {
      title: "The Window Boys",
      type: "Action",
      text: "Your retired player becomes a local TV commercial star, doing deliberately corny ads for a home improvement company. Fans love it. +2 to local popularity. The player becomes a community institution.",
      origin: "Pesky and the owner of JB Sash and Door Company became 'The Window Boys' in a series of beloved, intentionally cheesy Boston TV commercials.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, wiry frame at 5'9\" 168 lbs. Open, friendly face with a warm smile and bright eyes. Not physically imposing — scrappy, energetic, the kid from the neighborhood who made good. Croatian features softened by the American sun. The face of a man you'd trust with your franchise for 61 years.",
    attire: "Boston Red Sox home whites, 1946 style. Number 6. Classic postwar wool flannel, red stockings visible. Bat on shoulder or in contact follow-through — the slap hitter in action. Cap slightly back, showing his face.",
    mood: "Joy and determination in equal measure. The look of a man who just got his 208th hit of the season, who came back from the war and picked up exactly where he left off. But with a shadow behind the eyes — the World Series loss is coming, and he doesn't know it yet.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Fenway Park in the background — the Green Monster looming, the right-field foul pole (his pole) barely visible. Postwar optimism in the light quality — bright, hopeful, 1946 America.",
    reference: "Think the classic 1946 Red Sox team photos — Pesky alongside Williams, Doerr, DiMaggio. But isolate Pesky. The loyal soldier. The heart of the team. The card should feel warm and slightly bittersweet — great player, great man, one terrible moment that followed him forever.",
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

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag, desc }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function JohnnyPeskyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;
  const tabs = [
    { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Sepia-toned, contact swing follow-through, Red Sox #6, Fenway Park]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📊 Led AL Hits 3×", "⭐ 1946 All-Star", "🏟️ Pesky's Pole", "🎖️ WWII Navy Veteran", "6️⃣ #6 Retired by Red Sox", "❤️ Mr. Red Sox"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>
                <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
              </>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Pesky's real life, become universal cards playable in any game.</p>
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
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>This is the reusable formula for converting real Baseball Reference stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Pesky's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}

        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team,
  stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
