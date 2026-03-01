import { useState } from "react";

const TERRY_DATA = {
  name: "Bill Terry",
  nickname: "Memphis Bill",
  year: 1930,
  team: "New York Giants",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "L",
  throws: "L",
  height: "6'1\"",
  weight: "200 lbs",
  born: "October 30, 1898 — Atlanta, Georgia (unhappy household, parents divorced 1915, moved 7 times by age 12, never attended high school)",
  died: "January 9, 1989 — Jacksonville, Florida (age 90, natural causes, net worth ~$30 million)",
  hof: "Inducted 1954 (BBWAA, 77.4%). Last NL .400 hitter. 3× NL pennant as manager. 1933 WS champion. Giants retired #3. #59 on Sporting News 100 Greatest.",

  real_stats: {
    season: 1930, games: 154, at_bats: 633, batting_avg: ".401",
    hits: 254, doubles: 43, triples: 15, home_runs: 23,
    rbi: 129, runs: 139, stolen_bases: 8, walks: 57,
    strikeouts: 33, slg: ".619", obp: ".452", ops: "1.071",
    ops_plus: 178, total_bases: 392, war: 7.9,
    career_avg: ".341", career_hr: 154, career_rbi: 1078,
    career_hits: 2193, career_war: 53.4,
  },

  ilb_stats: {
    ovr: 9,      // Elite/MVP — .341 career BA (highest by LH hitter in NL history). 53.4 career WAR. HOF. Player-manager who won 1933 WS. 9 consecutive .320+ seasons.
    con: 5,      // .401 BA. 254 hits (tied NL record). 9 consecutive seasons .320+. From July 8 to Sep 3, 1930: .446. OPS+ 178. Never went more than 2 days without a hit in 1930. Absolute maximum contact.
    pow: 2,      // 23 HR, .619 SLG in 1930. 154 career HR. Terry hit line drives to center/left-center, NOT pull-power. Contemporaries felt he'd have hit 30+ if he pulled. McGraw made him hit opposite field. POW 2 — gap power, not over-the-fence power.
    spd: 1,      // 8 SB in 1930. 15 triples. 56 career SB. Not fast, but smart baserunner. Hit a 462-foot triple at the Polo Grounds. SPD 1.
    def: 2,      // .992 career fielding percentage. Best fielding 1B of his era. Led NL 1B in putouts and assists in 1930. Gold Glove caliber before the award existed. DEF 2.
    clu: 2,      // .429 in 1924 WS (HR off Walter Johnson). Won 1933 WS as player-manager (.322 BA that season). Lost 1936 and 1937 WS to Yankees. 3 pennants as manager. Performed in October. CLU 2.
  },
  
  stat_justification: {
    con: ".401 BA in 1930 — the last National Leaguer to hit .400. Only Ted Williams has done it since. 254 hits (tied NL record with Lefty O'Doul). From July 8 to September 3: .446. Hit safely in 135 of 154 games. Never went more than 2 games without a hit. Nine consecutive seasons hitting .320+. Career .341 BA — highest ever by a LH NL hitter. OPS+ 178 in 1930. Six seasons of 200+ hits. Rating of 5 — the ceiling.",
    pow: "23 HR in 1930. .619 SLG. 154 career HR. Terry was a line-drive hitter who smashed balls to left-center and center, not a pull hitter. Contemporaries believed he could've hit 30+ HR annually if he'd pulled toward the Polo Grounds' short right-field line (258 feet), but McGraw made him hit the opposite way. Three 20-HR seasons. Gap power, not fence-clearing power. Rating of 2.",
    spd: "8 SB in 1930. 15 triples (led NL in triples in 1931 with 20). 56 career SB. Not a speedster but a smart, aggressive baserunner. Hit a 462-foot triple to the Polo Grounds centerfield clubhouse. Rating of 1.",
    def: ".992 career fielding percentage at 1B — best of his era. Led NL first basemen in putouts and assists in 1930. Described as the best-fielding first baseman of his generation. Excellent footwork, soft hands, and superior range for a 1B. Rating of 2.",
    clu: ".429 in the 1924 World Series including a HR off Walter Johnson in Game 1. Won the 1933 World Series as player-manager (.322 BA that season, beat the Senators in 5 games). Won 3 NL pennants as manager (1933, 1936, 1937). Lost 1936 and 1937 WS to the Yankees. Overall: strong October performer, proven winner. Rating of 2.",
  },

  personality: {
    leadership_style: "The Executive. Terry was a businessman first and a ballplayer second. He held out every spring, telling the Giants 'Pay me or trade me.' He negotiated from a position of strength because he didn't need baseball — he'd been financially successful in Memphis real estate since his 20s. When McGraw offered him the managerial job in 1932, it was the first conversation between them in nearly two years. Terry accepted on his own terms. He ran the Giants like a corporation: efficient, professional, results-oriented.",
    temperament: "Cold, confident, calculating. Terry never attended high school. He was working in a railroad yard at 12, pitching professionally at 16. His parents' divorce hardened him early. He had a frosty relationship with John McGraw — the greatest manager in baseball — and defied him at every opportunity. He was equally cold with sportswriters, which delayed his HOF election for years. But his players respected him because he was fair, competent, and he won.",
    work_ethic: "Relentless self-improvement. Terry started as a left-handed pitcher, went 47-33 in the minors including a no-hitter at age 16, then reinvented himself as a first baseman when his pitching proved only mediocre at higher levels. He became the best-fielding 1B of his era AND the best contact hitter in the NL. He played every game in 1930. He managed while playing. He ran a team, played 1B, and hit .322 in the same season (1933 WS year). The work ethic of a man who'd been supporting himself since childhood.",
    lifestyle: "The self-made tycoon. Born into an unhappy family (7 homes by age 12, parents' divorce). Never attended high school. Worked railroad yards, Standard Oil in Memphis, bought and rented properties in his 20s. After baseball: cotton trader, oil speculator, Buick car dealership in Jacksonville, president of the South Atlantic League. Died in 1989 at age 90 with a net worth near $30 million. The most financially successful pre-WWII baseball player.",
    era_adaptability: "HIGH. Terry's .341 career BA represents genuine elite contact hitting even after era adjustment (OPS+ 178 in 1930). His line-drive approach — up the middle and to left-center — would work in any era. His defensive excellence at 1B would translate perfectly. His lack of pull-power would limit his HR totals in modern baseball (probably 15-20 HR), but his average and OBP would make him an elite leadoff or #2 hitter. His managerial intelligence would also translate.",
    clubhouse_impact: "PROFESSIONAL AND DISTANT. Terry was respected but not beloved. He ran a tight ship as manager — 3 pennants in 10 seasons, only 2 losing years. Players knew where they stood. Sportswriters hated him because he was arrogant and dismissive. His famous 'Is Brooklyn still in the league?' quip in 1934 (mocking the Dodgers) backfired spectacularly when Brooklyn beat the Giants in the final series to cost them the pennant. The press never forgave him. His HOF election was delayed by at least a decade because of his relationship with the media.",
    dark_side: "The arrogance. Terry's confidence was his greatest asset and his most alienating quality. He dismissed sportswriters, feuded with McGraw, and mocked rival teams publicly. 'Is Brooklyn still in the league?' became the most famous insult in baseball history — and it cost him a pennant. His cold personality delayed his HOF election by years. He was also absent from his children's lives during his playing career, a common failing of the era but one that weighed on him. The emotional distance that made him a great businessman made him a difficult human being.",
  },

  chemistry_traits: [
    { tag: "The Last .400 Hitter (NL)", desc: "Terry's .401 in 1930 is the last .400 season in NL history. If Terry's BA exceeds .390 at the All-Star break, he enters '.400 Watch' mode: +2 media attention, +1 CON from focus, but 10% chance of late-season slump from pressure." },
    { tag: "The Executive", desc: "Terry can serve as player-manager. When managing: +1 to all teammates' DEF (organizational excellence). But -1 to own batting stats from the dual burden." },
    { tag: "Pay Me or Trade Me", desc: "Terry holds out every spring. 30% chance of missing 1-2 weeks of spring training. But if the holdout succeeds: +1 morale from vindication. If it fails: -1 morale, grudge against ownership." },
    { tag: "Anti-McGraw", desc: "Terry defied the greatest manager in history. When paired with an authoritarian manager: -1 team chemistry. When given autonomy: +1 all stats. He performs best when he runs himself." },
    { tag: "Line Drive Machine", desc: "Terry hits line drives to center and left-center, not pull shots. +1 CON in all parks. But no park bonus from short RF porches. The anti-Baker Bowl hitter." },
    { tag: "Is Brooklyn Still in the League?", desc: "Once per career, Terry can make a public quip mocking a rival. 50% chance: +2 team morale from swagger. 50% chance: the rival is motivated, beats Terry in the final series, costs him the pennant." },
    { tag: "Business Acumen", desc: "Terry earns 20% more salary than other players of equivalent OVR. After retirement, he becomes wealthy. +3 post-career financial security. The man who didn't need baseball." },
    { tag: "Gold Glove 1B", desc: "+1 DEF to all infielders when Terry plays 1B. .992 career fielding percentage. Best-fielding 1B of his era. Turns bad throws into outs." },
  ],

  preferred_locations: [
    { location: "Polo Grounds / New York", affinity: "HIGH", note: "Entire 14-year career with the Giants. The bathtub-shaped park with deep center (483 ft) where Terry smashed line drives. His kingdom." },
    { location: "First Base", affinity: "HIGH", note: ".992 career fielding pct. Best-fielding 1B of his era. Led NL in putouts and assists." },
    { location: "Batter's Box", affinity: "HIGH", note: ".401 in 1930. .341 career. Nine consecutive .320+ seasons. He lived in the box." },
    { location: "Manager's Office", affinity: "HIGH", note: "3 pennants, 1 WS title in 10 seasons. Ran the Giants like a corporation." },
    { location: "Memphis / Business Office", affinity: "HIGH", note: "Real estate mogul. Standard Oil employee. Cotton trader. Car dealer. $30M net worth at death." },
    { location: "Press Box / Media", affinity: "LOW", note: "Hated sportswriters. They hated him back. Delayed his HOF election by a decade." },
    { location: "Brooklyn", affinity: "LOW", note: "'Is Brooklyn still in the league?' The quip that cost him a pennant." },
  ],

  momentum: {
    hot_triggers: [
      "Summer heat — from July 8 to Sep 3, 1930: .446 BA. Terry was a warm-weather monster.",
      "Contract satisfaction — after successful holdouts, Terry played his best.",
      "Managerial control — when running the team himself, his play and leadership aligned.",
      "Line drives finding gaps — when the BABIP gods align, Terry's contact becomes unstoppable.",
    ],
    cold_triggers: [
      "Media conflict — sportswriter feuds distracted him and poisoned his reputation.",
      "Authoritarian managers — McGraw's control style suppressed Terry's natural game.",
      "Brooklyn — the Dodgers became his kryptonite after the 1934 quip.",
      "Late career knee problems — forced him out of daily play by 1936.",
    ],
    pressure_response: "PROVEN WINNER. .429 in the 1924 WS (HR off Walter Johnson). Won the 1933 WS as player-manager — the first Giants championship since 1922. Led Giants to 3 pennants in 5 years (1933, 1936, 1937). Lost the 1936 and 1937 WS to the Yankees, but competed. Terry performed well when it mattered, with one glaring exception: the 1934 collapse, when Brooklyn — motivated by his 'Is Brooklyn still in the league?' mockery — beat the Giants in the final series to hand the pennant to St. Louis. The lesson: never give your enemies motivation.",
  },

  action_card_seeds: [
    {
      title: "The Last .400 Season in the National League",
      type: "Game Action",
      text: "Your first baseman hits .401 with 254 hits. No National Leaguer will ever do this again. From July to September he bats .446. He never goes more than two games without a hit. He plays every game. The NL bats .303 as a whole — and he's still 100 points above the league.",
      origin: "1930: Terry hit .401 with 254 hits (tied NL record). OPS+ 178. The last NL .400 season. Only Ted Williams (.406 in 1941) has done it since in either league.",
    },
    {
      title: "Is Brooklyn Still in the League?",
      type: "Drama",
      text: "Before the season, a reporter asks your manager about the rival team. He smirks: 'Are they still in the league?' The quip makes headlines. The rival team pins it to their bulletin board. In the final series of the season — with the pennant on the line — the rival beats you. The pennant goes to a third team. Your words become the most famous insult in baseball history.",
      origin: "January 1934: Terry, asked about Brooklyn's chances, quipped 'Is Brooklyn still in the league?' The Dodgers beat the Giants in the final 2 games to hand the pennant to the Cardinals.",
    },
    {
      title: "Pay Me or Trade Me",
      type: "Drama",
      text: "Your best player refuses to sign. Every spring, the same ultimatum from Memphis: 'Pay me what I'm worth or trade me.' He doesn't need baseball. He has real estate. He has investments. He knows exactly what he's worth. The holdout lasts weeks. He always wins.",
      origin: "Terry held out virtually every spring of his career. He told McGraw at their first meeting that he knew his worth and didn't need baseball. He was right — he died worth $30 million.",
    },
    {
      title: "The Teenager Who Pitched a No-Hitter",
      type: "Action",
      text: "Before your player was a .400-hitting first baseman, he was a 16-year-old left-handed pitcher in the Georgia-Alabama League. He threw a no-hitter. He went 7-1 with 4 shutouts. Then he reinvented himself entirely.",
      origin: "1915: Terry debuted as a pitcher at 16 for the Newnan Cowetas. Threw a no-hitter vs. Anniston. Went 7-1 with 4 shutouts in 8 complete games. Eventually converted to 1B when his pitching plateaued.",
    },
    {
      title: "Succeeding the Little Napoleon",
      type: "Drama",
      text: "The greatest manager in baseball history offers you his job. It's the first conversation you've had in two years. You accept — on your terms. The next year, you win the World Series. You manage for a decade: 3 pennants, 1 championship. You run the team like a business. It works.",
      origin: "1932: McGraw offered Terry the Giants managerial job after years of silence between them. Terry won the 1933 WS in his first full season as manager. Led Giants to 3 pennants in 10 seasons.",
    },
    {
      title: "The 462-Foot Triple",
      type: "Game Action",
      text: "Your first baseman launches a drive to the deepest part of the Polo Grounds — 462 feet to the centerfield clubhouse. It's a triple. Not a home run. A triple. The park is that deep. He rounds second like a man who's been running since age 12.",
      origin: "May 10, 1925: Terry hit a 462-foot triple to the Polo Grounds centerfield clubhouse. The Polo Grounds' center field was 483 feet.",
    },
    {
      title: "Home Run Off Walter Johnson, Game 1",
      type: "Game Action",
      text: "Your backup first baseman — barely in the lineup — homers off the greatest pitcher in history in Game 1 of the World Series. He hits .429 for the Series. The Giants lose in 7, but your player announces himself. He will be a star.",
      origin: "1924 WS: Terry, still a part-timer, hit .429 including a Game 1 HR off Walter Johnson. The Giants lost in 7 games to the Senators.",
    },
    {
      title: "The $30 Million Man",
      type: "Action",
      text: "After retirement, your player becomes a cotton trader, oil speculator, car dealer, and minor league owner. He dies at 90 with a net worth near $30 million. He was always a businessman who played baseball — not a ballplayer who tried business. The financial independence that made him impossible to manage also made him impossible to break.",
      origin: "Terry: real estate in his 20s, Standard Oil, cotton trading, Buick dealership in Jacksonville, Sally League president. Died January 9, 1989, age 90, worth ~$30M.",
    },
  ],

  art_direction: {
    face: "Tall, handsome, composed. 6'1\" 200 lbs — imposing for his era. Nicknamed 'Smiling Bill' but the smile never reached his eyes. A face of supreme confidence — the face of a man who told John McGraw to pay him or trade him, and meant it. Clean-shaven, sharp-featured, Southern.",
    attire: "New York Giants 1930 home whites with the classic 'NY' interlocked. Number 3 on the back. The Polo Grounds' distinctive horseshoe shape visible behind him. The uniform should look immaculate — Terry was a meticulous man.",
    mood: "Effortless contact. The left-handed swing, compact and level, driving a line drive into the gap in left-center. Not a violent swing — a surgical one. Or: the stretch at first base, picking a low throw out of the dirt, .992 fielding perfection. This card should feel controlled and precise. No wasted motion.",
    style: "New York sophistication. Art Deco influence. The Polo Grounds at twilight. The card should feel expensive — like the man himself. Grays and golds. The Giants' classic palette. A subtle briefcase or business ledger ghosted behind the baseball imagery — because Terry was always both a ballplayer and a businessman.",
    reference: "The card of the last NL .400 hitter. The player-manager who won a World Series. The man who defied McGraw, mocked Brooklyn, and died richer than any of them. Memphis Bill — the executive who happened to play baseball.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG ≥ .600 → +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples ≥ 10 → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CON×2 + POW×2 + SPD×1 + DEF×1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
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

export default function BillTerryCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = TERRY_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Level LH swing, Giants whites #3, Polo Grounds horseshoe, Art Deco, line drive to left-center, composed]</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "2B", val: d.real_stats.doubles },{ label: "R", val: d.real_stats.runs },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — LAST NL .400 HITTER — .401 BA / 254 HITS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1933 WS Champion", "👑 Last NL .400 Hitter", "⭐ 3× NL Pennant (Mgr)", "💎 .341 Career BA", "📊 53.4 Career WAR", "🎯 .992 Fielding Pct", "🏛 HOF 1954"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Terry's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Terry's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
