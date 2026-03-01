import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}crawford-sam.png`;

const PLAYER_DATA = {
  name: "Sam Crawford",
  nickname: "Wahoo Sam",
  year: 1911,
  team: "Detroit Tigers",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "RF",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "190 lbs",
  born: "April 18, 1880 — Wahoo, NE",
  died: "June 15, 1968 — Hollywood, CA (age 88)",
  hof: "HOF 1957. .309 career BA. 2,961 H. 309 3B (ALL-TIME MLB RECORD — will never be broken). 458 2B. 97 HR. 1,525 RBI. OPS+ 144. 3× AL pennant. First player to lead both NL and AL in HR. 'There never was a player who could hit a ball harder.' — Ed Barrow. The King of Triples.",

  real_stats: {
    season: 1911, games: 146, at_bats: 574, hits: 217, doubles: 35,
    triples: 14, home_runs: 7, rbi: 115, runs: 109, stolen_bases: "~20",
    batting_avg: ".378", obp: "~.420", slg: ".524", ops: "~.944",
    ops_plus: "~173", war: "~7.5",
    xbh: 57,
    season_1901: ".330 BA, 16 HR (NL leader), 104 RBI, 12 inside-the-park HR (RECORD)",
    season_1914: ".314 BA, 26 3B (AL record, STILL stands), 104 RBI (AL leader)",
    season_1907: ".323 BA, 102 R (AL leader), AL pennant",
    career_avg: ".309", career_hits: 2961, career_hr: 97,
    career_3b: "309 (ALL-TIME MLB RECORD)",
    career_2b: 458, career_rbi: 1525, career_war: "~75",
    career_ops_plus: 144, career_sb: "~366",
    career_itp_hr: "51 (2nd all-time)",
    itp_hr_season_record: "12 in 1901 (STILL stands)",
    pennants: "3 (1907, 1908, 1909)", ws_titles: "0 (lost all 3)",
    league_leader_3b: "6 times",
    league_leader_rbi: "3 times",
    league_leader_hr: "2 times (NL 1901, AL 1908 — first to lead both)",
    triples_vs_doubles: "Hit more 3B than 2B four times in career",
    consecutive_games: "472 (1913-15)",
    glory_of_their_times: "Featured in Lawrence Ritter's oral history (1966)",
  },

  ilb_stats: {
    ovr: 10,     // Elite — The all-time triples king. 309 career 3B (will never be broken). 2,961 H. .309 career BA. OPS+ 144. 19 seasons. First to lead both NL and AL in HR. 3× pennant winner. But: 0 WS titles (lost all 3). The CLU 0 keeps him from Legend. Crawford was one of the most consistent offensive forces in dead-ball history, but he never won the big one.
    con: 5,      // .378 BA in 1911 → tier 5 (.330+). OPS+ ~173 in 1911 → ≥130 bonus (capped at 5). .309 career BA. 2,961 career hits (~40 shy of 3,000). .300+ in 11 seasons. 'There never was a player who could hit a ball harder.' — Ed Barrow. Rating: 5.
    pow: 2,      // 16 HR in 1901 → tier 1 (10-19). SLG .524 → ≥.500 bonus (+1) = 2. 97 career HR. 12 inside-the-park HR in 1901 (single-season record, STILL stands). 51 career inside-the-park HR (2nd all-time). 309 career triples represent enormous gap/wall power. First to lead both NL and AL in HR. Rating: 2.
    spd: 2,      // SB in peak years ~15-25 → tier 2 (16-30). ~366 career SB. The 309 career triples require real speed, but the actual SB numbers are tier 2, not tier 3. Crawford was fast enough to leg out triples in cavernous dead-ball parks, but he wasn't a pure speed demon like Collins (741 SB) or Speaker (436 SB). Rating: 2.
    def: 1,      // 'Excellent fielder in his prime' but defense 'suffered in later years.' Range factor 2.68 in 1900 (55 above avg). .988 fielding % in 1905 (35 above avg). Good defensive outfielder, not elite. Primarily RF. Rating: 1.
    clu: 0,      // ZERO. 3× AL pennant winner (1907, 1908, 1909) but LOST ALL THREE WORLD SERIES. Tigers were swept or outplayed in each. Crawford never won a championship. No major postseason heroics. In 19 ML seasons, zero rings. The King of Triples has no crown. Rating: 0.
  },

  stat_justification: {
    con: ".378 BA in 1911 → tier 5 (.330+). OPS+ ~173 → ≥130 bonus (capped at 5). Career: .309 BA, 2,961 hits (about 40 shy of 3,000 — he could have reached it). .300+ in 11 of 19 ML seasons. Led AL in hits, total bases, XBH multiple times. Ed Barrow (who converted Babe Ruth to an outfielder): 'There never was a player who could hit a ball harder.' The bat was thunderous. Rating: 5.",
    pow: "16 HR in 1901 → tier 1 (10-19). SLG .524 (1911) → ≥.500 bonus (+1) = 2. 97 career HR. RECORDS: 12 inside-the-park HR in 1901 (single-season record, STILL stands). 51 career inside-the-park HR (2nd all-time). 309 career triples demonstrate enormous power to the gaps. First player to lead both NL and AL in HR (1901 NL, 1908 AL). The power was real — horizontal more than vertical, driving the ball into the vast dead-ball outfields. Rating: 2.",
    spd: "SB in peak years approximately 15-25 → tier 2 (16-30). ~366 career SB. The 309 career triples REQUIRE speed — you can't hit 309 triples without running well. Crawford hit more triples than doubles four times in his career, an almost incomprehensible feat. But the actual SB numbers are tier 2, not the elite tier 3 of Collins or Speaker. Rating: 2.",
    def: "'Good fielder in his prime' — Wikipedia. Range factor 2.68 in 1900 (55 points above league avg). .988 fielding % in 1905 (35 above avg). But: 'his defense suffered in his later years.' Played primarily RF (not CF). Solid, not spectacular. Crawford's value was overwhelmingly in his bat. Rating: 1.",
    clu: "ZERO. This is the painful rating. Crawford played in 3 World Series (1907, 1908, 1909) — the Tigers lost all three. He never won a championship in 19 ML seasons. There are no major postseason heroics to cite. The 1907-09 Tigers were good enough to get there and not good enough to win. Crawford's 0 CLU reflects: zero titles, zero WS MVPs, zero signature October moments. The King of Triples wore no crown. Rating: 0.",
  },

  personality: {
    leadership_style: "THE STEADY PRODUCER. Crawford wasn't a firebrand or a strategist — he was a relentless, consistent run-producer who showed up every day and hit the ball harder than anyone alive. He played 472 consecutive games (1913-15). He was in the AL leaders in every major offensive category for 11 straight years (1905-15). The leadership was in the consistency — the understanding that every day, Crawford would produce.",
    temperament: "BITTER AND PROUD. Crawford's relationship with Ty Cobb defined his emotional landscape. He resented Cobb's privileges (late spring training, private quarters) and Cobb's individualism. Crawford sent a congratulatory telegram to Nap Lajoie when it was reported Lajoie beat Cobb for the 1910 batting title. He later called Cobb a 'cheapskate who never helped his teammates.' Cobb accused Crawford of sabotaging his steal attempts. The bitterness lasted decades — they partially reconciled at Harry Heilmann's funeral in 1951.",
    work_ethic: "BARBER TO HALL OF FAMER. Crawford was a barber in small-town Nebraska before baseball. He played in Wahoo, West Point, Wymore, Superior, Chatham (Ontario), Columbus, Grand Rapids, and Cincinnati before settling in Detroit. The work ethic was blue-collar and relentless — 19 ML seasons, double-digit triples in every season with 100+ games. He played PCL ball until age 41. Crawford didn't know how to stop.",
    lifestyle: "WAHOO TO HOLLYWOOD. Born in Wahoo, Nebraska — a name so good it became his nickname. Barber, semi-pro player, major leaguer. After baseball: moved to Hollywood, CA. Lived quietly until age 88. 'Wahoo Sam' Crawford — the small-town boy who hit his way to the Hall of Fame and then watched movies in California for 50 years.",
    era_adaptability: "THE TRIPLE BECOMES THE DOUBLE. Crawford's 309 triples are an artifact of cavernous dead-ball parks with distant outfield fences. In modern parks, many of those triples become doubles — or with modern ball compression, home runs. Crawford's pure gap power and line-drive stroke would translate to any era, but the specific triple-hitting dominance is tied to his time. In 2024: .290-.310 hitter with 25-35 HR and 40+ 2B. Very good. Not record-breaking.",
    clubhouse_impact: "THE COBB ANTAGONIST. Crawford was the senior star when the young, abrasive Cobb arrived in 1905. The hazing of Cobb — which Crawford dismissed as normal rookie treatment — created a feud that lasted decades. Crawford: 'We weren't cannibals or heathens. We were all ballplayers together, trying to get along. Every rookie gets a little hazing, but most of them just take it and laugh. Cobb took it the wrong way.' The clubhouse was divided. Crawford represented the old guard; Cobb was the future.",
    dark_side: "The Cobb feud poisoned everything. Crawford's bitterness toward Cobb — over salary, over privileges, over personality — colored his later years. The two men played alongside each other for 13 seasons in barely-concealed animosity. Cobb accused Crawford of intentionally fouling off pitches during steal attempts. Crawford accused Cobb of never helping teammates. Both were probably right about each other. Also: Crawford fell 40 hits short of 3,000 — a milestone that wasn't meaningful in his era but would have further secured his legacy. He could have reached it in the PCL but didn't know to try.",
  },

  chemistry_traits: [
    { tag: "Three Hundred and Nine", desc: "309 career triples — the ALL-TIME MLB RECORD. Will never be broken. When Crawford hits a ball to the gap, 40% chance it's a triple instead of a double. The gaps belong to him." },
    { tag: "Inside-the-Park King", desc: "51 career inside-the-park HR (2nd all-time). 12 in 1901 (single-season record). When Crawford hits a ball to deep outfield, 15% chance of inside-the-park HR. The parks are cavernous; Crawford makes them his highway." },
    { tag: "Cobb's Rival", desc: "When Ty Cobb is on the same roster, -2 team chemistry. Crawford resents Cobb's privileges; Cobb resents Crawford's seniority. Both produce at elite levels despite the hatred. Sometimes the worst relationships produce the best lineups." },
    { tag: "The Glory of Their Times", desc: "Crawford told his story to Lawrence Ritter for the legendary oral history. +2 cultural legacy. +1 narrative impact. The voice of the dead-ball era, preserved in his own words." },
    { tag: "Wahoo Sam", desc: "From Wahoo, Nebraska. Small-town origins, blue-collar work ethic. +1 durability, +1 consistency. The man from Wahoo doesn't miss games." },
    { tag: "No Crown", desc: "3× pennant winner, 0× WS champion. Lost all three World Series (1907-09). In elimination games, -1 to all stats. The King of Triples has no ring." },
    { tag: "The Barber's Hands", desc: "Crawford was a barber before baseball. Steady hands, precise control. +1 CON (bat control). The same hands that cut hair hit .378." },
    { tag: "Forty Shy", desc: "Retired with 2,961 hits — 39 shy of 3,000. Didn't know the milestone mattered. +3 'what if' legacy. -1 historical recognition." },
  ],

  preferred_locations: [
    { location: "Right Field", affinity: "HIGH", note: "Primary position for 15 years. Good arm, solid range in prime. The gaps to right-center were his domain." },
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".378 BA (1911). .309 career. 2,961 H. 'Never was a player who could hit a ball harder.' Left-handed line drives to all fields." },
    { location: "The Gaps", affinity: "HIGH", note: "309 career 3B. 458 2B. The gaps between outfielders were Crawford's kingdom. Balls hit there kept rolling." },
    { location: "Bennett Park / Navin Field / Detroit", affinity: "HIGH", note: "1903-1917. 2,466 hits as a Tiger. 15 seasons. Cavernous outfield built for triples." },
    { location: "Wahoo, Nebraska", affinity: "HOME", note: "Born here. Named for here. The small-town origin of a Hall of Fame career." },
    { location: "The World Series", affinity: "PAINFUL", note: "3× pennant (1907-09). 0× champion. Lost all three. The stage that never rewarded him." },
  ],

  momentum: {
    hot_triggers: [
      "Triples — when the ball finds a gap, Crawford's legs take over. Momentum builds with each extra-base hit.",
      "Consistency streaks — 472 consecutive games (1913-15). Crawford doesn't go cold; he produces.",
      "Rivalry fuel — when Cobb gets attention/praise, Crawford hits harder. The bitterness is productive.",
      "Large outfields — the bigger the park, the more triples. Cavernous outfields are Crawford's playground.",
    ],
    cold_triggers: [
      "World Series — 0-3 career. The biggest stage produced the biggest disappointments.",
      "Cobb's privileges — when Cobb receives preferential treatment, -1 morale.",
      "Small parks — modern/smaller outfields reduce triples. Crawford's game shrinks in bandbox stadiums.",
      "Late career decline — after 1915, Crawford faded quickly (.173 in his final 1917 season).",
    ],
    pressure_response: "REGULAR SEASON DOMINANT, OCTOBER ABSENT. Crawford was among the AL leaders in every offensive category for 11 straight years. He was one of the most consistent producers in dead-ball history. But in three World Series: the Tigers lost all three, and Crawford never produced a signature October moment. The pressure response is GOOD in the regular season (472 consecutive games, yearly production) and POOR in the postseason (0 titles, no WS heroics). In ILB: Crawford is the regular-season weapon who may disappoint in October.",
  },

  action_card_seeds: [
    { title: "Three Hundred and Nine", type: "Game Action", text: "Your right fielder hits a line drive into the right-center gap. The ball rolls to the wall. Other men stop at second. Your man rounds second, churns toward third, slides in safely. His 309th career triple. The all-time record. No one will ever break it — to match it, a player would need to average 20 triples per season for more than 15 years. +5 all-time legacy. The record that stands forever.", origin: "Crawford retired with 309 career triples — the all-time MLB record. It has stood for over a century and is considered unbreakable." },
    { title: "Twelve Inside-the-Park", type: "Game Action", text: "Your right fielder hits a ball to deep center. It bounces off the wall. He runs. He rounds first. Second. Third. He scores standing up. His TWELFTH inside-the-park home run of the season. A single-season record that will never be broken. +3 POW. +3 SPD. The parks are cavernous; Crawford fills them.", origin: "1901: Crawford hit 12 inside-the-park home runs — a single-season MLB record that still stands." },
    { title: "More Triples Than Doubles", type: "Game Action", text: "At season's end, the statistician checks the numbers. Your right fielder has more triples than doubles. This has happened FOUR TIMES in his career. It defies physics — the triple is harder, longer, more exhausting. But Crawford makes the triple look routine and the double look lazy. +2 SPD. +2 POW. The geometry of the outfield bends for him.", origin: "Crawford hit more triples than doubles four times in his career (1902, 1903, 1914, 1916) — an almost incomprehensible feat." },
    { title: "The Telegram to Lajoie", type: "Drama", text: "Your rival teammate has won the batting title again. Or has he? Reports say Nap Lajoie has beaten him. Your right fielder — who hates your rival — sends a congratulatory telegram. 'Glad you beat the cheapskate.' The report is wrong. Your rival won after all. The telegram is discovered. The clubhouse fractures further. -2 team chemistry. +1 honesty. The feud deepens.", origin: "1910: Crawford allegedly sent a telegram congratulating Lajoie on beating Cobb for the batting title. The report was erroneous — Cobb had won." },
    { title: "There Never Was a Player", type: "Drama", text: "'There never was a player who could hit a ball harder than Sam Crawford.' Ed Barrow says this — the same man who will convert Babe Ruth from a pitcher to an outfielder. The greatest baseball mind of the next generation looks at your right fielder and sees the hardest hitter alive. +3 CON. +2 legacy. The endorsement that echoes.", origin: "Ed Barrow, who later built the Yankees dynasty, said of Crawford: 'There never was a player who could hit a ball harder.'" },
    { title: "The Glory of Their Times", type: "Drama", text: "Decades after retirement, a writer named Lawrence Ritter finds your right fielder in Hollywood, California. He is 86 years old. He tells the story of the dead-ball era — the triples, the inside-the-park home runs, the feud with Cobb, the three World Series they lost. His voice is preserved forever. +5 cultural legacy. +3 oral history. The era speaks through him.", origin: "Crawford was a key interview subject in Lawrence Ritter's The Glory of Their Times (1966), one of the greatest baseball books ever written." },
    { title: "Forty Hits Short", type: "Drama", text: "Your right fielder retires with 2,961 hits. He is 39 hits short of 3,000 — a milestone that will become sacred. He doesn't know it matters. He goes to Hollywood and lives for 50 more years. The 3,000th hit he never got haunts his statistical legacy. -1 recognition. +2 'what if.' The number he didn't know to chase.", origin: "Crawford retired with 2,961 hits — 39 short of 3,000. The milestone wasn't significant in his era. He played 4 more years in the PCL." },
    { title: "Lost All Three", type: "Drama", text: "Your team wins the American League pennant. For the third consecutive year. Your right fielder has led the league in multiple categories. The World Series begins. Your team loses. Again. For the third time. Three pennants. Zero championships. The greatest regular-season run-producer of his generation has no ring. -3 CLU. +1 tragedy. The crown that never came.", origin: "Tigers won AL pennants in 1907, 1908, 1909. Lost all three World Series. Crawford never won a championship." },
  ],

  art_direction: {
    face: "STRONG, WEATHERED, MIDWESTERN. 6'0\" 190 lbs — big, sturdy, athletic. The face should be MIDWESTERN HONEST — broad features, strong jaw, sun-weathered from Nebraska prairie and Detroit summers. Not pretty, not intellectual — POWERFUL. The look of a man who was a barber before he was a ballplayer, who hit the ball harder than anyone alive through sheer physical authority. The eyes should carry a hint of BITTERNESS — the residue of the Cobb feud, the three lost World Series, the 40 hits he never knew to chase. But also PRIDE — the quiet pride of a man from Wahoo who became the all-time triples king.",
    attire: "Detroit Tigers uniform circa 1911 — white wool jersey with Old English 'D' on the left chest, baggy flannel pants, flat cap. THE POSE: the follow-through of a line drive to the gap — left-handed swing completed, the ball already screaming toward right-center, Crawford's body perfectly extended, the swing built for distance not height. He hit LINE DRIVES — the ball stayed low and hard and rolled forever in the cavernous dead-ball outfields. Or: rounding second heading for third — the triple in progress, legs churning, head down, the 309th of 309. Or: standing in RF at Bennett Park, the vast Detroit outfield stretching behind him. No number.",
    mood: "VAST AND RELENTLESS. Crawford's card should feel like PRAIRIE — the endless Nebraska sky, the vast dead-ball outfields, the distances the ball traveled to become triples. Where Baker is grounded earth and Collins is polished amber, Crawford is OPEN SPACE — wide, expansive, the feeling of a ball rolling forever through an outfield gap. The mood should suggest distance, persistence, the relentless accumulation of 309 triples over 19 years.",
    style: "Sepia-toned with WARM, GOLDEN PRAIRIE undertones — the color of Nebraska wheat, autumn grass, the wide-open Midwest. Similar warmth to Jackson's sunset gold but broader, less intimate — the palette of a landscape rather than a portrait. The Crawford palette is PRAIRIE GOLD — expansive, warm, endless. The outfield stretching to the horizon.",
    reference: "Think the triple — the ball in the gap, Crawford rounding second, legs churning, the outfielder still chasing. The triple is the most exciting play in baseball — a ball hit hard enough to reach the wall and a man fast enough to reach third. Crawford did this 309 times. Or: the interview with Ritter — Crawford at 86, telling the story, the voice of the dead-ball era preserved. Or: the vast outfield of Bennett Park, Detroit — the cavernous space that made triples possible, Crawford's kingdom.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "10-19 HR", value: 1 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "16-30 SB", value: 2 }], note: "309 3B require speed, but SB totals are tier 2" },
  defense: { metric: "Positional excellence", note: "Good in prime, declined. RF not premium position." },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "WS titles + postseason", note: "0 titles. Lost 3 straight WS (1907-09)." },
};

const C = {
  parchment: "#f2ead6", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#c4a048", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", prairie: "#c4a555",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e0d8c6", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function SamCrawfordCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #221a10 0%, #171210 50%, #221a10 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.silver, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.prairie}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.prairie, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.prairie}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.prairie}dd`, color: C.ink, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>HOF 1957</span>
                <span style={{ background: `${C.prairie}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>ELITE</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.prairie, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>The King of Triples — 309 (ALL-TIME RECORD)</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.warmRed}10`, border: `1px solid ${C.warmRed}30`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.warmRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>⚠ 3× AL PENNANT — 0× WS CHAMPION (LOST ALL THREE 1907-09)</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "XBH", val: d.real_stats.xbh },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "RBI", val: d.real_stats.rbi }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1911 — .378 BA / 115 RBI / 57 XBH / CAREER HIGH</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: ".309" },{ label: "CAR H", val: "2,961" },{ label: "CAR 3B", val: "309" },{ label: "CAR RBI", val: "1,525" },{ label: "CAR HR", val: "97" },{ label: "CAR 2B", val: "458" },{ label: "ITP HR", val: "51" },{ label: "OPS+", val: "144" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.prairie, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>309 3B = ALL-TIME RECORD • 12 ITP HR IN 1901 = SEASON RECORD • FIRST TO LEAD NL + AL IN HR</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📖 HOF 1957", "🏃 309 3B All-Time", "💪 12 ITP HR (Record)", "🌾 Wahoo, Nebraska", "📚 Glory of Their Times", "😤 Cobb's Rival", "🎯 2,961 H (39 shy of 3K)", "🏟 6× AL 3B Leader"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.prairie}15`, border: `1px solid ${C.prairie}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.prairie, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "HOME" ? `${C.prairie}20` : l.affinity === "PAINFUL" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "HOME" ? C.prairie : l.affinity === "PAINFUL" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`, color: a.type === "Drama" ? C.warmRed : C.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Crawford's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
