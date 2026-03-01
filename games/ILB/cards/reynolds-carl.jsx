import { useState } from "react";

const REYNOLDS_DATA = {
  name: "Carl Reynolds",
  nickname: "The Texas Triple Machine",
  year: 1930,
  team: "Chicago White Sox",
  league: "American League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "CF/RF",
  bats: "R",
  throws: "R",
  height: "6'0\"",
  weight: "194 lbs",
  born: "February 1, 1903 — LaRue, Texas (attended Southwestern University in Georgetown, TX; multi-sport star — baseball, football, basketball, track; Phi Delta Theta fraternity)",
  died: "May 29, 1978 — Houston, Texas (age 75, extended illness; Houston Methodist Hospital)",
  hof: "Not inducted. .302 career BA. 1,357 hits. 80 HR. 699 RBI. 107 career triples. 6× .300 seasons. First player to hit 3 HR in the first 3 innings of a game (July 2, 1930, 2 inside-the-park). Texas Sports HOF 1971.",

  real_stats: {
    season: 1930, games: 138, at_bats: 563, batting_avg: ".359",
    hits: 202, doubles: 25, triples: 18, home_runs: 22,
    rbi: 104, runs: 103, stolen_bases: 16, walks: 36,
    strikeouts: 42, slg: ".584", obp: ".399", ops: ".983",
    ops_plus: 139, war: 5.7,
    career_avg: ".302", career_hr: 80, career_rbi: 699,
    career_hits: 1357, career_war: 20.3,
    career_triples: 107,
  },

  ilb_stats: {
    ovr: 6,      // Solid Starter — .359/22/104 in 1930 is strong but it was the Year of the Hitter (AL BA was .288). 139 OPS+ adjusts that down. 20.3 career WAR over 13 seasons. Never an All-Star. .302 career BA is solid. 5 teams in 13 years — a journeyman, not a franchise player. OVR 6.
    con: 4,      // .359 BA in 1930. 202 hits. .302 career BA. 6× .300 seasons. Hit .300+ consistently — a professional hitter. Only 42 K in 563 AB. An umpire noted his "I'm-here-to-knock-it-down-your-throat look." CON 4.
    pow: 2,      // 22 HR in 1930. .584 SLG. 80 career HR. The power was real but not elite — he was a line-drive hitter who could hit for extra bases but wasn't a true slugger. SLG bonus doesn't apply (.584 < .600). POW 2.
    spd: 2,      // 16 SB in 1930. 18 triples (2nd in AL). 107 career triples. "Fleet of foot for a heavy-set player." The triples show real speed — 2 inside-the-park HR in one game. Triples bonus → SPD 2.
    def: 1,      // .970 fielding percentage. "Good throwing arm." "An outfielder in the making who knows a lot about fly-catching." Played all 3 OF positions, suited to RF. Solid, not spectacular. DEF 1.
    clu: 0,      // 1938 WS with Cubs: 0 hits in 13 PA (0-for-12 with 1 BB). Cubs swept by Yankees. No postseason heroics. CLU 0.
  },
  
  stat_justification: {
    con: ".359 BA in 1930. 202 hits. .302 career BA. 6× .300+ seasons. Only 42 K in 563 AB. Umpire George Moriarty: 'He steps to the plate with that I'm-here-to-knock-it-down-your-throat look at the pitchers.' A professional hitter who made consistent hard contact. Rating of 4.",
    pow: "22 HR in 1930. .584 SLG. 80 career HR. He was a line-drive hitter with gap power and enough pop for 20+ HR in the live-ball era. But not a true power hitter — most of his value came from doubles and triples, not bombs. SLG .584 (no bonus). Rating of 2.",
    spd: "16 SB in 1930. 18 triples (2nd in AL). 107 career triples. 2 inside-the-park HR on July 2, 1930 (at Yankee Stadium — those outfield gaps were massive). 'Fleet of foot for a heavy-set player.' 32 SB in minor league debut (led Lone Star League). Triples bonus → SPD 2.",
    def: ".970 career fielding percentage. 'Good throwing arm.' Played CF, RF, LF — versatile. An umpire called him 'an outfielder in the making who knows a lot about fly-catching.' Solid defender, especially in RF. Rating of 1.",
    clu: "1938 WS with Cubs: 0-for-12 with 1 BB in 13 PA. Cubs swept by Yankees in 4 games. His only postseason appearance was a complete bust. Rating of 0.",
  },

  personality: {
    leadership_style: "The Journeyman Professional. Reynolds wasn't a star. He wasn't a leader. He was a .300 hitter who showed up, put the bat on the ball, ran hard, and moved on when the team moved on. Five teams in 13 years — White Sox, Senators, Browns, Red Sox, Cubs. He never complained, never held out (except once, briefly), and never made headlines except when Bill Dickey broke his jaw.",
    temperament: "Quiet, steady, tough. College-educated (Southwestern University — unusual for the era). Multi-sport star. Football and basketball coach before baseball. The man took a punch from Bill Dickey that broke his jaw, missed 6 weeks, and came back without complaint. He wasn't flashy, wasn't loud, wasn't memorable — except that one game at Yankee Stadium when he hit 3 HR (2 inside-the-park) in the first 3 innings.",
    work_ethic: "Late bloomer who kept grinding. Didn't debut until age 24. Spent time in Class-D ball (Palestine Pals, Lone Star League) before the majors. After being traded 4 times and relegated to the minors, hit .355 at Minneapolis at age 34 and earned one more shot with the Cubs. After baseball: returned to his farm in Wharton, Texas. Served on boards of a local bank, hospital, and Wharton County Junior College. A responsible man.",
    lifestyle: "Texas farmer and community leader. Born in LaRue, Texas. Attended Southwestern University (Georgetown, TX). Phi Delta Theta. Football/basketball coach at Lon Morris College before turning pro. Married Ruth Dayvault in 1929. Bought a farm in Wharton, Texas in 1934 — spent the rest of his life there. Son Carl Jr. played at Rice and in the Cubs' minor league system. Texas Sports HOF 1971. Died at Houston Methodist Hospital at 75.",
    era_adaptability: "MODERATE. The .302 career BA and 107 triples translate well to any era — he'd be a solid 4th outfielder or platoon player. The speed-power combination (.359/22/18 3B in 1930) would profile as a .280/15 HR center fielder with gap power in modern baseball. The defense and versatility would be valued. But he'd never be a star — always a complementary piece.",
    clubhouse_impact: "STEADY AND PROFESSIONAL. Reynolds was the kind of player every team needs: the veteran .300 hitter who fills out the lineup without causing drama. College-educated, well-mannered, community-minded. He wasn't going to start a washboard band or break a bat over his knee. He was going to hit .300, play solid defense, and go home to his farm in Wharton.",
    dark_side: "The broken jaw and the fading career. Bill Dickey's punch on July 4, 1932 broke Reynolds' jaw and sidelined him for 6 weeks. He was never quite the same after 1930 — the .359 became .290, .279, .303, .270, .276. Traded 4 times in 4 years. By 1937 he was in the American Association. He came back for one more solid year (.302 with the Cubs in 1938), but the WS was 0-for-12. The farm in Wharton was waiting, and it was a better deal than another season of being the 4th-best outfielder on a bad team.",
  },

  chemistry_traits: [
    { tag: "Three HR in Three Innings", desc: "July 2, 1930 at Yankee Stadium: 3 consecutive HR in the 1st, 2nd, and 3rd innings — 2 inside-the-park. First player in MLB history to do this. Once per career: 5% chance of a 3-HR game, with 50% of HR being inside-the-park." },
    { tag: "Dickey's Punch", desc: "July 4, 1932: Bill Dickey broke Reynolds' jaw with a punch at home plate. Dickey suspended 30 days, fined $1,000. When facing Dickey or Yankees: +1 aggression. If collision at plate occurs: 10% chance of broken jaw (6-week injury). Based on real incident." },
    { tag: "The Journeyman", desc: "5 teams in 13 years. Reynolds never stays long. After 3-4 seasons, he's traded. +1 adaptability to new teams (no adjustment period). -1 franchise loyalty." },
    { tag: "Triple Machine", desc: "18 triples in 1930 (2nd in AL). 107 career triples. 15% of doubles become triples. Reynolds runs harder than his body suggests — 'fleet of foot for a heavy-set player.'" },
    { tag: "College Man", desc: "Southwestern University graduate. Phi Delta Theta. Football/basketball coach before turning pro. +1 intelligence. Reynolds understands positioning, strategy, and fundamentals better than most." },
    { tag: "The Texas Farmer", desc: "Bought a farm in Wharton, TX in 1934. After baseball: bank board, hospital board, junior college board. +1 stability. Reynolds always has something to go back to. He plays baseball because he wants to, not because he has to." },
    { tag: "Minor League Resurrection", desc: "Relegated to American Association at age 34 — hit .355 with 218 hits. Earned callback to Cubs. If sent to minors: 40% chance of earning one more MLB season through sheer production." },
    { tag: "Year of the Hitter Context", desc: "1930 was the Year of the Hitter (AL BA: .288). Reynolds' .359 adjusts to 139 OPS+. Good, not great. Context matters — the raw numbers are inflated by the era." },
  ],

  preferred_locations: [
    { location: "Comiskey Park / Chicago", affinity: "HIGH", note: "5 seasons with White Sox. .359/22/104 in 1930. His best years." },
    { location: "Yankee Stadium", affinity: "HIGH", note: "July 2, 1930: 3 HR in 3 innings (2 inside-the-park). The gaps were massive. Reynolds filled them." },
    { location: "Wharton, Texas", affinity: "HIGH", note: "Farm purchased 1934. Home for the rest of his life. Bank board. Hospital board. Community leader." },
    { location: "Southwestern University / Georgetown, TX", affinity: "MEDIUM", note: "Multi-sport star. Phi Delta Theta. Football/basketball coach before baseball." },
    { location: "Home Plate (incoming)", affinity: "LOW", note: "July 4, 1932: Dickey broke his jaw here. Collision at home plate. 6 weeks out." },
    { location: "1938 World Series", affinity: "LOW", note: "0-for-12 with 1 BB. Cubs swept by Yankees. The worst 13 PA of his career." },
  ],

  momentum: {
    hot_triggers: [
      "Power surges — when locked in, Reynolds hits everything: HR, 3B, 2B. The gaps disappear.",
      "Inside-the-park HR energy — the speed activates. 2 in one game at Yankee Stadium.",
      "New team energy — after being traded, Reynolds hits well immediately (+1 adaptability).",
      "Minor league dominance — when sent down, he destroys the level and earns a callback.",
    ],
    cold_triggers: [
      "Post-Dickey punch — after the broken jaw, the fearlessness at the plate diminishes.",
      "Leg injuries — charley horse in 1931, fractured ankle in 1931. Injuries sap the speed.",
      "WS pressure — 0-for-12 in his only WS appearance. The big stage froze him.",
      "Career decline — after 1930, the .359 became a steady slide toward .270-.290.",
    ],
    pressure_response: "FAILED ON THE BIGGEST STAGE. 1938 WS: 0-for-12 with 1 BB in 13 PA. Cubs swept by Yankees. His only postseason appearance was a complete blank. In the regular season, Reynolds was a .302 career hitter who delivered consistently — but October was a different animal. The Texas farmer could grow anything on his land except a World Series hit.",
  },

  action_card_seeds: [
    {
      title: "Three Home Runs in Three Innings",
      type: "Game Action",
      text: "July 2, 1930. Yankee Stadium. Your outfielder hits a home run in the 1st inning — inside-the-park. He hits another in the 2nd — inside-the-park again. He hits a third in the 3rd — this one clears the fence. Three consecutive home runs in the first three innings of the game. It has never been done before in MLB history.",
      origin: "Reynolds hit 3 consecutive HR (2 inside-the-park) at Yankee Stadium on July 2, 1930 — the first player to do so in the first 3 innings.",
    },
    {
      title: "Dickey Breaks His Jaw",
      type: "Drama",
      text: "July 4, 1932. Your outfielder crashes into the Yankees catcher at home plate. It's not clear he touched the plate. His teammates yell at him to go back. The catcher, thinking he's coming back for another collision, punches him in the face. Broken jaw. Six weeks out. The catcher is suspended 30 days and fined $1,000.",
      origin: "Bill Dickey punched Reynolds at home plate on July 4, 1932, breaking his jaw. Dickey was suspended 30 days, fined $1,000.",
    },
    {
      title: "The Husband-and-Wife Scouting Team",
      type: "Action",
      text: "A husband-and-wife scouting duo comes to watch a college pitcher. Instead, they notice the opposing shortstop — he's hitting everything and running like a deer. They sign the shortstop instead. He becomes a .302 career hitter. The pitcher is forgotten.",
      origin: "Roy and Bessie Largent, a husband-wife scouting team for the White Sox, discovered Reynolds while scouting a Trinity College pitcher in 1926.",
    },
    {
      title: "The Farm in Wharton",
      type: "Drama",
      text: "Your outfielder buys a farm in Wharton, Texas in 1934. He's 31 years old and already been traded 3 times. The farm will outlast every team he plays for. After baseball: bank board, hospital board, junior college board. The farm was always the plan. Baseball was the detour.",
      origin: "Reynolds purchased a farm in Wharton, TX in 1934 and spent the rest of his life there as a community leader.",
    },
    {
      title: ".355 at Minneapolis",
      type: "Game Action",
      text: "Your outfielder is 34 years old. He's been traded to the minors. His career is over. But he hits .355 with 218 hits and 17 HR in the American Association. The Cubs buy his contract. He plays in the World Series. The journeyman refuses to stay down.",
      origin: "1937: Reynolds hit .355 with 218 hits at Minneapolis. Cubs purchased his contract. He played in the 1938 WS.",
    },
    {
      title: "0-for-12 in the World Series",
      type: "Drama",
      text: "Your outfielder's only World Series. He's 35 years old. He's fought through 4 trades, a broken jaw, and a minor league demotion to get here. He goes 0-for-12. One walk. No hits. The Cubs are swept. The farm in Wharton waits.",
      origin: "1938 WS: Reynolds went 0-for-12 with 1 BB as the Cubs were swept by the Yankees.",
    },
  ],

  art_direction: {
    face: "Stocky, athletic, 6'0\" 194 lbs. Texas face — tanned, solid, no-nonsense. Not flashy, not intense. The face of a man who hits .300, runs out triples, takes a punch to the jaw, and goes home to his farm. Professional. Reliable. Forgettable — until you look at the stat line.",
    attire: "Chicago White Sox 1930 home whites. Comiskey Park or Yankee Stadium behind him. Mid-stride — running out an inside-the-park home run, legs churning, the ball bouncing in the gap. Or: the collision at home plate, Dickey's fist connecting, the jaw about to break.",
    mood: "Blue-collar baseball. No frills, no drama, no fame. Just a .302 hitter running hard and hitting gaps. The card should feel like a workday — honest, productive, and slightly invisible. This is the card of the 29th man on a 25-man roster — the guy who keeps the team afloat.",
    style: "Texas pastoral meets Chicago industrial. White Sox black and white, but with Texas brown and green underneath. Wharton County fields in the background. This is the card of a man who played baseball to buy a farm — and the farm was the better investment.",
    reference: "The card of the man who hit 3 HR in 3 innings (2 inside-the-park) and nobody remembers. The man whose jaw was broken by Bill Dickey. The man who hit .355 in the minors at 34 and earned one more shot. The man who went 0-for-12 in his only World Series. The man who went home to Wharton, Texas, and served on the bank board. Carl Reynolds — the most productive player you've never heard of.",
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

export default function CarlReynoldsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = REYNOLDS_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Stocky, athletic, White Sox whites, mid-stride running out an inside-the-park HR, Yankee Stadium gaps]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "H", val: d.real_stats.hits },{ label: "3B", val: d.real_stats.triples },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1930 — .359/22/104 — 18 3B — 3 HR IN 3 INNINGS (MLB FIRST)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📊 .302 Career BA", "💥 3 HR in 3 Innings", "🏃 18 Triples (1930)", "🥊 Jaw Broken by Dickey", "🎓 Southwestern University", "🌾 Texas Farmer", "🏟 5 Teams / 13 Years"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Reynolds' real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Reynolds' Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (AL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
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
