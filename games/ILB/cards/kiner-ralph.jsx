import { useState } from "react";

const PLAYER_DATA = {
  name: "Ralph Kiner",
  nickname: "The Sultan of Swat II",
  year: 1949,
  team: "Pittsburgh Pirates",
  era: "1940s",
  ilb_team: "Allies AL1940",
  position: "LF",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "195 lbs",
  born: "October 27, 1922 — Santa Rita, NM",
  died: "February 6, 2014 — Rancho Mirage, CA (age 91)",
  hof: "HOF 1975 (BBWAA, 75.4% — final year, one vote over minimum). 7 straight NL HR titles. #4 retired by Pirates.",

  real_stats: {
    season: 1949, games: 152, at_bats: 549, hits: 170, doubles: 19, triples: 5,
    home_runs: 54, rbi: 127, runs: 116, stolen_bases: 6, walks: 117, strikeouts: 61,
    batting_avg: ".310", obp: ".432", slg: ".658", ops: "1.090", ops_plus: 176, war: 7.3,
    career_avg: ".279", career_hits: 1451, career_hr: 369, career_rbi: 1015,
    career_war: 43.1, hr_per_ab: "1 per 14.1 AB",
  },

  // ═══════════════════════════════════════════════════════════════
  // CON: .310 BA → tier 4 (.300-.329). OPS+ 176 → +1 bonus (130+) = 5. CON = 5.
  // POW: 54 HR → tier 5 (50+). SLG .658 → +1 bonus (.500+) = 6, capped at 5. POW = 5.
  // SPD: 6 SB → tier 1 (6-15). Kiner was slow — no range, no speed weapon. SPD = 1.
  // DEF: Poor defensive LF. Slow, weak arm. No GG equivalent. DEF = 0.
  // CLU: NO postseason appearances. Pirates never made it. CLU = 0 by default.
  // OVR: HOF, 7 consecutive HR titles, but only 10 seasons, 1,451 hits,
  //   .279 career BA, no postseason. Peak dominant but career too brief.
  //   OVR = 9 (Elite — devastating peak, career brevity limits rating).
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite — 7 straight HR titles, HOF, devastating peak. But 10-year career limits mythic tier.
    con: 5,      // .310 BA → tier 4. OPS+ 176 → +1 = 5. Max contact — Kiner wasn't just a slugger.
    pow: 5,      // 54 HR → tier 5. SLG .658 → bonus, capped at 5. MAXIMUM POWER. 2nd to Ruth in HR/AB.
    spd: 1,      // 6 SB. Slow — Britannica notes he was "slow of foot." SPD = 1 (barely qualifies).
    def: 0,      // Poor defensive LF. Weak arm, limited range. No Gold Glove equivalent. DEF = 0.
    clu: 0,      // Zero postseason appearances. The Pirates were terrible. CLU = 0 by default.
  },

  stat_justification: {
    con: "Kiner batted .310 in 1949 — not just a home run hitter. He drew 117 walks for a .432 OBP, 4th in the NL. OPS+ of 176 easily clears the 130 bonus threshold. Over his career, Kiner posted a .398 OBP — elite plate discipline. He struck out only 61 times in 549 AB in 1949 while hitting 54 HR. The ratio of power to contact was extraordinary. Rating of 5.",
    pow: "54 HR in 1949 — highest in the NL from 1931 to 1997. At retirement, his HR/AB ratio (1 per 14.1) was 2nd only to Babe Ruth. He led the NL in HR for SEVEN consecutive seasons (1946-52) — unprecedented and unmatched. He hit 40+ HR in four seasons and 50+ twice. 369 career HR in only 10 seasons. Greenberg taught him to pull the ball; Kiner's Korner at Forbes Field was the result. Maximum power. Rating of 5.",
    spd: "6 SB in 1949. Kiner was slow — explicitly described as 'slow of foot' with a 'weak arm.' He was a station-to-station slugger who relied entirely on the long ball. His 5 triples in 1949 are his only speed indicator, and those came mostly from Forbes Field's vast outfield. Rating of 1.",
    def: "Poor defensive left fielder. Limited range, weak throwing arm. Kiner's value was almost entirely offensive. He was a liability in the field by modern standards. No Gold Glove equivalent. Rating of 0.",
    clu: "Zero postseason appearances in 10 seasons. The Pirates finished 8th, 8th, 4th, 6th, 8th, 7th, 8th, 8th during Kiner's peak years. He never had the opportunity to play October baseball. By default: CLU = 0. This is not a reflection of Kiner's ability under pressure — it's a reflection of his team's futility.",
  },

  personality: {
    leadership_style: "Star power on a bad team. Kiner was the reason fans came to Forbes Field — the Pirates were terrible, but Kiner filled the seats. He was the franchise, the brand, the drawing card. When Branch Rickey cut his salary after he led the NL in HR for the 7th time, Kiner protested. Rickey replied: 'We could have finished last without you.' Kiner's leadership was existential: he gave a hopeless franchise a reason to exist.",
    temperament: "Charismatic, gregarious, Hollywood-adjacent. Kiner dated Ava Gardner, Elizabeth Taylor, and Janet Leigh. He was a California kid — born in New Mexico, raised in Alhambra — with movie-star looks and a slugger's confidence. But he was also humble enough to listen to Hank Greenberg for hours, absorb the older man's wisdom, and transform his swing. The combination of glamour and work ethic was unique.",
    work_ethic: "Greenberg-forged. Kiner's transformation from raw power to elite slugger was the direct result of Hank Greenberg's mentorship. Greenberg arrived in Pittsburgh in 1947 and immediately started tutoring Kiner: stand closer to the plate, pull outside pitches, take extra batting practice every day. Kiner called Greenberg 'the single biggest influence of my adult life.' The results: 23 HR in 1946 became 51 HR in 1947.",
    lifestyle: "Hollywood glamour meets Pennsylvania steel. Kiner was the most eligible bachelor in baseball — dating actresses, attending premieres, living large. But he also befriended Bing Crosby (Pirates co-owner) and built a post-career as a beloved broadcaster. After retirement, became GM of the PCL San Diego Padres, then joined the Mets broadcast booth from Day One (1962) until his death in 2014 — 52 years. Famous for malapropisms ('Kinerisms') that endeared him to fans.",
    era_adaptability: "HIGH FOR OFFENSE, LOW FOR DEFENSE. Kiner's power numbers would translate to any era — 54 HR with a .432 OBP is elite by any standard. But modern teams would struggle with his defense and speed. He'd be a DH in today's game, which would cap his WAR. His plate discipline and power-to-contact ratio, however, are timeless.",
    clubhouse_impact: "FAN FAVORITE, PEER RESPECTED. Kiner wasn't a vocal leader — the Pirates were too bad for that. But he was respected for his power and his willingness to work. Teammates loved his personality. Fritz Ostermueller coined the famous line attributed to Kiner: 'Home run hitters drive Cadillacs, singles hitters drive Fords.' Kiner embodied that philosophy — and the fans who came to watch him proved it.",
    dark_side: "The back that broke. Kiner's career ended at 32 due to chronic back problems. He went from 37 HR in 1952 to 28, then 22, then 18 before retiring. Only 10 seasons, 1,451 hits, .279 career BA — borderline HOF credentials by counting stats. He barely squeaked in (75.4%, final year of eligibility, one vote over minimum). The what-if haunts: 5 more healthy seasons might have meant 500+ HR and first-ballot induction. And he never played a single postseason game — the Pirates' futility denied him the October stage entirely.",
  },

  chemistry_traits: [
    { tag: "Kiner's Korner", desc: "Forbes Field's left-field porch was built for him. +2 POW at home park. Kiner's power had its own zip code." },
    { tag: "Greenberg's Protégé", desc: "Hank Greenberg transformed Kiner from raw to elite. +1 CON when paired with a veteran mentor figure on the roster." },
    { tag: "Seven Straight Crowns", desc: "Led the NL in HR for 7 consecutive seasons. +1 POW in games where Kiner already has a HR — momentum builds." },
    { tag: "Cadillac Hitter", desc: "'Home run hitters drive Cadillacs.' Kiner gets +1 salary demand but +2 fan attendance. Star power transcends team quality." },
    { tag: "Bad Back", desc: "Chronic back problems. After age 30, 30% chance per season of -1 POW or career-ending injury." },
    { tag: "Last Chance HOF", desc: "Elected with 75.4% on final ballot — one vote over minimum. Kiner carries a 'Prove Them Wrong' aura: +1 to all stats in contract years." },
    { tag: "Hollywood Date Night", desc: "Dated Ava Gardner, Elizabeth Taylor, Janet Leigh. +1 charisma in off-field events. -1 focus during spring training?" },
    { tag: "Mets Voice", desc: "52 years in the broadcast booth. After retirement, Kiner becomes the voice of a franchise. +1 legacy and fan connection." },
  ],

  preferred_locations: [
    { location: "Batter's Box", affinity: "HIGH", note: "54 HR in 1949. 7 straight HR titles. 2nd best HR/AB in history behind Ruth." },
    { location: "Forbes Field / Kiner's Korner", affinity: "HIGH", note: "The left-field porch was literally built for him. Home run paradise." },
    { location: "Hollywood / Red Carpet", affinity: "HIGH", note: "California kid. Dated movie stars. Attended premieres. Baseball's most glamorous slugger." },
    { location: "Broadcast Booth", affinity: "HIGH", note: "52 years with the Mets. 'Kinerisms' became legendary. Second career as beloved as the first." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected for power. Good personality. But the team was always bad." },
    { location: "Training Room / Doctor's Office", affinity: "LOW", note: "The bad back haunted him. Surgery, rehabilitation, decline." },
    { location: "Postseason", affinity: "NONE", note: "Never experienced it. The Pirates denied him October entirely." },
  ],

  momentum: {
    hot_triggers: [
      "Multi-HR games — Kiner hit 3 HR in a game multiple times. When he goes deep once, expect more",
      "Facing power-friendly parks — any park with short porches amplifies Kiner's pull power",
      "Batting practice confidence — Greenberg's regimen of extra BP was Kiner's fuel",
      "Fan attendance peaks — Kiner played better when the crowd was big. He was a showman",
    ],
    cold_triggers: [
      "Back pain — chronic issue that could flare up at any time, reducing power and range",
      "Losing streaks — the Pirates' futility wore on him. Hard to stay motivated on a 112-loss team",
      "Defensive demands — any game requiring range or arm strength exposed Kiner's weakness",
    ],
    pressure_response: "UNKNOWN — NO OCTOBER DATA. Kiner never played a postseason game. The Pirates finished last or near-last in 7 of his 8 full seasons with them. We simply don't know how Kiner would have performed under October pressure. His regular-season consistency (7 straight HR titles) suggests he'd maintain his level, but the hypothesis was never tested. In ILB terms: Kiner starts with CLU 0, but if he reaches the postseason, there's a hidden roll — 40% chance he erupts (CLU jumps to 2), 60% chance he's ordinary (CLU stays 0). The unknown is the drama.",
  },

  action_card_seeds: [
    {
      title: "Greenberg's First Lesson",
      type: "Drama",
      text: "An aging legend arrives at your team. On his first day, he invites the young slugger to take extra batting practice. 'Stand closer to the plate. Pull outside pitches.' The young man listens. His HR total doubles the next season. From 23 to 51.",
      origin: "Hank Greenberg arrived in Pittsburgh in 1947 and immediately began tutoring Kiner. The results: 23 HR in 1946 became 51 HR in 1947. Kiner called Greenberg 'the single biggest influence of my adult life.'",
    },
    {
      title: "Kiner's Korner",
      type: "Action",
      text: "Your slugger hits so many home runs that the team rebuilds the outfield fence just for him. The shortened left-field porch becomes legendary. They name it after him. It's the first ballpark feature named for an active player.",
      origin: "Forbes Field's bullpen was built in left field for Greenberg, then retained for Kiner. 'Greenberg Gardens' became 'Kiner's Korner.' Kiner later used the name for his post-game TV show.",
    },
    {
      title: "54 Home Runs on a Last-Place Team",
      type: "Game Action",
      text: "Your slugger hits 54 home runs — the highest total in the NL in 18 years. His team finishes in 6th place. Nobody else on the roster hits more than 16. He is the entire offense. He IS the franchise.",
      origin: "1949. Kiner hit 54 HR — the NL's highest since Hack Wilson's 56 in 1930. The Pirates finished 6th (71-83). Kiner drove in 127 of the team's runs essentially by himself.",
    },
    {
      title: "We Could Have Finished Last Without You",
      type: "Drama",
      text: "Your star leads the league in home runs for the 7th straight year. He asks for a raise. The GM tells him: 'We could have finished last without you.' The salary is cut. The player is traded the next season.",
      origin: "Branch Rickey became Pirates GM and cut Kiner's $90,000 salary to $75,000 despite his 7th HR title. The famous quote is baseball's most brutal management line. Kiner was traded in 1953.",
    },
    {
      title: "One Vote Over the Line",
      type: "Drama",
      text: "Your retired slugger waits 13 years for the Hall of Fame. Each year, the vote comes up short. On his final ballot — his very last chance — he receives exactly one vote more than the minimum. He's in. Barely.",
      origin: "Kiner received 75.4% in 1975 — his 13th and final year of BBWAA eligibility. 273 votes out of 362. He needed 272. One vote saved his Hall of Fame legacy.",
    },
    {
      title: "Dating the A-List",
      type: "Action",
      text: "Your slugger is baseball's most eligible bachelor. He dates the biggest movie stars of the era — three of Hollywood's most famous women. He's as comfortable on the red carpet as in the batter's box. The press loves him.",
      origin: "Kiner dated Ava Gardner, Elizabeth Taylor, and Janet Leigh during his playing career. He was a California kid with Hollywood connections and movie-star charisma.",
    },
    {
      title: "The Bad Back",
      type: "Drama",
      text: "Your slugger's back gives out. He goes from 37 home runs to 28, then 22, then 18. He's only 32. The power evaporates. A 500-HR career shrinks to 369. He retires knowing what might have been.",
      origin: "Chronic back problems ended Kiner's career after 10 seasons. He was on pace for 500+ HR but the back robbed him of 5+ productive years.",
    },
    {
      title: "52 Years Behind the Mic",
      type: "Action",
      text: "Your retired slugger reinvents himself as a broadcaster. He joins a brand-new franchise on its first day and stays for 52 years — longer than most franchises exist. His verbal stumbles become legendary and beloved. He becomes a second kind of icon.",
      origin: "Kiner joined the Mets broadcast booth in 1962 (their inaugural season) and remained until his death in 2014. His malapropisms ('Kinerisms') became as famous as his home runs.",
    },
  ],

  art_direction: {
    face: "6'2\" 195 lbs, powerfully built. Movie-star handsome — the man who dated Elizabeth Taylor. Strong jaw, confident eyes, California-bronzed. The face of a man who hit 54 HR and dated Hollywood royalty in the same year. Swagger without arrogance.",
    attire: "Pittsburgh Pirates home whites, 1949 style. Number 4. Classic postwar flannel, 'Pirates' across the chest. Right-handed batter in full extension — the follow-through of a 54-HR season, bat whipped around, ball headed for Kiner's Korner.",
    mood: "Pure power, pure confidence. The ball is leaving Forbes Field, headed for Kiner's Korner. The crowd is on its feet — they came to see this. Kiner is the entire show on a last-place team, and he knows it. The card should radiate the joy of crushing a baseball.",
    style: "Sepia-toned with warm golden highlights, unified ILB portrait style. Forbes Field with its vast outfield and the shortened left-field porch. The Korner is visible — the bullpen behind the fence where so many Kiner bombs landed.",
    reference: "Think of pure, unapologetic power hitting. Kiner was Ruth's heir in the NL — the man who made the long ball an art form. The card should feel like a home run trot: slow, satisfied, inevitable. 'Home run hitters drive Cadillacs.'",
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

export default function RalphKinerCard() {
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Sepia-toned, massive follow-through, Pirates #4, Forbes Field]</div>
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1949 — 54 HR — LED NL 4TH STRAIGHT YEAR</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "HR/AB", val: d.real_stats.hr_per_ab },{ label: "BB", val: d.real_stats.walks },{ label: "K", val: d.real_stats.strikeouts },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 11, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 10 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1975", "💣 7× NL HR Leader", "⭐ 6× All-Star", "🔥 54 HR (1949)", "📊 2nd to Ruth in HR/AB", "#️⃣ #4 Retired", "🎙️ 52 Yrs Broadcasting", "🎖️ WWII Navy Veteran"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Kiner's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Hitter Stat Conversion Engine">
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}
                </Section>
                <Section title="Kiner's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, tier: "Elite", stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
