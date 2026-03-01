import { useState } from "react";

const PLAYER_DATA = {
  name: "Walker Cooper",
  nickname: "Big Coop",
  year: 1947,
  team: "New York Giants",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "C",
  bats: "R",
  throws: "R",
  height: '6\'3"',
  weight: "210 lbs",
  born: "January 8, 1915 — Atherton, MO",
  died: "April 11, 1991 — Scottsdale, AZ (age 76)",
  hof: "Not inducted. 8× All-Star. 2× WS Champion (1942, 1944). Best catcher of the 1940s.",

  real_stats: {
    season: 1947, games: 140, at_bats: 515, hits: 157, doubles: 20, triples: 8,
    home_runs: 35, rbi: 122, runs: 79, stolen_bases: 0, walks: 36, strikeouts: 48,
    batting_avg: ".305", obp: ".364", slg: ".532", ops: ".896", ops_plus: 140, war: 4.5,
    career_avg: ".285", career_hits: 1341, career_hr: 173, career_rbi: 812,
    career_slg: ".464", career_obp: ".332", career_war: 28.5,
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .305 BA → tier 4 (.300-.329). OPS+ 140 → +1 bonus (130+) = 5. CON = 5.
  // POW: 35 HR → tier 3 (30-39). SLG .532 → +1 bonus (.500+) = 4. POW = 4.
  //   (For a CATCHER: 35 HR in 1947 was astronomical.)
  // SPD: 0 SB. Catcher. No speed. SPD = 0.
  // DEF: Led NL C in range factor 3×, CS% 2×, assists 1×. .977 FLD%.
  //   Caught Bickford no-hitter. Handled Mort Cooper's MVP season.
  //   Pre-GG equivalent ~3 GG. DEF = 2.
  // CLU: WS: .300 in 16 games (1942-44). Drove in winning run Game 4 '42 WS.
  //   Picked off Gordon at 2B in Game 5 clincher.
  //   PS BA .300 → tier 2. WS hero moment (Game 5 pickoff) → +1 = 3. CLU = 3.
  // OVR: Best C of 1940s. 8× All-Star. 2× WS champ. .285 career.
  //   But not HOF, career WAR 28.5 limits. OVR = 8 (All-Star).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — best catcher of the 1940s. 8× All-Star, 2 WS rings. Not HOF limits OVR.
    con: 5,      // .305 BA → tier 4. OPS+ 140 → +1 = 5. Elite hitting catcher.
    pow: 4,      // 35 HR → tier 3. SLG .532 → +1 = 4. Astronomical power for a catcher in 1947.
    spd: 0,      // 0 SB. 6'3" 210 lb catcher. No speed.
    def: 2,      // Led NL C in range factor 3×, CS% 2×. Caught no-hitter. Handled brother's MVP. DEF = 2.
    clu: 3,      // WS: .300 in 16 games. Winning RBI Game 4 '42. Pickoff in Game 5 clincher. MAXIMUM CLUTCH.
  },

  stat_justification: {
    con: "Cooper batted .305 in 1947 — extraordinary for a catcher in any era. He hit .318 in 1943 (runner-up MVP to Musial). Career .285 is higher than HOF catchers Bench, Campanella, Carter, Fisk, and Ferrell. OPS+ 140 in 1947 easily clears the bonus. He was 'one of the sport's strongest players in his prime' — the bat speed came from raw physical power. Rating of 5.",
    pow: "35 HR in 1947 — his previous career high had been 13. This was one of the best offensive catcher seasons in history. He also homered in 6 consecutive games, tying George Kelly's 1924 record. 173 career HR. SLG .532 earns the bonus. For a catcher, this power was unheard of in the 1940s. Rating of 4.",
    spd: "0 SB in 1947. Cooper was 6'3\" 210 lbs — a massive catcher by 1940s standards. He had 8 triples in 1947 (surprising for his size) but no stolen base threat. Rating of 0.",
    def: "Led NL catchers in range factor 3 times, caught stealing percentage twice, assists once. .977 career fielding percentage. Caught Lon Warneke's 1941 no-hitter and Vern Bickford's 1950 no-hitter. Handled brother Mort Cooper's MVP season (1942: 22-7, 1.78 ERA). The brother battery was one of the most famous in baseball. Pre-GG equivalent: ~3 GG. Rating of 2.",
    clu: "World Series: .300 BA in 16 games across 3 Fall Classics (1942-44). In the 1942 WS clincher (Game 5), Cooper picked off Joe Gordon at second base with the tying run on, preserving the championship. He drove in the winning run in Game 4. In the 1943 WS, brother Mort pitched a complete game in Game 5 — their father's funeral was that day — and Walker caught the final pop fly off Gordon's bat. In 1944, he hit .318 as the Cardinals won again. PS BA .300 → tier 2. WS hero moments → +1 = 3. Maximum clutch.",
  },

  personality: {
    leadership_style: "Team captain through force of personality. Cooper was named Giants captain — a role he took seriously despite being baseball's most notorious prankster. He managed pitching staffs, called games with intelligence, and was the physical anchor behind the plate. His leadership was paradoxical: serious competitor on the field, absolute clown in the clubhouse.",
    temperament: "The Prankster King. Cooper was legendary for practical jokes: tying teammates' undershirts into 25 knots, nailing shoes to the floor with spikes, giving hotfoots to Manager Mel Ott, putting lit cigars in Ott's hip pocket, snipping the lining from his manager's pants pocket, and sitting in hotel lobbies setting his own newspaper on fire. He was also 'irascible' toward opponents — intimidating runners, berating umpires, and protecting his pitchers with a ferocity that earned deep respect.",
    work_ethic: "Built through hardship. Cooper spent years in the Cardinals' loaded farm system before breaking through at age 25. He then played through a broken collarbone, fractured fingers, serious leg infections, and a broken hand — always returning. His 1947 breakout (35 HR after never hitting more than 13) showed he was still developing power at age 32. The man never stopped improving.",
    lifestyle: "Missouri farm boy. Cooper grew up in Atherton, Missouri — small-town America. His brother Mort was his batterymate, his rival, and his closest friend. The Cooper brothers asked for a $15,000 raise together and were punished for it — Walker was sold while serving in the Navy. After baseball: minor league manager, then coaching. His daughter married his Cardinals teammate Don Blasingame. He quipped: 'You know you're getting too old when your daughter marries one of your teammates.'",
    era_adaptability: "HIGH. A catcher who hits .305 with 35 HR translates to any era. Cooper's power-hitting catcher profile is exactly what modern teams crave. His defensive metrics (range factor, CS%) would translate well. His personality — the pranks, the intensity, the leadership — would make him a fan favorite and clubhouse catalyst. He'd be Mike Piazza with better defense.",
    clubhouse_impact: "THE LIFE OF THE CLUBHOUSE. Cooper's pranks are legendary — he was the heartbeat of every team he played for. But beneath the humor was genuine competitive fire and deep loyalty. He and Mort played in Game 5 of the 1943 WS on the day of their father's funeral. That's not a prankster — that's a warrior. In ILB terms: Cooper is +2 clubhouse morale (laughs and pranks), +1 competitive intensity (protecting pitchers, throwing out runners).",
    dark_side: "Sold while serving. Cooper and brother Mort asked for modest raises before the 1945 season. Cardinals owner Sam Breadon punished them: Walker was sold to the Giants for $175,000 (record cash deal) while serving in the Navy. He never forgave the Cardinals. Also: Cooper is NOT in the Hall of Fame, despite career stats that exceed multiple HOF catchers. His career was fragmented across 7 teams, and writers undervalued catchers. He's one of the most glaring Hall of Fame omissions at the position.",
  },

  chemistry_traits: [
    { tag: "Big Coop", desc: "6'3\" 210 — one of the strongest men in baseball. Physical intimidation factor. +1 to pitcher confidence: batters don't crowd the plate." },
    { tag: "Brother Battery", desc: "Mort Cooper (pitcher) and Walker Cooper (catcher) — the most famous sibling battery. When paired with a sibling or family connection, +2 team synergy." },
    { tag: "The Prankster King", desc: "25-knot undershirts, nailed shoes, lit newspapers, hotfoots for the manager. +2 clubhouse morale. 10% chance of backfiring: -1 if prank goes wrong." },
    { tag: "Funeral Day Warriors", desc: "Played WS Game 5 on the day of their father's funeral. Mort pitched CG; Walker caught the final out. +2 CLU under extreme emotional pressure." },
    { tag: "Six Consecutive HRs", desc: "Homered in 6 straight games in 1947 (tied record). When Cooper hits HR in back-to-back games, 40% chance of extending the streak." },
    { tag: "Sold While Serving", desc: "Sold by the Cardinals for $175,000 while in the Navy — punishment for asking for a raise. -1 loyalty to front office. +1 'I'll show you' motivation." },
    { tag: "10-RBI Game", desc: "6-for-7 with 3 HR and 10 RBI in a single game. Only catcher ever. When Cooper has 5+ RBI, chance of historic game." },
    { tag: "No-Hitter Catcher", desc: "Caught two no-hitters (Warneke 1941, Bickford 1950). +1 to any pitcher's STF when Cooper is behind the plate in a shutout." },
  ],

  preferred_locations: [
    { location: "Behind the Plate", affinity: "HIGH", note: "Led NL C in range factor 3×. Caught 2 no-hitters. Best catcher of the 1940s." },
    { location: "Batter's Box", affinity: "HIGH", note: ".305 / 35 HR / 122 RBI in 1947. Elite hitting catcher." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The Prankster King. Knotted shirts, nailed shoes, lit newspapers. Center of team spirit." },
    { location: "Sportsman's Park (Cardinals)", affinity: "HIGH", note: "2 WS rings. Brother battery. Hometown hero until sold." },
    { location: "Polo Grounds (Giants)", affinity: "HIGH", note: "35 HR in 1947. Power breakout in New York." },
    { location: "Manager's Office", affinity: "LOW", note: "Put lit cigars in Mel Ott's pocket. Snipped his pants lining. Managers loved him and feared him." },
    { location: "Front Office / Contract Negotiations", affinity: "NONE", note: "Asked for a raise, got sold while in the Navy. Trust issues with ownership." },
  ],

  momentum: {
    hot_triggers: [
      "Multi-HR games — 6 consecutive HR games in 1947. Cooper's power comes in streaks",
      "Protecting pitchers — when a hitter charges or threatens, Cooper's competitive fire ignites",
      "Clubhouse morale high — when the team is loose and laughing, Cooper plays his best",
      "Brother on the mound — with Mort pitching, Walker's DEF and CLU both rise",
    ],
    cold_triggers: [
      "Hand/finger injuries — foul tips fractured his fingers multiple times. Catcher's occupational hazard",
      "Front office conflict — being sold while serving haunted him. Management disputes kill motivation",
      "Late-career decline — after 1947, Cooper bounced through 5 teams in 10 years",
    ],
    pressure_response: "MAXIMUM OCTOBER PERFORMER. Cooper's .300 WS average across 3 Fall Classics is exceptional for a catcher. He delivered the winning RBI in 1942 Game 4, the pickoff that saved Game 5, and caught the final out on the day of his father's funeral. His 1944 WS .318 confirmed the pattern: Cooper elevated when everything was on the line. In ILB terms: CLU 3 is maximum for a reason. Cooper is the roster's most clutch position player.",
  },

  action_card_seeds: [
    {
      title: "The Funeral Day Game",
      type: "Drama",
      text: "Your catcher's father died this morning. The World Series game is tonight. He and his brother — the pitcher — choose not to leave. The brother throws a complete game. The catcher records the final out. They embrace on the mound. They win the game and weep together in the clubhouse.",
      origin: "1943 World Series, Game 5. Mort and Walker Cooper's father died that morning. They played anyway. Mort pitched a CG; Walker caught the final pop fly off Joe Gordon. The Cardinals won.",
    },
    {
      title: "The Pickoff That Won the Championship",
      type: "Game Action",
      text: "Bottom of the ninth, World Series clincher. The tying run reaches second base on an error. Your catcher fires to second and picks him off. The next two batters are retired. Championship won. The catcher saved it with his arm, not his bat.",
      origin: "1942 World Series, Game 5. Joe Gordon singled, then Dickey reached on an error. Cooper picked Gordon off second. The Cardinals retired the next two batters to win the title.",
    },
    {
      title: "The 25-Knot Undershirt",
      type: "Action",
      text: "Your catcher sneaks into a teammate's locker before the game. He ties the man's undershirt into 25 individual knots. The teammate spends 20 minutes untying it. The whole clubhouse is in hysterics. The catcher is already nailing someone else's shoes to the floor.",
      origin: "Cooper was legendary for tying teammates' undershirts into up to 25 knots. He also nailed shoes to the floor with spikes, gave hotfoots, and once set his own newspaper on fire in a hotel lobby.",
    },
    {
      title: "Sold While Serving",
      type: "Drama",
      text: "Your catcher and his brother ask for modest raises — $15,000 each. The owner is furious. While the catcher serves in the Navy defending his country, the owner sells him for $175,000 — the highest cash-only deal in baseball history. The catcher returns from war to find himself on a new team.",
      origin: "1945. Cooper and Mort asked Breadon for raises. Breadon sold Walker to the Giants for $175,000 while Walker was serving in the Navy. It was the highest cash-only deal in baseball history.",
    },
    {
      title: "The Ten-RBI Game",
      type: "Game Action",
      text: "Your catcher goes 6-for-7. Three home runs. Two doubles. A single. Ten runs batted in. No catcher has ever done this before. No catcher has done it since. It's the rarest single-game performance in baseball history for a backstop.",
      origin: "July 6, 1949. Cooper went 6-for-7 with 3 HR, 2 2B, 1 1B, 15 total bases, and 10 RBI for the Reds vs. the Cubs. He remains the only catcher in MLB history with 10+ RBI in a single game.",
    },
    {
      title: "From 13 to 35",
      type: "Action",
      text: "Your catcher's career high in home runs is 13. Doubters say he's past his prime at 32. He hits 35 home runs the next year — nearly tripling his previous best. He also homers in six consecutive games. The doubters shut up.",
      origin: "Cooper's career HR high before 1947 was 13. In 1947, he hit 35 HR with 122 RBI — one of the best offensive catcher seasons in history. He also homered in 6 consecutive games.",
    },
    {
      title: "Hotfoot for the Manager",
      type: "Action",
      text: "Your catcher gives the MANAGER a hotfoot during a game. Then puts a lit cigar in his hip pocket. Then snips the lining from his pants pocket so his lineup card falls through to the ground at home plate. The manager can't stop laughing. Neither can the team.",
      origin: "Cooper tormented Giants manager Mel Ott with hotfoots, lit cigars in his pocket, and snipped his pocket lining. Ott took it all in good humor — and Cooper kept the team loose.",
    },
    {
      title: "Your Daughter Married Your Teammate",
      type: "Drama",
      text: "Your aging catcher's daughter marries one of his teammates. At the wedding reception, the catcher announces to the crowd: 'You know you're getting too old when your daughter marries one of your teammates.' The room erupts. The catcher tips his hat.",
      origin: "Cooper's daughter Sara (Miss Missouri 1957) married Cardinals 2B Don Blasingame. Cooper's quote became one of baseball's most beloved one-liners.",
    },
  ],

  art_direction: {
    face: "6'3\" 210 lbs — massive for a 1940s catcher. Broad shoulders, powerful build, the strongest man on the field. Missouri farm-bred strength. A face that shifts between mischievous grin (the prankster) and fierce competitive glare (the warrior). The duality is the card.",
    attire: "New York Giants home whites, 1947 style. Catcher's gear partially visible — chest protector, shin guards. Or: in batting stance, right-handed swing, the power that produced 35 HR. Number visible.",
    mood: "Dual nature. One half: the prankster laughing in the clubhouse, joy and chaos. Other half: the warrior behind the plate, picking off a runner in the World Series, catching the final out on the day his father died. The card should convey both — the man who tied 25 knots in your undershirt and also won championships.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. The Polo Grounds — where Cooper had his 35-HR breakout. Or Sportsman's Park — where the brother battery won championships. The card should feel like controlled chaos: power, pranks, and October heroics.",
    reference: "Think of the complete catcher: power bat, strong arm, game intelligence, clubhouse personality, and October steel. Cooper was Mike Piazza's offense with Yadier Molina's defense and Bill Murray's personality. The card should convey a man who was always the most interesting person in any room — and the most dangerous behind the plate.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "No PS", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function WalkerCooperCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, catcher's gear, Giants uniform, Polo Grounds]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1947 — 35 HR / 122 RBI — BEST CATCHER SEASON OF ERA</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR SLG", val: d.real_stats.career_slg },{ label: "WS BA", val: ".300" },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 18 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 8× All-Star", "🏆 2× WS Champion", "🔥 35 HR (Catcher!)", "🎯 .300 WS BA", "🐱 Brother Battery", "💣 10-RBI Game", "🎭 Prankster King", "🎖️ Navy Veteran"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Cooper's real life, universalized for any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Hitter Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Cooper's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "All-Star", stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
