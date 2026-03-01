import { useState } from "react";

const CHANCE_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: FRANK CHANCE
  // Year Snapshot: 1906 (116-Win Season — The Peerless Leader)
  // ═══════════════════════════════════════════════════════════════

  name: "Frank Chance",
  nickname: "The Peerless Leader",
  year: 1906,
  team: "Chicago Cubs",
  era: "1900s",
  ilb_team: "Banners",
  position: "1B",
  bats: "R",
  throws: "R",
  height: "6'0\"",
  weight: "190 lbs",
  born: "September 9, 1877 — Salida, CA (raised Fresno)",
  died: "September 15, 1924 — Los Angeles, CA (age 47)",
  hof: "Class of 1946 (Veterans Committee) — Inducted alongside Tinker and Evers.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1906 SEASON
  // Source: Baseball-Reference, SABR BioProject, Wikipedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1906,
    games: 136,
    at_bats: 474,
    hits: 151,
    doubles: 24,
    triples: 10,
    home_runs: 3,
    rbi: 71,
    runs: 103,
    stolen_bases: 57,
    batting_avg: ".319",
    obp: ".419",
    slg: ".430",
    ops: ".849",
    ops_plus: 163,
    war: 7.4,
    career_avg: ".296",
    career_hits: 1274,
    career_hr: 20,
    career_sb: 401,
    career_war: 47.7,
    career_obp: ".394",
    career_ops_plus: 135,
    ws_career_avg: ".300",
    ws_1908_avg: ".421",
    manager_record: "946-648 (.593)",
    cubs_manager_pct: ".664",
    team_1906_record: "116-36",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // ═══════════════════════════════════════════════════════════════
  ilb_stats: {
    ovr: 9,      // Elite/MVP — player-manager of greatest single-season team ever, HOF, dynasty architect
    con: 5,      // .319 BA (.300-.329 = 4) + OPS+ 163 (≥130 = +1) → 5 (cap)
    pow: 1,      // 3 HR (0-9 = 0) + SLG .430 (under .500, no bonus) → 0. But: 10 triples, .430 SLG in dead-ball, line-drive power = bump to 1
    spd: 3,      // 57 SB led NL (31-50+ = 3). Cubs' all-time SB leader with 401. 67 SB in 1903. Maximum speed for the system.
    def: 1,      // Pre-GG era. Not widely regarded as elite fielder — "not widely regarded as one of the game's greatest fielders" per SABR. Solid but not transformative at 1B. Rating: 1.
    clu: 3,      // .300 career WS BA (.300+ = 2). .421 in 1908 WS = WS hero moment (+1). 10 SB in 20 WS games. Maximum clutch.
  },

  stat_justification: {
    con: ".319 BA in 1906 (.300-.329 = 4). OPS+ 163 (≥130 bonus = +1). Cap 5 reached. Led NL in OBP in 1905 (.450). John McGraw put him on his all-time NL team. Career 135 OPS+ across the dead-ball era. Elite contact hitter who crowded the plate fearlessly.",
    pow: "3 HR in 1906 (0-9 = 0). SLG .430 (under .500, no bonus). But: 10 triples, 24 doubles, and a dead-ball era SLG of .430 suggests gap power beyond the zero floor. Bumped to 1 for line-drive power and extra-base hit production. Still very low — this was not a power hitter.",
    spd: "57 SB led NL in 1906 (31-50+ = 3). 67 SB led NL in 1903. Cubs' all-time career SB leader with 401. For a 6'0\" 190-lb first baseman, his speed was extraordinary. Stole home from second base in one play. Maximum speed rating.",
    def: "Pre-Gold Glove era. SABR: 'not widely regarded as one of the game's greatest fielders.' .983 fielding pct, 470 career double plays. Solid fundamentals at first base but not a defensive wizard. His value was bat + speed + leadership + managing, not glove. Rating: 1.",
    clu: ".300 career WS BA (.300+ = 2). .421 in 1908 WS, reaching base in half his plate appearances (+1 WS hero moment). 10 SB in 20 WS games. The man who managed 116 wins and two championships. Maximum clutch.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Absolute authority. 'You do things my way or you meet me after the game.' Fined players for shaking hands with opponents. Forced Solly Hofman to postpone his wedding lest marriage impair his play. Suspended Tinker for profanity, reinstated him two days later when he needed him. This was not a democracy — it was a dynasty built on fear, respect, and 116 wins.",
    temperament: "Controlled fury backed by physical dominance. At 6'0\" 190 lbs, he was the biggest man on most fields. Offseason prizefighter — Jim Corbett and John L. Sullivan called him 'the greatest amateur brawler of all time.' Incited a riot at the Polo Grounds by assaulting pitcher Joe McGinnity. Threw beer bottles at Brooklyn fans. First player ever ejected from a World Series game (1910).",
    work_ethic: "Maniacal preparation married to physical toughness. Crowded the plate knowing he'd get beaned — hit by pitch 36 times, including 5 times in one doubleheader. Played through broken fingers as a catcher, broken shoulder in 1909, and blood clots in his brain. Never stopped working until his body literally couldn't function.",
    lifestyle: "California gentleman rancher meets dead-ball enforcer. Owned a ranch in Glendora, CA. Built a building in downtown Glendora (still standing). Father was a bank president — Frank traded dentistry school for baseball. Preached moderation and sobriety to his players. Married Edythe Pancake (yes, Pancake) in 1903; she became an advocate for women attending baseball games.",
    era_adaptability: "VERY HIGH. Chance was the prototype player-manager — the first modern field general. His .664 winning percentage as Cubs manager has never been matched. He'd be a manager in any era, but in his own era, he was also one of the best hitters and fastest baserunners at his position.",
    clubhouse_impact: "DOMINANT. His players 'never disputed his authority and admired his leadership by example.' Three Finger Brown admired his 'stout heart.' Evers called him 'the greatest first baseman of all time.' Tinker said 'Husk was always square and smart.' But the authority came with an iron fist — this was a man who would fight you if you disobeyed.",
    dark_side: "The beanings killed him. Hit by pitch 36 times, multiple head shots. Lost hearing in one ear entirely, partial loss in the other. Developed blood clots in his brain. Had brain surgery in 1912 while Cubs owner Murphy fired him from his hospital bed. The surgeries gave him an 'annoyingly whiny tone' from the hearing loss. Died at 47 — heart disease brought on by bronchial asthma, some say related to the cumulative head trauma. Named White Sox manager in 1924 but was too sick to ever take the field. Dead within months.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Peerless Leader", desc: "Player-manager aura. All teammates gain +1 discipline. Team cannot lose more than 3 games in a row while Chance is healthy." },
    { tag: "The Brawler", desc: "Offseason prizefighter. In any on-field fight, Chance wins automatically. Opponents lose 1 morale after any altercation." },
    { tag: "Plate Crowder", desc: "Fearlessly crowds the plate. +1 CON from intimidating pitchers, but 15% chance of being hit by pitch each game. Cumulative HBP leads to injury risk." },
    { tag: "Iron Discipline", desc: "Fines teammates for fraternizing with opponents. Team morale is rigid: +2 in winning streaks, -2 in losing streaks. No middle ground." },
    { tag: "California Gentleman", desc: "Rancher's calm off the field. After a loss, Chance recovers 1 morale faster than other players." },
    { tag: "Dynasty Architect", desc: "As manager, Chance's team gains +1 to all stats in September. Pennant races are his domain." },
    { tag: "Stolen Thunder", desc: "Fastest first baseman alive. Can attempt to steal any base, including home, with a 70% success rate." },
    { tag: "Brain Damage", desc: "Cumulative head trauma. After 100 career games, Chance's stats begin declining by 1 per season. The clock is always ticking." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Dugout / Manager's Office", affinity: "HIGH", note: "His cathedral. From here he built 116 wins and two championships. The tactical nerve center." },
    { location: "Practice Field", affinity: "HIGH", note: "Drilled his team relentlessly. Practice was non-negotiable. Errors in practice meant fines in games." },
    { location: "Boxing Ring / Gym", affinity: "HIGH", note: "Offseason prizefighter. The ring was where the Peerless Leader became the Peerless Brawler." },
    { location: "Ranch / Outdoors", affinity: "HIGH", note: "Owned a ranch in Glendora, CA. The California gentleman at rest." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Needed rest — the beanings took their toll. But his mind never stopped strategizing." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Preached moderation and sobriety. If his players drank, he'd fine them. Led by austere example." },
    { location: "Media / Spotlight", affinity: "MEDIUM", note: "Comfortable with the press. Gave memorable quotes. But preferred action to interviews." },
    { location: "Owner's Box", affinity: "LOW", note: "Owned 10% of the Cubs, but feuded with Murphy viciously. Fired from his hospital bed. Hated management politics." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races and October baseball — .300 WS BA, .421 in 1908, 10 WS stolen bases",
      "Physical confrontation — fights, beanings, and brawls energized him rather than intimidated him",
      "Team success under his authority — the more control he had, the better the team performed",
      "New challenges — succeeded at catcher, outfield, first base, and manager whenever promoted",
    ],
    cold_triggers: [
      "Cumulative head trauma — each beaning degraded his long-term capacity, the body failing the will",
      "Ownership meddling — Murphy firing him from his hospital bed, releasing good players to save money",
      "Physical breakdown — broken shoulder 1909, fractured ankle 1911, brain surgery 1912",
      "Losing control — when he couldn't manage (Yankees' bad roster, Red Sox late career), he withered",
    ],
    pressure_response: "THE ULTIMATE CLUTCH LEADER. Frank Chance did not merely perform under pressure — he manufactured winning conditions through sheer force of personality. .300 in the World Series. .421 in 1908. Stole home from second base to break a tie game. Managed the greatest single-season team in baseball history (116-36). Four 100-win seasons in five years. First player ejected from a World Series because he cared too much. But the pressure was also killing him — literally. Each beaning brought him closer to the blood clots, the hearing loss, the brain surgery, and death at 47. The Peerless Leader's greatness and his destruction came from the same source: he refused to back down from anything.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The 116-Win Season",
      type: "Action",
      text: "Your player-manager demands perfection. For the rest of the season, your team gains +1 to all stats — but any player who commits an error is fined (loses 1 morale). If your team finishes with the best record, all players gain permanent +1 discipline.",
      origin: "The 1906 Cubs went 116-36, the best record in baseball history at the time. Chance managed and played first base, hitting .319 with 57 SB. The record stood alone for 95 years until the 2001 Mariners tied it in a longer season.",
    },
    {
      title: "The Greatest Amateur Brawler",
      type: "Game Action",
      text: "Your player starts a fight on the field. He wins automatically — Jim Corbett and John L. Sullivan said so. The opposing team loses 2 morale. Your team gains 1 intensity. But there's a 30% chance of ejection.",
      origin: "Chance was an offseason prizefighter. Boxing legends Corbett and Sullivan called him 'the greatest amateur brawler of all time.' He once assaulted Joe McGinnity on the Polo Grounds and incited a full riot.",
    },
    {
      title: "Baseball's Most Expensive Base",
      type: "Game Action",
      text: "Your first baseman steals second, then steals home on the very next pitch to break a tie game. If successful (75% chance), your team owner grants the player partial ownership of the franchise.",
      origin: "Chance stole second, then immediately stole home against the Reds to break a tie. Owner Murphy was so grateful he gave Chance a 10% ownership stake in the Cubs. Chance later sold it for $150,000.",
    },
    {
      title: "You Do Things My Way",
      type: "Drama",
      text: "Your manager institutes iron discipline. All players gain +1 to all stats, but any act of insubordination (arguing, fraternizing, missing curfew) results in immediate suspension. If a player's wedding is scheduled mid-season, it must be postponed.",
      origin: "Chance fined players for shaking hands with opponents, suspended Tinker for profanity, and forced outfielder Solly Hofman to delay his wedding until after the season.",
    },
    {
      title: "Five Beanings in a Day",
      type: "Drama",
      text: "Your plate-crowding hitter is hit by pitch 5 times in a doubleheader. He stays in the game each time. +3 CON for the rest of the week from adrenaline and fury. But add 1 to his cumulative head trauma counter. At 5 accumulated, he begins losing stats permanently.",
      origin: "On May 30, 1904, Chance was hit by pitch five times in a doubleheader, sustaining a black eye and badly bruised forehead. The cumulative beanings eventually caused blood clots in his brain and killed him at 47.",
    },
    {
      title: "Fired from the Hospital Bed",
      type: "Drama",
      text: "Your player-manager is recovering from surgery when the team owner fires him during a bedside argument. The manager loses the team — but gains free agency and can sign anywhere for maximum salary.",
      origin: "In 1912, Chance was hospitalized for brain surgery to correct blood clots from beanings. Cubs owner Murphy fired him during a heated hospital-room argument over Murphy's cost-cutting. Chance recovered and signed with the Yankees.",
    },
    {
      title: "Tinker to Evers to Chance",
      type: "Game Action",
      text: "Your SS, 2B, and 1B execute a flawless double play. The opposing team's momentum resets to zero. Your infield gains +1 DEF for the rest of the game.",
      origin: "The most famous double-play combination in baseball history, immortalized in Franklin P. Adams' 1910 poem 'Baseball's Sad Lexicon.' Tinker, Evers, and Chance were inducted into the HOF together in 1946.",
    },
    {
      title: "The Peerless Leader Falls",
      type: "Drama",
      text: "Your greatest manager is named to lead a new team but is too sick to take the field. He never manages a single game. The team plays the entire season without him, haunted by what might have been.",
      origin: "Chance was named White Sox manager for 1924 but was too ill to ever take charge. He died in September 1924 at age 47. Evers served as acting manager in his absence.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Big, imposing, gray-eyed Californian. 6'0\" 190 lbs of coiled authority — the biggest man in the infield. Strong jaw, direct gaze, no-nonsense expression. Called a 'gray-eyed man of destiny.' Not handsome so much as commanding. The face of a man who prizefights in the offseason and manages baseball dynasties in-season.",
    attire: "Chicago Cubs uniform circa 1906 — white wool jersey with 'CHICAGO' across the chest in dark block letters, baggy flannel pants, flat cap, dark stockings. First baseman's mitt in hand or bat on shoulder. No number. The jersey tight across broad shoulders.",
    mood: "Command presence. Standing in the dugout doorway surveying his empire — or at the plate, crowding it fearlessly, daring the pitcher to throw inside. The look of a man who has already decided he will win and is merely going through the formalities.",
    style: "Sepia-toned with warm golden highlights. West Side Park grandstand in soft focus, the 1906 pennant flags visible. Dead-ball era photographic grain. Unified ILB portrait style. Warmer and more golden than the Evers card — Chance is California sunshine turned to iron.",
    reference: "Think the dugout general — arms crossed, jaw set, the Peerless Leader watching his 116-win machine operate. Or: mid-stride rounding third, stealing home, the fastest first baseman anyone has ever seen. Cabinet card composition, authoritative frame, dominance radiating.",
  },
};

// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ], note: "Pre-1957 players: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function FrankChanceCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = CHANCE_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — {d.ilb_team} • {d.era}</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, commanding 6'0" frame, Cubs jersey, gray-eyed authority, dugout general]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "RUNS", val: d.real_stats.runs }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES — TEAM: {d.real_stats.team_1906_record}</div>
            <div style={{ textAlign: "center", marginTop: 8, padding: "4px 12px", background: `${C.warmRed}15`, border: `1px solid ${C.warmRed}40`, borderRadius: 4, fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700, letterSpacing: 1 }}>
              👊 PLAYER-MANAGER — 116 WINS — "GREATEST AMATEUR BRAWLER OF ALL TIME"
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1946", "🏆 2× WS Champ", "🏅 4× NL Pennant", "🏅 4× 100-Win Season", "⭐ Led NL in SB (2×)", "⭐ Led NL in Runs", "📖 Mgr: 946-648 (.593)"].map((a, i) => (
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
              {tab === "personality" && (<>{["leadership_style", "temperament", "work_ethic", "lifestyle", "era_adaptability", "clubhouse_impact"].map(k => (<Section key={k} title={k === "leadership_style" ? "Leadership" : k === "work_ethic" ? "Work Ethic" : k === "era_adaptability" ? "Era Adaptability" : k === "clubhouse_impact" ? "Clubhouse Impact" : k.charAt(0).toUpperCase() + k.slice(1)}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Chance's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Chance's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB • {d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
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
