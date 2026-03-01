// /cards/players/marty-mcmanus.jsx
import { useState } from "react";

const MCMANUS_DATA = {
  name: "Marty McManus",
  nickname: "The Utility Man",
  year: 1922,
  team: "St. Louis Browns",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "2B",
  bats: "R",
  throws: "R",
  height: '5\'10"',
  weight: "160 lbs",
  born: "March 14, 1900 — Chicago, Illinois",
  died: "February 18, 1966 — St. Louis, Missouri (age 65)",
  hof: "Not inducted. Solid 15-year career journeyman: .289 BA, 1,926 H, 120 HR, 992 RBI. Led AL in 2B (1925) and SB (1930). Never played a postseason game. The quintessential 'good, not great' player — the kind of man who held a lineup together without anyone noticing.",

  real_stats: {
    season: 1922,
    games: 154,
    at_bats: 607,
    hits: 189,
    doubles: 34,
    triples: 11,
    home_runs: 11,
    rbi: 109,
    stolen_bases: 11,
    batting_avg: ".312",
    obp: ".358",
    slg: ".459",
    ops: ".817",
    runs_scored: 86,
    walks: 37,
    strikeouts: 46,
    war: 4.0,
    career_avg: ".289",
    career_hits: 1926,
    career_hr: 120,
    career_rbi: 992,
    career_runs: 1008,
    career_2b: 401,
    career_3b: 88,
    career_sb: 113,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1922 SEASON
  //
  // CON: .312 BA → tier 4 (.300-.329). 189 H. Career .289 — solid, not elite. CON = 3 (high-3, career line drags below .300).
  // POW: 11 HR → tier 1 (10-19). .459 SLG. 109 RBI (boosted by lineup). Career 120 HR. POW = 1.
  // SPD: 11 SB (1922). Led AL with 23 SB in 1930. Career 113 SB. SPD = 1.
  // DEF: Played 2B, 3B, SS, 1B. Led AL 3B in putouts/DP/FP (1930). Solid range at 2B. Multi-positional versatility. DEF = 1.
  // CLU: No postseason games ever. 1922 Browns missed by 1 game. CLU = 0.
  // OVR: CON×2(6) + POW×1.5(1.5) + SPD×1(1) + DEF×0.5(0.5) = 9 → normalized ~6
  // OVR = 6 (SOLID STARTER) — the lineup glue, the man who played every position and never missed.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,
    con: 3,
    pow: 1,
    spd: 1,
    def: 1,
    clu: 0,
  },

  stat_justification: {
    con: ".312 in 1922 — his best full season. .309 in 1923. .333 in partial 1923 stretch. Career .289 — consistently productive without ever being dominant. 1,926 career hits. 401 career doubles (led AL in 1925 with 44). Four seasons above .300. He could hit — he wasn't a star, but he filled the 5-6 spot in a lineup and produced. Rating of 3.",
    pow: "11 HR in 1922. Career high 18 HR. Career 120 HR over 15 seasons. .459 SLG in 1922. Gap power — 401 career doubles, 88 triples — but not a home run threat. Two grand slams in three days (July 1929) is a nice highlight, but the overall power profile is modest. Rating of 1.",
    spd: "11 SB in 1922. Led AL with 23 SB in 1930 at age 30. Career 113 SB. Good baserunner, not elite. The SB title at age 30 shows he maintained his speed. 88 career triples confirm real legs. Rating of 1.",
    def: "Played 927 games at 2B, 725 at 3B, plus SS and 1B. Led AL 3B in putouts (152), DP (23), and FP (.966) in 1930. 206 putouts at 3B in 1929 — a Detroit franchise record that still stands. Solid range at 2B (5.65 range factor, 2nd in AL). Multi-positional versatility is his calling card. He also pulled off the hidden ball trick on Harry Heilmann with Ty Cobb coaching third. But: 32 errors at 2B in 1922 (led AL in errors). Capable, versatile, occasionally error-prone. Rating of 1.",
    clu: "Zero postseason games in 15 MLB seasons. The 1922 Browns finished 1 game behind the Yankees — the closest McManus ever came. He later managed the Red Sox to a 43-111 combined record over parts of two seasons. He never sniffed October as a player or manager. CLU = 0.",
  },

  personality: {
    leadership_style: "Workman's pride. McManus wasn't a star and knew it. He led by filling whatever hole needed filling — 2B today, 3B tomorrow, SS next week. When the Red Sox manager resigned mid-season in 1932, McManus was asked where to find a replacement. The departing manager pointed at McManus himself. He managed because someone had to, the same way he played every position because someone had to.",
    temperament: "Scrappy, combative, determined. He fought Heinie Manush on the field in 1928 (both ejected). He arrived in the majors with a bad arm and was nearly sent back — 'his nerve was so evident, and his faith in himself so marked' that they kept him. He visited Bonesetter Reese, an unlicensed physical therapist, who 'grabbed McManus here, and punched him there, until Marty thought the Inquisition had him.' Then he was fine.",
    work_ethic: "RELENTLESS COMPETENCE. McManus played 22 years of professional baseball (1920-1941), including 15 in the majors. He started as a first baseman in the Western League, moved to 2B, then 3B, then everywhere. He managed in the majors, managed in the minors, managed in the AAGPBL (women's pro league). He never stopped working. He served in the US Army before baseball. He was a soldier in everything he did.",
    lifestyle: "Chicago kid, Army veteran, career ballplayer. No scandals, no fame, no Hall of Fame. Played for four teams (Browns, Tigers, Red Sox, Braves). Managed the Kenosha Comets in the women's league. Died in St. Louis at 65. The kind of life that fills no biographies but fills every roster.",
    era_adaptability: "McManus's multi-position utility role is MORE valuable in modern baseball than it was in his era. The 'super-utility' player — the Ben Zobrist type who can play 2B, 3B, SS, and 1B competently — is a premium asset. McManus was the 1920s prototype. His bat (.289 career) and versatility would make him a valued roster piece in any era.",
    clubhouse_impact: "GLUE. McManus was the connective tissue of a roster. He wasn't the star — that was Sisler, or Williams, or whoever. He was the guy who played 154 games at whatever position was open and hit .289 with doubles. In ILB, McManus provides +1 to team flexibility — his presence allows tactical position switches without penalty.",
    dark_side: "The invisible man's frustration. McManus played on the 1922 Browns — one of the best offensive teams in history — and they lost the pennant by 1 game. He was traded to the Tigers and expressed THANKS for being released from St. Louis. 'Promised to play his head off to repay the Tigers.' There's anger in McManus — the anger of a good player on bad or almost-good teams, always a supporting actor, never the lead. He fought Manush because the frustration had to go somewhere. In ILB: McManus has a 'Frustration' meter that builds when his team loses close games. At threshold, +1 to all stats (channeled anger) but risk of ejection for fighting.",
  },

  chemistry_traits: [
    { tag: "Every Position", desc: "McManus played 2B, 3B, SS, and 1B across his career. In ILB, he can be deployed at any infield position without penalty. +1 to team roster flexibility." },
    { tag: "Sisler's Infield", desc: "McManus and Sisler played together on the 1922 Browns — the team that lost the pennant by 1 game. When paired with Sisler, +1 to infield defense. Links to Sisler's 'One Game Short' and Williams's 'One Game Behind.'" },
    { tag: "The Bonesetter", desc: "McManus visited unlicensed therapist Bonesetter Reese to fix his bad arm. 'Grabbed him here, punched him there, until Marty thought the Inquisition had him.' In ILB, McManus can recover from arm injuries in half the normal time — the Bonesetter is always available." },
    { tag: "Hidden Ball Trick", desc: "June 30, 1926: McManus caught Harry Heilmann with the hidden ball trick while Ty Cobb coached third. Once per series, McManus can attempt the hidden ball trick — d6: on 5-6, runner is out. On 1-4, no effect." },
    { tag: "Soldier's Nerve", desc: "US Army veteran. Arrived with a bad arm but 'his nerve was so evident and his faith in himself so marked' that they kept him. +1 to resilience — cannot be demoralized by poor starts. The Army taught him to endure." },
    { tag: "Player-Manager", desc: "Managed the Red Sox (1932-33) and the Kenosha Comets (AAGPBL, 1944). In ILB, McManus can serve as player-manager — minor +1 to team strategy, but no penalty to his own stats." },
    { tag: "Frustration", desc: "Fought Heinie Manush on the field. Thanked God when traded from the Browns. Frustration meter builds with close losses. At threshold: +1 all stats (channeled) but 10% ejection risk per game." },
    { tag: "Forty-Four Doubles", desc: "Led AL with 44 doubles in 1925. In ILB, McManus has +1 to doubles probability. He hits the gaps — not over the fence, into them." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park, St. Louis", affinity: "HIGH", note: "6 seasons with the Browns (1921-26). The 1922 pennant race. Sisler and Williams as teammates." },
    { location: "Second Base", affinity: "HIGH", note: "927 career games. His primary position, though he played everywhere." },
    { location: "Third Base", affinity: "HIGH", note: "725 career games. Led AL 3B in putouts/DP/FP in 1930. Detroit franchise record in putouts." },
    { location: "Wherever Needed", affinity: "MAXIMUM", note: "The defining trait. McManus goes where the team needs him. Every position, every lineup spot, every day." },
  ],

  momentum: {
    hot_triggers: [
      "1922 pennant race — .312 BA, 109 RBI, 154 games. McManus elevated when the stakes were highest.",
      "New team energy — expressed thanks when traded from Browns to Tigers, 'promised to play his head off.' Fresh starts fired him up.",
      "July 1929 — two grand slams in three days, then a 5-for-5 game with a triple play.",
      "Doubles — led AL with 44 in 1925. When hitting to the gaps, McManus was at his best.",
    ],
    cold_triggers: [
      "Losing — the 1932-33 Red Sox (43-111 combined). Managing a terrible team crushed his spirit.",
      "Arm injuries — early career bad arm nearly ended him before it started.",
      "Obscurity — playing behind bigger names. Sisler got the glory, Williams got the headlines, McManus got the roster spot.",
      "Close losses — the 1922 pennant (1 game). The frustration of almost is worse than the frustration of never.",
    ],
    pressure_response: "COMPETENT. McManus didn't fold under pressure — he delivered steady, workmanlike performance when it mattered. .312 BA during the 1922 pennant race. 109 RBI. But he also didn't transcend — he was the same player in September that he was in April. No heroic peaks, no disastrous valleys. The reliability of a player who knows his role and fills it. In ILB, McManus has no pressure bonus or penalty. He is exactly who he always is. That is both his strength and his limitation.",
  },

  action_card_seeds: [
    {
      title: "Every Position",
      type: "Action",
      text: "Your infielder has played second base, third base, shortstop, and first base. He has led the league in doubles and stolen bases. He has managed in the majors and managed in the women's league. He is not a star. He is something more useful than a star — he is available. Whatever you need, wherever you need it, Marty McManus is there.",
      origin: "McManus: 927 G at 2B, 725 at 3B, plus SS and 1B. Managed Red Sox (1932-33) and Kenosha Comets (AAGPBL, 1944).",
    },
    {
      title: "The Bonesetter",
      type: "Action",
      text: "Your infielder's arm is broken and his career is over before it starts. Someone suggests a man named Bonesetter Reese, who has no medical credentials but seems to fix ballplayers. The Bonesetter grabs your infielder here and punches him there until your infielder thinks the Inquisition has him. The grabbing and punching cease. 'You're a ballplayer again — pay the fee to the secretary on the way out.' He's right.",
      origin: "McManus visited Bonesetter Reese in Youngstown, Ohio, early in his career to fix a bad arm. The unlicensed therapist was famous for treating baseball players. The treatment worked.",
    },
    {
      title: "One Game Behind",
      type: "Drama",
      text: "The 1922 St. Louis Browns. Your team hits .313 as a unit — only one team in history has hit higher. Your first baseman hits .420. Your left fielder hits 39 home runs and steals 37 bases. Your second baseman drives in 109 runs. You finish one game behind the Yankees. One. Your second baseman will play fifteen more seasons and never come this close again.",
      origin: "The 1922 Browns finished 93-61, one game behind the 94-60 Yankees. Sisler (.420), Williams (39 HR/37 SB), and McManus (109 RBI) all had career years. It wasn't enough.",
    },
    {
      title: "The Hidden Ball Trick",
      type: "Game Action",
      text: "June 30, 1926. Harry Heilmann is on second base. Ty Cobb is coaching third. Your second baseman has the ball tucked in his glove. Heilmann takes his lead. Your second baseman tags him. Out. Ty Cobb — the smartest man in baseball — didn't see it coming. Sometimes the overlooked man sees what everyone else misses.",
      origin: "McManus caught Heilmann with the hidden ball trick with Cobb coaching third. One of the more celebrated hidden ball tricks of the era.",
    },
    {
      title: "The Soldier's Nerve",
      type: "Action",
      text: "Your infielder arrives in the major leagues with an arm so bad he can play only one game. He is nearly sent back to the minors. But 'his nerve was so evident, and his faith in himself so marked' that they keep him on the roster. Two years later, he is the starting second baseman on one of the best offensive teams in history. He came from the Army. The Army teaches you that you do not quit.",
      origin: "McManus served in the US Army before baseball. Arrived at the Browns with a bad arm but was retained because of his determination. SABR: 'His nerve was so evident.'",
    },
    {
      title: "Two Grand Slams in Three Days",
      type: "Game Action",
      text: "July 1929. Your infielder hits a grand slam on Thursday. He hits another grand slam on Saturday. Two bases-loaded home runs in three days. Then, eleven days later, he goes 5-for-5 with four runs scored and helps execute a triple play. It is the best ten days of his career, and almost nobody remembers.",
      origin: "McManus hit two grand slams in three days for the Tigers in July 1929. On July 11, he went 5-for-5 with 4 runs and was part of a triple play vs. the Red Sox.",
    },
    {
      title: "Collins Quit",
      type: "Drama",
      text: "June 1932. The Boston Red Sox are 11-44. Your manager resigns, 'so discouraged he could not go on.' The owner asks the departing manager where to find a replacement. He points at your infielder. 'McManus.' So your infielder becomes your manager — not because anyone planned it, but because someone had to do it and he was standing there. He goes 32-67. He was standing there for that, too.",
      origin: "Red Sox manager Shano Collins resigned mid-1932 with an 11-44 record. He suggested McManus as replacement. McManus managed the Sox to a 32-67 finish and continued into 1933.",
    },
    {
      title: "The Women's League",
      type: "Legacy",
      text: "1944. The men are at war. Baseball needs managers for the new women's professional league. Your former infielder — now forty-four years old — takes the job. He manages the Kenosha Comets. He is still doing what he has always done: filling the position that needs filling, wherever it needs to be filled, because someone has to do it.",
      origin: "McManus managed the Kenosha Comets of the All-American Girls Professional Baseball League (AAGPBL) in 1944, the league later made famous by 'A League of Their Own.'",
    },
  ],

  art_direction: {
    face: "5'10\" 160 lbs — small, wiry, scrappy. The face of a man who works for a living. Not handsome, not ugly — plain, square, Irish-American. A face you'd see on a construction site or behind a bar. He looks exactly like what he was: a Chicago kid who joined the Army, played ball, and never stopped working. There's determination in the jaw. There's nothing special about him except everything.",
    attire: "St. Louis Browns 1922 home whites — same team as Sisler and Williams. McManus should be at second base, fielding position, glove ready, slightly dirty. Or: at the plate, mid-swing, driving one into the gap — a double, not a homer. The Browns uniform connects him to the '22 pennant race. Bat on shoulder, modest stance, waiting for his pitch.",
    mood: "STEADY UTILITY. This card should feel like a reliable tool — not a showpiece, not a conversation starter, but something you reach for every day because it works. McManus's card has no flash and no pretension. It's the screwdriver in a drawer full of specialized instruments. The mood is workday — morning light at Sportsman's Park, Tuesday afternoon, 8,000 people, nobody particularly watching the second baseman who just turned a double play. And that's fine.",
    style: "Full color — Bashers era — but the most SUBDUED card in the set. Browns brown and cream, but faded, almost washed-out. Where Ruth blazes and Cochrane burns, McManus is lukewarm — present, functional, essential, and entirely forgettable. The card border should be plain brown. No gold, no iron, no navy. Just brown. The color of dirt, the color of a baseline, the color of work.",
    reference: "Ruth is the solar system. Gehrig is the axis. Sisler is the sun. Sewell is the earth. Williams is the comet. Cochrane is the core. McManus is the TOPSOIL — the thin layer between the bedrock and the air where things actually grow. Nobody writes poems about topsoil. But nothing lives without it.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", brownPlain: "#5a4530", brownLight: "#8a7560" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.brownPlain}10`, border: `1px solid ${C.brownPlain}25`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.brownPlain, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.brownPlain}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function MartyMcManusCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = MCMANUS_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.brownPlain} 0%, #2a1f14 50%, ${C.brownPlain} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>SOLID STARTER CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.brownPlain}80`, boxShadow: `0 0 0 2px ${C.darkBrown}, 0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.brownPlain}, #6a5540, ${C.brownPlain})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.brownPlain}40`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.brownPlain}15, ${C.sepia}10, ${C.brownLight}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🔧</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE UTILITY MAN</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.brownPlain, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.brownPlain}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>SOLID STARTER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.sepia} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.brownPlain}, #6a5540)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "H", val: d.real_stats.hits },{ label: "RBI", val: d.real_stats.rbi },{ label: "2B", val: d.real_stats.doubles },{ label: "3B", val: d.real_stats.triples }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1922 BROWNS — 109 RBI (3RD AL) — 154 GAMES — 1 GAME FROM PENNANT</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.brownPlain}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.brownPlain}18` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "CAR RBI", val: d.real_stats.career_rbi },{ label: "CAR 2B", val: d.real_stats.career_2b },{ label: "CAR 3B", val: d.real_stats.career_3b },{ label: "CAR SB", val: d.real_stats.career_sb },{ label: "SEASONS", val: "15" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.brownPlain, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🔧 2B/3B/SS/1B Utility", "📊 .312 BA (1922)", "💪 109 RBI (3rd AL)", "🎯 44 2B Led AL (1925)", "🏃 23 SB Led AL (1930)", "🎩 Hidden Ball Trick", "🪖 US Army Veteran", "⚾ Managed AAGPBL"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.brownPlain}10`, border: `1px solid ${C.brownPlain}20`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>STARTER DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.brownPlain}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.brownPlain : "transparent", color: tab === t.id ? C.cream : C.medBrown, border: `1px solid ${tab === t.id ? C.brownPlain : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.coldBlue}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HIGH" ? C.traitGreen : C.coldBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from McManus's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.brownPlain}05`, border: `1px solid ${C.brownPlain}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Legacy" ? `${C.sepia}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.brownPlain}, #6a5540, ${C.brownPlain})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB STARTER #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
