import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}leever-sam.png`;

const PLAYER_DATA = {
  name: "Sam Leever",
  nickname: "The Goshen Schoolmaster",
  year: 1903,
  team: "Pittsburgh Pirates",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'10½"',
  weight: "175 lbs",
  born: "December 23, 1871 — Goshen, OH",
  died: "May 19, 1953 — Goshen, OH (age 81)",
  hof: "NOT in HOF. 194-100, 2.47 ERA, .660 W% (9th highest in MLB history). Bill James compared his stats favorably to HOF pitcher Jack Chesbro (198-132, 2.68) and found them nearly identical. 41.3 career WAR. The schoolteacher the Hall forgot.",

  real_stats: {
    season: 1903, wins: 25, losses: 7, era: "2.06",
    innings: "~260", strikeouts: "~100", walks: "~50", complete_games: "~25",
    shutouts: 7, win_pct: ".781", war: "~7.0",
    era_plus: "~155",
    career_wins: 194, career_losses: 100, career_era: "2.47",
    career_strikeouts: 847, career_cg: 241, career_shutouts: 39,
    career_war: 41.3, career_ip: "2660.2", career_win_pct: ".660",
    career_bb: 587, career_hr_allowed: 29,
    nl_titles: "3× NL Pennant (1901-03)",
    ws_champion: "1× WS Champion (1909, 8-1 record)",
    ws_1903_era: "5.40 (injured — trap shooting)",
    leading_pitcher: "NL 'Leading Pitcher' 1901, 1903, 1905",
  },

  ilb_stats: {
    ovr: 8,      // All-Star — 194-100, 2.47 ERA, .660 W% (9th highest all-time). Led NL in W% 3×, ERA 1×, SHO 1×. The career was sustained excellence over 13 years. Not flashy — precise, controlled, reliable. The schoolteacher who won 194 games through command and curveball.
    stf: 3,      // 2.06 ERA in 1903 → tier 3 (2.00-2.49). Career 2.47. Exceptional curveball — his primary weapon. But K/9 ~2.9 (no K bonus). Only 847 K in 2,660 IP. He didn't overpower — he deceived and commanded. Not a stuff pitcher; a craft pitcher. Rating: 3.
    ctl: 3,      // BB/9 ~1.99 career (587 BB in 2,660 IP) → tier 3 (1.5-1.99). WHIP likely ~1.05-1.10 (no ≤1.00 bonus). Only 29 HR allowed in entire career — extraordinary. The control was elite in practice but not quite enough for tier 4 by the numbers. Rating: 3.
    sta: 3,      // ~260 IP in 1903. 379 IP as a 1899 rookie (but manager never let him do that again). Typically 200-260 IP in peak years. Solid but not iron-man level. Oft-injured — the trap shooting shoulder, various ailments limited him. Rating: 3.
    def: 1,      // No notable defensive reputation. Rating: 1.
    clu: 1,      // 3× NL pennant. 1× WS champion (1909 — 8-1 record, contributed). But 1903 World Series: hurt shoulder in trap shooting contest, started Game 2 and was hammered (8 R, 5.40 ERA). The injury was self-inflicted hobby damage before the biggest games of his career. Pirates lost the first modern WS partly because Leever was unavailable. The trap shooting accident is the permanent asterisk. Rating: 1.
  },

  stat_justification: {
    stf: "2.06 ERA in 1903 → tier 3 (2.00-2.49). Career 2.47 ERA. ERA+ ~155 in peak season. His weapon was an exceptional curveball — not velocity. K/9 ~2.9 across his career (847 K in 2,660 IP). No K/9 bonus. He was a finesse pitcher in the truest sense: the curveball broke, the batters hit weak grounders, and the 29 career HR allowed tells you how rarely anyone got under one of his pitches. Rating: 3.",
    ctl: "BB/9 ~1.99 career (587 BB / 2,660 IP) → tier 3 (1.5-1.99). WHIP likely ~1.05-1.10 in peak years (not ≤1.00, no bonus). The control was his identity — he was called a 'control artist' and the curveball was always around the plate. Only 29 HR allowed in 2,660 IP is extraordinary command of the strike zone. But the raw numbers place him at tier 3, not 4. Rating: 3.",
    sta: "~260 IP in 1903. 379 IP as a 1899 rookie (led NL, but at 21-23 record and never repeated that workload). In his peak years (1901-05), he typically pitched 200-260 IP — solid but not McGinnity/Young level. He was 'oft-injured' per SABR — the trap shooting shoulder, various ailments. Late career he moved to relief. Rating: 3.",
    def: "No notable defensive reputation. Rating: 1.",
    clu: "Mixed. The good: 3× NL pennant (1901-03 Pirates). 1909 WS champion (8-1 record, contributed). The bad: 1903 World Series — hurt his pitching shoulder in a trap shooting contest before the series. Started Game 2 and was hammered for 8 runs. ERA 5.40. The Pirates lost the first modern World Series to Boston, and Leever's self-inflicted injury was a major factor. Deacon Phillippe had to start 5 games because Leever couldn't go. The trap shooting accident is one of the great 'what-ifs' of early WS history. Rating: 1.",
  },

  personality: {
    leadership_style: "THE PROFESSOR. Leever led through preparation, intelligence, and craft — not volume or charisma. He taught school for 7 years before turning pro. He approached pitching like a curriculum: study the batter, locate the curveball, execute the plan. Quiet authority. The man who always had the lesson ready.",
    temperament: "Serious, cerebral, steady. 'Piercing blue eyes and brown hair that was thinning even early in his career.' The schoolmaster disposition wasn't just a nickname — it was his approach to everything. He rarely talked about his career. He offered no advice unless asked. The quiet professional who let the record speak.",
    work_ethic: "METHODICAL. Leever didn't rely on talent alone — he was a late bloomer (pro debut at 25) who became elite through craft. The curveball was perfected through years of teaching himself the mechanics. The control was built through repetition. He wasn't gifted with a great arm — he built a great career with a good one.",
    lifestyle: "Goshen, Ohio. Born there. Taught there. Died there. Pennsylvania German farm family. Married Margaret (18 when he was 32). No children. Avid trap shooter — 99/100 at age 71. Hunting trips with Phillippe and Wagner. Ran a 70-acre farm in retirement. Goshen postmaster for two terms. The small-town man who pitched in the big city and always came home.",
    era_adaptability: "STRONG. Leever's skill set — curveball command, pitch-to-contact, extreme control — translates well to any era. He would be a Greg Maddux type: never the hardest thrower, always in the zone, always inducing weak contact. The 29 career HR allowed in 2,660 IP would translate to extraordinary ground-ball rates. In a modern context: mid-rotation starter with elite command, innings eater, never spectacular but always reliable.",
    clubhouse_impact: "STABILIZING. The schoolmaster settled the room. He was Deacon Phillippe's best friend. He hunted with Honus Wagner. He was the veteran who never caused trouble, always took the ball, and won 65% of his decisions for 13 years. +1 team stability. The anti-drama.",
    dark_side: "The trap shooting accident. Before the 1903 World Series — the FIRST modern World Series — Sam Leever hurt his pitching shoulder at a trap shooting contest in Charleroi, Pennsylvania. He was the Pirates' best pitcher that year (25-7, 2.06 ERA). He tried to pitch through it in Game 2 and was destroyed (8 runs). Deacon Phillippe had to start 5 games because Leever couldn't go. The Pirates — heavy favorites — lost the series to Boston. One shooting contest. One sore shoulder. One lost championship. The Goshen Schoolmaster taught everyone a lesson about priorities — the hard way.",
  },

  chemistry_traits: [
    { tag: "The Goshen Schoolmaster", desc: "7 years teaching high school before pro debut at 25. Leever approaches every game like a lesson plan. +1 CTL permanently. The preparation is the weapon." },
    { tag: "The Curveball", desc: "Leever's exceptional curveball was his primary pitch. Batters face -1 CON vs. the curve. In an era of fastballs and spitballs, the curveball was the gentleman's weapon." },
    { tag: "The Trap Shooting Accident", desc: "Before the 1903 World Series, Leever hurt his pitching shoulder shooting clay pigeons. In any postseason, there is a 10% chance Leever injures himself in an off-field hobby. The hobbies are the enemy." },
    { tag: ".660 Winning Percentage", desc: "9th highest in MLB history. 194-100. Leever wins — not spectacularly, not dramatically, but relentlessly. +1 to win probability in any start. The record accumulates quietly." },
    { tag: "Phillippe's Partner", desc: "Best friends with Deacon Phillippe. When both are on the same staff, +1 STA each. They carried the 1903 Pirates together — until the trap gun intervened." },
    { tag: "Wagner's Hunting Buddy", desc: "Off-season trips with Honus Wagner and Deacon Phillippe. When Leever is on a roster with Wagner, +1 team chemistry. The outdoorsmen bond." },
    { tag: "29 Home Runs Allowed", desc: "In 2,660 innings. That's approximately 1 HR allowed per 92 innings. The curveball stayed down. Always. Ground balls for days." },
    { tag: "Late Bloomer", desc: "Didn't sign his first pro contract until age 25. Won 194 games anyway. Players who debut late gain +1 experience/maturity bonus." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "194-100. 2.47 ERA. The mound was his classroom and every batter was a student." },
    { location: "Goshen, Ohio", affinity: "HIGH", note: "Born. Taught. Retired. Died. Buried. The farm, the school, the post office. Goshen was everything." },
    { location: "Pittsburgh / Exposition Park", affinity: "HIGH", note: "13 years with the Pirates. 3 pennants. 1 WS title. The only ML team he ever played for." },
    { location: "Trap Shooting Range", affinity: "MEDIUM", note: "99/100 at age 71. Lifelong passion. Also the source of his greatest regret — the 1903 shoulder injury." },
    { location: "Hunting Grounds", affinity: "MEDIUM", note: "Long trips with Phillippe and Wagner. The outdoors restored what baseball consumed." },
    { location: "October / World Series", affinity: "LOW", note: "1903 WS: 5.40 ERA (injured). 1909 WS champion (but mostly relief). October was not kind to the Schoolmaster." },
  ],

  momentum: {
    hot_triggers: [
      "Curveball command — when the curve is breaking sharp, he's untouchable. Batters beat it into the ground.",
      "Winning streaks — the .660 W% came from consistent excellence. When the team wins, Leever locks in.",
      "Deep counts — he lives on the corners. Batters who take pitches face a man who never misses his spot.",
      "Preparation — he studies hitters. Against teams he's faced before, +1 STF from the lesson plan.",
    ],
    cold_triggers: [
      "Injury — the shoulder, various ailments. Leever was 'oft-injured.' When hurt, his stuff drops dramatically.",
      "Overwork — 379 IP as a rookie broke something. After that, he was managed carefully. Overuse triggers decline.",
      "Postseason pressure — 5.40 ERA in 1903 WS. The biggest stage was where the Schoolmaster failed his exam.",
      "Off-field hobbies — the trap shooting accident haunts. Any off-field activity risks injury for Leever.",
    ],
    pressure_response: "REGULAR SEASON ELITE, POSTSEASON MIXED. In the regular season: .660 W%, led NL in W% three times, 194-100. Leever was as reliable as sunrise. In October: the 1903 WS disaster (trap shooting injury, 5.40 ERA). He redeemed himself somewhat in 1909 (WS champion, 8-1 season) but was mostly a reliever by then. The Schoolmaster graded himself well in class and poorly on the final exam. In ILB: trust him April through September. Hold your breath in October.",
  },

  action_card_seeds: [
    { title: "The Trap Shooting Accident", type: "Drama", text: "Your ace — 25-7, 2.06 ERA, the best pitcher in the league — hurts his pitching shoulder at a trap shooting contest two weeks before the World Series. He tries to pitch through it. He gets hammered. Your backup has to start 5 games. You lose the championship. One hobby. One sore shoulder. One lost World Series. -3 to ace's postseason stats. +5 regret.", origin: "Late 1903: Leever hurt his right shoulder at a trap shooting contest in Charleroi, PA before the first modern World Series. He started Game 2 and was rocked for 8 runs. Phillippe started 5 games to compensate. The Pirates lost to Boston." },
    { title: "Twenty-Five and Seven", type: "Game Action", text: "Your schoolteacher-turned-pitcher goes 25-7 with a league-leading 2.06 ERA and 7 shutouts. He leads the league in W%, ERA, and shutouts simultaneously. The curveball is unhittable. The lesson plan is perfect. +2 STF for the remainder of the season.", origin: "1903: Leever's greatest season — 25-7, 2.06 ERA, 7 SHO, .781 W%. All NL-leading marks." },
    { title: "Six Consecutive Shutouts", type: "Game Action", text: "Your pitching staff throws six consecutive shutouts — a record. Your schoolteacher pitches the second and the sixth. The opposing lineups forget what scoring feels like. +3 staff ERA for the week.", origin: "July 1903: The Pirates pitchers threw a record six consecutive shutouts. Leever pitched the second and sixth games of the streak." },
    { title: "The Schoolteacher's Debut", type: "Origin", text: "Your pitcher is 25 years old. He has spent 7 years teaching high school in a small Ohio town. He signs his first professional contract. In his first full season, he leads the league in games pitched (51) and innings (379). He goes 21-23. He will never have a losing record again. The late start makes the finish sweeter.", origin: "Leever taught at Goshen High School for 7 years before signing with Richmond (Atlantic League) at 25. His 1899 rookie season: 51 G, 379 IP, 21-23 record — his only losing season." },
    { title: "Point-Six-Six-Zero", type: "Drama", text: "Your pitcher retires with a .660 winning percentage — 9th highest in baseball history. 194-100. He won nearly two out of every three decisions for 13 years. The record is quiet and enormous. +3 legacy. The schoolteacher's final grade.", origin: "Leever's .660 career W% (194-100) ranks 9th in MLB history. He led the NL in W% three separate seasons." },
    { title: "Twenty-Nine Home Runs Allowed", type: "Game Action", text: "In 2,660 innings — an entire career — your pitcher allows only 29 home runs. One every 92 innings. The curveball stays down. The fly balls don't carry. The batters hit the ball on the ground, into gloves, into outs. -2 opponent POW when facing Leever.", origin: "Leever allowed only 29 HR in 2,660.2 career IP — an extraordinarily low rate even for the dead-ball era." },
    { title: "Ninety-Nine Out of a Hundred", type: "Drama", text: "Your retired pitcher, now 71 years old, scores 99 out of 100 at a trap shooting competition. The shoulder that failed in the 1903 World Series has been shooting clay pigeons for decades since. The irony: the hobby that cost him a championship is the one he never quit. +2 resilience. The Schoolmaster passes his own final exam — 50 years late.", origin: "At age 71, Leever scored 99/100 in trap shooting. He remained an avid shooter his entire life, despite the 1903 incident." },
    { title: "Chesbro's Mirror", type: "Drama", text: "Your pitcher's career stats — 194-100, 2.47 ERA — are nearly identical to a Hall of Famer's (198-132, 2.68 ERA). The Hall of Famer got in. Your pitcher didn't even get considered. The lesson: one transcendent season (41 wins) can outweigh a better career. +3 injustice. The Schoolmaster and the Spitball King, measured by different scales.", origin: "Bill James compared Leever (194-100, 2.47) to Jack Chesbro (198-132, 2.68) — Leever's career stats are arguably better, but Chesbro is in the HOF and Leever is not." },
  ],

  art_direction: {
    face: "Serious, cerebral, older-looking even when young. 5'10½\" 175 lbs — lean, not imposing. Piercing blue eyes (noted in contemporary descriptions), brown hair thinning early. The face of a high school teacher who happened to have an unhittable curveball. Glasses would be too on-the-nose, but the expression should convey intelligence, patience, and a certain professorial gravity. Pennsylvania German features — strong but not flashy.",
    attire: "Pittsburgh Pirates uniform circa 1903 — white wool jersey with 'PITTSBURG' (no H) or 'P' insignia, baggy flannel pants, flat cap. POSE: the curveball delivery — overhand release, the wrist snapping, the ball about to break. The motion should be smooth and controlled, not violent or explosive. This is a man who throws curves with surgical precision, not fastballs with raw power. Or: the composed wind-up, the schoolteacher's posture even on the mound — upright, dignified, prepared. No number.",
    mood: "Quiet competence. Leever's card should feel like the calmest card in the Banners collection — no volcanic energy like Jennings, no bittersweet romance like Chesbro, no golden speed like Lange. This is STEADY. RELIABLE. PREPARED. The card of a man who won 194 games by never panicking, never overthrowing, never losing his lesson plan. The mood should suggest a classroom — ordered, purposeful, illuminated by intelligence.",
    style: "Sepia-toned with WARM PASTORAL undertones — Goshen Ohio farmland, schoolhouse light, rural dignity. Where Bradley is industrial Cleveland and Jennings is coal-mine fire, Leever is OHIO FARMLAND. The palette should suggest the quiet countryside that produced him and reclaimed him — golden wheat, barn wood, autumn classroom light. The gentlest palette in the Banners collection.",
    reference: "Think the curveball at the break point — the ball just leaving the hand, the wrist snapped, the trajectory about to dive. Or: Leever in the wind-up, composed, the Pirates' Exposition Park behind him, the curveball about to begin its journey from the lesson plan to the plate. The card should capture the moment before the break — the preparation completed, the execution about to begin.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function SamLeeverCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "W%", val: d.real_stats.win_pct },{ label: "SHO", val: d.real_stats.shutouts },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "K", val: d.real_stats.strikeouts },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — LED NL IN ERA / W% / SHUTOUTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W-L", val: `${d.real_stats.career_wins}-${d.real_stats.career_losses}` },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR W%", val: d.real_stats.career_win_pct },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR IP", val: d.real_stats.career_ip },{ label: "HR ALW", val: d.real_stats.career_hr_allowed }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>.660 W% — 9TH HIGHEST IN MLB HISTORY</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📖 Schoolteacher 7 Years", "🎯 Led NL W% 3×", "🏆 1909 WS Champion", "⚾ 29 Career HR Allowed", "💔 1903 Trap Shooting Injury", "🏅 .660 Career W%", "🎓 Pro Debut at Age 25", "❌ Not in HOF"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Leever's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="⚾ Pitcher Stat Engine">{Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Leever's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
