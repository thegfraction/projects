import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: GEORGE KELL
  // Year Snapshot: 1950 (Peak Season — Led AL in Hits & Doubles)
  // ═══════════════════════════════════════════════════════════════

  name: "George Kell",
  nickname: "The Arkansas Traveler",
  year: 1950,
  team: "Detroit Tigers",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "3B",
  bats: "R",
  throws: "R",
  height: '5\'9"',
  weight: "175 lbs",
  born: "August 23, 1922 — Swifton, AR",
  died: "March 24, 2009 — Swifton, AR",
  hof: "Inducted 1983 (Veterans Committee). 10× All-Star, 1× batting champion, .306 career BA, 2,054 hits, led AL 3B in fielding % 7 times.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1950 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject, HOF
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1950,
    games: 157,
    at_bats: 641,
    hits: 218,
    doubles: 56,
    triples: 6,
    home_runs: 8,
    rbi: 101,
    stolen_bases: 3,
    batting_avg: ".340",
    obp: ".396",
    slg: ".474",
    ops: ".870",
    ops_plus: 130,
    war: 5.5,
    all_star: 10,
    career_avg: ".306",
    career_hits: 2054,
    career_hr: 78,
    career_sb: 51,
    career_war: 37.1,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON) — .340 BA → tier 5 (.330+). OPS+ 130 ≥ 130 → +1, capped at 5.
  // POWER (POW) — 8 HR → tier 0 (0-9). SLG .474 < .500 → no bonus. POW 0.
  // SPEED (SPD) — 3 SB → tier 0 (0-5). No CF/SS GG bonus (3B). SPD 0.
  // DEFENSE (DEF) — Led AL 3B in fielding % 7 times. Led in assists 4 times.
  //   Universally regarded as premier defensive 3B of his era. Equivalent 6+ GG.
  //   DEF 3.
  // CLUTCH (CLU) — Never played in the World Series. Won batting title by
  //   .0002 over Ted Williams in 1949 — denying Williams Triple Crown.
  //   Regular-season clutch in tight races but no October stage. CLU 1.
  // OVERALL (OVR) — CON 5×2=10 + POW 0×1.5=0 + SPD 0×1=0 + DEF 3×0.5=1.5 = 11.5 raw.
  //   HOF (Veterans), 10× All-Star, .306 career BA, elite defensive 3B.
  //   But: no power, no speed, no postseason. Solid All-Star tier → OVR 8.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star tier — elite contact + elite defense at 3B, zero power/speed, no October
    con: 5,      // .340 in 1950, .343 batting title in 1949, .306 career. Only 287 K in 6,702 career AB.
    pow: 0,      // 8 HR in 1950, 78 career. SLG .474 misses .500 bonus. A pure line-drive doubles hitter.
    spd: 0,      // 3 SB in 1950, 51 career. Not a speed player.
    def: 3,      // Led AL 3B in fielding % 7 times, assists 4 times. Premier defensive 3B of the era. 6+ GG equivalent.
    clu: 1,      // Never played in postseason. But won 1949 batting title by .0002 over Williams in final-day drama. Clutch in races, not in October.
  },

  stat_justification: {
    con: "Hit .340 in 1950 with 218 hits (led AL) and 56 doubles (led AL). Won the 1949 batting title at .343, beating Ted Williams by .0002 — the closest batting race in AL history — and denying Williams his third Triple Crown. Career .306 BA with only 287 strikeouts in 6,702 at-bats (one K every 23.4 AB). In 1949, he struck out only 13 times — the lowest total for a batting champion in baseball history. OPS+ 130 in 1950 meets the bonus threshold, capped at 5. Maximum contact.",
    pow: "8 HR in 1950 — tier 0 (0-9 HR). Only 78 career HR in 15 seasons. SLG .474 in 1950 — falls short of the .500 bonus threshold. Kell was a pure line-drive hitter: 56 doubles but only 8 home runs. His 385 career doubles show gap power, but the ball did not leave the park. POW 0.",
    spd: "3 SB in 1950, 51 career across 15 seasons. Kell was not a speed player. Played third base — no CF/SS Gold Glove bonus available. SPD 0.",
    def: "Kell led AL third basemen in fielding percentage seven times and in assists four times. He was universally regarded as the best defensive third baseman in the American League throughout the late 1940s and 1950s. Made only 9 errors in 157 games in 1950 (.982 fielding %). The HOF specifically cited his defense as a key reason for induction. He mentored a young Brooks Robinson during their shared time in Baltimore. Equivalent to 6+ Gold Gloves. DEF 3.",
    clu: "Kell never played in the World Series — he played for the Tigers, Red Sox, White Sox, and Orioles during their non-contending years. However, his 1949 batting title race against Ted Williams was one of the most dramatic finishes in AL history. Kell went 2-for-3 on the final day while Williams went 0-for-2, giving Kell the title by .34291 to .34276. That's clutch in a batting race, but not postseason clutch. CLU 1 for the batting title drama.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Gentle authority. Kell never raised his voice, never argued with umpires, and never caused a scene. He led by consistent excellence and Southern courtesy. Umpires loved him — one article noted he was among the most respected players of his era precisely because he let his play speak. His leadership was the polar opposite of Williams' volcanic approach: quiet, steady, professional.",
    temperament: "Warm, humble, unfailingly gracious. Kell was the most well-liked player in the set. His HOF induction speech began: 'I have always said that George Kell has taken more from this great game of baseball than he can ever give back.' That self-deprecating humility was genuine. He was an Arkansas gentleman through and through — soft-spoken, appreciative, and deeply aware of how fortunate he was.",
    work_ethic: "Blue-collar, relentless, self-made. Kell was cut by the Durham Bulls before Lancaster signed him. His wife Charlene told him: 'You are a ballplayer, not a factory worker.' He responded by hitting .396 in the minors and never looking back. His preparation was methodical — he didn't have Williams' genius or DiMaggio's natural gifts, but he refined his line-drive swing and his glovework until both were among the best in the league.",
    lifestyle: "Small-town Arkansas roots, lifelong. Born in Swifton, died in Swifton. Married Charlene for 50 years until her death in 1991. Owned a car dealership (George Kell Motors) in Newport, AR. Served on the Arkansas State Highway Commission for 10 years. Broadcast Tigers games for 37 years. His life was baseball, Arkansas, and family — in that order.",
    era_adaptability: "MODERATE. Kell's contact-first, no-power profile would be severely undervalued by modern analytics. A .306/.367/.414 line at third base would make him a below-average regular in today's power-oriented game. His elite defense at third base would still translate, but the 78 career HR would be disqualifying for most modern rosters. He is a creature of his era — perfectly suited to 1940s/50s baseball, out of place in 2020s.",
    clubhouse_impact: "UNIVERSALLY BELOVED. Kell was the teammate everyone wanted. He never created drama, always worked hard, hit line drives, played elite defense, and went home to his family. He mentored Brooks Robinson in Baltimore — passing the torch at third base from one HOFer to another. His post-career as a broadcaster for 37 years in Detroit cemented his legacy as one of baseball's great ambassadors.",
    dark_side: "The soft ceiling. Kell was inducted by the Veterans Committee, not the BBWAA — his career numbers (.306/78 HR/870 RBI) aren't overwhelming for a HOFer, and modern analytics communities debate whether he belongs in Cooperstown. His Hall Rating (67 on the Hall of Stats scale, where 100 is borderline) suggests he's below the HOF threshold by modern standards. In ILB terms: Kell is the safest, most reliable card in the set — but he will never be the best player on any championship team. He is the role player who never lets you down but never carries you either. The ceiling is real, and it is lower than his smile might suggest.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Arkansas Gentleman", desc: "Soft-spoken Southern courtesy. +2 chemistry with all teammates. Cannot trigger or be targeted by drama events. Umpires give him benefit of the doubt on close calls." },
    { tag: "Line Drive Machine", desc: "56 doubles in 1950. Kell hits the ball hard but flat. +1 CON in situations where contact is required (sacrifice flies, hit-and-run). Cannot hit home runs in clutch moments." },
    { tag: "Ironclad Glove", desc: "Led AL 3B in fielding % 7 times. -1 to opponent's batting average when hitting to the left side of the infield. Turns double plays with surgical precision." },
    { tag: "Robinson's Mentor", desc: "+3 chemistry with Brooks Robinson specifically. When paired on a roster, Robinson gains +1 DEF. Kell passes the torch with grace." },
    { tag: "The .0002 Title", desc: "Won 1949 batting title over Williams by .34291 to .34276 — the closest in AL history. In any season-ending batting race, Kell gains +1 CON for the final week." },
    { tag: "DiMaggio's Line Drive", desc: "Jaw broken by a DiMaggio smash — made the play at third, then passed out. Kell is immune to being removed from the game for non-critical injuries. He finishes every play." },
    { tag: "Never Argued", desc: "Never argued with umpires. Zero career ejections. Kell cannot be ejected from any game under any circumstances. Team discipline +1." },
    { tag: "The Voice of Detroit", desc: "37-year broadcasting career. Post-retirement, Kell generates +2 legacy modifier. His fame grows after playing, not during." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Farm / Rural Area", affinity: "HIGH", note: "Born and died in Swifton, AR (population ~800). The quintessential small-town ballplayer." },
    { location: "Broadcast Booth", affinity: "HIGH", note: "'Good EVE-ning, everyone!' 37 years calling Tigers games. The booth was his second home." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Universally beloved teammate. Mentored younger players. Zero drama." },
    { location: "Batting Cages / Practice", affinity: "MEDIUM", note: "Methodical hitter, not a genius. Refined his craft through repetition." },
    { location: "Church / Community", affinity: "MEDIUM", note: "Swifton United Methodist Church. Deep community roots." },
    { location: "Spotlight / Media", affinity: "LOW", note: "Comfortable behind a microphone but uncomfortable being the star. Preferred to spotlight others." },
    { location: "Bar / Nightlife", affinity: "NONE", note: "Not a nightlife person. Home by dinnertime. Married 50 years to the same woman." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Batting races — Kell elevated in tight batting title competitions (1949 title, 1950 near-title)",
      "Consistent playing time — Kell thrived on routine; 157 games in 1950, 152 in 1947",
      "Team chemistry — when the clubhouse was harmonious, Kell's average rose",
      "Double-header situations — more at-bats meant more opportunities for his line-drive approach",
    ],
    cold_triggers: [
      "Injuries — limited to 92 games in 1948, average dropped to .304",
      "Trades — Kell was surprised and hurt by trades (A's to Tigers, Tigers to Red Sox)",
      "End-of-career decline — last three seasons saw average drop below .300",
    ],
    pressure_response: "STEADY AND RELIABLE. Kell is not a pressure performer in the dramatic sense — he won't hit walk-off home runs or deliver October heroics. He simply maintains his standard. In ILB: Kell performs at exactly his OVR in all situations. He never rises above it, but he never falls below it either. He is the metronome of the set — you always know what you're getting. His 1949 batting title race is the exception that proves the rule: when the pressure was purely about contact and consistency (his strengths), he delivered. When it requires power or October stage presence, he reverts to his baseline.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Closest Batting Title in History",
      type: "Game Action",
      text: "Your third baseman and an opposing superstar are locked in a season-long batting race. On the final day, your player goes 2-for-3 while the rival goes 0-for-2. Your player wins the batting title by .0002. +2 fame, +1 CLU. The rival is denied a Triple Crown.",
      origin: "In 1949, Kell edged Ted Williams .34291 to .34276 for the AL batting title — the closest margin in AL history. Williams would have won the Triple Crown had he won the batting title. Kell went 2-for-3 on the final day while Williams went 0-for-2.",
    },
    {
      title: "Made the Play, Then Passed Out",
      type: "Game Action",
      text: "A line drive off a superstar's bat breaks your third baseman's jaw. He fields the ball, throws to first for the out, and then collapses unconscious. Your player misses 2 weeks but gains +2 fame and +1 DEF permanently. The legend grows.",
      origin: "Joe DiMaggio hit a line drive that broke Kell's jaw. Kell fielded the ball, completed the throw to first base for the out, and then collapsed unconscious on the field. He later said: 'I got up, made the play at third, then passed out.'",
    },
    {
      title: "'You Are a Ballplayer, Not a Factory Worker'",
      type: "Drama",
      text: "Your minor leaguer is cut by his team and calls home, ready to quit baseball for a construction job. His wife refuses to let him quit. He stays in baseball and is signed by a new team within days. +1 CON permanently. The wife was right.",
      origin: "After being cut by Durham, Kell called his wife Charlene to tell her he was taking a factory job. She said: 'You are a ballplayer, not a factory worker.' He stayed, was signed by Lancaster, hit .396, and reached the majors within months.",
    },
    {
      title: "Passing the Hot Corner",
      type: "Drama",
      text: "Your aging Hall of Fame third baseman shares the position with a 20-year-old rookie who will also become a Hall of Famer. The veteran mentors the rookie with patience and grace. Both players gain +1 DEF, and the rookie gains +1 morale. The torch is passed without drama.",
      origin: "In 1957, Kell shared third base duties with 20-year-old Brooks Robinson in Baltimore. Kell mentored Robinson — the two Arkansas natives would be inducted into the Hall of Fame together in 1983, the only time two Arkansans were inducted on the same day.",
    },
    {
      title: "Fifty-Six Doubles",
      type: "Game Action",
      text: "Your contact hitter leads the league in doubles with a historic total. Every extra-base hit is a double — none leave the park. For the full season, your hitter's doubles count is converted to a +1 RBI modifier per game, but his HR total stays at single digits.",
      origin: "In 1950, Kell led the AL with 56 doubles — a monster total — while hitting only 8 home runs. His 218 hits led the league, but the power came from the gaps, not over the fence.",
    },
    {
      title: "Good Evening, Everyone",
      type: "Drama",
      text: "Your retired player begins a second career as a beloved broadcaster. For 37 years, he calls games with a folksy Southern warmth that makes every listener feel at home. +3 legacy modifier. His fame grows after retirement. The fans remember the voice longer than the swing.",
      origin: "Kell broadcast Tigers games from 1959-1996 (with a one-year break). His trademark opening — 'Good EVE-ning, everyone!' — became iconic in Detroit. He worked alongside Al Kaline and Ernie Harwell, forming one of baseball's most beloved broadcast teams.",
    },
    {
      title: "The Thoroughbred",
      type: "Action",
      text: "An opposing Hall of Fame shortstop publicly calls your third baseman 'a thoroughbred' — the highest compliment in the game. Your player's reputation modifier increases by +1. All scouts and opposing managers adjust their evaluation upward.",
      origin: "Lou Boudreau, the Hall of Fame shortstop who managed against Kell for years, said simply: 'George Kell is a thoroughbred.' The quote appeared on Kell's Hall of Fame plaque page.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Friendly, open, genuinely warm face. 5'9\" 175 lbs — compact and solidly built, not tall or imposing. Round face, easy smile, the look of a man you'd trust immediately. Right-handed batter. Not movie-star handsome like DiMaggio — approachable handsome, like the best teacher you ever had.",
    attire: "Detroit Tigers home whites, early 1950s vintage. Old English 'D' on the cap. Fielding position at third base — set low in the ready crouch, glove out, feet wide, prepared for anything. Or: mid-swing, the compact right-handed stroke sending a line drive into the gap.",
    mood: "Warmth and competence. Not fierce like Williams, not cool like DiMaggio, not tragic like Travis, not quiet like Vernon. Just good. The expression of a man who loves his job and does it well and goes home to his family afterward. The most relatable card in the set.",
    style: "Clean, bright sepia — less dramatic than the Williams or DiMaggio cards. Briggs Stadium (later Tiger Stadium) in the background, the old ballpark where Kell became a star. The light should feel like a Saturday afternoon in the Midwest — clear, honest, unpretentious.",
    reference: "This card should feel like the one you'd actually want to own if these players were your neighbors. DiMaggio is the movie star, Williams is the genius, Travis is the tragedy, Vernon is the forgotten treasure. Kell is the good man. The card that reminds you baseball is supposed to be fun.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — POSITION PLAYER
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => ( <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}> <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span> <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}> <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /> </div> <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span> </div> );
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}> <span style={{ fontWeight: 700 }}>{tag}</span> </div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}> <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div> {children} </div> );

