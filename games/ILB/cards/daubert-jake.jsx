// /cards/players/jake-daubert.jsx
import { useState } from "react";

const DAUBERT_DATA = {
  name: "Jake Daubert",
  nickname: "The Coal Miner's MVP",
  year: 1913,
  team: "Brooklyn Superbas",
  era: "1910s",
  ilb_team: "Muggers AL1910",
  position: "1B",
  bats: "L",
  throws: "L",
  height: '5\'10"',
  weight: "160 lbs",
  born: "April 7, 1884 — Shamokin, PA",
  died: "October 9, 1924 — Cincinnati, OH (age 40, still active player)",
  hof: "Not inducted. Brooklyn Dodgers HOF 1990. Cincinnati Reds HOF 1966. 2× NL batting champion. 1913 Chalmers Award (MVP). The premier NL first baseman of the Deadball Era — frequently compared to Hal Chase, but honest.",

  real_stats: {
    season: 1913,
    games: 139,
    at_bats: 508,
    hits: 178,
    doubles: 17,
    triples: 7,
    home_runs: 2,
    rbi: 52,
    stolen_bases: 25,
    batting_avg: ".350",
    obp: ".403",
    slg: ".419",
    ops: ".822",
    runs_scored: 76,
    walks: 38,
    career_avg: ".303",
    career_hits: 2326,
    career_hr: 56,
    career_triples: 165,
    career_sb: "~260",
    career_sac_hits: 392,
    career_war: "~28",
    ws_appearances: 2,
    ws_record: "1-1 (1916 loss, 1919 win)",
  },

  // ═══════════════════════════════════════════════════════════════
  // ILB STAT CONVERSION
  //
  // CON: .350 BA (1913) → tier 5 (.330+). 2× batting champion. .303 career. CON = 5.
  // POW: 2 HR (1913). 56 career. But 165 3B, .419 SLG. Deadball gap power. POW = 0.
  // SPD: 25 SB (1913). ~260 career. 165 career triples. Good speed. SPD = 2.
  // DEF: Led NL in FP at 1B 3×. Never below .989. "Greatest honest fielding NL 1B of the 1910s." DEF = 2.
  // CLU: .176 in 1916 WS. .241 in 1919 WS (Black Sox). Won 1919 but tainted. CLU = 0.
  // OVR: CON×2(10) + POW×1.5(0) + SPD×1(2) + DEF×0.5(1) = 13 → normalized ~7
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 7,      // All-Star — 2× batting champion, MVP, premier NL 1B of the Deadball Era. The anti-Chase.
    con: 5,      // .350 NL batting title (1913). .329 title (1914). .336 at age 38 (1922). .303 career. Elite contact. Max.
    pow: 0,      // 2 HR in 1913. 56 career. "He had little power at bat... No one noticed." — Robert Creamer. Pure slap hitter.
    spd: 2,      // 25 SB (1913). ~260 career. 165 career triples. Good wheels for a first baseman. Tier 2.
    def: 2,      // Led NL FP at 1B 3× (.993 in 1912, .993 in 1916). "Flashing and sensational like Chase, but never erratic." Best defensive 1B in NL for a decade.
    clu: 0,      // .176 in 1916 WS (Brooklyn lost). .241 in 1919 WS (won — but it was the Black Sox Series). No signature October moments. Daubert vanished in the Fall Classic.
  },

  stat_justification: {
    con: "Won back-to-back NL batting titles: .350 (1913) and .329 (1914). Career .303 across 15 seasons and 2,326 hits. Hit .336 with 205 hits at age 38 in 1922. A 'slashing chop hitter with tremendous bat control' who compared himself to a crack marksman. 392 career sacrifice hits — NL record, 2nd all-time in MLB. His bunting was an art form: 4 sac bunts in one game on a bad ankle. Rating of 5 — maximum contact.",
    pow: "2 HR in 1913. Career-high 12 HR at age 38 in 1922. 56 career HR in 2,014 games. SLG .419 in 1913. 'He had little power at bat and little range in the field. No one noticed.' — Robert Creamer. Daubert was a pure slap-and-bunt hitter with gap power expressed through triples, not homers. Rating of 0.",
    spd: "25 SB in 1913 (his peak). ~260 career SB. 165 career triples — led NL twice (1918, 1922). At 5'10\" 160 lbs, Daubert was quick enough to leg out triples and steal bases, though he slowed with age. Rating of 2.",
    def: "Led NL in fielding percentage at 1B three times (.993 in 1912, .993 in 1916, and once more). Never fielded below .989. Baseball Magazine: 'Flashing and sensational like Chase, he is, unlike Chase, never erratic, never prone to sudden error, never sulky or indifferent.' He was the honest Chase — spectacular AND reliable. Rating of 2.",
    clu: "Hit .176 in the 1916 World Series (Brooklyn lost to Red Sox). Hit .241 in the 1919 World Series (Reds won — but against the Black Sox, a tainted championship). No signature postseason moments. Daubert's October record is his one weakness. Rating of 0.",
  },

  personality: {
    leadership_style: "Captain and labor leader. Daubert captained both the Brooklyn and Cincinnati clubs. He was VP of the Baseball Players' Fraternity, replacing Ty Cobb. He sued for prorated salary during the wartime-shortened 1918 season — and won. He was popular enough to be nominated for Alderman in Brooklyn. 'Modest, polite and colorless, though a tiger about money.'",
    temperament: "Intelligent, dignified, quietly fierce. Sportswriters loved him because he could discuss topics beyond baseball. He was shrewd in business — invested in real estate, a cigar company, a poolroom, a coal washery, and a semi-pro baseball team. He made more money outside baseball than in it. He never forgot the coal mines, and he never went back to them.",
    work_ethic: "Relentless. Daubert played 2,014 games over 15 seasons. In 1924, at age 40, he was the oldest regular position player in the majors and still hitting .281. He defied his doctor's orders to play in Cincinnati's final home game of the season. Nineteen days later, he was dead. He literally played until it killed him.",
    lifestyle: "Self-made man. Coal miner at 11. Brother Calvin died in the mines. Jake escaped through baseball. Invested shrewdly — real estate, cigar business, coal washery. His biggest moneymaker was the coal washery in Schuylkill Haven. He went from mining coal to profiting from it. 'A crack shot can hit a bird on the wing because the eye and his finger on the trigger act together.'",
    era_adaptability: "MODERATE. Daubert's .303 career average and elite fielding translate well. His lack of power (56 HR in 15 years) would be a severe limitation in any era after 1920. But his bunting mastery (392 sac hits) and bat control would make him an elite contact specialist in any context. He'd be a modern Ichiro-type: average, speed, defense, no power.",
    clubhouse_impact: "CAPTAIN. Daubert was the captain of every team he played on. He was elected to lead the Players' Fraternity by his peers. He was 'universally popular' — modest, polite, and respected. In a clubhouse with Hal Chase's corruption and other scandals, Daubert was the moral anchor. In ILB: +1 to team integrity and +1 to team chemistry.",
    dark_side: "The death. On October 2, 1924, Daubert had an appendectomy. Complications arose. A blood transfusion failed. He died on October 9, seven days later. It was later discovered he had hemolytic spherocytosis — a hereditary blood disorder where red blood cells are oval instead of round. He was 40 years old and still an active player. His pallbearers included Edd Roush, Eppa Rixey, Rube Bressler — and Carl Mays, the man who killed Ray Chapman. The man who escaped the coal mines was killed by his own blood. In ILB: Daubert carries a 'Mortal Fragility' trait — a hidden health condition that can remove him from the game without warning.",
  },

  chemistry_traits: [
    { tag: "The Anti-Chase", desc: "Daubert was explicitly compared to Hal Chase — spectacular AND reliable. 'Flashing like Chase, but never erratic, never sulky.' When paired with Chase on the Muggers roster, +2 DEF contrast bonus: Daubert makes Chase's corruption more visible." },
    { tag: "Two Batting Titles", desc: ".350 and .329 — back-to-back NL batting champions. +1 CON in any game where Daubert is batting above .320. His bat control was his superpower." },
    { tag: "The Bunter", desc: "392 career sacrifice hits — NL record, 2nd all-time in MLB. 4 sac bunts in one game on a bad ankle. Daubert can advance any runner with 95% success rate. The lost art of the sacrifice." },
    { tag: "Captain", desc: "Captained both Brooklyn and Cincinnati. VP of the Players' Fraternity. +1 team morale. Daubert is the natural leader — elected, not appointed." },
    { tag: "Coal Miner's Son", desc: "Worked the mines at 11. Brother Calvin killed underground. Daubert carries the toughness of a man who escaped death once and never forgot. +1 endurance in adverse conditions." },
    { tag: "Tiger About Money", desc: "'Modest, polite and colorless, though a tiger about money.' Daubert sued for his salary and won. His off-field investments outearned his playing salary. +1 financial stability; will not accept unfair contracts." },
    { tag: "Mortal Fragility", desc: "Undiagnosed hemolytic spherocytosis. Daubert can be removed from the game at any time by a health event. 5% chance per season. If triggered: permanent removal. The cruelest trait in ILB." },
    { tag: "Mays's Pallbearer", desc: "Carl Mays — the man who killed Ray Chapman — carried Daubert's coffin. In ILB, Chapman and Daubert are linked by death and by Mays. If both are on the same roster, a special 'Mortality' narrative triggers." },
  ],

  preferred_locations: [
    { location: "Ebbets Field / Brooklyn", affinity: "HIGH", note: "Nine seasons as Brooklyn's captain and star. Nominated for Alderman. 'Universally popular.'" },
    { location: "First Base", affinity: "HIGH", note: "Led NL in FP 3×. Never below .989. The best honest defensive 1B in the Deadball NL." },
    { location: "Business Office", affinity: "HIGH", note: "Invested in real estate, cigars, coal washery, poolroom, semi-pro team, ice, and movies. Made more money off the field." },
    { location: "Coal Country / Pennsylvania", affinity: "MEDIUM", note: "Born Shamokin, buried Pottsville. Escaped the mines but never forgot them. His coal washery was his biggest moneymaker." },
    { location: "Union Hall", affinity: "MEDIUM", note: "VP of Players' Fraternity. Sued for his salary. A labor activist in an era when players had no power." },
    { location: "Hospital", affinity: "NONE", note: "Died on the operating table at 40. Defied his doctor to play one more game. It cost him everything." },
  ],

  momentum: {
    hot_triggers: [
      "Regular season — Daubert was a machine from April to September. .303 career average sustained over 15 years and 2,014 games.",
      "Batting races — the competition for the batting title brought out his best. .350 in 1913, .329 in 1914.",
      "Business success — when his off-field investments thrived, Daubert played with confidence and security.",
      "Captaincy — being the leader gave him purpose. He played his best when the team looked to him.",
    ],
    cold_triggers: [
      "October — .176 in the 1916 WS, .241 in the 1919 WS. Daubert vanished when the spotlight was brightest.",
      "Health issues — beaned in 1924, suffered headaches and difficulty sleeping. His body was failing before anyone knew why.",
      "Contract disputes — the 1918 salary fight with Ebbets distracted him and led to his trade.",
      "Aging — by 1923-24, the oldest regular in the majors, holding on by will alone.",
    ],
    pressure_response: "INVERTED. Daubert is the opposite of Larry Gardner and Sherry Smith. Where they transcended in October, Daubert diminished. His regular-season excellence — .303 career, 2× batting champion, MVP — evaporated in the World Series. .176 and .241. No signature October moment. In ILB, Daubert is the player you build your lineup around from April to September and then agonize over in October. His CLU of 0 is the price you pay for CON of 5 and DEF of 2. You can't have everything. Baseball is cruel that way.",
  },

  action_card_seeds: [
    {
      title: "The Anti-Chase",
      type: "Action",
      text: "Your first baseman is compared to the most spectacular defender in the game — but unlike that other man, yours is never erratic, never sulky, never indifferent. 'Flashing and sensational, but unlike Chase, never prone to sudden error.' Baseball Magazine concludes: 'He is the most valuable first sacker playing the game.'",
      origin: "Baseball Magazine explicitly compared Daubert to Hal Chase, concluding that Daubert was more valuable because he combined Chase's flash with complete reliability.",
    },
    {
      title: "Four Bunts on a Bad Ankle",
      type: "Game Action",
      text: "Your first baseman has a bad ankle and can barely run. In the second game of a doubleheader, he goes 0-for-1 officially — but lays down FOUR sacrifice bunts, tying the MLB record. He advances every runner. He scores no runs himself. He doesn't need to.",
      origin: "August 15, 1914: Daubert laid down 4 sac bunts in one game vs Philadelphia, tying Cy Seymour's record. He was injured and couldn't run, so he bunted instead.",
    },
    {
      title: "The Coal Miner's Escape",
      type: "Drama",
      text: "At age 11, your future MVP goes to work in the coal mines alongside his father and brothers. One brother will die there. Your player escapes — through a bat, a ball, and a semi-pro team in a tiny Pennsylvania town. He'll never go underground again. But he'll invest in a coal washery, turning the thing that nearly killed him into his biggest profit.",
      origin: "Daubert worked the Shamokin mines from age 11. His brother Calvin was killed in the mines. Daubert escaped through baseball and later invested in a coal washery in Schuylkill Haven.",
    },
    {
      title: "The Tiger About Money",
      type: "Action",
      text: "When the 1918 season is shortened by war, the owners prorate your captain's salary. He sues for the $2,150 balance. He wins. The owner, furious, trades him. Your captain doesn't care — he has more money from his business investments than from baseball.",
      origin: "Daubert sued Ebbets for prorated salary and won most of the $2,150. Ebbets traded him to Cincinnati in retaliation. Daubert's off-field investments outearned his playing salary.",
    },
    {
      title: "The Tainted Ring",
      type: "Drama",
      text: "Your team wins the World Series — but the other team threw it. Your captain hit .241 with 3 hits in Game 1 and 2 hits in the decisive Game 8, but the victory is forever marked by the Black Sox Scandal. The ring is real. The championship is questioned. Your captain's honest achievement is overshadowed by someone else's corruption.",
      origin: "Daubert captained the 1919 Reds to a WS victory over the Black Sox. His .241 average included a triple in the 9-1 Game 1 win and 2 hits in the 10-5 Game 8 clincher.",
    },
    {
      title: "One More Game",
      type: "Drama",
      text: "Your 40-year-old captain falls ill on a road trip. His doctor says don't play. He defies the order and plays in the team's final home game. Nineteen days later, he dies on the operating table. It is later discovered he had a hereditary blood disorder no one knew about. He is the oldest active player to die in the majors.",
      origin: "Daubert fell ill in late 1924, defied his doctor to play one more game, had an appendectomy on October 2, and died October 9 from complications and undiagnosed hemolytic spherocytosis.",
    },
    {
      title: "The Pallbearer's Paradox",
      type: "Drama",
      text: "Among the men carrying your captain's coffin is the pitcher who killed a teammate with a pitch. Carl Mays, who ended Ray Chapman's life, now helps lay Jake Daubert to rest. Death connects them all — the beaning, the blood disorder, the coal mines. In the Deadball Era, mortality was never abstract.",
      origin: "Carl Mays was a pallbearer at Daubert's funeral, alongside Edd Roush, Eppa Rixey, and Rube Bressler.",
    },
    {
      title: "Alderman Daubert",
      type: "Action",
      text: "Your first baseman is so popular in Brooklyn that fans nominate him for Alderman. He runs. He loses the election — but wins back-to-back batting titles. Some men serve the public from City Hall. Some serve them from first base.",
      origin: "Daubert was nominated for Alderman in Brooklyn. He lost the election but won the 1913-14 NL batting titles and the 1913 MVP.",
    },
  ],

  art_direction: {
    face: "Compact 5'10\" 160 lbs — lean and wiry, the build of a man who worked coal mines at 11. Clean, intelligent face with the quiet dignity of a self-made man. No flash — just competence and decency written in every line. The look of a man who escaped the underground and plays every game like it might be his last.",
    attire: "Brooklyn Superbas 1913 home whites — the MVP year. Classic Deadball Era first baseman's stance: crouched at the bag, glove extended, or mid-bunt with the extraordinary bat control that produced 392 sacrifice hits. The uniform should look immaculate — Daubert was meticulous about his appearance and his fielding.",
    mood: "Quiet dignity with mortality underneath. Daubert should radiate the steadiness of a man who has seen death in the coal mines and plays baseball as an act of survival. There's no glamour — just a deeply competent man doing his job with precision and grace. The viewer should feel both admiration and sadness: this man will die at 40, still playing.",
    style: "Sepia-toned with coal-gray undertones — Pennsylvania anthracite, the dark earth of Shamokin. The gold accents should be honest and unglamorous — no shimmer, no sparkle. This card should feel earned, like every hit in Daubert's career: nothing given, everything worked for.",
    reference: "If Wood is lightning, Chapman is a candle, Chase is a stolen jewel, Kauff is a firecracker, Marquard is a spotlight, Vaughn is a cathedral bell, Gardner is a hearthfire, and Smith is a lantern, then Daubert is a coal seam — dark, deep, valuable, and ultimately consumed. The ILB Daubert card should feel like finding a diamond in a mine: unglamorous on the surface, precious underneath, and taken from the earth too soon.",
  },
};

