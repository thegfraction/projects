import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/magee-sherry.png";

const d = {
  name: "Sherry Magee", nickname: "The Psychopathic Slugger", year: 1910, team: "Philadelphia Phillies",
  era: "1910s", ilb_team: "Muggers 1910", position: "LF", bats: "R", throws: "R",
  height: '5\'11"', weight: "179 lbs",
  born: "August 6, 1884 — Clarendon, PA",
  died: "March 13, 1929 — Philadelphia, PA (age 44)",
};

const s = { ovr: 8, con: 3, pow: 2, spd: 2, def: 2, clu: 0 };

const realStats = [
  { label: "BA", val: ".331" }, { label: "OBP", val: ".445" },
  { label: "SLG", val: ".507" }, { label: "RBI", val: "123" },
  { label: "R", val: "110" }, { label: "2B", val: "39" },
  { label: "3B", val: "17" }, { label: "SB", val: "49" },
];

const careerStats = [
  { label: "CAR BA", val: ".291" }, { label: "CAR H", val: "2,169" },
  { label: "CAR HR", val: "83" }, { label: "CAR RBI", val: "1,176" },
  { label: "CAR SB", val: "441" }, { label: "RBI LDR", val: "4\u00D7" },
  { label: "SH STEALS", val: "23" }, { label: "SEASONS", val: "16" },
];

const badges = [
  "\u{1F451} 1910 NL Batting Champion (.331)", "\u{1F3C6} 4\u00D7 NL RBI Leader",
  "\u{1F4A5} Led NL in 7 Categories (1910)", "\u{1F3C3} 441 Career SB / 23 SH",
  "\u{1F94A} Knocked Out Umpire Finneran", "\u{1F6AB} Not in HOF (Overlooked)",
  "\u{1F3AF} Five-Tool Dead-Ball Player", "\u26B0\uFE0F Died at 44 (Pneumonia)",
];

const justification = {
  con: ".331 BA in 1910 (led NL, broke Wagner's batting title streak). .328 in 1907 (2nd to Wagner). .314 in 1914. .306 in 1912-13. Career .291. Five seasons over .300. The first Phillies batting champion of the 20th century. Rating of 3.",
  pow: "15 HR peak (1911). 83 career HR. .507 SLG (1910), .509 SLG (1914). 39 doubles and 17 triples in 1910. 127 career triples. 'A born dynamiter with the bat.' 'A genuine murderer of the pill.' Substantial gap power and triples power, but not pure HR power. Rating of 2.",
  spd: "441 career SB. 55 SB in 1906 (Phillies franchise record for 78 years until Juan Samuel 1984). 49 SB in 1910. 23 steals of home \u2014 stole home TWICE in one game (July 20, 1910 vs. Cubs). Aggressive, intelligent, fast. Rating of 2.",
  def: "'One of the finest defensive outfielders of his day.' Led NL outfielders in fielding %, putouts, assists, range factor, double plays across multiple seasons. Also played SS, 2B, CF, 1B capably when injuries hit the Phillies. 'In spite of constant shifting of position on a hopelessly demoralized team, he proved himself the most valuable batsman in the league.' Rating of 2.",
  clu: "NEVER played in a World Series with the Phillies. 11 years in Philadelphia \u2014 zero pennants. Traded to Boston after 1914. Phillies won the 1915 pennant WITHOUT him. 1919 WS with Reds vs. Black Sox: 2 pinch-hit appearances (1 hit) in a fixed Series. No meaningful October. Rating of 0.",
};

