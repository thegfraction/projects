import { useState } from "react";

const FERRELL_DATA = {
  name: "Wes Ferrell",
  nickname: "The Slugging Pitcher",
  year: 1930,
  team: "Cleveland Indians",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'2\"",
  weight: "195 lbs",
  born: "February 2, 1908 — Greensboro, North Carolina (160-acre dairy and tobacco farm, 5th of 7 brothers)",
  died: "December 9, 1976 — Sarasota, Florida (age 68)",
  hof: "Not inducted (considered by Veterans Committee 2009). Boston Red Sox HOF (2008). Top 100 Greatest Indians (2001). Named to Ritter & Honig's 100 Greatest Players. Best-hitting pitcher in history.",

  real_stats: {
    season: 1930, games: 43, wins: 25, losses: 13, era: "3.31",
    innings: "296.2", strikeouts: 143, walks: 109, complete_games: 25,
    shutouts: 4, whip: "1.39", ops_plus_against: "N/A", war: 7.5,
    career_wins: 193, career_losses: 128, career_era: "4.04",
    career_strikeouts: 985, career_cg: 227, career_shutouts: 17,
    career_war: 38.5, no_hitters: 1, perfect_games: 0,
  },

  // Pitcher stat conversion: STF/CTL/STA/DEF/CLU
  ilb_stats: {
    ovr: 8,      // All-Star — 6× 20-game winner. Only pitcher since 1900 with 20 wins in first 4 full seasons. Best-hitting pitcher ever. 38.5 career WAR.
    stf: 2,      // 3.31 ERA → tier 1 (3.00-3.49) normally, but in context: league avg ERA was 4.54. ERA+ 126. K/9 ~4.34 → no bonus. Compared to Christy Mathewson by contemporaries. Excellent fastball + curve + changeup. Bumped to STF 2 for era-adjusted dominance.
    ctl: 1,      // BB/9 ~3.31 → tier 0 (3.0+). But WHIP 1.39 in a 1930 high-offense context is reasonable. Ferrell walked batters but also struck them out. Bump to CTL 1 for era context.
    sta: 3,      // 296.2 IP → tier 3 (250-299). 25 CG. Led AL in IP 3 times. Topped 300 IP twice. Durable workhorse.
    def: 1,      // .975 career fielding pct — 4th highest in AL history for pitchers at that time. Good fielding pitcher. Plus: the HITTING. .280 career BA, 38 HR, .446 SLG as a PITCHER. The bat alone earns DEF 1 as proxy for total pitcher value.
    clu: 0,      // Never reached the postseason. Played for perpetually mediocre teams (4th-place Indians, 4th-6th-place Red Sox). Zero postseason data. CLU 0 by default.
  },
  
  stat_justification: {
    stf: "3.31 ERA in 1930 — a year when the AL average ERA was 4.65. ERA+ of 126 means he was 26% better than league average. Compared to Christy Mathewson by contemporaries for his size, control, and 'seemingly effortless motion.' Excellent fastball, good curve, deceptive changeup. Led AL in strikeouts in 1930 season extension. No-hitter in 1931 (youngest in Cleveland history). But K/9 of ~4.34 doesn't trigger the bonus. Rating of 2 — era-adjusted bump from 1 to 2 for the historical context.",
    ctl: "BB/9 of ~3.31 (109 walks in 296.2 IP) → tier 0. But the 1930 AL was a hitter's paradise. Ferrell walked people but also completed 25 games and threw 4 shutouts. His WHIP of 1.39 was solid for the era. Mild era-context bump to CTL 1.",
    sta: "296.2 IP in 1930 — 25 complete games. Led the AL in innings pitched 3 times in his career. Topped 300 IP twice (1935: 322.1 IP with 31 CG). Eight seasons of 200+ IP. 227 career CG. Durable workhorse, though arm troubles emerged in 1933. Rating of 3.",
    def: ".975 career fielding percentage — 4th highest in AL history for pitchers. Good fielding pitcher. But the true value here is his BAT: .280 career BA, 38 HR (record for a pitcher), .446 SLG, .351 OBP, 208 RBI, 329 hits. Hit .319 with 9 HR in 1931. Hit .347 in 1935. Homered in his own no-hitter. Five times hit 2 HR in a game. The best-hitting pitcher in baseball history. DEF 1 as proxy for total pitcher value including the bat.",
    clu: "Never reached the postseason. Played for Cleveland (4th place every year), Boston (4th-6th), Washington (5th-6th). The Indians finished above .500 but never won the pennant. Ferrell never got an October stage. Like Trosky: the tragedy of talent on mediocre teams. CLU 0 by default.",
  },

  personality: {
    leadership_style: "The Volatile Ace. Ferrell was a fierce competitor whose intensity crossed into self-destruction. He refused to be pulled from games — suspended multiple times for insubordination. He once punched himself in the face after being driven from the mound, then slammed his head into the wall until teammates restrained him. He was not a leader. He was a force of nature that teammates either rode or got out of the way of.",
    temperament: "Volcanic. Ferrell's intensity was both his greatest asset and his worst enemy. He was fined and suspended repeatedly for refusing to leave games, for leaving without permission, for disputing calls, for fighting with managers. He and his brother Rick were ejected together after Rick defended Wes for arguing a strike call. SABR: 'It isn't only the pain... it's the mental unrest. It's the worry, the fear that perhaps the arm will not come around.' His anxiety about his arm manifested as rage.",
    work_ethic: "Extraordinary when healthy. Four consecutive 20-win seasons to start his career — the only pitcher since 1900 to do this. Six 20-win seasons total. He won 20 games in 1936 for a Red Sox team that won only 74 games. He was the ace of every staff he joined. But when the arm hurt, the mental spiral began — anger, fear, self-harm, holdouts, suspensions.",
    lifestyle: "North Carolina farm family. Born on a 160-acre dairy and tobacco farm in Greensboro. Fifth of seven brothers — all played baseball. Brother Rick became a HOF catcher; they formed the 'Ferrell battery' in Boston for 5 seasons. Brother George played 18 years in the minors. Wes married and settled quietly after baseball. Died in Sarasota, Florida at 68. No drama in retirement — the fury belonged to the diamond.",
    era_adaptability: "HIGH. Ferrell would be a unicorn in modern baseball: a starting pitcher who hits .280 with power. In the post-DH National League or in Shohei Ohtani's world, Ferrell would be worth an extra 2-3 WAR just from his bat. His pitching — four consecutive 20-win seasons, ERA+ of 126 — would make him a solid #2 starter. His temper would require modern sports psychology, but his talent is undeniable.",
    clubhouse_impact: "DISRUPTIVE BUT ELECTRIFYING. Ferrell inspired awe and anxiety in equal measure. When he was pitching well, the entire team elevated. When he wasn't, he might punch himself in the face. Managers dreaded confronting him. Teammates admired his intensity but feared the explosions. The Ferrell-Rick battery was a calming force — Rick was the steady brother who absorbed Wes's chaos.",
    dark_side: "The self-harm. After being driven from the mound in one game, Ferrell punched himself in the face and slammed his head into the wall. Teammates had to physically restrain him. This wasn't an isolated incident — his rage was chronic and escalating. When his arm began to fail in 1933, the anxiety became unbearable: 'It isn't only the pain... it's the mental unrest. It's the worry, the fear that perhaps the arm will not come around and it weighs on a pitcher. Plenty of times it has kept me awake nights.' Modern diagnosis would likely identify severe anxiety or anger management issues. In the 1930s, he was just called difficult.",
  },

  chemistry_traits: [
    { tag: "The Slugging Pitcher", desc: "Ferrell bats .280 with power. When pitching, he also contributes +1 POW to his own lineup. The only pitcher card in ILB that adds offensive value while on the mound." },
    { tag: "Volcanic Temperament", desc: "After any bad inning (3+ runs allowed), 25% chance Ferrell triggers a rage event: refuses to leave the mound (50% he settles down, +1 STF next inning; 50% he implodes, -2 STF rest of game, possible ejection)." },
    { tag: "Brother Battery", desc: "When paired with catcher Rick Ferrell (or any Ferrell-family card), +1 STF and +1 CLU. The brother battery effect: Rick steadied Wes." },
    { tag: "Four Straight Twenties", desc: "Ferrell wins 20+ in his first 4 full seasons. If he wins 15+ in year 1, 80% chance of 20+ in years 2-4. Momentum builds. Only post-1900 pitcher to achieve this." },
    { tag: "Self-Harm Risk", desc: "After being pulled from a game, 10% chance Ferrell injures himself in the dugout (punching, headbutting). If triggered: miss 3 games, -2 team morale. Can be mitigated by Brother Battery trait." },
    { tag: "Holdout Artist", desc: "If Ferrell's contract offer is below his perceived value, 40% chance he refuses to report. Holdout lasts 1-6 weeks. Missing games damages team but increases Ferrell's eventual salary." },
    { tag: "No-Hitter with a Homer", desc: "Once per career, Ferrell can throw a no-hitter AND hit a home run in the same game. 2% chance per start. If triggered: +5 team morale, +3 publicity, Ferrell gains 'Legend' trait for the season." },
    { tag: "Arm Anxiety", desc: "Starting in year 5 of career, 15% chance per season of arm trouble. If triggered: -1 STF permanently, and Ferrell's anxiety worsens (additional -1 morale). The fear of the arm not coming around." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "296.2 IP in 1930. 25 CG. He owned the mound and refused to leave it — literally. Suspended multiple times for insubordination." },
    { location: "Batter's Box", affinity: "HIGH", note: ".280 career BA, 38 HR, .446 SLG. The best-hitting pitcher in history. He belonged in the lineup regardless of position." },
    { location: "Farm / North Carolina", affinity: "HIGH", note: "160-acre dairy and tobacco farm in Greensboro. All seven Ferrell brothers played baseball. The family was his foundation." },
    { location: "Dugout / Clubhouse", affinity: "VOLATILE", note: "Could be the life of the team or a ticking bomb. Depended entirely on how his arm felt and how the game was going." },
    { location: "Manager's Office", affinity: "LOW", note: "Holdouts, arguments, ejections, suspensions. Every manager who had Ferrell loved his arm and dreaded his personality." },
    { location: "Doctor's Office", affinity: "LOW", note: "Arm anxiety kept him up at night. 'It's the worry, the fear that perhaps the arm will not come around.'" },
    { location: "Postseason", affinity: "NONE", note: "Never reached the postseason. Played for perpetually mediocre teams. The greatest October he never had." },
  ],

  momentum: {
    hot_triggers: [
      "Early career seasons — four consecutive 20-win years, unstoppable when young and healthy",
      "Hitting — .319 with 9 HR in 1931, .347 in 1935. His bat elevated the entire team",
      "Brother battery with Rick Ferrell — the calming presence behind the plate",
      "Complete game dominance — 25 CG in 1930, 31 CG in 1935. He finished what he started.",
    ],
    cold_triggers: [
      "Arm pain and anxiety — the fear of the arm not coming around consumed him",
      "Being pulled from games — triggered rage, self-harm, suspensions",
      "Contract disputes and holdouts — refused to report, poisoned relationships",
      "Playing for weak teams — never won a pennant, never saw October, perpetual 4th place",
    ],
    pressure_response: "UNKNOWN — AND AGONIZING. Like Trosky, Ferrell never played a postseason game. But unlike Trosky's quiet acceptance, Ferrell's absence from October was a wound that bled. He won 25 games for a team that finished 4th. He won 20 for a team that won 74 games total. He was the best pitcher on the worst staffs. Bill James calculated that when you add his hitting value, Ferrell was effectively 22% better than league average. Ritter and Honig named him one of the 100 Greatest Players. And he never once pitched in a game that mattered in October.",
  },

  action_card_seeds: [
    {
      title: "The No-Hitter with a Homer",
      type: "Game Action",
      text: "Your pitcher throws a no-hitter — and hits a home run in the same game. He becomes the first modern pitcher to do this. The youngest in his franchise's history. The ball disappears into the bleachers while the opposing lineup disappears from the box score.",
      origin: "April 29, 1931: Ferrell no-hit the Browns 9-0 at League Park, striking out 8. He also hit a home run into the center-field bleachers — the first pitcher in modern baseball to homer in his own no-hitter. He was 23 years old.",
    },
    {
      title: "Punched Himself in the Face",
      type: "Drama",
      text: "After being driven from the mound, your pitcher snaps. He punches himself in the face. He slams his head into the dugout wall. Teammates have to physically restrain him. The suspension is 10 days. The reputation damage is permanent. -3 team morale, -2 manager trust.",
      origin: "Multiple incidents: Ferrell was fined and suspended repeatedly for violent outbursts after bad performances. After one shelling, he punched himself in the face and slammed his head into the wall until teammates stopped him.",
    },
    {
      title: "Four Straight Twenty-Win Seasons",
      type: "Game Action",
      text: "Your young pitcher wins 20+ games in each of his first four full seasons. No pitcher since 1900 has done this. He is compared to Christy Mathewson. He is the ace of a mediocre team. +5 reputation, but the team still finishes 4th.",
      origin: "1929-1932: Ferrell went 21-10, 25-13, 22-12, 23-13. The only pitcher since 1900 to win 20 in each of his first four full seasons. Cleveland finished 4th every year.",
    },
    {
      title: "The Ferrell Battery",
      type: "Action",
      text: "Two brothers form a pitcher-catcher battery. The pitcher is a volatile genius; the catcher is a steadying Hall of Famer. Together they are greater than the sum of their parts. The catcher's calm absorbs the pitcher's fury. +2 STF when paired.",
      origin: "Wes and Rick Ferrell played together in Boston for 5 seasons (1934-37). Rick, a HOF catcher, was the steady brother who caught Wes's rage and his fastball equally well.",
    },
    {
      title: "It's the Mental Unrest",
      type: "Drama",
      text: "Your pitcher's arm begins to fail. He can't sleep. 'It isn't only the pain — it's the worry, the fear that perhaps the arm will not come around.' His performance declines. His behavior worsens. The anxiety feeds itself. The team must decide: support the troubled ace or trade him before he implodes.",
      origin: "1933: Ferrell's arm began to fail. His candid interview about anxiety and fear was remarkably modern: 'Plenty of times it has kept me awake nights.'",
    },
    {
      title: "Twenty Wins for a Seventy-Four-Win Team",
      type: "Game Action",
      text: "Your ace wins 20 games. His team wins only 74. He accounts for 27% of the franchise's victories. He is the best player on the worst team. There is no award for this. There is no playoff. There is only 4th place.",
      origin: "1936: Ferrell won 20 games for a Red Sox team that went 74-80. He led the AL in complete games with 28. The team finished 6th.",
    },
    {
      title: "The Holdout",
      type: "Drama",
      text: "Your best pitcher returns his contract unsigned. He refuses to report to spring training. The stalemate lasts weeks. Eventually he is traded. The new team gets an ace with a chip on his shoulder. +2 STF from spite, -1 team chemistry from the drama.",
      origin: "Winter 1933-34: Ferrell returned his contract unsigned and refused to report. Cleveland tried to trade him for months. Eventually Boston acquired him in May 1934. He went 14-5 for the Red Sox.",
    },
    {
      title: "The Best-Hitting Pitcher in History",
      type: "Action",
      text: "Your pitcher hits .280 with 38 career home runs, 208 RBI, and a .446 slugging percentage. He sets the record for most HR by a pitcher in a season (9) and career (38). He hits two home runs in one game five separate times. He is named to the 100 Greatest Players of All Time — for his hitting as a pitcher.",
      origin: "Ferrell's career batting: .280 BA, 38 HR, 329 H, 208 RBI, .446 SLG. Ritter & Honig named him one of the 100 Greatest Players. Bill James: when you add his hitting, he was effectively 22% better than league average.",
    },
  ],

  art_direction: {
    face: "Strong, intense, coiled. 6'2\" 195 lbs — big for his era. North Carolina farm strength. The face should show the duality: fierce concentration on the mound, barely-contained rage. Dark eyes, set jaw. He looks like a man who might throw a perfect game or punch himself — and you can't tell which until the 7th inning.",
    attire: "Cleveland Indians 1930 home whites. The old-style 'C' on the chest. But unlike Trosky's card (also Cleveland), Ferrell's uniform should look lived-in, slightly disheveled — the uniform of a man who pitches 297 innings and refuses to come out. Sweat stains. Dirt on the knees from batting practice.",
    mood: "Fury and brilliance in equal measure. The windup — full extension, right arm cocked, eyes locked on the target — but with a bat leaning against the dugout wall in the background. Or: the follow-through of a massive home run swing, still in the pitcher's warm-up jacket. This card should feel dangerous. Not violent-dangerous. Talented-dangerous. The card of a man who could beat you from the mound or the batter's box.",
    style: "Split-personality palette. Hot reds and golds for the mound dominance; cool blues for the batting heroics. League Park's old outfield wall. The card should feel like two players on one piece of cardboard — because that's what Ferrell was.",
    reference: "The card that asks: what if the best pitcher on your team was also one of the best hitters? And what if he was also the angriest man in the building? Ferrell is the ILB card with the highest ceiling and the most dangerous floor.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA + K/9", tiers: [{ range: "ERA < 1.50", value: 5 },{ range: "ERA 1.50-1.99", value: 4 },{ range: "ERA 2.00-2.49", value: 3 },{ range: "ERA 2.50-2.99", value: 2 },{ range: "ERA 3.00-3.49", value: 1 },{ range: "ERA 3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 + WHIP", tiers: [{ range: "BB/9 < 1.0", value: 5 },{ range: "BB/9 1.0-1.49", value: 4 },{ range: "BB/9 1.5-1.99", value: 3 },{ range: "BB/9 2.0-2.49", value: 2 },{ range: "BB/9 2.5-2.99", value: 1 },{ range: "BB/9 3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched", tiers: [{ range: "< 150 IP", value: 0 },{ range: "150-199 IP", value: 1 },{ range: "200-249 IP", value: 2 },{ range: "250-299 IP", value: 3 },{ range: "300-349 IP", value: 4 },{ range: "350+ IP", value: 5 }] },
  defense: { metric: "Fielding as pitcher", tiers: [{ range: "Average", value: 0 },{ range: "Good", value: 1 },{ range: "Excellent", value: 2 },{ range: "Elite", value: 3 }] },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason record + signature moments", tiers: [{ range: "PS ERA > 4.00 or losing record", value: 0 },{ range: "PS ERA 2.50-4.00", value: 1 },{ range: "PS ERA < 2.50", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function WesFerrrellCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = FERRELL_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Intense windup, Cleveland whites, bat leaning against dugout wall, League Park, split personality — fury and brilliance]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.gold} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.warmRed} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 2× All-Star", "🔥 6× 20-Win Seasons", "💣 38 HR (Pitcher Record)", "📊 .280 Career BA", "🚫 No-Hitter (1931)", "💎 193-128 (.601)"].map((a, i) => (
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Ferrell's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF/CTL/STA instead of CON/POW/SPD.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Ferrell's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
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
