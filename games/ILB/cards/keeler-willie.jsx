import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}keeler-willie.png`;

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: WILLIE KEELER
  // Year Snapshot: 1897 (Peak Season — .424 BA, 44-Game Streak)
  // ═══════════════════════════════════════════════════════════════

  name: "Willie Keeler",
  nickname: "Wee Willie",
  year: 1897,
  team: "Baltimore Orioles",
  era: "1890s",
  ilb_team: "Banners NL1890",
  position: "RF",
  bats: "L",
  throws: "L",
  height: '5\'4"',
  weight: "140 lbs",
  born: "March 3, 1872 — Brooklyn, NY",
  died: "January 1, 1923 — Brooklyn, NY",
  hof: "Class of 1939 (BBWAA, 75.5%)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1897 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1897,
    games: 129,
    at_bats: 564,
    hits: 239,
    doubles: 27,
    triples: 19,
    home_runs: 0,
    rbi: 74,
    stolen_bases: 64,
    batting_avg: ".424",
    obp: ".464",
    slg: ".539",
    ops: "1.003",
    ops_plus: 168,
    war: 8.7,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 0,
    career_avg: ".341",
    career_hits: 2932,
    career_hr: 33,
    career_sb: 495,
    career_war: 54.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CONTACT (CON): .424 BA → 5, OPS+ 168 → already capped = 5
  // POWER (POW): 0 HR → 0, SLG .539 → +1 = 1
  //   (193 of 239 hits were singles. 30 of 33 career HR were inside-the-park.)
  // SPEED (SPD): 64 SB → 3 (max), plus triples and range
  // DEFENSE (DEF): No Gold Gloves (didn't exist). Solid RF but
  //   not elite. McGraw needled him for defensive lapses = 0
  // OVERALL (OVR): CON×2+POW×1.5+SPD×1+DEF×0.5 = 10+1.5+3+0 = 14.5
  //   Normalized: 9 (Elite)
  // CLUTCH (CLU): 5 pennants with Baltimore/Brooklyn. .373 avg
  //   over 9 pennant-contending seasons. Won Temple Cup 1896 = 2
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite tier — one of the greatest contact hitters ever, but zero power
    con: 5,      // .424 BA in 1897 — highest LH single-season ever. Career .341. Struck out 2 times in 570 AB (1899).
    pow: 1,      // 0 HR in 1897, 33 career (30 inside-the-park). .539 SLG earns the +1 bonus.
    spd: 3,      // 64 SB in 1897, 495 career. 19 triples. Maximum speed.
    def: 0,      // Solid but not elite RF. McGraw criticized his defense. No formal accolades.
    clu: 2,      // 5 pennants. .373 avg over 9 contending seasons. Temple Cup champion. Reliable in big spots.
  },

  stat_justification: {
    con: ".424 BA in 1897 — the highest single-season average by a left-handed hitter in baseball history. Career .341 with 2,932 hits. 8 consecutive 200-hit seasons (record stood for 100+ years until Ichiro). Struck out only TWICE in 570 AB in 1899 — an AB/K ratio of 285, the single-season record. His skill at fouling off pitches literally caused the foul-bunt-strikeout rule to be invented. The ultimate contact hitter.",
    pow: "Zero home runs in 1897. 33 career HR, 30 of them inside-the-park. 193 of his 239 hits in 1897 were singles. Keeler had absolutely no power in the traditional sense — his .539 SLG came entirely from triples (19) and doubles (27). The +1 SLG bonus is generous but reflects his extra-base ability through speed, not muscle.",
    spd: "64 stolen bases in 1897. 495 career SB. 19 triples in his peak season. At 5'4\" 140 lbs, Keeler was a blur on the basepaths. His speed enabled the Baltimore Chop, the hit-and-run, and the bunt single. Maximum speed rating.",
    def: "Keeler was a competent right fielder but not an elite defender. John McGraw — his own teammate — needled him for defensive lapses, and the two once brawled naked in the Orioles' shower over it. No Gold Gloves existed, and his defensive reputation doesn't warrant a bonus.",
    clu: "Won 5 NL pennants (1894–96, 1899–1900). Hit .373 over 9 contending seasons. Won the Temple Cup in 1896. His 44-game hitting streak carried Baltimore through the 1897 season. Reliable and consistent in big moments, even if there was no modern postseason to test him.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet, genteel, lead-by-craft. Keeler wasn't a shouter or a fighter — he was the polite professional on a team of brawlers. His leadership was in his consistency: 239 hits, every single day, never missing a beat. Teammates trusted him because he always delivered.",
    temperament: "Amiable, friendly, polite. The gentleman of the rough-and-tumble 1890s Orioles. Didn't drink, didn't swear. But he wasn't soft — he fought McGraw naked in the shower when pushed too far, and he perfected deceptive tactics like the Baltimore Chop. Polite doesn't mean pushover.",
    work_ethic: "Craftsman-level. Keeler didn't overpower anything — he outthought it. His custom 46-ounce bat was oversized for his tiny frame but gave him extraordinary control. He practiced bunting and place-hitting until he could put the ball anywhere on the field. His approach was surgical, not brute force.",
    lifestyle: "Brooklyn boy, working-class Irish roots. Father was a trolley switchman. Quit school young, played semi-pro ball, worked his way up. After retirement, invested wisely in mining and real estate — died wealthy. Simple, steady, no scandal.",
    era_adaptability: "VERY HIGH. Keeler's skill set — contact, speed, bunting, place-hitting — translates to any era. He's basically a 19th-century Ichiro Suzuki. His approach would work in the dead-ball era, the live-ball era, or the analytics era. The only thing that wouldn't translate is his complete lack of power.",
    clubhouse_impact: "POSITIVE-QUIET. Well-liked by everyone. Didn't cause drama, didn't demand the spotlight. The kind of player who makes a team better just by being reliable. On a team of Hall of Famers (McGraw, Jennings, Kelley, Robinson), Keeler was the one everyone got along with.",
    dark_side: "Almost none. Keeler was unusually clean for his era. The only blemish: his bunting technique was so exploitative that it literally changed the rules of baseball — foul bunts with two strikes became strikeouts because of him. In ILB terms: Keeler carries a 'Rule Exploiter' trait — he'll find every edge in the rules, and the rules might change because of him.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Hit 'Em Where They Ain't", desc: "Keeler's signature. +1 CON when facing a shift or unusual defensive alignment. He always finds the gap." },
    { tag: "Leadoff Spark", desc: "When batting first in the lineup, Keeler's OBP bonus gives the entire team +1 momentum for the first inning." },
    { tag: "Everyman", desc: "Compatible with players from all eras and backgrounds. No chemistry conflicts with anyone." },
    { tag: "Brooklyn Roots", desc: "Extra comfort in New York-area city squares. Born, lived, and died in Brooklyn." },
    { tag: "Rule Exploiter", desc: "Keeler finds loopholes. Once per game, he can attempt a 'Baltimore Chop' — an automatic infield single on a roll of 4+." },
    { tag: "Streaker", desc: "After 3 consecutive games with a hit, Keeler enters 'Streak Mode': +1 CON until the streak ends." },
    { tag: "Gentleman", desc: "Keeler never causes team chemistry problems. His presence prevents 1 negative clubhouse event per series." },
    { tag: "Ichiro's Ancestor", desc: "When paired with any Japanese-era or speed-first player, both gain +1 chemistry (spiritual connection across eras)." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Hours of bunting practice and place-hitting drills. Surgical precision requires repetition." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Comfortable, steady presence. Gets along with everyone — even the brawlers." },
    { location: "Community Events", affinity: "MEDIUM", note: "Popular with fans in Brooklyn. Approachable and friendly, but not a showman." },
    { location: "Restaurant / Pub", affinity: "MEDIUM", note: "Social but didn't drink. Enjoyed company without excess." },
    { location: "Financial Office / Bank", affinity: "MEDIUM", note: "Smart investor post-career. Mining companies and real estate. Died wealthy." },
    { location: "Bar / Saloon", affinity: "LOW", note: "Didn't drink or swear. The Orioles' designated gentleman." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association whatsoever." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Hitting streaks — Keeler's 44-game streak shows he gets better the longer he plays",
      "Playing for contending teams — 5 pennants in 9 years, all with high averages",
      "Batting leadoff — his natural position, where he thrives",
      "Facing overshifted defenses — he lives for the gap",
    ],
    cold_triggers: [
      "Losing teams — his production declined significantly with the non-contending Highlanders",
      "Surly or hostile managers — he left the 1908 Highlanders mid-season because of Kid Elberfeld",
      "Aging — his skills eroded fast after 35 as speed disappeared",
    ],
    pressure_response: "RELIABLE. Keeler wasn't a clutch superstar — he was a clutch machine. He hit .373 over 9 contending seasons. He won pennants. He delivered every day. He wasn't flashy in October because there was barely an October in his era — but he was always there, always producing, always getting on base. In ILB: Keeler is the safest bet in your lineup. He won't win you the game with one swing, but he'll never lose it for you either.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Hit 'Em Where They Ain't",
      type: "Game Action",
      text: "Your leadoff hitter places the ball perfectly between fielders. Automatic single. If the defense was shifted, it becomes a double.",
      origin: "Keeler's immortal hitting philosophy, the most famous quote in baseball history: 'Keep your eye clear, and hit 'em where they ain't.'",
    },
    {
      title: "The Baltimore Chop",
      type: "Game Action",
      text: "Your batter chops the ball into the hard dirt in front of home plate. It bounces over the infielders' heads. Roll 5+ for an infield single. If your batter has SPD 2+, automatic hit.",
      origin: "Keeler perfected the Baltimore Chop with the 1890s Orioles — chopping the ball into the ground so hard it bounced over fielders, exploiting Baltimore's rock-hard infield dirt.",
    },
    {
      title: "The 44-Game Streak",
      type: "Action",
      text: "Your highest-CON player enters a hitting streak. For every consecutive game with a hit, he gains +1 CON (cap at +3). If the streak reaches 10 games, team morale surges +2. If it ends, morale drops -1.",
      origin: "Keeler's 44-game hitting streak to start 1897 was the all-time record for 44 years — until Joe DiMaggio broke it in 1941. Pete Rose tied it in 1978.",
    },
    {
      title: "The Foul Bunt Loophole",
      type: "Action",
      text: "Your batter fouls off pitch after pitch, exhausting the opposing pitcher. The pitcher loses -1 stamina. If the pitcher's stamina drops to 0, your batter draws a walk.",
      origin: "Keeler's ability to foul off any pitch by bunting was so dominant that baseball literally changed the rules because of him — making a foul bunt with two strikes a strikeout.",
    },
    {
      title: "They Changed the Rules",
      type: "Drama",
      text: "Your player's signature technique is so effective that the league bans it. He loses his signature ability for the rest of the season but gains +2 IQ (he adapts) and +1 team reputation.",
      origin: "The foul-bunt strikeout rule was implemented directly because of Keeler's exploitative bunting technique. He adapted and kept hitting .300+ for years after.",
    },
    {
      title: "Wee Willie's Big Bat",
      type: "Game Action",
      text: "Your smallest player wields an oversized bat. He gains +1 CON but -1 SPD for this game (the bat is heavy). If he gets 3+ hits, the penalty is waived for the rest of the series.",
      origin: "At 5'4\" 140 lbs, Keeler swung a 46-ounce bat — one of the heaviest in baseball history. It gave him extraordinary bat control despite his tiny frame.",
    },
    {
      title: "Shower Brawl",
      type: "Drama",
      text: "Two teammates get into a fistfight in the clubhouse. Both lose -1 morale for 1 game. But if neither is benched, team chemistry actually increases +1 (they respect each other more).",
      origin: "Keeler and John McGraw brawled naked in the Orioles' shower room during the 1897 season after McGraw criticized Keeler's defense. Teammate Jack Doyle stood guard at the door.",
    },
    {
      title: "The Gentleman's Game",
      type: "Action",
      text: "Your most polite player defuses a potential team conflict. Prevent 1 negative chemistry event. All players gain +1 morale for this game.",
      origin: "Keeler was universally described as genteel, friendly, and polite — the calm center of the rowdy, brawling Baltimore Orioles dynasty.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Small, compact face with bright, intelligent eyes. Clean-shaven with a slight, knowing smile — the look of a man who sees the gap before the pitcher releases the ball. Irish features, youthful even at 25. Tiny frame but confident posture.",
    attire: "Baltimore Orioles 1890s uniform — baggy wool flannel, high collar, 'O' or script lettering barely visible. Cap tilted slightly. The uniform hangs loose on his small frame. Oversized bat visible, resting on his shoulder or mid-bunt follow-through.",
    mood: "Playful confidence. Not menacing like Cobb or serene like Lajoie — clever. The smartest guy on the field who knows it. A slight smirk. The look of a man about to bunt his way to a .424 average.",
    style: "Warm golden sepia with softer tones than Cobb's card — less dust, more warmth. 1890s wooden grandstand background with bunting decorations. Ornate tobacco-card border. Aged paper with gentle foxing. The feeling of gaslight-era Brooklyn.",
    reference: "Think Old Judge cigarette card or N172 series — softer, more romantic than the T206 era. The ILB sepia style but pushed slightly warmer and more golden. Keeler should look like a character from a period drama, not a war movie.",
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

export default function WillieKeelerCard() {
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
              {["🏆 HOF 1939", "🔥 44-Game Hit Streak", "👑 2× Batting Title", "📜 2,932 Career Hits", "⚡ 8× 200-Hit Seasons", "🏆 5× NL Pennant"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Keeler's real life, become universal cards playable in any game.</p>
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
                <Section title="Keeler's Derivation">
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
