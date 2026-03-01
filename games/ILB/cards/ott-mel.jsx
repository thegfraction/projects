import { useState } from "react";

const OTT_DATA = {
  name: "Mel Ott",
  nickname: "Master Melvin",
  year: 1929,
  team: "New York Giants",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "RF",
  bats: "L",
  throws: "R",
  height: "5'9\"",
  weight: "170 lbs",
  born: "March 2, 1909 — Gretna, Louisiana (father was oil refinery worker, former semipro ballplayer)",
  died: "November 21, 1958 — New Orleans, Louisiana (age 49, injuries from auto accident one week prior)",
  hof: "Inducted 1951 (BBWAA, 87.2%). 511 HR (NL record at retirement). 1933 WS champion. 12× All-Star. 6× NL HR leader. Giants retired #4. Mel Ott Award given annually to NL HR champion.",

  real_stats: {
    season: 1929, games: 150, at_bats: 545, batting_avg: ".328",
    hits: 179, doubles: 37, triples: 2, home_runs: 42,
    rbi: 151, runs: 138, stolen_bases: 6, walks: 113,
    strikeouts: 38, slg: ".635", obp: ".449", ops: "1.084",
    ops_plus: 170, war: 8.5,
    career_avg: ".304", career_hr: 511, career_rbi: 1860,
    career_hits: 2876, career_war: 107.8,
    career_walks: 1708, career_runs: 1859,
  },

  ilb_stats: {
    ovr: 11,     // Legend — 107.8 career WAR. 511 HR. 22-year career with one team. First NL 500 HR hitter. HOF 87.2%. 12× All-Star. 6× HR leader. Led Giants HR 18 consecutive years. 1933 WS champion. The NL equivalent of Jimmie Foxx.
    con: 3,      // .328 BA in 1929. .304 career. 2,876 hits. Not a pure contact hitter — he was a power/walks guy. Hit .300+ ten times but never above .349. OPS+ 170 is elite but driven by power/OBP, not pure average. CON 3.
    pow: 5,      // 42 HR at age 20 (record for players ≤20). 511 career HR (NL record). 6× HR leader. 8 seasons of 30+ HR. .533 career SLG. Led NL in SLG once. 323 of 511 HR at Polo Grounds (257 ft RF), but also hit 22 road HR in 1929 — more than home. POW 5.
    spd: 0,      // 6 SB in 1929. 56 career SB. Described as having "heavy legs" and lacking foot speed. Relied on judgment, not speed, in the outfield. SPD 0.
    def: 2,      // Premier defensive RF for most of his career. Averaged 17 outfield assists per season. Mastered Polo Grounds RF caroms. Excellent arm. Five seasons of 20+ assists. "Committed fewer than five errors seven different times." DEF 2.
    clu: 2,      // .389 BA, 2 HR, 4 RBI in 1933 WS (Giants won in 5). Hit 10th-inning HR to win Game 5. 3 NL pennants. But: never won another WS after 1933. Lost 1936 and 1937 WS to Yankees. Player-manager record was poor. CLU 2.
  },
  
  stat_justification: {
    con: ".328 BA in 1929. .304 career BA. 2,876 career hits. Hit .300+ in ten seasons, with a career high of .349 in 1930. But Ott's offensive value came primarily from power and walks, not pure contact. He walked 113 times in 1929 (led NL in walks 6 times, career 1,708 BB — NL record until Joe Morgan). His OBP (.449 in 1929) was elite, but his BA was 'merely' very good. Rating of 3 — excellent hitter, but not a .350+ contact machine.",
    pow: "42 HR in 1929 at age 20 — the most ever by a player 20 or younger (along with 151 RBI, also the record). 511 career HR — first NL player to reach 500. 6× NL HR leader. 8 seasons of 30+ HR. Led Giants in HR for 18 consecutive years (MLB record). .533 career SLG. The Polo Grounds' 257-foot RF line helped (323 of 511 HR at home), but he hit 22 road HR in 1929 — more than home. The power was real. Rating of 5.",
    spd: "6 SB in 1929. 56 career SB. Fred Lindstrom noted Ott's 'heavy legs.' A running coach was hired specifically to help the young Ott avoid leg injuries. He compensated with excellent judgment in the outfield but was never fast. Rating of 0.",
    def: "Premier defensive RF for most of his 22-year career. Averaged 17 outfield assists per 154-game season — elite. Five seasons with 20+ assists. Mastered the Polo Grounds' tricky RF wall caroms. Excellent right-handed throwing arm. 'Committed fewer than five errors seven different times.' Not fast, but positioned himself perfectly. Rating of 2.",
    clu: ".389 BA, 2 HR, 4 RBI in the 1933 WS — Giants won in 5 games over the Senators. Hit the game-winning HR in the 10th inning of Game 5 to clinch the championship. Led Giants to 3 NL pennants (1933, 1936, 1937). But lost the 1936 and 1937 WS to the Yankees. As player-manager (1942-48), never finished higher than 3rd. The 'nice guys finish last' reputation. Rating of 2 — the 1933 WS heroics earn it.",
  },

  personality: {
    leadership_style: "The Boy King. Ott arrived at 16 and never left. McGraw personally tutored him — batting, fielding, running — and forbade older players from 'corrupting' him. He was the Giants' star for 22 years, their manager for 7 more. He led through consistency, warmth, and quiet excellence. Leo Durocher: 'I never knew a baseball player who was so universally loved. Even when he was playing against the Dodgers at Ebbets Field, he would be cheered.' He was everyone's favorite — and that, according to Durocher, was the problem.",
    temperament: "Gentle, humble, universally beloved. Ott was the anti-McGraw: soft-spoken where McGraw was tyrannical, patient where McGraw was explosive, kind where McGraw was ruthless. He was beloved by teammates, opponents, fans, and even Brooklyn fans — the most hostile crowd in baseball. His decency was legendary. It was also, potentially, his managerial downfall.",
    work_ethic: "Prodigious natural talent refined by the greatest teacher. McGraw taught him everything. Ross Youngs taught him outfield play. Roger Bresnahan taught him throwing. A track coach taught him how to run. Ott absorbed it all and then performed at the highest level for 22 years. 511 HR don't happen by accident. He led the Giants in HR for 18 consecutive years — the longest such streak in MLB history.",
    lifestyle: "Louisiana boy, lifetime Giant. Born in Gretna, across the river from New Orleans. Father was an oil refinery worker. Married Mildred 'Mickey' Wattigny of New Orleans in October 1930 — they had two daughters. After managing the Giants (1942-48), he ran their farm system with Carl Hubbell, managed in the PCL, and became a radio broadcaster for the Detroit Tigers. Died at 49 from injuries in a car accident in Bay Saint Louis, Mississippi — transferred to a hospital in New Orleans, died a week later. Three Giants HOFers (Ott, Frisch, Hubbell) all died in auto-related circumstances.",
    era_adaptability: "HIGH. Ott's power (511 HR), plate discipline (1,708 BB), and defensive excellence would translate to any era. His unorthodox leg-kick batting stance might draw scrutiny from modern hitting coaches, but McGraw specifically protected it — 'I don't want anyone tinkering with that natural swing.' In modern baseball, Ott would be a .270/35 HR/100 BB right fielder with plus defense — a perennial All-Star. His lack of speed is the only limitation.",
    clubhouse_impact: "MAXIMUM POSITIVE. Ott was the single most beloved player in NL history during his era. Teammates adored him. Opponents respected him. Brooklyn fans — the toughest crowd in baseball — cheered him. He had zero enemies. Zero controversies. Zero scandals. This warmth made him a perfect clubhouse presence and a problematic manager — he couldn't discipline players he loved.",
    dark_side: "Nice guys finish last. Leo Durocher's famous (possibly paraphrased) line was aimed directly at Ott. As manager from 1942-48, Ott never finished higher than 3rd. He couldn't discipline his players. He couldn't make tough decisions. The war depleted his roster and the Mexican League poached his talent, but the fundamental problem was that Ott was too kind to manage effectively in a ruthless business. He was fired in 1948 and replaced by — who else — Durocher. The final indignity: the man who coined 'nice guys finish last' took Ott's job. Ott died at 49 in a car crash, still beloved, still gentle, still a Giant.",
  },

  chemistry_traits: [
    { tag: "The Leg Kick", desc: "Ott's unorthodox batting stance — crouching back, lifting the right foot high before swinging — generated improbable power from a 5'9\" frame. Cannot be modified by hitting coaches. Protected by McGraw's decree: 'I don't want anyone tinkering with that natural swing.'" },
    { tag: "McGraw's Protégé", desc: "When paired with a mentor/manager who personally trains Ott: +1 POW and +1 DEF. McGraw spent 3 years personally tutoring him. Without a mentor: Ott still performs, but the bond was foundational." },
    { tag: "Master Melvin", desc: "+1 team morale permanently. Ott was universally loved — by teammates, opponents, and opposing fans. No clubhouse negativity possible while Ott is on the roster." },
    { tag: "Polo Grounds Power", desc: "+2 POW at the Polo Grounds or any park with RF < 270 feet. Ott pulled everything toward the short RF porch (257 ft). At standard parks: no penalty, but no bonus. 323 of 511 career HR at home." },
    { tag: "Nice Guys Finish Last", desc: "If Ott becomes player-manager: +1 team morale, -1 team discipline. He cannot bench underperforming players. He cannot make enemies. His teams are happy but underachieving." },
    { tag: "Boy King", desc: "Debuted at 17. Full-time starter at 19. 42 HR at 20. Ott gets +1 to all stats for the first 3 seasons (youth bonus). After age 35: -1 POW per year (graceful decline)." },
    { tag: "Iron Giant", desc: "Ott played 22 years for one team. Led Giants in HR for 18 consecutive years (MLB record). +1 loyalty/franchise stability. He will never demand a trade. He will never leave." },
    { tag: "1933 World Series Hero", desc: "In the WS, Ott gets +1 CLU. .389 BA, 2 HR in the 1933 WS. Hit the walk-off HR in Game 5 to clinch. When it mattered most, the nice guy delivered." },
  ],

  preferred_locations: [
    { location: "Polo Grounds / New York", affinity: "HIGH", note: "22 years. One team. 323 HR at home. The short RF porch was his personal playground. #4 retired." },
    { location: "Right Field", affinity: "HIGH", note: "Premier defensive RF. 17 assists per season average. Mastered the Polo Grounds' tricky wall. Excellent arm." },
    { location: "Batter's Box", affinity: "HIGH", note: "511 HR. 1,708 BB. The leg kick. McGraw: 'The most natural swing I've seen in years.'" },
    { location: "Gretna, Louisiana", affinity: "HIGH", note: "Born here. A park is named in his honor. Louisiana boy who became a New York legend." },
    { location: "Manager's Office", affinity: "MEDIUM", note: "Player-manager 1942-48. Never finished above 3rd. Too kind to manage effectively." },
    { location: "Broadcast Booth", affinity: "MEDIUM", note: "Detroit Tigers broadcaster 1956-58. His post-playing career." },
    { location: "Highway / Automobile", affinity: "LOW", note: "Died at 49 in a car accident. Three Giants HOFers (Ott, Frisch, Hubbell) all died in auto-related incidents." },
  ],

  momentum: {
    hot_triggers: [
      "Youth — 42 HR at age 20. The younger Ott is, the more dangerous he becomes.",
      "Polo Grounds — 257 feet to RF. The leg kick pulls everything over the short porch.",
      "Walking — 113 BB in 1929. Ott's plate discipline extended at-bats and exhausted pitchers.",
      "October — .389 in the 1933 WS. Walk-off HR in Game 5. He rose to the moment.",
    ],
    cold_triggers: [
      "Managerial burden — player-managing drained his batting production.",
      "Road parks with deep RF — without the Polo Grounds' short porch, HR totals dropped.",
      "Discipline situations — Ott couldn't bench friends, couldn't cut veterans, couldn't be tough.",
      "Late career decline — post-1942, batting average and power gradually eroded.",
    ],
    pressure_response: "PROVEN IN OCTOBER. .389 BA, 2 HR, 4 RBI in the 1933 WS — the Giants' first championship in 11 years. Hit the walk-off HR in the 10th inning of Game 5 to clinch. Led Giants to 3 NL pennants (1933, 1936, 1937). Lost the 1936 and 1937 WS to the Yankees, but competed. The gentle man delivered when it mattered. Durocher could mock his kindness, but Ott had the WS ring — Durocher didn't get one until 1954, six years after replacing Ott.",
  },

  action_card_seeds: [
    {
      title: "Forty-Two Home Runs at Twenty Years Old",
      type: "Game Action",
      text: "Your outfielder is twenty years old. He hits 42 home runs and drives in 151 runs. No player that young has ever done this. He hits more home runs on the road (22) than at home (20), silencing the 'Polo Grounds product' critics before they even begin. The kid is real.",
      origin: "1929: Ott hit 42 HR and drove in 151 RBI at age 20 — both records for players 20 or younger that still stand. He hit 22 HR on the road vs. 20 at home.",
    },
    {
      title: "The Leg Kick",
      type: "Action",
      text: "Your hitter has the most unorthodox swing in baseball. He crouches back in the box, lifts his right foot high off the ground as the pitcher winds up, then drops it and explodes into the ball. 5'9\", 170 pounds — and 511 career home runs. McGraw forbade anyone from changing it. 'I don't want anyone tinkering with that natural swing.'",
      origin: "Ott's signature leg kick generated power from a small frame. McGraw protected the swing from the moment he signed the 16-year-old. No one was allowed to alter it.",
    },
    {
      title: "Walk-Off HR to Win the World Series",
      type: "Game Action",
      text: "Game 5 of the World Series. Tied in the 10th inning. Your right fielder launches a home run to win the championship — the first for your franchise in 11 years. He bats .389 for the Series. The nice guy delivers the biggest hit in franchise history.",
      origin: "1933 WS Game 5: Ott hit a 10th-inning HR off Washington's Jack Russell to give the Giants a 4-3 win and the championship — their first since 1922.",
    },
    {
      title: "Nice Guys Finish Last",
      type: "Drama",
      text: "Your beloved player becomes manager. Everyone loves him. Nobody fears him. He can't bench veterans. He can't make enemies. He finishes 3rd, then 4th, then 5th. The rival manager — abrasive, ruthless, brilliant — says of your guy: 'Nice guys finish last.' Then the rival takes your job.",
      origin: "Durocher's famous (possibly paraphrased) line was aimed at Ott. Ott managed the Giants 1942-48 without success. Durocher replaced him mid-1948.",
    },
    {
      title: "The Lumber Company Tryout",
      type: "Action",
      text: "Your future Hall of Famer is 16 years old. His local minor league team won't sign him because he's too small. He plays for a lumber company's semi-pro team instead. The company owner buys him a train ticket to New York. He walks into the greatest manager's office — and never leaves for 22 years.",
      origin: "1925: Ott, rejected by the New Orleans Pelicans for his size, played for Harry Williams' Patterson Grays. Williams bought Ott a train ticket to NY for a tryout with McGraw. Ott never played a game in the minors.",
    },
    {
      title: "Eighteen Consecutive Years Leading the Team in Home Runs",
      type: "Game Action",
      text: "Your right fielder leads his team in home runs for 18 straight years. No one in baseball history has ever done this. Not Ruth. Not Aaron. Not Mays. He is the constant — the one thing that never changes on a franchise that wins pennants, loses stars, survives a war, and replaces managers. He is always there. He always hits.",
      origin: "Ott led the Giants in HR every year from 1928 to 1945 — 18 consecutive seasons. Still the MLB record. Foxx and Aaron each managed 11.",
    },
    {
      title: "Cheered at Ebbets Field",
      type: "Action",
      text: "Your player is so universally beloved that even the opposing team's fans — the most hostile fans in baseball — cheer for him. Brooklyn fans, who hate every Giant, make an exception for one man. He is simply too good and too kind to boo.",
      origin: "Durocher: 'I never knew a baseball player who was so universally loved. Even when he was playing against the Dodgers at Ebbets Field, he would be cheered.'",
    },
    {
      title: "The Car Accident",
      type: "Drama",
      text: "Your legend — retired, broadcasting, still beloved — is driving through Mississippi. The car crashes. He's transferred to a hospital in his hometown. He dies a week later at 49. Three of his franchise's greatest players will all die in car-related incidents. The road takes what the diamond gave.",
      origin: "November 14, 1958: Ott was injured in a car accident in Bay Saint Louis, MS. He died November 21 in New Orleans at age 49. Frisch (1973) and Hubbell (1988) also died in auto-related circumstances.",
    },
  ],

  art_direction: {
    face: "Compact, boyish even in his prime, gentle eyes. 5'9\" 170 lbs — the smallest 500-HR hitter in history. The face should show warmth — the face that made Brooklyn fans cheer for a Giant. Not imposing. Not fierce. Kind. But with the focused determination of a man about to lift his right leg and drive a ball 400 feet.",
    attire: "New York Giants 1929 home whites with the classic 'NY' interlocked. Number 4. The Polo Grounds' distinctive horseshoe shape behind him, the absurdly short RF porch (257 feet) visible. The uniform should be clean, neat — Ott was meticulous. This is a young man's card: he's 20 years old.",
    mood: "The Leg Kick. Frozen at the apex — right foot high off the ground, bat cocked, eyes locked on the pitcher. The moment before the swing that generated 511 home runs from a 5'9\" frame. Or: the follow-through of the walk-off HR in Game 5 of the 1933 WS, arms raised, Polo Grounds erupting. The card should feel improbable — too small, too gentle, too kind — and yet undeniable.",
    style: "New York glamour meets Louisiana warmth. Art Deco Giants. The Polo Grounds at golden hour. The card should feel timeless — Ott played 22 years and the card should suggest all of them. Warm golds, Giants orange, deep blue sky. The most beloved card in the set.",
    reference: "The card of the nicest man in baseball who hit 511 home runs. The boy who showed up at 16 and stayed for 22 years. The protégé who became the legend. Master Melvin — the gentle Giant.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG ≥ .600 → +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples ≥ 10 → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CON×2 + POW×2 + SPD×1 + DEF×1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function MelOttCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = OTT_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: The Leg Kick — right foot raised high, compact frame, Giants whites #4, Polo Grounds short RF porch, golden hour]</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "BB", val: d.real_stats.walks },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — AGE 20 — RECORD 42 HR / 151 RBI FOR A PLAYER ≤20</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1933 WS Champion", "🏛 HOF 1951 (87.2%)", "💣 511 Career HR", "⭐ 12× All-Star", "👑 6× NL HR Leader", "📊 107.8 Career WAR", "🔥 18 Yrs Leading Team HR"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Ott's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Ott's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
