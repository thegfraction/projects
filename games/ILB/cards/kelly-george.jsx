// /cards/players/george-kelly.jsx
import { useState } from "react";

const KELLY_DATA = {
  name: "George Kelly",
  nickname: "High Pockets",
  year: 1924,
  team: "New York Giants",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "1B",
  bats: "R",
  throws: "R",
  height: '6\'4"',
  weight: "190 lbs",
  born: "September 10, 1895 — San Francisco, California",
  died: "October 13, 1984 — Burlingame, California (age 89). The second longest-lived Basher. Buried Holy Cross Cemetery, Colma, CA. Nephew of Bill Lange.",
  hof: "INDUCTED 1973 — Veterans Committee. THE MOST CONTROVERSIAL INDUCTION IN HOF HISTORY. Never received more than 1.9% of BBWAA vote. Bill James: 'the worst player in the Hall of Fame.' Frisch and Terry (teammates) on the Veterans Committee shepherded his election. Led to the Veterans Committee having its powers reduced. Kelly's plaque hangs in Cooperstown. The debate about whether it should has never stopped.",

  real_stats: {
    season: 1924,
    batting_avg: ".324",
    obp: ".371",
    slg: ".531",
    ops: ".902",
    hits: 185,
    doubles: 37,
    triples: 9,
    home_runs: 21,
    rbi: 136,
    runs: 91,
    stolen_bases: 4,
    total_bases: 303,
    games: 144,
    war: 4.8,
    note: "136 RBI led both leagues. 7 HR in 6 consecutive games (NL record). 3 HR in one game (all 8 Giants runs). 6th in MVP.",
    career_batting_avg: ".297",
    career_hits: 1778,
    career_hr: 148,
    career_rbi: 1020,
    career_war: 23.6,
    career_seasons: 16,
    ws_record: "4 WS appearances (1921-1924), 2 championships (1921, 1922)",
    putout_record: "1,759 putouts in 1920 — NL record (still stands)",
    hr_streak: "First player to hit HR in 6 consecutive games",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1924 SEASON
  //
  // CON: .324 BA, 185 H, .371 OBP. Career .297.
  //      .300+ in 6 straight years (1921-1926).
  //      Not elite contact — never led NL in BA, OBP, or SLG.
  //      But solid and sustained. A .300 hitter for a decade.
  //      CON = 2 (SOLID — .324 is good, but he was never
  //      among the NL's best pure contact hitters. The batting
  //      eye was adequate, not elite. .371 OBP confirms: good
  //      but not commanding.)
  //
  // POW: 21 HR, 136 RBI (led both leagues), .531 SLG.
  //      23 HR in 1921 (led NL). 148 career HR.
  //      7 HR in 6 consecutive games. 3 HR in a game (twice).
  //      "Intermittently impressive as a long-ball hitter."
  //      "Streaky power hitter" — get white-hot for a week.
  //      Led NL RBI twice (1920, 1924). 100+ RBI 4 straight.
  //      POW = 3 (STRONG — 136 RBI led both leagues. 
  //      The power was real but streaky. Not a consistent
  //      25+ HR hitter like Ruth or Hornsby — more of a
  //      gap-power RBI man. 148 career HR was 8th all-time
  //      NL when he retired.)
  //
  // SPD: 4 SB. 6'4" first baseman. Not a speed player.
  //      9 3B in 1924 is decent for his size.
  //      SPD = 1 (BELOW AVERAGE — tall, lanky, adequate
  //      baserunner but not a weapon.)
  //
  // DEF: "The finest first baseman I have ever seen" (Frisch).
  //      "His arm was so tremendous he was the relay man on
  //      outfield throws." NL record 1,759 putouts (1920,
  //      STILL STANDS). Led NL in putouts 3×, assists 3×.
  //      .992 career fielding. Used same glove entire career.
  //      Played EVERY position except SS and C.
  //      DEF = 3 (MAXIMUM — arguably the best defensive 1B
  //      of the era. The arm, the range, the putout record.
  //      The 1921 WS-clinching double play. The versatility.
  //      This is the primary reason he's in the HOF at all.)
  //
  // CLU: 4 straight WS (1921-1924). 2 championships.
  //      1921 WS Game 8: game-ending double play relay.
  //      1923 WS: threw out Dugan at home off Ruth grounder.
  //      McGraw: "made more important hits than any player
  //      I ever had."
  //      .248 career WS BA — unspectacular.
  //      But the big PLAYS were legendary.
  //      CLU = 3 (MAXIMUM — McGraw's own testimony. The
  //      1921 clinching play. The 1923 Dugan throw. 2 rings.
  //      4 straight WS. The big-game plays define him more
  //      than the batting line. This is a clutch player.)
  //
  // OVR: CON×2(4) + POW×1(3) + SPD×1.5(1.5) + DEF×0.5(1.5) + CLU×1.5(4.5) = 14.5 → normalized ~7
  // OVR = 7 (ALL-STAR) — High Pockets Kelly. The tallest
  // Basher. The most controversial HOFer. The man Bill James
  // called the worst in Cooperstown and John McGraw called
  // the most clutch player he ever managed. The OVR 7 is
  // GENEROUS compared to WAR (23.6 career) but JUSTIFIED
  // by the 4 WS, 2 rings, elite defense, and McGraw's
  // testimony. This is a player whose value exceeds his
  // statistics — or whose statistics fail to capture his
  // value. That's the entire debate.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,
    con: 2,    // .324 BA, .371 OBP. Career .297. .300+ in 6 straight years. Solid but never NL leader in any slash category.
    pow: 3,    // 21 HR, 136 RBI led both leagues. 23 HR led NL 1921. 148 career HR. Streaky power — 7 HR in 6 games. 100+ RBI 4 straight years.
    spd: 1,    // 4 SB. 6'4" 1B. Adequate but not a weapon.
    def: 3,    // MAXIMUM. "Finest 1B I ever saw" (Frisch). Strongest arm in NL. NL putout record 1920 (still stands). Led NL putouts 3×, assists 3×. The reason he's in the HOF.
    clu: 3,    // MAXIMUM. 4 straight WS (1921-1924). 2 rings. 1921 clinching double play. McGraw: "more important hits than any player I ever had." The clutch defines him.
  },

  stat_justification: {
    con: "Kelly hit .324 in 1924 with 185 hits and a .371 OBP. He batted .300+ in 6 consecutive seasons (1921-1926). Career: .297 BA, 1,778 hits. But he never led the NL in batting average, on-base percentage, or slugging percentage in any season. He was a solid, consistent hitter but not an elite contact man. His value was in RBI production and defense, not in getting on base at elite rates. Rating of 2.",
    pow: "Kelly drove in 136 runs in 1924, leading both leagues — his second RBI title (also 1920). He led the NL with 23 HR in 1921 and hit 7 HR in 6 consecutive games in 1924 (NL record). He hit 3 HR in a game twice and drove in all 8 Giants runs in one of those games. Career: 148 HR, 1,020 RBI, 100+ RBI in 4 straight years. He was described as a 'streaky power hitter' who would 'get white-hot for a week and slug the ball all over the park.' The power was real but inconsistent — more gap-to-gap than fence-clearing. Rating of 3.",
    spd: "Kelly stole 4 bases in 1924. At 6'4\" and 190 lbs, he was one of the tallest players in the league. He hit 9 triples in 1924 (decent for his size) but was not a baserunning threat. He played every position except shortstop and catcher, suggesting adequate athleticism, but speed was not a tool. Rating of 1.",
    def: "Kelly's defense is the strongest argument for his career value. Frankie Frisch called him 'the finest first baseman I have ever seen.' His arm was so strong that he served as the relay man on outfield throws — normally a shortstop's job. He set the NL record with 1,759 putouts in 1920 (still standing). He led NL first basemen in putouts 3 times, assists 3 times, and maintained a .992 fielding percentage. He used the same glove from his debut to retirement. The 1921 WS-ending double play — receiving Rawlings's throw, then firing to Frisch — was a defensive masterpiece. Rating of 3 (maximum).",
    clu: "Kelly appeared in 4 consecutive World Series (1921-1924) and won 2 championships. John McGraw — one of the greatest managers in baseball history — said Kelly 'made more important hits for me than any player I ever had.' The 1921 WS Game 8 clinching double play is the signature moment. In the 1923 WS, he threw out Dugan at home on a Ruth grounder. His .248 career WS batting average is unspectacular, but the PLAYS — the defensive gems, the clutch hits, the big moments — define him. This is a player whose October reputation exceeds his October statistics. Rating of 3 (maximum).",
  },

  personality: {
    leadership_style: "PLACID RELIABILITY. McGraw described Kelly as 'placid' and 'reliable.' He was not a firebrand or a clubhouse leader. He was the steady first baseman who showed up, played elite defense, hit in the clutch, and went home. The leadership was STRUCTURAL — like the first base itself, he anchored the infield and made everything around him function. Frisch, Bancroft, Jackson, Groh — they all relied on High Pockets being at first base, stretching for every throw.",
    temperament: "QUIET AND LOYAL. Kelly played under John McGraw — one of the most demanding managers in baseball history — for 8 seasons without significant conflict. He agreed to move to second base in 1925 when McGraw wanted Bill Terry's bat in the lineup, sacrificing his best position without complaint. The temperament was OBEDIENT — not passive, but trusting. If McGraw asked, Kelly did it. The reward was 4 pennants.",
    work_ethic: "THE SAME GLOVE. Kelly used the same first baseman's glove from his first day in the majors to his last. By the time he retired, it looked 'positively prehistoric.' This is the work ethic distilled to its essence — the tool doesn't matter, the hands do. The discipline doesn't change. The position doesn't either, until your manager asks you to move.",
    lifestyle: "SAN FRANCISCO. Born there, died in Burlingame (just south of it). Nephew of Bill Lange (famous 19th-century outfielder). After baseball, he coached for the Reds (1935-37) and lived quietly in California for decades. Died at 89 — the second longest-lived Basher. A quiet, long, West Coast life bookending a loud New York career.",
    era_adaptability: "MODERATE. Kelly's defensive skills would translate to any era — the arm, the footwork, the stretch. His offensive profile (.297/.342/.452) would be below average for a modern 1B, where power is expected. He'd be a defense-first 1B who hits .270 with 18 HR — valuable but not a star. The clutch hitting is harder to project. Modern analytics would undervalue him (23.6 career WAR) just as they do now.",
    clubhouse_impact: "POSITIVE THROUGH FUNCTION. Kelly made the infield work. Frisch, Bancroft, Jackson — Hall of Famers who all benefited from Kelly's stretch at first, his arm on relays, his reliability. In ILB, Kelly provides +1 DEF to all infield teammates. The first baseman elevates the infield around him.",
    tragic_element: "THE PLAQUE AND THE DEBATE. George Kelly is in the Baseball Hall of Fame. He got 1.9% of the BBWAA vote. The Veterans Committee — led by his former teammates Frisch and Terry — elected him. Bill James called him 'the worst player in the Hall of Fame.' The plaque has hung in Cooperstown since 1973. Every year, someone writes another article about why it shouldn't. Kelly's tragedy is not being excluded from greatness. It's being included and having the inclusion questioned for the rest of eternity. The plaque DEFENDS itself. The statistics PROSECUTE. The verdict was never final. It never will be.",
  },

  chemistry_traits: [
    { tag: "McGraw's Clutch Man", desc: "'Kelly made more important hits for me than any player I ever had' — John McGraw. In ILB, Kelly has +2 to all offensive stats in situations where the game outcome is directly at stake (tying/go-ahead run). The clutch is not a statistic. It's a testimony." },
    { tag: "The Controversial Plaque", desc: "HOF 1973 — 1.9% BBWAA vote, elected by Veterans Committee via Frisch cronyism. In ILB, Kelly carries THE ASTERISK (inverse of Hargrave's): his HOF status is permanently contested. Opponents may challenge his ranking. The plaque defends itself. The debate never ends." },
    { tag: "High Pockets", desc: "6'4\" in an era of 5'9\" averages. In ILB, Kelly has +1 DEF at 1B (reach advantage) and +1 defensive range for stretching. But -1 to strike zone size — the height creates a larger target for pitchers. The pockets are high. The strike zone is too." },
    { tag: "The Same Glove", desc: "Kelly used one glove his entire career. In ILB, Kelly has +1 DEF consistency — his fielding never fluctuates. No hot or cold streaks on defense. The glove is prehistoric. The hands are eternal." },
    { tag: "The Relay Arm", desc: "First baseman used as relay man on outfield throws. In ILB, Kelly's arm extends the defensive chain: outfield assists +1 when Kelly is the relay man. The strongest arm plays the position that doesn't usually need one." },
    { tag: "Frisch's Pipeline", desc: "Frisch got Kelly into the HOF. Also Haines, Bancroft, Hafey, Youngs, Bottomley, Lindstrom. In ILB, when Kelly is on the same team as any other Frisch-pipeline HOFer, both receive +1 to reputation. The teammates who testified for each other." },
    { tag: "Streaky Power", desc: "7 HR in 6 games. 3 HR in a game (twice). Then weeks of ordinary production. In ILB, Kelly's POW fluctuates: d6 each week: on 6 = HOT STREAK (POW becomes 5 for the week). On 1 = cold (POW becomes 1). The surge and the silence." },
    { tag: "The Game Ender (1921)", desc: "WS Game 8, 1921: Rawlings to Kelly to Frisch — double play to end the World Series. In ILB, Kelly has +3 DEF in WS-clinching situations. The play that justified the plaque." },
  ],

  preferred_locations: [
    { location: "Polo Grounds, New York", affinity: "MAXIMUM / HOME", note: "1920-1926. Four pennants, two championships. The place where High Pockets became High Pockets. McGraw's domain." },
    { location: "First Base", affinity: "IDENTITY", note: "1,759 putouts in 1920 (NL record, still stands). Same glove, same stretch, same reliability. The position was the man." },
    { location: "The World Series", affinity: "PEAK", note: "4 consecutive WS (1921-1924). 2 rings. The clinching double play. More important hits than anyone McGraw ever had." },
    { location: "San Francisco", affinity: "HOME / ORIGIN", note: "Born SF, died Burlingame. Nephew of Bill Lange. West Coast boy who conquered New York and came home." },
  ],

  momentum: {
    hot_triggers: [
      "Streaky power — Kelly would get 'white-hot for a week' and hit 7 HR in 6 games. When the power streak arrives, he's unstoppable.",
      "October baseball — 4 consecutive WS appearances. Kelly elevated in the postseason, making plays and hits that exceeded his regular-season production.",
      "RBI situations — led both leagues in RBI (1924). Kelly thrived with runners on base. The more pressure, the better.",
      "Defensive rhythm — when the infield was in sync, Kelly's defense anchored everything. Hot defensive streaks correlated with team success.",
    ],
    cold_triggers: [
      "Between streaks — Kelly's power was feast-or-famine. The cold periods produced modest .270-level production with no extra-base pop.",
      "Position changes — moving to 2B (1925) disrupted his rhythm initially. Unfamiliar defensive demands split his focus.",
      "Walk rate — Kelly's .371 OBP (1924) was good but not elite. He didn't draw enough walks to sustain production during batting slumps.",
      "Post-Giants decline — after leaving McGraw's system, Kelly's production dropped. He needed the structure of the Giants machine.",
    ],
    pressure_response: "ELITE. This is the defining trait. McGraw's testimony is the evidence. The 1921 WS-clinching double play is the proof. The 1923 throw on Dugan off a Ruth grounder is the confirmation. Kelly's pressure response exceeds what his statistics suggest. CLU = 3 (maximum) reflects not just October numbers but the quality of the moments within those numbers.",
  },

  action_card_seeds: [
    {
      title: "The Plaque and the Debate",
      type: "Legacy / Controversy",
      text: "1973. The Veterans Committee elects your first baseman to the Baseball Hall of Fame. The Baseball Writers gave him 1.9% of their vote — not even close. The Veterans Committee includes Frankie Frisch and Bill Terry, your first baseman's former teammates. Bill James will call your first baseman 'the worst player in the Hall of Fame.' The plaque will hang in Cooperstown. The debate will never end. Your first baseman's career batting average is .297. His career WAR is 23.6. His manager — John McGraw — said he made more important hits than any player he ever had. The statistics prosecute. The testimony defends. The plaque hangs. The verdict was never final.",
      origin: "Kelly's controversial HOF induction (1973) via the Frisch-led Veterans Committee.",
    },
    {
      title: "Game Eight",
      type: "Achievement / Clutch",
      text: "1921 World Series. Game Eight. Best-of-nine format. Your team is one win from the championship. Bottom of the ninth. One out. Aaron Ward running from first. Home Run Baker grounds one hard to the right side. Johnny Rawlings dives, makes a sprawling stop, and throws to first from his knees. Your first baseman catches the ball. Ward doesn't stop — he's running for second, then third, trying to beat the play. Your first baseman — six feet four inches of calm — guns the ball across the infield to Frankie Frisch. Ward crashes into Frisch. Frisch goes down flat on his back. He holds the ball high. The umpire calls the out. The World Series is over. Your first baseman made the play. The play nobody remembers. The play that justified the plaque.",
      origin: "The 1921 WS Game 8 clinching double play — Rawlings to Kelly to Frisch.",
    },
    {
      title: "Seven in Six",
      type: "Achievement / Streak",
      text: "July 1924. Your first baseman begins hitting home runs and does not stop. One game. Two games. Three. Four. Five. Six consecutive games with a home run — the first player in baseball history to accomplish this. Seven home runs in six games, a National League record. In one of these games, he hits three home runs and drives in all eight of his team's runs. Then the streak ends. Then the ordinary production resumes. Then the weeks of singles and groundouts. Then — weeks later — another streak. White-hot for a week. Room temperature for a month. The power lives in bursts. The bursts live forever.",
      origin: "Kelly's NL-record 7 HR in 6 consecutive games (1924); first to HR in 6 straight.",
    },
    {
      title: "The Same Glove",
      type: "Character / Identity",
      text: "From the first day he takes the field for the New York Giants to the last day he plays professional baseball, your first baseman uses the same glove. The same thin piece of leather. By the time he retires, it looks positively prehistoric — a relic from another era worn while playing in the current one. They ask him why. He doesn't have a good answer. The glove works. The hands inside it know the shape. The stretch knows the reach. Why would you change the thing that knows how to catch? The glove is the career. The career is the glove. Both are worn down to essential leather.",
      origin: "Kelly used the same first baseman's glove his entire career.",
    },
  ],

  art_direction: {
    face: "6'4\" 190 lbs — TALL. The tallest Basher. A tall man's face: long, angular, with features that seem to have been stretched slightly. Not gaunt — LANKY. The expression is PLACID — McGraw's word. Calm, steady, not emotional. The face of a man who does not argue with umpires or managers or sportswriters. He simply catches the ball, drives in the run, and walks back to first base. There should be COMPETENCE in this face — not brilliance, not intensity, but the quiet competence of a man who does his job very well and lets others debate whether very well is good enough.",
    attire: "New York Giants 1924 home whites — the iconic 'NY' interlocking on the chest. RIGHT-HANDED batting stance OR stretching at first base — that famous stretch, 6'4\" fully extended, the tallest reach in the NL. The body should look LONG — long arms, long legs, long torso. Everything about Kelly is LENGTH — the pockets are high because the legs are long. Baker Bowl's short fence doesn't help him. The Polo Grounds' vast outfield doesn't hurt him. The dimensions are his.",
    mood: "COMPETENT AND CONTESTED. This card exists in two states simultaneously: the PLACID RELIABILITY of Kelly the player, and the ENDLESS DEBATE of Kelly the Hall of Famer. The mood should split — warm competence on one hand, cool questioning on the other. The card should feel like a case being argued. The evidence is mixed. The defense is strong. The prosecution has better statistics. The jury is still out.",
    style: "Full color — Bashers era — GIANTS ORANGE AND JUDICIAL GRAY. New York Giants orange-black, judicial gray, cream white. The Giants orange is confident — this is a championship team. But the gray creeps in at the edges — the debate, the doubt, the 1.9% BBWAA vote. The border should be COURTROOM GRAY — the color of testimony and cross-examination, the color of a plaque that defends itself. THE TALL MAN'S CASE — the tallest card in the Bashers, with the most debated credentials. The card that stands up and asks you to judge it.",
    reference: "Ruth is the solar system. Hornsby is the blade. Wilson is the barrel. Hargrave is the valve. George Kelly is THE TALL MAN'S CASE — the card that puts itself on trial. Every other card in the Bashers knows its place in the hierarchy. Kelly's place is CONTESTED. He is in the Hall of Fame. He should not be. He made the most important hits. His statistics say otherwise. The card stands 6'4\" and asks you to look up at it and decide.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", giantsOrange: "#c45e28", giantsBlack: "#27251f", judicialGray: "#8a8a8a" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.giantsOrange}10`, border: `1px solid ${C.giantsOrange}20`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.giantsOrange}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function GeorgeKellyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = KELLY_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.judicialGray}40 0%, ${C.giantsOrange}20 50%, ${C.judicialGray}40 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ALL-STAR CARD — Bashers Era — The Tall Man's Case</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.judicialGray}`, boxShadow: `0 0 0 2px ${C.giantsOrange}30, 0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.judicialGray}, ${C.giantsOrange}, ${C.judicialGray})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.judicialGray}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.giantsOrange}05, ${C.judicialGray}08)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>⚖️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE TALL MAN'S CASE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.giantsOrange, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.giantsBlack}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.judicialGray}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ALL-STAR • HOF 1973 (CONTESTED) • 2× WS CHAMPION</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>6'4" • "Long George" • San Francisco</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.giantsOrange} />
              <StatBar label="POW" value={s.pow} max={5} color={C.giantsBlack} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.giantsOrange}, ${C.giantsBlack})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".324" },{ label: "OPS", val: ".902" },{ label: "HR", val: "21" },{ label: "RBI", val: "136" },{ label: "H", val: "185" },{ label: "TB", val: "303" },{ label: "R", val: "91" },{ label: "WAR", val: "4.8" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, fontWeight: 700 }}>136 RBI LED BOTH LEAGUES • 7 HR IN 6 CONSECUTIVE GAMES (NL RECORD)</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1, background: `${C.traitGreen}10`, border: `1px solid ${C.traitGreen}25`, borderRadius: 4, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>THE DEFENSE</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>1,759 putouts (NL record — still stands)</div>
                <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 2 }}>"Finest 1B I ever saw" — Frisch</div>
              </div>
              <div style={{ flex: 1, background: `${C.gold}10`, border: `1px solid ${C.gold}25`, borderRadius: 4, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>THE CLUTCH</div>
                <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>4 WS • 2 Rings • 1921 DP</div>
                <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 2 }}>"More important hits than anyone" — McGraw</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.judicialGray}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.judicialGray}15` }}>
              {[{ label: "CAR AVG", val: ".297" },{ label: "CAR HR", val: "148" },{ label: "CAR RBI", val: "1,020" },{ label: "CAR WAR", val: "23.6" },{ label: "WS APPS", val: "4" },{ label: "WS RINGS", val: "2" },{ label: "BBWAA %", val: "1.9%" },{ label: "HOF", val: "⚖️" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.judicialGray, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["⚖️ HOF 1973 (Contested)", "🏆 2× WS Champion", "📏 6'4\" — Tallest Basher", "🧤 Same Glove, Whole Career", "💪 Relay Arm from 1B", "🔥 7 HR in 6 Games", "📊 23.6 WAR (Low for HOF)"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.giantsOrange}08`, border: `1px solid ${C.giantsOrange}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.giantsOrange, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ALL-STAR DOSSIER — {d.year} — THE TALL MAN'S CASE</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.giantsOrange}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.giantsOrange : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.giantsOrange : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚖ THE PLAQUE AND THE DEBATE" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.judicialGray } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.giantsOrange }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : `${C.giantsOrange}15`, color: l.affinity.includes("HOME") ? C.traitGreen : C.giantsOrange, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.giantsOrange }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.giantsOrange}05`, border: `1px solid ${C.giantsOrange}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Controversy") ? `${C.judicialGray}20` : `${C.giantsOrange}12`, color: a.type.includes("Controversy") ? C.judicialGray : C.giantsOrange, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.judicialGray}, ${C.giantsOrange}, ${C.judicialGray})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ALL-STAR #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
