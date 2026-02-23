import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}collins-jimmy.png`;

const PLAYER_DATA = {
  name: "Jimmy Collins",
  nickname: "King of the Third Basemen",
  year: 1898,
  team: "Boston Beaneaters",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "3B",
  bats: "R",
  throws: "R",
  height: '5\'9"',
  weight: "178 lbs",
  born: "January 16, 1870 — Buffalo, NY",
  died: "March 6, 1943 — Buffalo, NY (age 73, pneumonia)",
  hof: "Inducted 1945 (Old Timers Committee). First player inducted primarily as a third baseman. 2nd all-time in putouts by a 3B (behind Brooks Robinson). Revolutionized the position.",

  real_stats: {
    season: 1898, games: 152, at_bats: 597, hits: 196, doubles: 35,
    triples: 5, home_runs: 15, rbi: 111, runs: 107, stolen_bases: 12,
    batting_avg: ".328", obp: ".377", slg: ".439", ops: ".816",
    ops_plus: 135, war: 6.7,
    career_avg: ".294", career_hits: 1999, career_hr: 65, career_sb: 194,
    career_rbi: 983, career_runs: 1055,
    career_war: 36.8, career_obp: ".343", career_ops_plus: 113,
    ws_1903_avg: ".250", ws_1903_result: "Won (5-3 vs. Pittsburgh)",
  },

  ilb_stats: {
    ovr: 8,      // All-Star — revolutionized 3B defense. .294 career BA. Won 1st WS as player-manager. HOF. "King of third basemen" until Brooks Robinson.
    con: 4,      // .328 BA in 1898 → tier 4 (.300-.329). OPS+ 135 → ≥130 bonus (+1) = 5, but career .294/113 OPS+ suggests peak was short. Capped at 4 for composite assessment.
    pow: 1,      // 15 HR in 1898 → tier 1 (10-19). Led NL in HR. SLG .439 (no ≥.500 bonus). Decent dead-ball power — 286 total bases, 35 doubles. But 65 career HR. Rating: 1.
    spd: 1,      // 12 SB in 1898 → tier 1 (6-15). 194 career SB. Not a burner but adequate baserunner. Rating: 1.
    def: 3,      // REVOLUTIONIZED THIRD BASE. First 3B to play in on the grass to field bunts. 2nd all-time in putouts (behind Brooks Robinson). Led 3B in putouts 5×, assists 4×, double plays 2×. 601 chances in 1899 (NL record). "King of the third basemen." First HOFer inducted as 3B. Maximum defense: 3.
    clu: 2,      // .250 in 1903 WS → tier 1 (.250-.299). Won the FIRST modern World Series as player-manager. Led Boston Americans over Pittsburgh. WS champion + manager = +1. Rating: 2.
  },

  stat_justification: {
    con: ".328 BA in 1898 → tier 4 (.300-.329). OPS+ 135 → ≥130 bonus applies (+1) = 5, but I'm capping at 4. Reason: his career .294 BA and 113 OPS+ show that the 1897-98 peak (.346/.328) was an outlier. He was a very good dead-ball hitter but not an elite career-long one. Five seasons above .300. 1,999 career hits (one shy of 2,000). Rating: 4.",
    pow: "15 HR in 1898 → tier 1 (10-19). Led the NL in home runs. SLG .439 (no bonus). 286 total bases, 35 doubles — real gap power by dead-ball standards. But 65 career HR in 14 seasons. Rating: 1.",
    spd: "12 SB in 1898 → tier 1 (6-15). 194 career SB. Not known for speed — known for defensive positioning and hands. Rating: 1.",
    def: "REVOLUTIONARY. Jimmy Collins invented modern third base defense. Before him, bunts down the third base line were the shortstop's responsibility. Collins was the first to play in on the grass, bare-hand the bunt, and throw underhand to first. He threw out McGraw, Keeler, and the entire Baltimore Orioles bunting game in a single afternoon. 2nd all-time in putouts by a 3B (behind only Brooks Robinson). Led league 3B in putouts 5×, assists 4×, double plays 2×. 601 chances in 1899 (NL record). 'King of the third basemen' — the consensus best at the position until Brooks Robinson in the 1960s. First HOFer inducted primarily as a 3B. Maximum defense: 3.",
    clu: ".250 BA in the 1903 World Series → tier 1 (.250-.299). But he won the FIRST modern World Series as player-manager — Boston Americans defeated Pittsburgh 5 games to 3. Also won the 1904 AL pennant (no WS played). PS BA tier 1 + WS champion/manager bonus (+1) = 2.",
  },

  personality: {
    leadership_style: "Player-manager and businessman. Collins ran the Boston Americans like a business — he recruited Cy Young from the NL, built the roster, managed the team, and played third base. He was the franchise's first star and first leader. Tim Murnane called him 'a great third baseman, a great captain and a good fellow.' Collins led from the front — fielding bunts and making lineups.",
    temperament: "Brash, shrewd, self-interested. When Louisville tried to recall him in 1895, Collins refused and threatened to retire and go back to his railroad job in Buffalo. He leveraged his value constantly — negotiated a $5,500 salary, $3,500 signing bonus, AND a cut of team profits to join the Americans. 'I would not go back now if they offered me the whole outfit.' He knew his worth and extracted it.",
    work_ethic: "The bunt defense wasn't natural talent — it was studied innovation. 'Once around the circuit, you knew who would bunt and who wouldn't. You knew McGraw and Keeler were bunters. So I played them on the edge of the grass.' Collins invented a defensive philosophy through observation and positioning. He turned third base from a reactive position into a proactive one.",
    lifestyle: "Buffalo Irish-American. Railroad worker before baseball. Businessman mentality — recalled salary levels years later but not batting averages. After baseball, worked for the Buffalo Parks Department. Real estate investor (peaked during WWI, lost value in 1920s-30s). Married Sarah Murphy in 1907; three daughters (first died young). Died in Buffalo, March 6, 1943.",
    era_adaptability: "MIXED. Collins's defensive innovation — playing in on the grass, bare-handing bunts — was revolutionary for his era but is now standard for all third basemen. His hitting (.294 career, 65 HR) would not translate to modern power standards. He'd be a good-field, moderate-bat third baseman — a defensive specialist. His managerial instincts and game IQ would translate to any era.",
    clubhouse_impact: "COMPLEX. Collins was a leader who built rosters and won championships, but he also disappeared to Florida mid-season in 1906 and clashed with ownership. His successor as manager, Chick Stahl, committed suicide during spring training 1907 — a dark shadow over the franchise Collins had built. In ILB: strong leadership (+2 manager bonus) but potential for mid-season absence (-1 reliability).",
    dark_side: "The vanishing and the aftermath. In August 1906, Collins simply failed to appear for a game in Chicago. The team searched for days. He was finally found in Florida, 'on vacation.' Suspended, replaced as manager. The year after, his successor Chick Stahl locked himself in a hotel room and drank acid — suicide — during spring training 1907. The franchise Collins built fell into darkness. Collins finished his career with Connie Mack's Athletics, a quiet exile. He died in Buffalo, back where he started, working for the Parks Department. One hit shy of 2,000.",
  },

  chemistry_traits: [
    { tag: "The Bunt Killer", desc: "Collins invented modern 3B bunt defense. When playing in on the grass, all opposing bunts have a 70% chance of being outs. The bunt game dies when Collins is at third." },
    { tag: "King of Third Basemen", desc: "Best 3B until Brooks Robinson (1960s). +1 DEF permanently. When Collins is at 3B, all ground balls to the left side have +20% chance of becoming outs." },
    { tag: "Player-Manager", desc: "Collins managed and played simultaneously. +1 team strategy. He sets the lineup, makes the pitching changes, AND fields bunts." },
    { tag: "First WS Champion", desc: "Won the first modern World Series (1903). +3 franchise legacy. This is where it all started." },
    { tag: "Recruited Cy Young", desc: "Personally recruited Cy Young from the NL to the Boston Americans. When Collins is manager, +1 to all free agent recruitment rolls." },
    { tag: "The Negotiator", desc: "Leveraged his value for $5,500 salary + $3,500 bonus + profit share. In any contract negotiation, Collins gains maximum leverage. Will threaten retirement." },
    { tag: "The Vanishing", desc: "Disappeared to Florida mid-season 1906. Once per season, Collins may be unavailable for 1 week with no warning. -2 reliability." },
    { tag: "One Shy of 2000", desc: "1,999 career hits. So close to a milestone that never came. +1 poignancy to legacy." },
  ],

  preferred_locations: [
    { location: "Third Base", affinity: "HIGH", note: "Revolutionized the position. 2nd all-time in putouts. The hot corner was his throne." },
    { location: "Manager's Office", affinity: "HIGH", note: "Player-manager for 6 years. Built the Boston Americans roster. Won the first World Series." },
    { location: "Buffalo, NY", affinity: "HIGH", note: "Born, raised, retired, and died in Buffalo. Railroad worker. Parks Department. The city was home." },
    { location: "Negotiating Table", affinity: "HIGH", note: "Shrewd businessman. Recalled salaries years later, not batting averages. Always knew his worth." },
    { location: "Clubhouse / Dugout", affinity: "MEDIUM", note: "The captain and leader. But also the man who disappeared to Florida. Complex presence." },
    { location: "Florida", affinity: "LOW", note: "The 1906 vanishing act. Where he went when he'd had enough. A place of escape, not joy." },
    { location: "Hotel Room", affinity: "LOW", note: "His successor Chick Stahl died in a hotel room. The franchise's darkest shadow." },
  ],

  momentum: {
    hot_triggers: [
      "Facing bunters — Collins threw out McGraw, Keeler, and the entire Baltimore Orioles in one afternoon. The better they bunt, the better he fields.",
      "World Series / October — won the first modern WS (1903), won the 1904 AL pennant. Rose to the occasion.",
      "Contract negotiations — when motivated by fair compensation, Collins played his best. The $5,500 season was his best.",
      "Building a team — recruited Cy Young, assembled the Americans' roster. Creation energized him.",
    ],
    cold_triggers: [
      "Management disputes — clashed with owner John I. Taylor in 1905. 'Reportedly quitting on the team during the season.'",
      "The 1906 vanishing — disappeared to Florida. Suspension. Replacement. The sudden withdrawal.",
      "Injuries — missed significant time in 1902 and other years. The body limited the talent.",
      "Late career decline — .271 in 1904, traded to Philadelphia in 1907. The decline was gradual but real.",
    ],
    pressure_response: "PROVEN WINNER. Collins won the first modern World Series in 1903, managing and playing third base. He won the 1904 AL pennant. He hit .250 in the WS — not spectacular but solid, and his defense was superb. He recruited Cy Young and built the roster that won. The vanishing act of 1906 shows he could crack under sustained pressure from management, but on the field, in October, he delivered. In ILB: reliable in games, unreliable in politics.",
  },

  action_card_seeds: [
    { title: "The Bunt Defense", type: "Game Action", text: "Your third baseman plays in on the edge of the grass. The opposing team's leadoff hitter bunts down the third base line. Your third baseman charges, bare-hands the ball, and throws underhand to first. Out. The next batter bunts. Out. The next. Out. The entire opposing bunt strategy is destroyed in one inning. -3 to all opposing bunt attempts for the rest of the game.", origin: "Collins vs. the 1895 Baltimore Orioles: 'McGraw bunted and I came in as fast as I dared, picked up the ball one-handed and threw it underhanded to first base. He was out. Keeler tried it, and I nailed him by a step. I had to throw out four bunters in a row before the Orioles quit bunting that afternoon.'" },
    { title: "The First World Series", type: "Game Action", text: "Your player-manager leads his team into the first-ever World Series. The old league sneers at the new league. Your team wins 5 games to 3. The World Series is now a tradition. +5 franchise legacy. +3 league legitimacy. The rivalry is settled on the field.", origin: "1903: Collins's Boston Americans defeated Barney Dreyfuss's Pittsburgh Pirates 5 games to 3 in the first modern World Series. Cy Young and Bill Dinneen pitched Boston to victory." },
    { title: "The Recruit", type: "Action", text: "Your player-manager personally recruits the greatest pitcher in the game from the rival league. The pitcher signs for more money and more freedom. Your rotation instantly becomes elite. +2 to staff ERA. This card requires a player-manager on the roster.", origin: "Collins recruited Cy Young from the National League to the American League's Boston Americans in 1901. Young would win 192 games for Boston." },
    { title: "I Would Not Go Back", type: "Drama", text: "Your star player accuses the old league's owners of conspiring to hold down salaries. He jumps to the rival league with a signing bonus, profit-sharing, and a manager's title. 'I would not go back now if they offered me the whole outfit.' Your team gains a franchise cornerstone. The old team loses its best defender.", origin: "Collins left the Boston Beaneaters for the Boston Americans in 1901, accusing NL owners of salary collusion. He signed for $5,500, a $3,500 bonus, and a cut of profits." },
    { title: "The Vanishing", type: "Drama", text: "Your player-manager fails to appear for a game. The team searches for days. He is finally found in another state, 'on vacation.' He is suspended and replaced as manager. The team finishes in last place. -3 team morale. -2 reliability. What drove him to disappear?", origin: "August 1906: Collins disappeared from the Red Sox without notice. Found days later in Florida. Suspended. Replaced by Chick Stahl, who would later commit suicide during spring training." },
    { title: "One Hit Shy", type: "Drama", text: "Your veteran retires with 1,999 career hits — one hit shy of 2,000. The round number that would have cemented his legacy forever remains just out of reach. +2 poignancy. The almost-milestone haunts.", origin: "Collins finished his 14-year career with exactly 1,999 hits. He never reached the 2,000 mark." },
    { title: "The King's Wake", type: "Drama", text: "A century after your player's death, a band writes a song about him. The song is played in bars and stadiums. The name lives on in music, not just statistics. +3 cultural legacy. The people remember.", origin: "Boston-based Celtic punk band Dropkick Murphys recorded 'Jimmy Collins' Wake' on their 2013 album Signed and Sealed in Blood." },
    { title: "The Successor's Tragedy", type: "Drama", text: "Your former manager's replacement, overwhelmed by the job and reportedly very ill, locks himself in a hotel room and drinks acid. He dies during spring training. The franchise is shattered. -5 team morale. The shadow extends beyond the game.", origin: "1907: Chick Stahl, who replaced Collins as Red Sox manager, committed suicide by drinking carbolic acid during spring training. Cy Young reluctantly took over. Four managers led the team that year." },
  ],

  art_direction: {
    face: "Compact, Irish-American, working-class Buffalo man. 5'9\" 178 lbs — stocky, strong, built for quick reactions. Sharp eyes, a business-minded jaw, the look of a man who remembers his salary but not his batting average. Clean-shaven or neat mustache. Alert, calculating, always reading the batter.",
    attire: "Boston Beaneaters uniform circa 1898 — white wool jersey with 'BOSTON' or 'B' insignia, baggy flannel pants, flat cap. Low defensive crouch at third base — positioned on the edge of the grass, glove-hand bare, ready to charge a bunt. Or: mid-play, ball just bare-handed off the grass, body twisted, throwing underhand to first. No number.",
    mood: "Sharp readiness. The instant before the bunt is laid down — Collins already knows it's coming, already positioned, already in motion before the bat touches the ball. The South End Grounds behind him (Boston 1890s), the crowd leaning in. This card should feel like the invention of a new way to play — the moment third base changed forever.",
    style: "Sepia-toned with slightly cooler, blue-collar undertones — Buffalo industrial, working-class Irish. Not as warm as Brown's Indiana earth or as refined as Reulbach's academia. This is city grit, railroad toughness, the card of a man who built something new. Dead-ball era photographic grain.",
    reference: "Think the bare-hand bunt play — charging in from the grass, scooping the ball with naked fingers, whipping underhand to first. The innovation frozen in time. Or: the player-manager in the dugout and on the field simultaneously — one hand on the lineup card, one bare hand on the baseball. The founder of a position.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }], note: "Pre-1957: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function JimmyCollinsCard() {
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR R", val: d.real_stats.career_runs },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR OPS+", val: d.real_stats.career_ops_plus },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 14 SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "1903 WS AVG", val: d.real_stats.ws_1903_avg },{ label: "1903 WS", val: "WON 5-3" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>FIRST MODERN WORLD SERIES — CHAMPION</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1st WS Champ (1903)", "👑 King of 3rd Basemen", "⭐ HOF 1945", "🛡️ 2nd All-Time 3B Putouts", "📜 Revolutionized 3B Defense", "🏅 1898 NL HR Leader", "🎵 Dropkick Murphys Song"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Collins's real life, become universal cards playable in any game.</p>
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
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Collins's Derivation">
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
    </div>
  );
}
