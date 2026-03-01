import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/meyers-chief.png";

const d = {
  name: "Chief Meyers", nickname: "Chief", year: 1912, team: "New York Giants",
  era: "1910s", ilb_team: "Muggers 1910", position: "C", bats: "R", throws: "R",
  height: '5\'11"', weight: "194 lbs",
  born: "July 29, 1880 — Riverside, CA",
  died: "July 25, 1971 — San Bernardino, CA (age 90)",
};

const s = { ovr: 7, con: 4, pow: 1, spd: 0, def: 2, clu: 2 };

const realStats = [
  { label: "BA", val: ".358" }, { label: "OBP", val: ".441" },
  { label: "SLG", val: ".418" }, { label: "H", val: "143" },
  { label: "2B", val: "16" }, { label: "3B", val: "6" },
  { label: "HR", val: "6" }, { label: "RBI", val: "63" },
];

const careerStats = [
  { label: "CAR BA", val: ".291" }, { label: "CAR OBP", val: ".367" },
  { label: "CAR H", val: "826" }, { label: "CAR HR", val: "14" },
  { label: "PEAK BA", val: ".334*" }, { label: "WS BA", val: ".357*" },
  { label: "WS APPS", val: "4" }, { label: "SEASONS", val: "9" },
];

const badges = [
  "\u{1F3C5} 3rd NL MVP (1912)", "\u{1F3C6} 3\u00D7 NL Pennant (1911-13)", "\u{1F3AF} Mathewson's Batterymate",
  "\u{1F393} Dartmouth College", "\u{1F3DB}\uFE0F Museum Visitor on Off-Days",
  "\u{1F3AD} Vaudeville: 'Curves' w/ Matty", "\u{1F4DA} Glory of Their Times", "\u{1F30E} Cahuilla Tribal Leader",
];

const justification = {
  con: ".358 BA in 1912 \u2192 tier 4 (.340-.359). .441 OBP led the NL. Hit for the cycle. .334 BA across the 1911-13 three-pennant peak. Led Giants in batting three consecutive seasons. .291 career \u2014 outstanding for a catcher. 'Deepest student of batting on the team.' A reporter watched him correctly predict pitches thrown by opposing pitchers. Rating of 4.",
  pow: "6 HR peak (1912). Career SLG .378. 14 career HR. Gap power \u2014 doubles and triples \u2014 but minimal home run production even by dead-ball standards. Not a power hitter. Rating of 1.",
  spd: "'Big and strong, and like the majority of other catchers, wasn't blessed with speed.' 194 lbs behind the plate. Catcher. Slow. Rating of 0.",
  def: "Primary catcher for Christy Mathewson for 7 seasons \u2014 you don't catch the era's most sophisticated pitcher for 7 years without being excellent. 'Student of the game, predicting pitchers' pitches and location.' McGraw: 'You're the catcher for Mathewson.' Caught 100+ games in 6 consecutive seasons. Handled Mathewson, Marquard, Tesreau. The $17,000 battery. Rating of 2.",
  clu: ".357/.419/.429 in the 1912 WS \u2014 excellent. .300 in the 1911 WS. 4\u00D7 WS participant (1911-13, 1916). But lost ALL FOUR World Series. The 1912 G8 foul popup \u2014 Mathewson called for Meyers instead of Merkle, Meyers couldn't reach it, Speaker got a second chance and singled to tie \u2014 haunts. But Meyers' individual October performance was strong. Rating of 2.",
};

