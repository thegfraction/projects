import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}tinker-joe.png`;

const PLAYER_DATA = {
  name: "Joe Tinker",
  nickname: "The Silent Partner",
  year: 1908,
  team: "Chicago Cubs",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '5\'9"',
  weight: "175 lbs",
  born: "July 27, 1880 — Muscotah, KS",
  died: "July 27, 1948 — Orlando, FL (age 68, on his birthday; diabetes, leg amputated 1947)",
  hof: "Inducted 1946 (Old Timers Committee), alongside Evers and Chance. Career dWAR of 34.3 ranks 5th all-time.",

  real_stats: {
    season: 1908, games: 157, at_bats: 548, hits: 146, doubles: 22,
    triples: 14, home_runs: 6, rbi: 68, runs: 67, stolen_bases: 30,
    batting_avg: ".266", obp: ".308", slg: ".391", ops: ".699",
    ops_plus: 107, war: 6.0,
    career_avg: ".262", career_hits: 1690, career_hr: 31, career_sb: 336,
    career_war: 33.6, career_obp: ".308", career_ops_plus: 90,
    ws_1907_avg: ".154", ws_1908_avg: ".263", ws_1910_avg: ".333",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB POSITION PLAYER STAT CONVERSION
  //
  // CON: BA tiers (.200-.249=1, .250-.269=2, .270-.299=3, .300-.329=4, .330+=5) + OPS+ ≥ 130 bonus (cap 5)
  // POW: HR tiers (0-9=0, 10-19=1, 20-29=2, 30-39=3, 40-49=4, 50+=5) + SLG ≥ .500 bonus (cap 5)
  // SPD: SB tiers (0-5=0, 6-15=1, 16-30=2, 31-50=3) + GG CF/SS bonus (cap 3)
  // DEF: GG tiers (pre-1957: use reputation)
  // OVERALL: CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13
  // CLU: PS BA tiers + hero moments
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — defense-first HOFer. Career dWAR 34.3 (5th all-time). Light hitter but iconic defender.
    con: 2,      // .266 BA → tier 2 (.250-.269). OPS+ 107 (no ≥130 bonus). Average hitter in a dead-ball era. Rating: 2.
    pow: 0,      // 6 HR → tier 0 (0-9). SLG .391 (no ≥.500 bonus). Some gap power (14 3B) but zero HR threat. Rating: 0.
    spd: 3,      // 30 SB → tier 2 (16-30). 336 career SB. Stole home twice in one game. SS position with elite range = +1 bonus. Maximum speed: 3.
    def: 3,      // Career dWAR 34.3 — 5th ALL-TIME (behind Ozzie Smith, Belanger, Brooks Robinson, Ripken). 5× NL leader in defensive bWAR. Led NL SS in fielding % 4×, assists 3×. Maximum defense: 3.
    clu: 2,      // .263 + HR in 1908 WS. .333 in 1910 WS. Hit triple off Mathewson to ignite Merkle replay rally. .350 career vs. Mathewson. PS ERA mixed (.167/.154/.263/.333). PS BA avg ~.230 = tier 0, but hero moments (+1 for WS HR, +1 for Mathewson dominance) = 2.
  },

  stat_justification: {
    con: ".266 BA in 1908 → tier 2 (.250-.269). OPS+ 107 — above average but not elite. Career .262 BA, 90 OPS+. A light hitter even by dead-ball standards. The HOF plaque doesn't mention his bat. But: .350 career BA vs. Christy Mathewson, the best pitcher in baseball. Mathewson: 'He's the worst man I have to face in the National League.' Rating: 2 — low overall, but with a massive clutch modifier vs. specific aces.",
    pow: "6 HR in 1908 → tier 0 (0-9). SLG .391 (no bonus). 14 triples show some gap power, and he hit the first WS home run under the 1905 rules agreement. But 31 career HR in 15 seasons. Zero power profile. Rating: 0.",
    spd: "30 SB in 1908 → tier 2 (16-30). 336 career SB, averaging 28 per season. Stole home twice in one game (July 28, 1910). 'Fleeter than birds' per Adams' poem. SS position with elite defensive range = +1 bonus. Maximum speed: 3.",
    def: "Career defensive WAR of 34.3 — fifth all-time behind Ozzie Smith, Mark Belanger, Brooks Robinson, and Cal Ripken Jr. Five-time NL leader in defensive bWAR. Led NL shortstops in fielding percentage 4×, assists 3×, putouts 2×. The poem immortalized his defense for a reason. Maximum rating: 3.",
    clu: ".263 + HR in the 1908 WS (defeated Tigers). .333 in the 1910 WS. Hit a leadoff triple off Mathewson in the Merkle replay game, igniting the 4-run rally that clinched the pennant. Hit an inside-the-park HR off Mathewson in the original Merkle game. .350 career BA vs. the greatest pitcher alive. Mixed WS numbers overall (.167 in 1906, .154 in 1907), but the big moments were enormous. Rating: 2.",
  },

  personality: {
    leadership_style: "Quiet professionalism on the field, fierce independence off it. Tinker let his glove do the talking. He didn't need to speak to Evers to turn double plays — they communicated through instinct, timing, and the ball. But off the field, Tinker was a fighter: brawled with Evers, defeated Egan in a fight, scrapped with Rabbit Maranville, and got arrested for assaulting a fan in his own saloon.",
    temperament: "Steady, competitive, stubborn. Held out for salary repeatedly — demanded raises, threatened to quit for Australia, jumped to the Federal League when Brooklyn wouldn't pay him. Not a hothead like Evers or a disciplinarian like Chance. More of a quiet stubborn streak: he'd turn the double play, collect his paycheck, and fight anyone who disrespected him.",
    work_ethic: "Tireless defensive craftsman. Played all 157 games in 1908. Led the NL in assists, putouts, fielding percentage across multiple seasons. The SABR bio notes that early on, he and Evers 'built a chemistry that gave them the confidence that when one fielded the ball and flipped it to second, the other one would be there, even without looking first.' That chemistry was work, not luck.",
    lifestyle: "Kansas farm boy who became a Chicago saloon owner. Married Ruby — she suffered chronic poor health. Tinker owned a saloon in Chicago and got arrested there for fighting a fan (acquitted). After baseball, moved to Orlando, FL, and became owner-manager of the Orlando Tigers. Tinker Field bore his name for decades. Married four times. Diabetes took his left leg in 1947.",
    era_adaptability: "STRONG for defense. Tinker's glove and instincts would translate to any era — his dWAR is 5th all-time. The bat would not translate well: .262 career BA with 31 HR wouldn't play in any modern lineup. He'd be a slick-fielding, no-hit shortstop — the Ozzie Smith comp without quite as much speed. Valuable but limited.",
    clubhouse_impact: "PARADOX. The most famous double-play partner in history didn't speak to his teammate for 33 years. Tinker and Evers turned double plays by instinct while actively hating each other. In ILB terms: Tinker has maximum 'on-field synergy' and minimum 'off-field chemistry' with Evers. They are inseparable enemies.",
    dark_side: "The feud, the body, the endings. Tinker and Evers fought over a cab in 1905 and didn't speak until the 1938 World Series — 33 years of silence. When they finally met at a Chicago hotel, they threw their arms around each other and cried. All three — Tinker, Evers, Chance — were elected to the HOF in 1946, but none attended the ceremony. Chance was dead since 1924. Evers was dying. Tinker had diabetes — his left leg was amputated in January 1947. He died on his 68th birthday, July 27, 1948. His twin sister had died as a child.",
  },

  chemistry_traits: [
    { tag: "Tinker to Evers to Chance", desc: "The most famous double-play combination in history. When Tinker and Evers are on the same team, all ground balls have a +30% chance of becoming double plays. They don't have to like each other." },
    { tag: "The Silent Partner", desc: "Doesn't speak to his double-play partner off the field. Zero off-field chemistry with Evers, but maximum on-field synergy. The ball knows no grudges." },
    { tag: "Matty Killer", desc: ".350 career BA vs. Christy Mathewson. When facing an elite ace (OVR 11+), Tinker gains +3 CON. The better the pitcher, the better he hits." },
    { tag: "Saloon Brawler", desc: "Owned a saloon, fought fans, brawled with teammates and opponents. In any altercation, Tinker has a 70% chance of winning. Arrested but always acquitted." },
    { tag: "Federal Leaguer", desc: "Jumped to the Federal League for more money. +2 salary demands in contract negotiations. Will leave for a rival league if underpaid." },
    { tag: "Kansas Grit", desc: "Muscotah, KS farm boy. Played through appendicitis surgery, salary disputes, and a 33-year feud. No morale penalties from adversity." },
    { tag: "Glove Wizard", desc: "5th all-time in career dWAR. When Tinker is at SS, all infield errors are reduced by 50%. The double play is always an option." },
    { tag: "The Reunion", desc: "After 33 years of silence, Tinker and Evers embraced and cried at the 1938 WS. If both survive to the end of their careers, +5 legacy to both." },
  ],

  preferred_locations: [
    { location: "Shortstop Position", affinity: "HIGH", note: "His cathedral. 5th all-time in career dWAR. More comfortable at SS than anywhere else on earth." },
    { location: "Saloon / Bar", affinity: "HIGH", note: "Owned a saloon in Chicago. Fought a fan there. Got arrested there. Acquitted there. It's his place." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected for his glove, tolerated for his stubbornness. Just don't seat him next to Evers." },
    { location: "Owner's Office", affinity: "MEDIUM", note: "Constant salary disputes. Held out multiple times. Jumped leagues for money. Knew his worth." },
    { location: "Florida / Orlando", affinity: "MEDIUM", note: "Retired to Orlando. Owned and managed the Orlando Tigers. Tinker Field bore his name for decades." },
    { location: "Radio Booth", affinity: "LOW", note: "The 1938 WS radio booth — where 33 years of silence ended with tears. A place of reconciliation." },
    { location: "Hospital", affinity: "LOW", note: "Appendicitis surgery (1907). Diabetes. Left leg amputated (1947). The body betrayed the glove." },
  ],

  momentum: {
    hot_triggers: [
      "Facing Christy Mathewson — .350 career BA, inside-the-park HR, leadoff triple in the Merkle replay. The better the pitcher, the better he hits.",
      "Pennant races — played all 157 games in 1908, led the league in assists with 570, anchored the Cubs' 99-win season",
      "Double-play situations — the Tinker-to-Evers-to-Chance machine turns rallies into ashes",
      "World Series games — .263 + HR in 1908 WS, .333 in 1910 WS. Rose in October.",
    ],
    cold_triggers: [
      "The Evers feud — off-field tension from a 33-year silence. If forced to interact socially with Evers, both players lose 1 morale",
      "Salary disputes — held out repeatedly, threatened Australia, jumped to Federal League. Contract turmoil = -1 focus",
      "Physical decline — appendicitis (1907), side pain (1915), diabetes, leg amputation (1947). The body decays.",
      "Early WS failures — .167 in 1906 WS, .154 in 1907 WS. Not always clutch.",
    ],
    pressure_response: "CONTEXTUAL. Tinker was an enigma in pressure situations. Against Christy Mathewson — the best pitcher in the world — he hit .350. He hit an inside-the-park HR off Mathewson in the Merkle game, then a leadoff triple off him in the Merkle replay that clinched the pennant. He hit .333 in the 1910 WS. But he also hit .167 and .154 in the 1906-07 World Series. The pattern: Tinker rose against specific great opponents but sometimes shrank in the general spotlight. In ILB: massive clutch bonus vs. elite pitchers, but inconsistent in generic postseason situations.",
  },

  action_card_seeds: [
    { title: "Tinker to Evers to Chance", type: "Game Action", text: "Your infield turns a legendary double play. The shortstop fields the grounder, flips to second without looking, and the relay beats the runner at first. The opposing rally dies. This card can be played once per game whenever two runners are on base. Requires both Tinker and Evers (or their equivalents) on the roster.", origin: "The most famous double-play combination in baseball history, immortalized by Franklin Pierce Adams' 1910 poem 'Baseball's Sad Lexicon.' First scored September 15, 1902. The Cubs won 4 pennants and 2 WS titles with this trio." },
    { title: "The Worst Man I Have to Face", type: "Game Action", text: "Your light-hitting shortstop faces the opposing ace — and transforms. He gains +3 CON for this at-bat only. Roll a d6: on 4+, he hits a triple or inside-the-park home run. The ace is rattled and loses 1 STF for the rest of the inning.", origin: "Mathewson in 'Pitching in a Pinch' (1912): 'Tinker is the worst man I have to face in the National League.' Tinker hit .350 career against the greatest pitcher alive — including an inside-the-park HR and a pennant-clinching triple." },
    { title: "The Cab Ride Fistfight", type: "Drama", text: "Two of your best players get into a fistfight on the field over a trivial slight — one took a cab and left the other behind. They refuse to speak to each other for the rest of their careers. Off-field chemistry drops to 0, but on-field synergy remains maximum. Double-play efficiency is unaffected.", origin: "September 14, 1905: Evers took a cab to the stadium and left teammates in the hotel lobby. Tinker punched him. They didn't speak for 33 years — but kept turning double plays together." },
    { title: "Thirty-Three Years of Silence", type: "Drama", text: "Two former teammates who haven't spoken in decades are reunited at a broadcast booth during the World Series. After a moment's hesitation, they throw their arms around each other and cry. Both gain +5 legacy. The feud is over.", origin: "1938 World Series: Tinker and Evers were asked to share a radio booth. They hadn't spoken since 1905 — hadn't even seen each other in 14 years. They met at a Chicago hotel, embraced, and wept." },
    { title: "Stole Home Twice", type: "Game Action", text: "Your speedster steals home twice in the same game. The opposing pitcher is humiliated. Your team gains +2 momentum. The baserunner gains the 'Ghost Runner' trait for the rest of the series.", origin: "July 28, 1910: Tinker stole home twice in a single game — one of the rarest feats in baseball history. 'Fleeter than birds,' Adams wrote." },
    { title: "Jump to the Federal League", type: "Drama", text: "Your star player, underpaid and disrespected, jumps to a rival league for a three-year contract worth triple his current salary. Your team loses its starting shortstop. The rival league gains legitimacy. A precedent is set for player freedom.", origin: "1914: Tinker jumped to the Federal League's Chicago Whales after Brooklyn wouldn't pay him $10,000. He signed for $36,000 over three years and managed the Whales to a pennant in 1915." },
    { title: "The Amputation", type: "Drama", text: "Your aging legend's diabetes takes his leg. He can no longer play. But his name lives on — a ballpark is named after him, and his legacy is secure. He gains the 'Immortal Name' trait.", origin: "Diabetes ravaged Tinker in retirement. His left leg was amputated in January 1947. He died on his 68th birthday — July 27, 1948. Tinker Field in Orlando bore his name for decades." },
    { title: "All Three Elected, None Attend", type: "Drama", text: "Three legendary teammates are elected to the Hall of Fame together. But none can attend the ceremony — one is dead, one is dying, one has lost a leg. The greatest infield in history is honored in absentia. +10 franchise legacy.", origin: "Tinker, Evers, and Chance were all elected to the HOF in 1946. Chance had died in 1924. Evers was too ill (died 1947). Tinker's leg had been amputated. None attended the induction ceremony in Cooperstown." },
  ],

  art_direction: {
    face: "Compact, wiry Kansas farm boy. 5'9\" 175 lbs — not big but quick and tough. Sharp eyes, determined jaw, the face of a man who'll fight you over a cab ride and then turn two on you the next inning. Clean-shaven or thin mustache. Weathered but alert — a shortstop's face, always scanning.",
    attire: "Chicago Cubs uniform circa 1908 — white wool jersey with 'CHICAGO' across the chest in block letters, baggy flannel pants, flat cap with 'C' insignia. Mid-play defensive crouch — fielding position, ball just hit, ready to backhand and fire to second. Or: mid-throw on the double-play pivot, body airborne, arm cocked. No number.",
    mood: "Coiled intensity. Not rage (that's Evers) or authority (that's Chance) — this is the quiet competence of a man who's turned ten thousand double plays. The ball is always coming to him. He's always ready. The West Side Grounds behind him, the infield dirt sharp and close.",
    style: "Sepia-toned with slightly cooler, harder edges than the Chance or Evers cards — Tinker is steel where Evers is fire and Chance is iron. The card should feel like a defensive highlight reel frozen in amber. Gritty, precise, Kansas-bred toughness. Dead-ball era photographic grain.",
    reference: "Think the mid-play defensive stop — the backhanded stab, the bare-hand grab, the no-look flip to second. Or: the double-play pivot at its apex, Tinker airborne, arm cocked, Evers behind him, Chance stretching at first. The entire poem captured in a single frame. The card that completes the trio.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }], note: "Pre-1957: use historical defensive reputation. Tinker's dWAR of 34.3 = 5th all-time." },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function JoeTinkerCard() {
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
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR OPS+", val: d.real_stats.career_ops_plus },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "dWAR", val: "34.3" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 15 SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "'07 WS", val: d.real_stats.ws_1907_avg },{ label: "'08 WS", val: d.real_stats.ws_1908_avg },{ label: "'10 WS", val: d.real_stats.ws_1910_avg }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>WORLD SERIES BATTING AVERAGES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× WS Champ (1907-08)", "🛡️ dWAR 34.3 (5th All-Time)", "⭐ HOF 1946", "📜 Baseball's Sad Lexicon", "⚔️ .350 vs. Mathewson", "🏃 Stole Home 2× in 1 Game"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Tinker's real life, become universal cards playable in any game.</p>
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
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Tinker's Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
