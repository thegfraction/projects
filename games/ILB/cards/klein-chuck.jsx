import { useState } from "react";

const KLEIN_DATA = {
  name: "Chuck Klein",
  nickname: "The Hoosier Hammer",
  year: 1930,
  team: "Philadelphia Phillies",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "RF",
  bats: "L",
  throws: "R",
  height: "6'0\"",
  weight: "185 lbs",
  born: "October 7, 1904 — Indianapolis, Indiana (son of farmers Frank Klein and Margaret Vacker, German immigrant parents)",
  died: "March 28, 1958 — Indianapolis, Indiana (age 53, cerebral hemorrhage following years of alcoholism and CNS disease)",
  hof: "Inducted 1980 (Veterans Committee). NL MVP 1932. Triple Crown 1933. 4× NL HR leader. 2× All-Star. Richard Nixon named him to his all-time team. #92 on Sporting News 100 Greatest Players.",

  real_stats: {
    season: 1930, games: 156, at_bats: 648, batting_avg: ".386",
    hits: 250, doubles: 59, triples: 8, home_runs: 40,
    rbi: 170, runs: 158, stolen_bases: 4, walks: 54,
    strikeouts: 50, slg: ".687", obp: ".436", ops: "1.123",
    ops_plus: 157, total_bases: 445, xbh: 107, war: 7.1,
    outfield_assists: 44,
    career_avg: ".320", career_hr: 300, career_rbi: 1201,
    career_hits: 2076, career_war: 27.3,
  },

  // Hitter stat conversion: CON/POW/SPD/DEF/CLU
  ilb_stats: {
    ovr: 9,      // Elite/MVP — 5-year peak (1929-33) is one of the greatest in history. .359 BA, 36 HR avg, 139 RBI avg. HOF. Triple Crown. MVP. But: Baker Bowl inflated numbers, career collapse after age 29, alcoholism.
    con: 5,      // .386 BA, 250 H, 59 2B in 1930. Five consecutive 200-hit seasons. .359 average over 5 peak years. OPS+ 157 in 1930. Elite contact.
    pow: 4,      // 40 HR, 170 RBI, 445 TB, 107 XBH, .687 SLG in 1930. 4× NL HR leader. 300 career HR. But: Baker Bowl inflated (164 of 300 career HR at home). Park-adjusted he's closer to 260 HR. POW 4, not 5.
    spd: 1,      // 4 SB in 1930. 79 career SB. Led NL in SB in 1932 (20) — lowest total ever to lead. Not a burner but competent baserunner. SPD 1.
    def: 2,      // 44 outfield assists in 1930 — all-time record that STILL STANDS. Mastered Baker Bowl's caroms. Played shallow RF, threw out runners at 1B. Excellent defensive RF. DEF 2.
    clu: 0,      // Never won a pennant with the Phillies. Appeared in 1935 WS with Cubs (.333, 1 HR) but only as a diminished version of himself. No signature October heroics. CLU 0.
  },
  
  stat_justification: {
    con: ".386 BA in 1930 — one of the highest averages of the 20th century. 250 hits. 59 doubles (NL record at the time). Five consecutive 200+ hit seasons (1929-33). Over 5 peak years: .359 BA average. OPS+ 157 in 1930 means he was 57% better than league average even after park adjustment. Hit safely in 135 of 156 games in 1930. Two separate 26-game hitting streaks. In one stretch, hit safely in 71 of 75 games (.425). Rating of 5.",
    pow: "40 HR, 170 RBI, 445 TB, 107 XBH, .687 SLG in 1930. 4× NL HR leader. 300 career HR. Triple Crown 1933. BUT: Baker Bowl's RF was 280 feet. He hit 164 of 300 career HR at home. Park-adjusted estimates suggest ~38 fewer career HR. Mel Ott hit 323 of 511 at the Polo Grounds (258 to RF). The Baker Bowl asterisk is real but overblown — Klein still hit .320 with power on the road. Rating of 4 — elite power, but the park bump prevents a 5.",
    spd: "4 SB in 1930. Led NL in SB in 1932 with 20 — the lowest total to ever lead the league. 79 career SB. Klein was the only post-1920 player to lead his league in both HR and SB in the same year (1932). Not fast, but a smart, aggressive baserunner who scored 158 runs. Rating of 1.",
    def: "44 outfield assists in 1930 — the all-time record for any outfielder in a single season, still unbroken. Klein mastered Baker Bowl's unique RF dimensions: 280 feet to the foul pole, 60-foot tin wall. He played extremely shallow, turning singles into outs at first base. He learned to play caroms off the wall like a hockey player. His defensive prowess was partially a product of the park (lots of balls hit to RF off bad Phillies pitching), but the skill to convert those opportunities was entirely his. Rating of 2.",
    clu: "Never won a pennant with the Phillies (last place most years). Appeared in the 1935 WS with the Cubs as a diminished player (.333, 1 HR in 6 games, but Cubs lost to Tigers). No signature October moments. The Phillies were 52-102 in his peak year (1930). Klein was the best player on the worst team. CLU 0.",
  },

  personality: {
    leadership_style: "The Quiet Star. Klein was not a firebrand or a clubhouse politician. He was a steel mill worker who played baseball because it was fun. 'One of the reasons I've been able to play baseball well is because it's fun for me. Many players find it work.' He led by consistent excellence, not personality. He was the only reason to attend a Phillies game for five straight years.",
    temperament: "Easygoing, blue-collar, unpretentious. Born to German immigrant farmers. Worked construction and steel mills before baseball. Built his 185-pound frame tossing 200-pound ingots. He thrived in the low-pressure atmosphere of Philadelphia's last-place Phillies — no expectations, no spotlight, just hit. When traded to Chicago, the pressure of being the 'next great slugger' crushed him.",
    work_ethic: "Conscientious worker and hustler. SABR describes him this way consistently. Klein was not gifted with blazing speed or intimidating size — he was a 6-foot, 185-pound left-handed hitter who maximized every dimension of Baker Bowl. He mastered the wall caroms. He learned to play shallow enough to throw out runners at first from right field. He studied pitchers. He ran hard. His work ethic was the foundation beneath the gaudy numbers.",
    lifestyle: "Tragic decline. After his peak years, Klein began drinking heavily. The pressure of the Cubs trade, injuries (recurring hamstring pulls), and the loss of Baker Bowl's comfort zone accelerated the decline. He ran a bar in Philadelphia's Kensington neighborhood after retirement. The drinking worsened. He developed a disease of the central nervous system that left him semi-invalid. He moved back to Indianapolis to live with relatives. He died at 53 of a cerebral hemorrhage. The HOF elected him 22 years after his death, following a letter-writing campaign by a schoolteacher and Klein's sister-in-law.",
    era_adaptability: "MEDIUM-HIGH. Klein's raw power and contact skills would translate to any era. His .386 BA in 1930 was inflated by the era (NL batted .303) and the park, but his OPS+ of 157 means he was genuinely elite after adjustments. His defensive skills — arm, positioning, wall play — would be valuable anywhere. His speed was average. The biggest question is whether his power numbers survive without Baker Bowl. Park-adjusted, he's still a .310/30 HR hitter with elite defense in RF.",
    clubhouse_impact: "WARM AND STEADY. Klein was beloved in Philadelphia. The fans adored him because he was the only bright spot on terrible teams. He thrived in the low-pressure Phillies environment. When traded to the Cubs, the pressure changed him — he admitted feeling intense stress to be Chicago's 'next great slugger.' He performed best when left alone to play. Not a leader, not a disruptor — a steady, reliable star who needed a comfortable environment.",
    dark_side: "Alcoholism and early death. Klein's drinking began in earnest in the mid-1930s, coinciding with his move to Chicago and the pressure that came with it. The injuries (hamstring pulls, charley horses) may have been exacerbated by drinking. After retirement, he ran a bar — the worst possible environment for an alcoholic. He became semi-invalid from a CNS disease (likely alcohol-related). He died at 53, alone with relatives in Indianapolis, far from Philadelphia where he'd been a god. The HOF campaign took 22 years and over 1,000 letters from a schoolteacher named Dutch Doyle and Klein's sister-in-law Virginia Torpey.",
  },

  chemistry_traits: [
    { tag: "Baker Bowl Monster", desc: "+2 POW and +1 CON at Baker Bowl or any park with RF fence < 310 feet. Klein's numbers were inseparable from his home park. At standard parks: no bonus. The eternal asterisk." },
    { tag: "The Hoosier Hammer", desc: "Steel mill strength. +1 POW vs RHP. Klein built his frame tossing 200-lb ingots. The power was real — Baker Bowl just amplified it." },
    { tag: "Wall Master", desc: "+2 DEF when playing RF in any park with a wall (not open fence). Klein mastered caroms off Baker Bowl's 60-foot tin wall. He reads walls like no other outfielder." },
    { tag: "44 Assists", desc: "Klein can throw out runners at 1B from RF. Once per game, any single to right with a runner on first: 20% chance of a 9-3 putout. Unprecedented." },
    { tag: "Low-Pressure Player", desc: "+1 all stats on last-place teams. -1 all stats on pennant contenders. Klein thrived in Philadelphia's basement and wilted under Chicago's expectations." },
    { tag: "The Decline", desc: "Starting year 6, 15% chance per season of permanent -1 CON and -1 POW. Represents the injuries, drinking, and park changes that destroyed Klein's production after age 29." },
    { tag: "Four Home Runs", desc: "Once per career, Klein can hit 4 HR in a single game. 1% chance per game. If triggered: +5 team morale, permanent 'Legend' badge. Based on July 10, 1936 at Forbes Field." },
    { tag: "The 1,000 Letters", desc: "After retirement, if Klein is not inducted into HOF within 10 years, a letter-writing campaign begins. 5% chance per year of induction. Takes decades. The long road to Cooperstown." },
  ],

  preferred_locations: [
    { location: "Baker Bowl / Philadelphia", affinity: "HIGH", note: "280 feet to RF. 60-foot tin wall. Klein hit .395 with 164 HR in 581 career games here. His paradise." },
    { location: "Right Field", affinity: "HIGH", note: "44 assists in 1930. Mastered the wall. Played shallow enough to throw out runners at 1B. The position defined him." },
    { location: "Batter's Box", affinity: "HIGH", note: ".386 in 1930. 250 hits. 445 total bases. He lived in the box." },
    { location: "Steel Mill / Construction Site", affinity: "MEDIUM", note: "Where he built his body. Tossing 200-lb ingots. The blue-collar foundation." },
    { location: "Wrigley Field / Chicago", affinity: "LOW", note: "Traded to Cubs for $65K. Pressure crushed him. .301 and .293. Never the same." },
    { location: "Bar / Kensington, Philadelphia", affinity: "LOW", note: "Ran a bar after retirement. The alcoholism accelerated here." },
    { location: "Hospital / Indianapolis", affinity: "LOW", note: "CNS disease. Semi-invalid. Died at 53. The tragic ending." },
  ],

  momentum: {
    hot_triggers: [
      "Baker Bowl — the short porch, the tin wall, the caroms. His kingdom.",
      "Low expectations — last-place Phillies, no pressure, just hit. Klein thrived in obscurity.",
      "Hitting streaks — two 26-game streaks in 1930. Hit safely in 71 of 75 games at one point (.425).",
      "Doubles barrage — 59 in 1930. When the HR aren't falling, the doubles never stop.",
    ],
    cold_triggers: [
      "High-pressure environments — Cubs trade, pennant races, expectations. Klein withered.",
      "Large ballparks — Wrigley, Shibe Park, Forbes Field. Without the short porch, the HR totals dropped.",
      "Injuries — recurring hamstring pulls (charley horses) plagued him from 1934 onward.",
      "Drinking — progressive alcoholism eroded his skills, health, and eventually his life.",
    ],
    pressure_response: "UNTESTED AT THE HIGHEST LEVEL. Klein never played a meaningful pennant race with the Phillies. His one World Series appearance (1935 Cubs) was as a diminished player — he hit .333 with 1 HR, decent numbers, but the Cubs lost in 6 games to Detroit. Klein's tragedy is that he was the best player on the worst team for five straight years. When he finally reached a good team (Cubs), he was no longer the best player. The Klein who hit .386 with 40 HR never saw October. The Klein who saw October hit .293 with 21 HR.",
  },

  action_card_seeds: [
    {
      title: "The Year of the Hitter — 1930",
      type: "Game Action",
      text: "The entire National League bats .303. Six of eight teams hit over .300. Your right fielder hits .386 with 250 hits, 40 HR, 170 RBI, 158 runs, 59 doubles, 445 total bases, and 107 extra-base hits. His team goes 52-102 and finishes last. The greatest individual season on the worst team in the league.",
      origin: "1930: Klein's season is one of the 20 best offensive seasons since 1900. The Phillies' team BA was .315. Their pitching staff gave up a .346 opposing BA. They lost 102 games.",
    },
    {
      title: "Forty-Four Assists",
      type: "Game Action",
      text: "Your right fielder sets the all-time record for outfield assists in a season. He throws out 44 runners — a record that still stands nearly a century later. He plays so shallow in right field that he routinely retires batters at first base on singles. The wall is 60 feet high behind him. He has memorized every carom.",
      origin: "1930: Klein's 44 outfield assists remain the all-time single-season record. Baker Bowl's RF was 280 feet. Klein played shallow and turned singles into outs at 1B.",
    },
    {
      title: "Four Home Runs at Forbes Field",
      type: "Game Action",
      text: "Your slugger hits four home runs in a single game — not at his cozy home park, but at spacious Forbes Field in Pittsburgh. The fourth is a leadoff shot in the 10th inning that wins the game. He becomes the first NL player to do this in the modern era. Take THAT, Baker Bowl critics.",
      origin: "July 10, 1936: Klein hit 4 HR at Forbes Field vs. the Pirates, winning 9-6 in 10 innings. First NL player to do this in the modern era. Only the 4th player in MLB history.",
    },
    {
      title: "The Steel Mill Body",
      type: "Action",
      text: "Before baseball, your player worked construction and then a steel mill, tossing 200-pound ingots. The manual labor built a compact, powerful frame that would produce 300 career home runs. +1 POW permanently. The foundation was forged in fire.",
      origin: "Klein worked on a construction gang and then at a steel mill after high school. He built his 185-lb frame through industrial labor before entering professional baseball.",
    },
    {
      title: "Sold to Save the Franchise",
      type: "Drama",
      text: "Your team is bankrupt. The Great Depression has destroyed attendance. Your best player — your MVP, your Triple Crown winner — must be sold. The Cubs offer $65,000 and three players. You accept because the alternative is folding the franchise. Your star leaves. He is never the same.",
      origin: "November 1933: The Phillies traded Klein to the Cubs for $65,000 and 3 players. Attendance had dropped from 299,000 to 156,000. Owner Gerald Nugent was on the verge of bankruptcy.",
    },
    {
      title: "The Baker Bowl Asterisk",
      type: "Drama",
      text: "Your player's numbers are extraordinary — but everyone whispers about the park. RF is 280 feet. The wall is tin. The pitching staff is terrible. How much of the greatness is real? He hit 164 of 300 career HR at home. But his OPS+ is still 137 after park adjustment. The debate never ends.",
      origin: "Klein's entire career is shadowed by Baker Bowl. Park-adjusted estimates reduce his HR total by ~38. But his road stats were still very good (.310+ BA, solid power). The debate delayed his HOF election by decades.",
    },
    {
      title: "The Schoolteacher's Campaign",
      type: "Drama",
      text: "Twenty-two years after your player's death, a schoolteacher in Philadelphia begins writing letters. Over 1,000 of them. His students help. Your player's sister-in-law joins the fight. They write to the Veterans Committee. They write to sportswriters. Year after year. Finally, in 1980, the call comes. Your player is in the Hall of Fame. He never lived to see it.",
      origin: "Edward 'Dutch' Doyle, a Philadelphia schoolteacher, began a letter-writing campaign in 1969. With Klein's sister-in-law Virginia Torpey, they wrote 1,000+ letters. Klein was elected in 1980.",
    },
    {
      title: "The Bar in Kensington",
      type: "Drama",
      text: "After retirement, your former star runs a bar in a middle-class neighborhood. The drinking that began during the pressure years accelerates. His health deteriorates. A central nervous system disease leaves him semi-invalid. He moves home to Indianapolis to live with relatives. He dies at 53. The Hall of Fame honors him 22 years too late.",
      origin: "Klein ran a bar in Kensington, Philadelphia after retirement. Alcoholism led to CNS disease. He died in Indianapolis on March 28, 1958, at age 53.",
    },
  ],

  art_direction: {
    face: "Compact, powerful, blue-collar. 6'0\" 185 lbs — not huge, but dense with steel mill muscle. German-American features. Honest, open face. Not intimidating — approachable. He looks like a guy who'd buy you a beer after the game. Which was, eventually, the problem.",
    attire: "Philadelphia Phillies 1930 home whites with the old 'P' on the chest. Baker Bowl's short RF wall and high tin fence should be visible behind him. The uniform should look crisp — Klein was a professional, not a slob. Number 1 on the jersey (he wore #1 during his peak years 1929-31).",
    mood: "Explosive contact. The swing — left-handed, compact, driving the ball into the tin wall or over it. Or: the throw from shallow right field, firing to first base on a single, the runner out by a step. This card should feel OFFENSIVE in both senses — an assault on the record book and a defensive weapon in RF. Baker Bowl should feel like Klein's personal cathedral.",
    style: "Depression-era Philadelphia. Faded brick, tin walls, empty stands. The Phillies drew 299,000 in 1930 and 156,000 by 1933. Klein was a god playing in a ghost town. The card should feel simultaneously triumphant (the numbers) and melancholy (the context). Gold and maroon Phillies palette.",
    reference: "The card of the man who had one of the 20 best offensive seasons in history — on the worst team in the league. The Hoosier Hammer who was forged in a steel mill and destroyed by a bottle. The HOF induction that required 1,000 letters and 22 years of waiting.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits → +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG ≥ .600 → +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples ≥ 10 → +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CON×2 + POW×2 + SPD×1 + DEF×1 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function ChuckKleinCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = KLEIN_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Compact LH swing, Phillies whites #1, Baker Bowl tin wall, shallow RF positioning, steel mill muscle]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "R", val: d.real_stats.runs },{ label: "SLG", val: d.real_stats.slg },{ label: "WAR", val: d.real_stats.war }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — 445 TB • 107 XBH • OPS+ {d.real_stats.ops_plus}</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 NL MVP 1932", "👑 Triple Crown 1933", "⭐ 2× All-Star", "🔥 4× HR Leader", "💎 300 Career HR", "📊 .320 Career BA", "🎯 44 OF Assists (Record)"].map((a, i) => (
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
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Klein's real life, become universal cards playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Hitters use CON/POW/SPD/DEF/CLU (Kirby Puckett template).</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Klein's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
