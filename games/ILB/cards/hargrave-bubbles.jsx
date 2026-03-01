// /cards/players/bubbles-hargrave.jsx
import { useState } from "react";

const HARGRAVE_DATA = {
  name: "Bubbles Hargrave",
  nickname: "The Valve",
  year: 1926,
  team: "Cincinnati Reds",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "C",
  bats: "R",
  throws: "R",
  height: '5\'9"',
  weight: "170 lbs",
  born: "July 15, 1892 — New Haven, Indiana",
  died: "February 23, 1969 — Cincinnati, Ohio (age 76). Worked as a supervisor for a valve company for 20+ years after baseball. Buried Union Cemetery, Symmes Township.",
  hof: "NOT IN COOPERSTOWN. Cincinnati Reds HOF (1962). Indiana Baseball HOF (2005). .310 career BA, 786 H, 6× consecutive .300 seasons. First catcher to win a batting title in the 20th century (1926). The crown nobody expected from the position nobody associated with hitting.",

  real_stats: {
    season: 1926,
    batting_avg: ".353",
    obp: ".404",
    slg: ".524",
    ops: ".928",
    hits: 115,
    doubles: 22,
    triples: 5,
    home_runs: 6,
    rbi: 48,
    runs: 42,
    stolen_bases: 1,
    total_bases: 171,
    games: 105,
    at_bats: 326,
    war: 3.6,
    note: "NL Batting Champion — first catcher to win in 20th century. Broke Hornsby's 6-year streak. Only 326 AB (controversial).",
    career_batting_avg: ".310",
    career_hits: 786,
    career_hr: 29,
    career_rbi: 376,
    career_games: 852,
    career_seasons: 12,
    three_hundred_streak: "6 consecutive .300 seasons (1922-1927)",
    last_pro_season: ".372 BA (1932 Buffalo, age 40)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1926 SEASON
  //
  // CON: .353 BA — NL batting champion. .404 OBP.
  //      Career .310. .300+ in 6 straight years.
  //      .372 in his LAST professional season at age 40.
  //      For a CATCHER, this is elite contact.
  //      CON = 3 (STRONG — .353 is remarkable for a catcher.
  //      But only 326 AB — the small sample size and
  //      controversial title temper the rating slightly.
  //      The 6-year .300 streak confirms it's real, not a fluke.)
  //
  // POW: 6 HR, .524 SLG. 29 career HR. Modest power.
  //      Not a power hitter — a contact hitter who played
  //      catcher. The value was the average, not the slugging.
  //      POW = 1 (BELOW AVERAGE — 6 HR in 1926, 29 career.
  //      The power was minimal. Released by Yankees partly
  //      because of "lack of power.")
  //
  // SPD: 1 SB. Catcher. 170 lbs. Not a speed player.
  //      SPD = 0 (MINIMUM — catchers aren't fast. Hargrave
  //      was no exception.)
  //
  // DEF: "A master of judgment behind the plate."
  //      Led NL catchers in fielding pct 1927.
  //      Led NL catchers in DP 1924.
  //      Caught Carl Mays, Pete Donohue, Eppa Rixey.
  //      "Fiery competitor." Respected game-caller.
  //      DEF = 2 (GOOD — the game-calling and judgment were
  //      his defensive strengths. Led catchers in fielding.
  //      A thinking catcher who managed pitching staffs well.)
  //
  // CLU: Never appeared in a World Series.
  //      Reds were in pennant race 1926 but finished 2nd.
  //      No meaningful October baseball.
  //      6th in NL MVP voting 1926.
  //      CLU = 0 (MINIMUM — no postseason. The batting title
  //      is regular-season glory only.)
  //
  // OVR: CON×2(6) + POW×1(1) + SPD×1.5(0) + DEF×0.5(1) + CLU×1.5(0) = 8 → normalized ~5
  // OVR = 5 (ROLE PLAYER) — Bubbles Hargrave. The stutterer.
  // The first catcher to win a batting title in 40 years.
  // The man who broke Hornsby's streak. The valve that
  // controlled the flow. The quietest title in NL history.
  // OVR 5 is the lowest in the Bashers — but the narrative
  // value is enormous. This card represents the overlooked,
  // the undervalued, the position player who briefly
  // outshone the greatest hitter alive.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 5,
    con: 3,    // .353 BA — NL batting champion. .310 career. .300+ in 6 straight years. .372 at age 40. Elite contact for a catcher. But only 326 AB in the title year.
    pow: 1,    // 6 HR, .524 SLG. 29 career HR. Contact hitter, not a power hitter. Released partly for "lack of power."
    spd: 0,    // 1 SB. Catcher. Not a factor on the bases.
    def: 2,    // "Master of judgment behind the plate." Led NL catchers in fielding (1927) and DP (1924). Thinking catcher. Managed pitching staffs.
    clu: 0,    // Never in a World Series. Reds finished 2nd in 1926. No October baseball. The title was a regular-season crown only.
  },

  stat_justification: {
    con: "Hargrave hit .353 in 1926 to win the NL batting title — the first catcher to do so in the 20th century (first since King Kelly in 1886). He broke Rogers Hornsby's six-consecutive-year hold on the NL batting crown. Career: .310 BA with 6 consecutive .300 seasons (1922-1927). He hit .372 in his final professional season at age 40. The contact was genuine and sustained. However, the 1926 title came in only 326 AB (105 games, with pinch-hit appearances to reach the 100-game minimum). The small sample and controversial qualification temper the rating slightly, but the 6-year .300 streak confirms the skill was real. Rating of 3.",
    pow: "Hargrave hit 6 home runs in 1926 with a .524 SLG. Career: 29 HR in 852 games over 12 seasons. He was released by the Yankees partly because of 'lack of power and speed.' He was a pure contact hitter who used line-drive approach rather than power. For a catcher in the 1920s, this was not unusual, but it limits the power rating. Rating of 1.",
    spd: "Hargrave stole 1 base in 1926. He was a catcher carrying moderate weight on a 5'9\" frame. Speed was never a tool. Rating of 0.",
    def: "Hargrave was described as 'a master of judgment behind the plate' and 'a fiery competitor.' He led NL catchers in fielding percentage in 1927 and in double plays in 1924. He caught for a staff that included Carl Mays, Pete Donohue, and Eppa Rixey — managing diverse pitching personalities. His value behind the plate was in game-calling and staff management, not arm strength or blocking. Rating of 2.",
    clu: "Hargrave never appeared in a World Series. The 1926 Reds were in the pennant race but finished second to the Cardinals. He finished 6th in NL MVP voting that year. Without any postseason experience, the clutch rating cannot be assessed positively. Rating of 0.",
  },

  personality: {
    leadership_style: "QUIET AUTHORITY FROM BEHIND THE PLATE. Catchers lead differently — they lead by controlling the game, calling pitches, managing pitching staffs, and absorbing punishment. Hargrave was 'a master of judgment behind the plate' — his leadership was invisible to the stands but felt by every pitcher he caught. He didn't command the clubhouse. He commanded the battery.",
    temperament: "FIERY UNDERNEATH, STUTTERING ON TOP. Hargrave was described as 'a fiery competitor' and 'peppery.' But he also stuttered — badly enough that his teammates named him 'Bubbles' for the way he said words starting with 'B.' He HATED the nickname. The fire was genuine; the voice that expressed it was unreliable. Like Cuyler, the stutter shaped the man — teaching him to communicate through action rather than words, through judgment rather than speeches.",
    work_ethic: "PERSISTENCE THROUGH FAILURE. Hargrave hit .207 in his first MLB trial (Cubs, 1913-1915). He spent FIVE YEARS in the minors rebuilding his swing. He came back to hit .310 for his career. His father didn't want him to play baseball — he tried the upholstery business first. The work ethic was PATIENT — the long development, the willingness to fail and return, the craftsmanship of a hitter who built himself one minor-league season at a time.",
    lifestyle: "BLUE-COLLAR INDIANA. Born in New Haven, Indiana. Brother Pinky was also a catcher. Father opposed baseball. Tried upholstery. Spent 5 years in the minors. Won a batting title. Worked for a valve company for 20+ years after retirement. Died in Cincinnati. This is the most WORKING-CLASS card in the Bashers — no architecture degrees, no cattle ranches, no Broadway. Just catching, hitting, and opening valves.",
    era_adaptability: "LOW TO MODERATE. Hargrave's batting skills (.310 career, .353 title) would translate, but his lack of power (29 career HR) and speed would limit his value in modern baseball. Modern catchers are expected to contribute power — Hargrave would be a .280 hitter with 8 HR, valuable for framing and game-calling but undersized offensively. His game-management skills might translate better than his bat.",
    clubhouse_impact: "MODERATE POSITIVE. Hargrave was a catcher — the position of clubhouse glue. He managed diverse pitching staffs (including the difficult Carl Mays) and earned respect through judgment and durability. Not a morale leader like Bottomley, but a structural presence — the person who holds the battery together. In ILB, +1 to all pitchers' effectiveness when Hargrave is behind the plate.",
    tragic_element: "THE ASTERISK. Hargrave won the NL batting title in 1926. It was debated for months. His 326 AB were well below what modern standards would require. Some record books don't list him as champion. The first catcher in 40 years to win a batting title, and the title itself came with a footnote. The stutterer who hated his name won a crown that some people said didn't count. Even the triumph was qualified. Even the glory came with an asterisk.",
  },

  chemistry_traits: [
    { tag: "The Stutterer's Crown", desc: "Hargrave stuttered on 'B' sounds — hence 'Bubbles,' a name he despised. Cuyler stuttered too. In ILB, when Hargrave and Cuyler are on the same team, both receive +1 to composure. Two men who learned to speak through action, not words. The stutterers' alliance." },
    { tag: "Hornsby's Streak-Breaker", desc: "1926: Hargrave's .353 broke Hornsby's six-year hold on the NL batting crown. Hornsby 'slumped' to .317. In ILB, Hargrave has +2 CON when competing for the batting title against an OVR 10+ hitter. The underdog swings harder when the giant stumbles." },
    { tag: "The Controversial Crown", desc: "326 AB. 105 games (padded with pinch-hit appearances). Debated for months. Some record books don't list him. In ILB, Hargrave's batting title carries an asterisk — opponents may CHALLENGE the title if Hargrave has fewer than 400 AB. The crown is always contested." },
    { tag: "Master of Judgment", desc: "'A master of judgment behind the plate.' In ILB, Hargrave provides +1 to all pitchers' CTL (control) rating when catching. The game-calling is the hidden weapon. The catcher's mind is the pitcher's best pitch." },
    { tag: "Mays's Catcher", desc: "Hargrave caught Carl Mays for the 1926 Reds. Mays — the death-pitch pariah — won 19 games that year. In ILB, when Hargrave catches Mays, Mays receives +1 STF and -1 to the HBP danger roll. The master of judgment controls even the submarine." },
    { tag: "The Five-Year Rebuild", desc: "Hit .207 with Cubs (1913-1915). Spent 5 years in the minors. Came back to hit .310 career. In ILB, Hargrave has +1 to all stats after being sent down and recalled. The failure was the education." },
    { tag: "Bubbles and Pinky", desc: "Brothers. Both ML catchers. Most amusing nickname combination in baseball history. In ILB, if another Hargrave card exists, both receive +1 to morale. Family is the foundation beneath the battery." },
    { tag: "The Valve", desc: "After baseball, Hargrave worked as a valve company supervisor for 20+ years. A valve controls flow — and that's what Hargrave did behind the plate. In ILB, Hargrave 'controls the flow' of the game: when catching, the opponent's momentum triggers are reduced by 1. The valve regulates." },
  ],

  preferred_locations: [
    { location: "Redland Field, Cincinnati", affinity: "MAXIMUM / HOME", note: "1921-1928. Eight seasons. Six .300 years. The batting title. The pennant race. The place where the stutterer found his voice in the bat." },
    { location: "Behind the Plate", affinity: "IDENTITY", note: "Hargrave's true home was behind the plate — calling pitches, managing staffs, controlling the game. The catcher's crouch was his drafting table." },
    { location: "The Minor Leagues", affinity: "REBIRTH", note: "Five years (1916-1920) rebuilding after .207 with Cubs. Hit .335 with St. Paul in 1920. The wilderness that made him." },
    { location: "The Valve Company", affinity: "RETIREMENT", note: "20+ years as a supervisor. A valve controls flow. So did Bubbles. The metaphor writes itself." },
  ],

  momentum: {
    hot_triggers: [
      "1926 batting race — Hargrave's .432 by end of May, .424 by end of June. When locked into a batting race, he elevated beyond his normal level.",
      "Pitching staff chemistry — when Hargrave was in sync with his pitchers, the whole team performed better. His hot streaks correlated with team streaks.",
      "Line-drive approach — Hargrave was a pure line-drive hitter. When his timing was right, everything was a sharp single or double.",
    ],
    cold_triggers: [
      "Durability — catchers of the 1920s wore down. Hargrave's games caught rarely exceeded 100. Extended absence dulled his timing.",
      "Late-season fatigue — the 1926 title came with only 105 games. The body couldn't sustain a full 154-game season behind the plate.",
      "Power drought — Hargrave's lack of HR meant cold streaks produced almost no production. No power to compensate for lost contact.",
    ],
    pressure_response: "UNKNOWN BUT PROMISING. Hargrave never played in October. But the 1926 batting race — maintaining .353 through a pennant chase with national attention — suggests he could handle pressure. The stutterer who won the crown didn't choke under scrutiny. CLU = 0 reflects absence of data, not evidence of failure.",
  },

  action_card_seeds: [
    {
      title: "The Stutterer's Crown",
      type: "Achievement / Identity",
      text: "1926. Your catcher stutters. When he tries to say words that start with 'B,' the syllable repeats — b-b-b-bubbles. His teammates call him Bubbles. He hates it. He hits .432 by the end of May. He hits .424 by the end of June. Rogers Hornsby — the greatest right-handed hitter alive, winner of six consecutive NL batting titles — slumps to .317. Your catcher finishes at .353. He wins the crown. He is the first catcher to win a batting title in forty years. The stutterer who couldn't say his own position ('B-b-b-backstop') can hit better than anyone in the National League. The mouth failed him. The hands never did.",
      origin: "Hargrave's 1926 NL batting title — .353, first catcher since 1886. Broke Hornsby's streak.",
    },
    {
      title: "The Asterisk",
      type: "Controversy / Legacy",
      text: "Your catcher wins the batting title. Then the debate begins. He has only 326 at-bats. Only 105 games — and some of those were pinch-hit appearances to reach the 100-game minimum. Rube Bressler hit .357 but played fewer games. Paul Waner hit .336 in 144 games and 618 plate appearances. The Sporting News deliberates for months. NL President Heydler rules in your catcher's favor. Some record books list him. Others don't. The crown is his. The footnote is also his. Forty years from now, people will still argue about whether a catcher with 326 at-bats deserves a batting title. Your catcher won't be alive to hear them.",
      origin: "The controversial 1926 batting title — 326 AB, 105 games, months of debate.",
    },
    {
      title: "The Five-Year Rebuild",
      type: "Origin / Persistence",
      text: "1913-1915. Your catcher hits .207 for the Chicago Cubs. He cannot hold a starting job. He is sent to the minor leagues. He stays there for five years. Five years of buses and small towns and catching in the heat. Five years of rebuilding the swing, learning to read pitchers, studying the geometry of contact. In 1920, he hits .335 for St. Paul. The Cincinnati Reds bring him back. He hits .300 for six consecutive seasons. He wins a batting title. The five years in the wilderness were not punishment. They were education. The valve was being calibrated.",
      origin: "Hargrave's .207 with Cubs, 5 years in minors, .310 career upon return.",
    },
    {
      title: "Bubbles and Pinky",
      type: "Character / Family",
      text: "Your catcher's name is Bubbles. His brother's name is Pinky. Both are catchers. Both play in the major leagues. In 1930, both play in the American League simultaneously — Bubbles for the Yankees, Pinky for the Tigers and Senators. They are from New Haven, Indiana. They have freckles and short hair and peppery dispositions. They are the most amusingly named pair of brothers in baseball history. The stutterer and the blusher, both crouching behind home plate, both catching the national pastime. Their father didn't want either of them to play.",
      origin: "Brothers Bubbles and Pinky Hargrave — both ML catchers, both from Indiana.",
    },
  ],

  art_direction: {
    face: "5'9\" 170 lbs — compact, solid, WEATHERED. A catcher's face: broken nose possible, jaw set, eyes sharp and reading the batter. The face of a man who calls pitches and controls games and hates his own nickname. There should be something DETERMINED in this face — the determination of a man who hit .207, spent five years in the minors, and came back to win a batting title. Not handsome. Not ugly. FUNCTIONAL — every feature serving a purpose, like a well-designed valve.",
    attire: "Cincinnati Reds 1926 home whites. In the catcher's crouch — shin guards, chest protector (primitive 1920s style), mask pushed up on forehead, giving the sign. Or: at the plate, compact right-handed stance, driving a line drive. The body should look DURABLE — not big, not fast, but SOLID. Built to absorb foul tips and keep catching.",
    mood: "WARM WORKMANSHIP. This card is not glamorous or dramatic — it is CRAFTED. The mood is a well-made tool: functional, reliable, quietly satisfying. The warmth comes from the craft — the satisfaction of a man who rebuilt himself in the minors and won a crown. No fireworks. No shadows. Just the steady warmth of competence.",
    style: "Full color — Bashers era — REDS RED AND HONEST BROWN. Cincinnati red, leather brown, warm cream. The palette of a catcher's gear and a working man's hands. Simple, warm, unpretentious. The border should be CATCHER'S BROWN — the color of a well-worn mitt, the leather that absorbs everything. THE VALVE — the card that controls flow without anyone noticing. The smallest card in the Bashers, with the most unexpected title. The card that fits in your palm like a baseball.",
    reference: "Ruth is the solar system. Hornsby is the blade. Wilson is the barrel. Cy Williams is the blueprint. Bubbles Hargrave is THE VALVE — the smallest, quietest, most overlooked component in the machine, but the one that controls the flow. Remove the valve and the system floods. Remove the valve and the pressure has no regulation. He is the card that makes you wonder: what if every catcher could hit .353? What if the position you least expect to produce a batting champion is the one that does?",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", redsRed: "#c6011f", catcherBrown: "#8b6914", leatherBrown: "#a67c52" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.redsRed}08`, border: `1px solid ${C.redsRed}20`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.redsRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.redsRed, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.redsRed}20`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function BubblesHargraveCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = HARGRAVE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.leatherBrown}60 0%, ${C.redsRed}25 50%, ${C.leatherBrown}60 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.cream, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.catcherBrown, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ROLE PLAYER CARD — Bashers Era — The Valve</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.catcherBrown}`, boxShadow: `0 0 0 2px ${C.redsRed}40, 0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.leatherBrown}, ${C.redsRed}, ${C.leatherBrown})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.cream, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.catcherBrown}25`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.leatherBrown}08, ${C.redsRed}03)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🧤</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.catcherBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE VALVE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.catcherBrown, color: C.cream, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.redsRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.catcherBrown}dd`, color: C.cream, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ROLE PLAYER • 1926 NL BATTING CHAMPION</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.redsRed, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>born Eugene Franklin Hargrave • stuttered on "B" sounds</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.redsRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.catcherBrown} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.sepia} />
              <StatBar label="DEF" value={s.def} max={3} color={C.leatherBrown} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.redsRed}, ${C.catcherBrown})`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".353" },{ label: "OPS", val: ".928" },{ label: "H", val: "115" },{ label: "G", val: "105" },{ label: "HR", val: "6" },{ label: "RBI", val: "48" },{ label: "AB", val: "326" },{ label: "WAR", val: "3.6" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ background: `${C.redsRed}10`, border: `1px solid ${C.redsRed}25`, borderRadius: 4, padding: 8, marginTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 900, color: C.redsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>FIRST CATCHER TO WIN NL BATTING TITLE</div>
              <div style={{ fontSize: 10, color: C.ink, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>IN THE 20TH CENTURY (since King Kelly, 1886)</div>
              <div style={{ fontSize: 9, color: C.sepia, fontStyle: "italic", marginTop: 4 }}>Broke Rogers Hornsby's 6-year streak. Debated for months. 326 AB.*</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.catcherBrown}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.catcherBrown}15` }}>
              {[{ label: "CAR AVG", val: ".310" },{ label: "CAR H", val: "786" },{ label: ".300 STK", val: "6 yr" },{ label: "SEASONS", val: "12" },{ label: "CAR HR", val: "29" },{ label: "WS RINGS", val: "0" },{ label: "AGE 40", val: ".372" },{ label: "HOF", val: "✗" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.catcherBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.5 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 1926 NL Batting Champ*", "🗣️ Stuttered on 'B'", "🧤 Master of Judgment", "📉 .207 → .310 Career", "👨‍👦 Brother Pinky (also C)", "🔧 Valve Company 20yr", "⚾ Caught Carl Mays"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.catcherBrown}08`, border: `1px solid ${C.catcherBrown}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.redsRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ROLE PLAYER DOSSIER — {d.year} — THE VALVE</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.redsRed}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.redsRed : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.redsRed : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚠ THE ASTERISK" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.warmRed } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.redsRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: `${C.catcherBrown}15`, color: C.catcherBrown, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.redsRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.catcherBrown}05`, border: `1px solid ${C.catcherBrown}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: `${C.redsRed}12`, color: C.redsRed, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.leatherBrown}, ${C.redsRed}, ${C.leatherBrown})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.cream, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ROLE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
