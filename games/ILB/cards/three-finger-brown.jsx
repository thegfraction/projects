import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}brown-mordecai.png`;

const PLAYER_DATA = {
  name: "Three-Finger Brown",
  full_name: "Mordecai Peter Centennial Brown",
  nickname: "Three Finger / Miner",
  year: 1906,
  team: "Chicago Cubs",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "S",
  throws: "R",
  height: '5\'10"',
  weight: "175 lbs",
  born: "October 19, 1876 — Nyesville, IN",
  died: "February 14, 1948 — Terre Haute, IN (age 71, Valentine's Day)",
  hof: "Inducted 1949 (Veterans Committee). 2.06 career ERA — 3rd lowest in HOF history, lowest among pitchers with 200+ wins. Cubs record: career ERA 1.80, season ERA 1.04.",

  real_stats: {
    season: 1906, games: 36, wins: 26, losses: 6, era: "1.04",
    innings: "277.1", strikeouts: 144, walks: 61, complete_games: 27,
    shutouts: 9, whip: "0.930", saves: 3, war: 9.5,
    era_plus: 253,
    career_wins: 239, career_losses: 130, career_era: "2.06",
    career_strikeouts: 1375, career_cg: 271, career_shutouts: 55,
    career_war: 55.0, career_ip: "3172.1", career_era_plus: 138,
    ws_record: "5-4", ws_era: "2.97", ws_games: 9,
    vs_mathewson: "13-10",
  },

  ilb_stats: {
    ovr: 12,     // Legend — 1.04 ERA (lowest NL modern era). 239-130, 2.06 career ERA. 6 straight 20-win seasons. 13-10 vs. Mathewson. 2× WS champ. HOF. The mangled hand made the unhittable pitch.
    stf: 5,      // 1.04 ERA → tier 5 (<1.50). LOWEST qualifying NL ERA in modern history. The three-finger grip created a curveball that "curved and dropped at the same time." Impossible to hit, impossible to lift. K/9 ~4.7 (no K bonus), but ERA was transcendent. ERA+ 253 in 1906. Maximum stuff: 5.
    ctl: 4,      // WHIP 0.930 → ≤1.00 bonus. BB/9 ~1.98 → tier 3 (1.5-1.99). Base: 3 + WHIP bonus (+1) = 4. He knew where the curveball was going even if batters didn't. Rating: 4.
    sta: 4,      // 277 IP in 1906 → tier 3 (250-299). But averaged 280-312 IP across peak years, 6 straight 20-win seasons, first to throw 4 consecutive shutouts. The consistency warrants a bump. Rating: 4.
    def: 1,      // No notable defensive reputation. Switch-hitter at the plate (.206 career) — decent for a pitcher. Rating: 1.
    clu: 3,      // WS record 5-4, ERA 2.97. Won Merkle replay game (the biggest game in Cubs history). Won 1907 WS Game 5 (shutout). 13-10 head-to-head vs. Christy Mathewson. PS ERA 2.97 → tier 1. + Merkle replay clincher (+1) + Mathewson rivalry dominance (+1) = 3. Maximum clutch.
  },

  stat_justification: {
    stf: "1.04 ERA in 1906 → tier 5 (below 1.50). This is the lowest qualifying ERA in the ENTIRE modern history of the National League. ERA+ 253. He allowed ONE home run all season. Nine shutouts. The weapon: a curveball/knuckle curve thrown with a mangled hand — index finger gone, middle finger crooked, pinky paralyzed. 'It didn't only curve, it curved and dropped at the same time. It made it extremely hard to hit and if you did hit it, you hit it into the ground because you couldn't get under it.' K/9 was only ~4.7 (no K bonus), but ERA was the most dominant in NL history. Maximum stuff: 5.",
    ctl: "WHIP 0.930 in 1906 → ≤1.00 bonus applies. BB/9 ~1.98 → tier 3 (1.5-1.99). Base: 3 + WHIP bonus = 4. Brown's curveball had devastating movement but he commanded it — 61 walks in 277 IP. The ball broke violently and landed where he intended. Rating: 4.",
    sta: "277 IP in 1906 → tier 3 (250-299). Over his peak (1906-1911), he averaged ~290 IP per season with six straight 20-win campaigns. In 1908: 312.1 IP with 29 wins and 9 shutouts. First pitcher to throw 4 consecutive shutouts. Not quite McGinnity-level (400+ IP), but sustained excellence over 6 years warrants a bump. Rating: 4.",
    def: "No notable defensive reputation. Decent hitter for a pitcher (.206 career BA, switch-hitter). Rating: 1.",
    clu: "WS record 5-4, ERA 2.97 across 9 World Series games (1906, 07, 08, 10). Won the Merkle replay game on Oct 8, 1908 — the single biggest game in Cubs franchise history — clinching the pennant over the Giants. Won 1907 WS Game 5 with a 2-0 shutout of Detroit. 13-10 career record vs. Christy Mathewson in 25 head-to-head meetings — won the rivalry against the greatest pitcher of the era. PS ERA 2.97 → tier 1 (2.00-4.00). + Merkle replay clincher (+1) + rivalry dominance (+1) = 3. Maximum clutch.",
  },

  personality: {
    leadership_style: "The quiet ace who delivered. Brown didn't seek the spotlight — he was overshadowed by Mathewson in the NL, by Walsh in Chicago, even by his own hand's mythology. But when the biggest game of the season arrived, Brown got the ball. He won the Merkle replay. He shut out Detroit in the World Series. He beat Mathewson 13 times. The ace doesn't need to announce himself.",
    temperament: "Humble, steady, Indiana. Born in Nyesville, population negligible. Worked in coal mines before baseball. Turned a childhood farming accident into the most devastating curveball in the game. Brown didn't rage or brood — he pitched. 'I always felt if I had had a normal hand, I would have been a greater pitcher.' That sentence contains multitudes: humility about what he was, wonder about what he might have been.",
    work_ethic: "Coal miner's ethic. The corn chopper took his finger at age 5. The fall broke the others at age 6. He learned to grip a baseball with what was left, and the grip created impossible movement. He didn't overcome his disability — he transmuted it. Every pitch he threw for 14 years was thrown with a hand that shouldn't have been able to throw at all.",
    lifestyle: "Simple, rural, faithful. Married Sarah Burgham in 1903 — 45-year marriage, no children, no scandal. Returned to Indiana after baseball. Lived quietly in Terre Haute. The coal mines, the cornfields, the quiet life — Brown was Indiana personified. He died on Valentine's Day 1948, still married to Sarah.",
    era_adaptability: "FASCINATING. Brown's pitch — the three-finger curveball that curved and dropped simultaneously — would be unprecedented in any era. No modern pitcher has the same grip because no modern pitcher has the same hand. It's unreplicable by design. His K rate was low for any era, but the movement profile would baffle modern hitters used to predictable spin patterns. He'd be the ultimate outlier — a 5'10\" guy with a mangled hand throwing unhittable breaking stuff.",
    clubhouse_impact: "STABILIZING ANCHOR. Brown was the reliable ace on a Cubs team full of personalities (Tinker, Evers, Chance, Reulbach). He didn't feud, didn't fight, didn't hold out. He pitched. And he taught — his presence alongside Reulbach and Overall elevated the entire staff. In ILB: +2 team pitching morale. The ace who makes everyone around him better by example.",
    dark_side: "The hand, the shadow, the final game. Brown's entire career was built on a childhood tragedy — a corn chopper mutilation at age 5. He turned it into greatness, but the shadow of 'what if' haunted him: 'I always felt if I had had a normal hand, I would have been a greater pitcher.' His final major league game, September 4, 1916, was a last meeting with Mathewson. Both men pitched the entire game, both well past their prime — a 10-8 Reds victory. It was a tribute and an elegy. The two greatest rivals of their era said goodbye with one ugly, beautiful game.",
  },

  chemistry_traits: [
    { tag: "The Three-Finger Grip", desc: "Brown's mangled hand creates a curveball that curves AND drops simultaneously — a pitch no one else can throw. All batters face -2 CON on his curveball. The disability is the weapon." },
    { tag: "Mathewson's Rival", desc: "13-10 in 25 head-to-head meetings with the greatest pitcher of the era. When Brown faces Mathewson (or any OVR 12+ pitcher in a pitcher's duel), both gain +1 STF. The rivalry elevates both." },
    { tag: "Merkle Replay Winner", desc: "Won the biggest game in Cubs history — the Merkle replay, Oct 8, 1908. In any elimination or pennant-deciding game, Brown gains +2 CLU." },
    { tag: "Coal Miner's Son", desc: "Indiana coal mines and cornfields. +1 STA permanently. The work ethic of a man who dug coal before he threw curveballs." },
    { tag: "The Transmutation", desc: "Turned a childhood farming accident into a HOF career. Brown is immune to 'injury' cards that target his pitching hand — it's already broken." },
    { tag: "Quiet Ace", desc: "Never the loudest name but always the best pitcher. When Brown is the #1 starter, team pitching staff gains +1 morale. He leads by example." },
    { tag: "Valentine's Exit", desc: "Died on Valentine's Day 1948. 45-year marriage to Sarah. In any 'legacy' calculation, +2 for devotion and fidelity." },
    { tag: "The Last Duel", desc: "Final game: Brown vs. Mathewson, Sept 4, 1916. Both pitched the entire 10-8 game. When Brown and Mathewson are both retiring, they can play one final exhibition game for +5 legacy each." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "3,172 career IP. 1.04 ERA in 1906. 55 shutouts. The mound was his cathedral and the three-finger grip was his prayer." },
    { location: "Farm / Rural Indiana", affinity: "HIGH", note: "Nyesville, IN. Cornfields, coal mines, quiet life. Born and died within 60 miles of the same patch of Indiana." },
    { location: "Clubhouse / Rotation", affinity: "HIGH", note: "The stabilizing ace. Alongside Reulbach, Overall, Pfiester, Lundgren — Brown was the anchor that held everything steady." },
    { location: "Coal Mine", affinity: "MEDIUM", note: "Worked in western Indiana coal mines before baseball. The darkness underground made the diamond brighter." },
    { location: "Marriage / Home", affinity: "MEDIUM", note: "45 years with Sarah Burgham. No children, no scandal. The simple life of a man who threw unhittable curveballs." },
    { location: "Hospital / Recovery", affinity: "LOW", note: "The corn chopper at age 5. The fall at age 6. The hand that healed wrong and made him immortal." },
    { location: "Polo Grounds (vs. Mathewson)", affinity: "HIGH", note: "13-10 vs. Mathewson at his home park. The road duels were where Brown proved he was Matty's equal." },
  ],

  momentum: {
    hot_triggers: [
      "Facing Christy Mathewson — 13-10 career H2H. The rivalry brought out Brown's absolute best.",
      "Pennant races — won the Merkle replay, threw 4 consecutive shutouts in 1908. September was his month.",
      "World Series games — 5-4 with a 2.97 ERA including a WS shutout. Big stage, big performance.",
      "Consecutive shutout streaks — first to throw 4 straight shutouts. When he's rolling, no one scores.",
    ],
    cold_triggers: [
      "1906 World Series — despite 1.04 regular-season ERA, went 1-1 with a 3.66 ERA as the Cubs lost to the White Sox",
      "Aging / decline — limited action by 1912, released. Bounced to Reds, Federal League. The body aged even if the hand didn't.",
      "Overshadowed — never the acknowledged best despite elite stats. Brown in Mathewson's shadow, Walsh's shadow, even his own hand's shadow.",
      "The hand's reminder — 'I always felt if I had a normal hand, I would have been a greater pitcher.' The self-doubt that genius can't fully silence.",
    ],
    pressure_response: "ELITE. Brown won the single biggest game in Cubs franchise history — the Merkle replay on October 8, 1908. He came in to relieve Jack Pfiester in the first inning and shut down the Giants the rest of the way, clinching the pennant. He shut out Detroit 2-0 in the 1907 WS. He went 5-4 in 9 career WS games. He was 13-10 in 25 meetings against the greatest pitcher of the era. The three-finger curveball was a pressure pitch — the more the moment demanded, the more it broke. In ILB: Brown is the pitcher you give the ball to when everything is on the line.",
  },

  action_card_seeds: [
    { title: "The Corn Chopper", type: "Origin", text: "A 5-year-old boy feeds debris into a corn chopper on an Indiana farm. The machine catches his right hand. The index finger is severed. The next year, he falls and breaks the remaining fingers — they heal at permanent odd angles. The hand that should have ended a baseball career before it began instead creates the most unhittable curveball in the game.", origin: "April 17, 1888: Mordecai Brown lost most of his index finger in a corn chopper at age 5. A fall the next year broke and permanently bent his middle finger and paralyzed his pinky. The mangled hand created an unnatural grip that produced devastating movement." },
    { title: "One Point Oh Four", type: "Game Action", text: "Your pitcher posts a 1.04 ERA for the season — the lowest qualifying mark in the history of the National League. He allows one home run all year. Nine shutouts. 26 wins. The opposing team's lineup card is irrelevant. This card makes your pitcher untouchable for 5 consecutive starts.", origin: "1906: Brown's 1.04 ERA remains the lowest NL qualifying ERA in modern history. He went 26-6 with 9 shutouts and allowed just 1 HR all season. ERA+ 253. The Cubs won a record 116 games." },
    { title: "The Merkle Replay", type: "Game Action", text: "The pennant comes down to one game — a replay forced by a baserunning controversy. Your starter can't hold up. Your ace comes in to relieve in the first inning and shuts the door the rest of the way. The pennant is yours. This card can be played in any elimination game.", origin: "October 8, 1908: Brown relieved Jack Pfiester in the 1st inning of the Merkle replay and shut down the Giants, clinching the NL pennant for the Cubs." },
    { title: "Four Consecutive Shutouts", type: "Game Action", text: "Your pitcher throws four shutouts in a row — the first pitcher in MLB history to accomplish this. For 36 consecutive innings, no run crosses the plate. The opposing league is on notice. +3 team momentum.", origin: "1908: Brown became the first pitcher in MLB history to throw four consecutive shutouts, a feat that anchored the Cubs' pennant-winning season." },
    { title: "Brown vs. Mathewson", type: "Game Action", text: "The two greatest pitchers of the era face each other — for the 25th time. Both throw complete games. The crowd knows they are witnessing history. The winner gains +2 legacy. The loser gains +1 legacy. Both gain the 'Worthy Rival' trait permanently.", origin: "Brown and Mathewson faced each other 25 times. Brown won 13, Mathewson 11. Their rivalry defined the dead-ball era. The final meeting: Sept 4, 1916 — both pitched the entire 10-8 game." },
    { title: "The Last Meeting", type: "Drama", text: "Two aging rivals, both past their prime, face each other one final time. Both teams are out of contention. Both men pitch the entire ugly, high-scoring game. It is a love letter written in line drives and errors. The crowd rises when each man leaves the field for the last time. +5 legacy to both.", origin: "September 4, 1916: Brown (Cubs) vs. Mathewson (Reds). Both pitched the entire 10-8 game. It was the final meeting between the two old warriors, and the final game for each." },
    { title: "The Disability as Weapon", type: "Origin", text: "A farmer's accident. A mangled hand. An impossible grip. A curveball that curves AND drops. Your pitcher takes a childhood tragedy and transmutes it into the lowest ERA in NL history. He is immune to injury cards targeting his pitching hand — it's already broken. The weakness is the strength.", origin: "Brown: 'I always felt if I had had a normal hand, I would have been a greater pitcher.' His great-nephew: 'It didn't only curve, it curved and dropped at the same time. It made it extremely hard to hit and if you did hit it, you hit it into the ground.'" },
    { title: "I Always Felt", type: "Drama", text: "'I always felt if I had had a normal hand, I would have been a greater pitcher.' Your HOF ace, the owner of the lowest ERA in league history, doubts himself. The card does nothing mechanically — but it reveals the human cost of turning trauma into transcendence. Some wounds never fully heal.", origin: "Brown's own words, reflecting on his career. Despite a 2.06 career ERA and HOF induction, he wondered what might have been with a normal hand." },
  ],

  art_direction: {
    face: "Compact, sturdy Indiana farm boy. 5'10\" 175 lbs — not big, not flashy. Weathered face, steady eyes, the quiet confidence of a coal miner turned ace. The face should say: 'I've dug coal and I've thrown curveballs, and the curveballs were easier.' Clean-shaven or slight stubble. Rural Midwest solidity.",
    attire: "Chicago Cubs uniform circa 1906 — white wool jersey with 'CUBS' or 'C' insignia, baggy flannel pants, flat cap. The KEY DETAIL: his right hand should be visible — the mangled hand, index finger missing, middle finger crooked, the grip that created the unhittable curve. Mid-delivery, the hand is the focal point. Or: close-up of the three-finger grip on the baseball, the impossible hand holding the impossible pitch.",
    mood: "Quiet devastation. Not fierce or fiery — the calm of a man who knows his curveball is unhittable and doesn't need to tell anyone. The West Side Grounds behind him, late afternoon light, the feeling of inevitability. Brown's card should feel like watching a curveball break — you know it's coming and you still can't touch it.",
    style: "Sepia-toned with earthy, Indiana-soil undertones — deeper brown and amber than other Banners cards. Where Mathewson is moonlight and McGinnity is forge-fire and Reulbach is dusk, Brown is EARTH. Rich, dark, rooted soil. The card of a man who grew up on a farm and turned farmland trauma into unhittable movement. Dead-ball era grain, warm and grounded.",
    reference: "Think the three-finger grip on the baseball — the centerpiece of the card. The mangled hand, the missing finger, the crooked digits wrapped around a baseball in a grip no one else could replicate. Or: the compact delivery, arm coming forward, the ball about to break in two directions at once. The card should make you look at the hand first, then the face, then the stats. The hand tells the whole story.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function ThreeFingerBrownCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
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
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.full_name}</div>
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
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "ERA+", val: d.real_stats.era_plus },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — LOWEST NL ERA IN MODERN HISTORY</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "ERA+", val: d.real_stats.career_era_plus },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR IP", val: d.real_stats.career_ip },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 14 MLB SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "WS REC", val: d.real_stats.ws_record },{ label: "WS ERA", val: d.real_stats.ws_era },{ label: "vs MATTY", val: d.real_stats.vs_mathewson }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>POSTSEASON & RIVALRY</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× WS Champ (1907-08)", "👑 1.04 ERA (NL Record)", "⭐ HOF 1949", "🔥 6 Straight 20-Win Seasons", "⚔️ 13-10 vs. Mathewson", "📜 Won Merkle Replay", "🖐️ Three-Finger Grip", "💎 2.06 Career ERA (3rd All-Time)"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Brown's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Brown's Derivation">
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
    </div>
  );
}
