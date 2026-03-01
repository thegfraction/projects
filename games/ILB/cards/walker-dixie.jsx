import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: DIXIE WALKER
  // Year Snapshot: 1944 (NL Batting Champion, .357, 3rd in MVP)
  // ═══════════════════════════════════════════════════════════════

  name: "Dixie Walker",
  nickname: "The People's Cherce",
  year: 1944,
  team: "Brooklyn Dodgers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "RF",
  bats: "L",
  throws: "R",
  height: '6\'1"',
  weight: "175 lbs",
  born: "September 24, 1910 — Villa Rica, GA",
  died: "May 17, 1982 — Birmingham, AL (age 71)",
  hof: "Not inducted. NL Batting Champion 1944. 5× All-Star. First NL Player Representative. Career .306 BA.",

  real_stats: {
    season: 1944,
    games: 148,
    at_bats: 535,
    hits: 191,
    doubles: 37,
    triples: 8,
    home_runs: 13,
    rbi: 91,
    stolen_bases: 4,
    batting_avg: ".357",
    obp: ".414",
    slg: ".529",
    ops: ".943",
    ops_plus: 164,
    war: 5.5,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 5,
    career_avg: ".306",
    career_hits: 2064,
    career_hr: 105,
    career_rbi: 1023,
    career_war: 37.4,
  },

  // ═══════════════════════════════════════════════════════════════
  // HITTER STAT CONVERSION ENGINE
  //
  // CON: .357 BA → tier 5 (.330+). OPS+ 164 → +1 bonus (130+) = 6, capped at 5.
  // POW: 13 HR → tier 1 (10-19). SLG .529 → +1 bonus (.500+) = 2.
  // SPD: 4 SB → tier 0 (0-5). No GG CF bonus. SPD = 0.
  // DEF: Led NL RF in range factor 4×, assists, putouts, fielding %.
  //   Pre-GG equivalent ~2-3 GG. DEF = 1.
  // CLU: 1941 WS: .222 BA. 1947 WS: limited. No hero moment. CLU = 0.
  // OVR: .306 career, 2,064 hits, batting champ, 5× All-Star, but
  //   no WS ring, wartime peak, no HOF. OVR = 7 (All-Star tier).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — batting champion, 5× All-Star, but wartime peak and no ring
    con: 5,      // .357 BA → tier 5. OPS+ 164 → bonus, capped at 5. Maximum contact.
    pow: 2,      // 13 HR → tier 1. SLG .529 → +1 bonus = 2. Line-drive power.
    spd: 0,      // 4 SB in 1944. Not a runner — lingering knee/shoulder injuries slowed him.
    def: 1,      // Led NL RF in range factor 4×, assists, fielding %. Pre-GG ~2-3 equiv. DEF = 1.
    clu: 0,      // WS: .222 in 1941, limited in 1947. No hero moment. Never won a ring. CLU = 0.
  },

  stat_justification: {
    con: "Led the NL with .357 BA in 1944 — beat Stan Musial by 10 points. Hit .300+ in 7 of 8 seasons with the Dodgers. Career .306 over 18 seasons. 2,064 career hits. Hit for the cycle on September 2, 1944. Pull hitter with excellent bat control. Baseball Almanac notes his .363 average led all of MLB that year. Maximum contact rating.",
    pow: "13 HR in 1944. Career 105 HR — moderate power. But SLG .529 earns the bonus (above .500). Walker was a line-drive doubles hitter (37 2B in 1944, 274 career). Led NL in RBI with 124 in 1945. He had gap power, not fence-clearing power. Rating of 2.",
    spd: "Only 4 SB in 1944. Walker's career was plagued by recurring shoulder and knee injuries that sapped his speed. He was once considered fast enough to replace Babe Ruth — but by his prime years, he was a station-to-station player. No speed value. Rating of 0.",
    def: "Walker led NL right fielders in range factor per game in 1941, 1942, 1943, and 1945. Led in assists in 1941 and 1945. Led in fielding percentage in 1945. Led in putouts in 1945. He was an excellent defensive right fielder with a fine throwing arm despite the shoulder injuries. Pre-Gold Glove equivalent: ~2-3 GG. Rating of 1.",
    clu: "1941 World Series: .222 BA (4-for-18), 1 RBI. Dodgers lost to Yankees in 5 games. 1947 World Series: limited role as Robinson-controversy fallout benched him. Never won a World Series. No hero moments. Career postseason: .222/.300/.356. Rating of 0.",
  },

  personality: {
    leadership_style: "Populist star, fan-driven authority. Walker's power came from the crowd — he was 'The People's Cherce' because Brooklyn adored him. He leveraged that popularity into real institutional power: he became the first NL Player Representative, negotiating the pension plan with owners and insisting on TV World Series revenues. He led through popularity and political savvy, not physical intimidation.",
    temperament: "Complex, charming, deeply conflicted. Walker was charismatic enough to be Brooklyn's biggest star and savvy enough to negotiate the first player pension. But he was also a product of segregated Alabama who organized a petition against Jackie Robinson. He was not a simple villain — he later acknowledged Robinson's talent and requested his trade letter back. But he never fully escaped the contradiction between his public charm and his private prejudice.",
    work_ethic: "Resilient comeback artist. Walker was nearly finished before Brooklyn. Recurring shoulder injuries from a 1931 fence crash, plus a 1939 knee injury, had made him a waiver-wire castoff. The Dodgers bought him for nothing, and he reinvented himself into a batting champion. He overcame injuries that would have ended most careers. He also worked steel mills as a teenager before baseball.",
    lifestyle: "Southern through and through. Born in Villa Rica, Georgia, grew up in Birmingham, Alabama. Ran a hardware and sporting goods store in Leeds, Alabama during offseasons. The store put him in daily contact with segregationist customers who pressured him about Robinson. Baseball family: father Ewart pitched for the Senators, brother Harry won a batting title with the Cardinals, uncle Ernie played for the Browns. After baseball, became a hitting coach — worked with the Dodgers from 1968-74.",
    era_adaptability: "MODERATE. Walker's .306 career average and line-drive approach would play in any era. His OBP (.383 career) shows good plate discipline. But his lack of speed and modest power would limit his modern value. His defensive skills in right field were legitimate. The biggest adaptation challenge: Walker's segregationist views would be career-ending in any modern context.",
    clubhouse_impact: "POLARIZING-COMPLEX. Walker was beloved by Brooklyn fans and respected by teammates for his hitting. But the Robinson petition fractured the clubhouse. Some teammates followed Walker; others (like Pee Wee Reese) refused. Leo Durocher shut it down: 'I don't care if the guy is yellow or black...I say he plays.' Walker's influence was enormous — but he chose the wrong side of history. Later, he acknowledged Robinson's greatness and became a respected hitting coach for the Dodgers.",
    dark_side: "The Robinson petition. Walker organized a player petition opposing Jackie Robinson joining the Dodgers in 1947 and wrote to Branch Rickey asking to be traded. He cited pressure from his Alabama customers: 'Do you mean you shower with this guy?' By season's end, Walker told the Sporting News that Robinson had done more than anyone to put the Dodgers in the pennant race. But Rickey traded him to Pittsburgh for $1 after the season. In ILB terms: Walker carries a 'Wrong Side of History' trait — his legacy is forever scarred. This trait creates negative chemistry with Black players and progressive teammates, but Walker can evolve: a 'Redemption Arc' event can partially restore his reputation.",
  },

  chemistry_traits: [
    { tag: "The People's Cherce", desc: "Brooklyn's most popular player. +2 fan morale at Ebbets Field. Home crowd goes wild when Walker bats." },
    { tag: "Batting Champion", desc: "1944 NL batting title (.357). +1 CON in home ballpark. Walker's swing was perfectly tailored to Ebbets Field's dimensions." },
    { tag: "Player Rep Pioneer", desc: "First NL Player Representative. Negotiated the first player pension plan. +1 respect from all teammates for fighting for their financial future." },
    { tag: "Wrong Side of History", desc: "Organized petition against Robinson in 1947. -2 chemistry with Black players. -1 chemistry with progressive teammates. Creates clubhouse tension events." },
    { tag: "Redemption Arc", desc: "Walker acknowledged Robinson's greatness by season's end. If 'Wrong Side' event triggers and Walker witnesses Robinson's excellence, 50% chance of converting to neutral or positive chemistry." },
    { tag: "Comeback King", desc: "Written off as a waiver-wire castoff. Reinvented himself into a star. +1 resilience — Walker recovers from injuries and slumps faster than average." },
    { tag: "Baseball Bloodlines", desc: "Father, brother, uncle all played in the majors. Baseball intelligence is hereditary. +1 to hitting approach and situational awareness." },
    { tag: "Hardware Store", desc: "Ran a sporting goods store in segregated Alabama. Community pressure shaped his views. -1 to era adaptability when placed in progressive social contexts." },
  ],

  preferred_locations: [
    { location: "Batter's Box / Practice Field", affinity: "HIGH", note: "Natural hitter. .306 career. Batting champion. Became one of the best hitting coaches in baseball." },
    { location: "Ebbets Field / Home Park", affinity: "HIGH", note: "The People's Cherce. Brooklyn adored him. .311 BA as a Dodger." },
    { location: "Hardware Store / Business", affinity: "HIGH", note: "Ran sporting goods store in Leeds, Alabama. Working-class roots, business-minded." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected hitter, popular with fans. But the Robinson controversy divided the room." },
    { location: "Southern Home / Alabama", affinity: "HIGH", note: "Born Georgia, lived Alabama. Deep Southern identity shaped everything." },
    { location: "Bar / Social Events", affinity: "MEDIUM", note: "Charming, popular. Good with people one-on-one. But segregation-era social circles." },
    { location: "Integration Events", affinity: "LOW", note: "Deeply uncomfortable with integration in 1947. Later evolved as hitting coach for diverse Dodger teams." },
  ],

  momentum: {
    hot_triggers: [
      "Games against the Giants — Walker hit .436 vs. NY in 1940, fueling the rivalry",
      "Batting title races — Walker thrived under the pressure of statistical competition",
      "Fan energy at Ebbets Field — the Brooklyn crowd lifted Walker's performance",
      "Comeback scenarios — Walker's career was one long comeback from injury and obscurity",
    ],
    cold_triggers: [
      "World Series pressure — .222 in 1941, limited role in 1947. Never won a ring",
      "Integration tension — the 1947 Robinson situation consumed Walker and hurt his focus",
      "Recurring injuries — shoulder, knee, and other ailments could flare up unpredictably",
    ],
    pressure_response: "REGULAR SEASON HERO, OCTOBER GHOST. Walker was magnificent during the season — five consecutive All-Star selections, a batting title, an RBI crown, five top-10 MVP finishes. But in October, he disappeared. His .222 career postseason average tells the story. The People's Cherce was beloved in the regular season but never delivered the defining October moment that would have cemented his legend. In ILB terms: Walker gets +1 CON during the regular season in front of home crowds, but -1 in World Series play.",
  },

  action_card_seeds: [
    {
      title: "The People's Cherce",
      type: "Drama",
      text: "A waiver-wire castoff arrives at a new ballpark. The fans adopt him immediately. He becomes the most popular player in the franchise. They give him a nickname in their own dialect. He belongs to them — not to management, not to the press. The people chose him.",
      origin: "Walker was claimed off waivers by Brooklyn in 1939 for nothing. He became Ebbets Field's biggest star. 'The People's Cherce' was Brooklynese for 'The People's Choice.'",
    },
    {
      title: "The Petition",
      type: "Drama",
      text: "Your team's most popular player circulates a petition against a new teammate joining the roster. The manager calls a midnight meeting and says: 'I don't care if he has stripes like a zebra. He plays.' The petition dies. But the damage to the petitioner's legacy is permanent.",
      origin: "Walker organized a Dodgers player petition opposing Jackie Robinson in 1947. Durocher shut it down in a famous midnight meeting. Walker asked Rickey to trade him.",
    },
    {
      title: "Hit for the Cycle",
      type: "Game Action",
      text: "Your batting champion hits a single, double, triple, and home run in one game. The home run clears the right field wall and goes through an opening in the screen, onto the street. He raises his average to .361. It's one of the best days of hitting anyone has ever seen.",
      origin: "September 2, 1944. Walker hit for the cycle vs. the Giants. His HR went through the Ebbets Field screen onto Bedford Avenue. He raised his average to .361 and his OPS to .980.",
    },
    {
      title: "The $1 Trade",
      type: "Drama",
      text: "Your franchise's most popular player organized the petition. He asked to be traded. By season's end, he admitted the new teammate was the best player on the team. But the owner trades him anyway — for one dollar. The price tag is the insult. The message is clear.",
      origin: "After the 1947 season, Rickey sent Walker to Pittsburgh as part of a deal. The symbolic sting: Brooklyn's biggest star, traded away because he stood on the wrong side.",
    },
    {
      title: "Ruth's Successor — Or Not",
      type: "Drama",
      text: "Your prospect is signed for a record bonus as the designated successor to the greatest player in franchise history. Then he crashes into a fence and tears his shoulder. Surgery follows surgery. He bounces through three teams. Everyone writes him off. Then he wins a batting title.",
      origin: "Walker was signed by the Yankees in 1930 for $25,000 as Babe Ruth's successor. A 1931 fence collision wrecked his shoulder. He was waived, traded, written off — then won the 1944 NL batting title.",
    },
    {
      title: "The First Player Rep",
      type: "Action",
      text: "Your star player becomes the first player representative recognized by the owners. He negotiates a pension plan for all players. He insists that World Series TV revenues fund the plan. The owners agree. Every player who retires after this moment owes him a debt.",
      origin: "After the 1946 season, Walker became the first NL Player Representative. He negotiated the first player pension plan and insisted on including TV World Series revenues — a visionary financial move.",
    },
    {
      title: "The Redemption Coach",
      type: "Action",
      text: "The man who organized the petition against the Black player returns to the same franchise twenty years later — as a hitting coach. He works with players of all races. The owner presents him with a silver bat honoring his batting title. The circle closes, imperfectly.",
      origin: "In 1968, Walker returned to the Dodgers as hitting coach, serving until 1974. Walter O'Malley gave him a silver bat honoring his 1944 batting title and included him in his personal all-time Dodgers outfield.",
    },
    {
      title: "The Hardware Store Dilemma",
      type: "Drama",
      text: "Your star player goes home to his segregated Southern town in the offseason. His customers ask: 'Do you shower with this guy? Do you eat with this guy?' He has to choose between his teammates and his community. He chooses wrong — but he's not entirely free to choose.",
      origin: "Walker's Leeds, Alabama hardware store put him face-to-face with segregationist pressure. He later said the petition wasn't about Robinson personally, but about the impossible position between his two worlds.",
    },
  ],

  art_direction: {
    face: "6'1\" 175 lbs, lean and athletic. Southern-handsome — sandy hair, open face, easy smile. The charm that made Brooklyn love him. But look deeper — there's complexity in the eyes. This is a man who was both 'The People's Cherce' and the organizer of the Robinson petition. The face should be warm but troubled.",
    attire: "Brooklyn Dodgers home whites, 1944 style. Classic wartime-era flannel, 'Dodgers' across the chest. Left-handed batter in a smooth, compact swing — the line drive heading to right-center, the follow-through of a batting champion.",
    mood: "Populist warmth with an undercurrent of conflict. Ebbets Field roaring behind him, the Brooklyn crowd chanting his name. But somewhere in the shadows, the petition. The card should feel like a man who was everything to a community — and then wasn't.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Ebbets Field in the 1940s — intimate, packed, the fans close enough to touch. The card should feel like Brooklyn at its peak: loud, passionate, complicated.",
    reference: "Think the contradiction at the heart of wartime baseball: a beloved star, a batting champion, a pioneer of player rights — who also tried to keep Jackie Robinson off his team. The card should hold both truths simultaneously.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function DixieWalkerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Allies Era</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, compact LH swing, Dodgers uniform, Ebbets Field]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 18 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 1944 NL Batting Champ", "⭐ 5× All-Star (43-47)", "📊 .306 Career BA", "💪 124 RBI in '45", "🔄 Hit for the Cycle", "📜 1st NL Player Rep", "🏟️ People's Cherce", "⚠️ Robinson Petition"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}><div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div><div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Walker's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Hitter Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Standard hitter engine: CON/POW/SPD/DEF/CLU.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Walker's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
