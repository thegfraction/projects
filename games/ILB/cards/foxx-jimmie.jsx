import { useState } from "react";

const FOXX_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: JIMMIE FOXX
  // Year Snapshot: 1932 (Peak Season — 58 HR, .749 SLG)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Jimmie Foxx",
  nickname: "The Beast",
  year: 1932,
  team: "Philadelphia Athletics",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "1B",
  bats: "R",
  throws: "R",
  height: "6'0\"",
  weight: "195 lbs",
  born: "October 22, 1907 — Sudlersville, MD (rural Eastern Shore farm boy)",
  died: "July 21, 1967 — Miami, FL (age 59, choked while eating, alcohol-related)",
  hof: "Class of 1951 (BBWAA, 79.2%). #15 Sporting News 100 Greatest. 2nd player in 500 HR club.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1932 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1932,
    games: 154,
    at_bats: 585,
    hits: 213,
    doubles: 33,
    triples: 9,
    home_runs: 58,
    rbi: 169,
    stolen_bases: 3,
    batting_avg: ".364",
    obp: ".469",
    slg: ".749",
    ops: "1.218",
    ops_plus: 209,
    war: 11.0,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 9,
    career_avg: ".325",
    career_hits: 2646,
    career_hr: 534,
    career_sb: 87,
    career_war: 92.9,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  // CON: .364 BA → tier 5. OPS+ 209 → bonus. Capped. CON 5.
  // POW: 58 HR → tier 5 (50+). SLG .749 → bonus. Capped. POW 5.
  // SPD: 3 SB → tier 0. Career 87 SB + exceptional athlete (catcher/all positions). SPD 1.
  // DEF: No Gold Gloves. Versatile (C/1B/3B/LF). Adequate, not elite. DEF 0.
  // CLU: .344 WS BA in 3 Series (18 games), 4 HR, 11 RBI. Game-winning HR in 1930 WS Game 5. CLU 2.
  // OVR: CON(5)×2+POW(5)×1.5+SPD(1)×1+DEF(0)×0.5 = 18.5 → ~12 (Legend)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 12,     // Legend tier (high) — 92.9 career WAR, 3× MVP, Triple Crown, 534 HR. Top-5 RH hitter ever.
    con: 5,      // .364 in 1932. .356 Triple Crown 1933. Career .325. OPS+ 209. Max contact.
    pow: 5,      // 58 HR in 1932. .749 SLG. 534 career HR (#2 all-time at retirement). 12 straight 30+ HR seasons. Maximum power.
    spd: 1,      // 3 SB in 1932, 87 career. Former catcher — exceptional athlete, not a burner. 9 triples in 1932. SPD 1.
    def: 0,      // No Gold Gloves. Versatile (played C, 1B, 3B, LF, even pitched). Adequate but not an asset. Cronin praised his defense but historical consensus says average. DEF 0.
    clu: 2,      // .344 WS BA in 18 games across 3 Fall Classics (1929-31). 4 HR, 11 RBI. Game-winning HR in 1930 WS Game 5 (top 9th). Solid but 3 straight WS is more team success than individual heroics. CLU 2.
  },
  
  stat_justification: {
    con: ".364 in 1932 — narrowly missed batting title. .356 Triple Crown in 1933. Career .325 over 20 seasons. .300+ in 11 full seasons. Bill Dickey: 'If I were catching blindfolded, I'd always know when Foxx connected. He hit the ball harder than anyone else.' Maximum contact.",
    pow: "58 HR in 1932 (.749 SLG, 438 TB — 5th most ever). 534 career HR (#2 all-time at retirement, behind only Ruth). 12 consecutive 30+ HR seasons (record until Bonds). 13 consecutive 100+ RBI seasons. 3× MVP. Ted Williams: 'You just can't imagine how far he could hit a baseball.' Lefty Gomez on a Foxx HR: 'When Neil Armstrong set foot on the moon, he found a ball hit off me by Jimmie Foxx.' Maximum power.",
    spd: "3 SB in 1932, 87 career. Former catcher with excellent athleticism — Joe Cronin praised his arm and versatility. Played every position except SS and 2B. Not slow, but speed was never his weapon. Rating of 1.",
    def: "No Gold Gloves (pre-award). Played C (108 games), 1B, 3B (141 games), LF, even pitched (1.59 ERA in 1945). Cronin called him 'the greatest all-around ball player in the game.' Historical consensus: adequate defender, elite athlete. Not a defensive asset. Rating of 0.",
    clu: ".344/.425/.609 in 3 consecutive World Series (1929-31, 18 games). 4 HR, 11 RBI. Game-winning HR in top of 9th, 1930 WS Game 5. 2 rings. Solid postseason performer but his WS success came within a dynasty team (Simmons, Grove, Cochrane). No singular transcendent moment. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Gentle Beast. Despite the terrifying nickname and the bulging biceps, Foxx was universally described as one of the kindest, most generous men in baseball. Ted Williams became teary-eyed remembering him: 'He was a real peach of a guy.' His leadership was warmth — not intimidation. He led by example and by being the kind of teammate everyone loved.",
    temperament: "Easygoing, warm, trusting to a fault. Farm boy simplicity that never left him even as he became baseball's most feared slugger. Cut the sleeves off his uniform to show his muscles — not as intimidation but because he genuinely liked it. Lefty Gomez: 'He has muscles in his hair.' 'He wasn't scouted — he was trapped.' Never confrontational. The opposite of Simmons's volcanic fury.",
    work_ethic: "Natural talent refined by farm-boy strength. Built his body doing chores on his father's Maryland farm. Signed at 16, debuted at 17. Unlike Greenberg's self-made grind, Foxx was born to hit. But his natural gifts masked a lack of discipline that would haunt him — he never had to work as hard, and when the gifts faded, he had no backup plan.",
    lifestyle: "Generous, social, and increasingly troubled. Eloped young (Helen Heite), two sons, divorced after 14 years. Moved into a Boston hotel, separated from family. Drinking escalated after a beaning caused chronic sinus pain. Bragged to Ted Williams about how much scotch he could handle. After retirement: bankruptcy, failed businesses, coaching women's baseball. Died at 59 after choking while eating — alcohol a contributing factor.",
    era_adaptability: "VERY HIGH. Foxx's power and athleticism translate to any era. A 6'0\" right-handed slugger with .325 avg, 534 HR, and the ability to play multiple positions would be a universal star. Modern training might have saved him from the physical decline that cut his career short.",
    clubhouse_impact: "MAXIMUM. Everyone loved Jimmie Foxx. Teammates, opponents, even umpires. Ted Williams worshipped him. His daughter Nanci said he treated everyone with equal warmth. He coached the Fort Wayne Daisies (women's baseball) in 1952 and 'treated the girls as players and as women.' His clubhouse impact was pure sunshine — which made the alcoholism all the more tragic.",
    dark_side: "The slow destruction. Foxx's career declined prematurely due to alcoholism and chronic sinus problems from a beaning. He went from 534 HR and 3 MVPs to bankruptcy, failed ventures, and obscurity. DiMaggio told him: 'You made only one mistake, Jimmie' — retiring one year too early to qualify for the pension. He died at 59, choking on food in his brother's home. Baseball's most underrated player — and its gentlest tragedy.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Beast", desc: "+2 POW innate. Cut sleeves, bulging muscles, legendary power. Gomez: 'He has muscles in his hair.' The most feared right-handed hitter alive." },
    { tag: "Double X", desc: "+1 to all offensive stats when hitting in the 4-hole. Foxx was the prototypical cleanup hitter — 13 straight years of 100+ RBI." },
    { tag: "The Gentle Beast", desc: "+2 team chemistry. Everyone loved Foxx. His kindness created a warm clubhouse. Ted Williams cried remembering him." },
    { tag: "A's Dynasty", desc: "Synergy with Simmons, Grove, Cochrane. 3+ A's dynasty players = +1 POW for all." },
    { tag: "Farm Boy Strength", desc: "+1 durability until age 32. Built on Maryland farmwork. But after 32, durability drops sharply — the body gives out." },
    { tag: "The Bottle", desc: "After age 32, -1 all stats per season. Alcoholism eroded his gifts. The sinus pain that started it all never went away." },
    { tag: "Connie Mack's Last Star", desc: "When teammates are sold off around him, +1 POW (defiance) but -1 morale. He watched Simmons, Grove, and Cochrane get sold and kept hitting." },
    { tag: "Positional Versatility", desc: "Can play C, 1B, 3B, or LF without penalty. Even pitched (1.59 ERA). The ultimate utility superstar." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Batting Cages / Practice Field", affinity: "HIGH", note: "Natural talent, but he showed up. Cut his sleeves and hit bombs." },
    { location: "Bar / Nightlife", affinity: "HIGH", note: "The dangerous one. Scotch whiskey, tavern crawls. The source of his decline." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "Beloved by everyone. The warmest presence in any room." },
    { location: "Restaurant / Steakhouse", affinity: "HIGH", note: "Social, generous. Bought his parents a farm with his first big paycheck." },
    { location: "Community Events", affinity: "MEDIUM", note: "Kind to fans but not a natural showman. Undersold himself his entire career." },
    { location: "Hotel / Rest", affinity: "MEDIUM", note: "Lived in a Boston hotel after his divorce. Lonely but sociable." },
    { location: "Gambling Hall", affinity: "LOW", note: "Some association with poor financial decisions but not a gambler per se." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "World Series / October baseball — .344 in 3 Fall Classics",
      "Playing alongside elite teammates (Simmons, Grove, Cochrane, Williams)",
      "Chasing records — 58 HR in 1932, Triple Crown in 1933",
      "Hot months: May, June, September 1938 — 10+ HR each month",
      "Friendly ballparks (35 of 50 HR at Fenway in 1938)",
    ],
    cold_triggers: [
      "Alcoholism and sinus problems — chronic after the beaning",
      "Teammates being sold off — watched the A's dynasty dismantled around him",
      "Contract disputes (1935-36 holdout with Mack)",
      "Health problems — flu, vision issues, physical decline after age 32",
      "Post-career isolation and bankruptcy",
    ],
    pressure_response: "HIGH. Foxx performed well in high-leverage situations — .344 in World Series, game-winning HR in 1930 WS Game 5, Triple Crown in 1933. But unlike Greenberg's moral pressure or Simmons's fury, Foxx's pressure response was more joyful. He hit because he loved hitting. The Beast was happy at the plate.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "Muscles in His Hair",
      type: "Game Action",
      text: "Your slugger cuts his sleeves before the game. Opposing pitcher sees the biceps and loses confidence. +2 POW for this game. If he homers, the ball 'leaves the solar system.'",
      origin: "Ted Lyons: 'He had great powerful arms, and he used to wear his sleeves cut off way up, and when he dug in and raised that bat, his muscles would bulge and ripple.'",
    },
    {
      title: "The Moon Shot",
      type: "Game Action",
      text: "Your (+10 or higher) slugger hits a home run so far that it becomes legendary. +3 fan appeal. The story gets told for decades.",
      origin: "Gomez: 'When Neil Armstrong set foot on the moon, he found a baseball that Jimmie Foxx hit off me in 1937.' Foxx hit into Yankee Stadium's third deck — a near-impossible feat.",
    },
    {
      title: "Sixty Lost to Rain",
      type: "Drama",
      text: "Your slugger hits 58 HR but 2 are washed away in rainouts. He finishes at 58 instead of 60. The record stands untouched. History forgets him while remembering the record-holder.",
      origin: "1932: Foxx actually hit 60 HR, but 2 were in rained-out games. He finished at 58 — Ruth's 60 survived. Baseball's most underrated player was denied by weather.",
    },
    {
      title: "The Fire Sale",
      type: "Drama",
      text: "Your team's owner, broke from the Depression, sells your star players one by one. Your remaining superstar watches helplessly. He gains +1 POW (defiance) but team chemistry collapses.",
      origin: "Connie Mack sold Simmons, Grove, and Cochrane after the dynasty years. Only Foxx remained — putting up 3 more great seasons while the team crumbled around him.",
    },
    {
      title: "The Peach of a Guy",
      type: "Action",
      text: "Your kindest veteran mentors a young rookie. The rookie gains +2 to his best stat for the season. Years later, the rookie weeps remembering him.",
      origin: "Ted Williams on Foxx: 'He was a real peach of a guy.' Williams became teary-eyed and emotional decades later recalling his former teammate and mentor.",
    },
    {
      title: "The Triple Crown",
      type: "Game Action",
      text: "Your slugger leads the league in BA, HR, and RBI simultaneously. +3 OVR for the season. He becomes the first player at his position to achieve this in your league.",
      origin: "1933: Foxx won the AL Triple Crown (.356/48/163) — the first AL player to win MVP during a Triple Crown. He was the 9th player overall to achieve the feat.",
    },
    {
      title: "One Year Too Early",
      type: "Drama",
      text: "Your aging veteran retires one season before a new pension program begins. He dies broke. A rival player tells him: 'You made only one mistake.'",
      origin: "Foxx retired in 1945, one year before MLB's pension program began. DiMaggio: 'You made only one mistake, Jimmie.' Foxx filed for bankruptcy and died at 59.",
    },
    {
      title: "The Schoolboy Phenom",
      type: "Drama",
      text: "A 16-year-old signs a pro contract and debuts at 17. He gets 6 hits in his first 9 at-bats. He's blocked at his natural position by a Hall of Famer, so he learns a new one.",
      origin: "Foxx signed at 16, debuted at 17 (6-for-9). Blocked at catcher by Mickey Cochrane, he moved to 1B and became one of the greatest hitters in history.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Broad, open, friendly face with a hint of country-boy warmth. 6'0\" 195 lbs — compact but incredibly muscular. Famous cut sleeves revealing enormous biceps. The face of a man everyone loved — not menacing, just powerful. Like a friendly bear who happens to be the strongest creature in the forest.",
    attire: "Philadelphia Athletics 1932 home whites. Classic baggy wool flannel with sleeves visibly shortened/rolled up to show the arms. Cap slightly tilted. The iconic white elephant insignia area. No number (pre-number era for A's).",
    mood: "Joy and power. The follow-through of a massive right-handed swing — the bat has already sent the ball into orbit. Or the stance: compact, coiled, biceps flexed. But the face is smiling. The Beast was happy.",
    style: "Warm golden tones, brighter than Greenberg's somber bronze. Shibe Park in the background, early 1930s Depression-era crowd. The card should feel like raw, elemental power combined with genuine human warmth. More accessible than the other Crashers legends — this is the card you want to be friends with.",
    reference: "Think 1933 Goudey card power rendered in ILB sepia style. The card with the biggest biceps and the biggest heart in the set. Baseball's most lovable monster.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [ { range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 } ], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [ { range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 } ], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [ { range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 } ], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [ { range: "No Gold Glove", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 } ] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [ { range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" } ] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [ { range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 } ], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);
