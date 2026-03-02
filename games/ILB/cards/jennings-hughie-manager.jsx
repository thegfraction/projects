import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// ILB MANAGER CARD: HUGHIE JENNINGS
// Era: 1910 · Archetype: Authoritarian
// "Ee-Yah!" — Coal Miner, Lawyer, Showman, Survivor
// ═══════════════════════════════════════════════════════════════

const MANAGER_DATA = {
  name: "Hughie Jennings",
  nickname: "Ee-Yah",
  year: 1907,
  team: "Detroit Tigers",
  era: "1910s",
  ilb_team: "Gloves",
  archetype: "Authoritarian",
  born: "April 2, 1869 — Pittston, PA",
  died: "February 1, 1928 — Scranton, PA (age 58)",
  hof: "Inducted 1945 (Veterans Committee). As player AND manager. Connie Mack named him one of the three greatest managers in history.",
  height: '5\'8"',
  weight: "165 lbs",

  record: {
    career_wins: 1184,
    career_losses: 995,
    win_pct: ".543",
    pennants: 3,
    world_series: 0,
    seasons_managed: 14,
    ejections: "Multiple — suspended for taunting opponents with a tin whistle (1907)",
    peak_team: "1907-1909 Detroit Tigers",
    peak_record: "3 consecutive AL pennants (1907, 1908, 1909)",
    first_division: "10 first-division finishes in 14 seasons",
    notable: "Managed Ty Cobb for 14 years. 'Ee-Yah!' battle cry adopted by U.S. Marines in WWI. Cornell Law School graduate. Coal breaker boy at age 12. HBP record: 287 career, 51 in single season (1896). Nervous breakdown in 1925.",
    key_players_managed: ["Ty Cobb", "Sam Crawford", "Harry Heilmann", "Hooks Dauss", "Donie Bush", "Bobby Veach"],
    playing_career: ".311 career BA, 3 NL pennants with Baltimore Orioles (1894-96). Hit .401 in 1896.",
  },

  ilb_ratings: {
    tac: 4,  // Bill James identified Jennings as one of the first to platoon players (1907 WS catchers). Used rubber snakes and jack-in-boxes against Rube Waddell. Creative, unorthodox.
    pit: 3,  // Solid but not elite. Managed good pitching staffs but drew criticism for pitcher handling. No major pitching innovations.
    lin: 3,  // Adequate. Let Cobb hit wherever Cobb wanted. The lineup was built around one generational talent.
    adp: 3,  // Won 3 straight pennants then never won another in 11 years. Couldn't adapt when the roster aged. But managed the unmanageable Cobb for 14 years.

    dis: 8,  // High but unusual. Jennings enforced HIS authority — but made an exception for Cobb. "Do what you think is best and I'll back you up." A selective authoritarian.
    ego: 7,  // Managed Ty Cobb — the most difficult player in history — for 14 years. That alone is an achievement. But the favoritism toward Cobb caused team discord.
    har: 5,  // Mixed. His cheerful energy was infectious, but his Cobb favoritism created friction. "His favoritism toward Cobb was a frequent cause of discord on the club."
    int: 9,  // Near-maximum. The "Ee-Yah!" shouts, grass-plucking, jigs, whistles, rubber snakes. Constant kinetic energy. His war cry was adopted by the Marines.
    str: 6,  // Good strategist. 10 first-division finishes in 14 seasons. But never won a World Series despite 3 chances. Lost to the Cubs twice and the Pirates once.
    flx: 5,  // Moderate. Adapted from 1890s Orioles brawler to 1900s AL manager. But after the early pennants, couldn't find a new formula. Cornell law degree shows intellectual flexibility.

    ovr: 9,  // Elite tier. 3 straight pennants, .543 win%, managed Cobb, Connie Mack rated him top-3 all time. But 0 World Series wins holds him back.
  },

  rating_justification: {
    tac: "Creative and unorthodox. Bill James identified Jennings as one of the first to platoon players, beginning with catchers in the 1907 World Series. Used rubber snakes and jack-in-the-boxes to distract Rube Waddell. Brought dogs into the dugout to throw Waddell off. Suspended for using a tin whistle as a noisemaker. Innovative, theatrical, effective — but not a systematic tactician. Rating of 4.",
    pit: "Managed decent pitching staffs — Hooks Dauss, Ed Summers, George Mullin. But 'his handling of pitchers sometimes drew criticism.' Lost 3 World Series partly because opposing pitching (Cubs, Pirates) was better managed. Competent, not elite. Rating of 3.",
    lin: "The lineup was Ty Cobb, and then everyone else. Jennings told Cobb: 'Do what you think is best and I'll back you up.' When your best player sets his own rules, lineup construction is reactive, not proactive. Had Sam Crawford, Harry Heilmann, Bobby Veach — good hitters arranged around the Cobb orbit. Rating of 3.",
    adp: "Won 3 straight pennants (1907-09) but never won another in 11 more years. The Tigers finished second twice but mostly drifted. Jennings couldn't rebuild or reinvent after the early magic faded. However, managing Ty Cobb for 14 years without being murdered is its own form of adaptation. Rating of 3.",
    dis: "Selective authoritarianism. Jennings enforced discipline on the rest of the team while giving Cobb complete freedom. 'There isn't anything about baseball I can teach you. Do as you please.' This worked for Cobb (12 batting titles) but caused resentment from teammates who were held to different standards. A brilliant but uneven disciplinarian. Rating of 8.",
    ego: "Managing Ty Cobb for 14 years may be the greatest ego-management feat in baseball history. Cobb was violent, paranoid, racist, brilliant, and uncontrollable. Jennings's solution: let Cobb be Cobb, support him publicly, and manage everyone else around him. It worked — until it didn't. The 1912 player strike (Cobb assaulted a fan, was suspended, and the entire team walked out in solidarity) showed the limits. Rating of 7.",
    har: "Mixed. Jennings's cheerful energy and 'Ee-Yah!' enthusiasm were infectious — umpire Tim Hurst called his smile 'the grin that echoed.' But 'his favoritism toward Cobb was a frequent cause of discord on the club.' Harmony was high in the coaching box and low in the clubhouse. Rating of 5.",
    int: "Near-maximum. The most theatrically intense manager of his era. 'Ee-Yah!' shouts, grass-plucking, one-legged jigs, tin whistles, rubber snakes, dogs in the dugout. His war cry was adopted by U.S. Marines in WWI — they went into battle shouting 'Ee-yah-yip!' Not volcanic anger like McGraw or Tebeau — pure kinetic enthusiasm. Rating of 9.",
    str: "Good. 10 first-division finishes in 14 seasons with Detroit. But 0-3 in World Series (lost to Cubs twice, Pirates once). The strategic ceiling was clear — he could build a contender but couldn't overcome elite competition. Part of this was talent (the Cubs had Tinker-Evers-Chance), not management. Rating of 6.",
    flx: "Moderate. Adapted from 1890s Orioles brawler (hit by pitch 287 times, played dirty) to dignified but colorful AL manager. Got a Cornell law degree while playing. But his late Detroit years showed stagnation — same approach, diminishing returns. The nervous breakdown in 1925 suggests the strain was cumulative. Rating of 5.",
  },

  personality: {
    leadership_style: "Enthusiastic authoritarian with a star exception. Jennings ran the team with high energy and firm expectations — except for Cobb, who was given total freedom. This 'dual standard' system worked brilliantly for the star but created resentment among role players. He led through infectious enthusiasm, not fear. The 'Ee-Yah!' wasn't intimidation — it was joy. But joy with an iron fist underneath.",
    temperament: "Ebullient and theatrical on the surface, damaged underneath. 'A boyish, infectious smile on his freckled, red-headed Irish face.' Umpire Tim Hurst called it 'the grin that echoed.' But this was a man who worked in coal breakers at 12, was hit by pitches 287 times, suffered brain damage from an Amos Rusie fastball to the temple, dove into an empty swimming pool, and had a nervous breakdown in 1925. The cheerfulness was real — and it was also armor.",
    work_ethic: "Ferocious. Went from coal breaker boy at 12 to Cornell Law School. Passed the bar exam while managing a baseball team. Practiced law in the offseason while managing the Tigers. 'Behind the antics was a great coaching mind.' — SABR. The showmanship was surface; the preparation was obsessive.",
    lifestyle: "Coal country origins. 9th of 12 children in a miner's family in Pittston, PA. Dropped out of school at 12 to work as a breaker boy for 90 cents a day. Attended St. Bonaventure with McGraw. Got into Cornell Law School. Passed the Maryland bar. Practiced law in Scranton during offseasons. Irish Catholic. The most improbable intellectual in baseball — a coal miner's son with a law degree who managed baseball's most volatile player.",
    communication_style: "Theatrical and constant. The 'Ee-Yah!' was communication — encouragement, energy, psychological warfare. He invented 'Attaboy' ('That's the boy'). But his most important communication was private — telling Cobb 'do as you please and I'll back you up.' Publicly: showman. Privately: strategic diplomat.",
    loyalty_expectations: "Deep personal loyalty, tested by Cobb. In 1912, when Cobb assaulted a fan and was suspended, the entire Tigers team went on strike in solidarity. Jennings had to field a team of amateurs (lost 24-2). He stood by Cobb through everything — and Cobb's teammates eventually followed. But the loyalty was strained by the double standard.",
    dark_side: "The breakdown. After leaving Detroit, Jennings served as a coach under McGraw with the Giants. In 1925, he suffered a nervous breakdown that ended his baseball career. He died in 1928 at 58. The brain damage from Rusie's fastball in 1897, the empty pool dive, the 287 hit-by-pitches, 14 years of managing Cobb — it all accumulated. In ILB: Jennings carries 'The Toll' — his intensity is magnificent but it breaks him eventually.",
  },

  playbook: {
    roster_philosophy: "Build around a generational talent and keep everyone else in line. Jennings's approach was pragmatic: if you have Ty Cobb, you let Cobb be Cobb and construct the rest of the team to support him. Sam Crawford was the veteran anchor, the pitching staff was reliable, and the role players knew their place. The system was Cobb-centric — which meant it was brilliant when Cobb was great and helpless when Cobb wasn't enough.",
    conflict_response: "ABSORB. Jennings didn't suppress conflict like McGraw or escalate it like Tebeau — he absorbed it. When Cobb assaulted a fan, Jennings absorbed the fallout. When the team went on strike, Jennings absorbed the embarrassment. When the favoritism caused resentment, Jennings absorbed the complaints with his infectious smile. The shock absorber between Cobb and the world.",
    clique_strategy: "TOLERATE — ONE STAR EXCEPTION. The team had one untouchable (Cobb) and everyone else. This created a natural two-tier system: Cobb's tier and everyone else's tier. Jennings tolerated this because Cobb was worth it. But the resentment was real and chronic.",
    player_types_that_thrive: [
      "Generational talents who need freedom — Jennings won't cage a genius",
      "Cheerful, energetic players who feed off the manager's enthusiasm",
      "Tough, hard-nosed players from working-class backgrounds — coal country mentality",
      "Players willing to accept a secondary role behind a dominant star",
      "Psychologically resilient players — this clubhouse has turbulence",
    ],
    player_types_that_struggle: [
      "Players who demand equal treatment — Cobb gets different rules",
      "Sensitive personalities who can't handle the Cobb-adjacent chaos",
      "Stars who need to be THE star — there's only room for one Cobb",
      "Players who need tactical structure — the system revolves around one player, not a plan",
      "Players who need calm — Jennings's energy is constant and sometimes exhausting",
    ],
    tolerance_thresholds: {
      max_ego_cluster: 2,
      max_volatility: "HIGH for the star, MODERATE for everyone else",
      discipline_floor: "HIGH for role players, NONE for the star. Dual standard is the system.",
      star_exception: "Absolute. One player gets total freedom. Everyone else gets firm discipline. This is the Jennings Paradox.",
    },
  },

  chemistry_impact: {
    team_fit: { effect: "POLARIZED", desc: "Jennings creates a two-tier system. +2 Team Fit if the team has exactly ONE star (OVR 10+). -1 Team Fit if the team has 2+ stars competing for the spotlight." },
    volatility: { effect: "INCREASED FOR STAR", desc: "The star player gains +2 Volatility (more extreme performances). All other players gain -1 Volatility (stabilized by the manager's enthusiasm)." },
    discipline: { effect: "SPLIT", desc: "Star player: -3 Discipline (total freedom). All other players: +2 Discipline. The dual standard is the operating system." },
    ego: { effect: "ABSORBED", desc: "Jennings absorbs ego conflicts rather than resolving them. Ego penalties are reduced by 1 across the board. But if the star leaves, +3 Ego for all remaining players (the lid comes off)." },
    work_habits: { effect: "INCREASED", desc: "Jennings's coal-miner work ethic and constant energy inspire effort. +1 Work Habits for all players. The man never stopped working — neither can you." },
    adaptability: { effect: "MODERATE", desc: "Jennings adapted from 1890s brawler to 1910s manager. +1 Adaptability for players transitioning between eras or roles." },
  },

  chemistry_traits: [
    { tag: "Ee-Yah!", desc: "Jennings's war cry echoes through the stadium. +1 Intensity for all players on offense. Opposing pitchers have a 10% chance of 'Rattled' status from the constant noise." },
    { tag: "The Cobb Whisperer", desc: "Jennings managed Ty Cobb for 14 years. If your team has a player with Ego > 8 and OVR > 10, that player gains +2 to their highest stat. Everyone else loses -1 Harmony." },
    { tag: "Coal Breaker Boy", desc: "Jennings worked the mines at 12. Players from working-class or tough backgrounds gain +1 Contact and +1 Clutch under Jennings. Grit recognizes grit." },
    { tag: "Cornell Law", desc: "Jennings is the smartest manager in the room — literally a lawyer. +1 to all tactical decisions involving rules disputes. Jennings knows the rulebook better than the umpires." },
    { tag: "Tin Whistle", desc: "Jennings was suspended for using a tin whistle in the coaching box. Once per game, Jennings can use a 'Noisemaker' to distract the opposing pitcher: -1 Control for one at-bat." },
    { tag: "The Grin That Echoed", desc: "Jennings's smile was infectious. +1 morale for all players after any victory. The joy is real — even when the wins stop coming." },
    { tag: "Rubber Snakes", desc: "Jennings used rubber snakes and jack-in-the-boxes to distract Rube Waddell. Once per series, Jennings can reduce an opposing player's highest stat by 1 for one game through psychological warfare." },
    { tag: "The Toll", desc: "287 hit-by-pitches. Brain damage. Empty pool dive. Nervous breakdown. After 20 games, all of Jennings's bonuses are reduced by 1. The body and mind have limits." },
  ],

  preferred_locations: [
    { location: "Third Base Coaching Box", affinity: "HIGH", note: "Jennings's stage. The 'Ee-Yah!' shouts, grass-plucking, one-legged jigs. Where he performed his greatest role." },
    { location: "Home Ballpark / Bennett Park", affinity: "HIGH", note: "Detroit fans shouted 'Ee-Yah!' when Jennings appeared. The crowd was part of the show." },
    { location: "Law Office / Courtroom", affinity: "HIGH", note: "Practiced law in Scranton during offseasons. Cornell Law. The coal miner's son who became a lawyer." },
    { location: "Coal Country / Pittston, PA", affinity: "MEDIUM", note: "9th of 12 children. Breaker boy at 12. The roots that made him indestructible — until they didn't." },
    { location: "Church / St. Bonaventure", affinity: "MEDIUM", note: "Attended St. Bonaventure with McGraw. Irish Catholic. Faith and friendship forged in school." },
    { location: "Hospital / Sanatorium", affinity: "LOW", note: "Brain damage from Rusie's pitch. Nervous breakdown in 1925. The places where the toll was paid." },
    { location: "Opponent's Dugout", affinity: "LOW", note: "Jennings taunted from the coaching box, not face-to-face. His warfare was theatrical, not physical." },
  ],

  momentum: {
    hot_triggers: [
      "New challenge / fresh start — took a last-place team to 3 straight pennants in year one",
      "Generational talent emerging — Cobb's arrival energized everything Jennings did",
      "Crowd energy — Jennings fed off the fans and the fans fed off him",
      "Rivalry games — the theatrical warfare was at its best against strong opponents",
    ],
    cold_triggers: [
      "World Series losses — 0-3 in the Fall Classic broke something in the team's confidence",
      "Aging roster — after 1909, the magic faded and Jennings couldn't find it again",
      "Internal discord from Cobb favoritism — the dual standard eroded trust over time",
      "Physical/mental toll — the accumulation of injuries and stress led to breakdown",
    ],
    pressure_response: "MAGNIFICENT IN THE REGULAR SEASON, DISAPPOINTING IN OCTOBER. Three straight pennants — that's extraordinary regular-season pressure management. But 0-3 in World Series (0-12 in WS games over 3 years) suggests the theatrical intensity didn't translate to the ultimate stage. In ILB: Jennings provides +2 Intensity during regular-season play, but -1 Clutch in championship games. His teams peak too early. The show is amazing; the finale falls flat.",
  },

  action_card_seeds: [
    {
      title: "Ee-Yah!",
      type: "Game Action",
      text: "Your manager erupts from the coaching box with his trademark war cry. All offensive players gain +1 Contact this game. Opposing pitcher has 15% chance of 'Rattled' (-1 Control). But there's a 10% chance the umpire ejects your manager for excessive noise.",
      origin: "Jennings's 'Ee-Yah!' became so famous that Detroit fans shouted it in unison, U.S. Marines adopted it as a battle cry in WWI, and it was parodied in vaudeville. He was suspended for using a tin whistle variation in 1907.",
    },
    {
      title: "Let Cobb Be Cobb",
      type: "Action",
      text: "Your manager gives your best player total freedom. Choose your highest-OVR player — they gain +2 to their highest stat permanently. But all other players lose -1 Harmony. 'Do what you think is best and I'll back you up.'",
      origin: "Jennings told Ty Cobb: 'There isn't anything about baseball I can teach you. Do as you please. Use your own judgment. I'll back you up.' Cobb won 12 batting titles in 13 years under Jennings.",
    },
    {
      title: "The Rubber Snake Gambit",
      type: "Game Action",
      text: "Your manager deploys psychological warfare against an opposing star. Choose one opposing player — they lose -2 to their highest stat for this game. 'Hey, Rube, look at this!'",
      origin: "Jennings bought rubber snakes and jack-in-the-boxes to distract the eccentric Rube Waddell. He even brought dogs into the dugout because Waddell loved animals. (It didn't always work — Waddell won 7-1 with the dogs present.)",
    },
    {
      title: "The Player Strike",
      type: "Drama",
      text: "Your star player assaults an opponent/fan and is suspended. The rest of your team goes on strike in solidarity. You must field a team of amateurs for one game (all stats become 3). If you survive, +3 Team Fit permanently. The gang sticks together.",
      origin: "In 1912, Cobb attacked a fan in the stands who had been heckling him. When Cobb was suspended, the entire Tigers team went on strike. Jennings had to field amateurs and lost to the A's 24-2.",
    },
    {
      title: "Breaker Boy to Pennant",
      type: "Action",
      text: "Your manager's working-class roots inspire the team. All players with 'Grit' or 'Working-Class' traits gain +1 to their lowest stat permanently. The man who broke coal at 12 doesn't break under pressure.",
      origin: "Jennings was the 9th of 12 children in a coal mining family. He was a breaker boy at age 12, earning 90 cents a day. He went from the mines to Cornell Law School to the Hall of Fame.",
    },
    {
      title: "The Nervous Breakdown",
      type: "Drama",
      text: "After years of intensity, your manager's health collapses. He is removed from the game for 3 games. When he returns, all Intensity bonuses are permanently reduced by 2. But all players gain +1 Loyalty — they saw what this cost him.",
      origin: "In 1925, while coaching under McGraw with the Giants, Jennings suffered a nervous breakdown. 287 hit-by-pitches, brain damage from Rusie's fastball, a dive into an empty pool, and 14 years of managing Cobb had taken their toll.",
    },
    {
      title: "Three Pennants and No Crown",
      type: "Drama",
      text: "Your team wins 3 consecutive pennants but loses the championship each time. After the 3rd loss, all players lose -1 Clutch permanently. But +2 Intensity — the hunger to finally win becomes unbearable.",
      origin: "Jennings's Tigers won the AL pennant in 1907, 1908, and 1909. They lost the World Series each time — to the Cubs (twice) and the Pirates. They never returned to the Fall Classic under Jennings.",
    },
  ],

  art_direction: {
    face: "Red-headed Irish face with freckles and an infectious, boyish grin. 5'8\" 165 lbs — compact and wiry. The face is open, joyful, alive — umpire Tim Hurst called it 'the grin that echoed.' But look closer: there are scars, the signs of 287 hit-by-pitches, and something haunted behind the bright eyes. A man who smiled to survive.",
    attire: "Detroit Tigers uniform, 1907 era. In the iconic coaching box pose: arms spread wide, fists balled, right leg raised high, mouth open mid-'Ee-Yah!' Grass stains on the knees from plucking grass bare. Possibly holding a tin whistle or rubber snake in one hand. Pure kinetic energy frozen in a portrait.",
    mood: "Exuberant intensity. The card should radiate energy — you should almost hear the 'Ee-Yah!' when you look at it. But there should be a shadow behind the brightness. The toll is visible if you look for it. Joy and damage coexisting in one frame.",
    style: "Warm sepia with bright orange-red highlights — the Authoritarian palette shifted toward Jennings's fiery hair and energetic personality. Bennett Park in Detroit suggested in the background, with a crowd visible, mouths open shouting 'Ee-Yah!' Border should feel dynamic — slightly tilted, as if vibrating with energy. Tiger stripe motifs in the corner details.",
    reference: "Where McGraw's authoritarian card is Napoleon — cold, absolute power — Jennings's authoritarian card is a carnival barker who happens to be a genius. The energy is the authority. The card should feel like a firecracker: bright, loud, thrilling, and slightly dangerous. A T206 card that's been through a championship parade and a coal mine.",
  },
};

