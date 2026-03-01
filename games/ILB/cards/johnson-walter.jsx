import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}johnson-walter.png`;

const PLAYER_DATA = {
  name: "Walter Johnson",
  nickname: "The Big Train",
  year: 1913,
  team: "Washington Senators",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "200 lbs",
  born: "November 6, 1887 — Humboldt, KS",
  died: "December 10, 1946 — Washington, DC (age 59)",
  hof: "Inducted 1936 (Charter Class, 83.6%). One of the Five Immortals. The award for best strikeout pitcher should bear his name.",

  real_stats: {
    season: 1913, games: 48, wins: 36, losses: 7, era: "1.14",
    innings: "346", strikeouts: 243, walks: 38, complete_games: 29,
    shutouts: 11, whip: "0.87", ops_plus_against: "N/A", war: 15.1,
    career_wins: 417, career_losses: 279, career_era: "2.17",
    career_strikeouts: 3508, career_cg: 531, career_shutouts: 110,
    career_war: 165.6, no_hitters: 1, perfect_games: 0,
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
    ovr: 13,     // Mythic — the greatest pitcher of baseball's first half-century
    stf: 5,      // 1.14 ERA → tier 5 (<1.50). K/9 of 6.32 (243 K / 346 IP) → ≥6.0 bonus → +1, already 5, capped at 5. Opponents batted .187 with .217 OBP. 15.1 WAR — best pitcher season in modern era. Stuff 5.
    ctl: 5,      // BB/9 of 0.99 (38 BB / 346 IP) → tier 5 (<1.0). WHIP of 0.87 → ≤1.00 bonus → +1, already 5, capped at 5. Career 1.89 BB/9. 110 shutouts and 38 career 1-0 wins (both all-time records) require pinpoint command. Control 5.
    sta: 4,      // 346 IP → tier 4 (300-349). Just shy of 350 for tier 5. 29 CG in 48 apps. Over 300 IP in 9 seasons. Career 5,914 IP. 531 CG. Three consecutive CG shutouts in 4 days (1908). Two separate 40+ scoreless inning streaks (only pitcher ever). Stamina 4.
    def: 1,      // Decent fielding pitcher. Played CF once in a farce game. Good hitter for a pitcher (.235 career, .433 in 1925, 547 career hits — most by a full-time pitcher). But not an elite defensive pitcher. Defense 1.
    clu: 3,      // 1924 WS Game 7: 4 scoreless innings of relief, won in 12th — Washington's only WS title. PS ERA in clincher: 0.00. Lost G1 (12 inn) and G5 first. PS ERA < 2.00 → tier 2. WS clincher bonus → +1 = 3. Maximum clutch.
  },

  stat_justification: {
    stf: "1.14 ERA in 1913 — the 6th-lowest single-season ERA in modern history at the time he recorded it. Led the AL and won the Pitching Triple Crown. K/9 of 6.32 (243 K in 346 IP) — above the ≥6.0 bonus threshold, though already at 5 from the ERA tier so the bonus is capped. Opponents batted .187 with a .217 OBP (6th lowest all-time). 15.1 WAR — the best single-season total by any pitcher in the modern era. Johnson threw primarily one pitch — the sidearm fastball — but it was the most devastating single pitch in baseball history. Cobb: 'It hissed with danger and made me flinch.' This is a maximum 5.",
    ctl: "BB/9 of 0.99 in 1913 — only 38 walks in 346 innings. WHIP of 0.87 — comfortably under the ≤1.00 bonus threshold, though already at 5 from the BB/9 tier. Career BB/9 of 1.89 — extraordinary for any era. 110 career shutouts (all-time record) require sustained control over hundreds of innings. 38 career 1-0 wins (all-time record) — you don't win 38 games 1-0 without perfect command. Led AL in fewest BB/game multiple times. This is a maximum 5.",
    sta: "346 IP in 1913 → tier 4 (300-349), just short of the 350 threshold for tier 5. Young threw 371 in 1901; Johnson falls 4 IP short of matching that tier. However: 29 CG in 48 apps. Over 300 IP in 9 different seasons. Career 5,914+ IP. 531 CG in 666 starts (80% CG rate). Three consecutive CG shutouts over Labor Day weekend 1908. Two separate 40+ consecutive scoreless inning streaks — the only pitcher EVER. 55⅔ consecutive scoreless innings (AL record for 55 years). Johnson pitched until age 39 across 21 seasons. The durability is superhuman but the single-season IP falls in tier 4.",
    def: "Decent fielding pitcher. Once played center field in a farce game — Griffith's end-of-season tradition. Good hitter for a pitcher: .235 career BA, record .433 in 1925, 547 career hits (most by any full-time pitcher), 13 outfield appearances. But no league leads in fielding categories as a pitcher, no notable defensive reputation from the mound. Rating of 1.",
    clu: "1924 WS Game 7 is one of the most legendary moments in baseball history. After losing Games 1 (4-3 in 12 innings, 165 pitches) and 5 (6-2), manager Bucky Harris called Johnson from the bullpen in the 9th: 'You're the best we've got, Walter. We've got to win or lose with you.' Johnson pitched 4 scoreless innings and won in the 12th — Washington's only World Series championship. PS ERA in the clincher: 0.00. Also won the 1924 AL pennant in his 18th year. Lost the 1925 WS to Pittsburgh. PS ERA < 2.00 in the clincher → tier 2. WS clincher bonus → +1. Rating of 3 — maximum clutch.",
  },

  personality: {
    leadership_style: "Quiet, stoic, lead-by-overwhelming-dominance. Johnson led by being the most indispensable player in franchise history — he WAS the Washington Senators for 21 years. Shirley Povich: 'More than any other ballplayer, probably more than any other athlete, the symbol of gentlemanly conduct in the heat of battle.' His manager's instruction: 'You're the best we've got, Walter.' The leadership was in the arm and the character, not the voice.",
    temperament: "Gentle, humble, universally beloved. Johnson was afraid of hitting batters with his fastball — the most dangerous pitch in baseball — because he didn't want to hurt anyone. Cobb exploited this by crowding the plate, knowing Johnson would pitch away from him rather than risk injury. Married a congressman's daughter. Devoted father of six. Every opponent respected him. The most dangerous arm in baseball belonged to the kindest man.",
    work_ethic: "Relentless and loyal. 21 years for the Washington Senators — a franchise that finished in the second division more often than not. Johnson never demanded a trade. He pitched 531 complete games. He won 40% of his team's games in 1913. When the rest of the Senators were 54-57, Johnson was 36-7. The work was superhuman but the demeanor was effortless — a sidearm whip that generated unhittable velocity with deceptive ease.",
    lifestyle: "Kansas farm boy to Washington institution. Born in Humboldt, KS. Grew up in Olinda, CA. Played semi-pro ball in Idaho — discovered by a traveling cigar salesman who wrote the Senators a letter. Married Hazel Lee Roberts, daughter of Nevada's congressman — their romance was 'the talk of Washington society.' Chaplain of the U.S. Senate officiated. Six children, five surviving to adulthood. After playing: managed the Senators (1929-32) and Indians (1933-35). Died of a brain tumor at 59.",
    era_adaptability: "THE VELOCITY TRANSLATES. Johnson's sidearm fastball was estimated at 91-100+ mph. The sidearm delivery added horizontal deception that modern hitters rarely face from a starter. His control (0.99 BB/9 in 1913, 1.89 career) would be elite in any era. The limited repertoire (primarily fastball, occasional curve developed ~1913-14) would challenge him against modern lineups expecting variety. But Johnson in 2024 would be an elite power arm with pinpoint control — comparable to peak Mariano Rivera (one unhittable pitch, perfect location) or peak deGrom (overwhelming stuff, elite command).",
    clubhouse_impact: "THE FRANCHISE INCARNATE. Johnson WAS the Washington Senators. When the Senators finally won the 1924 pennant — Johnson's 18th year — the entire city celebrated not just the team but the man who had waited so long. His presence elevated the franchise from a punchline ('Washington: first in war, first in peace, last in the American League') to a champion. +3 franchise stability, +2 team morale, +1 attendance.",
    dark_side: "The terrible teams. Johnson's greatness is inseparable from the tragedy of pitching for the Senators. He went 13-25 in 1909 with a 2.22 ERA because his team was 42-110. He lost 27 games by 1-0. He suffered 65 shutout losses. His 417 wins could have been 500+ with average run support. He briefly considered jumping to the Federal League in 1915 — a momentary wavering. His managerial career (1929-35) was unsuccessful, suggesting the gentle temperament didn't translate to managing. And: the brain tumor that killed him at 59 robbed him of decades he deserved.",
  },

  chemistry_traits: [
    { tag: "The Big Train", desc: "Once Johnson reaches full velocity (after the 1st inning), his fastball becomes virtually unhittable. +1 STF after the opening frame. The train reaches full speed." },
    { tag: "The Fastest Alive", desc: "Johnson's fastball is the fastest pitch in baseball. Batters face -1 CON penalty facing Johnson for the first time in a game. Cobb: 'It hissed with danger.'" },
    { tag: "The Gentleman's Fastball", desc: "Johnson is afraid of hurting batters. He will never intentionally throw at a hitter. -1 intimidation. But: +2 sportsmanship. Smart hitters crowd the plate." },
    { tag: "Carrying the Load", desc: "Won 40% of his team's games in 1913. When team quality is low, Johnson gains +1 to all pitching stats. The worse the team, the harder he throws." },
    { tag: "110 Shutouts", desc: "ALL-TIME RECORD. When Johnson leads after 7 innings, 50% chance of a shutout. No other pitcher in ILB history approaches this rate." },
    { tag: "Farm Strong", desc: "Kansas-born, Idaho semi-pro. No fatigue penalties. Johnson can pitch on 2 days' rest with no degradation. Three CG shutouts in 4 days." },
    { tag: "Five Immortals", desc: "Charter HOF Class with Cobb, Ruth, Mathewson, Wagner. +2 franchise prestige. The name alone is a monument." },
    { tag: "Eighteen Years of Waiting", desc: "Johnson waited 18 years for a pennant. In his first WS or elimination game, +2 all stats from sheer emotion. The weight of two decades fuels the arm." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "531 CG in 666 starts. More complete games than most pitchers have starts. The mound belongs to Johnson." },
    { location: "Griffith Stadium / Washington", affinity: "HIGH", note: "21 years. 417 wins. The franchise incarnate. 'You're the best we've got, Walter.'" },
    { location: "Opening Day", affinity: "HIGH", note: "14 career Opening Day assignments. The president threw the first pitch; Johnson threw the rest." },
    { location: "Farm / Rural Area", affinity: "MEDIUM", note: "Kansas born, California raised, Idaho semi-pro. The arm was built in open country." },
    { location: "The World Series", affinity: "MEDIUM", note: "Waited 18 years. Lost G1 and G5 in 1924. Then: 4 scoreless in G7 relief. Redemption." },
    { location: "City / Urban Areas", affinity: "MEDIUM", note: "Became a Washington institution. Married a congressman's daughter. But always a country boy at heart." },
  ],

  momentum: {
    hot_triggers: [
      "Early innings — once the Big Train reaches full speed, the fastball becomes unhittable",
      "Scoreless streaks — 55⅔ consecutive scoreless innings; momentum compounds with each zero",
      "Pennant races — 36-7 in 1913, won 40% of team's games; pressure increases his output",
      "Emotional stakes — the 1924 WS Game 7, eighteen years of waiting; emotion fuels the arm",
    ],
    cold_triggers: [
      "Poor run support — 27 losses by 1-0; 65 shutout losses; perfection loses when the offense vanishes",
      "Repeated exposure — hitters who see the fastball 3+ times per game can begin to adjust",
      "Initial WS pressure — lost his first two WS starts before the Game 7 heroics; the adjustment takes time",
      "Aging — velocity declined after 35; the sidearm delivery lost some deception late career",
    ],
    pressure_response: "LEGENDARY — EVENTUALLY. The 1924 WS Game 7 is one of the most famous moments in baseball history. After losing Games 1 (12 innings, 165 pitches) and 5, manager Bucky Harris called Johnson from the bullpen in the 9th: 'You're the best we've got, Walter. We've got to win or lose with you.' Johnson pitched 4 scoreless innings. Washington won in the 12th. The only WS championship the city ever had. In ILB terms: Johnson may struggle in his first postseason start, but in elimination games, he transcends.",
  },

  action_card_seeds: [
    { title: "Thirty-Six and Seven", type: "Game Action", text: "Your ace goes 36-7 with a 1.14 ERA. He strikes out 243. He throws 11 shutouts. Opponents bat .187 against him. He pitches 55⅔ consecutive scoreless innings. His WAR is 15.1 — the best single season by any pitcher in the modern era. The rest of his team is 54-57. He carries them to second place on his back.", origin: "In 1913, Johnson went 36-7 with a 1.14 ERA, 243 K, and 15.1 WAR — the best single pitcher season in modern MLB history." },
    { title: "You're the Best We've Got, Walter", type: "Game Action", text: "Game 7 of the World Series. Your pitcher has lost Games 1 and 5. He has waited 18 years. His manager calls him from the bullpen: 'You're the best we've got, Walter. We've got to win or lose with you.' He pitches 4 scoreless innings. Your team wins in the 12th. The only championship this city will ever have.", origin: "1924 WS Game 7: After losing Games 1 and 5, Johnson pitched 4 scoreless relief innings and won in the 12th — Washington's only World Series championship." },
    { title: "One Hundred and Ten Shutouts", type: "Game Action", text: "Your pitcher records his 110th career shutout. No other pitcher in baseball history will come close. One hundred and ten times, he took the mound and allowed nothing. The record will never be broken.", origin: "Johnson's 110 career shutouts remain the all-time MLB record — unchallenged, unreachable." },
    { title: "Three Shutouts in Four Days", type: "Game Action", text: "Friday: complete-game shutout. Saturday: complete-game shutout. Sunday: rest (blue laws). Monday: a THIRD consecutive complete-game shutout. Three starts in four days. The same team each time.", origin: "Labor Day weekend 1908: Johnson threw 3 consecutive CG shutouts vs. the Highlanders over 4 days." },
    { title: "Twenty-Seven Losses by One-to-Nothing", type: "Drama", text: "Your pitcher loses 1-0. Again. His ERA is pristine. His team scores nothing. He has now lost 27 games by 1-0 — the most in history. He also has 38 wins by 1-0 — also the most ever. He is the greatest pitcher alive, and his team cannot score.", origin: "Johnson lost 27 games by 1-0 (most ever) and won 38 by 1-0 (also most ever). He suffered 65 shutout losses in his career." },
    { title: "The Fastball That Hissed", type: "Game Action", text: "Ty Cobb steps to the plate — the most dangerous hitter alive. Your pitcher's sidearm fastball hisses past him. Cobb flinches. The greatest hitter in baseball flinched.", origin: "Ty Cobb on Johnson's fastball: 'It hissed with danger. It made me flinch.'" },
    { title: "The Gentleman Won't Throw Inside", type: "Drama", text: "Your pitcher has the fastest fastball in baseball. But he's afraid of hurting people. He refuses to throw inside. Cobb crowds the plate, knowing this. The deadliest weapon in baseball is wielded by the gentlest man. Your pitcher wins anyway.", origin: "Johnson was known for reluctance to pitch inside because he feared seriously injuring batters with his sidearm fastball." },
    { title: "The Five Immortals", type: "Drama", text: "The first Hall of Fame ballot. Five names: Cobb. Ruth. Wagner. Mathewson. Johnson. The foundation of baseball. Your pitcher stands among the gods.", origin: "1936: Johnson was one of the first five players elected to the Baseball Hall of Fame — 'The Five Immortals.'" },
  ],

  art_direction: {
    face: "Tall, gentle, powerful. 6'1\" 200 lbs — large for his era, with notably LONG ARMS that generated the sidearm whip. The face should be gentle and kind — soft features, warm eyes, the look of a man afraid of hurting people with his fastball. Not fierce like Cobb, not calculating like Collins — NOBLE. Midwestern features — Kansas heartland. But the body radiates enormous power. The gentleness is in the face; the danger is in the arm.",
    attire: "Washington Senators 1913 whites, wool flannel. The sidearm delivery — arm dropped below shoulder, sweeping forward in a whipping arc. Long arm fully extended, body torquing, front leg planted. Ball visible as a blur — a suggestion of speed. Or: standing tall on the mound, ball in glove, staring in with quiet determination. 21 years of this.",
    mood: "Thunder and grace. The overwhelming power of the fastest fastball alive combined with the gentle humility of the man who threw it. Enormous force in perfect control: 3,508 strikeouts thrown with 1.89 BB/9 precision.",
    style: "Rich sepia with deep NAVY BLUE and LIGHTNING WHITE undertones — the navy of the Senators' trim, the white-hot flash of the fastest pitch in baseball. The first pitcher palette in the Muggers. Dark blue depth with brilliant white streaks. STORM: thunder and lightning.",
    reference: "The sidearm delivery mid-motion — arm whipping, ball a white streak. Or: the 1924 WS Game 7 walk to the mound — 18 years on his shoulders. Or: the 55⅔ scoreless streak — an endless scoreboard of zeros. The card should feel like standing too close to a locomotive: beautiful, terrifying, inevitable.",
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
  parchment: "#e8e2d6", darkBrown: "#1a2744", medBrown: "#5e4a36",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#8f7858",
  cream: "#f0ebe0", ink: "#1a1a2e", hotRed: "#c44536",
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

export default function WalterJohnsonCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a2744 0%, #0f1a2e 50%, #1a2744 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
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
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 21 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1924 WS Champ", "👑 417 Career Wins", "⭐ HOF 1936 (Charter)", "🔥 3× Pitching Triple Crown", "⚡ 3,508 Career K", "🎯 110 Shutouts (Record)", "💙 21 Years, 1 Team", "🏛️ Five Immortals"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Johnson's real life, become universal cards playable in any game.</p>
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
                <Section title="Johnson's Derivation">
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
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#0f1a2e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
