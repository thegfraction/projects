import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}flick-elmer.png`;

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: ELMER FLICK
  // Year Snapshot: 1900 (Peak Season — .367 BA, 110 RBI)
  // ═══════════════════════════════════════════════════════════════

  name: "Elmer Flick",
  nickname: "The Demon of the Stick",
  year: 1900,
  team: "Philadelphia Phillies",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "RF",
  bats: "L",
  throws: "R",
  height: '5\'9"',
  weight: "168 lbs",
  born: "January 11, 1876 — Bedford, OH",
  died: "January 9, 1971 — Bedford, OH",
  hof: "Class of 1963 (Veterans Committee — unanimous, oldest living inductee at 87)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1900 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1900,
    games: 138,
    at_bats: 545,
    hits: 200,
    doubles: 32,
    triples: 16,
    home_runs: 11,
    rbi: 110,
    stolen_bases: 35,
    batting_avg: ".367",
    obp: ".441",
    slg: ".545",
    ops: ".986",
    ops_plus: 179,
    war: 7.6,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 0,
    career_avg: ".313",
    career_hits: 1752,
    career_hr: 48,
    career_sb: 330,
    career_war: 53.0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CONTACT (CON): .367 BA → 5, OPS+ 179 → already capped = 5
  // POWER (POW): 11 HR → 1, SLG .545 → +1 = 2
  // SPEED (SPD): 35 SB → 3 (max). 16 triples. Fleet-footed.
  // DEFENSE (DEF): No Gold Gloves (didn't exist). Solid RF,
  //   played shallow for assists. Led league in OF assists = 1
  // OVERALL (OVR): CON×2+POW×1.5+SPD×1+DEF×0.5 = 10+3+3+0.5 = 16.5
  //   Normalized: 8 (All-Star) — shorter career caps his ceiling
  // CLUTCH (CLU): Never reached a World Series. Competitive in
  //   pennant races but no defining October moments = 0
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star tier — elite peak but abbreviated career
    con: 5,      // .367 BA in 1900, career .313. Only 30 K in 545 AB in peak year.
    pow: 2,      // 11 HR + .545 SLG — real pop for the dead-ball era
    spd: 3,      // 35 SB in 1900, 330 career. Led AL twice. 164 career triples. Maximum speed.
    def: 1,      // Solid RF, played shallow for extra assists, led league in OF assists. Not elite but smart.
    clu: 0,      // Never reached a World Series. No postseason moments.
  },

  stat_justification: {
    con: ".367 BA in 1900 — second only to Honus Wagner that year, and Wagner said beating Flick for the title was one of his greatest thrills. Career .313 with a 148 career OPS+. Only 30 strikeouts in 545 AB in 1900. Flick made his own bats on his father's lathe — the original bat craftsman.",
    pow: "11 HR in 1900, 48 career. .545 SLG in peak year. 59 extra-base hits and 297 total bases in 1900, both second in the NL. For a 5'9\" dead-ball-era outfielder, Flick had legitimate gap power and occasional over-the-fence pop.",
    spd: "35 SB in 1900, 330 career. Led the AL in stolen bases twice (1904, 1906). 164 career triples — 11th-most in baseball history. Led AL in triples 3 consecutive years (1905–07). Maximum speed rating.",
    def: "Solid defensive RF who played shallow to generate assists — led the league in outfield assists. Got into fistfights with Lajoie over defensive territory (fly balls in right field). Smart positioning but not a range wizard. Rating of 1 reflects good-not-great reputation.",
    clu: "Never reached a World Series. The Phillies and Naps were competitive but never won pennants during Flick's peak. No postseason data exists. Clutch rating of 0 reflects the total absence of October moments, not a lack of ability.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Scrappy, independent, self-made. Flick didn't lead with words — he led by showing up barefoot at 15 and outperforming everyone. A farm kid who made his own bats and fought his way into the majors. Not a captain — a competitor.",
    temperament: "Fiery but lovable. Flick was a boxer and wrestler in high school, and it showed. He fistfought Nap Lajoie — his own teammate — over a bat and over fly balls. But he wasn't mean-spirited; he was just intensely competitive. Think of a terrier that doesn't know it's small.",
    work_ethic: "Self-taught craftsman. Flick literally carved his own bats on his father's lathe in Bedford, Ohio. He hit .438 in the minors with a homemade bat. His approach was hands-on, practical, and deeply personal — every tool was his own.",
    lifestyle: "Farm boy, through and through. Born on a farm in Bedford, Ohio. Father was a Civil War vet and mechanic who tried to build a flying machine. Flick raised horses, hunted, and built houses after retirement. Lived to 94. Died two days before his 95th birthday, in the same town he was born in.",
    era_adaptability: "MODERATE-HIGH. Flick's speed, bat control, and competitive fire would translate to any era. His abbreviated career and mysterious stomach illness add risk — he's a high-peak, low-longevity player. In a modern context, he'd be a 5-tool prospect who gets derailed by injury.",
    clubhouse_impact: "FEISTY-POSITIVE. Flick was well-liked despite his willingness to fight teammates. His scrappiness was infectious. He made teams tougher just by being in the lineup. The kind of player who elevates intensity without creating toxicity.",
    dark_side: "The mysterious illness. Starting in 1908, Flick developed a crippling stomach ailment that dropped his weight to 130 lbs and effectively ended his career at 32. Cleveland initially blamed 'overeating.' Doctors recommended removing his appendix, but Flick refused surgery out of fear. The illness was never fully explained. In ILB terms: Flick carries a 'Fragile' trait — a ticking clock that can end his career prematurely via random health event.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Scrapper", desc: "Flick gains +1 to all stats when his team is the underdog or trailing. He fights harder when the odds are against him." },
    { tag: "Bat Craftsman", desc: "Flick's homemade bats give him +1 CON in his first at-bat each game. Personal tools, personal edge." },
    { tag: "Ohio Roots", desc: "Extra comfort in Midwest and industrial-era city squares. Bedford, Ohio was his entire world." },
    { tag: "Rival: Lajoie", desc: "When on the same team as Nap Lajoie, chemistry is volatile: +1 to both players' stats, but a 1-in-10 chance of a fistfight event each series." },
    { tag: "Triples Machine", desc: "On any hit to the gap, Flick has a bonus chance to stretch it to a triple. Roll 4+ on a double for an upgrade." },
    { tag: "Fragile", desc: "Every 10 games, roll a d20. On a 1, Flick develops a health issue and misses 3 games. On a 2, he plays at -1 OVR for 2 games." },
    { tag: "Farm Strong", desc: "Flick doesn't fatigue from travel. No away-game penalties." },
    { tag: "Valued Over Cobb", desc: "Flick's perceived value is higher than his stats suggest. He cannot be traded for less than a star-level return." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Farm / Countryside", affinity: "HIGH", note: "Born on a farm, raised horses, hunted. Bedford, Ohio was home forever." },
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Crafted his own bats. Practiced with purpose. Self-taught fundamentals." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Liked teammates, but would fight them over a bat or a fly ball." },
    { location: "Community Events", affinity: "MEDIUM", note: "Popular in Cleveland and Bedford. A local legend, not a national celebrity." },
    { location: "Financial Office / Bank", affinity: "LOW", note: "Money-motivated enough to jump leagues, but not a businessman. Preferred farming." },
    { location: "Bar / Saloon", affinity: "LOW", note: "No major drinking associations. Farm-boy lifestyle." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Fresh starts — Flick thrived in new environments (Phillies debut, AL jump)",
      "Tight batting races — his duel with Wagner in 1900 brought out his best",
      "Multi-triple games — once he starts legging out triples, momentum surges",
      "Playing alongside stars — performed best when surrounded by talent",
    ],
    cold_triggers: [
      "Health issues — the mysterious stomach illness derailed his career from 1908 onward",
      "Contract disputes — considered retiring multiple times over money and fatigue",
      "Physical decline — his skills eroded rapidly once the illness took hold",
    ],
    pressure_response: "UNKNOWN-PROMISING. Flick never reached a World Series, so his clutch ability is untested. His 1900 batting race with Wagner — going down to the final day — suggests he could perform under pressure. But the sample size is too small to be certain. In ILB: Flick is a wildcard in pressure situations. He might rise to the occasion or he might not. That uncertainty is part of his card's appeal.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Barefoot Ballplayer",
      type: "Action",
      text: "A 15-year-old kid with no uniform shows up at the train station and asks to play. If you give him a roster spot, he becomes a random prospect with stats between 4-8 OVR. 20% chance he's a future Hall of Famer.",
      origin: "At 15, Flick was at a train station when the local semi-pro team was short a player. He joined them barefoot and without a uniform — and a Hall of Fame career began.",
    },
    {
      title: "The Homemade Bat",
      type: "Game Action",
      text: "Your player carves his own bat on a lathe. For the rest of the series, he gains +1 CON and his hits are more likely to go to the opposite field. But the bat has a 10% chance of breaking each game.",
      origin: "Flick literally carved his own bat on his father's lathe in Bedford, Ohio. He used it to hit .438 in the minors.",
    },
    {
      title: "Valued Over Cobb",
      type: "Drama",
      text: "An opposing team offers to trade their young superstar for your veteran outfielder. Your manager refuses. If the young player becomes a legend, your team's reputation takes -3. If he busts, your team gains +3.",
      origin: "In 1907, Detroit offered Ty Cobb straight up for Elmer Flick. Cleveland refused. It became one of the worst non-trades in baseball history.",
    },
    {
      title: "The Fistfight Over a Bat",
      type: "Drama",
      text: "Two teammates get into a brawl over equipment. One breaks his thumb. The injured player misses 5 games. But both players gain +1 intensity for the rest of the season.",
      origin: "Flick and Lajoie fought over a bat during a 1900 game. Lajoie broke his thumb on a wall and missed five weeks. Flick, who boxed in high school, held his own despite being 30 lbs lighter.",
    },
    {
      title: "The Pennsylvania Injunction",
      type: "Drama",
      text: "A court order bars your player from playing in one state. He can play all other games but must take a paid vacation during road trips to that state. You keep him but lose home-field advantage in that city.",
      origin: "Like Lajoie, Flick was barred by the Pennsylvania Supreme Court from playing for any team except the Phillies — but only in Pennsylvania. He joined Cleveland and simply skipped Philly road trips.",
    },
    {
      title: "The Mysterious Illness",
      type: "Drama",
      text: "Your star player develops a chronic, unexplained stomach ailment. He drops 30 lbs. Play him at -2 OVR for the rest of the season, or shut him down entirely. If you shut him down, he has a 60% chance of returning next season at full strength. If you play him through, 40% chance his career ends.",
      origin: "Flick's mysterious gastrointestinal illness starting in 1908 was never explained. It reduced him from 168 to 130 lbs and effectively ended his career at 32.",
    },
    {
      title: "Three Triples",
      type: "Game Action",
      text: "Your fastest outfielder hits three triples in one game. Each triple generates +1 team momentum. After the third, the opposing team's morale crashes by -2.",
      origin: "On July 6, 1902, Flick hit three triples in a single game — a rare feat accomplished fewer than 50 times in the next century.",
    },
    {
      title: "The Flying Machine",
      type: "Action",
      text: "Your player's eccentric father builds a failed flying machine. It becomes a local legend. Team gains +1 reputation in the home city (the fans love the story) but -1 credibility with rival teams.",
      origin: "Flick's father Zachary, a Civil War vet and mechanic, gained local notoriety for his failed attempt(s) to build a flying machine in Bedford, Ohio.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, athletic face with a determined, slightly mischievous expression. Not big — 5'9\" 168 lbs — but wiry and coiled. Clean-shaven with a strong jaw. Eyes bright and alert, scanning the field. The look of a farm kid who can outrun you and outfight you.",
    attire: "Philadelphia Phillies 1900 home whites, baggy wool flannel, high collar. No number. Cap slightly tilted. Uniform a bit loose on his wiry frame. Maybe a trace of red clay or dirt on the knees — this is a guy who slides hard and stretches doubles into triples.",
    mood: "Scrappy confidence. Not the serene grace of Lajoie or the cold menace of Cobb — this is a terrier. Compact energy, coiled to spring. Mid-swing with a slightly unconventional bat, or rounding second at full tilt, head down.",
    style: "Warm sepia with golden-brown earth tones. Rural feeling — a wooden fence or farmland haze in the background rather than a grand stadium. Tobacco-card composition with simpler, more rustic border than the big-city stars. Aged paper with heavy foxing and patina. The feeling of small-town Ohio at the turn of the century.",
    reference: "Think Old Judge or early T-series card — less polished than Cobb's or Lajoie's card. The underdog card. ILB sepia style but earthier, more humble. Flick should look like the kind of guy you'd find at a county fair who happens to be a Hall of Famer.",
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

export default function ElmerFlickCard() {
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
              {["🏆 HOF 1963", "👑 1× Batting Title", "⚡ 2× SB Leader", "🔥 3× Triples Leader", "📜 164 Career 3B", "💎 Valued Over Cobb"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Flick's real life, become universal cards playable in any game.</p>
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
                <Section title="Flick's Derivation">
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
