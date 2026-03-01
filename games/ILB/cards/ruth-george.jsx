import { useState } from "react";

const PLAYER_IMG = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/ruth-george.png";

const d = {
  name: "George Ruth", nickname: "The Big Fellow", year: 1916, team: "Boston Red Sox",
  era: "1910s", ilb_team: "Muggers 1910", position: "SP", bats: "L", throws: "L",
  height: '6\'2"', weight: "215 lbs",
  born: "February 6, 1895 — Baltimore, MD",
  died: "August 16, 1948 — New York, NY (age 53)",
  hof: "Inducted 1936 (inaugural class). PITCHER ONLY CARD. 94-46, 2.28 ERA, 0.87 WS ERA, 29⅔ consecutive scoreless WS innings.",
};

const s = { ovr: 10, stf: 4, ctl: 1, sta: 4, def: 1, clu: 3 };

const realStats = [
  { label: "W-L", val: "23-12" }, { label: "ERA", val: "1.75" },
  { label: "K", val: "170" }, { label: "BB", val: "118" },
  { label: "IP", val: "323.2" }, { label: "CG", val: "23" },
  { label: "SHO", val: "9" }, { label: "WAR", val: "~6.0" },
];

const careerStats = [
  { label: "CAR W", val: "94" }, { label: "CAR L", val: "46" },
  { label: "CAR ERA", val: "2.28" }, { label: "WIN%", val: ".671" },
  { label: "WS W-L", val: "3-0" }, { label: "WS ERA", val: "0.87" },
  { label: "WS SCR", val: "29⅔" }, { label: "WS TITLES", val: "3" },
];

const badges = [
  "🏆 3× WS Champ (pitcher)", "⭐ HOF 1936", "🔥 1.75 ERA (led AL, 1916)",
  "🦋 PITCHER ONLY CARD", "⚾ 9 SHO (LHP record)", "📊 0.87 WS ERA",
  "💪 Beat Johnson 4×", "🎯 29⅔ Scoreless WS Inn",
];

const justification = {
  stf: "1.75 ERA in 1916 → tier 4 (1.50-1.99). Led the AL at age 21. K/9 ~4.7 — below ≥6.0 bonus. Not a strikeout pitcher. Heavy sinker inducing weak contact. 9 shutouts in 1916 — LHP record until Guidry 1978. Beat Walter Johnson 4 of 5 meetings. Rating of 4.",
  ctl: "BB/9 in 1917 (best year): 2.98 → tier 1 (2.5-2.99). In 1916: 3.28 BB/9 → tier 0. WHIP ~1.07 — misses ≤1.00 bonus. Ruth walked 100+ per season in both peak years. Johnson: 0.99 BB/9. Plank: ~1.7-2.0. Ruth was in a different, wilder class. The clear weakness that separates pitcher-Ruth from Mythic status. Rating of 1.",
  sta: "326.1 IP in 1917 → tier 4 (300-349). 323.2 IP in 1916. 35 CG in 1917 (led AL). 6'2\" 215 lbs at ages 21-22 — massive, tireless arm. 107 career CG. Rating of 4.",
  def: "No notable mound defense. Big powerful athlete but not a graceful fielder. Standard. Rating of 1.",
  clu: "MAXIMUM. 3-0, 0.87 ERA in the World Series. 29⅔ CONSECUTIVE SCORELESS WS INNINGS — record 42 years (broken by Ford 1961). Ruth said he was prouder of this than any batting record. 14-inning CG win in 1916 WS (still longest postseason CG). 1-0 shutout in 1918 WS G1. 3× WS champion as pitcher. Rating of 3.",
};

