import { useState } from "react";

const TROSKY_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: HAL TROSKY
  // Year Snapshot: 1936 (Peak Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Hal Trosky",
  nickname: "The Next Babe Ruth",
  year: 1936,
  team: "Cleveland Indians",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "L",
  throws: "R",
  height: "6'2\"",
  weight: "207 lbs",
  born: "November 11, 1912 — Norway, Iowa (420-acre Bohemian immigrant farm)",
  died: "June 18, 1979 — Cedar Rapids, Iowa (age 66)",
  hof: "Not inducted. Cleveland Indians Hall of Fame (1951). Top 100 Greatest Indians (2001). Best player never to make an All-Star team.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1936 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1936,
    games: 151,
    at_bats: 629,
    hits: 216,
    doubles: 45,
    triples: 9,
    home_runs: 42,
    rbi: 162,
    stolen_bases: 4,
    batting_avg: ".343",
    obp: ".382",
    slg: ".644",
    ops: "1.026",
    ops_plus: 146,
    war: 6.9,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 0,
    career_avg: ".302",
    career_hits: 1561,
    career_hr: 228,
    career_sb: 29,
    career_war: 33.8,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  // 
  // METHODOLOGY: Stats are derived from real performance data
  // using the following conversion logic:
  //
  // CONTACT (CON) — Based on batting average + OPS+
  //   .250-.269 = 2 | .270-.299 = 3 | .300-.329 = 4 | .330+ = 5
  //   OPS+ 130+ adds +1 (cap at 5)
  //
  // POWER (POW) — Based on HR rate + SLG
  //   0-9 HR = 0 | 10-19 HR = 1 | 20-29 HR = 2 | 30-39 HR = 3
  //   40-49 HR = 4 | 50+ HR = 5
  //   SLG .500+ adds +1 (cap at 5)
  //
  // SPEED (SPD) — Based on SB + triples + range
  //   0-5 SB = 0 | 6-15 SB = 1 | 16-30 SB = 2 | 31-50 SB = 3
  //   Gold Glove CF adds +1 (cap at 3)
  //
  // DEFENSE (DEF) — NEW STAT for ILB v2
  //   No Gold Glove = 0 | 1-2 GG = 1 | 3-5 GG = 2 | 6+ GG = 3
  //
  // OVERALL (OVR) — Weighted composite
  //   CON×2 + POW×1.5 + SPD×1 + DEF×0.5, normalized to 3-13
  //   3-4 = replacement | 5-6 = solid | 7-8 = all-star
  //   9-10 = elite | 11-12 = legend | 13 = mythic
  //
  // CLUTCH (CLU) — Postseason performance modifier
  //   Postseason BA < .250 = 0 | .250-.299 = 1 | .300+ = 2
  //   World Series hero moments add +1 (cap at 3)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 7,      // All-Star tier — 33.8 career WAR (shortened by migraines). No HOF, no All-Star, but monster peak. 
    con: 5,      // .343 BA in 1936. OPS+ 146 triggers bonus, already capped. Max contact.
    pow: 5,      // 42 HR → tier 4 (40-49). SLG .644 → ≥.500 bonus → +1. POW 5. First Indian to hit 40 HR.
    spd: 0,      // 4 SB in 1936. 29 career. 6'2" 207-lb slugger. Not a runner. SPD 0.
    def: 0,      // No Gold Gloves (pre-award). Led AL 1B in errors in 1934 and 1936. Worked to improve but never elite. DEF 0.
    clu: 0,      // Never reached the postseason. Cleveland never won the pennant during his years. No postseason data. CLU 0.
  },
  
  stat_justification: {
    con: "Career .302 BA, peak .343 in 1936 with 216 hits and 45 doubles. Hit .300+ in six seasons. OPS+ 146 in peak year. Career .371 OBP. 28-game hitting streak in 1936. His first three years he out-produced Gehrig, Foxx, and Greenberg in RBI. Ed Barrow (Yankees GM): 'Trosky has the best chance to succeed Lou Gehrig as the powerhouse of the American League.' Maximum contact.",
    pow: "42 HR in 1936 — first Cleveland Indian to hit 40+ (not duplicated until Al Rosen in 1953). Led AL in RBI (162), total bases (405), extra-base hits (96). Career 228 HR in only 8 full seasons. Hit 3 HR in a game twice. Career .522 SLG, .644 in peak year. SLG bonus triggers → POW 5. Pure power, Ruthian swing from the left side.",
    spd: "4 SB in 1936, 29 career. Big man, slow feet. 9 triples in 1936 (decent for his size). Not a basestealing threat. SPD 0.",
    def: "No Gold Gloves (pre-award). Led AL first basemen in errors in 1934 and 1936 — the dubious distinction. After 1936, deliberately worked to improve footwork and fielding. Cut errors significantly by 1938-39. Competent but never a defensive asset. DEF 0.",
    clu: "No postseason appearances. Cleveland finished above .500 every year of his tenure but never won the pennant — competing against Yankee dynasties. Zero postseason data means CLU 0 by default. The tragedy of Trosky: he never got the October stage to show what he could do.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Reluctant Captain. Trosky was named team captain in 1939 — the extra $500 and the desire to serve as a buffer between young players and the abrasive Oscar Vitt drove his acceptance. He was not a fiery leader. He was steady, decent, principled. He phoned owner Alva Bradley from the airport during the Cry-Baby Rebellion not to grandstand but to ensure his absence from the meeting wouldn't be misconstrued. He led because nobody else would. He paid for it with his reputation.",
    temperament: "Iowa farm boy. Quiet, modest, genuine. Married his childhood sweetheart Lorraine from Norway, Iowa. He returned to the farm every offseason. The sportswriters didn't find him difficult like Lazzeri — they found him unremarkable. He was a simple man from a simple place who hit baseballs extraordinary distances. When the migraines hit, he suffered in silence for months before admitting the pain to anyone. He once walked out to Mel Harder on the mound and asked him not to throw to first — because he knew he couldn't see the ball.",
    work_ethic: "Boilermaker and Bohemian farmer stock. His family worked a 420-acre farm outside Norway, Iowa. When Cy Slapnicka found him, he was still a kid sitting at his father's kitchen table. He was originally signed as a pitcher who batted cross-handed from the right side. Slapnicka told him to keep his grip but switch to batting lefty. That one adjustment created one of the most devastating left-handed power strokes in AL history. He played every inning of every game in his first two full seasons.",
    lifestyle: "Iowa roots, never cut. Born Harold Arthur Trojovsky, second-generation Bohemian. His family shortened the name to Trosky. He married Lorraine Glenn from Norway, Iowa, and their first son Harold Jr. was born in September 1936, two days after the regular season ended — the season of 42 HR and 162 RBI. When the migraines ended his career, he returned to the farm without complaint. Later sold agricultural real estate in Cedar Rapids. Enjoyed hunting, fishing, playing cards, active in his church. His son Hal Jr. pitched briefly for the White Sox in 1958.",
    era_adaptability: "MEDIUM-HIGH. Trosky's power stroke was ahead of its time — a left-handed first baseman mashing 40+ home runs with a 1.026 OPS would be a franchise cornerstone in any era. His similarity scores match Albert Pujols, Vlad Guerrero Jr., Orlando Cepeda, Eddie Murray, and Ted Kluszewski. But his defense was below average, and modern analytics would expose his low walk rate (.382 OBP with a .343 BA means limited patience). In today's game he'd be a devastating DH or a platoon-vulnerable 1B who murders right-handed pitching (.345 vs RHP, .280 vs LHP in 1934).",
    clubhouse_impact: "STEADY AND STABILIZING. Not a rah-rah guy, not a silent intellectual like Lazzeri. Trosky was the dependable farmer who showed up, did the work, and went home. His teammates trusted him enough to make him captain. When the Vitt situation exploded, Trosky became the face of the rebellion not because he sought attention but because he was the only one with enough credibility. The other Indians hid behind his name. He took the blame alone.",
    dark_side: "THE MIGRAINES. Starting in 1938, Trosky was hit with debilitating migraine headaches that blurred his vision and left him unable to play for days. The fastball — the pitch he made his living on — became 'a bunch of white feathers' he couldn't track. He told Mel Harder not to throw to first base because 'if Mel threw me a fast ball, I wouldn't even see it.' He visited doctors in every major city. None could help. He retired at 28. The migraines cost him his prime years (1941-43), at least 100 home runs, probably the Hall of Fame. They also got him rejected from military service in WWII, adding stigma to injury. The cause was eventually traced to dairy sensitivity — treated with vitamin B-1 shots and reduced dairy intake. He came back at 31 with the White Sox but was a shell of himself.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Forgotten Slugger", desc: "Never makes the All-Star team. If 3+ first basemen on opposing rosters are OVR 9+, Trosky is automatically overlooked for awards regardless of stats. The curse of playing alongside Gehrig, Foxx, and Greenberg." },
    { tag: "Iowa Farm Boy", desc: "Immune to city distractions. +1 morale during home stretches. But: -1 comfort in road games in major cities (New York, Chicago)." },
    { tag: "Cry-Baby Captain", desc: "If manager relationship drops below 30%, Trosky can lead a player revolt. 60% chance revolt succeeds (manager fired). 40% chance it backfires (Trosky's reputation permanently damaged, -2 team morale)." },
    { tag: "The Migraines", desc: "15% chance per season starting in year 3 of career. If triggered: -2 CON, -2 POW for 30 games. 25% chance worsens to season-ending. Can be treated with team doctor investment (reduces to 5%)." },
    { tag: "Ruthian Power", desc: "+1 POW vs right-handed pitchers. But -1 CON vs left-handed pitchers. Extreme platoon splits that opponents can exploit." },
    { tag: "Bronzed Glove", desc: "Trosky bronzed the mitt Ruth's liner nearly tore off his hand. Items of historical significance occasionally appear. When they do: +1 team chemistry from the story." },
    { tag: "Every Inning", desc: "Plays every inning of every game for first two seasons. Iron man durability early in career. +1 stamina. (Deactivates once Migraines trigger.)" },
    { tag: "Norway, Iowa", desc: "After career ends, Trosky returns to the farm. If released or retired: no bitterness, no drama. Clean exit. +1 team morale on departure." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "League Park / Municipal Stadium", affinity: "HIGH", note: "Cleveland's home grounds. 216 career HR as an Indian — 5th all-time in franchise history." },
    { location: "Farm / Rural Area", affinity: "HIGH", note: "420 acres outside Norway, Iowa. His true home. Hunting, fishing, church, cards." },
    { location: "Batting Cage / Practice Field", affinity: "HIGH", note: "Worked tirelessly on his swing. Slapnicka converted him from cross-handed righty to lefty hitter — he never stopped refining." },
    { location: "Doctor's Office / Hospital", affinity: "MEDIUM", note: "Visited doctors in every major city seeking migraine relief. None could help until 1945 (vitamin B-1 shots)." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Farm boy. Not a partier. Married his childhood sweetheart." },
    { location: "Press Room / Interviews", affinity: "LOW", note: "Not media-savvy. The Cry-Baby Incident proved the press would turn on him. He learned to distrust reporters." },
    { location: "All-Star Game", affinity: "NONE", note: "Never invited. Gehrig, Foxx, and Greenberg blocked him every year. The greatest snub in 1930s baseball." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Facing right-handed pitching — .345 vs RHP, pure devastation",
      "28-game hitting streaks — locked-in zone where everything he swings at is crushed",
      "Home games in Cleveland — thrived at League Park",
      "First two seasons — iron-man energy, played every inning of every game",
    ],
    cold_triggers: [
      "Migraine episodes — blurred vision, 'white feathers' instead of fastballs",
      "Left-handed pitching — .280 with minimal power from the wrong side",
      "Manager conflict — the Vitt situation drained him and damaged his reputation",
      "Awards season — never recognized, never an All-Star. The snubs compounded over years.",
    ],
    pressure_response: "UNKNOWN — AND THAT'S THE TRAGEDY. Trosky never played a single postseason game. Cleveland was above .500 every year he was there but never won the pennant. In 1940, the year they came closest (finished 1 game behind Detroit), Trosky was already fighting migraines and hit .295 — good, but not what he was in 1936. We'll never know if he was a postseason hero or a postseason ghost. The game never gave him the chance to show us.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Kitchen Table Signing",
      type: "Action",
      text: "Your scout arrives at a farmhouse kitchen before the competition. The prospect's father is already seated at the table. 'I liked Slap,' the kid says later. The prospect signs with your team. Rival scouts arrive three days too late.",
      origin: "1930: Cy Slapnicka sat in the Trojovsky kitchen in Norway, Iowa while Connie Mack and the Cardinals were still organizing their pitches. Trosky signed with Cleveland. Mack's contract arrived three days later.",
    },
    {
      title: "Don't Worry About Holding Me On, Kid",
      type: "Drama",
      text: "Your rookie first baseman faces a legend who hits a screaming line drive that nearly tears off his glove. The legend whispers: 'Don't worry about holding me on, kid. I ain't going noplace. Just drop back and play it safe.' Your rookie later bronzes the glove.",
      origin: "September 17, 1933: Babe Ruth's line drive carried Trosky's mitt halfway into right field. Ruth told the terrified rookie to play deep against Gehrig. Trosky had the glove bronzed.",
    },
    {
      title: "The 162-RBI Season",
      type: "Game Action",
      text: "Your first baseman puts together a historic season: 42 HR, 162 RBI, 405 total bases, .343 BA. He leads the league in RBI, extra-base hits, and total bases. He is not selected for the All-Star team. He is the best player in baseball who nobody votes for.",
      origin: "1936: Trosky's monster season. Led AL in RBI (162), total bases (405), extra-base hits (96). Not an All-Star because Gehrig, Foxx, and Greenberg existed. His RBI franchise record stood 63 years. His total bases record still stands.",
    },
    {
      title: "A Bunch of White Feathers",
      type: "Drama",
      text: "Your slugger starts seeing fastballs as blurred white shapes. The migraines hit without warning — debilitating, vision-destroying pain that no doctor can diagnose. He asks his own pitcher not to throw to first base. He benches himself. He is 26 years old.",
      origin: "1939-41: Trosky's migraines made fastballs look like 'a bunch of white feathers.' He walked to Mel Harder on the mound and said not to throw to first — 'I knew if Mel threw me a fast ball, I wouldn't even see it.'",
    },
    {
      title: "The Cry-Baby Rebellion",
      type: "Drama",
      text: "Your team despises their manager. Players petition the owner for the manager's removal. The headline is physically larger than the one reporting the invasion of Paris. Your team captain — who wasn't even at the meeting — becomes the scapegoat. His reputation is permanently damaged.",
      origin: "June 1940: Cleveland players revolted against manager Oscar Vitt. Trosky, absent due to his mother's death, phoned in support. Gordon Cobbledick's headline in the Plain Dealer was larger than the one for Hitler's invasion of Paris. The 'Cry-Baby Indians' label stuck to Trosky forever.",
    },
    {
      title: "A Fellow Can't Go On Like This Forever",
      type: "Drama",
      text: "Your star player announces his retirement at 28. 'If I can't find some relief, I'll simply have to give up and spend the rest of my days on my farm in Iowa.' He has visited doctors in every major city. None can help. He goes home.",
      origin: "July 12, 1941: Trosky told reporters and his manager he was done. The migraines had won. He returned to his Iowa farm, not knowing if he'd ever play again.",
    },
    {
      title: "The Vitamin B-1 Cure",
      type: "Action",
      text: "After years of agony, your retired player discovers that vitamin shots and reduced dairy intake lessen the migraines. He attempts a comeback at 31. He is not the same player. But he walks onto the field one more time.",
      origin: "1945: Working at the Amana refrigeration plant, Trosky discovered that B-1 shots and less dairy helped his migraines. He returned with the White Sox in 1944 and 1946 but was a shell — .254 BA, 2 HR in his final year.",
    },
    {
      title: "The Cross-Handed Convert",
      type: "Action",
      text: "Your scout finds a kid who bats cross-handed from the right side. He tells the kid: keep your grip, but switch to the left side of the plate. The kid becomes one of the most devastating left-handed power hitters in the league.",
      origin: "1931: Cy Slapnicka saw Trosky batting cross-handed righty. He suggested switching to a left-handed stance while keeping the same grip. This one adjustment created 228 career home runs.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Big, powerful frame — 6'2\" 207 lbs, left-handed hitter's stance. Broad-shouldered Iowa farm kid. Honest face, not glamorous. Square jaw, light eyes, hair parted neatly. He looked like what he was: a farmer who could hit baseballs over buildings.",
    attire: "Cleveland Indians 1936 road grays. The old-style 'C' on the cap. No pinstripes — just plain, honest workwear of a mid-tier franchise. He's not in Yankee pinstripes or Tiger white. He's in Cleveland gray, and that says everything about his career.",
    mood: "Power and loneliness. The follow-through of a massive home run, bat pointing toward the sky — but the stands are half-empty because it's Cleveland in the Depression, not New York. Or: a quiet moment in the dugout, head in hands, eyes closed against the migraine. The card should feel like unrealized potential. The career that should have been.",
    style: "Muted Depression-era palette. Dust-bowl browns and steel grays. League Park's old concrete walls in the background. No glitz, no glamour. This is the anti-Yankee card. The card of the man who out-hit Gehrig in his first three years and never made an All-Star team.",
    reference: "The forgotten slugger. The card that asks: what does baseball owe the men it overlooks? 42 home runs, 162 RBI, and not even an All-Star nod. Then the migraines came, and history forgot him entirely.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: {
    metric: "Batting Average + OPS+",
    tiers: [
      { range: ".200-.249", value: 1 },
      { range: ".250-.269", value: 2 },
      { range: ".270-.299", value: 3 },
      { range: ".300-.329", value: 4 },
      { range: ".330+", value: 5 },
    ],
    bonus: "OPS+ ≥ 130 → +1 (cap 5)",
  },
  power: {
    metric: "Home Runs (peak season) + SLG",
    tiers: [
      { range: "0-9 HR", value: 0 },
      { range: "10-19 HR", value: 1 },
      { range: "20-29 HR", value: 2 },
      { range: "30-39 HR", value: 3 },
      { range: "40-49 HR", value: 4 },
      { range: "50+ HR", value: 5 },
    ],
    bonus: "SLG ≥ .500 → +1 (cap 5)",
  },
  speed: {
    metric: "Stolen Bases (peak) + positional range",
    tiers: [
      { range: "0-5 SB", value: 0 },
      { range: "6-15 SB", value: 1 },
      { range: "16-30 SB", value: 2 },
      { range: "31-50 SB", value: 3 },
    ],
    bonus: "Gold Glove at CF/SS → +1 (cap 3)",
  },
  defense: {
    metric: "Gold Gloves + positional reputation",
    tiers: [
      { range: "No Gold Glove", value: 0 },
      { range: "1-2 GG", value: 1 },
      { range: "3-5 GG", value: 2 },
      { range: "6+ GG", value: 3 },
    ],
  },
  overall: {
    formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13",
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
    metric: "Postseason BA + signature moments",
    tiers: [
      { range: "PS BA < .250", value: 0 },
      { range: "PS BA .250-.299", value: 1 },
      { range: "PS BA .300+", value: 2 },
    ],
    bonus: "World Series hero moment → +1 (cap 3)",
  },
};

