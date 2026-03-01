import { useState } from "react";

const PLAYER_DATA = {
  name: "Birdie Tebbetts",
  nickname: "The Chirping Philosopher",
  year: 1940,
  team: "Detroit Tigers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "C",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "170 lbs",
  born: "November 10, 1912 — Burlington, VT",
  died: "March 24, 1999 — Bradenton, FL (age 86)",
  hof: "Not inducted. 4× All-Star. .270 career BA, 1,000 hits. Led AL C in range factor 4×, assists 3×, CS% 2×. Voted Red Sox all-time best catcher (1969 poll). 60 years in baseball as player, manager, scout, executive.",

  real_stats: {
    season: 1940,
    games: 130,
    at_bats: 398,
    hits: 118,
    doubles: 24,
    triples: 3,
    home_runs: 4,
    rbi: 59,
    stolen_bases: 1,
    batting_avg: ".296",
    obp: ".370",
    slg: ".395",
    ops: ".765",
    ops_plus: 103,
    war: 3.5,
    all_star: 4,
    career_avg: ".270",
    career_hits: 1000,
    career_hr: 38,
    career_sb: 14,
    career_war: 16.9,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CON — .296 BA → tier 3 (.270-.299). OPS+ 103 < 130 → no bonus. CON 3.
  // POW — 4 HR → tier 0 (0-9). SLG .395 < .500 → no bonus. POW 0.
  // SPD — 1 SB → tier 0. No CF/SS bonus (C). SPD 0.
  // DEF — Led AL C in range factor 4×, assists 3×, CS 2×, putouts 1×.
  //   Voted Red Sox all-time best C in 1969 poll (over 4 years!). Best
  //   defensive catcher in AL in late 1940s. 46.37% CS rate. .978 FLD%.
  //   Elite pitch-calling and staff management. 3-5 GG equivalent. DEF 2.
  // CLU — 1940 WS: 0-for-11 (.000). Tier 0. No hero moments. CLU 0.
  // OVR — CON 3×2=6 + POW 0×1.5=0 + SPD 0×1=0 + DEF 2×0.5=1 = 7 raw.
  //   4× All-Star, solid defensive catcher, 14 years. Not HOF.
  //   Role player with elite intangibles. Normalized to OVR 5 (Solid Starter).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 5,
    con: 3,
    pow: 0,
    spd: 0,
    def: 2,
    clu: 0,
  },

  stat_justification: {
    con: "Hit .296 in 1940 — his best full season. Career .270 with exactly 1,000 hits. Hit .310 in 1950 at age 37 but in only 84 games. A solid contact hitter for a catcher but never elite. OPS+ 103 in 1940 — below the 130 bonus threshold. CON tier 3.",
    pow: "4 HR in 1940, 38 career across 14 seasons. SLG .395 — well below .500 bonus threshold. Tebbetts had virtually no power. His value was entirely defensive and cerebral. POW 0.",
    spd: "1 SB in 1940, 14 career. Catcher — no CF/SS bonus. SPD 0.",
    def: "The best defensive catcher in the American League during the late 1940s. Led AL catchers in range factor 4 times, assists 3 times, caught stealing 2 times, putouts once. Career .978 fielding percentage. 46.37% caught-stealing rate. Voted Red Sox all-time best catcher in a 1969 fan poll despite playing only 4 seasons in Boston — a testament to his defensive reputation. Master pitch-caller who managed pitching staffs with a philosopher's mind. Equivalent to 3-5 Gold Gloves. DEF 2.",
    clu: "1940 World Series: 0-for-11 (.000 BA). Tebbetts admitted the Tigers were stealing the Reds' signs and knew every pitch — yet he still couldn't get a hit. 'The screwiest part was that it didn't do us a damn bit of good.' No hero moments. CLU 0.",
  },

  personality: {
    leadership_style: "Vocal, strategic, relentless. The nickname 'Birdie' came from his constant chirping behind the plate — he never stopped talking, to batters, umpires, his own pitchers, anyone within earshot. He was baseball's original chatbox catcher. But the talk wasn't noise; it was strategy. He had a philosophy degree from Providence College and applied it to every pitch sequence, every batter's weakness, every game situation. He became a successful major league manager (Reds, Braves, Indians) precisely because he'd been managing from behind the plate his entire career.",
    temperament: "Sharp-tongued, intellectually combative, fearless. Tebbetts publicly called unnamed Red Sox pitchers 'juvenile delinquents and moronic malcontents' — a remark that got him sold to Cleveland. He didn't suffer fools. He was an All-American in college, a philosophy major, and an officer in the Army Air Corps. He expected intelligence from everyone around him and was disappointed when he didn't find it.",
    work_ethic: "Cerebral and tireless. Tebbetts' approach to catching was more intellectual than physical. He studied hitters, memorized tendencies, and managed pitching staffs with meticulous attention. He took agriculture courses at UNH during offseasons. He managed in the minors and majors for decades after playing. His 60-year career in baseball was sustained by relentless curiosity, not athletic gifts.",
    lifestyle: "New England roots, baseball lifer. Born in Burlington, VT, raised in Nashua, NH. Providence College philosophy graduate. Married Mary, had daughters. Spent 60 years in professional baseball — player (14 years), manager (Reds 1954-58, Braves 1961-62, Indians 1963-66), scout, and executive. Retired to Florida. The game was his entire life.",
    era_adaptability: "PERFECT MODERN CATCHER MIND. Tebbetts' pitch-calling, game-management, and staff-handling skills would make him an ideal modern catcher — the type teams pay for framing and game-calling even if the bat is light. His .270 BA with no power would be below average today, but his defensive value and leadership would keep him employed. He'd be a Sean Murphy or Austin Hedges type — defense-first catcher who makes pitchers better.",
    clubhouse_impact: "POLARIZING-BRILLIANT. Not everyone liked Tebbetts — his 'juvenile delinquents' comment proves he could alienate teammates. But the pitchers who trusted him loved him, and the front offices who hired him as manager respected his mind. He was the kind of player who made his battery partner better while occasionally annoying everyone else. In the Allies set, he pairs perfectly with strong pitching.",
    dark_side: "The mouth. Tebbetts' greatest strength — his constant talking and strategic mind — was also his weakness. He couldn't stop himself from speaking hard truths publicly. The 'juvenile delinquents' remark cost him his job in Boston. His managerial career was marked by strategic brilliance and interpersonal friction. He was fired multiple times. In ILB: Tebbetts carries a 'Loose Lips' trait — once per season, there is a 25% chance he says something publicly that costs the team 2 morale. But his intelligence is worth the risk.",
  },

  chemistry_traits: [
    { tag: "The Chirp", desc: "Tebbetts never stops talking behind the plate. Opposing batters suffer -1 CON due to distraction. Umpires are 10% more likely to call borderline strikes. But 15% chance per game of being warned or ejected." },
    { tag: "Philosopher's Mind", desc: "Providence College philosophy degree. Tebbetts sees patterns others miss. All pitchers on his roster gain +1 to their pitch-calling effectiveness. Reduces opponent's stolen base success by 20%." },
    { tag: "Sign Stealer", desc: "Tebbetts stole signs in the 1940 WS and admitted it. When Tebbetts is catching, there is a 30% chance per game of detecting opponent's signs, giving the team's hitters +1 CON for that game." },
    { tag: "Juvenile Delinquents", desc: "Tebbetts will publicly criticize teammates he considers lazy or dumb. Once per season, 25% chance of a public outburst that costs -2 team morale. But the targeted player gains +1 effort afterward." },
    { tag: "The Manager's Eye", desc: "Tebbetts managed 3 MLB teams after playing. He evaluates talent instinctively. When paired with young players, those players gain +1 to development speed." },
    { tag: "York's Battery Mate", desc: "+2 chemistry with Rudy York (Tigers teammates 1937-1945). Tebbetts called York's pitches and managed his defensive positioning. Reduces York's error rate by 10%." },
    { tag: "Army Air Corps", desc: "WWII veteran, Army Air Corps captain. +2 with other military veterans. Lost 3 prime years to service (1943-45)." },
    { tag: "The Catcher's Intelligence", desc: "Tebbetts adds +1 DEF to the entire team when he's behind the plate. His pitch-calling is worth more than his bat." },
  ],

  preferred_locations: [
    { location: "Behind Home Plate", affinity: "HIGH", note: "His office. Every pitch was a philosophical proposition. Every at-bat a debate to be won." },
    { location: "Dugout / Strategy Session", affinity: "HIGH", note: "The manager-in-waiting. Tebbetts was already managing from the catcher's position." },
    { location: "New England", affinity: "HIGH", note: "Vermont born, New Hampshire raised, Providence educated. A Yankee through and through." },
    { location: "Lecture Hall / Podium", affinity: "MEDIUM", note: "Philosophy degree. Public speaker. Said what he thought — for better or worse." },
    { location: "Manager's Office", affinity: "MEDIUM", note: "Managed Reds, Braves, Indians. The position he was always meant to hold." },
    { location: "Press Conference", affinity: "LOW", note: "'Juvenile delinquents and moronic malcontents.' The press loved his quotes. His bosses did not." },
  ],

  momentum: {
    hot_triggers: [
      "Strong pitching staff — Tebbetts elevated his game when catching elite arms",
      "Pennant races — .294 BA in 1940 pennant-winning season; .270 in 1949 race",
      "Late career resurgence — hit career-high .310 at age 37 in 1950",
      "Intellectual challenge — when facing smart hitters, Tebbetts rose to the chess match",
    ],
    cold_triggers: [
      "Postseason — 0-for-11 in 1940 WS despite stealing signs",
      "Post-war adjustment — hit .243 in 1946, .094 through May 1947 after 3 years away",
      "Team friction — when Tebbetts feuded with teammates, his production dropped",
    ],
    pressure_response: "CEREBRAL BUT UNRELIABLE. Tebbetts was a brilliant strategist and a valuable regular-season contributor, but his postseason record (0-for-11 in his only WS) is abysmal. He knew every pitch coming in the 1940 Series and still couldn't get a hit — suggesting that when the mental pressure exceeded his physical gifts, the bat failed him. In ILB: Tebbetts provides enormous team-wide buffs (pitching, defense, sign-stealing) but his personal offensive production in clutch situations is the weakest in the set.",
  },

  action_card_seeds: [
    {
      title: "We Knew Every Pitch",
      type: "Game Action",
      text: "Your catcher steals the opposing catcher's signs. For the entire series, your team's hitters know what pitch is coming. +2 CON for all hitters. But your catcher, paralyzed by overthinking, goes 0-for-11 himself. The knowledge helps everyone except the man who found it.",
      origin: "In the 1940 World Series, Tebbetts and the Tigers stole Cincinnati catcher Jimmie Wilson's signs. They knew every pitch. Tebbetts went 0-for-11. He later said: 'The screwiest part was that it didn't do us a damn bit of good.' The Reds won in 7 games.",
    },
    {
      title: "Juvenile Delinquents and Moronic Malcontents",
      type: "Drama",
      text: "Your catcher publicly calls out unnamed teammates as 'juvenile delinquents and moronic malcontents' who refused to let him catch their games. The team is scandalized. Management sells his contract. -3 morale for the current team, but +2 morale for his next team, who admire his honesty.",
      origin: "After the 1950 season, Tebbetts told reporters that Red Sox pitchers were 'juvenile delinquents and moronic malcontents' who didn't want him catching. Boston sold his contract to Cleveland. The quote lives in infamy.",
    },
    {
      title: "The Philosophy of the Pitch",
      type: "Action",
      text: "Your catcher holds a degree in philosophy. He approaches every at-bat as a logical proposition. For the season, all pitchers on the roster gain +1 to their effectiveness rating when your catcher is behind the plate. The downside: he over-analyzes his own at-bats and his BA drops by .010.",
      origin: "Tebbetts graduated from Providence College with a philosophy degree in 1934. He applied systematic thinking to pitch-calling his entire career. His intellectual approach made him an elite defensive catcher and, eventually, a major league manager.",
    },
    {
      title: "The All-Star Backup",
      type: "Game Action",
      text: "Your catcher is selected to four All-Star Games despite modest offensive numbers. His value is invisible in the box score — it lives in pitch-calling, staff management, and defensive positioning. +1 fame per All-Star selection. The stat sheet lies about this man.",
      origin: "Tebbetts made 4 All-Star teams (1941, 1942, 1948, 1949) despite a .270 career BA and 38 career HR. He was selected for his defense, leadership, and game management — qualities that don't show up in traditional statistics.",
    },
    {
      title: "Sixty Years in Baseball",
      type: "Drama",
      text: "Your catcher plays 14 years, manages 3 teams, scouts for 4 organizations, and spends 60 total years in professional baseball. He never leaves the game. When he finally retires, he knows more about baseball than anyone alive. +5 legacy modifier. The game was his entire life.",
      origin: "Tebbetts spent 60 years in professional baseball: 14 as a player, 13 as a manager (Reds, Braves, Indians, plus minors), and decades as a scout and executive for the Yankees, Orioles, and Marlins. He never fully left the game.",
    },
    {
      title: "The Chirp That Never Stops",
      type: "Action",
      text: "Your catcher talks constantly — to batters, umpires, his own pitcher, the on-deck hitter, the ball boy. Opponents lose concentration. Your pitcher gains confidence from the steady stream of encouragement. But there is a 15% chance per game the umpire has had enough and issues a warning.",
      origin: "Tebbetts got his nickname 'Birdie' because someone said he 'doesn't stop chirping behind home plate.' His constant chatter was both a strategic tool and an authentic expression of his personality.",
    },
  ],

  art_direction: {
    face: "Compact, alert, intensely engaged. 5'11\" 170 lbs — lean and wiry, built for endurance behind the plate. Sharp, intelligent eyes that are always evaluating something. A face that is perpetually mid-sentence — mouth slightly open, about to say something clever or cutting. The look of a philosophy major who chose to apply his intellect to baseball instead of academia.",
    attire: "Detroit Tigers home whites, 1940 vintage. Catcher's gear partially visible — chest protector, shin guards. Squatting behind the plate, one finger down, calling a pitch with absolute certainty. Or: without mask, mid-argument with an umpire, gesturing emphatically.",
    mood: "Intellectual intensity and verbal energy. This card should feel like it's talking to you. Where Doerr's card is silent, Tebbetts' card should feel loud, engaged, argumentative — in the best possible way. The smartest guy in the room who can't help letting everyone know it.",
    style: "Clean, sharp sepia with cool New England undertones — slightly bluer than the Southern/Midwestern warmth of the other cards. The light should feel like a crisp autumn afternoon in the Northeast. Precise, analytical, no haze.",
    reference: "The brain card. Every team needs someone who sees the game differently. Tebbetts is the only card in the set whose value is primarily invisible — it's in the pitch-calling, the sign-stealing, the staff management. His OVR 5 is misleading; his real value is in the chemistry traits he brings to the entire roster.",
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
const StatBar = ({ label, value, max, color }) => ( <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}> <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span> <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}> <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /> </div> <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span> </div> );
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}> <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div> {children} </div> );

export default function BirdieTebbettsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sharp cool sepia, Tigers gear, crouching behind plate, mid-sentence]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="CON" value={s.con} max={5} color={C.gold} /><StatBar label="POW" value={s.pow} max={5} color={C.warmRed} /><StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} /><StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => ( <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div> ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 4× All-Star", "🧤 Led AL C: Range 4×, Assists 3×", "🎓 Philosophy Degree", "✈️ Army Air Corps Captain", "🗣️ Never Stopped Talking", "🧠 60 Years in Baseball"].map((a, i) => ( <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span> ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => ( <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button> ))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && ( <> <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section> <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section> <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section> <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section> <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section> <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section> <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section> </> )}
              {tab === "chemistry" && ( <> <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div></Section> <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}</Section> </> )}
              {tab === "momentum" && ( <> <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section> <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section> <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section> </> )}
              {tab === "actions" && ( <Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Tebbetts' real life, playable as universal cards.</p>{d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}</Section> )}
              {tab === "engine" && ( <> <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}</Section> <Section title="Tebbetts' Derivation">{Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}</Section> </> )}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}><div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div><pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}</pre></div>
    </div>
  );
}
