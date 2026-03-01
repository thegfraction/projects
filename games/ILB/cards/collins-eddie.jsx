import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}collins-eddie.png`;

const PLAYER_DATA = {
  name: "Eddie Collins",
  nickname: "Cocky",
  year: 1914,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "2B",
  bats: "L",
  throws: "R",
  height: '5\'9"',
  weight: "175 lbs",
  born: "May 2, 1887 — Millerton, NY",
  died: "March 25, 1951 — Boston, MA (age 63)",
  hof: "HOF 1939. .333 career BA. 3,315 H (11th all-time). 741 SB. .424 OBP. 4× WS champion (active). .328 WS BA. 1914 AL MVP. Greatest 2B of all time (Bill James). 'The greatest money player in the world — by a whole city block, and a couple of apartment houses thrown in.' — AL umpire Billy Evans.",

  real_stats: {
    season: 1914, games: 152, at_bats: 526, hits: 181, doubles: 23,
    triples: 14, home_runs: 2, rbi: 85, runs: 122, stolen_bases: 58,
    batting_avg: ".344", obp: ".452", slg: ".452", ops: ".904",
    ops_plus: "~170", war: "~8.5",
    al_mvp: "1914 (Chalmers Award)",
    one_hundred_k_infield: "Collins (2B), Barry (SS), Baker (3B), McInnis (1B)",
    ws_1910_ba: ".429", ws_1911_ba: ".365", ws_career_ba: ".328",
    career_avg: ".333", career_hits: 3315, career_hr: 47,
    career_sb: 741, career_runs: 1821, career_obp: ".424",
    career_war: "~124", career_ops_plus: 144,
    career_games: 2826, career_sac_bunts: "512 (ALL-TIME RECORD)",
    career_k_age36to40: "49 K in 2,087 AB",
    ws_titles_active: 4, ws_titles_total: 6,
    seasons_over_340: 10,
    decades_played: "4 (1900s, 1910s, 1920s, 1930)",
    stole_6_bases_game: "2 times (ML record)",
  },

  ilb_stats: {
    ovr: 13,     // Mythic — The greatest second baseman of all time. .333 career BA with 3,315 H and 741 SB. 4× WS champion (active). .328 WS career BA. 1914 AL MVP. McGraw: 'the greatest player in the world.' Evers: 'greatest 2B I ever saw.' Bill James: greatest 2B ever under win shares. The complete package at 2B — contact, speed, defense, October dominance — for 25 years.
    con: 5,      // .344 BA in 1914 (MVP year) → tier 5 (.330+). .365 in 1911, .348 in 1912. OPS+ ~170 in peak years (≥130 bonus, capped at 5). .333 career BA. 3,315 career hits (11th all-time). Age 36-40: .349 BA, 49 K in 2,087 AB. The contact was supernatural and never declined. Rating: 5.
    pow: 0,      // 2 HR in 1914. 47 career HR — the FEWEST of any player with 3,000+ hits. SLG .452 peak (misses ≥.500 bonus). Zero power. The bat produced singles, doubles, and walks. The power was in the legs, not the swing. Rating: 0.
    spd: 3,      // 81 SB in 1910 → maximum tier 3. 741 career SB. Led AL in steals 4×. Stole 6 bases in one game TWICE (ML record). First AL player to steal 80+. Still stealing 48 bases at age 36. Rating: 3.
    def: 3,      // MAXIMUM. Bill James: greatest 2B of all time under win shares. Johnny Evers (after losing 1910 WS to Collins): 'Collins is the greatest second baseman I ever saw. Darned if I can explain why he is, but he IS, just the same!' Led AL 2B in every fielding category (1910). Best defensive 2B, best sign-stealer, best bunter. Remarkable range, quick reflexes, strong accurate arm. Rating: 3.
    clu: 3,      // MAXIMUM. 4× WS champion (active participant): 1910, 1911, 1913 Athletics; 1917 White Sox. WS career BA .328 — elite. 1910 WS: .429 BA. 1914 AL MVP. Billy Evans: 'Who is the greatest money player in the world? Eddie Collins by a whole city block, and a couple of apartment houses thrown in.' McGraw after 1913 WS: 'You are the greatest player in the world. They may talk about Cobb, but I would rather have you.' The greatest postseason player of the dead-ball era. Rating: 3.
  },

  stat_justification: {
    con: ".344 BA in 1914 (MVP year) → tier 5 (.330+). Peak years: .365 (1911), .348 (1912), .345 (1913), .344 (1914), .372 (1920). OPS+ consistently 140-170 → ≥130 bonus (capped at 5). Career: .333 BA, 3,315 hits (11th all-time), .424 OBP. At ages 36-40: .349 BA, .452 OBP, with only 49 K in 2,087 AB. He hit .340+ in 10 full seasons. The contact was not just elite, it was immortal — it never declined. Rating: 5.",
    pow: "2 HR in 1914 MVP year. 47 career HR — the fewest of any player with 3,000+ hits. SLG .452 peak (misses ≥.500 bonus). Collins was the anti-power hitter. He manufactured runs through contact, walks, bunts, stolen bases, and hit-and-run. 512 career sacrifice bunts (all-time record). The power score is zero, but the offensive impact was HOF-caliber anyway. Rating: 0.",
    spd: "81 SB in 1910 → tier 3 (maximum). First AL player to steal 80+ in a season. 741 career SB. Led AL in steals 4×. Stole 6 bases in one game TWICE (ML record, still tied). At age 36, still stole 48 bases with a .360 BA. At age 37, 42 SB with .349. The speed was extraordinary AND durable — he was a basestealing threat for 20+ years. Rating: 3.",
    def: "MAXIMUM. Bill James win shares system: greatest 2B of all time. Johnny Evers after losing the 1910 WS: 'Collins is the greatest second baseman I ever saw.' Led AL 2B in every fielding category in 1910. Baseball Almanac: 'best defensive second baseman in the history of baseball.' Remarkable range, quick reflexes, strong accurate arm. Best sign-stealer who ever lived. Best bunter in history. The 2B position has never been played better. Rating: 3.",
    clu: "MAXIMUM. The evidence: (1) 4× WS champion as active player (1910, 1911, 1913 A's; 1917 White Sox). (2) WS career BA .328 — elite across multiple Series. (3) 1910 WS BA: .429. 1911: .365. (4) 1914 AL MVP. (5) McGraw after the 1913 WS: 'You are the greatest player in the world. They may talk about Cobb, but I would rather have you.' (6) Billy Evans: 'Who is the greatest money player in the world? Eddie Collins by a whole city block.' (7) Described as 'the greatest World Series star who ever lived.' He elevated in October every time. Rating: 3.",
  },

  personality: {
    leadership_style: "THE INTELLECTUAL CAPTAIN. Collins was a Columbia University graduate in an era when most players were working-class. He was the team captain, the sign-stealer, the strategic brain. On the 1919 White Sox, he led the 'clean' faction — the educated, professional players — against Chick Gandil's working-class clique that became the Black Sox. He couldn't stop the fix, but he represented its opposite: integrity, intelligence, excellence.",
    temperament: "CONFIDENT AND CALCULATING. Nicknamed 'Cocky' — not for arrogance but for the fierce, confident way he played. 'Nervous, edgy, couldn't sit still. On the baseball field, aggressive to the point of being arrogant. Off the field, modest to the point of being shy.' The duality is key: the public Collins was the fiery competitor; the private Collins was the thoughtful intellectual.",
    work_ethic: "FOUR-DECADE EXCELLENCE. Collins played from 1906 to 1930 — 25 seasons across four decades. He was still hitting .344 at age 39. He adapted to rule changes, opponent adjustments, the transition from dead-ball to live-ball. The work ethic wasn't just physical — it was intellectual. He studied the game relentlessly. Best sign-stealer. Best bunter. Best hit-and-run man. These skills don't come from talent alone.",
    lifestyle: "COLUMBIA INTELLECTUAL. Unlike most players of his era, Collins was educated, articulate, and socially connected. He played college football as a quarterback. He used a pseudonym ('Sullivan') to preserve his amateur eligibility while moonlighting in the majors. After baseball: vice president and GM of the Red Sox (1933-1947), instrumental in acquiring Ted Williams. He bridged the worlds of player, manager, and executive.",
    era_adaptability: "PERFECTLY TRANSLATABLE. Collins's skill set — contact, OBP, speed, defense, baserunning intelligence — works in any era. His .424 OBP and 741 SB would make him a sabermetric darling. His 512 sacrifice bunts would horrify modern analysts, but his ability to manufacture runs without power is valuable anywhere. The sign-stealing would be... controversially relevant in modern baseball.",
    clubhouse_impact: "DIVISIVE EXCELLENCE. On the A's, he was beloved — the heart of the $100,000 Infield, the captain of a dynasty. On the White Sox, he represented the class divide that tore the team apart. The Black Sox scandal wasn't just about gambling — it was about resentment between Collins's educated clique and Gandil's working-class group. Collins was blameless in the fix, but his presence highlighted the fracture lines. +3 leadership for clean players, -2 chemistry with resentful teammates.",
    dark_side: "The class divide. Collins was not universally loved. On the White Sox, his Columbia education and $15,000 salary (more than most teammates) bred resentment. The Black Sox conspirators partly justified their fix by pointing to the disparity between Collins's pay and their own. Collins reportedly refused to associate with the 'lower' players. Whether this was principled distance or elitism depends on the perspective. Also: after retiring, Collins as Red Sox GM presided over a team that was notoriously slow to integrate — the Sox were the last team to field a Black player (1959). His personal views on race are unclear, but the institutional failure happened on his watch.",
  },

  chemistry_traits: [
    { tag: "The $100,000 Infield", desc: "With Barry (SS), Baker (3B), and McInnis (1B), Collins forms the greatest infield of the era. When all four are present, +2 DEF for entire infield, +1 team strategy. The infield that won three World Series." },
    { tag: "Greatest Money Player", desc: "Billy Evans: 'by a whole city block, and a couple of apartment houses thrown in.' In postseason/elimination games, Collins gains +2 to all stats. The bigger the moment, the better he plays." },
    { tag: "The Sign-Stealer", desc: "'Best sign-stealer who ever lived.' Collins can decode opponent signals. +1 team batting when Collins is on base (relaying signs). Opponents must change signs more frequently (-1 opposing pitcher efficiency)." },
    { tag: "Columbia Intellect", desc: "Graduate of Columbia University. +1 strategic decisions for entire team. But: -1 chemistry with working-class teammates who resent his education and salary." },
    { tag: "The Clean Captain", desc: "On the 1919 White Sox, Collins led the clean faction. When matched with honest/principled teammates, +1 team integrity. When matched with corrupt/gambling influences, -2 team chemistry." },
    { tag: "Four-Decade Man", desc: "Played from 1906 to 1930. Collins suffers -0 age penalty until age 37. Still stole 48 bases at 36. The decline never truly came." },
    { tag: "Best Bunter in History", desc: "512 career sacrifice bunts (all-time record). Collins can advance any runner with near-certainty. Bunt success rate: 90%+. The lost art perfected." },
    { tag: "Six in One Game", desc: "Stole 6 bases in a single game — TWICE (ML record). When Collins reaches base in a game, opponent catcher suffers -2 to stolen base prevention. The fastest man alive." },
  ],

  preferred_locations: [
    { location: "Second Base", affinity: "HIGH", note: "Greatest 2B of all time (Bill James). Best defensive 2B, best range, best sign-stealer. He played more games at 2B than anyone in history at retirement." },
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".333 career BA. 3,315 H. Bat held level, contact first, power never. Best bunter and hit-and-run man in history." },
    { location: "The Basepaths", affinity: "HIGH", note: "741 career SB. 81 in 1910. 6 in a game twice. The basepaths were his highway." },
    { location: "Shibe Park / Philadelphia", affinity: "HIGH", note: "$100,000 Infield. 3 WS titles. AL MVP. The dynasty years." },
    { location: "The World Series", affinity: "HIGH", note: ".328 WS career BA. .429 in 1910. 4 championships. 'Greatest WS star who ever lived.'" },
    { location: "Columbia University", affinity: "HIGH", note: "Quarterback on football team. Played under pseudonym 'Sullivan' to keep eligibility. The intellectual foundation." },
  ],

  momentum: {
    hot_triggers: [
      "Postseason — the greatest money player. WS BA .328. The bigger the game, the sharper the mind.",
      "Basestealing streaks — when he starts running, catchers panic. 81 SB in 1910. 6 in a game.",
      "Sign-reading — when Collins cracks the opposing pitcher's signs, the entire lineup benefits.",
      "Hitting streaks — at .333 career, he goes cold rarely. When hot, he's .380+ for weeks.",
    ],
    cold_triggers: [
      "Clubhouse fracture — the class divide. When team chemistry breaks, Collins's leadership suffers.",
      "Resentment from teammates — his salary and education bred envy. -1 when underpaid teammates learn his pay.",
      "Corruption proximity — the Black Sox scandal haunted his legacy. -2 when gambling/fixing is in the air.",
      "Power situations — 47 career HR. When the team needs a homer, Collins can't provide it.",
    ],
    pressure_response: "THE GREATEST MONEY PLAYER IN BASEBALL HISTORY. This is not hyperbole — it was the consensus of umpires, managers, and opponents during his career. Collins hit .429 in the 1910 WS. .365 in 1911. Won 4 championships. McGraw — the greatest manager of the era — said he'd rather have Collins than Cobb. Billy Evans said Collins was the greatest money player 'by a whole city block, and a couple of apartment houses.' In ILB: Collins is the postseason weapon. His stats go UP in October. Start him in every elimination game.",
  },

  action_card_seeds: [
    { title: "The Greatest Player in the World", type: "Drama", text: "John McGraw — the greatest manager alive — walks across the field after the World Series. He shakes your second baseman's hand. 'You are the greatest player in the world, to my mind. They may talk about Cobb, but I would rather have you.' Your player is embarrassed by the praise. He is a great young fellow. +3 reputation. +2 confidence. The Napoleon of baseball has spoken.", origin: "After the 1913 WS, McGraw shook Collins's hand and told him he was the greatest player in the world, saying he'd rather have Collins than Cobb." },
    { title: "Six Stolen Bases in One Game", type: "Game Action", text: "Your second baseman reaches base. He steals second. He steals third. He steals home. He reaches base again. He steals second again. He steals third again. Six stolen bases in a single game. A major league record. He does it TWICE in the same season. +3 SPD for the week. -3 opponent catcher confidence. The basepaths belong to him.", origin: "1912: Collins stole 6 bases in a game twice, setting an ML record that still stands (tied)." },
    { title: "The $100,000 Infield", type: "Drama", text: "Your second baseman, shortstop, third baseman, and first baseman are valued collectively at $100,000 — an absurd sum for four human beings in 1910. They win three World Series together. They are the foundation of a dynasty. Then the owner sells them all. +3 team DEF while together. -5 when separated. The infield that owned baseball.", origin: "Collins, Barry, Baker, and McInnis — the A's $100,000 Infield won 3 WS (1910, 1911, 1913). Connie Mack broke them up after 1914." },
    { title: "Sullivan", type: "Origin", text: "Your second baseman is a college student at Columbia University. He wants to play professional baseball, but he also wants to play college football. So he signs with the Athletics under a fake name: Sullivan. He plays in the majors as a teenager under a pseudonym, then reveals his true identity after graduating. +2 intelligence. +1 deception. The scholar who played both sides.", origin: "Collins played for the A's under the pseudonym 'Sullivan' in 1906 to preserve his amateur eligibility at Columbia, where he was the football team's quarterback." },
    { title: "By a Whole City Block", type: "Drama", text: "'Who is the greatest money player in the world? That is a soft one. Eddie Collins by a whole city block, and a couple of apartment houses thrown in.' — AL umpire Billy Evans. Your second baseman hits .429 in the World Series. He hits .365 in the next one. He wins four championships. The money player has no equal. +3 CLU permanently. The quote becomes the legacy.", origin: "Billy Evans's famous assessment of Collins as the greatest money/clutch player in baseball history." },
    { title: "The Clean Captain", type: "Drama", text: "Your team is fixing the World Series. Your second baseman — the captain, the Columbia graduate, the highest-paid player — knows something is wrong. He can't stop it. He plays clean while eight teammates throw games around him. The Series is lost. The conspirators are banned. Your captain's integrity survives, but the team is destroyed. +5 integrity. -3 team chemistry. The clean man in the dirty room.", origin: "1919 Black Sox: Collins led the 'clean' faction of White Sox players. He couldn't prevent the fix but was never implicated. His principled stance divided the clubhouse." },
    { title: "Eighty-One", type: "Game Action", text: "Your second baseman steals 81 bases in a single season. The first player in American League history to steal 80+. He leads the league in steals. He also leads all second basemen in every fielding category. He also hits .322. He also wins the World Series (.429 WS BA). The complete season. +2 all stats. The year everything came together.", origin: "1910: Collins stole 81 bases (AL record, first to 80+), led 2B in every fielding category, hit .322, and won the WS with a .429 BA." },
    { title: "Ted Williams's Scout", type: "Drama", text: "Your retired second baseman is now the vice president of the Red Sox. He scouts a tall, skinny kid from San Diego with an impossible swing. He signs Ted Williams. The greatest hitter who ever lived, discovered by the greatest second baseman who ever lived. +5 post-career legacy. The Splendid Splinter owes the Cocky Colonel.", origin: "As Red Sox VP/GM (1933-1947), Collins was instrumental in scouting and acquiring Ted Williams, who became arguably the greatest hitter ever." },
  ],

  art_direction: {
    face: "SHARP, CONFIDENT, INTELLECTUAL. 5'9\" 175 lbs. Lean, compact, athletic — the frame of a college quarterback who became the best 2B ever. The face should radiate INTELLIGENCE and CONFIDENCE — 'cocky' without arrogance, sharp without cruelty. Clean-featured, Columbia-educated look — more refined than most dead-ball players. Bright, calculating eyes. The half-smile of a man who has already stolen your signs and knows what pitch is coming. The expression should say: I'm smarter than you, I'm faster than you, and I'll prove it today.",
    attire: "Philadelphia Athletics uniform circa 1914 — white wool jersey with the iconic Old English 'A' on the left chest, elephant patch, baggy flannel pants, flat cap. THE POSE: the steal — Collins in mid-sprint, body low, leaning toward the next base, the explosive burst of the greatest basestealer of his era. Or: the bunt — bat angled perfectly, weight shifting forward, the ball about to die on the infield grass. Or: the defensive crouch at 2B — low, wide, hands ready, the pivot man about to turn the DP. Athletic, compact, coiled. No number.",
    mood: "PRECISION AND CONFIDENCE. Collins's card should feel SHARP — the edge of a well-honed mind applied to a physical game. Where Speaker is soaring and Donlin is theatrical, Collins is RAZOR-SHARP — clean lines, precise execution, the confidence of preparation. The mood is intellectual superiority expressed through athletic excellence.",
    style: "Sepia-toned with CRISP, WARM AMBER undertones — the warm glow of a well-appointed study, the amber of old trophy cases, the polish of a Columbia classroom. Warmer than Speaker's silver-gray but more refined than the Banners' rustic gold. The Collins palette should suggest EDUCATION and EXCELLENCE — the man who bridged the intellectual and athletic worlds. The most 'professional' palette in the Muggers collection.",
    reference: "Think the steal — Collins exploding from first, body angled forward, the catcher's throw already too late. Or: the DP pivot — Collins receiving the ball at second, planting, firing to first in one motion, the infield turning like a machine. Or: the celebration — the $100,000 Infield after a WS victory, four men who owned baseball. The card should capture the moment when intelligence becomes action.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 },{ range: "51+", value: 3, note: "cap" }] },
  defense: { metric: "Positional excellence + records", note: "Greatest 2B ever (Bill James). Led AL in every 2B fielding category." },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "WS BA + MVP + titles", note: ".328 WS BA, 4× champion, 1914 MVP" },
};

const C = {
  parchment: "#f0eadb", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", amber: "#c4913a",
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

export default function EddieCollinsCard() {
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
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.amber}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.amber, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.amber}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.amber}dd`, color: C.ink, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>HOF 1939</span>
                <span style={{ background: `${C.amber}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>MYTHIC</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.amber, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Greatest Money Player — By a Whole City Block</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.amber, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🏆 4× WS CHAMPION • .328 WS BA • .429 IN 1910 WS • 1914 AL MVP</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "R", val: d.real_stats.runs },{ label: "H", val: d.real_stats.hits },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1914 — AL MVP / $100,000 INFIELD / 4TH PENNANT IN 5 YEARS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "WS TITLES", val: "4" },{ label: "WS BA", val: ".328" },{ label: "SAC BNT", val: "512" },{ label: "DECADES", val: "4" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>47 CAREER HR — FEWEST OF ANY 3,000-HIT PLAYER</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📖 HOF 1939", "🏆 4× WS Champion", "🏅 1914 AL MVP", "💰 $100,000 Infield", "💨 741 Career SB", "🎓 Columbia University", "🧠 Best Sign-Stealer Ever", "🤝 Acquired Ted Williams", "✅ Clean in Black Sox"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.amber}15`, border: `1px solid ${C.amber}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.amber, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Collins's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
