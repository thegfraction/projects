import { useState } from "react";

const PLAYER_DATA = {
  name: "Johnny Sain",
  nickname: "Man of a Thousand Curves",
  year: 1948,
  team: "Boston Braves",
  era: "1940s",
  ilb_team: "Allies NL1940",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "185 lbs",
  born: "September 25, 1917 — Havana, AR",
  died: "November 7, 2006 — Downers Grove, IL",
  hof: "Not inducted (34% peak vote). 139-116, 3.49 ERA, 4× 20-win seasons, greatest pitching coach ever.",

  real_stats: {
    season: {
      year: 1948,
      games: 43,
      w: 24, l: 15,
      era: "2.60",
      k: 137,
      bb: 83,
      ip: "314.2",
      cg: 28,
      whip: "1.11",
      war: 7.0,
    },
    career: {
      seasons: 11,
      w: 139, l: 116,
      era: "3.49",
      k: 910,
      cg: 140,
      sho: 16,
      no_hit: 0,
      war: 28.5,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — PITCHER
  //
  // STF: 2.60 ERA → tier 3 (2.50-2.99). K/9 ~3.9 → no bonus. "Man of a Thousand Curves." STF = 3.
  // CTL: BB/9 ~2.37 → tier 3 (2.00-2.49). WHIP 1.11 → no bonus (needs ≤1.00). CTL = 3.
  // STA: 314.2 IP → tier 4 (300+). 28 CG (led NL). STA = 4.
  // DEF: Good fielding pitcher. .245 career BA, 101 RBI, only 20 K in 774 AB. DEF = 1.
  // CLU: 1948 WS: 1.06 ERA — shutout in Game 1, CG loss Game 4. Magnificent. PS ERA < 2.00 → tier 2. +1 WS hero. CLU = 3.
  // OVR: 4× 20-game winner, 3× All-Star, but sharp decline after '48. Not HOF. OVR = 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    stf: 3,      // 2.60 ERA in 1948. Curveball virtuoso — "Man of a Thousand Curves" from Navy flight training.
    ctl: 3,      // BB/9 ~2.37. Aerodynamics knowledge made him a precision pitcher.
    sta: 4,      // 314.2 IP, 28 CG (led NL). Absolute workhorse — 57% career CG rate.
    def: 1,      // Good fielding pitcher. Historic hitter for a pitcher (.245 BA, 20 career K in 774 AB).
    clu: 3,      // 1.06 ERA in 1948 WS. Shutout Game 1 vs Bob Feller. Maximum clutch.
  },

  stat_justification: {
    stf: "2.60 ERA in 1948 — among the NL's best. From 1946-1948, Sain was arguably the top pitcher in the NL (65-41, 2.77 ERA). His weapon was the curveball — taught by his father, then refined through Navy flight training. His understanding of aerodynamics from piloting fighter planes gave him the nickname 'Man of a Thousand Curves.' He could throw the curve at multiple speeds, angles, and breaks. But K/9 of ~3.9 means no strikeout bonus — he was a contact-management pitcher. Rating of 3.",
    ctl: "BB/9 approximately 2.37 in 1948 (83 BB in 314.2 IP). Led NL with 24 CG, which requires consistent strike-throwing. WHIP of ~1.11 — very good but doesn't reach the 1.00 elite threshold. Sain's control was methodical: he worked the corners with curveball variations, changing speeds and angles to keep hitters off balance without walking them. Rating of 3.",
    sta: "314.2 IP in 1948 — over 300 innings. 28 complete games, leading the NL. In the final stretch of the 1948 pennant race, Sain pitched on two days' rest repeatedly, inspiring the famous poem 'Spahn and Sain and Pray for Rain.' Career 140 CG in 245 starts — a staggering 57.1% completion rate. He was an iron man. Rating of 4.",
    def: "Good fielding pitcher, nothing exceptional. But his bat was remarkable: .245 career average with only 20 strikeouts in 774 at-bats — the fewest K's for any hitter with 500+ AB since 1910. Led NL pitchers in RBI five times. Led the entire NL in sacrifice hits in 1948. He was a complete player on the mound. Rating of 1.",
    clu: "1948 World Series vs. Cleveland Indians: Game 1 — Sain threw a 4-hit shutout to beat Bob Feller 1-0. Game 4 — Sain threw a complete game 5-hitter but lost 2-1 in a heartbreaker. Series ERA: 1.06. Nine strikeouts, zero walks in two complete games. 'Magnificent in defeat,' wrote every sportswriter who saw it. He was also the first pitcher to face Jackie Robinson (April 15, 1947) and the last to face Babe Ruth (1943 exhibition). PS ERA < 2.00 → tier 2, +1 for WS hero performance = 3 (maximum).",
  },

  personality: {
    leadership_style: "Quiet revolutionary. Sain didn't lead through charisma or intimidation — he led through knowledge. He understood pitching mechanics better than anyone in his era, partly from studying aerodynamics as a Navy pilot. His leadership was intellectual: he made pitchers smarter, more confident, and more independent. As a coach, this philosophy — 'mentor, don't dictate' — produced 16 twenty-game winners.",
    temperament: "Independent, stubborn, principled. Sain clashed with every manager he worked under as a coach because he put his pitchers' interests first. He told pitchers to 'climb those golden stairs' to demand higher salaries. He refused to make pitchers run sprints ('You don't run the damn ball across the plate'). He was fired repeatedly — and rehired repeatedly, because every pitching staff he touched improved immediately.",
    work_ethic: "Innovative and obsessive. Sain patented a pitching training device — a baseball on a wooden rod that could be spun to demonstrate pitch rotation. He studied physics, aerodynamics, and psychology to understand pitching. His work ethic was mental: he spent hours thinking about how to make a curveball break differently, how to communicate with pitchers, how to build confidence. He was a scientist of the mound.",
    lifestyle: "Born in Havana, Arkansas — rural, humble origins. Navy pilot during WWII, stationed at Chapel Hill with Ted Williams and Johnny Pesky. Married twice. After coaching, he retired to suburban Illinois. Quiet, bookish, more comfortable explaining spin rate than making small talk. A man ahead of his time.",
    era_adaptability: "VISIONARY. Sain's pitching philosophy — emphasize mechanics over conditioning, teach spin and movement over velocity, protect arms from overuse — anticipated modern pitching development by 50 years. His refusal to make pitchers run and his focus on spin mechanics would make him the most sought-after pitching coach in modern baseball. In ILB: Sain's coaching tree is his greatest legacy.",
    clubhouse_impact: "MENTOR. Jim Bouton called him 'the greatest pitching coach — ever. I admire him more than any man I've ever met. All players like him: white, black, conservative, liberal, loud, quiet, they all do.' His pitchers were fiercely loyal. Every staff he coached improved. But his independence created friction with managers and front offices — his pattern was: arrive, transform the staff, clash with management, get fired, repeat.",
    dark_side: "The swift decline. After his magnificent 1946-1948 run (65-41, 2.77 ERA), Sain collapsed: 37-44, 4.31 ERA from 1949-1951. A sore shoulder from experimenting with a screwball, combined with the brutal workload of 1948 (314+ IP, constant short-rest starts), broke his arm. He reinvented himself as a reliever with the Yankees, but his days as an ace were over by age 31. In ILB terms: Sain has a 'Burnout' trait — if he pitches 300+ IP in a season, there's a 40% chance of -2 STF the following year.",
  },

  chemistry_traits: [
    { tag: "Spahn and Sain", desc: "+3 chemistry with Warren Spahn. Together they form baseball's most famous 1-2 rotation. When both start in the same series, team gains +2 momentum." },
    { tag: "Man of a Thousand Curves", desc: "Sain can throw 4 different curveball variations. Batters who have faced him before get NO familiarity bonus — each AB feels like facing a new pitcher." },
    { tag: "Navy Pilot", desc: "Aerodynamics knowledge from flight training. +1 STF bonus when developing new pitches. WWII veteran status grants immunity to pressure collapse." },
    { tag: "Pray for Rain", desc: "On short rest (2 days), Sain pitches at -1 STF but gains +1 CLU. He's built for desperation starts in pennant races." },
    { tag: "First to Face Jackie", desc: "Sain was the first MLB pitcher to face Jackie Robinson. No chemistry penalty with Black players. Historical significance: +1 legacy value." },
    { tag: "Last to Face the Babe", desc: "Sain pitched to Babe Ruth in a 1943 exhibition — the last organized baseball at-bat of Ruth's life. +1 historical legacy." },
    { tag: "Greatest Coach Ever", desc: "After retirement, Sain can serve as pitching coach. ALL pitchers on his staff gain +1 CTL development per season. He produces 20-game winners like clockwork." },
    { tag: "Climb Those Golden Stairs", desc: "Sain advises pitchers to demand higher salaries. +1 player morale but -1 relationship with front office. Creates tension with management." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His laboratory. Every pitch is an experiment in aerodynamics." },
    { location: "Clubhouse / Bullpen", affinity: "HIGH", note: "Mentoring young pitchers, spinning baseballs on sticks, explaining physics." },
    { location: "Rural / Farm / Country", affinity: "HIGH", note: "Havana, Arkansas boy. Quiet countryside. His retreat between seasons." },
    { location: "Coaching Box / Dugout", affinity: "MEDIUM", note: "Where he transformed pitching staffs and clashed with managers." },
    { location: "Military / Veterans Events", affinity: "MEDIUM", note: "Navy pilot. Stationed with Ted Williams and Johnny Pesky." },
    { location: "Front Office", affinity: "LOW", note: "'Climb those golden stairs' — but management didn't appreciate his advice." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Private, cerebral. Preferred to let results speak." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant race September starts — Sain pitched on 2 days' rest repeatedly in 1948",
      "World Series games — 1.06 ERA in the 1948 Fall Classic, 9 K and 0 BB",
      "Pairing with Spahn — the two aces fed off each other's excellence",
      "Developing new curveball variations — each new break pattern boosted his confidence",
    ],
    cold_triggers: [
      "Overwork — 314+ IP in 1948 directly led to his shoulder breakdown in 1949",
      "Experimenting with new pitches (screwball) — the 1949 screwball experiment destroyed his arm",
      "Being traded — sold to the Yankees for $50K in 1951 after his decline",
    ],
    pressure_response: "SUPREME. In the 1948 World Series, Sain was transcendent: 1.06 ERA across two complete games, 9 strikeouts, zero walks. He threw a 4-hit shutout to beat Bob Feller in Game 1 — arguably the finest individual WS pitching performance of the 1940s. Even in Game 4's heartbreaking 2-1 loss, he was magnificent, throwing a complete-game 5-hitter. SABR called him 'the top pitcher in the National League from 1946 to 1948.' When the Braves needed him most, he delivered. His only failure was his body giving out from the effort.",
  },

  action_card_seeds: [
    {
      title: "Spahn and Sain and Pray for Rain",
      type: "Game Action",
      text: "Your top two starters are so dominant that the rest of the rotation becomes irrelevant. For 12 games, only your #1 and #2 starters pitch, alternating on short rest. Each start is at -1 STF but +1 CLU. If both go 4-0 in this stretch, your team gains +5 momentum and the phrase enters baseball immortality.",
      origin: "September 1948: Spahn and Sain carried the Braves through the pennant stretch, pitching on short rest while Boston 'prayed for rain' to skip the other starters. The poem by Gerald V. Hern became one of baseball's most famous phrases.",
    },
    {
      title: "The Shutout vs. Feller",
      type: "Game Action",
      text: "World Series Game 1: Your ace faces the opposing team's legendary ace. Your pitcher throws a 4-hit shutout in a 1-0 victory. The opposing ace (who may be considered the better pitcher) takes the loss. +3 team momentum and your pitcher's legacy permanently overtakes the rival's in WS lore.",
      origin: "1948 WS Game 1: Sain threw a 4-hit shutout to beat Bob Feller 1-0. Feller, considered the superior pitcher, allowed just 2 hits but lost on a controversial pickoff play. Sain outdueled a legend.",
    },
    {
      title: "The Thousand Curves",
      type: "Action",
      text: "Your pitcher has mastered 4 variations of his primary breaking ball. Each at-bat, he can choose a different variation. Batters cannot build familiarity across the game. Effectively, your pitcher faces each hitter as if it's their first at-bat every time.",
      origin: "Sain's father taught him the curveball. Navy flight training taught him aerodynamics. He combined both to create an arsenal of curves that broke differently every time. The 'Man of a Thousand Curves' made each curveball unpredictable.",
    },
    {
      title: "The Spinning Apple",
      type: "Action",
      text: "Your pitching coach invents a training device that demonstrates pitch rotation. All pitchers on the staff gain +1 to their understanding of spin mechanics, translating to +1 CTL development over the season. The device is patented and sold nationwide.",
      origin: "As Yankees pitching coach, Sain poked a broken car antenna through an apple and spun it, realizing he could teach pitch rotation this way. He patented a baseball version — one of the first spin-rate teaching tools in history.",
    },
    {
      title: "You Don't Run the Ball Across the Plate",
      type: "Drama",
      text: "Your pitching coach refuses to make pitchers run sprints. The manager demands compliance. Choose: side with the coach (pitchers gain +1 morale, manager loses trust) or side with the manager (coach quits, pitching staff drops -1 development). Either way, someone leaves.",
      origin: "Sain frequently told managers: 'You don't run the damn ball across the plate. If running did it, they'd look for pitchers on track teams.' He was fired repeatedly for this philosophy — and proved right every time.",
    },
    {
      title: "Climb Those Golden Stairs",
      type: "Drama",
      text: "Your pitching coach advises all his pitchers to demand raises. The front office is furious. +2 player morale across the pitching staff. -3 relationship with ownership. 30% chance the coach is fired.",
      origin: "Sain openly encouraged pitchers to negotiate aggressively for higher salaries. Front offices hated it. Pitchers loved it. The pattern repeated at every stop of his coaching career.",
    },
    {
      title: "The Burnout",
      type: "Drama",
      text: "Your ace, who pitched 300+ innings last season, reports to camp with a sore shoulder. He experiments with a new pitch to compensate. Roll: on 4+, the new pitch works and he reinvents himself. On 1-3, the experiment fails and he drops -2 STF permanently.",
      origin: "After his 314-inning 1948 season, Sain arrived in 1949 with a damaged shoulder. He experimented with a screwball that spring — it failed catastrophically, and he went 10-17 with a 4.81 ERA. His days as an ace were over at 31.",
    },
    {
      title: "Traded for a Future Legend",
      type: "Drama",
      text: "Your fading ace is traded for cash and a young pitcher nobody's heard of. The young pitcher becomes a World Series hero within 5 years. Your former ace reinvents himself as a reliever. Both teams benefit, but in very different ways.",
      origin: "In 1951, the Braves traded Sain to the Yankees for $50,000 and Lew Burdette. Burdette became the 1957 WS MVP, throwing three complete games to beat the Yankees. Sain reinvented himself as a reliever, leading the AL in saves in 1954.",
    },
  ],

  art_direction: {
    face: "Strong, handsome features with a square jaw and intelligent eyes. 6'2\" 185 lbs — lean, athletic build of a man who was also a Navy pilot. Arkansas country boy with a scientist's brain behind his eyes. Age 30 in 1948 — the peak of his powers, the last year before the burnout.",
    attire: "Boston Braves home whites, 1948 flannel. The distinctive windmill windup — one of the last pitchers to use it. Overhand delivery with the curveball just leaving his fingertips. Or: the post-delivery follow-through, looking to home plate with calm confidence.",
    mood: "Quiet intelligence and determination. Sain's portrait should convey the cerebral nature of his pitching — this is a man who studied aerodynamics to improve his curveball. Not menacing like Maglie, not fiery like Spahn. Calm, focused, analytical. The look of a man solving a physics problem 60 feet away.",
    style: "Warm sepia with Boston cream tones. Braves Field in the background, the expansive outfield. The card should feel like a late-1940s academic — clean, precise, slightly formal. 1948 Bowman card aesthetic in unified ILB portrait style.",
    reference: "The intellectual's pitcher card. Pair with Spahn's card for the most famous battery in baseball history. Sain's card should feel like the quieter, smarter half of the duo — the one who studied flight to understand curveballs.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA (primary) + K/9 bonus", tiers: [{ range: "4.00+", value: 1 },{ range: "3.50-3.99", value: 2 },{ range: "2.50-2.99", value: 3 },{ range: "2.00-2.49", value: 4 },{ range: "< 2.00", value: 5 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (primary) + WHIP bonus", tiers: [{ range: "4.0+", value: 0 },{ range: "3.50-3.99", value: 1 },{ range: "2.50-2.99", value: 2 },{ range: "2.00-2.49", value: 3 },{ range: "< 2.00", value: 4 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (season)", tiers: [{ range: "< 150 IP", value: 1 },{ range: "150-199", value: 2 },{ range: "200-249", value: 3 },{ range: "250-299", value: 3 },{ range: "300+", value: 4 }], bonus: "30+ CG or 350+ IP → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + GG equivalent", tiers: [{ range: "Below average", value: 0 },{ range: "Average / solid", value: 1 },{ range: "Above average", value: 2 },{ range: "Elite", value: 3 }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS hero / defining moment → +1 (cap 3)" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Cy Young" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JohnnySainCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Warm sepia, windmill windup, Braves whites, Braves Field]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
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
              {[{ label: "W-L", val: `${d.real_stats.season.w}-${d.real_stats.season.l}` },{ label: "ERA", val: d.real_stats.season.era },{ label: "K", val: d.real_stats.season.k },{ label: "BB", val: d.real_stats.season.bb },{ label: "IP", val: d.real_stats.season.ip },{ label: "CG", val: d.real_stats.season.cg },{ label: "WHIP", val: d.real_stats.season.whip },{ label: "WAR", val: d.real_stats.season.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.season.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}cc`, borderRadius: 4, padding: 10, marginTop: 8 }}>
              {[{ label: "CAR W", val: d.real_stats.career.w },{ label: "CAR L", val: d.real_stats.career.l },{ label: "CAR ERA", val: d.real_stats.career.era },{ label: "CAR K", val: d.real_stats.career.k },{ label: "CAR CG", val: d.real_stats.career.cg },{ label: "CAR SHO", val: d.real_stats.career.sho },{ label: "NO-HIT", val: d.real_stats.career.no_hit },{ label: "CAR WAR", val: d.real_stats.career.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — {d.real_stats.career.seasons} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 3× All-Star", "🏅 4× 20-Win Seasons", "🏆 3× WS Champ (NYY)", "📜 Spahn & Sain", "🪖 WWII Navy Pilot", "🎯 1.06 WS ERA '48", "🧠 Greatest Coach Ever"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.traitGreen }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Sain's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine — Pitcher"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB pitcher card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Sain's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
