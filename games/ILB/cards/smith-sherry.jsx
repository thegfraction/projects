// /cards/players/sherry-smith.jsx
import { useState } from "react";

const SMITH_DATA = {
  name: "Sherry Smith",
  nickname: "Mansfield's Famous Southpaw",
  year: 1916,
  team: "Brooklyn Robins",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "SP",
  bats: "R",
  throws: "L",
  height: '6\'1"',
  weight: "170 lbs",
  born: "February 18, 1891 — Monticello, GA",
  died: "September 12, 1949 — Augusta, GA (age 58)",
  hof: "Not inducted. Never received a vote. But his 0.89 career World Series ERA is 5th best in MLB history — ahead of Sandy Koufax and Christy Mathewson. Georgia Sports HOF 1980.",

  real_stats: {
    season: 1916, games: 36, wins: 14, losses: 10, era: "2.34",
    innings: "228.2", strikeouts: 68, walks: 55, complete_games: 17,
    shutouts: 2, whip: "1.14", war: 3.4,
    career_wins: 114, career_losses: 118, career_era: "3.32",
    career_strikeouts: 428, career_war: "~15",
    ws_era: "0.89", ws_ip: "30.1", ws_record: "1-2",
    ws_era_rank: "5th all-time (ahead of Koufax & Mathewson)",
    best_era_season: "1.85 (1920)",
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT CONVERSION — 1916 SEASON
  //
  // STF: 2.34 ERA → tier 3 (2.00-2.49). K/9 = 68K/228.2IP × 9 = 2.68. No K bonus. STF = 3.
  // CTL: BB/9 = 55BB/228.2IP × 9 = 2.16 → tier 2 (2.0-2.49). WHIP 1.14, no bonus. CTL = 2.
  // STA: 228.2 IP → tier 2 (200-249). 17 CG. STA = 2.
  // DEF: Excellent fielding pitcher. Led NL in pickoffs 1915. Errorless seasons 1923, 1926. DEF = 1.
  // CLU: 0.89 WS ERA (5th all-time). 14-inning duel with Babe Ruth. 3 CG in WS with 3 ER total. CLU = 3 (MAX).
  // OVR: STF×2(6) + CTL×1.5(3) + STA×1(2) + DEF×0.5(0.5) = 11.5 → normalized ~6
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,      // Solid Starter — modest regular season numbers elevated by historically elite postseason performance. The anti-ace: nothing flashy, everything effective.
    stf: 3,      // 2.34 ERA in 1916 (tier 3). 1.85 in 1920. Low K rate (2.68 K/9). Smith wasn't overpowering — he was crafty, durable, and unhittable when it mattered most.
    ctl: 2,      // BB/9 2.16 in 1916 (tier 2). Led AL in lowest BB/9 (1.82) in 1925. Good control, improving with age.
    sta: 2,      // 228.2 IP in 1916 (tier 2). But 247.2 IP in 1924 with 20 CG at age 33. "Strong as a horse, tireless as a Missouri mule."
    def: 1,      // Led NL in pickoffs 1915. Errorless seasons 1923 and 1926. Excellent defensive pitcher — rare for the era.
    clu: 3,      // MAXIMUM. 0.89 WS ERA in 30.1 IP — 5th best in MLB HISTORY. Ahead of Koufax (0.95) and Mathewson (0.97). Dueled Babe Ruth for 14 innings. Won Game 3 of 1920 WS. Lost 1-0 in Game 6 pitching brilliantly. Hard-luck postseason legend.
  },

  stat_justification: {
    stf: "2.34 ERA in 1916 — good for the Deadball Era but not dominant. Career-best 1.85 ERA in 1920. Career 3.32 ERA across 14 seasons — slightly above league average. K/9 of 2.68 in 1916 — extremely low even for the era. Smith was not a power pitcher. He was described as crafty and deceptive, relying on movement and location. Rating of 3 — solid, not spectacular.",
    ctl: "BB/9 of 2.16 in 1916. Led AL in lowest BB/9 (1.82) in 1925 at age 34 — his control improved with age. Career WHIP around 1.30. Good command without being elite. Rating of 2.",
    sta: "228.2 IP in 1916 (tier 2). In 1924, at age 33, he threw 247.2 IP with 20 complete games — more CG than wins (12). 'Strong as a horse and tireless as a Missouri mule.' He pitched semi-pro and managed minor leagues until age 41. Rating of 2.",
    def: "Led NL in pickoff moves in 1915 — his first full season. Completed 1923 and 1926 seasons without committing an error. Excellent fielding pitcher, rare for the era when pitchers were often poor fielders. Rating of 1.",
    clu: "This is the defining stat. 0.89 ERA in 30.1 World Series innings — the 5th-best career WS ERA in MLB history. He is ahead of Sandy Koufax (0.95), Christy Mathewson (0.97), and Eddie Plank (1.32). In 1916, he dueled Babe Ruth for 14 innings, losing 2-1 — one of the longest and greatest WS games ever played. In 1920, he threw a 3-hit CG win (Game 3, 2-1) and then lost 1-0 in Game 6 pitching brilliantly against Duster Mails. His 1-2 WS record is the most misleading stat in baseball history — he gave up 3 earned runs in 30 innings and lost twice. Rating of 3 — MAXIMUM. The quietest October legend in the sport.",
  },

  personality: {
    leadership_style: "Silent professional. Smith never complained about becoming a reliever late in his Brooklyn tenure. Owner Ebbets said he 'was at all times willing to give his best services in any direction, no matter what was asked of him. That class of man is a credit to the sport and a credit to himself.' Smith led by selflessness — the antithesis of the ego-driven star.",
    temperament: "Uncomplaining, humble, Georgia gentleman. Smith grew up playing semi-pro ball in tiny Georgia towns — Elberton, Madison, Mansfield, Newborn. He worked his way through 10 professional teams before reaching Brooklyn. Nothing was given to him. He never demanded anything. When traded to Cleveland at 31, he gave them 5 more solid years without a word of protest.",
    work_ethic: "Indefatigable. 'Strong as a horse and tireless as a Missouri mule.' In 1924, at age 33, Smith completed 20 games while winning only 12 — he finished games he was losing because that's what you did. He pitched 14 innings against Babe Ruth in the World Series without being relieved. He pitched until age 36 in the majors and 41 in the minors. He simply would not stop.",
    lifestyle: "Small-town Georgia through and through. Born in Monticello, a state historical marker in Mansfield reads 'MANSFIELD'S FAMOUS SOUTHPAW.' Served in the U.S. Army during WWI, deployed to France. His greatest thrill: beating Walter Johnson on the day his son was born. After baseball, he coached the Macon Peaches. Died in Augusta, Georgia at 58 — too young for a man that durable.",
    era_adaptability: "MODERATE. Smith's regular-season numbers (114-118, 3.32 ERA) are unspectacular. His K/9 was dismal. But his postseason performance — 0.89 ERA, ahead of Koufax — suggests a pitcher who elevates beyond what stats can measure. In modern baseball, Smith would be the long reliever or swing man who becomes a postseason hero.",
    clubhouse_impact: "SELFLESS. Smith was the teammate nobody noticed until it mattered. He never demanded starts, never complained about bullpen duty, never sought credit. He was the quiet Georgian who pitched 14 innings against Ruth and then went back to his hotel room without a headline. In ILB: Smith provides +1 team harmony. Nobody resents Sherry Smith.",
    dark_side: "The cruelty of the record book. Smith's career record is 114-118 — sub-.500. His WS record is 1-2. On paper, he looks like a journeyman who lost more than he won. But his 0.89 WS ERA tells the real story: he was one of the greatest postseason pitchers who ever lived, undone by run support so anemic it bordered on absurd. He gave up 3 earned runs in 30 WS innings and won ONE game. In ILB: Smith carries 'The Invisible Legend' trait — his true value is hidden from all but the most careful observers.",
  },

  chemistry_traits: [
    { tag: "Point-Eight-Nine", desc: "0.89 career WS ERA — 5th best in MLB history. When the postseason begins, Smith's STF increases from 3 to 5. He becomes unhittable on the biggest stage." },
    { tag: "Fourteen Innings with Ruth", desc: "Smith dueled Babe Ruth for 14 innings in the 1916 WS. In any extra-inning game, Smith gains +1 STA and +1 STF per inning beyond the 9th. He does not tire." },
    { tag: "Georgia Gentleman", desc: "Smith never complained, never demanded, never quit. +1 team harmony. No morale penalties from losing. He absorbs defeat with grace and comes back stronger." },
    { tag: "The Invisible Legend", desc: "Smith's 114-118 career record hides a 0.89 WS ERA. In ILB, opponents underestimate him — his apparent OVR of 6 masks his true postseason OVR of 9." },
    { tag: "Missouri Mule", desc: "'Strong as a horse, tireless as a Missouri mule.' Smith can pitch on short rest with no penalty. He completed 20 games in 1924 while winning only 12." },
    { tag: "Pickoff Artist", desc: "Led NL in pickoffs in 1915. Smith's move to first is elite — opposing baserunners have -1 to stolen base attempts when he's on the mound." },
    { tag: "War Veteran", desc: "Served in the U.S. Army during WWI, deployed to France. After returning, his 1920 season (1.85 ERA) was his best. Adversity strengthens him. +1 STF after any missed time." },
    { tag: "Papa's Greatest Day", desc: "Beat Walter Johnson on the day his son was born. In any game with personal significance, Smith gains +2 to all stats. The man rises to the occasion." },
  ],

  preferred_locations: [
    { location: "Georgia / Small Town", affinity: "HIGH", note: "Monticello, Mansfield, Madison, Newborn, Elberton. Smith's world was the small towns of Georgia." },
    { location: "Ebbets Field", affinity: "HIGH", note: "His greatest success came in Brooklyn. Two pennants, two WS appearances, one silent film credit." },
    { location: "World Series", affinity: "MAXIMUM", note: "0.89 ERA. Ahead of Koufax. Ahead of Mathewson. The greatest postseason pitcher nobody remembers." },
    { location: "Military Camp / France", affinity: "MEDIUM", note: "Served in WWI. Came back and posted a 1.85 ERA. The war made him tougher." },
    { location: "Bullpen", affinity: "MEDIUM", note: "Smith willingly moved to relief duty without complaint. 'That class of man is a credit to the sport.'" },
    { location: "Minor League Towns", affinity: "MEDIUM", note: "Managed the Cedartown Braves, Cedartown Sea Cows, Macon Peaches. Smith never left baseball." },
  ],

  momentum: {
    hot_triggers: [
      "October — Smith's 0.89 WS ERA speaks for itself. When the stakes rise, so does he.",
      "Dueling elite pitchers — facing Ruth, Mails, Johnson. Smith elevated against the best arms in baseball.",
      "Run support — on the rare occasions Brooklyn scored, Smith was brilliant. He just needed 2 runs.",
      "After adversity — returning from WWI, his 1920 was his best season. Hardship focused him.",
    ],
    cold_triggers: [
      "Lack of run support — Smith's teams scored almost nothing when he pitched. His WS losses were 2-1 and 1-0.",
      "Late career aging — his final season (1927) was 1-4 with a 5.45 ERA. The body gave out.",
      "Anonymity — Smith never received recognition, which meant no advocacy for better situations or teams.",
      "Bad teams — his time in Pittsburgh (4-11) showed that Smith needed a competent team around him.",
    ],
    pressure_response: "SILENTLY MAGNIFICENT. Sherry Smith is the quiet version of October dominance. He doesn't throw 19 consecutive wins like Marquard or burn out like Wood. He just takes the ball, pitches 14 innings against the greatest player alive, gives up 1 run, and loses. Then he comes back four years later and does it again. His WS ERA of 0.89 — better than Koufax, better than Mathewson — is the most overlooked statistic in baseball history. In ILB, Smith is the sleeper card. He looks like a 6. He plays like a 9 in October. The opponent who dismisses him has already lost.",
  },

  action_card_seeds: [
    {
      title: "Fourteen Innings with the Babe",
      type: "Game Action",
      text: "Game 2 of the World Series. Your left-hander and their left-hander — a 21-year-old named Babe Ruth — both refuse to leave the mound. Nine innings pass. Ten. Eleven. Twelve. Thirteen. In the 14th, they finally score. You lose 2-1. Your pitcher threw 14 innings of one-run ball in the World Series and lost. It is one of the greatest games ever played.",
      origin: "1916 WS Game 2: Smith vs Ruth, 14 innings. Both went the distance. Ruth won 2-1. It remained one of the longest WS games for decades. Smith's line: 13.1 IP, 7 H, 2 R, 1 ER.",
    },
    {
      title: "Point-Eight-Nine",
      type: "Action",
      text: "Over 30 World Series innings, your pitcher has allowed 3 earned runs. His WS ERA is 0.89 — the 5th best in the history of the sport. He is ahead of Sandy Koufax. He is ahead of Christy Mathewson. His career record is 114-118. Nobody will ever know his name.",
      origin: "Smith's 0.89 career WS ERA: 30.1 IP, 3 ER. Ranks 5th all-time, ahead of Koufax (0.95) and Mathewson (0.97). Career record: 114-118.",
    },
    {
      title: "One-Nothing, Again",
      type: "Game Action",
      text: "Game 6 of the World Series. Your left-hander pitches 8 innings, allows 7 hits and 1 earned run. His team manages 3 hits. He loses 1-0. A sportswriter calls it 'the best pitching by any Brooklyn pitcher in the Series.' His WS record falls to 1-2. The numbers will never tell the truth.",
      origin: "1920 WS Game 6: Smith lost 1-0 to Duster Mails. 8 IP, 7 H, 1 ER. 'He delivered the best brand of pitching of all of the Brooklyn pitchers during the series.'",
    },
    {
      title: "More Complete Games Than Wins",
      type: "Action",
      text: "Your 33-year-old workhorse starts 27 games and completes 20 of them. He wins only 12. He finishes games he is losing because that is what a pitcher does. He throws 247 innings and faces 1,050 batters. 'Strong as a horse and tireless as a Missouri mule.'",
      origin: "Smith's 1924 Cleveland season: 27 GS, 20 CG, 12-14, 247.2 IP. He completed more games than he won — a testament to durability and duty.",
    },
    {
      title: "Papa's Greatest Day",
      type: "Drama",
      text: "Your pitcher beats Walter Johnson in Washington on the same day his son is born back home. He later says it was the greatest thrill of his 15 years in baseball. Not the World Series. Not the 14-inning duel with Ruth. The day he became a father and beat the best pitcher alive.",
      origin: "August 9, 1925: Smith defeated the Senators on the day his son was born. He called it his biggest thrill in 15 years of professional baseball.",
    },
    {
      title: "A Credit to the Sport",
      type: "Drama",
      text: "Your pitcher is claimed off waivers after 7 years with the team. The owner writes: 'He has been a man who played to win, and was at all times willing to give his best services. That class of man is a credit to the sport and a credit to himself.' It is the greatest compliment a journeyman can receive.",
      origin: "Charles Ebbets's farewell when Smith was claimed by Cleveland in 1922. Ebbets was genuinely moved by Smith's selflessness.",
    },
    {
      title: "Mansfield's Famous Southpaw",
      type: "Action",
      text: "Decades after your pitcher's death, a state historical marker is erected in his tiny hometown. It reads: MANSFIELD'S FAMOUS SOUTHPAW. The marker stands on a quiet Georgia road. Most people who pass it have no idea that the man it honors had a better World Series ERA than Sandy Koufax.",
      origin: "A Georgia historical marker was erected in Mansfield in 1994 honoring Smith. He was posthumously inducted into the Georgia Sports HOF in 1980.",
    },
    {
      title: "Ten Teams Before Brooklyn",
      type: "Action",
      text: "Before reaching the major leagues, your pitcher played for semi-pro teams in Elberton, Madison, Mansfield, Newborn, Greenwood, Hot Springs, Grand Rapids, Columbus, Pittsburgh, and finally Brooklyn. Ten stops on the way up. Nothing was given to him. Everything was earned.",
      origin: "Smith played for at least 10 professional and semi-pro teams before establishing himself with the Brooklyn Robins in 1915.",
    },
  ],

  art_direction: {
    face: "Lean 6'1\" 170 lbs — tall and wiry, the classic southpaw build. Weathered face with sun-lines, the complexion of a man who grew up in rural Georgia. Calm, serious eyes with no bravado. The look of a man who has pitched 14 innings against Babe Ruth and doesn't think it's worth bragging about.",
    attire: "Brooklyn Robins 1916 road grays — the pennant year. Classic Deadball Era pitching pose: tall lefty in mid-delivery, the deceptive arm angle that kept hitters off balance despite modest velocity. Or: standing at ease on the mound, ball behind his back, studying the batter with the patience of a man from small-town Georgia.",
    mood: "Quiet excellence. This card should radiate the serenity of a man who knows his own worth even if no one else does. No drama, no tragedy, no spectacle — just a Georgian southpaw who pitched better than Koufax in October and went home without a headline. The most peaceful card in the Muggers set.",
    style: "Sepia-toned with warm amber-orange undertones — Georgia clay, peach light, Southern autumn. The quietest palette in the set: less gold, more earth. The card should feel handmade, like a photograph found in a Georgia attic, the kind of thing a grandson finds and doesn't realize what he's holding.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, Kauff is a firecracker, Marquard is a spotlight, Vaughn is a cathedral bell, and Gardner is a hearthfire, then Sherry Smith is a lantern in a window. Small, steady, warm, visible only to those who are looking. The ILB Smith card should feel like the deepest cut on a great album — the track nobody talks about that turns out to be the best one.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: {
    metric: "ERA (peak season)",
    tiers: [
      { range: "<1.50", value: 5 },
      { range: "1.50-1.99", value: 4 },
      { range: "2.00-2.49", value: 3 },
      { range: "2.50-2.99", value: 2 },
      { range: "3.00-3.49", value: 1 },
      { range: "3.50+", value: 0 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 (peak season)",
    tiers: [
      { range: "<1.0 BB/9", value: 5 },
      { range: "1.0-1.49", value: 4 },
      { range: "1.5-1.99", value: 3 },
      { range: "2.0-2.49", value: 2 },
      { range: "2.5-2.99", value: 1 },
      { range: "3.0+", value: 0 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched (peak season)",
    tiers: [
      { range: "<150 IP", value: 0 },
      { range: "150-199", value: 1 },
      { range: "200-249", value: 2 },
      { range: "250-299", value: 3 },
      { range: "300-349", value: 4 },
      { range: "350+", value: 5 },
    ],
  },
  defense: { metric: "Same as position players" },
  overall: {
    formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13",
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
    metric: "Postseason ERA + signature moments",
    tiers: [
      { range: "PS ERA > 4.00", value: 0 },
      { range: "PS ERA 2.00-4.00", value: 1 },
      { range: "PS ERA < 2.00", value: 2 },
    ],
    bonus: "WS clincher / perfecto → +1 (cap 3)",
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
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function SherrySmithCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = SMITH_DATA;
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>

      {/* Card Container */}
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* Portrait Placeholder */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.sepia}40, ${C.darkBrown}30)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🔥</div>
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

            {/* Pitcher Stat Bars */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            {/* Career Stats Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
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
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 14 SEASONS (PITCHER + OUTFIELDER)</div>

            {/* Awards Row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[
                "🏆 3× WS Champ",
                "🔥 34-5 in 1912",
                "👑 Pitching Triple Crown",
                "⚡ 16-Game Win Streak",
                "📜 No-Hitter (1911)",
                "🎖️ Beat Johnson 1-0",
                "🏟️ Fenway Park Opener",
                "🎓 Yale Coach 20 Yrs",
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
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia,
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
                      These events, derived from Smith's real life, become universal cards playable in any game.
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
                  <Section title="Smith's Derivation">
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
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export Preview */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
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
