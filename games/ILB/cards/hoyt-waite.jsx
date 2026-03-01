// /cards/players/waite-hoyt.jsx
import { useState } from "react";

const PLAYER_DATA = {
  // ═══════════════════════════════════════════════════════════════
  // ILB PLAYER CARD: WAITE HOYT
  // Year Snapshot: 1927 (Ace of the Greatest Team Ever)
  // ═══════════════════════════════════════════════════════════════

  name: "Waite Hoyt",
  nickname: "Schoolboy",
  year: 1927,
  team: "New York Yankees",
  era: "1920s",
  ilb_team: "Bashers NL1920",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '5\'11"',
  weight: "180 lbs",
  born: "September 9, 1899 — Brooklyn, NY (Flatbush)",
  died: "August 25, 1984 — Cincinnati, OH (age 84)",
  hof: "Class of 1969 (Veterans Committee). Never exceeded 20% on BBWAA ballot. 16 ballots without election.",

  // ═══════════════════════════════════════════════════════════════
  // REAL STATS — 1927 SEASON
  // Source: Baseball-Reference, SABR BioProject, Yankees Magazine
  // ═══════════════════════════════════════════════════════════════
  real_stats: {
    season: 1927,
    wins: 22,
    losses: 7,
    era: "2.63",
    games: 36,
    games_started: 32,
    complete_games: 23,
    shutouts: 3,
    innings_pitched: "256.1",
    strikeouts: 86,
    walks: 54,
    whip: "1.155",
    win_pct: ".759",
    k_per_9: "3.0",
    bb_per_9: "1.90",
    war: 5.8,
    // Career totals
    career_wins: 237,
    career_losses: 182,
    career_era: "3.59",
    career_ip: "3,762.1",
    career_k: 1206,
    career_cg: 226,
    career_sho: 26,
    career_war: 25.6,
    // Postseason
    ws_record: "6-4",
    ws_era: "1.83",
    ws_ip: "83.2",
    ws_appearances: 12,
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION ENGINE — PITCHER
  //
  // STUFF (STF): ERA 2.63 → tier 2 (2.50-2.99). K/9 = 3.0 — well below 6.0 threshold, no bonus. STF 2.
  // CONTROL (CTL): BB/9 = 1.90 → tier 3 (1.50-1.99). WHIP 1.155 — above 1.00, no bonus. CTL 3.
  // STAMINA (STA): 256.1 IP → tier 3 (250-299). 23 CG — massive. STA 3.
  // DEFENSE (DEF): .966 fielding pct (9 pts above avg). No GG (pre-award). DEF 0.
  // CLUTCH (CLU): WS ERA 1.83 → tier 2 (< 2.00). 1921 WS: 0.00 ERA in 27 IP. 6 WS wins. +1 hero bonus. CLU 3 (max).
  // OVERALL: STF(2)×2 + CTL(3)×1.5 + STA(3)×1 + DEF(0)×0.5 = 4+4.5+3+0 = 11.5 → normalized ~7 (All-Star)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star tier — elite control, elite clutch, moderate stuff
    stf: 2,      // 2.63 ERA in 1927, but K/9 of only 3.0. Deceptively fast, not dominant. "As fast as Seaver but never struck anybody out."
    ctl: 3,      // BB/9 1.90 in 1927, career 2.4 BB/9. WHIP 1.155. Among AL leaders in fewest walks. Maximum control.
    sta: 3,      // 256.1 IP, 23 CG in 1927. Career 3,762.1 IP, 226 CG. Averaged 253 IP/year over 8-year Yankee peak.
    def: 0,      // No Gold Gloves (pre-award). Good fielder (.966) but not elite or notable.
    clu: 3,      // WS ERA 1.83 across 83.2 IP. 1921 WS: 0.00 ERA in 27 IP (still lost 2-1). 6 WS wins (record at retirement). Maximum clutch.
  },

  stat_justification: {
    stf: "ERA 2.63 in 1927 (led AL) places him in tier 2 (2.50-2.99). However, K/9 of only 3.0 is far below the 6.0 bonus threshold. Hoyt was 'deceptively hard' — he compared his velocity to Tom Seaver's — but said 'I never struck anybody out.' He threw a fastball, palm ball, curveball (which he admitted 'wasn't too good'), and later a slider. He relied on control, guile, and movement rather than raw dominance. Rating of 2.",
    ctl: "BB/9 of 1.90 in 1927 — among the five lowest in the AL. Career BB/9 of 2.4. WHIP of 1.155 in 1927. Hoyt rarely walked anyone and lived on pinpoint location. He appeared 'almost casual on the mound, never creating the impression that he was bearing down.' That ease came from command. Rating of 3 (maximum).",
    sta: "256.1 IP in 1927 with 23 complete games (3rd in AL). Career total: 3,762.1 IP, 226 CG in 21 seasons. Averaged 253 IP/year over his 8-year Yankee peak (1921-28). Also worked extensively out of the bullpen — he started ~30 games/year and relieved in another dozen. A true workhorse. 250-299 IP → tier 3. Rating of 3.",
    def: "Career fielding percentage of .966, which was 9 points above league average for pitchers. Good but not extraordinary. No Gold Gloves (pre-award era). No notable defensive reputation. Rating of 0.",
    clu: "One of the greatest postseason pitchers in pre-modern history. WS career: 6-4, 1.83 ERA, 83.2 IP, 12 games. In the 1921 WS: pitched 27 innings without allowing a single earned run (still went 2-1 because the Giants scored unearned runs). At retirement, held the record for most WS wins (6) and appearances (12). Called a 'money pitcher' by The Sporting News. In 1928 WS: 2 complete-game wins over the Cardinals. Rating of 3 (maximum).",
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONALITY PROFILE — THE DOSSIER
  // ═══════════════════════════════════════════════════════════════
  personality: {
    leadership_style: "The Aristocrat. Sportswriter Will Wedge dubbed Hoyt 'the Aristocrat of Baseball' — he carried himself with a performer's poise and a Brooklyn intellectual's wit. Not a rah-rah leader but a commanding presence who demanded professionalism. He absorbed Miller Huggins' philosophy that the bench was for baseball talk only. His leadership came through eloquence and example, not volume.",
    temperament: "Complex and contradictory. Hot-headed in his youth — sportswriter Joe Vila said he suffered from 'overconfidence' and 'swollen pride' and needed to 'control his temper.' But by 1927, after a 'personal inventory,' he'd matured into an unflappable mound presence. Off the field, he was restless, mercurial — a funeral director by day, a vaudeville performer by night, an alcoholic who bottomed out in a Cincinnati bar before becoming one of the first public members of Alcoholics Anonymous.",
    work_ethic: "Relentless self-improver. Signed at 15, the youngest player ever to sign a pro contract at the time. Took beatings in the minors where players cleared rocks from fields and locker rooms lacked showers. His 1927 breakthrough came after a deliberate 'personal inventory' — he accepted advice from Huggins and rededicated himself. Played semi-pro basketball in the offseason to stay fit. Continued pitching effectively until age 38.",
    lifestyle: "The most fascinating figure on the Bashers roster. A true Renaissance man of the Roaring Twenties. Vaudeville performer alongside Jack Benny, Jimmy Durante, George Burns, and Mae West. Funeral director ('The Merry Mortician') who once left a corpse in his car trunk while pitching at Yankee Stadium. Accomplished oil painter. Published author. Radio broadcaster for 24 years. Drank champagne with Al Capone. Went to a drag show with J. Edgar Hoover. One locker room brawl with Babe Ruth. Married three times.",
    era_adaptability: "HIGH. Hoyt's elite control, deceptive velocity, and ability to pitch in any role (starter, reliever, swingman) would translate well to any era. His K/9 would be a problem in modern baseball, but his BB/9 would be elite. He'd profile as a crafty, contact-management pitcher — a Kyle Hendricks or Dallas Keuchel type. His postseason poise would be invaluable.",
    clubhouse_impact: "THE STORYTELLER. Hoyt was baseball's greatest raconteur. When he became the Reds' broadcaster, 'audiences would pray for rain so that Hoyt could tell baseball stories' (Red Barber). He called games exclusively in the past tense because 'as I speak to you, what happened a moment ago is gone.' When Babe Ruth died in 1948, Hoyt spoke impromptu about his friend for two hours on the air. He was the beating heart of the clubhouse — wit, warmth, and whiskey.",
    dark_side: "Alcoholism. Hoyt was a severe alcoholic for much of his career and post-career life. He bottomed out in a seedy Cincinnati bar before joining Alcoholics Anonymous — becoming one of the first professional athletes to speak publicly about addiction. At Old-Timers' Day in 1978, he said wistfully that he 'would have won 300 games' if not for alcohol. In ILB terms: Hoyt carries a 'Bottle' trait — he can lose games, relationships, and even his career to drinking unless actively managed.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHEMISTRY TRAITS
  // ═══════════════════════════════════════════════════════════════
  chemistry_traits: [
    { tag: "The Aristocrat", desc: "Dubbed 'Aristocrat of Baseball.' Hoyt elevates the culture of any team. +1 team discipline. -1 chemistry with low-effort teammates." },
    { tag: "Schoolboy", desc: "Signed pro at 15 — the youngest ever at the time. Hoyt adapts quickly to any new situation. Halved adjustment period when traded." },
    { tag: "The Merry Mortician", desc: "Works as a funeral director in the offseason. Immune to intimidation and death threats. +1 composure in hostile environments." },
    { tag: "Vaudeville Star", desc: "Performs with Jack Benny and Mae West. +2 popularity, +1 media handling. Opponents underestimate him as a showman." },
    { tag: "The Bottle", desc: "Alcoholism. Random chance each season of a performance collapse. If triggered, -2 to all stats for 4 weeks. Can be cured by 'Recovery' event card." },
    { tag: "Murderers' Row", desc: "Thrives behind elite offense. +1 to all stats when team scores 5+ runs per game average. 'The secret was to get a job with the Yankees and joyride along on their home runs.'" },
    { tag: "The Storyteller", desc: "Baseball's greatest raconteur. Rain delays and travel days become +1 team morale events. Can convert any teammate's -1 morale to neutral with a story." },
    { tag: "Money Pitcher", desc: "WS ERA 1.83 across 83.2 IP. In elimination/postseason games, +1 STF and +1 CTL. The bigger the stage, the better he pitches." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PREFERRED LOCATIONS
  // ═══════════════════════════════════════════════════════════════
  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "Appeared 'almost casual on the mound.' His workplace. His stage. 674 career games." },
    { location: "Vaudeville Stage / Theater", affinity: "HIGH", note: "Performed with the biggest names of the 1920s. His baritone voice and timing were professional-grade." },
    { location: "Radio Booth / Media", affinity: "HIGH", note: "24-year career as Reds broadcaster. Called games in past tense. Released two albums of baseball stories." },
    { location: "Bar / Nightlife", affinity: "COMPLEX", note: "Drank champagne with Al Capone. Loved nightlife. But also where he bottomed out. High reward, high risk." },
    { location: "Funeral Parlor", affinity: "MEDIUM", note: "Apprenticed with his father-in-law. Comfortable with death. Once drove a corpse to Yankee Stadium." },
    { location: "Art Studio", affinity: "MEDIUM", note: "Accomplished oil painter in retirement. A genuine creative soul." },
    { location: "Church / AA Meeting", affinity: "LATE CAREER", note: "Among the first athletes in Alcoholics Anonymous. Sober for his last 45 years. Found peace." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MOMENTUM TENDENCIES
  // ═══════════════════════════════════════════════════════════════
  momentum: {
    hot_triggers: [
      "Postseason games — 1.83 career WS ERA, better as stakes rise",
      "Pitching behind elite offense — 'joyride along on their home runs'",
      "After personal reckoning — his 1927 'personal inventory' led to his best season",
      "Big-city spotlight — Brooklyn kid who thrived in New York",
    ],
    cold_triggers: [
      "Alcohol-fueled spirals — performance collapses when drinking is active",
      "Ego conflicts with management — clashed with Huggins, McGraw before maturing",
      "Teams that don't score — his modest stuff gets exposed without run support",
      "Post-trade decline — went 80-84 after leaving the Yankees",
    ],
    pressure_response: "ELITE IN OCTOBER, FRAGILE IN LIFE. Hoyt's postseason record is extraordinary: 1.83 ERA across 83.2 WS innings, including 27 scoreless innings in the 1921 WS. He held the record for most WS wins (6) and appearances (12) when he retired. The Sporting News called him a 'money pitcher.' But his life off the mound was chaos — vaudeville, funerals, alcoholism, three marriages. In ILB: Hoyt's pressure rating is split. On the mound in October, he's maximum clutch. Off the field, he's a liability unless the team actively manages his darker impulses.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ACTION CARD SEEDS
  // ═══════════════════════════════════════════════════════════════
  action_card_seeds: [
    {
      title: "The Body in the Trunk",
      type: "Drama",
      text: "Your pitcher has a side job as a funeral director. On game day, he realizes he forgot to deliver a body — it's still in his car at the stadium. He pitches distracted (-1 CTL for innings 4-6) until a teammate ices the situation. After the game, he drives the body home. No harm done — this time.",
      origin: "Hoyt left a corpse in the trunk of his car at Yankee Stadium while pitching an afternoon game. Myles Thomas and the ballboys packed 20 lbs of ice around the body. Hoyt drove it back to New Rochelle after the game.",
    },
    {
      title: "The Personal Inventory",
      type: "Action",
      text: "A struggling veteran pitcher conducts a 'personal inventory' — accepting coaching advice he'd previously refused. If his ego is checked, +1 to CTL and STF for the rest of the season. If his ego remains unchecked, no change.",
      origin: "Before the 1927 season, Hoyt described conducting a 'personal inventory' of his behavior, finally accepting advice from Miller Huggins. The result was his career year: 22-7, 2.63 ERA, AL leader in wins, ERA, and winning percentage.",
    },
    {
      title: "Two Hours for a Friend",
      type: "Drama",
      text: "A beloved legend dies during the season. Your broadcaster (or player) speaks for two hours on live radio without notes, eulogizing their friend. +3 team morale, +2 fan loyalty. But the speaker is emotionally devastated: -1 to all stats for 2 weeks.",
      origin: "On August 16, 1948, Babe Ruth died. After the Reds game that night, Hoyt spoke impromptu about his friend for two hours on the radio. It became one of the most famous broadcasts in baseball history.",
    },
    {
      title: "The Schoolboy Contract",
      type: "Action",
      text: "A 15-year-old phenom is available to sign. He's raw but electric. If you sign him, he needs 3 seasons of development before becoming useful. But if you don't, he'll sign with your rival and become a Hall of Famer.",
      origin: "Hoyt signed with the Giants at 15 years old (with a $5 bonus), becoming the youngest player ever to sign a professional contract at the time. He debuted in the majors at 18.",
    },
    {
      title: "Scared to Death",
      type: "Game Action",
      text: "Your team's legendary lineup takes batting practice before a World Series game. The opposing team watches in stunned silence. -2 to the opponent's batting confidence for Games 1-2 of the series.",
      origin: "Hoyt: 'We took the winner's share of the 1927 World Series by practically scaring the opposition to death.' The Pirates watched the Yankees take BP and reportedly lost their nerve before a pitch was thrown. The Yankees swept 4-0.",
    },
    {
      title: "The Merry Mortician's Night Out",
      type: "Drama",
      text: "Your pitcher works a funeral by day and performs vaudeville by night. He arrives at the stadium exhausted but energized by the crowd. Roll: 60% chance of +1 STF (adrenaline), 40% chance of -1 STA (fatigue).",
      origin: "Hoyt was dubbed 'The Merry Mortician' by sportswriter John Kieran. By day he ran his father-in-law's funeral home; by night he performed vaudeville alongside Jimmy Durante, Jack Benny, and Mae West.",
    },
    {
      title: "27 Scoreless Innings",
      type: "Game Action",
      text: "Your pitcher throws 27 innings in the World Series without allowing a single earned run. Incredibly, he goes only 2-1 because his defense commits errors behind him. +3 reputation for clutch pitching, but your pitcher gains the 'Cursed by Errors' trait — defensive mistakes haunt him in October.",
      origin: "In the 1921 World Series against the Giants, Hoyt pitched 27 innings without allowing an earned run but went only 2-1. The Giants won Game 8 (best-of-9 format) on an error, 1-0.",
    },
    {
      title: "The Bottle Breaks",
      type: "Drama",
      text: "Your star player's alcoholism reaches a crisis point. He bottoms out in a bar. Two paths: (A) He enters recovery — loses 1 full season but gains 'Sober' trait (+1 to all stats permanently, +2 clubhouse). (B) He refuses help — 25% chance of career collapse each remaining season.",
      origin: "Hoyt was a severe alcoholic who bottomed out in a Cincinnati bar. He joined Alcoholics Anonymous and was sober for 45 years. At Old-Timers' Day 1978, he said he 'would have won 300 games' if not for alcohol.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // VISUAL ART DIRECTION
  // ═══════════════════════════════════════════════════════════════
  art_direction: {
    face: "Handsome, sharp-featured Brooklyn kid. 5'11\" 180 lbs — athletic, lean build. Dark hair, piercing intelligent eyes. By 1927 (age 27), he radiates confidence — the calm, almost casual poise that observers described. A slight smirk that says he knows something you don't. The face of a vaudevillian who happens to be the ace of the greatest team ever assembled.",
    attire: "New York Yankees 1927 road grays with the interlocking 'NY' on the chest. Classic pinstriped flannel (if home whites). Cap pulled slightly back. Mid-delivery — the smooth, effortless motion that hid his deceptive velocity. No number (pre-numbering; he'd later be the first Yankee to wear #12 in 1929).",
    mood: "Elegant nonchalance. The 'Aristocrat of Baseball.' He should look like he's barely trying — that was his whole thing on the mound. A performer's confidence, like a jazz musician who makes the difficult look easy. Cool, assured, with a hint of mischief.",
    style: "Rich sepia with golden-hour light. Yankee Stadium in the background — the original facade, the 1920s cathedral. The card should feel glamorous and urbane — this is Roaring Twenties New York, prohibition champagne and vaudeville spotlights. More Great Gatsby than dusty diamond.",
    reference: "Think 1920s Art Deco elegance. The portrait should capture Hoyt's paradox: a Brooklyn funeral director who performed with Mae West and pitched scoreless innings in the World Series. He's the most colorful character on a team of legends — and the card should reflect that complexity.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STAT CONVERSION ENGINE — PITCHER
// ═══════════════════════════════════════════════════════════════
const STAT_ENGINE_PITCHER = {
  stuff: {
    metric: "ERA (peak season) + K/9",
    tiers: [
      { range: "ERA < 2.00", value: 3 },
      { range: "ERA 2.00-2.49", value: 2.5 },
      { range: "ERA 2.50-2.99", value: 2 },
      { range: "ERA 3.00-3.49", value: 1 },
      { range: "ERA 3.50+", value: 0 },
    ],
    bonus: "K/9 ≥ 6.0 → +1 (cap 5)",
  },
  control: {
    metric: "BB/9 (peak season) + WHIP",
    tiers: [
      { range: "BB/9 < 1.50", value: 4 },
      { range: "BB/9 1.50-1.99", value: 3 },
      { range: "BB/9 2.00-2.49", value: 2 },
      { range: "BB/9 2.50-2.99", value: 1 },
      { range: "BB/9 3.00+", value: 0 },
    ],
    bonus: "WHIP ≤ 1.00 → +1 (cap 5)",
  },
  stamina: {
    metric: "Innings Pitched (peak season)",
    tiers: [
      { range: "< 200 IP", value: 1 },
      { range: "200-249 IP", value: 2 },
      { range: "250-299 IP", value: 3 },
      { range: "300-349 IP", value: 4 },
      { range: "350+ IP", value: 5 },
    ],
  },
  defense: {
    metric: "Gold Gloves + fielding reputation",
    tiers: [
      { range: "No Gold Glove", value: 0 },
      { range: "1-2 GG", value: 1 },
      { range: "3-5 GG", value: 2 },
      { range: "6+ GG", value: 3 },
    ],
  },
  overall: {
    formula: "STF×2 + CTL×1.5 + STA×1 + DEF×0.5 → normalized 3-13",
    tiers: [
      { range: "3-4", label: "Replacement" },
      { range: "5-6", label: "Solid Starter" },
      { range: "7-8", label: "All-Star" },
      { range: "9-10", label: "Elite / MVP" },
      { range: "11-12", label: "Legend" },
      { range: "13", label: "Mythic" },
    ],
  },
  clutch: {
    metric: "Postseason ERA + signature moments",
    tiers: [
      { range: "PS ERA > 4.00", value: 0 },
      { range: "PS ERA 2.00-4.00", value: 1 },
      { range: "PS ERA < 2.00", value: 2 },
    ],
    bonus: "WS hero moment → +1 (cap 3)",
  },
};

// Color palette
const C = {
  parchment: "#f5edd6",
  darkBrown: "#3a2a1a",
  medBrown: "#6b5339",
  gold: "#c9a84c",
  warmRed: "#8b3a2a",
  sepia: "#a0845c",
  cream: "#faf3e3",
  ink: "#2a1f14",
  hotRed: "#c44536",
  coldBlue: "#3a6b8c",
  traitGreen: "#4a7c59",
};

const StatBar = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
    <span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 2,
        transition: "width 0.8s ease",
      }} />
    </div>
    <span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span>
  </div>
);

const ChemTag = ({ tag }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`,
    borderRadius: 3, padding: "3px 8px", margin: "2px 3px",
    fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
  }}>
    {tag}
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase",
      color: C.gold, fontFamily: "'Courier Prime', monospace",
      borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10,
    }}>{title}</div>
    {children}
  </div>
);

export default function WaiteHoytCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = PLAYER_DATA;
  const s = d.ilb_stats;

  const tabs = [
    { id: "personality", label: "Dossier" },
    { id: "chemistry", label: "Chemistry" },
    { id: "momentum", label: "Momentum" },
    { id: "actions", label: "Action Seeds" },
    { id: "engine", label: "Stat Engine" },
    { id: "art", label: "Art Notes" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)`,
      padding: "24px 12px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>
          Infinity League Baseball
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>
          Player Card — Bashers Era
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: 420,
        background: C.parchment,
        borderRadius: 8,
        border: `3px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`,
        overflow: "hidden",
      }}>
        {/* Flip Toggle */}
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{
          width: "100%", padding: "8px 0",
          background: C.darkBrown, border: "none", cursor: "pointer",
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700,
        }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>

        {side === "front" ? (
          /* ═══════════ FRONT ═══════════ */
          <div style={{ padding: 20 }}>
            {/* Portrait */}
            <div style={{
              width: "100%", aspectRatio: "1/1",
              background: `linear-gradient(180deg, ${C.sepia}30 0%, ${C.parchment} 100%)`,
              border: `2px solid ${C.gold}60`,
              borderRadius: 4,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.sepia}08 2px, ${C.sepia}08 4px)` }} />
              <div style={{ fontSize: 64, marginBottom: 8 }}>⚾</div>
              <div style={{ fontSize: 14, color: C.medBrown, fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>
                [AI Portrait: Elegant mid-delivery, Yankees grays, Art Deco Yankee Stadium backdrop]
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: C.darkBrown, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>
                OVR {s.ovr}
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: C.warmRed, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
                {d.position}
              </div>
            </div>

            {/* Name */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                {d.name}
              </div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>
                "{d.nickname}" — {d.team} — {d.year}
              </div>
            </div>

            {/* Pitcher Stats */}
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.warmRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.hotRed} />
            </div>

            {/* Real Stats Grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: C.darkBrown, borderRadius: 4, padding: 10,
            }}>
              {[
                { label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },
                { label: "ERA", val: d.real_stats.era },
                { label: "IP", val: d.real_stats.innings_pitched },
                { label: "K", val: d.real_stats.strikeouts },
                { label: "WHIP", val: d.real_stats.whip },
                { label: "CG", val: d.real_stats.complete_games },
                { label: "W%", val: d.real_stats.win_pct },
                { label: "WAR", val: d.real_stats.war },
              ].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>

            {/* Season Label */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              {d.year} SEASON — {d.real_stats.games} GAMES ({d.real_stats.games_started} GS)
            </div>

            {/* Career Totals */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
              background: `${C.sepia}20`, borderRadius: 4, padding: 8, marginTop: 10,
              border: `1px solid ${C.sepia}30`,
            }}>
              {[
                { label: "CAR W", val: d.real_stats.career_wins },
                { label: "CAR ERA", val: d.real_stats.career_era },
                { label: "CAR IP", val: "3,762" },
                { label: "CAR K", val: d.real_stats.career_k },
                { label: "WS W-L", val: d.real_stats.ws_record },
                { label: "WS ERA", val: d.real_stats.ws_era },
                { label: "CG", val: d.real_stats.career_cg },
                { label: "SHO", val: d.real_stats.career_sho },
              ].map((st, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{st.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 700, fontFamily: "'Courier Prime', monospace" }}>{st.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              CAREER TOTALS — 21 SEASONS (1918-1938)
            </div>

            {/* Awards */}
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12,
            }}>
              {["🏆 HOF 1969 (Vet. Comm.)", "🏆 3× WS Champ (23/27/28)", "⚾ 6 WS Wins (record)", "🎙️ 24yr Reds Broadcaster", "🎭 Vaudeville Performer", "📻 Rain Delay Legend", "🖌️ Oil Painter", "💀 Merry Mortician"].map((a, i) => (
                <span key={i} style={{
                  fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`,
                  padding: "2px 8px", borderRadius: 10, color: C.medBrown,
                  fontFamily: "'Courier Prime', monospace",
                }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════════ BACK — DOSSIER ═══════════ */
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
                CLASSIFIED DOSSIER — {d.year}
              </div>
            </div>

            {/* Tabs */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16,
              borderBottom: `1px solid ${C.sepia}30`, paddingBottom: 8,
            }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontWeight: tab === t.id ? 900 : 500,
                  background: tab === t.id ? C.darkBrown : "transparent",
                  color: tab === t.id ? C.gold : C.medBrown,
                  border: `1px solid ${tab === t.id ? C.gold : C.sepia}40`,
                  borderRadius: 3, cursor: "pointer",
                  fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
                }}>{t.label}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: C.ink }}>
              {tab === "personality" && (
                <>
                  <Section title="Leadership">
                    <p style={{ margin: 0 }}>{d.personality.leadership_style}</p>
                  </Section>
                  <Section title="Temperament">
                    <p style={{ margin: 0 }}>{d.personality.temperament}</p>
                  </Section>
                  <Section title="Work Ethic">
                    <p style={{ margin: 0 }}>{d.personality.work_ethic}</p>
                  </Section>
                  <Section title="Lifestyle">
                    <p style={{ margin: 0 }}>{d.personality.lifestyle}</p>
                  </Section>
                  <Section title="Era Adaptability">
                    <p style={{ margin: 0 }}>{d.personality.era_adaptability}</p>
                  </Section>
                  <Section title="Clubhouse Impact">
                    <p style={{ margin: 0 }}>{d.personality.clubhouse_impact}</p>
                  </Section>
                  <Section title="⚠ Hidden Complexity">
                    <p style={{ margin: 0, color: C.warmRed, fontStyle: "italic" }}>{d.personality.dark_side}</p>
                  </Section>
                </>
              )}

              {tab === "chemistry" && (
                <>
                  <Section title="Chemistry Traits">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.chemistry_traits.map((t, i) => <ChemTag key={i} tag={t.tag} />)}
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
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2,
                          background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "COMPLEX" ? `${C.warmRed}20` : l.affinity === "LATE CAREER" ? `${C.coldBlue}20` : `${C.gold}20`,
                          color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "COMPLEX" ? C.warmRed : l.affinity === "LATE CAREER" ? C.coldBlue : C.gold,
                          fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 50, textAlign: "center",
                        }}>{l.affinity}</span>
                        <div>
                          <span style={{ fontWeight: 700 }}>{l.location}</span>
                          <span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span>
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "momentum" && (
                <>
                  <Section title="🔥 Hot Triggers">
                    {d.momentum.hot_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="❄ Cold Triggers">
                    {d.momentum.cold_triggers.map((t, i) => (
                      <div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>
                    ))}
                  </Section>
                  <Section title="Pressure Response">
                    <p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p>
                  </Section>
                </>
              )}

              {tab === "actions" && (
                <>
                  <Section title="Action Card Seeds">
                    <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      These events, derived from Hoyt's real life, become universal cards playable in any game.
                    </p>
                    {d.action_card_seeds.map((a, i) => (
                      <div key={i} style={{
                        background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`,
                        borderRadius: 4, padding: 10, marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span>
                          <span style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 2,
                            background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`,
                            color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown,
                            fontFamily: "'Courier Prime', monospace", fontWeight: 700,
                          }}>{a.type}</span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p>
                        <p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {tab === "engine" && (
                <>
                  <Section title="Stat Conversion Engine — Pitcher">
                    <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>
                      Reusable formula for converting Baseball Reference pitching stats into ILB card values.
                    </p>
                    {Object.entries(STAT_ENGINE_PITCHER).map(([key, data]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>
                          {key} — {data.metric || data.formula}
                        </div>
                        {data.tiers && (
                          <div style={{ marginTop: 4 }}>
                            {data.tiers.map((t, i) => (
                              <div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>
                                {t.range} → {t.value !== undefined ? t.value : t.label}
                              </div>
                            ))}
                          </div>
                        )}
                        {data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}
                      </div>
                    ))}
                  </Section>
                  <Section title="Hoyt's Derivation">
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

        {/* Footer */}
        <div style={{
          background: C.darkBrown, padding: "6px 16px",
          display: "flex", justifyContent: "space-between",
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1,
        }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} • {d.position} • OVR {s.ovr}</span>
        </div>
      </div>

      {/* JSON Export */}
      <div style={{
        width: "100%", maxWidth: 420, marginTop: 20,
        background: "#1a150e", borderRadius: 6, padding: 16,
        border: `1px solid ${C.gold}30`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>
          JSON EXPORT PREVIEW
        </div>
        <pre style={{
          fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace",
          whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4,
          maxHeight: 200, overflow: "auto",
        }}>
{JSON.stringify({
  name: d.name,
  nickname: d.nickname,
  year: d.year,
  position: d.position,
  era: d.era,
  ilb_team: d.ilb_team,
  stats: d.ilb_stats,
  chemistry_traits: d.chemistry_traits.map(t => t.tag),
  preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })),
  hot_triggers: d.momentum.hot_triggers,
  cold_triggers: d.momentum.cold_triggers,
  action_seeds: d.action_card_seeds.length,
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
