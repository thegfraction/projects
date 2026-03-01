import { useState } from "react";

const VAUGHAN_DATA = {
  name: "Arky Vaughan",
  nickname: "The Ghost of Arky",
  year: 1935,
  team: "Pittsburgh Pirates",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SS",
  bats: "L",
  throws: "R",
  height: "5'10\"",
  weight: "175 lbs",
  born: "March 9, 1912 — Clifty, Arkansas (family moved to Fullerton, CA as infant; spoke with Arkansas accent his whole life)",
  died: "August 30, 1952 — Lost Lake, Eagleville, California (age 40, drowned trying to save friend in capsized boat during storm)",
  hof: "Inducted 1985 (Veterans Committee). Bill James: 2nd greatest SS in history behind Wagner. 9× All-Star. .318 career BA. .406 career OBP. Joe Posnanski: 'The least-known great MLB player.'",

  real_stats: {
    season: 1935, games: 137, at_bats: 499, batting_avg: ".385",
    hits: 192, doubles: 34, triples: 19, home_runs: 19,
    rbi: 99, runs: 108, stolen_bases: 4, walks: 97,
    strikeouts: 18, slg: ".607", obp: ".491", ops: "1.098",
    ops_plus: 190, war: 9.3,
    career_avg: ".318", career_hr: 96, career_rbi: 926,
    career_hits: 2103, career_war: 49.2,
    career_walks: 937, career_obp: ".406",
  },

  ilb_stats: {
    ovr: 10,     // Elite/MVP — .385 BA (190 OPS+) as a shortstop. Best SS season in NL since Wagner. Bill James: 2nd greatest SS ever. 49.2 career WAR. 9 consecutive All-Stars. .318/.406 career. HOF.
    con: 5,      // .385 BA in 1935 — NL SS record since 1900. .491 OBP. 192 H. Only 18 K in 499 AB (extraordinary contact). .318 career BA (2nd among SS behind Wagner .329). .300+ in 12 of 14 seasons. CON 5.
    pow: 2,      // 19 HR, .607 SLG, 19 3B in 1935. 96 career HR. Not a power hitter — a line-drive gap hitter who generated extra bases through doubles, triples, and walks. SLG .607 qualifies for bonus → POW 2.
    spd: 2,      // 19 triples in 1935 (led NL). Led NL in triples 3 times. 118 career SB. Rip Sewell: "When he went around second, his hip pocket was dipping sand." Lloyd Waner: "For going from home plate to second base I don't think there was anybody who could match him." SPD 2.
    def: 1,      // Rough early career (46 errors in both 1932 and 1933). Improved under Wagner's mentorship. Led NL SS in putouts and assists 3 times each. Top 3 in fielding pct 4 times. Decent SS, not elite. DEF 1.
    clu: 1,      // Never won a World Series. Pirates never won pennant during his tenure. But: .364 BA in All-Star Games (best ever at the time). 2 HR in 1941 ASG. Hit .325 in 64 games helping Brooklyn win 1947 NL pennant at age 35. CLU 1.
  },
  
  stat_justification: {
    con: ".385 BA in 1935 — the highest by any NL shortstop since 1900 (still the record). .491 OBP. Only 18 strikeouts in 499 AB — a K rate of 3.6%. Career .318 BA — second among all SS in history behind only Honus Wagner (.329). Hit .300+ in 12 of 14 seasons. 2,103 career hits. 937 career walks with only 276 career K. The plate discipline is extraordinary. Rating of 5.",
    pow: "19 HR, .607 SLG, 19 triples in 1935. 96 career HR. Vaughan was not a traditional power hitter — he was a line-drive machine who hit gaps and ran bases. His SLG of .607 earns the bonus (+1), but the base is HR 10-19 → tier 1, so POW 2. The power came from doubles (34) and triples (19), not over-the-fence shots.",
    spd: "19 triples in 1935 (led NL). Led NL in triples 3 times. 118 career SB. Rip Sewell: 'When he went around second, his hip pocket was dipping sand. That's how sharp he cut those corners.' Lloyd Waner: 'For going from home plate to second base I don't think there was anybody who could match him.' Not a pure base stealer, but an elite baserunner. Triples bonus → SPD 2.",
    def: "Led NL SS in putouts 3 times, assists 3 times. Improved dramatically under Honus Wagner's personal mentorship (Wagner roomed with him on road trips). Finished top 3 in fielding percentage 4 times. BUT: led NL in errors in both 1932 (46) and 1933 (46). Defense was his weakness early, became solid later. Wagner: 'Of all the players I tried to help, he's the best and the one that went the farthest.' Rating of 1 — good but not elite.",
    clu: "Never won a World Series. Pirates never won the pennant during his decade as starting SS. But: .364 career BA in All-Star Games (best ever at the time). Hit 2 HR in the 1941 ASG (upstaged only by Ted Williams' walk-off 3-run HR). Hit .325 in 64 games helping Brooklyn win the 1947 NL pennant at age 35 after a 3-year retirement. He delivered in showcase games. Rating of 1.",
  },

  personality: {
    leadership_style: "The Quiet Principled Man. Vaughan was so quiet that Joe Posnanski called him 'the least-known great MLB player.' He let his bat speak. But when principles were at stake, he was immovable. In 1943, when Durocher suspended Bobo Newsom unfairly, Vaughan handed his uniform to Durocher and threatened to quit. The entire team followed Vaughan — only 2 players were willing to play for Durocher the next day. Vaughan then voluntarily retired for 3 years rather than play for a manager he didn't respect. This wasn't impulsiveness — it was conviction.",
    temperament: "Shy, modest, principled. Vaughan avoided the spotlight his entire life. He had no interest in fame, publicity, or self-promotion. After retiring, he bought a cattle ranch in northern California and never returned to baseball in any capacity. When teams called about coaching, he declined. He wanted to fish, hunt, and raise his family. The modesty that defined his life also obscured his legacy — he spent 33 years waiting for the Hall of Fame.",
    work_ethic: "Extraordinary natural talent refined by the greatest mentor. Wagner personally roomed with Vaughan, taught him shortstop play, and watched him become 'the best player I ever tried to help.' Vaughan's plate discipline — 937 BB vs. 276 K in his career — doesn't happen without relentless preparation. He studied pitchers. He controlled the zone. He never swung at bad pitches. .385 with 18 K in 499 AB is mastery.",
    lifestyle: "Simple, rural, family-centered. Married Margaret, his high school sweetheart, in 1931 — they had four children. After baseball: cattle ranch near Eagleville, CA. Hunting, fishing, farming. No interest in the baseball world. He was a rancher who had once played shortstop, not a ballplayer who retired to a ranch. The distinction mattered to him.",
    era_adaptability: "VERY HIGH. Vaughan's skill set — elite contact, plate discipline, speed, solid defense at SS — is exactly what modern analytics value. His 937 BB/276 K career ratio would make him a sabermetric darling. His .406 career OBP would play in any era. He'd be a modern prototype: a .310/15 HR/90 BB shortstop with plus speed and good defense. Think a left-handed Trea Turner with better OBP.",
    clubhouse_impact: "QUIET BUT IMMOVABLE. Vaughan was not vocal. He didn't give speeches. But when he stood up — as he did against Durocher in 1943 — the entire team followed him. His moral authority came from his character, not his volume. Pittsburgh fans coined 'The Ghost of Arky' after his trade — when times got tough, they remembered the quiet man who had always been there.",
    dark_side: "The drowning. August 30, 1952. Lost Lake, near Eagleville. A sudden storm capsized the fishing boat. Vaughan's friend Bill Wimer couldn't swim. Vaughan — an accomplished swimmer — tried to save him. Both men drowned, 75 feet from shore. He was 40 years old. His wife Margaret and four children survived him. The man who stood on principle died standing on principle — he wouldn't leave someone behind. It was the most Arky Vaughan way to die.",
  },

  chemistry_traits: [
    { tag: "Wagner's Protégé", desc: "Honus Wagner personally mentored Vaughan, rooming with him on road trips. +1 DEF permanently. Wagner: 'Of all the players I tried to help, he's the best.' If Wagner is in the same franchise history, Vaughan gets +1 to all stats." },
    { tag: "The Invisible Star", desc: "Vaughan generates zero media attention. No controversy. No headlines. +1 team stability, -2 publicity. He is the best player nobody talks about." },
    { tag: "Principled Stand", desc: "If a teammate is unjustly punished, Vaughan can trigger a player revolt. 70% chance the team follows him. 30% chance he retires voluntarily for 1-3 years. Based on the 1943 Durocher/Newsom incident." },
    { tag: "Plate Discipline Master", desc: "18 K in 499 AB in 1935 (3.6% K rate). Vaughan walks more than he strikes out — every season, every year, always. +1 OBP permanently. Pitchers must throw strikes or he takes the base." },
    { tag: "Ghost of Arky", desc: "After trade or departure, Vaughan haunts the franchise. When the old team struggles, fans remember him. +1 morale to any team that acquires him. -1 morale to the team that trades him away." },
    { tag: "Triple Machine", desc: "Led NL in triples 3 times. 19 triples in 1935. Vaughan converts 15% of doubles into triples through elite baserunning. Rip Sewell: 'His hip pocket was dipping sand.'" },
    { tag: "Voluntary Retirement", desc: "If manager relationship drops below 20%, Vaughan will retire voluntarily rather than play for someone he doesn't respect. Can return 1-3 years later if manager changes. Based on 1944-46 retirement." },
    { tag: "The Rescue Attempt", desc: "End-of-career event. 5% chance per offseason of a fatal accident while saving someone. If triggered: permanent removal from game, +10 legacy, +5 team grief. The most heroic exit in baseball history." },
  ],

  preferred_locations: [
    { location: "Forbes Field / Pittsburgh", affinity: "HIGH", note: "10 seasons. .328 BA with Pirates. Set franchise records that still stand. The Ghost of Arky." },
    { location: "Shortstop", affinity: "HIGH", note: "Bill James: 2nd greatest SS ever. .385 BA in 1935 (NL SS record). Led NL in putouts and assists 3× each." },
    { location: "Batter's Box", affinity: "HIGH", note: ".385 in 1935. 18 K in 499 AB. .491 OBP. He owned the strike zone." },
    { location: "Ranch / Eagleville, California", affinity: "HIGH", note: "Cattle ranch after retirement. Hunting, fishing, family. His chosen life." },
    { location: "All-Star Game", affinity: "HIGH", note: ".364 career ASG BA. 2 HR in 1941 ASG. 9 consecutive selections. His showcase." },
    { location: "Brooklyn / Ebbets Field", affinity: "MEDIUM", note: "Traded to Dodgers 1942. Clashed with Durocher 1943. Returned 1947-48 to help win pennant." },
    { location: "Manager's Office (Durocher)", affinity: "LOW", note: "Handed his uniform to Durocher. Retired rather than play for him. The principled stand." },
    { location: "Lost Lake", affinity: "NONE", note: "August 30, 1952. The storm. The capsized boat. The rescue attempt. The drowning. Age 40." },
  ],

  momentum: {
    hot_triggers: [
      "Hitting streaks — .385 in 1935. .300+ in 12 of 14 seasons. The bat was always warm.",
      "All-Star Games — .364 career ASG BA. His spotlight moments were always on the big stage.",
      "Principled teams — Vaughan performed best in stable, fair environments.",
      "Triples — when the gaps are open and the legs are fresh, Vaughan turns doubles into triples.",
    ],
    cold_triggers: [
      "Unjust management — Durocher's cruelty triggered Vaughan's rebellion and voluntary retirement.",
      "Trade/displacement — leaving Pittsburgh devastated him and the fans who loved him.",
      "Lack of team success — Pirates never won a pennant during his decade. The frustration was quiet but real.",
      "Obscurity — Vaughan's modesty meant he never advocated for himself. The world forgot him.",
    ],
    pressure_response: "PROVEN IN SHOWCASES, UNTESTED IN OCTOBER. Vaughan's .364 career All-Star Game BA is elite. His 2 HR in the 1941 ASG (the only player to hit 2 ASG HR until 2012) proves he rose to occasions. He hit .325 in 64 games helping Brooklyn win the 1947 pennant at age 35 — returning from a 3-year voluntary retirement. But he never played in a World Series. The Pirates never gave him one. Brooklyn reached it in 1947 but lost to the Yankees. The greatest shortstop never to play in a Fall Classic.",
  },

  action_card_seeds: [
    {
      title: "The Best Season by a Shortstop Since Wagner",
      type: "Game Action",
      text: "Your shortstop hits .385 with a .491 OBP and .607 SLG. His OPS+ is 190. He walks 97 times and strikes out only 18. He leads the league in batting, OBP, SLG, and walks. It's the best season by any NL shortstop since Honus Wagner. The same franchise. The same position. The same excellence.",
      origin: "1935: Vaughan's .385/.491/.607 season remains the Pirates' single-season record for BA, OBP, and OPS. His .385 is the NL SS record since 1900.",
    },
    {
      title: "Two Home Runs in the All-Star Game",
      type: "Game Action",
      text: "Your quiet shortstop — the man nobody talks about — hits two home runs in the All-Star Game. No player has ever done this before. He should be the hero. But in the bottom of the 9th, with the NL leading 5-4, the AL's Ted Williams hits a walk-off 3-run HR to win it. Your player's moment is stolen. Even his greatest showcase is overshadowed.",
      origin: "1941 ASG: Vaughan became the first player to hit 2 HR in an All-Star Game. Ted Williams' walk-off 3-run HR in the 9th stole the headlines.",
    },
    {
      title: "Handing the Uniform to Durocher",
      type: "Drama",
      text: "Your manager suspends a teammate unfairly. Your shortstop — the quietest man on the team — walks into the manager's office and hands him his uniform. 'I'm done.' The team follows him. Only 2 players show up the next day. The game starts 10 minutes late. Your shortstop then voluntarily retires for 3 years rather than play for this manager.",
      origin: "1943: After Durocher suspended Bobo Newsom, Vaughan led a near-mutiny. He retired voluntarily 1944-46, returning only after Durocher was suspended in 1947.",
    },
    {
      title: "Wagner's Roommate",
      type: "Action",
      text: "The greatest shortstop in history becomes your young player's roommate on road trips. He doesn't teach technique — his mere presence steadies the nervous kid. 'Of all the players I tried to help, he's the best and the one that went the farthest.' The passing of the torch from one HOF Pirate SS to the next.",
      origin: "Wagner was hired as a Pirates coach specifically to mentor Vaughan. They roomed together on the road. Vaughan's errors dropped and his confidence soared.",
    },
    {
      title: "The Ghost of Arky",
      type: "Drama",
      text: "Your franchise trades its best player. The fans are outraged. Years later, when the team struggles, they whisper about the star they let go. 'The Ghost of Arky' becomes the phrase for everything wrong with the franchise. The man is gone, but his absence haunts every losing season.",
      origin: "Pittsburgh fans coined 'The Ghost of Arky' after Vaughan's 1941 trade to Brooklyn. The phrase endured for years when the Pirates struggled.",
    },
    {
      title: "The Drowning at Lost Lake",
      type: "Drama",
      text: "Your retired legend goes fishing with a friend. A storm hits. The boat capsizes. His friend can't swim. Your player — a strong swimmer — tries to save him. Both men drown, 75 feet from shore. He was 40 years old. He died the way he lived: putting someone else first.",
      origin: "August 30, 1952: Vaughan drowned in Lost Lake near Eagleville, CA, trying to save friend Bill Wimer during a sudden storm. Both men perished.",
    },
    {
      title: "Eighteen Strikeouts in Five Hundred At-Bats",
      type: "Game Action",
      text: "Your shortstop strikes out 18 times in 499 at-bats. A K rate of 3.6%. He walks 97 times. He walks more than five times for every strikeout. He hits .385. Pitchers have no choice: throw it over the plate or he'll take first base. And if you throw it over the plate, he'll hit .385.",
      origin: "1935: Vaughan's 97 BB vs. 18 K is one of the most extreme BB/K ratios in a high-BA season in baseball history.",
    },
    {
      title: "The Comeback at Thirty-Five",
      type: "Game Action",
      text: "Your retired shortstop — three years away from baseball, ranching cattle in northern California — returns at age 35. He hits .325 in 64 games. His team wins the pennant. He played because the manager he hated was suspended. He proved he could still hit. Then he retired for good.",
      origin: "1947: Vaughan returned from voluntary retirement after Durocher's suspension. Hit .325 in 64 games for the pennant-winning Dodgers.",
    },
  ],

  art_direction: {
    face: "Lean, handsome, unassuming. 5'10\" 175 lbs. California kid with an Arkansas drawl. The face should show quiet intelligence — not intensity, not fury, just calm awareness. He looks like a man who knows exactly what pitch is coming and has already decided to take it or drive it into the gap.",
    attire: "Pittsburgh Pirates 1935 home whites with the classic 'P' on the cap. Forbes Field's spacious outfield behind him. The uniform should be clean, understated — no flash, no flair. This is the quietest superstar in baseball.",
    mood: "Silent mastery. The left-handed swing, compact and level, driving a line drive into the right-center gap. Or: the steal of third base, hip pocket dipping sand as he rounds the bag. The card should feel like water — smooth, calm, impossibly powerful beneath the surface.",
    style: "Pennsylvania steel-town palette meets California ranch warmth. Forbes Field's iron and concrete. Muted greens and browns. The card should feel understated — because Vaughan was the most understated great player in history. No fireworks. Just .385.",
    reference: "The card of the man Bill James called the 2nd greatest shortstop ever. The man Joe Posnanski called the least-known great player in history. The man who handed his uniform to Durocher and walked away. The man who drowned at 40 saving a friend. The Ghost of Arky.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG ≥ .600 → +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples ≥ 10 → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CON×2 + POW×2 + SPD×1 + DEF×1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function ArkyVaughanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = VAUGHAN_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Lean LH swing, Pirates whites, Forbes Field, quiet intensity, line drive to the gap, muted palette]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "HR", val: d.real_stats.home_runs },{ label: "3B", val: d.real_stats.triples },{ label: "BB", val: d.real_stats.walks },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1935 — NL SS RECORD .385 BA — 18 K IN 499 AB</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛 HOF 1985", "⭐ 9× All-Star", "👑 .385 BA (NL SS Record)", "📊 190 OPS+ (1935)", "💎 .318 Career BA", "🔥 .406 Career OBP", "🏆 2nd Best SS Ever (James)"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Vaughan's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Vaughan's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
