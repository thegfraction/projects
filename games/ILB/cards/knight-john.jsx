import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}knight-john.png`;

const PLAYER_DATA = {
  name: "John Knight",
  nickname: "Schoolboy",
  year: 1910,
  team: "New York Highlanders",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "SS",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "180 lbs",
  born: "October 6, 1885 — Philadelphia, PA",
  died: "December 19, 1965 — Walnut Creek, CA (age 80)",
  hof: "Not inducted. Journeyman utility man with one spectacular season.",
  real_stats: {
    season: 1910, games: 106, at_bats: 389, hits: 121, doubles: 18, triples: 8,
    home_runs: 4, rbi: 62, stolen_bases: 21, batting_avg: ".312", obp: ".357",
    slg: ".424", ops: ".781", ops_plus: 130, war: 2.3, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".239", career_hits: 636,
    career_hr: 14, career_sb: 86, career_war: 3.1,
  },
  ilb_stats: {
    ovr: 5,      // Solid Starter — journeyman with one great year
    con: 3,      // .312 BA in 1910 peak (5th in AL). BUT career .239. One-year wonder. Rating 3 reflects the peak, not the career.
    pow: 0,      // 4 HR in 1910, 14 career. No power.
    spd: 2,      // 21 SB in 1910, 86 career. 8 triples. Good speed for a big man (6'2").
    def: 1,      // Versatile — played SS, 3B, 2B, 1B, OF. .933 career fielding pct. Tallest SS of his era. Range over polish. Rating 1.
    clu: 0,      // Never reached the postseason. Zero October experience.
  },
  stat_justification: {
    con: ".312 BA in 1910 — 5th in the AL — leading the Highlanders in 7 offensive categories. But career .239 over 8 major league seasons. Knight was the definition of a one-year wonder. The gap between his peak (.312) and his career (.239) is enormous. Rating of 3 reflects the peak season at its best, acknowledging the volatility.",
    pow: "4 HR in 1910, 14 career in 767 games. No power. His extra-base hits came from doubles and triples (speed). A definitive 0.",
    spd: "21 SB in 1910, 86 career. 8 triples. At 6'2\" 180 lbs, Knight was unusually tall for a shortstop and still had legitimate speed. He was the tallest man to play shortstop at that time. Rating of 2 reflects good speed for his size.",
    def: "Played every infield position plus outfield. .933 career fielding percentage — below average, but his range was noted. He was considered the tallest man to play SS in his era (6'2\"). Versatility was his defensive calling card, not excellence at any one position. Rating of 1.",
    clu: "Never reached the postseason. Zero October at-bats. This is a definitive 0.",
  },
  personality: {
    leadership_style: "Wanderer and survivor. Knight played for 4 ML teams and bounced through the minors until age 42. He wasn't a captain or leader — he was the resourceful journeyman who keeps finding ways to stay in the game. His leadership was by example: adapt, survive, reinvent.",
    temperament: "Resourceful and adventurous. Played under a fake name ('Ryan') at age 18 to protect his amateur status while still a high school student. Briefly attended dental school. Covered the World Series as a newspaper reporter. Proposed a national baseball golf tournament. Knight had wide-ranging interests and refused to be defined by one role.",
    work_ethic: "Streaky and inconsistent, but capable of brilliance. Hit .400 in June 1905 as a 19-year-old rookie — then faded badly. Had one magnificent season in 1910 (.312) surrounded by mediocrity (.239 career). Knight could turn it on, but couldn't sustain it. His career in the minors showed persistence — he played until age 42.",
    lifestyle: "Philadelphia native. Father Jim Knight was a semi-pro pitcher known to A's owner Ben Shibe. Jack played under a fake name in amateur ball, got spotted by Harry Davis, and debuted at 19. Briefly attended UPenn Dental School in 1912. After baseball, settled in Walnut Creek, California. Covered the 1915 World Series as a journalist. Proposed a baseball-players golf tournament. A man of many interests.",
    era_adaptability: "LOW-MODERATE. Knight's one great season (.312 in 1910) wouldn't be enough to sustain a modern career. His .239 career average and defensive inconsistency would limit him to a utility role in any era. His versatility (5 positions) has value, but he'd need to find another hot streak.",
    clubhouse_impact: "COLORFUL-POSITIVE. Knight was a local boy who made good — the 19-year-old 'Schoolboy' who charmed Philadelphia fans. Monte Cross, the veteran he replaced, was 'broad-minded enough to feel pleased with the Kid's success' and mentored him. Knight was well-liked but never a cornerstone.",
    dark_side: "The fade. Knight hit .400 in June 1905 and everyone thought a star was born. Then he was hit by a Cy Young pitch, missed time, and never recaptured the magic that season (.203 final avg). The pattern repeated: one brilliant stretch followed by a return to mediocrity. In ILB terms: Knight carries a 'Flash in the Pan' trait — capable of brief brilliance but unreliable over a full season.",
  },
  chemistry_traits: [
    { tag: "Schoolboy", desc: "Debuted at 19, still a student. +1 fan popularity (they love a kid). -1 consistency (he's still learning)." },
    { tag: "Fake Name", desc: "Played amateur ball as 'Ryan' to protect his eligibility. Knight can be inserted into lineups as a surprise — opponents don't scout him properly. +1 CON for first 5 games on a new team." },
    { tag: "Davis's Discovery", desc: "Harry Davis spotted Knight and recommended him to Mack. +2 chemistry with Davis. If Davis is on the roster, Knight gains +1 OVR." },
    { tag: "Versatile", desc: "Played SS, 3B, 2B, 1B, and OF. Knight can fill any position without a DEF penalty — but gains no DEF bonus either." },
    { tag: "Hot Streak", desc: "Once per season, Knight can enter a 'hot streak' mode: +2 CON for 10 games. After the streak ends, -1 CON for the next 10 games." },
    { tag: "Tallest Shortstop", desc: "At 6'2\", Knight was the tallest man to play SS in his era. +1 range at SS but -1 agility on double-play pivots." },
    { tag: "Renaissance Journeyman", desc: "Dental student, journalist, golf tournament organizer. Knight never suffers morale drops from being sent to the minors — he always finds something to do." },
    { tag: "Cy Young's Victim", desc: "Twice injured by Cy Young pitches. -1 CON when facing elite pitchers (flinch factor)." },
  ],
  preferred_locations: [
    { location: "Ballpark (any level)", affinity: "HIGH", note: "Played until age 42 across every level of professional baseball." },
    { location: "Press Box / Newspaper Office", affinity: "MEDIUM", note: "Covered the 1915 World Series as a journalist for a Cleveland paper." },
    { location: "Golf Course", affinity: "MEDIUM", note: "Proposed a national baseball-players golf tournament after the season." },
    { location: "University / Dental School", affinity: "LOW", note: "Briefly attended UPenn Dental School in 1912. Didn't stick." },
    { location: "Home / Philadelphia", affinity: "MEDIUM", note: "Born in Philly. Father was known to A's owner Shibe. Local roots." },
    { location: "Minor League Town", affinity: "HIGH", note: "Minneapolis, Seattle, Oakland, Denver, Sacramento, Cleveland AA. Everywhere." },
    { location: "California", affinity: "HIGH", note: "Settled and died in Walnut Creek, CA." },
  ],
  momentum: {
    hot_triggers: [
      "New team / fresh start — Knight's best work came right after joining a new club",
      "June magic — his .400 month in 1905 and .312 season in 1910 both featured hot Junes",
      "Playing SS — his natural position, where his height gave him range advantages",
    ],
    cold_triggers: [
      "Being hit by pitches — Cy Young broke his hand, derailing his rookie season",
      "Long seasons — Knight faded in the second half consistently",
      "Expectations — after his hot starts, the pressure to maintain crushed him",
    ],
    pressure_response: "UNTESTED. Knight never reached the postseason in 8 ML seasons. He did cover the 1915 World Series — as a journalist. In ILB: Knight is a complete unknown in October. He could be a hero or a ghost. Roll the dice.",
  },
  action_card_seeds: [
    { title: "The Schoolboy Arrives", type: "Drama", text: "A 19-year-old high school kid debuts on Opening Day as an emergency replacement. He hits .400 in his first full month. The fans go wild. But can he sustain it? Roll a d6 each month: on 4+, he maintains. On 1-3, he fades.", origin: "Knight debuted on Opening Day 1905 at age 19, replacing injured Monte Cross. He hit .400 in June — then faded to .203 for the season." },
    { title: "Playing Under a Fake Name", type: "Action", text: "Your prospect plays amateur ball under an alias to protect his eligibility. He gains +1 surprise factor when he joins your team — opponents have no scouting data on him.", origin: "Knight played for the West Chester Brandywines as 'Ryan' while still a student at Central High. Harry Davis spotted him and told Mack." },
    { title: "Traded for a Legend", type: "Drama", text: "Your promising young player is traded for an aging Hall of Famer. The young player thrives briefly on the new team (+1 OVR for 20 games). The legend struggles in his new home.", origin: "In 1907, Knight was traded from the A's to Boston in exchange for Jimmy Collins — one of the greatest third basemen in history." },
    { title: "The One Great Year", type: "Game Action", text: "Your journeyman has the season of his life — .312 BA, leading the team in 7 categories, considered for MVP. He gains +3 OVR for the entire season. But next year, he returns to his baseline.", origin: "Knight hit .312 in 1910 (5th in AL), led the Highlanders in 7 offensive categories, and received MVP consideration. He hit .268 the next year and .200 after that." },
    { title: "The Dental Dropout", type: "Action", text: "Your player briefly enrolls in professional school during the offseason. He drops out to return to baseball. No stat change, but +1 intelligence from the experience.", origin: "Knight briefly attended the University of Pennsylvania Dental School in 1912. There's no record he ever finished." },
    { title: "Reporter in the Press Box", type: "Action", text: "Your retired player covers the World Series as a newspaper reporter. He gains insider knowledge: +1 scouting data for any team he covers.", origin: "After the 1915 minor league season, Knight picked up extra work covering the World Series for a Cleveland newspaper." },
    { title: "The Lifer", type: "Action", text: "Your player refuses to stop playing. He bounces through the minors until age 42: Minneapolis, Seattle, Oakland, Denver, Sacramento. Each stop adds +1 to his lifetime reputation.", origin: "Knight played professional baseball for 24 years, from 1905 to 1928, across 4 ML teams and at least 6 minor league cities." },
    { title: "Hit by the Best", type: "Drama", text: "Your young prospect is hit in the hand by a pitch from the greatest pitcher alive. He misses weeks. When he returns, he's never quite the same. -1 CON permanently against elite pitching.", origin: "Knight was hit in the hand by a Cy Young pitch in July 1905, derailing his spectacular rookie start. He was also hurt by Young earlier — Young had broken Monte Cross's wrist too." },
  ],
  art_direction: {
    face: "Tall, lanky, youthful face — 6'2\" 180 lbs, the tallest SS of his time. Still looks like a kid even in his mid-20s. Open, eager expression. Clean-shaven, high cheekbones, slight smile. The look of a young man who doesn't quite know what he wants to be yet — ballplayer, dentist, journalist, golfer.",
    attire: "New York Highlanders 1910 road grays. The uniform fits loosely on his tall, thin frame — all arms and legs. At shortstop, in a fielding crouch that emphasizes his unusual height. Or in a batting stance, the bat looking small in his long arms.",
    mood: "Youthful energy with a hint of uncertainty. Not the confident authority of Davis or the quiet mastery of Tenney — this is the kid who hit .400 in June and didn't know what came next. There's something fleeting about Knight's card — you can feel the hot streak coming and going. A comet, not a sun.",
    style: "Lighter, slightly cooler sepia than the established stars — reflecting Knight's status as a journeyman rather than a cornerstone. Simpler tobacco-card border, less ornate. The Hilltop Park or Polo Grounds faintly in the background. Aged paper with light wear — this card hasn't been handled as much as the legends' cards, because fewer people collected it. The deep cut. The sleeper card.",
    reference: "Think of the T206 common — the card that's not worth much but tells a fascinating story. ILB sepia style at its most understated. Knight should look like the card you discover at the bottom of a box and think: 'Who was this guy?' Then you flip it over and fall in love with the story.",
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

export default function JohnKnightCard() {
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
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🎓 Debuted at 19", "🔥 .312 BA (5th AL)", "🎭 Played as 'Ryan'", "🔀 5 Positions", "✍️ WS Journalist", "⚡ 24-Year Career"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Knight's real life, become universal cards playable in any game.</p>
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
                <Section title="Knight's Derivation">
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
