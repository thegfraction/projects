// /cards/players/george-burns.jsx
import { useState } from "react";

const BURNS_DATA = {
  name: "George Burns",
  nickname: "Tioga George",
  year: 1926,
  team: "Cleveland Indians",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "1B",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "180 lbs",
  born: "January 31, 1893 — Niles, Ohio",
  died: "January 7, 1978 — Kirkland, Washington (age 84)",
  hof: "NOT INDUCTED. Burns believed he belonged in Cooperstown. Career .307 BA, 2,018 H (3rd among AL RHH at retirement), 444 2B, 1926 AL MVP. 35.0 career WAR. The 1926 MVP who was never honored. 'Throughout the rest of his life Burns maintained that he belonged in Cooperstown. The numbers tell a different story.' Or do they?",

  real_stats: {
    season: 1926,
    batting_avg: ".358",
    obp: ".394",
    slg: ".494",
    ops: ".888",
    hits: 216,
    runs: 97,
    doubles: 64,
    triples: 3,
    home_runs: 4,
    rbi: 115,
    walks: 42,
    strikeouts: "~30",
    stolen_bases: 12,
    war: 5.2,
    career_batting_avg: ".307",
    career_obp: ".354",
    career_slg: ".429",
    career_ops: ".783",
    career_hits: 2018,
    career_hr: 72,
    career_rbi: 954,
    career_2b: 444,
    career_sb: 154,
    career_war: 35.0,
    ops_plus: 113,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1926 SEASON (MVP)
  //
  // CON: .358 BA, .394 OBP, 216 H (led AL), 12 consecutive .300 seasons (1918-27 excluding partial years).
  //      Career .307. Led AL in hits twice. Line drive hitter. Not flashy, just relentless contact.
  //      CON = 4 (EXCELLENT — a tier below the .400 hitters but rock-solid, league-leading contact).
  //
  // POW: 64 2B (MLB record at the time, still RHH record). But only 4 HR, .494 SLG.
  //      Career: 444 2B but only 72 HR. Enormous gap power — doubles machine — but zero HR power.
  //      The 64-double record makes him unique, but the OVR reflects total offensive package.
  //      POW = 2 (elite doubles power, near-zero home run power — a specialized profile).
  //
  // SPD: 12 SB in 1926. 154 career SB. Not fast but not slow — average runner.
  //      Completed an unassisted triple play at 1B which required him to RUN to 2B and slide.
  //      SPD = 1 (average, not a weapon but not a liability).
  //
  // DEF: Solid defensive 1B. Set AL record with 109 DP at 1B (1918). 1,671 career games at 1B
  //      (most by AL RHH at the time). Led AL in various defensive categories multiple times.
  //      BUT: also led AL in errors at 1B four times. Plus turned unassisted triple play.
  //      DEF = 1 (solid, occasionally spectacular, occasionally error-prone).
  //
  // CLU: 1920 WS — doubled home Speaker for only run in 1-0 Game 6 win. Speaker: "He told me
  //      he was going to do it." Won 2 WS rings (1920 Indians, 1929 A's). Clutch pinch-hitter.
  //      But only 2 WS appearances in 16 seasons, limited sample.
  //      CLU = 1 (the Game 6 double is enormous, plus clutch PH reputation).
  //
  // OVR: CON×2(8) + POW×2(4) + SPD×0.5(0.5) + DEF×0.5(0.5) + CLU×1.5(1.5) = 14.5 → normalized ~7
  // OVR = 7 (ALL-STAR) — the perfect closer for the set. An MVP who wasn't quite HOF.
  // The connector card — touches every other card in the set through shared history.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    con: 4,    // .358 BA in MVP season. .307 career. Led AL in hits twice. 12 consecutive .300 seasons. Line drive machine. Relentless contact hitter — not spectacular, but unyielding.
    pow: 2,    // 64 2B (MLB record). But 4 HR. Career: 444 2B, 72 HR. The most extreme doubles-to-homers ratio in the set. He hit line drives that found the gaps. He never hit line drives that left the park.
    spd: 1,    // Average. 12 SB in 1926, 154 career. Not a weapon, not a liability. Fast enough to complete an unassisted triple play by running from 1B to 2B and sliding in ahead of the runner.
    def: 1,    // Solid 1B. Set AL record 109 DP (1918). 1,671 career games at 1B. But also led AL in errors 4×. Turned unassisted triple play (first by a 1B). Inconsistent but capable of brilliance.
    clu: 1,    // 1920 WS: doubled home Speaker for only run in 1-0 Game 6 win. "He told me he was going to do it." 2 WS rings. Known as clutch pinch-hitter. But limited postseason sample.
  },

  stat_justification: {
    con: "George Burns hit .358 with 216 hits (leading the AL) in his 1926 MVP season. He hit .300 or better in all but one of his full seasons between 1918 and 1927 — an extraordinary run of consistency. His career .307 BA put him 3rd among AL right-handed hitters at retirement, behind only Lajoie and Heilmann. He led the AL in hits twice (1918, 1926). He was a line drive hitter who made relentless, methodical contact — not flashy, but deeply reliable. Rating of 4.",
    pow: "The 64 doubles in 1926 set a major league record (broken by Earl Webb in 1931, but Burns still co-holds the RHH record with Joe Medwick). He hit 444 career doubles. But he hit only 4 home runs in 1926 and 72 in his entire career. His .494 SLG in the MVP season was good but not elite for the era. Burns was the most extreme doubles hitter of his generation — enormous gap power, near-zero over-the-fence power. Rating of 2.",
    spd: "Burns stole 12 bases in 1926 and 154 for his career — respectable but not a weapon. He was fast enough to complete the unassisted triple play, running from first base to second and sliding in ahead of the runner. He was not the 'slowest great hitter' like Heilmann. He was average. Rating of 1.",
    def: "Burns was a solid defensive first baseman who set an AL record with 109 double plays in 1918. He played 1,671 career games at first base — the most by an AL right-handed player until 1940. He turned an unassisted triple play in 1923 — only the third in AL history and the first by a first baseman. But he also led the AL in errors at first base four times. He was capable of brilliance and prone to mistakes. Rating of 1.",
    clu: "In the 1920 World Series, with the Indians up 3-2 in the series and the score 0-0 in the sixth inning, Burns doubled home Tris Speaker for the only run in a 1-0 Game 6 win, giving Cleveland a 4-2 series lead. Speaker later said Burns told him beforehand he was going to do it. Burns won two World Series rings (1920 Indians, 1929 A's) and was known as a clutch pinch-hitter. But his postseason sample is small. Rating of 1.",
  },

  personality: {
    leadership_style: "THE JOURNEYMAN'S DIGNITY. Burns played for five teams over sixteen seasons. He was traded, sold, waived, and reacquired. He never complained. He showed up, hit .300, and moved on. His leadership was the leadership of a man who understood that he was always one transaction away from somewhere else — so he made himself useful wherever he was. He gave Joe Sewell his own bat. He pinch-hit in crucial moments. He played behind Doc Johnston without bitterness. He was the player every team needed and no team kept.",
    temperament: "Steady, professional, slightly aggrieved. Burns spent the rest of his life believing he belonged in the Hall of Fame. He wasn't wrong to feel that way — 2,018 hits, a record 64 doubles, an MVP, two World Series rings, an unassisted triple play. But the numbers, in the cold light, aren't quite enough. He was the kind of player whose value was always slightly more than what the statistics showed — the kind who gave his bat to a teammate and watched that teammate become immortal.",
    work_ethic: "SURVIVOR. Bill James documented Burns's 1915-1917 stretch: malaria, typhoid fever, appendectomy, broken ankle, broken shoulder blade from diving into a swimming pool. He came back from all of it. He hit .352 his first healthy season (1918). He worked as a sheriff after baseball. He was built to endure.",
    lifestyle: "Niles, Ohio to everywhere. Burns lived in Tioga, Pennsylvania. He played in Detroit, Philadelphia, Cleveland, Boston, New York. He managed in the Pacific Coast League — San Francisco, Seattle, Portland. He became a sheriff. He died in Kirkland, Washington, at 84 — far from where he started, far from where he played, still believing he deserved the plaque.",
    era_adaptability: "HIGH. Burns's profile — line drive contact hitter, doubles machine, solid defensive first baseman — would translate well to modern baseball. His 64-double season would be remarkable in any era. His lack of home run power would limit his modern value, but his contact rate and gap ability would make him a useful everyday player. He'd be an analytics darling — high BABIP, elite doubles rate, solid OBP.",
    clubhouse_impact: "THE CONNECTOR. This is Burns's ultimate value — not as a player, but as a person who connects everything. He gave Sewell 'Black Betsy.' He pinch-hit in Coveleski's game. He doubled home Speaker. He was Heilmann's teammate in Detroit. He was traded for Wambsganss. He got the first hit in Yankee Stadium. He won rings with two different dynasties. In ILB, Burns is the card that links every other card in the set. He is the connective tissue.",
    dark_side: "THE PLAQUE THAT NEVER CAME. Burns believed he deserved Cooperstown. He signed autographs with lengthy inscriptions listing every team he played for, as if compiling the evidence. 'The numbers tell a different story,' the analysts say. But do they? 2,018 hits. An MVP. A record. Two rings. An unassisted triple play. A bat that a Hall of Famer used for fourteen years. Burns was the kind of player who existed in the space between great and immortal — close enough to see Cooperstown, never quite close enough to enter. In ILB, this becomes 'The Missing Plaque' — Burns's OVR cannot exceed 7, regardless of performance. The Hall won't have him. The ceiling is fixed.",
  },

  chemistry_traits: [
    { tag: "Sixty-Four Doubles", desc: "64 2B in 1926 — MLB record (broken 1931, still co-holds RHH record). In ILB, Burns's doubles probability is +3. When he hits a ball in play, it finds the gap. The gap is his home." },
    { tag: "Sewell's Bat", desc: "Burns gave Joe Sewell his own bat — 'Black Betsy' — which Sewell used for his entire 14-year career, striking out only 114 times. In ILB, when Burns and Sewell are on the same team, both get +1 CON. The bat connects them across time." },
    { tag: "The Unassisted Triple Play", desc: "September 14, 1923: Burns caught a line drive, tagged a runner, and ran to second base — sliding in ahead of the third runner. First unassisted triple play by a 1B. In ILB, once per season, Burns can attempt a UTP: d20, on 20 = triple play. On 1 = error." },
    { tag: "Coveleski's Pinch-Hitter", desc: "August 2, 1920: Burns pinch-hit during a Coveleski start and drove in 2 runs. In ILB, when Burns pinch-hits for any pitcher, +2 to the at-bat. He was born for this role." },
    { tag: "The Connector", desc: "Burns played with Heilmann (Detroit), Coveleski and Sewell (Cleveland), on the 1920 WS team, got the first hit in Yankee Stadium (Ruth's house), and was traded for Wambsganss. In ILB, Burns provides +1 to any team containing 2+ other Bashers. He is the thread." },
    { tag: "The Missing Plaque", desc: "Burns believed he belonged in Cooperstown. He never made it. In ILB, Burns's OVR is capped at 7 — he cannot be upgraded past this ceiling regardless of performance. Close enough to see it. Never close enough to enter." },
    { tag: "Five Teams, Two Rings", desc: "DET, PHA, CLE, BOS, NYY — and two World Series championships (1920, 1929). In ILB, Burns adapts to any roster without chemistry penalty. He has played everywhere. He fits everywhere." },
    { tag: "The Sheriff", desc: "After baseball, Burns became a sheriff. In ILB, Burns provides +1 to team discipline and -1 to opponent's hidden plays (hidden ball tricks, stolen signs). The law is watching." },
  ],

  preferred_locations: [
    { location: "League Park / Dunn Field, Cleveland", affinity: "MAXIMUM", note: "MVP season (1926). 64 doubles. 216 hits. Seven seasons total with the Indians. The place where he was finally the everyday player." },
    { location: "The Doubles Alley", affinity: "MAXIMUM", note: "Any gap between outfielders. Burns found the alley 64 times in 1926. 444 times in his career. The gap is his cathedral." },
    { location: "Yankee Stadium", affinity: "HISTORIC", note: "Got the first hit in Yankee Stadium history (April 18, 1923). Also the first runner caught stealing there. He christened the cathedral and was immediately thrown out." },
    { location: "Fenway Park, Boston", affinity: "HIGH", note: "Turned the unassisted triple play here (September 14, 1923). Two solid seasons with the Red Sox (.306, .328)." },
    { location: "Shibe Park, Philadelphia", affinity: "ORIGIN (Pro)", note: "Where he first became a regular. Hit .352 in 1918. The hometown fans loved that Connie Mack brought a local kid home." },
  ],

  momentum: {
    hot_triggers: [
      "Doubles — when the gaps are open and Burns is lining drives, he is unstoppable. 64 in one season.",
      "Pinch-hitting — Burns was known as one of the best clutch pinch-hitters in the AL. He elevated off the bench.",
      "Proving himself — traded five times, Burns was always motivated to show the new team he belonged.",
      "Tris Speaker's confidence — Speaker used Burns as his clutch weapon. The trust was earned and reciprocated.",
    ],
    cold_triggers: [
      "Illness/injury — malaria, typhoid, appendectomy, broken ankle, broken shoulder. 1915-17 was a nightmare.",
      "Bench time — Burns was a backup in 1920-21 behind Doc Johnston. Reduced playing time dulled his edge.",
      "Home run situations — Burns could not hit the ball over the fence. 4 HR in his MVP season. In HR-or-bust moments, he was limited.",
      "Legacy awareness — the slow realization that the Hall would never call. The accumulating disappointment.",
    ],
    pressure_response: "CLUTCH WHEN CALLED UPON. Burns's defining clutch moment is the 1920 WS Game 6 double — the only run in a 1-0 win that gave Cleveland the series lead. Speaker said Burns told him beforehand: 'If Spoke and the boys will give me one run, Cleveland will win.' He was a pinch-hitter by nature and by necessity — a man who came off the bench in big moments and delivered. CLU = 1 reflects a small sample, but the quality of that sample is extraordinary.",
  },

  action_card_seeds: [
    {
      title: "Sixty-Four",
      type: "Season Arc",
      text: "Your first baseman hits sixty-four doubles in a single season. It is more than any player in the history of baseball has ever hit. He leads the league in hits. He drives in 115 runs, second only to Babe Ruth. They name him the Most Valuable Player in the American League. It is the greatest season of his life. He is thirty-three years old. He will never be inducted into the Hall of Fame.",
      origin: "1926: Burns set the MLB record with 64 doubles, led AL in hits (216), drove in 115 RBI (2nd to Ruth), won AL MVP. Not inducted into HOF.",
    },
    {
      title: "Black Betsy",
      type: "Legacy",
      text: "After shortstop Ray Chapman dies from a pitch to the skull, the Cleveland Indians bring up a twenty-two-year-old from the minors to replace him. His name is Joe Sewell. He has never played in the major leagues. Your first baseman gives the kid one of his own bats. Sewell names it 'Black Betsy.' He uses it for fourteen years. He strikes out one hundred and fourteen times in his entire career. The bat that Burns gave away becomes more famous than anything Burns ever did with a bat of his own.",
      origin: "Burns gave Sewell a bat upon his arrival in 1920. Sewell used 'Black Betsy' for his entire 14-year career, striking out only 114 times. Cross-links to Sewell and Chapman.",
    },
    {
      title: "The Triple Play",
      type: "Game Action",
      text: "September 14, 1923. Line drive. Your first baseman catches it. One out. He turns. The runner off first hasn't retreated. Tag. Two outs. The runner from third is scrambling back to second. Your first baseman RUNS — a first baseman running sixty feet from first to second base — and slides into the bag ahead of the runner. Three outs. Unassisted. The first by a first baseman in major league history. The crowd at Fenway Park goes silent, then erupts. January: Burns is traded back to Cleveland. In the deal: Bill Wambsganss, who turned the only unassisted triple play in World Series history.",
      origin: "September 14, 1923: Burns's UTP vs Cleveland. First by a 1B. Traded back to CLE in January 1924 in a deal involving Wambsganss (1920 WS UTP).",
    },
    {
      title: "The First Hit",
      type: "Historic",
      text: "April 18, 1923. Yankee Stadium opens. Seventy-four thousand, two hundred people. Babe Ruth's cathedral. The first official hit in the history of the building belongs to your first baseman — a single off Bob Shawkey into left field. A few pitches later, your first baseman is thrown out trying to steal second base. He is the first man to get a hit in Yankee Stadium and the first to be caught stealing there. He christens the temple and is immediately expelled from it.",
      origin: "Burns singled for the first hit in Yankee Stadium history on Opening Day 1923, then was caught stealing — both firsts.",
    },
    {
      title: "Speaker's Gamble",
      type: "Game Action",
      text: "1920 World Series, Game 6. Score: 0-0 in the sixth inning. Cleveland leads the series 3-2. Tris Speaker is on first base. Your first baseman steps in against Brooklyn's Sherry Smith. Before the at-bat, your first baseman told Speaker: 'If Spoke and the boys will give me one run, Cleveland will win.' He drives the ball between the outfielders, all the way to the left-field wall. Speaker scores. 1-0. That is the final score. Cleveland takes a 4-2 series lead and wins the championship the next day. The only run came from the backup first baseman who told the manager it would happen before it did.",
      origin: "1920 WS Game 6: Burns doubled home Speaker for the only run in a 1-0 CLE win. Burns had told Speaker beforehand he'd deliver.",
    },
    {
      title: "The Fire",
      type: "Comedy",
      text: "Detroit, August 1915. Your first baseman fouls a pitch into the grandstand. The ball strikes a patron in his coat pocket. Inside the coat pocket: a book of matches. The matches ignite. Smoke rises from the man's coat. 'There's a man on fire here,' someone yells. Your first baseman takes ball four and walks to first base while a fan tries to remove his burning jacket. The game continues.",
      origin: "An actual 1915 incident: Burns's foul ball hit a man's coat pocket containing matches, starting a small fire in the stands.",
    },
    {
      title: "The Survivor",
      type: "Character",
      text: "Between 1915 and 1917, your first baseman contracts malaria. Then typhoid fever. Then has an appendectomy. Then breaks his ankle. Then breaks his shoulder blade diving into a swimming pool. In 1918, the first fully healthy season, he hits .352 and leads the American League in hits. He will play twelve more years. He was built to endure everything except the Hall of Fame vote.",
      origin: "Bill James documented Burns's 1915-17 illness/injury gauntlet. He came back to lead the AL in hits in 1918 (.352).",
    },
    {
      title: "The Inscription",
      type: "Legacy",
      text: "After baseball, your first baseman signs autographs on index cards. He adds lengthy inscriptions listing every team he played for. Detroit. Philadelphia. Cleveland. Boston. New York. Cleveland again. Philadelphia again. New York again. He is compiling the evidence. He is building the case. He believes he belongs in Cooperstown. The case is strong. The case is not strong enough. He dies at eighty-four in Kirkland, Washington, still waiting for the call.",
      origin: "Burns signed autographs with lengthy inscriptions detailing his career. He believed he deserved the HOF throughout his life. He was never inducted.",
    },
  ],

  art_direction: {
    face: "6'1\" 180 lbs — tall, lean, workmanlike. Not handsome, not ugly — USEFUL. A face that belongs in a lineup but not on a poster. This is the face of a man who played for five teams and was welcomed by all of them. Steady, professional, slightly weathered. The eyes should suggest someone who has seen a lot of cities and a lot of clubhouses.",
    attire: "Cleveland Indians 1926 home whites. In the follow-through of a doubles swing — the bat extended, the ball already in the gap, the body rotating through. Or: at first base, stretching for a throw, the ball about to arrive. The uniform should be clean but lived-in — Burns was a professional, not a showman.",
    mood: "CONNECTIVE WARMTH. This card should feel like the thread that stitches the entire Bashers set together. Where Ruth blazes and Gehrig anchors and Coveleski descends, Burns simply CONNECTS. The mood is the mood of a clubhouse after a win — not the hero's celebration but the quiet satisfaction of the guy who drove in the winning run off the bench. The mood of a man who gave his bat to a kid and watched the kid become a legend.",
    style: "Full color — Bashers era — but MODERATE. Cleveland colors: navy, red, white. But the dominant tone is WARM BROWN — the color of a well-used bat, a well-worn glove, a well-traveled suitcase. Not as dark as Coveleski, not as golden as Heilmann, not as bright as Ruth. BETWEEN. Burns exists between all of them. The border should be a warm, worn leather brown — the color of 'Black Betsy,' the bat he gave away. The color of connection.",
    reference: "Ruth is the solar system. Gehrig is the axis. Coveleski is the mineshaft. Heilmann is the radio. Burns is THE THREAD — the stitch that holds the entire quilt together. He touched every card in the set. He touched every team in the league. He gave away the most famous bat in the history of contact hitting. His card should feel like the final piece of a puzzle — the one that makes all the other pieces make sense. Card #10 of 10. The set is complete.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", clevNavy: "#0c2340", clevRed: "#c8102e", leather: "#8b6c42" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.leather}10`, border: `1px solid ${C.leather}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.clevNavy, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.leather}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function GeorgeBurnsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = BURNS_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.darkBrown} 0%, #1a1510 50%, ${C.darkBrown} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.leather, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — CARD 10 OF 10</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.leather}`, boxShadow: `0 0 0 2px ${C.darkBrown}, 0 0 20px ${C.leather}30, 0 10px 36px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.clevNavy}, #1a2030, ${C.clevNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.leather}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.leather}15, ${C.sepia}08, ${C.gold}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🧵</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE THREAD</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.clevNavy, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.clevRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.clevNavy}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • 10 OF 10</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.leather} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.coldBlue} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.clevNavy}, #1a2030)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1926 AL MVP — 64 2B (MLB RECORD) — 216 H (LED AL) — 115 RBI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.leather}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.leather}20` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_batting_avg },{ label: "CAR H", val: "2,018" },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WS RINGS", val: "2" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.clevNavy, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1926 AL MVP", "📊 64 2B (MLB Record)", "🏅 2× WS Champion", "⚾ Unassisted Triple Play", "🏟️ 1st Hit in Yankee Stadium", "🦇 Gave Sewell 'Black Betsy'", "🔗 5 Teams / 16 Seasons", "❌ Not in Hall of Fame"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.leather}10`, border: `1px solid ${C.leather}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — CARD 10 OF 10</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.leather}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.clevNavy : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.clevNavy : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HISTORIC" ? `${C.warmRed}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.coldBlue}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HISTORIC" ? C.warmRed : l.affinity === "HIGH" ? C.traitGreen : C.coldBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Burns's real life — the final pieces of the Bashers puzzle.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.leather}05`, border: `1px solid ${C.leather}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.sepia}20` : a.type === "Comedy" ? `${C.gold}30` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.clevNavy}, #1a2030, ${C.clevNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team} • 10/10</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
