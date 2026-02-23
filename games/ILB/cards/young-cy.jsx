import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}young-cy.png`;

const PLAYER_DATA = {
  name: "Cy Young",
  nickname: "The Cyclone",
  year: 1901,
  team: "Boston Americans",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "210 lbs",
  born: "March 29, 1867 — Gilmore, OH",
  died: "November 4, 1955 — Peoli, OH (age 88)",
  hof: "Inducted 1937 (2nd ballot, 76.1%). The award for best pitcher bears his name.",

  real_stats: {
    season: 1901, games: 43, wins: 33, losses: 10, era: "1.62",
    innings: "371.1", strikeouts: 158, walks: 37, complete_games: 38,
    shutouts: 5, whip: "1.00", ops_plus_against: "N/A", war: 12.6,
    career_wins: 511, career_losses: 316, career_era: "2.63",
    career_strikeouts: 2803, career_cg: 749, career_shutouts: 76,
    career_war: 170.3, no_hitters: 3, perfect_games: 1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // Pitchers use a modified stat engine:
  // STUFF (STF) replaces CON — raw pitching dominance
  // CONTROL (CTL) replaces POW — precision and walks
  // STAMINA (STA) replaces SPD — innings durability
  // DEFENSE (DEF) — same (fielding as pitcher)
  // CLUTCH (CLU) — same (postseason performance)
  //
  // STUFF: ERA tiers (<1.50=5, 1.50-1.99=4, 2.00-2.49=3, 2.50-2.99=2, 3.00-3.49=1, 3.50+=0) + K/9 ≥ 6.0 bonus (cap 5)
  // CONTROL: BB/9 tiers (<1.0=5, 1.0-1.49=4, 1.5-1.99=3, 2.0-2.49=2, 2.5-2.99=1, 3.0+=0) + WHIP ≤ 1.00 bonus (cap 5)
  // STAMINA: IP tiers (<150=0, 150-199=1, 200-249=2, 250-299=3, 300-349=4, 350+=5)
  // DEFENSE: Same as position players
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // CLUTCH: Same as position players
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 12,     // Legend — one of the greatest ever
    stf: 4,      // 1.62 ERA → tier 4 (1.50-1.99). K/9 was only 3.83 — no K bonus. Stuff 4.
    ctl: 5,      // BB/9 of 0.90 → tier 5 (<1.0). WHIP 1.00 → +1 bonus = 6, capped at 5.
    sta: 5,      // 371.1 IP → tier 5 (350+). 38 complete games in 43 starts. Ultimate iron arm.
    def: 1,      // Decent fielding pitcher. Led NL pitchers in assists once. Nothing elite.
    clu: 2,      // Won 2 games in 1903 WS. Won 3 in 1895 Temple Cup. Only pitcher to win both. .69 WS ERA in 1903.
  },

  stat_justification: {
    stf: "1.62 ERA in 1901 — led the AL. Pitching Triple Crown (W/K/ERA). But K/9 was only 3.83 — Young was not a strikeout pitcher in 1901. He relied on control and movement, not power. By 1901, his fastball had slowed from its prime in the early 1890s. He'd added a changeup ('slow ball') and mastered location. Rating of 4 — elite results through craft, not overpowering stuff.",
    ctl: "BB/9 of 0.90 in 1901 — only 37 walks in 371 innings. Led the league in fewest walks per 9 innings 14 times in his career. WHIP of 1.00. Young famously said: 'I aimed to make the batter hit the ball, and I threw as few pitches as possible.' His control was the best in baseball history. This is a maximum 5.",
    sta: "371.1 innings pitched in 1901. 38 complete games in 43 starts. He pitched every other day. Over 300 IP in 16 seasons. Career 7,356 IP — the all-time record. Young barely warmed up: '3, 4 minutes. Five at the outside.' His offseason conditioning was splitting wood on his farm. This is a maximum 5.",
    def: "Led NL pitchers in assists with 117 in 1899. Decent fielder for his position. Above-average hitting for a pitcher (.210 career, 18 HR). But not an elite defensive pitcher. Rating of 1.",
    clu: "Won 2 games in the 1903 World Series (0.69 ERA in 2 starts). Won 3 games in the 1895 Temple Cup. Only pitcher in history to win both the Temple Cup and the World Series. Threw the first pitch in World Series history. But also lost his first WS start. Rating of 2 — excellent but not flawless.",
  },

  personality: {
    leadership_style: "Quiet, stoic, lead-by-example. Young was semiliterate (6th-grade education) and had an aversion to interviews. He wasn't 'good copy' for writers — he let his arm do the talking. His five rules: 1) Be moderate in all things. 2) Don't abuse yourself. 3) Don't bait umpires. 4) Play hard. 5) Render faithful service to your employer.",
    temperament: "Calm, humble, fiercely competitive beneath the surface. When accused of easing up with a big lead, he snarled: 'When you see me let any club make runs off my pitching on purpose, come around and I'll give you a brand new hundred dollar bill.' Compared his competitors to 'lawn tennis or tiddlywinks.' Farm-bred pride — quiet outside, iron inside.",
    work_ethic: "Effortless and inhuman. Young barely warmed up. He never went to the bullpen. His conditioning was splitting wood and doing farm chores in Ohio. He threw over 300 innings 16 times. He pitched both games of a doubleheader in 1890. When asked his secret: 'It isn't any secret. Just outdoor life, moderation, and a naturally good arm.'",
    lifestyle: "Ohio farm boy from birth to death. Born in Gilmore, died in Peoli. Married Roba Miller — the girl from the next farm — and they lived together on the family farm for decades. After she died in 1933, he sold the farm and 'moved down the road.' Became a vegetarian in 1910. Raised sheep and vegetables. Owned a personal library of 400 volumes despite only a 6th-grade education. By 1940, his only income was $300/year in stock dividends. Appeared on 'I've Got a Secret' in 1955, seven months before his death.",
    era_adaptability: "COMPLEX. Young's control and efficiency would translate beautifully to any era — his walk rate is still historically elite. But his strikeout rate was below average even for his own time. In a modern context, Young would be a Greg Maddux-type: painting corners, inducing weak contact, pitching deep into games. He'd need a good defense behind him.",
    clubhouse_impact: "STEADY-HUMBLE. Young was universally respected but not a rah-rah leader. His clean living and moderate temperament made him the anti-stereotype of the dissolute ballplayer. Coached at Harvard in 1902 (with a 6th-grade education) — the irony delighted Boston newspapers. Also coached at Mercer University. In his later years, he addressed church league softball banquets and served as a Republican committeeman in his township.",
    dark_side: "The loneliness. Young's wife Roba died in 1933. He sold the farm, his library, everything. 'Somehow after she died, I didn't want to live there anymore.' By 1940, he was living on $300/year. He went barnstorming at 68 because he was alone and 'this may be sort of fun.' He died in 1955 at 88, a legend in name (the award) but nearly forgotten in person. In ILB terms: Young carries a 'Fading Legacy' trait — after retirement, his reputation grows while his material circumstances decline.",
  },

  chemistry_traits: [
    { tag: "511 Wins", desc: "The most wins in baseball history — nearly 100 more than second place. Young's presence stabilizes any pitching staff. +1 team morale permanently." },
    { tag: "Cyclone", desc: "Named for his fastball that splintered the grandstand fence in Canton. In his prime (1890s), +1 STF from pure velocity. After 1900, replaced by control." },
    { tag: "Farm Strong", desc: "Conditioning from splitting wood and farm labor. No fatigue penalties. Young can pitch on 2 days' rest with no degradation." },
    { tag: "Control Artist", desc: "BB/9 of 0.90. Young walks almost nobody. Opposing batters can't draw walks — -1 to their OBP when facing Young." },
    { tag: "Harvard Coach", desc: "6th-grade education coaching Harvard. Young earns +1 reputation in intellectual cities despite his humble background." },
    { tag: "Married to Roba", desc: "+1 morale when playing near his home (Ohio, New England). After Roba's death (post-career), -1 morale permanently." },
    { tag: "Perfect Game Pioneer", desc: "Threw the first perfect game of the 20th century. When Young throws a complete game, 10% chance it becomes a no-hitter." },
    { tag: "The Award", desc: "Young's name becomes synonymous with pitching excellence. After his career, all future pitchers are measured against him. +1 legacy to every team he played for." },
  ],

  preferred_locations: [
    { location: "Farm / Rural Area", affinity: "HIGH", note: "Born and died on Ohio farms. Raised sheep and vegetables. Split wood for conditioning." },
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His office. 7,356 career innings. More time on the mound than any human being who ever lived." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected but quiet. Not gregarious. Let his arm do the talking." },
    { location: "Church / Lodge", affinity: "MEDIUM", note: "Freemason. Republican committeeman. Clean-living, moderate habits." },
    { location: "University", affinity: "MEDIUM", note: "Coached at Harvard and Mercer despite 6th-grade education." },
    { location: "Bar / Saloon", affinity: "LOW", note: "'Strict attention to temperate habits.' Young didn't drink." },
    { location: "City / Urban Areas", affinity: "LOW", note: "Always a farm boy. Cities were where he worked, not where he lived." },
  ],

  momentum: {
    hot_triggers: [
      "Every other day pitching — Young gets better the more he works",
      "Pennant races — 33 wins in 1901, won 42% of his team's games",
      "World Series / championship play — 2 WS wins, 3 Temple Cup wins",
      "Record-chasing stretches — 24 consecutive hitless innings in 1904",
    ],
    cold_triggers: [
      "Aging — Young's effectiveness declined sharply after 40 (7-10 in 1910)",
      "Weight gain — he got heavier in his later years and lost mobility",
      "Grief — after Roba's death, his spirit dimmed",
    ],
    pressure_response: "SUPERB. Young threw the first pitch in World Series history. He lost game 1, then came back and won games 5 and 7 to clinch the championship. He won 3 games in the 1895 Temple Cup. His 24 consecutive hitless innings in 1904 included the first perfect game of the modern era. When the moment was biggest, Young was at his best. In ILB: Young is a true ace — the man you give the ball for Game 7.",
  },

  action_card_seeds: [
    { title: "Five Hundred Eleven", type: "Game Action", text: "Your ace wins his 500th career game. An unreachable record. The next-closest pitcher is nearly 100 wins behind. Your franchise gains +5 permanent reputation. The pitcher gains the 'Immortal' trait.", origin: "Cy Young won 511 games — nearly 100 more than Walter Johnson's 417 (second all-time). The record will never be broken." },
    { title: "The Perfect Game", type: "Game Action", text: "Your pitcher is perfect through 9 innings. No hits, no walks, no errors. Roll a d6: on 4+, the perfecto holds. On 1-3, a fielding error ruins it. This card can only be played once per career.", origin: "On May 5, 1904, Young threw the first perfect game of the modern era against the A's — part of 24 consecutive hitless innings, still a record." },
    { title: "The Cyclone Tryout", type: "Drama", text: "An unknown farm boy shows up for a tryout. His fastball splinters the wooden fence behind the catcher. Sign him immediately — he gains +3 STF for his first season as opponents have never seen his arm.", origin: "Young earned his nickname 'Cyclone' (shortened to 'Cy') when his fastball splintered the fence during a tryout in Canton, Ohio in 1890." },
    { title: "Splitting Wood", type: "Action", text: "Your pitcher's offseason conditioning consists entirely of farm labor — splitting wood, baling hay, walking fences. He arrives at spring training with +1 STA and zero arm soreness.", origin: "Young's only conditioning was farm work. 'It isn't any secret. Just outdoor life, moderation, and a naturally good arm.'" },
    { title: "The Sixth-Grade Professor", type: "Drama", text: "Your most uneducated player is hired to coach at an Ivy League university. The newspapers have a field day (+2 publicity). The player gains +1 IQ from the experience.", origin: "In 1902, Young — who left school after 6th grade — served as pitching coach at Harvard University. Boston papers were delighted." },
    { title: "First Pitch of the World Series", type: "Game Action", text: "Your ace throws the ceremonial first pitch of the first postseason series. He loses the game — but comes back to win 2 of the next 3 and clinch the championship.", origin: "Young threw the first pitch in World Series history on October 1, 1903. He lost game 1 but won games 5 and 7 as Boston beat Pittsburgh 5-3." },
    { title: "The Girl Next Door", type: "Drama", text: "Your player marries his childhood sweetheart from the adjacent farm. +2 morale permanently while she's alive. If she dies before him, -2 morale and he sells everything he owns.", origin: "Young married Roba Miller, the girl from the next farm. They lived together for decades. After she died in 1933, he sold the farm. 'Somehow after she died, I didn't want to live there anymore.'" },
    { title: "Twenty-Four Hitless Innings", type: "Game Action", text: "Your pitcher enters a zone of absolute dominance. For 24 consecutive innings, no opposing batter gets a hit. This stretch includes a perfect game. The record stands for over a century.", origin: "In April-May 1904, Young threw 24 consecutive hitless innings — including his perfect game on May 5. Dennis Eckersley came closest with 21 in 1977." },
  ],

  art_direction: {
    face: "Large, sturdy face of an Ohio farmer. 6'2\" 210 lbs — big for any era, enormous for the 1900s. Strong jaw, broad forehead, intelligent but humble eyes. Clean-shaven in his prime. The look of a man who could plow a field in the morning and throw 371 innings in the summer.",
    attire: "Boston Americans 1901 whites, baggy wool flannel. The uniform strains slightly over his large frame. Full windup pose — the distinctive windmill delivery. Or standing tall on the mound, staring in at the catcher with calm authority. Ball visible in his right hand.",
    mood: "Calm dominance. Not fierce or intimidating — serene. The look of a man who has thrown so many pitches he no longer needs to think about it. Complete mastery. Like watching a farmer do his daily chores — there's no strain because this is just what he does. Every day. For 22 years.",
    style: "Rich, deep sepia — the darkest and most authoritative card in the Banners set. Warm Ohio earth tones. The Huntington Avenue Grounds in the background, perhaps with a hint of the countryside beyond. Heavy ornate tobacco-card border with agricultural motifs subtly worked in — wheat sheaves, oak leaves. The most 'important' feeling card in the entire ILB collection.",
    reference: "This is THE card. The one collectors want. The ILB Cy Young should feel like a T206 Honus Wagner in terms of weight and significance. Rich, layered sepia. The biggest frame, the most confident pose. The card that anchors the entire Banners set.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
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

export default function CyYoungCard() {
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
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "PERFECT", val: d.real_stats.perfect_games }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 22 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1903 WS Champ", "👑 511 Career Wins", "⭐ HOF 1937", "🔥 Pitching Triple Crown", "💎 Perfect Game (1904)", "📜 3× No-Hitter", "🏆 1895 Temple Cup", "🎖️ Cy Young Award Namesake"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Young's real life, become universal cards playable in any game.</p>
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
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Young's Derivation">
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
