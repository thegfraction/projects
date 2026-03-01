import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}bender-chief.png`;

const PLAYER_DATA = {
  name: "Charles Bender",
  nickname: "Albert",
  year: 1910,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Muggers 1910",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'2"',
  weight: "185 lbs",
  born: "May 5, 1884 — Crow Wing County, MN (White Earth Reservation)",
  died: "May 22, 1954 — Philadelphia, PA (age 70)",
  hof: "Inducted 1953 — first Native American elected to the Baseball Hall of Fame. Connie Mack: 'If everything depended on one game, I just used Albert — the greatest money pitcher of all time.' Died before his plaque was unveiled.",

  real_stats: {
    season: 1910, games: 30, wins: 23, losses: 5, era: "1.58",
    innings: "250.0", strikeouts: 155, walks: 47, complete_games: 25,
    shutouts: 5, whip: "~0.97", ops_plus_against: "N/A", war: "~8.5",
    career_wins: 212, career_losses: 127, career_era: "2.46",
    career_strikeouts: 1712, career_cg: 255, career_shutouts: 40,
    career_war: "~40.0", no_hitters: 1, perfect_games: 0,
  },

  ilb_stats: {
    ovr: 10,     // Elite / MVP — Bender was not a workhorse ace but a precision weapon: the pitcher you threw in the biggest game of the year. 212-127 (.625), 2.46 ERA, 3× WS champ, "greatest money pitcher of all time." First Native American in HOF.
    stf: 4,      // 1.58 ERA in 1910 → tier 4 (1.50-1.99). K/9 ~5.6 in 1910 — close to but below the ≥6.0 bonus. Innovator of the slider ("nickel curve"). Ty Cobb: "the brainiest pitcher I ever saw." Not a power arm but a devastating combination of intelligence, deception, and breaking stuff. Stuff 4.
    ctl: 4,      // BB/9 ~1.7 in 1910 → tier 3 (1.5-1.99). WHIP ~0.97 in 1910 → ≤1.00 bonus → +1 = 4. "Impressive control from the start." 2.17 BB/9 as a 19-year-old rookie. Bender located with precision — the slider, the fastball, the curve all went exactly where he intended. Control 4.
    sta: 3,      // 250 IP in 1910 → tier 3 (250-299). Career max 270 IP (1903). "Plagued by poor health during several seasons." Never a 300+ IP workhorse like Plank or Johnson. Bender was effective in shorter, more intense bursts. Stamina 3.
    def: 1,      // Decent athlete (occasionally played OF/1B). But no notable mound defense. Also served as base coach to steal signs — showing baseball IQ but not fielding prowess. Defense 1.
    clu: 3,      // MAXIMUM. Connie Mack's quote defines this category. "If everything depended on one game, I just used Albert." 6-4 in WS starts. Won 5 of 7 WS starts in the 1910-13 dynasty. 3 CG in 1911 WS (tied record). 4-hit shutout in 1905 WS G2. Won 1913 WS G1 and G5 (clincher). 3× WS champion. The greatest money pitcher of all time. Clutch 3.
  },

  stat_justification: {
    stf: "1.58 ERA in 1910 → tier 4 (1.50-1.99). K/9 approximately 5.6 in 1910 (155 K in 250 IP) — close to but below the ≥6.0 bonus threshold. Bender is credited as the innovator of the slider (called the 'nickel curve' — a deceptive, late-breaking pitch distinct from conventional curves). Ty Cobb called him 'the brainiest pitcher I ever saw.' His arsenal included the slider, fastball, curve, and exceptional deception. Three times finished with ERA under 2.00 (1908: 1.75, 1909: 1.66, 1910: 1.58). Rating of 4.",
    ctl: "BB/9 approximately 1.7 in 1910 → tier 3 (1.5-1.99). WHIP approximately 0.97 in 1910 → ≤1.00 bonus → +1 = 4. 'Impressive control from the start' — walked only 2.17 per nine innings as a 19-year-old rookie. His ability to read opposing pitchers' motions and steal signs was legendary — Mack often used him as base coach on off days specifically for this skill. The intelligence extended to his own pitching: precise location, pitch sequencing, exploiting weaknesses. Rating of 4.",
    sta: "250 IP in 1910 → tier 3 (250-299). Career maximum was 270 IP (1903 rookie year). 'Plagued by poor health during several seasons.' Alcohol problems in 1912 (suspended). Never a 300+ IP workhorse — his career high was 270 IP, far below Plank's 346⅔ or Johnson's 346. Bender was effective but not durable enough for the top tiers. Three CG in a single World Series (1911) shows he could labor when it mattered, but regular-season usage was more conservative. Rating of 3.",
    def: "Bender was a versatile athlete — he occasionally played outfield and first base, and Mack used him as a base coach for his sign-stealing ability. But no notable defensive reputation from the mound itself. His crossfire-style delivery and pitching intelligence were his weapons; fielding was incidental. Rating of 1.",
    clu: "MAXIMUM — and the defining trait of his career. Connie Mack, who managed Plank, Waddell, Grove, and Pennock, said: 'If everything depended on one game, I just used Albert — the greatest money pitcher of all time. I'd tell Albert when I planned to use him in a crucial series. Then I relaxed. He never let me down.' 6-4 in World Series starts. Won 5 of 7 WS starts during the 1910-13 dynasty. Three complete games in the 1911 World Series (tied record). 4-hit shutout in 1905 WS G2 (A's only win). Won 1913 WS G5 (clincher). 3× WS champion. PS ERA estimated ~2.40-2.60 → tier 1 (2.00-4.00). WS clincher (1913 G5) → +1 = 2. But the Mack quote and the complete WS record push this to maximum 3 by reputation and accumulation. Rating of 3.",
  },

  personality: {
    leadership_style: "THE SILENT WARRIOR. Bender led by enduring. A Native American in a white sport, he faced racial slurs from crowds — war whoops, 'whooping' calls, stereotyped taunts — and responded with excellence. He did not argue. He did not confront. He pitched shutouts. He signed his autographs 'Charles Bender,' rejecting the 'Chief' nickname he considered pejorative. His leadership was in his dignity and his dominance when it mattered most.",
    temperament: "STOIC AND INTELLIGENT. Cobb called him 'the brainiest pitcher I ever saw.' He could read opposing pitchers' motions to help teammates predict pitches. He could steal signs from the coaching box. His mind was his greatest weapon. But beneath the intelligence: the silent endurance of a man navigating two worlds. Ojibwe name: Mandowescence — 'Little Spirit Animal.' The spirit was quiet but it was there.",
    work_ethic: "INNOVATIVE AND INTENSE. Bender is credited with inventing or popularizing the slider — the 'nickel curve.' He studied hitters, studied pitchers, studied the game at an intellectual level that amazed contemporaries. But he was not a grinder in the Plank sense — health problems and alcohol issues interrupted his consistency. His brilliance came in concentrated bursts of excellence rather than decade-long steadiness.",
    lifestyle: "TWO WORLDS. Born on the White Earth Reservation in Minnesota. Sent to the Lincoln Institution in Philadelphia at age 8, then to Carlisle Indian School. The assimilation pipeline: designed to 'extinguish Indian culture.' Baseball was part of that pipeline — taught at boarding schools to cultivate 'Anglo-American values.' Bender emerged as the pipeline's greatest success and its most complex tragedy. Married Marie Clements (1904, met during a Tigers road trip). No children. After baseball: coached at the Naval Academy, minor league manager, A's scout and coach. In his last years: grew corn and vegetables on a garden plot. Brought ice cream by his friend every day. Died of cancer and heart attack at 70, in Philadelphia — the city that took him from the reservation and never quite accepted him.",
    era_adaptability: "STRONG. The slider translates to every era. The intelligence translates to every era. Bender would be an elite modern pitcher — a right-hander with a devastating slider, good fastball, excellent command, and a PhD in hitter psychology. He'd be a Corey Kluber or Marcus Stroman type — not the hardest thrower but the hardest to figure out.",
    clubhouse_impact: "THE DIGNIFIED OUTSIDER. Bender was respected but always slightly apart. The only Native American on the roster. The quiet one who endured the war whoops with silence and won with pitching. His presence elevated the team's seriousness — you couldn't be frivolous around a man who carried that much dignity. +1 team focus. +1 pitching staff intelligence. -1 social integration (not his fault — the era's).",
    dark_side: "The assimilation tragedy. Bender was taken from the White Earth Reservation at 8 years old and sent through the government's Indian boarding school system — institutions designed to destroy indigenous culture. He became a Hall of Famer in a white sport and signed his name 'Charles Bender' because 'Chief' was a slur dressed as a compliment. He endured war whoops from crowds. He battled alcohol. He died before his HOF plaque was unveiled. His biographer titled the book 'Money Pitcher: Chief Bender and the Tragedy of Indian Assimilation.' The achievement was real. The cost was also real. The ILB must hold both.",
  },

  chemistry_traits: [
    { tag: "The Money Pitcher", desc: "Connie Mack's big-game weapon. When the game is a must-win, Bender gains +2 STF and +1 CTL. 'If everything depended on one game, I just used Albert.' The clutch is not a stat; it's an identity." },
    { tag: "Mandowescence", desc: "Little Spirit Animal — Bender's Ojibwe name. +1 resilience. The spirit endures what the body and the era inflict. When facing hostile crowds or racial taunts, Bender gains +1 focus instead of losing it." },
    { tag: "The Nickel Curve", desc: "Bender invented/popularized the slider. All batters face -1 CON on their first at-bat against the pitch. After facing it 3+ times, the penalty fades as they adjust — but Bender adjusts too." },
    { tag: "The Sign Stealer", desc: "Bender could read opposing pitchers' motions and relay information to teammates. When Bender is on the bench (not pitching), +1 team hitting vs. opposing starter." },
    { tag: "Plank and Bender", desc: "The A's 1-2 punch: Plank (craft/consistency) and Bender (brilliance/big games). When both are on the staff: +1 rotation depth, opponents cannot line up their best hitter against both." },
    { tag: "Two Worlds", desc: "Bender navigated between Ojibwe and Anglo-American worlds. +1 adaptability. -1 belonging. The cost of assimilation is permanent but so is the resilience it builds." },
    { tag: "Charles, Not Chief", desc: "Bender rejected the 'Chief' nickname. He signed autographs 'Charles Bender.' When the ILB uses his name respectfully, +1 dignity. The name matters." },
    { tag: "First Native American HOFer", desc: "Elected 1953 — first Native American in the Baseball Hall of Fame. +2 historical legacy. 'His remarkable athleticism and dignified behavior disproved popular notions of Native American inferiority.'" },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound (Big Games)", affinity: "HIGH", note: "The money pitcher. WS starts, pennant races, must-win games. This is where Bender becomes Bender." },
    { location: "Shibe Park / Philadelphia", affinity: "HIGH", note: "1903-14. Connie Mack's Athletics. Five pennants. Three championships. The city that took him from the reservation." },
    { location: "The World Series", affinity: "HIGH", note: "6-4 in WS starts. 3× champion. 3 CG in 1911 WS. 'The greatest money pitcher of all time.' His stage." },
    { location: "White Earth Reservation", affinity: "COMPLEX", note: "Born Mandowescence. Taken at age 8 to boarding school. The home he was removed from. The identity that was targeted." },
    { location: "The Garden", affinity: "MEDIUM", note: "In his last years, Bender grew corn and vegetables on a plot of land in New Jersey. The quietest place on this card." },
  ],

  momentum: {
    hot_triggers: [
      "Must-win games — Bender's defining trait; when the stakes are highest, he is at his absolute best",
      "The slider working — when the nickel curve is biting, batters flail helplessly at late-breaking deception",
      "Dignity under pressure — when facing hostile crowds or racial taunts, Bender channels it into focus and dominance",
      "Sign-stealing advantage — when Bender has decoded the opposing pitcher, the entire team benefits",
    ],
    cold_triggers: [
      "Health problems — Bender battled various physical ailments throughout his career; when health fails, effectiveness drops sharply",
      "Alcohol — the 1912 suspension for alcohol abuse; -2 all stats when substance issues emerge",
      "Extended workloads — never exceeded 270 IP; Bender was brilliant in bursts, not marathons; fatigue degrades him faster than Plank or Johnson",
      "The 1914 WS collapse — lost to the Miracle Braves, then released by Mack; when the dynasty ends, the fall is sudden",
    ],
    pressure_response: "THE DEFINITION OF CLUTCH. Connie Mack — who managed Plank, Waddell, Grove, Pennock, and dozens of other great pitchers — chose Bender above all of them for the biggest game. Not because Bender was the best pitcher. Because Bender was the best pitcher WHEN IT MATTERED. 6-4 in WS starts. 3× champion. 3 CG in one WS (1911). 5 wins in 7 WS starts during the 1910-13 dynasty. A 4-hit shutout in the 1905 WS. In ILB: Bender is the only pitcher on the roster whose CLU might actually be understated at 3.",
  },

  action_card_seeds: [
    { title: "The Greatest Money Pitcher", type: "Game Action", text: "'If everything depended on one game, I just used Albert — the greatest money pitcher of all time. I'd tell Albert when I planned to use him in a crucial series. Then I relaxed. He never let me down.' Your pitcher takes the mound for the biggest game of the season. +3 STF. +3 CLU. +2 Connie Mack's confidence. The game is won before Albert throws.", origin: "Connie Mack on Bender, declaring him above Plank, Waddell, Grove, and all others when the stakes were highest." },
    { title: "The Nickel Curve", type: "Game Action", text: "Your pitcher throws a pitch nobody has seen before. It looks like a fastball. Then, at the last possible moment, it slides sideways — late, sharp, unhittable. The batter swings through air. Strike three. Your pitcher has just thrown the first slider in baseball history. +2 STF. +1 innovation. -1 to every batter's timing for the rest of the game.", origin: "Bender is credited as the innovator of the slider, called the 'nickel curve' for its deceptive late-breaking action." },
    { title: "Three Complete Games in October", type: "Game Action", text: "Game 1: your pitcher goes the distance. Game 4: your pitcher goes the distance. Game 7: your pitcher goes the distance. Three complete games in one World Series. He ties a record that still stands. +3 STA. +3 CLU. +1 all-time. The money pitcher earns every cent.", origin: "1911 WS: Bender pitched three complete games against the Giants, tying a World Series record." },
    { title: "Mandowescence", type: "Drama", text: "Your pitcher's name is not 'Chief.' His name is Mandowescence — Little Spirit Animal. He was born on the White Earth Reservation. He was sent to boarding school at 8 years old. He signs his autographs 'Charles Bender.' The crowds make war whoops. He throws a shutout. The spirit animal is small but it does not break. +2 resilience. +2 dignity. -1 justice.", origin: "Bender's Ojibwe name was Mandowescence. He considered 'Chief' pejorative and signed autographs 'Charles Bender.' He endured racial taunts with silent excellence." },
    { title: "The No-Hitter", type: "Game Action", text: "May 12, 1910. Your pitcher retires every Cleveland batter who tries to get a hit. Twenty-seven outs. Zero hits. A no-hitter by a 26-year-old from the White Earth Reservation against the Cleveland club — the team that still uses an Indian mascot. The irony writes itself. +3 STF. +2 historical significance.", origin: "Bender threw a no-hitter on May 12, 1910 against the Cleveland Naps." },
    { title: "The Brainiest Pitcher", type: "Game Action", text: "Your pitcher can read the opposing pitcher's delivery and relay the pitch type to your batters. From the coaching box, he decodes signs, spots tendencies, identifies tells. Ty Cobb calls him 'the brainiest pitcher I ever saw.' +2 team OBP when Bender is coaching. +1 intelligence. The game within the game.", origin: "Cobb called Bender 'the brainiest pitcher I ever saw.' Mack used Bender as a base coach on off days to steal signs." },
    { title: "Two Worlds", type: "Drama", text: "Your pitcher was born on a reservation. Sent to a school designed to destroy his culture. Became a Hall of Famer in the white man's game. The achievement was real. The tragedy was also real. He never reconciled the two worlds. He just lived in both, and pitched shutouts in both, and endured both. +1 complexity. +1 historical weight. The card holds both truths.", origin: "Bender's biography: 'Money Pitcher: Chief Bender and the Tragedy of Indian Assimilation.' The achievement and the cost, held together." },
    { title: "The Garden in New Jersey", type: "Drama", text: "Your retired pitcher has a plot of land in Haddon Heights. He grows corn and vegetables. He drives 12 miles from Philadelphia every day to tend it. His friend brings him ice cream. He has cancer he hasn't told anyone about. The corn grows. +1 peace. +1 simplicity. The quietest action card in the collection.", origin: "In his final years, Bender grew fruits and vegetables on a garden plot in New Jersey. His friend Bing Miller brought him ice cream daily." },
  ],

  art_direction: {
    face: "DIGNIFIED, INTELLIGENT, ENDURING. 6'2\" 185 lbs — tall for his era, lean, powerful. The face should carry Bender's Ojibwe heritage with DIGNITY and SPECIFICITY — not a stereotype, not a caricature, but a real face. High cheekbones, strong jaw, dark eyes that see everything. Half-Ojibwe, half-German features. The expression: CALM AUTHORITY. The look of a man who has absorbed every war whoop, every slur, every 'Chief,' and converted it into focus. Not angry. Not defeated. RESOLVED. The brainiest pitcher Ty Cobb ever saw. The eyes should be the focal point — intelligence, observation, the ability to read a pitcher's delivery from across the diamond.",
    attire: "Philadelphia Athletics 1910 whites — wool flannel with the Old English 'A' and the distinctive A's cap. THE POSE: the windup — Bender's right arm cocked, about to deliver. The delivery should suggest DECEPTION — the slider about to emerge, the 'nickel curve' about to break. Not a max-effort power delivery (that's Johnson). A CONTROLLED, INTELLIGENT delivery — the pitch is going somewhere specific, and the batter won't know where until it's too late. Or: standing on the mound between pitches, ball in hand, eyes locked on the batter, the quiet before the pitch. The dignity is in the stillness.",
    mood: "DIGNIFIED ENDURANCE. Bender's card should feel like a TOTEM — not in the stereotypical sense, but in the sense of something carved, ancient, strong, and standing despite everything that's tried to knock it down. The mood is SILENT STRENGTH — the endurance of a man who navigated two worlds and found his mastery on the mound.",
    style: "Sepia-toned with DEEP EARTH RED and RESERVATION BROWN undertones — the iron-oxide red of Minnesota earth, the deep brown of White Earth soil, the warm tones of Ojibwe beadwork. Where Plank is battlefield gray (monumental stone) and Johnson is navy/lightning (storm), Bender is EARTH RED — the color of the land he came from and the blood of his heritage. Not bright red (that would be garish). DEEP EARTH RED — the red of iron in soil, of cedar bark, of dignity rooted in the ground.",
    reference: "The face is everything. Bender's portrait should be the most carefully rendered in the entire ILB collection. It must honor his Ojibwe heritage without stereotyping. It must show intelligence, dignity, endurance, and the quiet power of a man who threw shutouts in response to slurs. The card should feel like a monument to something more than baseball — to survival, adaptation, and excellence in the face of systematic cultural destruction. The most IMPORTANT card in the Muggers collection.",
  },
};

const STAT_ENGINE_PITCHER = {
  stuff: { metric: "ERA (peak season)", tiers: [{ range: "<1.50", value: 5 },{ range: "1.50-1.99", value: 4 },{ range: "2.00-2.49", value: 3 },{ range: "2.50-2.99", value: 2 },{ range: "3.00-3.49", value: 1 },{ range: "3.50+", value: 0 }], bonus: "K/9 ≥ 6.0 → +1 (cap 5)" },
  control: { metric: "BB/9 (peak season)", tiers: [{ range: "<1.0 BB/9", value: 5 },{ range: "1.0-1.49", value: 4 },{ range: "1.5-1.99", value: 3 },{ range: "2.0-2.49", value: 2 },{ range: "2.5-2.99", value: 1 },{ range: "3.0+", value: 0 }], bonus: "WHIP ≤ 1.00 → +1 (cap 5)" },
  stamina: { metric: "Innings Pitched (peak season)", tiers: [{ range: "<150 IP", value: 0 },{ range: "150-199", value: 1 },{ range: "200-249", value: 2 },{ range: "250-299", value: 3 },{ range: "300-349", value: 4 },{ range: "350+", value: 5 }] },
  defense: { metric: "Same as position players" },
  overall: { formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason ERA + signature moments", tiers: [{ range: "PS ERA > 4.00", value: 0 },{ range: "PS ERA 2.00-4.00", value: 1 },{ range: "PS ERA < 2.00", value: 2 }], bonus: "WS clincher / perfecto → +1 (cap 3)" },
};

const C = {
  parchment: "#f0e6d2", darkBrown: "#3a2820", medBrown: "#704a30",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#96775a",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
  earthRed: "#7a3328",
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

export default function CharlesBenderCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.earthRed}40 0%, #1a150e 50%, ${C.earthRed}40 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
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
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.earthRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.earthRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 1, fontStyle: "italic" }}>Mandowescence — Little Spirit Animal</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.earthRed} />
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — 23-5 • NO-HITTER • WS CHAMPION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "W%", val: ".625" },{ label: "NO-HIT", val: 1 },{ label: "WS REC", val: "6-4" },{ label: "WS TITLES", val: 3 }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — FIRST NATIVE AMERICAN IN HOF (1953)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 3× WS Champ", "⭐ HOF 1953", "💰 Greatest Money Pitcher", "🧠 Brainiest Pitcher (Cobb)", "🎯 Invented the Slider", "⚾ No-Hitter (1910)", "🪶 First Native HOFer", "📝 'Charles Bender'"].map((a, i) => (
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
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "COMPLEX" ? `${C.earthRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "COMPLEX" ? C.earthRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Bender's real life, become universal cards playable in any game.</p>
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
                <Section title="Bender's Stat Derivation">
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
