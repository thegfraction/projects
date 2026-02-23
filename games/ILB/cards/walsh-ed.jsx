import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}walsh-ed.png`;

const PLAYER_DATA = {
  name: "Ed Walsh",
  nickname: "Big Ed",
  year: 1908,
  team: "Chicago White Sox",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'1"',
  weight: "193 lbs",
  born: "May 14, 1881 — Plains Township, PA",
  died: "May 26, 1959 — Pompano Beach, FL (age 78)",
  hof: "Inducted 1946 (Veterans Committee). Lowest career ERA in MLB history (1.82).",

  real_stats: {
    season: 1908, games: 66, wins: 40, losses: 15, era: "1.42",
    innings: "464.0", strikeouts: 269, walks: 56, complete_games: 42,
    shutouts: 11, whip: "0.81", war: 11.9,
    career_wins: 195, career_losses: 126, career_era: "1.82",
    career_strikeouts: 1736, career_cg: 250, career_shutouts: 57,
    career_war: 62.3, no_hitters: 1, perfect_games: 0,
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT ENGINE (established with Cy Young card)
  //
  // STF: ERA tiers. 1.42 → tier 5 (<1.50). K/9 = 5.21 → no bonus. STF = 5.
  // CTL: BB/9 = 1.09 → tier 4 (1.0-1.49). WHIP 0.81 → +1 bonus = 5.
  // STA: 464.0 IP → tier 5 (350+). All-time single-season record (post-1900).
  // DEF: Decent fielding pitcher. Helped design Comiskey Park. Rating 1.
  // CLU: Won 2 games in 1906 WS (1 ER in 15 IP, 17 K). Rating 2.
  // OVR: STF(5)×2 + CTL(5)×1.5 + STA(5)×1 + DEF(1)×0.5 = 10+7.5+5+0.5 = 23 → normalized ≈ 12 (Legend)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 11,     // Legend — one of the greatest single seasons ever
    stf: 5,      // 1.42 ERA → tier 5 (<1.50). 269 K in 464 IP. K/9 of 5.21 — just under the bonus threshold. But 1.42 ERA earns maximum stuff.
    ctl: 5,      // BB/9 of 1.09 in 1908 — only 56 walks in 464 innings. WHIP 0.81 (absurd). Tier 4 + WHIP bonus = 5 (max).
    sta: 5,      // 464 IP — the all-time post-1900 record. 42 complete games in 66 appearances. He pitched every other day. Won both ends of a doubleheader twice. Maximum.
    def: 1,      // Decent fielding pitcher. Helped design Comiskey Park's dimensions. Above average, not elite.
    clu: 2,      // Won 2 games in 1906 WS (17 K, 1 ER in 15 IP). Kept 1908 pennant race alive with superhuman September. Rating 2.
  },

  stat_justification: {
    stf: "1.42 ERA in 1908 — led the AL and one of the lowest single-season ERAs in history. 269 strikeouts (led AL). 11 shutouts (AL record). The spitball was his weapon: Sam Crawford said 'I swear, when it went past the plate it was just the spit.' Walsh estimated he threw the spitter 90% of the time with pinpoint control. K/9 of 5.21 — respectable but not dominant by strikeout standards. However, the ERA is so absurdly low that this is a maximum 5.",
    ctl: "BB/9 of 1.09 in 1908 — only 56 walks in 464 innings. WHIP of 0.81 — among the lowest ever recorded for a season with that many innings. Walsh's control of the spitball was considered the best in baseball. He disguised the pitch by going to his mouth before every delivery. Tier 4 (1.0-1.49 BB/9) + WHIP bonus = 5 (max).",
    sta: "464 innings pitched in 1908 — the all-time post-1900 single-season record. 42 complete games in 66 appearances (starting AND relieving). Won both ends of a doubleheader twice. During one 9-day stretch, he pitched 5 times. He averaged 375 IP per year from 1907-12. This is the most extreme stamina case in the ILB database. Maximum 5.",
    def: "Decent fielder. Helped design Comiskey Park's pitcher-friendly dimensions — a meta-defensive contribution. But no notable defensive awards or records as a fielding pitcher. Rating of 1.",
    clu: "Won 2 games in the 1906 World Series vs. the Cubs — 17 K, 1 ER in 15 IP. His Game 3 shutout gave the 'Hitless Wonders' a 2-1 Series lead. In 1908, he pitched a four-hitter on October 2 but lost to Addie Joss's perfect game — one of the cruelest losses in baseball history. Kept the 1908 pennant race alive with superhuman September pitching (1.31 ERA in 130.1 IP). Rating of 2.",
  },

  personality: {
    leadership_style: "The Workhorse. Walsh led by sheer physical will — he simply refused to leave the mound. When the White Sox needed him, he pitched. Every other day. Both ends of doubleheaders. Start and relief in the same week. His leadership was: 'Give me the ball.' He didn't need speeches. He needed the rubber.",
    temperament: "Proud, stoic, Irish tough. Walsh worked in Pennsylvania coal mines as a child — one of 13 children born to Irish immigrants. He carried that working-class grit into his pitching. When his arm was destroyed by overwork, he tried to come back repeatedly. He tried umpiring. He tried coaching. He never stopped working. When the White Sox asked him to return despite his arm problems: 'The White Sox needed me — implored me to return — so I did.'",
    work_ethic: "INHUMAN. Walsh's workload would be considered abuse by modern standards. 464 IP in a single season. 375 IP per year for six straight years. He pitched both games of doubleheaders — and won both. During September 1908, he threw 130.1 innings in a single month with a 1.31 ERA. He split wood? No — he split his own arm open from the inside.",
    lifestyle: "Born in Plains Township, PA, to Irish immigrants. One of 13 children. Worked in Luzerne County coal mines as a boy. Briefly attended Fordham University. Married Rosemary. Son Ed Jr. also pitched for the White Sox (1928-32) — but died of rheumatic fever at 32. After retirement, Walsh coached at Notre Dame and umpired in the AL (87 games in 1922). By the late 1950s, cancer reduced him from 200 lbs to under 100. The White Sox held an Ed Walsh Day in 1958 to help pay his medical bills — raising $5,000.",
    era_adaptability: "COMPLEX. Walsh's spitball was outlawed in 1920 — his primary weapon wouldn't exist in the modern game. However, his control, deception, and competitive fire would translate. He'd likely be a sinker/slider pitcher with elite command — a modern ground-ball machine. His stamina would be irrelevant since modern pitchers are limited to 200 IP. What would translate perfectly: his ability to pitch under extreme pressure.",
    clubhouse_impact: "ACE PRESENCE. Walsh was the unquestioned ace — the man the entire franchise depended on. The 'Hitless Wonders' literally couldn't score — they hit .230 as a team — so everything rested on Walsh's arm. He carried that weight without complaint. Teammates knew: when Walsh was pitching, they had a chance.",
    dark_side: "The arm. Walsh's arm was destroyed by the inhuman workload Comiskey demanded. 'I could feel the muscles grind and wrench during the game, and it seemed to me my arm would leap out of my socket when I shot the ball across the plate. My arm would keep me awake till morning with a pain I had never known before.' From 1913 on, he was a ghost — pitching only 16 games, then 13, then his arm was dead. Comiskey, the cheapest owner in baseball, released him rather than giving him a year off. In ILB terms: Walsh carries a 'Burned Out' trait — he is the most dominant pitcher alive for 6-7 years, then his arm dies completely.",
  },

  chemistry_traits: [
    { tag: "Lowest ERA Ever", desc: "1.82 career ERA — the lowest in MLB history. Walsh sets the ERA standard for all future pitchers on the roster. +1 team pitching morale permanently." },
    { tag: "The Spitball", desc: "Walsh threw the spitter 90% of the time. When the spitball is legal, +2 STF. If it's banned, -2 STF (Walsh becomes mortal)." },
    { tag: "Coal Miner's Son", desc: "Worked in coal mines as a child. Walsh is immune to fatigue complaints and never requests days off. His pain threshold is infinite." },
    { tag: "Workhorse", desc: "464 IP in 1908. Walsh can pitch on 1 day's rest with no penalty. He can start and relieve in the same series." },
    { tag: "Hitless Wonders", desc: "Carried the worst-hitting team in the AL to a World Series title. Walsh gains +1 OVR when his team's batting average is below .240." },
    { tag: "Park Designer", desc: "Helped design Comiskey Park's dimensions. When pitching in his home park, +1 to all stats. The park favors pitchers for 80 years." },
    { tag: "Burned Out", desc: "CRITICAL FLAW: After 7 seasons of heavy use, Walsh's arm dies permanently. -5 STF. No recovery possible. The greatest arm in baseball becomes useless." },
    { tag: "Walsh Day", desc: "When Walsh's career ends, the franchise holds a benefit day. +2 fan loyalty. But the money raised is never enough." },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "464 innings. 66 games. 42 complete games. The mound was his coal mine." },
    { location: "Comiskey Park", affinity: "HIGH", note: "Helped design the park. Pitcher-friendly for 80 years because of his input." },
    { location: "Coal Mine / Factory", affinity: "HIGH", note: "Worked in Luzerne County mines as a child. One of 13 children of Irish immigrants." },
    { location: "Clubhouse / Training Room", affinity: "MEDIUM", note: "Stoic presence. Not the loudest voice but the most respected arm." },
    { location: "Notre Dame / University", affinity: "MEDIUM", note: "Coached baseball at Notre Dame. Briefly attended Fordham." },
    { location: "Umpire's Position", affinity: "LOW", note: "Tried umpiring in 1922 (87 AL games). It didn't stick." },
    { location: "Hospital / Doctor's Office", affinity: "LOW", note: "Cancer reduced him from 200 lbs to under 100 lbs. Died in 1959." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — Walsh was superhuman in September 1908 (1.31 ERA in 130.1 IP)",
      "Tight games — his low ERA means almost every game is close",
      "Back-to-back starts — Walsh gets better the more he pitches (to a point)",
      "Hitless supporting cast — Walsh rises when his team can't score",
    ],
    cold_triggers: [
      "Arm fatigue (cumulative) — each season of 300+ IP brings him closer to the cliff",
      "Spring training overexertion — trying to keep up with younger pitchers",
      "Comiskey's cheapness — Walsh never felt adequately compensated for his destruction",
    ],
    pressure_response: "ELITE. Walsh was at his absolute best in the biggest moments. 1906 World Series: 2 wins, 17 K, 1 ER in 15 IP against the 116-win Cubs. September 1908: 130.1 IP with a 1.31 ERA in a four-team pennant race. October 2, 1908: pitched a brilliant four-hitter but lost to Addie Joss's perfect game — proving that even Walsh's best sometimes wasn't enough. In ILB: Walsh is a Game 7 ace. You give him the ball and accept whatever happens.",
  },

  action_card_seeds: [
    { title: "Forty Wins", type: "Game Action", text: "Your ace wins his 40th game of the season — the last pitcher in history to reach this number. He also leads the league in ERA, strikeouts, innings, shutouts, and games. He is single-handedly keeping your team in the pennant race.", origin: "Walsh went 40-15 with a 1.42 ERA in 1908 — leading the AL in wins, K, ERA, IP (464), shutouts (11), and games (66). The last 40-win season in MLB history." },
    { title: "The Perfect Game Loss", type: "Drama", text: "Your ace pitches a four-hitter with 15 strikeouts — and loses. Because the opposing pitcher threw a perfect game. One of the cruelest outcomes in baseball history. Your pitcher gains -1 morale but +2 respect.", origin: "On October 2, 1908, Walsh pitched brilliantly but lost 1-0 to Cleveland's Addie Joss, who threw a perfect game. Walsh struck out 15 and allowed just 4 hits." },
    { title: "Both Ends of the Doubleheader", type: "Game Action", text: "Your ace starts both games of a doubleheader — and wins both. He allows 1 total run over 18 innings. The crowd can't believe what they're seeing.", origin: "Walsh won both games of doubleheaders twice — September 26, 1905 (10-5, 3-1) and September 29, 1908 (5-1, 2-0), allowing just 1 run in the latter." },
    { title: "The Spitball Apprentice", type: "Action", text: "Your pitcher rooms with a spitball specialist in spring training and learns the pitch. It takes two years to master. When he does, +2 STF permanently — but the pitch may someday be outlawed.", origin: "Walsh roomed with Elmer Stricklett in 1904 spring training and learned the spitball. He didn't use it regularly until 1906. When he mastered it, he became unhittable." },
    { title: "The Coal Miner's Arm", type: "Drama", text: "A boy from the coal mines has the strongest arm in baseball. For 7 seasons, he is indestructible. Then the arm breaks — not from one pitch, but from ten thousand. 'I could feel the muscles grind and wrench.' His career is over.", origin: "Walsh averaged 375 IP from 1907-12. After 1912, his arm was destroyed. He pitched 16 games in 1913, then faded completely. Comiskey released him rather than giving him rest." },
    { title: "The Hitless Wonders", type: "Game Action", text: "Your team hits .230 — the worst in the league. But your pitching staff, led by your ace, carries you to the World Series. And you win. Against a team that won 116 games.", origin: "The 1906 White Sox hit .230 as a team but beat the 116-win Cubs in the World Series. Walsh won 2 games, struck out 17, and allowed 1 ER in 15 IP." },
    { title: "Designing the Park", type: "Action", text: "Your veteran pitcher consults with the architect on the new stadium's dimensions. He chooses measurements that favor pitchers. The park remains pitcher-friendly for 80 years.", origin: "Walsh reportedly consulted architect Zachary Taylor Davis on Comiskey Park's dimensions, making it a pitcher's park for its entire 80-year history." },
    { title: "The Benefit Day", type: "Drama", text: "Your greatest pitcher is dying. He weighs under 100 pounds. The franchise holds a benefit day and raises $5,000 for his medical bills. It's not enough. He dies two weeks after his birthday.", origin: "By the late 1950s, Walsh had cancer and weighed under 100 lbs. The White Sox held Ed Walsh Day in 1958, raising $5,000. He died on May 26, 1959." },
  ],

  art_direction: {
    face: "Strong, angular Irish face — 6'1\" 193 lbs, unusually tall for the era. High cheekbones, deep-set intense eyes, square jaw. The face of a man who worked in coal mines before he worked on a mound. There's an exhaustion behind the intensity — the look of someone who has given everything and knows it's not sustainable.",
    attire: "Chicago White Sox 1908 home whites — the 'Hitless Wonders' era uniform. Mid-delivery, the distinctive spitball release. His right hand should be near his mouth — the telltale gesture he used before every pitch (even non-spitters) to disguise his intentions. Full windup showing the enormous physical effort of the delivery.",
    mood: "Relentless intensity. Not joyful like Bodie or serene like Young — this is controlled fury. The coal miner's son who will pitch until his arm falls off. There's something almost tragic in the image — you can see the greatness and the destruction happening simultaneously. Walsh is both the most dominant and the most doomed pitcher in the set.",
    style: "Dark, heavy sepia — the darkest card after Cy Young. Industrial Chicago undertones — smokestacks, steelworks, the South Side. The background suggests both Comiskey Park and the coal country he came from. Heavy ornate border with industrial/Celtic motifs. Aged paper with significant wear — this card has been through something. It survived, barely.",
    reference: "Think of the T206 Walsh as the card that makes collectors wince — not from value, but from knowing what happened to the arm. ILB sepia at its most tragic-heroic. Walsh should look like the card equivalent of watching a man carry a building on his back: awe-inspiring and heartbreaking in equal measure.",
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

export default function EdWalshCard() {
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
          {side === "front" ? "\u25bc Flip Card \u2014 View Dossier \u25bc" : "\u25b2 Flip Card \u2014 View Front \u25b2"}
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
              <div style={{ fontSize: 32, fontWeight: 900, color: C.ink, letterSpacing: -0.5, lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.sepia, fontFamily: "'Courier Prime', monospace", marginTop: 4, letterSpacing: 2 }}>"{d.nickname}" \u2014 {d.team} \u2014 {d.year}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <StatBar label="STF" value={s.stf} max={5} color={C.hotRed} />
              <StatBar label="CTL" value={s.ctl} max={5} color={C.gold} />
              <StatBar label="STA" value={s.sta} max={5} color={C.coldBlue} />
              <StatBar label="DEF" value={s.def} max={3} color={C.traitGreen} />
              <StatBar label="CLU" value={s.clu} max={3} color={C.warmRed} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: C.darkBrown, borderRadius: 4, padding: 10 }}>
              {[{ label: "W-L", val: `${d.real_stats.wins}-${d.real_stats.losses}` },{ label: "ERA", val: d.real_stats.era },{ label: "K", val: d.real_stats.strikeouts },{ label: "BB", val: d.real_stats.walks },{ label: "IP", val: d.real_stats.innings },{ label: "CG", val: d.real_stats.complete_games },{ label: "WHIP", val: d.real_stats.whip },{ label: "WAR", val: d.real_stats.war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, color: C.cream, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>{d.year} SEASON STATS \u2014 {d.real_stats.games} GAMES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, background: `${C.darkBrown}15`, borderRadius: 4, padding: 8, marginTop: 8, border: `1px solid ${C.sepia}30` }}>
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR L", val: d.real_stats.career_losses },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR CG", val: d.real_stats.career_cg },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS \u2014 14 SEASONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\u2b50 HOF 1946", "\ud83d\udc51 Lowest Career ERA (1.82)", "\ud83d\udd25 Last 40-Win Season", "\ud83c\udfc6 1906 WS Champion", "\ud83d\udca7 Spitball Master", "\ud83c\udfdb\ufe0f Designed Comiskey Park", "\u26cf\ufe0f Coal Miner's Son", "\ud83d\udcdc 464 IP Record"].map((a, i) => (
                <span key={i} style={{ fontSize: 9, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, padding: "2px 8px", borderRadius: 10, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>{a}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{d.name}</div>
              <div style={{ fontSize: 10, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CLASSIFIED DOSSIER \u2014 {d.year}</div>
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
                      <div><span style={{ fontWeight: 700 }}>{l.location}</span><span style={{ color: C.sepia, fontSize: 11 }}> \u2014 {l.note}</span></div>
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Walsh's real life, become universal cards playable in any game.</p>
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
                <Section title="\u26be Pitcher Stat Engine">
                  <p style={{ margin: "0 0 8px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>Pitchers use STF (Stuff) / CTL (Control) / STA (Stamina) / DEF / CLU.</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>STUFF \u2014 ERA tiers</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;1.50\u21925 | 1.50-1.99\u21924 | 2.00-2.49\u21923 | 2.50-2.99\u21922 | 3.00-3.49\u21921 | 3.50+\u21920</div>
                    <div style={{ fontSize: 10, color: C.traitGreen }}>Bonus: K/9 \u2265 6.0 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>CONTROL \u2014 BB/9 tiers</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;1.0\u21925 | 1.0-1.49\u21924 | 1.5-1.99\u21923 | 2.0-2.49\u21922 | 2.5-2.99\u21921 | 3.0+\u21920</div>
                    <div style={{ fontSize: 10, color: C.traitGreen }}>Bonus: WHIP \u2264 1.00 \u2192 +1 (cap 5)</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>STAMINA \u2014 Innings Pitched</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>&lt;150\u21920 | 150-199\u21921 | 200-249\u21922 | 250-299\u21923 | 300-349\u21924 | 350+\u21925</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 900, color: C.ink, fontSize: 11 }}>OVERALL \u2014 STF\u00d72 + CTL\u00d71.5 + STA\u00d71 + DEF\u00d70.5</div>
                    <div style={{ fontSize: 11, color: C.medBrown, fontFamily: "'Courier Prime', monospace" }}>3-4 Replacement | 5-6 Solid | 7-8 All-Star | 9-10 Elite | 11-12 Legend | 13 Mythic</div>
                  </div>
                </Section>
                <Section title="Walsh's Derivation">
                  {Object.entries(d.stat_justification).map(([key, val]) => (<div key={key} style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, textTransform: "uppercase", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown, fontSize: 11 }}>{val}</span></div>))}
                </Section>
              </>)}
              {tab === "art" && (<Section title="Visual Art Direction">{Object.entries(d.art_direction).map(([key, val]) => (<div key={key} style={{ marginBottom: 10 }}><span style={{ fontWeight: 700, textTransform: "capitalize", color: C.ink }}>{key}:</span> <span style={{ color: C.medBrown }}>{val}</span></div>))}</Section>)}
            </div>
          </div>
        )}
        <div style={{ background: C.darkBrown, padding: "6px 16px", display: "flex", justifyContent: "space-between", fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>
          <span>ILB CARD #{d.ilb_team}</span>
          <span>{d.era} \u2022 {d.position} \u2022 OVR {s.ovr}</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420, marginTop: 20, background: "#1a150e", borderRadius: 6, padding: 16, border: `1px solid ${C.gold}30` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontFamily: "'Courier Prime', monospace", marginBottom: 8 }}>JSON EXPORT PREVIEW</div>
        <pre style={{ fontSize: 9, color: C.sepia, fontFamily: "'Courier Prime', monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, lineHeight: 1.4, maxHeight: 200, overflow: "auto" }}>
{JSON.stringify({ name: d.name, nickname: d.nickname, year: d.year, position: d.position, era: d.era, ilb_team: d.ilb_team, stats: { ovr: s.ovr, stf: s.stf, ctl: s.ctl, sta: s.sta, def: s.def, clu: s.clu }, chemistry_traits: d.chemistry_traits.map(t => t.tag), hot_triggers: d.momentum.hot_triggers, cold_triggers: d.momentum.cold_triggers, action_seeds: d.action_card_seeds.length }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
