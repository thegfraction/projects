import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}speaker-tris.png`;

const PLAYER_DATA = {
  name: "Tris Speaker",
  nickname: "The Gray Eagle",
  year: 1912,
  team: "Boston Red Sox",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "CF",
  bats: "L",
  throws: "L",
  height: '5\'11½"',
  weight: "193 lbs",
  born: "April 4, 1888 — Hubbard, TX",
  died: "December 8, 1958 — Lake Whitney, TX (age 70)",
  hof: "HOF 1937. .345 career BA (9th all-time). 792 2B (ALL-TIME MLB RECORD). 3,514 H (5th all-time). 449 career OF assists (all-time record). 139 OF double plays (all-time record). 130.6 fWAR (7th all-time). 3× WS champion. 1912 AL MVP. 'Where triples go to die.' The greatest defensive outfielder who ever lived, and one of the 10 best hitters too.",

  real_stats: {
    season: 1912, games: 153, at_bats: 580, hits: 222, doubles: 53,
    triples: 12, home_runs: 10, rbi: 90, runs: 136, stolen_bases: 52,
    batting_avg: ".383", obp: ".464", slg: ".567", ops: "1.031",
    ops_plus: 190, wrc_plus: 190, war: "10.6",
    al_leader: "2B (53), HR (10), OBP (.464)",
    hitting_streaks: "Three 20+ game streaks (MLB record)",
    first_50_50: "First player: 50 2B + 50 SB in one season",
    career_avg: ".345", career_hits: 3514, career_doubles: 792,
    career_hr: 117, career_sb: 436, career_war: "130.6",
    career_k: 220, career_ops_plus: 157,
    career_of_assists: "449 (ALL-TIME RECORD)",
    career_of_dp: "139 (ALL-TIME RECORD)",
    career_of_putouts: "6,592 (record until Willie Mays)",
    ws_titles: "3 (1912, 1915, 1920)",
    al_mvp: "1912 (Chalmers Award)",
    batting_titles: "1 (1916, .386 — broke Cobb's 9-year streak)",
    seasons_100_games: "19 consecutive",
  },

  ilb_stats: {
    ovr: 13,     // Mythic — The greatest defensive outfielder in baseball history AND a top-10 all-time hitter. .345 career BA (9th). 792 2B (all-time record). 3,514 H (5th). 449 OF assists (all-time). 139 OF DP (all-time). 130.6 fWAR (7th all-time). 3× WS champ. AL MVP. The only player with perfect 5/3/3/3 offensive+defensive+clutch balance at an outfield position. The Gray Eagle is the complete package.
    con: 5,      // .383 BA in 1912 → tier 5 (.330+). OPS+ 190 → ≥130 bonus (capped at 5). .345 career BA, 9th all-time. 792 career doubles (ALL-TIME MLB RECORD). 3,514 career hits (5th all-time). 220 career strikeouts in 22 seasons — absurd contact rate. 200+ H seasons 4×. He batted over .350 in 9 of 11 years with Cleveland. The hitting was transcendent. Rating: 5.
    pow: 2,      // 10 HR in 1912 → tier 1 (10-19). SLG .567 → ≥.500 bonus (+1) = 2. 117 career HR. Dead-ball power expressed through 792 doubles and 222 triples rather than HR. The SLG was elite for the era (.567 was his career high). Rating: 2.
    spd: 3,      // 52 SB in 1912 → tier 3 (31-50, and 52 exceeds, so maximum). 436 career SB. First player with 50 2B + 50 SB in one season (not matched until Craig Biggio, 1998). He was fast enough to play shallow CF and still catch everything hit over his head. Rating: 3.
    def: 3,      // MAXIMUM. THE GREATEST DEFENSIVE OUTFIELDER IN BASEBALL HISTORY. 449 career assists (all-time OF record). 139 career OF double plays (all-time record). 6,592 career putouts (OF record until Willie Mays). Led AL CF in putouts 5×, DP 4×. Played so shallow he was a fifth infielder. Executed UNASSISTED double plays from CF (twice in 1918). 'Where triples go to die.' Cy Young personally trained him to read fly balls. Smoky Joe Wood: 'At the crack of the bat he'd be off with his back to the infield, and then he'd turn and glance over his shoulder at the last minute and catch the ball.' Rating: 3.
    clu: 3,      // MAXIMUM. 3× WS champion (1912 Red Sox, 1915 Red Sox, 1920 Cleveland as player-manager). 1912 AL MVP. In the deciding Game 8 of the 1912 WS, after Snodgrass's Muff, Speaker singled to tie the game — Red Sox won in the 10th. Led Cleveland to the 1920 championship as player-manager. The big moments came to him and he delivered. Rating: 3.
  },

  stat_justification: {
    con: ".383 BA in 1912 → tier 5 (.330+). OPS+ 190 → ≥130 bonus (already capped at 5). Career: .345 BA (9th all-time). 792 doubles (ALL-TIME MLB RECORD — to match it, a player would need 40 2B per season for 20 straight years). 3,514 hits (5th all-time). Only 220 career strikeouts in 22 seasons. Four 200+ hit seasons. Batted over .350 in 9 of 11 years with Cleveland. He held his bat low, 'like the lazy twitching of a cat's tail,' and sprayed line drives to all fields. The contact was otherworldly. Rating: 5.",
    pow: "10 HR in 1912 → tier 1 (10-19). Led the AL in HR that year. SLG .567 → ≥.500 bonus (+1) = 2. Career 117 HR, .500 SLG peak. In the dead-ball era, Speaker's power was expressed through 792 doubles and 222 triples — gap-to-gap authority. He wasn't a home run hitter, but the extra-base production was among the best of any era. Rating: 2.",
    spd: "52 SB in 1912 → tier 3 (31-50; 52 exceeds the tier but 3 is the maximum for position players). 436 career SB. He was the first player with 50 doubles AND 50 stolen bases in one season (1912) — not matched until Craig Biggio in 1998. He played shallow CF and still caught balls hit over his head — the speed was extraordinary. Rating: 3.",
    def: "MAXIMUM. The case: (1) 449 career OF assists — ALL-TIME RECORD. (2) 139 career OF double plays — ALL-TIME RECORD. (3) 6,592 career OF putouts — record until Willie Mays. (4) Led AL CF in putouts 5×, double plays 4×. (5) Twice executed UNASSISTED double plays from center field (1918) — catching a line drive and beating the runner back to second base. (6) Played so shallow he was effectively a fifth infielder. (7) 'Where triples go to die.' (8) Cy Young personally coached his fly ball reads. (9) Smoky Joe Wood's testimony. There is no serious argument that anyone was a better defensive outfielder. Rating: 3.",
    clu: "MAXIMUM. 3× WS champion: 1912 (Red Sox, as AL MVP), 1915 (Red Sox), 1920 (Cleveland, as player-manager). In the deciding Game 8 of the 1912 WS, after Fred Snodgrass's famous Muff and a Speaker pop foul that wasn't caught, Speaker singled to tie the game. The Red Sox won in the bottom of the 10th. Led Cleveland to the 1920 championship — the first in franchise history — as player-manager. He performed in the biggest moments across two decades. Rating: 3.",
  },

  personality: {
    leadership_style: "THE PLAYER-MANAGER. Speaker didn't just play — he managed. He became player-manager of the Cleveland Indians in 1919 and led them to the 1920 World Series title. He was a cerebral, strategic leader who positioned defenders, called pitches, and played shallow CF while simultaneously running the clubhouse. The Gray Eagle saw the entire field — both literally and figuratively.",
    temperament: "QUIET INTENSITY. Not volcanic like McGraw or Cobb. Speaker was focused, methodical, and deeply competitive. He had the 'indomitable will' that attracted scouts and the measured calm that earned the nickname 'Gray Eagle.' He competed with Cobb for batting titles — broke Cobb's 9-year AL streak in 1916 — but did so without Cobb's theatrics. They remained friends for life.",
    work_ethic: "RELENTLESS PREPARATION. Cy Young personally hit him fly balls to train his reads. He studied hitters to know where to position himself in the shallowest CF in baseball. He practiced throwing from the outfield until he could execute unassisted double plays from center field. The shallow positioning wasn't reckless — it was the product of obsessive preparation.",
    lifestyle: "Texas rancher. Hubbard, TX to Lake Whitney, TX — he came from Texas and returned to Texas. His mother opposed his baseball career, saying it 'reminded her of slavery.' He eventually became the highest-paid player in baseball ($40,000/year with Cleveland, ~$1.16M today). After baseball: chaired Cleveland's boxing commission, worked in business, returned as a goodwill ambassador for the Indians in 1947, where he mentored Larry Doby.",
    era_adaptability: "TIMELESS. Speaker's defensive positioning — the shallow CF who plays like a fifth infielder — is essentially what modern defensive analytics recommend for elite CFs. His contact rate (220 K in 22 seasons) would be supernatural in any era. The doubles power translates. The speed translates. The defense translates. Willie Mays is the only CF who can match Speaker's combination of offense and defense, and the comparison is legitimate.",
    clubhouse_impact: "STABILIZING EXCELLENCE. Speaker wasn't a firebrand or a showman — he was the steady, brilliant center of every team he played for. The Million-Dollar Outfield (Speaker, Lewis, Hooper) worked because Speaker was the anchor. Cleveland's 1920 championship team — dealing with the grief of Ray Chapman's death — held together because Speaker managed with calm authority. +3 stability, +2 leadership, +1 mentorship.",
    dark_side: "The 1926 scandal. After the season, Speaker and Ty Cobb were both forced to resign their managerial positions over allegations by former pitcher Dutch Leonard that they had conspired to fix a 1919 game. Commissioner Landis investigated and cleared both men, but the shadow lingered. Speaker played two more seasons (Washington 1927, Philadelphia 1928) but never managed again. Also: Speaker was known to hold deeply racist views common to his era and region. He was reportedly involved with the Ku Klux Klan in the 1920s, though the extent of his involvement is debated. Despite this, he later mentored Larry Doby in 1947, suggesting some evolution — or at minimum, complexity. The Gray Eagle's legacy is complicated by the man behind the myth.",
  },

  chemistry_traits: [
    { tag: "Where Triples Go to Die", desc: "Speaker plays the shallowest CF in baseball. All singles hit behind the infield have a 40% chance of being caught. Triples to CF are reduced by 50%. The outfield is smaller when Speaker is there." },
    { tag: "The Fifth Infielder", desc: "Speaker's shallow positioning turns him into an extra infielder. Ground balls that would be singles through the middle can be fielded by Speaker. +1 team DEF for the entire defense." },
    { tag: "792 Doubles", desc: "The all-time MLB record. Speaker's line drives find the gaps with supernatural consistency. +1 POW expressed as doubles (not HR). When Speaker leads off an inning, 30% chance of a double." },
    { tag: "Million-Dollar Outfield", desc: "With Harry Hooper (RF) and Duffy Lewis (LF), Speaker forms the greatest OF defensive unit in baseball history. When all three are present, +2 DEF for entire outfield, +1 team morale." },
    { tag: "Cy Young's Student", desc: "Cy Young personally trained Speaker's fly ball reads. +1 DEF permanently. The greatest pitcher taught the greatest outfielder to see the ball off the bat." },
    { tag: "The Gray Eagle", desc: "Speaker's play ages like fine wine. No decline phase — .345 career BA, 19 consecutive 100+ game seasons. In ILB: Speaker suffers -0 age penalty until age 38. The eagle doesn't slow down." },
    { tag: "Player-Manager", desc: "Speaker can manage while playing. +1 team strategy, +1 defensive positioning for all fielders. He sees the entire field — from shallow center, he sees everything." },
    { tag: "Cobb's Rival, Cobb's Friend", desc: "When facing Ty Cobb (or equivalently elite players), both gain +1 to all stats. The rivalry elevated both. They finished as friends on the 1928 A's." },
  ],

  preferred_locations: [
    { location: "Shallow Center Field", affinity: "HIGH", note: "The shallowest CF in baseball history. So close to second base he was a fifth infielder. 449 assists, 139 DP, 6,592 putouts. His kingdom." },
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".345 career BA. 792 2B. 3,514 H. Bat held low, 'like the lazy twitching of a cat's tail.' Sprayed line drives to all fields." },
    { location: "Fenway Park / Boston", affinity: "HIGH", note: "1907-1915. Million-Dollar Outfield. 2× WS champ. AL MVP 1912. The park opened the same year he peaked." },
    { location: "Cleveland / Dunn Field", affinity: "HIGH", note: "1916-1926. CF fence 460 feet away. Still played shallow. Batted .350+ in 9 of 11 years. Player-manager of 1920 WS champs." },
    { location: "The World Series", affinity: "HIGH", note: "3× champion (1912, 1915, 1920). Clutch single in 1912 WS Game 8 after Snodgrass Muff. October was his stage." },
    { location: "Texas", affinity: "HIGH", note: "Born Hubbard, TX. Died Lake Whitney, TX. The Gray Eagle always returned to Texas." },
  ],

  momentum: {
    hot_triggers: [
      "Hitting streaks — three 20+ game streaks in 1912 alone. When Speaker starts hitting, he doesn't stop.",
      "Big games — AL MVP, WS hero, broke Cobb's 9-year batting streak. The bigger the stage, the better.",
      "Defensive challenges — balls hit to CF activate his instincts. The harder the play, the more spectacular the catch.",
      "Shallow positioning paying off — every single he catches from shallow CF reinforces his confidence and the system.",
    ],
    cold_triggers: [
      "Balls hit over his head — the risk of shallow positioning. When a triple goes over him, -1 confidence briefly.",
      "Off-field scandal — the 1926 Dutch Leonard allegations shook him. Accusations of dishonesty cut deep.",
      "Contract disputes — the 1916 trade from Boston over salary. When management disrespects him, -2 morale.",
      "Aging — despite The Gray Eagle's longevity, the last two seasons (1927-28) showed decline. Eventually, even eagles land.",
    ],
    pressure_response: "HISTORICALLY ELITE. Speaker's resume in the biggest moments: 1912 AL MVP + WS champion (clutch single in deciding game). 1915 WS champion. 1920 WS champion as player-manager (leading Cleveland through the grief of Ray Chapman's death). He broke Cobb's 9-year AL batting title streak in 1916. Three 20+ game hitting streaks in one season. In ILB: Speaker is the player you build around. He does everything — hit, run, field, lead — and he does it best when it matters most.",
  },

  action_card_seeds: [
    { title: "Where Triples Go to Die", type: "Game Action", text: "Your center fielder positions himself absurdly shallow — practically standing at second base. The batter crushes a line drive to center. Any other outfielder watches it sail over their head for a triple. Your center fielder turns, sprints back, glances over his shoulder, and catches the ball at full extension. Where triples go to die. +3 DEF. -1 opponent morale. The outfield just got smaller.", origin: "Speaker's nickname reflected his ability to play impossibly shallow CF and still catch balls hit over his head, eliminating would-be triples." },
    { title: "The Unassisted Double Play from Center Field", type: "Game Action", text: "Runner on second, no outs. The batter lines a shot to center. Your center fielder, standing practically at second base, catches the line drive on the run, then — without throwing — beats the runner back to second base for an unassisted double play. From center field. +4 DEF. +3 baseball IQ. The play that shouldn't be possible.", origin: "Speaker executed unassisted double plays from CF at least twice in 1918 — catching line drives and beating runners back to second base." },
    { title: "Three Hitting Streaks of Twenty", type: "Game Action", text: "Your center fielder goes on a 20-game hitting streak. It ends. He immediately starts another 20-game hitting streak. It ends. He starts a THIRD. Three separate hitting streaks of 20+ games in one season — an MLB record that still stands. +2 CON for the entire season. +3 consistency. The bat doesn't go cold; it just pauses.", origin: "1912: Speaker set an MLB record with three separate hitting streaks of 20+ games in one season. Had he not gone 0-for-5 on June 16, he would have hit in 51 consecutive games." },
    { title: "Fifty and Fifty", type: "Game Action", text: "Your center fielder hits 53 doubles. He also steals 52 bases. In the same season. The first player in baseball history to reach 50 doubles and 50 stolen bases in the same year. It will not be matched for 86 years. +2 POW. +2 SPD. +3 historic achievement.", origin: "1912: Speaker became the first player with 50+ doubles and 50+ stolen bases in one season. Craig Biggio was the only other player to do it, in 1998." },
    { title: "The Snodgrass Muff", type: "Game Action", text: "Game 8 of the World Series. Your team trails by one in the bottom of the 10th. The opposing CF drops a routine fly ball. Your next batter pops up — the first baseman and the catcher let it fall between them. Given a second life, your center fielder steps up and singles to tie the game. Your team wins the World Series. +5 WS legacy. +3 clutch.", origin: "1912 WS Game 8: After Snodgrass's Muff and a Speaker pop foul that wasn't caught, Speaker singled to tie the game. Red Sox won in the 10th for the championship." },
    { title: "Breaking Cobb's Nine-Year Streak", type: "Game Action", text: "The greatest hitter in baseball has won nine consecutive batting titles. Your center fielder, traded to a new team over a contract dispute, bats .386 to Cobb's .371. The streak is broken. Your player leads the league in hits, doubles, BA, OBP, and SLG. He becomes the highest-paid player in baseball. +3 CON. +2 legacy. The Eagle surpasses the Tiger.", origin: "1916: Speaker broke Ty Cobb's streak of 9 consecutive AL batting titles, hitting .386 to Cobb's .371 in his first year with Cleveland." },
    { title: "Cy Young's Fly Balls", type: "Origin", text: "The greatest pitcher in baseball history stands in the infield with a bat and a bucket of balls. He hits fly after fly to your young center fielder. Left. Right. Over his head. Short hops. Your player learns to read the ball off the bat, to move before the swing is finished, to be where the ball will be, not where it is. +2 DEF permanently. The master teaches the prodigy.", origin: "Cy Young trained Speaker by hitting him fly balls: 'When I was a rookie, he used to hit me flies to sharpen my abilities to judge in advance the direction and distance of an outfield ball.'" },
    { title: "The Gray Eagle Manages Through Grief", type: "Drama", text: "Your shortstop is killed by a pitch. The team is devastated. The pennant race continues. Your player-manager holds the team together through the grief, leads them to the pennant, and wins the World Series. The championship belongs to the dead man's memory. +5 leadership. +3 CLU. +3 team resilience.", origin: "1920: Speaker, as player-manager, led Cleveland through the death of SS Ray Chapman (killed by a pitch Aug 16) to the World Series championship — the first in franchise history." },
  ],

  art_direction: {
    face: "HANDSOME, WEATHERED, NOBLE. 5'11½\" 193 lbs. Strong, athletic build — lean but powerful. Texas features, sun-weathered, the look of a man who grew up in ranch country and carried that hardness into baseball. The eyes should be EAGLE-LIKE — sharp, scanning, the eyes of a man who reads the ball off the bat before anyone else. Not fierce or angry — WATCHFUL. The composure of a man who plays shallow CF because he can see everything before it happens. The nickname 'Gray Eagle' should be visible in the face — nobility, patience, predatory awareness.",
    attire: "Boston Red Sox uniform circa 1912 — white wool jersey with 'RED SOX' or 'BOSTON' insignia, baggy flannel pants, flat cap. THE POSE: the shallow CF positioning — Speaker standing impossibly close to second base, weight forward, eyes locked on the batter, ready to break in any direction. His glove is low, his body coiled. Or: the moment of the catch — Speaker turning over his shoulder at full sprint, glove extended behind him, snagging a drive that should have been a triple. The body is perfectly balanced even at full extension. Or: the batting stance — left-handed, bat held low, 'like the lazy twitching of a cat's tail,' eyes level, deep in the box. No number.",
    mood: "SOARING PRECISION. Speaker's card should feel like FLIGHT — the eagle gliding above the field, seeing everything, positioned perfectly. Where Donlin is Broadway spotlight and Elberfeld is pepper heat, Speaker is ALTITUDE — the view from above, the calm of perfect positioning, the predatory patience of a raptor. The mood should suggest mastery without effort, the man who makes the impossible look routine.",
    style: "Sepia-toned with COOL, SILVER-GRAY undertones — the gray of eagle feathers, the silver of early morning Texas sky, the steel of a man who never declined. Where the Banners tend toward warm gold and pastoral earth, Speaker's Muggers card introduces GRAY SILVER — cooler, more metallic, more modern. The palette should suggest the transition from the dead-ball era's warmth to the steel-and-speed century ahead. The Gray Eagle bridges eras.",
    reference: "Think the shallow positioning frozen in time — Speaker standing where no outfielder has any business standing, 30 feet behind second base, and the ball is hit and he's already moving. Or: the catch over the shoulder at full sprint — the most beautiful play in baseball, executed thousands of times. Or: the 1912 WS — Speaker at the plate after Snodgrass's Muff, about to single to tie the game, the calm in the chaos. The card should capture the moment when the eagle locks on its target.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 },{ range: "51+", value: 3, note: "cap" }] },
  defense: { metric: "Positional excellence + records", note: "All-time OF records in assists (449), DP (139), putouts (6,592)" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason + MVP + signature moments", note: "3× WS champ, 1912 MVP, key WS hit" },
};

const C = {
  parchment: "#f0eadb", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", grayEagle: "#6b7178",
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

export default function TrisSpeakerCard() {
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
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.silver}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.silver, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.silver}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.grayEagle }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.grayEagle}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>🦅 HOF 1937</span>
                <span style={{ background: `${C.silver}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>MYTHIC</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.grayEagle, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Where Triples Go to Die</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.grayEagle}15`, border: `1px solid ${C.silver}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.grayEagle, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🦅 .345 BA (9th) • 792 2B (ALL-TIME) • 3,514 H (5th) • 449 OF AST (ALL-TIME)</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1912 — AL MVP / AL LEADER: 2B, HR, OBP / WS CHAMPION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR 2B", val: d.real_stats.career_doubles },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "OF AST", val: "449" },{ label: "OF DP", val: "139" },{ label: "WS TITLES", val: "3" },{ label: "CAR K", val: d.real_stats.career_k }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.grayEagle, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>220 CAREER K IN 22 SEASONS • 19 CONSECUTIVE 100+ GAME SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🦅 The Gray Eagle", "🏆 3× WS Champion", "🏅 1912 AL MVP", "🎯 792 2B All-Time", "🧤 449 OF Assists All-Time", "🔄 139 OF DP All-Time", "💨 52 SB + 53 2B (1912)", "📖 HOF 1937", "🤝 Mentored Larry Doby"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.silver}15`, border: `1px solid ${C.silver}40`, padding: "2px 8px", borderRadius: 10, color: C.grayEagle, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.grayEagle, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Speaker's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
