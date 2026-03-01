// /cards/players/charlie-root.jsx
import { useState } from "react";

const PLAYER_DATA = {
  name: "Charlie Root",
  nickname: "Chinski",
  year: 1927,
  team: "Chicago Cubs",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "190 lbs",
  born: "March 17, 1899 — Middletown, OH (St. Patrick's Day)",
  died: "November 5, 1970 — Hollister, CA (age 71)",
  hof: "Not inducted. Cubs franchise all-time leader in wins (201), games pitched (605), and innings pitched (3,137). 5× MVP consideration. The most accomplished Cubs pitcher in history, overshadowed by one pitch.",

  real_stats: {
    season: 1927, games: 48, wins: 26, losses: 15, era: "3.76",
    innings: "309.0", strikeouts: 145, walks: 117, complete_games: 26,
    shutouts: 4, whip: "1.295", k_per_9: "4.22", bb_per_9: "3.41",
    war: 5.4, led_nl: "Wins (26), Games (48), Innings (309)",
    career_wins: 201, career_losses: 160, career_era: "3.59",
    career_ip: "3,197.1", career_k: 1459, career_cg: 177, career_sho: 21,
    career_war: 37.6, career_saves: 42,
    ws_record: "0-3, 6.75 ERA in 6 WS games (4 World Series: 1929, 1932, 1935, 1938 — all losses)",
    mvp_finish: "4th in NL MVP, 1927",
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT ENGINE
  // STF: 3.76 ERA → tier 2 (3.50-3.99). K/9 4.22 → decent for era but not elite. No K/9 bonus. But top-5 in K/9 for 6 straight years (1926-31). Bump +1 for era context. STF 3.
  // CTL: BB/9 3.41 → tier 1 (3.00-3.99). WHIP 1.295. No WHIP bonus (need <1.15). CTL 1.
  // STA: 309 IP → tier 3 (300+ = max). 48 games. 26 CG. Workhorse. STA 3.
  // DEF: No GG data. Good fielder (.965). Some defensive contributions. DEF 0.
  // CLU: WS ERA 6.75 → tier 0. 0-3 in WS. The Called Shot. Terrible in October. CLU 0.
  // OVR: STF(3)×2 + CTL(1)×1.5 + STA(3)×1 + DEF(0)×0.5 = 6+1.5+3+0 = 10.5 → normalized ~6 (Solid Starter)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,
    stf: 3,  // 3.76 ERA in 1927 (good but not elite). Great fastball, devastating "wrinkle ball" curve. Top-5 in K/9 for 6 straight years. "Cool and graceful" — one of the great fastball pitchers of his era. Threw overhand, three-quarters, and sidearm. STF 3.
    ctl: 1,  // 117 BB in 1927 (led NL in walks). BB/9 3.41. Control was his weakness — he relied on power and intimidation rather than precision. WHIP 1.295 doesn't earn bonus. Career improved: 2.60 ERA in 1933 with much better control.
    sta: 3,  // 309 IP in 1927 (led NL). 48 games (led NL). 26 CG. Maximum workload. Staff ace who pitched every 4th day and occasionally relieved. McCarthy depended on him more than any other pitcher.
    def: 0,  // Solid fielder (.965 in 1927) but no defensive awards or reputation. Not a factor defensively.
    clu: 0,  // 0-3 with 6.75 ERA in World Series play. Gave up the Called Shot to Ruth. Collapsed in 1929 WS (Game 4 — blew 8-0 lead). Got knocked out of 1935 WS Game 2 in the first inning. Minimum clutch.
  },

  stat_justification: {
    stf: "Root was described as 'cool and graceful' with a 'mysterious delivery.' He threw overhand, three-quarters, and sidearm, keeping hitters off-balance. His fastball was elite for the era, and his curveball — which he called his 'wrinkle ball' ('It slews a little like the wrinkle in a piece of suit') — froze hitters. He ranked top-5 in the NL in K/9 for six consecutive years (1926-31). His 3.76 ERA in 1927 looks pedestrian, but he threw 309 IP and led the NL in wins. The Sporting News praised his 'mysterious delivery.' Rating of 3.",
    ctl: "Root led the NL in walks (117) in 1927 — his wildness was real. BB/9 of 3.41 is tier 1 at best. He was an aggressive, intimidating pitcher who threw inside relentlessly (his nickname 'Chinski' came from throwing at batters' chins), and that approach came with walks. His control improved significantly later in his career — 2.60 ERA in 1933 with just 44 walks — but in his peak year, control was his clear weakness. Rating of 1.",
    sta: "309 IP in 1927 — led the NL. 48 games — led the NL. 26 complete games. McCarthy trusted Root more than any other pitcher; he started every 4th day and occasionally relieved between starts. Averaged 252 IP per season from 1926-33. Career 3,197 IP, 177 CG, 21 SHO. The ultimate workhorse who carried the Cubs staff for a decade. Rating of 3 (maximum).",
    def: "Root was a competent fielder with a .965 fielding percentage in 1927, and he held his position well. But he had no particular defensive reputation and no awards. Not a factor. Rating of 0.",
    clu: "CATASTROPHIC in October. 0-3 with a 6.75 ERA across 6 World Series games. In the 1929 WS Game 4, he held an 8-0 lead through 6 innings before the A's scored 10 runs to win 10-8 — one of the greatest collapses in WS history (Root was pulled after allowing 6 runs in the 7th). In the 1932 WS Game 3, he gave up the 'Called Shot' to Babe Ruth — whether Ruth pointed or not, Root gave up the HR that became the most famous in baseball history. In the 1935 WS Game 2, he was knocked out before recording an out in the first inning. He died angry about the Called Shot, insisting until his last breath that Ruth didn't point. Rating of 0 (minimum).",
  },

  personality: {
    leadership_style: "The Staff Ace as Enforcer. Root led by intimidation, durability, and sheer competitiveness. He wasn't the pitcher who talked to you about your mechanics — he was the pitcher who took the ball every fourth day, threw 300 innings, and dared you to match his effort. Teammates called him 'Old Bear.' His manager McCarthy depended on him more than any other pitcher for five years. His pitching philosophy, later codified as the 'Nine Hill Commandments,' prioritized conditioning, ball control, fielding, and — above all — heart.",
    temperament: "FIERCE. Root was a cigar-chomping, tobacco-spitting, chin-throwing brawler on the mound. His nickname 'Chinski' came from his habit of throwing at hitters' chins — he threw inside with malicious intent and dared hitters to dig in. He was described as having a 'no-nonsense visage' that was 'one of the most intimidating tools in his baseball arsenal.' Off the mound, he was a quiet, blue-collar man who quit school at 13 to drive a grocery wagon. The fierceness was professional, not personal — but it was absolute.",
    work_ethic: "RELENTLESS. Root quit school at 13 and worked as a grocery boy, shipping clerk, and wood pattern maker before baseball. He went 0-4 with a 5.70 ERA in his first MLB stint (1923 Browns), was sent to the minors, won 46 games in two PCL seasons, and came back to win 201 in the majors. He pitched in organized baseball until age 49. After playing, he became a minor league manager and major league pitching coach, coaching the Braves to a World Series title in 1957. His career spanned 35 years in professional baseball.",
    lifestyle: "Blue-collar Midwest roots. Eighth of nine children from Middletown, Ohio. After baseball, he became a cattle rancher with a 1,000-acre Diamond-R Ranch in Paicines, California. Liked hunting and fishing. Married to baseball and the land. No flash, no fame-seeking — just a working man who happened to throw baseballs for a living.",
    era_adaptability: "MODERATE. Root's stuff was elite for his era — great fastball, wicked curve, multiple arm angles. But his control issues (117 BB in 1927) would be more punishing in the modern game. His innings-eating durability (309 IP) wouldn't be utilized today. He'd profile as a mid-rotation starter with a nasty approach — a Marcus Stroman or Zack Greinke type. His intimidation factor would still translate. His willingness to pitch inside would make him a modern analytics darling for 'establishing the zone.'",
    clubhouse_impact: "THE BACKBONE. Root was the Cubs for 16 years — longer than any other pitcher in franchise history. He was there for all four World Series (1929, 1932, 1935, 1938). He was the constant while managers changed (McCarthy, Hornsby, Grimm). Phil Cavarretta said Root 'was a big help, not only as a pitcher, but as a coach to our younger pitchers.' He was the elder statesman, the guy who'd been through everything, who'd taken the ball when it mattered most — even if the results in October weren't what he wanted.",
    dark_side: "THE CALLED SHOT. This is the wound that never healed. On October 1, 1932, in Game 3 of the World Series, Babe Ruth stepped to the plate against Root with the count 2-2. Ruth gestured — toward the pitcher? Toward center field? — and then hit the next pitch for a monstrous home run. The moment became the most famous in baseball history, and Root became the answer to the most humiliating trivia question: 'Who gave up the Called Shot?' Root denied it until his dying day, insisting Ruth pointed at him, not at the bleachers. Frank Crosetti (Ruth's own shortstop) backed Root up. But the myth won. Root's 201 wins, his Cubs records, his fierce competitiveness — all erased by one pitch. He reportedly said he would have knocked Ruth down if Ruth had really pointed. In ILB: Root carries the 'Called Shot' trait — a permanent -2 to legacy and a chance that any dramatic HR against him becomes legendary, overshadowing everything else he's done.",
  },

  chemistry_traits: [
    { tag: "Chinski", desc: "Throws at chins. +1 intimidation vs all hitters. Hitters with CLU < 2 lose -1 CON against Root. But +15% chance of hit-by-pitch and potential ejection." },
    { tag: "The Called Shot", desc: "Permanent -2 legacy. Any HR against Root in a high-profile game has a 20% chance of becoming 'legendary' — permanently associated with Root's name for the wrong reasons." },
    { tag: "Old Bear", desc: "Grizzled, durable, fierce. +1 STA and +1 intimidation. Root takes the ball every day and growls at anyone who suggests rest." },
    { tag: "Staff Ace", desc: "Takes the ball every 4th day without complaint. +1 to team's starting rotation cohesion. McCarthy trusts him above all others." },
    { tag: "Nine Hill Commandments", desc: "After retirement, Root becomes an elite pitching coach. +2 to any young pitcher's development. Led Braves to lowest NL ERA (1956) and WS title (1957)." },
    { tag: "October Collapse", desc: "0-3 with 6.75 ERA in the World Series. -2 to all stats in World Series play. Cannot be trusted in elimination games." },
    { tag: "The Denial", desc: "Root insists Ruth didn't point. He carries this anger to his grave. +1 motivation in regular season (proves his worth), -1 composure when the Called Shot is mentioned." },
    { tag: "Wrinkle Ball", desc: "Root's curveball 'slews a little like the wrinkle in a piece of suit.' +1 STF against right-handed hitters who haven't faced the pitch before." },
  ],

  preferred_locations: [
    { location: "The Mound", affinity: "HIGH", note: "309 IP, 48 games, 26 CG in 1927 alone. He lives here." },
    { location: "Wrigley Field", affinity: "HIGH", note: "16 years as a Cub. Franchise career leader in W, G, IP." },
    { location: "Inside Corner", affinity: "HIGH", note: "'Chinski' — the pitch near the chin. His territory." },
    { location: "Cattle Ranch", affinity: "HIGH", note: "1,000-acre Diamond-R Ranch in Paicines, CA. Hunting, fishing, ranching." },
    { location: "Minor Leagues / Coaching", affinity: "HIGH", note: "Pitched in organized ball until 49. Managed. Coached. Baseball lifer." },
    { location: "World Series", affinity: "LOW", note: "0-3, 6.75 ERA. The one place that destroyed him." },
    { location: "History Books", affinity: "LOW", note: "Remembered for the Called Shot, not 201 wins. The cruelest legacy in baseball." },
  ],

  momentum: {
    hot_triggers: [
      "Regular season dominance — 26 wins in 1927, averaged 18 wins/year for 8 seasons",
      "Intimidation working — hitters backing off the plate, free swings becoming defensive",
      "Heavy workload — Root got BETTER the more he pitched. 309 IP was his best year.",
      "Team pennant races — Root won 4 straight starts during the Cubs' 1935 21-game win streak",
    ],
    cold_triggers: [
      "World Series pressure — 0-3 with 6.75 ERA. Complete October collapse.",
      "The Called Shot narrative — any time the legend is invoked, Root's composure fractures",
      "Overweight in spring — reported 15 lbs heavy in 1928, battled weight all year, went 14-18",
      "Poor run support — in 1926, his team scored 2 or fewer in 13 of his losses (13 total runs)",
    ],
    pressure_response: "INVERTED. Root in the regular season was one of the most dependable pitchers in baseball — 26 wins, 4th in MVP, staff ace for a decade. But in October, he completely collapsed. The 1929 WS Game 4 is the nightmare: Cubs led 8-0 through 6 innings, then the A's scored 10 runs to win (Root gave up 6 in the 7th before being pulled). The Called Shot in 1932. Knocked out in the 1st inning of the 1935 WS. In ILB: Root is the anti-clutch pitcher — elite in April through September, catastrophic in October. He's the ace who gets you to the World Series and then can't win it. Draft him as your #1 starter with the understanding that you need someone else for October.",
  },

  action_card_seeds: [
    {
      title: "The Called Shot",
      type: "Drama",
      text: "World Series, Game 3. Your ace faces the greatest hitter in baseball. Count 2-2. The hitter gestures — at you? At center field? He hits the next pitch into the bleachers. The moment becomes the most famous in baseball history. Your pitcher's 201 wins are forgotten. He becomes a trivia answer. He denies the gesture until he dies. The truth doesn't matter — the myth wins.",
      origin: "October 1, 1932. Wrigley Field. Ruth vs Root. The Called Shot. Root denied it for 38 years until his death. Crosetti (Ruth's own shortstop) said Ruth pointed at Root, not center field. The debate continues forever.",
    },
    {
      title: "The Ten-Run Inning",
      type: "Game Action",
      text: "Your ace has an 8-0 lead through 6 innings of a World Series game. He's cruising. Then in the 7th, everything falls apart. The opponent scores 10 runs. Your ace gives up 6 before being pulled. The greatest collapse in World Series history. The lead is gone. The series is gone. The memory is permanent.",
      origin: "1929 World Series Game 4. Cubs led A's 8-0. Root was pulled in the 7th after giving up 6 runs. The A's completed the rally and won 10-8. Still considered one of the greatest comebacks in WS history.",
    },
    {
      title: "The Grocery Boy",
      type: "Action",
      text: "A 13-year-old kid quits school to drive a grocery wagon. He plays baseball in his spare time. He works as a shipping clerk, a wood pattern maker, a grocery delivery boy. Then he becomes a professional pitcher and wins 201 games. The kid who couldn't afford school becomes a franchise legend.",
      origin: "Root quit school at 13 in Middletown, Ohio. He worked multiple blue-collar jobs before baseball gave him a career. He still listed 'wood pattern maker, shipping clerk, and grocery boy' as his major occupations in a 1938 questionnaire.",
    },
    {
      title: "Chinski",
      type: "Game Action",
      text: "Your pitcher throws one under the hitter's chin. The hitter goes down. Next pitch, the hitter is leaning back. Easy strike. Your pitcher does this all game — brush back, then the wrinkle ball curve on the outside corner. Hitters hate him. The ump warns him once. He spits tobacco juice and throws inside again.",
      origin: "Root's nickname 'Chinski' (given by Charlie Grimm) came from his habit of throwing at hitters' chins. He combined inside fastballs with his 'wrinkle ball' curveball to devastate hitters. It was described as 'one of the most intimidating tools in his arsenal.'",
    },
    {
      title: "The Nine Hill Commandments",
      type: "Action",
      text: "Your retired ace becomes a pitching coach. He writes down nine commandments for his pitchers: conditioning, ball control, fielding, mastering your pitches before trying new ones, running every day, bunting, pacing, developing a changeup, and — finally — heart. His staff leads the league in ERA. His team wins the World Series. The ring he could never win as a player, he wins as a coach.",
      origin: "Root's 'Nine Hill Commandments' were his coaching philosophy. As Braves pitching coach, his staff led the NL in ERA in 1956 and won the 1957 World Series — giving Root his only championship ring, as a coach rather than a player.",
    },
    {
      title: "The 1,000-Acre Ranch",
      type: "Drama",
      text: "After 35 years in professional baseball — player, manager, coach — your man retires to a 1,000-acre cattle ranch. He hunts. He fishes. He raises cattle. He never talks about the Called Shot unless asked, and when asked, he denies it. He carries the anger quietly, like a man carrying fence posts.",
      origin: "Root retired to his Diamond-R Ranch in Paicines, California — 1,000 acres of cattle country. He died there in 1970, still insisting Ruth never pointed.",
    },
    {
      title: "The Last Man Born in the 1800s",
      type: "Action",
      text: "Your pitcher wins a game, and it's noted that he's the last man born in the 19th century to win a Major League game. An era ends with a final victory.",
      origin: "Root, born March 17, 1899, was the last player born in the 1800s to record a MLB win.",
    },
    {
      title: "201 Wins, Zero Fame",
      type: "Drama",
      text: "Your franchise's all-time wins leader is not in the Hall of Fame. He led the league in wins. He went to four World Series. He pitched for 17 years. But he's remembered for one pitch that someone else hit. The most wins in franchise history, and the most painful legacy in the game.",
      origin: "Root holds Cubs career records for wins (201), games (605), and innings (3,137). He was never seriously considered for the Hall of Fame. His legacy is the Called Shot.",
    },
  ],

  art_direction: {
    face: "Weathered, compact, fierce. 5'10\" 190 lbs — stocky, powerful, built low to the ground like a bull. Not a tall, graceful pitcher — a pit fighter with a baseball. Age 28 in 1927. Hard jaw, tobacco-stained sneer. Cigar-chomping intensity. The face of a man who quit school at 13, drove a grocery wagon, and then threw at your chin for a living. Not cruel — determined. The ferocity is professional, earned, blue-collar.",
    attire: "Chicago Cubs 1927 road grays or home whites. Mid-delivery on the mound — that violent, three-quarters arm slot, ball about to leave his hand. Or standing on the mound, glaring at a hitter who just backed off the plate. Tobacco juice on the uniform. The mound as his domain, his hill, his kingdom.",
    mood: "Defiant. Root's card should radiate a challenge: 'Hit this if you can.' There's anger in it — not wild anger, but the cold, focused anger of a man who will throw 309 innings and dare the world to knock him off the mound. The mood should also carry a hint of tragedy — the man who did everything right for 17 years and is remembered for one pitch.",
    style: "Warm sepia with darker, grittier tones than the other Bashers cards. Root's card should feel rougher, more worn — like a newspaper clipping found in a barn. Less golden, more tobacco-stained. The contrast with Hartnett (the Cubs teammate) should be stark: Hartnett is the beloved institution, Root is the forgotten workhorse.",
    reference: "Think of a Depression-era photograph — a man who works with his hands and his back. Root is the most blue-collar player on the Bashers roster. The card should feel like it's been through something. Wrigley Field in the background, but darker, more autumnal — the October where everything went wrong.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA + K/9", tiers: [{ range: "ERA 4.50+", value: 0 }, { range: "ERA 4.00-4.49", value: 1 }, { range: "ERA 3.50-3.99", value: 2 }, { range: "ERA 3.00-3.49", value: 3 }, { range: "ERA 2.50-2.99", value: 4 }, { range: "ERA < 2.50", value: 5 }], bonus: "K/9 ≥ 7.0 → +1 (cap 5); era-adjusted top-5 K/9 for 6 years → +1" },
  control: { metric: "BB/9 + WHIP", tiers: [{ range: "BB/9 4.0+", value: 0 }, { range: "BB/9 3.0-3.99", value: 1 }, { range: "BB/9 2.0-2.99", value: 2 }, { range: "BB/9 < 2.0", value: 3 }], bonus: "WHIP < 1.15 → +1 (cap 3)" },
  stamina: { metric: "IP", tiers: [{ range: "< 150 IP", value: 0 }, { range: "150-199 IP", value: 1 }, { range: "200-249 IP", value: 2 }, { range: "250+ IP", value: 3 }] },
  defense: { metric: "GG + reputation", tiers: [{ range: "No GG / avg", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3+ GG", value: 2 }] },
  clutch: { metric: "PS ERA + moments", tiers: [{ range: "ERA 4.50+", value: 0 }, { range: "ERA 3.00-4.49", value: 1 }, { range: "ERA < 3.00", value: 2 }], bonus: "WS hero → +1 (cap 3)" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };
const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function CharlieRootCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Fierce delivery, Cubs grays, cigar-chomping intensity, Wrigley mound]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="STF" value={s.stf} max={5} color={C.warmRed} /><StatBar label="CTL" value={s.ctl} max={3} color={C.gold} /><StatBar label="STA" value={s.sta} max={3} color={C.traitGreen} /><StatBar label="DEF" value={s.def} max={3} color={C.coldBlue} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` }, { label: "ERA", val: d.real_stats.era }, { label: "IP", val: d.real_stats.innings }, { label: "K", val: d.real_stats.strikeouts }, { label: "BB", val: d.real_stats.walks }, { label: "CG", val: d.real_stats.complete_games }, { label: "WHIP", val: d.real_stats.whip }, { label: "WAR", val: d.real_stats.war }].map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1927 SEASON — LED NL: WINS (26) • IP (309) • GAMES (48)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 Cubs All-Time Wins (201)", "📊 4th NL MVP 1927", "⚾ 4× WS Team (29/32/35/38)", "💀 The Called Shot", "🔥 26 CG in 1927", "🎯 'Wrinkle Ball' Curve", "🤠 1,000-Acre Rancher", "🏅 1957 WS Ring (Coach)"].map((a, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{["leadership_style","temperament","work_ethic","lifestyle","era_adaptability","clubhouse_impact"].map(k => (<Section key={k} title={k.replace(/_/g," ")}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{t.tag}</div>))}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Root's real life, universalized as playable cards.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Engine (Pitcher)">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Root's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}</pre>
      </div>
    </div>
  );
}
