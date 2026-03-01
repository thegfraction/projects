import { useState } from "react";

const CROWDER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: GENERAL CROWDER
  // Year Snapshot: 1932 (Peak Season — AL Wins Leader)
  // ═══════════════════════════════════════════════════════════════
  
  name: "General Crowder",
  nickname: "The General",
  year: 1932,
  team: "Washington Senators",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "L",
  throws: "R",
  height: "5'10\"",
  weight: "170 lbs",
  born: "January 11, 1899 — Winston-Salem, North Carolina (tobacco and cotton country, father was a blacksmith)",
  died: "April 3, 1972 — Winston-Salem, North Carolina (age 73, heart disease)",
  hof: "Not inducted. 1× All-Star (1933 inaugural). 1× WS champion (1935 Tigers). NC Sports Hall of Fame (1967). Won more games than any AL pitcher except Grove, 1928-1933.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1932 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1932,
    games: 43,
    wins: 26,
    losses: 13,
    era: "3.33",
    innings: "327",
    strikeouts: 110,
    walks: 77,
    complete_games: 20,
    shutouts: 3,
    whip: "1.30",
    ops_plus_against: "N/A",
    war: 6.0,
    career_wins: 167,
    career_losses: 115,
    career_era: "4.12",
    career_strikeouts: 799,
    career_cg: 150,
    career_shutouts: 16,
    career_war: 27.9,
    no_hitters: 0,
    perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF: ERA tiers (<1.50=5, 1.50-1.99=4, 2.00-2.49=3, 2.50-2.99=2, 3.00-3.49=1, 3.50+=0) + K/9 ≥ 6.0 bonus (cap 5)
  // CONTROL: BB/9 tiers (<1.0=5, 1.0-1.49=4, 1.5-1.99=3, 2.0-2.49=2, 2.5-2.99=1, 3.0+=0) + WHIP ≤ 1.00 bonus (cap 5)
  // STAMINA: IP tiers (<150=0, 150-199=1, 200-249=2, 250-299=3, 300-349=4, 350+=5)
  // DEFENSE: Same as position players
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // CLUTCH: Same as position players
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 6,      // Solid Starter — 27.9 career WAR. 3× 20-game winner. Not HOF but elite peak. Second-most wins in AL 1928-33 behind Grove.
    stf: 1,      // 3.33 ERA → tier 1 (3.00-3.49). K/9 ~3.03 → no bonus. Not a strikeout pitcher. Won through deception and durability, not overpowering stuff. STF 1.
    ctl: 2,      // BB/9 ~2.12 → tier 2 (2.0-2.49). WHIP 1.30 → no bonus. Decent control, not elite. Shirley Povich noted his 'sneaky' fastball and shrewdness. CTL 2.
    sta: 4,      // 327 IP → tier 4 (300-349). Led both leagues in innings. 20 CG. Walter Johnson: 'His arm is made of rubber, and he doesn't know the meaning of fatigue.' Maximum workload.
    def: 1,      // .984 career fielding pct as pitcher. After May 19, 1932 went 209 games/179 chances without an error. Elite pickoff move. Good fielding pitcher. DEF 1.
    clu: 1,      // 1-2 in 3 consecutive World Series (1933-35). Won Game 4 of 1935 WS (5-hitter, 2-1 W vs Cubs). But lost starts in 1933 WS. Mixed postseason. CLU 1.
  },
  
  stat_justification: {
    stf: "3.33 ERA in 1932 in a high-offense era. But K/9 was only ~3.03 — Crowder was not a strikeout pitcher. He relied on a sneaky fastball ('a fast ball that didn't look fast' — Shirley Povich), a 'corking change of pace,' a 'baffling' curve, and a screwball. His lazy three-quarters delivery disguised the ball's movement. He won through deception, not dominance. Rating of 1.",
    ctl: "BB/9 of ~2.12 in 1932 (77 BB in 327 IP). Decent but not elite. WHIP 1.30 — respectable for the era. His shrewdness and deceptive pickoff move compensated for moderate control. Crowder set the record for most innings pitched in a season without hitting a batter (327 in 1932). Rating of 2.",
    sta: "327 IP in 1932 — led both leagues. 20 complete games. Started on 3 days' rest routinely. Walter Johnson: 'If you'd let him, he'd pitch every day. His arm is made of rubber.' Led AL in starts (39) and appearances (43) in 1932. In 1933, led majors with 52 appearances (35 starts). A rubber-armed workhorse. Rating of 4.",
    def: "Exceptional fielding pitcher. .984 career fielding percentage. After one error on May 19, 1932, went 209 consecutive games (179 total chances) without another error — the rest of his career. Possessed one of the best pickoff moves in baseball. 'Those runners know I'll pick them off if they get too far off the bag, and they stay close.' Rating of 1.",
    clu: "Pitched in 3 consecutive World Series (1933, 1934, 1935). Won Game 4 of the 1935 WS with a 5-hit, 2-1 CG victory over Tex Carleton and the Cubs — Detroit's first championship. But lost in the 1933 WS (7.36 ERA in 2 starts vs. Giants) and only appeared in relief in the 1934 WS blowout loss. Overall WS: 1-2, 3.81 ERA. Rating of 1 — the 1935 Game 4 saves him from a 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Soldier. Crowder enlisted in the Army in 1919 at 20 years old because he was restless and undereducated (5th grade). He served in the Philippines and 11 months in Siberia with the 27th Infantry at Vladivostok and Lake Baikal during the Russian intervention. He learned to play baseball in the military. That soldier's discipline — obedience, endurance, no complaints — defined his pitching career. He showed up, took the ball, pitched 300+ innings, and went home. No drama. No headlines. Just work.",
    temperament: "Stoic, southern, blue-collar. Born in tobacco country, father was a blacksmith, quit school after 5th grade to work at the cotton mills. Then a mechanic at R.J. Reynolds tobacco company. Then a riveter in the Alexandria shipyards. Then a soldier in Siberia. By the time he reached the majors at 27, he'd already lived three lives. Nothing rattled him because he'd been colder, hungrier, and more exhausted than baseball could ever make him.",
    work_ethic: "Inhuman durability. 327 innings in 1932. 52 appearances in 1933 (35 starts). Pitched on 3 days' rest as a matter of routine. Walter Johnson said his arm was 'made of rubber.' He never complained about workload. He was a slow starter each season — sportswriters joked he should start the year in June — but once the weather warmed, he was relentless. 15 consecutive victories to close 1932.",
    lifestyle: "Winston-Salem, North Carolina, through and through. Born there, died there. Married Ruth Livernash of Rochester, NY in 1924. They owned a large farm near his birthplace. Ruth was chronically ill — an invalid by the early 1930s. Crowder rushed home from the 1935 World Series because she was gravely ill. She died weeks after his 1936 retirement. He later married Joan Brockwell, a nurse, and had two children. Ran grocery stores, real estate, and a bowling alley in Winston-Salem. Inducted into the NC Sports Hall of Fame in 1967.",
    era_adaptability: "LOW-MEDIUM. Crowder's arsenal — sneaky fastball, change, curve, screwball — relied on deception and durability, not velocity or swing-and-miss stuff. His K/9 of ~3.0 would be disastrous in modern baseball. However, his durability and competitive intelligence are timeless. He'd need to be a modern 'pitch to contact' specialist with elite defense behind him, a Marco Gonzales or Dallas Keuchel type. His pickoff move would still play anywhere.",
    clubhouse_impact: "QUIET AND RELIABLE. Not a joker like Gomez, not a leader like Cronin. Crowder was the veteran who took the ball every fourth day without complaint. Teammates respected his toughness — the man had survived Siberia. Managers loved him because he pitched deep into games and never missed a turn. He was the anti-primadonna: durable, dependable, invisible.",
    dark_side: "Ruth's illness. Crowder's wife was chronically ill for most of the 1930s, requiring constant medical attention. She was described as an invalid. Crowder carried the weight of her condition through his peak years — winning 26 games while his wife was deteriorating at home. After the 1935 World Series triumph, he rushed back to North Carolina. His shoulder gave out in 1936. She died weeks after he retired. The timing suggests the stress of her illness and his physical breakdown were intertwined. He was 37 and suddenly both a retired ballplayer and a widower.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Siberian Veteran", desc: "Served 11 months at Vladivostok and Lake Baikal. Immune to cold-weather penalties. +1 STA in April/October. Nothing on a baseball field compares to a Siberian winter." },
    { tag: "Rubber Arm", desc: "Can pitch on 2 days' rest with no penalty. Can start and relieve in the same series. Walter Johnson's endorsement: 'He'd pitch every day if you let him.'" },
    { tag: "Yankee Killer", desc: "+1 STF when facing the Yankees. Crowder was known specifically for beating New York and Babe Ruth. Historical reputation as the man who could neutralize the Bronx Bombers." },
    { tag: "The Sneak", desc: "Crowder's fastball 'didn't look fast' but had 'considerable sneak.' 15% chance per game of inducing a double play in a critical situation. Batters underestimate the movement." },
    { tag: "Pickoff Artist", desc: "One of the best moves to first in baseball. Runners cannot steal on Crowder. -1 SPD to all opposing baserunners. 'Those runners know I'll pick them off.'" },
    { tag: "Slow Starter", desc: "-1 STF in April and May. Crowder was notoriously terrible in cold weather. Sportswriters: 'He should start the season in June.' But once warm: +1 STF June through September." },
    { tag: "The Invalid Wife", desc: "5% chance per season of emergency family event. If triggered: Crowder misses 1 week, -1 morale. But teammates rally around him (+1 team sympathy)." },
    { tag: "Fifteen Straight", desc: "If Crowder wins 10+ consecutive decisions, he enters 'streak mode': +1 STF and +1 CTL until the streak ends. Based on his 15-game win streak in 1932." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Griffith Stadium / Washington", affinity: "HIGH", note: "His true home park. 98-69 record as a Senator. Led Washington to the 1933 pennant." },
    { location: "Farm / Winston-Salem", affinity: "HIGH", note: "Born and died in Winston-Salem. Owned a farm, ran grocery stores, managed the local minor league team." },
    { location: "Pitcher's Mound", affinity: "HIGH", note: "327 IP in 1932. 52 appearances in 1933. He lived on the mound." },
    { location: "Military Post / Veterans Event", affinity: "MEDIUM", note: "Served 3 years in the Army. Philippines. Siberia. Named after General Enoch Crowder. The military shaped him." },
    { location: "Hot Weather / Summer", affinity: "HIGH", note: "Crowder came alive in warm weather. His best months were always June through September." },
    { location: "Cold Weather / April", affinity: "LOW", note: "Notoriously bad in cold weather. The sportswriters never let him forget it." },
    { location: "Hospital / Sickroom", affinity: "LOW", note: "His wife Ruth was chronically ill. Hospitals meant bad news." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Warm weather — June through September Crowder was a different pitcher",
      "Win streaks — 15 consecutive victories in 1932, feeding on momentum",
      "Pitching on short rest — the rubber arm thrived on heavy workload",
      "Facing the Yankees — the Yankee Killer activated against New York",
    ],
    cold_triggers: [
      "Cold weather / April starts — notoriously slow to warm up each season",
      "Wife's health crises — emotional drain throughout the 1930s",
      "World Series pressure — 1-2 career WS record, struggled in 1933",
      "Late career shoulder breakdown — 8.39 ERA in final 1936 season",
    ],
    pressure_response: "INCONSISTENT. Crowder pitched in three consecutive World Series (1933-35) — a remarkable achievement. But his results were mixed: he was shelled in the 1933 WS vs. the Giants (7.36 ERA), appeared only in a blowout loss in the 1934 WS, and then delivered his masterpiece — a 5-hit, 2-1 CG win in Game 4 of the 1935 WS that helped Detroit win its first championship. That one game redeemed an otherwise shaky postseason record. In ILB: Crowder is a solid but unreliable postseason arm — you hope for Game 4 of '35, but you might get Game 1 of '33.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Siberian Soldier",
      type: "Drama",
      text: "Your pitcher learned baseball in the Army, not on sandlots. He spent 11 months in Siberia at 20 years old. He didn't reach the majors until 27. By then, nothing could faze him. +1 mental toughness permanently.",
      origin: "Crowder enlisted in 1919, served in the Philippines and at Vladivostok/Lake Baikal during the Russian intervention. He learned baseball as a soldier. He didn't debut in the majors until age 27.",
    },
    {
      title: "Fifteen Consecutive Victories",
      type: "Game Action",
      text: "After a terrible midseason slump (5-11 stretch), your pitcher doesn't lose again for the rest of the year. Fifteen straight wins. He ties the AL record. He leads the league in wins, innings, and starts. +3 momentum for the team entering the offseason.",
      origin: "1932: After an ugly loss on July 28, Crowder reeled off 15 consecutive victories to finish 26-13, tying Smoky Joe Wood, Walter Johnson, and Lefty Grove for the longest AL winning streak.",
    },
    {
      title: "The Sneaky Fastball",
      type: "Action",
      text: "Your pitcher's fastball 'doesn't look fast.' Batters consistently underestimate its velocity. The lazy delivery hides considerable movement. Opponents hit .240 against him despite never feeling overmatched.",
      origin: "Shirley Povich: 'He had a fast ball that didn't look fast. What it had after Crowder came out of his lazy delivery was considerable sneak.'",
    },
    {
      title: "The Pickoff Move",
      type: "Game Action",
      text: "Your pitcher has such a deadly pickoff move that runners barely dare to lead off first base. He rarely even throws over — the intimidation alone is enough. Stolen base attempts against him: near zero.",
      origin: "Crowder: 'Those runners know I'll pick them off if they get too far off the bag. All I do is cock my head the same way whenever I'm ready to pitch, and if I can see the man on first out of the corner of my eye I don't bother with him.'",
    },
    {
      title: "Three Consecutive World Series",
      type: "Drama",
      text: "Your pitcher appears in three consecutive World Series — for two different teams. He loses in the first, barely appears in the second, and wins the decisive game in the third. The career arc: failure, irrelevance, redemption.",
      origin: "Crowder: 1933 WS (Senators, lost), 1934 WS (Tigers, relief only), 1935 WS (Tigers, won Game 4 with a 5-hit CG 2-1 victory — Detroit's first championship).",
    },
    {
      title: "The Blacksmith's Son",
      type: "Action",
      text: "Your pitcher quit school after 5th grade. Worked cotton mills at 14. Mechanic at a tobacco company. Riveter in the shipyards. Soldier in Siberia. He arrives at the majors at 27 with hands calloused from a dozen trades. He pitches 300+ innings because nothing in baseball is as hard as what came before.",
      origin: "Crowder's pre-baseball life: cotton mills, R.J. Reynolds mechanic, Alexandria shipyard riveter, 3 years in the Army (Philippines, Siberia). Debuted at 27.",
    },
    {
      title: "Racing Home from the World Series",
      type: "Drama",
      text: "Your pitcher wins the World Series — the crowning achievement of his career. But he has little time to celebrate. His wife is gravely ill at home. He rushes back. The next season, his arm fails. She dies weeks after he retires. The triumph and the tragedy arrive in the same breath.",
      origin: "After the 1935 WS, Crowder rushed home to Ruth, who was gravely ill. His shoulder gave out in 1936 spring training. She died shortly after he retired.",
    },
    {
      title: "Named After a General",
      type: "Action",
      text: "Your player shares a surname with a famous military figure. He inherits the nickname despite never rising above the rank of private. The nickname sticks for his entire career. It gives him an air of authority he never actually earned — but doesn't need, because his pitching does the talking.",
      origin: "Crowder's nickname 'General' came from General Enoch Crowder, who designed the WWI draft lottery. Alvin Crowder was a private. The irony was permanent.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, weathered, southern. 5'10\" 170 lbs — small for a pitcher. Face of a man who's worked cotton mills, riveted ships, and survived Siberian winters. Lines around the eyes. No vanity. He looks older than his age because he's lived harder than anyone else on the field.",
    attire: "Washington Senators 1932 road grays. The old 'W' on the cap. Not flashy — the Senators were never flashy. He should look like a workman in a baseball uniform. The sleeves slightly too short, the build slightly too compact. This is not a Yankee — this is the guy who beats the Yankees.",
    mood: "Endurance. Not the follow-through of a blazing fastball — the steady, lazy, three-quarters delivery that hides the sneak. Or: the pickoff move, frozen mid-motion, the runner caught leaning. This card should feel like durability made visible. 327 innings of pure stubbornness.",
    style: "Southern warmth mixed with military austerity. Tobacco-brown palette. Griffith Stadium's modest outfield in the background. Maybe a ghost image of Vladivostok or a Siberian landscape superimposed faintly — the life before baseball. The card should feel earned, not given.",
    reference: "The card of the man who won more games than anyone except Lefty Grove for six straight years — and nobody remembers his name. The soldier who pitched through his wife's illness and his own body's collapse. The General who was never actually a general.",
  },
};

