// /cards/players/hack-wilson.jsx
import { useState } from "react";

const WILSON_DATA = {
  name: "Hack Wilson",
  nickname: "The Barrel",
  year: 1930,
  team: "Chicago Cubs",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "CF",
  bats: "R",
  throws: "R",
  height: '5\'6"',
  weight: "190 lbs",
  born: "April 26, 1900 — Ellwood City, Pennsylvania. Born to two alcoholic parents. His physique — oversized head, small feet (size 6), short legs, 18-inch neck — are consistent with Fetal Alcohol Syndrome.",
  died: "November 23, 1948 — Baltimore, Maryland (age 48). Body unclaimed in hospital. Identified only as 'a white male.' National League president Ford Frick paid $350 for the funeral. The man who drove in 191 runs in a single season died alone and anonymous.",
  hof: "INDUCTED 1979 (Veterans Committee — posthumous, 31 years after death). .307 career BA, 244 HR, 1,063 RBI in only 12 seasons. 191 RBI in 1930 — ALL-TIME MLB RECORD, still standing. 56 HR — NL record for 68 years. The briefest, brightest, most devastating career in the Bashers.",

  real_stats: {
    season: 1930,
    batting_avg: ".356",
    obp: ".454",
    slg: ".723",
    ops: "1.177",
    hits: 208,
    doubles: 35,
    triples: 6,
    home_runs: 56,
    rbi: 191,
    runs: 146,
    stolen_bases: 3,
    total_bases: 423,
    walks: 105,
    games: 155,
    war: 10.0,
    august_rbi: "53 RBI in August alone (single-month MLB record)",
    rbi_record: "191 — ALL-TIME MLB RECORD (still standing, 95+ years)",
    nl_hr_record: "56 — NL record for 68 years (until Sosa/McGwire 1998)",
    five_year_peak: ".331 / 35 HR / 142 RBI avg (1926-1930), 1.031 OPS",
    career_batting_avg: ".307",
    career_hr: 244,
    career_rbi: 1063,
    career_seasons: 12,
    ws_1929_ba: ".471 (but lost 2 fly balls in the sun — Game 4, 10-run inning)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1930 SEASON
  //
  // CON: .356 BA, 208 H, .454 OBP, 105 BB. Career .307.
  //      Excellent contact but not the pure line-drive approach
  //      of Hornsby or Cuyler. Wilson was a HACKER — aggressive,
  //      swinging for the fences, high-strikeout for the era.
  //      The .356 in 1930 is partly the era's offensive inflation.
  //      CON = 3 (STRONG — .356 is impressive but inflated by
  //      the 1930 offensive environment. Career .307 is the
  //      truer measure. Good eye (105 BB) but not elite contact.)
  //
  // POW: 56 HR. 191 RBI. .723 SLG. 423 TB. 1.177 OPS.
  //      THE ALL-TIME RBI RECORD. NL HR record for 68 years.
  //      In 1930, he hit more HR than any NL player ever had.
  //      The power was MASSIVE — not gap power, not running
  //      power, but PURE FENCE-CLEARING DESTRUCTION.
  //      From a 5'6" frame. Extraordinary.
  //      POW = 5 (MAXIMUM — 56 HR and 191 RBI. The RBI record
  //      may never be broken. 53 RBI in August alone. Ruth-tier
  //      power from a man a foot shorter than Ruth.)
  //
  // SPD: 3 SB. 6 3B. 5'6" with small feet. Not fast.
  //      Capable CF defensively (led league in putouts 1927)
  //      but the speed was adequate, not a weapon.
  //      SPD = 1 (BELOW AVERAGE — short legs, heavy frame.
  //      Adequate to play CF in 1920s outfields but not a
  //      baserunning threat.)
  //
  // DEF: Played CF. Led league in putouts 1927 (400).
  //      Capable outfielder with decent range and arm.
  //      BUT: lost two fly balls in the sun in 1929 WS Game 4
  //      — the most famous defensive disaster in WS history.
  //      DEF = 1 (the 1929 WS errors define the defensive
  //      legacy despite generally adequate CF play. The sun
  //      balls are the only defense anyone remembers.)
  //
  // CLU: .471 in 1929 WS — incredible. But lost 2 fly balls
  //      in the sun that turned an 8-0 lead into a 10-8 loss.
  //      "Inconsolable." Never won a World Series.
  //      191 RBI in a season where the Cubs finished 2nd.
  //      His greatest season DIDN'T WIN ANYTHING.
  //      CLU = 1 (the .471 WS BA is real but the fly balls
  //      overshadow everything. The 191 RBI produced no
  //      championship. The greatest offensive season ever
  //      ended without a ring.)
  //
  // OVR: CON×2(6) + POW×1(5) + SPD×1.5(1.5) + DEF×0.5(0.5) + CLU×1.5(1.5) = 14.5 → normalized ~8
  // OVR = 8 (ALL-STAR / ⚠ WEIGHTED — Hack Wilson's 1930
  // season alone would warrant OVR 10+. But the 12-year
  // career, the rapid decline, the defensive liability in
  // October, and the brevity of the peak temper the rating.
  // This is the SPIKEIEST card in the Bashers — the highest
  // peak compressed into the shortest window.)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,
    con: 3,    // .356 BA, 208 H, .454 OBP, 105 BB. Career .307. Strong but partly inflated by 1930 offensive environment. Good eye but aggressive hacker.
    pow: 5,    // MAXIMUM. 56 HR, 191 RBI (ALL-TIME RECORD), .723 SLG, 423 TB. NL HR record 68 years. 53 RBI in one month. Ruth-tier power from a 5'6" frame. Pure destruction.
    spd: 1,    // 3 SB, 6 3B. Short legs, heavy build. Adequate to play CF but not a baserunning weapon.
    def: 1,    // Capable CF (led league putouts 1927) but defined by 1929 WS fly-ball disaster. Two balls lost in the sun. 8-0 became 10-8.
    clu: 1,    // .471 WS BA but lost 2 fly balls that cost the Series. 191 RBI produced no championship. Greatest season ever ended without a ring.
  },

  stat_justification: {
    con: "Wilson hit .356 in 1930 with 208 hits and a .454 OBP. He walked 105 times. Career: .307 BA. The contact is strong but context matters: 1930 was the most inflated offensive year in MLB history (NL batted .303 collectively). Wilson was an aggressive hacker who swung for the fences — not a pure contact hitter like Hornsby or Cuyler. His career BA outside his 5-year peak dropped to the .270s. Rating of 3.",
    pow: "56 home runs. 191 RBI. Both records when set — the RBI record STILL STANDS nearly a century later. No one has come within 15 RBI since 1938. His .723 SLG and 423 total bases are among the highest single seasons ever recorded. He hit 53 RBI in August 1930 alone — the most productive month by any hitter in MLB history. He produced all this power from a 5'6\", 190 lb frame — a body built like a barrel. Career: 244 HR in only 12 seasons. This is maximum power. Rating of 5.",
    spd: "Wilson stole 3 bases in 1930 and hit 6 triples. At 5'6\" with size 6 feet and a barrel-shaped body, he was not built for speed. He was adequate in center field thanks to decent read-off-the-bat ability but was never a baserunning threat. Career: 52 stolen bases in 12 years. Rating of 1.",
    def: "Wilson was a capable center fielder who led NL outfielders in putouts with 400 in 1927. He had decent range and an adequate arm. But the 1929 World Series defines his defensive legacy: in Game 4, with an 8-0 lead, Wilson lost two fly balls in the sun during the Athletics' 10-run 7th inning. The Cubs lost 10-8 and eventually the Series. Teammate Kiki Cuyler said Wilson was 'inconsolable.' The nightmare 'played endlessly in his memory.' For the rest of his life, fans remembered the fly balls more than the 191 RBI. Rating of 1.",
    clu: "Wilson hit .471 in the 1929 World Series — remarkable contact in October. But the two fly balls lost in the sun in Game 4 overwhelm that number in the historical record. The 10-run inning that resulted is among the most devastating collapses in WS history. Furthermore, Wilson's greatest season (1930: 56 HR, 191 RBI) did not produce a pennant — the Cubs finished two games behind the Cardinals. The greatest offensive season ever produced no championship. Wilson never won a World Series. Rating of 1.",
  },

  personality: {
    leadership_style: "BELOVED EVERYMAN. Wilson was not a leader in the traditional sense — he was a FOLK HERO. 'Hack Wilson was as great a hero in Chicago as Babe Ruth was in New York.' He thrived on the adoration of Cubs fans. He was 'an affable sort, willing to strike up a conversation with anyone.' He signed autographs, bought rounds at speakeasies, befriended Al Capone. The leadership was charisma — the little barrel-shaped man who could hit the ball as far as Ruth despite being a foot shorter.",
    temperament: "COMBUSTIBLE AND GENEROUS. Wilson fought constantly — umpires, opposing players, reporters on trains, anyone who provoked him. He was suspended for fighting reporters in Cincinnati (1931). Commissioner Landis stopped him from boxing professionally against White Sox 1B Art Shires. But he was also generous, warm, and quick to laugh when sober. The combativeness was fuel — it powered the swing, the home runs, the confrontations. Without it, there was no Hack Wilson. With too much of it, he destroyed himself.",
    work_ethic: "NATURAL TALENT MEETS SELF-DESTRUCTION. Wilson did not have Hornsby's monomaniacal discipline or Cuyler's patient development. He had NATURAL POWER — the barrel chest, the quick wrists, the eye. Joe McCarthy understood how to channel the talent: give Wilson structure, forgiveness, and a long leash. Under McCarthy, Wilson hit 56 HR and 191 RBI. Under Hornsby, who gave him neither forgiveness nor a leash, Wilson hit .261 with 13 HR. The talent was always there. The management of the talent was the variable.",
    lifestyle: "PROHIBITION-ERA CHICAGO AT MAXIMUM VOLUME. Wilson lived large in Al Capone's Chicago — speakeasies, nightclubs, late nights, hard drinking. He was the embodiment of the Roaring Twenties excess. 'I never played drunk. Hung over, yes, but never drunk.' The drinking was not recreational — it was structural. Born to two alcoholic parents, likely affected by Fetal Alcohol Syndrome, Wilson's relationship with alcohol was biological as much as behavioral. The disease was inherited before it was chosen.",
    era_adaptability: "MIXED. Wilson's pure power would translate to any era — 56 HR is 56 HR. But his body type (5'6\", 190 lbs, short legs, heavy) would face modern athletic standards. His alcoholism would be treated rather than enabled. His defensive limitations would likely push him to LF or DH. In a modern context, Wilson might be a .260 hitter with 45+ HR — a three-true-outcomes slugger who strikes out 180 times but hits the ball very, very far.",
    clubhouse_impact: "HIGH POSITIVE WHEN MANAGED WELL, TOXIC WHEN NOT. Under McCarthy: +2 morale, +2 offensive production. Under Hornsby: -2 morale, -3 personal production. Wilson's clubhouse value was entirely dependent on management. He needed a handler — someone who understood that the drinking and fighting were the price of the power. McCarthy paid the price gladly. Hornsby refused.",
    tragic_element: "THE MOST TRAGIC CARD IN THE BASHERS — and possibly in the entire ILB system. Born to two alcoholics. Likely Fetal Alcohol Syndrome. Built like a barrel on toothpicks. Hit 191 RBI in a single season — THE ALL-TIME MLB RECORD. Drove in Kiki Cuyler for his 191st. Won nothing. Lost fly balls in the sun that haunted him forever. Drank himself out of baseball by 34. Opened a pool hall. It failed. Tended bar near Ebbets Field. Sang for drinks. Customers became abusive. He quit. Worked as a tool checker. A laborer. A swimming pool manager. Died at 48 in a Baltimore hospital. Body unclaimed. Identified as 'a white male.' NL president Ford Frick paid $350 for the funeral of the man who held baseball's all-time RBI record. 'I don't have a regret in the world,' said Bottomley. Hack Wilson had nothing but regrets. The sunshine and the barrel, in the same set, asking different questions about what baseball gives and what it takes.",
  },

  chemistry_traits: [
    { tag: "One Hundred Ninety-One", desc: "The all-time MLB RBI record. Still standing after 95+ years. No one has come within 15 since 1938. In ILB, Wilson has UNCAPPED RBI potential — the only card in the system where the single-season RBI record can be approached. When Wilson is hot, every at-bat with runners on base is dangerous." },
    { tag: "The Barrel", desc: "5'6\", 190 lbs. Size 6 shoes. 18-inch neck. A body built like a keg of beer. In ILB, Wilson's unusual physique means +2 POW but -1 SPD permanently. The power comes FROM the body — the low center of gravity, the quick wrists, the leverage of a man who swings upward into the ball because he's looking UP at it." },
    { tag: "Lost in the Sun", desc: "1929 WS Game 4: Two fly balls lost in the sun. 8-0 lead became 10-8 loss. 'Inconsolable.' In ILB, Wilson has a d20 defensive vulnerability in day games: on 1, he loses a fly ball. The sun never forgave him. He never forgave himself." },
    { tag: "McCarthy's Man", desc: "Joe McCarthy knew how to handle Wilson. Under McCarthy: 56 HR, 191 RBI. Under Hornsby: .261, 13 HR. In ILB, Wilson's stats are DIRECTLY tied to manager quality. With a supportive manager: +2 all stats. With an authoritarian manager: -3 all stats. The talent needs the right handler." },
    { tag: "Capone's Friend", desc: "Wilson lived large in Prohibition-era Chicago. Friend of Al Capone. Speakeasies and nightclubs. In ILB, Wilson has +1 to charisma and fan engagement but a d20 discipline check each month: on 1-3, a drinking incident causes a 3-game absence." },
    { tag: "Born to It", desc: "Born to two alcoholic parents. Likely Fetal Alcohol Syndrome. The disease was inherited before it was chosen. In ILB, Wilson's alcoholism is NOT a character flaw — it is a MEDICAL CONDITION. The card treats it accordingly: inevitable decline after age 30 regardless of stats. The body fails because the body was built to fail." },
    { tag: "The Unclaimed Body", desc: "Died alone in a Baltimore hospital, age 48. Body identified only as 'a white male.' Ford Frick paid for the funeral. In ILB, Wilson has the LOWEST post-career rating of any card in the Bashers. The record stands. The man did not." },
    { tag: "Cuyler's Outfield", desc: "Wilson (CF) and Cuyler (RF) formed two-thirds of 'the best hitting outfield in baseball' with Riggs Stephenson (LF). Wilson's 191st RBI was driving in Cuyler. In ILB, when Wilson and Cuyler are in the same outfield: +1 to both offensive stats. The outfield that terrorized the NL." },
  ],

  preferred_locations: [
    { location: "Wrigley Field, Chicago", affinity: "MAXIMUM / GLORY", note: "1926-1931. 56 HR. 191 RBI. The cheers of 'HACK! HACK!' The speakeasies after the games. The peak and the beginning of the fall." },
    { location: "The Speakeasy", affinity: "ADDICTION / CULTURE", note: "Prohibition-era Chicago nightlife. Al Capone's city. Wilson lived large when large was the only speed available." },
    { location: "Shibe Park (1929 WS)", affinity: "NIGHTMARE", note: "Game 4. The sun. Two fly balls. 8-0 became 10-8. The nightmare that played endlessly in his memory." },
    { location: "Baltimore Hospital (1948)", affinity: "DEATH", note: "Died alone. Body unclaimed. 'A white male.' Ford Frick paid $350 for the funeral of the all-time RBI king." },
  ],

  momentum: {
    hot_triggers: [
      "August — Wilson's 53 RBI in August 1930 is the most productive month by any hitter in MLB history. When Wilson gets hot in late summer, the production is SUPERNATURAL.",
      "Runner-on-base situations — 191 RBI. Wilson was built to drive in runs. The more runners, the more dangerous he became.",
      "Supportive management — Under McCarthy, Wilson was a force of nature. The right manager unlocked the barrel.",
      "Fan energy — Wilson fed on crowd noise. Wrigley Field's 'HACK! HACK!' chants elevated his performance.",
    ],
    cold_triggers: [
      "Authoritarian management — Under Hornsby, Wilson collapsed. .261 / 13 HR / 61 RBI in 1931. The wrong manager capped the barrel.",
      "October sun — the 1929 WS fly balls haunted him. Day games in October carried psychological weight.",
      "Alcohol — hangovers degraded performance gradually. 'Never drunk, but hung over.' The hung-over version was still dangerous but not supernatural.",
      "Post-peak decline — after 1930, the decline was catastrophic and irreversible. 56 HR became 13 became 9 became 6. The body broke fast.",
    ],
    pressure_response: "SPECTACULAR AND FRAGILE. Wilson's pressure response was binary: either he hit .471 in the World Series or he lost two fly balls in the sun. There was no middle ground. The barrel was full or empty. CLU = 1 reflects the overall balance — the fly balls and the ringless career outweigh the .471 WS average. But on any given at-bat, Wilson could be the most dangerous hitter alive.",
  },

  action_card_seeds: [
    {
      title: "One Hundred Ninety-One",
      type: "Record / Immortality",
      text: "1930. Your center fielder drives in 191 runs. One hundred ninety-one. The all-time Major League Baseball record. Ninety-five years later, nobody has come within fifteen. He hits 56 home runs — the National League record for sixty-eight years. He bats .356. He slugs .723. He produces 423 total bases. He drives in 53 runs in August alone — the most productive month any hitter has ever had. On the last day of the season, he drives in Kiki Cuyler with an infield single for RBI number 191. The Cubs lose the pennant by two games. Your center fielder has produced the greatest offensive season in baseball history. It wins nothing. The record stands. The trophy case is empty.",
      origin: "Wilson's 1930 season — 191 RBI (all-time record), 56 HR, .356 BA. Cubs finished 2nd.",
    },
    {
      title: "Lost in the Sun",
      type: "Tragedy / Nightmare",
      text: "October 12, 1929. Shibe Park, Philadelphia. Game Four of the World Series. Your center fielder has been hitting .471 in the Series. The Cubs lead 8-0 in the bottom of the seventh inning. The Athletics mount a rally. A fly ball is hit to center field. Your center fielder runs back. The sun is in his eyes. He loses the ball. It falls. Runners score. Another fly ball. Again the sun. Again he loses it. Mule Haas hits an inside-the-park home run through the space where your center fielder cannot see. The Athletics score ten runs. Ten runs in one inning. 8-0 becomes 10-8. Your center fielder walks off the field with glistening eyes. He never forgets. For the rest of his life — the pool halls, the bars, the factory floors — the sun is always in his eyes.",
      origin: "1929 WS Game 4 — Wilson lost two fly balls in the sun during the Athletics' 10-run 7th inning.",
    },
    {
      title: "A White Male",
      type: "Tragedy / Epitaph",
      text: "November 23, 1948. A man dies in a Baltimore hospital. He is forty-eight years old. His body is unclaimed. The hospital identifies him as 'a white male.' His name was Lewis Robert Wilson. Eighteen years earlier, he drove in 191 runs in a single season — more than any man in the history of Major League Baseball. Before that and after that. He had opened a pool hall. It failed. He tended bar near Ebbets Field. He sang for drinks. The customers became abusive. He quit. He checked tools in an airplane factory. He managed a swimming pool for the city. The National League president, Ford Frick, paid three hundred and fifty dollars for the funeral of the all-time RBI king. The record still stands. The body did not.",
      origin: "Wilson's death — unclaimed body, Ford Frick's funeral payment, the last chapter.",
    },
    {
      title: "The Barrel",
      type: "Character / Physical",
      text: "Your center fielder is five feet six inches tall. He weighs one hundred ninety pounds. His shoes are size six. His neck is eighteen inches around. He was born to two alcoholic parents. The oversized head. The small feet. The short legs. The flat face. The body was built wrong before it was born. And from this body — this barrel on toothpicks, this impossible physique — came 56 home runs and 191 RBI. The swing was a miracle of leverage: a short man looking UP at the ball, whipping the bat from below, generating power that defied physics. 'For a brief span of a few years, this hammered-down little strongman actually rivaled the mighty Ruth.'",
      origin: "Wilson's unique physique (likely Fetal Alcohol Syndrome) and the power it somehow produced.",
    },
    {
      title: "McCarthy's Leash",
      type: "Character / Management",
      text: "Joe McCarthy understood that Hack Wilson was not a machine. He was a barrel of nitroglycerin. Handle with care. Forgive the hangovers. Ignore the speakeasy receipts. Let him swing away. Under McCarthy: .345, 39 HR, 159 RBI (1929). Then .356, 56 HR, 191 RBI (1930). Then McCarthy left and Rogers Hornsby arrived. Hornsby did not forgive. Hornsby did not ignore. Hornsby demanded discipline from a man whose body was built without it. Under Hornsby: .261, 13 HR, 61 RBI (1931). The talent was identical. The handler changed. The barrel cracked.",
      origin: "McCarthy vs. Hornsby — the management contrast that defined Wilson's peak and collapse.",
    },
    {
      title: "Sang for Drinks",
      type: "Tragedy / Post-Career",
      text: "After baseball, your center fielder worked as a bartender near Ebbets Field in Brooklyn. When the bar was slow, he sang for drinks. He had a passable voice. The customers knew who he was — or who he had been. Sometimes they were kind. Sometimes they were not. When the abuse became too much, he quit. He moved to Baltimore. He checked tools in a factory. He dug ditches for the city. When the city discovered that the ditch-digger was the all-time RBI king, they made him manager of a swimming pool. 'Fans remembered my two dropped fly balls in the 1929 World Series far more vividly than my 56 home runs and 191 RBIs in 1930.' He was right. They did.",
      origin: "Wilson's post-career — bartender, singer for drinks, tool checker, laborer, pool manager.",
    },
  ],

  art_direction: {
    face: "5'6\" 190 lbs — THE BARREL. A head too big for the body. A neck too thick for the head. Broad shoulders on short arms. Powerful chest on stubby legs. Size 6 feet. This is NOT a classical athlete's body — this is a body that SHOULDN'T work for baseball but did, spectacularly, for five years. The face should be OPEN and WARM when young (the affable Hack who signed autographs) but with shadows under the eyes that hint at what's coming. A flat, broad face with a wide jaw. The eyes are bright but slightly glassy — the hangover is always recent.",
    attire: "Chicago Cubs 1930 home whites. In a MASSIVE SWING — the bat coming through the zone from below, the barrel chest rotated, the follow-through carrying the body upward. The swing should look VIOLENT — not elegant like Hornsby's coiled precision, but raw, explosive, a barrel detonating. The uniform should be tight on the chest and loose on the legs — the disproportionate body rendered in cloth.",
    mood: "BRIGHT EXPLODING INTO DARK. This is the card of the highest peak and the lowest valley in the Bashers. The front should feel EXPLOSIVE — power, home runs, the roar of Wrigley Field, the 191 RBI. But the edges should darken — the speakeasy shadows, the sun in the eyes, the Baltimore hospital. The mood is FIREWORK — beautiful, brief, and then dark. The card that burns brightest burns shortest.",
    style: "Full color — Bashers era — INTENSE AND DOOMED. Cubs blue, amber gold, white hot. But TINGED with shadows — the blue is slightly too dark, the gold slightly too amber, the white slightly too gray. The border should be AMBER — the color of whiskey, the color of a setting sun, the color of a record that outlived the man by seventy-seven years. THE BARREL — the card that contains the most power in the smallest space. The card that breaks your heart.",
    reference: "Ruth is the solar system. Gehrig is the axis. Hornsby is the blade. Cuyler is the echo. Hack Wilson is THE BARREL — the most compressed power in the Bashers, the shortest fuse, the loudest explosion, the quietest death. He is the card you pick up expecting joy and put down in grief. 191 RBI. A white male. Three hundred and fifty dollars.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", cubsBlue: "#0e3386", amber: "#c08b30", whiskey: "#a67c3d", shadow: "#2a2a2a" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.amber}12`, border: `1px solid ${C.amber}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.cubsBlue}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function HackWilsonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = WILSON_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.shadow} 0%, ${C.cubsBlue}60 30%, ${C.amber}30 70%, ${C.shadow} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Barrel</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.amber}`, boxShadow: `0 0 0 2px ${C.cubsBlue}, 0 0 30px ${C.amber}20, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.shadow}, ${C.cubsBlue}, ${C.amber}, ${C.cubsBlue}, ${C.shadow})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.amber}30`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.amber}10, ${C.cubsBlue}05)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>💥</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE BARREL</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.cubsBlue, color: C.amber, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.amber}ee`, color: C.ink, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.cubsBlue}dd`, color: C.amber, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • 191 RBI (ALL-TIME) • HOF 1979</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontWeight: 700 }}>5'6" • 190 lbs • SIZE 6 SHOES • 18" NECK</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.cubsBlue} />
              <StatBar label="POW" value={s.pow} max={5} color={C.amber} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.sepia} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.cubsBlue}, ${C.amber}cc)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".356" },{ label: "OPS", val: "1.177" },{ label: "HR", val: "56" },{ label: "RBI", val: "191" },{ label: "TB", val: "423" },{ label: "BB", val: "105" },{ label: "R", val: "146" },{ label: "WAR", val: "10.0" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.amber}15`, border: `2px solid ${C.amber}40`, borderRadius: 4, padding: 10, marginTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textAlign: "center" }}>ALL-TIME MLB RECORD</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: C.amber, textAlign: "center", fontFamily: "'Courier Prime', monospace", lineHeight: 1 }}>191</div>
              <div style={{ fontSize: 10, color: C.ink, textAlign: "center", fontFamily: "'Courier Prime', monospace" }}>RUNS BATTED IN • 1930 • STILL STANDING</div>
              <div style={{ fontSize: 9, color: C.sepia, textAlign: "center", marginTop: 4, fontStyle: "italic" }}>No one has come within 15 RBI since 1938. 53 RBI in August alone.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.cubsBlue}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.cubsBlue}15` }}>
              {[{ label: "CAR AVG", val: ".307" },{ label: "CAR HR", val: "244" },{ label: "CAR RBI", val: "1,063" },{ label: "SEASONS", val: "12" },{ label: "HR TITLES", val: "4" },{ label: "WS RINGS", val: "0" },{ label: "DIED", val: "Age 48" },{ label: "HOF", val: "✓" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.5 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["💥 191 RBI (All-Time)", "🏠 56 HR (NL Record 68yr)", "☀️ Lost in the Sun", "🥃 Prohibition Hero", "⚰️ Died Unclaimed", "🤝 Capone's Friend", "🏊 Pool Manager", "💔 Most Tragic Basher"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.amber}08`, border: `1px solid ${C.amber}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.cubsBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE BARREL</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.cubsBlue}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.cubsBlue : "transparent", color: tab === t.id ? C.amber : C.medBrown, border: `1px solid ${tab === t.id ? C.cubsBlue : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚠ THE UNCLAIMED BODY" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.warmRed } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.cubsBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("GLORY") ? `${C.gold}20` : l.affinity.includes("NIGHTMARE") ? `${C.hotRed}20` : l.affinity.includes("DEATH") ? `${C.shadow}20` : `${C.amber}20`, color: l.affinity.includes("GLORY") ? C.gold : l.affinity.includes("NIGHTMARE") ? C.hotRed : l.affinity.includes("DEATH") ? C.shadow : C.amber, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.cubsBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.amber}05`, border: `1px solid ${C.amber}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Record") ? `${C.amber}20` : a.type.includes("Tragedy") ? `${C.warmRed}20` : `${C.cubsBlue}12`, color: a.type.includes("Record") ? C.amber : a.type.includes("Tragedy") ? C.warmRed : C.cubsBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.shadow}, ${C.cubsBlue}, ${C.amber}, ${C.cubsBlue}, ${C.shadow})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team} • HOF</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