const RATING_ENGINE = { overall: { tiers: [
  { range: "3-4", label: "Filler" }, { range: "5-6", label: "Solid Skipper" },
  { range: "7-8", label: "Contender" }, { range: "9-10", label: "Elite" },
  { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" },
]}};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14",
  archRed: "#e05555", archDark: "#8a2a2a",
  hotRed: "#c44040", coldBlue: "#4a7a9a", traitGreen: "#5a8a5a",
  archetypes: {
    Authoritarian: "#e05555", "Players' Manager": "#55b877",
    Firebrand: "#e8a030", "Tactical Purist": "#5588cc", Opportunist: "#b070cc",
  },
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ width: 32, fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 12, background: `${C.sepia}30`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 18, fontSize: 11, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "center" }}>{value}</span>
  </div>
);
const ClubhouseBar = ({ label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
    <span style={{ width: 60, fontSize: 9, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{label}</span>
    <div style={{ flex: 1, height: 8, background: `${C.sepia}20`, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / 10) * 100}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
    <span style={{ width: 14, fontSize: 9, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace" }}>{value}</span>
  </div>
);
const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);
const ChemTag = ({ tag }) => (
  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: `${C.archRed}15`, border: `1px solid ${C.archRed}30`, color: C.archRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</span>
);

export default function HughieJenningsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("playbook");
  const d = MANAGER_DATA;
  const r = d.ilb_ratings;
  const archColor = C.archetypes[d.archetype] || C.archRed;

  const tabs = [
    { id: "playbook", label: "Playbook" }, { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Rating Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Manager Card — {d.ilb_team} Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${archColor}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Playbook ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${archColor}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #2a1a0a 0%, #4a2a1a 100%)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 80, opacity: 0.15 }}>📣</div>
                <div style={{ fontSize: 9, color: `${C.cream}40`, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, textTransform: "uppercase" }}>Portrait Pending</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {r.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${archColor}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>AUTHORITARIAN</div>
              <div style={{ position: "absolute", bottom: 50, left: 12, background: `${C.ink}aa`, color: C.gold, padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.era}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", marginTop: 6, letterSpacing: 3, fontWeight: 900 }}>◆ MANAGER ◆</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Game Management</div>
              <StatBar label="TAC" value={r.tac} max={5} color={archColor} />
              <StatBar label="PIT" value={r.pit} max={5} color={C.gold} />
              <StatBar label="LIN" value={r.lin} max={5} color={C.coldBlue} />
              <StatBar label="ADP" value={r.adp} max={5} color={C.traitGreen} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 6, textTransform: "uppercase" }}>Clubhouse Management</div>
              <ClubhouseBar label="DISCPLN" value={r.dis} color={archColor} />
              <ClubhouseBar label="EGO MGT" value={r.ego} color={C.warmRed} />
              <ClubhouseBar label="HARMONY" value={r.har} color={C.traitGreen} />
              <ClubhouseBar label="INTSITY" value={r.int} color={"#e8a030"} />
              <ClubhouseBar label="STRATGY" value={r.str} color={C.coldBlue} />
              <ClubhouseBar label="FLEXBTY" value={r.flx} color={"#b070cc"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[
                { label: "W-L", val: `${d.record.career_wins}-${d.record.career_losses}` },
                { label: "PCT", val: d.record.win_pct },
                { label: "PENNANTS", val: d.record.pennants },
                { label: "WS WINS", val: "0" },
                { label: "SEASONS", val: d.record.seasons_managed },
                { label: "1ST DIV", val: d.record.first_division.split(" ")[0] },
                { label: "HBP REC", val: "287" },
                { label: "PLAY BA", val: ".311" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER MANAGERIAL RECORD — {d.record.seasons_managed} SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 3 AL Pennants", "⭐ HOF 1945", "📣 Ee-Yah!", "🐯 Managed Ty Cobb", "⚖️ Cornell Law", "⛏️ Coal Breaker Boy", "🎖️ Marines War Cry", "💥 287 HBP Record"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${archColor}15`, border: `1px solid ${archColor}30`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: archColor, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 900 }}>CLASSIFIED PLAYBOOK — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "playbook" && (<>
                <Section title="Roster Philosophy"><p style={{ margin: 0, color: C.medBrown }}>{d.playbook.roster_philosophy}</p></Section>
                <Section title="Conflict Response"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.conflict_response.split(".")[0]}.</span> {d.playbook.conflict_response.split(".").slice(1).join(".")}</p></Section>
                <Section title="Clique Strategy"><p style={{ margin: 0 }}><span style={{ fontWeight: 900, color: archColor }}>{d.playbook.clique_strategy.split(".")[0]}.</span> {d.playbook.clique_strategy.split(".").slice(1).join(".")}</p></Section>
                <Section title="✅ Players Who Thrive">{d.playbook.player_types_that_thrive.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.traitGreen, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="⚠ Players Who Struggle">{d.playbook.player_types_that_struggle.map((p, i) => (<div key={i} style={{ padding: "3px 0", color: C.warmRed, fontSize: 11 }}>▸ {p}</div>))}</Section>
                <Section title="Tolerance Thresholds">{Object.entries(d.playbook.tolerance_thresholds).map(([key, val]) => (<div key={key} style={{ marginBottom: 4 }}><span style={{ fontWeight: 700, color: C.ink, fontSize: 10, textTransform: "uppercase" }}>{key.replace(/_/g, " ")}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{typeof val === "number" ? val : val}</span></div>))}</Section>
              </>)}
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Impact">{Object.entries(d.chemistry_impact).map(([key, { effect, desc }]) => (<div key={key} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 10, color: C.ink }}>{key.replace(/_/g, " ")}</span><span style={{ fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 2, background: effect.includes("INCREASED") || effect.includes("HIGH") ? `${C.traitGreen}20` : effect.includes("SPLIT") || effect.includes("POLARIZED") ? `${C.gold}20` : `${C.warmRed}20`, color: effect.includes("INCREASED") || effect.includes("HIGH") ? C.traitGreen : effect.includes("SPLIT") || effect.includes("POLARIZED") ? C.medBrown : C.warmRed, fontFamily: "'Courier Prime', monospace" }}>{effect}</span></div><p style={{ margin: "2px 0 0 0", fontSize: 11, color: C.medBrown }}>{desc}</p></div>))}</Section>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: archColor }}>{t.tag}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{t.desc}</span></div>))}</Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Manager Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Jennings's real life, become universal cards playable in any game.</p>
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
                <Section title="🎩 Manager Rating Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Managers use a dual rating system: Game Management (1-5) and Clubhouse Management (1-10).</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11, marginBottom: 4 }}>Overall Tier Scale</div>
                    {RATING_ENGINE.overall.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.label}</div>))}
                  </div>
                </Section>
                <Section title="Jennings's Derivation">{Object.entries(d.rating_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB MGR #{d.ilb_team}</span>
          <span>{d.era} • {d.archetype} • OVR {r.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, era: d.era,
  ilb_team: d.ilb_team, archetype: d.archetype,
  game_mgmt: { tac: r.tac, pit: r.pit, lin: r.lin, adp: r.adp },
  clubhouse: { dis: r.dis, ego: r.ego, har: r.har, int: r.int, str: r.str, flx: r.flx },
  ovr: r.ovr,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
  key_players: d.record.key_players_managed,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
