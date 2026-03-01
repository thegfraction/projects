// /cards/players/dave-bancroft.jsx
import { useState } from "react";

const BANCROFT_DATA = {
  name: "Dave Bancroft",
  nickname: "Beauty",
  year: 1922,
  team: "New York Giants",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SS",
  bats: "S",
  throws: "R",
  height: '5\'9"',
  weight: "160 lbs",
  born: "April 20, 1891 — Sioux City, IA",
  died: "October 9, 1972 — Superior, WI (age 81)",
  hof: "Inducted 1971 (Veterans Committee). Controversial selection — attributed to Frankie Frisch's cronyism. But also called 'the Ozzie Smith of his era, except he was a better hitter.' Set still-standing MLB record for fielding chances by SS (984, 1922). 4 pennants, 2 WS titles. Rogers Hornsby, Kiki Cuyler, and Clark Griffith all named him the all-time best NL shortstop.",

  real_stats: {
    season: 1922,
    games: 156,
    at_bats: 651,
    hits: 209,
    doubles: 41,
    triples: 5,
    home_runs: 4,
    rbi: 60,
    stolen_bases: 16,
    batting_avg: ".321",
    obp: ".386",
    slg: ".409",
    ops: ".795",
    runs_scored: 117,
    walks: 79,
    strikeouts: 27,
    career_avg: ".279",
    career_hits: 2004,
    career_hr: 32,
    career_runs: 1048,
    career_doubles: 320,
    career_bb: 827,
    career_k: 487,
    career_war: "~28",
    ws_appearances: 4,
    ws_titles: 2,
    fielding_record: "984 total chances at SS in 1922 (MLB record, still stands)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1922 SEASON (PEAK)
  //
  // CON: .321 BA → tier 4 (.300-.329). 209 H. 79 BB/27 K. Switch hitter. CON = 4.
  // POW: 4 HR (1922). 32 career. .409 SLG. No power. POW = 0.
  // SPD: 16 SB (1922). But 75 CS in years tracked. Bad basestealer. Range at SS elite. SPD = 1.
  // DEF: 984 total chances (MLB record, still stands). 105 DP (first SS to 100). Led NL putouts 4×, assists 3×, FP 2×. "Greatest SS the Giants ever had." DEF = 3 (MAXIMUM).
  // CLU: .152 in 1921 WS. But 2 WS titles. Captain of 3 pennant winners. His leadership, not bat, defined October. CLU = 1.
  // OVR: CON×2(8) + POW×1.5(0) + SPD×1(1) + DEF×0.5(1.5) = 10.5 → normalized ~7
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — Hall of Famer, 4 pennants, 2 WS titles. The Ozzie Smith of the Deadball Era. His defense and leadership were the bedrock of McGraw's dynasty.
    con: 4,      // .321 BA in 1922 (tier 4). 209 hits. 79 BB vs 27 K — elite plate discipline. Switch hitter. .318 in 1921. .304 in 1923. Career .279 is dragged down by early and late years.
    pow: 0,      // 4 HR in 1922. 32 career. .409 SLG. No power whatsoever. His value was contact, walks, and defense.
    spd: 1,      // 16 SB in 1922, but 75 CS in tracked years — equal to his SB. Terrible basestealer. Elite range at SS (record 984 chances). SPD 1 reflects the legs at SS offset by the baserunning.
    def: 3,      // MAXIMUM. MLB record 984 fielding chances at SS (1922, still stands). First SS to turn 100 DP (105 in 1921). Led NL SS in putouts 4×, assists 3×, FP 2×. McGraw: "I could knock a hundred balls at him and he'd be in front of every one." Frank Graham: "Greatest SS the Giants ever had and one of the greatest that ever lived." Hornsby, Cuyler, Griffith all named him best NL SS ever.
    clu: 1,      // .152 in 1921 WS (won). Hit .294 in 1915 WS (lost). 2 WS titles as captain. His October impact was leadership and defense, not offense. CLU 1 — present but not dominant.
  },

  stat_justification: {
    con: ".321 in 1922 — career high. 209 hits, 41 doubles. 79 walks vs 27 strikeouts — nearly 3:1 BB/K ratio. Switch hitter who hit .318 in 1921 and .304 in 1923. Career .279 is misleading — his early years (.254, .212, .243) and late decline drag it down. In his prime (1920-23), he was a .310+ hitter. Rating of 4.",
    pow: "4 HR in 1922. Career high was 7 HR as a rookie in 1915. 32 career HR in 1,913 games. .409 SLG in his best year. No power at all. Rating of 0.",
    spd: "16 SB in 1922. Career high 41 SB in 1911 (minor leagues). But in 7 seasons where CS was tracked, he was caught 75 times — equal to his 75 SB. One of the worst basestealing percentages of his era. However, his range at shortstop was historically elite (record 984 chances, record 362/405 putouts). The legs moved brilliantly sideways but poorly forward. Rating of 1.",
    def: "This is Bancroft's defining stat. 984 total chances at SS in 1922 — the MLB record, STILL STANDING after 100+ years. First SS to turn 100 DP in a season (105 in 1921). Led NL SS in putouts 4 times, assists 3 times, fielding percentage twice. McGraw: 'I could knock a hundred balls at him at various angles and he would be found in front of every one of them.' Frank Graham: 'the greatest shortstop the Giants ever had and one of the greatest that ever lived.' Rogers Hornsby, Kiki Cuyler, and Clark Griffith all named him the all-time best NL shortstop. Compared to Ozzie Smith — 'Ozzie's equal in fielding but a better hitter.' Rating of 3 — MAXIMUM.",
    clu: "Hit .152 in the 1921 WS (Giants won). Hit .294 in the 1915 WS (Phillies lost). Played every inning of 4 World Series. 2 WS titles as captain. But his October was defined by defense and leadership, not hitting. His bat went quiet on the big stage. Rating of 1 — present through presence, not production.",
  },

  personality: {
    leadership_style: "McGraw's field general. Bancroft was John McGraw's captain — his extension on the field. McGraw called him 'a student of the game with a Ph.D. in baseball fundamentals.' When traded to the Giants, catcher Snyder offered to teach him the signs. Bancroft replied: 'Why, have they changed? If not, I know them already.' He'd been stealing signs from the opposing dugout for years. He was the smartest player on the field and everyone knew it.",
    temperament: "Fiery, competitive, scrappy. The nickname 'Beauty' came from his habit of shouting the word at good pitches and good plays — pure enthusiasm. But he could also be abrasive: his hard-nosed managing style led to personality clashes with the Braves, and in 1927, former player Earl Smith punched him during a game. Bancroft was carried off the field. He came back the next day. He was the kind of leader who inspired both loyalty and resentment.",
    work_ethic: "Superhuman. In June 1923, Bancroft showed up to the Polo Grounds with a high fever, insisted on playing, played all 9 innings, and then collapsed in the clubhouse. He was hospitalized with severe pneumonia. McGraw's reaction: 'Imagine, he played nine innings with pneumonia.' This was not unusual for Bancroft — he played 156 games in 1922, every inning of 4 World Series, and handled 984 fielding chances in a single season. He simply refused to sit.",
    lifestyle: "Iowa boy, lifetime baseball man. Born in Sioux City. Played in the minors from age 18. After his playing career, he coached the Giants under McGraw, managed in the minors (Minneapolis, Sioux City, St. Cloud), and then managed three teams in the All-American Girls Professional Baseball League from 1948-1951 (Chicago Colleens, South Bend Blue Sox, Battle Creek). He was one of the few Deadball-era players to manage women's baseball — bridging eras in a way nobody expected. Retired to Superior, WI. Died October 9, 1972.",
    era_adaptability: "HIGH. Bancroft's defensive range, plate discipline (79 BB/27 K), switch-hitting, and baseball IQ translate to any era. He'd be a modern elite defensive shortstop who hits .280 and walks more than he strikes out — think a Deadball-era Marcus Semien or Brandon Crawford. His lack of power wouldn't hurt at SS. His intelligence would be valued in any analytics department.",
    clubhouse_impact: "CAPTAIN AND COMMANDER. Bancroft captained both the Phillies (informally) and the Giants (officially). He managed the Braves, coached the Giants, and managed women's baseball teams. Every organization he touched put him in charge. In ILB: +2 team leadership. Bancroft is the field general who makes everyone around him better — especially pitchers, who benefit from his positioning and game-calling.",
    dark_side: "The HOF controversy. Bancroft was elected by the Veterans Committee in 1971, widely attributed to Frankie Frisch's cronyism. His .279 career average, 32 HR, and 591 RBI wouldn't get a modern player close to Cooperstown. Bill James called the Frisch-era selections 'among the most glaring errors in HOF history.' But the counter-argument is real: Bancroft was the Ozzie Smith of his era with a better bat, held records that still stand, and was unanimously praised by contemporaries as the best SS alive. In ILB: Bancroft carries 'Frisch's Friend' — a trait where his apparent value is questioned by outsiders but validated by those who played with him.",
  },

  chemistry_traits: [
    { tag: "Beauty!", desc: "Bancroft shouted 'Beauty!' at every good pitch and good play. His enthusiasm is infectious. +1 team morale per game. Pitchers gain +1 CTL when Bancroft is at shortstop behind them — his energy and positioning make them better." },
    { tag: "McGraw's Captain", desc: "John McGraw's field general — the smartest player on the field. +1 team IQ. Bancroft knows the opponents' signs before the game begins. In ILB, he provides +1 scouting intelligence on all opposing batters." },
    { tag: "Nine-Eighty-Four", desc: "984 fielding chances in a single season — the MLB record, STILL STANDING. In any game where Bancroft handles 7+ chances, he gains +1 DEF and enters a 'zone' state where errors become nearly impossible." },
    { tag: "Nine Innings with Pneumonia", desc: "Played a full game with a 103-degree fever, then collapsed. Bancroft cannot be benched for illness. He plays through anything. +1 STA equivalent — but at a hidden health cost that accumulates." },
    { tag: "Frisch's Friend", desc: "His HOF selection is contested. Bancroft's apparent OVR fluctuates between 6 and 8 depending on the observer. Those who watch him play rate him higher. Those who read his stat line rate him lower. The card itself is uncertain of its own value." },
    { tag: "Sign Stealer", desc: "'Why, have they changed?' Bancroft already knew the Giants' signs before joining the team. He provides +1 intelligence advantage — opponents' strategies are partially revealed each inning." },
    { tag: "Switch Hitter", desc: "One of the premier switch hitters of the Deadball Era. 2,004 career hits from both sides. No platoon splits — Bancroft is equally effective against LHP and RHP." },
    { tag: "Women's Baseball Pioneer", desc: "Managed in the AAGPBL from 1948-1951. One of the only Deadball-era players to manage women's professional baseball. Bancroft bridges eras. +1 adaptability across all leagues and rule sets." },
  ],

  preferred_locations: [
    { location: "Polo Grounds / New York", affinity: "HIGH", note: "His best years. 3 pennants, 2 WS titles, .318/.321/.304 from 1921-23. McGraw's captain." },
    { location: "Shortstop", affinity: "MAXIMUM", note: "984 chances. 105 DP. Records that still stand. The position was made for him." },
    { location: "Baker Bowl / Philadelphia", affinity: "MEDIUM", note: "5 seasons, 1 pennant (1915). Where he learned the game. But hit .212 as a sophomore." },
    { location: "Manager's Office", affinity: "MEDIUM", note: "Managed Braves 4 years (249-363 — bad teams, not bad managing). Managed AAGPBL teams. Born to lead." },
    { location: "Iowa / Upper Midwest", affinity: "MEDIUM", note: "Born Sioux City. Died Superior, WI. Managed Minneapolis, Sioux City, St. Cloud. The heartland was home." },
    { location: "World Series", affinity: "MIXED", note: "4 WS appearances. 2 titles. But .152 in 1921 WS. His October contribution was glove and brain, not bat." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — Bancroft's rookie year (1915), the Phillies won their first pennant. The Giants won 3 straight with him at captain. Success followed him.",
      "Defensive showcases — games where range and positioning dominate. Bancroft thrived when the game was played at shortstop.",
      "Against former teams — went 6-for-6 against the Phillies in his first return trip as a Giant. Revenge motivated him.",
      "McGraw's system — Bancroft was McGraw's type of player: scientific, fundamentals-first, cerebral. In the right system, he flourished.",
    ],
    cold_triggers: [
      "World Series hitting — .152 in 1921 WS, the worst of his October appearances. His bat went cold on the biggest stage.",
      "Bad teams — his 249-363 record managing the Braves shows that even a genius captain can't save a talentless roster.",
      "Baserunning — 75 SB, 75 CS in tracked years. Equal odds of success and failure. The worst part of his game.",
      "Physical decline — legs bothered him in 1923. Pneumonia hospitalized him. The body couldn't sustain the brain's demands.",
    ],
    pressure_response: "CEREBRAL DEFENDER. Bancroft's October pattern is fascinating: his bat goes quiet but his glove and brain stay sharp. He was the captain of two WS-winning teams while hitting .152 in one of those Series. His value in October was invisible to stat sheets — positioning, sign-stealing, calming pitchers, turning double plays, initiating triple plays. In ILB, Bancroft is the player who doesn't show up in the box score but shows up in the win column. His CLU of 1 is the most generous zero in the game.",
  },

  action_card_seeds: [
    {
      title: "Why, Have They Changed?",
      type: "Action",
      text: "Your new shortstop arrives at his first practice with the team. The catcher approaches to teach him the signals. Your shortstop smiles and says: 'Why, have they changed? If not, I know them already.' He'd been stealing their signs from the opposing dugout for years. The catcher stares. The manager grins.",
      origin: "When Bancroft joined the Giants in 1920, catcher Frank Snyder offered to explain the team's signs. Bancroft already knew them from stealing them as a Phillie.",
    },
    {
      title: "Nine-Eighty-Four",
      type: "Game Action",
      text: "Over 156 games, your shortstop handles 984 fielding chances — the most by any shortstop in the history of baseball. This record will still stand over a century later. He also collects 209 hits, 41 doubles, and walks 79 times against 27 strikeouts. It is the greatest all-around season a shortstop has ever played.",
      origin: "Bancroft's 1922 season: 984 total chances at SS (MLB record, still standing), .321 BA, 209 H, 79 BB/27 K.",
    },
    {
      title: "Nine Innings with Pneumonia",
      type: "Drama",
      text: "Your captain arrives at the ballpark with a 103-degree fever. He insists on playing. He plays all 9 innings. After the final out, he collapses in the clubhouse. He's hospitalized with severe pneumonia. The manager's reaction: 'Imagine, he played nine innings with pneumonia.'",
      origin: "In June 1923, Bancroft played a full game with a high fever before collapsing. Hospitalized with severe pneumonia. McGraw was simultaneously awed and exasperated.",
    },
    {
      title: "Six for Six",
      type: "Game Action",
      text: "Less than three weeks after being traded, your shortstop returns to his old ballpark and goes 6-for-6 — all singles — against his former teammates. He is the only player in baseball history to hit six singles in a nine-inning game and score in four consecutive innings.",
      origin: "June 28, 1920: Bancroft went 6-for-6 (all singles) as the Giants routed the Phillies 18-3. He remains the only player to hit 6 singles in a 9-inning game.",
    },
    {
      title: "Beauty!",
      type: "Action",
      text: "Your shortstop has a habit. Every good pitch, every clean play, every sharp grounder fielded: he shouts 'Beauty!' The fans pick it up. The press picks it up. It becomes his name. Nobody remembers his real one. He is Beauty now — and always will be.",
      origin: "Bancroft earned his nickname from his enthusiastic habit of shouting 'Beauty!' at good pitches and good plays. The exact origin is disputed but the name stuck permanently.",
    },
    {
      title: "Decked by Earl Smith",
      type: "Drama",
      text: "A former player confronts your manager during a game. Words are exchanged. Then the catcher throws a punch and your manager goes down. He's carried off the field. The attacker is fined $500 and suspended 30 days. Your manager comes back the next day.",
      origin: "June 18, 1927: Pirates catcher Earl Smith (formerly managed by Bancroft on the Braves) punched Bancroft during a game. Bancroft was carried off the field. Smith was fined and suspended.",
    },
    {
      title: "Frisch's Friend",
      type: "Drama",
      text: "Your player has been dead for a year when his old teammate puts him in the Hall of Fame. Critics call it cronyism. Your player's stats — .279, 32 HR — don't scream Cooperstown. But his records still stand. Hornsby called him the best SS who ever lived. The plaque is real. The debate never ends.",
      origin: "Bancroft was elected to the HOF in 1971 by the Veterans Committee, widely attributed to Frankie Frisch. He died in 1972. The selection remains one of the most debated in HOF history.",
    },
    {
      title: "The Colleens and the Blue Sox",
      type: "Action",
      text: "Decades after his playing career, your Hall of Famer manages women's professional baseball teams in Chicago, South Bend, and Battle Creek. He teaches the same fundamentals McGraw taught him. The game is the game. The players are different. The Beauty is the same.",
      origin: "Bancroft managed the Chicago Colleens (1948) and South Bend Blue Sox (1949-50) in the AAGPBL — one of the few Deadball-era players to manage women's professional baseball.",
    },
  ],

  art_direction: {
    face: "Compact 5'9\" 160 lbs — wiry, quick, coiled energy. Sharp intelligent eyes, the face of a man who sees everything on the field. Slight grin — the look of someone about to shout 'Beauty!' at a good curve. Clean-shaven, Iowa-bred, with the weathering of a man who's played baseball in every league that exists.",
    attire: "New York Giants 1922 home whites — the dynasty year. Classic shortstop pose: crouched in ready position, hands out, weight on the balls of his feet. Or: mid-throw after a backhanded pickup, the arm whipping across his body with the precision McGraw described — 'in front of every ball with his hands so well placed as to scoop it up.'",
    mood: "Electric competence. This card should radiate the energy of a man who shouts 'Beauty!' every time something goes right. Bancroft is joy in motion — the fielder who makes the impossible look routine and then celebrates it. Not quiet like Gardner or Smith. Not dramatic like Wood or Vaughn. Just pure baseball enthusiasm, channeled through the greatest hands at shortstop anyone had ever seen.",
    style: "Sepia-toned with bright warm gold highlights — the most golden card in the Muggers set. Where Smith is amber and Daubert is coal-gray, Bancroft is burnished gold, polished brass, the gleam of a new glove. The Polo Grounds in soft focus behind him, the coogan's bluff skyline, Giants bunting on the grandstand. This card should feel prestigious — contested, debated, but undeniably beautiful.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, Kauff is a firecracker, Marquard is a spotlight, Vaughn is a cathedral bell, Gardner is a hearthfire, Smith is a lantern, and Daubert is a coal seam, then Dave Bancroft is a bell that rings 'Beauty!' — clear, bright, unmistakable, and impossible to ignore even when you're not sure it belongs in the cathedral.",
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

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DaveBancroftCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = BANCROFT_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, #c9a84c15, ${C.gold}20)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>✨</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "R", val: d.real_stats.runs_scored },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "BB", val: d.real_stats.walks },{ label: "K", val: d.real_stats.strikeouts }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} NEW YORK GIANTS — {d.real_stats.games} GAMES — 984 CHANCES (MLB RECORD)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR 2B", val: d.real_stats.career_doubles },{ label: "BB/K", val: "827/487" },{ label: "WS", val: "4" },{ label: "TITLES", val: "2" },{ label: "PENNANTS", val: "4" },{ label: "HOF", val: "1971" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 16 SEASONS • 2,004 HITS • SWITCH HITTER • HALL OF FAME</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ Hall of Fame 1971", "🏆 2× WS Champion", "👑 McGraw's Captain", "🧤 984 Chances (Record)", "🔄 Switch Hitter", "🧠 Sign Stealer", "💪 9 Innings w/ Pneumonia", "⚾ AAGPBL Manager"].map((a, i) => (
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
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "MIXED" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MAXIMUM" ? C.gold : l.affinity === "MIXED" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Bancroft's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Bancroft's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
