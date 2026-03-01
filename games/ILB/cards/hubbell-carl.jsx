import { useState } from "react";

const HUBBELL_DATA = {
  name: "Carl Hubbell",
  nickname: "King Carl / The Meal Ticket",
  year: 1933,
  team: "New York Giants",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "SP",
  bats: "R",
  throws: "L",
  height: "6'0\"",
  weight: "170 lbs",
  born: "June 22, 1903 — Carthage, Missouri (grew up on farms near Meeker, Oklahoma; one of seven children, five baseball-playing brothers)",
  died: "November 21, 1988 — Scottsdale, Arizona (age 85, after car accident; buried in Meeker, OK)",
  hof: "Inducted 1947 (BBWAA, 87.0%). 2× NL MVP (1933, 1936). 9× All-Star. 253-154 career (.622). 2.98 career ERA. 1933 WS champion. #11 retired by Giants. 5× consecutive 20-win seasons (1933-37). 24 consecutive wins (MLB record). AP Athlete of the Year 1936.",

  real_stats: {
    season: 1933, games: 45, wins: 23, losses: 12,
    era: "1.66", innings: "308.2", complete_games: 22,
    shutouts: 10, strikeouts: 156, walks: 47, hits_allowed: 256,
    whip: "0.982", era_plus: 193, war: 9.0, saves: 5,
    career_wins: 253, career_losses: 154, career_era: "2.98",
    career_k: 1677, career_war: 65.2,
    scoreless_innings_streak: "45.1 (NL record until 1968)",
  },

  ilb_stats: {
    ovr: 12,     // Legend — 2× MVP. 253-154 (.622). 2.98 ERA. 65.2 WAR. 9× All-Star. 5 consecutive 20-win seasons. 24-game win streak (MLB record). 1933 WS champion (2 CG wins). 1934 ASG: 5 consecutive HOF K's. 18-inning shutout. NL's dominant pitcher 1933-37. The NL equivalent of Lefty Grove.
    stf: 4,      // The screwball — one of the most unhittable pitches in baseball history. 1.66 ERA, 193 ERA+, 0.982 WHIP in 1933. 156 K in 308.2 IP. Not a power pitcher (low K rate vs. Grove), but the screwball's movement was devastating. 5 consecutive HOF K's on screwballs alone. STF 4.
    ctl: 3,      // 47 BB in 308.2 IP (1.4 BB/9) in 1933. 0.982 WHIP. Career 1.82 BB/9. Waite Hoyt: "The source of his skill is his matchless control." He threw knotholes-in-a-barn-door strikes from childhood. Pinpoint control with multiple pitches. CTL 3.
    sta: 4,      // 308.2 IP in 1933. 22 CG. 10 SHO. Pitched an 18-inning complete game shutout (July 2, 1933 vs. Cardinals). 45.1 consecutive scoreless innings. 5 consecutive 20-win seasons. The Meal Ticket — he pitched whenever the Giants needed him. STA 4.
    def: 0,      // No particular defensive reputation. Standard pitcher fielding. DEF 0.
    clu: 3,      // 1933 WS: 2 CG wins including 11-inning 2-1 win in Game 4 (only earned run was unearned). 4-2, 1.79 ERA in 6 career WS starts. 1934 ASG: 5 consecutive HOF K's. 24 consecutive wins (1936-37). He was the ultimate big-game pitcher. CLU 3.
  },
  
  stat_justification: {
    stf: "1.66 ERA, 193 ERA+, 0.982 WHIP in 1933. The screwball — a reverse curve that broke toward lefties and away from righties — was the most devastating pitch in the NL. In the 1934 ASG, he struck out 5 consecutive HOF hitters (Ruth, Gehrig, Foxx, Simmons, Cronin) on screwballs alone. 156 K in 308.2 IP isn't a huge K rate, but the screwball induced weak contact and groundballs. Bob Broeg: 'Awkwardly angular, gaunt, Lincolnesque.' The pitch, not the velocity. Rating of 4.",
    ctl: "47 BB in 308.2 IP = 1.4 BB/9 in 1933. Career 1.82 BB/9. 0.982 WHIP in 1933 (microscopic). Waite Hoyt: 'The source of his skill is his matchless control in using his curveball to set up his screwball. Emotions, if he has any, never affect him.' As a boy, he practiced throwing stones at barn door knotholes until he could hit ones 'no bigger than a dime.' Rating of 3.",
    sta: "308.2 IP in 1933. 22 CG. 10 SHO. Pitched an 18-inning CG shutout vs. the Cardinals (July 2, 1933 — he later called it the greatest game he ever pitched). 45.1 consecutive scoreless innings (NL record until Drysdale 1968). Led NL in IP and CG multiple times. 5 consecutive 20-win seasons. 'The Meal Ticket' — he was called this because the Giants counted on him for every big game. In 1934, he led NL in CG (25) and saves (8) the same year. Rating of 4.",
    def: "No particular fielding reputation. Standard pitcher defense. Rating of 0.",
    clu: "1933 WS: 2 CG wins — Game 1 (4-2) and Game 4 (11 innings, 2-1, the only Giants run came in the 11th). 4-2 with a 1.79 ERA in 6 career WS starts. 1934 ASG: 5 consecutive HOF K's — the most iconic single pitching performance in ASG history. 24 consecutive wins (1936-37, MLB record). He was at his absolute best when the stakes were highest. Rating of 3 — the maximum.",
  },

  personality: {
    leadership_style: "The Silent Ace. Hubbell led by example — by pitching 18 innings of shutout ball, by winning 24 straight, by striking out five Hall of Famers on screwballs they'd never seen. He didn't give speeches. He didn't demand attention. Waite Hoyt: 'Emotions, if he has any, never affect him.' He was the most un-emotional great pitcher in baseball history — a farm boy from Oklahoma who threw a pitch that bent the wrong way and bent his arm permanently.",
    temperament: "Stoic, calm, almost eerily composed. Hubbell showed no emotion on the mound — ever. He was described as 'Lincolnesque' in appearance and demeanor. Tall, gaunt, angular, with 'no hips, less derriere, and the longest shinbones in captivity.' He practiced throwing stones at barn door knotholes as a child until he could hit dime-sized targets. The precision became his personality. Nothing rattled him.",
    work_ethic: "Farm boy discipline. Grew up on Oklahoma farms. Five baseball-playing brothers. Father was a catcher for a local team. Carl learned the screwball from his brothers and refined it through years of practice. When the Tigers forbade him from throwing it, he went to the minors and nearly quit baseball. When McGraw freed him to throw it, he became the best pitcher in the NL. The lesson: trust the work.",
    lifestyle: "Simple, quiet, lifelong Giant. Married Lucille 'Sue' Harrington in 1930 — she died in 1967. Two children. After retiring in 1943, Giants owner Horace Stoneham immediately made him director of player development — he held the post for 35 years. He moved to New Jersey but stayed with the Giants through their move to San Francisco. He was on the Giants' payroll for the rest of his life. He died in 1988 in Scottsdale, Arizona, after a car accident — the same manner as his former teammates Mel Ott (1958) and Frankie Frisch (1973).",
    era_adaptability: "HIGH. The screwball (modern equivalent: the circle changeup) would devastate modern hitters just as it did in the 1930s. His elite control (1.4 BB/9) would play in any era. His ability to pitch 300+ innings would be limited by modern usage patterns, but his stuff and command would make him a Cy Young contender. Think a left-handed version of Greg Maddux — movement, control, and deception over velocity.",
    clubhouse_impact: "MASSIVE QUIET CONFIDENCE. The Meal Ticket. The team knew: when Hubbell pitched, they could win. He was the stopper, the ace, the security blanket. His calmness was contagious. He never panicked, so the team never panicked. He pitched 18 innings of shutout ball against the Cardinals and the team followed his lead. His very presence on the mound changed the psychology of the game.",
    dark_side: "The deformed arm. Years of throwing the screwball — which requires the wrist to snap inward unnaturally — permanently twisted Hubbell's left arm. His palm faced outward instead of inward when his arm hung at his side. The arm that made him King Carl also marked him for life. A SABR researcher (Warren Corbett) argued the deformity may have been pre-existing or caused by bone structure rather than the screwball itself, but the image persists: the man who bent his arm to bend the ball. Also: his post-1937 decline was steep — from 22-8 to 11-9 to 11-12. The arm gave everything and then had nothing left.",
  },

  chemistry_traits: [
    { tag: "The Screwball", desc: "Hubbell's signature pitch — a reverse curve that breaks toward lefties and away from righties. +2 STF vs. RHH (the pitch breaks away from them). Unfamiliar batters have 30% chance of automatic K on first encounter. The pitch nobody could prepare for." },
    { tag: "Five Consecutive Hall of Famers", desc: "Once per career in All-Star/exhibition play: Hubbell can strike out 5 consecutive HOF-caliber hitters. Ruth, Gehrig, Foxx, Simmons, Cronin — in order. The most iconic single pitching performance in ASG history." },
    { tag: "The Meal Ticket", desc: "+1 team morale when Hubbell starts. The team knows they can win. He pitched whenever the Giants needed a win — the stopper, the ace, the security blanket. In must-win games: +1 STF and +1 CTL." },
    { tag: "The Deformed Arm", desc: "Starting year 10, the screwball begins to take its toll. 15% chance per season of permanent -1 STF. His palm turns outward permanently. The price of the pitch that made him king." },
    { tag: "24 Consecutive Wins", desc: "If Hubbell wins 15+ in a row, he enters 'Streak Mode': +1 STF/CTL until the streak ends. MLB record 24 consecutive wins (1936-37). When he's rolling, he's untouchable." },
    { tag: "18-Inning Shutout", desc: "Once per season, in a critical game: 5% chance Hubbell pitches a CG shutout of 15+ innings. Based on July 2, 1933 — 18 IP, 0 ER vs. the Cardinals. 'The greatest game I ever pitched.'" },
    { tag: "The Knothole Thrower", desc: "As a boy, practiced throwing stones at barn door knotholes 'no bigger than a dime.' +1 CTL permanently. The control was built before baseball — it was built on an Oklahoma farm." },
    { tag: "McGraw's Faith", desc: "Ty Cobb forbade the screwball. McGraw freed it. When paired with a manager who trusts unconventional methods: +1 to all stats. When paired with a conservative manager: -1 STF (forbidden from throwing best pitch)." },
  ],

  preferred_locations: [
    { location: "Polo Grounds / New York", affinity: "HIGH", note: "16 seasons. 253 wins. Home field for the 1934 ASG. #11 retired. On Giants payroll for life." },
    { location: "Pitcher's Mound", affinity: "HIGH", note: "253-154. 2.98 ERA. 1.82 BB/9. The screwball. The control. The composure." },
    { location: "All-Star Game", affinity: "HIGH", note: "9× All-Star. 5 consecutive HOF K's in 1934. Threw out first pitch at 1984 ASG (screwball, naturally)." },
    { location: "World Series", affinity: "HIGH", note: "4-2, 1.79 ERA in 6 WS starts. 2 CG wins in 1933 WS. 11-inning CG win in Game 4." },
    { location: "Oklahoma Farm / Meeker", affinity: "HIGH", note: "Grew up here. Five baseball-playing brothers. Practiced on barn doors. Town sign: 'Home of Carl Hubbell.'" },
    { location: "Giants Front Office", affinity: "HIGH", note: "Director of player development for 35 years (1943-78). On payroll for rest of his life." },
    { location: "Detroit Tigers Organization", affinity: "LOW", note: "Cobb forbade the screwball. Tigers sold him to the minors. 'The best thing that ever happened to me.'" },
  ],

  momentum: {
    hot_triggers: [
      "The screwball — when it's working, nobody can touch it. RHH are helpless.",
      "Win streaks — 24 consecutive wins. Once he starts rolling, the momentum compounds.",
      "Big games — WS, ASG, pennant races. Hubbell elevated when stakes were highest.",
      "Control days — 47 BB in 308.2 IP. When the control is sharp, he's unhittable.",
    ],
    cold_triggers: [
      "Arm fatigue — after 300+ IP seasons, the arm starts to give. The screwball exacts its price.",
      "Forbidden from throwing the screwball — without it, he's a mediocre pitcher (went 7-7 in minors without it).",
      "Post-1937 decline — from 22-8 to 11-9 to 11-12. The arm had given everything.",
      "Grief/distraction — wife Lucille's death in 1967 was devastating.",
    ],
    pressure_response: "THE ULTIMATE BIG-GAME PITCHER. 1933 WS: 2 CG wins including an 11-inning masterpiece. 4-2, 1.79 ERA in 6 career WS starts. 1934 ASG: struck out Ruth, Gehrig, Foxx, Simmons, Cronin consecutively — the single most iconic pitching performance in exhibition history. July 2, 1933: 18-inning CG shutout vs. the Cardinals in a pennant race. 45.1 consecutive scoreless innings. 24 consecutive wins. When the game was biggest, Hubbell was biggest. The Meal Ticket earned every meal.",
  },

  action_card_seeds: [
    {
      title: "Five Consecutive Hall of Famers",
      type: "Game Action",
      text: "The All-Star Game. Your home park. Two runners on, nobody out in the first inning. The three most feared hitters in baseball are coming up. Your pitcher throws screwball after screwball. Ruth: strikeout. Gehrig: strikeout. Foxx: strikeout. Into the second inning. Simmons: strikeout. Cronin: strikeout. Five Hall of Famers. Five screwballs. Five strikeouts. The park shakes on its foundations.",
      origin: "1934 ASG at the Polo Grounds: Hubbell struck out Ruth, Gehrig, Foxx, Simmons, and Cronin consecutively on screwballs. Dickey singled to break the streak.",
    },
    {
      title: "The 18-Inning Shutout",
      type: "Game Action",
      text: "First game of a doubleheader. Pennant race. Your pitcher faces the hardest-hitting team in the league. He pitches 18 innings. He allows zero earned runs. He wins 1-0 on a walk-off single by the shortstop. He calls it the greatest game he ever pitched. The trainer immediately works on his arm with liniments to keep it from stiffening.",
      origin: "July 2, 1933: Hubbell pitched an 18-inning CG shutout vs. the Cardinals. Won 1-0. He later called it the greatest game he ever pitched.",
    },
    {
      title: "Twenty-Four Consecutive Wins",
      type: "Game Action",
      text: "Your pitcher wins 16 straight to end the season. Then wins 8 straight to start the next. Twenty-four consecutive wins — a major league record. Every fifth day, the team knows they will win. He is the Meal Ticket. He is King Carl.",
      origin: "1936-37: Hubbell won 24 consecutive decisions (16 to close 1936, 8 to open 1937). MLB record.",
    },
    {
      title: "The Screwball — and the Price",
      type: "Drama",
      text: "Your pitcher has the most devastating pitch in baseball. It breaks the wrong way — away from righties, into lefties. Nobody can hit it. But every throw twists his wrist inward, against nature. Over the years, his arm deforms. His palm turns outward when he hangs his arm at his side. The pitch that made him king also marked him for life.",
      origin: "Years of throwing the screwball permanently deformed Hubbell's left arm. His palm faced outward instead of inward at rest.",
    },
    {
      title: "The Knothole and the Barn Door",
      type: "Action",
      text: "A farm boy in Oklahoma practices for hours, throwing stones at a barn door. His target: the knotholes. He throws until he can hit ones no bigger than a dime. Years later, he throws a baseball with the same precision — 47 walks in 308 innings, a WHIP under 1.000. The control was built before baseball.",
      origin: "Time magazine: Hubbell 'practiced for hours throwing stones at a barn door until he could unfailingly hit knotholes no bigger than a dime.'",
    },
    {
      title: "Cobb Said No — McGraw Said Yes",
      type: "Drama",
      text: "Your pitcher has a devastating pitch. The team's star player bans it — 'It'll ruin your arm.' The team releases him. He goes to the minors, mediocre without his pitch. He's about to quit baseball. Then a scout sees him. A different manager says yes. Christy Mathewson threw the same pitch. Come throw it for us. He wins 253 games.",
      origin: "Ty Cobb (as Tigers manager) forbade Hubbell from throwing the screwball. Detroit released him. McGraw, noting Mathewson threw a similar pitch, signed him. Hubbell: 'Being unloaded by the Tigers was the best thing that ever happened to me.'",
    },
    {
      title: "The 1933 World Series — Game 4",
      type: "Game Action",
      text: "Game 4 of the World Series. Your pitcher goes 11 innings. He allows 1 run — and it's unearned. He wins 2-1. The Giants take a 3-1 series lead and win the championship the next day. This is the game that makes the Meal Ticket.",
      origin: "1933 WS Game 4: Hubbell pitched 11 innings, allowing 1 unearned run. Giants won 2-1. They won the series in 5 games.",
    },
    {
      title: "On the Payroll for Life",
      type: "Action",
      text: "Your pitcher retires. The owner doesn't let him leave. He becomes director of player development — for 35 years. He moves with the franchise across the country. He's still on the payroll when he dies. One team. One lifetime. One screwball.",
      origin: "Hubbell retired 1943. Stoneham immediately made him farm director — he held the post 35 years. On Giants payroll for life until death in 1988.",
    },
  ],

  art_direction: {
    face: "Tall, gaunt, angular, Lincolnesque. 6'0\" 170 lbs — all sinew and bone. Bob Broeg: 'Awkwardly angular, lean-visaged, almost Lincolnesque, with no hips, less derriere, and the longest shinbones in captivity.' The face should show utter calm — the face of a man who just struck out Babe Ruth and felt nothing.",
    attire: "New York Giants 1933 home whites. #11. The Polo Grounds' distinctive horseshoe behind him. The left arm should be subtly different — the palm turned slightly outward, the permanent mark of the screwball. The windup should be mid-delivery: the long body uncoiling, the left arm about to snap inward.",
    mood: "The Screwball. Frozen at the release point — the wrist snapping inward, the ball about to break the wrong way. Or: the calm after striking out Ruth, Gehrig, and Foxx — no celebration, no emotion, just the walk back to the rubber for Simmons. The card should feel impossibly calm for something so devastating.",
    style: "Polo Grounds grandeur meets Oklahoma farmland simplicity. The card should feel split: the New York sophistication of the Giants franchise on one side, the Oklahoma barn-door precision on the other. Warm golds and deep blues. The screwball's arc traced across the card like a signature.",
    reference: "The card of the man who bent his arm to bend the ball. King Carl. The Meal Ticket. 253 wins, a deformed arm, and the five most famous strikeouts in baseball history. The silent ace of the New York Giants — on the payroll from 1928 until he died in 1988. Sixty years. One pitch.",
  },
};

