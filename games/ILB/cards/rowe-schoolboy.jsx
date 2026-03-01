import { useState } from "react";

const ROWE_DATA = {
  name: "Schoolboy Rowe",
  nickname: "Schoolboy",
  year: 1934,
  team: "Detroit Tigers",
  league: "American League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "R",
  height: "6'4\"",
  weight: "210 lbs",
  born: "January 11, 1910 — Waco, Texas (raised in El Dorado, Arkansas; father was a circus trapeze performer who Schoolboy insisted was 'an architect'; all-state QB, 100+ boxing matches, multi-sport star)",
  died: "January 8, 1961 — El Dorado, Arkansas (age 50, heart attack at home, 3 days before 51st birthday)",
  hof: "Not inducted. 158-101 (.610), 3.87 ERA, 3× All-Star (1935-36, 1947). 1935 WS champion. 16 consecutive wins in 1934 (tied AL record — Wood, Johnson, Grove). Led AL in W% 1940 (.842). Led AL in K/BB ratio 1934-35. Led AL in SHO 1935 (6). .263 career BA as a pitcher (18 HR, 153 RBI). Michigan Sports HOF 1961.",

  real_stats: {
    season: 1934, wins: 24, losses: 8, era: "3.45",
    games: 45, games_started: 34, complete_games: 22,
    shutouts: 4, saves: 4, innings_pitched: "275.2",
    hits_allowed: 275, walks: 62, strikeouts: 149,
    whip: "1.223", win_pct: ".750", era_plus: 137,
    war: 6.4,
    career_wins: 158, career_losses: 101, career_era: "3.87",
    career_k: 913, career_war: 32.7,
    batting_avg_1934: ".303", batting_avg_1935: ".312",
    career_batting_avg: ".263", career_hr_pitcher: 18,
  },

  ilb_stats: {
    ovr: 8,      // All-Star — 24-8 in 1934 with 16 consecutive wins. 158-101 career (.610). 3× All-Star. 1935 WS champion. But: career derailed by shoulder injuries. Only 3 truly dominant seasons (1934-36: 62-31). 32.7 career WAR. Not HOF, but a star at his peak.
    stf: 3,      // 149 K in 1934 (3rd in AL). Overpowering fastball in his prime. "An overpowering fastball." Led AL in K/BB ratio 1934-35. But the shoulder injuries robbed him of velocity. Pre-injury: elite stuff. Post-injury: crafty survivor. STF 3 for the peak.
    ctl: 2,      // 1.223 WHIP in 1934. 62 BB in 275.2 IP (2.0 BB/9). Led AL in K/BB ratio 1934-35. Career-best 1.31 BB/9 in 1943. Good control pitcher. But: 3.45 ERA in 1934 is solid, not elite. CTL 2.
    sta: 3,      // 275.2 IP in 1934. 22 CG. 45 games (34 starts, 11 relief, 4 saves). But: shoulder injuries in 1937-38 limited him to 31 and 21 IP. The 1934 workload may have caused the breakdown. STA 3 (peak was 4, but the fragility pulls it down).
    def: 0,      // No particular defensive reputation on the mound. But an excellent hitting pitcher (.303 BA in 1934, .312 in 1935, 18 career HR). The hitting is captured elsewhere. DEF 0.
    clu: 1,      // 1934 WS: 1-1, 2.95 ERA. Game 2: 12-inning CG, 2 ER, retired 22 consecutive batters. But lost Game 6. 1935 WS: 1-2 despite 2.51 ERA (lost Games 1 and 5 despite CG, low ER). 1940 WS: 0-2, 17.18 ERA — disastrous. 1935 WS champion (team won, he was 1-2). Mixed WS record. CLU 1.
  },
  
  stat_justification: {
    stf: "149 K in 1934 (3rd in AL). Overpowering fastball that generated the nickname from dominating older men as a teenager. Led AL in K/BB ratio 1934-35. 140 K in 1935 (2nd in AL). But: shoulder injuries destroyed the fastball after 1936. Pre-injury he was a power pitcher; post-injury he survived on guile. Rating of 3 for peak-year stuff.",
    ctl: "62 BB in 275.2 IP (2.0 BB/9) in 1934. 1.223 WHIP. Led AL in K/BB ratio 1934-35. Career-best 1.31 BB/9 in 1943. Good control, especially for a power pitcher. But ERA of 3.45 in 1934 and 3.87 career suggests he gave up hard contact despite low walks. Rating of 2.",
    sta: "275.2 IP in 1934. 22 CG. 45 total appearances. But: the heavy workload likely contributed to shoulder injuries that limited him to 31 IP in 1937 and 21 IP in 1938. He was a workhorse when healthy but couldn't sustain it. Came back but never with the same durability. Rating of 3.",
    def: "No particular defensive reputation. However, an outstanding hitting pitcher: .303 BA in 1934, .312 in 1935, .263 career BA, 18 HR, 153 RBI. There was discussion of converting him to an outfielder. Led NL in pinch hits in 1943. But DEF measures fielding, not hitting. Rating of 0.",
    clu: "1934 WS: Game 2 — 12-inning CG, retired 22 consecutive batters, won 3-2. But lost Game 6. 1935 WS: 1-2 despite 2.51 ERA — lost Games 1 and 5 on CG with low ER (team didn't score). 1940 WS: 0-2, 17.18 ERA — catastrophic. Mixed: great individual performances in '34-'35 WS, disaster in '40. Rating of 1.",
  },

  personality: {
    leadership_style: "The Romantic Hero. Rowe led through charm, charisma, and a folksy sincerity that made him irresistible to fans, teammates, and press alike. He wasn't a tactician or a firebrand. He was the handsome, superstitious, ball-talking pitcher who asked his sweetheart on national radio how he was doing. Detroit's female fans adored him. His teammates loved him. Even the Cardinals' Goose Goslin said of the whole Tigers team: 'I kind of liked the kid.' He was baseball's golden boy for three glorious years.",
    temperament: "Superstitious, romantic, eccentric, resilient. He carried amulets, talismans, and good-luck charms in his pockets. He always picked up his glove with his left hand. He talked to the baseball — named it 'Edna' after his sweetheart. 'C'mon, Edna, we got this guy Foxx right where we want 'em.' He was a known flake with an abundance of Southern charm. He loved mingling with fans and signing autographs. He competed in 100+ professional boxing matches. The combination of sensitivity and toughness was uniquely Schoolboy.",
    work_ethic: "Natural phenomenon who fought through destruction. Signed at 16 for $250 in a firehouse. Refused to report to the minors for years, playing semipro ball instead. When he finally committed in 1932, went 19-7 with a 2.30 ERA at Beaumont. Then 24-8 in his second MLB season. Then shoulder injuries destroyed everything — 31 IP in 1937, 21 IP in 1938. But he came back: 16-3 in 1940, then reinvented himself as a crafty veteran with the Phillies (52-39 over 5 seasons). The Lazarus of baseball.",
    lifestyle: "Arkansas small-town boy to Detroit folk hero. Father was a circus trapeze performer (Schoolboy insisted he was 'an architect'). All-state QB. 100+ boxing matches. Tennis. Golf. Basketball. Married Edna Mary Skinner (his high school sweetheart) on October 11, 1934, right after the WS. Two children. After playing: Tigers pitching coach, first base coach, scout. Died at 50 of a heart attack in El Dorado. Buried at Arlington Memorial Park. Michigan Sports HOF posthumously 1961.",
    era_adaptability: "MODERATE-HIGH. The raw stuff (power fastball, good control) would translate well to modern baseball. His .263 career BA with 18 HR would make him a two-way player candidate in the Ohtani era. The superstitions and ball-talking would make him a viral sensation. But the shoulder injuries would be better managed with modern medicine — Tommy John surgery, load management, etc. The healthy Schoolboy Rowe might have been a 250-game winner.",
    clubhouse_impact: "BELOVED. Rowe was the most popular Tiger of his era. He spent hours signing autographs. He charmed the press. He was devoted to his sweetheart on national radio. He fought through career-threatening injuries to come back multiple times. His personality was the opposite of Medwick's fury or Dean's braggadocio — Rowe was warm, sincere, and slightly absurd (he talked to the ball). Every clubhouse needs a Schoolboy Rowe.",
    dark_side: "The shoulder. The career that should have been 250+ wins was limited to 158 by chronic shoulder pain. 1937-38: only 52 IP combined. The heavy workload of 1934-36 (62 wins, massive innings) likely caused the breakdown. And the 1940 WS — after his miraculous 16-3 comeback season — was a disaster: 0-2, 17.18 ERA. The universe gave him the greatest comeback story in baseball and then humiliated him on the biggest stage. He died at 50 — too young for a man who had boxed 100+ fights, quarterbacked a high school team, and thrown 275 innings in a single season. The body that could do everything was the first thing to fail him.",
  },

  chemistry_traits: [
    { tag: "How'm I Doin', Edna?", desc: "On September 13, 1934, during a nationally broadcast radio interview, Rowe asked his fiancée: 'How'm I doin', Edna honey?' He was ribbed unmercifully. But it worked — they married a month later. +2 fan popularity, +1 female fan attendance. -1 credibility with opposing players." },
    { tag: "The Ball Named Edna", desc: "Rowe talked to the baseball during games, calling it 'Edna.' 'C'mon, Edna, we got this guy Foxx right where we want 'em.' +1 CTL when talking to the ball. Opponents are unnerved by a man addressing a baseball by his sweetheart's name." },
    { tag: "16 Consecutive Wins", desc: "June 15 to August 19, 1934 — 16 straight victories, tying the AL record (Wood, Johnson, Grove). When win streak reaches 10+: +1 STF/CTL. When the streak ends: -1 morale for 2 games." },
    { tag: "Superstitious Pitcher", desc: "Carries amulets, talismans, and charms in his pockets. Always picks up glove with left hand. Pre-game ritual cannot be disrupted. If ritual is broken: -1 all stats for that start. If maintained: +1 stability." },
    { tag: "The Hitting Pitcher", desc: ".303 BA in 1934. .312 in 1935. .263 career. 18 HR as a pitcher. Led NL in pinch hits (1943). Rowe can be used as a pinch-hitter. +1 offensive contribution from the pitcher spot." },
    { tag: "Arkansas Rivalry", desc: "When facing Dizzy Dean (fellow Arkansan): +1 STF to both pitchers. El Dorado vs. Lucas. The 1934 WS was an Arkansas civil war — Rowe vs. Dean. Both native sons, both country boys, both superstars." },
    { tag: "The Lazarus Comeback", desc: "After career-threatening injury (1937-38: 52 IP total), Rowe returned to go 16-3 in 1940 (.842 W%). If sidelined 2+ seasons by injury: 30% chance of miraculous comeback at reduced stats. The body breaks; the will doesn't." },
    { tag: "The Trapeze Artist's Son", desc: "Father was a circus trapeze performer (Schoolboy insisted he was 'an architect'). +1 athleticism. Rowe's unusual physical gifts came from somewhere — the man competed in 100+ boxing matches, played QB, and could throw 95 mph." },
  ],

  preferred_locations: [
    { location: "Navin Field / Detroit", affinity: "HIGH", note: "10 seasons. 24-8 in 1934. 16 consecutive wins. 1935 WS champion. Folk hero status." },
    { location: "The Pitcher's Mound", affinity: "HIGH", note: "275 IP. 22 CG. He talked to the ball. He named it Edna. The mound was his stage." },
    { location: "Eddie Cantor Radio Show", affinity: "HIGH", note: "'How'm I doin', Edna honey?' The most famous radio interview in baseball history." },
    { location: "El Dorado, Arkansas", affinity: "HIGH", note: "Home. Grew up here. Married here (at the Detroit Leland Hotel, but Edna was from here). Died here. Buried here." },
    { location: "Boxing Ring", affinity: "MEDIUM", note: "100+ professional boxing matches. The toughness behind the charm." },
    { location: "1934 World Series vs. Cardinals", affinity: "MEDIUM", note: "Game 2: 12-inning CG, retired 22 straight. But lost Game 6 and the Series to the Gashouse Gang." },
    { location: "1940 World Series", affinity: "LOW", note: "The comeback year (16-3). The WS disaster (0-2, 17.18 ERA). The universe's cruelest joke." },
  ],

  momentum: {
    hot_triggers: [
      "Win streaks — 16 consecutive in 1934. When he's rolling, nobody can stop him.",
      "Edna energy — when the romance is strong, the pitching is strong. The ball listens.",
      "Comeback mode — after injury, Rowe returns with renewed intensity (16-3 in 1940).",
      "Fan energy — Rowe feeds on crowd love. Detroit's female fans powered his confidence.",
    ],
    cold_triggers: [
      "Shoulder pain — 1937-38. The arm dies. 52 IP in two years. The career hangs by a thread.",
      "Post-streak letdown — after the 16-game streak ended, Rowe went 4-4 the rest of 1934.",
      "WS pressure (1940) — the greatest comeback led to the worst WS performance. 17.18 ERA.",
      "Mockery — 'How'm I doin', Edna' was endearing but also ammunition for opponents.",
    ],
    pressure_response: "BRILLIANT AND HEARTBREAKING. 1934 WS Game 2: 12-inning CG, 2 ER, retired 22 consecutive batters — one of the greatest WS pitching performances ever. But lost Game 6 to Paul Dean. 1935 WS: 1-2 despite 2.51 ERA — pitched 2 CG losses where the Tigers didn't score (2 ER and 2 ER). The team failed him, not the other way. 1940 WS: 0-2, 17.18 ERA — the collapse. The pattern: individually magnificent in 1934-35, catastrophically broken in 1940. He gave everything the mound demanded and sometimes the scoreboard didn't cooperate.",
  },

  action_card_seeds: [
    {
      title: "Sixteen Consecutive Wins",
      type: "Game Action",
      text: "Your pitcher loses on June 10 to fall to 4-4. Then he wins. And wins. And wins. Sixteen consecutive victories — tying the American League record held by Smoky Joe Wood, Walter Johnson, and Lefty Grove. By the time the streak ends on August 19, he's 20-4 and your team is running away with the pennant.",
      origin: "1934: Rowe won 16 straight from June 15 to August 19, tying the AL record. Tigers won the pennant by 7 games.",
    },
    {
      title: "How'm I Doin', Edna?",
      type: "Action",
      text: "Your star pitcher appears on a nationally broadcast radio show during the pennant race. Instead of talking about baseball, he looks into the microphone and asks his fiancée back in Arkansas: 'How'm I doin', Edna honey?' The nation melts. His teammates never let him hear the end of it. He marries her a month later.",
      origin: "September 13, 1934: Rowe asked Edna Skinner on the Eddie Cantor radio show. They married October 11, 1934.",
    },
    {
      title: "The Ball Named Edna",
      type: "Action",
      text: "Your pitcher talks to the baseball during games. He's named it after his sweetheart. 'C'mon, Edna, we got this guy Foxx right where we want 'em.' 'Careful now, Edna. Don't let Ruth get those arms extended.' The ball, apparently, listens. He wins 24 games.",
      origin: "Rowe was known to talk to the baseball, addressing it as 'Edna' during games.",
    },
    {
      title: "The 12-Inning Complete Game",
      type: "Game Action",
      text: "Game 2 of the World Series. Your pitcher takes the mound against the Gashouse Gang. He pitches 12 innings. A complete game. Two earned runs. He retires 22 consecutive batters at one point. Your team wins 3-2 in the 12th. It's one of the greatest WS pitching performances in history.",
      origin: "1934 WS Game 2: Rowe CG 12 innings, 2 ER, retired 22 straight. Tigers won 3-2.",
    },
    {
      title: "The Shoulder Dies",
      type: "Drama",
      text: "Your ace won 62 games over the last three seasons. He was one of the best pitchers in baseball. Then his shoulder fails. In 1937: 31 innings, 1-4, 8.62 ERA. In 1938: 21 innings, 0-2. He's sent to the minors. The arm that threw 275 innings in a season can barely throw 20. He's 27 years old.",
      origin: "1937-38: Rowe's shoulder injuries limited him to 52 IP combined after 3 years of heavy workload.",
    },
    {
      title: "The Lazarus Season",
      type: "Game Action",
      text: "Your pitcher was given up for dead. Two years of nothing. Minor league rehabilitation. But in 1940, he returns: 16-3 record. .842 winning percentage — best in the league. He leads your team to the pennant. The Lazarus of baseball rises from the dead.",
      origin: "1940: Rowe went 16-3 (.842 W%, led AL) after being limited to 52 IP in 1937-38 combined.",
    },
    {
      title: "The Trapeze Artist's Son",
      type: "Action",
      text: "A scout knocks on your prospect's door. An undersized, middle-aged man answers. The scout's heart sinks — this can't be the father of a baseball prodigy. But the scout has misread the man: he's a former circus trapeze performer. His son is 6'4\", has boxed 100+ professional fights, and can throw 95 mph. The architect's son is actually the trapeze artist's son.",
      origin: "Scout Eddie Goosetree visited the Rowe home. Father Thomas Rowe was a former circus trapeze performer, though Schoolboy insisted he was 'an architect.'",
    },
    {
      title: "The 1940 World Series Collapse",
      type: "Drama",
      text: "Your pitcher's comeback season was miraculous — 16-3 after two years lost to injury. The pennant is won. The World Series begins. And your pitcher is destroyed: 0-2, 17.18 ERA. The universe gave him the greatest comeback story in baseball and then humiliated him on the biggest stage.",
      origin: "1940 WS: Rowe went 0-2 with a 17.18 ERA despite his miraculous regular season (16-3).",
    },
  ],

  art_direction: {
    face: "Tall, dark-haired, chiseled jawline, gold-capped front tooth (from a football injury). 6'4\" 210 lbs — imposing but warm. The face should show Southern charm and slight eccentricity — a man who talks to baseballs, carries talismans, and names things after his sweetheart. Handsome enough to cause swoons on ladies' day at Navin Field.",
    attire: "Detroit Tigers 1934 home whites with the Old English 'D'. Navin Field behind him. The windup — tall, powerful, the fastball loaded. Or: the radio interview — microphone in hand, looking slightly embarrassed, saying something to Edna. A lucky charm or amulet visible in the pocket.",
    mood: "Romance and power. The card should feel like a love letter written on a baseball. Warm, sincere, slightly goofy, but backed by 95 mph and 16 consecutive wins. The most charming pitcher in the set — where Dean is joy and Grove is rage, Schoolboy is tenderness weaponized.",
    style: "Detroit industrial meets Arkansas pastoral. Tigers navy and white, but with warm Southern undertones. Navin Field's steel and concrete, softened by the warmth of the man on the mound. This is the card of a country boy who became a city hero, married his sweetheart, and talked to baseballs.",
    reference: "The card of the boy who talked to the ball and named it Edna. The pitcher who won 16 straight and asked his sweetheart on the radio how he was doing. The trapeze artist's son who boxed 100 fights and quarterbacked a football team. The arm that threw 275 innings and then broke. The Lazarus who came back to go 16-3. The man whose World Series comeback ended in a 17.18 ERA. Schoolboy Rowe — the most romantic pitcher in baseball history.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "K + Dominance", tiers: [{ range: "K < 100", value: 0 },{ range: "K 100-149", value: 1 },{ range: "K 150-199", value: 2 },{ range: "K 200-249", value: 3 },{ range: "K 250-299", value: 4 },{ range: "K 300+", value: 5 }], bonus: "Led AL in K/BB ratio 2 yrs → +2 (cap 5)" },
  control: { metric: "WHIP + BB/9", tiers: [{ range: "WHIP > 1.40", value: 0 },{ range: "WHIP 1.30-1.40", value: 1 },{ range: "WHIP 1.15-1.29", value: 2 },{ range: "WHIP 1.00-1.14", value: 3 },{ range: "WHIP < 1.00", value: 4 }], bonus: "BB/9 < 2.5 → +1 (cap 4)" },
  stamina: { metric: "IP + CG", tiers: [{ range: "IP < 180", value: 0 },{ range: "IP 180-219", value: 1 },{ range: "IP 220-259", value: 2 },{ range: "IP 260-299", value: 3 },{ range: "IP 300+", value: 4 }], bonus: "Injury history → -1" },
  overall_sp: { formula: "STFx2 + CTLx2 + STAx1 + DEFx1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function SchoolboyRoweCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = ROWE_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Tall, dark-haired, gold-capped tooth, chiseled jawline, Tigers Old English D, Navin Field, charm and power]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={4} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings_pitched },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1934 — 16 CONSECUTIVE WINS (TIED AL RECORD) — 4TH IN AL MVP</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1935 WS Champion", "⭐ 3× All-Star", "🔥 16 Straight Wins", "📊 158-101 (.610)", "💪 24-8 in 1934", "🥊 100+ Boxing Matches", "❤️ How'm I Doin' Edna?", "🎯 .303 BA (Pitcher!)"].map((a, i) => (
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
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Rowe's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Rowe's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (AL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
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
