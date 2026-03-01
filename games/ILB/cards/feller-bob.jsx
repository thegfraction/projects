import { useState } from "react";

const PLAYER_DATA = {
  name: "Bob Feller",
  nickname: "Rapid Robert",
  year: 1946,
  team: "Cleveland Indians",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "185 lbs",
  born: "November 3, 1918 — Van Meter, IA",
  died: "December 15, 2010 — Cleveland, OH (age 92)",
  hof: "Inducted 1962 (1st ballot, 93.8%). First pro athlete to enlist after Pearl Harbor. 10-foot bronze statue at Jacobs Field.",

  real_stats: {
    season: 1946, games: 48, wins: 26, losses: 15, era: "2.18",
    innings: "371.1", strikeouts: 348, walks: 153, complete_games: 36,
    shutouts: 10, whip: "1.17", ops_plus_against: "N/A", war: 9.6,
    career_wins: 266, career_losses: 162, career_era: "3.25",
    career_strikeouts: 2581, career_cg: 279, career_shutouts: 44,
    career_war: 65.6, no_hitters: 3, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // Pitchers use a modified stat engine:
  // STUFF (STF) replaces CON — raw pitching dominance
  // CONTROL (CTL) replaces POW — precision and walks
  // STAMINA (STA) replaces SPD — innings durability
  // DEFENSE (DEF) — same (fielding as pitcher)
  // CLUTCH (CLU) — same (postseason performance)
  //
  // STF: 2.18 ERA → tier 3 (2.00-2.49). K/9 of 8.43 ≥ 6.0 → +1 = 4.
  // CTL: BB/9 of 3.71 → tier 0 (3.0+). WHIP 1.17 > 1.00 → no bonus. CTL 0.
  // STA: 371.1 IP → tier 5 (350+). 36 CG in 42 starts. Iron arm. STA 5.
  // DEF: Average fielder for a pitcher. .963 career FLD%. DEF 0.
  // CLU: 1948 WS: 0-2, 5.02 ERA (lost 1-0 in G1, shelled in G5). Indians won.
  //   PS ERA > 4.00 → tier 0. No clincher/perfecto. But: Opening Day no-hitter
  //   (1940) and no-hitter vs Yankees (1946) as non-PS signature moments.
  //   CLU 0.
  // OVR: STF 4×2=8 + CTL 0×1.5=0 + STA 5×1=5 + DEF 0×0.5=0 = 13 raw.
  //   HOF 1st ballot, 266 W, 2,581 K, 3 no-hitters, lost ~4 years to WWII.
  //   Ted Williams: "The fastest and best pitcher I ever saw."
  //   But: wildness (led AL in BB 4×) and 0-2 WS record cap him.
  //   Normalized to OVR 10 (Elite/MVP).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite/MVP — dominant stuff + stamina, terrible control, failed in WS
    stf: 4,      // 2.18 ERA (tier 3) + K/9 8.43 bonus = 4. Estimated 108 mph fastball + devastating curve.
    ctl: 0,      // BB/9 3.71 → tier 0. 153 BB in 371 IP. Led AL in walks 4 times. Record 208 BB in 1938. Wild.
    sta: 5,      // 371.1 IP → tier 5. 36 CG in 42 starts. 10 shutouts. Pitched every 4th day all season. Iron man.
    def: 0,      // .963 career fielding percentage. Average pitcher fielder. Nothing notable.
    clu: 0,      // 0-2 in 1948 WS (5.02 ERA). Lost 1-0 heartbreaker in G1, shelled for 7 runs in G5. Indians won without him.
  },

  stat_justification: {
    stf: "2.18 ERA in 1946 — career best. Led all of MLB in wins (26), strikeouts (348), complete games (36), shutouts (10), and innings (371.1). His K/9 of 8.43 was extraordinary for the era — he struck out 10+ batters 12 times that season. All other MLB starters combined for only 20 such games. Estimated fastball velocity of 108 mph (tested in 1946). Ted Williams: 'The fastest and best pitcher I ever saw.' His curveball was equally devastating — Joe DiMaggio said 'his curveball isn't human.' ERA tier 3 (2.00-2.49) + K/9 bonus = STF 4.",
    ctl: "BB/9 of 3.71 in 1946 — 153 walks in 371 innings. Feller led the American League in walks four times in his career. In 1938, he walked a then-record 208 batters. He was famously wild: 'He just wound up and WHOOSH. And since he felt he was indestructible if he walked somebody he would just bull his way through the situation.' His walk rate in 1946 was actually improved from his youth — but still tier 0 by the engine. BB/9 3.71 → tier 0. CTL 0. This is the fatal flaw on the card.",
    sta: "371.1 innings pitched in 1946 — the most in baseball that year. 36 complete games in 42 starts (86% CG rate). 10 shutouts. He pitched every fourth day regardless of rainouts or off days. Manager Lou Boudreau: 'Feller was to pitch every fourth day, regardless of rainouts, open dates, or anything else.' In September, with the Indians out of contention, Boudreau started him even MORE frequently to chase the strikeout record. Feller's arm was a force of nature. STA 5 — maximum, matching Cy Young.",
    def: "Career .963 fielding percentage — average for a pitcher. Not known for his fielding. His defensive contribution was negligible. DEF 0.",
    clu: "In the 1948 World Series — his only postseason — Feller went 0-2 with a 5.02 ERA. In Game 1 against the Braves, he pitched 8 brilliant innings of 1-run ball but lost 1-0 on a controversial call (umpire ruled a pickoff play at second base was not an out). In Game 5, he was shelled for 7 runs. The Indians won the Series without him winning a game. A devastating 0-2 WS record for a pitcher of his caliber. PS ERA > 4.00 → tier 0. No clincher or perfecto bonus. CLU 0.",
  },

  personality: {
    leadership_style: "Fearless alpha. Feller was the unquestioned ace from the day he arrived at age 17. He was the face of the Cleveland Indians and, for a time, the most famous baseball player in America. His high school graduation was covered live by NBC Radio. He appeared on the cover of Time magazine before his second season. He demanded attention not through personality but through the sheer violence of his fastball. When he wanted the ball, he took it.",
    temperament: "Blunt, opinionated, competitive, patriotic. Feller was the first professional athlete to enlist after Pearl Harbor — two days after the attack, without hesitation. He served on the USS Alabama as an anti-aircraft gunner, saw combat in the North Atlantic and Pacific, and earned eight battle stars. He came home and immediately threw a no-hitter against the Yankees. He said what he thought, didn't hedge, and could be abrasive. Bobby Doerr: 'He gave his opinions and he said what he thought. He didn't hedge around anything.'",
    work_ethic: "Relentless, almost reckless. Feller threw hard and threw often. In 1946, he started 42 games, completed 36, pitched 371 innings, and still saved 4 games in relief. He started on 3 days' rest routinely, and five times on only 2 days' rest. He chased the strikeout record in September even though the Indians were in 6th place. Some believed this chase damaged his arm — his K/9 dropped sharply afterward. Feller threw so many pitches in his career that he may have worn out his arm prematurely, but he never regretted it.",
    lifestyle: "Iowa farm boy, Navy combat veteran, baseball entrepreneur. Born on a farm in Van Meter, Iowa. His father built him a pitching mound and batting cage on the farm. His catcher in amateur ball was Nile Kinnick, who won the Heisman Trophy. After the war, Feller organized barnstorming tours featuring himself against Satchel Paige — the tours were wildly popular and both men made enormous money. Feller was the highest-paid player in baseball, negotiating attendance bonuses into his contract. He was also the first president of the MLB Players Association (1954).",
    era_adaptability: "DOMINANT IN ANY ERA. Feller's stuff would translate directly to modern baseball. His estimated 108 mph fastball would be elite today. His strikeout rate (8.43 K/9 in 1946) was modern before modern existed. His walk rate would concern teams, but relievers could cover his late-inning wildness. He would be a max-effort, high-strikeout, high-walk power pitcher — think early Nolan Ryan with better stuff.",
    clubhouse_impact: "ACE PRESENCE. Feller was the clear No. 1 starter and everyone knew it. He wasn't a warm clubhouse leader like Doerr — he was the alpha arm that set the tone. His presence on the mound gave the entire team confidence. Off the field, he was a savvy businessman and union organizer who fought for players' rights. His barnstorming tours with Satchel Paige helped break baseball's color line by demonstrating that Black and white players could compete at the highest level together.",
    dark_side: "The World Series ghost. Feller's career is shadowed by his 0-2 World Series record — the only significant stage on which he failed. The Game 1 loss in 1948 was agonizing: he pitched 8 innings of 1-run ball and lost 1-0 on a controversial umpire's call on a pickoff play. He could never erase it. His later years were also complicated: he could be cantankerous and was sometimes critical of other players. His first marriage ended in divorce. He spent decades promoting baseball but sometimes seemed trapped by his own legend. In ILB: Feller carries a 'World Series Curse' — in postseason starts, his STF drops by 1 and his CTL drops by 1. The regular-season god becomes mortal in October.",
  },

  chemistry_traits: [
    { tag: "Rapid Robert", desc: "Estimated 108 mph fastball — the hardest thrower of his era and possibly ever at that point. When facing batters for the first time in a game, STF increases to 5. The first look is unhittable." },
    { tag: "First to Enlist", desc: "Enlisted in the Navy two days after Pearl Harbor. +3 chemistry with all military veterans. +2 team morale during wartime or patriotic events. Cannot be criticized for lack of courage." },
    { tag: "The Heater from Van Meter", desc: "Iowa farm boy origins. +1 STA from rural conditioning. +2 chemistry with other rural/farm players (Cy Young, Travis, Vernon)." },
    { tag: "Barnstormer", desc: "Organized tours with Satchel Paige across America. +2 chemistry with Negro League players. +2 fame from barnstorming revenue. Helped break the color line." },
    { tag: "Wild Thing", desc: "Led AL in walks 4 times. Record 208 BB in 1938. When Feller's CTL drops below 0, batters are afraid to dig in — even walks generate +1 intimidation. 'You just had to bow your neck and stay in there.'" },
    { tag: "World Series Curse", desc: "0-2 in the 1948 WS despite pitching brilliantly in G1 (lost 1-0). In postseason starts, STF -1 and CTL -1. The ghost of October haunts him." },
    { tag: "Players' Champion", desc: "First president of the MLB Players Association (1954). +1 to all teammates' contract negotiations. Feller fought for players' rights before it was popular." },
    { tag: "Paige's Rival", desc: "Feller and Satchel Paige barnstormed together and became lifelong friends despite the color line. When both are on opposing rosters, both gain +1 STF. The rivalry elevated both men." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His throne. 3,827 career innings. The fastball was timed at 108 mph. Nobody alive could touch him at his best." },
    { location: "Iowa / Farm Country", affinity: "HIGH", note: "Van Meter, IA. Father built him a mound and batting cage on the farm. Lifelong Iowan. Bob Feller Museum in Van Meter." },
    { location: "USS Alabama / Navy", affinity: "HIGH", note: "Anti-aircraft gunner, 8 battle stars. North Atlantic and Pacific. Didn't question it: 'I wanted to do my part.'" },
    { location: "Barnstorming Circuit", affinity: "HIGH", note: "Cross-country tours with Satchel Paige. Brought baseball to small towns. Made enormous money." },
    { location: "Cleveland Stadium", affinity: "MEDIUM", note: "His home for 18 seasons. Statue at Jacobs Field. Face of the franchise." },
    { location: "World Series Mound", affinity: "NONE", note: "0-2 lifetime. Lost 1-0 heartbreaker in 1948 G1. Shelled in G5. The only stage where Rapid Robert was mortal." },
  ],

  momentum: {
    hot_triggers: [
      "Opening Day — threw the only Opening Day no-hitter in MLB history (April 16, 1940)",
      "Record-chasing — pursued the K record relentlessly in September 1946, fueled by the chase",
      "Post-war return — came back from 4 years of Navy service and immediately threw a no-hitter vs the Yankees",
      "First exposure — batters seeing Feller for the first time were helpless. 15 K in his first MLB start at age 17",
    ],
    cold_triggers: [
      "World Series — 0-2 career in the Fall Classic, 5.02 ERA. October was his kryptonite.",
      "Walk spells — when the wildness took over, Feller could walk the ballpark. 208 BB in 1938.",
      "Arm fatigue — the 1946 K chase may have damaged his arm. K/9 dropped from 8.4 to 5.9 in 1947.",
      "Back injury — slipped off the mound June 13, 1947, said his fastball was never the same.",
    ],
    pressure_response: "DOMINANT IN REGULAR SEASON, CURSED IN OCTOBER. Feller's regular-season resume is one of the greatest in baseball history. Opening Day no-hitter. No-hitter against the Yankees. 348 strikeouts. 26 wins on a last-place team. But the World Series exposed his one vulnerability: when the stakes were highest, the wildness and the pressure combined to make him mortal. In ILB: Feller is the ultimate regular-season weapon — possibly the best starter in the Allies set. But in postseason play, his CLU 0 and 'World Series Curse' trait make him a liability. You ride Feller for 162 games. You hold your breath in October.",
  },

  action_card_seeds: [
    { title: "The Heater from Van Meter", type: "Game Action", text: "A 17-year-old farm boy from Iowa strikes out 15 batters in his first MLB start. He hasn't graduated high school yet. NBC Radio covers his graduation. Time magazine puts him on the cover. The prodigy has arrived. +3 STF for first season as opponents have never seen his arm.", origin: "On August 23, 1936, 17-year-old Feller struck out 15 Browns in his first MLB start. A month later he fanned 17 Athletics. His high school graduation was covered live by NBC Radio. He was on the cover of Time before his second season." },
    { title: "Two Days After Pearl Harbor", type: "Drama", text: "Your ace hears about the attack on the radio while driving. Two days later, he enlists in the Navy. He's the first professional athlete to do so. He misses four years of his prime — ages 23 through 26 — serving on a battleship as an anti-aircraft gunner. Roll a d6 for the war: on 1, he's injured and loses -1 STF permanently. On 2-6, he returns stronger. +5 fame, +3 legacy.", origin: "On December 9, 1941, two days after Pearl Harbor, Feller enlisted in the Navy — the first professional athlete to do so. He served on the USS Alabama, earned 8 battle stars, and returned to pitch a no-hitter against the Yankees in 1946." },
    { title: "Opening Day No-Hitter", type: "Game Action", text: "Opening Day. First game of the season. Your ace throws a no-hitter — the only Opening Day no-hitter in baseball history. The city erupts. +3 fame, +2 STF confidence for the month of April.", origin: "On April 16, 1940, Feller threw a no-hitter against the White Sox on Opening Day — still the only Opening Day no-hitter in MLB history. Cleveland won 1-0." },
    { title: "Three Hundred Forty-Eight", type: "Game Action", text: "Your pitcher chases the single-season strikeout record. He pitches every 4th day on a last-place team. He fans 348 batters — the most in the American League since 1904. But the chase may have cost him: roll a d6. On 1-2, his arm is permanently weakened (-1 STF next season). On 3-6, the record stands and he's fine.", origin: "In 1946, Feller struck out 348 batters — the most in the AL since Rube Waddell's 349 in 1904. Manager Boudreau started him extra frequently in September to chase the record. Feller's K/9 dropped sharply the following year." },
    { title: "The Barnstorming Kings", type: "Drama", text: "Your ace and a legendary Negro League pitcher organize barnstorming tours across America. Black players vs white players, town to town. Both men make enormous money. The tours prove that integration is inevitable. +3 fame for both. +1 to league integration progress.", origin: "After the 1946 season, Feller organized barnstorming tours pitting his team against Satchel Paige's. They played 22 games across America. The tours helped normalize interracial competition and both men became lifelong friends." },
    { title: "The One-Oh Loss", type: "Game Action", text: "World Series, Game 1. Your ace pitches 8 innings of brilliant 1-run ball. But the umpire makes a controversial call on a pickoff play — the runner is safe when he should have been out. You lose 1-0. The call haunts your pitcher forever. -1 CLU permanently. The ghost of October is born.", origin: "In Game 1 of the 1948 WS, Feller pitched 8 innings allowing 1 run and lost 1-0 to the Braves. A controversial call on his pickoff attempt at second base — umpire ruled the runner safe — was widely believed to have cost him the game." },
    { title: "The Real Heroes Didn't Come Home", type: "Drama", text: "Your veteran returns from war to a civic luncheon and parade. He tells the crowd: 'The real heroes didn't come home.' Then he pitches that afternoon and wins. +2 team morale, +1 legacy. The humility is genuine.", origin: "On August 24, 1945, Feller was honored with a luncheon and parade in Cleveland after his Navy discharge. He told the crowd: 'The real heroes didn't come home.' He then pitched a complete game win against the Tigers that afternoon." },
  ],

  art_direction: {
    face: "Young, intense, all-American. 6'0\" 185 lbs — lean and powerful, built for velocity. Strong jaw, clear determined eyes, the face of a man who could throw 108 mph and enlisted in the Navy at 23 without a second thought. Iowa farm-boy wholesomeness underlaid with ferocious competitive fire. Clean-cut, military bearing.",
    attire: "Cleveland Indians road grays, 1946 vintage. Number 19. Full windup — the classic Feller delivery: high leg kick, extreme torque, the right arm whipping forward with violent speed. The ball should be a blur leaving his hand. Or: the follow-through, body falling toward first base, having just released something lethal.",
    mood: "Pure velocity and patriotic fire. This card should MOVE. Where Cy Young's card feels like serene mastery, Feller's should feel like controlled violence. The energy is explosive, kinetic, young. You should feel the fastball coming off the card.",
    style: "Warm sepia with red-white-blue undertones — the most patriotic card in the set. Subtle American flag elements in the border. The light should feel like a summer afternoon in Cleveland Stadium — bright, hard, high-contrast. Everything is sharp and fast.",
    reference: "The ace card. If the Allies set has a Cy Young equivalent, it's Feller. But where Young was calm dominance, Feller is violent dominance. The fastball card. The card that makes opposing lineups nervous. The card you build a rotation around — and then pray he doesn't have to pitch in October.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59"
};

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function BobFellerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Warm patriotic sepia, Indians grays, violent windup, 108 mph fastball]</div>
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
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "PERFECT", val: d.real_stats.perfect_games }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 18 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1948 WS Champion", "⭐ HOF 1962 (1st Ballot)", "🔥 348 K in 1946", "📜 3× No-Hitter", "🇺🇸 First to Enlist (WWII)", "⚡ ~108 mph Fastball", "🎖️ 8 Navy Battle Stars", "👑 266 Career Wins"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Feller's real life, become universal cards playable in any game.</p>
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
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Feller's Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