const personality = {
  "Leadership Style": "THE ALPHA. Magee led by intensity, intimidation, and relentless production. He was the Phillies' best player for a decade and he KNEW it. Team captain. 'With characteristic immodesty, he even declared himself among the best shortstops in the business' after playing 39 games at short. He demanded excellence from teammates and berated those who fell short. 'On the ball field Magee is so fussy most of the time that people who do not know him naturally form the opinion that he is a born grouch.'",
  "Temperament": "VOLCANIC. The Finneran Incident defines him: called out on strikes, Magee turned to leave, then wheeled back and knocked the umpire unconscious with a single left hook. 'With blood spurting from his face, Finneran fell to the ground on his back.' SABR titled their article about him 'Psychopathic Slugger.' He fought with umpires constantly. He was suspended repeatedly. He chased teammates off the team \u2014 fans blamed him for driving center fielder Johnny Bates out of Philadelphia 'by continual crabbing.' But the rage was also the engine. The same intensity that knocked out Finneran drove 123 RBI and a batting title.",
  "Work Ethic": "FIVE TOOLS, FULL EFFORT. Hit for average, hit for power, ran the bases, played defense, threw. 'A five-tool player before the term existed.' Played through injuries: broken wrist and forearm (1912 preseason collision), outfield collision with Paskert, came back both times hitting .306. Played SS, 2B, CF, 1B, LF in 1914 \u2014 wherever the team needed him. The effort was never in question. The temperament was always in question.",
  "Lifestyle": "PRINCIPLED BUT DIFFICULT. At 34, Magee left the majors to play in the minors rather than play for owners he despised. Principle over money. Became an umpire in 1928 \u2014 the irony of the man who knocked out an umpire becoming one himself. Died of pneumonia at 44, one year into his umpiring career. Never made the Hall of Fame despite deserving numbers. 'One of the most underrated players in history.'",
  "Clubhouse Impact": "DIVISIVE. +3 offensive production (the best bat on the team for a decade). +2 defensive versatility (played 6 positions). -2 teammate relations (drove Bates off team, 'continual crabbing'). -1 suspension risk (Finneran incident cost the team 5 weeks of their best player). The clubhouse divided into those who respected the intensity and those who couldn't stand it. There was no middle ground with Magee.",
  "\u26A0 Hidden Complexity": "The manager he never became. After 1914 \u2014 arguably his best all-around season \u2014 the Phillies promised Magee the manager job. Then gave it to Pat Moran. Magee was DEVASTATED. Demanded a trade. Was sent to Boston. The next year, the Phillies \u2014 HIS Phillies, the team he'd carried for 11 years \u2014 won their first pennant. Without him. With Alexander. The cruelest irony on the Muggers. And then: the 1919 World Series with the Reds \u2014 2 pinch-hit ABs against the Black Sox in a fixed Series. His last games were a lie. Became an umpire. Died at 44. The rage that drove the talent was also the rage that cost him everything he wanted.",
};

const chemistry = [
  { tag: "Five-Tool Slugger", desc: "Hit for average (.331 BA title), hit for power (.507 SLG), ran (441 SB), fielded (led NL multiple times), threw (strong arm). +3 versatility. The most complete offensive player on the Muggers below OVR 10." },
  { tag: "The Finneran Punch", desc: "July 10, 1911: knocked umpire Bill Finneran unconscious with a single left hook after a called third strike. Blood on the ground. 5-week suspension. -2 discipline. +1 infamy. The punch that defined his legacy more than the batting title." },
  { tag: "Psychopathic Slugger", desc: "SABR's title for him. The intensity that produced 123 RBI and a batting title also produced umpire assaults, teammate conflicts, and constant suspension risk. +2 intimidation. -2 volatility. The rage IS the engine." },
  { tag: "The Manager He Never Became", desc: "Promised the Phillies manager job after 1914. Passed over for Pat Moran. Phillies won 1915 pennant without him. -2 justice. -1 morale. The cruelest irony on the Muggers." },
  { tag: "23 Steals of Home", desc: "Stole home 23 times. Stole home TWICE in one game (July 20, 1910 vs. Cubs). +2 aggression. +1 SPD. The same recklessness that knocked out Finneran, applied to the basepaths." },
  { tag: "Alexander's Predecessor", desc: "Magee was the Phillies' only star before Alexander arrived. They overlapped 1911-14 at Baker Bowl. Magee hit; Alexander pitched. When Magee left, Alexander carried the team alone to the 1915 pennant." },
  { tag: "Bobby Veach's Twin", desc: "B-Ref most similar player: Bobby Veach (Muggers OVR 9). Both left fielders, both underrated, both five-tool, both overlooked by HOF. If both on roster: +1 recognition of the forgotten." },
  { tag: "The Umpire's Revenge", desc: "Became an NL umpire in 1928 after his playing career. The man who knocked out an umpire BECAME one. Died of pneumonia after one year on the job. Age 44." },
];

const locations = [
  { location: "Baker Bowl / Philadelphia", affinity: "HIGH", note: "1904-14. 11 years. .299 BA. 387 SB (franchise record). His ballpark." },
  { location: "Left Field", affinity: "HIGH", note: "Primary position. Led NL outfielders in multiple defensive categories." },
  { location: "The Batter's Box", affinity: "SUPREME", note: ".331 batting title. 123 RBI. 7 categories led. 'A born dynamiter.'" },
  { location: "The World Series", affinity: "ABSENT", note: "Never reached WS with Phillies. 2 PH ABs in the fixed 1919 WS." },
  { location: "The Manager's Office", affinity: "DENIED", note: "Promised the job. Passed over. Traded. Phillies won without him." },
];