export default function GeorgeKellCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Clean bright sepia, Tigers whites, warm approachable face, ready crouch at 3B]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⭐ 10× All-Star", "👑 1949 Batting Champion", "🧤 Led AL 3B Fielding % 7×", "📜 HOF 1983", "🎯 56 Doubles (Led AL)", "🔇 287 Career K in 6,702 AB"].map((a, i) => (
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
              {tabs.map(t => ( <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button> ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && ( <> <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section> <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section> <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section> <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section> <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section> <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section> <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section> </> )}
              {tab === "chemistry" && ( <> <Section title="Chemistry Traits"> <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div> <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div> </Section> <Section title="Preferred Locations"> {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}> <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span> <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div> </div> ))} </Section> </> )}
              {tab === "momentum" && ( <> <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section> <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section> <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section> </> )}
              {tab === "actions" && ( <Section title="Action Card Seeds"> <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Kell's real life, become universal cards playable in any game.</p> {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}> <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div> <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p> <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p> </div> ))} </Section> )}
              {tab === "engine" && ( <> <Section title="Stat Conversion Engine"> <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p> {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))} </Section> <Section title="Kell's Derivation"> {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))} </Section> </> )}
              {tab === "art" && ( <Section title="Visual Art Direction"> {Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div> ))} </Section> )}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
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
