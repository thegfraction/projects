import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/huggins-miller.png";

const d = {
  name: "Miller Huggins", nickname: "Mighty Mite", year: 1912, team: "St. Louis Cardinals",
  era: "1910s", ilb_team: "Muggers 1910", position: "2B", bats: "S", throws: "R",
  height: '5\'5"', weight: "140 lbs",
  born: "March 27, 1878 — Cincinnati, OH",
  died: "September 25, 1929 — New York, NY (age 50)",
};

const s = { ovr: 6, con: 2, pow: 0, spd: 2, def: 2, clu: 0 };

const realStats = [
  { label: "BA", val: ".304" }, { label: "OBP", val: ".422" },
  { label: "SLG", val: ".357" }, { label: "SB", val: "35" },
  { label: "BB", val: "83" }, { label: "R", val: "82" },
  { label: "H", val: "132" }, { label: "HR", val: "0" },
];

const careerStats = [
  { label: "CAR BA", val: ".265" }, { label: "CAR OBP", val: ".382" },
  { label: "CAR BB", val: "1,002" }, { label: "CAR SB", val: "324" },
  { label: "CAR HR", val: "9*" }, { label: "NL BB LDR", val: "4\u00D7" },
  { label: "HEIGHT", val: "5'5\"" }, { label: "WEIGHT", val: "140" },
];

const badges = [
  "\u{1F3C5} HOF (1964, as Manager)", "\u{1F4CF} 5'5\" / 140 lbs (Smallest Mugger)",
  "\u{1F6B6} 1,002 Career Walks", "\u{1F3C3} 324 Career SB",
  "\u{1F9CA} Froze Baseballs in Freezer", "\u{1F3A9} Hidden Ball Trick (8\u00D7)",
  "\u{1F393} Law Degree (U. of Cincinnati)", "\u{1F4A1} Coached Rogers Hornsby",
];

const justification = {
  con: ".304 BA in 1912 (only year over .300). Career .265 \u2014 well below the .280 tier 2 threshold. NOT a contact hitter. A WALK hitter: 1,002 career BB, led NL 4\u00D7. .382 career OBP, .402 with Cardinals. But in ILB, CON measures batting average, not OBP. The bat was patient, not productive. Rating of 2.",
  pow: "9 career HR \u2014 ALL inside-the-park. .357 career SLG (peak). Zero extra-base power. 5'5\" 140 lbs. The smallest player on the roster with essentially no power at all. Rating of 0 \u2014 the only POW 0 position player on the Muggers alongside Cravath's SPD 0.",
  spd: "324 career SB. 41 SB (1906). 35 SB (1912). Regular 30+ SB seasons. 'Rabbit' \u2014 fast in the field and on the bases. BUT: set NL caught stealing record in 1914 (36 CS vs. 32 SB). Fast but reckless. Rating of 2.",
  def: "'Like a flea skating around on a greasy skillet.' 'Rabbit,' 'Mighty Mite,' 'Little Everywhere.' Led NL in putouts, assists, double plays, fielding % once each. Hidden ball trick at least 8 times. Record 19 chances in a game. Once froze baseballs in a freezer to deaden them. Creative, scrappy, excellent. Rating of 2.",
  clu: "NEVER played in a World Series. Cardinals never won an NL pennant during Huggins' playing career. Zero October data. Rating of 0.",
};

const personality = {
  "Leadership Style": "THE STRATEGIST. Huggins didn't overpower \u2014 he couldn't, at 5'5\" and 140 lbs. He outTHOUGHT. Law degree. Hidden ball trick 8 times. Froze baseballs. Handled 19 chances in a game. Spent three years training himself to switch-hit for the extra step to first base. Everything was calculated, every edge was exploited. Billy Evans: 'one of the greatest managers I have ever met.' The player who became the manager was already managing from second base.",
  "Temperament": "GRIM, CEREBRAL, RELENTLESS. The papers mocked his size. He ignored them. Reporters predicted his firing. He outlasted them. He played under the alias 'Proctor' to hide from his strict Methodist father. He chose baseball over law because it paid more, but he never stopped thinking like a lawyer \u2014 every game was a case, every play was evidence, every edge was an argument to be won.",
  "Work Ethic": "THREE YEARS TO LEARN TO SWITCH-HIT. Huggins spent three grueling years training himself to hit left-handed for the extra step to first base. That's not talent \u2014 that's obsession. He built upper-body strength despite being 140 lbs. He coaxed 1,002 walks from pitchers who could have overpowered him. He pulled the hidden ball trick 8 times. He froze baseballs. Every weapon was improvised because his body gave him nothing.",
  "Lifestyle": "THE LAW STUDENT IN CLEATS. University of Cincinnati law degree. Professor: William Howard Taft (future President). Chose baseball over law. Never married. Private, austere, cerebral. Played semi-pro under alias 'Proctor.' After playing career: managed Cardinals, then Yankees. Built Murderers' Row. Suspended Babe Ruth. Got the first monument in Yankee Stadium. Died of erysipelas at 50, still managing. The monument in center field came before Ruth's, before Gehrig's.",
  "Clubhouse Impact": "THE MIND. +3 strategy (the smartest player on the field). +2 defensive creativity (hidden ball trick, frozen baseballs). +1 walk discipline (teaches teammates patience). -1 physical intimidation (5'5\" 140 lbs \u2014 nobody feared him physically). The player whose value was entirely in his brain.",
  "\u26A0 Hidden Complexity": "The SMALLEST Mugger by far. Cravath had SPD 0 \u2014 Huggins has POW 0. Two zeros on opposite ends: the slugger who couldn't run, the speedster who couldn't slug. But Huggins' future is the biggest of any Mugger: 6 pennants, 3 World Series, Murderers' Row, the Babe Ruth suspension, the first Yankee monument. As a PLAYER, he's OVR 6. As a MIND, he's Mythic. The card captures the player. The legend is what comes after.",
};

