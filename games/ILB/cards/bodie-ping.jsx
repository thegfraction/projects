import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}bodie-ping.png`;

const PLAYER_DATA = {
  name: "Ping Bodie",
  nickname: "The Wonderful Wop",
  year: 1917,
  team: "Philadelphia Athletics",
  era: "1910s",
  ilb_team: "Banners AL1910",
  position: "CF",
  bats: "R",
  throws: "R",
  height: '5\'8"',
  weight: "195 lbs",
  born: "October 8, 1887 — San Francisco, CA (as Francesco Stephano Pezzolo)",
  died: "December 17, 1961 — San Francisco, CA (age 74)",
  hof: "Not inducted. Italian American Sports Hall of Fame. Pioneer for Italian Americans in baseball.",
  real_stats: {
    season: 1917, games: 148, at_bats: 538, hits: 157, doubles: 28, triples: 11,
    home_runs: 7, rbi: 74, stolen_bases: 10, batting_avg: ".291", obp: ".343",
    slg: ".418", ops: ".761", ops_plus: 130, war: 3.0, gold_gloves: 0,
    silver_sluggers: 0, all_star: 0, career_avg: ".275", career_hits: 1011,
    career_hr: 43, career_sb: 49, career_war: 8.8,
  },
  ilb_stats: {
    ovr: 6,
    con: 3,
    pow: 2,
    spd: 1,
    def: 1,
    clu: 0,
  },
  stat_justification: {
    con: ".291 BA in 1917, his best full ML season. Career .275 over 1,050 games. OPS+ of 130 in peak year. Bodie was a solid line-drive hitter who used a 52-ounce bat — the heaviest in baseball. He could hit for average, but he was more about impact than consistency. Rating of 3.",
    pow: "7 HR in 1917 — 3rd in the AL in the dead-ball era. Hit 30 HR for the SF Seals in 1910 (PCL record at the time). 46 extra-base hits in 1917 (5th in AL). .418 SLG (6th in AL). Career 43 HR. Bodie was one of the most feared sluggers of the 1910s. Rating of 2 reflects meaningful dead-ball power.",
    spd: "10 SB in 1917, 49 career. At 5'8\" 195 lbs, Bodie was stocky and slow. Bugs Baer's immortal line: 'His head was full of larceny but his feet were honest.' Rating of 1 — he could barely run.",
    def: "Led AL outfielders in assists with 32 in 1917 — a strong throwing arm. But his range was limited by his stocky build. He played all outfield positions and even first base. Versatile but not graceful. Rating of 1.",
    clu: "Never reached the World Series as a regular player. Was on the 1921 Yankees roster but was traded to the Red Sox in August. Asked for a half share of the WS money — was denied. Zero meaningful postseason contributions. Rating of 0.",
  },
  personality: {
    leadership_style: "The Entertainer. Bodie didn't lead through authority or quiet example — he led through sheer force of personality. He was always the center of attention, always talking, always making people laugh. His leadership was morale: he kept the clubhouse loose and the fans engaged, even on terrible teams.",
    temperament: "Supremely self-confident and hilarious. Bodie bragged constantly but was universally beloved because the bragging was charming, not arrogant. His one-liners are legendary: 'I and the Liberty Bell are the only attractions in Philadelphia.' 'I room with his suitcase.' 'I rammycackled the old persimmon.' He had what writers called 'a twinkle in his eyes and an outgoing personality full of showmanship.'",
    work_ethic: "Inconsistent. Bodie clashed with managers (Jimmy Callahan sent him back to the minors in 1914) and his weight fluctuated. He was capable of greatness — 30 HR in the PCL, 97 RBI as a rookie — but couldn't always sustain it. His work ethic was directed at living life fully, not necessarily at peak conditioning.",
    lifestyle: "Born Francesco Stephano Pezzolo in San Francisco's Cow Hollow neighborhood to Italian immigrants. Changed his name to Bodie (after a California ghost town) to avoid discrimination. Developed his strength rolling rocks on Telegraph Hill as a kid. After baseball, worked as a Hollywood electrician and bit actor at Universal Studios for 32 years. Inspired future Italian American stars: Lazzeri, Crosetti, the DiMaggios.",
    era_adaptability: "MODERATE. Bodie's power would translate — he was a genuine slugger in any era. His personality would make him a media sensation today. But his speed, defense, and conditioning would limit him. He'd be a beloved DH or platoon bat with massive social media following.",
    clubhouse_impact: "MORALE-MAXIMIZER. Bodie was the ultimate clubhouse character. Pranks (putting ducks in teammates' rooms), eating contests (beat an ostrich at spaghetti), legendary one-liners. He kept terrible teams from falling apart. The 1917 Athletics were one of the worst teams ever — and Bodie said he was their only attraction. He was right.",
    dark_side: "The name change. Francesco Pezzolo became Ping Bodie because Italian Americans faced relentless discrimination. He was called 'The Wonderful Wop' by sportswriters — a nickname that reflects the casual bigotry of the era. The spaghetti-eating contest against an ostrich was staged partly as ethnic caricature. Bodie navigated this with humor and dignity, but the undercurrent was ugly. In ILB terms: Bodie carries a 'Pioneer' trait — he opened doors for the DiMaggios and Lazzeri, but he bore the cost of being first.",
  },
  chemistry_traits: [
    { tag: "Ping!", desc: "Named for the sound of his 52-oz bat hitting the dead ball. +1 POW on contact. Opposing pitchers hear the PING and lose -1 confidence." },
    { tag: "Ruth's Roommate", desc: "Roomed with Babe Ruth. +2 chemistry with Ruth. 'I don't room with Ruth — I room with his suitcase.'" },
    { tag: "Italian Pioneer", desc: "First Italian American to make a major impact in MLB. +1 chemistry with all future Italian American players (DiMaggio, Lazzeri, Crosetti, Rizzuto)." },
    { tag: "The Entertainer", desc: "+2 team morale permanently. Bodie's personality prevents morale from ever dropping below baseline." },
    { tag: "Ostrich Slayer", desc: "Beat Percy the ostrich in a spaghetti-eating contest (12 plates to 11). +1 stamina (he's always fueled). No fatigue from doubleheaders." },
    { tag: "Only Attraction", desc: "'I and the Liberty Bell are the only attractions in Philadelphia.' On bad teams, Bodie gains +1 fan loyalty while all other players lose it." },
    { tag: "Name Changer", desc: "Changed from Pezzolo to Bodie to avoid discrimination. Bodie is immune to ethnic chemistry penalties and provides this immunity to teammates." },
    { tag: "Hollywood Ending", desc: "After baseball, became a Hollywood electrician and bit actor. +1 reputation in entertainment-heavy cities." },
  ],
  preferred_locations: [
    { location: "Restaurant / Italian Kitchen", affinity: "HIGH", note: "Beat an ostrich at spaghetti. Food was central to his identity." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Always the center of attention. Pranks, jokes, one-liners." },
    { location: "Hollywood / Movie Set", affinity: "HIGH", note: "Worked as electrician and bit actor at Universal Studios for 32 years." },
    { location: "San Francisco", affinity: "HIGH", note: "Born in Cow Hollow. Rolled rocks on Telegraph Hill as a kid. Died there at 74." },
    { location: "Press Box / Media", affinity: "HIGH", note: "Gave great quotes. Inspired Ring Lardner's You Know Me Al." },
    { location: "Spring Training", affinity: "HIGH", note: "The ostrich contest happened in Jacksonville. Pranks were spring training specialties." },
    { location: "Library / Quiet Places", affinity: "LOW", note: "Bodie was never quiet. 'Did you see the way I smacked the old onion around?'" },
  ],
  momentum: {
    hot_triggers: [
      "Bad teams that need a hero — Bodie thrived as the lone bright spot on awful clubs",
      "Big crowds — the showman played up to the audience",
      "Early-season confidence — his rookie year (.289, 97 RBI) and best seasons started strong",
      "Italian pride moments — performing well in front of Italian American fans in New York",
    ],
    cold_triggers: [
      "Clashes with managers — Callahan sent him to the minors in 1914",
      "Weight fluctuations — Bodie's conditioning was inconsistent",
      "Late-career decline — slumped below .200 in 1921 and was traded/released",
    ],
    pressure_response: "UNTESTED-PROBABLE LOW. Bodie never reached the World Series as a regular player. He was denied a WS share in 1921. His personality suggests he'd either be spectacularly clutch (the showman rises) or spectacularly bad (the pressure overwhelms the clown). In ILB: Bodie is a wild card in October — flip a coin.",
  },
  action_card_seeds: [
    { title: "The Ostrich Contest", type: "Drama", text: "Your slugger is challenged to an eating contest against an ostrich during spring training. He eats 12 plates of spaghetti. The ostrich collapses at 11. Your player gains +2 fan loyalty and the 'Iron Stomach' trait. National media coverage ensues.", origin: "In 1919 spring training in Jacksonville, Bodie defeated Percy the ostrich in a spaghetti-eating contest, 12 plates to 11, before Percy collapsed." },
    { title: "Rooming with the Suitcase", type: "Action", text: "Your player is assigned to room with the most famous athlete in the world. The superstar is never there. When asked about it, your player delivers an immortal one-liner. +3 reputation. The quote lives forever.", origin: "'I don't room with Ruth — I room with his suitcase.' The most famous roommate quote in sports history." },
    { title: "The 52-Ounce Bat", type: "Game Action", text: "Your slugger swings the heaviest bat in baseball — 52 ounces. Every hit makes a distinctive PING. On contact, 25% chance of extra-base hit. On a miss, -1 SPD next at-bat (bat weight slows recovery).", origin: "Bodie's nickname came from the distinctive 'ping' sound his 52-ounce bat made on contact — the heaviest bat in baseball." },
    { title: "Only Attraction in Town", type: "Action", text: "Your team is historically bad. Your best player declares himself the city's only attraction. He gains +2 fan loyalty while all other players lose -1. Attendance actually increases because people come to see him.", origin: "Playing for one of the worst A's teams ever in 1917, Bodie declared: 'I and the Liberty Bell are the only attractions in Philadelphia.'" },
    { title: "You Know Me Al", type: "Drama", text: "A famous writer uses your player as inspiration for a fictional character. The fictional character becomes more famous than the real player. +3 cultural reputation. But -1 personal reputation (people remember the fiction, not the man).", origin: "Bodie is widely credited as a primary inspiration for Ring Lardner's Jack Keefe in the beloved Saturday Evening Post series 'You Know Me Al.'" },
    { title: "The Name Change", type: "Drama", text: "Your player changes his name to avoid ethnic discrimination. He loses his family identity but gains acceptance. He opens the door for future players of his background. +1 pioneer reputation. Future players of his heritage gain +1 chemistry with him.", origin: "Francesco Stephano Pezzolo became Ping Bodie, taking the name of a California ghost town, to escape the discrimination Italian Americans faced in early 1900s America." },
    { title: "Put Me in the Lineup", type: "Action", text: "Your rookie demands to play. He goes directly to the owner and says 'You want hitting? Put me in.' The owner overrides the manager. The rookie produces — .289 with 97 RBI in his first year.", origin: "When Bodie was benched by the White Sox, he went directly to owner Charles Comiskey and demanded to play. Comiskey told manager Hugh Duffy to put him in. Bodie hit .289 with 97 RBI." },
    { title: "Larceny and Honest Feet", type: "Game Action", text: "Your slugger attempts to steal a base. He is thrown out spectacularly. A sportswriter pens an immortal line about the attempt. -1 SB but +2 entertainment value.", origin: "Bugs Baer, writing for Hearst: 'He was thrown out trying to steal second. His head was full of larceny but his feet were honest.'" },
  ],
  art_direction: {
    face: "Round, expressive Italian face with a broad smile and mischievous dark eyes. Stocky — 5'8\" 195 lbs, built like a fireplug. Thick neck, strong jaw, dark hair. The face of a man who just beat an ostrich at spaghetti and wants you to know about it. Warmth and humor radiate from every feature.",
    attire: "Philadelphia Athletics 1917 whites with the elephant emblem. The uniform strains over his stocky frame. The massive 52-oz bat visible — it should look comically large. Mid-swing with full force, or posing with the bat over his shoulder and that trademark grin. The bat is the star of the show.",
    mood: "Pure joy. Not intensity, not determination — delight. Bodie played baseball because it was fun, and that should come through in every pixel. The most lighthearted card in the ILB set. Where Cobb is terrifying and Young is serene, Bodie is laughing.",
    style: "Warm, golden sepia — the warmest card in the set, reflecting Bodie's San Francisco Italian roots and sunny personality. The background hints at San Francisco or Hollywood — bay water, Telegraph Hill, or a movie studio. Ornate tobacco-card border with subtle Italian motifs (grape vines, olive branches). The paper should look well-loved — this is the card everyone passed around because the story on the back was too good not to share.",
    reference: "Think of the T206 card you'd hang on your wall not for its value but because it makes you smile. ILB sepia at its most joyful. Bodie should look like the card that proves baseball isn't just about stats — it's about characters. The most fun card in the entire collection.",
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
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function PingBodieCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Banners Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: C.sepia }}>
              <img src={PLAYER_IMG} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>Francesco Pezzolo — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "OPS", val: d.real_stats.ops },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war },{ label: "HITS", val: d.real_stats.hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\ud83c\uddee\ud83c\uddf9 Italian American Pioneer", "\ud83e\udda9 Beat an Ostrich", "\ud83c\udfe0 Ruth's Roommate", "\ud83d\udcd6 Inspired 'You Know Me Al'", "\ud83c\udfac Hollywood Electrician", "\ud83d\udca5 52-oz Bat"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
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
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "\u26a0 Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="\ud83d\udd25 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>\u25b8 {t}</div>))}</Section>
                <Section title="\u2744 Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>\u25b8 {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Bodie's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (
                    <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                        <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span>
                      </div>
                      <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                    </div>
                  ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>CONTACT — Batting Average + OPS+</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>.200-.249 → 1 | .250-.269 → 2 | .270-.299 → 3 | .300-.329 → 4 | .330+ → 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: OPS+ ≥ 130 → +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>POWER — Home Runs + SLG</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-9 → 0 | 10-19 → 1 | 20-29 → 2 | 30-39 → 3 | 40-49 → 4 | 50+ → 5</div>
                    <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: SLG ≥ .500 → +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>SPEED — Stolen Bases + range</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>0-5 → 0 | 6-15 → 1 | 16-30 → 2 | 31-50 → 3</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>OVERALL — CON×2 + POW×1.5 + SPD×1 + DEF×0.5</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>3-4 Replacement | 5-6 Solid | 7-8 All-Star | 9-10 Elite | 11-12 Legend | 13 Mythic</div>
                  </div>
                </Section>
                <Section title="Bodie's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, born_as: "Francesco Stephano Pezzolo", year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
