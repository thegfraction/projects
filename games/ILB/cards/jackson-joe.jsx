import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}jackson-joe.png`;

const PLAYER_DATA = {
  name: '"Shoeless" Joe Jackson',
  nickname: "The Sweetest Swing in Baseball",
  year: 1911,
  team: "Cleveland Naps",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "LF",
  bats: "L",
  throws: "R",
  height: '6\'1"',
  weight: "200 lbs",
  born: "July 16, 1887 — Pickens County, SC",
  died: "December 5, 1951 — Greenville, SC (age 64)",
  hof: "NOT in HOF. BANNED FOR LIFE. .356 career BA (3rd all-time). .408 rookie BA (still the record). 170 OPS+. Babe Ruth: 'I copied his style because I thought he was the greatest hitter I had ever seen.' Hit .375 in the 1919 WS with 12 hits and the only HR — and was still banned. Museum address: 356 Field Street. The ghost on the diamond.",

  real_stats: {
    season: 1911, games: 147, at_bats: 571, hits: 233, doubles: 45,
    triples: 19, home_runs: 7, rbi: 83, runs: 126, stolen_bases: 41,
    batting_avg: ".408", obp: ".468", slg: ".590", ops: "1.058",
    ops_plus: "~193", war: "~9.2",
    rookie_record: ".408 BA (STILL the all-time rookie record)",
    al_leader: "OBP (.468)",
    season_1912: ".395 BA, 226 H (AL leader), AL leader 3B + TB",
    season_1913: ".373 BA, 197 H (AL leader), .551 SLG (AL leader), 2nd MVP",
    three_year_span: ".392/.459/.560 (1911-13)",
    career_avg: ".356", career_hits: 1772, career_hr: 54,
    career_3b: 168, career_2b: 307, career_sb: 202,
    career_rbi: 792, career_war: "~55", career_ops_plus: 170,
    career_k: "233 in ~5,000 AB",
    ws_1919_ba: ".375", ws_1919_hits: "12 (WS record)",
    ws_1919_hr: "1 (only HR in the Series)",
    ws_1919_errors: 0,
    ws_1917_champion: "Yes",
    banned: "1920 — lifetime ban by Commissioner Landis",
    bat: "Black Betsy (sold $577,610 in 2001)",
  },

  ilb_stats: {
    ovr: 12,     // Legend — .356 career BA (3rd all-time). .408 rookie record (still stands). 170 OPS+ career. Babe Ruth modeled his swing after Jackson's. The sweetest natural swing the game has ever seen. But: banned for life (1920). Career cut short at age 33. The potential was Mythic; the reality was Legend, truncated by scandal.
    con: 5,      // .408 BA in 1911 → tier 5 (.330+). OPS+ ~193 → ≥130 bonus (capped at 5). .356 career BA, 3rd all-time (behind Cobb .367, Hornsby .358). 233 K in ~5,000 career AB — absurd contact rate. .340+ in 8 of 13 seasons. Ruth: 'the greatest hitter I had ever seen.' Rating: 5.
    pow: 2,      // 7 HR in 1911 → tier 0 (0-9). BUT: SLG .590 → ≥.500 bonus (+1). Career SLG .517. 168 career triples (enormous gap power). 307 doubles. The power was real — expressed through extra-base authority rather than HR. I'll bump to 2 for the SLG bonus + extraordinary gap power. Rating: 2.
    spd: 3,      // 41 SB in 1911 → tier 3 (31-50). 202 career SB. Good baserunner with real speed — not his defining trait like Collins or Speaker, but still elite by the numbers. Rating: 3.
    def: 1,      // 'Excellent fielder' with a 'strong arm and instinctive ability to read fly balls.' But played LF (not CF), and defensive reputation was secondary to hitting. Not in the same class as Speaker defensively. Rating: 1.
    clu: 1,      // COMPLICATED. 1917 WS champion. Hit .375 in the 1919 WS with 12 hits (record), the only HR, and zero errors — arguably the best performance in the Series. But was banned for life for allegedly conspiring to fix that same Series. The clutch stats are elite; the context is poisoned. 1 reflects the championship + the stain. Rating: 1.
  },

  stat_justification: {
    con: ".408 BA in 1911 → tier 5 (.330+). This is STILL the all-time rookie record, and the 6th highest single-season BA since 1901. OPS+ ~193 → ≥130 bonus (capped at 5). Career: .356 BA (3rd highest in MLB history, behind only Ty Cobb and Rogers Hornsby). .340+ in 8 of 13 seasons. Only 233 K in ~5,000 career AB. Babe Ruth: 'I copied his style because I thought he was the greatest hitter I had ever seen.' Dickie Kerr: 'It was almost impossible for him to swing without meeting the ball solidly.' The swing was perfect. Rating: 5.",
    pow: "7 HR in 1911 → tier 0 (0-9 HR). However: SLG .590 in 1911 → ≥.500 bonus (+1). Career SLG .517. 168 career triples (enormous power to the gaps). 307 doubles. 54 career HR in 13 seasons. The power wasn't vertical — it was horizontal. Jackson drove the ball into gaps with devastating authority. The SLG bonus reflects the real extra-base production. Rating: 2.",
    spd: "41 SB in 1911 → tier 3 (31-50). 202 career SB. He was a genuine speed threat — 41 SB as a rookie is elite. But speed was never his defining attribute the way it was for Collins (741 SB) or Speaker (436 SB). The numbers earn the rating regardless. Rating: 3.",
    def: "'Excellent fielder' with a 'strong arm and instinctive ability to read fly balls.' He played primarily LF (not CF). His defensive value was real but secondary to his historic bat. He wasn't in Speaker's class defensively — few were. Strong arm, good reads, solid positioning. Rating: 1.",
    clu: "COMPLICATED AND PAINFUL. The facts: (1) 1917 WS champion with White Sox. (2) 1919 WS: hit .375, 12 hits (WS record), the only HR in the Series, zero errors, perfect fielding average. His performance was elite — arguably the best in the Series. (3) But he was banned for life by Commissioner Landis for allegedly conspiring to fix that same Series. He admitted taking $5,000 from gamblers. He claimed he played his best regardless. The stats support his claim. But the ban is the ban. The CLU 1 reflects: one championship (1917) + great WS stats, minus the permanent stain of the scandal. The debate is eternal. Rating: 1.",
  },

  personality: {
    leadership_style: "THE NATURAL. Jackson didn't lead through intellect or strategy — he led through pure, blinding, God-given talent. The swing was perfect. The bat was magic. He stepped into the batter's box and the ball went where he wanted it to go. There was no theory, no analysis — just the sweetest natural swing baseball had ever seen. He led by being undeniable.",
    temperament: "GENTLE AND VULNERABLE. Unlike the combative Cobb or the cocky Collins, Jackson was shy, quiet, and easily wounded. He was illiterate in an era when teammates exploited that — they tricked him into drinking from a finger bowl at a restaurant. He left teams multiple times because of homesickness and bullying. The most talented man on the field was often the most vulnerable man in the room.",
    work_ethic: "INSTINCTIVE, NOT ANALYTICAL. Jackson didn't study the game the way Collins or Speaker did. He played by feel, by instinct, by the natural rhythm of the swing. He couldn't read a scouting report because he couldn't read. But his eye-hand coordination was supernatural. Ruth didn't copy his technique — he copied his instinct. The work was in the body, not the mind.",
    lifestyle: "MILL WORKER'S SON. Born in poverty in Brandon Mills, SC. Working in a textile mill by age 12. Illiterate his entire life — wife Katie signed his documents and autographs. He married her at 15 (she was 15). After the ban, he returned to the South, played under assumed names, ran a liquor store and a dry cleaning business in Greenville. The most famous banned man in America, living quietly in the town that built a museum at 356 Field Street.",
    era_adaptability: "THE ETERNAL SWING. Jackson's swing would work in any era — Ruth said so, and he would know. The .356 career BA translates to any period. The gap power (168 triples, 307 doubles) would become HR power with modern ballparks and equipment. The low strikeout rate (233 K in 5,000 AB) would be supernatural today. The weakness — illiteracy, vulnerability to manipulation — would be addressed by modern player support systems. Jackson in 2024 would be Mike Trout with a better batting average.",
    clubhouse_impact: "THE VICTIM. Jackson wasn't a clubhouse leader or a troublemaker — he was the target. On the 1919 White Sox, he was caught between Collins's clean faction and Gandil's conspirators. His illiteracy made him easy to manipulate. He accepted $5,000 but claimed he tried to return it. His testimony was confused, contradictory — the words of a man who couldn't read the documents he was signing. The clubhouse impact was that of a gentle giant exploited by smarter, harder men.",
    dark_side: "He took the money. However you interpret it — coerced, confused, manipulated — Joe Jackson accepted $5,000 from gamblers to fix the 1919 World Series. He may have played his best anyway (.375 BA, 12 hits, the only HR). But he took the money and he didn't report the fix. The illiteracy is an explanation, not an exoneration. The tragedy is that the most naturally gifted hitter in baseball history was also the most easily manipulated man in the conspiracy. The ban was real. The grief was eternal. 'Say it ain't so, Joe' — whether or not the kid actually said it, the sentiment has outlived the man.",
  },

  chemistry_traits: [
    { tag: "The Sweetest Swing", desc: "The most natural swing in baseball history. Jackson's CON cannot be reduced below 4 by any debuff. The swing is perfect and permanent. Ruth copied it. Nobody improved on it." },
    { tag: "Black Betsy", desc: "Jackson's legendary bat, darkened with tobacco juice and resin. +1 CON when using Black Betsy. If Black Betsy is lost or broken, -2 CON until replaced (it cannot be truly replaced)." },
    { tag: "The Scandal", desc: "After any World Series appearance, 30% chance Jackson is banned for life. The ban removes him from the roster permanently. The greatest talent cut short by the darkest moment." },
    { tag: "Illiterate Genius", desc: "Jackson cannot read scouting reports, contracts, or signs. -1 strategic decisions. But: +2 pure batting instinct. The mind that couldn't read could hit .408." },
    { tag: "Mill Worker's Strength", desc: "Raised working in a textile mill from age 12. +1 STA, +1 physical durability. The body was built by labor before it was refined by baseball." },
    { tag: "Homesick", desc: "Jackson left teams multiple times due to homesickness. When playing away from home for extended stretches, 10% chance of -1 morale per week. The gentle soul misses the South." },
    { tag: "Ruth's Template", desc: "Babe Ruth modeled his swing after Jackson's. When Jackson and Ruth are on the same roster or face each other, both gain +1 CON. The master and the student." },
    { tag: "Say It Ain't So", desc: "After the scandal, Jackson's reputation is permanently marked. -3 to HOF consideration. +5 to cultural legacy. The myth outlives the man." },
  ],

  preferred_locations: [
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".356 career BA. .408 rookie. Black Betsy in hand. The sweetest swing in a place built for it." },
    { location: "Left Field", affinity: "HIGH", note: "Strong arm, good reads. Not Speaker-level but excellent. LF was his home for 12 years." },
    { location: "Cleveland / League Park", affinity: "HIGH", note: ".408, .395, .373 in three years. The Naps gave him his stage." },
    { location: "South Carolina", affinity: "HIGH", note: "Brandon Mills. Greenville. The textile mills. Home. Where he returned after the ban and where he died." },
    { location: "The World Series", affinity: "COMPLICATED", note: ".375 in 1919 WS. 12 hits. The only HR. Zero errors. The best performance in the Series — on the team that threw it." },
    { location: "Cooperstown", affinity: "BANNED", note: "NOT THERE. .356 career BA. 3rd all-time. Banned for life. The ghost in the cornfield." },
  ],

  momentum: {
    hot_triggers: [
      "First at-bat — Jackson often got a hit his first time up. The swing was ready from the first pitch.",
      "Hitting streaks — .408 in his first full season. When the swing is in rhythm, nothing can stop it.",
      "Home games — less homesick, more comfortable, the gentle soul at ease. +1 at home.",
      "Facing elite pitching — the better the pitcher, the more Jackson focused. .373 vs. AL's best in 1913.",
    ],
    cold_triggers: [
      "Homesickness — left teams multiple times. Away from South Carolina, the soul aches.",
      "Bullying from teammates — the finger bowl incident. Exploitation of his illiteracy.",
      "The scandal's weight — after 1919, the guilt/confusion/grief follows him. -1 in postseason if scandal chemistry triggers.",
      "Contract disputes — couldn't read his own contracts. Manipulated by owners and agents.",
    ],
    pressure_response: "TRANSCENDENT AND TRAGIC. In the biggest games, Jackson was magnificent: .375 in the 1919 WS, 12 hits (record), the only HR, zero errors. He played his best when the stakes were highest — even in the Series he was allegedly throwing. The pressure response is elite. The tragedy is that it didn't matter. In ILB: Jackson is a postseason weapon whose October performance may trigger his permanent removal from the game. The risk is existential. The reward is .408.",
  },

  action_card_seeds: [
    { title: "Four-Oh-Eight", type: "Game Action", text: "Your rookie outfielder bats .408 in his first full season. It is the highest batting average by a rookie in the history of baseball. It still stands. He finishes second in the league to a man hitting .420. It is one of the only times a .400 average has not won a batting title. +5 CON legend. +3 rookie record. The swing announces itself.", origin: "1911: Jackson hit .408 as a rookie — still the all-time rookie record. He finished second to Cobb's .420." },
    { title: "Black Betsy", type: "Drama", text: "Your outfielder carries a bat named Black Betsy. She is darkened with tobacco juice and pine resin until she is nearly black. She weighs 48 ounces. She is the most famous bat in baseball, and someday she will sell for $577,610. But today she is just a bat in the hands of a man with the sweetest swing alive. +1 CON permanently while wielding Black Betsy.", origin: "Jackson's bat 'Black Betsy' was his constant companion. It sold for $577,610 in 2001, then the highest price ever for a game-used bat." },
    { title: "Say It Ain't So, Joe", type: "Drama", text: "Your outfielder exits the courthouse. A child tugs at his sleeve. 'Say it ain't so, Joe. Say it ain't so.' Your player looks down. He has no answer. He accepted $5,000. He hit .375 in the World Series. He played his best. He took the money. Both things are true. Neither redeems the other. -5 reputation. +5 myth. The story will outlive everyone who heard it.", origin: "The famous (possibly apocryphal) exchange between a young fan and Jackson as he left the grand jury courthouse during the Black Sox trial." },
    { title: "The Sweetest Swing", type: "Game Action", text: "A young left-handed hitter watches your outfielder take batting practice. He studies the stance — the low crouch, the bat held back, the smooth level swing. He copies it exactly. He will become the greatest power hitter in baseball history. Babe Ruth learned to hit by watching Shoeless Joe Jackson. +5 all-time legacy. +3 influence on future eras.", origin: "Babe Ruth: 'I copied Jackson's style because I thought he was the greatest hitter I had ever seen. He's the guy who made me a hitter.'" },
    { title: "The Finger Bowl", type: "Drama", text: "Your outfielder is taken to a fine restaurant by his teammates. They are college men, city men. He is a mill worker from South Carolina who cannot read the menu. A finger bowl is placed on the table. His teammates watch, grinning. He drinks from it. They laugh. He leaves the team for a week. -2 morale. -1 team chemistry. The cruelty of small men toward a gentle giant.", origin: "While with Cleveland, Jackson's teammates tricked him into drinking from a finger bowl at an upscale restaurant, exploiting his illiteracy. He left the team." },
    { title: ".375 in the Fixed Series", type: "Game Action", text: "Your outfielder is allegedly helping to fix the World Series. He bats .375. He gets 12 hits — a World Series record. He hits the only home run in the entire Series. He commits zero errors. He plays perfectly. He also accepted $5,000 from gamblers. Did he try to throw the Series? The stats say no. The money says maybe. The truth died with him. +3 CLU (on the field). -3 integrity (off the field). The paradox that can never be resolved.", origin: "1919 WS: Jackson hit .375, set a WS record with 12 hits, hit the only HR, and made no errors — while allegedly participating in the fix." },
    { title: "The Ban", type: "Drama", text: "Commissioner Landis bans your outfielder for life. He is 33 years old. His career batting average is .356 — third highest in baseball history. He will never play in the major leagues again. He returns to South Carolina. He plays under assumed names in small-town leagues. He runs a liquor store. He dies in Greenville at 64. His museum is at 356 Field Street. The door to Cooperstown remains locked. -∞ career. +∞ myth.", origin: "1920: Commissioner Landis permanently banned Jackson and seven other White Sox players from professional baseball. Jackson's .356 career BA remains 3rd all-time." },
    { title: "Shoeless", type: "Origin", text: "Your outfielder's new cleats give him blisters. He removes them and bats in his stocking feet. He hits a triple. A fan in the bleachers yells: 'You shoeless son of a gun, you!' The nickname follows him for the rest of his life. He never plays shoeless again. But the name — Shoeless Joe — becomes the most famous nickname in baseball history. +3 legend. +2 identity. The moment a mill worker became a myth.", origin: "Jackson got blisters from new cleats, played one game in stocking feet, hit a triple, and a heckling fan gave him the most famous nickname in baseball." },
  ],

  art_direction: {
    face: "HANDSOME, GENTLE, HAUNTED. 6'1\" 200 lbs — big for the dead-ball era. Strong, athletic, but with a softness in the features that betrays the gentle soul beneath. The face should radiate NATURAL TALENT and VULNERABILITY in equal measure. Not fierce like Cobb or calculating like Collins — OPEN, honest, a little bewildered by the world beyond the batter's box. The eyes are the key: large, dark, expressive — the eyes of a man who could hit .408 but couldn't read his own name. A hint of sadness, even in the prime. The face of a man who knows something bad is coming but doesn't have the words to stop it.",
    attire: "Cleveland Naps uniform circa 1911 — white wool jersey with 'CLEVELAND' or 'C' insignia, baggy flannel pants. THE POSE: the swing — the sweetest swing in baseball, frozen at the moment of contact. Left-handed, the bat meeting the ball perfectly, the body in perfect alignment, the follow-through about to begin. Every line of the body should suggest NATURAL GRACE — no wasted motion, no violence, just the pure physics of a perfect swing. Black Betsy in his hands. Or: standing in the outfield, bat resting on his shoulder, looking toward home plate with that gentle, watchful expression. The man waiting for his turn. No number.",
    mood: "ELEGIAC. Jackson's card should feel like a MEMORY — something beautiful that has already been lost. Where Speaker is soaring precision and Collins is amber confidence, Jackson is TWILIGHT NOSTALGIA — the golden light of a summer afternoon that you know is ending. The mood should suggest both the beauty of the talent and the tragedy of its loss. The most emotional card in the Muggers collection.",
    style: "Sepia-toned with WARM, GOLDEN, CAROLINA undertones — the light of South Carolina summers, the gold of wheat fields, the warmth of the textile mill's furnace. Warmer than Speaker's silver, softer than Collins's amber. The Jackson palette is SUNSET GOLD — rich, warm, fading. The color of a talent that burned brightest just before it was extinguished. The most BEAUTIFUL palette in the Muggers collection, because beauty and loss are inseparable here.",
    reference: "Think the swing frozen at the point of contact — Black Betsy meeting the ball, the hands turning over, the body perfectly balanced. The ball is about to leave the bat at .408. Or: Jackson walking across a cornfield in his uniform, bat over his shoulder — the Field of Dreams image that has become his eternal portrait. Or: the courthouse steps, a man looking down, the child's voice asking the question that has no answer. The card should capture the instant before loss — the peak, the beauty, the last good moment.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }] },
  defense: { metric: "Positional excellence", note: "Strong arm, good fielder, but LF not CF. Not in Speaker's class." },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "WS BA + championships + scandal", note: ".375 WS BA in 1919, but banned. 1917 WS champion." },
};

const C = {
  parchment: "#f2ead8", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#c4a048", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", sunset: "#d4953a",
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

export default function ShoelessJoeCard() {
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
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.sunset}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.sunset, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.sunset}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt="Shoeless Joe Jackson" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 95%, ${C.parchment} 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.sunset}dd`, color: C.ink, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.warmRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>⛔ BANNED FOR LIFE</span>
                <span style={{ background: `${C.sunset}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>LEGEND</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>"Shoeless" Joe Jackson</div>
              <div style={{ fontSize: 11, color: C.sunset, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>The Sweetest Swing in Baseball</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>"Say it ain't so, Joe."</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "SB", val: d.real_stats.stolen_bases }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sunset, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1911 — .408 BA (STILL THE ALL-TIME ROOKIE RECORD)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR OPS+", val: d.real_stats.career_ops_plus },{ label: "CAR 3B", val: d.real_stats.career_3b },{ label: "'19 WS", val: ".375" },{ label: "WS H", val: "12" },{ label: "WS HR", val: "1" },{ label: "WS ERR", val: "0" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>.356 CAREER BA (3RD ALL-TIME) • BANNED 1920 • NOT IN HOF</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👟 Shoeless Joe", "🏆 1917 WS Champion", "🦇 Black Betsy", "📊 .408 Rookie Record", "🎬 Field of Dreams", "⛔ Banned for Life", "🏭 Mill Worker's Son", "📝 Illiterate", "❌ Not in HOF"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.sunset}15`, border: `1px solid ${C.sunset}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>"Shoeless" Joe Jackson</div>
              <div style={{ fontSize: 10, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "BANNED" ? `${C.warmRed}20` : l.affinity === "COMPLICATED" ? `${C.sunset}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "BANNED" ? C.warmRed : l.affinity === "COMPLICATED" ? C.sunset : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.warmRed, fontStyle: "italic" }}>These events span the highest highs and the lowest lows in baseball history.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Jackson's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
