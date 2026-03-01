import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: PEE WEE REESE
  // Year Snapshot: 1949 (Led NL in Runs, 5th MVP, Pennant, Peak WAR)
  // ═══════════════════════════════════════════════════════════════

  name: "Pee Wee Reese",
  nickname: "The Little Colonel / The Captain",
  year: 1949,
  team: "Brooklyn Dodgers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "160 lbs",
  born: "July 23, 1918 — Ekron, KY",
  died: "August 14, 1999 — Louisville, KY (age 81)",
  hof: "Inducted 1984 (Veterans Committee). 10× All-Star. 7 NL pennants. 1955 WS Champion. #1 retired by Dodgers.",

  real_stats: {
    season: 1949,
    games: 155,
    at_bats: 617,
    hits: 172,
    doubles: 27,
    triples: 3,
    home_runs: 16,
    rbi: 73,
    runs: 132,
    stolen_bases: 26,
    walks: 116,
    batting_avg: ".279",
    obp: ".391",
    slg: ".424",
    ops: ".815",
    ops_plus: 116,
    war: 6.7,
    career_avg: ".269",
    career_hits: 2170,
    career_hr: 126,
    career_rbi: 885,
    career_runs: 1338,
    career_sb: 232,
    career_bb: 1210,
    career_war: 66.4,
  },

  // ═══════════════════════════════════════════════════════════════
  // HITTER STAT CONVERSION ENGINE
  //
  // CON: .279 BA → tier 3 (.270-.299). OPS+ 116 → no bonus (<130). CON = 3.
  // POW: 16 HR → tier 1 (10-19). SLG .424 → no bonus (<.500). POW = 1.
  // SPD: 26 SB → tier 2 (16-30). No GG CF bonus. SPD = 2.
  // DEF: Led NL SS in putouts 4×, DP 2×, fielding % 1×, assists 1×.
  //   Outstanding gloveman. Pre-GG equivalent ~4-5 GG. DEF = 2.
  // CLU: Career WS: .272 in 44 games. .316 in 1949 WS. .345 in 1952 WS.
  //   PS BA .272 → tier 1 (.250-.299). WS hero moments: 1952 double steal
  //   with Robinson, 1955 WS ring. But 6 WS losses. CLU = 1.
  // OVR: HOF, 10× All-Star, 7 pennants, 1 WS ring, team captain,
  //   Robinson friendship, 66.4 career WAR. OVR = 8 (All-Star/near-Elite).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — HOF, captain, 7 pennants, Robinson friendship, 66.4 career WAR
    con: 3,      // .279 BA → tier 3. OPS+ 116 → no bonus. Good bat, not great.
    pow: 1,      // 16 HR → tier 1. SLG .424 → no bonus. Modest pop.
    spd: 2,      // 26 SB in 1949. Led NL with 30 in 1952. Legitimate runner.
    def: 2,      // Led NL SS in putouts 4×, DP 2×, FLD% 1×, assists 1×. Elite glove. DEF = 2.
    clu: 1,      // WS: .272 in 44 games. Solid but not spectacular. 6 WS losses. CLU = 1.
  },

  stat_justification: {
    con: "Reese batted .279 in 1949 with a .391 OBP (116 walks). Career .269 BA is modest for a HOFer, but he walked 1,210 times — Dodgers all-time leader. His value was on-base ability, not batting average. He hit .300 only once (.309 in 1954 at age 36). OPS+ of 116 falls short of the 130 bonus threshold. Rating of 3 — dependable contact with plate discipline.",
    pow: "16 HR in 1949 was his career high. 126 career HR over 16 seasons. SLG .424 — no bonus. Reese was not a power hitter. He was a table-setter who occasionally surprised with pop. His 1,210 walks tell you his real offensive weapon: patience, not power. Rating of 1.",
    spd: "26 SB in 1949. Led NL with 30 SB in 1952. Career 232 SB. Reese was a legitimate baserunner — 35 steals in 36 attempts in his minor league peak. He went first-to-third routinely and was a smart, instinctive runner. Rating of 2.",
    def: "Reese led NL shortstops in putouts 4 times, double plays twice, fielding percentage once, assists once. Branch Rickey called him 'the heart and soul of the Dodgers.' Manager Leo Durocher gave up his own SS position after seeing Reese field one spring training: 'He'll do. I'll be the bench manager.' Robinson said Reese 'took charge out there in a way to help all of us.' Pre-Gold Glove equivalent: 4-5 GG. Rating of 2.",
    clu: "World Series: .272 BA in 44 games across 7 Fall Classics. Hit .316 in 1949 WS, .345 with 10 hits in 1952 WS. Won the 1955 WS — Brooklyn's only championship. But lost 6 World Series, mostly to the Yankees. Set a record for most losing WS appearances (6). Reese was consistently good but never had the singular October hero moment. Rating of 1 — solid, not spectacular.",
  },

  personality: {
    leadership_style: "The Captain — the quintessential leader by character. Branch Rickey named Reese team captain in 1949, telling him: 'You're not only the logical choice, you are the only possible choice.' Reese brought out the lineup card. He positioned outfielders. He cajoled pitchers. Robinson: 'When Pee Wee told us where to play or gave some of us the devil, somehow it was easy to take. He just has a way about him of saying the right thing.' Reese led by moral authority, not volume.",
    temperament: "Warm, steady, quietly courageous. The man who refused to sign the petition against Robinson — and then walked across the diamond to put his arm around him while Cincinnati fans hurled slurs. Reese grew up in segregated Louisville, Kentucky. He had every reason to follow Walker's lead. Instead, he chose decency. When asked if Robinson threatened his position, he said: 'If he's man enough to take my job, he deserves it.' This wasn't performative — it was instinctive.",
    work_ethic: "Self-made from nothing. Reese didn't play high school baseball until his senior year — he weighed 120 pounds. He worked splicing cables for the phone company and played church league ball. A Louisville Colonels owner spotted him and signed him for $200. He rebuilt himself from a 120-pound nobody into a Hall of Fame shortstop through sheer persistence and intelligence. His 1941 season (47 errors, .229 BA) would have broken most players — Reese came back to make 10 All-Star teams.",
    lifestyle: "Louisville, Kentucky — born, raised, buried. Married Dorothy 'Dottie' Walton during 1942 spring training (same day teammate Pete Reiser married). Two children: Barbara and Mark. After baseball, became a broadcaster (NBC Game of the Week with Dizzy Dean) then a sales representative for Hillerich & Bradsby — makers of Louisville Slugger bats. The Little Colonel returned to Louisville and remained there for life.",
    era_adaptability: "HIGH. Reese's game translates beautifully to any era. His plate discipline (1,210 career walks, .366 career OBP) is the currency of modern baseball. His speed and defense at shortstop would be valued in any decade. His lack of power would be a concern, but his leadership, OBP, and glove would make him a starting shortstop on any team. Most importantly: his moral courage is timeless.",
    clubhouse_impact: "THE HEART AND SOUL. This is not hyperbole — it's the exact phrase Rickey used. Reese was the glue that held together the most diverse, contentious, and talented roster in baseball history. He bridged Southern whites and Jackie Robinson. He bridged veterans and rookies. He bridged the pitching staff and the lineup. When Reese put his arm around Robinson, he didn't just change one team — he helped change America. In ILB terms: Reese is the ultimate +chemistry card for any roster.",
    dark_side: "Six World Series losses. Reese and Elston Howard share the record for most losing WS appearances (6 each). The 'Wait Till Next Year' Dodgers were Reese's Dodgers — and they lost to the Yankees in 1941, 1947, 1949, 1952, 1953, and 1956. The 1955 victory was real, but it was one ring against six heartbreaks. Reese also battled guilt about his own Southern upbringing — he knew the racism he'd grown up with was wrong, but acknowledging that meant confronting everything he'd been taught. In ILB terms: Reese carries a 'Wait Till Next Year' trait — +1 resilience after WS loss, but cumulative WS losses create a 'Hex' effect.",
  },

  chemistry_traits: [
    { tag: "The Captain", desc: "Team captain named by Rickey. Brings out the lineup card. Positions outfielders. +2 team chemistry for all teammates." },
    { tag: "The Arm Around Robinson", desc: "Walked across the diamond and put his arm around Jackie Robinson while fans hurled slurs. +3 chemistry with Black players. Cancels 'Wrong Side of History' penalties from other teammates." },
    { tag: "The Little Colonel", desc: "From Louisville's Colonels to Brooklyn's captain. Southern boy who chose decency over prejudice. +1 respect from all teammates regardless of background." },
    { tag: "If He Can Take My Job", desc: "'If he's man enough to take my job, he deserves it.' Reese accepts competition without ego. No jealousy penalties when roster changes occur." },
    { tag: "Wait Till Next Year", desc: "6 WS losses. +1 resilience after each WS defeat. But after 3+ WS losses, a 'Hex' aura settles on the team: -1 to WS clutch performance." },
    { tag: "Phone Company Grit", desc: "Cable splicer to HOFer. Reese started from absolute nothing — 120 lbs, no HS baseball, $200 bonus. +1 to overcoming adversity and rebuilding from slumps." },
    { tag: "Marble Champion", desc: "'Pee Wee' was his marble — the champion marble shooter from Ekron, Kentucky. +1 hand-eye coordination. Steady hands under pressure." },
    { tag: "Boys of Summer", desc: "Captain of the legendary 1950s Dodgers. When paired with Robinson, Campanella, Hodges, Snider, Furillo: +3 team synergy. The sum exceeds the parts." },
  ],

  preferred_locations: [
    { location: "Shortstop / Infield", affinity: "HIGH", note: "Led NL SS in putouts 4×. Durocher gave up his position for Reese. Elite gloveman." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The Captain. The heart and soul. The man who says the right thing." },
    { location: "Ebbets Field", affinity: "HIGH", note: "35,000 fans sang Happy Birthday to him in 1955. $20,000 in gifts. Brooklyn's son." },
    { location: "Louisville / Home", affinity: "HIGH", note: "Born in Ekron, raised in Louisville, buried there. Louisville Slugger rep after baseball." },
    { location: "Broadcasting Booth", affinity: "MEDIUM", note: "NBC Game of the Week with Dizzy Dean. Natural communicator." },
    { location: "Bar / Social Events", affinity: "MEDIUM", note: "Warm, personable, beloved. Used humor to ease tension — even with Robinson." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Clean-living, steady." },
  ],

  momentum: {
    hot_triggers: [
      "Teammates under attack — Reese's leadership surges when someone on his team is being targeted",
      "Pennant race September — Reese played in 7 pennant-winning teams, thrived in stretch runs",
      "Table-setting role — when Reese walks, steals, and scores, the whole team catches fire",
      "Post-adversity comeback — Reese rebounded from 47-error 1941 to become a 10× All-Star",
    ],
    cold_triggers: [
      "World Series vs. Yankees — the Hex of 'Wait Till Next Year' loomed over every October",
      "Power drought — Reese could go cold at the plate when trying to drive the ball",
      "Late career decline — after 35, Reese's range and speed diminished notably",
    ],
    pressure_response: "STEADY-HEROIC IN CHARACTER, SOLID IN STATS. Reese's October numbers (.272 in 44 WS games) are respectable but not legendary. His heroism was off the stat sheet — the arm around Robinson, the refused petition, the captaincy that held a dynasty together through 7 pennants. In 1955, when Brooklyn finally won it all, Reese fielded the final ground ball and threw to Hodges for the last out. The Captain finished it. In ILB terms: Reese gets +1 to ALL teammates' clutch ratings in October. His own CLU is modest, but he makes everyone around him better.",
  },

  action_card_seeds: [
    {
      title: "The Arm Around the Shoulder",
      type: "Drama",
      text: "The crowd is hurling slurs at your Black teammate. Your captain — a Southerner, from segregated Kentucky — walks across the diamond, puts his arm around his teammate's shoulder, and stands there. The crowd goes quiet. One gesture changes everything.",
      origin: "Cincinnati, 1947. Pee Wee Reese walked over to Jackie Robinson during warmups as fans hurled racial abuse. He put his arm around Robinson and chatted. Rachel Robinson: 'It was a very supportive gesture, and very instinctive.'",
    },
    {
      title: "The Refused Petition",
      type: "Drama",
      text: "A petition circulates through the clubhouse: 'If you bring up the Black player, we won't play.' The other players assume the Southerner will sign first. Instead, he refuses. The petition dies. The Southerner becomes the Black player's closest friend.",
      origin: "1947. Dodgers players assumed Reese, from Louisville, would sign Walker's petition against Robinson. Reese refused. 'If he can take my job, he's entitled to it.' The petition collapsed without Reese's signature.",
    },
    {
      title: "Wait Till Next Year",
      type: "Drama",
      text: "Your team loses the World Series. Again. Your captain has now lost six Fall Classics with the same franchise. Every year, the fans say the same thing: 'Wait till next year.' The captain never stops believing. And one year — finally — next year comes.",
      origin: "Reese lost the WS in 1941, '47, '49, '52, '53, and '56. In 1955, Brooklyn finally beat the Yankees. Reese fielded the final grounder and threw to Hodges. 'Next year' had arrived.",
    },
    {
      title: "He'll Do — I'll Be the Bench Manager",
      type: "Drama",
      text: "Your player-manager is also the starting shortstop. He hits grounders to a 140-pound rookie all spring. After one session, he announces: 'He'll do. I'll be the bench manager.' The rookie takes his job. The manager never plays shortstop again.",
      origin: "Spring 1940. Leo Durocher, the Dodgers' player-manager and incumbent SS, hit grounders to Reese until exhausted. Durocher benched himself permanently. Reese was the Dodgers' shortstop for 16 years.",
    },
    {
      title: "The $200 Bonus",
      type: "Drama",
      text: "A 120-pound phone company cable splicer plays church league baseball. His team plays a championship game at a minor league park. The owner spots him and signs him for $200. Twenty years later, the cable splicer is in the Hall of Fame.",
      origin: "Reese played church league ball in Louisville. His team's championship game was at the Colonels' park. Owner Cap Neal signed him for $200. Reese became a 10× All-Star and HOFer.",
    },
    {
      title: "The Birthday at Ebbets Field",
      type: "Action",
      text: "It's your captain's birthday. The stadium lights go dark. Thirty-five thousand fans light candles and sing 'Happy Birthday.' The franchise showers him with $20,000 in gifts. No other player has ever been loved like this by a single city.",
      origin: "Pee Wee Reese's birthday, 1955, at Ebbets Field. 35,000 fans sang Happy Birthday by candlelight. $20,000 in gifts. Brooklyn's love for Reese was absolute.",
    },
    {
      title: "The Final Ground Ball",
      type: "Game Action",
      text: "Your team has waited decades for this moment. The opposing batter hits a ground ball to your captain at shortstop. He fields it cleanly, throws to first. The out is recorded. The championship is won. The captain finished it.",
      origin: "1955 World Series, Game 7. Reese fielded the final ground ball and threw to Gil Hodges. Brooklyn won its only World Series. The Captain made the last play.",
    },
    {
      title: "The Double Steal",
      type: "Game Action",
      text: "Your captain and his Black teammate — the same man he put his arm around five years ago — execute a double steal in the World Series. Both score on a passed ball. The partnership that changed America is still changing games.",
      origin: "1952 World Series, Game 3. Reese and Robinson pulled off a double steal. Both scored on a passed ball. The Reese-Robinson partnership was baseball's most important.",
    },
  ],

  art_direction: {
    face: "5'10\" 160 lbs, compact and wiry. Baby-faced even in his thirties — the face that made Leo Durocher think he was sixteen. Warm eyes, open expression, the face of a man you'd trust instinctively. Not physically imposing — his authority came from character, not size. The Little Colonel.",
    attire: "Brooklyn Dodgers home whites, 1949 style. Number 1. Classic postwar flannel, 'Dodgers' script across the chest. Right-handed batter — compact, disciplined swing, more about getting on base than driving the ball. Or: fielding position at shortstop, glove down, ready.",
    mood: "Quiet moral courage. The moment at Cincinnati — Reese walking across the diamond toward Robinson, arm extending. Or: the moment at Ebbets Field — 35,000 candles lit in the dark, singing Happy Birthday to their captain. The card should radiate warmth, decency, and steadiness.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Ebbets Field — the intimate cathedral of Brooklyn baseball. The card should feel like the heartbeat of a team and a borough. Not flashy, not dominant — essential. The person without whom everything falls apart.",
    reference: "Think the moral center of baseball. Reese wasn't the best hitter, the best fielder, or the fastest runner on his team. He was the most important person in the clubhouse. The card should convey that intangible quality: the man who makes everyone around him better, braver, and more unified.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function PeeWeeReeseCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, SS fielding stance, Dodgers #1, Ebbets Field]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — LED NL WITH 132 RUNS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR R", val: d.real_stats.career_runs },{ label: "CAR BB", val: d.real_stats.career_bb },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 16 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1984", "⭐ 10× All-Star", "🏆 1955 WS Champ", "🏁 7 NL Pennants", "👑 Team Captain", "🤝 Robinson's Friend", "📊 66.4 Career WAR", "#️⃣ #1 Retired"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Reese's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Hitter Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Standard hitter engine: CON/POW/SPD/DEF/CLU.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Reese's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
