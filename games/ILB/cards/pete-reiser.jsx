import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: PETE REISER
  // Year Snapshot: 1941 (Batting Title / Peak Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Pete Reiser",
  nickname: "Pistol Pete",
  year: 1941,
  team: "Brooklyn Dodgers",
  era: "1940s",
  ilb_team: "Allies NL1940",
  position: "CF",
  bats: "L",
  throws: "R",
  height: '5\'11"',
  weight: "185 lbs",
  born: "March 17, 1919 — St. Louis, MO",
  died: "October 25, 1981 — Palm Springs, CA",
  hof: "Not inducted. .295 BA, 58 HR, 87 SB, 128 OPS+ in 10 injury-shortened seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1941 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, MLB.com
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1941,
    games: 137,
    at_bats: 536,
    hits: 184,
    doubles: 39,
    triples: 17,
    home_runs: 14,
    rbi: 76,
    stolen_bases: 14,
    batting_avg: ".343",
    obp: ".406",
    slg: ".558",
    ops: ".964",
    ops_plus: 169,
    war: 8.0,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 3,
    career_avg: ".295",
    career_hits: 786,
    career_hr: 58,
    career_sb: 87,
    career_war: 24.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — HITTER
  //
  // CON: .343 BA → tier 5 (.330+). OPS+ 169 → +1, capped at 5. CON = 5.
  // POW: 14 HR → tier 1 (10-19). SLG .558 → +1. POW = 2.
  // SPD: 34 SB (1946 peak) → tier 3 (31-50). Gold Glove CF equivalent → +1, capped at 3. SPD = 3.
  // DEF: Pre-GG era. Extraordinary range in CF, cannon arm, led NL CF in putouts/assists. GG equivalent ~3-5. DEF = 2.
  // CLU: .200 WS BA in 1941, misplayed balls due to vertigo in 1947 WS. CLU = 0.
  // OVR: Incredible peak (MVP-caliber 1941) but career destroyed by injuries and WWII. OVR = 7.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — "Smoky Joe Wood Syndrome." Peak of a legend, career of a mortal.
    con: 5,      // .343 BA (NL leader), youngest batting champ in NL history at 22.
    pow: 2,      // 14 HR + .558 SLG (+1 bonus). Surprising power for his size — doubles and triples machine.
    spd: 3,      // 34 SB in 1946 including 7 steals of home (record). Fastest man in baseball.
    def: 2,      // Extraordinary CF range, cannon arm, led NL in CF putouts. Pre-GG equivalent ~3-5.
    clu: 0,      // .200 WS BA in 1941. Misplayed balls due to vertigo in 1947 WS. No clutch moments.
  },

  stat_justification: {
    con: "Won the 1941 NL batting title at age 22 with .343 — the youngest batting champ in NL history at that time. Led the league in doubles (39), triples (17), total bases (299), runs (117), slugging (.558), and OPS (.964). OPS+ of 169. In mid-1942, was hitting .380 before the wall crash that destroyed his career. Durocher compared him to Mays. Ted Williams didn't disagree. Maximum 5.",
    pow: "14 HR in 1941 — modest total, but 39 doubles and 17 triples show enormous extra-base power. SLG .558 earns the +1 bonus. Career 58 HR in only 861 games. For a 5'11\" switch-hitter, he had surprising pop. Red Smith wrote he was 'immeasurable.' Rating of 2.",
    spd: "Led the NL in stolen bases in 1946 with 34 — including a record 7 steals of home in a single season, a mark that still stands. He was universally considered the fastest player in baseball. Durocher said Mays was fast but Reiser was faster. Even after injuries, he stole bases at will. Rating of 3 (maximum).",
    def: "Extraordinary range in center field. Led NL CF in putouts and assists in 1941. Cannon arm — scouts briefly considered him for shortstop. His problem was that he was TOO good defensively — he chased everything, including balls headed for concrete walls. Pre-Gold Glove equivalent of 3-5 based on range and arm. Rating of 2.",
    clu: "1941 WS vs. Yankees: hit a double, triple, and home run but batted only .200 in 5 games as Brooklyn lost. 1947 WS: started 3 games but misplayed balls due to vertigo from previous wall crashes; became a bench player for the rest of the Series. Career postseason: .214 BA. No signature October moments. Rating of 0.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Lead by sheer intensity. Reiser played every game like it was his last — which, given his injury history, it often nearly was. He didn't give speeches; he sprinted to first on walks and dove headfirst into concrete walls. His teammates followed his energy or got out of the way.",
    temperament: "Fearless to the point of self-destruction. Reiser had no survival instinct on a baseball field. He literally could not stop himself from chasing fly balls into walls. When asked why he didn't pull up, he said: 'I can't. I see the ball and I go.' This wasn't recklessness — it was an inability to operate at anything less than maximum. Off the field, he was warm, funny, and loyal.",
    work_ethic: "Obsessive. Reiser was a natural right-hander who taught himself to hit left-handed to exploit his speed. After breaking his throwing arm, he taught himself to throw left-handed. After each wall crash and concussion, he returned too soon, playing through headaches, dizziness, and blurred vision. His work ethic was heroic and self-destructive in equal measure.",
    lifestyle: "Working-class St. Louis kid, one of twelve children. Married young, devoted family man. His wife Pat was his anchor. Roommates and best friends with Pee Wee Reese — served as best man at Reese's wedding. After baseball, owned a car dealership and worked as a carpenter. Never made big money from the game.",
    era_adaptability: "TRAGIC IRONY. In any modern era, padded walls and concussion protocols would have saved Reiser's career. He was literally born 30 years too early. His speed, switch-hitting, and defensive range would make him a superstar today. In fact, Ebbets Field installed padded outfield walls in 1948 BECAUSE of Reiser — but by then it was too late.",
    clubhouse_impact: "ELECTRIC. Reiser was the spark plug of the 1941 Dodgers — their first pennant winner in 21 years. His intensity was contagious. He and Jackie Robinson formed a daring stolen-base duo in 1947. Leo Durocher considered him the best player he ever managed. Teammates loved him because he gave everything.",
    dark_side: "The body count. Seven concussions. Carried off the field on a stretcher 11 times. Once given last rites at the stadium. A fractured skull in 1942. Paralyzed for ten days after a 1947 wall crash. Separated shoulders, broken ankles, bone chips. His daughter Sally had severe developmental problems. He died at 62 of respiratory illness — a life shortened by a career of self-inflicted trauma. In ILB terms: Reiser has a 'Glass Cannon' trait — maximum upside, maximum fragility. Every game carries injury risk.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Glass Cannon", desc: "After every game where Reiser makes a spectacular defensive play, roll for injury: 15% chance of missing 1-10 games. The better the play, the higher the risk." },
    { tag: "Fastest Alive", desc: "Reiser is the fastest player in any ILB set. +1 SPD bonus when stealing bases or scoring from first on a double. Can attempt steal of home once per series." },
    { tag: "Wall Crasher", desc: "In parks without padded walls (pre-1948), Reiser's injury risk doubles. In parks WITH padded walls, his DEF rating effectively becomes 3." },
    { tag: "Pistol Pete", desc: "Reiser's intensity is contagious. +1 team momentum when he makes the starting lineup. -2 team momentum when he's injured and removed." },
    { tag: "Pee Wee's Best Man", desc: "+2 chemistry with Pee Wee Reese. The roommates are inseparable. If both are in the lineup, each gets +1 morale." },
    { tag: "Jackie's Partner", desc: "+2 chemistry with Jackie Robinson. Together they form the most daring stolen-base duo in baseball. Combined steal attempts get +1 success bonus." },
    { tag: "Durocher's Favorite", desc: "+2 chemistry with Leo Durocher as manager. Durocher will never bench Reiser, even when injured — which is both a blessing and a curse." },
    { tag: "Smoky Joe Wood Syndrome", desc: "If Reiser plays a full season (130+ games) without major injury, he earns a +3 OVR bonus for that season. The card becomes a 10. But the odds are long." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Center Field / Practice Field", affinity: "HIGH", note: "'Hit it to me, hit it to me.' He wanted the ball on every pitch." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Joking with Pee Wee, planning stolen-base plays, taping up another injury." },
    { location: "Hospital / Trainer's Room", affinity: "HIGH", note: "The most frequent visitor in Dodgers history. 11 stretcher rides." },
    { location: "Community Events", affinity: "MEDIUM", note: "Working-class kid who stayed connected to fans and family." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Team dinners with Reese, Robinson, and the '47 Dodgers." },
    { location: "Hotel / Rest", affinity: "LOW", note: "Too wired to rest. Playing through concussion symptoms. Can't sit still." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Multi-hit games — Reiser was 19-for-21 in a road trip before the 1942 wall crash",
      "Stolen-base attempts — success fuels adrenaline, leading to more aggression",
      "Pennant races — Reiser was at his absolute best when Brooklyn needed him most",
      "Playing alongside Jackie Robinson — the duo's daring energized each other",
    ],
    cold_triggers: [
      "Wall crashes — each concussion reduces his performance ceiling permanently",
      "Post-injury return — dizziness, headaches, and vertigo linger for weeks",
      "Being held out of the lineup — Reiser's pride cannot accept being benched",
    ],
    pressure_response: "RECKLESS BRILLIANCE. Reiser doesn't rise to the occasion — he explodes toward it at full speed, regardless of consequences. In 1942 he was hitting .380 in a pennant race when he ran face-first into a concrete wall chasing Enos Slaughter's fly ball. He retrieved the ball and threw it in before collapsing with a fractured skull. That's Reiser's pressure response: superhuman effort that destroys his own body. In ILB: Reiser is the ultimate high-risk play. When healthy, he's a top-5 player. But 'when healthy' is the operative phrase.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Into the Wall",
      type: "Game Action",
      text: "Your center fielder chases a fly ball at full speed toward the outfield wall. He catches it — but crashes into the concrete. Roll a d6: on 1-2, he's carried off on a stretcher (out 10-30 games). On 3-4, he returns next inning but at -3 OVR. On 5-6, he shakes it off. Either way, the out stands.",
      origin: "Reiser crashed into outfield walls repeatedly. The worst: July 19, 1942 in St. Louis, when he fractured his skull chasing Enos Slaughter's drive. He was hitting .380. He dropped to .310 and was never the same.",
    },
    {
      title: "Seven Steals of Home",
      type: "Game Action",
      text: "Your fastest player attempts to steal home. This is the most audacious play in baseball. Roll: on 4+, he's safe and your team gains +3 momentum. On 1-3, he's out but earns a 'Fearless' bonus (+1 morale for trying).",
      origin: "In 1946, Reiser stole home seven times — an MLB record for a single season that has never been broken. He led the NL with 34 steals despite playing only 122 games.",
    },
    {
      title: "Carried Off on a Stretcher",
      type: "Drama",
      text: "Your star player is carried off the field on a stretcher. The crowd goes silent. He's given last rites at the stadium. Your team's morale drops -3 immediately. But if he returns within 5 games, he gains the 'Invincible' trait and morale surges +5.",
      origin: "Reiser was carried off the field on a stretcher 11 times in his career. He was once given last rites in the clubhouse. He always came back — until he couldn't.",
    },
    {
      title: "The Rickey-MacPhail Conspiracy",
      type: "Drama",
      text: "Two rival GMs make a secret deal to hide a top prospect in the minors. But the prospect is too talented to stay hidden. The manager threatens to quit if the prospect isn't promoted. Choose: break the deal and keep the star, or honor it and trade him.",
      origin: "Branch Rickey arranged for the Dodgers to sign Reiser and hide him in the minors, planning to trade him back to St. Louis. But Reiser was too good. Durocher forced MacPhail's hand, and Brooklyn kept him.",
    },
    {
      title: "Best Man at the Wedding",
      type: "Action",
      text: "Your two best players are roommates and best friends. Their bond is unbreakable. +2 chemistry permanently. But if one is traded, the other's morale drops -3 for the rest of the season.",
      origin: "Reiser served as best man at Pee Wee Reese's wedding in spring 1942. They were roommates and inseparable throughout their Dodger years.",
    },
    {
      title: "Padded Walls",
      type: "Action",
      text: "After your star outfielder's third wall crash, the team installs padded outfield walls. All future outfield injury risks are reduced by 50%. This is a permanent ballpark upgrade.",
      origin: "In 1948, Ebbets Field became the first ballpark to install padded outfield walls — directly because of Pete Reiser. Warning tracks followed. His career ended so that future players' careers could be saved.",
    },
    {
      title: "What Could Have Been",
      type: "Drama",
      text: "At the end of a tragically shortened career, your player is honored in a book called 'The 100 Greatest Players of All Time' despite never making the Hall of Fame. His legacy is: the best player who could have been. +10 permanent legacy. Collectors pay triple for his card.",
      origin: "In 1981, Ritter and Honig included Reiser in 'The 100 Greatest Baseball Players of All Time,' inventing the 'Smoky Joe Wood Syndrome' to explain why a player with limited career stats could still be one of the greatest ever.",
    },
    {
      title: "Throwing with the Other Arm",
      type: "Action",
      text: "Your injured player can't throw with his dominant arm. He teaches himself to throw with the other one. He returns to the lineup at -1 DEF but gains the 'Ambidextrous' trait permanently.",
      origin: "After fracturing his throwing arm, Reiser taught himself to throw left-handed. He was a natural right-hander who also hit left-handed. His ambidexterity allowed him to keep playing through injuries that would have ended anyone else's career.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Compact, handsome face with sharp features. 5'11\" 185 lbs — wiry, coiled, built like a compressed spring. Dark hair, intense eyes that telegraph pure determination. The face of a man who doesn't know how to slow down. Young — he was only 22 in 1941.",
    attire: "Brooklyn Dodgers road grays, 1941 flannel. Captured in full sprint — either chasing a fly ball toward the outfield wall or rounding third base with reckless abandon. Dirt on the uniform. A small tear in the sleeve. This card should look like it's been through a war.",
    mood: "Explosive intensity. Not anger — joy. The joy of a man who has found the only thing he was born to do and is doing it at the absolute limit of human capability. There should be a sense of danger in the portrait — something beautiful and breakable.",
    style: "Sepia-toned with kinetic energy. Ebbets Field in the background, the concrete outfield wall looming. Slightly more dynamic composition than other cards — Reiser's card should feel like it's in motion. Warm Brooklyn afternoon light with a hint of shadow from the wall.",
    reference: "This is the 'what if' card. The card collectors look at and feel a pang of loss. It should feel like a shooting star — brilliant, brief, and gone too soon. The most emotionally charged card in the Allies set.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY (HITTER)
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

const ChemTag = ({ tag, desc }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);

const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function PeteReiserCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, full sprint toward wall, Dodgers gray, Ebbets Field]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.gold}dd`, color: C.darkBrown, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏅 1941 NL Batting Title", "⭐ 3× All-Star", "🔥 Led NL 5 Categories", "💨 7 Steals of Home (Record)", "📖 100 Greatest Players", "🪖 WWII Veteran"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Reiser's real life, become universal cards playable in any game.</p>
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
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>This is the reusable formula for converting real Baseball Reference stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Reiser's Derivation">
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
