import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/zimmerman-heinie.png";

const d = {
  name: "Heinie Zimmerman", nickname: "The Great Zim", year: 1912, team: "Chicago Cubs",
  era: "1910s", ilb_team: "Muggers 1910", position: "3B", bats: "R", throws: "R",
  height: '5\'11"', weight: "176 lbs",
  born: "February 9, 1887 — Bronx, NY",
  died: "March 14, 1969 — New York, NY (age 82)",
};

const s = { ovr: 8, con: 4, pow: 3, spd: 1, def: 1, clu: 0 };

const realStats = [
  { label: "BA", val: ".372" }, { label: "HR", val: "14" },
  { label: "RBI", val: "104" }, { label: "SLG", val: ".571" },
  { label: "H", val: "207" }, { label: "2B", val: "41" },
  { label: "3B", val: "17" }, { label: "TB", val: "318" },
];

const careerStats = [
  { label: "CAR BA", val: ".295" }, { label: "CAR H", val: "1,566" },
  { label: "CAR HR", val: "58" }, { label: "CAR RBI", val: "796" },
  { label: "RBI TITLES", val: "3" }, { label: "WS BA", val: ".120*" },
  { label: "BANNED", val: "1919" }, { label: "SEASONS", val: "13" },
];

const badges = [
  "\u{1F451} 1912 NL Triple Crown", "\u{1F4A5} .372 / 14 HR / 104 RBI",
  "\u{1F3C6} 2\u00D7 WS Champ (Cubs 1907-08)", "\u{1F3C5} 3\u00D7 NL RBI Leader",
  "\u26A0\uFE0F Banned (Game-Fixing)", "\u274C .120 in 1917 WS",
  "\u{1F3AD} The Great Zim (Self-Named)", "\u{1F52A} Traded for Larry Doyle",
];

const justification = {
  con: ".372 BA in 1912 (Triple Crown) \u2192 tier 5 (\u2265.340). Led NL in hits (207) and doubles (41). But career .295 \u2014 the .372 was a one-year explosion. Most years .280-.310. Cy Williams: 'He was swinging at balls a foot over his head and driving them safe. You can get away with murder when the luck is with you.' Given career context (.295 vs. peak .372), rating of 4 \u2014 acknowledging the extraordinary peak but not the sustained elite of a true CON 5.",
  pow: "14 HR in 1912 (led NL). .571 SLG. 9 RBI in one game (2 HR, 1 3B, 1 1B). Tinker: 'the strongest pair of hands and arms I have ever seen on a human being.' 58 career HR, led NL in doubles (41). Dead-ball era strong power. Rating of 3.",
  spd: "175 career SB. Stole home at least once. But not identified as a speed player \u2014 average runner. Not the baserunning daring of Schulte (22 steals of home) or the speed of Doyle (298 SB). Rating of 1.",
  def: "Erratic. 4 errors in one game (May 10, 1910). Below-average fielding percentage. Good range factor \u2014 reached balls others couldn't. 'Played baseball by ear.' The 1917 WS rundown was not his fault (nobody covered home), but the erratic reputation is earned. Rating of 1.",
  clu: "1917 WS: .120 BA. The infamous rundown in G6 \u2014 chasing Eddie Collins home while nobody covered the plate. NY Times obituary headline: 'Committed 1917 Series Boner.' 1910 WS: .235. Only 1907 was a win (limited role). The October record is catastrophic. Rating of 0.",
};

