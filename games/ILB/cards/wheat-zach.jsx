import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/wheat-zack.png";

const d = {
  name: "Zack Wheat", nickname: "Buck", year: 1924, team: "Brooklyn Robins",
  era: "1910s", ilb_team: "Muggers 1910", position: "LF", bats: "L", throws: "R",
  height: '5\'10"', weight: "170 lbs",
  born: "May 23, 1888 — Hamilton, MO",
  died: "March 11, 1972 — Sedalia, MO (age 83)",
};

const s = { ovr: 9, con: 5, pow: 2, spd: 1, def: 2, clu: 1 };

const realStats = [
  { label: "BA", val: ".375" }, { label: "OBP", val: "~.415" },
  { label: "SLG", val: "~.549" }, { label: "H", val: "212" },
  { label: "2B", val: "41" }, { label: "3B", val: "8" },
  { label: "HR", val: "14" }, { label: "RBI", val: "97" },
];

const careerStats = [
  { label: "CAR BA", val: ".317" }, { label: "CAR H", val: "2,884" },
  { label: "CAR 2B", val: "476" }, { label: "CAR 3B", val: "172" },
  { label: "CAR HR", val: "132" }, { label: "CAR RBI", val: "1,248" },
  { label: "WAR", val: "59.9" }, { label: "SEASONS", val: "19" },
];

const badges = [
  "⭐ HOF 1959", "🏅 1918 NL Batting Champ", "📊 .375 BA (1923 & 1924)",
  "🏟️ Dodgers All-Time Hits Leader", "🧤 7× NL LF Putouts Leader",
  "💎 Never Ejected (19 years)", "👑 13× .300 Seasons", "🎣 Lake of the Ozarks",
];

const justification = {
  con: ".375 BA in 1924 → tier 5 (≥.340). Also .375 in 1923 — back-to-back .375 seasons at ages 35-36. Won 1918 NL batting title (.335). Career .317 BA, 2,884 hits. Hit .300+ in 13 full seasons. Averaged .347 from 1920-25. Three 200-hit seasons in his mid-30s. The purest line-drive hitter in Brooklyn history. Rating of 5.",
  pow: "16 HR career high (1922). .541 SLG best (1925). 476 career doubles, 172 triples — gap power, not over-the-fence power. Four consecutive seasons of .500+ SLG from 1922-25. In the dead-ball era context, moderate power that increased with the lively ball. Rating of 2.",
  spd: "205 career SB, 15 triples in 1910 rookie year — early speed that declined. Had notoriously tiny feet (size 5) that caused chronic ankle injuries and limited his mobility. Not a base-stealing threat in his prime years. Rating of 1.",
  def: "Led NL LF in putouts 7 times and fielding percentage twice (.966 career). 'Stylish and graceful outfielder.' Branch Rickey: 'the best outfielder Brooklyn ever had.' Strong arm. Not elite-elite (Speaker level) but consistently excellent. Rating of 2.",
  clu: "1916 WS: .211 BA — poor, as Boston pitching (Ruth, Shore) shut Brooklyn down. 1920 WS: .333 BA — better, but Brooklyn lost in 7. Only 2 pennants in 19 years — Brooklyn was mostly mediocre. Limited October opportunity and mixed results. Rating of 1.",
};

