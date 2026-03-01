import { useState } from "react";

const MANUSH_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: HEINIE MANUSH
  // Year Snapshot: 1928 (Career Year — .378, 241 H, 47 2B)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Heinie Manush",
  nickname: "Heinie",
  year: 1928,
  team: "St. Louis Browns",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "LF",
  bats: "L",
  throws: "L",
  height: "6'1\"",
  weight: "200 lbs",
  born: "July 20, 1901 — Tuscumbia, AL (Helen Keller's hometown; German immigrant father)",
  died: "May 12, 1971 — Sarasota, FL (age 69, throat cancer)",
  hof: "Class of 1964 (Veterans Committee). Alabama Sports HOF 1972. Michigan Sports HOF 1964.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1928 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1928,
    games: 154,
    at_bats: 638,
    hits: 241,
    doubles: 47,
    triples: 20,
    home_runs: 13,
    rbi: 108,
    stolen_bases: 16,
    batting_avg: ".378",
    obp: ".414",
    slg: ".575",
    ops: ".989",
    ops_plus: 150,
    war: 6.8,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 1,
    career_avg: ".330",
    career_hits: 2524,
    career_hr: 110,
    career_sb: 114,
    career_war: 53.0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  // CON: .378 BA → tier 5 (.330+). OPS+ 150 → ≥130 bonus. Capped. CON 5.
  // POW: 13 HR → tier 1 (10-19). SLG .575 → ≥.500 bonus → +1. POW 2.
  // SPD: 16 SB → tier 2 (16-30). 20 triples in 1928. SPD 2.
  // DEF: No Gold Gloves (pre-award). .992 fielding % in LF 1928. Led AL in putouts. Solid. Below-average arm per analysts. DEF 1.
  // CLU: .111 in 1933 WS (2-for-18). Only WS appearance. Ejected from Game 4. CLU 0.
  // OVR: CON(5)×2+POW(2)×1.5+SPD(2)×1+DEF(1)×0.5 = 10+3+2+0.5 = 15.5 → ~7 (All-Star)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 7,      // All-Star — HOF, .330 career, 2,524 hits. But Veterans Committee pick, lower-tier HOFer. Excellent hitter, limited in other areas.
    con: 5,      // .378 in 1928. .330 career. .300+ in 11 full seasons. 4× 200+ hit seasons. Led AL in hits twice. Ty Cobb tutored his swing. Max contact.
    pow: 2,      // 13 HR in 1928, 110 career. SLG .575 earns bonus. 47 doubles (led AL), 20 triples. Gap power machine — doubles and triples, not homers. POW 2.
    spd: 2,      // 16 SB in 1928 (career high). 114 career. 20 triples in 1928. Good speed, especially early career. 64% SB success rate (mediocre). SPD 2.
    def: 1,      // No Gold Gloves. .992 fielding % in LF 1928 (led AL). Led in putouts. But below-average range and arm per analysts. 'Essentially a DH playing before the DH existed.' DEF 1.
    clu: 0,      // .111 in 1933 WS (2-for-18). Ejected from Game 4 for bumping umpire Charlie Moran. Only WS appearance. No clutch moments. CLU 0.
  },
  
  stat_justification: {
    con: ".378 in 1928 (narrowly lost batting title to Goslin by 1 point). .378 in 1926 (won batting title, beating Ruth). Career .330 over 17 seasons. 2,524 hits. Led AL in hits twice (1928: 241, 1933: 221). Hit .300+ in 11 full seasons. Four 200-hit seasons. Ty Cobb taught him to bunt and hit line drives. Manush: 'No one ever gained a batting championship without confidence in his ability to hit.' Maximum contact.",
    pow: "13 HR in 1928. 110 career. SLG .575 earns the bonus. But 47 doubles and 20 triples that year — pure gap power. Career 491 doubles, 160 triples. Not a power hitter by design — a line-drive machine. Rating of 2.",
    spd: "16 SB in 1928 (career high). 114 career SB. 20 triples in 1928. Had real speed, especially early. But 64% SB success rate was mediocre, and speed declined with age. Rated above-average range in his prime. Rating of 2.",
    def: "Led AL in fielding % (.992) and putouts in LF in 1928. Solid fielder. But analysts note below-average range and throwing arm, especially later. 'Essentially a DH playing before the DH existed' (This Day in Baseball). Rating of 1.",
    clu: ".111 in only World Series (1933, Senators vs Giants). 2-for-18 with 0 RBI. Ejected from Game 4 for bumping umpire Charlie Moran after a called third strike. His temper cost his team. No clutch postseason moments. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Firebrand. Manush was a fellow Southerner with Cobb's temper — fiery, competitive, physical. He led through intensity, not quiet authority. His battle with Goslin for the batting title became an annual $50 bet with a suit on the line. He was a fighter, not a diplomat. The kind of player who bumps umpires and doesn't apologize.",
    temperament: "Hot-tempered, passionate, combustible. SABR: 'Mastering the art of the line drive but unable to master his own temper.' The WS ejection for bumping umpire Moran after a called third strike is the defining moment — his rage cost his team in the only World Series he ever reached. But that same fire drove his .330 career average.",
    work_ethic: "Cobb's student. Learned to bunt, to hit line drives, to compete with ferocity under the greatest hitter who ever lived. Manush absorbed Cobb's relentless work ethic. His swing was a craft honed over years — compact, line-drive, lefty. He battled for playing time as a rookie against HOFers and won. Pure competitive will.",
    lifestyle: "German-American family man. One of 8 children (7 boys, 1 girl) of a German immigrant cabinet maker. Married Betty — three daughters (Shirley, Lillis, Sue). Betty died of cancer at 46 in 1949; Heinie never remarried. Picked up golf in 1935, won multiple city championships in Sarasota. Fought throat cancer, died in a nursing home at 69.",
    era_adaptability: "MODERATE. Manush's .330 career average and line-drive approach translate, but his lack of power and defensive limitations would hurt in modern baseball. He'd be a high-average corner outfielder with limited value beyond the bat — a one-tool player in a five-tool world.",
    clubhouse_impact: "HIGH but volatile. Manush's fire could inspire or disrupt. His annual betting rivalry with Goslin was beloved. He formed part of great outfields (Cobb/Heilmann/Manush in Detroit, Goslin/Manush in Washington). But his ejection from the World Series shows the cost of that fire.",
    dark_side: "The World Series ejection. In the only Fall Classic he ever reached (1933), Manush went 2-for-18 (.111) and got himself thrown out of Game 4 for bumping umpire Charlie Moran. His temper — the same fire that drove .330 for 17 years — betrayed him at the worst possible moment. He never got another chance. Also: Veterans Committee HOF pick means his candidacy is debated. Lower-tier HOFer by modern metrics.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Cobb's Apprentice", desc: "+1 CON innate. Learned to hit line drives under the greatest hitter in history. The Cobb school of hitting — bunt, slash, spray." },
    { tag: "The Batting Race", desc: "In September, +1 CON when within 10 points of the batting leader. Won the 1926 title going 6-for-9 on the final day. Lost 1928 by 1 point." },
    { tag: "The $50 Bet", desc: "When paired with Goslin, annual rivalry: +1 CON for both. Loser buys winner a suit. Manush won the bet 5 of 8 times." },
    { tag: "Southern Fire", desc: "+1 intimidation. But 15% chance per game of losing temper — argument with umpire, -1 DEF, risk of ejection." },
    { tag: "Line Drive Machine", desc: "Converts 15% of fly outs into doubles. Manush's swing produced flat, screaming line drives to all fields." },
    { tag: "The Ejection", desc: "In World Series, if Manush gets a called third strike, 30% chance he bumps the umpire and gets ejected. His fire was his gift and his curse." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Cobb's student. Lived in the cage. The line-drive swing was art." },
    { location: "Golf Course", affinity: "HIGH", note: "Won multiple city golf championships in Sarasota after retirement." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Fiery but popular. The rivalry with Goslin was more friendship than feud." },
    { location: "Umpire's Office", affinity: "HIGH", note: "He visited often. Not by choice — usually being ejected or fined." },
    { location: "Community Events", affinity: "MEDIUM", note: "German-American community ties. Family man with deep Southern roots." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "No particular association with nightlife." },
    { location: "Spotlight / Media", affinity: "LOW", note: "Not a media darling. Overshadowed by bigger names his entire career." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Batting races — his fire ignited in September. Won 1926 title on final day. Lost 1928 by a single point.",
      "Playing alongside great hitters — Cobb/Heilmann in Detroit, Goslin/Cronin in Washington",
      "Hitting streaks — 26-game and 33-game streaks in 1933",
      "First full seasons with new teams — .334 rookie year, .378 after trade to Browns",
    ],
    cold_triggers: [
      "World Series pressure — .111 in only WS appearance (1933), ejected from Game 4",
      "Follow-up seasons after big years — dropped 80 points from .378 to .298 in 1927",
      "Losing playing time battles — struggled when not a clear starter",
      "Temper eruptions — ejections, suspensions, loss of focus",
    ],
    pressure_response: "SPLIT. In regular-season batting races: elite (.378 twice, won 1926 title on final day in doubleheader 6-for-9). In the World Series: catastrophic (.111, ejected). Manush was a regular-season warrior who melted in October. His temper, which fueled his hitting, destroyed his composure when the stakes were highest.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "6-for-9 on the Final Day",
      type: "Game Action",
      text: "Your outfielder trails in the batting race going into the final day. He goes 6-for-9 in a doubleheader to pass the leader and win the title. The crowd storms the field.",
      origin: "1926: Manush trailed Babe Ruth entering the final day. He went 6-for-9 in a doubleheader to win the batting title at .378, beating Ruth's .372.",
    },
    {
      title: "One Point Short",
      type: "Drama",
      text: "Your hitter finishes the season at .378 — one point behind the batting champion. The rival's final-game single on a ball the right fielder couldn't quite reach decided everything.",
      origin: "1928: Manush hit .378 but lost the title to Goose Goslin by one point. Goslin singled on the final play. Browns RF Beauty McGowan couldn't make the catch.",
    },
    {
      title: "The $50 Suit",
      type: "Action",
      text: "Two rival outfielders bet $50 and a new suit on who finishes with the higher batting average. Both players gain +1 CON from the rivalry. At season's end, the loser pays up with a handshake.",
      origin: "Manush and Goslin made an annual bet after their 1928 batting race. $50 and a suit. Manush won 5 times, Goslin won 3. A rivalry built on mutual respect.",
    },
    {
      title: "Bumping the Umpire",
      type: "Drama",
      text: "In the World Series, your fiery hitter gets called out on strikes. He bumps the umpire. Ejection. Your team loses the game and the Series momentum. His temper — the source of his greatness — costs everything.",
      origin: "1933 WS Game 4: Manush bumped umpire Charlie Moran after a called third strike. Ejected from his only World Series. Senators lost the Series to the Giants.",
    },
    {
      title: "Cobb's Classroom",
      type: "Action",
      text: "A young outfielder learns to hit under the greatest batter in history. The mentor teaches bunting, line drives, and fury. +2 CON permanently. But the student also inherits the mentor's temper.",
      origin: "Manush learned to hit under Ty Cobb in Detroit (1923-27). Cobb taught him the line-drive swing. Both were fiery Southern temperaments. The apprentice absorbed the master's genius — and his rage.",
    },
    {
      title: "The All-Hall Outfield",
      type: "Action",
      text: "Your team fields an outfield of three future Hall of Famers simultaneously. +2 CON for all three. The outfield hits a combined .360.",
      origin: "Detroit 1923-27: Ty Cobb (CF), Harry Heilmann (RF), Heinie Manush (LF). Three HOFers in one outfield — they combined for 17 batting titles.",
    },
    {
      title: "Filet Mignon, Heinie Manush",
      type: "Action",
      text: "On a train ride, a teammate discovers that your player's name perfectly mimics the rhythm of the train wheels. The entire dining car starts chanting his name. +2 team chemistry. The conductor is driven to distraction.",
      origin: "Teammate Vance O'Brien ordered dinner on a train: 'Filet mignon that's for me, Heinie Manush, Heinie Manush, Heinie Manush.' The rhythmic name fit the train's clatter perfectly. Other passengers picked it up.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Strong, angular, intense. 6'1\" 200 lbs — a big man for the era. LH batting stance: compact, flat swing, the line-drive machine. The face of a man who's about to argue with someone, probably an umpire. German-American features, Southern intensity.",
    attire: "St. Louis Browns 1928 road grays or home whites. The forgotten franchise — the Browns were bad and overlooked. Manush was their best player and nobody noticed. Classic 1920s-30s baggy flannel.",
    mood: "Controlled fury. The swing: flat, vicious, the ball screaming on a line into the gap. Or the confrontation: Manush jawing at an umpire, cap tilted, finger pointing. This card should feel like coiled energy that can go two ways — a line drive or an ejection.",
    style: "Slightly rougher sepia than the refined Dickey/Gehringer cards. More grain, more shadow. The card of a brawler who happened to hit .330. Sportsman's Park in the background — half-empty, mid-1920s.",
    reference: "The card of the HOFer nobody remembers. The Veterans Committee pick. The guy who hit .378 twice and lost a batting title by one point. The guy who got ejected from his only World Series. This card is baseball's beautiful contradiction.",
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

export default function HeinieManushCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MANUSH_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: LH flat swing, line drive, Browns grays, intense expression, Sportsman's Park]</div>
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
              {["🏆 HOF 1964", "⭐ 1× All-Star", "👑 1926 AL Batting Champ", "📊 Career .330", "💎 2,524 Hits", "🏅 2nd MVP 1928"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Manush's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Manush's Derivation">
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
