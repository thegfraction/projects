import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}lajoie-nap.png`;

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: NAP LAJOIE
  // Year Snapshot: 1901 (Peak Season — Triple Crown)
  // ═══════════════════════════════════════════════════════════════

  name: "Nap Lajoie",
  nickname: "The Frenchman",
  year: 1901,
  team: "Philadelphia Athletics",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "2B",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "195 lbs",
  born: "September 5, 1874 — Woonsocket, RI",
  died: "February 7, 1959 — Daytona Beach, FL",
  hof: "Class of 1937 (BBWAA, 83.6% — led all inductees that year)",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1901 PEAK SEASON (TRIPLE CROWN)
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1901,
    games: 131,
    at_bats: 544,
    hits: 232,
    doubles: 48,
    triples: 14,
    home_runs: 14,
    rbi: 125,
    stolen_bases: 27,
    batting_avg: ".426",
    obp: ".463",
    slg: ".643",
    ops: "1.106",
    ops_plus: 220,
    war: 11.7,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 0,
    career_avg: ".338",
    career_hits: 3242,
    career_hr: 82,
    career_sb: 380,
    career_war: 107.2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CONTACT (CON): .426 BA → 5, OPS+ 220 → already capped = 5
  // POWER (POW): 14 HR → 1, SLG .643 → +1 = 2
  // SPEED (SPD): 27 SB → 2
  // DEFENSE (DEF): No Gold Gloves (didn't exist), but led AL 2B
  //   in putouts, assists, DPs multiple times. Elite fielder = 2
  // OVERALL (OVR): CON×2+POW×1.5+SPD×1+DEF×0.5 = 10+3+2+1 = 16
  //   Normalized: 12 (Legend)
  // CLUTCH (CLU): Never reached World Series. .289 in 1908
  //   pennant race collapse. Limited postseason data = 0
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 10,     // Elite / MVP tier — one of the greatest seasons ever, but limited postseason
    con: 5,      // .426 BA in 1901 — highest in the 20th century. Career .338.
    pow: 2,      // 14 HR + .643 SLG — Triple Crown power in the dead-ball era
    spd: 2,      // 27 SB in 1901, 380 career — solid but not elite
    def: 2,      // Led AL 2B in putouts, assists, DPs, fielding pct multiple times — elite glove
    clu: 0,      // Never reached a World Series. Choked in 1908 pennant race (.289). No October moments.
  },

  stat_justification: {
    con: ".426 BA in 1901 — the highest single-season average in the American League, ever. Still the record 124 years later. Won 5 batting titles. Career .338 BA with 3,242 hits. Only struck out 9 times in his entire 1901 season. The man placed the ball wherever he wanted with a custom two-knob bat.",
    pow: "14 HR and .643 SLG in 1901 — won the Triple Crown. Led the AL in total bases (350), extra-base hits (76), doubles (48). For a dead-ball-era second baseman, this was monster power. He out-homered an entire team that year.",
    spd: "27 SB in 1901, 380 career. Connie Mack described him as going 'over the ground like a deer.' Good speed for his 6'1\" 195-lb frame, especially at second base, but not a basestealing weapon like Cobb.",
    def: "Led AL second basemen in putouts 5 times, assists 3 times, double plays 5 times, fielding percentage 4 times. Connie Mack said he 'plays so naturally and so easily it looks like lack of effort.' One of the greatest defensive second basemen ever. Rating of 2 rather than 3 only because Gold Gloves didn't exist.",
    clu: "Never appeared in a World Series (the WS started in 1903; Lajoie's teams never won the pennant). In 1908, his Cleveland Naps lost the pennant by .004 to Detroit — and Lajoie batted just .289 down the stretch, blaming himself for the collapse. No postseason heroics to speak of.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "Quiet authority. Lajoie led by example, not by speeches. He was the franchise — Cleveland literally renamed their team 'the Naps' after him. But as a player-manager (1905–1909), he struggled with strategy and signals. He was a doer, not a schemer.",
    temperament: "Steady, professional, easygoing. The anti-Cobb. Lajoie was well-liked by teammates, opponents, and fans. Cy Young called him 'one of the most rugged hitters I ever faced' but everyone respected the man. Not a hothead — but not a pushover either. He jumped leagues over a $400 salary dispute.",
    work_ethic: "Natural talent over grind. Where Cobb practiced obsessively, Lajoie made it look effortless. He had a custom-designed two-knob bat from Hillerich that gave him supernatural bat control. His gift was God-given fluidity — the ball went where he wanted it almost by instinct.",
    lifestyle: "Working-class roots. Son of French-Canadian immigrants in Woonsocket, RI. Father died when Nap was 5. Worked in cotton mills as a kid, drove a horse cab as a teenager ('The Slugging Cabby'). Money motivated him — he jumped to the AL for $6,000/year when the NL capped him at $2,400. Practical, not flashy.",
    era_adaptability: "HIGH. Lajoie adapted from the NL to the brand-new AL without blinking — in fact, he dominated harder. His natural athleticism and bat control would translate to any era. His calm demeanor would make him a perfect modern clubhouse presence.",
    clubhouse_impact: "POSITIVE-STEADY. Not a rah-rah guy, but universally respected. Teammates liked playing with him. He didn't cause drama, didn't demand attention, and elevated everyone's game just by being the best player on the field. The kind of star every team wants.",
    dark_side: "The 1910 batting title scandal. In the final games of the season, opposing St. Louis Browns manager Jack O'Connor allegedly ordered his third baseman to play deep, gifting Lajoie bunt hits to deny Cobb the batting crown. Lajoie went 8-for-8 with 7 bunts. The scheme was exposed; O'Connor was fired. Lajoie's reputation survived mostly intact — he was the sympathetic figure — but it remains a blemish. In ILB terms: Lajoie carries a low-frequency 'Scandal' trigger that can emerge in tight batting races.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "Franchise Face", desc: "Team morale +1 when Lajoie is in the starting lineup. The team is literally named after him." },
    { tag: "Natural Talent", desc: "Lajoie's skills don't degrade under fatigue. He plays at full capacity even when tired." },
    { tag: "Everyman", desc: "Compatible with players from all eras and backgrounds. No chemistry conflicts." },
    { tag: "Blue Collar", desc: "Extra comfort in industrial-era and working-class city squares. Grew up in cotton mills." },
    { tag: "Graceful Defender", desc: "+1 DEF when playing second base. His fielding was described as 'picking fruit.'" },
    { tag: "Bat Craftsman", desc: "Lajoie's custom two-knob bat gives him +1 CON when batting with RISP (runners in scoring position)." },
    { tag: "Rival: Cobb", desc: "When on the same team or opposing Ty Cobb, both players gain +1 to all stats from competitive fire." },
    { tag: "League Jumper", desc: "Can be recruited to any team regardless of league restrictions. His contract disputes make him available." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "MEDIUM", note: "Natural talent. Practiced, but didn't grind like Cobb. Made it look easy." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Well-liked, comfortable, the steady center of any team." },
    { location: "Restaurant / Steakhouse", affinity: "HIGH", note: "Enjoyed team dinners. Social but not wild. A man of simple pleasures." },
    { location: "Financial Office / Bank", affinity: "MEDIUM", note: "'I'm out for the stuff' — his career motto. Money-motivated but not a tycoon." },
    { location: "Community Events", affinity: "MEDIUM", note: "Popular with fans but not a showman. Respected more than adored." },
    { location: "Bar / Saloon", affinity: "LOW", note: "No major drinking associations. Steady lifestyle." },
    { location: "Gambling Hall", affinity: "NONE", note: "No association." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "New league / new team — Lajoie thrives in fresh starts (jumped to AL and hit .426)",
      "Multi-hit games — once locked in, he stays locked in for weeks",
      "Salary disputes resolved in his favor — motivation surges",
      "Playing against Cobb — the rivalry elevates both players",
    ],
    cold_triggers: [
      "Managerial responsibilities — his batting average dropped significantly as player-manager",
      "Pennant pressure — collapsed in 1908 when it mattered most",
      "Contract disputes unresolved — plays distracted when underpaid",
    ],
    pressure_response: "INCONSISTENT. Lajoie was a dominant regular-season force but wilted in the one true pennant race he faced. His .289 down the stretch in 1908 — when Cleveland lost by .004 — haunted him. He never reached a World Series. In ILB: Lajoie is a stat-sheet monster who carries real risk in elimination scenarios. Pair him with a high-CLU player to compensate.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Triple Crown",
      type: "Game Action",
      text: "Your highest-CON player leads the league in AVG, HR, and RBI simultaneously. For the next 3 games, he gains +1 to CON, POW, and OVR. Opposing teams lose -1 morale.",
      origin: "Lajoie won the first AL Triple Crown in 1901 with a .426 BA, 14 HR, and 125 RBI — one of the most dominant seasons in baseball history.",
    },
    {
      title: "League Jumper",
      type: "Drama",
      text: "Your star player is offered double his salary by a rival league. Pay 3 resource cards to match the offer, or lose him. If you match, team chemistry +2 (loyalty). If you don't, he joins the opponent's next available team.",
      origin: "Lajoie jumped from the Phillies to the Athletics in 1901 when the NL capped his salary at $2,400 and the AL offered $6,000.",
    },
    {
      title: "The Injunction",
      type: "Drama",
      text: "A court order bars your player from competing in one state. He can play all away games except in that state. You lose home-field advantage for 1 season but keep the player.",
      origin: "The Pennsylvania Supreme Court upheld an injunction barring Lajoie from playing for any team other than the Phillies — but only in Pennsylvania. He was traded to Cleveland to circumvent it.",
    },
    {
      title: "The Bunt Scandal",
      type: "Drama",
      text: "In a tight batting race, an opposing manager orders his fielders to play deep, gifting your player easy bunts. Your player goes 8-for-8 — but if discovered, the opposing manager is fired and your player's reputation takes -1 for the season.",
      origin: "The infamous 1910 batting race: Browns manager O'Connor ordered his 3B to play deep, letting Lajoie bunt his way to 8 hits in a doubleheader to try to beat Cobb for the title.",
    },
    {
      title: "Name the Team",
      type: "Action",
      text: "Your franchise player is so beloved that the team is renamed after him. Team morale +3 for the rest of the season. But if that player is ever traded, morale crashes by -5.",
      origin: "The Cleveland franchise renamed itself 'the Naps' in honor of Lajoie. When he left in 1914, they became the Indians.",
    },
    {
      title: "The Slugging Cabby",
      type: "Action",
      text: "A young prospect from a working-class background arrives. He's raw but talented. If you start him immediately, he gains +2 to all stats for his first 3 games. If you bench him, he develops slowly but safely.",
      origin: "Lajoie was driving a horse cab for $7.50/week before signing his first baseball contract. He went 4-for-his-first-5 in the minors and never looked back.",
    },
    {
      title: "The Custom Bat",
      type: "Game Action",
      text: "Your player commissions a custom bat design. For the rest of the season, he gains +1 CON and can place-hit: choose to pull or go opposite field on any at-bat.",
      origin: "Lajoie used a custom two-knob bat made by J.F. Hillerich Company that gave him extraordinary bat control. He could place the ball wherever he wanted.",
    },
    {
      title: "Pennant Collapse",
      type: "Drama",
      text: "Your team leads the league with 10 games left. Your player-manager's batting average drops by -2 CON under the weight of dual responsibilities. If the team loses the pennant, the manager resigns.",
      origin: "Lajoie batted just .289 as player-manager in the 1908 pennant race, and Cleveland lost to Detroit by .004. He blamed himself and resigned as manager after 1909.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Broad, strong face with a calm, confident expression. Large build for the era — 6'1\" 195 lbs. Clean-shaven with a square jaw. Deep-set eyes that radiate quiet competence. French-Canadian features — strong nose, dark complexion.",
    attire: "Philadelphia Athletics or Cleveland Naps home whites, high wool collar, loose flannel. No number (pre-numbering era). Cap sits straight and proper — this is a professional. Clean uniform — Lajoie was elegant, not gritty.",
    mood: "Serene confidence. Not aggressive like Cobb — poised. The look of a man who knows he's the best and doesn't need to prove it. Mid-swing follow-through with a custom bat, or fielding a grounder with balletic ease at second base.",
    style: "Warm sepia with golden undertones. Soft stadium light from a wooden grandstand. Cleaner than Cobb's card — less dust, more polish. Tobacco-card composition with ornate border, but slightly more refined. Aged paper texture with gentle foxing.",
    reference: "Think T206 Lajoie card — the dignified companion to Cobb's feral energy. Same ILB sepia portrait style but warmer, calmer. The gentleman's card.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — REUSABLE METHODOLOGY
// ═══════════════════════════════════════════════════════════════
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

export default function NapLajoieCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
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
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
              {["🏆 HOF 1937 (83.6%)", "👑 Triple Crown 1901", "👑 5× Batting Title", "📜 3,242 Career Hits", "🏆 .338 Career BA", "⚡ 657 Career 2B"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Lajoie's real life, become universal cards playable in any game.</p>
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
                <Section title="Lajoie's Derivation">
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