const personality = {
  "Leadership Style": "THE BELOVED CAPTAIN. Wheat was named Brooklyn team captain in 1919 and held the role for years. His leadership was through kindness, consistency, and example. Casey Stengel: 'One of the grandest guys ever to wear a baseball uniform, one of the greatest batting teachers I have ever seen, one of the truest pals a man ever had and one of the kindliest men God ever created.' He mentored young players generously — even recommended his own friend Stengel to the team.",
  "Temperament": "SERENE AND UNHURRIED. Never ejected from a game in a 19-year career. Stengel: 'I never saw Wheat really angry, and I never heard him use cuss words.' The only great ballplayer who never got booed. He chewed tobacco, smoked cigars, and ignored all rules about physical conditioning: 'I think they are a lot of bunk. The less you worry about the effect of tea and coffee on the lining of your stomach, the longer you will live and the happier you will be.'",
  "Work Ethic": "NATURAL AND ADAPTIVE. Hit .246 in the minors, then .304 as a rookie after changing his entire approach: 'I was young and inexperienced. The fellows encouraged me to bunt. When I came to Brooklyn I adopted an altogether different style of hitting.' Adapted to the lively ball era in his 30s — averaged .347 from 1920-25. The contact skill was innate; the approach was learned.",
  "Lifestyle": "MISSOURI ROOTS. Born in Hamilton, MO. Cherokee heritage from his mother's side. Puritan ancestry from his father's (descended from founders of Concord, MA). Married his second cousin Daisy in 1912 — she became his agent and negotiated raises with hardline holdouts. Size 5 feet caused chronic ankle injuries. After baseball: Kansas City police officer (10 years), bowling alley operator, fishing/hunting resort at Lake of the Ozarks. 'Tell them to learn to chew tobacco.'",
  "Clubhouse Impact": "THE PEACEMAKER. +3 morale. +2 clubhouse harmony. Wheat's presence made teams better through chemistry, not dominance. He never complained about Brooklyn's chronic losing. He never demanded a trade. He was the franchise for 18 years and was grateful for every day. In ILB: the player who raises everyone's floor without anyone noticing until he's gone.",
  "⚠ Hidden Complexity": "The teams were bad. Brooklyn reached .500 in only 5 of Wheat's 18 seasons. He played in only 2 World Series and lost both. The franchise neglected him — even the manager (Wilbert Robinson) held a grudge when Wheat was briefly named player-manager in 1925 after Ebbets died. Robinson returned within two weeks and treated Wheat coldly for years. Wheat deserved better teams, a real shot at managing, and a batting title that wasn't blocked by Hornsby hitting .424. The kindest man in baseball on the worst teams in baseball.",
};

const chemistry = [
  { tag: "The Grandest Guy", desc: "Stengel: 'One of the grandest guys ever to wear a baseball uniform.' +3 morale. +2 clubhouse harmony. The kindest player in the ILB collection. Every teammate plays slightly better with Wheat around." },
  { tag: "Never Ejected", desc: "19 seasons. Zero ejections. Never really angry. Never used cuss words. +2 umpire relations. Wheat never gets squeezed on strike calls — umpires respect the man who respects them." },
  { tag: "Brooklyn Forever", desc: "18 seasons, all-time franchise leader in games, AB, PA, hits, 2B, 3B, and total bases. +3 franchise loyalty. Wheat IS Brooklyn. The Dodgers before Dodger blue." },
  { tag: "Cherokee and Puritan", desc: "Mother Cherokee, father descended from Concord Puritans. Two American identities in one man. +1 cultural depth. +1 adaptability between worlds." },
  { tag: "The Line Drive Swing", desc: "Pure contact hitter — gap-to-gap line drives. +1 CON inherent. -1 HR probability. Wheat doesn't try to hit home runs; he hits ropes that find outfield grass." },
  { tag: "Daisy the Agent", desc: "Wheat's wife Daisy negotiated his contracts with hardline holdouts. +1 salary negotiation. -1 team management relations. The most fearsome negotiator in Wheat's household wasn't Wheat." },
  { tag: "Size Five Feet", desc: "Tiny feet caused chronic ankle injuries. -1 SPD. -1 durability (ankle). The smallest feet on the grandest guy." },
  { tag: "Stengel's Mentor", desc: "Wheat recommended Stengel to Brooklyn and mentored him for 7 years. +1 legacy. 'I never knew him to refuse help to another player, were he a Dodger or even a Giant.'" },
];

const locations = [
  { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "18 seasons. All-time franchise leader. The left field was his for two decades." },
  { location: "Left Field", affinity: "HIGH", note: "Led NL LF in putouts 7×. 'Stylish and graceful.' All-time leader in games played at LF." },
  { location: "Hamilton, Missouri", affinity: "HIGH", note: "Born. Raised. Always a Missouri man — ended up back at Lake of the Ozarks." },
  { location: "The World Series", affinity: "LOW", note: ".211 in 1916, .333 in 1920. Lost both. Brooklyn only got there twice." },
  { location: "Lake of the Ozarks", affinity: "HIGH", note: "Retirement. Fishing resort. Daisy. The quiet ending of a quiet life." },
];

const momentum = {
  hot: [
    "Hitting streaks — 29-game hit streak in 1916; when Wheat gets rolling, the line drives fall for weeks",
    "Late-career renaissance — .347 avg from 1920-25; the older Wheat got, the better he hit with the lively ball",
    "Happy clubhouse — when the team is harmonious, Wheat's CON rises; he feeds on good vibes",
    "Pennant race — 1916: 'I was thinking and dreaming and eating pennants'; the excitement fueled him",
  ],
  cold: [
    "Ankle injuries — size 5 feet, chronic sprains; when ankles flare, games missed and mobility limited",
    "World Series pressure — .211 in 1916 WS against Ruth and the Red Sox; big stage sometimes overwhelmed",
    "Bad teams — Brooklyn was below .500 in 13 of 18 seasons; hard to stay motivated on losing teams year after year",
    "Managerial disappointment — twice denied the managing job he wanted; the one frustration that broke his serenity",
  ],
  pressure: "MIXED. Wheat was a .283 career WS hitter across 12 games — respectable but not dominant. The 1916 WS (.211 vs. Ruth/Shore/Leonard) was poor. The 1920 WS (.333 vs. Cleveland) was better. The sample is too small and the teams too bad to judge fairly. In ILB: Wheat in October is competent but not elevated — CLU 1 reflects the reality. He wasn't built for the spotlight the way he was built for 162 games of quiet excellence.",
};

