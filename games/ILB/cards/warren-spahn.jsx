import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: WARREN SPAHN
  // Year Snapshot: 1953 (Peak Season)
  // ═══════════════════════════════════════════════════════════════

  name: "Warren Spahn",
  nickname: "Hooks",
  year: 1953,
  team: "Milwaukee Braves",
  era: "1950s",
  ilb_team: "Dreamers NL1950",
  position: "SP",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "172 lbs",
  born: "April 23, 1921 — Buffalo, NY",
  died: "November 24, 2003 — Broken Arrow, OK",
  hof: "Class of 1973 (82.9%). 363 W, 2,583 K, 3.09 ERA, 63 SHO in 21 seasons.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1953 PEAK SEASON
  // Source: Baseball-Reference, Baseball Almanac
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1953, games: 35, wins: 23, losses: 7, era: "2.10",
    innings: "265.2", strikeouts: 148, walks: 70, complete_games: 24,
    shutouts: 5, whip: "1.06", war: 9.4,
    career_wins: 363, career_losses: 245, career_era: "3.09",
    career_strikeouts: 2583, career_cg: 382, career_shutouts: 63,
    career_war: 100.1, no_hitters: 2, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB PITCHER STAT CONVERSION
  //
  // STUFF: ERA tiers (<1.50=5, 1.50-1.99=4, 2.00-2.49=3, 2.50-2.99=2, 3.00-3.49=1, 3.50+=0) + K/9 ≥ 6.0 bonus (cap 5)
  // CONTROL: BB/9 tiers (<1.0=5, 1.0-1.49=4, 1.5-1.99=3, 2.0-2.49=2, 2.5-2.99=1, 3.0+=0) + WHIP ≤ 1.00 bonus (cap 5)
  // STAMINA: IP tiers (<150=0, 150-199=1, 200-249=2, 250-299=3, 300-349=4, 350+=5)
  // DEFENSE: Same as position players
  // OVERALL: STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13
  // CLUTCH: Same as position players (pitcher postseason ERA)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 12,     // Legend — winningest lefty ever, inner-circle HOF
    stf: 3,      // 2.10 ERA → tier 3 (2.00-2.49). K/9 only 5.01 — no K bonus. Stuff 3.
    ctl: 2,      // BB/9 of 2.37 → tier 2 (2.0-2.49). WHIP 1.06 → no bonus (>1.00). Control 2.
    sta: 3,      // 265.2 IP → tier 3 (250-299). 24 complete games in 32 starts.
    def: 1,      // Good fielding pitcher, 35 career HR as a hitter. Above average but not elite.
    clu: 2,      // 4-3 postseason, 3.05 WS ERA. Won Game 5 of 1948 WS with heroic relief. Won 1957 WS.
  },

  stat_justification: {
    stf: "2.10 ERA in 1953 — led the NL. Pitching Triple Crown contender (led in W and ERA). But K/9 was only 5.01 — Spahn was never a pure strikeout pitcher. He mastered the screwball in 1953 after adding it post-1952. He relied on movement, deception, and his famous high leg kick rather than overpowering velocity. Rating of 3 — elite results through guile and craft.",
    ctl: "BB/9 of 2.37 in 1953 — 70 walks in 265.2 innings. Spahn was known for pinpoint command but his walk totals were moderate, not elite. WHIP of 1.06 — excellent but just above the 1.00 bonus threshold. His famous quote: 'Hitting is timing. Pitching is upsetting timing.' He was a command artist, not a walk-avoidance machine like Cy Young. Rating of 2.",
    sta: "265.2 innings in 1953 with 24 complete games in 32 starts. Iron-armed — pitched 200+ innings 17 consecutive seasons (1947-1963). Over 300 IP twice. Career 5,243.2 IP — 8th all-time. He pitched 16 innings at age 42 against Marichal. Missed 3 prime years to WWII and still won 363 games. Rating of 3 for 1953; his stamina tier is higher in other peak seasons.",
    def: "Spahn was one of the best-fielding pitchers of his era. Also one of the greatest hitting pitchers — 35 career HR, .194 average, 189 RBI. He won a Gold Glove-equivalent in an era before the award existed. Excellent athlete who was originally a first baseman. Rating of 1.",
    clu: "4-3 career postseason record, 3.05 ERA. In the 1948 WS, won Game 5 with 5.2 innings of one-hit, seven-strikeout relief before 86,288 fans. Won the 1957 World Series championship. Pitched valiantly in the 1958 WS loss. His 16-inning duel with Marichal at age 42 — while not postseason — is one of the most clutch performances in baseball history. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet authority earned through combat experience and two decades of excellence. Spahn didn't need to shout — he'd survived the Battle of the Bulge and the bridge at Remagen. He once said: 'After what I went through overseas, I never thought of anything I was told to do in baseball as hard work.' His teammates respected a man who had earned a Purple Heart and a Bronze Star before he earned his first major league win.",
    temperament: "Witty, self-deprecating, fiercely competitive beneath a jokester's exterior. Spahn was famous for one-liners. When he gave up Willie Mays' first career hit (a homer): 'For the first 60 feet, that was a hell of a pitch.' When Casey Stengel managed both his first and last teams: 'I'm probably the only guy who played for Casey before and after he was a genius.' The humor masked iron will.",
    work_ethic: "Relentless reinvention. When his fastball faded after age 30, he developed a screwball and slider, giving him four quality pitches. He transformed from a power pitcher to a craftsman and became even better — winning 202 games in his 30s. His iconic high leg kick was developed with his father's coaching: 'He insisted I throw with a fluid motion. Hitters said the ball seemed to come out of my uniform.'",
    lifestyle: "Family man turned Oklahoma rancher. Married LoRene Southard (half-Cherokee), raised son Gregory, ran the Diamond Star Ranch south of Hartshorne, Oklahoma for decades. Clean-living but sociable — loved hunting, golf, and storytelling. Befriended Sam Jethroe, the Braves' first Black player, and helped start the Jimmy Fund charity for Dana-Farber Cancer Institute.",
    era_adaptability: "MAXIMUM. Spahn already proved this in real life — he reinvented himself three times across three decades of baseball. Power pitcher in the 1940s. Screwball artist in the 1950s. Wily veteran in the 1960s. His famous quote about pitching philosophy applies to any era: 'Hitting is timing. Pitching is upsetting timing.' He would be a Greg Maddux archetype — cerebral, adaptable, ageless.",
    clubhouse_impact: "GLUE. The senior man on the Braves for nearly 20 years. Prankster pals with Lew Burdette — the two were inseparable. Mentored young pitchers. His war experience gave him unshakable perspective that steadied everyone around him. When the Braves were rebuilding with Aaron, Mathews, and Adcock, Spahn was the veteran anchor who held the rotation together.",
    dark_side: "The stubbornness of a man who wouldn't quit. Spahn pitched until 44, years past his prime, bouncing from the Mets to the Giants to Mexico City to Tulsa. He couldn't let go. His ego drove him to manage in the minors for five years and coach in Japan. The same iron will that carried him through the Ardennes kept him on the mound when his body was done. In ILB terms: Spahn has a 'Won't Quit' trait — he resists being benched or removed, even when it hurts the team.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "War Hero", desc: "Purple Heart, Bronze Star, Battle of the Bulge survivor. Spahn's presence stabilizes team morale in crisis situations. Immune to 'pressure collapse' events." },
    { tag: "363 Wins", desc: "The winningest lefty in baseball history. Spahn's legacy adds +1 permanent reputation to any franchise he joins." },
    { tag: "Spahn and Sain", desc: "When paired with another ace (OVR 8+), the duo gains +1 synergy bonus. The rest of the staff prays for rain." },
    { tag: "Reinventor", desc: "When Spahn's primary pitch loses effectiveness (age decline), he can develop a new pitch mid-season. Delays age-related decline by 2 years." },
    { tag: "Prankster Pal", desc: "+2 chemistry with Lew Burdette or any pitcher with the 'Jokester' trait. Clubhouse morale +1 when both are on the roster." },
    { tag: "Combat Perspective", desc: "Shrugs off slumps and losses. Cold triggers are 50% less likely to activate. 'After the Bulge, a 3-game losing streak is nothing.'" },
    { tag: "High Kick", desc: "Spahn's deceptive delivery adds +1 to opposing hitter confusion. First at-bat against Spahn each game: batter gets -1 CON." },
    { tag: "Jimmy Fund", desc: "+1 community reputation. Spahn's charity work with Dana-Farber connects him to Boston-era squares." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound / Practice Field", affinity: "HIGH", note: "5,243 career innings. More time on the rubber than almost any human alive." },
    { location: "Ranch / Rural Area", affinity: "HIGH", note: "Diamond Star Ranch in Oklahoma. Hunting, horseback riding, working cattle." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The senior man. Telling war stories and pulling pranks with Burdette." },
    { location: "Community Events", affinity: "MEDIUM", note: "Jimmy Fund charity, autograph sessions, fan interaction. Beloved public figure." },
    { location: "Golf Course", affinity: "MEDIUM", note: "Avid golfer in retirement. Lived near a course in Broken Arrow." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Social but not a drinker. Prefers storytelling to partying." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Witty with reporters but didn't seek attention. Let the arm talk." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Pennant races — Spahn won 8 NL wins titles, always peaking in September",
      "New pitch development — adding the screwball in 1953 sparked his greatest season",
      "Paired with a strong catcher (Del Crandall) — battery chemistry amplifies performance",
      "Proving doubters wrong — told he was done multiple times, always came back stronger",
    ],
    cold_triggers: [
      "Aging body — knee injury in 1953 spring training he hid all year; played through pain",
      "Bad defensive support — Spahn induced contact and needed a good defense behind him",
      "Being removed from games — his stubbornness means early hooks damage his confidence",
    ],
    pressure_response: "SUPERB. Spahn was forged in the fires of actual combat — the Battle of the Bulge, the bridge at Remagen. He was one minute from death when the Ludendorff Bridge collapsed. A World Series game was nothing compared to that. In the 1948 WS, he won Game 5 with 5.2 innings of one-hit relief before 86,288 fans — the largest World Series crowd in history. He won the 1957 championship at age 36. At 42, he threw 201 pitches in 16 innings against Marichal. In ILB: Spahn is the ace you hand the ball for elimination games.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Spahn and Sain and Pray for Rain",
      type: "Game Action",
      text: "Your top two starting pitchers carry the entire rotation. For the next 12 games, only your #1 and #2 starters pitch. If both win at least 3, your team gains +3 momentum. If either loses 2+, the rotation collapses.",
      origin: "The famous 1948 Braves poem: 'First we'll use Spahn, then we'll use Sain, then an off day followed by rain.' The duo went 8-0 in 12 days to clinch the pennant.",
    },
    {
      title: "The Bridge at Remagen",
      type: "Drama",
      text: "Your player reveals he served in combat during wartime. He gains the 'Unshakable' trait permanently — immune to pressure collapse. But a hidden injury from service may surface: 10% chance per season of a knee or shoulder flare-up (-1 STA for 3 games).",
      origin: "Spahn served as a combat engineer in WWII, fighting at the Battle of the Bulge and the bridge at Remagen. He earned a Purple Heart and Bronze Star. He was standing beside the Ludendorff Bridge one minute before it collapsed, killing many soldiers.",
    },
    {
      title: "The Screwball Reinvention",
      type: "Action",
      text: "Your aging pitcher (age 32+) develops a new pitch during the offseason. He gains +1 STF and delays decline by 2 years. But the new pitch puts extra strain on his arm: +5% injury risk per season.",
      origin: "After a dismal 14-19 season in 1952, Spahn developed a screwball and slider over the winter. In 1953 he went 23-7 with a 2.10 ERA — his best season ever.",
    },
    {
      title: "Sixteen Innings at Midnight",
      type: "Game Action",
      text: "Your ace (age 38+) locks into a scoreless duel with an opposing ace (age 30 or younger). Both pitch 15+ innings. Roll a d6: on 1-3, your veteran loses on a solo homer. On 4-6, he outlasts the kid.",
      origin: "On July 2, 1963, the 42-year-old Spahn dueled 25-year-old Juan Marichal for 16 scoreless innings. Willie Mays ended it with a walk-off homer. Marichal threw 227 pitches; Spahn threw 201.",
    },
    {
      title: "For the First Sixty Feet",
      type: "Drama",
      text: "Your pitcher gives up a historic first hit to a future superstar. The rookie goes on a tear. Your pitcher quips about it for 50 years. +1 rivalry chemistry with that batter forever.",
      origin: "Spahn gave up Willie Mays' first career hit — a home run — after Mays started 0-for-12. Spahn joked: 'For the first 60 feet, that was a hell of a pitch.' Then added: 'We might have gotten rid of Willie forever if I'd only struck him out.'",
    },
    {
      title: "Before and After He Was a Genius",
      type: "Drama",
      text: "Your veteran player is traded to a terrible team managed by someone he knew decades ago. Morale drops -2 initially. But if the player delivers a memorable quip, +3 media attention and the team becomes lovable underdogs.",
      origin: "Spahn played for Casey Stengel on the hapless 1942 Braves and the equally hapless 1965 Mets. He quipped: 'I'm probably the only guy who played for Casey before and after he was a genius.'",
    },
    {
      title: "The Largest Crowd",
      type: "Game Action",
      text: "Your pitcher takes the mound in a World Series game before the largest crowd in Series history. He pitches in relief with nothing left. Roll: on 3+, he delivers 5+ innings of brilliance. On 1-2, he gives up an insurance run but the team still has a chance.",
      origin: "In Game 5 of the 1948 WS, Spahn relieved and threw 5.2 innings of one-hit ball before 86,288 fans in Cleveland — the largest WS crowd ever. He struck out 12 in 12 total Series innings.",
    },
    {
      title: "No-Hitter at Thirty-Nine",
      type: "Game Action",
      text: "Your veteran pitcher (age 38+) throws a no-hitter on a miserable, rain-soaked night before a tiny crowd. The baseball world is stunned. +5 legacy. He throws another one the next season.",
      origin: "Spahn threw his first no-hitter at age 39 (September 16, 1960, vs. Phillies, before just 6,117 fans) and his second at age 40 (April 28, 1961, vs. Giants, in 38-degree snowy weather). He became the second-oldest pitcher to throw a no-hitter, behind only Cy Young.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Lean, angular face with a prominent hooked nose (broken by a thrown ball — earned him the nickname 'Hooks'). 6'0\" 172 lbs — wiry, athletic build, long-limbed southpaw. Intelligent, alert eyes with crow's feet from years of squinting into the sun. Clean-cut 1950s look.",
    attire: "Milwaukee Braves home whites, #21, classic 1953 flannel. Captured mid-delivery in his iconic high leg kick — left knee nearly touching his chin, ball hidden behind his body. The deceptive windup that baffled hitters for two decades.",
    mood: "Confident calm with a hint of mischief. Not intimidating — knowing. The look of a man who has survived a world war and 265 innings in a season. A slight smirk that says he already knows what pitch he's going to throw and you're not going to hit it.",
    style: "Rich sepia with warm Milwaukee cream tones. County Stadium lights glowing in the background. The card should feel like a 1953 Topps card rendered in the unified ILB portrait style — warm, golden, authoritative. Slightly lighter palette than the Banners-era cards to reflect the optimism of the 1950s.",
    reference: "The defining image should be the high leg kick — Spahn's signature. This is the card that anchors the Dreamers pitching staff. It should feel like excellence earned through reinvention and sheer will. The most 'complete pitcher' card in the 1950s set.",
  },
};

// ═══════════════════════════════════════════════════════════════
// PITCHER STAT ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
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

export default function WarrenSpahnCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
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
      background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)",
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
          Player Card — Dreamers Era
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
                [AI Portrait: Sepia-toned, high leg kick delivery, Braves #21, County Stadium lights]
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
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            {/* ILB Stats — Pitcher */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "BB", val: d.real_stats.walks },
                { label: "IP", val: d.real_stats.innings },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "WAR", val: d.real_stats.war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON STATS — {d.real_stats.games} GAMES
            </div>

            {/* Career Stats Grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8,
              border: `1px solid ${C.sepia}30`,
            }}>
              {[
                { label: "CAR W", val: d.real_stats.career_wins },
                { label: "CAR L", val: d.real_stats.career_losses },
                { label: "CAR ERA", val: d.real_stats.career_era },
                { label: "CAR K", val: d.real_stats.career_strikeouts },
                { label: "CAR CG", val: d.real_stats.career_cg },
                { label: "CAR SHO", val: d.real_stats.career_shutouts },
                { label: "NO-HIT", val: d.real_stats.no_hitters },
                { label: "CAR WAR", val: d.real_stats.career_war },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Career Totals Label */}
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              CAREER TOTALS — 21 SEASONS
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {[
                "🏆 1957 WS Champ",
                "👑 363 Career Wins",
                "⭐ HOF 1973",
                "🔥 1957 Cy Young",
                "💎 2× No-Hitter",
                "⭐ 17× All-Star",
                "🎖️ 3× ERA Title",
                "🪖 Purple Heart / Bronze Star",
              ].map((a, i) => (
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
                      These events, derived from Spahn's real life, become universal cards playable in any game.
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
                  <Section title="⚾ Pitcher Stat Engine">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.
                    </p>
                    {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
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
                  <Section title="Spahn's Derivation">
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
  stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu },
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
