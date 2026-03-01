// /cards/players/gabby-hartnett.jsx
import { useState } from "react";

const PLAYER_DATA = {
  name: "Gabby Hartnett",
  nickname: "Old Tomato Face",
  year: 1930,
  team: "Chicago Cubs",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "C",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "218 lbs",
  born: "December 20, 1900 — Woonsocket, RI",
  died: "December 20, 1972 — Park Ridge, IL (age 72, on his birthday)",
  hof: "Class of 1955 (BBWAA, 77.7%). At retirement held catcher records for HR (236), RBI (1,179), hits (1,912), games caught (1,793).",

  real_stats: {
    season: 1930, games: 141, at_bats: 508, hits: 172, doubles: 31, triples: 3,
    home_runs: 37, rbi: 122, runs: 84, stolen_bases: 0, strikeouts: 62, walks: 55,
    batting_avg: ".339", obp: ".404", slg: ".630", ops: "1.034", ops_plus: 151, war: 6.9,
    career_avg: ".297", career_hits: 1912, career_hr: 236, career_rbi: 1179,
    career_sb: 28, career_ops_plus: 126, career_war: 55.0, career_games_caught: 1793,
    ws_avg: ".238", ws_games: 4, ws_series: "4 WS (1929, 1932, 1935, 1938) — 0 wins",
    mvp: "1935 NL MVP (.344/13 HR/91 RBI)",
    all_star: "6× (1933-38, inaugural game through 1938)",
    cs_pct: "56.11% (2nd all-time behind Campanella)",
  },

  // ═══════════════════════════════════════════════════════════════
  // STAT ENGINE
  // CON: .339 BA → tier 5 (.330+). OPS+ 151 → ≥130 bonus. Already capped. CON 5.
  // POW: 37 HR → tier 3 (30-39). SLG .630 → ≥.500 bonus → +1. POW 4.
  // SPD: 0 SB in 1930 → tier 0. No GG. SPD 0.
  // DEF: Led NL catchers in fielding 6×. CS% 56.11% (#2 all-time). 452 consecutive errorless chances. Rifle arm. Pre-GG equivalent of 6+ GG. DEF 3.
  // CLU: WS BA .238 across 4 WS — all losses. But Homer in the Gloamin' (1938) is one of the most clutch HRs ever. Mixed. CLU 2.
  // OVR: CON(5)×2 + POW(4)×1.5 + SPD(0)×1 + DEF(3)×0.5 = 10+6+0+1.5 = 17.5 → normalized ~10 (Elite/MVP)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,
    con: 5,  // .339 in 1930, .354 in 1937 (best by a catcher for 60 years). .344 in MVP year 1935. Career walks > strikeouts (691 to 683).
    pow: 4,  // 37 HR in 1930 (catcher record for 23 years). .630 SLG. 236 career HR. Power + contact from the catcher position.
    spd: 0,  // 0 SB in 1930. 28 career. 218 lbs. No speed. "Old Tomato Face" wasn't running anywhere.
    def: 3,  // Greatest defensive catcher of his era. Led NL C in fielding 6×. CS% 56.11% (#2 all-time). Rifle arm. 452 errorless chances. Handled Grover Alexander, caught Hubbell's famous 5-K All-Star inning.
    clu: 2,  // Homer in the Gloamin' = one of the most clutch moments ever (+1 hero). But .238 WS BA and 0-for-4 in World Series = tier 0. Net: 0 + 1 hero bonus + 1 for the pennant-winning HR = CLU 2.
  },

  stat_justification: {
    con: ".339 BA in 1930 — his peak offensive season. .344 in 1935 MVP year. .354 in 1937 — the best batting average by a catcher for 60 years until Mike Piazza. Career .297 is excellent for a catcher. He walked more than he struck out over his career (691 BB to 683 K) — extraordinary plate discipline from behind the plate. Rating of 5.",
    pow: "37 HR in 1930 — set the catcher single-season HR record, which stood for 23 years until Roy Campanella broke it in 1953. .630 SLG in 1930, career .489 SLG. 236 career HR (catcher record at retirement). SLG ≥.500 bonus earned. For a catcher, this is elite power in any era. Rating of 4.",
    spd: "0 SB in 1930. 28 career SB in 20 seasons. Hartnett was a big man (6'1\" 218 lbs) who caught 1,793 games — his knees and legs took tremendous punishment. Zero speed by any standard. Rating of 0.",
    def: "The greatest defensive catcher of the pre-WWII era and one of the best ever. Led NL catchers in fielding percentage 6 times. Threw out 56.11% of basestealers — second-highest rate in MLB history behind only Roy Campanella. Had 452 consecutive errorless chances (record). Led NL catchers in putouts 4×, assists 6×, double plays 6×. Leo Durocher compared his arm to Johnny Bench's. He was behind the plate when Carl Hubbell struck out Ruth, Gehrig, Foxx, Simmons, and Cronin consecutively in the 1934 All-Star Game. Handled Grover Cleveland Alexander's 300th win. Rating of 3 (maximum).",
    clu: "COMPLICATED. The Homer in the Gloamin' (Sept 28, 1938) — a walkoff HR in near-darkness that won the pennant — is one of the 5 most famous home runs in baseball history. That alone earns a hero bonus. But his World Series record is poor: .238 BA across 4 WS appearances, all of which the Cubs lost. He struck out in all 3 AB in the 1929 WS. He's 0-for-4 in the Fall Classic. Net: CLU 2 — the Gloamin' HR elevates him above his WS failures, but he's not maximum clutch.",
  },

  personality: {
    leadership_style: "The General Behind the Plate. Hartnett was the on-field manager of every Cubs team he played for — calling pitches, positioning fielders, managing pitchers' emotions. He guided the Cubs to the lowest NL ERA (3.44) in 1932. He was eventually made literal player-manager in 1938. His leadership was quiet, professional, and encyclopedic — he knew every hitter's weakness and every pitcher's tendencies. Grover Cleveland Alexander called him his favorite catcher.",
    temperament: "Ironic nickname: 'Gabby' was given because he was the OPPOSITE — shy, reticent, barely spoke as a rookie. His mother told him: 'Keep your mouth shut until you see what's going on.' As he matured, he became more outgoing but never loud. He was tough, durable, and sardonic — 'Most catchers have to wear a mask because they're so ugly, but I have to wear one because I'm so pretty.' When Commissioner Landis scolded him for signing Al Capone's autograph, Hartnett replied: 'If that's your rule, it's OK by me. But I'm not explaining it to him. Next time you see him, YOU explain it to him.'",
    work_ethic: "IRON MAN. Caught 1,793 games — the record at his retirement. Caught 100+ games 12 times, including 8 straight from 1930-37. His father made him carry a pail of stones as a child to strengthen a broken arm that hadn't healed properly — 'the Hartnett arm' became legendary in his hometown. When his throwing arm went dead in 1929, his mother predicted it would heal when his pregnant wife delivered. The baby was born December 4; within two weeks, the arm was fine. He caught a baseball dropped from a blimp at 800 feet.",
    lifestyle: "Blue-collar New England roots. Eldest of 14 children in Woonsocket, RI. Father was a semi-pro catcher — four of his sons and three of his five daughters all had 'the Hartnett arm.' Worked at U.S. Rubber before baseball. Modest, family-oriented. Chicago fixture for 19 years. Died on his 72nd birthday.",
    era_adaptability: "VERY HIGH. Hartnett's combination of elite defense, power hitting, and game management would make him a franchise catcher in any era. His .297 career BA with 236 HR and walk-to-strikeout ratio would be exceptional by modern catching standards. His CS% of 56.11% would be otherworldly today (league average is ~25%). He'd be a perennial All-Star and potential MVP in the 2020s.",
    clubhouse_impact: "THE ANCHOR. Every great team needs a great catcher, and Hartnett was the greatest catcher of his era for 19 years. He was the constant while everything else changed — managers, pitchers, teammates, even the rules. The Cubs went to 4 World Series with Hartnett behind the plate. He was the infrastructure: the man who made pitchers better, who shut down the running game, who called the right pitch at the right time. Nobody noticed him until he was gone.",
    dark_side: "The World Series Curse. Hartnett went to 4 World Series — 1929, 1932, 1935, 1938 — and lost every single one. He struck out in all 3 AB in the 1929 WS. His career WS BA was .238. He hit the most famous pennant-winning HR in history, then lost the World Series that followed. In ILB: Hartnett carries a 'Pennant Hero, October Ghost' trait — he can win the pennant but can't win the ring. His teams always fall short in the final series.",
  },

  chemistry_traits: [
    { tag: "Old Tomato Face", desc: "Ruddy complexion, endearing nickname. +1 fan favorite. Universally liked by fans and teammates." },
    { tag: "Homer in the Gloamin'", desc: "The most famous walkoff in pre-modern history. In pennant-clinching situations, +2 POW for one at-bat. But -1 in the World Series that follows." },
    { tag: "The Hartnett Arm", desc: "56.11% CS rate — 2nd best ever. Opposing runners need +2 SPD to steal against Hartnett. Rifle arm." },
    { tag: "Pitcher Whisperer", desc: "+1 to all pitchers' CTL when Hartnett is catching. He guided the Cubs to the NL's lowest ERA in 1932." },
    { tag: "Iron Behind the Plate", desc: "1,793 games caught. Cannot be fatigued by consecutive games. +1 STA to himself and all pitchers." },
    { tag: "Gabby the Silent", desc: "Ironic nickname — he was shy, not talkative. +1 composure in hostile environments. Immune to trash talk." },
    { tag: "The Capone Photo", desc: "Signed an autograph for Al Capone and was photographed. +1 notoriety. Commissioner's office may get involved." },
    { tag: "Pennant Hero, October Ghost", desc: "4 WS appearances, 0 wins. Can hit the pennant-winning HR but will underperform in the World Series (.238 WS BA)." },
  ],

  preferred_locations: [
    { location: "Behind the Plate", affinity: "HIGH", note: "1,793 games caught. His throne. 452 consecutive errorless chances." },
    { location: "Wrigley Field", affinity: "HIGH", note: "19 years as a Cub. The Gloamin' HR site. His home." },
    { location: "Pitchers' Meeting", affinity: "HIGH", note: "The Pitcher Whisperer. Guided Alexander's 300th win. Called Hubbell's famous 5-K inning." },
    { location: "Family Home", affinity: "HIGH", note: "Eldest of 14. Family man. Blue-collar New England values." },
    { location: "All-Star Game", affinity: "HIGH", note: "6× All-Star. Inaugural game 1933 roster. The NL's catcher for a half-decade." },
    { location: "World Series", affinity: "LOW", note: "0-for-4 in the Fall Classic. .238 WS BA. The one place that broke him." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — the Gloamin' HR came in the most pressure-packed moment of the season",
      "Catching elite pitchers — made them better (lowest NL ERA in 1932)",
      "Home at Wrigley — 19 years of comfort, familiarity, fan support",
      "Second half surges — Hartnett teams made late pennant pushes in 1935 and 1938",
    ],
    cold_triggers: [
      "World Series play — .238 career WS BA, 0-for-4 in Fall Classics",
      "Arm injuries — the mysterious dead arm of 1929 cost him an entire season",
      "Managerial stress — he showed strain managing while catching, accused of favoritism",
      "Early-season cold — .294 in 1927, .302 in 1928 before breaking out in 1930",
    ],
    pressure_response: "SPLIT PERSONALITY. In pennant races, Hartnett is a god — the Homer in the Gloamin' is proof of divine clutch ability. But in the World Series, he's mortal. 4 WS appearances, all losses, .238 BA. The 1929 WS was especially brutal: he struck out in all 3 of his at-bats. In ILB: Hartnett's pressure response is context-dependent. Regular season and pennant races: elite. October on the biggest stage: below average. Draft him for the pennant push, not the championship.",
  },

  action_card_seeds: [
    {
      title: "Homer in the Gloamin'",
      type: "Game Action",
      text: "Bottom of the 9th, tied game, darkness falling. The umpires say this is the last inning. Your catcher-manager faces a relief ace with two strikes. The pitcher throws a high curve in the gloom. Your catcher launches it into the left field seats. Pennant won. The crowd erupts in darkness. +5 momentum, pennant clinched. But the World Series that follows is cursed: -1 to all stats in the Fall Classic.",
      origin: "September 28, 1938. Wrigley Field. Hartnett hit a walkoff HR off Mace Brown of the Pirates in near-total darkness. Most fans couldn't see the ball land. The Cubs won the NL pennant. Then lost the World Series to the Yankees in 4 games.",
    },
    {
      title: "The Capone Autograph",
      type: "Drama",
      text: "A gangster at the ballpark asks your star player for an autograph. A photographer captures the moment. The Commissioner demands the player never interact with the gangster again. Your player replies: 'That's fine. But YOU explain it to him.' +2 notoriety. 10% chance of Commissioner sanction.",
      origin: "Al Capone was at Wrigley Field on September 9, 1931. He asked Hartnett to sign an autograph for his nephew. A photographer captured it. Commissioner Landis ordered Hartnett to never do it again. Hartnett's response became legendary.",
    },
    {
      title: "The Pail of Stones",
      type: "Action",
      text: "A child breaks his arm and it doesn't heal right. His mother makes him carry a pail of stones everywhere he goes to strengthen it. Years later, that arm becomes one of the strongest throwing arms in baseball history. +2 DEF permanently. The 'Hartnett Arm' becomes a family legend.",
      origin: "Hartnett broke his arm as a child. His mother made him carry a pail of stones or sand everywhere to exercise it. The arm became legendary — his father, four brothers, and three sisters all had exceptional throwing arms.",
    },
    {
      title: "The Blimp Catch",
      type: "Action",
      text: "As a publicity stunt, a baseball is dropped from a blimp at 800 feet. Your catcher catches it barehanded. The ball is traveling 95 mph when it reaches him. +3 fan popularity, +1 toughness reputation. 10% chance of hand injury.",
      origin: "On April 1, 1930, Hartnett caught a baseball dropped from a Goodyear blimp at either 550 or 800 feet. At 800 feet, the ball would have been traveling 95.5 mph.",
    },
    {
      title: "Keep Your Mouth Shut",
      type: "Action",
      text: "A rookie's mother tells him: 'Keep your mouth shut until you see what's going on.' The rookie doesn't speak for an entire spring training. The press ironically nicknames him 'Gabby.' The nickname sticks for life. +1 composure, +1 media intrigue.",
      origin: "Before his 1922 spring training, Hartnett's mother told him to keep quiet. He didn't speak the entire trip to Catalina Island. The press sarcastically named him 'Gabby' — and it stuck for 50 years.",
    },
    {
      title: "The Mother's Prediction",
      type: "Drama",
      text: "Your catcher's throwing arm goes mysteriously dead. Doctors can't explain it. His mother predicts it will heal when his wife has their baby. The baby is born in December. Within two weeks, the arm is fine. He comes back the next year with a career-best season.",
      origin: "Hartnett's arm went dead in 1929 spring training. Nothing helped. His mother predicted it would return when his wife delivered their child. Junior was born December 4. By Christmas, the arm was healed. In 1930: .339/37 HR/122 RBI.",
    },
    {
      title: "Hubbell's Five Strikeouts",
      type: "Game Action",
      text: "In the All-Star Game, your catcher calls pitches for the NL ace. The ace strikes out five consecutive AL Hall of Famers. Your catcher receives no credit — but he called every pitch. +2 pitcher chemistry, +1 reputation as game-caller.",
      origin: "Hartnett was behind the plate when Carl Hubbell struck out Babe Ruth, Lou Gehrig, Jimmie Foxx, Al Simmons, and Joe Cronin in succession during the 1934 All-Star Game. Hartnett called every pitch.",
    },
    {
      title: "Four World Series, Zero Rings",
      type: "Drama",
      text: "Your franchise catcher reaches the World Series four times across two decades. He loses every single one. His legacy becomes: the greatest player who never won it all. -1 legacy. But the pain drives him to keep playing into his 40s, searching for the ring that never comes.",
      origin: "Hartnett appeared in the 1929, 1932, 1935, and 1938 World Series with the Cubs. They lost all four. His career WS BA was .238. He struck out in all 3 AB in the 1929 WS. He died without a ring.",
    },
  ],

  art_direction: {
    face: "Big, round, ruddy face — 'Old Tomato Face.' 6'1\" 218 lbs — thick, powerful build of a man who squats behind the plate for 1,793 games. Warm, slightly weathered complexion. Age 29 in 1930 — in his prime, strong and confident. Not conventionally handsome but immensely likable. Sardonic half-smile. Catcher's intelligence in the eyes.",
    attire: "Chicago Cubs 1930 home whites. Chest protector and shin guards visible or nearby. Catcher's mitt — the old pancake style. Maybe in a crouch behind the plate, or standing with mask pushed up on his forehead, that iconic catcher's pose. The brick and ivy of Wrigley Field suggested in the background.",
    mood: "Tough warmth. The look of a man who's been hit by foul tips a thousand times and keeps squatting. There's pain in the knees and a smile on the face. The sardonic humor of 'I wear a mask because I'm so pretty.' Not flashy — working-class New England grit wrapped in a Chicago institution.",
    style: "Warm sepia with brick-red accents (echoing both Wrigley's bricks and his 'Tomato Face' nickname). Afternoon light at Wrigley Field. The card should feel sturdy and institutional — Hartnett was the Cubs for 19 years. More substantial and grounded than the flashier Bashers cards.",
    reference: "The portrait should capture the paradox of a man who hit the most famous walkoff in pre-modern history but never won a World Series. There's triumph and tragedy in the same face. Think of the Wrigley ivy in autumn — beautiful but always ending in loss, at least until 2016.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + OPS+", tiers: [{ range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9", value: 0 }, { range: "10-19", value: 1 }, { range: "20-29", value: 2 }, { range: "30-39", value: 3 }, { range: "40-49", value: 4 }, { range: "50+", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "SB + range", tiers: [{ range: "0-5", value: 0 }, { range: "6-15", value: 1 }, { range: "16-30", value: 2 }, { range: "31-50", value: 3 }] },
  defense: { metric: "GG + reputation", tiers: [{ range: "No GG", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "PS BA + moments", tiers: [{ range: "< .250", value: 0 }, { range: ".250-.299", value: 1 }, { range: ".300+", value: 2 }], bonus: "WS/pennant hero → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };
const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function GabbyHartnettCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Catcher's crouch, mask up, Cubs whites, Wrigley Field ivy]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}><StatBar label="CON" value={s.con} max={5} color={C.gold} /><StatBar label="POW" value={s.pow} max={5} color={C.warmRed} /><StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} /><StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} /><StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SLG", val: d.real_stats.slg }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "CS%", val: "56%" }].map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1930 SEASON — {d.real_stats.games} GAMES • CATCHER HR RECORD (37)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1955 (BBWAA)", "🏅 1935 NL MVP", "⭐ 6× All-Star", "💣 37 HR (C Record 23yr)", "🌙 Homer in the Gloamin'", "🎯 56% CS Rate (#2 Ever)", "🧤 6× NL C Fielding Leader", "📸 Capone Photo"].map((a, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>))}
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Hartnett's real life, universalized as playable cards.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Hartnett's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
