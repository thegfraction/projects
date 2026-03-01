import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}veach-bobby.png`;

const PLAYER_DATA = {
  name: "Bobby Veach",
  nickname: "The Forgotten Tiger",
  year: 1919,
  team: "Detroit Tigers",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "LF",
  bats: "L",
  throws: "R",
  height: '5\'11"',
  weight: "160 lbs",
  born: "June 29, 1888 — Island, KY",
  died: "August 7, 1945 — Detroit, MI (age 57)",
  hof: "NOT INDUCTED. Received exactly 1 vote in 1937. Played alongside three Hall of Fame outfielders (Cobb, Crawford, Heilmann) and disappeared behind all of them. .310 career BA, 2,063 H, 3× AL RBI leader, led AL in hits/doubles/triples in 1919. Nobody in baseball had more RBI or XBH from 1915 to 1922. One vote.",

  real_stats: {
    season: 1919, games: 139, at_bats: 538, hits: 191, doubles: 45,
    triples: 17, home_runs: 3, rbi: 101, runs: 87, stolen_bases: 13,
    batting_avg: ".355", obp: "~.404", slg: "~.489", ops_plus: "~156",
    war: "~6.3",
    career_avg: ".310", career_hits: 2063, career_hr: 64,
    career_rbi: 1044, career_sb: 195, career_2b: 345, career_3b: 136,
    career_games: 1821, career_seasons: 14,
    rbi_titles: "3× AL RBI Leader (1915, 1917, 1918)",
    league_leads: "Led AL: Hits (1919), Doubles (1915, 1919), Triples (1919)",
    cycle: "First Tiger to hit for the cycle (Sept 17, 1920 — 6 hits, 6 RBI)",
    greatest_outfield: "1915 Tigers OF (Veach/Cobb/Crawford) — Bill James: greatest outfield ever",
    spotted_gehringer: "Spotted Charlie Gehringer in a sandlot game, arranged HOF career",
    pinch_hit_ruth: "Only player to pinch-hit for Babe Ruth after he became an outfielder (1925)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB POSITION PLAYER STAT CONVERSION
  //
  // CON: BA tiers (.330+=5, .300-.329=4, .270-.299=3, .240-.269=2, .210-.239=1, <.210=0) + OPS+ ≥ 130 bonus (cap 5)
  // POW: HR tiers (40+=5, 30-39=4, 20-29=3, 10-19=1, 0-9=0) + SLG ≥ .500 bonus
  // SPD: SB tiers (46+=5, 31-45=4, 16-30=2, 6-15=1, 0-5=0)
  // DEF: Fielding evaluation (0-3)
  // CLU: Postseason performance (0-3)
  // OVERALL: CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite / MVP — one of the most productive hitters in the AL for nearly a decade. 3× RBI leader. Led AL in hits, doubles, triples. Career .310 BA, 2,063 H. But: zero postseason, overshadowed by three HOF teammates, 1 HOF vote.
    con: 5,      // .355 BA in 1919 → tier 5 (.330+). OPS+ ~156 → ≥130 bonus, already at cap. Led AL in hits (191), doubles (45), triples (17) same season. Career .310 BA, 2,063 H. "Picturesque swing." "Full and free swinger" who held bat at end of knob. Rating: 5.
    pow: 2,      // Peak HR was 16 (1921) → tier 1 (10-19). SLG in best power season ~.500-.510 → ≥.500 bonus → +1 = 2. Career: 64 HR, 345 2B, 136 3B. The power was real — enormous extra-base production — but expressed as doubles and triples rather than HR. "Packed a terrific punch for his size." Rating: 2.
    spd: 2,      // Peak SB ~23-26 (1913-1917) → tier 2 (16-30). 195 career SB. 136 career 3B — elite triples rate showing real speed. Good range in LF. Rating: 2.
    def: 2,      // Led AL LF in putouts 7 times (1915-22), assists 2×, DP 3×, fielding % 3×, range factor 2×. Bested Cobb in outfield chances 7 of 9 years playing side by side. "Strong and accurate arm and good natural speed." But started as a pitcher, described as "awkward" early. Worked hard to become accomplished fielder. Very good LF, not Speaker-level. Rating: 2.
    clu: 0,      // ZERO. The Tigers never reached the World Series during Veach's prime (1913-1923). His only WS appearance was a single pinch-hit at-bat for Washington in the 1925 WS Game 6 (grounded out). Zero meaningful October performance. The greatest tragedy of a great career — no stage. Rating: 0.
  },

  stat_justification: {
    con: ".355 BA in 1919 → tier 5 (.330+). OPS+ estimated ~156 in 1919 — comfortably above the ≥130 bonus threshold, but already at max. Led AL in hits (191), doubles (45), and triples (17) — all three in the same season. Career .310 BA with 2,063 hits. Only player born in Kentucky with 2,000 H and 1,000 RBI. 'Picturesque swing' — left-handed, full and free, held bat at end of knob. 'Packed a terrific punch for his size.' Finished .300+ in 8 of 9 seasons from 1915-1923. Nobody in baseball had more RBI or extra-base hits than Veach from 1915-1922. Rating of 5.",
    pow: "Peak HR: 16 in 1921 → tier 1 (10-19). SLG in power seasons ~.500-.510 → ≥.500 bonus → +1 = 2. Career: 64 HR, 345 2B, 136 3B. The power was enormous but expressed in dead-ball/transition-era terms — doubles and triples rather than home runs. In 14 seasons he averaged 35 doubles, 13 triples, and 6 HR per year. First Tiger to hit for the cycle (1920 — 6 hits, 6 RBI). Led AL in doubles twice, triples once. Rating of 2.",
    spd: "Peak SB: ~23-26 in 1913-1917 → tier 2 (16-30). 195 career SB. 136 career triples — an elite triples rate that reflects real speed. Good range to play LF effectively in the dead-ball era's expansive outfields. Not a burner but a legitimately fast player who used his speed for extra bases and defense. Rating of 2.",
    def: "Led AL left fielders in putouts 7 times (1915-22) — remarkable consistency. Led AL LF in assists twice, double plays 3 times, fielding percentage 3 times, range factor twice. Bested Cobb in outfield chances 7 of 9 years they played side by side — despite Cobb being the center fielder. 'Strong and accurate arm and good natural speed.' Started as a pitcher (10-5 in 1910), converted to OF in 1911 — 'awkward' early but worked hard to become accomplished. Very good LF, not transcendent. Rating of 2.",
    clu: "ZERO — but NOT by fault. The Tigers won 100 games in 1915 and finished SECOND, one game behind Boston. Veach never played in a World Series during his prime years (1913-1923). His only postseason appearance: one pinch-hit at-bat for the 1925 Washington Senators in WS Game 6 (grounded out to second). The greatest hitter with no October stage in the dead-ball era. Rating of 0 — the cruelest zero in the Muggers.",
  },

  personality: {
    leadership_style: "THE ANTI-COBB. Where Cobb was fierce, volatile, and combative, Veach was easygoing, warm, and friendly. He smiled at the plate. He joked with opposing pitchers. He made friends everywhere — in Chicago, St. Louis, across the league. Fred Lieb: 'friendly as a Newfoundland pup with opponents as well as teammates.' Cobb despised this quality and actively tried to eliminate it. Veach's leadership was in his consistency and his warmth — the stable, reliable, happy presence in a clubhouse dominated by the most terrifying competitor in baseball history.",
    temperament: "'Happy-go-lucky guy, not too brilliant above the ears' — Fred Lieb. Veach was smart enough to hit .310 for 14 years and lead the league in multiple categories, but he was a coal miner's son with no pretensions to intellectualism. He was steady, unassuming, good-natured. He didn't carry grudges (even when Cobb orchestrated a season-long hazing campaign, Veach responded by hitting .338). The temperament was his greatest strength and, in Cobb's eyes, his greatest weakness.",
    work_ethic: "SELF-MADE. Started as a pitcher (10-5 in 1910). Converted to outfield in 1911. Was 'awkward' as a fielder and on the basepaths in the minors. Worked hard enough to lead AL left fielders in putouts 7 times. Improved his batting from .269 (1913) to .355 (1919). Coal miner at 14, ballplayer at 17, .310 career hitter by sheer labor. The work ethic was forged in the Kentucky mines.",
    lifestyle: "COAL COUNTRY TO DIAMOND. Born in Island, Kentucky. Father was a coal miner. Veach worked in the mines from age 14 until 'a couple years ago, long after I was earning money as a player' (1915 interview). Moved to Herrin, Illinois at 17 for semi-pro ball. Married Ethel Clare Schiller. Two sons. After baseball: Toledo Mud Hens (led league in batting at age 40 — .382 in 1928), then purchased a coal company in 1933. The coal miner's son became a coal mine owner. Serious abdominal surgery in 1943. Never fully recovered. Died at 57, likely lung cancer — the mines may have followed him home.",
    era_adaptability: "EXCELLENT. Veach's swing — 'full and free,' from the heels, bat held at the end — was a power hitter's swing trapped in a dead-ball era. His SABR bio compares him to Mel Ott. In the 1930s with a short right-field fence, Veach could have been a 25-30 HR hitter with .320+ averages. He was one of the few dead-ball hitters whose style anticipated the lively-ball era. Had his career started 10 years later, he's likely a Hall of Famer.",
    clubhouse_impact: "THE WARMTH. Veach was the human center of the Tigers clubhouse — the friendly face that offset Cobb's volcanic intensity. He made friends across the league. He smiled at the plate. He was 'as friendly as a Newfoundland pup.' This quality drove Cobb insane, but it made Veach beloved by teammates and opponents alike. In ILB: +2 team morale, +1 opponent respect, -1 Cobb's opinion. The warmth was his gift and his curse.",
    dark_side: "The invisibility. Veach played alongside three Hall of Famers (Cobb, Crawford, Heilmann) and received exactly 1 HOF vote. He was one of the most productive hitters in baseball for a decade and is almost completely forgotten. Nobody in baseball had more RBI or XBH from 1915-1922 — and he's a trivia answer. Cobb tried to trade him for years and finally succeeded after 1923. The hazing scheme (ordering Heilmann to insult Veach all season) was Cobb's cruelty at its pettiest. And: the coal mines. Veach worked in them from 14. His father worked in them. He bought one after baseball. He died at 57, possibly from what the mines put in his lungs. The coal follows you.",
  },

  chemistry_traits: [
    { tag: "The Greatest Outfield", desc: "Veach/Cobb/Crawford (1915): Bill James's greatest outfield ever. When all three are on the roster: +2 CON team-wide, +1 DEF outfield, combined 323 RBI." },
    { tag: "The Anti-Cobb", desc: "Veach is the opposite of Cobb in every way except hitting. +2 team morale when both are on roster, but Cobb resents it: -1 to their personal chemistry." },
    { tag: "Three RBI Titles", desc: "Led AL in RBI 3 times (1915, 1917, 1918). +1 RBI production inherent. Veach drove in runs like clockwork — the most reliable run producer in the dead-ball AL." },
    { tag: "The Picturesque Swing", desc: "Full and free, from the heels, bat held at the knob. Veach's swing was a power hitter's swing in a dead-ball era. +1 POW in any lively-ball stadium or era." },
    { tag: "Coal Miner's Son", desc: "Worked the Kentucky mines from age 14. The toughness is permanent. +1 durability (14 seasons). But: -1 longevity post-career. The mines follow you." },
    { tag: "Friendly as a Newfoundland Pup", desc: "Veach makes friends everywhere — opponents, umpires, pitchers. +1 opponent respect (opponents play cleanly against him). -1 intimidation." },
    { tag: "The Scout's Eye", desc: "Spotted Charlie Gehringer in a sandlot game and arranged his HOF career. 10% chance per season of discovering a future star on a minor league or amateur team." },
    { tag: "One Vote", desc: "Received exactly 1 HOF vote in 1937. The most productive forgotten player of his era. -2 legacy. +0 recognition. The cruelty of shadows." },
  ],

  preferred_locations: [
    { location: "Left Field (Navin Field)", affinity: "HIGH", note: "12 years as Detroit's starting LF. Led AL LF in putouts 7 times. His position." },
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".355 in 1919. Led AL in hits, doubles, triples. 'Picturesque swing.'" },
    { location: "Detroit / Navin Field", affinity: "HIGH", note: "1912-23. The only real baseball home he knew. Fans gave him a diamond ring when he returned in 1924." },
    { location: "Coal Country (Kentucky)", affinity: "MEDIUM", note: "Born in Island, KY. Mined coal from age 14. Bought a coal company after baseball. The mines shaped everything." },
    { location: "The World Series", affinity: "LOW", note: "One pinch-hit AB in 1925 WS (grounded out). Zero meaningful October. The greatest absence on this card." },
  ],

  momentum: {
    hot_triggers: [
      "Batting cleanup — Veach was Detroit's cleanup hitter for nearly a decade; in the 4-spot, +1 all hitting stats",
      "Alongside greatness — when playing with HOF-caliber teammates, Veach elevates; the 1915 outfield syndrome",
      "Doubles and triples — Veach streaks in extra-base hits; once he starts doubling, the momentum compounds",
      "Good company — Veach responds to warmth and stability; positive clubhouse = peak Veach",
    ],
    cold_triggers: [
      "Hazing and hostility — Cobb's 1921 scheme (ordering Heilmann to insult Veach all year) initially disrupted him before it worked",
      "No October stage — the Tigers never made the WS during his prime; the absence of pressure is its own kind of cold trigger",
      "Aging — by 1923 (age 35), RBI dropped to 39; the body was wearing down (coal miner's body, ballplayer's mileage)",
      "Invisibility — when overlooked or undervalued, Veach doesn't fight for recognition; he just keeps hitting .310 and stays forgotten",
    ],
    pressure_response: "UNKNOWN — and that's the tragedy. Veach never got a real chance to perform in the postseason. The 1915 Tigers won 100 games and finished second by ONE game. The Tigers never reached the WS during Veach's prime. His only WS appearance: one pinch-hit groundout for Washington in 1925. We'll never know what Veach would have done in October. In ILB: CLU 0 is the absence of data, not the proof of failure. The greatest what-if in the Muggers roster.",
  },

  action_card_seeds: [
    { title: "The Greatest Outfield", type: "Game Action", text: "Your outfield is Veach in left, Cobb in center, Crawford in right. Together they hit .372 and drive in 323 runs. Bill James calls them the greatest outfield ever assembled. +3 CON outfield, +2 RBI production, +1 all-time legacy. The three of them combined can hit anything thrown by any pitcher alive.", origin: "The 1915 Tigers outfield (Veach .313/112 RBI, Cobb .369/99 RBI, Crawford .299/112 RBI) is ranked by Bill James as the greatest outfield in baseball history." },
    { title: "Led the League in Everything", type: "Game Action", text: "Your left fielder leads the league in hits, doubles, AND triples in the same season. Only Cobb and Ruth top him in anything. He bats .355. He is 31 years old and at the peak of his powers. He will receive exactly one Hall of Fame vote. +3 CON, +2 all-around, -2 recognition.", origin: "1919: Veach led AL in hits (191), doubles (45), triples (17), batted .355 (2nd to Cobb), and was 2nd to Ruth in XBH and TB." },
    { title: "One Hundred Games, Second Place", type: "Drama", text: "Your team wins 100 games. Your outfield is the greatest ever assembled. You finish second by one game. There will be no World Series. Your left fielder, who drove in 112 runs and led the league in doubles, will go home without a ring. He will never get this close again.", origin: "1915: The Tigers went 100-54 with the greatest outfield in history and finished second to the Red Sox by one game." },
    { title: "The Coal Miner's Swing", type: "Game Action", text: "Your left fielder holds the bat at the end of the knob and swings from his heels — the swing of a man who learned to swing a pickaxe before he learned to swing a bat. The ball rockets into the gap. Double. Again. And again. He leads the league in doubles. The mines built the arms; the arms build the stats.", origin: "Veach was a coal miner from age 14. He held the bat at the end and swung 'full and free' — a power hitter's approach in a dead-ball era." },
    { title: "Six Hits for the Cycle", type: "Game Action", text: "September 17, 1920. Your left fielder goes 6-for-7 with a home run, triple, double, three singles, and 6 RBI. He becomes the first player in franchise history to hit for the cycle. +3 CON, +2 POW, +1 franchise history.", origin: "Veach became the first Tiger to hit for the cycle on Sept 17, 1920 — 6 hits, 6 RBI in a 12-inning game." },
    { title: "Cobb's Hazing Scheme", type: "Drama", text: "Your manager secretly orders the player batting behind your left fielder to insult him all season — to yell at him, taunt him, make him angry. The plan is to 'light a fire' in a man who smiles too much. Your left fielder responds by hitting .338. The outfield combines for .372 and 368 RBI. Then the manager denies everything. -1 team trust, +2 CON (anger works).", origin: "1921: Cobb ordered Heilmann to insult Veach all season. Veach hit .338. The Tigers OF combined .372/641 H/368 RBI. Cobb denied orchestrating it." },
    { title: "The Scout's Eye", type: "Drama", text: "Your aging outfielder spots a kid playing sandlot ball. Something about the kid's hands, his feet, his instincts. He arranges a tryout. The kid becomes a Hall of Famer. Your outfielder gets a footnote. +5 scouting legacy, +0 personal recognition.", origin: "Veach spotted Charlie Gehringer in a sandlot game and arranged his tryout with Detroit. Gehringer had a Hall of Fame career." },
    { title: "One Vote", type: "Drama", text: "The Hall of Fame ballots are counted. Cobb gets in. Crawford gets in. Heilmann gets in. Your left fielder — who played alongside all three, who led the league in RBI three times, who had 2,063 hits and a .310 career average — receives exactly one vote. He dies eight years later at 57. The coal mines and the shadows claim him both. -3 legacy, +1 quiet dignity.", origin: "Veach received exactly 1 HOF vote in 1937. He died in 1945, age 57, possibly of lung cancer. The coal miner's son, forgotten." },
  ],

  art_direction: {
    face: "WARM, STEADY, UNASSUMING, FORGOTTEN. 5'11\" 160 lbs — slim for a power hitter, 'packed a terrific punch for his size.' The face should be PLEASANT and UNREMARKABLE in the best sense — the face of a man nobody would pick out of a crowd, which is exactly the problem. Not handsome like Jackson or fierce like Cobb — ORDINARY. A good face. An honest face. The face of a coal miner's son who hit .310 for 14 years and smiled at the plate. Kentucky features, working-class, lean. The eyes should be bright and friendly — 'as friendly as a Newfoundland pup' — but also slightly puzzled, as if he can't quite understand why nobody remembers him.",
    attire: "Detroit Tigers 1919 whites — wool flannel with the Old English 'D' insignia, flat cap. THE POSE: the swing — left-handed, full and free, bat held at the end of the knob, swinging from the heels. The 'picturesque swing' that produced 345 doubles, 136 triples, and 2,063 hits. The swing should look SMOOTH and POWERFUL for its size — the punch packed by a 160-pound man. Or: standing in left field at Navin Field, Cobb visible in center, Crawford in right — the greatest outfield ever, and Veach is the one you can't name.",
    mood: "WARM AND OVERLOOKED. Veach's card should feel like a photograph found in a shoebox — warm sepia, slightly faded, a man you feel you should recognize but can't quite place. The mood is PLEASANT OBSCURITY — the warmth of a good man doing good work that nobody will remember.",
    style: "Sepia-toned with WARM COAL-DUST BROWN and SOFT KENTUCKY GREEN undertones — the brown of coal seams and mine shafts, the green of Kentucky hills and Navin Field grass. Where Crawford is prairie gold (vast open spaces) and Jackson is sunset gold (beauty fading), Veach is COAL-DUST BROWN — earthier, humbler, closer to the ground. The palette of a man who came from the mines and never entirely left them.",
    reference: "The forgotten photograph. The man in the greatest outfield who isn't in Cooperstown. The swing from the heels, the smile at the plate, the 2,063 hits that earned one vote. The card should make the viewer feel something specific: the quiet injustice of being excellent in the wrong shadow. Veach is the Muggers' most human card — not tragic like Jackson, not defiant like Weaver, not mythic like Johnson. Just good. Very good. And completely, inexplicably forgotten.",
  },
};

const C = {
  parchment: "#f2e8d4", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#9a7e5a",
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

export default function BobbyVeachCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "RBI", val: d.real_stats.rbi }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — LED AL IN HITS, DOUBLES, TRIPLES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR 3B", val: d.real_stats.career_3b },{ label: "WAR", val: "46.0" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 14 SEASONS • 3× AL RBI LEADER • 1 HOF VOTE</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏅 3× AL RBI Leader", "📊 Led AL H/2B/3B (1919)", "⚾ Greatest OF Ever (1915)", "🔄 First Tiger Cycle", "⛏️ Coal Miner's Son", "🐾 Newfoundland Pup", "👁️ Spotted Gehringer", "❌ 1 HOF Vote"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Veach's real life, become universal cards playable in any game.</p>
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
                <Section title="Veach's Stat Derivation">
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
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, con: s.con, pow: s.pow, spd: s.spd, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
