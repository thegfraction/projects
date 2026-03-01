import { useState } from "react";

const VOSMIK_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JOE VOSMIK
  // Year Snapshot: 1935 (Career Year — Led AL in H, 2B, 3B)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Joe Vosmik",
  nickname: "The Blond Viking",
  year: 1935,
  team: "Cleveland Indians",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "RF",
  bats: "R",
  throws: "R",
  height: "6'0\"",
  weight: "185 lbs",
  born: "April 4, 1910 — Cleveland, OH (Bohemian immigrant parents, Broadway-E. 55th St. neighborhood)",
  died: "January 27, 1962 — Cleveland, OH (age 51)",
  hof: "Not inducted. Cleveland Sports HOF. Top 100 Greatest Indians (2001).",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1935 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject (Bill Nowlin)
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1935,
    games: 152,
    at_bats: 620,
    hits: 216,
    doubles: 47,
    triples: 20,
    home_runs: 10,
    rbi: 110,
    stolen_bases: 2,
    batting_avg: ".348",
    obp: ".408",
    slg: ".537",
    ops: ".945",
    ops_plus: 131,
    war: 5.7,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 1,
    career_avg: ".307",
    career_hits: 1682,
    career_hr: 65,
    career_sb: 23,
    career_war: 22.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  // CON: .348 BA → tier 5 (.330+). OPS+ 131 → ≥130 bonus. Capped. CON 5.
  // POW: 10 HR → tier 1 (10-19). SLG .537 → ≥.500 bonus → +1. POW 2.
  // SPD: 2 SB → tier 0. But 20 triples (led AL!) + good speed. SPD 1.
  // DEF: No Gold Gloves. .979 career fielding %. Tris Speaker tutored him. Good arm. DEF 1.
  // CLU: No postseason stats until 1941 NL pennant (Dodgers). No WS heroics. CLU 0.
  // OVR: CON(5)×2+POW(2)×1.5+SPD(1)×1+DEF(1)×0.5 = 10+3+1+0.5 = 14.5 → ~6 (Solid Starter)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 6,      // Solid Starter — one elite season, solid career .307 hitter, not a HOFer
    con: 5,      // .348 in 1935 — lost batting title by .0007. Led AL in hits twice. Career .307. Max contact in peak.
    pow: 2,      // 10 HR in 1935 → tier 1. SLG .537 → bonus +1. Gap power (47 2B, 20 3B) not HR power.
    spd: 1,      // 2 SB in 1935 but 20 triples (led AL). Good speed, just didn't steal. Set minor league triples record. SPD 1.
    def: 1,      // No Gold Gloves. .979 career fielding %. Self-described 'awkward outfielder' early on — Tris Speaker tutored him. Good arm (13 assists in minors). Adequate to good. DEF 1.
    clu: 0,      // No meaningful postseason stats. Helped 1941 Dodgers win NL pennant but no WS heroics. Never played in a WS. CLU 0.
  },
  
  stat_justification: {
    con: ".348 in 1935 — lost batting title to Buddy Myer by .0007 (.3483 vs .3490) on the final day. Led AL in hits (216), doubles (47), and triples (20) — first to lead outright in all three since Ty Cobb in 1919. Career .307. Led AL in hits again in 1938 (.324, 201 H). 117 RBI as a rookie in 1931. A pure line-drive hitter who sprayed the ball everywhere.",
    pow: "10 HR in 1935, 65 career. Not a home run hitter — a doubles and triples machine. 47 2B + 20 3B in 1935 = 67 extra-base hits from gap power alone. Career 335 doubles, 92 triples. SLG .537 earns the bonus. Rating of 2.",
    spd: "2 SB in 1935, 23 career — low steal totals. But 20 triples (league-leading!) proves real speed. Set minor league triples record (24-25) with Frederick in 1929. Good speed, not a base-stealer. Rating of 1.",
    def: "No Gold Gloves (pre-award). Self-described 'awkward outfielder' when signed. Asked Tris Speaker for fielding tips — Speaker tutored him. Improved to solid defender with a good arm. .979 career fielding % across all three OF positions. Rating of 1.",
    clu: "No World Series appearances as an everyday player. Helped 1941 Dodgers win NL pennant but was a part-time player by then. No postseason heroics. The biggest 'clutch moment' was losing the batting title on the final day. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Local Hero. Vosmik was Cleveland's own — born on the sandlots of the Broadway-E. 55th Street neighborhood, sneaking into League Park to watch games as a kid, and bouncing 'from his home-town playgrounds into his home-town major-league line-up.' His leadership was that of a hometown favorite: passionate, earnest, and deeply rooted in community. The fans adored him because he was one of them.",
    temperament: "Cocky confidence as a young player, humility as he matured. Manager Peckinpaugh marveled at his 'true baseball instinct' and how amazing it was 'in one who has played as little as he has.' Still half-afraid of being kicked out of the ballpark even after making the roster — 'I'm still afraid I'll be recognized and bounced out.' A blue-collar player with blue-collar honesty.",
    work_ethic: "Self-improver. Recognized his weakness (fielding) and sought out Tris Speaker for pointers. Worked on his game relentlessly. Rose from Cleveland sandlots to the majors in just two minor league seasons. But not obsessive — a natural hitter who refined the edges rather than rebuilding from scratch.",
    lifestyle: "Simple, working-class. Son of Bohemian (Czech) immigrants Josef and Anna Vosmik. Befriended by neighborhood druggist Bill Kuchta who kept him supplied with bats and baseballs. Married Sally Joanne Okla in 1936 — three children (Joseph, Larry, Karen). After baseball: minor league manager, scout for Indians, then automobile and appliance salesman. Died at 51 in Cleveland — never left home.",
    era_adaptability: "MODERATE. Vosmik's contact-first, gap-power game would be valued by analytics as an OBP/doubles machine. His lack of HR power limits him in power-focused eras, but his ability to hit .300+ and spray line drives translates universally. A prototypical 'solid regular' in any decade.",
    clubhouse_impact: "MODERATE-HIGH. A popular teammate — the nephew recalled him playing baseball with kids at family picnics. Warm, approachable, no ego. Not a vocal leader but a steadying, likable presence. The kind of player who keeps a clubhouse loose and happy.",
    dark_side: "The batting title that got away. On the final day of 1935, Vosmik sat out the first game to protect his lead. Myer went 4-for-5. Vosmik scrambled to pinch-hit, made an out, then managed only 1-for-3 in the nightcap before darkness ended play. .3483 vs .3490. The margins of glory. He never got another chance — traded the next year, bounced from team to team, and died at 51 without ever reaching the heights of that one magical season.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Blond Viking", desc: "+1 CON in home stadium. Vosmik received a two-minute standing ovation at the 1935 All-Star Game in Cleveland. Hometown energy fuels him." },
    { tag: "Sandlot Kid", desc: "+1 team chemistry with blue-collar players. He came from the streets and never forgot it. Connects with working-class teammates." },
    { tag: "Speaker's Student", desc: "+1 DEF after being mentored by an elite outfielder. Tris Speaker taught him to field — he went from 'awkward' to solid." },
    { tag: "Gap Power Machine", desc: "Converts 20% of singles into doubles. Vosmik sprayed line drives into every gap — 47 doubles and 20 triples in his peak year." },
    { tag: "The Batting Race", desc: "In a close batting race, Vosmik gets +1 CON in September. But on the final day, 50% chance of choking under the pressure of protecting a lead." },
    { tag: "Bohemian Roots", desc: "+1 fan loyalty in immigrant neighborhoods. The son of Czech immigrants, he was Cleveland's Broadway-E. 55th pride." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Natural hitter who refined his game. Always working on gaps." },
    { location: "Community Events", affinity: "HIGH", note: "Hometown hero. Played baseball with kids at family picnics. Beloved locally." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Likable, approachable. The teammate everyone gets along with." },
    { location: "Local Neighborhood / Sandlots", affinity: "HIGH", note: "Grew up on Cleveland streets. Still felt like he might get 'bounced out' even as a pro." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Working-class tastes. Family man after 1936 marriage." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "No association with nightlife or drinking problems." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Playing in Cleveland / home stadium — hometown energy fuels performance",
      "Batting races — rises to the occasion in September (until the final day)",
      "Debut energy — went 5-for-5 in his first real start (1931)",
      "Doubles and triples — when the gaps are open, Vosmik catches fire",
    ],
    cold_triggers: [
      "Being traded or leaving Cleveland — performance dropped after departing",
      "Protecting a batting lead — the final-day pressure in 1935 broke him",
      "Playing for losing or unfamiliar teams (Browns, Senators years)",
      "Aging — decline was steady after age 28 peak",
    ],
    pressure_response: "MIXED. Vosmik thrived in regular-season pressure (3rd in MVP, led AL in 3 categories) but crumbled at the single biggest moment — sitting out to protect his lead, then scrambling to catch up on the final day. A player who could handle sustained pressure but not acute, sudden-death moments.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Batting Race",
      type: "Drama",
      text: "Your hitter leads the batting race going into the final day. Sit him to protect the lead (60% chance rival catches up) or play him (40% chance he adds to his lead, 30% chance he goes cold, 30% chance no change).",
      origin: "1935: Vosmik sat out Game 1 of the final-day doubleheader. Myer went 4-for-5. Vosmik scrambled back but lost .3483 to .3490. The title slipped through his fingers.",
    },
    {
      title: "Five for Five on Debut Day",
      type: "Game Action",
      text: "A newly promoted player has a perfect debut: 5-for-5 with 3 doubles. He immediately becomes the starter. +2 fan appeal, +1 morale.",
      origin: "April 18, 1931: With Tris Speaker in the stands, Vosmik went 5-for-5 with three doubles and a triple. It cemented him as Cleveland's left fielder.",
    },
    {
      title: "The Good-Looking Blond Boy",
      type: "Drama",
      text: "A GM's wife spots a prospect at a tryout and says: 'Sign the good-looking blond boy.' The GM does. 50% chance the kid becomes a star, 50% chance he's a solid regular.",
      origin: "Billy Evans' wife spotted Vosmik at a Cleveland tryout. When Evans needed one more kid to sign, she suggested 'the good-looking blond boy.' Evans: 'Take the $300 home and give it to your mother.'",
    },
    {
      title: "The Standing Ovation",
      type: "Action",
      text: "Your hometown player comes to bat at the All-Star Game in his home city. The crowd gives him a two-minute standing ovation. +2 morale, +1 CON for the rest of the season.",
      origin: "1935 All-Star Game in Cleveland: Vosmik received a deafening two-minute standing ovation when he came to bat. The hometown showering its love on its native son.",
    },
    {
      title: "Sandlot to the Show",
      type: "Drama",
      text: "A prospect bounces 'from his home-town playgrounds into his home-town major-league line-up.' He gains 'Local Hero' status: +1 all stats in home games, -1 in road games for his first 3 seasons.",
      origin: "Vosmik was one of the rare players to go from Cleveland sandlots directly to the Cleveland Indians — the boy next door who became a star.",
    },
    {
      title: "Speaker's Lesson",
      type: "Action",
      text: "Your outfielder seeks out a retired legend for fielding tips. After the mentoring session, +1 DEF permanently. The student honors the teacher.",
      origin: "Vosmik met Tris Speaker and asked for fielding pointers. He went from 'awkward outfielder' to solid defender with a .979 career fielding percentage.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Blond, handsome, athletic. 6'0\" 185 lbs — lean, quick, built for line drives and triples. Czech-American features, open and friendly face. Sportswriters called him 'the Blond Viking' — the look of a young man who still can't believe he made it to the big leagues.",
    attire: "Cleveland Indians 1935 road grays or home whites. Classic 1930s cap and flannel. Nothing flashy — working-class kid in a working-class uniform. The lettering should suggest the old League Park aesthetic.",
    mood: "Earnest effort. The batting stance of a line-drive hitter — compact, balanced, hands ready to spray to all fields. Or the follow-through of a triple, legs churning toward third. This card should feel like honest, blue-collar baseball.",
    style: "Softer, warmer sepia than the legends' cards. Less dramatic lighting — more Sunday-afternoon-at-League-Park. The card of a guy who was really, really good but just missed greatness. There's a wistfulness to it — the .0007 that separated him from immortality.",
    reference: "Think 1934 Diamond Stars card aesthetic rendered in ILB sepia. The card you pull and think: 'Who was this guy?' And then you read the dossier and realize he almost won the batting title.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
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
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div> );

export default function JoeVosmikCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = VOSMIK_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Blond, athletic, RH stance, Indians whites, League Park, earnest]</div>
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
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 1× All-Star", "🏅 3rd in MVP", "📰 Led AL: H, 2B, 3B", "💥 .348 BA (1935)", "🏟️ Cleveland HOF", "📊 Career .307"].map((a, i) => (
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
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Vosmik's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Vosmik's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}
                </Section>
              </>)}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
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