const personality = {
  "Leadership Style": "THE CHAOS AGENT. Zimmerman did not lead \u2014 he disrupted. He fought with teammates (punched Jimmy Sheckard, brawled with Roger Bresnahan). He fought with umpires. He got suspended repeatedly. He was described as 'one of the most interesting problems of baseball \u2014 energy being misdirected and talents largely wasted.' When his energy was directed, he won the Triple Crown. When it wasn't, he committed four errors in a game.",
  "Temperament": "VOLATILE AND ERRATIC. Warren Brown: 'Played his baseball by ear' and 'was no mental giant.' Joe Tinker 'doubted whether a quainter or more original character ever existed.' Extreme mood swings dictated his effort day to day. Announced his retirement after multiple seasons, then changed his mind. Referred to himself as 'The Great Zim' in third person \u2014 fans loved it, management endured it.",
  "Work Ethic": "INCONSISTENT TO THE POINT OF SELF-DESTRUCTION. When motivated, Zimmerman was a Triple Crown winner with the strongest arms in baseball. When unmotivated, he was suspended for 'laying down on the job.' The gap between his best and worst was wider than any player on the Muggers roster. A plumber's apprentice at 14 who earned $2/day and $20/weekend playing semi-pro \u2014 the hunger was real, but the discipline was absent.",
  "Lifestyle": "BRONX STREETS TO BANNED. Born in the Bronx. Plumber's apprentice. Sandlot star at 163rd and Southern Boulevard. Married 17-year-old Helen Chasar in 1912 (his Triple Crown year). After baseball: returned to the Bronx. Operated a speakeasy during Prohibition. Worked as a steamfitter. Died in New York at 82. His NY Times obituary was headlined with the 1917 'boner,' not the Triple Crown.",
  "Clubhouse Impact": "THE PROBLEM. -2 clubhouse harmony (fights with teammates). -1 discipline (suspensions, erratic effort). +2 offensive production when engaged. +1 entertainment (third-person references, fights, chaos). The most VOLATILE player on the Muggers \u2014 high ceiling, no floor.",
  "\u26A0 Hidden Complexity": "BANNED. In 1919, Zimmerman and Hal Chase tried to bribe teammates to throw games. Offered pitcher Rube Benton $400. Offered outfielder Benny Kauff $125/game. McGraw suspended him. Both were indicted for bribery during the Black Sox hearings and banned by Landis. Zimmerman denied it. He was never formally connected to the Black Sox. But the pattern \u2014 the erratic effort, the 'laying down,' the sudden mood swings that dictated performance \u2014 made the corruption charge believable. The Great Zim's greatness was always conditional. The Triple Crown proves the ceiling. The ban proves the floor. Both are real.",
};

const chemistry = [
  { tag: "Triple Crown", desc: ".372/14 HR/104 RBI in 1912. Led NL in BA, HR, RBI, H, 2B, SLG, TB. The highest single-season peak of any Mugger not named Johnson or Speaker. +4 offensive ceiling. But only one year." },
  { tag: "The Great Zim", desc: "Self-styled nickname, delivered in third person. +1 entertainment. +1 ego. -1 teammate patience. 'The Great Zim doesn't do that' was apparently a real sentence he said." },
  { tag: "Erratic Effort", desc: "Mood-dependent performance. 30% chance any game of Zimmerman 'laying down on the job' \u2014 effort drops to minimum. 20% chance of extraordinary effort. The rest is average." },
  { tag: "The Rundown", desc: "1917 WS G6: chased Eddie Collins home because nobody covered the plate. Blamed for losing the Series. Actually not his fault. +1 injustice. -2 reputation. The play that became his obituary." },
  { tag: "The Strongest Arms", desc: "Tinker: 'the strongest pair of hands and arms I have ever seen on a human being.' +1 POW. +1 arm strength. The raw physical tools were extraordinary." },
  { tag: "Traded for Doyle", desc: "Zimmerman and Larry Doyle were literally swapped in 1916 (Cubs to Giants for Doyle). If both on Muggers roster: +1 narrative irony. They traded lives." },
  { tag: "The Ban", desc: "Banned for trying to fix games with Hal Chase in 1919. Indicted for bribery. -3 integrity. -2 legacy. The Triple Crown winner who ended as a pariah." },
  { tag: "Plumber's Apprentice", desc: "Born Bronx. $2/day fixing faucets at 14. $20/weekend playing semi-pro. +1 origin. The hunger was real. The ethics were not." },
];

const locations = [
  { location: "West Side Grounds / Chicago", affinity: "HIGH", note: "1907-16. Triple Crown. 2\u00D7 WS champion. The peak." },
  { location: "Polo Grounds / New York", affinity: "COMPLEX", note: "1916-19. RBI titles. 1917 WS disaster. The ban. McGraw's reclamation project." },
  { location: "Third Base", affinity: "HIGH", note: "Primary position. Erratic defense. Strongest arms in baseball." },
  { location: "The World Series", affinity: "LOW", note: ".120 in 1917. The rundown. The 'boner.' The obituary headline." },
  { location: "The Bronx", affinity: "HIGH", note: "Born. Raised. Sandlots. Returned after ban. Operated a speakeasy. Died there." },
];

