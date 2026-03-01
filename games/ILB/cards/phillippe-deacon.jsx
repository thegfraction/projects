import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}phillippe-deacon.png`;

const PLAYER_DATA = {
  name: "Deacon Phillippe",
  nickname: "The Deacon",
  year: 1903,
  team: "Pittsburgh Pirates",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'0"',
  weight: "180 lbs",
  born: "May 23, 1872 — Rural Retreat, VA",
  died: "March 30, 1952 — Avalon, PA (age 79)",
  hof: "NOT in HOF. 189-109. 2.59 ERA. .634 W%. Lowest BB/9 (1.25) in modern baseball history (since 60'6\" distance, 1893). Won the first WS game ever. 5 CG in 13 days in 1903 WS. 6× 20-game winner. Never a losing season. Voted greatest RHP in Pirates history by fans (1969). The greatest control pitcher the Hall forgot.",

  real_stats: {
    season: 1903, wins: 25, losses: 9, era: "2.05",
    innings: "289", strikeouts: "~120", walks: "~30", complete_games: "~25",
    shutouts: 7, win_pct: ".735", whip: "1.030",
    war: "~7.5",
    ws_1903_games: 5, ws_1903_cg: 5, ws_1903_wins: 3, ws_1903_losses: 2,
    ws_1903_ip: 44, ws_1903_era: "~3.07",
    career_wins: 189, career_losses: 109, career_era: "2.59",
    career_strikeouts: 929, career_cg: 242, career_shutouts: "~25",
    career_war: 30.6, career_ip: "~2600", career_win_pct: ".634",
    career_bb9: "1.25 (ALL-TIME LOWEST, modern era)",
    no_hitter: "May 25, 1899 (7th career game)",
    twenty_win_seasons: 6,
    losing_seasons: 0,
  },

  ilb_stats: {
    ovr: 9,      // Elite — The greatest control pitcher in modern baseball history (1.25 BB/9, all-time record). Won the first World Series game ever played. Pitched 5 complete games in 13 days in the 1903 WS. 6× 20-game winner. Never had a losing season. 189-109 career. The CLU 3 is the differentiator: the 1903 WS performance was historically unprecedented and will never be repeated.
    stf: 3,      // 2.05 ERA in 1903 → tier 3 (2.00-2.49). Career 2.59. Fastball and curveball ("benders"). K/9 ~3.2 (no K bonus). Not a power pitcher — a command pitcher. Fred Clarke: "the way he cuts loose with the benders is a caution." Rating: 3.
    ctl: 4,      // BB/9 1.25 career → tier 4 (1.0-1.49). THE ALL-TIME LOWEST in modern baseball. WHIP 1.030 (NL leader 1903, but misses ≤1.00 bonus by .030). He was #1 or #2 in NL in BB/9 every year from 1900-1907. No pitcher at 60'6" has ever walked fewer batters. Babe Adams (1.3 BB/9, 2nd lowest ever) was his teammate. Phillippe's control was the foundation of everything. Rating: 4.
    sta: 4,      // 289 IP in 1903 regular season → tier 3 (250-299). BUT: add 44 WS IP = 333 total IP → tier 4 (300-349). He pitched 5 COMPLETE GAMES in 13 DAYS in the 1903 WS. That is the most extraordinary stamina feat in postseason history, never to be repeated. The regular-season IP alone is tier 3, but the WS iron-man performance demands the bump. Rating: 4.
    def: 1,      // Fielding % 23 points above league average — notable for a pitcher. Still, no extraordinary defensive reputation beyond competence. Rating: 1.
    clu: 3,      // MAXIMUM. Won the FIRST World Series game in baseball history (Oct 1, 1903, beat Cy Young 7-3, 10 K). Pitched 5 complete games in 13 days. Won 3 WS games for the losing team — the only pitcher ever to do so. 44 WS IP (record, will never be broken). Carried the Pirates' entire pitching load when Leever was hurt and Doheny had a nervous breakdown. 3× NL pennant. 1909 WS champion (6 shutout IP in relief at age 37). Won his last 13 career decisions. No-hitter in 7th career game. Maximum: 3.
  },

  stat_justification: {
    stf: "2.05 ERA in 1903 → tier 3 (2.00-2.49). Career 2.59 ERA. K/9 ~3.2 (no K/9 ≥6.0 bonus). Phillippe was not a power pitcher — he was a fastball-curveball craftsman. Fred Clarke on the 1903 WS: 'the way he cuts loose with the benders is a caution.' The curveball was sharp but the strikeout rate was low. He induced weak contact through precision rather than overwhelming stuff. ERA+ ~155 in 1903 — elite but through command, not velocity. Rating: 3.",
    ctl: "BB/9 1.25 career → tier 4 (1.0-1.49). This is THE ALL-TIME RECORD for lowest BB/9 in modern baseball (since 1893, when the mound moved to 60'6\"). No pitcher in 130+ years has walked fewer batters per 9 innings. WHIP 1.030 in 1903 (NL leader, but misses the ≤1.00 bonus by .030). He was #1 or #2 in the NL in BB/9 every year from 1900 to 1907. SABR: 'Deacon Phillippe may have been the greatest control pitcher ever.' The tier system caps him at 4, but the all-time record deserves the asterisk. Rating: 4.",
    sta: "289 IP in 1903 regular season → tier 3 (250-299). However: add 44 IP in the 1903 WS → 333 total IP → tier 4 (300-349). The WS performance was the most extraordinary stamina feat in postseason history: 5 complete games in 13 days, because Leever was hurt (trap shooting shoulder) and Ed Doheny had a nervous breakdown. Phillippe was literally the entire Pittsburgh rotation for the first World Series. He pitched until his arm gave out. The regular season alone is tier 3; the WS demands the bump to tier 4. Rating: 4.",
    def: "Fielding percentage 23 points above league average — solid for a pitcher but not transformative. Rating: 1.",
    clu: "MAXIMUM. The case: (1) Won the FIRST World Series game in baseball history — Oct 1, 1903, beat Cy Young 7-3, 10 K. (2) Pitched 5 COMPLETE GAMES in 13 days in the 1903 WS. (3) Won 3 WS games for the losing team — no other pitcher has ever done this. (4) 44 WS IP — a record that will never be broken. (5) Carried the Pirates single-handedly when both Leever and Doheny were unavailable. (6) 3× NL pennant (1901-03). (7) 1909 WS champion — 6 shutout innings in relief at age 37. (8) Won his last 13 career decisions. (9) No-hitter in 7th career game. The 1903 World Series alone justifies maximum clutch. He pitched until his arm literally gave out in the biggest games baseball had ever seen. Rating: 3.",
  },

  personality: {
    leadership_style: "THE QUIET VOLUNTEER. Honus Wagner: 'Phillippe wanted to hurl against the other team's best pitcher and often worked out of turn to do it.' He didn't wait to be asked. He didn't complain about workload. When Leever went down and Doheny went mad, Phillippe simply said he'd pitch. Five complete games in 13 days. The Deacon led by being the one who showed up.",
    temperament: "Reserved, humble, quiet. 'Deacon' came from his refusal to play Sundays, his reticent demeanor, his clean living. Friends called him 'Charlie.' He was not dramatic, not confrontational, not colorful. He was the man you trusted because he never gave you a reason not to. Although his great-grandson disputed the sanitized image — Ella, his wife, may have thrown him out for joining baseball, or he abandoned the family. The quiet exterior may have hidden harder choices.",
    work_ethic: "FRONTIER TOUGHNESS. Born in Rural Retreat, Virginia. Raised on the Dakota Territory frontier. Played semi-pro baseball for years in South Dakota before anyone discovered him. Didn't reach the majors until nearly 27. Won 189 games anyway. The man was forged by isolation and distance — he walked a long road to reach the mound, and once there, he never left voluntarily.",
    lifestyle: "Small-town Virginia/Dakota Territory roots. Pennsylvania German and Scots-Irish heritage. After baseball: bailiff, scout for the Pirates, manager of the Pittsburgh Filipinos (named after him). Hunting trips with Leever and Wagner. His quote on Ruth: 'Babe Ruth was the biggest drawback to smart baseball the game has ever known.' The Deacon believed in craft over power, strategy over spectacle. A man out of time even in his own time.",
    era_adaptability: "TIMELESS CONTROL. Phillippe's 1.25 BB/9 translates to any era. Greg Maddux walked 1.80 per 9 in his peak — Phillippe was significantly better. The curveball command, the pitch-to-contact philosophy, the refusal to waste pitches — these work in 1903 and 2024. He would be a high-floor, low-ceiling starter: never flashy, always effective, always available. The analytics era would love his contact management even while questioning his strikeout rate.",
    clubhouse_impact: "STABILIZING ANCHOR. Best friends with Sam Leever. Hunting buddy of Honus Wagner. The Deacon was the moral center of the Pirates' dynasty — quiet, steady, always prepared. When Doheny had his breakdown and Leever shot himself out of the WS, Phillippe didn't point fingers. He pitched. +2 team stability, +1 composure under crisis. The man who absorbs the chaos.",
    dark_side: "The arm. Five complete games in 13 days broke something. In 1904, he missed half the season with a sore arm and an eye illness. He won 20 in 1905 but was never the same dominant force. By 1908, arm troubles and a broken finger from a line drive limited him further. The Pirates asked him to carry a World Series on his back and he did — and the price was the rest of his prime. Also: the family question. Great-grandson Rob DuBree claimed Deacon was 'thrown out of the house' by wife Ella for joining baseball. The Deacon's clean image may hide an abandonment. The quiet man may have been quiet because he had something to be quiet about.",
  },

  chemistry_traits: [
    { tag: "The First World Series Game", desc: "Phillippe won the first WS game in baseball history. When the stakes are highest and the moment is largest, +2 to all stats. He was born for the first time anything happened." },
    { tag: "Greatest Control Ever", desc: "1.25 BB/9 — the all-time record at 60'6\". Phillippe never walks anyone. Walk rate reduced by 50% in all appearances. The zone is his. Every pitch has a purpose." },
    { tag: "Five Complete Games in 13 Days", desc: "When teammates are injured or unavailable, Phillippe can pitch on 1-2 days rest with only -1 STF instead of -3. The arm was built for emergencies." },
    { tag: "Leever's Partner", desc: "Best friends with Sam Leever. When both are on the same staff, +1 STA each. They carried the 1903 Pirates — together and then alone." },
    { tag: "Wagner's Hunting Buddy", desc: "Off-season hunting with Honus Wagner. When Phillippe is on a roster with Wagner, +1 team chemistry. The outdoorsmen bond." },
    { tag: "The Deacon's Code", desc: "Refuses to play Sundays. -1 availability per week. But: +1 composure, +1 moral authority. The sacrifice earns the respect." },
    { tag: "Frontier Toughness", desc: "Raised on the Dakota Territory frontier. Played semi-pro for years in South Dakota. Debut at age 27. +1 durability, +1 resilience. The frontier built something the cities couldn't break." },
    { tag: "Smart Baseball", desc: "'Babe Ruth was the biggest drawback to smart baseball the game has ever known.' Phillippe believes in craft over power. When on staff, all pitchers gain +1 CTL but -1 to K/9. The Deacon's philosophy infects the rotation." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "189-109. 1.25 BB/9. The mound was his pulpit. Every pitch a sermon on control." },
    { location: "Pittsburgh / Exposition Park", affinity: "HIGH", note: "A decade with the Pirates. 3 pennants, 1 WS title. Voted greatest RHP in franchise history by fans." },
    { location: "The Postseason", affinity: "HIGH", note: "Won Game 1 of the first WS ever. 5 CG in 13 days. 6 shutout IP in 1909 WS. October was his stage." },
    { location: "The Frontier (Dakota Territory)", affinity: "HIGH", note: "Raised near Athol, South Dakota. Semi-pro ball on the frontier. The man was built by distance and isolation." },
    { location: "The Hunting Grounds", affinity: "MEDIUM", note: "With Leever and Wagner. The outdoors between seasons. The friendships that sustained a career." },
    { location: "Cooperstown", affinity: "LOW", note: "NOT THERE. 189-109. All-time control record. First WS game winner. Greatest RHP in Pirates history. Still outside." },
  ],

  momentum: {
    hot_triggers: [
      "Control locked in — when the curveball is hitting corners, he's untouchable. Walk rate drops to zero.",
      "Big games — he volunteered for the opponent's best. The bigger the stage, the sharper the Deacon.",
      "Teammates down — when the staff is depleted, Phillippe rises. Crisis activates his best self.",
      "Deep in counts — he wins the chess match. Batters who take pitches face a man who never misses twice.",
    ],
    cold_triggers: [
      "Arm fatigue — 5 CG in 13 days cost him. After heavy workloads, the arm protests. The 1904 sore arm haunts.",
      "Eye trouble — the 1904 illness affected his vision. If illness strikes, -2 STF until recovered.",
      "Short rest — despite the 1903 heroics, pitching on short rest degrades him over time. The body remembers.",
      "Post-crisis letdown — after carrying the load, the adrenaline fades. The season after a heroic stretch is vulnerable.",
    ],
    pressure_response: "HISTORICALLY GREAT. Phillippe is the greatest postseason performer on the Banners roster and one of the greatest in baseball history. Won the first WS game ever. Beat Cy Young. 5 CG in 13 days. 44 WS IP. Won 3 games for the losing team. 6 shutout IP at age 37 in the 1909 WS. Won his last 13 career decisions. No-hitter in his 7th career game. When the moment is unprecedented, Phillippe is the man. In ILB: he is the postseason ace — start him in the game that matters most.",
  },

  action_card_seeds: [
    { title: "The First World Series Game", type: "Game Action", text: "October 1, 1903. Huntington Avenue Baseball Grounds, Boston. Your pitcher takes the mound for the first World Series game in the history of baseball. He faces the immortal Cy Young. He throws a complete-game six-hitter. He strikes out ten. He wins 7-3. The first WS game is his. +5 legacy. +3 franchise history. The moment that started everything.", origin: "Oct 1, 1903: Phillippe beat Cy Young 7-3 in Game 1 of the first modern World Series, striking out 10 in a CG." },
    { title: "Five Complete Games in Thirteen Days", type: "Game Action", text: "Your ace pitcher starts five games in thirteen days. He completes all five. He wins three. His arm gives out in the last two but he never leaves the mound. Your other starters are broken — one had a nervous breakdown, one shot himself at a trap shooting range. Your pitcher carries the entire World Series on his arm until it fails. +3 STA legend. -2 STF next season. The price of glory.", origin: "1903 World Series: Phillippe pitched 5 CG in 13 days (44 IP), winning 3 and losing 2. Leever was hurt (trap shooting) and Doheny had a nervous breakdown." },
    { title: "Phil, Phil, Phillippe, Phil", type: "Drama", text: "The crowd chants your pitcher's name. 'Phil, Phil, Phillippe, Phil; He can win and you bet he will.' He takes the mound for Game 7 with the series tied 3-3. The fans carry him on their shoulders. The chant echoes through the park. He pitches another complete game. He loses. The chant dies. +2 crowd energy. -1 when the chant fails to save him.", origin: "1903 WS Game 7: Pittsburgh fans chanted for Phillippe as he took the mound with the series tied. He pitched a CG but lost to Cy Young 7-3." },
    { title: "The No-Hitter", type: "Game Action", text: "Your rookie pitcher, in his seventh career game, throws a no-hitter. Seven games into his major league career and he's already done what most never will. The control is already there. The curveball is already breaking. +3 STF confidence. +2 legacy.", origin: "May 25, 1899: Phillippe threw a no-hitter against the NY Giants in just his 7th career game, as a Louisville Colonels rookie." },
    { title: "One-Point-Two-Five", type: "Drama", text: "Your pitcher retires. His career walk rate: 1.25 per nine innings. The lowest in modern baseball history. No pitcher at 60 feet 6 inches has ever walked fewer. It is 2026 and the record still stands. 130 years of professional baseball and nobody has matched the Deacon's control. +5 all-time legacy. The number is eternal.", origin: "Phillippe's career 1.25 BB/9 remains the lowest in modern baseball history (since the mound moved to 60'6\" in 1893). No pitcher has broken this record in 130+ years." },
    { title: "The Deacon Won't Play Sundays", type: "Drama", text: "Your best pitcher refuses to pitch on Sundays. Moral principle. The team loses a potential start every week. But the respect he commands from his teammates — and the recovery day his arm gets — may be worth more than one missed start. -1 availability per week. +1 composure. +1 team moral authority. The Deacon's code.", origin: "Phillippe earned his nickname from his refusal to play on Sundays, his reserved demeanor, and his clean lifestyle." },
    { title: "Babe Ruth Was the Biggest Drawback", type: "Drama", text: "Your retired pitcher, decades after his career, declares: 'Babe Ruth was the biggest drawback to smart baseball the game has ever known.' The Deacon believed in craft, contact, and control — not power. The home run revolution offended him. In ILB: when Phillippe is on staff, the team philosophy shifts toward contact and control. All pitchers +1 CTL, -1 K rate.", origin: "Phillippe's famous quote reflecting his dead-ball era philosophy of precision over power." },
    { title: "The Last Thirteen Decisions", type: "Game Action", text: "Your 38-year-old pitcher, mostly in relief now, wins his last 13 decisions. 14-2 on the season. He also hits an inside-the-park grand slam — the first pitcher to do so. Then he walks away. The final chapter is perfect. +3 legacy. The Deacon wrote his own ending.", origin: "1910: Phillippe went 14-2 (.875 W%, NL leader), winning his last 13 career decisions. He also hit an inside-the-park grand slam, the first pitcher to do so." },
  ],

  art_direction: {
    face: "Handsome, sturdy, composed. 6'0\" 180 lbs. 'Sturdy oval face, lantern jaw, dark hair parted a shade left of center.' A man who looks like a deacon — serious, moral, steady. Dark eyes, strong jaw, the quiet authority of a man who never yelled and never needed to. The face should convey CALM CERTAINTY — not the fierce intelligence of Mathewson or the volcanic energy of Jennings, but the unshakeable composure of a man who walked 1.25 batters per nine innings because he simply didn't miss.",
    attire: "Pittsburgh Pirates uniform circa 1903 — white wool jersey with 'PITTSBURG' (no H) or old-style 'P' insignia, baggy flannel pants, flat cap. POSE: the delivery in perfect mechanical form — everything aligned, everything controlled, the curveball about to leave the hand on a precisely chosen trajectory. No wasted motion. No violence in the mechanics. The delivery of a man who threw strikes the way a watchmaker assembles gears. Or: the follow-through, arm extended, face calm, the ball already crossing the corner. No number.",
    mood: "SERENE AUTHORITY. Phillippe's card should feel like the CALMEST card in the entire Banners collection — even calmer than Leever. This is a man who beat Cy Young in the first World Series game, then pitched four more complete games in 13 days, and never once raised his voice. The mood is STEADINESS. The mood is CONTROL. The silence of a man who knows exactly where the ball is going.",
    style: "Sepia-toned with DEEP, WARM, CHURCHLIKE undertones — the light of stained glass, the gravity of a Sunday service (which he refused to pitch during). Where Leever is pastoral farmland and Chesbro is autumn twilight, Phillippe is SANCTUARY LIGHT — warm but serious, golden but grave. The palette should suggest moral weight, spiritual composure, the kind of calm that comes from faith (whether in God or in the curveball).",
    reference: "Think the curveball at its most precise — the ball leaving the hand on an exact line, the wrist position perfect, the release point consistent. Or: Phillippe on the mound at Huntington Avenue Baseball Grounds, October 1, 1903, about to throw the first pitch of the first World Series game in history. The calm before the first everything. The card should capture the moment when history begins and the man at its center is completely, utterly composed.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher/hero → +1 (cap 3)" },
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

export default function DeaconPhilippeCard() {
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
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>1ST WS GAME WINNER</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>1.25 BB/9 — All-Time Lowest (Modern Era)</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ background: `${C.warmRed}10`, border: `1px solid ${C.warmRed}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>⚾ 1903 WS: 5 CG IN 13 DAYS • 44 IP • 3W-2L • BEAT CY YOUNG</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "WHIP", val: d.real_stats.whip },{ label: "SHO", val: d.real_stats.shutouts },{ label: "WS GP", val: d.real_stats.ws_1903_games },{ label: "WS CG", val: d.real_stats.ws_1903_cg },{ label: "WS W", val: d.real_stats.ws_1903_wins },{ label: "WS IP", val: d.real_stats.ws_1903_ip }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1903 SEASON + FIRST WORLD SERIES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W-L", val: `${d.real_stats.career_wins}-${d.real_stats.career_losses}` },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR W%", val: d.real_stats.career_win_pct },{ label: "BB/9", val: d.real_stats.career_bb9.split(" ")[0] },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "20W SZN", val: d.real_stats.twenty_win_seasons },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "LOSS SZN", val: d.real_stats.losing_seasons }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>ZERO LOSING SEASONS IN 13-YEAR CAREER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚾ Won 1st WS Game (1903)", "🎯 1.25 BB/9 All-Time Record", "💪 5 CG in 13 Days", "🏆 1909 WS Champion", "📖 No-Hitter (7th Career Game)", "🙏 Refused Sunday Games", "🔥 6× 20-Win Seasons", "✅ 0 Losing Seasons", "❌ Not in HOF"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Phillippe's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="⚾ Pitcher Stat Engine">{Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Phillippe's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
