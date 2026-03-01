// /cards/players/jim-bottomley.jsx
import { useState } from "react";

const BOTTOMLEY_DATA = {
  name: "Jim Bottomley",
  nickname: "Sunny Jim",
  year: 1928,
  team: "St. Louis Cardinals",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "180 lbs",
  born: "April 23, 1900 — Oglesby, Illinois",
  died: "December 11, 1959 — St. Louis, Missouri (age 59)",
  hof: "INDUCTED 1974 (Veterans Committee — posthumous). .310 career BA, 2,313 H, 219 HR, 1,422 RBI, 465 2B, 151 3B. NL MVP 1928. First MVP from a team's farm system. 12 RBI in one game (MLB record, 69 years). 100+ RBI six straight seasons. 2 WS rings. 'I don't have a regret in the world. If I had to do it all over again, I wouldn't change a thing.'",

  real_stats: {
    season: 1928,
    batting_avg: ".325",
    obp: ".402",
    slg: ".628",
    ops: "1.030",
    hits: 187,
    doubles: 42,
    triples: 20,
    home_runs: 31,
    rbi: 136,
    runs: 123,
    stolen_bases: 3,
    total_bases: 362,
    games: 149,
    war: 5.7,
    award: "NL Most Valuable Player",
    twenty_twenty_twenty: "42 2B / 20 3B / 31 HR — 2nd player in 20-20-20 club",
    career_batting_avg: ".310",
    career_hits: 2313,
    career_doubles: 465,
    career_triples: 151,
    career_hr: 219,
    career_rbi: 1422,
    career_runs: 1177,
    career_slg: ".500",
    rbi_record: "12 RBI in one game (Sept 16, 1924) — MLB record",
    ws_appearances: 4,
    ws_rings: 2,
    ws_career_ba: ".200",
    hundred_rbi_streak: "6 seasons (1924-1929)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1928 SEASON (MVP)
  //
  // CON: .325 BA, 187 H, .402 OBP. Career .310. Hit .371 as a rookie.
  //      .367 in 1925. Consistent .300+ hitter for a decade.
  //      Not a pure contact man (Cuyler-level) — he swung for
  //      extra bases more. But .325 is very strong.
  //      CON = 3 (STRONG — .325 with power is valuable. Not the
  //      pure contact of a .357 hitter but solid and consistent.)
  //
  // POW: 31 HR, 42 2B, 20 3B, .628 SLG, 1.030 OPS.
  //      20-20-20 club. 136 RBI (led NL). 100+ RBI six straight years.
  //      12 RBI in one game. 219 career HR. 362 TB.
  //      The power was REAL — not gap power like Cuyler, but
  //      genuine run-producing slugging. Left-handed power hitter.
  //      POW = 3 (STRONG — 31 HR in 1928 led the NL. 136 RBI.
  //      Not Gehrig/Ruth tier but a genuine middle-of-the-order
  //      power source who drove in 100+ every year.)
  //
  // SPD: 3 SB in 1928. 58 career SB. 20 3B in 1928 — that's
  //      remarkable speed for a 1B. 151 career 3B. He could run.
  //      But not a speed player. The triples were partly power
  //      and partly the era's big outfields.
  //      SPD = 2 (SOLID — faster than you'd expect from a 1B.
  //      20 triples is extraordinary but 3 SB says he didn't run
  //      on the bases. The speed was gap-to-gap, not first-to-second.)
  //
  // DEF: Branch Rickey: "By the sinews of Joshua how he could field!
  //      His reach from wrist to ankle was sublime." .988 fielding pct.
  //      8 unassisted DP in 1936 — still MLB record for 1B.
  //      DEF = 2 (GOOD — Rickey's praise is extreme but earned.
  //      The unassisted DP record suggests excellent reflexes and
  //      instincts. Not a Gold Glove caliber modern 1B but
  //      genuinely good for the era.)
  //
  // CLU: 4 WS appearances. 2 rings (1926, 1931).
  //      .345 in 1926 WS (beat Yankees). BUT:
  //      .200 career WS BA overall. .045 in 1930 WS ("a bust").
  //      The range is extreme — from hero to zero.
  //      CLU = 1 (the 1926 WS earns credit. But .200 career WS BA
  //      and .045 in 1930 keep it low. Inconsistent in October.)
  //
  // OVR: CON×2(6) + POW×1(3) + SPD×1.5(3) + DEF×0.5(1) + CLU×1.5(1.5) = 14.5 → normalized ~7
  // OVR = 7 (ALL-STAR) — Sunny Jim. The morale man. The MVP from
  // the farm system. The warmest card in the Bashers.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    con: 3,    // .325 BA, 187 H. Career .310. .371 as a rookie. Consistent .300+ hitter with power. Not pure contact — he swung hard — but reliable.
    pow: 3,    // 31 HR (led NL), 42 2B, 20 3B, .628 SLG, 136 RBI (led NL). 100+ RBI six straight years. 12 RBI in one game. Genuine middle-of-the-order slugging.
    spd: 2,    // 20 3B (remarkable for 1B) but 3 SB. 151 career 3B. Faster than expected but not a speed player. Gap-to-gap speed, not basestealing speed.
    def: 2,    // Rickey: "His reach from wrist to ankle was sublime." .988 fielding pct. 8 unassisted DP (record). Good hands, great instincts, solid first baseman.
    clu: 1,    // 4 WS, 2 rings. .345 in 1926 WS (hero). But .200 career WS BA, .045 in 1930 ("a bust"). Extreme inconsistency in October.
  },

  stat_justification: {
    con: "Bottomley hit .325 in 1928 with 187 hits. Career: .310 BA, 2,313 hits. He hit .371 as a rookie (1923, 2nd in NL behind Hornsby's .384), .367 in 1925 (2nd behind Hornsby again), and batted .300 or better consistently throughout his prime. He was not a pure contact hitter like Cuyler (.357) — Bottomley swung for extra bases and accepted a slightly lower average in exchange for power production. But .325 with 31 HR is an excellent balance. Rating of 3.",
    pow: "Bottomley hit 31 home runs in 1928, leading the NL. He added 42 doubles and 20 triples for a .628 SLG and 362 total bases. He drove in 136 runs (also led NL). He hit 100+ RBI in six consecutive seasons (1924-1929). On September 16, 1924, he drove in 12 runs in a single game — the MLB record for 69 years (6-for-6, 2 HR, 1 2B, 3 1B). He was only the second player to join the '20-20-20 club' (20+ 2B, 3B, HR). Career: 219 HR, 1,422 RBI, .500 SLG. Rating of 3.",
    spd: "Bottomley hit 20 triples in 1928 — extraordinary for a first baseman. Career: 151 triples, placing him in elite company (only 6 players ever had 150+ 2B, 3B, and HR). But he stole only 3 bases in 1928 and 58 in his career. The triples came from driving the ball into gaps in era-typical large outfields, combined with decent speed for a big man. He was not a basestealer but was faster than a typical 1B. Rating of 2.",
    def: "Branch Rickey on first seeing Bottomley: 'I noticed one thing that day, and that was that Bottomley could field. By the sinews of Joshua how he could field! His reach from wrist to ankle was sublime.' Career .988 fielding percentage. In 1936, he turned 8 unassisted double plays — still the MLB record for a first baseman. The defensive reputation was legitimate: good hands, excellent range for a 1B, and sharp instincts around the bag. Rating of 2.",
    clu: "Bottomley appeared in 4 World Series (1926, 1928, 1930, 1931) and won 2 rings (1926, 1931). In the 1926 WS against the Yankees, he hit .345 and was a key contributor as the Cardinals won their first championship. But his overall WS batting average is just .200 (18-for-90), dragged down by a catastrophic .045 in the 1930 WS against the Athletics, which Bottomley himself called 'a bust as far as hitting goes.' The inconsistency in October — hero in 1926, ghost in 1930 — earns a compromised rating. Rating of 1.",
  },

  personality: {
    leadership_style: "SUNSHINE LEADERSHIP. 'Sunny Jim' was the morale man. Bill Terry: 'Jim Bottomley was a morale man, a winner, the guy who held early St. Louis championship clubs together.' This is the rarest kind of leadership — leading through disposition, through warmth, through the simple act of being cheerful in a clubhouse full of competitors. Bottomley didn't lead by dominance (Ruth), silence (Rice), or fear (Mays). He led by making everyone around him feel better. The sunshine was the strategy.",
    temperament: "WARM, GRATEFUL, OPTIMISTIC. 'I don't have a regret in the world. If I had to do it all over again, I wouldn't change a thing. I've loved every minute of it.' This is not a man performing optimism — this is constitutional cheerfulness. He dropped out of school at 16, worked to support his family, played semi-pro for $5 a game, got lost in a taxi on his way to his tryout, and became an MVP. Every step was a gift he recognized. The warmth was earned through gratitude.",
    work_ethic: "STEADY AND PROFESSIONAL. Bottomley was not a flashy worker or a tortured perfectionist. He showed up, hit .310, drove in 100+ runs, fielded his position with grace, and went home smiling. The work ethic was RELIABLE — not dramatic, not exceptional, just present every day for 16 seasons. He was the assembly line of Cardinals offense: consistent, predictable, indispensable.",
    lifestyle: "SMALL-TOWN ILLINOIS TO HEREFORD CATTLE. Born in Oglesby, grew up in Nokomis. Dropped out at 16. Played semi-pro. Got scouted by a cop who told Branch Rickey. Took a taxi that ripped him off. Won 2 World Series. Married Betty (who ran a beauty parlor). Raised Hereford cattle in Bourbon, Missouri. Broadcast Cardinals games on radio. Scouted for the Cardinals. Died at 59. There is something deeply American about this arc — the small-town kid who found his way to the big city, did his job with a smile, and went home to raise cattle.",
    era_adaptability: "MODERATE. Bottomley's power numbers would translate well to modern baseball — 31 HR and 136 RBI are legitimate. The batting average (.325) would likely be lower in a modern context but still above average. His defensive skills at 1B are evergreen. The main question is whether his OBP (.402) would hold up against modern pitching — it's good but not elite. He'd be a solid starter on most modern teams: .280 with 25+ HR and 90+ RBI.",
    clubhouse_impact: "MAXIMUM POSITIVE. This is the most positive clubhouse card in the entire Bashers set. Where Mays is -2, Cuyler is +0, and Shocker is +1, Bottomley is +3. He made everyone around him better by making everyone around him happier. The sunshine was not trivial — it was the glue that held the Cardinals dynasty together through four World Series appearances. In ILB, Bottomley provides +2 to team morale and +1 to all teammates' offensive stats. The smile is the weapon.",
  },

  chemistry_traits: [
    { tag: "Sunny Jim", desc: "The warmest card in the Bashers. Bottomley's cheerful disposition elevated every teammate. In ILB, all teammates within +/-1 lineup positions receive +1 to offensive stats. The sunshine radiates. Bill Terry: 'The guy who held early St. Louis championship clubs together.'" },
    { tag: "The Twelve-RBI Game", desc: "September 16, 1924: 12 RBI in one game — MLB record for 69 years. 6-for-6 (2 HR, 1 2B, 3 1B). In ILB, once per season Bottomley may have a TWELVE game: on a d20 roll of 20, his RBI output in a single game is uncapped. The ceiling disappears. Everything he touches drives in a run." },
    { tag: "The Farm System First", desc: "First MVP to emerge from a team's own farm system (Branch Rickey's Cardinals). A local cop saw him playing semi-pro for $5/game and called Rickey. In ILB, Bottomley costs less to acquire than his OVR suggests — the farm system discount. Found talent, not bought talent." },
    { tag: "Twenty-Twenty-Twenty", desc: "1928: 42 2B, 20 3B, 31 HR — only the 2nd player to reach 20 in all three extra-base hit categories. In ILB, Bottomley has +1 to extra-base hit probability across ALL types. He doesn't specialize — he hits every kind of extra-base hit equally." },
    { tag: "The Taxi Ride", desc: "When invited to try out for the Cardinals, Bottomley didn't know where Cardinal Field was. His taxi driver took him on a joy ride through St. Louis, running up the fare. He made the team anyway. In ILB, Bottomley has +1 to performance in unfamiliar situations. The man who got lost found his way." },
    { tag: "Hornsby's Shadow", desc: "Bottomley hit .371 as a rookie — and finished 2nd to Hornsby (.384). Hit .367 in 1925 — 2nd to Hornsby again. In ILB, when an OVR 10+ teammate is present, Bottomley's stats appear less impressive but his actual production doesn't change. The sunshine exists even in another star's shadow." },
    { tag: "October Inconsistency", desc: "4 WS: .345 (1926), .214 (1928), .045 (1930), .133 (1931). The range from hero to ghost in October. In ILB, Bottomley's WS performance is VOLATILE — d6 each WS game: 1-2 = cold (.100), 3-4 = average (.250), 5-6 = hot (.350). You never know which Sunny Jim shows up in October." },
    { tag: "The Cattle Rancher", desc: "After baseball, Bottomley raised Hereford cattle in Bourbon, Missouri. The WS winner's share from 1926 became the seed money. In ILB, Bottomley has +1 to post-career contentment. 'I don't have a regret in the world.' The happiest ending in the Bashers." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / HOME", note: "1922-1932. 11 seasons. 4 pennants. 2 WS rings. .310 BA. The place where Sunny Jim became Sunny Jim." },
    { location: "Ebbets Field, Brooklyn", affinity: "HISTORIC", note: "September 16, 1924: 12 RBI. 6-for-6. The record that stood for 69 years. Against the team managed by the man whose record he broke." },
    { location: "The Cleanup Spot", affinity: "MAXIMUM", note: "100+ RBI six straight years batting cleanup. The most productive slot in the Cardinals' order. Bottomley owned it." },
    { location: "Bourbon, Missouri", affinity: "HOME / RETIREMENT", note: "Raised Hereford cattle. The WS money became farm money. The happiest ending." },
  ],

  momentum: {
    hot_triggers: [
      "Bases loaded — Bottomley was an RBI machine. 12 in one game. The more runners on base, the more dangerous he became.",
      "Team chemistry — Bottomley fed on good vibes. When the clubhouse was happy, he was happiest. The sunshine was self-reinforcing.",
      "Regular season production — 6 straight 100+ RBI years. Bottomley was a metronome of production from April to September.",
      "Left-handed matchups — as a lefty hitter, Bottomley crushed right-handed pitching consistently throughout his career.",
    ],
    cold_triggers: [
      "October pressure — .200 career WS BA. .045 in 1930. The sunshine dimmed when the stakes were highest. Not always — .345 in 1926 — but too often.",
      "Elite competition — Hornsby overshadowed him constantly. Bottomley's .371 looked ordinary next to .384. The shadow was real.",
      "Late career decline — after 1929, the numbers dropped steadily. 29 HR became 15 became 11. The sunshine aged like everyone else.",
      "Manager changes — Bottomley thrived under consistent management but struggled when teams were in flux.",
    ],
    pressure_response: "WARM IN THE REGULAR SEASON, UNRELIABLE IN OCTOBER. Bottomley's regular-season consistency (6× 100+ RBI, .310 career BA) was exemplary. But the WS record (.200 career BA, .045 in 1930) reveals a player who sometimes could not translate his sunshine into October production. The 1926 WS (.345) proves he COULD do it. The 1930 WS (.045) proves he sometimes couldn't. CLU = 1 reflects the overall inconsistency, but the upside is always present.",
  },

  action_card_seeds: [
    {
      title: "Twelve",
      type: "Record / Signature Moment",
      text: "September 16, 1924. Ebbets Field, Brooklyn. Your first baseman bats in the first inning with the bases loaded. Single — two RBI. Second inning: double — one RBI. Fourth inning: grand slam — four RBI. Sixth inning: two-run homer — two RBI. Seventh inning: single — two RBI. Ninth inning: single — one RBI. Six-for-six. Twelve runs batted in. The major league record. It will stand for sixty-nine years. The manager of the opposing team, Wilbert Robinson, held the previous record of eleven. He watches from the other dugout as your first baseman breaks it. Your first baseman is smiling. He is always smiling.",
      origin: "Bottomley's 12-RBI game, September 16, 1924 vs Brooklyn. MLB record until tied by Mark Whiten in 1993.",
    },
    {
      title: "The Taxi",
      type: "Origin / Comedy",
      text: "Your first baseman has been invited to try out for the St. Louis Cardinals. He is from a small town in Illinois. He does not know where Cardinal Field is. He takes a taxi. The taxi driver, sensing uncertainty, takes the young man on a tour of St. Louis. The meter runs. The fare climbs. Eventually, your first baseman arrives at the ballpark, lighter in the wallet, heavier in the knowledge of St. Louis geography. He makes the team. He wins two World Series. He becomes the MVP. The taxi driver is never identified. It is the most expensive and productive cab ride in baseball history.",
      origin: "Bottomley's first trip to St. Louis — the taxi driver took him on a joy ride because he didn't know where the ballpark was.",
    },
    {
      title: "The Cop and the Scout",
      type: "Origin / Discovery",
      text: "A local police officer watches a young man play semi-professional baseball for five dollars a game in small-town Illinois. The officer is impressed enough to contact Branch Rickey, the general manager of the St. Louis Cardinals. Rickey sends a scout. The scout watches the young man hit line drives and field grounders with hands that stretch 'from wrist to ankle.' The Cardinals sign him. He becomes the first Most Valuable Player to emerge from a team's own farm system. The officer's name is lost to history. The young man's name is Sunny Jim.",
      origin: "A local police officer recommended Bottomley to Branch Rickey. First farm-system-produced MVP.",
    },
    {
      title: "Sunny Jim",
      type: "Character / Core",
      text: "They called him Sunny Jim because of his disposition. Not his batting average, not his home runs, not his RBI records — his DISPOSITION. In a clubhouse full of competitors, egos, and pressure, your first baseman smiled. Bill Terry: 'Jim Bottomley was a morale man, a winner, the guy who held early St. Louis championship clubs together.' The sunshine was not trivial. The sunshine was the structure. Remove the sunshine and the Cardinals don't win four pennants. Remove the sunshine and the clubhouse fractures. The bat drove in 1,422 runs. The smile held together a dynasty.",
      origin: "Bottomley's nickname 'Sunny Jim' — earned through constitutional cheerfulness and team-building warmth.",
    },
    {
      title: "A Bust",
      type: "Failure / Honesty",
      text: "1930 World Series. Your first baseman hits .045. One hit in twenty-two at-bats. The Cardinals lose to the Philadelphia Athletics. After the series, your first baseman says: 'A bust as far as hitting goes.' He does not make excuses. He does not blame the pitching. He does not hide behind team losses. He says: 'A bust.' And then he comes back the next year and helps the Cardinals win the 1931 World Series. This is what Sunny Jim means — not that the sun never sets, but that it always rises again.",
      origin: "Bottomley's .045 BA in the 1930 WS. His honest self-assessment. His redemption in 1931.",
    },
    {
      title: "No Regrets",
      type: "Legacy / Epitaph",
      text: "'I don't have a regret in the world. If I had to do it all over again, I wouldn't change a thing. I've loved every minute of it.' Your first baseman said this after his career ended. He moved to Bourbon, Missouri. He raised Hereford cattle with the World Series money. He broadcast Cardinals games on the radio. He scouted for the team that found him. He died in 1959 at fifty-nine. He was inducted into the Hall of Fame in 1974 — fifteen years after his death, eighteen years before the plaque went up. He was not there to see it. But he would have smiled.",
      origin: "Bottomley's personal philosophy — no regrets. Post-career in Bourbon, MO. HOF 1974 (posthumous).",
    },
  ],

  art_direction: {
    face: "6'0\" 180 lbs — tall, lean, handsome in a Midwestern way. THE SMILE. The face must be SMILING — not grinning, not laughing, but warmly, genuinely smiling. This is the defining feature. Brown eyes that are bright and engaged. A face that makes you feel welcome. The cap should be slightly cocked — a Bottomley signature. There is no darkness in this face. There is no hidden sorrow. This is a man who loved every minute of it.",
    attire: "St. Louis Cardinals 1928 home whites. In a left-handed batting stance — the bat back, weight shifting, about to drive the ball into a gap. Or: stretching at first base, reaching for a throw, the reach 'from wrist to ankle' that amazed Rickey. The uniform should look WORN but CLEAN — Bottomley played hard but looked sharp. The Cardinals' bird-on-bat logo should be visible.",
    mood: "WARM SUNSHINE. This is the warmest card in the Bashers — not hot, not golden, not amber — WARM. The warmth of a sunny afternoon at Sportsman's Park when the Cardinals are winning and the cleanup hitter is driving in his hundredth run of the season. The mood is CONTENTMENT — the satisfaction of a man who dropped out of school at sixteen, found baseball, and loved every minute. No shadows on this card. No weight. Just light.",
    style: "Full color — Bashers era — BRIGHT AND WARM. Cardinals red, warm gold, sunshine yellow, cream white. This is the brightest, warmest card in the set — the visual opposite of Mays's black pitch and Shocker's held breath. The border should be CARDINALS RED — deep, warm, the red of the bird on the bat. THE SUNSHINE — the card that makes you smile back. The only card in the Bashers you'd hang on a child's wall. The warmest object in the constellation.",
    reference: "Ruth is the solar system. Gehrig is the axis. Mays is the black pitch. Shocker is the held breath. Bottomley is THE SUNSHINE — the warmth that holds the Cardinals together, the smile that makes the dynasty possible. He is the lightest card in the Bashers but not the weakest. The sunshine is structural. Remove it and the building falls. The card should feel like holding something warm on a cold day.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", cardRed: "#c41e3a", sunGold: "#daa520", sunYellow: "#f4d03f", warmCream: "#fff5e1" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.sunGold}15`, border: `1px solid ${C.sunGold}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.cardRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.cardRed, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.cardRed}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JimBottomleyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = BOTTOMLEY_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.cardRed} 0%, ${C.sunGold}40 50%, ${C.cardRed} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sunYellow, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Sunshine</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.cardRed}`, boxShadow: `0 0 0 2px ${C.sunGold}, 0 0 30px ${C.sunGold}30, 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.cardRed}, ${C.sunGold}, ${C.cardRed})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.sunGold}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.warmCream}, ${C.sunYellow}15, ${C.cardRed}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>☀️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.cardRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE SUNSHINE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.cardRed, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.sunGold}ee`, color: C.ink, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.cardRed}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • NL MVP 1928 • HOF</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.cardRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.sunGold} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.medBrown} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.cardRed}, ${C.sunGold}cc)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OPS", val: d.real_stats.ops },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "H", val: d.real_stats.hits },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.cardRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1928 NL MVP — 20-20-20 CLUB (42 2B / 20 3B / 31 HR) — LED NL IN HR & RBI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.cardRed}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.cardRed}20` }}>
              {[{ label: "CAR AVG", val: ".310" },{ label: "CAR H", val: "2,313" },{ label: "CAR HR", val: "219" },{ label: "CAR RBI", val: "1,422" },{ label: "100 RBI", val: "6 yr" },{ label: "WS RINGS", val: "2" },{ label: "WS BA", val: ".200" },{ label: "HOF", val: "✓" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.cardRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.sunGold}15`, border: `1px solid ${C.sunGold}30`, borderRadius: 4, padding: 8, marginTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: C.sunGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 4, textAlign: "center" }}>MLB RECORD — SEPTEMBER 16, 1924</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {[{ label: "RBI", val: "12" },{ label: "H", val: "6/6" },{ label: "STOOD", val: "69 yrs" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.sepia }}>{s.label}</div><div style={{ fontSize: 16, fontWeight: 900, color: C.cardRed, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div></div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["☀️ Sunny Jim", "🏆 2× WS Champion", "🏅 1928 NL MVP", "📊 12 RBI Game (Record)", "🌾 Farm System First", "🐄 Hereford Rancher", "💪 6× 100+ RBI", "😊 No Regrets"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.sunGold}10`, border: `1px solid ${C.sunGold}25`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.cardRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE SUNSHINE</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.cardRed}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.cardRed : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.cardRed : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key.replace(/_/g, " ")}><p style={{ margin: 0 }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.cardRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : l.affinity.includes("HISTORIC") ? `${C.sunGold}20` : `${C.cardRed}20`, color: l.affinity.includes("HOME") ? C.traitGreen : l.affinity.includes("HISTORIC") ? C.sunGold : C.cardRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.cardRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.sunGold}05`, border: `1px solid ${C.sunGold}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Record") ? `${C.sunGold}20` : a.type.includes("Failure") ? `${C.warmRed}20` : `${C.cardRed}15`, color: a.type.includes("Record") ? C.sunGold : a.type.includes("Failure") ? C.warmRed : C.cardRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.cardRed}, ${C.sunGold}, ${C.cardRed})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team} • HOF</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
