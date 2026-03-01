import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: HAL NEWHOUSER
  // Year Snapshot: 1945 (Peak — MVP, Pitching Triple Crown, WS Champ)
  // ═══════════════════════════════════════════════════════════════

  name: "Hal Newhouser",
  nickname: "Prince Hal",
  year: 1945,
  team: "Detroit Tigers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SP",
  bats: "L",
  throws: "L",
  height: '6\'2"',
  weight: "180 lbs",
  born: "May 20, 1921 — Detroit, MI",
  died: "November 10, 1998 — Southfield, MI (age 77)",
  hof: "Inducted 1992 (Veterans Committee). #16 retired by Detroit. Only pitcher with back-to-back MVPs.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1945 PEAK SEASON (MVP, PITCHING TRIPLE CROWN)
  // Source: Baseball-Reference, HOF, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1945, games: 40, wins: 25, losses: 9, era: "1.81",
    innings: "313.1", strikeouts: 212, walks: 110, complete_games: 29,
    shutouts: 8, whip: "1.02", war: 10.5,
    career_wins: 207, career_losses: 150, career_era: "3.06",
    career_strikeouts: 1796, career_cg: 212, career_shutouts: 33,
    career_war: 63.0, no_hitters: 0, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION ENGINE
  //
  // STUFF (STF) — 1.81 ERA → tier 4 (1.50-1.99). K/9 = 6.09 → +1 bonus = 5. Max stuff.
  // CONTROL (CTL) — BB/9 = 3.16 → tier 0 (3.0+). WHIP 1.02 → no bonus (>1.00). CTL = 0.
  // STAMINA (STA) — 313.1 IP → tier 4 (300-349). STA = 4.
  // DEFENSE (DEF) — Led AL pitchers in assists (52) and putouts (23) in 1947.
  //   Good fielding pitcher. Pre-GG equivalent ~1-2 GG. DEF = 1.
  // CLUTCH (CLU) — 1945 WS: 2-1, won Game 5 and Game 7 (CG, 10 K).
  //   But shelled in Game 1 (7 R in <3 IP). 6.10 WS ERA overall.
  //   Won the decisive game → hero moment. CLU = 2.
  // OVERALL — STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → 10+0+4+0.5 = 14.5 → normalized.
  //   2× MVP, HOF, 80-27 over 3 years, but wartime asterisk + arm decline.
  //   OVR = 10 (Elite/MVP tier — dominant peak, sustained excellence 1944-48).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite/MVP — 2× consecutive MVP, HOF, dominant peak 1944-48
    stf: 5,      // 1.81 ERA → tier 4. K/9 6.09 → +1 bonus = 5. Maximum stuff.
    ctl: 0,      // BB/9 3.16 → tier 0 (3.0+). WHIP 1.02 → no bonus. Poor control.
    sta: 4,      // 313.1 IP → tier 4 (300-349). 29 CG. Workhorse.
    def: 1,      // Led AL pitchers in assists and putouts in '47. Decent fielder. DEF = 1.
    clu: 2,      // 1945 WS: 2-1, won Game 7 CG with 10 K. But shelled in Game 1. CLU = 2.
  },

  stat_justification: {
    stf: "1.81 ERA in 1945 — led the AL. Pitching Triple Crown (W/ERA/K). K/9 of 6.09 was elite for the era, triggering the +1 bonus. Birdie Tebbetts said his overhand curve was 'the best pitch I've ever seen' and 'nobody has got a hit off it yet.' His fastball was compared to Lefty Grove's — 'does things as it flutters across the letters on a batter's shirt.' Proved it wasn't just wartime: went 26-9 with 1.94 ERA and 275 K in 1946 when stars returned. Maximum stuff rating.",
    ctl: "BB/9 of 3.16 in 1945 — 110 walks in 313 innings. Newhouser had a wild streak throughout his career. His early years were marked by walking more batters than he struck out (1941-42). Even in his peak, he walked 100+ batters every year. WHIP 1.02 narrowly misses the bonus threshold. His control was his Achilles heel — he was a power pitcher who overwhelmed hitters, not a precision artist. Rating of 0.",
    sta: "313.1 IP in 1945, 312.1 IP in 1944. 29 complete games. Averaged 295 IP/year from 1944-49. This workload eventually destroyed his arm — by 1950 his shoulder was gone. But at peak, Newhouser was an absolute workhorse. Rating of 4.",
    def: "Led AL pitchers in both assists (52) and putouts (23) in 1947. Good athletic pitcher who fielded his position well. Not an elite defensive pitcher but above average. Pre-Gold Glove equivalent: ~1-2 GG. Rating of 1.",
    clu: "1945 World Series: 2-1 record. Won Game 5 (CG, 8-4) and Game 7 (CG, 9-3, 10 K). But was shelled in Game 1 — 7 earned runs in less than 3 innings, 9-0 loss. Overall 22 K in 20.2 WS IP but 6.10 ERA. The Game 7 win on two days rest is a genuine hero moment. Rating of 2 — redeemed himself spectacularly but the Game 1 debacle prevents maximum clutch.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Fiery, intense, demanding. Newhouser was not easy to be around on game day. He expected perfection from himself and his teammates. He would openly berate fielders who made errors behind him. Manager Steve O'Neill called him a 'problem child' early in his career — brilliant but volatile. As he matured, the intensity became more focused, but it never disappeared. He drove himself harder than anyone.",
    temperament: "Volcanic competitor beneath a princely exterior. The nickname 'Prince Hal' came from his regal bearing and good looks, but underneath was a furnace of competitive rage. He later admitted he 'tried hard' to win the second MVP because he knew how rare it was for a pitcher. When O'Neill sent him to the bullpen early in 1944 and said it was his 'last chance,' Newhouser responded with a 12-inning complete game shutout. He channeled fury into performance.",
    work_ethic: "Extraordinary self-improvement arc. Newhouser was wild and erratic in his early years (34-52 record in first 5 seasons). He spent the 1943-44 offseason completely retooling his delivery with catcher Paul Richards. The transformation was immediate — he went from 8-17 to 29-9 in one year. He studied hitters obsessively: 'I pitched against the pitcher, not against the hitters. The vast percentage of the time the ball was in my hand, everything was in my favor.'",
    lifestyle: "Detroit native, Detroit lifer. Born and raised in the city, signed with his hometown team at 17. Married young, raised a family in the Detroit suburbs. After playing, became a bank vice president at Community National Bank of Pontiac. Also worked as a scout — for the Orioles, he signed Dean Chance. For the Astros, he insisted they draft Derek Jeter out of high school (they didn't). Clean-living, professional, upwardly mobile.",
    era_adaptability: "HIGH. Newhouser's stuff — blazing fastball, devastating overhand curve, excellent changeup — would translate to any era. His K/9 of 6.09 was elite for the 1940s. His control issues (3.16 BB/9) would be concerning but manageable in modern baseball. The biggest question is whether his arm, which broke down by age 29 from 300+ IP workloads, would survive a modern pitch-count regimen. With modern training, Newhouser might have had 5 more elite years.",
    clubhouse_impact: "POLARIZING. Newhouser's intensity alienated some teammates — he could be brutal when fielders made mistakes behind him. But they also knew he was the horse that carried them to championships. He was close friends with Hank Greenberg, who later gave him a second life with the Indians in 1954. His relationship with catcher Paul Richards was transformative — Richards essentially rebuilt Newhouser's career. Intense, demanding, but respected.",
    dark_side: "The wartime asterisk that haunted him to his grave. Newhouser's greatest seasons came when many stars were in the military, and he was classified 4-F (ineligible) due to a leaky heart valve. He tried to enlist but was rejected. Critics used this against him for decades, and it kept him out of the Hall of Fame until the Veterans Committee elected him in 1992 — 17 years after his last ballot appearance. He proved his quality in 1946 (26-9, 1.94 ERA with stars back), but the asterisk persisted. In ILB terms: Newhouser carries a 'Wartime Asterisk' trait — his stats are questioned by rivals, costing him legacy points.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Prince Hal", desc: "Regal bearing on the mound. Intimidation factor: opposing batters face -1 confidence when Newhouser is announced as starter." },
    { tag: "Hurricane Hal", desc: "Blazing fastball, devastating curve. When STF is at max, strikeout rate increases by 15%. But walks increase too." },
    { tag: "Back-to-Back MVP", desc: "Only pitcher with consecutive MVPs. +2 prestige rating. Opponents respect him but rivals resent the wartime context." },
    { tag: "4-F Firebrand", desc: "Rejected from military service due to heart condition. Carries shame and critics' scorn. -1 legacy vs. returning veterans." },
    { tag: "Retooled Delivery", desc: "Completely rebuilt his mechanics with Paul Richards. If paired with an elite catcher, +1 CTL." },
    { tag: "Hometown Hero", desc: "Born in Detroit, signed at 17, spent career as a Tiger. +2 chemistry at home park. Cannot be traded without fan revolt." },
    { tag: "Arm Burnout", desc: "300+ IP workloads destroyed his shoulder by age 29. After age 28, 15% chance per season of permanent -1 STF." },
    { tag: "Jeter Scouter", desc: "As a scout for the Astros, insisted they draft Derek Jeter. They didn't listen. Newhouser has an eye for talent — +1 to prospect evaluation." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His kingdom. 2,993 career innings. Most dominant AL pitcher of the 1940s." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Intense pregame preparation. Studied hitters obsessively. Demanded perfection." },
    { location: "Bank / Office", affinity: "MEDIUM", note: "Became VP at Community National Bank after retirement. Professional, upwardly mobile." },
    { location: "Scouting Trip", affinity: "MEDIUM", note: "Post-career scout for Orioles and Astros. Signed Dean Chance, spotted Derek Jeter." },
    { location: "Home / Detroit Suburbs", affinity: "HIGH", note: "Detroit native, lifetime resident. Family man, stable home life." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not a partier. Too focused on preparation and recovery." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association. Clean-living professional." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Newhouser dominated down the stretch in 1944 and 1945",
      "'Last chance' pressure — when told it's do-or-die, he responds with shutouts",
      "Sunday matchups vs. Feller — rotation rearranged for ace-vs-ace, Newhouser thrived",
      "Second-half surges — in 1946, won 20 of his first 22 decisions",
    ],
    cold_triggers: [
      "World Series Game 1s — shelled in the 1945 opener (7 R in <3 IP)",
      "Physical ailments — back spasms in late 1945, shoulder breakdown from 1950 onward",
      "Bullpen assignments — Newhouser was a starter who wilted as a reliever (except 1954 Cleveland)",
    ],
    pressure_response: "REDEMPTIVE. Newhouser's pattern is clear: he sometimes fails spectacularly under initial pressure (Game 1, 1945 WS), but then comes back with overwhelming force (Game 5 and Game 7 CG wins). He pitched Game 7 on two days rest with a bad back. He threw a CG shutout after being told he was about to be demoted. In ILB terms: Newhouser has a 30% chance of collapse in his first elimination appearance, but if he survives, he locks in at +2 STF for the remainder of the series.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Ten Minutes Too Late",
      type: "Drama",
      text: "Your star prospect has just signed with a team for a $500 bonus. Ten minutes later, a rival scout arrives with $15,000 and a new car. The deal is done. The prospect gave $400 to his parents. The rival scout is crushed. This signing changes franchise history.",
      origin: "Newhouser signed with the Tigers for $500. Ten minutes later, Indians scout Cy Slapnicka arrived with $15,000 and a car. Too late. Newhouser gave $400 to his parents.",
    },
    {
      title: "The Retooled Delivery",
      type: "Action",
      text: "Your wild young pitcher is 34-52 through 5 seasons. His catcher takes him aside and completely rebuilds his mechanics over one offseason. Next year: 29-9, MVP. The transformation is instantaneous and shocking.",
      origin: "Catcher Paul Richards worked with Newhouser over the 1943-44 offseason to rebuild his delivery. He went from 8-17 in 1943 to 29-9 in 1944 — the greatest single-season turnaround for a pitcher.",
    },
    {
      title: "Back-to-Back MVP",
      type: "Action",
      text: "Your ace wins the MVP award. Everyone says it was a fluke, that the competition was weak. So he wins it again the next year. He's the only pitcher in history to do it. The critics still aren't satisfied.",
      origin: "Newhouser won the AL MVP in both 1944 (29-9, 2.22) and 1945 (25-9, 1.81). He remains the only pitcher with consecutive MVPs. Critics cited wartime rosters.",
    },
    {
      title: "Game 7 on Two Days Rest",
      type: "Game Action",
      text: "Your ace was shelled in Game 1. The series is tied 3-3. He takes the mound for Game 7 on two days rest with a bad back. His team gives him 5 runs in the first inning. He scatters 10 hits and strikes out 10 for a complete game victory. Redemption.",
      origin: "1945 World Series Game 7. Newhouser, shelled 9-0 in Game 1, came back on two days rest. The Tigers scored 5 in the first on Paul Richards's bases-clearing double. Newhouser went the distance: 9-3, 10 K.",
    },
    {
      title: "The $500,000 Temptation",
      type: "Drama",
      text: "A foreign league offers your ace $500,000 — a fortune — to jump his contract and pitch overseas for three years. He's tempted but fears a lifetime ban if the league folds. He stays for $10,000 and a promise of a future raise.",
      origin: "Mexican League president Jorge Pasquel offered Newhouser $200,000/year for 3 years plus a $300,000 signing bonus. Newhouser stayed with Detroit for $10,000.",
    },
    {
      title: "The 4-F Classification",
      type: "Drama",
      text: "Your star player tries to enlist in the military but is rejected due to a medical condition. He's devastated. He plays through the war years and dominates — but critics call him a 'wartime pitcher' forever. The asterisk never goes away.",
      origin: "Newhouser was classified 4-F due to a congenital leaky heart valve. He tried to enlist but was rejected. His wartime dominance was forever questioned.",
    },
    {
      title: "Draft the Kid from Kalamazoo",
      type: "Action",
      text: "Your retired-player-turned-scout insists your team draft a high school shortstop. Management ignores him and picks someone else. The shortstop becomes a Hall of Famer for another team. Your scout was right all along.",
      origin: "As an Astros scout, Newhouser urged the team to draft Derek Jeter. Houston passed. The Yankees took Jeter 6th overall. Newhouser was vindicated.",
    },
    {
      title: "The Veteran's Committee",
      type: "Drama",
      text: "Your retired player misses the Hall of Fame on every ballot for 15 years, maxing out at 42.8% of the vote. Decades later, a special committee finally inducts him. He's 71 years old. He cries at the podium. The asterisk is lifted, sort of.",
      origin: "Newhouser fell off the BBWAA ballot in 1975 at 42.8%. The Veterans Committee inducted him in 1992 alongside Tom Seaver and Rollie Fingers.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall, handsome, athletic at 6'2\" 180 lbs. 'Prince Hal' was movie-star good-looking — blond, curly-haired, strong jaw, piercing eyes. The regal bearing that earned the nickname. But look closer and you see the intensity in the eyes — this is a man who pitched with a bad back on two days rest because losing was not an option.",
    attire: "Detroit Tigers home whites, 1945 style. Number 16. Classic wartime-era wool flannel, old English D on the cap. Left-handed pitcher's follow-through — the long left arm extended, the body torqued toward first base. High-kick delivery, leg up.",
    mood: "Controlled fury. The moment of release — the fastball leaving his hand, the curve breaking downward. Not smiling. The 'Hurricane Hal' side, not the 'Prince Hal' side. Eyes locked on the target. Absolute competitive fire channeled through perfect mechanics.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Briggs Stadium (Tiger Stadium) in the wartime background — afternoon light, shadows falling across the mound. The card should feel powerful and slightly threatening — this is the most dominant pitcher of his decade.",
    reference: "Think wartime baseball at its peak — the dominant left-hander in full delivery, the crowd rising, the stadium electric. Newhouser was the biggest name in baseball from 1944-46. The card should convey that magnitude, with a hint of the controversy that would follow.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT CONVERSION ENGINE
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  stuff: {
    metric: "ERA + K/9",
    tiers: [
      { range: "ERA 3.50+", value: 0 },
      { range: "ERA 3.00-3.49", value: 1 },
      { range: "ERA 2.50-2.99", value: 2 },
      { range: "ERA 2.00-2.49", value: 3 },
      { range: "ERA 1.50-1.99", value: 4 },
      { range: "ERA <1.50", value: 5 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 + WHIP",
    tiers: [
      { range: "BB/9 3.0+", value: 0 },
      { range: "BB/9 2.5-2.99", value: 1 },
      { range: "BB/9 2.0-2.49", value: 2 },
      { range: "BB/9 1.5-1.99", value: 3 },
      { range: "BB/9 1.0-1.49", value: 4 },
      { range: "BB/9 <1.0", value: 5 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched (peak season)",
    tiers: [
      { range: "<150 IP", value: 0 },
      { range: "150-199 IP", value: 1 },
      { range: "200-249 IP", value: 2 },
      { range: "250-299 IP", value: 3 },
      { range: "300-349 IP", value: 4 },
      { range: "350+ IP", value: 5 },
    ],
  },
  defense: {
    metric: "Fielding + Gold Gloves (pitcher)",
    tiers: [
      { range: "No GG", value: 0 },
      { range: "1-2 GG equivalent", value: 1 },
      { range: "3-5 GG equivalent", value: 2 },
      { range: "6+ GG equivalent", value: 3 },
    ],
  },
  overall: {
    formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13",
    tiers: [
      { range: "3-4", label: "Replacement" },
      { range: "5-6", label: "Solid Starter" },
      { range: "7-8", label: "All-Star" },
      { range: "9-10", label: "Elite / MVP" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
  clutch: {
    metric: "Postseason ERA + signature moments",
    tiers: [
      { range: "PS ERA > 4.00 or no PS", value: 0 },
      { range: "PS ERA 3.00-4.00", value: 1 },
      { range: "PS ERA < 3.00", value: 2 },
    ],
    bonus: "WS clinching win → +1 (cap 3)",
  },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
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

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function HalNewhouserCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;
  const tabs = [
    { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" },
  ];

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
            {/* Portrait Area */}
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Sepia-toned, high-kick delivery, Tigers #16, Briggs Stadium]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            {/* Name Block — 32px for pitcher */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            {/* Pitcher Stat Bars: STF/CTL/STA/DEF/CLU */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "BB", val: d.real_stats.walks },
                { label: "IP", val: d.real_stats.innings },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "WAR", val: d.real_stats.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            {/* Career Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[
                { label: "CAR W", val: d.real_stats.career_wins },
                { label: "CAR L", val: d.real_stats.career_losses },
                { label: "CAR ERA", val: d.real_stats.career_era },
                { label: "CAR K", val: d.real_stats.career_strikeouts },
                { label: "CAR CG", val: d.real_stats.career_cg },
                { label: "CAR SHO", val: d.real_stats.career_shutouts },
                { label: "NO-HIT", val: d.real_stats.no_hitters },
                { label: "CAR WAR", val: d.real_stats.career_war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 17 SEASONS</div>

            {/* Awards */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1945 WS Champ", "👑 2× AL MVP (44-45)", "⭐ 7× All-Star", "🔥 Pitching Triple Crown '45", "⭐ HOF 1992", "1️⃣6️⃣ #16 Retired", "📊 Led AL Wins 4×", "🎖️ 80-27 over 3 years"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK OF CARD ═══════════ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>
                {Object.entries(d.personality).map(([key, val]) => (
                  <Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}>
                    <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                  </Section>
                ))}
              </>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Newhouser's real life, become universal cards playable in any game.</p>
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
                <Section title="Pitcher Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Modified engine for pitchers: STF/CTL/STA replace CON/POW/SPD.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Newhouser's Derivation">
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

      {/* JSON Export */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team,
  stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
