import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}jennings-hughie.png`;

const PLAYER_DATA = {
  name: "Hughie Jennings",
  nickname: "Ee-Yah!",
  year: 1896,
  team: "Baltimore Orioles",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '5\'8"',
  weight: "165 lbs",
  born: "April 2, 1869 — Pittston, PA",
  died: "February 1, 1928 — Scranton, PA (age 58)",
  hof: "Inducted 1945 (Old Timers Committee). First elected primarily as a shortstop of the 1890s Orioles dynasty. Also a HOF-caliber manager (3× AL pennants with Tigers). Honus Wagner: 'No one compared with Hughie as a shortstop.'",

  real_stats: {
    season: 1896, games: 131, at_bats: 521, hits: 209, doubles: 27,
    triples: 9, home_runs: 0, rbi: 121, runs: 125, stolen_bases: 70,
    batting_avg: ".401", obp: ".472", slg: ".488", ops: ".960",
    ops_plus: 169, war: 8.2,
    hbp: 51,
    career_avg: ".312", career_hits: 1526, career_hr: 18, career_sb: 359,
    career_rbi: 840, career_runs: 992,
    career_war: 42.2, career_obp: ".391", career_hbp: 287,
    pennants_player: "3× NL Champion (1894-96), 2× NL Pennant (1899-1900)",
    pennants_manager: "3× AL Pennant (1907-09 Tigers)",
    manager_record: "1,184-995",
  },

  ilb_stats: {
    ovr: 10,     // Elite/MVP — .401 BA in 1896. 51 HBP (all-time record). 3× NL champion. Wagner: "No one compared with Hughie as a shortstop." Coal miner, Cornell Law, Tigers manager, near-death survivor. The most intense player of the 1890s.
    con: 5,      // .401 BA → tier 5 (.330+). OPS+ 169 → ≥130 bonus (already capped). Career .312. Five consecutive .300+ seasons with the Orioles. 209 hits in 1896. Maximum contact: 5.
    pow: 0,      // 0 HR in 1896 → tier 0. SLG .488 (under .500, no bonus). 18 career HR. Zero power. But the HBP compensates — he got on base through sheer willingness to absorb pain. Rating: 0.
    spd: 3,      // 70 SB in 1896 → tier 3 (31-50 = 3, 70 exceeds = maximum). 53 SB in 1895. 359 career SB. Elite SS range. Maximum speed: 3.
    def: 2,      // Honus Wagner: "No one compared with Hughie as a shortstop." Captain of the 1890s Orioles dynasty. Led NL SS in putouts multiple times. Great range, strong arm (until it blew out in 1898). Elite defensive reputation. Rating: 2.
    clu: 2,      // 3× NL champion (1894-96). Temple Cup appearances. 2× Brooklyn pennant (1899-1900). No modern WS (pre-1903). But 5 pennants as player + 3 pennants as manager = 8 total pennants. The man won everywhere he went. Rating: 2.
  },

  stat_justification: {
    con: ".401 BA in 1896 → tier 5 (.330+). OPS+ 169. This was the second-best average in the NL that year. 209 hits. .386 the year before with 204 hits. .335 the year before that. Five consecutive .300+ seasons as the Orioles' shortstop. Career .312 BA. Plus: 51 HBP in 1896 — a record that still stands — which boosted his OBP to .472. His on-base ability combined hitting AND getting hit. Maximum contact: 5.",
    pow: "0 HR in 1896. 18 career HR in 1,285 games. SLG .488 (under .500, no bonus). Zero power in the traditional sense. But 27 doubles, 9 triples — some gap pop. In ILB, his offensive value comes entirely from contact, OBP, and speed, not power. Rating: 0.",
    spd: "70 SB in 1896 → tier 3 maximum. 53 SB in 1895. 359 career SB in approximately 10 full seasons. He was a basestealing dynamo — part of the Baltimore Orioles' aggressive small-ball style that revolutionized the game. Hit and run, steal, bunt, advance — Jennings did it all. Elite SS range added to the speed profile. Maximum: 3.",
    def: "Honus Wagner — the greatest shortstop of all time — said 'No one compared with Hughie as a shortstop.' He captained the Baltimore Orioles through three consecutive championships (1894-96), a team regarded as one of the greatest of all time. Great range, strong arm, smart positioning. The Orioles' defensive anchor until he blew out his arm in 1898. Rating: 2.",
    clu: "3× NL champion as the Orioles' captain (1894-96). Played in Temple Cup championship series (precursor to WS). 2× NL pennant with Brooklyn (1899-1900). No modern World Series (pre-1903 era). But as Tigers manager: 3 consecutive AL pennants (1907-09). 8 total pennants (5 as player, 3 as manager). He won everywhere he went, in every role. Rating: 2.",
  },

  personality: {
    leadership_style: "VOLCANIC. Jennings was all fire, all the time. The 'Ee-Yah!' screams from the coaching box, the fists pumped in the air, the leg kicked up, the mouth wide open. He led through sheer intensity — the coal miner's son who brought anthracite energy to every game. He captained the Orioles and managed the Tigers through eight pennant-winning seasons. He led by refusing to stop.",
    temperament: "Fearless to the point of self-destruction. He crouched over the plate and dared pitchers to hit him — 51 times in one season, 287 times in his career. He was beaned by Amos Rusie and played the rest of the game before collapsing unconscious for three days. He dove head-first into an empty swimming pool at Cornell and fractured his skull. He nearly died in an automobile accident. Jennings didn't avoid danger — he ran toward it.",
    work_ethic: "Coal mine to Cornell Law. Jennings worked as a breaker boy at age 12, separating coal from slate in the Pittston anthracite mines. While playing professional baseball, he attended Cornell Law School and passed the bar. He practiced law in the offseason. He coached college baseball at the University of Georgia. He was a player, a captain, a manager, a lawyer, a coach, and a scholar — simultaneously.",
    lifestyle: "Irish-American, Catholic, Pennsylvania coal country. Son of immigrants, one of twelve children. Lifelong friendship with John McGraw — they attended St. Bonaventure together, Jennings was best man at McGraw's wedding. After baseball: practiced law in Scranton. The coal miner who became a lawyer who became a Hall of Famer.",
    era_adaptability: "STRONG ON TOOLS, WEAK ON BODY. Jennings's contact skills (.401 BA), speed (70 SB), and defensive range would translate to any era. His willingness to be hit by pitches would be less valuable with modern protective equipment and pitching velocity — though his OBP contribution was immense. The biggest concern: his self-destructive tendencies (head injuries, the empty pool, the car accident). In a modern era, he'd be on the concussion protocol permanently.",
    clubhouse_impact: "MAXIMUM INTENSITY. 'Ee-Yah!' wasn't just a catchphrase — it was a philosophy. Jennings brought anthracite energy to everything. As the Orioles' captain, he drove the team through three championships. As the Tigers' manager, he handled Ty Cobb (the most difficult player in history) for 14 years. He claims to have coined 'Attaboy!' His presence raised the temperature of any room by 20 degrees.",
    dark_side: "The head injuries and the near-deaths. Beaned by Amos Rusie, unconscious for three days. Dove head-first into an empty swimming pool at Cornell — fractured skull. Nearly killed in an automobile accident in 1911. The pattern suggests a man who lived without a self-preservation instinct. The 51 HBP in one season wasn't courage — it was something closer to compulsion. He died at 58, younger than most of his contemporaries. The body kept score of every impact.",
  },

  chemistry_traits: [
    { tag: "Ee-Yah!", desc: "The war cry. When Jennings is in the coaching box or on the roster, all teammates gain +1 to all stats for the first inning of every game. The energy is contagious." },
    { tag: "Human Target", desc: "51 HBP in 1896 — all-time MLB record, never broken. 287 career HBP — also the all-time record. Jennings crowded the plate and wore every pitch. +1 OBP permanently. First base via HBP counts as a single for chemistry purposes." },
    { tag: "Coal Miner's Toughness", desc: "Breaker boy at age 12. Anthracite coal mines. Jennings is immune to fatigue and pain. He cannot be removed from a game due to minor injury. He plays through everything." },
    { tag: "McGraw's Brother", desc: "Lifelong friendship with John McGraw — teammates, classmates, best man. When Jennings and McGraw are on the same roster or coaching staff, both gain +1 to leadership and strategy." },
    { tag: "The Empty Pool", desc: "Dove head-first into an empty swimming pool. Fractured skull. Survived. Once per season, Jennings may suffer a random injury event from a non-baseball activity. -2 games, +1 legend." },
    { tag: "Cornell Law", desc: "Passed the bar while playing professional baseball. In any rules dispute, contract negotiation, or arbitration, Jennings wins automatically. The lawyer-ballplayer." },
    { tag: "Attaboy!", desc: "Claims to have coined the word. When Jennings compliments a teammate, that player gains +1 to their next at-bat or appearance. Encouragement as a weapon." },
    { tag: "Handled Ty Cobb", desc: "Managed Cobb for 14 years with the Tigers. When Jennings is manager, difficult personality players lose their negative chemistry traits. He absorbs the chaos." },
  ],

  preferred_locations: [
    { location: "Shortstop", affinity: "HIGH", note: "Wagner: 'No one compared with Hughie as a shortstop.' Three championships from the position. The hot corner of the infield." },
    { location: "Third Base Coaching Box", affinity: "HIGH", note: "Where 'Ee-Yah!' was born. Fists pumped, leg kicked, mouth open. The most animated coaching box presence in baseball history." },
    { location: "Coal Mines / Pittston, PA", affinity: "HIGH", note: "Breaker boy. Anthracite country. The foundation of everything. The mines made him tough enough to take 51 pitches to the body." },
    { location: "Courtroom / Law Office", affinity: "MEDIUM", note: "Cornell Law. Passed the bar. Practiced law in Scranton. The intellectual ballplayer, like Reulbach — but louder." },
    { location: "Hospital / Recovery", affinity: "MEDIUM", note: "Three days unconscious after the Rusie beaning. Fractured skull from the empty pool. Car accident. He knew hospitals well." },
    { location: "Baltimore / Orioles Dynasty", affinity: "HIGH", note: "Six future HOFers. Three straight NL championships. The greatest team of the 1890s. This was home base." },
    { location: "Swimming Pool", affinity: "LOW", note: "The empty pool at Cornell. Head-first dive, fractured skull. The most dangerous place in Jennings's life wasn't the ballfield." },
  ],

  momentum: {
    hot_triggers: [
      "Getting hit by pitches — each HBP makes him more aggressive at the plate. The pain fuels him.",
      "Championship races — 3× NL champion, 3× AL pennant. He performed best when pennants were on the line.",
      "Ee-Yah energy — when the crowd is electric, Jennings is on fire. He feeds off atmosphere.",
      "McGraw on the bench — the friendship energized both men. Together they were unstoppable.",
    ],
    cold_triggers: [
      "Head injuries — the cumulative toll. Beaning, empty pool, car accident. Each impact costs something.",
      "Arm injury — blew out his arm in 1898. Once the arm went, the SS career was over. SPD and DEF decline after injury.",
      "Late-career decline — .272 with the Phillies. The body aged faster than most, worn down by 287 HBP and multiple skull fractures.",
      "World Series losses — managed Tigers to 3 consecutive AL pennants (1907-09) but lost the WS all three times. The championship that never came.",
    ],
    pressure_response: "ELITE BUT TRAGIC. As a player: 3 consecutive NL championships with the Orioles. As a manager: 3 consecutive AL pennants with the Tigers. But the Tigers lost the World Series all three years (1907 to Cubs, 1908 to Cubs, 1909 to Pirates). Jennings won pennants — he couldn't win the final series. In ILB: he gets you to October, but October is where the curse lives. 8 pennants, 0 World Series titles as manager. The great winner who couldn't win the last game.",
  },

  action_card_seeds: [
    { title: "Fifty-One Hit By Pitches", type: "Game Action", text: "Your shortstop crowds the plate so aggressively that pitchers hit him 51 times in one season — a record that will never be broken. Each HBP is a free base. His OBP soars to .472. The opposing pitcher is terrified: throw inside and he leans in; throw outside and he lines it to the gap. There is no safe pitch. This card grants your player +1 OBP for the entire season.", origin: "1896: Jennings was hit by pitches 51 times — an all-time MLB record that still stands (as of 2026). Combined with his .401 BA, his OBP reached .472. He crowded the plate in an era before batting helmets and dared pitchers to throw at him." },
    { title: "Three Days Unconscious", type: "Drama", text: "Your player is beaned in the head in the 3rd inning by one of the hardest-throwing pitchers in the league. He finishes the game. Then he collapses. He is unconscious for three days. When he wakes up, he returns to the lineup. -3 games missed. +2 legend. The brain remembers even when the mind forgets.", origin: "Jennings was beaned by Amos Rusie, one of the hardest throwers in the NL. He finished the game, then collapsed and was unconscious for three days. He returned to play." },
    { title: "Ee-Yah!", type: "Game Action", text: "Your manager/coach screams 'EE-YAH!' from the third base coaching box. Fists pumped. Leg kicked in the air. Mouth wide open. Every teammate gains +1 energy for the rest of the inning. The opposing team's concentration breaks. This card can be played once per game and costs nothing. The sound is the weapon.", origin: "Jennings's famous war cry from the Tigers' coaching box. He screamed 'Ee-Yah!' whenever the team got a hit, scored a run, or even just needed a boost. He also claims to have coined 'Attaboy!'" },
    { title: "The Empty Pool", type: "Drama", text: "Your player, attending law school in the offseason, dives head-first into a swimming pool at night. The pool has been emptied. He fractures his skull. He survives. He returns to play. -2 weeks missed. +3 indestructibility legend. The universe is trying to kill this man and he refuses to die.", origin: "While attending Cornell Law School, Jennings dove head-first into a swimming pool that had been drained. He fractured his skull. He survived and continued both his law career and his baseball career." },
    { title: "Coal Miner to Lawyer to Hall of Famer", type: "Origin", text: "Your player starts as a breaker boy — age 12, separating coal from slate in the anthracite mines of Pennsylvania. He becomes the captain of a dynasty. He earns a law degree at Cornell. He manages Ty Cobb for 14 years. He is inducted into the Hall of Fame. The arc from coal mine to Cooperstown is American baseball's greatest ascent.", origin: "Jennings worked in Pittston, PA coal mines as a child. He became the Orioles' captain, attended Cornell Law, passed the bar, managed the Tigers (handling Cobb), and was inducted into the HOF in 1945." },
    { title: "The Orioles Dynasty", type: "Game Action", text: "Your team fields six future Hall of Famers and wins three consecutive championships through aggressive, innovative, sometimes vicious play — hit and run, stolen bases, cut-off plays, and sheer intimidation. +3 team chemistry. +2 opponent intimidation. -1 sportsmanship. The Old Orioles rewrote the rules.", origin: "The 1894-96 Baltimore Orioles: Jennings, McGraw, Keeler, Kelley, Robinson, Brouthers. Manager Ned Hanlon. Three consecutive NL championships. Revolutionized baseball strategy." },
    { title: "Three Pennants, Three Losses", type: "Drama", text: "Your manager leads the team to three consecutive pennants — and loses the World Series all three times. The talent is undeniable. The championships never come. +3 regular season dominance. -3 October heartbreak. The pennant is not the prize.", origin: "1907-1909: Jennings managed the Tigers (with Ty Cobb and Sam Crawford) to three consecutive AL pennants. They lost the WS to the Cubs (1907), Cubs again (1908), and Pirates (1909)." },
    { title: "Handled Cobb", type: "Drama", text: "Your manager inherits the most talented and most difficult player in baseball history. For 14 years, he manages the chaos. The player wins batting titles. The team wins pennants. The manager absorbs the rage. +2 team management. -2 manager's health. Some fires can be contained but never extinguished.", origin: "Jennings managed Ty Cobb and the Detroit Tigers from 1907 to 1920 — 14 years of handling baseball's most volatile genius." },
  ],

  art_direction: {
    face: "Compact, fiery, Irish-American. 5'8\" 165 lbs — small but absolutely crackling with energy. The face of a breaker boy who became a lawyer who became a Hall of Famer. Red-haired or light-haired (Irish), intense burning eyes, a jaw set in permanent determination. Possibly showing bruises from the latest HBP. This is not a gentle face — it's the face of a man who crowds the plate and dares you to throw at him.",
    attire: "Baltimore Orioles uniform circa 1896 — white wool jersey with old English 'B' or 'ORIOLES' insignia, baggy flannel pants, flat cap. TWO POSSIBLE POSES: (1) At bat — crouched extremely close to the plate, chin tucked, body daring the pitcher to throw inside. Or (2) the famous coaching-box pose — both fists pumped, one leg in the air, mouth wide open screaming 'EE-YAH!' — the most iconic image of Jennings. No number.",
    mood: "VOLCANIC INTENSITY. Jennings's card should feel like it's vibrating with energy — the most intense card in the Banners collection. Not quiet like Brown or cerebral like Reulbach — this is FIRE. The Old Orioles' aggression, the coal miner's toughness, the 51 HBP in one season. The card should make you flinch.",
    style: "Sepia-toned with HOTTER, more aggressive undertones — red-tinged, almost feverish. Where Brown is earth and Reulbach is dusk and Lange is golden sun, Jennings is FURNACE HEAT. The palette should suggest impact — the impact of pitches hitting flesh, of a skull hitting an empty pool, of a body that absorbed more punishment than any other in baseball history. Dead-ball era grain but fierier.",
    reference: "Think the coaching-box pose: fists up, leg kicked, mouth open, screaming EE-YAH. Or: the batter crowding the plate, chin over the inside corner, daring the pitcher. The ball is about to hit him — and he's ready. He wants it. The bruises are badges. The card should capture the moment of contact — the pitch finding flesh, the base earned through pain.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", note: "Pre-1957: use historical defensive reputation" },
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

export default function HughieJenningsCard() {
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
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.hotRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>51 HBP — ALL-TIME RECORD</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 14, color: C.hotRed, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 3, fontWeight: 900 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HBP", val: d.real_stats.hbp },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "HITS", val: d.real_stats.hits },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — .401 BA / 51 HBP (RECORD)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR HBP", val: d.real_stats.career_hbp },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR R", val: d.real_stats.career_runs },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "MGR W", val: d.real_stats.manager_record }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: i === 7 ? 9 : 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ HOF 1945", "🔥 .401 BA (1896)", "💥 51 HBP (All-Time Record)", "🏆 3× NL Champ (1894-96)", "⚡ 70 SB (1896)", "🎓 Cornell Law Degree", "📣 Coined 'Attaboy!'", "🐅 3× AL Pennant (Manager)"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Jennings's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
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
                <Section title="Jennings's Derivation">
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
