import { useState } from "react";

const HERMAN_DATA = {
  name: "Billy Herman",
  nickname: "The Hit-and-Run King",
  year: 1935,
  team: "Chicago Cubs",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "2B",
  bats: "R",
  throws: "R",
  height: "5'11\"",
  weight: "180 lbs",
  born: "July 7, 1909 — New Albany, Indiana (named after William Jennings Bryan, three-time presidential candidate)",
  died: "September 5, 1992 — West Palm Beach, Florida (age 83, cancer)",
  hof: "Inducted 1975 (Veterans Committee). 10× All-Star (1934-43). .304 career BA. 2,345 hits. 486 career doubles. NL records for 2B putouts. 4× NL pennant (1932, 1935, 1938, 1941). Bob Feller Act of Valor Award (Navy WWII).",

  real_stats: {
    season: 1935, games: 154, at_bats: 666, batting_avg: ".341",
    hits: 227, doubles: 57, triples: 6, home_runs: 7,
    rbi: 83, runs: 113, stolen_bases: 2, walks: 42,
    strikeouts: 37, slg: ".476", obp: ".385", ops: ".861",
    ops_plus: 119, war: 6.4,
    career_avg: ".304", career_hr: 47, career_rbi: 839,
    career_hits: 2345, career_war: 54.6,
    career_doubles: 486, career_runs: 1163,
  },

  ilb_stats: {
    ovr: 8,      // All-Star — HOF. 10× All-Star. .304 career BA. 54.6 career WAR. 2,345 hits. Premier NL 2B for a decade. 4 pennants. But: 0-4 in WS. OPS+ 119 in peak year (good, not elite). Veterans Committee election (not BBWAA). OVR 8.
    con: 4,      // .341 BA in 1935. 227 hits (led NL). .304 career BA. 2,345 career hits. 486 career 2B. Only 428 career K. Hit-and-run master. "As great a hit-and-run batter as I have ever seen." But: .341 in 1935 NL was good (NL avg ~.280s), not transcendent. OPS+ 119. CON 4.
    pow: 0,      // 7 HR in 1935. 47 career HR. .476 SLG. Not a power hitter at all. He was a doubles machine (57 2B in 1935 — NL 2B record) but generated no over-the-fence power. POW 0.
    spd: 0,      // 2 SB in 1935. 67 career SB. 6 triples. Not a basestealer or speed guy. His value was contact, doubles, and defense. SPD 0.
    def: 2,      // NL record for putouts by 2B in a season (466 in 1933). Led NL in putouts 7 times, assists 3 times. Formed elite double-play combo with Billy Jurges. "Quick reflexes, strong arm, uncanny ability to turn double plays." DEF 2.
    clu: 0,      // 4 World Series appearances: 1932, 1935, 1938, 1941. Lost ALL FOUR. 0-12 in WS games vs Yankees. Hit .333 in 1935 WS (respectable) but team lost. Never won a championship as a player. The ultimate pennant-winner who couldn't win the big one. CLU 0.
  },
  
  stat_justification: {
    con: ".341 BA in 1935 — career high. Led NL with 227 hits and 57 doubles. .304 career BA. 2,345 career hits. 486 career doubles. Only 428 career K in 7,707 PA. 'As great a hit-and-run batter as I have ever seen.' Exceptional bunting ability. But: OPS+ of 119 in 1935 indicates the batting average was good-not-great in context. He was a contact-first, line-drive hitter without much else. Rating of 4.",
    pow: "7 HR in 1935. 47 career HR in 15 seasons. .476 SLG. Herman was a doubles machine (57 2B in 1935, 486 career), not a power hitter. The doubles came from line drives into gaps, not over fences. No SLG bonus. Rating of 0.",
    spd: "2 SB in 1935. 67 career SB. 6 triples in 1935 (82 career). Not fast. His baserunning value came from the hit-and-run, not raw speed. He was a smart runner, not a fast one. Rating of 0.",
    def: "NL record for putouts by 2B in a season (466 in 1933 — still standing). Led NL 2B in putouts 7 times, assists 3 times. Formed elite DP combo with Billy Jurges. 'Quick reflexes, strong arm, uncanny ability to turn double plays.' .968 career fielding pct. Rating of 2 — excellent 2B defense.",
    clu: "4 World Series: 1932 (lost to Yankees), 1935 (lost to Tigers — .333 BA), 1938 (lost to Yankees), 1941 (lost to Yankees). 0-4 in the Fall Classic. 1-12 lifetime in WS games vs. Yankees. He played well (.333 in 1935), but his teams always lost. Never won a ring as a player (though he coached the 1955 champion Dodgers). Rating of 0 — the anti-clutch narrative is unavoidable.",
  },

  personality: {
    leadership_style: "The Professional. Herman was the consummate pro — showed up, played hard, hit .304, fielded beautifully, and never complained. 'Baseball was always kind of a struggle for me. I guess maybe I was doing all right and didn't realize it.' He didn't see himself as a star. He saw himself as a worker. That humility made him beloved by teammates and frustrating to front offices who didn't appreciate him until he was gone.",
    temperament: "Hard-nosed, quiet, self-deprecating. Named after William Jennings Bryan — a political orator — but Herman was the opposite: understated, private, steady. He was considered 'hard-nosed' in an era of hard-nosed managers (Hornsby, Grimm, Hartnett, Durocher). He outlasted all of them by simply being consistent. His first MLB at-bat set the tone: he chopped a ball into the plate that bounced up and hit him in the back of the head. He stayed in the game.",
    work_ethic: "Relentless. Started as a 17-year-old in the minors (1928). Played through the Depression, three WS losses, a trade away from the Cubs, and WWII Navy service (1944-45). Played baseball on Pacific islands during the war — Eniwetok, Kwajelein, Saipan, Guam, Philippines. Returned at 37 and kept playing. Spent over 50 years in professional baseball — player, manager, coach, scout. From age 17 to age 70.",
    lifestyle: "Small-town Indiana kid who became a Chicago institution. Born in New Albany, IN. Played for the Cubs 1931-41 — the heart of the franchise during the Depression. After playing: managed the Pirates (badly), coached the Dodgers (1955 WS championship as coach), managed the Red Sox (128-182), coached the Angels, scouted for Oakland. Moved to Palm Beach Gardens, FL in 1968. Died of cancer in 1992.",
    era_adaptability: "MODERATE-HIGH. Herman's skill set — elite contact, elite defense at 2B, hit-and-run mastery, bunting — translates well. The .304 BA and plate discipline play. The defense at 2B is timeless. But: 47 career HR is a problem in modern baseball. He'd be a .285/5 HR 2B with Gold Glove defense — valuable but not a star. Think a right-handed version of DJ LeMahieu with better defense.",
    clubhouse_impact: "STRONG POSITIVE. Herman was respected by hard-nosed managers (Hornsby, Durocher) and beloved by teammates. He was passed over for Cubs manager twice (Hartnett in 1938, Wilson later) — disappointing but he never caused problems. When traded to Brooklyn, he immediately helped them win a pennant. When he managed the Pirates, he inherited a gutted roster and handled it with grace: 'They've gone and traded the whole team on me.'",
    dark_side: "Oh-for-October. Four World Series. Four losses. 0-12 in WS games vs. the Yankees. The 1932 Cubs were swept (the 'Called Shot' series). The 1935 Cubs lost to the Tigers in 6. The 1938 Cubs were swept by the Yankees again. The 1941 Dodgers lost to the Yankees in 5. Herman hit .333 in 1935 and played well, but it didn't matter. He is the greatest player of his era who never won a World Series. The ring that never came. As a coach, he finally got one — the 1955 Dodgers. But by then it was someone else's championship.",
  },

  chemistry_traits: [
    { tag: "Hit-and-Run Master", desc: "'The greatest hit-and-run batter I have ever seen.' When the hit-and-run is called, Herman has 85% success rate — doubles into the hole vacated by the moving infielder. +1 CON on hit-and-run plays specifically." },
    { tag: "Doubles Machine", desc: "57 2B in 1935 — NL record for a second baseman. 486 career 2B. Herman converts 25% of singles into doubles through gap-hitting. Line drives find the alleys." },
    { tag: "The Eternal Runner-Up", desc: "0-4 in World Series. Passed over for manager twice. Traded despite being the team's best player. -1 CLU permanently. Fate conspires against Herman in the biggest moments." },
    { tag: "Infield General", desc: "When paired with an elite SS (Billy Jurges, Pee Wee Reese), the double-play combination gets +1 DEF to both players. Herman-Jurges was one of the best DP combos of the 1930s." },
    { tag: "Navy Veteran", desc: "Served 1944-45. Played baseball on Pacific islands (Eniwetok, Kwajelein, Saipan, Guam, Philippines). Bob Feller Act of Valor Award recipient. +1 team morale from respect. After return: -1 CON for 1 season (rust)." },
    { tag: "The First At-Bat", desc: "Herman's first MLB at-bat: he chopped a ball into the plate that bounced up and hit him in the back of the head. He stayed in the game. +1 toughness. 5% chance per career of a comically unlucky debut." },
    { tag: "Baseball Was Always a Struggle", desc: "Herman never saw himself as a star. .304 career BA, 2,345 hits, 10× All-Star, HOF — and he thought he was struggling. Self-deprecation prevents ego problems but also prevents self-advocacy. Will not demand a raise or higher lineup spot." },
    { tag: "Fifty-Year Man", desc: "Player (1928-47), manager, coach, scout (through 1979). Age 17 to age 70 in professional baseball. +2 franchise longevity. Herman never leaves the game. The game eventually leaves him." },
  ],

  preferred_locations: [
    { location: "Wrigley Field / Chicago", affinity: "HIGH", note: "10 seasons (1931-41). 3 pennants. The heart of the franchise during the Depression." },
    { location: "Second Base", affinity: "HIGH", note: "NL record 466 putouts (1933). Led NL putouts 7×, assists 3×. Elite double-play pivot." },
    { location: "Batter's Box (right side)", affinity: "HIGH", note: "'Nobody could handle the inside pitch to right field better.' Hit-and-run master." },
    { location: "Ebbets Field / Brooklyn", affinity: "MEDIUM", note: "Traded to Dodgers 1941. Won pennant immediately. 3 good seasons before Navy." },
    { location: "Pacific Theater (WWII)", affinity: "MEDIUM", note: "Navy service 1944-45. Played baseball on Eniwetok, Kwajelein, Saipan, Guam, Philippines." },
    { location: "World Series", affinity: "LOW", note: "0-4. 1-12 in WS games vs Yankees. .333 in 1935 (still lost). The ring never came." },
    { location: "Manager's Office", affinity: "LOW", note: "Pirates 1947 (92 losses). Red Sox 1965-66 (128-182). 'They traded the whole team on me.'" },
  ],

  momentum: {
    hot_triggers: [
      "Hit-and-run situations — Herman was the best in baseball at executing this play.",
      "Doubles — 57 in 1935. Line drives find gaps when his swing is grooved.",
      "Elite SS partner — with Jurges or Reese, the DP combo was devastating.",
      "Regular season — .304 career BA. He was money from April to September.",
    ],
    cold_triggers: [
      "World Series — 0-4. The October curse was real and persistent.",
      "Managerial situations — passed over, then given bad rosters when finally hired.",
      "Trade displacement — leaving Chicago hurt him emotionally.",
      "Post-war rust — returning from Navy service, his swing was never quite the same.",
    ],
    pressure_response: "REGULAR SEASON EXCELLENT, OCTOBER CURSED. .304 career BA. 10 consecutive All-Star selections. 4 NL pennants. But 0-4 in the World Series. He hit .333 in the 1935 WS — the team still lost. He went 1-12 lifetime in WS games vs. the Yankees. The individual performance was often good; the team result was always bad. The WS losses weren't Herman's fault, but they define his legacy's missing piece. He finally got a ring as a coach — the 1955 Dodgers, 20 years after his first WS loss.",
  },

  action_card_seeds: [
    {
      title: "The Perfect Hit-and-Run",
      type: "Game Action",
      text: "Runner goes on the pitch. The shortstop breaks to cover second. Your second baseman punches the ball through the exact hole the shortstop just vacated. Runner goes first to third. 'The greatest hit-and-run batter I have ever seen.'",
      origin: "Herman was universally regarded as the best hit-and-run batter of his era. He could consistently drive the ball through the hole created by the moving middle infielder.",
    },
    {
      title: "Fifty-Seven Doubles",
      type: "Game Action",
      text: "Your second baseman hits 57 doubles in a season — a National League record for the position. Line drives into the left-center gap, the right-center gap, down the lines. He doesn't hit home runs. He doesn't need to. The gaps are his kingdom.",
      origin: "1935: Herman's 57 doubles set the NL record for second basemen. He led the NL in both hits (227) and doubles.",
    },
    {
      title: "The Ball Bounces Off the Plate Into His Head",
      type: "Action",
      text: "Your rookie's first MLB at-bat. He chops a pitch into the back of home plate. The ball bounces straight up, hits him in the back of the head, and rolls away. He stays in the game. This is the beginning of a Hall of Fame career.",
      origin: "Herman's first at-bat vs. Reds pitcher Si Johnson: he chopped the ball into the plate, it bounced up and hit him in the back of the head. He stayed in the game.",
    },
    {
      title: "Oh-for-October",
      type: "Drama",
      text: "Your team wins the pennant. You go to the World Series. You lose. You win another pennant. You lose the World Series again. You do it a third time. A fourth. Four pennants, four losses. You hit .333 in one of them. Doesn't matter. The ring never comes.",
      origin: "Herman went 0-4 in World Series (1932, 1935, 1938, 1941). Hit .333 in 1935 WS. 1-12 in WS games vs Yankees.",
    },
    {
      title: "They Traded the Whole Team on Me",
      type: "Drama",
      text: "You're named player-manager. You're excited until you learn the cost: the franchise traded its MVP-caliber third baseman to acquire you. 'Why, they've gone and traded the whole team on me.' The third baseman wins MVP for the other team. Your team loses 92 games.",
      origin: "1946: Pirates traded Bob Elliott (who won 1947 NL MVP for Boston) to acquire Herman as player-manager. Herman's 1947 Pirates went 62-92.",
    },
    {
      title: "Baseball on Pacific Islands",
      type: "Action",
      text: "The war takes your second baseman. The Navy sends him to the Pacific. He plays baseball on islands whose names nobody can pronounce — Eniwetok, Kwajelein, Saipan, Guam. He wins the Navy World Series in Hawaii. Then he comes home and tries to remember how to hit a curveball.",
      origin: "1944-45: Herman served in the Navy, playing baseball on Pacific islands. He won the wartime Navy World Series in Hawaii in September 1945.",
    },
    {
      title: "Passed Over — Twice",
      type: "Drama",
      text: "Your second baseman is the smartest player on the team. Everyone knows he should manage. The job opens. They give it to someone else. The job opens again. Someone else again. He never complains. He just keeps hitting .304.",
      origin: "Herman was passed over for Cubs manager in favor of Gabby Hartnett (1938) and Jimmy Wilson (1940). He was 'disappointed but did not show it outwardly.'",
    },
    {
      title: "The 1955 Ring — As a Coach",
      type: "Action",
      text: "Twenty years after your first World Series loss, you finally get a championship ring. You're not playing. You're coaching third base. Someone else's team, someone else's moment. But you're there. The ring fits. It just came 20 years late.",
      origin: "Herman coached the 1955 Brooklyn Dodgers to their first WS championship — 20 years after his first WS loss with the 1935 Cubs.",
    },
  ],

  art_direction: {
    face: "Solid, workmanlike, Midwestern face. 5'11\" 180 lbs. Not flashy. The face of a man who hits .304 and doesn't realize he's doing well. Quiet determination. A touch of self-deprecation in the eyes.",
    attire: "Chicago Cubs 1935 home whites with the classic 'C' on the chest. Wrigley Field's ivy-covered walls behind him (ivy was planted in 1937, but artistic license for the iconic look). Modest, clean uniform — Herman was a craftsman, not a showman.",
    mood: "The hit-and-run. Herman at the plate, the runner breaking from first, the shortstop moving — and Herman's bat finding the exact gap. Or: the double-play pivot, turning two with Jurges. The card should feel precise, professional, dependable. Like a Swiss watch that hits .341.",
    style: "Chicago Depression-era palette. Wrigley Field brick and ivy. Warm but muted — browns, brick reds, ivy greens. The card should feel like a worker's card — respected, reliable, unglamorous. The steady hand in a turbulent decade.",
    reference: "The card of the man who thought baseball was a struggle while hitting .304 for 15 years. 10 All-Star Games. 4 pennants. 0 championships. Named after William Jennings Bryan — three-time presidential candidate who also never won the big one. Billy Herman: the forever runner-up.",
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

export default function BillyHermanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HERMAN_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Hit-and-run swing, inside pitch driven to right, Cubs whites, Wrigley Field, 1930s Depression-era palette]</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1935 — 227 H / 57 2B (NL 2B RECORD) — LED NL HITS & DOUBLES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛 HOF 1975", "⭐ 10× All-Star", "📊 .304 Career BA", "💎 2,345 Career Hits", "🔥 486 Career 2B", "🧤 NL Record 466 PO (2B)", "⚓ Navy WWII Veteran"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Herman's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Herman's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
