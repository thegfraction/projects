import { useState } from "react";

const HERMAN_DATA = {
  name: "Babe Herman",
  nickname: "The Headless Horseman of Ebbets Field",
  year: 1930,
  team: "Brooklyn Robins",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "RF",
  bats: "L",
  throws: "R",
  height: "6'4\"",
  weight: "190 lbs",
  born: "June 26, 1903 — Buffalo, New York (family moved to Glendale, CA as infant because mother feared lightning storms)",
  died: "November 27, 1987 — Glendale, California (age 84, pneumonia/strokes)",
  hof: "Not inducted. Peak 5.7% on BBWAA ballot. Bill James 100 Greatest RF #50. Career .324 BA, 141 OPS+, 39.6 WAR. Five hits from .400 in 1930. Dodgers franchise records still standing.",

  real_stats: {
    season: 1930, games: 153, at_bats: 614, batting_avg: ".393",
    hits: 241, doubles: 48, triples: 11, home_runs: 35,
    rbi: 130, runs: 143, stolen_bases: 17, walks: 66,
    strikeouts: 53, slg: ".678", obp: ".455", ops: "1.132",
    ops_plus: 186, total_bases: 416, xbh: 94, war: 8.2,
    career_avg: ".324", career_hr: 181, career_rbi: 997,
    career_hits: 1818, career_war: 39.6,
  },

  ilb_stats: {
    ovr: 8,      // All-Star — .393 in 1930 (5 hits from .400). 39.6 career WAR. 141 career OPS+. But: terrible defense, no postseason, bounced around 5 teams. The greatest hitter never to sniff the HOF.
    con: 5,      // .393 BA. 241 hits (still Dodgers franchise record). Hit .381 in 1929, .393 in 1930 — second in NL both years. .324 career BA. OPS+ 186 in 1930. Five hits from .400. Maximum contact.
    pow: 4,      // 35 HR, 130 RBI, 416 TB, .678 SLG (still Dodgers record), 94 XBH, 1.132 OPS in 1930. All still franchise records. Genuine 30+ HR power from the left side. POW 4.
    spd: 1,      // 17 SB, 11 3B in 1930. But he was TERRIBLE on the bases — doubled into a double play, passed by runners, stopped to watch HRs. The SB/3B numbers suggest some speed; the baserunning disasters suggest negative IQ. SPD 1 — the stats are there but the brain isn't.
    def: 0,      // Historically terrible outfielder. Dazzy Vance: "The Headless Horseman of Ebbets Field." Fresco Thompson: "He wore a glove for only one reason: because it was a league custom." When told someone impersonated him by cashing bad checks, Herman said: "Hit him a few fly balls. If he catches any, it ain't me." DEF 0 — minimum. Famous for it.
    clu: 0,      // Never reached the postseason. Brooklyn finished 4th in his best year. Bounced to 5 teams. Zero October data. CLU 0.
  },
  
  stat_justification: {
    con: ".393 BA in 1930 — five hits from .400. Finished behind only Bill Terry (.401). 241 hits remain the Dodgers franchise record 95 years later. Hit .381 in 1929, .393 in 1930 — second in NL both years. .324 career BA. OPS+ 186 in 1930 means he was 86% better than league average. Hit for the cycle THREE times (one of only three players ever). Hit safely in 135+ games. Rating of 5.",
    pow: "35 HR, 130 RBI, 416 TB, .678 SLG, 94 XBH, 1.132 OPS in 1930 — ALL remain Dodgers franchise records. 181 career HR. His .532 career SLG ranked 4th among all NL hitters with 5,000+ AB at retirement. Genuine left-handed power to all fields. On July 10, 1935, hit the first HR in a major league night game. Rating of 4.",
    spd: "17 SB and 11 triples in 1930. Led NL in triples with 19 in 1932. These numbers suggest decent speed. BUT: Herman was one of the worst baserunners in baseball history. He doubled into a double play (August 15, 1926 — three men ended up on third base). He stopped to watch home runs and was passed by runners — twice in 1930. He was thrown out stealing by a 48-year-old emergency catcher. The speed existed but the baserunning IQ was catastrophic. Rating of 1.",
    def: "Historically, comically, legendarily bad. Dazzy Vance dubbed him 'The Headless Horseman of Ebbets Field.' Fresco Thompson: 'He wore a glove for only one reason: because it was a league custom.' Herman's own response to an impersonator: 'Hit him a few fly balls. If he catches any, it ain't me.' He was slow, misjudged fly balls, and had unreliable hands. Born to be a DH 40 years before the DH existed. Rating of 0 — the floor.",
    clu: "Never reached the postseason. Brooklyn finished 4th in 1930 despite having Herman (.393), Lefty O'Doul, and Dazzy Vance. The Robins/Dodgers were perpetual also-rans during Herman's tenure. He bounced to 5 teams in 13 seasons. Zero October data. Even came back in 1945 at age 42 for wartime Brooklyn — still no postseason. Rating of 0.",
  },

  personality: {
    leadership_style: "The Lovable Disaster. Herman was not a leader — he was an event. Things happened around him. Three men on third base. A lit cigar in his pocket. Getting thrown out by a 48-year-old catcher. He was the heart of the 'Daffiness Boys' — Brooklyn's chaotic, incompetent, endlessly entertaining Robins of the late 1920s. He led by making everyone around him feel like geniuses by comparison.",
    temperament: "Cheerful, oblivious, supremely confident. Herman never understood why people found his adventures funny. He insisted for decades that the fly ball hit him on the shoulder, not the head. He was genuinely bewildered by criticism of his defense. He wasn't dumb — he hit .393 — but his baseball IQ was concentrated entirely in the batter's box. Everything outside it was chaos.",
    work_ethic: "Elite at the plate, indifferent everywhere else. Herman was a phenomenal hitter — .393 in 1930, .381 in 1929, three cycles, 241 hits. That doesn't happen without extraordinary discipline and preparation in the box. But his defensive preparation was nonexistent. He ignored manager signs in the outfield. When Robinson told him to move, Herman responded: 'If you don't like it, send somebody else out there.' Robinson did.",
    lifestyle: "California casual. Born in Buffalo, raised in Glendale (family moved because his mother feared lightning). Batted .800 in high school. Signed at 18 for a minor league team in Edmonton, Alberta. After baseball: lived quietly in Glendale, worked as a scout. Came back to play at age 42 during WWII. Died in 1987 at 84, buried at Forest Lawn Memorial Park. No scandal, no tragedy — just a man who hit baseballs very hard and caught them very badly.",
    era_adaptability: "EXTREMELY HIGH — as a DH. Herman was born 40 years too early. In modern baseball with the universal DH, he'd be a .330-hitting, 30+ HR designated hitter — one of the most valuable offensive players in the game. His defense would never be exposed. His baserunning could be managed with coaching and technology. Strip away the fielding and the baserunning disasters, and Herman's bat is a Hall of Famer.",
    clubhouse_impact: "MAXIMUM ENTERTAINMENT. Herman made everyone around him laugh — sometimes intentionally, usually not. He was the center of every story, every anecdote, every newspaper column. Sportswriters adored him because he generated copy. Teammates loved him because he was impossible to dislike. Brooklyn fans called him 'Baby da Hoim' in Brooklynese. He was the most beloved bad fielder in baseball history.",
    dark_side: "The near-miss at immortality. Five hits. That's all that separated Herman from .400 in 1930. Five hits would have put him in the Hall of Fame with Terry and Williams in the .400 club. Instead, he finished at .393 — the highest BA in history for a non-HOFer in a single season. His peak 5.7% on the BBWAA ballot is an insult. 39.6 career WAR and 141 OPS+ are HOF-caliber numbers. The defense and the comedy reputation cost him Cooperstown. He knew it. In 1979, he told a reporter: 'I belong in the Hall of Fame.'",
  },

  chemistry_traits: [
    { tag: "The Headless Horseman", desc: "DEF permanently 0. Cannot be improved by coaching or equipment. Herman's fielding is a force of nature — a bad force. But: +3 entertainment value. Fans never leave early." },
    { tag: "Born to DH", desc: "If DH rule is active: remove DEF penalty entirely, Herman plays as CON 5 / POW 4 / CLU 0. The perfect DH card. Without DH: the defense actively costs runs." },
    { tag: "Three Men on Third", desc: "Once per season, Herman triggers a baserunning catastrophe. A routine double becomes a double play. The opposing team is confused. The home crowd is delighted. -1 tactical efficiency, +2 entertainment." },
    { tag: "Five Hits from .400", desc: "If Herman's BA exceeds .395 in August, a '.400 Watch' activates. 40% chance he reaches .400 (instant HOF candidacy, +5 legacy). 60% chance he falls just short (.393-.399). The cruelest margin." },
    { tag: "Daffiness Boys", desc: "When 2+ Brooklyn Robins/Dodgers are on the same team, 'Daffiness Mode' activates: +1 team morale, +1 entertainment, -1 defensive efficiency. The team plays loose and chaotic." },
    { tag: "The Lit Cigar", desc: "Random event: Herman pulls a lit cigar from his pocket. Sportswriters are shocked. +1 publicity. No gameplay effect. Just... a lit cigar. In his pocket." },
    { tag: "Baby da Hoim", desc: "Fan favorite in Brooklyn. +2 home attendance at Ebbets Field. Brooklyn fans forgive everything — the dropped flies, the baserunning disasters — because the bat is magic." },
    { tag: "Pinch Hit for Cobb", desc: "In 1922 spring training, Herman pinch-hit for Ty Cobb. The audacity of being the replacement for the greatest hitter alive — and then spending 4 more years in the minors. +1 confidence permanently." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: ".393 in 1930. .381 in 1929. Three cycles. 241 hits. He was a genius here." },
    { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "Baby da Hoim. 416 TB in 1930. The fans loved him. The park loved him." },
    { location: "Dugout / Between Innings", affinity: "HIGH", note: "Where he belonged when not hitting. Smoking his lit pocket cigar." },
    { location: "Glendale, California", affinity: "HIGH", note: "Raised here. Died here. Buried at Forest Lawn. Home." },
    { location: "Right Field", affinity: "LOW", note: "'Hit him a few fly balls. If he catches any, it ain't me.' The position was a suggestion, not a commitment." },
    { location: "Basepaths", affinity: "LOW", note: "Three men on third. Passed by runners. Thrown out by a 48-year-old. The basepaths were his enemy." },
    { location: "Hall of Fame / Cooperstown", affinity: "NONE", note: "5.7% peak vote. 'I belong in the Hall of Fame.' He was right. They didn't agree." },
  ],

  momentum: {
    hot_triggers: [
      "Hitting streaks — .381 in 1929, .393 in 1930. When Herman's bat was hot, nothing could cool it.",
      "Brooklyn love — the Ebbets Field crowd lifted him, forgave him, cheered every disaster.",
      "Low expectations — Herman thrived when nobody expected defensive competence.",
      "Extra-base hit barrages — 94 XBH in 1930. When he's driving the ball, the TBs pile up.",
    ],
    cold_triggers: [
      "Defensive exposure — the more he plays the field, the more runs he costs.",
      "Baserunning pressure — any situation requiring baserunning intelligence is a hazard.",
      "Trade/team changes — bounced to 5 teams. Each move reduced his comfort zone.",
      "Contract disputes — holdouts in 1930-31 and 1931-32 soured relationships.",
    ],
    pressure_response: "COMPLETELY UNTESTED. Herman never played a postseason game. The 1930 Robins finished 4th. The closest he came to a pennant race was 1930 itself, when Brooklyn was briefly in contention before fading. His .393 BA that year suggests he could have been a monster in October — but we'll never know. In ILB: Herman is the ultimate high-risk, high-reward card. His bat is a postseason weapon. His glove is a postseason liability. His baserunning is a postseason nightmare. You play him because .393 is .393.",
  },

  action_card_seeds: [
    {
      title: "Three Men on Third Base",
      type: "Game Action",
      text: "Your outfielder hits a double off the right-field wall with the bases loaded. One run scores. But the runner from first passes the runner from second, who has retreated to third — where the batter has also arrived. Three men stand on third base. Two are tagged out. The double becomes a double play. The crowd roars. The manager weeps.",
      origin: "August 15, 1926: Herman doubled off the RF wall at Ebbets Field. Chick Fewster and Dazzy Vance both ended up on third base with Herman. Two were tagged out. The only double into a double play in baseball history.",
    },
    {
      title: "Five Hits from .400",
      type: "Drama",
      text: "Your hitter finishes the season at .393. Five more hits — out of 614 at-bats — would have made him a .400 hitter. Five hits would have meant the Hall of Fame. Five hits is the difference between immortality and a 5.7% HOF vote. Five hits. He spent the rest of his life knowing.",
      origin: "1930: Herman hit .393 with 241 hits in 614 AB. .401 would have required 246 hits — five more. Bill Terry hit .401 that year and is in the HOF.",
    },
    {
      title: "The Lit Cigar in His Pocket",
      type: "Action",
      text: "A sportswriter approaches your player. Your player reaches into his pocket and pulls out a half-smoked cigar. The sportswriter is not surprised by the cigar. He is surprised that the cigar is already lit. It has been lit in the pocket the entire time.",
      origin: "Writer Frank Graham once watched Herman pull a lit cigar from his pocket. The shock was not that he had a cigar — it was that it was already burning.",
    },
    {
      title: "If He Catches Any, It Ain't Me",
      type: "Action",
      text: "A local bank calls your player. Someone has been impersonating him and cashing bad checks. Your player has the perfect solution: 'Hit him a few fly balls. If he catches any, it ain't me.'",
      origin: "Herman's actual response when informed about an impersonator cashing checks in his name. The self-awareness is devastating.",
    },
    {
      title: "Hit for the Cycle — Twice in One Season",
      type: "Game Action",
      text: "Your hitter hits for the cycle. Then he does it again. In the same season. He is one of only two players since 1900 to do this. The cycles are beautiful. The baserunning between them is horrifying. +3 offensive prestige.",
      origin: "1931: Herman hit for the cycle on May 18 and July 24 — one of only two players since 1900 to cycle twice in the same season.",
    },
    {
      title: "Pinch-Hitting for Ty Cobb",
      type: "Action",
      text: "Spring training, 1922. Your 18-year-old prospect pinch-hits for the greatest hitter in baseball history. It's a spring training game. It doesn't matter. But the fact that someone thought he could replace Ty Cobb — even for one at-bat — tells you everything about the bat.",
      origin: "1922: In a Tigers spring training game, Herman was used as a pinch-hitter for Ty Cobb. Detroit had no outfield vacancies and returned him to the minors, where he hit .416.",
    },
    {
      title: "The First Night Game Home Run",
      type: "Game Action",
      text: "Major league baseball plays under the lights for the first time. Your player hits the first home run in a major league night game. History is made. The lights are on. The ball disappears into the darkness beyond the fence.",
      origin: "July 10, 1935: Herman hit the first HR by an NL batter in a major league night game, at Crosley Field in Cincinnati vs. the Brooklyn Dodgers.",
    },
    {
      title: "Baby da Hoim",
      type: "Action",
      text: "Brooklyn's immigrant fans — Italian, Jewish, Irish — adopt your player as their own. They mangle his name in Brooklynese: 'Baby da Hoim.' They love him because he hits like a god and fields like a mortal. He is the people's champion. He belongs to Flatbush.",
      origin: "Herman recalled: 'They had a lot of foreign-born fans, and they spoke Brooklynese. They called me Baby da Hoim.'",
    },
  ],

  art_direction: {
    face: "Tall, lanky, grinning. 6'4\" 190 lbs — all arms and legs. The face should radiate cheerful obliviousness. He genuinely doesn't understand why everyone is laughing. The smile of a man who just hit .393 and got picked off second in the same game.",
    attire: "Brooklyn Robins 1930 road grays. The old-style 'Brooklyn' across the chest. The uniform should look slightly askew — collar popped, cap tilted, maybe a faint wisp of cigar smoke from the pocket. This is not a man who cares about uniform regulations.",
    mood: "Chaotic joy. The swing — massive, left-handed, pulling everything to right field with terrifying force. Or: the aftermath of three men on third base, Herman standing there bewildered while the umpire explains what happened. The card should feel like a comedy that happens to include a .393 batting average.",
    style: "Brooklyn Daffiness palette. Ebbets Field's intimate brick. Bright colors — the Robins were colorful in every sense. Maybe a cartoon quality to the border, like a newspaper comic strip from the 1930s. This card should feel fun. Not serious. Fun.",
    reference: "The card of the man who was five hits from immortality. The greatest hitter to double into a double play. The Headless Horseman of Ebbets Field. Baby da Hoim. The card that makes everyone smile — and then realize he should be in the Hall of Fame.",
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

export default function BabeHermanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HERMAN_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Tall, lanky, grinning, LH swing, Robins grays, Ebbets Field, cigar smoke, chaotic joy]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 1 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "H", val: d.real_stats.hits },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "TB", val: d.real_stats.total_bases },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — FIVE HITS FROM .400 — DODGERS RECORDS STILL STANDING</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🔥 .393 BA (1930)", "💣 35 HR / 130 RBI", "📊 416 TB (Dodgers Record)", "🔄 3× Hit for Cycle", "💎 .324 Career BA", "🌙 1st Night Game HR", "😂 DEF 0 (Legendary)"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Herman's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Herman's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