const personality = {
  "Leadership Style": "THE FORCE OF NATURE. Ruth didn't lead — he EXISTED, and the game warped around him. Even at 21, he was the center of every room. He argued with umpires, clashed with managers, stayed out all night. Then threw 9 shutout innings. The leadership was overwhelming talent deployed with reckless confidence.",
  "Temperament": "VOLCANIC AND JOYFUL. Ruth lived at maximum volume. He punched umpire Brick Owens in 1917 (Ernie Shore then retired all 27 batters). He caroused. He ate enormously. And then he took the mound and threw the best game you'd ever seen. The appetite — for everything — was insatiable.",
  "Work Ethic": "NATURAL AND UNDISCIPLINED. Ruth didn't work at pitching the way Plank studied or Bender innovated. He just COULD. The 1.75 ERA and 9 shutouts came from natural ability, not craft. He hated sitting between starts. Ruth's genius was instinctive, not cultivated.",
  "Lifestyle": "ST. MARY'S TO EVERYWHERE. Born in Baltimore. Sent to St. Mary's Industrial School at age 7 — orphanage/reform school. Brother Matthias taught him baseball. Signed at 19, in the majors within months. Already legendary by 1916: all-night parties, enormous meals, alcohol, women. But on this card, Ruth is still a pitcher — 21, in Boston, before the Yankees, before everything.",
  "Clubhouse Impact": "THE GRAVITATIONAL CENTER. +3 morale (everyone entertained). -1 discipline (everyone distracted). +2 confidence (if Ruth is pitching, we're winning). He fought with Barrow constantly, broke team rules, won 23 games. The talent justified everything.",
  "⚠ Hidden Complexity": "The wildness — literal and figurative. 118 walks is chaos made statistical. Ruth's control problems mirror his life: enormous talent, inconsistent discipline. He punched umpires, clashed with managers. On this card, Ruth is 21 — the chaos is just beginning. Everything after 1919 (the trade, the Yankees, 714) exists in the future. This card captures the BEFORE: the young, wild, joyful lefty who was already the best pitcher in the league and hadn't yet discovered he was the best hitter in history.",
};

const chemistry = [
  { tag: "The Arm Before the Bat", desc: "This is Ruth as a pitcher — 94-46, 2.28 ERA. The batting version is another card, another era. On this card, Ruth's CON is locked." },
  { tag: "Twenty-Nine and Two-Thirds", desc: "29⅔ consecutive scoreless WS innings — record 42 years. +3 CLU in any World Series start. Sacred to him." },
  { tag: "The Heavy Sinker", desc: "Ruth's fastball sank and moved. -1 POW to all batters (ground balls). 9 shutouts from movement, not speed." },
  { tag: "Wild and Young", desc: "118 BB in 1916. CTL 1. Walks too many. But wildness is intimidation — batters don't dig in against a 215-lb lefty who's sometimes wild." },
  { tag: "Beat Johnson Four Times", desc: "Beat Walter Johnson 4 of 5 meetings in 1916 — two 1-0 wins. When Ruth faces Johnson: both gain +1 STF." },
  { tag: "Hooper's Suggestion", desc: "Harry Hooper (on this roster!) convinced Barrow to convert Ruth. 20% chance per season Ruth converts — unlocking the greatest hitter. But losing the pitcher." },
  { tag: "St. Mary's Boy", desc: "Raised in an orphanage. Brother Matthias taught him baseball. +1 resilience. -1 authority respect." },
  { tag: "The Chrysalis", desc: "This card is the BEFORE. Everything after — Yankees, 714, Called Shot — is locked inside this arm. The butterfly hasn't emerged." },
];

const locations = [
  { location: "Pitcher's Mound", affinity: "HIGH", note: "94-46, 2.28 ERA. Best LHP in the AL, 1915-17." },
  { location: "Fenway Park", affinity: "HIGH", note: "1914-19. Three WS titles. 67 wins by age 22." },
  { location: "The World Series", affinity: "HIGH", note: "3-0, 0.87 ERA. 29⅔ scoreless. His proudest record." },
  { location: "Baltimore / St. Mary's", affinity: "COMPLEX", note: "Born. Abandoned. Raised by Brothers." },
  { location: "The Batter's Box", affinity: "LOCKED", note: "NOT ON THIS CARD. The bat exists. This card freezes him on the mound." },
];

