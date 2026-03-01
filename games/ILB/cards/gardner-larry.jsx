// /cards/players/larry-gardner.jsx
import { useState } from "react";

const GARDNER_DATA = {
  name: "Larry Gardner",
  nickname: "The Vermont Professor",
  year: 1912,
  team: "Boston Red Sox",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "3B",
  bats: "L",
  throws: "R",
  height: '5\'7"',
  weight: "165 lbs",
  born: "May 13, 1886 — Enosburg Falls, VT",
  died: "March 11, 1976 — St. George, VT (age 89)",
  hof: "Not inducted. Red Sox HOF 2000. Vermont Sports HOF 2012. Named one of Top 100 Cleveland Indians ever. Never received a BBWAA vote, but 4 WS rings and ~35 career WAR.",

  real_stats: {
    season: 1912,
    games: 143,
    at_bats: 517,
    hits: 163,
    doubles: 24,
    triples: 18,
    home_runs: 3,
    rbi: 86,
    stolen_bases: 25,
    batting_avg: ".315",
    obp: ".370",
    slg: ".434",
    ops: ".804",
    runs_scored: 68,
    walks: 41,
    career_avg: ".289",
    career_hits: 1931,
    career_hr: 27,
    career_sb: 165,
    career_triples: 129,
    career_war: "~35",
    ws_appearances: 4,
    ws_wins: 4,
    ws_hr: 3,
    ws_games: 25,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CON: .315 BA (1912) → tier 4 (.300-.329). .289 career, five .300+ seasons. CON = 4.
  // POW: 3 HR (1912). 27 career. Deadball Era, but 129 triples = gap power. POW = 0.
  // SPD: 25 SB (1912). 165 career. 129 career triples (top 100 all-time). SPD = 2.
  // DEF: Solid Deadball Era 3B. Played ~1,400 games at 3B. Reliable, not flashy. DEF = 1.
  // CLU: 4-for-4 WS record. Series-winning sac fly off Mathewson (1912). 3 HR in 25 WS games vs 27 in 1,923 reg season. Inside-the-park HR off Marquard. CLU = 3 (MAX).
  // OVR: CON×2(8) + POW×1.5(0) + SPD×1(2) + DEF×0.5(0.5) = 10.5 → normalized ~6
  // But CLU 3 must be factored as an extreme outlier. Adjusted OVR = 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — modest regular season profile elevated by historically unprecedented postseason success. 4-for-4 in World Series.
    con: 4,      // .315 BA in 1912 (tier 4). .289 career. Five .300+ seasons. Consistent contact hitter with a chemistry degree.
    pow: 0,      // 3 HR in 1912. 27 career in 1,923 games. Deadball Era slap hitter. The triples came from speed, not power.
    spd: 2,      // 25 SB in 1912. 165 career. 129 career triples — but at 5'7", he was more quick than fast. Tier 2.
    def: 1,      // Solid Deadball Era 3B. Played 1,400+ games at the position. Reliable, no errors in crucial moments. Not spectacular.
    clu: 3,      // THE MOST CLUTCH CARD IN ILB. 4-for-4 in World Series. Only player to end a WS with a sacrifice fly. 3 HR in 25 WS games vs 27 HR in 1,923 regular season games. Inside-the-park HR off Marquard. The postseason version of Larry Gardner was a different human being.
  },

  stat_justification: {
    con: "Hit .315 in 1912 with the pennant-winning Red Sox. Career .289 across 17 seasons. Five seasons of .300+. His best average was .319 with the 1921 Indians. OBP of .370 in 1912 — good plate discipline. He had a bachelor's degree in chemistry, which is unrelated to hitting but tells you something about his intellect. Rating of 4.",
    pow: "3 HR in 1912. 27 career HR in 1,923 games — roughly one homer every 71 games. This is quintessential Deadball Era production. His 129 career triples suggest gap power and speed, not fence-clearing strength. Rating of 0.",
    spd: "25 SB in 1912. 52 combined SB in 1911-12. 165 career SB. 129 career triples — 100th all-time at retirement. At 5'7\" 165 lbs, Gardner was compact and quick, able to leg out extra bases and take the extra bag. Not a burner but consistently fast. Rating of 2.",
    def: "Played ~1,400 games at third base across 17 seasons. Described as 'one of the best third basemen of the Deadball Era' by SABR. Red Sox used 9 different third basemen in 1918 after trading him — none matched his reliability. Solid defender without flashy highlights. Rating of 1.",
    clu: "This is the stat that defines Larry Gardner. In 4 World Series appearances, his team won ALL FOUR (1912, 1915, 1916, 1920 — Red Sox and Indians). He hit the series-winning sacrifice fly off Christy Mathewson in the 10th inning of the 1912 WS Game 8 — the only player in history to end a World Series with a sac fly. He hit 3 HR in 25 WS games, versus only 27 HR in 1,923 regular season games — a postseason power surge of roughly 10x his normal rate. His 1916 WS featured a 3-run inside-the-park homer off Rube Marquard. In 1920, he led the Indians with 118 RBI and won a 4th ring. Gardner is the most disproportionately clutch hitter in Deadball Era history. Rating of 3 — MAXIMUM.",
  },

  personality: {
    leadership_style: "Quiet, educated, reliable. Gardner was the anti-showman — a Vermont chemistry graduate who played third base with the same precision he brought to a lab. He never made headlines. He never demanded attention. He just showed up, hit .289, played 143 games, and won World Series. His leadership was through presence and consistency — the kind of player managers build around without ever talking about.",
    temperament: "Calm, intelligent, self-effacing. Gardner returned to the University of Vermont after his career and coached baseball for 30 years. He invested in a Cape Cod cranberry business (an early frost ruined it) and later ran an auto dealership in Enosburg Falls. He was practical, grounded, and completely uninterested in fame. When he died at 89 in Vermont, he'd spent more of his life as a college coach than as a ballplayer.",
    work_ethic: "Steady and professional. Gardner played 17 seasons — from age 22 to 38 — without ever being the best player on his team but always being essential. He played alongside Tris Speaker, Smoky Joe Wood, Babe Ruth, and Tris Speaker again (with Cleveland). He was the quiet constant in a parade of legends.",
    lifestyle: "Vermont through and through. Born in Enosburg Falls, attended UVM, played the first game at Centennial Field (1906) and the first game at Fenway Park (1912). Returned to UVM as coach and athletic director from 1929-1951. Died in St. George, Vermont at 89. Gardner's world was bounded by the Green Mountains — he left only to play baseball, and he always came home.",
    era_adaptability: "MODERATE. Gardner's .289 career average and solid defense translate well. His utter lack of power (27 HR in 1,923 games) would be a problem in any era after 1920. But his clutch performance — the most disproportionate postseason-to-regular-season production ratio of the Deadball Era — suggests a player who rises to the occasion in ways stats can't predict.",
    clubhouse_impact: "STABILIZING. Gardner was the teammate everyone respected and nobody envied. He wasn't the star — he was the man who played next to the star. Speaker was the centerfielder, Wood was the pitcher, Ruth was the phenomenon. Gardner was the third baseman who drove in the winning run when everyone else was watching the stars. In ILB: Gardner provides a +1 chemistry bonus to every teammate with a higher OVR.",
    dark_side: "There is no dark side. Larry Gardner is the most wholesome card in the Muggers set — a chemistry graduate from Vermont who won four World Series, returned to coach college baseball, and died at 89. In a set filled with corruption (Chase), tragedy (Chapman), injustice (Kauff), and madness (Vaughn's disappearance), Gardner is the palate cleanser. His dark side is that nobody remembers him. In ILB: Gardner carries a 'Forgotten Winner' trait — his contributions are always attributed to his more famous teammates.",
  },

  chemistry_traits: [
    { tag: "Four Rings", desc: "Gardner won every World Series he appeared in — 1912, 1915, 1916, 1920. Any team with Gardner gains +1 to postseason win probability. The man simply does not lose in October." },
    { tag: "The Sacrifice Fly", desc: "Gardner ended the 1912 World Series with a sacrifice fly off Christy Mathewson — the only player in history to end a WS with a sac fly. In ILB, when the game is on the line, Gardner gets +2 CLU for 'productive outs' that score runners." },
    { tag: "Postseason Transformer", desc: "27 HR in 1,923 regular season games. 3 HR in 25 WS games. A 10x power surge in October. Gardner's POW stat increases from 0 to 2 in any postseason game." },
    { tag: "Vermont Steady", desc: "Gardner's consistency provides +1 team chemistry. He never demands attention, never causes drama. In a clubhouse of egos and scandals, he's the quiet professional who makes everyone better." },
    { tag: "Chemistry Degree", desc: "Bachelor's in Chemistry from UVM, 1909. Gardner is the most educated player in the Muggers set. +1 to strategic thinking in any complex game situation." },
    { tag: "Forgotten Winner", desc: "Gardner's contributions are always overshadowed by teammates (Speaker, Wood, Ruth). In ILB, his stat line appears modest but his win shares are disproportionately high. The stat sheet lies about Larry Gardner." },
    { tag: "First at Fenway", desc: "Gardner played in the first game at Fenway Park (1912). When playing at a new ballpark, Gardner gets +1 adaptability bonus for the first series." },
    { tag: "Coach's Eye", desc: "After retirement, Gardner coached at UVM for 30 years. He can evaluate opposing players' weaknesses: +1 to team scouting when Gardner is in the lineup." },
  ],

  preferred_locations: [
    { location: "Vermont / New England", affinity: "HIGH", note: "Born, educated, and died in Vermont. Coached at UVM for 30 years. The Green Mountains were home." },
    { location: "Fenway Park", affinity: "HIGH", note: "Played the first game there. Won 3 WS as the Red Sox third baseman. This was his stage — even if no one noticed." },
    { location: "University Campus", affinity: "HIGH", note: "UVM graduate, coach, and athletic director. Gardner was an academic who happened to play baseball at an elite level." },
    { location: "World Series", affinity: "MAXIMUM", note: "4-for-4. The only player in the Muggers set who never lost on the biggest stage. This is where Gardner becomes someone else entirely." },
    { location: "Auto Dealership", affinity: "MEDIUM", note: "Owned a Willys-Knight dealership in Enosburg Falls with his cousin's husband. A practical man with practical investments." },
    { location: "Cranberry Bog", affinity: "LOW", note: "Invested in a Cape Cod cranberry business. An early frost ruined the harvest and destroyed the company. Even Gardner's luck had limits." },
  ],

  momentum: {
    hot_triggers: [
      "October — Gardner is a different player in the postseason. His power triples, his average holds, and he delivers the decisive blow.",
      "Big pitching matchups — facing Mathewson, Marquard, the best arms. Gardner elevated against the best.",
      "Team success — when the team is winning, Gardner gets better. He feeds on collective momentum.",
      "New environments — first game at Fenway, first game at Centennial Field. Gardner thrives in fresh settings.",
    ],
    cold_triggers: [
      "Bad teams — Gardner hit .285 for the last-place 1918 Athletics. Without a winning culture, his production dipped.",
      "Aging — his final years (1922-24) were diminished by nagging injuries. The body gave out before the mind.",
      "Off-field distraction — the cranberry business failure showed Gardner wasn't immune to setbacks outside baseball.",
      "Being ignored — Gardner never complained about anonymity, but the lack of recognition meant no HOF campaign, no legacy building.",
    ],
    pressure_response: "TRANSCENDENT. This is the word for Larry Gardner in October. He is not merely 'good in the clutch' — he is transformed. A .289 hitter who barely homers becomes a .300+ hitter who goes deep in the World Series. The sacrifice fly off Mathewson. The inside-the-park homer off Marquard. The 118 RBI powering Cleveland to a title. In ILB, Gardner is the secret weapon — the player your opponent underestimates because his regular-season stats look modest. But when the stakes are highest, Larry Gardner becomes the most dangerous hitter in the lineup.",
  },

  action_card_seeds: [
    {
      title: "The Sacrifice Fly That Won the Series",
      type: "Game Action",
      text: "Bottom of the 10th. Your team trails by one, but a dropped fly ball, a great catch, a walk, and a clutch single have loaded the bases with one out. Your 5'7\" third baseman — 3 homers all season — lofts a deep fly to right field. The runner tags. He scores. The World Series is over. You won it with the most modest of plays: a sacrifice fly.",
      origin: "1912 World Series, Game 8, bottom of the 10th. After Snodgrass's muff and Speaker's single, Gardner drove a sac fly off Mathewson to score Yerkes. The only player to end a WS with a sacrifice fly.",
    },
    {
      title: "The Inside-the-Park Job Off Marquard",
      type: "Game Action",
      text: "Game 4 of the World Series. Your team trails 2-0. Your third baseman — who has hit 2 home runs all regular season — crushes a drive to the deepest part of center field off Rube Marquard. He circles the bases and slides home. Three-run inside-the-park homer. 3-2 lead. The Series turns.",
      origin: "1916 WS Game 4: Gardner hit a 3-run inside-the-park HR off Marquard into deep center at Ebbets Field, turning a 2-0 deficit into a 3-2 Red Sox lead. His 2 WS homers matched his regular season total.",
    },
    {
      title: "Four for Four",
      type: "Action",
      text: "Your player has now won four World Series — every one he's ever appeared in. 1912. 1915. 1916. 1920. Two different teams. Two different decades. His regular season stats say 'good player.' His postseason record says 'winner.' There is no explaining this. Some players just win.",
      origin: "Gardner won the WS with the 1912, 1915, and 1916 Red Sox and the 1920 Indians. He is one of the few players in history to win every World Series he appeared in across that many appearances.",
    },
    {
      title: "The Chemistry Graduate",
      type: "Action",
      text: "Your player holds a bachelor's degree in chemistry from a respected university. He is the most educated man on the field — and possibly in the entire league. Between games, he reads scientific papers. After retirement, he returns to the university as coach and athletic director for three decades.",
      origin: "Gardner graduated from UVM with a chemistry degree in 1909. He coached UVM baseball from 1929-1951 and served as athletic director. The Gardner-Collins Cage at UVM is named for him and teammate Ray Collins.",
    },
    {
      title: "First Game at Fenway",
      type: "Action",
      text: "Your franchise has built a new ballpark. The first game is today. Your third baseman — a local New England kid who played his first college game at the old park across town six years ago — takes the field. He'll play here for another five years, win three championships, and become part of the building's DNA.",
      origin: "Gardner played in the first game at Fenway Park on April 20, 1912. He also played in the first game at UVM's Centennial Field in 1906.",
    },
    {
      title: "Nine Players at Third Base",
      type: "Drama",
      text: "Your franchise trades its reliable third baseman after nine years. During the next season, you use NINE different players at third base. None of them are Larry Gardner. You win the World Series anyway, but you never find his replacement.",
      origin: "After trading Gardner to Philadelphia after 1917, the Red Sox used 9 players at 3B in 1918. They won the WS (the last before 2004) but never matched Gardner's consistency at the position.",
    },
    {
      title: "The Cranberry Disaster",
      type: "Drama",
      text: "Your player invests his savings in a Cape Cod cranberry business. An early frost destroys the entire harvest. The company folds. Your player, a chemistry graduate, accepts the loss with Vermont stoicism and opens an automobile dealership instead.",
      origin: "Gardner invested in cranberries on Cape Cod. A frost ruined the harvest. He pivoted to a Willys-Knight auto dealership in Enosburg Falls with his partner Francis Smith.",
    },
    {
      title: "The Quiet Constant",
      type: "Action",
      text: "Your third baseman plays alongside Tris Speaker, Smoky Joe Wood, Babe Ruth, and then Speaker again on a different team. He is never the star. He is always on the roster. He is always in the lineup. He always wins. He retires to coach college baseball in Vermont and dies at 89, remembered by almost nobody outside of New England.",
      origin: "Gardner was teammates with Speaker and Wood in Boston, overlapped briefly with Ruth, then joined Speaker in Cleveland. He was the constant in a parade of legends, overshadowed by all of them.",
    },
  ],

  art_direction: {
    face: "Compact 5'7\" 165 lbs — small even for the Deadball Era. Clean-cut, intelligent face with calm, steady eyes. The look of a man who has a chemistry degree and doesn't need to tell you about it. No flash, no swagger — just quiet confidence. He could be a professor or a banker. He happens to be a World Series hero.",
    attire: "Boston Red Sox 1912 home whites — the first Fenway Park season. Classic Deadball Era pose: crouched at third base, glove ready, or mid-swing with the compact left-handed stroke that produced 129 career triples. The uniform should look worn and functional — Gardner was a workman, not a fashion plate.",
    mood: "Quiet competence. This card should radiate understated reliability — the feeling of a player you trust completely without ever thinking about him. No drama, no tragedy, no spectacle. Just a small man from Vermont who won every World Series he entered and then went home to coach college baseball. The warmest and most comforting card in the Muggers set.",
    style: "Sepia-toned with gentle green undertones — Vermont's color, the Green Mountains. The gold accents should be subtle and warm, like autumn light in New England. This is not a flashy card — it's a card that grows on you, that you keep coming back to because something about it feels right.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, Kauff is a firecracker, Marquard is a spotlight, and Vaughn is a cathedral bell, then Gardner is a hearthfire. Warm, steady, always burning, always there when you need it. The ILB Gardner card should feel like coming home — modest on the outside, indispensable once you understand what you're holding.",
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

export default function LarryGardnerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GARDNER_DATA; const s = d.ilb_stats;
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
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.traitGreen}20, ${C.sepia}20)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🏔️</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "R", val: d.real_stats.runs_scored },{ label: "H", val: d.real_stats.hits },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "3B", val: d.real_stats.triples }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} BOSTON RED SOX — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR 3B", val: d.real_stats.career_triples },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "WS APPS", val: d.real_stats.ws_appearances },{ label: "WS WINS", val: d.real_stats.ws_wins },{ label: "WS HR", val: d.real_stats.ws_hr },{ label: "WS GP", val: d.real_stats.ws_games }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 17 SEASONS • 4 WORLD SERIES WINS (4/4)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 4× WS Champion", "🎯 Series-Ending Sac Fly", "⚾ 3 WS HR (27 reg)", "🏔️ Vermont Born & Bred", "🎓 Chemistry Degree", "🏟️ First at Fenway", "🔬 UVM Coach 30 yrs", "📊 .289 / 1,931 H"].map((a, i) => (
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
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MAXIMUM" ? `${C.hotRed}10` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MAXIMUM" ? C.hotRed : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Gardner's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Gardner's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
