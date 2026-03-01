import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}lange-bill.png`;

const PLAYER_DATA = {
  name: "Bill Lange",
  nickname: "Little Eva / Big Bill",
  year: 1895,
  team: "Chicago Colts",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "CF",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "190 lbs",
  born: "June 6, 1871 — San Francisco, CA",
  died: "July 23, 1950 — San Francisco, CA (age 79, heart attack)",
  hof: "NOT in HOF. Only 7 seasons (ineligible). Career .330/.400/.458. Clark Griffith: 'I consider Bill Lange the equal of, if not better than, all outfielders of all time.' Cap Anson: 'Better than Cobb or Speaker.' Connie Mack: 'The greatest baserunner I ever saw.'",

  real_stats: {
    season: 1895, games: 123, at_bats: 479, hits: 186, doubles: 27,
    triples: 16, home_runs: 10, rbi: 98, runs: 120, stolen_bases: 67,
    batting_avg: ".389", obp: ".456", slg: ".575", ops: "1.031",
    ops_plus: 157, war: 5.9,
    career_avg: ".330", career_hits: 1056, career_hr: 39, career_sb: 350,
    career_rbi: 579, career_runs: 691,
    career_war: 28.4, career_obp: ".400", career_slg: ".458",
    career_ops_plus: 126,
    seasons_played: 7, retired_age: 28,
  },

  ilb_stats: {
    ovr: 9,      // Elite — five-tool CF who walked away at 28. .389 BA, 67 SB, .575 SLG in 1895. Contemporaries compared him to Cobb, Speaker, DiMaggio. Only 7 seasons but every one was extraordinary except his rookie year.
    con: 5,      // .389 BA → tier 5 (.330+). OPS+ 157 → ≥130 bonus (already at 5, capped). Career .330. Maximum contact. Five of seven seasons above .319. The bat was pure.
    pow: 2,      // 10 HR → tier 1 (10-19). SLG .575 → ≥.500 bonus (+1) = 2. 16 triples, 27 doubles — elite gap power. 286 total bases. For a dead-ball CF, this was electric. Rating: 2.
    spd: 3,      // 67 SB → tier 3 (31-50 = 3, but 67 exceeds the range — maximum). Led NL with 73 SB in 1897. 84 SB in 1896. Career 350 SB in 7 years. Connie Mack: "the greatest baserunner I ever saw." 6'1" 190 lbs moving like a man 30 lbs lighter. Maximum speed: 3.
    def: 2,      // Griffith: "equal of, if not better than, all outfielders of all time" (vs. Speaker, Cobb, DiMaggio). Anson: "in a class by himself as an outfielder." The fence catch legend. Not Gold Glove era but consensus greatest CF of the 1890s. Rating: 2.
    clu: 0,      // No postseason appearances. The Colts/Orphans never won a pennant during Lange's 7 years. Zero October baseball. Zero clutch opportunities. Rating: 0.
  },

  stat_justification: {
    con: ".389 BA in 1895 → tier 5 (.330+). OPS+ 157 (≥130 bonus applies, already capped at 5). Career .330 over 7 years — only one season below .300 (rookie year, .281). He was a natural hitter: pure line-drive stroke, great eye (.400 career OBP), difficult to strike out. In a league that included Keeler, Burkett, and Delahanty, Lange's bat belonged in the top echelon. Maximum contact: 5.",
    pow: "10 HR in 1895 → tier 1 (10-19). SLG .575 → ≥.500 bonus (+1) = 2. The triples tell the story: 16 in 1895, 14 in 1897. He had elite gap power — 27 doubles plus those 16 triples in a 123-game season. Total bases 275. At 6'1\" 190 lbs, he was one of the biggest men in the NL and he hit balls into gaps that smaller men couldn't reach. Rating: 2.",
    spd: "67 SB in 1895. 84 SB in 1896. 73 SB in 1897 (NL leader). 350 career SB in 7 years — 50 SB per season average. 5 SB in one game (July 4, 1896). Connie Mack called his baserunning 'the greatest I ever saw.' At 6'1\" 190 lbs, his speed was shocking — he ran like a man who weighed 160. The size-speed combination was decades ahead of its time. Maximum speed: 3.",
    def: "Clark Griffith (who saw Speaker, Cobb, and DiMaggio): 'I consider Bill Lange the equal of, if not better than, all outfielders of all time.' Cap Anson: 'He was in a class by himself as an outfielder. Better than Cobb or Speaker.' The fence catch legend — whether he actually crashed through the wall or not, the story existed because his contemporaries believed he was capable of it. He tracked down everything in center field. Rating: 2.",
    clu: "Zero. The Chicago Colts/Orphans never reached the postseason during Lange's seven-year career (1893-1899). He never played a single postseason game. No October moments, no World Series, no pennant race heroics. The five-tool phenom on a team that never contended. Rating: 0.",
  },

  personality: {
    leadership_style: "The magnetic star. Lange was the most popular player on the Colts by a 6:1 ratio in a Chicago poll. He didn't lead through discipline — he led through charisma, talent, and the simple fact that he was the best player anyone had ever seen. He was the leader of the 'Dawn Patrol' — the players who skipped curfew and lived the nightlife. He led from the front, but the front was often a saloon at 3 AM.",
    temperament: "Free-spirited, romantic, larger than life. He faked an injury to watch a boxing match. He brought a four-legged chicken to spring training as a mascot (it died). He fell in love with a society woman and walked away from the highest salary in baseball. Lange treated baseball as a magnificent adventure, not a career — and when the adventure conflicted with love, he chose love.",
    work_ethic: "Effortless excellence. Lange didn't grind — he arrived. He was 6'1\" 190 lbs of natural ability. The speed, the power, the arm, the fielding range — they were gifts, not achievements. This made him frustrating for managers like Cap Anson, who valued discipline. Lange would show up late, hungover, and still go 3-for-4 with 2 stolen bases. The effort was invisible because the talent was overwhelming.",
    lifestyle: "San Francisco society, nightlife, romance. Born to a military family at the Presidio. Leader of the Dawn Patrol with Bill Dahlen. Three marriages (Grace Giselman, then two more). Real estate success. Olympic Club member. Known for dancing. The most glamorous ballplayer of the 1890s — a man who lived as large as he played.",
    era_adaptability: "ELITE. Lange's size-speed-power profile — 6'1\" 190 lbs, 67+ SB, .389 BA, .575 SLG — maps directly onto the modern five-tool outfielder prototype. He was Willie Mays before Willie Mays existed. In any era, the combination of size, speed, contact, power, defense, and arm strength would make him a franchise player. The only question is whether he'd stay — or walk away again.",
    clubhouse_impact: "ELECTRIC BUT VOLATILE. The Dawn Patrol: curfew-breaking, carousing, antagonizing Cap Anson. Lange was the fun player — the guy everyone wanted to be around. But he was also unreliable: the boxing hoax, the late arrivals, the constant tension with management. In ILB: +2 team fun/morale, -1 team discipline. The life of the party is also the reason the party ends late.",
    dark_side: "The choice and the aftermath. Bill Lange retired at 28 — the prime of a career that Griffith, Anson, and Mack all said was the greatest they'd ever seen — to marry Grace Giselman, whose father wouldn't let her marry a ballplayer. He refused offers of the highest salary in the league. He chose love. And the marriage failed. They divorced in 1915. By then he was 44 and too old to play. He married twice more. The greatest what-if in baseball history: what would Bill Lange's career have looked like with 14 seasons instead of 7? The choice was romantic. The consequence was erasure.",
  },

  chemistry_traits: [
    { tag: "The Five-Tool Phenom", desc: "Contact, power, speed, defense, arm. Lange has all five at elite levels. +1 to his lowest stat for any given game. The complete player." },
    { tag: "Love Over Baseball", desc: "Retired at 28 to marry a woman whose father forbade her to marry a ballplayer. Lange can only be played for 7 seasons maximum in any franchise mode. After that, he walks away." },
    { tag: "Dawn Patrol", desc: "Lange + Dahlen = curfew breakers. When both are on the roster, +2 fun/-1 discipline. The nightlife finds them." },
    { tag: "The Greatest I Ever Saw", desc: "Connie Mack on his baserunning. Griffith on his outfielding. Anson on everything. When Lange is in the lineup, opposing teams' morale drops -1 from sheer intimidation." },
    { tag: "The Fence Catch", desc: "Legend: dove for a fly ball and crashed through the outfield fence. Whether true or not, it's part of his mythology. 20% chance per game of making an impossible catch that becomes legendary." },
    { tag: "Most Popular by 6:1", desc: "Chicago poll results. Lange draws fans. +3 attendance when he plays. The people love watching him." },
    { tag: "Four-Legged Chicken", desc: "Brought a four-legged chicken to spring training as a mascot. It died. When the mascot dies, -1 luck for the season." },
    { tag: "The What-If", desc: "7 seasons instead of 14. .330 career average at age 28. What would the numbers have been? +5 romantic tragedy to legacy." },
  ],

  preferred_locations: [
    { location: "Center Field", affinity: "HIGH", note: "Equal to Cobb, Speaker, DiMaggio per Griffith. The greatest CF of the 1890s. Everything was catchable." },
    { location: "San Francisco", affinity: "HIGH", note: "Born, retired, and died in SF. The Presidio, the society scene, the Olympic Club. Home was always California." },
    { location: "Nightlife / Saloons", affinity: "HIGH", note: "Dawn Patrol leader. Skipped curfew. Drank all night. Showed up and hit .389. The party was the pregame." },
    { location: "Dance Floor", affinity: "HIGH", note: "Known in San Francisco society for his dancing. Grace and Bill were fixtures on the dance scene. Elegance in motion." },
    { location: "Basepaths", affinity: "HIGH", note: "350 career SB. 84 in one season. 5 in one game. Mack: 'the greatest baserunner I ever saw.' The basepaths were his playground." },
    { location: "Real Estate Office", affinity: "MEDIUM", note: "Post-baseball career. Successful in real estate and insurance. The businessman who used to play baseball." },
    { location: "October / Postseason", affinity: "LOW", note: "NEVER EXPERIENCED IT. Seven years, zero pennant races. The greatest what-if never got his October." },
  ],

  momentum: {
    hot_triggers: [
      "Early season — Lange's best stretches came in the first half. He loved the spring and the return to the game.",
      "Against elite pitching — the better the opponent, the more Lange elevated. He hit .389 against the full NL.",
      "Stolen base situations — 5 SB in one game. When running, he got faster as the game progressed.",
      "Adoring crowds — most popular player by 6:1. The crowd's energy fed his performance.",
    ],
    cold_triggers: [
      "Late-season motivation — on losing teams, Lange's focus could drift. The Colts never contended seriously.",
      "Management conflict — Cap Anson clashes. When told what to do, Lange did the opposite (the boxing hoax).",
      "Homesickness — San Francisco called. He was always a California man playing in a Chicago winter.",
      "Romance — when Grace appeared, baseball became secondary. Love was always the stronger pull.",
    ],
    pressure_response: "UNKNOWN. This is the tragedy of Bill Lange. He never faced a postseason game, never played in a pennant race that mattered, never had his October moment. Every contemporary said he was the greatest they'd ever seen — but they saw him in May and June, not in October. Would the five-tool phenom have risen or faded under pressure? We'll never know. In ILB: ceiling is maximum, floor is unknown. The ultimate gamble card.",
  },

  action_card_seeds: [
    { title: "The Choice: Love Over Baseball", type: "Drama", text: "Your 28-year-old superstar — hitting .330, the most popular player in the league, offered the highest salary ever — announces he is retiring. His fiancée's father won't let her marry a ballplayer. He walks away. The team offers double, triple his salary. He says no. The marriage lasts 15 years before ending in divorce. By then he is 44 and too old to return. The greatest career that never finished.", origin: "After the 1899 season, Lange retired at 28 to marry Grace Giselman. Her father forbade her to marry a ballplayer. They divorced in 1915. Lange never returned to the majors. Teams offered him record salaries. He refused every one." },
    { title: "Five Stolen Bases in One Game", type: "Game Action", text: "Your center fielder steals five bases in a single game. He is two shy of the all-time record. The opposing catcher is demoralized. Your baserunning gains +3 momentum for the remainder of the series.", origin: "July 4, 1896: Lange stole 5 bases in one game against Louisville, two short of the record set by George Gore and Billy Hamilton." },
    { title: "The Fence Catch", type: "Game Action", text: "Bottom of the 10th, scoreless game. Your center fielder makes a full-speed diving catch in deep center — and crashes through the wooden outfield fence. The legend says he held onto the ball. Whether he actually broke through the fence or not, the catch is real, the game is saved, and the story becomes immortal. +3 legend. +2 defense reputation forever.", origin: "August 31, 1896 (or thereabouts): Lange made a diving catch in the 10th inning. The fence-crash legend was likely confused with a teammate being carried through broken fence slats for medical treatment, but the myth persists because everyone believed Lange was capable of it." },
    { title: "The Dawn Patrol", type: "Drama", text: "Your star outfielder and your star shortstop skip curfew, drink all night, and are seen with 'loose women.' The manager is furious. The next day, both players go a combined 6-for-8 with 4 stolen bases. -2 team discipline, +2 team fun, +1 to both players' stats for the day. The party is the fuel.", origin: "Lange and Bill Dahlen led the Dawn Patrol — the Colts players who broke curfew regularly, antagonizing manager Cap Anson. Anson ultimately lost the power struggle." },
    { title: "The Boxing Hoax", type: "Drama", text: "Your star player wants to see a boxing match instead of reporting to spring training. He arranges for a friend in the media to publish a fake injury report. He watches the fight. He is 'miraculously cured' afterward. -1 management trust. +1 player entertainment.", origin: "1897: Lange arranged a hoax with a friend in the media, faking an injury so he could watch the Corbett-Fitzsimmons boxing match. He was 'cured' after the fight and hit .340 that season." },
    { title: "The Four-Legged Chicken", type: "Drama", text: "Your star player brings a four-legged chicken to spring training as a team mascot. The chicken was hatched 'in the dark of the moon' from a crop of 13 eggs. The media is fascinated. The chicken dies before the season starts. -1 luck. +2 entertainment. The mascot that never was.", origin: "1896: Lange brought a four-legged chicken from San Francisco to spring training as a mascot for the Colts. The Chicago Post reported: 'Big Bill Lange's mascot, the four-legged chicken he picked up in San Francisco, is dead.'" },
    { title: "Equal to Them All", type: "Drama", text: "Decades after your player retires, a man who saw him play — and who also saw Cobb, Speaker, and DiMaggio — declares him the equal or better of all of them. The legend grows in absence. +5 legacy. The players who are remembered aren't always the ones who stayed.", origin: "Clark Griffith (1950): 'I have seen all the other great outfielders — Tris Speaker, Ty Cobb, Joe DiMaggio — in action, and I consider Bill Lange the equal of, if not better than, all outfielders of all time.'" },
    { title: "One Hit Under .300", type: "Drama", text: "Your rookie center fielder finishes at .281 — the only time in his career he'll hit below .300. It is also the only time the stats won't match the talent. After this, every season will be .319 or better. The rough start makes the peak sweeter.", origin: "1893: Lange's rookie year was his only sub-.300 season. He hit .281 with 47 SB and 88 RBI. Every subsequent season: .325, .389, .326, .340, .319, .325." },
  ],

  art_direction: {
    face: "BIG. 6'1\" 190 lbs — enormous for the 1890s. Broad-shouldered, athletic, the build of a modern power outfielder trapped in the dead-ball era. Handsome, confident, the face of the most popular player in Chicago by a 6:1 margin. A man who looks like he'd be equally at home on a dance floor, in a saloon, or running down a fly ball in deep center. Dark hair, strong jaw, easy charisma.",
    attire: "Chicago Colts uniform circa 1895 — white wool jersey with 'CHICAGO' or Colts insignia, baggy flannel pants, flat cap. Full-speed stride in center field — legs extended, arms pumping, chasing down a fly ball at the fence. Or: the stolen base — sliding feet-first into second, dust flying, the catcher's throw arriving too late. No number.",
    mood: "Joyful velocity. Lange's card should feel like SPEED and FUN — the thrill of a man who played baseball as a grand adventure. Not grim, not intense — alive. The West Side Park behind him, 1890s Chicago summer, the crowd on its feet for their favorite player. This is the card that makes you smile before you read the stats.",
    style: "Sepia-toned with WARMER, more golden, almost Californian undertones — unlike the blue-collar Collins card or the industrial McGinnity. Lange is sunshine and San Francisco, even in Chicago. The palette should suggest youth, vitality, and the golden light of a career that burned too bright and too brief. A card that glows.",
    reference: "Think full-speed pursuit — the outfielder at maximum velocity, the ball just ahead of his outstretched glove, the fence approaching. Or: the stolen base in mid-slide, the grin already forming because he knows he's safe. The card should capture the moment before the fence, the moment before the choice — when everything was still possible and the greatest player anyone had ever seen was still playing.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }], note: "Pre-1957: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function BillLangeCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.hotRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>⚠ RETIRED AT 28</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.hotRed}10`, border: `1px solid ${C.hotRed}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 10, color: C.hotRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>⚠ CLU 0 — NEVER PLAYED A POSTSEASON GAME. ZERO OCTOBER.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "3B", val: d.real_stats.triples },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} PEAK SEASON — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR SLG", val: d.real_stats.career_slg },{ label: "OPS+", val: d.real_stats.career_ops_plus },{ label: "SEASONS", val: d.real_stats.seasons_played }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>7 SEASONS ONLY — CHOSE LOVE OVER BASEBALL</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🔥 .389 BA (1895)", "⚡ 84 SB (1896)", "👑 NL SB Leader (1897)", "🏃 5 SB in One Game", "💔 Retired at 28 for Love", "🌟 Equal to Cobb/Speaker/DiMaggio", "🐔 Four-Legged Chicken", "❌ Zero Postseason Games"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Lange's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Lange's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