const personality = {
  "Leadership Style": "THE INTELLECTUAL. In an era when ballplayers drank, played cards, and fought, Meyers visited museums, discussed Plato, and studied opposing pitchers' tendencies. A reporter in 1909, before Meyers had even played a single MLB game: 'A strong love of justice, a lightning sense of humor, a fund of general information that runs from politics to Plato, a quick logical mind, and the self-contained, dignified poise that is the hallmark of good breeding \u2014 he is easily the most remarkable player in the big leagues.' He led by example and intelligence, not volume.",
  "Temperament": "DIGNIFIED, WITTY, PROUD. Unlike other Native American players who downplayed their heritage to avoid prejudice, Meyers remained openly proud of his Cahuilla identity throughout his career and life. He used wit to combat stereotypes \u2014 responding to racist coverage with humor and intelligence rather than anger. He endured Ring Lardner writing 'Big Chief Meyers, he break up big ball game with heap big triple' and chose to let his .358 batting average speak louder.",
  "Work Ethic": "THE DEEPEST STUDENT. 'Meyers has become the deepest student of batting on the team,' wrote the New York Times after watching him correctly predict pitches. He studied opposing pitchers, predicted locations, communicated strategy. Caught 100+ games in 6 consecutive seasons \u2014 an unusually heavy workload for a dead-ball era catcher. He didn't just catch Mathewson \u2014 he STUDIED with Mathewson. The battery was a seminar.",
  "Lifestyle": "THE SOPHISTICATE. On off-days: museums, historical monuments, college football practices. His teammates: cards, billiards, bars. Dartmouth-educated. Performed in vaudeville with Mathewson \u2014 a sketch called 'Curves' explaining the art of pitching and catching, touring for weeks. Roommate of Jim Thorpe in New York. Friends with Babe Ruth (they traded bats). After baseball: police chief for Mission Indian Agency. Became a Cahuilla tribal leader. Interviewed by Lawrence Ritter for 'The Glory of Their Times' in 1964 \u2014 one of the book's most memorable conversations.",
  "Clubhouse Impact": "THE BRIDGE. +2 intellectual bond (connected with educated players like Mathewson, formed the deepest pitcher-catcher relationship in the era). +1 cultural dignity (maintained Cahuilla identity with pride). +1 sportswriter relations (made interesting copy because he was interesting). -1 acceptance (faced persistent racism, the nickname 'Chief' itself was a stereotype). Meyers bridged worlds \u2014 Native and white, intellectual and physical, vaudeville and baseball.",
  "\u26A0 Hidden Complexity": "Four World Series. Four losses. The 1912 G8 foul popup \u2014 Mathewson called for Meyers to catch it instead of Merkle, who was closer. Meyers couldn't reach it. Speaker singled. Giants lost the game, the Series, the championship. Mathewson 'called for the wrong man.' The indignity: not that Meyers failed, but that he was asked to do what someone else should have done. And the nickname \u2014 'Chief' \u2014 applied to every Native American player of the era regardless of their actual heritage. Meyers bore it with dignity but the weight was real. After getting booed at a semi-pro game post-career, he quit baseball entirely and became a police chief on the reservation. The most intelligent man on the field, reduced to a stereotype by a nickname and a foul popup he was never supposed to catch.",
};

const chemistry = [
  { tag: "Mathewson's Batterymate", desc: "Primary catcher for Christy Mathewson for 7 seasons. The deepest pitcher-catcher bond in dead-ball era. +3 synergy with elite pitchers. McGraw: 'You're the catcher for Mathewson.' When catching Mathewson: +1 DEF, +1 pitcher CLU." },
  { tag: "The Cahuilla Catcher", desc: "Santa Rosa Band of Cahuilla Tribe. Proudly maintained heritage. Became tribal leader after baseball. +2 identity. +1 cultural resilience. The most dignified player on the Muggers." },
  { tag: "Dartmouth Intellect", desc: "Dartmouth College educated. Discussed Plato. Visited museums on off-days. +2 intelligence. +1 pitch-calling. The catcher who studied the game like a professor studies a text." },
  { tag: "The Glory of Their Times", desc: "Interviewed by Lawrence Ritter, 1964. One of the most memorable voices in baseball's greatest oral history. +2 literary legacy. +1 immortality." },
  { tag: "'Curves' — The Vaudeville Battery", desc: "Performed sketch 'Curves' with Mathewson. Pitcher and catcher explaining their art on stage. Toured for weeks. +1 cultural crossover. +1 Mathewson bond." },
  { tag: "Called for the Wrong Man", desc: "1912 WS G8: Speaker's foul popup near 1B. Mathewson called for Meyers instead of Merkle. Meyers couldn't reach it. Speaker singled to tie. -1 CLU (not his fault). -1 fate. The most unjust moment in Muggers history." },
  { tag: "Four October Losses", desc: "4\u00D7 WS (1911-13, 1916). Lost all four. Giants couldn't win October. Team failure, not individual. .357 in 1912 WS. But 0 titles." },
  { tag: "Thorpe's Roommate", desc: "Roomed with Jim Thorpe in New York. Two Native American athletes in the city. +1 solidarity. +1 connection to the greatest athlete of the era." },
];

const locations = [
  { location: "Polo Grounds / New York", affinity: "HIGH", note: "1909-15. 3 pennants. Mathewson's catcher. Home of the Giants dynasty." },
  { location: "Behind the Plate", affinity: "HIGH", note: "100+ games caught in 6 consecutive years. Mathewson's batterymate." },
  { location: "The World Series", affinity: "COMPLEX", note: ".357 in 1912 WS. .300 in 1911. But 4 losses. The foul popup." },
  { location: "Museums / Historical Sites", affinity: "HIGH", note: "Off-day destination. Art museums in Boston. Monuments. Exhibits." },
  { location: "Riverside / Santa Rosa Reservation", affinity: "HIGH", note: "Cahuilla homeland. Born. Returned. Tribal leader. Buried nearby." },
];

