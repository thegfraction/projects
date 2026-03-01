// /cards/players/hippo-vaughn.jsx
import { useState } from "react";

const VAUGHN_DATA = {
  name: "Hippo Vaughn",
  nickname: "The Texas Hippo",
  year: 1918,
  team: "Chicago Cubs",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SP",
  bats: "S",
  throws: "L",
  height: '6\'4"',
  weight: "215 lbs",
  born: "April 9, 1888 — Weatherford, TX",
  died: "May 29, 1966 — Chicago, IL (age 78)",
  hof: "Never inducted. Never received a HOF vote. From 1914-1920 his WAR was 3rd in all of baseball, behind only Walter Johnson and Grover Alexander. The greatest lefty the Cubs ever had, forgotten by Cooperstown.",

  real_stats: {
    season: 1918, games: 35, wins: 22, losses: 10, era: "1.74",
    innings: "290.1", strikeouts: 148, walks: 76, complete_games: 27,
    shutouts: 8, whip: "0.97", war: 7.3,
    career_wins: 178, career_losses: 137, career_era: "2.49",
    career_strikeouts: 1416, career_shutouts: 41, career_war: 39.9,
    ws_era: "1.00", ws_cg: 3, ws_record: "1-2",
    peak_era_1914_1920: "2.16",
    peak_wins_1914_1920: 143,
    peak_war_1914_1920: 33.6,
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT CONVERSION — 1918 SEASON
  //
  // STF: 1.74 ERA → tier 4 (1.50-1.99). K/9 = 148K/290.1IP × 9 = 4.59. No K bonus (needs ≥6.0). STF = 4.
  // CTL: BB/9 = 76BB/290.1IP × 9 = 2.36 → tier 2 (2.0-2.49). WHIP 0.97 → +1 bonus. CTL = 3.
  // STA: 290.1 IP → tier 3 (250-299). 27 CG. STA = 3.
  // DEF: Led NL in errors by a pitcher (64 career NL record). Terrible. DEF = 0.
  // CLU: 1.00 ERA in 1918 WS (3 CG). Lost 1-0 to Babe Ruth. Lost 2-1 to Carl Mays. Won shutout Game 5. Magnificent in defeat. CLU = 2.
  // OVR: STF×2(8) + CTL×1.5(4.5) + STA×1(3) + DEF×0.5(0) = 15.5 → normalized ~9
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite / MVP — Triple Crown year. Third-best pitcher in baseball 1914-1920, behind only Johnson and Alexander.
    stf: 4,      // 1.74 ERA in 1918 (tier 4). K/9 only 4.59 — not a strikeout pitcher. But 8 shutouts and NL-best ERA. Elite results.
    ctl: 3,      // BB/9 2.36 in 1918 (tier 2 base). WHIP 0.97 — sub-1.00 earns +1 bonus. CTL = 3.
    sta: 3,      // 290.1 IP in 1918 shortened season. 27 CG. In full seasons, averaged ~290 IP. Workhorse.
    def: 0,      // Holds NL record for career errors by a pitcher (64). Led league in errors multiple times. Terrible fielder.
    clu: 2,      // 1.00 ERA in 1918 WS, 3 complete games. Lost 1-0 to Ruth, 2-1 to Mays. Won shutout Game 5. Magnificent in defeat.
  },

  stat_justification: {
    stf: "1.74 ERA in 1918 — NL Pitching Triple Crown (wins, ERA, strikeouts). Led NL in starts (33), innings (290.1), shutouts (8), WHIP (0.97), H/9 (6.70). Only Walter Johnson was better in all of baseball that year. From 1914-1920, his 2.16 ERA was 4th in MLB. K/9 of 4.59 was modest — Vaughn was a craftsman, not a fireballer. Rating of 4 — elite production over a sustained peak.",
    ctl: "BB/9 of 2.36 in 1918 (76 BB in 290.1 IP). WHIP of 0.97 — sub-1.00 earns the bonus. His control was solid but not historic — he led the NL in walks in 1914 (109) and was wild early in his career. By 1918 he'd mastered command. Rating of 3.",
    sta: "290.1 IP in 1918 (a shortened season — full season would have been 320+). 27 complete games. From 1914-1920 he averaged ~293 IP per year with ~24 CG. He pitched in the minors until age 49. Rating of 3 — elite durability.",
    def: "Holds the NL record for career errors by a pitcher with 64. Led the NL in errors by a pitcher in 1914 and other seasons. His .869 fielding percentage in 1914 was terrible even by Deadball standards. For a man called 'Hippo,' he was not nimble off the mound. Rating of 0.",
    clu: "1918 World Series: 3 complete games, 1 shutout, 1.00 ERA. Lost Game 1 to Babe Ruth 1-0 (Ruth threw a shutout). Lost Game 3 to Carl Mays 2-1. Won Game 5 with a shutout. He pitched as well as humanly possible and lost the Series because his offense gave him 4 total runs in 3 starts. Also pitched the double no-hitter in 1917 — 9 hitless innings, lost in the 10th. Vaughn was the greatest hard-luck pitcher of the Deadball Era. Rating of 2 — extraordinary performance in defeat.",
  },

  personality: {
    leadership_style: "Quiet Texas workhorse. Vaughn didn't seek the spotlight — he just took the ball every fourth day and pitched 290 innings. He was the anti-Marquard: no Broadway, no vaudeville, no diamond rings. Just a big lefty from Weatherford, Texas, who threw strikes and absorbed defeats without complaint. His leadership was through endurance and example.",
    temperament: "Stoic but volatile underneath. Vaughn pitched through years of terrible run support, bad luck, and personal chaos without public complaint. But when he finally broke — after being shelled by the Giants on July 9, 1921 — he walked off the mound, out of the stadium, and disappeared completely. His wife asked the police to find him. The quiet ones always break the hardest.",
    work_ethic: "Relentless. From 1914-1920, Vaughn never had a season below 3.8 fWAR. He never had an ERA above 2.87. He averaged 20+ wins per season for seven straight years. He pitched semi-professionally until age 49 — fifteen years after his MLB career ended. He couldn't stop pitching. It was all he knew.",
    lifestyle: "Complicated and dark. Married Edna DeBolt — her father later stabbed Vaughn with a razor, slashing through his overcoat and inflicting a stomach wound. Edna filed for divorce in 1920, then dropped the proceedings. When Vaughn disappeared in 1921, police were asked to look for him. After baseball: pitched semi-pro for $9,000/year (comparable to MLB salary), worked as a refrigeration assembler. Cremated after death. No grave to visit.",
    era_adaptability: "HIGH. Vaughn's consistency (2.16 ERA over 7 years, 143-96) translates to any era. He'd be a modern #2 starter who eats innings and never misses a start. His K/9 was low, but his WHIP and ERA were elite. The comparison to Warren Spahn is apt — same workload, same consistency, just a shorter career.",
    clubhouse_impact: "STEADY but distant. Vaughn wasn't a clubhouse leader or entertainer. He was respected for his durability and professionalism. He clashed with manager Johnny Evers, whose high-strung intensity grated on Vaughn's Texas stoicism. The disappearance in 1921 suggests deeper demons than anyone knew.",
    dark_side: "The disappearance. On July 9, 1921, after being shelled by the Giants (back-to-back home runs by Frank Snyder and Phil Douglas), Vaughn walked from the pitcher's box to the clubhouse and was never seen again by the Cubs. His wife asked the Chicago police to search for him. He'd already been stabbed by his father-in-law. His wife had filed and dropped divorce proceedings. Commissioner Landis refused to reinstate him even after the Cubs tried. He was banned for 8 years. He tried to come back at age 43 but failed. He spent his last years assembling refrigerators. In ILB: Vaughn carries 'The Vanishing' trait — under extreme stress, he can simply walk away from the game, never to return.",
  },

  chemistry_traits: [
    { tag: "Triple Crown", desc: "1918 NL Pitching Triple Crown: led in wins (22), ERA (1.74), and strikeouts (148). When all three stats align, Vaughn is nearly unbeatable. +2 STF in any game where he leads all three categories at the time." },
    { tag: "Hard Luck", desc: "Vaughn lost 1-0 to Babe Ruth in the World Series. He threw 9 no-hit innings and lost in the 10th. His offense averaged 1.3 runs per WS start. When Vaughn pitches, the offense goes silent. -1 to team batting when Vaughn starts." },
    { tag: "The Hippo", desc: "6'4\" 215 lbs — enormous for the Deadball Era. Vaughn's size gives him +1 STA (endurance) and +1 intimidation against smaller batters. But -1 DEF because big men don't field bunts well." },
    { tag: "Texas Stoic", desc: "Vaughn absorbs losses without complaint. No morale penalty from individual defeats — he just takes the ball again. But if cumulative frustration reaches a threshold, see: The Vanishing." },
    { tag: "The Vanishing", desc: "If Vaughn suffers 3+ consecutive bad starts, roll d6: on 1, he walks off the field and disappears from the roster permanently. The team cannot replace him for 3 games. The silence is deafening." },
    { tag: "Warren Spahn Prototype", desc: "Vaughn's 7-year peak mirrors Spahn's: 20+ wins, consistent ERA, innings eaten. Vaughn functions as a Spahn-caliber arm for shorter bursts. +1 consistency (ERA variance reduced by 20%)." },
    { tag: "Double No-Hitter", desc: "Vaughn threw 9 no-hit innings on May 2, 1917 — and lost. In ILB, if Vaughn carries a no-hitter into the 9th, roll d6: 1-3 = completes it. 4-5 = loses it in the 9th. 6 = loses it in extra innings. Baseball's cruelest possible outcome." },
    { tag: "Father-in-Law's Razor", desc: "Vaughn's personal life was chaotic and dangerous. Off-field events can wound him — literally. 10% chance per season of a non-baseball injury that costs 2-4 weeks." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "This is where Vaughn lived. 290 innings a year, 27 complete games. The mound was home." },
    { location: "Weeghman Park / Wrigley", affinity: "HIGH", note: "Vaughn became the greatest lefty in Cubs history at this park. The double no-hitter happened here." },
    { location: "Texas / Open Country", affinity: "MEDIUM", note: "Born in Weatherford, TX. A stonemason's son from the prairie. Vaughn carried Texas in his bones." },
    { location: "Semi-Pro Diamonds", affinity: "MEDIUM", note: "After MLB, Vaughn pitched semi-pro until age 49 for $9,000/year. He never stopped pitching. Couldn't." },
    { location: "Factory / Workshop", affinity: "LOW", note: "Spent his last years assembling refrigerators. The indignity of a Triple Crown winner building appliances." },
    { location: "Police Station", affinity: "NONE", note: "His wife asked the police to find him. Twice. He was stabbed by his father-in-law. Not a safe place." },
  ],

  momentum: {
    hot_triggers: [
      "Shortened seasons / high stakes — Vaughn was at his best when every game mattered. The 1918 war-shortened season brought his best work.",
      "Run support — when the Cubs actually scored, Vaughn was untouchable. 8 shutouts in 1918 = he only needed himself.",
      "Consistency — Vaughn never had a bad month during his prime. He got better as the season progressed, peaking in August-September.",
      "Rivalry with the best — facing Ruth, Mays, Alexander brought out his competitive peak.",
    ],
    cold_triggers: [
      "Managerial conflict — Evers's high-strung style pushed Vaughn to the edge. Incompatible personalities.",
      "Personal crisis — the stabbing, the divorce filings, the disappearances. When life outside baseball collapsed, so did he.",
      "Aging — the 1921 collapse (3-11, 6.01 ERA) was sudden and total. No slow decline; Vaughn went from elite to done in one season.",
      "No run support — Vaughn was historically unlucky. His offense disappeared when he pitched. The frustration compounded over years.",
    ],
    pressure_response: "MAGNIFICENT IN DEFEAT. This is Vaughn's defining trait. He threw a 1.00 ERA World Series and lost it. He pitched 9 no-hit innings and lost in the 10th. He won the Triple Crown and his team still couldn't win it all. Vaughn is the greatest hard-luck pitcher in ILB — his individual performance in pressure situations is elite (CLU 2), but the universe conspires against him. In ILB: Vaughn is the pitcher you send out when you need a masterpiece, knowing that the masterpiece might still end in a 1-0 loss to Babe Ruth.",
  },

  action_card_seeds: [
    {
      title: "The Double No-Hitter",
      type: "Game Action",
      text: "Your pitcher and the opposing pitcher both carry no-hitters into the 9th inning. Nine full innings without a hit by either team — the only time in baseball history. In the 10th, your pitcher gives up a hit. Then Jim Thorpe — Olympic champion — taps a roller that your catcher misplays. You lose 1-0. Your pitcher threw 9 no-hit innings and lost.",
      origin: "May 2, 1917: Vaughn and Fred Toney both no-hit each other for 9 innings. Toney completed his no-hitter in 10. Vaughn gave up 2 hits in the 10th and lost 1-0. The only double no-hitter in baseball history.",
    },
    {
      title: "One-Nothing to the Babe",
      type: "Game Action",
      text: "It's Game 1 of the World Series. Your ace, the NL Triple Crown winner, pitches a complete game allowing only 5 hits and 1 run. He loses 1-0. The opposing pitcher is 23-year-old Babe Ruth, who throws a shutout and extends his WS scoreless innings streak to 22. Your man pitched beautifully. It wasn't enough.",
      origin: "1918 WS Game 1: Vaughn (22-10, 1.74) vs. Ruth (13-7, 2.22). Both threw CG. Ruth won 1-0. Ruth's scoreless streak reached 29.2 innings before the Cubs finally scored.",
    },
    {
      title: "The Triple Crown Ace",
      type: "Action",
      text: "Your pitcher leads the league in wins, ERA, and strikeouts — the Pitching Triple Crown. He also leads in starts, innings, shutouts, and WHIP. Only one pitcher in the entire sport is better. Your man propels the team to the pennant by 10.5 games. But the World Series ends in defeat anyway.",
      origin: "Vaughn's 1918 Triple Crown: 22 W, 1.74 ERA, 148 K, 8 SHO, .97 WHIP. Led Cubs to pennant. Only Walter Johnson was better. Lost WS to Red Sox.",
    },
    {
      title: "The Vanishing",
      type: "Drama",
      text: "After being shelled in a start — back-to-back home runs, a 6.01 ERA — your pitcher walks from the mound to the clubhouse. He does not stop. He walks out of the stadium. He disappears. His wife calls the police. No one can find him. The commissioner bans him. He is never seen in a major league uniform again.",
      origin: "July 9, 1921: After the Giants' Frank Snyder and Phil Douglas hit consecutive homers, Vaughn walked off the mound at the Polo Grounds and disappeared. The Cubs never saw him again. Landis banned him for the rest of the season.",
    },
    {
      title: "The Father-in-Law's Razor",
      type: "Drama",
      text: "Your pitcher's father-in-law attacks him with a razor on the street, slashing through his overcoat and opening a wound on his stomach. Your pitcher survives but the assailant flees and is sought by police in multiple jurisdictions. The divorce proceedings that triggered the attack are dropped.",
      origin: "Edna Vaughn's father, DeBolt, ambushed Vaughn on the street and stabbed him with a razor. Vaughn was hospitalized. DeBolt fled. Edna dropped her divorce filing.",
    },
    {
      title: "Forty-Nine and Still Pitching",
      type: "Action",
      text: "Fifteen years after his MLB career ended, your former ace is still pitching semi-pro ball at age 49, earning $9,000 a year — the same as a major leaguer. He tried to come back to the Cubs at 43 but couldn't make the team. He can't stop pitching. It's the only thing that makes sense.",
      origin: "Vaughn pitched semi-pro from 1922-1937, earning comparable MLB money. He attended Cubs spring training in 1931 at age 43 after Landis reinstated him, but failed to make the roster.",
    },
    {
      title: "The Refrigerator Man",
      type: "Drama",
      text: "The NL Triple Crown winner, the greatest lefty in franchise history, the man who threw 9 no-hit innings in the only double no-hitter ever — he spends his final years assembling refrigerators in a factory. He is cremated after death. There is no grave to visit.",
      origin: "After retiring from semi-pro ball, Vaughn worked as an assembler for a refrigeration products company in Chicago until his death in 1966. He was cremated.",
    },
    {
      title: "Wilson Cried Like a Baby",
      type: "Drama",
      text: "After the double no-hitter, your catcher — whose misplay lost the game — finds your pitcher in the clubhouse. He grabs his hand and sobs: 'I just went out on you, Jim. I just went tight.' Your pitcher, who just lost the greatest pitching duel in history, says: 'I wasn't sore. It's just another lost ballgame, that's all.'",
      origin: "After the 1917 double no-hitter, catcher Art Wilson apologized in tears to Vaughn. Vaughn told the story decades later with characteristic stoicism.",
    },
  ],

  art_direction: {
    face: "Massive 6'4\" 215 lbs — genuinely huge for 1918. Broad shoulders, thick arms, large hands. Square jaw, serious expression, the weathered face of a Texas stonemason's son. No flash, no jewelry, no showmanship. Just a big man who looks like he could throw a baseball through a barn wall.",
    attire: "Chicago Cubs 1918 home whites — the pennant year. Classic Deadball Era pose: tall lefty at the top of his windup, enormous frame dwarfing the mound. Or: mid-delivery, the long left arm unfurling, the ball invisible against the overcast Chicago sky.",
    mood: "Stoic grandeur with undertones of tragedy. Vaughn should look like a man who has thrown 9 no-hit innings and expects to lose. There's no self-pity — just the quiet acceptance of a universe that gives you a Triple Crown and takes away the World Series. The loneliest card in the Muggers set.",
    style: "Sepia-toned with cool blue-gray undertones — colder than the other Muggers cards, reflecting Chicago in wartime, the overcast sky of Weeghman Park in May 1917. The gold accents should be muted, almost tarnished. This isn't a spotlight card — it's a card you find in a shoebox, forgotten, and realize it's the best one in the set.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, Kauff is a firecracker, and Marquard is a spotlight, then Vaughn is a cathedral bell. Deep, resonant, tolling for something lost. He rings out across the decades and no one is there to hear him. The ILB Vaughn card should feel like finding a masterpiece in a thrift store — undervalued, overlooked, magnificent.",
  },
};

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

export default function HippoVaughnCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = VAUGHN_DATA;
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
                      These events, derived from Vaughn's real life, become universal cards playable in any game.
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
                  <Section title="Vaughn's Derivation">
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
