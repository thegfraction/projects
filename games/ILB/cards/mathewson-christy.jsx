import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}mathewson-christy.png`;

const PLAYER_DATA = {
  name: "Christy Mathewson",
  nickname: "Big Six",
  year: 1905,
  team: "New York Giants",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "195 lbs",
  born: "August 12, 1880 — Factoryville, PA",
  died: "October 7, 1925 — Saranac Lake, NY (age 45, tuberculosis from WWI poison gas)",
  hof: "Inducted 1936 (1st ballot, 90.7%). One of the original five HOF members alongside Cobb, Ruth, Wagner, Johnson.",

  real_stats: {
    season: 1905, games: 43, wins: 31, losses: 9, era: "1.28",
    innings: "338.2", strikeouts: 206, walks: 64, complete_games: 32,
    shutouts: 8, whip: "0.93", era_plus: 233, war: 11.7,
    career_wins: 373, career_losses: 188, career_era: "2.13",
    career_strikeouts: 2507, career_cg: 435, career_shutouts: 79,
    career_war: 97.3, no_hitters: 2, perfect_games: 0,
    ws_1905_ip: "27.0", ws_1905_era: "0.00", ws_1905_so: 18, ws_1905_bb: 1,
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
  // STUFF: ERA tiers (<1.50=5, 1.50-1.99=4, 2.00-2.49=3, 2.50-2.99=2, 3.00-3.49=1, 3.50+=0) + K/9 ≥ 6.0 bonus (cap 5)
  // CONTROL: BB/9 tiers (<1.0=5, 1.0-1.49=4, 1.5-1.99=3, 2.0-2.49=2, 2.5-2.99=1, 3.0+=0) + WHIP ≤ 1.00 bonus (cap 5)
  // STAMINA: IP tiers (<150=0, 150-199=1, 200-249=2, 250-299=3, 300-349=4, 350+=5)
  // DEFENSE: Same as position players
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // CLUTCH: Same as position players
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 13,     // Mythic — one of the original five HOF inductees, greatest NL pitcher, 3 WS shutouts in 6 days, 373 wins, 2.13 ERA
    stf: 5,      // 1.28 ERA → tier 5 (<1.50). K/9 ~5.47 — no K bonus. But ERA+ 233 and the fadeaway = maximum stuff regardless.
    ctl: 4,      // BB/9 1.70 → tier 3 (1.5-1.99). WHIP 0.93 → +1 bonus = 4. 'He could pitch into a tin cup.'
    sta: 4,      // 338.2 IP → tier 4 (300-349). 32 complete games. Pitched 390.2 IP in 1908. Not quite 350+ in snapshot year.
    def: 1,      // Good fielding pitcher, decent hitter (.215 career, 7 HR). Not elite defensively. Rating of 1.
    clu: 3,      // 1905 WS: 0.00 ERA in 27 IP — 3 CG shutouts in 6 days. ESPN's greatest playoff performance ever. PS ERA < 2.00 = 2, + WS clincher = +1. Maximum clutch.
  },

  stat_justification: {
    stf: "1.28 ERA in 1905 → tier 5 (<1.50). ERA+ 233 — the highest of his career. K/9 was ~5.47 (under 6.0, no K bonus). But Mathewson's stuff transcended strikeouts: the fadeaway (screwball) was unhittable, he threw 2 no-hitters, and in 1908 he went 37-11 with 259 K and 1.43 ERA. Roger Bresnahan called him 'the greatest pitcher of all time.' Maximum stuff.",
    ctl: "BB/9 of 1.70 in 1905 → tier 3 (1.5-1.99). WHIP 0.93 → WHIP bonus (+1) = 4. In the 1905 WS: 27 IP, 1 walk, 18 K. Career: 2,507 K to 848 BB (2.96 K/BB). Johnny Evers: 'He could pitch into a tin cup.' A Giants catcher said you could 'catch Matty in a rocking chair.' Elite but not quite Young's sub-1.0 BB/9 level. Rating of 4.",
    sta: "338.2 IP in 1905 → tier 4 (300-349). 32 CG in 37 starts. Pitched 390.2 IP in 1908 (34 CG in 44 starts). Pitched 3 CG shutouts in 6 days in the 1905 WS, the last on one day's rest. Career 4,788 IP, 79 shutouts, 12 consecutive 20-win seasons. Rating of 4 in the snapshot year (would be 5 in 1908).",
    def: "Good fielding pitcher — Mathewson was athletic (played college football at Bucknell, pro football with Pittsburgh Stars). Decent hitter (.215 career, .281 in the WS). Not an elite defensive pitcher by reputation. Rating of 1.",
    clu: "1905 WS: 3 CG shutouts in 6 days. 27 IP, 0 R, 14 H, 1 BB, 18 K. 0.00 ERA. ESPN named it the greatest playoff performance of all time. PS ERA < 2.00 = 2. WS clincher/hero performance = +1. Maximum clutch rating of 3. The only blemish: the 1912 WS Game 8 Snodgrass Muff loss.",
  },

  personality: {
    leadership_style: "Lead by moral example and competitive excellence. Mathewson was the anti-McGraw — quiet, dignified, college-educated, and utterly dominant. He didn't need to scream or fight. He led by being the best, the smartest, and the most professional man on the field. His teammates followed because he made winning look like a gentleman's pursuit.",
    temperament: "Serene intensity. Called 'the Christian Gentleman' — he refused to pitch on Sundays, turned down a saloon endorsement at his mother's request, and was the first sports hero whose appeal crossed all social, economic, and cultural boundaries. But beneath the gentility was a ferocious competitor: 37 wins in 1908, 3 shutouts in 6 days, 25 war-duels with Three Finger Brown.",
    work_ethic: "Cerebral mastery. Mathewson studied batters obsessively. Honus Wagner: 'Mathewson knew more in five minutes about batters than the modern pitcher does in a whole season.' He didn't overpower through brute force — he dismantled lineups through intelligence, sequencing, and the unhittable fadeaway. A checkers champion who approached pitching like a chess match.",
    lifestyle: "College-educated Bucknell man in an era of roughnecks. Married Jane Stoughton; the Mathewsons and McGraws shared an apartment in New York. Endorsed Arrow shirt collars and athletic equipment — but refused the saloon deal. Played football at Bucknell and professionally (Pittsburgh Stars, 1902). The most marketable athlete in America before Babe Ruth. His mother wanted him to be a preacher.",
    era_adaptability: "TRANSCENDENT. Mathewson's approach — pinpoint control, pitch sequencing, studying hitters, the screwball — is exactly how modern elite pitchers work. Greg Maddux was essentially a Mathewson descendant. In any era, this man dominates. The only question is workload — 390 innings wouldn't happen today, but the intelligence and repertoire translate perfectly.",
    clubhouse_impact: "The moral center of the Giants. McGraw was the fire; Mathewson was the ice. Together they created modern baseball. McGraw treated Christy 'like the son he never had.' Players revered him — not feared him. He elevated the profession's reputation. Baseball became respectable partly because Mathewson existed.",
    dark_side: "The war killed him. Mathewson enlisted in WWI in 1918 and was accidentally exposed to poison gas during training. The lung damage gave him tuberculosis. He spent his final years wasting away at a sanitarium in Saranac Lake, NY, serving as Boston Braves president by correspondence. He died on October 7, 1925 — during the 1925 World Series. Game 3 was delayed and flags flew at half-staff. He was 45. Also: the Snodgrass Muff in the 1912 WS haunted him — the one great failure. And his son Christopher Jr. later struggled with mental illness, a quiet family tragedy. The diphtheria bout of 1906 nearly killed him before the war ever could.",
  },

  chemistry_traits: [
    { tag: "The Christian Gentleman", desc: "Moral exemplar. All teammates gain +1 discipline while Mathewson is on the roster. No ejections for your team in games he starts." },
    { tag: "The Fadeaway", desc: "Signature screwball. First batter of each inning faces -2 CON. The pitch breaks opposite to everything they've ever seen." },
    { tag: "Battery Bond (Bresnahan)", desc: "With his preferred catcher (Bresnahan), Mathewson gains +1 CTL and +1 CLU. The battery is a single organism." },
    { tag: "McGraw's Son", desc: "Perfect synergy with a fiery manager. If paired with a McGraw-type, Mathewson gains +1 STF in big games. Fire and ice." },
    { tag: "College Man", desc: "Bucknell-educated in an era of roughnecks. +1 to team reputation. Endorsement deals generate extra franchise revenue." },
    { tag: "Sunday Rest", desc: "Will not pitch on Sundays. If scheduled on a rest day, must be skipped. But gains +1 STA for any start with full rest." },
    { tag: "Iron Arm", desc: "Can pitch on one day's rest with no penalty — as he did for the 3rd WS shutout in 1905. Other pitchers lose 2 STF on short rest." },
    { tag: "Poison Gas", desc: "After military service or age 38, Mathewson's stats decline by 2 per season. Tuberculosis is merciless. The clock ticks." },
  ],

  preferred_locations: [
    { location: "Library / Quiet Spot", affinity: "HIGH", note: "Checkers champion, cerebral strategist. Studied batters, read voraciously. The thinking man's retreat." },
    { location: "Church", affinity: "HIGH", note: "The Christian Gentleman. Refused to pitch on Sundays. His mother wanted him to be a preacher." },
    { location: "Pitcher's Mound", affinity: "HIGH", note: "His cathedral. 4,788 career IP. 79 shutouts. More dominance per inning than almost any pitcher in history." },
    { location: "Hotel / Rest", affinity: "HIGH", note: "Disciplined rest between starts. The arm was a national treasure and he treated it as such." },
    { location: "Media / Spotlight", affinity: "MEDIUM", note: "Most famous athlete in America. Arrow collars, endorsements. But reticent, not performative." },
    { location: "Restaurant / Social", affinity: "MEDIUM", note: "Shared an apartment with the McGraws. Social in small, civilized settings." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Refused the saloon endorsement at his mother's request. Not a teetotaler, but the opposite of a carouser." },
  ],

  momentum: {
    hot_triggers: [
      "October baseball — 3 WS shutouts in 6 days, .281 WS BA as a hitter, ESPN's greatest playoff performance",
      "Rivalry duels — 25 legendary matchups with Three Finger Brown, 24 consecutive wins vs. Cardinals (1904-08)",
      "Big-game starts — led NL in wins 4×, ERA 5×, strikeouts 5×. Rose to every occasion.",
      "Battery harmony — with Bresnahan catching, Mathewson was nearly unhittable (1905 WS: 0.00 ERA, 1 BB in 27 IP)",
    ],
    cold_triggers: [
      "The Snodgrass Muff — 1912 WS Game 8: Fred Snodgrass dropped a fly ball, costing the Giants the Series. Mathewson was pitching.",
      "Physical illness — diphtheria in 1906 wrecked his season (2.97 ERA, uncharacteristic). Pain in left side from 1914 onward.",
      "Poison gas — WWI training accident destroyed his lungs. Tuberculosis consumed him. Died during the 1925 World Series.",
      "Merkle's Boner (1908) — Mathewson won 37 games but the Giants lost the pennant because Merkle didn't touch second. Evers beat him.",
    ],
    pressure_response: "THE MOST DOMINANT POSTSEASON PITCHER IN BASEBALL HISTORY. Three complete-game shutouts in six days: 27 innings, 0 runs, 14 hits, 1 walk, 18 strikeouts. ESPN named it the greatest playoff performance of all time. Connie Mack: 'It was wonderful to watch him pitch — when he wasn't pitching against you.' The Buffalo Enquirer during the 1905 WS: 'As cool as the proverbial cucumber.' The only crack: the 1912 WS, when Snodgrass's error undid a masterful performance. Even gods have one mortal wound.",
  },

  action_card_seeds: [
    { title: "Three Shutouts in Six Days", type: "Game Action", text: "Your ace pitcher starts three games in a single postseason series. He throws a complete-game shutout in each one: 27 IP, 0 R, 1 BB, 18 K. The opposing offense is annihilated. This card cannot be countered — it is the greatest pitching performance in postseason history.", origin: "1905 World Series: Mathewson pitched 3 CG shutouts in 6 days to clinch the Giants' first championship over the A's. ESPN named it the greatest playoff performance of all time. 27 IP, 0 R, 14 H, 1 BB, 18 K." },
    { title: "The Fadeaway", type: "Game Action", text: "Your pitcher throws a screwball that breaks opposite to every other pitch the batter has seen. The next 3 batters each face -2 CON. If all 3 strike out, your pitcher gains +1 STF for the rest of the game.", origin: "Mathewson's signature fadeaway (screwball), possibly learned from Dave Williams in 1898 (some credit Rube Foster). The pitch baffled dead-ball hitters and was the foundation of his dominance." },
    { title: "Pitch Into a Tin Cup", type: "Game Action", text: "Your pitcher's control is so precise that for this game, no walks are issued. Every pitch hits its target. Batters can only reach base on hits or errors. WHIP drops by 0.30 for the game.", origin: "Johnny Evers: 'He could pitch into a tin cup.' A Giants catcher: 'You could catch Matty in a rocking chair.' In the 1905 WS, he walked 1 batter in 27 innings." },
    { title: "The Gentleman's Duel", type: "Game Action", text: "Your ace and the opposing ace lock into a classic pitcher's duel. Both pitchers gain +2 STF and +2 CTL. The game becomes a 1-0 affair decided by a single moment of brilliance — or a single error.", origin: "Mathewson's 25 legendary duels with Three Finger Brown — each one a masterclass. Brown won 13, Mathewson 11, with 1 no-decision. The rivalry defined dead-ball pitching." },
    { title: "The Snodgrass Muff", type: "Drama", text: "Your fielder drops a routine fly ball in a crucial World Series moment. The opposing team scores the winning run. Your ace, who was dominant, takes the loss. Team morale drops by 3. But the pitcher gains permanent +1 CLU from the fire of injustice.", origin: "1912 World Series Game 8: Fred Snodgrass dropped a fly ball in the 10th inning, leading to the Giants' loss to the Red Sox. Mathewson was pitching brilliantly. One of baseball's most infamous errors." },
    { title: "Poison Gas", type: "Drama", text: "Your star player enlists during wartime and is accidentally exposed to chemical weapons during training. He returns alive but permanently damaged. All stats decline by 2 per season until retirement or death. The clock is merciless.", origin: "Mathewson enlisted in WWI in 1918 and was exposed to poison gas during training. The lung damage caused tuberculosis. He died at 45 in a Saranac Lake sanitarium — during the 1925 World Series. Flags flew at half-staff." },
    { title: "Master of Them All", type: "Action", text: "Your pitcher wins the pitching Triple Crown: most wins, lowest ERA, most strikeouts. For the rest of the season, he gains +1 to all stats. His HOF plaque will read the truth: he was master of them all.", origin: "Mathewson won the Triple Crown twice (1905: 31 W, 1.28 ERA, 206 K; 1908: 37 W, 1.43 ERA, 259 K). His HOF plaque: 'Greatest of all the great pitchers in the 20th century's first quarter. Matty was master of them all.'" },
    { title: "Died During the World Series", type: "Drama", text: "Your greatest pitcher passes away during the Fall Classic. The game is delayed. Flags fly at half-staff across the nation. Every pitcher who follows him is measured against his ghost. He gains the 'Eternal' trait — his legacy can never be diminished.", origin: "Mathewson died October 7, 1925, during Game 3 of the 1925 World Series between Pittsburgh and Washington. The game was delayed. Flags flew at half-staff. He was 45 years old." },
  ],

  art_direction: {
    face: "Tall, handsome, clean-cut college man. 6'1\" 195 lbs — broad-shouldered but elegant, not brutish. High forehead, clear intelligent eyes, strong jaw, composed expression. The face of a man who could pitch three shutouts in six days without breaking a sweat. Called 'the handsomest man in baseball.' No scowl, no fury — just serene, total confidence.",
    attire: "New York Giants uniform circa 1905 — white wool jersey with 'NY' interlocking monogram, possibly the all-black World Series uniforms McGraw ordered. Baggy flannel pants, flat cap. Mid-windup or post-delivery follow-through, the classic high-kick pitching motion of the dead-ball era. No number.",
    mood: "Olympian calm. The Polo Grounds behind him, packed crowd in soft focus. No desperation, no strain — just the serene focus of a man who has already decided what pitch he'll throw and where it will go. The composure that made Connie Mack marvel. Slightly ethereal — this card should feel like a portrait of perfection.",
    style: "Sepia-toned with cooler, more silvery highlights than the other Banners cards — Mathewson is moonlight where Chance is sunshine and Evers is fire, and Young is deep earth tones. Dead-ball era photographic grain. Slightly more luminous and elevated than other cards — this is not a mortal, this is the Polo Grounds deity.",
    reference: "Think the classic high-kick windup, leg raised, arm cocked, about to deliver the fadeaway. Or: the composed post-game portrait, looking directly at the camera with those clear eyes. Cabinet card composition, the mound as altar. The card should rival the Cy Young card in weight and significance — these are the two anchor pitchers of the Banners era.",
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

export default function ChristyMathewsonCard() {
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
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 17 SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "WS IP", val: d.real_stats.ws_1905_ip },{ label: "WS ERA", val: d.real_stats.ws_1905_era },{ label: "WS K", val: d.real_stats.ws_1905_so },{ label: "WS BB", val: d.real_stats.ws_1905_bb }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1905 WORLD SERIES — 3 CG SHUTOUTS IN 6 DAYS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1905 WS Champ", "👑 373 Career Wins", "⭐ HOF 1936 (First 5)", "🔥 2× Triple Crown", "💎 3 WS Shutouts in 6 Days", "📜 2× No-Hitter", "🎖️ 12× 20-Win Seasons", "🌟 ERA+ 233 (1905)"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Mathewson's real life, become universal cards playable in any game.</p>
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
                <Section title="Mathewson's Derivation">
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
