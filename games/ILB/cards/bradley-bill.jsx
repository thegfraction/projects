import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}bradley-bill.png`;

const PLAYER_DATA = {
  name: "Bill Bradley",
  nickname: "Big Bennie",
  year: 1902,
  team: "Cleveland Blues",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "3B",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "185 lbs",
  born: "February 13, 1878 — Cleveland, OH",
  died: "March 11, 1954 — Cleveland, OH (age 76, pneumonia)",
  hof: "NOT in HOF. Received 1 vote (0.4%) in 1936, peaked at 2.5% in 1937. Cleveland Indians HOF (posthumous, 1954). Recognized alongside Jimmy Collins and Pie Traynor as best 3B pre-1950. Collins: 'If I could field and bat like Bradley, I should lay claim to that title myself.'",

  real_stats: {
    season: 1902, games: 137, at_bats: 550, hits: 187, doubles: 39,
    triples: 12, home_runs: 11, rbi: 77, runs: 104, stolen_bases: 11,
    batting_avg: ".340", obp: ".375", slg: ".515", ops: ".890",
    ops_plus: 149, war: 7.4,
    total_bases: 283, hitting_streak: 29,
    career_avg: ".271", career_hits: 1471, career_hr: 34, career_sb: "~100",
    career_rbi: "~600", career_runs: "~700",
    career_war: 34.9, peak_4yr_war: 23.8,
    cycle: "Sept 24, 1903 (first in Cleveland history)",
    hr_streak: "4 straight games (first in AL, May 21-24, 1902)",
  },

  ilb_stats: {
    ovr: 8,      // All-Star — .340 BA, .515 SLG, 11 HR in 1902. HR in 4 straight games (first AL player). 29-game hitting streak. Led AL 3B in fielding 4×. Collins: "If I could field and bat like Bradley..." 4-year peak (1901-04) was elite. Career cut short by illness and injury.
    con: 4,      // .340 BA → technically tier 5 (.330+). OPS+ 149 → ≥130 bonus. But career .271 and the peak lasted only 4 years (1901-04) before illness/injury destroyed him. The brevity of the peak and the career context argue for 4 rather than 5. He was brilliant — but briefly. Rating: 4.
    pow: 2,      // 11 HR → tier 1 (10-19). SLG .515 → ≥.500 bonus (+1) = 2. HR in 4 straight games — unprecedented in the AL. 39 doubles, 12 triples, 283 total bases. For a dead-ball 3B, this was significant pop. Rating: 2.
    spd: 1,      // 11 SB in 1902. Not a speed player. Some baserunning value but not elite. Rating: 1.
    def: 2,      // Led AL 3B in fielding percentage 4 times. Led AL 3B in double plays 3 times. AL record 7 putouts in a game (1901, 1909). Famous underhand whip throw — Cleveland Plain Dealer: "not a third baseman in either big league today who is as accurate a thrower." Collins acknowledged him as superior. Elite defensive 3B but not quite the revolutionary innovator Collins was. Rating: 2.
    clu: 0,      // Zero postseason appearances. Cleveland never won a pennant with Bradley. The Blues/Naps finished 2nd at best (1908, when Bradley was already declining). Zero October. Rating: 0.
  },

  stat_justification: {
    con: ".340 BA in 1902 → technically tier 5 (.330+). OPS+ 149 (≥130 bonus). But context matters: career .271 BA across 14 seasons. The peak was concentrated in 4 years (1901-04: .312/.348/.455). After 1904, illness ('autotoxicity') and a broken wrist from a pitched ball destroyed his offense — he hit .268, .223, and eventually sub-.200. The 4-year peak was elite but the brevity argues for CON 4 rather than 5. He was a superstar-in-the-making who never fully became one. Rating: 4.",
    pow: "11 HR in 1902 → tier 1 (10-19). SLG .515 → ≥.500 bonus (+1) = 2. He was the first AL player to homer in 4 consecutive games (May 21-24, 1902). 39 doubles and 12 triples in 1902 — 283 total bases. His bat, 'Big Bennie,' had genuine dead-ball pop. In the context of the era, this was impressive power from a third baseman. Rating: 2.",
    spd: "11 SB in 1902. Career ~100 SB. Not a speed player — he was 5'11\" 185 lbs and played 3B. Some baserunning value but nothing exceptional. Rating: 1.",
    def: "Led AL 3B in fielding percentage 4 times. Led AL 3B in double plays 3 times. Set AL record with 7 putouts in a game (both 1901 and 1909). Cleveland Plain Dealer: 'There is not a third baseman in either big league today who is as accurate a thrower as Bradley with his famous underhand whip.' Jimmy Collins (the best 3B of the era): 'If I could field and bat like Bradley, I should lay claim to that title myself.' Even when his bat failed, his glove kept him in the lineup until age 32. Rating: 2.",
    clu: "Zero. Cleveland never won a pennant during Bradley's decade with the franchise (1901-1910). They finished 2nd in 1908, their best showing, but Bradley was already declining. No postseason games, no pennant races decided, no October moments. The greatest Cleveland player of the early AL never got his chance. Rating: 0.",
  },

  personality: {
    leadership_style: "THE HOMETOWN STAR. Bradley was Cleveland, through and through — born there, grew up there, played there for a decade, died there. He rejected McGraw's $15,000 offer to stay in Cleveland for $4,500. He wasn't a vocal leader — he led by being the best player on the team every day, playing beside Lajoie and never being outshone. Quiet, reliable, Cleveland to the bone.",
    temperament: "Steady, unflashy, professional. No dramatic stories, no headline-grabbing incidents, no feuds. He played hard, fielded brilliantly, hit the ball where they couldn't catch it, and went home. The anti-Jennings — no screaming, no coaching-box theatrics, just a man doing the job. His bat was named 'Big Bennie' and that was about as colorful as he got.",
    work_ethic: "SELF-MADE. Rode freight trains back to Cleveland broke after being released in the minors. Walked 35 miles from Akron. Worked at the Dangler Stove Company. Played semi-pro baseball for extra money. Clawed his way from Payne Avenue pickup games to the top of the American League. The work ethic was forged in Cleveland's working-class Irish neighborhoods.",
    lifestyle: "Cleveland Irish-American, working class, Catholic (Immaculate Conception School). Grew up playing pickup ball with the Delahanty brothers and Tommy Leach — a neighborhood that produced an extraordinary number of major leaguers. Loyal to Cleveland — turned down McGraw's riches to stay home. After baseball: scout for the Indians, staying in the organization until the end.",
    era_adaptability: "MIXED. Bradley's 4-year peak (.312/.348/.455) was elite but his career was cut short by illness and injury. In a modern era with better medicine, the 'autotoxicity' might have been treatable and the wrist injury rehabilitated. The talent was there — Collins said so. The body failed him. In any era, he'd be a strong 3B for 4-5 years and then a question mark.",
    clubhouse_impact: "SOLID AND STEADY. No drama. No headlines. Played alongside Nap Lajoie — one of the biggest stars in baseball — and complemented him perfectly. The 3B who made the All-Star SS look even better. +1 team chemistry from reliability, -0 from drama. The teammate everyone wants but nobody writes about.",
    dark_side: "The collapse. After 4 elite seasons (1901-04), everything fell apart. 1905: diagnosed with 'autotoxicity' — a vague stomach ailment that sapped his strength. BA dropped to .268. Then 1906: wrist broken by Bill Hogg's pitch. Hogg reportedly spat: 'The big Frenchman [Lajoie] is next on my list.' Bradley was the warning shot aimed at Lajoie. The wrist never fully healed. By 1909-10, he was hitting below .200 — a shell of the .340 hitter he'd been 7 years earlier. Released at 32. The superstar-in-the-making who was destroyed by illness, a malicious pitcher, and the limitations of 1900s medicine.",
  },

  chemistry_traits: [
    { tag: "Cleveland Born and Bred", desc: "Born, raised, played, died in Cleveland. Rejected McGraw's $15,000 to stay home at $4,500. When Bradley plays for Cleveland (or any 'home' team), +1 to all stats. Loyalty has its own power." },
    { tag: "Big Bennie", desc: "Bradley's bat. When Big Bennie is hot, he hits for power — HR in 4 straight games, 29-game hitting streak. +1 POW during hitting streaks of 10+ games." },
    { tag: "The Underhand Whip", desc: "Bradley's signature throw from 3B — underhand, accurate, devastatingly fast. 'Not a third baseman in either big league who is as accurate a thrower.' Infield hits against Bradley are 30% less likely." },
    { tag: "Collins's Endorsement", desc: "Jimmy Collins: 'If I could field and bat like Bradley...' When paired with Collins on the same roster, both gain +1 DEF. The two best 3B of the dead-ball era, together." },
    { tag: "Lajoie's Partner", desc: "Bradley and Lajoie formed the best left-side of the infield in the early AL. When paired with an elite 2B/SS, Bradley gains +1 to all defensive stats. The partnership amplifies." },
    { tag: "The Autotoxicity", desc: "After age 26, Bradley risks a random illness event each season. If triggered, -2 CON for the remainder of that season. The body that produced .340 was fragile." },
    { tag: "Hogg's Pitch", desc: "Bill Hogg broke Bradley's wrist deliberately, then targeted Lajoie. Once per career, Bradley may suffer a wrist injury from a beanball. -1 POW permanently. The malice of the dead-ball era." },
    { tag: "Freight Train Home", desc: "Rode freight trains broke. Walked 35 miles. Won a game with a 9th-inning grand slam the day before being released. +1 resilience. The man who fought his way home." },
  ],

  preferred_locations: [
    { location: "Third Base / Hot Corner", affinity: "HIGH", note: "Led AL 3B in fielding 4×, DP 3×. The underhand whip throw. 7 putouts in a game. The best 3B in the early AL alongside Collins." },
    { location: "Cleveland, Ohio", affinity: "HIGH", note: "Born. Raised. Played a decade. Rejected McGraw's riches. Died. Scouted for the Indians. Cleveland, always Cleveland." },
    { location: "Payne Avenue District", affinity: "HIGH", note: "Grew up playing pickup ball with the Delahanty brothers and Tommy Leach. The neighborhood that made big leaguers." },
    { location: "Alongside Nap Lajoie", affinity: "HIGH", note: "Bradley-Lajoie was the best 3B-2B/SS tandem in the early AL. Four years of elite left-side defense." },
    { location: "Hospital / Recovery", affinity: "LOW", note: "Autotoxicity. Broken wrist. Fever. The body failed the talent. Cleveland hospitals saw too much of Bill Bradley." },
  ],

  momentum: {
    hot_triggers: [
      "Hitting streaks — 29-game streak in 1902. When rolling, the bat is unstoppable. Big Bennie comes alive.",
      "Home in Cleveland — playing before the hometown crowd gives Bradley a boost. The Payne Avenue kid performing for his people.",
      "Power surges — HR in 4 straight games. When the power shows up, it shows up in clusters.",
      "Playing alongside elite teammates — Lajoie lifted Bradley's game. The partnership elevated both.",
    ],
    cold_triggers: [
      "Illness — the autotoxicity that sapped his strength after 1904. When sick, the offense vanishes completely.",
      "Wrist injury — Hogg's pitch broke the wrist and the career trajectory. Post-injury, the power never fully returned.",
      "Away from Cleveland — he turned down New York's millions. Away from home, his motivation wavered.",
      "Late-career decline — by 1909, he was sub-.200. The body aged faster than it should have.",
    ],
    pressure_response: "UNTESTED. Like Lange and Hoy, Bradley never played a postseason game. Cleveland never won a pennant during his decade with the team. The closest was 1908 (2nd place), but by then Bradley was already declining. Would the .340 hitter have risen in October? We'll never know. In ILB: high ceiling, zero data. The hometown hero who never got his spotlight.",
  },

  action_card_seeds: [
    { title: "Four Home Runs in Four Games", type: "Game Action", text: "Your third baseman homers in four consecutive games — the first player in the league's history to do so. The power comes in clusters: 11 HR in 137 games, but four of them in four straight days against the same team. +2 POW for the remainder of the series. Big Bennie is alive.", origin: "May 21-24, 1902: Bradley homered in 4 straight games against Philadelphia, becoming the first AL player to accomplish this." },
    { title: "The 29-Game Hitting Streak", type: "Game Action", text: "Your third baseman reaches base in 29 consecutive games — the longest hitting streak in the league this season. The lineup becomes predictable: he hits. +1 CON for the duration of any hitting streak exceeding 15 games.", origin: "1902: Bradley's 29-game hitting streak was the longest in the AL that season, during his .340 peak." },
    { title: "Hit for the Cycle", type: "Game Action", text: "Single, double, triple, home run — all in one game. Your third baseman becomes the first Cleveland player in history to hit for the cycle. 12 total bases. The franchise has a new milestone. +2 to all offensive stats for the game.", origin: "September 24, 1903: Bradley hit for the first cycle in Cleveland franchise history in a 12-2 win over Washington." },
    { title: "If I Could Field and Bat Like Bradley", type: "Drama", text: "The best third baseman in the other league is asked who's the game's best. He says your guy. 'If I could field and bat like Bradley, I should lay claim to that title myself.' The endorsement from the king of the position. +2 DEF reputation. +1 CON confidence.", origin: "1904: Jimmy Collins, Boston's Hall of Fame 3B, when asked who was the best third baseman in baseball." },
    { title: "The Underhand Whip", type: "Game Action", text: "Your third baseman makes the throw — underhand, from the edge of the grass, a whip that crosses the diamond like a bullet on a string. The runner is out by two steps. 'Not a third baseman in either big league who is as accurate a thrower.' +1 DEF permanently from reputation.", origin: "Cleveland Plain Dealer: 'There is not a third baseman in either big league today who is as accurate a thrower as Bradley with his famous underhand whip.'" },
    { title: "The Autotoxicity", type: "Drama", text: "Your 27-year-old superstar — .312 BA over four years, the best young 3B in the league — is diagnosed with a stomach ailment. The doctors call it 'autotoxicity,' which means nothing specific. His average drops 72 points in one year. The offense that was building toward greatness simply... stops. -2 CON. The body that produced .340 was never as strong as it looked.", origin: "1905: Bradley was diagnosed with 'autotoxicity' and his BA plummeted from .300 to .268. He never hit a home run that year." },
    { title: "Hogg's Pitch", type: "Drama", text: "A pitcher breaks your third baseman's wrist with a pitch. Then he spits toward your best hitter: 'The big Frenchman is next on my list.' The targeting is deliberate. Your 3B misses half the season. His wrist never fully heals. -1 POW permanently. The dead-ball era's casual violence claims another career.", origin: "1906: Bill Hogg broke Bradley's wrist with a pitch, then reportedly targeted Nap Lajoie next. Bradley missed half the season and his power never recovered." },
    { title: "Freight Train Home", type: "Origin", text: "Your player is released, broke, in a minor league town far from home. He wins his last game with a 9th-inning grand slam. The next day, he's out of a job. He rides a freight train to Akron, then walks 35 miles to Cleveland in the dark. He arrives home penniless. He finds another team. He makes the majors. The road to glory starts with walking 35 miles.", origin: "1897: Bradley was released from Burlington, Iowa. He won his last game with a grand slam, then rode freight trains and walked 35 miles from Akron to Cleveland, broke." },
  ],

  art_direction: {
    face: "Solid, working-class Irish-American Cleveland man. 5'11\" 185 lbs — strong, thick-wristed (before the break), the build of a man who worked at a stove factory and played pickup ball in Cleveland's immigrant neighborhoods. Not glamorous like Lange or fierce like Jennings — steady, reliable, the face of a man who stayed home when the money was elsewhere. Brown or dark hair, straightforward gaze, slight weathering from Cleveland winters.",
    attire: "Cleveland Blues uniform circa 1902 — white wool jersey with blue trim or 'CLEVELAND' insignia, baggy flannel pants, flat cap. POSE: the underhand whip throw from third base — low to the ground, arm sweeping from the side or underneath, the ball released on a line toward first base. The signature play that made him famous. Or: at bat with Big Bennie — the follow-through of a power swing, the ball disappearing into the gap. No number.",
    mood: "Working-class excellence. Bradley's card should feel SOLID and HONEST — no flash, no mythology, just a Cleveland kid doing the work. The Lake Erie air, the early AL's rough-hewn parks, the industrial city behind him. This is a card about talent that was real but fragile, about a career that almost was.",
    style: "Sepia-toned with STEEL-BLUE and INDUSTRIAL undertones — Cleveland in 1902. Where Lange is golden California and Jennings is furnace-red, Bradley is LAKE ERIE GRAY and IRON. The palette should suggest the early American League's factory-town roots, the working-class neighborhoods that produced ballplayers, the cold pragmatism of a man who stayed home. Cooler and more industrial than other Banners cards.",
    reference: "Think the underhand whip throw frozen mid-release — Bradley low at 3B, arm sweeping, ball on its way to first. Or: the HR in the 4th straight game — the swing of Big Bennie connecting, the dead ball somehow clearing the fence. The card should capture blue-collar power — not the effortless beauty of Lange, but the earned strength of a man who walked 35 miles home and then made the majors.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }] },
  defense: { metric: "Gold Gloves + positional reputation", note: "Pre-1957: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No PS", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function BillBradleyCard() {
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
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — .340 / .515 SLG / HR IN 4 STRAIGHT</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "4YR WAR", val: d.real_stats.peak_4yr_war },{ label: "STREAK", val: d.real_stats.hitting_streak },{ label: "HR RUN", val: "4 gm" },{ label: "CYCLE", val: "1903" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🔥 .340 BA (1902)", "💥 HR in 4 Straight (First AL)", "🔗 29-Game Hit Streak", "🔄 First Cleveland Cycle", "🧤 Led AL 3B Fielding 4×", "🏠 Cleveland Native", "⚠️ Career Derailed by Illness", "❌ Zero Postseason"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Bradley's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Bradley's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