const momentum = {
  hot: [
    "Catching Mathewson \u2014 the battery is a seminar; Meyers' intelligence elevates both pitcher and catcher",
    "Studying opponents \u2014 when Meyers has read the opposing pitcher, he predicts pitches correctly; +1 CON",
    "Pennant race intensity \u2014 led Giants in batting 3 consecutive championship seasons; pressure focused him",
    "Cultural pride \u2014 when Meyers plays with dignity and identity intact, his composure steadies the team",
  ],
  cold: [
    "World Series loss \u2014 4\u00D7 WS, 0 titles; the team's October collapse weighs on every player",
    "The foul popup memory \u2014 'called for the wrong man'; the unjust moment that reduced him",
    "Racial stereotyping \u2014 'heap big triple' coverage; the nickname 'Chief'; the weight of being a symbol",
    "Physical decline \u2014 after 1914, the workload of 100+ games caught per year caught up; batting dropped to .232",
  ],
  pressure: "STRONG individually in October. .357 in the 1912 WS. .300 in 1911 WS. Started all 8 games of the 1912 Series. But the TEAM lost all four World Series Meyers appeared in. The 1912 foul popup was not his fault \u2014 Mathewson called for the wrong man. Meyers' individual October hitting was excellent. The team's October destiny was cursed. CLU 2 reflects the individual performance against the collective failure.",
};

const actions = [
  { title: "The Deepest Student", type: "Game Action", text: "Your catcher watches the opposing pitcher in warm-ups. He predicts every pitch \u2014 type, location, sequence. His teammates stop doubting. The New York Times writes about it. 'Meyers has become the deepest student of batting on the team.' +2 pitch prediction. +1 CON. The catcher who reads the game like a book.", origin: "NYT reported Meyers correctly predicted Pirates pitcher Marty O'Toole's pitches from the bench." },
  { title: "Called for the Wrong Man", type: "Drama", text: "World Series Game 8. Bottom of the 10th. Giants lead 2-1, three outs from the championship. Speaker hits a foul popup near first base. Merkle is thirty feet away. Your pitcher calls for your CATCHER to take it. Your catcher sprints but can't reach it. The ball drops. Speaker singles to tie. Giants lose. Your catcher was called for the wrong man. -1 CLU. -1 justice. +1 resilience (he comes back next year).", origin: "1912 WS G8: Mathewson called for Meyers instead of Merkle on Speaker's foul popup." },
  { title: "The Vaudeville Battery", type: "Drama", text: "Your pitcher and catcher are on stage. Not a baseball stage \u2014 a theater stage. They perform a sketch called 'Curves.' Mathewson explains how to throw them. Meyers explains how to catch them. The audience laughs. The tour lasts weeks. +2 Mathewson bond. +1 cultural crossover. The battery that played in October and performed in November.", origin: "Meyers and Mathewson performed vaudeville sketch 'Curves,' touring for weeks." },
  { title: "The Museum on the Off-Day", type: "Drama", text: "Rain delay. Your teammates play cards and drink. Your catcher takes a trolley to the art museum. He spends hours with the paintings. A reporter follows him. The article describes a man who discusses 'politics to Plato' with 'a quick logical mind and dignified poise.' He returns to the clubhouse. He catches 143 games that year. +2 intellect. +1 dignity.", origin: "Meyers visited museums and historical sites on off-days. Teammates played cards." },
  { title: ".358 Behind the Plate", type: "Game Action", text: "Your catcher finishes the season at .358 \u2014 second in the National League, behind only the Triple Crown winner. He leads the league in on-base percentage at .441. He catches 126 games. He hit for the cycle in June. He finishes third in MVP voting. He is the best catcher in baseball and one of the best hitters at any position. +4 CON. +2 MVP contention. The man behind the plate who hits like the man at the plate.", origin: "1912: Meyers hit .358 with a league-leading .441 OBP. 3rd in MVP." },
  { title: "The Cahuilla Catcher", type: "Drama", text: "Your catcher is Cahuilla. Santa Rosa Band. Riverside, California. His mother is a basket maker. His father is a German-American Civil War veteran. He attended Dartmouth. He discusses Plato. He endures 'heap big' headlines with dignity. He will become a tribal leader after baseball. +2 identity. +1 resilience. The most remarkable player in the big leagues.", origin: "Meyers maintained Cahuilla identity proudly throughout career. Became tribal leader." },
  { title: "The Glory of Their Times", type: "Drama", text: "Fifty-two years after his last at-bat, your retired catcher sits with a man named Lawrence Ritter. He talks about Mathewson, McGraw, the Polo Grounds, the foul popup, the museums, the vaudeville sketch. The book becomes the greatest baseball oral history ever published. Your catcher's voice carries across decades. +3 immortality. +2 literary legacy. The man who was 'the most remarkable player in the big leagues' is remarkable still.", origin: "Meyers was interviewed by Lawrence Ritter for 'The Glory of Their Times' in 1964." },
  { title: "Thorpe's Roommate", type: "Drama", text: "Your catcher rooms with Jim Thorpe in New York City. Two Native Americans in the greatest city in the world. One is the greatest athlete alive. The other is the best catcher in the National League. They share an apartment, a heritage, a weight. +1 solidarity. +1 legend.", origin: "Meyers was Jim Thorpe's roommate in New York." },
];

