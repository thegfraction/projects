import { useState } from "react";

const PLAYER_DATA = {
  name: "Bobby Thomson",
  nickname: "The Flying Scot / The Staten Island Scot",
  year: 1951,
  team: "New York Giants",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "OF/3B",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "180 lbs",
  born: "October 25, 1923 — Glasgow, Scotland",
  died: "August 16, 2010 — Savannah, GA (age 86)",
  hof: "Not inducted. 3× All-Star (1948, 1949, 1952). Shot Heard 'Round the World. Bat in HOF.",

  real_stats: {
    season: 1951, games: 148, at_bats: 518, hits: 152, doubles: 27, triples: 8,
    home_runs: 32, rbi: 101, runs: 89, stolen_bases: 1, walks: 73, strikeouts: 57,
    batting_avg: ".293", obp: ".357", slg: ".528", ops: ".885", ops_plus: 133, war: 4.9,
    career_avg: ".270", career_hits: 1705, career_hr: 264, career_rbi: 1026,
    career_war: 35.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .293 BA → tier 3 (.270-.299). OPS+ 133 → +1 bonus (130+) = 4. CON = 4.
  // POW: 32 HR → tier 3 (30-39). SLG .528 → +1 bonus (.500+) = 4. POW = 4.
  // SPD: 1 SB, but 8 triples and played CF. Decent runner. SPD = 1.
  //   (Led NL in triples in 1952 with 14 — some speed.)
  // DEF: Played OF and 3B. Versatile but not elite at any position.
  //   Moved to 3B to make room for Mays. DEF = 0.
  // CLU: THE SHOT HEARD 'ROUND THE WORLD. The single most famous clutch moment
  //   in baseball history. But WS: .238, 0 HR. The Shot is a singular event.
  //   PS BA .238 → tier 0. But Shot = maximum hero moment → +1 = 1.
  //   Actually: the Shot transcends normal CLU calculation. CLU = 3 (SPECIAL OVERRIDE).
  //   The most famous single swing in baseball history warrants maximum clutch.
  // OVR: Good career (264 HR, 1,026 RBI) but not HOF. One transcendent moment.
  //   OVR = 7 (All-Star — defined by one legendary swing).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — solid career + the most famous moment in baseball history. Not HOF limits ceiling.
    con: 4,      // .293 BA → tier 3. OPS+ 133 → +1 = 4. Good hitter, not great.
    pow: 4,      // 32 HR → tier 3. SLG .528 → +1 = 4. Consistent power. 264 career HR.
    spd: 1,      // 1 SB in 1951. 8 triples. Led NL in 3B in 1952 (14). Some speed, not much.
    def: 0,      // Versatile (OF, 3B) but not elite anywhere. Moved for Mays. DEF = 0.
    clu: 3,      // SPECIAL OVERRIDE: The Shot Heard 'Round the World. Maximum CLU.
  },

  stat_justification: {
    con: "Thomson batted .293 in 1951, .309 in 1949 (career best). Career .270. OPS+ 133 narrowly clears the 130 bonus. He was a good, solid hitter — not an elite contact man. Eight 20-HR seasons show consistency. Rating of 4.",
    pow: "32 HR in 1951 (career high), 5th-best in the majors. 264 career HR over 15 seasons. Eight 20-HR seasons and four 100-RBI seasons. SLG .528 earns the bonus. Thomson was a reliable power threat — not Kiner or Mize level, but dangerous. Rating of 4.",
    spd: "1 SB in 1951. But 8 triples, and he led the NL in triples (14) in 1952 — showing legitimate speed for a power hitter. He played center field early in his career. Not a burner, but mobile. Rating of 1.",
    def: "Thomson was versatile: he played all three outfield positions and third base. In 1951, he moved to 3B to make room for rookie Willie Mays in CF. He was adequate everywhere but elite nowhere. No Gold Glove equivalent. Rating of 0.",
    clu: "SPECIAL OVERRIDE. Bobby Thomson hit the Shot Heard 'Round the World — the most famous single swing in baseball history. October 3, 1951: Giants trail 4-2 in the bottom of the 9th, 3-game playoff, pennant on the line. Thomson hits a 3-run walk-off HR off Ralph Branca. 'THE GIANTS WIN THE PENNANT! THE GIANTS WIN THE PENNANT!' However: his 1951 WS numbers were .238 with 0 HR — he vanished in the Fall Classic. The Shot earns maximum CLU because it is THE defining clutch moment in baseball. But the sign-stealing revelation creates a moral asterisk. Rating of 3 — with an asterisk.",
  },

  personality: {
    leadership_style: "The accidental hero. Thomson was a solid, dependable player — not the team's leader, not the franchise face. He moved to third base without complaint when Mays arrived. He was the quintessential team player who happened to be standing in the right place at the right time. His own words: 'I had a decent major-league career, but if I hadn't been in the right place at the right time, I would have vanished from sight and memory.'",
    temperament: "Humble, self-deprecating, gracious. Thomson carried the weight of the Shot for 59 years with remarkable grace. He befriended Ralph Branca — the man he destroyed — and they appeared together at events for decades. He never gloated, never exploited the moment excessively. When the sign-stealing was revealed, Branca said: 'Even if Bobby knew what was coming, he had to hit it.' Thomson's humility was genuine and lifelong.",
    work_ethic: "Consistent professional. Thomson was a reliable player for 15 years — eight 20-HR seasons, three All-Star selections, four 100-RBI seasons. He wasn't flashy, but he showed up. He moved positions when asked. He adapted when traded. He played in Japan at age 39 after his MLB career ended. The man worked.",
    lifestyle: "Glasgow to Staten Island to Basking Ridge. Born in Glasgow, Scotland — one of only six Scottish-born MLB players. Emigrated at age 2. Grew up on Staten Island, attended Curtis High School. After baseball: settled in New Jersey, worked in business. Married, raised a family. Lived a quiet, dignified life. Died in 2010 at 86 in Savannah, Georgia.",
    era_adaptability: "MODERATE. Thomson's .270 career average and solid power (264 HR) would make him a useful player in any era. His versatility (OF/3B) adds value. But he wouldn't be a star in the modern game — he'd be a solid regular, a 2-3 WAR player. His real value was situational: when the moment arrived, he delivered the biggest hit in history.",
    clubhouse_impact: "TEAM PLAYER. Thomson wasn't the loudest voice or the biggest personality. He was the guy who moved to third base when the manager asked. The guy who batted where he was told. The guy who showed up every day for 15 years. In ILB terms: Thomson is a +1 chemistry card — no drama, no ego, just dependable production. The Shot elevates him beyond his natural tier.",
    dark_side: "The telescope. In 2001, it was confirmed that the 1951 Giants used a telescope-and-buzzer system to steal signs from center field, beginning July 20 — the exact start of their 37-7 run. Several players told the Wall Street Journal that coach Herman Franks relayed signs to the dugout. Sal Yvars claimed he signaled Branca's fastball to Thomson before the Shot. Thomson always denied foreknowledge: 'I was too focused to pay attention.' Branca was skeptical but gracious: 'Even if Bobby knew, he had to hit it.' The moral question: Does the Shot count if the signs were stolen? In ILB terms: Thomson carries a 'Telescope Asterisk' trait. The Shot is real — but so is the shadow.",
  },

  chemistry_traits: [
    { tag: "The Shot Heard 'Round the World", desc: "The most famous single swing in baseball history. Once per game, Thomson can attempt a 'Shot' — if trailing in the 9th with runners on, +3 CLU for one at-bat." },
    { tag: "The Telescope Asterisk", desc: "The 1951 Giants stole signs using a telescope and buzzer. Thomson's Shot may have been aided. -1 to legitimacy. Opponents can challenge the Shot's validity." },
    { tag: "The Flying Scot", desc: "Born in Glasgow, Scotland. Emigrated at age 2. +1 international appeal. Rare Scottish-born MLB player." },
    { tag: "The Accidental Hero", desc: "'I would have vanished from sight and memory.' Thomson's humility is genuine. No ego penalties. +1 team chemistry." },
    { tag: "Branca's Friend", desc: "Thomson and Branca — hero and victim — became lifelong friends. +1 sportsmanship. Cancels rivalry grudge effects." },
    { tag: "Made Room for Mays", desc: "Thomson moved from CF to 3B so rookie Willie Mays could play. +1 selflessness. If paired with Mays, both get +1 chemistry." },
    { tag: "Broken Ankle, Aaron's Chance", desc: "Thomson broke his ankle in 1954 spring training, opening a roster spot for rookie Hank Aaron. History pivots on his injury." },
    { tag: "The Marine's Letter", desc: "A Korean War Marine wrote Thomson: his dying buddy's happiest moment was hearing the Shot on Armed Forces Radio. +1 legacy beyond baseball." },
  ],

  preferred_locations: [
    { location: "Batter's Box (9th inning, trailing)", affinity: "MAXIMUM", note: "The Shot. Down 4-2, bottom 9, pennant on the line. This is Thomson's moment." },
    { location: "Polo Grounds", affinity: "HIGH", note: "The Shot was hit at 3:58 PM, Oct 3, 1951, at the Polo Grounds. Sacred ground." },
    { location: "Outfield / Third Base", affinity: "MEDIUM", note: "Versatile but not elite. Played wherever the team needed him." },
    { location: "Staten Island / New Jersey", affinity: "HIGH", note: "Home. Curtis High School to Basking Ridge. Quiet life away from baseball." },
    { location: "Autograph Signings", affinity: "HIGH", note: "Thomson never refused an autograph. Thousands of signed baseballs still exist." },
    { location: "World Series", affinity: "LOW", note: ".238, 0 HR in 1951 WS. The Shot got them there; Thomson didn't deliver in the Fall Classic." },
    { location: "HOF Cooperstown", affinity: "NONE", note: "Not inducted. His bat is there, his spikes are there, his glove is there. He is not." },
  ],

  momentum: {
    hot_triggers: [
      "Trailing in late innings — Thomson's career-defining moment came when down 4-2 in the 9th. Adversity activates him",
      "Pennant race September/October — the Giants went 37-7 down the stretch. Thomson thrived in the pressure cooker",
      "Sold-out crowds — the Shot was witnessed by millions. Thomson played up in big moments",
    ],
    cold_triggers: [
      "World Series — .238 / 0 HR in the 1951 Fall Classic. The Shot used all his October magic",
      "Sign-stealing controversy — when the telescope is mentioned, Thomson's confidence and legacy waver",
      "Injuries — broken ankle in 1954 ended his peak and opened the door for Aaron",
    ],
    pressure_response: "THE MOST BINARY CLUTCH PLAYER IN HISTORY. Thomson's clutch profile is unique: he produced THE single greatest clutch moment in baseball history (the Shot), and then immediately followed it with a deeply mediocre World Series (.238, 0 HR). He is proof that clutch is not consistent — it can be a single, unrepeatable lightning strike. In ILB terms: Thomson gets a 'Lightning Strike' mechanic — once per postseason, he can activate a one-at-bat +3 CLU bonus. But outside that moment, he's an ordinary hitter under pressure.",
  },

  action_card_seeds: [
    {
      title: "The Shot Heard 'Round the World",
      type: "Game Action",
      text: "Bottom of the ninth. Your team trails 4-2. The pennant is on the line. Two runners on. The count is 0-1. Your outfielder-turned-third-baseman swings at a fastball up and in. The ball disappears into the left-field stands. Three runs score. Your announcer screams the same words four times. The pennant is won. The moment will never die.",
      origin: "October 3, 1951, 3:58 PM. Bobby Thomson hit a 3-run walk-off HR off Ralph Branca to win the NL pennant. Russ Hodges: 'THE GIANTS WIN THE PENNANT! THE GIANTS WIN THE PENNANT! THE GIANTS WIN THE PENNANT! THE GIANTS WIN THE PENNANT!'",
    },
    {
      title: "The Telescope in Center Field",
      type: "Drama",
      text: "Your team installs a telescope in the clubhouse behind center field. A coach steals the opposing catcher's signs and relays them to the dugout via buzzer. The team goes 37-7 down the stretch. They win the pennant on a walk-off home run. Fifty years later, the truth comes out. Was the homer real?",
      origin: "Confirmed in 2001: the 1951 Giants used a telescope-and-buzzer system to steal signs beginning July 20. The team went 37-7. Thomson always denied foreknowledge. Branca: 'Even if Bobby knew, he had to hit it.'",
    },
    {
      title: "The Friend He Destroyed",
      type: "Drama",
      text: "Your hero hit the home run that destroyed another man's career. The pitcher was never the same — he never won more than 4 games in a season again. But the hero and the pitcher become friends. They appear together for decades. They need each other. One cannot exist without the other.",
      origin: "Thomson and Branca became lifelong friends, appearing together at events for 50+ years. Branca's career collapsed after the Shot (never won more than 4 games again). They were linked forever — hero and victim, inseparable.",
    },
    {
      title: "Making Room for Mays",
      type: "Drama",
      text: "Your veteran outfielder is asked to move from center field to third base — a position he's never played — to make room for a 20-year-old rookie. He agrees without complaint. The rookie becomes the greatest center fielder in history. The veteran hits a home run that becomes the most famous in history. Both are in the lineup for the Shot.",
      origin: "Thomson moved from CF to 3B when Willie Mays arrived in May 1951. Mays was on deck when Thomson hit the Shot. Both careers were defined that day.",
    },
    {
      title: "The Broken Ankle That Made Hank Aaron",
      type: "Drama",
      text: "Your veteran breaks his ankle in spring training. A 20-year-old rookie gets his roster spot. The rookie becomes one of the 5 greatest players in baseball history. The veteran's injury was the door through which greatness walked.",
      origin: "Thomson broke his ankle in spring 1954 with the Braves. Rookie Hank Aaron took his roster spot and never gave it back. Aaron hit 755 career home runs.",
    },
    {
      title: "13½ Games Back",
      type: "Game Action",
      text: "It's mid-August. Your team is 13½ games behind the league leaders. The season is over. Except it isn't. Your team wins 37 of 44 games. They catch the leaders on the final day. They force a 3-game playoff. Then your hitter delivers the most famous home run in history.",
      origin: "August 1951: Giants trailed Dodgers by 13½ games. They went 37-7 to tie Brooklyn on the season's final day, forcing the playoff that produced the Shot.",
    },
    {
      title: "The Marine's Letter",
      type: "Drama",
      text: "Decades after the famous home run, your retired hero receives a letter from a Korean War Marine: 'My buddy and I were in a bunker on the front line, listening against orders. He was your biggest fan. He didn't make it home. On his behalf — thank you, Bobby.' The hero weeps.",
      origin: "In the 1990s, Thomson received a letter from a Marine stationed in Korea. His buddy, a Giants fan, heard the Shot on Armed Forces Radio. It was the happiest moment of his life. He died in combat. The surviving Marine wrote Thomson 40 years later.",
    },
    {
      title: "I Would Have Vanished from Memory",
      type: "Drama",
      text: "Your retired hero reflects on his career: 'I had a decent major-league career, but without that one swing, I would have vanished from sight and memory, never to be heard from again.' The humility is genuine. One swing separated obscurity from immortality.",
      origin: "Thomson's own words about the Shot. He understood that his 15-year career — 264 HR, 3 All-Star selections — would not have been remembered without that single moment.",
    },
  ],

  art_direction: {
    face: "6'2\" 180 lbs, lean and athletic. Scottish-born, raised on Staten Island. Handsome in a quiet, unassuming way. The face of a man who never expected to be famous and carried the weight of it with grace. Not a movie star — an everyman who happened to live a dream.",
    attire: "New York Giants home whites, 1951 style. Number 23. Right-handed batter in the moment of contact — the follow-through of THE swing. Or: rounding the bases, surrounded by teammates rushing the field, pure chaos and joy.",
    mood: "The moment between the swing and the knowledge. Thomson said it felt like a dream — 'everything was hazy.' The card should capture that surreal quality: the ball in flight, the crowd rising, the announcer screaming, and Thomson between worlds — not yet knowing what he's done. The most electrifying 4 seconds in baseball history, frozen.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. The Polo Grounds — the horseshoe-shaped cathedral where the Shot landed. The left-field stands, the 315 marker, the ball disappearing into history. The card should feel like a myth — because that's what the Shot became.",
    reference: "This is baseball's Zapruder film, its moon landing, its 'Mr. Gorbachev, tear down this wall.' One swing that every American knew about. The card must balance Thomson's humility (he was not a legend before or after) with the moment's enormity. The man was ordinary. The moment was eternal.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "No PS", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS/pennant hero moment → +1 (cap 3). SPECIAL: Iconic moments may override tiers." },
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

export default function BobbyThomsonCard() {
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
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}</button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, the follow-through of THE swing, Giants #23, Polo Grounds]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.hotRed}30`, color: C.hotRed, padding: "2px 12px", borderRadius: 10, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>THE SHOT</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.hotRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.gold} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.hotRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>1951 — THE SHOT HEARD 'ROUND THE WORLD</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "ALL-STAR", val: "3×" },{ label: "20-HR SZN", val: "8×" },{ label: "100-RBI", val: "4×" },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 15 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["💥 The Shot", "⭐ 3× All-Star", "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Born Glasgow", "🔭 Telescope?", "🤝 Branca's Friend", "📻 Korea Marine", "🦅 Made Room for Mays", "🎖️ Aaron's Door"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : l.affinity === "MAXIMUM" ? `${C.hotRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : l.affinity === "MAXIMUM" ? C.hotRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Thomson's real life, universalized for any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Hitter Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Thomson's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "All-Star", stats: d.ilb_stats, special: "THE SHOT — CLU override", chemistry_traits: d.chemistry_traits.map(t => t.tag), action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
