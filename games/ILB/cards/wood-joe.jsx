// /cards/players/joe-wood.jsx
import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: SMOKY JOE WOOD
  // Year Snapshot: 1912 (Peak Season — The Greatest Single Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Joe Wood",
  nickname: "Smoky Joe",
  year: 1912,
  team: "Boston Red Sox",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "180 lbs",
  born: "October 25, 1889 — Kansas City, MO",
  died: "July 27, 1985 — West Haven, CT (age 95)",
  hof: "Not inducted. Peak vote: 18% (1947). Boston Red Sox HOF (1995). Named to 100 Greatest Players list (Ritter/Honig, 1981).",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1912 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1912,
    games: 43,
    wins: 34,
    losses: 5,
    era: "1.91",
    innings: "344.0",
    strikeouts: 258,
    walks: 82,
    complete_games: 35,
    shutouts: 10,
    whip: "1.02",
    war: 9.5,
    career_wins: 117,
    career_losses: 57,
    career_era: "2.03",
    career_strikeouts: 989,
    career_cg: 121,
    career_shutouts: 28,
    career_war: 40.1,
    no_hitters: 1,
    perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF): ERA 1.91 → tier 4 (1.50-1.99). K/9 = 6.74 → +1 bonus. STF = 5.
  // CONTROL (CTL): BB/9 = 2.14 → tier 2 (2.0-2.49). WHIP 1.02 → no bonus. CTL = 2.
  // STAMINA (STA): 344 IP → tier 4 (300-349). STA = 4.
  // DEFENSE (DEF): Led pitchers in putouts 1912. Good fielder but no GG era. DEF = 1.
  // CLUTCH (CLU): 3-1 in 1912 WS. Won deciding Game 8 vs Mathewson. CLU = 3.
  // OVERALL: STF×2(10) + CTL×1.5(3) + STA×1(4) + DEF×0.5(0.5) = 17.5 → normalized ~10
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite / MVP — one of the greatest single seasons ever, but career was brief
    stf: 5,      // 1.91 ERA → tier 4. K/9 of 6.74 → +1 bonus = 5. Maximum stuff — the hardest thrower in baseball in 1912.
    ctl: 2,      // BB/9 of 2.14 → tier 2. WHIP 1.02 → no bonus (needs ≤1.00). Wood was a power pitcher, not a control artist.
    sta: 4,      // 344 IP → tier 4 (300-349). 35 complete games. Workhorse, but not quite the 350+ IP of a Cy Young.
    def: 1,      // Led AL pitchers in putouts 1912. Good fielding pitcher. Above-average for the position but not elite.
    clu: 3,      // 3-1 in 1912 World Series. Won the clinching Game 8 in relief vs Christy Mathewson. First pitcher with 11 K in WS game. Maximum clutch.
  },

  stat_justification: {
    stf: "1.91 ERA in 1912 — led the AL and earned the Pitching Triple Crown (wins, strikeouts, ERA). K/9 of 6.74 was elite for the Deadball Era — he led the AL in SO/9 in 1911 at 7.5. Walter Johnson himself said there was no man alive who could throw harder. Wood earned his 'Smoky' nickname from the smoke on his fastball. He also featured a devastating curveball and changeup. This is a maximum 5.",
    ctl: "BB/9 of 2.14 in 1912 — 82 walks in 344 innings. Wood was a power pitcher who relied on overwhelming stuff rather than pinpoint control. His WHIP of 1.02 was excellent but driven by his dominance, not Greg Maddux precision. He walked 4 batters in a row in one inning during the loss that ended his 16-game win streak. Rating of 2 — good but not his strength.",
    sta: "344 innings pitched in 1912. 35 complete games in 43 starts. 10 shutouts — led the majors. But Wood's arm was always under tremendous strain from his violent delivery. Johnson noted Wood could throw as hard as him for 2-3 innings but his mechanics were punishing. The arm would eventually break down catastrophically in 1913. Rating of 4 — elite output, fragile vessel.",
    def: "Led AL pitchers in putouts in 1912. Good athlete — he later successfully converted to outfielder with Cleveland. Hit .290 in 1912. But as a pitcher, his fielding was competent rather than elite. Rating of 1.",
    clu: "Won 3 games in the 1912 World Series against the Giants, including the deciding Game 8 where he came in as a reliever and beat Christy Mathewson in extra innings. Struck out 11 batters in a single WS game — the first pitcher ever to reach double-digit K's in the Fall Classic. His 16-game winning streak peaked in a 1-0 duel against Walter Johnson that was hyped like a heavyweight fight. 3 World Series rings (1912, 1915, 1920). Maximum clutch rating.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet confidence with a fierce competitive streak. Wood was not a rah-rah leader but a presence — when he took the mound, the whole team elevated. His teammates rallied around him in 1912 because they knew: if Smoky Joe had the ball, they were going to win. He later recalled standing atop the majors: 'I was the king of the hill, top of the heap, right along with the very best.'",
    temperament: "Calm exterior, volcanic interior. Wood was a small-town boy from the Colorado mountains who carried himself with quiet dignity. But on the mound, he threw with such violence that he said his arm might 'fly right off my body.' A fierce competitor who rose to the biggest occasions — the Johnson duel, Game 8 of the World Series — with ice-cold focus.",
    work_ethic: "Intense but unsustainable. Wood threw so hard his delivery was described as 'putting tremendous strain on the arm.' He didn't pace himself — every pitch was maximum effort. This made him devastating for two seasons and broken by 26. His work ethic wasn't about discipline or routine; it was raw, furious commitment to being unhittable in every at-bat.",
    lifestyle: "Outdoorsman from Colorado mining country. Wood grew up in Ouray, a small mountain town where he pitched for the local team at age 14. He later played for a barnstorming 'Bloomer Girls' team disguised as female. Married Laura O'Shea after the 1912 season. Settled, family-oriented, but always carried the spirit of the frontier — independent, self-reliant, unafraid.",
    era_adaptability: "COMPLEX. Wood's fastball velocity would translate to any era — he threw as hard as Walter Johnson, who threw as hard as anyone until the modern era. But his violent delivery would likely lead to Tommy John surgery in a modern context. In ILB terms: Wood is a high-risk, high-reward asset. When healthy, he's the best pitcher in any rotation. But the clock is always ticking on his arm.",
    clubhouse_impact: "RESPECTED-STEADY. Wood was universally liked but not the loudest voice. His closest friendship was with Tris Speaker — they were roommates in Boston and reunited in Cleveland when Wood reinvented himself as an outfielder. Wood's loyalty and grit earned deep respect. He played through pain for years rather than quit.",
    dark_side: "The tragedy of unrealized potential. Wood's career as a pitcher lasted effectively two great seasons before injury destroyed his arm at 23. He spent the rest of his life in the shadow of what might have been. 'I was the king of the hill,' he said, 'top of the heap.' Then it all collapsed like 'a tumbling house of cards.' In ILB terms: Wood carries a 'Glass Arm' trait — a catastrophic injury can end his pitching career at any moment, forcing a position change or retirement.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Smoke", desc: "Walter Johnson said nobody alive throws harder. When Wood is Hot, opposing batters get -1 CON from sheer velocity." },
    { tag: "Glass Arm", desc: "Wood's violent delivery guarantees eventual breakdown. Each season, roll for arm injury. If triggered, STF drops to 1 permanently — but he can convert to outfielder." },
    { tag: "Streak Pitcher", desc: "When Wood wins 3+ consecutive starts, he enters 'Streak Mode': +1 STF until the streak breaks. His 16-game win streak is the template." },
    { tag: "Frontier Grit", desc: "Raised in Colorado mining country. Wood gains +1 morale in Western-themed or rural environments. Never complains about conditions." },
    { tag: "Speaker's Roommate", desc: "Best friends with Tris Speaker. When both are on the same roster, +2 chemistry bonus. Wood will follow Speaker to any team." },
    { tag: "Two-Career Man", desc: "If Wood's pitching career ends, he can convert to OF at age-adjusted stats. He hit .283 lifetime and .366 in one season as an outfielder." },
    { tag: "World Series Ace", desc: "In elimination games and World Series starts, Wood gets +1 to all pitching stats. He won the clinching game of the 1912 World Series against Mathewson." },
    { tag: "The Bloomer Girl", desc: "Wood once barnstormed disguised as a woman on a Bloomer Girls team. +1 adaptability — he'll do whatever it takes to play ball." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His domain. 344 innings in 1912. Every pitch thrown like it might be his last." },
    { location: "Mountain / Outdoors", affinity: "HIGH", note: "Grew up in Ouray, CO at 7,800 ft elevation. Mountain air in his lungs." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Quiet but present. Close bond with Speaker and the 1912 Red Sox core." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Needed rest between starts. His arm demanded it even in his prime." },
    { location: "University / Library", affinity: "MEDIUM", note: "Coached baseball at Yale for 20 years after his playing career ended." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a drinker or partier. Small-town values kept him grounded." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Uncomfortable with the hype. The Johnson duel was promoted like a prizefight — Wood just wanted to pitch." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Winning streaks — Wood's 16-game streak in 1912 is the template. Momentum compounds.",
      "Big-game matchups — dueling Johnson, facing Mathewson. Wood rose to the occasion.",
      "Fenway Park atmosphere — the 1912 Red Sox at new Fenway were electric.",
      "Postseason — 3-1 in the 1912 WS with 21 K in 22 IP.",
    ],
    cold_triggers: [
      "Arm pain — any hint of injury triggers a spiral. Wood pitched through pain from 1913-1915 and was never the same.",
      "Errors behind him — the streak ended partly due to a shortstop's error. Wood needed clean defense.",
      "Long layoffs — sat out all of 1916. Rust was real.",
    ],
    pressure_response: "TRANSCENDENT when healthy. Wood's 1912 is a masterclass in rising to pressure: the Johnson duel hyped like a heavyweight fight — he threw a 1-0 shutout. The World Series clincher against Mathewson — he came in as a reliever and won in extra innings. He struck out 11 in a single WS game, a record at the time. But if the arm is hurting, pressure becomes unbearable — the body can't deliver what the mind demands. In ILB: Wood is either your best pitcher or your most heartbreaking one. There is no middle ground.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Prizefight on the Mound",
      type: "Game Action",
      text: "Two ace pitchers face off in a matchup hyped like a heavyweight bout. 29,000 fans pack the stadium. Both pitchers get +2 STF for this game only. The winner's team gains +3 momentum. The loser's ace takes no penalty — it was that close.",
      origin: "The September 6, 1912 duel between Wood and Walter Johnson at Fenway Park, promoted by newspapers like a boxing match. Wood won 1-0 on a Tris Speaker double.",
    },
    {
      title: "Sixteen Straight",
      type: "Game Action",
      text: "Your ace is on a historic winning streak. Each consecutive win adds +1 to his next start (cumulative, max +5). But the pressure mounts: after win 10, roll a d6 each start — on a 1, the streak snaps due to circumstances beyond his control.",
      origin: "Wood's 16 consecutive wins in 1912, tying Walter Johnson's AL record. The streak ended on an error by a substitute shortstop.",
    },
    {
      title: "The Arm Gives Out",
      type: "Drama",
      text: "Your ace slips fielding a grounder and breaks his thumb. He's out 6 weeks. When he returns, roll a d6: on 1-3, he's permanently lost 2 STF. On 4-6, he recovers fully. Either way, arm trouble will haunt him.",
      origin: "In July 1913, Wood slipped on wet grass fielding a bunt, breaking his thumb. His arm was never the same. 'A tumbling house of cards.'",
    },
    {
      title: "The Bloomer Girl Tryout",
      type: "Drama",
      text: "An unknown young player shows up from an unconventional background — barnstorming, independent leagues, even disguised on a women's team. Sign him: he gains +3 STF for his rookie season as opponents have never seen him.",
      origin: "Wood began his career playing for a Bloomer Girls barnstorming team, disguised as a female player, before being discovered by the Red Sox.",
    },
    {
      title: "Second Career",
      type: "Action",
      text: "Your injured pitcher refuses to quit baseball. He converts to outfielder. Lose all pitching stats — gain CON 3 / POW 1 / SPD 1 / DEF 1 as an everyday player. If he was elite as a pitcher, this feels like a demotion — but he's still in the game.",
      origin: "After his arm died, Wood sat out 1916, then reinvented himself as an outfielder for Cleveland (1917-1922), hitting .283 with a .366 season. He won another World Series ring in 1920.",
    },
    {
      title: "Game Eight",
      type: "Game Action",
      text: "World Series, deciding game. Your ace comes in as a reliever to face the opposing team's legendary pitcher. Extra innings. The opponent scores first. Then a fly ball is dropped. Your team rallies to win. +5 franchise reputation. The ace gains 'Immortal Moment' trait.",
      origin: "Game 8 of the 1912 World Series: Wood relieved in the 8th, matched Mathewson through extras. Merkle scored in the 10th, but Snodgrass dropped a fly ball. Red Sox rallied to win 3-2.",
    },
    {
      title: "The Yale Professor",
      type: "Drama",
      text: "Your retired player is offered a coaching position at a prestigious university. He accepts and coaches there for 20 years. His son eventually plays professionally. +3 legacy. The player gains the 'Educator' trait.",
      origin: "After retiring, Wood coached Yale baseball for 20 years (1923-1942). His son Joe Jr. pitched briefly for the 1944 Red Sox. In 1985, Yale President Giamatti gave Wood an honorary doctorate — he wept.",
    },
    {
      title: "That Boy Throws Smoke",
      type: "Action",
      text: "A sportswriter watching your pitcher coins an unforgettable nickname. The pitcher gains +1 Intimidation permanently. Opposing batters who face him for the first time get -1 CON from reputation alone.",
      origin: "Boston Post sportswriter Paul Shannon, watching Wood pitch in 1912, remarked: 'Gee, that boy throws smoke.' The nickname 'Smoky Joe' was born.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, angular face of a young man from the frontier. 5'11\" 180 lbs — wiry and athletic, not bulky. Sharp jawline, intense eyes, clean-shaven. The look of a Colorado mountain kid who happens to throw harder than anyone alive. Young — only 22 in his peak season. There should be a coiled energy in his expression, like a spring about to release.",
    attire: "Boston Red Sox 1912 whites — the first season at Fenway Park. Baggy wool flannel, high collar (the Red Sox were the last team to wear laced collars). Full windup pose — the violent, whipping delivery that made batters say they couldn't see the ball. Or mid-follow-through, smoke trailing from his fingertips metaphorically.",
    mood: "Ferocious focus. Not calm like Cy Young — electric. The intensity of a 22-year-old who knows he's the best pitcher in baseball right now, in this moment. There's an urgency to it, as if he senses the window is finite. Fire and smoke. The portrait should feel like it captures the one instant before the fastball arrives.",
    style: "Rich sepia with warm golden highlights and a subtle hint of smoke or haze — fitting the 'Smoky' nickname. Fenway Park in the background, brand new in 1912, packed with a standing-room crowd. The card should feel urgent and kinetic compared to the serene authority of a Cy Young card. This is youth and raw power, not wisdom.",
    reference: "Think of a young gunslinger's portrait. Wood is the fastest draw in town — and everyone knows it. The ILB Smoky Joe Wood card should feel like bottled lightning. Not the heaviest card in the collection, but the most electrifying.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE_PITCHER = {
  stuff: {
    metric: "ERA (peak season)",
    tiers: [
      { range: "<1.50", value: 5 },
      { range: "1.50-1.99", value: 4 },
      { range: "2.00-2.49", value: 3 },
      { range: "2.50-2.99", value: 2 },
      { range: "3.00-3.49", value: 1 },
      { range: "3.50+", value: 0 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 (peak season)",
    tiers: [
      { range: "<1.0 BB/9", value: 5 },
      { range: "1.0-1.49", value: 4 },
      { range: "1.5-1.99", value: 3 },
      { range: "2.0-2.49", value: 2 },
      { range: "2.5-2.99", value: 1 },
      { range: "3.0+", value: 0 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched (peak season)",
    tiers: [
      { range: "<150 IP", value: 0 },
      { range: "150-199", value: 1 },
      { range: "200-249", value: 2 },
      { range: "250-299", value: 3 },
      { range: "300-349", value: 4 },
      { range: "350+", value: 5 },
    ],
  },
  defense: { metric: "Same as position players" },
  overall: {
    formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13",
    tiers: [
      { range: "3-4", label: "Replacement" },
      { range: "5-6", label: "Solid Starter" },
      { range: "7-8", label: "All-Star" },
      { range: "9-10", label: "Elite / MVP" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
  clutch: {
    metric: "Postseason ERA + signature moments",
    tiers: [
      { range: "PS ERA > 4.00", value: 0 },
      { range: "PS ERA 2.00-4.00", value: 1 },
      { range: "PS ERA < 2.00", value: 2 },
    ],
    bonus: "WS clincher / perfecto → +1 (cap 3)",
  },
};

// Color palette
const C = {
  parchment: "#f5edd6",
  darkBrown: "#3a2a1a",
  medBrown: "#6b5339",
  gold: "#c9a84c",
  warmRed: "#8b3a2a",
  sepia: "#a0845c",
  cream: "#faf3e3",
  ink: "#2a1f14",
  hotRed: "#c44536",
  coldBlue: "#3a6b8c",
  traitGreen: "#4a7c59",
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

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function JoeWoodCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;
  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>

      {/* Card Container */}
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Placeholder */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.sepia}40, ${C.darkBrown}30)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🔥</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>
                  See Art Notes tab for<br />AI image generation prompt
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            {/* Player Name */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            {/* Pitcher Stat Bars */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "BB", val: d.real_stats.walks },
                { label: "IP", val: d.real_stats.innings },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "WAR", val: d.real_stats.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            {/* Career Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[
                { label: "CAR W", val: d.real_stats.career_wins },
                { label: "CAR L", val: d.real_stats.career_losses },
                { label: "CAR ERA", val: d.real_stats.career_era },
                { label: "CAR K", val: d.real_stats.career_strikeouts },
                { label: "CAR CG", val: d.real_stats.career_cg },
                { label: "CAR SHO", val: d.real_stats.career_shutouts },
                { label: "NO-HIT", val: d.real_stats.no_hitters },
                { label: "CAR WAR", val: d.real_stats.career_war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 14 SEASONS (PITCHER + OUTFIELDER)</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "🏆 3× WS Champ",
                "🔥 34-5 in 1912",
                "👑 Pitching Triple Crown",
                "⚡ 16-Game Win Streak",
                "📜 No-Hitter (1911)",
                "🎖️ Beat Johnson 1-0",
                "🏟️ Fenway Park Opener",
                "🎓 Yale Coach 20 Yrs",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* BACK OF CARD — DOSSIER */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  {Object.entries(d.personality).map(([key, val]) => (
                    <Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}>
                      <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                    </Section>
                  ))}
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section title="Preferred Locations">
                    {d.preferred_locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">
                    {d.momentum.hot_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="❄ Cold Triggers">
                    {d.momentum.cold_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p>
                  </Section>
                </>
              )}

              {tab === "actions" && (
                <>
                  <Section title="Action Card Seeds">
                    <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      These events, derived from Wood's real life, become universal cards playable in any game.
                    </p>
                    {d.action_card_seeds.map((a, i) => (
                      <div key={i} style={{
                        background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`,
                        borderRadius: 4, padding: 10, marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                          <span style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 2,
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                            fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          }}>{a.type}</span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                        <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "engine" && (
                <>
                  <Section title="⚾ Pitcher Stat Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.
                    </p>
                    {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>
                          {key} — {data.metric || data.formula}
                        </div>
                        {data.tiers && (
                          <div style={{ marginTop: 4 }}>
                            {data.tiers.map((t, i) => (
                              <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>
                                {t.range} → {t.value !== undefined ? t.value : t.label}
                              </div>
                            ))}
                          </div>
                        )}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Wood's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  position: d.position,
  era: d.era,
  ilb_team: d.ilb_team,
  stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu },
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
