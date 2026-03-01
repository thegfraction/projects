import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}burkett-jesse.png`;

const PLAYER_DATA = {
  name: "Jesse Burkett",
  nickname: "The Crab",
  year: 1896,
  team: "Cleveland Spiders",
  era: "1890s",
  ilb_team: "Banners NL1890",
  position: "LF",
  bats: "L",
  throws: "L",
  height: '5\'8"',
  weight: "155 lbs",
  born: "December 4, 1868 — Wheeling, WV",
  died: "May 27, 1953 — Worcester, MA (age 84)",
  hof: "Inducted 1946 (Veterans Committee). 3× NL Batting Champion. Only Cobb and Hornsby also hit .400 three times.",

  real_stats: {
    season: 1896, games: 133, at_bats: 586, hits: 240, doubles: 27, triples: 16,
    home_runs: 6, rbi: 72, stolen_bases: 32, batting_avg: ".410", obp: ".461",
    slg: ".545", ops: "1.006", ops_plus: 171, war: 7.6, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".338", career_hits: 2850,
    career_hr: 75, career_sb: 389, career_war: 55.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // POSITION PLAYER STAT ENGINE
  // CON: .410 BA → tier 5 (.330+). OPS+ 171 → +1 bonus = 6, capped at 5. CON = 5.
  // POW: 6 HR → tier 0 (0-9). SLG .545 → +1 bonus = 1. POW = 1.
  //   Burkett hit 55 career inside-the-park HR (all-time record) and 182 triples.
  //   But his power was leg-speed, not bat strength. Only 75 career HR. Mostly singles.
  // SPD: 32 SB in 1896. Career 389. 55 inside-the-park HR. SPD = 2.
  // DEF: Led NL outfielders in errors multiple times. 4th most OF errors ever. -1 penalty.
  //   Weak arm. "Awkward as a bovine in a china shop." Rating 0.
  // CLU: Won 1895 Temple Cup with Spiders (beat Orioles 4-1). Rating 1.
  // OVR: CON(5)×2 + POW(1)×1.5 + SPD(2)×1 + DEF(0)×0.5 = 10+1.5+2+0 = 13.5 → normalized ≈ 9 (Elite)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    con: 5,      // .410 in 1896. .405 in 1895. .396 in 1899. 3× batting champion. Career .338. 2,850 hits. The greatest bunter in history plus elite foul ball ability (the foul strike rule was partly inspired by Burkett). Maximum 5.
    pow: 1,      // 6 HR in 1896. 75 career. 55 inside-the-park HR (all-time record). But ~80% of his hits were singles. He was a finesse hitter, not a slugger. SLG bonus pushes to 1.
    spd: 2,      // 32 SB in 1896. 389 career. 55 inside-the-park HR. 182 career triples. Burkett was genuinely fast — the inside-the-park HR record proves it. Rating 2.
    def: 0,      // Led NL outfielders in errors multiple times. 4th-most OF errors in history. Weak arm. "Awkward as a bovine in a china shop." Rating 0.
    clu: 1,      // Won 1895 Temple Cup (Spiders beat Orioles 4-1). Hit well in the series. But lost 1896 Temple Cup (swept by Orioles). Rating 1.
  },

  stat_justification: {
    con: ".410 BA in 1896 — 240 hits (ML record for 15 years until Cobb). Led NL in BA (.405 and .410 in back-to-back years). .396 in 1899 (revised down from .402). 3× NL batting champion (1895, 1896, 1901). Career .338 BA, 2,850 hits. Only Cobb, Hornsby, and Burkett hit .400 three times. Frank Shaughnessy called him 'the greatest bunter in baseball history.' His foul-ball ability was so extreme it partly inspired the foul-strike rule. Maximum 5.",
    pow: "6 HR in 1896. 75 career HR. 55 inside-the-park HR (all-time MLB record). But this is speed-based power, not bat power. ~80% of his 2,850 hits were singles. He was 5'8\" 155 lbs — a line-drive singles hitter. One writer mused what he'd have done with 'that rabbit ball Ruth used.' The .545 SLG earns a bonus, pushing to 1.",
    spd: "32 SB in 1896, 47 in 1895, 389 career. 55 inside-the-park HR — the all-time record. 182 career triples. Burkett was fast and aggressive on the bases. Rating 2.",
    def: "Led NL outfielders in errors 3 times. Has the 4th-most career errors by an outfielder in MLB history. Weak throwing arm. One observer called his fielding 'as awkward as the bovine in a china shop.' He improved with coaching from Jimmy McAleer but was never better than below-average. Rating 0.",
    clu: "Won the 1895 Temple Cup — Spiders beat the mighty Baltimore Orioles 4 games to 1. Burkett contributed as a hitter in the series. But the 1896 Temple Cup was a sweep loss to Baltimore, and Burkett committed a poor throw that allowed a run. Mixed postseason record. Rating 1.",
  },

  personality: {
    leadership_style: "The Agitator. Burkett didn't lead through inspiration or example — he led through combativeness. He argued with umpires, insulted opponents, berated rookies, and fought with sportswriters. His leadership philosophy: 'You've got to be a battler. If you don't, they'll walk all over you. Once the bell rang, I had no friends on the other team.' He made everyone around him either furious or competitive.",
    temperament: "Surly, combative, sharp-tongued. The nickname 'Crab' says everything. Burkett was the meanest player on the Cleveland Spiders — and the Spiders were the meanest team in baseball. He was ejected from both games of a doubleheader (the first player to do this). He threw a baseball at heckling fans. He told an umpire his identity was 'none of your blankety blank business' — the umpire announced 'Burkett batting for exercise,' and Burkett struck out to the crowd's delight. He was considered unpopular with teammates. And yet: off the field, he was different. He married a Worcester girl, settled there for life, and became a respected community figure.",
    work_ethic: "RELENTLESS AND OBSESSIVE. Burkett began as a pitcher (39-6 record in minor leagues) but couldn't cut it in the majors (3-10, 5.57 ERA). So he reinvented himself as an outfielder and became one of the greatest hitters in history. He honed his bunting until he could place the ball anywhere on the field. He practiced fouling off pitches until the rule was changed because of him. He played professionally until age 47. That's not talent — that's rage converted into work.",
    lifestyle: "Born in Wheeling, WV — a baseball-crazed town. Father was a laborer for the Wheeling and Belmont Bridge Company. Married in Worcester, MA, and lived there for the rest of his life (64 years). After his ML career, he owned and managed the Worcester Busters in the New England League (1906-15), winning 4 consecutive pennants. Coached at Holy Cross College for 4 years, then coached the Giants briefly. Son Howard played minor league ball. Burkett lived to 84 — far outliving most of his contemporaries.",
    era_adaptability: "HIGH for the skill, LOW for the personality. Burkett's bat control, bunting ability, and plate discipline would translate to any era. He's a Tony Gwynn prototype — a left-handed slap hitter with elite bat-to-ball skills. But his combativeness, treatment of umpires and rookies, and general hostility would be a PR nightmare in the modern game. He'd be suspended constantly for arguments.",
    clubhouse_impact: "DIVISIVE. Burkett made the Spiders meaner, tougher, and more competitive — but also more volatile. He 'had no friends on the other team' and not many on his own. SABR's biography notes he was 'unpopular with teammates' while simultaneously being the team's best hitter. The Crab made everyone uncomfortable, and the discomfort made everyone better. Or worse. Depending on the day.",
    dark_side: "The cruelty. Burkett didn't just compete hard — he was deliberately cruel. He insulted rookies, berated sportswriters, and was considered the 'meanest player on the infamously rowdy Cleveland Spiders.' The Spiders themselves became the worst team in baseball history (20-134 in 1899) after the owner gutted them by sending Burkett, Young, and others to St. Louis. Burkett was complicit in this — he went willingly to the better team, leaving behind a franchise that collapsed into the most pathetic record ever. In ILB terms: Burkett carries a 'Crab' trait — his combativeness gives +1 to team competitiveness but -1 to team cohesion, and he'll always leave for a better opportunity.",
  },

  chemistry_traits: [
    { tag: "The Crab", desc: "Surly, combative, mean. +1 team competitiveness permanently. -1 team cohesion. Opposing players lose -1 morale from constant verbal abuse." },
    { tag: "Three-Time .400", desc: "Only Cobb and Hornsby also hit .400 three times. +2 reputation among hitters. Opposing pitchers gain 'Intimidated' trait." },
    { tag: "Greatest Bunter", desc: "Shaughnessy: 'the greatest bunter in baseball history.' Burkett can bunt for a hit at will — 40% success rate on bunt attempts." },
    { tag: "Foul Ball Artist", desc: "Could foul off pitches indefinitely. Pitcher fatigue increases +1 every AB against Burkett. The foul-strike rule was partly inspired by him." },
    { tag: "55 Inside-the-Park", desc: "All-time MLB record for inside-the-park HR (55). 10% chance any triple becomes an inside-the-park HR." },
    { tag: "Pitcher-Turned-Hitter", desc: "Went 39-6 as a minor league pitcher before switching to OF. Understands pitching: +1 CON vs. pitchers who rely on deception." },
    { tag: "Spider's Venom", desc: "+2 chemistry with Cleveland Spiders teammates. But if the team is gutted by ownership, Burkett leaves first." },
    { tag: "Worcester Man", desc: "Adopted Worcester, MA as home. Owned and managed the Worcester Busters. 4 consecutive pennants. +1 longevity (plays until age 47)." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: "Three .400 seasons. 2,850 hits. The box was his kingdom." },
    { location: "Umpire's Face", affinity: "HIGH", note: "First player ejected from both games of a doubleheader. Constant arguments." },
    { location: "Wheeling, WV", affinity: "HIGH", note: "Born there. First WV native in the Hall of Fame." },
    { location: "Worcester, MA", affinity: "HIGH", note: "Adopted home for 64 years. Owned the Worcester Busters." },
    { location: "Holy Cross College", affinity: "MEDIUM", note: "Coached baseball there for 4 years after playing career." },
    { location: "Clubhouse", affinity: "LOW", note: "Unpopular with teammates. 'His claws were in every rhubarb.'" },
    { location: "Press Box", affinity: "LOW", note: "Insulted sportswriters regularly. They got their revenge in print." },
  ],

  momentum: {
    hot_triggers: [
      "Heckling — Burkett got meaner and better when people tried to rattle him",
      "Batting races — his three titles came when he was locked in competition",
      "Playing for the best team — Burkett thrived when surrounded by talent (Spiders, Cardinals)",
      "Bunting situations — no one was better at placing bunts exactly where he wanted",
    ],
    cold_triggers: [
      "Being shown up by umpires — 'Burkett batting for exercise' left him red-faced",
      "Bad teams — his production declined sharply once the Spiders were gutted",
      "The foul-strike rule (1901 NL, 1903 AL) — his BA dropped when foul balls became strikes",
      "Age-related decline — his average fell each year after 1901",
    ],
    pressure_response: "COMBATIVE. Burkett's pressure response was anger — he hit better when he was mad, which was almost always. In the 1895 Temple Cup, he helped the underdog Spiders beat the mighty Orioles 4-1. But in the 1896 Cup, his errors contributed to a sweep loss. In ILB: Burkett is dangerous in October because his rage intensifies — but his fielding can cost you at the worst moment.",
  },

  action_card_seeds: [
    { title: "Four-Ten", type: "Game Action", text: "Your left fielder hits .410 for the season — 240 hits, a major league record. He leads the league in batting average, hits, and runs scored. He's the second player to hit .400 in consecutive years. Your franchise has a generational hitter.", origin: "Burkett hit .410 in 1896 with 240 hits (ML record for 15 years), 160 runs, and led the NL in BA for the second straight year." },
    { title: "Ejected Twice", type: "Drama", text: "Your outfielder is ejected from the first game of a doubleheader for arguing a called third strike. He refuses to leave. The umpire threatens to forfeit. In the second game, he's ejected again. First player in history to accomplish this.", origin: "On August 4, 1897, Burkett became the first player ejected from both games of a doubleheader vs. Louisville. He argued calls in both games." },
    { title: "Batting for Exercise", type: "Drama", text: "Your pinch-hitter refuses to tell the umpire who he's batting for. The umpire announces to the crowd: 'Burkett batting for exercise.' The crowd laughs. Your player, red-faced, strikes out. -2 morale. But +1 motivation for the next 5 games.", origin: "In the New England League, an umpire asked who Burkett was pinch-hitting for. He said 'None of your blankety blank business.' The umpire's response humiliated him." },
    { title: "The Greatest Bunt", type: "Game Action", text: "Your hitter lays down the most perfect bunt in baseball history. The ball dies exactly where no fielder can reach it. He does this whenever he wants. Opponents cannot defend it.", origin: "Frank Shaughnessy called Burkett 'the greatest bunter in baseball history.' He could place bunts with surgical precision." },
    { title: "The Foul Ball Rule", type: "Drama", text: "Your hitter can foul off pitches indefinitely, exhausting every pitcher he faces. The league changes the rules to stop him — foul balls now count as strikes. Your hitter's batting average drops 40 points. The game itself adapts to neutralize one man.", origin: "Burkett's ability to foul off pitches was so extreme that it partially inspired the foul-strike rule. His average dropped from .376 (1901) to .306 (1902) and below .300 after the rule took full effect." },
    { title: "Pitcher to Hitter", type: "Action", text: "Your pitcher goes 39-6 in the minors but can't succeed in the majors (3-10, 5.57 ERA). Rather than quit, he reinvents himself as an outfielder — and becomes a .400 hitter. The most successful position change in baseball history.", origin: "Burkett was a dominant minor league pitcher (39-6 for Worcester in 1889) but failed as a ML pitcher (3-10, 5.57 for the Giants). He switched to the outfield and hit .338 lifetime." },
    { title: "The Spider's Death", type: "Drama", text: "Your team's owner also owns another franchise. He strips your team of its best players — including your .400 hitter — and sends them to the better team. Your franchise goes 20-134, the worst record in baseball history. The franchise folds.", origin: "Frank Robison owned both the Spiders and Cardinals. In 1899, he transferred Burkett, Young, and others to St. Louis. The gutted Spiders went 20-134." },
    { title: "Playing at Forty-Seven", type: "Action", text: "Your retired star refuses to retire. He owns, manages, and plays for a minor league team. He wins the league batting title at age 37. He wins 4 consecutive pennants as manager. He plays his last professional game at 47. He then coaches in college.", origin: "Burkett managed the Worcester Busters (1906-15), won the New England League batting title in 1906, won 4 straight pennants, and played until age 47." },
  ],

  art_direction: {
    face: "Small, compact, scowling. 5'8\" 155 lbs — the smallest position player card in the set. Sharp features, hard eyes, downturned mouth. The face of a man who is already angry at you before you've done anything. Not menacing like Cobb — more like a small animal defending territory. There's competence in the scowl, not cruelty.",
    attire: "Cleveland Spiders 1896 road grays — the era when the Spiders were still a powerhouse. Crouched left-handed batting stance, bat cocked, ready to bunt or slap. The stance is low and coiled — Burkett made himself even smaller at the plate. Or: captured mid-argument with an umpire, jaw jutting, finger pointing, the classic Crab pose.",
    mood: "Controlled rage. Not chaotic rage (Waddell) or cold fury (Cobb) — this is a low-frequency, constant anger. Burkett was always mad, always arguing, always competing. The image should feel tense and compressed, like a spring that's been wound too tight. The most combative card in the set.",
    style: "Harsh, contrasty sepia — darker shadows than most position player cards, reflecting the Spiders' rough reputation. The gritty industrial feel of 1890s Cleveland — steel mills, smokestacks, rough ballfields. Ornate but slightly tattered border — the Crab has scratched at the edges. Aged paper with deliberate scuff marks — this card has been in fights.",
    reference: "This is the T206 that looks like it's glaring at you from the page. ILB sepia at its most confrontational. Where Keeler is polished and Lajoie is regal, Burkett is a back-alley brawler with a .410 average. The card that proves you don't have to be likable to be legendary.",
  },
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

export default function JesseBurkettCard() {
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
          {side === "front" ? "\u25bc Flip Card \u2014 View Dossier \u25bc" : "\u25b2 Flip Card \u2014 View Front \u25b2"}
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
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" \u2014 {d.team} \u2014 {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HITS", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS \u2014 {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HITS", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "ITP HR", val: "55" },{ label: "3B", val: "182" },{ label: "BAT TITLES", val: "3" },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS \u2014 16 SEASONS (1890-1905)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\u2b50 HOF 1946", "\ud83d\udc51 3\u00d7 NL Batting Champ", "\ud83d\udd25 .400 Three Times", "\ud83c\udfc3 55 Inside-the-Park HR (Record)", "\ud83e\udd4d Greatest Bunter Ever", "\ud83e\udd80 The Crab", "\u26be Former 39-Win Pitcher", "\ud83c\udfdb\ufe0f 1895 Temple Cup Champion"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER \u2014 {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "\u26a0 Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> \u2014 {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="\ud83d\udd25 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>\u25b8 {t}</div>))}</Section>
                <Section title="\u2744 Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>\u25b8 {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Burkett's real life, become universal cards playable in any game.</p>
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
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>CONTACT \u2014 Batting Average + OPS+</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>.200-.249 \u2192 1 | .250-.269 \u2192 2 | .270-.299 \u2192 3 | .300-.329 \u2192 4 | .330+ \u2192 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: OPS+ \u2265 130 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>POWER \u2014 Home Runs + SLG</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-9 \u2192 0 | 10-19 \u2192 1 | 20-29 \u2192 2 | 30-39 \u2192 3 | 40-49 \u2192 4 | 50+ \u2192 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: SLG \u2265 .500 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>SPEED \u2014 Stolen Bases + range</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-5 \u2192 0 | 6-15 \u2192 1 | 16-30 \u2192 2 | 31-50 \u2192 3</div>
                  </div>
                </Section>
                <Section title="Burkett's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} \u2022 {d.position} \u2022 OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
