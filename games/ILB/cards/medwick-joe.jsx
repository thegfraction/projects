import { useState } from "react";

const MEDWICK_DATA = {
  name: "Joe Medwick",
  nickname: "Ducky / Muscles",
  year: 1937,
  team: "St. Louis Cardinals",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "LF",
  bats: "R",
  throws: "R",
  height: "5'10\"",
  weight: "187 lbs",
  born: "November 24, 1911 — Carteret, New Jersey (son of Hungarian immigrants; 4-sport star in high school; Knute Rockne recruited him for Notre Dame football)",
  died: "March 21, 1975 — St. Petersburg, Florida (age 63, heart attack during spring training while working as Cardinals hitting instructor)",
  hof: "Inducted 1968 (BBWAA, 84.8%, final year of eligibility). 1937 NL Triple Crown + MVP. Last NL Triple Crown winner (still, as of 2026). 10× All-Star. .324 career BA. 2,471 hits. 540 career 2B. 1934 WS champion. Cardinals HOF inaugural class 2014.",

  real_stats: {
    season: 1937, games: 156, at_bats: 633, batting_avg: ".374",
    hits: 237, doubles: 56, triples: 10, home_runs: 31,
    rbi: 154, runs: 111, stolen_bases: 4, walks: 41,
    strikeouts: 50, slg: ".641", obp: ".414", ops: "1.056",
    ops_plus: 176, war: 8.4,
    career_avg: ".324", career_hr: 205, career_rbi: 1383,
    career_hits: 2471, career_war: 56.4,
    career_doubles: 540, career_xbh_seasons: "7 consecutive 40+ 2B seasons (MLB record)",
  },

  ilb_stats: {
    ovr: 10,     // Elite/MVP — Triple Crown winner. NL MVP. .374 BA. 176 OPS+. 8.4 WAR. 56.4 career WAR. .324 career BA. 2,471 hits. 10× All-Star. HOF 84.8%. The last NL Triple Crown winner. One of the most feared hitters of the 1930s.
    con: 5,      // .374 BA in 1937 (led NL — Triple Crown). 237 hits (led NL). .324 career BA. 2,471 career hits. 540 career 2B (NL record 64 in 1936). 7 consecutive 40+ 2B seasons (MLB record). Only 50 K in 633 AB. He could see the rotation of the pitch instantly. CON 5.
    pow: 3,      // 31 HR in 1937 (co-led NL — Triple Crown). 205 career HR. .641 SLG. 97 XBH in 1937. SLG bonus applies → POW 3. He was a doubles/line-drive hitter with enough pop for 30+ HR.
    spd: 1,      // 4 SB in 1937. 10 triples. Triples bonus applies → SPD 1. He was called "Ducky" because of his waddle. Not fast, but aggressive baserunner (hard slides into every base).
    def: 0,      // "Medwick never excelled defensively." Cardinals traded him partly because they felt he was losing defensive skills. Below average fielder in LF. DEF 0.
    clu: 2,      // .379 BA in 1934 WS (opened Game 1 with 4 straight hits including HR). .324 in 12 career WS games. 1934 WS champion. Ejected from Game 7 for his own safety after sliding hard into Owen. But: .235 in 1941 WS (only other WS appearance). CLU 2.
  },
  
  stat_justification: {
    con: ".374 BA in 1937 — led NL (Triple Crown). 237 hits (led NL). 56 doubles. .324 career BA. 2,471 career hits. 540 career doubles (NL record 64 in 1936). 7 consecutive seasons of 40+ doubles (MLB record). Only 50 K in 633 AB — he had 'amazingly keen eyes' and could see the rotation of the pitch instantly. 10 consecutive seasons hitting .300+. Rating of 5 — supreme contact.",
    pow: "31 HR in 1937 (co-led NL — Triple Crown). 154 RBI (led NL). 205 career HR. .641 SLG in 1937. 97 XBH in 1937 (95 in 1936). He was primarily a doubles machine but had enough power for 30+ HR in his peak year. SLG bonus → POW 3.",
    spd: "4 SB in 1937. 10 triples. 'Ducky' — called this because of his waddle. He was not fast. But he was an aggressive baserunner who slid hard into every base (hence the 1934 WS incident). Triples bonus → SPD 1.",
    def: "Below average. Cardinals traded him partly because 'they felt he was losing some of the skills he displayed in his 1937 Triple Crown season' defensively. He was a bat-first LF. Rating of 0.",
    clu: ".379 BA in the 1934 WS — opened Game 1 with 4 straight hits including a HR. .324 BA in 12 career WS games. Ejected from Game 7 of 1934 WS for his own safety after Detroit fans pelted him with fruit following his hard slide into Marv Owen — the only player ever removed from a WS game for personal safety. But: .235 in the 1941 WS. Rating of 2 — the 1934 WS heroics earn it.",
  },

  personality: {
    leadership_style: "The Enforcer. Medwick didn't lead through inspiration or kindness. He led through sheer force of will, combativeness, and an absolute refusal to back down from anything or anyone. He fought opposing players. He fought teammates. He kicked Marv Owen with both spiked shoes while lying on the ground. He argued with Branch Rickey over his contract all season. He was 'competitive to the point of combativeness, and regarded by some as self-centered.' Dizzy Dean: 'Dawgonnit. That Medwick don't fight fair at all. You argue with him for a bit and then he beats you before you've even had a chance to speak your piece.'",
    temperament: "Hot-tempered, surly, aggressive, proud. Hungarian fire. 'Maybe it was the Hungarian in me. I hated to lose, I always wanted to win. Everything tasted better.' He swung at anything near the zone and hit it hard. He slid into every base with spikes high. An anonymous former teammate: 'When he dies, half the National League will go to his wake just to make sure that son-of-a-bitch is dead.' He was difficult, combative, and absolutely brilliant.",
    work_ethic: "Natural talent weaponized by aggression. Four-sport star at Carteret High School. Knute Rockne recruited him for Notre Dame football. He chose baseball because he hit .419 in the minors immediately. He had 'amazingly keen eyes' — he could see the rotation and gauge of a pitch instantly, identifying the type of pitch before it reached the plate. His powerful arm muscles 'whipped the bat around in a split second.' The combination of vision and violence made him unstoppable.",
    lifestyle: "Hungarian immigrant's son from industrial New Jersey. Born in Carteret, NJ — working-class, multicultural. Married twice. After playing: minor league manager (1949-52), batting instructor for Cardinals farm system until 1975. Died of a heart attack during spring training in St. Petersburg at age 63, still working for the Cardinals. When he met Pope Pius XII on a USO tour, the Pope asked his vocation. Medwick: 'Your Holiness, I'm Joe Medwick. I, too, used to be a Cardinal.'",
    era_adaptability: "HIGH. Medwick's bat-to-ball skills (.374 BA, 50 K in 633 AB), gap power (56 2B + 31 HR), and aggressive style would translate to any era. His defense would be a problem, but in the DH era he'd be a .320/30 HR hitter with elite doubles production. The temperament might cause clubhouse issues in the modern era of media scrutiny, but the bat would play everywhere. Think a right-handed, angrier version of David Ortiz.",
    clubhouse_impact: "COMPLEX AND VOLATILE. Medwick was respected for his bat and feared for his temper. He fought teammates and opponents alike. He was not popular — his HOF voting stalled for 20 years because of strained relationships with teammates and press. But the Gashouse Gang channeled his aggression into winning. On the right team, with the right manager (Frisch could handle him), Medwick's fury became fuel. On the wrong team, it became poison.",
    dark_side: "The beaning. June 18, 1940 — six days after being traded to the Dodgers. Former Cardinals teammate Bob Bowman hit Medwick in the head with a pitch. Medwick was hospitalized, and some believed the beaning was intentional (Bowman had argued with Medwick the night before at a hotel). Medwick was never the same hitter. Before the beaning: .331 career BA. After: .288. He played 8 more years but the power and the fearlessness were diminished. The Hungarian fire was doused by a fastball to the skull. His HOF election — on his final year of eligibility, after 20 years of waiting — prompted Medwick to say: 'This was the longest slump of my career. I had gone 0-for-20 before, but never 0-for-20 years.'",
  },

  chemistry_traits: [
    { tag: "Triple Crown", desc: ".374 BA, 31 HR, 154 RBI in 1937 — the last NL Triple Crown. Also led NL in hits (237), runs (111), doubles (56), total bases, and SLG. When Medwick is the league's best hitter: +1 to all offensive stats." },
    { tag: "Hungarian Fire", desc: "+1 POW permanently from sheer aggression. But: 10% chance per game of a confrontation with a teammate, opponent, or umpire. If the confrontation escalates: ejection. If it doesn't: +1 intimidation factor." },
    { tag: "Ejected for His Own Safety", desc: "Once per career, in a blowout WS game: Medwick does something so aggressive that fans riot. The Commissioner ejects him for his personal safety. +3 legend, +2 entertainment, -0 statistical impact (the game was already won)." },
    { tag: "The Beaning", desc: "After a trade, 10% chance a former teammate beans Medwick. If triggered: -2 CON and -1 POW permanently. Career divides into Before (elite) and After (good). Based on Bob Bowman's 1940 pitch." },
    { tag: "Gashouse Gang Muscle", desc: "When 2+ Gashouse Gang members on roster: +1 POW to Medwick. He was the offensive engine of the most colorful team in history. Collins was the ringleader; Medwick was the weapon." },
    { tag: "Bad-Ball Hitter", desc: "Medwick swung at anything near the zone — and hit it. Immune to pitcher's attempts to nibble corners. Walks are rare (41 BB in 633 AB). But K are also rare (50 K). He simply hits everything." },
    { tag: "I Too Used to Be a Cardinal", desc: "When meeting authority figures or in formal situations: Medwick delivers a perfect one-liner. +1 charisma in off-field events. Based on his response to Pope Pius XII." },
    { tag: "0-for-20 Years", desc: "If not elected to HOF within 10 years of retirement: each subsequent year, Medwick's legacy score drops -1. But if elected in the final year: +5 legacy, +3 satisfaction. The longest slump of his career." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "HIGH", note: "9 seasons. .324 BA. Triple Crown. WS champion. The Gashouse Gang's left fielder." },
    { location: "Batter's Box", affinity: "HIGH", note: ".374 in 1937. 237 hits. 56 doubles. He hit everything near the zone. The bat was a weapon." },
    { location: "Third Base (sliding into)", affinity: "HIGH", note: "Hard slides into every base. Kicked Marv Owen with spiked shoes. Caused a riot." },
    { location: "Left Field", affinity: "MEDIUM", note: "Adequate defensively, never excelled. The bat carried him. DEF 0." },
    { location: "Carteret, New Jersey", affinity: "MEDIUM", note: "Son of Hungarian immigrants. 4-sport star. Turned down Notre Dame football for baseball." },
    { location: "The Vatican", affinity: "MEDIUM", note: "'Your Holiness, I'm Joe Medwick. I, too, used to be a Cardinal.'" },
    { location: "World Series Game 7 (Detroit)", affinity: "LOW", note: "Pelted with fruit. Ejected by Commissioner Landis. The only player ever removed for personal safety." },
    { location: "Ebbets Field (post-trade)", affinity: "LOW", note: "Beaned by Bowman 6 days after trade. Never the same hitter. Before: .331. After: .288." },
  ],

  momentum: {
    hot_triggers: [
      "Aggression — when Medwick is angry, he hits harder. The Hungarian fire fuels the bat.",
      "Doubles — 56 in 1937. 64 in 1936 (NL record). Line drives find gaps when he's locked in.",
      "Gashouse Gang chemistry — Collins, Martin, Dean around him, the energy compounds.",
      "Triple Crown pursuit — when leading in all 3 categories, +1 to all offensive stats from focus.",
    ],
    cold_triggers: [
      "Post-beaning — after head injury, the fearlessness is gone. He flinches at inside pitches.",
      "Contract disputes — haggled with Rickey all 1939 season. Distractions hurt production.",
      "Clubhouse conflict — fights with teammates create -1 team chemistry.",
      "Late career decline — after the Bowman beaning, the elite numbers never returned.",
    ],
    pressure_response: "FEROCIOUS IN OCTOBER. .379 BA in the 1934 WS — opened Game 1 with 4 straight hits including a HR. In Game 7, hit a triple and slid so hard into third that he started a riot. Ejected by Commissioner Landis for his own safety as fans pelted him with fruit — the only player ever removed from a WS game this way. When asked why fans threw garbage: 'I knew why they threw that garbage at me. What I don't understand is why they brought it to the park in the first place.' .324 BA in 12 career WS games. He was born for October violence.",
  },

  action_card_seeds: [
    {
      title: "The Last National League Triple Crown",
      type: "Game Action",
      text: "Your left fielder leads the league in batting average (.374), home runs (31), and RBI (154). He also leads in hits (237), runs (111), doubles (56), total bases, and slugging. It's the most dominant offensive season in the National League since Rogers Hornsby. No NL player will do it again — not for 90+ years and counting.",
      origin: "1937: Medwick won the NL Triple Crown and MVP. He is still the last NL player to win the Triple Crown.",
    },
    {
      title: "Ejected from the World Series for His Own Safety",
      type: "Drama",
      text: "Game 7 of the World Series. Your team leads 9-0. Your left fielder triples to right and slides hard into third base, kicking the third baseman with spiked shoes. When he takes the field, fans pelt him with apples, oranges, grapefruit, and ham hocks. The Commissioner orders him removed — for his own safety. He's the only player ever ejected this way. Your team wins 11-0.",
      origin: "1934 WS Game 7: Medwick's hard slide into Marv Owen caused Detroit fans to riot. Commissioner Landis ejected Medwick. Cardinals won 11-0.",
    },
    {
      title: "Why They Brought It to the Ballpark",
      type: "Action",
      text: "After being pelted with fruit in a World Series game, your player is asked by reporters why the fans threw garbage at him. His response: 'I knew why they threw that garbage at me. What I don't understand is why they brought it to the park in the first place.'",
      origin: "Medwick's famous quote after being pelted by Detroit fans in Game 7 of the 1934 World Series.",
    },
    {
      title: "The Beaning That Changed Everything",
      type: "Drama",
      text: "Six days after a trade, your star faces his former team. A former teammate throws a fastball at his head. He's hospitalized. Some believe it was intentional. Before the beaning: .331 career BA. After: .288. The fearlessness is gone. He flinches at inside pitches. The fire that made him great is dimmed by a ball to the skull.",
      origin: "June 18, 1940: Bob Bowman, a former Cardinals teammate, beaned Medwick 6 days after his trade to the Dodgers. Medwick was never the same hitter.",
    },
    {
      title: "I, Too, Used to Be a Cardinal",
      type: "Action",
      text: "On a USO tour, your player meets the Pope. His Holiness asks his vocation. Your player — a Hungarian immigrant's son from New Jersey, a left fielder, a Triple Crown winner — replies: 'Your Holiness, I'm Joe Medwick. I, too, used to be a Cardinal.'",
      origin: "During a 1944 USO tour, Pope Pius XII asked Medwick his vocation. Medwick's response became one of baseball's most famous one-liners.",
    },
    {
      title: "Sixty-Four Doubles",
      type: "Game Action",
      text: "Your left fielder hits 64 doubles in a season — a National League record that has stood for 90 years and counting. He follows it with 56 more the next year. Seven consecutive seasons of 40+ doubles — a Major League record. The gaps are his kingdom.",
      origin: "1936: Medwick's 64 doubles set the NL record (still standing). His 7 consecutive 40+ double seasons remain the MLB record.",
    },
    {
      title: "0-for-20 Years",
      type: "Drama",
      text: "Your legend retires. He waits for the Hall of Fame. One year. Five years. Ten years. Fifteen. The writers won't vote for him — they remember the temper, the fights, the surly disposition. On his 20th and final year of eligibility, he finally gets the call. His response: 'This was the longest slump of my career. I had gone 0-for-20 before, but never 0-for-20 years.'",
      origin: "Medwick received 0 votes his first 7 years. He was elected in 1968 on his final ballot at 84.8%. His 'longest slump' quote is legendary.",
    },
    {
      title: "Half the League at His Wake",
      type: "Drama",
      text: "Your player is so universally disliked by opponents and former teammates that an anonymous player says: 'When he dies, half the National League will go to his wake just to make sure that son-of-a-bitch is dead.' He dies at 63 of a heart attack during spring training, still working for the Cardinals. Still a Cardinal.",
      origin: "Anonymous former teammate's quote about Medwick. He died March 21, 1975, during spring training in St. Petersburg while working as a Cardinals hitting instructor.",
    },
  ],

  art_direction: {
    face: "Muscular, intense, dark features reflecting Hungarian heritage. 5'10\" 187 lbs — stocky, powerful. The face should show fury — the man who kicked Marv Owen with spiked shoes, who fought teammates and opponents alike. Not smiling. Not charming. Ready to hit something — a baseball, a third baseman, anyone who gets in the way.",
    attire: "St. Louis Cardinals 1937 home whites with the birds-on-the-bat. Sportsman's Park behind him. The bat should be mid-swing — violent, explosive, driving a line drive into the gap for another double. Maybe fruit scattered in the foreground — a subtle nod to the 1934 WS riot.",
    mood: "Violence at the plate. The swing is not elegant — it's an act of aggression. Medwick attacks the baseball. Every line drive is personal. The card should feel dangerous — the most dangerous hitter in the NL, the man who made the ball afraid. Or: the slide into third — spikes high, Owen on the ground, fruit raining down.",
    style: "Gashouse Gang grit meets Hungarian intensity. Hot, dusty, aggressive. Cardinals red as blood. The card should feel like a fight — because Medwick's entire career was a fight. Against pitchers, against teammates, against the HOF voters, against the beaning that stole his prime.",
    reference: "The card of the last NL Triple Crown winner. The man ejected from a World Series for his own safety. The man who told the Pope he, too, used to be a Cardinal. The man whose former teammate beaned him and stole his prime. The man who waited 20 years for the Hall of Fame. Ducky Medwick — half the league went to his wake to make sure he was dead.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits -> +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG >= .600 -> +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples >= 10 -> +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CONx2 + POWx2 + SPDx1 + DEFx1 -> normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JoeMedwickCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MEDWICK_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Muscular, intense, violent swing, Cardinals birds-on-bat, Sportsman's Park, fruit scattered in foreground, fury in the eyes]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1937 — TRIPLE CROWN + NL MVP — LAST NL TRIPLE CROWN WINNER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛 HOF 1968 (84.8%)", "🏆 1934 WS Champion", "👑 Triple Crown 1937", "🏅 NL MVP 1937", "⭐ 10× All-Star", "📊 .324 Career BA", "💎 540 Career 2B", "🔥 64 2B in 1936 (NL Record)"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Medwick's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Medwick's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
