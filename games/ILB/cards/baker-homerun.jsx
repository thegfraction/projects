import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}baker-frank.png`;

const PLAYER_DATA = {
  name: 'Frank "Home Run" Baker',
  nickname: "The Original Home Run King",
  year: 1912,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "3B",
  bats: "L",
  throws: "R",
  height: '5\'11"',
  weight: "173 lbs",
  born: "March 13, 1886 — Trappe, MD",
  died: "June 28, 1963 — Trappe, MD (age 77)",
  hof: "HOF 1955. .307 career BA. 96 HR. 3× WS champion. Led AL in HR 4 straight years (1911-14). Led AL in RBI 2× (1912-13). WS career BA .363. Hit HRs off Mathewson AND Marquard in back-to-back WS games to earn the most famous nickname in dead-ball baseball. The farm boy from Trappe who became the original home run king.",

  real_stats: {
    season: 1912, games: 149, at_bats: 577, hits: 200, doubles: 40,
    triples: 21, home_runs: 10, rbi: 130, runs: 116, stolen_bases: 40,
    batting_avg: ".347", obp: ".404", slg: ".541", ops: ".945",
    ops_plus: "~168", war: "~8.7",
    al_leader: "HR (10), RBI (130)",
    season_1911: ".334 BA, 11 HR (AL leader), 115 RBI, WS .375 — THE NICKNAME SERIES",
    season_1913: ".337 BA, 12 HR (AL leader), 117 RBI (AL leader), WS .450 / 7 RBI",
    season_1914: ".319 BA, 9 HR (AL leader), 89 RBI, 1914 AL MVP runner-up",
    four_year_stretch: "1911-14: Bill James — 'By far the best four-year stretch by a third baseman in baseball history'",
    career_avg: ".307", career_hits: 1838, career_hr: 96,
    career_3b: 103, career_2b: 315, career_sb: 235,
    career_rbi: 987, career_war: "~68", career_ops_plus: "~137",
    ws_career_ba: ".363",
    ws_1910: ".409 BA, 4 RBI", ws_1911: ".375 BA, 5 RBI, 2 HR (THE nickname)",
    ws_1913: ".450 BA, 1 HR, 7 RBI",
    ws_titles: 3, pennants: 6,
    al_hr_leader: "4 consecutive years (1911-14)",
    bat_weight: "46-52 oz (accounts vary)",
    hundred_k_infield: "Baker (3B), Collins (2B), Barry (SS), McInnis (1B)",
  },

  ilb_stats: {
    ovr: 11,     // Legend — The original home run king. 3× WS champion. Led AL in HR 4 straight years. .363 WS career BA. $100,000 Infield cornerstone. Bill James: 'by far the best four-year stretch by a third baseman in baseball history.' The farm boy from Trappe who hit HRs off Mathewson and Marquard and earned a nickname that will last forever.
    con: 5,      // .347 BA in 1912 → tier 5 (.330+). OPS+ ~168 → ≥130 bonus (capped at 5). .334 in 1911, .337 in 1913, .319 in 1914. .307 career BA. 1,838 career H. 200 H in 1912. Led league in multiple offensive categories. Rating: 5.
    pow: 2,      // 10 HR in 1912 → tier 1 (10-19). SLG .541 → ≥.500 bonus (+1) = 2. Led AL in HR 4 consecutive years (1911-14). 96 career HR. 103 career 3B. 40 2B in 1912. Used a 46-52 oz bat. 'The original home run king' — but the HR totals were 9-12 per year. The power was DOMINANT FOR THE ERA but modest by modern standards. Rating: 2.
    spd: 3,      // 40 SB in 1912 → tier 3 (31-50). 38 SB in 1911. 235 career SB. 20+ SB every year from 1909-1913. Despite descriptions of running 'like a soft-shell crab' and being bowlegged, the stolen base numbers are undeniable. Rating: 3.
    def: 2,      // Led 3B in putouts 7× during career. 'Best third baseman of the first 25 years of the 20th century.' Quick reflexes, strong arm, excellent at fielding bunts and hard-hit balls. 'Widely regarded as one of the game's best fielding third basemen.' But described as appearing 'clumsy' and 'bowlegged' — the eye test was mixed even as the stats excelled. Rating: 2.
    clu: 3,      // MAXIMUM. 3× WS champion (1910, 1911, 1913). WS career BA .363. 1910 WS: .409. 1911 WS: .375 + THE two home runs off Marquard and Mathewson in back-to-back games that earned his nickname. 1913 WS: .450, 7 RBI. 'Had there been a WS MVP he most likely would have won two of them.' 6× pennant winner. THE defining clutch performer at 3B in the dead-ball era. Rating: 3.
  },

  stat_justification: {
    con: ".347 BA in 1912 → tier 5 (.330+). OPS+ ~168 → ≥130 bonus (capped at 5). Peak years: .334 (1911), .347 (1912), .337 (1913). Career .307 BA over 13 seasons. 1,838 hits. 200 hits in 1912. The bat was heavy (46-52 oz), the swing was powerful, and the contact was elite for a power hitter. Rating: 5.",
    pow: "10 HR in 1912 → tier 1 (10-19). SLG .541 → ≥.500 bonus (+1) = 2. Led AL in HR 4 consecutive years (1911-14) — the only player to do so in the dead-ball era. 96 career HR. 130 RBI in 1912 (AL leader). 117 RBI in 1913 (AL leader). 103 career triples. The HR totals (9-12/year) seem modest, but Baker led the league EVERY year. He was the dead-ball era's power king. Rating: 2.",
    spd: "40 SB in 1912 → tier 3 (31-50). 38 SB in 1911. 235 career SB. He stole 20+ every year from 1909-1913. SABR notes that despite running 'like a soft-shell crab,' he was 'bowlegged and husky' but consistently productive on the basepaths. The numbers place him firmly in tier 3 regardless of the unflattering descriptions. Rating: 3.",
    def: "Led all 3B in putouts 7× during his career. 'Widely regarded as one of the game's best fielding third basemen.' Quick reflexes, strong arm, excellent at bunts and hard-hit balls. SABR: 'Baker also acquitted himself well on the base paths and in the field.' However: 'though, like Honus Wagner, he appeared clumsy in his movements' and was 'bowlegged and husky.' The statistical dominance at the position (7× putout leader) earns the rating despite the visual awkwardness. Rating: 2.",
    clu: "MAXIMUM. This is Baker's defining attribute. (1) 3× WS champion: 1910, 1911, 1913. (2) WS career BA .363 — extraordinary. (3) 1910 WS: .409 BA vs. Cubs. (4) 1911 WS: .375 BA + go-ahead HR off Marquard (Game 2) + game-tying 9th-inning HR off Christy Mathewson (Game 3). These two HRs off two HOF pitchers in back-to-back games earned him the nickname 'Home Run' Baker. (5) 1913 WS: .450 BA, 1 HR, 7 RBI in 5 games vs. Giants. (6) 'Had there been a WS MVP he most likely would have won two of them.' (7) Snodgrass spiked him in 1911 WS trying to intimidate; Baker held the ball, won the game. He was BETTER in October than in the regular season. Rating: 3.",
  },

  personality: {
    leadership_style: "THE QUIET ANCHOR. Baker wasn't flashy, vocal, or strategic — he was reliable, powerful, and present. The $100,000 Infield had Collins for brains, Barry for glue, and McInnis for consistency. Baker was the muscle — the cleanup hitter who drove in the runs. He led by production, not personality. When the team needed a big hit, Baker delivered. The leadership was in the bat.",
    temperament: "MILD-MANNERED AND STUBBORN. A peculiar combination: gentle, modest, easily wounded (Cobb's spiking led to a 'soft-fleshed darling' reputation) but deeply principled and unmovable (sat out all of 1915 rather than accept a contract he considered unfair). The Giants tried to intimidate him in the 1911 WS — he answered with two of the most famous home runs in baseball history. Quiet until pushed; then immovable.",
    work_ethic: "FARM-BOY STRENGTH. Baker grew up on a farm in Trappe, Maryland, and the farm remained his first priority his entire life. He used a 46-52 oz bat because his hands and forearms, strengthened by farm labor, could handle it. His great-grandson: 'The farm was actually his number one priority. Baseball was his sanctuary.' The work ethic came from the fields before it came from the diamond.",
    lifestyle: "TRAPPE, MARYLAND — BORN AND DIED. Baker was born in Trappe, MD, and died in Trappe, MD. He never wanted to leave the Eastern Shore. He sat out 1915 rather than play far from home. He retired after his first wife died (1920) because the farm and his children needed him. He returned to the Yankees only reluctantly (1921-22). After baseball: he farmed, managed semi-pro teams locally, and lived quietly. The most famous power hitter in baseball wanted only to go home.",
    era_adaptability: "COMPLEX. Baker's HR totals (9-12/year) led the league in the dead-ball era but wouldn't dent modern leaderboards. However: his .347 BA (1912), .541 SLG, and 130 RBI translate to any era. His 3B defense (7× putout leader) translates. His gap power (40 2B, 21 3B in 1912) would likely become 25-30 HR with modern equipment and parks. Baker in 2024 would be a .300-hitting 3B with 30 HR power — an All-Star, maybe not an MVP. The nickname wouldn't fit; the production would.",
    clubhouse_impact: "STABILIZING PRESENCE. Baker was the quiet heart of the $100,000 Infield — not the brain (Collins) or the motor (Barry), but the reliable run-producer everyone counted on. His absence in 1915 (contract holdout) coincided with the A's collapse from first to last place. His return to the Yankees (1921-22) immediately improved their lineup. When Baker was in the lineup, the team was better. +2 team stability, +1 RBI production.",
    dark_side: "The holdouts. Baker sat out all of 1915 in a contract dispute with Mack — playing semi-pro ball in Maryland instead. He sat out 1920 after his wife's death. These were principled decisions, but they cost his teams and shortened his career. His .307 career average and 1,838 hits might have been .315 and 2,200+ with two more full seasons. Also: his reputation for being 'soft' lingered even after the 1911 WS heroics. The Cobb spiking incident and the 'soft-fleshed darling' label followed him — even Baker's heroism carried an asterisk of perceived vulnerability.",
  },

  chemistry_traits: [
    { tag: "The $100,000 Infield", desc: "With Collins (2B), Barry (SS), and McInnis (1B), Baker forms the greatest infield of the dead-ball era. When all four are present, +2 DEF for entire infield, +1 team strategy, +1 RBI production. Three World Series championships." },
    { tag: "Home Run", desc: "The nickname earned by hitting HRs off Mathewson and Marquard in back-to-back WS games. In postseason, Baker gains +2 POW. The bigger the pitcher's reputation, the bigger the swing." },
    { tag: "Farm-Boy Strength", desc: "Raised on a Maryland farm, hands and forearms built by manual labor. Baker can swing a 46-52 oz bat that would be unusable for other players. +1 POW, +1 durability." },
    { tag: "The Farm Calls", desc: "Baker's farm in Trappe was his first priority. After any contract dispute or family crisis, 25% chance Baker sits out the following season. He did it in 1915 and 1920." },
    { tag: "Soft-Fleshed Darling", desc: "After Cobb spiked him in 1909, the Detroit press called Baker soft. Opponents believe they can intimidate him. When spiked or physically challenged: 70% chance Baker responds with elite performance (+2 all stats), 30% chance the reputation sticks (-1 confidence)." },
    { tag: "The Heavy Bat", desc: "Baker's bat weighed 46-52 ounces — nearly double a modern bat. The wrist snap generated enormous power. +1 POW inherent. But: fatigue accumulates faster (-1 STA in extra innings)." },
    { tag: "Mack's Cleanup Man", desc: "Under Connie Mack's management, Baker thrived. +1 all stats when managed by a patient, strategic manager. -1 when managed aggressively or when his principles are challenged." },
    { tag: "October's Original King", desc: "WS career BA .363. .409, .375, .450 across three championships. In elimination games or WS situations, Baker gains +2 CON and +1 POW. October belongs to Baker." },
  ],

  preferred_locations: [
    { location: "Third Base", affinity: "HIGH", note: "Led 3B in putouts 7×. 'Best third baseman of the first 25 years of the 20th century.' Never played another position." },
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".347 BA (1912). 46-52 oz bat. Left-handed power to all fields. The cleanup spot." },
    { location: "Shibe Park / Philadelphia", affinity: "HIGH", note: "Hit the first HR over the RF fence. $100,000 Infield. 3 WS titles. The dynasty years." },
    { location: "The World Series", affinity: "HIGH", note: ".363 career WS BA. .409, .375, .450 across three titles. 'Would have won 2 WS MVPs.'" },
    { location: "Trappe, Maryland", affinity: "HOME", note: "Born and died here. The farm was priority #1. Baseball was the sanctuary. He always came home." },
  ],

  momentum: {
    hot_triggers: [
      "World Series — .363 career WS BA. Baker's stats go UP in October. Every time.",
      "After being challenged — Cobb spiked him, Snodgrass spiked him, the press called him soft. He answered with HRs off Mathewson.",
      "With the $100,000 Infield around him — Baker thrived with elite teammates. +1 when the infield is complete.",
      "Heavy bat connecting — when the 46-52 oz bat meets the ball cleanly, the result is devastating.",
    ],
    cold_triggers: [
      "Away from home too long — Baker sat out entire seasons because he missed the farm. -1 morale when away from Trappe.",
      "Contract disputes — stubborn principles meet stubborn owners. 1915 was lost entirely.",
      "After wife's death — Baker retired in 1920 after his wife died. Family crises override baseball.",
      "The 'soft' reputation — when opponents successfully intimidate him (rare but possible), -2 confidence.",
    ],
    pressure_response: "LEGENDARY IN OCTOBER. Baker's WS career BA was .363 — HIGHER than his regular season averages. He hit .409 in the 1910 WS, .375 with the two nickname-earning HRs in 1911, and .450 with 7 RBI in the 1913 WS. The pressure didn't diminish him — it elevated him. The two home runs off Mathewson and Marquard — two of the greatest pitchers alive — in back-to-back games during the World Series is one of the most clutch performances in baseball history. In ILB: Baker is the player you bat cleanup in October. He will drive in the runs that win the championship.",
  },

  action_card_seeds: [
    { title: "Home Run off Mathewson", type: "Game Action", text: "Game 3 of the World Series. Bottom of the ninth. Your team trails 1-0. Christy Mathewson — the greatest pitcher alive — is on the mound. Your third baseman steps in with a 46-ounce bat. He swings. The ball sails over the fence. Game tied. Your team wins in the 11th. Tomorrow, the newspapers will give him a new name: 'Home Run' Baker. +5 CLU. +3 legacy. +2 POW. The nickname that lasts forever.", origin: "1911 WS Game 3: Baker hit a 9th-inning game-tying HR off Christy Mathewson. Combined with his Game 2 HR off Marquard, he earned the nickname 'Home Run' Baker." },
    { title: "Home Run off Marquard", type: "Game Action", text: "Game 2 of the World Series. Your third baseman faces Rube Marquard, the Giants' ace. He hits a go-ahead home run. The Athletics win 3-1. Tomorrow he'll do it again — off an even greater pitcher. But today, this is the first half of a legend. +3 CLU. +2 POW. The nickname is being born.", origin: "1911 WS Game 2: Baker hit a go-ahead 2-run HR off HOF pitcher Rube Marquard. The Athletics won 3-1." },
    { title: "Four-Fifty in the Fall Classic", type: "Game Action", text: "Your third baseman bats .450 in the World Series. A home run. Seven RBI in five games. The Athletics defeat the Giants for the second time in three years. He is the best hitter in October, and everyone knows it. +3 CON. +3 CLU. +2 team championship.", origin: "1913 WS: Baker hit .450 with 1 HR and 7 RBI in 5 games as the A's beat the Giants for their 3rd title in 4 years." },
    { title: "Cobb's Spikes", type: "Drama", text: "The most dangerous man in baseball slides into third base. His spikes catch your third baseman's forearm, tearing the skin. Your player wraps the wound and stays in the game. The Detroit press calls him a 'soft-fleshed darling.' Two years later, he'll hit home runs off Mathewson and Marquard in the World Series. He remembers what they called him. +2 motivation. +1 CLU. The soft-fleshed darling becomes the Home Run king.", origin: "1909: Ty Cobb spiked Baker sliding into 3B, lacerating his arm. The Detroit press called Baker a 'soft-fleshed darling.' Baker answered in the 1911 WS." },
    { title: "The $100,000 Infield", type: "Drama", text: "Your third baseman, your second baseman, your shortstop, and your first baseman are valued collectively at $100,000 — an unthinkable sum. They win three World Series in four years. Bill James will call them the greatest infield ever assembled. Then the owner sells them all because he can't afford to keep them. +3 team DEF while together. -5 when separated. Dynasty built, dynasty destroyed.", origin: "Baker, Collins, Barry, McInnis — the A's $100,000 Infield. Bill James rated the 1914 edition as the greatest infield of all time. Mack broke them up after 1914." },
    { title: "The Year He Didn't Play", type: "Drama", text: "Your third baseman refuses to play. The contract is unfair. The owner won't negotiate. Your player goes home to his farm in Trappe, Maryland, and plays semi-pro baseball for $5 a week. He is the best third baseman in the American League and he is playing for a town team on the Eastern Shore. The Athletics go from first to last. Principle has a cost. -1 full season. +2 integrity. The farm was always first.", origin: "1915: Baker sat out the entire season in a contract dispute with Connie Mack, playing semi-pro ball in Maryland. The A's went from first to last place." },
    { title: "Snodgrass's Spikes, Baker's Ball", type: "Game Action", text: "The Giants' center fielder slides into third in the World Series, driving his spikes into your third baseman's arm. Your player bleeds. Your player holds the ball. Your player gets the out. They tried to intimidate the 'soft-fleshed darling.' The darling held on. +2 DEF. +2 toughness. +1 CLU. The intimidation failed.", origin: "1911 WS: Fred Snodgrass spiked Baker while sliding into 3B, drawing blood. Baker held onto the ball for the out. The Giants' intimidation strategy backfired spectacularly." },
    { title: "The Farm Was Always First", type: "Drama", text: "Your third baseman's wife dies. He retires from baseball. He goes home to Trappe, Maryland, to raise his children and work the farm. He is 34 years old. His career batting average is .307. He could play five more years. He chooses the farm. Because the farm was always first. -2 seasons. +5 humanity. Baseball was the sanctuary; the farm was home.", origin: "1920: Baker retired after his first wife's death to care for his children and farm. He returned reluctantly for the 1921-22 Yankees." },
  ],

  art_direction: {
    face: "STURDY, HONEST, POWERFUL. 5'11\" 173 lbs — compact and muscular, built by farm labor before baseball. Bowlegged, husky, strong forearms and thick wrists from years of working Maryland farmland. The face should be HONEST and OPEN — a farm boy's face, weathered by sun and wind, not city-sharp like Collins or gentle like Jackson. Square jaw, steady eyes, the look of a man who doesn't talk much but hits very hard. Not handsome in the refined way — handsome in the way of a man who does physical work and is good at it. The expression should be CALM DETERMINATION — the quiet before the swing.",
    attire: "Philadelphia Athletics uniform circa 1912 — white wool jersey with the iconic Old English 'A' on the left chest, elephant insignia, baggy flannel pants, flat cap. THE POSE: the swing — left-handed, the massive 46-52 oz bat sweeping through the zone, the farm-built wrists snapping, the ball leaving for the October sky. The bat should look HEAVY — thicker than normal, darker. The body compact and powerful, every ounce of farm-boy muscle engaged. Or: the defensive crouch at 3B — low, wide, glove ready, the man who held the ball while Snodgrass spiked him. Or: standing in the batter's box, bat on shoulder, looking out with quiet confidence — the cleanup hitter waiting for his pitch. No number.",
    mood: "SOLID AND GROUNDED. Baker's card should feel like EARTH — the rich soil of a Maryland farm, the weight of a heavy bat, the gravity of a man who always came home. Where Jackson is sunset and Collins is amber intellect, Baker is RICH EARTH — brown, solid, real. The mood should suggest permanence, reliability, the deep roots of a man born and buried in the same small town.",
    style: "Sepia-toned with DEEP, RICH EARTH BROWN undertones — the color of Maryland farmland, plowed fields, tobacco barns, the dark stain of a bat rubbed with dirt and resin. Warmer than Speaker's silver, darker than Collins's amber. The Baker palette is SOIL AND STRENGTH — deep browns, warm earth, the ground itself. The most GROUNDED palette in the Muggers collection.",
    reference: "Think the 1911 World Series HR off Mathewson — Baker swinging in the 9th inning, the ball rising, the crowd erupting, the nickname being born. Or: Baker standing at third base in Shibe Park, the $100,000 Infield arranged behind him, the dynasty at its peak. Or: Baker on his farm in Trappe, bat leaning against the barn, looking out over the fields — the man who could have been even greater but chose to go home. The card should capture the collision of power and humility — the home run king who wanted only to farm.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "10-19 HR", value: 1 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "31-50 SB", value: 3 }] },
  defense: { metric: "Positional excellence", note: "Led 3B putouts 7×. 'Best 3B of first 25 years of 20th century.'" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "WS BA + championships + signature moments", note: ".363 WS BA, 3× champ, HR off Mathewson" },
};

const C = {
  parchment: "#efe6d4", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", earth: "#8b6f47",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e0d8c6", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function HomeRunBakerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #221a10 0%, #171210 50%, #221a10 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.silver, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.earth}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.earth, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.earth}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.medBrown }}>
              <img src={PLAYER_IMG} alt="Home Run Baker" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.earth}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>HOF 1955</span>
                <span style={{ background: `${C.earth}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>LEGEND</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1.1 }}>Frank "Home Run" Baker</div>
              <div style={{ fontSize: 11, color: C.earth, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>The Original Home Run King</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>The Farm Was Always First</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.earth}15`, border: `1px solid ${C.earth}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.earth, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🏆 3× WS CHAMPION • .363 WS BA • HR OFF MATHEWSON + MARQUARD • 4× AL HR LEADER</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "RBI", val: d.real_stats.rbi },{ label: "HR", val: d.real_stats.home_runs },{ label: "SB", val: d.real_stats.stolen_bases }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1912 — AL LEADER: HR (10), RBI (130) / .347 BA / 40 2B / 21 3B / 40 SB</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "WS BA", val: ".363" },{ label: "'10 WS", val: ".409" },{ label: "'11 WS", val: ".375" },{ label: "'13 WS", val: ".450" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.earth, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>46-52 OZ BAT • BILL JAMES: BEST 4-YEAR STRETCH BY A 3B EVER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📖 HOF 1955", "🏆 3× WS Champion", "💰 $100,000 Infield", "💪 4× AL HR Leader", "🌾 Trappe, MD — Born & Died", "🦇 46-52 oz Bat", "⚾ 6× AL Pennant"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.earth}15`, border: `1px solid ${C.earth}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>Frank "Home Run" Baker</div>
              <div style={{ fontSize: 10, color: C.earth, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "HOME" ? `${C.earth}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "HOME" ? C.earth : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Baker's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
