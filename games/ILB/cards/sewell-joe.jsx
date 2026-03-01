// /cards/players/joe-sewell.jsx
import { useState } from "react";

const SEWELL_DATA = {
  name: "Joe Sewell",
  nickname: "The Impossible Out",
  year: 1925,
  team: "Cleveland Indians",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SS",
  bats: "L",
  throws: "R",
  height: '5\'6"',
  weight: "155 lbs",
  born: "October 9, 1898 — Titus, AL",
  died: "March 6, 1990 — Mobile, AL (age 91)",
  hof: "Inducted 1977 (Veterans Committee). The toughest batter to strike out in MLB history: 114 K in 7,132 AB (1 K per 62.5 AB). 115 consecutive games without a strikeout (record). 3 K in a full season (1932, record). Named one of The 100 Greatest Baseball Players of All Time by Ritter & Honig.",

  real_stats: {
    season: 1925,
    games: 155,
    at_bats: 608,
    hits: 204,
    doubles: 37,
    triples: 5,
    home_runs: 1,
    rbi: 98,
    stolen_bases: 4,
    batting_avg: ".336",
    obp: ".399",
    slg: ".418",
    ops: ".817",
    runs_scored: 78,
    walks: 64,
    strikeouts: 4,
    war: 5.6,
    career_avg: ".312",
    career_hits: 2226,
    career_hr: 49,
    career_2b: 436,
    career_rbi: 1054,
    career_k: 114,
    career_ab: 7132,
    career_war: "~47",
    k_rate: "1 K per 62.5 AB (lowest in MLB history)",
    consec_no_k: "115 games (record)",
    ws_titles: 2,
    best_avg: ".353 (1923)",
    iron_man: "1,103 consecutive games (1922-1930)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1925 SEASON (REPRESENTATIVE PEAK)
  //
  // CON: .336 BA → tier 5 (.330+). 204 H. 64 BB/4 K. Career .312, 2,226 H. CON = 5 (MAXIMUM).
  // POW: 1 HR (1925). 49 career. .418 SLG. Zero power. POW = 0.
  // SPD: 4 SB (1925). Career max 17 SB. Not a baserunner. SPD = 0.
  // DEF: Led AL SS in putouts 4×, assists 4×, FP 3×. Solid but not transcendent. DEF = 1.
  // CLU: 2 WS titles (1920 Indians, 1932 Yankees). .329 replacing Chapman down the stretch. But .174 in 1920 WS itself. CLU = 1.
  // OVR: CON×2(10) + POW×1.5(0) + SPD×1(0) + DEF×0.5(0.5) = 10.5 → normalized ~6
  // But: The 114 K record + 115 consec no-K games + .312/.391 career is a unique value. Bump to 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — The most unique hitter in baseball history. His bat-to-ball ability has no parallel. 114 K in 7,132 AB. .312 career. 2 WS titles. The man who replaced a dead man and played for 14 years without striking out.
    con: 5,      // MAXIMUM. .336 in 1925. .353 in 1923. Career .312. 204 hits. But it's the K rate that defines this: 4 strikeouts in 608 AB. Career 114 K in 7,132 AB — the lowest rate in MLB history. 115 consecutive games without a K. "There's no excuse for striking out 100 times — unless you're blind."
    pow: 0,      // 1 HR in 1925. Career high 11 HR in 1932. 49 career. .418 SLG. Sewell had no power. He was 5'6" 155 lbs swinging a 40-ounce bat. All contact, all the time.
    spd: 0,      // 4 SB in 1925. Career max 17. At 5'6" 155 lbs, Sewell had compact agility but was not a basestealer or threat on the paths.
    def: 1,      // Led AL SS in putouts 4×, assists 4×, FP 3×. Solid defensive shortstop for a decade. Not flashy, just reliable. Transitioned smoothly to 3B for the Yankees.
    clu: 1,      // 2 WS titles (1920, 1932) — both wins. Hit .329 down the stretch replacing Chapman in 1920. But .174 in the 1920 WS itself. His October was defined by showing up rather than heroics.
  },

  stat_justification: {
    con: "This is the most extraordinary contact rating in ILB. Not because of the .336 BA (1925) or .353 (1923) or even the career .312 — all of which are excellent. But because of the strikeout rate: 4 K in 608 AB in 1925. 3 K in 503 AB in 1932 (record). 114 total K in 7,132 career AB — 1 K per 62.5 AB (lowest in MLB history). 115 consecutive games without a strikeout (record). He struck out TWICE in a game on only TWO occasions in his entire career. He used one bat — 'Black Betsy,' a 40-ounce club seasoned with tobacco and Coke bottles — for his entire career. 'There's no excuse for a major league player striking out 100 times — unless he's blind.' Rating of 5 — MAXIMUM. The purest bat-to-ball contact in baseball history.",
    pow: "1 HR in 1925. Career high 11 HR in 1932 (age 33, Yankee Stadium). 49 career HR. .418 SLG in 1925. At 5'6\" 155 lbs, Sewell had zero power. His 436 career doubles show gap ability, but he never hit for distance. Rating of 0.",
    spd: "4 SB in 1925. Career max 17 SB (1926). Not a basestealer. At 5'6\" 155 lbs he was compact and agile but not fast. He played 1,103 consecutive games (pre-Gehrig record), which suggests durability over athleticism. Rating of 0.",
    def: "Led AL SS in putouts 4 times (1924-27). Led AL SS in assists 4 times. Led AL SS in FP 3 times. 'Probably the best shortstop in the American League in the 1920s' — but this is partly a reflection of consistency over 11 seasons rather than transcendent range. Shifted to 3B with the Yankees without issue. Rating of 1 — solid and reliable.",
    clu: "Won the 1920 WS (replacing the dead Ray Chapman, hitting .329 down the stretch). Won the 1932 WS (Yankees). But hit .174 in the 1920 WS itself, and was a role player by 1932. His October value was presence and steadiness, not heroics. Rating of 1.",
  },

  personality: {
    leadership_style: "Silent ironman. Sewell played 1,103 consecutive games — the MLB record until Lou Gehrig broke it. He showed up every day, put the bat on the ball, and went home. He didn't give speeches. He didn't demand attention. He was the metronome — the player who kept time for the entire team.",
    temperament: "Alabama stoic. Born in tiny Titus, AL. Played football at Alabama. Sewell was quiet, disciplined, and certain. His quote reveals his philosophy: 'There's no excuse for a major league player striking out 100 times a season — unless he's blind.' He saw striking out as a moral failure. He made contact like other men breathe — automatically, constantly, without thought.",
    work_ethic: "The bat says everything. One bat. His entire career. 'Black Betsy' — a 40-ounce bat he rubbed with Coca-Cola bottles to harden the wood and seasoned with chewing tobacco to keep it supple. He didn't need another bat because he never broke the one he had. He never broke it because he never missed.",
    lifestyle: "Small-town Alabama royalty. Three Sewell brothers played MLB (Joe, Luke, Tommy). Cousin Rip Sewell invented the eephus pitch. After retiring, Joe scouted and then coached Alabama baseball for decades, winning the SEC title in 1968 at age 69. The stadium was named Sewell-Thomas. He lived to 91 — the last surviving member of the 1920 Indians.",
    era_adaptability: "PARADOXICAL. In modern baseball, where analytics worship power and accept strikeouts, Sewell's approach would be revolutionary OR obsolete. His zero-strikeout philosophy is the exact opposite of modern three-true-outcomes baseball. In ILB, he represents an alternate philosophy of hitting — the anti-strikeout, the ball always in play, the defense always tested.",
    clubhouse_impact: "STABILIZER. Sewell was brought in after the most traumatic event in baseball history — the death of Ray Chapman. He stabilized the Indians and helped them win the World Series. In ILB: +2 team stability after traumatic events. Sewell absorbs grief and channels it into consistency.",
    dark_side: "He inherited a dead man's position. Joe Sewell's entire career exists because Carl Mays killed Ray Chapman with a pitch on August 16, 1920. Every game Sewell played, every hit, every non-strikeout — all of it happened because a man died. Brooklyn manager Wilbert Robinson waived the postseason eligibility rules specifically because of Chapman's death so Sewell could play. Sewell carried that weight for 14 years and never spoke about it publicly. In ILB: Sewell carries 'Chapman's Heir' — a permanent connection to the Muggers. If Chapman is in the same league, a special narrative triggers: the dead man and the man who replaced him, separated by era but bound by fate.",
  },

  chemistry_traits: [
    { tag: "The Impossible Out", desc: "114 K in 7,132 career AB. 1 K per 62.5 AB. In ILB, Sewell CANNOT strike out more than once per series. His bat-to-ball ability transcends the rules. Every at-bat ends in contact." },
    { tag: "Black Betsy", desc: "One bat. Entire career. 40 ounces, rubbed with Coke bottles, seasoned with tobacco. In ILB, Black Betsy is an equipment card: +2 CON, but if the bat is ever broken (1% chance per game), Sewell loses -3 CON permanently." },
    { tag: "Chapman's Heir", desc: "Sewell replaced Ray Chapman after Chapman was killed by a pitch. He carries the dead man's position with quiet dignity. +2 team stability after any traumatic event. Sewell absorbs grief and converts it to consistency." },
    { tag: "One-Fifteen", desc: "115 consecutive games without a strikeout. In ILB, once Sewell goes 10 consecutive games without a K, he enters a 'streak' state where CON increases by +1 and keeps rising until the streak breaks." },
    { tag: "The Ironman", desc: "1,103 consecutive games (1922-1930). Sewell cannot be benched for fatigue. He plays every day. His consecutive-game streak provides +1 team durability." },
    { tag: "Alabama Steady", desc: "Born in Titus, AL. Football letterman at Alabama. Coached Alabama to SEC title at age 69. Sewell is rooted in Southern earth. +1 consistency in all conditions. No hot streaks, no cold streaks — just steady." },
    { tag: "Three Brothers", desc: "Joe, Luke, and Tommy Sewell all played MLB. Cousin Rip invented the eephus pitch. The Sewell family is baseball royalty. +1 chemistry when paired with family members." },
    { tag: "Anti-Strikeout Philosophy", desc: "'There's no excuse for striking out 100 times — unless you're blind.' Sewell's philosophy conflicts with modern power hitting. When paired with high-K power hitters, -1 chemistry friction. But +2 team contact rate." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "MAXIMUM", note: "114 K in 7,132 AB. The batter's box was his office. He never left it early." },
    { location: "League Park / Cleveland", affinity: "HIGH", note: "11 seasons. 1,800 hits. .320 average. Won the 1920 WS. Cleveland was home." },
    { location: "Shortstop", affinity: "HIGH", note: "Led AL SS in putouts and assists 4× each. The position he inherited from Chapman." },
    { location: "University of Alabama", affinity: "HIGH", note: "Football letterman, baseball star, later coach (SEC title 1968). Stadium named for him." },
    { location: "Yankee Stadium", affinity: "MEDIUM", note: "3 seasons at 3B. 1932 WS champion. Career-high 11 HR (the short porch helped)." },
    { location: "World Series", affinity: "MEDIUM", note: "2 WS titles (1920, 1932). Both wins. But .174 in the 1920 WS. Steady presence, not hero." },
  ],

  momentum: {
    hot_triggers: [
      "Consistency over time — Sewell's value compounds over long seasons. He's better in September than April because he never slumps.",
      "After tragedy — he replaced Chapman and hit .329. Adversity focuses him.",
      "Low-K environments — when the game rewards contact, Sewell is the most valuable player alive.",
      "Consecutive game streaks — the longer he plays, the more locked in he becomes.",
    ],
    cold_triggers: [
      "Postseason hitting — .174 in the 1920 WS. His regular-season steadiness doesn't always translate to October.",
      "Power situations — when the team needs a home run, Sewell can't provide it. 49 career HR in 14 years.",
      "Speed situations — 4 SB in 1925. He can't run. He can only hit.",
      "Late career — released by Cleveland after 1930. The ironman wears down eventually.",
    ],
    pressure_response: "METRONOMIC. Sewell doesn't rise to the occasion or shrink from it. He simply continues doing what he always does: putting the bat on the ball. His pressure response is not dramatic — it's mechanical. He doesn't have a gear above his normal performance because his normal performance IS his best performance. In ILB, Sewell is the ultimate stability card. He won't win you the game with a walk-off homer. He won't lose you the game with a strikeout. He'll go 2-for-4 with a double and a walk, every single day, for 14 years. The question is whether steady excellence or explosive brilliance wins more games. Sewell bets on steady. He's usually right.",
  },

  action_card_seeds: [
    {
      title: "One Hundred Fourteen",
      type: "Action",
      text: "Over 14 seasons and 7,132 at-bats, your shortstop strikes out 114 times. That is fewer strikeouts than some modern players accumulate in a single month. He strikes out once every 62.5 at-bats — the lowest rate in baseball history. He struck out twice in a game on only two occasions in his entire career. He does not miss.",
      origin: "Sewell's career: 114 K in 7,132 AB. Lowest K rate in MLB history. Struck out twice in a game exactly twice in 14 seasons.",
    },
    {
      title: "Chapman's Successor",
      type: "Drama",
      text: "A shortstop is dead. Killed by a pitch on August 16. Your team is in a pennant race. They call up a 21-year-old from the minors who has played only 92 professional games. He steps into a dead man's position, hits .329 down the stretch, and helps win the World Series. He will play that position for the next decade. He will never speak publicly about the man he replaced.",
      origin: "Sewell replaced Ray Chapman after Chapman's death in August 1920. Brooklyn manager Robinson waived eligibility rules due to the circumstances. Sewell hit .329 and the Indians won the WS.",
    },
    {
      title: "Black Betsy",
      type: "Action",
      text: "Your shortstop uses one bat for his entire career. He rubs it with Coca-Cola bottles to harden the grain. He seasons it with chewing tobacco to keep it supple. He calls it Black Betsy. It weighs 40 ounces — absurdly heavy for a man who stands 5'6\" and weighs 155 pounds. He never breaks it. He never needs another. The bat and the man are one instrument.",
      origin: "According to his NYT obituary, Sewell used a single 40-ounce bat ('Black Betsy') his entire career, maintained with Coke bottles and chewing tobacco.",
    },
    {
      title: "One-Fifteen",
      type: "Game Action",
      text: "Your shortstop goes 115 consecutive games without striking out. One hundred and fifteen. Nearly three-quarters of a full season. Pitchers throw their best stuff. He fouls it off. They try to fool him. He puts it in play. They try to blow it past him. He makes contact. For 115 games, the third strike never comes.",
      origin: "From 1929 into 1930, Sewell went 115 consecutive games without a strikeout — still the MLB record.",
    },
    {
      title: "Three in Five Hundred Three",
      type: "Game Action",
      text: "In 503 at-bats across a full major league season, your third baseman strikes out three times. Three. In five hundred and three. His ratio of 167.7 at-bats per strikeout will never be matched. Some records are broken. This one is permanent.",
      origin: "Sewell's 1932 season: 3 K in 503 AB (167.7 AB/K). The fewest strikeouts in a full season in modern MLB history.",
    },
    {
      title: "Eleven Hundred and Three",
      type: "Action",
      text: "Your shortstop plays in 1,103 consecutive games — every game, every day, for eight years. It is the longest consecutive-games streak in baseball history. A young first baseman named Gehrig will eventually break it, but for now, the ironman is yours. He shows up. He doesn't strike out. He goes home. He comes back tomorrow.",
      origin: "Sewell played 1,103 consecutive games from September 1922 to April 1930 — the MLB record until Lou Gehrig.",
    },
    {
      title: "No Excuse",
      type: "Action",
      text: "'There's no excuse for a major league player striking out 100 times a season — unless he's blind.' Your shortstop says this without irony, without qualification. In his world, a strikeout is a failure of character, not skill. The ball is there. The bat is there. Swing. Make contact. Anything else is surrender.",
      origin: "Sewell's famous quote. He averaged 8 K per season over his last 9 years. He viewed striking out as morally unacceptable.",
    },
    {
      title: "The Coach at Sixty-Nine",
      type: "Drama",
      text: "Decades after his playing career, your Hall of Famer returns to his alma mater to coach baseball. At age 69, he leads Alabama to the SEC championship. The stadium is renamed in his honor. He has been putting the bat on the ball, in one form or another, for half a century. He will live to 91.",
      origin: "Sewell coached Alabama baseball, winning the 1968 SEC title at age 69. The field was renamed Sewell-Thomas Stadium in 1978. He died in 1990 at 91.",
    },
  ],

  art_direction: {
    face: "Tiny — 5'6\" 155 lbs, the smallest player in the Bashers set. Compact, coiled, intense. Sharp dark eyes with preternatural focus — the eyes of a man who sees every seam on a spinning baseball. Square Alabama jaw, no wasted motion in his expression. The look of someone who has never missed what he swung at.",
    attire: "Cleveland Indians 1925 home whites, left-handed batting stance — choked up on the massive 40-ounce Black Betsy. The bat should look enormous in his small hands. Or: crouched at shortstop, the position he inherited from a ghost. The uniform should look worn and comfortable — this man has played 1,103 consecutive games in it.",
    mood: "Absolute certainty. This card should radiate the calm of a man who knows — with mathematical precision — that he will put the bat on the ball. No drama, no flash, no anxiety. Sewell is the absence of failure. Where Sisler is luminous and fragile, Sewell is granite and permanent. The card should feel immovable.",
    style: "Full color — Bashers era — but muted and earthy compared to Sisler's golden glow. Alabama clay red, forest green, the colors of the rural South. The card should feel handmade and permanent, like a farmhouse that's stood for 100 years. Where Sisler's card has a slight blur (double vision), Sewell's card should be the sharpest, most focused image in the entire ILB set. Nothing is blurry. Nothing is uncertain. Every pixel is in contact.",
    reference: "If Sisler is the sun, Sewell is the earth — solid, quiet, always there when you need it. He's the anti-spectacle: no 41-game streaks, no .420 seasons, no drama of any kind. Just 204 hits and 4 strikeouts, year after year after year. The card should feel like the most reliable thing you've ever held. A metronome. An anchor. The sound of bat meeting ball, repeated 7,132 times.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No postseason", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", sunGold: "#d4a017", clay: "#a0522d" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.clay, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.clay}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JoeSewellCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = SEWELL_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.sunGold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.clay}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.clay, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.clay}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.clay}15, ${C.traitGreen}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🏏</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.clay, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.clay} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "BB", val: d.real_stats.walks },{ label: "K", val: d.real_stats.strikeouts },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.clay, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} CLEVELAND INDIANS — 155 GAMES — 204 HITS — 4 STRIKEOUTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.clay}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR K", val: d.real_stats.career_k },{ label: "CAR AB", val: "7,132" },{ label: "AB/K", val: "62.5" },{ label: "NO-K STRK", val: "115 G" },{ label: "WS TITLES", val: "2" },{ label: "HOF", val: "1977" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.clay, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 14 SEASONS • 114 TOTAL STRIKEOUTS • LOWEST K RATE IN MLB HISTORY</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1977", "🏆 2× WS Champion", "📊 114 Career K (Record)", "🔥 115 Games No K", "🏏 Black Betsy (One Bat)", "💪 1,103 Consec. Games", "🎓 Alabama Football", "👻 Chapman's Heir"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.clay}20`, border: `1px solid ${C.clay}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.clay : C.medBrown, border: `1px solid ${tab === t.id ? C.clay : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.clay}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`, color: l.affinity === "MAXIMUM" ? C.clay : l.affinity === "HIGH" ? C.traitGreen : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Sewell's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.clay}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.clay}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Sewell's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.clay, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
