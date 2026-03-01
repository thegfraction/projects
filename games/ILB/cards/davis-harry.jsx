import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}davis-harry.png`;

const PLAYER_DATA = {
  name: "Harry Davis",
  nickname: "Jasper",
  year: 1905,
  team: "Philadelphia Athletics",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "1B",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "180 lbs",
  born: "July 19, 1873 — Philadelphia, PA",
  died: "August 11, 1947 — Philadelphia, PA (age 74)",
  hof: "Not inducted (38.4 career WAR). Gray Ink 134 (HOF avg 144).",
  real_stats: {
    season: 1905, games: 149, at_bats: 569, hits: 160, doubles: 47, triples: 5,
    home_runs: 8, rbi: 83, stolen_bases: 22, batting_avg: ".281", obp: ".345",
    slg: ".415", ops: ".760", ops_plus: 137, war: 5.0, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".277", career_hits: 1841,
    career_hr: 75, career_sb: 285, career_war: 38.4,
  },
  ilb_stats: {
    ovr: 8,      // All-Star — cornerstone of the early A's dynasty
    con: 3,      // .281 BA in 1905 peak. Career .277. OPS+ 137 → +1 bonus pushes toward 4, but .281 is .270-.299 tier = 3. Keeping at 3 — solid but not elite contact.
    pow: 3,      // 8 HR in 1905, but led AL 4 consecutive years (1904-07). 47 doubles (led AL). 28 triples in 1897 (led NL). Top HR hitter 1900-09 with 67. Dead-ball context makes this a strong 3.
    spd: 2,      // 22 SB in 1905, 285 career. 28 triples in 1897. Could run. Rating of 2.
    def: 1,      // .978 career fielding pct at 1B. Led AL 1B in range factor 1901, DP turned 1906/1910. Solid, not spectacular. Rating of 1.
    clu: 1,      // .246 in 16 WS games. Awful in 1905 WS (.200). But .353 in 1910 WS. 3× WS champion. Mixed postseason = 1.
  },
  stat_justification: {
    con: ".281 BA in 1905, career .277 with 1,841 hits. OPS+ of 137 in his peak year. Davis was a professional hitter — led the AL in doubles 3 times — but his average was good-not-great. He got his value from extra-base power and run production, not pure contact. Rating of 3.",
    pow: "8 HR in 1905 — led the American League. Led the AL in HR 4 consecutive years (1904-07). Top home run hitter in baseball 1900-09 (67 HR, 9 more than second place). Also led NL in triples with 28 in 1897. 47 doubles in 1905 (led AL). Rating of 3 reflects dead-ball-era dominance — Davis was the preeminent power hitter of the first decade of the AL.",
    spd: "22 SB in 1905, 285 career. 28 triples in 1897 (5th highest single-season total in MLB history). Davis had legitimate speed, unusual for a power-hitting first baseman. Led the AL in power-speed number 4 consecutive years. Rating of 2.",
    def: "Led AL 1B in range factor in 1901, double plays turned in 1906 and 1910. Career .978 fielding percentage. Solid defensive first baseman. Not a Tenney-level innovator, but reliable. Rating of 1.",
    clu: "Mixed postseason record: .200 in 1905 WS (lost to Giants/Mathewson), .353 in 1910 WS (won), .208 in 1911 WS (won). 3× World Series champion with the A's (1910, 1911, 1913). The 1910 WS was heroic; the rest was mediocre. Rating of 1 — the championships matter, but he was inconsistent in October.",
  },
  personality: {
    leadership_style: "The Captain. Connie Mack named Davis captain of the Athletics after the 1905 season, and he was universally recognized as Mack's lieutenant on the field. Credited with being 'at least 25 per cent of the brains of the Philadelphia American League baseball club.' He was the thinking man's slugger — a player who won games with his mind as often as his bat.",
    temperament: "Fiery beneath a gentlemanly exterior. Playing for Mack, who discouraged fighting, created a veneer of civility. But early in his career with the Giants, a writer noted he 'blossomed into a kicker of class A. He can give McGraw two jumps, a hundred words, and beat him in a canter.' Davis had a booming voice and argued passionately with umpires — he was ejected 8 times as a player.",
    work_ethic: "Self-made and resilient. Orphaned at 5, raised at Girard College for disadvantaged boys. Quit baseball in 1901 to work for the Pennsylvania Railroad. Mack lured him back. He then became the cornerstone of a dynasty. Davis also took young players under his wing, literally — he boarded promising rookies in his own house.",
    lifestyle: "Philadelphia through and through — born and died there. Attended Girard College (orphan school). Married Eleanor Hicks in 1898. After retirement from baseball, served as a Philadelphia City Councilman. Continued as a coach and scout for Mack's A's until 1927 — a 30+ year association with the franchise.",
    era_adaptability: "HIGH. Davis's combination of power, speed, intelligence, and leadership would translate well to any era. His 28 triples in 1897 suggest elite athletic ability. His game-management skills and mentoring would make him a valuable clubhouse presence regardless of the decade. The only limitation is his modest batting average.",
    clubhouse_impact: "CAPTAIN-MENTOR. Davis was the heart and soul of the early Athletics. He mentored young players, boarding them in his house. He was Mack's extension on the field — the player-coach before the term existed. After losing the captaincy, he continued to serve as assistant captain and coach for years. A true franchise cornerstone.",
    dark_side: "The 1905 World Series. Davis's best season — leading the AL in HR, RBI, runs, and doubles — ended with a whimper. He went 4-for-20 (.200) with 0 RBI as the A's were demolished by Christy Mathewson and the Giants (lost 4-1). Davis never drove in a run in the entire series. It haunted the franchise. In ILB terms: Davis carries a 'Regular Season Hero' trait — his peak stats don't always translate to October.",
  },
  chemistry_traits: [
    { tag: "The Captain", desc: "Davis is Mack's lieutenant. +1 team discipline permanently. All players on the roster gain +1 morale from his presence." },
    { tag: "Orphan's Drive", desc: "Raised at Girard College for disadvantaged boys. Father died of typhoid when Harry was 5. Davis never suffers morale drops from adversity — he's already survived worse." },
    { tag: "4× HR King", desc: "Led the AL in HR 4 consecutive years (1904-07). When Davis leads the league in any stat, +2 team reputation." },
    { tag: "Railroad Man", desc: "Quit baseball to work for the Pennsylvania Railroad in 1901. Davis gains +1 reliability — he always shows up. But if he feels undervalued, 15% chance he retires mid-career." },
    { tag: "Mentor", desc: "Davis boards young players in his own house. Rookies on his team gain +1 to all stats for their first 20 games." },
    { tag: "First Cycle", desc: "First player to hit for the cycle in AL history (July 10, 1901). Once per season, Davis can attempt a cycle game — roll 6 on d6 for success." },
    { tag: "Mack's Man", desc: "30+ year association with Connie Mack and the Athletics. +2 chemistry with any Mack-managed team. -1 chemistry if traded away." },
    { tag: "City Councilman", desc: "After retirement, served on Philadelphia City Council. +1 reputation in the team's home city. Davis is a pillar of the community." },
  ],
  preferred_locations: [
    { location: "Clubhouse / Field", affinity: "HIGH", note: "The captain. Heart and soul of the Athletics for a decade." },
    { location: "Mack's Office", affinity: "HIGH", note: "Mack's lieutenant. 25% of the brains of the club." },
    { location: "Home / Family", affinity: "HIGH", note: "Boarded young players in his house. Married to Eleanor. Family man." },
    { location: "City Hall / Government", affinity: "HIGH", note: "Philadelphia City Councilman after retirement." },
    { location: "Railroad / Workplace", affinity: "MEDIUM", note: "Worked for the Pennsylvania Railroad before Mack recruited him back." },
    { location: "Girard College", affinity: "HIGH", note: "His alma mater for orphans. Several future players came from Girard." },
    { location: "Bar / Saloon", affinity: "LOW", note: "No major drinking associations. Professional demeanor." },
  ],
  momentum: {
    hot_triggers: [
      "Dynasty years — Davis peaked when the A's were contending (1905, 1910)",
      "Extra-base hit streaks — when his doubles and triples are falling, he's locked in",
      "Leadership moments — Davis thrives when the team needs a captain",
      "Mentoring rookies — gains energy from teaching young players",
    ],
    cold_triggers: [
      "World Series pressure (1905) — went silent against Mathewson",
      "Aging — decline was steep after age 35",
      "Feeling undervalued — quit baseball once and could do it again",
    ],
    pressure_response: "INCONSISTENT. Davis's postseason record is a tale of two careers: .200 in the 1905 WS (terrible), .353 in the 1910 WS (heroic), .208 in 1911 (mediocre). He won 3 World Series rings, but his October performance was streaky. In ILB: Davis is a coin flip in the postseason — he'll either carry you or disappear. Pair him with consistent CLU teammates for insurance.",
  },
  action_card_seeds: [
    { title: "Four Consecutive Crowns", type: "Game Action", text: "Your slugger leads the league in home runs for the 4th straight year. He gains +1 POW permanently and +3 team reputation. The streak establishes him as the era's premier power hitter.", origin: "Davis led the AL in home runs 4 consecutive years (1904-07) — the top HR hitter in baseball for the entire first decade of the 1900s." },
    { title: "Twenty-Eight Triples", type: "Game Action", text: "Your player hits 28 triples in a season — the 5th-highest total in MLB history. He gains +2 SPD and the 'Triple Machine' trait for the rest of the season. He also leads the league in triples with only 10 doubles, a statistical anomaly no one has ever matched.", origin: "Davis hit 28 triples with only 10 doubles for the 1897 Pirates — a bizarre ratio that remains unique in baseball history." },
    { title: "The Orphan's Path", type: "Drama", text: "A player loses his father at age 5 and is sent to a school for disadvantaged children. He emerges with iron determination and a business education. He gains the 'Orphan's Drive' trait — immune to morale drops from adversity.", origin: "Davis's father died of typhoid when Harry was 5. His mother sent him to Girard College, a school for orphaned and disadvantaged boys in Philadelphia." },
    { title: "Quit and Come Back", type: "Action", text: "Your veteran quits baseball to work for the railroad. His manager sends him an offer too good to refuse. He returns and becomes the cornerstone of a dynasty. +1 OVR after returning (renewed motivation).", origin: "Davis quit baseball in 1901 to work for the Pennsylvania Railroad. Connie Mack lured him back with a big contract. Davis then anchored the A's for a decade." },
    { title: "The First Cycle", type: "Game Action", text: "Your batter hits a single, double, triple, and home run in the same game — the first cycle in league history. Team morale +3 for the series. The achievement enters the record books permanently.", origin: "On July 10, 1901, Davis became the first player to hit for the cycle in American League history." },
    { title: "Mack's Lieutenant", type: "Action", text: "Your manager names a veteran player as team captain. The captain gains +1 to all leadership rolls. He becomes the manager's extension on the field — handling disputes, mentoring rookies, and making in-game decisions.", origin: "After the 1905 season, Mack named Davis captain of the Athletics. Davis was universally recognized as '25% of the brains of the club.'" },
    { title: "Boarding House Mentor", type: "Action", text: "Your veteran opens his home to promising rookies. All rookies who live with him gain +1 to all stats for their first season. But the veteran's family life suffers (-1 personal morale).", origin: "Davis took promising young players under his wing and literally boarded them in his own house." },
    { title: "The Mathewson Shutout", type: "Drama", text: "Your best regular-season team faces an unhittable pitcher in the World Series. Your cleanup hitter goes 4-for-20 with 0 RBI. The series is lost in 5 games. The regular season meant nothing.", origin: "Davis led the AL in HR, RBI, runs, and doubles in 1905 — then went .200 with 0 RBI as Christy Mathewson shut down the A's in the World Series." },
  ],
  art_direction: {
    face: "Strong, determined face of a self-made man. 5'10\" 180 lbs — solid build. Square jaw, thick neck, serious eyes with intelligence behind them. Clean-shaven or small mustache. The look of a man who has earned everything he has — from the orphanage to the captain's armband.",
    attire: "Philadelphia Athletics 1905 home whites with the elephant emblem. The uniform fits well — Davis is built but not bulky. Bat in hand, in a powerful right-handed batting stance, or standing with hands on hips in the captain's pose of authority. The first baseman's mitt visible.",
    mood: "Authoritative confidence. Not showy or flashy — commanding. The captain on the field. There's a weight to Davis that the younger players don't have — the gravity of a man who runs the clubhouse. Think of the look a mentor gives a rookie: proud, firm, and encouraging all at once.",
    style: "Standard ILB sepia but with a slightly more formal, institutional quality — reflecting Davis's Girard College background and his eventual career in city politics. Philadelphia's industrial skyline in the background. Clean, professional tobacco-card composition. The Athletics' elephant motif in the border. Aged paper with moderate wear. The captain's card — it should feel like the card that holds the team together.",
    reference: "Think of the card that sits next to Seybold in the Athletics section — Seybold was the lovable slugger, Davis was the captain. Where Seybold is warm and jovial, Davis is authoritative and steady. The backbone card. The card that makes all the other cards better.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
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

export default function HarryDavisCard() {
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "2B", val: d.real_stats.doubles }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 3× WS Champion", "👑 4× AL HR Leader", "👑 3× AL 2B Leader", "👑 2× AL RBI Leader", "⚡ 1st AL Cycle (1901)", "👑 28 3B in 1897", "🎖️ Team Captain", "🏛️ City Councilman"].map((a, i) => (
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
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Davis's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Davis's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
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