const momentum = {
  hot: [
    "Engaged and motivated \u2014 when Zimmerman cares, he wins Triple Crowns; the talent is undeniable",
    "Early in games \u2014 strongest effort in first 5 innings before attention wanders",
    "Against weaker teams \u2014 Zimmerman elevated against inferior opponents; dominated bad pitching",
    "After confrontation \u2014 fights with teammates sometimes focused his energy into hitting",
  ],
  cold: [
    "Laying down \u2014 30% chance any game of minimal effort; suspended multiple times for it",
    "World Series \u2014 .120 in 1917; October pressure revealed the worst version of Zimmerman",
    "Late-season malaise \u2014 in 1912 Triple Crown year, only 2 hits in final full week",
    "Authority clashes \u2014 fights with managers, umpires, teammates scatter his focus",
  ],
  pressure: "CATASTROPHIC. .120 BA in the 1917 WS \u2014 one of the worst performances by a star player in Series history. The rundown play in G6, while not technically his fault, became the defining image. .235 in the 1910 WS. Only the 1907 WS (win, limited role) was positive. Zimmerman under pressure was Zimmerman at his worst. CLU 0 is earned through consistent, dramatic October failure.",
};

const actions = [
  { title: "The Triple Crown", type: "Game Action", text: "Your third baseman finishes the season leading the National League in batting average (.372), home runs (14), and runs batted in (104). Also: hits (207), doubles (41), slugging (.571), total bases (318). No one has done this in the NL since. Your player finished sixth in MVP voting. +5 offense. +0 recognition. The greatest season by a player nobody will remember.", origin: "1912: Zimmerman won the NL Triple Crown. Finished 6th in MVP voting." },
  { title: "The Rundown", type: "Drama", text: "World Series Game 6. Eddie Collins is trapped between third and home. Your catcher charges up the line. Your pitcher should cover the plate. Your first baseman should cover the plate. Neither moves. Your third baseman chases Collins with the ball. Collins scores. The White Sox win the game and the Series. Your third baseman is blamed. His obituary will lead with this play. -3 CLU. -2 reputation. +1 injustice (it wasn't his fault).", origin: "1917 WS G6: Nobody covered home. Zimmerman chased Collins. Blamed forever." },
  { title: "Nine RBI in One Game", type: "Game Action", text: "Two three-run home runs. A two-run triple. A single. Nine runs batted in \u2014 a club record. Your third baseman has the strongest arms in baseball and today he used them all. +4 POW. +2 single-game dominance.", origin: "Zimmerman drove in 9 runs on 2 HR, 1 3B, 1 1B against Boston \u2014 Cubs club record." },
  { title: "The Great Zim Speaks", type: "Drama", text: "'The Great Zim doesn't do that,' your third baseman says, referring to himself in the third person for the seventh time today. His teammates exchange glances. The fans cheer. Management sighs. +1 entertainment. -1 clubhouse patience. +1 ego.", origin: "Zimmerman called himself 'The Great Zim' in third person. Fans loved it." },
  { title: "Laying Down on the Job", type: "Drama", text: "Your third baseman has been suspended for 'laying down on the job.' He is not injured. He is not sick. He simply decided not to try today. Or yesterday. The talent is there. The effort is not. -2 performance. -1 team trust. The most talented quitter in the National League.", origin: "Zimmerman was suspended multiple times for lack of effort, including at time of his 1916 trade." },
  { title: "The Bribe", type: "Drama", text: "Your third baseman offers a pitcher $400 to ease up. He offers an outfielder $125 per game to help throw games. The word reaches management. Your player is suspended. He is indicted for bribery. He is banned from baseball. The Triple Crown winner becomes a pariah. -5 integrity. -3 legacy. The plumber's apprentice who couldn't stop cutting corners.", origin: "1919: Zimmerman and Chase tried to bribe teammates. Both banned." },
  { title: "Traded Lives", type: "Drama", text: "Your team trades its third baseman for the Giants' second baseman. Zimmerman for Doyle. Doyle for Zimmerman. The Great Zim goes to New York. Laughing Larry goes to Chicago. One will be banned. One will end up in a tuberculosis sanatorium. Neither will make the Hall of Fame. +1 narrative symmetry. -1 for both.", origin: "1916: Cubs traded Zimmerman to Giants for Larry Doyle." },
  { title: "The Strongest Arms", type: "Game Action", text: "Joe Tinker watches your third baseman take batting practice. 'The strongest pair of hands and arms I have ever seen on a human being.' Your player swings at a ball a foot over his head and drives it safe. You can get away with murder when the luck is with you. +2 raw power. +1 Tinker's amazement.", origin: "Tinker on Zimmerman's physical gifts. Cy Williams on his lucky 1912." },
];