// Pitcher Stat Engine
const STAT_ENGINE = {
  stuff: {
    metric: "ERA + K/9",
    tiers: [
      { range: "ERA < 1.50", value: 5 },
      { range: "ERA 1.50-1.99", value: 4 },
      { range: "ERA 2.00-2.49", value: 3 },
      { range: "ERA 2.50-2.99", value: 2 },
      { range: "ERA 3.00-3.49", value: 1 },
      { range: "ERA 3.50+", value: 0 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 + WHIP",
    tiers: [
      { range: "BB/9 < 1.0", value: 5 },
      { range: "BB/9 1.0-1.49", value: 4 },
      { range: "BB/9 1.5-1.99", value: 3 },
      { range: "BB/9 2.0-2.49", value: 2 },
      { range: "BB/9 2.5-2.99", value: 1 },
      { range: "BB/9 3.0+", value: 0 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched",
    tiers: [
      { range: "< 150 IP", value: 0 },
      { range: "150-199 IP", value: 1 },
      { range: "200-249 IP", value: 2 },
      { range: "250-299 IP", value: 3 },
      { range: "300-349 IP", value: 4 },
      { range: "350+ IP", value: 5 },
    ],
  },
  defense: {
    metric: "Fielding as pitcher",
    tiers: [
      { range: "Average", value: 0 },
      { range: "Good", value: 1 },
      { range: "Excellent", value: 2 },
      { range: "Elite", value: 3 },
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
    metric: "Postseason record + signature moments",
    tiers: [
      { range: "PS ERA > 4.00 or losing record", value: 0 },
      { range: "PS ERA 2.50-4.00", value: 1 },
      { range: "PS ERA < 2.50", value: 2 },
    ],
    bonus: "WS hero moment → +1 (cap 3)",
  },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3",
  ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

const ChemTag = ({ tag, desc }) => (
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

export default function GeneralCrowderCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = CROWDER_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Compact, weathered, lazy three-quarters delivery, Senators grays, Griffith Stadium, tobacco-country warmth]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.gold} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.warmRed} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "IP", val: d.real_stats.innings },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "SHO", val: d.real_stats.shutouts },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "WAR", val: d.real_stats.war },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 1933 All-Star", "🏆 1935 WS Champ", "👑 2× AL Wins Leader", "🔥 15-Game Win Streak", "📊 327 IP (1932)", "💎 167-115 Career"].map((a, i) => (
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
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                  <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                  <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                  <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                  <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                  <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                  <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                    {d.chemistry_traits.map((t, i) => (
                      <div key={i} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                        <span style={{ color: C.medBrown }}>{t.desc}</span>
                      </div>
                    ))}
                  </Section>
                  <Section title="Preferred Locations">
                    {d.preferred_locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                        <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section>
                  <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section>
                  <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
                </>
              )}

              {tab === "actions" && (
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Crowder's real life, become universal cards playable in any game.</p>
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
              )}

              {tab === "engine" && (
                <>
                  <Section title="Pitcher Stat Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF/CTL/STA instead of CON/POW/SPD.</p>
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                        {data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Crowder's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
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
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, position: d.position,
  era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
