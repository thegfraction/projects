import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: RUDY YORK
  // Year Snapshot: 1943 (Peak Season — Led AL in HR, RBI, SLG, TB)
  // ═══════════════════════════════════════════════════════════════

  name: "Rudy York",
  nickname: "The Big Gun of August",
  year: 1943,
  team: "Detroit Tigers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "1B",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "209 lbs",
  born: "August 17, 1913 — Ragland, AL",
  died: "February 5, 1970 — Rome, GA (age 56)",
  hof: "Not inducted. 7× All-Star, 1× WS champion (1945). Led ML in HR and RBI 1937-1947. Broke Ruth's single-month HR record. Inducted into Michigan, Georgia, and Alabama Sports HOFs posthumously.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1943 PEAK SEASON
  // Source: Baseball-Reference, SABR, Wikipedia, New Georgia Encyclopedia
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1943,
    games: 155,
    at_bats: 571,
    hits: 159,
    doubles: 26,
    triples: 3,
    home_runs: 34,
    rbi: 118,
    stolen_bases: 3,
    batting_avg: ".271",
    obp: ".354",
    slg: ".527",
    ops: ".881",
    ops_plus: 131,
    war: 4.5,
    all_star: 7,
    career_avg: ".275",
    career_hits: 1621,
    career_hr: 277,
    career_sb: 16,
    career_war: 27.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .271 BA → tier 3 (.270-.299). OPS+ 131 ≥ 130 → +1 = 4.
  // POWER (POW) — 34 HR → tier 3 (30-39). SLG .527 ≥ .500 → +1 bonus = 4.
  // SPEED (SPD) — 3 SB → tier 0 (0-5). No CF/SS GG bonus (1B). SPD 0.
  // DEFENSE (DEF) — Led AL 1B in errors 3 times (1941, 1944, 1945). Famous for
  //   bad glove — "part Indian and part first baseman." But led in assists 3×,
  //   putouts 2×, DP 2×, and fielding % 1×. Mixed bag, but reputation is poor.
  //   DEF 0.
  // CLUTCH (CLU) — 3 WS appearances (.221, 3 HR, 10 RBI). 1945 WS champion.
  //   1946 WS: 10th-inning walk-off HR in Game 1 + 3-run HR in Game 3.
  //   .221 PS BA = tier 0 (<.250), but WS hero moments (2 clutch HRs) = +1. CLU 1.
  // OVERALL (OVR) — CON 4×2=8 + POW 4×1.5=6 + SPD 0×1=0 + DEF 0×0.5=0 = 14 raw.
  //   7× All-Star, 277 career HR, led ML in HR/RBI 1937-47. Not HOF (borderline).
  //   Elite/MVP caliber in his peak but poor defense and low average limit him.
  //   Normalized to OVR 7 (All-Star).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — huge power bat, but DEF 0, low average, mediocre postseason line
    con: 4,      // .271 BA (tier 3) + OPS+ 131 bonus = 4. Decent contact, elite power bumps OPS+.
    pow: 4,      // 34 HR (tier 3) + SLG .527 bonus = 4. Broke Ruth's monthly HR record. 277 career HR.
    spd: 0,      // 3 SB in 1943, 16 career. Heavy-footed. 1B — no CF/SS bonus.
    def: 0,      // "Part Indian and part first baseman." Led AL 1B in errors 3 times. Famous for bad glove.
    clu: 1,      // .221 WS BA (tier 0), but walk-off HR in 1946 WS Game 1 and clutch HR in Game 3 = hero bonus.
  },

  stat_justification: {
    con: "Hit .271 in 1943 — solid but unremarkable batting average. Career .275, never a high-average hitter. However, his OPS+ of 131 in 1943 (and 123 career) pushes him above average. The OPS+ bonus applies because his power and walks inflate his overall production beyond what the batting average suggests. CON tier 3 (.270-.299) + OPS+ bonus = 4.",
    pow: "34 HR in 1943 — led the American League. Also led in RBI (118), SLG (.527), total bases (301), and extra-base hits (67). Career: 277 HR, led all of Major League Baseball in home runs and RBIs from 1937-1947. Broke Babe Ruth's record with 18 HR in August 1937. Hit 12 career grand slams, including two in one game (July 27, 1946 — 10 RBI). SLG .527 exceeds .500 bonus threshold. POW tier 3 + SLG bonus = 4. York is the second pure power card in the set after Williams.",
    spd: "3 SB in 1943, 16 career. York was described as 'heavy-footed' and 'too awkward' for any position other than first base. He was tried at third base, outfield, catcher, and even pitcher — all abandoned due to immobility. 1B — no CF/SS bonus. SPD 0.",
    def: "York's defense was legendarily poor. He led AL first basemen in errors three times (1941, 1944, 1945). The famous quote: 'He is part Indian and part first baseman.' However, his defensive reputation may be slightly exaggerated — he also led AL 1B in assists three times and in double plays twice. Still, the overall assessment is below average. DEF 0.",
    clu: "Three World Series appearances: .221 BA (17-for-77) with 3 HR and 10 RBI across 1940, 1945, and 1946. The .221 PS BA is tier 0 (<.250). However, his 1946 WS performance for the Red Sox produced two of the most clutch home runs of the series: a walk-off HR in the 10th inning of Game 1, and a three-run homer to win Game 3. Those are genuine World Series hero moments, earning the +1 bonus. CLU 0 + 1 (WS hero moments) = 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Silent thunder. York was not a vocal leader — he led with his bat and his presence. At 6'1\" 209 lbs, he was physically imposing for the era. He didn't give speeches; he hit three-run home runs. When the Tigers needed someone to carry the offense after Greenberg left for the war, York simply did it. No fanfare, no demands — just power.",
    temperament: "Blue-collar, stoic, occasionally volatile. York endured brutal booing from Detroit fans in 1942-43 when he slumped, and the racial dimension of the heckling (his Cherokee ancestry was frequently invoked in cruel terms) was real. He internalized the abuse, slumped worse, and then channeled it into one of the great second-half surges in baseball history — 17 HR in August 1943. His temper ran hot but burned quietly. He held salary grudges (held out in 1942) and carried wounds from being shuffled position to position.",
    work_ethic: "Determined but undisciplined. York worked hard enough to become an adequate first baseman after years of positional chaos, but he never refined his contact approach — he was a free swinger who struck out frequently (top 5 in AL strikeouts nine times). His power was natural, not manufactured. He didn't study hitting like Williams; he simply crushed the ball when he connected. His post-career struggles (house painter, minor league manager with a 19-64 record) suggest a man who never found discipline outside of the batter's box.",
    lifestyle: "Hard-living Georgia mill-town roots. York grew up in Atco, a textile mill community outside Cartersville, GA, working in the mill as a teenager. He had a reputation for enjoying the nightlife, and most observers believed his excesses shortened his career by several years. He married young (age 18 to Violet Dupree), had three children, and after baseball worked as a house painter and forestry firefighter. He died of lung cancer at 56.",
    era_adaptability: "PERFECT DH. York's profile — massive power, poor defense, low average, high strikeouts — is the exact template for the modern designated hitter. He would thrive in today's game as a DH who hits 35+ HR annually. His problem was that the DH didn't exist until 1973. Every manager who had York spent years trying to find a position where his glove would do the least damage. In ILB: York is the strongest argument for creating a DH slot on the roster.",
    clubhouse_impact: "RELIABLE PRODUCER, QUIET PRESENCE. York was not a personality in the clubhouse — he was a bat. Teammates respected his power and his willingness to carry the lineup, but he wasn't the guy who organized dinners or lifted morale. George Kell, his Tigers teammate, was the social glue; York was the silent artillery. His Cherokee heritage made him a somewhat isolated figure in the lily-white clubhouse of the 1940s.",
    dark_side: "The slow erasure. York's post-baseball life was marked by decline. After being released by the A's at 35, he spent years as a minor league player-manager (19-64 record), was fired as Red Sox batting coach, and ended up painting houses in Cartersville. He died of lung cancer at 56 — young even for his era. Georgia Governor Jimmy Carter declared a Rudy York Day posthumously, but York never saw his field renamed or his Halls of Fame inductions. His excesses shortened his career and his life. In ILB: York carries a 'Burning Bright' trait — his peak is explosive but his decline is steep and his post-career arc is tragic. He is the card you play hard for five years and then watch fade.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Eighteen in August", desc: "York broke Ruth's monthly HR record with 18 in August 1937. Once per season, York can enter an 'August Mode': for one calendar month, his POW increases to 5 and he cannot be benched." },
    { tag: "Part Indian, Part First Baseman", desc: "York's defensive reputation precedes him. When York commits an error, there is a 40% chance the opponent scores an additional run. But his bat makes managers keep writing his name in the lineup." },
    { tag: "Grand Slam King", desc: "12 career grand slams, including two in one game. When the bases are loaded, York's POW increases by +2. The bases-loaded modifier is the highest in the set." },
    { tag: "Mill Town Muscle", desc: "Grew up working in an Atco, GA textile mill. +1 chemistry with blue-collar and rural players (Vernon, Travis, Kell). Uncomfortable around sophistication." },
    { tag: "Greenberg's Replacement", desc: "When Hank Greenberg left for war, York became Detroit's primary slugger. +2 POW when the team's best player is absent. York fills the vacuum." },
    { tag: "Boo-Proof (Eventually)", desc: "After enduring merciless booing in 1942-43, York's second-half surge proved he could channel hostility into production. After 3 consecutive games of being booed, York enters a Hot streak." },
    { tag: "Short Fuse, Long Ball", desc: "York held out in spring training, feuded with management over salary, and carried grudges. -1 team chemistry during contract disputes, but +1 POW when angry." },
    { tag: "The DH Before the DH", desc: "York's bat is so valuable that he must play despite his glove. In any game where York commits 2+ errors, his next at-bat receives +2 POW as compensation — the manager can't bench the lumber." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: "York's temple. Everything else was a compromise to keep this bat in the lineup." },
    { location: "Mill Town / Blue-Collar Area", affinity: "HIGH", note: "Born in Ragland, AL. Raised in Atco, GA mill town. Died in Rome, GA. A working man's player." },
    { location: "Tiger Stadium / Briggs Stadium", affinity: "MEDIUM", note: "His home park for 9 seasons. The fans booed him mercilessly, then cheered when he hit it over the roof." },
    { location: "Any Defensive Position", affinity: "LOW", note: "Tried 3B, OF, C, P, and 1B. Failed at all but 1B, and even that was marginal." },
    { location: "Spring Training / Contract Negotiations", affinity: "NONE", note: "Held out in 1942. Feuded over salary. Spring training was a battleground, not a sanctuary." },
    { location: "Post-Career / Retirement", affinity: "NONE", note: "House painter, forestry firefighter. The big leagues didn't prepare him for civilian life." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "August — York's magic month. 18 HR in Aug 1937, 17 HR in Aug 1943. York is a different player in late summer.",
      "Bases loaded — 12 career grand slams, two in one game. The bases-loaded situation activates York's highest gear.",
      "Proving doubters wrong — after being booed or benched, York's rage fueled historic production surges.",
      "All-Star Games — hit a key 2-run HR in the 1942 ASG. Elevated on the big stage when relaxed.",
    ],
    cold_triggers: [
      "Fan abuse — extended booing campaigns eroded confidence (early 1942-43), though he eventually channeled it",
      "Position changes — being moved around the diamond shattered his focus and confidence",
      "Salary disputes — holdouts and pay cuts put him in a sour mental space at season's start",
      "Physical decline — after 1946, rapid power erosion. Hit .157 in final season (1948).",
    ],
    pressure_response: "VOLATILE AND STREAKY. York is the most boom-or-bust card in the Allies set. When he's hot (August 1937: .360/18 HR/49 RBI in one month), he is arguably the most dangerous hitter in the American League. When he's cold (first half of 1943, final seasons), he looks lost. In ILB: York has the highest variance of any card. His floor is lower than Travis's; his ceiling is higher than Kell's. He is never average — he is either carrying the team or dragging it down. Managers who play York are gambling on the hot streaks outweighing the cold spells. The 'Eighteen in August' trait ensures at least one explosive month per season, but you can't control which month it will be.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Eighteen in August",
      type: "Game Action",
      text: "Your slugger enters a transcendent hot streak. For one calendar month, he hits 18 home runs — breaking the existing record. His POW becomes 5, he cannot be benched, and the opposing team must pitch around him or face destruction. +3 fame. The month becomes legendary.",
      origin: "In August 1937, rookie Rudy York hit 18 home runs in a single month, breaking Babe Ruth's record of 17 set in September 1927. He also drove in 49 RBI that month, breaking Lou Gehrig's mark. The record stood for 61 years until Sammy Sosa hit 20 in June 1998.",
    },
    {
      title: "Two Grand Slams, One Game",
      type: "Game Action",
      text: "Your first baseman hits two grand slams in a single game, driving in ten runs. The opposing pitcher is removed after the first; the reliever fares no better. Both home runs break windows in the same parked car beyond the outfield wall. +2 fame. Ripley's Believe It or Not writes it up.",
      origin: "On July 27, 1946, York hit two grand slams in one game for the Red Sox, driving in 10 runs. Both reportedly broke windows in the same car parked beyond the outfield wall — a feat so absurd it was featured in Ripley's Believe It or Not.",
    },
    {
      title: "Walk-Off in the Tenth",
      type: "Game Action",
      text: "World Series, Game 1, bottom of the 10th inning, tied game. Your slugger drives a pitch into the seats. Walk-off home run. +2 CLU, +2 fame. The postseason legend begins.",
      origin: "In Game 1 of the 1946 World Series, York hit a walk-off home run in the bottom of the 10th inning to give the Red Sox a 3-2 victory over the Cardinals. He added a three-run homer in Game 3 to win that game as well.",
    },
    {
      title: "The Position Shuffle",
      type: "Drama",
      text: "Your slugger has been tried at five positions: third base, outfield, catcher, pitcher, and first base. He has failed at all of them defensively. But his bat is too good to bench. The manager gives him one more chance at first base. If he commits fewer than 15 errors, he stays. Roll a d6: on 1-2, he leads the league in errors but also in HR. On 3-6, he becomes adequate enough to keep playing.",
      origin: "York was tried at 3B, OF, C, P, and 1B during his career. Tigers manager Mickey Cochrane moved him to catcher in desperation. In 1940, the Tigers convinced Hank Greenberg to move to LF so York could play 1B. Every position change was a desperate attempt to keep his bat in the lineup.",
    },
    {
      title: "Greenberg Goes to War",
      type: "Drama",
      text: "Your team's superstar leaves for military service. Your power hitter must carry the offense alone. For the duration of the war years, your slugger gains +1 POW and +1 to RBI production, but also +1 to pressure and -1 to team morale (the star is missed). The burden is heavy but the big man shoulders it.",
      origin: "When Hank Greenberg entered military service after 1941, York became Detroit's sole offensive weapon. From 1941-1945, York was selected to five consecutive All-Star teams and led the AL in home runs (1943) while carrying a wartime Tigers team.",
    },
    {
      title: "The Boos Turn to Cheers",
      type: "Drama",
      text: "Your slugger endures merciless fan abuse for a full season. He slumps, sulks, and appears on the verge of collapse. Then, in the second half, he erupts: 17 home runs in one month, leading the league in HR and RBI. The fans who booed him now cheer. +2 morale, +1 CLU. The redemption is real.",
      origin: "In 1942-43, Detroit fans booed York relentlessly. He slumped badly in the first half of 1943, drawing comparisons to a 'nervous breakdown.' Then he hit 17 HR in August 1943 — one short of his own record — and led the AL in HR (34) and RBI (118). The booing stopped.",
    },
    {
      title: "The House Painter",
      type: "Drama",
      text: "After baseball, your former star works as a house painter in a small Georgia town. The fame fades. The money is gone. He dies young, at 56, of lung cancer. A year later, the governor declares a day in his honor. The field where he first played is renamed. The legacy arrives too late for the man to see it.",
      origin: "After leaving baseball, York worked as a self-employed house painter in Cartersville, GA. He died of lung cancer on February 5, 1970 at age 56. Georgia Governor Jimmy Carter declared August 17 as 'Rudy York Day' in 1971. His old Atco field was renamed Rudy York Memorial Field in 1972.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Big, broad, powerful. 6'1\" 209 lbs — a large man for the 1940s. Strong jaw, wide shoulders, thick forearms. Dark complexion reflecting his Cherokee ancestry. The face of a man who worked in a textile mill as a teenager and hit baseballs over fences as an adult. Not handsome — formidable.",
    attire: "Detroit Tigers home whites, 1943 vintage. Old English 'D' on the cap, same as Kell but a different man entirely. Mid-swing: the right-handed power stroke, bat whipping through with uppercut trajectory — a home run swing, not a line-drive swing. Or: following through on a massive blast, watching the ball leave the park.",
    mood: "Raw power and blue-collar determination. Where Kell's card radiates warmth and Williams' card crackles with intellect, York's card should feel like a controlled explosion. The energy is physical, not cerebral. This is a man who solved problems by hitting the ball harder, not by thinking more carefully.",
    style: "Deep, warm sepia with amber undertones — earthier and grittier than the other cards. The background should suggest Briggs Stadium but with a slight haze, like August heat shimmering off the field. The light is late afternoon, heavy and golden, the kind of light that makes everything look bigger.",
    reference: "York's card should feel different from the other 1B card (Vernon). Vernon is precision and quiet; York is thunder and mess. They're the yin and yang of first base — one a surgeon, the other a wrecking ball. Together they define the position's full spectrum.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => ( <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}> <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span> <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}> <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /> </div> <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span> </div> );
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}> <span style={{ fontWeight: 700 }}>{tag}</span> </div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}> <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div> {children} </div> );

