// /cards/players/cy-williams.jsx
import { useState } from "react";

const WILLIAMS_DATA = {
  name: "Cy Williams",
  nickname: "The Architect",
  year: 1923,
  team: "Philadelphia Phillies",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "CF",
  bats: "L",
  throws: "L",
  height: '6\'2"',
  weight: "180 lbs",
  born: "December 21, 1887 — Wadena, Indiana",
  died: "April 23, 1974 — Eagle River, Wisconsin (age 86). The longest-lived Basher. Married 65 years. Architect, farmer, builder, painter. Cy Williams Park dedicated in his honor, 1966.",
  hof: "NOT INDUCTED. .292 career BA, 251 HR (1st NL player to 200), 1,981 H, 37.4 WAR. 4× NL HR leader. NL career HR leader until Hornsby (1929). The original shift. The original power hitter. Philadelphia Phillies Wall of Fame (1985). Not in Cooperstown — the man who INVENTED the shift problem never got the recognition the problem itself eventually received.",

  real_stats: {
    season: 1923,
    batting_avg: ".293",
    obp: ".388",
    slg: ".552",
    ops: ".940",
    hits: 163,
    doubles: 22,
    triples: 3,
    home_runs: 41,
    rbi: 114,
    runs: 98,
    stolen_bases: 4,
    total_bases: 307,
    games: 138,
    war: 5.8,
    note: "41 HR tied Babe Ruth for the major league lead. Led NL by 19 HR over runner-up.",
    career_batting_avg: ".292",
    career_hits: 1981,
    career_hr: 251,
    career_rbi: 1005,
    career_war: 37.4,
    career_seasons: 19,
    hr_titles: "4× NL HR leader (1916, 1920, 1923, 1927)",
    first_nl_200_hr: "First NL player to hit 200 career HR",
    managers: "14 different managers in first 14 seasons (including Tinker, Evers, AND Chance)",
    shift: "THE ORIGINAL — defensive shift first employed against Cy Williams in the 1920s",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB BATTER STAT CONVERSION — 1923 SEASON
  //
  // CON: .293 BA, 163 H, .388 OBP. Career .292.
  //      Not a pure contact hitter. Dead-pull lefty who swung
  //      for HR. Shifted against — and still hit .293.
  //      But never a .300+ hitter consistently (6 of 19 seasons).
  //      CON = 2 (SOLID — .293 is respectable, especially
  //      against the shift. But not elite contact.)
  //
  // POW: 41 HR — tied Babe Ruth for ML lead. Led NL by 19 over
  //      runner-up. 251 career HR. First NL player to 200.
  //      4× NL HR leader across both dead-ball and live-ball eras.
  //      .552 SLG. The power was REAL and historically significant.
  //      POW = 4 (NEAR-MAXIMUM — 41 HR tying Ruth in 1923 is
  //      elite. 251 career HR as a CF. 4× HR leader. One of the
  //      most prolific power hitters of the era. Not quite Ruth/
  //      Wilson tier (no 50+ season) but just below.)
  //
  // SPD: "The fastest runner in the national game" (1915).
  //      12 inside-the-park HR. Hit for the cycle (1927).
  //      Turned down 1912 Olympics as hurdler/broad jumper.
  //      But by 1923 he was 35. The speed had faded.
  //      SPD = 2 (SOLID — elite speed when young (Olympic caliber!)
  //      but diminished by 1923. Still adequate at 35 in CF.
  //      The IPHR and athletic background earn the 2.)
  //
  // DEF: "The greatest natural outfielder I ever saw" (Tinker).
  //      Played CF for most of career. Good range, decent reads.
  //      BUT: "a fatal weakness: he possessed a poor throwing arm."
  //      DEF = 1 (the arm was genuinely bad. The range and instincts
  //      were good but the arm limited his defensive value.
  //      Tinker's praise and the weak arm balance to adequate.)
  //
  // CLU: Never appeared in a World Series with the Phillies.
  //      Played in 1924 WS with the Giants — 0-for-2.
  //      No rings. Career on terrible Phillies teams.
  //      41 HR in 1923 — Phillies finished last (50-104).
  //      CLU = 0 (MINIMUM — no meaningful postseason.
  //      His greatest seasons were on the worst teams.
  //      The power existed in a vacuum of team success.)
  //
  // OVR: CON×2(4) + POW×1(4) + SPD×1.5(3) + DEF×0.5(0.5) + CLU×1.5(0) = 11.5 → normalized ~6
  // OVR = 6 (SOLID STARTER) — The Architect. The man who
  // designed buildings and home runs. The FIRST player the
  // shift was invented for. The man who tied Babe Ruth and
  // nobody noticed because he played for the Phillies.
  // The OVR is lower than the talent because of terrible
  // team context and no postseason. The architecture was
  // perfect. The franchise was rubble.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 6,
    con: 2,    // .293 BA, .388 OBP. Career .292. Respectable against the shift but not elite contact. Dead-pull lefty who prioritized power.
    pow: 4,    // 41 HR tied Babe Ruth for ML lead. 251 career HR. First NL player to 200. 4× HR leader across dead-ball and live-ball eras. Elite power.
    spd: 2,    // Olympic-caliber speed in youth (turned down 1912 Stockholm). 12 IPHR. But diminished by 35. Hit for the cycle at 39.
    def: 1,    // "Greatest natural outfielder" (Tinker) but "fatal weakness: poor throwing arm." Range excellent, arm terrible. Balance = adequate.
    clu: 0,    // Never won a WS. 0-for-2 in only WS appearance. 41 HR on a 50-104 team. Career on last-place Phillies. The power existed in a vacuum.
  },

  stat_justification: {
    con: "Williams hit .293 in 1923 with 163 hits and a .388 OBP. Career: .292 BA, 1,981 hits. He hit .300 or better in 6 of 19 seasons, with a high of .345 in 1926. He was a dead-pull left-handed hitter who faced the FIRST defensive shift in MLB history — managers loaded the right side against him. That he still hit .293 against the shift is notable, but he was never a pure contact hitter. He prioritized home runs over batting average. Rating of 2.",
    pow: "Williams hit 41 home runs in 1923, tying Babe Ruth for the major league lead and beating the NL runner-up by 19 HR. He led the NL in HR four times (1916, 1920, 1923, 1927) — spanning both the dead-ball and live-ball eras. He was the first NL player to hit 200 career HR and held the NL career HR record (251) until Hornsby passed him in 1929. Only three players born before 1900 hit 200 career HR: Ruth, Hornsby, and Williams. His power was legitimate and historically significant — not inflated by Baker Bowl alone (Lederer study). Rating of 4.",
    spd: "In his youth, Williams was described as 'the fastest runner in the national game.' He turned down a spot on the 1912 U.S. Olympic team as a hurdler and broad jumper. He hit 12 inside-the-park home runs and hit for the cycle at age 39 (1927). But by his peak power years in the 1920s, the speed had diminished — he stole only 4 bases in 1923. The Olympic athletic base earns him more than minimum, but at 35 he was no longer elite. Rating of 2.",
    def: "Joe Tinker called Williams 'the greatest natural outfielder I ever saw.' He played center field for most of his career with excellent range and good instincts. However, a Sporting News correspondent wrote that 'he possessed a poor throwing arm' — described as his 'fatal weakness.' He led NL outfielders in assists in 1921 (suggesting he was tested despite the weak arm). The range and the arm create a conflicting profile that averages to adequate. Rating of 1.",
    clu: "Williams never won a World Series. His only WS appearance was with the Giants in 1924 (0-for-2 as a pinch hitter). His greatest power seasons were on terrible Phillies teams — in 1923, when he hit 41 HR to tie Ruth, the Phillies finished last at 50-104. His power existed in a context of total team failure. This is the lowest possible clutch rating, reflecting not a personal failing but a structural absence of meaningful October baseball. Rating of 0.",
  },

  personality: {
    leadership_style: "QUIET PROFESSIONAL. Williams was not a rah-rah leader or a fiery competitor. He was an architect — a man who designed structures, understood blueprints, and approached hitting with the same analytical precision. He played 19 seasons under 14 different managers without complaint. He endured last-place Phillies teams for over a decade without requesting a trade. The leadership was ENDURANCE — showing up every day, hitting home runs into the shift, and going home to design buildings.",
    temperament: "CEREBRAL AND SELF-CONTAINED. Williams was a Notre Dame-educated architect who played football with Knute Rockne, turned down the Olympics, and designed buildings in his spare time. He was not a Prohibition-era hell-raiser like Wilson or a caustic truth-teller like Hornsby. He was a thinking man who happened to hit baseballs extremely far. The temperament was PROFESSIONAL — controlled, intelligent, and quietly persistent.",
    work_ethic: "DUAL-CAREER EXCELLENCE. Williams maintained two careers simultaneously — professional baseball player and architect. He bought a 440-acre dairy farm in Wisconsin during his playing career. He studied architecture at Notre Dame and practiced it after retirement. The work ethic was ARCHITECTURAL — build something, maintain it, improve it over time. His batting average increased every year from 1918 onward. He was still hitting 30 HR at age 39.",
    lifestyle: "RENAISSANCE MAN. Architecture degree from Notre Dame. Olympic-caliber hurdler/broad jumper. Football teammate of Knute Rockne. Professional baseball player for 19 seasons. Dairy farmer (440 acres). Architect and construction company founder. Painter (right-handed despite being a lefty athlete). Hunted and fished with Ted Williams. Married Vada for 65 years. Four children. Died at 86. This is the most complete LIFE in the Bashers — the man who did everything and lived longest.",
    era_adaptability: "HIGH. Williams' dead-pull power would generate enormous attention in modern baseball. He'd be the PROTOTYPE for the modern shift debate — the player around whom the entire strategy revolves. His 41 HR tying Ruth in 1923 suggests elite power that would translate to 40+ HR in modern contexts. The shift would reduce his BA further, but launch-angle analytics might help him adjust. He'd be a .250 hitter with 45 HR — a classic modern power hitter.",
    clubhouse_impact: "NEUTRAL POSITIVE. Williams was not a clubhouse force in either direction. He was professional, reliable, and quiet. He didn't elevate teammates through charisma (Bottomley) or intimidation (Hornsby). He simply produced. In ILB, Williams provides +0 to team morale and +1 to team offensive consistency. The architect doesn't inspire the building. He just makes sure it stands.",
    tragic_element: "NOT TRAGIC — INVISIBLE. Cy Williams' tragedy is not death or decline but OBSCURITY. He tied Babe Ruth for the ML HR lead in 1923. He was the first NL player to 200 career HR. He invented the shift. He played 19 seasons. He hit 30 HR at 39. And he is essentially forgotten — not in the HOF, not remembered by casual fans, not part of baseball's popular narrative. The architect designed something beautiful and nobody put his name on it. The shift was renamed for Ted Williams. The HR records were broken by Hornsby. The Phillies never won. The blueprint survives. The architect does not.",
  },

  chemistry_traits: [
    { tag: "The Original Shift", desc: "NL managers invented the defensive shift to stop Cy Williams — decades before Ted Williams. In ILB, when the shift is deployed against Williams, he loses -1 CON but gains +1 POW (he swings harder into the shift, accepting lower average for more HR). The shift is his creation. He owns it." },
    { tag: "The Architect", desc: "Notre Dame architecture degree. Designed buildings, a theatre, a resort community. In ILB, Williams provides +1 to TEAM CONSTRUCTION — when building a roster around Williams, surrounding players fit together more efficiently. The architect sees how pieces connect." },
    { tag: "Olympic Refusal", desc: "Turned down the 1912 Stockholm Olympics (hurdling/broad jump) to play baseball. In ILB, Williams has a permanent hidden SPD modifier — his athletic base is Olympic-caliber even when the visible SPD rating doesn't show it. The raw athleticism is always there." },
    { tag: "Tinker, Evers, and Chance", desc: "Williams played under all three — separately — as Cubs managers. 14 different managers in 14 seasons. In ILB, Williams is IMMUNE to manager changes. His production does not fluctuate with coaching changes. The architect doesn't need a foreman." },
    { tag: "Baker Bowl", desc: "Baker Bowl's RF fence was 280 feet. Perfect for a dead-pull lefty. In ILB, Williams has +2 POW in small parks but -1 POW in large parks. The architecture of the stadium matters. But Lederer's study proved he'd be great anywhere." },
    { tag: "Ruth's Equal (1923)", desc: "41 HR — tied Babe Ruth for the major league lead. Nobody noticed because Williams played for the last-place Phillies. In ILB, when Williams's HR total matches or exceeds the set's highest-OVR slugger, he receives +0 recognition. The blueprint is invisible." },
    { tag: "The Longest Life", desc: "Died at 86 — the longest-lived Basher. Married 65 years. Architect, farmer, painter, builder. In ILB, Williams has the highest post-career contentment of any non-Bottomley card. The man who lived quietly and fully. The happiest architect." },
    { tag: "Two Williams, One Shift", desc: "Cy Williams and Ted Williams: both lefty sluggers, both shifted against, both hunted and fished together in Wisconsin. In ILB, the original and the successor are linked across eras. The blueprint Cy drew, Ted inherited." },
  ],

  preferred_locations: [
    { location: "Baker Bowl, Philadelphia", affinity: "MAXIMUM / HOME", note: "280 feet to right field. The shortest fence in baseball. The architect's perfect canvas. 217 HR in 13 seasons." },
    { location: "The Drafting Table", affinity: "IDENTITY", note: "Williams was an architect first and a baseball player second — or maybe simultaneously. The precision of design and the precision of the swing were the same skill." },
    { location: "Three Lakes, Wisconsin", affinity: "HOME / RETIREMENT", note: "440-acre dairy farm. Williams Construction Company. 3 Lakes Theatre. Cy Williams Park. Hunting with Ted Williams. 65 years married. The longest, fullest life." },
    { location: "Last Place", affinity: "CONTEXT", note: "The Phillies finished last or near-last for most of Williams's tenure. 41 HR on a 50-104 team. The architect built in a wasteland." },
  ],

  momentum: {
    hot_triggers: [
      "Baker Bowl — the short RF fence was Williams's launch pad. Home splits were consistently superior to road splits.",
      "Against right-handed pitching — as a lefty hitter, Williams crushed RHP throughout his career.",
      "Aging power — Williams hit 30 HR at age 39 and hit for the cycle the same year. The power aged better than any other tool.",
      "Season-long consistency — Williams raised his career BA every year from 1918 onward. Slow burns, not hot streaks.",
    ],
    cold_triggers: [
      "The shift — when employed effectively, the shift reduced Williams's batting average. He traded contact for power willingly but the average suffered.",
      "Large parks — away from Baker Bowl's short fence, Williams's HR totals dropped. The architecture mattered.",
      "October absence — Williams never played meaningful October baseball with the Phillies. No postseason pressure to respond to.",
      "Weak arm — the throwing limitation occasionally cost him in critical defensive situations.",
    ],
    pressure_response: "UNKNOWN. Williams never experienced meaningful postseason pressure with the Phillies. His only WS appearance (1924 Giants, pinch-hit role) was 0-for-2. CLU = 0 reflects this absence rather than a personal failing. The architect never got to build in October.",
  },

  action_card_seeds: [
    {
      title: "Forty-One",
      type: "Achievement / Invisibility",
      text: "1923. Your center fielder hits 41 home runs. This ties Babe Ruth for the major league lead. He leads the NL runner-up by 19 home runs — the largest margin of any NL HR leader in the decade. He drives in 114 runs. He slugs .552. The Phillies finish 50-104. Last place. The worst team in the National League. Nobody notices that your center fielder has tied the most famous hitter in the history of the game. The blueprint is perfect. The building is condemned.",
      origin: "Williams's 41 HR in 1923, tying Ruth, on the last-place Phillies (50-104).",
    },
    {
      title: "The First Shift",
      type: "Innovation / Legacy",
      text: "Your center fielder is a dead-pull left-handed hitter. He rarely hits the ball to left field. National League managers notice. They move the second baseman to shallow right field. They push the outfielders toward the right-field foul line. They stack the right side. It is the first time in baseball history that a defensive alignment has been designed specifically to stop one hitter. It will later be called the 'Williams Shift' — but not for your center fielder. For another Williams, decades later, who faced the same strategy. Your center fielder drew the blueprint. Someone else got the nameplate.",
      origin: "The defensive shift was first employed against Cy Williams in the 1920s. Later known as the 'Ted Williams Shift.'",
    },
    {
      title: "The Olympics or the Bat",
      type: "Origin / Choice",
      text: "1912. Your center fielder graduates from the University of Notre Dame with a degree in architecture. He has played football with Knute Rockne. He is offered a spot on the United States Olympic team — hurdler and broad jumper — for the Stockholm Games. He declines. He chooses baseball. He goes directly to the Chicago Cubs without playing a single minor league game. He plays under Tinker. Then Evers. Then Chance. Fourteen different managers in fourteen seasons. He ties Babe Ruth. He hits 251 home runs. He designs a theatre in Three Lakes, Wisconsin. He made the right choice. Both times.",
      origin: "Williams turned down the 1912 Olympics. Notre Dame with Rockne. Played under Tinker, Evers, and Chance.",
    },
    {
      title: "The Architect's Retirement",
      type: "Legacy / Fulfillment",
      text: "After nineteen seasons, your center fielder retires. He does not open a pool hall. He does not tend bar. He does not sing for drinks. He returns to his 440-acre dairy farm in Three Lakes, Wisconsin. He opens the Williams Construction Company. He designs buildings — homes, resorts, a theatre. He paints landscapes right-handed (though he bats left). He hunts and fishes with another Williams — Ted, who also hits from the left side and will also have a shift named for him. He is married to Vada for sixty-five years. He has four children. A park is named for him. He dies at eighty-six. The longest life in the Bashers. The quietest ending. The happiest blueprint.",
      origin: "Williams's post-career — architect, farmer, builder, painter. Married 65 years. Died at 86.",
    },
  ],

  art_direction: {
    face: "6'2\" 180 lbs — tall, lean, ANGULAR. An architect's face: precise features, observant eyes, a face that measures and designs before it acts. Not flashy. Not dark. Not sunny. THOUGHTFUL. This is the face of a man who designs buildings and home runs with the same part of his brain. Clean-shaven, strong jaw, steady gaze. The expression is QUIET CONFIDENCE — not Hornsby's cold supremacy, not Wilson's explosiveness, but the calm certainty of a man who has calculated the trajectory and knows where the ball will land.",
    attire: "Philadelphia Phillies 1923 home whites. LEFT-HANDED batting stance — open, pulling everything to right field. The stance should look DELIBERATE — not wild like Wilson's barrel explosion, but ENGINEERED. Every angle calculated. The bat path is a line drawn on a blueprint. Baker Bowl should be suggested in the background — the short right-field fence, the canvas where the architect painted.",
    mood: "CLEAN AND PRECISE. This card is neither dark nor light — it is CLEAR. The clarity of a blueprint. The precision of a drafted line. No excess emotion. No shadow play. No fireworks. Just the clean geometry of a home run hit exactly where it was designed to land. The mood is PROFESSIONAL — the satisfaction of good work done well.",
    style: "Full color — Bashers era — CLEAN LINES AND WARM NEUTRALS. Phillies red (muted, not bright), cream, drafting-table tan, blueprint blue (faint). This is not a flashy card — it is a WELL-DESIGNED card. The border should be BLUEPRINT BLUE — the faded blue of architectural drawings, the color of precision and planning. THE ARCHITECT — the card that was designed before it was built. The most DESIGNED object in the Bashers constellation. Not the brightest. Not the darkest. The most INTENTIONAL.",
    reference: "Ruth is the solar system. Hornsby is the blade. Wilson is the barrel. Cy Williams is THE BLUEPRINT — the design that precedes the structure, the plan that nobody credits, the architecture of power hitting that everyone uses and nobody attributes. He is the invisible foundation. The card you don't notice until you realize the entire building is standing on it.",
  },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", blueprintBlue: "#4a7ca0", philliesRed: "#9e2a2b", draftTan: "#d4c5a0" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.blueprintBlue}10`, border: `1px solid ${C.blueprintBlue}20`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.blueprintBlue}25`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function CyWilliamsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = WILLIAMS_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.draftTan}80 0%, ${C.blueprintBlue}30 50%, ${C.draftTan}80 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.ink, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>SOLID STARTER CARD — Bashers Era — The Blueprint</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.blueprintBlue}`, boxShadow: `0 0 0 2px ${C.draftTan}, 0 0 20px ${C.blueprintBlue}15, 0 10px 35px rgba(0,0,0,0.35), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.draftTan}, ${C.blueprintBlue}, ${C.draftTan})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#fff", fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.blueprintBlue}20`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.cream}, ${C.blueprintBlue}05, ${C.draftTan}10)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>📐</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>THE BLUEPRINT</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.blueprintBlue, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.philliesRed}ee`, color: "#fff", padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.blueprintBlue}dd`, color: "#fff", padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>SOLID STARTER • 4× NL HR LEADER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>born Frederick Williams • Notre Dame '12 • Architect</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.philliesRed} />
              <StatBar label="POW" value={s.pow} max={5} color={C.blueprintBlue} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.traitGreen} />
              <StatBar label="DEF" value={s.def} max={3} color={C.sepia} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.blueprintBlue}, ${C.philliesRed}aa)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: ".293" },{ label: "OPS", val: ".940" },{ label: "HR", val: "41" },{ label: "RBI", val: "114" },{ label: "H", val: "163" },{ label: "TB", val: "307" },{ label: "R", val: "98" },{ label: "WAR", val: "5.8" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, fontWeight: 700 }}>41 HR — TIED BABE RUTH FOR ML LEAD — LED NL BY 19 OVER RUNNER-UP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.blueprintBlue}08`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.blueprintBlue}15` }}>
              {[{ label: "CAR AVG", val: ".292" },{ label: "CAR HR", val: "251" },{ label: "CAR H", val: "1,981" },{ label: "CAR WAR", val: "37.4" },{ label: "HR TITLES", val: "4" },{ label: "SEASONS", val: "19" },{ label: "WS RINGS", val: "0" },{ label: "HOF", val: "✗" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.5 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["📐 Architect (Notre Dame)", "🏠 41 HR = Ruth (1923)", "↗️ Original Shift", "🏅 Declined 1912 Olympics", "🏟️ Baker Bowl", "⚾ Tinker, Evers & Chance", "🎨 Right-Handed Painter", "🎣 Fished w/ Ted Williams"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.blueprintBlue}08`, border: `1px solid ${C.blueprintBlue}15`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.blueprintBlue, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>SOLID STARTER DOSSIER — {d.year} — THE BLUEPRINT</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.blueprintBlue}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.blueprintBlue : "transparent", color: tab === t.id ? "#fff" : C.medBrown, border: `1px solid ${tab === t.id ? C.blueprintBlue : C.sepia}30`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "tragic_element" ? "⚠ THE INVISIBLE ARCHITECT" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "tragic_element" ? { color: C.blueprintBlue } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.blueprintBlue }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity.includes("HOME") ? `${C.traitGreen}20` : l.affinity.includes("CONTEXT") ? `${C.sepia}20` : `${C.blueprintBlue}15`, color: l.affinity.includes("HOME") ? C.traitGreen : l.affinity.includes("CONTEXT") ? C.sepia : C.blueprintBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.blueprintBlue }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.blueprintBlue}05`, border: `1px solid ${C.blueprintBlue}12`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type.includes("Invisibility") ? `${C.sepia}20` : `${C.blueprintBlue}12`, color: a.type.includes("Invisibility") ? C.sepia : C.blueprintBlue, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.draftTan}, ${C.blueprintBlue}, ${C.draftTan})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: "#fff", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB SOLID #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
