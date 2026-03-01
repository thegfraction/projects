import { useState } from "react";

const COLLINS_DATA = {
  name: "Ripper Collins",
  nickname: "The Ringleader",
  year: 1934,
  team: "St. Louis Cardinals",
  league: "National League",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "S",
  throws: "L",
  height: "5'9\"",
  weight: "165 lbs",
  born: "March 30, 1904 — Altoona, Pennsylvania (grew up in Nanty Glo, PA; coal miner at age 13)",
  died: "April 15, 1970 — New Haven, New York (age 66, heart attack while scouting for Cardinals)",
  hof: "Not inducted. 2× All-Star (1935-36). 2× WS champion (1931, 1934). First switch-hitter to hit 30+ HR (35 in 1934, tied Mel Ott for NL lead). Led NL in SLG (.615) and total bases (369) in 1934. Led Cardinals in 16 offensive categories in 1934. 135 career HR (switch-hitter record until Mantle).",

  real_stats: {
    season: 1934, games: 154, at_bats: 600, batting_avg: ".333",
    hits: 200, doubles: 40, triples: 12, home_runs: 35,
    rbi: 128, runs: 116, stolen_bases: 3, walks: 51,
    strikeouts: 55, slg: ".615", obp: ".393", ops: "1.008",
    ops_plus: 152, war: 5.5,
    career_avg: ".296", career_hr: 135, career_rbi: 659,
    career_hits: 1121, career_war: 19.3,
  },

  ilb_stats: {
    ovr: 7,      // All-Star — .333/35/128 in 1934 is excellent. But: only 9 MLB seasons (short peak). 19.3 career WAR. Not HOF. OPS+ 152 in peak year is very good but below true elite. The Gashouse Gang personality adds value the numbers don't capture. OVR 7.
    con: 4,      // .333 BA in 1934. 200 hits. .296 career BA. Hit .300+ four times. Switch-hitter who made consistent contact from both sides. "Chunky, powerful man who hit long home runs even though he choked up on the bat." CON 4.
    pow: 3,      // 35 HR in 1934 (co-led NL with Ott). .615 SLG (led NL). 369 TB (led NL). First switch-hitter to hit 30+ HR. 135 career HR (switch-hitter record until Mantle). SLG bonus applies → POW 3.
    spd: 1,      // 3 SB in 1934. 12 triples (good for a 1B). Not fast, but the triples show some ability to run the bases. Triples bonus → SPD 1.
    def: 0,      // Only 1B in history to twice record zero putouts in a 9-inning game. Led NL 1B in assists once (110 in 1934) but the zero-putout games are historically unique embarrassments. Below average 1B defense. DEF 0.
    clu: 1,      // .367 BA in 1934 WS (Cardinals won in 7 vs. Tigers). 2× WS champion (1931, 1934). He delivered in October. But: short postseason sample. CLU 1.
  },
  
  stat_justification: {
    con: ".333 BA in 1934. 200 hits. 40 doubles. .296 career BA. Hit .300+ in four of nine MLB seasons. Switch-hitter who choked up on the bat for control. 'A chunky, powerful man who hit long home runs even though he choked up on the bat.' Rating of 4.",
    pow: "35 HR in 1934 — co-led NL with Mel Ott. .615 SLG (led NL). 369 total bases (led NL). First switch-hitter in MLB to hit 30+ HR. 135 career HR — the switch-hitter record until Mickey Mantle surpassed it in 1955. Only 31 of 35 HR were hit left-handed. SLG .615 bonus applies: base tier 3 (HR 30-39). Rating of 3.",
    spd: "3 SB in 1934. 12 triples (strong for a 1B). Not a speed player, but the triples show gap-to-gap running ability. In the minors (1930 Rochester), he hit 19 triples. Triples bonus applies → SPD 1.",
    def: "The only first baseman in MLB history to twice record zero putouts in a 9-inning game (1935 Cardinals, 1937 Cubs). Led NL 1B in assists once (110 in 1934), but the zero-putout games are historically unique defensive embarrassments. Below average 1B defense overall. Rating of 0.",
    clu: ".367 BA in the 1934 WS (Cardinals won in 7 vs. Tigers). 2× WS champion (1931 — as a part-timer, 1934 — as the starting 1B). He hit well in October. But the sample is small and he wasn't the WS hero (the Dean brothers were). Rating of 1.",
  },

  personality: {
    leadership_style: "The Ringleader. Branch Rickey accused Collins of being the instigator of the Gashouse Gang's legendary chaos. Collins replied: 'Rickey always accused me of being the ringleader; I never could understand why he picked on me — unless it could have been because there was considerable truth in his allegations.' He organized hotel pranks, led the Mississippi Mudcats band, wrote newspaper columns during the pennant race, and kept the clubhouse perpetually chaotic. He was the social engine of the most colorful team in baseball history.",
    temperament: "Sly, engaging, baby-faced, mischievous. 'Ruggedly handsome with dark wavy hair, an engaging smile and a boyish grin.' Collins was the prankster-in-chief: painting hotel walls, ushering guests to wrong rooms, playing washboard music on the radio. He was Frisch's favorite because he 'knew how to play and when to be serious.' He could switch from clown to clutch hitter in one at-bat.",
    work_ethic: "Coal mine to Cooperstown's doorstep. Started working in the mines at 13 alongside his father. Played sandlot ball, then spent eight years in the minors before making the majors at 27. In 1930 Rochester, hit .376/40 HR/180 RBI (the IL RBI record still stands). At 40, named Minor League Player of the Year while hitting .396 with Albany. The man could always hit — the question was always whether anyone would let him.",
    lifestyle: "Pennsylvania coal country to the Gashouse Gang to scouting. Father was a coal miner who played semipro ball. Collins dropped out of school at 14. His father taught him to switch-hit. His nickname came from ripping a ball off a nail in an outfield fence. After playing: managed in the minors, coached for the Cubs and Dodgers, broadcast in Baltimore, scouted for the Cardinals until his death in 1970 (heart attack while scouting in New York). The Gashouse Gang spirit never left him.",
    era_adaptability: "MODERATE. The switch-hitting power (.615 SLG, 35 HR) translates well. Modern analytics would love his platoon-proof production. But his defense was poor and his career was short (9 MLB seasons). He'd be a solid platoon-proof DH or 1B in modern baseball — .275/25 HR with the ability to hit from both sides. The personality would make him a fan favorite in any era.",
    clubhouse_impact: "MAXIMUM CHAOS (POSITIVE). The Mississippi Mudcats. The hotel pranks. The newspaper columns. Collins was the social glue of the Gashouse Gang — the most entertaining team in baseball history. His clubhouse impact far exceeded his statistical value. Every team needs a Ripper Collins: the guy who keeps everyone loose, who turns a tense pennant race into a party, and who can still hit .333 when it matters.",
    dark_side: "The short peak and the replacement. Collins' MLB career was only 9 seasons because (a) he spent 8 years in the minors, and (b) Johnny Mize replaced him in 1936. Mize was simply better. Collins was traded to the Cubs and was never the same dominant hitter. His .296 career BA and 135 HR are solid but not HOF-caliber. He was the star of a specific moment — the 1934 Gashouse Gang — and when that moment passed, so did his stardom. The coal miner went back to work.",
  },

  chemistry_traits: [
    { tag: "Gashouse Gang Ringleader", desc: "When 2+ Gashouse Gang members (Martin, Dean, Medwick, Frisch) are on the roster: +2 team morale, +1 entertainment, -1 discipline. Collins is the social engine. Without him, the pranks stop." },
    { tag: "Mississippi Mudcats", desc: "Collins, Martin, Dean, and Vance formed a washboard band that played on KMOX radio. +1 team morale and +1 publicity. The most entertaining chemistry trait in the game." },
    { tag: "Switch-Hitter Pioneer", desc: "First switch-hitter to hit 30+ HR. Immune to platoon disadvantage. No penalty vs. LHP or RHP. Collins hits from both sides with equal power." },
    { tag: "The Rip", desc: "Collins' nickname came from ripping a ball so hard it tore the cover on a nail. Once per game, 5% chance of a 'ripped' ball — automatic extra-base hit, +1 entertainment." },
    { tag: "Coal Miner's Son", desc: "Started working mines at 13. +1 toughness. Collins never complains about conditions, fatigue, or injuries. The mine was harder than baseball." },
    { tag: "Swing Your Typewriter", desc: "Collins wrote newspaper columns during the pennant race. After he struck out, Frisch yelled: 'Next time, swing your typewriter.' -1 CON when distracted by media obligations. +1 publicity." },
    { tag: "Zero Putouts at First", desc: "Only 1B to twice record zero putouts in a 9-inning game. DEF permanently 0. The glove was ornamental." },
    { tag: "Replaced by Mize", desc: "When a superior 1B prospect arrives, Collins loses his job within 1 season. Based on Johnny Mize replacing Collins in 1936. The peak was brilliant but finite." },
  ],

  preferred_locations: [
    { location: "Sportsman's Park / St. Louis", affinity: "HIGH", note: "6 seasons. 2 WS titles. The Gashouse Gang's home. .333/35/128 in 1934." },
    { location: "Clubhouse / Hotel Lobby", affinity: "HIGH", note: "Painting walls. Wrong-room pranks. Washboard band rehearsals. The Gashouse Gang's social headquarters." },
    { location: "KMOX Radio Studio", affinity: "HIGH", note: "Mississippi Mudcats performed live. Collins, Martin, Dean, Vance. Washboard music for St. Louis." },
    { location: "Batter's Box (both sides)", affinity: "HIGH", note: "Switch-hitter. .333 BA. 35 HR. Choked up on the bat. Power from both sides." },
    { location: "Coal Mines / Nanty Glo, PA", affinity: "MEDIUM", note: "Started at 13. Father was a coal miner. The mines built the toughness." },
    { location: "Minor Leagues", affinity: "MEDIUM", note: "8 years before the majors. .376/40/180 at Rochester. Minor League POY at age 40." },
    { location: "First Base (defensively)", affinity: "LOW", note: "Twice zero putouts in a game. The only 1B in history to do it twice." },
  ],

  momentum: {
    hot_triggers: [
      "Gashouse Gang chemistry — when the team is loose and chaotic, Collins thrives.",
      "Switch-hitting matchups — he has no platoon weakness. Both sides produce power.",
      "Pennant races — .333 in 1934 as the Cardinals surged from behind to win.",
      "Minor league dominance — .376/40/180 at Rochester. When he's locked in, pitchers have no answer.",
    ],
    cold_triggers: [
      "Media distractions — 'Swing your typewriter.' The writing career hurt the hitting.",
      "Defensive expectations — zero putouts. Twice. The glove was a liability.",
      "Replacement by superior talent — Johnny Mize arrived and Collins was gone.",
      "Post-peak decline — after 1935, never hit 20 HR again in the majors.",
    ],
    pressure_response: "DELIVERED IN OCTOBER. .367 BA in the 1934 WS — Cardinals won in 7 over the Tigers. 2× WS champion (1931, 1934). Led the Cardinals in 16 offensive categories during the 1934 pennant race. He hit .333 down the stretch as the Cardinals won 20 of their last 25 to overtake the Giants. The Gashouse Gang was chaos, but Collins channeled it into production. The coal miner's son hit when it mattered.",
  },

  action_card_seeds: [
    {
      title: "The First Switch-Hitter to Hit 30 Home Runs",
      type: "Game Action",
      text: "Your first baseman is 5'9\", 165 pounds. He chokes up on the bat. He switch-hits. He hits 35 home runs — more than anyone in the league except one Hall of Famer. He's the first switch-hitter to ever hit 30. The record will stand for 21 years until Mickey Mantle breaks it.",
      origin: "1934: Collins hit 35 HR (co-led NL with Ott). First switch-hitter with 30+ HR. Record stood until Mantle's 37 in 1955.",
    },
    {
      title: "The Mississippi Mudcats",
      type: "Action",
      text: "Your first baseman, your outfielder, your pitcher, and your relief pitcher form a washboard band. They play on the radio. They perform in the clubhouse. They perform in hotels. The music is terrible. The morale is incredible.",
      origin: "Collins, Pepper Martin, Dizzy Dean, and Dazzy Vance formed the Mississippi Mudcats — a washboard-style band that performed on KMOX radio in St. Louis.",
    },
    {
      title: "Swing Your Typewriter",
      type: "Drama",
      text: "Your star first baseman starts writing a newspaper column during the pennant race. He provides baseball commentary and stories about his roommate's pranks. After he strikes out in a game, the manager shouts: 'Next time, swing your typewriter!' The writing career is suspended.",
      origin: "Collins wrote columns for the East St. Louis Journal during the 1934 pennant race. After he struck out, Frisch shouted: 'Next time, swing your typewriter.'",
    },
    {
      title: "The Rip",
      type: "Action",
      text: "Your young player hits a ball so hard it strikes a nail protruding from the outfield fence. The cover tears — rips open. The outfielder picks up the ball and sees it hanging. 'Who hit that?' 'The ripper.' The nickname sticks for life.",
      origin: "Collins' nickname originated when a line drive struck a nail in an outfield fence, partially tearing the ball's cover. The outfielder said: 'It was the ripper.'",
    },
    {
      title: "180 RBI in the International League",
      type: "Game Action",
      text: "Your prospect hits .376 with 40 home runs and 180 RBI in the International League. The RBI record still stands nearly a century later. He also has 234 hits, 19 triples, and a .684 SLG. He's been in the minors for eight years. He's finally ready.",
      origin: "1930 Rochester: Collins hit .376/40 HR/180 RBI. The IL RBI record still stands. He was called up to the Cardinals in 1931.",
    },
    {
      title: "The Hotel Pranks",
      type: "Action",
      text: "Your players paint the walls of a busy hotel. They usher guests to the wrong rooms. They perform washboard music in the lobby. The manager is furious. The fans are delighted. The team wins the pennant.",
      origin: "Gashouse Gang members, led by Collins, painted hotel walls and directed guests to wrong rooms. The team won the 1934 pennant and WS.",
    },
    {
      title: "Replaced by The Big Cat",
      type: "Drama",
      text: "Your first baseman hit .333 with 35 HR two years ago. But a kid named Johnny Mize arrives. He's bigger, stronger, and younger. Your first baseman is traded. The kid becomes a Hall of Famer. Your guy becomes a footnote.",
      origin: "1936: Johnny Mize arrived and took over 1B. Collins was traded to the Cubs after the season. Mize became a HOFer.",
    },
    {
      title: "Minor League Player of the Year at Forty",
      type: "Game Action",
      text: "Your legend is 40 years old. His MLB career is over. He's player-managing in the Eastern League. He hits .396 with 40 doubles. He's named Minor League Player of the Year. The coal miner's son could always hit — even when nobody was watching.",
      origin: "1944: Collins, age 40, hit .396 with Albany and was named Minor League Player of the Year.",
    },
  ],

  art_direction: {
    face: "Baby-faced, ruggedly handsome, dark wavy hair, engaging smile. 5'9\" 165 lbs — compact and powerful. The face should show mischief — this is the man who organized the hotel pranks, led the washboard band, and wrote newspaper columns during the pennant race. Equal parts charm and danger.",
    attire: "St. Louis Cardinals 1934 home whites with the classic birds-on-the-bat. Sportsman's Park behind him. The bat should be choked up — his signature grip. Maybe a washboard or a newspaper tucked under one arm, hinting at the Mississippi Mudcats and the writing career.",
    mood: "Gashouse Gang energy. The swing — compact, powerful, from both sides. Or: the dugout celebration, arms around Pepper Martin and Dizzy Dean, chaos incarnate. The card should feel fun — the most entertaining card in the set. Not solemn. Not reverent. Joyful, loud, and slightly dangerous.",
    style: "Depression-era St. Louis. Dusty, hot, alive. Sportsman's Park's brick and steel. The colors should be warm and earthy — Cardinals red, Missouri brown, Gashouse grit. This is a working-class card for a coal miner's son who became the life of baseball's greatest party.",
    reference: "The card of the coal miner who became the ringleader. The switch-hitter who hit 35 HR before Mantle. The sportswriter told to swing his typewriter. The washboard musician. The hotel prankster. Ripper Collins — the most fun player in the Gashouse Gang, and the Gashouse Gang was the most fun team in history.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "BA + Hits", tiers: [{ range: "BA < .230", value: 0 },{ range: "BA .230-.259", value: 1 },{ range: "BA .260-.289", value: 2 },{ range: "BA .290-.319", value: 3 },{ range: "BA .320-.349", value: 4 },{ range: "BA .350+", value: 5 }], bonus: "200+ hits -> +1 (cap 5)" },
  power: { metric: "HR + SLG", tiers: [{ range: "HR < 10", value: 0 },{ range: "HR 10-19", value: 1 },{ range: "HR 20-29", value: 2 },{ range: "HR 30-39", value: 3 },{ range: "HR 40-49", value: 4 },{ range: "HR 50+", value: 5 }], bonus: "SLG >= .600 -> +1 (cap 5)" },
  speed: { metric: "SB + Triples", tiers: [{ range: "SB < 5", value: 0 },{ range: "SB 5-14", value: 1 },{ range: "SB 15-29", value: 2 },{ range: "SB 30-49", value: 3 },{ range: "SB 50-74", value: 4 },{ range: "SB 75+", value: 5 }], bonus: "Triples >= 10 -> +1 (cap 5)" },
  defense: { metric: "Fielding reputation + advanced metrics", tiers: [{ range: "Below average", value: 0 },{ range: "Average", value: 1 },{ range: "Good", value: 2 },{ range: "Excellent", value: 3 }] },
  overall: { formula: "CONx2 + POWx2 + SPDx1 + DEFx1 -> normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason + signature moments", tiers: [{ range: "No PS or poor PS", value: 0 },{ range: "Average PS", value: 1 },{ range: "Good PS", value: 2 },{ range: "WS hero", value: 3 }] },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function RipperCollinsCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = COLLINS_DATA;
  const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card Generator — Test Output</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`, border: `2px solid ${C.gold}60`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Baby-faced, choked-up bat, Cardinals birds-on-bat, Sportsman's Park, Gashouse Gang energy, mischief in the eyes]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, background: `${C.coldBlue}cc`, color: C.cream, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>NL CROSSOVER</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "H", val: d.real_stats.hits },{ label: "2B", val: d.real_stats.doubles },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "WAR", val: d.real_stats.war }].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1934 — FIRST SWITCH-HITTER WITH 30+ HR — GASHOUSE GANG WS CHAMPS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 2× WS Champion", "⭐ 2× All-Star", "💣 35 HR (Led NL)", "📊 .615 SLG (Led NL)", "🔀 Switch-Hitter Pioneer", "🎵 Mississippi Mudcats", "⛏️ Coal Miner's Son"].map((a, i) => (
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
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}<span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>)}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>)}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events derived from Collins' real life, playable in any game.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section>)}
              {tab === "engine" && (<><Section title="Hitter Stat Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>)}</div>}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section><Section title="Collins' Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}<span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team} (NL)</span><span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, league: d.league, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
