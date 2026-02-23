import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}elberfeld-kid.png`;

const PLAYER_DATA = {
  name: "Kid Elberfeld",
  nickname: "The Tabasco Kid",
  year: 1901,
  team: "Detroit Tigers",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '5\'7"',
  weight: "158 lbs",
  born: "April 13, 1875 — Pomeroy, OH",
  died: "January 13, 1944 — Signal Mountain, TN (age 68)",
  hof: "NOT in HOF. 'The dirtiest, scrappiest, most pestiferous, most rantankerous, most rambunctious ball player that ever stood on spikes.' Scouts chose him over Honus Wagner. Taught Ty Cobb not to slide headfirst. Discovered Travis Jackson. Bought Casey Stengel his first suit. The chaos agent the Hall could never admit.",

  real_stats: {
    season: 1901, games: 136, at_bats: 536, hits: 165, doubles: 22,
    triples: 9, home_runs: 3, rbi: 76, runs: 75, stolen_bases: 23,
    batting_avg: ".308", obp: ".397", slg: ".392", ops: ".789",
    ops_plus: "~120", war: "~5.5",
    range_factor: "6.14 (80+ above league avg)",
    assists_game: 12, career_avg: ".271", career_hits: 1235,
    career_hr: 10, career_sb: "~200", career_ejections: 26,
    career_war: "~22", career_hbp_rank: "Top 15 all-time",
    chosen_over: "Honus Wagner (by scout, 1897)",
  },

  ilb_stats: {
    ovr: 7,      // All-Star — Elite defensive SS in prime. .308 BA peak. Great range, cyclonic arm, best DP pivot per Connie Mack. But the real value is the CHAOS: 26+ ejections, umpire assaults, mud in mouths, knees to Cobb's neck. The most entertaining and terrifying player on any roster.
    con: 3,      // .308 BA in 1901 → tier 4 (.300-.329). But career .271 BA and OPS+ ~120 peak (not consistently ≥130). The hitting was good-not-great — useful for a SS but not his defining trait. Rating: 3.
    pow: 0,      // 3 HR in 1901. 10 career HR. Zero power. SLG .392 peak. He was 5'7" 158 lbs — the power was in his temper, not his bat. Rating: 0.
    spd: 2,      // 23 SB in 1901. ~200 career SB. Stole home twice in one game. Fast on his feet, good baserunner, but not elite speed. Rating: 2.
    def: 2,      // Range factor 6.14 (80+ above league SS avg, 1901). 459 assists (1902). 12 assists in one game. Connie Mack: best SS at the DP pivot (1906). "Cyclonic" throwing arm. BUT: 458 career errors at SS. Great range + high errors = volatile defender. Rating: 2.
    clu: 0,      // Zero postseason appearances. The Tigers didn't contend with him. The Highlanders never won a pennant. No October. Rating: 0.
  },

  stat_justification: {
    con: ".308 BA in 1901 → tier 4 (.300-.329). Career .271 BA. OPS+ ~120 in peak year (not reaching ≥130 bonus threshold). wRC+ 106 with the Highlanders (1903-09). He was a useful hitter for a shortstop — good OBP (.397 in 1901), drew walks, got hit by pitches constantly (top 15 all-time in HBP). But the hitting was complementary to the defense and the chaos. Rating: 3.",
    pow: "3 HR in 1901. 10 career HR in 14 seasons. SLG .392 peak, .333 with Highlanders. He was 5'7\" and 158 pounds. There was no power. The bat produced singles, walks, and the occasional double. The violence was saved for the basepaths. Rating: 0.",
    spd: "23 SB in 1901. ~200 career SB. Stole home twice in one game. 'Fast on his feet with good range up the middle.' He was quick and aggressive on the basepaths, but not a true speed demon. The stolen bases were more about baserunning intelligence and willingness to take risks than raw speed. Rating: 2.",
    def: "Peak range: 6.14 range factor (80+ points above league SS average) in 1901 — elite. 459 assists in 1902. 12 assists in a single game. Connie Mack rated him the best SS at turning the double play (1906). Throwing arm called 'cyclonic.' BUT: 458 career errors at SS. The errors came from aggression — he got to everything but sometimes threw it away. The high-error, high-range profile makes him a volatile defender: brilliant and infuriating in equal measure. Rating: 2.",
    clu: "Zero. The Tigers didn't contend during his time (1901-03). The Highlanders improved dramatically after his arrival (54-39 rest of 1903) but never won a pennant. He managed the 1908 Highlanders for 98 games but they finished 6th. No postseason appearances. The Tabasco Kid's fire never reached October. Rating: 0.",
  },

  personality: {
    leadership_style: "CHAOS LEADER. Elberfeld didn't lead through example or inspiration — he led through intimidation, rage, and sheer force of personality. He attacked umpires, terrorized baserunners, fought teammates and owners. But he also mentored Jimmy Austin, discovered Travis Jackson, bought Casey Stengel his first suit, and ran youth baseball camps. The Tabasco Kid was both the worst influence and the most generous soul on any team he joined.",
    temperament: "VOLCANIC. Ejected 26+ times. Threw mud into an umpire's mouth. Chased umpires with bats. Assaulted Silk O'Loughlin (removed by police). Knocked unconscious by umpire Tim Hurst's mask: 'I guess that puts an end to the Tabasco Kid.' It did not. Three HBP in a single game. Kneed Ty Cobb's face into the dirt. Poured raw whiskey into spike wounds. The temperament was Tabasco — it burned everything it touched, including himself.",
    work_ethic: "RELENTLESS. He broke into organized ball in 1892, in Clarkson, Tennessee. He played in the minors, the majors, back to the minors, back to the majors. He managed for 15 years in the Southern Association. He ran youth baseball camps. He was active in professional baseball until age 61 — 44 years in the game. The fire never went out because the work never stopped.",
    lifestyle: "Ohio-born, Tennessee-adopted. First roommate: Big Ed Delahanty. Married Emily Grace Catlow (1900). Daughters formed 'The Elberfeld Sisters' barnstorming basketball team — he promoted women in sports decades before it was acceptable. Youth baseball coach in Washington. Manager in Chattanooga and Little Rock for years. Died on Signal Mountain, TN, surrounded by apple orchards. The chaos agent retired to a peaceful mountain.",
    era_adaptability: "MIXED. The baserunning violence and umpire abuse would get him banned in any modern era. But the defensive range, the DP pivot, the OBP skills, and the intense competitiveness would make him valuable anywhere. He'd need anger management, but if he could channel the fire into just the game itself, he'd be an elite defensive SS with a useful bat. The Tabasco Kid in 2024 would have a very expensive therapist and a very long suspension history.",
    clubhouse_impact: "POLARIZING. He battled teammates, managers, and owners. He was suspended repeatedly. He was traded because teams couldn't handle him. But Jimmy Austin raved about his mentorship. Casey Stengel loved him. Travis Jackson owed him his career. The Elberfeld effect: -3 discipline, +3 intensity, +2 mentorship to young players. The clubhouse either rallied around the chaos or fell apart because of it.",
    dark_side: "The violence was real. Kneed Cobb's face into the dirt. Assaulted umpires. Chased them with bats. Got hit in the head three times in one game and kept playing. Poured whiskey into open wounds. His legs were 'badly scarred from years of high-flying spikes.' The Tabasco Kid wasn't playing a character — he was a man who processed the world through aggression. The scars weren't badges of honor; they were the cost of a personality that couldn't stop fighting. And in 1903, there were allegations of throwing games — charges in the St. Louis Globe-Democrat. The fire that made him great also made him dangerous.",
  },

  chemistry_traits: [
    { tag: "The Tabasco Kid", desc: "Pure fire. All opponents face -1 morale when Elberfeld is in the lineup. Umpires call strikes wider (+1 opponent frustration). But: 15% ejection risk per game. The fire burns both ways." },
    { tag: "Chosen Over Wagner", desc: "A scout picked Elberfeld over Honus Wagner: 'The Dutchman is too clumsy.' When Elberfeld faces a player considered 'better' than him, +2 to all stats. The chip on the shoulder is permanent." },
    { tag: "Cobb's Teacher", desc: "Kneed Ty Cobb's face into the dirt. Cobb never slid headfirst again. When an opponent slides headfirst, Elberfeld delivers -2 to their baserunning. The lesson is physical." },
    { tag: "Whiskey in the Wounds", desc: "Elberfeld poured raw whiskey into spike wounds. He cannot be removed for injury during a game — he plays through everything. +1 durability. The pain is fuel." },
    { tag: "Cyclonic Arm", desc: "Newspaper description of his throwing arm. From deep in the hole or the DP pivot, +1 DEF on throws. The arm was his best tool." },
    { tag: "Umpire's Nightmare", desc: "26+ ejections. Mud in mouths. Bat chasing. Police escorts. Umpires subconsciously give Elberfeld's opponents favorable calls (-1 to close-call outcomes for Elberfeld's team). The reputation precedes." },
    { tag: "Youth Coach", desc: "Mentored Jimmy Austin. Discovered Travis Jackson (HOF). Bought Casey Stengel his first suit. Ran youth camps. For every young player on the roster, +1 development speed. The chaos agent becomes the teacher." },
    { tag: "The Elberfeld Sisters", desc: "His daughters formed a legendary barnstorming basketball team. +1 franchise innovation. The family that plays together terrifies together." },
  ],

  preferred_locations: [
    { location: "Shortstop (deep hole)", affinity: "HIGH", note: "Range factor 80+ above average. Cyclonic arm. 12 assists in a game. The deep hole was his kingdom." },
    { location: "The Basepaths", affinity: "HIGH", note: "Stole home twice in one game. ~200 career SB. The basepaths were a combat zone and he was always armed." },
    { location: "The Umpire's Face", affinity: "HIGH", note: "26+ ejections. Mud throwing. Bat chasing. Assault. The umpire's face was where the Tabasco Kid did his best work." },
    { location: "The Dugout (mentoring)", affinity: "HIGH", note: "Austin. Jackson. Stengel. The chaos agent became the best teacher in the minor leagues." },
    { location: "Signal Mountain, TN", affinity: "HIGH", note: "Apple orchards. Where the Tabasco Kid finally found peace. He died surrounded by trees, not umpires." },
    { location: "October", affinity: "LOW", note: "Never got there. 14 ML seasons. Zero postseason. The fire never reached the biggest stage." },
  ],

  momentum: {
    hot_triggers: [
      "Umpire conflict — when the calls go against him, the Tabasco Kid ignites. +2 intensity, -2 discipline.",
      "Challenged by baserunners — 'he challenged baserunners to slash him out of their way.' Contact at second = fuel.",
      "Being underestimated — 5'7\" 158 lbs. Every time someone calls him small, +1 to all stats.",
      "Getting hit by pitches — each HBP makes him angrier. By the 3rd HBP, he's unstoppable.",
    ],
    cold_triggers: [
      "Ejection — 15% risk per game. When ejected, the team loses their best defender and their fire simultaneously.",
      "Suspension — after umpire assaults, Elberfeld misses games. The team deflates without his energy.",
      "Aging — the range faded with time. 458 career errors accumulated. The fire outlasted the body.",
      "Authority figures — he fought managers and owners. When management asserts control, -2 morale.",
    ],
    pressure_response: "UNTESTED IN OCTOBER. Elberfeld never played a postseason game. But the evidence suggests he would either be transcendent or get himself ejected in the 3rd inning. The Tabasco Kid's pressure response is BINARY: either he channels the fire into the greatest defensive game of the series, or he charges the umpire and gets banned. In ILB: high variance. Roll the dice. The Tabasco Kid doesn't do steady.",
  },

  action_card_seeds: [
    { title: "Mud in the Umpire's Mouth", type: "Game Action", text: "Your shortstop throws a lump of mud into the umpire's open mouth. The umpire is too stunned to eject him immediately. The crowd erupts. The opposing team loses focus. -2 opponent composure. +3 fun. 50% ejection risk (delayed). The Tabasco Kid has no boundaries.", origin: "While in the minors, Elberfeld threw a lump of mud into the umpire's open mouth. This is a real thing that happened." },
    { title: "Cobb's Last Headfirst Slide", type: "Game Action", text: "A rookie slides headfirst into second base. Your shortstop digs his knee into the back of the runner's neck, grinding his face into the dirt. The runner never slides headfirst again. -3 to opponent's baserunning aggression for the rest of the season. +2 intimidation. The lesson is permanent.", origin: "During Ty Cobb's rookie year, Elberfeld kneed Cobb's face into the dirt. Cobb biographers say it was the last time Cobb slid headfirst. Elberfeld later said: 'Ty found out my feet were harder than his head.'" },
    { title: "Whiskey in the Wounds", type: "Drama", text: "Your shortstop is spiked sliding into second. Blood runs from his leg. He calls for a bottle. He pours raw whiskey into the open wound. He returns to play. His legs are scarred — every scar a baserunner's calling card. +2 durability. +1 intimidation. The pain is nothing.", origin: "Elberfeld's legs were badly scarred from years of spikings. He reportedly poured raw whiskey into spike wounds to cauterize them." },
    { title: "Three Hit By Pitches in One Game", type: "Game Action", text: "Your shortstop is hit by a pitch. Then hit again. Then hit a THIRD time. He stays in the game all three times. He's angrier after each one. By the third HBP, the opposing pitcher is terrified to throw inside. +1 OBP per HBP in the game. +3 intimidation. The body absorbs what the mind refuses to accept.", origin: "Elberfeld once took three pitches to the head in a single game and stayed in for all of them." },
    { title: "Chosen Over the Dutchman", type: "Origin", text: "A scout watches two shortstops in a minor league game. One commits two errors. The other plays brilliantly. The scout telegrams Philadelphia: 'The Dutchman is too clumsy. The fellow you want is the little guy.' Your team signs the little guy. The Dutchman goes to Louisville and becomes the greatest shortstop in baseball history. +3 irony. +2 chip on the shoulder (permanent).", origin: "1897: A Phillies scout chose Elberfeld over Honus Wagner after Wagner committed two errors in a game. Wagner ended up with Louisville and the rest is history." },
    { title: "Stolen Home — Twice", type: "Game Action", text: "Your shortstop steals home. The crowd goes wild. Two innings later, he steals home AGAIN. In the same game. +2 SPD for the game. +3 audacity. The baserunner who fears nothing.", origin: "Elberfeld stole home twice in a single game during his career." },
    { title: "I Guess That Puts an End to the Tabasco Kid", type: "Drama", text: "Your shortstop argues a call so violently that the umpire removes his mask and brings it down on your player's head. Your player falls unconscious. 'I guess that puts an end to the Tabasco Kid,' the umpire says. It does not. Your player returns next game. +2 legend. -1 game. The Tabasco Kid cannot be ended.", origin: "Umpire Tim Hurst hit Elberfeld on the head with his mask, knocking him unconscious. Hurst's quote became famous. Elberfeld was back playing shortly after." },
    { title: "The Scout, The Suit, and The Hall of Famer", type: "Drama", text: "Your retired player discovers a 14-year-old shortstop named Travis Jackson and signs him to his first contract. Jackson becomes a Hall of Famer. Your player also buys a young outfielder named Casey Stengel his first suit — $22. Stengel becomes the greatest manager in baseball history. The Tabasco Kid's legacy lives in the men he helped become legends. +5 legacy through others.", origin: "Elberfeld discovered Travis Jackson (HOF SS) at age 14 and signed him. He also bought young Casey Stengel his first suit ($22). Both became baseball legends." },
  ],

  art_direction: {
    face: "SMALL AND FIERCE. 5'7\" 158 lbs — the littlest man on the field with the biggest temper. Scrappy, wiry, aggressive. The face should radiate COMBATIVENESS — not handsome, not dignified, but alive with compressed rage and intelligence. Narrow eyes, tight jaw, forward-leaning posture. The look of a man who will throw mud in your mouth and then steal your base. Working-class Ohio features, weathered early from spikings and fights.",
    attire: "Detroit Tigers uniform circa 1901 — white wool jersey with old-English 'D' or 'DETROIT' insignia, baggy flannel pants, flat cap. POSE: the tag play at second base — Elberfeld receiving a throw, knee down, blocking the bag, daring the runner to come through him. Or: mid-argument with an umpire — jaw thrust forward, finger pointing, every muscle tense. Or: the DP pivot — fielding a grounder and firing to first with the 'cyclonic' arm, the body compact and explosive. Scars visible on the forearms/shins from spikings. No number.",
    mood: "CONTROLLED EXPLOSION. Elberfeld's card should feel like it's about to COMBUST. Where Phillippe is serene and Leever is pastoral, the Tabasco Kid is a LIT FUSE. The energy should be compressed, coiled, dangerous. Not chaos — controlled chaos. The man who knew exactly how to weaponize his rage.",
    style: "Sepia-toned with HOT, PEPPERY undertones — actual tabasco-red heat bleeding through the sepia. Where Jennings is furnace-red (volcanic, raw), Elberfeld is PEPPER-RED (sharp, stinging, deliberate). The palette should suggest spice, aggression, and a temper that colored everything. The most AGGRESSIVE palette in the Banners collection — the card that bites back.",
    reference: "Think the tag play — Elberfeld's knee planted in the basepath, the runner coming in spikes-first, the collision imminent. Or: the aftermath of a spiking — Elberfeld pouring whiskey into his shin while teammates wince. Or: the argument — 5'7\" Elberfeld in the face of a 6'2\" umpire, completely unintimidated, mud still on his fingers. The card should capture the moment JUST BEFORE the explosion.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }] },
  defense: { metric: "Range + reputation + errors", note: "High range (6.14 RF) but 458 career errors = volatile defender" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason BA + signature moments", note: "Zero postseason games. Untested." },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function KidElberfeldCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.hotRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <span style={{ background: `${C.hotRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>🌶️ TABASCO KID</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.hotRed, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"{d.nickname}"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ background: `${C.hotRed}10`, border: `1px solid ${C.hotRed}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 9, color: C.hotRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>🌶️ 26+ EJECTIONS • MUD IN UMPIRE'S MOUTH • KNEED COBB'S FACE</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "R", val: d.real_stats.runs },{ label: "RF", val: "6.14" },{ label: "AST/G", val: d.real_stats.assists_game },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1901 — TIGERS' FIRST .300 HITTER / FIRST TEAM BATTING LEADER</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "EJECT", val: "26+" },{ label: "HBP", val: "Top 15" },{ label: "CHOSEN", val: "OVER HW" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🌶️ The Tabasco Kid", "🤬 26+ Ejections", "🥊 Assaulted Umpires", "😤 Kneed Cobb's Face", "🥃 Whiskey in Wounds", "🎯 Chosen Over Wagner", "👨‍🏫 Found Travis Jackson", "👔 Bought Stengel's Suit", "❌ Zero Postseason"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.hotRed}15`, border: `1px solid ${C.hotRed}40`, padding: "2px 8px", borderRadius: 10, color: C.hotRed, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.hotRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — HANDLE WITH CAUTION</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.hotRed, fontStyle: "italic" }}>WARNING: These events involve umpire assault, whiskey cauterization, and Ty Cobb facial trauma.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.hotRed}06`, border: `1px solid ${C.hotRed}25`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Elberfeld's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
