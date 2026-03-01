import { useState } from "react";

const PLAYER_DATA = {
  name: "Stan Musial",
  nickname: "Stan the Man",
  year: 1948,
  team: "St. Louis Cardinals",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "OF/1B",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "175 lbs",
  born: "November 21, 1920 — Donora, PA",
  died: "January 19, 2013 — Ladue, MO (age 92)",
  hof: "HOF 1969 (first ballot, 93.2%). 3× MVP. 24× All-Star. 3× WS Champion. #6 retired. 128.3 career WAR.",

  real_stats: {
    season: 1948, games: 155, at_bats: 611, hits: 230, doubles: 46, triples: 18,
    home_runs: 39, rbi: 131, runs: 135, stolen_bases: 7, walks: 79, strikeouts: 34,
    batting_avg: ".376", obp: ".450", slg: ".702", ops: "1.152", ops_plus: 205, war: 11.0,
    total_bases: 429,
    career_avg: ".331", career_hits: 3630, career_hr: 475, career_rbi: 1951,
    career_runs: 1949, career_doubles: 725, career_war: 128.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .376 BA → tier 5 (.330+). OPS+ 205 → +1 bonus (130+) = 6, capped at 5. CON = 5.
  // POW: 39 HR → tier 3 (30-39). SLG .702 → +1 bonus (.500+) = 4. POW = 4.
  // SPD: 7 SB → tier 1 (6-15). 18 triples (led NL) shows real speed. SPD = 1.
  // DEF: Adequate OF/1B. Not a defensive standout. No GG equivalent. DEF = 0.
  // CLU: WS career: .256 in 23 games. Won 3 WS (1942, 44, 46) but didn't dominate October.
  //   PS BA .256 → tier 1 (.250-.299). No singular WS hero moment. CLU = 1.
  // OVR: First-ballot HOF, 3× MVP, 128.3 WAR, .331 career, 3,630 H, 475 HR.
  //   One of the 10 greatest hitters in baseball history. OVR = 13 (Mythic).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 13,     // MYTHIC — one of the 10 greatest hitters ever. 128.3 WAR. 3× MVP. First ballot HOF.
    con: 5,      // .376 BA → tier 5. OPS+ 205. 34 K in 611 AB. Led NL in BA 7 times. Maximum contact.
    pow: 4,      // 39 HR → tier 3. SLG .702 → +1 = 4. 475 career HR. 429 total bases in '48.
    spd: 1,      // 7 SB but 18 triples (led NL). Musial had surprising speed — not a burner but mobile.
    def: 0,      // Adequate outfielder/first baseman. No defensive distinction. Moved to 1B as he aged.
    clu: 1,      // WS: .256 in 23 games. Won 3 rings but never dominated October. No singular hero moment.
  },

  stat_justification: {
    con: "Led the NL in BA 7 times. Career .331. In 1948: .376 with 230 hits, 46 doubles, 18 triples — leading the NL in all three. Struck out only 34 times in 611 AB — ratio of 18:1 AB/K. OPS+ of 205. Preacher Roe's method of pitching to Musial: 'Walk him on four pitches and pick him off first.' The most gifted pure hitter of his generation. Maximum contact.",
    pow: "39 HR in 1948 — one shy of the Triple Crown. .702 SLG, 429 total bases (NL record). Career 475 HR, 725 doubles (3rd all-time). 1,951 career RBI. This was power AND contact — Musial didn't sacrifice one for the other. The SLG bonus pushes him to 4. Rating of 4.",
    spd: "7 SB in 1948 — modest. But 18 triples (led NL) shows real speed. Musial had more career triples (177) than most power hitters dream of. He was a good runner, not a great one. His 'corkscrew' stance uncoiled into surprising burst. Rating of 1.",
    def: "Musial played outfield in his younger years and first base as he aged. He was an adequate fielder at both positions but never a defensive standout. No Gold Glove equivalent. His value was almost entirely offensive. Rating of 0.",
    clu: "World Series: .256 in 23 games across 4 Fall Classics. Won 3 rings (1942, 1944, 1946) but never appeared in the WS after age 26. His .304 in the 1944 WS was his best. No singular hero moment — Musial's October legacy is that he was there for the wins but didn't dominate. The Cardinals never made it back during his prime years. Rating of 1.",
  },

  personality: {
    leadership_style: "Lead by example, lead by joy. Musial was not a fire-breather or a strategist — he was a man who played the game with infectious happiness. Teammates loved him because he was genuinely good: good at baseball, good to people, good in the community. Branch Rickey: 'Here stands baseball's perfect knight.' He led by making everyone around him feel like the game was beautiful.",
    temperament: "Warm, humble, unshakably decent. Musial was universally loved — by teammates, opponents, fans, and writers. He had no enemies. He played the harmonica in the clubhouse. He signed every autograph. He remembered names. Ted Williams was his rival, but they were close friends. Musial embodied joy in competition. Bob Gibson said Musial could 'talk to a telephone pole and make it feel important.'",
    work_ethic: "The corkscrew. Musial developed his unique 'peek-a-boo' batting stance — a tightly coiled corkscrew that disguised his timing from pitchers. It looked unorthodox but generated incredible bat speed and plate coverage. He gripped the bat at the knob for extra leverage. He worked endlessly on his craft, arriving at his 1948 peak after offseason surgery cleared infections that had weakened him. 'I knew this would be it, my big year,' he said. He was right.",
    lifestyle: "Donora, Pennsylvania boy to St. Louis legend. Polish-American heritage (born Stanislaw Franciszek Musial). Married to Lillian 'Lil' Labash for 72 years until his death. Four children. After baseball: successful restaurateur (Stan Musial & Biggie's), civic leader, Presidential Medal of Freedom recipient (2011). Played harmonica at team functions. Named bridge, statue, and countless awards after him. Lived in St. Louis for the rest of his life.",
    era_adaptability: "EXTREMELY HIGH. Musial's numbers translate to any era. His .331/.417/.559 career line, 128.3 WAR, and 34 K in 611 AB would make him elite in any decade. His plate discipline is timeless. His power-contact combination is extraordinarily rare. Modern analytics would worship his OBP and walk-to-strikeout ratio. The corkscrew stance might look weird on video, but the results are beyond debate.",
    clubhouse_impact: "UNIVERSAL POSITIVE. There is no player in baseball history with fewer enemies than Stan Musial. He transcended team loyalty — Brooklyn fans gave him the 'Stan the Man' nickname as a compliment from the opposing stands. His teammates adored him. His opponents respected him. He was the anti-controversy: no scandals, no feuds, no dark chapters. In ILB terms: Musial is a +3 chemistry card for every teammate on the roster, with no negatives.",
    dark_side: "The missing Octobers. Musial won 3 World Series before age 26 but never appeared in another. The Cardinals of the late 1940s and 1950s couldn't get back. Musial's career postseason line (.256 in 23 games) is his only statistical weakness. He also missed the 1945 season to Navy service — his already staggering career numbers would have been even higher. In ILB terms: Musial's dark side isn't about character — it's about the October absence. The greatest hitter of his generation never got to prove it on the biggest stage during his peak.",
  },

  chemistry_traits: [
    { tag: "Stan the Man", desc: "Even opposing fans respected him. Brooklyn gave him the nickname. +2 fan morale at ALL ballparks — home and away." },
    { tag: "The Corkscrew", desc: "Unique peek-a-boo batting stance. Impossible to scout because it disguises timing. -1 to opposing pitcher's STF when facing Musial." },
    { tag: "Perfect Knight", desc: "Branch Rickey's phrase. No enemies, no scandals, no dark chapters. +3 chemistry with all teammates. Zero negative chemistry events." },
    { tag: "Harmonica Man", desc: "Plays harmonica in the clubhouse. Lightens the mood after losses. Team recovers from cold streaks 1 game faster." },
    { tag: "1,815 / 1,815", desc: "Exactly 1,815 career hits at home AND on the road. Musial's consistency is supernatural. No home/away splits penalty." },
    { tag: "Polish Lightning", desc: "Donora, PA to St. Louis legend. Working-class Polish-American heritage. +1 chemistry with immigrant-background and blue-collar teammates." },
    { tag: "NL Rival to Williams", desc: "Musial and Ted Williams: the two greatest hitters of the 1940s-50s. When both are in the same game, both get +1 CON. Mutual respect amplifies performance." },
    { tag: "The Missing Octobers", desc: "Won 3 WS before 26 but never appeared again. If team misses playoffs, -1 morale to Musial. The absence haunts." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: ".376 in 1948. .331 career. 3,630 hits. 7 batting titles. This is home." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Harmonica, smiles, autographs. Universal beloved presence." },
    { location: "Stan & Biggie's Restaurant", affinity: "HIGH", note: "Successful restaurateur in St. Louis. Post-baseball life was as golden as the career." },
    { location: "Sportsman's Park / Busch Stadium", affinity: "HIGH", note: "22 years, one franchise. 1,815 hits at home. St. Louis is Musial's city." },
    { location: "Ebbets Field (Away)", affinity: "HIGH", note: "Brooklyn fans gave him the 'Stan the Man' nickname. He hit .443 vs. the Braves, .379 vs. the Reds." },
    { location: "USO / Military Functions", affinity: "MEDIUM", note: "Navy veteran, 1945. Presidential Medal of Freedom, 2011." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Family man. Married 72 years. Not a nightlife player." },
  ],

  momentum: {
    hot_triggers: [
      "Any at-bat — Musial hit in 121 of 155 games in 1948. He was almost always hot",
      "Multi-hit games — four 5-hit games in 1948 alone. When rolling, Musial is unstoppable",
      "Road games — .415 BA on the road in 1948. Away crowds couldn't rattle him — they admired him",
      "vs. Left-handed pitching — .416 vs. LHP in 1948. No platoon weakness whatsoever",
    ],
    cold_triggers: [
      "World Series — .256 career. Musial's only consistent weakness. October didn't bring his best",
      "Extended team losing — Musial's Cardinals missed the WS from 1947-1963. Team futility frustrated him",
      "Physical ailments — low-grade infections hampered him before 1948 surgery. When unhealthy, production dips",
    ],
    pressure_response: "SUPERNATURALLY CONSISTENT, OCTOBER-ORDINARY. Musial's regular season numbers are among the greatest in history. He hit .376 in 1948, .331 for his career, and struck out only 696 times in 10,972 at-bats. He was as close to automatic as a hitter can be. But his WS numbers (.256 in 23 games) are merely adequate. The Cardinals won 3 titles with a young Musial, then never got back. In ILB terms: Musial is +2 CON during the regular season, +0 in the World Series. His greatness is in the relentless daily dominance, not the singular October eruption.",
  },

  action_card_seeds: [
    {
      title: "One Home Run from the Triple Crown",
      type: "Game Action",
      text: "Your star leads the league in batting average, hits, doubles, triples, RBIs, runs, total bases, OBP, and slugging. He's one home run short of leading in HRs too — one homer from the Triple Crown. A rained-out game cost him the chance. He wins his third MVP anyway.",
      origin: "1948. Musial led the NL in 9 categories. His 39 HR were one behind Kiner and Mize. A rained-out HR may have given him the Triple Crown. He won his 3rd MVP regardless.",
    },
    {
      title: "The Corkscrew Stance",
      type: "Action",
      text: "Your hitter coils into a stance so unorthodox that no pitcher can read his timing. He peeks over his shoulder at the pitcher, body wound tight like a spring. When the pitch comes, the spring uncoils. The best pitcher in the opposing league says the only way to retire him is to walk him on four pitches and pick him off first.",
      origin: "Musial's unique peek-a-boo corkscrew stance disguised his timing perfectly. Preacher Roe's famous quote about walking him was only half-joking.",
    },
    {
      title: "Stan the Man — Named by the Enemy",
      type: "Drama",
      text: "Your star visits the opposing team's ballpark. He destroys their pitching — again. As he walks to the plate, the opposing fans murmur in admiration, not anger: 'Here comes the Man.' The nickname sticks. Even the enemy loves him.",
      origin: "Brooklyn Dodgers fans at Ebbets Field coined 'Stan the Man' in the late 1940s as Musial destroyed their pitching year after year. It was a compliment from the opposing stands.",
    },
    {
      title: "Five Home Runs in a Doubleheader",
      type: "Game Action",
      text: "Your slugger hits three home runs in the first game. Then two more in the second game. Five home runs in one afternoon. No player has ever done this before. It will be done only once more in the next 70 years.",
      origin: "May 2, 1954. Musial hit 3 HR in game one (off Antonelli and Hearn) and 2 in game two (off Wilhelm) vs. the Giants. First player ever with 5 HR in a doubleheader.",
    },
    {
      title: "1,815 and 1,815",
      type: "Action",
      text: "Your star finishes his 22-year career with an extraordinary statistical curiosity: exactly the same number of hits at home as on the road. Not approximately — exactly. The universe of baseball aligned for him in a way that defies probability.",
      origin: "Musial's 3,630 career hits split exactly: 1,815 at home, 1,815 on the road. A statistical coincidence so perfect it seems designed.",
    },
    {
      title: "The Harmonica in the Clubhouse",
      type: "Action",
      text: "Your team loses a tough game. The clubhouse is silent. Then your star pulls out a harmonica and starts playing. The mood shifts. Tension breaks. Tomorrow is a new game. He reminds everyone that baseball is supposed to be fun.",
      origin: "Musial was famous for playing harmonica in the Cardinals clubhouse. His joy was infectious and helped the team recover from losses.",
    },
    {
      title: "The Perfect Knight",
      type: "Drama",
      text: "Your franchise's president surveys the game and announces: 'Here stands baseball's perfect knight.' No one argues. No one has ever argued. In a sport full of scandal, ego, and controversy, one player remained utterly spotless for 22 years.",
      origin: "Branch Rickey called Musial 'baseball's perfect knight.' In 22 seasons, Musial had no scandals, no feuds, no controversies. He was universally beloved.",
    },
    {
      title: "The Bridge Over Donora",
      type: "Drama",
      text: "Your retired star's home state renames the bridge over the river from his hometown. The ceremony features the governor, dignitaries, and thousands of fans. The bridge carries his name forever — connecting two shores, like the man connected two worlds: small-town Pennsylvania and big-league St. Louis.",
      origin: "In 2013, Pennsylvania renamed the Donora-Monessen Bridge the 'Stan Musial Veterans Memorial Bridge.' Musial grew up in Donora — the bridge connects his hometown to the wider world.",
    },
  ],

  art_direction: {
    face: "6'0\" 175 lbs, lean, athletic. Polish-American features — warm, genuine face, the easy smile that defined him. Not ruggedly handsome like a cowboy — approachable, kind, the face of a man who signed every autograph. The eyes radiate joy. This is a man who played 22 seasons and never had an enemy.",
    attire: "St. Louis Cardinals home whites, 1948 style. Number 6. 'Cardinals' script with the famous birds-on-bat. Left-handed batter in the corkscrew stance — body coiled, peeking over his right shoulder at the pitcher, bat cocked, spring about to uncoil.",
    mood: "Pure joy in excellence. The 1948 season — .376, 39 HR, 131 RBI, one HR from the Triple Crown. Musial isn't straining or grinding — he's smiling. The card should radiate the feeling that for Stan Musial, hitting a baseball was the most natural and pleasurable thing in the world.",
    style: "Sepia-toned with warm golden highlights, but with slightly MORE gold than other cards — this is a Mythic-tier card, and it should feel luminous. Sportsman's Park in the background, 1948 afternoon sun. The card should feel like watching something perfect.",
    reference: "Think of the all-time greats: Ruth, Williams, Mays, Aaron. Musial belongs in that tier. The card should convey not just statistical dominance but an ineffable quality of goodness — the man who was great AND decent, powerful AND gentle, dominant AND humble. Baseball's perfect knight.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function StanMusialCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era — ★ MYTHIC ★</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 0 20px ${C.gold}40, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: `linear-gradient(90deg, ${C.darkBrown}, ${C.warmRed}80, ${C.darkBrown})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.gold}20 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.gold}06 2px, ${C.gold}06 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Golden-sepia, corkscrew stance, Cardinals #6, Sportsman's Park]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${C.gold}, #e8c84c)`, color: C.darkBrown, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>★ OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.gold}30`, color: C.gold, padding: "2px 12px", borderRadius: 10, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>MYTHIC</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.gold, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>1948 — LED NL IN 9 CATEGORIES — 3RD MVP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.gold}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.gold}40` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR R", val: d.real_stats.career_runs },{ label: "CAR 2B", val: d.real_stats.career_doubles },{ label: "TB '48", val: d.real_stats.total_bases },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 22 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1969 (1st Ballot)", "🏆 3× WS Champion", "👑 3× NL MVP", "⭐ 24× All-Star", "📊 128.3 Career WAR", "🔥 .376 / 39 HR / 131 RBI", "💎 3,630 Career Hits", "🎖️ Medal of Freedom"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}25`, border: `1px solid ${C.gold}50`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 600 }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>★ MYTHIC DOSSIER — {d.year} ★</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.gold}40`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Musial's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Hitter Stat Conversion Engine">
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Musial's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.darkBrown}, ${C.warmRed}40, ${C.darkBrown})`, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, fontWeight: 700 }}><span>ILB ★ MYTHIC ★ {d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "MYTHIC", stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
