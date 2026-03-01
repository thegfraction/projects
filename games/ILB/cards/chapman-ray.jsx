// /cards/players/ray-chapman.jsx
import { useState } from "react";

const CHAPMAN_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: RAY CHAPMAN
  // Year Snapshot: 1917 (Peak Season — Best All-Around Year)
  // ═══════════════════════════════════════════════════════════════

  name: "Ray Chapman",
  nickname: "Chappie",
  year: 1917,
  team: "Cleveland Indians",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "170 lbs",
  born: "January 15, 1891 — Beaver Dam, KY",
  died: "August 17, 1920 — New York, NY (age 29, killed by pitched ball)",
  hof: "Not inducted. Career cut tragically short. Cleveland Indians HOF (2006). Widely believed HOF-bound had he lived.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1917 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, BR Bullpen
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1917,
    games: 156,
    at_bats: 563,
    hits: 170,
    doubles: 28,
    triples: 13,
    home_runs: 3,
    rbi: 36,
    stolen_bases: 52,
    batting_avg: ".302",
    obp: ".370",
    slg: ".409",
    ops: ".779",
    ops_plus: 131,
    war: 5.0,
    sacrifice_hits: 67,
    runs_scored: 98,
    walks: 61,
    gold_gloves: "N/A (pre-GG era)",
    all_star: "N/A (pre-ASG era)",
    career_avg: ".278",
    career_hits: 1053,
    career_hr: 17,
    career_sb: 238,
    career_war: 23.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON): .302 BA → tier 4 (.300-.329). OPS+ 131 → +1 bonus = 5 (cap). CON = 5.
  // POWER (POW): 3 HR → tier 0 (0-9 HR). SLG .409 → no bonus (needs .500). POW = 0.
  // SPEED (SPD): 52 SB → tier 3 (31-50+). Elite range at SS. SPD = 3.
  // DEFENSE (DEF): Pre-GG era. Led AL in putouts 3×, assists 1×, range factor 1st. Elite SS. DEF = 2.
  // CLUTCH (CLU): No postseason stats (died before 1920 WS). Reputation for clutch: .517 BA in Sep 1917 streak, 4 steals of home. CLU = 2.
  // OVERALL: CON×2(10) + POW×1.5(0) + SPD×1(3) + DEF×0.5(1) = 14 → normalized ~7
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — elite shortstop for the era, HOF trajectory
    con: 5,      // .302 BA → tier 4, OPS+ 131 → +1 bonus = max. Chapman crowded the plate and made contact relentlessly.
    pow: 0,      // 3 HR in 1917. Deadball Era SS — zero power. He was a bunter, not a slugger.
    spd: 3,      // 52 SB in 1917, franchise record for 63 years. Fastest man on the team. 10.0-second 100-yard dash. Maximum speed.
    def: 2,      // Led AL SS in putouts 3×, assists 1×, range factor 1st multiple times. Elite defender, pre-Gold Glove era.
    clu: 2,      // No postseason data. But .517 BA in Sep 1917 winning streak with 4 steals of home. Reputation for rising in big moments.
  },

  stat_justification: {
    con: "Career .278 BA, but .302 in 1917 and .300+ three times. OPS+ of 131 in 1917 — elite for a shortstop. Led the AL in sacrifice hits 3 times (67 in 1917, still the all-time record). Chapman crowded the plate and was one of the best contact hitters at his position. He was hitting .303 with a .380 OBP at the time of his death in 1920 — his best offensive season. Rating of 5.",
    pow: "3 HR in 1917, 17 career HR. This was the Deadball Era and Chapman was a slap hitter and bunter, not a power threat. His SLG of .409 came from doubles (28), triples (13), and speed, not home runs. Rating of 0 — no power, and that's fine. He didn't need it.",
    spd: "52 stolen bases in 1917 — a Cleveland franchise record that stood for 63 years until Miguel Dilone broke it in 1980. Also won a base-running race in 14 seconds flat. Ran the 100-yard dash in 10.0 seconds. Four steals of home in September 1917 alone. He was the fastest player in the American League. Rating of 3 — maximum speed.",
    def: "Led AL shortstops in putouts 3 times, assists once, and range factor multiple seasons. Played 154-155 complete games at SS in consecutive years — never removed from the field. Pre-Gold Glove era, but his defensive reputation was elite. The White Sox tried desperately to trade for him — they settled for Shoeless Joe Jackson instead. Rating of 2.",
    clu: "No postseason stats — Chapman died just before Cleveland's first pennant run (they won the 1920 WS without him). But during the September 1917 stretch drive, he hit .517 with 4 steals of home in a 10-game winning streak. His teammates rallied to win the 1920 championship specifically in his memory. Rating of 2 — excellent reputation, no postseason data to confirm.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Selfless, team-first, lead-by-action. Chapman was the ultimate number-two hitter — his record 67 sacrifice bunts in 1917 tell the story. He sacrificed his own numbers to move runners. He was the kind of player managers build lineups around because he made everyone else better.",
    temperament: "Jolly, outgoing, universally beloved. A Springfield teammate recalled: 'He was very flashy... And he could run. He was a beautiful runner. And he was very jolly, a jolly guy. Always laughing, talking, singing.' One of the few players Ty Cobb — famously antisocial — considered a genuine friend. Chapman's warmth was magnetic.",
    work_ethic: "Tireless. Played 154 and 155 complete games at shortstop in consecutive years — never taken out for a substitution. Played through broken legs, leg ailments, and injuries that would bench most players. Chapman simply refused to leave the field. His durability was legendary for a 170-pound shortstop.",
    lifestyle: "Upwardly mobile, community-minded. Chapman married Kathleen Daly, daughter of a millionaire Cleveland businessman, just before the 1920 season. He was planning to retire after 1920 to join the family business. He served in the Naval Reserve during WWI, was captain of the Navy baseball and football teams, and ran track. A Renaissance man of the Deadball Era.",
    era_adaptability: "HIGH. Chapman's skill set — speed, defense, plate discipline, contact — is timeless for a shortstop. He'd be a top-of-the-order catalyst in any era. His 84 walks leading the AL in 1918 shows he understood the value of on-base percentage decades before sabermetrics. The only limitation is power — but modern training might have unlocked more.",
    clubhouse_impact: "MAXIMUM. When Chapman was killed, the entire American League mourned. Players from Boston, Washington, St. Louis, and Detroit demanded Carl Mays be banned. Thousands attended his funeral. His teammates wore black armbands for the rest of 1920 and won the World Series in his memory. A blanket of 20,000 blossoms covered his grave, purchased by fans. No player's death has ever united a league like Chapman's.",
    dark_side: "The tragedy itself is the dark side. Chapman crowded the plate — it was his signature, and it made him vulnerable. On August 16, 1920, in twilight at the Polo Grounds, he couldn't see Carl Mays' dirty, scuffed submarine pitch. He never flinched. The ball hit his skull so hard Mays thought it was the bat. Chapman mumbled 'I'm all right... tell Mays not to worry... ring... Katie's ring' before collapsing. He died at 4:40 AM. His pregnant wife arrived at 10 AM to learn he was already gone. In ILB terms: Chapman carries a 'Mortal Risk' trait. He is the only player in MLB history killed by a pitched ball.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Beloved", desc: "Chapman is universally liked. +1 team chemistry for every teammate on the roster. No player has negative chemistry with Chapman." },
    { tag: "Sacrifice King", desc: "67 sac bunts in 1917 — all-time record. When Chapman bunts, baserunners advance with 95% success rate. He exists to make others better." },
    { tag: "Speedster", desc: "52 SB, 4 steals of home. Chapman can steal any base at any time, including home. Opposing catchers get -1 when Chapman is on base." },
    { tag: "Plate Crowder", desc: "Chapman crowds the plate for maximum coverage. +1 CON, but increases HBP probability by 20%. The risk is always present." },
    { tag: "Cobb's Friend", desc: "One of the few players Ty Cobb genuinely liked. When both are in the same game, neither player's aggression triggers penalties." },
    { tag: "Navy Man", desc: "Served in the Naval Reserve during WWI. Chapman gains +1 discipline and +1 morale in wartime or adversity scenarios." },
    { tag: "Mortal Risk", desc: "Chapman is the only MLB player killed by a pitched ball. In ILB, any HBP to the head triggers a critical injury check. If triggered: the player is permanently removed from the game — and the league changes forever." },
    { tag: "Do It For Chappie", desc: "If Chapman is lost, his team gains +3 morale and +2 clutch for the remainder of the season. His memory is the most powerful motivator in the game." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Ballfield / Practice", affinity: "HIGH", note: "Played 155 complete games at SS. The field was his home. Never left voluntarily." },
    { location: "Community Events", affinity: "HIGH", note: "Beloved in Cleveland. Engaged with fans, involved in civic life. Married into a prominent family." },
    { location: "Church", affinity: "HIGH", note: "Chapman's funeral was at the Cathedral of St. John the Evangelist. 34 priests participated. Deep faith community." },
    { location: "Restaurant / Social", affinity: "MEDIUM", note: "Jolly, social, always laughing. Enjoyed the company of teammates and friends." },
    { location: "Track / Athletic Field", affinity: "MEDIUM", note: "Won base-running races. Ran 100-yard dash in 10.0s. Captain of Navy track team." },
    { location: "Business Office", affinity: "MEDIUM", note: "Was secretary-treasurer at Pioneer Alloys. Planning retirement to business life after 1920." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "No particular association. Chapman was clean-living and focused on family and career." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Chapman's September 1917 stretch (.517 BA, 4 steals of home) defined clutch.",
      "Team winning streaks — his energy and sacrifice bunting fueled rallies.",
      "Playing alongside Speaker — best friend, fellow Indian, maximum chemistry.",
      "Getting on base — Chapman's OBP-first approach meant he was always in scoring position.",
    ],
    cold_triggers: [
      "Leg injuries — broke his leg in 1914, plagued by ailments in 1916. When his legs fail, everything fails.",
      "Low-visibility conditions — twilight, rain, dirty baseballs. Chapman crowded the plate and couldn't always see the pitch.",
      "Isolation from team — Chapman thrived on the collective. Remove him from the group and his joy dims.",
    ],
    pressure_response: "EXCELLENT. Chapman was at his best when the stakes were highest. In September 1917, during a 10-game winning streak in a tight pennant race, he hit .517 and stole home four times. He was having the best season of his career in 1920 when the Indians, White Sox, and Yankees were locked in a three-way race. He was the kind of player who elevated in big moments because his skills — speed, contact, defense — don't fail under pressure the way power does. In ILB: Chapman is a reliable clutch performer whose selfless style makes everyone around him better when it matters most.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Beaning",
      type: "Drama",
      text: "A pitch strikes your batter in the head. The stadium goes silent. Roll a d6: on 1, the player dies — removed permanently from the game. On 2-3, career-ending injury. On 4-6, he misses 30 games but recovers. Either way: the league bans dirty baseballs and requires new ones after damage. The game changes forever.",
      origin: "On August 16, 1920, Carl Mays' submarine pitch struck Chapman in the temple at the Polo Grounds. Chapman died 12 hours later — the only on-field death in MLB history. His death led to the banning of spitballs and the requirement to replace dirty baseballs.",
    },
    {
      title: "Sixty-Seven Sacrifices",
      type: "Game Action",
      text: "Your #2 hitter bunts a runner into scoring position for the 67th time this season. The record will never be broken. Your team's run production increases by +1 for the remainder of the game. The hitter's batting average drops, but his WAR rises.",
      origin: "Chapman's 67 sacrifice hits in 1917 remain the all-time MLB record, still unbroken over a century later.",
    },
    {
      title: "Four Steals of Home",
      type: "Game Action",
      text: "During a September winning streak, your fastest player steals home four times in 10 games. Each steal gives your team +1 momentum. Opposing pitchers become paranoid — their delivery slows, giving your other batters an advantage.",
      origin: "Chapman stole home four times during Cleveland's 10-game winning streak in September 1917, hitting .517 during the stretch.",
    },
    {
      title: "Tell Mays Not to Worry",
      type: "Drama",
      text: "Your injured player, bleeding and barely conscious, thinks first of the man who hurt him. 'I'm all right... tell him not to worry.' The entire league is moved. The player's team gains +5 permanent morale. The opposing pitcher is haunted — -2 to all stats for the rest of the season.",
      origin: "Chapman's final conscious words after being struck: 'I'm all right; tell Mays not to worry... ring... Katie's ring.' He was thinking of his wife's wedding ring and the man who hit him, not himself.",
    },
    {
      title: "Katie's Ring",
      type: "Drama",
      text: "Your star player's pregnant wife receives a phone call. She travels across the country to reach him. She arrives too late. The entire franchise mourns. A blanket of 20,000 flowers covers the grave. The team wears black armbands. They will win the championship in his name.",
      origin: "Kathleen Daly Chapman, pregnant, was summoned from Cleveland. She arrived at 10 AM — Chapman had died at 4:40 AM. She fainted upon learning. Their daughter, Rae Marie, was born months later.",
    },
    {
      title: "Do It for Chappie",
      type: "Action",
      text: "Your team suffers a devastating loss — a player killed or permanently injured. But the grief becomes fuel. For the rest of the season, the entire team gets +2 CLU and +2 morale. In the postseason, they are unstoppable. They win the championship and dedicate it to their fallen teammate.",
      origin: "The 1920 Cleveland Indians, devastated by Chapman's death, wore black armbands and rallied to win their first World Series. Joe Sewell, Chapman's replacement, hit .329 in 22 games.",
    },
    {
      title: "The Beautiful Runner",
      type: "Game Action",
      text: "Your fastest player enters a base-running competition against all comers. He circles the bases in 14 seconds flat. His speed becomes legendary — +1 SPD permanently and a loving cup trophy.",
      origin: "At an exhibition on Tim Murnane Day in 1917, Chapman won a base-running race, circling the bases in 14 seconds, winning a loving cup.",
    },
    {
      title: "They Settled for Shoeless Joe",
      type: "Trade",
      text: "A rival team wants your star shortstop. You refuse to trade him. Desperate, they trade for a different future Hall of Famer instead. Your SS stays — and the rival gets a player who will be banned for gambling within five years.",
      origin: "In 1915, the Chicago White Sox tried to acquire Chapman. Cleveland refused. The White Sox settled for trading for Shoeless Joe Jackson instead — who was banned in the 1919 Black Sox scandal.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, handsome face of a young Kentucky-born athlete. 5'10\" 170 lbs — wiry, fast, built for speed not power. Warm, open expression — the 'jolly guy' his teammates described. Bright eyes, slight smile, the look of someone who genuinely loves playing baseball. Clean-shaven, dark hair under cap.",
    attire: "Cleveland Indians 1917 road grays — the team was called the Indians beginning in 1915. Baggy wool flannel, classic Deadball Era cut. In his batting stance: crouched low over the plate, bat cocked back, crowding the zone. Or fielding at shortstop: mid-throw, athletic and fluid, 'beautiful runner' in motion.",
    mood: "Joy mixed with poignancy. Chapman should radiate the infectious warmth his teammates remembered. But the portrait should carry an undertone of fragility — a young man at the peak of his life, unknowing of what comes next. The viewer, knowing the story, should feel both the beauty of his talent and the weight of his fate.",
    style: "Sepia-toned with warm golden highlights, but slightly cooler and softer than other Muggers cards — an elegiac quality. League Park in the background, a summer afternoon, the shadows just beginning to lengthen. The card should feel like a photograph you'd frame on a mantelpiece — precious, preserved, mourned.",
    reference: "This is the most emotional card in the Muggers set. Where Smoky Joe Wood is bottled lightning, Chapman is a candle — brilliant, warm, and extinguished too soon. The ILB Chapman card should make you feel something. Not just admire — feel.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — HITTER (REUSABLE)
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
        width: `${(value / max) * 100}%`, height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 2, transition: "width 0.8s ease",
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

export default function RayChapmanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = CHAPMAN_DATA;
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
          Player Card — Muggers Era
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
          <div style={{ padding: 20 }}>
            {/* Portrait Placeholder */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.sepia}40, ${C.darkBrown}30)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>⚾</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>
                  See Art Notes tab for<br />AI image generation prompt
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            {/* Player Name */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            {/* Hitter Stat Bars */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "AVG", val: d.real_stats.batting_avg },
                { label: "OBP", val: d.real_stats.obp },
                { label: "SLG", val: d.real_stats.slg },
                { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "H", val: d.real_stats.hits },
                { label: "SB", val: d.real_stats.stolen_bases },
                { label: "R", val: d.real_stats.runs_scored },
                { label: "WAR", val: d.real_stats.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            {/* Career Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[
                { label: "CAR AVG", val: d.real_stats.career_avg },
                { label: "CAR H", val: d.real_stats.career_hits },
                { label: "CAR HR", val: d.real_stats.career_hr },
                { label: "CAR SB", val: d.real_stats.career_sb },
                { label: "SAC", val: "334" },
                { label: "3B", val: "80" },
                { label: "CAR R", val: "671" },
                { label: "CAR WAR", val: d.real_stats.career_war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 9 SEASONS (1912-1920)</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "🏆 3× AL Sac Leader",
                "⚡ 52 SB (1917)",
                "📜 67 Sac Hits Record",
                "🏃 AL Runs Leader '18",
                "👁️ AL Walks Leader '18",
                "🏟️ CLE Indians HOF",
                "🕊️ 1891-1920",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* BACK OF CARD — DOSSIER */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
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
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  {Object.entries(d.personality).map(([key, val]) => (
                    <Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}>
                      <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                    </Section>
                  ))}
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
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
                      These events, derived from Chapman's real life, become universal cards playable in any game.
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
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Trade" ? `${C.traitGreen}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Trade" ? C.traitGreen : C.medBrown,
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
                  <Section title="Chapman's Derivation">
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
