import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}plank-eddie.png`;

const PLAYER_DATA = {
  name: "Eddie Plank",
  nickname: "Gettysburg Eddie",
  year: 1912,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "SP",
  bats: "L",
  throws: "L",
  height: '5\'11"',
  weight: "175 lbs",
  born: "August 31, 1875 — Gettysburg, PA",
  died: "February 24, 1926 — Gettysburg, PA (age 50)",
  hof: "Inducted 1946 (Veterans Committee, posthumous). First LHP to win 200 and 300 games. 3rd all-time LHP wins. 1st all-time LHP shutouts and CG. Eddie Collins: 'Not the fastest. Not the trickiest. Not the possessor of the most stuff. But just the greatest.'",

  real_stats: {
    season: 1912, games: 41, wins: 26, losses: 6, era: "2.22",
    innings: "259.1", strikeouts: 110, walks: 62, complete_games: 21,
    shutouts: 4, whip: "~1.08", ops_plus_against: "N/A", war: "~7.5",
    career_wins: 326, career_losses: 194, career_era: "2.35",
    career_strikeouts: 2246, career_cg: 410, career_shutouts: 69,
    career_war: "~63.0", no_hitters: 0, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF): ERA tiers + K/9 bonus
  // CONTROL (CTL): BB/9 tiers + WHIP bonus
  // STAMINA (STA): IP tiers
  // DEFENSE (DEF): Same as position players
  // CLUTCH (CLU): Postseason ERA + signature moments
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 11,     // Legend — 326 wins, 69 shutouts (1st LHP all-time), 410 CG (1st LHP all-time), 2.35 career ERA, 8× 20-win seasons, 3× WS champion, 1.32 WS ERA, HOF 1946. The eternal second banana who was, by accumulation, one of the greatest pitchers who ever lived.
    stf: 3,      // 2.22 ERA in 1912 → tier 3 (2.00-2.49). K/9 ~4.2 in 1912 — well below the ≥6.0 bonus threshold. Plank was not a power pitcher. Collins: "Not the fastest, not the trickiest, not the possessor of the most stuff." He was a craftsman — crossfire delivery, deception, command. The stuff was not dominant; the results were. Stuff 3.
    ctl: 3,      // BB/9 ~1.7-2.0 in peak years → tier 3 (1.5-1.99). WHIP ~1.08 in 1912 — misses the ≤1.00 bonus by a hair. "Master of the crossfire delivery." "Pinpoint control." "Study of the game and his smartness." Plank was a control artist who struck out twice as many as he walked. Not quite Young/Johnson elite control, but consistently excellent. Control 3.
    sta: 4,      // 346⅔ IP in 1905, 259 IP in 1912 peak — best single season tops 300 → tier 4 (300-349). 410 career CG — 1st all-time among LHP. 4,495+ career IP. 17 seasons. 8× 20-win seasons. Plank was an iron man. Stamina 4.
    def: 1,      // Decent fielding pitcher. Crossfire delivery across his body complicated fielding position. No notable defensive reputation from the mound. Defense 1.
    clu: 3,      // MAXIMUM. WS ERA of 1.32 in 54⅔ innings — elite. CG in ALL 6 World Series starts. 3× WS champion (1910, 1911, 1913). Won 1913 WS Game 5 vs. Mathewson to clinch the Series — the clincher bonus. BUT: 2-5 WS W-L record due to criminal run support (losses by 3-0, 1-0, 4-3, 3-0, 1-0). PS ERA < 2.00 → tier 2. WS clincher bonus → +1 = 3. Maximum clutch.
  },

  stat_justification: {
    stf: "2.22 ERA in 1912 → tier 3 (2.00-2.49). His best ERA seasons: 2.10 (1911), 2.17 (1904), 2.22 (1912) — consistently in the 2.00-2.25 range but never breaking below 2.00 for the tier 4 threshold. K/9 approximately 4.2-4.5 throughout career — well below the ≥6.0 bonus. Plank was NOT a power pitcher. Eddie Collins: 'Not the fastest. Not the trickiest. Not the possessor of the most stuff. But just the greatest.' His weapon was the crossfire delivery — a 3/4 angle thrown across his body — combined with deception and command. Opponents couldn't time him. He was the dead-ball Greg Maddux: elite results through craft, not stuff. Rating of 3.",
    ctl: "BB/9 estimated ~1.7-2.0 in peak seasons → tier 3 (1.5-1.99). WHIP ~1.08 in 1912 — tantalizingly close to the ≤1.00 bonus but not quite there. Connie Mack: 'Master of the crossfire delivery and that was one of his big assets.' 'Pinpoint control.' Struck out roughly twice as many batters as he walked throughout his career. Sub-3.00 ERA in 13 of 17 seasons requires sustained command. But not at the Johnson (0.99 BB/9) or Young (0.90 BB/9) level. Rating of 3.",
    sta: "346⅔ IP in 1905 → tier 4 (300-349). 259 IP in 1912 (peak year used for card). Career: 4,495+ IP, 410 CG (1st all-time LHP), 69 shutouts (1st all-time LHP). 8× 20-win seasons across 17 years. Plank was an iron arm — not quite at the 350+ tier 5 level in any single season but extraordinarily durable across his career. He began his MLB career at 25 (straight from Gettysburg College, no minor leagues) and pitched until 42. Rating of 4.",
    def: "No notable defensive reputation from the mound. The crossfire delivery — throwing across his body at a 3/4 angle — may have complicated his fielding position after delivery. Standard pitcher defense. Rating of 1.",
    clu: "World Series ERA of 1.32 in 54⅔ innings — among the lowest all-time for pitchers with significant WS innings. Complete games in ALL 6 World Series starts. 3× WS champion (1910, 1911, 1913 — sat out 1910 WS injured). Won 1913 WS Game 5 to clinch the championship vs. Christy Mathewson, 3-1 — the decisive clincher. BUT: 2-5 career WS record due to historically bad run support. Losses: 3-0, 1-0, 4-3 (in relief), 3-0, 1-0. Plank pitched brilliantly and lost because his team scored nothing. Mack matched him against Mathewson — Hall of Famer vs. Hall of Famer — in every Giants series. PS ERA < 2.00 → tier 2. WS clincher bonus (1913 G5) → +1 = 3. Maximum clutch — the ERA proves it, the W-L record lies.",
  },

  personality: {
    leadership_style: "THE QUIET MENTOR. Plank was taciturn, reserved, and 'friendly by nature' — a rare combination. He took time to mentor rookie pitchers on the Athletics' staff, an unusual act in an era when veterans guarded their positions jealously. He befriended Louis Van Zelst, the team's hunchbacked mascot, when others wouldn't. His leadership was through example and kindness, not volume. Jack Coombs: 'I have always been thankful that I was thrown into such intimate contact with so inspiring a man.'",
    temperament: "STOIC AND DELIBERATE. Plank was notorious for being slow between pitches — 'elaborate rituals adjusting parts of his uniform, rubbing the ball, asking his catcher to repeat signs.' This drove opponents, umpires, and spectators crazy. It was not nervousness; it was method. The deliberateness was the weapon. 'Taciturn' was the word used most often. He studied the game, he studied hitters, he studied himself. The crossfire was an engineer's pitch thrown by a college man in a workingman's sport.",
    work_ethic: "PERPETUAL EXCELLENCE. Not a single dominant peak but 17 years of consistency. 8× 20-win seasons. Sub-3.00 ERA in 13 seasons. ERA never above 2.87 after age 27. He was never the best pitcher in the AL in any single year — Johnson, Coombs, Walsh, Wood always had one better season — but he was always in the top 4-5, and he was there EVERY year. The most consistent pitcher in AL history during the dead-ball era.",
    lifestyle: "GETTYSBURG. Born near Gettysburg, PA. Attended Gettysburg College. Never played in the minors — went straight from college to Connie Mack's Athletics at 25. After baseball: opened a Buick dealership in Gettysburg. Led tours of the Gettysburg battlefield. Married Anna Myers in 1915. One son (Eddie Jr.). Freemason. Farmer. A Gettysburg man from birth to death. Died of a stroke at 50 — too young, like Johnson, like too many of them. Buried in Evergreen Cemetery, Gettysburg, in the shadow of the battlefield.",
    era_adaptability: "EXCELLENT. Plank's skill set — deception, command, crossfire delivery, pitch sequencing, studying hitters — translates perfectly to modern baseball. He would be a left-handed crafty starter in the Maddux/Hendricks mold: low velocity, elite location, changes speeds, confuses timing. His deliberate pace between pitches would be controversial in the pitch-clock era but the results would silence critics. He'd eat innings, limit walks, and frustrate hitters who couldn't figure out why they kept popping up.",
    clubhouse_impact: "THE STEADYING PRESENCE. Plank was the reliable arm Connie Mack always knew he could count on. Not flashy like Waddell, not dominant like Bender, but always there, always effective, always professional. 'Connie Mack considered him his most reliable pitcher.' In ILB: +2 rotation stability. When Plank is on the staff, the pitching staff ERA drops and the manager sleeps better.",
    dark_side: "The eternal second banana. SABR: 'It was Eddie Plank's fate to be second banana.' He was never the best pitcher in the AL in any single season. Johnson always had the better year. Coombs, Walsh, Wood had their monster seasons. Plank just had 17 very good ones. His WS record (2-5) looks terrible despite a 1.32 ERA — the run support was criminal. He was matched against Mathewson by Mack, which meant he faced a HOFer while his teammates scored nothing. He died at 50 of a stroke — running his Buick shop and leading battlefield tours, gone before anyone fully appreciated him. The HOF election came 20 years after his death. He never knew.",
  },

  chemistry_traits: [
    { tag: "The Eternal Second Banana", desc: "Plank is never the ace on paper — someone always looks better on the stat sheet. But he wins more than all of them over time. -1 recognition. +1 to all pitching stats every 3rd consecutive season on roster." },
    { tag: "The Crossfire", desc: "Plank's 3/4 sidearm crossfire delivery baffles hitters. Left-handed batters face -1 CON. Right-handed batters who haven't faced him before also face -1 CON first time up." },
    { tag: "The Deliberate Pace", desc: "Plank is agonizingly slow between pitches. Opponents lose patience: -1 plate discipline after the 5th inning. But: umpires may squeeze the zone (-1 ball/strike luck)." },
    { tag: "Matched Against Greatness", desc: "Mack always sent Plank against the other team's ace. When facing an opponent's best pitcher, Plank gains +1 STF. The tougher the matchup, the better he pitches." },
    { tag: "The Mentor", desc: "Plank mentors rookie pitchers. Any young pitcher on the staff gains +1 CTL in their first 2 seasons when Plank is on the roster. He teaches what he knows." },
    { tag: "Gettysburg", desc: "Born, raised, and died in Gettysburg. +1 morale when playing in Pennsylvania. Plank leads battlefield tours in the offseason — +1 historical knowledge, +1 community." },
    { tag: "Three Hundred Twenty-Six", desc: "326 career wins — 1st LHP all-time until Spahn (1963). +2 franchise legacy. The number speaks louder than the man ever did." },
    { tag: "1.32 in October", desc: "WS ERA of 1.32 with a 2-5 record. Plank pitches brilliantly and his team doesn't score. +2 STF in WS. But: -2 run support luck. The greatest losing pitcher in WS history." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "410 career CG (1st LHP all-time). 69 shutouts (1st LHP all-time). The mound was his office for 17 years." },
    { location: "Shibe Park / Philadelphia", affinity: "HIGH", note: "1901-14. The Athletics' ace for 14 years. Five pennants. Three championships. Connie Mack's most reliable arm." },
    { location: "Gettysburg, PA", affinity: "HIGH", note: "Born, educated, retired, buried. Gettysburg College. Buick dealership. Battlefield tours. Evergreen Cemetery." },
    { location: "The World Series", affinity: "COMPLEX", note: "1.32 ERA in 54⅔ WS innings. 2-5 record. CG in all 6 starts. Matched against Mathewson. Brilliant and unlucky." },
    { location: "The Bullpen", affinity: "LOW", note: "Plank was a starter. 410 career CG. He finished what he started. The bullpen was for other pitchers." },
  ],

  momentum: {
    hot_triggers: [
      "The crossfire working — when Plank's delivery is deceiving hitters, the at-bats get shorter and the outs pile up",
      "Big-game matchups — when matched against the other team's ace, Plank elevates; the Mathewson effect",
      "Consistency streaks — Plank doesn't have dominant stretches, he has reliable ones; 8× 20-win seasons of quiet excellence",
      "Mentoring — when Plank has a young pitcher to teach, his own focus sharpens; the teacher learns by teaching",
    ],
    cold_triggers: [
      "Run support drought — 2-5 WS despite 1.32 ERA; when the offense disappears, Plank pitches 1-0 gems and loses them",
      "Being overlooked — 'always a second banana'; when recognition goes to teammates, morale can dip slightly",
      "Sore arm — missed the 1910 WS with a sore arm; overwork triggers decline that takes time to recover from",
      "Late-career decline — effective until 40+ but velocity/deception slowly erode; the crossfire loses its bite",
    ],
    pressure_response: "MAGNIFICENT BUT UNLUCKY. Plank's 1.32 WS ERA in 54⅔ innings ranks among the best in history. He threw complete games in ALL SIX of his World Series starts. He won the 1913 WS clincher vs. Mathewson, 3-1. But his 2-5 WS record haunts him — the five losses came by scores of 3-0, 1-0, 4-3, 3-0, and 1-0. His teams scored a total of 4 runs in those 5 losses. In ILB: Plank in October is one of the best pitchers on the planet. But if your team can't score, Plank loses 1-0, and loses it beautifully.",
  },

  action_card_seeds: [
    { title: "One-Point-Three-Two", type: "Game Action", text: "Your pitcher has a 1.32 ERA in the World Series. He has thrown complete games in all six of his starts. He has allowed almost nothing. His record is 2-5. His team cannot score. He is the greatest losing pitcher in World Series history. +5 STF. -5 run support. The number is perfect; the record is tragedy.", origin: "Plank's career WS ERA was 1.32 in 54⅔ innings with a 2-5 W-L record. Losses: 3-0, 1-0, 4-3, 3-0, 1-0." },
    { title: "The Clincher Against Mathewson", type: "Game Action", text: "Game 5 of the World Series. Your lefty against their righty. Plank vs. Mathewson. Hall of Famer vs. Hall of Famer. Your pitcher wins, 3-1. The championship is yours. He finally beat the Giant. +3 CLU. +2 rivalry. +1 vindication. The second banana takes the last bite.", origin: "1913 WS Game 5: Plank beat Mathewson 3-1 to clinch the championship for the A's. His only decisive WS duel victory vs. Mathewson." },
    { title: "Three Hundred Twenty-Six", type: "Game Action", text: "Your lefty wins his 326th game. No left-handed pitcher in history has won more. The record will stand until Warren Spahn breaks it in 1963 — 37 years from now. +5 all-time legacy. +3 LHP supremacy. The number outlives the man by a century.", origin: "Plank retired with 326 wins — the most by any left-handed pitcher until Spahn surpassed him. He still ranks 3rd all-time among LHP." },
    { title: "Gettysburg Eddie", type: "Drama", text: "Your pitcher came straight from Gettysburg College to the major leagues. No minor leagues. No apprenticeship. Age 25 — considered elderly for a rookie. He wins 17 games his first year. He will win 326 before he's done. After retirement, he leads tours of the battlefield where his town became immortal. +2 education. +1 hometown pride. The pitcher and the battlefield: both defined by what they endured.", origin: "Plank went directly from Gettysburg College to the Philadelphia Athletics in 1901. After retirement, he led tours of the Gettysburg battlefield." },
    { title: "The Crossfire Delivery", type: "Game Action", text: "Your pitcher's arm comes from a 3/4 angle, thrown across his body. The ball appears from behind his torso. Left-handed batters can't pick it up. Right-handed batters think it's coming at them, then it bites across the plate. Strike one. -1 CON to all batters for 3 innings until they adjust. The crossfire is disorienting.", origin: "Plank was famous for his crossfire delivery — 3/4 angle thrown across his body. Connie Mack: 'Master of the crossfire delivery.'" },
    { title: "The Deliberate Pace", type: "Drama", text: "Your pitcher adjusts his cap. Rubs the ball. Adjusts his sleeve. Looks at his catcher. Asks for the sign again. Steps off. Adjusts his cap again. The crowd groans. The batter fidgets. The umpire shifts his weight. Strike called. Your pitcher's pace is agonizing, maddening, and effective. -1 opponent patience. -1 umpire goodwill. +1 STF from the disruption.", origin: "Plank was notorious for slow delivery — 'elaborate rituals adjusting his uniform, rubbing the ball, asking the catcher to repeat signs' — that maddened everyone." },
    { title: "Not the Fastest, Not the Trickiest", type: "Drama", text: "'Not the fastest. Not the trickiest. And not the possessor of the most stuff. But just the greatest.' Your teammate — a Hall of Fame second baseman — has described your pitcher in the most backhanded and most honest compliment in baseball history. +2 legacy. +2 respect. -1 highlight reel. He's the greatest by being none of the bests.", origin: "Eddie Collins on Plank, 1943: 'Not the fastest. Not the trickiest, and not the possessor of the most stuff, but just the greatest.'" },
    { title: "Fifty Years in Gettysburg", type: "Drama", text: "Your pitcher was born near Gettysburg. He went to school in Gettysburg. He won 326 games and then came back to Gettysburg. He opened a car dealership. He led battlefield tours. He married a local girl. He had a son named Eddie Jr. He died of a stroke at fifty, in Gettysburg. He was buried in Evergreen Cemetery. The Hall of Fame called twenty years later. +3 hometown legacy. +0 personal knowledge of honor.", origin: "Plank was born, raised, retired, and died in Gettysburg, PA. HOF induction 1946 — 20 years after his death. He never knew." },
  ],

  art_direction: {
    face: "TACITURN, DELIBERATE, INTELLIGENT. 5'11\" 175 lbs — 'short and light, as pitchers go.' The face should be THIN AND THOUGHTFUL — high forehead, sharp features, the face of a man who studied the game and studied hitters. Not imposing physically. Pennsylvania Dutch features — Gettysburg farmland, hardworking stock. The eyes should be CALCULATING — not cold, but analytical. The look of a man counting the signs, adjusting his sleeve, thinking three pitches ahead. A college man's face in a workingman's sport. The expression: patient, ready, completely unhurried. He has all the time in the world.",
    attire: "Philadelphia Athletics 1912 whites — wool flannel with the Old English 'A', white cap with blue bill. THE POSE: the crossfire delivery — arm at 3/4 angle, throwing ACROSS his body, the ball emerging from behind his torso. The left arm extended but at an angle that looks wrong until you realize it's perfectly designed. The delivery should look DECEPTIVE — not powerful, not explosive, but confusing. The body is committed in a direction that doesn't match where the ball goes. Or: the deliberate pause — standing on the mound, ball in hand, looking in at the catcher, NOT pitching yet. Adjusting. Waiting. Thinking. The most patient man in baseball.",
    mood: "PATIENT MASTERY. Plank's card should feel like a chess move — deliberate, intelligent, unhurried, inevitable. Not the explosive force of Johnson's lightning. Not the farm-bred power of Young's cyclone. The quiet certainty of a man who wins 326 games by never being the best and always being great.",
    style: "Sepia-toned with BATTLEFIELD GRAY and GETTYSBURG STONE undertones — the gray of Civil War monuments, the stone of Evergreen Cemetery, the Pennsylvania earth of Adams County. Where Johnson is navy/lightning (storm) and Young is deep Ohio brown (authority), Plank is BATTLEFIELD GRAY — somber, enduring, monumental. The palette of a place where something important happened and where the memory outlasts the moment.",
    reference: "The crossfire delivery mid-release — the ball emerging from an impossible angle. Or: the deliberate pause on the mound, cap adjustment, sleeve adjustment, the crowd waiting. Or: Gettysburg itself — the battlefield, the cemetery, the quiet town where the greatest lefty of his era lived and died and was buried among the monuments. The card should feel like a monument: not dramatic, not exciting, but permanent.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#ece6d6", darkBrown: "#3a3530", medBrown: "#6b5f52",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#958570",
  cream: "#f5f0e5", ink: "#2a2520", hotRed: "#c44536",
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

export default function EddiePlankCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #3a3530 0%, #2a2520 50%, #3a3530 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
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
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — 26-6 • CAREER HIGH WINS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "WS ERA", val: "1.32" },{ label: "WS W-L", val: "2-5" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 17 SEASONS • 1ST LHP: WINS, CG, SHUTOUTS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 3× WS Champ", "⭐ HOF 1946", "👑 326 Wins (1st LHP)", "🎯 69 Shutouts (1st LHP)", "📊 410 CG (1st LHP)", "🏟️ 1.32 WS ERA", "🎓 Gettysburg College", "🔥 8× 20-Win Seasons"].map((a, i) => (
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
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "COMPLEX" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "COMPLEX" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Plank's real life, become universal cards playable in any game.</p>
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
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Plank's Derivation">
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
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#2a2520", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
