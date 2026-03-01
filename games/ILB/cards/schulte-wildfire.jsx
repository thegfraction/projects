import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/schulte-wildfire.png";

const d = {
  name: "Wildfire Schulte", nickname: "Wildfire", year: 1911, team: "Chicago Cubs",
  era: "1910s", ilb_team: "Muggers 1910", position: "RF", bats: "L", throws: "L",
  height: '5\'11"', weight: "170 lbs",
  born: "September 17, 1882 — Cochecton, NY",
  died: "October 2, 1949 — Oakland, CA (age 67)",
};

const s = { ovr: 8, con: 3, pow: 3, spd: 2, def: 1, clu: 2 };

const realStats = [
  { label: "BA", val: ".300" }, { label: "HR", val: "21" },
  { label: "RBI", val: "107" }, { label: "SLG", val: ".534" },
  { label: "2B", val: "30" }, { label: "3B", val: "21" },
  { label: "SB", val: "23" }, { label: "TB", val: "308" },
];

const careerStats = [
  { label: "CAR BA", val: ".270" }, { label: "CAR H", val: "1,766" },
  { label: "CAR HR", val: "92" }, { label: "CAR SB", val: "233" },
  { label: "WS BA", val: ".321" }, { label: "WS TITLES", val: "2" },
  { label: "SB HOME", val: "22" }, { label: "MVP", val: "1911" },
];

const badges = [
  "\u{1F3C6} 2\u00D7 WS Champ (1907-08)", "\u{1F3C5} First NL MVP (1911)", "\u2B50 20-20-20-20 Club (1st ever)",
  "\u{1F40E} Named After a Racehorse", "\u{1F4CE} Hairpin Superstition", "\u{1F3E0} 22 Steals of Home",
  "\u{1F4D6} Ring Lardner Character", "\u{1F4A5} 4 Grand Slams (1911)",
];

const justification = {
  con: ".300 BA in 1911 \u2192 tier 3 (.300-.319). Career .270 \u2014 the .300 was a career high. Usually a .270-.280 hitter. Not an elite contact man, but solid with a thin-handled 40-oz bat that he broke 50 times a season. Rating of 3.",
  pow: "21 HR in 1911 \u2192 led NL. .534 SLG. 4 grand slams in one season (first ever). In dead-ball context, 21 HR was enormous. 2\u00D7 NL HR champion (1910-11). But career only 92 HR, and output dropped sharply after 1911 (never exceeded 12 again). One towering peak, not sustained. Rating of 3.",
  spd: "23 SB in 1911. 233 career SB. 21 triples in 1911. 22 STEALS OF HOME in career \u2014 among the most daring baserunners in dead-ball history. Consistent speed. But not elite-elite (not Speaker or Cobb level). Rating of 2.",
  def: "Solid RF/LF. No standout defensive reputation \u2014 overshadowed by Tinker-Evers-Chance infield. Played outfield competently for 15 years but no assists records or defensive awards. Rating of 1.",
  clu: ".321 WS BA across 21 games \u2014 excellent. 4\u00D7 WS participant (1906-08, 1910). 2\u00D7 WS champion (1907, 1908). .389 in 1908 WS (outperformed Cobb). 13-game WS hitting streak (record). PS BA >.300 plus WS champion bonus. Rating of 2.",
};

