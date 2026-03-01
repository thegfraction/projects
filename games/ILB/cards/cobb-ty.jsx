import { useState } from "react";

const COBB_IMG = "https://raw.githubusercontent.com/thegfraction/projects/e2383b984b8ece16461abf98b5c650640d4252a8/games/ILB/images/Cobb%20Ty.png";

const COBB_DATA = {
  name: "Ty Cobb",
  nickname: "The Georgia Peach",
  year: 1911,
  team: "Detroit Tigers",
  era: "1910s",
  ilb_team: "Banners AL1910",
  position: "CF",
  bats: "L",
  throws: "R",
  height: '6\'1"',
  weight: "175 lbs",
  born: "December 18, 1886 — Narrows, GA",
  died: "July 17, 1961 — Atlanta, GA",
  hof: "Class of 1936 (1st ballot, 98.2% — highest ever at the time)",

  real_stats: {
    season: 1911, games: 146, at_bats: 591, hits: 248, doubles: 47,
    triples: 24, home_runs: 8, rbi: 127, stolen_bases: 83,
    batting_avg: ".420", obp: ".467", slg: ".621", ops: "1.088",
    ops_plus: 196, war: 10.3, gold_gloves: 0, silver_sluggers: 0,
    all_star: 0, career_avg: ".366", career_hits: 4189,
    career_hr: 117, career_sb: 897, career_war: 151.0,
  },

  ilb_stats: { ovr: 11, con: 5, pow: 1, spd: 3, def: 1, clu: 1 },

  stat_justification: {
    con: "Career .366 BA — the highest in baseball history. Hit over .400 three times. Led AL in batting 12 times, including 9 consecutive years (1907–1915). 4,189 career hits. The greatest pure hitter who ever lived.",
    pow: "Only 8 HR in his peak 1911 season, 117 career. Dead-ball era suppressed HR totals. However, his .621 SLG in 1911 was absurd for the era — he hit 47 doubles and 24 triples. The +1 SLG bonus is fully earned.",
    spd: "83 stolen bases in 1911. 897 career SB — held the record for 50+ years. Stole home 54 times, a record that will never be broken. Cobb on the basepaths was a weapon of psychological warfare.",
    def: "No Gold Gloves existed, but Cobb was a strong defensive CF in the dead-ball era. His range was excellent and his arm was solid. Rating of 1 reflects the lack of formal accolades rather than lack of ability.",
    clu: ".262 postseason BA across 17 games in 3 World Series (1907, 1908, 1909). Tigers lost all three. Cobb was decent but not transcendent in October. His legend was built in the regular season.",
  },

  personality: {
    leadership_style: "Domineering, relentless, lead-by-intimidation. Cobb didn't inspire — he demanded. Teammates feared him more than opponents did. His leadership was a force of nature, not warmth.",
    temperament: "Volcanic. Hair-trigger temper. Got into fistfights with teammates, opponents, fans, hotel workers, and strangers. Described by Sam Crawford as 'the most feared man in baseball — and not just on the field.' A genius-level intellect trapped in a rage furnace.",
    work_ethic: "Obsessive. Studied pitchers like a scientist. Practiced sliding in his hotel room with sharpened spikes. Weighted his bats in the offseason. Every edge, every advantage, every hour was devoted to domination.",
    lifestyle: "Isolated, paranoid, wealthy. Invested early in Coca-Cola and General Motors, became one of the richest athletes in history. Lived alone in later years. Few friends. Funded a hospital in his hometown of Royston, GA.",
    era_adaptability: "EXTREME. Cobb adapted to every condition. Played on dirt fields, in rain, in 100-degree heat. His intelligence and competitiveness would translate to any era — though his temperament might get him suspended in the modern game.",
    clubhouse_impact: "TOXIC-ELITE. Cobb made teams better by making everyone afraid to fail. He raised the standard through fear. Teammates performed because they didn't want to face his wrath. Not beloved — but effective.",
    dark_side: "Racist, violent, and deeply troubled. Cobb's father was accidentally shot and killed by his mother before Cobb reached the majors — a trauma that may have fueled his lifelong rage. He attacked a disabled fan in the stands (1912). His racial views were abhorrent even by his era's standards, though some revisionist historians have softened the record. In ILB terms: Cobb carries a permanent 'Volatility' trait with a much higher trigger rate than most players — he can explode in any situation.",
  },

  chemistry_traits: [
    { tag: "Lone Wolf", desc: "No team chemistry bonus. Cobb operates alone — he doesn't need the team, and they don't want to need him." },
    { tag: "Intimidator", desc: "Opposing pitchers and defenders lose -1 confidence when Cobb is at bat or on base." },
    { tag: "Volatile", desc: "High risk of ejection, suspension, or negative team event every 3 games. Roll a d20 each game: on 1, a Cobb Incident occurs." },
    { tag: "Cerebral", desc: "Cobb reads the game at a genius level. +1 to all base-running decisions and defensive positioning." },
    { tag: "Grudge Holder", desc: "If Cobb is hit by a pitch or slighted, he gains +2 to all stats vs. that opponent for the rest of the series." },
    { tag: "Dead-Ball Master", desc: "In Dead-Ball-era stadiums, Cobb gains +1 to CON, SPD, and OVR. He owns this era." },
    { tag: "Georgia Roots", desc: "Extra comfort in Southern-era squares. Discomfort in urban 1960s+ squares." },
    { tag: "Wealth", desc: "Cobb's personal fortune means he can never be traded for financial reasons. He stays until he decides to leave." },
  ],

  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Obsessive repetition. Practiced sliding and bunting for hours alone." },
    { location: "Hotel Room (alone)", affinity: "HIGH", note: "Sharpened spikes, studied pitcher tendencies, planned tomorrow's war." },
    { location: "Financial Office / Bank", affinity: "HIGH", note: "Managed his investments personally. Met with Coca-Cola executives." },
    { location: "Clubhouse / Locker Room", affinity: "LOW", note: "Teammates avoided him. Cobb tolerated the space, didn't own it like Puckett." },
    { location: "Bar / Saloon", affinity: "MEDIUM", note: "Drank, but it fueled the rage. Hidden Edge triggers more likely here." },
    { location: "Community Events", affinity: "LOW", note: "Later in life, funded hospitals and scholarships — but was rarely warm in public." },
    { location: "Gambling Hall", affinity: "LOW", note: "No major gambling association, but Cobb would bet on anything competitively." },
  ],

  momentum: {
    hot_triggers: [
      "Being challenged or disrespected — Cobb feeds on slights",
      "Facing a rival he has history with (personal grudges)",
      "Tight pennant races — Cobb's intensity scales with stakes",
      "Multi-hit games snowball into unstoppable streaks",
    ],
    cold_triggers: [
      "Team dysfunction or clubhouse drama (he often caused it)",
      "Injuries — Cobb played through them, but at diminished capacity",
      "Being benched or rested — perceived as weakness, causes rage",
    ],
    pressure_response: "EXTREME BUT INCONSISTENT. Cobb dominated regular seasons like no one else, but his .262 postseason BA suggests he didn't elevate in October the way legends like Puckett did. His intensity could work against him under the brightest lights. In ILB: Cobb is the ultimate regular-season weapon but carries risk in elimination games.",
  },

  action_card_seeds: [
    { title: "Spikes High", type: "Game Action",
      text: "Your base runner slides hard into the defender. The defender must roll: on 1-3, he's injured for 1 game. On 4-6, your runner is ejected. On 7+, safe — and the opponent's morale drops.",
      origin: "Cobb was infamous for sharpening his spikes and sliding with intent to injure. Frank 'Home Run' Baker's career was affected by a Cobb slide." },
    { title: "The Georgia Peach Snaps", type: "Drama",
      text: "Your star player attacks a fan in the stands. He is suspended for 3 games. His teammates must decide: strike in solidarity (+3 chemistry, -3 games) or play without him (-2 morale).",
      origin: "In 1912, Cobb climbed into the stands and beat a disabled heckler. When suspended, his Tiger teammates went on a one-game strike — the first player strike in MLB history." },
    { title: "Steal Home", type: "Game Action",
      text: "Your fastest player attempts to steal home plate. Roll vs. the catcher's DEF: success = run scores + momentum surge. Failure = out + momentum crash.",
      origin: "Cobb stole home 54 times in his career — an all-time record that has stood for over a century." },
    { title: "The Scientific Hitter", type: "Action",
      text: "Your highest-CON player studies the opposing pitcher's tendencies. He gains +1 CON for the next 3 at-bats and can choose to bunt for a guaranteed single once.",
      origin: "Cobb was famous for studying pitchers obsessively, changing his grip and stance mid-at-bat, and placing hits with surgical precision." },
    { title: "Coca-Cola Investment", type: "Drama",
      text: "Your wealthiest player makes a savvy investment. Gain 2 bonus resource cards. But teammates resent his wealth — team chemistry drops by 1.",
      origin: "Cobb was an early investor in Coca-Cola and General Motors, becoming one of the first athlete millionaires." },
    { title: "Father's Shadow", type: "Drama",
      text: "A traumatic memory surfaces for your star player. He either channels it into fury (+2 to all stats this game) or spirals (-2 to all stats and a Volatility check).",
      origin: "Cobb's father, a state senator, was shot and killed by Cobb's mother in 1905, just weeks before Ty reached the majors. The event haunted him for life." },
    { title: "Nobody Likes the Best", type: "Drama",
      text: "Your highest-OVR player is isolated by the team. He plays at full stats but team chemistry drops by 2 for 3 games. If you trade him, chemistry surges +3 but you lose the best player.",
      origin: "Cobb's teammates openly disliked him for most of his career. He was the best player in baseball and the least popular man in every clubhouse." },
    { title: "The Holdout", type: "Action",
      text: "Your star player demands a raise. Pay 2 resource cards to keep him at full stats, or refuse — he plays at -1 OVR for the rest of the season but you keep your resources.",
      origin: "Cobb held out for higher pay multiple times, becoming one of the highest-paid players in the dead-ball era at $20,000/year." },
  ],

  art_direction: {
    face: "Lean, angular face with piercing, predatory eyes. Sharp cheekbones, thin lips set in a permanent scowl. Clean-shaven. Sun-weathered skin with a few nicks and scrapes. He looks like he's about to end someone.",
    attire: "Detroit Tigers home whites, old English 'D' on chest, no number (pre-numbering era). High wool collar, loose-fitting flannel. Cap slightly askew. Tobacco-era grime on the sleeves and knees.",
    mood: "Cold fury. Not rage — controlled menace. The look a wolf gives before it moves. Cobb mid-swing follow-through, or in a low crouch on the basepath, spikes visible.",
    style: "Deep sepia with amber and burnt umber tones. Dust motes in the air. An old wooden grandstand blurred behind him. Tobacco-card composition — tight crop, shoulders up, face dominant. Aged paper texture with foxing at the edges.",
    reference: "Think T206 tobacco card energy but rendered in the unified ILB sepia portrait style. The most famous card in history was a Ty Cobb — lean into that legacy.",
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

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}>
    <span style={{ fontWeight: 700 }}>{tag}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function TyCobbCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = COBB_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

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
            {/* Portrait */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={COBB_IMG} alt="Ty Cobb" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>

            {/* Name */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>

            {/* Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>

            {/* Awards */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1936 (98.2%)", "👑 12× Batting Title", "🏆 .366 Career BA", "⚡ 897 Career SB", "📜 4,189 Career Hits", "🔥 Triple Crown 1909"].map((a, i) => (
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
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>
                <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
              </>)}

              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Cobb's real life, become universal cards playable in any game.</p>
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
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>This is the reusable formula for converting real Baseball Reference stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Cobb's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}
                </Section>
              )}
            </div>
          </div>
        )}

        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
