// /cards/players/edd-roush.jsx
import { useState } from "react";

const ROUSH_DATA = {
  name: "Edd Roush",
  nickname: "The Alley Cat",
  year: 1923,
  team: "Cincinnati Reds",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "CF",
  bats: "L",
  throws: "L",
  height: '5\'11"',
  weight: "170 lbs",
  born: "May 8, 1893 — Oakland City, Indiana. Twin brother Fred. 'Edd' not short for Edward. 'J' not short for anything. Parents named twins Edd and Fred — simple and lyrical.",
  died: "March 21, 1988 — Bradenton, Florida (age 94). Died just before a spring training game at McKechnie Field — named for his dear friend Bill McKechnie. Last surviving Federal League participant. Last surviving 1919 World Series participant. Lived to 94, longer than any other Basher.",
  hof: "INDUCTED 1962 — Veterans Committee (with McKechnie, Jackie Robinson, Bob Feller). 1969: voted greatest player in Cincinnati Reds history. Joe Morgan: 'the best of us all.' Threw out last ball at Crosley Field (1970). Career 40.3 WAR with Reds alone. Legitimate HOFer — .323 lifetime, 2× batting champion, elite defense, 1919 WS champion.",

  real_stats: {
    season: 1923,
    batting_avg: ".351",
    obp: ".394",
    slg: ".490",
    ops: ".884",
    hits: 183,
    doubles: 41,
    triples: 18,
    home_runs: 6,
    rbi: 88,
    runs: 88,
    stolen_bases: 14,
    strikeouts: "~20 (est.)",
    walks: 39,
    games: 138,
    war: "~5.4",
    note: "LED NL IN DOUBLES (41). .351 BA (2nd NL behind Hornsby .384). 18 triples (6th NL). Fractured rib Aug-Sep but finished strong.",
    career_batting_avg: ".323",
    career_hits: 2376,
    career_hr: 68,
    career_rbi: "~981",
    career_slg: ".446",
    career_triples: 182,
    career_doubles: "339 (by some counts)",
    career_sb: 268,
    career_games: "~1,967",
    career_seasons: "18 (1913-1931, sat out 1930)",
    ws_championship: "1 (1919 — 'the Reds would have won either way')",
    batting_titles: "2 (1917: .341, 1919: .321)",
    bat_weight: "48 ounces — heaviest bat used in baseball history",
    bat_claim: "Never broke a bat in his big league career",
    inside_park_hr: 30,
    max_strikeouts: "Never more than 25 K in any season. Career: 260 K in 7,363 AB",
    reds_record: "1917-1926 with CIN: .339 BA, never below .323. Greatest Red before Big Red Machine.",
    holdouts: "Held out 1921, 1922 (most of season), 1923, 1927-1928, 1930 (entire year)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1923 SEASON
  //
  // CON: .351 BA — 2nd NL (behind Hornsby's .384). Led NL
  //      with 41 doubles. Career .323 with 2,376 hits.
  //      .352 career-high 1921. .351 in 1923. .348 in 1924.
  //      .339 in 1920. From 1917-1926: .339 BA with CIN,
  //      never below .323 in 10 full seasons. Never more
  //      than 25 K in any season. 48-ounce bat. Never broke it.
  //      Pete Alexander: "trickiest, smartest" batter he faced.
  //      Moved feet after pitcher released ball — place hitting.
  //      CON = 4 (NEAR-MAXIMUM — .351 BA, 41 2B led NL.
  //      .323 career. 2× batting champion. Never below .323
  //      in 10 straight full seasons. 48-oz bat, never broke it.
  //      Never more than 25 K. The trickiest, smartest batter.
  //      Elite contact, elite placement.)
  //
  // POW: 6 HR in 1923 (not a power hitter). Career 68 HR.
  //      But: 41 2B (led NL), 18 3B, 30 career inside-the-park
  //      HR. .490 SLG in 1923. Career .446 SLG. 182 career 3B.
  //      Gap power, not over-the-fence power. The 48-oz bat
  //      was for line drives, not moonshots.
  //      POW = 2 (ABOVE AVERAGE — substantial gap power,
  //      triple power, inside-park HR power. But only 68
  //      career HR. The bat was heavy for contact, not distance.)
  //
  // SPD: 14 SB in 1923. Career 268 SB. 182 career triples
  //      (exceptional). 30 inside-the-park HR. "Fleet-footed."
  //      Led PCL in SB with 69 (1917). Averaged 15 triples/
  //      season in prime.
  //      SPD = 3 (STRONG — 268 career SB, 182 career triples,
  //      30 inside-park HR. The speed was a genuine weapon.
  //      Not the fastest man alive but a significant factor.)
  //
  // DEF: "Far and away the best outfielder I ever saw" (Groh).
  //      "That Hoosier moves with the regal indifference of
  //      an alley cat" (McGraw). "Eddie used to take care of
  //      the whole outfield, not just center field."
  //      "Best arm of any outfielder in his era."
  //      Led NL CF in putouts (1920), fielding % (1919, 1921,
  //      1925). Set ML record with 6 straight putouts.
  //      Instructed teammates where to play. Positioned
  //      pitcher-turned-outfielder Bressler perfectly — "Why
  //      do we have to move around so much?"
  //      Born lefty, learned to throw righty, injured shoulder,
  //      went back to lefty. Played CF throwing left-handed.
  //      DEF = 3 (MAXIMUM — elite center fielder by any
  //      measure. Best arm, best range, best instincts of any
  //      NL outfielder of his era. The Alley Cat.)
  //
  // CLU: 1919 World Series champion (Reds over Black Sox).
  //      .214/.333/.357 in 8 WS games — not stellar hitting.
  //      7 RBI, 6 R, 2 SB in WS. But: only 1 WS appearance.
  //      Never returned to October after 1919.
  //      Insisted Reds would have won even without the fix.
  //      CLU = 1 (BELOW AVERAGE — 1 WS, 1 ring, .214 WS BA.
  //      The 1919 championship is forever asterisked by the
  //      Black Sox scandal. Never returned to October.)
  //
  // OVR: CON×2(8) + POW×1(2) + SPD×1.5(4.5) + DEF×0.5(1.5) + CLU×1.5(1.5) = 17.5 → normalized ~8
  // OVR = 8 (ALL-STAR) — Edd Roush. The Alley Cat.
  // The Hoosier who moved with regal indifference.
  // 48-ounce bat. Never broke it. Fell asleep in the outfield.
  // Held out every year. Sat out 1930 entirely.
  // "The best silence keeper in baseball."
  // The greatest Red of them all.
  // Lived to 94. Died before a spring training game
  // at a field named for his best friend.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 4,    // .351 BA, 41 2B led NL. Career .323. 2× batting champion. Never below .323 in 10 full CIN seasons. 48-oz bat, never broke it. ≤25 K/season.
    pow: 2,    // 6 HR, 41 2B, 18 3B. Gap/triple power not HR power. Career 68 HR, 182 3B, 30 IPHR. Heavy bat for contact.
    spd: 3,    // 14 SB. Career 268 SB, 182 3B, 30 IPHR. Fleet-footed. Speed was a genuine weapon.
    def: 3,    // MAXIMUM — "best outfielder I ever saw" (Groh). "Regal indifference of an alley cat" (McGraw). Best arm. 6 straight putouts ML record. Instructed teammates.
    clu: 1,    // 1 WS (1919). .214 WS BA. Ring is asterisked by Black Sox. Never returned to October.
  },

  stat_justification: {
    con: "Roush hit .351 in 1923 (2nd NL behind Hornsby) and led the NL with 41 doubles. His career: .323 BA with 2,376 hits. In 10 full seasons with Cincinnati (1917-1926), he never batted below .323. He won batting titles in 1917 (.341) and 1919 (.321). His career-high was .352 in 1921. He never struck out more than 25 times in any season (career: 260 K in 7,363 AB). He used a 48-ounce bat — the heaviest in baseball history — and claimed he never broke one. Pete Alexander called him and Ross Youngs the 'trickiest, smartest' batters he ever faced. Roush used an unusual technique, moving his feet after the pitcher released the ball to place-hit to all fields. Rating of 4.",
    pow: "Roush hit 6 HR in 1923 — he was not a home run hitter. Career: only 68 HR. However, he led the NL with 41 doubles (1923) and 21 triples (1924), with 182 career triples and 30 inside-the-park home runs. The power was genuine but it was GAP power — line drives into alleys, not over fences. The 48-ounce bat was designed for contact and line drives, not moonshots. Rating of 2.",
    spd: "Roush stole 14 bases in 1923. Career: 268 SB. His 182 career triples are extraordinary — you need elite speed to hit that many triples. He had 30 inside-the-park home runs. He was described as 'fleet-footed' throughout his career. The speed was a genuine weapon that powered his triples, his defense, and his baserunning. Rating of 3.",
    def: "This is the crown jewel. Heinie Groh: 'Eddie used to take care of the whole outfield, not just center field. He was far and away the best outfielder I ever saw.' John McGraw: 'That Hoosier moves with the regal indifference of an alley cat.' Roush set a ML record for outfielders with 6 straight putouts. He led NL CF in putouts (1920), fielding % (1919, 1921, 1925). He was 'renowned as having the best arm of any outfielder in his era.' He instructed teammates where to play — when pitcher-turned-outfielder Bressler played beside him in 1919, Bressler said: 'We're right in front of every line drive. What I can't understand is why we have to move around so much.' Born left-handed, learned to throw right when lefty gloves were scarce, injured his shoulder, went BACK to throwing left-handed — and still had the best arm. Rating of 3 (maximum).",
    clu: "Roush won the 1919 World Series with the Reds — the series forever shadowed by the Black Sox scandal. He hit .214 in the Series (6-for-28) with 7 RBI and 2 SB. He insisted until his dying day at 94 that the Reds would have won regardless of the fix. But he never appeared in another World Series. One ring, one October, one asterisk. Rating of 1.",
  },

  personality: {
    leadership_style: "THE INDIVIDUAL. Roush was 'the great individualist in the game' (Pat Moran). He didn't follow orders. When McGraw repositioned him, the batter hit a triple through the vacated spot. McGraw learned: 'Eddie, the next time I signal you to move, don't budge.' Roush led by KNOWING MORE THAN HIS MANAGERS. He positioned teammates. He instructed outfielders. He saw the game better than anyone on the field, including the man in the dugout.",
    temperament: "CANTANKEROUS AND PROUD. 'A proud and stubborn man' — the defining description. He hated spring training, never attended if he could avoid it, hunted quail in Indiana until a week before opening day, and STILL hit .351. He held out almost every year. He sat out ALL of 1930 over salary. He fell asleep in the outfield during an argument and got ejected. He was 'the best silence keeper in baseball.' He said what he wanted, closed his mouth, and waited. No gabbing. No explaining. The alley cat doesn't negotiate. The alley cat sits.",
    work_ethic: "NATURAL GENIUS, NO TRAINING REQUIRED. Pat Moran: 'All that fellow has to do is wash his hands, adjust his cap and he's in shape to hit.' Roush never needed spring training. He hunted and farmed all winter, arrived at the last possible moment, and produced at an elite level immediately. The body was always ready because the body was always WORKING — on the farm, in the field, hunting quail. Just not at a baseball facility.",
    lifestyle: "INDIANA FARMER. Oakland City, Indiana. Will Roush was a dairy farmer. Edd hunted quail and rabbits. He married Essie, had daughter Mary, and lived on the family land. After baseball: returned to the farm. Built a winter house in Bradenton, Florida. Saved his money from all those holdouts and was financially comfortable in retirement. No bartending, no security guard work, no debt. The alley cat planned ahead.",
    era_adaptability: "MODERATE-HIGH. The .323 career BA and elite defense would translate. The 48-ounce bat would be unthinkable today, but the plate discipline (≤25 K/season) and place-hitting ability would be extraordinary in any era. The speed (268 SB, 182 3B) would play. The defense would play. The holdouts? He'd be a free agent nightmare.",
    clubhouse_impact: "COMPLICATED. Roush was respected but not necessarily loved. He fought with McGraw constantly ('If you made a bad play he'd cuss you out, yell at you, call you all sorts of names. That didn't go with me.'). He was fiercely independent, frequently absent for holdouts, and didn't suffer fools. But he was NOT disliked — he was simply HIS OWN MAN. In ILB: Roush provides +1 to team defense (the alley cat positions everyone) but -1 to manager relations.",
    tragic_element: "THE ASTERISK AND THE SILENCE. Edd Roush won the 1919 World Series — the only championship of his career. It is forever shadowed by the Black Sox scandal. For 69 years, until his death at 94, Roush insisted the Reds were the better team and would have won regardless. Nobody listened. The greatest Red of them all had his greatest moment stolen — not by the Black Sox, but by HISTORY'S REFUSAL TO CREDIT THE REDS. He died at McKechnie Field in Bradenton, just before a spring training game, at the field named for his best friend. He was 94. He was still insisting.",
  },

  chemistry_traits: [
    { tag: "The 48-Ounce Bat", desc: "Heaviest bat in baseball history. Never broke it. In ILB, Roush's 48-oz bat provides +1 CON (the heavy bat controls the ball) but -1 POW (the bat is for placement, not distance). The bat is a tool, not a weapon." },
    { tag: "The Holdout", desc: "Held out almost every year. Sat out ALL of 1930. In ILB, Roush has a 30% chance of starting each season late. When he returns, he hits .385 for the rest of the year. The holdout is the STRATEGY, not the flaw." },
    { tag: "The Alley Cat", desc: "'That Hoosier moves with the regal indifference of an alley cat' (McGraw). In ILB, Roush has +2 DEF range and CANNOT be repositioned by his manager. He positions HIMSELF. If the manager tries to move him: the batter hits a triple through the vacated spot." },
    { tag: "Fell Asleep in the Outfield", desc: "June 8, 1920: during a lengthy argument, Roush fell asleep in center field. Ejected for delay of game. In ILB, once per season: d20. On 1: Roush falls asleep during a delay and is ejected. On 2-20: nothing happens. The cat naps." },
    { tag: "The Best Silence Keeper", desc: "'He is the best silence keeper in baseball. Just says real early what he wants and then closes up.' In ILB, Roush is IMMUNE to media pressure, contract disputes, and verbal intimidation. The silence is power." },
    { tag: "The 1919 Asterisk", desc: "Won the World Series that the Black Sox threw. In ILB, Roush's championship ring is PERMANENTLY CONTESTED. Opponents may challenge the ring's legitimacy. Roush always responds: 'We would have won anyway.'" },
    { tag: "The Hall of Fame Trade", desc: "Traded with Christy Mathewson and Bill McKechnie to Cincinnati (1916). Three future HOFers in one deal. In ILB, when Roush is traded, he brings +1 legacy value to the acquiring team." },
    { tag: "The Quail Hunter", desc: "Hunted quail and rabbits in Oakland City, Indiana until a week before opening day. Never needed spring training. In ILB, Roush does NOT require spring conditioning. He arrives ready. The farm is the training ground." },
  ],

  preferred_locations: [
    { location: "Redland Field / Crosley Field, Cincinnati", affinity: "MAXIMUM / HOME", note: "1917-1926. Ten full seasons, never below .323. 'Roush Day' in 1926. Threw out last ball at Crosley Field (1970). The greatest Red." },
    { location: "Center Field", affinity: "IDENTITY", note: "Not just center field — 'the whole outfield.' He positioned everyone. The alley cat owned the grass." },
    { location: "Oakland City, Indiana", affinity: "HOME / SOUL", note: "The family farm. The quail hunting. The silence. The holdouts were conducted from here. The cat always came home." },
    { location: "McKechnie Field, Bradenton, FL", affinity: "CODA", note: "Named for his best friend. He died here at 94, just before a spring training game. The last place. The right place." },
  ],

  momentum: {
    hot_triggers: [
      "Late-season surges — .385 over the last 37 games of 1921 after holdout + injuries. The cat wakes up when the season demands it.",
      "Post-holdout return — every time Roush returned from a holdout, he hit immediately. No rust. No adjustment. The farm was the training ground.",
      "Stable routine — when Roush was on his schedule (no McGraw interference, no spring training, just playing), he was .339 over 10 seasons.",
      "27-game hitting streaks (1920 and 1924) — when the bat found its groove, it stayed there for weeks.",
    ],
    cold_triggers: [
      "McGraw's interference — Roush hated being repositioned, criticized, or managed. McGraw's style clashed with Roush's independence.",
      "Injuries — fractured rib (1923), leg injuries (1921, 1924), torn stomach muscles (1928). The body was strong but not indestructible.",
      "Early-season holdout returns — the first few weeks after a holdout could be slow (.195 in first 19 games for Irish Meusel was similar; Roush had comparable adjustment periods).",
      "The Giant years — .304, .252, .324 with NYG (1927-1929). The cat didn't thrive in McGraw's cage.",
    ],
    pressure_response: "THE REGAL INDIFFERENCE OF AN ALLEY CAT. Roush didn't feel pressure because Roush didn't acknowledge pressure. He didn't try harder in big moments or shrink from them. He simply HIT THE WAY HE ALWAYS HIT. The 48-ounce bat swung the same way in September as in April. The .214 in the 1919 WS was below his standard, but the 7 RBI and 2 SB suggest he was still productive. The cat doesn't care about the stakes. The cat hunts.",
  },

  action_card_seeds: [
    {
      title: "Forty-Eight Ounces",
      type: "Equipment / Identity",
      text: "Your center fielder uses a 48-ounce bat. The heaviest bat in baseball history. Four ounces heavier than Babe Ruth's. He claims he has never broken it. Not once. Not ever. The bat is not a weapon — it is a TOOL. He doesn't swing for the fences. He places the ball. He moves his feet AFTER the pitcher releases the ball, adjusting his swing to hit to any field. The 48-ounce bat is the heaviest object in baseball swung by the lightest touch. He hits .351 with it. He leads the league in doubles. He never strikes out more than 25 times in a season. The bat is heavier than physics should allow and lighter than it has any right to feel.",
      origin: "Roush's legendary 48-ounce Louisville Slugger — heaviest in baseball history. Never broke it.",
    },
    {
      title: "The Cat Sleeps",
      type: "Character / Legend",
      text: "June 8, 1920. A lengthy argument breaks out on the field. The umpires argue with the managers. The managers argue with each other. The players crowd around. Your center fielder, standing in the outfield, lies down on the grass and falls asleep. His teammate Heinie Groh runs out to wake him. He cannot be woken. The umpire ejects your center fielder for delay of game. Your center fielder was not delaying. Your center fielder was SLEEPING. The alley cat naps when the alley cat pleases. The alley cat does not care about your argument.",
      origin: "Roush literally fell asleep in center field during an on-field argument (June 8, 1920). Ejected for delay of game.",
    },
    {
      title: "The Best Silence Keeper",
      type: "Negotiation / Character",
      text: "Every year, the same ritual. Your center fielder announces what he wants. Then he closes his mouth. He goes back to Indiana. He hunts quail. He tends the farm. The team offers less. He says nothing. The team threatens fines. He says nothing. The team tells the newspapers he is being unreasonable. He says nothing. Weeks pass. Sometimes months. Sometimes AN ENTIRE SEASON (1930). Eventually, the team gives him what he wants. Or he doesn't play. 'He is the best silence keeper in baseball. Just says real early what he wants and then closes up. No gabbing or elaborate explanations. Transacts business the way he plays ball — no fuss, but exceedingly effective.'",
      origin: "The Sporting News on Roush's negotiation tactics. He held out nearly every year of his career.",
    },
    {
      title: "We Would Have Won Anyway",
      type: "Legacy / Defiance",
      text: "1919. Your center fielder's team wins the World Series. They beat the Chicago White Sox five games to three. It is your center fielder's only championship. Then the truth comes out: eight White Sox players conspired to throw the Series. The Black Sox scandal. For the rest of his life — for SIXTY-NINE YEARS — your center fielder insists the Reds were the better team and would have won regardless. He says it in 1920. He says it in 1950. He says it in 1988, at age 94, days before he dies. He never stops saying it. He is correct: the Reds had the better pitching, the better defense, and his center fielder hit .321 to win the batting title that year. But nobody listens. The asterisk is permanent. The defiance is also permanent.",
      origin: "Roush's lifelong insistence that the 1919 Reds would have beaten the White Sox even without the fix.",
    },
  ],

  art_direction: {
    face: "5'11\" 170 lbs — not big. WIRY. Farmer's build — lean, strong, functional. Indiana face: weathered, sun-browned, angular, the face of a man who hunts quail at dawn and hits .351 at dusk. Eyes SHARP and KNOWING — the alley cat's eyes. He sees everything. He misses nothing. He also doesn't care what you think about what he sees. An expression of REGAL INDIFFERENCE — not arrogant, not hostile, simply UNCONCERNED with your opinion. The ever-so-slight suggestion of amusement. The cat watching the dogs argue.",
    attire: "Cincinnati Reds 1923 whites. LEFT-HANDED batting stance — unusual, the 48-ounce bat visible in his hands, disproportionately thick, the heaviest bat in baseball. The stance should be COMPACT and PRECISE — not a power stance, a PLACEMENT stance. The feet ready to MOVE after the pitch is released. Or: in center field, ranging — the full extension of the alley cat, covering not just center but the whole outfield. The body is FUNCTIONAL — every part serves a purpose, nothing wasted, nothing decorative.",
    mood: "REGAL INDIFFERENCE. This card has the quality of a cat sitting in a windowsill — completely aware of everything happening outside and completely uninterested in participating in any of it. The mood is SELF-POSSESSION — the absolute security of a man who knows exactly what he is worth and will not accept a penny less. Not aggressive. Not passive. SOVEREIGN.",
    style: "Full color — Bashers era — REDS RED AND INDIANA EARTH. Deep Cincinnati red, Indiana earth brown, farm cream, quail gray. The palette is GROUNDED — no flash, no electricity, no neon. This is soil and leather and heavy wood. The border should be EARTH BROWN — the color of the Oakland City farm, of the outfield grass at Redland Field, of the 48-ounce Louisville Slugger. THE ALLEY CAT — the card that doesn't need your approval. The most SELF-CONTAINED card in the Bashers. Every other card exists in relationship to something — teammates, rivals, records, recognition. The Alley Cat exists in relationship to ITSELF.",
    reference: "Ruth is the solar system. Hornsby is the blade. Frisch is the flash. Irish Meusel is the goldfish. Edd Roush is THE ALLEY CAT — the card that doesn't need you. He doesn't need spring training. He doesn't need your salary offer. He doesn't need your opinion about the 1919 World Series. He needs his farm, his 48-ounce bat, and center field. The rest is negotiable. The cat sleeps when the cat pleases. The cat hunts when the cat pleases. The cat hits .351 when the cat pleases. The cat lived to 94.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", redsRed: "#c6011f", earth: "#7a6040", quailGray: "#8a8575" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.earth}15`, border: `1px solid ${C.earth}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.earth, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.redsRed, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.redsRed}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function EddRoushCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = ROUSH_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.earth}20 0%, ${C.redsRed}08 50%, ${C.earth}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.earth, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Alley Cat</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.earth}`, boxShadow: `0 0 0 2px ${C.redsRed}15, 0 8px 30px rgba(0,0,0,0.25), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.earth}, ${C.redsRed}, ${C.earth})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.earth}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.earth}08, ${C.redsRed}02)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🐈</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.earth, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE ALLEY CAT</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.earth, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.redsRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.earth}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • 2× NL BATTING CHAMPION • 1919 WS CHAMPION</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.earth, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>48-oz bat • Never broke it • Fell asleep in the outfield • Lived to 94</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.redsRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.earth} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.redsRed}, ${C.earth})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".351" },{ label: "OPS", val: ".884" },{ label: "2B", val: "41" },{ label: "3B", val: "18" },{ label: "H", val: "183" },{ label: "R", val: "88" },{ label: "HR", val: "6" },{ label: "RBI", val: "88" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.earth}08`, border: `1px solid ${C.earth}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.redsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>48-OUNCE BAT • NEVER BROKE IT</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>HEAVIEST BAT IN BASEBALL HISTORY</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>Never struck out more than 25 times in any season. ≤25 K × 18 seasons.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.earth}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.earth}12` }}>
              {[{ label: "CAR AVG", val: ".323" },{ label: "CAR HITS", val: "2,376" },{ label: "CAR 3B", val: "182" },{ label: "CAR SB", val: "268" },{ label: "BAT TITLES", val: "2" },{ label: "WS RING", val: "1919" },{ label: "IPHR", val: "30" },{ label: "AGE", val: "94" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.earth, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🐈 Regal Indifference", "⚾ 48-oz Bat", "🏆 Greatest Red (1969)", "😴 Fell Asleep in OF", "🤫 Best Silence Keeper", "🌾 Indiana Farmer", "🎯 ≤25 K Every Season"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.earth}08`, border: `1px solid ${C.earth}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.earth, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE ALLEY CAT</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.earth}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.earth : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.earth : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "🐈 THE ASTERISK AND THE SILENCE" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.earth } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.earth }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.earth}15`, color: C.earth, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.earth }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.earth}05`, border: `1px solid ${C.earth}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: `${C.redsRed}10`, color: C.redsRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.earth}, ${C.redsRed}, ${C.earth})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
