// /cards/players/lefty-odoul.jsx
import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: LEFTY O'DOUL
  // Year Snapshot: 1929 (NL Record 254 Hits, .398 BA)
  // ═══════════════════════════════════════════════════════════════

  name: "Lefty O'Doul",
  nickname: "The Man in the Green Suit",
  year: 1929,
  team: "Philadelphia Phillies",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "LF",
  bats: "L",
  throws: "L",
  height: '6\'0"',
  weight: "180 lbs",
  born: "March 4, 1897 — San Francisco, CA",
  died: "December 7, 1969 — San Francisco, CA (age 72)",
  hof: "NOT in Cooperstown. .349 career BA — highest for any eligible non-HOFer (exc. Shoeless Joe). Japanese Baseball HOF (2002, first American). Early Baseball Era Committee finalist 2022.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1929 SEASON
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1929,
    games: 154,
    at_bats: 638,
    hits: 254,
    doubles: 35,
    triples: 6,
    home_runs: 32,
    rbi: 122,
    runs: 152,
    stolen_bases: 2,
    strikeouts: 19,
    walks: 76,
    batting_avg: ".398",
    obp: ".465",
    slg: ".622",
    ops: "1.087",
    ops_plus: 161,
    war: 7.4,
    // Career totals
    career_avg: ".349",
    career_hits: 1140,
    career_hr: 113,
    career_rbi: 542,
    career_sb: 36,
    career_ops_plus: 143,
    career_war: 25.8,
    career_games: 970,
    // Also a pitcher early career
    pitching_record: "Won 25 games in PCL (1921). Failed MLB pitcher before converting to OF at age 26.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE
  //
  // CONTACT (CON): .398 BA → tier 5 (.330+). OPS+ 161 → ≥130 bonus. Already at cap. CON 5.
  // POWER (POW): 32 HR → tier 3 (30-39). SLG .622 → ≥.500 bonus → +1. POW 4.
  // SPEED (SPD): 2 SB in 1929 → tier 0 (0-5). No GG. SPD 0.
  // DEFENSE (DEF): No Gold Gloves. Career -1.1 defensive WAR. Famously bad fielder. DEF 0.
  // CLUTCH (CLU): Only 1 WS AB — 2-run pinch single in 1933 WS Game 2. Too small sample. CLU 1.
  // OVERALL: CON(5)×2 + POW(4)×1.5 + SPD(0)×1 + DEF(0)×0.5 = 10+6+0+0 = 16 → normalized ~9 (Elite/MVP)
  // NOTE: This is correct — O'Doul's 1929 was a genuinely elite/MVP-caliber season.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // Elite/MVP — one of the best offensive seasons in NL history
    con: 5,      // .398 BA. 254 hits (NL record). 19 strikeouts in 638 AB. Maximum contact.
    pow: 4,      // 32 HR, .622 SLG. Only DiMaggio matched <20 K with 30+ HR. Elite power + contact combo.
    spd: 0,      // 2 SB in 1929. No speed. Plodding outfielder.
    def: 0,      // Career -1.1 dWAR. Famous joke: "If he catches them, you know he's a phony."
    clu: 1,      // 1 WS AB — a 2-run pinch single. Tiny sample, but he delivered. CLU 1.
  },

  stat_justification: {
    con: "The .398 BA in 1929 is the closest anyone has come to .400 in the NL since Rogers Hornsby in 1924. His 254 hits STILL stand as the NL single-season record (tied by Bill Terry in 1930). He struck out only 19 times in 638 AB — less than 3% of his at-bats. Only Joe DiMaggio has matched fewer than 20 K with 30+ HR. Career .349 BA is 6th all-time. Ted Williams called him 'one of the greatest hitters ever' and said O'Doul was 'the first guy I ever asked for advice.' Rating of 5 (maximum).",
    pow: "32 HR in 1929 with a .622 SLG. Baker Bowl helped, but this was genuine power — he hit 113 career HR in only 3,264 AB. Career SLG .532 → ≥.500 bonus. At his peak, O'Doul combined elite contact with real power — a rare combination that puts him at 4. He's not a pure slugger like Ruth or Gehrig, but he's no slap hitter either.",
    spd: "2 SB in 1929. 36 career SB. He was a plodding left fielder by his peak years. In the PCL in 1927, he had a 30-30 season, so speed was there earlier — but by 1929, at age 32, it was gone. Rating of 0.",
    def: "Legendarily bad defender. Career -1.1 defensive WAR. John McGraw soured on him specifically because of his fielding. O'Doul's famous self-deprecating joke: someone forged his name on a bad check at a bar. O'Doul paid the tab and told the bartender: 'Next time it happens, take him out back and have somebody hit a few balls to him. If he catches them, you know he's a phony.' Rating of 0.",
    clu: "Tiny postseason sample. One WS at-bat in the 1933 World Series — he pinch-hit with the bases loaded in Game 2 and singled in two runs, giving the Giants the lead in a game they won 6-1. The Giants won the Series in 5. He delivered in his one chance, but one AB can't justify more than CLU 1.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Mayor. His Giants teammates nicknamed him 'The Mayor' because he seemed to have friends at every stop. O'Doul led through magnetism, warmth, and sheer force of personality. He was the guy who knew everyone — from presidents to bartenders, from Tokyo dignitaries to minor-league bus drivers. He turned down MLB managerial offers from the Yankees, Phillies, and Giants because he loved San Francisco too much to leave.",
    temperament: "Gregarious, curious, generous, endlessly social. 'I like people. People and cities,' he told the Brooklyn Daily Eagle. 'Some of the fellows get bored when it rains on the road, but I'm never at a loss for amusement. I go places — museums, theaters, zoos. I like to hang around the waterfronts watching the boats go out to sea.' A Revolutionary War buff who visited Paul Revere's house in Boston for fun. A citizen of the world who happened to be born in San Francisco.",
    work_ethic: "REINVENTION. O'Doul's career is the greatest reinvention story in baseball history. He was a failed MLB pitcher with a lame arm at age 26. Most men would have quit. Instead, he went to the PCL, taught himself to hit, and returned to the majors at 31 as one of the best hitters alive. He then became a legendary minor-league manager (2,094 wins), a hitting instructor who taught Ted Williams, Joe DiMaggio, Willie Mays, and Willie McCovey, and the father of Japanese baseball. The work ethic isn't flash — it's persistence across decades.",
    lifestyle: "San Francisco royalty. O'Doul was THE celebrity of the city for decades — restaurateur (Lefty O'Doul's on Geary Street, one of America's oldest sports bars), scratch golfer (played in the Bing Crosby Pro-Am, won twice), sharp dresser (always in green suits — hence 'The Man in the Green Suit'), and beloved public figure. He was a soft touch for anyone down on their luck: 'Why shouldn't I help the guy? He's in trouble.' He was superstitious: bean soup if he hit well, a Frankenstein practice bat called 'Miss Murphy' stitched together with nails and lead.",
    era_adaptability: "HIGH FOR OFFENSE, LOW FOR DEFENSE. O'Doul's bat would play in any era — .349/.413/.532 with 143 OPS+ and only 122 career strikeouts in 3,264 AB is absurdly elite contact. But his defense would be a severe liability in modern baseball. He'd be a DH in today's game, or a platoon LF on a team that can hide his glove. His real legacy — teaching hitting and spreading baseball internationally — transcends any era.",
    clubhouse_impact: "THE CONNECTOR. O'Doul didn't just play baseball — he connected people to baseball. He taught Ted Williams to hit. He mentored all three DiMaggio brothers. He taught Willie Mays and Willie McCovey. He introduced baseball to Japan and was greeted by a million people on the streets of Tokyo in 1949. General Douglas MacArthur personally asked O'Doul to bring baseball to postwar Japan as a tool of reconciliation. No other player in history has had a comparable impact on the global spread of the game.",
    dark_side: "The HOF Snub. Despite a .349 career BA (6th all-time), two batting titles, an NL hits record, revolutionizing baseball in Japan, mentoring a generation of Hall of Famers, and being elected to the Japanese HOF, O'Doul has never been inducted into Cooperstown. The reason: only 970 career games. His peak was too short (age 31-37 in the majors). In ILB terms: O'Doul carries a 'Short Peak' trait — he burns white-hot for 5-6 seasons, then his effectiveness drops sharply. You're renting, not buying.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Mayor", desc: "Friends at every stop. +1 chemistry with ALL teammates and +1 in every city. Immune to road penalties." },
    { tag: "Reinvention", desc: "Failed pitcher turned elite hitter. O'Doul can change positions mid-career. If he fails at one role, he can retrain for another with no penalty." },
    { tag: "Man in the Green Suit", desc: "Always wears green. Superstitious about bean soup and his Frankenstein bat 'Miss Murphy.' +1 when superstitions are honored, -1 if disrupted." },
    { tag: "Father of Japanese Baseball", desc: "Introduced baseball to Japan. +2 international reputation. Unlocks Japanese player pipeline for your franchise." },
    { tag: "The Hitting Teacher", desc: "Mentored Williams, DiMaggio, Mays, McCovey. +1 CON to any young hitter on the roster. O'Doul's teaching method: the rope drill." },
    { tag: "Baker Bowl Baby", desc: "Feasted in the NL's smallest park. +1 POW in small parks. -1 POW in cavernous parks (Forbes Field, Polo Grounds)." },
    { tag: "Short Peak", desc: "O'Doul didn't reach the majors as a hitter until 31. His elite window is 5-6 seasons. After that, rapid decline." },
    { tag: "Scratch Golfer", desc: "Played in the Bing Crosby Pro-Am, won twice. +1 offseason conditioning. Never misses spring training." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "His Restaurant / Bar", affinity: "HIGH", note: "Founded Lefty O'Doul's on Geary Street. One of America's oldest sports bars. His home base." },
    { location: "San Francisco Waterfront", affinity: "HIGH", note: "'I like to hang around the waterfronts watching the boats go out to sea.'" },
    { location: "Museums / Zoos / Theaters", affinity: "HIGH", note: "Loved the Met, the Bronx Zoo, Paul Revere's house. A genuine intellectual curiosity." },
    { location: "Golf Course", affinity: "HIGH", note: "Scratch golfer. Played nearly every day. Insisted on a daily round clause in his managerial contract." },
    { location: "Tokyo / Japan", affinity: "HIGH", note: "Greeted by a million people on Tokyo streets in 1949. Beloved figure. First American in Japanese HOF." },
    { location: "Batting Cage / Practice Field", affinity: "HIGH", note: "The greatest hitting teacher in baseball history. His students: Williams, DiMaggio, Mays, McCovey." },
    { location: "Defensive Position", affinity: "LOW", note: "Famously terrible fielder. 'If he catches them, you know he's a phony.'" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Playing in small ballparks — Baker Bowl turned him into a monster (.398/.465/.622 in 1929)",
      "Bean soup and Miss Murphy — when superstitions are intact, he's locked in",
      "Surrounded by great hitters — thrived alongside Chuck Klein (1929-30) and the Waners",
      "Teaching moments — O'Doul hit better when mentoring young teammates",
    ],
    cold_triggers: [
      "Cavernous outfields — his power diminished in big parks",
      "Defensive demands — any game where his fielding is exposed can spiral",
      "Aging legs — rapid decline after age 35, from .368 BA (1932) to .284 (1933)",
      "Being traded / disrupted — the 1933 trade from Brooklyn to Giants shook him temporarily",
    ],
    pressure_response: "UNKNOWN / LIMITED SAMPLE. O'Doul had exactly one World Series at-bat in his entire career — and he delivered a clutch 2-run single with the bases loaded in the 1933 WS. But one AB is not a body of evidence. In ILB: O'Doul is rated CLU 1 — he'll probably deliver in a big spot, but there's not enough data to be confident. His real value is in the regular season, where he was a .398 machine.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Failed Pitcher",
      type: "Drama",
      text: "Your young pitcher's arm gives out at age 26. His career appears over. But if you option him to the minors as a position player, there's a 30% chance he reinvents himself as an elite hitter and returns 4 years later with CON 5. If you release him, your rival gets a future batting champion.",
      origin: "O'Doul was a failed MLB pitcher (lame arm, age 26) who reinvented himself as a PCL outfielder. He returned to the majors at 31 and set the NL hits record. The greatest reinvention in baseball history.",
    },
    {
      title: "254 Hits",
      type: "Game Action",
      text: "Your hitter breaks the league's single-season hits record. +3 reputation, MVP consideration. But the team still finishes last — the Phillies were 71-82 in 1929 despite O'Doul's .398. Individual greatness doesn't guarantee team success.",
      origin: "O'Doul's 254 hits in 1929 broke Rogers Hornsby's NL record and STILL stand as the NL single-season mark. The Phillies finished 5th. He lost MVP to Hornsby.",
    },
    {
      title: "The Father of Japanese Baseball",
      type: "Action",
      text: "After the war, a general asks your retired player to bring baseball to a former enemy nation. If he accepts, he becomes an international icon (+5 legacy) and opens a pipeline of foreign talent for your franchise. He is greeted by a million people in the streets.",
      origin: "General MacArthur personally asked O'Doul to bring baseball to postwar Japan in 1949. O'Doul's Seals toured Japan; nearly a million people greeted him in Tokyo. American and Japanese flags flew side by side for the first time since WWII.",
    },
    {
      title: "The Rope Drill",
      type: "Action",
      text: "Your hitting coach ties a rope around a young hitter's waist during batting practice. Every time the kid lunges, the coach yanks him into the dirt. After 2 weeks, the hitter gains +1 CON permanently (learns not to lunge).",
      origin: "O'Doul's famous teaching method. He used it on Dom DiMaggio and countless others. He'd show the hitter film of Joe DiMaggio's swing to prove the technique worked.",
    },
    {
      title: "If He Catches Them, He's a Phony",
      type: "Drama",
      text: "Someone forges your player's name on a bar tab. Your player, unfazed, pays the bill and tells the bartender how to identify the fake: 'Have somebody hit a few balls to him. If he catches them, you know he's a phony.' +2 humor/popularity. But -1 defensive reputation.",
      origin: "O'Doul's legendary self-deprecating joke about his terrible defense. He knew he couldn't field and embraced it with charm.",
    },
    {
      title: "Miss Murphy",
      type: "Action",
      text: "Your hitter's favorite bat cracks in half. Instead of discarding it, he hammers it together with nails and fills the holes with lead. The Frankenstein bat becomes a team talisman. +1 team morale as long as 'Miss Murphy' is in the dugout. If the bat is lost or destroyed, -2 morale.",
      origin: "O'Doul stitched together a broken bat with nails and lead, named it 'Miss Murphy' (after a hefty Dodgers fan), and used it as a warmup bat for years. The Giants kept it in the dugout long after he left.",
    },
    {
      title: "19 Strikeouts",
      type: "Game Action",
      text: "Your hitter goes an entire season with fewer than 20 strikeouts while hitting 30+ home runs. This has only been done twice in MLB history. +2 to CON for the season. Opposing pitchers are demoralized — they can't miss his bat.",
      origin: "In 1929, O'Doul struck out only 19 times while hitting 32 home runs. Only Joe DiMaggio has matched fewer than 20 K with 30+ HR.",
    },
    {
      title: "The Man in the Green Suit",
      type: "Drama",
      text: "Your player always wears a green suit. He becomes a city celebrity — restaurants, bridges, and parks are named after him. +3 popularity in his home city. But if he ever leaves, the city grieves and his replacement faces -2 fan hostility.",
      origin: "O'Doul was famous for his green suits and became the defining celebrity of San Francisco for decades. A bridge, a restaurant, and a ballpark gate all bear his name.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Handsome Irish-American with a warm, open face. 6'0\" 180 lbs — lean and athletic, not bulky. Age 32 in 1929, in his late-blooming prime. A wide, genuine smile — this is the most likable man in baseball. Bright, curious eyes. The face of a man who's friends with everyone in the room.",
    attire: "Philadelphia Phillies 1929 home whites. Classic baggy wool flannel. Bat on shoulder, left-handed batting stance — that smooth, effortless swing that made Ted Williams say 'Geez, does that guy look good!' The green suit could be suggested subtly — maybe a green pocket square or a hint of green in the portrait's color palette.",
    mood: "Joyful confidence. O'Doul radiates warmth and pleasure. He's a man who loves every aspect of what he does — hitting, people, cities, life. Not fierce, not intense — happy. The look of a guy who's about to buy you a drink and tell you a story. The most charming man in any room.",
    style: "Warm golden tones with a hint of San Francisco fog. Baker Bowl's tiny right field in the background, or perhaps the San Francisco waterfront. The card should feel cosmopolitan and warm — O'Doul was 'a citizen of the world at large.' Slightly more colorful than the sepia-heavy cards for other players.",
    reference: "The Natural is partly based on O'Doul (Roy Hobbs). The card should evoke that mythic quality — the failed pitcher who reinvented himself as a hitting god at 31. But unlike Hobbs, O'Doul was real, and his smile was genuine. Think less tragedy, more joy.",
  },
};