const art = {
  face: "DIGNIFIED, INTELLIGENT, STRONG, PROUD. 5'11\" 194 lbs \u2014 big, solid, the body of a catcher built for 100+ games per season. The face should be COMPOSED and PERCEPTIVE \u2014 not the laughing warmth of Doyle or the volatile menace of Zimmerman. A QUIET STRENGTH. Cahuilla heritage visible and honored \u2014 dark complexion, strong features, the face of a man whose mother was a Cahuilla basket maker and whose intellect ran from 'politics to Plato.' Deep, watchful eyes \u2014 these are the eyes that predicted opposing pitchers' pitches from the bench, that studied paintings in Boston art museums, that read Mathewson's signals for seven years. The expression: CALM INTELLIGENCE with a hint of WIT. 'A lightning sense of humor.' The dignity of a man who bore 'Chief' as a nickname while being the most sophisticated man in the room.",
  attire: "New York Giants 1912 whites \u2014 interlocking 'NY', flat cap. Catcher's equipment visible or suggested \u2014 chest protector, mask pushed up on forehead, mitt. THE POSE: in the crouch behind the plate, fingers down giving signals \u2014 the position from which he caught Mathewson for seven years. Or: the right-handed swing, compact and quick, the .358 hitter who led the NL in on-base percentage. The gear should look WORN \u2014 100+ games per season in early equipment.",
  mood: "COMPOSED AND DIGNIFIED. The card should feel like INTELLIGENCE and HERITAGE combined \u2014 a man who is simultaneously a Cahuilla of the Santa Rosa Band, a Dartmouth student, a vaudeville performer, and the best catcher in the National League. Not the fireworks of Schulte or the chaos of Zimmerman. The QUIET AUTHORITY of the man who catches Christy Mathewson.",
  style: "Sepia-toned with CAHUILLA EARTH and POLO GROUNDS IVORY \u2014 the warm red-brown earth of the Southern California desert, the ivory of the Polo Grounds grandstand. Where Bender is earth red (Ojibwe, Chippewa), Meyers is CAHUILLA EARTH \u2014 the specific red-brown of Riverside, California, of the Santa Rosa Reservation, of the desert floor. The palette should feel GROUNDED and WARM \u2014 the color of land and heritage and the quiet authority of the earth itself.",
  reference: "The composed intelligent face. The catcher's crouch. Polo Grounds ivory. Cahuilla earth. The card should feel like the WISEST card in the Muggers collection \u2014 not the most powerful (Speaker) or the most talented (Jackson) or the most joyful (Doyle), but the most KNOWING. The catcher who studied paintings and predicted pitches and endured stereotypes and caught Christy Mathewson.",
};

const Cl = {
  parchment: "#f0e6d0", darkBrown: "#2a1a0e", medBrown: "#7a5530",
  gold: "#c89838", warmRed: "#8a4020", sepia: "#886840",
  cream: "#f8f0dc", ink: "#2a1a08", hotRed: "#b84030",
  coldBlue: "#3a6480", traitGreen: "#4a7c59", earth: "#9a6030",
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

export default function ChiefMeyersCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.earth}20 0%, #1a1308 50%, ${Cl.earth}15 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ position: "absolute", top: 12, left: 12, background: `${Cl.earth}dd`, color: Cl.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>John Tortes Meyers &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.earth, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Cahuilla &bull; Dartmouth &bull; Mathewson's Batterymate</div>
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1912 &mdash; .358 BA (2ND NL) &bull; .441 OBP (LED NL) &bull; 3RD MVP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>*PEAK: .334 BA (1911-13) &bull; *WS: .357 (1912) &bull; 4\u00D7 WS &bull; 0 TITLES</div>
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
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 60, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${Cl.traitGreen}20` : l.affinity === "COMPLEX" ? `${Cl.sepia}20` : `${Cl.warmRed}20`, color: l.affinity === "HIGH" ? Cl.traitGreen : l.affinity === "COMPLEX" ? Cl.sepia : Cl.warmRed }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Meyers' Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: Cl.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1308", borderRadius: 6, padding: 16, border: `1px solid ${Cl.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, real_name: "John Tortes Meyers", year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, heritage: "Cahuilla (Santa Rosa Band)", education: "Dartmouth College", chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