const chemistry = [
  { tag: "Mighty Mite", desc: "5'5\" 140 lbs. The smallest player on the Muggers by far. +2 underdog energy. -1 physical presence. Every advantage had to be earned by intellect." },
  { tag: "The Hidden Ball Trick", desc: "Pulled it off at least 8 times. +2 deception. +1 defensive IQ. The trick requires timing, acting, and the willingness to look foolish if it fails." },
  { tag: "1,002 Walks", desc: "Led NL in walks 4\u00D7. Career 1,002 BB. .382 OBP with a .265 average. +2 plate discipline. The man who made pitchers throw strikes to a 5'5\" target." },
  { tag: "The Frozen Baseballs", desc: "Stored baseballs in a freezer to deaden them. Admitted it to Ford Frick years later. +2 gamesmanship. -1 ethics. The mind that would later manage Ruth." },
  { tag: "The Law Degree", desc: "University of Cincinnati. Professor: William Howard Taft (future President). +2 intellect. +1 argument construction. Every at-bat was a cross-examination of the pitcher." },
  { tag: "Hornsby's Teacher", desc: "Coached young Rogers Hornsby's batting stance with the Cardinals. Hornsby replaced him at 2B in 1917 and went on to hit .358 for his career. +3 legacy. The teacher who created his own replacement \u2014 and made him the greatest right-handed hitter ever." },
  { tag: "The Switch-Hitter's Sacrifice", desc: "Spent 3 years training to hit left-handed for the extra step to first. +1 dedication. +1 SPD from left side. The work that invisible talent requires." },
  { tag: "The Future Dynasty", desc: "THIS card is the player. The FUTURE is the manager: 6 pennants, 3 WS titles, Murderers' Row, suspended Ruth, first Yankee monument. +5 legacy. The OVR 6 player who became the Mythic manager." },
];

const locations = [
  { location: "Robison Field / St. Louis", affinity: "HIGH", note: "1910-16. Best seasons. .402 OBP. Player-manager 1913-17." },
  { location: "Second Base", affinity: "HIGH", note: "'Flea on a greasy skillet.' Hidden ball trick. Record chances." },
  { location: "The Batter's Box", affinity: "COMPLEX", note: ".265 career BA but .382 OBP. Walked more than he hit." },
  { location: "The World Series", affinity: "NONE", note: "Never played in one. Zero October experience as a player." },
  { location: "Yankee Stadium (Future)", affinity: "MYTHIC", note: "First monument in center field. Before Ruth. Before Gehrig." },
];

const momentum = {
  hot: [
    "Walk streaks \u2014 when Huggins is patient and pitchers fear the zone, his OBP climbs above .400; the plate discipline elevates",
    "Hidden ball trick \u2014 when Huggins successfully deceives a runner, +2 team morale, opponent alertness drops",
    "Defensive excellence \u2014 when covering ground, turning DPs, handling 15+ chances; 'Little Everywhere' activated",
    "Strategic insight \u2014 when player-managing, Huggins' decisions are precise; the law degree applies to baseball",
  ],
  cold: [
    "Power vacuum \u2014 0 HR most seasons; when the team needs a big hit, Huggins walks or singles; never the clutch blow",
    "Caught stealing \u2014 set NL record with 36 CS in 1914; aggressive baserunning backfires; -1 SPD",
    "Size mismatch \u2014 in collisions (Konetchy/Evans incident), Huggins loses; 140 lbs vs. the dead-ball era",
    "No October stage \u2014 never reached a World Series as a player; the ultimate opportunity never arrived",
  ],
  pressure: "UNKNOWN. Miller Huggins never played in a World Series. The Cardinals never won a pennant during his playing career (1904-16). There is zero October data. As a MANAGER, he was excellent in October (3 WS titles). But this card reflects the player, and the player never got there. CLU 0 by absence.",
};