const momentum = {
  hot: [
    "Pitching duels — elevated against the best; beat Johnson 4 of 5",
    "World Series mound — 0.87 ERA; October activated his best self",
    "Early innings — dominant first 6; arm freshest, sinker heaviest",
    "Joyful chaos — when happy, full of life, he pitched his best",
  ],
  cold: [
    "Walks — when wildness takes over, free passes in bunches; CTL 1 is real",
    "Authority clashes — fights with Barrow, punching umpires; anger scatters focus",
    "Boredom — hated sitting between starts; motivation declines if idle",
    "The bat calling — every at-bat reminded him what he was missing; conversion pressure builds",
  ],
  pressure: "EXTRAORDINARY. 3-0, 0.87 WS ERA, 29⅔ consecutive scoreless WS innings (42-year record). 14-inning CG in 1916 WS (still longest postseason CG). Ruth on the mound in October: CLU 3, STF 4 — almost unhittable. The wildness (CTL 1) is the only thing keeping him from Johnson-level dominance.",
};

const actions = [
  { title: "Twenty-Nine and Two-Thirds", type: "Game Action", text: "Your pitcher has not allowed a run in the World Series since the first inning last October. 29⅔ innings ago. Mathewson's record of 28 falls. The streak stands 42 years. He's prouder of this than 714 home runs. +5 CLU. +3 all-time record.", origin: "Ruth's 29⅔ consecutive scoreless WS innings (1916-18), broken by Ford 1961." },
  { title: "Fourteen Innings in October", type: "Game Action", text: "WS Game 2. One run in the first. Then nothing. Fourteen innings. 2-1 win. Still the longest complete game in WS history. +4 STA. +3 CLU.", origin: "1916 WS G2: Ruth pitched all 14 innings, 2-1 win over Brooklyn." },
  { title: "Beat Johnson, 1-0", type: "Game Action", text: "Your lefty vs. the hardest thrower alive. Scoreless for 12. Wins 1-0 in the 13th. Beats Johnson four times in five meetings. +3 STF. +2 rivalry.", origin: "1916: Ruth beat Johnson 4 of 5, including two 1-0 victories." },
  { title: "Nine Shutouts", type: "Game Action", text: "Ninth shutout of the season. No lefty has ever thrown more. Record stands 62 years. +3 STF. +2 LHP supremacy.", origin: "9 shutouts in 1916 — LHP record tied by Guidry 1978." },
  { title: "The Punch", type: "Drama", text: "Your pitcher walks the leadoff batter. Argues. PUNCHES the umpire. Ejected. The reliever retires all 27. Your pitcher gets credit for nothing. -2 discipline. +3 legend.", origin: "June 23, 1917: Ruth punched umpire Owens. Shore retired all 27." },
  { title: "The Conversion", type: "Drama", text: "Your team captain tells the manager: 'Move Ruth to the outfield.' The pitcher becomes the greatest hitter in history. The pitcher — 94-46, 2.28 ERA — ceases to exist. +∞ future. -1 pitching legend. The chrysalis opens.", origin: "Hooper convinced Barrow to convert Ruth, 1918-19." },
  { title: ".325 While Pitching", type: "Game Action", text: "Your pitcher bats .325 — highest on the team. He is a PITCHER. +2 CON. +1 foreshadowing. The bat is screaming.", origin: "1917: Ruth hit .325 while pitching 326.1 IP — highest on Red Sox." },
  { title: "St. Mary's Boy", type: "Drama", text: "Your pitcher was sent to St. Mary's at age 7. Brother Matthias taught him. At 19, the majors. At 21, led the AL in ERA. Everything the orphanage couldn't have predicted. +2 origin story.", origin: "Ruth at St. Mary's from age 7. In the AL at 19, leading ERA at 21." },
];

const art = {
  face: "YOUNG, POWERFUL, JOYFUL, WILD. 6'2\" 215 lbs — not yet the round-bellied Sultan. BIG, YOUNG — thick-chested, strong-jawed, broad face, flat nose. YOUNGER. Leaner. Hungrier. The 21-year-old. ENORMOUS RECKLESS GRIN. NOT the later caricature. The YOUNG MAN.",
  attire: "Boston Red Sox 1916 whites — 'RED SOX' across the chest, flat cap. Left-handed windup — big body coiled, left arm cocked, heavy sinker about to unleash. RAW LEFT-HANDED POWER from 215 pounds.",
  mood: "YOUNG AND LIMITLESS. Dawn — everything ahead. JOYFUL ANTICIPATION — doesn't know he'll become the most famous athlete in history. He just knows he can throw.",
  style: "Sepia with FENWAY DAWN RED and BOSTON MORNING GOLD. The red of sunrise, of beginning. Not Yankees navy. The WARM, YOUNG RED of a Boston morning in 1916, before the world changed.",
  reference: "Young face — Ruth at 21, not 35. Left-handed delivery. Red Sox uniform, not pinstripes. The chrysalis. Potential energy — enormous force not yet fully expressed.",
};

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

