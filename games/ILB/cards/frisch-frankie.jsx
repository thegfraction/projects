// /cards/players/frankie-frisch.jsx
import { useState } from "react";

const FRISCH_DATA = {
  name: "Frankie Frisch",
  nickname: "The Fordham Flash",
  year: 1923,
  team: "New York Giants",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "2B",
  bats: "S",
  throws: "R",
  height: '5\'11"',
  weight: "165 lbs",
  born: "September 9, 1897 — The Bronx, New York City",
  died: "March 12, 1973 — Wilmington, Delaware (age 75). Automobile accident. Buried Woodlawn Cemetery, Bronx. Avid gardener. Listened to classical music. Two hounds named Flash and Patches.",
  hof: "INDUCTED 1947 — BBWAA (136 of 162 votes). A LEGITIMATE first-ballot HOFer who then became the most CONTROVERSIAL Veterans Committee chairman in HOF history. Shepherded elections of Kelly, Bottomley, Haines, Bancroft, Hafey, Youngs, Lindstrom — all teammates. Led to Veterans Committee powers being permanently reduced. The kingmaker whose legitimacy made his choices' illegitimacy more damaging.",

  real_stats: {
    season: 1923,
    batting_avg: ".348",
    obp: ".391",
    slg: ".485",
    ops: ".876",
    hits: 223,
    doubles: 32,
    triples: 10,
    home_runs: 12,
    rbi: 111,
    runs: 116,
    stolen_bases: 29,
    total_bases: 311,
    games: 151,
    war: 7.3,
    note: "Led NL in hits (223), total bases (311), singles (169). Career-high BA (.348) and HR (12). Highest bWAR among NL position players.",
    career_batting_avg: ".316",
    career_hits: 2880,
    career_hr: 105,
    career_rbi: 1244,
    career_runs: 1532,
    career_sb: 419,
    career_2b: 466,
    career_3b: 138,
    career_war: 55.0,
    career_seasons: 19,
    ws_appearances: 8,
    ws_championships: 4,
    ws_hits: 58,
    ws_doubles: 10,
    k_rate: "272 K in 9,112 AB — once every 33.5 AB",
    switch_hitter_record: ".316 career BA — highest ever for a switch-hitter",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1923 SEASON
  //
  // CON: .348 BA (career high), 223 H (led NL), .391 OBP.
  //      Career .316 — highest ever for switch-hitter.
  //      272 K in 9,112 AB — nearly impossible to strike out.
  //      .300+ in 13 seasons. Switch-hitter who hit .300+
  //      from BOTH sides.
  //      CON = 4 (NEAR-MAXIMUM — .348 BA leading NL in hits.
  //      Career .316 as a switch-hitter is historically elite.
  //      The K rate is absurd. Not quite Hornsby/Sisler tier
  //      (.400+ seasons) but just below. Elite contact.)
  //
  // POW: 12 HR (career high), .485 SLG, 311 TB (led NL).
  //      Career 105 HR. 466 2B, 138 3B.
  //      Not a power hitter — gap power, line drives, doubles.
  //      The value was on-base and speed, not over-the-fence.
  //      POW = 2 (SOLID — 12 HR career high at 2B is decent
  //      for the era. 311 TB led NL. The doubles/triples
  //      production adds up. But not a feared slugger.)
  //
  // SPD: 29 SB in 1923. Career 419 SB. Led NL 3× (49 in
  //      1921, 48 in 1927, 28 in 1931). "The Fordham Flash."
  //      Four-sport college star. Track team. All-American
  //      halfback. Casey Stengel: "He'd put his head down and
  //      commence running like in a race."
  //      SPD = 4 (NEAR-MAXIMUM — 419 career SB. Three SB
  //      titles. Named "Flash" for his speed. Olympic-level
  //      athlete. Not quite Cuyler's 5 (Cuyler was the purest
  //      speed in the set) but just below.)
  //
  // DEF: "Whirling dervish" — knocked down smashes with chest,
  //      dove for everything, ranged into CF and RF. Damon
  //      Runyon: "played second base, some of center field and
  //      a slice of right field." Led NL 2B in fielding pct
  //      4×. 641 assists in 1927 (record). 1,059 chances in
  //      1927 (record). Also played 3B, SS, OF.
  //      The 1921 WS final play — received Kelly's throw while
  //      flat on his back, held the ball high.
  //      DEF = 3 (MAXIMUM — one of the greatest defensive 2B
  //      ever. The range, the instinct, the willingness to
  //      take the ball off the chest. Records in assists and
  //      chances. The Runyon quote says it all.)
  //
  // CLU: 8 World Series. 4 championships (1921, 1922, 1931, 1934).
  //      58 WS hits (record for non-Yankee). 10 WS doubles
  //      (tied Berra for record). .471 WS BA in 1922.
  //      Joe McCarthy: "If I needed one player to do the job
  //      of winning the game I needed to win, that player
  //      would be Frank Frisch."
  //      McGraw named him captain.
  //      CLU = 3 (MAXIMUM — 4 rings. 8 WS. 58 WS hits.
  //      McCarthy's testimony. The ultimate October player.
  //      Only Ruth has more WS credentials in this set.)
  //
  // OVR: CON×2(8) + POW×1(2) + SPD×1.5(6) + DEF×0.5(1.5) + CLU×1.5(4.5) = 22 → normalized ~10
  // OVR = 10 (ELITE) — Frankie Frisch. The Fordham Flash.
  // The five-tool 2B from 1923. The man traded for Hornsby.
  // The man who won 4 rings. The man who then became the
  // kingmaker — reshaping the Hall of Fame from the inside,
  // elevating teammates, reducing the Veterans Committee's
  // power forever. OVR 10 matches Sisler. The Flash and
  // the Sun — both ELITE, both defining different cities,
  // both traded in blockbuster deals. The difference: Frisch
  // has the rings. And the controversy.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,
    con: 4,    // .348 BA (career high), 223 H led NL. Career .316 — highest switch-hitter ever. 272 K in 9,112 AB. .300+ in 13 seasons. Nearly unstrikeoutable.
    pow: 2,    // 12 HR career high, .485 SLG. Career 105 HR. Gap power — doubles (466) and triples (138) not HR. Not a feared slugger.
    spd: 4,    // 419 career SB. Led NL 3×. "The Fordham Flash." 4-sport college star. All-American halfback. Track team. Nearly elite speed.
    def: 3,    // MAXIMUM. "Whirling dervish." Runyon: "played 2B, some of CF, and a slice of RF." Led NL 2B fielding 4×. 641 assists (record). Took ball off chest. Dove for everything.
    clu: 3,    // MAXIMUM. 8 WS. 4 rings. 58 WS hits (non-Yankee record). .471 in 1922 WS. McCarthy: "the player I'd want." McGraw's captain.
  },

  stat_justification: {
    con: "Frisch hit .348 in 1923, a career high, and led the NL with 223 hits. Career: .316 BA — the highest batting average ever for a switch-hitter, a record that still stands. He hit .300+ in 13 of 19 seasons. He struck out only 272 times in 9,112 at-bats — once every 33.5 AB — making him one of the hardest batters to strike out in history. He hit .300+ from BOTH sides of the plate for his career. The contact was elite and sustained across two decades. Rating of 4.",
    pow: "Frisch hit 12 home runs in 1923, his career high, with a .485 SLG and 311 TB (both led NL). Career: 105 HR, 466 doubles, 138 triples. He was a gap hitter who drove the ball to all fields, not a power hitter. His extra-base production came from doubles and triples, not home runs. The value was in putting the ball in play and running, not in fence-clearing power. Rating of 2.",
    spd: "Frisch stole 29 bases in 1923. Career: 419 SB, leading the NL three times (49 in 1921, 48 in 1927, 28 in 1931). He earned the nickname 'The Fordham Flash' from his speed. He was a four-sport college star at Fordham — baseball, football (Walter Camp All-American halfback), basketball, and track. Casey Stengel praised his ability to outrun grounders. His 138 career triples further confirm the speed. This is a near-maximum speed rating — only Cuyler (pure sprint speed, SPD 5) exceeds him in this set. Rating of 4.",
    def: "Frisch was one of the greatest defensive second basemen in baseball history. Damon Runyon wrote that 'his range was such that he played second base, some of center field and a slice of right field, too.' He was described as a 'whirling dervish' who knocked down hot smashes with his chest and dove for balls that seemed out of reach. He led NL second basemen in fielding percentage 4 times. He set the record for most assists by a second baseman in a season (641 in 1927) and most total chances (1,059 in 1927). He also played 3B, SS, and OF capably. The 1921 WS final play — receiving Kelly's throw while being bowled over, lying flat on his back, holding the ball high for the umpire — is the signature defensive moment. Rating of 3 (maximum).",
    clu: "Frisch appeared in 8 World Series and won 4 championships (1921, 1922 with Giants; 1931, 1934 with Cardinals). He recorded 58 World Series hits — the most by any player who never played for the Yankees. He hit .471 in the 1922 World Series. He hit 10 WS doubles (tied with Yogi Berra for the all-time record). Joe McCarthy — one of the greatest managers ever — said: 'If I needed one player to do the job of winning the game I needed to win, that player would be Frank Frisch.' McGraw named him captain of the Giants. This is the maximum clutch rating. Rating of 3.",
  },

  personality: {
    leadership_style: "FIERY CAPTAIN. Frisch was named team captain by John McGraw — the highest honor McGraw bestowed. He led through intensity, competitiveness, and example. 'No-holds-barred approach.' He was the driving force of the Gashouse Gang — the Cardinals teams of the early 1930s that reflected his personality: tough, aggressive, relentless. The Sporting News: 'Even his own players shudder at his tirades.' The leadership was COMBUSTION — Frisch set everything around him on fire.",
    temperament: "VOLCANIC AND INTELLECTUAL. Frisch was simultaneously a fiery competitor who would take grounders off his chest and an educated man who majored in chemistry, listened to classical music, and cultivated gardens. The temperament combined the Bronx (hard, loud, confrontational) with Fordham (intellectual, disciplined, purposeful). He LEFT the Giants after McGraw berated him publicly — a dramatic act of self-respect that defined his character. He would not be diminished. Not by McGraw. Not by anyone.",
    work_ethic: "FOUR-SPORT INTENSITY. Frisch didn't just play baseball — he excelled at baseball, football, basketball, AND track at the college level. Walter Camp named him an All-American halfback. This is the work ethic of a man who cannot stop competing. Every surface is a field. Every game is the game. He brought football's violence to second base, track's speed to the basepaths, and basketball's instincts to defensive positioning.",
    lifestyle: "BRONX RENAISSANCE MAN. Born in the Bronx to a wealthy lace manufacturer. Fordham University — chemistry major. Married Ada Lucy (1923-1971). No children. Two hounds: Flash and Patches. Avid gardener. Classical music listener. Radio announcer. House full of books. 'Deeply religious.' Lived in New Rochelle. Moved to Westerly, Rhode Island. Died in automobile accident, 1973. This is the most CULTURED card in the Bashers — the man who knew flowers and music and chemistry and still took grounders off his chest.",
    era_adaptability: "HIGH. Frisch's skillset — switch-hitting, elite contact, speed, defensive range, low strikeouts — is timeless. In modern baseball, he'd be a .300-hitting switch-hitting 2B who steals 30 bases and plays Gold Glove defense. Think a faster, better-hitting version of José Altuve or a switch-hitting version of Marcus Semien. His lack of power would limit his modern value slightly, but the contact + speed + defense combination is universally valued.",
    clubhouse_impact: "MAXIMUM POSITIVE AND MAXIMUM FRICTION. Frisch elevated every team he joined — the Giants won 4 straight pennants with him; the Cardinals won nothing before him and won 2 WS with him. But he was also volatile, argumentative, and demanding. His tirades terrified his own players. His confrontation with McGraw broke the relationship. In ILB, Frisch provides +2 to team winning percentage and -1 to team chemistry. The Flash burns bright. The Flash also burns.",
    tragic_element: "THE KINGMAKER'S SHADOW. Frankie Frisch's career is beyond reproach — .316, 2,880 hits, 4 rings, 8 WS, legitimate first-ballot HOFer. But his LEGACY is shadowed by the Veterans Committee. As chairman, he elected teammates — Kelly, Bottomley, Haines, Bancroft, Hafey, Youngs, Lindstrom — whose credentials were debatable. Bill James used these selections to indict the entire Veterans Committee process. Frisch's actions as kingmaker reduced the body's powers permanently. The man who legitimately earned Cooperstown then delegitimized the process of getting there. The Flash lit the way for others. Some of them shouldn't have followed.",
  },

  chemistry_traits: [
    { tag: "The Fordham Flash", desc: "Four-sport star. All-American halfback. Chemistry major. In ILB, Frisch has +1 to ALL five stat categories in his first full season on any team. The Flash arrives and everything brightens. But the bonus fades — year 2 onward is natural talent only." },
    { tag: "The Kingmaker", desc: "Veterans Committee chairman who elected teammates to HOF. In ILB, Frisch can NOMINATE one teammate per era for 'elevated status' — that player receives +1 OVR while on Frisch's team. But the elevation is CONTESTED — opponents may challenge it. The kingmaker's power is real. The legitimacy is debatable." },
    { tag: "Traded for Hornsby", desc: "The biggest trade of the 1920s: Frisch + Ring to STL for Hornsby. In ILB, when Frisch and Hornsby are in the same set, they CANNOT be on the same team. The trade was permanent. The blade and the flash occupy different constellations." },
    { tag: "McGraw's Captain", desc: "McGraw named Frisch captain — then broke the relationship with public humiliation. In ILB, Frisch has +2 to leadership when the manager trusts him, but if publicly criticized, he LEAVES (d20: on 1-3, Frisch departs for 2 weeks). The captain who will not be diminished." },
    { tag: "The Whirling Dervish", desc: "Took grounders off the chest. Dove for everything. Range into CF and RF. In ILB, Frisch has +1 to defensive range for ALL infield and adjacent outfield positions. The dervish spins outward from second base." },
    { tag: "Unstrikeoutable", desc: "272 K in 9,112 AB — once every 33.5 AB. In ILB, Frisch has a MINIMUM contact guarantee: he cannot strike out more than twice in any series. The ball finds the bat. Always." },
    { tag: "The Gashouse Gang", desc: "Player-manager of the 1934 Cardinals. Drove the no-holds-barred approach. In ILB, when Frisch is player-manager, the entire team receives +1 to aggressive baserunning but -1 to discipline. The gang follows the Flash." },
    { tag: "The Gardener", desc: "Avid gardener. Classical music. House of books. 'Deeply religious.' In ILB, Frisch has +1 to post-career contentment and +1 to off-season recovery. The Flash slows down in the garden. The garden grows regardless." },
  ],

  preferred_locations: [
    { location: "Polo Grounds, New York", affinity: "MAXIMUM / HOME", note: "1919-1926. McGraw's domain. 4 straight pennants, 2 championships. The place where the Flash ignited." },
    { location: "Sportsman's Park, St. Louis", affinity: "MAXIMUM / SECOND HOME", note: "1927-1937. The Gashouse Gang. 3 pennants, 2 championships. Won over hostile fans with .337 and 48 SB in year one." },
    { location: "Second Base", affinity: "IDENTITY", note: "641 assists (record). 1,059 chances (record). 'Played 2B, some of CF, a slice of RF.' The position expanded to meet the man." },
    { location: "The World Series", affinity: "PEAK", note: "8 appearances. 4 rings. 58 hits. 10 doubles. .471 in 1922. The October player." },
    { location: "Cooperstown", affinity: "COMPLICATED", note: "Legitimately elected 1947. Then sat on the Veterans Committee and reshaped the Hall forever. Both honored and haunted by the same building." },
  ],

  momentum: {
    hot_triggers: [
      "October — 8 WS appearances, 4 rings. Frisch elevated in postseason play consistently across two decades and two teams.",
      "New team arrival — Frisch made immediate impact with both the Giants (1920) and Cardinals (1927). The Flash ignites on arrival.",
      "Switch-hitting advantage — Frisch's ability to hit from both sides meant he had no platoon vulnerability. Every pitcher faced his strong side.",
      "Defensive fire — when Frisch was locked in defensively, the entire infield played above its level. The dervish effect radiates outward.",
    ],
    cold_triggers: [
      "McGraw conflict — the 1926 rupture with McGraw was precipitated by poor play (missed sign). When Frisch's errors had consequences, the spiral was emotional as well as statistical.",
      "Power drought — with only 12 HR at peak, cold streaks produced very limited production. No power to compensate for lost contact.",
      "Late career — Frisch's production declined significantly after 1931 (age 34). The Flash dimmed, though the competitiveness never did.",
      "Manager mode — as player-manager (1933+), the dual responsibilities sometimes split his focus. Better as captain than as king.",
    ],
    pressure_response: "MAXIMUM. This is the defining Basher for postseason performance after Ruth. 8 World Series. 4 championships. 58 WS hits. .471 in 1922. Joe McCarthy's testimony. McGraw's captainship. The pressure response is so strong it constitutes a separate argument for the Hall of Fame beyond the statistics.",
  },

  action_card_seeds: [
    {
      title: "The Fordham Flash",
      type: "Identity / Origin",
      text: "Your second baseman comes from Fordham University. He majored in chemistry. He captained the baseball, basketball, and football teams. Walter Camp named him an All-American halfback. He ran track. He never played a minor league game. He went from the Bronx to the Polo Grounds to the World Series. He is a switch-hitter who bats .348. He steals 29 bases. He leads the National League in hits. He knocks down grounders with his chest. He dives for balls that are past him. He holds the ball high while lying flat on his back. He listens to classical music. He gardens. He is the Flash — lit at Fordham, burning at the Polo Grounds, never extinguished.",
      origin: "Frisch's four-sport Fordham career, immediate MLB impact, 1923 peak season.",
    },
    {
      title: "The Trade",
      type: "Moment / Earthquake",
      text: "December 20, 1926. Your second baseman — team captain, .316 career hitter, two-time World Series champion — is traded. For Rogers Hornsby. The greatest right-handed hitter alive. The man who hit .424. The trade is the biggest in baseball. St. Louis fans are furious — they've lost Hornsby, who just led them to a championship. Your second baseman arrives in St. Louis with a city against him. He hits .337. He steals 48 bases. He strikes out 10 times in 617 at-bats. He sets the record for most assists by a second baseman. He wins them over. The Flash replaces the Blade. The city learns that fire comes in different shapes.",
      origin: "The Frisch-for-Hornsby trade (Dec 1926). Frisch's dominant 1927 debut in STL.",
    },
    {
      title: "The Kingmaker",
      type: "Legacy / Controversy",
      text: "Your second baseman retires. He enters the Hall of Fame — legitimately, on the first ballot, 136 of 162 votes. Then he sits on the Veterans Committee. Then he becomes its chairman. Then, one by one, his former teammates join him in Cooperstown. George Kelly — 1.9% of the BBWAA vote. Jim Bottomley. Jesse Haines. Dave Bancroft. Chick Hafey. Ross Youngs. Freddie Lindstrom. Critics call it cronyism. Bill James calls Kelly 'the worst player in the Hall of Fame.' The Veterans Committee's powers are permanently reduced. Your second baseman's plaque is deserved. Some of the plaques that followed are not. The kingmaker's crown fits. The kingdom he built does not.",
      origin: "Frisch's Veterans Committee chairmanship and the controversial HOF elections of teammates.",
    },
    {
      title: "Flat on His Back",
      type: "Achievement / Signature",
      text: "1921 World Series. Game Eight. Final play. Aaron Ward is running from first. Home Run Baker grounds to Rawlings, who dives, throws to Kelly at first. Kelly catches, turns, fires across the diamond to your second baseman at second. Ward crashes into your second baseman. Your second baseman goes DOWN — flat on his back, 165 pounds driven into the dirt by a running man. But the ball is in his glove. He holds it HIGH — above his chest, above his face, above the dirt and the spikes and the weight of a grown man — so the umpire can see it. The umpire calls the out. The World Series is over. Your second baseman is still on his back. Still holding the ball. The Flash, grounded, still shining.",
      origin: "The 1921 WS Game 8 final play — Rawlings to Kelly to Frisch. Frisch flat on his back, ball held high.",
    },
  ],

  art_direction: {
    face: "5'11\" 165 lbs — compact, wiry, INTENSE. Not big — FAST. The face of a man from the Bronx who went to Fordham and played four sports and then went to the World Series eight times. Sharp features, intelligent eyes that are CALCULATING and FIERCE simultaneously. This is the face of a chemistry major who takes grounders off his chest. The expression is COMPETITIVE — not cold like Hornsby, not warm like Bottomley, but HOT. Burning. The Flash.",
    attire: "New York Giants 1923 home whites — interlocking 'NY.' Switch-hitting — show the batting stance from the LEFT side (his natural side). Compact swing, whip-like. Or: in the field at second base, DIVING — body horizontal, fully extended, glove reaching for a ball that should be past him. Damon Runyon's description made visual: the range that covered second base, center field, and a slice of right field. The body should look ATHLETIC — a halfback's build, a sprinter's legs, a second baseman's hands.",
    mood: "ELECTRIC AND URGENT. This card crackles. The Fordham Flash — the nickname demands the visual. Energy, velocity, sparks. Not the calm of the blueprint or the warmth of the sunshine — the ELECTRICITY of a man who cannot stop moving, cannot stop competing, cannot stop making the play. The mood is COMBUSTION — controlled burning, directed energy, the force that turns a team into a dynasty.",
    style: "Full color — Bashers era — GIANTS ORANGE AND ELECTRIC BLUE. Orange for the Giants, electric blue for the Flash (electricity, Fordham blue, the spark). White-hot highlights. This is the BRIGHTEST card after Ruth's solar system. The border should be ELECTRIC BLUE — the color of a spark, a flash, a moment of ignition. THE FORDHAM FLASH — the card that crackles in your hand. The most kinetic object in the Bashers. Everything about this card MOVES.",
    reference: "Ruth is the solar system. Hornsby is the blade. Sisler is the sun. Frankie Frisch is THE FLASH — the electric current that connects everything. He links the Giants to the Cardinals, Kelly to Bottomley, McGraw to the Gashouse Gang, Cooperstown to cronyism, chemistry to chest protectors, gardening to tirades. He is the connective tissue of the Bashers — the card that touches more other cards than any other. The most CONNECTED node in the constellation.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", giantsOrange: "#c45e28", electricBlue: "#1e6bb8", flashWhite: "#f0f5ff" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.electricBlue}10`, border: `1px solid ${C.electricBlue}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.electricBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.electricBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.electricBlue}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function FrankieFrischCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = FRISCH_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.electricBlue}30 0%, ${C.giantsOrange}15 50%, ${C.electricBlue}30 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE CARD — Bashers Era — The Fordham Flash</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.electricBlue}`, boxShadow: `0 0 0 2px ${C.giantsOrange}30, 0 0 25px ${C.electricBlue}15, 0 10px 35px rgba(0,0,0,0.35), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.giantsOrange}, ${C.electricBlue}, ${C.giantsOrange})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.electricBlue}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.flashWhite}, ${C.electricBlue}08, ${C.giantsOrange}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⚡</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE FORDHAM FLASH</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${C.electricBlue}, ${C.giantsOrange})`, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.giantsOrange}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position} • S</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.electricBlue}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ELITE • 4× WS CHAMPION • HOF 1947 • THE KINGMAKER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Switch-Hitter • Fordham University • Chemistry Major • All-American Halfback</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.giantsOrange} />
              <StatBar label="POW" value={s.pow} max={5} color={C.medBrown} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.electricBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.electricBlue}, ${C.giantsOrange})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".348" },{ label: "OPS", val: ".876" },{ label: "H", val: "223" },{ label: "SB", val: "29" },{ label: "HR", val: "12" },{ label: "RBI", val: "111" },{ label: "R", val: "116" },{ label: "WAR", val: "7.3" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, fontWeight: 700 }}>LED NL: 223 HITS • 311 TB • 169 SINGLES • HIGHEST bWAR AMONG NL POSITION PLAYERS</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1, background: `${C.electricBlue}08`, border: `1px solid ${C.electricBlue}20`, borderRadius: 4, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>.316 BA • 2,880 H</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>419 SB • 55.0 WAR</div>
                <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 2 }}>Highest BA ever (switch-hitter)</div>
              </div>
              <div style={{ flex: 1, background: `${C.gold}08`, border: `1px solid ${C.gold}20`, borderRadius: 4, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>OCTOBER</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>8 WS • 4 Rings</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>58 WS Hits • 10 WS 2B</div>
                <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 2 }}>.471 BA in 1922 WS</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.electricBlue}06`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.electricBlue}12` }}>
              {[{ label: "K RATE", val: "1:33.5" },{ label: "SB TITLES", val: "3" },{ label: "SPORTS", val: "4" },{ label: "HOF", val: "1947" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚡ Fordham Flash", "🏆 4× WS Champion", "🔄 Switch-Hitter (.316)", "🏈 All-American Halfback", "👑 The Kingmaker", "🌹 Avid Gardener", "🎵 Classical Music", "⚖️ Veterans Committee"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.electricBlue}08`, border: `1px solid ${C.electricBlue}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.electricBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year} — THE FORDHAM FLASH</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.electricBlue}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.electricBlue : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.electricBlue : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚡ THE KINGMAKER'S SHADOW" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.electricBlue } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.electricBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : l.affinity.includes("COMPLICATED") ? `${C.warmRed}15` : `${C.electricBlue}15`, color: l.affinity.includes("HOME") ? C.traitGreen : l.affinity.includes("COMPLICATED") ? C.warmRed : C.electricBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.electricBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.electricBlue}05`, border: `1px solid ${C.electricBlue}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Controversy") ? `${C.warmRed}15` : `${C.electricBlue}12`, color: a.type.includes("Controversy") ? C.warmRed : C.electricBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.giantsOrange}, ${C.electricBlue}, ${C.giantsOrange})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
