import { useState } from "react";

const KUHEL_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JOE KUHEL
  // Year Snapshot: 1936 (Career Year — 6th in AL MVP)
  // ═══════════════════════════════════════════════════════════════

  name: "Joe Kuhel",
  nickname: "Joe Cool",
  year: 1936,
  team: "Washington Senators",
  league: "American League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "L",
  throws: "L",
  height: "6'0\"",
  weight: "180 lbs",
  born: "June 25, 1906 — Cleveland, OH",
  died: "February 26, 1984 — Kansas City, KS",
  hof: "Not inducted. .277 BA, 131 HR, 1,049 RBI, 2,212 H, .992 FLD% in 18 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1936 CAREER YEAR
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1936,
    games: 151,
    at_bats: 599,
    hits: 192,
    doubles: 42,
    triples: 7,
    home_runs: 16,
    rbi: 118,
    stolen_bases: 13,
    batting_avg: ".321",
    obp: ".392",
    slg: ".467",
    ops: ".859",
    ops_plus: 118,
    war: 4.8,
    career_avg: ".277",
    career_hits: 2212,
    career_hr: 131,
    career_rbi: 1049,
    career_war: 30.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .200-.249 = 1 | .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ ≥ 130 adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG ≥ .500 adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + triples + range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove at CF/SS adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — Fielding reputation
  //   No Gold Glove = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //
  // OVERALL (OVR) — Weighted composite
  //   CON×2 + POW×1.5 + SPD×1 + DEF×0.5, normalized to 3-13
  //
  // CLUTCH (CLU) — Postseason performance modifier
  //   PS BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   World Series hero moment adds +1 (cap at 3)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,      // Solid Starter — .321/16 HR/118 RBI in 1936 (6th in MVP). Best defensive 1B in AL during 1930s. But: .277 career BA, 104 career OPS+, inconsistent production. 18 seasons of steady, unspectacular play. OVR 6.
    con: 4,      // .321 BA → tier 4 (.300-.329). OPS+ 118 → no bonus (<130). Best year was .321; career .277 shows the peak was brief. CON 4.
    pow: 1,      // 16 HR → tier 1 (10-19). SLG .467 → no bonus (<.500). Griffith Stadium suppressed his power — hit 27 HR in friendlier Comiskey Park in 1940. POW 1.
    spd: 1,      // 13 SB → tier 1 (6-15). 178 career SB (22 SB at age 36 in 1942). No CF/SS positional bonus. SPD 1.
    def: 2,      // Best defensive 1B in AL during 1930s. .992 career fielding pct. Compared to Hal Chase (pre-scandal). "He gobbles hard grounders and easy ones with equal ease. His judgment has almost been uncanny." Equivalent to 3-5 GG. DEF 2.
    clu: 0,      // .188 BA in 1933 WS (3-for-16). Senators lost to Giants in 5 games. PS BA < .250 → tier 0. No hero moments. CLU 0.
  },

  stat_justification: {
    con: ".321 BA in 1936 → tier 4 (.300-.329). OPS+ 118 → no bonus (<130). Also hit .322 in 1933 WS year. But career .277 BA, 104 OPS+ — an average hitter over 18 seasons with occasional hot streaks. Rating of 4.",
    pow: "16 HR in 1936 → tier 1 (10-19). SLG .467 → no bonus (<.500). Griffith Stadium was cavernous — Kuhel hit the only Senators home run in Griffith Stadium in all of 1945 (an inside-the-parker). Hit 27 HR at Comiskey Park in 1940, showing the park effect was real. 131 career HR. Rating of 1.",
    spd: "13 SB in 1936 → tier 1 (6-15). 178 career SB. Stole 22 bases at age 36 in 1942 — unusual late-career speed for a 1B. No CF/SS positional bonus. Rating of 1.",
    def: "Best defensive 1B in the AL during the 1930s. .992 career fielding pct. Scout: 'His fielding is considered by many players to be the equal of the once peerless Hal Chase. He gobbles the hard grounders and the easy ones with equal ease. His judgment has almost been uncanny.' Equivalent to 3-5 GG. Rating of 2.",
    clu: ".188 BA in 1933 WS (3-for-16). Lost to Giants in 5 games. Only postseason appearance. PS BA < .250 → tier 0. No hero moments. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Steady Professional. Kuhel played 18 seasons, 2,104 games, all at first base. He wasn't flashy, wasn't loud, wasn't controversial. He showed up, played gold-glove defense, hit .277, and went home. When he became a manager, his leadership style was blunt realism: 'What we're trying to do here is make chicken salad out of chicken shit.' He knew what he had and didn't pretend otherwise.",
    temperament: "Quiet, modest, reliable. His son remembered: 'He wouldn't speak about himself a lot, or his accomplishments, unless he was with family. Or someone he trusted a lot.' Kuhel was reticent about his career — not bitter, not boastful. Just private. He performed card tricks for kids in Kansas City. He co-founded 3&2 Baseball, a youth league. The man gave back quietly.",
    work_ethic: "Self-made from nothing. Orphaned young. Adopted by Slavakian immigrants who ran a grocery store. Dropped out of Brooklyn Heights High School in Cleveland after one year to become a leatherworker. Played baseball on weekends for the Cleveland Chiropractic College team. A semi-pro manager named Doik Novario placed him with Flint in the Michigan-Ontario League. From there: 18 major league seasons. The journey from orphan leatherworker to $65,000 prospect is one of the great bootstrap stories in baseball.",
    lifestyle: "Cleveland orphan, Kansas City man. Met his wife while playing for the KC Blues. Settled in Kansas City permanently. After baseball: district sales manager for Roper Sales Corp. until retirement in 1971. Co-founded 3&2 Baseball for kids up to 16 in 1943. Performed card tricks. Lived near his old ballpark. Buried at Forest Hill Cemetery, Kansas City — near Satchel Paige and Buck O'Neil. A quiet, community-rooted life.",
    era_adaptability: "MODERATE. The elite defense at 1B translates to any era — Gold Glove caliber. The .277 career BA and 131 HR in 18 seasons are underwhelming by modern 1B standards. He'd be a defense-first 1B, which is a niche role in modern baseball (think Eric Hosmer with better glove, less power). The speed for a 1B (178 career SB, 22 at age 36) is unusual and adds value.",
    clubhouse_impact: "STEADY-RELIABLE. Kuhel wasn't a Jungle Club catalyst or a joyful Goose. He was the guy who played every day, made every play at first, and didn't cause problems. His Kansas City community involvement (3&2 Baseball, card tricks for kids) suggests a man who cared deeply but expressed it through action, not words. The kind of player every team needs and nobody talks about.",
    dark_side: "The inconsistency. Kuhel could hit .321 one year and .249 the next. The 1933 WS was his one shot at October glory — he hit .188. Griffith Stadium ate his power numbers alive. When he finally got to a hitter-friendly park (Comiskey), he was already in his 30s. His managerial career was dismal: 106-201 (.345) in two seasons with the Senators. 'Chicken salad out of chicken shit' — he saw the truth clearly, but that didn't help him win. The orphan who built himself from nothing never quite reached the heights his talent suggested.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Joe Cool", desc: "Kuhel's name is pronounced 'COOL.' +1 composure in all situations. He never panics, never overreacts, never gets rattled. The steadiest hand on the roster." },
    { tag: "Gold Glove Before Gold Gloves", desc: "Best defensive 1B in the AL during the 1930s. 'Equal to the peerless Hal Chase.' +2 DEF at 1B. Turns errors into outs. Saves infielders with scoops, stretches, and range." },
    { tag: "Griffith Stadium Prisoner", desc: "Griffith Stadium's cavernous dimensions suppressed Kuhel's power. -1 POW at Griffith Stadium. +1 POW at all other parks. In 1945, he hit the only Senators HR in Griffith Stadium — an inside-the-parker." },
    { tag: "The Orphan's Drive", desc: "Orphaned young, adopted by immigrants, dropped out of school to work leather. Kuhel built his career from nothing. +1 work ethic permanently. Will never demand a trade or quit on a team." },
    { tag: "Card Tricks", desc: "Kuhel performed sleight-of-hand card tricks for kids around Kansas City. +1 entertainment, +1 team morale in the offseason. The quiet man's small magic." },
    { tag: "Chicken Salad", desc: "As a manager: 'What we're trying to do here is make chicken salad out of chicken shit.' When managing a bad team: +1 blunt honesty, -1 ownership relations. Kuhel tells the truth even when nobody wants to hear it." },
    { tag: "3&2 Baseball", desc: "Co-founded 3&2 Baseball, a youth league in Kansas City in 1943 — still operating today. +2 legacy. +1 community. The orphan built a home for kids who needed one." },
    { tag: "Kansas City Roots", desc: "KC Blues teammate of Joe Cronin in 1928. Met his wife in KC. Settled there permanently. When traded or released: always gravitates back to Kansas City." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "First Base — Any Park", affinity: "HIGH", note: "18 seasons, 2,104 games, all at 1B. Best defensive 1B in the AL. 'His judgment has almost been uncanny.'" },
    { location: "Griffith Stadium / Washington", affinity: "HIGH", note: "8 seasons total (1930-37, 1944-46). 1933 WS. Home — but the park ate his power." },
    { location: "Kansas City", affinity: "HIGH", note: "KC Blues (1926-30). Met his wife. Settled permanently. Co-founded 3&2 Baseball. Buried near Satchel Paige." },
    { location: "Comiskey Park / Chicago", affinity: "MEDIUM", note: "6 seasons with White Sox (1938-43). Career-high 27 HR in 1940. The park finally let him hit." },
    { location: "World Series", affinity: "LOW", note: ".188 BA in 1933 WS. One shot at October — hit 3-for-16. Lost to Giants in 5 games." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Hitter-friendly parks — Kuhel's power emerged at Comiskey Park (27 HR in 1940). The bat wakes up when the walls come in.",
      "Contract years / proving himself — hit .321 in 1936 (6th in MVP), hit .322 in 1933 (WS year). Kuhel performs when the spotlight is on.",
      "Stability — 18 seasons at one position. Kuhel improves with routine and consistency.",
      "Community engagement — when rooted in a city (Washington, Kansas City), Kuhel's production stabilizes.",
    ],
    cold_triggers: [
      "Cavernous ballparks — Griffith Stadium killed his power numbers for 8 years.",
      "Post-peak inconsistency — .321 in 1936, then .283 in 1937. The drop-offs were sudden and unexplained.",
      "Postseason pressure — .188 in the 1933 WS. His one shot at October was his worst stretch.",
    ],
    pressure_response: "THE RELIABLE REGULAR. Kuhel was not a postseason hero (.188 in his only WS). He was not a headline-maker. He was the man who played 2,104 games at first base over 18 seasons, hit .277, fielded .992, and never missed a beat. In ILB terms: Kuhel's pressure response is 'keeps doing his job.' He won't win you the World Series with a walk-off, but he won't lose it with a crucial error either. He's the floor — the dependable minimum that lets the stars around him take risks.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Only Home Run in Griffith Stadium",
      type: "Game Action",
      text: "Your first baseman hits a line drive that rattles around the cavernous outfield. He sprints around the bases — an inside-the-park home run. It is the only home run any player on your team will hit in your home park the entire season. Six visiting players hit one there. Your guy managed one. The park wins.",
      origin: "1945: Kuhel hit the only Senators HR in Griffith Stadium all season — an inside-the-parker off Bob Muncrief on September 7.",
    },
    {
      title: "The Leatherworker's Hands",
      type: "Action",
      text: "Your first baseman's hands are extraordinary. He scoops low throws out of the dirt. He stretches for wide throws without leaving the bag. He catches line drives bare-handed. He learned to work with his hands making leather goods as a teenager — those hands never forgot.",
      origin: "Kuhel worked as a leatherworker before baseball. 'He gobbles the hard grounders and the easy ones with equal ease.'",
    },
    {
      title: "Sixty-Five Thousand Dollars",
      type: "Drama",
      text: "Your scout has been watching a minor league first baseman for weeks. The report: 'The best first baseman in the country.' The price: $65,000 — the most your owner has ever spent on a prospect. This is during the Depression. You already have a first baseman hitting .330. You buy the kid anyway.",
      origin: "1930: Clark Griffith paid $65,000 for Kuhel from the KC Blues — his most expensive purchase ever, with Joe Judge already at 1B.",
    },
    {
      title: "Chicken Salad Out of Chicken Shit",
      type: "Action",
      text: "You are the manager of the worst team in baseball. A reporter asks what you expect from the season. Your answer: 'What we're trying to do here is make chicken salad out of chicken shit.' The team goes on a road trip and plays well. When the train pulls into the station, 5,000 fans are waiting.",
      origin: "1949: Kuhel managed the Senators to 106-201 over two years. His candor was legendary.",
    },
    {
      title: "Card Tricks for the Kids",
      type: "Action",
      text: "Your first baseman retires. He doesn't write a memoir or chase broadcasting jobs. Instead, he performs card tricks for kids in the neighborhood and co-founds a youth baseball league. The league is still operating 80 years later.",
      origin: "Kuhel performed sleight-of-hand for Kansas City kids and co-founded 3&2 Baseball in 1943 — still active today.",
    },
    {
      title: "Three Triples in a Game",
      type: "Game Action",
      text: "Your first baseman — a left-handed line-drive hitter — rips three triples in one game. Nobody expects a first baseman to hit three triples. The gaps are his domain today.",
      origin: "May 13, 1937: Kuhel tied the AL record with 3 triples in one game.",
    },
    {
      title: "The Orphan's Journey",
      type: "Drama",
      text: "Your prospect was orphaned as a child. Adopted by immigrants who ran a grocery store. He dropped out of school to become a leatherworker. He played weekend baseball for a chiropractic college team. A semi-pro manager placed him with a minor league team in Flint, Michigan. Twenty years later, he has 2,212 major league hits.",
      origin: "Kuhel was orphaned young, adopted by Slavakian immigrants, worked leather, played sandlot ball, and built an 18-year MLB career.",
    },
    {
      title: "Buried Near Satchel and Buck",
      type: "Drama",
      text: "Your first baseman dies in Kansas City at 77. He is buried at Forest Hill Cemetery — near Satchel Paige and Buck O'Neil. Three baseball men, three different stories, all at rest in the same Kansas City earth. The orphan from Cleveland found his home.",
      origin: "Kuhel is buried at Forest Hill Cemetery, Kansas City, near Paige and O'Neil.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Solid, steady, left-handed. 6'0\" 180 lbs. The face of a man who doesn't need attention — pleasant, unremarkable, dependable. Not a movie star, not a character. The face you'd trust behind a counter or at first base.",
    attire: "Washington Senators 1936 home whites — the curly 'W' cap. Griffith Stadium behind him. The pose: stretching for a low throw at first base, fully extended, the ball just hitting the glove. Defense is his identity.",
    mood: "Quiet competence. The card should feel workmanlike — not glamorous, not dramatic. Like a well-made tool. Kuhel was the foundation, not the showpiece.",
    style: "Washington navy and red. Muted, professional, understated. The least flashy card in the set — and that's the point. Every roster needs a Joe Kuhel. This card honors the role players.",
    reference: "The card of Joe Cool. The orphan who became a leatherworker who became the best defensive first baseman in the American League. The man who hit the only home run in Griffith Stadium in 1945. The man who made chicken salad. The man who did card tricks for kids and co-founded a youth league. The man buried near Satchel Paige. Joe Kuhel — 18 seasons of showing up.",
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
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function JoeKuhelCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = KUHEL_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Solid, left-handed, Senators curly-W cap, Griffith Stadium, stretching for a low throw at 1B, workmanlike]</div>
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
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war },
                { label: "HITS", val: d.real_stats.hits },
              ].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🥇 Best AL 1B Defense 1930s", "📊 .321/16 HR/118 RBI ('36)", "🏟️ 1933 World Series", "🎴 Card Trick Magician", "⚾ 3&2 Baseball Founder", "📈 2,212 Career Hits", "🏠 18 Seasons at 1B", "💎 .992 Career FLD%"].map((a, i) => (
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
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
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
              {tab === "actions" && (
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Kuhel's real life, become universal cards playable in any game.</p>
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
              )}
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
                <Section title="Kuhel's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}
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
