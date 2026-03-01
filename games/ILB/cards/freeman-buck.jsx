import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}freeman-buck.png`;

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: BUCK FREEMAN
  // Year Snapshot: 1899 (Peak Season — 25 HR, 122 RBI)
  // ═══════════════════════════════════════════════════════════════

  name: "Buck Freeman",
  nickname: "The Batting Wonder of the Age",
  year: 1899,
  team: "Washington Senators",
  era: "1900s",
  ilb_team: "Banners NL1890",
  position: "RF",
  bats: "L",
  throws: "L",
  height: '5\'9"',
  weight: "169 lbs",
  born: "October 30, 1871 — Catasauqua, PA",
  died: "June 25, 1949 — Wilkes-Barre, PA",
  hof: "Not inducted (Red Sox HOF 2018)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1899 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, BR Bullpen
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1899,
    games: 155,
    at_bats: 589,
    hits: 187,
    doubles: 19,
    triples: 25,
    home_runs: 25,
    rbi: 122,
    stolen_bases: 21,
    batting_avg: ".318",
    obp: ".370",
    slg: ".562",
    ops: ".932",
    ops_plus: 148,
    war: 5.2,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 0,
    career_avg: ".293",
    career_hits: 1235,
    career_hr: 82,
    career_sb: 92,
    career_war: 25.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CONTACT (CON): .318 BA → 4, OPS+ 148 → +1 = 5
  // POWER (POW): 25 HR → 3, SLG .562 → +1 = 4
  //   The pre-Ruth HR king. More than double the next guy (12).
  // SPEED (SPD): 21 SB → 2. 25 triples shows wheels. But not elite.
  // DEFENSE (DEF): Below average. Manager Selee hated his defense.
  //   Converted from pitcher. Learning on the job = 0
  // OVERALL (OVR): CON×2+POW×1.5+SPD×1+DEF×0.5 = 10+6+2+0 = 18
  //   Normalized: 8 (All-Star) — elite peak but not HOF career
  // CLUTCH (CLU): .290 in 1903 World Series with 3 triples and
  //   4 RBI. Key role in first-ever WS championship = 2
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — elite slugger peak, short career arc
    con: 4,      // .318 BA in 1899, .293 career. OPS+ 148 earns the bonus to 5, but keeping at 4 — he was a power-first hitter with moderate average
    pow: 4,      // 25 HR in 1899 — more than DOUBLE the next guy. The pre-Ruth record. .562 SLG. Tape-measure shots.
    spd: 2,      // 21 SB, 25 triples in 1899. Good legs for a power hitter but not a burner.
    def: 0,      // Converted pitcher. Manager despised his defense. Poor fielder throughout career.
    clu: 2,      // .290 with 3 triples in 1903 World Series. Key contributor to first-ever WS title.
  },

  stat_justification: {
    con: ".318 BA in 1899, career .293. Freeman was a power-first hitter — he swung from the heels and looked to loft the ball. His OPS+ of 148 reflects above-average offensive production, but his batting average wasn't in the Keeler/Lajoie/Cobb stratosphere. He struck out more than the contact artists of his era. Rating of 4 reflects a very good but not elite contact profile.",
    pow: "25 HR in 1899 — the most remarkable power season before Babe Ruth. The next-highest total was 12. Freeman hit tape-measure shots that held distance records at multiple parks. He hit the first ball ever completely out of Chicago's South Side Park. He led all major leaguers in HR from 1899-1905 with 77, outdistancing Lajoie by 28. This is a legitimate 4, bordering on 5, but the dead-ball context keeps it at 4.",
    spd: "21 SB and 25 triples in 1899 — the triples especially show real speed. 131 career triples. But Freeman was not a basestealing weapon — he was a power hitter who could run. Rating of 2 reflects good-but-not-elite speed.",
    def: "Freeman was a converted pitcher who learned outfield defense on the job. Manager Frank Selee openly despised his defensive play and his hitting style. Multiple sources describe him as a below-average fielder. Rating of 0 is appropriate.",
    clu: ".290 BA with 3 triples and 4 RBI in the 1903 World Series — the first WS ever played. Freeman was the best hitter on the championship Boston Americans. He contributed game-winning hits in the 9th and extra innings throughout the 1901-03 seasons. Rating of 2 reflects solid postseason production and a championship ring.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet power. Freeman didn't lead with speeches or intimidation — he led with tape-measure home runs. He was the cleanup hitter, the guy everyone counted on to drive in runs. His leadership was in his bat, not his mouth.",
    temperament: "Steady, working-class tough. Grew up in the coal mines of Northeastern Pennsylvania. Not flashy, not volatile — just relentless. He studied hitting mechanics scientifically, analyzing weight transfer and swing angles. A thinking man's slugger.",
    work_ethic: "Self-improver. Freeman worked with manager Arthur Irwin in Toronto to learn how to hit to the opposite field instead of just pulling everything. He studied his own swing mechanics and described them in technical detail to reporters. He also practiced intentionally fouling off pitches — a skill so effective it was literally called illegal in 1899.",
    lifestyle: "Coal miner's son. Worked in the mines alongside his father before baseball. After retirement, umpired in the American Association. No scandal, no excess — a blue-collar life bookended by the mines and the diamond. Died at 77 in Wilkes-Barre, the same town he grew up in.",
    era_adaptability: "MODERATE. Freeman's raw power would translate to any era — he was hitting 25 HR when nobody else hit 13. But his defense was always a liability, and his approach (swing from the heels, maximum power) was considered uncouth in his own time. He'd fit perfectly in the modern three-true-outcomes era.",
    clubhouse_impact: "POSITIVE-HUMBLE. Not a star personality but a reliable producer. Teammates relied on him for run production. He clashed with manager Selee but got along with everyone else. The kind of player you want hitting behind your table-setters.",
    dark_side: "Almost none. Freeman's only controversy was his hitting style — the 1900 Spalding Guide denounced 'sluggers' who only wanted to 'hit it out of sight' without naming him. He was considered uncouth for swinging for power in an era that worshipped slap hitting. In ILB terms: Freeman carries a 'Ahead of His Time' trait — his approach is mocked by contemporaries but validated by history.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Coal Miner's Son", desc: "Blue-collar toughness. Freeman never misses games due to fatigue and gains +1 morale on losing teams." },
    { tag: "Ahead of His Time", desc: "Freeman's power approach was mocked in the dead-ball era. He gains +1 POW in any era after 1920 (when the game catches up to him)." },
    { tag: "Tape Measure", desc: "When Freeman hits a HR, roll a d6. On 5-6, it's a tape-measure shot that gives +2 team momentum instead of +1." },
    { tag: "Pitcher's Eye", desc: "As a former pitcher, Freeman reads the mound. +1 to plate discipline — he draws more walks than his stats suggest." },
    { tag: "Cleanup Anchor", desc: "When batting 4th in the lineup, Freeman gains +1 RBI production. He's built for the cleanup spot." },
    { tag: "Bud Fowler's Gift", desc: "Freeman's career was shaped by advice from Black pioneer Bud Fowler. Freeman carries a 'Respect' trait — no racial chemistry penalties." },
    { tag: "Weak Glove", desc: "-1 DEF permanently. Freeman was a bad fielder and everyone knew it. His bat has to carry him." },
    { tag: "World Series Pioneer", desc: "In the first World Series ever played, Freeman produced. +1 CLU in any 'first-ever' scenario or inaugural event." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Studied swing mechanics. Worked with Irwin on opposite-field hitting. A scientific slugger." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Reliable presence. Not the life of the party, but always there." },
    { location: "Farm / Countryside", affinity: "MEDIUM", note: "Pennsylvania coal country roots. Comfortable in rural settings." },
    { location: "Community Events", affinity: "LOW", note: "Not a showman. Respected locally in Wilkes-Barre, not a national celebrity." },
    { location: "Bar / Saloon", affinity: "LOW", note: "No major drinking associations. Working-class steady." },
    { location: "Financial Office / Bank", affinity: "LOW", note: "Not money-motivated beyond fair pay. Jumped to AL for opportunity, not wealth." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Full-count situations — Freeman lived for the big swing moment",
      "New league/team transitions — he thrived after jumping to the AL",
      "Multi-HR games — power surges snowball into historic streaks",
      "Playing RF instead of 1B — his natural position unlocked his offense",
    ],
    cold_triggers: [
      "Hostile managers — Selee's criticism of his style visibly affected his production",
      "Defensive pressure — playing out of position (1B) dragged his overall game down",
      "Aging — skills declined sharply after 33, dropping 40 points of BA in one year",
    ],
    pressure_response: "SOLID. Freeman batted .290 with 3 triples in the first World Series ever played (1903). He delivered game-winning hits in late innings throughout his Boston tenure. Not a legend in October, but reliable when it counted. In ILB: Freeman is a safe cleanup hitter in elimination games — he won't choke, and he might go yard.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Twenty-Five",
      type: "Game Action",
      text: "Your power hitter enters a historic HR surge. For the next 5 games, every HR he hits is worth double momentum. If he hits 3+ HR in the span, team morale surges +3 and opposing pitchers lose -1 confidence for the rest of the season.",
      origin: "Freeman's 25 HR in 1899 was the most dominant power season in pre-Ruth history. The next closest hitter had 12. The standard deviation of his performance is the largest in baseball history.",
    },
    {
      title: "Out of the Park",
      type: "Game Action",
      text: "Your slugger hits a ball completely out of the stadium. It's an automatic HR with +3 momentum and the opposing pitcher is immediately pulled from the game.",
      origin: "Freeman hit the first ball ever completely out of Chicago's South Side Park in 1903. His tape-measure shots held distance records at multiple ballparks.",
    },
    {
      title: "The Coal Miner's Swing",
      type: "Action",
      text: "Your player from a working-class background channels raw physical power. For this at-bat, he swings from the heels: 50% chance of a HR, 30% chance of a strikeout, 20% chance of a single.",
      origin: "Freeman grew up working in the coal mines of Northeastern Pennsylvania alongside his father. He brought that raw power to the plate every at-bat.",
    },
    {
      title: "Bud Fowler's Advice",
      type: "Action",
      text: "A veteran scout from outside the system sees talent in your struggling pitcher. Convert him to a hitter. He loses all pitching stats but gains +3 CON and +2 POW as a position player.",
      origin: "African-American pioneer Bud Fowler saw Freeman's left-handed swing in batting practice and advised the struggling pitcher to focus on hitting. It changed everything.",
    },
    {
      title: "The Slugger's Shame",
      type: "Drama",
      text: "The league's official guide denounces your power hitter's style as uncouth. He loses -1 team reputation but gains +1 POW from spite. If he leads the league in HR, reputation is restored +2.",
      origin: "The 1900 Spalding Guide attacked Freeman's approach without naming him, calling sluggers whose 'sole object was to hit it out of sight' inferior to slap hitters.",
    },
    {
      title: "Hit for the Cycle",
      type: "Game Action",
      text: "Your best hitter gets a single, double, triple, and HR in the same game. Team morale surges +3. All batters gain +1 CON for the next game from the energy.",
      origin: "On June 21, 1903, Freeman hit for the cycle — the first player in Boston Americans/Red Sox history to do so. The papers described his hitting as 'biff, bang, smash.'",
    },
    {
      title: "The First World Series",
      type: "Action",
      text: "Your team enters a brand-new championship format. All players gain +1 morale from the novelty. Your cleanup hitter gains +1 CLU for the series.",
      origin: "Freeman was the best hitter on the 1903 Boston Americans — the first team ever to win a World Series. He batted .290 with 3 triples in 8 games.",
    },
    {
      title: "Converted Pitcher",
      type: "Action",
      text: "Your struggling pitcher is moved to the outfield. He loses pitching ability but gains +2 POW. However, his DEF is permanently -1 as he learns a new position.",
      origin: "Freeman debuted as a wild left-handed pitcher in 1891 (33 walks in 44 innings). Retrained as an outfielder, he became the greatest slugger of the pre-Ruth era.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Broad, strong face with a heavy jaw and thick neck. Working-class build — not tall (5'9\") but densely muscled from years in the coal mines. Serious expression, no-nonsense. Eyes squinting slightly, like a man used to judging fly balls in dim light.",
    attire: "Washington Senators 1899 uniform — white wool flannel with dark cap. High collar, loose fit. No number. The uniform is slightly rumpled — Freeman is a hitter, not a fashion plate. Bat gripped low, weight shifting forward in his signature power stance.",
    mood: "Raw power. Not elegant like Lajoie or clever like Keeler — primal. The look of a man about to send a baseball over a building. Mid-swing with maximum follow-through, weight fully transferred, looking up at the trajectory. Or standing in the box, bat cocked, eyes locked on the pitcher.",
    style: "Darker sepia than the other Banners cards — heavier browns, deeper shadows. Coal dust undertones. A slightly industrial feeling — smokestacks or tenement buildings blurred in the background instead of a pastoral grandstand. Tobacco-card composition but grittier, more raw. The working man's card.",
    reference: "Think of the early power hitters — Brouthers, Thompson — but rendered in the ILB sepia style with more weight and gravity. Freeman should look like he could break the card frame. The heaviest-feeling card in the Banners set.",
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

export default function BuckFreemanCard() {
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
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 1 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 2 }}>{d.team} — {d.year}</div>
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
              {["💥 25 HR (1899)", "🏆 1903 WS Champ", "👑 2× RBI Leader", "👑 2× HR Leader", "🔥 Pre-Ruth HR King", "⚡ Hit for the Cycle"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Freeman's real life, become universal cards playable in any game.</p>
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
                <Section title="Freeman's Derivation">
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