const STAT_ENGINE = {
  stuff: { metric: "K rate + ERA + pitch quality", tiers: [{ range: "Below avg K, high ERA", value: 0 },{ range: "Avg K rate, decent ERA", value: 1 },{ range: "Good K rate or elite ERA", value: 2 },{ range: "High K rate + low ERA", value: 3 },{ range: "Dominant K + elite ERA", value: 4 },{ range: "Historic dominance", value: 5 }] },
  control: { metric: "BB/9 + WHIP", tiers: [{ range: "BB/9 > 4.0", value: 0 },{ range: "BB/9 3.0-4.0", value: 1 },{ range: "BB/9 2.0-3.0", value: 2 },{ range: "BB/9 < 2.0", value: 3 }] },
  stamina: { metric: "IP + CG + durability", tiers: [{ range: "< 150 IP or reliever", value: 0 },{ range: "150-199 IP", value: 1 },{ range: "200-249 IP", value: 2 },{ range: "250-299 IP", value: 3 },{ range: "300+ IP", value: 4 }] },
  overall: { formula: "STF×2 + CTL×2 + STA×1 + DEF×1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / Ace" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS/ASG hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function CarlHubbellCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HUBBELL_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Gaunt, Lincolnesque, mid-delivery, LH screwball release, Giants whites #11, Polo Grounds, wrist snapping inward]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.warmRed} />
              <StatBar label="CTL" value={s.ctl} max={3} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={4} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "SHO", val: d.real_stats.shutouts },{ label: "K", val: d.real_stats.strikeouts },{ label: "ERA+", val: d.real_stats.era_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1933 — 1.66 ERA / 10 SHO / 0.982 WHIP — NL MVP & WS CHAMPION</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛 HOF 1947 (87%)", "🏆 1933 WS Champion", "👑 2× NL MVP", "⭐ 9× All-Star", "🔥 24 Consecutive Wins", "💣 5 HOF K's (1934 ASG)", "📊 253-154 Career"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Hubbell's real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Pitcher Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}</div>))}</Section><Section title="Hubbell's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
