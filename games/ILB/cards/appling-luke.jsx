import { useState } from "react";

const APPLING_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: LUKE APPLING
  // Year Snapshot: 1936 (Peak Season — .388 BA, batting title)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Luke Appling",
  nickname: "Old Aches and Pains",
  year: 1936,
  team: "Chicago White Sox",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SS",
  bats: "R",
  throws: "R",
  height: "5'10\"",
  weight: "183 lbs",
  born: "April 2, 1907 — High Point, NC (grew up in Atlanta, GA)",
  died: "January 3, 1991 — Cumming, GA (age 83)",
  hof: "Class of 1964 (BBWAA runoff, 94%). Greatest White Sox player (fans' vote, 1969). #4 retired by White Sox.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1936 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, HOF
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1936,
    games: 138,
    at_bats: 526,
    hits: 204,
    doubles: 31,
    triples: 7,
    home_runs: 6,
    rbi: 128,
    stolen_bases: 10,
    batting_avg: ".388",
    obp: ".474",
    slg: ".508",
    ops: ".982",
    ops_plus: 156,
    war: 7.5,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 7,
    career_avg: ".310",
    career_hits: 2749,
    career_hr: 45,
    career_sb: 179,
    career_war: 56.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  // CON: .388 BA → tier 5 (.330+). OPS+ 156 → ≥130 bonus. Capped. CON 5.
  // POW: 6 HR → tier 0 (0-9). SLG .508 → ≥.500 bonus → +1. POW 1.
  // SPD: 10 SB → tier 1 (6-15). 179 career SB. 102 career 3B. Good speed. SPD 1.
  // DEF: No Gold Gloves (pre-award). Led AL SS in assists 7×, DP 1×. All-time AL leader in putouts/assists at SS at retirement. Committed 42 errors as a rookie but became excellent. DEF 2.
  // CLU: Never played in a World Series. No postseason stats. But: clutch pinch-hit in 1950 ASG won the game. Overall: CLU 0.
  // OVR: CON(5)×2+POW(1)×1.5+SPD(1)×1+DEF(2)×0.5 = 10+1.5+1+1 = 13.5 → ~8 (All-Star)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 8,      // All-Star — 56.3 career WAR, HOF, 2× batting champ, 20-year career. But never won a WS, played for weak teams.
    con: 5,      // .388 in 1936 — highest by a SS in the 20th century. Career .310. .300+ in 16 seasons. 2,749 hits. Averaged 87 BB and 35 K per season. The ultimate contact hitter. Fouled off pitches at will. Max contact.
    pow: 1,      // 6 HR in 1936. 45 career. SLG .508 earns bonus. But 128 RBI with 6 HR shows extraordinary run production from contact/doubles/walks. Gap power, not HR power. POW 1.
    spd: 1,      // 10 SB in 1936. 179 career. 102 career triples. Good speed for a SS, not a burner. SPD 1.
    def: 2,      // No Gold Gloves (pre-award). Led AL SS in assists 7×. All-time AL leader in putouts, assists, chances, games, DP at SS upon retirement. 42 errors as rookie but refined into elite defender. .948 career fielding %. 10 assists in one game at age 41. DEF 2.
    clu: 0,      // Never played in a World Series. Zero postseason games. The White Sox were terrible for most of his career. Clutch ASG pinch-hit, but that's not enough. CLU 0.
  },
  
  stat_justification: {
    con: ".388 in 1936 — the highest batting average by a shortstop in the modern era (20th century). Career .310 over 20 seasons. 2,749 hits. Hit .300+ in 16 seasons. Averaged 87 walks and only 35 strikeouts per year. Arthur Daley: 'Few were better or more deadly with two strikes than Appling. He just waited for the pitch he wanted and lashed into it.' The greatest foul-ball hitter in baseball history. Maximum contact.",
    pow: "6 HR in 1936, 45 career. But .508 SLG earns the bonus. The magic: 128 RBI with only 6 home runs — the second-most RBI ever for a player with fewer than 10 HR in a season. All gap power, all contact. 440 career doubles, 102 triples. Rating of 1.",
    spd: "10 SB in 1936, 179 career. 102 career triples. Good speed, not elite. A shortstop who covered ground well but wasn't a base-stealing threat. Rating of 1.",
    def: "Led AL shortstops in assists 7 times. At retirement: all-time AL leader in games, putouts, assists, and chances at SS. Major league record for DP by a SS. 42 errors as a rookie (1931) — terrible. But improved to elite. At age 41, set AL record with 10 assists in one game. Rating of 2.",
    clu: "Never played in a World Series. Zero postseason games. The White Sox were bad for nearly his entire career — lost 90+ games in 4 of his first 5 seasons. Ironically, both he and Ernie Banks (greatest players in Chicago) never reached October. Clutch ASG pinch-hit in 1950. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Lovable Hypochondriac. Appling's leadership was through personality — he was beloved despite (because of?) his constant complaints. 'Old Aches and Pains' moaned about everything: aching ankles, pink eye, the flu, a sore back. Then he'd go out and hit .388. His teammates found it endearing rather than annoying. He was the White Sox — the only great player they had for 20 years.",
    temperament: "Good-natured, funny, deceptively stubborn. The foul ball story says everything: when the tight-fisted business manager refused to give him baseballs to sign, Appling went out and fouled off 10 consecutive pitches into the stands. Turning to the owner's box: 'That's $27.50 and I'm just getting started.' He was a Southern gentleman with a mischievous streak and an iron will disguised behind charm.",
    work_ethic: "Extraordinary longevity through adaptability. Played 20 seasons (ages 23-43). Hit .301 at age 42. Moved to 3B when his legs slowed. Set an AL assists record at age 41. His wife on his military service: 'The war will be over soon. Luke has never held a job for more than two weeks outside of baseball.' A baseball lifer from first pitch to last.",
    lifestyle: "Simple, Southern, baseball-obsessed. Born in North Carolina, grew up in Atlanta. Attended Oglethorpe College. Married Fay Dodd. His entire life after retirement was baseball — minor league manager, major league coach, batting instructor for the Braves into his 80s. At 75, he hit a home run off Warren Spahn at an Old-Timers' Game. He never stopped playing.",
    era_adaptability: "VERY HIGH. Appling's plate discipline translates perfectly to any era. A SS who walks 87 times, strikes out 35, hits .310, and plays until 43? Modern analytics would worship him. His OBP (.399 career, .474 in 1936) would make him an elite leadoff man in any decade.",
    clubhouse_impact: "MAXIMUM. Universally liked. His constant complaints were comedy, not toxicity. Good-natured, popular with teammates. When Chico Carrasquel replaced him, Appling helped the young Venezuelan adjust to the majors. He mentored until his final days. The clubhouse uncle who always had a story and an ache.",
    dark_side: "Never winning. Twenty years on losing teams. The White Sox contended exactly once during Appling's tenure (1940, 8 games back). He never played a single postseason game. The greatest White Sox player ever, and he never got his October. The bitter irony: Appling and Banks — Chicago's two greatest shortstops — both denied the World Series. After his batting title in 1936, the GM promised a $5,000 bonus and reneged. Appling tore up his contract in disgust. He got a new deal for $2,500 less than he wanted.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Old Aches and Pains", desc: "Complains about injuries constantly — but never misses the game. Immune to minor injury events. Teammates gain +1 morale from the comedy." },
    { tag: "The Foul Ball King", desc: "Can foul off unlimited pitches in any at-bat. Opposing pitcher's stamina drains faster. Appling saw more pitches per AB than anyone alive." },
    { tag: "Batting Eye", desc: "+1 CON innate. 87 walks, 35 K per season. The most disciplined hitter in the game. He simply did not chase." },
    { tag: "Lonely Star", desc: "-1 team chemistry because the team is bad. But Appling gains +1 CON when the team is losing — he thrived despite futility." },
    { tag: "Iron Will", desc: "Played until age 43. Hit .301 at 42. SPD and DEF decline 50% slower than normal with age. The man would not stop." },
    { tag: "Southern Gentleman", desc: "+1 fan loyalty. Charming, good-natured, popular. But if management cheats him on a bonus, -2 morale and foul balls into the stands." },
    { tag: "$27.50 and Counting", desc: "If denied a reasonable request by management, Appling deliberately fouls baseballs into the crowd until management relents. -$2.75 per pitch." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Lived for batting practice. Could foul off pitches until the sun went down." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The team comedian — always complaining, always entertaining, always there." },
    { location: "Training Room / Doctor's Office", affinity: "HIGH", note: "His second home. Not because he was hurt — because he thought he was." },
    { location: "Community Events", affinity: "MEDIUM", note: "Southern charm. Good with fans. Named greatest White Sox player in 1969 vote." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Simple tastes. A family man with no drama." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "No association with nightlife or excess." },
    { location: "Spotlight / Media", affinity: "LOW", note: "Not a self-promoter. The Sox never gave him the platform he deserved." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Batting races — won titles in 1936 (.388) and 1943 (.328). Rose to the occasion.",
      "Two-strike counts — 'Few were better or more deadly with two strikes' (Arthur Daley)",
      "Playing despite injuries — the complaints fueled the performance. Always showed up.",
      "September baseball — 27-game hitting streak in 1936, consistent late-season pushes",
    ],
    cold_triggers: [
      "Contract disputes — reneged bonus after 1936 title caused genuine anger",
      "Losing teams — 20 years of futility with the White Sox",
      "Actual serious injuries — broken leg in 1938 cost him most of the season",
      "Youth movements — pushed out at age 43 by Frank Lane's rebuilding",
    ],
    pressure_response: "HIGH in regular season — Appling thrived in batting races, hitting streaks, and difficult at-bats. But with no postseason data, his true pressure capacity is untested. The man who hit .388 never got to see if he could hit .388 in October. A tragic unknown.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "$27.50 and I'm Just Getting Started",
      type: "Game Action",
      text: "Your player is denied baseballs by a penny-pinching manager. In his first at-bat, he deliberately fouls off 10 consecutive pitches into the stands. Each ball costs $2.75. 'That's $27.50 and I'm just getting started.' Management relents.",
      origin: "Appling asked the White Sox business manager for baseballs to sign for friends. The manager refused, citing the Depression. Appling fouled 10 straight into the stands. $27.50 at $2.75 per ball.",
    },
    {
      title: "Old Aches and Pains",
      type: "Action",
      text: "Before every game, your shortstop complains of a new ailment: sore back, pink eye, aching ankles, the flu. Teammates roll their eyes. He then goes 3-for-4. +1 team morale. Immune to minor injuries.",
      origin: "Appling earned his nickname from constant complaints about every conceivable ailment. Yet he played 20 seasons, 2,422 games, and hit .310. The complaints were performance art.",
    },
    {
      title: "The .388 Shortstop",
      type: "Game Action",
      text: "Your shortstop puts up the highest batting average by any player at his position in the modern era. He drives in 128 runs with only 6 home runs. Nobody can explain how. +3 CON for the season.",
      origin: "1936: Appling hit .388 — the highest by any SS in the 20th century. He drove in 128 runs with just 6 HR, second-most RBI ever by a player with fewer than 10 homers.",
    },
    {
      title: "The Bonus That Never Was",
      type: "Drama",
      text: "Your batting champion is promised a $5,000 bonus. The GM reneges after the season. Your player tears up his contract. He eventually signs for $2,500 less. -2 morale, +1 spite-fueled CON next season.",
      origin: "After winning the 1936 batting title, GM Grabiner promised Appling a $5,000 bonus then refused to pay. Appling tore up his 1937 contract. He eventually signed for less money.",
    },
    {
      title: "Home Run at 75",
      type: "Action",
      text: "In an Old-Timers' Game, your 75-year-old Hall of Famer faces a 60-year-old Hall of Fame pitcher. He hits a home run. The pitcher applauds. The crowd goes wild. +5 legacy. +10 fan appeal.",
      origin: "1982 Old-Timers' Game: 75-year-old Appling hit a home run off Warren Spahn at RFK Stadium. Spahn applauded as Appling rounded the bases. The man who hit 45 HR in 20 years saved his best for last.",
    },
    {
      title: "Never Saw October",
      type: "Drama",
      text: "Your greatest player retires after 20 years without ever reaching the postseason. He played on losing teams his entire career. The stat line is HOF-worthy. The ring finger is empty.",
      origin: "Appling played 20 seasons (1930-50) without a single postseason game. The White Sox were terrible nearly his entire career. Both he and Ernie Banks — Chicago's greatest shortstops — were denied October.",
    },
    {
      title: "The Foul Ball Artist",
      type: "Game Action",
      text: "Your batter deliberately fouls off pitch after pitch, waiting for exactly the one he wants. Opposing pitcher loses 3 stamina. Your batter's pitch count in the AB exceeds 12. Then he lashes a single.",
      origin: "Charlie Metro: 'We liked to go out to the ballpark early and watch them taking batting practice. Luke was a star... a good hitter, a good fielder, good at driving in runs, good everything, just a good, good ballplayer.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, wiry, Southern. 5'10\" 183 lbs — not imposing. A face that's always slightly wincing, as if something hurts. But the eyes are sharp and amused. The look of a man who's been complaining about his back for 20 years and hitting .310 the entire time.",
    attire: "Chicago White Sox 1936 home whites. The old-style cap, slightly crooked. The uniform of a franchise that gave him nothing and got everything from him. No flashy details — working-class White Sox aesthetic.",
    mood: "Wry endurance. Not the heroic batting stance — the fouling-off stance. The bat choking back, the ball going foul for the 8th time, the pitcher's face going red. Or the follow-through of a clean single after making the pitcher throw 15 pitches. This card should feel like patience weaponized.",
    style: "Lighter, warmer sepia than Dickey's shadows. Comiskey Park in the background — the old park, the empty stands (the Sox were bad). A card that feels lived-in, comfortable, slightly rumpled. Like Appling himself — always complaining, always producing.",
    reference: "The card of the guy who fouled off $27.50 in baseballs out of spite. The card of the guy who hit a home run at 75. The most fun dossier in the entire Crashers set.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div> );

export default function LukeApplingCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = APPLING_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Compact RH stance, fouling off pitch, White Sox whites, Comiskey Park, wry grin]</div>
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
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1964", "⭐ 7× All-Star", "👑 2× AL Batting Champ", "🎯 .388 in 1936", "📊 Career .310", "💎 2,749 Hits"].map((a, i) => (
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
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Appling's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Appling's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}
                </Section>
              </>)}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