const ChemTag = ({ tag }) => ( <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div> );
const Section = ({ title, children }) => ( <div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div> );

export default function JimmieFoxxCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = FOXX_DATA;
  const s = d.ilb_stats;
  const tabs = [ { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" }, { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" }, { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" } ];

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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Cut sleeves, massive RH swing, A's whites, Shibe Park, joyful power]</div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.warmRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[ { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs }, { label: "RBI", val: d.real_stats.rbi }, { label: "SB", val: d.real_stats.stolen_bases }, { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus }, { label: "WAR", val: d.real_stats.war }, { label: "HITS", val: d.real_stats.hits } ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS — {d.real_stats.games} GAMES</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏆 HOF 1951", "⭐ 9× All-Star", "🏅 3× AL MVP", "🏆 2× WS Champ", "👑 1933 Triple Crown", "💥 534 Career HR"].map((a, i) => (
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
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.darkBrown : "transparent", color: tab === t.id ? C.gold : C.medBrown, border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>
                <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
              </>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div>
                  <div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => ( <div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div> ))}</div>
                </Section>
                <Section title="Preferred Locations">
                  {d.preferred_locations.map((l, i) => ( <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div> ))}
                </Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div> ))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => ( <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div> ))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Foxx's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Foxx's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => ( <div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div> ))}
                </Section>
              </>)}
              {tab === "art" && ( <Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => ( <div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div> ))}</Section> )}
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
