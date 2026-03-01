// /cards/players/dolf-luque.jsx
import { useState } from "react";

const LUQUE_DATA = {
  name: "Dolf Luque",
  nickname: "The Pride of Havana",
  year: 1923,
  team: "Cincinnati Reds",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'7"',
  weight: "160 lbs",
  born: "August 4, 1890 — Havana, Cuba. Full name: Adolfo Domingo De Guzmán Luque. Blue-eyed, fair-skinned Cuban. Played with integrated Cuban teams and Negro League teams before organized baseball.",
  died: "July 3, 1957 — Havana, Cuba (age 66). Returned home. Died in Havana. The Pride of Havana died in Havana.",
  hof: "NOT IN COOPERSTOWN. Cuban Baseball Hall of Fame (1957). Cincinnati Reds Hall of Fame (1967). Mexican Baseball Hall of Fame (1985). Three halls, zero Cooperstown. The first Latin American star in MLB — and the most overlooked. 194-179, 3.24 ERA, 20 seasons. Ernest Hemingway mentioned him in 'The Old Man and the Sea': 'Who is the greatest manager, really, Luque or Mike Gonzalez?'",

  real_stats: {
    season: 1923,
    wins: 27,
    losses: 8,
    era: "1.93",
    era_plus: 201,
    innings_pitched: "322.0",
    complete_games: 28,
    shutouts: 6,
    strikeouts: 151,
    walks: 88,
    hits_allowed: 264,
    home_runs_allowed: 2,
    war: 10.6,
    whip: "1.09",
    games: 41,
    note: "LED NL IN WINS (27), ERA (1.93), SHUTOUTS (6), WIN% (.771). 201 ERA+ — DOUBLE the league average. Only 2 HR allowed in 322 IP. 28 CG (2nd NL). Modern Reds single-season wins record (tied Bucky Walters 1939). 10.6 WAR — one of the highest single-season WARs for any pitcher in NL history.",
    career_wins: 194,
    career_losses: 179,
    career_era: "3.24",
    career_era_plus: 117,
    career_ip: "3220.1",
    career_cg: 206,
    career_sho: 26,
    career_k: 1130,
    career_seasons: "20 (1914-1935)",
    ws_appearances: "2 (1919 Reds, 1933 Giants)",
    ws_record: "Won clinching game of 1933 WS at AGE 43 — oldest pitcher ever to win a WS game",
    cuban_league: "106-71 career. 8 championships as manager. 22 seasons pitching. 19 seasons managing. All-time leader in years pitching.",
    firsts: "First Latin American pitcher in MLB. First Latino to win a WS game (1919). First Latino to lead in wins, ERA, shutouts. First Latino to 100 career wins.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION — 1923 SEASON
  //
  // STF: 1.93 ERA — led NL. 201 ERA+ — double league average.
  //      Only 2 HR allowed in 322 IP. "Blazing fastball" +
  //      curveball as best pitch. 151 K in 322 IP.
  //      "Worked batters like a surgeon."
  //      STF = 4 (NEAR-MAXIMUM — the 1.93 ERA in 1923's
  //      hitter-friendly environment is extraordinary.
  //      201 ERA+ is elite. Only 2 HR in 322 IP.
  //      The stuff was DOMINANT. Not quite Vance's K rate
  //      but the ERA and run prevention are superior.)
  //
  // CTL: 88 BB in 322 IP = 2.46 BB/9. Not bad but not
  //      elite for the era. His WHIP was 1.09 — very good.
  //      He "cut corners inside and out, up and down" —
  //      surgical control. But 88 walks in 322 IP is
  //      workmanlike, not masterful.
  //      CTL = 3 (GOOD — 1.09 WHIP, surgical approach,
  //      but the walk rate is merely solid, not exceptional.)
  //
  // STM: 322 IP. 28 complete games (2nd NL). 6 shutouts
  //      (led NL). 41 games. Won both ends of a doubleheader
  //      on July 17. Month-by-month consistency: never more
  //      than 3 losses in any month. Iron man.
  //      Career: 3,220.1 IP, 206 CG, 26 SHO.
  //      Still pitching effectively at 43 (1933 WS).
  //      STM = 4 (NEAR-MAXIMUM — 322 IP, 28 CG, 6 SHO.
  //      Won both ends of a doubleheader. Career: 3,220 IP.
  //      Won WS game at 43. The man was IRON.)
  //
  // DEF: Above-average hitting pitcher: .227 career BA,
  //      5 HR, 90 RBI. Hit .321/.424/.464 in 1918.
  //      Hit .405 in Cuban winter league 1923-24.
  //      Also played integrated Cuban teams as infielder.
  //      Good fielder for a pitcher.
  //      DEF = 2 (ABOVE AVERAGE — legitimately good hitter
  //      for a pitcher, solid fielder. The Cuban leagues
  //      used him as a position player too.)
  //
  // CLU: 1919 WS: 5 scoreless IP in relief (1 H, 6 K).
  //      1933 WS: Won clinching Game 5 at AGE 43 —
  //      oldest pitcher to ever win a WS game.
  //      But: only 2 WS appearances in 20-year career.
  //      1923: 27-8 on a non-contending team (2nd place).
  //      CLU = 2 (SOLID — WS ring in 1919, WS-clinching
  //      win in 1933 at 43. Scoreless WS relief. But limited
  //      October appearances over a long career.)
  //
  // OVR: STF×2(8) + CTL×1(3) + STM×1.5(6) + DEF×0.5(1) + CLU×1.5(3) = 21 → normalized ~9
  // OVR = 9 (ELITE) — Dolf Luque. The Pride of Havana.
  // The first Latin American superstar. 27-8, 1.93 ERA.
  // 201 ERA+. 10.6 WAR. Punched Casey Stengel.
  // Mentioned in Hemingway. Three Halls of Fame.
  // Zero Cooperstown. Won a World Series at 43.
  // The most overlooked great pitcher in baseball history.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,
    stf: 4,    // 1.93 ERA, 201 ERA+. 2 HR in 322 IP. Blazing fastball + curveball. Surgical. Double the league average.
    ctl: 3,    // 88 BB / 322 IP (2.46 BB/9). 1.09 WHIP. "Cut corners inside and out." Solid, not masterful.
    stm: 4,    // 322 IP, 28 CG, 6 SHO. Won both ends of a DH. Career 3,220 IP. Won WS at 43. IRON.
    def: 2,    // .227 career BA (pitcher), .321 in 1918. Played position in Cuban leagues. Good fielder.
    clu: 2,    // 1919 WS (5 scoreless IP). 1933 WS (won clinching game at 43). But limited October over 20 years.
  },

  stat_justification: {
    stf: "Luque posted a 1.93 ERA in 1923 — leading the NL and posting a 201 ERA+ that was DOUBLE the league average. He allowed only 2 home runs in 322 innings pitched, the second-stingiest HR allowance in NL history at that time. His primary weapons were a blazing fastball and a devastating curveball. He was described as working 'batters like a surgeon, cutting corners inside and out, up and down.' No Latino pitcher posted a lower ERA until Luis Tiant in 1968 — The Year of the Pitcher — while Luque achieved his in a hitter's era. Rating of 4.",
    ctl: "Luque walked 88 batters in 322 IP (2.46 BB/9) with a 1.09 WHIP in 1923. The WHIP is excellent and the surgical approach is well-documented. However, the walk rate is solid without being exceptional — he wasn't a pure command artist like some contemporaries. Rating of 3.",
    stm: "Luque threw 322 innings in 1923 with 28 complete games (2nd NL) and 6 shutouts (led NL). He won both ends of a doubleheader on July 17 in Boston. His month-by-month consistency was remarkable: 2-0, 3-1, 5-1, 7-1, 4-2, 6-3. Career: 3,220.1 IP, 206 CG, 26 SHO over 20 seasons. He was still effective at 43, winning the clinching game of the 1933 World Series for the Giants. The man was iron — 5'7\" of indestructible Cuban pitching. Rating of 4.",
    def: "Luque was an above-average hitting pitcher: .227 career BA with 5 HR and 90 RBI. In 1918 he hit .321/.424/.464. In the Cuban winter league (1923-24), he hit .405. He also played position (infielder) on integrated Cuban teams earlier in his career. Good fielder for a pitcher. Rating of 2.",
    clu: "Luque appeared in two World Series: 1919 (Reds — threw 5 scoreless innings in relief, 1 hit, 6 K) and 1933 (Giants — won the clinching Game 5 at age 43, becoming the oldest pitcher ever to win a WS game). Both are meaningful October contributions. However, in a 20-year career, he only reached the WS twice, and his 1923 masterpiece (27-8, 1.93) came on a team that finished 2nd and missed October entirely. Rating of 2.",
  },

  personality: {
    leadership_style: "FIERCE AND EXPLOSIVE. Luque had 'an explosive temper and a caustic tongue.' He was a leader by INTIMIDATION and WILL. When the Giants bench-jockeyed him with racial slurs in 1923, he placed his glove on the mound, walked into the Giants' dugout, and punched Casey Stengel. When a heckler in Brooklyn wouldn't stop, he asked manager Wilbert Robinson for permission to 'club this loudmouth.' Robinson said he paid his way in. Then the heckler insulted Robinson. Robinson said: 'OK, Dolf — go ahead and clobber the jerk.' Luque obliged. This was not a man to be trifled with.",
    temperament: "VOLCANIC BUT CONTROLLED ON THE MOUND. The paradox of Luque: off the mound, he was explosive, combative, willing to fight anyone. On the mound, he was surgical — 'cutting corners inside and out, up and down.' The temper FUELED the precision. He never hit a batter by accident. When he hit you, he meant it. The rage was channeled into the curveball.",
    work_ethic: "YEAR-ROUND PITCHER. Luque pitched MLB from April-October, then went home to Cuba and pitched/managed in the Cuban League from November-March. He played 22 seasons in the Cuban League and 20 in MLB — simultaneously. He was ALWAYS pitching. He managed 8 Cuban League championships while maintaining his MLB career. The work ethic was transcontinental.",
    lifestyle: "HAVANA AND CINCINNATI — two homes, two cultures, two languages. Blue-eyed, fair-skinned — the complexion that allowed him past baseball's color line while darker-skinned Cuban teammates could not. He played with integrated Cuban teams (including Negro League stars like Oscar Charleston, Biz Mackey). He lived between two worlds, accepted by one and excluded by the other's fullest recognition. After baseball: returned to Havana, died there at 66.",
    era_adaptability: "HIGH. Luque's curveball and fastball combination, surgical command, and iron stamina would translate excellently. His 201 ERA+ would be elite in any era. Modern sports science would only enhance his durability. The temper might get him suspended more frequently in the modern game, but the stuff would dominate.",
    clubhouse_impact: "COMPLICATED AND POWERFUL. Luque was a mentor — he taught Sal 'The Barber' Maglie how to pitch inside, transforming Maglie's career. He managed dozens of players in Cuba and Mexico. He was a MAKER OF PITCHERS. But he was also volatile, combative, and difficult. In ILB: Luque provides +2 to all pitchers' stuff (the mentor effect) but has a 15% chance per game of getting ejected for fighting.",
    tragic_element: "THE COLOR LINE AND THE HALL. Dolf Luque was a blue-eyed, fair-skinned Cuban — white enough to play in MLB when darker-skinned Cubans like Martín Dihigo could not. He straddled the color line, playing with integrated Cuban teams in the winter and segregated American teams in the summer. He faced racial slurs despite his lighter skin — the Giants' bench called him things he couldn't ignore, and he punched Stengel for it. He won 194 games, posted a 201 ERA+, was the first Latin American star, is mentioned in Hemingway, and is enshrined in THREE halls of fame — Cuban, Mexican, Cincinnati Reds. But NOT Cooperstown. Martín Dihigo is in Cooperstown (via the Negro Leagues committee). Luque, who played the same Cuban leagues AND 20 MLB seasons, is not. The first Latin American star is forgotten in the one hall that matters most. The Pride of Havana has no plaque in Cooperstown.",
  },

  chemistry_traits: [
    { tag: "The Pride of Havana", desc: "First Latin American star in MLB. First Latino to win a WS game. First to lead in wins, ERA, shutouts. In ILB, Luque receives +1 to ALL stats when he is the first Latin player on his team. The pioneer blazes the trail." },
    { tag: "The Stengel Punch", desc: "Placed his glove on the mound, walked into the Giants' dugout, and punched Casey Stengel. In ILB, when Luque is bench-jockeyed or racially taunted: d20. On 1-3: Luque charges the opposing dugout and is ejected. On 4-20: Luque channels the rage into +2 STF for the rest of the game." },
    { tag: "Hemingway's Question", desc: "Ernest Hemingway, 'The Old Man and the Sea': 'Who is the greatest manager, really, Luque or Mike Gonzalez?' In ILB, Luque's fame extends beyond baseball. +1 to cultural recognition. The literary world knew his name." },
    { tag: "The Surgeon", desc: "'Worked batters like a surgeon, cutting corners inside and out, up and down. He never hit a batter by accident.' In ILB, Luque has +1 CTL AND the ability to intentionally hit batters without it being called. The surgeon cuts where he chooses." },
    { tag: "Two Hemispheres", desc: "20 MLB seasons + 22 Cuban League seasons + Mexican League managing. In ILB, Luque never needs rest — he plays year-round. No fatigue penalty in winter leagues, exhibitions, or barnstorming." },
    { tag: "The Mentor", desc: "Taught Sal Maglie how to pitch inside. Managed 8 Cuban League championships. Prepared Roberto Ávila and Camilo Pascual. In ILB, Luque provides +1 STF to every pitcher on his team. The maker of pitchers." },
    { tag: "Three Halls, Zero Cooperstown", desc: "Cuban HOF. Mexican HOF. Reds HOF. NOT Cooperstown. In ILB, Luque's HOF status is PERMANENTLY CONTESTED. His legitimacy is real (194 W, 201 ERA+, 3 halls) but the one hall that matters most has closed its door." },
    { tag: "Game 5 at Forty-Three", desc: "Won the clinching game of the 1933 World Series at age 43 — oldest pitcher ever to win a WS game. In ILB, Luque receives +2 to all stats after age 40. The pride doesn't fade." },
  ],

  preferred_locations: [
    { location: "Redland Field, Cincinnati", affinity: "MAXIMUM / HOME", note: "1918-1929. Twelve seasons. 27-8 in 1923. The place where the Pride of Havana became the ace of the National League." },
    { location: "Havana, Cuba", affinity: "SOUL / IDENTITY", note: "Born and died in Havana. 22 Cuban League seasons. 8 championships as manager. Almendares. The island that made him." },
    { location: "The Pitcher's Mound", affinity: "SOVEREIGNTY", note: "The glove placed down before charging the dugout. The curveball that cut corners. The mound was his territory, and he would leave it when HE chose." },
    { location: "The Polo Grounds, New York", affinity: "LATE CAREER", note: "Giants 1932-1935. Won 1933 WS at 43. Coached through 1945. The city where the fireplug finished." },
  ],

  momentum: {
    hot_triggers: [
      "Month-by-month consistency — 1923: 2-0, 3-1, 5-1, 7-1, 4-2, 6-3. Luque was ALWAYS hot. The consistency was the weapon.",
      "Anger — when racial slurs or bench-jockeying fueled the fire, Luque channeled the rage into dominant pitching. The Stengel Punch was the exception; usually the rage became a curveball.",
      "Year-round pitching — Luque was in mid-season form EVERY season because he pitched year-round in Cuba. No rust. No adjustment. The arm was always warm.",
      "Big stage — 5 scoreless WS innings (1919), WS-clinching win at 43 (1933). The pride rose to the occasion.",
    ],
    cold_triggers: [
      "Post-peak seasons — after the 1923 masterpiece, Luque fell to 10-15 in 1924. The peak was so high that the valleys felt deeper.",
      "Racial incidents — when the bench-jockeying became too much, Luque's rage could derail his focus. The punch was cathartic but cost him the game.",
      "Late-career decline — from 1928-1929, the stuff diminished before the late-career renaissance with the Giants.",
      "Non-contending teams — Luque's 27-8 came on a team that finished 2nd. His best pitching often occurred without October as a reward.",
    ],
    pressure_response: "THE CURVEBALL UNDER FIRE. Luque's pressure response was CHANNELED RAGE. He didn't get calm under pressure — he got SHARPER. The anger made the curveball tighter, the fastball harder, the corners smaller. At 43, in the clinching game of the 1933 World Series, he threw 4.1 scoreless innings of relief to win it. The pride didn't diminish with age. The fire didn't cool.",
  },

  action_card_seeds: [
    {
      title: "The Mound, The Glove, The Punch",
      type: "Rage / Defiance",
      text: "Summer 1923. Your pitcher is on the mound at Redland Field. He is 5'7\" and weighs 160 pounds. He is Cuban. He is the best pitcher in the National League. The Giants' bench is screaming things at him — things about his skin, his country, his language. Things he cannot ignore. Your pitcher places his glove on the mound. He places the ball on the glove. He walks off the mound, across the diamond, and into the Giants' dugout. He finds the man he thinks is responsible and punches him. The man is Casey Stengel. Your pitcher returns to the mound, picks up his glove and ball, and finishes the game. He finishes the season 27-8 with a 1.93 ERA. The best season by any pitcher in the National League. The rage was the fuel. The curveball was the weapon.",
      origin: "Luque's infamous charging of the Giants dugout and punching of Casey Stengel during the 1923 season.",
    },
    {
      title: "The Pride of Havana",
      type: "Pioneer / Legacy",
      text: "Your pitcher is the first. The first Latin American pitcher in Major League Baseball. The first Latino to win a World Series game. The first to lead the league in wins, in ERA, in shutouts. The first to win 100 career victories. He is from Havana, Cuba. He has blue eyes and fair skin — the complexion that allows him through baseball's color line while his darker-skinned countrymen cannot follow. He plays with them in the Cuban winter league, where the line does not exist. He plays without them in the American summer, where the line is law. He is the bridge between two worlds, accepted fully by neither. Ernest Hemingway writes him into 'The Old Man and the Sea.' Three countries enshrine him in their halls of fame. The one hall that matters most does not. The Pride of Havana has no plaque in Cooperstown.",
      origin: "Luque as baseball's first Latin American star. Three HOFs but not Cooperstown. Hemingway reference.",
    },
    {
      title: "Game Five at Forty-Three",
      type: "Achievement / Endurance",
      text: "1933. Your pitcher is forty-three years old. He has been pitching professionally for twenty-one years — in America, in Cuba, in Mexico. His arm should be gone. It is not. The World Series. Game Five. The Giants lead the Senators three games to one. Your pitcher enters in relief. He throws four and a third scoreless innings. The Giants win. Your pitcher becomes the oldest pitcher ever to win a World Series game. He is forty-three. He was the first Latin American to win a WS game in 1919, and now, fourteen years later, he is the oldest man ever to do it again. The pride doesn't age. The curveball doesn't age. Only the calendar ages.",
      origin: "Luque winning the clinching Game 5 of the 1933 WS at age 43 — oldest pitcher ever to win a WS game.",
    },
    {
      title: "The Old Man's Question",
      type: "Literature / Fame",
      text: "Ernest Hemingway, 1952. 'The Old Man and the Sea.' The old fisherman Santiago sits in his boat and thinks about baseball. He thinks about the great DiMaggio. He thinks about the Cincinnati Reds. And he asks: 'Who is the greatest manager, really, Luque or Mike Gonzalez?' Your pitcher is in Hemingway. Not as a footnote. Not as an allusion. As a NAME — spoken by the old man, on the sea, in the greatest novella of the century. Your pitcher's name lives in literature. Your pitcher's plaque does not live in Cooperstown. The sea remembers what the Hall forgets.",
      origin: "Hemingway's mention of Luque in 'The Old Man and the Sea' (1952).",
    },
  ],

  art_direction: {
    face: "5'7\" 160 lbs — SMALL but FIERCE. A FIREPLUG — compact, dense, all muscle. Cuban face: blue eyes (distinctive), fair skin, sharp features. The face of a man who will punch you if you say the wrong thing. INTENSE. Not calm. Not serene. BURNING. The eyes are blue fire. The jaw is set. The expression says: I am the best pitcher in the National League and I DARE you to say otherwise.",
    attire: "Cincinnati Reds 1923 whites. RIGHT-HANDED pitching delivery — compact, explosive, the motion of a 5'7\" man generating power from a small frame. The curveball release point. The arm angle. Everything is COMPRESSED POWER — a small package delivering maximum force. Or: mid-stride toward the Giants' dugout, glove and ball left on the mound behind him, fists balled. The body should look DANGEROUS — not large, but EXPLOSIVE.",
    mood: "VOLCANIC PRIDE. This card BURNS. Not the joyful lightning of Vance or the warm sunshine of Bottomley — this is CONTROLLED FIRE. The rage of a man who faced racial slurs and answered with a 1.93 ERA. The dignity of a man whose name is in Hemingway but not in Cooperstown. The card should feel HOT — the temperature of righteous anger channeled into curveballs.",
    style: "Full color — Bashers era — CUBAN BLUE AND REDS RED AND HAVANA GOLD. A palette that bridges two countries: Cincinnati red, Cuban blue (for his blue eyes), Havana gold (tropical warmth). The border should be CUBAN BLUE — the color of Luque's distinctive eyes, the color of Caribbean water, the color that marked him as different from every other pitcher in the National League. THE PRIDE OF HAVANA — the card that burns hotter than any other. The most INTENSE card in the Bashers. Not the darkest (that's Mays), not the coldest (that's Hornsby), but the most FIERCE. The 5'7\" fireplug who punched Stengel, won 27 games, and is in Hemingway.",
    reference: "Ruth is the solar system. Hornsby is the blade. Vance is the dazzler. Dolf Luque is THE PRIDE OF HAVANA — the card that crosses oceans. The first card from outside the United States. The first card that speaks Spanish. The card that carries two flags and three halls of fame and the weight of every Latin American player who came after. Luque is the BRIDGE — from Cuba to Cincinnati, from Negro Leagues to MLB, from the 1919 WS to the 1933 WS, from Havana to Hemingway. The bridge is 5'7\" and it holds the weight of history.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", redsRed: "#c6011f", cubanBlue: "#2a5c8c", havanaGold: "#d4a230" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.cubanBlue}12`, border: `1px solid ${C.cubanBlue}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.cubanBlue}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DolfLuqueCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = LUQUE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.cubanBlue}15 0%, ${C.redsRed}08 50%, ${C.havanaGold}10 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE CARD — Bashers Era — The Pride of Havana</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.cubanBlue}`, boxShadow: `0 0 0 2px ${C.redsRed}15, 0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.cubanBlue}, ${C.redsRed}, ${C.havanaGold})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.cubanBlue}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.cubanBlue}06, ${C.redsRed}03)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🇨🇺</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE PRIDE OF HAVANA</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.cubanBlue, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.redsRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.cubanBlue}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE • 1923 NL TRIPLE CROWN PITCHING • 1ST LATIN STAR</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Havana, Cuba • 5'7" • Blue eyes • Punched Stengel • In Hemingway</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.cubanBlue} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.redsRed} />
              <StatBar label="STM" value={s.stm} max={5} color={C.havanaGold} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.cubanBlue}, ${C.redsRed}, ${C.havanaGold})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: "27-8" },{ label: "ERA", val: "1.93" },{ label: "ERA+", val: "201" },{ label: "WAR", val: "10.6" },{ label: "IP", val: "322" },{ label: "CG", val: "28" },{ label: "SHO", val: "6" },{ label: "K", val: "151" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.cubanBlue}08`, border: `1px solid ${C.cubanBlue}20`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.redsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>201 ERA+ — DOUBLE THE LEAGUE AVERAGE</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>2 HOME RUNS ALLOWED IN 322 INNINGS</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>No Latino pitcher posted a lower ERA until Luis Tiant in 1968.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.cubanBlue}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.cubanBlue}12` }}>
              {[{ label: "CAR W-L", val: "194-179" },{ label: "CAR ERA", val: "3.24" },{ label: "CAR IP", val: "3,220" },{ label: "SEASONS", val: "20" },{ label: "WS RINGS", val: "2" },{ label: "CUB TITLES", val: "8" },{ label: "HOFS", val: "3" },{ label: "AGE 43 WS", val: "✓" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🇨🇺 1st Latin Star", "🥊 Punched Stengel", "📖 In Hemingway", "🏆 WS Win at Age 43", "⚾ 201 ERA+", "🏛️ 3 Halls, 0 Cooperstown", "🔥 5'7\" Fireplug"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.cubanBlue}08`, border: `1px solid ${C.cubanBlue}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year} — THE PRIDE OF HAVANA</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.cubanBlue}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.cubanBlue : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.cubanBlue : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "🇨🇺 THE COLOR LINE AND THE HALL" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.cubanBlue } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.cubanBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.cubanBlue}15`, color: C.cubanBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.cubanBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.cubanBlue}05`, border: `1px solid ${C.cubanBlue}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Rage") ? `${C.redsRed}15` : `${C.cubanBlue}10`, color: a.type.includes("Rage") ? C.redsRed : C.cubanBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.cubanBlue}, ${C.redsRed}, ${C.havanaGold})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