// Color palette
const C = {
  parchment: "#f5edd6",
  darkBrown: "#3a2a1a",
  medBrown: "#6b5339",
  gold: "#c9a84c",
  warmRed: "#8b3a2a",
  sepia: "#a0845c",
  cream: "#faf3e3",
  ink: "#2a1f14",
  hotRed: "#c44536",
  coldBlue: "#3a6b8c",
  traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 2,
        transition: "width 0.8s ease",
      }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag, desc }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`,
    borderRadius: 3, padding: "3px 8px", margin: "2px 3px",
    fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace",
  }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase",
      color: C.gold, fontFamily: "'Courier Prime', monospace",
      borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10,
    }}>{title}</div>
    {children}
  </div>
);

export default function HalTroskyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = TROSKY_DATA;
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
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`,
      padding: "24px 12px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>
          Infinity League Baseball
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>
          Player Card Generator — Test Output
        </div>
      </div>

      {/* Card Container */}
      <div style={{
        width: "100%", maxWidth: 420,
        background: C.parchment,
        borderRadius: 8,
        border: `3px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`,
        overflow: "hidden",
      }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{
          width: "100%", padding: "8px 0",
          background: C.darkBrown, border: "none", cursor: "pointer",
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
        }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          /* ═══════════ FRONT OF CARD ═══════════ */
          <div style={{ padding: 20 }}>
            {/* Portrait Area */}
            <div style={{
              width: "100%", aspectRatio: "1/1",
              background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`,
              border: `2px solid ${C.gold}60`,
              borderRadius: 4,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Depression-era Cleveland grays, massive lefty swing follow-through, League Park concrete, half-empty stands]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
            </div>

            {/* Name Block */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            {/* ILB Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats Strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "OPS", val: d.real_stats.ops },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war },
                { label: "HITS", val: d.real_stats.hits },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {["🏛 Indians HOF 1951", "💥 42 HR (1936)", "📊 162 RBI (AL Leader)", "🔥 405 Total Bases", "💎 .343 BA Peak", "⚡ 228 Career HR"].map((a, i) => (
                <span key={i} style={{
                  fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`,
                  padding: "2px 8px", borderRadius: 10, color: C.medBrown,
                  fontFamily: "'Courier Prime', monospace",
                }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK OF CARD — DOSSIER ═══════════ */
          <div style={{ padding: 16 }}>
            {/* Dossier Header */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16,
              borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8,
            }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>

              {tab === "personality" && (
                <>
                  <Section title="Leadership">
                    <p style={{ margin: 0 }}>{d.personality.leadership_style}</p>
                  </Section>
                  <Section title="Temperament">
                    <p style={{ margin: 0 }}>{d.personality.temperament}</p>
                  </Section>
                  <Section title="Work Ethic">
                    <p style={{ margin: 0 }}>{d.personality.work_ethic}</p>
                  </Section>
                  <Section title="Lifestyle">
                    <p style={{ margin: 0 }}>{d.personality.lifestyle}</p>
                  </Section>
                  <Section title="Era Adaptability">
                    <p style={{ margin: 0 }}>{d.personality.era_adaptability}</p>
                  </Section>
                  <Section title="Clubhouse Impact">
                    <p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p>
                  </Section>
                  <Section title="⚠ Hidden Complexity">
                    <p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p>
                  </Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
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
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">
                    {d.momentum.hot_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="❄ Cold Triggers">
                    {d.momentum.cold_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p>
                  </Section>
                </>
              )}

              {tab === "actions" && (
                <>
                  <Section title="Action Card Seeds">
                    <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      These events, derived from Trosky's real life, become universal cards playable in any game.
                    </p>
                    {d.action_card_seeds.map((a, i) => (
                      <div key={i} style={{
                        background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`,
                        borderRadius: 4, padding: 10, marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                          <span style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 2,
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                            fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          }}>{a.type}</span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                        <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "engine" && (
                <>
                  <Section title="Stat Conversion Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      This is the reusable formula for converting real Baseball Reference stats into ILB card values.
                    </p>
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>
                          {key} — {data.metric || data.formula}
                        </div>
                        {data.tiers && (
                          <div style={{ marginTop: 4 }}>
                            {data.tiers.map((t, i) => (
                              <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>
                                {t.range} → {t.value !== undefined ? t.value : t.label}
                              </div>
                            ))}
                          </div>
                        )}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Trosky's Derivation">
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

        {/* Footer */}
        <div style={{
          background: C.darkBrown, padding: "6px 16px",
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
        }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{
        width: "100%", maxWidth: 420, marginTop: 20,
        background: "#1a150e", borderRadius: 6, padding: 16,
        border: `1px solid ${C.gold}30`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>
          JSON EXPORT PREVIEW
        </div>
        <pre style={{
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace",
          whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4,
          maxHeight: 200, overflow: "auto",
        }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  position: d.position,
  era: d.era,
  ilb_team: d.ilb_team,
  stats: d.ilb_stats,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