const actions = [
  { title: "The Hidden Ball Trick", type: "Game Action", text: "The runner takes his lead off second. Your second baseman still has the ball. The runner doesn't know. One step, two steps \u2014 tag. Out. The eighth time he's done this. +2 deception. +1 IQ. -1 opponent trust. The 5'5\" man who outthinks everyone on the field.", origin: "Huggins pulled the hidden ball trick at least 8 times in his career." },
  { title: "The Frozen Baseballs", type: "Drama", text: "Your second baseman has stored the game balls in a freezer. Deadened them. The opposing batters can't drive the ball. Your infielder handles a record 19 chances. Years later, he admits it to a journalist and smiles. +2 gamesmanship. -1 sportsmanship. The brain beats the body.", origin: "Huggins admitted to Ford Frick he once froze baseballs. Handled 19 chances that game." },
  { title: "1,002 Walks", type: "Game Action", text: "Ball four. Again. Your 5'5\" leadoff man trots to first for the 1,002nd time in his career. He led the league in walks four times. He hit .265 but reached base at .382. The zone is small. His patience is enormous. +2 OBP. +0 POW. The most disciplined eye in the dead-ball era.", origin: "Huggins drew 1,002 career walks, leading the NL 4 times." },
  { title: "Six Plate Appearances, Zero At-Bats", type: "Game Action", text: "Your leadoff man goes to the plate six times. He never swings. Four walks. Two sacrifice flies. Zero official at-bats. An MLB record. The pitcher never found the zone. Your second baseman never needed it. +3 patience. +0 swing.", origin: "June 1, 1910: Huggins set an MLB record with 6 PA and 0 AB (4 BB, 2 SF)." },
  { title: "Three Years to Switch-Hit", type: "Drama", text: "Your second baseman spends three years \u2014 three grueling off-seasons \u2014 teaching himself to hit left-handed. For one reason: the extra step to first base. One step faster. Three years of work. +1 SPD from left side. +2 dedication. The sacrifice invisible talent requires.", origin: "Huggins spent three years training to become a switch-hitter for the extra step to first." },
  { title: "Teaching Hornsby", type: "Drama", text: "Your player-manager takes a 19-year-old Texan and corrects his batting stance. The kid cost $600. The kid will hit .358 for his career. The kid will replace your second baseman at the position in 1917. +3 legacy. +1 mentorship. You taught the greatest right-handed hitter ever how to stand.", origin: "Huggins coached young Rogers Hornsby's batting stance. Hornsby succeeded him at 2B." },
  { title: "The Collision", type: "Drama", text: "Pop fly. Your 140-lb second baseman converges with your 195-lb first baseman and 175-lb right fielder. Three bodies collide. Your second baseman goes down. From the ground, injured, he holds up the ball as if he caught it. The umpire calls the batter out. Two weeks on the injured list. Worth it. +1 determination. -1 body.", origin: "Huggins collided with Konetchy (195 lbs) and Evans (175 lbs). Held up ball from ground. Umpire believed him." },
  { title: "The Monument (Future)", type: "Drama", text: "This hasn't happened yet. But it will. Your 5'5\" second baseman will manage the New York Yankees. He will build Murderers' Row. He will suspend Babe Ruth. He will win 6 pennants and 3 World Series. He will die at 50, still in the dugout. And the first monument in Yankee Stadium \u2014 before Ruth, before Gehrig \u2014 will be his. +5 future. The OVR 6 player who built a dynasty.", origin: "Huggins managed Yankees 1918-29: 6 pennants, 3 WS titles. First Yankee monument (1932)." },
];