export default function RudyYorkCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Deep amber sepia, Tigers whites, raw power, August heat haze]</div>
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
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["💪 Led AL: HR/RBI/SLG/TB", "⭐ 7× All-Star", "🏆 1945 WS Champion", "🔥 18 HR in August 1937", "💣 12 Career Grand Slams", "🏠 2 Grand Slams in 1 Game"].map((a, i) => (
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
              {tabs.map(t => ( <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button> ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && ( <> <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section> <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section> <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section> <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section> <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section> <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section> <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section> </> )}
              {tab === "chemistry" && ( <> <Section title="Chemistry Traits"> <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div> <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div> </Section> <Section title="Preferred Locations"> {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}> <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span> <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div> </div> ))} </Section> </> )}
              {tab === "momentum" && ( <> <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section> <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section> <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section> </> )}
              {tab === "actions" && ( <Section title="Action Card Seeds"> <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from York's real life, become universal cards playable in any game.</p> {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}> <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div> <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p> <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p> </div> ))} </Section> )}
              {tab === "engine" && ( <> <Section title="Stat Conversion Engine"> <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p> {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))} </Section> <Section title="York's Derivation"> {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))} </Section> </> )}
              {tab === "art" && ( <Section title="Visual Art Direction"> {Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div> ))} </Section> )}
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
