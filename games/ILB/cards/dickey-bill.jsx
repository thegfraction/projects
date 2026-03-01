import { useState } from "react";

const DICKEY_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: BILL DICKEY
  // Year Snapshot: 1937 (Career-High Power Season)
  // ═══════════════════════════════════════════════════════════════
  
  name: "Bill Dickey",
  nickname: "The Man Nobody Knows",
  year: 1937,
  team: "New York Yankees",
  era: "1930s",
  ilb_team: "Crashers AL1930",
  position: "C",
  bats: "L",
  throws: "R",
  height: "6'1\"",
  weight: "185 lbs",
  born: "June 6, 1907 — Bastrop, LA (railroad worker's son, grew up in Arkansas)",
  died: "November 12, 1993 — Little Rock, AR (age 86, complications from stroke)",
  hof: "Class of 1954 (BBWAA, 80.2%). #8 retired by Yankees (shared with Yogi Berra). #57 Sporting News 100 Greatest. Monument Park plaque.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1937 PEAK SEASON
  // Source: Baseball-Reference, SABR BioProject
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1937,
    games: 140,
    at_bats: 530,
    hits: 176,
    doubles: 35,
    triples: 2,
    home_runs: 29,
    rbi: 133,
    stolen_bases: 3,
    batting_avg: ".332",
    obp: ".417",
    slg: ".570",
    ops: ".987",
    ops_plus: 150,
    war: 6.6,
    gold_gloves: 0,
    silver_sluggers: 0,
    all_star: 11,
    career_avg: ".313",
    career_hits: 1969,
    career_hr: 202,
    career_sb: 36,
    career_war: 56.3,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  // CON: .332 BA → tier 5 (.330+). OPS+ 150 → ≥130 bonus. Capped. CON 5.
  // POW: 29 HR → tier 2 (20-29). SLG .570 → ≥.500 bonus → +1. POW 3.
  // SPD: 3 SB → tier 0. Catcher, 6'1" — slow by design. SPD 0.
  // DEF: No Gold Gloves (pre-award). But: 13 straight 100+ game seasons (record). Led AL C in fielding 6×, putouts 5×, assists 3×. Zero passed balls in 1931. One-handed catching pioneer. Handled Gomez, Ruffing. Best defensive C of his era. DEF 3.
  // CLU: .255 WS BA in 38 games. But: .438 in 1932 WS, .400 in 1938 WS opener (4-for-4), GW HR in 1943 WS Game 5. 8 WS appearances, 7 rings. CLU 2.
  // OVR: CON(5)×2+POW(3)×1.5+SPD(0)×1+DEF(3)×0.5 = 10+4.5+0+1.5 = 16 → ~9 (Elite/MVP)
  // ═══════════════════════════════════════════════════════════════
  
  ilb_stats: {
    ovr: 9,      // Elite/MVP — greatest catcher of his era. 56.3 career WAR. HOF. 7 rings. 11 All-Stars.
    con: 5,      // .332 in 1937. .362 in 1936 (record for catchers for 73 years). Career .313. .300+ in 11 of first 12 full seasons. Only 289 K in 6,300 AB. Max contact.
    pow: 3,      // 29 HR in 1937. 202 career. SLG .570 earns bonus. 4 consecutive 20+ HR / 100+ RBI seasons (1936-39). Grand slams on consecutive days (Aug 3-4, 1937). Very strong for a catcher.
    spd: 0,      // 3 SB in 1937. 36 career. Catcher — never meant to run. SPD 0.
    def: 3,      // Maximum defense. 13 straight 100+ game seasons behind the plate (record). Led AL C in fielding % 6×, putouts 5×, assists 3×. Zero passed balls in 1931 (entire season). One-handed catching pioneer. Bob Feller: 'Bill Dickey is the best catcher I ever saw.' Handled Gomez and Ruffing to perfection. DEF 3.
    clu: 2,      // .438 in 1932 WS (7-for-16). 4-for-4 to open 1938 WS. Game-winning HR in 1943 WS Game 5. Played with broken hand in 1936 WS without telling anyone. 8 WS, 7 rings. CLU 2.
  },
  
  stat_justification: {
    con: ".332 in 1937, .362 in 1936 (highest catcher BA for 73 years until Joe Mauer in 2009). Career .313 over 17 seasons. .300+ in 11 seasons. Only 289 strikeouts in 6,300 at-bats — extraordinary contact rate. Miller Huggins: 'Choke up and drill the ball.' He did, for two decades.",
    pow: "29 HR in 1937 (career high). 202 career HR. 4 straight 20+ HR / 100+ RBI seasons (1936-39) — unprecedented for a catcher. Grand slams on consecutive days (Aug 3-4, 1937, tying Ruth's record). 3 HR in one game vs Browns (July 26, 1939). SLG .570 in 1937. Rating of 3.",
    spd: "3 SB in 1937. 36 career. He was a 6'1\" 185-lb catcher. Speed was irrelevant. Never played another position — pure catcher. Rating of 0.",
    def: "Maximum. 13 consecutive 100+ game seasons behind the plate (MLB record, later tied by Bench). Led AL catchers in fielding % 6×, putouts 5×, assists 3×. Zero passed balls in entire 1931 season. One-handed catching pioneer. Expert pitch-caller: 'always one pitch ahead of the batters' (Charlie Devens). Bob Feller: 'Bill Dickey is the best catcher I ever saw. I believe I could have won 35 games if Bill Dickey was my catcher.' Caught 46% of stolen base attempts in 1931. Rating of 3.",
    clu: ".438 in 1932 WS (7-for-16, 4 RBI). 4-for-4 to open 1938 WS. Drove in winning run in 1939 WS Game 1 (bottom 9th). Title-clinching HR in 1943 WS Game 5 vs Cardinals. Played 1936 WS with broken hand — didn't tell anyone. 8 WS appearances, 7 championships. Rating of 2.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Quiet Commander. Dickey was the Yankees' leader on the field — the manager behind the plate. Joe McCarthy used his pitchers as interchangeable parts, and Dickey handled them all. Seldom did a pitcher leave the Yankees and get better. His leadership was invisible: no speeches, no rah-rah. Just complete control of the game from behind the plate. The counterweight to Ruth's bombast, the mirror of Gehrig's quiet professionalism.",
    temperament: "Still waters, deep currents. Called 'The Man Nobody Knows' because he was so quiet and reserved. But that calm exterior masked a fierce competitor. On July 4, 1932, he broke Carl Reynolds' jaw with one punch after a home plate collision — 30-day suspension, $1,000 fine. 'His quiet demeanor belied his fiery approach.' The lesson: don't confuse silence with softness.",
    work_ethic: "Relentless consistency. 13 straight 100+ game seasons catching — a record. Miller Huggins told the young slugger-wannabe to choke up and drill the ball. Dickey obeyed, rebuilt his swing, and hit .313 for 17 years. He adapted rather than imposed. The catcher's mentality: serve the team, manage the game, endure.",
    lifestyle: "Reserved, private, dignified. Married Violet Ann Arnold in 1928 — one daughter. Lived in Arkansas after retirement. Worked at Stephens, Inc. (investment firm) with his brother George. Excellent quail hunter. No scandals, no drama. A gentleman in an era of colorful characters. Died at 86 after a stroke in 1989 left him homebound.",
    era_adaptability: "HIGH. Dickey's combination of .313 BA, 202 HR, and elite defense translates to any era. A left-handed hitting catcher with power who can also hit .330+ and call a game? That's a franchise player in 2025 as much as 1937. His lack of speed is irrelevant at catcher.",
    clubhouse_impact: "MAXIMUM — through mentorship. Dickey didn't just play; he created. He taught Yogi Berra to catch ('Bill Dickey is learning me all of his experiences'). He taught Elston Howard ('Without Bill, I'm nobody'). Joe Garagiola and Roy Campanella would listen in on his lessons. His legacy is a lineage of great Yankee catchers.",
    dark_side: "Forever overshadowed. Dickey played his entire career in the shadow of Ruth, Gehrig, and DiMaggio. After retirement, Berra immediately inherited his #8 and his reputation. The only Yankee with a retired number never featured on Yankeeography. He never led the league in a single offensive category — yet he was the most complete catcher alive. The Man Nobody Knows died as The Man Nobody Remembers.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS (Tags for the Chemistry Engine)
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Man Nobody Knows", desc: "Immune to media pressure and fan distraction. Dickey's quiet demeanor shields him — and his pitchers — from outside noise. +1 team stability." },
    { tag: "Pitch Caller Supreme", desc: "+2 to all pitchers' stats when Dickey is catching. He was 'always one pitch ahead of the batters.' Seldom did a pitcher leave the Yankees and improve." },
    { tag: "The One Punch", desc: "If an opponent deliberately collides with Dickey at home plate, 50% chance he breaks their jaw. -30 game suspension. But opposing runners think twice. +1 intimidation at home plate." },
    { tag: "Gehrig's Best Friend", desc: "+1 all stats when paired with a quiet, consistent teammate. Dickey and Gehrig were roommates, mirror images. Their bond was the soul of the dynasty." },
    { tag: "Iron Catcher", desc: "13 straight 100+ game seasons. Injury risk reduced by 50% per season. The most durable catcher in history." },
    { tag: "The Mentor", desc: "After retirement, +3 to any young catcher on the roster. Dickey taught Berra, Howard, and others. His coaching converts prospects into All-Stars." },
    { tag: "Yankee Dynasty", desc: "Synergy with Gehrig, DiMaggio, Gomez, Ruffing. 3+ Yankees = +1 all stats. The dynasty ran through Dickey's mitt." },
    { tag: "Always Overshadowed", desc: "-1 fan appeal. He'll never be the star, even when he's the best player in the lineup. The quiet ones don't sell papers." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS & BEHAVIORS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Behind Home Plate", affinity: "HIGH", note: "His domain. 13 straight years, 100+ games. Never played another position. Born for this." },
    { location: "Clubhouse / Locker Room", affinity: "HIGH", note: "The quiet center of gravity. Where he mentored young catchers and steadied pitchers." },
    { location: "Hunting / Outdoors", affinity: "HIGH", note: "Excellent quail hunter. Arkansas country. The outdoors suited his quiet nature." },
    { location: "Community Events", affinity: "MEDIUM", note: "Dignified but not flashy. Would show up, shake hands, leave quietly." },
    { location: "Restaurant / Steakhouse", affinity: "MEDIUM", note: "Private dinners with Gehrig. Not a nightlife man." },
    { location: "Bar / Nightlife", affinity: "LOW", note: "Not his scene. He was the counterweight to Ruth's excesses." },
    { location: "Spotlight / Media", affinity: "LOW", note: "The Man Nobody Knows. He avoided the spotlight his entire life." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "World Series / October — 8 appearances, 7 rings. Built for the biggest stage.",
      "Paired with elite pitching — Gomez, Ruffing, the Yankees staff. Dickey elevated everyone.",
      "Consecutive-day power: grand slams Aug 3-4, 1937; 3 HR in one game July 1939",
      "Stable environment — McCarthy's consistent management suited Dickey perfectly",
    ],
    cold_triggers: [
      "Losing Gehrig — the 1940 slump coincided with his best friend's illness and death",
      "Being provoked physically — the Reynolds punch cost him 30 games in 1932",
      "Managerial responsibilities — struggled as player-manager in 1946, resigned",
      "Aging — shoulder injury in 1942 broke his iron streak",
    ],
    pressure_response: "ELITE. Dickey was at his best in big games. Britannica: 'At his best in big games — he caught every inning of his 38 World Series games.' .438 in the 1932 Classic. 4-for-4 opener in 1938. Title-clinching HR in 1943. Played with a broken hand in the 1936 WS without telling anyone. The pressure response of a man who defines quiet competence.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The One Punch",
      type: "Game Action",
      text: "An opposing runner collides with your catcher at home plate. Your catcher breaks the runner's jaw with one punch. Result: 30-game suspension and $1,000 fine — but no one runs into your catcher again all season. +2 intimidation.",
      origin: "July 4, 1932: Carl Reynolds collided with Dickey at home plate. Dickey broke Reynolds' jaw with one punch. 30-day suspension, $1,000 fine. The message was received.",
    },
    {
      title: "The Broken Hand",
      type: "Game Action",
      text: "Your catcher plays the entire World Series with a broken bone in his hand. He doesn't tell anyone — not the manager, not the press, not the opposing team. -1 POW but +2 CLU and +2 team morale.",
      origin: "1936 WS: Dickey played with a broken bone in his hand. 'Bill didn't tell you he had a broken bone in his hand all during the Series. He kept it quiet because he didn't want Terry to know he wasn't the usual threat.'",
    },
    {
      title: "Back-to-Back Grand Slams",
      type: "Game Action",
      text: "Your slugger hits grand slams on consecutive days. +3 POW for the week. The baseball world briefly notices him before returning to his more famous teammates.",
      origin: "August 3-4, 1937: Dickey hit grand slams off John Whitehead and Vern Kennedy on consecutive days, tying a record set by Babe Ruth.",
    },
    {
      title: "Learning Me All His Experiences",
      type: "Action",
      text: "Your retired catcher mentors a young backup. The backup gains +3 DEF and becomes an All-Star within 2 seasons. The mentor's legacy outlives his own fame.",
      origin: "Yogi Berra: 'Bill Dickey is learning me all of his experiences.' Dickey transformed Berra from a raw hitter into a Hall of Fame catcher. Then did the same for Elston Howard.",
    },
    {
      title: "The Pride of the Yankees",
      type: "Drama",
      text: "Your catcher's best friend and roommate is diagnosed with a fatal illness. The catcher was the first to know. He plays himself in the movie about his friend's life. -2 morale for the season, but +1 leadership permanently.",
      origin: "Dickey was Gehrig's best friend and road roommate. He was the first Yankee to learn of Gehrig's ALS diagnosis. He played himself in 'The Pride of the Yankees' (1942).",
    },
    {
      title: "Stop Unbuttoning Your Shirt",
      type: "Drama",
      text: "Your young catcher tries to hit home runs like the team's slugger. The manager tells him to choke up and drill the ball. If he listens: +2 CON permanently. If he refuses: -1 CON, +1 POW (risky).",
      origin: "Huggins to young Dickey: 'Stop unbuttoning your shirt on every pitch. We pay one player here for hitting home runs and that's Babe Ruth. Choke up and drill the ball. That way, you'll be around here longer.'",
    },
    {
      title: "Ending the Streak",
      type: "Game Action",
      text: "An opposing pitcher has struck out 5 consecutive Hall of Famers. Your catcher steps up and singles to center, ending the streak. The crowd barely notices. +1 CON.",
      origin: "1934 All-Star Game: Carl Hubbell struck out Ruth, Gehrig, Foxx, Simmons, and Cronin consecutively. Dickey singled to end the streak. Quietly, of course.",
    },
    {
      title: "The Man Nobody Knows",
      type: "Drama",
      text: "Your best player has the lowest fan appeal on the team. He's overshadowed by flashier teammates in every era. He never leads the league in anything. He retires with 7 rings and a quiet legacy. -2 fan appeal, +2 team chemistry, +1 all stats.",
      origin: "Dickey never led the AL in a single offensive category. He played behind Ruth, Gehrig, DiMaggio. His #8 was retired — but shared with Berra. The only retired-number Yankee without a Yankeeography.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION NOTES
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Tall for a catcher (6'1\"), lean, angular face with an Ozark drawl and quiet eyes. Not imposing — contained. The face of a man who watches everything and says nothing. Left-handed batter's stance: compact, balanced, the choking-up grip Huggins taught him.",
    attire: "New York Yankees 1937 home pinstripes. Catcher's gear nearby or catching crouch. The iconic interlocking NY on the chest. Number 8 on the back. The most famous uniform in baseball, worn by its most invisible star.",
    mood: "Quiet authority. Not the swing — the crouch. The catcher's mask pushed up on the forehead, the mitt ready, the game being called from behind the plate. This card should feel like the engine room of a dynasty — the man who made everything work without anyone noticing.",
    style: "Muted, dignified tones — darker than the other Crashers cards. Less gold, more shadow. Yankee Stadium in the background, but from behind the plate, not from the batter's box. The card of the man who sees the whole game from the one position no one watches.",
    reference: "Think of the 1937 All-Star Game photo: Gehrig, Cronin, Dickey, DiMaggio, Gehringer, Foxx, Greenberg — seven legends in a row, and Dickey somehow the least remembered. That's this card.",
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

export default function BillDickeyCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = DICKEY_DATA;
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
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>[AI Portrait: Catcher's crouch, LH stance, Yankees pinstripes, quiet authority, Yankee Stadium]</div>
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
              {["🏆 HOF 1954", "⭐ 11× All-Star", "🏆 7× WS Champ", "🎯 #8 Retired", "💎 13yr Iron Streak", "📊 Career .313"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Dickey's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => ( <div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div> ))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>
                  {Object.entries(STAT_ENGINE).map(([key, data]) => ( <div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && ( <div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => ( <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div> ))}</div> )}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div> ))}
                </Section>
                <Section title="Dickey's Derivation">
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