const art = {
  face: "TINY, FIERCE, CEREBRAL, WEATHERED. 5'5\" 140 lbs \u2014 the SMALLEST player in the Muggers collection by far. The face should be SHARP and INTENSE \u2014 angular features, lean jaw, sunken cheeks, the face of a man who weighs 140 lbs and takes on 200-lb baserunners. Deep-set, CALCULATING eyes \u2014 the eyes of a law student, a hidden ball trick artist, a man who froze baseballs. The expression: GRIM DETERMINATION. Not cheerful (that's Doyle). Not volatile (that's Zimmerman). FOCUSED. The face of a brain in a body too small for baseball, making it work anyway.",
  attire: "St. Louis Cardinals 1912 whites \u2014 'STL' insignia, flat cap that looks slightly too large on his small frame. THE POSE: in the field at second base, low to the ground, glove ready \u2014 'like a flea skating around on a greasy skillet.' The smallness should be VISIBLE and EMPHASIZED \u2014 the figure should look compact, coiled, and disproportionately quick for the era. Or: in the batter's box, crouched switch-hitter stance, making the strike zone impossibly small. The bat should look normal-sized \u2014 which means it looks LARGE in Huggins' small hands.",
  mood: "CEREBRAL AND DETERMINED. The card should feel like INTELLIGENCE OVERCOMING LIMITATION. Not the joy of Doyle or the chaos of Zimmerman. The QUIET FEROCITY of a 140-lb man who earned a law degree, chose baseball, and outthought every opponent he couldn't outmuscle.",
  style: "Sepia-toned with CINCINNATI BRICK and CARDINAL RED-BROWN \u2014 the muted red of Cincinnati brick buildings (his hometown, his university) and the subtle red-brown of Cardinals flannel. The palette should feel MODEST and EFFICIENT \u2014 no gold, no fire, no flash. The color of a small man who doesn't waste anything. The most UNDERSTATED palette in the Muggers collection.",
  reference: "The tiny fierce face. The crouched stance. The oversized cap. The card should feel SMALL AND MIGHTY \u2014 the most physically modest card that radiates the most intellectual power. The viewer should sense that this OVR 6 card contains a future dynasty.",
};

const Cl = {
  parchment: "#efe4cc", darkBrown: "#2a1a0e", medBrown: "#7a5530",
  gold: "#b88830", warmRed: "#8a3828", sepia: "#806040",
  cream: "#f4ecd8", ink: "#2a1808", hotRed: "#a83828",
  coldBlue: "#3a6480", traitGreen: "#4a7c59", brick: "#8a5038",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: Cl.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${Cl.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: Cl.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", background: `${Cl.traitGreen}15`, border: `1px solid ${Cl.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: Cl.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>);
const Sec = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: Cl.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${Cl.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function MillerHugginsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.brick}15 0%, #18120a 50%, ${Cl.brick}10 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>INFINITY LEAGUE BASEBALL</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card &mdash; Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: Cl.parchment, borderRadius: 8, border: `3px solid ${Cl.gold}`, boxShadow: `0 0 0 1px ${Cl.darkBrown}, 0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: Cl.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: Cl.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "\u25BC Flip Card \u2014 View Dossier \u25BC" : "\u25B2 Flip Card \u2014 View Front \u25B2"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${Cl.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: Cl.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${Cl.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${Cl.darkBrown}dd`, color: Cl.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${Cl.brick}dd`, color: Cl.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, right: 12, background: `${Cl.gold}dd`, color: Cl.darkBrown, padding: "3px 8px", borderRadius: 3, fontSize: 8, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>5'5" / 140 LBS</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>&ldquo;{d.nickname}&rdquo; &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.brick, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Law Degree &bull; Switch-Hitter &bull; Future HOF Manager</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={Cl.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={Cl.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={Cl.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={Cl.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={Cl.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: Cl.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: Cl.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1912 &mdash; .304/.422/.357 &bull; 35 SB &bull; BEST SEASON</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>*9 HR ALL INSIDE-THE-PARK &bull; 0 WS AS PLAYER &bull; HOF AS MGR</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (<span key={i} style={{ fontSize: 9, background: `${Cl.gold}20`, border: `1px solid ${Cl.gold}40`, padding: "2px 8px", borderRadius: 10, color: Cl.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: Cl.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER &mdash; {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${Cl.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? Cl.darkBrown : "transparent", color: tab === t ? Cl.gold : Cl.medBrown, border: `1px solid ${tab === t ? Cl.gold : Cl.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: Cl.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (<Sec key={k} title={k}><p style={{ margin: 0, ...(k.includes("\u26A0") ? { color: Cl.warmRed, fontStyle: "italic" } : {}) }}>{v}</p></Sec>))}
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 60, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${Cl.traitGreen}20` : l.affinity === "NONE" ? `${Cl.warmRed}20` : l.affinity === "MYTHIC" ? `${Cl.gold}30` : `${Cl.sepia}20`, color: l.affinity === "HIGH" ? Cl.traitGreen : l.affinity === "NONE" ? Cl.warmRed : l.affinity === "MYTHIC" ? Cl.gold : Cl.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Huggins' Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: Cl.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#18120a", borderRadius: 6, padding: 16, border: `1px solid ${Cl.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, bats: "Switch", hof: "1964 (as Manager)", chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
