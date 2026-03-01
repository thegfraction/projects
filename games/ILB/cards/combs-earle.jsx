// /cards/players/earle-combs.jsx
import { useState } from "react";

const PLAYER_DATA = {
  name: "Earle Combs",
  nickname: "The Kentucky Colonel",
  year: 1927,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "CF",
  bats: "L",
  throws: "R",
  height: '6\'0"',
  weight: "185 lbs",
  born: "May 14, 1899 — Pebworth, Owsley County, KY",
  died: "July 21, 1976 — Richmond, KY (age 77)",
  hof: "Class of 1970 (Veterans Committee). Upon hearing the news: 'I thought the Hall of Fame was for superstars, not just average players like me.'",

  real_stats: {
    season: 1927, games: 152, at_bats: 648, hits: 231, doubles: 36, triples: 23,
    home_runs: 6, rbi: 64, runs: 137, stolen_bases: 15, strikeouts: 31, walks: 62,
    batting_avg: ".356", obp: ".414", slg: ".511", ops: ".925", ops_plus: 136, war: 6.5,
    career_avg: ".325", career_hits: 1866, career_hr: 58, career_rbi: 633,
    career_sb: 98, career_ops_plus: 125, career_war: 45.0, career_triples: 154,
    ws_avg: ".350", ws_obp: ".443", ws_championships: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  // STAT ENGINE
  // CON: .356 BA → tier 5 (.330+). OPS+ 136 → ≥130 bonus. Already capped. CON 5.
  // POW: 6 HR → tier 0 (0-9). SLG .511 → ≥.500 bonus → +1. POW 1.
  // SPD: 15 SB → tier 1 (6-15). CF with great range → positional GG equivalent bonus → +1. SPD 2.
  // DEF: Led AL CF in putouts 2×, great range, "ballhawk." Weak arm. Pre-GG equivalent ~2-3 GG. DEF 1.
  // CLU: WS BA .350 → tier 2 (.300+). Scored winning run in 1927 WS sweep. No huge singular hero moment. CLU 2.
  // OVR: CON(5)×2 + POW(1)×1.5 + SPD(2)×1 + DEF(1)×0.5 = 10+1.5+2+0.5 = 14 → normalized ~8 (All-Star)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 5,  // .356 in 1927, .325 career. 231 hits (Yankees record for 59 years). Averaged 31 K/season. Maximum contact.
    pow: 1,  // 6 HR in 1927, 58 career. SLG .511 gets bonus. Triples/doubles man — 23 triples — but not HR power.
    spd: 2,  // 15 SB in 1927, 98 career. 23 triples require elite speed. CF range. "Fast as the devil" — Joe Cronin.
    def: 1,  // Great range, led AL CF in putouts 2×, but infamous weak arm. Bill James ranks him 34th CF. DEF 1.
    clu: 2,  // .350 WS BA across 4 Fall Classics. .443 WS OBP. Scored winning run in 1927 WS. Consistent postseason performer.
  },

  stat_justification: {
    con: ".356 BA in 1927 — tied with Babe Ruth for highest on the team. 231 hits set the Yankees franchise record (stood until Mattingly's 238 in 1986). Career .325 BA with only ~31 K per season. He sprayed line drives to all fields — a pure contact hitter who used the entire diamond. Huggins: 'If you had nine Combs on your ball club, you could go to bed every night and sleep like a baby.' Rating of 5.",
    pow: "Only 6 HR in 1927, 58 career. But his SLG of .511 earns the ≥.500 bonus, bumping him from 0 to 1. His power came in the form of 36 doubles and 23 triples — gap power, not fence-clearing power. He led the AL in triples 3 times with a career total of 154. Rating of 1.",
    spd: "15 SB in 1927, 98 career. Huggins told him 'Up here, we'll call you The Waiter' because with Ruth and Gehrig behind him, he didn't need to steal — he just waited to be driven home. But 23 triples require elite speed. In Louisville, he was called 'The Mail Carrier.' Joe Cronin: 'Fast as the devil — he could really get to the ball.' CF range bonus. Rating of 2.",
    def: "Excellent range in center field — led AL outfielders in putouts with 411 in 1927 and 424 in 1928. 'Swift and sure-handed.' Covered much of the outfield with the plodding Ruth beside him. However, his throwing arm was famously weak — the only knock on his game. He worked to improve it but it was never strong. Bill James ranks him only 34th among CF. Pre-GG equivalent of ~2-3 GG for range alone, but arm penalty. Rating of 1.",
    clu: ".350 BA across 4 World Series (16 games), .443 WS OBP. Scored the winning run in the 1927 WS sweep. Three WS championships. Consistent but not spectacular in October — no huge singular hero moment, but always productive. Rating of 2.",
  },

  personality: {
    leadership_style: "The Quiet Anchor. Combs led by example and moral authority, not volume. In a clubhouse full of drinking, carousing, larger-than-life personalities (Ruth, Meusel, Dugan), Combs was the moral center — 'a beacon of light' in the words of Fred Lieb. He never raised his voice, never complained, never made headlines. Managers loved him: Huggins said he could sleep like a baby with nine Combs. McCarthy said he presented fewer problems than any player he'd ever managed. He was the guy everyone respected.",
    temperament: "Gentle, modest, devout, deeply private. Ruth said Combs 'would sit in his room and read the Bible, for he came from a strict mountaineer family.' He used such mild language that teammates laughed at his attempts to cuss. But he was no pushover — when Louisville stiffed him on his share of the purchase price, he held out and said 'I am not a dumb animal to be browbeaten.' An introspective man with a teacher's patience and a competitor's steel underneath the politeness.",
    work_ethic: "Schoolteacher-turned-ballplayer. Combs made $37/month teaching in one-room schoolhouses in Owsley County, KY before baseball offered a better living. He played baseball with tree limbs for bats and baseballs made from old shoe leather as a child. Hit .591 in college, .380 in the minors. His work ethic was quiet and relentless — he strengthened his weak arm through years of exercises, even though it never became strong. He came back from a fractured skull in 1934 to play again in 1935 before a broken collarbone finally ended him.",
    lifestyle: "Kentucky farmer and family man. Married Ruth McCollum in 1921, three sons. After baseball, returned to his 400-acre farm in Madison County, KY. Served as Kentucky State Banking Commissioner under Governor 'Happy' Chandler. Sat on Eastern Kentucky University's Board of Regents for 16 years. A man whose life was guided by the Bible, who never sought the spotlight and never needed it. The antithesis of the Roaring Twenties Yankee lifestyle.",
    era_adaptability: "HIGH. Combs' game — elite contact, patience, speed, center field range — is timeless. His .397 career OBP would make him an elite leadoff hitter in any era. The triples would decrease in modern parks but the doubles would increase. His weak arm would be a liability with modern analytics tracking outfield assists. He'd profile as a Brett Gardner / Juan Pierre type — a high-floor, low-ceiling CF who always gets on base.",
    clubhouse_impact: "THE TABLE-SETTER. Combs was the perfect leadoff man — not just statistically, but philosophically. He existed to make the people behind him better. He got on base so Ruth and Gehrig could drive him home. He covered center field so Ruth didn't have to run. He was the moral compass so the team didn't implode. Joe Cronin: 'He was always on base, it seemed, when they'd hit a homer.' Combs was the invisible infrastructure that made Murderers' Row possible.",
    dark_side: "The Skull Fracture. On a 100+ degree day in St. Louis in July 1934, Combs crashed full-speed into the outfield wall chasing a fly ball. He fractured his skull, broke his shoulder, and damaged his knee. He was near death for several days, hospitalized for two months. He came back in 1935 but a broken collarbone ended him. Joe DiMaggio replaced him. In ILB: Combs carries a 'Glass Ceiling' trait — he will play at maximum effort on every fly ball, and there's always a risk he'll run into the wall. Career-ending injury is always one catch away.",
  },

  chemistry_traits: [
    { tag: "The Kentucky Colonel", desc: "Mountain gentleman. +1 team morale from his steady, calming presence. No personality conflicts ever." },
    { tag: "Table-Setter", desc: "Gets on base for the sluggers behind him. +1 to the RBI stat of any teammate batting 3rd or 4th in the lineup." },
    { tag: "The Waiter", desc: "Huggins told him to just wait on first. Combs doesn't steal often but is always in scoring position. +1 runs scored." },
    { tag: "Bible & Bat", desc: "Devout, soft-spoken, moral compass. +2 clubhouse stability. Counteracts any teammate's off-field scandal." },
    { tag: "Triples Machine", desc: "154 career 3B, led AL 3×. Any ball in the gap has a 30% chance of becoming a triple (normally 10%)." },
    { tag: "Glass Ceiling", desc: "Plays all-out on every fly ball. 5% chance per season of a career-threatening wall collision. Cannot be benched to prevent it." },
    { tag: "Schoolteacher", desc: "Teaches young players fundamentals. +1 to any rookie's adjustment period. Combs coaches in retirement (Yankees, Red Sox, Phillies)." },
    { tag: "Murderers' Row", desc: "Combs is the ignition switch of the greatest lineup ever. +1 to all stats when Ruth AND Gehrig are in the lineup." },
  ],

  preferred_locations: [
    { location: "Center Field", affinity: "HIGH", note: "His domain. Led AL in putouts. Covered for Ruth. Swift, sure-handed, fearless." },
    { location: "Church / Bible Study", affinity: "HIGH", note: "'He'd sit in his room and read the Bible.' Ruth's words. A man of deep faith." },
    { location: "Farm / Rural Kentucky", affinity: "HIGH", note: "400-acre farm in Madison County. Born in Pebworth, Owsley County — Appalachian hill country." },
    { location: "Schoolhouse", affinity: "HIGH", note: "Taught in one-room schools for $37/month. The career he planned before baseball found him." },
    { location: "Leadoff Spot / Batter's Box", affinity: "HIGH", note: "11 years as the Yankees leadoff man. His office." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "'No one ever accused him of being out on a drinking party.' — Babe Ruth" },
    { location: "Press / Media", affinity: "LOW", note: "Deeply private. Fred Lieb: 'If sportswriters voted on their favorite Yankee, Combs would have been their choice' — but he never sought attention." },
  ],

  momentum: {
    hot_triggers: [
      "Playing behind elite sluggers — gets on base, scores runs, feeds the machine",
      "Large outfields — his range and speed play better in spacious parks",
      "Consistent season-long production — .300+ in 8 of 9 full seasons, 100+ R in 8 straight",
      "World Series — .350 career WS BA, rises to the moment without fanfare",
    ],
    cold_triggers: [
      "Injuries — fractured ankle (1924), fractured skull (1934), broken collarbone (1935). Fragile edge.",
      "Extreme heat — the skull fracture came on a 100+ degree day in St. Louis",
      "Being forced to steal — speed is for defense and triples, not baserunning risks",
      "Isolation from team infrastructure — Combs thrives as part of a system, not as The Star",
    ],
    pressure_response: "STEADY AND RELIABLE. Combs hit .350 in World Series play across 16 games — no dramatic collapses, no legendary single moments, just consistent excellence. He scored the winning run in the 1927 WS sweep. In ILB: Combs is the player you never worry about in October. He won't win the series single-handedly, but he'll never be the reason you lose it. The perfect complement to the dramatic stars around him.",
  },

  action_card_seeds: [
    {
      title: "Tree Limb and Shoe Leather",
      type: "Drama",
      text: "A prospect from the poorest county in the state shows up to camp. He played as a kid with tree limbs for bats and baseballs stitched from old shoes. If you give him a real bat and a chance, he becomes a .325 career hitter. If you overlook him, he goes back to teaching school for $37/month.",
      origin: "Combs grew up in Pebworth, Owsley County, KY — one of the poorest places in America. He played baseball with tree limbs and homemade balls. He became a schoolteacher earning $37/month before Louisville offered him more money to play.",
    },
    {
      title: "The Waiter",
      type: "Game Action",
      text: "Your leadoff hitter is told to stop stealing and just 'wait on first' for the sluggers behind him. His SB drops to near zero, but his runs scored increases by 30%. The offense becomes a machine — get on base, wait, score on a homer.",
      origin: "Huggins told Combs: 'Down in Louisville they called you The Mail Carrier. Up here, we'll call you The Waiter. When you get on first, just wait there for Ruth or Gehrig to send you the rest of the way around.'",
    },
    {
      title: "Nine Combs",
      type: "Action",
      text: "Your manager says: 'If I had nine of this guy, I'd sleep like a baby.' The player gains +1 team harmony. If you clone his approach across the roster (everyone plays selflessly), +2 team chemistry for the season.",
      origin: "Miller Huggins: 'If you had nine Combs on your ball club, you could go to bed every night and sleep like a baby.'",
    },
    {
      title: "The Wall",
      type: "Drama",
      text: "100+ degree day. Your center fielder chases a fly ball toward the outfield wall at full speed. Roll: 70% he makes the catch (game-saving play). 30% he crashes into the wall — fractured skull, broken shoulder, damaged knee. Season over. Career may be over.",
      origin: "July 1934 in St. Louis. Combs crashed into the outfield wall at Sportsman's Park. Fractured skull, broken shoulder, damaged knee. Near death for days. Hospitalized two months. DiMaggio replaced him.",
    },
    {
      title: "Number One",
      type: "Action",
      text: "Your team introduces uniform numbers for the first time. The leadoff hitter gets #1. It becomes a franchise tradition — whoever wears #1 is expected to set the table.",
      origin: "On April 18, 1929, Combs became the first Yankee ever to bat wearing a uniform number — #1, assigned by batting order position. He was literally Yankee #1.",
    },
    {
      title: "The Comeback",
      type: "Drama",
      text: "A player who nearly died from a wall collision returns to play the next season. His skills are diminished (-1 to all stats) but his courage inspires the team (+2 morale). Then another injury ends him for good. His replacement becomes a legend.",
      origin: "Combs came back in 1935 after the skull fracture, but a broken collarbone ended his career. Joe DiMaggio took over in center field for the Yankees in 1936.",
    },
    {
      title: "Not a Dumb Animal",
      type: "Drama",
      text: "Your franchise stiffs a minor-leaguer on his promised share of the purchase price. He holds out and says 'I am not a dumb animal to be browbeaten.' If you pay, he gives you 12 loyal years. If you don't, he walks.",
      origin: "When the Yankees bought Combs for $50,000, Louisville owed him a percentage. When they didn't pay, the gentle Combs held out — surprising everyone with his backbone.",
    },
    {
      title: "I Thought the Hall of Fame Was for Superstars",
      type: "Drama",
      text: "Your retired player is elected to the Hall of Fame and says 'I thought this was for superstars, not average players like me.' +3 legacy, +3 humility reputation. The quote becomes one of the most beloved in baseball history.",
      origin: "Combs' response when told of his 1970 HOF election. The most humble acceptance speech in Cooperstown history.",
    },
  ],

  art_direction: {
    face: "Clean-cut, kind, intelligent face. 6'0\" 185 lbs — lean, athletic, built for speed not power. Age 28 in 1927. Sandy/light brown hair (earned the nickname 'Silver Fox' as it grayed). Gentle, steady eyes — the face of a man who'd rather be reading the Bible than making headlines. A quiet confidence without any trace of ego.",
    attire: "New York Yankees 1927 home pinstripes. No number (pre-numbering; he'd be the first to wear #1 in 1929). Cap slightly tilted, glove in hand — ready to run down a fly ball in center field. The lean, coiled stance of a leadoff man about to sprint.",
    mood: "Calm competence. Not fierce, not joyful — simply steady. The look of a man who shows up, does his job at an elite level, and goes home to read. The least dramatic player on the most dramatic team ever. That contrast IS the mood.",
    style: "Warm sepia tones, Yankee Stadium's original facade in golden background. The card should feel quieter and more understated than the other Bashers cards — because Combs IS quieter and more understated. This is the card you almost overlook, until you notice the .356 batting average and realize he's the engine that made everything else work.",
    reference: "Think of a Ken Burns documentary still — dignified, historical, slightly faded. Combs is the kind of player who looks better in black and white than in color. The Kentucky mountains should be suggested somewhere — maybe a faint ridgeline behind the stadium. The son of hill farmers who became Yankee #1.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak) + SLG", tiers: [{ range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "SB + positional range", tiers: [{ range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + reputation", tiers: [{ range: "No GG / poor", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "PS BA + moments", tiers: [{ range: "< .250", value: 0 }, { range: ".250-.299", value: 1 }, { range: ".300+", value: 2 }], bonus: "WS hero → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function EarleCombsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Steady gaze, CF ready stance, Yankees pinstripes, Yankee Stadium]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HITS", val: d.real_stats.hits }, { label: "3B", val: d.real_stats.triples }, { label: "RUNS", val: d.real_stats.runs }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "SB", val: d.real_stats.stolen_bases }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1927 SEASON — {d.real_stats.games} GAMES • AL HITS LEADER (231)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1970 (Vet. Comm.)", "🏆 3× WS Champ (27/28/32)", "📊 231 Hits (NYY Record)", "🔺 3× AL Triples Leader", "⚾ .350 WS BA", "1️⃣ First Yankee #1", "🏃 154 Career 3B", "🎓 Former Schoolteacher"].map((a, i) => (
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
              {tab === "personality" && (<>{["leadership_style","temperament","work_ethic","lifestyle","era_adaptability","clubhouse_impact"].map(k => (<Section key={k} title={k.replace(/_/g," ")}><p style={{ margin: 0 }}>{d.personality[k]}</p></Section>))}<Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section></>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{t.tag}</div>))}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Combs' real life, universalized as playable cards.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Combs' Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