const personality = {
  "Leadership Style": "THE ECCENTRIC CORE. Schulte was the wild heart of the Tinker-to-Evers-to-Chance Cubs \u2014 the position player who brought personality and chaos to a team famous for its infield precision. He outlasted all of them. When Tinker, Evers, and Chance were gone, Wildfire was still in right field, the last ember of the dynasty.",
  "Temperament": "SUPERSTITIOUS, ECCENTRIC, JOYFUL. Joe Tinker: 'I doubt whether a quainter or more original character ever existed in the National Pastime.' Schulte combed city streets looking for hairpins before games \u2014 bigger hairpins predicted bigger hits, bent ones indicated hit direction. Used thin-handled 40-oz bats called 'switches,' broke about 50 per season. Named his racehorse after a Lillian Russell play, then got named after the horse. Drinking buddy of Ring Lardner.",
  "Work Ethic": "RELENTLESS AND DARING. Played all 154 games in 1911 while winning MVP, hitting for the cycle, joining the 20-20-20-20 club, hitting 4 grand slams, and getting married. 22 career steals of home \u2014 extraordinary aggression. The thin-handled bat was a choice: more bat speed, less durability, more contact quality. He chose to break 50 bats a year because it worked.",
  "Lifestyle": "RING LARDNER'S MUSE. Schulte and Lardner closed many Chicago bars together. Lardner used Schulte as a character in the 'You Know Me, Al' stories \u2014 the most famous baseball fiction of the era. Owned racehorses, including trotters he raced on ice in upstate New York. Married Mabel Kirby during the 1911 season. Settled in Oakland, CA. Died three days before the 1949 World Series.",
  "Clubhouse Impact": "THE SPARK. +2 morale (eccentricities entertain). +1 aggression (22 steals of home inspire reckless baserunning). +1 literary legacy (Ring Lardner immortalizes the team). -1 predictability (hairpin-dependent performance). The most FUN player on the Muggers.",
  "\u26A0 Hidden Complexity": "One peak. The 1911 season is all-time great \u2014 first MVP, first 20-20-20-20, first 4 grand slams. But Schulte was a .270 hitter before and after. Never hit more than 12 HR again. Career WAR is modest (~20). Not HOF material by accumulation. The 1911 season is a bonfire \u2014 spectacular, brief. Wildfire indeed: the name predicted the career arc.",
};

const chemistry = [
  { tag: "20-20-20-20", desc: "First player EVER: 30 2B, 21 3B, 21 HR, 23 SB in 1911. Only Mays (1957), Rollins, and Granderson have joined. +3 versatility. The most COMPLETE offensive season by any Mugger not named Speaker." },
  { tag: "The Hairpin Prophecy", desc: "Searched streets for hairpins before games. Bigger pin = bigger hit. Bent pin = predicted direction. 30% chance pregame of finding one: if found, +1 CON that game. If not, -1 confidence." },
  { tag: "Wildfire", desc: "Named after a racehorse, named after a Lillian Russell play. +1 personality. +1 nickname quality. Brilliant, brief, impossible to forget." },
  { tag: "The Thin-Handled Bat", desc: "40-oz 'switches' with thin handles. Broke ~50/season. +1 bat speed. -1 bat durability. 10% chance per game of bat breaking at critical moment." },
  { tag: "Twenty-Two Steals of Home", desc: "22 career steals of home. 15% chance per game of attempting. When successful: +2 aggression, opponent morale -2." },
  { tag: "Tinker to Evers to Chance", desc: "Last surviving member of the Cubs dynasty (1906-10). 4 pennants, 2 titles. With dynasty-era teammates: +2 chemistry. When they're gone: +1 loneliness." },
  { tag: "Ring Lardner's Character", desc: "Drinking buddy of Ring Lardner. Appeared in 'You Know Me, Al' stories. +2 cultural legacy. The only Mugger who's also a fictional character." },
  { tag: "First MVP", desc: "Won the inaugural NL Chalmers Award (1911). Prize: a Chalmers automobile. +2 historical significance." },
];

const locations = [
  { location: "West Side Grounds / Chicago", affinity: "HIGH", note: "1904-16. Cubs dynasty. 4 pennants, 2 titles." },
  { location: "Right Field", affinity: "HIGH", note: "Primary position during peak years. Also played LF." },
  { location: "The World Series", affinity: "HIGH", note: ".321 WS BA. 13-game streak. .389 in 1908. 2\u00D7 champion." },
  { location: "The Basepaths", affinity: "HIGH", note: "22 steals of home. 233 career SB. Most dangerous baserunner on Muggers." },
  { location: "Chicago Streets (Pre-Game)", affinity: "MEDIUM", note: "Searching for hairpins. Bigger pin = bigger hit." },
];

