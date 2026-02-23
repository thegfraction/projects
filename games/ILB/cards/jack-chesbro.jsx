import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}chesbro-jack.png`;

const PLAYER_DATA = {
  name: "Jack Chesbro",
  nickname: "Happy Jack",
  year: 1904,
  team: "New York Highlanders",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'9"',
  weight: "180 lbs",
  born: "June 5, 1874 — North Adams, MA",
  died: "November 6, 1931 — Conway, MA (age 57)",
  hof: "Inducted 1946 (Veterans Committee). Controversial — some historians consider the election based solely on 1904. Bill James: undeserving. The debate: one transcendent season vs. a good-not-great career. 198-132, 2.68 ERA.",

  real_stats: {
    season: 1904, games: 55, wins: 41, losses: 12, era: "1.82",
    innings: "454.2", strikeouts: 239, walks: 88, complete_games: 48,
    shutouts: 6, whip: "1.058", saves: 0, war: 11.6,
    era_plus: 148, games_started: 51,
    win_streak: 14,
    career_wins: 198, career_losses: 132, career_era: "2.68",
    career_strikeouts: 1265, career_cg: 260, career_shutouts: 35,
    career_war: 38.3, career_ip: "2896.2", career_era_plus: 109,
  },

  ilb_stats: {
    ovr: 10,     // Elite/Ace — 41-12, 1.82 ERA, 454.2 IP. Modern-era records for W, CG, GS, IP. The spitball season. The unbreakable record. But also: the wild pitch that lost the pennant. And a career that some say doesn't deserve the HOF without 1904.
    stf: 4,      // 1.82 ERA → tier 4 (1.50-1.99). ERA+ 148. The spitball: "I can make the spitball drop two inches or a foot and a half." Devastating movement. K/9 ~4.7 (no K bonus). Not a power pitcher — a deception pitcher. Tinker: one of the six toughest he faced. Rating: 4.
    ctl: 3,      // BB/9 ~1.74 → tier 3 (1.5-1.99). WHIP 1.058 (no ≤1.00 bonus). Griffith: "When a pitcher has it under perfect control, no batter can hit it successfully." But the fatal wild pitch on the last day of the season — the spitball that got away — haunts the control rating. The spitter was unhittable when commanded and disastrous when not. Rating: 3.
    sta: 5,      // 454.2 IP → tier 5 (350+). MAXIMUM. 48 CG in 51 starts. 55 total appearances. The most innings pitched by any AL pitcher in the modern era. McGinnity-level workhorse. 329 IP/year average across his prime (1901-06). The arm eventually gave out from the load. Rating: 5.
    def: 1,      // No notable defensive reputation. Rating: 1.
    clu: 1,      // The wild pitch defines him. Oct 10, 1904: 9th inning, tie game, pennant on the line — the spitball sailed high, the runner scored from third, the Highlanders lost the pennant. The most famous wild pitch in baseball history. Despite 41 wins, the last pitch is what everyone remembers. 2× NL pennant winner with Pittsburgh (1901-02, no WS). PS record nonexistent. Rating: 1.
  },

  stat_justification: {
    stf: "1.82 ERA in 1904 → tier 4 (1.50-1.99). ERA+ 148. The weapon: the spitball, learned from Elmer Stricklett. Chesbro: 'I can make the spitball drop two inches or a foot and a half.' Over the last 30 games: 'I pitched spitballs entirely. I didn't pitch a half-dozen balls that weren't spitballs.' Griffith: 'When a pitcher has it under perfect control, no batter can hit it successfully, and if he does line one out, it will be purely accidental.' K/9 ~4.7 (no K bonus). He didn't overpower hitters — he made the ball unhittable through movement. Rating: 4.",
    ctl: "BB/9 ~1.74 → tier 3 (1.5-1.99). WHIP 1.058 (no ≤1.00 bonus). The spitball required precise wrist action and timing — when Chesbro had it, the pitch was unhittable. When he didn't, it could sail anywhere. The wild pitch on October 10, 1904 — the pennant-losing spitball that sailed over the catcher's head — is the permanent asterisk on his control. Rating: 3.",
    sta: "454.2 IP in 1904 → tier 5 (350+). MAXIMUM. This is the most innings pitched by any AL pitcher in the modern era. 48 CG in 51 starts. 55 total appearances. He averaged 329 IP per year from 1901-1906 — 1,979 IP in six years. The price: his arm was never the same after 1904. The workhorse who worked himself to death. Rating: 5.",
    def: "No notable defensive reputation. Rating: 1.",
    clu: "The wild pitch. October 10, 1904. Top of the 9th inning. Score tied 2-2. Pennant on the line. Lou Criger on third base. The spitball sailed high. The run scored. The Highlanders lost the pennant by 1.5 games. Chesbro won 41 games that season — and the only pitch anyone remembers is the one that got away. He said before the game: 'I'll pitch and I'll win. I'll trim 'em Monday if it costs an arm.' It cost more than an arm. 2× NL pennant with Pittsburgh (1901-02) gives a slight bump from 0 to 1. Rating: 1.",
  },

  personality: {
    leadership_style: "The willing ace. Chesbro didn't just accept the workload — he demanded it. He started 51 games in 1904 because he wanted to. He told Griffith before the final game: 'I'll pitch and I'll win.' He was the first great pitcher of the Highlanders/Yankees franchise, and he carried the team on his arm until the arm broke. Leadership through accumulation — every start, every inning, every spitball.",
    temperament: "'Happy Jack.' The nickname said it all — Chesbro had a pleasant disposition in an era of hard men. He wasn't fiery like Jennings or combative like McGraw. He was cheerful, reliable, and devastating. The smile hid the spitball. The pleasant demeanor masked the most loaded pitch in baseball. He was the friendly assassin.",
    work_ethic: "EXTREME. 454.2 IP in one season. 48 CG in 51 starts. 329 IP per year over six years. He coached Harvard in the offseason while maintaining his pitching regimen. The workload was staggering by any standard — and it destroyed him. After 1904, the arm declined rapidly. He was done by 1909 at age 35. The workhorse who ran until he couldn't.",
    lifestyle: "Massachusetts man. Born in North Adams, died in Conway. Shoemaker's son. Played semi-pro in Cooperstown (of all places) before making the majors. Married, business interests outside baseball. Held out over salary in 1907 — the happy man had his limits. Bounced through minor leagues before breaking through. A regular American who threw an extraordinary pitch.",
    era_adaptability: "THE SPITBALL PROBLEM. The spitball was banned in 1920. Without it, Chesbro's stuff would be significantly diminished — his pre-spitball career (1899-1901) showed a good-not-great pitcher. With the spitball, he was historically dominant. In a modern context, the spitball is illegal, which means Chesbro's ILB rating is based on a pitch he couldn't legally throw today. The card represents the era when the pitch was legal — and devastatingly effective.",
    clubhouse_impact: "STEADY AND POSITIVE. 'Happy Jack' was the cheerful workhorse. He didn't create drama, didn't fight with management (except the 1907 holdout), and didn't antagonize teammates. He just pitched — every four days, sometimes every three, occasionally back-to-back relief and start. In ILB: +1 team morale from disposition, +1 from reliability. The ace who smiles.",
    dark_side: "The wild pitch and the decline. One pitch erased 41 wins. The spitball that sailed in the 9th inning of the final game of 1904 cost the Highlanders the pennant and defined Chesbro's legacy forever. Without it, he's remembered as the greatest single-season pitcher in modern history. With it, he's 'the wild pitch guy.' And then the decline: the arm gave out from 1,979 IP in six years. 19-15 in 1905. 23-17 in 1906. Fading by 1907. Done by 1909. The 1904 season consumed him — the greatest season and the wild pitch and the arm that never recovered. Bill James calls his HOF induction a mistake. The one-season wonder debate follows him to this day.",
  },

  chemistry_traits: [
    { tag: "The Spitball", desc: "Chesbro's primary weapon — a pitch that drops two inches or a foot and a half. All batters face -2 CON when the spitball is working. 10% chance per inning the spitball goes wild (passed ball or wild pitch)." },
    { tag: "Forty-One Wins", desc: "The modern-era record. Unbreakable under current playing practices. When Chesbro reaches his 30th win in a season, he gains +1 STF and +1 STA for the remainder of the year. The chase fuels him." },
    { tag: "The Wild Pitch", desc: "October 10, 1904. The spitball that sailed. In any pennant-deciding game, there is a 15% chance Chesbro throws a wild pitch at the worst possible moment. The record and the heartbreak are inseparable." },
    { tag: "Happy Jack", desc: "Pleasant disposition. +1 team morale. No negative chemistry events from Chesbro — he doesn't fight, doesn't hold out (usually), doesn't antagonize. The smiling assassin." },
    { tag: "Workhorse's Price", desc: "454 IP in 1904. 329 IP/year for six years. After any season exceeding 350 IP, Chesbro loses -1 STF permanently. The arm has a shelf life. Use him wisely." },
    { tag: "First Highlander", desc: "Pitched the first game in Highlanders/Yankees franchise history. +2 franchise legacy. The foundation of an empire." },
    { tag: "The One-Season Debate", desc: "Bill James: 'elected solely on the basis of his 1904 season.' If Chesbro's OVR is calculated using career stats instead of peak, it drops by 2. The debate over his greatness is part of his card." },
    { tag: "Spitballs Entirely", desc: "'Over the last 30 games I pitched spitballs entirely.' When Chesbro commits to the spitball, +1 STF for 30 consecutive appearances. But the wildness risk doubles." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "454.2 IP. 48 CG. The mound was his office and he never left it. He completed 48 of 51 starts because leaving was not in his vocabulary." },
    { location: "New York / Hilltop Park", affinity: "HIGH", note: "The first great pitcher in Highlanders/Yankees history. Hilltop Park in upper Manhattan — where the franchise began." },
    { location: "Pittsburgh", affinity: "MEDIUM", note: "21 wins and a pennant in 1901. 28 wins and a pennant in 1902. Pittsburgh is where he became great; New York is where he became legend." },
    { location: "Massachusetts", affinity: "MEDIUM", note: "Born in North Adams. Died in Conway. The Massachusetts man who built New York baseball." },
    { location: "Cooperstown", affinity: "MEDIUM", note: "Played semi-pro there before making the majors. Later inducted into the HOF. Cooperstown bookends his career." },
    { location: "October / Final Day", affinity: "LOW", note: "October 10, 1904. The wild pitch. The pennant lost. October is where the dream died." },
  ],

  momentum: {
    hot_triggers: [
      "Win streaks — 14 consecutive wins in 1904. When rolling, he's untouchable. The spitball locks in.",
      "Workhorse mode — every 3-4 days, 9 innings, complete games. The rhythm of constant pitching fueled him.",
      "New York crowds — the Hilltop Park fans energized him. 9,000 on the final day, all believing.",
      "Spitball command — when the wrist action is perfect, the pitch drops off a table. Unhittable.",
    ],
    cold_triggers: [
      "Arm fatigue — after 400+ IP, the stuff degrades. The last month of 1904 was a man running on fumes.",
      "The wild pitch memory — any pennant-deciding situation triggers the 1904 flashback. -1 CTL in elimination games.",
      "Overuse aftermath — 1905: 19-15. 1906: 23-17, led league in earned runs. The body remembers every inning.",
      "Spitball wildness — 10% of the time, the spitball doesn't break. It sails. When it sails, bad things happen.",
    ],
    pressure_response: "TRAGICALLY MIXED. On one hand: 41 wins, 14 consecutive wins, 2× NL pennant. Chesbro was a winner — he carried the Highlanders to within 1.5 games of the pennant almost single-handedly. On the other hand: THE WILD PITCH. In the biggest moment of his career — 9th inning, tie game, pennant on the line — the spitball sailed. One pitch erased 41 wins. In ILB: Chesbro is the high-ceiling, devastating-floor pitcher. He can win you 41 games. He can also lose you the pennant on one pitch.",
  },

  action_card_seeds: [
    { title: "Forty-One Wins", type: "Game Action", text: "Your pitcher wins his 41st game of the season — a modern-era record that will never be broken. 454 innings. 48 complete games. 51 starts. No other pitcher in the league won more than 26. The record stands for over a century. This card permanently increases your pitcher's STA by 1 and adds 'Unbreakable Record' to his legacy.", origin: "1904: Chesbro went 41-12 with a 1.82 ERA in 454.2 IP. The 41 wins remain the AL modern-era record. No pitcher has won 30 since Denny McLain in 1968. The record is considered literally unbreakable." },
    { title: "The Wild Pitch", type: "Drama", text: "Final day of the season. Top of the 9th. Tie game. Pennant on the line. Your ace — the 41-game winner — winds up and throws his signature pitch. It sails. Over the catcher's head. The runner scores from third. The pennant is lost. 41 wins, erased by one spitball. -5 legacy. +5 tragedy. The greatest season in modern history ends on the worst pitch.", origin: "October 10, 1904: Chesbro's wild pitch (a spitball that sailed) allowed Lou Criger to score from third, giving Boston the winning run and the AL pennant. The Highlanders lost by 1.5 games." },
    { title: "I'll Pitch and I'll Win", type: "Game Action", text: "Your ace declares before the biggest game of the season: 'I'll pitch and I'll win. I'll trim 'em if it costs an arm.' He takes the mound with 40 wins and absolute confidence. +2 STF, +2 CLU for this game only. But if he loses, -3 legacy. The promise is the weapon and the trap.", origin: "Chesbro before Game 1 of the final doubleheader: 'I'll pitch and I'll win. I'll trim 'em Monday if it costs an arm.' He lost 3-2 on the wild pitch." },
    { title: "The Spitball Mastery", type: "Game Action", text: "Your pitcher learns the spitball from its inventor. He masters it over 30 games. 'I can make the spitball drop two inches or a foot and a half.' For the next 30 appearances, +2 STF. But: 10% wild pitch chance per inning. The spitter is the greatest pitch ever discovered — and the most dangerous.", origin: "Chesbro learned the spitball from Elmer Stricklett in spring 1904. After a 4-3 start without it, he committed to the spitter and reeled off 14 straight wins." },
    { title: "Fourteen Straight", type: "Game Action", text: "Your pitcher wins 14 consecutive games. From mid-May through the Fourth of July, he is unbeatable: 1.40 ERA, .463 opposing OPS. The streak becomes the franchise record. +3 team momentum. +2 pitcher confidence.", origin: "May 14 - July 4, 1904: Chesbro won 14 consecutive games, a franchise record that stood until Roger Clemens won 15 in a row in 2001." },
    { title: "The First Game", type: "Origin", text: "Your pitcher throws the first game in franchise history. The team is new, the ballpark is new, the league is new. He loses the first game — but he is the foundation. Every win that follows is built on this start. +2 franchise legacy.", origin: "April 22, 1903: Chesbro pitched the first game in Highlanders (Yankees) franchise history. He lost, but became their first 20-game winner that season." },
    { title: "The Arm Gives Out", type: "Drama", text: "After 1,979 innings in six seasons, your pitcher's arm finally breaks down. He goes from 41 wins to 19 wins. Then 23 wins but league-leading earned runs. Then retirement. The workhorse ran until he couldn't run anymore. -2 STF permanently per season after 400+ IP. The body keeps score.", origin: "After 1904 (454 IP), Chesbro was 19-15 in 1905, 23-17 in 1906, and faded rapidly. He retired in 1909 at 35. The 1,979 IP from 1901-06 destroyed his arm." },
    { title: "The One-Season Case", type: "Drama", text: "Your retired pitcher is elected to the Hall of Fame. Critics immediately call it a mistake — they say he was elected solely for one season. His career numbers (198-132, 2.68) match pitchers who never got a vote. The debate becomes his second legacy: not just the wild pitch, but the question of whether one transcendent season is enough. It haunts.", origin: "Chesbro was inducted in 1946. Bill James considers it a mistake, comparing Chesbro's career to non-HOF pitchers Phillippe, Leever, and Tannehill with similar numbers." },
  ],

  art_direction: {
    face: "Broad-shouldered, solid, pleasant-faced Massachusetts man. 5'9\" 180 lbs — compact and powerful. Sandy complexion. The face should match the nickname: 'Happy Jack' — there should be a warmth and approachability, a half-smile or easy expression. Not fierce like Jennings or brooding like Tinker. The friendly man who threw the unfriendly pitch.",
    attire: "New York Highlanders uniform circa 1904 — white wool jersey with 'NY' interlocking insignia (the proto-Yankees uniform), baggy flannel pants, flat cap. Mid-delivery — the spitball release, the wrist flicking moisture across the ball's surface. Or: the moment before the pitch in the 9th inning of October 10, 1904 — wind-up, Hilltop Park behind him, the pennant hanging in the balance. No number.",
    mood: "Bittersweet triumph. The card should feel like 41 wins AND the wild pitch simultaneously — the greatest season in modern history and the worst pitch. The Hilltop Park behind him, early October light, the crowd leaning forward. Chesbro's card is the card of a man who did everything right except the last thing.",
    style: "Sepia-toned with a slightly COOLER, more autumnal palette than other Banners cards — October colors. Where Lange is golden summer and Jennings is furnace heat, Chesbro is LATE OCTOBER. The card should feel like the final day of the season: beautiful but ending. Falling light. The sense that something magnificent is about to slip away. Dead-ball era grain.",
    reference: "Think the spitball delivery at the release point — the wrist flick, the ball leaving the hand with moisture on it, the moment before the drop. Or: the full wind-up, arm cocked, Hilltop Park in the background, the 41st win or the wild pitch about to happen. The card captures the duality: the record and the heartbreak, inseparable.",
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

export default function JackChesbroCard() {
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
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.hotRed}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>41 WINS — UNBREAKABLE RECORD</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ background: `${C.hotRed}10`, border: `1px solid ${C.hotRed}40`, borderRadius: 4, padding: 6, marginBottom: 12, textAlign: "center" }}>
              <span style={{ fontSize: 10, color: C.hotRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>⚠ CLU 1 — THE WILD PITCH (OCT 10, 1904) HAUNTS THIS CARD</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "ERA+", val: d.real_stats.era_plus },{ label: "K", val: d.real_stats.strikeouts },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "GS", val: d.real_stats.games_started },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} — MODERN-ERA RECORDS: W / CG / GS / IP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "ERA+", val: d.real_stats.career_era_plus },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR IP", val: d.real_stats.career_ip },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS — 11 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🔥 41 Wins (Unbreakable Record)", "⭐ HOF 1946", "💧 Spitball Master", "📜 48 CG in 51 Starts", "⚡ 14-Game Win Streak", "🏟️ First Highlander Pitcher", "💔 The Wild Pitch", "⚠️ HOF Debate"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Chesbro's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="⚾ Pitcher Stat Engine">
                  {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                      {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                      {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                    </div>
                  ))}
                </Section>
                <Section title="Chesbro's Derivation">
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
    </div>
  );
}
