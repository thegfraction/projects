import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}beaumont-ginger.png`;

const PLAYER_DATA = {
  name: "Ginger Beaumont",
  nickname: "The Red-Haired Wonder",
  year: 1903,
  team: "Pittsburgh Pirates",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "CF",
  bats: "L",
  throws: "R",
  height: '5\'8"',
  weight: "190 lbs",
  born: "July 23, 1876 — Rochester, WI",
  died: "April 10, 1956 — Burlington, WI (age 79)",
  hof: "Not inducted. Wisconsin Athletic HOF 1951 (charter member). Both Bill Klem and Honus Wagner named him CF on their all-time teams. Wagner: 'He was one of the best players who ever lived.'",

  real_stats: {
    season: 1903, games: 141, at_bats: 613, hits: 209, doubles: 30,
    triples: 6, home_runs: 7, rbi: 68, runs: 137, stolen_bases: 25,
    batting_avg: ".341", obp: ".390", slg: ".434", ops: ".824",
    ops_plus: 142, war: 5.7,
    career_avg: ".311", career_hits: 1759, career_hr: 39, career_sb: 254,
    career_war: 32.4, career_obp: ".362", career_ops_plus: 119,
    ws_1903_avg: ".250", ws_1903_hits: 9, ws_1903_sb: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB POSITION PLAYER STAT CONVERSION
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 8,      // All-Star — elite leadoff hitter, 4× NL hits leader, first WS batter, .311 career. Not quite HOF but Wagner's all-time CF pick.
    con: 5,      // .341 BA → tier 5 (.330+). OPS+ 142 → ≥130 bonus (+1) = 6, capped at 5. Led NL in hits 3 straight years. Maximum contact.
    pow: 0,      // 7 HR → tier 0 (0-9). SLG .434 (no ≥.500 bonus). Some gap power (30 2B) but dead-ball singles hitter. Rating: 0.
    spd: 3,      // 25 SB → tier 2 (16-30). 254 career SB. Clocked home to first in 4.4 seconds at 190 lbs. CF with elite range = +1 bonus. Maximum: 3.
    def: 2,      // Bill Klem: 'most graceful and efficient man I've ever seen in the outfield.' Wagner named him all-time CF. Led NL CF in fielding %. Elite reputation = 2.
    clu: 1,      // .250 in 1903 WS → tier 1 (.250-.299). 9 hits, 2 SB. First batter in WS history (fly out to CF). No WS hero moment. Rating: 1.
  },

  stat_justification: {
    con: ".341 BA in 1903 → tier 5 (.330+). OPS+ 142 → ≥130 bonus (+1) = 6, capped at 5. Led NL in runs (137), hits (209), and total bases (272). Won 1902 NL batting title (.357). Led NL in hits 4× (1902-04, 1907) — first player to lead 3 consecutive years. Career .311 BA. Honus Wagner: 'He was one of the best players who ever lived.' Maximum contact.",
    pow: "7 HR in 1903 → tier 0 (0-9). SLG .434 (no bonus). 30 doubles show gap power, but only 39 career HR in 12 seasons. A dead-ball singles/doubles hitter — the prototypical leadoff man. Rating: 0.",
    spd: "25 SB in 1903 → tier 2 (16-30). 254 career SB. Clocked home to first in 4.4 seconds — remarkable for a 5'8\" 190 lb man. Sportswriter John Gruber: 'Nobody who saw him for the first time ambling along would admit this... but when he hit the ball he was off like a streak.' CF with elite range (Klem's best ever) = +1 bonus. Maximum: 3.",
    def: "Bill Klem (1939): 'The most graceful and efficient man I've ever seen in the outfield.' Honus Wagner named him CF on his all-time team. Led NL CF in fielding percentage (1902). 'He was considered by fellow ballplayers to be the best fielder in the business.' Pre-Gold Glove era, but two all-time greats (Wagner and Klem) naming him best CF = elite reputation. Rating: 2.",
    clu: ".250 BA in the 1903 WS → tier 1 (.250-.299). 9 hits, 2 SB in 8 games. First batter in World Series history — faced Cy Young on October 1, 1903, and lofted a fly ball to center. Historic but not heroic. The Pirates lost the series 5-3. No clinching moment. Rating: 1.",
  },

  personality: {
    leadership_style: "Quiet excellence. Beaumont didn't lead by charisma or intimidation — he led by showing up every day and hitting. On a team with Honus Wagner, Fred Clarke, and other stars, Beaumont earned his place as a peer through relentless consistency. He was Dreyfuss's kind of player: clean-living, devoted to youth baseball, and utterly professional.",
    temperament: "Gentle, humble, deceptively competitive. The sportswriters mocked his name — 'Clarence' — and Giants tough guys like 'Bad Bill' Dahlen and Art Devlin would shout 'Clarence, Clarence, don't dirty the seat of your pants!' in falsetto voices. But Beaumont earned their respect by hitting .341 and leading the league in runs. The bench jockeying stopped when the bat started talking.",
    work_ethic: "Pure natural ability refined through persistence. Beaumont went from Wisconsin semipro ball to the majors in less than a year. He didn't have the body of a speedster — 5'8\" 190 lbs — but he worked his legs until he was clocked at 4.4 seconds to first. He bunted, slapped, legged out infield hits. Six hits in one game, all of them singles, four of them infield hits. That's work, not luck.",
    lifestyle: "Wisconsin farm boy, clean liver. Didn't smoke or drink. Devoted free time to youth baseball in Pittsburgh. Purchased a 180-acre farm in Honey Creek, WI in 1904 and renamed it 'Centerfield Farm.' Married Norma Vaughn in 1901; raised two daughters and a son. Elected supervisor of Walworth County in 1914. Saved his money and lived comfortably in retirement. The anti-stereotype of the dissolute ballplayer.",
    era_adaptability: "STRONG for contact and defense. Beaumont's approach — high contact, elite speed, center field defense — would translate well to any era as a top-of-the-order slap hitter. Think Ichiro Suzuki's approach with less power. The .311 career average and 254 stolen bases in a dead-ball context would translate to a high-OBP, high-speed leadoff man. The power wouldn't translate at all.",
    clubhouse_impact: "STABILIZING. Clean-living, no drama, devoted to the team and to youth baseball. On a Pittsburgh team with bigger personalities (Wagner, Clarke), Beaumont was the steady presence — the man you didn't worry about. In ILB terms: +1 team chemistry simply by being on the roster. No negative traits.",
    dark_side: "The knees and the forgetting. Beaumont's knee injuries — which nagged him from 1905 onward — slowly destroyed his speed and with it his game. The former 4.4-second man could no longer leg out bunts. Pittsburgh traded him when he was 30, and by 33 he was done. Then came the longer forgetting: despite campaigns in the 1940s and 1980s, Beaumont was never inducted into the HOF. He suffered two strokes in his 70s and died in a wheelchair. Named his farm 'Centerfield Farm' because he never forgot where he belonged — even if the world forgot him.",
  },

  chemistry_traits: [
    { tag: "First Batter in WS History", desc: "Beaumont stepped to the plate against Cy Young on October 1, 1903 — the first at-bat in World Series history. +2 legacy permanently. Historic presence." },
    { tag: "Wagner's Pick", desc: "Honus Wagner named Beaumont CF on his all-time team. 'He was one of the best players who ever lived.' When endorsed by a GOAT, +1 reputation." },
    { tag: "Deceptive Speed", desc: "5'8\" 190 lbs but clocked at 4.4 seconds home to first. 'When he hit the ball he was off like a streak.' Opponents underestimate his SPD by 1 on first encounter." },
    { tag: "Klem's Best", desc: "Bill Klem: 'The most graceful and efficient man I've ever seen in the outfield.' +1 DEF when an umpire is watching (always). The eye of the game validates him." },
    { tag: "Clean Living", desc: "Didn't smoke or drink. Devoted to youth baseball. +1 team morale. No off-field incidents, ever." },
    { tag: "Centerfield Farm", desc: "Named his 180-acre Wisconsin farm 'Centerfield Farm.' After retirement, gains +2 morale on farm/rural locations. The simple life restores." },
    { tag: "Infield Hit Machine", desc: "6 hits in one game, all singles, 4 of them infield hits. When Beaumont bunts, 60% chance of reaching base. Dead-ball era genius." },
    { tag: "Bad Knees", desc: "Knee injuries from 1905 onward. After age 29, SPD decreases by 1 per season. The body that held surprising speed surrenders it." },
  ],

  preferred_locations: [
    { location: "Center Field", affinity: "HIGH", note: "Klem's best ever. Wagner's all-time pick. Named his farm after it. This is where he lives." },
    { location: "Farm / Rural", affinity: "HIGH", note: "Centerfield Farm, Honey Creek, WI. 180 acres. Walworth County supervisor. The simple life." },
    { location: "Leadoff Spot", affinity: "HIGH", note: "Considered the finest leadoff hitter of the dead-ball era. Led NL in hits 4×, runs 1×." },
    { location: "Youth Baseball Field", affinity: "HIGH", note: "Devoted free time to youth baseball in Pittsburgh. A mentor, not just a player." },
    { location: "Clubhouse / Locker Room", affinity: "MEDIUM", note: "Steady, reliable, no drama. The teammate everyone wants. Just don't call him Clarence." },
    { location: "Media / Spotlight", affinity: "LOW", note: "Humble, not a showman. 'A lazier or more indifferent-appearing player could not be conceived.' Until the bat spoke." },
    { location: "Hospital", affinity: "LOW", note: "Knee injuries, two strokes in his 70s, wheelchair-bound last years. The body failed the spirit." },
  ],

  momentum: {
    hot_triggers: [
      "Hitting streaks — led NL in hits 3 consecutive years (1902-04), the first player to do so",
      "Pennant races — played on 3 consecutive NL pennant winners (1901-03). Rose when it mattered.",
      "Multi-hit games — 6 hits in one game (July 22, 1899), including 4 infield hits. When hot, unstoppable.",
      "Playing alongside Wagner — on the same team as the greatest player alive, Beaumont held his own and sometimes outperformed him",
    ],
    cold_triggers: [
      "Knee injuries — from 1905 onward, chronic knee problems sapped his speed and batting average",
      "Bench jockeying about his name — Giants players mocking 'Clarence' could get under his skin early in his career",
      "World Series pressure — .250 in the 1903 WS, first at-bat was an out. Not a postseason hero.",
      "Trade aftermath — traded from Pittsburgh at 30, never recovered full form. The decline was swift.",
    ],
    pressure_response: "HISTORIC BUT MODEST. Beaumont was the first batter in World Series history — he stepped in against Cy Young on October 1, 1903, with 16,242 screaming fans at Huntington Avenue Grounds. He flew out to center. In the series he hit .250 with 9 hits and 2 stolen bases — solid but not dominant. The Pirates lost 5-3. Beaumont's pressure response is reliable rather than spectacular: he doesn't shrink, but he doesn't transcend. His regular-season consistency (.341 in 1903, 137 runs, 209 hits) was his true gift. In ILB: Beaumont is the steady hand, not the October hero.",
  },

  action_card_seeds: [
    { title: "The First At-Bat", type: "Game Action", text: "Your leadoff hitter steps to the plate for the very first at-bat of the very first World Series. 16,242 fans roar. He faces the greatest pitcher alive. He lifts a fly ball to center — an out, but a historic one. Your franchise gains +3 permanent legacy. The moment is eternal.", origin: "October 1, 1903: Ginger Beaumont faced Cy Young as the first batter in World Series history at Huntington Avenue Grounds. He flew out to center field. The at-bat lasted seconds. The legacy lasted forever." },
    { title: "Six Hits, All Singles", type: "Game Action", text: "Your leadoff hitter goes 6-for-6 — all singles, four of them infield hits beaten out by sheer speed. He also scores 6 runs (an NL record). The opposing infield is demoralized: there is no defense against a man who can bunt and run like this.", origin: "July 22, 1899: Beaumont went 6-for-6 against Philadelphia's Wiley Piatt, all singles, four infield hits. He scored 6 runs — still a 9-inning NL record. 'Not one ball was hit out of the infield,' he recalled." },
    { title: "Three Straight Hits Titles", type: "Action", text: "Your leadoff hitter leads the league in hits for three consecutive seasons. No one has ever done this before. He gains the 'Contact King' trait: +1 permanent CON and immunity to slumps lasting longer than 5 games.", origin: "Beaumont led the NL in hits in 1902 (193), 1903 (209), and 1904 (185) — the first player in league history to lead three consecutive years. Only five others have matched it." },
    { title: "Don't Call Me Clarence", type: "Drama", text: "Opposing bench jockeys mock your player's real name in falsetto voices. Your player is rattled for 1 game (-1 CON). But if he gets a hit that game, he gains +1 CON for the rest of the series — the bat is the best revenge.", origin: "Giants toughs like 'Bad Bill' Dahlen and Art Devlin would shout 'Clarence, Clarence, don't dirty the seat of your pants!' in falsetto. Beaumont earned their respect by outperforming them." },
    { title: "The Deceptive Body", type: "Game Action", text: "Your stocky, ambling outfielder — who looks like he couldn't outrun a milk cart — is clocked at 4.4 seconds from home to first. Opposing fielders underestimate his speed by 2 for the first 3 games of any series. By then it's too late.", origin: "Sportswriter John Gruber: 'A lazier or more indifferent-appearing player, emphasized by a burly body, could not be conceived. But when he hit the ball he was off like a streak, which astonished the uninitiated and made him one of the wonders of the century.'" },
    { title: "Centerfield Farm", type: "Drama", text: "Your retired star purchases a 180-acre farm and names it after his position. He becomes a county supervisor, raises a family, and lives a simple, happy life. +3 legacy (modest but permanent). No dark side, no tragedy — just contentment.", origin: "Beaumont purchased his Honey Creek, WI farm in 1904 and named it 'Centerfield Farm.' He was elected Walworth County supervisor in 1914. He saved his money and by all accounts was comfortably well-off." },
    { title: "Wagner's Endorsement", type: "Action", text: "The greatest player in the game selects your outfielder for his all-time team. The endorsement is shock — 'People are generally surprised' — but the GOAT knows. Your player gains +2 permanent legacy and the 'Peer of Legends' trait.", origin: "In 1937, Honus Wagner selected Beaumont as his all-time CF in Collier's magazine. 'People are generally surprised at the selection of Beaumont, but he was one of the best players who ever lived.' Every other player Wagner named is in the HOF." },
    { title: "The Wheelchair and the Plaque", type: "Drama", text: "Your aging legend suffers two strokes and is confined to a wheelchair. But in 1951, he is honored with a charter induction into his state's Athletic Hall of Fame. Two World Series teammates — now in their 80s — unveil his plaque. The recognition comes late, but it comes.", origin: "Beaumont suffered strokes in 1948 and 1950. In 1951, wheelchair-bound, he was inducted as a charter member of the Wisconsin Athletic HOF. Cy Young and Deacon Phillippe — his 1903 WS opponents/teammates — unveiled his plaque." },
  ],

  art_direction: {
    face: "Stocky, red-haired Wisconsin farm boy. 5'8\" 190 lbs — burly, compact, built like a catcher but with a leadoff hitter's eyes. Red hair (hence 'Ginger'), round friendly face, slightly ambling posture that belies explosive speed. Not imposing — approachable, quiet, deceptively athletic.",
    attire: "Pittsburgh Pirates uniform circa 1903 — white wool jersey with 'PITTSBURGH' or 'P' on the chest, baggy flannel pants, flat cap. Left-handed batting stance — the compact swing of a man who hits line drives and beats out bunts. Or: mid-stride running the bases, surprising speed from a stocky frame. No number.",
    mood: "Gentle confidence. Not fierce or intimidating — warm, steady, the look of a man who hits .341 without anyone noticing until the season's over. Huntington Avenue Grounds behind him, the first World Series crowd in soft focus. The calm before the first pitch of October.",
    style: "Sepia-toned with warm, golden, wheat-field undertones — Wisconsin farm warmth. This is the most approachable card in the Banners set. Where Mathewson is moonlight and Young is deep earth, Beaumont is autumn harvest. Comfortable. Honest. The card you'd hand to a child learning to love baseball.",
    reference: "Think the left-handed batting stance — compact, balanced, ready to slap a single through the infield. Or: the center fielder at full speed, legs churning, cap flying off, chasing down a fly ball that everyone thought was a hit. The deceptive athlete, the forgotten star, the first man to step to the plate in a World Series.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }], note: "Pre-1957: use historical defensive reputation" },
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

export default function GingerBeaumontCard() {
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR OPS+", val: d.real_stats.career_ops_plus },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "LED H", val: "4×" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 12 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚾ 1st Batter in WS History", "👑 1902 NL Batting Champ", "📜 4× NL Hits Leader", "🏃 4.4 Sec Home to 1st", "🌟 Wagner's All-Time CF", "🏆 3× NL Pennant (1901-03)"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Beaumont's real life, become universal cards playable in any game.</p>
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
                <Section title="Beaumont's Derivation">
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
