// /cards/players/fred-lindstrom.jsx
import { useState } from "react";

const PLAYER_DATA = {
  name: "Fred Lindstrom",
  nickname: "Lindy",
  year: 1930,
  team: "New York Giants",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "3B",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "170 lbs",
  born: "November 21, 1905 — Chicago, IL",
  died: "October 4, 1981 — Chicago, IL (age 75)",
  hof: "Class of 1976 (Veterans Committee). Controversial selection — considered one of the weakest HOF choices. Bill James ranked him the worst 3B in the Hall. Charges of cronyism against former teammates Frisch and Terry on the Veterans Committee. The debate IS the legacy.",

  real_stats: {
    season: 1930, games: 148, at_bats: 609, hits: 231, doubles: 39, triples: 7,
    home_runs: 22, rbi: 106, runs: 127, stolen_bases: 15, strikeouts: 35, walks: 41,
    batting_avg: ".379", obp: ".425", slg: ".575", ops: "1.000", ops_plus: 145, war: 5.7,
    career_avg: ".311", career_hits: 1747, career_hr: 103, career_rbi: 779,
    career_sb: 84, career_ops_plus: 110, career_war: 24.4,
    ws_1924_avg: ".333", ws_hits: "10 hits in 7 games (age 18)",
    risp_1930: ".480 (59-for-123) — highest with RISP in MLB history",
    hit_seasons_230: "2× (1928: 231, led NL; 1930: 231)",
    youngest_ws: "18 years, 10 months, 13 days — still the youngest ever",
  },

  // ═══════════════════════════════════════════════════════════════
  // STAT ENGINE
  // CON: .379 BA → tier 5 (.330+). OPS+ 145 → ≥130 bonus. Already capped. CON 5.
  // POW: 22 HR → tier 2 (20-29). SLG .575 → ≥.500 bonus → +1. POW 3.
  // SPD: 15 SB → tier 1 (6-15). 3B has no special bonus. SPD 1.
  // DEF: Solid 3B — better fielding pct than Traynor every comparable year. But moved to OF due to back problems. No GG equivalent. DEF 1.
  // CLU: .333 in 1924 WS (10 hits, 4 off Walter Johnson). .480 with RISP. But the pebble play cost his team the WS. Mixed. CLU 2.
  // OVR: CON(5)×2 + POW(3)×1.5 + SPD(1)×1 + DEF(1)×0.5 = 10+4.5+1+0.5 = 16 → normalized ~8 (All-Star)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 5,  // .379 in 1930, .358 in 1928. Two 231-hit seasons. .480 with RISP (MLB record). .311 career. "The last of the great place hitters."
    pow: 3,  // 22 HR in 1930 (first 3B of 20th century with 20+ HR in a season). SLG .575 earns bonus. 103 career HR. POW 3.
    spd: 1,  // 15 SB in 1930, 84 career. Decent speed — he was "the boy wonder" and had burst of speed when young. But back problems slowed him. SPD 1.
    def: 1,  // Better fielding percentage than Traynor every comparable year. 7 assists in one WS game (record for 26 years). But not elite defensively — back problems moved him to OF. Pre-GG equivalent of 1-2 GG. DEF 1.
    clu: 2,  // .333 in the 1924 WS at age 18. 10 hits in 7 games. 4 hits off Walter Johnson in Game 5. .480 with RISP in 1930 (MLB record). But: the pebble play in Game 7 cost the Giants the 1924 WS. Hero AND goat in the same series. CLU 2.
  },

  stat_justification: {
    con: ".379 BA in 1930 — second only to Bill Terry's .401 in the NL that year. Two separate 231-hit seasons (1928 and 1930), joining only Rogers Hornsby and George Sisler with multiple 230+ hit seasons (later joined by Ichiro). .480 BA with runners in scoring position in 1930 — the highest in MLB history, surpassing even George Brett's famous .469 in 1980. He was called 'the last of the great place hitters' under McGraw's system of advancing runners. Career .311 BA. Rating of 5.",
    pow: "22 HR in 1930 — the first third baseman of the 20th century to hit 20 in a season. SLG .575 earns the ≥.500 bonus. 103 career HR. Not an elite power hitter but genuine pop from the 3B position. Rating of 3.",
    spd: "15 SB in 1930, 84 career. Lindstrom was fast in his youth — he was called 'the boy wonder' and had explosive burst. But back problems beginning in 1931 robbed him of speed, moved him to the outfield, and ultimately ended his career at age 30. SPD 1 reflects his peak speed at 24, already starting to fade.",
    def: "Better defensive numbers than Pie Traynor in every comparable season — Lindstrom's fielding percentage topped Traynor's each year they both played 3B. His high-water mark for errors was 21 (1928 and 1930) vs Traynor's 37 (1931). He set a WS record with 7 assists in one game (1924 WS Game 2, held for 26 years). However, he was never considered a defensive wizard, and back problems moved him to the outfield in 1931. Pre-GG equivalent of 1-2 GG. Rating of 1.",
    clu: "DUALITY. At age 18, Lindstrom hit .333 in the 1924 World Series — 10 hits in 7 games, including 4 hits off Walter Johnson in Game 5. He was sensational. But in Game 7, 12th inning, Earl McNeely's grounder hit a pebble and bounced over Lindstrom's head, scoring the winning run for Washington. The Giants lost the World Series on a bad hop over their 18-year-old third baseman. He was the hero AND the goat. .480 with RISP in 1930 shows elite situational hitting. Rating of 2.",
  },

  personality: {
    leadership_style: "The Boy Wonder. Lindstrom was McGraw's protégé — signed at 16, starting in the World Series at 18, a regular by 19. McGraw ranked him among the 20 greatest players he'd ever seen. Lindstrom absorbed McGraw's 'scientific baseball' — place hitting, situational play, advancing runners. He was the heir apparent to the Giants managerial throne. His leadership was McGraw's system made flesh: smart, disciplined, execution-first.",
    temperament: "PROUD AND OUTSPOKEN. Lindstrom was not a yes-man despite being McGraw's protégé. He reportedly led (or participated in) a player revolt against McGraw's dictatorial managing — though he always denied it. When Bill Terry was chosen as manager over him — after Lindstrom had been promised the job — he demanded a trade. He was bitter about the betrayal but professional about the exit. He had the temperament of a man who knew his worth and expected it to be recognized.",
    work_ethic: "PRODIGIOUS TALENT, SHORT WINDOW. Lindstrom's rise was meteoric: professional at 16, World Series at 18, star at 22, MVP runner-up at 23. Before his 25th birthday, he had 1,000+ hits and a .327 average. But back problems beginning at 25 (1931) derailed everything. He was moved to the outfield, traded to Pittsburgh, then Chicago, then Brooklyn. He retired at 30. His career was brilliant and brief — like a meteor, as one writer noted. Peak performance: 1926-30 (five years). Everything else was prologue or decline.",
    lifestyle: "Chicago kid, Chicago man. Born in Chicago, tried out for the Cubs (they passed — the Giants signed him). After baseball, he coached at Northwestern University in Evanston, IL for 12 years (1949-61) and served as postmaster of Evanston. He died in Chicago. A Midwest man through and through. He was generous with young people — he helped a struggling Red Barber in 1934, sitting down with the terrified young announcer who didn't know any players by sight and walking him through the game.",
    era_adaptability: "MODERATE. Lindstrom's .311 career BA and 110 career OPS+ are good but not overwhelming by modern standards. His 1930 peak (.379/.425/.575) came in the highest-offense year in MLB history — the whole league hit. His power (103 HR in 13 years) wouldn't stand out today. But his .480 with RISP and situational hitting would be valued by modern analytics teams, and his ability to produce at the highest level as a teenager suggests exceptional talent. He'd profile as a solid regular 3B — a Nolan Arenado-lite — with a shorter peak.",
    clubhouse_impact: "THE HEIR WHO WASN'T. Lindstrom's clubhouse story is one of promise unfulfilled. He was the chosen one — McGraw's hand-picked successor, the boy wonder who was going to lead the Giants into a new era. Instead, he was passed over for Bill Terry, demanded a trade, and bounced through three teams in four years. His impact was paradoxical: beloved by teammates (he helped young Red Barber, wrote kindly about McGraw despite the betrayal), but his presence reminded everyone of what might have been.",
    dark_side: "The Pebble and the Throne. Lindstrom's legacy is defined by two moments he couldn't control. The Pebble: a bad hop on a grounder in the 12th inning of the 1924 WS Game 7 cost the Giants the championship when Lindstrom was 18 years old. The Throne: he was promised the Giants managerial job, then it was given to Bill Terry — possibly because Lindstrom had spoken out against McGraw. His HOF induction is considered one of the weakest in history, the product of cronyism by former teammates on the Veterans Committee. In ILB: Lindstrom carries a 'Pebble's Curse' trait — any routine ground ball in a critical moment has a 5% chance of taking a bad hop. And a 'Passed Over' trait — he will never be chosen for a leadership role he deserves.",
  },

  chemistry_traits: [
    { tag: "Boy Wonder", desc: "Youngest WS player ever (18). +2 to all stats in his first 3 seasons. -1 after age 28 (decline)." },
    { tag: "The Pebble", desc: "5% chance that any routine ground ball in a critical moment takes a bad hop. Uncontrollable. The cruelest trait in ILB." },
    { tag: "Last of the Place Hitters", desc: "McGraw's system. +1 CON with RISP. .480 BA with RISP in 1930 — the best in MLB history." },
    { tag: "Passed Over", desc: "Promised the manager's job, didn't get it. -1 team loyalty after a perceived betrayal. Will demand a trade." },
    { tag: "McGraw's Protégé", desc: "+1 to all stats when managed by a legendary/authoritarian manager. -1 when playing for a weak manager." },
    { tag: "Controversial HOF", desc: "His HOF status is debated. +1 legacy (he IS in the Hall). -1 reputation (charges of cronyism follow him)." },
    { tag: "Meteor", desc: "His career arc is meteoric: brilliant youth, rapid peak, early decline. +2 to stats before age 25. -2 after age 30." },
    { tag: "The Kind Veteran", desc: "Helps young players and announcers. +1 to any rookie's adjustment. Lindstrom took time for Red Barber when no one else would." },
  ],

  preferred_locations: [
    { location: "Polo Grounds / NY Giants", affinity: "HIGH", note: "McGraw's team. His home from age 18 to 26. The infield he shared with Hornsby, Jackson, Terry." },
    { location: "Third Base", affinity: "HIGH", note: "Better than Traynor defensively by the numbers. 7 assists in one WS game (record 26 yrs)." },
    { location: "Northwestern University", affinity: "HIGH", note: "Baseball coach 1949-61. A 12-year second career teaching the game." },
    { location: "Evanston, IL", affinity: "HIGH", note: "Postmaster after coaching. Chicago man. Midwestern to the bone." },
    { location: "World Series", affinity: "MIXED", note: ".333 at age 18 — brilliant. But the Pebble play cost his team the championship." },
    { location: "Manager's Office", affinity: "LOW", note: "Promised the job. Didn't get it. The wound that never healed." },
  ],

  momentum: {
    hot_triggers: [
      "Youth energy — before age 25, Lindstrom was electrifying: .327 avg, 1,000+ hits",
      "Runners in scoring position — .480 with RISP in 1930 (MLB record). The ultimate clutch situational hitter.",
      "McGraw's system — when the manager demands place-hitting and situational play, Lindstrom thrives",
      "Big stage as a young player — .333 WS BA at age 18. No fear.",
    ],
    cold_triggers: [
      "Back problems — starting 1931, chronic back issues robbed him of power, speed, and eventually his position",
      "Managerial betrayal — being passed over for Terry destroyed his connection to the Giants",
      "The Pebble — any bad bounce in a critical moment triggers the worst memory of his career",
      "Post-peak decline — from 1932-36, he was a shell of himself, averaging 71 games/year in his last 3 seasons",
    ],
    pressure_response: "BRILLIANT YOUNG, FRAGILE OLD. At 18, Lindstrom hit .333 in the World Series against Walter Johnson — fearless, joyful, electric. He was the youngest player in WS history and he played like it was a playground game. The .480 with RISP in 1930 confirms elite performance under pressure. But the back problems and the managerial betrayal broke something. After 1931, the meteor burned out. In ILB: Lindstrom's pressure rating is age-dependent. Draft the 18-25 version and you get a fearless performer. Draft the 28+ version and you get diminishing returns.",
  },

  action_card_seeds: [
    {
      title: "The Pebble",
      type: "Game Action",
      text: "World Series Game 7, 12th inning, score tied. A routine grounder heads toward your third baseman. It hits a pebble in the dirt and bounces over his head into left field. The winning run scores. The championship is lost on a rock smaller than a dime. Your 18-year-old third baseman — who hit .333 in the series — becomes the answer to a trivia question about bad luck.",
      origin: "1924 World Series Game 7. Earl McNeely's grounder hit a pebble and bounced over Lindstrom's head, scoring the winning run for Washington. Lindstrom was 18. He had 10 hits in the Series. None of it mattered.",
    },
    {
      title: "Four Hits Off the Big Train",
      type: "Game Action",
      text: "Your 18-year-old third baseman faces the greatest pitcher who ever lived in a World Series game. He goes 4-for-5 with 2 RBI. The pitcher is Walter Johnson. Your kid is fearless. +3 confidence, +2 CLU for the rest of the series.",
      origin: "1924 WS Game 5. Lindstrom went 4-for-5 off Walter Johnson, who was 36 and pitching in the twilight of his career. Lindstrom was 18 years, 10 months old.",
    },
    {
      title: "The Stolen Throne",
      type: "Drama",
      text: "Your aging manager tells your star player: 'We're making that change. You're going to manage next year.' Then ownership gives the job to someone else. Your star demands a trade. He's gone within months. -3 team loyalty. The player never forgives the organization.",
      origin: "Giants secretary Jim Tierney told Lindstrom he'd replace McGraw. Instead, Bill Terry got the job — possibly because Lindstrom had spoken out against McGraw. Lindstrom demanded and received a trade to Pittsburgh.",
    },
    {
      title: ".480 with Runners On",
      type: "Game Action",
      text: "Your third baseman hits .480 with runners in scoring position — the highest single-season mark in MLB history. Every time a runner reaches second or third, your hitter becomes a machine. +2 CON with RISP for the entire season.",
      origin: "In 1930, Lindstrom went 59-for-123 (.480) with RISP, surpassing George Brett's famous .469 in 1980. The highest RISP batting average in baseball history.",
    },
    {
      title: "The Boy Wonder",
      type: "Action",
      text: "A 16-year-old signs a professional contract. At 18, he's in the World Series. At 22, he leads the NL in hits. At 23, he's the MVP runner-up. Before 25, he has 1,000 hits. He is the meteor — brilliant, fast, and destined to burn out before 30.",
      origin: "Lindstrom signed at 16, played in the WS at 18, led the NL in hits at 22 (1928), finished 2nd in MVP at 23. He had 1,000+ hits before turning 25. He retired at 30 due to back problems.",
    },
    {
      title: "A Kindness to Red Barber",
      type: "Drama",
      text: "A veteran player sees a young broadcaster struggling — terrified, inexperienced, not knowing any players by sight. The veteran gets up off the couch and says: 'My name's Lindstrom. I'll be glad to do the show with you.' The broadcaster never forgets. +2 legacy, +1 karma.",
      origin: "In 1934, Red Barber was a young, frightened announcer in Cincinnati who 'didn't know one major league player by sight.' Lindstrom volunteered to help him. Barber: 'I have never forgotten his kindness to a kid who was hanging on the ropes.'",
    },
    {
      title: "The Weakest Hall of Famer?",
      type: "Drama",
      text: "Your retired player is elected to the Hall of Fame — but by former teammates on the Veterans Committee, not by the writers. Charges of cronyism follow. Bill James calls him the worst player at his position in the Hall. The plaque hangs in Cooperstown but the asterisk never goes away. Is it better to be in the Hall and questioned, or out of the Hall and forgotten?",
      origin: "Lindstrom was elected in 1976 by a Veterans Committee that included former teammates Frisch and Terry. He never exceeded 4.4% on the BBWAA ballot. The selection has been called one of the weakest in HOF history.",
    },
    {
      title: "The Postmaster",
      type: "Action",
      text: "After coaching college baseball for 12 years, your former star becomes the postmaster of a quiet Midwestern suburb. He delivers mail. He's content. The World Series, the betrayal, the back problems — all behind him. Sometimes the best ending is the quiet one.",
      origin: "After coaching Northwestern baseball (1949-61), Lindstrom became postmaster of Evanston, Illinois. He served the community until retirement. He died in Chicago in 1981.",
    },
  ],

  art_direction: {
    face: "Young, handsome, all-American. 5'11\" 170 lbs — lean, athletic, quick. Age 24 in 1930 — in his prime but already carrying the weight of a man who's been in the World Series, been betrayed, and been hurt. Bright, intelligent eyes with a flicker of something wounded underneath. The face of a boy wonder who grew up too fast. Clean-cut Chicago kid — neat hair, strong jaw, the confidence of someone who hit .333 in the World Series at 18.",
    attire: "New York Giants 1930 home whites. Third baseman's stance — low, ready, compact. Or at the plate, right-handed batting stance, the place-hitter's controlled swing that produced .480 with RISP. McGraw's system made physical: efficient, disciplined, precise.",
    mood: "Brilliant but bittersweet. The card should radiate youthful talent tinged with the knowledge that it won't last. There's joy in the swing and sadness in the eyes. The mood of a meteor — incandescent and already fading. The Polo Grounds' horseshoe-shaped stands rise behind him, casting long shadows.",
    style: "Warm sepia with a slight golden glow — the card should feel like a memory of something beautiful that ended too soon. Brighter and more youthful than the other Bashers cards, but with shadows creeping in at the edges. The Polo Grounds' iconic architecture suggested in the background.",
    reference: "Think of a yearbook photo of someone who peaked in their early twenties — handsome, confident, radiating potential. But you know, looking at it now, that the peak is already past. The card should feel like nostalgia for something that was taken away too early — by a pebble, by a back injury, by politics.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + OPS+", tiers: [{ range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9", value: 0 }, { range: "10-19", value: 1 }, { range: "20-29", value: 2 }, { range: "30-39", value: 3 }, { range: "40-49", value: 4 }, { range: "50+", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "SB + range", tiers: [{ range: "0-5", value: 0 }, { range: "6-15", value: 1 }, { range: "16-30", value: 2 }, { range: "31-50", value: 3 }] },
  defense: { metric: "GG + reputation", tiers: [{ range: "No GG / poor", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "PS BA + moments", tiers: [{ range: "< .250 / no data", value: 0 }, { range: ".250-.299", value: 1 }, { range: ".300+", value: 2 }], bonus: "WS hero → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };
const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function FredLindstromCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Young, bright-eyed 3B, Giants whites, Polo Grounds, place-hitter's swing]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="CON" value={s.con} max={5} color={C.gold} /><StatBar label="POW" value={s.pow} max={5} color={C.warmRed} /><StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} /><StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "RUNS", val: d.real_stats.runs }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits }].map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1930 SEASON — .480 BA WITH RISP (MLB ALL-TIME RECORD)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1976 (Vet. Comm.)", "📊 .480 RISP (MLB Record)", "🔺 2× 231-Hit Seasons", "👶 Youngest WS Player Ever", "⚾ .333 WS BA (Age 18)", "🪨 The Pebble (1924 WS)", "🎓 Northwestern Coach", "⭐ McGraw's Top 20 Ever"].map((a, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{["leadership_style","temperament","work_ethic","lifestyle","era_adaptability","clubhouse_impact"].map(k => (<Section key={k} title={k.replace(/_/g," ")}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{t.tag}</div>))}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "LOW" ? `${C.warmRed}15` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "LOW" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Lindstrom's real life, universalized as playable cards.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Lindstrom's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}</pre>
      </div>
    </div>
  );
}
