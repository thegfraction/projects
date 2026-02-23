import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}wagner-honus.png`;

const D = {
  name: "Honus Wagner", nickname: "The Flying Dutchman", year: 1908, team: "Pittsburgh Pirates",
  era: "1900s", ilb_team: "Banners NL1900", position: "SS", bats: "R", throws: "R",
  height: '5\'11"', weight: "200 lbs",
  born: "February 24, 1874 — Chartiers (now Carnegie), PA",
  died: "December 6, 1955 — Carnegie, PA (age 81)",
  hof: "Inaugural class, 1936 (95.1% of vote). One of the first five inductees alongside Ruth, Cobb, Mathewson, Johnson.",

  rs: {
    season: 1908, games: 151, ab: 568, hits: 201, doubles: 39, triples: 19,
    hr: 10, rbi: 109, sb: 53, avg: ".354", obp: ".415", slg: ".542",
    ops: ".957", ops_plus: 205, war: 11.5,
    c_avg: ".328", c_hits: 3420, c_hr: 101, c_sb: 723, c_war: 130.8,
  },

  // OVR 13 (MYTHIC) — the only 13 in the Banners set.
  // CON 5: .354 BA, OPS+ 205, 8x batting champ, 3420 career hits
  // POW 2: 10 HR (2nd NL), .542 SLG, led SLG 6x, 643 career 2B, 252 career 3B (NL record)
  // SPD 3: 53 SB (led NL), 723 career, led SB 5x, 6 SB in 1909 WS
  // DEF 3: Greatest SS ever. Played every position except C. Tommy Leach: "best at every position"
  // CLU 2: 1909 WS champ (.333, 6 SB, beat Cobb). But .222 with 6 errors in 1903 WS.
  // Formula: CON(5)x2 + POW(2)x1.5 + SPD(3)x1 + DEF(3)x0.5 = 10+3+3+1.5 = 17.5 -> 13 (Mythic)
  s: { ovr: 13, con: 5, pow: 2, spd: 3, def: 3, clu: 2 },

  sj: {
    con: ".354 BA in 1908 — leading the ML by 20+ points while the league batted .239 (lowest of the dead-ball era). OPS+ 205 — 105% better than league average. 8x NL batting champion — still the record tied only by Tony Gwynn. Career .328 BA. 3,420 hits. 15 consecutive .300+ seasons (1899-1913). Bill James: 'the greatest season of the 20th century.' Maximum 5.",
    pow: "10 HR in 1908 — 2nd in NL, 2 short of Triple Crown. Led NL in SLG 6 times, 2B 7 times. .542 SLG in lowest-scoring dead-ball year. 643 career 2B. 252 career 3B (NL record). 308 TB in 1908 (led ML by 40). Burleigh Grimes: 'Honus hit a line drive so hard the fence went back and forth for five minutes.' Rating 2.",
    spd: "53 SB in 1908 (led NL). 723 career SB. Led NL in SB 5 times. Stole 6 bases in the 1909 WS — record until Lou Brock 1967. Called 'The Flying Dutchman' for his speed. At 5'11\" 200 lbs with bowlegs, he shouldn't have been fast — but he was devastating. Maximum 3.",
    def: "Greatest defensive SS in history. Led NL SS in putouts 1908. Played every position except catcher. Tommy Leach: 'best at every position.' John McGraw: 'The nearest thing to a perfect player no matter where his manager chose to play him.' His hands were so enormous he scooped up dirt with ground balls. Maximum 3.",
    clu: "1909 WS: .333, 6 SB (record 58 years), led Pirates to first title. Beat Cobb head-to-head (.333 to .231). But 1903 WS: .222, 6 errors. Called 'yellow' by Boston writers. Royal Rooters mocked him. Redemption in 1909. Rating 2.",
  },

  personality: {
    leadership_style: "The Humble Giant. Wagner was the most talented player in baseball for over a decade — and the most modest. He never boasted, never feuded, never demanded special treatment. When he briefly managed, he told the owner after 5 games it wasn't for him. He didn't want authority — he wanted to play. 'There ain't much to being a ballplayer, if you're a ballplayer.'",
    temperament: "Gentle, humble, shy, kind. The anti-Cobb in every way. Where Cobb was violent and paranoid, Wagner was warm and self-effacing. He had bowlegs, massive hands, a barrel chest, and an awkward gait — and was the most graceful player on the field. Beloved by teammates, opponents, umpires, and fans. Cy Young: 'Honus was the greatest player who ever lived.' There is no negative quote about Honus Wagner from anyone who knew him.",
    work_ethic: "NATURAL AND RELENTLESS. One of five sons of a Bavarian coal miner, all athletes. Played 21 seasons. Hit .300+ for 15 straight years. Regular shortstop at age 41 (all 156 games in 1915). Tried to retire before 1908 — said the sport was 'too strenuous' — then was lured back and had the greatest season of the century.",
    lifestyle: "Born in Chartiers (now Carnegie), PA — coal country outside Pittsburgh. Son of Peter Wagner, a Bavarian immigrant coal miner. Five athletic brothers. Married Bessie Baine Smith in 1916. Two daughters. After retirement: ran a sporting goods store (failed), served as state game warden, held local political posts. By the 1930s, broke. The Pirates hired him as coach in 1933 — he stayed 19 years. Tutored Arky Vaughan and Ralph Kiner. Died in Carnegie 1955 at 81. Number 33 retired.",
    era_adaptability: "THE HIGHEST IN THE SET. Bill James ranked him #2 all-time (behind Ruth). In modern baseball: a SS who hits .330 with 30+ HR potential, 40+ SB, and Gold Glove defense. The closest modern comp is peak Alex Rodriguez with better contact and better character. Sam Crawford: 'The greatest all-around player who ever lived.'",
    clubhouse_impact: "UNIVERSALLY BELOVED. No record of any teammate, opponent, or manager disliking Wagner. Humble despite being the best player alive. Kind to rookies. Patient with fans. Fair to umpires. Every obituary emphasized character as much as stats. The ultimate team chemistry card — makes everyone better, no one worse.",
    dark_side: "The 1903 World Series. Wagner hit .222 with 6 errors in baseball's first WS. Struck out to end the final game. Boston writers called him 'yellow.' The Royal Rooters sang 'Honus, Honus, why do you hit so badly?' It haunted him for six years — until the 1909 WS, when he hit .333 and stole 6 bases against Cobb. The ghost was exorcised. Wagner carries a 'First Series Ghosts' trait — he chokes the first time, then dominates the second.",
  },

  chem: [
    { tag: "The Flying Dutchman", desc: "Greatest SS ever. Can play any position without penalty, +1 DEF at every position." },
    { tag: "Eight Batting Titles", desc: "8x NL champion — still the record. +1 CON automatically every season he's the best hitter on his team." },
    { tag: "The Hands", desc: "Enormous hands scooped dirt with ground balls. Opposing runners: -1 morale from 'Grit in the Glove' trait." },
    { tag: "T206", desc: "Most valuable card in history. Refused tobacco company. +2 reputation permanently." },
    { tag: "Coal Miner's Son", desc: "Bavarian immigrant family. Immune to morale drops from hardship. +1 all stats at hometown." },
    { tag: "The Humble Giant", desc: "+2 team chemistry permanently. Never feuds, never complains. Every teammate plays better near him." },
    { tag: "First Series Ghosts", desc: "In first WS/championship: -2 CON. In second: +2 CON. The redemption arc is mandatory." },
    { tag: "Eternal Pirate", desc: "18 seasons playing, 19 coaching. +3 franchise loyalty. Will never leave willingly." },
  ],

  locs: [
    { location: "Shortstop", affinity: "HIGH", note: "Greatest SS ever. Could play any position equally well." },
    { location: "Pittsburgh / Carnegie, PA", affinity: "HIGH", note: "Born nearby. 18 seasons. 19 more coaching. Buried there." },
    { location: "Forbes Field", affinity: "HIGH", note: "110 wins in 1909. His greatest team and first WS title." },
    { location: "Coal Country", affinity: "HIGH", note: "Bavarian miner's son. Five brothers. Blue-collar roots." },
    { location: "Hall of Fame", affinity: "HIGH", note: "Inaugural class 1936. One of the first five immortals." },
    { location: "Spotlight / Media", affinity: "LOW", note: "Shy, humble. Refused the T206. Didn't want to manage." },
  ],

  mom: {
    hot: [
      "Comebacks — tried to retire before 1908, came back for the greatest season ever",
      "Revenge — the 1903 WS humiliation fueled the 1909 WS dominance",
      "Competition with Cobb — beat him .333 to .231 in the 1909 WS head-to-head",
      "Playing for Pittsburgh — Wagner was better at home, for his city, for his people",
    ],
    cold: [
      "First-time pressure — choked in the first-ever World Series (.222, 6 errors)",
      "Late career decline — hit .252 in 1914, .265 in 1917",
      "Management — tried managing for 5 games, told owner it wasn't for him",
    ],
    pressure: "REDEEMED. 1903 WS: .222, 6 errors, mocked by fans. Six years haunted. 1909 WS vs Cobb's Tigers: .333, 6 SB (record 58 years), led Pirates to the title. Outplayed Cobb in every dimension. Wagner is the ultimate redemption arc. He fails first, dominates second. Draft him for the long game.",
  },

  acts: [
    { title: "The Greatest Season", type: "Game Action", text: "Your shortstop leads the league in BA, OBP, SLG, hits, doubles, triples, RBI, SB, and total bases — simultaneously. At age 34. After trying to retire. Bill James calls it 'the greatest season of the 20th century.'", origin: "Wagner's 1908: .354/.415/.542, led ML in 8+ categories. OPS+ 205. At SS. Age 34. James: 'Even Babe Ruth never had as much impact on the game.'" },
    { title: "The Dutchman vs. The Peach", type: "Game Action", text: "The two greatest players meet in the World Series. Your shortstop hits .333 and steals 6 bases. The rival hits .231. Your team wins in 7. The debate over who is the greatest player alive is settled.", origin: "1909 WS: Wagner (.333, 6 SB) vs. Cobb (.231). Pirates won in 7." },
    { title: "The First World Series", type: "Drama", text: "Your greatest player hits .222 with 6 errors in baseball's first World Series. Fans mock him with a song. Writers call him 'yellow.' He strikes out to end the final game.", origin: "1903 WS: Wagner .222, 6 errors. Royal Rooters sang 'Honus, why do you hit so badly?' Struck out to end Game 8." },
    { title: "The Retirement That Wasn't", type: "Action", text: "Your star announces retirement. 'Too strenuous.' The owner offers the highest salary in franchise history. Your star returns — and has the greatest season in history.", origin: "Before 1908, Wagner announced retirement. Dreyfuss offered $10,000. Wagner returned for the greatest season of the century." },
    { title: "T206", type: "Drama", text: "A tobacco company wants your player's image on a card. He refuses. Only ~57 cards are printed. A century later, one sells for millions. The most valuable sports collectible in history.", origin: "T206 Honus Wagner (~57 copies). Wagner refused authorization. Cards have sold for up to $7.25 million." },
    { title: "Dirt and All", type: "Game Action", text: "Your shortstop scoops up a ground ball with a handful of dirt. He throws the entire clump — ball, dirt, and all — to first. The runner is out. The first baseman shakes grit from his glove.", origin: "Wagner's hands were so large he routinely scooped dirt with ground balls and threw everything to first." },
    { title: "Best at Every Position", type: "Action", text: "Your manager moves your star to a new position. He's immediately the best player at that position in the entire league. This works at every position on the field.", origin: "Tommy Leach: 'Honus was the best third baseman, first baseman, second baseman, shortstop, and outfielder in the league.'" },
    { title: "The Coach Returns", type: "Drama", text: "Your retired legend is broke. His store failed. Your franchise hires him as a coach — he stays 19 years, becomes the most beloved figure in the organization, tutors future Hall of Famers.", origin: "Wagner was broke by the 1930s. Pirates hired him as coach 1933. He stayed until 1952, tutoring Vaughan and Kiner." },
  ],

  art: {
    face: "Powerful, awkward, kind. 5'11\" 200 lbs — bowlegged, barrel-chested, enormously long arms, massive hands. Not handsome. The face of a coal miner's son who is the greatest player alive. Gentle eyes. Slight, modest smile. The face says: I know what I can do. I don't need you to know.",
    attire: "Pittsburgh Pirates 1908 home whites — the P on the chest. Classic batting stance: hands spread apart on the bat (his unique grip), crouched, coiled. Or: fielding at SS, enormous hands scooping a ground ball with a cloud of dirt. The uniform looks lived-in.",
    mood: "Quiet supremacy. Not fierce (Cobb), not angry (Burkett), not chaotic (Waddell) — calm, total mastery. Wagner's card should feel like standing in front of a mountain: immovable, eternal, beyond argument. The most powerful card radiates peace, not intensity.",
    style: "The richest, deepest sepia in the collection — warm mahogany and burnished gold. This IS the card. The crown jewel. The T206. The most ornate border — Bavarian/Germanic motifs, Pittsburgh steel imagery, coal country textures. Pristine museum-quality paper. This card has been protected, cherished, valued above all others. Because it is.",
    reference: "This IS the T206. The most valuable baseball card ever made, brought to life. Sepia at its absolute finest. The card that the entire Banners collection exists to contextualize. Wagner is the center of gravity. The card that proves baseball is the greatest game ever played.",
  },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339",
  gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c",
  cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536",
  coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

export default function HonusWagnerCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const s = D.s;
  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

  const badges = [
    "\u2b50 HOF 1936 (Inaugural)", "\ud83d\udc51 8\u00d7 NL Batting Champion",
    "\ud83c\udfc6 1909 WS Champion", "\u26be 3,420 Hits", "\ud83c\udfc3 723 Stolen Bases",
    "\ud83e\udde4 Greatest SS Ever", "\ud83c\udccf T206 Card", "\u26d3 Coal Miner\u2019s Son",
    "\ud83c\udfaf OVR 13 \u2014 MYTHIC",
  ];

  const seasonStats = [
    { label: "AVG", val: D.rs.avg }, { label: "HITS", val: D.rs.hits },
    { label: "2B", val: D.rs.doubles }, { label: "3B", val: D.rs.triples },
    { label: "RBI", val: D.rs.rbi }, { label: "SB", val: D.rs.sb },
    { label: "OPS+", val: D.rs.ops_plus }, { label: "WAR", val: D.rs.war },
  ];

  const careerStats = [
    { label: "CAR AVG", val: D.rs.c_avg }, { label: "CAR HITS", val: D.rs.c_hits },
    { label: "CAR SB", val: D.rs.c_sb }, { label: "CAR WAR", val: D.rs.c_war },
    { label: "BAT TITLES", val: "8" }, { label: "CAR 2B", val: "643" },
    { label: "CAR 3B", val: "252" }, { label: "SEASONS", val: "21" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card \u2014 Banners Era</div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "\u25bc Flip Card \u2014 View Dossier \u25bc" : "\u25b2 Flip Card \u2014 View Front \u25b2"}
        </button>

        {side === "front" ? (
          <div style={{ padding: 20 }}>
            {/* PORTRAIT */}
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={D.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${C.gold}, #e8c84c)`, color: C.darkBrown, padding: "4px 12px", borderRadius: 3, fontSize: 12, fontWeight: 900, fontFamily: "'Courier Prime', monospace", border: `1px solid ${C.darkBrown}40`, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>OVR {s.ovr} \u2605</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{D.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.darkBrown}cc`, color: C.gold, padding: "2px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>MYTHIC</div>
            </div>

            {/* NAME */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{D.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{D.nickname}" \u2014 {D.team} \u2014 {D.year}</div>
              <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", marginTop: 2, letterSpacing: 3 }}>INAUGURAL HALL OF FAME CLASS \u2014 1936</div>
            </div>

            {/* STAT BARS */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* SEASON STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {seasonStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1908 \u2014 "THE GREATEST SEASON OF THE 20TH CENTURY"</div>

            {/* CAREER STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {careerStats.map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER \u2014 21 SEASONS (1897-1917)</div>

            {/* BADGES */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {badges.map((b, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{b}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══ BACK SIDE ═══ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{D.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER \u2014 {D.year}</div>
            </div>

            {/* TABS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  {Object.entries(D.personality).map(([key, val]) => (
                    <Sec key={key} title={key === "dark_side" ? "\u26a0 Hidden Complexity" : key.replace(/_/g, " ")}>
                      <p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p>
                    </Sec>
                  ))}
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Sec title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {D.chem.map((t, i) => <ChemTag key={i} tag={t.tag} />)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {D.chem.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Sec>
                  <Sec title="Preferred Locations">
                    {D.locs.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.sepia}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : C.sepia,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> \u2014 {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Sec>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Sec title="\ud83d\udd25 Hot Triggers">
                    {D.mom.hot.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>{"\u25b8"} {t}</div>)}
                  </Sec>
                  <Sec title="\u2744 Cold Triggers">
                    {D.mom.cold.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>{"\u25b8"} {t}</div>)}
                  </Sec>
                  <Sec title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{D.mom.pressure}</p>
                  </Sec>
                </>
              )}

              {tab === "actions" && (
                <Sec title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                    These events, derived from Wagner's real life, become universal cards playable in any game.
                  </p>
                  {D.acts.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{
                          fontSize: 9, padding: "1px 6px", borderRadius: 2, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                          color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                        }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Sec>
              )}

              {tab === "engine" && (
                <>
                  <Sec title="Stat Conversion Engine">
                    {[
                      { t: "CONTACT", d: ".200-.249\u21921 | .250-.269\u21922 | .270-.299\u21923 | .300-.329\u21924 | .330+\u21925", b: "OPS+ \u2265130 \u2192 +1 (cap 5)" },
                      { t: "POWER", d: "0-9\u21920 | 10-19\u21921 | 20-29\u21922 | 30-39\u21923 | 40-49\u21924 | 50+\u21925", b: "SLG \u2265.500 \u2192 +1 (cap 5)" },
                      { t: "SPEED", d: "0-5\u21920 | 6-15\u21921 | 16-30\u21922 | 31-50\u21923", b: null },
                    ].map((r, i) => (
                      <div key={i} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{r.t}</div>
                        <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{r.d}</div>
                        {r.b && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {r.b}</div>}
                      </div>
                    ))}
                  </Sec>
                  <Sec title="Wagner's Derivation">
                    {Object.entries(D.sj).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Sec>
                </>
              )}

              {tab === "art" && (
                <Sec title="Visual Art Direction">
                  {Object.entries(D.art).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Sec>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{D.ilb_team}</span>
          <span>{D.era} \u2022 {D.position} \u2022 OVR {s.ovr} \u2605 MYTHIC</span>
        </div>
      </div>

      {/* JSON EXPORT */}
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({
  name: D.name, nickname: D.nickname, year: D.year, position: D.position, era: D.era,
  ilb_team: D.ilb_team, stats: D.s, chemistry_traits: D.chem.map(t => t.tag),
  hot_triggers: D.mom.hot, cold_triggers: D.mom.cold, action_seeds: D.acts.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