const STAT_ENGINE = {
  contact: { metric: "Batting Average + OPS+", tiers: [{ range: ".200-.249", value: 1 },{ range: ".250-.269", value: 2 },{ range: ".270-.299", value: 3 },{ range: ".300-.329", value: 4 },{ range: ".330+", value: 5 }], bonus: "OPS+ ≥ 130 → +1 (cap 5)" },
  power: { metric: "Home Runs (peak season) + SLG", tiers: [{ range: "0-9 HR", value: 0 },{ range: "10-19 HR", value: 1 },{ range: "20-29 HR", value: 2 },{ range: "30-39 HR", value: 3 },{ range: "40-49 HR", value: 4 },{ range: "50+ HR", value: 5 }], bonus: "SLG ≥ .500 → +1 (cap 5)" },
  speed: { metric: "Stolen Bases (peak) + positional range", tiers: [{ range: "0-5 SB", value: 0 },{ range: "6-15 SB", value: 1 },{ range: "16-30 SB", value: 2 },{ range: "31-50 SB", value: 3 }], bonus: "Gold Glove at CF/SS → +1 (cap 3)" },
  defense: { metric: "Gold Gloves + positional reputation", tiers: [{ range: "No Gold Glove", value: 0 },{ range: "1-2 GG", value: 1 },{ range: "3-5 GG", value: 2 },{ range: "6+ GG", value: 3 }] },
  overall: { formula: "CON×2 + POW×1.5 + SPD×1 + DEF×0.5 → normalized 3-13", tiers: [{ range: "3-4", label: "Replacement" },{ range: "5-6", label: "Solid Starter" },{ range: "7-8", label: "All-Star" },{ range: "9-10", label: "Elite / MVP" },{ range: "11-12", label: "Legend" },{ range: "13", label: "Mythic" }] },
  clutch: { metric: "Postseason BA + signature moments", tiers: [{ range: "PS BA < .250", value: 0 },{ range: "PS BA .250-.299", value: 1 },{ range: "PS BA .300+", value: 2 }], bonus: "World Series hero moment → +1 (cap 3)" },
};