const C = {
  parchment: "#f2e8d0", darkBrown: "#3a1a1a", medBrown: "#6b4030",
  gold: "#d4a84c", warmRed: "#8b2a1a", sepia: "#96705a",
  cream: "#faf3e3", ink: "#2a1510", hotRed: "#c43020",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59", dawnRed: "#a0382a",
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

export default function GeorgeRuthCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const tabs = ["personality", "chemistry", "momentum", "actions", "engine", "art"];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.dawnRed}30 0%, #1a1510 50%, ${C.dawnRed}30 100%)`, padding: "24px 12px", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            {/* Portrait */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.dawnRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <span style={{ background: `${C.gold}ee`, color: C.darkBrown, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>🦋 PITCHER ONLY</span>
              </div>
            </div>

            {/* Name */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
              <div style={{ fontSize: 9, color: C.dawnRed, fontFamily: "'Courier Prime', monospace", marginTop: 2, fontStyle: "italic" }}>The Arm Before the Bat — Pitcher Card Only</div>
            </div>

            {/* Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.dawnRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>

            {/* Season stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {realStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1916 SEASON — LED AL IN ERA • 9 SHUTOUTS (LHP RECORD)</div>

            {/* Career stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {careerStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace" }}>{st.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PITCHING CAREER ONLY • NEVER HAD A LOSING SEASON</div>

            {/* Badges */}
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
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — PITCHER ONLY — {d.year}</div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t ? 900 : 500, background: tab === t ? C.darkBrown : "transparent", color: tab === t ? C.gold : C.medBrown, border: `1px solid ${tab === t ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && Object.entries(personality).map(([k, v]) => (
                <Sec key={k} title={k}>
                  <p style={{ margin: 0, ...(k.includes("⚠") ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{v}</p>
                </Sec>
              ))}

              {tab === "chemistry" && (
                <>
                  <Sec title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{chemistry.map((c, i) => <ChemTag key={i} tag={c.tag} />)}</div>
                    <div style={{ marginTop: 12 }}>{chemistry.map((c, i) => (
                      <div key={i} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, color: C.traitGreen }}>{c.tag}:</span>{" "}
                        <span style={{ color: C.medBrown }}>{c.desc}</span>
                      </div>
                    ))}</div>
                  </Sec>
                  <Sec title="Preferred Locations">
                    {locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, minWidth: 50, textAlign: "center", fontFamily: "'Courier Prime', monospace",
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "COMPLEX" ? `${C.warmRed}20` : l.affinity === "LOCKED" ? `${C.coldBlue}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "COMPLEX" ? C.warmRed : l.affinity === "LOCKED" ? C.coldBlue : C.sepia,
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
                  <p style={{ margin: "0 0 12px", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from Ruth's pitching career become universal cards.</p>
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
                <Sec title="Ruth's Stat Derivation (Pitcher Only)">
                  {Object.entries(justification).map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{k}:</span>{" "}
                      <span style={{ color: C.medBrown, fontSize: 11 }}>{v}</span>
                    </div>
                  ))}
                </Sec>
              )}

              {tab === "art" && (
                <Sec title="Visual Art Direction">
                  {Object.entries(art).map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{k}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{v}</span>
                    </div>
                  ))}
                </Sec>
              )}
            </div>
          </div>
        )}

        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace" }}>
          <span>ILB • {d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr} • 🦋 PITCHER ONLY</span>
        </div>
      </div>

      {/* JSON */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a1510", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, card_type: "PITCHER ONLY", era: d.era, ilb_team: d.ilb_team, stats: s, chemistry_traits: chemistry.map(c => c.tag), action_seeds: actions.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
