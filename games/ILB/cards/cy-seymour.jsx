import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}seymour-cy.png`;

const PLAYER_DATA = {
  name: "Cy Seymour",
  nickname: "The Cyclone",
  year: 1905,
  team: "Cincinnati Reds",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "CF",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "200 lbs",
  born: "December 9, 1872 — Albany, NY",
  died: "September 20, 1919 — New York, NY (age 46, tuberculosis from shipyard work during WWI)",
  hof: "Not inducted. Reds HOF 1998. Bill James ranks him above HOFers Lloyd Waner, Jimmy Collins, and Joe Tinker. SABR: 'Perhaps the greatest forgotten name in baseball.'",

  real_stats: {
    season: 1905, games: 149, at_bats: 581, hits: 219, doubles: 40,
    triples: 21, home_runs: 8, rbi: 121, runs: 95, stolen_bases: 19,
    batting_avg: ".377", obp: ".406", slg: ".559", ops: ".965",
    ops_plus: 176, war: 7.8,
    career_avg: ".303", career_hits: 1724, career_hr: 52, career_sb: 222,
    career_war: 40.5, career_obp: ".347", career_ops_plus: 119,
    pitching_wins: 61, pitching_losses: 56, pitching_era: "3.76",
    pitching_strikeouts: 584, pitching_peak_wins: 25, pitching_peak_k: 239,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB POSITION PLAYER STAT CONVERSION
  //
  // CON: BA tiers (.200-.249=1, .250-.269=2, .270-.299=3, .300-.329=4, .330+=5) + OPS+ ≥ 130 bonus (cap 5)
  // POW: HR tiers (0-9=0, 10-19=1, 20-29=2, 30-39=3, 40-49=4, 50+=5) + SLG ≥ .500 bonus (cap 5)
  // SPD: SB tiers (0-5=0, 6-15=1, 16-30=2, 31-50=3) + GG CF/SS bonus (cap 3)
  // DEF: GG tiers (pre-1957: use reputation)
  // OVERALL: CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13
  // CLU: PS BA tiers + hero moments
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — monster peak (best hitter in NL in 1905), but not HOF. Career 119 OPS+, 40.5 WAR. Short peak window.
    con: 5,      // .377 BA → tier 5 (.330+). OPS+ 176 (≥130, +1 bonus) → 6 capped at 5. Maximum contact. Beat Honus Wagner for the batting crown.
    pow: 1,      // 8 HR → tier 0 (0-9). SLG .559 → ≥.500 bonus (+1) = 1. Massive gap power (40 2B, 21 3B, 325 TB) but very few HR. 
    spd: 2,      // 19 SB → tier 2 (16-30). 'As speedy and graceful as ever in centre field' per Sporting News. 222 career SB. Covered enormous ground in CF.
    def: 1,      // No Gold Gloves (pre-1957). Set modern record with 36 errors in CF (1903). 347 putouts (2nd in NL), 25 assists (3rd). Elite range but error-prone. Rating: 1.
    clu: 0,      // Never played in a World Series or postseason game. Zero postseason at-bats. And the Merkle game loss — lost the fly ball in the sun. Rating: 0.
  },

  stat_justification: {
    con: ".377 BA in 1905 → tier 5 (.330+). OPS+ 176 (≥130, +1 bonus) → 6, capped at 5. Led NL in AVG, H (219), 2B (40), 3B (21), RBI (121), SLG (.559), TB (325). Beat Honus Wagner for the batting crown — Wagner had won 7 of that decade's titles. The highest NL batting average from 1901-1919. Maximum contact.",
    pow: "8 HR in 1905 → tier 0 (0-9). SLG .559 → ≥.500 bonus (+1) = 1. This is a dead-ball gap hitter: 40 doubles, 21 triples, 325 total bases (NL record through 1919). Missed the Triple Crown by 1 HR when teammate Fritz Odwell hit one more. Real power but in a dead-ball package — not homer power. Rating: 1.",
    spd: "19 SB in 1905 → tier 2 (16-30). 222 career SB. Sporting News (1904): 'As speedy and graceful as ever in centre field, covers a world of ground, more than any other centre fielder in the National League.' No CF Gold Glove bonus (pre-1957). Rating: 2.",
    def: "Pre-Gold Glove era. Elite range: 347 putouts (2nd in NL), 25 outfield assists (3rd), led NL in DP turned from CF. But set the modern record with 36 errors in CF in 1903 — the '$00,000 head.' Wilbert Robinson: opposing batters 'did not know whether their head or feet were in most danger' when he pitched. Athletic but erratic. Rating: 1.",
    clu: "Never appeared in a postseason game. The Reds finished 5th in 1905 despite Seymour's MVP-caliber year. His only brush with October was the 1908 Merkle playoff game — where he lost a fly ball in the sun, allowing 3 runs, and the Giants lost the pennant. That's anti-clutch. Rating: 0.",
  },

  personality: {
    leadership_style: "Lead by sheer athletic dominance, not by words or strategy. Seymour was described as having a '$10,000 arm and a $00,000 head' — all talent, sometimes erratic judgment. He didn't organize clubhouses or inspire speeches. He hit .377 and ran down fly balls and that was his leadership.",
    temperament: "Wild and brilliant. As a pitcher: led the NL in strikeouts AND walks simultaneously. Wilbert Robinson said he never caught a pitcher as wild — batters didn't know if their head or feet were in more danger. As a hitter: streaky, explosive, capable of 21-game hitting streaks and 0-for-4 days in equal measure. Pure instinct, zero calculation.",
    work_ethic: "Raw athleticism over refinement. Seymour reinvented himself from pitcher to outfielder after blowing out his arm from the screwball — that takes grit. He pitched three games in two days for the Giants. John McGraw said Seymour deserved the 'Iron Man' title more than McGinnity. But the errors, the wildness, the contract holdouts — discipline was never his strong suit.",
    lifestyle: "Working-class Albany kid who played semipro ball as a teenager. Married Agnes. During WWI, was declared unfit for military duty and worked in the Speedway Shipyards and Bush Terminal in New York. The shipyard work gave him tuberculosis. He played 13 games for Newark in 1918 while dying. His funeral was attended by many — but no one from organized baseball came.",
    era_adaptability: "HIGH for raw tools. In a modern context, Seymour would be a five-tool center fielder who converts from pitching — essentially Shohei Ohtani's predecessor, but forced to choose one role by arm injury. His speed, power, and batting eye would translate. His defense would improve with modern coaching. The wildness as a pitcher would be harder to fix.",
    clubhouse_impact: "COMPLEX. Held out from the Giants twice (1899, 1906) in contract disputes. Argued with McGraw. But teammates and opponents respected his talent — the New York World listed him among the best players alongside Mathewson, Wagner, Lajoie, and Bresnahan. He was 'brilliant though erratic' in the words of Sporting Life.",
    dark_side: "Forgotten and abandoned. After his career, Seymour worked in shipyards during WWI and contracted tuberculosis. He died on September 20, 1919, at age 46. The Washington Herald had reported he was 'seriously ill at his home' months earlier. No one from organized baseball attended his funeral. He was buried in the family plot at Albany Rural Cemetery in an unmarked grave next to his wife Agnes. No stone marks the location or accomplishments of the second most versatile player the game has ever known. The original Babe Ruth — without the fame.",
  },

  chemistry_traits: [
    { tag: "The Original Two-Way Star", desc: "50+ pitching wins AND 50+ HR. Only Babe Ruth matches this. Seymour can play both SP and CF in ILB. When switching roles mid-game, +1 to all stats from versatility shock." },
    { tag: "$10,000 Arm, $00,000 Head", desc: "Maximum physical talent, minimum discipline. +2 STF or +2 CON in any given game, but 15% chance of a catastrophic error each game." },
    { tag: "Cyclone Lefty", desc: "Left-handed power. As a pitcher, batters didn't know where the ball was going. As a hitter, he drove it everywhere. +1 CON vs. right-handed pitchers." },
    { tag: "Iron Man", desc: "McGraw said he deserved the title more than McGinnity. Pitched 3 games in 2 days. Played 149 games in 1905. No fatigue penalties." },
    { tag: "Wagner's Nemesis", desc: "Beat Honus Wagner for the 1905 batting crown — the only non-Wagner batting title of the decade. +2 CON when facing the opposing team's best player." },
    { tag: "Dead Arm Reinvention", desc: "Blew out his arm from the screwball and reinvented himself as an outfielder. When injured, Seymour can convert to a new position with no penalty." },
    { tag: "Unmarked Grave", desc: "No one from baseball attended his funeral. Buried without a headstone. -2 legacy. But if 'rediscovered' by a future generation, +3 legacy retroactively." },
    { tag: "Shipyard Ghost", desc: "Worked in shipyards during WWI, contracted tuberculosis. After age 35, stats decline by 1 per season. The forgotten man fades." },
  ],

  preferred_locations: [
    { location: "Center Field", affinity: "HIGH", note: "Covered more ground than any CF in the NL. His cathedral — wild, graceful, and occasionally catastrophic." },
    { location: "Batting Cage / Practice", affinity: "HIGH", note: "The bat was his reinvention. From failed pitcher to NL batting champion — the cage was where he rebuilt himself." },
    { location: "Bar / Nightlife", affinity: "MEDIUM", note: "Working-class Albany kid. Not a teetotaler, not a carouser — somewhere in between." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Respected for talent, not for leadership. The brilliant loner, not the clubhouse captain." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Needed rest — played 149 games in 1905, every one of them at full intensity." },
    { location: "Owner's Office", affinity: "LOW", note: "Held out twice for more money. Tried to claim a share of his own transfer fee — a radical idea that McGraw shut down." },
    { location: "Media / Spotlight", affinity: "LOW", note: "The press loved his talent but mocked his judgment. '$10,000 arm and a $00,000 head' followed him forever." },
  ],

  momentum: {
    hot_triggers: [
      "Head-to-head batting races — beat Honus Wagner in 1905, going 5-for-8 in the season-ending doubleheader",
      "21-game hitting streak (July 2-23, 1905) — when Seymour gets hot, he's the best hitter in baseball",
      "Position conversion — reinventing himself fueled him. The move from pitcher to outfielder unleashed his bat",
      "Playing for McGraw — McGraw saw his talent when others dismissed him, and Seymour responded",
    ],
    cold_triggers: [
      "The dead arm (1900) — blew out his arm throwing the screwball. The pitcher died so the hitter could live",
      "The Merkle game fly ball (1908) — lost it in the sun, 3 runs scored, Giants lost the pennant. The one play everyone remembers",
      "Contract disputes — held out twice, never got the money he deserved, and McGraw shut down his transfer fee claim",
      "Physical decline — ankle injury (1907), leg injury (1909), tuberculosis from shipyard work. The body betrayed the talent",
    ],
    pressure_response: "THE PARADOX: BRILLIANCE WITHOUT OCTOBER. Cy Seymour was the best hitter in the National League in 1905 — he beat Honus Wagner, led the league in nearly every category, and missed the Triple Crown by one home run. But he never played in a World Series. His one brush with postseason significance was the 1908 Merkle replay, where he lost a fly ball in the sun and the Giants lost the pennant. Seymour's pressure response is the tragedy of talent on a bad team: individual brilliance surrounded by institutional failure. He could hit in any situation — but the situation never came.",
  },

  action_card_seeds: [
    { title: "The Batting Crown", type: "Game Action", text: "Your hitter enters a season-ending duel with the best batter in the league. In the final doubleheader, he goes 5-for-8 while his rival goes cold. Your player wins the batting title and gains +1 permanent CON. The defeated rival gains +1 motivation for next season.", origin: "In 1905, Seymour beat Honus Wagner for the NL batting crown — Wagner's only loss in 8 years. In the season-ending doubleheader against Wagner's Pirates, Seymour went 5-for-8. Final: Seymour .377, Wagner .363." },
    { title: "The Two-Way Conversion", type: "Action", text: "Your pitcher blows out his arm from a screwball injury. Instead of retiring, he converts to center field and becomes the best hitter in the league within 4 years. He loses all pitching stats but gains +3 CON and +1 POW permanently.", origin: "Seymour destroyed his arm throwing the screwball as a Giant. McGraw signed him as an outfielder for Baltimore. By 1905, he was the NL batting champion. Only Babe Ruth ever matched his two-way achievement." },
    { title: "$10,000 Arm and a $00,000 Head", type: "Drama", text: "Your most talented player commits a spectacular error at the worst possible moment. His physical gifts are undeniable — but his judgment fails catastrophically. Team loses the game. Player gains +1 to offensive stats but -1 DEF permanently.", origin: "The New York Times' description of Seymour as a wild pitcher. He set the record with 3 errors in one inning as a pitcher, then set the CF record with 36 errors in a season. Brilliant but erratic." },
    { title: "Lost in the Sun", type: "Drama", text: "Your outfielder loses a crucial fly ball in the sun during a playoff game. Three runs score. Your team loses the pennant. The player's reputation is permanently scarred — he gains the 'October Ghost' trait and loses 2 CLU.", origin: "In the 1908 Merkle replay game, Seymour lost Joe Tinker's fly ball in the sun. Three Cubs runs scored. The Giants lost the pennant. Mathewson later denied waving Seymour back and said Cy would have caught it '49 times out of 50.'" },
    { title: "One Home Run Short", type: "Drama", text: "Your player leads the league in AVG, RBI, 2B, 3B, SLG, and TB — but finishes one home run behind a teammate for the HR title. He misses the Triple Crown by a single swing. If only one of his 21 triples had cleared the fence...", origin: "Seymour missed the 1905 Triple Crown by one HR. He had 8; teammate Fred Odwell had 9. Twenty-one of Seymour's hits were triples. One more foot of carry on any of them and history would have been different." },
    { title: "Pitched Three Games in Two Days", type: "Game Action", text: "Your pitcher starts three games in a two-day span. He wins all three but gains the 'Dead Arm' trait — his pitching arm is permanently compromised. He must convert to a position player or retire.", origin: "Seymour pitched three games in two days against the Orioles. McGraw said he deserved the 'Iron Man' title more than McGinnity. The workload eventually destroyed his arm." },
    { title: "The Transfer Fee", type: "Drama", text: "Your star player is sold for a record sum. He demands a share of the fee — arguing that his talent generated the value. The league shuts him down, establishing that players have no claim to their own sale price.", origin: "The Giants purchased Seymour from the Reds for $10,000 (then a record). Seymour tried to claim a portion, arguing the Reds owner had promised it. McGraw convinced him to report. The precedent for player exploitation held." },
    { title: "No One Came", type: "Drama", text: "Your greatest forgotten player dies of tuberculosis contracted from wartime labor. His funeral is well-attended by civilians — but no one from organized baseball comes. He is buried in an unmarked grave. His legacy enters limbo.", origin: "Seymour died September 20, 1919, of tuberculosis from shipyard work during WWI. No one from organized baseball attended his funeral. He is buried in an unmarked grave at Albany Rural Cemetery next to his wife Agnes." },
  ],

  art_direction: {
    face: "Solid, working-class Albany face. 6'0\" 200 lbs — sturdy, athletic, left-handed hitter's frame. Strong features, intense dark eyes, the look of a man who reinvented himself from nothing. Not polished like Mathewson or commanding like Chance — raw, hungry, talented. The face of a man the world forgot.",
    attire: "Cincinnati Reds uniform circa 1905 — white wool jersey with 'CINCINNATI' or 'C' on the chest, baggy flannel pants, flat cap. Mid-swing follow-through — the left-handed lash that drove 21 triples. Or: in center field, legs spread wide, ready to cover a world of ground. No number.",
    mood: "Explosive talent barely contained. The batting cage after a 4-hit game — sweat on the brow, bat loose in the hands, the wild grin of a man who just beat Honus Wagner. Or: the haunted look of a man who knows his arm is dead but his bat has just been born. Duality — the pitcher and the hitter in one frame.",
    style: "Sepia-toned with slightly rougher, grainier texture than the other Banners cards — Seymour is sandpaper where Mathewson is silk. The Palace of the Fans (Cincinnati's ballpark) in the background, its Roman columns barely visible. Dead-ball era grit. This card should feel like a rediscovery — an artifact pulled from an unmarked grave.",
    reference: "Think the left-handed follow-through, bat whipped around, eyes tracking the ball into the gap. Or: the two-way split — half the frame shows the pitcher's windup, half shows the batter's swing, merged into one figure. The forgotten star, resurrected. The card that makes collectors say 'Who IS this guy?' — and then never forget.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }], note: "Pre-1957 players: use historical defensive reputation" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "WS hero moment → +1 (cap 3)" },
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

export default function CySeymourCard() {
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
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "P WINS", val: d.real_stats.pitching_wins },{ label: "P ERA", val: d.real_stats.pitching_era },{ label: "P PEAK K", val: d.real_stats.pitching_peak_k },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 16 SEASONS (PITCHER + OUTFIELDER)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 1905 NL Batting Champ", "🔥 Led NL in AVG/H/2B/3B/RBI/SLG", "⚾ 61 Pitching Wins + 52 HR", "🎖️ Reds HOF 1998", "📜 Beat Honus Wagner", "💀 Unmarked Grave"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Seymour's real life, become universal cards playable in any game.</p>
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
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      {data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Seymour's Derivation">
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
