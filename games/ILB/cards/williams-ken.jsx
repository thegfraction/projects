// /cards/players/ken-williams.jsx
import { useState } from "react";

const WILLIAMS_DATA = {
  name: "Ken Williams",
  nickname: "The First 30-30 Man",
  year: 1922,
  team: "St. Louis Browns",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "LF",
  bats: "L",
  throws: "R",
  height: '6\'0"',
  weight: "170 lbs",
  born: "June 28, 1890 — Grants Pass, Oregon",
  died: "January 22, 1959 — Grants Pass, Oregon (age 68)",
  hof: "Not inducted. Strong statistical case: .319 career BA (60th all-time), .530 SLG (51st all-time), .924 OPS (50th all-time). Bill James ranked him 50th greatest left fielder. First 30-30 man in MLB history. Consistently overlooked — by the Hall, by history, by the photographer who couldn't tell him from his teammate.",

  real_stats: {
    season: 1922,
    games: 153,
    at_bats: 585,
    hits: 194,
    doubles: 34,
    triples: 11,
    home_runs: 39,
    rbi: 155,
    stolen_bases: 37,
    batting_avg: ".332",
    obp: ".414",
    slg: ".627",
    ops: "1.041",
    runs_scored: 128,
    walks: 74,
    strikeouts: 31,
    war: 8.0,
    career_avg: ".319",
    career_hits: 1552,
    career_hr: 196,
    career_rbi: 916,
    career_obp: ".393",
    career_slg: ".530",
    career_ops: ".924",
    career_sb: 154,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1922 SEASON
  //
  // CON: .332 BA → tier 5 (.330+). 194 H. .414 OBP. Career .319. CON = 4 (just barely 5 tier, but career .319 is more 4 territory — high 4).
  //      Actually: .332 rounds into tier 5. But career is .319 which is tier 4. Split the difference. CON = 4.
  // POW: 39 HR → tier 3 (30-39). .627 SLG → bonus +1. 155 RBI led AL. Career 196 HR. POW = 4.
  // SPD: 37 SB → tier 3 (31-50). First 30-30 man. Career 154 SB. SPD = 3 (MAXIMUM).
  // DEF: .958 fielding %. Adequate outfielder. Reds manager criticized his fielding early. DEF = 0.
  // CLU: Browns never reached WS. No postseason appearances. CLU = 0.
  // OVR: CON×2(8) + POW×1.5(6) + SPD×1(3) + DEF×0.5(0) = 17 → normalized ~8
  // OVR = 8 (ALL-STAR) — elite five-tool talent on a team that never won
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // ALL-STAR. Ken Williams was a five-tool player on a team that never won. His 1922 was one of the most complete offensive seasons of the decade — 39 HR, 155 RBI, 37 SB, .332 BA, more HR than K. He was the only man besides Bob Meusel to interrupt Ruth's 12-year HR crown. But he played for the St. Louis Browns, he had no postseason, and a photographer couldn't even tell him apart from his teammate. OVR 8 is the rating of a player who should have been famous and wasn't.
    con: 4,      // .332 in 1922. .319 career (60th all-time). 194 H. .414 OBP. 10 seasons above .300. The peak year hits tier 5, but the career line settles at high-4. He was an excellent hitter who never quite reached the elite tier of Sisler or Ruth — .319 is wonderful, not transcendent. Rating of 4.
    pow: 4,      // 39 HR in 1922 (led AL, dethroned Ruth). .627 SLG. 155 RBI (led AL). Career 196 HR, .530 SLG (51st all-time). Top 4 in AL HR 7 consecutive seasons. But: 39 HR is tier 3, SLG bonus pushes to 4. He was a genuine power hitter in the Live Ball Era — not Ruth or Gehrig level, but a tier below, which is still extraordinary. Rating of 4.
    spd: 3,      // MAXIMUM. 37 SB in 1922. Career 154 SB. The FIRST 30-30 MAN IN MLB HISTORY. This is the defining stat of Williams's card. Nobody combined power and speed like this until Willie Mays in 1956 — 34 years later. He was genuinely fast, genuinely powerful, and genuinely the first person to prove you could be both. SPD = 3.
    def: 0,      // .958 fielding %. Adequate outfielder. Cincinnati manager criticized his defense early in his career. Not a liability in LF, but not a strength. The Browns kept him for his bat and his legs, not his glove. Rating of 0.
    clu: 0,      // ZERO. The Browns never reached the World Series during Williams's career. The closest they came was 1922 — when they finished 1 game behind the Yankees. Williams has zero postseason at-bats, zero postseason moments, zero clutch mythology. He played his entire prime on a team that almost won once and never did. CLU = 0.
  },

  stat_justification: {
    con: ".332 in 1922. Career .319 — 60th all-time in MLB history. 194 H in 1922. .414 OBP. 10 seasons hitting above .300, including .345 at age 39 in 1929. During his 3-year peak (1921-23), he averaged .345 with 194 H per season. The .319 career line is excellent but falls in the high tier-4 range — elite but not legendary. He was a tremendous contact hitter who also walked and rarely struck out (only 31 K in 585 AB in 1922 — more HR than K). Rating of 4.",
    pow: "39 HR in 1922 — led the AL, dethroning Babe Ruth (who was suspended for part of the season). 155 RBI (led AL, Browns franchise record). .627 SLG in 1922. Career .530 SLG (51st all-time). 196 career HR. Top 4 in AL HR race for 7 consecutive seasons (1921-27). First player to hit 2 HR in one inning. First AL player to hit 3 HR in one game. But he never hit 40 HR (39 was the peak), and the career total of 196 reflects a late start as a regular (didn't become full-time until age 29). The power was real but not Ruth/Gehrig tier. Rating of 4.",
    spd: "37 SB in 1922. 154 career SB. THE FIRST 30-30 MAN IN BASEBALL HISTORY. This cannot be overstated. In 1922, Ken Williams hit 39 HR and stole 37 bases — a combination that would not be achieved again until Willie Mays in 1956, THIRTY-FOUR YEARS LATER. He was the prototype for the modern five-tool player. The speed was genuine and it was combined with power in a way nobody had seen before. Rating of 3 — MAXIMUM.",
    def: ".958 career fielding percentage. Played 1,260 games in the outfield. Cincinnati manager Charley Herzog criticized his defense, which contributed to his being sent back to the minors early in his career. He was adequate in left field — made the plays he needed to, had 167 career assists (decent arm), but was never a defensive standout. The Browns valued his bat and legs. Rating of 0.",
    clu: "Zero postseason appearances. Zero. The St. Louis Browns never reached the World Series during Williams's tenure (1918-1927). Their closest attempt was 1922, when they finished just 1 game behind the Yankees in the AL pennant race — the same year Williams put up 39/155/37. He was the best player on a team that almost won once. Almost. CLU = 0.",
  },

  personality: {
    leadership_style: "Quiet competence. Williams was not a clubhouse leader in the charismatic sense. He was a professional who showed up, hit the ball hard, ran fast, and went home. On the Browns, Sisler was the star and the face. Williams was the engine room. He led by output, not by personality.",
    temperament: "Understated, practical, self-reliant. Born in Grants Pass, Oregon — small-town Pacific Northwest. Left school after 8th grade, worked in a box factory. Played in the Western Canada League before making the majors at 25. There's a working-class directness to Williams — no college education, no New York glamour, no fame. He did the work because the work was there.",
    work_ethic: "HIGH. Williams bounced around the minors for years before becoming a regular at age 29 — late by any standard. He went from the Western Canada League to the PCL to Cincinnati (who sent him back) to the Browns. He kept hitting at every level until someone gave him a full-time job. Once he got it, he never let go — .319 career average, top-4 HR for 7 straight years.",
    lifestyle: "Small-town Oregon to St. Louis and back. After baseball, Williams returned to Grants Pass and became a police officer, then owned the Owl Club — a restaurant and billiard parlor. He lived simply, in the place he came from, doing work that needed doing. He was the opposite of the Roaring Twenties — no excess, no headlines, no mythology.",
    era_adaptability: "Williams's 30-30 combination was 34 years ahead of its time. In modern baseball, a player with 39 HR, 37 SB, .332 BA, and more HR than K would be an MVP candidate and a household name. He was the prototype for Bo Jackson, Barry Bonds, Mike Trout — the complete player who hits for power and runs. The fact that nobody replicated his 30-30 until Mays in 1956 tells you how far ahead he was.",
    clubhouse_impact: "INVISIBLE. Williams was part of the great Browns outfield trio — Tobin, Jacobson, Williams — the longest-running outfield in baseball history (556 games). They combined to hit .330 for five consecutive seasons. But Williams was so unknown that a photographer assigned to take his picture instead photographed Jacobson. He was the greatest player nobody could identify.",
    dark_side: "The corked bat. In August 1923, the Washington Senators came into possession of one of Williams's bats and discovered it had been bored out and plugged with lighter wood. The bat was turned over to an umpire for investigation, and the Senators protested all Browns victories in which Williams had used it. This scandal — minor by later standards — adds a note of ambiguity to Williams's achievements. Was the 30-30 legitimate? Was the power real? In ILB: 'The Doctored Bat' trait — Williams's power stats carry a permanent asterisk. If the trait is activated by an opponent's challenge, d6 roll: on 1-2, Williams's HR total for the series is reduced by 10%. On 3-6, no penalty — the bat was legal or wasn't caught.",
  },

  chemistry_traits: [
    { tag: "The First 30-30", desc: "39 HR / 37 SB in 1922. The first 30-30 season in MLB history — not matched for 34 years. In ILB, Williams is the only player who can simultaneously contribute elite POW and elite SPD. +1 to both HR and SB probability per game." },
    { tag: "Sisler's Teammate", desc: "Williams and Sisler played together on the 1922 Browns. In ILB, when paired on the same roster, their combined output triggers 'Sportsman's Park Firepower': +1 to team batting average. Links to Sisler's card." },
    { tag: "The Photographer's Mistake", desc: "A photographer sent to photograph Williams instead shot his teammate Jacobson — he didn't know which one was Ken. In ILB, Williams is 'invisible' to opponents: his OVR appears 2 lower than actual. Opponents don't prepare for him. He benefits from being overlooked." },
    { tag: "The Doctored Bat", desc: "1923: Williams's bat discovered bored out and plugged with lighter wood. In ILB, permanent asterisk on power stats. Opponents can 'challenge the bat' once per series — d6 roll: on 1-2, Williams loses 10% of HR output for that series. On 3-6, no effect." },
    { tag: "More HR Than K", desc: "39 HR, 31 K in 1922. The first player to hit more HR than K with 15+ HR. In ILB, Williams's K rate is permanently reduced — he cannot strike out more than once per 3 games." },
    { tag: "One Game Short", desc: "The 1922 Browns finished 1 game behind the Yankees for the AL pennant. Williams put up 39/155/.332 and it wasn't enough. Links to Sisler's 'One Game Short' trait. In ILB, when within 1 game of the playoffs in September: +2 to all stats (desperation) but -1 to team luck (the Browns' curse)." },
    { tag: "Box Factory Boy", desc: "Left school after 8th grade. Worked in a box factory in Grants Pass, Oregon. Became a pro ballplayer in the Western Canada League. In ILB: +1 to resilience — Williams cannot be demoralized. He has worked in worse places." },
    { tag: "The Owl Club", desc: "After baseball, Williams became a cop and billiard parlor owner. In ILB, post-retirement Williams provides +1 to team scouting — he knows how to read people and situations from years of police work and bar ownership." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM", note: "142 of 196 career HR hit at home. Williams was a dead-pull hitter built for this park. +2 POW at home." },
    { location: "Left Field", affinity: "HIGH", note: "1,260 career games in the OF. His position. Not his best skill, but his home." },
    { location: "Baserunning", affinity: "HIGH", note: "37 SB in 1922. 154 career. The speed is real and it's rare for a power hitter." },
    { location: "Grants Pass, Oregon", affinity: "ORIGIN", note: "Born there. Died there. Became a cop and bar owner there. The town nobody's heard of, just like the player." },
  ],

  momentum: {
    hot_triggers: [
      "April-May 1922 — 7 HR in 9 games between April 22-29. The power surge that announced the 30-30 season.",
      "Ruth suspended/absent — Williams thrived when Ruth was gone. He led the AL in HR in 1922 partly because Ruth was suspended for barnstorming.",
      "Against expectations — when overlooked or dismissed, Williams elevated. He was sent back to the minors by Cincinnati, declared expendable, and responded with a .319 career.",
      "Home games at Sportsman's Park — 142 of 196 career HR at home. He was a different hitter in St. Louis.",
    ],
    cold_triggers: [
      "1925 — beaned (hit in the head by a pitch). Played only 102 games. Still hit .331 with 25 HR and 105 RBI, but the beaning affected him.",
      "Being identified — the photographer's mistake works both ways. When attention is on Williams, he shrinks. His power came from anonymity.",
      "Postseason — he never got there. The absence itself is a cold trigger. Williams had no October to prove himself.",
      "Late start — didn't become a regular until age 29. The years he lost to the minors and WWI eroded career totals that might have made him a Hall of Famer.",
    ],
    pressure_response: "UNKNOWN. Ken Williams never played a postseason game. We don't know what he would have done in October because the Browns never got there. His 1922 — 39 HR, 155 RBI, 37 SB, .332 BA — came in a pennant race the Browns lost by 1 game, so we know he performed under pressure. But we don't know what happens when the pressure becomes ultimate. In ILB, Williams's pressure response is a coin flip: d6 before each clutch at-bat. On 4+, he performs to his stats. On 1-3, he underperforms. The uncertainty is the point — it's the question his career never answered.",
  },

  action_card_seeds: [
    {
      title: "Thirty-Nine and Thirty-Seven",
      type: "Game Action",
      text: "Your left fielder hits 39 home runs and steals 37 bases. Nobody has ever done this before. Nobody will do it again for thirty-four years. He also drives in 155 runs, bats .332, and strikes out only 31 times — fewer than his home runs. It is the most complete offensive season of the decade. The next morning, the sports pages lead with Babe Ruth.",
      origin: "1922: Ken Williams's 30-30 season — the first in MLB history. 39 HR, 37 SB, 155 RBI, .332 BA, 31 K. Willie Mays didn't match the 30-30 until 1956.",
    },
    {
      title: "The Wrong Photograph",
      type: "Drama",
      text: "A photographer is dispatched to take a picture of your left fielder swinging at the plate. He returns with a photograph of your center fielder. He didn't know the difference. Imagine, the writer said, the text and illustration that would have been incident to Babe Ruth hitting three home runs in one game. But Ken hits three of them and the photographer doesn't even know which player is Ken.",
      origin: "SABR research: A photographer assigned to shoot Ken Williams instead photographed teammate Baby Doll Jacobson. The Sporting News used this anecdote to illustrate Williams's anonymity despite his spectacular production.",
    },
    {
      title: "The Doctored Bat",
      type: "Drama",
      text: "August 1923. The Washington Senators obtain one of your left fielder's bats. They bore into it and find it has been hollowed out and plugged with a lighter wood. They protest every game your team has won. The investigation goes nowhere. The question remains: was the power real? In a decade of corked bats, juiced balls, and Babe Ruth, does it even matter?",
      origin: "The Senators discovered Williams's bat was doctored in August 1923. The bat was given to umpire George Hildebrand. The protest did not overturn any games. The corked bat scandal is a footnote to a forgotten career.",
    },
    {
      title: "One Game Behind",
      type: "Drama",
      text: "The 1922 American League pennant race. Your team finishes with 93 wins. The Yankees finish with 94. One game. Your left fielder led the league in home runs and RBI. Your first baseman hit .420. Your outfield trio batted .330 combined. You had the best offense in the league, maybe in history. One game. The Browns will never come this close again.",
      origin: "The 1922 Browns finished 1 game behind the Yankees. Williams (39 HR, 155 RBI) and Sisler (.420 BA, 41-game streak) had career years. The Browns never won the pennant. Links to Sisler's 'One Game Short' trait.",
    },
    {
      title: "The Box Factory",
      type: "Drama",
      text: "Before he was the first 30-30 man in baseball history, your left fielder worked in a box factory in Grants Pass, Oregon. He left school after the eighth grade. He played in the Western Canada League. He played in Edmonton. He played in Spokane. He played in Portland. He played for Cincinnati, who sent him back. He played in a world war. He didn't become a regular until he was twenty-nine years old. Then he hit .319 for the rest of his career. Nobody gave Ken Williams anything. He built it all himself, one box at a time.",
      origin: "Williams's pre-baseball life: 8th grade education, box factory worker, Western Canada League, military service in WWI. Didn't become an MLB regular until age 29.",
    },
    {
      title: "Seven Straight Top Four",
      type: "Game Action",
      text: "From 1921 through 1927, your left fielder finishes in the top four in the American League home run race every single season. Seven consecutive years of elite power. Only one man finishes ahead of him consistently — Babe Ruth. Only one other man ever interrupts Ruth's twelve-year reign. Your left fielder does it in 1922. Then he returns to the shadows.",
      origin: "Williams finished top-4 in AL HR from 1921-1927. He and Bob Meusel (1925) are the only players to interrupt Ruth's 12-year run of leading the AL in HR.",
    },
    {
      title: "The Owl Club",
      type: "Legacy",
      text: "After the last game, your left fielder goes home to Grants Pass, Oregon. He becomes a police officer. He buys a restaurant and billiard parlor on G Street. He calls it the Owl Club. He runs it for twenty years. He dies there in 1959, at sixty-eight, of a heart condition. The Baseball Hall of Fame never calls. The first 30-30 man in history runs a pool hall in a town nobody's heard of, and that is the end of the story.",
      origin: "Williams retired to Grants Pass, became a policeman and owner of the Owl Club. Died 1959. Never inducted into the HOF despite strong statistical credentials.",
    },
    {
      title: "Two in One Inning",
      type: "Game Action",
      text: "August 7, 1922. Your left fielder hits two home runs in the same inning. Nobody in the American League has done this before. He is the first. In a career of firsts — first 30-30, first 3-HR game in the AL, first to have more HR than K — this one is the most forgotten. He collected firsts the way other men collected trophies, and they all disappeared.",
      origin: "Williams became the first AL player to hit 2 HR in one inning on August 7, 1922. He was also the first AL player to hit 3 HR in one game (April 22, 1922).",
    },
  ],

  art_direction: {
    face: "6'0\" 170 lbs — lean, wiry, athletic. Built for speed AND power, which is the whole point. Not bulky like Ruth or broad like Gehrig. The face is plain, forgettable, everyman — and that's the design statement. He looks like the guy the photographer would mistake for someone else. Dark eyes, clean jaw, no distinguishing features. He could be anyone. He was everyone. He was the first.",
    attire: "St. Louis Browns 1922 home whites. The Browns uniform — brown and orange trim — is visually distinct from the Yankees' pinstripes. Williams should be in mid-stride, running the bases or stealing, with the bat's follow-through still visible. The card should capture BOTH power and speed simultaneously — the 30-30 in a single image. Or: standing in the batter's box, coiled, the ball already leaving, and his weight already shifting toward first.",
    mood: "ANONYMOUS EXCELLENCE. This card should feel like discovering something extraordinary in a place you weren't looking. It should feel like opening a plain box and finding gold inside. Williams's card has no flash, no drama, no mythology — just numbers that don't make sense coming from a face nobody remembers. The mood is twilight at Sportsman's Park — the game is ending, the crowd is thin, and the best player on the field is already forgotten.",
    style: "Full color — Bashers era — but MUTED. Browns brown and burnt orange. Dusty Missouri light. Faded outfield grass. This is not Yankee Stadium. This is Sportsman's Park, St. Louis, where 3,000 people watched a man invent the 30-30 season and went home without knowing his name. The card should feel slightly underexposed — present but not prominent, like the man himself.",
    reference: "Ruth is the solar system. Gehrig is the axis. Sisler is the sun. Sewell is the earth. Ken Williams is the comet — brilliant, fast, powerful, appearing suddenly and then gone before anyone could get a photograph. His card should be the one collectors discover years later and realize was undervalued all along. It should feel like the overlooked record in the bins that turns out to be a masterpiece.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No postseason", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", brownsPrimary: "#4a2f1a", brownsOrange: "#c47028", dusty: "#8a7a62" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.brownsOrange}12`, border: `1px solid ${C.brownsOrange}35`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.brownsPrimary, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.brownsOrange}40`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function KenWilliamsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = WILLIAMS_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.brownsPrimary} 0%, #1a1208 50%, ${C.brownsPrimary} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.brownsOrange, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.brownsOrange}90`, boxShadow: `0 0 0 2px ${C.brownsPrimary}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.brownsPrimary}, #5a3a20, ${C.brownsPrimary})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.brownsOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.brownsOrange}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.brownsPrimary}20, ${C.brownsOrange}10, ${C.dusty}15)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>☄️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE FIRST 30-30 MAN</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.brownsPrimary, color: C.brownsOrange, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.brownsPrimary}dd`, color: C.brownsOrange, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.brownsOrange} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.coldBlue} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.brownsPrimary}, #5a3a20)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "K", val: d.real_stats.strikeouts }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.brownsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1922 — FIRST 30-30 IN MLB HISTORY — 39 HR / 37 SB / 155 RBI / 31 K</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.brownsPrimary}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.brownsOrange}20` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR OPS", val: d.real_stats.career_ops },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "TOP-4 HR", val: "7 yrs" },{ label: "HOF", val: "—" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.dusty, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚡ First 30-30 (1922)", "💪 39 HR Led AL", "🏃 37 SB", "🎯 More HR Than K", "📸 The Wrong Photo", "🔨 Doctored Bat?", "😶 Not in HOF", "🦉 The Owl Club"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.brownsOrange}15`, border: `1px solid ${C.brownsOrange}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.brownsOrange}25`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.brownsPrimary : "transparent", color: tab === t.id ? C.brownsOrange : C.medBrown, border: `1px solid ${tab === t.id ? C.brownsOrange : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.brownsOrange}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "MAXIMUM" ? C.brownsOrange : l.affinity === "HIGH" ? C.traitGreen : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Williams's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.brownsPrimary}06`, border: `1px solid ${C.brownsOrange}20`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.dusty}20` : `${C.brownsOrange}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Williams's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.brownsPrimary}, #5a3a20, ${C.brownsPrimary})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.brownsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
