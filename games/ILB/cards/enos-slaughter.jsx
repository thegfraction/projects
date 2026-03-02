import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: ENOS SLAUGHTER
  // Year Snapshot: 1942 (Pre-War Peak / WS Champion)
  // ═══════════════════════════════════════════════════════════════

  name: "Enos Slaughter",
  nickname: "Country",
  year: 1942,
  team: "St. Louis Cardinals",
  era: "1940s",
  ilb_team: "Allies NL1940",
  position: "RF",
  bats: "L",
  throws: "R",
  height: '5\'9"',
  weight: "190 lbs",
  born: "April 27, 1916 — Roxboro, NC",
  died: "August 12, 2002 — Durham, NC",
  hof: "Class of 1985 (Veterans Committee). .300 BA, 2,383 H, 169 HR, 1,304 RBI, 4× WS champ in 19 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1942 PRE-WAR PEAK
  // Source: Baseball-Reference, SABR BioProject, HOF
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1942,
    games: 152,
    at_bats: 591,
    hits: 188,
    doubles: 31,
    triples: 17,
    home_runs: 13,
    rbi: 98,
    stolen_bases: 7,
    batting_avg: ".318",
    obp: ".412",
    slg: ".494",
    ops: ".906",
    ops_plus: 147,
    war: 7.2,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 10,
    career_avg: ".300",
    career_hits: 2383,
    career_hr: 169,
    career_sb: 71,
    career_war: 55.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — HITTER
  //
  // CON: .318 BA → tier 4 (.300-.329). OPS+ 147 → +1 bonus. CON = 5.
  // POW: 13 HR → tier 1 (10-19). SLG .494 → no bonus (requires .500). POW = 1.
  // SPD: 7 SB in 1942 → tier 1 (6-15). No CF/SS GG bonus. SPD = 1.
  // DEF: Pre-GG era. Led NL RF in putouts 4×, assists 2×. Strong arm, excellent range. GG equivalent ~3-5. DEF = 2.
  // CLU: Postseason .295/.404/.523. "Mad Dash" = #10 on Sporting News Greatest Moments. +1 WS hero bonus. CLU = 2.
  // OVR: HOF, 10× All-Star, 4× WS champ. Lost 3 prime years to WWII. OVR = 8 (All-Star tier).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star tier — HOF outfielder, 4× WS champ, defining hustle player of his generation
    con: 5,      // .318 in 1942 (led NL in hits). Career .300 in 19 seasons. OPS+ 147 earns +1 bonus.
    pow: 1,      // 13 HR in 1942. Career 169. Doubles/triples hitter, not a slugger. SLG .494 just misses bonus.
    spd: 1,      // 7 SB in 1942. Career 71 SB. Legendary hustle, but not a base stealer by the numbers.
    def: 2,      // Led NL RF in putouts 4×, assists 2×. Strong arm, excellent range. Pre-GG equivalent ~3-5.
    clu: 2,      // Postseason .295/.404/.523. "Mad Dash" = greatest WS moment of the 1940s. +1 hero bonus.
  },

  stat_justification: {
    con: "Led NL with 188 hits in 1942 while batting .318. Career .300 BA over 19 seasons despite losing three prime years to WWII. Hit .300+ in 10 seasons. Renowned as a smooth contact hitter with a compact left-handed swing. OPS+ 147 in 1942 earns the +1 bonus to reach maximum. Musial called him one of the toughest competitors he knew. Rating of 5.",
    pow: "13 HR in 1942 — modest power. Career 169 HR over 19 seasons. Slaughter was a line-drive hitter who generated extra bases through doubles (31 in 1942, led NL with 52 in 1939) and triples (17 in 1942, led NL). SLG .494 narrowly misses the .500 bonus threshold. He hit the ball hard but on a line, not over the fence. Rating of 1.",
    spd: "7 SB in 1942. Career 71 SB. Slaughter was famous for hustle — sprinting to first on walks, never walking on a baseball field — but he was not a base stealer. His speed was about effort and awareness, not raw footspeed. The 'Mad Dash' wasn't about speed; it was about reading the play and never stopping. Pete Rose imitated his style. Rating of 1.",
    def: "Led NL right fielders in putouts four times (1939, 1940, 1946, 1952) and assists twice (1939, 1946). Strong throwing arm, excellent range, played right field with authority for 19 years. Pre-Gold Glove era, but defensive metrics and contemporary accounts suggest GG-equivalent of 3-5 seasons. Rating of 2.",
    clu: "Postseason slash: .295/.404/.523 in 12 games across 5 World Series. Hit a HR in the clinching Game 5 of the 1942 WS vs. Yankees, then spoke to the troops by radio: 'We're going to finish this thing tomorrow. Then I'm going to report for duty.' The 'Mad Dash' in Game 7 of the 1946 WS — scoring from first on a double, running through the third-base coach's stop sign — was named #10 on the Sporting News list of Baseball's 25 Greatest Moments. PS BA .295 → tier 1. WS hero moment → +1. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by relentless hustle. Slaughter never walked on a baseball field — he sprinted to first on walks, ran full speed to his position, and played every game like the pennant depended on it. His managers adored him. Frankie Frisch called him 'the most hustling so-and-so in the game today.' His style of play became the standard for Cardinals baseball for decades.",
    temperament: "Fierce, combative, old-school. Slaughter played in the Gas House Gang era and absorbed its roughhouse ethos completely. He believed in brushback pitches, hard slides, and never giving an inch. He once said if a pitcher knocked him down, he'd remember it — and take their legs out at first base next time they covered the bag. 'That was the way the game was played,' he said. No regrets.",
    work_ethic: "The 'never walk' philosophy extended to everything. When minor league manager Eddie Dyer caught the young Slaughter walking from his position to the dugout, Dyer said: 'Son, if you're tired, we'll try to get you some help.' Slaughter never walked again. He played 19 major league seasons, serving 3 years in WWII, and came back without missing a beat — leading the NL with 130 RBI in 1946.",
    lifestyle: "Country boy from Roxboro, North Carolina. Grew up working in a textile mill. Married to his high school sweetheart. Deeply connected to the rural South. Earned the nickname 'Country' from his first minor league manager, who took one look at his straw-colored hair and tight-fitting clothes and the name stuck for life. After baseball, he coached at Duke University for seven years.",
    era_adaptability: "HIGH. Slaughter's hustle and contact-hitting would play in any era. His defensive skills translated across decades — he was still an effective platoon player with the Yankees into his 40s. In modern baseball, his aggression on the bases and hard slides would draw scrutiny, but his bat-to-ball skills and outfield defense would keep him employed anywhere.",
    clubhouse_impact: "MOTOR. Slaughter set the tempo for every team he played on. His intensity was not optional — he expected the same from everyone. Musial praised him as a 'tough competitor' who 'came to play.' With the late-career Yankees, Casey Stengel valued him as a platoon bat and clubhouse enforcer. His hustle was contagious; Pete Rose cited Slaughter as an inspiration.",
    dark_side: "The Jackie Robinson incidents. Slaughter was accused of deliberately spiking Robinson in 1947, opening a seven-inch gash on Robinson's leg. He was also reported as being one of the leaders of racial taunting against Robinson and allegedly conspired with teammate Terry Moore to organize a Cardinals boycott of games against Brooklyn. Slaughter denied the allegations for the rest of his life, calling them unfair because he was 'a Southern boy.' Sportswriter Bob Broeg defended him, but the stigma followed him and likely delayed his Hall of Fame induction. In ILB terms: Slaughter carries a 'Hardnose / Dirty Player' trait that creates -2 chemistry with Black players unless a specific 'Reconciliation' event card is played.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Never Walk", desc: "Slaughter sprints to first on walks and runs everywhere on the field. +1 team hustle rating. Any teammate with SPD 0 gains +1 morale from Slaughter's example." },
    { tag: "Gas House Legacy", desc: "+2 chemistry with Cardinals players from the 1930s-1940s (Musial, Marion, Cooper, Dean). The Gas House spirit lives through him." },
    { tag: "Country Strong", desc: "Slaughter plays through minor injuries without complaint. He ignores the first injury event per season — it simply doesn't apply to him." },
    { tag: "Spikes High", desc: "When breaking up double plays or sliding into bases, Slaughter's aggression causes -1 morale to the opposing infielder. 5% chance of injuring the fielder. Umpires may eject him on a bad roll." },
    { tag: "Mad Dash DNA", desc: "Once per World Series game, Slaughter can attempt to score from first on a single or double. Roll: on 3+, he scores. On 1-2, he's out but the crowd roars (+1 momentum regardless)." },
    { tag: "WWII Veteran", desc: "Slaughter served 3 years in the Army Air Corps. When returning from injury or absence, he suffers no rust penalty. He comes back at full strength immediately." },
    { tag: "Racial Tensions", desc: "Slaughter carries a complex legacy regarding Jackie Robinson. -2 chemistry with Black players on opposing teams. If Robinson is on his OWN team, a 'Reconciliation' event must be triggered to remove the penalty." },
    { tag: "Duke Coach", desc: "After retirement, Slaughter can transition to a coaching role. +1 to the CON development of any prospect he mentors. His hustle philosophy shapes young players." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Baseball Diamond / Practice", affinity: "HIGH", note: "Born for the field. Never stopped running. His entire life was between the white lines." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Setting the tempo. Making sure everyone knows: we hustle here." },
    { location: "Rural / Farm / Country", affinity: "HIGH", note: "Roxboro, NC. Textile mills. Country life. The name 'Country' wasn't ironic." },
    { location: "Military / Veterans Events", affinity: "MEDIUM", note: "Proud of his WWII service. Set up baseball teams in Saipan and Tinian." },
    { location: "Community Events", affinity: "MEDIUM", note: "Popular with fans, especially in St. Louis. Statue outside Busch Stadium." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Uncomfortable with press scrutiny, especially regarding the Robinson allegations." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Early-to-bed country boy. Beer with the team, nothing excessive." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Slaughter was at his absolute best in September, pushing teams to the wire",
      "World Series games — postseason .295/.404/.523 shows he elevated in October",
      "Returning from adversity — 3 years of WWII, then immediately led NL with 130 RBI",
      "Playing against rivals (Dodgers) — the Cards-Brooklyn rivalry fueled his competitive fire",
    ],
    cold_triggers: [
      "Being traded — when the Cardinals dealt him to the Yankees in 1954, he wept openly",
      "Reduced playing time — Slaughter's pride couldn't accept a bench role gracefully",
      "Racial controversy coverage — press scrutiny about the Robinson incidents distracted and embittered him",
    ],
    pressure_response: "EXCEPTIONAL. Slaughter was built for October. The 'Mad Dash' in Game 7 of the 1946 WS is one of the ten greatest moments in baseball history — scoring from first on a double by running through the third-base coach's stop sign. In the 1942 WS, he hit a home run in the clinching game and then spoke live to American troops overseas. He hit .350 in the 1956 WS for the Yankees at age 40. Slaughter didn't crack under pressure; he thrived on it. His hustle made him the player you wanted at the plate when everything was on the line.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Mad Dash",
      type: "Game Action",
      text: "Game 7 of the World Series. Score tied in the 8th inning. Your runner is on first with two outs. The batter lines a double to center. Your runner — ignoring the third-base coach's stop sign — rounds third and sprints for home. Roll: on 2+, he scores the winning run. On 1, he's out and the game goes to extras.",
      origin: "Game 7, 1946 World Series: Slaughter on first, two outs, score tied 3-3. Harry Walker doubled to center. Slaughter ran through the stop sign at third. Johnny Pesky hesitated. Slaughter scored. Cardinals won. Named #10 on the Sporting News Greatest Moments list.",
    },
    {
      title: "Son, If You're Tired",
      type: "Drama",
      text: "Your manager catches a young player walking from his position to the dugout. The manager says: 'If you're tired, we'll try to get you some help.' The player never walks on a baseball field again. He gains the 'Permanent Hustle' trait — +1 SPD equivalent in baserunning situations for his entire career.",
      origin: "Minor league manager Eddie Dyer caught the young Slaughter walking from the outfield. After Dyer's sarcastic remark, Slaughter never walked on a baseball field again — for the rest of his 19-year career.",
    },
    {
      title: "Radio Address to the Troops",
      type: "Drama",
      text: "After a World Series victory, your star player is asked to speak live to troops overseas by radio. He promises to 'finish this thing tomorrow' and then report for military duty. +3 team morale, +2 national reputation. The player leaves for 3 seasons of military service.",
      origin: "After Game 4 of the 1942 WS, Slaughter spoke to the troops: 'We played a great game today and we won. And we are going to finish this thing tomorrow. Then I'm going to report for duty in the Army Air Corps and join you.' The Cardinals won the next day. Slaughter served 3 years.",
    },
    {
      title: "Spikes High at First",
      type: "Game Action",
      text: "Your aggressive baserunner slides hard into first base, taking out the covering pitcher. The pitcher suffers -1 effectiveness for his next start. But the umpire issues a warning. If it happens again, your player is ejected.",
      origin: "Slaughter openly admitted he would retaliate against pitchers who knocked him down by taking their legs out when they covered first base. 'That was the way the game was played,' he said, 'and to Enos, the right way.'",
    },
    {
      title: "Tears at the Trade",
      type: "Drama",
      text: "Your franchise icon is traded to make room for a rookie. The veteran weeps openly. His morale drops to zero. The fanbase is furious (-2 franchise reputation). But the rookie wins Rookie of the Year, partially healing the wound.",
      origin: "In 1954, the Cardinals traded Slaughter to the Yankees to make room for Wally Moon. Slaughter wept. The trade was deeply unpopular — until Moon won NL Rookie of the Year.",
    },
    {
      title: "The Never-Walk Rule",
      type: "Action",
      text: "Your team adopts a 'never walk' philosophy — every player must sprint to first base, even on walks. Team hustle rating +2 for the season. Opposing teams gain -1 morale when facing your squad. But player fatigue accumulates 10% faster.",
      origin: "Slaughter's habit of sprinting to first on walks became a Cardinals tradition. Pete Rose and David Eckstein later adopted the same approach. It defined the Cardinals' identity for decades.",
    },
    {
      title: "Three Years Gone",
      type: "Drama",
      text: "Your All-Star player leaves for military service. He misses 3 full seasons. When he returns, roll: on 4+, he returns at full strength. On 2-3, he's at -1 OVR for one season. On 1, the war permanently reduces his ceiling.",
      origin: "Slaughter served 3 years in the Army Air Corps (1943-1945), setting up baseball teams in Saipan and Tinian. He returned in 1946 and immediately led the NL with 130 RBI, as if he'd never left.",
    },
    {
      title: "The Old Man's World Series",
      type: "Game Action",
      text: "Your 40-year-old reserve outfielder, thought to be past his prime, starts a World Series game and hits .350 for the series. +2 team momentum. Proves that hustle has no expiration date.",
      origin: "At age 40, Slaughter hit .350 in the 1956 World Series for the Yankees — the series in which Don Larsen threw the only perfect game in WS history. Slaughter batted fifth and played left field in that perfect game.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Florid, ruddy face with straw-colored hair. 5'9\" 190 lbs — stocky, barrel-chested, built for endurance. Intense competitive eyes under a Cardinals cap. The face of a man who grew up in textile mills and brought that blue-collar toughness to every at-bat. Jaw set, mouth tight — this is a fighter.",
    attire: "St. Louis Cardinals home whites, 1942 flannel. Number 9 visible. Captured mid-sprint — either rounding third base in the 'Mad Dash' or running full speed to first base on a walk. Dirt on the uniform from a hard slide. Spikes visible.",
    mood: "Relentless intensity. Not anger — purpose. Slaughter played with a burning urgency that never dimmed across 19 seasons. The portrait should radiate controlled aggression — the look of a man who will outwork, outhustle, and outcompete everyone on the field, every single day.",
    style: "Warm sepia with Cardinals red-gold accents. Sportsman's Park in the background, the old St. Louis skyline. The card should feel like a 1942 wartime snapshot — patriotic, hardscrabble, American. The aesthetic bridges the Gas House Gang era and the postwar Cardinals dynasty.",
    reference: "The definitive 'hustle' card. Slaughter's card should make the player feel like they need to run harder. Among the most intense personality profiles in the Allies set — paired with Pete Reiser, you have two cards that embody the reckless, all-or-nothing spirit of 1940s baseball.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);

const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function EnosSlaughterCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, rounding third full sprint, Cardinals whites, Sportsman's Park]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.gold}dd`, color: C.darkBrown, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 4× WS Champion", "⭐ 10× All-Star", "🏅 '42 & '46 WS Hero", "📜 Mad Dash (#10 All-Time)", "⭐ HOF 1985", "🪖 WWII Veteran", "🏟 #9 Retired (STL)"].map((a, i) => (
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
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.traitGreen }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Slaughter's real life, become universal cards playable in any game.</p>
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
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Slaughter's Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
