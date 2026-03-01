// /cards/players/rogers-hornsby.jsx
import { useState } from "react";

const HORNSBY_DATA = {
  name: "Rogers Hornsby",
  nickname: "The Rajah",
  year: 1924,
  team: "St. Louis Cardinals",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "2B",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "175 lbs",
  born: "April 27, 1896 — Winters, Texas",
  died: "January 5, 1963 — Chicago, Illinois (age 66). Heart attack following cataract surgery. Buried in Hornsby family cemetery, Austin, Texas.",
  hof: "INDUCTED 1942 (FIRST BALLOT — 2nd year of eligibility). .358 career BA (2nd all-time), 2,930 H, 301 HR, 1,584 RBI. 7× batting champion. 2× Triple Crown. 2× NL MVP. 9× SLG leader. 9× OBP leader. 1926 WS champion (player-manager). The greatest right-handed hitter in baseball history. The most unpleasant man in the game.",

  real_stats: {
    season: 1924,
    batting_avg: ".424",
    obp: ".507",
    slg: ".696",
    ops: "1.203",
    hits: 227,
    doubles: 43,
    triples: 14,
    home_runs: 25,
    rbi: 94,
    runs: 121,
    stolen_bases: 5,
    total_bases: 373,
    games: 143,
    war: 12.1,
    note: "Highest BA in modern (live-ball) era. Still unmatched 100+ years later.",
    five_year_run: ".397 / .401 / .384 / .424 / .403 (1921-1925) — avg .402",
    triple_crown_1922: ".401 BA / 42 HR / 152 RBI",
    triple_crown_1925: ".403 BA / 39 HR / 143 RBI",
    career_batting_avg: ".358",
    career_hits: 2930,
    career_hr: 301,
    career_rbi: 1584,
    career_runs: 1579,
    batting_titles: 7,
    triple_crowns: 2,
    mvp_awards: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1924 SEASON
  //
  // CON: .424 BA. FOUR HUNDRED AND TWENTY-FOUR.
  //      The highest in the modern era. 100 years later, unmatched.
  //      227 H. .507 OBP. Career .358 — 2nd all-time.
  //      7× batting champion. 6 consecutive NL titles (1920-1925).
  //      Over 5 years averaged .402.
  //      CON = 5 (ABSOLUTE MAXIMUM — there is no higher.
  //      .424 is the ceiling of human batting. If Ruth is 5 in a
  //      different way, Hornsby is 5 in THIS way. Pure contact
  //      supremacy. The greatest right-handed hitter who ever lived.)
  //
  // POW: 25 HR in 1924. 42 HR in 1922 (led NL). 39 HR in 1925.
  //      .696 SLG in 1924. 301 career HR. 2× Triple Crown.
  //      43 2B, 14 3B, 373 TB in 1924. In 1922, his 450 TB
  //      led the league by 136. The power was REAL — not just
  //      average, but Ruthian-level slugging from a 2B.
  //      POW = 4 (NEAR-MAXIMUM — 42 HR from a second baseman
  //      in 1922 is extraordinary. .696 SLG. 301 career HR.
  //      Not quite Ruth/Gehrig tier but a step above everyone else.)
  //
  // SPD: 5 SB in 1924. 33 career inside-the-park HR (fast).
  //      14 3B. Played SS early in career. Not slow.
  //      But not a speed player. Average baserunner.
  //      SPD = 1 (BELOW AVERAGE — not a factor on the bases.
  //      The IPHR and 3B suggest adequate speed but this was
  //      never a weapon. He hit, he didn't run.)
  //
  // DEF: Played SS, 3B, then settled at 2B in 1920. Led 2B in
  //      errors with 34 in 1920. Improved to adequate. Never
  //      elite defensively — the bat was everything.
  //      DEF = 1 (ADEQUATE — competent at 2B but not a strength.
  //      Led league in errors early. Nobody cared because he
  //      hit .424. The defense was serviceable, not special.)
  //
  // CLU: 1926 WS champion as player-manager (beat Yankees).
  //      But only 1 WS ring despite playing 23 seasons.
  //      Career WS BA: .245 (below his standard).
  //      The 1926 WS is legendary (Grover Alexander, Ruth
  //      caught stealing to end it). But the individual WS
  //      numbers are modest.
  //      CLU = 2 (SOLID — the 1926 WS management and team
  //      success earn credit. But .245 career WS BA from a
  //      .358 career hitter shows some October drop-off.)
  //
  // OVR: CON×2(10) + POW×1(4) + SPD×1.5(1.5) + DEF×0.5(0.5) + CLU×1.5(3) = 19 → normalized ~11
  // OVR = 11 (LEGEND) — The Rajah. The greatest right-handed
  // hitter in baseball history. The .424. The five-year .402.
  // The man who never read a book, never watched a movie,
  // stared out the window and waited for spring.
  // This is a LEGEND card — the highest non-Ruth, non-Gehrig
  // OVR in the Bashers. He SHOULD be 12+ on pure hitting,
  // but the personality drag (fired everywhere, gambling,
  // toxic clubhouse presence) and limited defense/speed
  // keep him at 11.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 11,
    con: 5,    // .424 BA — modern era record. Career .358 — 2nd all-time. 7× batting champion. 6 consecutive NL titles. Over 5 years: .402 average. ABSOLUTE MAXIMUM.
    pow: 4,    // 25 HR (.696 SLG) in 1924. 42 HR in 1922, 39 in 1925. 2× Triple Crown. 301 career HR. 1,584 career RBI. Extraordinary power from a 2B.
    spd: 1,    // 5 SB. 14 3B. 33 career IPHR. Adequate, not a weapon. He hit, he didn't run.
    def: 1,    // Competent at 2B, not a strength. Led league in errors early. Nobody cared.
    clu: 2,    // 1926 WS champion (player-manager). But .245 career WS BA from a .358 career hitter. Only 1 ring in 23 seasons.
  },

  stat_justification: {
    con: "Rogers Hornsby hit .424 in 1924. It is the highest batting average in the modern (live-ball) era, and no one has matched it in the century since. He collected 227 hits with a .507 OBP. His career batting average of .358 is second in MLB history only to Ty Cobb. He won 7 NL batting titles, including 6 consecutive (1920-1925). During those six years, his batting averages were .370, .397, .401, .384, .424, and .403 — a composite .402. Arthur Daley called this 'the most unbelievable period of batting greatness in baseball history.' He never read books, never watched movies, and ate steak and milk to protect his 'batting eyes.' This is the maximum possible contact rating. Rating of 5.",
    pow: "Hornsby hit 25 home runs in 1924 with a .696 SLG. In 1922, he hit 42 HR (leading the NL by 16) with 152 RBI and 450 total bases (leading by 136). In 1925, he hit 39 HR with 143 RBI. He won 2 Triple Crowns (1922, 1925) — one of only two players in NL history. Career: 301 HR, 1,584 RBI. He was the first player to hit 40 HR and bat .400 in the same season (1922). For a second baseman, this power is unprecedented — no 2B before or since has combined this level of contact and power. Rating of 4.",
    spd: "Hornsby stole 5 bases in 1924 and had 14 triples. He finished his career with 33 inside-the-park home runs, suggesting he had decent speed, particularly early in his career when he played shortstop. But speed was never a weapon for Hornsby. His game was about the bat, not the legs. Career: 135 stolen bases over 23 seasons — modest. Rating of 1.",
    def: "Hornsby played shortstop early in his career before settling at second base in 1920. His first year at 2B, he led the position in errors with 34. He improved over time to a competent defender but was never elite. His value was entirely in his bat. Branch Rickey and others recognized this — they moved him to 2B specifically to reduce the defensive burden while keeping his bat in the lineup. Rating of 1.",
    clu: "Hornsby player-managed the 1926 Cardinals to their first World Series championship, defeating the Yankees in a legendary seven-game series that ended with Babe Ruth caught stealing. This is a significant achievement. However, his career World Series batting average is .245 — a significant drop from his .358 career average. He appeared in only 2 World Series in 23 seasons. The 1926 WS management earns credit, but the personal October numbers and limited postseason appearances hold the rating back. Rating of 2.",
  },

  personality: {
    leadership_style: "TYRANNICAL PERFECTIONISM. Hornsby led by demanding that everyone match his monomaniacal dedication to baseball. He insisted teammates follow his lifestyle — no movies, no books, no drinking, no smoking, no fun. Most players despised him for it. He was fired from every managerial job he ever held. When Bill Veeck fired him from the Browns in 1952, his players gave Veeck a trophy inscribed 'For the greatest play since the Emancipation Proclamation.' His memoir was titled 'My War With Baseball.' This is not leadership. This is domination disguised as leadership.",
    temperament: "BRUTAL HONESTY WITH ZERO DIPLOMACY. Sam Breadon: 'Listening to Hornsby was like having the contents of a rock crusher emptied over his head.' Lee Allen: 'Frank to the point of being cruel and as subtle as a belch.' Eating dinner with teammate Eddie Farrell, a sportswriter asked if the Giants could win the pennant. Hornsby's response, with Farrell sitting right there: 'Not with Farrell playing shortstop.' At 15, complimented on his fielding at 2B: 'Yeah, and there are eight other positions I can play just as good.' The honesty was pathological. It was not a choice — it was a compulsion.",
    work_ethic: "OBSESSIVE AND MONOMANIACAL. Hornsby's life was baseball and horses and nothing else. He never read (damaged eyesight). Never watched movies (damaged eyesight). Never smoked (mother's orders). Never drank (mother's orders). Diet: red meat, milk, ice cream. 'People ask me what I do in winter when there's no baseball. I'll tell you what I do. I stare out the window and wait for spring.' This is not work ethic — this is worship. Baseball was his religion, his identity, his entire world. Everything else — people, relationships, money, decency — was an obstacle.",
    lifestyle: "ASCETIC EXCEPT FOR THE VICE. Hornsby lived like a monk devoted to hitting. No movies. No books. No alcohol. No tobacco. No cards. No golf ('I don't want to play golf. When I hit a ball, I want someone else to go chase it.'). But he gambled compulsively on horse racing. A bookmaker once sued him for $70,075. He borrowed money from teammates to fund bets. He lost heavily in the 1929 crash. The gambling caused multiple trades and firings. He had to play in the minors in his 40s to pay debts. The monk had a demon, and the demon ate everything the monk earned.",
    era_adaptability: "THE HIGHEST. Hornsby's hitting approach — studying pitchers, protecting eyesight, physical conditioning — anticipated modern sports science by decades. His .424 BA would obviously be lower in modern baseball, but his approach, discipline, and hand-eye coordination would translate to any era. He'd be a .330 hitter with 35+ HR today — an MVP candidate in any decade. The personality, however, would get him traded within a year of every team, just as it did in the 1920s.",
    clubhouse_impact: "MAXIMUM NEGATIVE. Hornsby is the anti-Bottomley. Where Sunny Jim was +3 morale, Hornsby is -3. He made teammates miserable. He insulted them to their faces. He borrowed their money and lost it on horses. He demanded they live like monks while he gambled away fortunes. One writer called him 'a liturgy of hatred.' Bill James named him 'the biggest horse's ass in baseball history.' In ILB, Hornsby provides -2 to team morale but +3 to team batting discipline. The bat is worth the damage. Barely.",
    tragic_element: "THE LONELINESS OF SUPREMACY. Hornsby was the greatest right-handed hitter who ever lived, and he died essentially alone — three marriages, all storms; decades of alienation from every organization he touched; gambling debts that kept him in the minors past 40; cataracts that destroyed the eyes he'd protected his entire life. The cataract surgery that preceded his fatal heart attack is the cruelest irony: the man who never read, never watched movies, never did anything to harm his eyesight — died having his eyes fixed. He stared out the window and waited for spring, and spring eventually stopped coming.",
  },

  chemistry_traits: [
    { tag: "The .424", desc: "The highest batting average in the modern era. 100 years and counting. In ILB, Hornsby has a NON-ZERO chance of hitting .400 in any given season — the only card in the entire system with this probability. When Hornsby is locked in, the contact rating effectively becomes 6 on a 5-point scale. The scale breaks." },
    { tag: "Go-To-Hell Eyes", desc: "Westbrook Pegler's description. Hornsby's gaze was a weapon — pitchers, teammates, owners, umpires all felt it. In ILB, Hornsby has +2 to intimidation vs. all opponents. But -2 to all interpersonal interactions with teammates, management, and media. The eyes see everything and forgive nothing." },
    { tag: "The Monk's Vice", desc: "Never read. Never watched movies. Never smoked. Never drank. But gambled compulsively on horse racing. In ILB, Hornsby has +2 to personal discipline stats but a d20 roll each season: on 1-3, a gambling crisis reduces his concentration for 2 weeks. The demon is always present." },
    { tag: "Fired From Everywhere", desc: "Managed 5 major-league clubs. Fired from ALL FIVE. Traded after winning the 1926 WS. In ILB, Hornsby has a 25% chance per season of causing a manager conflict that results in his being traded or benched. The talent is always worth it. The cost is always real." },
    { tag: "The Window", desc: "'People ask me what I do in winter when there's no baseball. I'll tell you what I do. I stare out the window and wait for spring.' In ILB, Hornsby's stats in April (spring) are +1 across the board. The waiting is over. The window opens. He comes out swinging." },
    { tag: "Bottomley's Shadow-Caster", desc: "Bottomley hit .371 as a rookie — 2nd to Hornsby's .384. Hit .367 in 1925 — 2nd to Hornsby's .403. In ILB, any teammate with CON 3+ within Hornsby's shadow produces at THEIR natural rate but receives no recognition. The Rajah absorbs all light." },
    { tag: "The Rock Crusher", desc: "Sam Breadon: 'Listening to Hornsby was like having the contents of a rock crusher emptied over his head.' In ILB, Hornsby provides -2 to team morale but +3 to team batting discipline. The abuse works. The lineup hits better because they're terrified of being called humpty-dumpties." },
    { tag: "The Cataracts", desc: "Hornsby died following cataract surgery — the eyes he spent a lifetime protecting failed anyway. In ILB, Hornsby's CON rating declines by 1 every 3 seasons after age 33. The eyes age. The monk's devotion delays but cannot prevent the decline. The irony is structural." },
  ],

  preferred_locations: [
    { location: "The Batter's Box", affinity: "ABSOLUTE", note: "The only place Hornsby was happy. The only place the world made sense. Everything else was waiting to get back here." },
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / HOME", note: "1915-1926, 1933. 12 seasons. 6 consecutive batting titles. The .424. The 1926 WS. Then traded away." },
    { location: "The Racetrack", affinity: "ADDICTION", note: "Hornsby's great vice. Lost more than he won. Bookmaker sued for $70,075. The demon that devoured the monk's earnings." },
    { location: "The Window", affinity: "EXILE", note: "Where he waited for spring. Where the greatest hitter in the world sat when there was nothing to hit. The loneliest place in baseball." },
  ],

  momentum: {
    hot_triggers: [
      "The plate — always. Hornsby hit .402 over five years. The hot streak was YEARS long. When he was at the plate, he was the best who ever lived.",
      "Spring — the window opens. Hornsby's April stats were consistently excellent. He arrived at spring training hungry.",
      "Adversity with management — when owners or managers challenged him, Hornsby often responded with even better hitting. The spite fueled the bat.",
      "Right-handed pitching — Hornsby crushed RHP throughout his career. The stance, the eyes, the discipline were built to destroy right-handers.",
    ],
    cold_triggers: [
      "October — .245 career WS BA from a .358 career hitter. The biggest stage dimmed him slightly.",
      "Personal turmoil — gambling debts, divorces, and managerial firings occasionally affected his focus. The monk was not immune to the demon.",
      "Late career — cataracts and age caught up. The eyes he protected failed. The .424 became .245 (1934).",
      "Team chemistry collapse — when the clubhouse turned completely against him, even Hornsby's bat couldn't overcome the isolation.",
    ],
    pressure_response: "TRANSCENDENT AT THE PLATE, DESTRUCTIVE EVERYWHERE ELSE. Hornsby under pressure hit better. Hornsby under pressure managed worse. The bat responded to pressure by becoming more focused. The personality responded to pressure by becoming more toxic. CLU = 2 reflects this duality: magnificent individual talent, compromised team outcomes.",
  },

  action_card_seeds: [
    {
      title: "Four Twenty-Four",
      type: "Record / Supremacy",
      text: "1924. Your second baseman hits .424. Four hundred and twenty-four. The highest batting average in the modern era. One hundred years later, nobody has matched it. He gets 227 hits in 536 at-bats. His on-base percentage is .507. His slugging percentage is .696. His OPS is 1.203. He leads the league in hits, doubles, on-base percentage, slugging percentage, runs, total bases. He does not win the MVP because the award doesn't exist yet in its current form. He does not win the batting title because there is no one close enough to make it a race. He wins, period. The .424 is not a number. It is a monument.",
      origin: "Hornsby's .424 BA in 1924 — highest in the modern era, still unmatched.",
    },
    {
      title: "The Five-Year Run",
      type: "Supremacy / Duration",
      text: "1921: .397. 1922: .401. 1923: .384. 1924: .424. 1925: .403. Five years. Five batting averages. Composite: .402. Arthur Daley of the New York Times: 'The most unbelievable period of batting greatness in baseball history.' Your second baseman hits over .380 for five consecutive seasons. He hits over .400 three times. He wins two Triple Crowns. He leads the league in batting average, on-base percentage, and slugging percentage every single year. There is nothing in baseball history that compares to this. Ty Cobb had longer sustained excellence. Ted Williams had the eye. But nobody had THIS — five years of absurd, impossible, record-breaking contact supremacy. The Rajah's reign.",
      origin: "Hornsby's 1921-1925 — the greatest five-year hitting stretch in baseball history.",
    },
    {
      title: "Not With Farrell",
      type: "Character / Personality",
      text: "Your second baseman is eating dinner with his teammate, shortstop Eddie Farrell. A sportswriter stops by the table. 'Do you think the Giants can win the pennant this year?' Your second baseman does not pause. Does not soften. Does not consider that Eddie Farrell is SITTING RIGHT THERE. 'Not with Farrell playing shortstop.' Farrell puts down his fork. The sportswriter writes it down. Your second baseman continues eating. He does not understand why this is a problem. He was asked a question. He answered honestly. Honesty is all he knows. Honesty and batting averages.",
      origin: "Hornsby's brutal honesty to sportswriter about teammate Eddie Farrell — with Farrell at the table.",
    },
    {
      title: "The Window",
      type: "Character / Solitude",
      text: "'People ask me what I do in winter when there's no baseball. I'll tell you what I do. I stare out the window and wait for spring.' This is your second baseman's confession. He does not read — it would damage his eyesight. He does not watch movies — flickering lights. He does not drink. He does not smoke. He does not play cards. He does not play golf. ('When I hit a ball, I want someone else to go chase it.') What is left? A window. A racetrack. And waiting. The greatest hitter who ever lived, sitting in a chair, staring through glass, doing nothing, because nothing that is not baseball is worth doing.",
      origin: "Hornsby's famous quote about winter. The ascetic life built around one purpose.",
    },
    {
      title: "The Emancipation",
      type: "Character / Toxic Legacy",
      text: "1952. Bill Veeck fires your second baseman as manager of the St. Louis Browns after 51 games. The players are so grateful they present Veeck with a three-foot trophy. The inscription reads: 'To Bill Veeck: For the greatest play since the Emancipation Proclamation.' Your second baseman has been fired from every managerial job he has ever held. Cardinals. Giants. Braves. Cubs. Browns. Five teams. Five firings. He will write a book about it. He will call it 'My War With Baseball.' The war is with everyone. The war is with the world. The only peace he ever knew was the batter's box.",
      origin: "Hornsby's players celebrating his firing. Five managerial dismissals. 'My War With Baseball.'",
    },
    {
      title: "The Monk and the Demon",
      type: "Character / Duality",
      text: "Your second baseman lives like a monk. No movies. No books. No alcohol. No tobacco. Red meat, milk, ice cream. Eleven hours of sleep. He protects his eyesight with the devotion of a priest protecting sacred text. And then he goes to the racetrack. A bookmaker sues him for seventy thousand dollars. He borrows money from teammates. He loses heavily in the crash of 1929. The gambling costs him the Cardinals, the Giants, the Cubs, the Browns. The monk builds a temple to hitting. The demon burns it down with horse-race tickets. They are the same man.",
      origin: "Hornsby's ascetic lifestyle vs. his compulsive horse-racing gambling.",
    },
  ],

  art_direction: {
    face: "5'11\" 175 lbs — lean, hard, SHARP. Not handsome — SEVERE. Go-to-hell eyes. Clear, wide-set, meeting yours squarely. The face of a man who told the truth always and never understood why the truth made people hate him. No warmth. No softness. No apology. The jaw is set. The mouth is a line. The expression says: I hit .424 and I don't care if you like me. This is the OPPOSITE face to Bottomley's smile. Bottomley is sunshine. Hornsby is the sun itself — blinding, indifferent, necessary.",
    attire: "St. Louis Cardinals 1924 home whites. RIGHT-HANDED batting stance — the famous flat-footed, square stance, bat held far back, weight shifted but STILL. Hornsby's stance was unique: feet close together, stood far from the plate, stepped INTO the pitch. The body should look COILED — not fast like Cuyler but LOADED, like a spring compressed past its design limit. Every muscle committed to the next swing. The uniform should be immaculate — Hornsby was not a dirty-uniform player. He was precise.",
    mood: "COLD SUPREMACY. This card is not dark (Mays) or warm (Bottomley) or fast (Cuyler) — it is COLD. The cold of mathematical perfection. The cold of a man who hit .424 and felt nothing because .424 was simply what the bat was supposed to do. The mood is ISOLATION — the greatest hitter in the world, alone at dinner, alone in winter, alone in the batter's box. The mood is SEVERITY — no decoration, no comfort, no compromise.",
    style: "Full color — Bashers era — STARK AND PRECISE. Cardinals red but COLDER than Bottomley's warm red — the red of a stop sign, not a sunset. White that is CLINICAL, not warm. The border should be COLD GOLD — the gold of a crown worn by someone who rules alone. THE RAJAH — royalty without subjects. The card should feel like holding something expensive that might cut you. The most valuable card in the Bashers after Ruth and Gehrig — and the least loved.",
    reference: "Ruth is the solar system. Gehrig is the axis. Bottomley is the sunshine. Hornsby is THE BLADE — the sharpest edge in the Bashers, cutting everything it touches. He is the most concentrated talent in the set: the highest CON, the narrowest life, the coldest eyes. The card that makes you understand why .424 is both the most beautiful and most terrifying number in baseball. The blade that cannot be held without bleeding.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", coldGold: "#b8962e", bladeRed: "#a61c2c", starkWhite: "#f0ece4", steelGray: "#5a5a5a" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.steelGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e0dcd2", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.steelGray}30` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}dd)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.coldGold}10`, border: `1px solid ${C.coldGold}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.bladeRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.bladeRed, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.bladeRed}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function RogersHornsbyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HORNSBY_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a1a1a 0%, ${C.bladeRed}50 50%, #1a1a1a 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.coldGold, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>LEGEND CARD — Bashers Era — The Blade</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.starkWhite, borderRadius: 8, border: `3px solid ${C.coldGold}`, boxShadow: `0 0 0 2px ${C.bladeRed}, 0 0 40px ${C.coldGold}20, 0 16px 50px rgba(0,0,0,0.6), inset 0 1px 0 #fff`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, #1a1a1a, ${C.coldGold}, ${C.bladeRed}, ${C.coldGold}, #1a1a1a)`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.coldGold}30`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.starkWhite}, #eae6de, ${C.bladeRed}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🗡️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.bladeRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE BLADE</div>
                <div style={{ fontSize: 10, color: C.steelGray, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.starkWhite}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${C.coldGold}, ${C.bladeRed})`, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.bladeRed}ee`, color: C.coldGold, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(90deg, ${C.bladeRed}, ${C.coldGold})`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>LEGEND • 2× MVP • 2× TRIPLE CROWN • HOF 1942</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.steelGray, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.bladeRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontWeight: 700, letterSpacing: 1 }}>THE GREATEST RIGHT-HANDED HITTER IN BASEBALL HISTORY</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.bladeRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.coldGold} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.steelGray} />
              <StatBar label="DEF" value={s.def} max={3} color={C.steelGray} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.coldGold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.bladeRed}, ${C.coldGold}cc, ${C.bladeRed})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".424" },{ label: "OPS", val: "1.203" },{ label: "H", val: "227" },{ label: "HR", val: "25" },{ label: "2B", val: "43" },{ label: "3B", val: "14" },{ label: "R", val: "121" },{ label: "WAR", val: "12.1" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ fontSize: 10, color: C.bladeRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, fontWeight: 900 }}>.424 — HIGHEST BA IN THE MODERN ERA — STILL UNMATCHED</div>
            </div>
            <div style={{ background: `${C.coldGold}10`, border: `1px solid ${C.coldGold}20`, borderRadius: 4, padding: 8, marginTop: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: C.coldGold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, marginBottom: 6, textAlign: "center" }}>THE FIVE-YEAR RUN (1921-1925)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2 }}>
                {[{ yr: "'21", avg: ".397" },{ yr: "'22", avg: ".401" },{ yr: "'23", avg: ".384" },{ yr: "'24", avg: ".424" },{ yr: "'25", avg: ".403" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center", background: s.avg === ".424" ? `${C.bladeRed}15` : "transparent", borderRadius: 3, padding: "2px 0" }}><div style={{ fontSize: 8, color: C.steelGray }}>{s.yr}</div><div style={{ fontSize: 14, fontWeight: 900, color: s.avg === ".424" ? C.bladeRed : C.ink, fontFamily: "'Courier Prime', monospace" }}>{s.avg}</div></div>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 10, color: C.coldGold, fontFamily: "'Courier Prime', monospace", fontWeight: 900, marginTop: 4 }}>COMPOSITE: .402 — "The most unbelievable period of batting greatness in baseball history"</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.bladeRed}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.bladeRed}15` }}>
              {[{ label: "CAR AVG", val: ".358" },{ label: "CAR H", val: "2,930" },{ label: "CAR HR", val: "301" },{ label: "CAR RBI", val: "1,584" },{ label: "BAT TITLES", val: "7" },{ label: "TRIPLE CR", val: "2" },{ label: "MVP", val: "2" },{ label: "WS RINGS", val: "1" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.bladeRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.5 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🗡️ .424 Modern Record", "👑 The Rajah", "🏆 1926 WS Champion", "🏇 Compulsive Gambler", "📺 Never Watched Movies", "📖 Never Read Books", "🔥 Fired 5× as Manager", "🪟 Waited for Spring", "⚾ .402 Over 5 Years"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.coldGold}08`, border: `1px solid ${C.coldGold}20`, padding: "2px 8px", borderRadius: 10, color: C.steelGray, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.bladeRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>LEGEND DOSSIER — {d.year} — THE BLADE</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.bladeRed}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.bladeRed : "transparent", color: tab === t.id ? "#fff" : C.steelGray, border: `1px solid ${tab === t.id ? C.bladeRed : C.steelGray}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚠ THE LONELINESS" : key === "clubhouse_impact" ? "⚠ CLUBHOUSE (TOXIC)" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "clubhouse_impact" || key === "tragic_element" ? { color: C.bladeRed } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.bladeRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "ABSOLUTE" ? `${C.coldGold}20` : l.affinity.includes("ADDICTION") ? `${C.hotRed}20` : l.affinity.includes("EXILE") ? `${C.steelGray}20` : `${C.bladeRed}20`, color: l.affinity === "ABSOLUTE" ? C.coldGold : l.affinity.includes("ADDICTION") ? C.hotRed : l.affinity.includes("EXILE") ? C.steelGray : C.bladeRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.bladeRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.coldGold}05`, border: `1px solid ${C.coldGold}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Record") || a.type.includes("Supremacy") ? `${C.coldGold}20` : a.type.includes("Toxic") ? `${C.hotRed}20` : `${C.bladeRed}12`, color: a.type.includes("Record") || a.type.includes("Supremacy") ? C.coldGold : a.type.includes("Toxic") ? C.hotRed : C.bladeRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, #1a1a1a, ${C.coldGold}, ${C.bladeRed}, ${C.coldGold}, #1a1a1a)`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB LEGEND #{d.ilb_team} • HOF 1942</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