const actions = [
  { title: "The Only Great Player Never Booed", type: "Drama", text: "Your left fielder takes his position for the 2,322nd time in Brooklyn. He has never been ejected from a game. He has never been booed. In 19 years, nobody has found a reason to dislike him. He hits .317 and chews tobacco and goes home. +3 morale. +2 reputation. The grandest guy in a baseball uniform.", origin: "Stengel: 'Zack Wheat was the only great ballplayer who never got booed.' Zero ejections in 19 seasons." },
  { title: "Three-Seventy-Five, Twice", type: "Game Action", text: "Your left fielder hits .375 for the second consecutive season. He is 36 years old. Only Rogers Hornsby — hitting .424 — prevents the batting title. Your player has been in the league for 16 years and is hitting better than ever. +3 CON. +1 late-career adaptation. Age is a number; line drives are forever.", origin: "1923-24: Wheat hit .375 in consecutive seasons at ages 35-36. Hornsby's .424 blocked the title." },
  { title: "Brooklyn Forever", type: "Drama", text: "Your franchise player has now played 18 seasons for Brooklyn. He holds every significant offensive record: games, at-bats, hits, doubles, triples, total bases. He will hold them for at least a century. He was purchased for $1,200. He is worth every penny of every season. +4 franchise legacy. The scout was right.", origin: "Wheat still holds all-time Dodgers franchise records in games, AB, hits, 2B, 3B, total bases." },
  { title: "Twenty-Nine Games", type: "Game Action", text: "Your left fielder has hit safely in 29 consecutive games — a Brooklyn record. He cannot sleep at night from pennant excitement. He smokes cigars at 2 AM to calm down. He gets a hit the next day. +2 hitting streak. +1 pennant fever. The line drives won't stop.", origin: "1916: Wheat set a Brooklyn record with a 29-game hitting streak during the pennant race." },
  { title: "Two Weeks as Manager", type: "Drama", text: "The owner dies. Your left fielder is named player-manager. He manages for two weeks. The new owner dies at the old owner's funeral. The old manager returns. Your left fielder is demoted back to left field. He never gets the job again. -1 managerial career. +1 grace under disappointment. The two strangest weeks in franchise history.", origin: "1925: Wheat managed Brooklyn briefly after Ebbets' death, but Robinson returned when McKeever also died." },
  { title: "Daisy at the Table", type: "Drama", text: "Your left fielder does not negotiate his own contracts. His wife Daisy — who is also his second cousin — handles all salary discussions. She holds out. She demands raises. She gets them. +1 salary. -1 team relations. The most effective agent in the dead-ball era wore a dress.", origin: "Wheat's wife Daisy became his agent, negotiating raises through regular holdouts." },
  { title: "Tell Them to Chew Tobacco", type: "Drama", text: "Your retired left fielder is asked for advice for young ballplayers. He thinks for a moment. 'Tell them to learn to chew tobacco.' +1 wisdom. +1 humor. +0 dental hygiene. The last words of a .317 hitter.", origin: "Shortly before his death, Wheat was asked for advice. His answer: 'Tell them to learn to chew tobacco.'" },
  { title: "The Scout's $1,200", type: "Drama", text: "Your owner complains: 'That's the trouble around here. We have too many .246 hitting left fielders.' The scout says nothing. The .246 hitter arrives. He hits .304 as a rookie. He plays 18 seasons. He becomes the franchise's all-time leader in everything. The $1,200 investment yields 2,884 hits. +5 scouting. The owner was wrong.", origin: "Brooklyn purchased Wheat from Mobile for $1,200 after he hit .246 in the minors. The owner complained." },
];

