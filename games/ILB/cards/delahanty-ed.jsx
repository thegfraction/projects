import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}delahanty-ed.png`;

const PLAYER_DATA = {
  name: "Ed Delahanty",
  nickname: "Big Ed",
  year: 1899,
  team: "Philadelphia Phillies",
  era: "1890s",
  ilb_team: "Banners NL1890",
  position: "LF",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "170 lbs",
  born: "October 30, 1867 — Cleveland, OH",
  died: "July 2, 1903 — Niagara Falls, ON (age 35). Fell from the International Railway Bridge into the Niagara River. Body found a week later. Accident, suicide, or murder — never solved.",
  hof: "Inducted 1945 (Veterans Committee). Career .346 BA (7th all-time). Only player to win batting titles in both AL and NL.",

  real_stats: {
    season: 1899, games: 146, at_bats: 581, hits: 238, doubles: 55, triples: 9,
    home_runs: 9, rbi: 137, stolen_bases: 30, batting_avg: ".410", obp: ".464",
    slg: ".582", ops: "1.046", ops_plus: 184, war: 9.0, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".346", career_hits: 2597,
    career_hr: 101, career_sb: 455, career_war: 69.5,
  },

  // ═══════════════════════════════════════════════════════════════
  // POSITION PLAYER STAT ENGINE
  // CON: .410 BA → tier 5 (.330+). OPS+ 184 → +1 bonus = 6, capped at 5. CON = 5.
  // POW: 9 HR → tier 0 (0-9). SLG .582 → +1 bonus = 1. POW = 1.
  //   BUT: Delahanty hit 4 HR in a game (1896). Led NL in HR twice (19 in 1893, 13 in 1896).
  //   55 doubles in 1899 (record until 1923). 101 career HR. He was a genuine power threat
  //   for his era — Crazy Schmit: "You just want to shut your eyes and say a prayer."
  //   POW should be 2 with a context bonus for era-relative power.
  // SPD: 30 SB in 1899, 58 in 1898 (led NL), 455 career. SPD = 2.
  //   But he was faster than 2 suggests — the 58 SB league-leading year earns consideration.
  //   SPD = 3 (led league, 455 career, inside-the-park power).
  // DEF: "An awfully even, well balanced player all around." Strong arm. Good fielder. Rating 2.
  // CLU: Never won a World Series. Never reached one. Rating 0.
  // OVR: CON(5)×2 + POW(2)×1.5 + SPD(3)×1 + DEF(2)×0.5 = 10+3+3+1 = 17 → normalized ≈ 10 (Elite)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,
    con: 5,      // .410 in 1899. .407 in 1894. .404 in 1895. .346 career (7th all-time). 2,597 hits. Only player to win batting titles in both leagues. Maximum 5.
    pow: 2,      // 9 HR in 1899, but 55 2B (record). Led NL in HR twice (19 in 1893, 13 in 1896). 4 HR game (1896). 101 career HR. .582 SLG. He was the premier slugger of the 1890s — true power for the dead-ball era. Rating 2.
    spd: 3,      // 30 SB in 1899. Led NL with 58 SB in 1898. 455 career SB. Multiple inside-the-park HR. Delahanty was genuinely fast — a five-tool player. Maximum 3.
    def: 2,      // "An awfully even, well balanced player all around." Strong arm, good range. Sporting Life praised both his batting and fielding. Rating 2.
    clu: 0,      // Never reached a World Series or Temple Cup final as the primary star. Never played in a meaningful postseason. Rating 0.
  },

  stat_justification: {
    con: ".410 BA in 1899 — first player in history to hit .400 three times (.407 in 1894, .404 in 1895, .410 in 1899). Won NL batting title in 1899 and AL title in 1902 (.376) — only player to win batting crowns in both leagues. Career .346 BA (7th all-time). 2,597 hits in only 1,835 games. Twelve straight seasons above .300. Jack O'Connor: 'If Del had a weakness at the bat, I never could discover it.' Maximum 5.",
    pow: "9 HR in 1899 with 55 doubles (MLB record until 1923). Led NL in HR twice (19 in 1893, 13 in 1896). Hit 4 HR in one game (1896 — second player ever). 101 career HR. Led NL in RBI 3 times. Led NL in SLG 5 times. Career .505 SLG. The premier slugger of the 1890s — bigger, stronger, more powerful than contemporary contact hitters. Crazy Schmit: 'When you pitch to Delahanty, you just want to shut your eyes, say a prayer and chuck the ball.' Rating 2 reflects genuine dead-ball power.",
    spd: "30 SB in 1899. Led NL with 58 SB in 1898. 455 career SB. Multiple inside-the-park HR (hit 4 HR in a game — 2 were inside-the-park). Delahanty was a legitimate five-tool player — he could run. The Sporting Life called him 'an awfully even, well balanced player all around.' Rating 3 — led the league in steals.",
    def: "The Sporting Life: 'You look at his batting and say well, that chap is valuable if he couldn't catch the measles, and then you look at his fielding and conclude that it wouldn't pay to let him go if he couldn't hit.' Strong arm. Good range for a 6'1\" outfielder. Not elite but solidly above average. Rating 2.",
    clu: "Delahanty never reached a World Series or its precursor. The Phillies were never good enough in his era despite having the greatest outfield in 19th-century baseball (Delahanty, Thompson, Hamilton). He died at 35, still an active player (.333 in 42 games in 1903). His career was cut short before he could find a winning team. Rating 0.",
  },

  personality: {
    leadership_style: "The Superstar. Delahanty was baseball's first true five-tool player — he could hit for average, hit for power, run, throw, and field. He led by sheer dominance, not by words or example. When he was in the lineup, opposing pitchers prayed. His presence elevated the entire franchise — the Phillies' outfield of the 1890s was the greatest of its century because of him.",
    temperament: "Restless, ambitious, self-destructive. Delahanty was never satisfied — with his team, his salary, or his life. He jumped to the Players' League in 1890 for more money. He jumped to the American League in 1902 for more money. He tried to jump to the Giants in 1903 but was blocked. He was an alcoholic who bet heavily on horses. He was described as charming and dangerous in equal measure — a man who could hit .410 and then drink away his winnings. His final train ride was fueled by whiskey and desperation.",
    work_ethic: "NATURALLY GIFTED. Delahanty's talent was immense and partly innate — five brothers played in the majors, suggesting genetic gifts. He didn't need to outwork anyone; he simply outperformed them. But when his talent wasn't enough (bad teams, financial trouble, aging), he had no backup plan. He was a man built for greatness who couldn't build for stability.",
    lifestyle: "Irish-American from Cleveland. Working-class family. Five brothers who all played professional baseball (Ed, Frank, Jim, Joe, Tom). Married, but his personal life was troubled — marital problems, drinking, gambling debts. He owed money to John McGraw after a failed team jump. By 1903, he was drunk on a train crossing Niagara Falls, was ejected by the conductor, and fell (or jumped, or was pushed) from the International Railway Bridge. His body was found a week later at the bottom of the falls.",
    era_adaptability: "ELITE. Delahanty was the most complete player of the 1890s — a genuine five-tool player decades before the term existed. He'd be a perennial MVP candidate in any era. His power would scale up with modern baseballs. His speed was legitimate. His defense was solid. He's the closest thing the dead-ball era produced to a modern superstar. Only his alcoholism and self-destructive tendencies would limit him.",
    clubhouse_impact: "MAGNETIC BUT UNSTABLE. Delahanty's talent made him the center of every team — and his restlessness made him a flight risk on every team. He jumped leagues three times. Teammates loved his bat but couldn't trust his loyalty. He was the kind of player who made your lineup elite and your front office nervous simultaneously.",
    dark_side: "Niagara Falls. On July 2, 1903, drunk and possibly delusional, Delahanty was ejected from a train at the Canadian border near Niagara Falls. He walked or stumbled onto the International Railway Bridge and fell into the Niagara River. His mangled body was found a week later. He was 35, hitting .333, and still one of the best hitters in baseball. The mystery — accident, suicide, or murder — has never been solved. In ILB terms: Delahanty carries a 'Falls' trait — at any point in his career, there's a small chance he self-destructs spectacularly. The greatest talent in the set with the most devastating personal flaw.",
  },

  chemistry_traits: [
    { tag: "Five-Tool Original", desc: "The first true five-tool player. Delahanty can hit, hit for power, run, throw, and field. +1 to all stats when all five categories are above 0." },
    { tag: "Three-Time .400", desc: "First player to hit .400 three times (.407, .404, .410). +2 reputation. Opposing pitchers: 'Shut your eyes, say a prayer and chuck the ball.'" },
    { tag: "Four Home Runs", desc: "Hit 4 HR in one game (1896). Once per season, Delahanty has a 5% chance of hitting 4 HR in a single game. When it happens, +3 team morale." },
    { tag: "Both Leagues", desc: "Only player to win batting titles in both AL and NL. +1 chemistry when switching leagues. No adjustment period on new teams." },
    { tag: "Five Brothers", desc: "Five Delahanty brothers played MLB. +1 chemistry with any teammate who shares his last name or ethnicity. Family bonds are deep." },
    { tag: "The Restless Star", desc: "Delahanty always wants more money. If underpaid, 25% chance he jumps to a rival league. If blocked from jumping, -2 morale." },
    { tag: "The Falls", desc: "CRITICAL FLAW: Alcoholism, gambling, desperation. After age 33, 5% cumulative chance per season that Delahanty's career ends in catastrophic self-destruction. Cannot be prevented." },
    { tag: "Greatest Outfield", desc: "+3 chemistry when paired with elite OF teammates. The 1894 Phillies outfield (Delahanty, Thompson, Hamilton) all hit over .400." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: ".346 career. 2,597 hits. No weakness at the plate." },
    { location: "Philadelphia", affinity: "HIGH", note: "Played 14 years for the Phillies. Their greatest pre-modern hitter." },
    { location: "Cleveland, OH", affinity: "HIGH", note: "Born there. Irish-American roots. Five brothers from the same neighborhood." },
    { location: "Saloon / Racetrack", affinity: "HIGH", note: "Alcoholic. Heavy gambler on horses. Financial trouble was constant." },
    { location: "Train", affinity: "LOW", note: "His final journey. Ejected near Niagara Falls. Fell into the river." },
    { location: "Niagara Falls", affinity: "LOW", note: "Where his body was found. The mystery of his death endures." },
  ],

  momentum: {
    hot_triggers: [
      "Great outfield teammates — Delahanty thrived alongside Thompson and Hamilton",
      "Contract negotiations — anger at being underpaid fueled his best seasons",
      "League-jumping years — his first season in a new league was always his best (.376 AL debut)",
      "Power moments — when Delahanty got hot, he hit for power no one else in the era could match",
    ],
    cold_triggers: [
      "Alcohol — drinking binges could derail him for extended periods",
      "Gambling debts — financial pressure affected his focus and behavior",
      "Being trapped — when blocked from jumping leagues (1903), he unraveled",
      "Bad teams — Delahanty never played for a champion and the frustration ate at him",
    ],
    pressure_response: "UNKNOWN — TRAGIC. Delahanty never played in a World Series or its equivalent. The Phillies of the 1890s had the greatest outfield in baseball and still couldn't win. When Washington blocked his jump to the Giants in 1903, the pressure destroyed him. In ILB: Delahanty's pressure response is theoretically elite (his talent demands it) but practically untested. He might be the greatest October player who never existed — or the greatest collapse. We'll never know.",
  },

  action_card_seeds: [
    { title: "Four Home Runs", type: "Game Action", text: "Your slugger hits 4 home runs in a single game — 2 over the fence and 2 inside-the-park. He becomes the second player in history to accomplish the feat. Your team still loses 9-8. The most bittersweet power display in baseball.", origin: "On July 13, 1896, Delahanty hit 4 HR against the Colts (Cubs). Two cleared the fence, two were inside-the-park. The Phillies lost 9-8." },
    { title: "The .400 Outfield", type: "Game Action", text: "Your entire outfield hits over .400 for the season — four players all above .400. The team batting average is .349, an all-time record. Your team still doesn't win the pennant. The greatest hitting team that couldn't win.", origin: "The 1894 Phillies outfield: Delahanty (.407), Thompson (.407), Hamilton (.404), Turner (.416). Team BA of .349 — still the all-time MLB record." },
    { title: "Fifty-Five Doubles", type: "Game Action", text: "Your hitter smashes 55 doubles in a single season — a record that will stand for 24 years. He also hits .410 with 137 RBI. His bat is a machine that produces extra-base hits at an impossible rate.", origin: "Delahanty hit 55 doubles in 1899 — an MLB record until George Burns hit 64 in 1923. He also led the league in BA (.410), hits (238), and RBI (137)." },
    { title: "The League Jump", type: "Action", text: "Your superstar signs with a rival league for more money. He wins the batting title in his first season there. But when he tries to jump again, the leagues make a deal to freeze all players. He's trapped. His rage begins.", origin: "Delahanty jumped to the AL's Senators in 1902, won the batting title (.376). In 1903, he tried to jump to the Giants but was blocked by the peace agreement between the leagues." },
    { title: "Five Brothers", type: "Drama", text: "Five brothers from the same Cleveland neighborhood all reach the major leagues. The eldest is the greatest hitter of his generation. The family name becomes synonymous with baseball in their city. No family will ever match this.", origin: "Ed, Frank, Jim, Joe, and Tom Delahanty all played in MLB. No family has ever produced five major leaguers. Ed was by far the greatest." },
    { title: "Stuck in the Doghouse", type: "Drama", text: "Your outfielder chases a fly ball into a scoreboard storage area and gets physically stuck inside it. While teammates pull him free, the opposing runner circles the bases for a home run. The crowd roars with laughter.", origin: "At Philadelphia's Huntingdon Street Grounds, Cap Anson's fly ball landed in the 'doghouse' (scoreboard number storage). Delahanty got stuck trying to retrieve it. Anson circled the bases." },
    { title: "Shut Your Eyes and Pray", type: "Game Action", text: "Your hitter is so dangerous that opposing pitchers have no strategy. They simply throw and hope. Crazy Schmit's prescription: 'Shut your eyes, say a prayer and chuck the ball. The Lord only knows what'll happen after that.'", origin: "Crazy Schmit of the Giants and Orioles on facing Delahanty. The quote captures the helplessness pitchers felt against the most complete hitter of the 1890s." },
    { title: "The Bridge at Niagara", type: "Drama", text: "Your superstar — drunk, in debt, trapped on a team he hates — is ejected from a train near the Falls. He walks onto the International Railway Bridge in the dark. He falls. His body is found a week later. He was 35 and hitting .333. The mystery is never solved.", origin: "On July 2, 1903, Delahanty was ejected from a train for drunkenness near Niagara Falls. He fell from the bridge into the Niagara River. His body was found downstream. Accident, suicide, or murder — unknown." },
  ],

  art_direction: {
    face: "Handsome, powerful, Irish features — 6'1\" 170 lbs, broad-shouldered and athletic. Strong jaw, intense dark eyes, confident expression bordering on arrogance. The face of a man who knows he's the best player alive and is angry that it isn't enough. There's charm here — Delahanty was magnetic — but also something haunted behind the confidence.",
    attire: "Philadelphia Phillies 1899 whites — the golden era of the franchise's greatest outfield. Full right-handed swing, maximum extension, the ball leaving the bat. Delahanty should look like he's hitting the ball harder than anyone else on the card — because he was. The swing has violence to it that the other contact hitters (Keeler, Burkett) lack.",
    mood: "Dangerous beauty. Delahanty's card should feel like looking at a lit fuse — gorgeous, powerful, and headed somewhere catastrophic. Not grim like Walsh or combative like Burkett — this is a golden player with a dark undertow. The most handsome and the most doomed position player card in the set.",
    style: "Rich, warm sepia with deep golden undertones — the most luxurious-looking card among the hitters. Reflecting the Gilded Age Philadelphia of the 1890s. Ornate border with subtle Irish motifs (shamrocks, Celtic knots). But the paper has water damage at the bottom edge — a subtle, devastating reference to the Niagara River. The most beautiful card in the set, with a hidden wound.",
    reference: "This is the T206 that stops you cold. ILB sepia at its most beautiful and most tragic. Where Joss is quietly heartbreaking and Walsh is grimly doomed, Delahanty is operatically tragic — the golden hero who falls from the bridge. The card equivalent of a Greek myth written in baseball stats.",
  },
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

export default function EdDelahantyCard() {
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
          {side === "front" ? "\u25bc Flip Card \u2014 View Dossier \u25bc" : "\u25b2 Flip Card \u2014 View Front \u25b2"}
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
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" \u2014 {d.team} \u2014 {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HITS", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS \u2014 {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HITS", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "BAT TITLES", val: "2 (NL+AL)" },{ label: "3\u00d7 .400", val: "\u2713" },{ label: "4 HR GAME", val: "\u2713" },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS \u2014 16 SEASONS (1888-1903)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\u2b50 HOF 1945", "\ud83d\udc51 .346 Career (7th All-Time)", "\ud83d\udd25 3\u00d7 .400 Hitter", "\ud83d\udca5 4 HR Game (1896)", "\u26be 55 Doubles Record", "\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66 5 Brothers in MLB", "\ud83c\udfc6 Only Both-League Batting Champ", "\ud83c\udf0a Niagara Falls, 1903"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER \u2014 {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "\u26a0 Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> \u2014 {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="\ud83d\udd25 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>\u25b8 {t}</div>))}</Section>
                <Section title="\u2744 Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>\u25b8 {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Delahanty's real life, become universal cards playable in any game.</p>
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
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>CONTACT \u2014 Batting Average + OPS+</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>.200-.249 \u2192 1 | .250-.269 \u2192 2 | .270-.299 \u2192 3 | .300-.329 \u2192 4 | .330+ \u2192 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: OPS+ \u2265 130 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>POWER \u2014 Home Runs + SLG</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-9 \u2192 0 | 10-19 \u2192 1 | 20-29 \u2192 2 | 30-39 \u2192 3 | 40-49 \u2192 4 | 50+ \u2192 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: SLG \u2265 .500 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>SPEED \u2014 Stolen Bases + range</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-5 \u2192 0 | 6-15 \u2192 1 | 16-30 \u2192 2 | 31-50 \u2192 3</div>
                  </div>
                </Section>
                <Section title="Delahanty's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} \u2022 {d.position} \u2022 OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