const C = { parchment: "#f5edd6", darkBrown: "#3a2a1a", medBrown: "#6b5339", gold: "#c9a84c", warmRed: "#8b3a2a", sepia: "#a0845c", cream: "#faf3e3", ink: "#2a1f14", hotRed: "#c44536", coldBlue: "#3a6b8c", traitGreen: "#4a7c59" };

const StatBar = ({ label, value, max, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 40, fontSize: 11, fontWeight: 700, color: C.medBrown, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{label}</span><div style={{ flex: 1, height: 14, background: "#e8dcc4", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.sepia}40` }}><div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 2, transition: "width 0.8s ease" }} /></div><span style={{ width: 20, fontSize: 13, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", textAlign: "right" }}>{value}</span></div>);
const ChemTag = ({ tag }) => (<div style={{ display: "inline-flex", alignItems: "center", background: `${C.traitGreen}15`, border: `1px solid ${C.traitGreen}40`, borderRadius: 3, padding: "3px 8px", margin: "2px 3px", fontSize: 11, color: C.traitGreen, fontFamily: "'Courier Prime', monospace" }}><span style={{ fontWeight: 700 }}>{tag}</span></div>);
const Section = ({ title, children }) => (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", borderBottom: `1px solid ${C.gold}50`, paddingBottom: 4, marginBottom: 10 }}>{title}</div>{children}</div>);

export default function JakeDaubertCard() {
  const [side, setSide] = useState("front");
  const [tab, setTab] = useState("personality");
  const d = DAUBERT_DATA; const s = d.ilb_stats;
  const tabs = [{ id: "personality", label: "Dossier" },{ id: "chemistry", label: "Chemistry" },{ id: "momentum", label: "Momentum" },{ id: "actions", label: "Action Seeds" },{ id: "engine", label: "Stat Engine" },{ id: "art", label: "Art Notes" }];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2a1f14 0%, #1a150e 50%, #2a1f14 100%)", padding: "24px 12px", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, fontFamily: "'Courier Prime', monospace", textTransform: "uppercase" }}>Infinity League Baseball</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Player Card — Muggers Era</div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: C.parchment, borderRadius: 8, border: `3px solid ${C.gold}`, boxShadow: `0 0 0 1px ${C.darkBrown}, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cream}`, overflow: "hidden" }}>
        <button onClick={() => setSide(side === "front" ? "back" : "front")} style={{ width: "100%", padding: "8px 0", background: C.darkBrown, border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>
          {side === "front" ? "▼ Flip Card — View Dossier ▼" : "▲ Flip Card — View Front ▲"}
        </button>
        {side === "front" ? (
          <div style={{ padding: 20 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", border: `2px solid ${C.gold}60`, borderRadius: 4, marginBottom: 16, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, #4a4a4a20, ${C.sepia}20)` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>⛏️</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>PORTRAIT PENDING</div>
                <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, lineHeight: 1.5 }}>See Art Notes tab for<br />AI image generation prompt</div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 70%, ${C.parchment}cc 100%)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${C.darkBrown}dd`, color: C.gold, padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>OVR {s.ovr}</div>
              <div style={{ position: "absolute", top: 12, left: 12, background: `${C.warmRed}dd`, color: C.cream, padding: "4px 10px", borderRadius: 3, fontSize: 10, fontWeight: 700, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{d.position}</div>
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
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "AVG", val: d.real_stats.batting_avg },{ label: "OBP", val: d.real_stats.obp },{ label: "SLG", val: d.real_stats.slg },{ label: "R", val: d.real_stats.runs_scored },{ label: "H", val: d.real_stats.hits },{ label: "SB", val: d.real_stats.stolen_bases },{ label: "RBI", val: d.real_stats.rbi },{ label: "SAC", val: d.real_stats.career_sac_hits }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} BROOKLYN SUPERBAS — {d.real_stats.games} GAMES — NL MVP</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR AVG", val: d.real_stats.career_avg },{ label: "CAR H", val: d.real_stats.career_hits },{ label: "CAR 3B", val: d.real_stats.career_triples },{ label: "CAR HR", val: d.real_stats.career_hr },{ label: "TITLES", val: "2×" },{ label: "MVP", val: "1913" },{ label: "WS", val: "1-1" },{ label: "DIED", val: "Active" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div><div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div></div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER — 15 SEASONS • 2,326 HITS • DIED OCT 9, 1924 (ACTIVE PLAYER)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["👑 2× NL Batting Champ", "🏆 1913 NL MVP", "🏅 1919 WS Champion", "⛏️ Coal Miner at 11", "🎯 392 Sac Hits (NL Record)", "🛡️ 3× NL FP Leader", "⚖️ Players' Fraternity VP", "🕯️ Died Active (age 40)"].map((a, i) => (
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
              {tab === "personality" && (<>{Object.entries(d.personality).map(([key, val]) => (<Section key={key} title={key === "dark_side" ? "⚠ Hidden Complexity" : key.replace(/_/g, " ")}><p style={{ margin: 0, ...(key === "dark_side" ? { color: C.warmRed, fontStyle: "italic" } : {}) }}>{val}</p></Section>))}</>)}
              {tab === "chemistry" && (<>
                <Section title="Chemistry Traits"><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{d.chemistry_traits.map((t, i) => <ChemTag key={i} {...t} />)}</div><div style={{ marginTop: 12 }}>{d.chemistry_traits.map((t, i) => (<div key={i} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, color: C.traitGreen }}>{t.tag}:</span> <span style={{ color: C.medBrown }}>{t.desc}</span></div>))}</div></Section>
                <Section title="Preferred Locations">{d.preferred_locations.map((l, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 2, background: l.affinity === "HIGH" ? `${C.traitGreen}20` : l.affinity === "MEDIUM" ? `${C.gold}20` : l.affinity === "NONE" ? `${C.warmRed}20` : `${C.sepia}20`, color: l.affinity === "HIGH" ? C.traitGreen : l.affinity === "MEDIUM" ? C.gold : l.affinity === "NONE" ? C.warmRed : C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "nowrap", minWidth: 40, textAlign: "center" }}>{l.affinity}</span><div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> — {l.note}</span></div></div>))}</Section>
              </>)}
              {tab === "momentum" && (<>
                <Section title="🔥 Hot Triggers">{d.momentum.hot_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.hotRed }}>▸ {t}</div>))}</Section>
                <Section title="❄ Cold Triggers">{d.momentum.cold_triggers.map((t, i) => (<div key={i} style={{ padding: "3px 0", color: C.coldBlue }}>▸ {t}</div>))}</Section>
                <Section title="Pressure Response"><p style={{ margin: 0, fontWeight: 700, color: C.warmRed }}>{d.momentum.pressure_response}</p></Section>
              </>)}
              {tab === "actions" && (<>
                <Section title="Action Card Seeds">
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Daubert's real life, become universal cards playable in any game.</p>
                  {d.action_card_seeds.map((a, i) => (<div key={i} style={{ background: `${C.darkBrown}08`, border: `1px solid ${C.sepia}30`, borderRadius: 4, padding: 10, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontWeight: 900, color: C.ink }}>{a.title}</span><span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: a.type === "Drama" ? `${C.warmRed}20` : a.type === "Game Action" ? `${C.coldBlue}20` : `${C.gold}20`, color: a.type === "Drama" ? C.warmRed : a.type === "Game Action" ? C.coldBlue : C.medBrown, fontFamily: "'Courier Prime', monospace", fontWeight: 700 }}>{a.type}</span></div><p style={{ margin: "0 0 4px 0", fontSize: 12 }}>{a.text}</p><p style={{ margin: 0, fontSize: 10, fontStyle: "italic", color: C.sepia }}>Origin: {a.origin}</p></div>))}
                </Section>
              </>)}
              {tab === "engine" && (<>
                <Section title="Stat Conversion Engine"><p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Reusable formula for converting real stats into ILB card values.</p>{Object.entries(STAT_ENGINE).map(([key, data]) => (<div key={key} style={{ marginBottom: 12 }}><div style={{ fontWeight: 900, color: C.ink, textTransform: "uppercase", fontSize: 11 }}>{key} — {data.metric || data.formula}</div>{data.tiers && (<div style={{ marginTop: 4 }}>{data.tiers.map((t, i) => (<div key={i} style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{t.range} → {t.value !== undefined ? t.value : t.label}</div>))}</div>)}{data.bonus && <div style={{ fontSize: 10, color: C.traitGreen, marginTop: 2 }}>Bonus: {data.bonus}</div>}</div>))}</Section>
                <Section title="Daubert's Derivation">{Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}</Section>
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
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: d.ilb_stats, chemistry_traits: d.chemistry_traits.map(t => t.tag), preferred_locations: d.preferred_locations.map(l => ({ location: l.location, affinity: l.affinity })), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