const momentum = {
  hot: [
    "The hairpin found \u2014 when Schulte finds a large hairpin before the game, +1 CON for the day",
    "Aggressive baserunning \u2014 when stealing, taking extra bases, entire team's aggression rises",
    "1911-style explosion \u2014 rare peak: power, speed, and contact simultaneously; 20-20-20-20 activated",
    "World Series hitting \u2014 .321 career WS BA; big stage brings out his best",
  ],
  cold: [
    "No hairpin found \u2014 confidence drops; -1 CON; superstition works both ways",
    "Broken bat at wrong time \u2014 thin handles snap at critical moments; -1 POW",
    "Post-peak decline \u2014 after 1911, never exceeded 12 HR; fire burns hot and brief",
    "Dynasty ending \u2014 as teammates leave, performance drops; loneliness of the last one",
  ],
  pressure: "EXCELLENT in October. .321 career WS BA across 21 games. .389 in 1908 WS (outperformed Cobb). 13-game WS hitting streak. 2\u00D7 champion. Hit in all but 2 of 21 career WS games. In the regular season a .270 hitter; in October a .321 hitter. The hairpins worked best when stakes were highest. CLU 2 is well-earned.",
};

const actions = [
  { title: "The 20-20-20-20", type: "Game Action", text: "Your right fielder finishes with 30 doubles, 21 triples, 21 home runs, 23 stolen bases. No one has ever done this. The next will be Willie Mays, 46 years from now. +4 versatility. +3 all-time. +1 Chalmers automobile.", origin: "1911: First player in the 20-20-20-20 club. Not matched until Mays 1957." },
  { title: "The Hairpin", type: "Drama", text: "Your right fielder is on his hands and knees on a Chicago sidewalk. He finds a large, straight hairpin. He smiles. Goes 3-for-4 with a homer. The hairpin predicted it. +1 CON. +1 superstition. The biggest pins yield the biggest hits.", origin: "Schulte searched streets for hairpins, believing bigger pins predicted bigger hits." },
  { title: "Four Grand Slams", type: "Game Action", text: "Fourth grand slam of the season. No one has ever hit four in one year. Bases loaded, bases emptied. +3 POW. +2 situational. Four times full. Four times cleared.", origin: "1911: 4 grand slams \u2014 first player to do so in a single season." },
  { title: "Steal of Home", type: "Game Action", text: "Third base. Your runner breaks. The pitcher winds up. The catcher lunges. Safe. Stolen home for the 22nd time. +2 SPD. +2 aggression. -1 opponent composure.", origin: "22 career steals of home \u2014 among the most in dead-ball history." },
  { title: "Wildfire", type: "Drama", text: "A Lillian Russell play. A racehorse. A sportswriter's column. A man. The name travels from stage to stable to newspaper to legend. +2 nickname. +1 origin story. Named after a horse named after a play named after a fire.", origin: "Named after his racehorse, named after a Lillian Russell play." },
  { title: "The Last Cub Standing", type: "Drama", text: "Tinker: traded. Evers: traded. Chance: gone. Brown: gone. Your right fielder is the last. Everyone else is memory. He still takes his position. +1 loyalty. +1 loneliness. The fire still burns, but the others have left.", origin: "Schulte outlasted the entire Tinker-Evers-Chance dynasty, traded mid-1916 as the last link." },
  { title: "Ring Lardner's Friend", type: "Drama", text: "Your right fielder closes another Chicago bar with a sportswriter named Ring. The writer puts your player in a story. The story becomes the most famous baseball fiction ever. +2 cultural legacy. Bars close; stories don't.", origin: "Drinking buddy of Ring Lardner. Appeared in 'You Know Me, Al' stories." },
  { title: "Fifty Broken Bats", type: "Game Action", text: "Thin-handled bat snaps on contact \u2014 the 50th this season. Ball dribbles foul. He calls for another switch. Same thin handle. Same 40 ounces. He'll break this one too. -1 bat. +1 bat speed.", origin: "Used 40-oz thin-handled 'switches,' breaking about 50 per season." },
];

