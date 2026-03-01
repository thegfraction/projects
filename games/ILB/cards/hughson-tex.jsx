import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: TEX HUGHSON
  // Year Snapshot: 1946 (20-Win Season, Pennant Clinch, World Series)
  // ═══════════════════════════════════════════════════════════════

  name: "Tex Hughson",
  nickname: "The Texan",
  year: 1946,
  team: "Boston Red Sox",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'3"',
  weight: "198 lbs",
  born: "February 9, 1916 — Buda, TX",
  died: "August 6, 1993 — San Marcos, TX (age 77)",
  hof: "Not inducted. Red Sox HOF (2002). Texas Sports HOF (1987). UT Hall of Honor (1970). Career .640 W%.",

  real_stats: {
    season: 1946, games: 35, wins: 20, losses: 11, era: "2.75",
    innings: "278.0", strikeouts: 172, walks: 51, complete_games: 21,
    shutouts: 6, whip: "1.15", war: 5.5,
    career_wins: 96, career_losses: 54, career_era: "2.94",
    career_strikeouts: 693, career_cg: 99, career_shutouts: 19,
    career_war: 24.2, no_hitters: 0, ws_era: "3.14",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF) — 2.75 ERA → tier 2 (2.50-2.99). K/9 = 5.57 → no bonus (<6.0). STF = 2.
  // CONTROL (CTL) — BB/9 = 1.65 → tier 3 (1.5-1.99). Led AL in BB/9. WHIP 1.15 → no bonus. CTL = 3.
  // STAMINA (STA) — 278.0 IP → tier 3 (250-299). 21 CG. STA = 3.
  // DEFENSE (DEF) — No standout defensive metrics for pitcher. DEF = 0.
  // CLUTCH (CLU) — 1946 WS: 0-1, 3.14 ERA in 14.1 IP.
  //   Pitched well in G1 (8 IP, 2 ER) but got no decision. Lost no games badly.
  //   PS ERA 3.00-4.00 → tier 1. Clinched pennant with 1-0 shutout on Sept 13. CLU = 1.
  // OVERALL — 96-54 career (.640 W%), 3× All-Star, Red Sox ace during peak.
  //   But career cut short by arm injury. Only 8 seasons, 24.2 WAR.
  //   OVR = 6 (Solid Starter — excellent peak, too brief for higher).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,      // Solid Starter — exceptional peak cut brutally short by injury
    stf: 2,      // 2.75 ERA → tier 2. K/9 5.57 → no bonus. Good stuff, not elite in peak year.
    ctl: 3,      // BB/9 1.65 → tier 3 (1.5-1.99). Led AL in BB/9. Best control on the Allies staff.
    sta: 3,      // 278.0 IP → tier 3 (250-299). 21 CG in 35 starts. Durable when healthy.
    def: 0,      // No standout fielding metrics. Adequate for a pitcher. DEF = 0.
    clu: 1,      // WS: 0-1, 3.14 ERA. Pitched well but didn't win. Clinched pennant with 1-0 gem. CLU = 1.
  },

  stat_justification: {
    stf: "2.75 ERA in 1946, half a run better than teammate Dave Ferriss. 172 K was a career high. Hughson was a power pitcher — hard fastball mixed with an overhand curveball, not afraid to throw inside. But in 1946, his best ERA years (2.26 in 1944, 2.59 in 1942) were behind him. He was returning from military service with a slightly diminished arm. Still excellent — just not at his absolute peak. Rating of 2.",
    ctl: "BB/9 of 1.65 in 1946 — led the American League. Only 51 walks in 278 innings. This was Hughson's secret weapon: unlike most power pitchers, he threw strikes. Career 1.86 K/BB ratio with 693 K to 372 BB. In 1944 he led the AL in WHIP (1.05) and FIP (2.33). Hughson's control was elite and separates him from wild fireballers. Rating of 3.",
    sta: "278.0 IP in 1946 with 21 complete games. In 1942 he threw 281 IP with 22 CG. Hughson was a durable workhorse — until the arm injuries hit in 1947. The numbness in his middle finger and circulatory problems ended his career within two years. When healthy, Hughson pitched deep into every game. Rating of 3.",
    def: "No exceptional fielding statistics for a pitcher. Hughson was adequate defensively. No Gold Glove equivalence. Rating of 0.",
    clu: "1946 World Series: 0-1, 3.14 ERA in 14.1 IP. Started Game 1 (8 IP, 2 ER, no decision — Red Sox won in 10th). Started Game 4 (lost 12-3, but pulled after trouble in the 3rd). Relieved in Game 6. His Game 1 was a quality outing that the team won. But no hero moment — and the Red Sox lost the Series in 7. However, he clinched the AL pennant on September 13 with a masterful 1-0 three-hit shutout. Rating of 1 — solid but not spectacular October performer.",
  },

  personality: {
    leadership_style: "Ace competitor, lead-by-performance. Hughson was the man teammates Doerr and Pesky wanted on the mound in a crucial game — the ultimate endorsement. He relished big-game matchups: 'I would rather beat the Yankees once than any other team twice.' Not vocal, not demonstrative — just utterly reliable when the stakes were highest.",
    temperament: "Texas-tough, competitive, fearless. Hughson threw inside and wasn't afraid of confrontation. He mixed a hard fastball with an overhand curve that kept batters honest. Competitive fire burned hot but controlled — he channeled it through precision, not wildness. When a Jimmy Bloodworth line drive broke his pitching thumb in 1943, he tried to come back too soon because he couldn't stand watching from the bench.",
    work_ethic: "Ranch-bred durability. Hughson grew up working cattle on his family's ranch in Central Texas. That physical toughness translated to the mound — 22 complete games in his breakout 1942 season, 21 CG in 1946. He completed 99 games in an 8-year career. He also served in WWII, playing baseball on Saipan and writing letters home to manager Cronin about building ballparks out of bomb crates.",
    lifestyle: "Texas rancher from birth to death. Born in Buda, grew up in Kyle, attended University of Texas, returned to San Marcos after baseball. One of the first Americans to raise Charolais cattle. Developed family ranchland into the Hughson Heights subdivision — with a street called Fenway Loop. Served on the local school board and led the effort to integrate public schools in the 1950s. Married to Roena Moore, three children.",
    era_adaptability: "MODERATE-HIGH. Hughson's combination of power and control would translate well to any era. His BB/9 of 1.65 is elite by any standard. His K/9 was modest (5.57 in 1946) but his ability to pitch deep into games and throw strikes would make him valuable anywhere. The main question is durability — his arm broke down at 31. Modern medicine might have saved his career.",
    clubhouse_impact: "TRUSTED ACE. Hughson wasn't the loudest voice, but he was the man his teammates trusted most. Doerr and Pesky both named him as their go-to pitcher for crucial games. He was the workhorse of the Red Sox rotation alongside Dave Ferriss — their first pair of 20-game winners since Grove and Ferrell in 1935. His Texas personality — straightforward, hard-working, no-nonsense — earned universal respect.",
    dark_side: "The arm that died young. In May 1947, Hughson developed numbness in his middle finger — a circulatory problem that destroyed his ability to grip the ball. Two seasons of surgery and rehabilitation failed. He went from 20-win ace to ineffective reliever in two years. The Red Sox finished second by one game in both 1948 and 1949 — they were 'Always One Pitcher Short,' and that pitcher was Hughson. Sportswriter Ed Linn's famous phrase haunts his legacy. In ILB terms: Hughson carries an 'Arm Death' trait — after age 31, 40% chance per season of permanent career-ending injury.",
  },

  chemistry_traits: [
    { tag: "Texas Tough", desc: "Ranch-bred durability and competitive fire. Hughson pitches through pain and never makes excuses. -1 fatigue penalty." },
    { tag: "Yankee Killer", desc: "'I would rather beat the Yankees once than any other team twice.' +1 STF when facing New York." },
    { tag: "Doerr & Pesky's Pick", desc: "Teammates named Hughson as the man they wanted on the mound in a crucial game. +1 chemistry with Red Sox teammates." },
    { tag: "Control Artist", desc: "BB/9 of 1.65 led the AL. Hughson walked almost nobody. Opposing batters can't draw walks easily." },
    { tag: "Arm Death", desc: "Circulatory problems in pitching hand. After age 31, 40% chance per season of permanent -2 STF or career-ending injury." },
    { tag: "Always One Pitcher Short", desc: "When Hughson goes down, the Red Sox collapse. His absence costs the team pennant races. -2 team pitching when injured." },
    { tag: "School Board Integrator", desc: "Led effort to integrate public schools in San Marcos. +1 respect from all teammates regardless of era or background." },
    { tag: "Fenway Loop", desc: "Named a street in his subdivision after Fenway Park. +1 morale at Fenway. Hughson is a Red Sox lifer in spirit." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "99 career CG. The man teammates wanted on the mound when it mattered most." },
    { location: "Ranch / Farm", affinity: "HIGH", note: "Texas rancher. Raised Charolais cattle. Family meat company. Ranch-bred toughness." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Trusted ace. Quiet confidence. Doerr and Pesky's go-to man." },
    { location: "University / School", affinity: "MEDIUM", note: "UT Austin graduate. Led school integration effort. Education mattered to him." },
    { location: "Real Estate Office", affinity: "MEDIUM", note: "Developed Hughson Heights subdivision after baseball. Successful businessman." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Texas rancher — early to bed, early to rise." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Straight-arrow Texan." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — clinched the 1946 AL flag with a 1-0 three-hit shutout",
      "Yankee matchups — Hughson went 5-1 vs. NY in 1942, loved the rivalry",
      "Complete game opportunities — the deeper Hughson went, the better he pitched",
      "Return from adversity — came back from WWII to win 20 games immediately",
    ],
    cold_triggers: [
      "Arm injuries — the numbness and circulatory problems could strike at any time post-1946",
      "World Series pressure — 0-1 in the WS despite pitching reasonably well",
      "Manager conflicts — clashed with Joe McCarthy in 1948-49, affecting performance",
    ],
    pressure_response: "RELIABLE-TRAGIC. Hughson was the pitcher everyone wanted for the biggest game — and he usually delivered. His pennant-clinching 1-0 shutout on September 13, 1946 was one of the great pitching performances of the decade. Four of his six shutouts that year were 1-0 games. But the World Series eluded him (0-1, Red Sox lost in 7), and his arm betrayed him just when the Red Sox needed him most. In ILB terms: Hughson delivers in the regular season at +1 STF in clinching scenarios, but carries a hidden -1 in World Series play.",
  },

  action_card_seeds: [
    {
      title: "The Pennant Clincher",
      type: "Game Action",
      text: "Your ace throws a three-hit shutout to clinch the pennant, 1-0. The only run scores on your star hitter's only career inside-the-park home run. The game takes an hour and 28 minutes. Perfect efficiency.",
      origin: "September 13, 1946. Hughson beat the Indians 1-0 on three hits to clinch the AL pennant. Ted Williams hit his only career inside-the-park HR to beat the shift. Game time: 1 hour 28 minutes.",
    },
    {
      title: "Beat the Yankees Twice",
      type: "Game Action",
      text: "Your pitcher lives for facing the best team in the league. He goes 5-1 against them in his breakout year. 'I would rather beat them once than any other team twice.' The pinstripes don't intimidate him — they motivate him.",
      origin: "Hughson went 5-1 vs. the Yankees in 1942, his breakout 22-win season. He told reporter Oren Renick the famous quote about preferring to beat New York above all.",
    },
    {
      title: "The Broken Thumb Comeback",
      type: "Action",
      text: "A line drive breaks your pitcher's thumb on his pitching hand. He returns too soon — can't grip the ball properly — and loses 8 of his last 9 decisions. But his willingness to pitch through the pain earns his teammates' lifelong respect.",
      origin: "In 1943, Jimmy Bloodworth's line drive broke Hughson's pitching thumb. He returned prematurely and won only 1 of his last 9 decisions. He couldn't grip the ball but refused to stay out.",
    },
    {
      title: "Building Ballparks from Bomb Crates",
      type: "Drama",
      text: "Your pitcher writes a letter home from a Pacific island during the war: 'We built our own park to play in. The seats are made exclusively of bomb crates, of which we have plenty here.' He fought the war with a baseball bat.",
      origin: "Hughson wrote to manager Cronin from Saipan in 1945 about building a baseball park from bomb crates. He played in the Marianas League — three Navy teams on three islands.",
    },
    {
      title: "Always One Pitcher Short",
      type: "Drama",
      text: "Your ace's arm gives out. The team finishes second by one game — two years in a row. Sportswriters coin a phrase for the collapse. The missing pitcher haunts the franchise for decades.",
      origin: "Hughson's arm died in 1947. The Red Sox finished second by one game in 1948 and 1949. Ed Linn called the era 'Always One Pitcher Short.' Hughson was that pitcher.",
    },
    {
      title: "Four 1-0 Shutouts",
      type: "Game Action",
      text: "Your pitcher throws six shutouts in one season. Four of them are 1-0 games. He wins them all. Every single run matters. Every single pitch matters. He walks almost nobody.",
      origin: "In 1946, Hughson threw 6 shutouts. Four were won 1-0 — including the pennant-clinching masterpiece. He led the AL in BB/9 (1.65) while doing it.",
    },
    {
      title: "The Numbness",
      type: "Drama",
      text: "Your ace develops numbness in his middle finger. He can't grip the ball. He pitches through it for months, but the circulatory problems worsen. Surgery follows surgery. He never pitches effectively again. He's 31 years old.",
      origin: "In May 1947, Hughson developed numbness in his middle finger from circulatory problems. Multiple surgeries failed. He went from 20-game winner to ineffective reliever in two seasons.",
    },
    {
      title: "Fenway Loop",
      type: "Action",
      text: "Your retired pitcher returns to his ranch and develops part of it into a housing subdivision. He names one of the streets after his old ballpark. The street name outlasts his career stats in local memory.",
      origin: "Hughson developed his San Marcos ranch into the Hughson Heights subdivision. Streets include Hughson Drive, Hughson Court, and — of course — Fenway Loop.",
    },
  ],

  art_direction: {
    face: "Tall, imposing at 6'3\" 198 lbs. Texas rancher's build — lean, powerful, weathered. Not pretty-boy handsome but strong-featured and commanding. Square jaw, sun-creased eyes, the look of a man who grew up working cattle and throwing baseballs. Right-handed delivery — overhand curve breaking downward.",
    attire: "Boston Red Sox home whites, 1946 style. Number 21 (same number Roger Clemens would later wear). Classic postwar wool flannel, Red Sox cap. Mid-delivery — the power fastball heading to the plate, the overhand curve snapping down.",
    mood: "Focused intensity. The pennant-clinching shutout — a 1-0 masterpiece, three hits allowed, perfect control. Hughson in his element: big game, small margin, total command. The face says: 'I'd rather beat the Yankees once than any other team twice.'",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Fenway Park in 1946 — the Green Monster rising behind him, September afternoon light, pennant race atmosphere. The card should feel like quiet Texas toughness — no flash, all substance.",
    reference: "Think Red Sox aces at their most dependable — Hughson was Pedro before Pedro, Clemens before Clemens, the man the franchise built around. The card should convey reliability and tragedy in equal measure — this arm was magnificent, and it died too young.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA + K/9", tiers: [{ range: "ERA 3.50+", value: 0 },{ range: "ERA 3.00-3.49", value: 1 },{ range: "ERA 2.50-2.99", value: 2 },{ range: "ERA 2.00-2.49", value: 3 },{ range: "ERA 1.50-1.99", value: 4 },{ range: "ERA <1.50", value: 5 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 + WHIP", tiers: [{ range: "BB/9 3.0+", value: 0 },{ range: "BB/9 2.5-2.99", value: 1 },{ range: "BB/9 2.0-2.49", value: 2 },{ range: "BB/9 1.5-1.99", value: 3 },{ range: "BB/9 1.0-1.49", value: 4 },{ range: "BB/9 <1.0", value: 5 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199 IP", value: 1 },{ range: "200-249 IP", value: 2 },{ range: "250-299 IP", value: 3 },{ range: "300-349 IP", value: 4 },{ range: "350+ IP", value: 5 }] },
  defense: { metric: "Fielding + Gold Gloves (pitcher)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG equivalent", value: 1 },{ range: "3-5 GG equivalent", value: 2 },{ range: "6+ GG equivalent", value: 3 }] },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00 or no PS", value: 0 },{ range: "PS ERA 3.00-4.00", value: 1 },{ range: "PS ERA < 3.00", value: 2 }], bonus: "WS clinching win → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function TexHughsonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, overhand curve, Red Sox #21, Fenway Park]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "WS ERA", val: d.real_stats.ws_era }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 8 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 3× All-Star (42-44)", "👑 Led AL Wins (1942)", "📊 96-54 (.640 W%)", "🔥 Led AL BB/9 (1946)", "🎖️ WWII Veteran", "🏟️ Red Sox HOF (2002)", "🤠 TX Sports HOF", "📜 99 Career CG"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Hughson's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Pitcher Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Modified engine for pitchers: STF/CTL/STA replace CON/POW/SPD.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Hughson's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
