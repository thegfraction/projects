import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}mcginnity-joe.png`;

const PLAYER_DATA = {
  name: "Joe McGinnity",
  nickname: "Iron Man",
  year: 1904,
  team: "New York Giants",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "206 lbs",
  born: "March 20, 1871 — Cornwall, IL",
  died: "November 14, 1929 — Brooklyn, NY (age 58, bladder cancer). Last words before surgery: 'It's the ninth inning, and I guess they're going to get me out.'",
  hof: "Inducted 1946 (Veterans Committee). 246 MLB wins, ~478 total professional wins. Pitched until age 54.",

  real_stats: {
    season: 1904, games: 51, wins: 35, losses: 8, era: "1.61",
    innings: "408.0", strikeouts: 144, walks: 86, complete_games: 38,
    shutouts: 9, whip: "0.963", saves: 5, war: 11.6,
    career_wins: 246, career_losses: 142, career_era: "2.66",
    career_strikeouts: 1068, career_cg: 314, career_shutouts: 32,
    career_war: 52.5, career_ip: "3441.1",
    ws_1905_ip: "17.0", ws_1905_era: "0.00",
  },

  ilb_stats: {
    ovr: 11,     // Legend — 35-8, 1.61 ERA, 408 IP in 1904. Won both DH games 3× in one month. 0.00 WS ERA. Mathewson's partner. HOF.
    stf: 4,      // 1.61 ERA → tier 4 (1.50-1.99). K/9 ~3.18 — very low, no K bonus. Not a power pitcher — relied on "Old Sal" (rising curve) and sinker with submarine delivery. Rating: 4.
    ctl: 4,      // BB/9 ~1.90 → tier 3 (1.5-1.99). WHIP 0.963 → ≤1.00 bonus (+1) = 4. Elite command of the submarine curve. Rating: 4.
    sta: 5,      // 408 IP → tier 5 (350+). 38 CG in 51 games. Won BOTH games of a doubleheader 3 times in August 1903. 434 IP in 1903. Averaged 344 IP per season. Maximum stamina: 5.
    def: 1,      // Decent fielding pitcher. Not elite defensively. Rating: 1.
    clu: 3,      // 1905 WS: 17 IP, 0 ER (0.00 ERA). PS ERA < 2.00 = 2. WS champion = +1. Maximum clutch: 3.
  },

  stat_justification: {
    stf: "1.61 ERA in 1904 → tier 4 (1.50-1.99). K/9 was only ~3.18 — no K bonus. McGinnity was NOT a power pitcher. He relied on 'Old Sal' — a baffling rising curveball thrown with a submarine delivery — plus a sinker thrown overhand. Two radically different motions. McGraw said this may have lessened arm strain. The deception was the weapon, not velocity. Rating: 4.",
    ctl: "BB/9 ~1.90 in 1904 → tier 3 (1.5-1.99). WHIP 0.963 → ≤1.00 bonus (+1) = 4. McGinnity pitched 408 innings and walked only 86 batters. His command of the submarine curve was superb — batters swung at pitches they couldn't touch. Rating: 4.",
    sta: "408 IP in 1904 → tier 5 (350+). 38 CG in 51 games. In August 1903, McGinnity won BOTH games of a doubleheader three times in one month (Aug 1, Aug 8, Aug 31) — a record that will never be broken. He pitched 434 IP in 1903. Averaged 344 IP per season across his career. Pitched professionally until age 54. The Iron Man nickname was literal — he worked in an iron foundry in the offseason. Maximum stamina: 5.",
    def: "Decent fielding pitcher. Not known for elite defense. Rating: 1.",
    clu: "1905 WS: 17 IP, 0 ER — 0.00 ERA. Helped the Giants win the championship alongside Mathewson's 3 shutouts. PS ERA < 2.00 = 2. WS champion = +1. Maximum clutch: 3.",
  },

  personality: {
    leadership_style: "Lead by relentless example and mentorship. McGinnity didn't just dominate — he built others up. He taught Mathewson the sinker, showed him how to scout hitters, and gave him tips on fielding. Previous Giants management had been trying to convert Mathewson into a first baseman. McGinnity helped save the greatest pitching career in NL history. That's leadership.",
    temperament: "Fiery, combative, tireless. A man who worked in an iron foundry by winter and pitched 400+ innings by summer. He personally poured iron into the molds for Birmingham's Vulcan statue. When facing surgery for bladder cancer: 'It's the ninth inning, and I guess they're going to get me out.' He faced death the way he faced doubleheaders — head on.",
    work_ethic: "THE DEFINITION OF WORKHORSE. Won both games of a doubleheader three times in one month. Pitched 434 innings in 1903. Averaged 344 IP per season. Pitched professionally until age 54, winning ~478 career games including minors. The iron foundry wasn't a metaphor — it was conditioning. His arm was made of the same stuff they poured at the plant.",
    lifestyle: "Working-class Irish-American. Father Peter emigrated from Dublin, worked in coal mines. Joe worked iron foundries in the offseason. Married Mary — she died in the middle of a managing stint, and he left the team. Spent his last years living with his daughter Marguerite in a small Brooklyn house near Ebbets Field. After baseball, he bought the Newark Indians for $30,000. Kept pitching in the minors because he couldn't stop.",
    era_adaptability: "COMPLEX. McGinnity's submarine/sidearm delivery and sinker-curve combo would be unusual but potentially effective in any era — modern pitchers like Brad Ziegler and Chad Bradford used similar approaches. His stamina stats would be meaningless in a modern 5-day rotation, but his deception and movement would play. The issue: his K rate was below average even for his time. He'd need a great defense behind him.",
    clubhouse_impact: "MENTOR AND WARRIOR. McGinnity was the veteran who steadied McGraw's Giants and developed Mathewson. He was the co-ace, not the diva. His willingness to pitch doubleheaders, take the ball every other day, and do whatever the team needed made him the ultimate clubhouse asset. In ILB: +2 team morale from sheer reliability.",
    dark_side: "The body and the endings. Mary McGinnity died while he was managing, and Iron Man left the team to grieve. He spent his last years in a small Brooklyn house, walking distance from Ebbets Field but worlds away from the glory. Bladder cancer took him at 58. He joked his way into the operating room and died three months later. The iron foundry gave him his name, and time melted him like the metal he once poured.",
  },

  chemistry_traits: [
    { tag: "Iron Man", desc: "Named for the foundry, lived as the name implied. McGinnity can pitch on 0 days' rest with no penalty. He is immune to fatigue. The arm is industrial." },
    { tag: "Old Sal", desc: "His signature rising curveball, thrown submarine. First batter of each inning faces -1 CON from the unfamiliar delivery angle." },
    { tag: "Doubleheader King", desc: "Won both games of a DH 3× in one month. McGinnity can start both games of a doubleheader with no stat penalty. This card is unique in ILB." },
    { tag: "Mathewson's Mentor", desc: "Taught Christy the sinker, saved his career from conversion to 1B. When paired with Mathewson, both gain +1 STF from shared knowledge." },
    { tag: "McGraw's Soldier", desc: "Followed McGraw from Baltimore to Brooklyn to the Giants. Perfect manager-pitcher synergy. +1 to all stats when managed by an aggressive, fiery manager." },
    { tag: "The Foundry", desc: "Offseason iron foundry work = unlimited conditioning. +1 STA permanently. Other pitchers lose stamina over a season; McGinnity gains it." },
    { tag: "Pitched Till 54", desc: "~478 professional wins including minors. McGinnity's career never truly ends — even after 'retirement,' he can return at reduced stats." },
    { tag: "Ninth Inning", desc: "'It's the ninth inning, and I guess they're going to get me out.' When facing elimination or career-ending moments, +2 CLU for one final performance." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "3,441 career MLB IP. ~7,000+ professional IP including minors. More time on the mound than almost any human." },
    { location: "Iron Foundry / Factory", affinity: "HIGH", note: "Worked in iron foundries every offseason. Personally poured iron for Birmingham's Vulcan statue. The foundry made the man." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The veteran mentor. Taught Mathewson, steadied McGraw's clubhouse. The reliable presence every team needs." },
    { location: "Minor League Park", affinity: "MEDIUM", note: "Bought the Newark Indians. Pitched in the minors until 54. Managed everywhere. The minors were his second home." },
    { location: "Church / Family", affinity: "MEDIUM", note: "Irish-Catholic. Devastated by wife Mary's death. Lived with daughter Marguerite in Brooklyn." },
    { location: "Bar / Saloon", affinity: "LOW", note: "Working-class, but not a carouser. Too busy pitching and pouring iron." },
    { location: "Hospital", affinity: "LOW", note: "Bladder cancer, surgery, death at 58. 'It's the ninth inning.' The iron man rusted." },
  ],

  momentum: {
    hot_triggers: [
      "Doubleheaders — won both games 3× in August 1903. The more he pitches, the stronger he gets.",
      "Pennant races — opened 1904 with a 14-game winning streak, ended winning 12 of last 13. Rose in September.",
      "Pairing with Mathewson — from 1903-08, either McGinnity or Mathewson led the NL in wins every year",
      "McGraw managing — perfect synergy with an aggressive, demanding manager who understood his iron arm",
    ],
    cold_triggers: [
      "Wife's death — Mary McGinnity died mid-season while he was managing. He left the team. Grief breaks even iron.",
      "Aging — 18-18 in 1907, waivers in 1908. The body declined even if the spirit didn't.",
      "Low strikeouts — K/9 was always below average. If the defense behind him fails, the results follow.",
      "Contract disputes — held out after 1904 when ownership wouldn't let him play winter ball.",
    ],
    pressure_response: "SUPERB. McGinnity's 1905 World Series: 17 IP, 0 ER, 0.00 ERA. He and Mathewson combined for a shutout-dominated WS victory that established the Giants as champions. In 1904, he opened with a 14-game winning streak and ended winning 12 of 13. His August 1903 doubleheader month — 3 complete DH sweeps — is the greatest sustained pitching performance in baseball history. The Iron Man didn't bend under pressure. He bent the game to his will.",
  },

  action_card_seeds: [
    { title: "Three Doubleheader Sweeps in One Month", type: "Game Action", text: "Your pitcher starts both games of a doubleheader — and wins both. Complete games in each. He does this again the next week. And again the week after that. Three times in one month. The opposing lineup is demoralized. This card can only be played by a pitcher with STA 5.", origin: "August 1903: McGinnity won both games of a doubleheader on Aug 1, Aug 8, and Aug 31 — all complete games, all in the same month. A record that will never be broken." },
    { title: "Old Sal", type: "Game Action", text: "Your pitcher throws a rising curveball from a submarine delivery that batters have never seen. For 3 innings, all opposing batters face -2 CON. The pitch comes from below and breaks upward — the opposite of everything they expect.", origin: "McGinnity's signature pitch 'Old Sal' — a rising curveball thrown sidearm/submarine. Combined with his overhand sinker, batters faced two radically different deliveries from the same pitcher." },
    { title: "The Mentor's Gift", type: "Action", text: "Your veteran pitcher takes a struggling young pitcher under his wing. He teaches him a new pitch, shows him how to scout hitters, and saves his career. The young pitcher gains +2 STF and +1 CTL permanently. Your veteran gains +3 legacy.", origin: "McGinnity taught Mathewson the sinker, showed him scouting methods, and modeled pacing. Previous Giants management had tried to convert Mathewson to first base. McGinnity saved the greatest pitching career in NL history." },
    { title: "The Iron Foundry", type: "Action", text: "Your pitcher spends the offseason working in an industrial foundry, pouring molten iron. He arrives at spring training with arms of steel. +1 STA permanently. Other pitchers who skip offseason conditioning lose 1 STA.", origin: "McGinnity worked in iron foundries every offseason. He personally poured iron for Birmingham's Vulcan statue in 1904. The nickname 'Iron Man' came from the foundry, not (originally) from his pitching." },
    { title: "Fourteen Straight", type: "Game Action", text: "Your pitcher opens the season with a 14-game winning streak. The team clinches the pennant with 16 games remaining. Your pitcher finishes 35-8 with a 1.61 ERA. He leads the league in wins, ERA, shutouts, saves, and innings. For this season, he is untouchable.", origin: "1904: McGinnity opened with a 14-game winning streak and finished 35-8, 1.61 ERA, 408 IP, 9 SHO, 5 SV. The Giants clinched with 16 games left. One of the greatest pitching seasons ever." },
    { title: "Pitched Until Fifty-Four", type: "Drama", text: "Your aging pitcher refuses to retire. He buys a minor league team and keeps pitching — 40, 45, 50, 54 years old. His professional win total reaches nearly 500. The game cannot make him stop. Only death can.", origin: "McGinnity pitched professionally until 1925 at age 54. Including minors, he won approximately 478 games. He managed and owned teams too. Baseball was not his job — it was his oxygen." },
    { title: "The Ninth Inning", type: "Drama", text: "Your aging legend faces career-ending surgery. As he enters the operating room, he jokes: 'It's the ninth inning, and I guess they're going to get me out.' He gains the 'Final Pitch' trait — +3 CLU for one last performance. Then the iron man rests.", origin: "1929: Diagnosed with bladder cancer, McGinnity joked before surgery: 'It's the ninth inning, and I guess they're going to get me out.' He died November 14, 1929, at 58." },
    { title: "Two Motions, One Arm", type: "Game Action", text: "Your pitcher alternates between submarine and overhand delivery within the same game. Batters cannot time either. All opposing hitters face -1 CON for the entire game. McGraw theorized this is why his arm lasted so long.", origin: "McGinnity threw 'Old Sal' (submarine rising curve) and a sinker (overhand). McGraw: 'The use of two radically different pitching motions may have lessened the strain on his arm and contributed to making him so durable.'" },
  ],

  art_direction: {
    face: "Big, powerful, Irish-American working man. 5'11\" 206 lbs — one of the biggest men in the majors at the time. Broad shoulders, thick arms forged in an iron foundry. Strong jaw, determined eyes, the face of a man who pours molten metal by winter and pitches 400 innings by summer. Not elegant like Mathewson — rugged, industrial, relentless.",
    attire: "New York Giants uniform circa 1904 — white wool jersey with 'NY' interlocking monogram, baggy flannel pants, flat cap. Mid-delivery from the submarine angle — arm coming up from below, the unorthodox motion that baffled dead-ball hitters. Or: the overhand windup for the sinker, showing the dual-motion style. No number.",
    mood: "Relentless power. Not serene like Mathewson — grinding, implacable, the look of a man in his 51st game of the season who's about to pitch his 38th complete game. Sweat on the brow, iron in the eyes. The Polo Grounds behind him, late afternoon, the shadows lengthening on a doubleheader day.",
    style: "Sepia-toned with darker, smokier, more industrial undertones than other Banners cards — McGinnity is forge-fire where Mathewson is moonlight. Iron-brown and furnace-orange highlights. The card should feel like it was pulled from a foundry floor, still warm. Dead-ball era grit at maximum.",
    reference: "Think the submarine delivery — arm sweeping upward from below the knees, ball released at an impossible angle. Or: the muscular frame on the mound, massive shoulders, cap pulled low, ready to pitch his second complete game of the day. The card that embodies endurance itself.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
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

export default function JoeMcGinnityCard() {
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
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR IP", val: d.real_stats.career_ip },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 10 MLB SEASONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4, background: `${C.coldBlue}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.coldBlue}30` }}>
              {[{ label: "1905 WS IP", val: d.real_stats.ws_1905_ip },{ label: "1905 WS ERA", val: d.real_stats.ws_1905_era }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.coldBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1905 WORLD SERIES — CHAMPIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1905 WS Champ", "👑 5× NL Wins Leader", "⭐ HOF 1946", "🔥 35-8, 1.61 ERA (1904)", "💎 3 DH Sweeps in 1 Month", "🎖️ 0.00 WS ERA", "📜 ~478 Pro Wins", "⚙️ Iron Foundry"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McGinnity's real life, become universal cards playable in any game.</p>
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
                <Section title="⚾ Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use a modified stat engine: STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="McGinnity's Derivation">
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