const art = {
  face: "ECCENTRIC, LEAN, ALERT, AMUSED. 5'11\" 170 lbs \u2014 lean and wiry, not bulky. ANIMATED and SLIGHTLY WILD \u2014 searches for hairpins, breaks 50 bats, drinks with Ring Lardner, steals home 22 times. Sharp features, alert eyes, hint of a grin. German-American features. MISCHIEF and FOCUS combined.",
  attire: "Chicago Cubs 1911 whites \u2014 'C' insignia, flat cap. Left-handed swing from a thin-handled bat \u2014 compact, whippy stroke emphasizing BAT SPEED over raw power. Or: sliding into home, stealing it for the 22nd time.",
  mood: "ELECTRIC AND ECCENTRIC. WILDFIRE \u2014 bright, unpredictable, fast-moving, brief. CRACKLING ENERGY of a man who did everything at once in 1911 and then never did it again.",
  style: "Sepia with WILDFIRE ORANGE and CHICAGO NIGHT BLUE \u2014 orange of flames, deep blue of a Chicago evening. Brighter, hotter, more volatile than Cravath's sunbaked red. The palette of a bonfire: spectacular while it burns.",
  reference: "The lean eccentric face. The thin-handled bat. A hairpin on the ground. The baserunner stealing home. ALIVE and UNPREDICTABLE \u2014 the most animated card in the Muggers collection.",
};

// COMPONENT
const C = {
  parchment: "#f2e8d0", darkBrown: "#2a1a10", medBrown: "#7a5030",
  gold: "#d4a040", warmRed: "#a04020", sepia: "#8a6840",
  cream: "#faf2e0", ink: "#2a1a0a", hotRed: "#d44020",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59", wildfire: "#d06020",
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

const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>);
const Sec = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function WildfireSchulteCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.wildfire}20 0%, #1a1208 50%, ${C.wildfire}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>INFINITY LEAGUE BASEBALL</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card &mdash; Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "\u25BC Flip Card \u2014 View Dossier \u25BC" : "\u25B2 Flip Card \u2014 View Front \u25B2"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.wildfire}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>&ldquo;{d.nickname}&rdquo; &mdash; {d.team} &mdash; {d.year}</div>
              <div style={{ fontSize: 9, color: C.wildfire, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>First NL MVP &bull; First 20-20-20-20 Member</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.wildfire} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1911 &mdash; LED NL: HR, RBI, SLG, TB &bull; 30 2B / 21 3B / 21 HR / 23 SB</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {careerStats.map((st, i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div></div>))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER &mdash; 4x WS &bull; 2x CHAMPION &bull; .321 WS BA</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (<span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER &mdash; {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? C.darkBrown : "transparent", color: tab === t ? C.gold : C.medBrown, border: `1px solid ${tab === t ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (<Sec key={k} title={k}><p style={{ margin: 0, ...(k.includes("\u26A0") ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{v}</p></Sec>))}
              {tab === "chemistry" && (<><Sec title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div><div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{c.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{c.desc}</span></div>))}</div></Sec><Sec title="Preferred Locations">{locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 50, textAlign: "center", fontFamily: "'Courier Prime', monospace", background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.sepia }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> &mdash; {l.note}</span></div></div>))}</Sec></>)}
              {tab === "momentum" && (<><Sec title="Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>{"\u25B8"} {t}</div>)}</Sec><Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{momentum.pressure}</p></Sec></>)}
              {tab === "actions" && (<Sec title="Action Card Seeds">{actions.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 900 }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`, color: a.type === "Drama" ? C.warmRed : C.coldBlue }}>{a.type}</span></div><p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Sec>)}
              {tab === "engine" && (<Sec title="Schulte's Stat Derivation">{Object.entries(justification).map(([k, v]) => (<div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{k}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{v}</span></div>))}</Sec>)}
              {tab === "art" && (<Sec title="Visual Art Direction">{Object.entries(art).map(([k, v]) => (<div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{k}:</span>{" "}<span style={{ color: C.medBrown }}>{v}</span></div>))}</Sec>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB &bull; {d.ilb_team}</span>
          <span>{d.era} &bull; {d.position} &bull; OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1208", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