const momentum = {
  hot: [
    "Rage channeled \u2014 when Magee's fury is directed at the ball rather than umpires, he's the best hitter in the NL; 7 categories led",
    "RBI machine \u2014 4\u00D7 NL RBI leader; when runners are on base, Magee's intensity focuses into production",
    "Five-tool engagement \u2014 when all tools are working \u2014 hitting, running, fielding, throwing, power \u2014 Magee is the best player on the field",
    "Steals of home \u2014 23 career, twice in one game; when Magee reads the pitcher, the aggression becomes art",
  ],
  cold: [
    "Suspension \u2014 the Finneran incident cost 5 weeks; 20% chance per season of umpire confrontation leading to suspension",
    "Teammate conflict \u2014 'continual crabbing' drives teammates away; -1 clubhouse morale",
    "The manager snub \u2014 after 1914, the betrayal poisons his attitude; -2 commitment to the Phillies",
    "Post-trade decline \u2014 after leaving Philadelphia, Magee's production drops; the intensity needs the home crowd",
  ],
  pressure: "ABSENT. Magee never played in a meaningful World Series. His 11 years with the Phillies produced zero pennants. The 1919 WS (2 pinch-hit ABs vs. Black Sox in a fixed Series) is not a real October test. The team won the pennant the year AFTER he left. CLU 0 by the cruelest absence.",
};

const actions = [
  { title: "Seven Categories Led", type: "Game Action", text: "Your left fielder finishes the season leading the National League in batting average, RBI, runs, total bases, OBP, slugging, and OPS. Seven categories. 154 games played. .331/.445/.507. He is the best hitter in the league and everyone knows it. +4 dominance. The most complete offensive season by any Mugger at OVR 8.", origin: "1910: Magee led the NL in 7 major categories. Highest bWAR among NL position players." },
  { title: "The Finneran Punch", type: "Drama", text: "Called third strike. Your left fielder turns away in disgust. Throws his bat in the air. The umpire ejects him. Your left fielder wheels back. A quick left just above the jaw. The umpire falls unconscious, blood spurting from his face. Field umpire and manager rush in. Suspended five weeks. The Phillies go 13-16 without him and tumble to fourth place. -2 discipline. -1 team. +1 legend. The punch heard round the league.", origin: "July 10, 1911: Magee knocked umpire Bill Finneran unconscious with a single punch." },
  { title: "Two Steals of Home in One Game", type: "Game Action", text: "Your left fielder steals home. Then he steals home AGAIN. In the same game. Against the Cubs. July 20, 1910. An NL record. The same aggression that drives 49 stolen bases and 123 RBI and a batting title. +2 SPD. +2 audacity. The baserunner who treats home plate as a suggestion.", origin: "July 20, 1910: Magee stole home twice in one game vs. Cubs (NL record)." },
  { title: "The Manager's Betrayal", type: "Drama", text: "Your left fielder just finished the best all-around season of his career: .314 BA, led NL in hits, doubles, RBI, slugging. Played SIX positions. Captain of the team. He was promised the manager's job. The Phillies give it to someone else. The next year \u2014 without your left fielder \u2014 the Phillies win their first pennant. -3 justice. -2 morale. The cruelest irony: everything he built, someone else finishes.", origin: "After 1914, Phillies gave manager job to Pat Moran. Traded Magee. Won 1915 pennant." },
  { title: "Five Tools, Dead-Ball Era", type: "Game Action", text: "Your left fielder hits .331. Slugs .507. Steals 49 bases. Leads outfielders in fielding. Throws out runners from left field. In an era when 'small ball' is gospel, your left fielder does EVERYTHING. 'To my mind, Sherwood Magee is one of the best all-around players the game has ever seen.' +3 versatility. +2 historical significance. The five-tool player before the term existed.", origin: "Contemporary: 'Probably the best all-around ball player in the NL.' SABR: 'Five-tool player.'" },
  { title: "Playing Six Positions", type: "Game Action", text: "Your team is demoralized. Injuries everywhere. Your left fielder plays short, second base, center field, first base, AND left field in one season. 'In spite of the constant shifting of position on a hopelessly demoralized team, he proved himself the most valuable batsman in the league.' +2 versatility. +1 leadership. The one player who couldn't be broken.", origin: "1914: Magee played LF, SS, 2B, CF, 1B due to Phillies injuries. Led NL in 4 categories." },
  { title: "The Fixed Series", type: "Drama", text: "Your left fielder's last games in the major leagues are 2 pinch-hit at-bats in the 1919 World Series. He manages a single. The Series is fixed \u2014 the Black Sox are throwing games. His entire October career is 2 at-bats in a lie. +0 CLU. -1 dignity. The wrong goodbye.", origin: "1919 WS: Magee had 2 PH ABs for Reds vs. Black Sox in the fixed Series." },
  { title: "The Umpire Becomes the Umpire", type: "Drama", text: "Your retired outfielder \u2014 the man who knocked out umpire Bill Finneran with a single punch \u2014 becomes a National League umpire in 1928. The irony is perfect. One year later he is dead of pneumonia. He is 44. He never made the Hall of Fame. +2 irony. -2 mortality.", origin: "Magee became an NL umpire in 1928. Died of pneumonia 1929 at age 44." },
];

