import { useState } from "react";

const GREENBERG_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: HANK GREENBERG
  // Year Snapshot: 1937 (Peak MVP Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Hank Greenberg",
  nickname: "Hammerin' Hank",
  year: 1937,
  team: "Detroit Tigers",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "R",
  throws: "R",
  height: "6'3\"",
  weight: "210 lbs",
  born: "January 1, 1911 — Greenwich Village, New York City (Romanian Jewish immigrant parents)",
  died: "September 4, 1986 — Beverly Hills, CA (age 75, kidney cancer)",
  hof: "Class of 1956 (BBWAA, 85%). #5 retired by Tigers (1983). First Jewish HOF inductee.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1937 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1937,
    games: 154,
    at_bats: 594,
    hits: 200,
    doubles: 49,
    triples: 14,
    home_runs: 40,
    rbi: 184,
    stolen_bases: 8,
    batting_avg: ".337",
    obp: ".436",
    slg: ".668",
    ops: "1.103",
    ops_plus: 172,
    war: 8.6,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 5,
    career_avg: ".313",
    career_hits: 1628,
    career_hr: 331,
    career_sb: 58,
    career_war: 57.6,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CON: .337 BA → tier 5 (.330+). OPS+ 172 → ≥130 bonus. Capped. CON 5.
  // POW: 40 HR → tier 4 (40-49). SLG .668 → ≥.500 bonus → +1. POW 5.
  // SPD: 8 SB → tier 1 (6-15). 6'3" 210 — power frame, not a speedster. SPD 1.
  // DEF: No Gold Gloves (pre-award). Adequate 1B. Moved to LF in 1940. DEF 0.
  // CLU: .318 WS BA in 4 Fall Classics. .304 in 1945 WS (champ). 7 RBI in 1945 WS. Yom Kippur courage. CLU 2.
  // OVR: CON(5)×2 + POW(5)×1.5 + SPD(1)×1 + DEF(0)×0.5 = 10+7.5+1+0 = 18.5 → normalized ~11 (Legend)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 11,     // Legend tier — 184 RBI in 1937, 58 HR in 1938, 2× MVP. Lost 4+ prime years to WWII.
    con: 5,      // .337 in 1937. Career .313. 200+ hits 3 times. .300+ in 8 seasons. Max contact.
    pow: 5,      // 40 HR in 1937 → tier 4. SLG .668 → bonus +1 = POW 5. 58 HR in 1938. 184 RBI. Career .605 SLG. Maximum power.
    spd: 1,      // 8 SB in 1937. Career 58 SB. 6'3" power frame. Not slow but not a factor. SPD 1.
    def: 0,      // No Gold Gloves. Adequate 1B — moved to LF in 1940 to make room for Rudy York. Not a defensive asset. DEF 0.
    clu: 2,      // .318 WS BA across 4 Fall Classics. .304 in 1945 WS (champ, 7 RBI in 7 games). Broke wrist in 1935 WS Game 2. Grand slam clinched 1945 pennant. Solid but injuries limited WS impact. CLU 2.
  },
  
  stat_justification: {
    con: ".337 BA in 1937 MVP year. Career .313 over 13 seasons. 200+ hits three times. .300+ in 8 of 9 full seasons. DiMaggio: 'He was one of the truly great hitters, and when I first saw him at bat, he made my eyes pop out.' Rick Ferrell noted his power overshadowed elite contact ability.",
    pow: "40 HR in 1937, 58 in 1938 (2 short of Ruth's record). 184 RBI in 1937 (3rd most in MLB history, AL RH record). Career .605 SLG — only Ruth, Williams, Gehrig, Foxx ahead at retirement. Led AL in HR 4×, RBI 4×. 11 multi-HR games in 1938 (MLB record). Prodigious, terrifying power. Maximum rating.",
    spd: "8 SB in 1937, 58 career. Large man (6'3\" 210) with good but not exceptional speed. 14 triples in 1937 shows he could run. But speed was never his weapon. Rating of 1.",
    def: "No Gold Gloves (pre-award). Adequate first baseman who moved to LF in 1940 to make room for Rudy York. Not a defensive liability, but not an asset. Greenberg himself said he was 'just average' in the field. Rating of 0.",
    clu: ".318 WS BA in 23 games across 4 Fall Classics (1934, 1935, 1940, 1945). Broke wrist in 1935 WS Game 2 — missed rest of that championship. Grand slam on final day 1945 clinched pennant. .304 in 1945 WS with 7 RBI. But the wrist injury and wartime absence limited his postseason legacy. Solid, not transcendent. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Quiet Colossus. At 6'3\", Greenberg towered over his era physically and morally. He led not with words but with presence — the first Jewish superstar in American team sports, carrying the weight of an entire community on his shoulders during the Depression and the rise of Hitler. His leadership was existential: every home run was a statement. 'If I, as a Jew, hit a home run, I was hitting one against Hitler.'",
    temperament: "Stoic under fire. Endured relentless antisemitic abuse — 'kike,' 'sheenie,' 'Jew bastard' — from fans and players throughout his career. Birdie Tebbetts: 'Nobody in the history of the game took more abuse than Greenberg, unless it was Jackie Robinson.' He never snapped publicly. Channeled fury into performance. Self-made: not a natural athlete, he built himself into a slugger through obsessive practice.",
    work_ethic: "LEGENDARY. Greenberg was not born a ballplayer — he made himself one through sheer will. Spent hours daily hitting in empty stadiums. Quickest to 100 RBI in a season (75 games, 1935). Quickest to 1,200 career RBI (1,266 games). After 4+ years in the military, returned at age 34 and immediately led the AL in HR and RBI. The work ethic of a man who knew nothing was given.",
    lifestyle: "Sophisticated, cosmopolitan. Son of Romanian Jewish immigrants in Greenwich Village. Turned down the Yankees (Gehrig blocked 1B), attended NYU on scholarship. Married Caral Gimbel (heiress to Gimbels department stores), divorced. Later married Mary Jo DeCicco. Moved to Beverly Hills. Became GM of the Indians (1950-57) and co-owner of the White Sox with Bill Veeck. Died wealthy and respected.",
    era_adaptability: "HIGH. Greenberg's power translates to every era. His self-made work ethic and mental toughness are timeless. His willingness to switch positions (1B to LF) shows adaptability. A 6'3\" right-handed power hitter with a .412 career OBP would be a franchise cornerstone in any decade.",
    clubhouse_impact: "HIGH. A unifying figure — Jewish teammates felt protected by his presence, non-Jewish teammates respected his dignity. When Jackie Robinson faced abuse in 1947, Greenberg was one of the only opposing players to publicly embrace and encourage him. His moral authority transcended the clubhouse.",
    dark_side: "The stolen years. Greenberg lost over four years to WWII — his entire age 30-34 prime. He was the first MLB player to enlist and served 47 months (more than any other player). What would his career numbers be with 4 more years of 40-HR seasons? Projected: 500+ HR, 2,500+ hits. Instead: 331 HR, 1,628 hits. The greatest what-if in baseball history. Also: the wrist fracture in the 1935 WS denied him his greatest moment. He won the ring but couldn't celebrate it on the field.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Hammerin' Hank", desc: "+1 POW innate. Greenberg was one of the most feared sluggers in history. 184 RBI in a single season. 58 HR chasing Ruth." },
    { tag: "The Hebrew Hammer", desc: "When facing antisemitic abuse or ethnic hostility, +2 POW. 'If I, as a Jew, hit a home run, I was hitting one against Hitler.' Hate makes him stronger." },
    { tag: "Yom Kippur", desc: "Once per season, Greenberg may sit out a game for religious observance during a pennant race. Team loses the game but gains +3 morale and +2 fan loyalty from the courage of conviction." },
    { tag: "Self-Made Star", desc: "+1 all stats after age 27. Greenberg built himself through practice. He wasn't a natural — every skill was earned." },
    { tag: "G-Men Infield", desc: "Synergy with Gehringer, Goslin, Cochrane. 3+ Tigers dynasty players = +1 POW for all." },
    { tag: "Lost to War", desc: "If drafted/enlisted, player misses 4 full seasons. Returns at -1 SPD but +1 CLU. The experience of combat changes a man." },
    { tag: "Jackie's Ally", desc: "+2 chemistry with any player facing discrimination. Greenberg embraced Robinson when no one else would." },
    { tag: "Broken Wrist", desc: "In the World Series, 20% chance of season-ending injury in Games 1-3. The curse of 1935." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Hours of daily practice in empty stadiums. 'Self-made' means self-trained." },
    { location: "Synagogue / Place of Worship", affinity: "HIGH", note: "Standing ovation at Shaarey Zedek on Yom Kippur 1934. Faith defined him." },
    { location: "Front Office / Business", affinity: "HIGH", note: "Became Indians GM, White Sox co-owner. A businessman's mind in a slugger's body." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Cosmopolitan. Beverly Hills lifestyle. Married into the Gimbel fortune." },
    { location: "Community Events", affinity: "MEDIUM", note: "Symbol to Jewish community. Not a natural showman but understood his responsibility." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Focused on performance. Not a carouser." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Facing antisemitic abuse — transformed hatred into fuel ('hitting one against Hitler')",
      "Pennant races and meaningful September games",
      "Returning from absence (military, injury) — immediately regained elite form in 1945",
      "Playing alongside Gehringer — the infield synergy of the G-Men era",
      "Chasing records and milestones (58 HR in 1938, 184 RBI in 1937)",
    ],
    cold_triggers: [
      "Injuries — broken wrist (1936), various ailments shortened seasons",
      "Contract disputes — lengthy 1936 holdout disrupted spring training",
      "Isolation from Jewish community (rare — he kept connections)",
      "Being walked intentionally — 1938 pitchers refused to pitch to him late in HR chase",
    ],
    pressure_response: "ELITE. Greenberg thrived on pressure with a moral dimension. The Yom Kippur decision. The HR chase against antisemitic headwinds. Returning from 4+ years of war to lead the league immediately. Grand slam on the final day of 1945 to clinch the pennant. He performed best when the stakes transcended baseball.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Hitting One Against Hitler",
      type: "Game Action",
      text: "Your star player is facing hostile abuse from the crowd or opposing bench. Channel the hatred: +3 POW for this at-bat only. If he homers, opposing team loses -2 morale.",
      origin: "Greenberg: 'I came to feel that if I, as a Jew, hit a home run, I was hitting one against Hitler.' He endured relentless antisemitic slurs and answered with his bat.",
    },
    {
      title: "The Yom Kippur Decision",
      type: "Drama",
      text: "Your star player faces a conflict between religious obligation and a pennant race. If he plays: +1 game result but -1 community trust. If he sits: team loses the game but gains +3 morale and becomes a national story.",
      origin: "Sept 1934: Greenberg played on Rosh Hashanah (2 HR, Tigers won 2-1) but sat on Yom Kippur (Tigers lost). Standing ovation at synagogue. Edgar Guest wrote a poem honoring him.",
    },
    {
      title: "Two Short of the Babe",
      type: "Game Action",
      text: "Your slugger has 58 HR with 5 games left, chasing a record. Opposing pitchers refuse to pitch to him (60% walk rate). If he gets a hittable pitch, 40% chance he breaks the record. Either way, the chase itself is legendary.",
      origin: "1938: Greenberg hit 58 HR, falling 2 short of Ruth's 60. Walked repeatedly in final games. Umpire Moriarty: 'I'm sorry, this is as far as I can go.' Greenberg: 'That's all right, this is as far as I can go too.'",
    },
    {
      title: "First to Serve",
      type: "Drama",
      text: "Your star player enlists in the military during wartime. He misses 4 seasons. When he returns, he plays at -1 SPD but +1 CLU permanently, and the team gains +3 fan loyalty for his sacrifice.",
      origin: "Greenberg was the first MLB player to enlist in WWII (May 1941). Served 47 months — more than any other player. 'I never asked for a deferment.' Returned at 34 and led AL in HR.",
    },
    {
      title: "The Grand Slam Pennant",
      type: "Game Action",
      text: "Final day of the season. Your team needs a win to clinch. Your (+9 or higher) slugger hits a grand slam in the 9th to clinch the pennant. Team erupts.",
      origin: "September 30, 1945: Greenberg hit a grand slam in the 9th inning on the final day to clinch the pennant for Detroit. He'd been back from the war for barely 3 months.",
    },
    {
      title: "Jackie's Friend",
      type: "Drama",
      text: "A new player from a marginalized background faces abuse. Your veteran (+8 or higher) publicly embraces him. Both players gain +1 morale. Team chemistry +2. A bond that transcends baseball.",
      origin: "1947: Greenberg, in his final season with Pittsburgh, was one of the only players to publicly welcome Jackie Robinson. He told Jackie: 'Don't let them get you down. You're doing fine.'",
    },
    {
      title: "The Broken Wrist",
      type: "Drama",
      text: "Your star player breaks his wrist in Game 2 of the World Series. He's out for the rest of the Fall Classic. Team must win without him. If they do, +2 legacy. If they lose, the what-if haunts forever.",
      origin: "1935 WS: Greenberg broke his wrist in Game 2 and missed the rest. Tigers won anyway — their first championship — but Greenberg couldn't celebrate on the field.",
    },
    {
      title: "Greenberg Gardens",
      type: "Action",
      text: "When your power hitter is traded, the new team shortens the outfield fence in his honor. +2 HR for the season. When he retires, rename the area for the next slugger.",
      origin: "Pittsburgh shortened Forbes Field's LF fence for Greenberg in 1947 ('Greenberg Gardens'). When he retired, it became 'Kiner's Korner' for Ralph Kiner.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Towering, powerful, handsome. 6'3\" 210 lbs — the biggest man on any 1930s field. Strong jaw, dark features, Romanian Jewish heritage. Serious expression with quiet dignity. Not menacing like Simmons — commanding. The face of a man who carried a community's hopes.",
    attire: "Detroit Tigers 1937 home whites with Old English 'D' area. Classic baggy wool flannel stretched over a massive frame. Cap slightly back, revealing the forehead. Number 5.",
    mood: "Power and dignity. The follow-through of a majestic home run swing — right-handed, all arms and torque. Or the stance: coiled, enormous, dangerous. This card should feel like both a baseball card and a historical monument.",
    style: "Deep amber and bronze tones. Richer, warmer than Gehringer's soft sepia. Briggs Stadium lights catching the evening sky. The weight of history in every shadow. Oil painting texture with a sense of gravitas — this isn't just a ballplayer, this is a symbol.",
    reference: "Think 1934 Goudey card power rendered in ILB sepia style. The card that carries the most moral weight in the Crashers lineup. Every home run meant something beyond baseball.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
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
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div> );

export default function HankGreenbergCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = GREENBERG_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Massive RH swing, Tigers whites #5, Briggs Stadium, power and dignity]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
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
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1956", "⭐ 5× All-Star", "🏅 2× AL MVP", "🏆 2× WS Champ", "💥 58 HR (1938)", "📰 184 RBI (1937)"].map((a, i) => (
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
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Greenberg's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Greenberg's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}
                </Section>
              </>)}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
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
