import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: ALLIE REYNOLDS
  // Year Snapshot: 1952 (Peak — 20 Wins, AL ERA Title, 6× WS Champ)
  // ═══════════════════════════════════════════════════════════════

  name: "Allie Reynolds",
  nickname: "Superchief",
  year: 1952,
  team: "New York Yankees",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "195 lbs",
  born: "February 10, 1917 — Bethany, OK",
  died: "December 26, 1994 — Oklahoma City, OK (age 77)",
  hof: "Not inducted. Peak 33.6% on BBWAA ballot (1968). Monument Park plaque (1989). 6× WS Champ.",

  real_stats: {
    season: 1952, games: 35, wins: 20, losses: 8, era: "2.06",
    innings: "244.1", strikeouts: 160, walks: 97, complete_games: 24,
    shutouts: 6, whip: "1.12", war: 7.5,
    career_wins: 182, career_losses: 107, career_era: "3.30",
    career_strikeouts: 1423, career_cg: 137, career_shutouts: 36,
    career_war: 44.3, no_hitters: 2, saves: 40,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF (STF) — 2.06 ERA → tier 3 (2.00-2.49). K/9 = 5.89 → no bonus (<6.0). STF = 3.
  // CONTROL (CTL) — BB/9 = 3.57 → tier 0 (3.0+). WHIP 1.12 → no bonus. CTL = 0.
  // STAMINA (STA) — 244.1 IP → tier 2 (200-249). But also 6 saves — dual role. STA = 2.
  // DEFENSE (DEF) — Decent fielding pitcher. No standout defensive metrics. DEF = 0.
  // CLUTCH (CLU) — WS: 7-2, 2.79 ERA in 77 IP. Won/saved clinching games in 1950, 1952, 1953.
  //   PS ERA < 3.00 → tier 2. WS clinching wins → +1 = 3. Maximum clutch.
  // OVERALL — STF×2 + CTL×1.5 + STA×1 + DEF×0.5 = 6+0+2+0 = 8 → normalized.
  //   6× WS champ, .630 win%, versatile starter/reliever, but not HOF.
  //   OVR = 8 (All-Star tier — elite October pitcher, borderline HOF).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — 6× WS champ, elite October, borderline HOF
    stf: 3,      // 2.06 ERA → tier 3. K/9 5.89 → no bonus (misses 6.0 threshold by .11). STF = 3.
    ctl: 0,      // BB/9 3.57 → tier 0 (3.0+). Wild throughout career — 130 BB in 1945. CTL = 0.
    sta: 2,      // 244.1 IP → tier 2. But also functioned as reliever (40 career saves). Dual role limits IP.
    def: 0,      // Adequate fielding pitcher. No exceptional defensive metrics. DEF = 0.
    clu: 3,      // WS: 7-2, 2.79 ERA. Won/saved clinching games in 1950, 1952, 1953. Maximum clutch.
  },

  stat_justification: {
    stf: "2.06 ERA in 1952 — led the AL. ERA+ of 161. K/9 of 5.89 is tantalizingly close to the 6.0 bonus threshold but misses. Reynolds had a blazing fastball — coach Hank Iba discovered him throwing javelins and saw the arm speed. Birdie Tebbetts compared him to the fastest pitchers of the era. But his dominance came from a complete repertoire (fastball, curve, slider) rather than overwhelming pure stuff. Rating of 3.",
    ctl: "BB/9 of 3.57 in 1952 — 97 walks in 244 innings. Reynolds was wild his entire career. He led the majors in HBP in 1943 and in walks in 1945 (130). Even in his best years, he walked too many batters. He relied on stuff and guts rather than precision. WHIP 1.12. Rating of 0 — his control was genuinely poor.",
    sta: "244.1 IP in 1952 with 24 complete games. But Reynolds was unique: he was both a starter and a reliever throughout his career. 309 starts and 125 relief appearances. 40 career saves alongside 182 wins. His IP was lower than pure aces because the Yankees used him flexibly. Rating of 2.",
    def: "No standout defensive metrics as a pitcher. Reynolds was an adequate fielder. He did bat .308 in World Series play — unusually good for a pitcher. But no Gold Glove equivalence. Rating of 0.",
    clu: "World Series: 7-2, 2.79 ERA in 77 innings across 15 games. Won or saved the clinching game in 1950 (10 IP, 1 ER in Game 2), 1952 (save in Game 6, win in Game 7), and 1953 (save in Game 6). 1949 WS Game 1: 2-hit shutout, 1-0. Two no-hitters in 1951, including a pennant-clincher. The man was made for October. Maximum clutch rating of 3.",
  },

  personality: {
    leadership_style: "Quiet authority rooted in physical dominance. Reynolds wasn't a rah-rah leader — he was the man teammates trusted with the ball when everything was on the line. Bobby Brown called him 'the one at the top, the real leader.' Manager Casey Stengel used him in every possible role because Reynolds never refused. He led by answering the call, not by making speeches.",
    temperament: "Stoic, unflappable, ice-cold under pressure. When Yogi Berra dropped the foul pop that would have completed his second no-hitter, Reynolds walked over and said: 'Don't worry Yogi, we'll get him again.' He then threw the exact same pitch to Ted Williams, who popped up again. Berra caught it this time. Reynolds played with bone chips in his elbow in 1951 and never mentioned it. Muscogee warrior ethos — endurance without complaint.",
    work_ethic: "Relentless versatility. Reynolds started, relieved, closed — whatever the team needed. He threw 244 IP in 1952 while also recording 6 saves. He pitched in 15 World Series games — 9 starts, 6 relief appearances. His willingness to do everything asked of him is the defining trait. He also built an oil business during his playing years, arriving at spring training as both a pitcher and a businessman.",
    lifestyle: "Oklahoma through and through. Born in Bethany, attended Oklahoma A&M (now Oklahoma State), returned to Oklahoma after retirement. Member of the Muscogee (Creek) Nation — his heritage was central to his identity, though he was uncomfortable with the 'Chief' nickname because of the sacred meaning of that title. Built a successful oil business while still playing. Married to Earlene, raised a family. Became president of the revived American Association after baseball.",
    era_adaptability: "HIGH. Reynolds's fastball-curve-slider combination, combined with his willingness to start or relieve, would make him a modern manager's dream. He'd be the ideal 'opener' or 'fireman' in today's game — or a dominant starter if used traditionally. His walks would be a concern, but his October pedigree is timeless. The two no-hitters in one season places him in elite company regardless of era.",
    clubhouse_impact: "RESPECTED-STEADY. Reynolds was part of the legendary 'Big Three' with Vic Raschi and Eddie Lopat. The three starters anchored five consecutive World Series championships (1949-53). Reynolds was the power arm, Raschi the workhorse, Lopat the craftsman. Teammates called him 'Chief' behind his back — with deep respect, not mockery. Bobby Brown: 'We felt he was the one at the top.'",
    dark_side: "The Hall of Fame snub. Reynolds peaked at 33.6% on the BBWAA ballot in 1968 — ahead of future HOFers Newhouser, Rizzuto, Reese, and Kell — but never got closer. His versatility (starter/reliever split) hurt his counting stats. His career was shortened by bone chips and a bus accident in 1953 that aggravated a back injury. He was considered by the Veterans Committee in 2009 and 2014 but not selected. In ILB terms: Reynolds carries a 'Hall of Fame Snub' trait — his legacy is forever incomplete despite extraordinary accomplishment.",
  },

  chemistry_traits: [
    { tag: "Superchief", desc: "Muscogee (Creek) Nation member. +1 respect from all teammates. The name evokes 'elegance, power, and speed' — like the Santa Fe railroad train." },
    { tag: "October Ice", desc: "7-2 WS record, 2.79 ERA. In elimination games and clinching scenarios, +2 STF. Reynolds was built for pressure." },
    { tag: "Big Three", desc: "Reynolds-Raschi-Lopat anchored 5 straight WS titles. When all three are on the same staff, +2 team pitching rating." },
    { tag: "Swiss Army Arm", desc: "Can start or relieve in any game with no penalty. 309 starts, 125 relief appearances, 40 saves. Ultimate versatility." },
    { tag: "DiMaggio's Pick", desc: "Joe DiMaggio personally recommended the Yankees trade for Reynolds. +1 chemistry with DiMaggio and all Yankee legends." },
    { tag: "Bone Chips", desc: "Played the 1951 season with bone chips in his throwing elbow. 10% chance per season of injury flaring up, causing -1 STF." },
    { tag: "Oil Baron", desc: "Built an oil business while still playing. +1 to post-career financial stability. Reynolds never needed baseball after baseball." },
    { tag: "Don't Worry Yogi", desc: "When Berra dropped the no-hitter foul pop: 'We'll get him again.' Prevents teammate panic after errors — +1 composure to catcher." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "Start, relieve, close — Reynolds lived on the mound in every role." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Quiet presence, respected leader. The man they wanted on the mound when it mattered." },
    { location: "Oklahoma / Home", affinity: "HIGH", note: "Born and buried in Oklahoma. Creek Nation heritage. Oil business. Always went home." },
    { location: "Oil Field / Business Office", affinity: "MEDIUM", note: "Built oil business during playing career. Arrived at spring training as businessman-pitcher." },
    { location: "Restaurant / Team Dinner", affinity: "MEDIUM", note: "Social within the team. Part of the Big Three camaraderie with Raschi and Lopat." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a nightlife player. Professional, focused." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  momentum: {
    hot_triggers: [
      "World Series and elimination games — Reynolds elevated his game in October every time",
      "Pennant race pressure — second no-hitter was a pennant-clincher vs. Boston",
      "Ace-vs-ace matchups — thrived when facing Feller, Lemon, and other top starters",
      "Dual-role deployment — when asked to start AND relieve in a series, Reynolds gets better",
    ],
    cold_triggers: [
      "Control lapses — Reynolds could lose the strike zone for stretches, walking 4+ in a game",
      "Physical ailments — bone chips, back injury from 1953 bus accident limited late-career effectiveness",
      "Early-season rust — Reynolds often started slowly before heating up in summer and fall",
    ],
    pressure_response: "ELITE OCTOBER PERFORMER. Reynolds's World Series numbers (7-2, 2.79 ERA, 77 IP) place him among the greatest postseason pitchers ever. He won or saved the clinching game in three different World Series. He threw a 2-hit shutout in Game 1 of the 1949 WS, then came back to save Game 4. In 1952, he won Game 4, saved Game 6, and won Game 7 in relief. The pattern is unmistakable: the bigger the moment, the better Reynolds pitched. Maximum pressure performance.",
  },

  action_card_seeds: [
    {
      title: "DiMaggio's Recommendation",
      type: "Drama",
      text: "Your team needs a pitcher. The opposing GM offers you a choice of two arms. Your franchise player whispers: 'Take Reynolds.' You listen. He becomes the ace of a dynasty.",
      origin: "Cleveland offered the Yankees any pitcher except Feller for Joe Gordon. DiMaggio told GM Larry MacPhail to take Reynolds over Red Embree. DiMaggio was right — Reynolds anchored 6 WS titles.",
    },
    {
      title: "Two No-Hitters in One Season",
      type: "Game Action",
      text: "Your ace throws his second no-hitter of the season. On the last out, the catcher drops the pop foul. Your pitcher walks over calmly and says: 'Don't worry — we'll get him again.' Same pitch. Same pop-up. Caught this time. The pennant is clinched.",
      origin: "September 28, 1951. Reynolds's second no-hitter — a pennant-clincher vs. Boston. Ted Williams popped up. Berra dropped it. Reynolds threw the same pitch. Williams popped up again. Berra caught it.",
    },
    {
      title: "The Clincher",
      type: "Game Action",
      text: "Your ace starts the series. Then he comes out of the bullpen to save the next game. Then he relieves again to win the clincher. One pitcher, three appearances, one championship.",
      origin: "1952 WS: Reynolds started Game 1 (loss), started and won Game 4 (2-0 shutout), saved Game 6 (2 outs), won Game 7 in relief (3 IP). Three appearances in four games to close the series.",
    },
    {
      title: "The Javelin Thrower",
      type: "Drama",
      text: "A college coach spots a track athlete throwing javelins and sees a pitcher's arm. He recruits the athlete to the baseball team. The javelin thrower becomes a multi-sport star, then a professional baseball ace.",
      origin: "Oklahoma A&M coach Hank Iba spotted Reynolds throwing javelins in 1937. He recruited him to baseball. Reynolds became a two-sport star before choosing pro baseball over the NFL.",
    },
    {
      title: "The Oil Well Investor",
      type: "Action",
      text: "Your star pitcher spends winters building an oil business. By the time he retires from baseball, he's already wealthy. He never needs the game again — he walks away on his own terms.",
      origin: "Reynolds invested in Oklahoma oil wells during his playing career. After retirement, the oil business made him financially independent — rare for a player of his era.",
    },
    {
      title: "Swiss Army Pitcher",
      type: "Action",
      text: "Your manager needs a starter on Tuesday, a reliever on Thursday, and a closer on Saturday. One pitcher volunteers for all three. He goes 7-2 in the postseason doing everything asked of him.",
      origin: "Reynolds made 309 starts and 125 relief appearances. He had 182 wins and 40 saves. In the WS, he started 9 games and relieved in 6, recording wins or saves in each relief outing.",
    },
    {
      title: "Playing Through Bone Chips",
      type: "Action",
      text: "Your ace has bone chips in his throwing elbow. He tells nobody. He throws two no-hitters, finishes 3rd in MVP voting, and helps the team win the World Series. The injury is revealed only afterward.",
      origin: "Reynolds pitched the entire 1951 season — including both no-hitters and the World Series — with bone chips in his right elbow. He never disclosed the injury during the season.",
    },
    {
      title: "The Muscogee Nation's Pitcher",
      type: "Drama",
      text: "A Native American pitcher becomes one of the greatest in his league. The press calls him 'Chief' and 'Superchief.' He's uncomfortable with the title — in his culture, 'chief' is sacred. But his teammates use it with genuine reverence, not mockery. A statue is erected on the reservation.",
      origin: "Reynolds, a Muscogee (Creek) Nation member, was nicknamed 'Superchief' after the Santa Fe Railroad train. Bobby Brown said the name fit for 'elegance, power, and speed.' The Muscogee Nation erected a statue in his honor.",
    },
  ],

  art_direction: {
    face: "Ruggedly handsome at 6'0\" 195 lbs. Strong, athletic build. Native American features — high cheekbones, dark hair, intense dark eyes. The bearing of quiet authority — not flashy, not boastful, just utterly confident. The face of a man who threw two no-hitters in one season with bone chips in his elbow.",
    attire: "New York Yankees home pinstripes, 1952 style. Classic postwar wool flannel. Right-handed pitcher in mid-delivery — the blazing fastball about to leave his hand. Cap pulled low, shadowing the eyes. The embodiment of Yankee pitching dominance.",
    mood: "Ice-cold composure. The moment after Berra dropped the ball — Reynolds walking over, calm as stone, saying 'We'll get him again.' No panic, no frustration, just absolute certainty. The card should feel inevitable, like the outcome was never in doubt.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Yankee Stadium in the early 1950s — the cathedral of baseball, packed for a World Series game. October light filtering through the upper deck. The card should feel like dynasty — five straight championships are being forged.",
    reference: "Think the Yankees at their most dominant — the Big Three era, DiMaggio fading into Mantle's dawn. Reynolds was the bridge between dynasties, the constant. The card should convey both power and reliability — this is the man you give the ball to when everything is on the line.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA + K/9", tiers: [{ range: "ERA 3.50+", value: 0 },{ range: "ERA 3.00-3.49", value: 1 },{ range: "ERA 2.50-2.99", value: 2 },{ range: "ERA 2.00-2.49", value: 3 },{ range: "ERA 1.50-1.99", value: 4 },{ range: "ERA <1.50", value: 5 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 + WHIP", tiers: [{ range: "BB/9 3.0+", value: 0 },{ range: "BB/9 2.5-2.99", value: 1 },{ range: "BB/9 2.0-2.49", value: 2 },{ range: "BB/9 1.5-1.99", value: 3 },{ range: "BB/9 1.0-1.49", value: 4 },{ range: "BB/9 <1.0", value: 5 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199 IP", value: 1 },{ range: "200-249 IP", value: 2 },{ range: "250-299 IP", value: 3 },{ range: "300-349 IP", value: 4 },{ range: "350+ IP", value: 5 }] },
  defense: { metric: "Fielding + Gold Gloves (pitcher)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG equivalent", value: 1 },{ range: "3-5 GG equivalent", value: 2 },{ range: "6+ GG equivalent", value: 3 }] },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00 or no PS", value: 0 },{ range: "PS ERA 3.00-4.00", value: 1 },{ range: "PS ERA < 3.00", value: 2 }], bonus: "WS clinching win → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function AllieReynoldsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, mid-delivery, Yankees pinstripes, Yankee Stadium]</div>
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
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "SAVES", val: d.real_stats.saves }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 13 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 6× WS Champ", "⭐ 6× All-Star", "👑 1952 AL ERA Title", "💎 2× No-Hitter (1951)", "📊 7-2 WS Record", "🔥 160 K in '52", "🏟️ Monument Park", "🛢️ Oil Baron"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Reynolds's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Pitcher Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Modified engine for pitchers: STF/CTL/STA replace CON/POW/SPD.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Reynolds's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
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