const art = {
  face: "THICK, PUGNACIOUS, VOLATILE, BRONX. 5'11\" 176 lbs \u2014 stocky, powerful, built like the plumber's apprentice he was at 14. The face should be HARD and ANIMATED \u2014 not cruel, but UNPREDICTABLE. The face of a man who might hit a Triple Crown today or punch a teammate tomorrow. Strong jaw, thick neck, dark features (German-American, Bronx-born). The expression: a SMIRK that's half confidence, half menace. 'The Great Zim' in third person. The eyes should be SHARP but UNFOCUSED \u2014 intelligent enough to win a Triple Crown, erratic enough to get banned for bribery.",
  attire: "Chicago Cubs 1912 whites \u2014 'C' insignia, flat cap. THE POSE: the right-handed power swing \u2014 Zimmerman's strongest arms in baseball uncoiling on a ball 'a foot over his head,' driving it safe. The swing should look RAW and MUSCULAR \u2014 not the thin-handled elegance of Schulte or the line-drive precision of Wheat. A PLUMBER'S SWING \u2014 brute force applied to horsehide.",
  mood: "VOLATILE AND ELECTRIC. The card should feel DANGEROUS \u2014 not in the fun way of Schulte's wildfire but in the unpredictable way of a man whose effort varies wildly and whose morality is questionable. The energy of a Bronx sandlot: raw, competitive, not entirely trustworthy.",
  style: "Sepia-toned with BRONX BRICK RED and TARNISHED GOLD \u2014 the red of Bronx tenement brick, the gold that's been handled too much and lost its shine. Where Doyle is golden hour (radiant youth), Zimmerman is TARNISHED GOLD \u2014 the same promise, corroded. The palette of a Triple Crown that leads to a ban.",
  reference: "The thick pugnacious face. The power swing. Bronx brick in the background. The card should feel like POTENTIAL WASTED \u2014 the most talented problem in the National League, the Triple Crown winner who ended as a speakeasy operator in the Bronx.",
};

const Cl = {
  parchment: "#f0e4c8", darkBrown: "#2a1810", medBrown: "#7a4a28",
  gold: "#c49030", warmRed: "#9b3020", sepia: "#886030",
  cream: "#f8f0dc", ink: "#2a1808", hotRed: "#c43828",
  coldBlue: "#3a6880", traitGreen: "#4a7c59", tarnish: "#a87828",
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

export default function HeinieZimmermanCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${Cl.tarnish}20 0%, #1a1208 50%, ${Cl.warmRed}15 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <span style={{ background: `${Cl.warmRed}ee`, color: Cl.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>\u26A0 BANNED</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: Cl.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>&ldquo;{d.nickname}&rdquo; &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: Cl.warmRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>NL Triple Crown &bull; Banned for Game-Fixing</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={Cl.tarnish} />
              <StatBar label="POW" value={s.pow} max={5} color={Cl.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={Cl.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={Cl.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={Cl.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: Cl.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: Cl.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1912 &mdash; NL TRIPLE CROWN &bull; .372 / 14 HR / 104 RBI</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${Cl.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${Cl.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: Cl.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: Cl.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: Cl.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER &mdash; BANNED 1919 &bull; *1917 WS: .120 BA</div>
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
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: Cl.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: Cl.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 60, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${Cl.traitGreen}20` : l.affinity === "LOW" ? `${Cl.warmRed}20` : `${Cl.sepia}20`, color: l.affinity === "HIGH" ? Cl.traitGreen : l.affinity === "LOW" ? Cl.warmRed : Cl.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: Cl.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: Cl.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: Cl.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${Cl.darkBrown}08`, border: `1px solid ${Cl.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${Cl.warmRed}20` : `${Cl.coldBlue}20`, color: a.type === "Drama" ? Cl.warmRed : Cl.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: Cl.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Zimmerman's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: Cl.ink }}>{k}:</span>{" "}<span style={{ color: Cl.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: Cl.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr} &bull; \u26A0 BANNED</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1208", borderRadius: 6, padding: 16, border: `1px solid ${Cl.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: Cl.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: Cl.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, banned: true, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
