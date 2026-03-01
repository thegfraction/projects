// /cards/players/rube-marquard.jsx
import { useState } from "react";

const MARQUARD_DATA = {
  name: "Rube Marquard",
  nickname: "The $11,000 Beauty",
  year: 1912,
  team: "New York Giants",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SP",
  bats: "R",
  throws: "L",
  height: '6\'3"',
  weight: "180 lbs",
  born: "October 9, 1886 — Cleveland, OH",
  died: "June 1, 1980 — Baltimore, MD (age 93)",
  hof: "Inducted 1971 (Veterans Committee). Often called the weakest HOF pitcher — Bill James: 'probably the worst starting pitcher in the Hall of Fame.' But The Glory of Their Times made him immortal.",

  real_stats: {
    season: 1912, games: 43, wins: 26, losses: 11, era: "2.57",
    innings: "294.2", strikeouts: 175, walks: 80, complete_games: 22,
    shutouts: 2, whip: "1.06", war: 5.8,
    winning_streak: 19,
    career_wins: 201, career_losses: 177, career_era: "3.08",
    career_strikeouts: 1593, career_shutouts: 30, career_war: 32.4,
    no_hitters: 1, pennants: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT CONVERSION
  // STF: 2.57 ERA → tier 2 (2.50-2.99). K/9 = 5.35, no bonus. STF = 2.
  // CTL: BB/9 = 2.45 → tier 2 (2.0-2.49). WHIP 1.06, no bonus. CTL = 2.
  // STA: 294.2 IP → tier 3 (250-299). STA = 3.
  // DEF: Average fielding pitcher. DEF = 0.
  // CLU: Won 2 games in 1912 WS (1 ER total in both CG). 5 WS appearances career. CLU = 2.
  // OVR: STF×2(4) + CTL×1.5(3) + STA×1(3) + DEF×0.5(0) = 10 → normalized ~7
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — spectacular peak (19 straight wins) but career 201-177 with 3.08 ERA. HOF on narrative, not stats.
    stf: 2,      // 2.57 ERA in 1912 (tier 2). K/9 only 5.35. Marquard relied on deception, not power. "Any hitter can hit a fast one. But not many can hit slow ones."
    ctl: 2,      // BB/9 2.45 in 1912 (tier 2). WHIP 1.06. Decent but not elite control. He walked 80 in 294 IP.
    sta: 3,      // 294.2 IP in 1912 (tier 3). 22 complete games. Workhorse in his prime, though not an ironman.
    def: 0,      // No notable defensive metrics. Average fielding pitcher.
    clu: 2,      // Won 2 games in 1912 WS with only 1 ER in both CG. 5 career WS appearances. The 19-game streak itself was ultimate clutch.
  },

  stat_justification: {
    stf: "2.57 ERA in 1912 — good but not elite even for the Deadball Era. His 1916 ERA of 1.58 was far better, but that was a Brooklyn season, not his peak fame year. K/9 of 5.35 in 1912 (175 K in 294.2 IP). Led NL with 237 K in 1911. Marquard was a deceptive lefty who relied on changing speeds — 'Any hitter can hit a fast one. But not many can hit slow ones.' His stuff was about trickery, not velocity. Rating of 2.",
    ctl: "BB/9 of 2.45 in 1912 (80 BB in 294.2 IP). WHIP 1.06. Decent control but nothing special — Marquard was not a pinpoint pitcher. His walk rates fluctuated significantly year to year. Rating of 2.",
    sta: "294.2 IP in 1912 with 22 complete games. In 1911-13 he averaged ~289 IP per season. He was a workhorse during his prime but not an ironman like Cy Young or Joe Wood. Rating of 3.",
    def: "No notable fielding achievements. Average pitcher defensively. Rating of 0.",
    clu: "Won both his starts in the 1912 World Series, allowing only 1 earned run in both complete games, defeating Boston's Buck O'Brien twice. Made 5 World Series appearances in his career (1911, 1912, 1913, 1916, 1920). The 19-game winning streak itself was the ultimate sustained clutch performance — a 1.63 ERA during the streak. Rating of 2.",
  },

  personality: {
    leadership_style: "Broadway showman. Marquard was the first baseball player to fully cross into entertainment — starring in silent films, performing vaudeville acts with his wife, and dazzling audiences both on the mound and on stage. He led through star power and charisma, not discipline. He clashed with McGraw and lived in Mathewson's shadow, which drove him to seek fame elsewhere.",
    temperament: "Charming, somewhat unreliable, a natural performer. Marquard lied freely about his age (shaved 3 years), his name (claimed it was 'LeMarquis'), and various life events. His chapter in Glory of Their Times was later found to contain significant fabrications. He was a storyteller, a mythmaker, a man who understood that the legend matters more than the truth.",
    work_ethic: "Streaky. When Marquard was on, he was unstoppable — 19 straight wins, 73 wins in 3 years. When he was off, he was truly terrible — 12-22 in 1914, and 128-149 outside his 1911-13 prime. He was either the best pitcher in baseball or a below-.500 journeyman. There was no in-between.",
    lifestyle: "Pure Broadway. Married vaudeville star Blossom Seeley in a scandalous affair (she was married to someone else). They performed 'The Marquard Glide' dance together, did a skit called 'The Suffragette Pitcher' where Rube pitched in a dress for an all-girl team, and starred in the silent film '19 Straight.' After baseball: worked as a betting window teller at Narragansett Park racetrack. Arrested for ticket scalping during the 1920 World Series. Married three times. Never drank alcohol or smoked.",
    era_adaptability: "LIMITED. Marquard's stats outside his 3-year peak are mediocre — career 3.08 ERA, 201-177. Modern analytics would expose his flaws. His HOF case is built almost entirely on narrative: the winning streak, the vaudeville career, the Glory of Their Times interview. In ILB, Marquard works as a mid-rotation starter who occasionally catches fire and becomes unhittable for stretches.",
    clubhouse_impact: "ENTERTAINING but conflicted. Marquard clashed with McGraw and lived in Christy Mathewson's shadow. He was the second-best pitcher on a team with Matty, and he knew it. But he was beloved by fans and teammates for his humor and showmanship. The clubhouse was more fun with Marquard around, even if the wins weren't always there.",
    dark_side: "The fabrication. Marquard built his legacy on stories that weren't true — he lied about his age, his background, key events in his career. His Glory of Their Times chapter, which essentially got him into the Hall of Fame, was later found to be riddled with inaccuracies. He was arrested for ticket scalping during the 1920 World Series — selling box seats for a massive markup. His father disowned him for playing baseball and wouldn't cross the street to watch him pitch. And his career stats (201-177, 3.08 ERA) make him legitimately the weakest pitcher in Cooperstown. In ILB: Marquard carries a 'Mythmaker' trait — his reputation always exceeds his stats, for better and worse.",
  },

  chemistry_traits: [
    { tag: "Nineteen Straight", desc: "The modern record for consecutive wins. When Marquard starts a winning streak of 3+, his STF increases by +1 for each additional win. The pressure builds with each game." },
    { tag: "$11,000 Beauty", desc: "Purchased for a record price, Marquard initially flopped (5-13 in 1909). -2 team confidence when expectations exceed performance. But when he finally delivers: +3 vindication bonus." },
    { tag: "Broadway Lefty", desc: "Marquard is a performer on and off the field. +1 morale in New York / entertainment cities. He brings showmanship to every start — the crowd is always bigger when Rube pitches." },
    { tag: "Matty's Shadow", desc: "Marquard played behind Christy Mathewson. When paired with a higher-OVR pitcher, Marquard gets -1 from resentment but +1 from competition. Net effect: neutral, but volatile." },
    { tag: "Mythmaker", desc: "Marquard's reputation always exceeds his stats. In ILB, his OVR appears as 9 on his card but plays as 7. Opponents over-prepare for him, giving him a slight deception advantage." },
    { tag: "The Suffragette Pitcher", desc: "Marquard once pitched in a dress for laughs. He'll do anything for entertainment. +1 to team morale in any off-field event. -1 to dignity, if that's a stat." },
    { tag: "Scalper", desc: "Arrested for ticket scalping during the 1920 WS. Marquard always knows how to make a buck on the side. +1 income in any scenario, but risk of embarrassment." },
    { tag: "Streaky Southpaw", desc: "Outside 1911-13, Marquard was 128-149. He's either dominant or terrible. Each month, roll d6: 1-2 = cold (ERA 4.00+), 3-4 = average, 5-6 = on fire (ERA sub-2.00)." },
  ],

  preferred_locations: [
    { location: "Broadway / Theater", affinity: "HIGH", note: "Married a vaudeville star. Performed onstage. Made silent films. The stage was his second career." },
    { location: "Polo Grounds / Ballpark", affinity: "HIGH", note: "His fame was born here. 19 straight wins in 1912 made him 'The Rube Marquard Steam Roller Company.'" },
    { location: "Hotel / Luxury", affinity: "MEDIUM", note: "Marquard lived large during his peak years — Broadway lifestyle, famous wife, celebrity status." },
    { location: "Racetrack", affinity: "MEDIUM", note: "Worked as a betting window teller at Narragansett Park after baseball. The track was his retirement home." },
    { location: "Church / Home", affinity: "LOW", note: "His father disowned him. Never drank or smoked, but never settled down — married three times." },
    { location: "Press Conference", affinity: "MEDIUM", note: "A born storyteller, even if the stories weren't always true. Marquard gave great copy." },
  ],

  momentum: {
    hot_triggers: [
      "Winning streaks — Marquard's confidence builds exponentially with consecutive wins. After 5+ wins, he's nearly unhittable.",
      "Big city atmosphere — New York, Broadway, bright lights. Marquard thrived on attention.",
      "World Series stage — 2 CG wins in 1912 WS. Marquard elevated for the biggest audiences.",
      "Competition with Mathewson — trying to match Matty pushed Marquard to his peak.",
    ],
    cold_triggers: [
      "Losing streaks — after the 19-game streak broke, Marquard went 7-10. When confidence breaks, it shatters.",
      "Small markets — Marquard wilted with Boston (25-39). He needed the big stage.",
      "Managerial conflict — McGraw's discipline clashed with Marquard's showmanship.",
      "Aging — by 1914 (age 28), Marquard was already 12-22. His prime was shockingly brief.",
    ],
    pressure_response: "BIPOLAR. Marquard in his prime (1911-13) was one of the most clutch pitchers in baseball — 19 consecutive wins, 73-28 over three years, 2 WS wins with 1 ER in complete games. But Marquard outside his prime was a below-.500 pitcher who went 12-22 in 1914 and never again dominated. In ILB: Marquard is the ultimate feast-or-famine pitcher. When he's hot, ride him until the streak breaks. When he's cold, bench him immediately — there is no 'warming up.' He's either on fire or he's done.",
  },

  action_card_seeds: [
    {
      title: "Nineteen Straight",
      type: "Game Action",
      text: "Your starting pitcher opens the season with a record-tying 19 consecutive victories. His ERA during the streak is 1.63. The city calls him a 'Steam Roller Company.' He makes a movie. He performs on Broadway. He is invincible. Roll d20: on 1, the streak ends on game 20. On 2-20, add another win.",
      origin: "Marquard won 19 straight decisions from Opening Day to July 8, 1912 — tying Tim Keefe's record. Under modern rules, it would have been 20. The streak ended with a 7-2 loss to the Cubs.",
    },
    {
      title: "The $11,000 Lemon",
      type: "Drama",
      text: "Your franchise purchases a pitcher for a record sum. The newspapers call him 'The $11,000 Beauty.' He goes 5-13 in his first full season. The fans call him 'The $11,000 Lemon.' He's booed at home. The investment looks catastrophic. But give him two more years...",
      origin: "The Giants paid a record $11,000 for Marquard in 1908. He went 5-13 in 1909 and 4-4 in 1910. The press mocked him mercilessly. Then he won 73 games in three years.",
    },
    {
      title: "The Marquard Glide",
      type: "Action",
      text: "Your star pitcher marries a vaudeville actress and they perform a dance called 'The Marquard Glide.' They star in a skit called 'The Suffragette Pitcher' where he pitches in a dress. The fans love it. The manager is furious. Morale: +2 fans, -1 management.",
      origin: "Marquard married Blossom Seeley and they performed 'Breaking the Record' and 'The Suffragette Pitcher' on Broadway. Marquard also starred in the silent film '19 Straight.'",
    },
    {
      title: "Scalped at the World Series",
      type: "Drama",
      text: "Your veteran pitcher is arrested at the World Series for scalping tickets — selling box seats at a 600% markup. He's found guilty and fined $4.50. The embarrassment is worse than the fine.",
      origin: "During the 1920 World Series in Cleveland, Marquard was arrested for selling eight box seats for $350 (original cost: $52.80). He was fined $1 plus $3.50 in court costs.",
    },
    {
      title: "My Father Wouldn't Cross the Street",
      type: "Drama",
      text: "Your pitcher's father, an engineer, told his son that if he played baseball he could never come home. Years later, the father shows up at a game. The pitcher says: 'My father wouldn't go across the street to see me.' But it is his father. And he is proud.",
      origin: "Fred Marquard disowned Rube for playing baseball. Years later, he appeared at a Brooklyn game. Rube was stunned. They reconciled.",
    },
    {
      title: "The Glory of Their Times",
      type: "Action",
      text: "Decades after retirement, a writer interviews your aging pitcher for a book about the old days. The pitcher tells magnificent stories — most of them embellished or false. The book becomes a classic. The stories get the pitcher into the Hall of Fame. The truth doesn't matter. The legend does.",
      origin: "Marquard's chapter in Ritter's The Glory of Their Times (1966) was the first and most prominent. It was later found to contain significant fabrications. But it got him elected to the Hall of Fame in 1971.",
    },
    {
      title: "Nineteen Straight — The Movie",
      type: "Action",
      text: "Your pitcher makes a silent film about his winning streak. He stars alongside a famous actress. The film is about a pitcher coerced by gamblers into throwing a game — he refuses, gets kidnapped, and is saved by his girlfriend just in time to win. Life imitating art, or art imitating life?",
      origin: "Marquard starred in 'Rube Marquard Wins' (1912), a silent film about a pitcher who refuses to throw a game for gamblers — ironic given the era's gambling scandals.",
    },
    {
      title: "The No-Hitter Nobody Remembers",
      type: "Game Action",
      text: "Your pitcher throws a no-hitter in his first start of the season. It's a masterpiece. Nobody remembers it because everything else in his career is louder.",
      origin: "Marquard threw a no-hitter against Brooklyn on April 15, 1915 — his first start of the season. It's one of the least-discussed no-hitters in history.",
    },
  ],

  art_direction: {
    face: "Tall, gangly, 6'3\" 180 lbs — lean southpaw build with long arms and big hands. Open, friendly face with a showman's grin. The look of a man who just finished a vaudeville performance and is heading to the mound. Reddish-brown hair, clean-shaven, wide eyes that convey both confidence and mischief.",
    attire: "New York Giants 1912 home whites — the pennant-winning year. Classic Deadball Era pitching pose: tall lefty mid-windup, long limbs unfurling, deceptive delivery. Or in his famous Broadway persona: suit and bowtie, performing the Marquard Glide with an invisible partner.",
    mood: "Showmanship and spectacle. Marquard should radiate the energy of a man who lives for applause — whether from 30,000 at the Polo Grounds or 300 in a vaudeville theater. But beneath the performance, a hint of fragility — the knowledge that the show can't last, that the streak will break, that the curtain will fall.",
    style: "Sepia-toned with warm golden highlights and a theatrical quality — slightly brighter and more dramatic than other Muggers cards, as if lit by stage footlights. The Polo Grounds in the background should feel like a Broadway theater. The gold border should gleam like a marquee.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, and Kauff is a firecracker, then Marquard is a spotlight. Brilliant, focused, dramatic, and pointed directly at himself. The ILB Marquard card should feel like a playbill from 1912 — the star attraction, the main event, the one night you can't miss.",
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

export default function RubeMarquardCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MARQUARD_DATA;
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
                      These events, derived from Marquard's real life, become universal cards playable in any game.
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
                  <Section title="Marquard's Derivation">
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
