import { useState } from "react";

const PLAYER_DATA = {
  name: "Johnny Mize",
  nickname: "The Big Cat / Big Jawn",
  year: 1947,
  team: "New York Giants",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "1B",
  bats: "L",
  throws: "R",
  height: '6\'2"',
  weight: "215 lbs",
  born: "January 7, 1913 — Demorest, GA",
  died: "June 2, 1993 — Demorest, GA (age 80)",
  hof: "HOF 1981 (Veterans Committee). 10× All-Star. 5× WS Champion. 4× NL HR Leader. 1952 WS MVP.",

  real_stats: {
    season: 1947, games: 154, at_bats: 586, hits: 177, doubles: 26, triples: 2,
    home_runs: 51, rbi: 138, runs: 137, stolen_bases: 2, walks: 74, strikeouts: 42,
    batting_avg: ".302", obp: ".384", slg: ".614", ops: ".998", ops_plus: 168, war: 6.5,
    career_avg: ".312", career_hits: 2011, career_hr: 359, career_rbi: 1337,
    career_runs: 1118, career_slg: ".562", career_obp: ".397", career_war: 70.7,
    career_k: 524, career_bb: 856,
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .302 BA → tier 4 (.300-.329). OPS+ 168 → +1 bonus (130+) = 5. CON = 5.
  // POW: 51 HR → tier 5 (50+). SLG .614 → +1 bonus (.500+) = 6, cap 5. POW = 5.
  // SPD: 2 SB → tier 0 (0-5). Mize was slow. SPD = 0.
  // DEF: "The Big Cat" — smooth, graceful 1B. .992 career FLD%. Musial praised his grace.
  //   Led NL 1B in putouts 2×, FLD% 1×. Pre-GG equivalent ~2 GG. DEF = 1.
  // CLU: WS: .286, 3 HR, 9 RBI in 18 games. 1952 WS MVP (3 HR in 5 games at age 39).
  //   PS BA .286 → tier 1 (.250-.299). WS MVP hero moment → +1 = 2. CLU = 2.
  // OVR: HOF, .312 career, 359 HR, 70.7 WAR, 5 WS rings, overshadowed by contemporaries
  //   but sabermetrically comparable to DiMaggio. OVR = 10 (Elite).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite — HOF, 70.7 WAR, .312/.397/.562 career, 5 WS rings, overlooked in his own era.
    con: 5,      // .302 BA → tier 4. OPS+ 168 → +1 = 5. 51 HR with only 42 K — supernatural contact.
    pow: 5,      // 51 HR → tier 5. SLG .614 → bonus, cap 5. MAXIMUM POWER. 4× HR leader.
    spd: 0,      // 2 SB. Mize was a big, slow first baseman. No speed whatsoever.
    def: 1,      // "The Big Cat" — graceful 1B. .992 FLD%. Musial praised his poise. Pre-GG ~2 GG. DEF = 1.
    clu: 2,      // WS: .286/3 HR/9 RBI. 1952 WS MVP at age 39. Hero moment earns the bonus. CLU = 2.
  },

  stat_justification: {
    con: "Mize hit .302 in 1947 while slugging 51 home runs — and struck out only 42 times. He is the ONLY player in MLB history to hit 50+ HR and strike out fewer than 50 times in the same season. Career: .312 BA, 856 BB vs. 524 K — a 1.63 BB/K ratio for a power hitter. OPS+ 168 easily earns the bonus. Musial said he never saw a pitcher knock Mize down: 'He'd lean back on his left foot, let the pitch go by, then lean back in — graceful as a big cat.' Maximum contact.",
    pow: "51 HR in 1947, tied with Kiner for the NL lead. 4× NL HR leader. 43 HR in 1940 (Cards record for 60 years). Career 359 HR in only ~6,400 AB — #6 all-time at retirement, ahead of DiMaggio. Six career 3-HR games (MLB record until Sosa). SLG .614 in 1947, .562 career. Maximum power.",
    spd: "2 SB in 1947. Mize was 6'2\" 215 lbs — a big man who relied on power, not legs. He had 2 triples in 1947, down from 16 in 1938 when he was younger. By his Giants years, speed was negligible. Rating of 0.",
    def: "Mize earned 'The Big Cat' nickname specifically for his defensive grace at first base. Musial's quote about his cat-like reflexes is the defining image. .992 career fielding percentage. Led NL 1B in putouts twice, fielding percentage once. He was NOT a defensive liability — he was smooth and reliable. Pre-GG equivalent: 2 GG. Rating of 1.",
    clu: "World Series: .286 BA with 3 HR and 9 RBI in 18 games across 5 consecutive championships (1949-53). The crown jewel: 1952 WS MVP — Mize hit 3 HR in just 5 games vs. the Dodgers at age 39, as a part-time player. That's a genuine hero moment. He also went 2-for-2 with 2 RBI in the 1949 WS. Rating of 2 — solid October plus the '52 MVP.",
  },

  personality: {
    leadership_style: "Quiet dominance. Mize wasn't a rah-rah leader — he led by being unmovable at the plate. He never stepped out of the batter's box between pitches. He never showed fear when brushed back. He never chased bad pitches. His leadership was existential: I am here, I am not moving, and I am going to hit your best pitch over the fence. Teammates drew confidence from his unshakeable presence.",
    temperament: "Irascible on the field, affable off it. Ralph Kiner described Mize as 'kind of an irascible guy' on the field but 'a very affable guy and a great storyteller' off it. Mize was focused, intense, and not particularly friendly to opponents during games. But in the clubhouse and in retirement, he was warm, funny, and beloved. The duality defined him.",
    work_ethic: "Self-made through injury. Mize nearly quit baseball twice — torn hip muscles in both legs sent him home to Georgia as a minor leaguer. Successful surgery on both hips saved his career. He then spent SIX years in the minors (hitting .337+) waiting behind Ripper Collins. Most players would have given up. Mize waited, healed, and became a Hall of Famer. In 1940, he ordered 43 new bats at spring training. He hit 43 home runs that year.",
    lifestyle: "Demorest, Georgia — born and buried. Small-town Georgia boy who played in New York's biggest stadiums. Cousin of Ty Cobb. Second cousin married to Babe Ruth's second wife. After baseball: ran a liquor store and orange grove in Florida, then returned to Demorest. Was the first player to smear mud under his eyes to reduce glare — a practice now universal.",
    era_adaptability: "EXTREMELY HIGH. Mize's combination of power, contact, and plate discipline is timeless. A .312/.397/.562 career line with only 524 K in ~7,400 PA would make him elite in any era. His 51 HR / 42 K season is the kind of stat line that defies modern understanding. He'd be a perennial MVP candidate today. The DH role would extend his career by years.",
    clubhouse_impact: "RESPECTED VETERAN. Mize was a quiet force — not the life of the party, but the anchor of the lineup. On the Yankees dynasty teams (1949-53), he was the veteran who provided crucial pinch-hitting and part-time power. Stengel used him perfectly. In ILB terms: Mize is a +1 chemistry card for experienced rosters. He doesn't lift morale through personality — he lifts it through production.",
    dark_side: "The overlooked giant. Mize was overshadowed his entire career: by Medwick on the Cardinals, by Musial who replaced him, by Williams and DiMaggio in the AL, by Kiner in the NL home run race. He never won an MVP despite finishing 2nd twice. He waited 28 years for the Hall of Fame — the BBWAA never gave him more than 43% of the vote. His career numbers were compromised by 3 years of WWII service and 6 years stuck in the minors. Mize's tragedy is that he was a top-10 hitter of his era who was always standing next to someone more famous.",
  },

  chemistry_traits: [
    { tag: "The Big Cat", desc: "Grace at first base. Musial: 'He'd lean back like a cat.' +1 DEF and poise. Never rattled by brushback pitches." },
    { tag: "51 HR / 42 K", desc: "The most impossible stat line in baseball history. Only player to hit 50+ HR and K fewer than 50 times. -1 to opposing pitcher's CLU: they can't make him miss." },
    { tag: "Five Straight Rings", desc: "WS champion 1949-53 with the Yankees. +1 team championship aura when on a dynasty roster." },
    { tag: "1952 WS MVP", desc: "3 HR in 5 games at age 39 as a part-timer. Clutch incarnate. +1 CLU in the World Series." },
    { tag: "Overlooked Giant", desc: "Overshadowed by every contemporary: Williams, DiMaggio, Musial, Kiner. -1 to individual awards. +1 to quiet motivation." },
    { tag: "Six Three-Homer Games", desc: "MLB record for 3-HR games until Sosa. When Mize goes deep twice, 30% chance of a third." },
    { tag: "Mud Under the Eyes", desc: "Invented the eye-black tradition. +1 to daytime game performance. Pioneer of competitive innovation." },
    { tag: "Cobb's Cousin", desc: "Related to Ty Cobb by blood, to Babe Ruth by marriage. Baseball royalty by DNA. +1 intimidation factor." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: "Never stepped out between pitches. 51 HR / 42 K. The batter's box was his throne." },
    { location: "First Base", affinity: "HIGH", note: "The Big Cat. Graceful, smooth, .992 fielding. Earned the nickname for defensive poise." },
    { location: "Polo Grounds (Giants)", affinity: "HIGH", note: "Short right-field porch. Lefty pull power. 157 HR as a Giant." },
    { location: "Yankee Stadium", affinity: "HIGH", note: "5 WS rings. 1952 MVP. The stadium where he became a legend at age 39." },
    { location: "Demorest, Georgia", affinity: "HIGH", note: "Born and buried there. Small-town roots never left him." },
    { location: "Clubhouse Storytelling", affinity: "MEDIUM", note: "Kiner: 'A great storyteller.' Off-field warmth contrasted with on-field intensity." },
    { location: "Awards Ceremonies", affinity: "LOW", note: "Never won MVP despite 2 runner-up finishes. Waited 28 years for HOF. Awards eluded him." },
  ],

  momentum: {
    hot_triggers: [
      "Multi-HR games — 6 career 3-HR games (MLB record). When Mize goes deep, more follow",
      "Polo Grounds / short porches — lefty pull power exploits friendly dimensions",
      "October — .286 WS BA, 1952 WS MVP. Mize elevated in the biggest moments",
      "Pinch-hitting — .292 career pinch-hitter. Came off the bench and delivered",
    ],
    cold_triggers: [
      "Injuries — torn hips, broken hands, broken toes. Mize's body betrayed him repeatedly",
      "Being overshadowed — when a more famous teammate gets the attention, Mize's motivation could dip",
      "Fastball up and in — though he handled brushbacks with grace, elite high heat could neutralize his stance",
    ],
    pressure_response: "LATE-CAREER CLUTCH SPECIALIST. Mize's most remarkable trait is that he IMPROVED under October pressure as he aged. His regular-season peak was with the Cardinals/Giants (ages 23-34), but his postseason career was entirely with the Yankees (ages 36-40). By then he was a part-time player — and he won 5 WS rings and a WS MVP. The 1952 performance (3 HR in 5 games at age 39) is one of the great postseason stories. In ILB terms: Mize gets +1 CLU for every year over age 35. The Big Cat aged like fine wine.",
  },

  action_card_seeds: [
    {
      title: "51 Home Runs, 42 Strikeouts",
      type: "Game Action",
      text: "Your slugger hits 51 home runs in a season. He strikes out only 42 times. No player has ever done this before. No player will ever do it again. The combination of power and contact defies comprehension. He ties for the league HR lead while making pitchers look helpless.",
      origin: "1947. Mize hit 51 HR and struck out just 42 times — the only player in MLB history to achieve 50+ HR / sub-50 K in the same season. He tied Ralph Kiner for the NL lead.",
    },
    {
      title: "The Big Cat Leans Back",
      type: "Action",
      text: "A pitcher fires a fastball at your slugger's head. He doesn't flinch, doesn't duck. He simply leans back on his left foot, bends his body like a reed, lets the pitch whisper past, then leans back into the box and resumes his stance. Graceful as a cat. The pitcher is the one who's rattled now.",
      origin: "Musial on Mize: 'Did you ever see a pitcher knock him down? He'd lean back on his left foot, bend his body back, let the pitch go by. Then lean back into the batter's box — as graceful as a big cat.'",
    },
    {
      title: "WS MVP at 39",
      type: "Game Action",
      text: "Your aging slugger is a part-timer now — a pinch-hitter, a platoon bat. But in the World Series, he hits 3 home runs in 5 games. He wins the MVP award at age 39. The Big Cat has one last roar.",
      origin: "1952 World Series. Mize, 39, hit 3 HR in 5 games vs. the Dodgers as a part-time player, winning WS MVP. He was the oldest WS MVP of the era.",
    },
    {
      title: "Traded to Make Room for the Kid",
      type: "Drama",
      text: "Your franchise's GM trades the star first baseman after a .317 season. The reason? A 21-year-old outfielder needs a spot. The first baseman becomes a Hall of Famer. So does the 21-year-old. The GM was right — and the first baseman never forgave him.",
      origin: "Branch Rickey traded Mize after 1941 (.317, .535 SLG) to open a roster spot for Stan Musial. Both became HOFers. Mize resented the trade for years.",
    },
    {
      title: "The Double Hip Surgery",
      type: "Drama",
      text: "Your prospect tears a muscle in one hip. Then the other. He goes home to Georgia, ready to quit baseball forever. The team sends him to a surgeon. Both hips are repaired. He returns, waits six years in the minors, and becomes a Hall of Fame first baseman.",
      origin: "Mize tore hip muscles in both legs as a minor leaguer. Surgery saved his career. He spent 6 years in the minors hitting .337+ before finally getting his chance at age 23.",
    },
    {
      title: "43 Bats, 43 Home Runs",
      type: "Action",
      text: "Your slugger orders 43 new bats at spring training — more than anyone has ever requested. He hits exactly 43 home runs that season. One bat, one homer. The coincidence becomes legend.",
      origin: "Mize ordered 43 bats before the 1940 season. He hit exactly 43 home runs, setting the Cardinals record. He later joked: 'I wonder what would have happened if I'd started with 61 bats.'",
    },
    {
      title: "Mud Under the Eyes",
      type: "Action",
      text: "The afternoon sun creates a blinding glare on the field. Your first baseman smears mud under his eyes. His teammates stare, then follow suit. Seventy years later, every player in every sport will do this.",
      origin: "Mize was the first baseball player to smear mud under his eyes to reduce sun glare — a practice now universal across all outdoor sports.",
    },
    {
      title: "Never Stepping Out",
      type: "Action",
      text: "Your slugger steps into the batter's box. He does not step out between pitches. Not once. Not ever. While other hitters adjust their gloves, tap their cleats, call timeout — your man stands in the box, still as stone, waiting. The pitcher must pitch to a man who will not move.",
      origin: "Mize never stepped out of the batter's box between pitches throughout his entire career. His stillness and focus were legendary, unnerving pitchers who wanted to disrupt his timing.",
    },
  ],

  art_direction: {
    face: "6'2\" 215 lbs, big and solid. A large man with surprising grace. Strong features, Georgia-bred, quiet intensity in the eyes. Not movie-star handsome like Kiner — more like a Georgia oak tree: rooted, immovable, powerful. The face of a man who will not step out of the batter's box.",
    attire: "New York Giants home whites, 1947 style. Left-handed batter in his signature stance — still, planted, bat cocked, eyes locked on the pitcher. The Big Cat waiting to strike. Or: at first base, positioned with that feline grace Musial described.",
    mood: "Unshakeable focus. The man who hit 51 HR and struck out only 42 times. No wasted movement, no unnecessary drama. The card should radiate quiet, absolute mastery — the feeling that this man sees every pitch, understands every situation, and will not be fooled.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. The Polo Grounds — that strange horseshoe park with the 257-foot right-field porch where Mize's lefty pull power was devastating. Afternoon sun, mud under the eyes.",
    reference: "Think of the overlooked master. Mize was comparable to DiMaggio, Williams, and Musial statistically — but was always standing next to someone more famous. The card should convey a man who doesn't need fame to know his worth. The Big Cat doesn't announce himself — he simply destroys baseballs.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ 130+ → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG .500+ → +1 (cap 5)" },
  speed: { metric: "SB + triples + range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "GG CF → +1 (cap 3)" },
  defense: { metric: "Gold Gloves (pre-GG equivalent)", tiers: [{ range: "No GG", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + hero moments", tiers: [{ range: "No PS", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: ".250-.299", value: 1 },{ range: ".300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function JohnnyMizeCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, LH batting stance, Giants uniform, Polo Grounds]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "K", val: d.real_stats.strikeouts },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>1947 — 51 HR / 42 K — ONLY PLAYER EVER</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR SLG", val: d.real_stats.career_slg },{ label: "CAR K", val: d.real_stats.career_k },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 15 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1981", "🏆 5× WS Champion", "⭐ 10× All-Star", "💣 4× NL HR Leader", "🏅 1952 WS MVP", "📊 70.7 Career WAR", "🔥 51 HR / 42 K", "🐱 The Big Cat"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Mize's real life, universalized for any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Hitter Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Mize's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}><span>ILB CARD #{d.ilb_team}</span><span>{d.era} • {d.position} • OVR {s.ovr}</span></div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "Elite", stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
