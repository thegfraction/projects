import { useState } from "react";

const IMAGES_BASE = "https://raw.githubusercontent.com/thegfraction/projects/b9a611655116268b1910dda04fcb97fd0d03b2d1/games/ILB/images/";
const PLAYER_IMG = `${IMAGES_BASE}joss-addie.png`;

const PLAYER_DATA = {
  name: "Addie Joss",
  nickname: "The Human Hairpin",
  year: 1908,
  team: "Cleveland Naps",
  era: "1900s",
  ilb_team: "Banners AL1900",
  position: "SP",
  bats: "R",
  throws: "R",
  height: '6\'3"',
  weight: "185 lbs",
  born: "April 12, 1880 — Woodland, WI",
  died: "April 14, 1911 — Toledo, OH (age 31). Two days after his birthday. Tubercular meningitis.",
  hof: "Inducted 1978 (Veterans Committee). Only player to have the 10-year minimum rule waived. Lowest career WHIP in MLB history (0.968).",

  real_stats: {
    season: 1908, games: 42, wins: 24, losses: 11, era: "1.16",
    innings: "325.0", strikeouts: 130, walks: 30, complete_games: 29,
    shutouts: 9, whip: "0.806", war: 10.0,
    career_wins: 160, career_losses: 97, career_era: "1.89",
    career_strikeouts: 920, career_cg: 234, career_shutouts: 45,
    career_war: 44.4, no_hitters: 2, perfect_games: 1,
  },

  // ═══════════════════════════════════════════════════════════════
  // PITCHER STAT ENGINE
  // STF: 1.16 ERA → tier 5 (<1.50). K/9 = 3.60 → no bonus. STF = 5.
  //   Note: Joss's ERA is absurdly low (1.16 — 9th lowest single season ever).
  //   But his K rate is low — he's a control/deception pitcher, not a power pitcher.
  //   STF reflects the ERA — hitters simply could not score against him.
  // CTL: BB/9 = 0.83 → tier 5 (<1.0). WHIP 0.806 → +1 bonus = 6, capped at 5. CTL = 5.
  //   30 walks in 325 innings. 0.968 career WHIP — lowest in MLB history.
  //   This is the most precise control pitcher in the ILB database (even above Cy Young's 0.90 BB/9).
  // STA: 325 IP → tier 4 (300-349). STA = 4.
  //   But Joss's stamina is complicated — he was always battling illness.
  //   Malaria in 1904. Fatigue in 1909-10. Dead at 31. Physical fragility.
  // DEF: Good fielder for a pitcher. Rating 1.
  // CLU: Perfect game in pennant race on 74 pitches vs Walsh. Rating 3.
  //   The most clutch pitching performance in the dead-ball era, arguably ever.
  //   But never reached the World Series (Naps finished 0.5 GB in 1908). Rating 3.
  // OVR: STF(5)×2 + CTL(5)×1.5 + STA(4)×1 + DEF(1)×0.5 = 10+7.5+4+0.5 = 22 → normalized ≈ 11 (Legend)
  // ═══════════════════════════════════════════════════════════════

  ilb_stats: {
    ovr: 11,     // Legend — perfect precision, tragic brevity
    stf: 5,      // 1.16 ERA in 1908. Career 1.89 (2nd lowest ever). Not a power pitcher — a deception artist. The corkscrew delivery hid the ball completely. Bobby Wallace: 'One moment, you'd be squinting at a long, graceful windup and the next instant, out of nowhere, the ball was hopping across the plate.'
    ctl: 5,      // BB/9 of 0.83 in 1908 — 30 walks in 325 IP. Career WHIP 0.968 — lowest in MLB history. Perfect game on 74 pitches. Maximum 5. The most precise pitcher in this entire set.
    sta: 4,      // 325 IP in 1908. But health was always fragile — malaria 1904, fatigue 1909-10, dead at 31. Rating 4 reflects the innings logged but acknowledges the fragility.
    def: 1,      // 10 assists in his second no-hitter (an all-time record for pitchers). Good fielding pitcher. Rating 1.
    clu: 3,      // Perfect game on 74 pitches in a pennant race vs Ed Walsh (who was brilliant — 4-hitter, 15 K). The most clutch single-game pitching performance imaginable. Maximum 3.
  },

  stat_justification: {
    stf: "1.16 ERA in 1908 — the 9th lowest single-season ERA in MLB history. Career 1.89 ERA — 2nd lowest ever behind Walsh. Joss was not a strikeout pitcher (K/9 of 3.60). His dominance came from the corkscrew delivery — he turned his back to the batter, hid the ball completely, then delivered from a sidearm/three-quarter slot. Bobby Wallace: 'Out of nowhere, the ball was hopping across the plate.' Baseball Magazine: 'Having it on the batter almost before the latter got sight of it.' His 1908 ERA of 1.16 earns the maximum 5.",
    ctl: "BB/9 of 0.83 in 1908 — only 30 walks in 325 innings. Career WHIP of 0.968 — the lowest in MLB history. Career BB/9 of 1.43. Perfect game thrown on just 74 pitches — meaning nearly every pitch was a strike or resulted in weak contact. This is the most precise pitcher in the entire ILB collection. Even Cy Young (0.90 BB/9) walks more batters. Maximum 5.",
    sta: "325 IP in 1908. 29 complete games. 234 career CG in only 9 seasons. But Joss was physically fragile — malaria in 1904, arm trouble and fatigue in 1909-10, fainting spells in 1911, dead at 31 from tubercular meningitis. His body couldn't sustain what his arm could do. Rating 4 — high innings but flagged for fragility.",
    def: "Joss handled 10 assists in his second no-hitter (1910) — an all-time record for pitchers in a no-hitter. Good fielding pitcher, especially for his tall frame (6'3\"). Rating 1.",
    clu: "October 2, 1908: Three teams separated by 1.5 games with 3 games left. Joss vs. Walsh — two future Hall of Famers. Walsh struck out 15 and allowed 4 hits. Joss was perfect — 74 pitches, 27 up, 27 down. The New York Times called it 'the most astonishing clutch job baseball has had.' Joss never reached the WS (Cleveland finished 0.5 GB), but this single game is the most clutch pitching performance in dead-ball history. Maximum 3.",
  },

  personality: {
    leadership_style: "The Quiet Professional. Joss led by example and by intelligence. He was college-educated (St. Mary's, University of Wisconsin), a working sportswriter, an inventor, and the most respected man in the Cleveland clubhouse. Napoleon Lajoie — his manager — called him 'one of the best pitchers and men that has ever been identified with the game.' Cy Young: 'He was a great man. I feel sure he never made an enemy.'",
    temperament: "Calm, intellectual, universally beloved. Joss was the opposite of Waddell in every way — where Rube was chaos, Addie was order. He was scholarly, articulate, and self-possessed. He wrote for the Cleveland Press and Toledo News-Bee with such quality that the editorial board said he 'would have adorned any profession.' He designed an electronic scoreboard (the Joss Indicator). He was as comfortable at a typewriter as on a mound.",
    work_ethic: "PRECISE AND METHODICAL. Joss approached pitching like an engineering problem. 74 pitches for a perfect game — that's not just talent, it's efficiency designed by intellect. He studied hitters, planned his sequences, and wasted nothing. His offseason was spent writing, inventing, and preparing. No wasted motion, no wasted pitch, no wasted day.",
    lifestyle: "College-educated Midwesterner. Born in Wisconsin, educated at St. Mary's and University of Wisconsin. Married Lillian Shinivar in 1902 — they had two children, Norman and Ruth. Joss was a family man and community pillar. He was a sportswriter whose columns were so popular they increased newspaper circulation. He covered the World Series for multiple papers (1907-09). The Cleveland Press introduced him: 'Of all the baseball players in the land, Addie Joss is far and away the best qualified for this work.'",
    era_adaptability: "VERY HIGH. Joss's skill set — deception, pinpoint control, pitch efficiency — translates perfectly to the modern game. He's a Greg Maddux prototype, decades before Maddux. 74 pitches for a perfect game. In today's analytics-driven environment, Joss would be valued enormously. His health wouldn't survive a modern workload either, but his talent would be recognized immediately.",
    clubhouse_impact: "BELOVED. When Joss died, Cleveland's Opening Day was postponed for his funeral — one of the largest in Toledo history. Billy Sunday (ex-player turned evangelist) preached the service. The American League's best players organized a benefit game — Cobb, Speaker, Collins, Crawford, Walter Johnson — the first proto-All-Star Game. It raised nearly $13,000 for Lillian and the children. No dead-ball player was more universally mourned.",
    dark_side: "The body. Joss's body was always failing him. Malaria in 1904. Arm trouble. Fatigue that benched him for September 1909. Fainting spells in 1911. He fainted while talking to a friend before an exhibition game in Chattanooga — and never recovered. Dead at 31, two days after his birthday. His career was only 9 seasons — the HOF had to waive its 10-year rule to induct him. In ILB terms: Joss carries a 'Glass Genius' trait — he is perfect when healthy, but his body is a ticking clock. Every season might be his last.",
  },

  chemistry_traits: [
    { tag: "Seventy-Four Pitches", desc: "Perfect game on 74 pitches in a pennant race. When facing an elite opposing pitcher, Joss gains +2 to all stats. The bigger the moment, the fewer pitches he needs." },
    { tag: "Lowest WHIP Ever", desc: "Career 0.968 WHIP — lowest in MLB history. Baserunners simply don't happen. Opposing OBP reduced by -1 permanently." },
    { tag: "The Corkscrew", desc: "Joss's delivery turned his back to the batter, hiding the ball until the last instant. Opposing hitters suffer -1 CON on first at-bat each game (unfamiliarity penalty)." },
    { tag: "Scholar-Pitcher", desc: "College-educated sportswriter and inventor. +1 team intelligence. Joss reads opposing lineups and provides scouting reports: all teammates gain +1 vs. opponents Joss has faced." },
    { tag: "The Joss Indicator", desc: "Invented an electronic scoreboard for League Park. +1 home field advantage permanently." },
    { tag: "Glass Genius", desc: "CRITICAL FLAW: Before each season, roll for health. 20% chance Joss misses significant time. After season 7, the percentage rises to 40%. After season 9, Joss retires or dies." },
    { tag: "The First All-Star Game", desc: "When Joss's career ends, the league's greatest players assemble to honor him. +5 franchise reputation. A benefit game raises funds for his family." },
    { tag: "Lajoie's Ace", desc: "+2 chemistry with Napoleon Lajoie (his manager). Lajoie trusted Joss above all others. 'One of the best pitchers and men ever identified with the game.'" },
  ],

  preferred_locations: [
    { location: "Pitcher's Mound", affinity: "HIGH", note: "74 pitches for perfection. The mound was his laboratory." },
    { location: "Press Box / Newsroom", affinity: "HIGH", note: "Worked as sportswriter for Cleveland Press and Toledo News-Bee. Covered World Series." },
    { location: "University / Library", affinity: "HIGH", note: "Attended St. Mary's and University of Wisconsin. Scholarly temperament." },
    { location: "Workshop / Inventor's Bench", affinity: "HIGH", note: "Designed the Joss Indicator electronic scoreboard. Engineering mindset." },
    { location: "Home / Family", affinity: "HIGH", note: "Married Lillian. Two children. Family man and community pillar." },
    { location: "League Park, Cleveland", affinity: "HIGH", note: "Played entire career for Cleveland. His scoreboard was installed here." },
    { location: "Hospital / Sickbed", affinity: "LOW", note: "Malaria, fatigue, fainting, meningitis. His body was always the enemy." },
  ],

  momentum: {
    hot_triggers: [
      "Pennant races — Joss's perfect game came with 3 games left and 1.5 games separating 3 teams",
      "Facing elite pitchers — Joss vs. Walsh produced the greatest pitching duel in history",
      "High-efficiency days — when Joss needs fewer than 80 pitches, he's nearly unhittable",
      "Intellectual preparation — Joss scouted opponents meticulously through his sportswriting",
    ],
    cold_triggers: [
      "Health episodes — malaria, arm trouble, fatigue, fainting spells",
      "Late-season exhaustion — benched for September 1909",
      "The body's betrayal — every cold trigger is physical, never mental",
    ],
    pressure_response: "THE HIGHEST IN THE SET. 74 pitches. Perfect game. Pennant race. Against Ed Walsh. There is no greater clutch pitching performance in dead-ball history — and arguably in all of baseball history. Arthur Daley (NYT): 'The most astonishing clutch job baseball has had.' The tragedy is that Joss never got to pitch in a World Series despite this moment. He finished 0.5 games back. In ILB: Joss is the ultimate Game 7 starter — if he's healthy.",
  },

  action_card_seeds: [
    { title: "Seventy-Four", type: "Game Action", text: "Your pitcher throws a perfect game on 74 pitches — in a pennant race, against a future Hall of Famer who strikes out 15 and allows only 4 hits. A mouse in the grandstand would have sounded like a shovel on concrete. Your pitcher gains the 'Perfection Under Pressure' trait permanently.", origin: "October 2, 1908. Joss vs. Walsh. Naps vs. White Sox. 3 teams separated by 1.5 games. Joss: 27 up, 27 down, 74 pitches. Walsh: 4-hitter, 15 K, 1 unearned run allowed. Final: 1-0 Cleveland." },
    { title: "The Corkscrew", type: "Game Action", text: "Your pitcher uses a delivery that turns his back entirely to the batter, hiding the ball until the last instant. First-time opponents suffer -2 CON. Scouting reports help, but the delivery remains deceptive even when expected.", origin: "Joss's corkscrew delivery was unique — he turned his back to the batter completely, then delivered from a sidearm angle. Bobby Wallace: 'Out of nowhere, the ball was hopping across the plate.'" },
    { title: "The Scholar's Column", type: "Action", text: "Your pitcher writes a newspaper column analyzing the upcoming series. His scouting insights are so detailed that all teammates gain +1 vs. the next opponent. The column increases the newspaper's circulation by 15%.", origin: "Joss wrote for the Cleveland Press and Toledo News-Bee. He covered the World Series. The Press said he was 'far and away the best qualified' sportswriter among players." },
    { title: "The Joss Indicator", type: "Action", text: "Your pitcher-inventor designs an electronic scoreboard for the home ballpark. +1 home field advantage permanently. The device tracks balls, strikes, and lineups — decades ahead of its time.", origin: "Joss designed and marketed an electronic scoreboard (the Joss Indicator) to Cleveland management. It was installed at League Park for the 1909 season." },
    { title: "Half a Game Back", type: "Drama", text: "Your pitcher has the best season of his life — 1.16 ERA, perfect game, 24 wins. Your team finishes 0.5 games behind the pennant winner. The closest you'll ever come. Your pitcher never reaches the World Series.", origin: "In 1908, Joss went 24-11 with a 1.16 ERA and pitched a perfect game. The Naps finished 0.5 games behind Detroit. Joss never reached the postseason." },
    { title: "The Fainting", type: "Drama", text: "Before an exhibition game, your pitcher faints while talking to a friend. He never recovers. The diagnosis is fatal. He dies two days after his 31st birthday. Opening Day is postponed for his funeral.", origin: "On April 3, 1911, Joss fainted in Chattanooga. He was diagnosed with tubercular meningitis. He died April 14, 1911 — two days after his birthday, on what would have been Opening Day." },
    { title: "The First All-Star Game", type: "Drama", text: "The league's greatest players assemble to honor your fallen pitcher. Cobb, Speaker, Collins, Crawford, Walter Johnson — all in one lineup. They play against your team. 15,000 attend. $13,000 is raised for your pitcher's widow and children. This game will become a tradition.", origin: "On July 24, 1911, an all-star team played the Naps at League Park to benefit Lillian Joss and her two children. The game raised $12,914 and is considered the first proto-All-Star Game." },
    { title: "The Rule Waived", type: "Drama", text: "Your pitcher played only 9 seasons. The Hall of Fame requires 10. But his career was so extraordinary — and his death so unjust — that the committee waives the rule. He is inducted. The only player this exception has been made for.", origin: "In 1978, the Veterans Committee waived the 10-year minimum and inducted Joss into the Hall of Fame — the only player in history to receive this exception." },
  ],

  art_direction: {
    face: "Tall, lean, angular — 6'3\" 185 lbs, the 'Human Hairpin.' Long face, intelligent eyes, calm expression. Not intimidating — thoughtful. The face of a scholar who happens to throw a baseball with impossible precision. Clean-shaven, neat. There's a serenity here that's almost unsettling — this man knows exactly what he's doing and exactly how little time he has.",
    attire: "Cleveland Naps 1908 home whites. The distinctive corkscrew delivery captured mid-motion — his back turned to the batter, the ball hidden behind his body. The moment just before the release — the batter can't see anything yet. The delivery should feel like a magic trick: the ball is about to appear from nowhere. 6'3\" frame coiled like a spring.",
    mood: "Quiet precision meeting tragic inevitability. Not chaotic like Waddell or doomed like Walsh — Joss is serene. He knows exactly what he's doing. But there's a shadow over the image — the knowledge that this perfection has an expiration date. The mood is a watch that keeps perfect time but is running down. Beautiful and heartbreaking.",
    style: "Clean, pale sepia — the lightest pitcher card in the set, reflecting Joss's precision and clarity. Almost clinical. The background suggests League Park's expanded grandstands and the glow of his electronic scoreboard invention. Thin, elegant border — fitting for the Human Hairpin. The paper is pristine, carefully preserved — this is the card you protected because it felt precious.",
    reference: "This is the T206 that makes you hold your breath. ILB sepia at its most refined and most fragile. Where Walsh is the card of the coal mine and Waddell is the card of the circus, Joss is the card of the library — perfect, quiet, and gone too soon. The most elegant card in the entire collection.",
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

export default function AddieJossCard() {
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
              {[{ label: "CAR W", val: d.real_stats.career_wins },{ label: "CAR ERA", val: d.real_stats.career_era },{ label: "CAR K", val: d.real_stats.career_strikeouts },{ label: "CAR SHO", val: d.real_stats.career_shutouts },{ label: "CAR WHIP", val: "0.968" },{ label: "PERFECT", val: d.real_stats.perfect_games },{ label: "NO-HIT", val: d.real_stats.no_hitters },{ label: "CAR WAR", val: d.real_stats.career_war }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: C.gold, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: C.ink, fontWeight: 900, fontFamily: "'Courier Prime', monospace" }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 8, color: C.sepia, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>CAREER TOTALS \u2014 9 SEASONS (1902-1910)</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {["\u2b50 HOF 1978 (Rule Waived)", "\ud83d\udc51 Lowest WHIP Ever (0.968)", "\u2728 Perfect Game vs Walsh", "\u270d\ufe0f Sportswriter", "\ud83d\udca1 Inventor (Joss Indicator)", "\ud83d\udd4a\ufe0f First All-Star Benefit", "\ud83c\udf93 College Educated", "\u26b0\ufe0f Died at 31"].map((a, i) => (
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
                  <p style={{ margin: "0 0 12px 0", fontSize: 11, color: C.sepia, fontStyle: "italic" }}>These events, derived from Joss's real life, become universal cards playable in any game.</p>
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
                </Section>
                <Section title="Joss's Derivation">
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
