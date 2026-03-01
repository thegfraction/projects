import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}reulbach-ed.png`;

const PLAYER_DATA = {
  name: "Ed Reulbach",
  nickname: "Big Ed",
  year: 1906,
  team: "Chicago Cubs",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "190 lbs",
  born: "December 1, 1882 — Detroit, MI",
  died: "July 17, 1961 — Glens Falls, NY (age 78, died the same day as Ty Cobb)",
  hof: "Never received a single HOF vote, despite Bill James HOF Monitor score of 101 (likely inductee level). Stats comparable to Sandy Koufax per SABR. Johnny Evers: 'Always five years ahead of his time in baseball thought.'",

  real_stats: {
    season: 1906, games: 33, wins: 19, losses: 4, era: "1.65",
    innings: "218.0", strikeouts: 93, walks: 72, complete_games: 20,
    shutouts: 6, whip: "0.977", saves: 0, war: 5.3,
    h_per_9: "5.33",
    // 1908 stats for comparison
    season_1908_w: 24, season_1908_l: 7, season_1908_era: "2.03",
    career_wins: 182, career_losses: 106, career_era: "2.28",
    career_strikeouts: 1137, career_cg: 201, career_shutouts: 40,
    career_war: 36.1, career_ip: "2632.1", career_era_plus: 123,
    ws_record: "2-0", ws_era: "3.03", ws_games: 7,
  },

  ilb_stats: {
    ovr: 9,      // Elite/Ace — ERA under 2.00 in 4 of first 5 seasons. Led NL in W% 3 straight years. Only pitcher ever to throw 2 CG shutouts in 1 doubleheader. But overshadowed by Brown, Mathewson, Walsh.
    stf: 4,      // 1.65 ERA in 1906 → tier 4 (1.50-1.99). H/9 of 5.33 — lowest by any pitcher until 1968. Not a K pitcher (~3.8 K/9, no K bonus). Extreme hit suppression, not velocity. Rating: 4.
    ctl: 3,      // BB/9 ~2.97 in 1906 — relatively wild. 1908 Reach Guide: "extremely wild and unreliable." But WHIP 0.977 (≤1.00 bonus = +1). BB/9 2.5-2.99 → tier 1, + WHIP bonus = 2. Hmm — let me recalculate. BB/9 ~2.97 = tier 1 + WHIP bonus = 2. But career suggests better control in other years. Using 1908 peak (24-7): BB/9 likely lower. Composite: 3.
    sta: 3,      // 218 IP in 1906 (limited games) → tier 2. But 1908: ~297 IP → tier 3. 20-inning CG win (1905). Two CG shutouts in one day (1908). Endurance was real but not McGinnity-level. Composite: 3.
    def: 1,      // No notable defensive reputation. Rating: 1.
    clu: 2,      // WS record 2-0. One-hitter in 1906 WS Game 2. Won 1907 WS Game 3 (CG). Two DH shutouts during 1908 pennant race. PS ERA 3.03 (tier 1: 2.00-4.00). + Hero moments (one-hitter in WS, pennant-race DH shutouts) = +1. Rating: 2.
  },

  stat_justification: {
    stf: "1.65 ERA in 1906 → tier 4 (1.50-1.99). The truly historic number: 5.33 H/9 in 1906 — the lowest by any pitcher in the modern era until 1968. In 12 starts that year he allowed 5 hits or fewer. Not a strikeout pitcher (K/9 ~3.8, no K bonus), but batters simply could not get hits off him. Extreme movement and deception rather than velocity. Rating: 4.",
    ctl: "The contradiction. His WHIP was elite (0.977 in 1906 — ≤1.00 bonus applies), but the 1908 Reach Guide called him 'extremely wild and unreliable.' BB/9 was around 2.5-3.0 in most seasons — not terrible but not elite. He'd pitch masterfully for stretches, then walk the park. The wildness was intermittent, not chronic. Composite: tier 1 base (BB/9 ~2.97) + WHIP bonus (+1) + upward adjustment for peak seasons = 3.",
    sta: "218 IP in 1906 (only 33 games) → tier 2. But in 1908: ~297 IP → tier 3. Pitched a 20-inning CG win vs. Philadelphia in 1905. Pitched two CG shutouts (18 IP total) in one doubleheader in 1908. The stamina was real — it just came in bursts rather than McGinnity-style marathon seasons. Composite: 3.",
    def: "No notable defensive reputation. Rating: 1.",
    clu: "WS record 2-0, ERA 3.03 in 7 games (5 starts) across 4 World Series (1906-10). Threw a one-hitter in Game 2 of the 1906 WS against the White Sox. Won Game 3 of the 1907 WS (CG, 5-1 vs. Tigers). September 26, 1908: pitched two CG shutouts in one doubleheader against Brooklyn during the tightest pennant race in history — 18 IP, 4 H, 0 R — three days after the Merkle game. PS ERA 3.03 → tier 1 (2.00-4.00). + WS wins and pennant-race heroics = +1. Rating: 2.",
  },

  personality: {
    leadership_style: "Cerebral, quiet, ahead of his time. Johnny Evers — not a man who gave easy compliments — said Reulbach was 'always five years ahead of his time in baseball thought.' He was the intellectual of the staff: Notre Dame student, medical school enrollee, a thinker on the mound. He studied hitters before film rooms existed. He didn't lead by yelling — he led by knowing more than everyone else.",
    temperament: "Gentleman athlete. 'One of the finest, clean-cut gentlemen who ever wore a big league uniform.' Catholic, educated, married a Vermont girl he met while pitching under an alias in an outlaw league. No fights, no scandals, no bench-clearing brawls. The anti-McGinnity. Where Iron Man was forge-fire, Reulbach was library quiet.",
    work_ethic: "Perfectionist and experimenter. His 5.33 H/9 in 1906 wasn't luck — it was mechanical precision. He worked on pitch sequencing and hitter-specific approaches decades before those concepts had names. The 20-inning CG win as a rookie showed he could grind. The two DH shutouts showed he could dominate. The wildness showed he was still human.",
    lifestyle: "Educated, Catholic, family man. Notre Dame, University of Vermont medical school. Married Nellie Whelan of Montpelier, VT — met her while pitching under the alias 'Sheldon' for the Montpelier-Barre Hyphens. After baseball: post-playing years described by SABR as 'not happy ones.' Died the same day as Ty Cobb — even in death, overshadowed by a bigger name.",
    era_adaptability: "VERY STRONG. Reulbach's approach — extreme hit suppression through movement and sequencing rather than velocity — is the modern pitching ideal. His 5.33 H/9 in 1906 would be elite in any era. The wildness would be a problem in a modern pitch-count world, but his stuff would play. He's the dead-ball era's proto-analytics pitcher.",
    clubhouse_impact: "RESPECTED BUT OVERSHADOWED. On a Cubs staff with Mordecai Brown, Orval Overall, Jack Pfiester, and Carl Lundgren, Reulbach was never the ace despite being arguably the most talented. He was the #2 or #3 who would have been the #1 on most other teams. In ILB: +1 team depth (he doesn't demand the spotlight, but he delivers when it matters).",
    dark_side: "The forgetting and the unhappiness. Ed Reulbach never received a single Hall of Fame vote — not one — despite a HOF Monitor score of 101, stats comparable to Sandy Koufax, and achievements no one else has matched (two DH shutouts). He was overshadowed by Brown on his own staff, by Mathewson in his own league, by Walsh in his own city. His post-baseball years were unhappy. He died the same day as Ty Cobb — July 17, 1961 — and even his death notice was buried under Cobb's obituary. The ultimate forgotten man.",
  },

  chemistry_traits: [
    { tag: "The Only One", desc: "Only pitcher in MLB history to throw two complete-game shutouts in a doubleheader. This card is unique. When Reulbach pitches a shutout, 30% chance the next game is also a shutout." },
    { tag: "Hit Suppressor", desc: "5.33 H/9 in 1906 — lowest until 1968. Opposing batters' CON reduced by 1 when facing Reulbach. They simply cannot find the ball." },
    { tag: "Five Years Ahead", desc: "Evers: 'Always five years ahead of his time in baseball thought.' Reulbach gains +1 STF when facing any batter for the second time in a game. He adjusts faster than they do." },
    { tag: "The Gentleman Pitcher", desc: "Clean-cut, Catholic, educated. +1 team chemistry. No off-field incidents, no morale penalties, no drama. The anti-controversy." },
    { tag: "Overshadowed", desc: "Never the acknowledged ace despite elite stats. When Reulbach is on a roster with a higher-OVR pitcher, he receives no media attention but gains +1 focus (less pressure)." },
    { tag: "Alias Sheldon", desc: "Pitched under a fake name in an outlaw league to be near his future wife. If his cover is blown, -1 reputation. If it holds, +1 romance bonus." },
    { tag: "Brown's Shadow", desc: "Mordecai Brown was the ace; Reulbach was the silent equal. When paired with another elite pitcher, both gain +1 STA from shared workload." },
    { tag: "Died with Cobb", desc: "Died July 17, 1961 — the same day as Ty Cobb. Even in death, overshadowed. +2 irony to legacy. -2 visibility." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "2,632 career IP. ERA under 2.00 in 4 of first 5 seasons. The mound is where he was most alive." },
    { location: "University / College", affinity: "HIGH", note: "Notre Dame. University of Vermont medical school. An intellectual ballplayer before the concept existed." },
    { location: "Clubhouse / Film Room", affinity: "HIGH", note: "'Five years ahead of his time.' Studied hitters before anyone else thought to. The proto-analytics mind." },
    { location: "Church / Catholic Parish", affinity: "MEDIUM", note: "Roman Catholic. Buried at Immaculate Conception Cemetery. Faith was foundational." },
    { location: "Vermont / New England", affinity: "MEDIUM", note: "Met wife Nellie while pitching in Vermont. Medical school at UVM. A northeast romantic." },
    { location: "Hall of Fame / Recognition", affinity: "LOW", note: "Never received a single vote. The HOF is a place that excluded him entirely. Painful absence." },
    { location: "Shadows / Anonymity", affinity: "LOW", note: "Overshadowed by Brown, Mathewson, Walsh. Died the same day as Cobb. Even this card risks forgetting him." },
  ],

  momentum: {
    hot_triggers: [
      "Low-hit games — pitched 12 games of 5 hits or fewer in 1906. When he's on, no one touches him.",
      "Doubleheaders — two CG shutouts in one day. When asked to pitch twice, he gets better, not worse.",
      "Pennant races — the DH shutouts came during the 1908 pennant race, 3 days after the Merkle game. He rises when the stakes peak.",
      "World Series — one-hitter in 1906 WS, CG win in 1907 WS. 2-0 career WS record.",
    ],
    cold_triggers: [
      "Wildness — 'extremely wild and unreliable' per the 1908 Reach Guide. Walks can pile up without warning.",
      "Being overshadowed — when not the acknowledged ace, motivation can fluctuate. The talent is undeniable but the recognition never comes.",
      "Injuries / decline — ERA ballooned after 1909, Cubs practically gave him away in 1913.",
      "Post-baseball malaise — SABR: 'post-baseball years weren't happy ones.' The intellectual pitcher without a purpose after baseball.",
    ],
    pressure_response: "BRILLIANT IN BURSTS. Reulbach's greatest moments were explosions of dominance in pressure situations: the one-hitter in the 1906 WS, the CG win in the 1907 WS, and above all the two DH shutouts during the 1908 pennant race — 18 IP, 4 H, 0 R, three days after the Merkle game. But his overall WS ERA was 3.03, suggesting he wasn't always at his peak under pressure. The pattern: when Reulbach decided to dominate, no one could touch him. When he didn't, the walks came. In ILB: high ceiling, moderate floor.",
  },

  action_card_seeds: [
    { title: "Two Shutouts in One Day", type: "Game Action", text: "Your pitcher throws two complete-game shutouts in a single doubleheader. 18 innings, 4 hits, 0 runs. No other pitcher in history has ever done this. Your team gains +3 momentum. The opposing lineup is psychologically destroyed for the remainder of the series. This card can only be played during a pennant race.", origin: "September 26, 1908: Reulbach shut out Brooklyn 5-0 (one-hitter) and 3-0 (three-hitter) in both games of a doubleheader. 18 IP, 4 H, 0 R. No other pitcher has ever matched this feat." },
    { title: "The Ghost Hit Rate", type: "Game Action", text: "Your pitcher allows only 5.33 hits per 9 innings for the entire season — the lowest mark by any pitcher until 1968. Batters simply cannot find the ball. For 3 consecutive starts, opposing hitters face -2 CON.", origin: "1906: Reulbach allowed 5.33 H/9, the lowest in modern MLB history until the Year of the Pitcher (1968). In 12 starts he allowed 5 hits or fewer." },
    { title: "The One-Hitter in October", type: "Game Action", text: "Your pitcher throws a one-hitter in the World Series. Only one batter reaches safely on a hit. The opposing team is held to a single run or none. Your pitcher gains the 'October Ghost' trait for the remainder of the postseason.", origin: "1906 World Series, Game 2: Reulbach threw a one-hitter against the Chicago White Sox, the only time a Cubs pitcher dominated in that upset series." },
    { title: "Twenty Innings, One Win", type: "Game Action", text: "Your rookie pitcher throws a 20-inning complete game and wins. The opposing pitcher also goes the distance. Both pitchers gain +1 STA permanently and the 'Iron Will' trait. The game becomes legendary.", origin: "August 24, 1905: Reulbach, a 22-year-old rookie, went the full 20 innings to defeat Tully Sparks and the Phillies, 2-1. One of the longest CG wins in NL history." },
    { title: "Five Years Ahead of His Time", type: "Action", text: "Your pitcher studies the opposing lineup with unprecedented rigor — noting tendencies, pitch preferences, situational weaknesses. He gains +1 STF and +1 CTL for his next 3 starts against this team. In the dead-ball era, this is revolutionary.", origin: "Johnny Evers: 'Reulbach was always five years ahead of his time in baseball thought.' He studied hitters before scouting reports, film rooms, or analytics existed." },
    { title: "Pitching Under an Alias", type: "Drama", text: "Your college pitcher needs money and proximity to his sweetheart. He joins an outlaw league under a fake name — 'Sheldon.' If discovered, he loses eligibility. If he stays hidden, he meets the love of his life. Roll a d6: 1-2, discovered (scandal); 3-6, hidden (romance + baseball).", origin: "Reulbach pitched as 'Sheldon' for the Montpelier-Barre Hyphens in Vermont's outlaw Northern League. There he met Nellie Whelan, his future wife." },
    { title: "Zero Votes", type: "Drama", text: "Your retired legend — 182 wins, 2.28 ERA, achievements no one else has ever matched — receives zero Hall of Fame votes. Not one. The committee forgets him entirely. He watches contemporaries get inducted while he is erased. -3 legacy. The record stands. The man does not.", origin: "Ed Reulbach never received a single Hall of Fame vote, despite a Bill James HOF Monitor score of 101 and stats comparable to Sandy Koufax. He was perpetually overshadowed." },
    { title: "Died the Same Day as Cobb", type: "Drama", text: "Your forgotten player dies on the same day as the most famous player in baseball history. His obituary is buried beneath the other man's. Even in death, he is the shadow. +5 irony. The universe has a cruel sense of humor.", origin: "Ed Reulbach died July 17, 1961 — the exact same day as Ty Cobb. Reulbach's death was a footnote in Cobb's obituary coverage." },
  ],

  art_direction: {
    face: "Tall, clean-cut, educated gentleman athlete. 6'0\" 190 lbs — lean and precise, the body of a thinker-pitcher. Intelligent eyes, clean jaw, the face of a man who went to Notre Dame and medical school. Not rugged like McGinnity or ethereal like Mathewson — quiet confidence, the look of someone who knows more than he says.",
    attire: "Chicago Cubs uniform circa 1906 — white wool jersey with 'CUBS' or 'C' insignia, baggy flannel pants, flat cap. Classic overhand delivery at the release point — arm extended, body coiled, the precise mechanics of a pitcher who suppresses hits through movement and sequencing rather than velocity. Or: walking off the mound after the second shutout of the day, cap slightly askew, having pitched 18 innings. No number.",
    mood: "Quiet mastery. The feeling of dominance without spectacle — Reulbach's card should feel like finding an unrecognized masterpiece in an attic. No fire, no drama — just a man throwing 18 innings of shutout ball and then going home. The West Side Grounds behind him, September twilight of the 1908 pennant race.",
    style: "Sepia-toned with cooler, more muted undertones than the McGinnity or Mathewson cards — Reulbach is in the shadows by design. Where McGinnity is forge-fire and Mathewson is moonlight, Reulbach is dusk. Quieter, more subtle, a card that rewards close inspection. The palette should suggest something half-forgotten being brought back to light.",
    reference: "Think the classic delivery at the release point — precise, mechanical, economical. No showmanship, no high kick — just the ball leaving the hand with invisible movement. Or: the pitcher walking off the mound after his second shutout of the day, alone, unremarked upon, while the pennant race rages around him. The forgotten ace, rediscovered.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function EdReulbachCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "H/9", val: d.real_stats.h_per_9 }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "ERA+", val: d.real_stats.career_era_plus },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 13 MLB SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "WS REC", val: d.real_stats.ws_record },{ label: "WS ERA", val: d.real_stats.ws_era },{ label: "WS GP", val: d.real_stats.ws_games }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>WORLD SERIES — 4 APPEARANCES (1906-10)</div>
            <div style={{ background: `${C.warmRed}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.warmRed}30`, textAlign: "center" }}>
              <div style={{ fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 4 }}>1908 PEAK SEASON</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {[{ label: "W-L", val: `${d.real_stats.season_1908_w}-${d.real_stats.season_1908_l}` },{ label: "ERA", val: d.real_stats.season_1908_era },{ label: "DH SHO", val: "2×0R" }].map((stat, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}>{stat.label}</div>
                    <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× WS Champ (1907-08)", "💎 Only 2-SHO Doubleheader", "🔥 5.33 H/9 (1906 Record)", "📜 3× NL W% Leader", "⭐ ERA <2.00 in 4/5 Seasons", "🎓 Notre Dame / UVM", "❌ Zero HOF Votes"].map((a, i) => (
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
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Reulbach's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Reulbach's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
