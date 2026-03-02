import { useState } from "react";

const PLAYER_DATA = {
  name: "Preacher Roe",
  nickname: "The Preacher",
  year: 1951,
  team: "Brooklyn Dodgers",
  era: "1950s",
  ilb_team: "Dreamers NL1950",
  position: "SP",
  bats: "L",
  throws: "L",
  height: '6\'2"',
  weight: "170 lbs",
  born: "February 26, 1916 — Ash Flat, AR",
  died: "November 9, 2008 — West Plains, MO",
  hof: "Not inducted (0.8% peak vote). 127-84, 3.43 ERA, .880 W% in 1951 (NL record for 20-game winner). Boy of Summer.",

  real_stats: {
    season: {
      year: 1951,
      games: 36,
      w: 22, l: 3,
      era: "3.04",
      k: 133,
      bb: 63,
      ip: "257.2",
      cg: 16,
      whip: "1.10",
      war: 5.1,
    },
    career: {
      seasons: 12,
      w: 127, l: 84,
      era: "3.43",
      k: 956,
      cg: 101,
      sho: 17,
      no_hit: 0,
      war: 29.7,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — PITCHER
  //
  // STF: 3.04 ERA → tier 2 (3.00-3.49). K/9 ~4.6 → no bonus. Spitball artist / change-of-speed master. STF = 2.
  // CTL: BB/9 ~2.20 → tier 3 (2.00-2.49). Led NL in lowest BB/9 in 1948. WHIP ~1.10 → no bonus. CTL = 3.
  // STA: 257.2 IP → tier 3 (250-299). 16 CG. Career 101 CG. STA = 3.
  // DEF: Led NL pitchers in fielding % 4 times. Very good fielder. DEF = 1.
  // CLU: PS ERA 2.54 in 28.1 IP. CG shutout in '49 WS with BROKEN FINGER. Won Game 3 of '52 WS. +1 hero bonus. CLU = 2.
  // OVR: NL Pitcher of the Year 1951. 5× All-Star. 93-37 as a Dodger (.715). 3 pennant winners. But no ring, no HOF. OVR = 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    stf: 2,      // 3.04 ERA in 1951. Not overpowering — Mays said he had "two speeds: slow, and slower." Spitball was his secret weapon.
    ctl: 3,      // BB/9 ~2.20. Led NL in fewest BB/9 in 1948. Legendary control — Carl Erskine called him "a master of his craft."
    sta: 3,      // 257.2 IP, 16 CG in 1951. Career 101 CG. Durable craftsman despite slight frame.
    def: 1,      // Led NL pitchers in fielding % 4 times. Good glove, good fundamentals.
    clu: 2,      // 2.54 WS ERA. CG shutout in '49 WS with broken finger. Branch Rickey: "That boy is an artist — a supreme artist."
  },

  stat_justification: {
    stf: "3.04 ERA in 1951 — very good but not elite. Roe reinvented himself after a fractured skull destroyed his fastball in 1945. He went from a power pitcher (148 K, led NL in 1945) to a control artist who relied on the spitball, change-of-speed, and deception. Willie Mays: 'He had two fastball speeds — slow, and slower.' Sal Maglie confirmed his fastball 'really wasn't fast at all' but that it surprised batters after a string of off-speed pitches. His ERA+ in 1951 was ~122. K/9 ~4.6 → no bonus. Rating of 2.",
    ctl: "BB/9 approximately 2.20 in 1951 (63 BB in 257.2 IP). Led the NL in fewest BB/9 in 1948 and had the league's best K/BB ratio in 1949 (2.5:1). Roe's self-described pitch repertoire: 'My three pitches are my change, my change off my change, and my change off my change off my change.' He could paint corners with four different speeds of the same pitch. Carl Erskine: 'The Preach was a master of his craft. He was a smart control pitcher with a phenomenal sense of timing.' Rating of 3.",
    sta: "257.2 IP in 1951 — career high. 16 complete games. Career 101 CG in 261 starts. Despite weighing only 170 lbs on a 6'2\" frame, Roe was remarkably durable across his Dodger years. The spitball extended his career by reducing stress on his arm — it was essentially a 'trick' pitch that required finesse rather than effort. Rating of 3.",
    def: "Led NL pitchers in fielding percentage four times (1945, 1948, 1952, 1953). Very reliable defensive pitcher who fielded his position cleanly. Not flashy, but fundamentally sound. Rating of 1.",
    clu: "Postseason record: 2-1, 2.54 ERA, 28.1 IP, 3 complete games. In the 1949 World Series Game 2, Roe threw a 6-hit, complete-game shutout against the Yankees to win 1-0 — the Dodgers' only win in the series. He pitched the entire game with a broken finger after Johnny Lindell's line drive tore off half his nail in the 4th inning. The team doctor drilled a hole in the nail and bandaged it. Roe pitched 5 more innings with a throbbing, broken finger. Branch Rickey hugged him afterward and said: 'That boy is an artist — a supreme artist.' Also won Game 3 of the 1952 WS. PS ERA 2.00-4.00 → tier 1, +1 for broken-finger heroism = 2.",
  },

  personality: {
    leadership_style: "Trickster sage. Roe led through wit, intelligence, and deception — on the mound and off it. He played the hillbilly bumpkin for New York sportswriters, spinning yarns in a backcountry drawl, but he had a college degree in education and taught high school math. He led the Dodgers pitching staff with savvy, not charisma — the quiet con artist who always had another trick up his sleeve.",
    temperament: "Easy-going, funny, sly. Roe was everyone's favorite teammate — a natural storyteller and clubhouse character. Roger Kahn immortalized him in 'The Boys of Summer' as one of Brooklyn's most colorful figures. But beneath the humor was a fierce competitor who pitched through a broken finger in the World Series and threw an illegal pitch for years without getting caught. He was the fox in farmer's clothing.",
    work_ethic: "Self-reinvention. When a fractured skull destroyed his fastball after 1945, Roe didn't quit — he learned the spitball from an old catcher and rebuilt his career around deception. In 1946-47 with the Pirates, he was 7-23 with a 5.19 ERA. By 1949 with the Dodgers, he was 15-6 with a 2.79 ERA. He went from a washed-up power pitcher to one of the NL's best craftsmen through sheer intelligence and willingness to cheat.",
    lifestyle: "Country doctor's son from Ash Flat, Arkansas. Attended Harding College on a baseball scholarship, married childhood sweetheart Mozee. Taught high school math and coached basketball in the offseason. After baseball, he opened 'Preacher Roe's Super Market' in West Plains, Missouri. Used his $5,000 signing bonus to buy uniforms for the Harding College baseball team. Quietly philanthropic — helped a local town fund their ballpark lights. A genuine Arkansas gentleman.",
    era_adaptability: "LOW-MODERATE. Roe's success depended on two things that modern baseball has eliminated: the spitball and the tolerance for slow pitching. In today's game, he'd be caught on camera immediately and suspended. His K/9 of ~4.6 wouldn't survive modern hitters. However, his philosophy of changing speeds and disrupting timing is timeless — Greg Maddux essentially refined what Roe practiced. In ILB: Roe is a high-risk, high-reward pitcher whose effectiveness depends on whether the spitball is legal in that era.",
    clubhouse_impact: "BELOVED. Roe was a 'Boy of Summer' — one of the most beloved figures on the most beloved team in Brooklyn history. Jackie Robinson, Pee Wee Reese, Duke Snider, Roy Campanella, Gil Hodges, Carl Erskine — Roe was part of this legendary fraternity. He was one of the earliest Dodgers to accept Robinson without reservation: 'They got as much right to play as anyone else.' His wit and warmth made him the clubhouse glue.",
    dark_side: "The spitball confession. After retirement, Roe published an article in Sports Illustrated (1955) titled 'The Outlawed Spitball Was My Money Pitch,' openly admitting he'd thrown the illegal pitch throughout his career. Hitters had complained for years, but Roe was never caught. The admission was a scandal — and a relief. In ILB terms: Roe has a 'Spitball' trait that gives +1 STF but carries a 10% per-game chance of being caught. If caught, he's suspended for 5 games and his team loses -3 reputation. If he also uses a 'fake spitball' (same motion, dry ball), batters take -1 CON anyway from the psychological effect.",
  },

  chemistry_traits: [
    { tag: "The Spitball", desc: "Roe's illegal wet pitch gives +1 STF. But 10% chance per game of being caught by the umpire → 5-game suspension and -3 team reputation. 'Clean livin' and the spitball.'" },
    { tag: "Fake Spitball", desc: "When Roe goes through his spitball motion but throws a dry ball, opposing batters take -1 CON from the psychological deception. Works even when he's NOT throwing the actual spitter." },
    { tag: "Boys of Summer", desc: "+2 chemistry with all Dodgers teammates (Robinson, Reese, Snider, Campanella, Hodges, Erskine, Cox). The Brooklyn brotherhood was unbreakable." },
    { tag: "Hillbilly Act", desc: "Roe plays the country bumpkin for the press. Media scrutiny is redirected away from the team. -2 media pressure on the clubhouse while Roe is on the roster." },
    { tag: "Math Teacher", desc: "Roe taught high school math in the offseason. He calculates pitch sequencing with mathematical precision. Against batters he's faced 3+ times, Roe gains +1 CTL from pattern analysis." },
    { tag: "Fractured Skull Survivor", desc: "After surviving a fractured skull in a basketball refereeing brawl, Roe lost his fastball but gained the 'Reinvention' trait. Any pitcher who suffers a career-altering injury can roll for Reinvention: on 4+, they develop a new pitch category." },
    { tag: "Broken Finger Warrior", desc: "Roe pitched 5 innings of a WS shutout with a broken finger. In October, Roe ignores the first injury event — he pitches through it at full effectiveness." },
    { tag: "Preacher's Super Market", desc: "After retirement, Roe opens a grocery store. +1 community reputation. He spots a teenage Bill Virdon playing center field and recommends him to scouts." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "The con artist's stage. Slow, slower, and slowest — but always in control." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Spinning yarns, telling jokes, keeping the Boys of Summer loose and laughing." },
    { location: "Rural / Farm / Country", affinity: "HIGH", note: "Ash Flat, Arkansas. Country doctor's son. West Plains, Missouri grocery store." },
    { location: "Classroom / Teaching", affinity: "MEDIUM", note: "Taught high school math. Coached basketball. Education degree from Harding College." },
    { location: "Community Events", affinity: "MEDIUM", note: "Fundraising games to build ballpark lights. Preacher Roe Park in Salem, AR." },
    { location: "Media / Spotlight", affinity: "MEDIUM", note: "Performed the hillbilly act for sportswriters — but was secretly the smartest guy in the room." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Family man. Country boy. Home with Mozee." },
  ],

  momentum: {
    hot_triggers: [
      "Winning streaks — won first 10 decisions in 1951, then another 10 in a row later",
      "Pitching for the Dodgers — 93-37 (.715) in Brooklyn vs. 34-47 everywhere else",
      "World Series starts — 2.54 ERA, 3 CG, pitched through a broken finger",
      "Outthinking hitters — the longer Roe faces a lineup, the better he gets",
    ],
    cold_triggers: [
      "Playing for bad teams — 7-23, 5.19 ERA with the terrible Pirates (1946-47)",
      "Physical injury — fractured skull after 1945 destroyed his fastball permanently",
      "Being exposed — if batters stop chasing his off-speed and sit on the spitter, he's vulnerable",
    ],
    pressure_response: "GUTSY. Roe's defining moment came in Game 2 of the 1949 World Series. Throwing a 6-hit shutout against the Yankees, he took a line drive off his glove hand in the 4th inning that broke his finger and tore off half the nail. The doctor drilled a hole in the nail to relieve swelling, bandaged it, and Roe pitched 5 more innings with a throbbing broken finger. He won 1-0 — the Dodgers' only victory in the series. Branch Rickey called him 'a supreme artist.' His WS record of 2-1 with a 2.54 ERA, all in complete games, shows a pitcher who elevated when it mattered most. He wasn't flashy — he was gutsy.",
  },

  action_card_seeds: [
    {
      title: "The Outlawed Spitball Was My Money Pitch",
      type: "Action",
      text: "Your pitcher secretly throws an illegal pitch — the spitball. He gains +1 STF for his career. But after retirement, he publishes a confession in a national magazine. The baseball world is scandalized. Historical legacy: +2 (for honesty) and -1 (for cheating). Opposing teams say: 'We knew it all along.'",
      origin: "After retiring in 1954, Roe confessed in Sports Illustrated (1955) that the spitball was his primary weapon throughout his Dodger career. Hitters had complained for years. The article was titled 'The Outlawed Spitball Was My Money Pitch.' He opened with: 'When asked to explain my longevity, I replied — clean livin' and the spitball.'",
    },
    {
      title: "The Broken Finger Shutout",
      type: "Game Action",
      text: "World Series game. Your pitcher takes a line drive off his glove hand in the 4th inning, breaking his finger. The doctor drills a hole in the nail and bandages it. Your pitcher has a choice: leave the game, or pitch 5 more innings with a broken finger. If he stays: roll 4+ for a complete-game shutout and +5 team legacy. On 1-3: he gives up 3 runs and takes the loss.",
      origin: "1949 WS Game 2: Johnny Lindell's line drive broke Roe's finger in the 4th. The doctor drilled and bandaged it. Roe pitched 5 more innings, won 1-0 on a CG shutout. Rickey: 'That boy is an artist — a supreme artist.'",
    },
    {
      title: "Slow, and Slower",
      type: "Action",
      text: "Your pitcher's three pitches are: 'my change, my change off my change, and my change off my change off my change.' Each pitch is 3-5 mph slower than the last. After 3 innings of this, opposing batters are so off-balance that your pitcher's mediocre fastball looks like 100 mph. +2 STF for innings 4-9.",
      origin: "Roe's famous self-description of his repertoire. Sal Maglie confirmed his fastball 'really wasn't fast at all' but it worked because of the speed differential. Willie Mays said he had 'two speeds: slow, and slower.'",
    },
    {
      title: "A Pitcher Should Pay to Pitch for the Dodgers",
      type: "Drama",
      text: "Your struggling pitcher is traded from the worst team in the league to the best. His ERA drops by 2.50. His wins double. The fielders behind him catch everything. He declares: 'A pitcher should pay to pitch for this team. On my old team, the shortstop and second baseman were like goalposts.'",
      origin: "Traded from Pittsburgh (7-23, 5.19 ERA in 1946-47) to Brooklyn, Roe became a star: 93-37, sub-3.00 ERA. His comparison of the Dodgers' and Pirates' infield defense became one of baseball's most famous quotes.",
    },
    {
      title: "The Bumpkin and the Math Teacher",
      type: "Drama",
      text: "Your player cultivates a 'simple country boy' persona for the media, complete with backcountry drawl and folksy stories. But he secretly has a college degree and teaches mathematics in the offseason. The deception keeps media attention away from his illegal pitch. +2 media misdirection.",
      origin: "New York sportswriters presented Roe as a hillbilly bumpkin. He played along perfectly. But he had a degree from Harding College and taught high school math. Roger Kahn saw through it: Roe was one of the smartest men on the team.",
    },
    {
      title: "The Fractured Skull",
      type: "Drama",
      text: "Your ace pitcher, during the offseason, suffers a fractured skull in a brawl while coaching basketball. His fastball is permanently destroyed. He must reinvent himself or retire. Roll: on 3+, he discovers a new pitch (spitball, changeup, or cutter) and rebuilds his career. On 1-2, he never recovers.",
      origin: "After the 1945 season (14-13, 148 K led NL), Roe suffered a fractured skull in a fight with a basketball referee. His fastball never returned. He learned the spitball and rebuilt his entire career around deception.",
    },
    {
      title: "Dixie Walker's Seat",
      type: "Drama",
      text: "Your team trades a popular but racist player for a journeyman pitcher and a shell-shocked infielder. The racist player demanded the trade because he refused to play with a Black teammate. The journeyman pitcher turns out to be an ace. The infielder, recovering from PTSD, becomes the best defensive third baseman in the league. The racist player fades into obscurity.",
      origin: "Dixie Walker demanded a trade from Brooklyn because he wouldn't play with Jackie Robinson. The Dodgers got Preacher Roe and Billy Cox (who had severe PTSD from WWII combat). Roe: Rickey got 'an infielder who'd been shook real bad and a skinny pitcher with a busted head.' Both became stars.",
    },
    {
      title: "22 and 3",
      type: "Game Action",
      text: "Your pitcher starts the season 10-0. He wins another 10 in a row later. He finishes 22-3 with the best winning percentage for a 20-game winner in league history. But his team blows a 13-game lead in August and loses the pennant in a tiebreaker. The greatest individual season becomes the most heartbreaking team collapse.",
      origin: "Roe's 1951 season: 22-3, .880 W% (still NL record). But the Dodgers blew a 13½-game August lead and lost to the Giants on Bobby Thomson's Shot Heard 'Round the World. Roe's masterpiece was consumed by catastrophe.",
    },
  ],

  art_direction: {
    face: "Lean, angular face with sharp features and a sly, knowing grin. 6'2\" 170 lbs — bony, wiry, all limbs and angles. The face of a man who looks like a country preacher but thinks like a mathematician. Mischievous eyes under a Brooklyn Dodgers cap. Light stubble. Age 35 in 1951 — the late-career craftsman at his absolute peak.",
    attire: "Brooklyn Dodgers road grays, 1951 flannel, number 28. Left-handed delivery — the high leg kick and the signature motion where he reaches up to touch his cap (loading the spitball). Or: the sly grin after getting a strikeout on a pitch that may or may not have been wet. Ebbets Field in the background.",
    mood: "Sly intelligence and quiet confidence. The portrait should radiate the 'trickster' energy — this is a man who fooled batters, umpires, and sportswriters for years. Not menacing, not intimidating — amused. The look of a con artist who knows something you don't.",
    style: "Warm sepia with Brooklyn blue accents. Ebbets Field's distinctive facade and Abe Stark 'Hit Sign, Win Suit' advertisement visible in the background. 1951 Bowman card aesthetic in unified ILB portrait style. The card should feel like a secret being shared.",
    reference: "The 'trickster' card of the Dreamers set. Pair with Maglie for the ultimate 'honest menace vs. dishonest charm' contrast. Roe and Maglie were rivals who defined 1950s NL pitching from opposite sides — the Brooklyn fox and the Polo Grounds wolf.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "ERA (primary) + K/9 bonus", tiers: [{ range: "4.00+", value: 1 },{ range: "3.50-3.99", value: 2 },{ range: "3.00-3.49", value: 2 },{ range: "2.50-2.99", value: 3 },{ range: "2.00-2.49", value: 4 },{ range: "< 2.00", value: 5 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (primary) + WHIP bonus", tiers: [{ range: "4.0+", value: 0 },{ range: "3.50-3.99", value: 1 },{ range: "2.50-2.99", value: 2 },{ range: "2.00-2.49", value: 3 },{ range: "< 2.00", value: 4 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (season)", tiers: [{ range: "< 150 IP", value: 1 },{ range: "150-199", value: 2 },{ range: "200-249", value: 3 },{ range: "250-299", value: 3 },{ range: "300+", value: 4 }], bonus: "30+ CG or 350+ IP → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + GG equivalent", tiers: [{ range: "Below average", value: 0 },{ range: "Average / solid", value: 1 },{ range: "Above average", value: 2 },{ range: "Elite", value: 3 }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS hero / defining moment → +1 (cap 3)" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Cy Young" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function PreacherRoeCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div><div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Dreamers Era</div></div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Warm sepia, sly grin, left-hand delivery, Dodgers grays, Ebbets Field]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div><div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div></div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.season.w}-${d.real_stats.season.l}` },{ label: "ERA", val: d.real_stats.season.era },{ label: "K", val: d.real_stats.season.k },{ label: "BB", val: d.real_stats.season.bb },{ label: "IP", val: d.real_stats.season.ip },{ label: "CG", val: d.real_stats.season.cg },{ label: "WHIP", val: d.real_stats.season.whip },{ label: "WAR", val: d.real_stats.season.war }].map((stat, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.season.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}cc`, borderRadius: 4, padding: 10, marginTop: 8 }}>
              {[{ label: "CAR W", val: d.real_stats.career.w },{ label: "CAR L", val: d.real_stats.career.l },{ label: "CAR ERA", val: d.real_stats.career.era },{ label: "CAR K", val: d.real_stats.career.k },{ label: "CAR CG", val: d.real_stats.career.cg },{ label: "CAR SHO", val: d.real_stats.career.sho },{ label: "NO-HIT", val: d.real_stats.career.no_hit },{ label: "CAR WAR", val: d.real_stats.career.war }].map((stat, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — {d.real_stats.career.seasons} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 5× All-Star", "🏅 NL POY 1951", "📜 .880 W% (NL Record)", "💧 Spitball Confessor", "🔥 22-3 in 1951", "💔 Boys of Summer"].map((a, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.traitGreen }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Roe's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine — Pitcher"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB pitcher card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Roe's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
