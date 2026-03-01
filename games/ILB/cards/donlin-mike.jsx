import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}donlin-mike.png`;

const PLAYER_DATA = {
  name: 'Mike "Turkey Mike" Donlin',
  nickname: "The Baseball Idol of Manhattan",
  year: 1905,
  team: "New York Giants",
  era: "1900s",
  ilb_team: "Banners NL1900",
  position: "OF",
  bats: "L",
  throws: "L",
  height: '5\'9"',
  weight: "170 lbs",
  born: "May 30, 1878 — Peoria, IL",
  died: "September 24, 1933 — Hollywood, CA (age 55)",
  hof: "NOT in HOF. .333 career BA (28th all-time). OPS+ 144 (#52 all-time, tied Crawford & Hack Wilson). Top 3 in NL batting 5×. But only ~4,000 AB — missed seasons for jail, vaudeville, and Hollywood. The greatest hitter who chose the stage over Cooperstown.",

  real_stats: {
    season: 1905, games: 150, at_bats: 565, hits: 201, doubles: 26,
    triples: 16, home_runs: 7, rbi: 80, runs: 124, stolen_bases: 14,
    batting_avg: ".356", obp: ".404", slg: ".476", ops: ".880",
    ops_plus: 167, war: "~6.5",
    career_avg: ".333", career_hits: 1282, career_hr: 51,
    career_rbi: "~550", career_runs: "~670",
    career_war: "~25", career_ops_plus: 144,
    career_at_bats: "~3,850",
    top3_batting: "5 times (NL)",
    full_seasons: "Only 5 of 12 seasons at 100+ games",
    ws_champion: "1905 (New York Giants)",
    movies: "The General (1926), Warming Up (1928), ~50 films",
    broadway: "Stealing Home (1908-1911, with Mabel Hite)",
  },

  ilb_stats: {
    ovr: 9,      // Elite — .333 career BA (28th all-time). OPS+ 144 (tied Crawford/Hack Wilson at #52). Top 3 in NL batting 5×. The bat was undeniably elite. But only ~4,000 career AB — missed seasons for jail (1902), vaudeville (1907, 1909-10), and various retirements. The hitting talent was HOF-caliber; the availability was not.
    con: 5,      // .356 BA in 1905 → tier 5 (.330+). OPS+ 167 → ≥130 bonus (already capped at 5). .333 career BA, 28th all-time. Top 3 in NL batting 5 times. In each of those 5 seasons, also top 10 in OBP, SLG, and HR. The bat was extraordinary — one of the finest hitters of the dead-ball era. Rating: 5.
    pow: 2,      // 10 HR in 1900 → tier 1 (10-19). SLG .516 in 1903 → ≥.500 bonus (+1) = 2. 51 career HR in ~4,000 AB — decent dead-ball power. 7 HR in 1905. He hit for extra bases more than most dead-ball players: 16 3B in 1905, 18 3B in 1903. Rating: 2.
    spd: 1,      // 14 SB in 1905. Ran bases with "reckless abandon" but not elite speed stats. 6-15 SB range = tier 1. Rating: 1.
    def: 0,      // "Erratic fielding." "Subpar defense." "Poor defensive outfielder." He volunteered for SS on his first day and couldn't handle it. Moved to OF and still had a reputation for bad defense. Rating: 0.
    clu: 2,      // 1905 WS champion (Giants beat Philadelphia Athletics). 1904 NL pennant. Named Giants captain in 1905. .333 career BA in big moments. .356 in a championship season. Rating: 2.
  },

  stat_justification: {
    con: ".356 BA in 1905 → tier 5 (.330+). OPS+ 167 (≥130 bonus, capped at 5). .333 career BA — 28th highest in MLB history. He finished top 3 in NL batting 5 times, and in each of those seasons was also top 10 in OBP, SLG, and HR. In 1903, he hit .351 and nearly beat Honus Wagner (.355) for the batting title. The bat was transcendent. He was 'one of the finest hitters of the dead-ball era' — not an exaggeration. Rating: 5.",
    pow: "10 HR in 1900 → tier 1 (10-19). SLG .516 in 1903 → ≥.500 bonus (+1) = 2. 51 career HR in ~4,000 AB is solid dead-ball power. 16 triples in 1905, 18 in 1903 — the extra-base production was real. He hit line drives into gaps with authority. Not a home run hitter by modern standards, but for the dead-ball era, he had pop. Rating: 2.",
    spd: "14 SB in 1905. Ran the bases with 'reckless abandon' (SABR). But the stolen base numbers are modest — typically 10-20 per season. He was aggressive on the basepaths but not a pure speed player. Rating: 1.",
    def: "Zero. 'Erratic fielding.' 'Subpar defense.' 'A hard-bargaining, poor defensive outfielder.' He started as a pitcher, tried SS (failed immediately), tried 1B (failed), and settled in the outfield where he was tolerable but never good. The bat had to carry everything because the glove carried nothing. Rating: 0.",
    clu: "1905 World Series champion — the Giants beat the A's. 1904 NL pennant. Named captain of the Giants in his best season (.356). He was the star of championship teams. But: he also abandoned baseball repeatedly — for jail (1902), for vaudeville (1907, 1909-10), for Hollywood. The clutch moments exist but are compressed by his absences. Rating: 2.",
  },

  personality: {
    leadership_style: "THE SHOWMAN. Donlin led by magnetism, charisma, and sheer force of personality. He was named captain of the Giants — the team of McGraw, Mathewson, McGinnity — because his presence electrified the lineup. Kids imitated his strut. Women loved him. The press couldn't stop writing about him. He didn't lead through discipline or example; he led through star power. The baseball idol of Manhattan.",
    temperament: "VOLATILE AND CHARMING. The duality was the whole story: the same man who accosted chorus girls and waved revolvers on trains also married a vaudeville star, befriended John Barrymore, and appeared in Buster Keaton films. The same man who got slashed across the throat in a bar fight came back in a week. The same man who spent 6 months in jail came out and hit .351. The charm and the violence were two sides of the same coin, and the coin was always spinning.",
    work_ethic: "SELECTIVE. When Donlin wanted to play baseball, he was extraordinary — .333 career BA, top 3 in NL batting 5 times. When he didn't want to play, he simply didn't. He chose vaudeville over baseball for multiple seasons. He chose jail time over sobriety. He chose Hollywood over Cooperstown. The talent was never in question; the commitment was always in question.",
    lifestyle: "ORPHAN TO IDOL TO STAR. Raised at St. Joseph's Orphanage, Erie, PA — one of 14 orphaned Donlins. Learned baseball in the streets and sandlots of California. Married vaudeville star Mabel Hite. Starred on Broadway. Moved to Hollywood. Friends with John Barrymore. Appeared in The General (1926). Cap at a belligerent angle, scar on his cheek from a knifing, tobacco in his jaw. 'Virtually every kid in the first part of the 20th century knew who Mike Donlin was.'",
    era_adaptability: "COMPLICATED. The .333 BA and OPS+ 144 translate to any era — the bat was timeless. But the alcoholism, the violence, the absences, the restless ego? In 2024 he'd be on TMZ every week. He'd have the talent for the Hall of Fame and the lifestyle for a reality show. The 1949 Gene Kelly/Sinatra film Take Me Out to the Ball Game was likely inspired by Donlin's life — that tells you everything about the archetype.",
    clubhouse_impact: "ELECTRIC AND DESTRUCTIVE. He was the life of every party. He was also the cause of every problem. McGraw loved him because Donlin's fire matched his own. Teammates loved his energy. But the drinking, the jail time, the absences for vaudeville — the talent was perpetually being wasted. +3 energy, +2 charisma, -2 availability, -1 discipline. The clubhouse loved him. The front office couldn't count on him.",
    dark_side: "The alcohol. The violence. The jail. The chorus girls. The revolver on the train. The knife fight that left a permanent scar. He was an orphan who channeled his rage into baseball and his loneliness into drinking. Mabel Hite stabilized him — 'I haven't taken a drink in four years' — but she died of cancer in 1912, and the stability died with her. The last decade of his life was bit parts in Hollywood, a bad heart, and the memory of what could have been. He died at 55 in Hollywood, a city full of people who never knew he was once the most famous athlete in New York.",
  },

  chemistry_traits: [
    { tag: "Baseball Idol of Manhattan", desc: "When Donlin plays in New York (or any major market), +3 attendance, +2 crowd energy. Kids imitate his strut. Women swoon. The press writes about him daily. Star power incarnate." },
    { tag: "Turkey Strut", desc: "Donlin's signature walk — cap at a belligerent angle, scar on his cheek, tobacco in his jaw. All teammates gain +1 swagger when Donlin is in the lineup. The style is contagious." },
    { tag: "The Stage Calls", desc: "After any WS championship or peak season, 30% chance Donlin retires to pursue vaudeville/acting. He may miss 1-3 seasons. The talent is undeniable; the availability is a coin flip." },
    { tag: "McGraw's Favorite", desc: "When managed by a fiery, aggressive manager, Donlin gains +1 to all offensive stats. McGraw's temperament matched his own. The right manager unlocks the genius." },
    { tag: "Ten-Cent Head", desc: "Teammate Schreckengost: '$10,000 arm and a ten-cent head.' Donlin's decision-making off the field is catastrophic. Each season: 10% risk of suspension/jail/injury from off-field incident. -2 availability." },
    { tag: "Orphan's Hunger", desc: "Raised in an orphanage — one of 14 orphaned Donlins. The hunger never left. When trailing or underdog, +1 to all stats. He played like he had nothing to lose because he started with nothing." },
    { tag: "Mabel Hite's Influence", desc: "When 'married' (chemistry partner present), Donlin's alcohol/discipline risk drops by 50%. Mabel stabilized him. Without her, the chaos returns. After her death, -2 discipline." },
    { tag: "Hollywood Bound", desc: "Appeared in The General (1926), Warming Up (1928), ~50 films. Friend of John Barrymore. After baseball, Donlin transitions to entertainment. +3 post-career legacy, +2 cultural impact." },
  ],

  preferred_locations: [
    { location: "Batter's Box (LH)", affinity: "HIGH", note: ".333 career BA. .356 peak. 28th all-time. The batter's box was where the orphan became a god." },
    { location: "New York / Manhattan", affinity: "HIGH", note: "The Baseball Idol of Manhattan. The Polo Grounds were his palace. Kids imitated his strut." },
    { location: "Broadway / Vaudeville Stage", affinity: "HIGH", note: "Stealing Home ran for 3 years. He left baseball for the stage — multiple times." },
    { location: "Hollywood", affinity: "HIGH", note: "The General. Warming Up. John Barrymore's friend. The second career he never quite conquered." },
    { location: "Bars / Hotel Metropole", affinity: "MEDIUM", note: "The night crawler. The drinking. The life of the party. The source of the chaos." },
    { location: "Jail / Courthouse", affinity: "LOW", note: "1902: 6 months for assault. Arrested with revolver on train. The talent behind bars." },
  ],

  momentum: {
    hot_triggers: [
      "Big crowds — the showman comes alive in front of large audiences. Manhattan crowds are his oxygen.",
      "Comeback seasons — after every absence, Donlin returned and hit over .300. The hunger renewed.",
      "Rivalry with Wagner — he nearly beat Honus for batting titles. When facing elite competition, +1 CON.",
      "Captaincy — when given leadership responsibility, he rose to it. Named captain in his best season.",
    ],
    cold_triggers: [
      "Alcohol — the drinking binge derails everything. Off-field incidents cost games, seasons, and careers.",
      "Boredom — when the spotlight fades, Donlin loses interest. Mid-season slumps correlate to off-field distractions.",
      "Bad defense — errors in the outfield shake his confidence. The glove was always the weakness.",
      "Loss of Mabel — after her death, the stabilizing force was gone. Post-1912 Donlin was diminished.",
    ],
    pressure_response: "MAGNIFICENT WHEN PRESENT. The problem was never performance — it was presence. When Donlin showed up, he hit .333 for his career. He was the star of a WS championship team. He was captain of the Giants. But he showed up for only ~4,000 AB in 12 seasons. The greatest hitter who couldn't commit. In ILB: when available, he's the best bat in the lineup. The question is whether he'll be available.",
  },

  action_card_seeds: [
    { title: "The Idol of Manhattan", type: "Drama", text: "Your outfielder walks to the plate with his cap tilted at a belligerent angle, scar on his cheek, tobacco in his jaw. The crowd roars. Kids in the stands imitate his strut. He slashes a line drive into the gap. He rounds first with the turkey strut. The baseball idol of Manhattan. +3 crowd energy. +2 all offensive stats at home.", origin: "Donlin was dubbed 'the baseball idol of Manhattan.' His strut, style, and hitting made him the most popular athlete in New York." },
    { title: "The .351 That Lost to .355", type: "Game Action", text: "Your outfielder hits .351 for the season — the second-highest average in the league. But the man ahead of him is Honus Wagner at .355. Four points separate greatness from immortality. +2 CON for the season. -1 for the sting of second place.", origin: "1903: Donlin hit .351, finishing second to Wagner's .355 for the NL batting title." },
    { title: "Six Months in Jail", type: "Drama", text: "Your star outfielder goes on a drinking binge. He accosts two chorus girls. He is sentenced to six months in jail. He misses most of the season. Released early for good behavior, he joins a new team and hits .351 the next year. The talent survived the bars. -1 full season. +2 CON next season (the hunger returns).", origin: "March 1902: Donlin was sentenced to 6 months in jail for drunken assault in Baltimore. Released early, he joined Cincinnati and hit .351 in 1903." },
    { title: "Stealing Home (The Play)", type: "Drama", text: "Your outfielder marries a vaudeville star. Together they write and perform a baseball-themed play on Broadway. It runs for three years. He makes more money than baseball pays. He retires from baseball — not because he can't play, but because the stage pays better. -2 seasons of availability. +3 cultural legacy.", origin: "1908-1911: Donlin and wife Mabel Hite performed 'Stealing Home' on Broadway. He left baseball for the stage, missing prime seasons." },
    { title: "Mabel Dies", type: "Drama", text: "Your outfielder's wife — the vaudeville star who stabilized him, who gave him a reason to stay sober, who performed beside him on Broadway — is diagnosed with cancer. She dies in October. The center of his life is gone. He returns to baseball because he has nothing else. -3 discipline. +1 desperation. The strut is slower now.", origin: "October 1912: Mabel Hite died of cancer. Donlin returned to baseball but was never the same force." },
    { title: "The Knife Fight", type: "Drama", text: "Your outfielder taunts some men outside a saloon at 2 AM. One of them has a pocketknife. Two cuts across the throat. One along the right side of his face. One across his cheek. Both hands slashed. He returns to play in one week. The scar stays on his cheek for the rest of his life. +2 intimidation. +1 legend. The scar becomes part of the strut.", origin: "Summer 1900: Donlin was slashed with a pocketknife in a fight outside a St. Louis saloon. He returned in a week with a permanent facial scar." },
    { title: "I Know I'm Going to Be Great", type: "Origin", text: "A young player on a minor league team gives his own photograph to a newspaper artist. 'If you put a picture of me in the paper, I know I'll get a break. I know I'm going to be great.' The self-belief of an orphan who has nothing but his talent and his nerve. +2 confidence. +1 publicity. He was right.", origin: "While with the Santa Cruz Sandcrabs, Donlin gave his photo to a reporter, saying 'I know I'm going to be great.' He was correct." },
    { title: "The General", type: "Drama", text: "Your retired outfielder appears in a Buster Keaton silent film. It becomes one of the greatest movies ever made. His baseball career is over but his face is on screen. John Barrymore is his friend. The orphan from Erie, Pennsylvania dies in Hollywood at 55. +5 cultural legacy. +3 post-career fame.", origin: "Donlin appeared in Buster Keaton's The General (1926), now considered one of the greatest films ever made. He appeared in ~50 films." },
  ],

  art_direction: {
    face: "HANDSOME AND DANGEROUS. 5'9\" 170 lbs. The face should radiate STAR POWER — not just good-looking, but magnetically so. A leading man's face. Cap tilted at a belligerent angle over one ear. A VISIBLE SCAR running down the left cheek from the knife fight. Plug of tobacco in the jaw. Dark, charming eyes with a hint of recklessness. The face of a man who was the most famous athlete in New York AND a friend of John Barrymore. The orphan who became the idol.",
    attire: "New York Giants uniform circa 1905 — white wool jersey with 'NEW YORK' or interlocking 'NY' insignia, baggy flannel pants. THE POSE: the turkey strut — Donlin walking toward the plate or rounding the bases with his signature swagger, shoulders back, chin up, the cocky walk that kids imitated across Manhattan. Or: at bat — left-handed swing at full extension, the line drive already launched, the follow-through elegant and violent. Or: in the outfield, cap tilted, scar visible, looking more like a Broadway actor than a ballplayer. No number.",
    mood: "SPOTLIGHT. Donlin's card should feel like a MARQUEE — the bright lights of Manhattan, the Polo Grounds, Broadway. Where Phillippe is sanctuary light and Leever is pastoral, Donlin is FOOTLIGHTS AND FLASH. The mood should suggest fame, glamour, danger, and the electricity of a man who could walk into any room and own it.",
    style: "Sepia-toned with WARM, THEATRICAL undertones — the glow of stage lights, the warmth of a crowded theater, the golden light of early cinema. More glamorous than any other Banners card. Where Elberfeld is pepper-red aggression and Hoy is quiet gold, Donlin is BROADWAY GOLD — rich, warm, dramatic, slightly overlit. The card should feel like a playbill.",
    reference: "Think the turkey strut frozen mid-step — Donlin walking to the plate or rounding the bases, cap tilted, scar visible, the strut that defined an era. Or: the moment after a base hit — the line drive still echoing, Donlin standing on first with the most self-satisfied expression in baseball history. Or: a composite — half baseball uniform, half vaudeville performer. The man who lived in both worlds and fully belonged to neither.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak)", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }] },
  defense: { metric: "Positional reputation", note: "Universally regarded as poor defensive outfielder" },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13" },
  clutch: { metric: "Postseason + signature moments", note: "1905 WS champion, Giants captain" },
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

export default function MikeDonlinCard() {
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
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 4 }}>
                <span style={{ background: `${C.gold}cc`, color: C.ink, padding: "3px 8px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>🎭 BROADWAY + BASEBALL</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>Turkey Mike Donlin</div>
              <div style={{ fontSize: 11, color: C.gold, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>"The Baseball Idol of Manhattan"</div>
              <div style={{ fontSize: 11, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 2 }}>{d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "OPS+", val: d.real_stats.ops_plus },{ label: "R", val: d.real_stats.runs },{ label: "H", val: d.real_stats.hits },{ label: "3B", val: d.real_stats.triples },{ label: "RBI", val: d.real_stats.rbi },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>1905 — NL LEADER IN RUNS (124) / CAPTAIN / WS CHAMPION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR OPS+", val: d.real_stats.career_ops_plus },{ label: "CAR AB", val: "~3850" },{ label: "TOP 3 BA", val: "5×" },{ label: "100+ GP", val: "5 of 12" },{ label: "FILMS", val: "~50" },{ label: "BWAY", val: "3 yrs" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.warmRed, fontFamily: "'Courier Prime', monospace", letterSpacing: 2, fontWeight: 700 }}>.333 CAREER BA (28TH ALL-TIME) • OPS+ 144 (#52)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🦃 Turkey Strut", "🏆 1905 WS Champion", "🎭 Broadway Star", "🎬 Hollywood Actor", "🔪 Knife Fight Scar", "⛓️ 6 Months in Jail", "📰 Idol of Manhattan", "🏠 Orphanage Kid", "❌ Not in HOF"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>Turkey Mike Donlin</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<><Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section><Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section></>)}
              {tab === "momentum" && (<><Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section><Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section><Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section></>)}
              {tab === "actions" && (<><Section title="Action Card Seeds"><p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events span baseball, Broadway, Hollywood, jail, and knife fights.</p>{d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : a.type === "Origin" ? `${C.traitGreen}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : a.type === "Origin" ? C.traitGreen : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}</Section></>)}
              {tab === "engine" && (<><Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}{data.note && <div style={{ fontSize: 10, color: C.sepia, marginTop: 2, fontStyle: "italic" }}>Note: {data.note}</div>}</div>))}</Section><Section title="Donlin's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section></>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