// Stat Engine (Hitter)
const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 }, { range: ".250-.269", value: 2 }, { range: ".270-.299", value: 3 }, { range: ".300-.329", value: 4 }, { range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 }, { range: "10-19 HR", value: 1 }, { range: "20-29 HR", value: 2 }, { range: "30-39 HR", value: 3 }, { range: "40-49 HR", value: 4 }, { range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 }, { range: "6-15 SB", value: 1 }, { range: "16-30 SB", value: 2 }, { range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove / bad fielder", value: 0 }, { range: "1-2 GG", value: 1 }, { range: "3-5 GG", value: 2 }, { range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" }, { range: "5-6", label: "Solid Starter" }, { range: "7-8", label: "All-Star" }, { range: "9-10", label: "Elite / MVP" }, { range: "11-12", label: "Legend" }, { range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 }, { range: "PS BA .250-.299", value: 1 }, { range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = {
  parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c",
  warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14",
  hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59",
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

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export default function LeftyODoulCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" }, { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" }, { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" }, { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Bashers Era</div>
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Smiling, LH batting stance, Phillies whites, Baker Bowl, golden warmth]</div>
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
              {[
                { label: "AVG", val: d.real_stats.batting_avg }, { label: "HR", val: d.real_stats.home_runs },
                { label: "RBI", val: d.real_stats.rbi }, { label: "HITS", val: d.real_stats.hits },
                { label: "OPS", val: d.real_stats.ops }, { label: "OPS+", val: d.real_stats.ops_plus },
                { label: "WAR", val: d.real_stats.war }, { label: "K", val: d.real_stats.strikeouts },
              ].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON — {d.real_stats.games} GAMES • NL BATTING CHAMP</div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏅 2× NL Batting Champ", "📊 254 Hits (NL Record)", "🇯🇵 Japanese HOF (2002)", "🏆 1933 WS Champ", "⭐ 1× All-Star", "🎯 .349 Career BA (6th)", "👨‍🏫 Taught Williams/DiMaggio", "🟢 Man in the Green Suit"].map((a, i) => (
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
              {tab === "personality" && (
                <>
                  <Section title="Leadership"><p style={{ margin: 0 }}>{d.personality.leadership_style}</p></Section>
                  <Section title="Temperament"><p style={{ margin: 0 }}>{d.personality.temperament}</p></Section>
                  <Section title="Work Ethic"><p style={{ margin: 0 }}>{d.personality.work_ethic}</p></Section>
                  <Section title="Lifestyle"><p style={{ margin: 0 }}>{d.personality.lifestyle}</p></Section>
                  <Section title="Era Adaptability"><p style={{ margin: 0 }}>{d.personality.era_adaptability}</p></Section>
                  <Section title="Clubhouse Impact"><p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p></Section>
                  <Section title="⚠ Hidden Complexity"><p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p></Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ display: "inline-flex", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{t.tag}</div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {d.chemistry_traits.map((t, i) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span>{" "}
                          <span style={{ color: C.medBrown }}>{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section title="Preferred Locations">
                    {d.preferred_locations.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.warmRed}20`, color: l.affinity === "HIGH" ? C.traitGreen : C.warmRed, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span>
                        <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                  <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                  <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
                </>
              )}

              {tab === "actions" && (
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Events from O'Doul's real life, universalized as playable cards.</p>
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
              )}

              {tab === "engine" && (
                <>
                  <Section title="Stat Conversion Engine">
                    {Object.entries(STAT_ENGINE).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>
                        {data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="O'Doul's Derivation">
                    {Object.entries(d.stat_justification).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span>{" "}
                        <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "art" && (
                <Section title="Visual Art Direction">
                  {Object.entries(d.art_direction).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span>{" "}
                      <span style={{ color: C.medBrown }}>{val}</span>
                    </div>
                  ))}
                </Section>
              )}
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
{JSON.stringify({
  name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team,
  stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
