import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}schang-wally.png`;

const PLAYER_DATA = {
  name: "Wally Schang",
  nickname: "The Greatest Catcher You've Never Heard Of",
  year: 1919,
  team: "Boston Red Sox",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "C",
  bats: "S",
  throws: "R",
  height: '5\'10"',
  weight: "180 lbs",
  born: "August 22, 1889 — South Wales, NY",
  died: "March 6, 1965 — St. Louis, MO (age 75)",
  hof: "NOT IN HOF. .284 career BA. .393 career OBP (2nd all-time among C, behind only Mickey Cochrane). 4× WS champion with 3 different franchises (only C ever). 6× AL pennant. 48.0 career WAR (highest of any C not in Cooperstown). First player to homer from both sides of the plate in the same game. The dead-ball era's best-hitting catcher, who somehow got locked out of the Hall.",

  real_stats: {
    season: 1919, games: 113, at_bats: 330, hits: 101, doubles: 17,
    triples: 3, home_runs: 2, rbi: 46, runs: 56, stolen_bases: "~10",
    batting_avg: ".306", obp: ".436", slg: ".376", ops: ".812",
    ops_plus: "~140", war: "~4.5",
    walks: 71, strikeouts: 42,
    season_1913_ws: ".357 BA, 1 HR, 7 RBI — 'sensation of the 1913 World Series' (NYT)",
    season_1918_ws: ".444 BA in 5 games — last Red Sox title before 2004",
    season_1920: ".305/.413, 64 BB / 37 K, 118 H",
    career_avg: ".284", career_hits: 1506, career_hr: 59,
    career_rbi: 710, career_sb: 121, career_games: 1842,
    career_obp: ".393 (2nd all-time among C)", career_war: "48.0",
    career_ops_plus: "~120",
    ws_titles: "4 (1913 A's, 1918 Red Sox, 1923 Yankees, 1930 A's)",
    ws_titles_played: "3 different franchises (only C ever)",
    pennants: "6 (1913-14 A's, 1918 Red Sox, 1921-23 Yankees)",
    ws_career_ba: ".287 (32 games)",
    ws_winning_ba: ".356 / .909 OPS in 3 titles played",
    first_switch_hr: "Sept 8, 1916 — first player to HR from both sides in same game",
    threw_out_6: "May 12, 1915 — 6 base stealers caught in one game (AL record)",
    assists_8: "May 12, 1920 — 8 assists in one game",
    ws_1921_throwouts: "9 runners caught stealing in 1921 WS",
    caught_hof_pitchers: "Bender, Plank, Pennock, Hoyt, Grove, Ruth",
    career_c_errors: "223 (AL record)",
    bill_james_rank: "20th greatest C in history",
    among_c_1901_31: "1st in OBP, SLG, H, R, RBI, WAR. 2nd in BA, OPS+. 3rd in HR.",
  },

  ilb_stats: {
    ovr: 8,      // All-Star — The greatest hitting catcher of the dead-ball era. .393 career OBP (2nd among all C). 4× WS champion. 6× pennant. Caught 6 HOF pitchers. 48.0 WAR (highest of any C not in HOF). Among all C 1901-1931: 1st in OBP, SLG, H, R, RBI, WAR. Switch-hitter. First to HR from both sides in one game. He should be in the Hall. He's not.
    con: 4,      // .306 BA in 1919 → tier 4 (.300-.329). OPS+ ~140 → ≥130 bonus would push to 5, but .306 is the peak BA for a C with .284 career. The OBP (.393 career, .436 in 1919) was the real weapon — he walked MORE than he struck out in nearly every season. The OPS+ bonus acknowledges the walk-based production, but I hold at 4 because the BA ceiling (.306) is solidly tier 4 territory. Rating: 4.
    pow: 1,      // 59 career HR, peak ~7-8 per season → tier 0 (0-9 HR). SLG .415-.440 peak → misses ≥.500 bonus. But: first switch-hitter to homer from both sides in same game. Meaningful dead-ball pop for a catcher. I bump to 1 for above-average C power + the historic switch-hit homer. Rating: 1.
    spd: 1,      // 121 career SB (8th all-time among C). ~10-15 SB in peak years → tier 1 (6-15). 'Ran unusually well for a catcher' — Bill James. 'New breed of catchers who used speed and agility.' Fast for a C, not fast overall. Rating: 1.
    def: 2,      // 'Decent defensive catcher, not the equal of Ray Schalk, but good' — Bill James. Threw out 6 base stealers in one game (1915, AL record). 8 assists in one game (1920). Gunned down 9 runners in 1921 WS. Caught HOF pitchers for 19 years: Bender, Plank, Pennock, Hoyt, Grove, Ruth. BUT: 223 career C errors (AL record). High-volume, strong-arm, error-prone — like a modern high-activity catcher with the cannon arm and the occasional wild throw. Rating: 2.
    clu: 3,      // MAXIMUM. 4× WS champion: 1913 A's, 1918 Red Sox, 1923 Yankees, 1930 A's. The ONLY catcher to win WS with 3 different franchises. 6× AL pennant. WS career BA .287 in 32 games. In the 3 WS he played: .356 BA / .909 OPS. 1913 WS: .357, 1 HR, 7 RBI — 'sensation of the WS' (NYT). 1918 WS: .444 — last Red Sox title until 2004. 1921 WS: gunned down 9 baserunners. October machine. Rating: 3.
  },

  stat_justification: {
    con: ".306 BA in 1919 → tier 4 (.300-.329). OPS+ ~140 in peak years → technically ≥130 bonus. Career: .284 BA, .393 OBP (2nd all-time among catchers, behind only Mickey Cochrane's .419). 71 BB vs. 42 K in 1919 — he walked far more than he struck out in nearly every season of his career. Among all catchers 1901-1931: 1st in OBP, hits, runs, and RBI. 2nd in BA and OPS+. The value was in the OBP, not just the BA. Rated 4 (holding the OPS+ bonus back slightly because .306 peak BA is solidly tier 4). Rating: 4.",
    pow: "59 career HR, best single season ~7-8 → tier 0 (0-9 HR). SLG .415-.440 peak → misses ≥.500 bonus. However: first switch-hitter to homer from both sides of the plate in the same game (Sept 8, 1916). Among C 1901-1931: 3rd in HR. For a dead-ball catcher, 59 HR represented real pop. Bumped to 1 for era-adjusted C power. Rating: 1.",
    spd: "121 career SB (8th all-time among catchers). Peak years ~10-15 SB → tier 1 (6-15). Bill James: 'ran unusually well for a catcher.' He was part of 'the new breed of catchers that emerged from the Deadball Era who used speed and agility.' Fast for a catcher, but not compared to position players. Rating: 1.",
    def: "Mixed bag. STRENGTHS: Threw out 6 base stealers in one game (May 12, 1915 — AL record). 8 assists in one game (May 12, 1920). Gunned down 9 runners in the 1921 WS, shutting down the Giants' running game. Caught Hall of Fame pitchers: Chief Bender, Eddie Plank, Herb Pennock, Waite Hoyt, Lefty Grove, and Babe Ruth (as pitcher). 19-year career behind the plate. WEAKNESS: 223 career C errors — AL record. Bill James: 'Decent defensive catcher, not the equal of Ray Schalk, but good.' The arm was elite; the hands were sometimes unreliable. Rating: 2.",
    clu: "MAXIMUM. The case: (1) 4× WS champion: 1913 A's, 1918 Red Sox, 1923 Yankees, 1930 A's (backup). (2) Only catcher in MLB history to win WS with 3 different franchises (played). (3) 6× AL pennant winner. (4) WS career: .287 BA in 32 games. In the 3 WS he played full: .356 BA / .909 OPS. (5) 1913 WS: .357, 1 HR, 7 RBI — NYT called him 'the sensation of the 1913 World Series.' (6) 1918 WS: .444 BA — catching the last Red Sox title until 2004. (7) 1921 WS: gunned down 9 baserunners, shutting down the Giants' running game. October was his stage. Rating: 3.",
  },

  personality: {
    leadership_style: "THE STEADY HAND. Schang wasn't a fiery leader or a clubhouse politician — he was the quiet, competent professional who caught Hall of Fame pitchers for 19 years and won championships with every team that put him behind the plate. His leadership was in the reliability: he caught Bender, Plank, Pennock, Hoyt, Grove, and Ruth. Different arms, different eras, same steady catcher.",
    temperament: "LIKEABLE AND DURABLE. Described as 'likeable' — a rare adjective in the combative dead-ball era. Schang got along with everyone. He played for 5 teams across 19 seasons without controversy, feuds, or incidents. The switch-hitting catcher was the ultimate team player — wherever he went, the team won.",
    work_ethic: "VERSATILE GRINDER. When not catching, managers played Schang at 3B, OF, anywhere — to keep his bat in the lineup. He was a catcher-outfielder-third baseman, the dead-ball era's utility weapon. He played until age 41, then managed in the minors until his late 50s. The work never stopped.",
    lifestyle: "FARM BOY TO FARM MAN. Born in South Wales, NY — parents were farmers. Discovered playing sandlot ball for the Buffalo Pullmans by George Stallings. After a 19-year ML career, he ran a farm for 20 years. The cycle was complete: farm to baseball to farm.",
    era_adaptability: "THE MODERN CATCHER PROTOTYPE. Schang represented the 'new breed of catchers' — speed, agility, switch-hitting, OBP-focused. In modern baseball, his .393 OBP, switch-hitting ability, and stolen base totals would make him a sabermetric darling. The error totals would be forgiven for the offensive production. Schang in 2024 is Adley Rutschman with more speed and fewer analytics.",
    clubhouse_impact: "THE WINNING INGREDIENT. Schang played on 6 pennant winners and 4 WS champions with 3 different franchises. Wherever he went, the team won. Coincidence? Maybe — or maybe the quiet, competent catcher who caught Hall of Famers and hit .300 in October was the ingredient every championship team needed. +2 team stability, +1 pitching staff morale.",
    dark_side: "The 223 career errors. The AL record for C errors haunts Schang's legacy and likely kept him out of the Hall of Fame. The arm was strong — 6 throwouts in one game, 9 in a WS — but the hands were sometimes unreliable. Passed balls, wild throws, muffed catches. The error total was the price of 19 years of high-volume catching. Also: his stats, while excellent, are overshadowed by Mickey Cochrane (HOF, higher OBP) and Bill Dickey (HOF, better defense). Schang was the best who wasn't quite the best — the eternal third place at his own position.",
  },

  chemistry_traits: [
    { tag: "Championship Magnet", desc: "4× WS champion with 3 franchises. 6× pennant. Wherever Schang goes, the team wins. +1 team luck, +1 team chemistry. The winning follows him." },
    { tag: "Switch-Hitter Pioneer", desc: "First player to HR from both sides in one game (1916). Schang has no platoon weakness — equally dangerous from both sides. No lineup protection needed." },
    { tag: "HOF Pitcher Whisperer", desc: "Caught Bender, Plank, Pennock, Hoyt, Grove, and Ruth. When paired with elite pitchers, +1 to their CTL. Schang knows how to call a game for greatness." },
    { tag: "The OBP Catcher", desc: ".393 career OBP — 2nd all-time among C. Schang walks more than he strikes out. +1 OBP inherent. The plate discipline was his superpower." },
    { tag: "Error-Prone Cannon", desc: "223 career C errors (AL record) but threw out 6 in one game and 9 in a WS. When attempting to throw out runners, 80% success rate but 15% chance of error. The arm giveth and the arm taketh away." },
    { tag: "Utility Catcher", desc: "Managers played Schang at C, 3B, OF to keep his bat in the lineup. Can play multiple positions without penalty. The dead-ball era's most versatile backstop." },
    { tag: "The Farm Cycle", desc: "Farm → baseball → farm. Born on a farm, returned to a farm. +1 groundedness, +1 durability. The honest foundation that supported 19 ML seasons." },
    { tag: "The Hall's Oversight", desc: "48.0 career WAR — higher than HOF catchers Bresnahan, Lombardi, Schalk, and Ferrell. NOT in Cooperstown. +2 underdog motivation. -1 historical recognition." },
  ],

  preferred_locations: [
    { location: "Behind the Plate", affinity: "HIGH", note: "1,435 career games at C. Caught 6 HOF pitchers. The crouch was his office for 19 years." },
    { location: "Batter's Box (Both Sides)", affinity: "HIGH", note: ".284 career BA, .393 OBP. Switch-hitter. First to HR from both sides in one game. No platoon weakness." },
    { location: "The World Series", affinity: "HIGH", note: ".356 BA / .909 OPS in 3 WS titles. .357 in 1913. .444 in 1918. October was his best month." },
    { location: "Philadelphia / Shibe Park", affinity: "HIGH", note: "1913-17. Rookie sensation. 1913 WS hero. $100,000 Infield era. Where it all started." },
    { location: "Every Championship Team", affinity: "HIGH", note: "A's, Red Sox, Yankees — every team he joined won. The championship magnet." },
  ],

  momentum: {
    hot_triggers: [
      "World Series — .356 BA in WS titles. Schang elevates in October. Every time.",
      "Catching HOF pitchers — when the pitcher is elite, Schang's game-calling produces +1 synergy.",
      "Walking — 71 BB vs. 42 K in 1919. When Schang is patient, he's devastating.",
      "Switch-hitting advantage — when pitcher changes, Schang adjusts seamlessly. No cold side.",
    ],
    cold_triggers: [
      "Error streaks — 223 career C errors. When the hands go cold, the throws go wild.",
      "Playing other positions — he could play 3B/OF, but he was best behind the plate.",
      "Overlooked — Schang's legacy suffers from being overshadowed by Cochrane and Dickey.",
      "Late-career decline — hit .183 in his final full year. The bat eventually faded.",
    ],
    pressure_response: "CHAMPIONSHIP-CALIBER. Schang's WS record speaks for itself: .357 in 1913 (NYT: 'sensation'), .444 in 1918, gunned down 9 runners in 1921. He was the catcher on 4 championship teams with 3 different franchises — the only catcher to do this. In ILB: Schang is the October catcher. Start him in the postseason. His regular-season stats are All-Star; his postseason stats are elite.",
  },

  action_card_seeds: [
    { title: "The Sensation of the 1913 World Series", type: "Game Action", text: "Your rookie catcher bats .357 in the World Series. He hits a home run. He drives in 7 runs. The New York Times calls him 'the sensation of the 1913 World Series.' He is 23 years old. The Athletics win in five games. +3 CLU. +2 rookie legend. The quiet kid from South Wales just announced himself.", origin: "1913 WS: Schang hit .357 with 1 HR and 7 RBI as a rookie, leading the A's to the championship. The NYT called him the Series sensation." },
    { title: "Four-Forty-Four", type: "Game Action", text: "Your catcher bats .444 in the World Series. The Red Sox beat the Cubs. It is the last Red Sox championship for 86 years. Your catcher doesn't know this yet. He just knows he hit .444 in October. +3 CLU. +2 historic significance.", origin: "1918 WS: Schang hit .444 in 5 games as the Red Sox won their last title until 2004." },
    { title: "Nine Runners Down", type: "Game Action", text: "The Giants are running. Your catcher throws. And throws. And throws. Nine runners caught stealing in the World Series. The Giants' running game is dead. Your catcher killed it with his arm. +3 DEF. +2 intimidation. The cannon behind the plate.", origin: "1921 WS: Schang gunned down 9 Giants baserunners, effectively shutting down their running game." },
    { title: "Six in One Game", type: "Game Action", text: "Six runners try to steal on your catcher. All six are thrown out. An AL record that will last a century. The arm is a cannon. The accuracy is supernatural. +4 DEF for the game. -3 opponent baserunning. Don't run on Schang.", origin: "May 12, 1915: Schang threw out 6 base stealers in one game — an AL record for catchers." },
    { title: "First from Both Sides", type: "Game Action", text: "Your catcher steps into the box left-handed. He hits a home run. Later, he steps in right-handed. He hits another home run. He is the first player in major league history to homer from both sides of the plate in the same game. Only 23 fans are in the stadium to see it. +2 POW. +3 historic first. The switch-hitting pioneer.", origin: "Sept 8, 1916: Schang became the first MLB player to homer from both sides of the plate in the same game. Only 23 fans attended." },
    { title: "Three Teams, Three Rings", type: "Drama", text: "Your catcher wins the World Series with the Athletics. He is traded. He wins the World Series with the Red Sox. He is traded. He wins the World Series with the Yankees. The only catcher in baseball history to win championships with three different franchises. Wherever he goes, the team wins. +5 championship magnetism. Is it luck? Or is it the quiet catcher?", origin: "Schang won WS with the 1913 A's, 1918 Red Sox, and 1923 Yankees — the only C to win with 3 franchises." },
    { title: "The Hall's Locked Door", type: "Drama", text: "Your catcher retires with a .393 career OBP — second only to Mickey Cochrane among all catchers in history. He has 48.0 career WAR — more than Hall of Fame catchers Bresnahan, Lombardi, Schalk, and Ferrell. He won 4 World Series. He is not elected to the Hall of Fame. The door remains locked. -3 recognition. +2 injustice. The greatest catcher outside Cooperstown.", origin: "Schang's 48.0 WAR is the highest of any catcher not in the HOF. His .393 OBP is 2nd all-time among C." },
    { title: "Catching Babe Ruth", type: "Drama", text: "Your catcher squats behind the plate. The pitcher on the mound is a young left-hander named George Herman Ruth. Your catcher calls the game. They win. Later, Ruth will stop pitching and become the greatest hitter in baseball history. But today, your catcher caught him. +2 legacy. +1 historical connection. Schang caught Ruth before anyone knew what Ruth would become.", origin: "Schang caught Babe Ruth as a pitcher with the 1918-19 Red Sox, before Ruth's conversion to full-time hitting." },
  ],

  art_direction: {
    face: "SOLID, STEADY, PLEASANT. 5'10\" 180 lbs — compact, athletic, built for the crouch. The face should be LIKEABLE — an unusual quality in the dead-ball era, but Schang was known for being easy to get along with. Round, honest features, the look of a farm boy from upstate New York who found his way behind the plate. Clear eyes, steady gaze — the eyes of a man who called pitches for Hall of Famers. Not intense like Cobb or intellectual like Collins — DEPENDABLE. The face of a man you'd trust with your pitching staff. Possible mustache (he wore one early in his career).",
    attire: "Boston Red Sox uniform circa 1919 — or Philadelphia Athletics circa 1913 for the dynasty connection. White wool jersey, flat cap. Catcher's gear visible but not overwhelming — chest protector, shin guards, mitt. THE POSE: the throw — Schang in mid-throw from the crouch, arm cocked, the ball rocketing toward second base. The cannon arm that threw out 6 in a game and 9 in a World Series. Or: the switch-hitting stance — show BOTH sides, perhaps a split composition. Or: the crouch itself — low, wide, mitt presented, the steady target for Bender, Plank, Pennock, Hoyt, Grove, and Ruth. No number.",
    mood: "STEADY AND UNASSUMING. Schang's card should feel like RELIABILITY — not flashy, not dramatic, but deeply competent. Where the other Muggers are eagles and kings and lightning, Schang is the FOUNDATION — the catcher who held everything together. The mood should suggest quiet competence, the man who did his job so well that nobody noticed until he was gone.",
    style: "Sepia-toned with COOL, STEEL-BLUE undertones — the color of catcher's equipment, the steel of a throwing arm, the cool competence of a man who won championships without headlines. Different from the warm golds and earths of the outfielders — Schang's palette is STEEL AND LEATHER — the tools of the catching trade. The most understated palette in the Muggers collection, because Schang was the most understated star.",
    reference: "Think the throw to second — Schang rising from the crouch, arm whipping forward, the ball a blur. Or: the 1913 WS celebration — the rookie catcher who was the 'sensation of the Series,' modest amid the celebration. Or: the long career montage — A's uniform, Red Sox uniform, Yankees uniform, always behind the plate, always winning. The card should capture the paradox: the man who won everything and got nothing (no HOF).",
  },
};

const C_COLORS = {
  parchment: "#eee8d8", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", steel: "#6a7a8a",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C_COLORS.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e0d8c6", borderRadius: 2, overflow: "hidden", border: `1px solid ${C_COLORS.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C_COLORS.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C_COLORS.traitGreen}15`, border: `1px solid ${C_COLORS.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C_COLORS.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C_COLORS.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C_COLORS.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function WallySchangCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #221a10 0%, #171210 50%, #221a10 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C_COLORS.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C_COLORS.silver, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C_COLORS.parchment, borderRadius: 8, border: `3px solid ${C_COLORS.steel}`, boxShadow: `0 0 0 1px ${C_COLORS.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C_COLORS.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C_COLORS.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C_COLORS.steel, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C_COLORS.steel}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C_COLORS.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C_COLORS.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C_COLORS.darkBrown}dd`, color: C_COLORS.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C_COLORS.steel}dd`, color: C_COLORS.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position} • S</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C_COLORS.warmRed}cc`, color: C_COLORS.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>❌ NOT IN HOF</span>
                <span style={{ background: `${C_COLORS.steel}cc`, color: C_COLORS.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>ALL-STAR</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C_COLORS.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C_COLORS.steel, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 1, fontWeight: 700 }}>The Greatest Catcher You've Never Heard Of</div>
              <div style={{ fontSize: 11, color: C_COLORS.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>Multiple Teams — Peak {d.year}</div>
              <div style={{ fontSize: 10, color: C_COLORS.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>4× WS Champion • 3 Different Franchises • No HOF Plaque</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C_COLORS.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C_COLORS.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C_COLORS.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C_COLORS.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C_COLORS.hotRed} />
            </div>
            <div style={{ background: `${C_COLORS.steel}15`, border: `1px solid ${C_COLORS.steel}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C_COLORS.steel, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🏆 4× WS CHAMP (A's, RED SOX, YANKEES) • .393 OBP (2ND ALL-TIME AMONG C) • 48.0 WAR</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C_COLORS.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".306" },{ label: "OBP", val: ".436" },{ label: "OPS+", val: "~140" },{ label: "BB/K", val: "71/42" },{ label: "H", val: "101" },{ label: "RBI", val: "46" },{ label: "R", val: "56" },{ label: "WAR", val: "~4.5" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C_COLORS.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C_COLORS.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C_COLORS.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1919 RED SOX — .306/.436 / MORE WALKS THAN STRIKEOUTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C_COLORS.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C_COLORS.sepia}30` }}>
              {[{ label: "CAR AVG", val: ".284" },{ label: "CAR OBP", val: ".393" },{ label: "CAR WAR", val: "48.0" },{ label: "CAR SB", val: "121" },{ label: "WS TITLES", val: "4" },{ label: "PENNANTS", val: "6" },{ label: "'13 WS", val: ".357" },{ label: "'18 WS", val: ".444" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C_COLORS.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C_COLORS.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C_COLORS.steel, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>CAUGHT: BENDER • PLANK • PENNOCK • HOYT • GROVE • RUTH</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 4× WS Champion", "❌ Not in HOF", "🔄 Switch-Hitter", "🎯 6 Throwouts in 1 Game", "📊 .393 OBP (2nd C Ever)", "🧲 Championship Magnet", "💪 48.0 WAR (Best C Not in HOF)", "⚾ Caught 6 HOF Pitchers"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C_COLORS.steel}15`, border: `1px solid ${C_COLORS.steel}40`, padding: "2px 8px", borderRadius: 10, color: C_COLORS.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C_COLORS.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C_COLORS.steel, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C_COLORS.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C_COLORS.darkBrown : "transparent", color: tab === t.id ? C_COLORS.gold : C_COLORS.medBrown, border: `1px solid ${tab === t.id ? C_COLORS.gold : C_COLORS.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C_COLORS.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C_COLORS.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C_COLORS.traitGreen }}>{t.tag}:</span> <span style={{ color: C_COLORS.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C_COLORS.traitGreen}20`, color: C_COLORS.traitGreen, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C_COLORS.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C_COLORS.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C_COLORS.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C_COLORS.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C_COLORS.darkBrown}08`, border: `1px solid ${C_COLORS.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C_COLORS.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C_COLORS.warmRed}20` : `${C_COLORS.coldBlue}20`, color: a.type === "Drama" ? C_COLORS.warmRed : C_COLORS.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C_COLORS.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C_COLORS.ink }}>{key}:</span> <span style={{ color: C_COLORS.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C_COLORS.ink }}>{key}:</span> <span style={{ color: C_COLORS.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C_COLORS.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C_COLORS.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