const art = {
  face: "INTENSE, VOLATILE, POWERFUL, HANDSOME-DANGEROUS. 5'11\" 179 lbs \u2014 solid, athletic, the body of a genuine five-tool player. The face should radiate CONTROLLED FURY \u2014 not Zimmerman's unfocused menace but DIRECTED AGGRESSION. Strong jaw, hard eyes, a mouth set in what's either determination or the beginning of a snarl. This is the face of a man who knocked an umpire unconscious with one punch and hit .331 in the same era. Dark, intense eyes that CHALLENGE the viewer. The look of a man who was called 'the best all-around player in the NL' and believed it absolutely. Not a psychopath's blank stare \u2014 more a PREDATOR'S focus.",
  attire: "Philadelphia Phillies 1910 whites \u2014 block 'P' on cap, cream flannel. THE POSE: the right-handed swing at full extension \u2014 VIOLENT and BEAUTIFUL. The swing of a .331 hitter who also slugged .507. Or: sliding into home, stealing it for the 23rd time, with the same aggression he brought to Finneran's jaw. Or: in left field, poised, athletic, the outfielder who led the NL in multiple defensive categories. The body language should communicate COILED ENERGY \u2014 always ready to hit, run, field, or fight.",
  mood: "INTENSE AND DANGEROUS. The card should feel like CONTROLLED VIOLENCE applied to baseball. Not the joy of Doyle. Not the intellectual composure of Meyers. Not the grim endurance of Alexander. FURY as a tool. The energy of a man who could do everything on a baseball field and was angry about everything off it.",
  style: "Sepia-toned with BAKER BOWL RED-BROWN and CLARENDON IRON \u2014 the dusty red-brown of Baker Bowl's infield dirt and the dark iron-gray of Pennsylvania mill country. Where Cravath at Baker Bowl was SUNBAKED RED (exploiting the park), Magee at Baker Bowl is IRON AND DIRT \u2014 the five-tool player grinding through the same park by force rather than trick. The palette should feel HARD and PHYSICAL \u2014 no gold, no warmth. The color of a man who worked.",
  reference: "The intense face. The violent swing. Baker Bowl dirt. Pennsylvania iron. The card should feel like the most PHYSICALLY DANGEROUS card in the Muggers collection \u2014 not the most powerful (that's Jackson or Speaker) but the most VOLATILE. The viewer should feel that this card might punch them.",
};

const Cl = {
  parchment: "#ebe0c6", darkBrown: "#2a1a0e", medBrown: "#7a5530",
  gold: "#b88828", warmRed: "#8a3020", sepia: "#7a6040",
  cream: "#f4ecd8", ink: "#2a1808", hotRed: "#a83020",
  coldBlue: "#3a6480", traitGreen: "#4a7c59", iron: "#5a5a58",
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

export default function SherryMageeCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.iron}15 0%, #18120a 50%, ${Cl.warmRed}10 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ position: "absolute", top: 12, left: 12, background: `${Cl.warmRed}dd`, color: Cl.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>{d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.iron, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>Five-Tool &bull; Psychopathic Slugger &bull; Baker Bowl</div>
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1910 &mdash; LED NL IN 7 CATEGORIES &bull; BATTING CHAMPION &bull; BEST bWAR NL</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>0 WS WITH PHILLIES &bull; NOT IN HOF &bull; DIED AGE 44</div>
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
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Key Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 60, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" || l.affinity === "SUPREME" ? `${Cl.traitGreen}20` : l.affinity === "ABSENT" || l.affinity === "DENIED" ? `${Cl.warmRed}20` : `${Cl.sepia}20`, color: l.affinity === "HIGH" || l.affinity === "SUPREME" ? Cl.traitGreen : l.affinity === "ABSENT" || l.affinity === "DENIED" ? Cl.warmRed : Cl.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Magee's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, hof: false, most_similar: "Bobby Veach", chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