const art = {
  face: "GENTLE, STRONG, WEATHERED, KIND. 5'10\" 170 lbs — not big, not imposing. The face should be WARM AND OPEN — the face of a man Casey Stengel called 'one of the kindliest men God ever created.' Cherokee heritage from his mother — dark complexion, strong features, but not dramatically so. 'He is an Indian, but you would hardly guess it except from his dark complexion.' The expression: a QUIET SMILE. Not the reckless grin of Ruth or the stoic calm of Bender. The gentle, permanent, unhurried smile of a man who chews tobacco, ignores conditioning rules, hits .375, and has never been ejected from a game. The eyes: warm, patient, amused. He has seen 18 seasons of bad Brooklyn baseball and loved every minute.",
  attire: "Brooklyn Robins 1924 whites — wool flannel with 'ROBINS' or the Brooklyn 'B' insignia, flat cap. THE POSE: the line-drive swing — Wheat's left-handed swing mid-contact, the bat meeting the ball flush, the body balanced and compact. Not a home run swing. Not a launch angle. A LINE DRIVE swing — level, quick, efficient, producing ropes that find outfield grass. Or: in left field at Ebbets — the graceful, easy stride toward a fly ball, the catch made to look effortless.",
  mood: "WARM CONTENTMENT. Wheat's card should feel like a porch in Missouri — unhurried, kind, comfortable, at peace. Not the dawn energy of Ruth or the monumental weight of Plank. The quiet satisfaction of a man who hit .317 for 19 years and never needed anyone to notice.",
  style: "Sepia-toned with MISSOURI WHEAT GOLD and BROOKLYN BROWN — the warm gold of Missouri wheat fields, the brown of Ebbets Field dirt, the autumnal tones of a long career winding toward the Lake of the Ozarks. Where Ruth is dawn red (beginning) and Jackson is sunset gold (beauty), Wheat is HARVEST GOLD — the color of something that grew all summer and is now ready. The most AUTUMNAL palette in the Muggers collection.",
  reference: "The gentle face. The line-drive swing. The Ebbets Field left field. Missouri wheat fields in the background. The card should feel like the end of a long, satisfying season — warm, grateful, complete.",
};

// ═══════════════════════════════════════════════════
const C = {
  parchment: "#f2eadb", darkBrown: "#3a2a18", medBrown: "#7a6040",
  gold: "#c9a040", warmRed: "#8b4a2a", sepia: "#9a8060",
  cream: "#faf5e8", ink: "#2a1f10", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59", harvest: "#b89030",
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

const ChemTag = ({ tag }) => (
  <div style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{tag}</div>
);

const Sec = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function ZackWheatCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.harvest}20 0%, #1a1510 50%, ${C.harvest}20 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>INFINITY LEAGUE BASEBALL</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.harvest}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.harvest} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1924 SEASON — .375 BA • 2ND TO HORNSBY (.424)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {careerStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — DODGERS ALL-TIME LEADER: HITS, 2B, 3B, TB, G, AB</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>
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
              {tabs.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? C.darkBrown : "transparent", color: tab === t ? C.gold : C.medBrown, border: `1px solid ${tab === t ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (
                <Sec key={k} title={k}><p style={{ margin: 0, ...(k.includes("⚠") ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{v}</p></Sec>
              ))}
              {tab === "chemistry" && (
                <>
                  <Sec title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div>
                    <div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (
                      <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{c.tag}:</span> <span style={{ color: C.medBrown }}>{c.desc}</span></div>
                    ))}</div>
                  </Sec>
                  <Sec title="Preferred Locations">
                    {locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 50, textAlign: "center", fontFamily: "'Courier Prime', monospace",
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "LOW" ? C.warmRed : C.sepia,
                        }}>{l.affinity}</span>
                        <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                      </div>
                    ))}
                  </Sec>
                </>
              )}
              {tab === "momentum" && (
                <>
                  <Sec title="🔥 Hot Triggers">{momentum.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Sec>
                  <Sec title="❄ Cold Triggers">{momentum.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Sec>
                  <Sec title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{momentum.pressure}</p></Sec>
                </>
              )}
              {tab === "actions" && (
                <Sec title="Action Card Seeds">
                  {actions.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900 }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          background: a.type === "Drama" ? `${C.warmRed}20` : `${C.coldBlue}20`,
                          color: a.type === "Drama" ? C.warmRed : C.coldBlue,
                        }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Sec>
              )}
              {tab === "engine" && (
                <Sec title="Wheat's Stat Derivation">
                  {Object.entries(justification).map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{k}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{v}</span></div>
                  ))}
                </Sec>
              )}
              {tab === "art" && (
                <Sec title="Visual Art Direction">
                  {Object.entries(art).map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{k}:</span> <span style={{ color: C.medBrown }}>{v}</span></div>
                  ))}
                </Sec>
              )}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB • {d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1510", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: s, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
