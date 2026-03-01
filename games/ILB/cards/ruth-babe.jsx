// /cards/players/babe-ruth.jsx
import { useState } from "react";

const RUTH_DATA = {
  name: "Babe Ruth",
  nickname: "The Sultan of Swat",
  year: 1927,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "RF",
  bats: "L",
  throws: "L",
  height: '6\'2"',
  weight: "215 lbs",
  born: "February 6, 1895 — Baltimore, MD",
  died: "August 16, 1948 — New York, NY (age 53)",
  hof: "Inducted 1936 — inaugural class (95.13%). One of the 'first five' with Cobb, Wagner, Mathewson, and Johnson. Considered by many the greatest baseball player of all time. 714 HR (record for 39 years). .342/.474/.690 career. 7 WS titles. Also a dominant pitcher: 94-46, 2.28 ERA.",

  real_stats: {
    season: 1927,
    games: 151,
    at_bats: 540,
    hits: 192,
    doubles: 29,
    triples: 8,
    home_runs: 60,
    rbi: 164,
    stolen_bases: 7,
    batting_avg: ".356",
    obp: ".486",
    slg: ".772",
    ops: "1.258",
    runs_scored: 158,
    walks: 137,
    strikeouts: 89,
    war: 14.7,
    career_avg: ".342",
    career_hits: 2873,
    career_hr: 714,
    career_rbi: 2214,
    career_runs: 2174,
    career_obp: ".474",
    career_slg: ".690",
    career_ops: "1.164",
    career_war: 163.1,
    career_bb: 2062,
    pitching: "94-46, 2.28 ERA, 29.2 consecutive scoreless WS innings",
    ws_titles: 7,
    ws_appearances: 10,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1927 SEASON
  //
  // CON: .356 BA → tier 5 (.330+). 192 H. .486 OBP. Career .342. CON = 5 (MAXIMUM).
  // POW: 60 HR → tier 5+ (50+). .772 SLG. 164 RBI. Career 714 HR. Career .690 SLG (highest ever). POW = 5 (MAXIMUM).
  // SPD: 7 SB (1927). Career high 17 SB. Not fast, but could run bases. SPD = 1.
  // DEF: Adequate RF. Good arm. Not an elite fielder — average to above-average. DEF = 0.
  // CLU: 7 WS titles. .326 WS BA. 15 WS HR. Called Shot. 3 HR in a WS game twice. CLU = 3 (MAXIMUM).
  // OVR: CON×2(10) + POW×1.5(7.5) + SPD×1(1) + DEF×0.5(0) = 18.5 → normalized ~13
  // OVR = 13 (MYTHIC) — the only player to reach the maximum possible OVR.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 13,     // MYTHIC — The only 13 in ILB. The highest possible rating. Babe Ruth transcends the scale. He is not the best player in baseball history — he IS baseball history. Every player after him is measured by him. Every home run is counted from zero because he set the number. The formula breaks at Ruth. He is the ceiling.
    con: 5,      // MAXIMUM. .356 in 1927. .378 in 1921. .342 career. 2,873 career hits. .486 OBP (1927). .474 career OBP (highest in history). He didn't just hit — he reached base at a rate no human has matched.
    pow: 5,      // MAXIMUM. 60 HR in 1927 (record for 34 years). 714 career (record for 39 years). .772 SLG (1927). .690 career SLG (highest in history). .846 SLG (1920, still MLB record). He invented the home run as baseball's defining act.
    spd: 1,      // 7 SB in 1927. Career high 17. Not a speed threat. But he ran the bases well and stole when it mattered. The famous CS to end the 1926 WS. SPD = 1.
    def: 0,      // Adequate RF with a good arm. Not a liability, not an asset. Ruth's value was entirely at the plate. His defense was acceptable, nothing more. DEF = 0.
    clu: 3,      // MAXIMUM. 7 WS titles (3 pitching, 4 hitting). .326 career WS BA. 15 WS HR. 3 HR in a single WS game TWICE (1926 Game 4, 1928 Game 4). 29.2 consecutive scoreless WS innings as a pitcher (record 43 years). The Called Shot (1932 WS). The promise to Johnny Sylvester. Ruth didn't just perform in October — he DEFINED October.
  },

  stat_justification: {
    con: ".356 in 1927. .378 in 1921. Career .342 — 15th all-time. 2,873 career hits. But it's the OBP that separates Ruth: .486 in 1927, .474 career — the HIGHEST in baseball history. 2,062 career walks. He saw more pitches, took more balls, and reached base more often than any human who has ever played the sport. Columbia University tested him in 1921: eyes 12% faster than average, perception 1.5× above normal, nerves steadier than 499 out of 500 people. He was physiologically superior. Rating of 5 — MAXIMUM.",
    pow: "60 HR in 1927 — record for 34 years. 714 career HR — record for 39 years. .772 SLG in 1927. .846 SLG in 1920 — STILL the MLB single-season record after 100+ years. .690 career SLG — highest in history. In 1920, he hit more HR (54) than every other AL TEAM. He didn't just lead the league — he WAS the league. He hit 467 HR in the 1920s — the most by any player in any decade, ever. 'Sixty! Let's see some son of a bitch try to top that one.' Rating of 5 — MAXIMUM. There is no other rating possible.",
    spd: "7 SB in 1927. Career high 17 SB. Not a speed demon. But he was more athletic than his body suggested — at 6'2\" 215 lbs (increasing to 250+ later), he could run when he wanted to. He famously was caught stealing to end the 1926 WS — the worst baserunning decision in history. Rating of 1.",
    def: "Adequate right fielder. Good arm — led AL outfielders in assists several times. But he was not a defensive player. He was born to hit. His defense was acceptable, sometimes good, never elite. As he aged and gained weight, it declined. Rating of 0.",
    clu: "7 WS titles — 3 as a pitcher (Red Sox 1915, 1916, 1918), 4 as a hitter (Yankees 1923, 1927, 1928, 1932). 10 WS appearances total. Career WS BA .326. 15 WS HR. 3 HR in a single WS game TWICE — Game 4 of both 1926 and 1928. 29.2 consecutive scoreless WS innings as a pitcher (record stood 43 years until Whitey Ford). The Called Shot: Game 3 of the 1932 WS, Ruth either pointed to center field or didn't — nobody knows — and then homered. The promise to Johnny Sylvester: promised a sick boy he'd hit a HR, then hit 3. Ruth in October was myth made flesh. Rating of 3 — MAXIMUM.",
  },

  personality: {
    leadership_style: "Force of nature. Ruth didn't lead by example or by speech — he led by gravitational force. Everyone in baseball orbited around him. He was the sun and everything else was astronomy. Teammates loved him, feared him, and were dragged into his wake. He raised salaries for everyone, built stadiums, and transformed a sport. He didn't captain the Yankees — he was the Yankees.",
    temperament: "Volcanic. Joyful. Excessive. Undisciplined. Generous. Ruth was raised in an orphanage — St. Mary's Industrial School for Boys, where he was sent at age 7 as 'incorrigible.' He emerged with an insatiable appetite for everything: food, women, alcohol, baseball, attention, money, and life. He earned $80,000 a year and spent more. He ate 12 hot dogs before games. He visited sick children in hospitals. He was a walking contradiction — part saint, part degenerate, all legend.",
    work_ethic: "PARADOXICAL. Ruth was undisciplined in life but disciplined at the plate. Columbia University tested him in 1921 and found his reflexes, perception, and nerve coordination were superhuman — '90% efficiency compared with a human average of 60%.' He didn't train in the modern sense. He drank, ate, stayed up all night, and then hit 60 home runs. His talent was so extreme it overwhelmed every vice.",
    lifestyle: "Larger than life. Ruth's salary was $80,000 in 1930 — more than the President. When asked if he deserved more than Hoover: 'I had a better year than he did.' He endorsed everything. He gave money away. He owned cars, racehorses, and the night. First wife Helen died in a fire; married actress Claire Hodgson. Adopted two daughters. He was a product of nothing — no family, no education, no advantages — who became the most famous person in America.",
    era_adaptability: "TRANSCENDENT. Ruth's numbers, adjusted for era, are the greatest in baseball history. In modern baseball with modern training, nutrition, and equipment, Ruth's physical gifts (tested as superhuman in 1921) would produce numbers we can barely imagine. His .690 career SLG would be elite in any era. He would be Mike Trout's ceiling with Barry Bonds's power. He IS the ceiling.",
    clubhouse_impact: "ATMOSPHERE-ALTERING. Ruth didn't improve clubhouse chemistry — he replaced it with his own weather system. When Ruth was happy, the team was ecstatic. When Ruth was angry, everyone hid. When Ruth was on the field, 70,000 people watched. In ILB: Ruth provides +2 to all teammates' stats but -1 to team discipline. He is the tide that lifts all boats while drowning the harbor.",
    dark_side: "The orphan's hunger. Ruth was abandoned by his parents at age 7. He spent his childhood in an industrial school that was part orphanage, part reform school. Everything about his excess — the eating, the drinking, the womanizing, the spending — was the desperate consumption of a boy who had nothing trying to fill a hole that had no bottom. He was never made manager because teams didn't trust his discipline. He was passed over for the one thing he wanted most. He died at 53 of throat cancer, his body consumed by the same appetites that defined his life. In ILB: Ruth carries 'The Orphan's Hunger' — he cannot be satisfied. Every achievement increases his appetite. +1 stat bonus after every milestone, but +1 risk of excess that can result in suspension, illness, or team drama.",
  },

  chemistry_traits: [
    { tag: "The Bambino", desc: "Ruth IS baseball. +3 to league attendance. +2 to all teammates' morale. +1 to opposing team's intimidation. When Ruth is in the lineup, the rules of baseball bend around him." },
    { tag: "Sixty", desc: "'Let's see some son of a bitch try to top that one.' 60 HR in 1927. In ILB, Ruth's HR total sets the ceiling for all other players in the league. No batter can exceed Ruth's HR total without a special event triggering." },
    { tag: "The Called Shot", desc: "1932 WS Game 3. Ruth either pointed to center field or he didn't. Then he homered. In ILB, once per World Series, Ruth can declare his next at-bat. If he calls his shot, d6 roll: on 4+, automatic HR. On 1-3, strikeout. The myth is the mechanic." },
    { tag: "Also a Pitcher", desc: "94-46, 2.28 ERA. 29.2 consecutive scoreless WS innings. Ruth CAN pitch in ILB: STF 3, CTL 2, STA 2. But every game he pitches, he doesn't hit. The opportunity cost of using Ruth on the mound is the most agonizing decision in ILB." },
    { tag: "The Orphan's Hunger", desc: "Abandoned at age 7. St. Mary's Industrial School. Ruth can never be satisfied. +1 stat bonus after every personal milestone, but +1 risk of excess (suspension/illness/drama) that accumulates over time." },
    { tag: "Curse of the Bambino", desc: "Ruth was sold from the Red Sox to the Yankees. The Red Sox didn't win another WS for 86 years. In ILB, if Ruth is traded, his former team receives -2 to all stats for the remainder of the era." },
    { tag: "The House That Ruth Built", desc: "Yankee Stadium opened in 1923 because of Ruth. In ILB, any stadium Ruth plays in for 3+ seasons becomes 'Ruth's House' — permanent +1 to Ruth's stats there, and the stadium itself increases in value." },
    { tag: "Columbia Tests", desc: "Eyes 12% faster. Nerves steadier than 499/500. Perception 1.5× normal. In ILB, Ruth has +1 to pitch recognition — he sees the ball earlier and tracks it longer than any other batter." },
  ],

  preferred_locations: [
    { location: "Yankee Stadium", affinity: "MAXIMUM", note: "The House That Ruth Built. 15 years. 7 pennants. 4 WS titles. This IS his house." },
    { location: "Batter's Box", affinity: "MAXIMUM", note: ".342/.474/.690 career. 714 HR. The batter's box was the center of the universe when Ruth stood in it." },
    { location: "World Series", affinity: "MAXIMUM", note: "7 titles. .326 BA. 15 HR. Called Shot. 29.2 scoreless innings pitching. October belongs to Ruth." },
    { location: "Everywhere Else", affinity: "HIGH", note: "Ruth elevated every stadium, every city, every opponent. His road numbers were as good as his home numbers. The show traveled." },
    { location: "Pitcher's Mound", affinity: "HIGH", note: "94-46, 2.28 ERA. 3 WS titles pitching. He was an elite pitcher BEFORE he became the greatest hitter alive." },
    { location: "St. Mary's Industrial School", affinity: "ORIGIN", note: "Where it all began. An orphanage in Baltimore. Ruth was sent there at 7. He never truly left it. Everything he did was running from it." },
  ],

  momentum: {
    hot_triggers: [
      "Everything — Ruth was hot more often than not. From 1920-1932, he averaged 46 HR, 147 RBI, and a .354 BA per season.",
      "Big stages — World Series, All-Star Games, sold-out stadiums. Ruth played BETTER when the crowd was bigger.",
      "Personal challenges — when told he couldn't do something, he did it harder. 'I had a better year than he did.'",
      "September pennant races — Ruth hit .356 in 1927 while the pressure of 60 HR built with every at-bat.",
    ],
    cold_triggers: [
      "1922 — suspended for barnstorming. Hit .315 with 'only' 35 HR. His worst full Yankee season.",
      "1925 — 'The Bellyache Heard Round the World.' Intestinal disorder (or worse). Hit .290 in 98 games.",
      "Aging — by 1934, at 39, he was a shell. Hit .288 with 22 HR. The body that defied everything finally submitted.",
      "Not being named manager — the rejection he never overcame. It ate at him until the end.",
    ],
    pressure_response: "MYTHOLOGICAL. Ruth didn't respond to pressure — he consumed it. The bigger the moment, the bigger he became. 3 HR in a WS game. The Called Shot. The promise to a dying boy. Sixty in a season. Ruth's relationship to pressure was not human — it was gravitational. He bent reality around himself. The ball went where he wanted it to go because he was Babe Ruth and the ball had no choice. In ILB, Ruth has no pressure penalty. He has no cold streaks in October. He has no fear. He is the player around whom the entire concept of clutch performance was built. CLU 3 is not enough for him. The rating system fails at Ruth. We give him 3 because 3 is the maximum, and the maximum is all we have.",
  },

  action_card_seeds: [
    {
      title: "Sixty",
      type: "Game Action",
      text: "September 30, 1927. Eighth inning. Your left fielder faces Tom Zachary with the score tied 2-2. He drives the ball into the right field bleachers. Home run number sixty. A new record — his own record, broken. He rounds the bases shaking hands with the air. 'Sixty! Let's see some son of a bitch try to top that one.' Nobody does. Not for 34 years.",
      origin: "Ruth's 60th HR of 1927, off Tom Zachary on September 30. The record stood until Roger Maris hit 61 in 1961.",
    },
    {
      title: "The Called Shot",
      type: "Game Action",
      text: "Game 3 of the World Series. Wrigley Field. The crowd is hostile. The Cubs bench is riding your left fielder mercilessly. He steps in against Charlie Root. He gestures. Did he point to center field? Nobody is sure. Then he hits the longest home run ever seen at Wrigley. The myth is born. It will never die. It doesn't matter if it's true.",
      origin: "1932 WS Game 3. Ruth either pointed to CF or didn't before homering off Root. The 'Called Shot' remains baseball's greatest unsolved mystery.",
    },
    {
      title: "The Curse",
      type: "Drama",
      text: "Your team's owner needs money for a Broadway show. He sells the greatest player in the world for $100,000 and a $350,000 loan. Your team will not win another championship for eighty-six years. The player will win four championships for his new team. They will build a stadium for him. They will call it The House That Ruth Built.",
      origin: "Harry Frazee sold Ruth from the Red Sox to the Yankees in January 1920. The 'Curse of the Bambino' lasted until 2004.",
    },
    {
      title: "Also a Pitcher",
      type: "Action",
      text: "Before he was the greatest hitter alive, your left fielder was one of the best pitchers in baseball. 94 wins. A 2.28 ERA. Three World Series titles on the mound. Twenty-nine consecutive scoreless World Series innings. They moved him to the outfield because his bat was too valuable to waste on pitching every fifth day. The sacrifice: the greatest pitcher becomes the greatest hitter.",
      origin: "Ruth's pitching career: 94-46, 2.28 ERA, 3 WS titles. 29.2 consecutive scoreless WS innings (record for 43 years).",
    },
    {
      title: "The Orphan",
      type: "Drama",
      text: "At age seven, a boy is sent to St. Mary's Industrial School for Boys — part orphanage, part reform school. He is listed as 'incorrigible.' He stays for twelve years. A Xaverian Brother named Matthias teaches him to play baseball. Everything that follows — the 714 home runs, the seven championships, the $80,000 salary, the women, the hot dogs, the legend — all of it comes from this. A boy nobody wanted became the man everybody needed.",
      origin: "Ruth was sent to St. Mary's at age 7. Brother Matthias Boutlier became his mentor and father figure. Ruth left at 19 to play professional baseball.",
    },
    {
      title: "Better Year Than the President",
      type: "Action",
      text: "Your left fielder earns $80,000 — more than the President of the United States. A reporter asks if he thinks that's appropriate. 'Why not?' he replies. 'I had a better year than he did.' It is the most perfectly American sentence ever spoken.",
      origin: "Ruth's famous response when asked about earning more than President Hoover ($75,000). The quote may be apocryphal but is universally attributed to him.",
    },
    {
      title: "Johnny Sylvester",
      type: "Drama",
      text: "A sick boy in a hospital bed. Your left fielder promises to hit a home run for him. He hits three. The boy recovers. The press inflates the story — by some accounts, Ruth saved the boy's life. The truth doesn't matter. What matters is that a man who could hit a baseball harder than anyone alive chose to aim it at a child's hope.",
      origin: "1926 WS: Ruth promised 11-year-old Johnny Sylvester he'd hit a HR. Ruth hit 3 HR in Game 4. Sylvester recovered. The story grew into legend.",
    },
    {
      title: "The Tests at Columbia",
      type: "Action",
      text: "Scientists at Columbia University test your left fielder and discover: his eyes are 12% faster than normal, his nerves steadier than 499 out of 500 humans, his perception 1.5 times above average, his overall efficiency 90% compared to the human average of 60%. He is, by measurable scientific standards, superhuman. Then he goes out and drinks until 3 AM and hits two home runs the next day.",
      origin: "September 1921: Columbia University tested Ruth's athletic abilities. Hugh Fullerton reported the results for Popular Science Monthly.",
    },
  ],

  art_direction: {
    face: "6'2\" 215 lbs (1927 — he was leaner then). Broad face, wide nose, dark hair swept back. The most recognizable face in American sports. Not handsome in a conventional sense — powerful. The grin is enormous, infectious, and slightly dangerous. This is the face of a man who has consumed everything the world offered and is still hungry.",
    attire: "New York Yankees 1927 pinstripes — the definitive baseball uniform on the definitive baseball player. Full swing, left-handed, the bat pointed toward right field, the ball already gone. Or: bat on shoulder, walking to the plate, the stadium rising to its feet. The pinstripes should be perfect. The number doesn't matter — nobody needed a number to know who Ruth was.",
    mood: "TITANIC JOY. This card should radiate the pure, overwhelming, almost frightening joy of a man who was born with nothing and conquered everything. Ruth's card should feel like walking into sunlight so bright it hurts. It should feel like the crack of a bat and the roar of 70,000 people and the ball disappearing into a sky that belongs to him. It should feel like baseball itself.",
    style: "Full color — the most vivid, saturated card in the entire ILB system. Where Sisler glows gold and Sewell is earthy, Ruth is BLAZING — deep Yankee navy, pristine white, emerald grass, blue sky, the warm amber of afternoon light in the Bronx. This card should be physically larger than other cards if possible. It should dominate any collection it's placed in. It is not a card. It is a monument.",
    reference: "Sisler is the sun. Sewell is the earth. Babe Ruth is the entire solar system. He doesn't need a metaphor. He IS the metaphor that every other metaphor is compared to. When we say a player is 'Ruthian,' we mean they have done something that reminds us of him — which means he is the standard by which all excess, all achievement, all impossibility is measured. The ILB Ruth card should feel like holding a piece of history in your hand — like touching the bat, like hearing the crack, like seeing the ball disappear over the fence at Yankee Stadium in 1927 and knowing that nothing in baseball will ever be this again.",
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

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", sunGold: "#d4a017", yankeeNavy: "#1c2841", mythicGold: "#ffd700" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.mythicGold}15`, border: `1px solid ${C.mythicGold}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.mythicGold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.mythicGold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function BabeRuthCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = RUTH_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.yankeeNavy} 0%, #0a0f1a 50%, ${C.yankeeNavy} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.mythicGold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>★ MYTHIC CARD — Bashers Era ★</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `4px solid ${C.mythicGold}`, boxShadow: `0 0 0 2px ${C.yankeeNavy}, 0 0 40px ${C.mythicGold}40, 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.yankeeNavy}, #2a3a5c, ${C.yankeeNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.mythicGold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "★ Flip Card — View Dossier ★" : "★ Flip Card — View Front ★"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.mythicGold}`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.yankeeNavy}30, ${C.mythicGold}15, ${C.yankeeNavy}20)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>👑</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE BAMBINO</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.mythicGold}`, color: C.yankeeNavy, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace", boxShadow: `0 2px 8px ${C.mythicGold}60` }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.yankeeNavy}dd`, color: C.mythicGold, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>★ MYTHIC ★</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.mythicGold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.mythicGold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.yankeeNavy}, #2a3a5c)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs_scored },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.mythicGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} NEW YORK YANKEES — MURDERERS' ROW — 60 HR — WS SWEEP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.yankeeNavy}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.mythicGold}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR OPS", val: d.real_stats.career_ops },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "WS TITLES", val: d.real_stats.ws_titles },{ label: "PITCH ERA", val: "2.28" },{ label: "HOF", val: "1936" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.mythicGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 22 SEASONS • 714 HR • .342/.474/.690 • 163.1 WAR • 7 WS TITLES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1936 (First Five)", "🏆 7× WS Champion", "👑 714 Career HR", "⚡ 60 HR (1927)", "🎯 .690 Career SLG", "⚾ Also: 94-46, 2.28 ERA", "🏟️ Built Yankee Stadium", "💀 Curse of the Bambino"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.mythicGold}20`, border: `1px solid ${C.mythicGold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>★ {d.name} ★</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>MYTHIC DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.mythicGold}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.yankeeNavy : "transparent", color: tab === t.id ? C.mythicGold : C.medBrown, border: `1px solid ${tab === t.id ? C.mythicGold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.mythicGold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "MAXIMUM" ? C.mythicGold : l.affinity === "HIGH" ? C.traitGreen : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Ruth's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.yankeeNavy}08`, border: `1px solid ${C.mythicGold}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.mythicGold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Ruth's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.yankeeNavy}, #2a3a5c, ${C.yankeeNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.mythicGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>★ ILB MYTHIC #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr} ★</span>
        </div>
      </div>
    </div>
  );
}
