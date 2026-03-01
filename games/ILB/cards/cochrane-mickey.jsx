// /cards/players/mickey-cochrane.jsx
import { useState } from "react";

const COCHRANE_DATA = {
  name: "Mickey Cochrane",
  nickname: "Black Mike",
  year: 1930,
  team: "Philadelphia Athletics",
  era: "1920s",
  ilb_team: "Bashers AL1920",
  position: "C",
  bats: "L",
  throws: "R",
  height: '5\'10"',
  weight: "180 lbs",
  born: "April 6, 1903 — Bridgewater, Massachusetts",
  died: "June 28, 1962 — Lake Forest, Illinois (age 59)",
  hof: "Inducted 1947. .320 career BA and .419 career OBP — both highest ever for a catcher. 2× AL MVP (1928, 1934). 5 pennants, 3 WS titles. Bill James ranked him 4th greatest catcher all-time. Lefty Grove: 'Greatest catcher of them all.' First catcher to win MVP. Only catcher with two career cycles.",

  real_stats: {
    season: 1930,
    games: 130,
    at_bats: 487,
    hits: 174,
    doubles: 42,
    triples: 5,
    home_runs: 10,
    rbi: 85,
    stolen_bases: 5,
    batting_avg: ".357",
    obp: ".432",
    slg: ".511",
    ops: ".943",
    runs_scored: 110,
    walks: 55,
    strikeouts: 16,
    war: 6.5,
    career_avg: ".320",
    career_hits: 1652,
    career_hr: 119,
    career_rbi: 830,
    career_runs: 1041,
    career_obp: ".419",
    career_slg: ".478",
    career_ops: ".897",
    career_war: 51.3,
    pennants: 5,
    ws_titles: 3,
    mvp_awards: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION — 1930 SEASON (peak year, A's dynasty)
  //
  // CON: .357 BA → tier 5 (.330+). 174 H. .432 OBP. Career .320/.419 — highest OBP ever for a catcher. CON = 5 (MAXIMUM).
  // POW: 10 HR → tier 1 (10-19). .511 SLG → bonus +1. Career 119 HR. Not a power hitter — a contact machine. POW = 2.
  // SPD: 5 SB. Fast for a catcher (Mack batted him leadoff at times). But 5 SB = tier 0. SPD = 1 (catcher speed bonus — genuinely fast for position).
  // DEF: Led AL catchers 6× in putouts, 2× in DP/assists/FP. Caught 110+ games for 11 straight years. Lefty Grove: "Greatest catcher of them all." Elite defensive catcher + game management. DEF = 2.
  // CLU: 5 pennants, 3 WS titles. .293 career WS BA. But: blamed for 1931 WS loss (Pepper Martin's SBs). Hospitalized during 1934 WS. Mixed October legacy. CLU = 2.
  // OVR: CON×2(10) + POW×1.5(3) + SPD×1(1) + DEF×0.5(1) = 15 → normalized ~9
  // OVR = 9 (ELITE / MVP) — the greatest hitting catcher of the pre-war era.
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 9,      // ELITE / MVP. Cochrane is the highest-rated catcher in ILB's first two eras. His .320/.419 career line is the best ever for a catcher. He won 2 MVPs, led 5 pennant winners, and was the heartbeat of two dynasties — Mack's A's and the Tigers. He was also a player-manager, a five-sport college athlete, and a man whose competitive fire was so intense it was nicknamed "Black Mike." OVR 9 reflects a catcher who could hit like an outfielder, lead like a general, and catch like a wall.
    con: 5,      // MAXIMUM. .357 in 1930. .331 as a rookie. Career .320. .419 career OBP — the highest in baseball history for a catcher. 1,652 career hits. Only catcher to hit for the cycle twice. First catcher with 100+ R and 100+ RBI in the same season (1932: 118 R, 112 RBI). He was a hitter who happened to catch, and he caught better than anyone. Rating of 5.
    pow: 2,      // 10 HR in 1930. Career 119 HR. .511 SLG (1930), .478 career. Not a power hitter in the Ruth/Gehrig sense. He hit 23 HR in 1932 (career high) and consistently hit 10-15 HR — respectable for a catcher, but his value was contact, OBP, and leadership, not power. SLG bonus (+1) from .511 → POW = 2.
    spd: 1,      // 5 SB in 1930. Career high not much more. BUT: Connie Mack batted him leadoff at times because he was fast for a catcher. He was a five-sport college athlete — genuinely athletic. He stole bases selectively. For a catcher, SPD 1 reflects real athleticism. Rating of 1.
    def: 2,      // ELITE for a catcher. Led AL catchers 6× in putouts, 2× in assists, DP, and fielding percentage. Caught 110+ games for 11 straight years. Pioneered one-hand catching style. Lefty Grove: "Greatest catcher of them all... like he was reading my mind." Helped two pitchers achieve 16-game winning streaks (AL record). His pitch-calling and game management were legendary. But we must note: the 1931 WS, where Pepper Martin stole 8 bases. The blame was unfair — pitchers were careless with runners — but it happened. DEF = 2.
    clu: 2,      // 5 pennants. 3 WS titles (1929, 1930, 1935). .293 career WS BA — solid but not spectacular. BUT: blamed for 1931 WS loss (Pepper Martin's stolen bases dogged him for life). Hospitalized during 1934 WS after Game 6. The 1935 WS win — Detroit's first ever — is his crowning moment. His October record is strong but haunted. CLU = 2.
  },

  stat_justification: {
    con: ".357 in 1930. .349 in 1931. .331 as a 22-year-old rookie. Career .320 — the highest career batting average for any catcher in baseball history. Career .419 OBP — also the highest ever for a catcher. 1,652 career hits in just 13 seasons (career shortened by beaning). Only catcher to hit for the cycle twice (1932, 1933). First catcher with 100+ runs AND 100+ RBI in the same season (1932). He struck out only 16 times in 487 AB in 1930. At the plate, Cochrane was not just good for a catcher — he was one of the best hitters in baseball, period. Rating of 5 — MAXIMUM.",
    pow: "10 HR in 1930. Career high 23 HR (1932). Career 119 HR. .511 SLG in 1930, .478 career. The power was respectable for a catcher but modest by era standards. He hit 42 doubles in 1930 — gap power more than fence-clearing power. He wasn't Ruth or Gehrig or even Foxx (his own teammate). His value was contact and OBP, not launch angle. SLG bonus pushes from tier 1 to tier 2. Rating of 2.",
    spd: "5 SB in 1930. Not a prolific base-stealer by the numbers. But Connie Mack sometimes batted him leadoff, which tells you everything about his speed for a catcher. He was a five-sport athlete at Boston University — football halfback, basketball player, boxer, track athlete. He held BU's 53-yard field goal record for over 60 years. The athleticism was real. For a catcher, SPD 1 is excellent. Rating of 1.",
    def: "Led AL catchers 6× in putouts, 2× in assists, double plays, and fielding percentage. Caught 110+ games for 11 straight seasons. Pioneered one-hand catching to protect his throwing hand. Lefty Grove on Cochrane: 'Hardly ever shook him off. I'd look up and there'd be Mickey's signal, just what I was thinking. Like he was reading my mind.' Assisted two pitchers to 16-game winning streaks (AL record). His game management was considered the best in baseball. The asterisk: 1931 WS, Pepper Martin stole 8 bases. Cochrane was unfairly blamed — the pitchers were careless — but the perception stuck. DEF = 2.",
    clu: "5 pennants (A's 1929-31, Tigers 1934-35). 3 WS titles (1929, 1930, 1935). .293 career WS BA. The 1929 WS: A's trailed 8-0 in Game 4 and scored 10 runs in the 7th inning — the greatest comeback in WS history at that time. The 1935 WS: Detroit's first championship ever, led by player-manager Cochrane. But the shadows: blamed for the 1931 WS loss (Pepper Martin's SB rampage). Hospitalized after Game 6 of the 1934 WS when the Cardinals rallied — Cochrane's 'Black Mike' darkness consumed him. His October is brilliant but cracked. Rating of 2.",
  },

  personality: {
    leadership_style: "COMBUSTIBLE BRILLIANCE. Cochrane was the rarest kind of leader — one whose fury, properly channeled, elevated everyone around him, and whose fury, improperly channeled, consumed himself. He could ignite a comeback with obscenities in the dugout. He could read a pitcher's mind through a mask. His childhood dream was to be a manager, and he achieved it at 31 as player-manager of the Tigers. 'He showed us how to win,' said Hank Greenberg. Connie Mack: 'Mickey was the most important reason for our success... Mickey had a way of encouraging his teammates and soothing tensions.' He led five pennant winners in seven years during the Ruth/Gehrig Yankees era.",
    temperament: "Volcanic. The nickname 'Black Mike' referred to his dark moods and explosive anger. He was fiercely competitive — too fiercely. He couldn't handle failure. After the 1931 WS loss, he internalized the blame for Pepper Martin's stolen bases and it ate at him for years. After Game 6 of the 1934 WS, when the Cardinals rallied, he was hospitalized. In 1936, given the dual role of GM and manager, he suffered a nervous breakdown. The fire that made him great also burned him from the inside.",
    work_ethic: "RELENTLESS. Five-sport athlete at Boston University — he was captain of the football team and held the school's field goal record for six decades. He chose baseball over football and basketball only because there was no established pro football league. He didn't even LIKE catching — he preferred the outfield — but the only roster spot available was behind the plate. He learned to catch from Cy Perkins and became the best in baseball at a position he didn't originally want.",
    lifestyle: "Complex and ultimately tragic. Cochrane lost money in bank failures during the Depression. He was hospitalized multiple times for emotional breakdowns. His playing career ended at 34 when a Bump Hadley fastball fractured his skull — he was unconscious for 10 days. He lost his only son Gordon in WWII on the boy's first day of combat. 'Mickey was never the same after Gordon's death,' said teammate Elden Auker. After baseball, he ran a dude ranch in Wyoming, worked for a trucking company, and died of a respiratory ailment at 59.",
    era_adaptability: "EXCEPTIONAL. Cochrane's .320/.419 line behind the plate would be elite in any era. Modern advanced metrics love catchers who can hit — Cochrane was the prototype. His pitch-calling and game management would translate perfectly. With modern equipment (the batting helmet he never had), his career lasts another 5-7 years. He is the template for the modern offensive catcher — Piazza, Mauer, and every catcher who hits .300 owes a debt to Black Mike.",
    clubhouse_impact: "TRANSFORMATIVE. Never played on a team that finished lower than third. Led 5 pennant winners. The A's were good before Cochrane — they became champions with him. The Tigers were mediocre — he made them champions immediately. His impact was quantifiable: teams he joined won. Teams he left declined. In ILB: Cochrane provides +2 to team discipline and +1 to all pitchers' stats — his pitch-calling elevates everyone.",
    dark_side: "The darkness that gave him his name. 'Black Mike' wasn't just competitive fire — it was something closer to a compulsion, a need to win so intense that losing destroyed him physically and psychologically. The 1931 WS haunted him. The 1934 WS hospitalized him. The 1936 GM role broke him. The beaning ended his career. His son's death broke him permanently. Cochrane was a man who burned at temperatures that couldn't be sustained. He was 59 when he died — a man who was old at 40, broken at 50, and gone before he should have been. In ILB: 'Black Mike's Darkness' — after every postseason loss, Cochrane suffers -2 to all stats for the following month. After two consecutive postseason failures, he is at risk of nervous breakdown — a d6 roll where 1-2 means he misses the next month entirely. The fire gives, and the fire takes.",
  },

  chemistry_traits: [
    { tag: "Black Mike", desc: "The fierce competitive fire. +2 to all teammates' stats in elimination games. But: after every postseason loss, Cochrane suffers -2 to all stats for 1 month. The fire gives and takes." },
    { tag: "The Catcher's Mind", desc: "Lefty Grove: 'Like he was reading my mind.' +1 to all pitchers' stats when Cochrane catches. He calls the game better than anyone in ILB." },
    { tag: "Five-Sport Athlete", desc: "Football, basketball, boxing, track, baseball at Boston University. +1 to athleticism in all non-baseball challenges (baserunning decisions, collision plays, throwing). The most athletic catcher in ILB." },
    { tag: "Pepper Martin's Ghost", desc: "1931 WS: 8 stolen bases against Cochrane's battery. Unfair blame. In ILB, opponent base-stealers get +1 vs Cochrane in the World Series — the ghost lingers." },
    { tag: "The Skull Fracture", desc: "MANDATORY EVENT. At a random point after age 30, d20 roll each season. On a 1: Cochrane is hit by a pitch — skull fracture, career over. Immediate retirement. No return. 'The X-rays looked like a road map.'" },
    { tag: "Player-Manager", desc: "Cochrane can manage AND play simultaneously. +1 to team strategy when he is in the lineup. But: dual role adds stress — if combined with GM duties, trigger nervous breakdown risk." },
    { tag: "The Comeback Man", desc: "1929 WS Game 4: A's trailed 8-0, scored 10 in the 7th — greatest WS comeback to that point. When trailing by 5+ runs, Cochrane's team gets +2 to all stats for one inning." },
    { tag: "Gordon's Loss", desc: "Cochrane lost his only son in WWII, first day of combat. If triggered: permanent -1 to all stats. 'Mickey was never the same.' The cruelest non-baseball event in ILB." },
  ],

  preferred_locations: [
    { location: "Behind the Plate", affinity: "MAXIMUM", note: "1,482 games caught. 110+ per season for 11 straight years. He didn't want to be a catcher. He became the best who ever did it." },
    { location: "Shibe Park, Philadelphia", affinity: "HIGH", note: "9 seasons with the A's. 3 consecutive pennants. 2 WS titles. Connie Mack's field general." },
    { location: "Navin Field, Detroit", affinity: "HIGH", note: "Player-manager. 2 pennants. Detroit's first WS title (1935). Made champions from nothing." },
    { location: "Dugout (Managing)", affinity: "HIGH", note: "Childhood dream achieved. 348-250 record (.582). Led from the bench and from behind the plate simultaneously." },
    { location: "Batter's Box (Leadoff)", affinity: "MODERATE", note: "Mack sometimes batted him leadoff — fast for a catcher, elite OBP. .419 career OBP from the backstop position." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — Cochrane led 5 pennant winners in 7 years. When the race was tight, he elevated everyone.",
      "Working with great pitchers — Lefty Grove, Schoolboy Rowe. He made good pitchers great. His mind synchronized with theirs.",
      "The comeback — down 8-0 in the 1929 WS Game 4 and won. Cochrane didn't know how to quit.",
      "First year with new team — 1925 A's (.331 BA rookie), 1934 Tigers (MVP, pennant). Fresh starts energized him.",
    ],
    cold_triggers: [
      "Postseason failure — 1931 WS, 1934 WS. Losses consumed him. Hospitalization followed.",
      "Blame — the Pepper Martin narrative. When blamed unfairly, Cochrane internalized rather than deflected.",
      "Administrative burden — GM + manager in 1936. Too much. Nervous breakdown.",
      "Late career — by 1937, the accumulation of physical and emotional damage was overwhelming. The beaning was the end, but he was already fraying.",
    ],
    pressure_response: "SPLIT. Cochrane under pressure was two people. In the moment — during the game, during the rally, during the comeback — he was the best leader in baseball. He ignited the 10-run inning. He called the perfect game. He drove in the winning run. But AFTER the moment — after the loss, after the failure — he was consumed. The 1931 WS broke him for months. The 1934 WS put him in a hospital. In ILB, Cochrane has +2 to all stats DURING pressure situations and -2 to all stats in the AFTERMATH of failure. He is both the best and worst pressure player in the game, depending on when you measure.",
  },

  action_card_seeds: [
    {
      title: "Black Mike",
      type: "Game Action",
      text: "Your catcher is losing. The team has given up. He begins screaming obscenities in the dugout. Players who were slumped on the bench straighten. The next batter gets a hit. Then another. Then another. Your catcher gets a base hit of his own. You win the game. His fury is contagious. His fury is also the thing that will destroy him. But not today.",
      origin: "The 'Black Mike' nickname and the dugout tirade that sparked an A's comeback. Cochrane's competitive fire was legendary — and ultimately self-destructive.",
    },
    {
      title: "Reading Minds",
      type: "Game Action",
      text: "Your ace pitcher looks in for the sign. Before he's even decided what to throw, your catcher has already put down the finger. It's the right pitch. It's always the right pitch. 'Hardly ever shook him off,' the pitcher says later. 'I'd look up and there'd be Mickey's signal, just what I was thinking. Like he was reading my mind.'",
      origin: "Lefty Grove on Cochrane's pitch-calling. Grove said he shook off Cochrane only 5-6 times in their entire career together. Cochrane helped two pitchers achieve 16-game winning streaks.",
    },
    {
      title: "The Ten-Run Inning",
      type: "Game Action",
      text: "Game 4 of the 1929 World Series. Your team trails the Cubs 8-0. It's over. Then it's not. In the bottom of the seventh inning, your team scores ten runs. Ten. The greatest comeback in World Series history. Your catcher is behind all of it — calling the game, getting on base, keeping everyone alive. You win 10-8. The Cubs never recover.",
      origin: "1929 WS Game 4: A's trailed 8-0, scored 10 in the 7th inning to win 10-8. The greatest World Series comeback to that point.",
    },
    {
      title: "Pepper Martin's Bases",
      type: "Drama",
      text: "The 1931 World Series. The Cardinals' Pepper Martin steals eight bases. Your catcher is blamed. It will follow him for the rest of his life — the catcher who couldn't stop Pepper Martin. The truth is more complicated: the pitchers were careless with runners. But truth doesn't matter when the narrative has already been written. Your catcher absorbs the blame because that's what catchers do.",
      origin: "1931 WS: Pepper Martin stole 8 bases vs the A's. Cochrane was blamed despite pitchers' negligence with runners. The narrative haunted him permanently.",
    },
    {
      title: "The Skull Fracture",
      type: "Drama",
      text: "May 25, 1937. Bump Hadley of the Yankees throws a fastball. Your catcher doesn't see it. The ball hits him in the temple. He drops. He doesn't move for ten days. When the doctors look at the X-rays, one says: 'They looked like a road map.' Your catcher will never play again. He is thirty-four years old. He was the greatest catcher in baseball. Now he is a man with a map for a skull.",
      origin: "Cochrane was beaned by Bump Hadley on May 25, 1937. Skull fracture. Unconscious for 10 days. Never played again. Age 34.",
    },
    {
      title: "Five Sports",
      type: "Action",
      text: "At Boston University, your catcher plays basketball, boxing, track, football, and baseball. He is the captain of the football team. He kicks a 53-yard field goal that will be the school record for sixty years. He chooses baseball only because there is no professional football league. He doesn't even like catching — the only open position. He becomes the greatest catcher in the American League at a sport that was his fifth-best, at a position he didn't want.",
      origin: "Cochrane was a five-sport athlete at BU. His 53-yard FG stood as a school record for 60+ years. He preferred outfield but caught because it was the only opening.",
    },
    {
      title: "There Goes My Job",
      type: "Action",
      text: "Opening Day 1925. The bases are loaded, the game is tied, and the veteran catcher is due up. But there's a right-handed sidearm pitcher on the mound, and the twenty-two-year-old rookie says he hit this guy hard in the Pacific Coast League. The manager lets him bat. He delivers a game-winning hit. On the bench, the veteran catcher says: 'There goes Cy Perkins' job.' He's right. He taught the kid everything he knew, and now the kid has taken his place.",
      origin: "Cochrane pinch-hit for Cy Perkins on Opening Day 1925, delivered a game-winning hit, and took over as starting catcher. Perkins had mentored Cochrane extensively.",
    },
    {
      title: "The Son",
      type: "Drama",
      text: "Your catcher retires. He manages. He coaches. He runs a dude ranch. He serves in the Navy. Then his only son ships overseas to fight. Gordon Cochrane dies on his first day of combat. His father is never the same. 'Mickey was never the same after Gordon's death,' says a teammate. Some losses cannot be absorbed. Some darkness has no dawn.",
      origin: "Cochrane's son Gordon was killed in WWII on his first day of combat. Teammates said Cochrane was permanently changed. He died in 1962 at age 59.",
    },
  ],

  art_direction: {
    face: "5'10\" 180 lbs — compact, muscular, built like a football halfback, which he was. The face is INTENSE — dark eyes, sharp features, jaw set, brow furrowed. This is the face of 'Black Mike' — not angry exactly, but burning. A man who is always in the middle of something important. The catcher's mask should be pushed up on his forehead or held at his side — the face must be visible. There should be something slightly dangerous about him.",
    attire: "Philadelphia Athletics 1930 home whites — the classic A's uniform with the elephant logo era. In full catcher's gear — chest protector, shin guards, mask pushed up. Or: in the batter's box left-handed, coiled, the catcher's mitt still on his belt. He is always both hitter and catcher simultaneously. The uniform should be dirty — catchers are always dirty.",
    mood: "CONTROLLED COMBUSTION. This card should feel like a lit fuse. There is an energy to Cochrane that is unlike anyone else in the Bashers set — Ruth is joyful, Gehrig is steady, Sisler is elegant, Williams is invisible. Cochrane is PRESSURE. He is the hiss before the explosion. The card should feel tight, coiled, ready to either win the game or destroy everything trying. There should be warmth, but it's the warmth of a furnace, not a sunset.",
    style: "Full color — Bashers era — but SHARP and DARK. The A's dark blue and white. Shibe Park shadows. This is a night-game card even if the game is in daylight — Cochrane carries his own darkness. The lighting should be dramatic: strong contrast, deep shadows on one side of his face, bright light on the other. Black Mike. The card border should be deep navy — the darkest border in the Bashers set.",
    reference: "Ruth is the solar system. Gehrig is the axis. Sisler is the sun. Sewell is the earth. Williams is the comet. Cochrane is the CORE — the molten iron center of the earth that keeps everything spinning. He is invisible from the surface, but without him, nothing works. His card should feel like the engine room of a ship — hot, loud, essential, and slightly terrifying. The greatest catcher is the man nobody sees who controls everything.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "No postseason", value: 0 },{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59", asNavy: "#1a1f3a", asWhite: "#e8e4d8", darkSteel: "#2a2d3a" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.asNavy}10`, border: `1px solid ${C.asNavy}30`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.warmRed, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.asNavy, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.asNavy}30`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function MickeyCochraneCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = COCHRANE_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.darkSteel} 0%, #0f1018 50%, ${C.darkSteel} 100%)`, padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.asWhite, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>ELITE / MVP CARD — Bashers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 440, background: C.parchment, borderRadius: 8, border: `3px solid ${C.asNavy}`, boxShadow: `0 0 0 2px ${C.darkSteel}, 0 0 20px ${C.asNavy}20, 0 10px 36px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "10px 0", background: `linear-gradient(90deg, ${C.asNavy}, #2a2f4a, ${C.asNavy})`, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.asWhite, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "Flip Card — View Dossier" : "Flip Card — View Front"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `3px solid ${C.asNavy}50`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.darkSteel}25, ${C.warmRed}08, ${C.asNavy}15)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 72, marginBottom: 8 }}>🔥</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>BLACK MIKE</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: C.asNavy, color: C.asWhite, padding: "6px 14px", borderRadius: 4, fontSize: 14, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}ee`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
              <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: `${C.asNavy}dd`, color: C.asWhite, padding: "3px 12px", borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 3 }}>ELITE / MVP</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" — {d.team} — {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="CON" value={s.con} max={5} color={C.gold} />
              <StatBar label="POW" value={s.pow} max={5} color={C.hotRed} />
              <StatBar label="SPD" value={s.spd} max={3} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.gold} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `linear-gradient(135deg, ${C.asNavy}, #2a2f4a)`, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "OPS", val: d.real_stats.ops },{ label: "HR", val: d.real_stats.home_runs },{ label: "RBI", val: d.real_stats.rbi },{ label: "R", val: d.real_stats.runs_scored },{ label: "K", val: d.real_stats.strikeouts }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.asWhite, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.7 }}>{stat.label}</div><div style={{ fontSize: 14, color: "#fff", fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>1930 PENNANT YEAR — .357 BA / .432 OBP / 42 2B / 16 K — WS CHAMPION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.asNavy}10`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.asNavy}20` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR OBP", val: d.real_stats.career_obp },{ label: "CAR OPS", val: d.real_stats.career_ops },{ label: "CAR WAR", val: d.real_stats.career_war },{ label: "PENNANTS", val: d.real_stats.pennants },{ label: "WS TITLES", val: d.real_stats.ws_titles },{ label: "MVPs", val: d.real_stats.mvp_awards },{ label: "HOF", val: "1947" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.asNavy, fontFamily: "'Courier Prime', monospace", letterSpacing: 1, opacity: 0.6 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["🏛️ HOF 1947", "🏆 3× WS Champion", "🏅 2× AL MVP", "🎯 .419 Career OBP (C Record)", "🔥 Black Mike", "🏈 5-Sport BU Athlete", "💀 Skull Fracture 1937", "🧠 The Catcher's Mind"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.asNavy}10`, border: `1px solid ${C.asNavy}25`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>ELITE DOSSIER — {d.year}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16, borderBottom: `1px solid ${C.asNavy}20`, paddingBottom: 8 }}>
              {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500, background: tab === t.id ? C.asNavy : "transparent", color: tab === t.id ? C.asWhite : C.medBrown, border: `1px solid ${tab === t.id ? C.asNavy : C.sepia}40`, borderRadius: 3, cursor: "pointer", fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{t.label}</button>))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.warmRed }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "MAXIMUM" ? `${C.gold}20` : l.affinity === "HIGH" ? `${C.traitGreen}20` : `${C.coldBlue}20`, color: l.affinity === "MAXIMUM" ? C.gold : l.affinity === "HIGH" ? C.traitGreen : C.coldBlue, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Cochrane's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.asNavy}05`, border: `1px solid ${C.asNavy}15`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine">{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Cochrane's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: `linear-gradient(90deg, ${C.asNavy}, #2a2f4a, ${C.asNavy})`, padding: "8px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.asWhite, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB ELITE #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>
    </div>
  );
}
