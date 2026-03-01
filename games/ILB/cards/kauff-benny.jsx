// /cards/players/benny-kauff.jsx
import { useState } from "react";

const KAUFF_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: BENNY KAUFF
  // Year Snapshot: 1914 (Federal League MVP — Peak Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Benny Kauff",
  nickname: "The Shrinking Violet",
  year: 1914,
  team: "Indianapolis Hoosiers (FL)",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "CF",
  bats: "L",
  throws: "L",
  height: '5\'8"',
  weight: "157 lbs",
  born: "January 5, 1890 — Pomeroy, OH",
  died: "November 17, 1961 — Columbus, OH (age 71)",
  hof: "Banned 1921 (auto theft charge — acquitted at trial, Landis upheld ban). Reinstated posthumously May 2025 by Commissioner Manfred. Never elected.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1914 FEDERAL LEAGUE
  // Source: Baseball-Reference, SABR BioProject, Wikipedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1914,
    games: 154,
    at_bats: 571,
    hits: 211,
    doubles: 44,
    triples: 13,
    home_runs: 8,
    rbi: 95,
    stolen_bases: 75,
    batting_avg: ".370",
    obp: ".447",
    slg: ".534",
    ops: ".981",
    ops_plus: "N/A (FL)",
    war: "N/A (FL)",
    runs_scored: 120,
    walks: 72,
    career_avg: ".311",
    career_hits: 961,
    career_hr: 49,
    career_sb: 234,
    career_war: "~15 (incomplete — FL stats contested)",
    ws_hr: 2,
    ws_rbi: 5,
    ws_avg: ".160",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CON: .370 BA → tier 5 (.330+). Batting champion two consecutive years. CON = 5.
  // POW: 8 HR (1914, FL). 10 HR (1919, NL, 2nd in league). SLG .534. Modest-to-good Deadball power. POW = 1.
  // SPD: 75 SB (1914!), 55 SB (1915), 40 SB (1916 NL). Elite speed. Max tier 3 (31-50+). SPD = 3.
  // DEF: CF, .960 FP. Good outfielder with rifle arm. No Gold Glove data. DEF = 1.
  // CLU: .160 in 1917 WS BUT hit 2 HR (first NL player with 2-HR WS game until 1948). Mixed. CLU = 1.
  // OVR: CON×2(10) + POW×1.5(1.5) + SPD×1(3) + DEF×0.5(0.5) = 15 → normalized ~8
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star / borderline Elite — five-tool talent, dominant in FL, very good in NL
    con: 5,      // .370 FL batting title. .342 second title. .311 career. Elite contact across all leagues. Max.
    pow: 1,      // 8 HR (1914), 10 HR (1919, 2nd NL). SLG .534 in FL. Decent power for 5'8" 157 lbs in Deadball Era.
    spd: 3,      // 75 SB in 1914 — staggering. 55 SB in 1915. 40 SB in 1916 NL. Maximum speed tier.
    def: 1,      // Good CF with strong arm (coal miner's arm). .960 FP across all three OF positions. Solid, not spectacular.
    clu: 1,      // .160 in 1917 WS — rough average. BUT first NL player to hit 2 HR in a WS game (Game 4, 3 RBI). Mixed clutch: capable of brilliance but inconsistent.
  },

  stat_justification: {
    con: "Won the batting title in three consecutive seasons with three different teams — .345 (Hartford, 1913), .370 (Indianapolis FL, 1914), .342 (Brooklyn FL, 1915). Career .311 across all leagues. OPS+ of 136 in NL years (comparable to Freddie Freeman). Also led FL in hits (211) and OBP (.447) in 1914. Kauff could flat-out hit. Rating of 5.",
    pow: "8 HR in 1914 FL, 10 HR in 1919 NL (2nd in league). 49 career HR. SLG .534 in 1914, .450 career. For a 5'8\" 157-lb Deadball Era player, this was notable power — he hit for extra bases consistently (44 2B, 13 3B in 1914). He hit 2 HR in the 1917 World Series. Rating of 1 — good pop for the era, not a slugger.",
    spd: "75 stolen bases in 1914 — an extraordinary number in any era. 55 SB in 1915. 40 SB in first NL season (1916). 234 career SB in only 859 games. Won a base-circling race. Described as 'quick' and exceptionally fast on the bases. His legs were 'two feet tall but three feet wide' — a compact speedster. Rating of 3 — maximum speed.",
    def: "Played all three OF positions, primarily CF. Strong throwing arm developed from years in coal mines as a child. .960 fielding percentage. Good range in center. Not a defensive wizard but solid and athletic. Rating of 1.",
    clu: "Hit .160 (4-for-25) in the 1917 World Series — not great. But hit 2 home runs in Game 4, becoming the first NL player to do so in a WS game (a record that stood until 1948). 3 RBI in that game, a 5-0 Giants win. The contrast between the overall .160 and the Game 4 explosion perfectly captures Kauff: capable of spectacular moments amid overall inconsistency. Rating of 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Shameless self-promoter, loudest voice in any room. Kauff was the Deion Sanders of the Deadball Era — 'I'll make them all forget that a guy named Ty Cobb ever pulled on a baseball shoe.' He led by attention, not by example. McGraw said he 'wanted to be a star but didn't value the team.' But his confidence was infectious, and when he backed it up, the crowd went wild.",
    temperament: "Brash, cocky, fun-loving, irrepressible. Damon Runyon called him 'a companion piece to Tyrus Raymond Cobb and Tris Speaker' on the field, and 'a sort of Diamond Jim Brady reduced to a baseball salary size' off it. He could chew tobacco, smoke a cigar, and drink a glass of beer simultaneously 'without interruption to any of the three pursuits.' He was nicknamed 'The Shrinking Violet' with maximum irony — there was nothing shrinking about Benny Kauff.",
    work_ethic: "Aggressive, occasionally reckless. Kauff threw himself into everything — he once got picked off first base three times in one game. His intensity was real but undisciplined. He hit like a man trying to propel his entire body into the pitch — left leg kicking into the air, leaning back, slashing opposite-field. The effort was always maximal; the results were inconsistent.",
    lifestyle: "Flashy beyond anything the era had seen. Reported to Giants spring training in 1916 wearing a striped suit, bright shirt, large gold medallion, several diamond rings, diamond tiepins, and $7,500 in his pocket. Owned an automobile accessories business with his half-brother. Coal miner's son who reinvented himself as a Broadway dandy. A Coen Brothers tragicomedy waiting to happen.",
    era_adaptability: "HIGH. Kauff's five-tool skill set — contact, speed, moderate power, defense, arm — translates to any era. His personality would thrive in the modern media age. He'd be a social media sensation, a Nike endorser, a podcast host. The talent was real; the mouth was bigger.",
    clubhouse_impact: "ELECTRIC but divisive. Teammates either loved his energy or resented his self-promotion. He was fun — 'a hell of a lot of fun,' as SABR put it. He turned down Chase's bribe and reported it to McGraw, proving his integrity was real even if his judgment was questionable. The clubhouse was louder, more entertaining, and more chaotic with Kauff in it.",
    dark_side: "The tragedy of Benny Kauff isn't corruption — it's bad luck. Unlike Hal Chase, who was genuinely crooked, Kauff's ban was almost certainly unjust. He was acquitted of the auto theft charges in under an hour. A jury believed him. But Landis called the acquittal 'one of the worst miscarriages of justice' he'd ever seen and banned Kauff anyway. The judge who heard Kauff's appeal wrote: 'an apparent injustice has been done the plaintiff.' Kauff spent the rest of his life as a bootlegger, was arrested several times, and died in obscurity at 71 — buried in an unmarked grave. His ban wasn't lifted until 2025, 64 years after his death. In ILB: Kauff carries the 'Unjust Ban' trait — a system card that can remove any player from the game regardless of guilt.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Ty Cobb of the Feds", desc: "Kauff claimed he'd make everyone forget Cobb. In the Federal League, he nearly did. +2 CON and +1 SPD in any 'outlaw' or alternative league game. In the NL/AL: stats drop to normal." },
    { tag: "Diamond Jim", desc: "Kauff arrives in camp dripping with jewelry and $7,500 cash. +2 team morale from sheer entertainment value. But -1 team chemistry from resentment. The locker room is never boring." },
    { tag: "Coal Miner's Son", desc: "Left school at 11 to work the mines. Kauff's arm and toughness come from the pit. +1 physical endurance. He will never quit, no matter how much punishment he takes." },
    { tag: "The Shrinking Violet", desc: "Maximum trash talk. Before every big game, Kauff makes a public boast. Roll d6: 1-3 = he backs it up (+2 performance). 4-6 = the boast falls flat (-1 and opponent gets +1 motivation)." },
    { tag: "Bribe Refuser", desc: "When Chase and Zimmerman offered $500 to throw a game, Kauff reported them. +2 integrity rating. Cannot be corrupted — but can still be falsely accused." },
    { tag: "Unjust Ban", desc: "Kauff can be removed from the game by a Commissioner ruling, even after acquittal. The ban has nothing to do with guilt — it's about 'character and reputation.' The most Kafkaesque trait in ILB." },
    { tag: "Five-Tool Flash", desc: "Contact, power, speed, arm, defense — Kauff can do everything. In any game where he's hot, roll for which tool activates at +2. The problem: it's random. You never know which Kauff shows up." },
    { tag: "Picked Off Three Times", desc: "On May 26, 1916, Kauff was picked off first base three times in one game. His aggression on the bases occasionally crosses into recklessness. -1 baserunning IQ in high-risk situations." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Broadway / Nightlife", affinity: "HIGH", note: "Diamond Jim Brady on a baseball salary. Kauff belonged in the spotlight — striped suits, gold medallions, the whole show." },
    { location: "Ballfield", affinity: "HIGH", note: "This is where the boasts get tested. Kauff played with visible joy and intensity. He loved performing." },
    { location: "Press Box / Media", affinity: "HIGH", note: "'I'll bunt a home run into that right field stand every day.' Kauff was born for the interview room." },
    { location: "Auto Dealership", affinity: "MEDIUM", note: "Owned a car accessories business. This is where the trouble started — and it wasn't even his fault." },
    { location: "Coal Mine / Factory", affinity: "MEDIUM", note: "Where he came from. Left school at 11. Built his body in the mines. Never forgot his roots — but never went back." },
    { location: "Courtroom", affinity: "LOW", note: "Acquitted in under an hour. Still banned. The courtroom was where Kauff's luck always ran out." },
    { location: "Unmarked Grave", affinity: "NONE", note: "Buried without a headstone in Columbus, OH. The final indignity for baseball's most flamboyant forgotten star." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "New league / new team — Kauff exploded every time he arrived somewhere fresh (.370 in 1914 FL, strong 1916 NL debut).",
      "Being doubted — tell Kauff he can't do something and he'll hit .370 to prove you wrong.",
      "Big crowds — Kauff was a performer. The bigger the audience, the harder he played.",
      "Rivalry games — especially against Ty Cobb. Kauff lived to prove himself against the best.",
    ],
    cold_triggers: [
      "Established league / second year — Kauff's numbers always dropped after the novelty wore off.",
      "Manager scrutiny — McGraw's discipline clashed with Kauff's freelancing style.",
      "Off-field trouble — the auto theft charge, the rumors, the suspicion. When the cloud descended, his play suffered.",
      "World Series pressure — .160 BA in the 1917 WS (offset by 2 HR, but overall poor).",
    ],
    pressure_response: "EXPLOSIVE but INCONSISTENT. Kauff was capable of transcendent individual moments — the 2-HR World Series game, the .517 September stretches, the outrageous predictions that occasionally came true. But he couldn't sustain it. His WS average was .160. His NL stats never matched his FL dominance. In ILB: Kauff is a boom-or-bust clutch performer. When he's on, he's the most exciting player on the field. When he's off, the boasts ring hollow and the team is worse for having relied on him.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Ty Cobb of the Feds",
      type: "Game Action",
      text: "A flashy young player dominates a rival league, winning back-to-back batting titles and stealing 75 bases. The established leagues want him. His price tag: $35,000 and the promise that he'll replace Ty Cobb in the public imagination. Will he deliver? Roll the dice.",
      origin: "Kauff won batting titles in both FL seasons (.370, .342) and was sold to the Giants for $35,000 — a massive sum. He declared he'd make everyone forget Ty Cobb. He did not.",
    },
    {
      title: "I'll Bunt a Home Run Every Day",
      type: "Game Action",
      text: "At his introductory press conference, your new acquisition makes an impossible boast. The fans are thrilled. The opponents are motivated. Your player must now back up the claim. Fail: -2 credibility and the press turns hostile. Succeed even partially: +3 fan loyalty.",
      origin: "Kauff literally told reporters he would 'bunt a home run into that right field stand every day.' The Braves refused to let him take the field. He was sent back to Brooklyn.",
    },
    {
      title: "Picked Off Three Times",
      type: "Game Action",
      text: "Your fastest player, running wild on the bases, gets picked off first base. Then again. Then a third time. In the same game. The opposing pitcher can't believe it. Your manager can't believe it. The crowd doesn't know whether to laugh or cry.",
      origin: "On May 26, 1916, Kauff became the only player in the 20th century to be picked off first base three times in a single game.",
    },
    {
      title: "Two Homers in the Fall Classic",
      type: "Game Action",
      text: "Your centerfielder has been struggling all Series — hitting barely above .100. Then in one game, he erupts for two home runs, driving in three runs in a shutout victory. It's the greatest individual WS game by any NL player in decades. The team still loses the Series.",
      origin: "Kauff hit .160 in the 1917 WS but hit 2 HR in Game 4 (5-0 Giants win) — the first NL player to do so in a WS game, a record that stood until 1948. The Giants lost the Series 4-2.",
    },
    {
      title: "The Bribe He Refused",
      type: "Drama",
      text: "Two corrupt teammates approach your star player with $500 to throw a game. He refuses and reports them to the manager. His integrity is confirmed. But the association with the corrupt players follows him — and years later, a commissioner will use it against him.",
      origin: "In 1919, Hal Chase and Heinie Zimmerman offered Kauff $500 to throw a game. Kauff refused and reported them to McGraw. The incident proved his honesty — but the proximity to corruption haunted him.",
    },
    {
      title: "The Commissioner's Injustice",
      type: "Drama",
      text: "Your player is charged with a crime. A jury acquits him in under an hour. The commissioner calls the acquittal 'a miscarriage of justice' and bans the player anyway. An appeals court agrees it's unjust — but upholds the ban. Your player is gone. Forever. The system doesn't care about truth.",
      origin: "Landis banned Kauff despite his acquittal, calling the verdict 'one of the worst miscarriages of justice.' Justice Whitaker wrote 'an apparent injustice has been done the plaintiff' — but upheld the ban on jurisdictional grounds. Kauff never played again.",
    },
    {
      title: "Diamond Jim on a Baseball Salary",
      type: "Action",
      text: "Your new player arrives at spring training in a striped suit, gold medallion, diamond rings, diamond tiepins, and $7,500 in cash. He is 5'8\" and weighs 157 pounds. He is the most confident human being alive. The team has never seen anything like this. +3 entertainment, +2 controversy.",
      origin: "Kauff's 1916 arrival with the Giants was legendary. Damon Runyon wrote he was 'a sort of Diamond Jim Brady reduced to a baseball salary size.'",
    },
    {
      title: "The Unmarked Grave",
      type: "Drama",
      text: "Decades after his ban, your forgotten player dies in obscurity. He's buried in an unmarked grave. No headstone. No ceremony. Sixty-four years later, a new commissioner lifts the ban — posthumously. The injustice is acknowledged. But the man is long gone.",
      origin: "Kauff died in 1961 and was buried in an unmarked plot in Columbus, OH. His ban was finally lifted in May 2025 by Commissioner Manfred. He is now eligible for HOF consideration.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, muscular face of an Ohio coal miner's son turned Broadway dandy. 5'8\" 157 lbs — stocky, powerful, low center of gravity. Legs that are 'two feet tall but three feet wide.' Bright, cocky grin — the look of a man who just told Damon Runyon he's better than Ty Cobb and believes every word. Left-handed batter with a dramatic high-kick swing.",
    attire: "Indianapolis Hoosiers Federal League uniform, 1914 — or alternatively, the famous arrival outfit: striped suit, bright shirt, gold medallion, diamond rings, diamond tiepins. The card should lean into the showmanship. If in uniform: baggy Deadball Era wool flannel, mid-swing with the exaggerated left-leg kick that was his signature.",
    mood: "Pure exuberance with a shadow of tragedy. Kauff should radiate the joy and swagger of a man who believes he's the greatest player alive. But the viewer — knowing the story — should feel the cosmic unfairness approaching. Like Chapman's poignancy but different: Chapman was mourned; Kauff was forgotten. The card should make you want to remember him.",
    style: "Sepia-toned with the brightest golden highlights of any Muggers card — Kauff was the flashiest player in the set, and the card should reflect it. A hint of glitter or shimmer around the gold accents. The shadows should be minimal — Kauff lived in the light. Until the light went out.",
    reference: "If Smoky Joe Wood is bottled lightning, Ray Chapman is a candle, and Hal Chase is a stolen jewel, then Benny Kauff is a firecracker. Loud, bright, impossible to ignore, spectacular while it lasts — and then gone. The ILB Kauff card should feel like holding a 4th of July sparkler: dazzling, dangerous, too brief.",
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

export default function BennyKauffCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = KAUFF_DATA; const s = d.ilb_stats;
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.gold}30, ${C.sepia}20)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>💎</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "R", val: d.real_stats.runs_scored },{ label: "H", val: d.real_stats.hits },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "2B", val: d.real_stats.doubles }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} FEDERAL LEAGUE — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "WS HR", val: d.real_stats.ws_hr },{ label: "WS RBI", val: d.real_stats.ws_rbi },{ label: "BANNED", val: "1921" },{ label: "FREED", val: "2025" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 8 SEASONS • BANNED 1921 • REINSTATED 2025</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 2× FL Batting Title", "⚡ 75 SB (1914)", "🏆 FL Pennant '14", "⚾ 2 HR in WS Game", "💎 Diamond Jim Style", "⚠️ Banned (Unjust)", "🕊️ Reinstated 2025", "🔥 .370 BA (1914)"].map((a, i) => (
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
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Kauff's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Kauff's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
