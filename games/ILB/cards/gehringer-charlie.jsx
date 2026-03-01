import { useState } from "react";

const GEHRINGER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: CHARLIE GEHRINGER
  // Year Snapshot: 1936 (Statistical Peak)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Charlie Gehringer",
  nickname: "The Mechanical Man",
  year: 1936,
  team: "Detroit Tigers",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "2B",
  bats: "L",
  throws: "R",
  height: "5'11\"",
  weight: "180 lbs",
  born: "May 11, 1903 — Fowlerville, MI (farm in Iosco Township)",
  died: "January 21, 1993 — Bloomfield Hills, MI (age 89)",
  hof: "Class of 1949 (BBWAA runoff, 85%). #2 retired by Tigers (1983).",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1936 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Wikipedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1936,
    games: 154,
    at_bats: 641,
    hits: 227,
    doubles: 60,
    triples: 12,
    home_runs: 15,
    rbi: 116,
    stolen_bases: 4,
    batting_avg: ".354",
    obp: ".431",
    slg: ".555",
    ops: ".986",
    ops_plus: 148,
    war: 7.6,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 6,
    career_avg: ".320",
    career_hits: 2839,
    career_hr: 184,
    career_sb: 182,
    career_war: 80.5,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // 
  // CON: .354 BA → tier 5 (.330+). OPS+ 148 → ≥130 bonus. Capped. CON 5.
  // POW: 15 HR → tier 1 (10-19). SLG .555 → ≥.500 bonus → +1. POW 2.
  // SPD: 4 SB in 1936 → tier 0. But 27 SB in 1929. Career 182 SB. Pre-GG elite range at 2B. SPD 1.
  // DEF: No Gold Gloves (pre-award). Led AL 2B in fielding % 7×, assists 7×, DP 1st all-time at retirement. Bill James top-tier 2B. Pre-GG equiv of 6+ GG. DEF 3.
  // CLU: .321 WS BA in 20 games. .375 in 1935 WS (champ). .379 in 1934 WS. .500 in ASGs. CLU 2.
  // OVR: CON(5)×2 + POW(2)×1.5 + SPD(1)×1 + DEF(3)×0.5 = 10+3+1+1.5 = 15.5 → normalized ~9 (Elite/MVP)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 9,      // Elite / MVP tier — among greatest 2B ever, 80.5 career WAR
    con: 5,      // .354 in 1936. .371 in 1937 (batting title). Career .320. 13 K in 641 AB in '36. Max contact.
    pow: 2,      // 15 HR in 1936 → tier 1. SLG .555 → bonus +1. POW 2. Gap power (60 2B!) not HR power.
    spd: 1,      // 4 SB in 1936 but 27 SB in 1929 (led AL). Career 182 SB. Plus elite 2B range. SPD 1.
    def: 3,      // Led AL 2B in fielding % 7×, assists 7×. #1 all-time in DP at retirement. 7,068 assists (2nd ever). Joe Sewell: "I couldn't hit a ball past him." Max defense.
    clu: 2,      // .321 WS BA in 20 games. .375 in 1935 WS (champ). .379 in 1934 WS. .500 in 6 ASGs. Solid but no single iconic moment. CLU 2.
  },
  
  stat_justification: {
    con: ".354 BA in 1936 with a career-low 13 strikeouts in 641 AB — one K every 49.3 at-bats, near-impossible plate discipline. .371 in 1937 MVP year (beat DiMaggio and Gehrig). Career .320. Seven 200-hit seasons. Led AL in hits twice, runs twice. Rick Ferrell: 'He hit more line drives and met the ball more solidly than any hitter.' Del Baker: 'Let him come to bat two strikes down and he wouldn't bat more than 15 points under his average.'",
    pow: "15 HR in 1936, 184 career. Not a slugger — a doubles machine. 60 doubles in 1936 (only 6 players in history have done that). 574 career doubles (19th all-time). SLG .555 in 1936 earns the bonus. His power was gap-to-gap line drives, not over the fence.",
    spd: "4 SB in 1936, but led AL with 27 SB in 1929. Career 182 SB. Good athlete who slowed with age. Two consecutive-game streaks of 500+ games shows durability. Elite range at 2B — Sewell said he 'coasted around like somebody skating.' Rating of 1.",
    def: "Among the greatest defensive second basemen in history. Led AL 2B in fielding percentage 7 times, assists 7 times. At retirement: #1 all-time in DP turned (1,444), #2 in assists (7,068), #6 in putouts (5,369). Joe Sewell: 'I couldn't hit a ball past him. He'd just coast around that infield, just like somebody skating.' H.G. Salsinger: 'He lacks showmanship but has polish no other 2B since Napoleon Lajoie ever had.' Pre-GG equivalent of 6+ Gold Gloves. Maximum defense.",
    clu: ".321 BA in 20 World Series games across 3 Fall Classics (1934, 1935, 1940). .375 in the 1935 WS championship. .379 in the 1934 WS (loss). HR off Dizzy Dean in 1934 WS Game 5. .500 BA in first 6 All-Star Games (10-for-20). Excellent but lacks a single transcendent clutch moment. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by Silent Example. Gehringer was the anti-showman — a player whose excellence was so quiet it could be mistaken for passivity. He wasn't a rah-rah leader. He was a metronome. Every day, the same preparation, the same execution, the same results. Mickey Cochrane: 'He says hello on Opening Day, goodbye on Closing Day, and in between hits .350.' His leadership was in the reliability. You never had to wonder about Gehringer.",
    temperament: "Quiet to the point of legend. At a civic banquet in his honor, his entire speech was: 'I'm known around baseball as saying very little, and I'm not going to spoil my reputation.' When asked why he signed his name 'Chas. Gehringer,' he said: 'Why use seven letters when four will do?' Not cold — just private. Teammates respected the silence because it came with .320 and flawless defense.",
    work_ethic: "Machine-like. Ty Cobb: 'He'd say hello at the start of Spring Training and goodbye at the end of the season and the rest of the time he let his bat and glove do all the talking.' Two consecutive-game streaks of 500+ games. Played every inning of the first 6 All-Star Games. Career-low 13 K in 641 AB in 1936. This isn't talent alone — it's relentless, invisible preparation.",
    lifestyle: "Modest and private. Grew up on a Michigan farm. Worked as a department store clerk and sold coal in the off-season early in his career. Didn't marry until age 46 — delayed because he moved his diabetic mother in with him and didn't want to burden a wife. Became wealthy through an auto accessories business (Gehringer & Forsyth). Quiet life in Beverly Hills, Michigan. No children. Died at 89.",
    era_adaptability: "MAXIMUM. Gehringer's game — contact hitting, plate discipline, elite defense, durability — translates to every era. He struck out 13 times in 641 AB. Modern analytics would worship him. He's the prototype of the modern 'complete second baseman.'",
    clubhouse_impact: "MODERATE-HIGH. Not a vocal presence but a calming, stabilizing force. His consistency raised the floor of every team he was on. Cochrane called him 'the ideal player from the managerial standpoint.' He never caused problems, never needed managing, never had a bad stretch. The clubhouse impact of a metronome: you set your watch to him.",
    dark_side: "Almost none — which is itself a kind of story. Gehringer lived one of the quietest, most dignified lives in baseball history. The 'darkness' is the loneliness: a bachelor until 46, living with his sick mother, private to the point of isolation. Bucky Harris: 'I've never seen one man hit in so much hard luck, consistently. Year after year, he leads the league in line drives right at somebody. No wonder he looks so sad.' Was he sad? Or just quiet? The Mechanical Man gives nothing away.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Mechanical Man", desc: "Immune to hot/cold streaks. Gehringer's performance variance is the lowest of any card. He never goes on a tear; he never slumps. He just hits .330." },
    { tag: "Silent Marvel", desc: "+1 team stability. Gehringer's quiet consistency prevents morale collapse events. His presence steadies the clubhouse without anyone noticing." },
    { tag: "Wind Him Up", desc: "At season start, Gehringer automatically enters 'steady' state. No hot/cold triggers affect him for the first 40 games. Lefty Gomez: 'Wind him up in the spring and shut him off in the fall.'" },
    { tag: "Iron Man", desc: "Injury risk reduced by 50%. Two consecutive-game streaks of 500+. Played every inning of 6 straight All-Star Games. The machine doesn't break down." },
    { tag: "Cobb's Protégé", desc: "+1 CON when mentored by an elite manager. Cobb taught him to swing. Cochrane managed him to the pennant. He thrived under strong leadership." },
    { tag: "G-Men Infield", desc: "Synergy with Hank Greenberg, Goose Goslin, Mickey Cochrane. 3+ Tigers dynasty players = +1 DEF for all infielders." },
    { tag: "Farm Boy", desc: "+1 durability. Grew up doing farm labor in rural Michigan. Built for endurance, not flash." },
    { tag: "The Bachelor", desc: "-1 social/nightlife engagement. Gehringer went home. He didn't carouse. This protects him from nightlife penalties but limits team-bonding events." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Invisible preparation. Always ready, never flashy about it." },
    { location: "Hotel / Rest", affinity: "HIGH", note: "The bachelor goes to his room. Private, recharged by solitude." },
    { location: "Golf Course", affinity: "HIGH", note: "Learned to play right-handed despite being a lefty. Lifelong passion." },
    { location: "Manager's Office", affinity: "MEDIUM", note: "Respected authority but didn't seek it out. Let his play do the talking." },
    { location: "Community Events", affinity: "LOW", note: "Too shy. Avoided the spotlight. Skipped his own HOF induction for his wedding." },
    { location: "Bar / Nightlife", affinity: "NONE", note: "The Mechanical Man didn't go out. He went home." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association whatsoever." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "N/A — The Mechanical Man doesn't get 'hot.' He's always at operating temperature.",
      "All-Star Games (historically .500 in 6 games — he elevated for showcases)",
      "World Series (.321 career — performed under pressure without drama)",
      "Stable team environment with strong manager (Cochrane era)",
    ],
    cold_triggers: [
      "Extremely rare — his floor is so high that cold streaks barely register",
      "Managerial instability (struggled early under lesser managers before Cochrane)",
      "Being benched or losing starting role (happened twice as a young player — devastated him quietly)",
      "Sore arm (1930-31 — only significant injury of career)",
    ],
    pressure_response: "STEADY. Gehringer doesn't spike under pressure the way Simmons does — he maintains. .321 in World Series, .500 in All-Star Games, .375 in the 1935 championship series. He doesn't become superhuman in October; he just doesn't decline. The machine operates at the same level regardless of the stakes.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Mechanical Man",
      type: "Action",
      text: "Your 2B enters 'Machine Mode' for the next 20 games. His stats cannot be modified by any hot/cold triggers, momentum shifts, or morale events. He just produces.",
      origin: "Lefty Gomez: 'You wind him up in the spring, turn him loose, he hits .330 or .340, and you shut him off at the end of the season.'",
    },
    {
      title: "Sixty Doubles",
      type: "Game Action",
      text: "Your highest-CON hitter converts all singles into doubles for 3 games. Gap power activated — every ball finds the alley.",
      origin: "1936: Gehringer led MLB with 60 doubles — one of only six players in history to reach that mark. He also struck out just 13 times.",
    },
    {
      title: "Discovered on a Hunting Trip",
      type: "Drama",
      text: "A scout discovers an unknown amateur player while on vacation. Sign him for $500 or less. 40% chance he becomes a Hall of Famer; 60% chance he's a solid regular.",
      origin: "Bobby Veach heard about Gehringer while hunting in Fowlerville. Ty Cobb was so impressed he signed him on the spot without changing out of his uniform.",
    },
    {
      title: "Hello and Goodbye",
      type: "Drama",
      text: "Your quietest player says nothing all season but hits .350. Team chemistry is unaffected — he neither helps nor hurts morale. But he never misses a game.",
      origin: "Cochrane: 'He says hello on Opening Day, goodbye on Closing Day, and in between hits .350.'",
    },
    {
      title: "The Civic Banquet Speech",
      type: "Drama",
      text: "Your star player is honored at a public event. His entire speech: one sentence. Crowd loves it. +2 fan appeal for its sheer authenticity.",
      origin: "At a civic banquet, Gehringer's speech: 'I'm known around baseball as saying very little, and I'm not going to spoil my reputation.'",
    },
    {
      title: "Why Use Seven Letters",
      type: "Action",
      text: "Your most efficient player optimizes the team's strategy. Remove one unnecessary roster move or bullpen change. Saves you one action card this turn.",
      origin: "When asked why he signed 'Chas.' instead of 'Charles,' Gehringer said: 'Why use seven letters when four will do?'",
    },
    {
      title: "The Diamond Behind the Barn",
      type: "Drama",
      text: "A young prospect grew up playing on a homemade field. If signed, he gains 'Natural Talent': +1 to his best stat permanently.",
      origin: "Young Charlie and his brother laid out a diamond behind the barn — a rock for home, a pump handle for first, a cellar door for third, a rain barrel for second.",
    },
    {
      title: "Satchel's Verdict",
      type: "Action",
      text: "After barnstorming against Negro League stars, your hitter gains respect across all leagues. +1 reputation. Cannot be diminished by racial or league prejudice.",
      origin: "Gehringer barnstormed with Satchel Paige, who called him 'the best white hitter I ever pitched against.' Gehringer said facing Paige was 'no fun.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Quiet, handsome, serious face — not menacing like Simmons, just focused. 5'11\" 180 lbs — lean, athletic, built for endurance not power. Left-handed batter's stance, clean and mechanically perfect. German-American features, dark hair, calm steady eyes that give nothing away.",
    attire: "Detroit Tigers 1936 home whites with the Old English 'D' area (no real logos). Classic wool flannel. Cap straight. Everything neat, everything precise. The uniform of a man who never had a hair out of place.",
    mood: "Quiet excellence. Not flashy, not dramatic — just perfect. The fielding stance of a man who makes every play look easy. Or the batting follow-through of a left-handed doubles machine. This card should feel like competence itself.",
    style: "Warm sepia tones, softer than Simmons's aggressive amber. Navin Field/Briggs Stadium in background. Late-afternoon Michigan light, golden and gentle. The card you almost overlook — until you see the numbers. Ken Burns documentary aesthetic.",
    reference: "Think 1933 Goudey card elegance rendered in ILB sepia style. The anti-highlight-reel card. The card of a man who hit .354 and struck out 13 times.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
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

export default function CharlieGehringerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GEHRINGER_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: LH batting stance, Tigers whites, Navin Field, quiet excellence]</div>
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
              {["🏆 HOF 1949", "⭐ 6× All-Star", "🏅 1937 MVP", "🏆 1935 WS Champ", "📰 .371 Batting Title", "💥 60 2B (1936)"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Gehringer's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Gehringer's Derivation">
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
