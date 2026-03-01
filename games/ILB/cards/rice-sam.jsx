// /cards/players/sam-rice.jsx
import { useState } from "react";

const RICE_DATA = {
  name: "Sam Rice",
  nickname: "Man o' War",
  year: 1925,
  team: "Washington Senators",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "RF",
  bats: "L",
  throws: "R",
  height: '5\'9"',
  weight: "150 lbs",
  born: "February 20, 1890 — Morocco, Indiana (born Edgar Charles Rice)",
  died: "October 13, 1974 — Rossmoor, Maryland (age 84)",
  hof: "Inducted 1963 (Veterans Committee). .322 career BA. 2,987 hits — 13 short of 3,000. 351 SB. Led AL in hits twice. 14 seasons batting .300+. 3 pennants, 1 WS title (1924). Sports Illustrated: 'His plaque may be the most inadequate in Cooperstown.'",

  real_stats: {
    season: 1925,
    batting_avg: ".350",
    obp: ".383",
    slg: ".467",
    ops: ".850",
    hits: 227,
    runs: 111,
    doubles: 31,
    triples: 13,
    home_runs: 1,
    rbi: 76,
    walks: 44,
    strikeouts: 17,
    stolen_bases: 26,
    war: 5.9,
    season_1920: ".338 BA / 63 SB (led AL) / 454 PO (AL OF record) / 'Man o' War'",
    career_batting_avg: ".322",
    career_hits: 2987,
    career_2b: 498,
    career_3b: 184,
    career_hr: 34,
    career_sb: 351,
    career_rbi: 1078,
    career_war: 52.2,
    ws_avg: ".302 (19-for-63)",
    hitting_streak: "31 games (1924)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1925 SEASON (PEAK)
  //
  // CON: .350 BA, 227 H. Career .322 BA, 2,987 H (13 short of 3,000!).
  //      Led AL in hits twice. 14 seasons .300+. 182 singles in 1925 (AL record until 1980).
  //      31-game hitting streak (1924). "Never swung at the first pitch and seldom fanned."
  //      616 AB, 9 K in one season. The ultimate contact hitter.
  //      CON = 5 (MAXIMUM — one of the purest contact hitters in history).
  //
  // POW: 1 HR in 1925. 34 career HR (21 inside-the-park). Never hit HR over fence at home.
  //      .467 SLG. 498 career 2B, 184 3B — gap power through speed, not strength.
  //      He weighed 150 lbs. There was no power.
  //      POW = 1 (minimal — gap extra-bases came from speed, not bat power).
  //
  // SPD: 63 SB in 1920 (led AL — "Man o' War"). 351 career SB. Top 5 in SB for 8 straight years.
  //      21 of 34 career HR were inside-the-park. 184 career 3B. "Blazing speed."
  //      454 putouts in 1920 (AL OF record — covering enormous ground).
  //      SPD = 4 (NEAR-MAXIMUM — one of the fastest players of the 1920s).
  //
  // DEF: Led AL OF in putouts twice, assists once. 454 putouts (1920, AL record).
  //      Made THE catch — 1925 WS, over the fence, ball in glove.
  //      Strong arm, quick feet. Elite defensive outfielder.
  //      DEF = 2 (EXCELLENT — elite range, strong arm, the catch of a lifetime).
  //
  // CLU: 3 pennants, 1 WS title (1924). .302 career WS BA (19-for-63).
  //      Led AL in hits (216) during 1924 pennant race. 31-game hitting streak in Sept 1924.
  //      The 1925 WS catch over the fence. Clutch pinch-hit in 1933 WS at age 43.
  //      CLU = 2 (HIGH — delivered in October across two decades).
  //
  // OVR: CON×2(10) + POW×2(2) + SPD×0.5(2) + DEF×0.5(1) + CLU×1.5(3) = 18 → normalized ~8
  // OVR = 8 (ALL-STAR) — the speed/contact archetype at its purest.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 5,    // MAXIMUM. .350 BA (1925), .322 career. 2,987 hits. 14 seasons .300+. 616 AB, 9 K in one season. 182 singles (AL record). "He never swung at the first pitch and seldom fanned." The purest contact profile in the Bashers.
    pow: 1,    // Minimal. 1 HR in 1925. 34 career (21 inside-the-park). Never hit HR over the fence at Griffith Stadium. 150 lbs. His extra-base hits came from speed turning singles into doubles and triples, not from bat power.
    spd: 4,    // NEAR-MAXIMUM. 63 SB in 1920 (led AL). 351 career SB. Top 5 in SB 8 straight years. "Man o' War." 21 inside-the-park HR. 184 career 3B. 454 putouts (AL OF record — covering enormous ground). Blazing speed was his defining tool.
    def: 2,    // EXCELLENT. Led AL OF in putouts twice. 454 putouts (1920 AL record). The 1925 WS catch — over the fence, into the stands, emerged with ball. Quick feet, strong arm. Elite defensive outfielder.
    clu: 2,    // HIGH. 3 pennants, 1 WS title. .302 career WS BA. 31-game hitting streak during 1924 pennant race. The 1925 WS catch. Pinch-hit single in 1933 WS at age 43. Delivered across two decades of October.
  },

  stat_justification: {
    con: "Sam Rice hit .350 with 227 hits in 1925, including an AL-record 182 singles (not broken until Willie Wilson in 1980). He completed a 616 at-bat season with only 9 strikeouts. He hit .322 for his career with 2,987 hits — 13 short of 3,000, a number he didn't know he was chasing because nobody tracked it in his era. He hit .300 or better in 14 seasons. He led the AL in hits twice. He never swung at the first pitch. He had a 31-game hitting streak during the 1924 pennant race. His contact rate was staggering by any era's standards — sub-3% K rate in his best seasons. 'He stood erect at the plate and used quick wrists to slash pitches to all fields.' Rating of 5.",
    pow: "Rice hit 1 home run in 1925. He hit 34 in his entire 20-year career — and 21 of those were inside-the-park, meaning they came from his speed, not his bat power. He never hit a home run over the fence at Griffith Stadium, his home park for 19 seasons. He weighed 150 pounds. His .467 SLG in 1925 came from 31 doubles, 13 triples, and relentless singles — not from extra-base authority. His career 498 2B and 184 3B came from speed finding gaps, not from driving the ball. Rating of 1.",
    spd: "In 1920, Rice stole 63 bases to lead the American League, earning the nickname 'Man o' War' after the famous racehorse. He stole 351 bases in his career and finished in the top 5 in stolen bases for eight consecutive seasons. His 454 putouts in 1920 set an AL outfield record — a reflection of his extraordinary range. 21 of his 34 career home runs were inside-the-park. He had 184 career triples — a number that reflects pure speed. He played until age 44 and was still productive, hitting .293 in his final season. Rating of 4.",
    def: "Rice led AL outfielders in putouts twice and in assists once. His 454 putouts in 1920 were an AL record — a testament to his range and his ability to run down fly balls. His most famous defensive moment is THE catch: 1925 World Series, Game 3, Rice raced to catch Earl Smith's drive at the fence, leaped, caught the ball, and tumbled over the four-foot fence into the stands, disappearing from view. He emerged with the ball. The umpire called Smith out. Pirates manager McKechnie argued. Rice wrote a sealed letter opened after his death: 'At no time did I lose possession of the ball.' Rating of 2.",
    clu: "Rice played in three World Series (1924, 1925, 1933) and won the 1924 championship. His career WS batting average was .302 (19-for-63). He led the AL with 216 hits during the 1924 pennant race, including a 31-game hitting streak in September. In the 1925 WS, he made the catch over the fence — one of the most famous defensive plays in WS history. In the 1933 WS, at age 43, he pinch-hit and collected a single. He delivered across two decades of October baseball. Rating of 2.",
  },

  personality: {
    leadership_style: "SILENT ENDURANCE. Rice did not lead through words or charisma. He led through presence — by showing up every day, by hitting .300 every year, by running down every fly ball, by never speaking of the worst thing that ever happened to him. His teammates described him as quiet, humble, consistent. Bucky Harris wrote him a letter before the 1925 WS: 'The players seem to have more courage and pep when you're around.' That is the leadership of a man who carries something so heavy that his mere ability to function inspires others.",
    temperament: "SEALED. This is the defining word. Rice sealed away his past — his name (Edgar became Sam), his family (his second wife didn't know about the tornado for decades), his catch (the letter was opened after his death). He was not cold. He was not distant. He was SEALED — a man who had decided that certain things would never be spoken, and who kept that decision for sixty years. He was warm to those around him. He was generous (he employed Japanese-American workers displaced during WWII on his poultry farm). But the seal was absolute.",
    work_ethic: "TRANSFORMATION. Rice began as a pitcher. He became a Hall of Fame outfielder. He began as Edgar. He became Sam. He began as a man with a family. He became a man with none. He began as a minor leaguer who couldn't make a roster. He became a man with 2,987 hits. Every stage of his career was a reinvention — a man rebuilding himself from nothing, over and over, until the accumulated weight of all those rebuildings became a career that 'may be the most inadequate plaque in Cooperstown.'",
    lifestyle: "From Morocco, Indiana, to the world and back to earth. After the tornado, Rice wandered — Kentucky, Minnesota, the Dakotas, the Navy, Mexico (Veracruz), Virginia, and finally Washington, D.C. After baseball, he became a poultry farmer in Maryland. He and his neighbor Harold Ickes (the Secretary of the Interior) employed Japanese-American workers displaced from the West Coast during WWII. He lived quietly. He kept secrets. He died at 84.",
    era_adaptability: "HIGH. Rice's profile — elite contact, elite speed, no power, elite defense — would translate directly to modern baseball as a leadoff hitter / defensive specialist. His K rate (sub-3% in peak seasons) would be historically anomalous in any era. His 63-SB season projects to modern baserunning value. His defensive range would play anywhere. The only limitation is the zero power — but in an era of launch angle obsession, Rice's ability to put the ball in play and run would be revolutionary.",
    clubhouse_impact: "THE QUIET CENTER. Rice was not loud, not flashy. His HOF reaction: 'Oh it's fine, but I can't say I'm too thrilled about it. If it were a real Hall of Fame, you'd say Cobb, Speaker, Walter Johnson, Babe Ruth, Lou Gehrig and a few others belonged and then you'd let your voice soften to a mere whisper.' This is a man who understood scale — who had lost everything and therefore understood that baseball achievements, however impressive, existed in a whisper. In ILB, Rice provides +1 to team composure. Nothing rattles a team that has Sam Rice in the outfield. Nothing can be worse than what he's already survived.",
    dark_side: "THE TORNADO. April 21, 1912. Edgar Charles Rice is away trying out for a minor league team. An F4 tornado hits his family's farm in Morocco, Indiana. His wife Beulah. His son Bernie, three years old. His daughter Ethel, eighteen months. His mother. Two of his sisters. A farmhand. All dead. His father dies days later from injuries. Rice returns for two funerals. Then he leaves Morocco forever. He never speaks of it. He changes his name. He rebuilds. He accumulates 2,987 hits — each one a step further from the tornado, each one proof that he is still alive, still here, still playing. His second wife doesn't learn about it until the 1950s. His daughter doesn't learn until 1965. The seal held for more than fifty years. In ILB: 'The Sealed Past' — Rice cannot be psychologically damaged by any in-game event. Nothing the game throws at him can match what he has already endured. He is immune to demoralization. The cost: he cannot bond deeply with teammates. The seal protects him. The seal isolates him.",
  },

  chemistry_traits: [
    { tag: "The Sealed Letter", desc: "In 1925, Rice made a catch over the WS fence and disappeared into the stands. Did he hold the ball? He wrote a letter, sealed it, instructed it be opened after his death. 'At no time did I lose possession of the ball.' In ILB, once per WS, Rice may attempt an impossible catch: d20, on 15+ = out. The result is SEALED until the play is reviewed." },
    { tag: "Man o' War", desc: "63 SB in 1920 — led AL. Named after the racehorse. In ILB, Rice has +3 to SB attempts and +2 to defensive range. His speed is his identity." },
    { tag: "The Tornado", desc: "April 21, 1912: Rice's entire family — wife, two children, mother, two sisters, father (days later) — killed by an F4 tornado while he was away at a baseball tryout. In ILB, Rice is immune to demoralization and psychological damage. Nothing can break what is already broken. But he cannot form deep bonds (+0 teammate chemistry). The seal protects and isolates." },
    { tag: "Edgar Becomes Sam", desc: "His real name was Edgar Charles Rice. Team owner changed it to Sam. Clark Griffith forgot his name and told reporters 'Samuel Rice.' He accepted the new name — possibly to bury the past. In ILB, Rice has +1 to evasion — opponents' scouting reports may target the wrong player profile." },
    { tag: "Two Thousand Nine Hundred Eighty-Seven", desc: "2,987 career hits — 13 short of 3,000. 'Nowadays, with radio and television announcers spouting records every time a player comes to bat, I would have known about my hits and probably would have stayed to make 3,000.' In ILB, Rice's hit counter is always visible. When it reaches 2,987, the season MUST end. He never reaches 3,000. The number is the trait." },
    { tag: "The Pitcher Who Became", desc: "Rice began as a pitcher — 9 appearances, 39.1 IP. He converted to outfield and became a Hall of Famer. In ILB, Rice can pitch in emergency (STF 1/CTL 2/STA 1) — not well, but he can take the mound." },
    { tag: "Walter Johnson's Outfielder", desc: "Rice played alongside Walter Johnson for the Senators. When paired with elite pitching, +1 to team defense — Rice runs down everything so the pitcher doesn't have to." },
    { tag: "Thirteen Short", desc: "13 hits short of 3,000. He didn't know he was close. They didn't track it then. In ILB, Rice receives +1 to all stats in his final season — chasing something he doesn't know he's chasing." },
  ],

  preferred_locations: [
    { location: "Griffith Stadium, Washington", affinity: "MAXIMUM", note: "19 seasons (1915-1933). The only home he chose. Enormous outfield — Rice never hit a HR over the fence here. He didn't need to. He covered every inch of it on defense." },
    { location: "The Outfield Gaps", affinity: "MAXIMUM", note: "2,987 hits. 498 2B. 184 3B. The gaps were his territory — he hit line drives into them and ran until someone stopped him." },
    { location: "The Right Field Fence (1925 WS)", affinity: "SACRED", note: "Where he went over. Where he disappeared. Where the letter was born. 'At no time did I lose possession of the ball.'" },
    { location: "Morocco, Indiana", affinity: "ORIGIN / WOUND", note: "Born here. Lost everything here. Left forever. The tornado took the family and the name. Edgar became Sam. Morocco became silence." },
    { location: "The Farm (Olney, Maryland)", affinity: "HOME (Post-Career)", note: "Poultry farmer. Quiet life. Employed Japanese-American displaced workers during WWII. Kept the seal. Kept the secret. Died at 84." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant race — 31-game hitting streak during 1924 September push. Rice elevated when it mattered most.",
      "Running — when Rice was stealing bases and taking extra bases, his entire game accelerated.",
      "Routine — Rice thrived in the steady rhythm of a full season. 155 games, 227 hits, .350. Repetition was his engine.",
      "Defense — when Rice was making catches and covering ground, his confidence at the plate rose too.",
    ],
    cold_triggers: [
      "Power situations — Rice could not hit the ball over the fence. In moments requiring a home run, he was helpless.",
      "Bench time — late career diminished playing time hurt his rhythm and production.",
      "The past surfacing — the rare moments when the seal cracked (the restaurant encounter, the 1965 interview) were disorienting.",
      "Aging legs — after 40, the speed that defined him slowly eroded, though he adapted remarkably.",
    ],
    pressure_response: "TRANSCENDENT — BUT QUIET. Rice in the World Series: .302 BA, 19 hits, the catch over the fence, a pinch-hit single at age 43. He didn't collapse under pressure. He didn't elevate dramatically. He did exactly what he always did — he made contact, he ran, he caught everything. The pressure didn't change him because nothing could change him. The tornado had already happened. Everything after was aftermath. CLU = 2.",
  },

  action_card_seeds: [
    {
      title: "The Tornado",
      type: "Origin / Tragedy",
      text: "April 21, 1912. Your outfielder is in Galesburg, Illinois, trying out for a minor league team. He is twenty-two years old. He has a wife named Beulah. A son, Bernie, three. A daughter, Ethel, eighteen months. They are visiting his parents' farm in Morocco, Indiana. At 6:30 PM, an F4 tornado hits the farm. His wife. His children. His mother. Two sisters. A farmhand. His father dies days later. Everyone is gone. Your outfielder returns for two funerals. Then he leaves Morocco, Indiana, and he never comes back. He never speaks of it. He changes his name. He plays baseball for twenty years and accumulates 2,987 hits, and each hit is one more proof that he is still alive.",
      origin: "The tornado of April 21, 1912, in Morocco, Indiana. Rice lost his entire family. He never spoke of it publicly for over fifty years.",
    },
    {
      title: "The Sealed Letter",
      type: "Mystery / Legacy",
      text: "1925 World Series, Game 3. Your outfielder races to catch a drive at the right field fence. He leaps. He catches the ball. He goes over the fence. He disappears into the crowd. When he emerges, the ball is in his glove. The umpire calls the batter out. The Pirates argue. The world argues. Your outfielder says nothing. He writes a letter. He seals it. He instructs the Hall of Fame to open it after his death. Forty-nine years later, the letter is opened: 'At no time did I lose possession of the ball.' He kept the secret for half a century. He kept every secret for half a century.",
      origin: "The 1925 WS catch over the fence. The sealed letter, opened after Rice's death in 1974.",
    },
    {
      title: "Two Thousand Nine Hundred Eighty-Seven",
      type: "Legacy",
      text: "Your outfielder finishes his career with 2,987 hits. He is thirteen short of 3,000. He does not know this. Nobody tracks the number. Nobody tells him. 'Nowadays, with radio and television announcers spouting records every time a player comes to bat, I would have known about my hits and probably would have stayed to make 3,000 of them.' He retires thirteen hits away from immortality. He retires not knowing he was close. The number haunts every statistician who ever looked at his record. Thirteen hits. One week. He would have stayed.",
      origin: "Rice finished with 2,987 hits — 13 short of 3,000. He didn't know how close he was.",
    },
    {
      title: "Man o' War",
      type: "Season Arc",
      text: "1920. Your outfielder steals sixty-three bases. It leads the American League. They name him after the racehorse — Man o' War — because nothing alive can catch him. He also records 454 putouts in the outfield, an American League record, because nothing hit into the air can escape him either. He is five feet nine inches tall and weighs one hundred and fifty pounds. He is made entirely of speed and contact and silence.",
      origin: "1920: Rice led AL with 63 SB, earned 'Man o' War' nickname, set AL OF putout record (454).",
    },
    {
      title: "Edgar Becomes Sam",
      type: "Identity",
      text: "His name is Edgar Charles Rice. A minor league team owner calls him Sam. Clark Griffith, owner of the Washington Senators, cannot remember his first name and tells reporters he has acquired 'Samuel Rice.' Edgar does not correct anyone. He accepts the name. He becomes Sam. Perhaps he wanted to. Perhaps Edgar Rice died in Morocco, Indiana, on April 21, 1912, alongside everyone he loved, and the man who walked out of the wreckage needed a different name.",
      origin: "Rice's name change from Edgar to Sam — initiated by minor league owner, cemented by Griffith's forgetfulness.",
    },
    {
      title: "The Thirty-One Game Streak",
      type: "Game Action",
      text: "September 1924. The Washington Senators are in a pennant race. Your outfielder gets a hit in thirty-one consecutive games. He leads the American League with 216 hits. Washington wins its first pennant. Then its first World Series. Your outfielder has been waiting twelve years for something good to happen. He is thirty-four years old. He has been playing since he was twenty-five because the first twenty-two years of his life ended in a tornado.",
      origin: "Rice's 31-game hitting streak during the 1924 pennant race. Led AL with 216 hits. Senators won first WS.",
    },
    {
      title: "The Pitcher's Toe Plate",
      type: "Transformation",
      text: "Your outfielder used to be a pitcher. He pitched 39 innings for the Senators. One day he surrenders a double to light-hitting Hooks Dauss of Detroit. The toe plate tears from his pitcher's cleat. He announces he is done with pitching. His teammate Eddie Foster has been urging him to become an outfielder. He takes Foster's advice. He plays eighteen more years. He accumulates 2,987 hits. He is inducted into the Hall of Fame. The toe plate was the hinge. Everything that followed was because of a broken shoe.",
      origin: "Rice pitched for the Senators before surrendering a double that tore his cleat's toe plate. Teammate Eddie Foster urged him to switch to outfield. He did.",
    },
    {
      title: "The Whisper",
      type: "Character / Legacy",
      text: "When Rice is inducted into the Hall of Fame in 1963, he is not overjoyed. 'Oh it's fine, but I can't say I'm too thrilled about it. If it were a real Hall of Fame, you'd say Cobb, Speaker, Walter Johnson, Babe Ruth, Lou Gehrig and a few others belonged and then you'd let your voice soften to a mere whisper.' Sports Illustrated later writes that his plaque 'may be the most inadequate in Cooperstown.' They are right. The plaque lists his statistics. It does not list the tornado. It does not list the seven dead. It does not list the name Edgar. It does not list the sealed letter. Some plaques cannot hold what a man has carried.",
      origin: "Rice's HOF reaction and the Sports Illustrated quote about the inadequacy of his plaque. The plaque omits the tragedy entirely.",
    },
  ],

  art_direction: {
    face: "5'9\" 150 lbs — small, wiry, FAST. A face that reveals nothing. Not stern, not sad — SEALED. Pleasant features, calm eyes, the faintest hint of something unreachable behind them. He looks like a man who has decided what you will and will not know about him. He looks like a man who can outrun anything.",
    attire: "Washington Senators 1925 home whites — the old curly 'W' on the chest. In mid-stride, running down a fly ball at full speed, glove extended, about to make the catch. Or: in the batter's box, coiled to slash a line drive to left field, the swing compact and quick. The uniform should be slightly dust-stained — Rice played hard, ran hard, covered ground.",
    mood: "SEALED SILENCE. This card should feel like a letter that hasn't been opened yet. There is something inside — something enormous, something devastating — but the envelope is intact. The mood is the moment before the seal breaks. The mood is a man who hit .350 and said nothing about the worst day of his life for fifty years. The mood is a catch over a fence where nobody can see what happened. The card should feel like a secret.",
    style: "Full color — Bashers era — but QUIET. Washington Senators navy and red, but muted, almost gray. The dominant tone is DUSK — the blue-gray of early evening, the color of the sky before the storm, the color of silence. Not dark like Coveleski (coal). Not warm like Heilmann (radio). Not brown like Burns (leather). GRAY-BLUE. The color of a sealed envelope. The color of something withheld. The border should be pale blue-gray — the color of distance, of a man watching from far away, of 2,987 hits that almost reached 3,000 but didn't because nobody was counting.",
    reference: "Ruth is the solar system. Gehrig is the axis. Coveleski is the mineshaft. Heilmann is the radio. Burns is the thread. Rice is THE SEALED ENVELOPE — something precious inside, something devastating, held closed by a man who decided the world would never know. The card should feel like holding a letter you cannot open. 2,987. The number is the silence.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", senNavy: "#14225a", senRed: "#ab1a2d", dusk: "#6b7d8e" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.dusk}10`, border: `1px solid ${C.dusk}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.senNavy, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.senNavy, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.dusk}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function SamRiceCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = RICE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a1d28 0%, #0e1018 50%, #1a1d28 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.dusk, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.dusk}`, boxShadow: `0 0 0 2px ${C.senNavy}, 0 0 20px ${C.dusk}20, 0 10px 36px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.senNavy}, #1a2040, ${C.senNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.dusk}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.dusk}15, ${C.senNavy}08, ${C.senRed}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>✉️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE SEALED ENVELOPE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.senNavy, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.senRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.senNavy}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.dusk, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>born Edgar Charles Rice</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.senNavy} />
              <StatBar label="POW" value={s.pow} max={5} color={C.dusk} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.coldBlue} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.senNavy}, #1a2040)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "H", val: d.real_stats.hits },{ label: "R", val: d.real_stats.runs },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "K", val: d.real_stats.strikeouts },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1925 — .350 BA — 227 H — 182 SINGLES (AL RECORD) — 17 K IN 616 AB</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.dusk}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.dusk}20` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_batting_avg },{ label: "CAR H", val: "2,987" },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR 3B", val: d.real_stats.career_3b },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "WS AVG", val: ".302" },{ label: "HOF", val: "1963" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.senNavy, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1963", "⚾ 2,987 Hits (13 short of 3,000)", "🏇 63 SB 'Man o' War'", "✉️ The Sealed Letter", "🌪️ The Tornado", "🏆 1924 WS Champion", "🔄 Pitcher → HOF Outfielder", "🤫 50 Years of Silence"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.dusk}10`, border: `1px solid ${C.dusk}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.dusk, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.dusk}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.senNavy : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.senNavy : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.senNavy }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "SACRED" ? `${C.warmRed}20` : l.affinity === "ORIGIN / WOUND" ? `${C.senRed}20` : `${C.coldBlue}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "SACRED" ? C.warmRed : l.affinity === "ORIGIN / WOUND" ? C.senRed : C.coldBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.senNavy }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Rice's life — the sealed envelope of American baseball.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.dusk}05`, border: `1px solid ${C.dusk}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Tragedy") ? `${C.senRed}20` : a.type.includes("Legacy") ? `${C.sepia}20` : a.type.includes("Mystery") ? `${C.dusk}20` : `${C.gold}20`, color: a.type.includes("Tragedy") ? C.senRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.senNavy}, #1a2040, ${C.senNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
