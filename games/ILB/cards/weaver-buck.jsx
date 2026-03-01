import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}weaver-buck.png`;

const PLAYER_DATA = {
  name: "Buck Weaver",
  nickname: "Chicago's One Big Hero",
  year: 1920,
  team: "Chicago White Sox",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "3B/SS",
  bats: "S",
  throws: "R",
  height: '5\'11"',
  weight: "170 lbs",
  born: "August 18, 1890 — Pottstown, PA",
  died: "January 31, 1956 — Chicago, IL (age 65)",
  hof: "BANNED FOR LIFE. .272 career BA (.333 in final season). 1,308 H. 1917 WS champion. 1919 WS: .324 BA, 11 hits, 1.000 fielding — IN THE SERIES HE WAS BANNED FOR. Never received money. Never underperformed. His crime: knowing about the fix and not ratting out his teammates. Applied for reinstatement six times. Denied every time. Died on a Chicago street of a heart attack, still trying to clear his name. 'Buck is Chicago's one big hero.' — Ross Tenney, Cincinnati Post, 1919.",

  real_stats: {
    season: 1920, games: 151, at_bats: 630, hits: 210, doubles: 35,
    triples: 8, home_runs: 2, rbi: 74, runs: 104, stolen_bases: 19,
    batting_avg: ".333", obp: "~.370", slg: "~.430", ops: "~.800",
    ops_plus: "~120", war: "~5.5",
    last_season_note: "His best year. Age 29. Then banned forever.",
    season_1919: ".296 BA, 45 XBH (career high)",
    season_1919_ws: ".324 BA, 11 H, 4 2B, 1.000 fielding — PLAYED TO WIN",
    season_1918: ".300 BA — first time above .300",
    season_1917: "WS champion, .300+ in WS",
    season_1912: ".224 BA, 71 errors at SS — the raw beginning",
    career_avg: ".272", career_hits: 1308, career_hr: 21,
    career_rbi: 420, career_sb: 173, career_runs: 623,
    career_games: 1154, career_seasons: "9 (age 21-29)",
    career_war: "~25",
    defensive_rep: "Only 3B in AL that Ty Cobb would not bunt against",
    led_sac_hits: "ML leader 1915, 1916",
    led_ss_1913: "Led AL SS in putouts, assists, DP, range factor (1913)",
    switch_hitter: "Self-taught — debuted as weak RH hitter, taught himself to switch-hit",
    black_sox: "Attended 2 meetings. Received $0. Hit .324 in WS. Banned for knowing.",
    reinstatement: "Applied 6 times. Denied every time.",
    schalk_quote: "Ray Schalk named SEVEN players involved, not eight. Weaver was the omission.",
    tenney_quote: "Weaver's smile never faded. His spirit never waned. Buck is Chicago's one big hero.",
  },

  ilb_stats: {
    ovr: 8,      // All-Star — The most tragic figure in the Black Sox scandal. Excellent defensive SS/3B. Only 3B Cobb wouldn't bunt against. Self-taught switch-hitter who improved from .224 to .333. 1917 WS champ. Hit .324 in the 1919 WS he was banned for. Applied 6 times for reinstatement. Died trying. The career was cut at 29 — the trajectory suggests he was becoming a star when the ban ended everything.
    con: 5,      // .333 BA in 1920 → tier 5 (.330+). OPS+ ~120 → misses ≥130 bonus. Career .272 is lower than any other CON 5 player in the Muggers — but the system uses peak season, and .333 clears the tier 5 threshold. Context: Weaver was a late bloomer who taught himself to switch-hit and improved every year. .224 (1912) → .246 → .270 → .265 → .227 → .284 → .300 → .296 → .333. The trajectory was ASCENDING. He was banned at 29 during his best season. Rating: 5.
    pow: 0,      // 21 career HR in 9 seasons (~2-3/year). SLG .401 (1919 career high). Never hit for power. Not even dead-ball-adjusted power. Zero. Rating: 0.
    spd: 2,      // 173 career SB in 9 seasons (~19/year). Peak probably 20-25 → tier 2 (16-30). Agile, athletic, could play SS and 3B. Good baserunner, not elite speed. Rating: 2.
    def: 3,      // MAXIMUM. The case: (1) 'Only third baseman in the league Ty Cobb would not bunt against.' (2) Led ML in sac hits 1915, 1916. (3) Led AL SS in putouts, assists, DP, range factor (1913). (4) Never posted negative defensive bWAR in any season. (5) 4 years with 1.0+ dWAR. (6) 1.000 fielding % in 1919 WS. (7) Excellent at BOTH SS and 3B — positional versatility at the highest defensive level. (8) 'An excellent fielder' — every source agrees. (9) Weaver's defensive excellence is one of the few things about his career that is completely uncontested. Rating: 3.
    clu: 1,      // COMPLICATED — same paradox as Shoeless Joe Jackson. 1917 WS champion (genuine). 1919 WS: .324 BA, 11 H, 4 2B, 1.000 fielding — elite performance IN the fixed Series. But: banned for his connection to the fix. He attended the meetings. He knew. He didn't report it. Even though he played to win, the association with the scandal permanently stains the October record. The 1 reflects: one legitimate championship (1917) + elite 1919 WS stats, offset by the ban and the moral ambiguity. Rating: 1.
  },

  stat_justification: {
    con: ".333 BA in 1920 → tier 5 (.330+). OPS+ ~120 → misses ≥130 bonus. Career: .272 BA — the lowest career average of any CON 5 player in the Muggers. BUT: the system uses peak season, and .333 crosses the threshold. Critical context: Weaver was a self-taught switch-hitter who improved dramatically every year. His progression: .224 → .246 → .270 → .265 → .227 → .284 → .300 → .296 → .333. He was ASCENDING when banned at 29. Had he played through the 1920s (lively ball era), that .333 was likely a floor, not a ceiling. The ban didn't just end his career — it ended a trajectory. Rating: 5.",
    pow: "21 career HR in 9 seasons (~2-3 per year). SLG .401 in 1919 (career best) — nowhere near the ≥.500 bonus. Weaver was a contact/defense player with zero power. His 45 XBH in 1919 (career high) were doubles and triples, not home runs. Rating: 0.",
    spd: "173 career SB in 9 seasons (~19 per year). Peak probably 20-25 SB → tier 2 (16-30). Agile and athletic enough to play both SS and 3B at an elite defensive level. Good baserunner, solid speed, not a burner. Rating: 2.",
    def: "MAXIMUM. Uncontested. Every source agrees Weaver was an elite fielder at two premium positions. (1) 'Only third baseman in the league Ty Cobb would not bunt against' — this alone is extraordinary. Cobb bunted against everyone EXCEPT Weaver. (2) Led AL shortstops in putouts, assists, double plays, and range factor in 1913. (3) Led ML in sacrifice hits in 1915 and 1916. (4) Never posted negative defensive bWAR. (5) Four seasons with 1.0+ dWAR. (6) 1.000 fielding percentage in the 1919 WS. (7) Played both SS and 3B at elite level — the rarest defensive combination. Rating: 3.",
    clu: "THE PARADOX. Same structure as Shoeless Joe Jackson. Weaver was the 1917 WS champion (legitimate). In the 1919 WS, he hit .324 with 11 hits and played errorless ball — by FAR the strongest performance of anyone connected to the fix. Ross Tenney (Cincinnati Post): 'Buck is Chicago's one big hero.' Ray Schalk named SEVEN conspirators, not eight — Weaver was omitted. But: he attended the meetings. He knew. He didn't report it. Landis: 'his presence at the meetings was sufficient.' The ban is real even if the performance was clean. Rating: 1 — the championship plus the elite WS stats, permanently offset by the scandal's shadow.",
  },

  personality: {
    leadership_style: "THE FIGHTER WHO WOULDN'T QUIT. Weaver's defining quality was relentless spirit — on the field, in the 1919 WS, and in 35 years of reinstatement attempts. Ross Tenney: 'One by one his mates gave up. Weaver continued to grin and fought harder.' He fought for every ball, every at-bat, and every petition. The leadership was in the refusal to surrender.",
    temperament: "THE ETERNAL SMILE. Weaver was described as having an 'ever-smiling, jug-eared face that mimicked a Halloween Jack.' His niece: 'Weaver was an inspiration to everyone around him.' The smile was not ignorance — it was defiance. He smiled while his teammates threw the World Series. He smiled while the commissioner banned him for life. He smiled while applying for reinstatement for the sixth time. The smile was the weapon.",
    work_ethic: "SELF-MADE HITTER. Weaver debuted at .224 with 71 errors. He taught himself to switch-hit in the offseason. He improved every year: .224 → .246 → .270 → .284 → .300 → .296 → .333. The trajectory is remarkable — a man who remade himself through sheer work. The ban at 29 ended the experiment at its peak.",
    lifestyle: "POTTSTOWN TO CHICAGO TO LIMBO. Born in Pottstown, PA. Played his entire career in Chicago. After the ban: worked as a pari-mutuel clerk at racetracks, a drugstore clerk, a tax assessor. Played in outlaw leagues against inferior talent. Applied for reinstatement. Was denied. Applied again. Denied again. The cycle repeated six times over 35 years. He died of a heart attack walking down a Chicago street on January 31, 1956. He was 65.",
    era_adaptability: "THE INTERRUPTED TRAJECTORY. Weaver was banned at 29 during his best season (.333). In the 1920s — the lively ball era — his ascending batting average would likely have soared. His defense at 3B was already elite. His comparison to Pete Rose (another fiery 3B banned for gambling knowledge) suggests what might have been: a .290-.300 career hitter with Gold Glove defense who played into his late 30s. Instead: 9 seasons, .272, the end.",
    clubhouse_impact: "THE LOYALTY TRAP. Weaver's tragedy is rooted in loyalty. He attended the fix meetings because his teammates invited him. He didn't participate because he wanted to win. He didn't report them because you don't rat out your friends. This is the specific loyalty that Landis punished — not fixing games, but keeping silent. In the ILB clubhouse: Weaver creates +2 teammate loyalty and -2 institutional trust. The team loves him. The commissioner bans him.",
    dark_side: "The silence. Weaver knew. He attended the meetings. He could have stopped it — or at least reported it. He chose loyalty to teammates over loyalty to the game. The romanticism of the 'innocent' Buck Weaver obscures the harder truth: SABR researcher Bill Lamb (2023) assessed that 'all the available evidence points to Weaver being just as guilty as the others.' Three confessing players, plus Felsch, plus Gandil, plus two gamblers — all named him as a co-conspirator who attended three meetings where the fix was discussed. The smile was appealing. The silence was complicit. The truth is somewhere in between: he played to win and he knew what was happening. Both things are true.",
  },

  chemistry_traits: [
    { tag: "Cobb Won't Bunt", desc: "The only 3B in the AL that Ty Cobb would not bunt against. +2 DEF against bunts. When Cobb faces Weaver: bunt attempt auto-fails. The highest defensive compliment in dead-ball baseball." },
    { tag: "The Eternal Smile", desc: "Weaver smiled through everything — victories, the fixed WS, the ban, 35 years of denied petitions. +1 team morale. The smile is contagious. But: opponents may underestimate him." },
    { tag: "The Scandal (Weaver)", desc: "After any WS appearance, 30% chance Weaver is banned for life — same mechanic as Jackson. His 'crime': knowing and not reporting. The risk is identical; the guilt is more ambiguous." },
    { tag: "The Ascending Trajectory", desc: ".224 → .333 over 9 years. Weaver improves +0.01 CON every 2 seasons played (cumulative). The self-taught switch-hitter who keeps getting better — until the ban." },
    { tag: "The Loyalty Trap", desc: "Weaver will NEVER report teammate misconduct. +2 teammate loyalty, -2 institutional trust. If teammates are fixing games, Weaver knows and stays silent. The loyalty is his gift and his curse." },
    { tag: "SS/3B Flexibility", desc: "Weaver was elite at both SS and 3B. Can play either position without DEF penalty. The rarest defensive combination in the dead-ball era." },
    { tag: "Six Petitions", desc: "After being banned, Weaver petitions for reinstatement every 5 years. Each denial costs -1 morale but +1 determination. The fight never ends." },
    { tag: "Clean Stats, Dirty Association", desc: "1919 WS: .324 BA, 11 H, 1.000 fielding — in the fixed Series. The performance was clean. The association wasn't. +2 controversy. The debate never dies." },
  ],

  preferred_locations: [
    { location: "Third Base", affinity: "HIGH", note: "Only 3B Cobb wouldn't bunt against. Elite range, reflexes, instinct. The position where he earned his reputation." },
    { location: "Shortstop", affinity: "HIGH", note: "Original position (1912-16). Led AL SS in all major categories (1913). Moved to 3B only when Risberg arrived." },
    { location: "Batter's Box (Both Sides)", affinity: "HIGH", note: "Self-taught switch-hitter. .333 in final season. The ascending curve that was interrupted." },
    { location: "Comiskey Park / Chicago", affinity: "HOME", note: "Entire career with the White Sox. 1917 WS champ. 1919 scandal. Died in Chicago, still fighting." },
    { location: "The World Series", affinity: "TRAGIC", note: ".324 in the fixed 1919 WS. Played to win. Was banned anyway. The stage of his greatest performance and his destruction." },
  ],

  momentum: {
    hot_triggers: [
      "Fighting — 'One by one his mates gave up. Weaver continued to grin and fought harder.' Spirit fuels performance.",
      "Improving — the ascending trajectory. Each season Weaver gets slightly better. The self-improvement never stops.",
      "Defensive challenges — Cobb won't bunt on him. When opponents test Weaver's defense, he rises.",
      "Playing for teammates — Weaver's loyalty makes him play harder when teammates need him.",
    ],
    cold_triggers: [
      "The ban — after any scandal-related event, -3 to all stats. The weight of the knowledge crushes.",
      "Institutional betrayal — when the system punishes him despite clean play, -2 morale.",
      "Early career errors — 71 errors in his rookie year. The raw beginning haunts.",
      "Isolation — when teammates are removed (banned, traded), -1 per teammate lost.",
    ],
    pressure_response: "DEFIANT EXCELLENCE. Weaver's 1919 WS line — .324 BA, 11 H, 1.000 fielding — was produced while knowing his teammates were throwing the Series around him. He played to WIN while the fix was happening. This is either the most heroic or most surreal pressure response in baseball history. He knew the games were compromised. He played his hardest anyway. The smile never faded. In ILB: Weaver performs well under pressure, but the scandal risk makes every October appearance a gamble — elite performance with existential consequences.",
  },

  action_card_seeds: [
    { title: "Three-Twenty-Four in the Fixed Series", type: "Game Action", text: "The World Series is fixed. Your teammates are throwing games. Your third baseman knows. He steps to the plate anyway. He gets 11 hits. He bats .324. He plays errorless ball. He fights while his world collapses. 'Weaver's smile never faded. His spirit never waned.' +3 CON. +3 DEF. +5 tragedy. The clean stats in the dirty Series.", origin: "1919 WS: Weaver hit .324 with 11 hits and 1.000 fielding — the best performance of any Black Sox player — in the Series he was banned for." },
    { title: "Cobb Won't Bunt", type: "Game Action", text: "Ty Cobb, the most dangerous hitter in baseball, steps to the plate. Every other third baseman in the league braces for the bunt. Your third baseman doesn't. Cobb doesn't bunt. Because your third baseman is the only man in the league that Cobb respects too much to try. +3 DEF. +2 reputation. The highest compliment the dead-ball era can give.", origin: "Weaver was known as 'the only third baseman in the league against whom Ty Cobb would not bunt.'" },
    { title: "The Ascending Line", type: "Game Action", text: "Your third baseman hit .224 in his first year. Then .246. Then .270. Then .284. Then .300. Then .333. Each year, he taught himself to be better — switch-hitting, plate discipline, contact. The line goes up and up and up. Then a commissioner draws a line through it. +2 CON. +3 work ethic. -∞ continuation. The trajectory that will never be completed.", origin: "Weaver improved from .224 (1912) to .333 (1920) through self-taught switch-hitting. He was banned at 29 during his best season." },
    { title: "Chicago's One Big Hero", type: "Drama", text: "'Though they are hopeless and heartless, the White Sox have a hero. He is George Weaver, who plays and fights at third base. Day after day Weaver has done his work and smiled. One by one his mates gave up. Weaver continued to grin and fought harder. Weaver's smile never faded. His spirit never waned. Buck is Chicago's one big hero; long may he fight and smile.' — Ross Tenney, Cincinnati Post, October 10, 1919. +5 spirit. +3 cultural legacy. The eulogy written before the funeral.", origin: "Ross Tenney of the Cincinnati Post praised Weaver during the 1919 WS as the only White Sox player who kept fighting." },
    { title: "The Six Petitions", type: "Drama", text: "Your third baseman is banned. He applies for reinstatement. Denied. He applies again. Denied. And again. Denied. And again. And again. And again. Six times over 35 years. The answer is always no. He sends his legal papers to a New York attorney who promises to help. The papers are never returned. They have never been found. +3 determination. -3 justice. The fight that never wins.", origin: "Weaver applied for reinstatement to baseball at least six times between 1922 and his death in 1956. Every petition was denied." },
    { title: "The Loyalty Trap", type: "Drama", text: "Your teammates ask you to a meeting. They're going to fix the World Series. You go to the meeting. You listen. You don't take money. You don't throw games. You play your heart out. But you don't report them. Because you don't rat out your friends. The commissioner doesn't care about your performance. He cares about your silence. You are banned for life. For loyalty. -5 career. +5 loyalty. The trap has no escape.", origin: "Weaver attended fix meetings but didn't participate or take money. Landis banned him for knowing and not reporting. 'His presence at the meetings was sufficient.'" },
    { title: "Heart Attack on a Chicago Street", type: "Drama", text: "It is January 31, 1956. Your former third baseman is 65 years old. He has been banned from baseball for 35 years. He is walking down a Chicago street. His heart stops. He dies. He never cleared his name. He never got back in. The smile finally fades. The fight finally ends. +∞ tragedy. The man who couldn't quit finally had no choice.", origin: "Buck Weaver died of a heart attack on a Chicago street on January 31, 1956, at age 65. He had spent 35 years trying to clear his name." },
    { title: "Schalk Named Seven", type: "Drama", text: "Your catcher, Ray Schalk, gives an interview. He names the players involved in the fix. He names seven. Not eight. Your third baseman's name is not on the list. Because your catcher — who watched every game from behind the plate — knows. He knows who threw and who fought. Your third baseman fought. But the commissioner doesn't ask the catcher. +3 evidence of innocence. -0 impact on the ban. The testimony that changed nothing.", origin: "Ray Schalk named SEVEN White Sox players involved in the fix in a 1919 interview — not eight. Weaver was the omission." },
  ],

  art_direction: {
    face: "SMILING, DEFIANT, DOOMED. 5'11\" 170 lbs — lean, athletic, wiry. The face should be the SMILE — the 'ever-smiling, jug-eared face that mimicked a Halloween Jack.' This is the smile that never faded — not during the fixed World Series, not during the ban, not during 35 years of denied petitions. The ears should be prominent (jug-eared). The features should be LIVELY, ANIMATED — a face built for laughter and competition, not tragedy. But in the eyes: the KNOWLEDGE. He knows what's happening. He knows his teammates are throwing the Series. He's playing his heart out anyway. The smile is on his face but the weight is in his eyes. Pottstown, Pennsylvania features — working-class, industrial, the grit of the Schuylkill Valley.",
    attire: "Chicago White Sox uniform circa 1919-1920 — white wool jersey with 'SOX' or 'CHICAGO' across the chest, flat cap. THE POSE: the defensive crouch at third base — low, coiled, ready, the man Cobb wouldn't bunt against. The body lean and athletic, the glove positioned for anything — bunt, line drive, hard grounder. This is DEFIANCE — the man who played to win while his world was falling apart. Or: the swing from both sides — a split composition showing the self-taught switch-hitter, the man who remade himself. Or: standing alone after the ban — the White Sox uniform still on but fading, the man exiled from the game he loved. No number.",
    mood: "BRIGHT AND BROKEN. Weaver's card should feel like a PHOTOGRAPH BEING TORN — one half bright and alive (the smile, the defense, the .333 season), the other half darkening and fading (the ban, the petitions, the death on a Chicago street). The tension between the BRIGHTNESS of his spirit and the DARKNESS of his fate should define the card. Where Jackson's card is sunset-gold fading, Weaver's is MORNING LIGHT interrupted — the dawn that was stopped before noon.",
    style: "Sepia-toned with a SPLIT PALETTE — warm WHITE SOX IVORY on one side (the clean play, the smile, the fighting spirit) bleeding into COAL-ASH GRAY on the other (the scandal, the ban, the 35-year exile). The Weaver palette is INTERRUPTED LIGHT — the brightness of South Side Chicago cut by the shadow of the commissioner's office. More dramatic and stark than any other Muggers card — the contrast IS the story.",
    reference: "Think the smile — Weaver at third base, grinning, ready, alive. Then: the same man at 65, walking down a Chicago street, the smile long since internalized. The card should capture BOTH — the young defender who Cobb feared and the old man who couldn't get back in. Or: the 1919 WS — Weaver at the plate, lining a hit, while behind him the games are being thrown. The hero in the wreckage. John Cusack played him in Eight Men Out (1988) — the performance captures the mix of joy and doom.",
  },
};

const C = {
  parchment: "#ece6d8", darkBrown: "#2d2319", medBrown: "#5e4a36",
  gold: "#b8974a", warmRed: "#7a3328", sepia: "#8f7858",
  cream: "#f7f1e5", ink: "#221a10", hotRed: "#b03d2e",
  coldBlue: "#3a6b8c", traitGreen: "#3f6b4d",
  silver: "#8a9098", ivory: "#e8e0cc", ash: "#5a5a5a",
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

export default function BuckWeaverCard() {
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
      <div style={{ width: "100%", maxWidth: 420, background: `linear-gradient(135deg, ${C.ivory} 0%, ${C.parchment} 50%, #d8d0c0 100%)`, borderRadius: 8, border: `3px solid ${C.ash}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.ash, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.ash}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.ash}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position} • S</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.hotRed}ee`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>⛔ BANNED FOR LIFE</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.ash, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>CHICAGO'S ONE BIG HERO</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: C.hotRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>The Smile That Never Faded • The Name That Was Never Cleared</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.hotRed}10`, border: `1px solid ${C.hotRed}30`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.hotRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>⚠ 1919 WS: .324 BA / 11 H / 1.000 FIELDING — BANNED FOR KNOWING, NOT THROWING</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".333" },{ label: "OBP", val: "~.370" },{ label: "SLG", val: "~.430" },{ label: "OPS+", val: "~120" },{ label: "H", val: "210" },{ label: "2B", val: "35" },{ label: "R", val: "104" },{ label: "SB", val: "19" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.silver, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1920 — .333 BA / 210 H / HIS BEST YEAR / THEN BANNED FOREVER</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: ".272" },{ label: "CAR H", val: "1,308" },{ label: "CAR SB", val: "173" },{ label: "SEASONS", val: "9" },{ label: "'17 WS", val: "CHAMP" },{ label: "'19 WS", val: ".324" },{ label: "'19 FLD", val: "1.000" },{ label: "PETITIONS", val: "6" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.ash, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>ONLY 3B COBB WOULDN'T BUNT AGAINST • .224 → .333 (SELF-TAUGHT SWITCH-HITTER)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⛔ Banned For Life", "🏆 1917 WS Champion", "😊 The Smile", "🛡 Cobb Won't Bunt", "🔄 Switch-Hitter", "📋 6 Petitions Denied", "💔 Died Trying", "🎬 Eight Men Out"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.ash}15`, border: `1px solid ${C.ash}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.ash, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — MUGGERS 1910</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "TRAGIC" ? `${C.hotRed}20` : `${C.ash}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "TRAGIC" ? C.hotRed : C.ash, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`, color: a.type === "Drama" ? C.warmRed : C.coldBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
