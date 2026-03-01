import { useState } from "react";

const MARTIN_DATA = {
  name: "Pepper Martin",
  nickname: "The Wild Horse of the Osage",
  year: 1933,
  team: "St. Louis Cardinals",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "3B/CF",
  bats: "R",
  throws: "R",
  height: "5'8\"",
  weight: "170 lbs",
  born: "February 29, 1904 — Temple, Oklahoma (leap day baby; cotton farmer's son; youngest of 7 children; 'in lean times the family ate cornmeal mush and fried mush, too')",
  died: "March 5, 1965 — McAlester, Oklahoma (age 61, heart attack)",
  hof: "Not inducted. .298 career BA. 1,227 hits. 59 HR. 501 RBI. 146 SB. 3× NL SB leader (1933-34, 1936). 3× WS champion (1931, 1934, 1944). .418 career WS BA (highest among 50+ AB until 2013). 1× All-Star (1933 inaugural). .500 BA in 1931 WS — John McGraw called it 'the greatest individual performance in the history of the World Series.'",

  real_stats: {
    season: 1933, games: 148, at_bats: 599, batting_avg: ".316",
    hits: 189, doubles: 36, triples: 12, home_runs: 12,
    rbi: 76, runs: 122, stolen_bases: 26, walks: 35,
    strikeouts: 54, slg: ".476", obp: ".358", ops: ".834",
    ops_plus: 120, war: 5.5,
    career_avg: ".298", career_hr: 59, career_rbi: 501,
    career_hits: 1227, career_war: 27.3,
    ws_1931_avg: ".500", ws_1931_slg: ".792", ws_1931_sb: 5,
    ws_career_avg: ".418",
  },

  ilb_stats: {
    ovr: 7,      // All-Star — .316/12/76 in 1933. 3× NL SB leader. 3× WS champion. .418 career WS BA. But: .298 career BA, 27.3 career WAR. Not HOF. The fame outpaces the stats. The 1931 WS elevated him beyond his regular-season value. OVR 7 captures the legend plus the real player.
    con: 3,      // .316 BA in 1933. 189 hits. .298 career BA. Consistent .290-.316 hitter in his prime years. Not elite contact (only 1 season above .316). CON 3.
    pow: 1,      // 12 HR in 1933. .476 SLG. 59 career HR. He was not a power hitter — he was a line-drive, stolen-base, triples hitter. The power was incidental. POW 1.
    spd: 3,      // 26 SB in 1933 (led NL). 3× NL SB leader. 146 career SB. 12 triples. 5 SB in 1931 WS. "Ran the bases like a berserk locomotive." Head-first slides. The Wild Horse of the Osage. Triples bonus → SPD 3.
    def: 1,      // Versatile — played CF and 3B. At CF: good range, diving catches. At 3B: "not a naturally gifted third baseman, often fielding balls after having stopped them with his chest." The chest-fielding is legendarily bad but the CF range was legitimately good. Average of the two → DEF 1.
    clu: 3,      // .500 BA in 1931 WS (12-for-24, 5 XBH, 5 SB, .792 SLG). "The greatest individual performance in the history of the World Series" — John McGraw. .355 BA in 1934 WS. .418 career WS BA (highest among 50+ AB for decades). 3× WS champion. Maximum clutch.
  },
  
  stat_justification: {
    con: ".316 BA in 1933. 189 hits. .298 career BA. 6 seasons above .290. Consistent contact hitter who put the bat on the ball. But only 1 season above .316. Not an elite contact hitter — a good one. Rating of 3.",
    pow: "12 HR in 1933. .476 SLG. 59 career HR. He was a speed/contact player, not a power hitter. The extra-base value came from triples and doubles, not home runs. Rating of 1.",
    spd: "26 SB in 1933 (led NL). 3× NL SB leader (1933, 1934, 1936). 146 career SB. 12 triples in 1933. 5 SB in 1931 WS. Head-first slides that became his signature. 'I grew up in Oklahoma, and once you start runnin' out there there ain't nothin' to stop you.' He played halfback for the Hominy Indians football team. Triples bonus → SPD 3.",
    def: "Versatile: CF and 3B. At CF: diving catches, hustle, good range — 'dashed for every batted ball as if it were the seventh game of the World Series.' At 3B: 'not a naturally gifted third baseman, often fielding balls after having stopped them with his chest.' The CF was good; the 3B was comically bad. Averaged together → DEF 1.",
    clu: "1931 WS: .500 BA (12-for-24), 5 XBH, 5 SB, .792 SLG, 5 RBI, 5 R. John McGraw: 'the greatest individual performance in the history of the World Series.' 1934 WS: .355 BA, 2 SB, 8 R. Career WS: .418 BA (highest among 50+ AB until 2013). 3× WS champion (1931, 1934, 1944). Rating of 3 — maximum clutch.",
  },

  personality: {
    leadership_style: "The Chaos Agent. Martin didn't lead through strategy or authority. He led through sheer, uncontrollable energy. Head-first slides. Belly-flop catches. Running the bases like a berserk locomotive. Frankie Frisch: 'A streak on base, a great thrower, a grand fielder. And what a fellow to have on a ball club, full of fun, never moody. And what a fighter!' Martin was the spark plug that ignited the Gashouse Gang — Collins organized the pranks, Dean provided the showmanship, Medwick brought the fury, but Martin brought the reckless, unstoppable energy that made the whole thing go.",
    temperament: "Wild, joyful, reckless, genuine. 'A chunky, unshaven hobo who ran the bases like a berserk locomotive, slept in the raw, and swore at pitchers in his sleep.' He played harmonica in the Mississippi Mudcats. He hired a cowboy musical group to entertain him in the hospital after surgery, creating such a disturbance that staff moved him to an isolated wing. He once threw at batters who bunted in lopsided games instead of throwing them out at first — because it was funnier. He played football for the Hominy Indians, an all-Osage Native American team backed by oil money. He was born on leap day. Nothing about Pepper Martin was normal.",
    work_ethic: "Seven years in the minor leagues before the majors. Cotton farmer's son from Temple, Oklahoma. Bought his first glove with paper route money. Played for $5 a game in the Oklahoma State League. Hit .363 at Rochester in 1930 to finally earn a shot at 27. Then hit .500 in the World Series as a rookie. The talent was always there — it just needed a stage big enough for the Wild Horse.",
    lifestyle: "Oklahoma through and through. Cotton farmer's family. Hominy Indians footballer. Married. Daughters. After playing: minor league manager for years (suspended for choking an umpire). Cubs coach in 1956. Died in McAlester, Oklahoma in 1965. Oklahoma Sports HOF. Buried in Quinton, Oklahoma. His entire life arc was Oklahoma → St. Louis → Oklahoma. The Cardinals were the exception; Oklahoma was the rule.",
    era_adaptability: "MODERATE. The speed and baserunning would translate to any era — he'd be a Billy Hamilton or Trea Turner type, a chaos agent on the basepaths. The .298 career BA would play in modern baseball. But the defense at 3B (fielding with his chest) would not survive modern analytics, and the power (59 career HR) is negligible. He'd be a utility outfielder/pinch-runner in modern baseball — valuable but limited.",
    clubhouse_impact: "THE GASHOUSE GANG'S BEATING HEART. Collins was the ringleader of pranks. Dean was the soul. Medwick was the weapon. But Martin was the spirit — the pure, unfiltered, joyful chaos that made the Gashouse Gang the Gashouse Gang. The Mississippi Mudcats. The harmonica. The hospital musical group. The belly-flop slides. Without Martin, the Gashouse Gang is just a good team. With Martin, they're immortal.",
    dark_side: "The body broke down. The headlong style — head-first slides, diving catches, belly-flop fielding — destroyed Martin's body. Dislocated shoulder in 1932. Broken finger sliding into home. Never quite fulfilled the 'next Ty Cobb' promise from early press reports. His .298 career BA is good but not great. His 27.3 career WAR is solid but not HOF-caliber. And after baseball: he choked an umpire while managing in the minors and was suspended. The Wild Horse didn't always know when to stop running.",
  },

  chemistry_traits: [
    { tag: "The Wild Horse of the Osage", desc: "+2 SPD on the basepaths. +1 aggression. Head-first slides always. 10% chance per stolen base attempt of injury (dislocated shoulder, broken finger). The reckless energy cannot be contained — it only stops when the body stops." },
    { tag: "Gashouse Gang Chaos Agent", desc: "When 2+ Gashouse Gang members on roster: +2 team morale, +1 entertainment. Martin is the spark plug. Without him, the Gang is a team. With him, it's a circus — 'and everybody was wide awake and enjoying being alive.'" },
    { tag: "Mississippi Mudcats Harmonica", desc: "Martin played harmonica and guitar in the Mudcats band. +1 team morale. When paired with Dean (singer), Collins (washboard), and Vance/Warneke: full band → +2 entertainment, +1 publicity." },
    { tag: ".500 in the World Series", desc: "1931 WS: .500 BA, 5 XBH, 5 SB, .792 SLG. John McGraw: 'the greatest individual performance in the history of the World Series.' In the WS: +2 all offensive stats. Martin was BORN for October." },
    { tag: "Chest Fielding", desc: "At 3B, Martin fields grounders by stopping them with his chest, then picking them up. -1 DEF at 3B. +1 entertainment. It's terrible defense and incredible theater. At CF: normal fielding (no penalty)." },
    { tag: "Belly-Flop Slides", desc: "Martin slides head-first on his belly into every base. +1 SB success rate. 5% chance per slide of injury (shoulder, finger, wrist). The slides are legendary but physically costly." },
    { tag: "Hominy Indians Halfback", desc: "Martin played football for the Hominy Indians, an Osage Nation-backed team in Oklahoma. +1 toughness, +1 collision resistance. He took hits on the football field before he took them on the basepaths." },
    { tag: "Leap Day Baby", desc: "Born February 29, 1904. Martin ages at 1/4 the normal rate (thematically). +1 longevity. He played until age 40 (1944 Cardinals — WS champions)." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "HIGH", note: "Entire career — 1 team. 3 WS titles. The Gashouse Gang's home base." },
    { location: "The Basepaths", affinity: "HIGH", note: "3× NL SB leader. Head-first slides. 'Ran the bases like a berserk locomotive.'" },
    { location: "1931 World Series", affinity: "HIGH", note: ".500 BA, 5 SB, .792 SLG. McGraw: 'greatest individual WS performance.' The stage that made him immortal." },
    { location: "Clubhouse / Hotel", affinity: "HIGH", note: "Mississippi Mudcats rehearsals. Pranks. Hospital cowboy bands. The Gashouse Gang's social headquarters." },
    { location: "Temple, Oklahoma", affinity: "MEDIUM", note: "Cotton farm. 'In lean times the family ate cornmeal mush.' Youngest of 7. The poverty built the hunger." },
    { location: "Third Base", affinity: "LOW", note: "Fielded grounders with his chest. 4 errors in one WS game (1934 Game 4 — WS record). The worst great player at 3B." },
  ],

  momentum: {
    hot_triggers: [
      "World Series — .418 career WS BA. Martin transforms in October. The Wild Horse gallops hardest when everything is at stake.",
      "Stolen base streaks — when the legs are moving, the confidence compounds. 3× NL leader.",
      "Gashouse Gang energy — surrounded by Dean, Collins, Medwick, Frisch, the chaos multiplies.",
      "Underdog situations — Martin was a 27-year-old rookie. He thrives when doubted.",
    ],
    cold_triggers: [
      "Injury accumulation — dislocated shoulders, broken fingers, banged-up body. The headlong style has a cost.",
      "Third base defense — when forced to play 3B for extended periods, errors pile up.",
      "Post-1934 decline — after the Gashouse Gang peak, Martin's production declined. .289, .261 in later years.",
      "Managerial frustration — as a minor league manager, he choked an umpire. The chaos doesn't always translate to leadership.",
    ],
    pressure_response: "THE GREATEST WORLD SERIES PERFORMANCE EVER. 1931 WS vs. Philadelphia Athletics (2× defending champions, heavily favored): .500 BA (12-for-24), 5 XBH, 5 SB, 5 RBI, 5 R, .792 SLG. He stole bases on Mickey Cochrane. He drove in the winning runs. He made diving catches. John McGraw: 'the greatest individual performance in the history of the World Series.' Mickey Cochrane: 'Well, kid, you are sitting on top of the world now and you deserve it.' When asked how he learned to run so fast: 'I grew up in Oklahoma, and once you start runnin' out there there ain't nothin' to stop you.' 1934 WS: .355 BA, 2 SB, 8 R. 3× WS champion. .418 career WS BA. Pepper Martin was made for October.",
  },

  action_card_seeds: [
    {
      title: "The Greatest World Series Performance",
      type: "Game Action",
      text: "Your team is a heavy underdog against the two-time defending champions. Your center fielder — a 27-year-old rookie who spent seven years in the minors — hits .500 for the Series. Five extra-base hits. Five stolen bases. Five RBI. Five runs scored. .792 slugging. He steals bases on the best catcher in baseball. The opposing manager calls it 'the greatest individual performance in the history of the World Series.'",
      origin: "1931 WS: Martin hit .500 with 5 XBH and 5 SB vs. the Philadelphia Athletics. McGraw's quote. Cochrane's concession.",
    },
    {
      title: "Once You Start Runnin' in Oklahoma",
      type: "Action",
      text: "A reporter asks your player how he learned to run so fast. His response: 'I grew up in Oklahoma, and once you start runnin' out there there ain't nothin' to stop you.' The quote becomes famous. The explanation is both a joke and the truth — there really is nothing to stop you in Oklahoma.",
      origin: "Martin's famous quote about growing up in Oklahoma, explaining his baserunning style.",
    },
    {
      title: "Fielding Third Base with His Chest",
      type: "Action",
      text: "Your third baseman is not a natural third baseman. When a grounder is hit to him, he doesn't field it cleanly with his glove. He stops it with his chest. The ball drops to the ground. He picks it up. He throws to first. Out. It's terrible technique and it somehow works — most of the time.",
      origin: "Martin 'was not a naturally gifted third baseman, often fielding balls after having stopped them with his chest.'",
    },
    {
      title: "The Hospital Cowboy Band",
      type: "Action",
      text: "Your player is in the hospital for minor surgery on his arm. He hires a cowboy musical group to entertain him at his bedside. The group plays so loudly and for so long that the hospital staff is forced to move him to an isolated wing to stop disturbing other patients.",
      origin: "December 1934: Martin hired a cowboy band to his hospital room. Staff had to relocate him to an isolated wing.",
    },
    {
      title: "The Mudcats Play On",
      type: "Action",
      text: "Your outfielder plays harmonica and guitar. Your pitcher sings. Your first baseman plays washboard. Your relief pitcher blows a jug. They form a band. They play on the radio. They play in the clubhouse. They play in hotels. The team wins the pennant. The band wins America.",
      origin: "The Mississippi Mudcats: Martin (harmonica/guitar), Dean (vocals), Collins (washboard), Vance (jug). Performed on KMOX radio.",
    },
    {
      title: "Four Errors in a World Series Game",
      type: "Drama",
      text: "Game 4 of the World Series. Your third baseman — the hero of the 1931 WS — commits 4 errors in a single game. A World Series record. The ball keeps going through his legs, off his chest, past his glove. He's the worst defensive player on the field and the best hitter in the Series. This is the Pepper Martin experience.",
      origin: "1934 WS Game 4: Martin committed 4 errors at 3B, setting a WS record. He still hit .355 for the Series.",
    },
    {
      title: "Halfback for the Hominy Indians",
      type: "Action",
      text: "Before baseball, your player was a halfback for the Hominy Indians — a professional football team backed by the Osage Nation, wealthy from the Oklahoma oil boom. He learned to take hits, to run through tackles, to slide on his belly. The football field taught the Wild Horse how to gallop.",
      origin: "Martin played halfback for the Hominy Indians, an Osage-backed pro football team in 1920s Oklahoma.",
    },
    {
      title: "The Manager Who Choked an Umpire",
      type: "Drama",
      text: "Your retired legend is managing in the minor leagues. A call goes against his team. He argues. The argument escalates. He grabs the umpire by the throat. He's suspended and fined. The Wild Horse of the Osage never learned when to stop running.",
      origin: "While managing Miami of the International League, Martin was suspended and fined for choking an umpire.",
    },
  ],

  art_direction: {
    face: "Chunky, unshaven, 5'8\" 170 lbs — compact and muscular. The face should show pure reckless joy — dirt-streaked, grinning, wild-eyed. 'A chunky, unshaven hobo who ran the bases like a berserk locomotive.' This is not a refined face. This is the face of a man who slides head-first into everything.",
    attire: "St. Louis Cardinals 1933 home whites with the birds-on-the-bat — but dirty. Caked with infield dirt. Sportsman's Park behind him. The pose: mid-slide, belly-first, head-first, arms extended, dust exploding around him. Or: standing at 3B, chest-out, ready to stop the next grounder with his ribcage.",
    mood: "Controlled chaos. The card should feel like a dust storm — fast, unpredictable, joyful, slightly dangerous. Martin is not graceful. He's not elegant. He's a locomotive in a baseball uniform. The card should vibrate with kinetic energy.",
    style: "Oklahoma dust meets Gashouse Gang grit. Cardinals red, Missouri brown, Oklahoma orange. The dirtiest card in the set — literally. Every other card is clean; Martin's card has dirt on it. Because Martin had dirt on him at all times.",
    reference: "The card of the Wild Horse of the Osage. The man who hit .500 in a World Series. The man who fielded third base with his chest. The man who played harmonica in the Mississippi Mudcats. The man who hired a cowboy band in the hospital. The man who choked an umpire. The man born on leap day who never stopped running. Pepper Martin — the beating heart of the Gashouse Gang.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits -> +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG >= .600 -> +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples >= 10 -> +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CONx2 + POWx2 + SPDx1 + DEFx1 -> normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function PepperMartinCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MARTIN_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Chunky, unshaven, dirt-caked, belly-first slide, Cardinals birds-on-bat, Sportsman's Park, dust exploding, wild grin]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "H", val: d.real_stats.hits },{ label: "3B", val: d.real_stats.triples },{ label: "R", val: d.real_stats.runs },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1933 — LED NL IN SB (26) AND R (122) — INAUGURAL ASG STARTER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 3× WS Champion", "⭐ 1933 ASG Starter", "🏃 3× NL SB Leader", "💎 .500 BA 1931 WS", "📊 .418 Career WS BA", "🎵 Mudcats Harmonica", "🐎 Wild Horse of the Osage", "🏈 Hominy Indians FB"].map((a, i) => (
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Martin's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Martin's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
