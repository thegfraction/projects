import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}tenney-fred.png`;

const PLAYER_DATA = {
  name: "Fred Tenney",
  nickname: "The Soiled Collegian",
  year: 1899,
  team: "Boston Beaneaters",
  era: "1890s",
  ilb_team: "Banners NL1890",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '5\'9"',
  weight: "155 lbs",
  born: "November 26, 1871 — Georgetown, MA",
  died: "July 3, 1952 — Boston, MA",
  hof: "Not inducted (39.6 career WAR)",
  real_stats: {
    season: 1899, games: 146, at_bats: 604, hits: 209, doubles: 19, triples: 17,
    home_runs: 1, rbi: 67, stolen_bases: 28, batting_avg: ".347", obp: ".414",
    slg: ".435", ops: ".849", ops_plus: 131, war: 5.3, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".294", career_hits: 2231,
    career_hr: 22, career_sb: 285, career_war: 39.6,
  },
  ilb_stats: { ovr: 7, con: 4, pow: 0, spd: 2, def: 3, clu: 1 },
  stat_justification: {
    con: ".347 BA in 1899 with 209 hits. Career .294 with 2,231 hits. Masterful bunter and place hitter. OPS+ of 131 in peak year. Tenney was an on-base machine — .414 OBP in 1899, .376 career. Rating of 4 reflects excellent contact without elite power production.",
    pow: "1 HR in 1899. 22 career HR in 17 seasons — 1,994 games. Tenney had absolutely zero power. He was a slap-and-bunt hitter in the purest sense. This is a definitive 0.",
    spd: "28 SB in 1899, 285 career. 17 triples in 1899 (4th in NL). For a first baseman, Tenney was remarkably fast. Rating of 2 reflects good speed — he could run but wasn't a true burner.",
    def: "One of the greatest defensive first basemen in baseball history. Invented the 3-6-3 double play (June 14, 1897). Invented the modern style of playing deep and off the bag. Led NL in 1B assists 7 consecutive years (1901-07), setting a record of 152 assists in 1905 that lasted 44 years. Ranked behind only Hal Chase among dead-ball-era first basemen. This is a maximum 3.",
    clu: "Won NL pennants in 1897 and 1898 with the Beaneaters. No World Series existed during his peak. Hit .318 during the 1897 pennant season. Solid but not spectacular in big moments. Rating of 1 reflects pennant success without defining October heroics.",
  },
  personality: {
    leadership_style: "Intellectual, principled, multifaceted. Tenney was a Brown University graduate in an era when college men were mocked in baseball. He served as player-manager, business manager, field captain, ticket-taker, and baggage handler for Boston all at once. He led through competence and integrity, not charisma.",
    temperament: "Cerebral, principled, occasionally stubborn. Refused to play on Sundays for years due to religious conviction (later changed his mind). Mocked as 'The Soiled Collegian' for being educated. Took it in stride and outperformed the skeptics. Quiet dignity.",
    work_ethic: "Innovation-driven. Tenney didn't just play first base — he reinvented the position. He developed the 3-6-3 double play, pioneered playing deep and off the bag, and mastered the art of bunting and place-hitting. Everything was deliberate, studied, and ahead of its time.",
    lifestyle: "Renaissance man. Brown University graduate, painter, sketch artist, journalist for the Boston Post, Baseball Magazine, and the New York Times. After retirement, worked in insurance and shoe manufacturing. Married his Georgetown sweetheart. Two daughters. The most cultured player in the dead-ball era.",
    era_adaptability: "VERY HIGH. Tenney's defensive innovations became the standard for all future first basemen. His OBP-focused approach to hitting was analytics-friendly before analytics existed. His intellectual approach to the game would thrive in any era. The only limitation is his complete lack of power.",
    clubhouse_impact: "INTELLECTUAL-POSITIVE. Not a rah-rah leader but deeply respected. Coached at Tufts in the offseason. In 1905, he nearly signed William Clarence Matthews, a Black Harvard infielder, which would have broken baseball's color line 42 years before Jackie Robinson — but other NL clubs blocked it.",
    dark_side: "The Merkle Connection. On September 23, 1908, Tenney was out of the Giants' lineup with severe back pain. His 19-year-old replacement, Fred Merkle, committed the famous 'Merkle Boner' — failing to touch second base, costing the Giants the pennant. Tenney's absence created one of baseball's most infamous moments. In ILB terms: Tenney carries an 'Absence Matters' trait — when he's out of the lineup, bad things happen.",
  },
  chemistry_traits: [
    { tag: "Innovator", desc: "Tenney invented modern 1B play. +1 DEF permanently at first base. His innovations benefit every future 1B on the roster." },
    { tag: "Ivy League", desc: "Brown University graduate. +1 IQ to all game decisions. Compatible with cerebral players. -1 initial chemistry with 'rough' players (resolves after 5 games)." },
    { tag: "Soiled Collegian", desc: "Mocked for being educated. -1 initial reputation with the press. But +1 reputation with fans who appreciate the underdog." },
    { tag: "Sunday Rest", desc: "Tenney won't play on Sundays (can be toggled off after 1 season). On Mondays after rest, he gains +1 to all stats (refreshed)." },
    { tag: "Renaissance Man", desc: "Painter, journalist, insurance exec. Tenney never suffers morale drops from off-season boredom. Always has something to do." },
    { tag: "Absence Matters", desc: "When Tenney is out of the lineup, roll a d6. On a 1, a catastrophic defensive error occurs (the Merkle effect)." },
    { tag: "OBP Machine", desc: "+1 to walks drawn. Tenney's .414 OBP in 1899 reflected elite plate discipline. He gets on base even when he doesn't hit." },
    { tag: "Barrier Breaker", desc: "Tenney nearly signed the first Black MLB player in 1905. He carries a 'Progressive' trait — no racial chemistry penalties, and +1 chemistry with barrier-breaking players." },
  ],
  preferred_locations: [
    { location: "University / Library", affinity: "HIGH", note: "Brown grad. Coached at Tufts. Read voraciously. The most educated man on any roster." },
    { location: "Art Studio / Gallery", affinity: "HIGH", note: "Painted and sketched during winters. Led his class in drawing as a boy." },
    { location: "Newspaper Office", affinity: "HIGH", note: "Wrote for the Boston Post, Baseball Magazine, and the New York Times." },
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Practiced bunting and place-hitting obsessively. Invented new defensive techniques." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected but slightly apart. The intellectual in a room of brawlers." },
    { location: "Church", affinity: "MEDIUM", note: "Refused to play on Sundays for years. Devout early in career." },
    { location: "Bar / Saloon", affinity: "LOW", note: "Not a drinker. Preferred the pen to the pint." },
  ],
  momentum: {
    hot_triggers: [
      "Playing first base (his innovation position) — Tenney thrives where he reinvented the game",
      "Contending teams — hit .318 during the 1897 pennant run",
      "Intellectual challenges — new strategies and situations energize him",
      "Multi-hit games with bunts — when his craft is working, he's locked in",
    ],
    cold_triggers: [
      "Managerial burden — his batting suffered under dual responsibilities (158-295 as manager)",
      "Losing teams — his Boston squads post-1900 were terrible and ground him down",
      "Injuries — back problems plagued his later career",
    ],
    pressure_response: "STEADY-RELIABLE. Tenney won pennants in 1897-98 and hit well in both seasons. No modern postseason data exists to test him further. His .347 in 1899 on a non-contending team shows he didn't need a pennant race to produce. In ILB: Tenney is a safe, consistent presence — he won't win you the game with a dramatic moment, but he'll never make a critical error. Unless he's not in the lineup — then all bets are off.",
  },
  action_card_seeds: [
    { title: "The 3-6-3", type: "Game Action", text: "Your first baseman fields a grounder and fires to short, who relays back to first for a double play. If your 1B has DEF 2+, this is automatic. Otherwise, roll 4+ for success.", origin: "On June 14, 1897, Tenney turned the first 3-6-3 double play in MLB history with shortstop Herman Long. The crowd went silent, then erupted — they'd never seen it before." },
    { title: "The Soiled Collegian", type: "Drama", text: "Your college-educated player arrives in the clubhouse. Teammates mock him for a week (-1 chemistry). After the hazing ends, his intelligence earns respect (+2 chemistry for the rest of the season).", origin: "Tenney was mocked as 'The Soiled Collegian' for being a Brown University graduate. College players entering pro baseball was considered unseemly in the 1890s." },
    { title: "The Merkle Boner", type: "Drama", text: "Your veteran starter is out with an injury. His teenage replacement makes a catastrophic baserunning error that costs you the pennant. The replacement carries a -3 reputation for the rest of his career. If the veteran had played, the error never happens.", origin: "Tenney's back pain kept him out on September 23, 1908. His replacement, 19-year-old Fred Merkle, failed to touch second base — one of the most infamous plays in baseball history." },
    { title: "Player-Manager-Businessman", type: "Action", text: "Your player takes on managerial, business, and field duties simultaneously. He handles everything — baggage, hotels, tickets, strategy. Team saves 2 resource cards. But the player's batting average drops by -1 CON from exhaustion.", origin: "Tenney served as Boston's first baseman, field captain, manager, business manager, baggage handler, and ticket-taker all at once. His teams went 158-295." },
    { title: "The Color Line", type: "Drama", text: "Your progressive manager attempts to sign a Black player. Roll a d6: on 5-6, the signing goes through and your team gains +3 reputation and a talented prospect. On 1-4, other teams block it and nothing changes.", origin: "In 1905, Tenney nearly signed William Clarence Matthews, a Black Harvard infielder, for the Beaneaters. Other NL clubs objected and blocked it — 42 years before Jackie Robinson." },
    { title: "The Masterful Bunt", type: "Game Action", text: "Your best bunter drops a perfect bunt down the line. Automatic single. If there's a runner on second, he advances to third. If there's a runner on third, he scores (squeeze play).", origin: "Tenney was described as a 'masterful bunter' — one of the best of his era. He could place bunts with surgical precision, advancing runners and manufacturing runs without power." },
    { title: "Playing Deep", type: "Game Action", text: "Your first baseman innovates a new defensive alignment — playing deep and off the bag. He gains +1 DEF and +1 range for the rest of the season. Other teams eventually copy the technique.", origin: "Tenney originated the modern first baseman's positioning — deep and off the foul line, stretching for throws. A reporter wrote: 'He reaches his hands far out for the ball and stretches his legs so that he is farther out from the bag than any other first baseman.'" },
    { title: "The Writer's Eye", type: "Action", text: "Your most intellectual player writes a scouting report on the opposing team for the newspaper. Your team gains +1 to all defensive positioning for the next series (they know the tendencies).", origin: "Tenney was a journalist for the Boston Post, Baseball Magazine, and the New York Times. He wrote about the game with the same intelligence he brought to playing it." },
  ],
  art_direction: {
    face: "Lean, intelligent face with alert, studious eyes. Thin and wiry — 5'9\" 155 lbs, small even for his era. Clean-shaven with fine features. The look of a man who reads books between innings. Slight smile — confident but not cocky.",
    attire: "Boston Beaneaters 1899 home whites, high wool collar, no number. The uniform fits trim on his slight frame. Glove visible — a distinctive first baseman's mitt from the era. Cap straight and proper. Everything neat, everything deliberate.",
    mood: "Quiet intelligence. Not flashy, not intense — precise. The look of a man stretching for a throw at first base with perfect form, or crouching in his innovative deep position. The craftsman at work. Or mid-bunt, eyes tracking the ball with the concentration of an artist placing a brushstroke.",
    style: "Clean, warm sepia with golden tones. A well-maintained Boston grandstand in the background — the South End Grounds perhaps. Cleaner and more refined than the gritty power hitters' cards. Ornate tobacco-card border with an academic or literary flourish. Aged paper with light foxing. The gentleman's card.",
    reference: "Think of the most elegant T-series card — not the scrapper or the slugger, but the thinker. ILB sepia style with the most refined energy in the Banners set. Tenney should look like the kind of man who could write your obituary, paint your portrait, and turn a 3-6-3 double play all in the same afternoon.",
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

export default function FredTenneyCard() {
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
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× NL Pennant", "🛡️ Invented 3-6-3 DP", "🛡️ 7× NL 1B Assists Leader", "📜 2,231 Career Hits", "🎓 Brown University", "✍️ NYT Journalist"].map((a, i) => (
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
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>
                <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
              </>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Tenney's real life, become universal cards playable in any game.</p>
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
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>This is the reusable formula for converting real Baseball Reference stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Tenney's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}
                </Section>
              )}
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
